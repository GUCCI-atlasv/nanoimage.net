import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import RotateTool from '@/components/tools/RotateTool';

export const metadata: Metadata = {
  title: 'Rotate Image Online - Free Image Rotation Tool',
  description: 'Rotate image online for free. Rotate photos 90°, 180°, 270° or any custom angle. No upload needed — instant rotation in your browser.',
  alternates: { canonical: '/rotate-image' },
  openGraph: { url: '/rotate-image' },
};

export default async function RotateImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="rotate-image">
      <RotateTool />
    </ToolPageLayout>
  );
}
