'use client';

import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ toolId }: { toolId: string }) {
  const t = useTranslations(`tools.${toolId}`);

  const faqKeys = ['q1', 'q2', 'q3', 'q4'];
  const faqs: FAQItem[] = [];

  for (const key of faqKeys) {
    try {
      const q = t(`faq.${key}`);
      const a = t(`faq.${key.replace('q', 'a')}`);
      if (q && a) faqs.push({ question: q, answer: a });
    } catch {
      break;
    }
  }

  if (faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToJsonLd({ toolId }: { toolId: string }) {
  const t = useTranslations(`tools.${toolId}`);

  const steps = ['step1', 'step2', 'step3'];
  const stepTexts: string[] = [];

  for (const step of steps) {
    try {
      stepTexts.push(t(`howToUse.${step}`));
    } catch {
      break;
    }
  }

  if (stepTexts.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('h1'),
    description: t('metaDescription'),
    step: stepTexts.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HomeFAQJsonLd() {
  const t = useTranslations('home.faq');

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];
  const faqs: FAQItem[] = [];

  for (const key of faqKeys) {
    try {
      const q = t(key);
      const a = t(key.replace('q', 'a'));
      if (q && a && !q.includes('home.faq.')) faqs.push({ question: q, answer: a });
    } catch {
      break;
    }
  }

  if (faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ toolId }: { toolId: string }) {
  const t = useTranslations(`tools.${toolId}`);
  const slug = toolId;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nanoimage.net',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('name'),
        item: `https://nanoimage.net/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebApplicationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'NanoImage',
    url: 'https://nanoimage.net',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online image tools: compress, resize, crop, rotate, flip, blur, and more. All processing happens in your browser.',
    featureList: [
      'Compress images',
      'Resize images',
      'Crop images',
      'Rotate images',
      'Flip images',
      'Blur images',
      'Convert to JPG',
      'Convert to WebP',
      'Convert to PNG',
      'Add watermark',
      'Grayscale images',
      'Invert colors',
      'Make image meme',
    ],
    screenshot: 'https://nanoimage.net/og-image.png',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NanoImage',
    url: 'https://nanoimage.net',
    description: 'Free online image tools — compress, resize, crop, rotate, blur & more. 100% private, no upload needed.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nanoimage.net/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
