export const content = `
# JPG vs PNG vs WebP — Qual Formato de Imagem Deve Usar?

Se já se perguntou por que existem tantos formatos de imagem — e por que importa qual escolhe — este guia é para si.

A versão curta: os diferentes formatos fazem diferentes compromissos entre tamanho de ficheiro, qualidade e funcionalidades como a transparência. Escolher o errado pode significar ficheiros desnecessariamente grandes, perda de qualidade visível, ou problemas de compatibilidade.

Aqui está tudo o que precisa de saber, em linguagem simples.

---

## Os Três Formatos em Resumo

| | JPG | PNG | WebP |
|---|---|---|---|
| **Compressão** | Com perdas | Sem perdas | Ambas (com e sem perdas) |
| **Transparência** | ❌ Não | ✅ Sim | ✅ Sim |
| **Tamanho do ficheiro** | Pequeno | Médio–Grande | O menor |
| **Melhor para** | Fotografias | Gráficos, logótipos, capturas de ecrã | Imagens web (todos os tipos) |
| **Suporte de navegador** | Universal | Universal | Navegadores modernos (95%+) |
| **Qualidade na edição** | Degrada a cada gravação | Sem perda de qualidade | Perda mínima (modo sem perdas) |

---

## JPG (JPEG) — O Padrão para Fotografias

O JPG tem sido o formato dominante para fotografias desde os anos 90. Funciona analisando a imagem e descartando informação visual que o olho humano tem menos probabilidade de notar — um processo chamado **compressão com perdas**.

### Como funciona a compressão JPG
Ao guardar um JPG, o codificador divide a imagem em blocos de 8×8 píxeis e aplica uma transformação matemática (Transformada de Cossenos Discreta) a cada bloco. Os detalhes de alta frequência (bordas nítidas, texturas finas) são reduzidos mais agressivamente do que a informação de baixa frequência (gradientes suaves, grandes áreas de cor semelhante).

Em configurações de alta qualidade (85–100%), este processo é quase invisível. Em configurações de baixa qualidade (abaixo de 60%), começam a aparecer "artefactos" característicos — manchas em blocos, especialmente em torno de bordas e texto.

### Quando usar JPG
- ✅ Fotografias e imagens do mundo real
- ✅ Fotos de produtos para comércio electrónico
- ✅ Imagens que precisa de partilhar por e-mail (tamanho de ficheiro pequeno)
- ✅ Em qualquer lugar onde o tamanho do ficheiro importa mais do que a qualidade perfeita em píxeis

### Quando NÃO usar JPG
- ❌ Imagens com texto (os artefactos de compressão fazem o texto parecer desfocado)
- ❌ Logótipos e ícones (as bordas nítidas ficam em blocos)
- ❌ Imagens com fundos transparentes
- ❌ Ficheiros que vai editar e guardar novamente repetidamente (a qualidade degrada-se cada vez)

---

## PNG — O Campeão da Qualidade e Transparência

O PNG usa **compressão sem perdas** — nenhuma informação visual é alguma vez descartada. O que coloca é exactamente o que obtém, píxel a píxel. Isso torna o PNG ideal para imagens onde a precisão é importante: logótipos, capturas de ecrã, gráficos e qualquer coisa com transparência.

### A vantagem da transparência
O PNG suporta um **canal alfa** — uma quarta camada de dados que armazena informação de transparência para cada píxel. Isto significa que partes da imagem podem ser totalmente transparentes, totalmente opacas, ou qualquer coisa entre elas. Isto é essencial para:
- Logótipos colocados em fundos de cores diferentes
- Elementos de interface (botões, ícones)
- Autocolantes e sobreposições

O JPG simplesmente não consegue fazer isto. Se tentar guardar uma imagem transparente como JPG, as áreas transparentes ficam preenchidas com uma cor sólida (normalmente branco).

### Tamanhos de ficheiro PNG
O compromisso pela qualidade sem perdas são ficheiros maiores. Uma fotografia PNG pode ser 3–5× maior do que um JPG equivalente. Para uso web, esta é uma desvantagem significativa para fotografias — mas perfeitamente aceitável para logótipos e gráficos onde os elementos visuais são mais simples e comprimem de forma mais eficiente.

### Quando usar PNG
- ✅ Logótipos e activos de marca
- ✅ Capturas de ecrã (especialmente com elementos de interface e texto)
- ✅ Imagens que requerem transparência
- ✅ Gráficos com cores planas, linhas nítidas ou texto
- ✅ Ficheiros fonte que vai editar repetidamente

### Quando NÃO usar PNG
- ❌ Fotografias em páginas web (demasiado grandes, use JPG ou WebP)
- ❌ Quando o tamanho do ficheiro é a prioridade máxima

---

## WebP — O Formato Web Moderno

O WebP foi desenvolvido pela Google e lançado em 2010. Foi concebido para ser o melhor dos dois mundos: ficheiros menores do que tanto JPG como PNG, suportando transparência e oferecendo modos com e sem perdas.

### A vantagem do tamanho
O WebP produz tipicamente:
- Ficheiros **25–35% menores** do que JPG de qualidade equivalente
- Ficheiros **26% menores** do que PNG equivalente

Esta é uma poupança significativa de largura de banda para sítios web, onde a velocidade de carregamento de imagens afecta directamente a experiência do utilizador e as classificações nos motores de busca.

### Compatibilidade
O WebP é agora suportado por todos os principais navegadores modernos: Chrome, Firefox, Safari (desde 2020), Edge e Opera. Em 2024, o suporte de navegadores é superior a 95% globalmente. No entanto, alguns softwares e plataformas mais antigos não o suportam — particularmente clientes de e-mail mais antigos e alguns editores de imagens.

### Quando usar WebP
- ✅ Imagens web onde o desempenho é importante
- ✅ Quando quer máxima compressão com mínima perda de qualidade
- ✅ Imagens com transparência que precisam de carregar rapidamente
- ✅ Qualquer cenário em que JPG ou PNG funcionaria, mas quer um ficheiro menor

### Quando NÃO usar WebP
- ❌ Quando a plataforma de destino tem suporte limitado de WebP (p. ex., clientes de e-mail mais antigos)
- ❌ Quando é necessária compatibilidade com software mais antigo
- ❌ Quando edita em aplicações que não suportam WebP

---

## Comparação de Tamanho de Ficheiro no Mundo Real

Eis um exemplo típico com uma fotografia de 2000×1500 px:

| Formato | Definições | Tamanho do Ficheiro |
|---|---|---|
| PNG (sem perdas) | — | ~8,5 MB |
| JPG | 90% de qualidade | ~1,8 MB |
| JPG | 80% de qualidade | ~1,1 MB |
| WebP | 80% de qualidade | ~780 KB |
| WebP | Sem perdas | ~6,2 MB |

Para uma foto, WebP a 80% de qualidade oferece o melhor equilíbrio — qualidade visual semelhante ao JPG a 80%, mas cerca de 30% mais pequeno.

---

## GIF e BMP — Uma Nota Rápida

Encontrará ocasionalmente dois outros formatos:

**GIF** — Suporta animação (daí a sua popularidade para memes e reacções). Limitado a 256 cores, o que o torna inadequado para fotografias. Para imagens estáticas, o PNG é sempre melhor. Para animações, considere WebP (que suporta animação) ou formatos de vídeo.

**BMP** — Um formato Windows não comprimido. Os ficheiros são enormes (um BMP de 1920×1080 é tipicamente 6+ MB). Quase não há razão para usar BMP para outra coisa que não sejam aplicações Windows legadas.

---

## Guia de Decisão Rápida

**É uma fotografia?** → Use **JPG** (ou WebP se a plataforma o suportar)

**Precisa de fundo transparente?** → Use **PNG** (ou WebP)

**É um logótipo, ícone ou captura de ecrã?** → Use **PNG**

**Vai para um sítio web e quer o ficheiro mais pequeno possível?** → Use **WebP**

**Vai editá-lo novamente mais tarde?** → Use **PNG** (para evitar perda de qualidade nas re-gravações)

**Precisa de funcionar em todos os clientes de e-mail e software antigo?** → Use **JPG** ou **PNG**

---

## Converter Entre Formatos

Precisa de mudar uma imagem de um formato para outro? [A ferramenta de Conversão para JPG do NanoImage](https://nanoimage.net/convert-to-jpg) trata das conversões de PNG, WebP, GIF e BMP → JPG instantaneamente no seu navegador.

---

## Ferramentas Relacionadas

- **[Comprimir Imagem](https://nanoimage.net/compress-image)** — Reduzir o tamanho do ficheiro JPG ou PNG sem mudar de formato
- **[Converter para JPG](https://nanoimage.net/convert-to-jpg)** — Converter PNG, WebP, GIF, BMP para JPG
- **[Redimensionar Imagem](https://nanoimage.net/resize-image)** — Alterar as dimensões da imagem
`;
