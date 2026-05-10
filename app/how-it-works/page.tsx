import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates, buildOG, buildTwitter } from '@/lib/seo'

const title = 'How NanoImage Works - Free Image Tools'
const description =
  'Learn how NanoImage processes images directly in your browser — no uploads, no signup, just simple free tools.'
const url = 'https://nanoimage.net/how-it-works'

export const metadata: Metadata = {
  title,
  description,
  alternates: buildAlternates(url),
  openGraph: buildOG({ title, description, url }),
  twitter: buildTwitter({ title, description }),
}

export default function HowItWorksPage() {
  return <AppShell page="how-it-works" />
}
