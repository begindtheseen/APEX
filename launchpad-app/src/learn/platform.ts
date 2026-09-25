/* ============================================================================
   Learn mode — LAUNCHPAD's side
   ----------------------------------------------------------------------------
   The only file in src/learn that differs between the apps carrying Learn
   mode: which languages this app teaches, and how it runs them. Everything
   else — the format, the lessons, the grading — is shared.

   LAUNCHPAD runs all five in the browser: JavaScript in a throwaway worker,
   TypeScript through the real compiler first, Python in Pyodide, SQL in
   sql.js, and C++ through clang++ compiled to WebAssembly.
   ========================================================================== */
import { python as py, runCpp, runJavaScript, runSql, runTypeScript, tsCompiler, type RunOutput, type StatusFn } from '@/lib/runtimes'
import cpp from './tracks/cpp.txt?raw'
import javascript from './tracks/javascript.txt?raw'
import python from './tracks/python.txt?raw'
import sql from './tracks/sql.txt?raw'
import typescript from './tracks/typescript.txt?raw'
import type { Lang } from '@/curriculum/types'
import type { LearnLang, LearnLesson, LearnRun } from './types'

/** The tracks this app teaches, in the order a beginner should meet them. */
export const LEARN_SOURCES: [LearnLang, string][] = [
  ['javascript', javascript],
  ['typescript', typescript],
  ['python', python],
  ['sql', sql],
  ['cpp', cpp],
]

export const LEARN_LANGS: LearnLang[] = LEARN_SOURCES.map(([lang]) => lang)

function fromOutput(out: RunOutput): LearnRun {
  return { stdout: out.stdout, stderr: out.stderr, error: out.error, ms: out.ms }
}

/** Runs a lesson's checked program (see grade.ts) with this app's runtimes. */
export async function runLearn(lesson: LearnLesson, program: string, onStatus?: StatusFn): Promise<LearnRun> {
  switch (lesson.lang) {
    case 'javascript':
      return fromOutput(await runJavaScript(program))
    case 'typescript':
      return fromOutput(await runTypeScript(program, { onStatus }))
    case 'python': {
      const stdin = lesson.stdin?.replace(/\n$/, '').split('\n')
      return fromOutput(await py.run(program, { onStatus, ...(stdin ? { stdin } : {}) }))
    }
    case 'cpp':
      return fromOutput(await runCpp(program, { stdin: lesson.stdin ?? '', onStatus }))
    case 'sql': {
      const r = await runSql(program, lesson.schema)
      // sql.js hands back numbers, strings and nulls (and blobs, which no lesson uses).
      return { stdout: '', stderr: '', error: r.error, tables: r.tables as LearnRun['tables'], ms: r.ms }
    }
  }
}

/** The editor's grammar for a lesson's language. LAUNCHPAD's editor knows all five. */
export function editorLang(lang: LearnLang): Lang {
  return lang
}

/** Starts a language's runtime downloading before the first Run, where that is cheap. */
export function warmUp(lang: LearnLang): void {
  if (lang === 'python' && !py.isBooted) py.preload()
  if (lang === 'typescript') tsCompiler.preload()
}
