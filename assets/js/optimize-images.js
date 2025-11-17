// Image optimization script for Breathe Safe website
// Adds lazy loading, WebP support, and proper dimensions

function optimizeImages() {
  // Get all images on the page
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add lazy loading if not already present
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add proper dimensions if missing
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      // Set default dimensions based on image context
      const parent = img.closest('.hero-section, .service-card, .project-card, .gallery-item');
      
      if (parent) {
        if (parent.classList.contains('hero-section')) {
          img.setAttribute('width', '1200');
          img.setAttribute('height', '600');
        } else if (parent.classList.contains('service-card')) {
          img.setAttribute('width', '400');
          img.setAttribute('height', '300');
        } else if (parent.classList.contains('project-card')) {
          img.setAttribute('width', '350');
          img.setAttribute('height', '250');
        } else if (parent.classList.contains('gallery-item')) {
          img.setAttribute('width', '300');
          img.setAttribute('height', '200');
        }
      }
    }
    
    // Add WebP support with fallback
    if (!img.dataset.optimized) {
      const originalSrc = img.src;
      const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Check if WebP is supported
      if (supportsWebP()) {
        // Create a new image to test if WebP version exists
        const testImg = new Image();
        testImg.onload = () => {
          img.src = webpSrc;
          img.dataset.optimized = 'true';
        };
        testImg.onerror = () => {
          img.dataset.optimized = 'true';
        };
        testImg.src = webpSrc;
      } else {
        img.dataset.optimized = 'true';
      }
    }
    
    // Add error handling
    img.onerror = function() {
      // Fallback to original format if WebP fails
      if (this.src.includes('.webp')) {
        this.src = this.src.replace('.webp', '.jpg');
      }
    };
  });
}

// Check WebP support
function supportsWebP() {
  if (typeof supportsWebP.result === 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    supportsWebP.result = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return supportsWebP.result;
}

// Intersection Observer for advanced lazy loading
function setupAdvancedLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Add fade-in animation
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.3s ease';
          
          img.onload = () => {
            img.style.opacity = '1';
          };
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Preload critical images
function preloadCriticalImages() {
  const criticalImages = [
    '/assets/images/hero.webp',
    '/assets/images/logo_header_optimized.webp'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Image compression for user uploads (if any)
function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', () => {
  preloadCriticalImages();
  optimizeImages();
  setupAdvancedLazyLoading();
});

// Re-optimize when new images are added dynamically
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        if (node.tagName === 'IMG') {
          optimizeImages();
        } else if (node.querySelectorAll) {
          const images = node.querySelectorAll('img');
          if (images.length > 0) {
            optimizeImages();
          }
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Export functions for use in other scripts
window.imageOptimizer = {
  optimizeImages,
  supportsWebP,
  compressImage,
  preloadCriticalImages
};

