import { describe, expect, it } from 'vitest'
import { MODULES, lessonCoverage, moduleById, searchLessonsIn, searchModules } from './index'

describe('finding a lesson by name', () => {
  it('finds a lesson whose title matches', () => {
    const hits = searchLessonsIn('durable queue')
    expect(hits.length).toBeGreaterThan(0)
    expect(hits[0]!.lesson.title.toLowerCase()).toContain('durable queue')
  })

  it('carries enough context to show and open the hit', () => {
    const hit = searchLessonsIn('durable queue')[0]!
    expect(moduleById(hit.moduleId)).toBeDefined()
    expect(hit.moduleTitle).toBeTruthy()
    expect(hit.lesson.minutes).toBeGreaterThan(0)
  })

  it('finds a lesson by the topic it teaches, not only its title', () => {
    // "SKIP LOCKED" is a concept M8 teaches, not a word in any lesson title.
    const hits = searchLessonsIn('skip locked')
    const byTopic = hits.find((h) => h.matchedTopic)
    expect(byTopic?.matchedTopic).toBeTruthy()
  })

  it('puts an exact title first', () => {
    // Derived from the corpus rather than hardcoded: this suite has to stay
    // true while a thousand more lessons are written, and a test that names a
    // particular lesson is a test that breaks the week someone writes another
    // one on the same subject.
    const any = searchLessonsIn('the', 40).find((h) => h.lesson.title.length > 12)!
    const hits = searchLessonsIn(any.lesson.title, 10)
    expect(hits[0]!.lesson.id).toBe(any.lesson.id)
  })

  it('ignores a query too short to mean anything', () => {
    expect(searchLessonsIn('a')).toEqual([])
    expect(searchLessonsIn(' ')).toEqual([])
  })

  it('respects the limit', () => {
    expect(searchLessonsIn('the', 5).length).toBeLessThanOrEqual(5)
  })

  it('returns nothing rather than throwing on a query that matches nothing', () => {
    expect(searchLessonsIn('zzzznotathing')).toEqual([])
  })

  it('complements module search rather than replacing it', () => {
    // Module search finds a module by its artifact and concepts; lesson search
    // finds the lesson. The same query can reach both.
    const m = MODULES.find((x) => x.id === 'M8')!
    expect(searchModules(m.title).map((x) => x.id)).toContain('M8')
    expect(searchLessonsIn(m.title).map((h) => h.moduleId)).toContain('M8')
    expect(lessonCoverage('M8')?.complete).toBe(true)
  })
})
