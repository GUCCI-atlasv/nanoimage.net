import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FeedbackForm from '@/components/FeedbackForm';

export const metadata: Metadata = {
  title: 'Send Feedback — NanoImage',
  description: 'Have a suggestion or found a bug? Send us feedback — we read every message.',
  alternates: { canonical: '/feedback' },
};

export default async function FeedbackPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FeedbackForm />;
}
