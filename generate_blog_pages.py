#!/usr/bin/env python3
import markdown
import re
import os

# Mapeamento de artigos
articles = [
    {
        "md_file": "blog/asbestos-removal-queensland-guide.md",
        "html_file": "blog-asbestos-removal-guide.html",
        "url_slug": "asbestos-removal-queensland-guide",
        "category": "Asbestos",
        "featured_image": "assets/images/blog/asbestos-removal-guide.jpg"
    },
    {
        "md_file": "blog/signs-your-roof-contains-asbestos.md",
        "html_file": "blog-signs-roof-asbestos.html",
        "url_slug": "signs-your-roof-contains-asbestos",
        "category": "Asbestos",
        "featured_image": "assets/images/blog/roof-asbestos.jpg"
    },
    {
        "md_file": "blog/safe-demolition-practices-epa-compliance.md",
        "html_file": "blog-safe-demolition-epa.html",
        "url_slug": "safe-demolition-practices-epa-compliance",
        "category": "Demolition",
        "featured_image": "assets/images/blog/demolition-safety.jpg"
    },
    {
        "md_file": "blog/floor-preparation-tile-removal-best-practices.md",
        "html_file": "blog-floor-preparation-tile-removal.html",
        "url_slug": "floor-preparation-tile-removal",
        "category": "Renovation",
        "featured_image": "assets/images/blog/tile-removal.jpg"
    },
    {
        "md_file": "blog/bathroom-renovation-safety-asbestos.md",
        "html_file": "blog-bathroom-renovation-safety.html",
        "url_slug": "bathroom-renovation-safety-asbestos",
        "category": "Renovation",
        "featured_image": "assets/images/blog/bathroom-renovation.jpg"
    },
    {
        "md_file": "blog/commercial-kitchen-strip-out-health-safety.md",
        "html_file": "blog-commercial-kitchen-strip-out.html",
        "url_slug": "commercial-kitchen-strip-out",
        "category": "Commercial",
        "featured_image": "assets/images/blog/kitchen-stripout.jpg"
    },
    {
        "md_file": "blog/complete-strip-out-services-whats-included.md",
        "html_file": "blog-complete-strip-out-services.html",
        "url_slug": "complete-strip-out-services",
        "category": "Commercial",
        "featured_image": "assets/images/blog/stripout-services.jpg"
    }
]

def extract_metadata(md_content):
    """Extrai metadados do conteúdo Markdown"""
    # Título
    title_match = re.search(r'# (.+)', md_content)
    title = title_match.group(1) if title_match else "Article"
    
    # Data e tempo de leitura
    meta_match = re.search(r'\*\*Published:\*\* (.+?) \| (\d+ min read)', md_content)
    if meta_match:
        date = meta_match.group(1)
        read_time = meta_match.group(2)
    else:
        date = "December 2024"
        read_time = "5 min read"
    
    # Descrição (primeiro parágrafo após o título)
    desc_match = re.search(r'---\n\n(.+?)\n\n', md_content, re.DOTALL)
    if desc_match:
        description = desc_match.group(1).replace('\n', ' ')[:160]
    else:
        description = title
    
    return {
        "title": title,
        "date": date,
        "read_time": read_time,
        "description": description
    }

def generate_html_page(article):
    """Gera uma página HTML completa para um artigo"""
    
    # Ler conteúdo Markdown
    with open(article["md_file"], "r") as f:
        md_content = f.read()
    
    # Extrair metadados
    metadata = extract_metadata(md_content)
    
    # Converter Markdown para HTML
    html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code', 'nl2br'])
    
    # Template HTML
    html_template = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{metadata["title"]} | DL Demolition Blog</title>
  <meta name="description" content="{metadata["description"]}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="{metadata["title"]}">
  <meta property="og:description" content="{metadata["description"]}">
  <meta property="og:image" content="{article["featured_image"]}">
  <meta property="og:url" content="https://breathesafe.com.au/{article["html_file"]}">
  <meta property="og:type" content="article">
  
  <!-- Schema.org for BlogPosting -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "{metadata["title"]}",
    "description": "{metadata["description"]}",
    "image": "https://breathesafe.com.au/{article["featured_image"]}",
    "datePublished": "{metadata["date"]}",
    "author": {{
      "@type": "Organization",
      "name": "DL Demolition Team"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "DL Demolition and Asbestos Experts",
      "logo": {{
        "@type": "ImageObject",
        "url": "https://breathesafe.com.au/assets/images/logo_header_optimized.png"
      }}
    }},
    "mainEntityOfPage": {{
      "@type": "WebPage",
      "@id": "https://breathesafe.com.au/{article["html_file"]}"
    }}
  }}
  </script>
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon_icon.png" />
  
  <!-- Fonts & Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{
            'brand-red': '#E10600',
            'brand-black': '#0C0C0C',
            'brand-gray': '#1A1A1A',
            'brand-light-gray': '#2A2A2A'
          }},
          fontFamily: {{
            'inter': ['Inter', 'sans-serif']
          }}
        }}
      }}
    }}
  </script>
  
  <style>
    body {{
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #0C0C0C 0%, #1A1A1A 100%);
      color: white;
    }}
    
    .article-content {{
      line-height: 1.8;
    }}
    
    .article-content h1 {{
      font-size: 2.5rem;
      font-weight: 800;
      margin: 2rem 0 1rem 0;
      color: #E10600;
    }}
    
    .article-content h2 {{
      font-size: 2rem;
      font-weight: 700;
      margin: 2rem 0 1rem 0;
      color: #FF4444;
    }}
    
    .article-content h3 {{
      font-size: 1.5rem;
      font-weight: 600;
      margin: 1.5rem 0 0.75rem 0;
    }}
    
    .article-content p {{
      margin: 1rem 0;
      color: #E5E5E5;
    }}
    
    .article-content ul, .article-content ol {{
      margin: 1rem 0 1rem 2rem;
      color: #E5E5E5;
    }}
    
    .article-content li {{
      margin: 0.5rem 0;
    }}
    
    .article-content table {{
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
      background: #1A1A1A;
      border-radius: 8px;
      overflow: hidden;
    }}
    
    .article-content th {{
      background: #E10600;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
    }}
    
    .article-content td {{
      padding: 1rem;
      border-bottom: 1px solid #2A2A2A;
    }}
    
    .article-content blockquote {{
      border-left: 4px solid #E10600;
      padding-left: 1.5rem;
      margin: 2rem 0;
      font-style: italic;
      color: #CCCCCC;
      background: #1A1A1A;
      padding: 1.5rem;
      border-radius: 0 8px 8px 0;
    }}
    
    .article-content a {{
      color: #E10600;
      text-decoration: underline;
    }}
    
    .article-content a:hover {{
      color: #FF4444;
    }}
  </style>
</head>
<body>
  
  <!-- Breadcrumbs -->
  <nav class="bg-brand-gray py-4">
    <div class="container mx-auto px-4">
      <div class="flex items-center space-x-2 text-sm text-gray-400">
        <a href="index.html" class="hover:text-brand-red transition">Home</a>
        <span>/</span>
        <a href="blog.html" class="hover:text-brand-red transition">Blog</a>
        <span>/</span>
        <span class="text-white">{article["category"]}</span>
      </div>
    </div>
  </nav>

  <!-- Header -->
  <header class="bg-brand-black py-6 sticky top-0 z-50 shadow-lg">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <a href="index.html" class="flex items-center">
        <img src="assets/images/logo_header_optimized.png" alt="DL Demolition Logo" class="h-12">
      </a>
      <nav class="hidden md:flex space-x-8">
        <a href="index.html" class="hover:text-brand-red transition">Home</a>
        <a href="services.html" class="hover:text-brand-red transition">Services</a>
        <a href="blog.html" class="text-brand-red">Blog</a>
        <a href="contact.html" class="hover:text-brand-red transition">Contact</a>
      </nav>
      <a href="tel:+61451612742" class="bg-brand-red px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
        Call Now
      </a>
    </div>
  </header>

  <!-- Article Hero -->
  <section class="py-12 bg-gradient-to-b from-brand-gray to-brand-black">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center space-x-4 mb-6">
          <span class="bg-brand-red px-4 py-1 rounded-full text-sm font-semibold">{article["category"]}</span>
          <span class="text-gray-400">{metadata["date"]}</span>
          <span class="text-gray-400">•</span>
          <span class="text-gray-400">{metadata["read_time"]}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Article Content -->
  <article class="py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto article-content">
        {html_content}
      </div>
    </div>
  </article>

  <!-- CTA Section -->
  <section class="py-16 bg-brand-red">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">Need Professional Asbestos or Demolition Services?</h2>
      <p class="text-xl mb-8 opacity-90">Get a free quote from Gold Coast's trusted experts</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="tel:+61451612742" class="bg-white text-brand-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
          <i class="fas fa-phone mr-2"></i> Call (61) 451 612 742
        </a>
        <a href="contact.html" class="bg-brand-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition">
          <i class="fas fa-envelope mr-2"></i> Get Free Quote
        </a>
      </div>
    </div>
  </section>

  <!-- Related Articles -->
  <section class="py-16 bg-brand-black">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Related Articles</h2>
      <div class="text-center">
        <a href="blog.html" class="text-brand-red hover:underline text-lg">
          View All Articles →
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-brand-black py-12 border-t border-brand-gray">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <img src="assets/images/logo_header_optimized.png" alt="DL Demolition" class="h-12 mb-4">
          <p class="text-gray-400">Gold Coast's trusted demolition and asbestos removal experts.</p>
        </div>
        <div>
          <h3 class="font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a href="index.html" class="hover:text-brand-red transition">Home</a></li>
            <li><a href="services.html" class="hover:text-brand-red transition">Services</a></li>
            <li><a href="blog.html" class="hover:text-brand-red transition">Blog</a></li>
            <li><a href="contact.html" class="hover:text-brand-red transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Services</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a href="services.html#asbestos" class="hover:text-brand-red transition">Asbestos Removal</a></li>
            <li><a href="services.html#demolition" class="hover:text-brand-red transition">Demolition</a></li>
            <li><a href="services.html#stripout" class="hover:text-brand-red transition">Strip-Out</a></li>
            <li><a href="services.html#tile" class="hover:text-brand-red transition">Tile Removal</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Contact</h3>
          <ul class="space-y-2 text-gray-400">
            <li><i class="fas fa-phone mr-2"></i> (61) 451 612 742</li>
            <li><i class="fas fa-envelope mr-2"></i> hello@dldemolition.com.au</li>
            <li><i class="fas fa-map-marker-alt mr-2"></i> Gold Coast, QLD</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-brand-gray pt-8 text-center text-gray-400">
        <p>&copy; 2024 DL Demolition and Asbestos Experts. All rights reserved.</p>
      </div>
    </div>
  </footer>

</body>
</html>'''
    
    # Salvar arquivo HTML
    with open(article["html_file"], "w") as f:
        f.write(html_template)
    
    print(f"✅ Gerado: {article['html_file']}")

# Gerar todas as páginas
print("Gerando páginas HTML dos artigos...\n")
for article in articles:
    generate_html_page(article)

print(f"\n✅ Total: {len(articles)} páginas HTML geradas com sucesso!")
