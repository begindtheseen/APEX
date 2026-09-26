/* ============================================================================
   The lesson checker
   ----------------------------------------------------------------------------
   For every lesson in the chosen courses: the starter must NOT pass (the
   lesson asks for work) and the solution MUST pass every check (the lesson
   can be passed) — run through the real runtimes, in Node (verify/runners).

     VERIFY=all npx vitest run src/learn/verify.test.ts
     VERIFY=python-advanced,sql npx vitest run src/learn/verify.test.ts
     VERIFY=python-advanced VERIFY_LESSON=py3-04 npx vitest run src/learn/verify.test.ts

   Skipped in the ordinary unit run, where it would take minutes.
   ========================================================================== */
import { afterAll, describe, expect, it } from 'vitest'
import { buildProgram, domSteps, gradeRun, lessonShell, typeCheckFailures, typeLines } from './grade'
import { TRACKS } from './index'
import type { LearnGrade, LearnLesson, LearnRun } from './types'
import { closeRunners, runCppNode, runJs, runPython, runSqlNode, runTs, runWeb, type Out } from './verify/runners'

const want = process.env.VERIFY
const only = process.env.VERIFY_LESSON?.split(',')

async function run(lesson: LearnLesson, code: string, solution: boolean): Promise<LearnGrade> {
  const base = (o: Out): LearnRun => ({ stdout: o.stdout, stderr: o.stderr, error: o.error, ...(o.tables ? { tables: o.tables as LearnRun['tables'] } : {}), ms: 0 })
  if (lesson.lang === 'bash' || lesson.lang === 'git') {
    const start = lessonShell(lesson)
    return gradeRun(lesson, '', { stdout: '', stderr: '', error: null, shell: solution ? typeLines(start, lesson.solution) : start, ms: 0 })
  }
  if (lesson.lang === 'html') {
    const r = await runWeb(code, domSteps(lesson))
    return gradeRun(lesson, code, { stdout: r.logs.join('\n'), stderr: '', error: null, dom: r.results, ms: 0 })
  }
  const program = buildProgram(lesson, code)
  let out: LearnRun
  switch (lesson.lang) {
    case 'python':
      out = base(await runPython(program, lesson.stdin?.replace(/\n$/, '').split('\n')))
      break
    case 'javascript':
      out = base(await runJs(program))
      break
    case 'typescript': {
      const first = await runTs(program)
      const t = typeCheckFailures(program, first.error)
      out = t ? { ...base(await runTs(t.program)), typeFails: t.fails } : base(first)
      break
    }
    case 'sql':
      out = base(await runSqlNode(program, lesson.schema))
      break
    case 'cpp':
      out = base(await runCppNode(program, lesson.stdin ?? ''))
      break
    default:
      throw new Error(`no runner for ${lesson.lang}`)
  }
  return gradeRun(lesson, code, out)
}

function why(g: LearnGrade): string {
  const bad = g.results.filter((r) => r.status === 'fail').map((r) => `  ✗ ${r.name}${r.actual ? ` — got ${r.actual}` : ''}${r.detail ? ` — ${r.detail}` : ''}`)
  return [...bad, g.error ? `  error: ${g.error.slice(0, 600)}` : '', g.stderr ? `  stderr: ${g.stderr.slice(0, 300)}` : '', g.output ? `  output: ${g.output.slice(0, 300)}` : '']
    .filter(Boolean)
    .join('\n')
}

describe('every lesson: the starter needs work, the solution passes', () => {
  // The body runs even when skipped, so it must be safe without VERIFY.
  if (!want) {
    it.skip('set VERIFY=all (or course ids) to run every lesson', () => {})
    return
  }
  const chosen = TRACKS.filter((t) => want === 'all' || want.split(',').some((w) => w === t.id || w === t.lang))
  afterAll(() => closeRunners())
  for (const track of chosen)
    for (const lesson of track.lessons) {
      if (only && !only.includes(lesson.id)) continue
      it(`${track.id} · ${lesson.id} · ${lesson.title}`, async () => {
        const starter = await run(lesson, lesson.starter, false)
        expect(starter.passed, `${lesson.id}: the starter already passes every check`).toBe(false)
        const solved = await run(lesson, lesson.solution, true)
        expect(solved.passed, `${lesson.id}: the solution fails\n${why(solved)}`).toBe(true)
      }, 240_000)
    }
})
