/* ============================================================================
   LAUNCHPAD — the realm's own furniture, in ORBIT's materials
   ----------------------------------------------------------------------------
   The pieces ORBIT has no equivalent for, because ORBIT has no gates: a
   glossary row, a fact row, the three-step claim track, a tickable claim row,
   the hard gate, the mechanism figure. Each is built from ORBIT's cards,
   chips, tiles and tokens so it sits on an ORBIT page as if it were native.
   ========================================================================== */
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { IconArrowRight, IconBook, IconCheck, IconDoc, IconLock, IconShield } from '@/components/icons'
import { Card, CardHead, Chip, prefersReducedMotion } from '@/components/ui'
import { AI_CURRICULUM_API, LAUNCHPAD_RULES, type LpModule } from '@/curriculum/generated/launchpad-data'
import { hardGateText, howRows } from '@/curriculum/realm'
import { hardGate, isPassed, planFlag, type Claim } from '@/engine/claims'
import { useLearner } from '@/hooks/useLearner'
import { navigate } from '@/lib/router'
import './lp.css'

/** A term and its plain meaning. */
export function Gloss({ term, children }: { term: ReactNode; children: ReactNode }) {
  return (
    <div className="gloss">
      <div className="gloss__term">{term}</div>
      <div className="gloss__text">{children}</div>
    </div>
  )
}

/** One label and its value, on a single line. */
export function Fact({ k, v }: { k: ReactNode; v: ReactNode }) {
  return (
    <div className="fact">
      <span className="fact__k">{k}</span>
      <span className="fact__v">{v}</span>
    </div>
  )
}

/** A labelled band: the realm's READ THIS FIRST, STARTS BY DATE, LOCKED. */
export function Notice({
  label,
  tone = 'info',
  children,
  style,
}: {
  label: string
  tone?: 'info' | 'warn' | 'bad'
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div className="lp-notice" data-tone={tone} style={style}>
      <div className="lp-notice__label">{label}</div>
      <div className="lp-notice__body">{children}</div>
    </div>
  )
}

/**
 * Keeps the SVG clocks inside `ref` honest, as the realm did.
 *
 * An SVG animation runs whether or not anyone can see it, and display:none
 * saves the paint, not the timers. So every figure is paused while it is off
 * screen and started again when it comes back — and never started at all when
 * the reader has asked for reduced motion, in the system or in Settings.
 * Hiding the <animate> elements does not stop SMIL; pausing the clock does.
 */
export function useSvgClock(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const { state } = useLearner()
  const still = state.settings.reduceMotion || prefersReducedMotion()
  useEffect(() => {
    const host = ref.current
    if (!host) return
    const svgs = Array.from(host.querySelectorAll('svg')).filter((s) => typeof s.pauseAnimations === 'function')
    if (still || typeof IntersectionObserver === 'undefined') {
      for (const s of svgs) {
        s.pauseAnimations()
        if (still) s.setCurrentTime(0)
      }
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as SVGSVGElement
          if (e.isIntersecting) el.unpauseAnimations()
          else el.pauseAnimations()
        }
      },
      { rootMargin: '200px 0px' },
    )
    for (const s of svgs) {
      s.pauseAnimations()
      io.observe(s)
    }
    return () => {
      io.disconnect()
      // Leaving stops the clocks; coming back starts only what is on screen.
      for (const s of svgs) s.pauseAnimations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still, ...deps])
}

/**
 * A mechanism figure: an inline SVG from launchpadviz.js, built into the app at
 * build time from the repository, never from anything a user typed.
 */
export function Figure({ svg, label }: { svg: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const markup = svg.replace('<svg ', `<svg role="img" aria-label="${label.replace(/"/g, '&quot;')}" `)
  useSvgClock(ref, [markup])
  return <div className="lp-figure" ref={ref} dangerouslySetInnerHTML={{ __html: markup }} />
}

/** Delta written — Artifact built — Gate passed. */
export function ClaimTrack({ claim }: { claim: Claim }) {
  const steps: [keyof Claim, string][] = [
    ['delta', 'Delta written'],
    ['artifact', 'Artifact built'],
    ['gate', 'Gate passed'],
  ]
  return (
    <div className="claimtrack" aria-label="Claims on this module">
      {steps.map(([k, label], i) => (
        <span key={k} style={{ display: 'contents' }}>
          {i > 0 ? <span className="claimtrack__rule" /> : null}
          <span className="claimtrack__step" data-on={!!claim[k]}>
            <span className="claimtrack__dot" />
            {label}
          </span>
        </span>
      ))}
    </div>
  )
}

/**
 * A claim you tick: a delta, a checkpoint, an artifact, a gate, a hard-gate
 * condition. A checkbox to assistive technology; locked rows say so and do
 * nothing, which is the realm's rule that reading ahead is fine but claiming
 * is not.
 */
export function TickRow({
  on,
  locked = false,
  label,
  hint,
  mark,
  onToggle,
}: {
  on: boolean
  locked?: boolean
  label: ReactNode
  hint?: ReactNode
  /** What the box shows when unticked (a checkpoint number). */
  mark?: ReactNode
  onToggle: () => void
}) {
  const key = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (!locked) onToggle()
    }
  }
  return (
    <div
      className="tick"
      data-on={on}
      data-locked={locked}
      role="checkbox"
      aria-checked={on}
      aria-disabled={locked || undefined}
      tabIndex={locked ? -1 : 0}
      onClick={locked ? undefined : onToggle}
      onKeyDown={key}
    >
      <span className="tick__box">{on ? <IconCheck size={12} /> : mark ?? null}</span>
      <span className="grow" style={{ minWidth: 0 }}>
        <span className="tick__label">{label}</span>
        {hint ? <span className="tick__hint">{hint}</span> : null}
      </span>
    </div>
  )
}

/** A link row to a module, with a line under the title. */
export function ModuleLink({ m, sub, dim = false }: { m: LpModule; sub: ReactNode; dim?: boolean }) {
  return (
    <button
      className="rsrc lp-link"
      onClick={() => navigate(`/module/${m.id}`)}
      style={{ width: '100%', textAlign: 'left', opacity: dim ? 0.72 : 1 }}
      type="button"
    >
      <span className="rsrc__kind">{m.id}</span>
      <div className="grow" style={{ minWidth: 0 }}>
        <div className="rsrc__title">{m.title}</div>
        <div className="rsrc__by">{sub}</div>
      </div>
      <IconArrowRight size={13} style={{ color: 'var(--ink-5)', flex: 'none', marginTop: 3 }} />
    </button>
  )
}

/** A line of feedback under a group of ticks, when a claim was refused. */
export function Refusal({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p className="lp-refusal" role="status">
      <IconLock size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 6 }} />
      {message}
    </p>
  )
}

/**
 * The Layer 3 → 4 hard gate: four conditions, ticked by hand, that hold
 * thirteen modules shut. Not a module — a precondition with teeth.
 */
export function HardGateCard({ index = 0 }: { index?: number }) {
  const { state, claim } = useLearner()
  const [msg, setMsg] = useState<string | null>(null)
  const fg = hardGate(state)
  const sources = ['M2', 'M10', 'M12'].filter((id) => isPassed(state, id)).length
  const text = hardGateText(fg.open, sources)
  return (
    <Card index={index} className="hardgate" style={fg.open ? undefined : { borderColor: 'rgba(240,168,72,0.28)' }}>
      <CardHead
        icon={<IconShield size={15} />}
        title={fg.open ? 'Gate open' : 'Hard gate — Layer 3 → Layer 4'}
        right={<Chip tone={fg.open ? 'ok' : 'warn'}>{fg.done}/{fg.total}</Chip>}
        divided
      />
      <div className="sect">
        {text.map((t, i) => (
          <p key={i} className="lp-para">
            {t}
          </p>
        ))}
        <div style={{ marginTop: 6 }}>
          {fg.items.map((it) => (
            <TickRow
              key={it.key}
              on={!!state.flagship[it.key]}
              label={it.label}
              onToggle={() => {
                const r = claim(planFlag(state, it.key))
                setMsg(r.result === 'blocked' ? (r.message ?? null) : null)
              }}
            />
          ))}
        </div>
        <p className="lp-para lp-para--dim" style={{ marginTop: 10 }}>
          {fg.note}
        </p>
        <Refusal message={msg} />
      </div>
    </Card>
  )
}

/** The realm's "How this works" card: the vocabulary, then the five rules. */
export function HowThisWorks({ index = 0 }: { index?: number }) {
  const { state } = useLearner()
  return (
    <Card index={index}>
      <CardHead icon={<IconBook size={15} />} title="How this works" divided />
      <div className="sect">
        {howRows(isPassed(state, 'M0')).map(([k, v]) => (
          <Gloss key={k} term={k}>
            {v}
          </Gloss>
        ))}
        <Gloss term="The five rules">
          <ol className="lp-rules">
            {LAUNCHPAD_RULES.map((r) => (
              <li key={r.n}>{r.rule}</li>
            ))}
          </ol>
        </Gloss>
      </div>
    </Card>
  )
}

/** Counts, as one-line rows. */
export function ByTheNumbers({ rows, index = 0 }: { rows: [string, string][]; index?: number }) {
  return (
    <Card index={index}>
      <CardHead icon={<IconDoc size={15} />} title="By the numbers" divided />
      <div className="sect" style={{ paddingTop: 6, paddingBottom: 6 }}>
        {rows.map(([k, v]) => (
          <Fact key={k} k={k} v={v} />
        ))}
      </div>
    </Card>
  )
}

/** The longest chain, with the hard gate drawn where it bites. */
export function chainText(): string {
  return AI_CURRICULUM_API.criticalPath().path.join(' → ').replace('M12 → ', 'M12 → [hard gate] → ')
}
