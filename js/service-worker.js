const CACHE_NAME = "tickets-app-cache-v2"; // updated version
const urlsToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/ticket.css",
  "./js/script.js",
  "./icon/ticket-192.png",
  "./icon/ticket-512.png",
  "./image/image/frr.jpeg",   // added event images
  "./image/image/frr.jpeg",   // added event images
  "./image/Discover.jpeg",
  "./image/for you.jpeg",
  "./image/tickest.jpeg",
  "./image/sell.jpeg",
  "./image/myaccount.jpeg",
  "./image/usa1.jpg",
  "./image/barcode.jpg",
  "./image/app wallwt1.jpg",
  "./image/26.jpg",
  "./image/23.jpg",
  "./image/22.jpg",
  "./image/34.jpg",
  "./image/screen1.jpg",
  "./image/screen2.jpg"
];
// Install & cache essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // force SW to activate immediately
});

// Activate & clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // take control of pages immediately
});

// Fetch from cache first, then network, then fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response; // return cached asset if available

      return fetch(event.request)
        .then(fetchResponse => {
          // Dynamically cache new requests
          return caches.open(CACHE_NAME).then(cache => {
            if (event.request.url.startsWith("http")) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        })
        .catch(() => {
          // fallback for offline pages
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
