/* eslint-disable no-restricted-globals */

// Precache the assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-pwa-assets-v1").then((cache) => {
      return cache.addAll([
        // Add the paths to the assets you want to cache here
        "/index.html",
        "/static/css/main.chunk.css",
        "/static/js/main.chunk.js",
        // Add more assets as needed
      ]);
    })
  );
});

// Fetch assets from cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
