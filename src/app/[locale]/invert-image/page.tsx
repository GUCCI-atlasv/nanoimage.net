import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import InvertTool from '@/components/tools/InvertTool';

export const metadata: Metadata = {
  title: 'Invert Image Colors Online - Free Color Inversion Tool',
  description: 'Invert image colors online for free. Create negative photo effects with one click. No upload needed — instant color inversion in your browser.',
  alternates: { canonical: '/invert-image' },
  openGraph: { url: '/invert-image' },
};

export default async function InvertImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="invert-image">
      <InvertTool />
    </ToolPageLayout>
  );
}
