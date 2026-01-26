const CACHE_NAME = "horitzo-v1";

const CACHE_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.webmanifest",
  "./js/astronomy.browser.min.js",
  "./data/horizon_profiles/perfil_demo.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
  "./visor.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
