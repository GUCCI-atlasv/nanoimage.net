export const content = `
Você tem uma foto que precisa comprimir, girar ou redimensionar. Pesquisa online, encontra uma ferramenta, envia sua imagem e baixa o resultado. Simples o bastante.

Mas o que aconteceu com sua foto nesse meio tempo?

A maioria das pessoas nunca pensa em perguntar. Este artigo explica o que realmente acontece quando você envia uma imagem para uma ferramenta online — e como se proteger quando precisa editar fotos sensíveis.

## O Que Acontece Quando Você Envia uma Imagem Online

Quando você usa uma ferramenta de imagem online típica, eis o processo por trás dos bastidores:

1. Você seleciona sua foto e clica em enviar
2. Sua imagem é enviada pela internet para o servidor da ferramenta (um computador pertencente ou alugado por aquela empresa)
3. O servidor processa sua imagem (comprime, redimensiona, etc.)
4. A imagem processada é enviada de volta para o seu navegador para download

Sua foto existe no computador de outra pessoa durante esse processo. Se ela permanece lá depois, depende inteiramente das políticas daquela empresa — e a maioria das pessoas nunca lê essas políticas.

## Eles Realmente Guardam Suas Imagens?

A resposta honesta: **depende da ferramenta, e a maioria não informa com clareza.**

Veja as diferentes abordagens que as ferramentas adotam:

**"Excluída imediatamente após o processamento"** — Algumas ferramentas afirmam excluir os uploads instantaneamente após o download. Essa é a política mais amigável à privacidade para ferramentas baseadas em servidor. Mas "imediatamente" geralmente significa de alguns segundos a alguns minutos, e você está confiando na palavra deles.

**"Excluída após X horas"** — Muitas ferramentas mantêm seus arquivos por 1 a 24 horas para permitir que você baixe novamente. Isso é comum e conveniente, mas sua imagem fica no servidor deles durante esse tempo.

**"Pode ser retida para melhoria do serviço"** — Isso é preocupante. Algumas ferramentas usam imagens enviadas para treinar sistemas ou melhorar algoritmos. Isso geralmente está escondido nos termos de serviço.

**Nenhuma política declarada** — Muitas ferramentas pequenas simplesmente não abordam esse assunto. A ausência de uma política declarada não é o mesmo que uma política de proteção à privacidade.

## Por Que Isso Realmente Importa

Para a maioria das imagens — uma foto de produto, um meme, uma captura de tela de algo público — o risco à privacidade é baixo. Mas considere estes cenários:

**Documentos governamentais e identidades.** Muitas solicitações de visto e permissões exigem uploads de fotos com requisitos de tamanho específicos. As pessoas rotineiramente comprimem fotos de passaportes, carteiras de identidade e documentos oficiais usando ferramentas online aleatórias. Esses documentos contêm seu nome completo, data de nascimento, endereço e número de identificação.

**Imagens médicas.** Capturas de tela de aplicativos de saúde, fotos de exames médicos, fotos de receitas. Esses são alguns dos arquivos mais sensíveis que você pode ter no seu celular.

**Documentos comerciais e financeiros.** Capturas de tela de contratos, demonstrações financeiras, e-mails confidenciais. Se você está comprimindo esses arquivos para uma entrega profissional, enviá-los através de um servidor de terceiros é um risco de segurança.

**Fotos pessoais.** Fotos de você, da sua família, da sua casa — mesmo que não sejam imediatamente sensíveis, são dados pessoais que você talvez não queira armazenados em servidores desconhecidos.

## Como Ferramentas Baseadas em Navegador São Diferentes

Uma categoria mais recente de ferramentas de imagem processa tudo diretamente no seu navegador, usando uma tecnologia chamada Canvas API. Essas ferramentas nunca precisam enviar sua imagem para lugar nenhum.

Quando você usa uma ferramenta baseada em navegador como o [NanoImage](https://nanoimage.net):

1. Você seleciona sua foto
2. O processamento acontece inteiramente dentro do seu navegador, no seu próprio dispositivo
3. O resultado é salvo diretamente no seu dispositivo
4. Em nenhum momento sua imagem viaja pela internet para qualquer servidor

Essa não é uma diferença de política — é uma diferença técnica. A ferramenta é fisicamente incapaz de armazenar sua imagem porque nunca a recebe.

## Como Verificar se uma Ferramenta Envia Suas Imagens

Algumas formas de verificar:

**Verifique a política de privacidade.** Procure por palavras como "upload", "armazenar", "reter", "excluir" e "terceiros". Uma ferramenta confiável será explícita sobre o que acontece com seus arquivos.

**Monitore o tráfego de rede.** Em qualquer navegador, você pode abrir as Ferramentas de Desenvolvedor (F12 ou clique com botão direito → Inspecionar) e ir para a aba Rede. Envie uma imagem e observe se alguma requisição de rede aparece. Uma ferramenta baseada em navegador não mostrará atividade de upload.

**Procure funcionalidade offline.** Se uma ferramenta funciona quando você desliga a internet após a página carregar, ela definitivamente processa localmente. Ferramentas baseadas em servidor não funcionam sem conexão.

## Quando Ter Cuidado Especial

Use uma ferramenta baseada em navegador com foco em privacidade sempre que estiver editando:

- Fotos de passaporte ou carteira de identidade
- Documentos médicos ou registros de saúde
- Fotos de documentos financeiros
- Documentos comerciais marcados como confidenciais
- Qualquer imagem que você não gostaria que estivesse armazenada no computador de um desconhecido

Para uso casual — redimensionar uma foto de férias ou comprimir uma foto de comida para redes sociais — o risco é menor. Mas desenvolver o hábito de usar ferramentas baseadas em navegador por padrão é uma abordagem sensata.

## Conclusão

A maioria das ferramentas de imagem online populares envia seus arquivos para os servidores delas. Algumas os excluem rapidamente, outras os mantêm por mais tempo, e algumas não informam claramente de nenhuma forma.

Ferramentas baseadas em navegador que processam imagens localmente — como o NanoImage — são tecnicamente incapazes de armazenar suas imagens porque nunca as recebem. Para fotos sensíveis, essa é a opção mais segura.

Antes de enviar sua próxima foto para uma ferramenta online, tire trinta segundos para verificar: essa ferramenta envia minha imagem para um servidor ou processa no meu navegador?

A resposta faz uma diferença maior do que a maioria das pessoas imagina.
`;
