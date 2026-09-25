/* ============================================================================
   LAUNCHPAD — the ladder (ORBIT's knowledge tree)
   ----------------------------------------------------------------------------
   The whole curriculum in one place, with ORBIT's ways in — what is open now,
   everything, pinned, gated, and search — and LAUNCHPAD's own: the ladder, all
   thirty-three modules layer by layer in the order they are climbed, with the
   hard gate drawn where it actually bites, between Layer 3 and Layer 4.
   ========================================================================== */
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ModuleCard } from '@/components/ModuleCard'
import { ByTheNumbers, Gloss, HardGateCard, chainText } from '@/components/lp'
import {
  IconArrowRight,
  IconBook,
  IconLock,
  IconRecall,
  IconRoute,
  IconSearch,
  IconStar,
  IconX,
} from '@/components/icons'
import { Button, Card, CardHead, Empty, Segmented, Stat } from '@/components/ui'
import { MODULES, TRACKS, TRACK_ORDER, corpusStats, moduleById, searchLessonsIn, searchModules } from '@/curriculum'
import { AI_COMPRESSED_SPINE, AI_CURRICULUM, AI_CURRICULUM_API, AI_LAYERS } from '@/curriculum/generated/launchpad-data'
import { LOCK_NOTE, ladderNotes, spineNote } from '@/curriculum/realm'
import type { Module } from '@/curriculum/types'
import { claimOf, cpCount, isPassed, progressOf } from '@/engine/claims'
import { dueAtoms, rankFrontier } from '@/engine/scheduler'
import { useLearner } from '@/hooks/useLearner'
import { navigate, useRoute } from '@/lib/router'
import './home.css'
import './pages.css'

type View = 'ladder' | 'next' | 'all' | 'pinned' | 'locked'

export function Learning() {
  const { state, dag, mastery } = useLearner()
  const route = useRoute()
  const [view, setView] = useState<View>(route.query.show === 'next' ? 'next' : 'ladder')

  /* `#/learning?show=gate` is where every "the hard gate" link lands. */
  useEffect(() => {
    if (route.query.show !== 'gate') return
    const t = setTimeout(() => document.getElementById('hard-gate')?.scrollIntoView({ block: 'start' }), 60)
    return () => clearTimeout(t)
  }, [route.query.show])
  const [query, setQuery] = useState('')
  const now = useMemo(() => new Date(), [])

  const stats = useMemo(() => corpusStats(), [])

  const dueByModule = useMemo(() => {
    const out = new Map<string, number>()
    for (const d of dueAtoms(state, MODULES, now)) {
      out.set(d.moduleId, (out.get(d.moduleId) ?? 0) + 1)
    }
    return out
  }, [state, now])

  const ranked = useMemo(
    () => rankFrontier(state, dag, mastery, now),
    [state, dag, mastery, now],
  )

  const results = useMemo(() => (query.trim() ? searchModules(query, 40) : null), [query])

  /* Lessons are searched alongside modules because past a certain size the
     module is the wrong unit of answer. Someone looking for the thing about
     the intermediate axis wants that lesson, not the twelve-lesson module it
     lives in. */
  const lessonHits = useMemo(() => (query.trim() ? searchLessonsIn(query, 12) : []), [query])

  const shown: Module[] = useMemo(() => {
    if (results) return results
    switch (view) {
      case 'next':
        return ranked.slice(0, 18).map((c) => c.module)
      case 'pinned':
        return state.pinned.map((id) => dag.get(id)).filter((m): m is Module => !!m)
      case 'locked':
        return ladder().filter((m) => dag.blockers(m.id, mastery).length > 0)
      default:
        return ladder()
    }
  }, [results, view, ranked, state.pinned, dag, mastery])

  const totalDue = [...dueByModule.values()].reduce((a, b) => a + b, 0)
  const passed = AI_CURRICULUM.filter((m) => isPassed(state, m.id)).length
  const cp = AI_CURRICULUM.reduce(
    (a, m) => {
      const c = cpCount(state, m.id)
      return { done: a.done + c.done, total: a.total + c.total }
    },
    { done: 0, total: 0 },
  )
  const rec = AI_CURRICULUM_API.plan(state.setup).recommend
  const onSpine = rec === 'spine' || rec === 'full-tight'
  const card = (m: Module, i: number) => (
    <div key={m.id} style={{ position: 'relative', display: 'grid' }}>
      <ModuleCard
        module={m}
        mastery={mastery.get(m.id) ?? 0}
        blockers={dag.blockers(m.id, mastery)}
        claim={claimOf(state, m.id)}
        checkpoints={cpCount(state, m.id)}
        unlocks={dag.descendants(m.id).size}
        accent={TRACKS[m.track].accent}
        due={dueByModule.get(m.id) ?? 0}
        index={i}
      />
      {onSpine && AI_COMPRESSED_SPINE.includes(m.id) ? (
        <span style={{ position: 'absolute', bottom: 14, right: 14, pointerEvents: 'none' }}>
          <span className="chip chip--blue">on the Spine</span>
        </span>
      ) : null}
    </div>
  )

  return (
    <div className="page page--padtop">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker">
            <IconRoute size={13} />
            All {stats.modules} modules · in ladder order · {Math.round(stats.hours).toLocaleString('en-US')} hours ·{' '}
            {stats.cards.toLocaleString('en-US')} words
          </div>
          <h1 className="h-page">The ladder</h1>
          <p className="page-head__sub" id="lock-note">
            {LOCK_NOTE}
            {spineNote(onSpine)}
          </p>
        </div>
        {totalDue > 0 ? (
          <Button variant="primary" size="lg" onClick={() => navigate('/review')}>
            <IconRecall size={15} />
            Review {totalDue}
            <IconArrowRight size={15} />
          </Button>
        ) : null}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(146px, 1fr))',
          gap: 'var(--gap)',
          marginBottom: 'var(--gap)',
        }}
      >
        <Card pad index={0}>
          <Stat value={`${passed}/${stats.modules}`} label="Passed" />
        </Card>
        <Card pad index={1}>
          <Stat value={ranked.length} label="Open now" />
        </Card>
        <Card pad index={2}>
          <Stat value={totalDue} label="Due today" />
        </Card>
        <Card pad index={3}>
          <Stat value={`${cp.done}/${cp.total}`} label="Checkpoints ticked" />
        </Card>
      </div>

      {/* ── controls ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 'var(--gap)',
        }}
      >
        <Segmented
          value={view}
          options={[
            { value: 'ladder', label: 'The ladder' },
            { value: 'next', label: 'Open now' },
            { value: 'all', label: 'Everything' },
            { value: 'pinned', label: `Pinned${state.pinned.length ? ` (${state.pinned.length})` : ''}` },
            { value: 'locked', label: 'Gated' },
          ]}
          onChange={(v) => {
            setView(v)
            setQuery('')
          }}
        />

        <label className="search grow">
          <IconSearch size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, modules, topics…"
            aria-label="Search the curriculum"
          />
          {query ? (
            <button onClick={() => setQuery('')} aria-label="Clear search" type="button">
              <IconX size={14} />
            </button>
          ) : null}
        </label>
      </div>

      {/* ── lessons that match ────────────────────────────────────────────── */}
      {lessonHits.length > 0 ? (
        <div className="lhits">
          <div className="lhits__head">
            {lessonHits.length} lesson{lessonHits.length === 1 ? '' : 's'} match
          </div>
          <ul className="lhits__list">
            {lessonHits.map((h) => (
              <li key={`${h.moduleId}::${h.lesson.id}`}>
                <button
                  className="lhits__item"
                  onClick={() => navigate(`/module/${h.moduleId}?lesson=${h.lesson.id}`)}
                >
                  <span className="lhits__title">{h.lesson.title}</span>
                  <span className="lhits__where">
                    {h.moduleTitle}
                    {h.matchedTopic ? ` · ${h.matchedTopic}` : ''}
                  </span>
                  <span className="lhits__mins num">{h.lesson.minutes}m</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ── results ───────────────────────────────────────────────────────── */}
      {shown.length === 0 && lessonHits.length === 0 ? (
        <Empty
          icon={view === 'pinned' ? <IconStar size={28} /> : <IconBook size={28} />}
          title={
            results
              ? `Nothing matches “${query}”`
              : view === 'pinned'
                ? 'Nothing pinned yet'
                : 'Nothing here'
          }
          body={
            view === 'pinned'
              ? 'Pin a module from its page to keep it in reach.'
              : 'Try a different filter or search term.'
          }
        />
      ) : shown.length === 0 ? null : (
        <>
          {results ? (
            <p style={{ fontSize: 11.5, color: 'var(--ink-4)', marginBottom: 12 }}>
              {results.length} match{results.length === 1 ? '' : 'es'}
            </p>
          ) : null}
          {view === 'ladder' && !results ? (
            <Ladder card={card} />
          ) : (
            <div className="mgrid">{shown.map(card)}</div>
          )}
        </>
      )}

      {view === 'next' && !results && ranked.length > 0 ? <WhyThisOrder /> : null}
      {view === 'locked' && !results ? <GatedExplainer /> : null}

      <div className="grid-2" style={{ marginTop: 26 }}>
        <div className="stack">
          <Card index={0}>
            <CardHead icon={<IconRoute size={15} />} title="How the ladder works" divided />
            <div className="sect">
              {ladderNotes().map(([k, v]) => (
                <Gloss key={k} term={k}>
                  {v}
                </Gloss>
              ))}
            </div>
          </Card>
        </div>
        <div className="stack">
          <ByTheNumbers index={1} rows={ladderNumbers(state)} />
          <Card className="quote" index={2}>
            <div className="quote__scrim" />
            <div className="quote__inner">
              <p className="quote__text">“The longest path, not the hour sum.”</p>
              <div className="quote__by">— Rule 2</div>
            </div>
          </Card>
        </div>
      </div>

      <TrackLegend />
    </div>
  )
}

/** All thirty-three, in the curriculum file's order — the order they are climbed. */
function ladder(): Module[] {
  return AI_CURRICULUM.map((m) => moduleById(m.id)).filter((m): m is Module => !!m)
}

/**
 * The ladder, layer by layer, with the hard gate between Layers 3 and 4 —
 * where it bites, rather than in a panel somewhere else.
 */
function Ladder({ card }: { card: (m: Module, i: number) => ReactNode }) {
  const { state } = useLearner()
  return (
    <>
      {AI_LAYERS.map((L) => {
        const mods = AI_CURRICULUM_API.byLayer(L.id)
          .map((m) => moduleById(m.id))
          .filter((m): m is Module => !!m)
        if (!mods.length) return null
        const hours = mods.reduce((a, m) => a + m.hours, 0)
        const done = mods.filter((m) => isPassed(state, m.id)).length
        return (
          <section key={L.id}>
            {L.id === 4 ? (
              <div id="hard-gate" style={{ marginTop: 26, scrollMarginTop: 80 }}>
                <HardGateCard index={0} />
              </div>
            ) : null}
            <div className="ladder-head">
              <span className="ladder-head__n">L{L.id}</span>
              <button className="ladder-head__t" type="button" onClick={() => navigate(`/${TRACK_ORDER[L.id]}`)}>
                {L.name}
              </button>
              <span className="ladder-head__r" />
              <span className="ladder-head__h">
                {done}/{mods.length} · {hours}h
              </span>
            </div>
            <div className="mgrid">{mods.map(card)}</div>
          </section>
        )
      })}
    </>
  )
}

function ladderNumbers(state: ReturnType<typeof useLearner>['state']): [string, string][] {
  const sum = AI_CURRICULUM_API.progressSummary(progressOf(state))
  const chain = AI_CURRICULUM_API.criticalPath()
  return [
    ['Modules passed', `${sum.modulesDone}/${sum.modulesTotal}`],
    ['Module hours', `${sum.hoursDone} / ${sum.hoursTotal}`],
    ['With the tracks', `${AI_CURRICULUM_API.totalHours().total}h`],
    ['Longest chain', `${chain.path.length} modules · ${chain.hours}h`],
    ['That chain', chainText()],
    ['Layers', String(AI_LAYERS.length)],
  ]
}

function WhyThisOrder() {
  return (
    <Card index={0} style={{ marginTop: 26 }}>
      <CardHead icon={<IconRoute size={15} />} title="Why this order" divided />
      <div className="sect" style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.7 }}>
        These are the modules open to you now — every module each one needs has passed its gate — ranked
        rather than listed. The score weighs how much of the curriculum each one unblocks, whether you
        have touched it, and how recently. A module a date or an event starts is open but ranked last:
        it waits for its moment, and it says inside when that is.
      </div>
    </Card>
  )
}

function GatedExplainer() {
  return (
    <Card index={0} style={{ marginTop: 26 }}>
      <CardHead icon={<IconLock size={15} />} title="About the locks" divided />
      <div className="sect" style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.7 }}>
        {LOCK_NOTE} A gate with no referee is decorative, so the lock is real: a module opens when a
        referee has passed the gate of every module it depends on, and Layers 4 to 6 also wait on the
        hard gate. Reading ahead is fine — every page opens — but nothing on a locked module can be
        claimed.
      </div>
    </Card>
  )
}

function TrackLegend() {
  return (
    <div className="legend">
      {TRACK_ORDER.map((t) => (
        <button key={t} onClick={() => navigate(`/${t}`)} type="button">
          <span style={{ background: TRACKS[t].accent }} />
          {TRACKS[t].title}
        </button>
      ))}
    </div>
  )
}
