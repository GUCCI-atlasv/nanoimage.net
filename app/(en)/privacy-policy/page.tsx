import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy - NanoImage',
  robots: { index: false },
  alternates: buildAlternates('https://nanoimage.net/privacy-policy'),
}

export default function PrivacyPolicyPage() {
  return <AppShell page="privacy-policy" />
}
