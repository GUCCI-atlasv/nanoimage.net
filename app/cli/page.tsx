import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates, buildOG, buildTwitter, BASE } from '@/lib/seo'

const title = 'NanoImage CLI - Optimize Images from the Command Line'
const description =
  'Compress, resize, convert, and remove EXIF from images locally with NanoImage CLI. Batch optimize JPG, PNG, and WebP files from your terminal.'
const url = `${BASE}/cli`

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates(url),
  openGraph: buildOG({ title, description, url }),
  twitter: buildTwitter({ title, description }),
}

export default function CliPage() {
  return <AppShell page="cli" />
}
