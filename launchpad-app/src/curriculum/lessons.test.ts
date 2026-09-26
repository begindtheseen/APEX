/* ============================================================================
   LAUNCHPAD — lesson validator
   ----------------------------------------------------------------------------
   ORBIT's lessons are written for the app, so its validator checks how they
   are written. LAUNCHPAD's are not written for the app at all: they are the
   curriculum document's own module sections, cut at the gate and nothing else.
   So this checks the one thing that matters about them — that they are the
   document, verbatim — and that the app can read and render them:

     · every module in the curriculum file has lessons, and every lesson
       belongs to a real module
     · a module's lessons, joined back together, are exactly its section of
       AI_ENGINEERING_CURRICULUM.md: nothing added, nothing lost
     · the headers parse, cover the module's topics, and the manifest the app
       reads was built from these same files
     · the markdown stays inside what the renderer supports
   ========================================================================== */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { buildCoverage, buildManifest } from '../../scripts/lessons-manifest'
import { AI_CURRICULUM } from './generated/launchpad-data'
import { moduleById } from './index'
import { LESSON_COVERAGE, LESSON_MANIFEST } from './lessons/manifest'
import { parseLesson } from './lessons/parse'
import { noteRefs, notePicture, pictureProblem, splitNotes, stripNoteRefs } from '../lib/contextNotes'

const dir = fileURLToPath(new URL('./lessons', import.meta.url))
const doc = fs
  .readFileSync(fileURLToPath(new URL('../../../AI_ENGINEERING_CURRICULUM.md', import.meta.url)), 'utf8')
  .replace(/\r\n/g, '\n')

/** A module's section of the document: its heading line to the next heading. */
function sectionOf(id: string): string {
  const lines = doc.split('\n')
  const start = lines.findIndex((l) => l.startsWith(`## ${id} — `))
  if (start < 0) return ''
  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,2} /.test(lines[i]!)) {
      end = i
      break
    }
  }
  return lines.slice(start + 1, end).join('\n')
}

/** Whitespace and horizontal rules are layout, not content. */
const norm = (s: string) =>
  s
    .replace(/\n-{3,}\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim()

describe('lesson manifest', () => {
  it('matches the files on disk (run `npm run curriculum`)', () => {
    expect(LESSON_MANIFEST).toEqual(buildManifest())
  })

  it('carries coverage derived from those same files', () => {
    expect(LESSON_COVERAGE).toEqual(buildCoverage())
  })

  it('gives every module in the curriculum file its lessons, and nothing else', () => {
    const dirs = fs.readdirSync(dir).filter((d) => fs.statSync(path.join(dir, d)).isDirectory())
    expect(dirs.sort()).toEqual(AI_CURRICULUM.map((m) => m.id).sort())
  })

  it('reports every module fully covered', () => {
    for (const m of AI_CURRICULUM) expect(LESSON_COVERAGE[m.id]?.complete, m.id).toBe(true)
  })
})

describe.each(AI_CURRICULUM.map((m) => m.id))('lessons for %s', (moduleId) => {
  const module = moduleById(moduleId)
  const modDir = path.join(dir, moduleId)
  const files = fs.readdirSync(modDir).filter((f) => f.endsWith('.md')).sort()
  const parsed = files.map((file) => ({ file, ...parseLesson(fs.readFileSync(path.join(modDir, file), 'utf8'), file) }))

  it('belongs to a real module and is numbered contiguously', () => {
    expect(module, `${moduleId} is not a module`).toBeTruthy()
    files.forEach((f, i) => expect(f.startsWith(String(i + 1).padStart(2, '0') + '-'), f).toBe(true))
  })

  it('is the document’s own section for the module, verbatim', () => {
    // Context notes sit beside the document's text, never in it.
    const joined = parsed.map((p) => stripNoteRefs(splitNotes(p.body).body)).join('\n')
    expect(norm(joined)).toBe(norm(sectionOf(moduleId)))
  })

  it('has a sane header that covers exactly the module’s topics', () => {
    for (const p of parsed) {
      expect(p.header.id).toMatch(/^m\d+-[a-z-]+$/)
      expect(p.header.title.startsWith(module!.title), p.file).toBe(true)
      expect(p.header.minutes, p.file).toBeGreaterThan(0)
      expect(p.header.covers, p.file).toEqual(module!.topics)
    }
  })

  it('splits at the gate when the section has one', () => {
    const hasGate = /^\*\*GATE\*\*/m.test(sectionOf(moduleId))
    expect(parsed.length).toBe(hasGate ? 2 : 1)
    if (hasGate) expect(parsed[1]!.body.trimStart().startsWith('**GATE**')).toBe(true)
  })

  it('has context notes that are complete, at the end, and safe', () => {
    for (const p of parsed) {
      const { body, notes } = splitNotes(p.body)
      const refs = noteRefs(body)
      const blocks = [...p.body.matchAll(/^\s*:::\s*context\s+(\S+)/gm)].map((m) => m[1]!)
      expect(new Set(blocks).size, `${p.file}: note ids are unique`).toBe(blocks.length)
      expect([...new Set(refs)].filter((id) => !notes.has(id)), `${p.file}: marked phrases with no note`).toEqual([])
      expect([...notes.keys()].filter((id) => !refs.includes(id)), `${p.file}: notes nothing points to`).toEqual([])
      if (notes.size) {
        const first = p.body.search(/^\s*:::\s*context\s/m)
        expect(p.body.slice(first).replace(/^[ \t]*:::[ \t]*context[\s\S]*?^[ \t]*:::[ \t]*$/gm, '').trim(), `${p.file}: notes go at the very end`).toBe('')
      }
      for (const n of notes.values()) {
        const words = n.body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length
        expect(words, `${p.file}: note "${n.id}" 15–260 words`).toBeGreaterThanOrEqual(15)
        expect(words, `${p.file}: note "${n.id}" 15–260 words`).toBeLessThanOrEqual(260)
        const svg = notePicture(n.body)
        if (svg) expect(pictureProblem(svg), `${p.file}: note "${n.id}" picture`).toBeNull()
      }
    }
  })

  it('uses only the markdown the renderer supports', () => {
    for (const p of parsed) {
      // Headings deeper than four hashes and raw HTML have no rendering.
      const noCode = p.body.replace(/```[\s\S]*?```/g, '')
      expect(noCode.split('\n').filter((l) => /^#{5,}\s/.test(l)), p.file).toEqual([])
      expect(/<\/?(div|span|script|style|iframe)\b/i.test(noCode), p.file).toBe(false)
    }
  })
})
