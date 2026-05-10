import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import { ensureDir, resolveOutput, formatBytes } from './utils.js'

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif', '.gif']

async function collectFiles(input) {
  const stat = fs.existsSync(input) && fs.statSync(input)
  if (stat && stat.isDirectory()) {
    const files = await glob(`${input}/**/*.{jpg,jpeg,png,webp,tiff,avif}`, { nodir: true })
    return files
  }
  const ext = path.extname(input).toLowerCase()
  if (IMAGE_EXTS.includes(ext)) return [input]
  // treat as glob pattern
  return glob(input, { nodir: true })
}

// ── compress ──────────────────────────────────────────────────────────────────
export async function cmdCompress(input, opts) {
  const files = await collectFiles(input)
  if (!files.length) { console.error('No image files found.'); process.exit(1) }
  const quality = Math.min(100, Math.max(1, parseInt(opts.quality) || 80))
  const results = []

  for (const file of files) {
    const outPath = opts.output
      ? resolveOutput(file, opts.output, '', path.extname(file), files.length)
      : file  // overwrite by default
    ensureDir(path.dirname(outPath))
    const inputSize = fs.statSync(file).size
    try {
      const ext = path.extname(file).toLowerCase()
      const img = sharp(file)
      if (ext === '.jpg' || ext === '.jpeg') img.jpeg({ quality, mozjpeg: true })
      else if (ext === '.png') img.png({ quality, compressionLevel: 9 })
      else if (ext === '.webp') img.webp({ quality })
      else if (ext === '.avif') img.avif({ quality })
      else img.jpeg({ quality, mozjpeg: true })
      await img.toFile(outPath)
      const outputSize = fs.statSync(outPath).size
      results.push({ input: file, output: outPath, inputSize, outputSize })
    } catch (e) {
      results.push({ input: file, error: e.message })
    }
  }
  return results
}

// ── resize ────────────────────────────────────────────────────────────────────
export async function cmdResize(input, opts) {
  const files = await collectFiles(input)
  if (!files.length) { console.error('No image files found.'); process.exit(1) }
  const width  = opts.width  ? parseInt(opts.width)  : undefined
  const height = opts.height ? parseInt(opts.height) : undefined
  if (!width && !height) { console.error('Specify --width and/or --height'); process.exit(1) }
  const results = []

  for (const file of files) {
    const outPath = resolveOutput(file, opts.output, '', path.extname(file), files.length)
    ensureDir(path.dirname(outPath))
    const inputSize = fs.statSync(file).size
    try {
      await sharp(file)
        .resize(width, height, { fit: opts.fit || 'inside', withoutEnlargement: !opts.enlarge })
        .toFile(outPath)
      const outputSize = fs.statSync(outPath).size
      results.push({ input: file, output: outPath, inputSize, outputSize })
    } catch (e) {
      results.push({ input: file, error: e.message })
    }
  }
  return results
}

// ── convert ───────────────────────────────────────────────────────────────────
export async function cmdConvert(input, opts) {
  const files = await collectFiles(input)
  if (!files.length) { console.error('No image files found.'); process.exit(1) }
  const to = (opts.to || 'jpg').replace(/^\./, '').toLowerCase()
  const quality = parseInt(opts.quality) || 85
  const results = []

  for (const file of files) {
    const outExt = to === 'jpg' ? '.jpg' : `.${to}`
    const outPath = resolveOutput(file, opts.output, '', outExt, files.length)
    ensureDir(path.dirname(outPath))
    const inputSize = fs.statSync(file).size
    try {
      const img = sharp(file)
      if (to === 'jpg' || to === 'jpeg') {
        img.jpeg({ quality, mozjpeg: true })
        if (opts.background) img.flatten({ background: opts.background })
      } else if (to === 'png') {
        img.png({ quality })
      } else if (to === 'webp') {
        img.webp({ quality })
      } else if (to === 'avif') {
        img.avif({ quality })
      }
      await img.toFile(outPath)
      const outputSize = fs.statSync(outPath).size
      results.push({ input: file, output: outPath, inputSize, outputSize })
    } catch (e) {
      results.push({ input: file, error: e.message })
    }
  }
  return results
}

// ── webp ──────────────────────────────────────────────────────────────────────
export async function cmdWebp(input, opts) {
  const files = await collectFiles(input)
  if (!files.length) { console.error('No image files found.'); process.exit(1) }
  const quality = parseInt(opts.quality) || 82
  const results = []

  for (const file of files) {
    const outPath = resolveOutput(file, opts.output, '', '.webp', files.length)
    ensureDir(path.dirname(outPath))
    const inputSize = fs.statSync(file).size
    try {
      const img = sharp(file).webp({ quality })
      if (opts.removeExif) img.withMetadata({})
      await img.toFile(outPath)
      const outputSize = fs.statSync(outPath).size
      results.push({ input: file, output: outPath, inputSize, outputSize })
    } catch (e) {
      results.push({ input: file, error: e.message })
    }
  }
  return results
}

// ── remove-exif ───────────────────────────────────────────────────────────────
export async function cmdRemoveExif(input, opts) {
  const files = await collectFiles(input)
  if (!files.length) { console.error('No image files found.'); process.exit(1) }
  const results = []

  for (const file of files) {
    const outPath = opts.output
      ? resolveOutput(file, opts.output, '', path.extname(file), files.length)
      : file
    ensureDir(path.dirname(outPath))
    const inputSize = fs.statSync(file).size
    try {
      await sharp(file).withMetadata({}).toFile(outPath + '.tmp')
      fs.renameSync(outPath + '.tmp', outPath)
      const outputSize = fs.statSync(outPath).size
      results.push({ input: file, output: outPath, inputSize, outputSize })
    } catch (e) {
      results.push({ input: file, error: e.message })
    }
  }
  return results
}
