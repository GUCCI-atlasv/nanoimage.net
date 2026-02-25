'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

export default function BlurTool() {
  const t = useTranslations('tools.blur-image');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [blurRadius, setBlurRadius] = useState(5);
  const [result, setResult] = useState<string | null>(null);

  const applyBlur = useCallback((img: HTMLImageElement, radius: number) => {
    const pad = radius * 3;

    const bigCanvas = document.createElement('canvas');
    bigCanvas.width = img.naturalWidth + pad * 2;
    bigCanvas.height = img.naturalHeight + pad * 2;
    const bigCtx = bigCanvas.getContext('2d')!;
    bigCtx.filter = `blur(${radius}px)`;
    bigCtx.drawImage(img, pad, pad);

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(bigCanvas, pad, pad, img.naturalWidth, img.naturalHeight, 0, 0, img.naturalWidth, img.naturalHeight);
    return canvas.toDataURL('image/png');
  }, []);

  useEffect(() => {
    if (image) {
      setResult(applyBlur(image, blurRadius));
    }
  }, [image, blurRadius, applyBlur]);

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
    setBlurRadius(5);
  }, []);

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div>
          <label htmlFor="blur-radius" className="block label-mono mb-2">
            {t('blurRadius')}: {blurRadius}px
          </label>
          <input
            id="blur-radius"
            type="range"
            min={1}
            max={20}
            value={blurRadius}
            onChange={(e) => setBlurRadius(parseInt(e.target.value))}
            className="slider-accent"
            aria-label={`${t('blurRadius')}: ${blurRadius}px`}
            aria-valuemin={1}
            aria-valuemax={20}
            aria-valuenow={blurRadius}
            aria-valuetext={`${blurRadius}px`}
          />
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setImage(null); setFile(null); setResult(null); }} className="btn-secondary">
            {tc('reset')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="label-mono mb-2">{tc('original')}</h3>
          <div className="aspect-video bg-bg rounded-lg overflow-hidden flex items-center justify-center">
            <img src={image.src} alt="Original" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="label-mono mb-2">{tc('result')}</h3>
          <div className="aspect-video bg-bg rounded-lg overflow-hidden flex items-center justify-center">
            {result ? (
              <img src={result} alt="Blurred" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-muted">{tc('preview')}</p>
            )}
          </div>
          {result && (
            <div className="mt-3 flex justify-end">
              <DownloadButton dataUrl={result} filename={`blurred-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
