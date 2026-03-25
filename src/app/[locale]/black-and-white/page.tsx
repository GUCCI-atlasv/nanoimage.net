import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import BlackAndWhiteTool from '@/components/tools/BlackAndWhiteTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Black and White Photo Converter Online Free | NanoImage',
    description: 'Convert photos to black and white online for free. Adjustable grayscale intensity, no upload needed — instant results in your browser. Supports all formats.',
    keywords: [
      'black and white photo converter', 'convert photo to grayscale',
      'black and white filter online', 'make image black and white free',
      'grayscale image online', 'convert photo black white no upload',
      'grayscale converter no account', 'desaturate image online',
    ],
    alternates: buildAlternates('/black-and-white', locale),
    openGraph: { url: locale === 'en' ? '/black-and-white' : `/${locale}/black-and-white` },
  };
}

export default async function BlackAndWhitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="black-and-white">
      <BlackAndWhiteTool />
    </ToolPageLayout>
  );
}
