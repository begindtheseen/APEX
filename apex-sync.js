/* ─────────────────────────────────────────────────────────────────────────
 * apex-sync.js — optional cross-device sync for APEX.
 *
 * APEX keeps ALL its progress in one localStorage blob: `apex_v4`. This module
 * mirrors that blob to your own private backend (Postgres + GoTrue + PostgREST)
 * so the same account syncs across phone, laptop, and a fresh browser.
 *
 * Design rules that keep the single-file app honest:
 *   • 100% additive. If sync is unconfigured or offline, the app behaves
 *     EXACTLY as before — pure localStorage, no accounts, fully offline.
 *   • No build step. Plain ES5-ish browser JS, loaded with a <script defer>.
 *   • Last-write-wins on the whole document, keyed by server `updated_at`.
 *     Fine for one user across several devices (APEX's actual use case).
 *
 * Configure the server once (persists in localStorage):
 *   APEXSync.configure('https://your-domain')         // from console, or
 *   set window.APEX_SYNC_CONFIG = { baseUrl: '...' }   // before this script
 * Then use the little "Sync" button it injects (bottom-left) to sign in.
 * ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var APP_KEY = 'apex_v4';
  var CFG_KEY = 'apex_sync_config';
  var SESS_KEY = 'apex_sync_session';
  var META_KEY = 'apex_sync_meta';     // { updatedAt: ISO } for local doc
  var PUSH_DEBOUNCE_MS = 2500;

  // ── config ────────────────────────────────────────────────────────────
  function loadCfg() {
    try {
      if (window.APEX_SYNC_CONFIG && window.APEX_SYNC_CONFIG.baseUrl) {
        return { baseUrl: stripSlash(window.APEX_SYNC_CONFIG.baseUrl) };
      }
      var raw = localStorage.getItem(CFG_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveCfg(c) { try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch (e) {} }
  function stripSlash(u) { return String(u).replace(/\/+$/, ''); }

  var cfg = loadCfg();
  function authUrl() { return cfg.baseUrl + '/auth'; }
  function restUrl() { return cfg.baseUrl + '/rest'; }

  // ── session ───────────────────────────────────────────────────────────
  function session() { try { return JSON.parse(localStorage.getItem(SESS_KEY) || 'null'); } catch (e) { return null; } }
  function setSession(s) {
    try { s ? localStorage.setItem(SESS_KEY, JSON.stringify(s)) : localStorage.removeItem(SESS_KEY); } catch (e) {}
  }
  function token() { var s = session(); return s && s.access_token; }
  function email() { var s = session(); return s && s.user && s.user.email; }

  // ── local doc helpers ───────────────────────────────────────────────────
  function localDoc() { try { return localStorage.getItem(APP_KEY) || '{}'; } catch (e) { return '{}'; } }
  function localUpdatedAt() {
    try { return (JSON.parse(localStorage.getItem(META_KEY) || '{}')).updatedAt || null; } catch (e) { return null; }
  }
  function touchLocal(iso) { try { localStorage.setItem(META_KEY, JSON.stringify({ updatedAt: iso || new Date().toISOString() })); } catch (e) {} }

  // ── network ─────────────────────────────────────────────────────────────
  function api(url, opts) {
    opts = opts || {};
    opts.headers = opts.headers || {};
    opts.headers['Content-Type'] = 'application/json';
    opts.headers['Accept'] = 'application/json';
    var t = token();
    if (t) opts.headers['Authorization'] = 'Bearer ' + t;
    return fetch(url, opts).then(function (r) {
      return r.text().then(function (body) {
        var json = null; try { json = body ? JSON.parse(body) : null; } catch (e) {}
        if (!r.ok) {
          var msg = (json && (json.msg || json.message || json.error_description || json.error)) || ('HTTP ' + r.status);
          var err = new Error(msg); err.status = r.status; throw err;
        }
        return json;
      });
    });
  }

  // ── auth actions ────────────────────────────────────────────────────────
  function signUp(em, pw) {
    return api(authUrl() + '/signup', { method: 'POST', body: JSON.stringify({ email: em, password: pw }) })
      .then(function (res) {
        // With autoconfirm on, signup returns a session; otherwise sign in.
        if (res && res.access_token) { setSession(res); return res; }
        return signIn(em, pw);
      });
  }
  function signIn(em, pw) {
    return api(authUrl() + '/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: em, password: pw }) })
      .then(function (res) { setSession(res); return res; });
  }
  function signOut() { setSession(null); }

  // ── pull / push ───────────────────────────────────────────────────────
  function pull() {
    return api(restUrl() + '/apex_state?select=data,updated_at', { method: 'GET' })
      .then(function (rows) { return (rows && rows[0]) || null; });
  }
  function push() {
    var doc;
    try { doc = JSON.parse(localDoc()); } catch (e) { doc = {}; }
    var iso = localUpdatedAt() || new Date().toISOString();
    var body = JSON.stringify({ data: doc, updated_at: iso });
    return api(restUrl() + '/apex_state?on_conflict=user_id', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body: body
    });
  }

  // Reconcile remote vs local once (on sign-in / startup / focus).
  function reconcile() {
    if (!token()) return Promise.resolve('signed-out');
    return pull().then(function (remote) {
      var localTime = localUpdatedAt();
      if (!remote) {                                   // server empty -> seed it
        if (localDoc() !== '{}') { touchLocal(localTime || new Date().toISOString()); return push().then(function () { return 'pushed'; }); }
        return 'noop';
      }
      var remoteTime = remote.updated_at;
      // Remote strictly newer -> adopt it and reload so the app re-reads state.
      if (!localTime || (remoteTime && remoteTime > localTime)) {
        try { localStorage.setItem(APP_KEY, JSON.stringify(remote.data || {})); } catch (e) {}
        touchLocal(remoteTime);
        return 'pulled';
      }
      // Local newer (or tie) -> push our copy up.
      if (localTime && (!remoteTime || localTime > remoteTime)) {
        return push().then(function () { return 'pushed'; });
      }
      return 'insync';
    });
  }

  // ── capture local saves ─────────────────────────────────────────────────
  // Wrap setItem so every app save bumps our timestamp + schedules a push.
  var pushTimer = null;
  (function hookSave() {
    var orig = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (k, v) {
      orig(k, v);
      if (k === APP_KEY) {
        touchLocal(new Date().toISOString());
        if (token()) schedulePush();
        renderStatus();
      }
    };
  })();
  function schedulePush() {
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      pushTimer = null;
      push().then(function () { renderStatus('Synced'); }).catch(function (e) { renderStatus('Offline'); });
    }, PUSH_DEBOUNCE_MS);
  }

  // ── tiny injected UI ────────────────────────────────────────────────────
  var elBtn, elPanel, elStatus;
  function renderStatus(note) {
    if (!elStatus) return;
    if (!cfg) { elStatus.textContent = 'Sync: not configured'; return; }
    if (!token()) { elStatus.textContent = 'Sync: signed out'; return; }
    elStatus.textContent = 'Sync: ' + (note || ('on — ' + (email() || 'account')));
  }
  function injectUI() {
    if (elBtn) return;
    var style = document.createElement('style');
    style.textContent =
      '#apexSyncBtn{position:fixed;left:12px;bottom:12px;z-index:99999;font:600 12px/1 system-ui,sans-serif;' +
      'background:#0b1220;color:#9fb3d1;border:1px solid #243049;border-radius:999px;padding:8px 12px;cursor:pointer;opacity:.85}' +
      '#apexSyncBtn:hover{opacity:1}' +
      '#apexSyncPanel{position:fixed;left:12px;bottom:52px;z-index:99999;width:260px;background:#0b1220;color:#cdd9ec;' +
      'border:1px solid #243049;border-radius:12px;padding:14px;font:13px/1.4 system-ui,sans-serif;display:none;box-shadow:0 10px 30px rgba(0,0,0,.5)}' +
      '#apexSyncPanel.open{display:block}' +
      '#apexSyncPanel input{width:100%;box-sizing:border-box;margin:4px 0;padding:8px;border-radius:8px;border:1px solid #243049;background:#070d18;color:#eaf1fb}' +
      '#apexSyncPanel button{margin:4px 4px 0 0;padding:7px 10px;border-radius:8px;border:1px solid #2a3b5c;background:#16233c;color:#cfe0f7;cursor:pointer}' +
      '#apexSyncPanel .muted{color:#7f93b3;font-size:11px;margin-top:8px}';
    document.head.appendChild(style);

    elBtn = document.createElement('button');
    elBtn.id = 'apexSyncBtn'; elBtn.textContent = 'Sync';
    elBtn.onclick = function () { elPanel.classList.toggle('open'); renderPanel(); };

    elPanel = document.createElement('div');
    elPanel.id = 'apexSyncPanel';

    document.body.appendChild(elBtn);
    document.body.appendChild(elPanel);
    renderPanel();
  }
  function field(id, ph, type) {
    return '<input id="' + id + '" placeholder="' + ph + '" type="' + (type || 'text') + '" autocapitalize="off" autocomplete="off">';
  }
  function renderPanel() {
    if (!elPanel) return;
    var html = '<div id="apexSyncStatus" style="font-weight:600;margin-bottom:6px"></div>';
    if (!cfg) {
      html += field('apexSrv', 'https://your-domain') +
        '<button id="apexSaveSrv">Save server</button>' +
        '<div class="muted">Point this at your private platform, then sign in.</div>';
    } else if (!token()) {
      html += field('apexEmail', 'email', 'email') + field('apexPw', 'password', 'password') +
        '<button id="apexSignIn">Sign in</button><button id="apexSignUp">Create</button>' +
        '<div class="muted">Server: ' + cfg.baseUrl + ' · <a href="#" id="apexEditSrv" style="color:#7fb0ff">change</a></div>';
    } else {
      html += '<button id="apexSyncNow">Sync now</button><button id="apexSignOut">Sign out</button>' +
        '<div class="muted">Account: ' + (email() || '') + '</div>';
    }
    elPanel.innerHTML = html;
    elStatus = document.getElementById('apexSyncStatus');
    wirePanel();
    renderStatus();
  }
  function wirePanel() {
    var byId = function (id) { return document.getElementById(id); };
    if (byId('apexSaveSrv')) byId('apexSaveSrv').onclick = function () {
      var v = (byId('apexSrv').value || '').trim(); if (!v) return;
      cfg = { baseUrl: stripSlash(v) }; saveCfg(cfg); renderPanel();
    };
    if (byId('apexEditSrv')) byId('apexEditSrv').onclick = function (e) { e.preventDefault(); cfg = null; try { localStorage.removeItem(CFG_KEY); } catch (x) {} renderPanel(); };
    if (byId('apexSignIn')) byId('apexSignIn').onclick = function () { doAuth(signIn); };
    if (byId('apexSignUp')) byId('apexSignUp').onclick = function () { doAuth(signUp); };
    if (byId('apexSignOut')) byId('apexSignOut').onclick = function () { signOut(); renderPanel(); };
    if (byId('apexSyncNow')) byId('apexSyncNow').onclick = function () { renderStatus('Syncing…'); reconcile().then(function (r) { renderStatus(r); if (r === 'pulled') location.reload(); }).catch(function (e) { renderStatus(e.message); }); };
  }
  function doAuth(fn) {
    var em = (document.getElementById('apexEmail').value || '').trim();
    var pw = document.getElementById('apexPw').value || '';
    if (!em || !pw) { renderStatus('email + password required'); return; }
    renderStatus('Working…');
    fn(em, pw).then(function () {
      renderPanel();
      return reconcile();
    }).then(function (r) {
      renderStatus(r === 'pulled' ? 'Pulled — reloading…' : 'Signed in');
      if (r === 'pulled') setTimeout(function () { location.reload(); }, 400);
    }).catch(function (e) { renderStatus(e.message || 'Sign-in failed'); });
  }

  // ── boot ────────────────────────────────────────────────────────────────
  function boot() {
    injectUI();
    if (cfg && token()) {
      reconcile().then(function (r) { renderStatus(r); if (r === 'pulled') location.reload(); }).catch(function () { renderStatus('Offline'); });
      window.addEventListener('focus', function () { reconcile().catch(function () {}); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // ── public API (console / power users) ──────────────────────────────────
  window.APEXSync = {
    configure: function (url) { cfg = { baseUrl: stripSlash(url) }; saveCfg(cfg); renderPanel && renderPanel(); return cfg; },
    signIn: signIn, signUp: signUp, signOut: signOut,
    sync: reconcile, push: push, pull: pull,
    status: function () { return { configured: !!cfg, signedIn: !!token(), email: email(), localUpdatedAt: localUpdatedAt() }; }
  };
})();
