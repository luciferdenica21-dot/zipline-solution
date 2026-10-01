// Service Worker for Zipline Solution PWA
const CACHE_NAME = 'zipline-solution-v4';
const urlsToCache = [
  '/manifest.json',
  '/logobrand.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
  self.clients.claim();
});

// Network-first for navigation requests (pages, index.html)
self.addEventListener('fetch', event => {
  const req = event.request;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(response => {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, responseToCache));
        return response;
      })
        .catch(() => caches.match(req).then(res => res || caches.match('/index.html')))
    );
    return;
  }

  // Stale-while-revalidate for everything else (css, js, images)
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
