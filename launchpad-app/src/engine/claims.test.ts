/* ============================================================================
   LAUNCHPAD — the claims record keeps the realm's rules
   ----------------------------------------------------------------------------
   These pin the rules the realm in APEX's index.html enforced, now that they
   live in engine/claims.ts: claims in order, checkpoints behind the delta,
   the artifact behind every checkpoint, locks from unpassed gates and the hard
   gate, un-ticking that cascades downstream, and a year of progress carried
   across from the old record — renumbered ids, index-keyed checkpoints and
   all — without a tick lost or invented.
   ========================================================================== */
import { beforeEach, describe, expect, it } from 'vitest'
import { AI_CURRICULUM, AI_CURRICULUM_API } from '@/curriculum/generated/launchpad-data'
import {
  HARD_GATE_ID,
  LEGACY_KEY,
  claimOf,
  claimProgress,
  claimsMasteryMap,
  cpKey,
  cpKeys,
  fromLegacy,
  hardGate,
  isUnlocked,
  lockWhy,
  planCheckpoint,
  planFlag,
  planStep,
  setSetup,
  toLegacy,
  type ClaimPlan,
} from './claims'
import { dag } from '@/curriculum'
import { newLearnerState, type LearnerState } from './state'
import { adoptLegacy } from './store'

const fresh = () => newLearnerState(new Date('2026-01-01T00:00:00Z'))

function apply(plan: ClaimPlan): LearnerState {
  if (plan.kind === 'blocked') throw new Error(`blocked: ${plan.message}`)
  return plan.state
}

/** Passes a module the honest way: delta, every checkpoint, artifact, gate. */
function pass(s: LearnerState, id: string): LearnerState {
  s = apply(planStep(s, id, 'delta'))
  const n = AI_CURRICULUM_API.byId(id)!.checkpoints?.length ?? 0
  for (let i = 0; i < n; i++) s = apply(planCheckpoint(s, id, i))
  s = apply(planStep(s, id, 'artifact'))
  return apply(planStep(s, id, 'gate'))
}

describe('checkpoint keys', () => {
  it('hashes the checkpoint text exactly as the realm did', () => {
    // djb2-xor over UTF-16 code units, base 36, "c" prefix: the realm's lpCpKey.
    let h = 5381
    const t = 'One job written to the table and picked up by a worker'
    for (let i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0
    expect(cpKey(t)).toBe('c' + h.toString(36))
    expect(cpKeys('M8')[0]).toBe(cpKey(t))
  })
})

describe('claiming in order', () => {
  it('refuses the artifact or the gate before the delta', () => {
    const p = planStep(fresh(), 'M0', 'gate')
    expect(p.kind).toBe('blocked')
    expect(p.kind === 'blocked' && p.message).toMatch(/delta first/i)
  })

  it('refuses the gate before the artifact', () => {
    const s = apply(planStep(fresh(), 'M0', 'delta'))
    const p = planStep(s, 'M0', 'gate')
    expect(p.kind === 'blocked' && p.message).toMatch(/artifact/i)
  })

  it('keeps the checkpoints shut until the delta is written', () => {
    const s = pass(pass(fresh(), 'M0'), 'M1')
    expect(planCheckpoint(s, 'M3', 0).kind).toBe('blocked')
  })

  it('holds the artifact until every checkpoint is ticked', () => {
    let s = pass(pass(pass(fresh(), 'M0'), 'M1'), 'M2')
    s = apply(planStep(s, 'M3', 'delta'))
    s = apply(planCheckpoint(s, 'M3', 0))
    const p = planStep(s, 'M3', 'artifact')
    expect(p.kind === 'blocked' && p.message).toMatch(/1 of \d+ done/)
  })
})

describe('locks', () => {
  it('opens a module only when every module it depends on has passed', () => {
    let s = fresh()
    expect(isUnlocked(s, 'M0')).toBe(true)
    expect(isUnlocked(s, 'M1')).toBe(false)
    expect(planStep(s, 'M1', 'delta').kind).toBe('blocked')
    s = pass(s, 'M0')
    expect(isUnlocked(s, 'M1')).toBe(true)
  })

  it('names the nearest blocker first', () => {
    expect(lockWhy(fresh(), 'M3')).toBe('Locked. M1 and M2 have to pass first.')
    expect(lockWhy(fresh(), 'M14')).toMatch(/first — and then the hard gate\.$/)
  })

  it('holds Layers 4 to 6 behind the hard gate even with every prerequisite passed', () => {
    let s = fresh()
    for (const m of AI_CURRICULUM.filter((x) => x.layer <= 3)) s = pass(s, m.id)
    expect(isUnlocked(s, 'M14')).toBe(false)
    expect(lockWhy(s, 'M14')).toBe('The hard gate is not open yet — all four conditions first.')
    for (const it of hardGate(s).items) s = apply(planFlag(s, it.key))
    expect(hardGate(s).open).toBe(true)
    expect(isUnlocked(s, 'M14')).toBe(true)
  })

  it('makes the engine’s unlocking exactly the curriculum’s', () => {
    let s = pass(fresh(), 'M0')
    const m = claimsMasteryMap(s)
    const g = dag()
    for (const mod of AI_CURRICULUM) {
      expect(g.blockers(mod.id, m).length === 0, mod.id).toBe(isUnlocked(s, mod.id))
    }
    expect(m.get(HARD_GATE_ID)).toBe(0)
    s = apply(planStep(s, 'M1', 'delta'))
    // Work short of the gate never reads as a met prerequisite.
    expect(claimProgress(s, 'M1')).toBeLessThan(0.7)
    expect(claimProgress(s, 'M0')).toBe(1)
  })
})

describe('un-ticking', () => {
  it('clears everything after the step, here and downstream, and asks first', () => {
    let s = pass(pass(fresh(), 'M0'), 'M1')
    s = apply(planStep(s, 'M27', 'delta'))
    const p = planStep(s, 'M0', 'gate')
    expect(p.kind).toBe('confirm')
    const after = apply(p)
    expect(claimOf(after, 'M0')).toMatchObject({ delta: true, artifact: true, gate: false })
    expect(claimOf(after, 'M1').delta).toBe(false)
    expect(claimOf(after, 'M1').gate).toBe(false)
    expect(claimOf(after, 'M27').delta).toBe(false)
  })

  it('un-ticking the delta takes the checkpoints with it', () => {
    let s = pass(pass(pass(fresh(), 'M0'), 'M1'), 'M2')
    s = apply(planStep(s, 'M3', 'delta'))
    s = apply(planCheckpoint(s, 'M3', 0))
    // As in the realm: with nothing after the delta claimed and nothing
    // downstream, this clears without asking.
    const p = planStep(s, 'M3', 'delta')
    expect(p.kind).toBe('ok')
    expect(Object.keys(claimOf(apply(p), 'M3').cp)).toEqual([])
  })

  it('un-ticking a checkpoint takes back the artifact and the gate that rested on it', () => {
    let s = pass(pass(pass(pass(fresh(), 'M0'), 'M1'), 'M2'), 'M3')
    const p = planCheckpoint(s, 'M3', 0)
    expect(p.kind).toBe('confirm')
    s = apply(p)
    expect(claimOf(s, 'M3')).toMatchObject({ delta: true, artifact: false, gate: false })
  })

  it('closing the hard gate un-claims what it let you claim', () => {
    let s = fresh()
    for (const m of AI_CURRICULUM.filter((x) => x.layer <= 3)) s = pass(s, m.id)
    for (const it of hardGate(s).items) s = apply(planFlag(s, it.key))
    s = apply(planStep(s, 'M14', 'delta'))
    const p = planFlag(s, 'ci')
    expect(p.kind).toBe('confirm')
    expect(claimOf(apply(p), 'M14').delta).toBe(false)
  })
})

describe('the old realm’s record', () => {
  it('renumbers a record saved before the ladder was reordered', () => {
    const r = fromLegacy({ mods: { M0A: { delta: true, artifact: true, gate: true }, M1: { delta: true } } })!
    // M0A became M1, and the old M1 became M3.
    expect(r.claims.M1?.gate).toBe(true)
    expect(r.claims.M3?.delta).toBe(true)
  })

  it('reads index-keyed checkpoints, and trusts an artifact claimed before checkpoints existed', () => {
    const r = fromLegacy({ mods: { M8: { delta: true, cp: { 0: true } }, M13: { delta: true, artifact: true } }, ids: 2 })!
    expect(r.claims.M8!.cp[cpKeys('M8')[0]!]).toBe(true)
    expect(Object.keys(r.claims.M13!.cp)).toHaveLength(cpKeys('M13').length)
  })

  it('refuses a file that is not a LAUNCHPAD record, and one that matches nothing', () => {
    expect(fromLegacy([1, 2])).toBeNull()
    expect(fromLegacy({ topics: {} })).toBeNull()
    expect(fromLegacy({ mods: { Z9: { gate: true } }, ids: 2 })!.unmatched).toBe(true)
  })

  it('round-trips through the shape the realm wrote', () => {
    let s = pass(fresh(), 'M0')
    s = setSetup(s, 'runwayMonths', '14')
    s = setSetup(s, 'weeklyHours', '-3')
    const legacy = toLegacy(s)
    expect(legacy.ids).toBe(2)
    expect(legacy.passed).toBe(1)
    expect(legacy.total).toBe(AI_CURRICULUM.length)
    // A refused number is kept as 0, so the plan can say it was refused.
    expect(legacy.setup).toEqual({ runwayMonths: 14, weeklyHours: 0 })
    expect(AI_CURRICULUM_API.plan(legacy.setup).why).toMatch(/^That is not a plan/)
    const back = fromLegacy(JSON.parse(JSON.stringify(legacy)))!
    expect(back.claims).toEqual(s.claims)
  })
})

describe('adopting the old record on first load', () => {
  const store = new Map<string, string>()
  beforeEach(() => {
    store.clear()
    ;(globalThis as { localStorage?: unknown }).localStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    }
  })

  it('carries the claims, the hard gate and the plan across once', () => {
    store.set(LEGACY_KEY, JSON.stringify({ mods: { M0: { delta: true, artifact: true, gate: true } }, flagship: { deployed: true }, setup: { runwayMonths: 9 }, ids: 2 }))
    const s = adoptLegacy(fresh())
    expect(s.claims.M0?.gate).toBe(true)
    expect(s.flagship.deployed).toBe(true)
    expect(s.setup.runwayMonths).toBe(9)
    expect(s.legacyImportedAt).toBeTruthy()
    // Stamped: a second load does not read it again.
    store.set(LEGACY_KEY, JSON.stringify({ mods: {}, ids: 2 }))
    expect(adoptLegacy(s).claims.M0?.gate).toBe(true)
  })

  it('keeps an unreadable record under a dated key rather than losing it', () => {
    store.set(LEGACY_KEY, '{not json')
    const s = adoptLegacy(fresh(), new Date(1234))
    expect(s.claims).toEqual({})
    expect(store.get(`${LEGACY_KEY}_unreadable_1234`)).toBe('{not json')
  })

  it('never lets the old record overwrite claims made in this app', () => {
    store.set(LEGACY_KEY, JSON.stringify({ mods: { M0: { delta: true } }, ids: 2 }))
    const mine = pass(fresh(), 'M0')
    expect(adoptLegacy(mine).claims.M0?.gate).toBe(true)
  })
})
