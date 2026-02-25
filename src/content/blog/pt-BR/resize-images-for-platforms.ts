export const content = `
Cada plataforma tem requisitos diferentes para imagens. O WhatsApp comprime fotos automaticamente, mas frequentemente as deixa borradas. Anexos de e-mail são bloqueados se forem grandes demais. O Instagram corta sua foto se as dimensões estiverem erradas.

Este guia fornece os tamanhos exatos que você precisa para cada plataforma — e como redimensionar suas imagens rapidamente sem instalar nenhum programa.

## Por Que Redimensionar Importa

A câmera do seu celular tira fotos com 12 megapixels ou mais. Isso produz um arquivo de 3.000 × 4.000 pixels ou maior — muito mais do que qualquer tela de celular ou rede social realmente exibe.

Enviar imagens grandes demais causa vários problemas:
- **WhatsApp** recomprime e deixa as fotos borradas
- **E-mail** pode bloquear anexos acima de um certo tamanho
- **Instagram** pode cortá-las se a proporção estiver errada
- **Sites** carregam lentamente se as imagens forem muito grandes

Redimensionar antes de enviar dá a você controle sobre exatamente o que o destinatário vê.

## Tamanhos de Imagem Recomendados por Plataforma

### WhatsApp

| Caso de Uso | Tamanho Recomendado |
|-------------|-------------------|
| Foto de perfil | 500 × 500 px |
| Foto compartilhada (melhor qualidade) | 1600 × 1200 px máx |
| Imagem como documento | Menos de 5MB |

**O problema com o WhatsApp:** Quando você envia uma foto normalmente, o WhatsApp comprime automaticamente para economizar dados — às vezes reduzindo a qualidade significativamente. Para enviar uma foto com qualidade total, use a opção "Documento" em vez do compartilhamento padrão de foto. Mas mesmo assim, manter as imagens abaixo de 2MB é uma boa prática.

**Melhor abordagem:** Redimensione para 1600px no lado mais longo antes de enviar. Isso preserva a qualidade visual e evita a recompressão pesada.

### E-mail

| Caso de Uso | Tamanho Recomendado |
|-------------|-------------------|
| Imagem no corpo do e-mail | 600–800px de largura |
| Anexo (geral) | Menos de 1MB por imagem |
| Perfil / avatar | 400 × 400 px |

**O problema com o e-mail:** Servidores de e-mail corporativos geralmente têm limites de anexo de 10 a 25MB no total. Se você está enviando múltiplas fotos e cada uma tem 5MB, vai atingir o limite rapidamente. Redimensionar imagens para menos de 500KB cada permite enviar mais de 20 fotos em um único e-mail.

**Melhor abordagem:** Redimensione para no máximo 1200px de largura e depois comprima. Para uma única foto que precisa ficar boa, 1200px de largura com compressão moderada geralmente fica abaixo de 300KB.

### Instagram

| Formato | Tamanho Recomendado | Proporção |
|---------|-------------------|-----------|
| Post quadrado | 1080 × 1080 px | 1:1 |
| Post retrato | 1080 × 1350 px | 4:5 |
| Post paisagem | 1080 × 566 px | 1.91:1 |
| Story / Reels | 1080 × 1920 px | 9:16 |

**O problema com o Instagram:** Se sua imagem não corresponde a uma das proporções suportadas, o Instagram vai adicionar bordas brancas ou cortá-la automaticamente. Nenhuma das duas opções fica bonita.

**Melhor abordagem:** Redimensione para exatamente 1080px de largura com a altura correta para o seu formato. Use a [ferramenta de Redimensionamento do NanoImage](/resize-image) para definir dimensões exatas em pixels.

### Outras Plataformas Comuns

| Plataforma | Foto de Perfil | Imagem Compartilhada |
|------------|--------------|---------------------|
| Facebook | 170 × 170 px | 1200 × 630 px (prévia de link) |
| Twitter/X | 400 × 400 px | 1200 × 675 px |
| LinkedIn | 400 × 400 px | 1200 × 627 px |
| Miniatura do YouTube | 1280 × 720 px | — |

## Como Redimensionar uma Imagem em 3 Passos (Sem Instalar Nada)

1. **Acesse a [Ferramenta de Redimensionamento do NanoImage](/resize-image)**
2. **Envie sua imagem** — arraste e solte ou clique para selecionar
3. **Insira as dimensões desejadas** — defina largura, altura ou ambas. Ative "Manter proporção" para evitar distorcer a imagem.
4. **Baixe** sua imagem redimensionada

Sua imagem é processada inteiramente no seu navegador. Nada é enviado para nenhum servidor.

## Redimensionar vs. Comprimir — Qual a Diferença?

Essas duas coisas são frequentemente confundidas:

**Redimensionar** altera as dimensões em pixels de uma imagem. Uma imagem de 4000×3000 redimensionada para 1200×900 terá menos pixels — é uma imagem fisicamente menor.

**Comprimir** reduz o tamanho do arquivo de uma imagem sem necessariamente alterar suas dimensões em pixels. Uma imagem de 1200×900 pode ser comprimida de 800KB para 200KB reduzindo a qualidade JPEG.

Para a maioria dos usos práticos, você deve fazer **ambos**: redimensionar primeiro para dimensões apropriadas, depois comprimir para um tamanho de arquivo adequado.

O NanoImage tem ferramentas separadas para cada um:
- [Redimensionar Imagem](/resize-image) — alterar dimensões em pixels
- [Comprimir Imagem](/compress-image) — reduzir tamanho do arquivo

## Erros Comuns a Evitar

**Ampliar imagens pequenas.** Se você tem uma imagem de 400×400 e redimensiona para 2000×2000, ela não ficará mais nítida — apenas parecerá borrada e pixelada. Redimensionar só funciona bem quando você está diminuindo imagens.

**Ignorar a proporção.** Forçar uma foto em retrato (vertical) em dimensões quadradas vai esticar ou achatar a imagem. Sempre mantenha as proporções originais, a menos que queira intencionalmente recortar.

**Redimensionar após comprimir.** Sempre redimensione primeiro, depois comprima. Se você comprimir primeiro e depois ampliar, vai amplificar os artefatos de compressão.

**Não salvar o original.** Sempre guarde uma cópia da sua imagem original em alta resolução. Depois de redimensionar e comprimir, você não pode recuperar os detalhes perdidos. O NanoImage nunca modifica seu original — ele sempre cria um novo download.

## Referência Rápida: Qual Tamanho Devo Usar?

| Você está enviando para... | Redimensione para... |
|---------------------------|---------------------|
| Chat do WhatsApp | 1600px de largura |
| E-mail (no corpo) | 800px de largura |
| E-mail (anexo) | 1200px de largura + comprimir para <500KB |
| Instagram quadrado | 1080 × 1080px |
| Instagram story | 1080 × 1920px |
| Post no Twitter/X | 1200 × 675px |
| Post no LinkedIn | 1200 × 627px |
| Foto de perfil (qualquer plataforma) | 400 × 400px ou 500 × 500px |

## Resumo

Redimensionar imagens antes de compartilhar é uma das formas mais simples de melhorar a qualidade e evitar problemas em todas as plataformas. Os pontos principais:

- Cada plataforma tem dimensões ideais — use a tabela acima como referência
- Sempre redimensione antes de comprimir, não depois
- Para o WhatsApp, mire em 1600px de largura para evitar que a recompressão automática degrade a qualidade
- Para o Instagram, combine a proporção exata para evitar cortes
- Use uma ferramenta baseada em navegador para manter suas imagens privadas
`;
