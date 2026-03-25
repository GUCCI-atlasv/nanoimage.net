export const content = `
# How to Edit Images Directly in Claude — NanoImage MCP Integration Guide

If you've ever been in the middle of a Claude conversation and needed to quickly compress an image, resize it for Instagram, or convert a PNG to WebP — you know the friction. You stop, open another tab, upload the file, wait, download, come back.

That's now optional. NanoImage runs as a free MCP (Model Context Protocol) server at \`mcp.nanoimage.net\`, which means Claude can process your images directly inside the conversation — no tab switching, no uploads to third-party servers.

This guide shows you exactly how to connect it and what you can do with it.

---

## What Is MCP?

MCP (Model Context Protocol) is an open standard that lets Claude connect to external tools and services. Once you add an MCP server to your Claude settings, Claude can call it automatically when you ask for something it handles.

Think of it like giving Claude a new set of hands — in this case, hands that can manipulate image files.

---

## What NanoImage MCP Can Do

Once connected, you can ask Claude things like:

- *"Compress this image to under 200KB"*
- *"Resize this photo to 1080×1080 pixels"*
- *"Crop this to a 16:9 aspect ratio"*
- *"Convert this PNG to WebP"*
- *"Rotate this image 90 degrees"*
- *"Make this photo black and white"*
- *"Blur this image"*
- *"What are the dimensions and file size of this image?"*

Claude will call the right tool automatically based on what you ask. No need to know which tool to use — just describe what you want.

**Available tools (v1.1):**

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

## How to Connect NanoImage to Claude

### Option A: Claude.ai (Web / Mobile) — Easiest

Claude.ai supports remote MCP servers natively. No installation required.

1. Open [claude.ai](https://claude.ai) and go to **Settings**
2. Click **Integrations** in the left menu
3. Click **Add Integration** → select **MCP Server**
4. Fill in:
   - **Name:** NanoImage
   - **URL:** https://mcp.nanoimage.net/mcp
5. Click **Save**
6. Start a new conversation — NanoImage tools will be available immediately

> MCP integrations are available on Claude Pro and Team plans. If you don't see the Integrations menu, use Option B below.

---

### Option B: Claude Desktop (macOS / Windows)

Edit your Claude Desktop config file:

- **macOS:** ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows:** %APPDATA%\\Claude\\claude_desktop_config.json

Add or merge the following:

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "url": "https://mcp.nanoimage.net/mcp"
    }
  }
}
\`\`\`

Save and **fully restart Claude Desktop**. NanoImage will appear in the available tools.

**If your version doesn't support remote MCP yet**, use the mcp-remote proxy (requires Node.js):

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

## Trying It Out

Once connected, upload an image to Claude and try these prompts:

**Quick test:**
> *"What are the dimensions and file size of this image?"*

**Compress for web:**
> *"Compress this image to under 150KB, keep it as JPG"*

**Prepare for Instagram:**
> *"Crop this to a 1:1 square, then compress it to under 1MB"*

Claude will chain the two tool calls automatically — crop first, then compress.

**Convert format:**
> *"Convert this PNG to WebP at 85% quality"*

---

## Privacy

- Images are sent over **HTTPS** (encrypted in transit)
- Images are processed in memory and returned immediately
- **No images are stored** after processing
- No account or login required
- Hosted on **Cloudflare Workers** (global edge network)

---

## Rate Limits

NanoImage MCP is free and public. A limit of **20 requests per minute per IP** is enforced to prevent abuse. Normal Claude usage (a few tool calls per conversation) will never hit this limit.

---

## Troubleshooting

**Claude isn't calling NanoImage tools automatically**
Make sure you've uploaded an image in the conversation. Claude needs image input to trigger image tools.

**I see a 429 error**
You've hit the rate limit. Wait 60 seconds and try again.

**Tools aren't showing up after saving config**
For Claude Desktop, fully quit and reopen the app. For Claude.ai, start a fresh conversation.

---

## Quick Reference

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

*NanoImage is a free browser-based image editing toolkit with 13 tools available at [nanoimage.net](https://nanoimage.net) — no account, no upload, no tracking.*
`;
