import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: { absolute: 'Terms of Use - NanoImage' },
  description: 'Read the NanoImage terms of use. Our free browser-based image tools are provided as-is with no data collection, no account required.',
  alternates: buildAlternates('https://nanoimage.net/terms-of-use', undefined, []),
}

export default function TermsOfUsePage() {
  return <AppShell page="terms-of-use" />
}
