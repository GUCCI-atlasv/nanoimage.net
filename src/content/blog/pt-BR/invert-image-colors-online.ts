export const content = `
# Como inverter as cores de uma imagem online (efeito negativo grátis)

Inverter as cores de uma imagem cria um efeito negativo — pretos viram brancos, brancos viram pretos e cada cor é trocada pelo oposto na roda de cores. É um clique e tem mais usos práticos do que parece.

---

## O que inverter cores realmente faz?

Ao inverter uma imagem, o valor de cada pixel vira o oposto matemático. Num arquivo de 8 bits:

- Um pixel com valor **0** (preto) vira **255** (branco)
- Um pixel com valor **255** (branco) vira **0** (preto)
- Um pixel com valor **100** (cinza escuro) vira **155** (cinza claro)
- Um pixel vermelho (255, 0, 0) vira ciano (0, 255, 255)
- Um pixel amarelo (255, 255, 0) vira azul (0, 0, 255)

O resultado é o negativo de cor exato da imagem original — o mesmo efeito de olhar para um negativo de filme tradicional.

---

## Usos práticos da inversão de cores

**Criar efeito de foto negativa.** O uso clássico — inverter uma foto gera um visual surreal e estranho. Retratos, arquitetura e imagens abstratas costumam ficar impactantes invertidas.

**Design de interface em modo escuro.** Designers usam inversão de cor para ver como elementos de UI ficam em fundo escuro ou para gerar rapidamente versões escuras de ícones e ilustrações.

**Acessibilidade e leitura.** Algumas pessoas com deficiência visual ou sensibilidade à luz acham cores invertidas mais fáceis de ler. Inverter um documento ou captura de tela pode melhorar a leitura em certos contextos.

**Checar equilíbrio de cor.** Fotógrafos e designers às vezes invertem uma imagem para enxergar dominâncias de cor — uma dominância azul vira laranja óbvia, mais fácil de notar.

**Criar variações artísticas.** Imagens invertidas funcionam bem como arte digital, efeito de pôster ou camada em composições com múltiplas exposições.

**Ler negativos de filme escaneados.** Se você escaneou negativos de filme direto (sem scanner dedicado de filme), inverter a imagem recupera o positivo.

**Raio-X e imagens térmicas.** Imagens médicas e científicas às vezes são invertidas para análise — ver ossos em preto no branco ou no branco no preto, ou inverter gradientes térmicos.

---

## Passo a passo: inverter uma imagem no navegador

### Passo 1: Abrir Inverter cores do NanoImage

Acesse [Inverter cores no NanoImage](/invert/). Sem conta, sem instalação. Sua imagem fica no seu dispositivo — nada é enviado.

### Passo 2: Enviar sua imagem

Arraste ou clique para enviar. Suporta JPEG, PNG e WebP.

### Passo 3: Pré-visualizar a inversão

A imagem invertida aparece na hora. Veja como as cores mudaram — o resultado é a inversão matemática exata de cada pixel.

### Passo 4: Baixar

Clique em **Baixar** para salvar sua imagem invertida. Pronta para usar.

---

## Coisas interessantes para tentar inverter

Algumas imagens dão resultados mais interessantes que outras:

**Retratos:** Tons de pele viram um ciano-azulado estranho. Os olhos costumam ficar bem dramáticos. Melhor para uso artístico ou editorial.

**Paisagens com céu azul:** O céu vira laranja quente e a vegetação verde vira magenta — efeito de paisagem alienígena marcante.

**Fotos em preto e branco:** Inverter uma imagem em escala de cinza gera o visual de “negativo de filme” — preto vira branco, sombras viram highlights. Especialmente eficaz em retratos.

**Documentos de texto:** Fundo branco com texto preto vira fundo preto com texto branco — útil para conversão a modo escuro.

**Logotipos e ícones:** Ótimo para ver rapidamente como um logotipo fica em fundo claro vs escuro.

**Arte linear e ilustrações:** Traço preto no papel branco vira traço branco no preto — útil para certas técnicas de impressão ou efeito de giz.

---

## Inverter vs outros efeitos de cor

Vale distinguir inversão de cor de efeitos parecidos:

| Efeito | O que faz |
|--------|--------------|
| **Inverter** | Vira cada pixel no oposto matemático da cor |
| **Escala de cinza / P&B** | Remove toda a cor, mantém o brilho em tons de cinza |
| **Dessaturar** | Reduz a intensidade da cor sem remover totalmente |
| **Rotação de matiz** | Desloca todas as cores na roda de cores por um ângulo |
| **Negativo** | Igual a inverter (outro nome, mesmo resultado) |
| **Solarização** | Inversão parcial — só pixels acima de um limiar de brilho são invertidos |

A ferramenta Inverter cores do NanoImage faz inversão completa. Para conversão em escala de cinza, use o [Preto e branco do NanoImage](/bw/).

---

## Inverter para recuperar negativo de filme

Se você escaneou negativos de filme com scanner plano comum ou câmera, provavelmente obteve uma imagem alaranjada avermelhada — a base do filme negativo mais cores invertidas. A inversão ajuda assim:

1. Escaneie ou fotografe o negativo como está
2. Envie para [Inverter cores no NanoImage](/invert/)
3. Inverta a imagem
4. O positivo aparece (cores e tons ficam no sentido certo)

**Observação:** A cor alaranjada da base do filme também será invertida (para azul), então você provavelmente precisará de correção de cor depois da inversão para tirar a dominância. Isso é um primeiro passo básico, não um fluxo completo de negativo para positivo. Software dedicado a filme (como Negative Lab Pro ou SilverFast) faz isso com mais precisão, mas a inversão do NanoImage é um ponto de partida rápido e grátis.

---

## Perguntas frequentes

**Inverter cores é a mesma coisa que “negativo” nos apps de foto?**
Sim — “inverter cores”, “negativo” e “negativo de cor” se referem à mesma operação: substituir cada valor de pixel pelo complemento matemático (255 menos o valor original em cada canal).

**Posso inverter só parte da imagem?**
A ferramenta de inverter do NanoImage vale para a imagem inteira. Para inversão seletiva (só o rosto ou um objeto), você precisaria de um editor mais avançado como Photoshop ou GIMP.

**Inverter minha imagem reduz a qualidade?**
Não. A inversão de cor é uma operação matemática sem perda — cada pixel é recalculado para um valor exato. Nada é perdido ou aproximado. A qualidade da saída é idêntica à da entrada.

**Posso inverter PNG com transparência?**
Sim — o NanoImage preserva a transparência (canal alfa) ao inverter. Só os canais RGB são invertidos; áreas transparentes continuam transparentes.

**Como volto ao original depois de inverter?**
Inverta de novo. Inverter duas vezes devolve cada pixel exatamente ao valor original. Se você salvou a imagem invertida, abra no NanoImage e inverta outra vez — recupera as cores originais.

---

## Resumo

Inverter as cores de uma imagem:

1. Abra [Inverter cores no NanoImage](/invert/)
2. Envie sua imagem
3. Pré-visualize o efeito negativo
4. Baixe — pronto na hora

Um clique, sem upload, sem conta.

**[Inverta as cores da sua imagem grátis →](/invert/)**
`;
