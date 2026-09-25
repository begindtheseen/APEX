/* ============================================================================
   LAUNCHPAD — the module card tells the truth about a module's record
   ----------------------------------------------------------------------------
   The browse pages show every module, and at a glance thirty-three cards look
   alike. What the card has to carry is what the realm's ladder carried: the
   kind (Lab or Evidence), the three claim marks, what is blocking it — named
   by module id, the hard gate by name — and a timing tag on the modules a date
   or an event starts. These pin that, because it is the kind of signal that
   quietly stops rendering and nobody notices until a ladder reads wrong.
   ========================================================================== */
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { moduleById } from '@/curriculum'
import { HARD_GATE_ID, emptyClaim } from '@/engine/claims'
import { ModuleCard } from './ModuleCard'

const render = (id: string, props: Partial<Parameters<typeof ModuleCard>[0]> = {}) => {
  const module = moduleById(id)
  if (!module) throw new Error(`no such module: ${id}`)
  return renderToStaticMarkup(
    <ModuleCard module={module} mastery={0} blockers={[]} unlocks={0} accent="#7aa2ff" {...props} />,
  )
}

describe('module card', () => {
  it('says whether a module is Lab or Evidence', () => {
    expect(render('M0')).toContain('>lab<')
    expect(render('M2')).toContain('>evidence<')
  })

  it('names what is blocking it by id, and the hard gate by name', () => {
    const html = render('M14', { blockers: ['M8', 'M9', HARD_GATE_ID] })
    expect(html).toContain('Needs M8, M9, the hard gate')
    expect(html).not.toContain(HARD_GATE_ID)
  })

  it('draws the three claim marks from the record', () => {
    const html = render('M1', { claim: { ...emptyClaim(), delta: true } })
    expect(html.match(/data-on="true"/g)?.length).toBe(1)
    expect(html.match(/data-on="false"/g)?.length).toBe(2)
  })

  it('marks a passed module as passed', () => {
    expect(render('M0', { mastery: 1 })).toContain('>passed<')
  })

  it('tags a module a date or an event starts', () => {
    expect(render('M31')).toContain('starts at an event')
    expect(render('M27')).toContain('starts by date')
  })

  it('counts words and checkpoints, not questions or exercises', () => {
    const html = render('M8', { checkpoints: { done: 1, total: 3 } })
    expect(html).toMatch(/\d+ words/)
    expect(html).toContain('1 of 3 checkpoints')
    expect(html).not.toContain('questions')
  })
})
