# ai.nanoimage.net → nanoimage.net 合并说明（2026-07-07）

## 合并结论

ai.nanoimage.net 的 5 个工具全部并入主站，子域整站 301 到主域。理由：主站权重可以吸收 AI 工具页的内容增量；消除两个 host 之间的关键词自蚕食（upscale、background 两组词）；两站的核心卖点本来就是同一个——零上传、纯浏览器、免费。

## 5 个工具的去向

| ai.nanoimage.net 原页面 | 合并后主站地址 | 所属分类 | 处理方式 |
|---|---|---|---|
| /background-remover | /background-remover | **AI tools（新分类）** | 原样迁移。RMBG-1.4 模型（~168MB）浏览器端推理，transformers.js + WebGPU/WASM |
| /object-remover | /object-remover | **AI tools** | 原样迁移。画笔遮罩 + 智能边缘填充 |
| /photo-restore | /photo-restore | **AI tools** | 原样迁移。修复 + 黑白上色 |
| /smart-crop | /smart-crop | **AI tools** | 原样迁移。Sobel 能量自动裁剪 + MediaPipe 人像虚化（wasm 已复制到 public/wasm） |
| /image-upscaler | /upscale-image（原有页面） | Optimize images | **引擎替换**：AI 站的多级 1.6× 双线性 + 自适应锐化引擎更好，直接替换了主站原来的单次 bicubic 实现。URL 沿用主站原地址（保住已有排名），不新增页面 |

为什么 upscaler 不进 AI tools 分类：它其实不是模型推理（无模型下载，纯 Canvas 多级算法），且主站 /upscale-image 已有排名和外链——保留原 URL、升级引擎是 SEO 最优解。AI tools 分类 hub（/tools/ai-tools）里仍把它列为推荐场景之一。

## 定位文案改动（"反 AI" → "反上传"）

品牌承诺从 "No AI" 收窄为核心的 "No Upload"——端侧 AI 不违背隐私承诺：

- 首页 H1（en）：~~The image tools that don't need AI.~~ → **The image tools that don't need your upload. Not even the AI ones.**
- 首页 H1（zh-CN）：**不需要上传的图片工具。连 AI 工具也不例外。**
- 首页副标题：26 → 30 款工具，新增 "including on-device AI / 包括端侧 AI"（9 种语言全部更新）
- meta title（全语言）：去掉 "No AI"，工具数 26 → 30（lib/server-i18n.ts HOME_META、app/(en)/page.tsx、app/(en)/layout.tsx、llms.txt）
- 首页对比表列名："AI Image Sites" → "Cloud AI Sites"（对比对象明确为"云端 AI 站"）

## 代码改动清单

**主站（根项目）**
- `src/ai/` 新目录：apps/ai 的 lib（7 个）、components（4 个）、tools（5 个组件）、ai-tools.css（去掉 shell/header 样式，`.tool-hero` 重命名 `.ai-tool-hero` 避免冲突）
- `src/app-pages/ai-tools.tsx`：4 个 AI 工具的页面包装（面包屑 + hero + 工具组件）
- `src/app-pages/tool-page.tsx`：新增 AI_TOOL_SLUGS 分发（懒加载，模型运行时不影响非 AI 页面）；/upscale-image 处理分支替换为 `upscaleToCanvasSync`
- `src/ai/lib/imageUpscaler.ts`：新增同步版 `upscaleToCanvasSync`（精确目标尺寸）
- `src/data.ts`：新分类 `ai-tools` + 4 个工具条目
- `src/i18n/en.ts`：分类/工具名/描述 + 4 组 FAQ；`zh-CN.ts`：分类与工具中文名；其余 7 语言更新 hero 数字（工具名回退英文）
- `src/shared/tool-icons.tsx`：新分类与工具图标
- `src/category-hub-i18n/`：types 加 `ai-tools`，en-pages 加完整 hub 内容（其他语言自动回退英文）
- `lib/category-hub.ts`：banner（暂复用 edit-images.png，可后补专属图）+ 相关分类 + 博客引用
- `next.config.ts`：webpack fallback（fs/path/crypto 置 false，transformers.js 静态导出所需）
- `package.json`：新增 `@huggingface/transformers`、`@mediapipe/tasks-vision`
- `public/wasm/`：MediaPipe vision wasm（6 个文件，人像虚化用）
- `public/sitemap.xml`：新增 45 条 URL（4 工具 + /tools/ai-tools × 9 语言）

**AI 站（apps/ai）**
- `public/_redirects` 与新目录 `redirects-only/`：逐页 301 绝对地址 → 主域（含 /image-upscaler → /upscale-image，兜底 /* → /tools/ai-tools）
- `package.json`：`npm run deploy` 现在只部署 redirects-only（纯 301，旧页面全部下线）；旧部署改名 `deploy:legacy-site`

## 已验证 / 待你本机执行

- ✅ 全项目 `tsc --noEmit` 通过（0 错误）
- ⚠️ 沙箱无法跑完整 `next build`（进程时限），请在本机执行：
  1. `rm -rf node_modules && npm install`（沙箱曾向 node_modules 写入过不完整的 Linux 二进制，重装最稳妥）
  2. `npm run build` 确认 550+ 页面静态导出成功，抽查 /background-remover、/upscale-image、/tools/ai-tools
  3. 先 `npm run deploy`（主站），确认新页面上线后再到 apps/ai 执行 `npm run deploy`（切 301）
- 上线后：Google Search Console 里为 ai.nanoimage.net 保留属性观察 301 收录迁移，2–3 个月内旧页面会逐步移交权重

## 后续可选优化

- 为 AI tools 分类做专属 banner 图（现复用 edit-images.png）
- 4 个 AI 工具的 FAQ/工具名补 zh 之外的语言翻译
- /upscale-image 的 FAQ 里 "Is this an AI image upscaler? No." 的表述仍然诚实成立（新引擎也非生成式），但可补一句"多级重采样引擎已升级"
