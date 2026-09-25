// Node twin of workers/javascript.worker.ts: the code runs as the body of an
// async function, console output formatted the way the browser worker does,
// and the run ends when the body has finished and every timer has fired.
import { parentPort, workerData } from 'node:worker_threads'

function show(v, depth = 0, seen = new WeakSet()) {
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
    if (v instanceof Map) return `Map(${v.size}) { ${[...v.entries()].map(([k, x]) => `${show(k, depth + 1, seen)} => ${show(x, depth + 1, seen)}`).join(', ')} }`
    if (v instanceof Set) return `Set(${v.size}) { ${[...v].map((x) => show(x, depth + 1, seen)).join(', ')} }`
    if (Array.isArray(v)) return `[ ${v.map((x) => show(x, depth + 1, seen)).join(', ')} ]`
    if (ArrayBuffer.isView(v)) return `${v.constructor.name}(${v.length ?? 0})`
    const entries = Object.entries(v).map(([k, x]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${show(x, depth + 1, seen)}`)
    const name = v.constructor && v.constructor !== Object ? `${v.constructor.name} ` : ''
    return entries.length ? `${name}{ ${entries.join(', ')} }` : `${name}{}`
  } finally {
    seen.delete(v)
  }
}

let stdout = ''
let stderr = ''
const write = (to) => (...args) => {
  const text = args.map((a) => show(a)).join(' ') + '\n'
  if (to === 'out') stdout += text
  else stderr += text
}
const live = new Set()
const real = { setTimeout, clearTimeout, setInterval, clearInterval }
let drained = null
const check = () => {
  if (live.size === 0 && drained) real.setTimeout(() => live.size === 0 && drained?.(), 0)
}
globalThis.setTimeout = (fn, ms, ...rest) => {
  const h = real.setTimeout(() => {
    live.delete(h)
    try {
      fn(...rest)
    } catch (err) {
      write('err')(err)
    }
    check()
  }, ms)
  live.add(h)
  return h
}
globalThis.clearTimeout = (h) => {
  live.delete(h)
  real.clearTimeout(h)
  check()
}
globalThis.setInterval = (fn, ms, ...rest) => {
  const h = real.setInterval(() => {
    try {
      fn(...rest)
    } catch (err) {
      write('err')(err)
    }
  }, ms)
  live.add(h)
  return h
}
globalThis.clearInterval = (h) => {
  live.delete(h)
  real.clearInterval(h)
  check()
}
const console = { log: write('out'), info: write('out'), debug: write('out'), table: write('out'), warn: write('err'), error: write('err'), assert: (ok, ...r) => ok || write('err')('Assertion failed:', ...r) }
process.on('unhandledRejection', (reason) => write('err')('Uncaught (in promise)', reason))

// No Node in the browser: take away what a worker would not have.
for (const k of ['process', 'require', 'Buffer', 'global']) {
  try {
    if (k !== 'process') delete globalThis[k]
  } catch {}
}
try {
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const body = new AsyncFunction('console', 'process', 'require', `"use strict";\n${workerData.code}`)
  await body(console, undefined, undefined)
  await new Promise((resolve) => {
    drained = resolve
    check()
  })
  parentPort.postMessage({ stdout, stderr, error: null })
} catch (err) {
  parentPort.postMessage({ stdout, stderr, error: err instanceof Error ? `${err.name}: ${err.message}` : show(err) })
}
