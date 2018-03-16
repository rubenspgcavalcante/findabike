const { assets, version } = global.serviceWorkerOption;

const assetsToCache = [...assets, "./"].map(path => {
  return new URL(path, global.location).toString();
});

const CACHE_NAME = `findabike-${version}`;

self.addEventListener("install", ev => {
  console.debug("[SW] Install event");

  ev.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => console.debug("[SW] Cached assets", assetsToCache))
      .catch(error => {
        console.error(error);
        throw error;
      })
  );
});

self.addEventListener("activate", ev =>
  ev.waitUntil(cacheNames =>
    Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
  )
);

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches
      .open(CACHE_NAME)
      .then(
        cache =>
          shouldNetworkFirst(event.request.url)
            ? networkFirst(cache, event.request)
            : cacheFirst(cache, event.request)
      )
  );
});

function networkFirst(cache, request) {
  return fetch(request)
    .then(res => {
      cache.put(request, res.clone());
      return res;
    })
    .catch(err => cache.match(request));
}

function cacheFirst(cache, request) {
  return cache.match(request).then(
    res =>
      res ||
      fetch(request).then(response => {
        cache.put(request, response.clone());
        return response;
      })
  );
}

function shouldNetworkFirst(url) {
  return [new RegExp(global.location.origin + "/"), /manifest\.json/].some(
    path => path.test(url)
  );
}
