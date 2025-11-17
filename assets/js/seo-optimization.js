// SEO Optimization for Breathe Safe Website
// Advanced SEO techniques for maximum search visibility

class SEOOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeMetaTags();
    this.setupStructuredData();
    this.optimizeImages();
    this.setupInternalLinking();
    this.optimizePageSpeed();
    this.setupLocalSEO();
    this.createSitemap();
    this.optimizeContent();
  }

  optimizeMetaTags() {
    // Dynamic meta descriptions based on page content
    const pageType = this.detectPageType();
    const metaDescription = this.generateMetaDescription(pageType);
    
    this.updateMetaTag('description', metaDescription);
    this.updateMetaTag('keywords', this.generateKeywords(pageType));
    
    // Open Graph tags
    this.setupOpenGraph(pageType);
    
    // Twitter Card tags
    this.setupTwitterCard(pageType);
    
    // Canonical URL
    this.setupCanonicalURL();
  }

  detectPageType() {
    const path = window.location.pathname;
    const title = document.title.toLowerCase();
    
    if (path.includes('calculator') || title.includes('calculator')) return 'calculator';
    if (path.includes('services') || title.includes('services')) return 'services';
    if (path.includes('about') || title.includes('about')) return 'about';
    if (path.includes('projects') || title.includes('projects')) return 'projects';
    if (path.includes('reviews') || title.includes('reviews')) return 'reviews';
    if (path.includes('blog') || title.includes('blog')) return 'blog';
    if (path.includes('quote') || title.includes('quote')) return 'quote';
    
    return 'home';
  }

  generateMetaDescription(pageType) {
    const descriptions = {
      home: 'Professional asbestos removal & demolition services across Gold Coast to Sunshine Coast. Licensed, insured & EPA compliant. Free quotes, 24/7 emergency response. Call (61) 451 612 742.',
      calculator: 'Get instant pricing for asbestos removal & demolition services. Free calculator with accurate estimates for Gold Coast, Sunshine Coast & Brisbane. Licensed professionals.',
      services: 'Complete asbestos removal, demolition & floor preparation services. EPA licensed, fully insured. Residential & commercial projects across Gold Coast to Sunshine Coast.',
      about: 'Breathe Safe: Gold Coast\'s trusted asbestos removal & demolition experts. EPA licensed, Fully Insured, 100+ completed projects. Professional, safe & reliable service.',
      projects: 'View our completed asbestos removal & demolition projects across Gold Coast & Sunshine Coast. Before/after photos, client testimonials & case studies.',
      reviews: 'Read genuine reviews from 100+ satisfied customers. 4.8/5 star rating for asbestos removal & demolition services across Gold Coast to Sunshine Coast.',
      blog: 'Expert advice on asbestos removal, demolition safety & regulations. Latest industry news, tips & guides from Gold Coast\'s leading specialists.',
      quote: 'Request your free asbestos removal or demolition quote. Fast response, accurate pricing, no obligation. Serving Gold Coast to Sunshine Coast. Call (61) 451 612 742.'
    };
    
    return descriptions[pageType] || descriptions.home;
  }

  generateKeywords(pageType) {
    const baseKeywords = 'asbestos removal, demolition, Gold Coast, Sunshine Coast, Brisbane, EPA licensed, insured, professional';
    
    const pageKeywords = {
      home: `${baseKeywords}, emergency service, free quotes, 24/7`,
      calculator: `${baseKeywords}, pricing calculator, instant quote, cost estimate`,
      services: `${baseKeywords}, residential demolition, commercial demolition, floor grinding, tile removal`,
      about: `${baseKeywords}, licensed contractor, certified, experienced, reliable`,
      projects: `${baseKeywords}, completed projects, before after, case studies, portfolio`,
      reviews: `${baseKeywords}, customer reviews, testimonials, 5 star rating, satisfied clients`,
      blog: `${baseKeywords}, safety tips, regulations, industry news, expert advice`,
      quote: `${baseKeywords}, free quote, no obligation, fast response, site inspection`
    };
    
    return pageKeywords[pageType] || baseKeywords;
  }

  updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  setupOpenGraph(pageType) {
    const ogData = {
      'og:title': document.title,
      'og:description': this.generateMetaDescription(pageType),
      'og:type': 'website',
      'og:url': window.location.href,
      'og:site_name': 'Breathe Safe Asbestos & Demolition',
      'og:image': `${window.location.origin}/assets/images/og-image.jpg`,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:locale': 'en_AU'
    };
    
    Object.entries(ogData).forEach(([property, content]) => {
      this.updateMetaProperty(property, content);
    });
  }

  setupTwitterCard(pageType) {
    const twitterData = {
      'twitter:card': 'summary_large_image',
      'twitter:title': document.title,
      'twitter:description': this.generateMetaDescription(pageType),
      'twitter:image': `${window.location.origin}/assets/images/og-image.jpg`,
      'twitter:site': '@BreatheSafeAU'
    };
    
    Object.entries(twitterData).forEach(([name, content]) => {
      this.updateMetaName(name, content);
    });
  }

  updateMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  updateMetaName(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  setupCanonicalURL() {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href.split('?')[0].split('#')[0];
  }

  setupStructuredData() {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Breathe Safe Asbestos & Demolition',
      'description': 'Professional asbestos removal and demolition services across Gold Coast to Sunshine Coast',
      'url': window.location.origin,
      'telephone': '+61451612742',
      'email': 'hello@dldemolition.com.au',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'Queensland',
        'addressCountry': 'AU',
        'addressLocality': 'Gold Coast'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': -28.0167,
        'longitude': 153.4000
      },
      'areaServed': [
        {
          '@type': 'City',
          'name': 'Gold Coast',
          'addressRegion': 'Queensland',
          'addressCountry': 'AU'
        },
        {
          '@type': 'City',
          'name': 'Sunshine Coast',
          'addressRegion': 'Queensland',
          'addressCountry': 'AU'
        },
        {
          '@type': 'City',
          'name': 'Brisbane',
          'addressRegion': 'Queensland',
          'addressCountry': 'AU'
        }
      ],
      'serviceType': [
        'Asbestos Removal',
        'Demolition Services',
        'Floor Grinding',
        'Tile Removal',
        'Strip-out Services'
      ],
      'priceRange': '$40-$95 per square meter',
      'openingHours': 'Mo-Su 00:00-23:59',
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Asbestos & Demolition Services',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Asbestos Roof Removal',
              'description': 'Safe removal of asbestos roofing materials'
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'minPrice': 55,
              'maxPrice': 95,
              'priceCurrency': 'AUD',
              'unitCode': 'MTK'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Residential Demolition',
              'description': 'Complete residential demolition services'
            },
            'priceSpecification': {
              '@type': 'PriceSpecification',
              'minPrice': 40,
              'maxPrice': 65,
              'priceCurrency': 'AUD',
              'unitCode': 'MTK'
            }
          }
        ]
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'reviewCount': '127',
        'bestRating': '5',
        'worstRating': '1'
      },
      'review': [
        {
          '@type': 'Review',
          'author': {
            '@type': 'Person',
            'name': 'Sarah Johnson'
          },
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': '5'
          },
          'reviewBody': 'Excellent service! Professional team, completed asbestos removal safely and efficiently.'
        }
      ],
      'sameAs': [
        'https://www.facebook.com/BreatheSafeAU',
        'https://www.instagram.com/breathesafe_au'
      ]
    };
    
    // Add FAQ structured data for relevant pages
    if (this.detectPageType() === 'home' || this.detectPageType() === 'services') {
      structuredData['@graph'] = [
        structuredData,
        this.generateFAQStructuredData()
      ];
    }
    
    this.insertStructuredData(structuredData);
  }

  generateFAQStructuredData() {
    return {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How much does asbestos removal cost?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Asbestos removal costs range from $55-95 per square meter depending on the type and location. We provide free quotes with no obligation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are you licensed for asbestos removal?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, we are fully EPA licensed for asbestos removal, carry $20M public liability insurance, and comply with all Australian safety regulations.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What areas do you service?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We service the entire Gold Coast to Sunshine Coast region, including Brisbane and surrounding areas. Emergency services available 24/7.'
          }
        }
      ]
    };
  }

  insertStructuredData(data) {
    // Remove existing structured data
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }
    
    // Insert new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add alt text if missing
      if (!img.alt) {
        img.alt = this.generateAltText(img);
      }
      
      // Add loading="lazy" for performance
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Add width and height if missing
      if (!img.width || !img.height) {
        this.setImageDimensions(img);
      }
    });
  }

  generateAltText(img) {
    const src = img.src.toLowerCase();
    const pageType = this.detectPageType();
    
    if (src.includes('logo')) return 'Breathe Safe Asbestos & Demolition Logo';
    if (src.includes('hero')) return 'Professional asbestos removal and demolition services Gold Coast';
    if (src.includes('asbestos')) return 'Safe asbestos removal by licensed professionals';
    if (src.includes('demolition')) return 'Professional demolition services Gold Coast';
    if (src.includes('before')) return 'Before asbestos removal and renovation project';
    if (src.includes('after')) return 'After professional renovation and asbestos removal';
    if (src.includes('team')) return 'Breathe Safe professional asbestos removal team';
    if (src.includes('equipment')) return 'Professional asbestos removal equipment and safety gear';
    
    return `${pageType} - Breathe Safe Asbestos & Demolition`;
  }

  setImageDimensions(img) {
    img.onload = function() {
      if (!this.width) this.width = this.naturalWidth;
      if (!this.height) this.height = this.naturalHeight;
    };
  }

  setupInternalLinking() {
    this.addBreadcrumbs();
    this.optimizeAnchorText();
    this.addRelatedLinks();
  }

  addBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumbs');
    if (!breadcrumbContainer) return;
    
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment);
    
    let breadcrumbHTML = '<a href="/">Home</a>';
    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += '/' + segment;
      const isLast = index === segments.length - 1;
      const title = this.formatBreadcrumbTitle(segment);
      
      if (isLast) {
        breadcrumbHTML += ` > <span>${title}</span>`;
      } else {
        breadcrumbHTML += ` > <a href="${currentPath}">${title}</a>`;
      }
    });
    
    breadcrumbContainer.innerHTML = breadcrumbHTML;
    
    // Add structured data for breadcrumbs
    this.addBreadcrumbStructuredData(segments);
  }

  formatBreadcrumbTitle(segment) {
    const titles = {
      'services': 'Services',
      'calculator': 'Price Calculator',
      'about': 'About Us',
      'projects': 'Projects',
      'reviews': 'Reviews',
      'blog': 'Blog',
      'quote': 'Free Quote'
    };
    
    return titles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  }

  addBreadcrumbStructuredData(segments) {
    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': window.location.origin
        }
      ]
    };
    
    let currentPath = window.location.origin;
    segments.forEach((segment, index) => {
      currentPath += '/' + segment;
      breadcrumbList.itemListElement.push({
        '@type': 'ListItem',
        'position': index + 2,
        'name': this.formatBreadcrumbTitle(segment),
        'item': currentPath
      });
    });
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbList);
    document.head.appendChild(script);
  }

  optimizeAnchorText() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim().toLowerCase();
      
      // Improve generic anchor text
      if (text === 'click here' || text === 'read more' || text === 'learn more') {
        link.textContent = this.generateBetterAnchorText(href);
      }
    });
  }

  generateBetterAnchorText(href) {
    if (href.includes('services')) return 'View Our Services';
    if (href.includes('calculator')) return 'Use Price Calculator';
    if (href.includes('about')) return 'About Breathe Safe';
    if (href.includes('projects')) return 'View Our Projects';
    if (href.includes('reviews')) return 'Read Customer Reviews';
    if (href.includes('blog')) return 'Read Our Blog';
    if (href.includes('quote')) return 'Get Free Quote';
    
    return 'Learn More';
  }

  addRelatedLinks() {
    const pageType = this.detectPageType();
    const relatedLinksContainer = document.querySelector('.related-links');
    
    if (!relatedLinksContainer) return;
    
    const relatedLinks = this.getRelatedLinks(pageType);
    
    relatedLinksContainer.innerHTML = `
      <h3>Related Pages</h3>
      <ul>
        ${relatedLinks.map(link => `<li><a href="${link.url}">${link.title}</a></li>`).join('')}
      </ul>
    `;
  }

  getRelatedLinks(pageType) {
    const allLinks = {
      home: [
        { url: '/services', title: 'Our Asbestos Removal Services' },
        { url: '/calculator', title: 'Get Instant Price Quote' },
        { url: '/projects', title: 'View Completed Projects' }
      ],
      services: [
        { url: '/calculator', title: 'Calculate Service Costs' },
        { url: '/quote', title: 'Request Free Quote' },
        { url: '/projects', title: 'See Our Work' }
      ],
      calculator: [
        { url: '/services', title: 'Learn About Our Services' },
        { url: '/quote', title: 'Get Detailed Quote' },
        { url: '/reviews', title: 'Read Customer Reviews' }
      ]
    };
    
    return allLinks[pageType] || allLinks.home;
  }

  optimizePageSpeed() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize font loading
    this.optimizeFontLoading();
    
    // Defer non-critical JavaScript
    this.deferNonCriticalJS();
    
    // Optimize CSS delivery
    this.optimizeCSSDelivery();
  }

  preloadCriticalResources() {
    const criticalResources = [
      { href: '/assets/images/logo_header_optimized.png', as: 'image' },
      { href: '/assets/images/hero.jpg', as: 'image' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'style') {
        link.onload = function() { this.rel = 'stylesheet'; };
      }
      document.head.appendChild(link);
    });
  }

  optimizeFontLoading() {
    // Add font-display: swap to improve loading performance
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      if (!link.href.includes('display=swap')) {
        link.href += link.href.includes('?') ? '&display=swap' : '?display=swap';
      }
    });
  }

  deferNonCriticalJS() {
    const nonCriticalScripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"]');
    nonCriticalScripts.forEach(script => {
      script.defer = true;
    });
  }

  optimizeCSSDelivery() {
    // Inline critical CSS and defer non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([href*="critical"])');
    nonCriticalCSS.forEach(link => {
      link.media = 'print';
      link.onload = function() { this.media = 'all'; };
    });
  }

  setupLocalSEO() {
    // Add local business schema
    this.addLocalBusinessSchema();
    
    // Optimize for local keywords
    this.optimizeLocalKeywords();
    
    // Add location-specific content
    this.addLocationContent();
  }

  addLocalBusinessSchema() {
    // Already handled in setupStructuredData()
  }

  optimizeLocalKeywords() {
    const localKeywords = [
      'Gold Coast asbestos removal',
      'Sunshine Coast demolition',
      'Brisbane asbestos removal',
      'Surfers Paradise demolition',
      'Broadbeach asbestos removal',
      'Burleigh Heads demolition'
    ];
    
    // Add local keywords to meta keywords
    const currentKeywords = document.querySelector('meta[name="keywords"]')?.content || '';
    const updatedKeywords = currentKeywords + ', ' + localKeywords.join(', ');
    this.updateMetaTag('keywords', updatedKeywords);
  }

  addLocationContent() {
    const locationContainer = document.querySelector('.location-content');
    if (locationContainer) {
      locationContainer.innerHTML = `
        <h3>Service Areas</h3>
        <p>We proudly serve the entire Gold Coast to Sunshine Coast region, including:</p>
        <ul>
          <li><strong>Gold Coast:</strong> Surfers Paradise, Broadbeach, Burleigh Heads, Coolangatta</li>
          <li><strong>Sunshine Coast:</strong> Noosa, Maroochydore, Caloundra, Nambour</li>
          <li><strong>Brisbane:</strong> CBD, South Brisbane, West End, New Farm</li>
        </ul>
      `;
    }
  }

  createSitemap() {
    // Generate dynamic sitemap
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/services', priority: '0.9', changefreq: 'monthly' },
      { url: '/calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/projects', priority: '0.8', changefreq: 'weekly' },
      { url: '/reviews', priority: '0.7', changefreq: 'weekly' },
      { url: '/blog', priority: '0.6', changefreq: 'weekly' },
      { url: '/quote', priority: '0.9', changefreq: 'monthly' }
    ];
    
    // This would typically be generated server-side
    console.log('Sitemap structure:', pages);
  }

  optimizeContent() {
    this.addHeadingStructure();
    this.optimizeContentLength();
    this.addKeywordDensity();
  }

  addHeadingStructure() {
    // Ensure proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (level > currentLevel + 1) {
        console.warn(`Heading hierarchy issue: ${heading.tagName} follows H${currentLevel}`);
      }
      
      currentLevel = level;
    });
  }

  optimizeContentLength() {
    const content = document.body.textContent;
    const wordCount = content.split(/\s+/).length;
    
    if (wordCount < 300) {
      console.warn('Content may be too short for optimal SEO (< 300 words)');
    }
    
    if (wordCount > 2000) {
      console.log('Content is comprehensive (> 2000 words) - good for SEO');
    }
  }

  addKeywordDensity() {
    const content = document.body.textContent.toLowerCase();
    const targetKeywords = ['asbestos removal', 'demolition', 'gold coast', 'sunshine coast'];
    
    targetKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      const density = matches ? (matches.length / content.split(/\s+/).length) * 100 : 0;
      
      console.log(`Keyword "${keyword}" density: ${density.toFixed(2)}%`);
      
      if (density < 0.5) {
        console.warn(`Consider adding more instances of "${keyword}"`);
      }
      
      if (density > 3) {
        console.warn(`Keyword "${keyword}" may be over-optimized (${density.toFixed(2)}%)`);
      }
    });
  }
}

// Initialize SEO optimization
document.addEventListener('DOMContentLoaded', () => {
  new SEOOptimizer();
});

// Export for use in other scripts
window.SEOOptimizer = SEOOptimizer;

