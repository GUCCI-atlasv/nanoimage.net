/**
 * Shared PNG/JPG → WebP converter (local browser).
 * Config via window.__WEBP_CONVERT__ = { mode: 'png'|'jpg', maxFiles: 20 }
 */
(function () {
  const cfg = Object.assign({ mode: 'png', maxFiles: 20 }, window.__WEBP_CONVERT__ || {});
  const ACCEPT =
    cfg.mode === 'jpg'
      ? 'image/jpeg,.jpg,.jpeg'
      : 'image/png,.png';
  const FILTER =
    cfg.mode === 'jpg'
      ? (f) => /image\/jpeg/i.test(f.type) || /\.jpe?g$/i.test(f.name)
      : (f) => /image\/png/i.test(f.type) || /\.png$/i.test(f.name);

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

  function toWebpBlob(img, quality) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      // Canvas redraw strips EXIF / metadata
      ctx.drawImage(img, 0, 0);
      if (!canvas.toBlob) {
        reject(new Error('WebP export not supported in this browser'));
        return;
      }
      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error('WebP encode failed'));
          else resolve(blob);
        },
        'image/webp',
        quality
      );
    });
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
      setStatus(
        cfg.mode === 'jpg'
          ? 'Please choose JPG/JPEG files.'
          : 'Please choose PNG files.',
        true
      );
      return;
    }
    state.files = state.files.concat(incoming).slice(0, cfg.maxFiles);
    state.results = [];
    $('#wc-download').hidden = true;
    $('#wc-download-zip').hidden = true;
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

  // Minimal ZIP (store only) for batch download
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
    // files: [{name, data:Uint8Array}]
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
    const q = Number($('#wc-quality').value) / 100;
    setStatus('Converting…');
    $('#wc-convert').disabled = true;
    state.results = [];
    try {
      for (const file of state.files) {
        const img = await loadImage(file);
        const blob = await toWebpBlob(img, q);
        const name = baseName(file.name) + '.webp';
        state.results.push({ name, blob, size: blob.size, orig: file.size });
      }
      const totalOrig = state.results.reduce((a, r) => a + r.orig, 0);
      const totalNew = state.results.reduce((a, r) => a + r.size, 0);
      const saved = totalOrig ? Math.round(((totalOrig - totalNew) / totalOrig) * 100) : 0;
      setStatus(
        'Done — ' +
          state.results.length +
          ' WebP file(s). ' +
          fmt(totalOrig) +
          ' → ' +
          fmt(totalNew) +
          (saved > 0 ? ' (−' + saved + '%)' : '')
      );
      const single = state.results[0];
      const a = $('#wc-download');
      a.hidden = false;
      a.textContent =
        state.results.length === 1 ? 'Download ' + single.name : 'Download first WebP';
      a.href = URL.createObjectURL(single.blob);
      a.download = single.name;
      const zipBtn = $('#wc-download-zip');
      if (state.results.length > 1) {
        zipBtn.hidden = false;
        const parts = [];
        for (const r of state.results) {
          parts.push({ name: r.name, data: new Uint8Array(await r.blob.arrayBuffer()) });
        }
        const zip = buildZip(parts);
        zipBtn.href = URL.createObjectURL(zip);
        zipBtn.download = 'nanoimage-webp-images.zip';
      } else {
        zipBtn.hidden = true;
      }
      if (single) {
        const prev = $('#wc-preview-after');
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
    const q = $('#wc-quality');
    const qv = $('#wc-quality-val');
    q.addEventListener('input', () => {
      qv.textContent = q.value + '%';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
