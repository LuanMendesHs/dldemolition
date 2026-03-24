# Checklist de Pré-Lançamento - DL Demolition
## Tudo que deve ser verificado ANTES de colocar o site no ar

---

## 🎯 OBJETIVO

Este checklist garante que o site está 100% pronto para lançamento, sem erros críticos que possam prejudicar a experiência do usuário ou SEO.

**Tempo estimado:** 3-4 horas  
**Responsável:** Desenvolvedor + Proprietário  
**Quando usar:** 1-2 dias antes do deploy

---

## ✅ 1. CONTEÚDO E COPYWRITING

### Textos e Informações

```
□ Todos os textos revisados (sem Lorem Ipsum)
□ Informações de contato corretas:
  □ Telefone: (61) 451 612 742
  □ Email: contact@dldemolition.com.au (verificar se existe)
  □ Endereço físico (se aplicável)
□ Horário de funcionamento atualizado
□ Preços atualizados em services.html e calculator.html
□ Todos os links "mailto:" e "tel:" funcionando
□ Nomes de autores corretos (DL Demolition Team, não "BS")
□ Datas dos artigos atualizadas
□ Estatísticas verificadas (100+ projects, 0 accidents, etc.)
```

### Imagens

```
□ Todas as imagens carregam corretamente
□ Nenhuma imagem de placeholder (example.jpg, placeholder.png)
□ Alt text descritivo em todas as imagens
□ Imagens otimizadas (< 500KB cada)
□ Logo correto (DL Demolition, não Breathe Safe)
□ Favicon correto (32x32 e 16x16)
□ Apple touch icon (180x180)
□ Imagens dos projetos são reais
□ Fotos de antes/depois verificadas
```

### SEO

```
□ Meta descriptions únicas em todas as 18 páginas
□ Títulos (title tags) otimizados e únicos
□ URLs amigáveis (sem caracteres especiais)
□ Canonical tags corretos
□ Open Graph tags configurados
□ Schema markup implementado (reviews.html)
□ Sitemap.xml atualizado com todas as páginas
□ Robots.txt configurado corretamente
```

---

## ✅ 2. FUNCIONALIDADES

### Formulários

```
□ Formulário de quote (quote.html):
  □ Todos os campos obrigatórios funcionam
  □ Validação de email funciona
  □ Validação de telefone funciona
  □ Mensagem de sucesso aparece
  □ Email de confirmação é enviado
  □ Dados são salvos/enviados corretamente
  
□ Formulário de newsletter (blog.html sidebar):
  □ Validação de email funciona
  □ Mensagem de sucesso aparece
  □ Email de confirmação é enviado
  
□ Calculadora (calculator.html):
  □ Todos os 8 serviços calculam corretamente
  □ Multiplicadores funcionam (urgência, acesso, localização)
  □ Breakdown detalhado aparece
  □ Botão WhatsApp envia dados corretos
  □ Preços estão atualizados (Tile Removal $40-60/m²)
```

### Links e Navegação

```
□ Todos os links internos funcionam
□ Nenhum link quebrado (404)
□ Links externos abrem em nova aba
□ Menu de navegação funciona em todas as páginas
□ Breadcrumbs corretos nos artigos do blog
□ Links de telefone abrem app de chamadas
□ Links de WhatsApp abrem app correto
□ Links de email abrem cliente de email
□ Footer links funcionam
□ Logo clicável volta para homepage
```

### Interatividade

```
□ Botões hover funcionam
□ Animações suaves (sem lag)
□ Modais abrem e fecham corretamente
□ Dropdowns funcionam
□ Sliders/carrosséis funcionam (se houver)
□ Scroll suave funciona
□ Botão "voltar ao topo" funciona
□ Emergency banner clicável
□ WhatsApp flutuante funciona
```

---

## ✅ 3. DESIGN E UX

### Responsividade

```
□ Desktop (1920x1080):
  □ Layout perfeito
  □ Imagens não distorcidas
  □ Textos legíveis
  □ Sem overflow horizontal
  
□ Laptop (1366x768):
  □ Layout adaptado
  □ Navegação funcional
  
□ Tablet (768x1024):
  □ Menu mobile funciona
  □ Grid adapta para 2 colunas
  □ Imagens responsivas
  
□ Mobile (375x667):
  □ Menu hamburger funciona
  □ Textos legíveis sem zoom
  □ Botões tocáveis (min 44x44px)
  □ Formulários usáveis
  □ Calculadora funcional
```

### Consistência Visual

```
□ Cores consistentes (vermelho #e10600)
□ Fontes consistentes
□ Espaçamentos uniformes
□ Botões com mesmo estilo
□ Cards com mesmo design
□ Headers/footers idênticos em todas as páginas
□ Ícones mesmo estilo (Font Awesome)
```

### Acessibilidade

```
□ Contraste de cores adequado (WCAG AA)
□ Textos legíveis (mínimo 16px)
□ Links visualmente distintos
□ Focus visible em elementos interativos
□ Alt text em todas as imagens
□ Labels em todos os inputs
□ Navegação por teclado funciona
```

---

## ✅ 4. PERFORMANCE

### Velocidade de Carregamento

```
□ Homepage carrega em < 3 segundos
□ Imagens otimizadas (WebP ou JPEG otimizado)
□ CSS minificado (se aplicável)
□ JavaScript minificado (se aplicável)
□ Lazy loading de imagens (se aplicável)
□ Fontes otimizadas
□ Sem recursos bloqueando renderização
```

### Teste com Ferramentas

```
□ PageSpeed Insights:
  □ Mobile: > 70
  □ Desktop: > 80
  
□ GTmetrix:
  □ Grade: B ou superior
  □ Fully Loaded Time: < 5s
  
□ WebPageTest:
  □ First Contentful Paint: < 2s
  □ Time to Interactive: < 5s
```

---

## ✅ 5. SEGURANÇA

### HTTPS e Certificados

```
□ Certificado SSL instalado
□ Site acessível via HTTPS
□ Redirect HTTP → HTTPS configurado
□ Mixed content resolvido (sem avisos)
□ Certificado válido (não expirado)
```

### Proteção de Dados

```
□ Formulários usam HTTPS
□ Dados sensíveis não expostos
□ Nenhuma senha em código-fonte
□ API keys não expostas (se aplicável)
□ Política de privacidade presente (se coletar dados)
```

---

## ✅ 6. COMPATIBILIDADE

### Navegadores

```
□ Google Chrome (última versão):
  □ Layout correto
  □ Funcionalidades funcionam
  
□ Firefox (última versão):
  □ Layout correto
  □ Funcionalidades funcionam
  
□ Safari (macOS/iOS):
  □ Layout correto
  □ Funcionalidades funcionam
  
□ Edge (última versão):
  □ Layout correto
  □ Funcionalidades funcionam
  
□ Samsung Internet (Android):
  □ Layout correto
  □ Funcionalidades funcionam
```

### Dispositivos

```
□ iPhone (Safari):
  □ Telefone clicável abre app
  □ WhatsApp abre app
  □ Formulários funcionam
  
□ Android (Chrome):
  □ Telefone clicável abre app
  □ WhatsApp abre app
  □ Formulários funcionam
  
□ iPad:
  □ Layout tablet funciona
  □ Touch funciona corretamente
```

---

## ✅ 7. SEO TÉCNICO

### Meta Tags

```
□ Todas as páginas têm <title> único
□ Todas as páginas têm meta description única
□ Meta robots configurado (index, follow)
□ Canonical tags corretos
□ OG tags (Open Graph) configurados:
  □ og:title
  □ og:description
  □ og:type
  □ og:locale (en_AU)
  □ og:image (se aplicável)
```

### Estrutura

```
□ URLs amigáveis (sem .php, .asp, etc.)
□ Hierarquia H1 > H2 > H3 correta
□ Apenas um H1 por página
□ Breadcrumbs implementados
□ Link interno entre páginas relacionadas
□ Footer com links importantes
```

### Arquivos Importantes

```
□ sitemap.xml:
  □ Acessível em /sitemap.xml
  □ Contém todas as 18 páginas
  □ URLs corretas (dldemolition.com.au)
  □ Datas atualizadas
  □ Sintaxe XML válida
  
□ robots.txt:
  □ Acessível em /robots.txt
  □ Sitemap URL correto
  □ Não bloqueia páginas importantes
  □ Permite crawlers (User-agent: *)
```

---

## ✅ 8. ANALYTICS E TRACKING

### Preparação (NÃO instalar antes do deploy)

```
□ Conta Google Analytics 4 criada
□ Código GA4 preparado (mas NÃO instalado)
□ Google Tag Manager preparado (opcional)
□ Eventos de conversão planejados:
  □ form_submit_quote
  □ click_phone
  □ click_whatsapp
  □ calculator_complete
  □ emergency_banner_click
```

**IMPORTANTE:** Só instalar códigos de tracking APÓS deploy, para evitar rastreamento de testes.

---

## ✅ 9. CONTEÚDO ESPECÍFICO

### Homepage (index.html)

```
□ Hero section com CTA claro
□ Serviços principais listados
□ Trust elements visíveis (reviews, certificações)
□ Emergency banner funcionando
□ Stats corretos (100+ projects, 4.8/5 stars)
□ WhatsApp flutuante funcionando
```

### Services (services.html)

```
□ 8 serviços listados
□ Preços atualizados:
  □ Asbestos Roof: $55-95/m²
  □ Asbestos Wall/Ceiling: $50-80/m²
  □ Asbestos Floor/Tiles: $45-70/m²
  □ Residential Demolition: $40-65/m²
  □ Commercial Demolition: $40-70/m²
  □ Strip-out Services: $30-55/m²
  □ Floor Grinding: $30-50/m²
  □ Tile Removal: $40-60/m²
□ CTAs para quote em cada serviço
□ Imagens de cada serviço
```

### Calculator (calculator.html)

```
□ 8 serviços com preços corretos
□ Multiplicadores funcionam:
  □ Urgency: Standard (0%), Urgent (+15%), Emergency (+30%)
  □ Access: Easy (0%), Moderate (+10%), Difficult (+25%)
  □ Location: Gold Coast (0%), Brisbane (+10%), Other (+15%)
□ Breakdown detalhado exibido
□ Botão WhatsApp envia mensagem formatada
□ Responsive em mobile
```

### Blog (blog.html)

```
□ 10 artigos exibidos
□ Grid 2x2 (com sidebar)
□ Sidebar com:
  □ Categories (contagem correta)
  □ Recent Posts (com thumbnails)
  □ Newsletter form
  □ Contact widget
□ Load More button funciona (se aplicável)
□ Links para artigos funcionam
```

### Reviews (reviews.html)

```
□ 9 reviews exibidos
□ Rating 4.8/5 stars
□ 85+ reviews mencionado
□ Schema markup implementado
□ Fotos de clientes (se tiver)
□ Datas dos reviews
□ CTA para deixar review
```

### Quote (quote.html)

```
□ Formulário completo funciona
□ Todos os campos validam
□ File upload funciona (se aplicável)
□ Mensagem de sucesso clara
□ Email de confirmação enviado
□ Dados salvos corretamente
```

---

## ✅ 10. TESTES FINAIS

### Teste de Usuário

```
□ Pedir para 3 pessoas testarem:
  □ Navegar pelo site
  □ Preencher formulário de quote
  □ Usar calculadora
  □ Clicar em telefone/WhatsApp
  □ Ler um artigo do blog
□ Coletar feedback sobre:
  □ Facilidade de uso
  □ Clareza das informações
  □ Problemas encontrados
```

### Teste de Conversão

```
□ Simular jornada do cliente:
  □ Homepage → Services → Quote (enviar)
  □ Homepage → Calculator → WhatsApp
  □ Blog → Artigo → CTA (quote)
  □ Emergency banner → Quote
□ Verificar se todas as jornadas funcionam
□ Confirmar recebimento de emails/mensagens
```

### Teste de Erro

```
□ Tentar acessar páginas inexistentes (404)
□ Enviar formulário com dados inválidos
□ Testar com internet lenta
□ Testar com JavaScript desabilitado
□ Testar com bloqueador de anúncios
```

---

## ✅ 11. DOCUMENTAÇÃO

### Arquivos Criados

```
□ README.md com instruções básicas
□ POST_DEPLOY_SEO_GUIDE.md (guia pós-deploy)
□ PRE_LAUNCH_CHECKLIST.md (este arquivo)
□ CRITICAL_FIXES_REPORT_20251122.md
□ COMPLETE_WEBSITE_ANALYSIS_REPORT.md
□ EXECUTIVE_SUMMARY.md
```

### Credenciais Preparadas

```
□ Lista de logins necessários:
  □ Hospedagem
  □ Domínio
  □ Email
  □ Google Search Console (criar após deploy)
  □ Google Analytics (criar após deploy)
  □ Bing Webmaster (criar após deploy)
□ Senhas seguras geradas
□ Armazenadas em gerenciador de senhas
```

---

## ✅ 12. BACKUP E DEPLOY

### Antes do Deploy

```
□ Backup completo do código
□ Backup do banco de dados (se aplicável)
□ Versão do código taggeada (Git)
□ Documentação de deploy preparada
□ Plano de rollback definido
```

### Preparação do Servidor

```
□ Servidor/hospedagem contratado
□ Domínio registrado (dldemolition.com.au)
□ DNS configurado
□ SSL/HTTPS configurado
□ Email profissional configurado
□ FTP/SSH acesso testado
```

---

## 📊 SCORECARD FINAL

### Antes de Lançar, Garantir:

| Categoria | Mínimo Aceitável | Status |
|-----------|------------------|--------|
| **Conteúdo** | 100% completo | □ |
| **Funcionalidades** | 100% funcionando | □ |
| **Design/UX** | 95% perfeito | □ |
| **Performance** | PageSpeed > 70 | □ |
| **SEO** | 100% configurado | □ |
| **Segurança** | HTTPS + SSL | □ |
| **Compatibilidade** | 5 navegadores OK | □ |
| **Mobile** | 100% responsivo | □ |

**Só fazer deploy se TODAS as categorias estiverem ✅**

---

## 🚨 PROBLEMAS COMUNS PRÉ-LANÇAMENTO

### Problema 1: Imagens Não Carregam

**Causas:**
- Caminhos relativos incorretos
- Imagens não foram enviadas para servidor
- Permissões de arquivo incorretas

**Solução:**
- Usar caminhos absolutos ou relativos corretos
- Verificar todas as imagens estão na pasta assets/images/
- Testar em servidor local primeiro

### Problema 2: Formulários Não Enviam

**Causas:**
- Action do form incorreto
- Validação JavaScript com erro
- Servidor não configurado para receber emails

**Solução:**
- Verificar console do navegador (F12)
- Testar com dados válidos
- Configurar SMTP ou serviço de email

### Problema 3: Links Quebrados

**Causas:**
- URLs incorretas
- Páginas não criadas
- Extensões .html faltando

**Solução:**
- Usar ferramenta de verificação de links
- Corrigir todos os 404s
- Padronizar URLs (com ou sem .html)

---

## ✅ APROVAÇÃO FINAL

### Checklist de Aprovação

```
□ Proprietário revisou e aprovou conteúdo
□ Desenvolvedor confirmou funcionalidades
□ Designer aprovou layout final
□ Testes de usuário concluídos com sucesso
□ Performance aceitável (> 70 mobile, > 80 desktop)
□ Nenhum erro crítico pendente
□ Backup completo realizado
□ Plano de deploy documentado
□ Equipe pronta para monitoramento pós-deploy
```

**Assinatura de Aprovação:**

```
Proprietário: _________________ Data: _______
Desenvolvedor: ________________ Data: _______
```

---

## 🎯 PRÓXIMOS PASSOS

Após completar este checklist:

1. ✅ **Fazer deploy do site**
2. ✅ **Seguir POST_DEPLOY_SEO_GUIDE.md**
3. ✅ **Monitorar primeiras 24-48h intensamente**
4. ✅ **Corrigir problemas urgentes imediatamente**
5. ✅ **Coletar feedback de usuários reais**

---

**BOA SORTE COM O LANÇAMENTO! 🚀**

---

**FIM DO CHECKLIST**
