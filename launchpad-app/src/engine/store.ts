/* ============================================================================
   LAUNCHPAD — persistence (ORBIT's)
   ----------------------------------------------------------------------------
   Local-first, no account, no server. Everything the learner does lives in
   IndexedDB on the device they did it on.

   That is a real trade-off and the product should be honest about it: clearing
   site data loses the collection. So export is a first-class action, not a
   buried one, and the app asks for persistent storage up front rather than
   leaving the origin evictable under pressure.

   IndexedDB with a localStorage fallback — Safari private mode and some
   embedded webviews refuse to open a database at all, and losing a session is
   better than failing to start.
   ========================================================================== */
import { LEGACY_KEY, fromLegacy, toLegacy } from './claims'
import { migrateState, newLearnerState, type LearnerState } from './state'

// Named for this app, not ORBIT's: both can be served from the same origin
// (github.io), and two apps sharing one database would overwrite each other.
const DB_NAME = 'launchpad'
// v2 adds the snapshots store. Bumping the version is what triggers the
// upgrade; an existing database keeps its state record untouched.
const DB_VERSION = 2
const STORE = 'state'
const SNAPSHOTS = 'snapshots'
const KEY = 'learner'
const LS_KEY = 'launchpad_state_v1'

/**
 * How many past writes to keep. Five is enough to step back past a bad write
 * without the store growing without bound; the state is a few hundred KB.
 */
const SNAPSHOT_KEEP = 5
/** Don't snapshot more often than this — a study session writes constantly. */
const SNAPSHOT_EVERY_MS = 60_000

/**
 * Debounce for ordinary writes. Short enough that a crash costs at most a
 * keystroke or two, long enough that typing does not write on every character.
 * Anything that would actually hurt to lose calls `saveStateNow` instead.
 */
export const SAVE_DEBOUNCE_MS = 250

let dbPromise: Promise<IDBDatabase | null> | null = null

function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null)
      return
    }
    let settled = false
    const done = (v: IDBDatabase | null) => {
      if (settled) return
      settled = true
      resolve(v)
    }

    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
        if (!db.objectStoreNames.contains(SNAPSHOTS)) db.createObjectStore(SNAPSHOTS)
      }
      req.onsuccess = () => done(req.result)
      req.onerror = () => done(null)
      req.onblocked = () => done(null)
      // Private-mode Safari can hang rather than error.
      setTimeout(() => done(null), 3000)
    } catch {
      done(null)
    }
  })
  return dbPromise
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDb()
  if (!db) return undefined
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(key)
      req.onsuccess = () => resolve(req.result as T | undefined)
      req.onerror = () => resolve(undefined)
    } catch {
      resolve(undefined)
    }
  })
}

async function idbSet(key: string, value: unknown, store = STORE): Promise<boolean> {
  const db = await openDb()
  if (!db) return false
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(store, 'readwrite')
      tx.objectStore(store).put(value, key)
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => resolve(false)
      tx.onabort = () => resolve(false)
    } catch {
      resolve(false)
    }
  })
}

/* ── Snapshots ───────────────────────────────────────────────────────────── */

/**
 * A rolling set of past writes, kept in their own object store.
 *
 * IndexedDB transactions are atomic, so the live record cannot be torn by a
 * crash mid-write. What snapshots protect against is the other failure: a
 * write that succeeds and is wrong — a bad restore, a botched import, a
 * corrupted record that still parses. Without them the only way back is a
 * backup file she may not have made.
 */
let lastSnapshotAt = 0

async function snapshot(state: LearnerState, now: number): Promise<void> {
  if (now - lastSnapshotAt < SNAPSHOT_EVERY_MS) return
  lastSnapshotAt = now
  const db = await openDb()
  if (!db) return
  await idbSet(String(now), state, SNAPSHOTS)
  // Trim oldest-first. Keys are millisecond timestamps, so lexical order on
  // fixed-width numbers is chronological for any date this app will see.
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(SNAPSHOTS, 'readwrite')
      const os = tx.objectStore(SNAPSHOTS)
      const req = os.getAllKeys()
      req.onsuccess = () => {
        const keys = (req.result as IDBValidKey[]).slice().sort()
        for (const k of keys.slice(0, Math.max(0, keys.length - SNAPSHOT_KEEP))) os.delete(k)
      }
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
      tx.onabort = () => resolve()
    } catch {
      resolve()
    }
  })
}

export interface SnapshotInfo {
  /** Millisecond timestamp the snapshot was taken. */
  at: number
  state: LearnerState
}

/** Newest first. Used by Settings to offer a step back from a bad write. */
export async function listSnapshots(): Promise<SnapshotInfo[]> {
  const db = await openDb()
  if (!db) return []
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(SNAPSHOTS, 'readonly')
      const os = tx.objectStore(SNAPSHOTS)
      const keysReq = os.getAllKeys()
      const valsReq = os.getAll()
      tx.oncomplete = () => {
        const keys = keysReq.result as IDBValidKey[]
        const vals = valsReq.result as unknown[]
        const out: SnapshotInfo[] = []
        keys.forEach((k, i) => {
          const at = Number(k)
          if (Number.isFinite(at) && vals[i]) out.push({ at, state: migrateState(vals[i]) })
        })
        resolve(out.sort((a, b) => b.at - a.at))
      }
      tx.onerror = () => resolve([])
      tx.onabort = () => resolve([])
    } catch {
      resolve([])
    }
  })
}

/* ── Desktop disk mirror ─────────────────────────────────────────────────── */

/**
 * On the desktop the state is also written to a plain JSON file in the app's
 * data directory, through the shell's bridge. That file is the one thing here
 * that survives the browser storage being cleared or the profile being
 * rebuilt, and it is what makes "the computer died" a non-event rather than a
 * lost evening. The shell writes it atomically (temp file, then rename).
 *
 * The mirror is best-effort and deliberately never awaited on the hot path:
 * IndexedDB is the source of truth, and a slow disk must not make answering a
 * question feel slow.
 */
interface BackupBridge {
  write(json: string): Promise<boolean>
  read(): Promise<string | null>
}

function backupBridge(): BackupBridge | undefined {
  if (typeof window === 'undefined') return undefined
  const b = (window as { orbit?: { backup?: unknown } }).orbit?.backup
  if (!b || typeof b !== 'object') return undefined
  const cand = b as Partial<BackupBridge>
  return typeof cand.write === 'function' && typeof cand.read === 'function'
    ? (cand as BackupBridge)
    : undefined
}

let lastMirrorAt = 0
const MIRROR_EVERY_MS = 10_000

function mirrorToDisk(state: LearnerState, now: number, force: boolean): void {
  const bridge = backupBridge()
  if (!bridge) return
  if (!force && now - lastMirrorAt < MIRROR_EVERY_MS) return
  lastMirrorAt = now
  void bridge.write(JSON.stringify(makeBackup(state))).catch(() => false)
}

/* ── Public API ──────────────────────────────────────────────────────────── */

/**
 * Reads the learner back, trying each store in order of trustworthiness and
 * healing the ones that came back empty.
 *
 *   1. IndexedDB — the live record.
 *   2. localStorage — used when IndexedDB refused to open at all.
 *   3. The desktop's JSON file — survives cleared site data and a rebuilt
 *      browser profile, which the first two do not.
 *   4. The newest snapshot — only reached if the live record vanished but the
 *      database itself is intact.
 *
 * Anything found lower down is written back up, so one bad boot does not
 * become a permanent demotion to the weaker store.
 */
export async function loadState(): Promise<LearnerState> {
  const stored = await loadStored()
  const adopted = adoptLegacy(stored)
  // Written straight away, so the adoption stamp and the counts the launcher
  // reads are on disk before anything else happens.
  if (adopted !== stored) void writeNow(adopted)
  return adopted
}

/**
 * Carries the old realm's record across, once.
 *
 * LAUNCHPAD used to run inside APEX's index.html and kept its claims in
 * localStorage under `apex_launchpad_v1`. The first time this app loads on a
 * device, that record is read into the claims here and stamped so it is never
 * read again. A value that cannot be read is kept under a dated key rather
 * than lost, exactly as the realm did.
 */
export function adoptLegacy(state: LearnerState, now: Date = new Date()): LearnerState {
  if (state.legacyImportedAt) return state
  let raw: string | null = null
  try {
    raw = localStorage.getItem(LEGACY_KEY)
  } catch {
    return state
  }
  const stamped = { ...state, legacyImportedAt: now.toISOString() }
  if (!raw) return stamped
  try {
    const legacy = fromLegacy(JSON.parse(raw))
    if (!legacy || legacy.unmatched) return stamped
    // Anything already claimed here wins: this app has been used since.
    if (Object.keys(state.claims).length > 0) return stamped
    return { ...stamped, claims: legacy.claims, flagship: legacy.flagship, setup: legacy.setup }
  } catch {
    try {
      localStorage.setItem(`${LEGACY_KEY}_unreadable_${now.getTime()}`, raw)
    } catch {
      /* nowhere to keep it */
    }
    return stamped
  }
}

async function loadStored(): Promise<LearnerState> {
  const fromIdb = await idbGet<unknown>(KEY)
  if (fromIdb) return migrateState(fromIdb)

  // Fall back to localStorage, and migrate it into IndexedDB if that works.
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      const parsed = migrateState(JSON.parse(raw))
      void idbSet(KEY, parsed)
      return parsed
    }
  } catch {
    /* storage disabled — try the disk */
  }

  const bridge = backupBridge()
  if (bridge) {
    try {
      const text = await bridge.read()
      if (text) {
        const restored = parseBackup(text)
        if (restored.ok) {
          void idbSet(KEY, restored.state)
          return restored.state
        }
      }
    } catch {
      /* unreadable file — fall through to snapshots */
    }
  }

  const snaps = await listSnapshots()
  if (snaps[0]) {
    void idbSet(KEY, snaps[0].state)
    return snaps[0].state
  }

  return newLearnerState()
}

let saveTimer: ReturnType<typeof setTimeout> | null = null
let pending: LearnerState | null = null

/**
 * Debounced write. Study sessions fire a state change per graded item, and
 * writing the whole collection on every keystroke-speed event is what makes
 * local-first apps feel sluggish.
 */
export function saveState(state: LearnerState, delay = SAVE_DEBOUNCE_MS): void {
  pending = state
  if (delay <= 0) {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = null
    pending = null
    void writeNow(state)
    return
  }
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    saveTimer = null
    const s = pending
    pending = null
    if (s) void writeNow(s)
  }, delay)
}

/**
 * Writes immediately, skipping the debounce.
 *
 * Used for the moments where losing the last few hundred milliseconds would
 * actually cost something: an answer graded, a lesson finished, a session
 * started or abandoned. Typing keeps the debounce — that is what it is for.
 */
export function saveStateNow(state: LearnerState): void {
  saveState(state, 0)
}

/**
 * Forces any pending write out and mirrors it to disk unconditionally. Called
 * whenever the app might be about to stop existing: hidden, blurred, frozen,
 * unloading, or quitting.
 */
export async function flushState(): Promise<void> {
  if (saveTimer) {
    clearTimeout(saveTimer)
    saveTimer = null
  }
  const s = pending
  pending = null
  if (s) {
    await writeNow(s)
    mirrorToDisk(s, Date.now(), true)
  } else {
    await writeChain
  }
}

/**
 * Writes are chained rather than fired in parallel. Two overlapping writes of
 * different states can complete in either order, and the loser wins the record
 * — which is how a saved answer silently becomes an unsaved one.
 */
let writeChain: Promise<void> = Promise.resolve()

function writeNow(state: LearnerState): Promise<void> {
  writeChain = writeChain.then(() => writeOnce(state)).catch(() => undefined)
  return writeChain
}

async function writeOnce(state: LearnerState): Promise<void> {
  const now = Date.now()
  const ok = await idbSet(KEY, state)
  if (!ok) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state))
    } catch {
      /* quota or disabled — the disk mirror below is the last line */
    }
  }
  mirrorLegacy(state)
  await snapshot(state, now).catch(() => undefined)
  mirrorToDisk(state, now, false)
}

/**
 * Keeps the old realm's key current. The APEX launcher reads it for the
 * "passed" count on the LAUNCHPAD panel, and anything else that knew the
 * record by that name keeps working. Written only once the old record has
 * been adopted, so a first boot can never overwrite it with an empty one.
 */
function mirrorLegacy(state: LearnerState): void {
  if (!state.legacyImportedAt) return
  try {
    localStorage.setItem(LEGACY_KEY, JSON.stringify(toLegacy(state)))
  } catch {
    /* quota or disabled — the record itself is in IndexedDB */
  }
}

/**
 * Asks the browser to make this origin's storage persistent so it is not
 * evicted under disk pressure. Chrome grants it silently on engaged origins;
 * Safari ignores it. Worth asking regardless — the downside is nothing.
 */
export async function requestPersistence(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false
    if (await navigator.storage.persisted?.()) return true
    return await navigator.storage.persist()
  } catch {
    return false
  }
}

export interface StorageEstimate {
  usedBytes: number
  quotaBytes: number
  persisted: boolean
}

export async function storageEstimate(): Promise<StorageEstimate | null> {
  try {
    if (!navigator.storage?.estimate) return null
    const e = await navigator.storage.estimate()
    return {
      usedBytes: e.usage ?? 0,
      quotaBytes: e.quota ?? 0,
      persisted: (await navigator.storage.persisted?.()) ?? false,
    }
  } catch {
    return null
  }
}

/* ── Backup ──────────────────────────────────────────────────────────────── */

export interface BackupFile {
  app: 'launchpad'
  version: number
  exportedAt: string
  state: LearnerState
}

export function makeBackup(state: LearnerState): BackupFile {
  return { app: 'launchpad', version: state.version, exportedAt: new Date().toISOString(), state }
}

export function downloadBackup(state: LearnerState): void {
  const blob = new Blob([JSON.stringify(makeBackup(state), null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `launchpad-backup-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Revoke on the next tick so Safari has time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export type RestoreResult =
  /**
   * `claimsOnly` marks a backup from the old LAUNCHPAD realm: it carries the
   * claims, the hard gate and the plan and nothing else, so restoring it
   * replaces those and leaves recall history alone.
   */
  | { ok: true; state: LearnerState; claimsOnly?: boolean }
  | { ok: false; error: string }

/**
 * Parses a backup file. Everything goes through `migrateState`, so a malformed
 * or hostile file cannot put invalid values into the engine — the worst it can
 * do is restore an empty collection.
 */
export function parseBackup(text: string): RestoreResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return { ok: false, error: 'That file is not valid JSON.' }
  }

  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, error: 'That file does not contain a backup.' }
  }

  const body = parsed as Partial<BackupFile> & { app?: string }
  if (body.app && body.app !== 'launchpad') {
    return { ok: false, error: `That is a backup from ${String(body.app).toUpperCase()}, not from LAUNCHPAD.` }
  }

  // A backup written by the old LAUNCHPAD realm inside APEX.
  if (!body.app) {
    const legacy = fromLegacy(parsed)
    if (legacy) {
      if (legacy.unmatched) {
        return { ok: false, error: 'That backup does not match this curriculum — nothing was changed.' }
      }
      const state = { ...newLearnerState(), claims: legacy.claims, flagship: legacy.flagship, setup: legacy.setup }
      return { ok: true, state, claimsOnly: true }
    }
  }

  const raw = body.app === 'launchpad' && body.state ? body.state : parsed
  const state = migrateState(raw)

  const itemCount = Object.keys(state.items).length
  const topicCount = Object.keys(state.topics).length
  const claimCount = Object.keys(state.claims).length
  if (itemCount === 0 && topicCount === 0 && claimCount === 0 && state.attempts.length === 0) {
    return { ok: false, error: 'That backup is empty — nothing to restore.' }
  }

  return { ok: true, state }
}

/** Wipes everything. The caller is responsible for confirming first. */
export async function clearAll(): Promise<void> {
  if (saveTimer) {
    clearTimeout(saveTimer)
    saveTimer = null
  }
  pending = null

  const db = await openDb()
  if (db) {
    await new Promise<void>((resolve) => {
      try {
        const tx = db.transaction(STORE, 'readwrite')
        tx.objectStore(STORE).delete(KEY)
        tx.oncomplete = () => resolve()
        tx.onerror = () => resolve()
      } catch {
        resolve()
      }
    })
  }
  try {
    localStorage.removeItem(LS_KEY)
    // The old realm's key too, or the next boot would adopt it straight back.
    localStorage.removeItem(LEGACY_KEY)
  } catch {
    /* ignore */
  }
}
