/* ============================================================================
   LAUNCHPAD — claims: delta, checkpoints, artifact, gate
   ----------------------------------------------------------------------------
   LAUNCHPAD's unit is a module with an artifact and a gate, and the record of
   progress is what you claimed against it: the delta written, each checkpoint
   finished, the artifact built, and a referee's yes. This file is the rules of
   that record, carried over from the realm that used to live in APEX's
   index.html line for line, as pure functions over the learner state:

     · nothing can be claimed on a module that is still locked
     · the three steps are claimed in order, and the checkpoints only open once
       the delta is written; the artifact waits for every checkpoint
     · un-ticking a step un-ticks everything after it, here and in every module
       that depended on this one, so the record can never say "gate passed,
       artifact not built" or "M5 passed" while M4 is not
     · the hard gate holds Layers 4–6 shut, and closing it again takes back what
       it let you claim

   A module is unlocked when every module it depends on has its gate passed —
   the curriculum file's own isUnlocked(), which is called rather than copied.

   The ORBIT engine reads progress as a mastery number per module. Here that
   number comes from the claims: a passed gate is 1, and everything short of it
   stays under the 0.7 at which the engine counts a prerequisite as met, so the
   engine's unlocking is exactly the curriculum's. The hard gate rides on the
   same map under HARD_GATE_ID.
   ========================================================================== */
import {
  AI_CURRICULUM,
  AI_CURRICULUM_API,
  type LpModule,
  type LpProgress,
  type LpSetup,
} from '@/curriculum/generated/launchpad-data'
import type { LearnerState } from './state'

export type ClaimStep = 'delta' | 'artifact' | 'gate'
export const CLAIM_STEPS: ClaimStep[] = ['delta', 'artifact', 'gate']

export interface Claim {
  delta: boolean
  artifact: boolean
  gate: boolean
  /** Ticked checkpoints, keyed by a hash of the checkpoint's own text. */
  cp: Record<string, true>
}

/** Pseudo-module id for the Layer 3 → 4 hard gate in the mastery map. */
export const HARD_GATE_ID = '__hardgate'

/** The layers the hard gate holds shut. */
export function isHardGated(layer: number): boolean {
  return layer >= 4 && layer <= 6
}

const byId = new Map<string, LpModule>(AI_CURRICULUM.map((m) => [m.id, m]))
const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k)

/* ── Checkpoint keys ─────────────────────────────────────────────────────────
   A checkpoint's key is a hash of its text, not its position. Keying by index
   meant that editing the curriculum silently re-pointed a tick at a different
   checkpoint; with a content key, changing a checkpoint's wording loses that
   one tick — it is a different checkpoint now — and nothing else moves. The
   hash is the one the realm used, so existing records keep their ticks. */
export function cpKey(text: string): string {
  let h = 5381
  const str = String(text)
  for (let i = 0; i < str.length; i++) h = ((h * 33) ^ str.charCodeAt(i)) >>> 0
  return 'c' + h.toString(36)
}

export function cpKeys(id: string): string[] {
  return (byId.get(id)?.checkpoints ?? []).map(cpKey)
}

/**
 * The checkpoints a record has ticked, rebuilt against the curriculum's own
 * list. Accepts the old index-keyed form too. A record made before checkpoints
 * were enforced can say "artifact built" with nothing ticked; that claim was
 * made under the old rules and stands, so every checkpoint counts as ticked.
 */
function cpMap(id: string, src: unknown, entry?: { artifact?: unknown; gate?: unknown }): Record<string, true> {
  const out: Record<string, true> = {}
  const keys = cpKeys(id)
  if (src && typeof src === 'object' && !Array.isArray(src)) {
    const s = src as Record<string, unknown>
    keys.forEach((k, i) => {
      if (s[k] || s[String(i)]) out[k] = true
    })
  }
  if (entry && (entry.artifact || entry.gate) && keys.length && !keys.some((k) => out[k])) {
    for (const k of keys) out[k] = true
  }
  return out
}

/* ── Reading untrusted records ───────────────────────────────────────────────
   Everything that comes from disk, an import file or the old realm's storage
   is rebuilt field by field: only known module ids, only booleans, only finite
   positive numbers. */

export function emptyClaim(): Claim {
  return { delta: false, artifact: false, gate: false, cp: {} }
}

export function coerceClaims(raw: unknown): Record<string, Claim> {
  const out: Record<string, Claim> = {}
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out
  const src = raw as Record<string, unknown>
  for (const m of AI_CURRICULUM) {
    if (!has(src, m.id)) continue
    const v = src[m.id]
    if (!v || typeof v !== 'object' || Array.isArray(v)) continue
    const e = v as Record<string, unknown>
    out[m.id] = { delta: !!e.delta, artifact: !!e.artifact, gate: !!e.gate, cp: cpMap(m.id, e.cp, e) }
  }
  return out
}

export function coerceFlagship(raw: unknown): Record<string, true> {
  const out: Record<string, true> = {}
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out
  const src = raw as Record<string, unknown>
  for (const it of AI_CURRICULUM_API.flagshipGate({}).items) if (src[it.key]) out[it.key] = true
  return out
}

export function coerceSetup(raw: unknown): LpSetup {
  const out: LpSetup = {}
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out
  const s = raw as Record<string, unknown>
  const rn = Number(s.runwayMonths)
  const wh = Number(s.weeklyHours)
  if (Number.isFinite(rn) && rn > 0) out.runwayMonths = rn
  if (Number.isFinite(wh) && wh > 0) out.weeklyHours = wh
  if (typeof s.flagship === 'string') out.flagship = s.flagship.slice(0, 200)
  return out
}

/**
 * Modules were renumbered once, into ladder order. A record saved under the old
 * ids (stamp below 2) is carried across; the stamp keeps it from running twice.
 */
const OLD_IDS: Record<string, string> = {
  M0A: 'M1', M0B: 'M2', M1: 'M3', M2: 'M4', M4: 'M5', M9: 'M6', M3: 'M7', M5: 'M8', M6: 'M9',
  M7: 'M10', M10: 'M11', M11: 'M12', M21: 'M13', M12: 'M14', M13: 'M15', M14: 'M16', M15: 'M17',
  M16: 'M18', M17: 'M19', M18: 'M20', M19: 'M21', M20: 'M22', M22: 'M23', M8: 'M24', M23: 'M25',
  M24: 'M26', M25: 'M27', M26: 'M28', M27: 'M29', M28: 'M30', M29: 'M31', M30: 'M32',
}

export function migrateIds(mods: Record<string, unknown>, stamp: number): Record<string, unknown> {
  if (stamp >= 2) return mods
  const moved: Record<string, unknown> = {}
  for (const k of Object.keys(mods)) moved[has(OLD_IDS, k) ? OLD_IDS[k]! : k] = mods[k]
  return moved
}

/* ── The old realm's record ──────────────────────────────────────────────────
   The realm kept its record in localStorage under `apex_launchpad_v1`, and its
   backup file was that record with a timestamp. Both are read here, and the
   app keeps writing the same key, so the APEX launcher's "passed" count stays
   right and a year of progress survives the move in either direction. */

export const LEGACY_KEY = 'apex_launchpad_v1'

export interface LegacyRecord {
  mods: Record<string, { delta: boolean; artifact: boolean; gate: boolean; cp: Record<string, true> }>
  flagship: Record<string, true>
  setup: LpSetup
  ids: 2
  /**
   * Gates passed, and modules in all — written so the APEX launcher can show
   * the count without loading the curriculum. The realm ignored unknown keys,
   * so the record stays readable by anything that read it before.
   */
  passed: number
  total: number
}

export function isLegacyRecord(raw: unknown): boolean {
  const plain = (x: unknown) => !!x && typeof x === 'object' && !Array.isArray(x)
  if (!plain(raw)) return false
  const d = raw as Record<string, unknown>
  return plain(d.mods) || plain(d.flagship) || plain(d.setup)
}

/** Reads a realm record or backup. Null when it is not one. */
export function fromLegacy(
  raw: unknown,
): { claims: Record<string, Claim>; flagship: Record<string, true>; setup: LpSetup; unmatched: boolean } | null {
  if (!isLegacyRecord(raw)) return null
  const d = raw as Record<string, unknown>
  const mods = d.mods && typeof d.mods === 'object' && !Array.isArray(d.mods) ? (d.mods as Record<string, unknown>) : {}
  const keys = Object.keys(mods)
  // A file with no stamp predates the stamp only if its ids look like the old
  // scheme. Guessing wrong renumbers a good record onto the wrong modules.
  const looksOld = keys.some((k) => k === 'M0A' || k === 'M0B')
  const stamp = typeof d.ids === 'number' && d.ids >= 1 ? d.ids : looksOld ? 1 : 2
  const claims = coerceClaims(migrateIds(mods, stamp))
  return {
    claims,
    flagship: coerceFlagship(d.flagship),
    setup: coerceSetup(d.setup),
    unmatched: keys.length > 0 && Object.keys(claims).length === 0,
  }
}

export function toLegacy(state: Pick<LearnerState, 'claims' | 'flagship' | 'setup'>): LegacyRecord {
  const mods: LegacyRecord['mods'] = {}
  for (const [id, c] of Object.entries(state.claims)) {
    mods[id] = { delta: c.delta, artifact: c.artifact, gate: c.gate, cp: { ...c.cp } }
  }
  const passed = AI_CURRICULUM.filter((m) => mods[m.id]?.gate).length
  return { mods, flagship: { ...state.flagship }, setup: { ...state.setup }, ids: 2, passed, total: AI_CURRICULUM.length }
}

/* ── Reading the record ──────────────────────────────────────────────────── */

export function claimOf(state: Pick<LearnerState, 'claims'>, id: string): Claim {
  const c = has(state.claims, id) ? state.claims[id] : undefined
  return c ? { ...c, cp: { ...c.cp } } : emptyClaim()
}

/** The progress map the curriculum API takes. Built from the curriculum's ids. */
export function progressOf(state: Pick<LearnerState, 'claims' | 'flagship'>): LpProgress {
  const p: LpProgress = {}
  for (const m of AI_CURRICULUM) {
    if (!has(state.claims, m.id)) continue
    const c = state.claims[m.id]!
    p[m.id] = { delta: c.delta, artifact: c.artifact, gate: c.gate, cp: { ...c.cp } }
  }
  p.__flagship = { ...state.flagship }
  return p
}

export function cpCount(state: Pick<LearnerState, 'claims'>, id: string): { done: number; total: number } {
  const keys = cpKeys(id)
  const c = claimOf(state, id)
  return { done: keys.filter((k) => c.cp[k]).length, total: keys.length }
}

export function isPassed(state: Pick<LearnerState, 'claims'>, id: string): boolean {
  return !!(has(state.claims, id) && state.claims[id]!.gate)
}

export function isUnlocked(state: Pick<LearnerState, 'claims' | 'flagship'>, id: string): boolean {
  return AI_CURRICULUM_API.isUnlocked(id, progressOf(state))
}

export function hardGate(state: Pick<LearnerState, 'claims' | 'flagship'>) {
  return AI_CURRICULUM_API.flagshipGate(progressOf(state))
}

/**
 * How far into a module the record is, 0–1. A passed gate is the whole
 * module. Short of it, the delta, each checkpoint and the artifact each count
 * as one step, scaled into [0, 0.6] so an unpassed module can never read as a
 * met prerequisite (0.7) or as done (0.9) anywhere in the engine.
 */
export function claimProgress(state: Pick<LearnerState, 'claims'>, id: string): number {
  const c = claimOf(state, id)
  if (c.gate) return 1
  const cc = cpCount(state, id)
  const steps = 2 + cc.total
  const got = (c.delta ? 1 : 0) + cc.done + (c.artifact ? 1 : 0)
  return 0.6 * (got / steps)
}

/** The mastery map the engine runs on, plus the hard gate under its pseudo-id. */
export function claimsMasteryMap(state: Pick<LearnerState, 'claims' | 'flagship'>): Map<string, number> {
  const out = new Map<string, number>()
  for (const m of AI_CURRICULUM) out.set(m.id, claimProgress(state, m.id))
  out.set(HARD_GATE_ID, hardGate(state).open ? 1 : 0)
  return out
}

/* ── Words for the reader ────────────────────────────────────────────────── */

/** Module ids sort by their number, so M10 does not come before M2. */
export function sortIds(list: string[]): string[] {
  return list.slice().sort((a, b) => parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10))
}

export function andList(list: string[]): string {
  if (list.length <= 1) return list.join('')
  return list.slice(0, -1).join(', ') + ' and ' + list[list.length - 1]
}

/**
 * Why a module is locked, nearest blocker first. Telling a reader on day one
 * that the only thing in their way is a hard gate nineteen modules away sends
 * them at the wrong thing, when what blocks them is the module directly above.
 */
export function lockWhy(state: Pick<LearnerState, 'claims' | 'flagship'>, id: string): string {
  const m = byId.get(id)
  if (!m) return 'Locked.'
  const unmet = m.dependsOn.filter((d) => !isPassed(state, d))
  const gateShut = isHardGated(m.layer) && !hardGate(state).open
  if (unmet.length && gateShut) return `Locked. ${andList(sortIds(unmet))} first — and then the hard gate.`
  if (unmet.length) return `Locked. ${andList(sortIds(unmet))} ${unmet.length > 1 ? 'have' : 'has'} to pass first.`
  if (gateShut) return 'The hard gate is not open yet — all four conditions first.'
  return 'Locked.'
}

/** Per-module delta instruction, where it is not the usual documentation read. */
export const DELTA_LINES: Record<string, string> = {
  M0: 'There is no documentation to read for this module. Your delta is one paragraph, written before anything else: what you believe this program will take. What follows is the argument the plan rests on — read it, then write that paragraph, and read it again in month four.',
  M27: 'Your delta here is not documentation. It is the twenty postings from M0 read against what you assumed the market pays, with every place you were wrong written down.',
  M31: 'Your delta here is not documentation. It is what you assumed an employed week would look like, written down before the job starts, so month three can be read against it.',
  M32: 'Your delta here is not documentation. It is what you expect the first ninety days to be, written before day one, against what they turn out to be.',
}

export function deltaLine(id: string): string {
  return (
    DELTA_LINES[id] ??
    'Read the official documentation for the tools in this module, not a tutorial, and write down every place it proved you wrong. That page of notes is your delta, and it is the proof you read.'
  )
}

function deltaFirst(id: string): string {
  return DELTA_LINES[id] ? 'Write the delta first' : 'Write the delta first — that is the reading'
}

/* ── Changing the record ─────────────────────────────────────────────────────
   Each change is planned first and applied second. A plan is one of three
   things: refused, with the sentence that says why; safe, with the new state;
   or destructive, with the lines to show before anything is cleared and the
   state to apply if the reader says yes. */

export type ClaimPlan =
  | { kind: 'blocked'; message: string }
  | { kind: 'ok'; state: LearnerState }
  | { kind: 'confirm'; lines: string[]; state: LearnerState }

type Claims = Record<string, Claim>

/** Modules downstream of `id` that currently have something claimed. */
export function downstreamClaimed(state: Pick<LearnerState, 'claims'>, id: string): string[] {
  const queue = [id]
  const seen = new Set<string>()
  const hit: string[] = []
  while (queue.length) {
    const cur = queue.shift()!
    for (const m of AI_CURRICULUM) {
      if (seen.has(m.id) || !m.dependsOn.includes(cur)) continue
      seen.add(m.id)
      const e = has(state.claims, m.id) ? state.claims[m.id]! : null
      if (e && (e.delta || e.artifact || e.gate || cpCount(state, m.id).done)) hit.push(m.id)
      queue.push(m.id)
    }
  }
  return hit
}

function downstreamCheckpoints(state: Pick<LearnerState, 'claims'>, id: string): number {
  return downstreamClaimed(state, id).reduce((a, x) => a + cpCount(state, x).done, 0)
}

function clearDownstream(claims: Claims, id: string): void {
  const queue = [id]
  const seen = new Set<string>()
  while (queue.length) {
    const cur = queue.shift()!
    for (const m of AI_CURRICULUM) {
      if (seen.has(m.id) || !m.dependsOn.includes(cur)) continue
      seen.add(m.id)
      if (has(claims, m.id)) claims[m.id] = emptyClaim()
      queue.push(m.id)
    }
  }
}

function withClaims(state: LearnerState, claims: Claims, flagship = state.flagship): LearnerState {
  return { ...state, claims, flagship, updatedAt: new Date().toISOString() }
}

function copyClaims(state: LearnerState): Claims {
  const out: Claims = {}
  for (const [k, v] of Object.entries(state.claims)) out[k] = { ...v, cp: { ...v.cp } }
  return out
}

export function planStep(state: LearnerState, id: string, step: ClaimStep): ClaimPlan {
  if (!byId.has(id)) return { kind: 'blocked', message: 'Unknown module.' }
  // 1. A module you have not opened yet has nothing to claim.
  if (!isUnlocked(state, id)) return { kind: 'blocked', message: lockWhy(state, id) }
  const m = claimOf(state, id)
  const i = CLAIM_STEPS.indexOf(step)
  // 2. In order.
  if (!m[step] && i > 0) {
    const first = CLAIM_STEPS.slice(0, i).findIndex((s) => !m[s])
    if (first === 0) return { kind: 'blocked', message: deltaFirst(id) }
    if (first === 1) return { kind: 'blocked', message: 'Build the artifact before a referee can pass it' }
  }
  // 2b. The checkpoints are the module.
  if (!m[step] && (step === 'artifact' || step === 'gate')) {
    const cc = cpCount(state, id)
    if (cc.total && cc.done < cc.total) {
      return { kind: 'blocked', message: `Tick the checkpoints first — ${cc.done} of ${cc.total} done` }
    }
  }

  const claims = copyClaims(state)
  if (!m[step]) {
    claims[id] = { ...m, [step]: true }
    return { kind: 'ok', state: withClaims(state, claims) }
  }

  // 3. Un-ticking a step un-ticks everything that followed from it.
  const alsoHere = CLAIM_STEPS.slice(i + 1).filter((s) => m[s])
  const alsoAfter = step !== 'gate' || m.gate ? downstreamClaimed(state, id) : []
  const next: Claim = { ...m }
  for (let k = i; k < CLAIM_STEPS.length; k++) next[CLAIM_STEPS[k]!] = false
  if (step === 'delta') next.cp = {}
  claims[id] = next
  if (step === 'gate' || i < CLAIM_STEPS.indexOf('gate')) clearDownstream(claims, id)
  const out = withClaims(state, claims)

  if (!alsoHere.length && !alsoAfter.length) return { kind: 'ok', state: out }
  const lines = [`Un-ticking "${step}" on ${id} also clears:`]
  if (alsoHere.length) lines.push(`  · ${alsoHere.join(' and ')} on ${id}`)
  const cpHere = step === 'delta' ? cpCount(state, id).done : 0
  const cpAfter = downstreamCheckpoints(state, id)
  if (cpHere) lines.push(`  · ${cpHere} ticked checkpoint${cpHere > 1 ? 's' : ''} on ${id}`)
  if (cpAfter) lines.push(`  · ${cpAfter} ticked checkpoint${cpAfter > 1 ? 's' : ''} on the modules after it`)
  if (alsoAfter.length) {
    lines.push(
      alsoAfter.length > 6
        ? `  · every claim on the other ${alsoAfter.length} modules that follow from it — that is your whole record`
        : `  · every claim on ${sortIds(alsoAfter).join(', ')}`,
    )
  }
  lines.push('', 'Export your progress first if you want to keep it.', 'This cannot be undone. Continue?')
  return { kind: 'confirm', lines, state: out }
}

export function planCheckpoint(state: LearnerState, id: string, idx: number): ClaimPlan {
  const mod = byId.get(id)
  if (!mod || !mod.checkpoints) return { kind: 'blocked', message: 'Unknown checkpoint.' }
  if (!(idx >= 0 && idx < mod.checkpoints.length)) return { kind: 'blocked', message: 'Unknown checkpoint.' }
  if (!isUnlocked(state, id)) return { kind: 'blocked', message: lockWhy(state, id) }
  const m = claimOf(state, id)
  if (!m.delta) return { kind: 'blocked', message: deltaFirst(id) }
  const key = cpKey(mod.checkpoints[idx]!)
  const claims = copyClaims(state)

  if (!m.cp[key]) {
    claims[id] = { ...m, cp: { ...m.cp, [key]: true } }
    return { kind: 'ok', state: withClaims(state, claims) }
  }

  const next: Claim = { ...m, cp: { ...m.cp } }
  delete next.cp[key]
  if (!m.artifact && !m.gate) {
    claims[id] = next
    return { kind: 'ok', state: withClaims(state, claims) }
  }
  // Un-ticking a checkpoint takes back the artifact and the gate that rested on it.
  const also = [m.artifact ? 'Artifact built' : null, m.gate ? 'Gate passed' : null].filter(Boolean)
  const after = m.gate ? downstreamClaimed(state, id) : []
  const lines = [`Un-ticking checkpoint ${idx + 1} on ${id} also clears:`, `  · ${also.join(' and ')} on ${id}`]
  if (after.length) {
    const cpn = downstreamCheckpoints(state, id)
    lines.push(
      `  · every claim on the ${after.length} module${after.length > 1 ? 's' : ''} after it` +
        (cpn ? `, including ${cpn} ticked checkpoint${cpn > 1 ? 's' : ''}` : ''),
    )
  }
  lines.push('', 'Export your progress first if you want to keep it.', 'This cannot be undone. Continue?')
  next.artifact = false
  next.gate = false
  claims[id] = next
  if (m.gate) clearDownstream(claims, id)
  return { kind: 'confirm', lines, state: withClaims(state, claims) }
}

/** Ticks or un-ticks one of the hard gate's four conditions. */
export function planFlag(state: LearnerState, key: string): ClaimPlan {
  if (!AI_CURRICULUM_API.flagshipGate({}).items.some((i) => i.key === key)) {
    return { kind: 'blocked', message: 'Unknown condition.' }
  }
  const flagship = { ...state.flagship }
  if (!flagship[key]) {
    flagship[key] = true
    return { kind: 'ok', state: withClaims(state, state.claims, flagship) }
  }
  // Closing the gate again has to un-claim the modules it let you claim.
  delete flagship[key]
  const held = AI_CURRICULUM.filter((m) => {
    const e = has(state.claims, m.id) ? state.claims[m.id]! : null
    return isHardGated(m.layer) && e && (e.delta || e.artifact || e.gate)
  }).map((m) => m.id)
  const claims = copyClaims(state)
  for (const id of held) claims[id] = emptyClaim()
  const out = withClaims(state, claims, flagship)
  if (!held.length) return { kind: 'ok', state: out }
  return {
    kind: 'confirm',
    lines: [
      `Un-ticking this closes the hard gate, which clears every claim on ${held.join(', ')}.`,
      '',
      'This cannot be undone. Continue?',
    ],
    state: out,
  }
}

/**
 * The Plan's inputs, stored as the realm stored them: a number that is not
 * above zero is kept as 0 rather than dropped, so plan() can say that it was
 * refused and why ("That is not a plan: a runway of 0 months…") instead of
 * reading an empty field as one never filled in. Loading a record drops the
 * zeros again, as the realm's clean-up did.
 */
export function setSetup(state: LearnerState, field: keyof LpSetup, value: string): LearnerState {
  const setup: LpSetup = { ...state.setup }
  if (field === 'flagship') {
    setup.flagship = value.slice(0, 200)
  } else {
    const n = parseFloat(value)
    setup[field] = Number.isFinite(n) && n > 0 ? n : 0
  }
  return { ...state, setup, updatedAt: new Date().toISOString() }
}
