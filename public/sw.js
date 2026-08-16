const CACHE_NAME = 'plottwist-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/login.html',
  '/movie-details.html',
  '/profile.html',
  '/recommended.html',
  '/search.html',
  '/wishlist.html',
  '/assets/css/style.css',
  '/assets/js/common.js',
  '/assets/js/script.js',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Add other important JS or image assets to the list above!

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});