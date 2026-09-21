// APEX Progressive Protocol — service worker
// Caches the app shell so the tracker works offline and installs as a PWA.
// User progress is NOT stored here; it lives in localStorage (see index.html).
// Bump CACHE when the app shell changes to roll out the update.
var CACHE = 'apex-shell-v43';
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
  './curriculum-ai.js',
  './launchpadviz.js',
  './manifest.json',
  './icon.svg'
];

// Only a real, complete response may ever enter the cache. Cache.put happily
// stores a 404 or a 503, and a cache-first read cannot tell the difference —
// one reload during a deploy would otherwise leave the shell permanently
// replaced by an error page, with no way to recover while offline.
function cacheable(res) {
  return !!res && res.ok && res.status === 200 && res.type !== 'opaque';
}

// The shell is one specific document. cacheable() alone said yes to any 200 in
// scope, so a single navigation to ./icon.svg or a .md file in the repo root
// replaced the offline app with that file — an installed PWA that renders a
// bare SVG when the device is offline, with no way back. Two extra conditions:
// the request has to BE the shell, and the answer has to be HTML.
var SHELL_URL = new URL('./index.html', self.location).pathname;
var ROOT_URL = new URL('./', self.location).pathname;
function isShellRequest(req) {
  var path = new URL(req.url).pathname;
  return path === SHELL_URL || path === ROOT_URL;
}
function isHtml(res) {
  return (res.headers.get('content-type') || '').indexOf('text/html') === 0;
}

self.addEventListener('install', function(e) {
  self.skipWaiting();
  // Fetch every shell file straight from the network (cache:'reload' bypasses
  // the browser HTTP cache) so a new version never installs with stale files.
  // A file that will not fetch fails the install: a half-filled cache looks
  // installed and then breaks the app the first time it is offline. A failed
  // install also deletes its own partial cache rather than leaving an orphan.
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return Promise.all(SHELL.map(function(u) {
        return fetch(new Request(u, { cache: 'reload' })).then(function(res) {
          if (!cacheable(res)) throw new Error('shell fetch failed: ' + u);
          return c.put(u, res);
        });
      }));
    }).catch(function(err) {
      return caches.delete(CACHE).then(function() { throw err; });
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

  // Navigations: network-first so a refresh picks up a new build, falling back
  // to the cached shell when offline or when the network is answering slowly
  // enough that a good cached copy is the better answer.
  // Navigations to the app itself: network-first so a refresh picks up a new
  // build, falling back to the cached shell when the network fails. A
  // navigation to anything ELSE in scope is left alone entirely — this worker
  // does not own those pages, and answering them with the APEX shell broke
  // every other project published on the same origin.
  if (req.mode === 'navigate') {
    if (!isShellRequest(req)) return;
    e.respondWith(
      new Promise(function(resolve) {
        var settled = false;
        function done(r) { if (!settled && r) { settled = true; resolve(r); } }
        // A slow network is not an offline network. The old 3s substitution
        // discarded a real 200 that simply took a while, so it is only armed
        // once the request has been outstanding long enough that a stale-but-
        // working app really is the better answer, and only for this document.
        var timer = setTimeout(function() {
          caches.match('./index.html').then(done);
        }, 12000);
        fetch(req).then(function(res) {
          clearTimeout(timer);
          if (cacheable(res) && isHtml(res)) {
            var copy = res.clone();
            caches.open(CACHE).then(function(c) { c.put('./index.html', copy); });
            done(res);
          } else if (!settled) {
            // A 404, a 5xx, or a 200 that is not HTML must never become the
            // offline shell. Serve the last good copy if there is one,
            // otherwise the server's answer.
            caches.match('./index.html').then(function(hit) { done(hit || res); });
          }
        }).catch(function() {
          clearTimeout(timer);
          caches.match('./index.html').then(function(hit) {
            done(hit || new Response('<h1>Offline</h1><p>This app has not finished installing yet. Reconnect once and it will work offline from then on.</p>',
              { headers: { 'Content-Type': 'text/html' } }));
          });
        });
      })
    );
    return;
  }

  // Same-origin assets: serve the cached copy at once, and refresh it in the
  // background. Without the refresh, a deploy that forgot to bump CACHE would
  // pair a new index.html with permanently stale scripts.
  if (new URL(req.url).origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(function(hit) {
        var net = fetch(req).then(function(res) {
          if (cacheable(res)) {
            var copy = res.clone();
            caches.open(CACHE).then(function(c) { c.put(req, copy); });
          }
          return res;
        }).catch(function() { return hit; });
        return hit || net;
      })
    );
  }
  // Cross-origin (e.g. Google Fonts): let the browser handle it normally.
});
