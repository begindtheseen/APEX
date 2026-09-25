/* ============================================================================
   LAUNCHPAD — the realm's own words
   ----------------------------------------------------------------------------
   Most of what LAUNCHPAD says lives in the curriculum file and the document at
   the repository root. A little of it lived only in the realm's screens inside
   APEX's index.html: the "how this works" glossary, the explanations on the
   ladder, The Plan and the Tracks pages, the day-one note about where code
   starts, the reasons in the cut order. It is carried here verbatim, beside
   the few helpers that phrase curriculum facts for the reader, so no sentence
   the realm showed is lost in the move.
   ========================================================================== */
import {
  AI_COMPRESSED_SPINE,
  AI_CURRICULUM,
  AI_CURRICULUM_API,
  AI_OWNED_ONCE,
  AI_SPIRAL_PAIRS,
  type LpModule,
} from './generated/launchpad-data'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Two kinds of timing note, one label each, used on the ladder and on the
 * module page so the two never disagree: a date from your plan decides, or a
 * condition can move the module earlier.
 */
export function whenTag(m: LpModule): string {
  const t = m.trigger ?? ''
  if (/moves earlier|move earlier|follows m/i.test(t)) return 'May start earlier'
  if (/first final-round interview|your first offer/i.test(t)) return 'Starts at an event'
  if (/^after m|once you have|the week m/i.test(t)) return 'Starts after another module'
  return 'Starts by date'
}

/**
 * Owning an idea and never teaching it again are two different claims. Five
 * concepts are owned and then only consumed; three are owned once and taken
 * further later, and the sentence names where.
 */
export function ownsLine(m: LpModule): string {
  if (!m.owns?.length) return ''
  let out = ''
  for (const o of m.owns) {
    if (AI_OWNED_ONCE.includes(o)) {
      out += ` ${cap(o)} is taught here and nowhere else.`
      continue
    }
    let later: string | null = null
    let earlier: string | null = null
    for (const pr of AI_SPIRAL_PAIRS) {
      if (pr[2] !== o) continue
      if (pr[0] === m.id && !later) later = pr[1]
      else if (pr[1] === m.id && !earlier) earlier = pr[0]
    }
    out +=
      ` ${cap(o)}` +
      (later
        ? ` is taught here and taken further in ${later}.`
        : earlier
          ? ` is introduced in ${earlier} and owned here, at depth.`
          : ' is owned here.')
  }
  return out.trim()
}

const NUMBER_WORDS = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
  'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
]

/** The flagship's consumers, read from M2's exports rather than typed twice. */
export function flagshipList(): string[] {
  return AI_CURRICULUM_API.byId('M2')?.exports?.[0]?.match(/M\d+/g) ?? []
}

export function flagshipCountWord(): string {
  const n = flagshipList().length
  const w = NUMBER_WORDS[n - 1]
  return w ? cap(w) : String(n)
}

const LONGEST = Math.max(...AI_CURRICULUM.map((m) => m.hours))

/** The realm's "How this works" glossary, row for row. */
export function howRows(passedM0: boolean): [string, string][] {
  return [
    [
      'Module',
      `A unit of work. The biggest is ${LONGEST} hours — four weeks at the 18-hour ceiling, six at twelve. A few are paced by a date instead and say so on their own page. 33 of them, each opening when the ones before it are passed.`,
    ],
    ['Lab', 'A module whose result stays private. It is for learning, not for showing.'],
    ['Evidence', 'A module whose result a stranger can open and judge. These are what get you hired.'],
    ['Artifact', 'The thing you build. A module is not done until it runs.'],
    ['Delta', 'A page of notes: what the official documentation proved you wrong about, written before you build.'],
    ['Gate', 'A pass condition with a named person who says yes or no.'],
    ['Referee', 'That person. A gate with no referee is decorative.'],
    [
      'Flagship',
      `One real app you keep extending. ${flagshipCountWord()} later modules build on it: ${flagshipList().join(', ')}. It is specified in M2, before any of them.`,
    ],
    [
      'Checkpoint',
      'A named piece of a module — one of up to eleven — with its own finished state. You tick each one as you finish it, and they are what "Artifact built" waits for. They are also the legitimate places to stop: a bad week should cost you a checkpoint, not the whole module.',
    ],
    [
      'Hard gate',
      'A second kind of lock, used once. Layers 4 to 6 stay shut until the flagship is live, two real people who are not you have used it (or the written fallback in its place), about a hundred logged traces contain real failures (or, on the fallback, a hundred cases you labeled yourself), and your eval harness runs against them on every push. Working harder does not open it — but there is a fallback, and it is on the Learning page.',
    ],
    ['Primary source', 'The official documentation or specification for the tool you are using — not a tutorial about it.'],
    [
      'The words in the titles',
      "Postgres, Supabase, HTTP, streaming, evals, corpus, retrieval, metering, unit economics, CI/CD, frontend, trust boundary, tool use, durable queue: every one is defined in plain words in the first module's Words section, and every module defines its own on its own page. " +
        (passedM0
          ? 'You have passed that module; the definitions are still there if a word stops being obvious.'
          : 'Open M0 and read Words before anything else.'),
    ],
  ]
}

/** The day-one note: where code starts, before anyone concludes it is all spreadsheets. */
export function neverCodedNote(): { head: string; body: string } {
  const m0 = AI_CURRICULUM_API.byId('M0')
  const m1 = AI_CURRICULUM_API.byId('M1')
  return {
    head: 'Never written code? Start at M0 and read this first.',
    body:
      `The first module has no code in it. It is ${m0?.hours ?? 12} hours of writing one page about ` +
      'money, time and people, and it comes first because how many months you can pay your bills decides what ' +
      `you can finish. Code starts in M1 — ${m1?.hours ?? 58} hours of terminal, variables, ` +
      'loops, errors and git, from an empty file, assuming you know none of it. M2 is where you build ' +
      'the app, in month two. You do not need a project idea today.',
  }
}

export const FINISHED_NOTE = [
  'You have a deployed app with real users, an eval harness that gates its own CI, measured cost per completed task, three references who have seen you work, and a resume where every claim points at a repo.',
  'What is left is not a module. Keep the tracks running, keep the estimate log going against real tickets, and re-read M31 and M32 on the day you start.',
]

export const HARD_GATE_TODAY =
  "Nothing new opens by finishing another module. Put the flagship in front of two real people, let M10's logging collect about a hundred traces with real failures in them, and run M12's harness against those traces in continuous integration. Tick each one on the Learning page as it becomes true."

/** The hard gate box, as the ladder showed it between layers 3 and 4. */
export function hardGateText(open: boolean, sourcesPassed: number): string[] {
  if (open) return ['All four are true, so Layers 4 to 6 are open. This box stays as the record of what opened them.']
  const held = AI_CURRICULUM.filter((m) => m.layer >= 4 && m.layer <= 6)
  const heldHours = held.reduce((a, m) => a + m.hours, 0)
  const total = AI_CURRICULUM_API.totalHours().modules
  return [
    `Layer 4 does not start until all four are true. It holds back ${NUMBER_WORDS[held.length - 1] ?? held.length} modules and ${heldHours} of the ${total.toLocaleString('en-US')} module hours, and it is the only requirement here that cannot be met by working harder. ` +
      (sourcesPassed === 3
        ? 'All four lines come from work you have already done: M2 deployed the app and put it in front of two people, M10 logs the traces, M12 runs the harness. What is left is off the ladder — go and make each one true on the live app, then tick it here.'
        : 'The four lines are built by M2, M10 and M12, further up the ladder; for now this is the reason the middle of the ladder is locked.'),
    'Referee: your reviewer confirms all four, the same as any module gate. The two users and the harness run are facts they can check.',
  ]
}

/** The ladder's explanations, shown above the modules on the Learning page. */
export function ladderNotes(): [string, string][] {
  const cp = AI_CURRICULUM_API.criticalPath()
  return [
    [
      'The order inside a module',
      'Write the delta, tick each checkpoint as you finish it, claim the artifact once they are all ticked, then the gate once a referee has said yes. Nothing can be claimed out of that order.',
    ],
    [
      'What sets how long this takes',
      `The longest chain of modules, not the total hours: ${cp.path.join(' → ')} is ${cp.hours}h, and no number of hours a week finishes it faster, because each one needs the one before it. Total hours is the floor on effort; that chain is the floor on time.`,
    ],
    ['Starts by date', 'A date on your plan decides, not the ladder.'],
    ['Starts after another module', 'A particular module has to finish first.'],
    ['Starts at an event', 'Something outside the program triggers it — for these two, your first final-round interview.'],
    ['May start earlier', 'A condition can move it forward in your plan. Each module says which of these applies, inside.'],
    ['Lab and Evidence', 'Lab means the result stays private. Evidence means a stranger can open it and judge it.'],
  ]
}

export const LOCK_NOTE =
  'A module opens when every module it needs has been passed. You can open a locked one and read it; you cannot tick it.'

export function spineNote(onSpine: boolean): string {
  return onSpine
    ? ` Your plan points at the Spine, so the ${AI_COMPRESSED_SPINE.length} modules it keeps are tagged below; the rest wait until you are earning.`
    : ''
}

/** Why each cut comes where it does. */
export const CUT_REASONS: Record<string, string> = {
  M26: 'OAuth is the most learn-on-demand module here',
  M25: 'only if fewer than eight of your twenty postings ask for Python — and not if that count already moved Python earlier in your plan, since you cannot both move it up because the market asks for it and cut it because the market does not',
  M16: 'the throughput work, not the delegation policy',
}

export const CUT_INTRO =
  'If you need hours back and are not ready to drop to the Spine, cut in this order and no other. Two modules send you here; this is the list.'

export const CUT_OUTRO =
  'M32 is deliberately not on this list: it is the only module that owns landing well in a real job, which is half of what you are doing this for.'

/** The Plan's introduction. */
export const PLAN_INTRO =
  'How many months you can go without a paycheck, and how many hours a week you can truly give. Those two numbers set your deadline and which program you follow. Nothing else does. They are two of the lines the first module asks you to write;'

export const PLAN_CALCULATOR = ['This page is a calculator, not the place you start.', 'It needs no code and no project — just the two numbers — and it is here so you can see what they do before you commit to them.']

/** "What this decides", on The Plan. */
export function planDecides(flagship: string | undefined): [string, string][] {
  return [
    [
      'Your flagship',
      flagship
        ? `${flagship} — M2 builds its first version.`
        : 'Not named yet. M2 builds it; naming it here puts it on the home screen.',
    ],
    ['Your deadline', 'What your runway and your weekly hours allow. Worked out, not guessed.'],
    [
      'Which program',
      `The full ${AI_CURRICULUM_API.totalHours().count} modules, or the Spine — the ${AI_COMPRESSED_SPINE.length}-module version you take when the runway is short. It is listed below once your numbers are in, with what it costs you.`,
    ],
    [
      'The release valve',
      'Falling six weeks behind two months in a row switches you to the Spine — the shorter program named below. That is the plan working, not the plan failing; it is why the Spine exists. The monthly re-plan (Track 8, on the Parallel tracks page) is what checks it.',
    ],
    ['When you apply', 'After Layers 0-2, not when everything is finished. The date goes in your plan now.'],
  ]
}

/** "Why these are separate", on the parallel tracks page. */
export function tracksWhy(): [string, string][] {
  const h = AI_CURRICULUM_API.totalHours()
  return [
    ['They never finish', 'A module ends at a gate. A track runs the whole way.'],
    [
      'They are counted',
      `Their hours are in the headline total. Leave them out and you would plan for ${h.modules} hours of work that actually takes ${h.total} — ${Math.round((h.tracks / h.modules) * 100)}% more than you budgeted.`,
    ],
    [
      'They are not optional',
      'The job search and the open-source contributions are the two that get you hired. The Spine is the one exception: it pauses the open-source track until you are earning.',
    ],
  ]
}

/** What the Claim progress card says above the three ticks. */
export const CLAIM_EXPLAINER =
  'Delta: your notes on where the official documentation proved you wrong. Artifact: the thing you built. Gate: someone else checked it and said yes. Tick them in order; the gate is what opens the next module. Un-ticking one clears the ones after it, here and in every module that depended on this one.'

export const STAND_IN_NOTE =
  'No referee available for this one? Track 5 says what may stand in, once per attempt, and what it costs: the whole conversation is kept, failures included, and a failed stand-in review counts as a failed gate.'

/** The hint under each of the three ticks. */
export function claimHints(id: string, delta: boolean, cp: { done: number; total: number }): Record<'delta' | 'artifact' | 'gate', string> {
  return {
    delta: id === 'M0' ? 'one paragraph: what you believe this will take' : 'the documentation read, your notes made',
    artifact: cp.total
      ? !delta
        ? `delta first, then the ${cp.total} checkpoints`
        : cp.done >= cp.total
          ? `all ${cp.total} checkpoints ticked`
          : `checkpoints first — ${cp.done} of ${cp.total} done`
      : 'not a plan to build it',
    gate: 'a referee said yes',
  }
}
