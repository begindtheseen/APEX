#!/usr/bin/env node
// Asserts that AI_ENGINEERING_CURRICULUM.md and curriculum-ai.js still describe
// the same program.
//
// They are two renderings of one curriculum: the markdown is what a reader
// reads, curriculum-ai.js is what the app shows. Nothing used to check that
// they agreed, and they rotted apart in both directions -- a glossary that
// contradicted its own module's gate, a gate that quietly dropped a statistical
// requirement the prose spelled out, a bet that named the wrong layer, an hour
// figure priced against the wrong list. Every one of those shipped.
//
// This runs in a second with no browser, so it can gate every push.

var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');
var MD = fs.readFileSync(path.join(ROOT, 'AI_ENGINEERING_CURRICULUM.md'), 'utf8');
var C = require(path.join(ROOT, 'curriculum-ai.js'));

var errors = [];
function fail(what, detail) { errors.push(what + (detail ? '  --  ' + detail : '')); }
function eq(what, a, b) { if (String(a) !== String(b)) fail(what, 'md=' + a + '  js=' + b); }

// ---------------------------------------------------------------- 1. modules
// Three independent statements of the same table: the module heading, the
// build-order row, and the JS object. All three have to agree.
var headings = {};
MD.replace(/^## (M\d+) — (.+?) \((\d+)h\) · `dependsOn: (.+?)`/gm, function (_, id, title, h, deps) {
  headings[id] = { title: title.trim(), hours: +h, deps: deps.trim() };
  return _;
});
var rows = {};
MD.replace(/^\| \*\*(M\d+)\*\* \| (.+?) \| (\d+) \| (.+?) \|$/gm, function (_, id, title, h, deps) {
  rows[id] = { title: title.trim(), hours: +h, deps: deps.trim() };
  return _;
});

eq('module count: md headings vs JS', Object.keys(headings).length, C.AI_CURRICULUM.length);
eq('module count: build-order rows vs JS', Object.keys(rows).length, C.AI_CURRICULUM.length);

C.AI_CURRICULUM.forEach(function (m) {
  var h = headings[m.id], r = rows[m.id];
  if (!h) return fail(m.id + ': no heading in the markdown');
  if (!r) return fail(m.id + ': no build-order row in the markdown');
  eq(m.id + ' hours (heading)', h.hours, m.hours);
  eq(m.id + ' hours (build-order row)', r.hours, m.hours);
  var deps = m.dependsOn.length ? m.dependsOn.join(', ') : '—';
  // The heading may carry a trailing " · **owns: ...**" or trigger clause.
  var hDeps = h.deps.replace(/`.*$/, '').trim();
  if (hDeps !== deps) fail(m.id + ' dependsOn (heading)', 'md=' + hDeps + '  js=' + deps);
  if (r.deps !== deps) fail(m.id + ' dependsOn (build-order row)', 'md=' + r.deps + '  js=' + deps);
  if (h.title !== m.title) fail(m.id + ' title (heading)', 'md=' + h.title + '  js=' + m.title);
});

// ----------------------------------------------------------------- 2. layers
var layerHours = {};
MD.replace(/^# LAYER (\d+) — .+? \((\d+)h\)/gm, function (_, n, h) { layerHours[+n] = +h; return _; });
var byLayer = {};
C.AI_CURRICULUM.forEach(function (m) { byLayer[m.layer] = (byLayer[m.layer] || 0) + m.hours; });
Object.keys(byLayer).forEach(function (L) {
  if (layerHours[L] === undefined) return fail('Layer ' + L + ': no heading in the markdown');
  eq('Layer ' + L + ' heading equals the sum of its own modules', layerHours[L], byLayer[L]);
});

// ----------------------------------------------------------------- 3. totals
var v = C.AI_CURRICULUM_API.validate();
if (!v.ok) v.errors.forEach(function (e) { fail('validate()', e); });
function mdHas(n, what) {
  var pretty = n.toLocaleString('en-US');
  if (MD.indexOf(pretty) === -1) fail(what, 'the markdown never states ' + pretty);
}
mdHas(v.hours.modules, 'module-hour total');
mdHas(v.hours.tracks, 'track-hour total');
mdHas(v.hours.total, 'grand total');
// and the stale figures must be gone, not merely outnumbered
[[1108, v.hours.modules], [1578, v.hours.total]].forEach(function (p) {
  if (p[0] !== p[1] && MD.indexOf(p[0].toLocaleString('en-US')) !== -1) {
    fail('stale hour figure still in the markdown', String(p[0]));
  }
});

var cpStated = /\*\*The critical path is (\d+) hours\*\*/.exec(MD);
if (!cpStated) fail('the markdown no longer states a critical path');
else eq('critical path', cpStated[1], v.criticalPathHours);

// ------------------------------------------------------------ 4. checkpoints
var cpTotal = 0, cpMods = 0;
Object.keys(C.AI_CHECKPOINTS || {}).forEach(function (k) {
  var n = (C.AI_CHECKPOINTS[k] || []).length;
  if (n) { cpTotal += n; cpMods++; }
});
var cpClaim = /\*\*(\d+) in total across (\d+) modules/.exec(MD);
if (!cpClaim) fail('the markdown no longer states a checkpoint count');
else {
  eq('checkpoint count', cpClaim[1], cpTotal);
  eq('modules carrying checkpoints', cpClaim[2], cpMods);
}

// -------------------------------------------------------------- 5. gate text
// Every module carries a gate in both files, and the load-bearing tokens in one
// appear in the other. "Load-bearing" is deliberately mechanical -- numbers,
// acronyms, and non-ASCII symbols -- because those are the parts a condensation
// must not quietly drop. Prose may differ; a threshold or a statistic may not.
var STOP = { GATE: 1, REFEREE: 1, PASS: 1, ON: 1, FAIL: 1, AI: 1, A: 1, I: 1 };
function tokens(s) {
  var out = {};
  // "Track 2" and "M3" are references, not quantities -- match them whole, before
  // the generic number rule turns them into a bare "2" and "3".
  s = s.replace(/\bTrack (\d+)/g, 'T$1').replace(/\bLayer (\d+)/g, 'L$1');
  (s.match(/\b[MTL]\d+\b|\bRFC\d+\b|\d+[\w%]*|\b[A-Z]{2,}\b|[^\x00-\x7F]+/g) || []).forEach(function (t) {
    t = t.replace(/[.,;:)]+$/, '');
    // en/em dashes, arrows and curly quotes are typography, not content
    if (/^[‐-‧‰-⁞←-⇿]+$/.test(t)) return;
    if (STOP[t]) return;
    out[t] = 1;
  });
  return out;
}
C.AI_CURRICULUM.forEach(function (m) {
  var start = MD.indexOf('## ' + m.id + ' — ');
  if (start === -1) return;
  var next = MD.indexOf('\n## ', start + 1);
  var section = MD.slice(start, next === -1 ? MD.length : next);
  var g = /\*\*GATE\*\* — \*\*REFEREE:\*\*[\s\S]*?(?=\n\n)/.exec(section);
  if (!g) return fail(m.id + ': no gate block in the markdown');
  if (!m.gate || !m.gate.pass) return fail(m.id + ': no gate in the JS');
  var mdTok = tokens(g[0]);
  var jsTok = tokens([m.gate.referee, m.gate.pass, m.gate.onFail, m.gate.unseen || ''].join(' '));
  Object.keys(jsTok).forEach(function (t) {
    if (!mdTok[t]) fail(m.id + ' gate: "' + t + '" is in the app but not in the document');
  });
  Object.keys(mdTok).forEach(function (t) {
    if (!jsTok[t]) fail(m.id + ' gate: "' + t + '" is in the document but not in the app');
  });
});

// --------------------------------------------------- 6. trigger-module invariant
// isUnlocked() has no branch that opens a trigger module with no dependsOn --
// one used to sit there, unreachable. If that ever becomes reachable again,
// a module could open before M0.
C.AI_CURRICULUM.forEach(function (m) {
  if (m.trigger && m.dependsOn.length === 0) {
    fail(m.id + ': trigger module with an empty dependsOn would open before M0');
  }
});

// --------------------------------------------- 7. cut list vs the appendix
function countDots(s) { return s.split('·').length; }
var cut = /\*\*Learn-on-demand appendix\*\*([\s\S]*?)\n\n/.exec(MD);
var app = /# Appendix C — Learn on demand([\s\S]*?)(?=\n#|$)/.exec(MD);
if (cut && app) {
  var cutN = cut[1].split(',').length;
  var appN = countDots(app[1]);
  if (Math.abs(cutN - appN) > 1 && !/carry no hours/.test(cut[1])) {
    fail('cut list and Appendix C disagree on how many items are priced',
         'cut~' + cutN + ' appendix~' + appN);
  }
}

// ------------------------------------------------------------------- report
if (errors.length) {
  console.error('DRIFT: ' + errors.length + ' disagreement' + (errors.length > 1 ? 's' : '') +
                ' between the document and the app data\n');
  errors.forEach(function (e) { console.error('  ' + e); });
  process.exit(1);
}
console.log('drift        THE DOCUMENT AND THE APP AGREE  (' + C.AI_CURRICULUM.length + ' modules, ' +
            v.hours.total + 'h, ' + cpTotal + ' checkpoints, critical path ' + v.criticalPathHours + 'h)');
