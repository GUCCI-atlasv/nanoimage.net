/* NanoImage service worker — backs the "Works offline" promise.
 *
 * Strategy:
 *  - /_next/static/ and /assets/ and /icons/: cache-first (immutable/rarely change)
 *  - HTML navigations: network-first with cache fallback, so tools you have
 *    visited keep working offline and updates arrive when online.
 * Bump VERSION on breaking changes to invalidate old caches.
 */
const VERSION = 'v1';
const STATIC_CACHE = `nanoimage-static-${VERSION}`;
const PAGE_CACHE = `nanoimage-pages-${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(['/'])).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith('nanoimage-') && !k.endsWith(VERSION))
          .map((k) => caches.delete(k)),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Immutable build assets: cache-first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/')
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(req).then(
          (hit) =>
            hit ||
            fetch(req).then((res) => {
              if (res.ok) cache.put(req, res.clone());
              return res;
            }),
        ),
      ),
    );
    return;
  }

  // Page navigations: network-first, fall back to cache when offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.open(PAGE_CACHE).then((cache) =>
            cache.match(req).then((hit) => hit || cache.match('/')),
          ),
        ),
    );
  }
});
