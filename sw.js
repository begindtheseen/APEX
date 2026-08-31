// APEX Progressive Protocol — service worker
// Caches the app shell so the tracker works offline and installs as a PWA.
// User progress is NOT stored here; it lives in localStorage (see index.html).
// Bump CACHE when the app shell changes to roll out the update.
var CACHE = 'apex-shell-v17';
var SHELL = [
  './',
  './index.html',
  './curriculum.js',
  './qbank.js',
  './jobs.js',
  './obsidian.js',
  './obsviz.js',
  './redline.js',
  './redlineviz.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  // Fetch every shell file straight from the network (cache:'reload' bypasses
  // the browser HTTP cache) so a new version never installs with stale files.
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return Promise.all(SHELL.map(function(u) {
        return fetch(new Request(u, { cache: 'reload' })).then(function(res) {
          if (res && res.ok) return c.put(u, res);
        });
      }));
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  // Navigations: network-first so a refresh picks up a new build, fall back
  // to the cached shell when offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function(res) {
        var copy = res.clone();
        caches.open(CACHE).then(function(c) { c.put('./index.html', copy); });
        return res;
      }).catch(function() {
        return caches.match('./index.html');
      })
    );
    return;
  }

  // Same-origin assets: cache-first, then network.
  if (new URL(req.url).origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(function(hit) {
        return hit || fetch(req).then(function(res) {
          var copy = res.clone();
          caches.open(CACHE).then(function(c) { c.put(req, copy); });
          return res;
        }).catch(function() { return hit; });
      })
    );
  }
  // Cross-origin (e.g. Google Fonts): let the browser handle it normally.
});
