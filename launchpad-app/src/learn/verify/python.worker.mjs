// Node twin of workers/python.worker.ts, for the lesson checker: Pyodide, one
// fresh namespace per run, stdin line by line. Plain JS: it runs as a thread.
import { parentPort } from 'node:worker_threads'
import { loadPyodide } from 'pyodide'

const py = await loadPyodide()
parentPort.on('message', async ({ id, code, stdin }) => {
  let stdout = ''
  let stderr = ''
  py.setStdout({ batched: (t) => (stdout += `${t}\n`) })
  py.setStderr({ batched: (t) => (stderr += `${t}\n`) })
  const lines = stdin ?? []
  let at = 0
  py.setStdin({ stdin: () => (at < lines.length ? lines[at++] : null) })
  const scope = py.runPython('{"__name__": "__main__"}')
  try {
    await py.runPythonAsync(code, { globals: scope })
    parentPort.postMessage({ id, stdout, stderr, error: null })
  } catch (e) {
    parentPort.postMessage({ id, stdout, stderr, error: String(e?.message ?? e) })
  } finally {
    scope.destroy()
  }
})
parentPort.postMessage({ ready: true })
