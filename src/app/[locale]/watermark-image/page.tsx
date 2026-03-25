import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import WatermarkTool from '@/components/tools/WatermarkTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Add Watermark to Image Online Free | NanoImage',
    description: 'Add text or image watermark online for free. Custom position, size and opacity. No upload needed — protect your photos 100% privately. Instant results.',
    keywords: [
      'add watermark to image online free', 'watermark photo online free',
      'text watermark image', 'add logo to photo online',
      'protect photos watermark', 'watermark no upload',
      'add watermark free online', 'protect copyright photo online',
    ],
    alternates: buildAlternates('/watermark-image', locale),
    openGraph: { url: locale === 'en' ? '/watermark-image' : `/${locale}/watermark-image` },
  };
}

export default async function WatermarkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="watermark-image">
      <WatermarkTool />
    </ToolPageLayout>
  );
}
