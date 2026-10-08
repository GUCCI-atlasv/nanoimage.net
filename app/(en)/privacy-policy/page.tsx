import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy - NanoImage' },
  description: 'Read the NanoImage privacy policy. We do not upload, store, or share your images. All processing happens locally in your browser.',
  alternates: buildAlternates('https://nanoimage.net/privacy-policy'),
}

export default function PrivacyPolicyPage() {
  return <AppShell page="privacy-policy" />
}
