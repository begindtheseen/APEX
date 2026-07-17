// ============================================================
// APEX — OBSIDIAN curriculum (the black side of the app)
// ============================================================
// This file is the ONLY thing the Obsidian section needs to teach a
// completely different subject. Replace the placeholder content below
// with the curriculum from your handoff session and the whole black
// realm — lessons, flashcards, quizzes, spaced repetition, progress
// bars, and adaptive timed drills — lights up with it. index.html
// never needs to change.
//
// ─────────────────────────────────────────────────────────────
// HANDOFF SPEC — give this block to the session generating the
// curriculum, and have it output this exact file back to you.
// ─────────────────────────────────────────────────────────────
//
// The file must define, as plain browser globals (ES5, NO template
// literals, NO import/export):
//
// 1) window.OBSIDIAN_CONFIG = {
//      brand:   'OBSIDIAN',          // short nav label, ALL CAPS looks best
//      name:    'Your Course Name',  // full display name on the dashboard
//      tagline: 'One line saying what this curriculum teaches.',
//      subjects: {                   // one entry per subject/track key
//        KEY: { name:'Full subject name', blurb:'One-line description.' }
//      },
//      order:  ['KEY', ...],         // study order of the subject keys
//      drills: { n:12, min:15 }      // timed drill: questions per run, minutes
//    };
//
// 2) window.OBSIDIAN_CURRICULUM = [ topic, topic, ... ] where each topic is:
//    {
//      id:    'sub_slug',            // unique snake_case id, stable forever
//                                    // (progress is stored against this id)
//      sub:   'KEY',                 // one of the OBSIDIAN_CONFIG.subjects keys
//      title: 'Topic title',
//      concept: '<p>The lesson itself. Plain HTML: <b>, <i>, <p>, lists, and
//                inline <svg> are all fine. Teach the idea in 1-3 short
//                paragraphs a phone screen can hold.</p>',
//      example: '<p><b>Ex:</b> optional worked example, same HTML rules.</p>',
//      cards: [                      // 2-5 flashcards per topic
//        { f:'Front of card (prompt)', b:'Back of card (answer).' }
//      ],
//      quiz: [                       // 1-4 multiple-choice questions per topic
//        { q:'Question text?', c:['choice A','choice B','choice C','choice D'],
//          a:0,                      // index into c of the CORRECT choice
//          e:'One-line explanation shown after answering.' }
//      ]
//    }
//
// 3) OPTIONAL — window.OBSIDIAN_QBANK = { KEY: [ item, ... ] } for the
//    adaptive timed drills. Each item:
//    { q:'Question?', c:['A','B','C','D'], a:0, e:'Explanation.',
//      d:1 }                         // difficulty 1 easy · 2 medium · 3 hard
//    Aim for 20+ items per subject, mixed difficulty, if you want drills.
//    Omit OBSIDIAN_QBANK entirely and the drill panel hides itself.
//
// Authoring rules (match the rest of APEX):
//  - ES5 only. No template literals, no arrow functions in this file.
//  - Apostrophes inside strings: use ’ or rewrite the sentence; never
//    a raw ' inside a '-quoted string.
//  - Quiz answers: vary which index is correct; keep 4 choices everywhere.
//  - Keep every id unique and permanent — renaming an id orphans progress.
// ─────────────────────────────────────────────────────────────

window.OBSIDIAN_CONFIG = {
  brand: 'OBSIDIAN',
  name: 'Obsidian Academy',
  tagline: 'A second curriculum on the same engine. Placeholder content — paste the handoff curriculum into obsidian.js to replace it.',
  subjects: {
    INTRO: { name: 'Using Obsidian', blurb: 'How this side of the app works, until the real curriculum lands.' }
  },
  order: ['INTRO'],
  drills: { n: 12, min: 15 }
};

window.OBSIDIAN_CURRICULUM = [
  { id: 'intro_engine', sub: 'INTRO', title: 'How this realm works',
    concept: '<p>Obsidian is the black side of APEX. It runs the exact same learning engine as the Study tab — <b>lesson &rarr; flashcards &rarr; quiz</b> — but on a completely separate curriculum and separate progress, so nothing here touches your ASVAB data.</p><p>Score <b>70% or better</b> on a topic quiz and the topic climbs a spaced-repetition box (1 &rarr; 5). Each box pushes the next review further out: 1, 1, 2, 4, 7, then 15 days. Reach <b>box 3</b> and the topic is marked MASTERED. Topics due for review surface at the top of the dashboard.</p>',
    example: '<p><b>Ex:</b> Pass a quiz today &rarr; box 1, review due tomorrow. Pass again tomorrow &rarr; box 2, due in 2 days. Keep passing and reviews spread out to 15 days apart.</p>',
    cards: [
      { f: 'What score advances a topic to the next SRS box?', b: '70% or better on its quiz.' },
      { f: 'When is a topic MASTERED?', b: 'When it reaches SRS box 3 of 5.' },
      { f: 'Does Obsidian progress touch the blue-side ASVAB data?', b: 'No — it is stored separately and exported separately.' }
    ],
    quiz: [
      { q: 'A topic sits in box 2. You score 3/4 on its quiz. What happens?', c: ['It moves to box 3 and is marked MASTERED', 'It resets to box 0', 'Nothing until tomorrow', 'It moves to box 5'], a: 0, e: '75% passes, the box climbs from 2 to 3, and box 3 is the mastery line.' },
      { q: 'Review spacing across boxes 1-5 is…', c: ['1, 1, 2, 4, 7, 15 days', '1 day forever', '30 days flat', '66 days'], a: 0, e: 'Leitner-style expanding intervals: 1, 1, 2, 4, 7, 15 days.' }
    ] },
  { id: 'intro_swap', sub: 'INTRO', title: 'Installing the handoff curriculum',
    concept: '<p>The whole curriculum lives in one file: <b>obsidian.js</b>. The top of that file contains a HANDOFF SPEC comment — give it to the session that is writing your new curriculum and have it return the finished file.</p><p>Then replace the placeholder <b>OBSIDIAN_CONFIG</b>, <b>OBSIDIAN_CURRICULUM</b>, and (optionally) <b>OBSIDIAN_QBANK</b> in obsidian.js with what it produced. Reload the app — the brand, subjects, topics, and drills all come from that file. Nothing else changes.</p>',
    cards: [
      { f: 'Which file holds the Obsidian curriculum?', b: 'obsidian.js — config, topics, and optional drill bank.' },
      { f: 'What must the handoff session be given?', b: 'The HANDOFF SPEC comment at the top of obsidian.js.' },
      { f: 'What happens if OBSIDIAN_QBANK is omitted?', b: 'The timed-drill panel hides itself; lessons and quizzes still work.' }
    ],
    quiz: [
      { q: 'To teach a new subject in Obsidian you edit…', c: ['obsidian.js only', 'index.html', 'curriculum.js', 'sw.js'], a: 0, e: 'The realm is data-driven: obsidian.js is the single swap point.' }
    ] }
];

// Placeholder drill bank — replace (or delete) with the handoff QBANK.
window.OBSIDIAN_QBANK = {
  INTRO: [
    { q: 'Passing a topic quiz requires at least…', c: ['70%', '50%', '90%', '100%'], a: 0, e: 'The SRS advances on 70%+.', d: 1 },
    { q: 'In an adaptive drill, a correct answer makes the next question…', c: ['harder', 'easier', 'the same', 'random'], a: 0, e: 'Difficulty steps up on a hit, down on a miss.', d: 1 },
    { q: 'Obsidian stores its progress in…', c: ['its own separate save, apart from the ASVAB data', 'the same record as the blue side', 'the service worker cache', 'nowhere'], a: 0, e: 'Separate localStorage key with its own export/restore.', d: 2 },
    { q: 'MASTERED is shown at box…', c: ['3', '1', '5', '2'], a: 0, e: 'Box 3 of 5 marks mastery; boxes 4-5 keep spacing reviews out.', d: 2 },
    { q: 'Harder drill questions…', c: ['count more toward the score', 'count less', 'are ignored', 'end the drill'], a: 0, e: 'Scoring is difficulty-weighted, like the estimator on the blue side.', d: 3 }
  ]
};
