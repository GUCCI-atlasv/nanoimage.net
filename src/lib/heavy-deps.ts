/** Lazy-loaded heavy npm packages — kept out of the main tool bundle until needed. */
export async function loadJSZip() {
  const mod = await import('jszip')
  return mod.default
}

export async function loadPdfLib() {
  return import('pdf-lib')
}

export async function loadExifr() {
  return import('exifr')
}
