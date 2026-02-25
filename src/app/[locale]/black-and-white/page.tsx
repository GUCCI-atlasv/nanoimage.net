import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import BlackAndWhiteTool from '@/components/tools/BlackAndWhiteTool';

export const metadata: Metadata = {
  title: 'Make Image Black and White - Free Online Tool',
  description: 'Make image black and white online for free. Convert photos to grayscale with adjustable intensity. No upload needed — instant conversion in your browser.',
  alternates: { canonical: '/black-and-white' },
  openGraph: { url: '/black-and-white' },
};

export default async function BlackAndWhitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="black-and-white">
      <BlackAndWhiteTool />
    </ToolPageLayout>
  );
}
