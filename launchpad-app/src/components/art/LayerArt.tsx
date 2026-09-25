/* ============================================================================
   LAUNCHPAD — layer art
   ----------------------------------------------------------------------------
   One small animated scene per layer, carried over from the realm: a runway
   bar, a call stack, a test grid with one survivor, tokens leaving a prompt, a
   branch merging back, a query finding its nearest neighbour, a pipeline, the
   cold funnel beside the referred door, and the weekly budget changing shape
   on hire day. Abstract on purpose — the shape of the work, not a screenshot.

   They sit where ORBIT's dashboard cards put their thumbnails. Each is an SVG
   built from constants and the plan's own numbers (never from anything a user
   typed), so it is drawn as markup rather than rebuilt as JSX line by line.
   ========================================================================== */
import { useMemo, useRef } from 'react'
import { useSvgClock } from '@/components/lp'
import { AI_CURRICULUM_API, type LpSetup } from '@/curriculum/generated/launchpad-data'

function svg(inner: string): string {
  return `<svg class="lp-art" viewBox="0 0 180 118" aria-hidden="true" focusable="false" style="width:100%;height:auto;display:block">${inner}</svg>`
}

const D = 'stroke="#22456e"'
const A = 'stroke="#4db8ff"'
const C = 'stroke="#00d4ff"'

export function layerArtSvg(n: number, setup: LpSetup): string {
  switch (n) {
    case 0: {
      // The Contract — a runway bar and a marker landing on a decision.
      const pl = AI_CURRICULUM_API.plan(setup)
      const planSet = pl.recommend !== 'unset'
      let label = 'set your two numbers on The Plan'
      if (planSet && pl.fullMonths) {
        const mo = pl.recommend === 'spine' ? (pl.spineMonths ?? pl.fullMonths) : pl.fullMonths
        label = mo.toFixed(1) + ' months' + (mo > pl.runwayMonths ? ' — past your runway' : ' at your hours')
      }
      return svg(
        `<text x="14" y="34" font-size="10" fill="#5b7fa6" letter-spacing="1">${planSet ? 'FINISH' : 'RUNWAY'}</text>` +
          '<rect x="14" y="52" width="152" height="8" rx="4" fill="#0d1c31"/>' +
          '<rect x="14" y="52" height="8" rx="4" fill="#4db8ff" opacity=".8"><animate attributeName="width" values="30;100;30" dur="6s" repeatCount="indefinite"/></rect>' +
          '<circle cy="56" r="4.5" fill="#00d4ff"><animate attributeName="cx" values="44;114;44" dur="6s" repeatCount="indefinite"/></circle>' +
          `<text x="14" y="84" font-size="8" fill="#5b7fa6">${label}</text>`,
      )
    }
    case 1: {
      // The Machine — a call stack pushing and popping.
      let st = ''
      for (let i = 0; i < 3; i++) {
        st +=
          `<rect x="30" y="${74 - i * 20}" width="120" height="16" rx="3" fill="#0d1c31" stroke="#22456e" stroke-width="1"/>` +
          `<rect x="30" y="${74 - i * 20}" width="120" height="16" rx="3" fill="#4db8ff" opacity="0">` +
          `<animate attributeName="opacity" values="0;.34;.34;0" keyTimes="0;${(0.12 + i * 0.1).toFixed(2)};${(0.6 - i * 0.1).toFixed(2)};1" dur="5s" repeatCount="indefinite"/></rect>`
      }
      return svg(
        '<text x="30" y="26" font-size="10" fill="#5b7fa6" letter-spacing="1">HOW CODE RUNS</text>' +
          st +
          '<circle cx="160" r="3.5" fill="#00d4ff"><animate attributeName="cy" values="82;42;82" dur="5s" repeatCount="indefinite"/></circle>',
      )
    }
    case 2: {
      // The Craft I — a test grid going green, one stubborn survivor.
      let g = ''
      for (let i = 0; i < 12; i++) {
        const cx = 26 + (i % 6) * 26
        const cy = 46 + Math.floor(i / 6) * 24
        const red = i === 7
        g += `<rect x="${cx}" y="${cy}" width="18" height="18" rx="4" fill="${red ? '#2a1116' : '#0d1c31'}" stroke="${red ? '#ff4455' : '#22456e'}" stroke-width="1"/>`
        if (!red) {
          g +=
            `<rect x="${cx}" y="${cy}" width="18" height="18" rx="4" fill="#4db8ff" opacity="0">` +
            `<animate attributeName="opacity" values="0;0;.55;.55;0" keyTimes="0;${(0.08 + i * 0.05).toFixed(2)};${(0.16 + i * 0.05).toFixed(2)};0.93;1" dur="6s" repeatCount="indefinite"/></rect>`
        }
      }
      return svg(
        '<text x="26" y="30" font-size="10" fill="#5b7fa6" letter-spacing="1">TESTS</text>' +
          '<text x="112" y="30" font-size="10" fill="#ff4455">one still red</text>' +
          g,
      )
    }
    case 3: {
      // The AI Production Core — tokens streaming out of a prompt.
      let tk = ''
      for (let i = 0; i < 6; i++) {
        const begin = (i * 0.42).toFixed(2)
        tk +=
          `<rect x="68" y="${52 + (i % 2) * 12}" width="14" height="7" rx="3" fill="#4db8ff" opacity="0">` +
          `<animate attributeName="x" values="68;${150 - i * 4}" dur="3.4s" begin="${begin}s" repeatCount="indefinite"/>` +
          `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.7;1" dur="3.4s" begin="${begin}s" repeatCount="indefinite"/></rect>`
      }
      return svg(
        '<text x="14" y="32" font-size="10" fill="#5b7fa6" letter-spacing="1">THE MODEL</text>' +
          '<rect x="14" y="44" width="46" height="32" rx="5" fill="#0d1c31" stroke="#22456e" stroke-width="1"/>' +
          '<text x="37" y="64" font-size="7.5" fill="#7dd3fc" text-anchor="middle">PROMPT</text>' +
          tk +
          '<text x="14" y="96" font-size="9.5" fill="#5b7fa6">measured, not guessed</text>',
      )
    }
    case 4: {
      // The Craft II — a branch leaving main and merging back.
      const dots = [24, 60, 96, 132, 156]
        .map((x) => `<circle cx="${x}" cy="78" r="4" fill="#0d1c31" stroke="#4db8ff" stroke-width="1.4"/>`)
        .join('')
      return svg(
        '<text x="24" y="30" font-size="10" fill="#5b7fa6" letter-spacing="1">SHARED CODE</text>' +
          `<path d="M24 78 H156" ${D} stroke-width="1.4" fill="none"/>` +
          `<path d="M60 78 C 78 78, 82 48, 100 48 H124 C 142 48, 146 78, 156 78" ${A} stroke-width="1.4" fill="none" stroke-dasharray="160" stroke-dashoffset="160"><animate attributeName="stroke-dashoffset" values="160;0;0;160" keyTimes="0;0.55;0.9;1" dur="4.5s" repeatCount="indefinite"/></path>` +
          dots +
          '<circle cx="100" cy="48" r="4" fill="#0d1c31" stroke="#00d4ff" stroke-width="1.4"/>' +
          '<circle cx="124" cy="48" r="4" fill="#0d1c31" stroke="#00d4ff" stroke-width="1.4"/>',
      )
    }
    case 5: {
      // The AI Layer — a query reaching the nearest candidate.
      const pts = [
        [46, 46], [70, 74], [98, 40], [120, 68], [144, 52], [60, 94], [130, 92],
      ]
      const cand = pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#22456e"/>`).join('')
      return svg(
        '<text x="14" y="30" font-size="10" fill="#5b7fa6" letter-spacing="1">SEARCH</text>' +
          cand +
          '<circle cx="88" cy="60" r="4.5" fill="#00d4ff"><animate attributeName="r" values="4.5;6.5;4.5" dur="3s" repeatCount="indefinite"/></circle>' +
          `<circle cx="24" cy="66" r="5" fill="none" ${A} stroke-width="1.5"/>` +
          `<line x1="29" y1="66" x2="83" y2="61" ${C} stroke-width="1.2" stroke-dasharray="58" stroke-dashoffset="58">` +
          '<animate attributeName="stroke-dashoffset" values="58;0;0;58" keyTimes="0;.35;.75;1" dur="4s" repeatCount="indefinite"/></line>' +
          '<text x="14" y="108" font-size="9.5" fill="#5b7fa6">hits, measured</text>',
      )
    }
    case 6: {
      // Product and Platform — a pipeline advancing stage by stage.
      let pipe = ''
      for (let i = 0; i < 4; i++) {
        const px = 18 + i * 40
        pipe +=
          `<rect x="${px}" y="50" width="28" height="22" rx="5" fill="#0d1c31" stroke="#22456e" stroke-width="1"/>` +
          `<rect x="${px}" y="50" width="28" height="22" rx="5" fill="#4db8ff" opacity="0">` +
          `<animate attributeName="opacity" values="0;.5;.5;0" keyTimes="0;${(0.1 + i * 0.18).toFixed(2)};${(0.34 + i * 0.18).toFixed(2)};1" dur="5.5s" repeatCount="indefinite"/></rect>`
        if (i < 3) pipe += `<line x1="${px + 28}" y1="61" x2="${px + 40}" y2="61" ${D} stroke-width="1.2"/>`
      }
      return svg(
        '<text x="18" y="34" font-size="10" fill="#5b7fa6" letter-spacing="1">BUILD / GATE / SHIP</text>' +
          pipe +
          '<text x="18" y="92" font-size="9.5" fill="#5b7fa6">undo rehearsed</text>',
      )
    }
    case 7: {
      // The Market — the cold funnel beside the referred door.
      let drops = ''
      for (let i = 0; i < 5; i++) {
        const begin = (i * 0.55).toFixed(2)
        drops +=
          `<circle cx="${32 + i * 11}" cy="36" r="2.6" fill="#7dd3fc" opacity="0">` +
          `<animate attributeName="cy" values="36;88" dur="4s" begin="${begin}s" repeatCount="indefinite"/>` +
          `<animate attributeName="opacity" values="1;1;0" keyTimes="0;.5;1" dur="4s" begin="${begin}s" repeatCount="indefinite"/></circle>`
      }
      return svg(
        '<text x="20" y="30" font-size="10" fill="#5b7fa6" letter-spacing="1">COLD</text>' +
          '<text x="106" y="30" font-size="10" fill="#4db8ff" letter-spacing="1">REFERRED</text>' +
          `<path d="M20 40 H90 L72 68 V90 H38 V68 Z" fill="#4db8ff" fill-opacity=".08" ${D} stroke-width="1.3"/>` +
          drops +
          `<rect x="110" y="44" width="50" height="46" rx="7" fill="#0d1c31" ${A} stroke-width="1.3"/>` +
          `<circle cx="135" cy="60" r="5.5" fill="none" ${C} stroke-width="1.3"/>` +
          `<path d="M125 80 a10 10 0 0 1 20 0" fill="none" ${C} stroke-width="1.3"/>` +
          '<circle cx="135" cy="67" fill="none" stroke="#00d4ff" stroke-width="1">' +
          '<animate attributeName="r" values="9;24" dur="3s" repeatCount="indefinite"/>' +
          '<animate attributeName="opacity" values=".65;0" dur="3s" repeatCount="indefinite"/></circle>',
      )
    }
    case 8: {
      // Employed Mode — the weekly budget changing shape on hire day. The
      // badge is the employed number on purpose: this layer's whole content is
      // that the weekly number changes once you are hired.
      let bars = ''
      for (let i = 0; i < 8; i++) {
        const bx = 20 + i * 19
        const pre = i < 4
        bars +=
          `<rect x="${bx}" width="12" rx="3" fill="${pre ? '#22456e' : '#4db8ff'}" opacity="${pre ? '.75' : '.9'}">` +
          `<animate attributeName="height" values="${pre ? '44;44;44;44' : '44;18;18;44'}" keyTimes="0;0.35;0.9;1" dur="4s" repeatCount="indefinite"/>` +
          `<animate attributeName="y" values="${pre ? '34;34;34;34' : '34;60;60;34'}" keyTimes="0;0.35;0.9;1" dur="4s" repeatCount="indefinite"/></rect>`
      }
      return svg(
        '<text x="20" y="22" font-size="10" fill="#5b7fa6" letter-spacing="1">5–8 H / WK</text>' +
          '<text x="99" y="22" font-size="10" fill="#00d4ff" letter-spacing="1">HIRED</text>' +
          bars +
          '<line x1="94" y1="28" x2="94" y2="86" stroke="#00d4ff" stroke-width="1.2" stroke-dasharray="3 3"/>' +
          '<text x="20" y="104" font-size="9.5" fill="#5b7fa6">the plan succeeding</text>',
      )
    }
    default:
      return ''
  }
}

/** A layer's scene, sized to whatever box it is put in. */
export function LayerArt({ layer, setup, className }: { layer: number; setup: LpSetup; className?: string }) {
  const key = layer === 0 ? JSON.stringify(setup) : ''
  // Only the first scene reads the plan; the rest are fixed.
  const markup = useMemo(() => layerArtSvg(layer, setup), [layer, key]) // eslint-disable-line react-hooks/exhaustive-deps
  const ref = useRef<HTMLDivElement>(null)
  useSvgClock(ref, [markup])
  return <div className={className} ref={ref} aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />
}
