export const content = `
# Como inverter as cores de uma imagem online (efeito negativo gratuito)

Inverter as cores de uma imagem cria um efeito negativo — os pretos tornam-se brancos, os brancos tornam-se pretos, e cada cor é substituída pelo seu oposto na roda das cores. É um clique e tem mais utilizações práticas do que poderia imaginar.

---

## O que é que inverter cores faz afinal?

Quando inverte uma imagem, cada valor de píxel é invertido para o seu oposto matemático. Num imagem de 8 bits:

- Um píxel com valor **0** (preto) torna-se **255** (branco)
- Um píxel com valor **255** (branco) torna-se **0** (preto)
- Um píxel com valor **100** (cinzento escuro) torna-se **155** (cinzento claro)
- Um píxel vermelho (255, 0, 0) torna-se ciano (0, 255, 255)
- Um píxel amarelo (255, 255, 0) torna-se azul (0, 0, 255)

O resultado é o negativo de cor exato da imagem original — o mesmo efeito que ver um negativo tradicional em película.

---

## Utilizações práticas da inversão de cores

**Criar efeitos de fotografia negativa.** O caso clássico — inverter uma fotografia cria um aspeto surreal e de outro mundo. Retratos, arquitetura e imagens abstratas costumam ficar marcantes invertidas.

**Design de interface em modo escuro.** Designers usam a inversão de cores para pré-visualizar como elementos de interface ficam em fundos escuros, ou para criar rapidamente versões em modo escuro de ícones e ilustrações.

**Acessibilidade e legibilidade.** Algumas pessoas com deficiência visual ou sensibilidade à luz acham cores invertidas mais fáceis de ler. Inverter um documento ou captura de ecrã pode tornar o texto mais legível em certos contextos.

**Verificar o equilíbrio de cor.** Fotógrafos e designers por vezes invertem uma imagem para detetar dominantes de cor e desequilíbrios — uma dominante azul torna-se uma dominante laranja óbvia, mais fácil de ver.

**Criar variações artísticas.** Imagens invertidas funcionam bem como arte digital, efeitos de póster ou como camadas em composições de multiexposição.

**Ler digitalizações de negativos em película.** Se digitalizou negativos de película diretamente (sem scanner dedicado a película), inverter a imagem resultante recupera a imagem positiva.

**Processamento de imagens de raio-X e térmicas.** Imagens médicas e científicas são por vezes invertidas para análise — ver ossos em preto sobre branco vs branco sobre preto, ou inverter gradientes de cor térmica.

---

## Passo a passo: inverter uma imagem no navegador

### Passo 1: Abrir Inverter cores do NanoImage

Aceda ao [Inverter cores do NanoImage](/invert/). Sem conta, sem instalação. A imagem permanece no seu dispositivo — nada é carregado.

### Passo 2: Carregar a imagem

Arraste ou clique para carregar. Suporta JPEG, PNG e WebP.

### Passo 3: Pré-visualizar a inversão

A imagem invertida aparece de imediato. Veja como as cores mudaram — o resultado é uma inversão matemática exata de cada píxel.

### Passo 4: Descarregar

Clique em **Descarregar** para guardar a imagem invertida. Está pronta a usar de imediato.

---

## Coisas interessantes para experimentar inverter

Algumas imagens produzem resultados mais interessantes do que outras quando invertidas:

**Retratos:** Os tons de pele invertem para um ciano-azulado estranho. Os olhos muitas vezes ficam muito dramáticos. Melhor para uso artístico ou editorial.

**Paisagens com céu azul:** O céu torna-se laranja quente e a vegetação verde torna-se magenta — cria um efeito de paisagem alienígena marcante.

**Fotografias a preto e branco:** Inverter uma imagem em escala de cinzentos cria o aspeto de «negativo de película» — o preto torna-se branco, as sombras tornam-se realces. Particularmente eficaz em retratos.

**Documentos de texto:** Fundo branco com texto preto torna-se fundo preto com texto branco — útil para conversão a modo escuro.

**Logótipos e ícones:** Ótimo para ver rapidamente como um logótipo fica em fundos escuros vs claros.

**Arte linear e ilustrações:** Traço preto em papel branco torna-se traço branco em preto — útil para certas técnicas de impressão ou criar ilustrações com efeito de giz.

---

## Inverter vs outros efeitos de cor

Vale a pena distinguir a inversão de cor de efeitos relacionados:

| Efeito | O que faz |
|--------|--------------|
| **Inverter** | Inverte cada píxel para a cor matematicamente oposta |
| **Escala de cinzentos / P&B** | Remove toda a cor, mantém o brilho como valores de cinzento |
| **Desaturar** | Reduz a intensidade da cor sem remoção total |
| **Rotação de matiz** | Desloca todas as cores na roda das cores por um ângulo definido |
| **Negativo** | Igual a inverter (termo diferente, mesmo resultado) |
| **Solarizar** | Inversão parcial — só os píxeis acima de um limiar de brilho são invertidos |

A ferramenta Inverter cores do NanoImage faz uma inversão completa. Para conversão em escala de cinzentos, use em alternativa o [Preto e branco do NanoImage](/bw/).

---

## Inverter para recuperar negativos de película

Se digitalizou negativos físicos em película com um scanner plano normal ou uma câmara, provavelmente obteve uma imagem avermelhada-laranja — a base do filme negativo mais as cores invertidas. Eis como a inversão ajuda:

1. Digitalize ou fotografe o negativo em película tal como está
2. Carregue no [Inverter cores do NanoImage](/invert/)
3. Inverta a imagem
4. A imagem positiva aparece (cores e tons estão agora corretos)

**Nota:** A cor laranja da base do filme também será invertida (para azul), pelo que provavelmente precisará de correção de cor após a inversão para remover a dominante. Isto é um primeiro passo básico, não uma pipeline completa de negativo-para-positivo. Software dedicado a digitalização de película (como Negative Lab Pro ou SilverFast) trata disto com mais precisão, mas a inversão do NanoImage é um ponto de partida rápido e gratuito.

---

## Perguntas frequentes

**Inverter cores é o mesmo que «negativo» nas aplicações de fotografia?**
Sim — «inverter cores», «negativo» e «negativo de cor» referem-se à mesma operação: substituir cada valor de píxel pelo seu complemento matemático (255 menos o valor original em cada canal).

**Posso inverter só parte de uma imagem?**
A ferramenta de inversão do NanoImage aplica-se à imagem inteira. Para inversão seletiva (só um rosto ou um objeto específico), precisaria de um editor mais avançado como Photoshop ou GIMP.

**Inverter a minha imagem reduz a qualidade?**
Não. A inversão de cores é uma operação matemática sem perdas — cada píxel é recalculado para um valor exato. Nenhum dado é perdido ou aproximado. A qualidade da saída é idêntica à da entrada.

**Posso inverter um PNG com transparência?**
Sim — o NanoImage preserva a transparência (canal alfa) ao inverter. Só os canais de cor RGB são invertidos; as áreas transparentes permanecem transparentes.

**Como volto ao original depois de inverter?**
Inverta de novo. Inverter duas vezes devolve cada píxel exatamente ao valor original. Se guardou a imagem invertida, abra-a no NanoImage e inverta outra vez — recuperará as cores originais.

---

## Resumo

Inverter as cores de uma imagem:

1. Abra o [Inverter cores do NanoImage](/invert/)
2. Carregue a imagem
3. Pré-visualize o efeito negativo
4. Descarregue — feito de imediato

Um clique, sem carregar, sem conta.

**[Inverta as cores da sua imagem gratuitamente →](/invert/)**
`;
