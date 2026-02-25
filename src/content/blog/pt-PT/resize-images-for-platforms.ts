export const content = `
Cada plataforma tem requisitos diferentes para imagens. O WhatsApp comprime as fotos automaticamente, mas muitas vezes torna-as desfocadas. Os anexos de e-mail são bloqueados se forem demasiado grandes. O Instagram recorta a sua foto se as dimensões estiverem erradas.

Este guia dá-lhe os tamanhos exatos de que precisa para cada plataforma — e como redimensionar as suas imagens rapidamente sem instalar qualquer software.

## Porque é Que Redimensionar é Importante

A câmara do seu telemóvel tira fotos a 12 megapixels ou mais. Isso produz um ficheiro de 3.000 × 4.000 pixels ou mais — muito mais do que qualquer ecrã de telemóvel ou plataforma de redes sociais realmente apresenta.

Enviar imagens demasiado grandes causa vários problemas:
- **WhatsApp** recomprime-as e torna-as desfocadas
- **E-mail** pode bloquear anexos acima de um determinado tamanho
- **Instagram** pode recortá-las se a proporção estiver errada
- **Websites** carregam lentamente se as imagens forem demasiado grandes

Redimensionar antes de enviar dá-lhe controlo sobre exatamente o que o destinatário vê.

## Tamanhos de Imagem Recomendados por Plataforma

### WhatsApp

| Caso de Uso | Tamanho Recomendado |
|-------------|---------------------|
| Foto de perfil | 500 × 500 px |
| Foto partilhada (melhor qualidade) | 1600 × 1200 px máx. |
| Imagem como documento | Menos de 5MB |

**O problema com o WhatsApp:** Quando envia uma foto normalmente, o WhatsApp comprime-a automaticamente para poupar largura de banda — por vezes reduzindo a qualidade significativamente. Para enviar uma foto com qualidade total, use a opção "Documento" em vez da partilha de foto padrão. Mas mesmo assim, manter as imagens abaixo de 2MB é uma boa prática.

**Melhor abordagem:** Redimensione para 1600px no lado mais longo antes de enviar. Isto preserva a qualidade visível evitando uma recompressão pesada.

### E-mail

| Caso de Uso | Tamanho Recomendado |
|-------------|---------------------|
| Imagem inline (no corpo do e-mail) | 600–800px de largura |
| Anexo (geral) | Menos de 1MB por imagem |
| Perfil / avatar | 400 × 400 px |

**O problema com o e-mail:** Os servidores de e-mail empresariais têm frequentemente limites de anexos de 10–25MB no total. Se está a enviar várias fotos, cada uma com 5MB significa que atingirá o limite rapidamente. Redimensionar as imagens para menos de 500KB cada permite-lhe enviar mais de 20 fotos num único e-mail.

**Melhor abordagem:** Redimensione para 1200px de largura no máximo, depois comprima. Para uma única foto que precisa de ter bom aspeto, 1200px de largura com compressão moderada fica tipicamente abaixo de 300KB.

### Instagram

| Formato | Tamanho Recomendado | Proporção |
|---------|---------------------|-----------|
| Publicação quadrada | 1080 × 1080 px | 1:1 |
| Publicação retrato | 1080 × 1350 px | 4:5 |
| Publicação paisagem | 1080 × 566 px | 1.91:1 |
| Story / Reel | 1080 × 1920 px | 9:16 |

**O problema com o Instagram:** Se a sua imagem não corresponder a uma das proporções suportadas, o Instagram vai adicionar margens brancas ou recortá-la automaticamente. Nenhuma das opções fica bem.

**Melhor abordagem:** Redimensione para exatamente 1080px de largura com a altura correta para o seu formato. Use a [ferramenta de Redimensionar do NanoImage](/resize-image) para definir as dimensões exatas em pixels.

### Outras Plataformas Comuns

| Plataforma | Foto de Perfil | Imagem Partilhada |
|------------|----------------|-------------------|
| Facebook | 170 × 170 px | 1200 × 630 px (pré-visualização de link) |
| Twitter/X | 400 × 400 px | 1200 × 675 px |
| LinkedIn | 400 × 400 px | 1200 × 627 px |
| Miniatura YouTube | 1280 × 720 px | — |

## Como Redimensionar uma Imagem em 3 Passos (Sem Software Necessário)

1. **Aceda à [Ferramenta de Redimensionar do NanoImage](/resize-image)**
2. **Carregue a sua imagem** — arraste e largue ou clique para selecionar
3. **Introduza as dimensões pretendidas** — defina largura, altura ou ambas. Ative "Bloquear proporção" para evitar que a imagem fique distorcida.
4. **Descarregue** a sua imagem redimensionada

A sua imagem é processada inteiramente no seu navegador. Nada é carregado para qualquer servidor.

## Redimensionar vs. Comprimir — Qual é a Diferença?

Estas duas coisas são frequentemente confundidas:

**Redimensionar** altera as dimensões em pixels de uma imagem. Uma imagem de 4000×3000 redimensionada para 1200×900 terá menos pixels — é uma imagem fisicamente mais pequena.

**Comprimir** reduz o tamanho do ficheiro de uma imagem sem necessariamente alterar as suas dimensões em pixels. Uma imagem de 1200×900 pode ser comprimida de 800KB para 200KB reduzindo a qualidade JPEG.

Para a maioria dos fins práticos, convém fazer **ambos**: redimensionar primeiro para dimensões apropriadas, depois comprimir para um tamanho de ficheiro adequado.

O NanoImage tem ferramentas separadas para cada um:
- [Redimensionar Imagem](/resize-image) — alterar dimensões em pixels
- [Comprimir Imagem](/compress-image) — reduzir tamanho do ficheiro

## Erros Comuns a Evitar

**Ampliar imagens pequenas.** Se tem uma imagem de 400×400 e a redimensiona para 2000×2000, não ficará mais nítida — ficará apenas desfocada e pixelizada. Redimensionar só funciona bem quando está a tornar as imagens mais pequenas.

**Ignorar a proporção.** Forçar uma foto em formato retrato (vertical) para dimensões quadradas vai esticá-la ou comprimi-la. Mantenha sempre as proporções originais, a menos que pretenda recortar intencionalmente.

**Redimensionar após comprimir.** Redimensione sempre primeiro, depois comprima. Se comprimir primeiro e depois redimensionar para maior, vai amplificar quaisquer artefactos de compressão.

**Não guardar o original.** Guarde sempre uma cópia da sua imagem original em alta resolução. Depois de redimensionar e comprimir, não consegue recuperar o detalhe perdido. O NanoImage nunca modifica o seu original — cria sempre um novo descarregamento.

## Referência Rápida: Que Tamanho Devo Usar?

| Está a enviar para... | Redimensione para... |
|------------------------|----------------------|
| Conversa no WhatsApp | 1600px de largura |
| E-mail (inline) | 800px de largura |
| E-mail (anexo) | 1200px de largura + comprimir para <500KB |
| Instagram quadrado | 1080 × 1080px |
| Instagram story | 1080 × 1920px |
| Publicação Twitter/X | 1200 × 675px |
| Publicação LinkedIn | 1200 × 627px |
| Foto de perfil (qualquer plataforma) | 400 × 400px ou 500 × 500px |

## Resumo

Redimensionar imagens antes de partilhar é uma das formas mais simples de melhorar a qualidade e evitar problemas nas diversas plataformas. Os pontos-chave:

- Cada plataforma tem dimensões ideais — use a tabela acima como referência
- Redimensione sempre antes de comprimir, nunca o contrário
- Para o WhatsApp, aponte para 1600px de largura para evitar que a recompressão automática degrade a qualidade
- Para o Instagram, corresponda a proporção exatamente para evitar recortes
- Use uma ferramenta baseada no navegador para manter as suas imagens privadas
`;
