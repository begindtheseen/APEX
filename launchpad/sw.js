/* ============================================================================
   LAUNCHPAD — service worker (ORBIT's)
   ----------------------------------------------------------------------------
   Deliberately conservative. The app's own shell is precached so it launches
   offline; everything else uses stale-while-revalidate so a stale asset never
   wins over a fresh one for long.

   Two things are explicitly NOT cached here:
     · the Pyodide and SQLite runtimes — tens of megabytes, and the browser's
       own HTTP cache already handles them with correct immutable headers
     · anything non-GET, or cross-origin beyond the font and CDN hosts
   ========================================================================== */

// Scoped to this directory (./), below APEX's own worker at the site root.
// The version name is this app's, so the two never delete each other's caches.
const VERSION = 'launchpad-v1'
const SHELL = `${VERSION}-shell`
const RUNTIME = `${VERSION}-runtime`

const PRECACHE = ['./', './index.html', './manifest.webmanifest', './icon.svg']

const PASSTHROUGH_HOSTS = ['cdn.jsdelivr.net']

// The entry chunks are hashed, so the list cannot be written here: read it out
// of the page being installed. Without them a first visit that goes offline
// before a reload would have the page and none of the code it loads.
function entryAssets(html) {
  const out = new Set()
  const re = /(?:src|href)="(\.\/assets\/[^"]+)"/g
  let m
  while ((m = re.exec(html))) out.add(m[1])
  return [...out]
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((c) =>
        c.addAll(PRECACHE).then(() =>
          c
            .match('./index.html')
            .then((r) => (r ? r.text() : ''))
            .then((html) => caches.open(RUNTIME).then((rt) => rt.addAll(entryAssets(html)))),
        ),
      )
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        // Cache storage is per origin, not per scope: APEX's own worker and
        // anything else published on this host keep their caches beside these.
        // Only this app's older versions are ever deleted.
        Promise.all(
          keys
            .filter((k) => k.startsWith('launchpad-') && !k.startsWith(VERSION))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)

  // Large WASM runtimes: let the network and the HTTP cache handle them.
  if (PASSTHROUGH_HOSTS.includes(url.hostname)) return

  // Navigations: network first, so a deployed update is picked up immediately,
  // with the cached shell as the offline fallback.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Only a real page may become the offline shell: a 404 or a 5xx
          // cached here would be what an offline launch shows from then on.
          const html = (res.headers.get('content-type') || '').startsWith('text/html')
          if (res.ok && res.status === 200 && html) {
            const copy = res.clone()
            void caches.open(SHELL).then((c) => c.put('./index.html', copy))
          }
          return res
        })
        .catch(() => ownMatch('./index.html').then((r) => r || Response.error())),
    )
    return
  }

  /* Everything the app needs is same-origin now that the typefaces ship with
     the build — a cross-origin request is something we did not put here, and
     the service worker stays out of it. */
  if (url.origin !== location.origin) return

  const store = (res) => {
    if (res && res.ok && res.status === 200 && res.type !== 'opaque') {
      const copy = res.clone()
      void caches.open(RUNTIME).then((c) => c.put(req, copy))
    }
    return res
  }

  /* Code is network-first. Cache storage belongs to the whole origin, and on a
     shared host anything else published there can write into it; a cache-first
     read would run whatever it put under one of our script URLs. The network
     copy wins whenever there is one — the cache is the offline fallback. APEX's
     own worker made the same change for the same reason. */
  const dest = req.destination
  const isCode =
    dest === 'script' || dest === 'worker' || dest === 'style' || /\.(m?js|css)(\?|$)/i.test(url.pathname)
  if (isCode) {
    event.respondWith(
      fetch(req)
        .then(store)
        .catch(() => ownMatch(req).then((r) => r || Response.error())),
    )
    return
  }

  event.respondWith(
    ownMatch(req).then((cached) => {
      const network = fetch(req)
        .then(store)
        .catch(() => cached || Response.error())
      return cached || network
    }),
  )
})

/** Looks only in this app's own caches, never in what else shares the origin. */
function ownMatch(req) {
  return caches
    .open(RUNTIME)
    .then((c) => c.match(req))
    .then((r) => r || caches.open(SHELL).then((c) => c.match(req)))
}
