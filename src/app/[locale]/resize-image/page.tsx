import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import ResizeTool from '@/components/tools/ResizeTool';

export const metadata: Metadata = {
  title: 'Resize Image Online - Free Image Resizer',
  description: 'Resize image online for free. Change image dimensions by pixels or percentage. Lock aspect ratio to prevent distortion. No upload needed.',
  alternates: { canonical: '/resize-image' },
  openGraph: { url: '/resize-image' },
};

export default async function ResizeImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="resize-image">
      <ResizeTool />
    </ToolPageLayout>
  );
}
