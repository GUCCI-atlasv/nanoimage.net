import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/seo'

const title = 'NanoImage Blog - Image Tools Guides'
const description =
  'Tips, guides, and updates about image compression, resizing, conversion, and more from the NanoImage team.'
const url = 'https://nanoimage.net/blog'

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates(url),
  openGraph: buildOG({ title, description, url }),
  twitter: buildTwitter({ title, description }),
}

export default function BlogListPage() {
  return <AppShell page="blog-list" />
}
