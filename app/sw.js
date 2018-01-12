const { assets } = global.serviceWorkerOption;

const assetsToCache = [...assets, './'].map(path => {
  return new URL(path, global.location).toString();
});

self.addEventListener('install', ev => {
  console.debug("[SW] Install event");

  ev.waitUntil(
    caches.open('findabike')
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
      .then(() => console.debug('[SW] Cached assets', assetsToCache))
      .catch((error) => {
        console.error(error);
        throw error
      })
  )
});

self.addEventListener('activate', ev =>
  ev.waitUntil(cacheNames => Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  ))
);

self.addEventListener('fetch', ev => {
  if (ev.request.method === 'GET') {
    ev.respondWith(caches.match(ev.request).then(
      cached => cached
    ))
  }
});