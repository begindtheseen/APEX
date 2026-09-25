const e=`314.0.7`,t=`https://cdn.jsdelivr.net/pyodide/v${e}/full/pyodide.mjs`,n=e=>self.postMessage(e);let r=null,i=null,a=0;async function o(o=[]){return r||i||(i=(async()=>{n({type:`status`,text:`Downloading Python runtime (~7 MB, cached after this)…`});let s;try{s=await import(
/* @vite-ignore */
t)}catch{throw i=null,Error(`Could not reach the Python runtime on cdn.jsdelivr.net. It is a one-time ~7 MB download, so this usually means you are offline or something is blocking that host. Everything else in the app works without it.`)}let c=await s.loadPyodide({indexURL:`https://cdn.jsdelivr.net/pyodide/v${e}/full/`,env:{MPLBACKEND:`Agg`,HOME:`/home/pyodide`},packages:o});return c.setStdout({batched:e=>n({type:`stdout`,id:a,text:`${e}\n`})}),c.setStderr({batched:e=>n({type:`stderr`,id:a,text:`${e}\n`})}),await c.runPythonAsync(`_ORBIT_RUN_ID = 0

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
`),r=c,n({type:`ready`,version:e}),c})(),i)}self.onmessage=async e=>{let t=e.data;try{if(t.cmd===`init`){await o(t.packages);return}if(t.cmd===`run`){a=t.id;let e=await o(),r=t.stdin??[],i=0;e.setStdin({stdin:()=>i<r.length?r[i++]:null}),t.packages?.length&&(n({type:`status`,text:`Loading ${t.packages.join(`, `)}…`}),await e.loadPackage(t.packages)),await e.loadPackagesFromImports(t.code),e.globals.set(`_ORBIT_RUN_ID`,t.id);let s=e.runPython(`{"__name__": "__main__"}`),c=null;try{let n=await e.runPythonAsync(t.code,{globals:s});c=n==null?null:String(n),n?.destroy?.()}finally{s.destroy?.()}await e.runPythonAsync(`_orbit_flush_figures()`),n({type:`result`,id:t.id,repr:c})}}catch(e){let r=e instanceof Error&&e.message||String(e);t.cmd===`run`?n({type:`error`,id:t.id,message:r}):n({type:`fatal`,message:r})}};