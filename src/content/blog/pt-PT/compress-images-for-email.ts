export const content = `
# Como comprimir imagens para anexos de e-mail

Tirou uma fotografia e quer enviá-la por e-mail — mas o anexo tem 8 MB e o cliente de e-mail dá erro, ou sabe que a caixa de entrada do destinatário a pode mandar para spam, ou que demorará uma eternidade a abrir no telemóvel dele.

O e-mail e ficheiros de imagem grandes não se dão bem. Eis porquê, e como resolver em menos de um minuto.

---

## Porque é que o e-mail e imagens grandes não combinam

**Limites de tamanho de anexo:** A maioria dos fornecedores de e-mail fixa limites de 10–25 MB por mensagem. O Gmail permite até 25 MB; o Outlook até 20 MB; o Yahoo até 25 MB. Os servidores de e-mail empresariais são frequentemente mais rigorosos — limites de 10 MB ou mesmo 5 MB são comuns.

**Limites da caixa de entrada do destinatário:** Mesmo que o seu servidor de envio permita um anexo de 20 MB, o servidor do destinatário pode recusá-lo. Uma definição empresarial comum fixa o máximo de anexos recebidos em 10 MB.

**Dados móveis:** Abrir um anexo de e-mail de 5 MB em ligação móvel consome dados e tempo reais. Destinatários com pacotes limitados podem adiar a abertura ou nem abrir.

**Filtros de spam:** Alguns filtros sinalizam mensagens com anexos grandes, reduzindo a probabilidade de chegarem à caixa de entrada.

**Armazenamento:** Tanto o remetente como o destinatário usam quota de armazenamento para anexos. Uma fotografia de 5 MB guardada nas duas caixas usa 10 MB de armazenamento combinado.

---

## Que tamanho devem ter as imagens para e-mail?

Depende da finalidade da imagem:

| Finalidade | Tamanho de ficheiro recomendado | Dimensões recomendadas |
|---------|----------------------|----------------------|
| Partilha geral de fotografias | 500 KB – 1 MB | 1200–1600 px de largura |
| Foto de perfil / retrato | Inferior a 500 KB | 800×800 px |
| Digitalização de documento | Inferior a 1 MB | 1200 px de largura a 150 dpi |
| Imagem para newsletter | Inferior a 200 KB | 600 px de largura |
| Prova / pré-visualização para cliente | 200 KB – 500 KB | 1000–1200 px de largura |
| Entrega para impressão de qualidade | 3–8 MB | Resolução completa |

Para a maioria dos e-mails pessoais e profissionais, **inferior a 1 MB por imagem** é um bom alvo. Inferior a 500 KB é melhor se enviar a pessoas em telemóvel.

---

## Passo a passo: comprimir uma imagem para e-mail

### Passo 1: Abrir o Comprimir do NanoImage

Aceda ao [Comprimir imagem do NanoImage](/compress/). Sem conta, sem instalação. A fotografia é processada no navegador — nunca chega a um servidor.

### Passo 2: Carregar a fotografia

Arraste ou clique para carregar. Funciona com JPEG, PNG e WebP.

### Passo 3: Definir o tamanho alvo do ficheiro

No campo de tamanho alvo, introduza o tamanho de saída desejado:
- **E-mail geral:** 500–800 KB
- **Limites de anexo apertados:** 200–300 KB
- **Várias fotografias (5+ imagens):** 200–400 KB cada (o total do anexo mantém-se abaixo da maioria dos limites)

Clique em **Comprimir**. O NanoImage encontra o nível de qualidade ideal para o seu alvo.

### Passo 4: Pré-visualizar e descarregar

Verifique a pré-visualização — especialmente rostos, texto e pormenores finos. A 500 KB–1 MB, uma fotografia típica deve parecer idêntica ao original aos tamanhos de visualização no e-mail. Descarregue e anexe à mensagem.

---

## Deve redimensionar antes de comprimir?

Frequentemente, sim. Uma fotografia 4000×3000 px comprimida para 500 KB fica visivelmente pior do que uma 1600×1200 px comprimida para 500 KB — a imagem mais pequena pode guardar-se com qualidade JPEG mais alta porque há menos píxeis a codificar.

**Fluxo recomendado para fotografias grandes:**

1. Abra o [Redimensionar do NanoImage](/resize/) e redimensione para **1200–1600 px de largura** (lado maior)
2. Descarregue a fotografia redimensionada
3. Abra o [Comprimir do NanoImage](/compress/) e defina o alvo para 500 KB–1 MB
4. Descarregue e anexe

Esta abordagem em dois passos dá a melhor qualidade para o menor tamanho de ficheiro.

---

## Enviar várias fotografias

Se enviar várias fotografias numa só mensagem, o tamanho total dos anexos importa mais do que o de cada imagem.

**Contas rápidas:**
- 5 fotografias a 1 MB cada = 5 MB total ✅ (adequado para a maioria dos serviços)
- 10 fotografias a 2 MB cada = 20 MB total ⚠️ (a aproximar-se dos limites)
- 20 fotografias a 3 MB cada = 60 MB total ❌ (falhará)

Para lotes grandes, comprima cada fotografia para 200–400 KB. 20 fotografias a 300 KB cada = 6 MB total — bem abaixo do limite de todos os principais fornecedores de e-mail.

O NanoImage suporta compressão em lote — carregue várias fotografias de uma vez e aplique o mesmo tamanho alvo a todas em simultâneo.

---

## Alternativas ao e-mail para fotografias grandes

Se precisar mesmo de partilhar fotografias em resolução completa (para impressão, uso profissional ou arquivo), o e-mail não é a ferramenta certa, comprima ou não:

- **Google Drive / Dropbox / OneDrive:** Partilhe uma ligação em vez de anexo. Sem limites práticos de tamanho. O destinatário descarrega só o que quiser.
- **WeTransfer:** Partilha gratuita de ficheiros até 2 GB. Boa para envios pontuais grandes.
- **Álbuns partilhados do iCloud Fotos / Google Fotos:** Ideais para partilhar álbuns com a família.

Comprima para e-mail quando o destinatário só precise de ver a fotografia. Use partilha de ficheiros quando precisar do ficheiro em resolução completa.

---

## Formato para e-mail: JPEG, PNG ou WebP?

Para anexos de fotografias por e-mail, **o JPEG é a melhor escolha:**
- Suportado universalmente por todos os clientes de e-mail e sistemas operativos
- O formato mais eficiente para imagens fotográficas
- A maioria dos clientes de e-mail mostra JPEG incorporado (visível sem descarregar)

Evite enviar WebP como anexo — clientes de e-mail mais antigos (especialmente o Outlook) podem não mostrar WebP incorporado e apresentam-no como ícone de anexo genérico.

Se a imagem for PNG (captura de ecrã, gráfico, logótipo), pode mantê-la em PNG para imagens com texto ou transparência. Para fotografias em formato PNG, converta para JPEG antes de enviar por e-mail — a redução de tamanho é enorme sem alteração visível de qualidade.

---

## Perguntas frequentes

**O meu e-mail diz «anexo demasiado grande» — o que faço?**
Comprima para menos de metade do limite indicado para ter margem. Se o servidor disser limite de 10 MB, aponte para 4–5 MB no total.

**O destinatário vai notar que a imagem foi comprimida?**
A 500 KB–1 MB para uma fotografia normal, não. Os clientes de e-mail mostram imagens na resolução do ecrã (tipicamente 72–96 dpi), não em qualidade de impressão. A compressão não será visível.

**Posso comprimir um PDF para e-mail?**
O NanoImage trabalha com ficheiros de imagem (JPEG, PNG, WebP). Para compressão de PDF precisa de uma ferramenta dedicada a PDF.

**Devo compactar as imagens em ZIP antes de enviar?**
Para ficheiros JPEG, a compressão ZIP quase não acrescenta nada — os JPEG já estão comprimidos. O ZIP é útil para enviar muitos ficheiros organizados numa pasta, não para reduzir o tamanho de JPEG.

**E se precisar de enviar um ficheiro em resolução muito alta?**
Use um serviço de partilha (Google Drive, Dropbox, WeTransfer) e envie a ligação por e-mail. Nunca comprima uma fotografia para impressão de forma tão agressiva que perca resolução útil — o destinatário deve receber o ficheiro completo.

---

## Resumo

Comprimir fotografias para e-mail:

1. **Redimensione primeiro** se a fotografia for maior que 1600 px de largura — use o [Redimensionar do NanoImage](/resize/)
2. **Comprima com alvo** — 500 KB–1 MB para imagens isoladas, 200–400 KB por imagem para lotes
3. **Use formato JPEG** — máxima compatibilidade com todos os clientes de e-mail
4. **Verifique o tamanho total dos anexos** antes de enviar — fique bem abaixo do limite do seu fornecedor

**[Comprima a sua fotografia para e-mail — gratuito, sem carregar, instantâneo →](/compress/)**
`;
