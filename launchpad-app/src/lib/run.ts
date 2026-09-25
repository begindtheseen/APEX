/* ============================================================================
   Running a piece of code, wherever it appears
   ----------------------------------------------------------------------------
   One entry point for everything that runs code outside the full playground
   page: the playground embedded in a module lesson, a runnable example in a
   lesson's text, a Learn-to-code step. It hands the code to the same
   runtimes the playground uses (lib/runtimes.ts) and returns one shape for
   every language, so an embed never needs to know how a language runs.

   This is the one file here that differs between the apps carrying the
   embed: which languages run, and how. LAUNCHPAD runs all of its languages
   in the browser. Web pages and the terminal are not "run" here — the embed
   renders a page in a preview and types into the practice shell itself.
   ========================================================================== */
import type { Lang } from '@/curriculum/types'
import { python, runCpp, runJavaScript, runSql, runTypeScript, tsCompiler, type StatusFn } from '@/lib/runtimes'

export interface CodeRun {
  stdout: string
  stderr: string
  error: string | null
  /** Python figures, as data URLs. */
  plots: string[]
  /** The value of the last expression, where the language reports one. */
  result: string | null
  /** SQL result sets, in order. */
  tables?: { columns: string[]; rows: unknown[][] }[]
  /** Set when nothing ran, and why: shown instead of an empty console. */
  notRun?: string
  ms: number
}

/** Languages an embed can run in place. */
export const EMBED_LANGS: Lang[] = ['python', 'javascript', 'typescript', 'cpp', 'sql', 'html', 'bash']

/** Maps a fenced code block's info string to a language an embed can run. */
export function langOfFence(info: string): Lang | null {
  const word = info.trim().split(/\s+/)[0]?.toLowerCase() ?? ''
  const map: Record<string, Lang> = {
    python: 'python',
    py: 'python',
    javascript: 'javascript',
    js: 'javascript',
    mjs: 'javascript',
    typescript: 'typescript',
    ts: 'typescript',
    cpp: 'cpp',
    'c++': 'cpp',
    cc: 'cpp',
    sql: 'sql',
    html: 'html',
    bash: 'bash',
    sh: 'bash',
    shell: 'bash',
    console: 'bash',
  }
  return map[word] ?? null
}

/** Whether a language runs in this app, right here. */
export function canRun(lang: Lang): boolean {
  return EMBED_LANGS.includes(lang)
}

/** Starts a runtime downloading before the first Run, where that is cheap. */
export function warm(lang: Lang): void {
  if (lang === 'python' && !python.isBooted) python.preload()
  if (lang === 'typescript') tsCompiler.preload()
}

/** Stops a run in progress, where the language can be stopped. */
export function cancel(lang: Lang): void {
  if (lang === 'python') python.cancel()
}

const empty = (ms = 0): CodeRun => ({ stdout: '', stderr: '', error: null, plots: [], result: null, ms })

/** Runs code the way the playground would, and returns what happened. */
export async function runCode(lang: Lang, code: string, opts: { stdin?: string; schema?: string; onStatus?: StatusFn } = {}): Promise<CodeRun> {
  const stdin = opts.stdin ?? ''
  switch (lang) {
    case 'javascript':
      return await runJavaScript(code)
    case 'typescript':
      return await runTypeScript(code, { onStatus: opts.onStatus })
    case 'python': {
      const lines = stdin ? stdin.replace(/\n$/, '').split('\n') : undefined
      return await python.run(code, { onStatus: opts.onStatus, ...(lines ? { stdin: lines } : {}) })
    }
    case 'cpp':
      return await runCpp(code, { stdin, onStatus: opts.onStatus })
    case 'sql': {
      const r = await runSql(code, opts.schema)
      return { ...empty(r.ms), error: r.error, tables: r.tables }
    }
    default:
      return { ...empty(), notRun: `${lang} does not run here.` }
  }
}
