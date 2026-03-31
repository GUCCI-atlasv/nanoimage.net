export const content = `
# Como redimensionar uma fotografia para um pedido de visto ou passaporte

Os requisitos para fotografias de passaporte e visto são notoriamente rigorosos. Dimensões erradas, tamanho de ficheiro errado, fundo errado — e o pedido é recusado. Voltar a processar uma nova fotografia custa tempo e por vezes dinheiro, e pode atrasar os seus planos de viagem.

Este guia cobre os requisitos exatos para os passaportes e vistos mais comuns e explica passo a passo como redimensionar e preparar a fotografia por si — gratuitamente, no navegador.

---

## Porque é que os requisitos de fotografia de passaporte são tão rigorosos

As fotografias de passaporte são usadas para reconhecimento facial, verificação de identidade e correspondência biométrica. Os requisitos de tamanho rigorosos garantem:

- O rosto está posicionado e dimensionado de forma consistente para correspondência automática
- A fotografia cabe nas dimensões físicas do livrete de passaporte
- Os sistemas digitais extraem traços faciais de forma fiável

A maioria das recusas deve-se a **proporção incorreta**, **rosto demasiado pequeno ou grande no enquadramento** ou **tamanho de ficheiro demasiado grande ou pequeno** — não porque a fotografia em si pareça má.

---

## Tamanhos de fotografia de passaporte por país

### Estados Unidos (passaporte dos EUA)

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 2 × 2 polegadas (51 × 51 mm) |
| Tamanho digital | 600 × 600 px mínimo, até 1200 × 1200 px |
| Proporção | 1:1 (quadrado) |
| Tamanho do ficheiro | 240 KB a 10 MB (para pedidos online) |
| Tamanho do rosto | A cabeça deve ocupar 50–69% da altura do enquadramento |
| Fundo | Branco liso ou branco suave |

### Reino Unido (passaporte do RU)

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 35 × 45 mm |
| Proporção | 35:45 (aproximadamente 7:9) |
| Tamanho digital | Mínimo 600 px no lado mais curto |
| Tamanho do ficheiro | Inferior a 10 MB |
| Tamanho do rosto | 29–34 mm do queixo à coroa |
| Fundo | Cinzento claro ou creme |

### Visto Schengen (UE)

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 35 × 45 mm |
| Proporção | 35:45 |
| Tamanho do rosto | 32–36 mm do queixo ao topo da cabeça (70–80% do enquadramento) |
| Fundo | Claro/branco |

### Passaporte do Canadá

| Requisito | Especificação |
|-------------|------|
| Tamanho de impressão | 50 × 70 mm |
| Proporção | 5:7 |
| Tamanho do rosto | 31–36 mm do queixo à coroa |
| Fundo | Branco |

### Passaporte da Austrália

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
| Tamanho do ficheiro | 10 KB a 1 MB |
| Fundo | Branco |

---

## Passo a passo: preparar a sua fotografia de passaporte

### Passo 1: Tirar a fotografia

Antes de redimensionar qualquer coisa, precisa de uma boa fotografia de origem:

- **Fundo liso:** Use uma parede branca ou clara. Evite sombras — afaste-se cerca de 30 cm da parede.
- **Expressão neutra:** Boca fechada, olhos abertos e claramente visíveis.
- **Posição da cabeça:** Olhe diretamente para a câmara. Sem inclinar.
- **Sem óculos:** A maioria dos países recusa agora fotografias com óculos.
- **Iluminação:** Luz uniforme no rosto. Sem sombras fortes de um lado.

Tire a fotografia com boa luz (perto de uma janela funciona bem) com qualquer câmara de telemóvel em orientação vertical.

### Passo 2: Recortar para a proporção certa

Abra o [Recorte do NanoImage](/crop/) e carregue a sua fotografia.

Para **passaportes dos EUA e da Índia:** Selecione a predefinição **1:1** → posicione a caixa de recorte de forma a centrar o rosto com espaço acima da cabeça e abaixo do queixo → recorte.

Para **passaportes do RU, Schengen e Austrália:** Selecione proporção **Personalizada** → introduza **35:45** → posicione de forma a o rosto preencher 70–80% da altura do enquadramento → recorte.

Para **passaporte canadiano:** Selecione **Personalizada** → introduza **5:7** → recorte.

**Dica de posicionamento:** Os olhos devem ficar no terço superior do enquadramento, aproximadamente a 2/3 da altura a partir da base da imagem.

### Passo 3: Redimensionar para as dimensões exigidas

Abra o [Redimensionar do NanoImage](/resize/) e carregue a fotografia já recortada.

Introduza as dimensões alvo em píxeis. Para a maioria dos pedidos online:
- Passaporte dos EUA (digital): **600 × 600 px** (mínimo) — pode ir até 1200 × 1200 px
- RU/Schengen/Austrália (digital): **600 × 771 px** (escala 35:45 com 600 px de largura)
- Canadá (digital): **600 × 840 px** (escala 5:7 com 600 px de largura)
- Índia (digital): **600 × 600 px**

Certifique-se de que **Manter proporção** está ativado. Como já recortou para a proporção certa, as dimensões devem calcular-se corretamente.

### Passo 4: Verificar o tamanho do ficheiro

A maioria dos portais de submissão de fotografia de passaporte tem um limite de tamanho de ficheiro (frequentemente 240 KB–10 MB).

Verifique o tamanho da fotografia redimensionada. Se for demasiado grande, abra o [Comprimir do NanoImage](/compress/), carregue a fotografia, defina um tamanho alvo ligeiramente abaixo do limite e descarregue.

Se for demasiado pequena (raro mas possível), a fotografia pode ter resolução baixa demais — volte a tirar com maior resolução.

---

## Motivos comuns de recusa (e como evitá-los)

**Rosto demasiado pequeno:** Se a cabeça ocupar menos de 50% da altura do enquadramento, a fotografia será recusada. Recorte mais perto do rosto — deixe menos espaço vazio acima da cabeça.

**Rosto demasiado grande:** Se a cabeça estiver cortada no topo ou no queixo, recorte com mais margem. O alvo é 70–80% de cobertura do rosto no enquadramento.

**Proporção errada:** Uma fotografia vertical recortada a partir de uma imagem horizontal não fica automaticamente com a proporção certa. Use sempre a ferramenta de recorte com proporção personalizada em vez de recortar «a olho».

**Sombra no fundo:** Recusada por não cumprir o requisito de «fundo liso». Volte a tirar com mais distância entre si e a parede.

**Ficheiro demasiado grande:** Muitos portais governamentais têm limites superiores rigorosos (por vezes tão baixos como 240 KB para pedidos dos EUA). Use a ferramenta de compressão com tamanho alvo para atingir um KB específico.

**Formato errado:** Alguns portais exigem JPEG em concreto (não PNG, não WebP). Use o [Converter para JPG do NanoImage](/convert-jpg/) para garantir que a saída é .jpg.

---

## Porque fazer isto no navegador?

Uma fotografia de passaporte contém o seu rosto completo, dados biométricos e é frequentemente associada a informação pessoal. Usar uma ferramenta baseada em servidor significa carregar uma fotografia facial em alta resolução para um terceiro.

O NanoImage trata todo o processamento no navegador — o recorte, o redimensionamento e a compressão acontecem no seu dispositivo. A sua fotografia nunca sai do seu computador ou telemóvel.

---

## Perguntas frequentes

**Posso tirar a minha própria fotografia de passaporte em casa?**
Sim — para submissões digitais e muitas candidaturas presenciais, as fotografias tiradas por si são aceites desde que cumpram os requisitos técnicos. A fotografia deve ser recente (normalmente nos últimos 6 meses).

**A fotografia tem de ser impressa ou posso submetê-la digitalmente?**
A maioria dos novos pedidos de passaporte (EUA, RU, Canadá, Austrália) oferece submissão digital. Consulte o portal específico do seu pedido. Para entregas presenciais em correios ou centros de fotografia, precisará de impressão.

**Que resolução devo usar?**
Para submissões digitais: 600 px no lado curto é o mínimo na maioria dos portais. 1200 px é seguro para todos os portais sem exceder limites superiores.

**Posso usar fotografia com óculos?**
Entre 2023 e 2026, praticamente todos os países que emitem passaportes importantes recusam fotografias com óculos, incluindo graduados e de sol. Retire os óculos para a fotografia.

**O meu portal diz que o ficheiro é demasiado grande mesmo depois de comprimir. O que faço?**
Defina um alvo mais agressivo no Comprimir do NanoImage — experimente 200 KB para portais com limites apertados. A 600×600 px, um JPEG com qualidade 70–75 costuma ficar abaixo de 100 KB com qualidade aceitável.

---

## Resumo

Preparar a sua própria fotografia de passaporte ou visto:

1. Tire uma fotografia bem iluminada com fundo liso
2. [Recorte para a proporção certa](/crop/) — 1:1 para EUA/Índia, 35:45 para RU/Schengen/Austrália, 5:7 para o Canadá
3. [Redimensione para as dimensões em píxeis exigidas](/resize/)
4. [Comprima para cumprir limites de tamanho](/compress/) se necessário
5. [Converta para JPG](/convert-jpg/) se o portal exigir JPEG

**[Redimensione já a sua fotografia de passaporte — gratuito, sem carregar, sem conta →](/resize/)**
`;
