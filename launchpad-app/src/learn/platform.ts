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
import { domSteps, typeCheckFailures } from './grade'
import type { Lang } from '@/curriculum/types'
import type { LearnLang, LearnLesson, LearnRun, Roadmap } from './types'

/** The languages this app teaches, in the order a beginner should meet them. */
const TAUGHT: LearnLang[] = ['bash', 'git', 'html', 'javascript', 'typescript', 'python', 'sql', 'cpp']

/*
 * Every course file in tracks/: `<lang>.txt` is a language's basics, and
 * `<lang>.<level>.txt` the courses after it. Adding a course is adding a file.
 */
const FILES = import.meta.glob('./tracks/*.txt', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const LEVEL_ORDER = ['basics', 'intermediate', 'advanced', 'expert', 'projects']

function sortKey(file: string): [number, number] {
  const [lang = '', level = 'basics'] = file.replace(/\.txt$/, '').split('.')
  return [TAUGHT.indexOf(lang as LearnLang), LEVEL_ORDER.indexOf(level)]
}

/** [file name, text] for every course this app teaches, language by language, basics first. */
export const LEARN_SOURCES: [string, string][] = Object.entries(FILES)
  .map(([path, text]): [string, string] => [path.split('/').pop()!, text])
  .filter(([file]) => sortKey(file)[0] >= 0)
  .sort((a, b) => {
    const [la, va] = sortKey(a[0])
    const [lb, vb] = sortKey(b[0])
    return la - lb || va - vb
  })

export const LEARN_LANGS: LearnLang[] = TAUGHT.filter((l) => LEARN_SOURCES.some(([f]) => f.split('.')[0] === l))

/**
 * The goals Learn to code opens on, each in the order a mentor would teach
 * it. The first is LAUNCHPAD's own order: the terminal and git (M1),
 * JavaScript and TypeScript for the product (M3–M4), the page it runs in,
 * SQL for its data (the Postgres modules) and Python for the models (M24).
 */
export const ROADMAPS: Roadmap[] = [
  {
    id: 'ai-product',
    title: 'AI Product Engineer',
    blurb: 'The order LAUNCHPAD itself teaches in: the command line and git, JavaScript and TypeScript for the product, the web page it lives in, SQL for its data and Python for its models.',
    steps: ['bash', 'git', 'javascript', 'typescript', 'html', 'sql', 'python'],
  },
  {
    id: 'software',
    title: 'Software Engineer',
    blurb: 'The ground every software job stands on: one language learned properly, the command line and git, SQL, and then C++ to see what the machine is really doing.',
    steps: ['python', 'bash', 'git', 'sql', 'cpp'],
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    blurb: 'Pages people use: HTML and CSS first, then the JavaScript that makes them react, TypeScript to keep it correct as it grows, and the tools every team works in.',
    steps: ['html', 'javascript', 'typescript', 'bash', 'git'],
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    blurb: 'The server side: the command line and git it runs on, JavaScript and TypeScript for the code that answers requests, and SQL for the data it keeps.',
    steps: ['bash', 'git', 'javascript', 'typescript', 'sql'],
  },
  {
    id: 'data',
    title: 'Data & ML',
    blurb: 'Python, the language of data work and machine learning, SQL to get the data out of where it lives, and the command line and git to keep the work reproducible.',
    steps: ['python', 'sql', 'bash', 'git'],
  },
  {
    id: 'systems',
    title: 'Systems & C++',
    blurb: 'Close to the machine: the command line and git, Python to learn to think in code, then C++ for programs that are fast and exact about memory.',
    steps: ['bash', 'git', 'python', 'cpp'],
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
/** How long a Python lesson check may run once Python is loaded. */
export const PY_LESSON_LIMIT_MS = 30_000

export async function runLearn(
  lesson: LearnLesson,
  program: string,
  opts: { onStatus?: StatusFn; shell?: ShellState } = {},
): Promise<LearnRun> {
  const { onStatus } = opts
  switch (lesson.lang) {
    case 'bash':
    case 'git':
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
    case 'typescript': {
      const out = await runTypeScript(program, { onStatus })
      // Type-error checks the compiler accepted stop the build; run the rest
      // without them so every other check is still graded.
      const t = typeCheckFailures(program, out.error)
      if (!t) return fromOutput(out)
      return { ...fromOutput(await runTypeScript(t.program, { onStatus })), typeFails: t.fails }
    }
    case 'python': {
      const stdin = lesson.stdin?.replace(/\n$/, '').split('\n')
      // The same limit as the lesson checker (verify/runners.ts): a program
      // that passes there passes here, and a slow one stops instead of spinning.
      return fromOutput(await py.run(program, { onStatus, limitMs: PY_LESSON_LIMIT_MS, ...(stdin ? { stdin } : {}) }))
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
  return lang === 'git' ? 'bash' : lang
}

/** Starts a language's runtime downloading before the first Run, where that is cheap. */
export function warmUp(lang: LearnLang): void {
  if (lang === 'python' && !py.isBooted) py.preload()
  if (lang === 'typescript') tsCompiler.preload()
}
