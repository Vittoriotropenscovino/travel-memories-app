// PWA SW (usato solo in web). In app nativa viene ignorato.
const CACHE = 'tm-v2.2';
const ASSETS = ['/', './', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const networked = fetch(e.request)
        .then(fetched => {
          if (e.request.url.startsWith('http')) {
            let reqCopy = e.request.clone();
            caches.open(CACHE).then(cache => cache.put(reqCopy, fetched.clone()));
          }
          return fetched;
        })
        .catch(() => cached);
      return cached || networked;
    })
  );
});