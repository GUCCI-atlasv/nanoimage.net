import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import CompressTool from '@/components/tools/CompressTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Compress Image Online Free — Reduce File Size | NanoImage',
    description: 'Compress JPG, PNG, WebP to any target size online for free. No upload needed — 100% private, instant results in your browser. Supports all formats.',
    keywords: [
      'compress image online free', 'compress image to 200kb',
      'compress image without losing quality', 'compress jpeg to 200kb',
      'compress image to 100kb', 'compress image without uploading',
      'reduce image size online free', 'compress photo free',
    ],
    alternates: buildAlternates('/compress-image', locale),
    openGraph: { url: locale === 'en' ? '/compress-image' : `/${locale}/compress-image` },
  };
}

export default async function CompressImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="compress-image">
      <CompressTool defaultTargetKB={200} />
    </ToolPageLayout>
  );
}
