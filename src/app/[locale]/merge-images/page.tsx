import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import MergeImagesTool from '@/components/tools/MergeImagesTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Merge Images Online Free — Combine Photos, No Upload | NanoImage',
    description:
      'Merge 2-10 images horizontally or vertically in your browser. Free image joiner — no upload, no account, no watermark. Adjust borders, spacing, and output format.',
    keywords: [
      'merge images online free',
      'combine photos online',
      'merge images online no upload',
      'image joiner online free',
      'combine two images side by side',
      'merge photos horizontally',
      'merge images vertically online',
      'stitch images together online free',
      'join photos into one image',
      'combine screenshots into one image',
    ],
    alternates: buildAlternates('/merge-images', locale),
    openGraph: { url: locale === 'en' ? '/merge-images' : `/${locale}/merge-images` },
  };
}

export default async function MergeImagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="merge-images">
      <MergeImagesTool />
    </ToolPageLayout>
  );
}
