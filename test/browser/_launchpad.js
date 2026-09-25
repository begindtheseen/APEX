// Shared helpers for driving LAUNCHPAD, which is its own app at /launchpad/
// (ORBIT's learning platform carrying the LAUNCHPAD curriculum), from the
// browser suites. It has no page-level globals to call the way the old
// in-page realm did, so the suites drive it the way a reader does — through
// its routes and controls — and read its record from the localStorage key it
// mirrors (`apex_launchpad_v1`, the old realm's key and shape).
var ENV = require('./_env');

var URL_ = ENV.BASE + '/launchpad/';
var KEY = 'apex_launchpad_v1';

/** Wipes every trace of LAUNCHPAD on this origin: the mirror and the database. */
async function reset(page) {
  await page.goto(ENV.BASE + '/index.html');
  await page.evaluate(function () {
    localStorage.clear();
    return new Promise(function (r) {
      var q = indexedDB.deleteDatabase('launchpad');
      q.onsuccess = q.onerror = q.onblocked = function () { r(); };
    });
  });
}

/** Opens the app at a route and waits for it to have drawn. */
async function open(page, route) {
  await page.goto(URL_ + '#' + (route || '/'), { waitUntil: 'networkidle' });
  await page.waitForSelector('.shell .route');
  await page.waitForTimeout(350);
}

/** Moves to another route inside the open app. */
async function go(page, route) {
  await page.evaluate(function (h) { location.hash = h; }, route);
  await page.waitForTimeout(450);
}

/** The record the app mirrors for the APEX launcher: { mods, flagship, setup, ids, passed, total }. */
async function record(page) {
  return page.evaluate(function (k) { return JSON.parse(localStorage.getItem(k) || 'null'); }, KEY);
}

/** Clicks the claim row whose visible label matches. */
async function tick(page, label) {
  await page.getByRole('checkbox', { name: label }).first().click();
  await page.waitForTimeout(160);
}

/** The Build step's checkpoint rows, in order. */
function checkpoints(page) {
  return page.locator('.card', { has: page.locator('.card-head', { hasText: /^Checkpoints/ }) }).locator('.tick');
}

/** Passes a module the honest way: delta, every checkpoint, artifact, gate. */
async function pass(page, id) {
  await go(page, '/module/' + id + '?step=build');
  await tick(page, /^Delta written/);
  var cps = checkpoints(page);
  var n = await cps.count();
  for (var i = 0; i < n; i++) { await cps.nth(i).click(); await page.waitForTimeout(80); }
  await tick(page, /^Artifact built/);
  await tick(page, /^Gate passed/);
}

/** The visible text of the page, for sentence-level checks. */
async function text(page) {
  return page.evaluate(function () { return document.querySelector('.shell').innerText; });
}

module.exports = { URL: URL_, KEY: KEY, reset: reset, open: open, go: go, record: record,
                   tick: tick, checkpoints: checkpoints, pass: pass, text: text };
