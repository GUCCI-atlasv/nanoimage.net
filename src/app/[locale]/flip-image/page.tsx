import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import FlipTool from '@/components/tools/FlipTool';

export const metadata: Metadata = {
  title: 'Flip Image Online - Mirror Image Horizontally or Vertically',
  description: 'Flip image online for free. Mirror photos horizontally or vertically with one click. No upload needed — instant flip in your browser.',
  alternates: { canonical: '/flip-image' },
  openGraph: { url: '/flip-image' },
};

export default async function FlipImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="flip-image">
      <FlipTool />
    </ToolPageLayout>
  );
}
