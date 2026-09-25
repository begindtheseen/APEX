/* ============================================================================
   LAUNCHPAD — field manual (ORBIT's guide)
   ----------------------------------------------------------------------------
   The one page that explains the product to someone who has just opened it:
   what LAUNCHPAD is, where to start, how a module is worked, what a claim and
   a gate are, how a recall session is graded, and what the numbers mean — and
   then the curriculum's own opening chapters, the honest numbers, the six
   bets, the five rules and how it is meant to be read, straight from the
   document at the repository root.

   Every figure on this page is read from the curriculum and the engine at
   render time, so the copy cannot drift from the code it describes. Opening
   the page also retires the first-run welcome card on the dashboard.
   ========================================================================== */
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  IconArrowRight,
  IconBars,
  IconBook,
  IconBulb,
  IconCalendar,
  IconClock,
  IconCompass,
  IconDoc,
  IconGear,
  IconGrid,
  IconInfo,
  IconRecall,
  IconRefresh,
  IconRoute,
  IconShield,
  IconTerminal,
  type IconProps,
} from '@/components/icons'
import { phaseFor, type Phase } from '@/components/layout/Shell'
import { LAYER_ICON } from '@/components/layerIcons'
import { Button, Card, Chip, Stat, Tile, prefersReducedMotion } from '@/components/ui'
import { TRACKS, TRACK_ORDER, corpusStats } from '@/curriculum'
import { AI_COMPRESSED_SPINE, AI_CURRICULUM_API, AI_TRACKS } from '@/curriculum/generated/launchpad-data'
import type { LpDocSection } from '@/curriculum/generated/launchpad-doc'
import { setOnboarded } from '@/engine/apply'
import { isPassed, progressOf } from '@/engine/claims'
import { rankFrontier } from '@/engine/scheduler'
import { minutesThisWeek, streak } from '@/engine/state'
import { useLearner } from '@/hooks/useLearner'
import { Markdown } from '@/lib/markdown'
import { navigate } from '@/lib/router'
import './pages.css'
import './guide.css'

/* ── Sections ────────────────────────────────────────────────────────────── */

interface SectionDef {
  id: string
  /** Short form for the index at the top. */
  label: string
  title: string
  Icon: (p: IconProps) => ReactNode
}

const WHAT: SectionDef = { id: 'what', label: 'What it is', title: 'What LAUNCHPAD is', Icon: IconBulb }
const START: SectionDef = { id: 'start', label: 'Where to start', title: 'Where to start', Icon: IconRoute }
const MODULE: SectionDef = {
  id: 'module',
  label: 'Inside a module',
  title: 'Inside a module: Learn → Build → Recall',
  Icon: IconBook,
}
const GATES: SectionDef = {
  id: 'gates',
  label: 'Claims & gates',
  title: 'Claims, gates and unlocking',
  Icon: IconShield,
}
const RECALL: SectionDef = { id: 'recall', label: 'Recall sessions', title: 'Recall sessions', Icon: IconRecall }
const DAY: SectionDef = { id: 'day', label: 'Your day', title: 'Your day', Icon: IconCalendar }
const BLOCK: SectionDef = {
  id: 'block',
  label: 'Focus blocks',
  title: 'Focus blocks, for the days you do not want to',
  Icon: IconClock,
}
const PRACTICE: SectionDef = {
  id: 'practice',
  label: 'Playground',
  title: 'The playground',
  Icon: IconTerminal,
}
const PAGES: SectionDef = { id: 'pages', label: 'Other pages', title: 'The other pages', Icon: IconGrid }
const DOC: SectionDef = {
  id: 'doc',
  label: 'The curriculum, first pages',
  title: 'From the curriculum: before you start',
  Icon: IconDoc,
}
const FAQ: SectionDef = { id: 'faq', label: 'Questions', title: 'Questions people ask', Icon: IconInfo }

const SECTIONS: SectionDef[] = [WHAT, START, MODULE, GATES, RECALL, DAY, BLOCK, PRACTICE, PAGES, DOC, FAQ]

/** The document's opening chapters, in the order it gives them. */
const DOC_IDS = [
  'the-honest-numbers',
  'the-six-bets-this-curriculum-is-making',
  'the-five-rules',
  'flow-how-this-is-meant-to-be-read',
]

const anchorId = (id: string) => `guide-${id}`
const titleId = (id: string) => `guide-${id}-title`

const pct = (v: number) => `${Math.round(v * 100)}%`

/**
 * The readiness at which the top bar first shows `phase`, found by scanning
 * `phaseFor` in 1% steps. Reading the thresholds back out of the function that
 * owns them keeps this page from ever disagreeing with the bar.
 */
function phaseFloor(phase: Phase): number {
  for (let i = 0; i <= 100; i++) if (phaseFor(i / 100) === phase) return i / 100
  return 1
}

/* ── The page ────────────────────────────────────────────────────────────── */

export function Guide() {
  const { state, dag, mastery, readiness, setState } = useLearner()
  const now = useMemo(() => new Date(), [])
  const [doc, setDoc] = useState<LpDocSection[] | null>(null)

  // Opening the guide is the strongest possible signal that the welcome card
  // has done its job. Guarded so an already-onboarded learner costs no write.
  const onboarded = state.settings.onboarded
  useEffect(() => {
    if (!onboarded) setState((s) => setOnboarded(s))
  }, [onboarded, setState])

  useEffect(() => {
    let alive = true
    void import('@/curriculum/generated/launchpad-doc').then((m) => {
      if (alive) setDoc(m.LAUNCHPAD_DOC)
    })
    return () => {
      alive = false
    }
  }, [])

  const stats = useMemo(() => corpusStats(), [])
  const totals = AI_CURRICULUM_API.totalHours()
  const chain = AI_CURRICULUM_API.criticalPath()
  const summary = AI_CURRICULUM_API.progressSummary(progressOf(state))

  const ranked = useMemo(() => rankFrontier(state, dag, mastery, now), [state, dag, mastery, now])
  const next = ranked[0]

  const phase = phaseFor(readiness)
  const phases = useMemo(
    () => [
      { id: 'prepare' as Phase, label: 'Prepare', from: phaseFloor('prepare'), to: phaseFloor('build') },
      { id: 'build' as Phase, label: 'Build', from: phaseFloor('build'), to: phaseFloor('launch') },
      { id: 'launch' as Phase, label: 'Launch', from: phaseFloor('launch'), to: 1 },
    ],
    [],
  )

  const days = streak(state, now)
  const weekMinutes = Math.round(minutesThisWeek(state, now))
  const retention = pct(state.settings.desiredRetention)

  const jump = useCallback(
    (id: string) => {
      const el = document.getElementById(anchorId(id))
      if (!el) return
      const instant = prefersReducedMotion() || state.settings.reduceMotion
      el.scrollIntoView({ block: 'start', behavior: instant ? 'auto' : 'smooth' })
      el.focus({ preventScroll: true })
    },
    [state.settings.reduceMotion],
  )

  return (
    <div className="page page--padtop guide">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker">
            <IconCompass size={13} />
            Field manual · 15-minute read
          </div>
          <h1 className="h-page">How to use LAUNCHPAD</h1>
          <p className="page-head__sub">
            Where to start, how a module is worked, what a claim and a gate are, what the grades and
            percentages mean, and how to keep your progress safe — then the curriculum&rsquo;s own
            first pages. Everything here is read from the curriculum and the engine as you look at it.
          </p>
        </div>
      </div>

      <Card index={0} style={{ marginBottom: 'var(--gap)' }}>
        <nav className="guide-index" aria-label="Sections of this guide">
          {SECTIONS.map((s, i) => (
            <button key={s.id} className="guide-index__item" onClick={() => jump(s.id)} type="button">
              <span className="guide-index__n">{i + 1}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </Card>

      <div className="stack">
        {/* ── 1. What LAUNCHPAD is ────────────────────────────────────────── */}
        <Section def={WHAT} index={1}>
          <div className="sect guide-prose">
            <p>
              LAUNCHPAD is a curriculum for becoming a hireable remote AI product engineer, from an empty
              file to hired: <strong>{stats.modules} modules</strong> on nine layers, arranged as a
              dependency graph, each one ending in something you built and can explain out loud, and in a
              gate — a named person who checks it and says yes. Beside the modules run{' '}
              <strong>{AI_TRACKS.length} parallel tracks</strong>, the continuous habits — the job search,
              open-source contributions, the weekly cold rebuild — whose hours are in the total because
              they are real work.
            </p>
            <p>
              It runs on ORBIT&rsquo;s learning engine. Each module&rsquo;s prose, from the curriculum
              document, is its lessons; its words are flashcards that a fitted memory model schedules so
              they stay learned; and its artifact, checkpoints and gate are the record you keep of the work.
              That record — not a quiz score — is what opens the next module, because the curriculum&rsquo;s
              first rule is that you advance by shipping a working thing, not by reading.
            </p>
          </div>
          <div className="sect">
            <div className="guide-facts">
              <Stat value={stats.modules} label="Modules" />
              <Stat value={stats.lessons} label="Lessons" />
              <Stat value={stats.cards.toLocaleString('en-US')} label="Words" />
              <Stat value={`${totals.modules.toLocaleString('en-US')}h`} label="Module hours" />
              <Stat value={`${totals.tracks}h`} label="Track hours" />
              <Stat value={`${chain.hours}h`} label="Longest chain" delta={`${chain.path.length} modules`} deltaTone="muted" />
            </div>
          </div>
        </Section>

        {/* ── 2. Where to start ───────────────────────────────────────────── */}
        <Section def={START} index={2}>
          <div className="sect">
            <div className="guide-paths">
              <div className="guide-path" data-recommended="true">
                <Tile size={34} radius={9} color={TRACKS.contract.accent}>
                  <IconDoc size={16} />
                </Tile>
                <div className="guide-path__title">Never written code</div>
                <p className="guide-path__body">
                  Start at <strong>M0, The Contract Page</strong>. It has no code in it: twelve hours of
                  writing one page about money, time and people, because how many months you can pay your
                  bills decides what you can finish. Code starts in M1, from an empty file.
                </p>
                <Button variant="primary" size="sm" onClick={() => navigate('/module/M0')}>
                  Open M0
                  <IconArrowRight size={13} />
                </Button>
              </div>

              <div className="guide-path">
                <Tile size={34} radius={9} color="var(--accent)">
                  <IconCalendar size={16} />
                </Tile>
                <div className="guide-path__title">Short on runway</div>
                <p className="guide-path__body">
                  Put your two numbers into <strong>The Plan</strong>: months you can go without a
                  paycheck, and hours a week you can truly give. If the full program does not fit, it
                  says so and names the Compressed Spine — {AI_COMPRESSED_SPINE.length} modules — and what
                  it costs.
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate('/plan')}>
                  Open The Plan
                  <IconArrowRight size={13} />
                </Button>
              </div>

              <div className="guide-path">
                <Tile size={34} radius={9} color={TRACKS.machine.accent}>
                  <IconBook size={16} />
                </Tile>
                <div className="guide-path__title">Already writing code</div>
                <p className="guide-path__body">
                  The ladder still starts at M0 — every gate names a person, and M0 is where you recruit
                  them — but you will move through the early modules faster. The Learning page shows the
                  whole ladder and what is open now.
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate('/learning')}>
                  Open the ladder
                  <IconArrowRight size={13} />
                </Button>
              </div>
            </div>
          </div>

          <div className="sect">
            <div className="sect__title">The nine layers</div>
            {TRACK_ORDER.map((t) => {
              const Icon = LAYER_ICON[t]
              return (
                <button key={t} className="guide-row" onClick={() => navigate(`/${t}`)} type="button">
                  <Tile size={30} radius={8} color={TRACKS[t].accent}>
                    <Icon size={14} />
                  </Tile>
                  <div className="grow">
                    <div className="guide-row__title">
                      <span>{TRACKS[t].title}</span>
                    </div>
                    <div className="guide-row__meta">{TRACKS[t].blurb}</div>
                  </div>
                  <IconArrowRight size={14} className="guide-row__chev" />
                </button>
              )
            })}
          </div>

          {next ? (
            <div className="sect">
              <div className="sect__title">Open to you now</div>
              <button className="guide-row guide-row--next" onClick={() => navigate(`/module/${next.module.id}`)} type="button">
                <Tile size={38} radius={10} color={TRACKS[next.module.track].accent} lit>
                  <IconRoute size={17} />
                </Tile>
                <div className="grow">
                  <div className="guide-row__title">
                    <span>
                      {next.module.id} · {next.module.title}
                    </span>
                    {next.reasons[0] ? <Chip ghost>{next.reasons[0]}</Chip> : null}
                  </div>
                  <div className="guide-row__meta">
                    {TRACKS[next.module.track].title} · {next.module.hours}h
                  </div>
                </div>
                <IconArrowRight size={15} className="guide-row__chev" />
              </button>
              <p className="guide-note">
                A module is open when every module it depends on has passed its gate. The same list fills
                Today&rsquo;s Focus on the dashboard and Open now on the Learning page.
              </p>
            </div>
          ) : null}
        </Section>

        {/* ── 3. Inside a module ──────────────────────────────────────────── */}
        <Section def={MODULE} index={3}>
          <div className="sect">
            <ol className="guide-loop">
              <li className="guide-loop__step">
                <div className="guide-loop__head">
                  <span className="guide-loop__n">1</span>
                  <span className="guide-loop__label">Learn</span>
                </div>
                <p className="guide-loop__body">
                  Read the note at the top if there is one, then the <strong>Words</strong> — every term
                  the page uses, defined before it is used. Then the lessons: the module as the curriculum
                  document writes it. Then what you have to hold in your head, the pitfalls, and the
                  mechanism figure.
                </p>
              </li>
              <li className="guide-loop__step">
                <div className="guide-loop__head">
                  <span className="guide-loop__n">2</span>
                  <span className="guide-loop__label">Build</span>
                </div>
                <p className="guide-loop__body">
                  Write the delta — where the official documentation proved you wrong. Tick each
                  checkpoint as you finish it. Claim the artifact once they are all ticked, then the gate
                  once a referee has said yes.
                </p>
              </li>
              <li className="guide-loop__step">
                <div className="guide-loop__head">
                  <span className="guide-loop__n">3</span>
                  <span className="guide-loop__label">Recall</span>
                </div>
                <p className="guide-loop__body">
                  The module&rsquo;s words, run as a spaced-repetition session.{' '}
                  <strong>Start recall</strong> begins the first; from then on the scheduler decides when
                  each word comes back.
                </p>
              </li>
            </ol>
          </div>

          <div className="sect guide-prose">
            <p>
              <strong>Why this order.</strong> A reader with no background must never meet a term before
              its plain definition, so the words come first. The lessons are the curriculum&rsquo;s own
              prose for the module, split where the gate begins: what to understand and what to build,
              then the gate and what most people get wrong. Every lesson marks itself read as you go, and
              the last one marks the module studied.
            </p>
            <p>
              <strong>Mark as studied</strong> is a progress marker for the Learn step, not a claim: the
              page records the date and moves you on to Build. A module page opens on whichever step is
              next for you — Learn until you have read it or written the delta, Build while there is
              something left to claim, Recall whenever words are due.
            </p>
          </div>
        </Section>

        {/* ── 4. Claims and gates ─────────────────────────────────────────── */}
        <Section def={GATES} index={4}>
          <div className="sect guide-prose">
            <p>
              Every module keeps a record of four things you claim, in order:{' '}
              <strong>delta written</strong>, each <strong>checkpoint</strong> ticked,{' '}
              <strong>artifact built</strong>, <strong>gate passed</strong>. The checkpoints open once the
              delta is written; the artifact waits for every checkpoint; the gate waits for the artifact.
              Un-ticking one un-ticks everything after it — here, and in every module that depended on
              this one — and the page tells you exactly what will clear before it does.
            </p>
            <p>
              <strong>A module opens when every module it depends on has passed its gate.</strong> A
              locked module can still be opened and read in full — reading ahead is fine — but nothing on
              it can be claimed. Layers 4 to 6 have one more lock, the <strong>hard gate</strong>: four
              conditions about the live flagship that do not open by working harder, ticked on the
              Learning page.
            </p>
            <p>
              <strong>Ticking a gate does not pass it.</strong> It records that a named referee passed
              you. Write who, the date, and one line of what they said in your own notes beside it. The
              record is worth exactly what your honesty is worth, and nobody else can audit it.
            </p>
          </div>
          <div className="sect">
            <div className="guide-kv">
              <div className="guide-kv__item">
                <div className="guide-kv__v">
                  {summary.modulesDone}/{summary.modulesTotal}
                </div>
                <div className="guide-kv__k">Modules passed</div>
                <div className="guide-kv__note">Gates a referee has said yes to.</div>
              </div>
              <div className="guide-kv__item">
                <div className="guide-kv__v">{pct(readiness)}</div>
                <div className="guide-kv__k">Your readiness</div>
                <div className="guide-kv__note">
                  The ring on the dashboard: the share of module hours whose gate has passed. The layer bars
                  are the same, layer by layer.
                </div>
              </div>
              <div className="guide-kv__item">
                <div className="guide-kv__v">{isPassed(state, 'M0') ? 'Passed' : 'Not yet'}</div>
                <div className="guide-kv__k">M0</div>
                <div className="guide-kv__note">The one module every other one waits on.</div>
              </div>
            </div>
          </div>
          <div className="sect">
            <div className="sect__title">Mission phase, from the top bar</div>
            <div className="guide-phases">
              {phases.map((p) => (
                <div key={p.id} className="guide-phase" data-on={p.id === phase}>
                  <div className="guide-phase__label">{p.label}</div>
                  <div className="guide-phase__range">
                    {p.to >= 1 ? `${pct(p.from)} and up` : `${pct(p.from)} – ${Math.round(p.to * 100) - 1}%`}
                  </div>
                  <div className="guide-phase__body">
                    {p.id === 'prepare'
                      ? 'The contract, the machine and the first craft: the foundations everything rests on.'
                      : p.id === 'build'
                        ? 'The AI production core and beyond are open and filling in.'
                        : 'Consolidating, and turning towards the market and the job itself.'}
                    {p.id === phase ? ' You are here.' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 5. Recall sessions ──────────────────────────────────────────── */}
        <Section def={RECALL} index={5}>
          <div className="sect">
            <ol className="guide-flow" aria-label="One item in a recall session">
              <li>Term</li>
              <li>
                Confidence <span className="guide-flow__opt">optional</span>
              </li>
              <li>Reveal</li>
              <li>Grade</li>
            </ol>
            <div className="guide-prose" style={{ marginTop: 14 }}>
              <p>
                A session is a run of up to 30 words. You read the term, say what it means, optionally rate
                how sure you are, press <strong>Show answer</strong>, and grade what happened against the
                module&rsquo;s own definition. Confidence is asked before the reveal because afterwards it is
                contaminated by knowing the answer; it feeds the calibration chart on Progress and can be
                switched off in Settings. There is no multiple choice anywhere: recognising an answer
                survives long after producing it is gone.
              </p>
            </div>
          </div>

          <div className="sect">
            <div className="sect__title">The four grades</div>
            <div className="guide-grades">
              <div className="guide-grade guide-grade--again">
                <span className="guide-grade__key">1</span>
                <div className="guide-grade__label">Again</div>
                <p className="guide-grade__body">
                  You did not get it. The word comes back within minutes, its stability drops, and the lapse
                  is recorded. This is data, not failure.
                </p>
              </div>
              <div className="guide-grade guide-grade--hard">
                <span className="guide-grade__key">2</span>
                <div className="guide-grade__label">Hard</div>
                <p className="guide-grade__body">
                  You got there, slowly or shakily. It counts as a recall; the interval grows, but less than
                  it would for Good.
                </p>
              </div>
              <div className="guide-grade guide-grade--good">
                <span className="guide-grade__key">3</span>
                <div className="guide-grade__label">Good</div>
                <p className="guide-grade__body">
                  You recalled it with normal effort. The default grade — and the one that Space or Enter
                  gives after a reveal.
                </p>
              </div>
              <div className="guide-grade guide-grade--easy">
                <span className="guide-grade__key">4</span>
                <div className="guide-grade__label">Easy</div>
                <p className="guide-grade__body">
                  Instant and certain. The interval grows the most. Use it sparingly; Good on something you
                  nearly forgot is worth more.
                </p>
              </div>
            </div>
            <p className="guide-note">
              Every grade button shows the interval it will set — 10m, 3d, 2mo — computed by running the
              scheduler without committing, so there are no hidden consequences.
            </p>
          </div>

          <div className="sect">
            <ul className="guide-list">
              <li>
                <span>
                  <strong>Keyboard.</strong> <Kbd>Space</Kbd> or <Kbd>Enter</Kbd> reveals; <Kbd>1</Kbd>{' '}
                  <Kbd>2</Kbd> <Kbd>3</Kbd> <Kbd>4</Kbd> grade; <Kbd>Space</Kbd> or <Kbd>Enter</Kbd> after
                  the reveal grades Good.
                </span>
              </li>
              <li>
                <span>
                  <strong>New and review.</strong> Due reviews come first, the ones closest to being
                  forgotten at the front; new words follow, a short run from one module at a time — the
                  modules open now, then the ones you have passed — up to your daily cap of{' '}
                  {state.goals.newPerDay}.
                </span>
              </li>
              <li>
                <span>
                  <strong>&ldquo;Nothing due right now&rdquo; is the scheduler working,</strong> not a bug.
                  Reviewing early buys almost nothing. Go and build something instead.
                </span>
              </li>
              <li>
                <span>
                  <strong>Retention target: {retention}.</strong> How much you want to still know when a word
                  comes due. Change it in Settings, where a target date also tightens intervals as the day
                  approaches.
                </span>
              </li>
              <li>
                <span>
                  <strong>Recall is not the Sweep.</strong> Track 10, the Sweep, is the curriculum&rsquo;s
                  own retrieval practice — five prompts from a module&rsquo;s concepts and pitfalls, written
                  from memory into a blank box. Recall keeps the vocabulary; the Sweep keeps the ideas. Do
                  both.
                </span>
              </li>
            </ul>
          </div>
        </Section>

        {/* ── 6. Your day ─────────────────────────────────────────────────── */}
        <Section def={DAY} index={6}>
          <div className="sect guide-prose">
            <p>
              The dashboard&rsquo;s <strong>Today&rsquo;s Focus</strong> is the list for the day: one review
              task whenever words are due, the hard gate when it is the next thing and nothing on the ladder
              moves it, then the modules open right now, in ladder order — leaving out the ones a date or an
              event starts, which are listed separately with when to begin. Tick them off as you go.
            </p>
          </div>
          <div className="sect">
            <div className="guide-kv">
              <div className="guide-kv__item">
                <div className="guide-kv__v">
                  {days} <span className="guide-kv__unit">day{days === 1 ? '' : 's'}</span>
                </div>
                <div className="guide-kv__k">Streak</div>
                <div className="guide-kv__note">
                  Consecutive days with any study. A day not yet done does not break it until tomorrow.
                </div>
              </div>
              <div className="guide-kv__item">
                <div className="guide-kv__v">
                  {weekMinutes} <span className="guide-kv__unit">/ {state.goals.weeklyMinutes} min</span>
                </div>
                <div className="guide-kv__k">This week</div>
                <div className="guide-kv__note">
                  Weekly rather than daily on purpose: one busy day should not turn a good week into a felt
                  failure.
                </div>
              </div>
              <div className="guide-kv__item">
                <div className="guide-kv__v">{state.goals.newPerDay}</div>
                <div className="guide-kv__k">New words per day</div>
                <div className="guide-kv__note">Every new word is a permanent review obligation.</div>
              </div>
            </div>
            <div className="guide-actions">
              <Button variant="outline" size="sm" onClick={() => navigate('/plan')}>
                The Plan
                <IconArrowRight size={13} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                Change goals
              </Button>
            </div>
          </div>
        </Section>

        {/* ── 7. Focus blocks ─────────────────────────────────────────────── */}
        <Section def={BLOCK} index={7}>
          <div className="sect guide-prose">
            <p>
              Choosing is the expensive part. Thirty-three modules, a review queue and a playground is a
              menu, and a menu at the end of a tired day is a reason to close the laptop. A focus block
              removes the menu. <strong>Start here</strong> on the dashboard picks one thing, says why it
              picked that one, and starts a fifteen-minute block on a single click.
            </p>
            <p>
              Fifteen minutes is the default because it is the smallest promise still worth keeping. It is
              also close to the curriculum&rsquo;s own bad-week minimum: the forty-five-minute cold rebuild
              and one commit. The timer follows you into the lesson; while it runs there is a box to{' '}
              <strong>park a thought</strong>, so an interruption has somewhere to go that is not stopping.
              Stopping early costs nothing.
            </p>
          </div>
        </Section>

        {/* ── 8. The playground ───────────────────────────────────────────── */}
        <Section def={PRACTICE} index={8}>
          <div className="sect guide-prose">
            <p>
              <strong>The playground</strong> is a scratchpad for the code the modules ask you to write.
              JavaScript runs for real in this browser&rsquo;s own engine, in a worker thrown away after
              each run, with top-level <code>await</code> and timers waited for — enough to take M3&rsquo;s
              event loop apart line by line. It is not Node: there is no <code>require</code>,{' '}
              <code>fs</code> or <code>process</code>, and the modules&rsquo; artifacts are built on your
              own machine. Python runs for real —{' '}
              <ExternalLink href="https://pyodide.org">CPython compiled to WebAssembly</ExternalLink> — for
              M24 and M25. SQL runs for real against{' '}
              <ExternalLink href="https://sql.js.org">SQLite compiled to WebAssembly</ExternalLink>; M5 is
              Postgres, and where the two differ, Postgres is the one that counts.
            </p>
            <p>
              The first run of Python or SQL downloads its runtime once from cdn.jsdelivr.net, and the
              browser caches it. Nothing you write leaves the device. Your code is saved as you type, per
              language; <strong>Reset</strong> restores the starter, and <Kbd>Ctrl</Kbd>+<Kbd>Enter</Kbd>{' '}
              runs.
            </p>
          </div>
        </Section>

        {/* ── 9. Other pages ──────────────────────────────────────────────── */}
        <Section def={PAGES} index={9}>
          <div className="sect" style={{ paddingTop: 6, paddingBottom: 6 }}>
            <PageRow
              icon={<IconBook size={17} />}
              title="Learning — the ladder"
              path="/learning"
              body={`All ${stats.modules} modules layer by layer, with the hard gate between Layers 3 and 4, and how the ladder works. Open now is what you can claim today (${ranked.length} modules right now), Pinned is your bookmarks, Gated is what is locked and why. Search covers titles, artifacts, concepts and lesson titles.`}
            />
            <PageRow
              icon={<IconCalendar size={17} />}
              title="The Plan"
              path="/plan"
              body="Runway and weekly hours in, the deadline and which program out — the full program or the Compressed Spine, with what the Spine costs and the cut order."
            />
            <PageRow
              icon={<IconRefresh size={17} />}
              title="Parallel tracks"
              path="/tracks"
              body={`The ${AI_TRACKS.length} continuous habits, each with its hours, its cadence and its rule, and what the Spine does to it.`}
            />
            <PageRow
              icon={<IconBars size={17} />}
              title="Progress"
              path="/progress"
              body="Everything the scheduler believes about your words, with its working shown: recall right now, what you will still know in a year, readiness over time, the review workload ahead, and your calibration."
            />
            <PageRow
              icon={<IconDoc size={17} />}
              title="Reference"
              path="/resources"
              body="The rest of the curriculum document: the build order, the parallel tracks priced, the cut list, what enough means, the glossary, learning on demand, the honest limit and currency."
            />
            <PageRow
              icon={<IconGear size={17} />}
              title="Settings"
              path="/settings"
              body="Backup comes first for a reason: everything is stored on this device only, so Export regularly and keep the file somewhere else. A backup from the old LAUNCHPAD realm restores here too. Then the retention target, the confidence prompt, interleaving and reduced motion; your goals; your display name."
              last
            />
          </div>
        </Section>

        {/* ── 10. The document's first pages ──────────────────────────────── */}
        <Section def={DOC} index={10}>
          {doc ? (
            DOC_IDS.map((id) => doc.find((d) => d.id === id))
              .filter((d): d is LpDocSection => !!d)
              .map((d) => (
                <div className="sect" key={d.id}>
                  <div className="sect__title">{d.title}</div>
                  <Markdown className="reader__md">{d.markdown}</Markdown>
                </div>
              ))
          ) : (
            <div className="sect guide-prose">
              <p>Loading…</p>
            </div>
          )}
        </Section>

        {/* ── 11. FAQ ─────────────────────────────────────────────────────── */}
        <Section def={FAQ} index={11}>
          <div className="sect">
            <div className="guide-faq">
              <Faq q="Why is there no quiz?">
                Because recognition memory survives long after recall is gone: a high multiple-choice score
                is compatible with total inability to produce the thing. This curriculum&rsquo;s unit is a
                module with an artifact and a gate. Recall drills the words as terms you have to define, and
                the gate is a person watching you do the work.
              </Faq>
              <Faq q="Can I skip ahead?">
                You can read ahead — every module opens, and its lessons, words and figure are all there.
                You cannot claim ahead: nothing on a module can be ticked until every module it depends on
                has passed its gate, and Layers 4 to 6 also wait on the hard gate.
              </Faq>
              <Faq q="How long does the whole thing take?">
                {totals.modules.toLocaleString('en-US')} module hours plus {totals.tracks} track hours —{' '}
                {totals.total.toLocaleString('en-US')} in all. The Plan turns that into months at your
                hours, and the longest chain of modules, {chain.hours}h, is the floor on time no number of
                hours a week can shorten.
              </Faq>
              <Faq q="What if I cannot find a referee?">
                Track 5 says what may stand in, once per attempt, and what it costs: the whole conversation
                is kept, failures included, and a failed stand-in review counts as a failed gate. M0 is where
                the three people — a code reviewer, someone who runs systems, and a mock interviewer — are
                recruited.
              </Faq>
              <Faq q="I used LAUNCHPAD before this version. Where is my progress?">
                Here. The first time this app opens on a device it reads the old realm&rsquo;s record —
                every delta, checkpoint, artifact and gate, the hard gate&rsquo;s ticks and your plan — and
                keeps writing it back in the same place, so the APEX launcher still shows your count. A backup
                file from the old realm restores in Settings.
              </Faq>
              <Faq q="Where is my data, and how do I not lose it?">
                On this device only, in the browser&rsquo;s storage for this site. There is no account, no
                sync and no server copy, so clearing site data erases everything. Settings → Export writes a
                single file with your whole record; keep it somewhere that is not this device, and refresh it
                regularly.
              </Faq>
            </div>
          </div>
        </Section>
      </div>

      <div className="guide-foot">
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate(next ? `/module/${next.module.id}` : '/learning')}
        >
          {next ? `Open ${next.module.title}` : 'Open the ladder'}
          <IconArrowRight size={15} />
        </Button>
        <Button variant="ghost" size="md" onClick={() => navigate('/')}>
          Back to dashboard
        </Button>
      </div>

      <p className="track-note">
        Everything on this page is read from the curriculum and the engine as it renders — the counts, the
        hours, your record and what is open to you — so it cannot drift from what the app actually does.
      </p>
    </div>
  )
}

/* ── Bits ────────────────────────────────────────────────────────────────── */

/**
 * A card with the standard header, but with a real heading element inside it
 * so the page can be navigated by heading.
 */
function Section({ def, index, children }: { def: SectionDef; index: number; children: ReactNode }) {
  return (
    <section className="guide-sect" id={anchorId(def.id)} tabIndex={-1} aria-labelledby={titleId(def.id)}>
      <Card index={Math.min(index, 4)}>
        <div className="card-head card-head--divided">
          <div className="card-head__title">
            <def.Icon size={15} />
            <h2 className="eyebrow guide-h2" id={titleId(def.id)}>
              {def.title}
            </h2>
          </div>
        </div>
        {children}
      </Card>
    </section>
  )
}

function PageRow({
  icon,
  title,
  body,
  path,
  last = false,
}: {
  icon: ReactNode
  title: string
  body: string
  path: string
  last?: boolean
}) {
  return (
    <button className="guide-page" data-last={last} onClick={() => navigate(path)} type="button">
      <Tile size={36} radius={9}>
        {icon}
      </Tile>
      <div className="grow">
        <div className="guide-page__title">{title}</div>
        <p className="guide-page__body">{body}</p>
      </div>
      <IconArrowRight size={14} className="guide-row__chev" />
    </button>
  )
}

function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <div className="guide-faq__item">
      <h3 className="guide-faq__q">{q}</h3>
      <p className="guide-faq__a">{children}</p>
    </div>
  )
}

function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="guide-kbd">{children}</kbd>
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  )
}

