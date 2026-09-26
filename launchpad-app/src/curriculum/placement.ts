/* ============================================================================
   LAUNCHPAD — the placement test's skills and questions
   ----------------------------------------------------------------------------
   Deliberately short: one question for each skill a module is built around,
   so it takes five minutes rather than twenty. A right answer marks that
   module's lesson as tested out; a wrong one or "I don't know" puts it on the
   plan. Nothing is locked either way — every module's gate still has to be
   passed the ordinary way to claim it.

   Each wrong choice is a real misconception, so a wrong answer says which.
   The engine is src/engine/placement.ts (the same one ORBIT uses).
   ========================================================================== */
import type { PlacementQuestion, PlacementSkill } from '@/engine/placement'

const skill = (n: number, id: string, label: string): PlacementSkill => ({ id, label, moduleId: `M${n}`, lessonId: `m${n}-the-module` })

export const PLACEMENT_SKILLS: PlacementSkill[] = [
  skill(1, 'first-code', 'Writing and running code'),
  skill(3, 'runtime', 'How JavaScript runs: async and the event loop'),
  skill(4, 'machine', 'The machine underneath: memory, disk, network'),
  skill(5, 'sql', 'SQL and Postgres'),
  skill(6, 'llm', 'Language models as a function'),
  skill(7, 'http', 'HTTP and the wire'),
  skill(8, 'queues', 'Background jobs and queues'),
  skill(9, 'testing', 'Tests that fail for the right reason'),
  skill(15, 'git', 'Git and code review'),
  skill(21, 'security', 'Security and trust boundaries'),
  skill(23, 'deploy', 'Deploying, CI/CD and operating it'),
  skill(24, 'python', 'Python'),
]

const q = (id: string, s: string, prompt: string, choices: string[], answer: number, explain: string): PlacementQuestion => ({
  id,
  skill: s,
  prompt,
  choices,
  answer,
  explain,
})

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  q('fc1', 'first-code', 'What does this print?\n\n```js\nlet n = 3\nn = n + 2\nconsole.log(n)\n```', ['`5`', '`3`', '`32`', '`n + 2`'], 0,
    '`n = n + 2` reads the current value (3), adds 2, and stores 5 back in `n`. `32` would be joining text, which only happens with strings.'),
  q('rt1', 'runtime', 'Inside an `async` function, what does `await somePromise` do?', [
    'Pauses that function until the promise settles, while other work keeps running',
    'Blocks the whole program until the promise settles',
    'Runs the promise on a separate thread',
    'Turns the promise into a string',
  ], 0, 'Only the async function waits; the event loop carries on with other callbacks meanwhile. That is why one slow request does not freeze a Node server.'),
  q('mc1', 'machine', 'Which of these is fastest for a program to read from?', ['The CPU cache', 'Main memory (RAM)', 'An SSD', 'Another server over the network'], 0,
    'Each step down — cache, RAM, SSD, network — is roughly ten to a thousand times slower than the one before. Knowing where your data lives explains most performance surprises.'),
  q('sq1', 'sql', 'Which query returns every user older than 30?', [
    '`SELECT * FROM users WHERE age > 30;`',
    '`GET users WHERE age > 30;`',
    '`SELECT users IF age > 30;`',
    '`FIND * IN users (age > 30);`',
  ], 0, '`SELECT` picks columns (`*` means all), `FROM` names the table, `WHERE` filters rows. The others are not SQL.'),
  q('lm1', 'llm', 'To a language model, what is a "token"?', [
    'A chunk of text, often part of a word, that the model reads and writes in',
    'The API key you pay with',
    'One whole sentence',
    'A unit of GPU memory',
  ], 0, 'Models see text as tokens — roughly three quarters of a word each in English. Prices, context limits and speed are all counted in them.'),
  q('ht1', 'http', 'Which HTTP status code means "not found"?', ['404', '500', '200', '301'], 0,
    '200 is OK, 301 is "moved permanently", 404 is "not found" (a client-side problem), 500 is a server error.'),
  q('qu1', 'queues', 'Why put slow work, like sending an email, on a background job queue?', [
    'So the request answers quickly, and the job can be retried safely if it fails',
    'Because queues make the email itself send faster',
    'So the work never has to run at all',
    'Because databases cannot send email',
  ], 0, 'The user gets a fast response; a worker does the slow part later and can retry it. The catch you learn in the module: a retried job must be safe to run twice.'),
  q('te1', 'testing', 'A test still passes after you break the code it is meant to check. What is true about that test?', [
    'It is not testing anything — a good test fails when the behaviour it checks is wrong',
    'It is a strong test, because it always passes',
    'It is fine, as long as coverage is high',
    'It proves the code is correct',
  ], 0, 'A test earns its keep by failing for the right reason. Break the code on purpose once and watch the test go red; if it does not, it is decoration.'),
  q('gi1', 'git', 'What does `git commit` do?', [
    'Saves a snapshot of your staged changes in your local history',
    'Uploads your changes to GitHub',
    'Downloads other people\'s changes',
    'Deletes the files you changed',
  ], 0, 'A commit is local. Sending commits to GitHub is `git push`; getting other people\'s is `git pull` (or `fetch`).'),
  q('se1', 'security', 'Why must you never build a SQL query by pasting user input into the query string?', [
    'The input can contain SQL of its own and run commands on your database (SQL injection)',
    'It makes the query slower',
    'SQL does not allow text from users',
    'It is only a style rule',
  ], 0, 'Parameterised queries keep data as data. Pasted input like `\'; DROP TABLE users; --` becomes code — the oldest trust-boundary mistake there is.'),
  q('de1', 'deploy', 'What is CI (continuous integration) mainly for?', [
    'Building and testing every change automatically before it is merged',
    'Hosting the website',
    'Writing the code for you',
    'Backing up the database every night',
  ], 0, 'CI runs your checks on every push or pull request, so a broken change is caught before it reaches main — and before it reaches users.'),
  q('py1', 'python', 'In Python, what does `len([4, 8, 15])` return?', ['`3`', '`27`', '`15`', '`[4, 8, 15]`'], 0,
    '`len` counts the items in a list: three of them. `27` would be `sum([4, 8, 15])`.'),
]
