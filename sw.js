// Service Worker for offline functionality
const CACHE_NAME = 'smart-krishi-sahayak-v1';
const urlsToCache = [
  '/smart-krishi-sahayak/',
  '/smart-krishi-sahayak/index.html',
  '/smart-krishi-sahayak/static/js/bundle.js',
  '/smart-krishi-sahayak/static/css/main.css',
  'https://img.icons8.com/color/192/wheat.png'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Fetch events
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
