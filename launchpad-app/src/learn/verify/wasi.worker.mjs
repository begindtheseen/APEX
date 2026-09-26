// Node twin of workers/wasi.worker.ts: runs a compiled C++ program with stdin.
import { parentPort, workerData } from 'node:worker_threads'
import { ConsoleStdout, File, OpenFile, PreopenDirectory, WASI } from '@bjorn3/browser_wasi_shim'

let stdout = ''
let stderr = ''
const dec = new TextDecoder()
const wasi = new WASI(['main'], [], [
  new OpenFile(new File(new TextEncoder().encode(workerData.stdin ?? ''))),
  new ConsoleStdout((b) => (stdout += dec.decode(b, { stream: true }))),
  new ConsoleStdout((b) => (stderr += dec.decode(b, { stream: true }))),
  new PreopenDirectory('.', new Map()),
])
try {
  const mod = await WebAssembly.compile(workerData.wasm)
  const inst = await WebAssembly.instantiate(mod, { wasi_snapshot_preview1: wasi.wasiImport })
  const code = wasi.start(inst)
  parentPort.postMessage({ stdout, stderr, error: null, exit: code })
} catch (err) {
  parentPort.postMessage({ stdout, stderr, error: `The program crashed: ${err instanceof Error ? `${err.name}: ${err.message}` : String(err)}` })
}
