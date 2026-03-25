import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import CropTool from '@/components/tools/CropTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Crop Image Online Free — Custom & Preset Ratios | NanoImage',
    description: 'Crop images online with preset ratios (1:1, 16:9, 4:3) or custom selection. No upload needed — free and 100% private. Instant results in your browser.',
    keywords: [
      'crop image online free', 'crop image to 1:1 square',
      'crop image 16:9', 'crop image for instagram',
      'crop photo without upload', 'image cropper no account',
      'crop image to aspect ratio', 'crop photo free online',
      'custom crop image online', 'crop image to exact size',
    ],
    alternates: buildAlternates('/crop-image', locale),
    openGraph: { url: locale === 'en' ? '/crop-image' : `/${locale}/crop-image` },
  };
}

export default async function CropImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="crop-image">
      <CropTool />
    </ToolPageLayout>
  );
}
