// @ts-ignore
workbox.core.skipWaiting();
// @ts-ignore
workbox.core.clientsClaim();

// @ts-ignore
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Cache Google Fonts

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
// @ts-ignore
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  // @ts-ignore
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
// @ts-ignore
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  // @ts-ignore
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      // @ts-ignore
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      // @ts-ignore
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Cache minified JavaScript and CSS
// @ts-ignore
workbox.routing.registerRoute(
  /^https:.*\.min\.(?:js|css)$/,
  // @ts-ignore
  new workbox.strategies.StaleWhileRevalidate()
);
