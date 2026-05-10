import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Use - NanoImage',
  robots: { index: false },
  alternates: buildAlternates('https://nanoimage.net/terms-of-use'),
}

export default function TermsOfUsePage() {
  return <AppShell page="terms-of-use" />
}
