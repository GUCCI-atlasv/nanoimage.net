export const content = `
# Resolução de Imagem Explicada: Pixels, DPI e Por Que Isso Importa

Você provavelmente já ouviu os termos "resolução", "pixels" e "DPI" sendo usados ao falar sobre qualidade de imagem. Mas o que eles realmente significam — e quando isso importa para você?

Este guia explica a resolução de imagem em linguagem simples, para que você possa tomar decisões inteligentes sobre tamanho, qualidade e formato de imagem.

---

## O Que É um Pixel?

Um **pixel** (abreviação de "picture element" — elemento de imagem) é a menor unidade de uma imagem digital. Amplie qualquer foto digital o suficiente e você a verá se dissolver em uma grade de pequenos quadrados coloridos — esses são os pixels.

O número total de pixels em uma imagem é a sua **resolução**. Uma imagem de 1920×1080 tem 1.920 pixels de largura e 1.080 pixels de altura, totalizando cerca de 2 milhões de pixels — por isso é chamada de "2 megapixels" (MP).

Mais pixels significa:
- Mais detalhes e nitidez
- Arquivos maiores
- A capacidade de imprimir maior ou recortar mais sem perder qualidade

---

## O Que É DPI?

**DPI** significa "dots per inch" (pontos por polegada). Descreve quantos pixels são comprimidos em uma polegada de espaço físico quando uma imagem é impressa ou exibida.

É aqui que muitas pessoas ficam confusas, porque DPI é um **conceito de impressão** — não é realmente significativo para imagens exibidas em telas.

Veja por quê: as telas exibem imagens no tamanho que cabe na tela. Uma imagem de 1920×1080 em um monitor de 24 polegadas parece diferente da mesma imagem em uma tela de 5 polegadas de telefone. Os pixels por polegada mudam dependendo do dispositivo, mas a imagem em si não muda.

Quando você **imprime** uma imagem, o DPI se torna crítico porque determina quão nítida ficará a impressão em um tamanho físico específico.

---

## Resolução para Tela vs. Impressão

### Para Telas
A maioria das telas exibe entre 72–144 PPI (pixels por polegada). Padrões comuns:
- **Monitores padrão:** ~96 PPI
- **Telas Retina / HiDPI:** 192–264 PPI
- **Telas de smartphone:** 300–460 PPI

Para imagens na web, o que importa são as **dimensões em pixels**, não a configuração de DPI. Uma imagem de 72 DPI e uma de 300 DPI com as mesmas dimensões em pixels têm aparência idêntica na tela.

### Para Impressão
É aqui que o DPI importa. A recomendação padrão:

| Caso de Uso | DPI Recomendado |
|---|---|
| Impressão fotográfica profissional | 300 DPI |
| Impressora doméstica | 200–300 DPI |
| Pôster grande (visto de longe) | 100–150 DPI |
| Outdoor (visto de 10+ metros) | 15–30 DPI |
| Documento de escritório padrão | 150–200 DPI |

**A regra:** quanto mais próximo o observador estará da peça impressa, maior o DPI necessário.

---

## Calculando o Tamanho de Impressão a Partir das Dimensões em Pixels

Aqui está a fórmula principal:

> **Tamanho de impressão (polegadas) = Dimensão em pixels ÷ DPI**

Portanto, se você tem uma imagem de 3000×2000 pixels e quer imprimir a 300 DPI:
- Largura: 3000 ÷ 300 = **10 polegadas** (~25,4 cm)
- Altura: 2000 ÷ 300 = **6,67 polegadas** (~16,9 cm)

Se você tentar imprimir essa mesma imagem de 3000×2000 em um tamanho maior — digamos 20×13 polegadas a 300 DPI — você precisaria de uma imagem de 6000×3900 pixels. Esticar a imagem de 3000×2000 para esse tamanho significa imprimir a apenas 150 DPI, o que ficará visivelmente suave.

---

## Por Que as Imagens Ficam Ótimas na Tela Mas Borradas ao Imprimir

Este é um dos problemas de imagem mais comuns que as pessoas encontram.

**A causa:** Uma imagem que parece nítida na tela pode não ter pixels suficientes para o tamanho de impressão físico desejado.

**Exemplo:** Uma foto de um aplicativo de mensagens ou rede social geralmente é comprimida para 1080×1080 pixels. Na tela a 5 polegadas de largura, isso é aproximadamente 216 PPI — nítido o suficiente. Mas tente imprimir em 8×8 polegadas a 300 DPI, e você terá apenas 135 DPI — visivelmente suave.

**A solução:** Sempre use o original em maior resolução disponível. Para impressão profissional, sua imagem precisa de pixels suficientes para imprimir a 300 DPI no tamanho desejado.

---

## Megapixels e Resolução de Câmera

Você frequentemente verá câmeras comercializadas pela contagem de megapixels. Veja o que isso significa para impressão:

| Resolução da Câmera | Tamanho Máximo de Impressão a 300 DPI |
|---|---|
| 8 MP (3264×2448) | ~27,7 × 20,8 cm |
| 12 MP (4000×3000) | ~33,9 × 25,4 cm |
| 20 MP (5472×3648) | ~46,3 × 30,9 cm |
| 48 MP (8000×6000) | ~67,7 × 50,8 cm |

Smartphones modernos com câmeras de 12–50 MP podem produzir excelente qualidade de impressão para tamanhos padrão como 10×15, 13×18 e 20×25 cm.

---

## Erros Comuns de Resolução

### Usar Imagens de Baixa Resolução para Impressão
Baixar imagens de sites para uso em materiais impressos é um erro clássico. Imagens de sites são otimizadas para arquivos pequenos na resolução de tela — raramente têm pixels suficientes para impressão de qualidade.

### Confundir "Redimensionar" com "Aumentar Resolução"
Redimensionar uma imagem para dimensões maiores não adiciona informações de pixels — apenas estica os pixels existentes. Uma imagem de 500×500 redimensionada para 2000×2000 ficará borrada porque o software está adivinhando os detalhes ausentes (esse processo é chamado de "upscaling" ou "upsampling").

### Ignorar o DPI ao Exportar para Impressão
Algumas ferramentas de design permitem definir o DPI ao exportar. Se você exportar uma imagem otimizada para web a 72 DPI mas pretende imprimir, pode obter uma impressão física menor do que o esperado — ou uma borrada.

---

## Referência Rápida: Resolução para Usos Comuns

| Caso de Uso | Dimensões em Pixels Recomendadas |
|---|---|
| Banner de largura total do site | 1920×1080 px mínimo |
| Post no Instagram (quadrado) | 1080×1080 px |
| Instagram retrato | 1080×1350 px |
| Capa do Facebook | 851×315 px |
| Banner do LinkedIn | 1584×396 px |
| Imagem de newsletter por e-mail | 600–800 px de largura |
| Impressão fotográfica 10×15 cm (300 DPI) | 1200×1800 px |
| Impressão fotográfica 20×25 cm (300 DPI) | 2400×3000 px |
| Impressão de documento A4 (300 DPI) | 2480×3508 px |

---

## Gerenciando a Resolução de Imagem com o NanoImage

Precisa redimensionar uma imagem para dimensões específicas em pixels? A [ferramenta de Redimensionamento do NanoImage](https://nanoimage.net/resize-image) permite definir dimensões exatas em pixels diretamente no seu navegador — sem software necessário.

Precisa reduzir o tamanho do arquivo sem alterar as dimensões? O [Comprimir](https://nanoimage.net/compress-image) faz isso também.

---

## Ferramentas Relacionadas

- **[Redimensionar Imagem](https://nanoimage.net/resize-image)** — Defina dimensões exatas em pixels
- **[Comprimir Imagem](https://nanoimage.net/compress-image)** — Reduza o tamanho do arquivo mantendo as dimensões
- **[Cortar Imagem](https://nanoimage.net/crop-image)** — Remova áreas indesejadas e altere a proporção
`;
