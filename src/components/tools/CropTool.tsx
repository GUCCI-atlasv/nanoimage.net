'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/ImageUploader';
import DownloadButton from '@/components/DownloadButton';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

type DragMode = 'none' | 'create' | 'move' | 'resize';
type HandlePos = 'tl' | 'tr' | 'bl' | 'br';

const MAX_DISPLAY_HEIGHT = 500;
const HANDLE_SIZE = 12;
const MIN_CROP = 10;

const RATIOS: Record<string, number | null> = {
  free: null,
  '1:1': 1,
  '4:3': 4 / 3,
  '16:9': 16 / 9,
  '2:3': 2 / 3,
};

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function handleCursorForHandle(handle: HandlePos | null): string {
  if (handle === 'tl' || handle === 'br') return 'nwse-resize';
  if (handle === 'tr' || handle === 'bl') return 'nesw-resize';
  return 'nwse-resize';
}

export default function CropTool() {
  const t = useTranslations('tools.crop-image');
  const tc = useTranslations('common');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('free');
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [dragMode, setDragMode] = useState<DragMode>('none');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragAnchor, setDragAnchor] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [activeHandle, setActiveHandle] = useState<HandlePos | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [cursor, setCursor] = useState('crosshair');

  useEffect(() => {
    if (!image || !wrapperRef.current) return;

    const calculateSize = () => {
      if (!wrapperRef.current) return;
      const availableWidth = wrapperRef.current.clientWidth;
      const scale = Math.min(availableWidth / image.naturalWidth, MAX_DISPLAY_HEIGHT / image.naturalHeight, 1);
      const dw = Math.round(image.naturalWidth * scale);
      const dh = Math.round(image.naturalHeight * scale);
      setDisplaySize({ width: dw, height: dh });
      setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [image]);

  const applyRatioToArea = useCallback((ratio: string, dw: number, dh: number): CropArea => {
    const r = RATIOS[ratio];
    if (!r) return { x: 0, y: 0, width: 0, height: 0 };

    let w: number, h: number;
    if (dw / dh > r) {
      h = dh;
      w = Math.round(h * r);
    } else {
      w = dw;
      h = Math.round(w / r);
    }
    return { x: Math.round((dw - w) / 2), y: Math.round((dh - h) / 2), width: w, height: h };
  }, []);

  const handleRatioChange = useCallback((newRatio: string) => {
    setAspectRatio(newRatio);
    if (displaySize.width > 0 && displaySize.height > 0) {
      setCropArea(applyRatioToArea(newRatio, displaySize.width, displaySize.height));
    }
  }, [displaySize, applyRatioToArea]);

  const getScaleFactor = useCallback(() => {
    if (!image || !displaySize.width) return 1;
    return image.naturalWidth / displaySize.width;
  }, [image, displaySize]);

  const getPointerPos = useCallback((clientX: number, clientY: number) => {
    const el = wrapperRef.current?.querySelector('[data-crop-canvas]');
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    return {
      x: clamp(clientX - rect.left, 0, displaySize.width),
      y: clamp(clientY - rect.top, 0, displaySize.height),
    };
  }, [displaySize]);

  const isInsideCrop = useCallback((px: number, py: number) => {
    if (cropArea.width < MIN_CROP || cropArea.height < MIN_CROP) return false;
    return (
      px >= cropArea.x && px <= cropArea.x + cropArea.width &&
      py >= cropArea.y && py <= cropArea.y + cropArea.height
    );
  }, [cropArea]);

  const getHandle = useCallback((px: number, py: number): HandlePos | null => {
    const hs = HANDLE_SIZE;
    const { x, y, width, height } = cropArea;
    if (width < MIN_CROP || height < MIN_CROP) return null;

    if (Math.abs(px - x) < hs && Math.abs(py - y) < hs) return 'tl';
    if (Math.abs(px - (x + width)) < hs && Math.abs(py - y) < hs) return 'tr';
    if (Math.abs(px - x) < hs && Math.abs(py - (y + height)) < hs) return 'bl';
    if (Math.abs(px - (x + width)) < hs && Math.abs(py - (y + height)) < hs) return 'br';
    return null;
  }, [cropArea]);

  const constrainCrop = useCallback((area: CropArea): CropArea => {
    let { x, y, width, height } = area;
    const r = RATIOS[aspectRatio];

    width = Math.max(MIN_CROP, width);
    height = Math.max(MIN_CROP, height);

    if (x + width > displaySize.width) width = displaySize.width - x;
    if (y + height > displaySize.height) height = displaySize.height - y;

    if (r) {
      if (width / height > r) {
        width = Math.round(height * r);
      } else {
        height = Math.round(width / r);
      }
      if (x + width > displaySize.width) {
        width = displaySize.width - x;
        height = Math.round(width / r);
      }
      if (y + height > displaySize.height) {
        height = displaySize.height - y;
        width = Math.round(height * r);
      }
    }

    x = clamp(x, 0, displaySize.width - width);
    y = clamp(y, 0, displaySize.height - height);

    return { x, y, width: Math.max(MIN_CROP, width), height: Math.max(MIN_CROP, height) };
  }, [aspectRatio, displaySize]);

  const handlePointerDown = useCallback((clientX: number, clientY: number) => {
    const pos = getPointerPos(clientX, clientY);
    const handle = getHandle(pos.x, pos.y);

    if (handle) {
      setDragMode('resize');
      setActiveHandle(handle);
      setDragStart(pos);
      setDragAnchor({ ...cropArea });
    } else if (isInsideCrop(pos.x, pos.y)) {
      setDragMode('move');
      setDragStart(pos);
      setDragAnchor({ ...cropArea });
    } else {
      setDragMode('create');
      setDragStart(pos);
      setCropArea({ x: pos.x, y: pos.y, width: 0, height: 0 });
    }
  }, [getPointerPos, getHandle, isInsideCrop, cropArea]);

  const handlePointerMoveRef = useRef<(clientX: number, clientY: number) => void>(() => {});
  handlePointerMoveRef.current = useCallback((clientX: number, clientY: number) => {
    if (dragMode === 'none') return;
    const pos = getPointerPos(clientX, clientY);

    if (dragMode === 'create') {
      const x1 = Math.min(dragStart.x, pos.x);
      const y1 = Math.min(dragStart.y, pos.y);
      let w = Math.abs(pos.x - dragStart.x);
      let h = Math.abs(pos.y - dragStart.y);
      const r = RATIOS[aspectRatio];
      if (r) {
        h = Math.round(w / r);
        if (dragStart.y + (pos.y >= dragStart.y ? h : -h) > displaySize.height || dragStart.y + (pos.y >= dragStart.y ? h : -h) < 0) {
          h = pos.y >= dragStart.y ? displaySize.height - dragStart.y : dragStart.y;
          w = Math.round(h * r);
        }
      }
      const newArea = {
        x: r ? (pos.x >= dragStart.x ? dragStart.x : dragStart.x - w) : x1,
        y: r ? (pos.y >= dragStart.y ? dragStart.y : dragStart.y - h) : y1,
        width: w,
        height: h,
      };
      setCropArea(constrainCrop(newArea));
    } else if (dragMode === 'move') {
      const dx = pos.x - dragStart.x;
      const dy = pos.y - dragStart.y;
      const newX = clamp(dragAnchor.x + dx, 0, displaySize.width - dragAnchor.width);
      const newY = clamp(dragAnchor.y + dy, 0, displaySize.height - dragAnchor.height);
      setCropArea({ ...dragAnchor, x: newX, y: newY });
    } else if (dragMode === 'resize' && activeHandle) {
      const anchor = dragAnchor;
      let x1: number, y1: number, x2: number, y2: number;

      if (activeHandle === 'tl') {
        x1 = pos.x; y1 = pos.y;
        x2 = anchor.x + anchor.width; y2 = anchor.y + anchor.height;
      } else if (activeHandle === 'tr') {
        x1 = anchor.x; y1 = pos.y;
        x2 = pos.x; y2 = anchor.y + anchor.height;
      } else if (activeHandle === 'bl') {
        x1 = pos.x; y1 = anchor.y;
        x2 = anchor.x + anchor.width; y2 = pos.y;
      } else {
        x1 = anchor.x; y1 = anchor.y;
        x2 = pos.x; y2 = pos.y;
      }

      const w = Math.abs(x2 - x1);
      const nx = Math.min(x1, x2);
      const ny = Math.min(y1, y2);
      const r = RATIOS[aspectRatio];
      const h = r ? Math.round(w / r) : Math.abs(y2 - y1);

      setCropArea(constrainCrop({ x: nx, y: ny, width: w, height: h }));
    }
  }, [dragMode, dragStart, dragAnchor, activeHandle, aspectRatio, displaySize, getPointerPos, constrainCrop]);

  const handlePointerUpRef = useRef<() => void>(() => {});
  handlePointerUpRef.current = useCallback(() => {
    setDragMode('none');
    setActiveHandle(null);
  }, []);

  // Document-level listeners for drag (Bug C fix: mouseLeave no longer cancels drag)
  useEffect(() => {
    if (dragMode === 'none') return;

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handlePointerMoveRef.current(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      handlePointerUpRef.current();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      e.preventDefault();
      handlePointerMoveRef.current(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      handlePointerUpRef.current();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [dragMode]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handlePointerDown(e.clientX, e.clientY);
  }, [handlePointerDown]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
  }, [handlePointerDown]);

  const handleCrop = useCallback(() => {
    if (!image) return;
    const scale = getScaleFactor();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const sx = cropArea.x * scale;
    const sy = cropArea.y * scale;
    const sw = cropArea.width * scale;
    const sh = cropArea.height * scale;

    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    setResult(canvas.toDataURL('image/png'));
  }, [image, cropArea, getScaleFactor]);

  const handleImageLoad = useCallback((img: HTMLImageElement, f: File) => {
    setImage(img);
    setFile(f);
    setResult(null);
    setAspectRatio('free');
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setAspectRatio('free');
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
  }, []);

  const handleNewUpload = useCallback(() => {
    setImage(null);
    setFile(null);
    setResult(null);
    setDisplaySize({ width: 0, height: 0 });
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    setAspectRatio('free');
  }, []);

  const getHoverCursor = useCallback((clientX: number, clientY: number) => {
    const pos = getPointerPos(clientX, clientY);
    const handle = getHandle(pos.x, pos.y);
    if (handle) return handleCursorForHandle(handle);
    if (isInsideCrop(pos.x, pos.y)) return 'move';
    return 'crosshair';
  }, [getPointerPos, getHandle, isInsideCrop]);

  const handleHoverCursor = useCallback((e: React.MouseEvent) => {
    if (dragMode === 'none') {
      setCursor(getHoverCursor(e.clientX, e.clientY));
    }
  }, [dragMode, getHoverCursor]);

  const getDragCursor = (): string => {
    if (dragMode === 'move') return 'move';
    if (dragMode === 'resize') return handleCursorForHandle(activeHandle);
    if (dragMode === 'create') return 'crosshair';
    return cursor;
  };

  if (!image) {
    return <ImageUploader onImageLoad={handleImageLoad} />;
  }

  const ratioOptions = [
    { value: 'free', label: t('freeform') },
    { value: '1:1', label: t('square') },
    { value: '4:3', label: t('landscape43') },
    { value: '16:9', label: t('landscape169') },
    { value: '2:3', label: t('portrait23') },
  ];

  const hasCrop = cropArea.width >= MIN_CROP && cropArea.height >= MIN_CROP;
  const cropSizeInfo = hasCrop
    ? `${Math.round(cropArea.width * getScaleFactor())} × ${Math.round(cropArea.height * getScaleFactor())} px`
    : '';

  const outputFilename = `cropped-${(file?.name || 'image.png').replace(/\.[^.]+$/, '')}.png`;

  return (
    <div className="space-y-6">
      <div className="panel-card space-y-4">
        <div>
          <label className="block label-mono mb-2">{t('aspectRatio')}</label>
          <div className="flex flex-wrap gap-2">
            {ratioOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleRatioChange(opt.value)}
                className={`btn-tool${aspectRatio === opt.value ? ' active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {cropSizeInfo && (
          <p className="font-mono text-[11px] text-muted">
            {tc('dimensions')}: {cropSizeInfo}
          </p>
        )}

        {!hasCrop && (
          <p className="font-mono text-[11px] text-muted">
            {t('dragToSelect')}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCrop}
            className="btn-primary"
            disabled={!hasCrop}
          >
            {tc('apply')}
          </button>
          <button onClick={handleReset} className="btn-secondary">
            {tc('reset')}
          </button>
          <button onClick={handleNewUpload} className="btn-secondary">
            {tc('uploadNew')}
          </button>
        </div>
      </div>

      <div ref={wrapperRef} className="w-full">
        <p className="font-mono text-[11px] text-muted mb-2">{t('cropArea')}</p>
        <div
          data-crop-canvas
          className="relative select-none inline-block"
          style={{ width: displaySize.width, height: displaySize.height, cursor: dragMode !== 'none' ? getDragCursor() : cursor }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleHoverCursor}
          onTouchStart={handleTouchStart}
        >
          <img
            src={image.src}
            alt="Crop source"
            style={{ width: displaySize.width, height: displaySize.height }}
            draggable={false}
            className="block"
          />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
          {hasCrop && (
            <div
              className="absolute border-2 border-accent pointer-events-none"
              style={{
                left: cropArea.x,
                top: cropArea.y,
                width: cropArea.width,
                height: cropArea.height,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                background: 'transparent',
              }}
            >
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-accent border border-bg" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-accent border border-bg" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-accent border border-bg" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-accent border border-bg" />
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="label-mono mb-2">{tc('result')}</h3>
          <div className="bg-bg rounded-lg overflow-hidden inline-block">
            <img src={result} alt="Cropped" className="max-w-full max-h-96 object-contain" />
          </div>
          <div className="mt-3 flex justify-end">
            <DownloadButton dataUrl={result} filename={outputFilename} />
          </div>
        </div>
      )}
    </div>
  );
}
