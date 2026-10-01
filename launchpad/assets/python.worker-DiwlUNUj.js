const e=`314.0.7`,t=`https://cdn.jsdelivr.net/pyodide/v${e}/full/pyodide.mjs`;function n(e){let t=[...e.matchAll(/__import__\(\s*["']([A-Za-z_][\w.]*)["']/g)].map(e=>`import ${e[1]}`);return t.length?`${e}\n${t.join(`
`)}\n`:e}const r=e=>self.postMessage(e);let i=null,a=null,o=0;async function s(n=[]){return i||a||(a=(async()=>{r({type:`status`,text:`Downloading Python runtime (~7 MB, cached after this)…`});let s;try{s=await import(
/* @vite-ignore */
t)}catch{throw a=null,Error(`Could not reach the Python runtime on cdn.jsdelivr.net. It is a one-time ~7 MB download, so this usually means you are offline or something is blocking that host. Everything else in the app works without it.`)}let c=await s.loadPyodide({indexURL:`https://cdn.jsdelivr.net/pyodide/v${e}/full/`,env:{MPLBACKEND:`Agg`,HOME:`/home/pyodide`},packages:n});return c.setStdout({batched:e=>r({type:`stdout`,id:o,text:`${e}\n`})}),c.setStderr({batched:e=>r({type:`stderr`,id:o,text:`${e}\n`})}),await c.runPythonAsync(`_ORBIT_RUN_ID = 0

import os, sys
os.environ["MPLBACKEND"] = "Agg"

def _orbit_post(payload):
    """Post a message to the main thread as a plain JS object.

    This indirection is load-bearing. Pyodide converts a Python dict handed to
    a JS function into a JS *Map*, not an object literal — so \`msg.type\`
    would be undefined on the other side and every plot would be silently
    dropped. \`dict_converter=Object.fromEntries\` is what produces a real
    object that structured-clones the way the worker protocol expects.
    """
    import js
    from pyodide.ffi import to_js
    js.postMessage(to_js(payload, dict_converter=js.Object.fromEntries))

def _orbit_flush_figures():
    if "matplotlib" not in sys.modules:
        return
    import io, base64
    import matplotlib.pyplot as plt
    for num in plt.get_fignums():
        fig = plt.figure(num)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=112, bbox_inches="tight",
                    facecolor="#080b14", edgecolor="none")
        _orbit_post({
            "type": "plot",
            "id": _ORBIT_RUN_ID,
            "png": "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode(),
        })
        plt.close(fig)
`),i=c,r({type:`ready`,version:e}),c})(),a)}self.onmessage=async e=>{let t=e.data;try{if(t.cmd===`init`){await s(t.packages);return}if(t.cmd===`run`){o=t.id;let e=await s(),i=t.stdin??[],a=0;e.setStdin({stdin:()=>a<i.length?i[a++]:null});let c={messageCallback:e=>r({type:`status`,text:e}),errorCallback:e=>r({type:`stderr`,id:t.id,text:`${e}\n`})};t.packages?.length&&(r({type:`status`,text:`Loading ${t.packages.join(`, `)}…`}),await e.loadPackage(t.packages,c)),await e.loadPackagesFromImports(n(t.code),c),e.globals.set(`_ORBIT_RUN_ID`,t.id);let l=e.runPython(`{"__name__": "__main__"}`),u=null;try{let n=await e.runPythonAsync(t.code,{globals:l});u=n==null?null:String(n),n?.destroy?.()}finally{l.destroy?.()}await e.runPythonAsync(`_orbit_flush_figures()`),r({type:`result`,id:t.id,repr:u})}}catch(e){let n=e instanceof Error&&e.message||String(e);l(e)?r({type:`fatal`,message:c}):t.cmd===`run`?r({type:`error`,id:t.id,message:n}):r({type:`fatal`,message:n})}};const c=`Python's runtime ran out of stack and had to stop. In the browser this happens when a very long chain of objects is freed at once, such as a linked list of a few thousand nodes: take it apart one node at a time (set each next to None as you walk it) before it goes. On a laptop the same program runs. The next run starts Python again.`;function l(e){return e?.pyodide_fatal_error===!0||e instanceof RangeError&&/call stack/i.test(e.message)}self.addEventListener(`unhandledrejection`,e=>{l(e.reason)&&(e.preventDefault(),r({type:`fatal`,message:c}))});