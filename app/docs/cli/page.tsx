import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'

const title = 'NanoImage CLI Documentation'
const description =
  'Install and use NanoImage CLI to compress, resize, convert, convert to WebP, and remove EXIF metadata from images directly from the command line.'
const url = `${BASE}/docs/cli`

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates(url),
  openGraph: buildOG({ title, description, url }),
  twitter: buildTwitter({ title, description }),
}

export default function DocsCliPage() {
  return <AppShell page="docs-cli" />
}
