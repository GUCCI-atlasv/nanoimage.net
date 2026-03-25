import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import RotateTool from '@/components/tools/RotateTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Rotate Image Online Free — 90, 180, 270° | NanoImage',
    description: 'Rotate images 90°, 180°, 270° online for free. No upload needed — instant rotation in your browser. Supports JPG, PNG, WebP.',
    keywords: [
      'rotate image online free', 'rotate photo 90 degrees',
      'rotate image 90 180 270', 'fix sideways photo online',
      'rotate image without upload', 'turn photo right way up',
      'rotate jpg online free', 'rotate image no account',
      'rotate photo free', 'flip rotate image online',
    ],
    alternates: buildAlternates('/rotate-image', locale),
    openGraph: { url: locale === 'en' ? '/rotate-image' : `/${locale}/rotate-image` },
  };
}

export default async function RotateImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="rotate-image">
      <RotateTool />
    </ToolPageLayout>
  );
}
