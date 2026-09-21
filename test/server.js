#!/usr/bin/env node
// Static file server for the browser suites, on an ephemeral port.
//
// This runs as its own process rather than inside the runner on purpose: the
// runner drives each suite with spawnSync, which blocks the event loop, so a
// server sharing that process would accept connections and never answer them.
var http = require('http');
var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');

var TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png',
  '.webmanifest': 'application/manifest+json'
};

http.createServer(function (req, res) {
  var rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  // Confine every read to the repo root; a test server is still a server.
  var file = path.resolve(ROOT, '.' + path.posix.normalize(rel));
  if (file !== ROOT && file.indexOf(ROOT + path.sep) !== 0) {
    res.writeHead(403); res.end('forbidden'); return;
  }
  fs.readFile(file, function (err, buf) {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(0, '127.0.0.1', function () {
  // The runner reads this line to learn the port.
  console.log('PORT ' + this.address().port);
});
