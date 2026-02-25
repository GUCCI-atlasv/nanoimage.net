'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

export default function BlackAndWhiteTool() {
  const t = useTranslations('tools.black-and-white');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [intensity, setIntensity] = useState(100);
  const [result, setResult] = useState<string | null>(null);

  const applyGrayscale = useCallback((img: HTMLImageElement, pct: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const factor = pct / 100;

    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = data[i] + (gray - data[i]) * factor;
      data[i + 1] = data[i + 1] + (gray - data[i + 1]) * factor;
      data[i + 2] = data[i + 2] + (gray - data[i + 2]) * factor;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  }, []);

  useEffect(() => {
    if (image) {
      setResult(applyGrayscale(image, intensity));
    }
  }, [image, intensity, applyGrayscale]);

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
    setIntensity(100);
  }, []);

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div>
          <label htmlFor="bw-intensity" className="block label-mono mb-2">
            {t('intensity')}: {intensity}%
          </label>
          <input
            id="bw-intensity"
            type="range"
            min={0}
            max={100}
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="slider-accent"
            aria-label={`${t('intensity')}: ${intensity}%`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={intensity}
            aria-valuetext={`${intensity}%`}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIntensity(100)}
            className={`btn-tool transition-colors${intensity === 100 ? ' active' : ''}`}
          >
            100% B&W
          </button>
          <button
            onClick={() => setIntensity(50)}
            className={`btn-tool transition-colors${intensity === 50 ? ' active' : ''}`}
          >
            50%
          </button>
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
              <img src={result} alt="B&W" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-muted">{tc('preview')}</p>
            )}
          </div>
          {result && intensity > 0 && (
            <div className="mt-3 flex justify-end">
              <DownloadButton dataUrl={result} filename={`bw-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
