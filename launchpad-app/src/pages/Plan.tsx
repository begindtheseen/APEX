/* ============================================================================
   LAUNCHPAD — The Plan
   ----------------------------------------------------------------------------
   Two numbers that decide everything else: how many months you can go without
   a paycheck, and how many hours a week you can truly give. The arithmetic is
   the curriculum file's own plan(), called as it is, so the verdict here is
   the one the realm gave and the one M0 asks you to write down. Every
   sentence around it is the realm's.

   The inputs write through on every keystroke, and only the derived half of
   the page redraws: rebuilding the fields would swallow what she is typing.
   ========================================================================== */
import { useState } from 'react'
import { IconCalendar, IconLayers, IconTarget } from '@/components/icons'
import { Card, CardHead, Chip } from '@/components/ui'
import { Gloss, ModuleLink } from '@/components/lp'
import { PlanetPlate } from '@/components/art/Thumbs'
import {
  AI_COMPRESSED_SPINE,
  AI_CURRICULUM,
  AI_CURRICULUM_API,
  AI_CUT_ORDER,
  type LpPlan,
  type LpSetup,
} from '@/curriculum/generated/launchpad-data'
import { CUT_INTRO, CUT_OUTRO, CUT_REASONS, PLAN_CALCULATOR, PLAN_INTRO, planDecides } from '@/curriculum/realm'
import { isUnlocked, setSetup } from '@/engine/claims'
import { useLearner } from '@/hooks/useLearner'
import { navigate } from '@/lib/router'
import './home.css'
import './pages.css'

const CEIL = 18

function hrs(n: number | null | undefined): string {
  if (!n && n !== 0) return '—'
  return n < 0.1 ? 'under 0.1' : n.toFixed(1)
}

/** A stored number shows only when it is a finite positive one. */
function shown(v: number | undefined): string {
  return v != null && Number.isFinite(v) && v > 0 ? String(v) : ''
}

export function Plan() {
  const { state, setState } = useLearner()
  // Local copies of what is being typed, so a half-typed "1." is not rewritten
  // to "1" under the cursor. The stored value is what the arithmetic reads.
  const [draft, setDraft] = useState(() => ({
    runwayMonths: shown(state.setup.runwayMonths),
    weeklyHours: shown(state.setup.weeklyHours),
    flagship: state.setup.flagship ?? '',
  }))
  const set = (field: keyof LpSetup, value: string) => {
    setDraft((d) => ({ ...d, [field]: value }))
    setState((s) => setSetup(s, field, value))
  }
  const pl = AI_CURRICULUM_API.plan(state.setup)
  const onSpine = pl.recommend === 'spine' || pl.recommend === 'full-tight' || pl.recommend === 'spine-plus-contract'

  return (
    <div className="page page--padtop">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker">
            <IconCalendar size={13} />
            Two numbers that decide everything else
          </div>
          <h1 className="h-page">The Plan</h1>
          <p className="page-head__sub">
            {PLAN_INTRO}{' '}
            <a href="#/module/M0" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              open M0
            </a>{' '}
            for the rest. <strong style={{ color: 'var(--ink)' }}>{PLAN_CALCULATOR[0]}</strong> {PLAN_CALCULATOR[1]}
          </p>
        </div>
      </div>

      <div className="read">
        <div className="stack">
          <Card index={0}>
            <CardHead icon={<IconTarget size={15} />} title="Your two numbers" divided />
            <div className="sect">
              <div className="lp-fields">
                <div className="lp-field">
                  <label htmlFor="lpRunway">Runway (months)</label>
                  <input
                    id="lpRunway"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    placeholder="0"
                    value={draft.runwayMonths}
                    onChange={(e) => set('runwayMonths', e.target.value)}
                  />
                </div>
                <div className="lp-field">
                  <label htmlFor="lpHours">Hours a week</label>
                  <input
                    id="lpHours"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    placeholder="0"
                    value={draft.weeklyHours}
                    onChange={(e) => set('weeklyHours', e.target.value)}
                  />
                </div>
                <div className="lp-field lp-field--wide">
                  <label htmlFor="lpFlagship">Your flagship — the one app you keep building</label>
                  <input
                    id="lpFlagship"
                    type="text"
                    placeholder="Name the app"
                    value={draft.flagship}
                    onChange={(e) => set('flagship', e.target.value)}
                  />
                </div>
              </div>
              <div role="status" aria-live="polite" aria-atomic="true">
                <Verdict pl={pl} />
              </div>
            </div>
          </Card>
        </div>

        <div className="stack">
          {onSpine ? <SpineCards pl={pl} /> : null}
          <CutOrder />
          <Card index={3}>
            <CardHead icon={<IconTarget size={15} />} title="What this decides" divided />
            <div className="sect">
              {planDecides(state.setup.flagship).map(([k, v]) => (
                <Gloss key={k} term={k}>
                  {v}
                </Gloss>
              ))}
            </div>
          </Card>
          <Card className="quote" index={4}>
            <PlanetPlate className="quote__art" seed="plan" />
            <div className="quote__scrim" />
            <div className="quote__inner">
              <p className="quote__text">
                Runway sets the deadline.
                <span className="quote__emph">The topic list never did.</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

/** The two paths side by side, the verdict, and why — the realm's words. */
function Verdict({ pl }: { pl: LpPlan }) {
  const unset = pl.recommend === 'unset'
  const fullOn = pl.recommend === 'full' || pl.recommend === 'full-tight'
  const spineFits = !!pl.neededForSpine && Math.round(pl.neededForSpine * 10) / 10 <= CEIL
  const overrun = !unset && !spineFits
  const spineShort = !!pl.neededForSpine && !!pl.weeklyHours && pl.neededForSpine > pl.weeklyHours

  const headline = unset
    ? '■ INCOMPLETE'
    : overrun
      ? '■ NEITHER FITS — SPINE PLUS PAID WORK'
      : pl.recommend === 'spine'
        ? spineShort
          ? '▲ RAISE THE HOURS, OR TAKE THE SPINE'
          : '▲ TAKE THE SPINE'
        : pl.recommend === 'full-tight'
          ? '▲ TIGHT — RAISE HOURS OR TAKE THE SPINE'
          : '▲ FULL PROGRAM FITS'

  let applyLine = ''
  if (!unset) {
    applyLine =
      `Applications start after Layers 0-2 — ${pl.applyAfterHours}h of module work in. ` +
      (pl.applyAfterBlocked
        ? pl.applyAfterBlocked
        : `That is not ${pl.applyAfterHours} divided by your weekly hours: the parallel tracks take about ${hrs(pl.applyTrackHoursPerWeek)} h/week out of the budget before any module gets one, so it lands roughly month ${pl.applyAfterMonths ? Math.max(1, Math.round(pl.applyAfterMonths)) : '?'}. Not when everything is finished.`)
  }
  let tight = ''
  if (!unset && pl.weeklyHours && pl.runwayMonths) {
    const am = pl.applyAfterMonths || pl.applyAfterHours / pl.weeklyHours / 4.345
    if (am > pl.runwayMonths - 2 && pl.recommend !== 'spine-plus-contract') {
      const advice =
        pl.weeklyHours < CEIL
          ? `Raise the hours toward ${CEIL}, or take the Spine.`
          : spineFits
            ? 'Take the Spine.'
            : 'Neither program fits: plan on the Spine plus a contract role.'
      tight = ` That is month ${Math.max(1, Math.round(am))} of a ${pl.runwayMonths}-month runway — tight. ${advice}`
    }
  }

  return (
    <>
      {!unset ? (
        <div className="lp-paths">
          <PathBox
            on={fullOn}
            name="Full program"
            months={pl.fullMonths}
            runway={pl.runwayMonths}
            sub={`${pl.moduleHours}h of modules + ${pl.trackHours}h of tracks · needs ${hrs(pl.neededForFull)} h/week to fit your runway`}
          />
          <PathBox
            on={!fullOn}
            name="Compressed Spine"
            months={pl.spineMonths}
            runway={pl.runwayMonths}
            sub={`${pl.spineModuleHours}h of modules + ${pl.spineTrackHours}h of tracks · needs ${hrs(pl.neededForSpine)} h/week`}
          />
        </div>
      ) : null}
      <div className="lp-verdict" data-tone={unset || overrun || pl.recommend !== 'full' ? 'warn' : undefined}>
        {headline}
      </div>
      <p className="lp-why">{pl.why}</p>
      {!unset && pl.cappedByCeiling ? (
        <p className="lp-why" data-tone="dim">
          You entered {pl.weeklyHoursEntered} hours a week. Every figure above is worked out at {pl.ceiling},
          which is the most this program assumes anyone sustains for a year — so typing a bigger number here
          does not give you a shorter program. If you can genuinely hold more than {pl.ceiling}, the honest
          place to spend it is the parallel tracks and the job search, not a faster ladder.
        </p>
      ) : null}
      {!unset && spineShort && !overrun ? (
        <p className="lp-why" data-tone="bad">
          <strong>What to do:</strong> raise your weekly hours toward {hrs(pl.neededForSpine)}, or lengthen the
          runway. If neither is possible, the plan is the Spine plus a contract role — and the numbered cut
          order buys back the last few hours.
        </p>
      ) : null}
      {applyLine ? (
        <p className="lp-why" data-tone="dim">
          {applyLine}
          {tight ? <strong style={{ color: '#ff9a8a' }}>{tight}</strong> : null}
        </p>
      ) : null}
    </>
  )
}

function PathBox({
  on,
  name,
  months,
  runway,
  sub,
}: {
  on: boolean
  name: string
  months: number | null
  runway: number
  sub: string
}) {
  return (
    <div className="lp-path" data-on={on}>
      <div className="lp-path__name">{name}</div>
      <div className="lp-path__value">
        {months ? months.toFixed(1) : '—'} mo
        {months && runway && months > runway ? (
          <span className="lp-path__over">{(months - runway).toFixed(1)} months past your runway</span>
        ) : null}
      </div>
      <div className="lp-path__sub">{sub}</div>
    </div>
  )
}

/** What the Spine costs, counted rather than asserted, and the Spine named. */
function SpineCards({ pl }: { pl: LpPlan }) {
  const { state } = useLearner()
  const dropped = AI_CURRICULUM.filter((m) => !AI_COMPRESSED_SPINE.includes(m.id))
  return (
    <>
      <Card index={1}>
        <CardHead
          icon={<IconTarget size={15} />}
          title="What the Spine costs"
          right={<Chip tone="warn">{dropped.length} dropped</Chip>}
          divided
        />
        <div className="sect">
          <p className="lp-para">
            The Spine keeps {AI_COMPRESSED_SPINE.length} modules and drops {dropped.length} — including the whole
            AI layer (M18 to M21), deployment (M23) and Python (M24 and M25). The two that will hurt first on your
            first job are M14, reading code you did not write, and M17, scoping and estimating
            {pl.recommend === 'spine-plus-contract'
              ? ': a contract role, which is what the verdict points you at, is the most likely of all to drop you into an unfamiliar codebase with a scoped deliverable and no ramp'
              : ", because both are about working to someone else's constraints and nothing on the Spine teaches that"}
            . Budget your first month on the job for them.
          </p>
        </div>
      </Card>
      <Card index={2}>
        <CardHead
          icon={<IconLayers size={15} />}
          title="The Spine, named"
          right={<span className="eyebrow-dim">{AI_COMPRESSED_SPINE.length}</span>}
          divided
        />
        <div className="sect">
          {AI_COMPRESSED_SPINE.map((id) => {
            const m = AI_CURRICULUM_API.byId(id)
            if (!m) return null
            const open = isUnlocked(state, id)
            return <ModuleLink key={id} m={m} sub={`${m.hours}h${open ? '' : ' · locked'}`} dim={!open} />
          })}
        </div>
      </Card>
    </>
  )
}

/** The cut order: three lines, on the page that decides which program you are on. */
function CutOrder() {
  if (!AI_CUT_ORDER.length) return null
  const hoursOf = (entry: string) => {
    const m = AI_CURRICULUM_API.byId(entry.split(' ')[0]!)
    return m ? (entry.includes('half') ? Math.round(m.hours / 2) : m.hours) : 0
  }
  const back = AI_CUT_ORDER.reduce((a, e) => a + hoursOf(e), 0)
  return (
    <Card index={2}>
      <CardHead
        icon={<IconLayers size={15} />}
        title="The cut order"
        right={<span className="eyebrow-dim">{back}h back</span>}
        divided
      />
      <div className="sect">
        <p className="lp-para lp-para--dim">{CUT_INTRO}</p>
        <ol className="lp-list">
          {AI_CUT_ORDER.map((entry, i) => {
            const id = entry.split(' ')[0]!
            const m = AI_CURRICULUM_API.byId(id)
            const why = CUT_REASONS[id]
            return (
              <li key={entry}>
                <span className="lp-list__mark">{i + 1}</span>
                <span>
                  <button
                    type="button"
                    onClick={() => navigate(`/module/${id}`)}
                    style={{ color: 'var(--ink)', fontWeight: 500 }}
                  >
                    {entry}
                  </button>
                  {m ? ` — ${m.title} · ${entry.includes('half') ? '~' : ''}${hoursOf(entry)}h` : ''}
                  {why ? ` — ${why}` : ''}
                </span>
              </li>
            )
          })}
        </ol>
        <p className="lp-para lp-para--dim" style={{ marginTop: 10 }}>
          {CUT_OUTRO}
        </p>
      </div>
    </Card>
  )
}
