/**
 * Copy for the "static" tools synced from production (2026-10):
 *   gif-compressor, png-to-webp, jpg-to-webp, jpg-to-bmp
 *
 * Only English and Simplified Chinese are authored (matches production). Every
 * other locale falls back to the English copy.
 *
 * Rich-text mini markup used in strings (see rich-text.tsx):
 *   **bold**   `code`   [label](/tool-path)   — paths are locale-prefixed at render
 *   time, except /blog/* (blog posts are English-only).
 *
 * FAQ strings are also consumed (as plain text) by src/i18n/{en,zh-CN}.ts so the
 * FAQPage JSON-LD stays identical to the visible H2 blocks.
 */

export type StaticToolSlug = 'gif-compressor' | 'png-to-webp' | 'jpg-to-webp' | 'jpg-to-bmp'

export const STATIC_TOOL_SLUGS: ReadonlySet<string> = new Set<StaticToolSlug>([
  'gif-compressor',
  'png-to-webp',
  'jpg-to-webp',
  'jpg-to-bmp',
])

export function isStaticToolSlug(slug: string): slug is StaticToolSlug {
  return STATIC_TOOL_SLUGS.has(slug)
}

export type StaticToolFaq = { q: string; a: string }

export type StaticToolCopy = {
  h1: string
  intro: string
  badges: [string, string, string, string]
  faqs: StaticToolFaq[]
  relatedTitle: string
  related: { path: string; label: string }[]
  guide?: { lead: string; path: string; label: string }
}

export type StaticCopyLang = 'en' | 'zh'

const BADGES_EN: StaticToolCopy['badges'] = ['100% free', 'No signup', 'No upload', 'Local in browser']
const BADGES_ZH: StaticToolCopy['badges'] = ['免费', '无需注册', '不上传', '浏览器本地']

export const STATIC_TOOL_COPY: Record<StaticCopyLang, Record<StaticToolSlug, StaticToolCopy>> = {
  en: {
    'gif-compressor': {
      h1: 'GIF Compressor — Compress GIF to 10MB Locally, No Upload',
      intro:
        'A **GIF compressor** reduces animated GIF file size so the clip still plays but fits platform limits. NanoImage compresses GIFs **locally in your browser**—adjust quality, dimensions, frame skip, and color palette, or use presets like Discord / 10MB / 5MB / 512KB. **Nothing is uploaded**; free, no account. Need to *create* a GIF from images instead? Use our separate [GIF Maker](/gif-maker).',
      badges: BADGES_EN,
      faqs: [
        {
          q: 'How do I compress a GIF without uploading it?',
          a: 'Drop your GIF into the tool above. Processing stays in your browser—nothing is sent to a server. You can verify in DevTools that requests do not upload the file.',
        },
        {
          q: 'How do I compress a GIF to 10MB (or Discord / 5MB / 512KB)?',
          a: 'Choose a target-size preset: Discord (~8MB), 10MB, 5MB, 512KB, or 256KB. The compressor lowers colors, scale, and frame density until the file fits—ideal when you need a gif compressor to 10mb for email, CMS, or upload caps. Exact Discord limits depend on your Nitro tier—use the preset that matches your cap.',
        },
        {
          q: 'GIF compressor vs GIF maker — what’s the difference?',
          a: 'GIF Maker turns still images into a new animated GIF. GIF Compressor takes an existing GIF and shrinks it. They are separate tools—use [GIF Maker](/gif-maker) to create, then come back here to optimize.',
        },
        {
          q: 'What settings shrink a GIF the most (quality, frames, palette, size)?',
          a: 'Biggest wins usually come from: reducing canvas scale, skipping frames, and lowering the color palette (64 or 32). Preview before/after size in the panel.',
        },
        {
          q: 'Is a local GIF compressor safer than FreeConvert / Ezgif / iLoveIMG?',
          a: 'Upload-based tools send your file to a remote server. NanoImage emphasizes local processing and one-click size walls (Discord / KB / MB presets), so private clips never leave your device.',
        },
      ],
      relatedTitle: 'Related tools',
      related: [
        { path: '/gif-maker', label: 'GIF Maker' },
        { path: '/blur-image', label: 'Blur Image' },
        { path: '/change-color', label: 'Change Color' },
      ],
      guide: {
        lead: 'Related guide:',
        path: '/blog/how-to-resize-and-crop-a-gif',
        label: 'How to resize and crop a GIF without breaking the animation',
      },
    },
    'png-to-webp': {
      h1: 'PNG to WebP Converter — Free & Local',
      intro:
        '**PNG to WebP** shrinks transparent or photographic PNGs into smaller WebP files for the web. NanoImage converts PNG→WebP **locally in your browser**—batch, quality slider, download as files or ZIP. **Nothing uploads.** Need JPG too? Use [JPG to WebP](/jpg-to-webp) or the all-format [Convert to WebP](/convert-to-webp) hub.',
      badges: BADGES_EN,
      faqs: [
        {
          q: 'How do I convert PNG to WebP without uploading?',
          a: 'Choose PNG files in the tool above. Conversion runs with the Canvas API in your browser—nothing is uploaded to a server. You can confirm in DevTools → Network that the image bytes stay on-device.',
        },
        {
          q: 'Does PNG to WebP keep transparency?',
          a: 'Yes. WebP supports alpha. Transparent PNGs keep their transparency when encoded to WebP in a modern browser. Always preview if you need pixel-perfect edges on UI assets.',
        },
        {
          q: 'PNG to WebP vs JPG to WebP — which should I use?',
          a: 'Use [PNG to WebP](/png-to-webp) for graphics with transparency or flat UI art. Use [JPG to WebP](/jpg-to-webp) for photos. Mixed formats? Use the [Convert to WebP](/convert-to-webp) hub.',
        },
        {
          q: 'How do I batch convert multiple PNGs to WebP?',
          a: 'Add up to 20 PNGs, set the quality slider (often 80–90% for photos, higher for sharp UI), then convert. Download each WebP or grab a ZIP of the batch.',
        },
        {
          q: 'Is a local PNG to WebP converter safer than CloudConvert / online upload tools?',
          a: 'Upload converters send your files to a remote server. NanoImage processes PNG→WebP locally, strips metadata via canvas redraw, and never requires an account—better for private screenshots and product assets.',
        },
      ],
      relatedTitle: 'Related tools',
      related: [
        { path: '/convert-to-webp', label: 'Convert to WebP' },
        { path: '/jpg-to-webp', label: 'JPG to WebP' },
        { path: '/remove-exif', label: 'Remove EXIF' },
        { path: '/jpg-to-bmp', label: 'JPG to BMP' },
      ],
    },
    'jpg-to-webp': {
      h1: 'JPG to WebP Converter — Free & Local',
      intro:
        '**JPG to WebP** (JPEG→WebP) cuts photo file size while keeping visual quality for sites and apps. NanoImage runs the conversion **on-device**—batch JPGs, set quality, download WebP or ZIP. **No upload.** For PNG with transparency use [PNG to WebP](/png-to-webp); for mixed formats use [Convert to WebP](/convert-to-webp).',
      badges: BADGES_EN,
      faqs: [
        {
          q: 'How do I convert JPG to WebP online without uploading?',
          a: 'Drop JPG or JPEG files into the tool. Encoding happens in your browser with Canvas—no server upload. Check Network in DevTools if you want to verify.',
        },
        {
          q: 'Will JPG to WebP reduce quality too much?',
          a: 'Not if you pick a sensible quality (often 80–90%). WebP usually beats JPEG size at similar visual quality. Preview the result before shipping to production.',
        },
        {
          q: 'JPG vs JPEG to WebP — is there a difference?',
          a: 'No meaningful difference. JPG and JPEG are the same format. This page accepts both; `/jpeg-to-webp` redirects here.',
        },
        {
          q: 'How do I convert many JPEGs to WebP at once?',
          a: 'Add up to 20 JPEGs, set quality, convert, then download individually or as a ZIP.',
        },
        {
          q: 'JPG to WebP vs PNG to WebP — when to pick which?',
          a: 'Photos → [JPG to WebP](/jpg-to-webp). Transparency / UI PNGs → [PNG to WebP](/png-to-webp). Both → [Convert to WebP](/convert-to-webp) hub.',
        },
      ],
      relatedTitle: 'Related tools',
      related: [
        { path: '/convert-to-webp', label: 'Convert to WebP' },
        { path: '/png-to-webp', label: 'PNG to WebP' },
        { path: '/remove-exif', label: 'Remove EXIF' },
        { path: '/jpg-to-bmp', label: 'JPG to BMP' },
      ],
    },
    'jpg-to-bmp': {
      h1: 'JPG to BMP Converter — Free & Local',
      intro:
        '**JPG to BMP** (JPEG→BMP) creates an uncompressed Windows Bitmap from your photo — useful for legacy apps, print workflows, and tools that still expect BMP. NanoImage runs the conversion **on-device**: drop JPG/JPEG, convert, download BMP or ZIP. **No upload.** Need smaller web files instead? Try [JPG to WebP](/jpg-to-webp) or [Convert to WebP](/convert-to-webp).',
      badges: BADGES_EN,
      faqs: [
        {
          q: 'How do I convert JPG to BMP online without uploading?',
          a: 'Drop JPG or JPEG files into the tool. Encoding happens in your browser with Canvas plus a local BMP encoder—no server upload. Check Network in DevTools if you want to verify.',
        },
        {
          q: 'Is my JPG private when converting to BMP?',
          a: 'Yes. Files stay on your device. NanoImage does not upload them for this tool—conversion is 100% local in the browser.',
        },
        {
          q: 'JPG vs JPEG to BMP — is there a difference?',
          a: 'No meaningful difference. JPG and JPEG are the same format. This page accepts both (and JFIF); `/jpeg-to-bmp` redirects here.',
        },
        {
          q: 'Will BMP files be larger than my JPG?',
          a: 'Usually yes. BMP here is uncompressed 24-bit, so size grows versus compressed JPEG. That is honest for BMP—not a bug. Use [JPG to WebP](/jpg-to-webp) or [Compress Image](/compress-image) when you need smaller files.',
        },
        {
          q: 'JPG to BMP vs PNG — when should I use which?',
          a: 'Choose BMP when a legacy Windows app, driver, or workflow specifically needs `.bmp`. Prefer PNG when you need lossless compression and broad modern support, or WebP for web delivery. This page only converts JPG/JPEG → BMP (not BMP→JPG, TIFF, or PDF).',
        },
      ],
      relatedTitle: 'Related tools',
      related: [
        { path: '/jpg-to-webp', label: 'JPG to WebP' },
        { path: '/convert-to-webp', label: 'Convert to WebP' },
        { path: '/convert-image', label: 'Convert Image' },
        { path: '/remove-exif', label: 'Remove EXIF' },
      ],
    },
  },

  zh: {
    'gif-compressor': {
      h1: 'GIF 压缩到 10MB — 本地缩小动图，无需上传',
      intro:
        '**GIF 压缩**用于在保持动画可播放的前提下缩小文件，以便通过 Discord 等平台限制。NanoImage 在浏览器本地压缩 GIF：可调质量、尺寸、抽帧与色板，或使用 Discord / 10MB / 5MB / 512KB 等预设。**文件不上传**；免费无账号。若要从多张图片**制作** GIF，请用独立工具 [GIF 制作](/gif-maker)。',
      badges: BADGES_ZH,
      faqs: [
        {
          q: '如何在不上传的情况下压缩 GIF？',
          a: '将 GIF 拖入上方工具即可。处理全程在浏览器本地完成，不会上传到服务器。可在开发者工具中确认没有文件上传请求。',
        },
        {
          q: '如何把 GIF 压缩到 10MB（或 Discord / 5MB / 512KB）？',
          a: '选择目标体积预设：Discord（约 8MB）、10MB、5MB、512KB 或 256KB。工具会自动降低色数、尺寸与帧密度，直到符合目标——适合邮件、CMS 或上传上限要求「GIF 压到 10MB」。Discord 具体限额取决于 Nitro 等级。',
        },
        {
          q: 'GIF 压缩和 GIF 制作有什么区别？',
          a: 'GIF 制作是把多张图片合成动图；GIF 压缩是把已有动图变小。两者是独立工具——先用 [GIF 制作](/gif-maker) 生成，再到这里优化体积。',
        },
        {
          q: '哪些设置最能缩小 GIF（质量、帧数、色板、尺寸）？',
          a: '通常最有效的是：缩小画布比例、抽帧、降低色板（64 或 32）。压缩前后可在面板对比体积。',
        },
        {
          q: '本地 GIF 压缩比上传型网站更安全吗？',
          a: '上传型网站会把文件发到服务器。NanoImage 强调本地处理与一键目标体积（Discord / KB / MB），私密素材不会离开你的设备。',
        },
      ],
      relatedTitle: '相关工具',
      related: [
        { path: '/gif-maker', label: 'GIF 制作' },
        { path: '/blur-image', label: '模糊图片' },
        { path: '/change-color', label: '更换颜色' },
      ],
    },
    'png-to-webp': {
      h1: 'PNG 转 WebP — 本地免费转换',
      intro:
        '**PNG 转 WebP** 把 PNG 压成更小的 WebP 以便网页加载。NanoImage 在浏览器本地完成转换：可批量、调质量、打包下载。**文件不上传**。JPG 请用 [JPG 转 WebP](/jpg-to-webp)；多格式入口见 [转换为 WebP](/convert-to-webp)。',
      badges: BADGES_ZH,
      faqs: [
        {
          q: '如何在不上传的情况下把 PNG 转成 WebP？',
          a: '在上方工具中选择 PNG。转换在浏览器内用 Canvas 完成，不会上传到服务器。可在开发者工具的网络面板自行确认。',
        },
        {
          q: 'PNG 转 WebP 会保留透明通道吗？',
          a: '会。WebP 支持透明通道；带透明的 PNG 在现代浏览器中转为 WebP 时通常保留透明。重要 UI 素材建议转换后预览边缘。',
        },
        {
          q: 'PNG 转 WebP 和 JPG 转 WebP 怎么选？',
          a: '需要透明或平面 UI 图用 [PNG 转 WebP](/png-to-webp)；照片用 [JPG 转 WebP](/jpg-to-webp)；多格式用 [转换为 WebP](/convert-to-webp)。',
        },
        {
          q: '如何批量把多张 PNG 转成 WebP？',
          a: '一次最多添加 20 张 PNG，调节质量后转换，可逐个下载或打包 ZIP。',
        },
        {
          q: '本地转换比上传到 CloudConvert 一类网站更安全吗？',
          a: '上传类工具会把文件发到远程服务器。NanoImage 本地转换，并通过 canvas 重绘去掉 EXIF 等元数据，更适合私密截图与产品素材。',
        },
      ],
      relatedTitle: '相关工具',
      related: [
        { path: '/convert-to-webp', label: '转换为 WebP' },
        { path: '/jpg-to-webp', label: 'JPG 转 WebP' },
        { path: '/remove-exif', label: '移除 EXIF' },
        { path: '/jpg-to-bmp', label: 'JPG 转 BMP' },
      ],
    },
    'jpg-to-webp': {
      h1: 'JPG 转 WebP — 本地免费转换',
      intro:
        '**JPG 转 WebP**（JPEG→WebP）在保持观感的同时缩小照片体积。NanoImage 在设备本地完成转换：可批量、调质量、下载 WebP 或 ZIP。**不上传**。带透明的 PNG 请用 [PNG 转 WebP](/png-to-webp)；多格式见 [转换为 WebP](/convert-to-webp)。',
      badges: BADGES_ZH,
      faqs: [
        {
          q: '如何不上传就把 JPG 转成 WebP？',
          a: '把 JPG/JPEG 拖进上方工具即可。编码在浏览器本地完成，无需上传。',
        },
        {
          q: '转 WebP 后画质会差很多吗？',
          a: '在合理质量（常见 80–90%）下，WebP 通常能在相近观感下比 JPEG 更小。上线前建议预览。',
        },
        {
          q: 'JPG 和 JPEG 转 WebP 有区别吗？',
          a: '没有实质区别。JPG 与 JPEG 是同一格式；本页两者都支持，`/zh/jpeg-to-webp` 会跳转到这里。',
        },
        {
          q: '如何批量转换？',
          a: '一次最多 20 张，调质量后转换，可单独下载或打包 ZIP。',
        },
        {
          q: '什么时候该用 PNG 转 WebP？',
          a: '需要透明通道或平面 UI 时用 [PNG 转 WebP](/png-to-webp)；照片优先本页。',
        },
      ],
      relatedTitle: '相关工具',
      related: [
        { path: '/convert-to-webp', label: '转换为 WebP' },
        { path: '/png-to-webp', label: 'PNG 转 WebP' },
        { path: '/remove-exif', label: '移除 EXIF' },
        { path: '/jpg-to-bmp', label: 'JPG 转 BMP' },
      ],
    },
    'jpg-to-bmp': {
      h1: 'JPG 转 BMP — 本地免费转换',
      intro:
        '**JPG 转 BMP**（JPEG→BMP）把照片转为未压缩的 Windows 位图，适合仍要求 BMP 的旧软件、驱动或流程。NanoImage 在设备本地完成：拖入 JPG/JPEG，转换后下载 BMP 或 ZIP。**不上传**。若需要更小的网页文件，请用 [JPG 转 WebP](/jpg-to-webp) 或 [转换为 WebP](/convert-to-webp)。',
      badges: BADGES_ZH,
      faqs: [
        {
          q: '如何不上传就把 JPG 转成 BMP？',
          a: '把 JPG/JPEG 拖进上方工具即可。编码在浏览器本地完成（Canvas + 本地 BMP 编码器），无需上传。',
        },
        {
          q: '转换时我的 JPG 会不会被上传？',
          a: '不会。文件留在你的设备上。本工具在浏览器本地转换，不上传到服务器。',
        },
        {
          q: 'JPG 和 JPEG 转 BMP 有区别吗？',
          a: '没有实质区别。JPG 与 JPEG 是同一格式；本页两者都支持（含 JFIF），`/zh/jpeg-to-bmp` 会跳转到这里。',
        },
        {
          q: 'BMP 会比原来的 JPG 更大吗？',
          a: '通常会。本工具输出未压缩 24 位 BMP，体积往往大于 JPEG——这是 BMP 格式本身的特点。若要缩小体积，请用 [JPG 转 WebP](/jpg-to-webp) 或 [压缩图片](/compress-image)。',
        },
        {
          q: '什么时候该用 BMP 而不是 PNG？',
          a: '当旧版 Windows 软件、驱动或工作流明确要求 `.bmp` 时用 BMP。需要无损压缩与更广兼容时优先 PNG；网页交付优先 WebP。本页仅做 JPG/JPEG → BMP（不含 BMP→JPG、TIFF 或 PDF）。',
        },
      ],
      relatedTitle: '相关工具',
      related: [
        { path: '/jpg-to-webp', label: 'JPG 转 WebP' },
        { path: '/convert-to-webp', label: '转换为 WebP' },
        { path: '/convert-image', label: '格式转换' },
        { path: '/remove-exif', label: '移除 EXIF' },
      ],
    },
  },
}

/** Resolve the copy language for a UI language code (zh-CN → zh, everything else → en). */
export function staticCopyLang(langCode: string): StaticCopyLang {
  return langCode === 'zh-CN' ? 'zh' : 'en'
}

/** Strip the rich-text mini markup, leaving plain text (for JSON-LD / i18n FAQ data). */
export function plainRichText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
}

/** Plain-text FAQ items for a language, keyed by slug (consumed by i18n faqs.items). */
export function staticToolFaqItems(lang: StaticCopyLang): Record<string, StaticToolFaq[]> {
  const out: Record<string, StaticToolFaq[]> = {}
  for (const slug of STATIC_TOOL_SLUGS) {
    const copy = STATIC_TOOL_COPY[lang][slug as StaticToolSlug]
    out[slug] = copy.faqs.map((f) => ({ q: plainRichText(f.q), a: plainRichText(f.a) }))
  }
  return out
}
