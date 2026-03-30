export const content = `
# Como girar uma foto torta de volta ao normal

Você tira uma foto segurando o celular na vertical, faz o upload em algum lugar — e ela aparece deitada. Ou você digitaliza um documento e o PDF aparece girado 90 graus. Ou você recebe uma imagem de um colega e ela abre de cabeça para baixo em todos os programas que tenta.

Esse é um dos problemas de foto mais comuns e frustrantes. Veja por que acontece e como corrigir em segundos.

---

## Por que as fotos aparecem de lado (O problema de orientação EXIF)

A causa mais comum de fotos tortas não é que os dados da imagem estejam realmente tortos — é que a foto foi tirada em uma orientação, mas os **metadados EXIF** dizem que ela deve ser girada.

Veja o que acontece:

1. Você segura o celular na vertical para tirar uma foto
2. O sensor da câmera captura a imagem em sua orientação física
3. O celular registra uma tag EXIF que diz "girar 90 graus no sentido horário ao exibir"
4. Softwares que leem dados EXIF (iPhone, Chrome, maioria dos apps modernos) exibem corretamente na vertical
5. Softwares que ignoram dados EXIF exibem a imagem bruta — de lado

É por isso que uma foto parece normal no seu celular, mas aparece de lado ao fazer upload para um site, enviar por e-mail ou abrir em certos programas.

**A solução:** Girar a imagem e salvá-la com a rotação incorporada nos dados de pixels — não apenas registrada nos metadados.

---

## Outros motivos pelos quais as fotos ficam de lado

**Documentos digitalizados:** Scanners de mesa nem sempre detectam a orientação automaticamente. Colocar um documento em um ângulo, ou inseri-lo de lado, produz um scan rotacionado.

**Capturas de tela de interfaces rotacionadas:** Se você tira um screenshot enquanto o dispositivo está no modo paisagem, o screenshot fica em paisagem. Em contextos de retrato, isso aparece de lado.

**Imagens baixadas:** Algumas imagens são inerentemente rotacionadas devido à forma como foram exportadas por softwares ou câmeras.

**Câmeras DSLR:** Muitas câmeras DSLR e mirrorless não têm acelerômetros. Fotos tiradas com a câmera rotacionada podem não ter metadados de orientação.

---

## Passo a passo: corrigir uma foto de lado

### Passo 1: Abra o NanoImage Girar

Acesse [NanoImage Girar Imagem](/rotate-image/). Funciona em qualquer navegador — sem conta, sem instalação, sem upload para servidor.

### Passo 2: Faça upload da sua foto

Arraste ou clique para fazer upload. JPEG, PNG e WebP são suportados.

### Passo 3: Escolha a rotação

- **90° no sentido horário:** O topo do sujeito está apontando para a esquerda
- **90° no sentido anti-horário:** O topo do sujeito está apontando para a direita
- **180°:** A foto está de cabeça para baixo

Se não tiver certeza, veja de que lado está o céu (ou o teto) e gire de acordo.

### Passo 4: Baixe

Clique em **Girar** e depois em **Baixar**. A rotação é incorporada no arquivo de imagem — o resultado é exibido corretamente em qualquer programa, navegador e plataforma.

---

## Como identificar a direção certa para girar

**Procure pistas que dependem da gravidade:** A água em um copo fica na parte inferior. O cabelo cai para baixo. Os horizontes são horizontais. O texto é lido da esquerda para a direita.

**Observe as características faciais:** Narizes apontam para frente. Olhos são horizontais.

**Verifique o contexto:** O que deveria estar no topo da imagem? Gire até que esse elemento esteja no topo.

Em caso de dúvida, tente 90° no sentido horário primeiro — esse é o problema de orientação mais comum em fotos de retrato tiradas em dispositivos Android.

---

## Corrigindo a rotação permanentemente (não apenas os metadados)

Esta é a parte crítica: algumas ferramentas "giram" uma foto atualizando apenas a tag de orientação EXIF, sem realmente alterar os dados de pixels. A imagem parece girada na tela, mas ainda está armazenada de lado.

Se você fizer upload dessa imagem para uma plataforma que ignora dados EXIF, ela aparece de lado novamente.

O NanoImage gira os dados de pixels reais, não apenas os metadados. A rotação é permanente e é exibida corretamente em qualquer lugar — independentemente de o visualizador ler as tags EXIF ou não.

---

## Cenários comuns e suas soluções

**Foto de retrato aparece de lado em uploads para sites:**
Problema mais comum. Gire 90° na direção correta. A plataforma está ignorando os metadados EXIF.

**Página de PDF digitalizado está de lado:**
O NanoImage trabalha com arquivos de imagem — se o seu scan é um PDF, exporte a página como JPEG primeiro (a maioria dos visualizadores de PDF permite exportar páginas como imagens), depois gire.

**Fotos de uma câmera antiga estão de lado:**
Câmeras mais antigas sem acelerômetros não registram orientação. Gire manualmente e salve — a rotação persistirá.

**A imagem abre corretamente em um app, mas de lado em outro:**
Um app está lendo a orientação EXIF; o outro não está. Girar e salvar novamente com o NanoImage incorpora a rotação nos dados de pixels, corrigindo em todos os apps.

**A imagem está levemente inclinada, não exatamente 90°:**
Use a rotação de ângulo personalizado do NanoImage para corrigir inclinações menores. Insira um ângulo específico (ex.: 2,5° ou −3°) para endireitar uma foto levemente torta.

---

## Girar vs. espelhar: qual a diferença?

**Girar:** Vira a imagem por um número fixo de graus — 90°, 180°, 270°, ou qualquer ângulo personalizado. A imagem gira em torno de seu centro.

**Espelhar:** Cria uma imagem espelhada horizontalmente (da esquerda para a direita) ou verticalmente (de cima para baixo).

Se sua foto está de lado, você precisa de **girar**, não espelhar. Se sua foto é uma imagem espelhada do que pretendia (comum com selfies), use a ferramenta separada [Espelhar Imagem](/flip-image/).

---

## Perguntas frequentes

**Por que minha foto parece boa no celular, mas aparece de lado em todo o resto?**
Seu celular lê os dados de orientação EXIF e exibe de acordo. Muitos sites, formulários de upload e programas não fazem isso. Girar e salvar novamente com o NanoImage corrige isso permanentemente.

**Girar reduz a qualidade da imagem?**
Girar um JPEG exatamente 90°, 180° ou 270° pode ser feito sem perdas — sem recodificar os dados JPEG. O NanoImage usa rotação sem perdas quando possível, preservando a qualidade total da imagem.

**Girei minha imagem mas ela ainda aparece de lado depois de baixar. O que aconteceu?**
Tente abrir o arquivo baixado em um programa diferente, ou faça upload para um site para verificar como ele é exibido. Alguns visualizadores de fotos substituem a exibição com base na própria leitura EXIF.

**Posso girar apenas uma parte de uma imagem?**
Não — a rotação se aplica à imagem inteira. Para rotação seletiva, você precisaria de um editor de fotos mais avançado.

---

## Resumo

Corrigir uma foto de lado leva cerca de 10 segundos:

1. Abra [NanoImage Girar Imagem](/rotate-image/)
2. Faça upload da sua foto
3. Selecione 90° no sentido horário, 90° no sentido anti-horário, ou 180°
4. Baixe — a rotação é permanentemente incorporada ao arquivo

**[Corrija sua foto torta — grátis, sem upload, sem conta →](/rotate-image/)**
`;
