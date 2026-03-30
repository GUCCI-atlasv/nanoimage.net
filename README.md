# NanoImage.net

Free online image tools that run 100% in your browser. No upload, no account, no tracking.

**Live site:** [https://nanoimage.net](https://nanoimage.net)

## Features

- **13 image tools** — Compress, Resize, Crop, Rotate, Flip, Blur, Invert, B&W, Border, Watermark, Convert to JPG, Compress to 100KB, Meme Generator
- **100% client-side** — Images never leave your device; all processing happens in the browser
- **9 languages** — English, Spanish, French, Russian, Japanese, Simplified Chinese, Traditional Chinese, Brazilian Portuguese, European Portuguese
- **GeoIP auto-redirect** — Visitors are automatically served content in their local language via Cloudflare headers
- **SEO-optimized** — Per-page canonical tags, hreflang alternates, dynamic sitemap, structured blog content
- **Blog with i18n** — All blog posts translated into 9 languages with proper SEO metadata

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router, Edge Runtime) |
| i18n | [next-intl](https://next-intl-docs.vercel.app) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Build | [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages) |

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # All pages (locale-prefixed routing)
│   │   ├── layout.tsx      # Root layout with metadata, canonical, hreflang
│   │   ├── page.tsx        # Homepage
│   │   ├── blog/           # Blog index + [slug] article pages
│   │   ├── compress-image/ # Tool pages (13 total)
│   │   └── ...
│   ├── robots.ts           # Dynamic robots.txt
│   └── sitemap.ts          # Dynamic sitemap.xml with hreflang
├── components/             # Shared UI components
├── content/
│   └── blog/               # Blog content files (9 locales × N articles)
│       ├── en/
│       ├── es/
│       ├── fr/
│       └── ...
├── i18n/
│   ├── routing.ts          # Locale config & navigation
│   └── request.ts          # Server-side i18n setup
├── lib/
│   ├── blog.ts             # Blog post metadata registry
│   ├── metadata.ts         # buildAlternates() for canonical + hreflang
│   └── tools.ts            # Tool definitions (slug, priority, category)
└── middleware.ts            # GeoIP language detection + cookie preference
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Deploy

```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy to Cloudflare Pages
npm run pages:deploy
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Standard Next.js production build |
| `npm run lint` | Run ESLint |
| `npm run pages:build` | Build for Cloudflare Pages (via @cloudflare/next-on-pages) |
| `npm run pages:preview` | Preview Cloudflare Pages build locally |
| `npm run pages:deploy` | Deploy to Cloudflare Pages production |

## SEO Architecture

- **Domain canonicalization:** All traffic forced to `https://nanoimage.net/` (non-www, HTTPS) via Cloudflare redirect rules
- **Trailing slash:** Enforced site-wide (`trailingSlash: true` in Next.js config)
- **Canonical tags:** Every page emits `<link rel="canonical">` pointing to the non-www HTTPS version
- **hreflang:** All pages include `<link rel="alternate" hreflang="...">` for all 9 locales + `x-default`
- **Sitemap:** Dynamic `sitemap.xml` with per-URL hreflang annotations
- **robots.txt:** Blocks `/favicon.ico`, `/_next/`, `/api/` from crawling
- **Blog 301 redirects:** Consolidated articles redirect old slugs to merged canonical pages

## License

Private repository.
