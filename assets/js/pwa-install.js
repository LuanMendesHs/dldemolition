/**
 * PWA Installation Handler
 * DL Demolition Asbestos & Demolition Website
 */

(function() {
  'use strict';

  let deferredPrompt;
  let installButton;

  // Initialize PWA install functionality
  document.addEventListener('DOMContentLoaded', function() {
    initializePWA();
    registerServiceWorker();
    setupInstallPrompt();
    checkIfInstalled();
  });

  /**
   * Initialize PWA functionality
   */
  function initializePWA() {
    // Create install button if it doesn't exist
    if (!document.getElementById('pwa-install-btn')) {
      createInstallButton();
    } else {
      installButton = document.getElementById('pwa-install-btn');
    }

    // Hide install button initially
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  /**
   * Register Service Worker
   */
  async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered successfully:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  /**
   * Setup install prompt
   */
  function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      
      // Show install button
      if (installButton) {
        installButton.style.display = 'block';
        installButton.classList.add('animate-bounce-slow');
      }

      // Show install banner after 5 seconds
      setTimeout(() => {
        showInstallBanner();
      }, 5000);
    });

    // Handle install button click
    if (installButton) {
      installButton.addEventListener('click', installPWA);
    }

    // Track successful installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
      hideInstallUI();
      trackInstallation();
    });
  }

  /**
   * Create install button dynamically
   */
  function createInstallButton() {
    installButton = document.createElement('button');
    installButton.id = 'pwa-install-btn';
    installButton.className = 'fixed bottom-24 right-6 bg-brand-orange text-white px-4 py-3 rounded-full shadow-glow-orange z-40 font-bold text-sm';
    installButton.innerHTML = `
      <i class="fas fa-download mr-2"></i>
      Install App
    `;
    document.body.appendChild(installButton);
  }

  /**
   * Show install banner
   */
  function showInstallBanner() {
    // Don't show if already dismissed or installed
    if (localStorage.getItem('pwa-banner-dismissed') || isInstalled()) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.className = 'fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-brand-gray border-2 border-brand-orange rounded-lg shadow-glow-orange z-50 p-4 animate-slide-up';
    banner.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <img src="/assets/images/logo_symbol_only.png" alt="DL Demolition" class="w-12 h-12 rounded-lg" onerror="this.style.display='none'">
        </div>
        <div class="flex-1">
          <h3 class="font-bold text-white mb-1">Install DL Demolition App</h3>
          <p class="text-gray-400 text-sm mb-3">Get quick access to quotes, calculator, and emergency contact!</p>
          <div class="flex gap-2">
            <button id="pwa-banner-install" class="bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all">
              <i class="fas fa-download mr-1"></i>Install
            </button>
            <button id="pwa-banner-dismiss" class="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-600 transition-all">
              Not Now
            </button>
          </div>
        </div>
        <button id="pwa-banner-close" class="flex-shrink-0 text-gray-400 hover:text-white transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    // Setup banner event listeners
    document.getElementById('pwa-banner-install').addEventListener('click', () => {
      installPWA();
      banner.remove();
    });

    document.getElementById('pwa-banner-dismiss').addEventListener('click', () => {
      localStorage.setItem('pwa-banner-dismissed', 'true');
      banner.remove();
    });

    document.getElementById('pwa-banner-close').addEventListener('click', () => {
      banner.remove();
    });

    // Auto-dismiss after 30 seconds
    setTimeout(() => {
      if (document.getElementById('pwa-install-banner')) {
        banner.remove();
      }
    }, 30000);
  }

  /**
   * Install PWA
   */
  async function installPWA() {
    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to install prompt: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    deferredPrompt = null;
    hideInstallUI();
  }

  /**
   * Hide install UI elements
   */
  function hideInstallUI() {
    if (installButton) {
      installButton.style.display = 'none';
    }

    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
      banner.remove();
    }
  }

  /**
   * Check if PWA is installed
   */
  function isInstalled() {
    // Check if running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }

    // Check for iOS standalone mode
    if (window.navigator.standalone === true) {
      return true;
    }

    return false;
  }

  /**
   * Check if installed and hide UI
   */
  function checkIfInstalled() {
    if (isInstalled()) {
      console.log('PWA is already installed');
      hideInstallUI();
      
      // Show welcome message for installed users
      showWelcomeMessage();
    }
  }

  /**
   * Show welcome message for installed users
   */
  function showWelcomeMessage() {
    // Only show once per session
    if (sessionStorage.getItem('pwa-welcome-shown')) {
      return;
    }

    const welcome = document.createElement('div');
    welcome.className = 'fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-brand-green text-white rounded-lg shadow-lg z-50 p-4 animate-slide-up';
    welcome.innerHTML = `
      <div class="flex items-center gap-3">
        <i class="fas fa-check-circle text-2xl"></i>
        <div class="flex-1">
          <p class="font-semibold">Welcome back!</p>
          <p class="text-sm opacity-90">Thanks for using our app</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:opacity-80">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    document.body.appendChild(welcome);
    sessionStorage.setItem('pwa-welcome-shown', 'true');

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (welcome.parentElement) {
        welcome.remove();
      }
    }, 5000);
  }

  /**
   * Show update notification
   */
  function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-brand-orange text-white rounded-lg shadow-glow-orange z-50 p-4';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <i class="fas fa-sync-alt text-xl"></i>
        <div class="flex-1">
          <p class="font-semibold">Update Available</p>
          <p class="text-sm opacity-90">A new version is ready</p>
        </div>
        <button id="pwa-update-btn" class="bg-white text-brand-orange px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all">
          Update
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    document.getElementById('pwa-update-btn').addEventListener('click', () => {
      window.location.reload();
    });
  }

  /**
   * Track PWA installation
   */
  function trackInstallation() {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        'event_category': 'engagement',
        'event_label': 'PWA Installation'
      });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'AddToApp');
    }

    console.log('PWA installation tracked');
  }

  /**
   * Handle offline/online events
   */
  window.addEventListener('online', () => {
    console.log('Back online');
    const offlineBanner = document.getElementById('offline-banner');
    if (offlineBanner) {
      offlineBanner.remove();
    }
  });

  window.addEventListener('offline', () => {
    console.log('Gone offline');
    showOfflineBanner();
  });

  /**
   * Show offline banner
   */
  function showOfflineBanner() {
    if (document.getElementById('offline-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.className = 'fixed top-0 left-0 right-0 bg-yellow-600 text-white text-center py-2 px-4 z-50';
    banner.innerHTML = `
      <i class="fas fa-wifi-slash mr-2"></i>
      You're offline. Some features may be limited.
    `;

    document.body.appendChild(banner);
  }

  // iOS-specific install instructions
  function showIOSInstructions() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = window.navigator.standalone === true;

    if (isIOS && !isInStandaloneMode) {
      // Show iOS install instructions after 10 seconds
      setTimeout(() => {
        if (localStorage.getItem('ios-instructions-shown')) {
          return;
        }

        const instructions = document.createElement('div');
        instructions.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-brand-gray border-2 border-brand-orange rounded-lg shadow-glow-orange z-50 p-4';
        instructions.innerHTML = `
          <div class="flex items-start gap-3">
            <i class="fas fa-mobile-alt text-brand-orange text-2xl"></i>
            <div class="flex-1">
              <h3 class="font-bold text-white mb-2">Install on iPhone</h3>
              <ol class="text-sm text-gray-300 space-y-1">
                <li>1. Tap <i class="fas fa-share"></i> Share button</li>
                <li>2. Scroll and tap "Add to Home Screen"</li>
                <li>3. Tap "Add" in the top right</li>
              </ol>
            </div>
            <button onclick="this.parentElement.parentElement.remove(); localStorage.setItem('ios-instructions-shown', 'true');" class="text-gray-400 hover:text-white">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;

        document.body.appendChild(instructions);

        // Auto-dismiss after 20 seconds
        setTimeout(() => {
          if (instructions.parentElement) {
            instructions.remove();
          }
        }, 20000);
      }, 10000);
    }
  }

  // Show iOS instructions
  showIOSInstructions();

})();
