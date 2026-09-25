/* ============================================================================
   LAUNCHPAD — the first-run card points somewhere real
   ----------------------------------------------------------------------------
   The welcome card's first step tells a reader who has never written code
   where to start, and it links there. A link that rots into a dead route would
   fail silently on exactly the step that matters most, so the destinations
   are checked rather than trusted.
   ========================================================================== */
import { describe, expect, it } from 'vitest'
import { moduleById } from '@/curriculum'
import { WELCOME_STEPS } from './Home'

const PAGES = new Set(['/plan', '/tracks', '/learning', '/guide'])

describe('first-run welcome', () => {
  it('links only to modules and pages that exist', () => {
    for (const step of WELCOME_STEPS.filter((s) => s.to)) {
      const to = step.to!
      if (to.startsWith('/module/')) {
        expect(moduleById(to.replace(/^\/module\//, '')), `missing module: ${to}`).toBeTruthy()
      } else {
        expect(PAGES.has(to), `missing page: ${to}`).toBe(true)
      }
    }
  })

  it('can actually render the linked phrase, which must occur in the step text', () => {
    for (const step of WELCOME_STEPS) {
      if (!step.to) continue
      expect(step.linkText, 'a linked step needs the phrase to link').toBeTruthy()
      expect(step.text).toContain(step.linkText!)
    }
  })

  it('sends a reader who has never written code to M0 first', () => {
    expect(WELCOME_STEPS[0]!.to).toBe('/module/M0')
  })
})
