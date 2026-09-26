/* ============================================================================
   The lesson checker's runtimes, in Node
   ----------------------------------------------------------------------------
   The same runtimes the app uses, driven from Node so hundreds of lessons can
   be checked in minutes with no UI: Pyodide, the TypeScript compiler, sql.js
   and clang compiled to WebAssembly from the repo's node_modules, a worker
   thread standing in for the browser's JavaScript worker, and Chromium for
   web pages. Each mirrors its browser worker (see src/workers/) closely
   enough that a lesson passing here passes in the app; the browser suite
   (test/browser/learn.js) then proves it through the real UI.
   ========================================================================== */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'
import { buildPage } from '@/lib/web'

const here = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

export interface Out {
  stdout: string
  stderr: string
  error: string | null
  tables?: { columns: string[]; rows: unknown[][] }[]
}

const LIMIT_MS = 10_000

/* ── Python: one long-lived Pyodide thread, replaced when a run overruns ── */

let py: { worker: Worker; ready: Promise<void>; seq: number } | null = null

function pyWorker() {
  if (!py) {
    const worker = new Worker(join(here, 'python.worker.mjs'))
    const ready = new Promise<void>((res) => worker.once('message', () => res()))
    py = { worker, ready, seq: 0 }
  }
  return py
}

export async function runPython(code: string, stdin?: string[]): Promise<Out> {
  const w = pyWorker()
  await w.ready
  const id = ++w.seq
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      w.worker.off('message', onMsg)
      void w.worker.terminate()
      py = null
      resolve({ stdout: '', stderr: '', error: `Still running after ${LIMIT_MS / 1000} seconds, so it was stopped.` })
    }, LIMIT_MS * 3)
    const onMsg = (m: Out & { id: number }) => {
      if (m.id !== id) return
      clearTimeout(timer)
      w.worker.off('message', onMsg)
      resolve(m)
    }
    w.worker.on('message', onMsg)
    w.worker.postMessage({ id, code, stdin })
  })
}

/* ── JavaScript: a thread per run, like the browser's throwaway worker ──── */

export function runJs(code: string): Promise<Out> {
  return new Promise((resolve) => {
    const worker = new Worker(join(here, 'javascript.worker.mjs'), { workerData: { code } })
    const timer = setTimeout(() => {
      void worker.terminate()
      resolve({ stdout: '', stderr: '', error: `Still running after ${LIMIT_MS / 1000} seconds, so it was stopped.` })
    }, LIMIT_MS)
    worker.once('message', (m: Out) => {
      clearTimeout(timer)
      void worker.terminate()
      resolve(m)
    })
    worker.once('error', (e) => {
      clearTimeout(timer)
      resolve({ stdout: '', stderr: '', error: String(e) })
    })
  })
}

/* ── TypeScript: the real compiler, the app's options, then the JS thread ── */

type TS = typeof import('typescript')
let tsMod: TS | null = null
const libCache = new Map<string, string>()

export async function runTs(code: string): Promise<Out> {
  tsMod ??= (await import('typescript')).default as unknown as TS
  const ts = tsMod
  const libDir = dirname(require.resolve('typescript/lib/lib.d.ts'))
  const lib = (name: string) => {
    if (!libCache.has(name)) {
      try {
        libCache.set(name, readFileSync(join(libDir, name), 'utf8'))
      } catch {
        libCache.set(name, '')
      }
    }
    return libCache.get(name)!
  }
  const options = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleDetection: ts.ModuleDetectionKind.Force,
    strict: true,
    noEmitOnError: true,
    skipLibCheck: true,
    lib: ['lib.es2022.d.ts', 'lib.webworker.d.ts'],
    types: [],
  }
  let js = ''
  const host = {
    getSourceFile: (name: string) => {
      const text = name === 'main.ts' ? code : lib(name)
      return ts.createSourceFile(
        name,
        text,
        name === 'main.ts'
          ? { languageVersion: ts.ScriptTarget.ES2022, setExternalModuleIndicator: (f: unknown) => void ((f as { externalModuleIndicator?: unknown }).externalModuleIndicator = true) }
          : { languageVersion: ts.ScriptTarget.ES2022 },
        true,
      )
    },
    getDefaultLibFileName: () => 'lib.es2022.d.ts',
    getDefaultLibLocation: () => '',
    writeFile: (name: string, text: string) => {
      if (name.endsWith('.js')) js = text
    },
    getCurrentDirectory: () => '',
    getDirectories: () => [],
    fileExists: (name: string) => name === 'main.ts' || lib(name) !== '',
    readFile: (name: string) => (name === 'main.ts' ? code : lib(name)),
    getCanonicalFileName: (name: string) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
  }
  const program = ts.createProgram({ rootNames: ['main.ts'], options, host: host as never })
  const diags = ts.getPreEmitDiagnostics(program)
  if (diags.some((d) => d.category === ts.DiagnosticCategory.Error)) {
    return {
      stdout: '',
      stderr: '',
      error: `Type errors, so nothing ran — the same stop \`tsc --noEmit\` puts in front of CI:\n\n${ts.formatDiagnostics(diags, host as never).trim()}`,
    }
  }
  program.emit(undefined, host.writeFile as never)
  return runJs(js.replace(/^export \{\};?\s*$/m, ''))
}

/* ── SQL: sql.js, a fresh database per run ──────────────────────────────── */

type SqlJs = { Database: new () => { run(s: string): void; exec(s: string): { columns: string[]; values: unknown[][] }[]; close(): void } }
let sqlJs: Promise<SqlJs> | null = null

export async function runSqlNode(sql: string, schema?: string): Promise<Out> {
  sqlJs ??= (require('sql.js') as (o?: object) => Promise<SqlJs>)()
  const SQL = await sqlJs
  const db = new SQL.Database()
  try {
    if (schema) db.run(schema)
    const out = db.exec(sql)
    return { stdout: '', stderr: '', error: null, tables: out.map((t) => ({ columns: t.columns, rows: t.values })) }
  } catch (e) {
    return { stdout: '', stderr: '', error: e instanceof Error ? e.message : String(e), tables: [] }
  } finally {
    db.close()
  }
}

/* ── C++: clang in WebAssembly, the app's flags, then a WASI thread ─────── */

type RunClang = (args: string[], files: Record<string, unknown>, o?: { stdout?: (b: Uint8Array | null) => void; stderr?: (b: Uint8Array | null) => void }) => Promise<Record<string, unknown>>
let clang: Promise<RunClang> | null = null
const CXX_FLAGS = ['-std=c++20', '-O1', '-Wall', '-Wextra', '-fno-exceptions', '-fno-color-diagnostics']

export async function runCppNode(code: string, stdin = ''): Promise<Out> {
  // Named through a variable: the compiler package is a root devDependency the
  // app's own typecheck does not install, and only this Node-side checker uses it.
  const pkg: string = '@yowasp/clang'
  clang ??= import(/* @vite-ignore */ pkg).then((m) => (m as { runClang: RunClang }).runClang)
  const runClang = await clang
  let diag = ''
  const dec = new TextDecoder()
  const collect = (b: Uint8Array | null) => (diag += b ? dec.decode(b, { stream: true }) : '')
  let wasm: unknown
  try {
    const out = await runClang(['clang++', ...CXX_FLAGS, 'main.cpp', '-o', 'main.wasm'], { 'main.cpp': code }, { stdout: collect, stderr: collect })
    wasm = out['main.wasm']
  } catch {
    wasm = null
  }
  if (!(wasm instanceof Uint8Array)) return { stdout: '', stderr: '', error: `It did not compile:\n\n${diag.trim()}` }
  return new Promise((resolve) => {
    const worker = new Worker(join(here, 'wasi.worker.mjs'), { workerData: { wasm, stdin } })
    const timer = setTimeout(() => {
      void worker.terminate()
      resolve({ stdout: '', stderr: '', error: `Still running after ${LIMIT_MS / 1000} seconds, so it was stopped.` })
    }, LIMIT_MS)
    worker.once('message', (m: Out) => {
      clearTimeout(timer)
      void worker.terminate()
      resolve(m)
    })
  })
}

/* ── Web: Chromium, each check in a fresh sandboxed frame ───────────────── */

type Page = { evaluate<T, A>(fn: (a: A) => T | Promise<T>, arg: A): Promise<T>; setContent(html: string): Promise<void> }
let browser: Promise<{ page: Page; close: () => Promise<void> }> | null = null

async function webPage() {
  browser ??= (async () => {
    const { chromium } = require('playwright') as { chromium: { launch(o: object): Promise<{ newPage(): Promise<Page>; close(): Promise<void> }> } }
    const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch({}))
    const page = await b.newPage()
    await page.setContent('<!doctype html><html><body></body></html>')
    return { page, close: () => b.close() }
  })()
  return browser
}

export async function runWeb(html: string, checks: string[][]): Promise<{ logs: string[]; results: { pass: boolean; detail?: string }[] }> {
  const { page } = await webPage()
  const runs = await Promise.all(
    (checks.length ? checks : [[]]).map((steps, i) => {
      const channel = `verify-${Date.now()}-${i}-${Math.random().toString(36).slice(2)}`
      const doc = buildPage(html, channel, [steps])
      return page.evaluate(
        ([srcdoc, ch]: [string, string]) =>
          new Promise<{ logs: string[]; result: { pass: boolean; detail?: string } | null }>((resolve) => {
            const frame = document.createElement('iframe')
            frame.setAttribute('sandbox', 'allow-scripts allow-modals')
            // The same box the app checks in (lib/web.ts), so layout, focus and timing behave alike.
            frame.style.cssText = 'position:fixed;left:0;top:0;width:800px;height:600px;border:0;opacity:0.01;pointer-events:none;z-index:-1'
            const logs: string[] = []
            const done = (result: { pass: boolean; detail?: string } | null) => {
              removeEventListener('message', onMsg)
              frame.remove()
              resolve({ logs, result })
            }
            const onMsg = (e: MessageEvent) => {
              const m = e.data as { channel?: string; type?: string; text?: string; results?: { pass: boolean; detail?: string }[] }
              if (!m || m.channel !== ch) return
              if (m.type === 'console') logs.push(m.text ?? '')
              if (m.type === 'checks') done(m.results?.[0] ?? { pass: true })
            }
            addEventListener('message', onMsg)
            setTimeout(() => done(null), 6000)
            frame.srcdoc = srcdoc
            document.body.appendChild(frame)
          }),
        [doc, channel] as [string, string],
      )
    }),
  )
  return {
    logs: runs[0]!.logs,
    results: checks.length ? runs.map((r) => r.result ?? { pass: false, detail: 'The page did not finish loading in time, so this was not checked.' }) : [],
  }
}

/** Ends the threads and the browser so the test process can exit. */
export async function closeRunners(): Promise<void> {
  if (py) await py.worker.terminate()
  py = null
  if (browser) await (await browser).close()
  browser = null
}
