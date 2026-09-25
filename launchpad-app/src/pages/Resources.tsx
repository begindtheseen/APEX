/* ============================================================================
   LAUNCHPAD — reference (ORBIT's resources page)
   ----------------------------------------------------------------------------
   Where ORBIT keeps its cited sources and its formula bank, LAUNCHPAD keeps
   the rest of its curriculum document and its words.

     The document  every section of AI_ENGINEERING_CURRICULUM.md that is not a
                   module: the numbers, the bets, the rules, the build order,
                   the hard gate, the parallel tracks priced, the cut list, the
                   appendices, the honest limit — verbatim, searchable
     Word bank     every word every module defines, in one list, with the
                   module that defines it. A term defined by two modules is on
                   both pages at the depth each needs, so it appears twice.
   ========================================================================== */
import { useEffect, useMemo, useState } from 'react'
import { IconBook, IconDoc, IconSearch, IconX } from '@/components/icons'
import { Card, CardHead, Chip, Empty, Segmented, Stat } from '@/components/ui'
import { MODULES, TRACKS } from '@/curriculum'
import type { LpDocSection } from '@/curriculum/generated/launchpad-doc'
import { Markdown } from '@/lib/markdown'
import { navigate } from '@/lib/router'
import './pages.css'

type View = 'document' | 'words'

export function Resources() {
  const [view, setView] = useState<View>('document')
  const [query, setQuery] = useState('')
  const [doc, setDoc] = useState<LpDocSection[] | null>(null)

  useEffect(() => {
    let alive = true
    void import('@/curriculum/generated/launchpad-doc').then((m) => {
      if (alive) setDoc(m.LAUNCHPAD_DOC)
    })
    return () => {
      alive = false
    }
  }, [])

  const words = useMemo(
    () =>
      MODULES.flatMap((m) =>
        (m.cards ?? []).map((c) => ({ card: c, module: m, id: `${m.id}::${c.id}` })),
      ),
    [],
  )

  const q = query.trim().toLowerCase()
  const shownDoc = useMemo(
    () =>
      (doc ?? []).filter(
        (d) => !q || d.title.toLowerCase().includes(q) || d.markdown.toLowerCase().includes(q),
      ),
    [doc, q],
  )
  const shownWords = useMemo(
    () =>
      words.filter(
        (w) =>
          !q ||
          w.card.front.toLowerCase().includes(q) ||
          w.card.back.toLowerCase().includes(q) ||
          w.module.title.toLowerCase().includes(q),
      ),
    [words, q],
  )
  const distinctTerms = useMemo(() => new Set(words.map((w) => w.card.front.toLowerCase())).size, [words])

  return (
    <div className="page page--padtop">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker">
            <IconDoc size={13} />
            The curriculum, beyond the modules
          </div>
          <h1 className="h-page">Reference</h1>
          <p className="page-head__sub">
            The rest of the curriculum document — the build order, the parallel tracks priced, the cut
            list, what enough means, the glossary, the honest limit — and every word every module
            defines, in one place.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--gap)',
          marginBottom: 'var(--gap)',
        }}
      >
        <Card pad index={0}>
          <Stat value={doc ? doc.length : '…'} label="Document sections" />
        </Card>
        <Card pad index={1}>
          <Stat value={words.length.toLocaleString('en-US')} label="Definitions" />
        </Card>
        <Card pad index={2}>
          <Stat value={distinctTerms.toLocaleString('en-US')} label="Distinct terms" />
        </Card>
      </div>

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
            { value: 'document', label: 'The document' },
            { value: 'words', label: 'Word bank' },
          ]}
          onChange={setView}
        />
        <label className="search grow">
          <IconSearch size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={view === 'document' ? 'Search the document…' : 'Search terms and definitions…'}
            aria-label="Search"
          />
          {query ? (
            <button onClick={() => setQuery('')} aria-label="Clear search" type="button">
              <IconX size={14} />
            </button>
          ) : null}
        </label>
      </div>

      {view === 'document' ? (
        !doc ? (
          <p className="track-note">Loading…</p>
        ) : shownDoc.length === 0 ? (
          <Empty icon={<IconDoc size={28} />} title={`Nothing matches “${query}”`} body="Try a different term." />
        ) : (
          <>
            {!q ? (
              <Card index={0} style={{ marginBottom: 'var(--gap)' }}>
                <nav className="guide-index" aria-label="Sections of the document">
                  {shownDoc.map((d, i) => (
                    <button
                      key={d.id}
                      className="guide-index__item"
                      onClick={() => document.getElementById(`doc-${d.id}`)?.scrollIntoView({ block: 'start' })}
                      type="button"
                    >
                      <span className="guide-index__n">{i + 1}</span>
                      {d.title}
                    </button>
                  ))}
                </nav>
              </Card>
            ) : null}
            <div className="stack">
              {shownDoc.map((d, i) => (
                <section key={d.id} id={`doc-${d.id}`} style={{ scrollMarginTop: 80 }}>
                  <Card index={Math.min(i, 4)}>
                    <CardHead
                      icon={<IconDoc size={15} />}
                      title={d.title}
                      right={d.part && d.part !== d.title && d.part !== 'The Launch Pad' ? <Chip ghost>{d.part}</Chip> : null}
                      divided
                    />
                    <div className="sect reader__body">
                      <Markdown className="reader__md">{d.markdown}</Markdown>
                    </div>
                  </Card>
                </section>
              ))}
            </div>
          </>
        )
      ) : shownWords.length === 0 ? (
        <Empty icon={<IconBook size={28} />} title={`Nothing matches “${query}”`} body="Try a different term." />
      ) : (
        <Card index={0}>
          <CardHead
            icon={<IconBook size={15} />}
            title={`Words (${shownWords.length})`}
            right={<span className="eyebrow-dim">each defined where it is used</span>}
            divided
          />
          <div className="sect">
            {shownWords.map((w) => (
              <button
                className="rsrc"
                key={w.id}
                onClick={() => navigate(`/module/${w.module.id}`)}
                style={{ width: '100%', textAlign: 'left' }}
                type="button"
              >
                <span className="rsrc__kind" style={{ color: TRACKS[w.module.track].accent }}>
                  {w.module.id}
                </span>
                <div className="grow">
                  <div className="rsrc__title">{w.card.front}</div>
                  <div className="rsrc__by" style={{ color: 'var(--ink-3)', lineHeight: 1.6 }}>
                    {w.card.back}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
