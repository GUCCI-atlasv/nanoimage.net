import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import MemeGeneratorTool from '@/components/tools/MemeGeneratorTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Meme Generator Online Free — Add Text to Photos | NanoImage',
    description: 'Create memes online for free. Add top and bottom text with customizable fonts, colors and styles. No upload needed — 100% private. Instant meme maker.',
    keywords: [
      'meme generator online free', 'create meme online',
      'add text to image free', 'meme maker no account',
      'meme creator no upload', 'add caption to photo',
      'custom meme free', 'meme generator no sign up',
      'text on photo online free', 'funny image caption maker',
    ],
    alternates: buildAlternates('/meme-generator', locale),
    openGraph: { url: locale === 'en' ? '/meme-generator' : `/${locale}/meme-generator` },
  };
}

export default async function MemeGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="meme-generator">
      <MemeGeneratorTool />
    </ToolPageLayout>
  );
}
