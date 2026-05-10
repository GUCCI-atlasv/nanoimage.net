import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/seo'

const title = 'NanoImage - Free Online Image Tools'
const description =
  'Free online image tools to compress, resize, crop, convert, and edit images in your browser. No signup required.'
const url = 'https://nanoimage.net/'

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates(url),
  openGraph: buildOG({ title, description, url }),
  twitter: buildTwitter({ title, description }),
}

export default function HomePage() {
  return <AppShell page="home" />
}
