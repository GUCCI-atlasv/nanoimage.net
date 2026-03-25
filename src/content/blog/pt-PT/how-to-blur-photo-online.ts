export const content = `
# Como Desfocar uma Foto Online — Censurar, Proteger a Privacidade ou Adicionar Profundidade

Desfocar uma imagem não é apenas um efeito artístico — é frequentemente uma necessidade prática. Pode precisar de ocultar um rosto numa captura de ecrã antes de a partilhar publicamente, obscurecer uma matrícula numa foto de rua, ou desfocar um fundo desordenado para que o seu sujeito se destaque.

Seja qual for o motivo, este guia explica como desfocar imagens online de forma rápida e gratuita — sem enviar os seus ficheiros para qualquer servidor.

---

## Por Que Desfocar uma Imagem?

Há três razões principais pelas quais as pessoas desfocam fotos:

### 1. Protecção de Privacidade
Antes de partilhar capturas de ecrã, documentos ou fotos publicamente, pode precisar de ocultar:
- Rostos (por consentimento ou anonimato)
- Informações pessoais (moradas, números de telefone, endereços de e-mail)
- Matrículas de veículos
- Detalhes financeiros em capturas de ecrã
- Nomes de utilizador ou fotos de perfil em capturas de ecrã de redes sociais

### 2. Censurar Conteúdo Sensível
- Redigir informações confidenciais de documentos
- Esconder spoilers em conteúdo de jogos ou entretenimento
- Obscurecer conteúdo inapropriado para públicos mais alargados

### 3. Efeitos Artísticos e Visuais
- Criar um efeito "bokeh" (profundidade de campo reduzida) que as câmaras profissionais produzem
- Chamar a atenção para um sujeito ao suavizar o fundo
- Adicionar uma qualidade onírica ou cinematográfica às fotos

---

## Tipos de Desfoque

Nem todo o desfoque é igual. Eis os principais tipos que encontrará:

**Desfoque Gaussiano** — O mais comum. Cria uma suavização suave e uniforme em toda a imagem ou área seleccionada. O nome vem da curva matemática (distribuição gaussiana) que descreve como os píxeis são misturados.

**Pixelização / Mosaico** — Divide a imagem em grandes blocos quadrados. Frequentemente usado para censurar rostos e matrículas — é mais difícil de reverter do que o desfoque gaussiano.

**Desfoque de Movimento** — Simula movimento ao desfocar numa direcção. Usado para efeitos artísticos de velocidade.

**Desfoque Radial** — Desfoque que irradia de um ponto central, criando um efeito de rotação ou zoom.

Para fins de privacidade e censura, o **desfoque gaussiano** ou a **pixelização** são as escolhas mais práticas.

---

## Como Desfocar uma Imagem com o NanoImage

[A ferramenta de Desfoque do NanoImage](https://nanoimage.net/blur-image) aplica desfoque gaussiano a toda a imagem directamente no navegador. Sem carregamento, sem conta, sem espera.

### Passo 1: Abrir a Ferramenta de Desfoque
Aceda a [nanoimage.net/blur-image](https://nanoimage.net/blur-image).

### Passo 2: Carregar a Sua Imagem
Arraste e largue a sua imagem ou clique em **Seleccionar Ficheiro**. Formatos suportados: JPG, PNG, WebP, GIF, BMP.

### Passo 3: Ajustar a Intensidade do Desfoque
Use o cursor para controlar a intensidade do efeito de desfoque:
- **Baixo (1–3)** — Suavização subtil; bom para suavizar a pele ou reduzir ruído
- **Médio (4–7)** — Desfoque perceptível; bom para efeitos de fundo
- **Alto (8–15)** — Desfoque intenso; bom para ocultar detalhes e protecção de privacidade
- **Máximo** — Obscurecimento completo; o sujeito torna-se irreconhecível

### Passo 4: Pré-visualizar e Transferir
Veja o resultado em tempo real e clique em **Transferir** para guardar a imagem desfocada.

---

## Dicas para uma Protecção de Privacidade Eficaz

### Use Desfoque Mais Intenso para Informações Sensíveis
Para rostos, nomes ou dados financeiros, use um valor de desfoque alto. O desfoque leve pode às vezes ser revertido com ferramentas de processamento de imagem — o desfoque intenso é muito mais difícil de desfazer.

### A Pixelização É Melhor do que o Desfoque para Texto
Se está a ocultar texto (como uma palavra-passe ou endereço de e-mail), a pixelização é mais eficaz do que o desfoque gaussiano. O desfoque gaussiano pode às vezes ser parcialmente revertido usando algoritmos de nitidez, especialmente em texto de alto contraste. A pixelização mistura a informação de forma mais completa.

### Cubra Toda a Área Sensível
Um erro comum é desfocar uma área demasiado pequena. Certifique-se de que o desfoque cobre todo o elemento que está a ocultar, incluindo quaisquer sombras ou reflexos.

### Guarde o Original
Guarde sempre a versão original não desfocada do seu ficheiro. O NanoImage cria um novo ficheiro na transferência — o seu original não é alterado.

---

## Criar um Efeito de Fundo Desfocado

Quer fazer o seu sujeito "destacar-se" do fundo, como uma câmara profissional com abertura larga? Eis uma abordagem simples:

1. **Identifique o seu fluxo de trabalho:** Precisará de desfocar o fundo separadamente do sujeito
2. **Use primeiro uma ferramenta de remoção de fundo** para isolar o seu sujeito (funcionalidade futura do NanoImage — actualmente disponível em ferramentas como remove.bg)
3. **Aplique o desfoque à camada de fundo**
4. **Componha as camadas juntas**

Para uma abordagem mais simples que não requer edição de camadas: se o seu sujeito já está naturalmente separado do fundo (p. ex., um retrato com fundo simples), um desfoque leve aplicado à imagem completa e depois sobrepondo o sujeito original pode funcionar. Isto é melhor tratado num editor de imagens completo se precisar de máscaras precisas.

---

## Quando o Desfoque Não É Suficiente

Para informações verdadeiramente sensíveis — registos médicos, documentos legais, dados financeiros — considere estes passos adicionais:

- **Use barras de redacção pretas** em vez de desfoque (mais difícil de reverter)
- **Elimine o ficheiro sensível** após partilhar a versão redigida
- **Use canais encriptados ponta a ponta** ao partilhar documentos com conteúdo sensível
- **Verifique se o desfoque é suficiente** ampliando 400–500% após aplicar

---

## Perguntas Frequentes

**O texto desfocado pode ser recuperado?**
Em teoria, alguns algoritmos de desfoque podem ser parcialmente revertidos usando processamento de imagem por "deconvolução" — mas apenas se o desfoque for leve e o texto original tiver alta resolução. Para protecção prática da privacidade com uma configuração de desfoque alta, o texto não pode ser recuperado de forma significativa.

**O desfoque funciona em rostos?**
Sim. Um efeito de desfoque gaussiano de alta intensidade ou pixelização num rosto torna-o irreconhecível na prática. Para uso legal ou jornalístico onde é necessário anonimato estrito, verifique os padrões específicos na sua jurisdição.

**A imagem desfocada terá um tamanho de ficheiro menor?**
Curiosamente, não. As imagens desfocadas são frequentemente ligeiramente maiores do que os originais porque o desfoque reduz as bordas nítidas que os algoritmos de compressão exploram. Se o tamanho do ficheiro for importante, comprima após desfocar.

**Posso desfocar apenas parte de uma imagem?**
A ferramenta de desfoque actual do NanoImage aplica o efeito a toda a imagem. Para desfoque de área selectiva, use as ferramentas incorporadas do navegador ou uma ferramenta dedicada de censura/redacção.

---

## Ferramentas Relacionadas

- **[Cortar](https://nanoimage.net/crop-image)** — Cortar a parte que pretende ocultar completamente
- **[Adicionar Marca de Água](https://nanoimage.net/watermark-image)** — Adicionar sobreposições de texto a imagens
- **[Comprimir](https://nanoimage.net/compress-image)** — Reduzir o tamanho do ficheiro após editar
`;
