const { assets, version } = global.serviceWorkerOption;

const assetsToCache = [...assets, './'].map(path => {
  return new URL(path, global.location).toString();
});

const CACHE_NAME = `findabike-${version}`;

self.addEventListener('install', ev => {
  console.debug("[SW] Install event");

  ev.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(response =>
        response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        })
      )
    )
  );
});