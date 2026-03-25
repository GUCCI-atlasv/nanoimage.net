export const content = `
# Resolução de Imagem Explicada: Píxeis, DPI e Por Que É Importante

Provavelmente já ouviu os termos "resolução", "píxeis" e "DPI" ao falar sobre qualidade de imagem. Mas o que significam realmente — e quando é que algo disto importa para si?

Este guia explica a resolução de imagem em linguagem simples, para que possa tomar decisões inteligentes sobre tamanho, qualidade e formato de imagem.

---

## O Que É um Píxel?

Um **píxel** (abreviatura de "picture element", elemento de imagem) é a menor unidade de uma imagem digital. Amplie qualquer foto digital o suficiente e verá que se dissolve numa grelha de pequenos quadrados coloridos — esses são os píxeis.

O número total de píxeis numa imagem é a sua **resolução**. Uma imagem de 1920×1080 tem 1.920 píxeis de largura e 1.080 píxeis de altura, para um total de cerca de 2 milhões de píxeis — daí ser chamada "2 megapíxeis" (MP).

Mais píxeis significa:
- Mais detalhe e nitidez
- Tamanhos de ficheiro maiores
- A capacidade de imprimir em maior tamanho ou cortar mais sem perder qualidade

---

## O Que É DPI?

**DPI** significa "dots per inch" (pontos por polegada). Descreve quantos píxeis estão comprimidos numa polegada de espaço físico quando uma imagem é impressa ou exibida.

É aqui que muitas pessoas ficam confusas, porque o DPI é um **conceito de impressão** — não tem realmente significado para imagens exibidas em ecrãs.

Eis porquê: os ecrãs exibem imagens no tamanho que cabe no ecrã. Uma imagem de 1920×1080 num monitor de 24 polegadas parece diferente da mesma imagem num ecrã de telemóvel de 5 polegadas. Os píxeis por polegada mudam dependendo do dispositivo, mas a imagem em si não muda.

Quando **imprime** uma imagem, o DPI torna-se crítico porque determina a nitidez da impressão num tamanho físico específico.

---

## Resolução para Ecrã vs. Impressão

### Para Ecrãs
A maioria dos ecrãs exibe entre 72–144 PPI (píxeis por polegada). Padrões comuns:
- **Monitores padrão:** ~96 PPI
- **Ecrãs Retina / HiDPI:** 192–264 PPI
- **Ecrãs de smartphones:** 300–460 PPI

Para imagens web, o que importa são as **dimensões em píxeis**, não a definição de DPI. Uma imagem a 72 DPI e uma imagem a 300 DPI com as mesmas dimensões em píxeis parecem idênticas no ecrã.

### Para Impressão
É aqui que o DPI importa. A recomendação padrão:

| Caso de Uso | DPI Recomendado |
|---|---|
| Impressão fotográfica profissional | 300 DPI |
| Impressora doméstica | 200–300 DPI |
| Cartaz de grande formato (visto de longe) | 100–150 DPI |
| Outdoor (visto a 10+ metros) | 15–30 DPI |
| Documento de escritório padrão | 150–200 DPI |

**A regra:** quanto mais perto o espectador estiver da peça impressa, maior precisa ser o DPI.

---

## Calcular o Tamanho de Impressão a Partir das Dimensões em Píxeis

Eis a fórmula chave:

> **Tamanho de impressão (polegadas) = Dimensão em píxeis ÷ DPI**

Portanto, se tiver uma imagem de 3000×2000 píxeis e quiser imprimir a 300 DPI:
- Largura: 3000 ÷ 300 = **10 polegadas**
- Altura: 2000 ÷ 300 = **6,67 polegadas**

Se tentar imprimir essa mesma imagem de 3000×2000 a um tamanho maior — digamos 20×13 polegadas a 300 DPI — precisaria de uma imagem de 6000×3900 píxeis. Esticar a imagem de 3000×2000 para esse tamanho significa imprimir apenas a 150 DPI, o que parecerá visivelmente suave.

---

## Por Que as Imagens Parecem Óptimas no Ecrã mas Desfocadas Quando Impressas

Este é um dos problemas de imagem mais comuns que as pessoas encontram.

**A causa:** Uma imagem que parece nítida no ecrã pode não ter píxeis suficientes para o tamanho de impressão físico que pretende.

**Exemplo:** Uma foto de uma aplicação de mensagens ou rede social é frequentemente comprimida para 1080×1080 píxeis. No ecrã com 5 centímetros de largura, isso é aproximadamente 216 PPI — nítido o suficiente. Mas tente imprimir a 20×20 centímetros a 300 DPI, e só tem 135 DPI — visivelmente suave.

**A solução:** Use sempre o original de maior resolução que tiver. Para impressão profissional, a sua imagem precisa de ter píxeis suficientes para imprimir a 300 DPI no tamanho desejado.

---

## Megapíxeis e Resolução de Câmara

Frequentemente verá câmaras comercializadas pela contagem de megapíxeis. Eis o que isso significa para a impressão:

| Resolução da Câmara | Tamanho Máximo de Impressão a 300 DPI |
|---|---|
| 8 MP (3264×2448) | ~27,7 × 20,8 cm |
| 12 MP (4000×3000) | ~33,9 × 25,4 cm |
| 20 MP (5472×3648) | ~46,3 × 31 cm |
| 48 MP (8000×6000) | ~67,7 × 50,8 cm |

Os smartphones modernos com câmaras de 12–50 MP podem produzir excelente qualidade de impressão para tamanhos padrão como 10×15, 13×18 e 20×25 centímetros.

---

## Erros Comuns de Resolução

### Usar Imagens de Baixa Resolução para Impressão
Transferir imagens de sítios web para uso em materiais impressos é um erro clássico. As imagens de sítios web são optimizadas para tamanhos de ficheiro pequenos à resolução do ecrã — raramente têm píxeis suficientes para impressão de qualidade.

### Confundir "Redimensionar" com "Aumentar a Resolução"
Redimensionar uma imagem para dimensões maiores não adiciona informação de píxeis — apenas estica os píxeis existentes. Uma imagem de 500×500 redimensionada para 2000×2000 parecerá desfocada porque o software está a adivinhar o detalhe em falta (este processo é chamado "upscaling" ou "upsampling").

### Ignorar o DPI ao Exportar para Impressão
Algumas ferramentas de design permitem definir o DPI ao exportar. Se exportar uma imagem optimizada para web a 72 DPI mas pretende imprimi-la, pode obter uma impressão física menor do que o esperado — ou uma impressão desfocada.

---

## Referência Rápida: Resolução para Usos Comuns

| Caso de Uso | Dimensões em Píxeis Recomendadas |
|---|---|
| Banner web de largura total | 1920×1080 px mínimo |
| Publicação no Instagram (quadrado) | 1080×1080 px |
| Retrato no Instagram | 1080×1350 px |
| Foto de capa do Facebook | 851×315 px |
| Banner do LinkedIn | 1584×396 px |
| Imagem de newsletter de e-mail | 600–800 px de largura |
| Impressão fotográfica 10×15 (300 DPI) | 1200×1800 px |
| Impressão fotográfica 20×25 (300 DPI) | 2400×3000 px |
| Impressão de documento A4 (300 DPI) | 2480×3508 px |

---

## Gerir a Resolução de Imagem com o NanoImage

Precisa de redimensionar uma imagem para dimensões específicas em píxeis? [A ferramenta de Redimensionamento do NanoImage](https://nanoimage.net/resize-image) permite-lhe definir dimensões exactas em píxeis directamente no seu navegador — sem necessidade de software.

Precisa de reduzir o tamanho do ficheiro sem alterar as dimensões? O [Comprimir](https://nanoimage.net/compress-image) também trata disso.

---

## Ferramentas Relacionadas

- **[Redimensionar Imagem](https://nanoimage.net/resize-image)** — Definir dimensões exactas em píxeis
- **[Comprimir Imagem](https://nanoimage.net/compress-image)** — Reduzir o tamanho do ficheiro mantendo as dimensões
- **[Cortar Imagem](https://nanoimage.net/crop-image)** — Remover áreas indesejadas e alterar a proporção
`;
