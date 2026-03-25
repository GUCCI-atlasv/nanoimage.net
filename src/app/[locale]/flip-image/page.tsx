import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import FlipTool from '@/components/tools/FlipTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Flip Image Online Free — Mirror Horizontally or Vertically | NanoImage',
    description: 'Flip or mirror images online for free. Horizontal or vertical flip with one click. No upload needed — instant results in your browser.',
    keywords: [
      'flip image online free', 'mirror image online',
      'flip photo horizontally', 'flip image vertically',
      'reverse image mirror', 'flip image without upload',
      'horizontal flip photo online', 'mirror photo online free',
      'flip image no sign up', 'mirror selfie online',
    ],
    alternates: buildAlternates('/flip-image', locale),
    openGraph: { url: locale === 'en' ? '/flip-image' : `/${locale}/flip-image` },
  };
}

export default async function FlipImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="flip-image">
      <FlipTool />
    </ToolPageLayout>
  );
}
