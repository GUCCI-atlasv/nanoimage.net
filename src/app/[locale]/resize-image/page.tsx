import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import ResizeTool from '@/components/tools/ResizeTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Resize Image Online Free — Change Size Instantly | NanoImage',
    description: 'Resize images by pixels or percentage online for free. Lock aspect ratio, no upload needed — instant results in your browser. Supports JPG, PNG, WebP.',
    keywords: [
      'resize image online free', 'resize image without losing quality',
      'resize image for instagram', 'resize image to specific size',
      'resize image to 1mb', 'image resizer no upload',
      'change image dimensions online', 'resize image without upload',
    ],
    alternates: buildAlternates('/resize-image', locale),
    openGraph: { url: locale === 'en' ? '/resize-image' : `/${locale}/resize-image` },
  };
}

export default async function ResizeImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="resize-image">
      <ResizeTool />
    </ToolPageLayout>
  );
}
