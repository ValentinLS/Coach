const CACHE_NAME = 'open-coach-plan-2026-cfe62c4a6ea2';
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./service-worker.js",
  "./apple-touch-icon.png",
  "./icons/apple-touch-icon-180.png",
  "./icons/favicon-32.png",
  "./icons/icon-1024.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-167.png",
  "./icons/icon-192.png",
  "./icons/icon-32.png",
  "./icons/icon-384.png",
  "./icons/icon-48.png",
  "./icons/icon-512.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/maskable-512.png",
  "./splash/ipad-1536x2048-landscape.png",
  "./splash/ipad-1536x2048.png",
  "./splash/ipad-1668x2224-landscape.png",
  "./splash/ipad-1668x2224.png",
  "./splash/ipad-1668x2388-landscape.png",
  "./splash/ipad-1668x2388.png",
  "./splash/ipad-2048x2732-landscape.png",
  "./splash/ipad-2048x2732.png",
  "./splash/iphone-1125x2436-landscape.png",
  "./splash/iphone-1125x2436.png",
  "./splash/iphone-1170x2532-landscape.png",
  "./splash/iphone-1170x2532.png",
  "./splash/iphone-1242x2208-landscape.png",
  "./splash/iphone-1242x2208.png",
  "./splash/iphone-1242x2688-landscape.png",
  "./splash/iphone-1242x2688.png",
  "./splash/iphone-1284x2778-landscape.png",
  "./splash/iphone-1284x2778.png",
  "./splash/iphone-1290x2796-landscape.png",
  "./splash/iphone-1290x2796.png",
  "./splash/iphone-750x1334-landscape.png",
  "./splash/iphone-750x1334.png",
  "./splash/iphone-828x1792-landscape.png",
  "./splash/iphone-828x1792.png"
];

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL.map(scopedUrl)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('open-coach-plan-2026-') && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        await cache.put(scopedUrl('./index.html'), response.clone());
        return response;
      } catch (error) {
        return (await caches.match(event.request)) || (await caches.match(scopedUrl('./index.html')));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response && response.status === 200) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch (error) {
      return caches.match(scopedUrl('./index.html'));
    }
  })());
});
