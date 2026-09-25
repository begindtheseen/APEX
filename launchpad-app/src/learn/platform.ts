/* ============================================================================
   Learn mode — LAUNCHPAD's side
   ----------------------------------------------------------------------------
   The only file in src/learn that differs between the apps carrying Learn
   mode: which languages this app teaches, and how it runs them. Everything
   else — the format, the lessons, the grading — is shared.

   LAUNCHPAD runs all seven in the browser: JavaScript in a throwaway worker,
   TypeScript through the real compiler first, Python in Pyodide, SQL in
   sql.js, C++ through clang++ compiled to WebAssembly, web pages in a
   sandboxed frame, and the terminal as the in-page practice shell.
   ========================================================================== */
import { python as py, runCpp, runJavaScript, runSql, runTypeScript, tsCompiler, type RunOutput, type StatusFn } from '@/lib/runtimes'
import type { ShellState } from '@/lib/shell'
import { runWebChecks } from '@/lib/web'
import { domSteps } from './grade'
import bash from './tracks/bash.txt?raw'
import cpp from './tracks/cpp.txt?raw'
import html from './tracks/html.txt?raw'
import javascript from './tracks/javascript.txt?raw'
import python from './tracks/python.txt?raw'
import sql from './tracks/sql.txt?raw'
import typescript from './tracks/typescript.txt?raw'
import type { Lang } from '@/curriculum/types'
import type { LearnLang, LearnLesson, LearnRun, Roadmap } from './types'

/** The tracks this app teaches, in the order a beginner should meet them. */
export const LEARN_SOURCES: [LearnLang, string][] = [
  ['bash', bash],
  ['html', html],
  ['javascript', javascript],
  ['typescript', typescript],
  ['python', python],
  ['sql', sql],
  ['cpp', cpp],
]

export const LEARN_LANGS: LearnLang[] = LEARN_SOURCES.map(([lang]) => lang)

/**
 * The goals Learn to code opens on. The first is LAUNCHPAD's own order: the
 * terminal (M1), JavaScript and TypeScript for the product (M3–M4), the page
 * it runs in, SQL for its data (the Postgres modules) and Python for the
 * models (M24).
 */
export const ROADMAPS: Roadmap[] = [
  {
    id: 'ai-product',
    title: 'AI Product Engineer',
    blurb: 'The order LAUNCHPAD itself teaches in: the terminal, JavaScript and TypeScript for the product, the web page it lives in, SQL for its data and Python for its models.',
    steps: ['bash', 'javascript', 'typescript', 'html', 'sql', 'python'],
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    blurb: 'Pages people use: HTML and CSS first, then the JavaScript that makes them react, then TypeScript to keep it correct as it grows.',
    steps: ['bash', 'html', 'javascript', 'typescript'],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    blurb: 'The server side: JavaScript and TypeScript for the code that answers requests, and SQL for the data it keeps.',
    steps: ['bash', 'javascript', 'typescript', 'sql'],
  },
  {
    id: 'data',
    title: 'Data & ML',
    blurb: 'Python, the language of data work and machine learning, and SQL to get the data out of where it lives.',
    steps: ['bash', 'python', 'sql'],
  },
  {
    id: 'systems',
    title: 'Systems & C++',
    blurb: 'Close to the machine: Python to learn to think in code, then C++ for programs that are fast and exact about memory.',
    steps: ['bash', 'python', 'cpp'],
  },
]

function fromOutput(out: RunOutput): LearnRun {
  return { stdout: out.stdout, stderr: out.stderr, error: out.error, ms: out.ms }
}

/**
 * Runs a lesson's checked program (see grade.ts) with this app's runtimes.
 * A Terminal lesson has nothing to run: its checks read the shell she typed
 * into, passed in as `shell`.
 */
export async function runLearn(
  lesson: LearnLesson,
  program: string,
  opts: { onStatus?: StatusFn; shell?: ShellState } = {},
): Promise<LearnRun> {
  const { onStatus } = opts
  switch (lesson.lang) {
    case 'bash':
      return { stdout: '', stderr: '', error: null, ...(opts.shell ? { shell: opts.shell } : {}), ms: 0 }
    case 'html': {
      const r = await runWebChecks(program, domSteps(lesson))
      const errors = r.logs.filter((l) => l.level === 'error').map((l) => l.text)
      return {
        stdout: r.logs.filter((l) => l.level !== 'error').map((l) => l.text).join('\n'),
        stderr: errors.join('\n'),
        error: null,
        dom: r.results,
        ms: r.ms,
      }
    }
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

/** The editor's grammar for a lesson's language. LAUNCHPAD's editor knows them all. */
export function editorLang(lang: LearnLang): Lang {
  return lang
}

/** Starts a language's runtime downloading before the first Run, where that is cheap. */
export function warmUp(lang: LearnLang): void {
  if (lang === 'python' && !py.isBooted) py.preload()
  if (lang === 'typescript') tsCompiler.preload()
}
