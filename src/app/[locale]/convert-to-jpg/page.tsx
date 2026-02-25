import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import ConvertToJpgTool from '@/components/tools/ConvertToJpgTool';

export const metadata: Metadata = {
  title: 'Convert PNG to JPG Online - Free Format Converter',
  description: 'Convert PNG to JPG online for free. Also supports WebP, GIF, BMP to JPG conversion. Adjustable quality, batch processing. No upload needed.',
  alternates: { canonical: '/convert-to-jpg' },
  openGraph: { url: '/convert-to-jpg' },
};

export default async function ConvertToJpgPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="convert-to-jpg">
      <ConvertToJpgTool />
    </ToolPageLayout>
  );
}
