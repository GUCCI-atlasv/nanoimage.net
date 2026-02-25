import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import CropTool from '@/components/tools/CropTool';

export const metadata: Metadata = {
  title: 'Crop Image Online - Free Image Cropping Tool',
  description: 'Crop image online for free. Select any area, use preset aspect ratios like 1:1, 4:3, 16:9, or enter custom dimensions. No upload required.',
  alternates: { canonical: '/crop-image' },
  openGraph: { url: '/crop-image' },
};

export default async function CropImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="crop-image">
      <CropTool />
    </ToolPageLayout>
  );
}
