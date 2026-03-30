export const content = `
# Como rodar uma foto deitada de volta à posição correta

Tira uma fotografia a segurar o telemóvel na vertical, faz o carregamento em algum sítio — e ela aparece de lado. Ou digitaliza um documento e o PDF aparece rodado 90 graus. Ou recebe uma imagem de um colega e ela abre de cabeça para baixo em todos os programas que experimenta.

Este é um dos problemas de fotografia mais comuns e irritantes. Eis por que acontece e como corrigir em segundos.

---

## Por que as fotografias aparecem de lado (O problema de orientação EXIF)

A causa mais comum de fotografias de lado não é que os dados da imagem estejam realmente de lado — é que a fotografia foi tirada numa orientação, mas os **metadados EXIF** indicam que deve ser rodada.

Eis o que acontece:

1. Segura o telemóvel na vertical para tirar uma fotografia em modo retrato
2. O sensor da câmara captura a imagem na sua orientação física
3. O telemóvel regista uma etiqueta EXIF que diz "rodar 90 graus no sentido dos ponteiros do relógio ao apresentar"
4. O software que lê dados EXIF (iPhone, Chrome, maioria das apps modernas) apresenta correctamente na vertical
5. O software que ignora dados EXIF apresenta a imagem em bruto — de lado

É por isso que uma fotografia parece normal no seu telemóvel, mas aparece de lado ao carregar para um site, enviar por e-mail ou abrir em certos programas.

**A solução:** Rodar a imagem e guardá-la com a rotação incorporada nos dados de pixels — não apenas registada nos metadados.

---

## Outras razões pelas quais as fotografias ficam de lado

**Documentos digitalizados:** Os scanners de mesa nem sempre detectam a orientação automaticamente. Colocar um documento em ângulo, ou introduzi-lo de lado, produz uma digitalização rodada.

**Capturas de ecrã de interfaces rodadas:** Se tira uma captura de ecrã enquanto o dispositivo está em modo paisagem, a captura de ecrã fica em paisagem. Em contextos de retrato, isto aparece de lado.

**Imagens descarregadas:** Algumas imagens estão inerentemente rodadas devido à forma como foram exportadas por softwares ou câmaras.

**Câmaras reflex:** Muitas câmaras reflex e sem espelho não têm acelerómetros. As fotografias tiradas com a câmara rodada podem não ter metadados de orientação.

---

## Passo a passo: corrigir uma fotografia de lado

### Passo 1: Abra o NanoImage Rodar

Aceda a [NanoImage Rodar Imagem](/rotate-image/). Funciona em qualquer browser — sem conta, sem instalação, sem carregamento para servidor.

### Passo 2: Carregue a sua fotografia

Arraste ou clique para carregar. JPEG, PNG e WebP são suportados.

### Passo 3: Escolha a rotação

- **90° no sentido dos ponteiros do relógio:** O topo do sujeito está a apontar para a esquerda
- **90° no sentido inverso dos ponteiros do relógio:** O topo do sujeito está a apontar para a direita
- **180°:** A fotografia está de cabeça para baixo

Se não tiver a certeza, veja de que lado está o céu (ou o tecto) e rode em conformidade.

### Passo 4: Descarregue

Clique em **Rodar** e depois em **Descarregar**. A rotação fica incorporada no ficheiro de imagem — o resultado é apresentado correctamente em qualquer programa, browser e plataforma.

---

## Como identificar a direcção certa para rodar

**Procure pistas dependentes da gravidade:** A água num copo fica no fundo. O cabelo cai para baixo. Os horizontes são horizontais. O texto lê-se da esquerda para a direita.

**Observe as características faciais:** Os narizes apontam para a frente. Os olhos são horizontais.

**Verifique o contexto:** O que deveria estar no topo da imagem? Rode até esse elemento estar no topo.

Em caso de dúvida, experimente primeiro 90° no sentido dos ponteiros do relógio — esse é o problema de orientação mais comum em fotografias de retrato tiradas em dispositivos Android.

---

## Corrigir a rotação de forma permanente (não apenas os metadados)

Esta é a parte crítica: algumas ferramentas "rodam" uma fotografia actualizando apenas a etiqueta de orientação EXIF, sem alterar realmente os dados de pixels. A imagem parece rodada no ecrã, mas ainda está armazenada de lado.

Se carregar essa imagem para uma plataforma que ignora dados EXIF, ela aparece de lado novamente.

O NanoImage roda os dados de pixels reais, não apenas os metadados. A rotação é permanente e é apresentada correctamente em qualquer lugar — independentemente de o visualizador ler as etiquetas EXIF ou não.

---

## Cenários comuns e as suas soluções

**Fotografia em retrato aparece de lado em carregamentos para sites:**
Problema mais comum. Rode 90° na direcção correcta. A plataforma está a ignorar os metadados EXIF.

**Página de PDF digitalizado está de lado:**
O NanoImage trabalha com ficheiros de imagem — se a sua digitalização é um PDF, exporte a página como JPEG primeiro (a maioria dos visualizadores de PDF permite exportar páginas como imagens), depois rode.

**Fotografias de uma câmara antiga estão de lado:**
As câmaras mais antigas sem acelerómetros não registam a orientação. Rode manualmente e guarde — a rotação persistirá.

**A imagem abre correctamente numa aplicação, mas de lado noutra:**
Uma aplicação está a ler a orientação EXIF; a outra não está. Rodar e guardar novamente com o NanoImage incorpora a rotação nos dados de pixels, corrigindo em todas as aplicações.

**A imagem está ligeiramente inclinada, não exactamente 90°:**
Utilize a rotação de ângulo personalizado do NanoImage para corrigir inclinações menores. Introduza um ângulo específico (ex.: 2,5° ou −3°) para endireitar uma fotografia ligeiramente torta.

---

## Rodar vs. espelhar: qual a diferença?

**Rodar:** Vira a imagem por um número fixo de graus — 90°, 180°, 270°, ou qualquer ângulo personalizado. A imagem gira em torno do seu centro.

**Espelhar:** Cria uma imagem espelhada horizontalmente (da esquerda para a direita) ou verticalmente (de cima para baixo).

Se a sua fotografia está de lado, precisa de **rodar**, não espelhar. Se a sua fotografia é uma imagem espelhada do que pretendia (comum com selfies), utilize a ferramenta separada [Espelhar Imagem](/flip-image/).

---

## Perguntas frequentes

**Por que a minha fotografia parece bem no telemóvel, mas aparece de lado em todo o resto?**
O seu telemóvel lê os dados de orientação EXIF e apresenta em conformidade. Muitos sites, formulários de carregamento e programas não fazem isso. Rodar e guardar novamente com o NanoImage corrige isto permanentemente.

**Rodar reduz a qualidade da imagem?**
Rodar um JPEG exactamente 90°, 180° ou 270° pode ser feito sem perdas — sem recodificar os dados JPEG. O NanoImage usa rotação sem perdas quando possível, preservando a qualidade total da imagem.

**Rodei a minha imagem mas ela ainda aparece de lado depois de descarregar. O que aconteceu?**
Tente abrir o ficheiro descarregado num programa diferente, ou carregue-o para um site para verificar como é apresentado. Alguns visualizadores de fotografias substituem a apresentação com base na própria leitura EXIF.

**Posso rodar apenas uma parte de uma imagem?**
Não — a rotação aplica-se a toda a imagem. Para rotação selectiva, precisaria de um editor de fotografias mais avançado.

---

## Resumo

Corrigir uma fotografia de lado demora cerca de 10 segundos:

1. Abra [NanoImage Rodar Imagem](/rotate-image/)
2. Carregue a sua fotografia
3. Seleccione 90° no sentido dos ponteiros do relógio, 90° no sentido inverso, ou 180°
4. Descarregue — a rotação fica permanentemente incorporada no ficheiro

**[Corrija a sua fotografia de lado — grátis, sem carregamento, sem conta →](/rotate-image/)**
`;
