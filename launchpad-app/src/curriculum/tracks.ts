/* ============================================================================
   LAUNCHPAD — the nine layers, as dashboard pillars
   ----------------------------------------------------------------------------
   ORBIT's dashboard is built from pillars: icon, title, a short pitch, five
   bullet lines, a Continue action and a completion bar. LAUNCHPAD's pillars
   are its layers, and every word on a pillar card comes from the curriculum
   file — the layer's name, its stated purpose, and the titles of the modules
   in it. Only the route slug and the accent colour are decided here.
   ========================================================================== */
import { AI_CURRICULUM, AI_LAYERS } from './generated/launchpad-data'
import type { TrackDef, TrackId } from './types'

/** Layer number → the slug its page lives at. Index is the layer. */
export const LAYER_SLUGS: TrackId[] = [
  'contract',
  'machine',
  'craft-1',
  'ai-core',
  'craft-2',
  'ai-layer',
  'product',
  'market',
  'employed',
]

/*
 * ORBIT's four domain colours, spread across the nine layers so the ladder
 * reads as it is climbed: the contract and the market (the money and the job)
 * in amber, the machine and the craft in blue, the AI work in violet, platform
 * work in cyan.
 */
const ACCENT: Record<TrackId, string> = {
  contract: 'var(--d-career)',
  machine: 'var(--d-coding)',
  'craft-1': 'var(--d-foundations)',
  'ai-core': 'var(--d-gnc)',
  'craft-2': 'var(--d-foundations)',
  'ai-layer': 'var(--d-gnc)',
  product: 'var(--d-coding)',
  market: 'var(--d-career)',
  employed: 'var(--d-career)',
}

export function layerOf(track: TrackId): number {
  return LAYER_SLUGS.indexOf(track)
}

export function trackForLayer(layer: number): TrackId {
  return LAYER_SLUGS[layer] ?? 'contract'
}

export const TRACKS = Object.fromEntries(
  AI_LAYERS.map((L) => {
    const id = trackForLayer(L.id)
    const def: TrackDef = {
      id,
      title: L.name,
      blurb: L.purpose,
      highlights: AI_CURRICULUM.filter((m) => m.layer === L.id).map((m) => m.title),
      accent: ACCENT[id],
    }
    return [id, def]
  }),
) as Record<TrackId, TrackDef>

/** Dashboard order: the ladder as it is climbed, layer 0 first. */
export const TRACK_ORDER: TrackId[] = AI_LAYERS.map((L) => trackForLayer(L.id))

export function trackDef(id: TrackId): TrackDef {
  return TRACKS[id]
}

export function trackPath(id: TrackId): string {
  return `/${id}`
}
