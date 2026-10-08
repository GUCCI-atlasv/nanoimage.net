import fs from 'node:fs/promises'
import sharp from 'sharp'

const assets = JSON.parse(await fs.readFile(new URL('../docs/blog-image-generation.json', import.meta.url), 'utf8'))
for (const asset of assets) {
  const dest = new URL(`../public/assets/blog/${asset.name}.png`, import.meta.url)
  try { await fs.access(dest); continue } catch {}
  await sharp(asset.source)
    .resize(1200, asset.type === 'cover' ? 630 : 675, { fit: 'contain', background: '#f6f5ff' })
    .png({ compressionLevel: 9 })
    .toFile(dest.pathname)
}
console.log(`Exported ${assets.length} blog images`)
