import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import MemeGeneratorTool from '@/components/tools/MemeGeneratorTool';

export const metadata: Metadata = {
  title: 'Meme Generator Online - Create Memes for Free',
  description: 'Create memes online for free. Add top and bottom text to any image with customizable fonts, colors, and styles. No upload needed.',
  alternates: { canonical: '/meme-generator' },
  openGraph: { url: '/meme-generator' },
};

export default async function MemeGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="meme-generator">
      <MemeGeneratorTool />
    </ToolPageLayout>
  );
}
