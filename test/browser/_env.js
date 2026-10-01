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
//
// Without a pin, the full Chromium build (the 'chromium' channel, new headless
// mode), not Playwright's default headless shell: the browser people use. Chrome
// for Testing 153's headless shell segfaults on a WebAssembly out-of-bounds read
// that full Chrome 153 (and 141) report as the RuntimeError it is, which took the
// page down on a C++ lesson whose starter frees a garbage pointer.
var pinned = process.env.APEX_CHROMIUM || '/opt/pw-browsers/chromium';
var launchOpts = { channel: 'chromium' };
try { if (fs.existsSync(pinned)) launchOpts = { executablePath: pinned }; } catch (e) {}

// Some suites read source files off disk rather than over HTTP. They used
// absolute paths into the container this was written in, which resolve here and
// nowhere else. Resolve the repo root once, relative to this file.
var REPO = require('path').join(__dirname, '..', '..');

module.exports = { BASE: BASE, launchOpts: launchOpts, REPO: REPO };
