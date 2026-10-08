
import { GIFEncoder, quantize, applyPalette } from './gifenc/gifenc.esm.js';

const PRESETS = {
  discord: { label: 'Discord (~8MB)', maxBytes: 8 * 1024 * 1024 },
  '10mb': { label: '10 MB', maxBytes: 10 * 1024 * 1024 },
  '5mb': { label: '5 MB', maxBytes: 5 * 1024 * 1024 },
  '512kb': { label: '512 KB', maxBytes: 512 * 1024 },
  '256kb': { label: '256 KB', maxBytes: 256 * 1024 },
  custom: { label: 'Custom', maxBytes: null },
};

const state = { file: null, frames: [], width: 0, height: 0, delays: [], resultUrl: null };

const $ = (sel) => document.querySelector(sel);
const fmtBytes = (n) => n < 1024 ? n + ' B' : n < 1048576 ? (n/1024).toFixed(1)+' KB' : (n/1048576).toFixed(2)+' MB';

function setStatus(msg, isError) {
  const el = $('#gc-status');
  if (!el) return;
  el.textContent = msg || '';
  el.classList.toggle('gc-error', !!isError);
}

function decodeGif(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const reader = new GifReader(bytes);
  const w = reader.width, h = reader.height;
  const frames = [], delays = [];
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  // Compose frames with simple disposal handling via full RGBA blit
  const composed = ctx.createImageData(w, h);
  for (let i = 0; i < reader.numFrames(); i++) {
    const info = reader.frameInfo(i);
    delays.push(Math.max(20, (info.delay || 10) * 10));
    const pixels = new Uint8ClampedArray(w * h * 4);
    reader.decodeAndBlitFrameRGBA(i, pixels);
    // overlay onto composed
    for (let p = 0; p < pixels.length; p += 4) {
      if (pixels[p+3] === 0) continue;
      composed.data[p] = pixels[p];
      composed.data[p+1] = pixels[p+1];
      composed.data[p+2] = pixels[p+2];
      composed.data[p+3] = pixels[p+3];
    }
    frames.push(new ImageData(new Uint8ClampedArray(composed.data), w, h));
    if (info.disposal === 2) {
      // clear frame region — approximate clear all
      composed.data.fill(0);
    }
  }
  return { width: w, height: h, frames, delays };
}

function scaleImageData(imageData, tw, th) {
  const c1 = document.createElement('canvas');
  c1.width = imageData.width; c1.height = imageData.height;
  c1.getContext('2d').putImageData(imageData, 0, 0);
  const c2 = document.createElement('canvas');
  c2.width = tw; c2.height = th;
  const ctx = c2.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(c1, 0, 0, tw, th);
  return ctx.getImageData(0, 0, tw, th);
}

function encodeGif(frames, delays, opts) {
  const encoder = GIFEncoder();
  const skip = Math.max(1, opts.frameSkip | 0);
  const { width: tw, height: th, colors } = opts;
  for (let i = 0; i < frames.length; i += skip) {
    let frame = frames[i];
    if (frame.width !== tw || frame.height !== th) frame = scaleImageData(frame, tw, th);
    const palette = quantize(frame.data, colors, { format: 'rgb565' });
    const indexed = applyPalette(frame.data, palette);
    encoder.writeFrame(indexed, tw, th, { palette, delay: delays[i] || 100, repeat: 0 });
  }
  encoder.finish();
  return new Blob([encoder.bytes()], { type: 'image/gif' });
}

async function compressToTarget() {
  if (!state.frames.length) return;
  const presetKey = $('#gc-preset').value;
  const preset = PRESETS[presetKey];
  let maxBytes = preset.maxBytes;
  if (presetKey === 'custom') {
    const kb = Number($('#gc-custom-kb').value || 0);
    maxBytes = kb > 0 ? kb * 1024 : null;
  }
  const scale = Number($('#gc-scale').value) / 100;
  const frameSkip = Number($('#gc-frame-skip').value);
  let colors = Number($('#gc-colors').value);
  let width = Math.max(16, Math.round(state.width * scale));
  let height = Math.max(16, Math.round(state.height * scale));
  width -= width % 2; height -= height % 2;

  setStatus('Compressing locally…');
  $('#gc-download').hidden = true;
  if (state.resultUrl) URL.revokeObjectURL(state.resultUrl);

  let blob = null;
  const colorSteps = maxBytes ? [...new Set([colors, Math.min(colors, 128), 64, 32])] : [colors];
  const scaleSteps = maxBytes ? [1, 0.85, 0.7, 0.55] : [1];
  const skipSteps = maxBytes ? [...new Set([frameSkip, Math.max(frameSkip, 2), Math.max(frameSkip, 3)])] : [frameSkip];

  outer: for (const sMul of scaleSteps) {
    for (const skip of skipSteps) {
      for (const c of colorSteps) {
        const tw = Math.max(16, Math.round(width * sMul) - (Math.round(width * sMul) % 2));
        const th = Math.max(16, Math.round(height * sMul) - (Math.round(height * sMul) % 2));
        blob = encodeGif(state.frames, state.delays, { width: tw, height: th, colors: c, frameSkip: skip });
        if (!maxBytes || blob.size <= maxBytes) break outer;
      }
    }
  }

  const origSize = state.file ? state.file.size : 0;
  const keptOriginal = !!(origSize && blob.size >= origSize);
  if (keptOriginal) blob = state.file;

  state.resultUrl = URL.createObjectURL(blob);
  const preview = $('#gc-preview-after');
  preview.src = state.resultUrl; preview.hidden = false;
  $('#gc-after-size').textContent = fmtBytes(blob.size);
  const dl = $('#gc-download');
  dl.hidden = false; dl.href = state.resultUrl;
  const base = (state.file?.name || 'image').replace(/\.gif$/i, '');
  dl.download = keptOriginal ? (state.file?.name || 'image.gif') : (base + '-compressed.gif');
  if (keptOriginal) {
    const zh = (document.documentElement.lang || '').toLowerCase().startsWith('zh');
    setStatus(zh
      ? `已是最优，保留原图（${fmtBytes(origSize)}）`
      : `Already optimized — kept original (${fmtBytes(origSize)}).`);
  } else {
    const ratio = origSize ? Math.round((1 - blob.size / origSize) * 100) : 0;
    let msg = `Done — ${fmtBytes(blob.size)} (${ratio}% smaller).`;
    if (maxBytes && blob.size > maxBytes) msg += ` Still above target (${fmtBytes(maxBytes)}). Try a smaller scale.`;
    setStatus(msg);
  }
}

async function onFile(file) {
  if (!file || (file.type !== 'image/gif' && !/\.gif$/i.test(file.name))) {
    setStatus('Please choose a GIF file.', true); return;
  }
  state.file = file;
  $('#gc-before-size').textContent = fmtBytes(file.size);
  $('#gc-filename').textContent = file.name;
  setStatus('Reading GIF…');
  try {
    const decoded = decodeGif(await file.arrayBuffer());
    state.frames = decoded.frames; state.delays = decoded.delays;
    state.width = decoded.width; state.height = decoded.height;
    const c = document.createElement('canvas');
    c.width = decoded.width; c.height = decoded.height;
    c.getContext('2d').putImageData(decoded.frames[0], 0, 0);
    $('#gc-preview-before').src = c.toDataURL('image/png');
    $('#gc-preview-before').hidden = false;
    $('#gc-meta').textContent = `${decoded.width}×${decoded.height} · ${decoded.frames.length} frames`;
    setStatus(`Loaded ${decoded.frames.length} frames. Pick a preset and compress.`);
    $('#gc-actions').hidden = false;
  } catch (err) {
    console.error(err);
    setStatus('Could not decode this GIF. Try another file.', true);
  }
}

function bind() {
  const drop = $('#gc-drop'), input = $('#gc-file');
  drop.addEventListener('click', () => input.click());
  drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('drag'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('drag'));
  drop.addEventListener('drop', (e) => {
    e.preventDefault(); drop.classList.remove('drag');
    const f = e.dataTransfer.files?.[0]; if (f) onFile(f);
  });
  input.addEventListener('change', () => { const f = input.files?.[0]; if (f) onFile(f); });
  $('#gc-preset').addEventListener('change', () => {
    $('#gc-custom-wrap').hidden = $('#gc-preset').value !== 'custom';
  });
  $('#gc-compress').addEventListener('click', () => {
    Promise.resolve().then(compressToTarget).catch((e) => setStatus('Compression failed: ' + (e.message || e), true));
  });
}

bind();
