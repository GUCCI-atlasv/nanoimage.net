import type { BlogPost } from '../data'

/** Artwork delivered from the September 2026 image brief. */
const inlineImages: Record<string, [string, string]> = {
  'how-to-blur-photo-online': ['how-to-blur-photo-online-demo', 'Street photo with the face and license plate blurred'],
  'how-to-add-watermark-to-photo-online': ['how-to-add-watermark-to-photo-online-demo', 'Photo with text and logo watermarks'],
  'how-to-convert-png-to-jpg-online': ['how-to-convert-png-to-jpg-online-demo', 'PNG transparency converted to a white JPG background'],
  'how-to-crop-image-online': ['how-to-crop-image-online-demo', 'Square, portrait and landscape crops with crop handles'],
  'protect-photos-online': ['protect-photos-online-checklist', 'Photo sharing checklist: remove EXIF, blur, pixelate and watermark'],
  'what-is-exif-data': ['what-is-exif-data-fields', 'EXIF fields including GPS, camera, timestamp and serial identifiers'],
  'optimize-images-for-web': ['optimize-images-for-web-workflow', 'Resize, choose a format, compress and strip metadata'],
  'jpg-png-webp-avif': ['jpg-png-webp-avif-matrix', 'JPG, PNG, WebP and AVIF format comparison'],
  'image-format-guide': ['image-format-guide-chooser', 'Choose image formats for photos, graphics and animation'],
  'social-media-image-sizes': ['social-media-image-sizes-cheat', 'Common square, portrait and vertical social image export sizes'],
  'instagram-image-sizes': ['instagram-image-sizes-cheat', 'Instagram square, portrait and story export examples'],
  'how-to-make-passport-photo-online-for-free': ['passport-photo-maker-specs', 'Illustrative ID photo frame with size and print resolution guidance'],
  'what-is-grid-maker': ['grid-maker-demo', 'Still life photo before and after adding a drawing grid'],
  'quick-image-edits-online': ['quick-image-edits-online-strip', 'Crop, rotate, flip and enhance image previews'],
  'nanoimage-vs-tinypng-vs-squoosh-vs-photopea': ['vs-comparison-matrix', 'Image tool workflow comparison: NanoImage, TinyPNG, Squoosh and Photopea'],
}

const coverSlugs = new Set([
  'what-is-exif-data',
  'nanoimage-vs-tinypng',
  'nanoimage-vs-squoosh',
  'nanoimage-vs-photopea',
  'nanoimage-vs-tinypng-vs-squoosh-vs-photopea',
])

function insertImage(body: string, filename: string, alt: string): string {
  const path = `/assets/blog/${filename}.png`
  if (body.includes(path)) return body
  const image = `![${alt}](${path})`
  const firstSection = body.indexOf('\n## ')
  return firstSection >= 0
    ? `${body.slice(0, firstSection).trimEnd()}\n\n${image}\n${body.slice(firstSection)}`
    : `${body}\n\n${image}`
}

export function applyBlogImages(posts: BlogPost[]): void {
  for (const post of posts) {
    if (coverSlugs.has(post.slug)) post.coverImage = `/assets/blog/${post.slug}-cover.png`
    const asset = inlineImages[post.slug]
    if (!asset) continue
    if (post.body) post.body = insertImage(post.body, ...asset)
    for (const localization of Object.values(post.localizations ?? {})) {
      if (localization.body) localization.body = insertImage(localization.body, ...asset)
    }
  }
}
