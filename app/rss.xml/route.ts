import { blogPosts } from '@/src/data'

export const dynamic = 'force-static'

const BASE = 'https://nanoimage.net'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Static RSS feed for the English blog, regenerated on every build. */
export async function GET() {
  const posts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20)

  const items = posts
    .map((p) => {
      const loc = p.localizations?.en
      const title = loc?.title ?? p.title
      const desc = loc?.excerpt ?? p.excerpt
      return `    <item>
      <title>${esc(title)}</title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid>${BASE}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(desc)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NanoImage Blog</title>
    <link>${BASE}/blog</link>
    <description>Tips, guides, and updates about image compression, resizing, conversion, and privacy-first browser-based image tools.</description>
    <language>en</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
