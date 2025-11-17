// Advanced PWA Installation and Management
// Breathe Safe PWA Features

class BreatheSafePWA {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.installButton = null;
    this.updateAvailable = false;
    
    this.init();
  }
  
  async init() {
    // Check if already installed
    this.checkInstallStatus();
    
    // Register service worker
    await this.registerServiceWorker();
    
    // Setup install prompt
    this.setupInstallPrompt();
    
    // Setup update handling
    this.setupUpdateHandling();
    
    // Setup offline handling
    this.setupOfflineHandling();
    
    // Setup background sync
    this.setupBackgroundSync();
    
    // Setup push notifications (optional)
    this.setupPushNotifications();
  }
  
  checkInstallStatus() {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      this.isInstalled = true;
      document.body.classList.add('pwa-installed');
    }
    
    // Check if installed via beforeinstallprompt
    if (localStorage.getItem('pwa-installed') === 'true') {
      this.isInstalled = true;
    }
  }
  
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
          scope: '/'
        });
        
        console.log('Service Worker registered:', registration);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
        
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }
  
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      
      if (!this.isInstalled) {
        this.showInstallButton();
      }
    });
    
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      localStorage.setItem('pwa-installed', 'true');
      this.hideInstallButton();
      
      // Track installation
      this.trackEvent('pwa_installed', {
        method: 'browser_prompt'
      });
      
      // Show welcome message
      this.showWelcomeMessage();
    });
  }
  
  showInstallButton() {
    if (this.installButton) return;
    
    this.installButton = document.createElement('div');
    this.installButton.className = 'pwa-install-prompt fixed bottom-4 left-4 right-4 bg-brand-red text-white p-4 rounded-lg shadow-lg z-50 max-w-sm mx-auto';
    this.installButton.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h3 class="font-bold text-sm">Install Breathe Safe App</h3>
          <p class="text-xs opacity-90">Get quick access to quotes and services</p>
        </div>
        <div class="flex gap-2 ml-4">
          <button onclick="breatheSafePWA.installApp()" class="bg-white text-brand-red px-3 py-1 rounded text-sm font-medium">
            Install
          </button>
          <button onclick="breatheSafePWA.dismissInstall()" class="text-white opacity-75 hover:opacity-100">
            ✕
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.installButton);
    
    // Auto-hide after 15 seconds
    setTimeout(() => {
      this.dismissInstall();
    }, 15000);
  }
  
  async installApp() {
    if (!this.deferredPrompt) return;
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      this.trackEvent('pwa_install_accepted');
    } else {
      this.trackEvent('pwa_install_dismissed');
    }
    
    this.deferredPrompt = null;
    this.hideInstallButton();
  }
  
  dismissInstall() {
    this.hideInstallButton();
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    this.trackEvent('pwa_install_banner_dismissed');
  }
  
  hideInstallButton() {
    if (this.installButton) {
      this.installButton.remove();
      this.installButton = null;
    }
  }
  
  setupUpdateHandling() {
    // Listen for service worker messages
    navigator.serviceWorker?.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        this.showUpdateNotification();
      }
    });
  }
  
  showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <h4 class="font-bold text-sm">Update Available</h4>
          <p class="text-xs opacity-90">New features and improvements</p>
        </div>
        <button onclick="breatheSafePWA.updateApp()" class="ml-4 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">
          Update
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 10000);
  }
  
  updateApp() {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }
  
  setupOfflineHandling() {
    window.addEventListener('online', () => {
      this.showConnectionStatus('back online', 'green');
      this.syncPendingData();
    });
    
    window.addEventListener('offline', () => {
      this.showConnectionStatus('offline', 'orange');
    });
  }
  
  showConnectionStatus(message, color) {
    const status = document.createElement('div');
    status.className = `fixed top-4 left-4 bg-${color}-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm`;
    status.textContent = `You're ${message}`;
    
    document.body.appendChild(status);
    
    setTimeout(() => {
      status.remove();
    }, 3000);
  }
  
  setupBackgroundSync() {
    // Register background sync for form submissions
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        // This will be used when forms are submitted offline
        this.syncRegistration = registration;
      });
    }
  }
  
  async syncPendingData() {
    // Sync any pending form submissions or data
    if (this.syncRegistration) {
      try {
        await this.syncRegistration.sync.register('form-submission');
        console.log('Background sync registered');
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  }
  
  setupPushNotifications() {
    // Optional: Setup push notifications for important updates
    if ('Notification' in window && 'serviceWorker' in navigator) {
      // This would be implemented based on business requirements
      console.log('Push notifications available');
    }
  }
  
  showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    welcome.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
        <div class="text-4xl mb-4">🎉</div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Welcome to Breathe Safe!</h2>
        <p class="text-gray-600 mb-4">App installed successfully. You can now access our services quickly from your home screen.</p>
        <button onclick="this.parentElement.parentElement.remove()" class="bg-brand-red text-white px-6 py-2 rounded-lg font-medium">
          Get Started
        </button>
      </div>
    `;
    
    document.body.appendChild(welcome);
    
    setTimeout(() => {
      welcome.remove();
    }, 5000);
  }
  
  // Share functionality
  async shareContent(title, text, url) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Breathe Safe - Professional Asbestos Removal',
          text: text || 'Licensed asbestos removal specialists serving Gold Coast to Sunshine Coast',
          url: url || window.location.href
        });
        
        this.trackEvent('content_shared', {
          method: 'web_share_api'
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url || window.location.href);
        this.showToast('Link copied to clipboard!');
        
        this.trackEvent('content_shared', {
          method: 'clipboard'
        });
      } catch (error) {
        console.error('Clipboard failed:', error);
      }
    }
  }
  
  showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
  
  trackEvent(eventName, parameters = {}) {
    // Track PWA events
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'pwa',
        ...parameters
      });
    }
    
    console.log('PWA Event:', eventName, parameters);
  }
  
  // Utility methods for other scripts
  isOnline() {
    return navigator.onLine;
  }
  
  isPWAInstalled() {
    return this.isInstalled;
  }
  
  canInstall() {
    return this.deferredPrompt !== null;
  }
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.breatheSafePWA = new BreatheSafePWA();
});

// Export for use in other scripts
window.BreatheSafePWA = BreatheSafePWA;

