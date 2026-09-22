// Shared configuration for the browser suites.
//
// These were written against a fixed dev-server port and the Chromium that ships
// in this project's container. Both are environment-specific, so both are read
// from the environment here with the original values as defaults -- that keeps
// them runnable exactly as before while letting CI point them somewhere else.
var fs = require('fs');

var BASE = (process.env.APEX_URL || 'http://localhost:8791').replace(/\/+$/, '');

// Use a pinned Chromium when one is actually present; otherwise let Playwright
// resolve its own download. Passing a path that does not exist fails the launch
// with an error that looks nothing like the real problem.
var pinned = process.env.APEX_CHROMIUM || '/opt/pw-browsers/chromium';
var launchOpts = {};
try { if (fs.existsSync(pinned)) launchOpts.executablePath = pinned; } catch (e) {}

// Some suites read source files off disk rather than over HTTP. They used
// absolute paths into the container this was written in, which resolve here and
// nowhere else. Resolve the repo root once, relative to this file.
var REPO = require('path').join(__dirname, '..', '..');

module.exports = { BASE: BASE, launchOpts: launchOpts, REPO: REPO };
