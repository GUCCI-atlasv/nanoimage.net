import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

export const runtime = 'edge';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: '%s | NanoImage',
    default: 'Free Online Image Tools — Compress, Resize & Crop | NanoImage',
  },
  description:
    'Free online image tools — compress, resize, crop, rotate, blur & more. 100% private: no upload, no account needed. 13 tools, instant results, all in your browser.',
  metadataBase: new URL('https://www.nanoimage.net'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'pt-BR': '/pt-BR',
      'pt-PT': '/pt-PT',
      'es': '/es',
      'fr': '/fr',
      'ru': '/ru',
      'x-default': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    siteName: 'NanoImage',
    type: 'website',
    title: 'Free Online Image Tools — Compress, Resize & Crop | NanoImage',
    description: 'Edit images directly in your browser — no upload, no account, 100% private. Compress, resize, crop, rotate & more. Free forever.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NanoImage — Free Online Image Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Tools — Compress, Resize & Crop | NanoImage',
    description: 'Compress, resize, crop, rotate and edit images in your browser. Free, fast, and 100% private.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href={
            locale === 'ru'
              ? 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&family=PT+Sans:wght@400;700&display=swap'
              : 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap'
          }
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-bg text-text">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
