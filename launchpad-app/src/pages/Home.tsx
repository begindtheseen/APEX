/* ============================================================================
   LAUNCHPAD — dashboard (ORBIT's)
   ----------------------------------------------------------------------------
   ORBIT's dashboard, wired to LAUNCHPAD. Nothing on this page is a mock: every
   percentage is the share of module hours whose gate a referee has passed —
   the number the realm always showed — and the focus list is the modules open
   right now, in ladder order. The rail carries the realm's own cards: how this
   works, its numbers, and its two quotes.
   ========================================================================== */
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { EarthLimb } from '@/components/art/EarthLimb'
import { LayerArt } from '@/components/art/LayerArt'
import { PlanetPlate } from '@/components/art/Thumbs'
import {
  IconArrowRight,
  IconBook,
  IconBars,
  IconCalendar,
  IconClock,
  IconCompass,
  IconDatabase,
  IconDoc,
  IconRecall,
  IconRefresh,
  IconShield,
  IconTarget,
  IconTerminal,
  IconWave,
  Logomark,
  type IconProps,
} from '@/components/icons'
import { LAYER_ICON } from '@/components/layerIcons'
import { ByTheNumbers, HowThisWorks, chainText } from '@/components/lp'
import { Bar, Bullets, Button, Card, CardHead, Check, Ring, RowItem, Tile } from '@/components/ui'
import { TRACKS, TRACK_ORDER, layerOf } from '@/curriculum'
import { AI_CURRICULUM, AI_CURRICULUM_API, LAUNCHPAD_CONFIG } from '@/curriculum/generated/launchpad-data'
import { FINISHED_NOTE, HARD_GATE_TODAY, neverCodedNote, whenTag } from '@/curriculum/realm'
import type { TrackId } from '@/curriculum/types'
import { setOnboarded, startFocus, toggleTask } from '@/engine/apply'
import { cpCount, hardGate, isHardGated, isPassed, isUnlocked, progressOf } from '@/engine/claims'
import { DEFAULT_BLOCK } from '@/engine/focus'
import type { ResumePoint } from '@/engine/resume'
import { dailyPlan } from '@/engine/scheduler'
import { streak, type LearnerState } from '@/engine/state'
import { useLearner } from '@/hooks/useLearner'
import { nextUp } from '@/lib/nextUp'
import { navigate } from '@/lib/router'
import './home.css'

export function Home() {
  const { state, dag, mastery, trackReadiness, readiness, setState, setResume } = useLearner()
  const now = useMemo(() => new Date(), [])

  const plan = useMemo(() => dailyPlan(state, dag, now), [state, dag, now])
  const days = streak(state, now)
  const summary = AI_CURRICULUM_API.progressSummary(progressOf(state))

  return (
    <>
      <Hero
        name={state.settings.displayName}
        flagship={state.setup.flagship}
        readiness={readiness}
        streakDays={days}
        passed={summary.modulesDone}
        total={summary.modulesTotal}
      />

      <div className="page">
        {!state.settings.onboarded ? (
          <Welcome onDismiss={() => setState((s) => setOnboarded(s))} />
        ) : null}

        <ResumeCard point={state.resume} onDismiss={() => setResume(null)} />

        <StartBlock />

        <div className="grid-2">
          {/* ── left column ─────────────────────────────────────────────── */}
          <div className="stack">
            <MissionProgress readiness={readiness} tracks={trackReadiness} />

            {TRACK_ORDER.map((id, i) => (
              <DomainCard key={id} id={id} progress={trackReadiness[id]} index={i + 1} state={state} />
            ))}
          </div>

          {/* ── right rail ──────────────────────────────────────────────── */}
          <div className="stack">
            <QuotePlate />

            <TodaysFocus
              plan={plan}
              date={now}
              onToggle={(taskId) => setState((s) => toggleTask(s, taskId, now))}
            />

            <QuickTools />

            <HowThisWorks index={4} />

            <ByTheNumbers index={5} rows={numbers(state)} />

            <Resources />

            <ClosingPlate />
          </div>
        </div>

        <FootNote modules={dag.all().length} passed={countPassed(mastery)} />
      </div>
    </>
  )
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

function Hero({
  name,
  flagship,
  readiness,
  streakDays,
  passed,
  total,
}: {
  name: string
  flagship?: string
  readiness: number
  streakDays: number
  passed: number
  total: number
}) {
  const finished = passed === total
  return (
    <section className="hero">
      <EarthLimb className="hero__art" progress={readiness} />
      <div className="hero__inner">
        <div className="hero__greet">
          {finished ? 'Every gate passed' : passed ? `${greeting()}, welcome back` : `${greeting()},`}
        </div>
        <h1 className="hero__name">{finished ? 'LAUNCHPAD · finished' : flagship || name}</h1>
        <p className="hero__tag">
          {streakDays > 1 ? `${streakDays} days consistent. ` : ''}
          {LAUNCHPAD_CONFIG.tagline}
        </p>
        <div className="hero__bar">
          <Bar value={readiness} height={4} glow />
        </div>
      </div>
    </section>
  )
}

function greeting(d: Date = new Date()): string {
  const h = d.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/* ── First-run welcome ───────────────────────────────────────────────────── */

/*
 * The first module has no code in it, and the first thing a reader who has
 * never written any needs to hear is where code starts. So the first step
 * links M0 and says so; the rest is the loop every module runs.
 */
export const WELCOME_STEPS: { text: string; to?: string; linkText?: string }[] = [
  {
    text: 'Never written code? Start at M0 — it has none, and code starts in M1',
    to: '/module/M0',
    linkText: 'Start at M0',
  },
  { text: 'Put your runway and weekly hours into The Plan', to: '/plan', linkText: 'The Plan' },
  { text: 'Learn, write the delta, build, and have a referee pass the gate' },
  { text: 'Come back when reviews are due — the planner tells you' },
]

/** Renders a step, linking the phrase named by `linkText` if there is one. */
function StepText({ step }: { step: (typeof WELCOME_STEPS)[number] }) {
  if (!step.to || !step.linkText || !step.text.includes(step.linkText)) return <>{step.text}</>
  const [before, after] = step.text.split(step.linkText) as [string, string]
  return (
    <>
      {before}
      <a
        href={`#${step.to}`}
        onClick={(e) => e.stopPropagation()}
        style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {step.linkText}
      </a>
      {after}
    </>
  )
}

/**
 * Shown until the guide has been opened or the card dismissed. Kept to one
 * short band above the grid: it has to be impossible to miss on a first visit
 * and impossible to resent on the second.
 */
function Welcome({ onDismiss }: { onDismiss: () => void }) {
  return (
    <Card index={0} style={{ marginBottom: 'var(--gap)' }}>
      <div style={{ padding: '15px 17px 14px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <Tile size={40} radius={11} color="var(--accent)" lit>
          <IconCompass size={19} />
        </Tile>

        <div className="grow">
          <div className="eyebrow-dim" style={{ color: 'var(--accent)' }}>
            Welcome to LAUNCHPAD
          </div>
          <h2
            style={{
              marginTop: 4,
              fontSize: 15.5,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              lineHeight: 1.25,
              color: 'var(--ink)',
            }}
          >
            New here? Here is how this works.
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px 18px',
              marginTop: 11,
            }}
          >
            <ol
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px 18px',
                flex: '1 1 400px',
                minWidth: 0,
              }}
            >
              {WELCOME_STEPS.map((step, i) => (
                <li
                  key={step.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: 'var(--ink-2)',
                  }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'rgba(86, 150, 248, 0.14)',
                      color: 'var(--accent)',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                  <StepText step={step} />
                </li>
              ))}
            </ol>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Button variant="primary" size="md" onClick={() => navigate('/guide')}>
                Read the guide
                <IconArrowRight size={15} />
              </Button>
              <Button variant="ghost" size="md" onClick={onDismiss}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

/* ── Mission progress ────────────────────────────────────────────────────── */

function MissionProgress({
  readiness,
  tracks,
}: {
  readiness: number
  tracks: Record<TrackId, number>
}) {
  return (
    <Card className="mission" index={0}>
      <div className="spread">
        <span className="eyebrow">Your Mission Progress</span>
        <span className="eyebrow-dim">Overall Readiness</span>
      </div>

      <div className="mission__body">
        <div className="mission__rows">
          {TRACK_ORDER.map((id) => {
            const Icon = LAYER_ICON[id]
            return (
              <button
                key={id}
                className="mrow"
                onClick={() => navigate(`/${id}`)}
                type="button"
                aria-label={`${TRACKS[id].title} — ${Math.round(tracks[id] * 100)} percent`}
              >
                <Tile size={44} color={TRACKS[id].accent}>
                  <Icon size={19} />
                </Tile>
                <div className="grow">
                  <div className="mrow__label">{TRACKS[id].title}</div>
                  <Bar value={tracks[id]} height={5} />
                </div>
                <span className="mrow__pct">{Math.round(tracks[id] * 100)}%</span>
              </button>
            )
          })}
        </div>

        <div className="mission__ring">
          <Ring value={readiness} size={56} thickness={6} fontSize={17} />
        </div>
      </div>
    </Card>
  )
}

/* ── Domain card ─────────────────────────────────────────────────────────── */

function DomainCard({
  id,
  progress,
  index,
  state,
}: {
  id: TrackId
  progress: number
  index: number
  state: LearnerState
}) {
  const t = TRACKS[id]
  const Icon = LAYER_ICON[id]
  const layer = layerOf(id)
  const mods = AI_CURRICULUM_API.byLayer(layer)
  const pct = Math.round(progress * 100)
  const done = mods.filter((m) => isPassed(state, m.id)).length
  const open = mods.some((m) => isUnlocked(state, m.id))
  // The next thing to actually do in this layer, so Continue continues.
  const next = mods.find((m) => isUnlocked(state, m.id) && !isPassed(state, m.id))
  const fg = hardGate(state)

  return (
    <Card className="dcard" interactive accent={t.accent} index={index}>
      <div className="dcard__body">
        <Tile size={52} radius={14} lit={progress > 0}>
          <Icon size={24} />
        </Tile>

        <div className="dcard__text">
          <h2 className="dcard__title">{t.title}</h2>
          <p className="dcard__blurb">
            {t.blurb}
            {isHardGated(layer) && !fg.open ? (
              <strong style={{ color: '#ff9a8a' }}>
                {' '}
                Behind the hard gate — four conditions that do not open by working harder ({fg.done} of{' '}
                {fg.total} done, listed on the Learning page).
              </strong>
            ) : null}
          </p>
          <Bullets
            items={mods.map((m) => ({
              label: m.title,
              done: isPassed(state, m.id),
              active: isUnlocked(state, m.id) && !isPassed(state, m.id),
            }))}
          />
        </div>

        <div className="dcard__thumb">
          <LayerArt layer={layer} setup={state.setup} />
        </div>
      </div>

      <div className="dcard__foot">
        <Button
          variant="outline"
          size="md"
          onClick={() => navigate(next ? `/module/${next.id}` : `/${id}`)}
          aria-label={next ? `Continue ${t.title} with ${next.id}` : `View ${t.title}`}
        >
          {next ? 'Continue' : open ? 'View' : 'View'}
          <IconArrowRight size={15} />
        </Button>

        <div className="dcard__prog">
          <div className="dcard__pct">
            {pct}% of these hours · {done} of {mods.length} passed
          </div>
          <Bar value={progress} height={5} />
        </div>
      </div>
    </Card>
  )
}

/* ── Quote plates ────────────────────────────────────────────────────────── */

function QuotePlate() {
  return (
    <Card className="quote" index={0}>
      <PlanetPlate className="quote__art" seed="quote-top" />
      <div className="quote__scrim" />
      <div className="quote__inner">
        <p className="quote__text">“A gate with no referee is decorative.”</p>
        <div className="quote__by">— the creed</div>
      </div>
    </Card>
  )
}

function ClosingPlate() {
  return (
    <Card className="quote quote--closing" index={5}>
      <PlanetPlate className="quote__art" tone="violet" flip seed="quote-bottom" />
      <div className="quote__scrim" />
      <div className="quote__inner">
        <p className="quote__text">
          You are not preparing for a job.
          <span className="quote__emph">You are preparing to be hired.</span>
        </p>
      </div>
      <Logomark size={46} className="quote__mark" />
    </Card>
  )
}

/* ── Today's focus ───────────────────────────────────────────────────────── */

function TodaysFocus({
  plan,
  date,
  onToggle,
}: {
  plan: ReturnType<typeof dailyPlan>
  date: Date
  onToggle: (taskId: string) => void
}) {
  return (
    <Card index={1}>
      <CardHead
        icon={<IconCalendar size={15} />}
        title="Today's Focus"
        right={
          <span className="eyebrow-dim" style={{ letterSpacing: '0.05em' }}>
            {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        }
        divided
      />

      <FocusNotes />

      {plan.length === 0 ? (
        <div style={{ padding: '22px 17px', fontSize: 12, color: 'var(--ink-4)', lineHeight: 1.6 }}>
          Nothing open. Every remaining module depends on one you have not passed yet — the ladder on
          the Learning page shows which.
        </div>
      ) : (
        plan.slice(0, 5).map((task) => (
          <div className="focus__row" key={task.id} data-done={task.done}>
            <Check
              checked={task.done}
              onChange={() => onToggle(task.id)}
              size={15}
              label={task.title}
            />
            <a className="grow" href={task.href} style={{ minWidth: 0 }}>
              <div className="focus__title">{task.title}</div>
              <div className="focus__meta">
                {task.context} · {formatMinutes(task.minutes)}
              </div>
            </a>
          </div>
        ))
      )}

      <div className="focus__foot">
        <Button variant="block" size="md" onClick={() => navigate('/learning')}>
          See all {AI_CURRICULUM.length} modules
          <IconArrowRight size={15} />
        </Button>
      </div>
    </Card>
  )
}

function formatMinutes(m: number): string {
  if (m < 60) return `${Math.round(m)}m`
  const h = Math.floor(m / 60)
  const r = Math.round(m % 60)
  return r === 0 ? `${h}h` : `${h}h ${r}m`
}


/* ── Quick tools ─────────────────────────────────────────────────────────── */

const TOOLS: { icon: (p: IconProps) => ReactNode; title: string; sub: string; href: string }[] = [
  { icon: IconCalendar, title: 'The Plan', sub: 'Runway, hours, which program', href: '#/plan' },
  { icon: IconRefresh, title: 'Parallel tracks', sub: 'The ten continuous habits', href: '#/tracks' },
  { icon: IconTerminal, title: 'Code Playground', sub: 'Run JavaScript, Python and SQL in the browser', href: '#/playground' },
  { icon: IconRecall, title: 'Review Session', sub: 'Clear the words scheduled today', href: '#/review' },
  { icon: IconWave, title: 'Forgetting Curve', sub: 'What you will still know in a year', href: '#/progress' },
  { icon: IconDatabase, title: 'Backup & Restore', sub: 'Export or import your progress', href: '#/settings' },
]

function QuickTools() {
  return (
    <Card className="tools" index={3}>
      <CardHead icon={<IconTarget size={15} />} title="Quick Tools" divided />
      {TOOLS.map((t) => {
        const Icon = t.icon
        return (
          <RowItem
            key={t.title}
            icon={
              <Tile size={36} radius={9}>
                <Icon size={17} />
              </Tile>
            }
            title={t.title}
            sub={t.sub}
            chevron
            onClick={() => navigate(t.href.replace('#', ''))}
          />
        )
      })}
    </Card>
  )
}

/* ── Resources ───────────────────────────────────────────────────────────── */

const RESOURCES: { icon: (p: IconProps) => ReactNode; label: string; href: string }[] = [
  { icon: IconDoc, label: 'The ladder — all 33 modules', href: '#/learning' },
  { icon: IconShield, label: 'The hard gate — Layer 3 to Layer 4', href: '#/learning?show=gate' },
  { icon: IconCompass, label: 'The five rules, and how to read this', href: '#/guide' },
  { icon: IconBook, label: 'Glossary, the cut list, the honest limit', href: '#/resources' },
  { icon: IconBars, label: 'How this app schedules your words', href: '#/progress' },
]

function Resources() {
  return (
    <Card index={4}>
      <CardHead icon={<IconBook size={15} />} title="Resources" divided />
      <div className="res__list">
        {RESOURCES.map((r) => {
          const Icon = r.icon
          return (
            <button
              key={r.label}
              className="res__row"
              onClick={() => navigate(r.href.replace('#', ''))}
              type="button"
            >
              <Icon size={13} />
              <span className="grow truncate">{r.label}</span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

/* ── Foot note ───────────────────────────────────────────────────────────── */

function FootNote({ modules, passed }: { modules: number; passed: number }) {
  return (
    <p
      style={{
        marginTop: 22,
        fontSize: 11,
        color: 'var(--ink-5)',
        textAlign: 'center',
        lineHeight: 1.7,
      }}
    >
      {passed} of {modules} modules passed · everything runs and is stored on this device ·{' '}
      <a href="#/settings" style={{ color: 'var(--ink-4)', textDecoration: 'underline' }}>
        export a backup
      </a>
    </p>
  )
}

function countPassed(mastery: Map<string, number>): number {
  let n = 0
  for (const [k, v] of mastery) if (!k.startsWith('__') && v >= 0.9) n += 1
  return n
}

/* ── The realm's notes over the focus list ───────────────────────────────── */

/**
 * On day one every surface a reader meets is about planning, and nothing
 * tells them where code starts; say it before they conclude the whole program
 * is spreadsheets. At the hard gate, say what "next" means when the ladder
 * stops moving. At the end, say what is left.
 */
function FocusNotes() {
  const { state } = useLearner()
  const p = progressOf(state)
  const sum = AI_CURRICULUM_API.progressSummary(p)
  const fg = AI_CURRICULUM_API.flagshipGate(p)
  const finished = sum.modulesDone === sum.modulesTotal
  const l03 = AI_CURRICULUM.filter((m) => m.layer <= 3).every((m) => isPassed(state, m.id))
  const later = AI_CURRICULUM_API.available(p).filter((m) => m.trigger)
  const never = neverCodedNote()
  return (
    <>
      {!sum.modulesDone ? (
        <div className="focus__note">
          <strong>{never.head}</strong> {never.body}
        </div>
      ) : null}
      {finished ? (
        <div className="focus__note">
          {FINISHED_NOTE[0]} {FINISHED_NOTE[1]}
        </div>
      ) : null}
      {l03 && !fg.open && !finished ? (
        <div className="focus__note">
          <strong>What that means today.</strong> {HARD_GATE_TODAY}
        </div>
      ) : null}
      {later.length ? (
        <div className="focus__note focus__note--dim">
          <strong>Open, but with a note about when:</strong>{' '}
          {later.map((m) => `${m.title} (${whenTag(m).toLowerCase()})`).join(', ')} — each one says inside when
          to start it.
        </div>
      ) : null}
    </>
  )
}

/** The realm's "By the numbers", row for row. */
function numbers(state: LearnerState): [string, string][] {
  const p = progressOf(state)
  const sum = AI_CURRICULUM_API.progressSummary(p)
  const pl = AI_CURRICULUM_API.plan(state.setup)
  const cp = AI_CURRICULUM.reduce(
    (a, m) => {
      const c = cpCount(state, m.id)
      return { done: a.done + c.done, total: a.total + c.total }
    },
    { done: 0, total: 0 },
  )
  const chain = AI_CURRICULUM_API.criticalPath()
  return [
    ['Modules passed', `${sum.modulesDone} / ${sum.modulesTotal}`],
    ['Module hours', `${sum.hoursDone} / ${sum.hoursTotal}`],
    ['With the tracks', `${AI_CURRICULUM_API.totalHours().total}h`],
    ['Checkpoints ticked', `${cp.done} / ${cp.total}`],
    ['Artifacts built', String(sum.artifactsDone)],
    ['Deltas written', String(sum.deltasDone)],
    ['Longest chain', `${chain.path.length} modules · ${chain.hours}h`],
    ['That chain', chainText()],
    [
      'Your plan',
      pl.recommend === 'unset'
        ? 'not set'
        : pl.recommend === 'spine' || pl.recommend === 'spine-plus-contract'
          ? 'Compressed Spine'
          : pl.recommend === 'full-tight'
            ? 'Full program, tight'
            : 'Full program',
    ],
  ]
}

/* ── Pick up where you left off ──────────────────────────────────────────── */

/**
 * The single most important control on this page for someone who struggles to
 * start. Opening the app and facing a dashboard is a decision; opening it and
 * finding one button that says "keep reading Kepler's laws, you were 60%
 * through" is not. It appears only when there is somewhere real to go back to,
 * and it can be dismissed when she would rather choose for herself.
 */
function ResumeCard({ point, onDismiss }: { point?: ResumePoint; onDismiss: () => void }) {
  if (!point) return null

  const pct = point.progress !== undefined ? Math.round(point.progress * 100) : null
  const verb = point.kind === 'lesson' ? 'Keep reading' : point.kind === 'video' ? 'Keep watching' : 'Pick up'

  return (
    <section className="card resume-card">
      <div className="resume-card__body">
        <p className="eyebrow-dim">{whenWord(point.at)}</p>
        <h2 className="resume-card__title">{point.label}</h2>
        {point.detail ? <p className="resume-card__detail">{point.detail}</p> : null}
        {pct !== null && pct > 2 ? (
          <div className="resume-card__bar" aria-hidden="true">
            <span style={{ width: `${Math.min(100, pct)}%` }} />
          </div>
        ) : null}
      </div>
      <div className="resume-card__actions">
        <button className="btn btn--primary" onClick={() => navigate(point.path)} type="button">
          {verb}
          {pct !== null && pct > 2 ? ` · ${pct}%` : ''}
        </button>
        <button className="btn btn--quiet btn--sm" onClick={onDismiss} type="button">
          Not now
        </button>
      </div>
    </section>
  )
}

/** "Yesterday", "3 days ago" — vaguer the further back, and never a scolding. */
function whenWord(iso: string): string {
  const then = new Date(iso).getTime()
  if (!Number.isFinite(then)) return 'Where you left off'
  const days = Math.floor((Date.now() - then) / 86_400_000)
  if (days <= 0) return 'Where you left off'
  if (days === 1) return 'Where you left off yesterday'
  if (days < 7) return `Where you left off ${days} days ago`
  return 'Where you left off'
}

/* ── Start a block ───────────────────────────────────────────────────────────
   The single most important control on the page, and the only one that is not
   a choice. Everything else on Home is information; this is the thing to press
   when she does not want to read any of it. It sits directly under the hero so
   that on a bad day the first thing she sees is one button with one sentence
   under it, and she never has to scroll into the menu at all. */

function StartBlock() {
  const { state, dag, setState } = useLearner()
  const pick = useMemo(() => nextUp(state, dag), [state, dag])

  if (state.focus) {
    return (
      <Card className="startblock" index={0}>
        <div className="startblock__body">
          <div className="startblock__text">
            <div className="startblock__kicker">Block running</div>
            <div className="startblock__title">{state.focus.pick.title}</div>
          </div>
          <Button variant="primary" size="md" onClick={() => navigate(state.focus!.pick.href)}>
            Back to it
            <IconArrowRight size={15} />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="startblock" index={0}>
      <div className="startblock__body">
        <div className="startblock__text">
          <div className="startblock__kicker">Start here</div>
          <div className="startblock__title">{pick.title}</div>
          <p className="startblock__why">{pick.why}</p>
        </div>
        <div className="startblock__acts">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setState((s) => startFocus(s, pick, DEFAULT_BLOCK))
              navigate(pick.href)
            }}
          >
            <IconClock size={14} /> Start {DEFAULT_BLOCK} minutes
          </Button>
          <button className="startblock__alt" onClick={() => navigate('/focus')}>
            Longer, or something else
          </button>
        </div>
      </div>
    </Card>
  )
}
