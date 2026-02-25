import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import CompressTool from '@/components/tools/CompressTool';

export const metadata: Metadata = {
  title: 'Compress Image to 200KB - Free Online Tool',
  description: 'Compress image to 200KB or any target size online for free. No upload required — reduce image file size directly in your browser. Supports JPG, PNG, WebP.',
  alternates: { canonical: '/compress-image' },
  openGraph: { url: '/compress-image' },
};

export default async function CompressImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="compress-image">
      <CompressTool defaultTargetKB={200} />
    </ToolPageLayout>
  );
}
