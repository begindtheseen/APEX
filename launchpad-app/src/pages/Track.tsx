/* ============================================================================
   LAUNCHPAD — layer page (ORBIT's track page)
   ----------------------------------------------------------------------------
   One layer of the ladder: its purpose, its modules in ladder order, and the
   one to do next — the first module in the layer that is open and not yet
   passed, so Continue continues. Layers 4–6 sit behind the hard gate, and
   their pages say so and show it.
   ========================================================================== */
import { useMemo } from 'react'
import { ModuleCard } from '@/components/ModuleCard'
import { HardGateCard, Notice } from '@/components/lp'
import { LAYER_ICON } from '@/components/layerIcons'
import { IconArrowRight, IconRecall } from '@/components/icons'
import { Bar, Button, Card, CardHead, Chip, Empty, Ring, Stat } from '@/components/ui'
import { TRACKS, corpusStats, layerOf, moduleById } from '@/curriculum'
import { AI_COMPRESSED_SPINE, AI_CURRICULUM_API } from '@/curriculum/generated/launchpad-data'
import { spineNote, whenTag } from '@/curriculum/realm'
import type { Module, TrackId } from '@/curriculum/types'
import { claimOf, claimProgress, cpCount, hardGate, isHardGated, isPassed, isUnlocked } from '@/engine/claims'
import { atomsOf, dueAtoms } from '@/engine/scheduler'
import { useLearner } from '@/hooks/useLearner'
import { navigate } from '@/lib/router'
import './pages.css'

export function Track({ track }: { track: TrackId }) {
  const { state, dag, mastery, trackReadiness } = useLearner()
  const def = TRACKS[track]
  const Icon = LAYER_ICON[track]
  const now = useMemo(() => new Date(), [])
  const layer = layerOf(track)

  // Ladder order is the curriculum file's order, which is how it is climbed.
  const modules = useMemo(
    () =>
      AI_CURRICULUM_API.byLayer(layer)
        .map((m) => moduleById(m.id))
        .filter((m): m is Module => !!m),
    [layer],
  )
  const stats = useMemo(() => corpusStats(modules), [modules])
  const fg = hardGate(state)
  const gated = isHardGated(layer)
  const rec = AI_CURRICULUM_API.plan(state.setup).recommend
  const onSpine = rec === 'spine' || rec === 'full-tight'

  const dueByModule = useMemo(() => {
    const out = new Map<string, number>()
    for (const d of dueAtoms(state, modules, now)) {
      out.set(d.moduleId, (out.get(d.moduleId) ?? 0) + 1)
    }
    return out
  }, [state, modules, now])

  // The next thing to actually do in this layer, so Continue continues.
  const nextUp = modules.find((m) => isUnlocked(state, m.id) && !isPassed(state, m.id))
  const nextProgress = nextUp ? claimProgress(state, nextUp.id) : 0

  const readiness = trackReadiness[track]
  const openCount = modules.filter((m) => isUnlocked(state, m.id) && !isPassed(state, m.id)).length
  const doneCount = modules.filter((m) => isPassed(state, m.id)).length
  const totalDue = [...dueByModule.values()].reduce((a, b) => a + b, 0)

  return (
    <div className="page page--padtop">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker" style={{ color: def.accent }}>
            <Icon size={13} />
            Layer {layer} · {stats.modules} modules · {Math.round(stats.hours)} hours
          </div>
          <h1 className="h-page">{def.title}</h1>
          <p className="page-head__sub">
            {def.blurb}
            {spineNote(onSpine)}
          </p>
        </div>
        <Ring value={readiness} size={68} thickness={5} color={def.accent} />
      </div>

      {/* ── status strip ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--gap)',
          marginBottom: 'var(--gap)',
        }}
      >
        <Card pad index={0}>
          <Stat value={`${doneCount}/${stats.modules}`} label="Modules passed" />
        </Card>
        <Card pad index={1}>
          <Stat value={openCount} label="Open now" />
        </Card>
        <Card pad index={2}>
          <Stat value={stats.cards} label="Words to recall" />
        </Card>
        <Card pad index={3}>
          <Stat
            value={totalDue}
            label="Due today"
            delta={totalDue > 0 ? 'review now' : undefined}
            deltaTone={totalDue > 0 ? 'bad' : 'muted'}
          />
        </Card>
      </div>

      {gated && !fg.open ? (
        <Notice label="Behind the hard gate" tone="warn" style={{ marginBottom: 'var(--gap)' }}>
          Four conditions that do not open by working harder ({fg.done} of {fg.total} done). Every module
          on this page can be read; none can be claimed until all four are true.
        </Notice>
      ) : null}
      {layer === 4 ? (
        <div style={{ marginBottom: 'var(--gap)' }}>
          <HardGateCard index={4} />
        </div>
      ) : null}

      {/* ── next up ───────────────────────────────────────────────────────── */}
      {nextUp?.lp ? (
        <Card index={4} style={{ marginBottom: 'var(--gap)' }}>
          <CardHead
            icon={<IconRecall size={15} />}
            title="Next in this layer"
            right={
              <div style={{ display: 'flex', gap: 6 }}>
                <Chip ghost>{nextUp.lp.kind === 'EVIDENCE' ? 'Evidence' : 'Lab'}</Chip>
                <Chip ghost>{nextUp.hours}h</Chip>
                {nextUp.lp.trigger ? <Chip tone="warn">{whenTag(nextUp.lp)}</Chip> : null}
              </div>
            }
            divided
          />
          <div
            style={{
              padding: '15px 17px 17px',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div className="grow" style={{ minWidth: 200 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
                {nextUp.id} · {nextUp.title}
              </div>
              <p className="clamp-3" style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 5, lineHeight: 1.55 }}>
                {nextUp.summary}
              </p>
              <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bar
                  value={nextProgress}
                  height={4}
                  fill={`linear-gradient(90deg, ${def.accent}55, ${def.accent})`}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--ink-4)',
                    fontVariantNumeric: 'tabular-nums',
                    width: 34,
                    textAlign: 'right',
                  }}
                >
                  {Math.round(nextProgress * 100)}%
                </span>
              </div>
            </div>
            <Button variant="primary" size="lg" onClick={() => navigate(`/module/${nextUp.id}`)}>
              {nextProgress > 0.05 ? 'Continue' : 'Start'}
              <IconArrowRight size={15} />
            </Button>
          </div>
        </Card>
      ) : null}

      {/* ── the ladder ────────────────────────────────────────────────────── */}
      {modules.length === 0 ? (
        <Empty icon={<Icon size={30} />} title="No modules in this layer" body="The curriculum file lists none here." />
      ) : (
        <section>
          <div className="tier">
            <span className="tier__n" style={{ color: def.accent }}>
              L{layer}
            </span>
            <span className="tier__label">The modules, in ladder order</span>
            <span className="tier__rule" />
            <span className="tier__meta">
              {modules.length} modules · {stats.hours}h
            </span>
          </div>

          <div className="mgrid">
            {modules.map((m, i) => (
              <div key={m.id} style={{ position: 'relative', display: 'grid' }}>
                <ModuleCard
                  module={m}
                  mastery={mastery.get(m.id) ?? 0}
                  blockers={dag.blockers(m.id, mastery)}
                  claim={claimOf(state, m.id)}
                  checkpoints={cpCount(state, m.id)}
                  unlocks={dag.descendants(m.id).size}
                  accent={def.accent}
                  due={dueByModule.get(m.id) ?? 0}
                  index={i}
                />
                {onSpine && AI_COMPRESSED_SPINE.includes(m.id) ? (
                  <span style={{ position: 'absolute', bottom: 14, right: 14 }}>
                    <Chip tone="blue">on the Spine</Chip>
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      <TrackFootnote track={track} atomCount={modules.reduce((a, m) => a + atomsOf(m).length, 0)} />
    </div>
  )
}

function TrackFootnote({ track, atomCount }: { track: TrackId; atomCount: number }) {
  if (track === 'market') {
    return (
      <p className="track-note">
        Pay figures, tax structures and hiring practice change. Every module in this layer that states
        one says to check it is still true — verify against a current source before relying on any
        specific number.
      </p>
    )
  }
  return (
    <p className="track-note">
      {atomCount} words to recall in this layer, scheduled for you. The words keep; the gates are what
      move you up the ladder.
    </p>
  )
}
