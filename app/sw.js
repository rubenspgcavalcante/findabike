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

self.addEventListener('fetch', ev => {
  ev.respondWith(
    fetch(ev.request).catch(() =>
      caches.match(ev.request).catch(unableToResolve)
    )
  )
});

function unableToResolve() {
  return new Response('<span>Service Unavailable</span>', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: new Headers({
      'Content-Type': 'text/html'
    })
  })
}