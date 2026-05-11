import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/seo'

const title = 'NanoImage — 15 Image Tools. No AI. No Upload. No Account.'
const description =
  'Compress, resize, crop, convert images — 100% in your browser via Canvas API. Your files never leave your device. Free forever, no limits.'
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
