'use client';

import { useTranslations } from 'next-intl';

interface DownloadButtonProps {
  dataUrl: string | null;
  filename?: string;
  className?: string;
}

export default function DownloadButton({ dataUrl, filename = 'nanoimage-output.jpg', className = '' }: DownloadButtonProps) {
  const t = useTranslations('common');

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!dataUrl}
      className={`btn-primary flex items-center gap-2 ${className}`}
    >
      <span className="font-mono text-[11px]">↓</span>
      <span>{t('download')}</span>
    </button>
  );
}
