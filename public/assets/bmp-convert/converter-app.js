/**
 * JPG/JPEG → BMP converter (local browser).
 * Uncompressed 24-bit BMP (BGR, bottom-up). Config: window.__BMP_CONVERT__ = { maxFiles: 20 }
 */
(function () {
  const cfg = Object.assign({ maxFiles: 20 }, window.__BMP_CONVERT__ || {});
  const ACCEPT = 'image/jpeg,.jpg,.jpeg,.jfif';
  const FILTER = (f) =>
    /image\/jpeg/i.test(f.type) || /\.(jpe?g|jfif)$/i.test(f.name);

  const $ = (sel) => document.querySelector(sel);
  const fmt = (n) =>
    n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(1) + ' KB' : (n / 1048576).toFixed(2) + ' MB';

  const state = { files: [], results: [] };

  function setStatus(msg, isError) {
    const el = $('#wc-status');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('wc-error', !!isError);
  }

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Could not decode ' + file.name));
      };
      img.src = url;
    });
  }

  /** Canvas → uncompressed 24-bit BMP Blob (no alpha; white behind transparency). */
  function toBmpBlob(img) {
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    // Opaque white backdrop so JPEG/EXIF-stripped redraw has no alpha surprises
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);
    const rgba = imageData.data;

    const rowSize = Math.floor((width * 3 + 3) / 4) * 4; // pad to 4 bytes
    const pixelSize = rowSize * height;
    const fileSize = 14 + 40 + pixelSize;
    const buf = new ArrayBuffer(fileSize);
    const view = new DataView(buf);
    const u8 = new Uint8Array(buf);

    // BITMAPFILEHEADER
    view.setUint16(0, 0x4d42, true); // 'BM'
    view.setUint32(2, fileSize, true);
    view.setUint32(6, 0, true);
    view.setUint32(10, 54, true); // pixel offset

    // BITMAPINFOHEADER
    view.setUint32(14, 40, true);
    view.setInt32(18, width, true);
    view.setInt32(22, height, true); // positive = bottom-up
    view.setUint16(26, 1, true); // planes
    view.setUint16(28, 24, true); // bpp
    view.setUint32(30, 0, true); // BI_RGB
    view.setUint32(34, pixelSize, true);
    view.setInt32(38, 2835, true); // ~72 DPI
    view.setInt32(42, 2835, true);
    view.setUint32(46, 0, true);
    view.setUint32(50, 0, true);

    // Pixels bottom-up, BGR
    let offset = 54;
    for (let y = height - 1; y >= 0; y--) {
      const rowStart = y * width * 4;
      for (let x = 0; x < width; x++) {
        const i = rowStart + x * 4;
        u8[offset++] = rgba[i + 2]; // B
        u8[offset++] = rgba[i + 1]; // G
        u8[offset++] = rgba[i]; // R
      }
      const pad = rowSize - width * 3;
      for (let p = 0; p < pad; p++) u8[offset++] = 0;
    }

    return new Blob([buf], { type: 'image/bmp' });
  }

  function baseName(name) {
    return name.replace(/\.[^.]+$/, '') || 'image';
  }

  function renderList() {
    const list = $('#wc-list');
    if (!list) return;
    list.innerHTML = '';
    state.files.forEach((f, i) => {
      const row = document.createElement('div');
      row.className = 'wc-row';
      row.innerHTML =
        '<span class="wc-name"></span><span class="wc-size"></span><button type="button" data-i="' +
        i +
        '" class="wc-remove" aria-label="Remove">×</button>';
      row.querySelector('.wc-name').textContent = f.name;
      row.querySelector('.wc-size').textContent = fmt(f.size);
      list.appendChild(row);
    });
    $('#wc-actions').hidden = state.files.length === 0;
    $('#wc-count').textContent = state.files.length ? state.files.length + ' file(s)' : '';
  }

  function addFiles(fileList) {
    const incoming = Array.from(fileList || []).filter(FILTER);
    if (!incoming.length) {
      setStatus('Please choose JPG/JPEG files.', true);
      return;
    }
    state.files = state.files.concat(incoming).slice(0, cfg.maxFiles);
    state.results = [];
    $('#wc-download').hidden = true;
    const zipBtn = $('#wc-download-zip');
    if (zipBtn) zipBtn.hidden = true;
    setStatus('');
    renderList();
    const first = state.files[0];
    if (first) {
      const url = URL.createObjectURL(first);
      const img = $('#wc-preview');
      img.src = url;
      img.hidden = false;
      img.onload = () => URL.revokeObjectURL(url);
    }
  }

  function crc32(buf) {
    let c = ~0;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
    return ~c >>> 0;
  }
  function u16(n) {
    return new Uint8Array([n & 255, (n >>> 8) & 255]);
  }
  function u32(n) {
    return new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
  }
  function concat(chunks) {
    const len = chunks.reduce((a, b) => a + b.length, 0);
    const out = new Uint8Array(len);
    let o = 0;
    for (const c of chunks) {
      out.set(c, o);
      o += c.length;
    }
    return out;
  }
  function buildZip(files) {
    const local = [];
    const central = [];
    let offset = 0;
    for (const f of files) {
      const nameBytes = new TextEncoder().encode(f.name);
      const crc = crc32(f.data);
      const localHeader = concat([
        u32(0x04034b50),
        u16(20),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(crc),
        u32(f.data.length),
        u32(f.data.length),
        u16(nameBytes.length),
        u16(0),
        nameBytes,
        f.data,
      ]);
      local.push(localHeader);
      const centralHeader = concat([
        u32(0x02014b50),
        u16(20),
        u16(20),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(crc),
        u32(f.data.length),
        u32(f.data.length),
        u16(nameBytes.length),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(0),
        u32(offset),
        nameBytes,
      ]);
      central.push(centralHeader);
      offset += localHeader.length;
    }
    const centralBlob = concat(central);
    const end = concat([
      u32(0x06054b50),
      u16(0),
      u16(0),
      u16(files.length),
      u16(files.length),
      u32(centralBlob.length),
      u32(offset),
      u16(0),
    ]);
    return new Blob([concat(local), centralBlob, end], { type: 'application/zip' });
  }

  async function convert() {
    if (!state.files.length) return;
    setStatus('Converting…');
    $('#wc-convert').disabled = true;
    state.results = [];
    try {
      for (const file of state.files) {
        const img = await loadImage(file);
        const blob = toBmpBlob(img);
        const name = baseName(file.name) + '.bmp';
        state.results.push({ name, blob, size: blob.size, orig: file.size });
      }
      const totalOrig = state.results.reduce((a, r) => a + r.orig, 0);
      const totalNew = state.results.reduce((a, r) => a + r.size, 0);
      const delta = totalOrig ? Math.round(((totalNew - totalOrig) / totalOrig) * 100) : 0;
      setStatus(
        'Done — ' +
          state.results.length +
          ' BMP file(s). ' +
          fmt(totalOrig) +
          ' → ' +
          fmt(totalNew) +
          (delta > 0 ? ' (+' + delta + '%; BMP is uncompressed)' : '')
      );
      const single = state.results[0];
      const a = $('#wc-download');
      a.hidden = false;
      a.textContent =
        state.results.length === 1 ? 'Download ' + single.name : 'Download first BMP';
      a.href = URL.createObjectURL(single.blob);
      a.download = single.name;
      const zipBtn = $('#wc-download-zip');
      if (zipBtn) {
        if (state.results.length > 1) {
          zipBtn.hidden = false;
          const parts = [];
          for (const r of state.results) {
            parts.push({ name: r.name, data: new Uint8Array(await r.blob.arrayBuffer()) });
          }
          const zip = buildZip(parts);
          zipBtn.href = URL.createObjectURL(zip);
          zipBtn.download = 'nanoimage-bmp-images.zip';
        } else {
          zipBtn.hidden = true;
        }
      }
      if (single) {
        const prev = $('#wc-preview-after');
        // Preview via object URL of BMP — browsers that decode BMP show it
        prev.src = URL.createObjectURL(single.blob);
        prev.hidden = false;
        $('#wc-after-size').textContent = fmt(single.size);
        $('#wc-before-size').textContent = fmt(single.orig);
      }
    } catch (e) {
      setStatus(e && e.message ? e.message : 'Conversion failed', true);
    } finally {
      $('#wc-convert').disabled = false;
    }
  }

  function bind() {
    const drop = $('#wc-drop');
    const input = $('#wc-file');
    if (!drop || !input) return;
    input.accept = ACCEPT;
    drop.addEventListener('click', () => input.click());
    input.addEventListener('change', () => addFiles(input.files));
    drop.addEventListener('dragover', (e) => {
      e.preventDefault();
      drop.classList.add('drag');
    });
    drop.addEventListener('dragleave', () => drop.classList.remove('drag'));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('drag');
      addFiles(e.dataTransfer.files);
    });
    $('#wc-list').addEventListener('click', (e) => {
      const btn = e.target.closest('.wc-remove');
      if (!btn) return;
      state.files.splice(Number(btn.dataset.i), 1);
      renderList();
    });
    $('#wc-convert').addEventListener('click', convert);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
