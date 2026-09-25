/* Types for launchpad-data.js, which scripts/launchpad-curriculum.ts generates
   from ../curriculum-ai.js at the repository root. The data and the functions
   are that file, verbatim; this only describes their shapes to TypeScript. */

export interface LpGate {
  referee: string
  pass: string
  onFail: string
  unseen?: string
}

export interface LpModule {
  id: string
  layer: number
  title: string
  hours: number
  dependsOn: string[]
  kind: 'LAB' | 'EVIDENCE'
  artifact: string
  gate: LpGate
  note?: string
  trigger?: string
  currency?: string
  owns?: string[]
  exports?: string[]
  concepts?: string[]
  mistakes?: string[]
  /** [term, plain definition] pairs. */
  words?: [string, string][]
  checkpoints?: string[]
}

export interface LpLayer {
  id: number
  name: string
  purpose: string
}

export interface LpTrack {
  id: string
  title: string
  hours: number
  cadence: string
  rule: string
}

export interface LpRule {
  n: number
  rule: string
}

/** One module's claims, in the shape the API reads. */
export interface LpProgressEntry {
  delta: boolean
  artifact: boolean
  gate: boolean
  cp?: Record<string, boolean>
}

/** Module id → claims, with the hard gate's ticks riding along on `__flagship`. */
export type LpProgress = Record<string, LpProgressEntry | Record<string, boolean> | undefined> & {
  __flagship?: Record<string, boolean>
}

export interface LpSetup {
  runwayMonths?: number
  weeklyHours?: number
  flagship?: string
}

export interface LpFlagshipGate {
  items: { key: string; label: string }[]
  done: number
  total: number
  open: boolean
  note: string
}

export interface LpPlan {
  fullHours: number
  spineHours: number
  spineModuleHours: number
  spineTrackHours: number
  moduleHours: number
  trackHours: number
  weeklyHoursEntered: number
  weeklyHoursUsed: number
  ceiling: number
  cappedByCeiling: boolean
  weeklyHours: number
  runwayMonths: number
  fullMonths: number | null
  spineMonths: number | null
  neededForFull: number | null
  neededForSpine: number | null
  recommend: 'unset' | 'full' | 'full-tight' | 'spine' | 'spine-plus-contract'
  why: string
  applyAfterHours: number
  applyTrackHoursPerWeek: number
  applyModuleHoursPerWeek: number
  postApplyTrackHoursPerWeek: number
  postApplyModuleHoursPerWeek: number
  applyAfterMonths: number | null
  applyAfterBlocked: string | null
  applyNote: string
}

export interface LpSummary {
  modulesDone: number
  modulesTotal: number
  artifactsDone: number
  deltasDone: number
  hoursDone: number
  hoursTotal: number
  pct: number
}

export interface LpApi {
  byId(id: string): LpModule | undefined
  byLayer(n: number): LpModule[]
  isUnlocked(id: string, progress: LpProgress): boolean
  available(progress: LpProgress): LpModule[]
  flagshipGate(progress: LpProgress): LpFlagshipGate
  plan(setup: LpSetup): LpPlan
  progressSummary(progress: LpProgress): LpSummary
  totalHours(): { modules: number; tracks: number; total: number; count: number }
  GATE_EDGES: string[]
  criticalPath(): { hours: number; path: string[] }
  validate(): {
    ok: boolean
    errors: string[]
    warnings: string[]
    modules: number
    criticalPathHours: number
    criticalPath: string
    note: string
  }
}

export interface LpConfig {
  brand: string
  name: string
  tag: string
  tagline: string
  accent: string
  glyph: string
  key: string
  creed: string[]
  gateRecord: string
  tracksNote: string
}

export declare const AI_CURRICULUM: LpModule[]
export declare const AI_LAYERS: LpLayer[]
export declare const AI_TRACKS: LpTrack[]
export declare const LAUNCHPAD_CONFIG: LpConfig
export declare const AI_OWNED_CONCEPTS: Record<string, string>
export declare const AI_SPIRAL_PAIRS: [string, string, string][]
export declare const AI_OWNED_ONCE: string[]
export declare const AI_OWNED_THEN_DEEPENED: string[]
export declare const LAUNCHPAD_RULES: LpRule[]
export declare const AI_COMPRESSED_SPINE: string[]
export declare const AI_CUT_ORDER: string[]
export declare const AI_CURRICULUM_API: LpApi
export declare const AI_DETAIL: Record<string, { concepts: string[]; mistakes: string[] }>
export declare const AI_WORDS: Record<string, [string, string][]>
export declare const AI_CHECKPOINTS: Record<string, string[]>
export declare const AI_SPINE_TRACK_HOURS: Record<string, number>
