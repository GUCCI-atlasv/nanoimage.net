export const content = `
# 如何在 Claude 中直接編輯圖片 — NanoImage MCP 整合指南

如果你曾在與 Claude 對話時，需要快速「壓縮」圖片、為 Instagram「調整大小」，或將 PNG「轉換」為 WebP，你一定體會過那種打斷感：停下對話、開啟新分頁、上傳檔案、等待、下載、再回來。

現在可以省去這些步驟。NanoImage 作為免費的 MCP（Model Context Protocol）伺服器運行於 \`mcp.nanoimage.net\`，這意味著 Claude 可以直接在對話中處理你的圖片——無需切換分頁，也無需上傳到第三方伺服器。

本指南將說明如何連接以及你可以用它做什麼。

---

## 什麼是 MCP？

MCP（Model Context Protocol）是一種開放標準，讓 Claude 能夠連接外部工具和服務。一旦你在 Claude 設定中加入 MCP 伺服器，當你提出它支援的需求時，Claude 就會自動呼叫它。

可以把它理解為給 Claude 一雙新「手」——在這裡，是能處理圖片檔案的「手」。

---

## NanoImage MCP 能做什麼

連接後，你可以這樣向 Claude 提問：

- *「把這張圖片「壓縮」到 200KB 以下」*
- *「把這張照片「調整大小」到 1080×1080 像素」*
- *「「裁剪」成 16:9 比例」*
- *「把這個 PNG「轉換」成 WebP」*
- *「「旋轉」這張圖片 90 度」*
- *「把這張照片變成黑白（「灰階」）」*
- *「「模糊」這張圖片」*
- *「這張圖片的尺寸和檔案大小是多少？」*

Claude 會根據你的描述自動呼叫對應工具。你不需要知道該用哪個工具——只要說出你想要的效果即可。

**可用工具（v1.1）：**

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

## 如何將 NanoImage 連接到 Claude

### 方式 A：Claude.ai（網頁 / 手機）— 最簡單

Claude.ai 原生支援遠端 MCP 伺服器，無需安裝。

1. 開啟 [claude.ai](https://claude.ai)，進入 **Settings**
2. 點擊左側選單中的 **Integrations**
3. 點擊 **Add Integration** → 選擇 **MCP Server**
4. 填寫：
   - **Name:** NanoImage
   - **URL:** https://mcp.nanoimage.net/mcp
5. 點擊 **Save**
6. 開始新對話——NanoImage 工具會立即可用

> MCP 整合在 Claude Pro 和 Team 方案中可用。如果看不到 Integrations 選單，請使用下面的方式 B。

---

### 方式 B：Claude Desktop（macOS / Windows）

編輯 Claude Desktop 設定檔：

- **macOS：** ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows：** %APPDATA%\\Claude\\claude_desktop_config.json

加入或合併以下內容：

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "url": "https://mcp.nanoimage.net/mcp"
    }
  }
}
\`\`\`

儲存後**完全重新啟動 Claude Desktop**。NanoImage 會出現在可用工具中。

**若你的版本尚不支援遠端 MCP**，可使用 mcp-remote 代理（需要 Node.js）：

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

## 試試看

連接後，向 Claude 上傳一張圖片，並嘗試以下提示：

**快速測試：**
> *「這張圖片的尺寸和檔案大小是多少？」*

**為網頁壓縮：**
> *「把這張圖片壓縮到 150KB 以下，保持 JPG 格式」*

**為 Instagram 準備：**
> *「裁剪成 1:1 正方形，再壓縮到 1MB 以下」*

Claude 會自動依序呼叫兩個工具——先裁剪，再壓縮。

**格式轉換：**
> *「把這個 PNG 以 85% 品質轉換為 WebP」*

---

## 隱私

- 圖片透過 **HTTPS** 傳輸（傳輸中加密）
- 圖片在記憶體中處理並立即回傳
- 處理完成後**不儲存任何圖片**
- 無需帳號或登入
- 託管於 **Cloudflare Workers**（全球邊緣網路）

---

## 速率限制

NanoImage MCP 免費公開使用。為防止濫用，限制為**每個 IP 每分鐘 20 次請求**。正常使用 Claude（每次對話幾次工具呼叫）不會觸及此限制。

---

## 故障排除

**Claude 沒有自動呼叫 NanoImage 工具**
請確認你已在對話中上傳圖片。Claude 需要圖片輸入才會觸發圖片相關工具。

**出現 429 錯誤**
已觸發速率限制。請等待 60 秒後重試。

**儲存設定後工具未出現**
Claude Desktop：完全結束並重新開啟應用程式。Claude.ai：開始新對話。

---

## 快速參考

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

*NanoImage 是 [nanoimage.net](https://nanoimage.net) 提供的免費瀏覽器端圖片編輯工具集，包含 13 個工具——無需帳號、無需上傳、無追蹤。*
`;
