import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import BlurTool from '@/components/tools/BlurTool';

export const metadata: Metadata = {
  title: 'Blur Image Online - Free Image Blur Tool',
  description: 'Blur image online for free. Apply Gaussian blur with adjustable intensity. Perfect for backgrounds and privacy. No upload needed.',
  alternates: { canonical: '/blur-image' },
  openGraph: { url: '/blur-image' },
};

export default async function BlurImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="blur-image">
      <BlurTool />
    </ToolPageLayout>
  );
}
