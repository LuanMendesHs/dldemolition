import os

# Template base comum
base_template = '''<!DOCTYPE html>
<html lang="en-AU" class="scroll-smooth">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {title}
  {meta}
  <meta name="robots" content="index,follow" />
  <meta name="theme-color" content="#e10600" />
  {canonical}

  <!-- Favicons -->
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon_icon.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon_icon.png" />
  <link rel="apple-touch-icon" href="assets/images/logo_symbol_only.png" />

  <!-- Open Graph -->
  {og}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_AU" />

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{ 
            brand: {{
              black: '#0c0c0c', 
              red: '#e10600', 
              white: '#ffffff', 
              gray: '#111216', 
              green: '#25D366',
              lightgray: '#f8f9fa',
              orange: '#FF6B35'
            }} 
          }},
          boxShadow: {{ 
            soft: '0 10px 25px rgba(0,0,0,.15)',
            glow: '0 0 20px rgba(225, 6, 0, 0.3)',
            'glow-orange': '0 0 20px rgba(255, 107, 53, 0.4)'
          }},
          animation: {{
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'bounce-slow': 'bounce 2s infinite',
            'fade-in': 'fadeIn 0.6s ease-out',
            'slide-up': 'slideUp 0.8s ease-out',
            'float': 'float 3s ease-in-out infinite'
          }},
          keyframes: {{
            fadeIn: {{
              '0%': {{ opacity: '0', transform: 'translateY(20px)' }},
              '100%': {{ opacity: '1', transform: 'translateY(0)' }}
            }},
            slideUp: {{
              '0%': {{ opacity: '0', transform: 'translateY(40px)' }},
              '100%': {{ opacity: '1', transform: 'translateY(0)' }}
            }},
            float: {{
              '0%, 100%': {{ transform: 'translateY(0px)' }},
              '50%': {{ transform: 'translateY(-10px)' }}
            }}
          }}
        }}
      }}
    }}
  </script>
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Custom Styles -->
  <style>
    .glass {{
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }}
    
    .gradient-text {{
      background: linear-gradient(135deg, #e10600, #ff6b35);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }}
    
    .hero-pattern {{
      background-image: 
        radial-gradient(circle at 25% 25%, rgba(225, 6, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
    }}
    
    .service-card {{
      transition: all 0.3s ease;
    }}
    
    .service-card:hover {{
      transform: translateY(-5px);
    }}
    
    @media (max-width: 768px) {{
      .mobile-menu {{
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }}
      
      .mobile-menu.open {{
        transform: translateX(0);
      }}
    }}
  </style>
</head>

<body class="bg-brand-black text-white font-sans">
  <!-- Emergency Banner -->
  <div class="bg-brand-red text-white py-2 px-4 text-center text-sm font-semibold animate-pulse-slow">
    <i class="fas fa-exclamation-triangle mr-2"></i>
    EMERGENCY 24/7 - Response within 2 hours across the region!
    <a href="tel:+61451612742" class="ml-4 bg-white text-brand-red px-3 py-1 rounded-full text-xs font-bold hover:bg-brand-lightgray transition-colors">
      <i class="fas fa-phone mr-1"></i>Call Now
    </a>
    <a href="https://wa.me/61451612742?text=Hello!%20I%20have%20an%20emergency%20asbestos%20situation" class="ml-2 bg-brand-green text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-green-600 transition-colors">
      <i class="fab fa-whatsapp mr-1"></i>WhatsApp
    </a>
  </div>

  <!-- Header -->
  <header class="bg-brand-gray/95 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-red/20">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <a href="/" class="flex items-center space-x-3">
            <img src="assets/images/logo_header_optimized.png" alt="Breathe Safe Logo" class="h-12 w-auto">
<div class="hidden sm:block">
              <div class="text-brand-red font-bold text-lg">DL</div>
              <div class="text-white text-xs">Demolition and asbestos experts</div>
            </div>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          {nav_links}
        </nav>

        <!-- Contact Info & CTA -->
        <div class="hidden lg:flex items-center space-x-4">
          <a href="tel:+61451612742" class="text-brand-red font-bold hover:text-white transition-colors">
            <i class="fas fa-phone mr-2"></i>(61) 451 612 742
          </a>
          <a href="quote.html" class="bg-brand-red text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors shadow-glow">
            Free Quote
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="lg:hidden text-white hover:text-brand-red transition-colors">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu lg:hidden fixed inset-y-0 left-0 w-80 bg-brand-gray z-50 shadow-xl">
      <div class="p-6">
        <div class="flex items-center justify-between mb-8">
          <img src="assets/images/logo_header_optimized.png" alt="Breathe Safe" class="h-10">
          <button id="close-mobile-menu" class="text-white hover:text-brand-red">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <nav class="space-y-4">
          {mobile_nav_links}
        </nav>

        <div class="mt-8 pt-8 border-t border-gray-600">
          <a href="tel:+61451612742" class="block text-brand-red font-bold text-lg mb-4">
            <i class="fas fa-phone mr-2"></i>(61) 451 612 742
          </a>
          <a href="https://wa.me/61451612742" class="block bg-brand-green text-white px-4 py-2 rounded-lg text-center font-bold">
            <i class="fab fa-whatsapp mr-2"></i>WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Trust Badges -->
  <div class="bg-brand-gray/50 py-3">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-center space-x-8 text-sm">
        <div class="flex items-center space-x-2">
          <i class="fas fa-shield-alt text-brand-red"></i>
          <span>Insured • EPA Compliant • Certified</span>
        </div>
      </div>
    </div>
  </div>

  {content}

  <!-- Footer -->
  <footer class="bg-brand-gray border-t border-brand-red/20 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
                <div class="flex flex-col items-center text-center">
          <img src="assets/images/logo_header_optimized.png" alt="Breathe Safe" class="h-20 mb-4 mx-auto">

          <p class="text-gray-400 mb-4 max-w-xs">
            Licensed asbestos removal and demolition specialists serving Gold Coast to Sunshine Coast.
          </p>

          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-brand-red transition-colors">
              <i class="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-brand-red transition-colors">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-brand-red transition-colors">
              <i class="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-bold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="/" class="text-gray-400 hover:text-brand-red transition-colors">Home</a></li>
            <li><a href="services.html" class="text-gray-400 hover:text-brand-red transition-colors">Services</a></li>
            <li><a href="calculator.html" class="text-gray-400 hover:text-brand-red transition-colors">Calculator</a></li>
            <li><a href="about.html" class="text-gray-400 hover:text-brand-red transition-colors">About</a></li>
            <li><a href="projects.html" class="text-gray-400 hover:text-brand-red transition-colors">Projects</a></li>
            <li><a href="reviews.html" class="text-gray-400 hover:text-brand-red transition-colors">Reviews</a></li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-white font-bold mb-4">Services</h4>
          <ul class="space-y-2">
            <li><a href="services.html#asbestos" class="text-gray-400 hover:text-brand-red transition-colors">Asbestos Removal</a></li>
            <li><a href="services.html#demolition" class="text-gray-400 hover:text-brand-red transition-colors">Demolition</a></li>
            <li><a href="services.html#floor" class="text-gray-400 hover:text-brand-red transition-colors">Floor Grinding</a></li>
            <li><a href="services.html#tile" class="text-gray-400 hover:text-brand-red transition-colors">Tile Removal</a></li>
            <li><a href="services.html#stripout" class="text-gray-400 hover:text-brand-red transition-colors">Strip Out</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-bold mb-4">Contact</h4>
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <i class="fas fa-phone text-brand-red"></i>
              <a href="tel:+61451612742" class="hover:text-brand-red transition-colors">(61) 451 612 742</a>
            </div>
            <div class="flex items-center space-x-3">
              <i class="fab fa-whatsapp text-brand-green"></i>
              <a href="https://wa.me/61451612742" class="hover:text-brand-red transition-colors">WhatsApp</a>
            </div>
            <div class="flex items-center space-x-3">
              <i class="fas fa-envelope text-brand-red"></i>
              <a href="mailto:hello@dldemolition.com.au" class="hover:text-brand-red transition-colors">hello@dldemolition.com.au</a>
            </div>
            <div class="flex items-center space-x-3">
              <i class="fas fa-map-marker-alt text-brand-red"></i>
              <span class="text-gray-400">Gold Coast to Sunshine Coast</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 DL Demolition And Asbestos Experts. All Rights Reserved.</p>
        <p class="mt-2 text-sm">Licensed asbestos removalists | EPA compliant | Fully insured</p>
      </div>
    </div>
  </footer>

  <!-- Mobile Bottom Bar -->
  <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-brand-gray border-t border-brand-red/20 z-40">
    <div class="flex items-center justify-around py-3">
      <a href="tel:+61451612742" class="flex flex-col items-center space-y-1 text-white hover:text-brand-red transition-colors">
        <i class="fas fa-phone text-lg"></i>
        <span class="text-xs">Call</span>
      </a>
      <a href="https://wa.me/61451612742" class="flex flex-col items-center space-y-1 text-brand-green hover:text-green-400 transition-colors">
        <i class="fab fa-whatsapp text-lg"></i>
        <span class="text-xs">WhatsApp</span>
      </a>
      <a href="quote.html" class="flex flex-col items-center space-y-1 bg-brand-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
        <i class="fas fa-quote-right text-lg"></i>
        <span class="text-xs font-bold">Free Quote</span>
      </a>
    </div>
  </div>

  <!-- WhatsApp Floating Button -->
<a href="https://wa.me/61451612742?text=Hello!%20I%20would%20like%20to%20request%20a%20quote%20for%20asbestos%20removal/demolition" 
   class="fixed bottom-20 lg:bottom-2 right-6 bg-brand-green text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors z-30 animate-bounce-slow"
   aria-label="Contact us on WhatsApp">
  <img src="assets/images/social.png" 
       alt="Contact us on WhatsApp"
       class="w-7 h-7 object-contain rounded-full">
</a>

  <!-- Back to Top Button -->
  <button id="back-to-top" 
          class="fixed bottom-32 lg:bottom-20 right-6 bg-brand-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 opacity-0 invisible z-30"
          aria-label="Back to top">
          <img src="assets/images/arrow-up.png" 
       alt="Contact us on WhatsApp"
       class="w-5 h-5 object-contain rounded-full">
  </button>

  <!-- JavaScript -->
  <script>
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {{
      mobileMenu.classList.add('open');
    }});

    closeMobileMenu.addEventListener('click', () => {{
      mobileMenu.classList.remove('open');
    }});

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {{
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {{
        mobileMenu.classList.remove('open');
      }}
    }});

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {{
      if (window.pageYOffset > 300) {{
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      }} else {{
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
      }}
    }});

    backToTopBtn.addEventListener('click', () => {{
      window.scrollTo({{
        top: 0,
        behavior: 'smooth'
      }});
    }});

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {{
      anchor.addEventListener('click', function (e) {{
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {{
          target.scrollIntoView({{
            behavior: 'smooth',
            block: 'start'
          }});
        }}
      }});
    }});

    {additional_js}
  </script>
</body>
</html>'''

# Configurações das páginas
pages = {
    'calculator.html': {
        'title': '<title>Price Calculator | Breathe Safe Asbestos Removal & Demolition</title>',
        'meta': '<meta name="description" content="Get instant price estimates for asbestos removal, demolition, and floor grinding services. Professional calculator with transparent pricing for Gold Coast to Sunshine Coast." />',
        'canonical': '<link rel="canonical" href="https://breathesafe.com.au/calculator" />',
        'og': '<meta property="og:title" content="Price Calculator | Breathe Safe" /><meta property="og:description" content="Get instant price estimates for professional asbestos removal and demolition services." />',
        'active_page': 'calculator.html'
    },
    'about.html': {
        'title': '<title>About Breathe Safe | Licensed Asbestos Removal Specialists</title>',
        'meta': '<meta name="description" content="Learn about Breathe Safe - licensed asbestos removal specialists with 100+ completed projects. EPA compliant, fully insured, serving Gold Coast to Sunshine Coast." />',
        'canonical': '<link rel="canonical" href="https://breathesafe.com.au/about" />',
        'og': '<meta property="og:title" content="About Breathe Safe | Licensed Specialists" /><meta property="og:description" content="Licensed asbestos removal specialists with 100+ completed projects and zero accidents." />',
        'active_page': 'about.html'
    },
    'projects.html': {
        'title': '<title>Completed Projects | Breathe Safe Asbestos Removal Gallery</title>',
        'meta': '<meta name="description" content="View our completed asbestos removal and demolition projects across Gold Coast to Sunshine Coast. Before & after photos, case studies, and client testimonials." />',
        'canonical': '<link rel="canonical" href="https://breathesafe.com.au/projects" />',
        'og': '<meta property="og:title" content="Completed Projects | Breathe Safe" /><meta property="og:description" content="View our professional asbestos removal and demolition projects with before & after photos." />',
        'active_page': 'projects.html'
    },
    'reviews.html': {
        'title': '<title>Client Reviews & Testimonials | Breathe Safe</title>',
        'meta': '<meta name="description" content="Read genuine client reviews and testimonials for Breathe Safe asbestos removal and demolition services. 4.8/5 stars with 85+ verified reviews." />',
        'canonical': '<link rel="canonical" href="https://breathesafe.com.au/reviews" />',
        'og': '<meta property="og:title" content="Client Reviews | Breathe Safe" /><meta property="og:description" content="4.8/5 stars with 85+ verified reviews from satisfied clients across Gold Coast to Sunshine Coast." />',
        'active_page': 'reviews.html'
    },
    'quote.html': {
        'title': '<title>Free Quote Request | Breathe Safe Asbestos Removal</title>',
        'meta': '<meta name="description" content="Request your free quote for asbestos removal, demolition, or floor grinding services. Guaranteed response within 24 hours. Serving Gold Coast to Sunshine Coast." />',
        'canonical': '<link rel="canonical" href="https://breathesafe.com.au/quote" />',
        'og': '<meta property="og:title" content="Free Quote Request | Breathe Safe" /><meta property="og:description" content="Get your free quote with guaranteed response within 24 hours." />',
        'active_page': 'quote.html'
    }
}

def create_nav_links(active_page):
    pages_nav = [
        ('/', 'Home'),
        ('services.html', 'Services'),
        ('calculator.html', 'Calculator'),
        ('about.html', 'About'),
        ('projects.html', 'Projects'),
        ('reviews.html', 'Reviews'),
        ('blog.html', 'Blog')
    ]
    
    nav_links = []
    mobile_nav_links = []
    
    for url, name in pages_nav:
        if url == '/' and active_page == 'index.html':
            nav_links.append(f'<a href="{url}" class="text-brand-red hover:text-white transition-colors font-medium border-b-2 border-brand-red">{name}</a>')
            mobile_nav_links.append(f'<a href="{url}" class="block text-brand-red text-xl font-bold">{name}</a>')
        elif url == active_page:
            nav_links.append(f'<a href="{url}" class="text-brand-red hover:text-white transition-colors font-medium border-b-2 border-brand-red">{name}</a>')
            mobile_nav_links.append(f'<a href="{url}" class="block text-brand-red text-xl font-bold">{name}</a>')
        else:
            nav_links.append(f'<a href="{url}" class="text-white hover:text-brand-red transition-colors font-medium">{name}</a>')
            mobile_nav_links.append(f'<a href="{url}" class="block text-white text-xl hover:text-brand-red transition-colors">{name}</a>')
    
    mobile_nav_links.append('<a href="quote.html" class="block text-white text-xl hover:text-brand-red transition-colors">Free Quote</a>')
    
    return '\\n          '.join(nav_links), '\\n          '.join(mobile_nav_links)

# Conteúdos específicos das páginas
contents = {
    'calculator.html': '''
  <!-- Hero Section -->
  <section class="relative py-20 hero-pattern">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
          Instant <span class="text-brand-red">Price Calculator</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          Get an instant estimate for your project. Based on current market rates and our 3+ years of experience.
        </p>
      </div>
    </div>
  </section>

  <!-- Calculator Section -->
  <section class="py-20 bg-brand-black">
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Calculator Form -->
        <div class="bg-brand-gray/50 rounded-2xl p-8 border border-white/10">
          <h2 class="text-3xl font-bold text-white mb-8">Project Details</h2>
          
          <form id="calculator-form" class="space-y-6">
            <div>
              <label for="service-type" class="block text-sm font-medium text-gray-300 mb-2">Service Type *</label>
              <select id="service-type" name="service-type" required 
                      class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-brand-red transition-colors">
                <option value="">Select service type</option>
                <option value="asbestos-roof" data-min="55" data-max="95">Asbestos Roof Removal ($55-95/m²)</option>
                <option value="asbestos-wall" data-min="50" data-max="80">Asbestos Wall/Ceiling ($50-80/m²)</option>
                <option value="asbestos-floor" data-min="45" data-max="70">Asbestos Floor/Tiles ($45-70/m²)</option>
                <option value="demolition-residential" data-min="40" data-max="65">Residential Demolition ($40-65/m²)</option>
                <option value="demolition-commercial" data-min="35" data-max="55">Commercial Demolition ($35-55/m²)</option>
                <option value="stripout" data-min="25" data-max="45">Strip-out Services ($25-45/m²)</option>
                <option value="floor-grinding" data-min="30" data-max="50">Floor Grinding ($30-50/m²)</option>
              </select>
            </div>
            
            <div>
              <label for="area" class="block text-sm font-medium text-gray-300 mb-2">Area (Square Meters) *</label>
              <input type="number" id="area" name="area" required min="1" max="10000"
                     class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors"
                     placeholder="e.g. 50">
              <p class="text-xs text-gray-400 mt-1">Not sure? We can measure during inspection</p>
            </div>
            
            <div>
              <label for="urgency" class="block text-sm font-medium text-gray-300 mb-2">Urgency Level</label>
              <select id="urgency" name="urgency" 
                      class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-brand-red transition-colors">
                <option value="standard">Standard (1-2 weeks)</option>
                <option value="urgent">Urgent (Within 1 week) +15%</option>
                <option value="emergency">Emergency (24-48 hours) +30%</option>
              </select>
            </div>
            
            <div>
              <label for="access" class="block text-sm font-medium text-gray-300 mb-2">Access Difficulty</label>
              <select id="access" name="access" 
                      class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-brand-red transition-colors">
                <option value="easy">Easy Access</option>
                <option value="moderate">Moderate Access +10%</option>
                <option value="difficult">Difficult Access +25%</option>
              </select>
            </div>
            
            <div>
              <label for="location" class="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <select id="location" name="location" 
                      class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-brand-red transition-colors">
                <option value="gold-coast">Gold Coast</option>
                <option value="sunshine-coast">Sunshine Coast</option>
                <option value="brisbane">Brisbane +10%</option>
                <option value="other">Other Location +15%</option>
              </select>
            </div>
            
            <button type="button" id="calculate-btn" class="w-full bg-brand-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors shadow-glow">
              <i class="fas fa-calculator mr-2"></i>Calculate Estimate
            </button>
          </form>
        </div>
        
        <!-- Results -->
        <div class="bg-brand-gray/30 rounded-2xl p-8 border border-white/10">
          <h2 class="text-3xl font-bold text-white mb-8">Your Estimate</h2>
          
          <div id="estimate-result" class="text-center">
            <div class="text-gray-400 mb-4">
              <i class="fas fa-calculator text-6xl mb-4"></i>
              <p>Fill in the details to get your instant estimate</p>
            </div>
          </div>
          
          <div id="estimate-breakdown" class="hidden space-y-4 mt-8">
            <div class="border-t border-gray-600 pt-4">
              <div class="flex justify-between text-gray-300 mb-2">
                <span>Base Cost:</span>
                <span id="base-cost">$0</span>
              </div>
              <div class="flex justify-between text-gray-300 mb-2">
                <span>Urgency Adjustment:</span>
                <span id="urgency-cost">$0</span>
              </div>
              <div class="flex justify-between text-gray-300 mb-2">
                <span>Access Adjustment:</span>
                <span id="access-cost">$0</span>
              </div>
              <div class="flex justify-between text-gray-300 mb-4">
                <span>Location Adjustment:</span>
                <span id="location-cost">$0</span>
              </div>
              <div class="border-t border-gray-600 pt-4">
                <div class="flex justify-between text-white text-xl font-bold">
                  <span>Total Estimate:</span>
                  <span id="total-estimate">$0</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 p-4 bg-brand-red/20 rounded-lg border border-brand-red/30">
            <p class="text-sm text-gray-300 mb-2">
              <i class="fas fa-info-circle text-brand-red mr-2"></i>
              This is an indicative estimate only. Final pricing may vary based on site inspection.
            </p>
            <a href="quote.html" class="inline-block bg-brand-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors mt-4">
              Get Accurate Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-brand-red">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold text-white mb-4">Ready for an Accurate Quote?</h2>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Get a detailed, accurate quote based on a professional site inspection. 
        We guarantee response within 24 hours.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="quote.html" class="bg-white text-brand-red px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          <i class="fas fa-clipboard-list mr-2"></i>Request Site Inspection
        </a>
        <a href="tel:+61451612742" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-red transition-colors">
          <i class="fas fa-phone mr-2"></i>Call (61) 451 612 742
        </a>
      </div>
    </div>
  </section>
''',
    'about.html': '''
  <!-- Hero Section -->
  <section class="relative py-20 hero-pattern">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
          About <span class="text-brand-red">Breathe Safe</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          Licensed asbestos removal specialists with over 3 years of experience and 100+ completed projects. 
          Your safety is our priority.
        </p>
      </div>
    </div>
  </section>

  <!-- Company Story -->
  <section class="py-20 bg-brand-black">
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl font-bold text-white mb-6">Our Story</h2>
          <p class="text-xl text-gray-300 mb-6">
            Breathe Safe was founded with a simple mission: to provide safe, professional, and reliable asbestos removal and demolition services across the Gold Coast to Sunshine Coast region.
          </p>
          <p class="text-gray-300 mb-6">
            With over 3 years of dedicated service and 100+ successfully completed projects, we've built our reputation on safety, professionalism, and customer satisfaction. Our team of licensed specialists follows all Australian safety protocols and regulations.
          </p>
          <p class="text-gray-300 mb-8">
            We understand that dealing with asbestos can be stressful, which is why we're committed to making the process as smooth and worry-free as possible for our clients.
          </p>
          
          <div class="grid grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold text-brand-red">100+</div>
              <div class="text-sm text-gray-400">Projects Completed</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-brand-red">3+</div>
              <div class="text-sm text-gray-400">Years Experience</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-brand-red">0</div>
              <div class="text-sm text-gray-400">Accidents</div>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <img src="assets/images/roof_asbestos_removal_male.jpg" alt="Professional asbestos removal team" class="rounded-2xl shadow-soft w-full">
          <div class="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Certifications -->
  <section class="py-20 bg-brand-gray/30">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Certifications & Compliance</h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          We maintain the highest standards of safety and compliance with all Australian regulations.
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <i class="fas fa-certificate text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Class A & B Licensed</h3>
          <p class="text-gray-400">Fully licensed for all types of asbestos removal work</p>
        </div>
        
        <div class="text-center">
          <div class="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <i class="fas fa-leaf text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">EPA Compliant</h3>
          <p class="text-gray-400">Environmental Protection Authority compliance</p>
        </div>
        
        <div class="text-center">
          <div class="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <i class="fas fa-shield-alt text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Fully Insured</h3>
          <p class="text-gray-400">Comprehensive public liability insurance</p>
        </div>
        
        <div class="text-center">
          <div class="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <i class="fas fa-hard-hat text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Safety Certified</h3>
          <p class="text-gray-400">Workplace health and safety compliance</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Service Areas -->
  <section class="py-20 bg-brand-black">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Service Areas</h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          We proudly serve the entire Gold Coast to Sunshine Coast corridor with rapid response times.
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-brand-gray/30 rounded-2xl p-8 text-center">
          <div class="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <i class="fas fa-map-marker-alt text-white text-2xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Gold Coast</h3>
          <ul class="text-gray-300 space-y-2">
            <li>Surfers Paradise</li>
            <li>Broadbeach</li>
            <li>Robina</li>
            <li>Burleigh Heads</li>
            <li>Southport</li>
          </ul>
        </div>
        
        <div class="bg-brand-gray/30 rounded-2xl p-8 text-center">
          <div class="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <i class="fas fa-map-marker-alt text-white text-2xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Sunshine Coast</h3>
          <ul class="text-gray-300 space-y-2">
            <li>Noosa</li>
            <li>Maroochydore</li>
            <li>Caloundra</li>
            <li>Nambour</li>
            <li>Coolum Beach</li>
          </ul>
        </div>
        
        <div class="bg-brand-gray/30 rounded-2xl p-8 text-center">
          <div class="bg-brand-red p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <i class="fas fa-map-marker-alt text-white text-2xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Brisbane & Surrounds</h3>
          <ul class="text-gray-300 space-y-2">
            <li>Brisbane CBD</li>
            <li>Logan</li>
            <li>Ipswich</li>
            <li>Redlands</li>
            <li>Moreton Bay</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-brand-red">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Experience the difference of working with licensed professionals who prioritize your safety and satisfaction.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="quote.html" class="bg-white text-brand-red px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          <i class="fas fa-calculator mr-2"></i>Get Free Quote
        </a>
        <a href="tel:+61451612742" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-red transition-colors">
          <i class="fas fa-phone mr-2"></i>Call (61) 451 612 742
        </a>
      </div>
    </div>
  </section>
''',
    'projects.html': '''
  <!-- Hero Section -->
  <section class="relative py-20 hero-pattern">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
          Completed <span class="text-brand-red">Projects</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          See our professional work across Gold Coast and Sunshine Coast. 
          Every project completed safely and to the highest standards.
        </p>
      </div>
    </div>
  </section>

  <!-- Project Gallery -->
  <section class="py-20 bg-brand-black">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Project 1 -->
        <div class="bg-brand-gray/30 rounded-2xl overflow-hidden border border-white/10">
          <img src="assets/images/bathroom_before.jpg" alt="Bathroom renovation project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">Bathroom Strip-Out</h3>
            <p class="text-gray-400 mb-3">Gold Coast 2024</p>
            <p class="text-gray-300 mb-4">Complete bathroom demolition with asbestos tile removal</p>
            <div class="flex items-center justify-between">
              <span class="text-brand-red font-bold">Residential Project</span>
              <span class="text-gray-400 text-sm">3 days completion</span>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="bg-brand-gray/30 rounded-2xl overflow-hidden border border-white/10">
          <img src="assets/images/kitchen_before.jpg" alt="Kitchen demolition project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">Kitchen Demolition</h3>
            <p class="text-gray-400 mb-3">Southport 2024</p>
            <p class="text-gray-300 mb-4">Full kitchen strip-out and floor preparation</p>
            <div class="flex items-center justify-between">
              <span class="text-brand-red font-bold">Residential Project</span>
              <span class="text-gray-400 text-sm">2 days completion</span>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="bg-brand-gray/30 rounded-2xl overflow-hidden border border-white/10">
          <img src="assets/images/bedroom_demolished.jpg" alt="Bedroom strip-out project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">Bedroom Strip-Out</h3>
            <p class="text-gray-400 mb-3">Robina 2024</p>
            <p class="text-gray-300 mb-4">Carpet and flooring removal, wall preparation</p>
            <div class="flex items-center justify-between">
              <span class="text-brand-red font-bold">Residential Project</span>
              <span class="text-gray-400 text-sm">1 day completion</span>
            </div>
          </div>
        </div>

        <!-- Project 4 -->
        <div class="bg-brand-gray/30 rounded-2xl overflow-hidden border border-white/10">
          <img src="assets/images/roof_asbestos_removal.jpg" alt="Roof asbestos removal project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">Roof Asbestos Removal</h3>
            <p class="text-gray-400 mb-3">Burleigh 2024</p>
            <p class="text-gray-300 mb-4">Complete roof replacement with safe disposal</p>
            <div class="flex items-center justify-between">
              <span class="text-brand-red font-bold">Residential Project</span>
              <span class="text-gray-400 text-sm">5 days completion</span>
            </div>
          </div>
        </div>

        <!-- Project 5 -->
        <div class="bg-brand-gray/30 rounded-2xl overflow-hidden border border-white/10">
          <img src="assets/images/manual_demolition.jpg" alt="Manual demolition project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">Internal Demolition</h3>
            <p class="text-gray-400 mb-3">Broadbeach 2024</p>
            <p class="text-gray-300 mb-4">Controlled internal wall removal and strip-out</p>
            <div class="flex items-center justify-between">
              <span class="text-brand-red font-bold">Commercial Project</span>
              <span class="text-gray-400 text-sm">4 days completion</span>
            </div>
          </div>
        </div>

        <!-- Project 6 -->
        <div class="bg-brand-gray/30 rounded-2xl overflow-hidden border border-white/10">
          <img src="assets/images/internal_stripout.jpg" alt="Internal strip-out project" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">Office Strip-Out</h3>
            <p class="text-gray-400 mb-3">Surfers Paradise 2024</p>
            <p class="text-gray-300 mb-4">Complete office renovation preparation</p>
            <div class="flex items-center justify-between">
              <span class="text-brand-red font-bold">Commercial Project</span>
              <span class="text-gray-400 text-sm">3 days completion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Before & After -->
  <section class="py-20 bg-brand-gray/30">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Before & After Transformations</h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          See the dramatic transformations we achieve through professional asbestos removal and demolition.
        </p>
      </div>
      
      <div class="space-y-16">
        <!-- Transformation 1 -->
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div class="relative">
              <img src="assets/images/bathroom_before_clean.jpg" alt="Bathroom before renovation" class="rounded-2xl shadow-soft w-full">
              <div class="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-bold">
                BEFORE
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <img src="assets/images/bathroom_after.jpg" alt="Bathroom after renovation" class="rounded-2xl shadow-soft w-full">
              <div class="absolute top-4 left-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-bold">
                AFTER
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-2">Bathroom Renovation - Surfers Paradise</h3>
          <p class="text-gray-400 mb-4">Complete asbestos tile removal and surface preparation for modern renovation</p>
          <div class="flex items-center justify-center space-x-8">
            <span class="text-brand-red font-bold">Residential Project</span>
            <span class="text-gray-400">3 days completion</span>
          </div>
        </div>

        <!-- Transformation 2 -->
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div class="relative">
              <img src="assets/images/kitchen_before_clean.jpg" alt="Kitchen before renovation" class="rounded-2xl shadow-soft w-full">
              <div class="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-bold">
                BEFORE
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <img src="assets/images/kitchen_after.jpg" alt="Kitchen after renovation" class="rounded-2xl shadow-soft w-full">
              <div class="absolute top-4 left-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-bold">
                AFTER
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-2">Kitchen Makeover - Broadbeach</h3>
          <p class="text-gray-400 mb-4">Safe removal of asbestos flooring and complete kitchen strip-out</p>
          <div class="flex items-center justify-center space-x-8">
            <span class="text-brand-red font-bold">Residential Project</span>
            <span class="text-gray-400">2 days completion</span>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-16">
        <div class="bg-brand-gray/50 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-white mb-4">See Your Project Here Next</h3>
          <p class="text-gray-300 mb-6">
            Every project tells a story of transformation. Let us help you write yours with professional asbestos removal and renovation services.
          </p>
          <a href="quote.html" class="bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-glow">
            Start Your Project
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-brand-red">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Join our satisfied clients and experience professional asbestos removal and demolition services.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="quote.html" class="bg-white text-brand-red px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          <i class="fas fa-calculator mr-2"></i>Get Free Quote
        </a>
        <a href="tel:+61451612742" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-red transition-colors">
          <i class="fas fa-phone mr-2"></i>Call (61) 451 612 742
        </a>
      </div>
    </div>
  </section>
''',
    'reviews.html': '''
  <!-- Hero Section -->
  <section class="relative py-20 hero-pattern">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
          Client <span class="text-brand-red">Reviews</span>
        </h1>
        <div class="flex items-center justify-center space-x-2 mb-6">
          <div class="flex text-yellow-400 text-2xl">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <span class="text-white font-bold text-xl">4.8/5</span>
          <span class="text-gray-400">(85+ reviews)</span>
        </div>
        <p class="text-xl text-gray-300 leading-relaxed">
          Don't just take our word for it. See what our satisfied clients have to say about our professional service.
        </p>
      </div>
    </div>
  </section>

  <!-- Reviews Grid -->
  <section class="py-20 bg-brand-black">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Review 1 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Breathe Safe did an excellent job removing asbestos from our 1970s home. The team was professional, punctual, and explained everything clearly. Highly recommend!"
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">SM</span>
            </div>
            <div>
              <div class="text-white font-bold">Sarah Mitchell</div>
              <div class="text-gray-400 text-sm">Surfers Paradise</div>
            </div>
          </div>
        </div>

        <!-- Review 2 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Quick response for our emergency situation. They arrived within 2 hours and handled the asbestos exposure safely and efficiently. Great service!"
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">MJ</span>
            </div>
            <div>
              <div class="text-white font-bold">Mark Johnson</div>
              <div class="text-gray-400 text-sm">Broadbeach</div>
            </div>
          </div>
        </div>

        <!-- Review 3 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Professional demolition service. Clean, efficient, and great value for money. The team cleaned up everything perfectly. Highly recommend for any demolition work."
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">LW</span>
            </div>
            <div>
              <div class="text-white font-bold">Lisa Wong</div>
              <div class="text-gray-400 text-sm">Robina</div>
            </div>
          </div>
        </div>

        <!-- Review 4 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Fantastic service from start to finish. The quote was competitive, the work was completed on time, and the quality was excellent. Will definitely use again."
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">DT</span>
            </div>
            <div>
              <div class="text-white font-bold">David Thompson</div>
              <div class="text-gray-400 text-sm">Southport</div>
            </div>
          </div>
        </div>

        <!-- Review 5 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Very impressed with the professionalism and attention to safety. They provided all the necessary certificates and documentation. Peace of mind guaranteed."
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">JB</span>
            </div>
            <div>
              <div class="text-white font-bold">Jennifer Brown</div>
              <div class="text-gray-400 text-sm">Burleigh Heads</div>
            </div>
          </div>
        </div>

        <!-- Review 6 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Excellent communication throughout the project. They kept us informed at every step and completed the work exactly as promised. Top-notch service!"
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">RP</span>
            </div>
            <div>
              <div class="text-white font-bold">Robert Parker</div>
              <div class="text-gray-400 text-sm">Noosa</div>
            </div>
          </div>
        </div>

        <!-- Review 7 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Fast, reliable, and reasonably priced. The team was courteous and worked efficiently. Our renovation project is now ready for the next phase. Thank you!"
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">AM</span>
            </div>
            <div>
              <div class="text-white font-bold">Amanda Miller</div>
              <div class="text-gray-400 text-sm">Maroochydore</div>
            </div>
          </div>
        </div>

        <!-- Review 8 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Outstanding service! They handled our commercial strip-out project with complete professionalism. Minimal disruption to our business operations."
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">KL</span>
            </div>
            <div>
              <div class="text-white font-bold">Kevin Lee</div>
              <div class="text-gray-400 text-sm">Brisbane</div>
            </div>
          </div>
        </div>

        <!-- Review 9 -->
        <div class="bg-brand-gray/30 rounded-2xl p-6 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-gray-300 mb-4">
            "Breathe Safe exceeded our expectations. Professional, safe, and thorough. The clearance certificate was provided promptly. Couldn't be happier!"
          </p>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
              <span class="text-white font-bold">TC</span>
            </div>
            <div>
              <div class="text-white font-bold">Tracy Chen</div>
              <div class="text-gray-400 text-sm">Caloundra</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Review Stats -->
  <section class="py-20 bg-brand-gray/30">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Customer Satisfaction</h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          Our commitment to excellence is reflected in our customer satisfaction ratings.
        </p>
      </div>
      
      <div class="grid md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-brand-red mb-2">4.8/5</div>
          <div class="text-white font-bold mb-1">Overall Rating</div>
          <div class="text-gray-400 text-sm">Based on 85+ reviews</div>
        </div>
        
        <div class="text-center">
          <div class="text-4xl font-bold text-brand-red mb-2">98%</div>
          <div class="text-white font-bold mb-1">Would Recommend</div>
          <div class="text-gray-400 text-sm">To friends & family</div>
        </div>
        
        <div class="text-center">
          <div class="text-4xl font-bold text-brand-red mb-2">100%</div>
          <div class="text-white font-bold mb-1">Safety Compliance</div>
          <div class="text-gray-400 text-sm">Zero accidents recorded</div>
        </div>
        
        <div class="text-center">
          <div class="text-4xl font-bold text-brand-red mb-2">24h</div>
          <div class="text-white font-bold mb-1">Response Time</div>
          <div class="text-gray-400 text-sm">Average quote delivery</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Leave Review -->
  <section class="py-20 bg-brand-black">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Share Your Experience</h2>
        <p class="text-xl text-gray-300 mb-8">
          We'd love to hear about your experience with Breathe Safe. Your feedback helps us continue to improve our services.
        </p>
        
        <div class="bg-brand-gray/30 rounded-2xl p-8 border border-white/10">
          <div class="grid md:grid-cols-2 gap-6">
            <a href="https://www.google.com/search?q=breathe+safe+asbestos+removal" target="_blank" 
               class="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center">
              <i class="fab fa-google text-3xl mb-3"></i>
              <div class="font-bold">Review on Google</div>
              <div class="text-sm opacity-90">Help others find us</div>
            </a>
            
            <a href="https://www.facebook.com" target="_blank" 
               class="bg-blue-800 text-white p-6 rounded-lg hover:bg-blue-900 transition-colors text-center">
              <i class="fab fa-facebook text-3xl mb-3"></i>
              <div class="font-bold">Review on Facebook</div>
              <div class="text-sm opacity-90">Share your story</div>
            </a>
          </div>
          
          <div class="mt-6 pt-6 border-t border-gray-600">
            <p class="text-gray-400 text-sm">
              Or contact us directly at <a href="mailto:hello@dldemolition.com.au" class="text-brand-red hover:text-white transition-colors">hello@dldemolition.com.au</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-brand-red">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold text-white mb-4">Join Our Satisfied Clients</h2>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Experience the same professional service that has earned us 4.8/5 stars and 98% customer satisfaction.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="quote.html" class="bg-white text-brand-red px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          <i class="fas fa-calculator mr-2"></i>Get Free Quote
        </a>
        <a href="tel:+61451612742" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-red transition-colors">
          <i class="fas fa-phone mr-2"></i>Call (61) 451 612 742
        </a>
      </div>
    </div>
  </section>
''',
    'quote.html': '''
  <!-- Hero Section -->
  <section class="relative py-20 hero-pattern">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
          Free <span class="text-brand-red">Quote Request</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          Get your detailed quote within 24 hours. Professional site inspection and transparent pricing guaranteed.
        </p>
      </div>
    </div>
  </section>

  <!-- Quote Form -->
  <section class="py-20 bg-brand-black">
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Form -->
        <div class="bg-brand-gray/50 rounded-2xl p-8 border border-white/10">
          <h2 class="text-3xl font-bold text-white mb-8">Request Your Free Quote</h2>
          
          <form id="detailed-quote-form" class="space-y-6">
            <!-- Personal Information -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input type="text" id="fullName" name="fullName" required 
                       class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors"
                       placeholder="e.g. John Smith">
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required 
                       class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors"
                       placeholder="e.g. 0412 345 678">
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input type="email" id="email" name="email" required 
                       class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors"
                       placeholder="e.g. john@email.com">
              </div>
              <div>
                <label for="location" class="block text-sm font-medium text-gray-300 mb-2">Property Address *</label>
                <input type="text" id="location" name="location" required 
                       class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors"
                       placeholder="e.g. 123 Main St, Surfers Paradise">
              </div>
            </div>
            
            <!-- Project Details -->
            <div>
              <label for="service" class="block text-sm font-medium text-gray-300 mb-2">Primary Service Required *</label>
              <select id="service" name="service" required 
                      class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-brand-red transition-colors">
                <option value="">Choose the primary service you need</option>
                <option value="asbestos-removal">Asbestos Removal</option>
                <option value="demolition">Demolition</option>
                <option value="floor-grinding">Floor Grinding</option>
                <option value="tile-removal">Tile Removal</option>
                <option value="strip-out">Strip Out</option>
                <option value="multiple">Multiple Services</option>
                <option value="other">Other (please specify)</option>
              </select>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label for="propertyType" class="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                <select id="propertyType" name="propertyType" 
                        class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-brand-red transition-colors">
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <div>
                <label for="urgency" class="block text-sm font-medium text-gray-300 mb-2">Project Urgency</label>
                <select id="urgency" name="urgency" 
                        class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-brand-red transition-colors">
                  <option value="standard">Standard (1-2 weeks)</option>
                  <option value="urgent">Urgent (Within 1 week)</option>
                  <option value="emergency">Emergency (24-48 hours)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-300 mb-2">Project Description *</label>
              <textarea id="description" name="description" rows="4" required 
                        class="w-full px-4 py-3 bg-brand-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-red transition-colors resize-none"
                        placeholder="Please describe your project in detail, including:
- What needs to be removed or demolished
- Approximate area/size
- Any specific requirements or concerns
- Preferred timeline"></textarea>
            </div>
            
            <!-- File Upload -->
            <div>
              <label for="images" class="block text-sm font-medium text-gray-300 mb-2">Project Images (Optional)</label>
              <div class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-brand-red transition-colors cursor-pointer" id="upload-area">
                <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                <p class="text-gray-400">Click to upload or drag & drop</p>
                <p class="text-xs text-gray-500 mt-1">JPEG/PNG up to 5MB each. Multiple angles recommended.</p>
                <input type="file" id="images" name="images" multiple accept="image/jpeg,image/png" class="hidden">
              </div>
              <div id="uploaded-files" class="mt-2 space-y-1"></div>
            </div>
            
            <!-- Preferred Contact -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Preferred Contact Method</label>
              <div class="grid grid-cols-3 gap-4">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="contactMethod" value="phone" checked class="text-brand-red">
                  <span class="text-gray-300">Phone</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="contactMethod" value="email" class="text-brand-red">
                  <span class="text-gray-300">Email</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="contactMethod" value="whatsapp" class="text-brand-red">
                  <span class="text-gray-300">WhatsApp</span>
                </label>
              </div>
            </div>
            
            <!-- Agreement -->
            <div class="flex items-start space-x-3">
              <input type="checkbox" id="agree" name="agree" required class="mt-1 rounded">
              <label for="agree" class="text-sm text-gray-300">
                I agree to be contacted by Breathe Safe regarding this quote request. I understand that providing accurate information will help ensure an accurate quote. Your information is secure and will not be shared with third parties.
              </label>
            </div>
            
            <button type="submit" class="w-full bg-brand-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors shadow-glow">
              <i class="fas fa-paper-plane mr-2"></i>Submit Quote Request
            </button>
          </form>
        </div>
        
        <!-- Information -->
        <div class="space-y-8">
          <!-- What to Expect -->
          <div class="bg-brand-gray/30 rounded-2xl p-8 border border-white/10">
            <h3 class="text-2xl font-bold text-white mb-6">What to Expect</h3>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="bg-brand-red p-2 rounded-full flex-shrink-0">
                  <i class="fas fa-clock text-white"></i>
                </div>
                <div>
                  <h4 class="text-white font-bold">24-Hour Response</h4>
                  <p class="text-gray-400 text-sm">We guarantee to respond to your quote request within 24 hours</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-brand-red p-2 rounded-full flex-shrink-0">
                  <i class="fas fa-search text-white"></i>
                </div>
                <div>
                  <h4 class="text-white font-bold">Site Inspection</h4>
                  <p class="text-gray-400 text-sm">Professional assessment of your project requirements</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-brand-red p-2 rounded-full flex-shrink-0">
                  <i class="fas fa-file-alt text-white"></i>
                </div>
                <div>
                  <h4 class="text-white font-bold">Detailed Quote</h4>
                  <p class="text-gray-400 text-sm">Comprehensive breakdown of costs and timeline</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-brand-red p-2 rounded-full flex-shrink-0">
                  <i class="fas fa-handshake text-white"></i>
                </div>
                <div>
                  <h4 class="text-white font-bold">No Obligation</h4>
                  <p class="text-gray-400 text-sm">Free quote with no pressure to proceed</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div class="bg-brand-gray/30 rounded-2xl p-8 border border-white/10">
            <h3 class="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <i class="fas fa-phone text-brand-red"></i>
                <div>
                  <div class="text-white font-bold">(61) 451 612 742</div>
                  <div class="text-gray-400 text-sm">24/7 Emergency Line</div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <i class="fab fa-whatsapp text-brand-green"></i>
                <div>
                  <div class="text-white font-bold">WhatsApp</div>
                  <div class="text-gray-400 text-sm">Quick response via messaging</div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <i class="fas fa-envelope text-brand-red"></i>
                <div>
                  <div class="text-white font-bold">hello@dldemolition.com.au</div>
                  <div class="text-gray-400 text-sm">Email for detailed inquiries</div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <i class="fas fa-map-marker-alt text-brand-red"></i>
                <div>
                  <div class="text-white font-bold">Service Area</div>
                  <div class="text-gray-400 text-sm">Gold Coast to Sunshine Coast</div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-gray-600">
              <div class="flex flex-col sm:flex-row gap-3">
                <a href="tel:+61451612742" class="bg-brand-red text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-red-700 transition-colors">
                  <i class="fas fa-phone mr-2"></i>Call Now
                </a>
                <a href="https://wa.me/61451612742" class="bg-brand-green text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-green-600 transition-colors">
                  <i class="fab fa-whatsapp mr-2"></i>WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          <!-- Guarantees -->
          <div class="bg-brand-red/20 rounded-2xl p-8 border border-brand-red/30">
            <h3 class="text-2xl font-bold text-white mb-6">Our Guarantees</h3>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <i class="fas fa-check text-brand-red"></i>
                <span class="text-gray-300">Licensed & EPA compliant</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-check text-brand-red"></i>
                <span class="text-gray-300">$20M public liability insurance</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-check text-brand-red"></i>
                <span class="text-gray-300">All work comes with warranty</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-check text-brand-red"></i>
                <span class="text-gray-300">Clearance certificates provided</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-check text-brand-red"></i>
                <span class="text-gray-300">Competitive transparent pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
'''
}

# JavaScript adicional para páginas específicas
additional_js = {
    'calculator.html': '''
    // Calculator functionality
    document.getElementById('calculate-btn').addEventListener('click', function() {
      const serviceType = document.getElementById('service-type');
      const area = document.getElementById('area');
      const urgency = document.getElementById('urgency');
      const access = document.getElementById('access');
      const location = document.getElementById('location');
      
      if (!serviceType.value || !area.value) {
        alert('Please select a service type and enter the area.');
        return;
      }
      
      const selectedOption = serviceType.selectedOptions[0];
      const minPrice = parseFloat(selectedOption.dataset.min);
      const maxPrice = parseFloat(selectedOption.dataset.max);
      const areaValue = parseFloat(area.value);
      
      // Calculate base cost (average of min and max)
      let baseCost = ((minPrice + maxPrice) / 2) * areaValue;
      
      // Apply urgency multiplier
      let urgencyMultiplier = 1;
      if (urgency.value === 'urgent') urgencyMultiplier = 1.15;
      if (urgency.value === 'emergency') urgencyMultiplier = 1.30;
      
      // Apply access multiplier
      let accessMultiplier = 1;
      if (access.value === 'moderate') accessMultiplier = 1.10;
      if (access.value === 'difficult') accessMultiplier = 1.25;
      
      // Apply location multiplier
      let locationMultiplier = 1;
      if (location.value === 'brisbane') locationMultiplier = 1.10;
      if (location.value === 'other') locationMultiplier = 1.15;
      
      // Calculate adjustments
      const urgencyCost = baseCost * (urgencyMultiplier - 1);
      const accessCost = baseCost * (accessMultiplier - 1);
      const locationCost = baseCost * (locationMultiplier - 1);
      
      // Calculate total
      const totalCost = baseCost * urgencyMultiplier * accessMultiplier * locationMultiplier;
      
      // Display results
      document.getElementById('base-cost').textContent = '$' + baseCost.toLocaleString('en-AU', {maximumFractionDigits: 0});
      document.getElementById('urgency-cost').textContent = urgencyCost > 0 ? '+$' + urgencyCost.toLocaleString('en-AU', {maximumFractionDigits: 0}) : '$0';
      document.getElementById('access-cost').textContent = accessCost > 0 ? '+$' + accessCost.toLocaleString('en-AU', {maximumFractionDigits: 0}) : '$0';
      document.getElementById('location-cost').textContent = locationCost > 0 ? '+$' + locationCost.toLocaleString('en-AU', {maximumFractionDigits: 0}) : '$0';
      document.getElementById('total-estimate').textContent = '$' + totalCost.toLocaleString('en-AU', {maximumFractionDigits: 0});
      
      // Show results
      document.getElementById('estimate-result').innerHTML = `
        <div class="text-center">
          <div class="text-4xl font-bold text-brand-red mb-2">$${totalCost.toLocaleString('en-AU', {maximumFractionDigits: 0})}</div>
          <div class="text-gray-300">Estimated Cost</div>
          <div class="text-sm text-gray-400 mt-2">Based on ${areaValue}m² ${selectedOption.textContent}</div>
        </div>
      `;
      document.getElementById('estimate-breakdown').classList.remove('hidden');
    });
    ''',
    'quote.html': '''
    // Quote form functionality
    document.getElementById('detailed-quote-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Create WhatsApp message
      const message = `Hello! I'd like to request a detailed quote.

📋 CONTACT DETAILS:
Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
Address: ${data.location}

🏗️ PROJECT DETAILS:
Service: ${data.service}
Property Type: ${data.propertyType}
Urgency: ${data.urgency}
Description: ${data.description}

📞 Preferred Contact: ${data.contactMethod}

Please provide a detailed quote for this project. Thank you!`;
      
      const whatsappUrl = `https://wa.me/61451612742?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      alert('Thank you! Your quote request has been submitted. You will be redirected to WhatsApp to complete the process.');
    });

    // File upload functionality
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('images');
    const uploadedFiles = document.getElementById('uploaded-files');

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('border-brand-red');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('border-brand-red');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('border-brand-red');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    function handleFiles(files) {
      uploadedFiles.innerHTML = '';
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
          const fileDiv = document.createElement('div');
          fileDiv.className = 'flex items-center justify-between bg-brand-gray/30 p-2 rounded text-sm';
          fileDiv.innerHTML = `
            <span class="text-gray-300">${file.name}</span>
            <span class="text-gray-400">${(file.size / 1024 / 1024).toFixed(1)}MB</span>
          `;
          uploadedFiles.appendChild(fileDiv);
        }
      });
    }
    '''
}

# Gerar páginas
for filename, config in pages.items():
    nav_links, mobile_nav_links = create_nav_links(config['active_page'])
    
    content = base_template.format(
        title=config['title'],
        meta=config['meta'],
        canonical=config['canonical'],
        og=config['og'],
        nav_links=nav_links,
        mobile_nav_links=mobile_nav_links,
        content=contents.get(filename, '<!-- Content placeholder -->'),
        additional_js=additional_js.get(filename, '')
    )
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Created {filename}")

print("All pages created successfully!")
