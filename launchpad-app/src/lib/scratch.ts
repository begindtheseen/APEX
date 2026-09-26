/* ============================================================================
   The playground's sample programs
   ----------------------------------------------------------------------------
   What each language opens on, in the playground and wherever the playground
   is embedded (a lesson's "Try it here"), and the seed data SQL runs on:
   small, runnable, and about the work LAUNCHPAD teaches.
   ========================================================================== */

export const SCRATCH: Record<string, string> = {
  typescript: `// M3: a discriminated union, and the compiler holding you to every case.
// Delete one of the cases below and run it again — the build stops before
// anything runs, the way strict \`tsc\` stops CI.
type Reply =
  | { kind: 'text'; text: string }
  | { kind: 'tool_call'; name: string; args: Record<string, unknown> }
  | { kind: 'refusal'; reason: string }

function describe(reply: Reply): string {
  switch (reply.kind) {
    case 'text':
      return \`text (\${reply.text.length} chars)\`
    case 'tool_call':
      return \`tool \${reply.name}(\${Object.keys(reply.args).join(', ')})\`
    case 'refusal':
      return \`refused: \${reply.reason}\`
    default: {
      const unhandled: never = reply
      return unhandled
    }
  }
}

const replies: Reply[] = [
  { kind: 'text', text: 'Here is the summary you asked for.' },
  { kind: 'tool_call', name: 'search_docs', args: { query: 'pgvector', limit: 5 } },
  { kind: 'refusal', reason: 'outside the product scope' },
]
for (const r of replies) console.log(describe(r))
`,
  javascript: `// Predict the order these lines print in, then run it.
// This is M3's first checkpoint: sync code, then microtasks, then timers.
console.log('1 sync')
setTimeout(() => console.log('2 timeout'), 0)
Promise.resolve().then(() => console.log('3 microtask'))
queueMicrotask(() => console.log('4 queueMicrotask'))
;(async () => {
  console.log('5 async, before its first await')
  await null
  console.log('6 async, after the await')
})()
console.log('7 sync, last line')
`,
  python: `# Count the lines, words and characters in a piece of text:
# M1's first program, in the second language M24 introduces.
text = "\\n".join([
    "First line.",
    "Second line, a little longer.",
    "",
    "Fourth line, after a blank one.",
])

lines = text.splitlines()
words = text.split()
print("lines:", len(lines))
print("words:", len(words))
print("chars:", len(text))
print("longest line:", max(lines, key=len))
`,
  sql: `-- Model spend per user: the roll-up M20's credit ledger is audited with.
SELECT
  u.email,
  COUNT(r.id)                      AS requests,
  SUM(r.input_tokens)              AS tokens_in,
  SUM(r.output_tokens)             AS tokens_out,
  ROUND(SUM(r.cost_usd), 4)        AS spend_usd
FROM users u
LEFT JOIN requests r ON r.user_id = u.id
GROUP BY u.id
ORDER BY spend_usd DESC;
`,
  cpp: `// Reads the input box as standard input, one request per line
// ("user tokens"), and prints each user's total — the same roll-up as
// the SQL tab, in C++. Change the input, or the code, and run it again.
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, long> tokens;
    std::string user;
    long n = 0;
    int lines = 0;
    while (std::cin >> user >> n) {
        tokens[user] += n;
        ++lines;
    }
    std::cout << lines << " requests, " << tokens.size() << " users\\n";
    for (const auto& [name, total] : tokens) {
        std::cout << "  " << name << ": " << total << " tokens\\n";
    }
    return 0;
}
`,
  html: `<!doctype html>
<html>
  <head>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem; background: #0b1020; color: #e8ecf5; }
      h1 { color: #4fc1ff; }
      button { font-size: 1rem; padding: 0.6rem 1.2rem; border: 0; border-radius: 8px; background: #2fa8e6; color: white; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Hello, web!</h1>
    <p>Edit this page and press Run Code to see it change.</p>
    <button id="launch">Launch</button>
    <p id="status">Waiting on the pad.</p>
    <script>
      let count = 0
      document.querySelector('#launch').addEventListener('click', () => {
        count += 1
        document.querySelector('#status').textContent = \`Launched \${count} time\${count === 1 ? '' : 's'}\`
        console.log('launch', count)
      })
    </script>
  </body>
</html>
`,
  text: '',
}

/** What the C++ tab's input box starts with: its standard input. */
export const CPP_STDIN = `ada 1200
lin 15000
ada 5400
sam 300
ada 800
`

/** Seed data for the standalone SQL scratchpad. */
export const SQL_SCHEMA = `
CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);
CREATE TABLE requests (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  cost_usd REAL NOT NULL
);
INSERT INTO users (id, email) VALUES (1,'ada@example.com'), (2,'lin@example.com'), (3,'sam@example.com');
INSERT INTO requests (user_id, input_tokens, output_tokens, cost_usd) VALUES
  (1, 1200, 340, 0.0087), (1, 5400, 910, 0.0298), (1, 800, 120, 0.0042),
  (2, 15000, 2100, 0.0765), (2, 300, 80, 0.0017);
`
