/* ============================================================================
   LAUNCHPAD — code playground
   ----------------------------------------------------------------------------
   Four modes along the top, the way a coding site lays them out:

     Code      JavaScript, TypeScript (type-checked first), Python and C++
               (compiled by clang in the browser), picked from the file pill
     SQL       SQLite, on a seeded database, results as a table
     Web       HTML, CSS and JavaScript, with a live preview and its console
     Terminal  the practice shell: files, folders and git, in the page

   Opens standalone, or on a specific exercise via `#/playground?ex=<id>`, in
   which case it loads the starter code, the tests and the reference solution
   and shows them as test cases. `?lang=<lang>` opens a language directly.

   Everything runs in this tab. The note under the window says exactly what
   just happened, because a green tick that means nothing is worse than none.
   ========================================================================== */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Editor } from '@/components/Editor'
import { IconArrowRight, IconBulb, IconPause, IconRefresh } from '@/components/icons'
import {
  ConsoleView,
  IdeBody,
  IdePanel,
  IdeWindow,
  ModeTabs,
  RunButton,
  SqlTables,
  TerminalView,
  TestCases,
  WebPreview,
  type Mode,
  type PanelTab,
} from '@/components/ide'
import { Button } from '@/components/ui'
import { MODULES } from '@/curriculum'
import type { Exercise, Lang, Module } from '@/curriculum/types'
import { saveCode } from '@/engine/apply'
import type { CheckResult } from '@/learn/types'
import {
  LANGS,
  buildTestProgram,
  capabilityOf,
  parseTestOutput,
  python,
  runAgainstSolution,
  runCpp,
  runJavaScript,
  runSql,
  runTypeScript,
  tsCompiler,
  type RunOutput,
  type SqlResult,
} from '@/lib/runtimes'
import { newShell, type ShellState } from '@/lib/shell'
import type { WebLog } from '@/lib/web'
import { Markdown } from '@/lib/markdown'
import { useLearner } from '@/hooks/useLearner'
import { navigate, useRoute } from '@/lib/router'
import { CPP_STDIN, SCRATCH, SQL_SCHEMA } from '@/lib/scratch'
import { useNextLesson } from '@/pages/Learn'
import './pages.css'

/** The languages Code mode's file pill offers. */
const CODE_LANGS: Lang[] = ['python', 'javascript', 'typescript', 'cpp']

const FILES: Partial<Record<Lang, string>> = {
  javascript: 'main.js',
  typescript: 'main.ts',
  python: 'main.py',
  cpp: 'main.cpp',
  sql: 'query.sql',
  html: 'index.html',
  bash: '~/project',
}

/** Which mode a language lives in. */
function modeOf(lang: Lang): Mode {
  return lang === 'sql' ? 'sql' : lang === 'html' ? 'web' : lang === 'bash' ? 'terminal' : 'code'
}

export function Playground() {
  const route = useRoute()
  const { state, setState } = useLearner()

  const exerciseRef = useMemo(() => findExercise(route.query.ex), [route.query.ex])
  const exercise = exerciseRef?.exercise
  const asked = route.query.lang as Lang | undefined
  const initial: Lang = exercise?.lang ?? (asked && asked in FILES ? asked : 'python')

  const [mode, setMode] = useState<Mode>(modeOf(initial))
  /** The language Code mode was last on, so switching modes and back keeps it. */
  const [codeLang, setCodeLang] = useState<Lang>(modeOf(initial) === 'code' ? initial : 'python')
  const lang: Lang = mode === 'code' ? codeLang : mode === 'sql' ? 'sql' : mode === 'web' ? 'html' : 'bash'
  const info = LANGS[lang]
  const learn = useNextLesson(lang)

  const bufferKey = exercise ? `ex:${exercise.id}` : `scratch:${lang}`
  const [code, setCode] = useState('')
  const [running, setRunning] = useState(false)
  const [status, setStatus] = useState('')
  const [out, setOut] = useState<RunOutput | null>(null)
  const [sqlOut, setSqlOut] = useState<SqlResult | null>(null)
  const [tests, setTests] = useState<CheckResult[] | null>(null)
  const [stdin, setStdin] = useState<Record<string, string>>({ cpp: CPP_STDIN, python: '' })
  const [tab, setTab] = useState('console')
  const [showSolution, setShowSolution] = useState(false)
  const [page, setPage] = useState<string | null>(null)
  const [webLogs, setWebLogs] = useState<WebLog[]>([])
  const [shell, setShell] = useState<ShellState>(() => newShell())
  const [termKey, setTermKey] = useState(0)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const graded = !!exercise && ((exercise.tests?.length ?? 0) > 0 || (lang === 'cpp' && !!exercise.solution))
  const takesInput = lang === 'cpp' || lang === 'python'

  /* ── load the buffer for whatever is selected ──────────────────────────── */
  useEffect(() => {
    const saved = state.code[bufferKey]
    const next = saved ?? exercise?.starter ?? SCRATCH[lang] ?? ''
    setCode(next)
    setOut(null)
    setSqlOut(null)
    setTests(null)
    setWebLogs([])
    setPage(lang === 'html' ? next : null)
    setTab(graded ? 'tests' : mode === 'sql' ? 'results' : mode === 'web' ? 'preview' : 'console')
    // Deliberately not re-running on every keystroke-driven state change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bufferKey])

  /* Python's runtime is ~7 MB and TypeScript's compiler ~9 MB: start them
     downloading when the language is picked rather than at the moment someone
     hits Run. C++'s is ~105 MB, so it waits for Run, where the download shows
     its progress. */
  useEffect(() => {
    if (lang === 'python' && !python.isBooted) python.preload(setStatus)
    if (lang === 'typescript') tsCompiler.preload()
  }, [lang])

  const capability = useMemo(() => capabilityOf(lang), [lang])

  const onCodeChange = useCallback(
    (next: string) => {
      setCode(next)
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => setState((s) => saveCode(s, bufferKey, next)), 700)
    },
    [bufferKey, setState],
  )

  const run = useCallback(async () => {
    if (running) return
    if (lang === 'html') {
      setWebLogs([])
      // A new string each run, so the same page renders afresh.
      setPage(code + (page === code ? ' ' : ''))
      setTab('preview')
      return
    }
    setRunning(true)
    setOut(null)
    setSqlOut(null)
    setTests(null)
    const input = stdin[lang] ?? ''
    try {
      if (lang === 'javascript') setOut(await runJavaScript(code))
      else if (lang === 'typescript') setOut(await runTypeScript(code, { onStatus: setStatus }))
      else if (lang === 'python') {
        const pyTests = exercise?.tests ?? []
        const program = pyTests.length ? buildTestProgram(code, pyTests) : code
        const lines = input ? input.replace(/\n$/, '').split('\n') : undefined
        const result = await python.run(program, { onStatus: setStatus, ...(lines ? { stdin: lines } : {}) })
        if (pyTests.length) {
          const parsed = parseTestOutput(result.stdout, pyTests)
          setOut({ ...result, stdout: parsed.userOutput })
          setTests(parsed.outcomes.map((o) => ({ name: o.name, status: o.status === 'pass' ? 'pass' : 'fail', ...(o.message ? { detail: o.message } : {}) })))
        } else setOut(result)
      } else if (lang === 'cpp') {
        // With a reference solution to compare against, running it is a real
        // grade: both programs compile and execute and their output is compared.
        if (exercise?.solution) {
          const g = await runAgainstSolution(code, exercise.solution, input)
          setOut(g.yours)
          setTests([
            {
              name: 'Matches the reference solution',
              status: g.pass ? 'pass' : 'fail',
              input: input.trim() || '(no input)',
              ...(g.reference ? { expected: g.reference.stdout.trimEnd() } : {}),
              actual: g.yours.error ? g.yours.error : g.yours.stdout.trimEnd(),
              ...(g.pass ? {} : { detail: g.detail }),
            },
          ])
        } else setOut(await runCpp(code, { stdin: input, onStatus: setStatus }))
      } else if (lang === 'sql') {
        // An exercise whose buffer builds its own tables gets an empty database.
        const schema = exercise?.starter?.includes('CREATE TABLE') ? undefined : SQL_SCHEMA
        setSqlOut(await runSql(code, schema))
      }
      setTab(exercise && graded ? 'tests' : lang === 'sql' ? 'results' : 'console')
    } finally {
      setRunning(false)
      setStatus('')
    }
  }, [code, exercise, graded, lang, page, running, stdin])

  const reset = () => {
    if (mode === 'terminal') {
      setShell(newShell())
      setTermKey((k) => k + 1)
      return
    }
    const starter = exercise?.starter ?? SCRATCH[lang] ?? ''
    setCode(starter)
    setState((s) => saveCode(s, bufferKey, starter))
    setOut(null)
    setSqlOut(null)
    setTests(null)
    if (lang === 'html') setPage(starter)
  }

  const chooseMode = (m: Mode) => {
    if (exercise) navigate('/playground')
    setMode(m)
  }

  const testMark: PanelTab['mark'] = tests ? (tests.every((t) => t.status === 'pass') ? 'pass' : 'fail') : undefined
  const failed = !!(out?.error || sqlOut?.error)
  const tabs: PanelTab[] =
    mode === 'sql'
      ? [
          ...(graded ? [{ id: 'tests', label: 'Test cases', mark: testMark }] : []),
          { id: 'results', label: 'Results' },
          { id: 'console', label: 'Console', ...(failed ? { mark: 'fail' as const } : {}) },
          ...(!exercise ? [{ id: 'schema', label: 'Tables' }] : []),
        ]
      : [
          ...(graded ? [{ id: 'tests', label: 'Test cases', mark: testMark }] : []),
          { id: 'console', label: 'Console', ...(failed ? { mark: 'fail' as const } : {}) },
          ...(takesInput ? [{ id: 'input', label: 'Input' }] : []),
        ]

  const runButton = <RunButton onClick={() => void run()} running={running} status={status} label={graded ? 'Run tests' : 'Run Code'} />
  const choices = CODE_LANGS.map((l) => ({ value: l, label: `${FILES[l]} · ${LANGS[l].label}` }))

  return (
    <div className="page page--padtop ide-wrap pgx">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <div className="page-head__kicker">{exercise ? exerciseRef!.module.title : 'Playground'}</div>
          <h1 className="h-page">{exercise ? exercise.title : 'Code playground'}</h1>
          <p className="page-head__sub">
            {exercise
              ? 'Your work is saved to this device as you type.'
              : 'Write code and run it right here: every language executes in your browser, with nothing sent anywhere.'}
          </p>
        </div>
        {exercise ? (
          <Button variant="ghost" size="md" onClick={() => navigate(`/module/${exerciseRef!.module.id}`)}>
            Back to module
          </Button>
        ) : null}
      </div>

      <ModeTabs value={mode} onChange={chooseMode} />

      {!exercise && learn ? (
        <a className="pgx-learn" href={`#/learn/${learn.lesson.id}`}>
          <IconBulb size={15} />
          <span className="grow">
            {learn.done === 0
              ? `New to ${info.label}? Learn the basics lesson by lesson, right here.`
              : learn.done === learn.total
                ? `All ${learn.total} ${info.label} lessons passed.`
                : `${learn.done} of ${learn.total} ${info.label} lessons passed · Next: ${learn.lesson.title}`}
          </span>
          <span className="pgx-learn__go">
            {learn.done === 0 ? 'Start learning' : learn.done === learn.total ? 'Review' : 'Continue'}
            <IconArrowRight size={13} />
          </span>
        </a>
      ) : null}

      {exercise ? (
        <div className="pgx-brief">
          <Markdown>{exercise.prompt}</Markdown>
        </div>
      ) : null}

      {mode === 'terminal' ? (
        <IdeWindow
          lang="bash"
          file={FILES.bash!}
          right={
            <button type="button" className="ide__tool" onClick={reset}>
              <IconRefresh size={13} />
              Reset
            </button>
          }
        >
          <TerminalView key={termKey} shell={shell} onShell={setShell} height={460} />
        </IdeWindow>
      ) : mode === 'web' ? (
        <div className="pgx-web">
          <IdeWindow
            lang="html"
            file={FILES.html!}
            right={
              <button type="button" className="ide__tool" onClick={reset}>
                <IconRefresh size={13} />
                Reset
              </button>
            }
          >
            <IdeBody run={runButton}>
              <Editor ide value={code} onChange={onCodeChange} lang="html" minHeight={440} onRun={() => void run()} placeholder="Write HTML, CSS and JavaScript here…" />
            </IdeBody>
          </IdeWindow>
          <IdeWindow lang="html" file="Preview" className="pgx-web__out">
            <IdePanel
              tabs={[
                { id: 'preview', label: 'Preview' },
                { id: 'console', label: `Console${webLogs.length ? ` (${webLogs.length})` : ''}`, ...(webLogs.some((l) => l.level === 'error') ? { mark: 'fail' as const } : {}) },
              ]}
              active={tab === 'console' ? 'console' : 'preview'}
              onTab={setTab}
              height={1000}
            >
              <div hidden={tab === 'console'}>
                {page != null ? <WebPreview html={page} onLog={(l) => setWebLogs((ls) => [...ls, l])} height={420} /> : null}
              </div>
              {tab === 'console' ? (
                <ConsoleView empty="console.log from your page shows here.">
                  {webLogs.map((l, i) => (
                    <span key={i} className={l.level === 'error' ? 'ide-console__err' : l.level === 'warn' ? 'ide-console__warn' : undefined}>
                      {`${l.text}\n`}
                    </span>
                  ))}
                </ConsoleView>
              ) : null}
            </IdePanel>
          </IdeWindow>
        </div>
      ) : (
        <IdeWindow
          lang={lang}
          file={FILES[lang] ?? 'main'}
          {...(mode === 'code' && !exercise ? { choices, onChoose: (v: string) => setCodeLang(v as Lang) } : {})}
          right={
            <>
              {running && lang === 'python' ? (
                <button type="button" className="ide__tool" onClick={() => python.cancel()}>
                  <IconPause size={13} />
                  Stop
                </button>
              ) : null}
              {exercise?.solution ? (
                <button type="button" className="ide__tool" onClick={() => setShowSolution((s) => !s)}>
                  {showSolution ? 'Hide solution' : 'Solution'}
                </button>
              ) : null}
              <button type="button" className="ide__tool" onClick={reset}>
                <IconRefresh size={13} />
                Reset
              </button>
            </>
          }
        >
          <IdeBody run={runButton}>
            <Editor
              ide
              value={code}
              onChange={onCodeChange}
              lang={lang}
              minHeight={380}
              onRun={() => void run()}
              placeholder={`Write ${info.label} here…`}
            />
          </IdeBody>
          <IdePanel
            tabs={tabs}
            active={tabs.some((t) => t.id === tab) ? tab : tabs[0]!.id}
            onTab={setTab}
            right={<span className="pgx-status">{status || (out ? `${out.ms} ms` : sqlOut ? `${sqlOut.ms} ms` : 'Ctrl+Enter runs')}</span>}
          >
            {tab === 'tests' && graded ? (
              <TestCases results={tests} empty="Run your code to check it against the tests." />
            ) : tab === 'input' && takesInput ? (
              <>
                <p className="ide-hint">Standard input: what the program reads{lang === 'python' ? ' with input()' : ' from std::cin'}, one line at a time.</p>
                <textarea
                  className="ide-stdin"
                  aria-label="Standard input"
                  value={stdin[lang] ?? ''}
                  onChange={(e) => setStdin((m) => ({ ...m, [lang]: e.target.value }))}
                  spellCheck={false}
                />
              </>
            ) : tab === 'results' && mode === 'sql' ? (
              sqlOut && !sqlOut.error ? (
                <SqlTables tables={sqlOut.tables} />
              ) : (
                <p className="ide-empty">{sqlOut?.error ? 'The query failed — see the Console tab.' : 'Run your query to see the rows it returns.'}</p>
              )
            ) : tab === 'schema' && mode === 'sql' ? (
              <>
                <p className="ide-hint">Each run starts from a fresh in-memory database with these tables.</p>
                <pre className="tcase__value">{SQL_SCHEMA.trim()}</pre>
              </>
            ) : mode === 'sql' ? (
              <ConsoleView error={sqlOut?.error} note={sqlOut && !sqlOut.error ? `Ran in ${sqlOut.ms} ms.` : undefined} empty="Errors from your SQL show here." />
            ) : (
              <ConsoleView stdout={out?.stdout} stderr={out?.stderr} error={out?.error} note={out?.result ? `→ ${out.result}` : out && !out.stdout && !out.stderr && !out.error && !out.plots.length ? 'Ran cleanly with no output.' : undefined}>
                {out?.plots.map((src, i) => <img src={src} alt={`Figure ${i + 1}`} key={i} />)}
              </ConsoleView>
            )}
          </IdePanel>
        </IdeWindow>
      )}

      <p className="pgx-note">{capability.note}</p>

      {showSolution && exercise?.solution ? (
        <div className="pgx-brief">
          <Markdown>{'**Reference solution**\n\n```' + (exercise.lang ?? '') + '\n' + exercise.solution + '\n```'}</Markdown>
        </div>
      ) : null}

      <p className="track-note">
        Everything here runs inside this browser tab. Nothing you write is uploaded — which also means each language
        brings its runtime to you the first time you run it, and your browser then caches it: Python about 7 MB,
        TypeScript about 9 MB, and the C++ compiler about 105 MB before compression. The Terminal is a practice one;
        the real terminal work of M1 happens on your own machine.
      </p>
    </div>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function findExercise(id?: string): { exercise: Exercise; module: Module } | null {
  if (!id) return null
  for (const m of MODULES) {
    const ex = m.exercises?.find((e) => e.id === id)
    if (ex) return { exercise: ex, module: m }
  }
  return null
}
