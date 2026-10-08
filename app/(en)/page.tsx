import type { Metadata } from 'next'
import AppShell from '@/components/AppShell'
import { buildAlternates, buildOG, buildTwitter, buildHomePageJsonLd, BASE } from '@/lib/seo'

const title = 'NanoImage — Free Image Tools. No Upload. No Account.'
const description =
  'Compress, resize, crop, convert, and AI-edit images — 100% in your browser, including on-device AI. Your files never leave your device. Free forever, no limits.'
const url = BASE

export const metadata: Metadata = {
  // Use `absolute` to bypass the parent template (title already includes brand name)
  title: { absolute: title },
  description,
  alternates: buildAlternates(url),
  openGraph: buildOG({ title, description, url, urlLang: 'en' }),
  twitter: buildTwitter({ title, description }),
}

const jsonLd = buildHomePageJsonLd({
  title,
  description,
  url,
  inLanguage: 'en',
})

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppShell page="home" />
    </>
  )
}
