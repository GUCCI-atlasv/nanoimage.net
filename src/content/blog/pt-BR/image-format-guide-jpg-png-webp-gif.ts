export const content = `
# WebP vs JPG vs PNG vs GIF: qual formato de imagem você deve usar?

Já se perguntou por que existem tantos formatos de imagem — e qual você deveria usar de verdade? Este guia cobre tudo o que você precisa saber. Vamos comparar os quatro principais formatos, explicar seus prós e contras, e oferecer um framework simples para tomar a decisão certa.

---

## Os quatro formatos em resumo

| | JPG | PNG | WebP | GIF |
|---|---|---|---|---|
| **Compressão** | Com perda | Sem perda | Ambas | Sem perda (limitada) |
| **Transparência** | ❌ Não | ✅ Sim | ✅ Sim | ✅ Apenas 1 bit |
| **Animação** | ❌ | ❌ | ✅ | ✅ |
| **Tamanho do arquivo** | Pequeno | Médio–Grande | Menor de todos | Grande |
| **Ideal para** | Fotos | Logos, capturas de tela | Imagens web (todos os tipos) | Animações simples |
| **Suporte em navegadores** | Universal | Universal | 95%+ | Universal |

---

## JPG — O padrão para fotografias

O JPG é o formato dominante para fotografias desde os anos 90. Ele usa **compressão com perda** — descartando dados visuais que o olho humano tem menos chance de perceber.

**Como funciona:** O JPG divide a imagem em blocos de 8×8 pixels e aplica compressão matemática. Detalhes de alta frequência (bordas nítidas, texturas finas) são reduzidos com mais intensidade do que áreas suaves. Em configurações de alta qualidade (85–100%), a compressão é quase imperceptível. Abaixo de 60%, surgem os característicos "artefatos" em bloco.

**Use JPG quando:**
- ✅ Fotografias e imagens do mundo real
- ✅ Fotos de produtos para e-commerce
- ✅ O tamanho do arquivo importa e você não precisa de transparência
- ✅ Anexos de e-mail (arquivo leve)

**Evite JPG quando:**
- ❌ Imagens com texto (artefatos deixam o texto borrado)
- ❌ Logos e ícones (bordas nítidas ficam pixeladas)
- ❌ Imagens com fundo transparente
- ❌ Arquivos que você vai editar e salvar repetidamente (a qualidade piora a cada salvamento)

---

## PNG — Qualidade e transparência

O PNG usa **compressão sem perda** — nenhuma informação visual é descartada. O que entra sai com pixels perfeitos.

**A vantagem da transparência:** O PNG suporta canal alfa — cada pixel pode ser totalmente transparente, totalmente opaco ou qualquer valor entre esses extremos. Isso é essencial para logos em diferentes fundos, elementos de interface e stickers. O JPG simplesmente não consegue armazenar transparência; áreas transparentes viram branco sólido.

**O tradeoff no tamanho:** Uma fotografia em PNG é tipicamente 3 a 5 vezes maior que o equivalente em JPG. Para fotos na web, isso é uma desvantagem. Para logos e gráficos com cores sólidas, o PNG comprime com eficiência e continua sendo a escolha certa.

**Use PNG quando:**
- ✅ Logos e ativos de marca
- ✅ Capturas de tela com texto ou elementos de interface
- ✅ Qualquer imagem que exija transparência
- ✅ Gráficos com cores sólidas ou linhas nítidas
- ✅ Arquivos-fonte que você vai editar repetidamente

**Evite PNG quando:**
- ❌ Fotografias exibidas em páginas web (tamanho de arquivo muito grande)
- ❌ O tamanho do arquivo é a prioridade máxima

---

## WebP — O formato moderno para a web

O WebP foi desenvolvido pelo Google (lançado em 2010) para ser o melhor dos dois mundos: menor que JPG e PNG, com suporte a transparência, modos com e sem perda, e até animação.

**A vantagem em tamanho:**
- **25–35% menor** que um JPG de qualidade equivalente
- **26% menor** que um PNG equivalente

Essa economia de largura de banda tem impacto direto na velocidade de carregamento e no SEO.

**Comparação real de tamanhos de arquivo** (fotografia de 2000×1500px):

| Formato | Configuração | Tamanho |
|---|---|---|
| PNG (sem perda) | — | ~8,5 MB |
| JPG | Qualidade 90% | ~1,8 MB |
| JPG | Qualidade 80% | ~1,1 MB |
| WebP | Qualidade 80% (com perda) | ~780 KB |
| WebP | Sem perda | ~6,2 MB |

**Suporte em navegadores:** Chrome, Firefox, Safari (desde 2020), Edge, Opera — mais de 95% globalmente em 2026. As principais lacunas são clientes de e-mail antigos e softwares muito desatualizados.

**Use WebP quando:**
- ✅ Qualquer imagem em um site ou aplicativo web
- ✅ Compressão máxima com mínima perda de qualidade visível
- ✅ Imagens transparentes que precisam carregar rápido
- ✅ Qualquer cenário onde JPG ou PNG funcionaria, mas você quer um arquivo menor

**Evite WebP quando:**
- ❌ Campanhas de e-mail (a maioria dos clientes não suporta — use JPG/PNG)
- ❌ Compartilhar com usuários em softwares antigos
- ❌ Enviar para serviços de impressão (use TIFF ou JPG/PNG de alta qualidade)

---

## GIF — Animações e suas limitações

O GIF é o formato de animação da internet desde 1987, e seu papel cultural em memes e reações o mantém vivo. Mas suas limitações técnicas são sérias:

**Os problemas do GIF:**
- **Limite de 256 cores** — fotos ficam horríveis; aparecem faixas e dithering
- **Tamanhos de arquivo enormes** — um GIF de 5 segundos em 480p pode ter entre 5 e 20 MB; o mesmo clipe em MP4 pode ter 500 KB
- **Sem áudio**
- **Compressão primitiva** — o algoritmo LZW do GIF é bem menos eficiente que os codecs modernos

**Por que o GIF persiste:** Compatibilidade universal, reprodução automática sem interação do usuário, e forte presença cultural em conteúdo de memes e reações.

**Para imagens estáticas, PNG é sempre melhor que GIF.** Para animações, considere:
- **WebP animado** — 64–70% menor que GIF, com os 16,7 milhões de cores completos e transparência total. Use quando você controla o ambiente de exibição e pode confirmar o suporte a animações WebP.
- **Vídeo MP4** — mais de 90% menor que GIF, qualidade completa, aceita áudio. Ideal para web (`<video autoplay muted loop>`), redes sociais e qualquer coisa com mais de 3–4 segundos.

**Use GIF quando:**
- ✅ Compatibilidade máxima é necessária (clientes de e-mail antigos, plataformas legadas)
- ✅ A animação é muito simples (2–4 cores, movimento básico)
- ✅ A plataforma exige especificamente o formato GIF
- ✅ Criando conteúdo de memes ou reações para compartilhar nas redes sociais

---

## Framework de decisão de formato

**É uma fotografia para a web?** → **WebP** (ou JPG se WebP não for suportado)

**Precisa de transparência?** → **PNG** (ou WebP para arquivos menores em plataformas modernas)

**É um logo, ícone ou captura de tela?** → **PNG**

**Vai em um e-mail?** → **JPG** ou **PNG** (não WebP, não GIF animado para imagens complexas)

**Precisa de animação?** → **Vídeo MP4** (melhor proporção qualidade/tamanho), **WebP animado** (navegadores modernos) ou **GIF** (compatibilidade máxima)

**Vai editar novamente depois?** → **PNG** (sem perda, sem degradação de qualidade ao salvar novamente)

**Precisa funcionar em softwares antigos?** → **JPG** ou **PNG**

---

## Convertendo entre formatos

Precisa mudar uma imagem de um formato para outro? A [ferramenta Convert to JPG do NanoImage](/convert-to-jpg/) converte PNG, WebP, GIF e BMP para JPG instantaneamente no seu navegador — sem precisar fazer upload.

---

## Perguntas frequentes

**O WebP tem qualidade melhor que o JPG?**
Com o mesmo tamanho de arquivo, sim — o WebP preserva mais detalhes. Com a mesma configuração de qualidade, o WebP produz um arquivo menor. O teto de qualidade visual de ambos os formatos é similar.

**O WebP vai substituir o JPG e o PNG?**
O WebP está ganhando terreno, mas JPG e PNG continuam dominantes pela compatibilidade universal. Um formato mais novo, o AVIF, oferece compressão ainda melhor que o WebP e está crescendo em adoção.

**Por que imagens de sites são salvas como WebP?**
Sites servem WebP para navegadores modernos por questões de desempenho. Quando você salva uma imagem de uma página web, ela é salva no formato que o site serviu — cada vez mais WebP. Você pode convertê-la para JPG usando o [NanoImage](/convert-to-jpg/) se precisar.

**O GIF vai desaparecer algum dia?**
Provavelmente não completamente. Seu papel cultural em memes e reações está enraizado demais. Mas para casos de uso técnicos (desempenho web, animação profissional), já está sendo substituído por vídeo e formatos modernos.

---

## Ferramentas relacionadas

- **[Comprimir imagem](/compress-image/)** — Reduza o tamanho de arquivos JPG ou PNG sem trocar de formato
- **[Converter para JPG](/convert-to-jpg/)** — Converta PNG, WebP, GIF, BMP para JPG na hora
- **[Redimensionar imagem](/resize-image/)** — Altere as dimensões da imagem para qualquer plataforma
`;
