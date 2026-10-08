/**
 * Global 404 page — rendered when no route matches.
 * In static export this generates out/404.html.
 *
 * Because app/layout.tsx has been removed in favour of multiple root layouts
 * (app/(en)/layout.tsx and app/[lang]/layout.tsx), this file imports its own
 * CSS and wraps children in I18nProvider so it stays fully styled.
 */
import type { Metadata } from 'next'
import '@/src/index.css'
import '@/src/App.css'
import AppShell from '@/components/AppShell'
import { I18nProvider } from '@/src/i18n'

/**
 * Bing Webmaster flagged out/404.html for a missing <title> and missing meta
 * description (2 × High severity, 2026-08-07). The page is already `noindex`,
 * so this is about crawler hygiene rather than ranking — but an untitled page
 * is also what a user sees in their browser tab and history.
 *
 * NOTE: app/layout.tsx was removed in favour of route-group root layouts, so
 * this file is rendered by a Next-generated minimal root. Verify after
 * `npm run build` that out/404.html now contains <title> and the description;
 * if Next ignores metadata here, the fallback is to add a not-found.tsx inside
 * app/(en)/ so it inherits that group's root layout.
 */
export const metadata: Metadata = {
  title: 'Page Not Found (404) | NanoImage',
  description:
    'This NanoImage page could not be found. Browse 28 free image tools — compress, resize, crop, convert, and edit images entirely in your browser.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <I18nProvider>
      <AppShell page="not-found" />
    </I18nProvider>
  )
}
