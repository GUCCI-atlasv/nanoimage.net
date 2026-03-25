export const content = `
# Claude内で直接画像を編集する方法 — NanoImage MCP連携ガイド

Claudeとの会話の途中で、画像を素早く圧縮したり、Instagram用にリサイズしたり、PNGをWebPに変換したりする必要があった経験はありませんか？その手間はよくわかります。会話を止めて、別タブを開き、ファイルをアップロードし、待って、ダウンロードして、戻ってくる——そんな作業が不要になります。

NanoImageは \`mcp.nanoimage.net\` で無料のMCP（Model Context Protocol）サーバーとして動作しており、Claudeが会話内で直接画像を処理できるようになります。タブの切り替えも、サードパーティサーバーへのアップロードも不要です。

このガイドでは、接続方法とできることのすべてを説明します。

---

## MCPとは？

MCP（Model Context Protocol）は、Claudeが外部ツールやサービスに接続できるようにするオープン標準です。Claudeの設定にMCPサーバーを追加すると、対応する処理を依頼したときにClaudeが自動的に呼び出します。

Claudeに新しい「手」を与えるようなものです——この場合、画像ファイルを操作できる手です。

---

## NanoImage MCPでできること

接続後、次のような依頼ができます：

- *「この画像を200KB以下に圧縮して」*
- *「この写真を1080×1080ピクセルにリサイズして」*
- *「16:9のアスペクト比にクロップして」*
- *「このPNGをWebPに変換して」*
- *「この画像を90度回転して」*
- *「この写真を白黒にして」*
- *「この画像をぼかして」*
- *「この画像のサイズとファイル容量は？」*

Claudeは依頼内容に応じて適切なツールを自動的に呼び出します。どのツールを使うか知る必要はありません——やりたいことを伝えるだけです。

**利用可能なツール（v1.1）：**

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

## NanoImageをClaudeに接続する方法

### 方法A：Claude.ai（Web / モバイル）— 最も簡単

Claude.aiはリモートMCPサーバーをネイティブでサポートしています。インストールは不要です。

1. [claude.ai](https://claude.ai) を開き、**Settings** に移動
2. 左メニューで **Integrations** をクリック
3. **Add Integration** → **MCP Server** を選択
4. 以下を入力：
   - **Name:** NanoImage
   - **URL:** https://mcp.nanoimage.net/mcp
5. **Save** をクリック
6. 新しい会話を開始——NanoImageのツールがすぐに利用可能になります

> MCP連携はClaude ProおよびTeamプランで利用可能です。Integrationsメニューが表示されない場合は、以下の方法Bをご利用ください。

---

### 方法B：Claude Desktop（macOS / Windows）

Claude Desktopの設定ファイルを編集します：

- **macOS:** ~/Library/Application Support/Claude/claude_desktop_config.json
- **Windows:** %APPDATA%\\Claude\\claude_desktop_config.json

以下を追加またはマージしてください：

\`\`\`json
{
  "mcpServers": {
    "nanoimage": {
      "url": "https://mcp.nanoimage.net/mcp"
    }
  }
}
\`\`\`

保存し、**Claude Desktopを完全に再起動**してください。NanoImageが利用可能なツールに表示されます。

**リモートMCPをまだサポートしていないバージョン**の場合は、mcp-remoteプロキシを使用してください（Node.jsが必要）：

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

## 試してみる

接続後、Claudeに画像をアップロードして、次のプロンプトを試してみてください：

**クイックテスト：**
> *「この画像のサイズとファイル容量は？」*

**Web用に圧縮：**
> *「この画像を150KB以下に圧縮して、JPGのままにして」*

**Instagram用に準備：**
> *「1:1の正方形にクロップして、1MB以下に圧縮して」*

Claudeは2つのツール呼び出しを自動的に連鎖させます——まずクロップ、次に圧縮。

**フォーマット変換：**
> *「このPNGを85%品質でWebPに変換して」*

---

## プライバシー

- 画像は **HTTPS** で送信されます（転送中は暗号化）
- 画像はメモリ内で処理され、すぐに返されます
- 処理後 **画像は保存されません**
- アカウントやログインは不要です
- **Cloudflare Workers** でホスト（グローバルエッジネットワーク）

---

## レート制限

NanoImage MCPは無料で公開されています。悪用防止のため、**IPあたり1分間に20リクエスト**の制限があります。通常のClaude利用（会話あたり数回のツール呼び出し）では、この制限に達することはありません。

---

## トラブルシューティング

**ClaudeがNanoImageのツールを自動的に呼び出さない**
会話に画像をアップロードしたか確認してください。Claudeは画像ツールを起動するために画像入力が必要です。

**429エラーが表示される**
レート制限に達しました。60秒待ってから再試行してください。

**設定保存後にツールが表示されない**
Claude Desktopの場合は、アプリを完全に終了してから再度開いてください。Claude.aiの場合は、新しい会話を開始してください。

---

## クイックリファレンス

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

*NanoImageは [nanoimage.net](https://nanoimage.net) で利用できる13のツールを備えた無料のブラウザベース画像編集ツールキットです——アカウント不要、アップロード不要、トラッキングなし。*
`;
