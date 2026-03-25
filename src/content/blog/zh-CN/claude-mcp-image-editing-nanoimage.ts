export const content = `
# 如何在 Claude 中直接编辑图片 — NanoImage MCP 集成指南

如果你曾在与 Claude 对话时，需要快速「压缩」图片、为 Instagram「调整大小」，或将 PNG「转换」为 WebP，你一定体会过那种打断感：停下对话、打开新标签页、上传文件、等待、下载、再回来。

现在可以省去这些步骤。NanoImage 作为免费的 MCP（Model Context Protocol）服务器运行于 \`mcp.nanoimage.net\`，这意味着 Claude 可以直接在对话中处理你的图片——无需切换标签页，也无需上传到第三方服务器。

本指南将说明如何连接以及你可以用它做什么。

---

## 什么是 MCP？

MCP（Model Context Protocol）是一种开放标准，让 Claude 能够连接外部工具和服务。一旦你在 Claude 设置中添加 MCP 服务器，当你提出它支持的需求时，Claude 就会自动调用它。

可以把它理解为给 Claude 一双新「手」——在这里，是能处理图片文件的「手」。

---

## NanoImage MCP 能做什么

连接后，你可以这样向 Claude 提问：

- *「把这张图片「压缩」到 200KB 以下」*
- *「把这张照片「调整大小」到 1080×1080 像素」*
- *「「裁剪」成 16:9 比例」*
- *「把这个 PNG「转换」成 WebP」*
- *「「旋转」这张图片 90 度」*
- *「把这张照片变成黑白（「灰度」）」*
- *「「模糊」这张图片」*
- *「这张图片的尺寸和文件大小是多少？」*

Claude 会根据你的描述自动调用对应工具。你不需要知道该用哪个工具——只要说出你想要的效果即可。

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

## 如何将 NanoImage 连接到 Claude

### 方式 A：Claude.ai（网页 / 手机）— 最简单

Claude.ai 原生支持远程 MCP 服务器，无需安装。

1. 打开 [claude.ai](https://claude.ai)，进入 **Settings**
2. 点击左侧菜单中的 **Integrations**
3. 点击 **Add Integration** → 选择 **MCP Server**
4. 填写：
   - **Name:** NanoImage
   - **URL:** https://mcp.nanoimage.net/mcp
5. 点击 **Save**
6. 开始新对话——NanoImage 工具会立即可用

> MCP 集成在 Claude Pro 和 Team 计划中可用。如果看不到 Integrations 菜单，请使用下面的方式 B。

---

### 方式 B：Claude Desktop（macOS / Windows）

编辑 Claude Desktop 配置文件：

- **macOS：** ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows：** %APPDATA%\\Claude\\claude_desktop_config.json

添加或合并以下内容：

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "url": "https://mcp.nanoimage.net/mcp"
    }
  }
}
\`\`\`

保存后**完全重启 Claude Desktop**。NanoImage 会出现在可用工具中。

**若你的版本尚不支持远程 MCP**，可使用 mcp-remote 代理（需要 Node.js）：

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

## 试试看

连接后，向 Claude 上传一张图片，并尝试以下提示：

**快速测试：**
> *「这张图片的尺寸和文件大小是多少？」*

**为网页压缩：**
> *「把这张图片压缩到 150KB 以下，保持 JPG 格式」*

**为 Instagram、微信或微博准备：**
> *「裁剪成 1:1 正方形，再压缩到 1MB 以下」*

Claude 会自动依次调用两个工具——先裁剪，再压缩。

**格式转换：**
> *「把这个 PNG 以 85% 质量转换为 WebP」*

---

## 隐私

- 图片通过 **HTTPS** 传输（传输中加密）
- 图片在内存中处理并立即返回
- 处理完成后**不保存任何图片**
- 无需账号或登录
- 托管于 **Cloudflare Workers**（全球边缘网络）

---

## 速率限制

NanoImage MCP 免费公开使用。为防止滥用，限制为**每个 IP 每分钟 20 次请求**。正常使用 Claude（每次对话几次工具调用）不会触及此限制。

---

## 故障排除

**Claude 没有自动调用 NanoImage 工具**
请确认你已在对话中上传图片。Claude 需要图片输入才会触发图片相关工具。

**出现 429 错误**
已触发速率限制。请等待 60 秒后重试。

**保存配置后工具未出现**
Claude Desktop：完全退出并重新打开应用。Claude.ai：开始新对话。

---

## 快速参考

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

*NanoImage 是 [nanoimage.net](https://nanoimage.net) 提供的免费浏览器端图片编辑工具集，包含 13 个工具——无需账号、无需上传、无追踪。*
`;
