import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import InvertTool from '@/components/tools/InvertTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Invert Image Colors Online Free | NanoImage',
    description: 'Invert image colors online for free. Create negative photo effects instantly with one click — no upload needed, 100% private. Works with JPG, PNG, WebP.',
    keywords: [
      'invert image colors online free', 'negative image effect',
      'invert photo colors online', 'reverse image colors',
      'color inversion free', 'invert image without upload',
      'negative photo effect free', 'invert colors no sign up',
    ],
    alternates: buildAlternates('/invert-image', locale),
    openGraph: { url: locale === 'en' ? '/invert-image' : `/${locale}/invert-image` },
  };
}

export default async function InvertImagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="invert-image">
      <InvertTool />
    </ToolPageLayout>
  );
}
