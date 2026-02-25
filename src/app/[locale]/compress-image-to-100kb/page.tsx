import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import CompressTool from '@/components/tools/CompressTool';

export const metadata: Metadata = {
  title: 'Compress Image to 100KB - Free Online Tool',
  description: 'Compress image to 100KB online for free. Reduce image file size to under 100KB without losing quality. No upload, no registration — works in your browser.',
  alternates: { canonical: '/compress-image-to-100kb' },
  openGraph: { url: '/compress-image-to-100kb' },
};

export default async function CompressTo100KBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="compress-image-to-100kb">
      <CompressTool defaultTargetKB={100} />
    </ToolPageLayout>
  );
}
