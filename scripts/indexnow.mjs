#!/usr/bin/env node
/**
 * IndexNow submitter — pushes URL changes to Bing (and Yandex, Seznam, Naver)
 * instead of waiting for an organic recrawl.
 *
 * Why this exists: Bing Webmaster flagged "Learn how IndexNow boosts site
 * visibility" as High severity on 2026-08-07, and the Aug 2026 SEO PRD is
 * largely an indexing problem — 5,429 impressions (17%) were still being served
 * from the retired www host, /passport-photo was missing from the sitemap
 * entirely, and 526 redirect rules need Bing to recrawl before they take effect.
 * IndexNow is the only lever that pushes rather than waits.
 *
 * Usage:
 *   node scripts/indexnow.mjs                 # submit every URL in the sitemap
 *   node scripts/indexnow.mjs /flip-image /zh/blur-image
 *   node scripts/indexnow.mjs --dry-run       # print payload, send nothing
 *
 * The key file must stay reachable at https://nanoimage.net/<key>.txt — it
 * lives in public/ so the static export copies it to the site root.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const HOST = 'nanoimage.net'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/IndexNow'
const MAX_URLS_PER_REQUEST = 10000

/** Find the <key>.txt dropped in public/ — avoids hard-coding the key twice. */
function resolveKey() {
  const fromEnv = process.env.INDEXNOW_KEY
  if (fromEnv) return fromEnv
  const candidates = readdirSync(join(ROOT, 'public')).filter((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f))
  if (candidates.length === 0) {
    throw new Error('No IndexNow key file found in public/. Expected <hex>.txt')
  }
  if (candidates.length > 1) {
    throw new Error(`Multiple IndexNow key files in public/: ${candidates.join(', ')}. Keep exactly one.`)
  }
  const file = candidates[0]
  const key = file.replace(/\.txt$/i, '')
  const body = readFileSync(join(ROOT, 'public', file), 'utf8').trim()
  if (body !== key) {
    throw new Error(`Key file ${file} must contain exactly "${key}" (found "${body}")`)
  }
  return key
}

function urlsFromSitemap() {
  const path = join(ROOT, 'public', 'sitemap.xml')
  if (!existsSync(path)) throw new Error('public/sitemap.xml not found')
  const xml = readFileSync(path, 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  const offHost = locs.filter((u) => !u.startsWith(ORIGIN + '/') && u !== ORIGIN)
  if (offHost.length) {
    throw new Error(`Sitemap contains ${offHost.length} URL(s) outside ${ORIGIN}, e.g. ${offHost[0]}`)
  }
  return [...new Set(locs)]
}

function normalise(arg) {
  if (arg.startsWith('http://') || arg.startsWith('https://')) return arg
  return ORIGIN + (arg.startsWith('/') ? arg : `/${arg}`)
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const explicit = args.filter((a) => !a.startsWith('--'))

  const key = resolveKey()
  const urlList = explicit.length ? explicit.map(normalise) : urlsFromSitemap()

  if (urlList.length === 0) {
    console.error('Nothing to submit.')
    process.exit(1)
  }
  if (urlList.length > MAX_URLS_PER_REQUEST) {
    console.error(`${urlList.length} URLs exceeds the ${MAX_URLS_PER_REQUEST}-per-request limit.`)
    process.exit(1)
  }

  const payload = { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList }

  console.log(`IndexNow → ${ENDPOINT}`)
  console.log(`  host        ${HOST}`)
  console.log(`  keyLocation ${payload.keyLocation}`)
  console.log(`  urls        ${urlList.length}${explicit.length ? ' (explicit)' : ' (from sitemap)'}`)
  urlList.slice(0, 5).forEach((u) => console.log(`              ${u}`))
  if (urlList.length > 5) console.log(`              …and ${urlList.length - 5} more`)

  if (dryRun) {
    console.log('\n--dry-run: nothing sent.')
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })
  const text = await res.text()

  // IndexNow: 200 accepted, 202 accepted-but-key-pending, 4xx rejected.
  if (res.status === 200 || res.status === 202) {
    console.log(`\n✅ ${res.status} ${res.statusText} — accepted.${res.status === 202 ? ' (key validation pending)' : ''}`)
  } else {
    console.error(`\n❌ ${res.status} ${res.statusText}\n${text}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(`❌ ${err.message}`)
  process.exit(1)
})
