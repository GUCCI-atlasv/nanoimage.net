export const content = `
# Como redimensionar uma foto para visto ou passaporte

Os requisitos de foto para passaporte e visto são notoriamente rígidos. Dimensões erradas, tamanho de arquivo errado, fundo inadequado — e o pedido é recusado. Refazer a foto custa tempo e às vezes dinheiro, e pode atrasar seus planos de viagem.

Este guia cobre os requisitos exatos para os passaportes e vistos mais comuns e mostra como redimensionar e preparar a foto você mesmo — de graça, no navegador.

---

## Por que os requisitos de foto de passaporte são tão rígidos

Fotos de passaporte são usadas para reconhecimento facial, verificação de identidade e correspondência biométrica. Os requisitos rígidos de tamanho garantem:

- O rosto fica posicionado e dimensionado de forma consistente para correspondência automatizada
- A foto cabe nas dimensões físicas do passaporte
- Os sistemas digitais extraem traços faciais de forma confiável

A maioria das recusas acontece por **proporção errada**, **rosto pequeno ou grande demais no enquadramento** ou **arquivo grande ou pequeno demais** — não porque a foto em si fique feia.

---

## Tamanho da foto de passaporte por país

### Estados Unidos (passaporte americano)

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 2 × 2 polegadas (51 × 51 mm) |
| Tamanho digital | mínimo 600 × 600 px, até 1200 × 1200 px |
| Proporção | 1:1 (quadrada) |
| Tamanho do arquivo | 240 KB a 10 MB (para pedidos online) |
| Tamanho do rosto | A cabeça deve ocupar 50–69% da altura do enquadramento |
| Fundo | Branco liso ou off-white |

### Reino Unido (passaporte britânico)

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 35 × 45 mm |
| Proporção | 35:45 (aproximadamente 7:9) |
| Tamanho digital | Mínimo 600 px no lado mais curto |
| Tamanho do arquivo | Abaixo de 10 MB |
| Tamanho do rosto | 29–34 mm do queixo à coroa |
| Fundo | Cinza claro ou creme |

### Visto Schengen (UE)

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 35 × 45 mm |
| Proporção | 35:45 |
| Tamanho do rosto | 32–36 mm do queixo ao topo da cabeça (70–80% do enquadramento) |
| Fundo | Claro/branco |

### Passaporte canadense

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 50 × 70 mm |
| Proporção | 5:7 |
| Tamanho do rosto | 31–36 mm do queixo à coroa |
| Fundo | Branco |

### Passaporte australiano

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 35 × 45 mm |
| Proporção | 35:45 |
| Rosto | Deve preencher 70–80% do enquadramento |
| Fundo | Claro liso |

### Passaporte / visto da Índia

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 51 × 51 mm (2 × 2 polegadas) |
| Tamanho digital | 200 × 200 px a 1000 × 1000 px |
| Tamanho do arquivo | 10 KB a 1 MB |
| Fundo | Branco |

---

## Passo a passo: preparar sua foto de passaporte

### Passo 1: Tirar a foto

Antes de redimensionar qualquer coisa, você precisa de uma boa foto de origem:

- **Fundo liso:** Use uma parede branca ou clara. Evite sombras — fique a cerca de 30 cm da parede.
- **Expressão neutra:** Boca fechada, olhos abertos e bem visíveis.
- **Posição da cabeça:** Olhe direto para a câmera. Sem inclinar.
- **Sem óculos:** A maioria dos países hoje recusa fotos com óculos.
- **Iluminação:** Luz uniforme no rosto. Sem sombras fortes de um lado só.

Tire a foto com boa luz (perto de uma janela funciona bem) com qualquer celular em orientação retrato.

### Passo 2: Recortar na proporção certa

Abra o [Recorte do NanoImage](/crop/) e envie sua foto.

Para **passaportes dos EUA e da Índia:** Selecione a predefinição **1:1** → posicione a caixa de recorte para centralizar o rosto, com espaço acima da cabeça e abaixo do queixo → recorte.

Para **passaportes do Reino Unido, Schengen e Austrália:** Selecione proporção **Personalizada** → informe **35:45** → posicione para o rosto preencher 70–80% da altura do enquadramento → recorte.

Para **passaporte canadense:** Selecione **Personalizada** → informe **5:7** → recorte.

**Dica de posicionamento:** Os olhos devem ficar no terço superior do enquadramento, aproximadamente a 2/3 da altura a partir da base da imagem.

### Passo 3: Redimensionar para as dimensões exigidas

Abra o [Redimensionamento do NanoImage](/resize/) e envie a foto já recortada.

Informe as dimensões alvo em pixels. Para a maioria dos pedidos online:
- Passaporte dos EUA (digital): **600 × 600 px** (mínimo) — pode ir até 1200 × 1200 px
- Reino Unido / Schengen / Austrália (digital): **600 × 771 px** (escala 35:45 com 600 px de largura)
- Canadá (digital): **600 × 840 px** (escala 5:7 com 600 px de largura)
- Índia (digital): **600 × 600 px**

Certifique-se de que **Manter proporção** está ativado. Como você já recortou na proporção certa, as dimensões devem calcular corretamente.

### Passo 4: Conferir o tamanho do arquivo

A maioria dos portais de envio de foto de passaporte tem limite de tamanho (comum: 240 KB–10 MB).

Verifique o tamanho da foto redimensionada. Se estiver grande demais, abra o [Compressão do NanoImage](/compress/), envie a foto, defina um tamanho alvo um pouco abaixo do limite e baixe.

Se estiver pequena demais (raro, mas possível), a foto pode ter resolução baixa demais — volte e tire outra foto com resolução maior.

---

## Motivos comuns de recusa (e como evitar)

**Rosto pequeno demais:** Se a cabeça ocupar menos de 50% da altura do enquadramento, a foto será recusada. Recorte mais perto do rosto — deixe menos espaço vazio acima da cabeça.

**Rosto grande demais:** Se a cabeça estiver cortada no topo ou no queixo, afaste o recorte para dar mais espaço. O alvo é cobertura de 70–80% do rosto no enquadramento.

**Proporção errada:** Uma foto em retrato recortada de uma imagem paisagem não fica automaticamente na proporção certa. Sempre use a ferramenta de recorte com proporção personalizada em vez de recortar “no olho”.

**Sombra no fundo:** Recusa por não atender ao requisito de “fundo liso”. Tire outra foto com mais distância entre você e a parede.

**Arquivo grande demais:** Muitos portais governamentais têm limites rígidos (às vezes até 240 KB para pedidos dos EUA). Use a ferramenta de compressão com tamanho alvo para atingir um KB específico.

**Formato errado:** Alguns portais exigem JPEG especificamente (não PNG, não WebP). Use o [Converter para JPG do NanoImage](/convert-jpg/) para garantir que a saída seja .jpg.

---

## Por que fazer isso no navegador?

Uma foto de passaporte mostra seu rosto inteiro, dados biométricos e costuma ir junto com dados pessoais. Usar uma ferramenta baseada em servidor significa enviar uma foto facial em alta resolução para terceiros.

O NanoImage faz todo o processamento no seu navegador — recorte, redimensionamento e compressão acontecem no seu dispositivo. Sua foto não sai do seu computador ou celular.

---

## Perguntas frequentes

**Posso tirar minha própria foto de passaporte em casa?**
Sim — para envios digitais e muitos pedidos presenciais, fotos tiradas por você são aceitas desde que atendam aos requisitos técnicos. A foto deve ser recente (em geral nos últimos 6 meses).

**A foto precisa ser impressa ou posso enviar só digital?**
A maioria dos novos pedidos de passaporte (EUA, Reino Unido, Canadá, Austrália) oferece envio de foto digital. Confira o portal do seu pedido específico. Para entregas presenciais em correios ou centros de foto, você precisará da impressão.

**Qual resolução devo usar?**
Para envio digital: 600 px no lado curto é o mínimo na maioria dos portais. 1200 px é seguro sem ultrapassar limites superiores.

**Posso usar foto com óculos?**
Entre 2023 e 2026, praticamente todos os grandes países emissores de passaporte recusam fotos com óculos, inclusive de grau e de sol. Tire os óculos para a foto.

**Meu portal diz que o arquivo ainda está grande depois de comprimir. O que faço?**
Defina um alvo mais agressivo no Compressão do NanoImage — tente 200 KB para portais com limites apertados. Em 600×600 px, um JPEG em qualidade 70–75 costuma ficar abaixo de 100 KB com qualidade aceitável.

---

## Resumo

Preparar sua própria foto de passaporte ou visto:

1. Tire uma foto bem iluminada com fundo liso
2. [Recorte na proporção certa](/crop/) — 1:1 para EUA/Índia, 35:45 para Reino Unido/Schengen/Austrália, 5:7 para Canadá
3. [Redimensione para os pixels exigidos](/resize/)
4. [Comprima para respeitar os limites de arquivo](/compress/) se necessário
5. [Converta para JPG](/convert-jpg/) se o portal exigir JPEG

**[Redimensione sua foto de passaporte agora — grátis, sem upload, sem conta →](/resize/)**
`;
