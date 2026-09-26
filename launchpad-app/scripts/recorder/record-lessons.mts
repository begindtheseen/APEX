/* ============================================================================
   LAUNCHPAD — recording the lessons
   ----------------------------------------------------------------------------
   On a phone the natural voice cannot be made on the device: each copy of the
   model takes about 450 MB before it says a word and more with every sentence,
   and an iPhone runs out after a few. So LAUNCHPAD's lessons are recorded here
   instead, once, with the same voice and the same text pipeline the app uses,
   and the phone plays audio files — no model, no memory, no waiting.

   For each lesson it writes, into ../../../launchpad-audio/:

     <key>.mp3    the whole lesson read aloud, pauses included (48 kbps mono)
     <key>.json   where every sentence and every word starts and ends in it
     index.json   which lessons have a recording

   <key> is textKey() of the prepared lesson text, which is what the app looks
   up: a lesson that has been edited since has a new key, so its old recording
   is never played against new words (the app reads it on the device instead
   until it is recorded again), and the next run records it and drops the old
   one. A run skips every lesson already recorded, so it can be stopped and
   started again.

   The model is the published 8-bit one, rewritten as it loads (onnxEdit.ts):
   float convolutions, which run four to five times faster here and sound
   closer to the full model, and the per-phoneme durations exposed as an
   output, which is what the word times come from.

   Run:  cd launchpad-app/scripts/recorder && npm install && npm run record
         (VOICE_MODEL=<path to model_quantized.onnx> to skip the download)
   ========================================================================== */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Mp3Encoder } from '@breezystack/lamejs'
import * as ort from 'onnxruntime-node'
import { phonemize } from 'phonemizer'
import { parseLesson } from '../../src/curriculum/lessons/parse.ts'
import { prepare, toUtterances } from '../../src/lib/speech.ts'
import {
  DEFAULT_NATURAL_VOICE,
  MAX_UNIT_CHARS,
  SAMPLE_RATE,
  alignWords,
  phonemesFor,
  speechUnits,
  styleRow,
  textKey,
  tokenizeMapped,
  trimBounds,
  trimSilence,
  wordTimes,
} from '../../src/lib/voice/kokoro.ts'
import { DURATIONS_TENSOR, convIntegerToConv, exposeDurations } from '../../src/lib/voice/onnxEdit.ts'

const here = path.dirname(fileURLToPath(import.meta.url))
const APP = path.resolve(here, '..', '..')
const LESSONS = path.join(APP, 'src', 'curriculum', 'lessons')
const OUT = path.resolve(APP, '..', 'launchpad-audio')
const MODEL_URL = 'https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX/resolve/main/onnx/model_quantized.onnx'
const VOICE = DEFAULT_NATURAL_VOICE
const LANG = 'en-us' as const
const KBPS = 48
const STYLE_DIM = 256

/** The index the app reads. `v` changes only if the file layout does. */
interface Index {
  v: 1
  voice: string
  lessons: Record<string, { mp3: string; json: string; duration: number; lesson: string }>
}

/** One lesson's timings: seconds from the start of its mp3, to the millisecond. */
interface Timings {
  v: 1
  key: string
  voice: string
  duration: number
  /** Each unit the app reads: its text, when it plays, which sentence it belongs to, and its words ([start, end, charStart, charEnd]). */
  units: { t: string; s: number; e: number; n: number; w: [number, number, number, number][] }[]
}

const ms = (x: number) => Math.round(x * 1000) / 1000

async function loadModel(): Promise<ort.InferenceSession> {
  let bytes: Uint8Array
  if (process.env.VOICE_MODEL) bytes = new Uint8Array(fs.readFileSync(process.env.VOICE_MODEL))
  else {
    console.log(`downloading ${MODEL_URL}`)
    const res = await fetch(MODEL_URL)
    if (!res.ok) throw new Error(`model download failed: HTTP ${res.status}`)
    bytes = new Uint8Array(await res.arrayBuffer())
  }
  const fast = convIntegerToConv(bytes).bytes
  const timed = exposeDurations(fast)
  if (!timed.added) throw new Error('the model has no durations tensor to expose; word times need it')
  return ort.InferenceSession.create(timed.bytes, {
    intraOpNumThreads: os.cpus().length,
    graphOptimizationLevel: 'all',
    executionProviders: ['cpu'],
  })
}

function lessonFiles(): string[] {
  const out: string[] = []
  for (const dir of fs.readdirSync(LESSONS).sort()) {
    const full = path.join(LESSONS, dir)
    if (!fs.statSync(full).isDirectory()) continue
    for (const f of fs.readdirSync(full).sort()) if (f.endsWith('.md')) out.push(`${dir}/${f}`)
  }
  return out
}

/** ONLY=<substring> records just the matching lessons, and leaves the others' recordings alone. */
const ONLY = process.env.ONLY ?? ''

function encodeMp3(pcm: Float32Array): Uint8Array {
  const enc = new Mp3Encoder(1, SAMPLE_RATE, KBPS)
  const parts: Uint8Array[] = []
  const block = 1152 * 16
  const buf = new Int16Array(block)
  for (let i = 0; i < pcm.length; i += block) {
    const n = Math.min(block, pcm.length - i)
    for (let j = 0; j < n; j++) buf[j] = Math.max(-32767, Math.min(32767, Math.round(pcm[i + j]! * 32767)))
    const out = enc.encodeBuffer(n === block ? buf : buf.subarray(0, n))
    if (out.length) parts.push(out)
  }
  parts.push(enc.flush())
  const total = parts.reduce((a, p) => a + p.length, 0)
  const bytes = new Uint8Array(total)
  let at = 0
  for (const p of parts) {
    bytes.set(p, at)
    at += p.length
  }
  return bytes
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const indexFile = path.join(OUT, 'index.json')
  const index: Index = fs.existsSync(indexFile) ? JSON.parse(fs.readFileSync(indexFile, 'utf8')) : { v: 1, voice: VOICE, lessons: {} }
  const styles = new Float32Array(fs.readFileSync(path.join(APP, 'public', 'voices', `${VOICE}.bin`)).buffer.slice(0))
  const rows = Math.floor(styles.length / STYLE_DIM)
  const files = lessonFiles()
  const wanted = new Map<string, string>()
  let session: ort.InferenceSession | null = null
  const started = Date.now()
  let spoken = 0

  for (const [n, rel] of files.entries()) {
    const body = parseLesson(fs.readFileSync(path.join(LESSONS, rel), 'utf8'), rel).body
    const text = prepare(body).text
    const key = textKey(text)
    wanted.set(key, rel)
    if (ONLY && !rel.includes(ONLY)) continue
    if (index.lessons[key] && fs.existsSync(path.join(OUT, `${key}.mp3`)) && fs.existsSync(path.join(OUT, `${key}.json`))) continue
    session ??= await loadModel()

    const units = speechUnits(text, (p) => toUtterances(p, 100_000), MAX_UNIT_CHARS)
    const clips: Float32Array[] = []
    const timings: Timings = { v: 1, key, voice: VOICE, duration: 0, units: [] }
    let t = 0
    for (const u of units) {
      const phonemes = await phonemesFor(u.text, LANG, phonemize)
      const { ids, chars } = tokenizeMapped(phonemes)
      if (ids.length <= 2) continue
      const row = styleRow(ids.length, rows)
      const out = await session.run({
        input_ids: new ort.Tensor('int64', BigInt64Array.from(ids, (x) => BigInt(x)), [1, ids.length]),
        style: new ort.Tensor('float32', styles.slice(row * STYLE_DIM, row * STYLE_DIM + STYLE_DIM), [1, STYLE_DIM]),
        speed: new ort.Tensor('float32', Float32Array.of(1), [1]),
      })
      const wave = out[session.outputNames[0]!]!.data as Float32Array
      const durations = out[DURATIONS_TENSOR]!.data as BigInt64Array
      const { words, charWord } = await alignWords(u.text, phonemes, LANG, phonemize)
      const times = wordTimes(chars, charWord, durations, words.length)
      const { from } = trimBounds(wave)
      const clip = trimSilence(wave)
      const len = clip.length / SAMPLE_RATE
      const w: [number, number, number, number][] = []
      words.forEach((span, k) => {
        const s0 = times[k * 2]!
        const e0 = times[k * 2 + 1]!
        if (Number.isNaN(s0)) return
        const s = Math.min(len, Math.max(0, s0 - from / SAMPLE_RATE))
        const e = Math.min(len, Math.max(s, e0 - from / SAMPLE_RATE))
        w.push([ms(t + s), ms(t + e), span.start, span.end])
      })
      timings.units.push({ t: u.text, s: ms(t), e: ms(t + len), n: u.sentence, w })
      clips.push(clip)
      t += len
      // The pause after it is silence in the file, so the player needs no gaps of its own.
      const gap = new Float32Array(Math.round(u.pause * SAMPLE_RATE))
      clips.push(gap)
      t += gap.length / SAMPLE_RATE
      spoken += len
    }
    const total = clips.reduce((a, c) => a + c.length, 0)
    const pcm = new Float32Array(total)
    let at = 0
    for (const c of clips) {
      pcm.set(c, at)
      at += c.length
    }
    timings.duration = ms(total / SAMPLE_RATE)
    fs.writeFileSync(path.join(OUT, `${key}.mp3`), encodeMp3(pcm))
    fs.writeFileSync(path.join(OUT, `${key}.json`), JSON.stringify(timings))
    index.lessons[key] = { mp3: `${key}.mp3`, json: `${key}.json`, duration: timings.duration, lesson: rel }
    fs.writeFileSync(indexFile, `${JSON.stringify(index, null, 1)}\n`)
    const rate = spoken / ((Date.now() - started) / 1000)
    console.log(`${n + 1}/${files.length} ${rel} → ${key} · ${timings.duration.toFixed(0)} s audio · ${rate.toFixed(2)}× real time`)
  }

  // Recordings of text that no longer exists: a lesson edited or removed.
  for (const key of Object.keys(index.lessons)) {
    if (ONLY || wanted.has(key)) continue
    for (const f of [`${key}.mp3`, `${key}.json`]) fs.rmSync(path.join(OUT, f), { force: true })
    delete index.lessons[key]
    console.log(`dropped the stale recording ${key}`)
  }
  index.voice = VOICE
  fs.writeFileSync(indexFile, `${JSON.stringify(index, null, 1)}\n`)
  console.log(`done: ${Object.keys(index.lessons).length} lessons recorded`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
