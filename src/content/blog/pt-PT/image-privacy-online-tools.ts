export const content = `
Tem uma foto que precisa de comprimir, rodar ou redimensionar. Pesquisa online, encontra uma ferramenta, carrega a sua imagem e descarrega o resultado. Simples.

Mas o que aconteceu à sua foto entretanto?

A maioria das pessoas nunca pensa em perguntar. Este artigo explica o que realmente acontece quando carrega uma imagem para uma ferramenta online — e como se proteger quando precisa de editar fotos sensíveis.

## O Que Acontece Quando Carrega uma Imagem Online

Quando usa uma ferramenta de imagem online típica, eis o processo nos bastidores:

1. Seleciona a sua foto e clica em carregar
2. A sua imagem é enviada pela internet para o servidor da ferramenta (um computador que pertence ou é alugado por essa empresa)
3. O servidor processa a sua imagem (comprime-a, redimensiona-a, etc.)
4. A imagem processada é enviada de volta para o seu navegador para descarregar

A sua foto existe no computador de outra pessoa durante este processo. Se permanece lá depois depende inteiramente das políticas dessa empresa — e a maioria das pessoas nunca lê essas políticas.

## Eles Realmente Guardam as Suas Imagens?

A resposta honesta: **depende da ferramenta, e a maioria não lhe diz claramente.**

Aqui estão as diferentes abordagens que as ferramentas adotam:

**"Eliminadas imediatamente após o processamento"** — Algumas ferramentas afirmam eliminar os carregamentos instantaneamente após o seu descarregamento. Esta é a política mais amigável em termos de privacidade para ferramentas baseadas em servidor. Mas "imediatamente" muitas vezes significa dentro de alguns segundos a alguns minutos, e está a confiar na palavra deles.

**"Eliminadas após X horas"** — Muitas ferramentas mantêm os seus ficheiros durante 1-24 horas para lhe permitir descarregar novamente. Isto é comum e conveniente, mas a sua imagem permanece no servidor deles durante esse tempo.

**"Podem ser retidas para melhoria do serviço"** — Isto é preocupante. Algumas ferramentas usam imagens carregadas para treinar sistemas ou melhorar algoritmos. Isto está geralmente escondido nos termos de serviço.

**Sem política declarada** — Muitas ferramentas pequenas simplesmente não abordam esta questão. A ausência de uma política declarada não é o mesmo que uma política protetora da privacidade.

## Porque é Que Isto Realmente Importa

Para a maioria das imagens — uma foto de produto, um meme, uma captura de ecrã de algo público — o risco de privacidade é baixo. Mas considere estes cenários:

**Documentos governamentais e identificação.** Muitas candidaturas a vistos e autorizações exigem carregamento de fotos com requisitos de tamanho específicos. As pessoas comprimem rotineiramente fotos de passaportes, cartões de cidadão e documentos oficiais usando ferramentas online aleatórias. Estes documentos contêm o seu nome completo, data de nascimento, morada e número de identificação.

**Imagens médicas.** Capturas de ecrã de aplicações de saúde, fotos de exames médicos, fotos de receitas. Estes são alguns dos ficheiros mais sensíveis que pode ter no seu telemóvel.

**Documentos empresariais e financeiros.** Capturas de ecrã de contratos, demonstrações financeiras, e-mails confidenciais. Se está a comprimir estes documentos para uma submissão de trabalho, enviá-los através de um servidor de terceiros é um risco de segurança.

**Fotos pessoais.** Fotos de si próprio, da sua família, da sua casa — mesmo que não sejam imediatamente sensíveis, são dados pessoais que pode não querer armazenados em servidores desconhecidos.

## Como as Ferramentas Baseadas no Navegador São Diferentes

Uma categoria mais recente de ferramentas de imagem processa tudo diretamente no seu navegador, usando uma tecnologia do navegador chamada Canvas API. Estas ferramentas nunca precisam de enviar a sua imagem para lado nenhum.

Quando usa uma ferramenta baseada no navegador como o [NanoImage](https://nanoimage.net):

1. Seleciona a sua foto
2. O processamento acontece inteiramente dentro do seu navegador, no seu próprio dispositivo
3. O resultado é guardado diretamente no seu dispositivo
4. Em nenhum momento a sua imagem viaja pela internet para qualquer servidor

Isto não é uma diferença de política — é uma diferença técnica. A ferramenta é fisicamente incapaz de armazenar a sua imagem porque nunca a recebe.

## Como Verificar Se uma Ferramenta Carrega as Suas Imagens

Algumas formas de verificar:

**Consulte a política de privacidade.** Procure palavras como "carregar", "armazenar", "reter", "eliminar" e "terceiros". Uma ferramenta de confiança será explícita sobre o que acontece aos seus ficheiros.

**Observe o tráfego de rede.** Em qualquer navegador, pode abrir as Ferramentas de Programador (F12 ou clique direito → Inspecionar) e ir ao separador Rede. Carregue uma imagem e observe se aparecem pedidos de rede. Uma ferramenta baseada no navegador não mostrará atividade de carregamento.

**Procure funcionalidade offline.** Se uma ferramenta funciona quando desliga a internet após a página ter carregado, está definitivamente a processar localmente. Ferramentas baseadas em servidor falharão sem ligação.

## Quando Ter Especial Cuidado

Use uma ferramenta baseada no navegador, que priorize a privacidade, sempre que estiver a editar:

- Fotos de passaporte ou cartão de cidadão
- Documentos médicos ou registos de saúde
- Fotos de documentos financeiros
- Documentos empresariais marcados como confidenciais
- Qualquer imagem que não gostaria de ver armazenada no computador de um desconhecido

Para uso casual — redimensionar uma foto de férias ou comprimir uma imagem de comida para redes sociais — o risco é menor. Mas desenvolver o hábito de usar ferramentas baseadas no navegador por defeito é uma abordagem sensata.

## Conclusão

A maioria das ferramentas de imagem online populares carrega os seus ficheiros para os seus servidores. Algumas eliminam-nos rapidamente, algumas mantêm-nos durante mais tempo, e algumas não lhe dizem claramente de uma forma ou de outra.

Ferramentas baseadas no navegador que processam imagens localmente — como o NanoImage — são tecnicamente incapazes de armazenar as suas imagens porque nunca as recebem. Para fotos sensíveis, esta é a opção mais segura.

Antes de carregar a sua próxima foto para uma ferramenta online, dedique trinta segundos a verificar: esta ferramenta carrega a minha imagem para um servidor, ou processa-a no meu navegador?

A resposta faz mais diferença do que a maioria das pessoas imagina.
`;
