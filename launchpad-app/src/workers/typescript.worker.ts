/// <reference lib="webworker" />
/* ============================================================================
   LAUNCHPAD — TypeScript compiler (module worker)
   ----------------------------------------------------------------------------
   LAUNCHPAD is TypeScript-first (BET 1), and the thing TypeScript buys you is
   the check, not the syntax. So this is the real TypeScript compiler, with
   `strict` on, type-checking the learner's code before any of it runs — the
   same contract as `tsc --noEmit && node` in CI. A type error is reported the
   way tsc reports it and nothing runs; clean code is emitted as JavaScript and
   handed to the JavaScript runtime.

   The compiler (about 9 MB) and its standard library declarations are fetched
   once from a CDN the first time TypeScript is run, then cached by the
   browser. The worker stays alive between runs so the second check is fast.
   ========================================================================== */

const TS_VERSION = '6.0.3'
const MIRRORS = [
  `https://cdn.jsdelivr.net/npm/typescript@${TS_VERSION}/lib/`,
  `https://unpkg.com/typescript@${TS_VERSION}/lib/`,
]

/** The code runs in a worker, so its globals are a worker's, on ES2022. */
const ROOT_LIBS = ['lib.es2022.d.ts', 'lib.webworker.d.ts']

// The slice of the compiler API used here, typed locally so the app does not
// take a build-time dependency on the compiler it downloads at run time.
interface Diagnostic {
  category: number
}
interface SourceFile {
  text: string
}
interface Program {
  emit(
    target?: undefined,
    writeFile?: (name: string, text: string) => void,
  ): { diagnostics: readonly Diagnostic[] }
}
interface TsApi {
  version: string
  ScriptTarget: Record<string, number>
  ModuleKind: Record<string, number>
  ModuleDetectionKind: Record<string, number>
  DiagnosticCategory: Record<string, number>
  createSourceFile(
    name: string,
    text: string,
    options: { languageVersion: number; setExternalModuleIndicator?: (file: { externalModuleIndicator?: unknown }) => void },
    setParents?: boolean,
  ): SourceFile
  createProgram(opts: { rootNames: string[]; options: Record<string, unknown>; host: unknown }): Program
  getPreEmitDiagnostics(program: Program): readonly Diagnostic[]
  formatDiagnostics(diags: readonly Diagnostic[], host: unknown): string
}

const post = (m: Record<string, unknown>) => (self as unknown as Worker).postMessage(m)

let base = MIRRORS[0]!
let api: Promise<TsApi> | null = null
const libs = new Map<string, string>()

async function fetchText(path: string): Promise<string> {
  const res = await fetch(base + path)
  if (!res.ok) throw new Error(`${res.status} fetching ${path}`)
  return res.text()
}

/** Fetches a lib file and, recursively, every lib it references. */
async function loadLib(name: string): Promise<void> {
  if (libs.has(name)) return
  libs.set(name, '')
  const text = await fetchText(name)
  libs.set(name, text)
  const refs = [...text.matchAll(/\/\/\/\s*<reference\s+lib="([^"]+)"/g)].map((m) => `lib.${m[1]!.toLowerCase()}.d.ts`)
  await Promise.all(refs.map(loadLib))
}

function load(): Promise<TsApi> {
  api ??= (async () => {
    let lastError: unknown = null
    for (const mirror of MIRRORS) {
      try {
        base = mirror
        const source = await fetchText('typescript.js')
        // The compiler ships as a script that defines `ts`. An indirect eval
        // runs it in the worker's global scope and hands back the result.
        const ts = (0, eval)(`${source}\n;ts`) as TsApi | undefined
        if (!ts) throw new Error('the compiler did not define `ts`')
        libs.clear()
        await Promise.all(ROOT_LIBS.map(loadLib))
        return ts
      } catch (err) {
        lastError = err
      }
    }
    api = null
    throw new Error(
      'Could not download the TypeScript compiler from cdn.jsdelivr.net or unpkg.com. It is a one-time ~9 MB ' +
        'download the browser keeps afterwards — reconnect and press Run again.' +
        (lastError instanceof Error ? ` (${lastError.message})` : ''),
    )
  })()
  return api
}

self.onmessage = async (e: MessageEvent) => {
  const { cmd, id, source } = e.data as { cmd: string; id: number; source?: string }

  if (cmd === 'preload') {
    load().catch(() => {})
    return
  }
  if (cmd !== 'check') return

  let ts: TsApi
  try {
    post({ type: 'status', id, text: 'Loading the TypeScript compiler…' })
    ts = await load()
  } catch (err) {
    post({ type: 'failed', id, stage: 'load', diagnostics: err instanceof Error ? err.message : String(err) })
    return
  }

  const options = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    // Every buffer is a module, so top-level await type-checks the way it runs.
    moduleDetection: ts.ModuleDetectionKind.Force,
    strict: true,
    noEmitOnError: true,
    skipLibCheck: true,
    lib: ROOT_LIBS,
    types: [],
  }
  const files = new Map<string, string>([['main.ts', source ?? '']])
  let js = ''
  const host = {
    getSourceFile: (name: string) => {
      const text = files.get(name) ?? libs.get(name)
      if (text === undefined) return undefined
      // Whether a file is a module is decided as it is parsed, so the
      // learner's buffer is marked as one here — the parse-time half of
      // `moduleDetection: force`.
      return ts.createSourceFile(
        name,
        text,
        files.has(name)
          ? { languageVersion: ts.ScriptTarget.ES2022, setExternalModuleIndicator: (f) => void (f.externalModuleIndicator = true) }
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
    fileExists: (name: string) => files.has(name) || libs.has(name),
    readFile: (name: string) => files.get(name) ?? libs.get(name),
    getCanonicalFileName: (name: string) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
  }

  post({ type: 'status', id, text: 'Type-checking…' })
  const program = ts.createProgram({ rootNames: ['main.ts'], options, host })
  const diagnostics = ts.getPreEmitDiagnostics(program)
  const errors = diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error)
  const text = diagnostics.length ? ts.formatDiagnostics(diagnostics, host) : ''

  if (errors.length) {
    post({ type: 'failed', id, stage: 'check', diagnostics: text, count: errors.length })
    return
  }

  program.emit(undefined, host.writeFile)
  // `moduleDetection: force` adds an empty export to make the file a module;
  // the JavaScript runtime runs the body of a function, where it cannot stand.
  js = js.replace(/^export \{\};?\s*$/m, '')
  post({ type: 'compiled', id, js, diagnostics: text, version: ts.version })
}
