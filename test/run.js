#!/usr/bin/env node
// Runs the whole suite: the drift check first because it is fast and catches the
// class of bug that ships silently, then the browser suites against a static
// server this script owns.
//
// The server binds an ephemeral port rather than a fixed one, so two runs (or a
// run alongside a dev server) cannot collide.

var fs = require('fs');
var path = require('path');
var cp = require('child_process');

var ROOT = path.join(__dirname, '..');
var argv = process.argv.slice(2);
var browserOnly = argv.indexOf('--browser-only') !== -1;
var driftOnly = argv.indexOf('--drift-only') !== -1;

// The static server runs as a child process: spawnSync below blocks this one's
// event loop, so an in-process server would accept connections and never answer.
function serve() {
  return new Promise(function (resolve, reject) {
    var child = cp.spawn(process.execPath, [path.join(__dirname, 'server.js')], { stdio: ['ignore', 'pipe', 'inherit'] });
    var buf = '';
    var timer = setTimeout(function () { reject(new Error('the test server did not report a port')); }, 10000);
    child.stdout.on('data', function (d) {
      buf += d;
      var m = /PORT (\d+)/.exec(buf);
      if (m) { clearTimeout(timer); resolve({ port: +m[1], stop: function () { child.kill(); } }); }
    });
  });
}

// A suite that names a fixed port or an absolute path passes here and fails
// everywhere else -- which is exactly what happened: the port into this repo
// rewrote one spelling of the dev-server URL, missed another written as an IP,
// and never looked for absolute paths at all. Both got through a green local
// run because the old dev server happened to be up and the old checkout
// happened to exist. Catch the class here, before anything runs.
function lint(dir) {
  var bad = [];
  fs.readdirSync(dir).filter(function (f) { return /\.js$/.test(f) && f !== '_env.js'; })
    .forEach(function (f) {
      fs.readFileSync(path.join(dir, f), 'utf8').split('\n').forEach(function (line, i) {
        if (/^\s*(\/\/|\*)/.test(line)) return;
        if (/(localhost|127\.0\.0\.1)\s*:\s*\d+/.test(line)) {
          bad.push(f + ':' + (i + 1) + '  hardcoded host:port -- use ENV.BASE');
        }
        if (/['"`]\/(home|Users|tmp)\//.test(line)) {
          bad.push(f + ':' + (i + 1) + '  absolute path -- use ENV.REPO');
        }
      });
    });
  return bad;
}

function run(label, file, env) {
  var r = cp.spawnSync(process.execPath, [file], { cwd: path.dirname(file), env: env, encoding: 'utf8' });
  var out = ((r.stdout || '') + (r.stderr || '')).trim().split('\n');
  var last = out[out.length - 1] || '(no output)';
  var ok = r.status === 0 && !/FAIL/.test(last);
  process.stdout.write('  ' + (ok ? 'PASS' : 'FAIL') + '  ' + label.padEnd(14) + last.slice(0, 96) + '\n');
  if (!ok && r.status !== 0) out.slice(-12).forEach(function (l) { process.stdout.write('        ' + l + '\n'); });
  return ok;
}

(async function () {
  var failed = [];

  if (!browserOnly) {
    console.log('\nthe document and the app data');
    if (!run('drift', path.join(__dirname, 'drift.js'), process.env)) failed.push('drift');
  }

  if (!driftOnly) {
    var dir = path.join(__dirname, 'browser');
    var suites = fs.readdirSync(dir).filter(function (f) {
      return /\.js$/.test(f) && f[0] !== '_';
    }).sort();
    var bad = lint(dir);
    if (bad.length) {
      console.error('\nthese suites would only pass on the machine they were written on:\n');
      bad.forEach(function (b) { console.error('  ' + b); });
      process.exit(1);
    }
    var srv = await serve();
    var url = 'http://127.0.0.1:' + srv.port;
    var env = Object.assign({}, process.env, { APEX_URL: url });
    console.log('\nthe app in a browser  (' + url + ')');
    suites.forEach(function (f) {
      if (!run(f.replace(/\.js$/, ''), path.join(dir, f), env)) failed.push(f);
    });
    srv.stop();
  }

  console.log('');
  if (failed.length) {
    console.error(failed.length + ' failed: ' + failed.join(', '));
    process.exit(1);
  }
  console.log('everything passed');
})();
