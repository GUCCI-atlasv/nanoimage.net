import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import ConvertToJpgTool from '@/components/tools/ConvertToJpgTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Convert PNG to JPG Online Free | NanoImage',
    description: 'Convert PNG, WebP, GIF, BMP to JPG online for free. Adjustable quality, no upload needed — instant conversion in your browser. Supports batch files.',
    keywords: [
      'convert png to jpg online free', 'convert webp to jpg free',
      'png to jpg converter', 'convert image to jpeg',
      'convert gif to jpg online', 'webp to jpg no upload',
      'png to jpg without losing quality', 'image format converter free',
    ],
    alternates: buildAlternates('/convert-to-jpg', locale),
    openGraph: { url: locale === 'en' ? '/convert-to-jpg' : `/${locale}/convert-to-jpg` },
  };
}

export default async function ConvertToJpgPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="convert-to-jpg">
      <ConvertToJpgTool />
    </ToolPageLayout>
  );
}
