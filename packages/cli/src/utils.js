import fs from 'fs'
import path from 'path'

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

export function resolveOutput(inputFile, output, suffix, ext, fileCount = 1) {
  const base = path.basename(inputFile, path.extname(inputFile))
  const outExt = ext || path.extname(inputFile)
  const filename = suffix ? `${base}${suffix}${outExt}` : `${base}${outExt}`
  if (!output) return path.join(path.dirname(inputFile), filename)

  // For a single input file, `--output result.jpg` should write that exact file,
  // not create `result.jpg/original.jpg`.
  if (fileCount === 1 && path.extname(output)) return output

  return path.join(output, filename)
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function printResult(results, json) {
  if (json) {
    console.log(JSON.stringify(results, null, 2))
    return
  }
  for (const r of results) {
    if (r.error) {
      console.error(`  ✗ ${r.input}  →  ERROR: ${r.error}`)
    } else {
      const saved = r.inputSize - r.outputSize
      const pct = ((saved / r.inputSize) * 100).toFixed(1)
      const arrow = saved > 0 ? `↓${pct}%` : `↑${Math.abs(pct)}%`
      console.log(`  ✓ ${r.input}  →  ${r.output}  (${formatBytes(r.inputSize)} → ${formatBytes(r.outputSize)} ${arrow})`)
    }
  }
}
