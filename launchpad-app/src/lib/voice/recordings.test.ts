/* ============================================================================
   Every lesson has its recording
   ----------------------------------------------------------------------------
   On a phone, a lesson without a recording falls back to the voice made on the
   device, which a phone can barely run. So a lesson edited without being
   recorded again is caught here, with how to fix it, rather than discovered by
   someone on an iPhone.
   ========================================================================== */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseLesson } from '@/curriculum/lessons/parse'
import { prepare } from '@/lib/speech'
import { DEFAULT_NATURAL_VOICE, textKey } from './kokoro'

const LESSONS = join(__dirname, '../../curriculum/lessons')
const AUDIO = join(__dirname, '../../../../launchpad-audio')
const HOW = 'record it: cd launchpad-app/scripts/recorder && npm install && npm run record'

describe('lesson recordings', () => {
  const index = JSON.parse(readFileSync(join(AUDIO, 'index.json'), 'utf8')) as {
    v: number
    voice: string
    lessons: Record<string, { mp3: string; json: string; lesson: string }>
  }

  it('are in the default voice', () => {
    expect(index.v).toBe(1)
    expect(index.voice).toBe(DEFAULT_NATURAL_VOICE)
  })

  it('exist for every lesson, made from its current text', () => {
    const missing: string[] = []
    for (const dir of readdirSync(LESSONS)) {
      if (!statSync(join(LESSONS, dir)).isDirectory()) continue
      for (const f of readdirSync(join(LESSONS, dir)).filter((x) => x.endsWith('.md'))) {
        const rel = `${dir}/${f}`
        const key = textKey(prepare(parseLesson(readFileSync(join(LESSONS, rel), 'utf8'), rel).body).text)
        const entry = index.lessons[key]
        if (!entry || !existsSync(join(AUDIO, entry.mp3)) || !existsSync(join(AUDIO, entry.json))) missing.push(rel)
      }
    }
    expect(missing, `these lessons have no recording of their current text; ${HOW}`).toEqual([])
  })

  it('leave nothing behind for text that no longer exists', () => {
    const files = readdirSync(AUDIO).filter((f) => f !== 'index.json' && f !== 'README.md')
    const listed = new Set(Object.values(index.lessons).flatMap((e) => [e.mp3, e.json]))
    expect(files.filter((f) => !listed.has(f))).toEqual([])
  })
})
