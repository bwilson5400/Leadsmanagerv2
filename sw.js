// v4 SW (same as v3, new cache bust)
const CACHE = 'wl-cache-v4-1755392212';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))); self.clients.claim(); });
self.addEventListener('fetch', e => { if(e.request.method!=='GET') return; e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,cp)); return r; }).catch(()=>caches.match('./index.html')))); });
self.addEventListener('notificationclick', event => { event.notification.close(); event.waitUntil((async()=>{ const clients = await self.clients.matchAll({type:'window', includeUncontrolled:true}); if (clients.length) return clients[0].focus(); return self.clients.openWindow('./'); })()); });
