// Mobile Optimization for Breathe Safe Website
// iOS Safari and Android Chrome specific optimizations

class MobileOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.detectDevice();
    this.setupViewport();
    this.optimizeTouch();
    this.preventZoom();
    this.optimizeScrolling();
    this.setupStickyElements();
    this.optimizeImages();
    this.setupPWA();
  }

  detectDevice() {
    const userAgent = navigator.userAgent;
    this.isIOS = /iPad|iPhone|iPod/.test(userAgent);
    this.isAndroid = /Android/.test(userAgent);
    this.isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    this.isChrome = /Chrome/.test(userAgent);
    
    // Add device classes to body
    document.body.classList.add(
      this.isIOS ? 'ios' : 'not-ios',
      this.isAndroid ? 'android' : 'not-android',
      this.isSafari ? 'safari' : 'not-safari',
      this.isChrome ? 'chrome' : 'not-chrome'
    );
  }

  setupViewport() {
    // Ensure proper viewport meta tag
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    
    // iOS Safari specific viewport
    if (this.isIOS) {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    } else {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }
  }

  optimizeTouch() {
    // Ensure all interactive elements have proper touch targets (44px minimum)
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.height < 44 || rect.width < 44) {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
        element.style.display = 'inline-flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
      }
    });

    // Add touch feedback
    this.addTouchFeedback();
  }

  addTouchFeedback() {
    const touchElements = document.querySelectorAll('button, .btn, a[href]');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
      });
      
      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 100);
      });
    });
  }

  preventZoom() {
    // Prevent zoom on input focus (iOS Safari)
    if (this.isIOS) {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (parseFloat(getComputedStyle(input).fontSize) < 16) {
          input.style.fontSize = '16px';
        }
      });
    }
  }

  optimizeScrolling() {
    // Smooth scrolling for iOS
    if (this.isIOS) {
      document.documentElement.style.webkitOverflowScrolling = 'touch';
    }

    // Prevent horizontal scroll
    document.body.style.overflowX = 'hidden';
    
    // Optimize scroll performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll() {
    const scrollY = window.pageYOffset;
    
    // Hide/show mobile navigation on scroll
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      if (scrollY > 100) {
        mobileNav.style.transform = 'translateY(100%)';
      } else {
        mobileNav.style.transform = 'translateY(0)';
      }
    }

    // Update sticky elements
    this.updateStickyElements(scrollY);
  }

  setupStickyElements() {
    // Create mobile sticky bar
    this.createMobileStickyBar();
    
    // Create floating WhatsApp button
    this.createFloatingWhatsApp();
  }

  createMobileStickyBar() {
    if (window.innerWidth > 768) return;

    const existingStickyBar = document.querySelector('.mobile-sticky-bar');
    if (existingStickyBar) return;

    const stickyBar = document.createElement('div');
    stickyBar.className = 'mobile-sticky-bar fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 z-50 md:hidden';
    stickyBar.innerHTML = `
      <div class="flex">
        <a href="tel:+61451612742" class="flex-1 bg-brand-red text-white py-4 text-center font-bold border-r border-red-700">
          <i class="fas fa-phone mr-2"></i>Call Now
        </a>
        <a href="https://wa.me/61451612742?text=Hi! I need a quote for asbestos removal/demolition services." 
           class="flex-1 bg-brand-green text-white py-4 text-center font-bold border-r border-green-700">
          <i class="fab fa-whatsapp mr-2"></i>WhatsApp
        </a>
        <a href="quote.html" class="flex-1 bg-brand-orange text-white py-4 text-center font-bold">
          <i class="fas fa-file-alt mr-2"></i>Quote
        </a>
      </div>
    `;
    
    document.body.appendChild(stickyBar);
    
    // Add padding to body to prevent content overlap
    document.body.style.paddingBottom = '60px';
  }

  createFloatingWhatsApp() {
    const existingFloat = document.querySelector('.floating-whatsapp');
    if (existingFloat) return;

    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'https://wa.me/61451612742?text=Hi! I need a quote for asbestos removal/demolition services.';
    floatingBtn.className = 'floating-whatsapp fixed bottom-20 right-4 bg-brand-green text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40 md:bottom-4';
    floatingBtn.innerHTML = '<i class="fab fa-whatsapp text-2xl"></i>';
    floatingBtn.style.animation = 'pulse 2s infinite';
    
    document.body.appendChild(floatingBtn);
  }

  updateStickyElements(scrollY) {
    // Add scroll-based animations or updates here
  }

  optimizeImages() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }

    // WebP support detection
    this.detectWebPSupport();
  }

  detectWebPSupport() {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      const support = webP.height === 2;
      document.documentElement.classList.add(support ? 'webp' : 'no-webp');
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  setupPWA() {
    // PWA install prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      this.showInstallPrompt();
    });

    // Track PWA usage
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('Running as PWA');
      // Track PWA usage
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_launch', {
          event_category: 'engagement',
          event_label: 'PWA Launch'
        });
      }
    }
  }

  showInstallPrompt() {
    // Create install banner
    const installBanner = document.createElement('div');
    installBanner.className = 'install-banner fixed top-0 left-0 right-0 bg-brand-red text-white p-4 z-50 transform -translate-y-full transition-transform duration-300';
    installBanner.innerHTML = `
      <div class="flex items-center justify-between max-w-md mx-auto">
        <div class="flex items-center">
          <i class="fas fa-mobile-alt mr-3 text-xl"></i>
          <div>
            <div class="font-bold text-sm">Install Breathe Safe App</div>
            <div class="text-xs opacity-90">Quick access to quotes & services</div>
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="install-btn bg-white text-brand-red px-3 py-1 rounded text-sm font-bold">Install</button>
          <button class="close-install text-white opacity-75">✕</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(installBanner);
    
    // Show banner
    setTimeout(() => {
      installBanner.style.transform = 'translateY(0)';
    }, 1000);

    // Handle install
    installBanner.querySelector('.install-btn').addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('PWA installed');
          }
          deferredPrompt = null;
          installBanner.remove();
        });
      }
    });

    // Handle close
    installBanner.querySelector('.close-install').addEventListener('click', () => {
      installBanner.style.transform = 'translateY(-100%)';
      setTimeout(() => installBanner.remove(), 300);
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (installBanner.parentNode) {
        installBanner.style.transform = 'translateY(-100%)';
        setTimeout(() => installBanner.remove(), 300);
      }
    }, 10000);
  }

  // Performance monitoring
  monitorPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          
          // Track performance
          if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
              event_category: 'performance',
              value: Math.round(loadTime)
            });
          }
        }, 0);
      });
    }
  }
}

// Initialize mobile optimization
document.addEventListener('DOMContentLoaded', () => {
  new MobileOptimizer();
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    // Recalculate viewport
    window.scrollTo(0, 0);
  }, 500);
});

// Export for use in other scripts
window.MobileOptimizer = MobileOptimizer;

