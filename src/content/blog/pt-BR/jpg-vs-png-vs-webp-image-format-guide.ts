export const content = `
# JPG vs PNG vs WebP — Qual Formato de Imagem Usar?

Se você já se perguntou por que existem tantos formatos de imagem — e por que importa qual você escolhe — este guia é para você.

A versão resumida: formatos diferentes fazem trocas diferentes entre tamanho de arquivo, qualidade e recursos como transparência. Escolher o errado pode resultar em arquivos desnecessariamente grandes, perda visível de qualidade ou problemas de compatibilidade.

Aqui está tudo que você precisa saber, em linguagem simples.

---

## Os Três Formatos em Resumo

| | JPG | PNG | WebP |
|---|---|---|---|
| **Compressão** | Com perdas | Sem perdas | Ambas (com e sem perdas) |
| **Transparência** | ❌ Não | ✅ Sim | ✅ Sim |
| **Tamanho do arquivo** | Pequeno | Médio–Grande | Menor de todos |
| **Melhor para** | Fotos | Gráficos, logos, capturas de tela | Imagens web (todos os tipos) |
| **Suporte nos navegadores** | Universal | Universal | Navegadores modernos (95%+) |
| **Qualidade de edição** | Degrada a cada salvamento | Sem perda de qualidade | Perda mínima (modo sem perdas) |

---

## JPG (JPEG) — O Padrão para Fotos

O JPG é o formato dominante para fotografias desde a década de 1990. Ele funciona analisando a imagem e descartando informações visuais que o olho humano tem menos probabilidade de notar — um processo chamado **compressão com perdas**.

### Como funciona a compressão JPG
Quando você salva um JPG, o codificador divide a imagem em blocos de 8×8 pixels e aplica uma transformação matemática (Transformada de Cosseno Discreta) a cada bloco. Detalhes de alta frequência (bordas nítidas, texturas finas) são reduzidos de forma mais agressiva do que informações de baixa frequência (gradientes suaves, grandes áreas de cor similar).

Em configurações de alta qualidade (85–100%), esse processo é quase invisível. Em configurações de baixa qualidade (abaixo de 60%), você começa a ver "artefatos" característicos — manchas em blocos, especialmente em bordas e textos.

### Quando usar JPG
- ✅ Fotografias e imagens do mundo real
- ✅ Fotos de produtos para e-commerce
- ✅ Imagens que você precisa compartilhar por e-mail (arquivo pequeno)
- ✅ Qualquer lugar onde o tamanho do arquivo importa mais do que qualidade perfeita de pixels

### Quando NÃO usar JPG
- ❌ Imagens com texto (artefatos de compressão deixam o texto desfocado)
- ❌ Logos e ícones (bordas nítidas ficam em blocos)
- ❌ Imagens com fundos transparentes
- ❌ Arquivos que você vai editar e salvar repetidamente (qualidade degrada a cada vez)

---

## PNG — O Campeão da Qualidade e Transparência

O PNG usa **compressão sem perdas** — nenhuma informação visual é descartada. O que você coloca é exatamente o que você obtém, pixel a pixel. Isso torna o PNG ideal para imagens onde a precisão importa: logos, capturas de tela, gráficos e qualquer coisa com transparência.

### A vantagem da transparência
O PNG suporta um **canal alfa** — uma quarta camada de dados que armazena informações de transparência para cada pixel. Isso significa que partes da imagem podem ser totalmente transparentes, totalmente opacas ou qualquer coisa entre os dois. Isso é essencial para:
- Logos colocados em fundos de cores diferentes
- Elementos de UI (botões, ícones)
- Adesivos e sobreposições

O JPG simplesmente não consegue fazer isso. Se você tentar salvar uma imagem transparente como JPG, as áreas transparentes serão preenchidas com uma cor sólida (geralmente branca).

### Tamanhos de arquivo PNG
A desvantagem da qualidade sem perdas são arquivos maiores. Uma fotografia PNG pode ser 3–5× maior do que um JPG equivalente. Para uso na web, isso é uma desvantagem significativa para fotos — mas perfeitamente aceitável para logos e gráficos onde os elementos visuais são mais simples e comprimem de forma mais eficiente.

### Quando usar PNG
- ✅ Logos e ativos de marca
- ✅ Capturas de tela (especialmente com elementos de UI e texto)
- ✅ Imagens que requerem transparência
- ✅ Gráficos com cores planas, linhas nítidas ou texto
- ✅ Arquivos de origem que você vai editar repetidamente

### Quando NÃO usar PNG
- ❌ Fotografias em páginas web (muito grande, use JPG ou WebP)
- ❌ Quando o tamanho do arquivo é a prioridade máxima

---

## WebP — O Formato Moderno para Web

O WebP foi desenvolvido pelo Google e lançado em 2010. Foi projetado para ser o melhor dos dois mundos: arquivos menores do que JPG e PNG, enquanto suporta transparência e oferece modos com e sem perdas.

### A vantagem de tamanho
O WebP tipicamente produz:
- Arquivos **25–35% menores** do que JPG de qualidade equivalente
- Arquivos **26% menores** do que PNG equivalente

Isso é uma economia significativa de largura de banda para sites, onde a velocidade de carregamento de imagens afeta diretamente a experiência do usuário e as classificações nos mecanismos de busca.

### Compatibilidade
O WebP agora é suportado por todos os principais navegadores modernos: Chrome, Firefox, Safari (desde 2020), Edge e Opera. Em 2024, o suporte dos navegadores está acima de 95% globalmente. No entanto, alguns softwares e plataformas mais antigos não suportam — especialmente clientes de e-mail mais antigos e alguns editores de imagem.

### Quando usar WebP
- ✅ Imagens web onde o desempenho importa
- ✅ Quando você quer compressão máxima com perda de qualidade mínima
- ✅ Imagens com transparência que precisam carregar rápido
- ✅ Qualquer cenário onde JPG ou PNG funcionariam, mas você quer um arquivo menor

### Quando NÃO usar WebP
- ❌ Quando a plataforma de destino tem suporte limitado a WebP (ex.: clientes de e-mail mais antigos)
- ❌ Quando é necessária compatibilidade com softwares mais antigos
- ❌ Quando editando em aplicativos que não suportam WebP

---

## Comparação Real de Tamanhos de Arquivo

Aqui está um exemplo típico com uma fotografia de 2000×1500 px:

| Formato | Configurações | Tamanho do Arquivo |
|---|---|---|
| PNG (sem perdas) | — | ~8,5 MB |
| JPG | 90% de qualidade | ~1,8 MB |
| JPG | 80% de qualidade | ~1,1 MB |
| WebP | 80% de qualidade | ~780 KB |
| WebP | Sem perdas | ~6,2 MB |

Para uma foto, o WebP a 80% de qualidade oferece o melhor equilíbrio — qualidade visual similar ao JPG a 80%, mas cerca de 30% menor.

---

## GIF e BMP — Uma Nota Rápida

Você ocasionalmente encontrará dois outros formatos:

**GIF** — Suporta animação (daí sua popularidade para memes e reações). Limitado a 256 cores, o que o torna inadequado para fotografias. Para imagens estáticas, o PNG é sempre melhor. Para animações, considere WebP (que suporta animação) ou formatos de vídeo.

**BMP** — Um formato Windows sem compressão. Os arquivos são enormes (um BMP de 1920×1080 é tipicamente 6+ MB). Quase não há razão para usar BMP para nada além de aplicativos Windows legados.

---

## Guia Rápido de Decisão

**É uma fotografia?** → Use **JPG** (ou WebP se a plataforma suportar)

**Precisa de fundo transparente?** → Use **PNG** (ou WebP)

**É um logo, ícone ou captura de tela?** → Use **PNG**

**Vai para um site e você quer o menor arquivo possível?** → Use **WebP**

**Você vai editá-lo novamente depois?** → Use **PNG** (para evitar perda de qualidade ao salvar novamente)

**Precisa funcionar em todos os clientes de e-mail e softwares antigos?** → Use **JPG** ou **PNG**

---

## Convertendo Entre Formatos

Precisa mudar uma imagem de um formato para outro? A [ferramenta Converter para JPG do NanoImage](https://nanoimage.net/convert-to-jpg) lida com conversões de PNG, WebP, GIF e BMP → JPG instantaneamente no seu navegador.

---

## Ferramentas Relacionadas

- **[Comprimir Imagem](https://nanoimage.net/compress-image)** — Reduza o tamanho de arquivos JPG ou PNG sem mudar de formato
- **[Converter para JPG](https://nanoimage.net/convert-to-jpg)** — Converta PNG, WebP, GIF, BMP para JPG
- **[Redimensionar Imagem](https://nanoimage.net/resize-image)** — Altere as dimensões da imagem
`;
