'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

export default function FlipTool() {
  const t = useTranslations('tools.flip-image');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const applyFlip = useCallback((img: HTMLImageElement, h: boolean, v: boolean) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;

    ctx.translate(h ? canvas.width : 0, v ? canvas.height : 0);
    ctx.scale(h ? -1 : 1, v ? -1 : 1);
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL('image/png');
  }, []);

  useEffect(() => {
    if (image && (flipH || flipV)) {
      setResult(applyFlip(image, flipH, flipV));
    } else {
      setResult(null);
    }
  }, [image, flipH, flipV, applyFlip]);

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
    setFlipH(false);
    setFlipV(false);
  }, []);

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFlipH(!flipH)}
            className={`btn-tool transition-colors${flipH ? ' active' : ''}`}
          >
            ↔ {t('horizontal')}
          </button>
          <button
            onClick={() => setFlipV(!flipV)}
            className={`btn-tool transition-colors${flipV ? ' active' : ''}`}
          >
            ↕ {t('vertical')}
          </button>
          <button
            onClick={() => {
              if (flipH && flipV) {
                setFlipH(false);
                setFlipV(false);
              } else {
                setFlipH(true);
                setFlipV(true);
              }
            }}
            className={`btn-tool transition-colors${flipH && flipV ? ' active' : ''}`}
          >
            ⟳ {t('both')}
          </button>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setFlipH(false); setFlipV(false); }} className="btn-secondary">{tc('reset')}</button>
          <button onClick={() => { setImage(null); setFile(null); setResult(null); }} className="btn-secondary">{tc('uploadImage')}</button>
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
              <img src={result} alt="Flipped" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-muted">{tc('preview')}</p>
            )}
          </div>
          {result && (
            <div className="mt-3 flex justify-end">
              <DownloadButton dataUrl={result} filename={`flipped-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
