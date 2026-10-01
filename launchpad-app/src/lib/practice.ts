/* ============================================================================
   Which languages each module practises in
   ----------------------------------------------------------------------------
   The one per-app file behind "Try it here" and runnable lesson code. For
   LAUNCHPAD the curriculum's lessons are its own prose, kept verbatim, so the
   playground sits under each lesson in the languages its module works in:
   the terminal for M1's first code and M15's git, JavaScript and TypeScript
   for the product, SQL for the Postgres modules, Python from M24, HTML for
   the frontend. Modules whose work is not code (the contract, the design
   doc, the negotiation, the evidence layer) get none — a playground there
   would be noise.
   ========================================================================== */
import type { Lang, Module } from '@/curriculum/types'
import { langOfFence } from '@/lib/run'
import { shellCanRun } from '@/lib/shell'

const BY_MODULE: Record<string, Lang[]> = {
  M1: ['bash', 'javascript'],
  M2: ['typescript', 'sql'],
  M3: ['javascript', 'typescript'],
  M4: ['typescript', 'javascript'],
  M5: ['sql'],
  M6: ['typescript'],
  M7: ['typescript', 'javascript'],
  M8: ['typescript', 'sql'],
  M9: ['typescript'],
  M10: ['typescript', 'bash'],
  M11: ['typescript', 'python'],
  M12: ['python', 'typescript'],
  M14: ['bash', 'typescript'],
  M15: ['bash'],
  M16: ['typescript'],
  M18: ['sql', 'python'],
  M19: ['typescript'],
  M20: ['sql', 'typescript'],
  M21: ['typescript'],
  M22: ['html', 'typescript'],
  M23: ['bash'],
  M24: ['python'],
  M25: ['python'],
  M26: ['typescript'],
  M30: ['python', 'typescript', 'javascript'],
}

/** The languages a module's "Try it here" offers, most relevant first. */
export function practiceLangs(module: Module): Lang[] {
  return BY_MODULE[module.id] ?? []
}

/**
 * Whether a fenced code block in a lesson can run in place as written. Shell
 * blocks only when every command is one the practice terminal knows; C++ only
 * when it is a whole program.
 */
/** The words after the language on a fence line (`fragment`, `error`). */
export function fenceFlags(info: string): string[] {
  return info.trim().split(/\s+/).slice(1)
}

export function runnableFence(info: string, code: string): Lang | null {
  const lang = langOfFence(info)
  if (!lang) return null
  if (lang === 'bash') return shellCanRun(code) ? 'bash' : null
  // ```cpp fragment: a piece of a program, shown but never run. ```cpp error:
  // a program the lesson runs to show its compiler error, so Run stays.
  // ```cpp laptop: a whole program that needs exceptions, threads, signals or OS calls, which the
  // in-browser build (wasm32, single-threaded, exceptions off) does not have.
  if (fenceFlags(info).includes('fragment') || fenceFlags(info).includes('laptop')) return null
  // A piece of a program shown on its own (`int main() {`, `def f():`) is
  // explained, not run: pressing Run on it could only fail to compile.
  if (!isWhole(lang, code)) return null
  if (lang === 'cpp') return /\bint\s+main\s*\(/.test(code) ? 'cpp' : null
  return lang
}

/** Every bracket closed, and (Python) no block left open at the end. */
export function isWhole(lang: Lang, code: string): boolean {
  const hash = lang === 'python' || lang === 'bash'
  const stripped = code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    // Single quotes: Python strings; C++ and Rust one-character literals (not
    // lifetimes or digit separators).
    .replace(lang === 'python' || lang === 'sql' ? /'(?:[^'\\\n]|\\.)*'/g : /'(?:\\.|[^'\\\n])'/g, "''")
    .replace(hash ? /#.*$/gm : lang === 'sql' ? /--.*$/gm : /\/\/.*$/gm, '')
  const open: string[] = []
  const pair: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
  for (const ch of stripped) {
    if (ch === '(' || ch === '[' || ch === '{') open.push(ch)
    else if (ch in pair) {
      if (open.pop() !== pair[ch]) return false
    }
  }
  if (open.length) return false
  if (lang === 'python') {
    const last = stripped.split('\n').map((l) => l.trimEnd()).filter((l) => l.trim()).pop() ?? ''
    if (last.endsWith(':')) return false
  }
  return true
}
