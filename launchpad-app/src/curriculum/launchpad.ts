/* ============================================================================
   LAUNCHPAD — the curriculum, in the shape the ORBIT engine reads
   ----------------------------------------------------------------------------
   Every module here is built from one LAUNCHPAD module, and nothing in it is
   written here. The mapping is the whole of this file:

     layer        → track (the layer's page) and tier (its rung on the ladder)
     dependsOn    → prereqs
     artifact     → summary (the thing the module ends in is what it is for)
     concepts     → objectives and topics ("what you have to hold in your head")
     words        → flashcards: the term on the front, its plain definition on
                    the back, so the Words block is also what Recall drills
     kind, owns   → tags

   The artifact, checkpoints, gate, pitfalls, notes and figures are read from
   `lp` by the pages that show them. Lessons are attached by index.ts from the
   manifest, which scripts/launchpad-curriculum.ts writes from the document.
   ========================================================================== */
import { AI_CURRICULUM, type LpModule } from './generated/launchpad-data'
import { trackForLayer } from './tracks'
import type { Flashcard, Module } from './types'

/** A card id from a term: stable while the term's spelling is. */
export function wordCardId(term: string, taken: Set<string>): string {
  const base =
    'w-' +
    (term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48) || 'term')
  let id = base
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`
  taken.add(id)
  return id
}

function cardsFor(m: LpModule): Flashcard[] {
  const taken = new Set<string>()
  return (m.words ?? []).map(([term, def]) => ({
    id: wordCardId(term, taken),
    front: term,
    back: def,
  }))
}

export function toModule(m: LpModule): Module {
  const concepts = m.concepts ?? []
  return {
    id: m.id,
    track: trackForLayer(m.layer),
    tier: m.layer,
    title: m.title,
    summary: m.artifact,
    prereqs: m.dependsOn.slice(),
    hours: m.hours,
    topics: concepts.length ? concepts : [m.title],
    objectives: concepts,
    resources: [],
    cards: cardsFor(m),
    tags: [m.kind === 'EVIDENCE' ? 'evidence' : 'lab', ...(m.owns ?? []).map((o) => `owns ${o}`)],
    lp: m,
  }
}

/** The corpus, in the curriculum file's own order (which is ladder order). */
export const LAUNCHPAD_MODULES: Module[] = AI_CURRICULUM.map(toModule)
