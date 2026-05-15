const CACHE = 'speedguard-v3';
const FILES = [
  'https://tavarespl.github.io/SpeedGuard-/index.html',
  'https://tavarespl.github.io/SpeedGuard-/manifest.json',
  'https://tavarespl.github.io/SpeedGuard-/icon-192.png',
  'https://tavarespl.github.io/SpeedGuard-/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
