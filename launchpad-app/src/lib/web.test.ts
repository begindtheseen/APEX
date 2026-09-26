/* The page checker: how the page is built, and — in a real browser, when
   VERIFY is set (as for src/learn/verify.test.ts) — what each step does.

     VERIFY=1 npx vitest run src/lib/web.test.ts                              */
import { afterAll, describe, expect, it } from 'vitest'
import { closeRunners, runWeb } from '@/learn/verify/runners'
import { buildPage } from './web'

/** The relay script buildPage puts in front of her page. */
function relay(page: string): string {
  const m = /<script>([\s\S]*?)<\/script>/.exec(page)
  if (!m) throw new Error('no relay script in the page')
  return m[1]!
}

describe('buildPage', () => {
  it('puts the relay first: inside her head, a head of its own, or a whole page around a fragment', () => {
    expect(buildPage('<html><head><title>t</title></head><body></body></html>', 'c')).toMatch(/^<html><head><script>[\s\S]*<\/script><title>t<\/title>/)
    expect(buildPage('<html lang="en"><body>x</body></html>', 'c')).toMatch(/^<html lang="en"><head><script>[\s\S]*<\/script><\/head><body>x/)
    expect(buildPage('<h1>Hi</h1>', 'c')).toMatch(/^<!doctype html><html><head><meta charset="utf-8"><script>[\s\S]*<\/script><\/head><body><h1>Hi<\/h1><\/body><\/html>$/)
  })

  it('is valid script, with and without checks', () => {
    expect(() => new Function(relay(buildPage('<p>x</p>', 'c')))).not.toThrow()
    expect(() => new Function(relay(buildPage('<p>x</p>', 'c', [['press #a Ctrl+z', 'wait 50', '#a focused']])))).not.toThrow()
  })

  it('carries the checks as data, so a step can never close the script tag', () => {
    const page = buildPage('<p>x</p>', 'chan-1', [['p text == </script><b>']])
    const cfg = /var CFG=(.*);/.exec(relay(page))![1]!
    expect(JSON.parse(cfg)).toEqual({ channel: 'chan-1', checks: [['p text == </script><b>']] })
    expect(relay(page)).not.toContain('</script><b>')
  })
})

describe.skipIf(!process.env.VERIFY)('the checker, in Chromium', () => {
  afterAll(() => closeRunners())
  const pass = async (html: string, ...checks: string[][]) => (await runWeb(html, checks)).results.map((r) => (r.pass ? 'pass' : r.detail))

  it('still clicks, types and asserts as before', async () => {
    const html = `<button id="b">go</button><input id="i"><p id="o">0</p>
      <script>b.onclick=()=>o.textContent='clicked';i.oninput=()=>o.textContent=i.value</script>`
    expect(await pass(html, ['#o text == 0'], ['click #b', '#o text == clicked'], ['type #i hello there', '#o text == hello there'], ['#o text == 1'])).toEqual([
      'pass',
      'pass',
      'pass',
      '#o text: expected "1", found "0"',
    ])
  }, 60_000)

  it('press: focuses, sends the key, and activates buttons on Enter and Space but not a div', async () => {
    const html = `<button id="b">b</button><div id="d" onclick="o.textContent='div'">d</div><input id="k"><p id="o"></p>
      <script>b.onclick=()=>o.textContent=(o.textContent||'')+'b';k.addEventListener('keydown',e=>{o.textContent=(e.ctrlKey?'ctrl+':'')+e.key+':'+e.code})</script>`
    expect(
      await pass(html, ['press #b Enter', '#o text == b', '#b focused'], ['press #b Space', '#o text == b'], ['press #d Enter', '#o text == '], ['press #k Ctrl+z', '#o text == ctrl+z:KeyZ'], ['press #k Escape', '#o text == Escape:Escape'], ['#b focused']),
    ).toEqual(['pass', 'pass', 'pass', 'pass', 'pass', '#b does not have the keyboard focus'])
  }, 60_000)

  it('focused: holds when another check\'s frame takes the focus away', async () => {
    const html = `<button id="a">a</button><button id="b">b</button>
      <script>a.onclick=()=>setTimeout(()=>a.focus(),20);b.onclick=()=>{b.focus();b.remove()}</script>`
    const later = ['click #a', 'wait 150', '#a focused']
    expect(await pass(html, later, later, later, ['click #b', 'wait 50', '#a focused'])).toEqual(['pass', 'pass', 'pass', '#a does not have the keyboard focus'])
  }, 60_000)

  it('wait: later steps see what the timers did', async () => {
    const html = `<p id="o">no</p><script>setTimeout(()=>o.textContent='yes',150)</script>`
    expect(await pass(html, ['#o text == no', 'wait 250', '#o text == yes'], ['#o text == yes'])).toEqual(['pass', '#o text: expected "yes", found "no"'])
  }, 60_000)

  it('forms fire submit (after validation), Enter in a field submits, and method="dialog" closes the dialog', async () => {
    const html = `<form id="f"><input id="n" required><button id="go">Go</button></form><p id="o">none</p>
      <dialog id="d"><form method="dialog"><button id="ok" value="yes">OK</button></form></dialog><button id="launch" type="button">open</button>
      <script>f.addEventListener('submit',e=>{e.preventDefault();o.textContent='sent '+n.value});launch.onclick=()=>d.showModal();d.onclose=()=>o.textContent='closed '+d.returnValue</script>`
    expect(
      await pass(html, ['click #go', '#o text == none'], ['type #n Ada', 'click #go', '#o text == sent Ada'], ['type #n Lin', 'press #n Enter', '#o text == sent Lin'], ['click #launch', '#d[open] exists', 'click #ok', '#d[open] missing', 'wait 30', '#o text == closed yes']),
    ).toEqual(['pass', 'pass', 'pass', 'pass'])
  }, 60_000)
})
