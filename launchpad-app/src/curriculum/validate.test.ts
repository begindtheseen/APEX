/* ============================================================================
   LAUNCHPAD — curriculum integrity (ORBIT's)
   ----------------------------------------------------------------------------
   The curriculum is data, and data authored by hand drifts. These tests are the
   contract that keeps the engine's assumptions true:

     · the prerequisite graph is a DAG — a cycle would make the frontier
       computation silently wrong and gate modules forever
     · every prerequisite resolves — a dangling id makes a module permanently
       unreachable with no visible error
     · every id is unique — the scheduler keys memory state off item ids, so a
       collision silently merges two people's worth of review history

   None of these are style checks. Each one corresponds to a specific way the
   product breaks for a learner.
   ========================================================================== */
import { describe, expect, it } from 'vitest'
import { MODULES, TRACK_ORDER, corpusStats, dag, modulesInTrack, searchModules } from './index'
import { AI_CURRICULUM, AI_CURRICULUM_API } from './generated/launchpad-data'
import { findGraphProblems, topoSort } from '@/engine/graph'
import { itemId, parseItemId } from './types'

describe('graph integrity', () => {
  const problems = findGraphProblems(MODULES)

  it('has no prerequisite cycles', () => {
    expect(
      problems.cycles.map((c) => c.join(' → ')),
      'a cycle makes those modules permanently ungated and unreachable',
    ).toEqual([])
  })

  it('has no dangling prerequisite references', () => {
    expect(
      problems.dangling.map((d) => `${d.module} requires missing ${d.missing}`),
    ).toEqual([])
  })

  it('has no duplicate module ids', () => {
    expect(problems.duplicates).toEqual([])
  })

  it('topologically sorts every module', () => {
    expect(topoSort(MODULES)).toHaveLength(MODULES.length)
  })

  it('places every prerequisite before its dependants in study order', () => {
    const order = dag().ids()
    const position = new Map(order.map((id, i) => [id, i]))
    for (const m of MODULES) {
      for (const p of m.prereqs) {
        if (!position.has(p)) continue
        expect(position.get(p)!, `${p} must come before ${m.id}`).toBeLessThan(position.get(m.id)!)
      }
    }
  })

  it('agrees with the curriculum file’s own validator', () => {
    /* curriculum-ai.js checks Rule 2 (every module but M0 has an inbound
       edge), the gates, cycles, and the ownership and spiral registries. The
       app runs the same file, so the same check has to pass here. */
    const v = AI_CURRICULUM_API.validate()
    expect(v.errors).toEqual([])
    expect(v.ok).toBe(true)
  })

  it('carries every module of the curriculum file, with its own ids and edges', () => {
    expect(MODULES.map((m) => m.id)).toEqual(AI_CURRICULUM.map((m) => m.id))
    for (const lp of AI_CURRICULUM) {
      const m = MODULES.find((x) => x.id === lp.id)!
      expect(m.prereqs, lp.id).toEqual(lp.dependsOn)
      expect(m.hours, lp.id).toBe(lp.hours)
      expect(m.title, lp.id).toBe(lp.title)
      expect(m.lp, lp.id).toBe(lp)
    }
  })

  it('starts the corpus somewhere a complete beginner can stand', () => {
    const roots = MODULES.filter((m) => m.prereqs.length === 0)
    expect(roots.length, 'the corpus has no module with no prerequisites').toBeGreaterThan(0)
    for (const r of roots) {
      expect(r.tier, `${r.id} is a root, so it must be tier 0`).toBe(0)
    }
  })
})

describe('module shape', () => {
  it('gives every module the required fields', () => {
    for (const m of MODULES) {
      expect(m.id, 'module id').toMatch(/^M\d+$/)
      expect(m.title.length, `${m.id} title`).toBeGreaterThan(2)
      expect(m.summary.length, `${m.id} summary`).toBeGreaterThan(10)
      expect(m.hours, `${m.id} hours`).toBeGreaterThan(0)
      expect(m.topics.length, `${m.id} topics`).toBeGreaterThan(0)
      expect(m.tier, `${m.id} tier`).toBeGreaterThanOrEqual(0)
    }
  })

  it('keeps ids unique inside each module', () => {
    for (const m of MODULES) {
      const check = (label: string, ids: string[]) => {
        expect(new Set(ids).size, `${m.id} has duplicate ${label} ids`).toBe(ids.length)
      }
      check('card', (m.cards ?? []).map((c) => c.id))
      check('quiz', (m.quiz ?? []).map((q) => q.id))
      check('exercise', (m.exercises ?? []).map((e) => e.id))
      check('lesson', (m.lessons ?? []).map((l) => l.id))
    }
  })

  it('points every multiple-choice answer at a real option', () => {
    for (const m of MODULES) {
      for (const q of m.quiz ?? []) {
        if (!q.choices) continue
        expect(q.choices.length, `${m.id}/${q.id} needs at least two options`).toBeGreaterThan(1)
        expect(typeof q.answer, `${m.id}/${q.id} answer must index its choices`).toBe('number')
        const idx = q.answer as number
        expect(idx, `${m.id}/${q.id} answer out of range`).toBeGreaterThanOrEqual(0)
        expect(idx, `${m.id}/${q.id} answer out of range`).toBeLessThan(q.choices.length)
        expect(q.explain.length, `${m.id}/${q.id} needs an explanation`).toBeGreaterThan(10)
      }
    }
  })

  it('keeps seed difficulties on the usable part of the logit scale', () => {
    for (const m of MODULES) {
      for (const q of m.quiz ?? []) {
        if (q.b == null) continue
        expect(q.b, `${m.id}/${q.id} difficulty`).toBeGreaterThanOrEqual(-4)
        expect(q.b, `${m.id}/${q.id} difficulty`).toBeLessThanOrEqual(4)
      }
    }
  })

  it('gives every flashcard both sides', () => {
    for (const m of MODULES) {
      for (const c of m.cards ?? []) {
        // A word card's front is the term itself, and "Lab" or "SQL" is a whole term.
        expect(c.front.trim().length, `${m.id}/${c.id} front`).toBeGreaterThan(0)
        expect(c.back.trim().length, `${m.id}/${c.id} back`).toBeGreaterThan(1)
      }
    }
  })

  it('uses only http(s) resource links', () => {
    for (const m of MODULES) {
      for (const r of m.resources) {
        if (!r.url) continue
        expect(r.url, `${m.id} → ${r.title}`).toMatch(/^https?:\/\//)
      }
    }
  })

  it('gives runnable exercises a language and starter code', () => {
    for (const m of MODULES) {
      for (const e of m.exercises ?? []) {
        if (e.kind !== 'code') continue
        expect(e.lang, `${m.id}/${e.id} is a code exercise with no language`).toBeTruthy()
        expect(e.starter ?? '', `${m.id}/${e.id} needs starter code`).not.toBe('')
      }
    }
  })
})

describe('item ids', () => {
  it('round-trips through parse', () => {
    for (const m of MODULES.slice(0, 40)) {
      for (const c of (m.cards ?? []).slice(0, 3)) {
        const id = itemId(m.id, 'card', c.id)
        const parsed = parseItemId(id)
        expect(parsed).toEqual({ moduleId: m.id, kind: 'card', localId: c.id })
      }
    }
  })

  it('rejects malformed ids rather than guessing', () => {
    expect(parseItemId('nope')).toBeNull()
    expect(parseItemId('a::bogus::c')).toBeNull()
    expect(parseItemId('a::card')).toBeNull()
  })

  it('produces globally unique item ids across the whole corpus', () => {
    const seen = new Set<string>()
    for (const m of MODULES) {
      for (const c of m.cards ?? []) {
        const id = itemId(m.id, 'card', c.id)
        expect(seen.has(id), `duplicate item id ${id}`).toBe(false)
        seen.add(id)
      }
      for (const q of m.quiz ?? []) {
        const id = itemId(m.id, 'quiz', q.id)
        expect(seen.has(id), `duplicate item id ${id}`).toBe(false)
        seen.add(id)
      }
    }
  })
})

describe('corpus scale', () => {
  it('actually ships the curriculum', () => {
    const s = corpusStats()
    expect(s.modules).toBe(AI_CURRICULUM.length)
    expect(s.cards).toBeGreaterThan(500)
    expect(s.lessons).toBeGreaterThanOrEqual(AI_CURRICULUM.length)
    expect(s.hours).toBe(AI_CURRICULUM_API.totalHours().modules)
  })

  it('covers all nine layers', () => {
    expect(TRACK_ORDER).toHaveLength(9)
    for (const track of TRACK_ORDER) {
      expect(modulesInTrack(track).length, `${track} is empty`).toBeGreaterThan(0)
    }
  })
})

describe('search', () => {
  it('ignores queries too short to be meaningful', () => {
    expect(searchModules('a')).toEqual([])
    expect(searchModules(' ')).toEqual([])
  })

  it('finds modules by title and topic', () => {
    const hits = searchModules('durable queue')
    expect(hits.length).toBeGreaterThan(0)
  })
})

describe('readiness roll-up', () => {
  it('is 0 with nothing passed and 1 with everything passed', () => {
    const g = dag()
    expect(g.readiness(new Map())).toBeCloseTo(0, 6)
    expect(g.readiness(new Map(MODULES.map((m) => [m.id, 1])))).toBeCloseTo(1, 6)
  })

  it('is the share of module hours whose gate has passed, as the realm always showed it', () => {
    const g = dag()
    const passed = new Map([['M0', 1], ['M1', 1]])
    const hours = AI_CURRICULUM_API.totalHours().modules
    expect(g.readiness(passed)).toBeCloseTo((12 + 58) / hours, 6)
    // Work short of the gate does not move the ring.
    expect(g.readiness(new Map([['M0', 0.6]]))).toBe(0)
  })
})
