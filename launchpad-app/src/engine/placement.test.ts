import { describe, expect, it } from 'vitest'
import { dag, lessonsFor, moduleById } from '@/curriculum'
import { PLACEMENT_QUESTIONS, PLACEMENT_SKILLS } from '@/curriculum/placement'
import { focusInputs } from '@/lib/nextUp'
import { migrateState, newLearnerState } from './state'
import { planFor, score, type PlacementAnswers } from './placement'

const allRight = (): PlacementAnswers => Object.fromEntries(PLACEMENT_QUESTIONS.map((q) => [q.id, q.answer]))

describe("LAUNCHPAD's placement test", () => {
  it('asks about every skill, with four distinct choices and a real answer', () => {
    for (const s of PLACEMENT_SKILLS) expect(PLACEMENT_QUESTIONS.some((q) => q.skill === s.id), s.id).toBe(true)
    for (const q of PLACEMENT_QUESTIONS) {
      expect(q.choices, q.id).toHaveLength(4)
      expect(new Set(q.choices).size, q.id).toBe(4)
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(4)
    }
  })

  it('points every skill at a module lesson that exists', () => {
    for (const s of PLACEMENT_SKILLS) {
      expect(moduleById(s.moduleId), s.id).toBeDefined()
      expect(lessonsFor(s.moduleId).map((l) => l.id), s.id).toContain(s.lessonId)
    }
  })

  it('plans what she missed, and Next up follows the plan', () => {
    const a = allRight()
    a.sq1 = null
    const levels = score(PLACEMENT_SKILLS, PLACEMENT_QUESTIONS, a)
    expect(planFor(PLACEMENT_SKILLS, levels).todo.map((s) => s.id)).toEqual(['sql'])
    const s = newLearnerState()
    s.placement = { version: 1, takenAt: '2026-09-26T12:00:00Z', answers: a, levels }
    const back = migrateState(JSON.parse(JSON.stringify(s)))
    expect(back.placement?.levels.sql).toBe('gap')
    const inp = focusInputs(back, dag())
    expect(inp.module?.id).toBe('M5')
    expect(inp.lesson?.id).toBe('m5-the-module')
  })
})
