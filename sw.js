// Shifty service worker: makes the app installable and usable offline.
const CACHE = 'shifty-v4'
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'])))
  self.skipWaiting()
})
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))
})
self.addEventListener('fetch', e => {
  const r = e.request
  if (r.method !== 'GET' || !r.url.startsWith('http')) return
  // Network first (always get the newest version when online), fall back to cache offline.
  e.respondWith(
    fetch(r).then(res => {
      if (res.ok && (res.type === 'basic' || res.type === 'cors')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)) }
      return res
    }).catch(() => caches.match(r).then(m => m || caches.match('./')))
  )
})
