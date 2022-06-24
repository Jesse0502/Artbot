const CACHE_NAME = "version-4";
const urlsToCache = [
  ".",
  "index.html",
  "images/logo.png",
  "static/js/bundle.js",
  "static/js/index.js",
  "static/js/index.tsx",
  "manifest.json",
];

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});
// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cache) => {
      return cache || fetch(event.request);
    })
  );
});
// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  console.log("cache activate", cacheWhitelist);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
