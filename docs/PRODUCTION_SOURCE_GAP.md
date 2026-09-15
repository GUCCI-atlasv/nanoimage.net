# Production source gap (2026-09-15)

Live `nanoimage.net` (CF Pages project `nanoimage-net`) is **ahead of this git repo**.

- Last production deploy before this pass: dirty deploy on 2026-09-11 (`commit_dirty: true`) with message `Add 28 blog image assets and article references` on top of `7fd766d`.
- That working tree was **never pushed**. GitHub `main` lacks live tools such as `passport-photo`, `grid-maker`, `background-remover`, size-target compress pages, and the `toolSections` SEO layer.
- **Do not** `npm run build && wrangler pages deploy out` from clean git — it will wipe those live tools/SEO.

## What this pass did

Deployed a mirrored+patched `prod-out/` (surgical HTML/JS SEO patches + new standalone `/gif-compressor` pages) without rebuilding from incomplete source.

## Recovery needed

Locate or reconstruct the dirty 2026-09-11 source tree and commit it to git before any full Next rebuild.
