export const content = `
# Cómo Editar Imágenes Directamente en Claude — Guía de Integración NanoImage MCP

Si alguna vez has estado en medio de una conversación con Claude y has necesitado comprimir rápidamente una imagen, redimensionarla para Instagram o convertir un PNG a WebP — conoces la fricción. Paras, abres otra pestaña, subes el archivo, esperas, descargas, vuelves.

Eso ahora es opcional. NanoImage funciona como un servidor MCP (Model Context Protocol) gratuito en \`mcp.nanoimage.net\`, lo que significa que Claude puede procesar tus imágenes directamente en la conversación — sin cambiar de pestaña, sin subidas a servidores de terceros.

Esta guía te muestra exactamente cómo conectarlo y qué puedes hacer con él.

---

## ¿Qué Es MCP?

MCP (Model Context Protocol) es un estándar abierto que permite a Claude conectarse a herramientas y servicios externos. Una vez que añades un servidor MCP a la configuración de Claude, Claude puede llamarlo automáticamente cuando pidas algo que maneja.

Piénsalo como darle a Claude un nuevo conjunto de manos — en este caso, manos que pueden manipular archivos de imagen.

---

## Qué Puede Hacer NanoImage MCP

Una vez conectado, puedes pedirle a Claude cosas como:

- *"Comprime esta imagen a menos de 200KB"*
- *"Redimensiona esta foto a 1080×1080 píxeles"*
- *"Recorta esto a una proporción 16:9"*
- *"Convierte este PNG a WebP"*
- *"Rota esta imagen 90 grados"*
- *"Convierte esta foto a blanco y negro"*
- *"Desenfoca esta imagen"*
- *"¿Cuáles son las dimensiones y el tamaño del archivo de esta imagen?"*

Claude llamará a la herramienta correcta automáticamente según lo que pidas. No necesitas saber qué herramienta usar — solo describe lo que quieres.

**Herramientas disponibles (v1.1):**

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

## Cómo Conectar NanoImage a Claude

### Opción A: Claude.ai (Web / Móvil) — Más Fácil

Claude.ai soporta servidores MCP remotos de forma nativa. No se requiere instalación.

1. Abre [claude.ai](https://claude.ai) y ve a **Configuración**
2. Haz clic en **Integraciones** en el menú de la izquierda
3. Haz clic en **Añadir Integración** → selecciona **MCP Server**
4. Rellena:
   - **Nombre:** NanoImage
   - **URL:** https://mcp.nanoimage.net/mcp
5. Haz clic en **Guardar**
6. Inicia una nueva conversación — las herramientas de NanoImage estarán disponibles inmediatamente

> Las integraciones MCP están disponibles en los planes Claude Pro y Team. Si no ves el menú Integraciones, usa la Opción B a continuación.

---

### Opción B: Claude Desktop (macOS / Windows)

Edita tu archivo de configuración de Claude Desktop:

- **macOS:** ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows:** %APPDATA%\\Claude\\claude_desktop_config.json

Añade o fusiona lo siguiente:

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "url": "https://mcp.nanoimage.net/mcp"
    }
  }
}
\`\`\`

Guarda y **reinicia completamente Claude Desktop**. NanoImage aparecerá en las herramientas disponibles.

**Si tu versión aún no soporta MCP remoto**, usa el proxy mcp-remote (requiere Node.js):

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

## Probar

Una vez conectado, sube una imagen a Claude y prueba estos prompts:

**Prueba rápida:**
> *"¿Cuáles son las dimensiones y el tamaño del archivo de esta imagen?"*

**Comprimir para web:**
> *"Comprime esta imagen a menos de 150KB, mantén el formato JPG"*

**Preparar para Instagram:**
> *"Recorta esto a un cuadrado 1:1, luego comprime a menos de 1MB"*

Claude encadenará las dos llamadas a herramientas automáticamente — recorte primero, luego compresión.

**Convertir formato:**
> *"Convierte este PNG a WebP al 85% de calidad"*

---

## Privacidad

- Las imágenes se envían por **HTTPS** (cifradas en tránsito)
- Las imágenes se procesan en memoria y se devuelven inmediatamente
- **No se almacenan imágenes** después del procesamiento
- No se requiere cuenta ni inicio de sesión
- Hospedado en **Cloudflare Workers** (red global edge)

---

## Límites de Tasa

NanoImage MCP es gratuito y público. Se aplica un límite de **20 solicitudes por minuto por IP** para evitar abusos. El uso normal de Claude (unas pocas llamadas a herramientas por conversación) nunca alcanzará este límite.

---

## Solución de Problemas

**Claude no llama automáticamente a las herramientas de NanoImage**
Asegúrate de haber subido una imagen en la conversación. Claude necesita entrada de imagen para activar las herramientas de imagen.

**Veo un error 429**
Has alcanzado el límite de tasa. Espera 60 segundos e inténtalo de nuevo.

**Las herramientas no aparecen después de guardar la configuración**
Para Claude Desktop, cierra completamente y vuelve a abrir la aplicación. Para Claude.ai, inicia una nueva conversación.

---

## Referencia Rápida

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

*NanoImage es un kit de herramientas de edición de imágenes gratuito basado en navegador con 13 herramientas disponibles en [nanoimage.net](https://nanoimage.net) — sin cuenta, sin subida, sin seguimiento.*
`;
