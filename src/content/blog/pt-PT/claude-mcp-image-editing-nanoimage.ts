export const content = `
# Como Editar Imagens Diretamente no Claude — Guia de Integração NanoImage MCP

Se alguma vez esteve no meio de uma conversa com o Claude e precisou de comprimir rapidamente uma imagem, redimensioná-la para o Instagram ou converter um PNG para WebP — conhece o atrito. Para, abre outro separador, carrega o ficheiro, espera, transfere, volta.

Isso agora é opcional. O NanoImage funciona como um servidor MCP (Model Context Protocol) gratuito em \`mcp.nanoimage.net\`, o que significa que o Claude pode processar as suas imagens diretamente na conversa — sem trocar de separador, sem carregamentos para servidores de terceiros.

Este guia mostra exatamente como conectar e o que pode fazer com isso.

---

## O Que É MCP?

MCP (Model Context Protocol) é um padrão aberto que permite ao Claude se conectar a ferramentas e serviços externos. Depois de adicionar um servidor MCP às suas definições do Claude, o Claude pode chamá-lo automaticamente quando pedir algo que ele trata.

Pense nisso como dar ao Claude um novo conjunto de mãos — neste caso, mãos que podem manipular ficheiros de imagem.

---

## O Que o NanoImage MCP Pode Fazer

Depois de conectado, pode pedir ao Claude coisas como:

- *"Comprima esta imagem para menos de 200KB"*
- *"Redimensione esta foto para 1080×1080 píxeis"*
- *"Recorte esta para uma proporção 16:9"*
- *"Converta este PNG para WebP"*
- *"Rode esta imagem 90 graus"*
- *"Transforme esta foto em preto e branco"*
- *"Desfoque esta imagem"*
- *"Quais são as dimensões e o tamanho do ficheiro desta imagem?"*

O Claude chamará a ferramenta certa automaticamente com base no que pedir. Não precisa saber qual ferramenta usar — apenas descreva o que pretende.

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

1. Abra [claude.ai](https://claude.ai) e vá a **Definições**
2. Clique em **Integrações** no menu à esquerda
3. Clique em **Adicionar Integração** → seleccione **MCP Server**
4. Preencha:
   - **Nome:** NanoImage
   - **URL:** https://mcp.nanoimage.net/mcp
5. Clique em **Guardar**
6. Inicie uma nova conversa — as ferramentas do NanoImage estarão disponíveis imediatamente

> As integrações MCP estão disponíveis nos planos Claude Pro e Team. Se não vê o menu Integrações, use a Opção B abaixo.

---

### Opção B: Claude Desktop (macOS / Windows)

Edite o ficheiro de configuração do Claude Desktop:

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

Guarde e **reinicie completamente o Claude Desktop**. O NanoImage aparecerá nas ferramentas disponíveis.

**Se a sua versão ainda não suporta MCP remoto**, use o proxy mcp-remote (requer Node.js):

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

## Experimentar

Depois de conectado, carregue uma imagem para o Claude e experimente estes prompts:

**Teste rápido:**
> *"Quais são as dimensões e o tamanho do ficheiro desta imagem?"*

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
- As imagens são processadas na memória e devolvidas imediatamente
- **Nenhuma imagem é armazenada** após o processamento
- Não é necessária conta ou início de sessão
- Hospedado em **Cloudflare Workers** (rede global de borda)

---

## Limites de Taxa

O NanoImage MCP é gratuito e público. Um limite de **20 pedidos por minuto por IP** é aplicado para evitar abuso. O uso normal do Claude (algumas chamadas de ferramenta por conversa) nunca atingirá este limite.

---

## Resolução de Problemas

**O Claude não está a chamar as ferramentas do NanoImage automaticamente**
Certifique-se de que carregou uma imagem na conversa. O Claude precisa de entrada de imagem para acionar as ferramentas de imagem.

**Vejo um erro 429**
Atingiu o limite de taxa. Aguarde 60 segundos e tente novamente.

**As ferramentas não aparecem após guardar a configuração**
Para o Claude Desktop, feche completamente e reabra a aplicação. Para o Claude.ai, inicie uma nova conversa.

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

*O NanoImage é um kit de ferramentas de edição de imagens gratuito baseado no navegador com 13 ferramentas disponíveis em [nanoimage.net](https://nanoimage.net) — sem conta, sem carregamento, sem rastreamento.*
`;
