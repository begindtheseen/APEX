/* ============================================================================
   LAUNCHPAD — the parallel tracks
   ----------------------------------------------------------------------------
   Ten continuous habits that run alongside the modules from the first day to
   the hire, with their hours in the headline total because they are real
   work. Every word here is the curriculum file's; the page adds only the
   Spine's cut to each track when the plan points at the Spine.
   ========================================================================== */
import { IconRefresh } from '@/components/icons'
import { Card, CardHead, Chip } from '@/components/ui'
import { Fact, Gloss } from '@/components/lp'
import {
  AI_CURRICULUM_API,
  AI_SPINE_TRACK_HOURS,
  AI_TRACKS,
  LAUNCHPAD_CONFIG,
} from '@/curriculum/generated/launchpad-data'
import { tracksWhy } from '@/curriculum/realm'
import { useLearner } from '@/hooks/useLearner'
import './pages.css'

export function Tracks() {
  const { state } = useLearner()
  const th = AI_TRACKS.reduce((a, t) => a + t.hours, 0)
  const spineTh = AI_TRACKS.reduce((a, t) => a + (AI_SPINE_TRACK_HOURS[t.id] ?? t.hours), 0)
  const rec = AI_CURRICULUM_API.plan(state.setup).recommend
  const onSpine = rec === 'spine' || rec === 'full-tight'
  const total = AI_CURRICULUM_API.totalHours()

  return (
    <div className="page page--padtop">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker">
            <IconRefresh size={13} />
            Run the whole way, counted in the total
          </div>
          <h1 className="h-page">Parallel tracks</h1>
          <p className="page-head__sub">
            {th} hours that run alongside the modules, from start to hired. They are in the headline total
            because they are real work, not extras. {LAUNCHPAD_CONFIG.tracksNote}
          </p>
        </div>
      </div>

      <div className="read">
        <div className="stack">
          {AI_TRACKS.map((t, i) => {
            const sp = AI_SPINE_TRACK_HOURS[t.id]
            return (
              <Card key={t.id} index={i} className="lp-track" >
                <CardHead
                  icon={<IconRefresh size={15} />}
                  title={t.title}
                  right={
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Chip ghost>{t.id}</Chip>
                      <Chip ghost>{t.hours ? `${t.hours}h` : 'continuous'}</Chip>
                    </div>
                  }
                  divided
                />
                <div className="sect">
                  <p className="lp-para" style={{ color: 'var(--accent-hi)', fontSize: 12 }}>
                    {t.cadence}
                  </p>
                  {onSpine && sp !== undefined && sp !== t.hours ? (
                    <p className="lp-para" style={{ color: 'var(--warn)', fontSize: 12 }}>
                      On the Spine: {sp === 0 ? 'paused until you are earning' : `${sp}h, about half the pace`}
                    </p>
                  ) : null}
                  <p className="lp-para" style={{ marginBottom: 0 }}>
                    {t.rule}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="stack">
          <Card index={0}>
            <CardHead icon={<IconRefresh size={15} />} title="Why these are separate" divided />
            <div className="sect">
              {tracksWhy().map(([k, v]) => (
                <Gloss key={k} term={k}>
                  {v}
                </Gloss>
              ))}
            </div>
          </Card>
          <Card index={1}>
            <CardHead icon={<IconRefresh size={15} />} title="Totals" divided />
            <div className="sect" style={{ paddingTop: 6, paddingBottom: 6 }}>
              <Fact k="Tracks" v={AI_TRACKS.length} />
              <Fact k="Track hours" v={`${th}h · ${spineTh}h on the Spine`} />
              <Fact k="Module hours" v={`${total.modules}h`} />
              <Fact k="Everything" v={`${total.modules + th}h`} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
