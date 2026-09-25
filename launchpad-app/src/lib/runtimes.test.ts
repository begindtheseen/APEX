/* ============================================================================
   ORBIT — runtime helpers
   ----------------------------------------------------------------------------
   The pure parts of the playground: output comparison, the Python test harness
   it generates, and the parser that reads the harness's results back.

   The harness is string-built Python running learner-supplied code, so the
   escaping cases below are not academic — a test name containing a quote would
   otherwise produce a syntax error and report as a mysterious failure.
   ========================================================================== */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { LANGS, RUNNABLE, buildTestProgram, capabilityOf, checkOutput, parseTestOutput } from './runtimes'

describe('checkOutput', () => {
  it('accepts an exact match', () => {
    expect(checkOutput('hello', 'hello').pass).toBe(true)
  })

  it('ignores trailing whitespace and line endings', () => {
    expect(checkOutput('a  \r\nb\t\n\n\n', 'a\nb').pass).toBe(true)
  })

  it('does not ignore leading whitespace — indentation is often the answer', () => {
    expect(checkOutput('  a', 'a').pass).toBe(false)
  })

  it('names the first differing line', () => {
    const r = checkOutput('one\nTWO\nthree', 'one\ntwo\nthree')
    expect(r.pass).toBe(false)
    expect(r.detail).toContain('line 2')
    expect(r.detail).toContain('two')
    expect(r.detail).toContain('TWO')
  })

  it('reports a missing line rather than silently passing a prefix', () => {
    const r = checkOutput('one', 'one\ntwo')
    expect(r.pass).toBe(false)
    expect(r.detail).toContain('line 2')
  })

  it('treats two empty outputs as matching', () => {
    expect(checkOutput('', '').pass).toBe(true)
    expect(checkOutput('\n\n', '').pass).toBe(true)
  })
})

describe('buildTestProgram', () => {
  const tests = [
    { name: 'returns the right value', assert: 'assert f(2) == 4' },
    { name: 'handles zero', assert: 'assert f(0) == 0\nassert f(-0) == 0' },
  ]

  it('keeps the learner code first so the assertions can see it', () => {
    const program = buildTestProgram('def f(x):\n    return x * 2', tests)
    expect(program.indexOf('def f(x)')).toBeLessThan(program.indexOf('__ORBIT_TESTS__'))
  })

  it('indents multi-line assertions into their try block', () => {
    const program = buildTestProgram('x = 1', tests)
    expect(program).toContain('    assert f(0) == 0\n    assert f(-0) == 0')
  })

  it('escapes quotes and backslashes in test names', () => {
    const program = buildTestProgram('x = 1', [
      { name: 'handles "quoted" \\ paths', assert: 'assert True' },
    ])
    expect(program).toContain('\\"quoted\\"')
    expect(program).toContain('\\\\ paths')
    // The name must never break out of its string literal.
    expect(program).not.toContain('PASS 0: handles "quoted"')
  })

  it('separates the marker so learner output can be split off cleanly', () => {
    const program = buildTestProgram('print("hi")', tests)
    expect(program).toContain('print("__ORBIT_TESTS__")')
  })
})

describe('parseTestOutput', () => {
  const tests = [{ name: 'a' }, { name: 'b' }, { name: 'c' }]

  it('splits the learner output from the harness results', () => {
    const stdout = 'user printed this\n__ORBIT_TESTS__\nPASS 0: a\nFAIL 1: b — 2 != 3\nPASS 2: c\n'
    const { userOutput, outcomes } = parseTestOutput(stdout, tests)
    expect(userOutput.trim()).toBe('user printed this')
    expect(outcomes.map((o) => o.status)).toEqual(['pass', 'fail', 'pass'])
    expect(outcomes[1]!.message).toBe('2 != 3')
  })

  it('reports exceptions distinctly from assertion failures', () => {
    const stdout = '__ORBIT_TESTS__\nERROR 0: a — NameError: name f is not defined\n'
    const { outcomes } = parseTestOutput(stdout, tests)
    expect(outcomes[0]!.status).toBe('error')
    expect(outcomes[0]!.message).toContain('NameError')
  })

  it('leaves tests that produced no line marked as errors, not passes', () => {
    // A crash before the harness runs must never read as success.
    const { outcomes } = parseTestOutput('boom\n', tests)
    expect(outcomes.every((o) => o.status === 'error')).toBe(true)
  })

  it('ignores harness lines that index a test that does not exist', () => {
    const stdout = '__ORBIT_TESTS__\nPASS 0: a\nPASS 9: ghost\n'
    const { outcomes } = parseTestOutput(stdout, tests)
    expect(outcomes).toHaveLength(3)
    expect(outcomes[0]!.status).toBe('pass')
  })

  it('treats the whole stream as user output when the marker never appeared', () => {
    const { userOutput } = parseTestOutput('just output\n', tests)
    expect(userOutput).toBe('just output\n')
  })
})

describe('language modes', () => {
  it('claims real execution for every offered language and nothing else', () => {
    const executing = Object.values(LANGS)
      .filter((l) => l.mode === 'execute')
      .map((l) => l.id)
      .sort()
    expect(executing).toEqual([...RUNNABLE].sort())
  })

  it('gives every language an honest note about what happens when you hit run', () => {
    for (const l of Object.values(LANGS)) {
      expect(l.note.length, `${l.id} needs a note`).toBeGreaterThan(20)
    }
  })
})

describe('the playground languages', () => {
  it('offers JavaScript, TypeScript, Python, SQL and C++', () => {
    expect(RUNNABLE).toEqual(['javascript', 'typescript', 'python', 'sql', 'cpp'])
  })

  it('carries no language that cannot run here', () => {
    for (const gone of ['matlab', 'simulink', 'rust', 'bash']) {
      expect(Object.keys(LANGS)).not.toContain(gone)
    }
  })

  it('executes every language it offers — none is a string comparison', () => {
    for (const lang of RUNNABLE) {
      const cap = capabilityOf(lang)
      expect(cap.mode, lang).toBe('execute')
    }
  })

  it('says C++ is compiled for real, and states the exceptions limit', () => {
    const cap = capabilityOf('cpp')
    expect(cap.note).toContain('Compiled for real')
    expect(cap.note).toContain('throw and try do not compile')
  })

  it('says a TypeScript type error stops the run', () => {
    expect(capabilityOf('typescript').note).toContain('type error stops the run')
  })

  it('leaves notes alone: nothing to execute', () => {
    expect(capabilityOf('text').mode).toBe('reference')
  })
})


describe('the compilers the playground downloads', () => {
  // The browser fetches these pinned versions from a CDN; the browser suite
  // serves the same versions from the repository's node_modules. If the two
  // drift, the tests would pass against a compiler nobody downloads.
  const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')
  const rootPins = JSON.parse(read('../../../package.json')).devDependencies as Record<string, string>

  it('pins clang to the version the tests serve', () => {
    const pinned = /const CLANG_VERSION = '([^']+)'/.exec(read('../workers/cpp.worker.ts'))?.[1]
    expect(pinned).toBeTruthy()
    expect(rootPins['@yowasp/clang']).toBe(pinned)
  })

  it('pins TypeScript to the version the tests serve', () => {
    const pinned = /const TS_VERSION = '([^']+)'/.exec(read('../workers/typescript.worker.ts'))?.[1]
    expect(pinned).toBeTruthy()
    expect(rootPins.typescript).toBe(pinned)
  })
})
