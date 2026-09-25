/* ============================================================================
   LAUNCHPAD — language runtimes
   ----------------------------------------------------------------------------
   The playground carries JavaScript, TypeScript, Python, SQL, C++, the web
   and a practice terminal, and every one of them really runs, in this tab:

     JavaScript  the browser's own engine, in a throwaway worker (M1–M3)
     TypeScript  the real TypeScript compiler, strict, type-checks first and
                 then runs the emitted JavaScript (M4 onward — BET 1)
     Python      CPython compiled to WebAssembly by Pyodide (M24)
     SQL         SQLite compiled to WebAssembly (the Postgres modules' queries)
     C++         clang++ and lld compiled to WebAssembly: a real compile to a
                 WASI program, run in a throwaway worker with stdin/stdout

     Web         HTML, CSS and JavaScript rendered in a sandboxed frame
     Terminal    a practice shell that lives in the page (lib/shell.ts): a
                 pretend filesystem and enough git to learn the loop — and
                 it says so, because it is not the machine's shell

   Nothing is uploaded. The compilers come to the browser, once, from a CDN,
   and the browser caches them. MATLAB, Simulink and Rust are not offered:
   none of them could run here, and a playground entry that cannot run is
   worse than none. The real terminal work of M1 happens on your own machine.

   Learn mode (src/learn) teaches the basics of all of them through these
   same runtimes.

   The rule underneath all of it: never show a green tick that does not mean
   what it appears to mean.
   ========================================================================== */
import type { Lang } from '@/curriculum/types'

export type RunMode = 'execute' | 'reference'

export interface LangInfo {
  id: Lang
  label: string
  mode: RunMode
  /** Shown under the run button so nobody is misled about what just happened. */
  note: string
}

export const LANGS: Record<Lang, LangInfo> = {
  javascript: {
    id: 'javascript',
    label: 'JavaScript',
    mode: 'execute',
    note: 'Runs for real in this browser’s own JavaScript engine, in a worker thrown away after each run. Top-level await works and timers are waited for. It is not Node: there is no require, fs or process.',
  },
  typescript: {
    id: 'typescript',
    label: 'TypeScript',
    mode: 'execute',
    note: 'Type-checked for real by the TypeScript compiler in strict mode, then run as JavaScript. A type error stops the run, the way `tsc --noEmit` stops CI. The compiler is a one-time ~9 MB download.',
  },
  python: {
    id: 'python',
    label: 'Python',
    mode: 'execute',
    note: 'Runs for real — CPython compiled to WebAssembly, with NumPy, pandas and Matplotlib available on demand.',
  },
  sql: {
    id: 'sql',
    label: 'SQL',
    mode: 'execute',
    note: 'Runs for real against SQLite compiled to WebAssembly. Each run gets a fresh in-memory database seeded with a users and requests table. SQLite, not Postgres: joins, aggregates and window functions carry over; Postgres-only syntax does not.',
  },
  cpp: {
    id: 'cpp',
    label: 'C++',
    mode: 'execute',
    note: 'Compiled for real by clang++ (C++20, -Wall) and run in this browser, with the input box as standard input. Exceptions are off in this toolchain, so throw and try do not compile. The compiler is a one-time download of about 105 MB before compression.',
  },
  html: {
    id: 'html',
    label: 'Web',
    mode: 'execute',
    note: 'HTML, CSS and JavaScript rendered live in a sandboxed frame: scripts run, but the page cannot reach this app, its storage or the network beyond what a normal page could load. console.log shows in the Console tab.',
  },
  bash: {
    id: 'bash',
    label: 'Terminal',
    mode: 'execute',
    note: 'A practice terminal that lives in this page: a pretend filesystem with the everyday commands and enough git to practise the loop. Nothing typed here touches your real machine — for that, use a real terminal.',
  },
  text: {
    id: 'text',
    label: 'Notes',
    mode: 'reference',
    note: 'Free-form notes — nothing here is executed or checked. Use it for deltas, derivations and anything you want to keep with the module.',
  },
}

/** The languages the playground offers, in the order the curriculum meets them. */
export const RUNNABLE: Lang[] = ['javascript', 'typescript', 'python', 'sql', 'cpp', 'html', 'bash']

export interface Capability {
  mode: RunMode
  /** Shown under the run button. Always true of what just happened. */
  note: string
}

/** What a language does when Run is pressed. Every runnable one executes. */
export function capabilityOf(lang: Lang): Capability {
  const info = LANGS[lang]
  return { mode: info.mode, note: info.note }
}

export interface SolutionCheck {
  /** Whether her program produced the same output as the reference. */
  pass: boolean
  detail: string
  yours: RunOutput
  /** Absent when the reference itself failed to build or run. */
  reference?: RunOutput
}

/**
 * Grades a whole-program C++ exercise by running it against the reference.
 * Both really compile and execute, so a pass means her program printed that
 * output — not that its text resembled something. A reference that will not
 * build is reported as the exercise's fault, never as hers.
 */
export async function runAgainstSolution(code: string, solution: string, stdin?: string): Promise<SolutionCheck> {
  const yours = await runCpp(code, { stdin })
  if (yours.error) return { pass: false, detail: yours.error, yours }

  const reference = await runCpp(solution, { stdin })
  if (reference.error) {
    return {
      pass: false,
      detail:
        'Your program ran, but the reference solution for this exercise did not build here, so there is nothing to compare against. That is a fault in the exercise, not in your code.',
      yours,
      reference,
    }
  }

  const check = checkOutput(yours.stdout, reference.stdout)
  return {
    pass: check.pass,
    detail: check.pass ? 'Your output matches the reference solution exactly.' : check.detail,
    yours,
    reference,
  }
}

/* ── Compilers that live in a worker ─────────────────────────────────────────
   The C++ and TypeScript compilers are large, so each lives in one worker
   that is created on first use and kept: loading it is the expensive part,
   and a compile always finishes. What they produce is run elsewhere, in a
   worker thrown away after each run, so a program that never ends can be
   stopped without throwing the compiler away with it. */

interface CompileReply {
  type: 'compiled' | 'failed'
  stage?: 'load' | 'compile' | 'check'
  diagnostics: string
  wasm?: ArrayBuffer
  js?: string
}

class CompilerWorker {
  private worker: Worker | null = null
  private nextId = 1
  private waiting = new Map<number, { resolve: (r: CompileReply) => void; onStatus?: StatusFn }>()

  private readonly create: () => Worker
  private readonly verb: string
  private readonly crashed: string

  constructor(create: () => Worker, verb: string, crashed: string) {
    this.create = create
    this.verb = verb
    this.crashed = crashed
  }

  private ensure(): Worker {
    if (this.worker) return this.worker
    const w = this.create()
    w.onmessage = (e: MessageEvent) => {
      const msg = e.data as Omit<CompileReply, 'type'> & { type: CompileReply['type'] | 'status'; id: number; text?: string }
      const entry = this.waiting.get(msg.id)
      if (!entry) return
      if (msg.type === 'status') {
        entry.onStatus?.(msg.text ?? '')
        return
      }
      this.waiting.delete(msg.id)
      entry.resolve({ ...msg, type: msg.type })
    }
    w.onerror = (e) => {
      e.preventDefault()
      this.reset(this.crashed)
    }
    this.worker = w
    return w
  }

  /** Throws the worker away and fails whatever was waiting on it. */
  private reset(message: string): void {
    this.worker?.terminate()
    this.worker = null
    for (const [, entry] of this.waiting) entry.resolve({ type: 'failed', stage: 'load', diagnostics: message })
    this.waiting.clear()
  }

  /** Starts downloading the compiler without compiling anything. */
  preload(): void {
    this.ensure().postMessage({ cmd: 'preload' })
  }

  compile(source: string, onStatus?: StatusFn): Promise<CompileReply> {
    const w = this.ensure()
    const id = this.nextId++
    return new Promise<CompileReply>((resolve) => {
      this.waiting.set(id, { resolve, onStatus })
      w.postMessage({ cmd: this.verb, id, source })
    })
  }
}

export const cppCompiler = new CompilerWorker(
  () => new Worker(new URL('../workers/cpp.worker.ts', import.meta.url), { type: 'module' }),
  'compile',
  'The C++ compiler stopped unexpectedly (most often the tab ran short of memory). Press Run again to reload it.',
)

export const tsCompiler = new CompilerWorker(
  () => new Worker(new URL('../workers/typescript.worker.ts', import.meta.url), { type: 'module' }),
  'check',
  'The TypeScript compiler stopped unexpectedly. Press Run again to reload it.',
)

/* ── C++ ─────────────────────────────────────────────────────────────────── */

export const CPP_TIME_LIMIT_MS = 10_000

/**
 * Compiles with clang++ in the browser, then runs the program in a fresh
 * worker with `stdin` as its standard input. A compile error comes back in
 * `error`, exactly as clang printed it; warnings on a program that did build
 * are shown with its output.
 */
export async function runCpp(
  code: string,
  opts: { stdin?: string; onStatus?: StatusFn; timeLimitMs?: number } = {},
): Promise<RunOutput> {
  const started = Date.now()
  const out: RunOutput = { stdout: '', stderr: '', plots: [], result: null, error: null, ms: 0 }

  const built = await cppCompiler.compile(code, opts.onStatus)
  if (built.type === 'failed' || !built.wasm) {
    out.error =
      built.stage === 'compile'
        ? `It did not compile:\n\n${built.diagnostics.trim()}`
        : built.diagnostics.trim() || 'The C++ compiler could not be loaded.'
    out.ms = Date.now() - started
    return out
  }
  if (built.diagnostics.trim()) out.stderr += `${built.diagnostics.trim()}\n\n`
  opts.onStatus?.('Running…')

  const limit = opts.timeLimitMs ?? CPP_TIME_LIMIT_MS
  return new Promise<RunOutput>((resolve) => {
    let worker: Worker
    try {
      worker = new Worker(new URL('../workers/wasi.worker.ts', import.meta.url), { type: 'module' })
    } catch (err) {
      out.error = err instanceof Error ? err.message : String(err)
      out.ms = Date.now() - started
      resolve(out)
      return
    }
    const finish = (error?: string) => {
      clearTimeout(timer)
      worker.terminate()
      if (error) out.error = error
      out.ms = Date.now() - started
      resolve(out)
    }
    const timer = setTimeout(
      () =>
        finish(
          `Still running after ${Math.round(limit / 1000)} seconds, so it was stopped. A loop that never ends, or a read from standard input that is waiting for more, does this.`,
        ),
      limit,
    )
    worker.onmessage = (e: MessageEvent) => {
      const msg = e.data as { type: string; text?: string; code?: number; message?: string }
      if (msg.type === 'stdout') out.stdout += msg.text ?? ''
      else if (msg.type === 'stderr') out.stderr += msg.text ?? ''
      else if (msg.type === 'exit') {
        if (msg.code) out.result = `exit code ${msg.code}`
        finish()
      } else if (msg.type === 'trap') {
        finish(
          `The program crashed: ${msg.message}. abort(), a failed assert, an out-of-range .at(), dividing an integer by zero and reading memory the program does not own all end this way.`,
        )
      }
    }
    worker.onerror = (e) => {
      e.preventDefault()
      finish(e.message || 'The program runner failed to start.')
    }
    const wasm = built.wasm!
    worker.postMessage({ cmd: 'run', id: 1, wasm, stdin: opts.stdin ?? '' }, [wasm])
  })
}

/* ── TypeScript ──────────────────────────────────────────────────────────── */

/**
 * Type-checks with the real compiler (strict), and only when that is clean
 * runs the emitted JavaScript in the JavaScript runtime. Type errors come
 * back in `error`, formatted the way tsc prints them.
 */
export async function runTypeScript(code: string, opts: { onStatus?: StatusFn } = {}): Promise<RunOutput> {
  const started = Date.now()
  const checked = await tsCompiler.compile(code, opts.onStatus)
  if (checked.type === 'failed' || checked.js === undefined) {
    const out: RunOutput = { stdout: '', stderr: '', plots: [], result: null, error: null, ms: 0 }
    out.error =
      checked.stage === 'check'
        ? `Type errors, so nothing ran — the same stop \`tsc --noEmit\` puts in front of CI:\n\n${checked.diagnostics.trim()}`
        : checked.diagnostics.trim() || 'The TypeScript compiler could not be loaded.'
    out.ms = Date.now() - started
    return out
  }
  opts.onStatus?.('Running…')
  const ran = await runJavaScript(checked.js)
  ran.ms = Date.now() - started
  return ran
}

/* ── Python ──────────────────────────────────────────────────────────────── */

export interface RunOutput {
  stdout: string
  stderr: string
  plots: string[]
  result: string | null
  error: string | null
  ms: number
}

export type StatusFn = (text: string) => void

/**
 * A single Pyodide worker, created lazily and reused.
 *
 * Cancellation terminates the worker outright. That throws away a ~7 second
 * boot, but the alternative (an interrupt buffer) requires cross-origin
 * isolation the deploy target cannot guarantee, and an uncancellable infinite
 * loop is a far worse outcome than a slow restart.
 */
class PythonRuntime {
  private worker: Worker | null = null
  private nextId = 1
  private pending: {
    id: number
    resolve: (o: RunOutput) => void
    out: RunOutput
    startedAt: number
  } | null = null
  private onStatus: StatusFn | null = null
  private booted = false

  get isBooted(): boolean {
    return this.booted
  }

  private ensure(): Worker {
    if (this.worker) return this.worker
    const w = new Worker(new URL('../workers/python.worker.ts', import.meta.url), {
      type: 'module',
    })
    w.onmessage = (e: MessageEvent) => this.handle(e.data)
    w.onerror = () => {
      this.fail('The Python runtime failed to start. Check your network connection and reload.')
    }
    this.worker = w
    return w
  }

  private handle(msg: Record<string, unknown>): void {
    const type = msg.type as string

    if (type === 'status') {
      this.onStatus?.(String(msg.text))
      return
    }
    if (type === 'ready') {
      this.booted = true
      this.onStatus?.('')
      return
    }
    if (type === 'fatal') {
      this.fail(String(msg.message))
      return
    }

    const p = this.pending
    if (!p || msg.id !== p.id) return

    switch (type) {
      case 'stdout':
        p.out.stdout += String(msg.text)
        break
      case 'stderr':
        p.out.stderr += String(msg.text)
        break
      case 'plot':
        p.out.plots.push(String(msg.png))
        break
      case 'result':
        p.out.result = msg.repr == null ? null : String(msg.repr)
        this.settle()
        break
      case 'error':
        p.out.error = String(msg.message)
        this.settle()
        break
    }
  }

  private settle(): void {
    const p = this.pending
    if (!p) return
    this.pending = null
    p.out.ms = Date.now() - p.startedAt
    p.resolve(p.out)
  }

  private fail(message: string): void {
    const p = this.pending
    this.pending = null
    this.booted = false
    this.worker?.terminate()
    this.worker = null
    if (p) {
      p.out.error = message
      p.out.ms = Date.now() - p.startedAt
      p.resolve(p.out)
    } else {
      this.onStatus?.(message)
    }
  }

  /** Starts downloading the runtime without running anything. */
  preload(onStatus?: StatusFn): void {
    if (onStatus) this.onStatus = onStatus
    this.ensure().postMessage({ cmd: 'init' })
  }

  run(
    code: string,
    opts: { stdin?: string[]; packages?: string[]; onStatus?: StatusFn } = {},
  ): Promise<RunOutput> {
    if (opts.onStatus) this.onStatus = opts.onStatus
    if (this.pending) this.cancel()

    const w = this.ensure()
    const id = this.nextId++

    return new Promise<RunOutput>((resolve) => {
      this.pending = {
        id,
        resolve,
        startedAt: Date.now(),
        out: { stdout: '', stderr: '', plots: [], result: null, error: null, ms: 0 },
      }
      w.postMessage({ cmd: 'run', id, code, stdin: opts.stdin, packages: opts.packages })
    })
  }

  /** Kills the worker. The next run pays the boot cost again. */
  cancel(): void {
    const p = this.pending
    this.pending = null
    this.worker?.terminate()
    this.worker = null
    this.booted = false
    if (p) {
      p.out.error = 'Stopped.'
      p.out.ms = Date.now() - p.startedAt
      p.resolve(p.out)
    }
  }
}

export const python = new PythonRuntime()

/* ── JavaScript ──────────────────────────────────────────────────────────────
   A fresh worker per run: starting one costs a millisecond, so there is no
   boot to protect, and a worker that is always thrown away can never carry
   one run's globals into the next. A run that has not finished — an interval
   never cleared, a loop that never ends — is stopped at the time limit with
   whatever it printed so far. */

export const JS_TIME_LIMIT_MS = 10_000

export function runJavaScript(code: string, timeLimitMs = JS_TIME_LIMIT_MS): Promise<RunOutput> {
  const started = Date.now()
  const out: RunOutput = { stdout: '', stderr: '', plots: [], result: null, error: null, ms: 0 }
  return new Promise<RunOutput>((resolve) => {
    let worker: Worker
    try {
      worker = new Worker(new URL('../workers/javascript.worker.ts', import.meta.url), { type: 'module' })
    } catch (err) {
      out.error = err instanceof Error ? err.message : String(err)
      resolve(out)
      return
    }
    const finish = (error?: string) => {
      clearTimeout(timer)
      worker.terminate()
      if (error) out.error = error
      out.ms = Date.now() - started
      resolve(out)
    }
    const timer = setTimeout(
      () =>
        finish(
          `Still running after ${Math.round(timeLimitMs / 1000)} seconds, so it was stopped. An interval that is never cleared, or a loop that never ends, does this.`,
        ),
      timeLimitMs,
    )
    worker.onmessage = (e: MessageEvent) => {
      const msg = e.data as { type: string; text?: string; repr?: string | null; message?: string }
      if (msg.type === 'stdout') out.stdout += msg.text ?? ''
      else if (msg.type === 'stderr') out.stderr += msg.text ?? ''
      else if (msg.type === 'result') {
        out.result = msg.repr ?? null
        finish()
      } else if (msg.type === 'error') finish(msg.message ?? 'It did not run.')
    }
    worker.onerror = (e) => {
      e.preventDefault()
      finish(e.message || 'The JavaScript worker failed to start.')
    }
    worker.postMessage({ cmd: 'run', id: 1, code })
  })
}

/* ── SQL ─────────────────────────────────────────────────────────────────────
   sql.js, on the main thread rather than in a worker.

   That is a deliberate exception to the "heavy work goes in a worker" rule:
   the runtime is 700KB rather than 13MB, and the queries a SQL lesson runs are
   over tables of a few dozen rows. Moving it to a worker would buy protection
   against a pathological cartesian join and cost a message-passing layer for
   every result set. The UI cost of being wrong here is a few milliseconds. */

const SQLJS_VERSION = '1.14.2'
const SQLJS_BASE = `https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist/`

interface SqlJsDatabase {
  run(sql: string): void
  exec(sql: string): { columns: string[]; values: unknown[][] }[]
  close(): void
}

interface SqlJsStatic {
  Database: new (data?: Uint8Array) => SqlJsDatabase
}

declare global {
  interface Window {
    initSqlJs?: (cfg: { locateFile: (f: string) => string }) => Promise<SqlJsStatic>
  }
}

let sqlPromise: Promise<SqlJsStatic> | null = null

function loadSqlJs(): Promise<SqlJsStatic> {
  if (sqlPromise) return sqlPromise

  sqlPromise = new Promise<SqlJsStatic>((resolve, reject) => {
    // sql.js ships as UMD, so a script tag is the path of least resistance;
    // importing it as ESM fights the bundler over its .wasm sidecar.
    const existing = window.initSqlJs
    if (existing) {
      void existing({ locateFile: (f) => SQLJS_BASE + f }).then(resolve, reject)
      return
    }

    const s = document.createElement('script')
    s.src = `${SQLJS_BASE}sql-wasm.js`
    s.async = true
    s.onload = () => {
      if (!window.initSqlJs) {
        reject(new Error('sql.js loaded but did not register itself.'))
        return
      }
      window
        .initSqlJs({ locateFile: (f) => SQLJS_BASE + f })
        .then(resolve)
        .catch(reject)
    }
    s.onerror = () =>
      reject(
        new Error(
          'Could not reach the SQLite runtime on cdn.jsdelivr.net. It is a one-time ~700 KB ' +
            'download — check your connection, or whether something is blocking that host.',
        ),
      )
    document.head.appendChild(s)
  }).catch((e) => {
    sqlPromise = null
    throw e
  })

  return sqlPromise
}

export interface SqlResult {
  tables: { columns: string[]; rows: unknown[][] }[]
  error: string | null
  ms: number
}

/**
 * Runs SQL against a fresh in-memory database seeded with `schema`.
 *
 * Fresh every time is the right call for teaching: an exercise that depends on
 * whatever the previous one left behind is not reproducible, and a learner who
 * breaks their table should be one re-run away from a clean slate.
 */
export async function runSql(sql: string, schema?: string): Promise<SqlResult> {
  const started = Date.now()
  try {
    const SQL = await loadSqlJs()
    const db = new SQL.Database()
    try {
      if (schema) db.run(schema)
      const out = db.exec(sql)
      return {
        tables: out.map((t) => ({ columns: t.columns, rows: t.values })),
        error: null,
        ms: Date.now() - started,
      }
    } finally {
      db.close()
    }
  } catch (e) {
    return {
      tables: [],
      error: e instanceof Error ? e.message : String(e),
      ms: Date.now() - started,
    }
  }
}

/* ── Output checking (C++ exercises graded against a reference) ─────────── */

export interface CheckResult {
  pass: boolean
  detail: string
}

/**
 * Compares a learner's stated output against the expected one, normalising
 * trailing whitespace and line endings but nothing else. Being lenient about
 * significant whitespace would hide real bugs.
 */
export function checkOutput(actual: string, expected: string): CheckResult {
  const norm = (s: string) =>
    s
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((l) => l.replace(/\s+$/, ''))
      .join('\n')
      .replace(/\n+$/, '')

  const a = norm(actual)
  const b = norm(expected)
  if (a === b) return { pass: true, detail: 'Output matches.' }

  const al = a.split('\n')
  const bl = b.split('\n')
  for (let i = 0; i < Math.max(al.length, bl.length); i++) {
    if (al[i] !== bl[i]) {
      return {
        pass: false,
        detail: `First difference on line ${i + 1}:\n  expected: ${bl[i] ?? '(nothing)'}\n  actual:   ${al[i] ?? '(nothing)'}`,
      }
    }
  }
  return { pass: false, detail: 'Output differs.' }
}

/**
 * Builds the Python source for a test run: the learner's code, then each
 * assertion. Assertions are appended rather than run separately so they see
 * the learner's own definitions.
 */
export function buildTestProgram(code: string, tests: { name: string; assert: string }[]): string {
  const harness = tests
    .map(
      (t, i) => `
try:
${indent(t.assert, 4)}
    print("PASS ${i}: ${escape(t.name)}")
except AssertionError as _e:
    print("FAIL ${i}: ${escape(t.name)} — " + (str(_e) or "assertion failed"))
except Exception as _e:
    print("ERROR ${i}: ${escape(t.name)} — " + type(_e).__name__ + ": " + str(_e))
`,
    )
    .join('')

  return `${code}\n\nprint("__ORBIT_TESTS__")\n${harness}`
}

export interface TestOutcome {
  name: string
  status: 'pass' | 'fail' | 'error'
  message?: string
}

export function parseTestOutput(
  stdout: string,
  tests: { name: string }[],
): { userOutput: string; outcomes: TestOutcome[] } {
  const marker = '__ORBIT_TESTS__'
  const at = stdout.indexOf(marker)
  const userOutput = at >= 0 ? stdout.slice(0, at) : stdout
  const tail = at >= 0 ? stdout.slice(at + marker.length) : ''

  const outcomes: TestOutcome[] = tests.map((t) => ({ name: t.name, status: 'error' as const }))
  for (const line of tail.split('\n')) {
    const m = /^(PASS|FAIL|ERROR) (\d+): (.*)$/.exec(line.trim())
    if (!m) continue
    const idx = Number(m[2])
    const entry = outcomes[idx]
    if (!entry) continue
    entry.status = m[1] === 'PASS' ? 'pass' : m[1] === 'FAIL' ? 'fail' : 'error'
    const rest = m[3] ?? ''
    const dash = rest.indexOf('—')
    if (dash >= 0) entry.message = rest.slice(dash + 1).trim()
  }
  return { userOutput, outcomes }
}

function indent(s: string, n: number): string {
  const pad = ' '.repeat(n)
  return s
    .split('\n')
    .map((l) => pad + l)
    .join('\n')
}

function escape(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
