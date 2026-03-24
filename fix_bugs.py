#!/usr/bin/env python3
"""
Script para corrigir bugs e glitches no website DL Demolition
"""

import re
import os

# URLs corretas
FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61584157104428"

# Arquivos para corrigir
HTML_FILES = [
    'about.html', 'blog.html', 'calculator.html', 
    'index.html', 'quote.html', 'reviews.html', 'services.html',
    'blog-asbestos-removal-guide.html', 'blog-bathroom-renovation-safety.html',
    'blog-commercial-kitchen-strip-out.html', 'blog-complete-strip-out-services.html',
    'blog-floor-preparation-tile-removal.html', 'blog-safe-demolition-epa.html',
    'blog-signs-roof-asbestos.html'
]

def fix_social_media_links(content):
    """Corrige links de redes sociais"""
    
    # Fix Facebook links - adicionar target e rel
    content = re.sub(
        r'<a href="#"(\s+class="[^"]*")>\s*<i class="fab fa-facebook',
        f'<a href="{FACEBOOK_URL}" target="_blank" rel="noopener noreferrer"\\1>\n              <i class="fab fa-facebook',
        content
    )
    
    # Remove Instagram links vazios
    content = re.sub(
        r'\s*<a href="#"[^>]*>\s*<i class="fab fa-instagram[^<]*</i>\s*</a>\s*',
        '\n            <!-- Instagram: To be added when profile is created -->',
        content
    )
    
    # Remove LinkedIn links vazios
    content = re.sub(
        r'\s*<a href="#"[^>]*>\s*<i class="fab fa-linkedin[^<]*</i>\s*</a>\s*',
        '\n            <!-- LinkedIn: To be added when profile is created -->',
        content
    )
    
    return content

def remove_console_logs(content):
    """Remove console.log statements"""
    content = re.sub(r'\s*console\.log\([^)]+\);?\s*\n?', '', content)
    return content

def remove_newsletter_form(content):
    """Remove formulário de newsletter do blog"""
    # Remove toda a seção de newsletter
    content = re.sub(
        r'<div class="bg-brand-gray/30[^>]*>.*?<h3[^>]*>Stay Updated</h3>.*?</form>\s*</div>',
        '<!-- Newsletter form removed as per client request -->',
        content,
        flags=re.DOTALL
    )
    return content

def remove_load_more_button(content):
    """Remove botão Load More Articles"""
    content = re.sub(
        r'<div class="text-center mt-12">\s*<button[^>]*>Load More Articles</button>\s*</div>',
        '<!-- Load More button removed - all articles visible -->',
        content
    )
    return content

def remove_search_box(content):
    """Remove campo de busca não funcional"""
    content = re.sub(
        r'<div class="relative[^>]*>\s*<input[^>]*class="[^"]*search[^"]*"[^>]*>\s*<button[^>]*>\s*<i class="fas fa-search"[^<]*</i>\s*</button>\s*</div>',
        '<!-- Search functionality - to be implemented -->',
        content,
        flags=re.DOTALL
    )
    return content

def main():
    print("🔧 Iniciando correção de bugs...\n")
    
    total_changes = 0
    
    for filename in HTML_FILES:
        if not os.path.exists(filename):
            print(f"⚠️  {filename} não encontrado, pulando...")
            continue
            
        print(f"📄 Processando {filename}...")
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Aplicar correções
        content = fix_social_media_links(content)
        content = remove_console_logs(content)
        
        if filename == 'blog.html':
            content = remove_newsletter_form(content)
            content = remove_load_more_button(content)
            content = remove_search_box(content)
        
        # Salvar se houver mudanças
        if content != original_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"   ✅ {filename} corrigido!")
            total_changes += 1
        else:
            print(f"   ⏭️  {filename} sem mudanças")
    
    print(f"\n✅ Correção concluída! {total_changes} arquivos modificados.")
    print("\n📋 Mudanças aplicadas:")
    print("   • Links do Facebook atualizados")
    print("   • Links Instagram/LinkedIn vazios removidos")
    print("   • Console.log statements removidos")
    print("   • Formulário de newsletter removido (blog.html)")
    print("   • Botão 'Load More' removido (blog.html)")
    print("   • Campo de busca removido (blog.html)")

if __name__ == "__main__":
    main()
