# Production source recovery (2026-10-08)

The production source gap recorded on 2026-09-15 has been recovered in this repository.

- Restored the previously uncommitted production source, including passport photos, grid maker, on-device AI tools, compression targets, multilingual SEO, and blog assets.
- Reconciled the live site with local source, restoring GIF Compressor, PNG to WebP, JPG to WebP, JPG to BMP, and four October blog articles.
- Fixed homepage file selection and transfer to the compression tool, English-route language consistency, and the displayed tool count.
- Built the recovered source with Next.js static export and deployed it to Cloudflare Pages production on 2026-10-08: `4636638b.nanoimage-net.pages.dev`.
- Verified that the production sitemap matches the local sitemap: 528 URLs, all returning HTTP 200. Sampled legacy URLs return HTTP 301 and reach HTTP 200 destinations.
- Verified image compression and WebP/BMP/GIF outputs, including preservation of two animation frames in the GIF test.

## Normal deployment

Use the source build workflow again:

```bash
npm ci
npm run deploy
```

The root project deploys to Cloudflare Pages project `nanoimage-net`. The historical mirrored `prod-out/` workflow is no longer the current production workflow. Build output and local caches are intentionally excluded from Git.

## Historical context

Before recovery, the 2026-09-11 dirty deployment was ahead of GitHub. A later deployment patched mirrored production output because clean repository builds would have removed live functionality. This history explains the former warning; it no longer describes the recovered source tree.
