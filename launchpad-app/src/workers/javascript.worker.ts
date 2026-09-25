/// <reference lib="webworker" />
/* ============================================================================
   LAUNCHPAD — JavaScript runtime (module worker)
   ----------------------------------------------------------------------------
   LAUNCHPAD teaches JavaScript first — M1 starts from an empty file, M3 takes
   the event loop apart — and a browser already carries a JavaScript engine, so
   this runs the learner's code for real rather than comparing text.

   One worker per run, thrown away afterwards, so nothing one run defines can
   leak into the next and an infinite loop is ended by terminating the worker.
   The code runs as the body of an async function, so top-level `await` works.
   A run is over when the body has finished AND every timer it scheduled has
   fired or been cleared: an event-loop exercise that prints from a
   setTimeout(…, 0) after its synchronous lines has to show both, in order.

   What it is not: Node. There is no `require`, no `fs`, no `process`. The
   playground says so under the run button.
   ========================================================================== */

type Out = { type: 'stdout' | 'stderr'; id: number; text: string }

const post = (m: Record<string, unknown>) => (self as unknown as Worker).postMessage(m)

/** A readable rendering of any value, close to what Node's console prints. */
function show(v: unknown, depth = 0, seen: WeakSet<object> = new WeakSet()): string {
  if (typeof v === 'string') return depth === 0 ? v : JSON.stringify(v)
  if (v === undefined) return 'undefined'
  if (v === null) return 'null'
  if (typeof v === 'bigint') return `${v}n`
  if (typeof v === 'symbol') return v.toString()
  if (typeof v === 'function') return `[Function: ${v.name || '(anonymous)'}]`
  if (typeof v !== 'object') return String(v)
  if (v instanceof Error) return v.stack && depth === 0 ? v.stack : `${v.name}: ${v.message}`
  if (seen.has(v)) return '[Circular]'
  if (depth > 4) return Array.isArray(v) ? '[Array]' : '[Object]'
  seen.add(v)
  try {
    if (v instanceof Date) return v.toISOString()
    if (v instanceof RegExp) return String(v)
    if (v instanceof Promise) return 'Promise { <pending> }'
    if (v instanceof Map) {
      const body = [...v.entries()].map(([k, x]) => `${show(k, depth + 1, seen)} => ${show(x, depth + 1, seen)}`)
      return `Map(${v.size}) { ${body.join(', ')} }`
    }
    if (v instanceof Set) {
      return `Set(${v.size}) { ${[...v].map((x) => show(x, depth + 1, seen)).join(', ')} }`
    }
    if (Array.isArray(v)) return `[ ${v.map((x) => show(x, depth + 1, seen)).join(', ')} ]`
    if (ArrayBuffer.isView(v)) return `${v.constructor.name}(${(v as unknown as ArrayLike<unknown>).length ?? 0})`
    const entries = Object.entries(v as Record<string, unknown>).map(
      ([k, x]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${show(x, depth + 1, seen)}`,
    )
    const name = (v as object).constructor && (v as object).constructor !== Object ? `${(v as object).constructor.name} ` : ''
    return entries.length ? `${name}{ ${entries.join(', ')} }` : `${name}{}`
  } finally {
    seen.delete(v)
  }
}

self.onmessage = async (e: MessageEvent) => {
  const { cmd, id, code } = e.data as { cmd: string; id: number; code: string }
  if (cmd !== 'run') return

  const write = (type: Out['type']) => (...args: unknown[]) =>
    post({ type, id, text: args.map((a) => show(a)).join(' ') + '\n' })

  // Count live timers so the run ends only once the event loop has drained.
  const live = new Set<unknown>()
  const realSetTimeout = self.setTimeout.bind(self)
  const realClearTimeout = self.clearTimeout.bind(self)
  const realSetInterval = self.setInterval.bind(self)
  const realClearInterval = self.clearInterval.bind(self)
  let drained: (() => void) | null = null
  const check = () => {
    if (live.size === 0 && drained) realSetTimeout(() => live.size === 0 && drained?.(), 0)
  }
  const g = self as unknown as Record<string, unknown>
  g.setTimeout = (fn: (...a: unknown[]) => void, ms?: number, ...rest: unknown[]) => {
    const h: unknown = realSetTimeout(() => {
      live.delete(h)
      try {
        fn(...rest)
      } catch (err) {
        write('stderr')(err)
      }
      check()
    }, ms)
    live.add(h)
    return h
  }
  g.clearTimeout = (h: number) => {
    live.delete(h)
    realClearTimeout(h)
    check()
  }
  g.setInterval = (fn: (...a: unknown[]) => void, ms?: number, ...rest: unknown[]) => {
    const h: unknown = realSetInterval(() => {
      try {
        fn(...rest)
      } catch (err) {
        write('stderr')(err)
      }
    }, ms)
    live.add(h)
    return h
  }
  g.clearInterval = (h: number) => {
    live.delete(h)
    realClearInterval(h)
    check()
  }

  const console = {
    log: write('stdout'),
    info: write('stdout'),
    debug: write('stdout'),
    table: write('stdout'),
    dir: write('stdout'),
    warn: write('stderr'),
    error: write('stderr'),
    assert: (ok: unknown, ...rest: unknown[]) => {
      if (!ok) write('stderr')('Assertion failed:', ...rest)
    },
  }

  self.addEventListener('unhandledrejection', (ev) => {
    write('stderr')('Uncaught (in promise)', (ev as PromiseRejectionEvent).reason)
    ev.preventDefault()
  })

  try {
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (
      ...args: string[]
    ) => (...a: unknown[]) => Promise<unknown>
    const body = new AsyncFunction('console', `"use strict";\n${code}`)
    const result = await body(console)
    await new Promise<void>((resolve) => {
      drained = resolve
      check()
    })
    post({ type: 'result', id, repr: result === undefined ? null : show(result, 1) })
  } catch (err) {
    post({ type: 'error', id, message: err instanceof Error ? `${err.name}: ${err.message}` : show(err) })
  }
}
