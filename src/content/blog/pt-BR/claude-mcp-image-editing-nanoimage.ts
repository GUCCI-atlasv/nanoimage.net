export const content = `
# Como Editar Imagens Diretamente no Claude — Guia de Integração NanoImage MCP

Se você já esteve no meio de uma conversa com o Claude e precisou comprimir rapidamente uma imagem, redimensioná-la para o Instagram ou converter um PNG para WebP — você conhece o atrito. Você para, abre outra aba, faz upload do arquivo, espera, baixa, volta.

Isso agora é opcional. O NanoImage funciona como um servidor MCP (Model Context Protocol) gratuito em \`mcp.nanoimage.net\`, o que significa que o Claude pode processar suas imagens diretamente na conversa — sem trocar de aba, sem uploads para servidores de terceiros.

Este guia mostra exatamente como conectar e o que você pode fazer com isso.

---

## O Que É MCP?

MCP (Model Context Protocol) é um padrão aberto que permite ao Claude se conectar a ferramentas e serviços externos. Depois de adicionar um servidor MCP às suas configurações do Claude, o Claude pode chamá-lo automaticamente quando você pedir algo que ele lida.

Pense nisso como dar ao Claude um novo conjunto de mãos — neste caso, mãos que podem manipular arquivos de imagem.

---

## O Que o NanoImage MCP Pode Fazer

Depois de conectado, você pode pedir ao Claude coisas como:

- *"Comprima esta imagem para menos de 200KB"*
- *"Redimensione esta foto para 1080×1080 pixels"*
- *"Recorte esta para uma proporção 16:9"*
- *"Converta este PNG para WebP"*
- *"Gire esta imagem 90 graus"*
- *"Transforme esta foto em preto e branco"*
- *"Desfoque esta imagem"*
- *"Quais são as dimensões e o tamanho do arquivo desta imagem?"*

O Claude chamará a ferramenta certa automaticamente com base no que você pedir. Não precisa saber qual ferramenta usar — apenas descreva o que você quer.

**Ferramentas disponíveis (v1.1):**

| Tool | What it does |
|------|-------------|
| compress_image | Reduce file size (JPG, PNG, WebP) |
| resize_image | Change dimensions by pixel or percentage |
| crop_image | Crop to coordinates or aspect ratio (1:1, 16:9, 4:5…) |
| rotate_image | Rotate 90°, 180°, or 270° |
| flip_image | Mirror horizontally, vertically, or both |
| convert_image | Convert between JPG, PNG, and WebP |
| blur_image | Apply Gaussian blur |
| grayscale_image | Convert to black and white |
| get_image_info | Get dimensions, format, file size, color space |

---

## Como Conectar o NanoImage ao Claude

### Opção A: Claude.ai (Web / Mobile) — Mais Fácil

O Claude.ai suporta servidores MCP remotos nativamente. Nenhuma instalação necessária.

1. Abra [claude.ai](https://claude.ai) e vá em **Configurações**
2. Clique em **Integrações** no menu à esquerda
3. Clique em **Adicionar Integração** → selecione **MCP Server**
4. Preencha:
   - **Nome:** NanoImage
   - **URL:** https://mcp.nanoimage.net/mcp
5. Clique em **Salvar**
6. Inicie uma nova conversa — as ferramentas do NanoImage estarão disponíveis imediatamente

> As integrações MCP estão disponíveis nos planos Claude Pro e Team. Se você não vê o menu Integrações, use a Opção B abaixo.

---

### Opção B: Claude Desktop (macOS / Windows)

Edite o arquivo de configuração do Claude Desktop:

- **macOS:** ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows:** %APPDATA%\\Claude\\claude_desktop_config.json

Adicione ou mescle o seguinte:

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "url": "https://mcp.nanoimage.net/mcp"
    }
  }
}
\`\`\`

Salve e **reinicie completamente o Claude Desktop**. O NanoImage aparecerá nas ferramentas disponíveis.

**Se sua versão ainda não suporta MCP remoto**, use o proxy mcp-remote (requer Node.js):

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.nanoimage.net/mcp"]
    }
  }
}
\`\`\`

---

## Testando

Depois de conectado, faça upload de uma imagem para o Claude e experimente estes prompts:

**Teste rápido:**
> *"Quais são as dimensões e o tamanho do arquivo desta imagem?"*

**Comprimir para web:**
> *"Comprima esta imagem para menos de 150KB, mantenha como JPG"*

**Preparar para Instagram:**
> *"Recorte esta para um quadrado 1:1, depois comprima para menos de 1MB"*

O Claude encadeará as duas chamadas de ferramenta automaticamente — recorte primeiro, depois compressão.

**Converter formato:**
> *"Converta este PNG para WebP com 85% de qualidade"*

---

## Privacidade

- As imagens são enviadas via **HTTPS** (criptografadas em trânsito)
- As imagens são processadas na memória e retornadas imediatamente
- **Nenhuma imagem é armazenada** após o processamento
- Não é necessário conta ou login
- Hospedado em **Cloudflare Workers** (rede global de borda)

---

## Limites de Taxa

O NanoImage MCP é gratuito e público. Um limite de **20 solicitações por minuto por IP** é aplicado para evitar abuso. O uso normal do Claude (algumas chamadas de ferramenta por conversa) nunca atingirá esse limite.

---

## Solução de Problemas

**O Claude não está chamando as ferramentas do NanoImage automaticamente**
Certifique-se de que você fez upload de uma imagem na conversa. O Claude precisa de entrada de imagem para acionar as ferramentas de imagem.

**Estou vendo um erro 429**
Você atingiu o limite de taxa. Aguarde 60 segundos e tente novamente.

**As ferramentas não aparecem após salvar a configuração**
Para o Claude Desktop, feche completamente e reabra o aplicativo. Para o Claude.ai, inicie uma nova conversa.

---

## Referência Rápida

| What you want | Prompt |
|--------------|--------|
| Check image details | "What size and format is this image?" |
| Compress for email | "Compress this under 500KB" |
| Resize for a platform | "Resize to 1200×628 pixels" |
| Crop for Instagram | "Crop to 1:1 square" |
| Crop for Stories | "Crop to 9:16 ratio" |
| Convert format | "Convert to WebP at 85% quality" |
| Rotate | "Rotate 90 degrees clockwise" |
| Black and white | "Make this grayscale" |
| Blur | "Apply a moderate blur" |

---

*O NanoImage é um kit de ferramentas de edição de imagens gratuito baseado no navegador com 13 ferramentas disponíveis em [nanoimage.net](https://nanoimage.net) — sem conta, sem upload, sem rastreamento.*
`;
