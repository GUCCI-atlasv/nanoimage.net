/**
 * Catalog of the 5 first-wave AI features (PRD §5 F1–F5).
 * `status` drives whether a feature renders its live tool or a "coming soon"
 * landing page, so we can ship M0 scaffolding and turn features on per milestone.
 */
export type FeatureStatus = 'live' | 'soon'

export type Feature = {
  slug: string
  code: 'F1' | 'F2' | 'F3' | 'F4' | 'F5'
  status: FeatureStatus
  /** Short label for nav / cards. */
  name: string
  /** H1 / hero title. */
  title: string
  /** Meta + hero subtitle. */
  subtitle: string
  metaTitle: string
  metaDescription: string
  emoji: string
  tone: string
  /** ~MB the user downloads on first use (PRD model sizes). */
  modelSizeMb: number
  modelNote: string
  keywords: string[]
  bullets: string[]
  howTo: string[]
  faqs: { q: string; a: string }[]
  /** PRD milestone it ships in. */
  milestone: 'M1' | 'M2' | 'M3' | 'M4'
}

export const features: Feature[] = [
  {
    slug: 'background-remover',
    code: 'F1',
    status: 'live',
    name: 'Background Remover',
    title: 'Free AI Background Remover Online',
    subtitle:
      'Remove the background from JPG, PNG, and WebP images directly in your browser. Your photo stays on your device — download a transparent PNG with no signup, no upload, and no watermark.',
    metaTitle: 'Free AI Background Remover — Private, No Upload | AI NanoImage',
    metaDescription:
      'Remove backgrounds from JPG, PNG and WebP images for free. AI NanoImage runs locally in your browser, so your photo is never uploaded. Download a clean transparent PNG with no sign-up or watermark.',
    emoji: '✂️',
    tone: 'violet',
    modelSizeMb: 168,
    modelNote: 'First use downloads the RMBG-1.4 model (~168 MB). Cached locally for offline reuse.',
    keywords: [
      'background remover',
      'remove background',
      'transparent png',
      'remove bg',
      'on-device background removal',
    ],
    bullets: [
      'One-click subject cut-out → transparent PNG',
      'Swap to solid color or keep transparency',
      'Runs on-device with WebGPU; WASM fallback everywhere',
      'No upload, no sign-up, no watermark',
    ],
    howTo: [
      'Drop in a JPG, PNG, or WebP image.',
      'The model runs locally and previews the cut-out on a checkerboard.',
      'Optionally pick a background color.',
      'Download your transparent PNG.',
    ],
    faqs: [
      {
        q: 'Is my photo uploaded anywhere?',
        a: 'No. The AI model is downloaded to your browser once, then all inference happens on your device. Your image never leaves the browser.',
      },
      {
        q: 'Why does the first run take a moment?',
        a: 'The first time you use the tool it downloads the RMBG-1.4 model (~168 MB). After that it is cached and works offline and instantly.',
      },
      {
        q: 'What about complex hair or fur edges?',
        a: 'On-device models handle most subjects well, but very fine hair can be imperfect. You can refine edges or keep transparency and touch up elsewhere.',
      },
    ],
    milestone: 'M1',
  },
  {
    slug: 'image-upscaler',
    code: 'F2',
    status: 'live',
    name: 'Image Upscaler',
    title: 'AI Image Upscaler',
    subtitle:
      'Upscale images 2× or 4× with multi-pass smart upsampling — entirely on your device, no upload.',
    metaTitle: 'Image Upscaler 2× / 4× — Smart, No Upload | AI NanoImage',
    metaDescription:
      'Enlarge images 2× and 4× with multi-pass bilinear upsampling and adaptive sharpening — sharper than standard bicubic, instant, no model download. Free, no upload.',
    emoji: '🔍',
    tone: 'blue',
    modelSizeMb: 0,
    modelNote: 'No model download — processes instantly using Canvas APIs.',
    keywords: ['image upscaler', 'enlarge image', 'upscale photo', 'increase resolution', 'sharpen image'],
    bullets: [
      '2× and 4× upscaling — output resolution exactly input × scale',
      'Photo mode and Illustration mode (different sharpening profiles)',
      'Sharper than standard bicubic — multi-pass + adaptive unsharp mask',
      'Before/after compare slider · instant · no model download',
    ],
    howTo: [
      'Upload an image.',
      'Choose 2× or 4× and Photo or Illustration mode.',
      'Processing is instant — no model to download.',
      'Compare before/after and download your PNG.',
    ],
    faqs: [
      {
        q: 'How is this better than the basic upscaler on nanoimage.net?',
        a: 'The main site uses a single-pass bicubic resize. This tool uses iterative 1.4× bilinear steps followed by an adaptive unsharp mask, which recovers more edge detail and reduces halos — without any model download.',
      },
    ],
    milestone: 'M2',
  },
  {
    slug: 'object-remover',
    code: 'F3',
    status: 'live',
    name: 'Object Remover',
    title: 'AI Object & People Remover',
    subtitle:
      'Paint over people, objects, or watermarks and let smart edge-fill restore the background — on-device, no upload.',
    metaTitle: 'Object & People Remover — Smart Fill, No Upload | AI NanoImage',
    metaDescription:
      'Remove people, objects, and watermarks from photos by painting a mask. On-device edge-diffusion fill restores the background. No upload, no model download, free.',
    emoji: '🪄',
    tone: 'pink',
    modelSizeMb: 0,
    modelNote: 'No model download — edge-diffusion fill runs instantly on Canvas.',
    keywords: ['object remover', 'remove people from photo', 'remove watermark', 'erase object', 'photo cleanup'],
    bullets: [
      'Paint a mask with adjustable brush (S / M / L / XL)',
      'Edge-diffusion fill propagates background into masked area',
      'Undo / redo (30 levels) · iterate with "Keep editing"',
      'No model download · instant · before/after compare',
    ],
    howTo: [
      'Upload a photo.',
      'Paint over the object or person you want removed.',
      'Click Remove — edge-fill restores the background from surrounding pixels.',
      'Use Keep editing to iterate, then download.',
    ],
    faqs: [
      {
        q: 'How does the fill work without an AI model?',
        a: 'We use a fast-marching edge-diffusion algorithm: masked pixels are filled layer-by-layer from the boundary inward, averaging nearby unmasked pixel colors. This works well for small objects on uniform backgrounds and needs no download.',
      },
    ],
    milestone: 'M4',
  },
  {
    slug: 'photo-restore',
    code: 'F4',
    status: 'live',
    name: 'Photo Restore',
    title: 'AI Photo Restore & Colorize',
    subtitle:
      'Enhance old or faded photos and add color to black-and-white pictures — all on-device, no upload.',
    metaTitle: 'Photo Restore & Colorize — On-device, No Upload | AI NanoImage',
    metaDescription:
      'Restore contrast and sharpness of old photos, and add warm natural color to black-and-white pictures. All on-device with Canvas processing. No upload, free.',
    emoji: '🎞️',
    tone: 'amber',
    modelSizeMb: 0,
    modelNote: 'No model download — processes instantly using Canvas APIs.',
    keywords: ['photo restoration', 'old photo repair', 'colorize black and white photo', 'enhance photo', 'restore photo'],
    bullets: [
      'Restore: bilateral denoise + adaptive contrast + Laplacian sharpening',
      'Colorize: luminance-guided warm tone mapping',
      'Color strength slider · stack Restore + Colorize',
      'Before/after compare · instant · no model download',
    ],
    howTo: [
      'Upload an old or black-and-white photo.',
      'Choose Restore, Colorize, or both.',
      'Adjust colorize strength with the slider.',
      'Compare before/after and download your PNG.',
    ],
    faqs: [
      {
        q: 'Are the colors accurate?',
        a: 'Colorization uses luminance-guided tone mapping (not an AI model) — it produces natural-looking results on most photos but is an estimate, not a recovery of original colors. Use the strength slider to find the right level.',
      },
    ],
    milestone: 'M3',
  },
  {
    slug: 'smart-crop',
    code: 'F5',
    status: 'live',
    name: 'Smart Crop & Blur',
    title: 'AI Smart Crop & Portrait Blur',
    subtitle:
      'Auto-crop to keep the subject in frame, or add a depth-of-field background blur — on-device.',
    metaTitle: 'AI Smart Crop & Portrait Background Blur — On-device | AI NanoImage',
    metaDescription:
      'Let AI find the subject and crop to any ratio, or apply a natural portrait background blur. Runs in your browser, no upload, free.',
    emoji: '🎯',
    tone: 'green',
    modelSizeMb: 3,
    modelNote: 'Smart Crop needs no model. Portrait Blur downloads a ~3 MB MediaPipe model (self-hosted, cached).',
    keywords: ['smart crop', 'auto crop', 'portrait blur', 'background blur', 'saliency crop'],
    bullets: [
      'Saliency-based auto crop to 1:1, 4:5, 16:9, custom',
      'Subject stays in frame',
      'Portrait segmentation → adjustable background blur',
      'The lightest, fastest on-device feature',
    ],
    howTo: [
      'Upload an image.',
      'For crop: pick a target ratio and fine-tune the box.',
      'For blur: auto-segment the subject and set blur strength.',
      'Preview and download.',
    ],
    faqs: [
      {
        q: 'Will it cut off the main subject?',
        a: 'The crop box is anchored to the detected subject so key content stays in frame; you can still nudge it manually.',
      },
    ],
    milestone: 'M1',
  },
]

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug)
}
