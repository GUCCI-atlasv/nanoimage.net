'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

export default function RotateTool() {
  const t = useTranslations('tools.rotate-image');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const rotateImage = useCallback((img: HTMLImageElement, deg: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const rad = (deg * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));

    canvas.width = Math.round(img.naturalWidth * cos + img.naturalHeight * sin);
    canvas.height = Math.round(img.naturalWidth * sin + img.naturalHeight * cos);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    return canvas.toDataURL('image/png');
  }, []);

  useEffect(() => {
    if (image) {
      setResult(rotateImage(image, angle));
    }
  }, [image, angle, rotateImage]);

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
    setAngle(0);
  }, []);

  const handleReset = useCallback(() => {
    setAngle(0);
  }, []);

  const handleNewUpload = useCallback(() => {
    setImage(null);
    setFile(null);
    setResult(null);
    setAngle(0);
  }, []);

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div className="flex flex-wrap gap-3">
          {[90, 180, 270].map((deg) => (
            <button
              key={deg}
              onClick={() => setAngle(deg)}
              className={`btn-tool transition-colors${angle === deg ? ' active' : ''}`}
            >
              {deg}°
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="rotate-angle" className="block label-mono mb-2">
            {t('custom')}: {angle}°
          </label>
          <input
            id="rotate-angle"
            type="range"
            min={-180}
            max={180}
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="slider-accent"
            aria-valuemin={-180}
            aria-valuemax={180}
            aria-valuenow={angle}
            aria-valuetext={`${angle}°`}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadNew')}
          </button>
        </div>
      </div>

      {/* Preview */}
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
              <img src={result} alt="Rotated" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-muted">{tc('preview')}</p>
            )}
          </div>
          {result && (
            <div className="mt-3 flex justify-end">
              <DownloadButton
                dataUrl={result}
                filename={`rotated-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
