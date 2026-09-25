/* ============================================================================
   LAUNCHPAD — module card (ORBIT's)
   ----------------------------------------------------------------------------
   The repeated unit on every track and browse page. It has to answer four
   questions at a glance: what is this, can I start it, how far in am I, and
   what does finishing it open up.

   Locked modules are shown rather than hidden. Seeing that powered-descent
   guidance exists and needs four things first is motivating; discovering it
   only once it unlocks is not.

   In LAUNCHPAD the card also carries the module's claim record — delta,
   artifact, gate as three small bars, the realm's own marks — its kind (Lab
   or Evidence), and a timing tag on the modules a date or an event starts.
   ========================================================================== */
import type { CSSProperties } from 'react'
import type { Module } from '@/curriculum/types'
import { lessonCoverage, lessonsFor } from '@/curriculum/lessons'
import { whenTag } from '@/curriculum/realm'
import { HARD_GATE_ID, type Claim } from '@/engine/claims'
import { Bar, Chip, Tile } from '@/components/ui'
import { IconCheck, IconLock, IconRecall, IconRoute, IconClock } from '@/components/icons'
import { navigate } from '@/lib/router'
import './module-card.css'

export interface ModuleCardProps {
  module: Module
  mastery: number
  /** Prerequisite ids whose gate has not passed (and the hard gate, if shut). Empty means unlocked. */
  blockers: string[]
  /** The module's claims, for the three marks. */
  claim?: Claim
  /** Checkpoints ticked, of how many. */
  checkpoints?: { done: number; total: number }
  /** How many modules this one gates. */
  unlocks: number
  accent: string
  /** Items due inside this module right now. */
  due?: number
  index?: number
}

export function ModuleCard({
  module,
  mastery,
  blockers,
  claim,
  checkpoints,
  unlocks,
  accent,
  due = 0,
  index,
}: ModuleCardProps) {
  const locked = blockers.length > 0
  const done = mastery >= 0.9
  const lp = module.lp
  const words = module.cards?.length ?? 0
  const pct = Math.round(mastery * 100)
  const lessons = lessonsFor(module.id).length
  const coverage = lessonCoverage(module.id)

  return (
    <button
      className="mcard"
      data-locked={locked}
      data-done={done}
      onClick={() => navigate(`/module/${module.id}`)}
      style={
        {
          '--accent-local': accent,
          ...(index != null ? { '--i': index } : {}),
        } as CSSProperties
      }
      type="button"
    >
      <div className="mcard__head">
        <Tile size={36} radius={9} color={accent} lit={mastery > 0.05}>
          {done ? <IconCheck size={17} /> : locked ? <IconLock size={16} /> : <IconRoute size={17} />}
        </Tile>

        <div className="grow">
          <div className="mcard__title">{module.title}</div>
          <div className="mcard__tier">
            {module.id} · L{module.tier} · {module.hours}h
          </div>
        </div>

        {due > 0 ? (
          <span className="mcard__due" title={`${due} items due`}>
            <IconRecall size={12} />
            {due}
          </span>
        ) : null}
      </div>

      <p className="mcard__summary">{module.summary}</p>

      <div className="mcard__stats">
        {words > 0 ? <span>{words} words</span> : null}
        {checkpoints && checkpoints.total > 0 ? (
          <span>
            {locked ? `${checkpoints.total} checkpoints` : `${checkpoints.done} of ${checkpoints.total} checkpoints`}
          </span>
        ) : null}
        {lessons > 0 ? <span>{lessons} lessons</span> : null}
        {claim ? (
          <span className="lp-steps" title="Delta written · Artifact built · Gate passed" style={{ marginLeft: 'auto' }}>
            <span data-on={claim.delta} />
            <span data-on={claim.artifact} />
            <span data-on={claim.gate} />
          </span>
        ) : null}
      </div>

      {locked ? (
        <div className="mcard__locked">
          <IconLock size={12} />
          <span className="truncate">
            Needs {blockers.slice(0, 3).map((b) => (b === HARD_GATE_ID ? 'the hard gate' : b)).join(', ')}
            {blockers.length > 3 ? ` +${blockers.length - 3}` : ''}
          </span>
        </div>
      ) : (
        <div className="mcard__foot">
          <Bar value={mastery} height={4} fill={`linear-gradient(90deg, ${accent}55, ${accent})`} />
          <span className="mcard__pct">{pct}%</span>
        </div>
      )}

      <div className="mcard__badges">
        {/* Taught end to end, partly written, or not started. The last of these
            is the one that matters most: it is the difference between a module
            she can begin now and a title with the teaching still to come. */}
        {lp ? (
          lp.kind === 'EVIDENCE' ? <Chip tone="blue">evidence</Chip> : <Chip ghost>lab</Chip>
        ) : null}
        {done ? <Chip tone="ok">passed</Chip> : null}
        {!coverage?.complete && coverage ? <Chip ghost>lessons coming</Chip> : null}
        {unlocks > 0 ? (
          <Chip ghost>
            <IconRoute size={10} />
            unlocks {unlocks}
          </Chip>
        ) : null}
        {lp?.trigger ? <Chip tone="warn">{whenTag(lp).toLowerCase()}</Chip> : null}
        {module.hours >= 60 ? (
          <Chip ghost>
            <IconClock size={10} />
            long
          </Chip>
        ) : null}
      </div>
    </button>
  )
}
