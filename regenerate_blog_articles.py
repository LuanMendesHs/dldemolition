#!/usr/bin/env python3
"""
Script para regenerar todas as páginas de artigos do blog com design profissional
matching o layout das outras páginas do site (projects.html, about.html, etc)
"""

import os
import markdown
from pathlib import Path

# Diretório dos artigos em Markdown
BLOG_DIR = Path("blog")
OUTPUT_DIR = Path(".")

# Mapeamento de artigos
ARTICLES = [
    {
        "md_file": "asbestos-removal-queensland-guide.md",
        "html_file": "blog-asbestos-removal-queensland.html",
        "category": "GUIDE",
        "read_time": "8 min read",
        "date": "Dec 15, 2024"
    },
    {
        "md_file": "signs-your-roof-contains-asbestos.md",
        "html_file": "blog-signs-roof-asbestos.html",
        "category": "SAFETY",
        "read_time": "5 min read",
        "date": "Dec 10, 2024"
    },
    {
        "md_file": "safe-demolition-practices-epa-compliance.md",
        "html_file": "blog-safe-demolition-epa.html",
        "category": "DEMOLITION",
        "read_time": "7 min read",
        "date": "Dec 8, 2024"
    },
    {
        "md_file": "floor-preparation-tile-removal-best-practices.md",
        "html_file": "blog-floor-preparation-tile-removal.html",
        "category": "RENOVATION",
        "read_time": "6 min read",
        "date": "Dec 5, 2024"
    },
    {
        "md_file": "bathroom-renovation-safety-asbestos.md",
        "html_file": "blog-bathroom-renovation-safety.html",
        "category": "RESIDENTIAL",
        "read_time": "4 min read",
        "date": "Dec 3, 2024"
    },
    {
        "md_file": "commercial-kitchen-strip-out-health-safety.md",
        "html_file": "blog-commercial-kitchen-strip-out.html",
        "category": "COMMERCIAL",
        "read_time": "9 min read",
        "date": "Nov 30, 2024"
    },
    {
        "md_file": "complete-strip-out-services-whats-included.md",
        "html_file": "blog-complete-strip-out-services.html",
        "category": "SERVICES",
        "read_time": "5 min read",
        "date": "Nov 28, 2024"
    },
    {
        "md_file": "emergency-asbestos-response.md",
        "html_file": "blog-emergency-asbestos-response.html",
        "category": "EMERGENCY",
        "read_time": "6 min read",
        "date": "Dec 12, 2024"
    },
    {
        "md_file": "cost-factors-in-professional-demolition.md",
        "html_file": "blog-cost-factors-demolition.html",
        "category": "PRICING",
        "read_time": "7 min read",
        "date": "Dec 9, 2024"
    },
    {
        "md_file": "choosing-the-right-demolition-contractor.md",
        "html_file": "blog-choosing-right-contractor.html",
        "category": "GUIDE",
        "read_time": "6 min read",
        "date": "Dec 6, 2024"
    }
]


def create_article_html(article_data, content_html, title):
    """Cria HTML profissional para um artigo do blog"""
    
    html_template = f'''<!DOCTYPE html>
<html lang="en-AU" class="scroll-smooth">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} | DL Demolition Blog</title>
  <meta name="description" content="Professional insights on asbestos removal and demolition from Gold Coast's trusted experts." />
  <meta name="robots" content="index,follow" />
  <meta name="theme-color" content="#e10600" />

  <!-- Favicons -->
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16x16.png" />
  <link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png" />

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
          }}
        }}
      }}
    }}
  </script>

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" crossorigin="anonymous" />

  <style>
    .article-content {{
      font-family: Georgia, 'Times New Roman', serif;
      line-height: 1.8;
      color: #e0e0e0;
    }}
    
    .article-content h2 {{
      font-size: 2rem;
      font-weight: 700;
      color: #ffffff;
      margin-top: 3rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e10600;
    }}
    
    .article-content h3 {{
      font-size: 1.5rem;
      font-weight: 600;
      color: #ffffff;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }}
    
    .article-content p {{
      margin-bottom: 1.5rem;
      font-size: 1.125rem;
    }}
    
    .article-content ul, .article-content ol {{
      margin-bottom: 1.5rem;
      padding-left: 2rem;
    }}
    
    .article-content li {{
      margin-bottom: 0.75rem;
      font-size: 1.125rem;
    }}
    
    .article-content strong {{
      color: #ffffff;
      font-weight: 600;
    }}
    
    .article-content table {{
      width: 100%;
      margin: 2rem 0;
      border-collapse: collapse;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;
    }}
    
    .article-content th {{
      background: #e10600;
      color: white;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
    }}
    
    .article-content td {{
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }}
    
    .article-content blockquote {{
      border-left: 4px solid #e10600;
      padding-left: 1.5rem;
      margin: 2rem 0;
      font-style: italic;
      color: #b0b0b0;
    }}
  </style>
</head>

<body class="bg-brand-black text-white">

  <!-- Header -->
  <header class="fixed w-full top-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="index.html" class="flex items-center space-x-3">
          <img src="assets/images/logo_header_optimized.png" alt="DL Demolition Logo" class="h-12" />
        </a>

        <!-- Navigation -->
        <nav class="hidden lg:flex items-center space-x-8">
          <a href="index.html" class="hover:text-brand-red transition-colors">Home</a>
          <a href="services.html" class="hover:text-brand-red transition-colors">Services</a>
          <a href="calculator.html" class="hover:text-brand-red transition-colors">Calculator</a>
          <a href="about.html" class="hover:text-brand-red transition-colors">About</a>
          <a href="projects.html" class="hover:text-brand-red transition-colors">Projects</a>
          <a href="reviews.html" class="hover:text-brand-red transition-colors">Reviews</a>
          <a href="blog.html" class="text-brand-red">Blog</a>
        </nav>

        <!-- CTA Buttons -->
        <div class="hidden lg:flex items-center space-x-4">
          <a href="tel:61451612742" class="text-brand-red hover:text-white transition-colors">
            <i class="fas fa-phone"></i> (61) 451 612 742
          </a>
          <a href="quote.html" class="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
            Free Quote
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Article Content -->
  <main class="pt-32 pb-20">
    <div class="container mx-auto px-4 max-w-4xl">
      
      <!-- Breadcrumbs -->
      <nav class="text-sm mb-8 text-gray-400">
        <a href="index.html" class="hover:text-brand-red">Home</a>
        <span class="mx-2">/</span>
        <a href="blog.html" class="hover:text-brand-red">Blog</a>
        <span class="mx-2">/</span>
        <span class="text-white">{title}</span>
      </nav>

      <!-- Article Header -->
      <div class="mb-12">
        <div class="flex items-center space-x-4 mb-4">
          <span class="bg-brand-red px-4 py-1 rounded-full text-sm font-semibold">{article_data['category']}</span>
          <span class="text-gray-400">{article_data['read_time']}</span>
          <span class="text-gray-400">{article_data['date']}</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">{title}</h1>
        
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center font-bold">
            DL
          </div>
          <div>
            <div class="font-semibold">DL Demolition Team</div>
            <div class="text-sm text-gray-400">Licensed Asbestos Removal Experts</div>
          </div>
        </div>
      </div>

      <!-- Article Body -->
      <article class="article-content">
        {content_html}
      </article>

      <!-- Share & CTA Section -->
      <div class="mt-16 pt-8 border-t border-white/10">
        <div class="bg-gradient-to-r from-brand-red/10 to-brand-orange/10 rounded-2xl p-8 text-center">
          <h3 class="text-2xl font-bold mb-4">Need Professional Asbestos Removal or Demolition?</h3>
          <p class="text-gray-300 mb-6">Get a free quote from Gold Coast's trusted experts. Available 24/7 for emergencies.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="quote.html" class="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center">
              <i class="fas fa-clipboard-list mr-2"></i> Get Free Quote
            </a>
            <a href="tel:61451612742" class="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center">
              <i class="fas fa-phone mr-2"></i> Call Now
            </a>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold mb-8">Related Articles</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <a href="blog.html" class="group bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div class="text-brand-red font-semibold mb-2">← Back to Blog</div>
            <div class="text-gray-300">Explore more articles on asbestos removal and demolition safety</div>
          </a>
          <a href="services.html" class="group bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div class="text-brand-red font-semibold mb-2">Our Services →</div>
            <div class="text-gray-300">View our complete range of asbestos and demolition services</div>
          </a>
        </div>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-brand-gray border-t border-white/10 py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="font-bold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="index.html" class="hover:text-brand-red">Home</a></li>
            <li><a href="services.html" class="hover:text-brand-red">Services</a></li>
            <li><a href="about.html" class="hover:text-brand-red">About</a></li>
            <li><a href="projects.html" class="hover:text-brand-red">Projects</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Services</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="services.html#asbestos" class="hover:text-brand-red">Asbestos Removal</a></li>
            <li><a href="services.html#demolition" class="hover:text-brand-red">Demolition</a></li>
            <li><a href="services.html#floor" class="hover:text-brand-red">Floor Grinding</a></li>
            <li><a href="services.html#tile" class="hover:text-brand-red">Tile Removal</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-400">
            <li><i class="fas fa-phone text-brand-red"></i> (61) 451 612 742</li>
            <li><i class="fas fa-envelope text-brand-red"></i> hello@dldemolition.com.au</li>
            <li><i class="fas fa-map-marker-alt text-brand-red"></i> Gold Coast to Sunshine Coast</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61584157104428" target="_blank" class="text-gray-400 hover:text-brand-red">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="text-center text-gray-400 pt-8 border-t border-white/10">
        <p>© 2024 DL Demolition And Asbestos Experts. All Rights Reserved.</p>
        <p class="text-sm mt-2">Licensed asbestos removalists | EPA compliant | Fully insured</p>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Float Button -->
  <a href="https://wa.me/61451612742" target="_blank" 
     class="fixed bottom-6 right-6 bg-brand-green hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
     aria-label="Contact us on WhatsApp">
    <i class="fab fa-whatsapp text-3xl"></i>
  </a>

</body>
</html>'''
    
    return html_template


def main():
    """Regenera todas as páginas de artigos com design profissional"""
    
    print("🎨 Regenerando artigos do blog com design profissional...")
    
    for article in ARTICLES:
        md_path = BLOG_DIR / article["md_file"]
        html_path = OUTPUT_DIR / article["html_file"]
        
        if not md_path.exists():
            print(f"⚠️  Arquivo não encontrado: {md_path}")
            continue
        
        # Ler conteúdo Markdown
        with open(md_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Extrair título (primeira linha com #)
        title = md_content.split('\n')[0].replace('#', '').strip()
        
        # Converter Markdown para HTML
        content_html = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
        
        # Criar HTML completo
        full_html = create_article_html(article, content_html, title)
        
        # Salvar arquivo
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(full_html)
        
        print(f"✅ {article['html_file']}")
    
    print("\n🎉 Todos os artigos foram regenerados com sucesso!")


if __name__ == "__main__":
    main()
