export const content = `
# WebP vs JPG vs PNG vs GIF: qual formato de imagem deve utilizar?

Já se perguntou por que existem tantos formatos de imagem — e qual deveria usar na prática? Este guia abrange tudo o que precisa de saber. Vamos comparar os quatro principais formatos, explicar os seus compromissos e oferecer um enquadramento simples para tomar a decisão certa.

---

## Os quatro formatos num relance

| | JPG | PNG | WebP | GIF |
|---|---|---|---|---|
| **Compressão** | Com perdas | Sem perdas | Ambas | Sem perdas (limitada) |
| **Transparência** | ❌ Não | ✅ Sim | ✅ Sim | ✅ Apenas 1 bit |
| **Animação** | ❌ | ❌ | ✅ | ✅ |
| **Tamanho do ficheiro** | Pequeno | Médio–Grande | O menor | Grande |
| **Ideal para** | Fotografias | Logótipos, capturas de ecrã | Imagens web (todos os tipos) | Animações simples |
| **Suporte em browsers** | Universal | Universal | 95%+ | Universal |

---

## JPG — O padrão para fotografias

O JPG é o formato dominante para fotografias desde os anos 90. Utiliza **compressão com perdas** — descartando dados visuais que o olho humano tem menos probabilidade de notar.

**Como funciona:** O JPG divide a imagem em blocos de 8×8 pixels e aplica compressão matemática. Os detalhes de alta frequência (arestas nítidas, texturas finas) são reduzidos de forma mais agressiva do que as áreas suaves. Em configurações de alta qualidade (85–100%), a compressão é praticamente imperceptível. Abaixo de 60%, surgem os característicos "artefactos" em bloco.

**Use JPG quando:**
- ✅ Fotografias e imagens do mundo real
- ✅ Fotografias de produtos para e-commerce
- ✅ O tamanho do ficheiro é importante e não precisa de transparência
- ✅ Anexos de e-mail (ficheiro leve)

**Evite JPG quando:**
- ❌ Imagens com texto (os artefactos tornam o texto desfocado)
- ❌ Logótipos e ícones (os contornos nítidos ficam pixelizados)
- ❌ Imagens com fundo transparente
- ❌ Ficheiros que vai editar e guardar repetidamente (a qualidade degrada-se em cada gravação)

---

## PNG — Qualidade e transparência

O PNG utiliza **compressão sem perdas** — nenhuma informação visual é descartada. O que entra sai com pixels perfeitos.

**A vantagem da transparência:** O PNG suporta canal alfa — cada pixel pode ser totalmente transparente, totalmente opaco ou qualquer valor intermédio. Isto é essencial para logótipos em fundos diferentes, elementos de interface e autocolantes. O JPG simplesmente não consegue armazenar transparência; as áreas transparentes tornam-se branco sólido.

**O compromisso no tamanho:** Uma fotografia em PNG é tipicamente 3 a 5 vezes maior do que o equivalente em JPG. Para fotografias na web, isto é uma desvantagem. Para logótipos e gráficos com cores planas, o PNG comprime de forma eficiente e continua a ser a escolha certa.

**Use PNG quando:**
- ✅ Logótipos e activos de marca
- ✅ Capturas de ecrã com texto ou elementos de interface
- ✅ Qualquer imagem que exija transparência
- ✅ Gráficos com cores planas ou linhas nítidas
- ✅ Ficheiros de origem que vai editar repetidamente

**Evite PNG quando:**
- ❌ Fotografias apresentadas em páginas web (tamanho do ficheiro demasiado grande)
- ❌ O tamanho do ficheiro é a prioridade máxima

---

## WebP — O formato web moderno

O WebP foi desenvolvido pela Google (lançado em 2010) para ser o melhor dos dois mundos: mais pequeno que JPG e PNG, com suporte para transparência, modos com e sem perdas, e até animação.

**A vantagem no tamanho:**
- **25–35% mais pequeno** do que um JPG de qualidade equivalente
- **26% mais pequeno** do que um PNG equivalente

Esta poupança de largura de banda tem um impacto directo na velocidade de carregamento das páginas e no SEO.

**Comparação real de tamanhos de ficheiro** (fotografia de 2000×1500px):

| Formato | Configuração | Tamanho do ficheiro |
|---|---|---|
| PNG (sem perdas) | — | ~8,5 MB |
| JPG | Qualidade 90% | ~1,8 MB |
| JPG | Qualidade 80% | ~1,1 MB |
| WebP | Qualidade 80% (com perdas) | ~780 KB |
| WebP | Sem perdas | ~6,2 MB |

**Suporte em browsers:** Chrome, Firefox, Safari (desde 2020), Edge, Opera — mais de 95% a nível global em 2026. As principais lacunas são os clientes de e-mail legados e software muito antigo.

**Use WebP quando:**
- ✅ Qualquer imagem num website ou aplicação web
- ✅ Compressão máxima com perda de qualidade visível mínima
- ✅ Imagens transparentes que precisem de carregar rapidamente
- ✅ Qualquer cenário em que JPG ou PNG funcionaria, mas quer um ficheiro mais pequeno

**Evite WebP quando:**
- ❌ Campanhas de e-mail (a maioria dos clientes não suporta — use JPG/PNG)
- ❌ Partilhar com utilizadores em software antigo
- ❌ Enviar para serviços de impressão (use TIFF ou JPG/PNG de alta qualidade)

---

## GIF — Animações e as suas limitações

O GIF é o formato de animação da internet desde 1987, e o seu papel cultural nos memes e reacções mantém-no vivo. Mas as suas limitações técnicas são sérias:

**Os problemas do GIF:**
- **Limite de 256 cores** — as fotografias ficam terríveis; surgem bandas e dithering
- **Tamanhos de ficheiro enormes** — um GIF de 5 segundos a 480p pode ter entre 5 e 20 MB; o mesmo clipe em MP4 pode ter 500 KB
- **Sem áudio**
- **Compressão primitiva** — o algoritmo LZW do GIF é muito menos eficiente do que os codecs modernos

**Por que o GIF persiste:** Compatibilidade universal, reprodução automática sem interacção do utilizador, e enraizamento cultural no conteúdo de memes e reacções.

**Para imagens estáticas, o PNG é sempre melhor do que o GIF.** Para animações, considere:
- **WebP animado** — 64–70% mais pequeno do que o GIF, com os 16,7 milhões de cores completos e transparência total. Use quando controla o ambiente de apresentação e pode confirmar o suporte a animações WebP.
- **Vídeo MP4** — mais de 90% mais pequeno do que o GIF, qualidade completa, aceita áudio. Ideal para web (<video autoplay muted loop>), redes sociais e qualquer coisa com mais de 3–4 segundos.

**Use GIF quando:**
- ✅ É necessária compatibilidade máxima (clientes de e-mail antigos, plataformas legadas)
- ✅ A animação é muito simples (2–4 cores, movimento básico)
- ✅ A plataforma exige especificamente o formato GIF
- ✅ Criar conteúdo de memes ou reacções para partilha em redes sociais

---

## Enquadramento de decisão de formato

**É uma fotografia para a web?** → **WebP** (ou JPG se o WebP não for suportado)

**Precisa de transparência?** → **PNG** (ou WebP para ficheiros mais pequenos em plataformas modernas)

**É um logótipo, ícone ou captura de ecrã?** → **PNG**

**Vai num e-mail?** → **JPG** ou **PNG** (não WebP, não GIF animado para imagens complexas)

**Precisa de animação?** → **Vídeo MP4** (melhor proporção qualidade/tamanho), **WebP animado** (browsers modernos) ou **GIF** (compatibilidade máxima)

**Vai editar novamente mais tarde?** → **PNG** (sem perdas, sem degradação de qualidade ao guardar novamente)

**Precisa de funcionar em software antigo?** → **JPG** ou **PNG**

---

## Conversão entre formatos

Precisa de converter uma imagem de um formato para outro? A [ferramenta Convert to JPG do NanoImage](/convert-to-jpg/) trata das conversões de PNG, WebP, GIF e BMP para JPG instantaneamente no seu browser — sem necessidade de carregamento.

---

## Perguntas frequentes

**O WebP tem melhor qualidade do que o JPG?**
Com o mesmo tamanho de ficheiro, sim — o WebP preserva mais detalhe. Com a mesma configuração de qualidade, o WebP produz um ficheiro mais pequeno. O tecto de qualidade visual de ambos os formatos é semelhante.

**O WebP vai substituir o JPG e o PNG?**
O WebP está a ganhar terreno, mas o JPG e o PNG continuam dominantes pela compatibilidade universal. Um formato mais recente, o AVIF, oferece uma compressão ainda melhor do que o WebP e está a crescer em adopção.

**Por que as imagens de websites são guardadas em WebP?**
Os websites servem WebP aos browsers modernos por razões de desempenho. Quando guarda uma imagem de uma página web, é guardada no formato que o site serviu — cada vez mais WebP. Pode convertê-la para JPG usando o [NanoImage](/convert-to-jpg/) se necessário.

**O GIF vai desaparecer algum dia?**
Provavelmente não completamente. O seu papel cultural nos memes e reacções está demasiado enraizado. Mas para casos de uso técnicos (desempenho web, animação profissional), já está a ser substituído por vídeo e formatos modernos.

---

## Ferramentas relacionadas

- **[Comprimir imagem](/compress-image/)** — Reduza o tamanho de ficheiros JPG ou PNG sem mudar de formato
- **[Converter para JPG](/convert-to-jpg/)** — Converta PNG, WebP, GIF, BMP para JPG instantaneamente
- **[Redimensionar imagem](/resize-image/)** — Altere as dimensões da imagem para qualquer plataforma
`;
