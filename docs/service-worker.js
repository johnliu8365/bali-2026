const CACHE = 'bali-2026-public-v6';
const ASSETS = ['./','index.html','app.css','trip-data.js','app.js','manifest.json','assets/cover.jpg','assets/app-icon.svg','assets/app-icon-180.png','assets/app-icon-192.png','assets/app-icon-512.png'];
const ASSET_URLS = ASSETS.map(path => new URL(path, self.registration.scope).href);
const isPreviousCache = key => key !== CACHE && (key.startsWith('bali-2026-') || key.startsWith('island-east-'));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSET_URLS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const oldCaches = (await caches.keys()).filter(isPreviousCache);
    await Promise.all(oldCaches.map(key => caches.delete(key)));
    await self.clients.claim();
    // Reload old open pages as well as removing their cached private snapshot.
    if (oldCaches.length) {
      const clients = await self.clients.matchAll({type:'window'});
      await Promise.all(clients.filter(client => client.url.startsWith(self.registration.scope))
        .map(client => client.navigate(client.url).catch(() => null)));
    }
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  url.search = '';
  url.hash = '';
  // Only known website assets are cached. External/private URLs are never cached.
  if (!ASSET_URLS.includes(url.href)) return;
  event.respondWith(caches.open(CACHE).then(cache => cache.match(url.href))
    .then(cached => cached || fetch(event.request)));
});
