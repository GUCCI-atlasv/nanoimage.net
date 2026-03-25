import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import BlurTool from '@/components/tools/BlurTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Blur Image Online Free — Adjustable Gaussian Blur | NanoImage',
    description: 'Blur images online for free. Adjustable Gaussian blur for backgrounds and privacy. No upload needed — instant results in your browser.',
    keywords: [
      'blur image online free', 'blur background online',
      'gaussian blur online', 'blur photo free',
      'blur image for privacy', 'blur face in photo online',
      'blur image without upload', 'blur background photo free',
      'blur part of image online', 'blur image no account',
    ],
    alternates: buildAlternates('/blur-image', locale),
    openGraph: { url: locale === 'en' ? '/blur-image' : `/${locale}/blur-image` },
  };
}

export default async function BlurImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="blur-image">
      <BlurTool />
    </ToolPageLayout>
  );
}
