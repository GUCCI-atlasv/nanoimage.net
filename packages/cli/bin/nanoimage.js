#!/usr/bin/env node
import { program } from 'commander'
import { createRequire } from 'module'
import { cmdCompress, cmdResize, cmdConvert, cmdWebp, cmdRemoveExif } from '../src/commands.js'
import { printResult } from '../src/utils.js'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

program
  .name('nanoimage')
  .description('Free image optimization CLI — compress, resize, convert, and clean images locally')
  .version(pkg.version)

// ── compress ──────────────────────────────────────────────────────────────────
program
  .command('compress <input>')
  .description('Compress images (JPEG, PNG, WebP, AVIF)')
  .option('-q, --quality <n>', 'Quality 1-100 (default: 80)', '80')
  .option('--target-kb <n>', 'Best-effort target output size in KB')
  .option('-o, --output <dir>', 'Output directory (default: overwrite in place)')
  .option('--json', 'Output results as JSON')
  .action(async (input, opts) => {
    console.log(`Compressing images...`)
    const results = await cmdCompress(input, opts)
    printResult(results, opts.json)
  })

// ── resize ────────────────────────────────────────────────────────────────────
program
  .command('resize <input>')
  .description('Resize images')
  .option('-w, --width <px>', 'Target width in pixels')
  .option('-h, --height <px>', 'Target height in pixels')
  .option('--fit <mode>', 'Fit mode: inside|cover|fill|contain|outside (default: inside)', 'inside')
  .option('--enlarge', 'Allow enlarging images smaller than target size')
  .option('-o, --output <dir>', 'Output directory')
  .option('--json', 'Output results as JSON')
  .action(async (input, opts) => {
    console.log(`Resizing images...`)
    const results = await cmdResize(input, opts)
    printResult(results, opts.json)
  })

// ── convert ───────────────────────────────────────────────────────────────────
program
  .command('convert <input>')
  .description('Convert images between formats')
  .requiredOption('--to <format>', 'Target format: jpg|png|webp|avif')
  .option('-q, --quality <n>', 'Quality 1-100 (default: 85)', '85')
  .option('--background <color>', 'Background color when converting PNG→JPG (default: white)', 'white')
  .option('-o, --output <dir>', 'Output directory')
  .option('--json', 'Output results as JSON')
  .action(async (input, opts) => {
    console.log(`Converting images to .${opts.to}...`)
    const results = await cmdConvert(input, opts)
    printResult(results, opts.json)
  })

// ── webp ──────────────────────────────────────────────────────────────────────
program
  .command('webp <input>')
  .description('Convert images to WebP format')
  .option('-q, --quality <n>', 'Quality 1-100 (default: 82)', '82')
  .option('--remove-exif', 'Strip EXIF metadata during conversion')
  .option('-o, --output <dir>', 'Output directory')
  .option('--json', 'Output results as JSON')
  .action(async (input, opts) => {
    console.log(`Converting to WebP...`)
    const results = await cmdWebp(input, opts)
    printResult(results, opts.json)
  })

// ── remove-exif ───────────────────────────────────────────────────────────────
program
  .command('remove-exif <input>')
  .description('Strip all EXIF / metadata from images')
  .option('-o, --output <dir>', 'Output directory (default: overwrite in place)')
  .option('--json', 'Output results as JSON')
  .action(async (input, opts) => {
    console.log(`Removing EXIF metadata...`)
    const results = await cmdRemoveExif(input, opts)
    printResult(results, opts.json)
  })

program.parse()
