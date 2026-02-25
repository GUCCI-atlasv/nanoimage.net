import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import WatermarkTool from '@/components/tools/WatermarkTool';

export const metadata: Metadata = {
  title: 'Add Watermark to Image Online - Free Watermark Tool',
  description: 'Add watermark to image online for free. Text or image watermark with customizable position, size, and opacity. No upload needed.',
  alternates: { canonical: '/watermark-image' },
  openGraph: { url: '/watermark-image' },
};

export default async function WatermarkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="watermark-image">
      <WatermarkTool />
    </ToolPageLayout>
  );
}
