export const content = `
# Como comprimir imagens para anexos de e-mail

Você tirou uma foto e quer mandar por e-mail — mas o anexo tem 8 MB, o cliente de e-mail dá erro, ou você sabe que a caixa de entrada do destinatário vai mandar para spam, ou vai demorar uma eternidade para abrir no celular dele.

E-mail e arquivos de imagem grandes não combinam. Aqui está o porquê e como resolver em menos de um minuto.

---

## Por que e-mail e imagens grandes não combinam

**Limites de tamanho de anexo:** A maioria dos provedores limita anexos a 10–25 MB por e-mail. O Gmail permite até 25 MB; o Outlook, até 20 MB; o Yahoo, até 25 MB. Servidores corporativos costumam ser mais rígidos — limites de 10 MB ou até 5 MB são comuns.

**Limites da caixa do destinatário:** Mesmo que o seu servidor permita anexo de 20 MB, o servidor do destinatário pode recusar. Uma configuração comum em empresas limita anexos recebidos a 10 MB.

**Dados móveis:** Abrir um anexo de 5 MB no 4G consome dados e tempo de verdade. Quem tem franquia limitada pode adiar abrir seu e-mail ou nem abrir.

**Filtros de spam:** Alguns filtros sinalizam e-mails com anexos grandes, reduzindo a chance de chegar à caixa de entrada.

**Armazenamento:** Remetente e destinatário usam cota para anexos. Uma foto de 5 MB salva nas duas caixas usa 10 MB de armazenamento combinado.

---

## Qual tamanho as imagens de e-mail devem ter?

Depende do uso:

| Finalidade | Tamanho de arquivo recomendado | Dimensões recomendadas |
|---------|----------------------|----------------------|
| Compartilhar foto em geral | 500 KB – 1 MB | 1200–1600 px de largura |
| Foto de perfil / retrato | Abaixo de 500 KB | 800×800 px |
| Escaneamento de documento | Abaixo de 1 MB | 1200 px de largura a 150 dpi |
| Imagem de newsletter | Abaixo de 200 KB | 600 px de largura |
| Prova / prévia para cliente | 200 KB – 500 KB | 1000–1200 px de largura |
| Entrega para impressão | 3–8 MB | Resolução completa |

Para a maioria dos e-mails pessoais e profissionais, **abaixo de 1 MB por imagem** é um bom alvo. Abaixo de 500 KB é melhor se quem recebe usa muito o celular.

---

## Passo a passo: comprimir uma imagem para e-mail

### Passo 1: Abrir o Compressão do NanoImage

Acesse [Comprimir imagem no NanoImage](/compress/). Sem conta, sem instalação. Sua foto é processada no navegador — não chega a nenhum servidor.

### Passo 2: Enviar sua foto

Arraste ou clique para enviar. Funciona com JPEG, PNG e WebP.

### Passo 3: Definir o tamanho alvo do arquivo

No campo de tamanho alvo, informe o tamanho desejado na saída:
- **E-mail em geral:** 500–800 KB
- **Limites apertados de anexo:** 200–300 KB
- **Várias fotos (5+ imagens):** 200–400 KB cada (o total do anexo fica dentro da maioria dos limites)

Clique em **Comprimir**. O NanoImage encontra o nível de qualidade ideal para o seu alvo.

### Passo 4: Pré-visualizar e baixar

Confira a prévia — principalmente rostos, texto e detalhes finos. Em 500 KB–1 MB, uma foto típica deve parecer idêntica ao original no tamanho em que se vê no e-mail. Baixe e anexe ao e-mail.

---

## Vale redimensionar antes de comprimir?

Muitas vezes, sim. Uma foto 4000×3000 comprimida para 500 KB fica visivelmente pior que uma 1600×1200 comprimida para 500 KB — a menor pode guardar JPEG com qualidade maior porque há menos pixels para codificar.

**Fluxo recomendado para fotos grandes:**

1. Abra o [Redimensionamento do NanoImage](/resize/) e redimensione para **1200–1600 px de largura** (lado maior)
2. Baixe a foto redimensionada
3. Abra o [Compressão do NanoImage](/compress/) e defina o alvo em 500 KB–1 MB
4. Baixe e anexe

Essa abordagem em duas etapas dá a melhor qualidade no menor tamanho de arquivo.

---

## Enviar várias fotos

Se você manda várias fotos num único e-mail, o tamanho total do anexo importa mais do que cada imagem isolada.

**Conta rápida:**
- 5 fotos de 1 MB cada = 5 MB no total ✅ (ok na maioria dos serviços)
- 10 fotos de 2 MB cada = 20 MB no total ⚠️ (perto do limite)
- 20 fotos de 3 MB cada = 60 MB no total ❌ (vai falhar)

Para muitas fotos, comprima cada uma para 200–400 KB. 20 fotos de 300 KB cada = 6 MB no total — bem abaixo do limite dos principais provedores.

O NanoImage suporta compressão em lote — envie várias fotos de uma vez e aplique o mesmo tamanho alvo a todas simultaneamente.

---

## Alternativas ao e-mail para fotos grandes

Se você realmente precisa compartilhar fotos em resolução completa (impressão, uso profissional ou arquivo), o e-mail não é a ferramenta certa, comprima como comprimir:

- **Google Drive / Dropbox / OneDrive:** Compartilhe um link em vez de anexo. Sem limite prático de tamanho. Quem recebe baixa só o que quiser.
- **WeTransfer:** Compartilhamento gratuito até 2 GB. Bom para envios grandes pontuais.
- **Álbuns compartilhados do iCloud Fotos / Google Fotos:** Melhor para álbuns com a família.

Comprima para e-mail quando quem recebe só precisa ver a foto. Use compartilhamento de arquivos quando precisar do arquivo em resolução plena.

---

## Formato para e-mail: JPEG, PNG ou WebP?

Para anexos de fotos por e-mail, **JPEG é a melhor escolha:**
- Suportado universalmente por todos os clientes de e-mail e sistemas operacionais
- Formato mais eficiente para imagens fotográficas
- A maioria dos clientes exibe JPEG embutido (visível sem baixar)

Evite enviar WebP como anexo — clientes antigos (especialmente Outlook) podem não exibir WebP embutido e mostram só um ícone genérico de anexo.

Se a imagem for PNG (captura de tela, gráfico, logotipo), pode manter PNG para texto ou transparência. Para fotos em PNG, converta para JPEG antes de enviar — a redução de tamanho é enorme sem mudança visível de qualidade.

---

## Perguntas frequentes

**Meu e-mail diz “anexo grande demais” — o que faço?**
Comprima para menos da metade do limite informado para ter margem. Se o servidor diz 10 MB, mire em 4–5 MB no total.

**Quem recebe vai perceber que a imagem foi comprimida?**
Em 500 KB–1 MB para uma foto comum, não. Clientes de e-mail exibem imagens em resolução de tela (em geral 72–96 dpi), não em qualidade de impressão. A compressão não fica visível.

**Posso comprimir PDF para e-mail?**
O NanoImage trabalha com arquivos de imagem (JPEG, PNG, WebP). Para PDF, use uma ferramenta específica de PDF.

**Devo compactar as imagens em ZIP antes de enviar?**
Para JPEG, o ZIP quase não reduz — JPEG já é comprimido. ZIP ajuda a organizar muitos arquivos numa pasta, não a diminuir o tamanho de JPEG.

**E se eu precisar enviar um arquivo em resolução muito alta?**
Use um serviço de compartilhamento (Google Drive, Dropbox, WeTransfer) e mande o link por e-mail. Nunca comprima uma foto para impressão de forma agressiva a ponto de perder resolução útil — quem recebe deve ter o arquivo completo.

---

## Resumo

Comprimir fotos para e-mail:

1. **Redimensione primeiro** se a foto for maior que 1600 px de largura — use o [Redimensionamento do NanoImage](/resize/)
2. **Comprima com alvo** — 500 KB–1 MB para uma imagem, 200–400 KB por imagem em lotes
3. **Use JPEG** — maior compatibilidade com todos os clientes
4. **Confira o tamanho total do anexo** antes de enviar — fique bem abaixo do limite do provedor

**[Comprima sua foto para e-mail — grátis, sem upload, na hora →](/compress/)**
`;
