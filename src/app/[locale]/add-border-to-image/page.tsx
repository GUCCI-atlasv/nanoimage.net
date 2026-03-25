import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import AddBorderTool from '@/components/tools/AddBorderTool';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Add Border to Image Online Free | NanoImage',
    description: 'Add a border to images online for free. Choose border width and color. Perfect for framing photos — no upload needed, 100% private. Instant results.',
    keywords: [
      'add border to image online free', 'photo border online',
      'add white border instagram', 'image frame online',
      'add frame to photo free', 'photo border no upload',
      'custom border color image', 'add border photo no account',
      'border around photo free', 'frame photo online',
    ],
    alternates: buildAlternates('/add-border-to-image', locale),
    openGraph: { url: locale === 'en' ? '/add-border-to-image' : `/${locale}/add-border-to-image` },
  };
}

export default async function AddBorderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="add-border-to-image">
      <AddBorderTool />
    </ToolPageLayout>
  );
}
