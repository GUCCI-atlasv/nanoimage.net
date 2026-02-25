import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ToolPageLayout from '@/components/ToolPageLayout';
import AddBorderTool from '@/components/tools/AddBorderTool';

export const metadata: Metadata = {
  title: 'Add Border to Image Online - Free Border Tool',
  description: 'Add border to image online for free. Choose border width, color, and style. Perfect for framing photos. No upload needed.',
  alternates: { canonical: '/add-border-to-image' },
  openGraph: { url: '/add-border-to-image' },
};

export default async function AddBorderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ToolPageLayout toolId="add-border-to-image">
      <AddBorderTool />
    </ToolPageLayout>
  );
}
