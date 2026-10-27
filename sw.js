// Shifty service worker: makes the app installable and usable offline.
const CACHE = 'shifty-v3'
const CORE = ['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png']

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE)
    await c.addAll(CORE)
    // Also cache the built JS/CSS referenced by the page, so the very first offline launch works.
    try {
      const html = await (await fetch('./', { cache: 'reload' })).text()
      const urls = [...html.matchAll(/(?:src|href)="(\.?\/?[^"]+\.(?:js|css))"/g)].map(m => m[1])
      await Promise.all(urls.map(u => c.add(new URL(u, self.registration.scope).href).catch(() => {})))
    } catch (_) {}
  })())
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))
})

self.addEventListener('fetch', e => {
  const r = e.request
  if (r.method !== 'GET' || !r.url.startsWith('http')) return
  // Network first (always the newest version when online), fall back to cache when offline.
  e.respondWith(
    fetch(r).then(res => {
      if (res.ok && (res.type === 'basic' || res.type === 'cors')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)) }
      return res
    }).catch(() => caches.match(r).then(m => m || caches.match('./')))
  )
})
