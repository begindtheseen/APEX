/* ============================================================================
   LAUNCHPAD — module page (ORBIT's)
   ----------------------------------------------------------------------------
   Everything about one module, organised as ORBIT's study path — Learn, then
   Build (ORBIT's Practice step), then Recall — with LAUNCHPAD's module inside
   it, whole:

     Learn    the notes to read first and the timing notes, the Words, the
              module's prose from the curriculum document as lessons, what you
              have to hold in your head, the pitfalls, and the mechanism figure
     Build    the artifact, the checkpoints, the gate and its referee, and the
              claim record — delta written, artifact built, gate passed —
              claimed in order, and only once the module is open
     Recall   the Words as flashcards on ORBIT's spaced-repetition scheduler

   The page leads with whichever step is next, so a first visit opens on Learn
   and a module whose delta is written opens on Build.

   The one decision this page has to make well is the lock. A module opens
   when every module it depends on has passed its gate, and Layers 4–6 wait on
   the hard gate as well. A locked module can be read in full — reading ahead
   is fine — but nothing on it can be claimed, and the page says exactly which
   gate is in the way rather than pointing at the hard gate nineteen modules
   off.
   ========================================================================== */
import { PLACEMENT_SKILLS } from '@/curriculum/placement'
import { testedOutKeys } from '@/engine/placement'
import { useEffect, useMemo, useState } from 'react'
import {
  IconAlert,
  IconArrowRight,
  IconBook,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconFlag,
  IconFlame,
  IconLink,
  IconLock,
  IconRecall,
  IconRoute,
  IconShield,
  IconStar,
  IconTarget,
  IconTerminal,
  IconWarn,
} from '@/components/icons'
import { Bar, Button, Card, CardHead, Chip, Empty, Ring, Tile } from '@/components/ui'
import {
  ClaimTrack,
  Fact,
  Figure,
  ModuleLink,
  Notice,
  Refusal,
  TickRow,
} from '@/components/lp'
import { TRACKS, lessonKey, loadLessonBody, moduleById, trackPath } from '@/curriculum'
import {
  AI_CURRICULUM,
  AI_LAYERS,
  LAUNCHPAD_CONFIG,
  type LpModule,
} from '@/curriculum/generated/launchpad-data'
import { CLAIM_EXPLAINER, STAND_IN_NOTE, claimHints, ownsLine, whenTag } from '@/curriculum/realm'
import type { Lesson as LessonMeta, Module } from '@/curriculum/types'
import { markLessonRead, markRead, togglePin } from '@/engine/apply'
import {
  andList,
  claimOf,
  claimProgress,
  cpCount,
  cpKey,
  deltaLine,
  hardGate,
  isHardGated,
  isPassed,
  isUnlocked,
  planCheckpoint,
  planStep,
  sortIds,
  type Claim,
  type ClaimPlan,
} from '@/engine/claims'
import { atomsOf, dueAtoms } from '@/engine/scheduler'
import { diagnoseModule } from '@/engine/diagnose'
import { getItem, type LearnerState } from '@/engine/state'
import { currentR } from '@/engine/fsrs'
import { ReadAloud } from '@/components/ReadAloud'
import { ReadingProgress } from '@/components/ReadingProgress'
import { useReadingPlace } from '@/hooks/useReadingPlace'
import { useLearner } from '@/hooks/useLearner'
import { formatDate } from '@/lib/format'
import { Markdown } from '@/lib/markdown'
import { practiceLangs } from '@/lib/practice'
import { TryItHere } from '@/components/ide/TryItHere'
import { useLessonCode } from '@/components/ide/lessonCode'
import { navigate, useRoute } from '@/lib/router'
import './pages.css'

type Step = 'learn' | 'practice' | 'recall'

const STEP_ORDER: Step[] = ['learn', 'practice', 'recall']

function isStep(v: string | undefined): v is Step {
  return v === 'learn' || v === 'practice' || v === 'recall' || v === 'build'
}

export function ModulePage({ id }: { id: string }) {
  const module = moduleById(id)

  if (!module || !module.lp) {
    return (
      <div className="page page--padtop">
        <Empty
          icon={<IconWarn size={30} />}
          title="No such module"
          body={`Nothing in the curriculum has the id “${id}”.`}
          action={
            <Button variant="primary" size="md" onClick={() => navigate('/learning')}>
              Browse the curriculum
            </Button>
          }
        />
      </div>
    )
  }

  // Keyed so moving between modules starts on the right step for the new one
  // rather than inheriting whichever step was open on the last.
  return <ModuleView key={module.id} module={module} lp={module.lp} />
}

/* ── Derived status for the study path ───────────────────────────────────── */

interface Status {
  atoms: number
  cards: number
  quiz: number
  seen: number
  due: number
  read: string | undefined
  lessons: number
  lessonsRead: number
  lessonMinutes: number
  claim: Claim
  cp: { done: number; total: number }
  unlocked: boolean
}

function statusOf(state: LearnerState, module: Module, now: Date): Status {
  const atoms = atomsOf(module)
  const lessons = module.lessons ?? []
  return {
    lessons: lessons.length,
    lessonsRead: lessons.filter((l) => !!state.read[lessonKey(module.id, l.id)]).length,
    lessonMinutes: lessons.reduce((a, l) => a + l.minutes, 0),
    atoms: atoms.length,
    cards: module.cards?.length ?? 0,
    quiz: module.quiz?.length ?? 0,
    seen: atoms.filter((a) => (state.items[a.id]?.memory.reps ?? 0) > 0).length,
    due: dueAtoms(state, [module], now).length,
    read: state.read[module.id],
    claim: claimOf(state, module.id),
    cp: cpCount(state, module.id),
    unlocked: isUnlocked(state, module.id),
  }
}

/**
 * Which step to open on. Recall when something is due; Learn until the module
 * is read or its delta written; Build while there is something left to claim;
 * otherwise back to Learn, where the whole module is.
 */
function suggestStep(s: Status): Step {
  if (s.due > 0) return 'recall'
  if (!s.read && !s.claim.delta) return 'learn'
  if (!s.claim.gate) return 'practice'
  return 'learn'
}

const kindLabel = (m: LpModule) => (m.kind === 'EVIDENCE' ? 'Evidence' : 'Lab')
const layerOf = (m: LpModule) => AI_LAYERS.find((L) => L.id === m.layer)

/* ── The page proper ─────────────────────────────────────────────────────── */

function ModuleView({ module, lp }: { module: Module; lp: LpModule }) {
  const { state, dag, setState } = useLearner()
  const route = useRoute()
  const now = useMemo(() => new Date(), [])
  const status = useMemo(() => statusOf(state, module, now), [state, module, now])
  const [step, setStep] = useState<Step>(() => {
    if (route.query.step === 'build') return 'practice'
    if (isStep(route.query.step)) return route.query.step as Step
    return suggestStep(status)
  })

  // A link to another step of the same module changes only the query, so the
  // page is not remounted; follow it here.
  const asked = route.query.step
  useEffect(() => {
    if (asked === 'build') setStep('practice')
    else if (isStep(asked)) setStep(asked as Step)
  }, [asked])

  const findings = useMemo(() => diagnoseModule(state, dag, module, now), [state, dag, module, now])

  const track = TRACKS[module.track]
  const progress = claimProgress(state, module.id)
  const pinned = state.pinned.includes(module.id)
  const layer = layerOf(lp)

  const startRecall = () => navigate(`/review?module=${module.id}`)
  const markStudied = () => setState((s) => markRead(s, module.id, new Date()))

  const openLesson = route.query.lesson
    ? (module.lessons ?? []).find((l) => l.id === route.query.lesson)
    : undefined
  if (openLesson) {
    return <LessonReader module={module} lesson={openLesson} />
  }

  return (
    <div className="page page--padtop">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
        <button
          className="btn btn--quiet btn--sm"
          onClick={() => navigate(trackPath(module.track))}
          style={{ paddingLeft: 6 }}
          type="button"
        >
          <IconChevronLeft size={14} />
          {track.title}
        </button>
        <Button variant="quiet" size="sm" onClick={() => setState((s) => togglePin(s, module.id))}>
          <IconStar size={14} />
          {pinned ? 'Pinned' : 'Pin'}
        </Button>
      </div>

      <div className="page-head" style={{ paddingTop: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker" style={{ color: track.accent }}>
            <IconRoute size={13} />
            {lp.id} · {lp.hours} hours · L{lp.layer}
            {layer ? ` ${layer.name}` : ''}
            <span style={{ marginLeft: 6 }}>
              <Chip ghost>{kindLabel(lp)}</Chip>
            </span>
            {lp.trigger ? (
              <span style={{ marginLeft: 6 }}>
                <Chip tone="warn">{whenTag(lp)}</Chip>
              </span>
            ) : null}
          </div>
          <h1 className="h-page">{module.title}</h1>
          <p className="page-head__sub">
            {statusLine(state, lp)}
            {ownsLine(lp) ? ` ${ownsLine(lp)}` : ''}
          </p>
          <div style={{ marginTop: 16 }}>
            <ClaimTrack claim={status.claim} />
          </div>
        </div>
        <Ring value={progress} size={68} thickness={5} color={track.accent} />
      </div>

      {lp.trigger ? (
        <Notice label={whenTag(lp)} tone="warn" style={{ marginBottom: 'var(--gap)' }}>
          {lp.trigger}
        </Notice>
      ) : null}
      {lp.currency ? (
        <Notice label="Check this is still true" tone="warn" style={{ marginBottom: 'var(--gap)' }}>
          {lp.currency}
        </Notice>
      ) : null}

      {!status.unlocked ? <LockedBanner lp={lp} /> : null}

      {findings.length > 0 ? (
        <Card index={0} style={{ marginBottom: 'var(--gap)' }}>
          <CardHead icon={<IconRecall size={15} />} title="What the engine sees" divided />
          {findings.slice(0, 3).map((f, i) => (
            <div className="signal" key={i}>
              <span className="signal__dot" />
              <div className="grow">
                <div className="signal__msg">{f.message}</div>
                <div className="signal__action">{f.action}</div>
              </div>
            </div>
          ))}
        </Card>
      ) : null}

      <StudyPath step={step} status={status} onChange={setStep} />

      <div className="read">
        <div className="stack">
          {step === 'learn' ? (
            <Learn
              module={module}
              lp={lp}
              status={status}
              onBuild={() => setStep('practice')}
              onMark={() => {
                markStudied()
                setStep('practice')
              }}
              onMarkAndRecall={() => {
                markStudied()
                startRecall()
              }}
            />
          ) : null}
          {step === 'practice' ? <Build module={module} lp={lp} status={status} /> : null}
          {step === 'recall' ? <Recall module={module} status={status} onStart={startRecall} /> : null}
        </div>

        <div className="stack">
          <Card index={0}>
            <CardHead icon={<IconTarget size={15} />} title="Progress" divided />
            <div className="sect">
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <Bar
                  value={progress}
                  height={5}
                  fill={`linear-gradient(90deg, ${track.accent}55, ${track.accent})`}
                />
                <span style={{ fontSize: 12, color: 'var(--ink-2)', fontVariantNumeric: 'tabular-nums' }}>
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div style={{ marginTop: 13, fontSize: 11.5, color: 'var(--ink-4)', lineHeight: 1.8 }}>
                <div>{status.claim.delta ? 'Delta written' : 'Delta not written yet'}</div>
                {status.cp.total > 0 ? (
                  <div>
                    {status.cp.done} of {status.cp.total} checkpoints ticked
                  </div>
                ) : null}
                <div>{status.claim.artifact ? 'Artifact built' : 'Artifact not built yet'}</div>
                <div>{status.claim.gate ? 'Gate passed' : 'Gate not passed yet'}</div>
                {status.lessons > 0 ? (
                  <div>
                    {status.lessonsRead} of {status.lessons} lessons read
                  </div>
                ) : null}
                <div>
                  {status.seen} of {status.atoms} words seen in recall · {status.due} due
                </div>
              </div>
            </div>
          </Card>

          <Card index={1}>
            <CardHead icon={<IconRoute size={15} />} title="This module" divided />
            <div className="sect" style={{ paddingTop: 6, paddingBottom: 6 }}>
              <Fact k="Hours" v={`${lp.hours}h`} />
              <Fact k="Kind" v={kindLabel(lp)} />
              <Fact k="Layer" v={`L${lp.layer}`} />
              <Fact k="Depends on" v={lp.dependsOn.length ? sortIds(lp.dependsOn).join(', ') : '—'} />
              {lp.owns?.length ? <Fact k="Owns the idea of" v={andList(lp.owns)} /> : null}
            </div>
          </Card>

          <PrereqCard lp={lp} />
          <OpensCard lp={lp} />
          <NextCard lp={lp} />
        </div>
      </div>
    </div>
  )
}

/** The sentence under the title: where this module stands, and why. */
function statusLine(state: LearnerState, m: LpModule): string {
  const fg = hardGate(state)
  const gated = isHardGated(m.layer)
  const unmet = m.dependsOn.filter((d) => !isPassed(state, d))
  const met = m.dependsOn.filter((d) => isPassed(state, d))
  if (isPassed(state, m.id)) return 'Passed. Delta written, artifact built, gate passed.'
  if (!m.dependsOn.length) return 'No prerequisites — this is where the curriculum starts.'
  if (isUnlocked(state, m.id)) {
    return `Open now. It needed ${andList(m.dependsOn)}, and ${m.dependsOn.length > 1 ? 'all are' : 'it is'} passed.`
  }
  return (
    'Locked. Waiting on ' +
    (unmet.length ? andList(sortIds(unmet)) : '') +
    (gated && !fg.open
      ? `${unmet.length ? ', and the hard gate (' : 'the hard gate ('}${fg.done} of ${fg.total} done, on the Learning page)`
      : '') +
    '.' +
    (met.length ? ` ${andList(sortIds(met))} already passed.` : '')
  )
}

/* ── Study path strip ────────────────────────────────────────────────────── */

function StudyPath({
  step,
  status,
  onChange,
}: {
  step: Step
  status: Status
  onChange: (s: Step) => void
}) {
  const c = status.claim
  const meta: Record<Step, string> = {
    learn: status.read
      ? `Studied ${formatDate(status.read) ?? ''}`
      : status.lessons > 0
        ? `${status.lessonsRead} of ${status.lessons} lessons · ${formatMinutes(status.lessonMinutes)}`
        : `${status.cards} words`,
    practice: c.gate
      ? 'Gate passed'
      : c.artifact
        ? 'Artifact built · the gate next'
        : status.cp.total > 0 && c.delta
          ? `${status.cp.done} of ${status.cp.total} checkpoints`
          : c.delta
            ? 'Delta written · the artifact next'
            : 'Delta, artifact, gate',
    recall:
      status.atoms === 0
        ? 'Nothing to recall'
        : status.due > 0
          ? `${status.due} due now`
          : status.seen === 0
            ? `${status.cards} words`
            : `${status.seen} of ${status.atoms} seen`,
  }
  const label: Record<Step, string> = { learn: 'Learn', practice: 'Build', recall: 'Recall' }
  const done: Record<Step, boolean> = {
    learn: !!status.read,
    practice: c.gate,
    recall: status.atoms > 0 && status.seen === status.atoms && status.due === 0,
  }

  return (
    <div className="path" role="tablist" aria-label="Study path">
      {STEP_ORDER.map((s, i) => (
        <button
          key={s}
          className="path__step"
          data-on={s === step}
          data-done={done[s]}
          onClick={() => onChange(s)}
          role="tab"
          aria-selected={s === step}
          type="button"
        >
          <span className="path__num">{done[s] ? <IconCheck size={13} /> : i + 1}</span>
          <span className="path__body">
            <span className="path__label">{label[s]}</span>
            <span className="path__meta">{meta[s]}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

/* ── Learn ───────────────────────────────────────────────────────────────── */

function Learn({
  module,
  lp,
  status,
  onBuild,
  onMark,
  onMarkAndRecall,
}: {
  module: Module
  lp: LpModule
  status: Status
  onBuild: () => void
  onMark: () => void
  onMarkAndRecall: () => void
}) {
  const { state } = useLearner()
  const lessons = module.lessons ?? []
  // Lessons the placement test showed she already knows: still open, not "up next".
  const testedOut = testedOutKeys(PLACEMENT_SKILLS, state.placement)
  const firstUnread = lessons.find((l) => !state.read[lessonKey(module.id, l.id)] && !testedOut.has(lessonKey(module.id, l.id)))
  const words = lp.words ?? []
  const [viz, setViz] = useState<string | null>(null)

  // The figures are the heaviest thing a module page draws, so they arrive in
  // their own chunk, on the Learn step, and not before.
  useEffect(() => {
    let alive = true
    void import('@/curriculum/generated/launchpad-viz').then((m) => {
      if (alive) setViz(m.LAUNCHPAD_VIZ[lp.id] ?? '')
    })
    return () => {
      alive = false
    }
  }, [lp.id])

  let n = 0
  const num = () => String(++n).padStart(2, '0')

  return (
    <>
      {lp.note ? (
        <Notice label="Read this first">{lp.note}</Notice>
      ) : null}

      {!status.read ? (
        <Card index={0}>
          <CardHead icon={<IconRoute size={15} />} title="How to study this module" divided />
          <div className="sect">
            <ol className="steps">
              <li>
                <span className="steps__num">1</span>
                <span>
                  <strong>Read the words first, then the lessons, in order.</strong> A reader with no
                  background never meets a term on this page before its plain definition. The lessons
                  are this module as the curriculum document writes it: what to understand, what to
                  build, then the gate and what most people get wrong.
                </span>
              </li>
              <li>
                <span className="steps__num">2</span>
                <span>
                  <strong>Write the delta.</strong> {deltaLine(lp.id)}
                </span>
              </li>
              <li>
                <span className="steps__num">3</span>
                <span>
                  <strong>Then build.</strong> The Build step holds the artifact, its checkpoints and the
                  gate. You do not advance by reading; you advance by shipping a working thing, and a
                  referee saying yes is what opens the next module. Recall drills this module&rsquo;s
                  words in the meantime.
                </span>
              </li>
            </ol>
          </div>
        </Card>
      ) : null}

      {words.length ? (
        <Card index={1}>
          <CardHead
            icon={<IconBook size={15} />}
            title={`${num()} · Words (${words.length})`}
            right={<span className="eyebrow-dim">plain definitions, first</span>}
            divided
          />
          <div className="sect">
            <p className="lp-para lp-para--dim">
              Plain definitions, each one written before anything else on the page uses it. Open them
              now, or come back when a word stops you. Recall drills them as flashcards.
            </p>
            <details className="lp-words">
              <summary>Show the {words.length} definitions</summary>
              <dl className="words">
                {words.map(([term, def]) => (
                  <span key={term} style={{ display: 'contents' }}>
                    <dt>{term}</dt>
                    <dd>{def}</dd>
                  </span>
                ))}
              </dl>
            </details>
          </div>
        </Card>
      ) : null}

      {lessons.length ? (
        <Card index={2}>
          <CardHead
            icon={<IconBook size={15} />}
            title={`${num()} · Lessons (${lessons.length})`}
            right={
              <span className="eyebrow-dim">
                {status.lessonsRead} of {lessons.length} read · {formatMinutes(status.lessonMinutes)}
              </span>
            }
            divided
          />
          <div className="sect" style={{ paddingTop: 6, paddingBottom: 6 }}>
            {lessons.map((l, i) => {
              const done = !!state.read[lessonKey(module.id, l.id)]
              const skipped = !done && testedOut.has(lessonKey(module.id, l.id))
              return (
                <button
                  key={l.id}
                  className="lesson"
                  data-done={done}
                  data-next={!done && firstUnread?.id === l.id}
                  onClick={() => navigate(`/module/${module.id}?lesson=${l.id}`)}
                  type="button"
                >
                  <span className="lesson__num">{done ? <IconCheck size={13} /> : i + 1}</span>
                  <span className="grow" style={{ minWidth: 0 }}>
                    <span className="lesson__title">{l.title}</span>
                    <span className="lesson__meta">
                      {l.minutes} min
                      {skipped ? ' · tested out' : !done && firstUnread?.id === l.id ? ' · up next' : done ? ' · read' : ''}
                    </span>
                  </span>
                  <IconChevronRight size={14} style={{ color: 'var(--ink-5)', flex: 'none' }} />
                </button>
              )
            })}
          </div>
        </Card>
      ) : null}

      {lp.concepts?.length ? (
        <Card index={3}>
          <CardHead icon={<IconTarget size={15} />} title={`${num()} · What you have to hold in your head`} divided />
          <div className="sect">
            <p className="lp-para lp-para--dim">{deltaLine(lp.id)}</p>
            <ul className="objlist">
              {lp.concepts.map((o, i) => (
                <li key={i}>
                  <IconCheck size={14} />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ) : null}

      {lp.mistakes?.length ? (
        <Card index={4}>
          <CardHead icon={<IconAlert size={15} />} title={`${num()} · Pitfalls`} divided />
          <div className="sect">
            <p className="lp-para lp-para--dim">
              What most people get wrong here. Not hypotheticals: each one is a way this module is
              commonly failed while it feels like progress.
            </p>
            <ul className="lp-list" data-kind="bad">
              {lp.mistakes.map((t, i) => (
                <li key={i}>
                  <span className="lp-list__mark">✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ) : null}

      {viz ? (
        <Card index={5}>
          <CardHead
            icon={<IconRoute size={15} />}
            title="Mechanism"
            right={<span className="eyebrow-dim">Fig. {lp.id} · how it actually works</span>}
            divided
          />
          <div className="sect">
            <Figure svg={viz} label={`Figure ${lp.id}: how ${lp.title} works`} />
          </div>
        </Card>
      ) : null}

      <Card index={6}>
        <div className="sect" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {status.read ? (
            <>
              <Chip tone="ok">
                <IconCheck size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 4 }} />
                Studied {formatDate(status.read) ?? ''}
              </Chip>
              <span className="grow" />
              <Button variant="ghost" size="md" onClick={onMarkAndRecall} disabled={status.atoms === 0}>
                <IconRecall size={15} />
                {status.due > 0 ? `Review ${status.due} due` : status.seen === 0 ? 'Start recall' : 'Recall again'}
              </Button>
              <Button variant="primary" size="md" onClick={onBuild}>
                <IconTerminal size={15} />
                Go to Build
                <IconArrowRight size={15} />
              </Button>
            </>
          ) : (
            <>
              <span style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }} className="grow">
                Read the words and the lessons? Say so, and move on to the delta and the artifact.
              </span>
              <Button variant="ghost" size="md" onClick={onMarkAndRecall} disabled={status.atoms === 0}>
                <IconRecall size={15} />
                Mark as studied and recall the words
              </Button>
              <Button variant="primary" size="md" onClick={onMark}>
                <IconCheck size={15} />
                Mark as studied · go to Build
                <IconArrowRight size={15} />
              </Button>
            </>
          )}
        </div>
      </Card>
    </>
  )
}

/* ── Build (ORBIT's Practice step) ───────────────────────────────────────── */

function Build({ module, lp, status }: { module: Module; lp: LpModule; status: Status }) {
  const { state, claim } = useLearner()
  const [msg, setMsg] = useState<string | null>(null)
  const [cpMsg, setCpMsg] = useState<string | null>(null)
  const locked = !status.unlocked
  const c = status.claim
  const cc = status.cp
  const hints = claimHints(lp.id, c.delta, cc)

  const apply = (plan: ClaimPlan, set: (m: string | null) => void) => {
    const r = claim(plan)
    set(r.result === 'blocked' ? (r.message ?? null) : null)
  }

  return (
    <>
      <Card index={0}>
        <CardHead
          icon={<IconTerminal size={15} />}
          title="The artifact you ship"
          right={
            <div style={{ display: 'flex', gap: 6 }}>
              <Chip tone={lp.kind === 'EVIDENCE' ? 'blue' : undefined} ghost={lp.kind !== 'EVIDENCE'}>
                {kindLabel(lp)}
              </Chip>
              <Chip ghost>{lp.hours}h</Chip>
            </div>
          }
          divided
        />
        <div className="sect">
          <p className="lp-para lp-para--dim">
            One buildable thing. If you cannot explain it out loud, it does not count as built.
          </p>
          <div className="lp-body">{lp.artifact}</div>
          {practiceLangs(module).length ? (
            <TryItHere
              langs={practiceLangs(module)}
              saveKey={`try:${module.id}`}
              title="Work on it here"
              intro="Build and test pieces of the artifact without leaving the module. Everything runs in this page; the code is kept with the module."
            />
          ) : (
            <div style={{ display: 'flex', gap: 9, marginTop: 15, flexWrap: 'wrap' }}>
              <Button variant="ghost" size="sm" onClick={() => navigate('/playground')}>
                <IconTerminal size={14} />
                Open the playground
              </Button>
            </div>
          )}
        </div>
      </Card>

      {cc.total > 0 ? (
        <Card index={1}>
          <CardHead
            icon={<IconFlag size={15} />}
            title="Checkpoints"
            right={<Chip tone={cc.done >= cc.total ? 'ok' : undefined} ghost={cc.done < cc.total}>{cc.done} of {cc.total}</Chip>}
            divided
          />
          <div className="sect">
            <p className="lp-para lp-para--dim">
              {locked
                ? 'A bad week should cost you a checkpoint, not the module. These open when this module does.'
                : 'A bad week should cost you a checkpoint, not the module. Tick each one as you finish it — the module cannot be claimed until they are all ticked.'}
            </p>
            <div className="cpbar">
              <span>
                {cc.done} of {cc.total} done
              </span>
              <Bar value={cc.total ? cc.done / cc.total : 0} height={5} />
            </div>
            {(lp.checkpoints ?? []).map((t, i) => (
              <TickRow
                key={cpKey(t)}
                on={!!c.cp[cpKey(t)]}
                locked={locked}
                label={t}
                mark={i + 1}
                onToggle={() => apply(planCheckpoint(state, lp.id, i), setCpMsg)}
              />
            ))}
            <p className="lp-para lp-para--dim" style={{ marginTop: 10 }}>
              {locked
                ? 'This module is locked, so nothing here can be ticked yet. Reading ahead is fine.'
                : !c.delta
                  ? 'Write the delta first — that is what opens these.'
                  : cc.done >= cc.total
                    ? `All ${cc.total} done. Tick "Artifact built" under Claim progress.`
                    : `Tick each one as you finish it. "Artifact built" does not open until all ${cc.total} are ticked.`}
            </p>
            <Refusal message={cpMsg} />
          </div>
        </Card>
      ) : (
        <Card index={1}>
          <CardHead icon={<IconFlag size={15} />} title="Checkpoints" divided />
          <div className="sect">
            <p className="lp-para lp-para--dim">
              No stable half-finished state: this one has no point you can stop at and come back to
              without losing the thread.
            </p>
            <p className="lp-para">
              None — this module is small enough that a bad week costs you the module rather than a
              checkpoint. It is {lp.hours} hours: plan a run of consecutive days for it, and if a bad
              week lands in the middle, start it again rather than resuming.
            </p>
          </div>
        </Card>
      )}

      <Card index={2}>
        <CardHead icon={<IconShield size={15} />} title="The gate" divided />
        <div className="sect">
          <p className="lp-para lp-para--dim">
            What a referee has to say yes to. A gate with no referee is decorative. This one names the
            person, the condition, and the cost of failing it.
          </p>
          <div className="gate-row">
            <span className="gate-row__k">Referee</span>
            <span className="gate-row__v">{lp.gate.referee}</span>
          </div>
          <div className="gate-row">
            <span className="gate-row__k">Pass</span>
            <span className="gate-row__v">{lp.gate.pass}</span>
          </div>
          {lp.gate.unseen ? (
            <div className="gate-row">
              <span className="gate-row__k">Unseen</span>
              <span className="gate-row__v">{lp.gate.unseen}</span>
            </div>
          ) : null}
          <div className="gate-row" data-fail="true">
            <span className="gate-row__k">On fail</span>
            <span className="gate-row__v">{lp.gate.onFail}</span>
          </div>
        </div>
      </Card>

      <Card index={3}>
        <CardHead icon={<IconCheck size={15} />} title="Claim progress" right={<span className="eyebrow-dim">in order</span>} divided />
        <div className="sect">
          <p className="lp-para lp-para--dim">{CLAIM_EXPLAINER}</p>
          <p className="lp-para lp-para--dim">{LAUNCHPAD_CONFIG.gateRecord}</p>
          <p className="lp-para lp-para--dim">
            {STAND_IN_NOTE}{' '}
            <a href="#/tracks" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              Track 5 is on the Parallel tracks page.
            </a>
          </p>
          {locked ? <LockedNote lp={lp} /> : null}
          {(['delta', 'artifact', 'gate'] as const).map((stepKey) => (
            <TickRow
              key={stepKey}
              on={c[stepKey]}
              locked={locked}
              label={stepKey === 'delta' ? 'Delta written' : stepKey === 'artifact' ? 'Artifact built' : 'Gate passed'}
              hint={hints[stepKey]}
              onToggle={() => apply(planStep(state, lp.id, stepKey), setMsg)}
            />
          ))}
          <Refusal message={msg} />
        </div>
      </Card>

      {lp.exports?.length ? (
        <Card index={4}>
          <CardHead
            icon={<IconLink size={15} />}
            title="What this hands to later modules"
            right={<span className="eyebrow-dim">{lp.exports.length}</span>}
            divided
          />
          <div className="sect">
            {lp.exports.map((x) => {
              const parts = String(x).split('->')
              return (
                <div className="gloss" key={x}>
                  <div className="gloss__term">{parts[0]!.trim()}</div>
                  {parts.length > 1 ? (
                    <div className="gloss__text">Used by {parts.slice(1).join('->').trim()}.</div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </Card>
      ) : null}

      <p className="track-note" style={{ marginTop: 0 }}>
        {module.title}: the ticks here are your record, kept on this device. They are worth exactly what
        your honesty is worth — write the referee&rsquo;s name, the date and one line of what they said
        in your own notes beside each gate.
      </p>
    </>
  )
}

/** What stands between this module and a tick, as the realm's footer said it. */
function LockedNote({ lp }: { lp: LpModule }) {
  const { state } = useLearner()
  const unmet = lp.dependsOn.filter((d) => !isPassed(state, d))
  const met = lp.dependsOn.filter((d) => isPassed(state, d))
  const need: string[] = []
  if (unmet.length) need.push(`${andList(sortIds(unmet))}${unmet.length > 1 ? ' have' : ' has'} passed`)
  if (isHardGated(lp.layer) && !hardGate(state).open) need.push('the hard gate is open')
  return (
    <Notice label="Locked" tone="warn" style={{ margin: '4px 0 10px' }}>
      Reading ahead is fine, but nothing here can be ticked until {need.length ? need.join(' and ') : 'it opens'}.
      {met.length ? ` ${andList(sortIds(met))}${met.length > 1 ? ' are' : ' is'} already passed.` : ''}
    </Notice>
  )
}

/* ── Shared panels ───────────────────────────────────────────────────────── */

function LockedBanner({ lp }: { lp: LpModule }) {
  const { state } = useLearner()
  const unmet = sortIds(lp.dependsOn.filter((d) => !isPassed(state, d)))
  const gateShut = isHardGated(lp.layer) && !hardGate(state).open
  return (
    <Card index={0} style={{ marginBottom: 'var(--gap)', borderColor: 'rgba(240,168,72,0.28)' }}>
      <div style={{ padding: '15px 17px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Tile size={34} radius={9} color="var(--warn)">
          <IconLock size={16} />
        </Tile>
        <div className="grow">
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
            Locked — reading ahead is fine, claiming is not
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 5, lineHeight: 1.6 }}>
            {unmet.length && gateShut
              ? `${andList(unmet)} first — and then the hard gate.`
              : unmet.length
                ? `${andList(unmet)} ${unmet.length > 1 ? 'have' : 'has'} to pass first.`
                : 'The hard gate is not open yet — all four conditions first.'}{' '}
            You can read everything on this page; nothing on it can be ticked until then.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 11, flexWrap: 'wrap' }}>
            {unmet.slice(0, 3).map((b) => (
              <Button key={b} variant="ghost" size="sm" onClick={() => navigate(`/module/${b}`)}>
                {b} · {moduleById(b)?.title ?? b}
                <IconArrowRight size={13} />
              </Button>
            ))}
            {gateShut ? (
              <Button variant="ghost" size="sm" onClick={() => navigate('/learning?show=gate')}>
                The hard gate
                <IconArrowRight size={13} />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  )
}

function PrereqCard({ lp }: { lp: LpModule }) {
  const { state } = useLearner()
  const prereqs = sortIds(lp.dependsOn)
  if (prereqs.length === 0) {
    return (
      <Card index={2}>
        <CardHead icon={<IconRoute size={15} />} title="Prerequisites" divided />
        <div className="sect" style={{ fontSize: 12, color: 'var(--ink-4)', lineHeight: 1.6 }}>
          None. This is where the curriculum starts — you can open it today with no background at all.
        </div>
      </Card>
    )
  }

  return (
    <Card index={2}>
      <CardHead icon={<IconRoute size={15} />} title={`Prerequisites (${prereqs.length})`} divided />
      <div className="sect">
        {prereqs.map((p) => {
          const m = moduleById(p)
          const ok = isPassed(state, p)
          return (
            <button
              key={p}
              className="rsrc"
              onClick={() => navigate(`/module/${p}`)}
              style={{ width: '100%', textAlign: 'left' }}
              type="button"
            >
              <span className="rsrc__kind" style={{ color: ok ? 'var(--ok)' : 'var(--warn)' }}>
                {p}
              </span>
              <div className="grow">
                <div className="rsrc__title">{m?.title ?? p}</div>
                <div className="rsrc__by">{ok ? 'Passed' : 'Its gate has to pass to open this one'}</div>
              </div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

/**
 * What this opens. The only place the dependency graph answers "why am I
 * doing this one" without the learner tracing edges.
 */
function OpensCard({ lp }: { lp: LpModule }) {
  const { state } = useLearner()
  const opens = AI_CURRICULUM.filter((x) => x.dependsOn.includes(lp.id))
  if (!opens.length) return null
  const fg = hardGate(state)
  return (
    <Card index={3}>
      <CardHead icon={<IconLink size={15} />} title={`Modules that need this (${opens.length})`} divided />
      <div className="sect">
        {opens.map((x) => {
          const others = x.dependsOn.filter((d) => d !== lp.id)
          const sub =
            `${x.hours}h · ` +
            (isPassed(state, x.id)
              ? 'passed'
              : others.length
                ? `also needs ${andList(others)}`
                : 'opens when this passes') +
            (isHardGated(x.layer) && !fg.open ? ' · and the hard gate' : '')
          return <ModuleLink key={x.id} m={x} sub={sub} dim={!isUnlocked(state, x.id)} />
        })}
      </div>
    </Card>
  )
}

/** The next rung, so no module ends without saying where to go. */
function NextCard({ lp }: { lp: LpModule }) {
  const { state } = useLearner()
  const at = AI_CURRICULUM.findIndex((m) => m.id === lp.id)
  const nx = at >= 0 ? AI_CURRICULUM[at + 1] : undefined
  if (!nx) {
    return (
      <Card index={4}>
        <CardHead icon={<IconFlame size={15} />} title="Last module" divided />
        <div className="sect" style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6 }}>
          There is no next rung. From here the tracks continue (Parallel tracks) until you are hired, and
          M31 and M32 are re-read on the day you start.
        </div>
      </Card>
    )
  }
  const open = isUnlocked(state, nx.id)
  const fg = hardGate(state)
  const sub =
    `${nx.hours}h` +
    (isPassed(state, nx.id)
      ? ' · passed'
      : open
        ? ' · open now'
        : ` · locked until ${andList(nx.dependsOn.filter((d) => !isPassed(state, d)))} passed` +
          (isHardGated(nx.layer) && !fg.open ? ' and the hard gate is open' : ''))
  return (
    <Card index={4}>
      <CardHead icon={<IconArrowRight size={15} />} title="Next on the ladder" divided />
      <div className="sect">
        <ModuleLink m={nx} sub={sub} dim={!open} />
      </div>
    </Card>
  )
}

/* ── Recall ──────────────────────────────────────────────────────────────── */

function Recall({ module, status, onStart }: { module: Module; status: Status; onStart: () => void }) {
  const { state } = useLearner()
  const now = new Date()
  const cards = module.cards ?? []
  const quiz = module.quiz ?? []

  const cta =
    status.atoms === 0
      ? 'Nothing to recall'
      : status.due > 0
        ? `Review ${status.due} due`
        : status.seen === 0
          ? `Start recall · ${status.atoms} items`
          : 'Recall again'

  return (
    <>
      <Card index={0}>
        <CardHead
          icon={<IconRecall size={15} />}
          title="Recall"
          right={
            status.due > 0 ? (
              <Chip tone="warn">{status.due} due</Chip>
            ) : status.seen > 0 ? (
              <Chip tone="ok">{status.seen} seen</Chip>
            ) : null
          }
          divided
        />
        <div className="sect">
          <p style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>
            This module&rsquo;s words, scheduled by spaced repetition: the term on the front, its
            plain definition on the back. You see a term, say what it means, reveal, and grade
            yourself; the grade sets when it comes back. New words are introduced a few at a time, so
            a first session is short and later ones are mostly review. Recall keeps the vocabulary;
            the gate is still what opens the next module.
          </p>
          {!status.read && status.seen === 0 ? (
            <p className="track-note" style={{ marginTop: 12 }}>
              <IconFlame size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 5 }} />
              You have not marked the Learn step done. Recall works best once you have read the words
              and the lessons — it tests, it does not teach.
            </p>
          ) : null}
          <div style={{ marginTop: 15 }}>
            <Button variant="primary" size="lg" onClick={onStart} disabled={status.atoms === 0}>
              <IconRecall size={15} />
              {cta}
              <IconArrowRight size={15} />
            </Button>
          </div>
        </div>
      </Card>

      <Card index={1}>
        <CardHead icon={<IconRecall size={15} />} title={`Words (${cards.length})`} divided />
        <div className="sect">
          {cards.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--ink-4)' }}>None yet.</p>
          ) : (
            cards.map((c) => {
              const it = getItem(state, `${module.id}::card::${c.id}`)
              const r = it.memory.reps > 0 ? currentR(it.memory, now) : null
              return (
                <div className="rsrc" key={c.id}>
                  <span className="rsrc__kind">{r == null ? 'new' : `${Math.round(r * 100)}%`}</span>
                  <div className="grow">
                    <div className="rsrc__title">{c.front}</div>
                    <div className="rsrc__by">
                      {r == null ? 'not yet recalled' : 'chance you still know it right now'}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </Card>

      {quiz.length > 0 ? (
      <Card index={2}>
        <CardHead icon={<IconTarget size={15} />} title={`Questions (${quiz.length})`} divided />
        <div className="sect">
          {quiz.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--ink-4)' }}>None yet.</p>
          ) : (
            quiz.map((q) => {
              const it = getItem(state, `${module.id}::quiz::${q.id}`)
              const acc = it.attempts > 0 ? it.correct / it.attempts : null
              return (
                <div className="rsrc" key={q.id}>
                  <span className="rsrc__kind">{acc == null ? 'new' : `${Math.round(acc * 100)}%`}</span>
                  <div className="grow">
                    <div className="rsrc__title">{acc == null ? 'Hidden until you attempt it' : q.q}</div>
                    <div className="rsrc__by">
                      {q.bloom ?? 'recall'} · difficulty {(q.b ?? 0).toFixed(1)}
                      {acc == null ? '' : ` · ${it.attempts} attempt${it.attempts === 1 ? '' : 's'}`}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </Card>
      ) : null}
    </>
  )
}

/* ── Lesson reader ───────────────────────────────────────────────────────── */

function LessonReader({ module, lesson }: { module: Module; lesson: LessonMeta }) {
  const { state, setState } = useLearner()
  const lessons = module.lessons ?? []
  const index = lessons.findIndex((l) => l.id === lesson.id)
  const prev = index > 0 ? lessons[index - 1] : undefined
  const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined
  const done = !!state.read[lessonKey(module.id, lesson.id)]
  const [body, setBody] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const renderCode = useLessonCode(`lesson:${module.id}:${lesson.id}`, body)

  useEffect(() => {
    let alive = true
    setBody(null)
    setError(null)
    loadLessonBody(lesson)
      .then((b) => {
        if (alive) setBody(b)
      })
      .catch((err: unknown) => {
        if (alive) setError(err instanceof Error ? err.message : String(err))
      })
    // A new lesson is a new page; the shell only resets scroll on path changes.
    // useReadingPlace restores a saved position after this, on the next frame.
    document.querySelector('.scroll')?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    return () => {
      alive = false
    }
  }, [lesson])

  useReadingPlace({
    placeKey: lessonKey(module.id, lesson.id),
    ready: body !== null,
    resume: {
      kind: 'lesson',
      path: `/module/${module.id}?lesson=${lesson.id}`,
      label: module.title,
      detail: `${lesson.title} · lesson ${index + 1} of ${lessons.length}`,
      moduleId: module.id,
      lessonId: lesson.id,
    },
  })

  const markDone = () =>
    setState((s) =>
      markLessonRead(
        s,
        module.id,
        lesson.id,
        lessons.map((l) => l.id),
        new Date(),
      ),
    )
  const go = (l: LessonMeta | undefined) =>
    navigate(l ? `/module/${module.id}?lesson=${l.id}` : `/module/${module.id}?step=learn`)

  return (
    <div className="page page--padtop reader">
      <ReadingProgress active={body !== null} />
      <div className="reader__aloud">
        <ReadAloud markdown={body} />
      </div>
      <div className="reader__top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
        <button
          className="btn btn--quiet btn--sm"
          onClick={() => navigate(`/module/${module.id}?step=learn`)}
          style={{ paddingLeft: 6 }}
          type="button"
        >
          <IconChevronLeft size={14} />
          {module.title}
        </button>
        <span className="eyebrow-dim">
          Lesson {index + 1} of {lessons.length}
        </span>
      </div>

      <div className="page-head" style={{ paddingTop: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker" style={{ color: TRACKS[module.track].accent }}>
            <IconClock size={13} />
            {lesson.minutes} min read
            {done ? (
              <span style={{ marginLeft: 6 }}>
                <Chip tone="ok">read</Chip>
              </span>
            ) : null}
          </div>
          <h1 className="h-page">{lesson.title}</h1>
        </div>
      </div>

      <Card index={0}>
        <div className="sect reader__body">
          {error ? (
            <Empty
              icon={<IconWarn size={28} />}
              title="This lesson could not be loaded"
              body={error}
              action={
                <Button variant="ghost" size="md" onClick={() => go(undefined)}>
                  Back to the module
                </Button>
              }
            />
          ) : body === null ? (
            <div className="reader__loading">Loading lesson…</div>
          ) : (
            <Markdown className="reader__md" renderCode={renderCode} notes>
              {body}
            </Markdown>
          )}
        </div>
      </Card>

      {body !== null && practiceLangs(module).length ? <TryItHere langs={practiceLangs(module)} saveKey={`try:${module.id}`} /> : null}

      <div className="reader__nav">
        <Button variant="ghost" size="md" onClick={() => go(prev)} disabled={!prev}>
          <IconChevronLeft size={15} />
          {prev ? prev.title : 'Previous'}
        </Button>
        <span className="grow" />
        {done ? (
          <Button variant="primary" size="md" onClick={() => go(next)}>
            {next ? 'Next lesson' : 'Back to the module'}
            <IconArrowRight size={15} />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              markDone()
              go(next)
            }}
            disabled={body === null}
          >
            <IconCheck size={15} />
            {next ? 'Mark as read · next lesson' : 'Mark as read · back to the module'}
          </Button>
        )}
      </div>
      {next ? (
        <p className="track-note">
          Up next: {next.title} · {next.minutes} min
        </p>
      ) : (
        <p className="track-note">
          That is the last lesson. Write the delta, then go to Build: the artifact, its checkpoints and
          the gate are there.
        </p>
      )}
    </div>
  )
}

function formatMinutes(m: number): string {
  if (m < 60) return `${Math.round(m)} min`
  const h = Math.floor(m / 60)
  const r = Math.round(m % 60)
  return r === 0 ? `${h} h` : `${h} h ${r} min`
}
