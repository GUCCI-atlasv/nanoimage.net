export const content = `
# O Que É WebP? O Formato de Imagem Moderno Que Torna os Sítios Web Mais Rápidos

Provavelmente já reparou que aparecem mais ficheiros \`.webp\` quando guarda imagens de sítios web, ou viu o seu navegador exibir imagens num formato que não reconhece. O WebP está cada vez mais em todo o lado — mas a maioria das pessoas não sabe o que é realmente ou por que é importante.

Este guia explica o WebP em termos simples: o que é, por que foi criado, como se compara ao JPG e PNG, e o que deve fazer quando encontra um.

---

## O Que É WebP?

WebP é um formato de imagem desenvolvido pela **Google**, lançado pela primeira vez em 2010 e progressivamente adoptado em toda a web desde então. Foi especificamente concebido para tornar as páginas web mais rápidas, produzindo ficheiros de imagem menores do que os formatos existentes — sem perda perceptível de qualidade visual.

O nome vem de "Web Picture" (Imagem Web) — foi construído especificamente para a web, em vez de ser adaptado de formatos mais antigos concebidos para impressão ou armazenamento.

---

## Por Que Foi Criado o WebP?

As imagens são tipicamente a maior parte do tamanho total de uma página web. De acordo com o HTTP Archive, as imagens representam cerca de 50% do peso médio de uma página web. Reduzir os tamanhos de ficheiro de imagem — mesmo modestamente — tem um impacto directo em:

- **Velocidade de carregamento da página** — O carregamento mais rápido melhora a experiência do utilizador
- **Uso de largura de banda** — Menor consumo de dados para utilizadores em redes móveis
- **SEO** — O Google usa a velocidade da página como sinal de classificação; o carregamento mais rápido de imagens ajuda

O JPG e o PNG serviram bem a web durante décadas, mas foram concebidos no início dos anos 90. A Google queria um formato construído especificamente para o desempenho web moderno.

---

## Como Funciona o WebP?

O WebP usa algoritmos de compressão mais sofisticados do que JPG ou PNG:

**Para compressão com perdas** (como JPG), o WebP usa uma técnica baseada no codec de vídeo VP8. Esta abordagem é melhor a preservar detalhes em áreas complexas (rostos, texturas) enquanto comprime áreas mais simples mais agressivamente — resultando em ficheiros menores com menos degradação visível do que o JPG equivalente.

**Para compressão sem perdas** (como PNG), o WebP usa codificação preditiva — analisa cada píxel em relação aos seus vizinhos e armazena apenas a diferença, em vez do valor absoluto de cada píxel. Isto é mais eficiente do que a abordagem do PNG.

O WebP também suporta **animação** (como GIF, mas com muito melhor compressão) e **transparência** (canal alfa, como PNG).

---

## WebP vs JPG vs PNG: Os Números

Comparações de tamanho de ficheiro no mundo real numa fotografia típica de 1920×1080:

| Formato | Definição de Qualidade | Tamanho do Ficheiro | Tamanho Relativo |
|---|---|---|---|
| PNG (sem perdas) | — | 8,4 MB | 100% |
| JPG | 90% | 1,7 MB | 20% |
| JPG | 80% | 1,1 MB | 13% |
| WebP (sem perdas) | — | 6,1 MB | 73% |
| WebP (com perdas) | 80% | 780 KB | 9,3% |

Para fotografias, o WebP a 80% de qualidade produz ficheiros cerca de **30% menores** do que o JPG equivalente, parecendo virtualmente idêntico ao olho humano.

---

## Resumo de Funcionalidades do WebP

| Funcionalidade | WebP | JPG | PNG | GIF |
|---|---|---|---|---|
| Compressão com perdas | ✅ | ✅ | ❌ | ❌ |
| Compressão sem perdas | ✅ | ❌ | ✅ | ✅ (limitado) |
| Transparência | ✅ | ❌ | ✅ | ✅ (1 bit) |
| Animação | ✅ | ❌ | ❌ | ✅ |
| Tamanho do ficheiro | O menor | Pequeno | Médio–Grande | Médio |
| Suporte de navegador | 95%+ | Universal | Universal | Universal |

---

## Suporte de Navegadores e Plataformas

O WebP é agora suportado por todos os principais navegadores modernos:
- **Chrome** — desde 2010
- **Firefox** — desde 2019
- **Safari** — desde 2020 (macOS Big Sur / iOS 14)
- **Edge** — desde 2018
- **Opera** — desde 2013

No início de 2026, o suporte de navegadores excede 95% globalmente. As principais lacunas de compatibilidade estão em ambientes empresariais legados a executar versões antigas do Internet Explorer, e alguns clientes de e-mail mais antigos.

**Importante:** Muitos clientes de e-mail ainda não suportam WebP. Se estiver a preparar imagens para newsletters de e-mail, use JPG ou PNG para garantir que são exibidas correctamente para todos os destinatários.

---

## Quando Usar WebP

**✅ Use WebP para:**
- Qualquer imagem num sítio web ou aplicação web
- Quando quer ficheiros menores sem sacrificar qualidade visível
- Imagens com transparência que precisam de carregar rapidamente
- Imagens animadas (como alternativa ao GIF)
- Aplicações web progressivas e web móvel

**❌ Evite WebP quando:**
- O destino é uma campanha de e-mail (use JPG/PNG)
- Precisa de partilhar o ficheiro com alguém que usa software mais antigo
- A plataforma de destino não confirma suporte de WebP
- Está a enviar para um serviço de impressão (use TIFF ou JPG/PNG de alta qualidade)

---

## Trabalhar com Ficheiros WebP

### Abrir Ficheiros WebP
Os navegadores modernos abrem ficheiros WebP nativamente. Para edição, a maioria das versões actuais de editores de imagens suporta WebP:
- **Photoshop** (CC 2021 e posterior) — suporte nativo
- **GIMP** — suporte nativo
- **Pré-visualização (Mac)** — suporte nativo
- **Fotografias do Windows** — suporte nativo

Versões mais antigas destas aplicações podem não abrir WebP. Se estiver limitado a software mais antigo, converter para JPG ou PNG primeiro é a solução.

### Converter WebP para JPG ou PNG
Precisa de converter um ficheiro WebP que transferiu para um formato mais compatível? [A ferramenta de Conversão para JPG do NanoImage](https://nanoimage.net/convert-to-jpg) trata da conversão WebP → JPG inteiramente no seu navegador. Sem carregamento, sem conta necessária.

### Converter JPG/PNG para WebP
A maioria dos editores de imagens com suporte WebP permite "Guardar Como" WebP. Para uma conversão online rápida, várias ferramentas suportam isto — embora o NanoImage se foque actualmente na conversão para JPG.

---

## Deve Mudar o Seu Sítio Web para WebP?

Se gere um sítio web, mudar para WebP é uma das melhorias de desempenho com maior impacto que pode fazer. As ferramentas Lighthouse e PageSpeed Insights da Google assinalarão imagens que não são WebP como uma oportunidade de optimização.

**Como implementar WebP no seu sítio:**
- Use o elemento HTML \`<picture>\` para servir WebP com um fallback JPG/PNG para navegadores mais antigos
- Muitas plataformas CMS (WordPress com plugins, Shopify, Squarespace) convertem automaticamente imagens para WebP
- A optimização de imagens da Cloudflare pode servir WebP automaticamente a navegadores suportados

---

## Perguntas Frequentes

**O WebP tem melhor qualidade do que o JPG?**
Com o mesmo tamanho de ficheiro, sim — o WebP preserva mais detalhe. Com a mesma definição de qualidade, o WebP produz um ficheiro menor. O tecto de qualidade visual de ambos os formatos é semelhante.

**O WebP vai substituir JPG e PNG?**
O WebP está a ganhar terreno, mas o JPG e PNG continuam dominantes devido à compatibilidade universal. Um formato mais recente, AVIF, oferece ainda melhor compressão do que o WebP e está a crescer em adopção a par dele.

**Por que as imagens dos sítios web são guardadas como WebP?**
Os sítios web servem WebP a navegadores modernos por questões de desempenho. Quando guarda uma imagem de uma página web, ela é guardada no formato que o sítio serviu — cada vez mais WebP. Pode convertê-la para JPG usando o NanoImage se necessário.

---

## Ferramentas Relacionadas

- **[Converter para JPG](https://nanoimage.net/convert-to-jpg)** — Converter ficheiros WebP para JPG ou outros formatos
- **[Comprimir Imagem](https://nanoimage.net/compress-image)** — Reduzir o tamanho do ficheiro de imagens JPG ou PNG
- **[Redimensionar Imagem](https://nanoimage.net/resize-image)** — Alterar as dimensões da imagem
`;
