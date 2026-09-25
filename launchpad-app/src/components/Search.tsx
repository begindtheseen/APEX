/* ============================================================================
   LAUNCHPAD — find anything (ORBIT's)
   ----------------------------------------------------------------------------
   One box, one rule: type a few letters, get the places in the app whose name
   contains them. Modules, lessons, every page, and the settings that are hard
   to remember the location of.

   Deliberately dumb. No fuzzy matching, no ranking model, no index to keep in
   sync — the curriculum is already in memory, so the list is built from it at
   first use and filtered with `includes`. Eight hundred lessons is nothing to
   scan on a keystroke, and a search that behaves exactly as it looks is worth
   more here than a clever one that sometimes hides the thing she typed.
   ========================================================================== */
import { useEffect, useMemo, useRef, useState } from 'react'
import { IconSearch } from '@/components/icons'
import { MODULES } from '@/curriculum'
import { LESSON_MANIFEST } from '@/curriculum/lessons/manifest'
import { AI_TRACKS } from '@/curriculum/generated/launchpad-data'
import { TRACKS, TRACK_ORDER, layerOf } from '@/curriculum/tracks'
import { navigate } from '@/lib/router'
import './search.css'

interface Hit {
  /** What she reads. */
  label: string
  /** Where it lives, e.g. "Settings" or the module a lesson belongs to. */
  where: string
  href: string
  /**
   * The colour this kind of result carries, as a CSS value.
   *
   * A track keeps its own accent all the way down — its modules and their
   * lessons are tinted with it — so the colour she already associates with
   * a layer in the sidebar is the colour its lessons have here. Pages and
   * settings get their own, because they are not curriculum.
   */
  tone: string
}

const PAGE = 'var(--cyan)'
const SETTING = 'var(--warn)'

/** The pages, and the settings worth reaching by name rather than by scrolling. */
const PLACES: Hit[] = [
  { label: 'Home', where: 'Page', href: '/', tone: PAGE },
  { label: 'Learning', where: 'Page', href: '/learning', tone: PAGE },
  { label: 'Focus session', where: 'Page', href: '/focus', tone: PAGE },
  { label: 'Review', where: 'Page', href: '/review', tone: PAGE },
  { label: 'Playground', where: 'Page', href: '/playground', tone: PAGE },
  { label: 'The ladder', where: 'Page', href: '/learning', tone: PAGE },
  { label: 'The hard gate', where: 'Page', href: '/learning?show=gate', tone: PAGE },
  { label: 'The Plan', where: 'Page', href: '/plan', tone: PAGE },
  { label: 'Runway and weekly hours', where: 'The Plan', href: '/plan', tone: PAGE },
  { label: 'The Compressed Spine', where: 'The Plan', href: '/plan', tone: PAGE },
  { label: 'The cut order', where: 'The Plan', href: '/plan', tone: PAGE },
  { label: 'Parallel tracks', where: 'Page', href: '/tracks', tone: PAGE },
  { label: 'Progress', where: 'Page', href: '/progress', tone: PAGE },
  { label: 'Reference', where: 'Page', href: '/resources', tone: PAGE },
  { label: 'Glossary', where: 'Reference', href: '/resources', tone: PAGE },
  { label: 'Word bank', where: 'Reference', href: '/resources', tone: PAGE },
  { label: 'Realms', where: 'APEX', href: '../', tone: PAGE },
  { label: 'Guide', where: 'Page', href: '/guide', tone: PAGE },
  { label: 'Settings', where: 'Page', href: '/settings', tone: PAGE },
  { label: 'Reviews due', where: 'Page', href: '/review', tone: PAGE },
  ...TRACK_ORDER.map((id) => ({ label: TRACKS[id].title, where: `Layer ${layerOf(id)}`, href: `/${id}`, tone: TRACKS[id].accent })),
  ...AI_TRACKS.map((t) => ({ label: t.title, where: `Parallel track ${t.id}`, href: '/tracks', tone: PAGE })),

  { label: 'Reading speed', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Target retention', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Ask for confidence before revealing', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Interleave topics within a session', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Fuzz review intervals', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Reduce motion', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Keep the menu on screen', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Weekly study target', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'New items per day', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Display name', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Export a backup', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Restore from a backup', where: 'Settings', href: '/settings', tone: SETTING },
  { label: "What's new", where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'What is installed', where: 'Settings', href: '/settings', tone: SETTING },
  { label: 'Erase everything', where: 'Settings', href: '/settings', tone: SETTING },
]

/** Everything searchable, built once. */
function buildIndex(): Hit[] {
  const out = [...PLACES]
  for (const m of MODULES) {
    const def = TRACKS[m.track]
    const tone = def?.accent ?? PAGE
    out.push({ label: `${m.id} · ${m.title}`, where: def?.title ?? 'Module', href: `/module/${m.id}`, tone })
    out.push({ label: m.title, where: `${m.id} · ${def?.title ?? 'Module'}`, href: `/module/${m.id}`, tone })
    for (const lesson of LESSON_MANIFEST[m.id] ?? []) {
      out.push({ label: lesson.title, where: m.title, href: `/module/${m.id}?lesson=${lesson.id}`, tone })
    }
    for (const c of m.cards ?? []) {
      out.push({ label: c.front, where: `Word · ${m.id}`, href: `/module/${m.id}?step=learn`, tone })
    }
  }
  return out
}

let INDEX: Hit[] | null = null

/** Up to `limit` hits for `query`, names that start with it first. */
export function search(query: string, index: Hit[], limit = 8): Hit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []

  const starts: Hit[] = []
  const contains: Hit[] = []
  for (const hit of index) {
    const at = hit.label.toLowerCase().indexOf(q)
    if (at === 0) starts.push(hit)
    else if (at > 0) contains.push(hit)
    if (starts.length >= limit) break
  }
  return [...starts, ...contains].slice(0, limit)
}

export function Search() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  if (!INDEX) INDEX = buildIndex()
  const hits = useMemo(() => search(query, INDEX ?? []), [query])

  // A click anywhere else puts it away. Without this the results sit over the
  // page she just clicked through to.
  useEffect(() => {
    if (!open) return
    const away = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', away)
    return () => document.removeEventListener('mousedown', away)
  }, [open])

  const go = (hit: Hit) => {
    setQuery('')
    setOpen(false)
    // The one destination outside this app: APEX's realm launcher.
    if (hit.href.startsWith('../')) location.assign(hit.href)
    else navigate(hit.href)
  }

  return (
    <div className="search" ref={box}>
      <IconSearch size={14} className="search__icon" />
      <input
        className="search__input"
        type="search"
        value={query}
        placeholder="Search lessons, pages, settings"
        aria-label="Search"
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setQuery('')
            setOpen(false)
          }
          // Enter takes the first hit, which is what the eye is already on.
          if (e.key === 'Enter' && hits[0]) go(hits[0])
        }}
      />

      {open && query.trim().length >= 2 ? (
        <div className="search__out">
          {hits.length === 0 ? (
            <div className="search__none">Nothing matches “{query.trim()}”.</div>
          ) : (
            hits.map((hit, i) => (
              <button
                key={`${hit.href}-${hit.label}-${i}`}
                className="search__hit"
                style={{ ['--tone' as string]: hit.tone }}
                data-first={i === 0}
                type="button"
                onClick={() => go(hit)}
              >
                <span className="search__dot" />
                <span className="search__label">{hit.label}</span>
                <span className="search__where">{hit.where}</span>
                {i === 0 ? <span className="search__enter">↵</span> : null}
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}
