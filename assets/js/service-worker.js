// Breathe Safe Service Worker
// Version 1.0.0

const CACHE_NAME = 'breathe-safe-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Files to cache immediately
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/services',
  '/calculator',
  '/about',
  '/projects',
  '/reviews',
  '/blog',
  '/quote',
  '/manifest.webmanifest',
  '/formspree-config.js',
  // Critical images
  '/assets/images/logo_header_optimized.png',
  '/assets/images/favicon_icon.png',
  '/assets/images/hero.jpg',
  // Critical CSS (will be added when compiled)
  '/assets/css/styles.css'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching critical resources');
        return cache.addAll(PRECACHE_URLS.map(url => new Request(url, {
          cache: 'reload'
        })));
      })
      .then(() => {
        console.log('Critical resources cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Failed to cache critical resources:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Old caches cleaned up');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except for critical CDNs)
  if (url.origin !== location.origin && !isCriticalExternal(url)) {
    return;
  }
  
  // Handle different types of requests
  if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleStaticAssetRequest(request));
  } else {
    event.respondWith(handleGenericRequest(request));
  }
});

// HTML requests - Network First with offline fallback
async function handleHTMLRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Network failed for HTML, trying cache:', request.url);
    
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    
    throw error;
  }
}

// Image requests - Cache First with network fallback
async function handleImageRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      
      // Limit cache size for images
      await limitCacheSize(cache, 'image', 50);
      
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Failed to load image:', request.url);
    
    // Return placeholder or let it fail gracefully
    return new Response('', {
      status: 404,
      statusText: 'Image not found'
    });
  }
}

// Static assets - Stale While Revalidate
async function handleStaticAssetRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    // Update cache in background
    fetch(request)
      .then(networkResponse => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse);
        }
      })
      .catch(() => {
        // Ignore network errors for background updates
      });
    
    return cachedResponse;
  }
  
  // No cached version, try network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Failed to load static asset:', request.url);
    throw error;
  }
}

// Generic requests - Network First
async function handleGenericRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Helper functions
function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

function isImageRequest(request) {
  return request.headers.get('accept')?.includes('image/') ||
         /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(new URL(request.url).pathname);
}

function isStaticAsset(request) {
  return /\.(css|js|woff|woff2|ttf|eot)$/i.test(new URL(request.url).pathname);
}

function isCriticalExternal(url) {
  const criticalDomains = [
    'cdn.tailwindcss.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];
  
  return criticalDomains.some(domain => url.hostname.includes(domain));
}

// Limit cache size to prevent storage bloat
async function limitCacheSize(cache, type, maxEntries) {
  const keys = await cache.keys();
  const typeKeys = keys.filter(key => {
    if (type === 'image') {
      return isImageRequest(key);
    }
    return true;
  });
  
  if (typeKeys.length > maxEntries) {
    const oldestKeys = typeKeys.slice(0, typeKeys.length - maxEntries);
    await Promise.all(oldestKeys.map(key => cache.delete(key)));
  }
}

// Background sync for form submissions (if supported)
self.addEventListener('sync', event => {
  if (event.tag === 'form-submission') {
    event.waitUntil(processFormSubmissions());
  }
});

async function processFormSubmissions() {
  // Get pending form submissions from IndexedDB
  // This would be implemented with a proper IndexedDB wrapper
  console.log('Processing background form submissions...');
}

// Push notifications (if implemented)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/images/icon-192.png',
    badge: '/assets/images/icon-192.png',
    vibrate: [200, 100, 200],
    data: data.data,
    actions: [
      {
        action: 'call',
        title: 'Call Now',
        icon: '/assets/images/icon-phone.png'
      },
      {
        action: 'whatsapp',
        title: 'WhatsApp',
        icon: '/assets/images/icon-whatsapp.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data;
  
  if (action === 'call') {
    event.waitUntil(
      clients.openWindow('tel:+61451612742')
    );
  } else if (action === 'whatsapp') {
    event.waitUntil(
      clients.openWindow('https://wa.me/61451612742?text=Hello!%20I%20saw%20your%20notification.')
    );
  } else {
    event.waitUntil(
      clients.openWindow(data?.url || '/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

