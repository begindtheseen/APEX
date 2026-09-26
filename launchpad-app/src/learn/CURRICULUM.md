# Curriculum map: what each course teaches

The continuity reference for every course in `tracks/`. For each language: what
each lesson teaches (by id), the words it uses for those ideas, the conventions
it sets, and what a learner can be assumed to know when the next course
starts. A later lesson may use a concept only if it is listed here for an
earlier course in the same ladder, or it teaches it itself.

Rules and format: `AUTHORING.md`, `parse.ts`, `grade.ts`. Course order and
roadmaps: `platform.ts` (`ROADMAPS`) and `index.ts` (`MASTERY`).

---

## Across every language

### The ladder

Each language: basics (`<lang>.txt`) → intermediate → advanced → expert →
projects. The per-language **MASTERY** roadmap (`master-<lang>`) walks all of
them in that order and nothing else, so each ladder must be self-sufficient
except for the dependencies named under *Between languages* below.

### What the basics do and do not do

The basics are **concept lessons only**: an idea, a worked example, one task.
No basics course has a debugging lesson with a bug report, a problem-solving
lesson, a design/refactor lesson or a multi-lesson build. (Near misses: `ts-02`
and `ts-06` fix code that does not type-check; `sql-08` fixes a wrong join;
`js-12` rewrites sequential awaits as parallel.) So in every language:

- The **first debugging lesson** of the ladder must teach the method
  (reproduce, read the error, check assumptions, narrow down, print/inspect,
  fix the cause) — later ones can refer back to it.
- The **first problem-solving lesson** must teach the approach (restate,
  examples, brute force, find the pattern, improve) and what "a big input
  that only an efficient solution finishes" means. Big-O has not been taught
  anywhere in the basics.
- The **first design lesson** must say what "refactor" means (same behaviour,
  better shape) and why the checks still pass.
- The **first build sequence** must say that each lesson's starter carries on
  from the last solution.

### Shared exercises in the basics (do not repeat them later)

Python, JavaScript, TypeScript and C++ basics deliberately share exercises, so
a learner doing two languages meets them again. Later courses should not reuse
these as "new" tasks (building on them is fine):

| Exercise                                   | Python  | JavaScript | TypeScript | C++     |
| ------------------------------------------ | ------- | ---------- | ---------- | ------- |
| Hello, world + "… running in your browser" | py-01   | js-01      | —          | cpp-01  |
| city / population (Houston, 2300000)       | py-02   | js-02      | ts-01      | cpp-02  |
| token cost 1250 × 0.000003 + 380 × 0.000015 | py-03  | js-03      | —          | —       |
| messy name → `user: ada lovelace (12 characters)` | py-04 | js-04 | —         | —       |
| `grade(score)` pass / close / fail         | py-05   | js-05      | —          | cpp-05  |
| FizzBuzz 1–15                              | py-07   | js-06      | —          | cpp-06  |
| word count + is-even                       | py-08   | js-07      | ts-03      | cpp-07 (is_even) |
| latency stats (fastest/slowest/average)    | py-06   | js-08      | ts-04 (minMax) | cpp-08 |
| count words → map                          | py-09   | js-09      | ts-09 (groupCount) | cpp-12 |
| `parse_port` 1–65535 (None/null vs error)  | py-11   | js-11      | —          | —       |
| `Counter` class (start, increment, reset)  | py-12   | —          | —          | cpp-11  |

### Shared world and tone

- The running world is a **space mission** (launch logs, fuel, orbit, rocket,
  engine, stage two) and an **AI product** (users, requests, tokens, models
  `sonnet` / `haiku`, plans `free` / `pro`, `cost_usd`). Names: `ada`, `lin`,
  `sam`, `kai`, `mo`; emails `…@example.com`; city Houston.
- Lessons sometimes point at LAUNCHPAD modules: M1 (terminal/git), M3
  (TypeScript, the trust boundary, Zod, "sequential when you meant parallel"),
  M24 (Python models).
- Second person ("you"), short plain sentences, the why and the common
  mistake. Lesson text never calls the learner "she"/"her" (AUTHORING and
  grade.ts do, internally; lessons do not).
- Tasks: "Write `name(params)` that returns …", "Make the program print
  exactly:" followed by a code block, "Create/Declare … called `x`". Every
  name the checks use is spelled out in the task in backticks.
- Hints: one to three, nudge first, never the full answer.

### Shared terminology (keep these the same everywhere)

| Idea | Word used | Where set |
| --- | --- | --- |
| named reusable code | **function** | py-08, js-07, ts-03, cpp-07 |
| function attached to a value/object | **method** ("a function attached to the value") | py-04, js-04 |
| names in a definition | **parameters** | py-08, js-07, cpp-03 (each defines both words) |
| values passed in a call | **arguments** | py-08, js-07, cpp-03; also js-08 (spread into arguments), cpp-10 (pass by value) |
| what a function gives back | **returns** / "hands a value back" | py-08 |
| Python failure | **raises an exception** (`raise`, `try`/`except`) | py-11 |
| JS/TS failure | **throws an error** (`throw`, `try`/`catch`/`finally`) | js-11 |
| C++ failure | no exceptions: return `std::optional` (cpp2-09), a `bool`/code, or `std::variant<T, Error>` (cpp3-13) | cpp2-09, cpp3-13 |
| SQL failure | the database **refuses** the write (a constraint) | sql-09, sql-11 |
| TS compile failure | **type error** (the compiler's error; nothing runs) | ts-01, ts-02 |
| C++ compile failure | the **compiler's first error** / clang **warnings** | cpp-01, cpp-05 |
| ordered collection | Python **list**, JS/TS **array**, C++ **`std::vector`** | py-06, js-08, ts-04, cpp-08 |
| key → value | Python **dict/dictionary**, JS **object**, TS `Record<K, V>` / interface, C++ **`std::map`** | py-09, js-09, ts-09/11, cpp-12 |
| "no value" | `None`, `null`/`undefined`, `NULL`, `nullptr` — each language's own, explained on first use | py-08, js-02, sql-08, cpp-13 |
| text | **string** everywhere (`str` as Python's type name) | py-01, js-01 |
| the grader | "the **checks**", "the **checker**", button **Run & check** | cpp-03, ts-02 |
| filesystem container | **folder** (with "directory" explained once) | term-02 |
| lesson title prefixes on the ladders | **Debugging:**, **Problem solving:**, **Design:**, **Capstone:** (plus Performance:, Build a container:, and web4-14's Problem finding:) | all ladders |
| a debugging task's framing | "**Bug report:**" then the symptom, then "fix the cause" | cpp2-02, term2-11, … |
| a command's result code | **exit status** ("also called an exit code") | term3-04 |
| changing shape, not behaviour | **refactor** | first design lesson of each ladder |
| option after a command (`-p`, `-r`) | **flag** | term-04 (defined), term-09 |
| inline unnamed function | **arrow function** (JS/TS/Web), **lambda** (C++; Python `lambda` not yet taught) | js-07, web-10, cpp-10 |
| program input | C++/Python: the **Input** box (stdin) | cpp-04 |
| web output | the **Preview** tab | web-01 |

---

## Between languages

### Goal roadmaps (`ROADMAPS` in platform.ts)

A goal roadmap step is a **language id**, which resolves (`trackFor`) to that
language's **basics** course only.

| Goal | Order |
| --- | --- |
| ai-product | bash → git → javascript → typescript → html → sql → python |
| software | python → bash → git → sql → cpp |
| frontend | html → javascript → typescript → bash → git |
| backend | bash → git → javascript → typescript → sql |
| data | python → sql → bash → git |
| systems | bash → git → python → cpp |

### Real dependencies

- **Git basics assume Terminal basics.** `git-01` uses `ls -a` and hidden
  files (term-09); `git-02` uses `touch`; `git-05` uses `echo … >>` (term-03,
  term-08); `git-09` uses `echo … >` and `ls`. Every goal puts bash before git.
- **TypeScript assumes JavaScript.** TS basics never teach `console.log`,
  `let`/`const`, template literals, arrow functions, `slice`, `split`, object
  spread, `??`, `Math.min(...arr)`, `JSON.parse` or `Promise` — they come from
  js-01…js-12. `ts-03` is `js-07` retyped; `ts-04` reuses `js-08`'s spread;
  `ts-11` reuses `js-09`'s spread; `ts-10` uses `JSON.parse` (js-11). Every
  goal with TypeScript puts JavaScript (basics) first. Nothing guarantees
  more: goal roadmaps reach only basics courses, and master-typescript holds
  no JavaScript course. So a TS course may assume **JavaScript basics** and
  any JavaScript idea the TS ladder itself has taught; a JavaScript idea from
  a later JavaScript course (classes, `Map`/`Set`, modules, closures…) must be
  bridged in the TS lesson's `teach` — briefly, in the words the JavaScript
  course uses for it.
- **Web's JavaScript** is self-contained at basics: `web-10` bridges
  `const`/`let`, variables, arrow functions and strings; `web-11` string `+`
  and `.length`; `web-12` arrays and `for…of`; the DOM is taught there too.
  (In **frontend** html comes *before* javascript; in **ai-product** after.)
  That is **all** the JavaScript a Web course may assume. Later Web courses
  must bridge (a short paragraph, in the JavaScript course's words) anything
  more — functions with `return` and parameters, `if`, objects,
  `map`/`filter`, template literals, `try`/`catch`, `async`/`await` — since
  master-html has no JavaScript course in it. **As built:** Web ·
  Intermediate bridges what it uses (objects, `===`, `filter`, template
  literals, `!`, ternary, `function`); from Web · Advanced on (web3-01 says
  so) the Web ladder assumes the **JavaScript basics** and bridges only what
  goes beyond them (classes, `this`, closures, `Map`/`Set`, `switch`, rest
  parameters, `find`, destructuring…). So Web · Advanced and later
  effectively depend on JavaScript basics — see the roadmap notes.
- **C++ follows Python** in software and systems; the C++ basics mirror the
  Python exercises, so C++ lessons may compare with Python ("like a Python
  list") but must not require Python.
- **SQL** comes after Python (software, data) or TypeScript (backend,
  ai-product); SQL courses must not require either.
- **Python** is first in software and data, so Python basics assume nothing.

### Roadmap review (Phase 3; recommendations, platform.ts/index.ts not edited)

The six goal roadmaps are sound for what they reach (basics only): git always
follows bash, TypeScript always follows JavaScript, and the Web basics carry
their own JavaScript. The gaps are in the generated **MASTERY** roadmaps
(`index.ts`), which hold one language's courses and nothing else:

- **master-typescript** needs the JavaScript basics before `typescript`
  (TS basics assume js-01…js-12; the TS ladder bridges only JS beyond them).
- **master-git** needs the Terminal basics before `git` (git-01/02/05/09 use
  `ls -a`, `touch`, `echo >`/`>>`). The Git ladder bridges `printf` (git2-10)
  and the few Terminal-advanced items git3-06 uses.
- **master-html** needs the JavaScript basics before `html-advanced`
  (web3-01 on assumes them; Web basics and intermediate bridge their own).

Suggested fix: a small prerequisite table next to `MASTERY`, e.g.
`{ typescript: ['javascript'], git: ['bash'], html: [['html-advanced', 'javascript']] }`,
inserting those basics courses before the named step. All other ladders
(bash, javascript, python, sql, cpp) are self-sufficient.

---

## Terminal (`bash`) — course `bash`, prefix `term-`, 10 lessons

The practice shell (`lib/shell.ts`) at the time of the basics: `pwd ls[-a -l]
cd mkdir[-p] touch echo cat head/tail -n wc -l grep[-i] cp[-r] mv rm[-r] rmdir
history clear whoami date help` and the `git` subset below; `&&`, `>`, `>>`.
**No pipes** (`|` prints "not part of this practice terminal yet"), no
variables, no scripts, no globbing, no `||`, no exit status, no `chmod`.
Start folder `/home/you/project` (prompt `~/project $`). Checks are `shell`
facts (`ran`, `used`, `printed`, `printed-line`, `file … == / contains`,
`dir`, `missing`, `cwd`, `git …`).

| Lesson | Teaches |
| --- | --- |
| term-01 | terminal, **command**, **prompt**, home `~`; `pwd`, `ls` (folders shown with `/`); this is a practice terminal |
| term-02 | `mkdir` (makes a **directory** = folder), `cd`, `cd ..`, bare `cd` goes home |
| term-03 | `touch`, `echo`, **redirect** `>` (replaces the file), `cat`; double quotes keep text together and stop `>`/`&` being read as the command |
| term-04 | **path**: **relative**, `..`, `../..`, `~`, **absolute** (`/…`); **flag** (an option starting with `-`); `mkdir -p` |
| term-05 | `cp`, `mv` (move = rename), moving into a folder, `cp -r` (**recursive**) |
| term-06 | `rm`, `rm -r`, `rmdir` (empty only); no bin — read before Enter |
| term-07 | `head -n`, `tail -n`, `wc -l`, `grep` (`-i`, `-n`); grep for digging through logs |
| term-08 | `&&` (second runs only if the first worked), `>>` appends |
| term-09 | **hidden** dot-files (`.env`, `.gitignore`), `ls -a` (`.` and `..`), `ls -l` long listing (`d` / `-`, size), **flags** combine (`-la`) |
| term-10 | `cd ~`, `cd -`, absolute paths from anywhere; `pwd` to confirm |

Conventions: task names exact file/folder names; solutions are the commands,
one per line; text written with `echo "…" > file` in double quotes; files
`launch.log`, `todo.txt`, `plan.txt`, `README.md`, `main.py`.

**Assumed at Terminal · Intermediate:** navigate and manage files and folders
by relative/absolute path; create/read/copy/move/delete files; write and
append with `>`/`>>`; inspect with `head`/`tail`/`wc -l`/`grep -i -n`; chain
with `&&`; see hidden files and the long listing. **Not yet:** pipes, `sort`,
`uniq`, `cut`, `find`, wildcards/globbing, quoting rules beyond "put text in
double quotes", variables and `$VAR`, environment variables, exit status and
`||`, `2>` / stderr, permissions and `chmod`, scripts and `#!`, `if`/loops in
the shell, `man`/`--help`, processes.

### Terminal · Intermediate — `bash-intermediate`, prefix `term2-`, 12 lessons

The practice shell is now a real small shell (quoting, variables, `$(…)`,
pipes, redirection including `2>`, loops, `if`/`test`, scripts, `sed`,
`xargs`, `find`…). Nothing in the basics text claims otherwise; the list at
the top of this section describes the shell the basics were written for.
Bridged: single quotes (term2-10, fully taught term3-01).

| Lesson | Kind | Teaches |
| --- | --- | --- |
| term2-01 | concept | wildcards `* ? [ ]`, the shell expands before the command runs, test with `echo`; opening |
| term2-02 | concept | pipes `\|`, build a pipeline one stage at a time |
| term2-03 | concept | `sort -n -r -u`, `uniq -c`, the `sort \| uniq -c \| sort -rn` idiom |
| term2-04 | concept | `head`/`tail` after `sort`, `tail -n +2` drops a header |
| term2-05 | concept | `cut -d -f` |
| term2-06 | concept | `find -name -iname -type`, quote the pattern |
| term2-07 | concept | `grep -r -n -i -v -c -l`, `^` `$` `.` in patterns |
| term2-08 | concept | stdout/stderr, `2>`, `/dev/null`, `2>&1`, `&>` |
| term2-09 | concept | `>` vs `>>`, `tee`, `tee -a` |
| term2-10 | **problem** (approach taught) | top addresses in an access log |
| term2-11 | **debugging** (method taught) | `uniq` without `sort`, header line |
| term2-12 | **debugging** | `sort f > f` empties the file; temp file + `mv` |

### Terminal · Advanced — `bash-advanced`, prefix `term3-`, 12 lessons

Bridged: running a ready-made script with `bash` (term3-02, before term3-07),
`;` between commands (term3-05), `\.` in a regex (term3-11), input
redirection `<` (term3-12).

| Lesson | Kind | Teaches |
| --- | --- | --- |
| term3-01 | concept | variables, no spaces around `=`, `${name}`, double vs **single quotes**; opening |
| term3-02 | concept | environment, `export`, `env`, `NAME=value command`, child processes |
| term3-03 | concept | command substitution `$(…)`, quote it |
| term3-04 | concept | exit status, `$?`, `grep -q`, `&&` / `\|\|` (not a true if/else) |
| term3-05 | concept | `for … in …; do …; done`, quote `"$f"`, `${f%suffix}` `${f#prefix}`, dry run with `echo` |
| term3-06 | concept | `if`/`then`/`else`/`elif`/`fi`, `[ … ]` tests (`-f -d -e -z`, `=`, `-gt`…), spaces and quotes |
| term3-07 | concept | scripts, `$1 $# "$@"`, shebang, `chmod +x`, `./`, writing files with `echo '…'` |
| term3-08 | concept | `sed 's///g'`, `-i`, `/pattern/d`, other separators |
| term3-09 | concept | `xargs`, `-n 1`, `-I {}`, `find -exec` for names with spaces |
| term3-10 | **debugging** | `bash -x`, misspelled variable, unquoted `$f`, `set -u` |
| term3-11 | **problem** | sort a downloads folder by extension, `${f##*.}`, `*.*` |
| term3-12 | **build** | a script with guard clauses, `exit` codes, errors to `>&2`, test every path |

No explicit design lesson; term3-12 carries the tool-design habits. Not
covered: `printf` (bridged in git2-10 for the Git ladder), `while read`
loops, functions in scripts, `case`, arrays, `awk`, job control and
processes (`ps`, `kill`, `&`), `ssh`, permissions beyond `chmod +x`.

---

## Git (`git`) — course `git`, prefix `git-`, 11 lessons

Practice shell git: `init status add commit -m log [--oneline] diff [--staged]
restore [--staged] branch switch [-c] checkout [-b] merge`. **No remotes**
(clone/push/pull/fetch), no stash, reset, revert, rebase, tag, `.gitignore`
behaviour, or conflict resolution (a conflicting merge stops and changes
nothing). Default branch `main`.

| Lesson | Teaches |
| --- | --- |
| git-01 | what git is (history of a project), **repository**/repo, `git init`, the hidden `.git` folder (never edit it) |
| git-02 | `git status`; **untracked**, **modified**, **staged**; status only reads |
| git-03 | **stage** with `git add <file>` / `git add .`; "Changes to be committed"; choosing lets related changes go together |
| git-04 | `git commit -m`; **commit** = snapshot + message; message finishes "This commit will…" (imperative: *Add…*, *Fix…*); `git log --oneline` (newest first, short id) |
| git-05 | `git diff` (`+` added, `-` removed, space unchanged); `git diff --staged`; read your diff before committing |
| git-06 | a tracked file goes through add → commit each time; **commit small and often**, one idea per commit |
| git-07 | `git restore <file>` (throws changes away for good), `git restore --staged` (un-stage, keep changes) |
| git-08 | **branch**, `git switch -c`, `git branch` (`*` = current), `git checkout -b` = older spelling; `main` always works |
| git-09 | commits stay on their branch; switching swaps the files in the folder |
| git-10 | `git merge <branch>` from `main`; **fast-forward** |
| git-11 | **merge commit** (two parents, "Merge branch '…'"); automatic when different files; **conflict** when both change the same lines (concept only) |

**Assumed at Git · Intermediate:** the full local loop (init, status, add,
commit, log, diff, restore), branches, fast-forward and merge commits, what a
conflict is. **Not yet:** resolving a conflict, `.gitignore`, `git show`,
`git log` options beyond `--oneline`, amending, reset/revert, stash, tags,
remotes and push/pull/PRs, rebase, `HEAD`, hashes as references, blame,
bisect.

### Git · Intermediate — `git-intermediate`, prefix `git2-`, 12 lessons

The practice git now has real 3-way merges with conflict markers, rebase,
cherry-pick, stash, reset, revert, bisect, blame and a simulated remote.
Needs only the Terminal basics; bridged: `HEAD` (git2-02, fully git2-03),
`git commit -am` (git2-03), `git rm` (git2-04), writing a multi-line file
with `printf` and `\n` (git2-10 — the conflict resolution depends on it).

| Lesson | Kind | Teaches |
| --- | --- | --- |
| git2-01 | concept | `.gitignore` patterns (comments on their own lines), `check-ignore -v`, only untracked files; opening |
| git2-02 | concept | `log --oneline --graph --all`, merged branches, `branch -d` / `-D`, `--merged` |
| git2-03 | concept | `git show`, `HEAD~n`, `show REV:file`, `restore --source` |
| git2-04 | concept | `main..feature`, `diff main feature`, `--stat`, `--name-only`, review before merging |
| git2-05 | concept | `commit --amend` (`--no-edit`, `-m`), amend only what you have not shared |
| git2-06 | concept | `stash`, `list`, `pop`, `apply`, `-u` |
| git2-07 | concept | `reset --soft / --mixed / --hard` |
| git2-08 | concept | `revert`, reset vs revert |
| git2-09 | concept | lightweight and annotated tags, semantic versioning |
| git2-10 | concept | resolving a merge conflict: markers, edit, `add`, `commit`, `merge --abort` |
| git2-11 | **debugging** (method taught) | ignored but still tracked: `ls-files`, `rm --cached` |
| git2-12 | **debugging** | recovering from `reset --hard` with `reflog` |

### Git · Advanced — `git-advanced`, prefix `git3-`, 12 lessons

Bridged: `bash check.sh`, single quotes, `;` and `$?` for git3-06 (the
Terminal advanced course teaches them in full). Remotes are a bare repo at
`~/server/rocket.git`.

| Lesson | Kind | Teaches |
| --- | --- | --- |
| git3-01 | concept | `cherry-pick`; opening |
| git3-02 | concept | `rebase` vs merge, the golden rule |
| git3-03 | concept | squash with `reset --soft`; `rebase -i` mentioned (no editor) |
| git3-04 | **debugging** | conflict during a rebase: sides swapped, `--continue`, `--skip`, `--abort` |
| git3-05 | concept | `bisect` by hand, `refs/bisect/bad` |
| git3-06 | concept | `bisect run` with an untracked check script, exit codes 0/125/other |
| git3-07 | concept | `blame`, `log -- file`, blaming past a reformat |
| git3-08 | concept | bare remote, `clone`, `remote -v`, `push`, `fetch`, `pull`, `origin/main` |
| git3-09 | **debugging** | rejected push, never `--force`, `pull --rebase` / `--no-rebase` |
| git3-10 | concept/build | team workflow: `push -u`, pull request, `merge --no-ff`, tag, `push --tags` |
| git3-11 | **debugging** | commits on a detached HEAD, rescue with `reflog` + `branch` |
| git3-12 | **debugging** | conflict while cherry-picking onto a release branch |

No problem-solving or design lesson on the Git ladder (git3-10 is the
workflow design). Not covered: submodules, worktrees, hooks, `git config`
beyond `user.name` / `pull.rebase`, signing, `filter-repo` for purging
secrets (git2-11 says to rotate the key), `switch --detach`.

---

## Web (`html`) — course `html`, prefix `web-`, 12 lessons

Pages are **fragments** (no `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` taught
or required). Checks are `dom` steps; computed styles come back as
`rgb(…)`/`px`. No network, no `localStorage`.

| Lesson | Teaches |
| --- | --- |
| web-01 | HTML, **tags** (open/close), `h1`, `p`; the Preview tab |
| web-02 | `h1`–`h6`, one `h1` per page, outline for screen readers/search; `strong`, `em` |
| web-03 | `a href`; **attributes** `name="value"`; `img src alt` (no closing tag); always write `alt` |
| web-04 | `ul`, `ol`, `li`; indenting for readability |
| web-05 | `form` wraps related fields, `label for` ↔ `input id`, `input type` (text/email/password/number/checkbox), `placeholder`, `button type="submit"` (submitting is not taught) |
| web-06 | CSS in `<style>`; **selector**, **declarations**; `color` (name, hex, `rgb()`), `font-size`, `font-family` |
| web-07 | **class** (`.name`), several classes per element, **id** (`#name`) for exactly one element; `font-weight`, `text-decoration` |
| web-08 | **box model**: content, padding, border, margin; `border-radius`; `div` as a plain box (a "card") |
| web-09 | **flexbox**: `display: flex`, `gap`, `justify-content`, `align-items`, `flex-direction: column` |
| web-10 | `<script>`, the **DOM** ("the page as objects"), `document.querySelector` (CSS selectors), `addEventListener('click', …)`, `textContent`; script after the elements. JS bridge: **variable**, `const` vs `let`, reassigning `n = n + 1`, **arrow function** as code saved to run later, **string** |
| web-11 | the `input` event, `.value`; live counters/search boxes. JS bridge: string `+` (numbers become text), `.length` (no brackets), brackets for arithmetic first |
| web-12 | build elements from data: `createElement`, `textContent`, `appendChild`. JS bridge: **array** in `[ ]`, **`for…of` loop** |

Conventions: kebab/lowercase class names (`.card`, `.row`, `.tile`, `.done`);
ids for script targets (`#add`, `#count`); 2-space indent; CSS in one
`<style>` at the top; JS in the same style as the JavaScript course (no
semicolons, single quotes, `const`, arrow functions).

**Assumed at Web · Intermediate:** structure a page with headings, text,
links, images, lists and a labelled form; style with type/class/id selectors,
colours, sizes, the box model and flexbox; wire a click or input event to
change text; build a list from an array. **Not yet:** the page skeleton
(`<!DOCTYPE html>`, `head`, `meta`), semantic layout elements (`header`,
`nav`, `main`, `section`, `article`, `footer`), tables, the cascade and
specificity, descendant/pseudo-class selectors as a topic (`:hover`,
`:not`, `:first-child` appear only in checks), units other than `px`, CSS
grid, positioning, responsive design and media queries, CSS variables,
transitions, form submission and `preventDefault`, validation attributes, the
event object, `classList`, removing elements, `innerHTML` (and why not),
ARIA, keyboard accessibility beyond labels, any JavaScript beyond the list
under *Between languages*.

### Web · Intermediate — `html-intermediate`, prefix `web2-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| web2-01 | concept | landmarks `header nav main article section aside footer`; `div` only for layout |
| web2-02 | concept | accessible forms: labels, `type` (email, number + `min`/`max`/`step`), `required`, `fieldset`/`legend`, radios sharing `name`, `:invalid`/`:valid` |
| web2-03 | concept | alt text (descriptive vs `alt=""`), heading outline, link text that stands alone |
| web2-04 | **debugging** (method taught) | keyboard reproduction, inspect role, `div` → `button`, resetting button styles |
| web2-05 | concept/debug | specificity scores, order, child `>` vs descendant, Computed panel, no `!important` |
| web2-06 | concept | `box-sizing: border-box` universal rule, margin collapse, inline vs block; `offsetWidth` (in a given script) |
| web2-07 | concept | flexbox: `justify-content`, `align-items`, `flex-wrap`, `flex: 1`, `margin-left: auto` |
| web2-08 | concept | CSS grid: `grid-template-columns`, `fr`, `repeat`, `grid-template-areas` / `grid-area` |
| web2-09 | concept | custom properties on `:root`, `var(--x, fallback)`, override the variable not the property, `setProperty` |
| web2-10 | concept | media queries (`max-width`/`min-width`), mobile vs desktop first, breakpoints, viewport meta; preview is 800px wide |
| web2-11 | concept | DOM: `createElement`, `classList`, `dataset`, `setAttribute`, `append`, `remove`; `textContent` vs `innerHTML` (XSS). JS bridge: objects and `.prop`, `===`, `filter`, `.length`, template literals |
| web2-12 | concept | the event object (`target`, `currentTarget`), `click` / `input` / `change` / `submit`, `preventDefault`. JS bridge: `.trim()`, `!`, early `return`, `cond ? a : b` |
| web2-13 | **design** | refactoring markup: meaning first, inline styles into classes, class per idea |
| web2-14 | **problem** (approach taught) | filter-as-you-type with `hidden`, one update function. JS bridge: `function` declarations, `querySelectorAll` + `for…of`, `++` |

### Web · Advanced — `html-advanced`, prefix `web3-`, 14 lessons

Opening rule (web3-01): from here the Web courses assume the **JavaScript
basics course** (functions, objects, arrays with `map`/`filter`/`reduce`,
template literals, `async`/`await`) and explain anything newer at first use.

| Lesson | Kind | Teaches |
| --- | --- | --- |
| web3-01 | concept/debug | bubbling, **event delegation**, `closest`, `contains` |
| web3-02 | concept | **state + one `render()`**, handlers only change state; `replaceChildren(...)`; bridge: spread into a call, `map` index |
| web3-03 | concept | an `h()` element helper and **components** (data → element); bridge: rest parameters, `Object.entries` + array destructuring, closure named |
| web3-04 | concept | custom validation: `novalidate`, `validity.*`, `aria-invalid`, `aria-describedby`, focus first error, `minlength` trap; bridge: `find`, `||` default |
| web3-05 | concept | disclosure: `button`, `aria-expanded`, `aria-controls`, `hidden`; ARIA's first rule; `details`/`summary` |
| web3-06 | concept | `setTimeout`/`clearTimeout`, sleep promise, `async` handlers, UI states, `role="status"`, the stale clear-timer bug |
| web3-07 | **debugging** | reading the console; script runs before elements exist; end of body / `DOMContentLoaded` / `defer` |
| web3-08 | **debugging** | classes (bridged), how `this` is decided, arrow / `bind` / class-field fixes |
| web3-09 | **debugging** | **closures** properly: `var` vs `let` in loops, stale snapshots |
| web3-10 | build | tabs: `role` tablist/tab/tabpanel, `aria-selected`, roving `tabindex`, arrow/Home/End keys; bridge: `[...nodeList]`, `forEach` index, `in` |
| web3-11 | build | `<dialog>`, `showModal`, `method="dialog"`, `returnValue` reset, restoring focus |
| web3-12 | concept | sort + filter a table as derived view, comparator (`a - b`, `localeCompare`), sort a copy, `aria-sort` |
| web3-13 | **design** | "the page is the database" → data / render / events, delegation |
| web3-14 | **problem** | keyboard combobox: `suggestions` + `active` state, `aria-activedescendant`, `role="option"` |

### Web · Expert — `html-expert`, prefix `web4-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| web4-01 | concept | **store**: actions, pure reducers, subscribe/unsubscribe; bridge: `Set`, method shorthand, closure, `switch` |
| web4-02 | **design** | derive, don't store: selectors |
| web4-03 | concept | **keyed rendering** with a `Map` (bridged), `insertBefore` moves |
| web4-04 | concept | undo/redo with past/present/future; Ctrl/Cmd+Z; `event.ctrlKey`/`metaKey`/`shiftKey` |
| web4-05 | concept | `<template>`, `content`, `cloneNode(true)`, DocumentFragment |
| web4-06 | concept | **custom elements**: `extends HTMLElement`, lifecycle callbacks, `observedAttributes`, getters/setters, `CustomEvent` (class features bridged) |
| web4-07 | concept | batching with fragments / `replaceChildren`, layout thrashing, **debounce** (throttle named), `MutationObserver` meter |
| web4-08 | **debugging** | race conditions: request ids, `AbortController` named |
| web4-09 | **design** | design tokens, themes by swapping tokens, BEM, flat specificity; `dataset` on `html`, `delete` |
| web4-10 | **debugging** | accessibility audit: `lang`, alt, headings, labels, names, focus outlines, positive tabindex, contrast 4.5:1 |
| web4-11 | concept | focus management after removal, `tabindex="-1"`, `aria-live`; bridge: `splice`, `[x] =` destructuring |
| web4-12 | build | hash router, `hashchange`, route params, intercepting links, `aria-current` |
| web4-13 | build | form wizard as a **finite state machine** with guards |
| web4-14 | **problem finding** | a bundled bug report: split, reproduce, hypothesise, fix at source (strings from inputs, ids not positions, special cases, validation) |

### Web · Projects — `html-projects`, prefix `webp-`, 15 lessons

| Lessons | Project | Uses |
| --- | --- | --- |
| webp-01…04 | **To-do app**: state + render + submit → delegated toggle/delete with named controls → derived filters with `aria-pressed` and empty state → bulk actions (`every`/`some`) | web2-12, web3-01/02, web4-02 |
| webp-05…08 | **Quiz**: data vs state, choice buttons → answers array with derived score and locked feedback (`role="status"`) → results screen from `index === length` → restart and best score updated at the transition (`??`) | web3-02/13 |
| webp-09…12 | **Shopping cart**: integer cents + `toFixed`, cart as quantities by id → cart lines (`Object.entries`, `delete`) → totals chain with discount code and shipping rule → checkout with progressive disclosure, validation, read-then-clear | web3-03/04, web2-12 |
| webp-13 | **Capstone**: tip calculator (rounding up per person, `aria-pressed` derived) | spec + behaviour checks only |
| webp-14 | **Capstone**: unit converter through a base unit | |
| webp-15 | **Capstone**: sortable, searchable contact list with validation and ids | web3-12 |

Not covered by the Web ladder: CSS positioning (`position`, `z-index`) and
transitions/animations as lessons, `fetch` and real networking (the sandbox has
none), `localStorage` (it throws here), `history.pushState` beyond a mention,
shadow DOM beyond a mention, build tools and frameworks.

---

## JavaScript (`javascript`) — course `javascript`, prefix `js-`, 12 lessons

Runtime: body of an async function in a worker; top-level `await`; no DOM, no
Node. `console.log` of objects prints like `{ a: 1 }`.

| Lesson | Teaches |
| --- | --- |
| js-01 | statements run top to bottom; `console.log` (several values, spaces between); **string** in `'…'`/`"…"`; `//` comments |
| js-02 | **variable**; `const` (prefer it) vs `let`; reassigning a const is a TypeError; types string, number (one number type), boolean, `null`, `undefined`; `typeof` |
| js-03 | `+ - * / % **`; `Math.round/floor/max`; float approximation `0.1 + 0.2`; `toFixed` gives a string → `Number(…)` |
| js-04 | string **methods** (`trim`, `toLowerCase`, `toUpperCase`, `includes`), `.length` property (no brackets); **template literals** `` `${…}` `` |
| js-05 | `if` / `else if` / `else` with braces; `===` / `!==` (strict), avoid `==`; `&&`, `\|\|`, `!`; **ternary** `cond ? a : b` for a two-way value |
| js-06 | `for…of`, counting `for (let i…; i++)`, `while` (something must change), `+=`, `break`, `continue` |
| js-07 | `function` declarations, **arrow functions**, **parameters** vs **arguments**, default parameters, `return`, no `return` → `undefined`, functions are values; `split` and the pattern `/\s+/` ("one or more whitespace characters"); the empty-string edge case |
| js-08 | **arrays**: index, `.at(-1)`, `length`, `push`, `slice`, `includes`; const array contents can change; **spread** into arguments `Math.min(...arr)`; returning several results as an object literal (preview of js-09) |
| js-09 | **objects**: dot and bracket access, missing property → `undefined`, `Object.keys`, **destructuring** `const { a } = obj`, **spread** `{ ...obj, k: v }`; `??` (fallback when the left is `null`/`undefined`) |
| js-10 | `map`, `filter`, `reduce` (initial value), they return new arrays, chaining |
| js-11 | errors are **thrown**; `try` / `catch (err)` / `finally`; `err.message`; `throw new RangeError(…)`; `JSON.parse`; convention: `null` for "not a value at all", throw for "a value, but unusable" |
| js-12 | **Promise**, `async`/`await`, `new Promise((resolve) => setTimeout(resolve, ms))`, `Promise.all` for parallel; awaiting one by one is sequential (M3) |

Conventions: **no semicolons**, **single quotes**, 2-space indent,
**camelCase** (`wordCount`, `parsePort`, `totalTokens`), `const` unless
reassigned, arrow params always in brackets `(n) => …`, `===` only. Checks use
`case` (deep equality), `test`, `throws(fn)`, `output`.

**Assumed at JavaScript · Intermediate:** everything above. **Not yet:**
classes, `this`, `new` for your own types, getters/setters, prototypes;
modules (`import`/`export`); `Map`, `Set`; array `find`, `some`, `every`,
`sort` (and its comparator and in-place mutation), `join`, `forEach`,
`flatMap`, `indexOf`; array destructuring and rest parameters `...args`;
`Object.entries` / `Object.values` / `Object.fromEntries`; optional chaining
`?.` (taught only in TS, ts-06); `JSON.stringify`; closures and scope as a
topic; higher-order functions you write yourself; regular expressions beyond
`/\s+/`; `Date`; `switch`; errors in async code (`try`/`catch` around `await`,
rejected promises), `Promise.allSettled` / `race`; custom `Error` subclasses;
generators and iterators; value vs reference / mutation as a topic;
immutability; recursion.

### JavaScript · Intermediate — `javascript-intermediate`, prefix `js2-`, 15 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| js2-01 | concept | callbacks get (item, index, array); `reduce` into an object; always pass a start value; `forEach` vs `map` |
| js2-02 | concept | `find` / `findIndex`, `some`, `every` (empty-array results), `flatMap`; `?? null` |
| js2-03 | **debugging** (method taught) | default `sort` is string order, comparators, `localeCompare`, sorting mutates (`[...a].sort`, `toSorted`), tie-break with `\|\|` |
| js2-04 | concept | object/array **destructuring** with defaults and nesting, **rest** parameters, **spread** in arrays and objects, later keys win |
| js2-05 | **debugging** | references and shallow copies, **immutable updates**, `structuredClone` named |
| js2-06 | concept | **regular expressions**: classes, quantifiers, anchors, flags `g`/`i`, named groups, `exec`, `matchAll`, `replace` |
| js2-07 | concept | **closures**, private state, `var` vs `let` in loops; object **method shorthand** |
| js2-08 | concept | higher-order functions: returning and wrapping functions, `(...args) => fn(...args)`, comparator builders |
| js2-09 | concept | `try`/`catch`/`finally`, **custom error subclasses** (`class … extends Error`, `super`, bridged ahead of js2-12), `instanceof`, re-throw |
| js2-10 | concept | `JSON.stringify` (indent, what is lost), `JSON.parse` + reviver, validate shape (`Array.isArray`, `in`, `typeof`), Invalid Date |
| js2-11 | concept | **`Map`** and **`Set`**, insertion order, speed vs `includes` in a loop |
| js2-12 | concept | **classes**: constructor, methods, getters/setters, **`#private`** fields, **`static`** members |
| js2-13 | **debugging** | truthiness, `\|\|` vs `??`, `==` vs `===`, explicit conversion, `typeof` when debugging |
| js2-14 | **problem** (approach taught) | counting and grouping in one pass with a `Map`, top-k with tie-break; `??=`; the **leading-`;` rule** for lines starting `(` or `[`; 300,000-word input |
| js2-15 | **design** | pure functions, no top-level state, no input mutation, compose a pipeline |

### JavaScript · Advanced — `javascript-advanced`, prefix `js3-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| js3-01 | concept | the four `this` rules, `call`/`apply`/`bind`, arrows have no `this`, chaining by returning `this`; **optional chaining `?.`** (bridged) |
| js3-02 | **debugging** | detached methods; arrow / `thisArg` / bind-in-constructor / class-field fixes |
| js3-03 | concept | **prototypes**, `Object.create`, constructor functions + `new`, inheritance by hand |
| js3-04 | concept | promises: states, `new Promise`, `.then` chaining rules, `.catch`, forgetting to return |
| js3-05 | concept | `async`/`await` + `try`/`catch`; `Promise.all` / `allSettled` / `race` / `any`; timeouts with cleanup |
| js3-06 | concept | **event loop**: sync, microtasks, tasks; `queueMicrotask`; order by `await`, not timing; IIFE |
| js3-07 | **debugging** | floating promises (`forEach(async …)`), lost updates across `await` |
| js3-08 | concept | iterables, `Symbol.iterator`, **generators** `function*`, lazy/infinite sequences, one-shot generators; swap by destructuring |
| js3-09 | concept | **debounce** and **throttle** from closures and timers |
| js3-10 | concept | **memoisation** (`Map` cache, `JSON.stringify` keys, recursive calls through the memo, `has` not truthiness) |
| js3-11 | **problem** | LRU cache with an insertion-ordered `Map`; 300,000 operations |
| js3-12 | concept | `pipe`/`compose` with `reduce`/`reduceRight`, **currying** with `fn.length` |
| js3-13 | **design** | factory functions and **dependency injection** (clock, ids, send), defaults, returning copies |
| js3-14 | **problem** | binary search (lower bound, invariants), two pointers; a million numbers |

### JavaScript · Expert — `javascript-expert`, prefix `js4-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| js4-01 | concept | **`Proxy`** traps and **`Reflect`**, validation and observation; `Object.is`, `Object.hasOwn` (bridged) |
| js4-02 | concept | **`WeakMap`**: private data, caches that do not leak |
| js4-03 | build | an event emitter: off functions, `once`, copy-on-emit, unheard `'error'` throws |
| js4-04 | **design** | **middleware** onion: `compose(dispatch(i))`, errors as rejections, `next()` twice |
| js4-05 | concept | a promise pool: tasks as functions, worker loops, results by index |
| js4-06 | concept | reactive store: pure reducers returning the same object when unchanged, subscribe, `select` |
| js4-07 | concept | deep equality (NaN, Dates, key order) and deep cloning with a `seen` Map (cycles, shared refs); `structuredClone` limits |
| js4-08 | **debugging** | floating-point money, `MAX_SAFE_INTEGER`, **`BigInt`** cents, round half up, splitting remainders |
| js4-09 | build/problem | a tokenizer (index loop, typed tokens, end token, positioned `SyntaxError`) |
| js4-10 | build/problem | recursive-descent parser + evaluator (precedence, associativity, variables, calls, errors) |
| js4-11 | build | a mini test runner: `describe`/`it`/`expect`, async tests, `toBe`/`toEqual`/`toThrow` |
| js4-12 | **problem** | **Big-O**, hidden loops in array methods, Set/Map to go O(n²) → O(n), `performance.now()`; 200,000 items |
| js4-13 | **debugging** | out-of-order responses: request counter, loading/error per latest request, `AbortController` named |
| js4-14 | concept | generators as coroutines: `next(value)`, priming, `throw`, a co-style runner |

### JavaScript · Projects — `javascript-projects`, prefix `jsp-`, 16 lessons

| Lessons | Project | Uses |
| --- | --- | --- |
| jsp-01…04 | **To-do store**: factory with invariants and copies → command pattern with `execute` + history → undo/redo stacks → rename command, `save`/load with shape validation (`corrupt save`) | js2-05/07/10, js3-13 |
| jsp-05…08 | **Adventure engine**: finite state machine as data with config validation (`Object.hasOwn`) → context, guards, actions, `enter` hooks, normalising transitions (`?.()`) → game layer on the machine (parser, world copy, `look`) → locked doors as guards, winning, `status` | js2-04/11, js4-01 |
| jsp-09…12 | **Report pipeline**: CSV state-machine parser → schema-driven typed records with collected errors → grouping in integer cents with deterministic order → aligned text table (`padStart`/`padEnd`) and `csvReport` | js2-06/14, js4-08 |
| jsp-13 | **Capstone**: spreadsheet engine (formulas, ranges, errors as values, cycles, memo per `get`) | js4-09/10 |
| jsp-14 | **Capstone**: rate-limited priority job queue with retries and `onIdle` | js3-05/06, js4-05 |
| jsp-15 | **Capstone**: template engine (scan, tree with a stack, scoped render, escaping) | js4-09 |
| jsp-16 | **Capstone**: bank with `BankError` codes, atomic transfers, statements | js2-09 |

Not covered by the JavaScript ladder: modules (`import`/`export`), the DOM
(that is the Web ladder), Node APIs, `fetch`/networking, `Intl` formatting,
`Date` arithmetic beyond validation, typed arrays, workers.

---

## TypeScript (`typescript`) — course `typescript`, prefix `ts-`, 11 lessons

Runtime: `strict`, ES2022, libs es2022 + webworker. A type error stops the
run. **No basics lesson uses a `type-error` check** — the first one a learner
meets must explain that the check proves the compiler *rejects* some code.

| Lesson | Teaches |
| --- | --- |
| ts-01 | **type annotations** `: string/number/boolean`; strict mode; type errors stop the run (like `tsc` in CI); **inference**; annotate parameters and what the compiler cannot see |
| ts-02 | reading a type error: `main.ts(line,col): error TS2322 …`; error codes; fix the value, never silence the checker |
| ts-03 | typed parameters and **return types**; `: void`; TS7006 implicit `any` in strict mode |
| ts-04 | array types `T[]`; **tuples** `[string, number]` and destructuring them |
| ts-05 | **interface** (≈ `type` alias for objects); **union of literal types** `'free' \| 'pro'`; misspelled/missing properties caught |
| ts-06 | optional property `?` → `T \| undefined`; **narrowing** with `!== undefined`; `??`; optional chaining `?.`; rule: no `!` and no `as` — narrow instead |
| ts-07 | **union** types; narrowing with `typeof`; mentions `Array.isArray`, `in`, `instanceof` |
| ts-08 | **discriminated union** on a `kind` field; `switch` on it; exhaustiveness with `const unhandled: never = x` in `default` |
| ts-09 | **generics** `<T>`; `Array<T>` = `T[]`, `Promise<T>`; `Record<string, number>` (string keys, number values); a function-typed parameter `(item: T) => string` |
| ts-10 | **`unknown`** for outside data; **type guard** `x is T`; "parse, don't assert" (`as` lies, a guard checks); the one allowed cast `x as Record<string, unknown>` inside a guard, and why it is safe; Zod mentioned (M3) |
| ts-11 | utility types `Partial`, `Readonly`, `Pick`, `Omit`, `Record<'a' \| 'b', T>`; a patch is `Partial<T>`; new object via spread |

Conventions: as JavaScript (no semicolons, single quotes, camelCase);
**interfaces for object shapes, `type` for unions**; discriminant field
named **`kind`**; union members written one per line with a leading `|`;
parameters and return types always annotated; no `any`, no `!`, no `as`
except `x as Record<string, unknown>` inside a guard (ts-10).

**Assumed at TypeScript · Intermediate:** everything above plus the whole
JavaScript basics course. **Not yet:** classes (not taught in JS either —
access modifiers, `implements`, `readonly` properties), `readonly` modifier
and `ReadonlyArray`, `as const`, `keyof`, `typeof` in type position, indexed
access types `T['k']`, generic constraints `<T extends …>`, default type
parameters, mapped and conditional types, template literal types,
`satisfies`, function overloads, enums, index signatures, typed
`Map`/`Set`, typing async functions (`Promise<T>` return types in practice),
typed errors / `Result` types, branded types (`type-error` example
`UserId` in parse.ts is not a lesson), modules, declaration files, `never`
beyond exhaustiveness.

### TypeScript · Intermediate — `typescript-intermediate`, prefix `ts2-`, 14 lessons

Leans only on TypeScript basics + JavaScript basics; JavaScript beyond that
is bridged where used (classes in ts2-02, array spread ts2-04, rest
parameters ts2-05, `every` ts2-08, rest destructuring ts2-09, `sort` ts2-13,
`Map` and class fields ts2-14). **Type-error checks** are introduced and
explained in ts2-01.

| Lesson | Kind | Teaches |
| --- | --- | --- |
| ts2-01 | concept | interface vs type alias, `extends`, intersection `&`, declaration merging, avoid `any`; what a type-error check proves |
| ts2-02 | concept | narrowing by equality, `typeof`, `instanceof`, `in`; control-flow analysis; bridge: class, `extends Error`, `public` parameter properties |
| ts2-03 | concept | literal types, **widening** (`let`, object properties), fix where created, `Record` over a literal union |
| ts2-04 | concept | optional `?`, default parameters, **`readonly`** properties and `readonly T[]`, compile-time only (`Object.freeze`) |
| ts2-05 | concept | function types, **overloads** |
| ts2-06 | concept | **generic constraints** `T extends …`, several type parameters, explicit type arguments |
| ts2-07 | concept | user-defined **type guards**, `filter(isX)`, **assertion functions** `asserts x is T` |
| ts2-08 | concept | `any` vs `unknown`, validating outside data step by step, the honest `Record<string, unknown>` cast, results as unions |
| ts2-09 | concept | labelled, optional and rest **tuple** elements; annotate tuple returns |
| ts2-10 | concept | **enums** (numeric, reverse mapping, string) vs literal unions from `as const` arrays, `(typeof A)[number]` |
| ts2-11 | **debugging** (method taught) | read the first error literally, `find` → `T \| undefined`, `reduce` start value; no `!`/`as`/`any` fixes |
| ts2-12 | **debugging** | a type too loose to catch bugs → discriminated union ("make invalid states unrepresentable") |
| ts2-13 | **problem** (approach taught) | merge intervals, free slots; `readonly` inputs; 200,000 slots |
| ts2-14 | **design** | modelling a domain: tagged states, closed sets, results for expected failures; `private` |

### TypeScript · Advanced — `typescript-advanced`, prefix `ts3-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| ts3-01 | concept | `keyof`, indexed access `T[K]`, `typeof` in types, `K extends keyof T`; the **`Equal<A, B>` type test** (every later "… is exactly …" check); computed keys |
| ts3-02 | concept | **mapped types**, `+/-readonly`, `-?`, key remapping with `as`; `for…in` |
| ts3-03 | concept | **conditional types**, `infer`, distribution and `[T]` to stop it, recursive conditionals |
| ts3-04 | concept | utility types (`Pick`, `Omit`, `Exclude`, `Extract`, `ReturnType`, `Parameters`, `Awaited`), single source of truth, types do not remove data |
| ts3-05 | concept/debug | exhaustive `switch` + `assertNever`, `Extract` a union member |
| ts3-06 | concept | **branded types** and smart constructors |
| ts3-07 | concept | **template literal types**, `Capitalize` etc., parsing strings with `infer` |
| ts3-08 | concept | annotation vs `as const` vs **`satisfies`**, `as const satisfies` |
| ts3-09 | build | a type-safe emitter: event maps, conditional rest parameters for `void` payloads; `??=` |
| ts3-10 | build | a typed builder that tracks steps in a union type parameter |
| ts3-11 | **debugging** | types that lie about data (casts at the boundary, indexing); guard at the boundary |
| ts3-12 | concept | generic classes (`Stack`, `Queue`), `this` return, `static from`, iterable containers; class features bridged |
| ts3-13 | concept | a generic **`Result<T, E>`**, `ok`/`err` with `never`, `map`, `andThen` collecting `E \| F` |
| ts3-14 | **problem** | a generic LRU cache on a `Map`; 200,000 operations |

### TypeScript · Expert — `typescript-expert`, prefix `ts4-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| ts4-01 | concept | recursive types (`DeepReadonly`, `DeepPartial`), deep freeze/merge, `NoInfer` preview |
| ts4-02 | concept | a recursive `Json` type and guard, leaf paths (`flatMap` bridged) |
| ts4-03 | concept | route params parsed at the type level |
| ts4-04 | concept | **variadic tuples**, `[...T]` inference hint, typed partial application |
| ts4-05 | concept | **`const` type parameters**, **`NoInfer`**; `Object.fromEntries` |
| ts4-06 | **debugging** | **variance**: covariant outputs, contravariant inputs, the array hole, `readonly` defence |
| ts4-07 | build | typed state machines: state in the type, `Extract` to re-attach facts |
| ts4-08 | concept | **phantom types**, `unique symbol`, the union-inference trap fixed with `NoInfer` |
| ts4-09 | concept | Result pipelines: tagged errors, `all` over a tuple, `tryCatch`, `match` |
| ts4-10 | build | a schema library: `Schema<T>`, `Infer`, `object` from a shape, error paths |
| ts4-11 | build | optional keys (`OptionalKeys`, `Simplify`), `union`, `safeParse` |
| ts4-12 | build | a typed DI container growing its type; duplicate keys as `never`; `Proxy` bridged |
| ts4-13 | **debugging** | surprising conditional types: distribution, `never` as the empty union, `IsUnion` |
| ts4-14 | **design** | an API client that cannot be misused: computed argument lists from an endpoint map |

### TypeScript · Projects — `typescript-projects`, prefix `tsp-`, 15 lessons

| Lessons | Project | Uses |
| --- | --- | --- |
| tsp-01…04 | **Store**: branded SKUs/cents and a private inventory → orders as state types with a `Result` place → discount union with `assertNever`, money formatting → typed reports (`Record<Order['status'], number>`, generic `groupBy`) | ts3-05/06/13 |
| tsp-05…08 | **Event-sourced ledger**: readonly event union + pure `apply`/`replay` → `decide` returning tagged `CommandError`s → `Ledger` with `Extract`-typed subscriptions → generic projections, statements, time travel | ts3-05/09/13 |
| tsp-09…12 | **Router**: pattern-typed params → routes and replies (404/405/500) → middleware growing a typed context → overloads with body guards and `HttpError` | ts4-03/12, ts2-05/07 |
| tsp-13 | **Capstone**: typed form-validation library | ts3-10, ts4-11 |
| tsp-14 | **Capstone**: typed task graph (dependencies only on earlier tasks) | ts4-12 |
| tsp-15 | **Capstone**: typed CLI parser (result type computed from the spec) | ts4-05, ts3-02/03 |

Notes: several advanced/expert solutions and checks still write `x[i]!` on
index access; with `noUncheckedIndexedAccess` off it is redundant (removed
where it was pure habit in ts2-09, ts3-07, ts3-12), and `Map.get(k)!` remains
in a few solutions where the key is known to exist. Not covered: modules and
declaration files, decorators, `tsconfig` options as a topic, `infer …
extends` constraints, `this` types beyond returning `this`.

---

## Python (`python`) — course `python`, prefix `py-`, 12 lessons

Runtime: CPython 3.13 in Pyodide, stdlib only; `input()` reads the lesson's
`stdin`; `open()` works within one run.

| Lesson | Teaches |
| --- | --- |
| py-01 | programs run top to bottom; `print` (several values, spaces between); **string**; `#` comments |
| py-02 | **variable**, `=`, types `str`/`int`/`float`/`bool`, `type(x)`; reassignment; **snake_case** names |
| py-03 | `+ - * / // % **`, `/` always float, brackets, `round(x, n)` |
| py-04 | string **methods** `strip`, `lower`, `upper`; `len`; `in`; **f-strings** with any expression inside `{}`; chaining methods |
| py-05 | `if` / `elif` / `else`; indentation (4 spaces) as blocks; comparisons; `and`/`or`/`not`; `=` vs `==` |
| py-06 | **list**: index from 0, negative index, `len`, `append`, **slice** `[1:3]`; `sum`, `min`, `max`, `sorted` (mentioned) |
| py-07 | `for … in`, `range(n)` / `range(a, b)`, `+=`, `while` (must change something), `break`, `continue` |
| py-08 | **function**: `def`, **parameters** vs **arguments**, defaults, `return`, no return → `None` ("nothing"); `pass` as a placeholder body; `str.split()` |
| py-09 | **dict**: lookup, assign, `in`, `.get(key, default)`, `.items()` with `for key, value in …` |
| py-10 | **list comprehension** with optional `if`; dict comprehension |
| py-11 | **exceptions**: `try`/`except SpecificError`, `raise ValueError(…)`; catch the specific error, never bare `except:`; convention: `None` for "not a number at all", raise for "a number, but out of range" |
| py-12 | **class**, `__init__`, `self`, attributes `self.x`, methods, default constructor argument; objects each have their own data |

Conventions: **double quotes**, 4-space indent, snake_case functions and
variables, PascalCase classes, f-strings for building text, two blank lines
between top-level functions. Checks use `case` (with `True`/`False`/`None`
compared by identity), `test`, `raises(Error, fn)`, `output`.

**Assumed at Python · Intermediate:** everything above. **Not yet:**
`input()` and reading stdin (never used in basics), tuples as a topic (only
the `key, value` unpacking in py-09), sets, `str.join`, `str.replace`,
`str.split(sep)`, `enumerate`, `zip`, `sorted(key=…)` and `lambda`
(`lambda` appears only inside checks), `is` / `is None`,
truthiness, mutability and aliasing, modules and `import` (no stdlib module
has been imported yet), `with` and files, type hints, docstrings,
`__str__`/`__repr__`, inheritance, `@dataclass`, `collections`
(`Counter`, `defaultdict`), generators/`yield`, decorators, recursion,
`*args`/`**kwargs`, `assert`, custom exception classes.

### Python · Intermediate — `python-intermediate`, prefix `py2-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| py2-01 | concept | list / set / dict comprehensions, nested `for`, `a if c else b` (**conditional expression**, anywhere), **truthiness** (empty/zero/None are false), `set()` vs `{}` |
| py2-02 | concept | **tuples**, unpacking, swap, star unpacking `first, *rest`, returning several values, `enumerate(start=)`, `zip` (`strict=True`), `(5,)` |
| py2-03 | concept | string toolkit (`split(sep)`, `"-".join`, `endswith`, `replace`, `title`, `isalnum`, `isdigit`, `partition`), immutability, **format specs** (`:.2f`, `:,`, width/align `<>^`, `03d`, `%`); `join` over a generator expression (named, explained in py3-02) |
| py2-04 | concept | **`import` / `from … import`** and the standard library; `get`, `setdefault`, `collections.defaultdict`, `Counter` + `most_common` |
| py2-05 | concept | `sorted` vs `.sort()`, `key=`, **`lambda`**, tuple keys, negation for descending, stability, `min`/`max` with `key` |
| py2-06 | concept | `*args`, `**kwargs`, spreading with `*`/`**` in calls, keyword-only parameters after `*`, defaults evaluated once |
| py2-07 | **debugging** (method taught) | reproduce, expected vs got, check assumptions, inspect (`id`, `is`), fix the cause; the **mutable default argument**; `is None` vs falsy |
| py2-08 | concept | full `try` / `except … as err` / `else` / `finally`; **custom exceptions**, **subclass / inherits**, `super().__init__`, docstring; specific `except` first |
| py2-09 | **debugging** | reading a **traceback** bottom-up; crash site vs bug site; `repr`; fix at the source |
| py2-10 | concept | `__repr__`, `__eq__` + `NotImplemented`, `isinstance`, `@property` and setters, `_private` backing attribute |
| py2-11 | concept | `math` (`ceil`, `floor`, `sqrt`, `gcd`, `prod`, `inf`), `itertools` (`accumulate`, `chain`, `combinations`, `islice`, `count`, `groupby`), `namedtuple`, `deque` |
| py2-12 | concept | `splitlines`, the strip-skip-parse loop, `io.StringIO`, `csv.DictReader` / `csv.writer` (`lineterminator`) |
| py2-13 | **problem** (approach taught) | restate, examples, brute force, find the repeat, trade memory for time with a dict; big input (100,000) |
| py2-14 | **design** (refactor method taught) | pin behaviour, find the jobs, extract one at a time, name by meaning, one job per function that returns |

### Python · Advanced — `python-advanced`, prefix `py3-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| py3-01 | concept | iterable vs iterator, `__iter__`/`__next__`, `StopIteration`, `iter()`/`next()`, what `for` really does |
| py3-02 | concept | generator functions, `yield`, laziness, pipelines, **generator expressions** |
| py3-03 | **debugging** | one-shot iterators (generators, `zip`, `map`…) running dry; heisenbugs; materialise once |
| py3-04 | concept | **closures** (introduced here), decorators, `@` as shorthand, `functools.wraps`, decorators with arguments, bare `raise` |
| py3-05 | concept | context managers: `__enter__`/`__exit__` (return True swallows), `contextlib.contextmanager` with `try`/`finally`; `open` in `with`; `del d[k]` |
| py3-06 | concept | **type annotations** (not enforced), `@dataclass` (`field(default_factory=…)`, `frozen`, `order`), hashable, `Enum` |
| py3-07 | concept | special methods table (`__len__`, `__getitem__`, `__add__`, `__rmul__`, `__hash__`, `__bool__`…), the hash rule, slices; `any` / `all` |
| py3-08 | concept | `functools.partial`, `reduce` (with a start value), `lru_cache`, pure functions |
| py3-09 | **debugging** | names vs objects, **aliasing**, `[[0]*3]*2`, `dict.fromkeys`, shallow vs `copy.deepcopy` |
| py3-10 | **design** | composition over inheritance, **strategy pattern**, duck typing; refactor an `if` chain on a mode string |
| py3-11 | problem | recursion (base/recursive case), memoisation, **dynamic programming** top-down vs bottom-up (coins) |
| py3-12 | concept/problem | **Big-O** table, hidden loops (`in` on a list, `pop(0)`), sets beside lists, prefix sums |
| py3-13 | **problem** | **BFS** on a grid with `deque`, mark on enqueue, bounds before indexing |
| py3-14 | **problem** | **binary search** with an invariant (`first_at_least`), binary search on the answer (`int_sqrt`) |

### Python · Expert — `python-expert`, prefix `py4-`, 14 lessons

| Lesson | Kind | Teaches |
| --- | --- | --- |
| py4-01 | **debugging** | late binding in closures (loop lambdas), default-argument and factory fixes, `nonlocal`, `__closure__` |
| py4-02 | concept | **descriptors** (`__get__`, `__set__`, `__set_name__`), data vs non-data, how `property` / `cached_property` work |
| py4-03 | concept | `__init_subclass__`, self-registering **plugins**, validation at definition time, `type(name, bases, ns)` |
| py4-04 | concept | generator `send`, priming, `yield from`, generator return values |
| py4-05 | concept | `asyncio`: `async def`, `await`, `gather`, `Queue` + workers, `create_task`, `task_done`/`join`, cancel (timing checks < 0.55 s and < 0.8 s) |
| py4-06 | concept | `heapq` (min-heap, negation for max, running median with two heaps), `bisect` |
| py4-07 | concept | type hints, `Protocol` + `runtime_checkable`, `TypeVar`/`Generic`, `get_type_hints` |
| py4-08 | concept | **testing**: arrange/act/assert, `assert`, choosing cases that break implementations, mutation testing |
| py4-09 | **design** | functional core / imperative shell, **dependency injection**, **standard input** (`input()`, `sys.stdin.read()`), `if __name__ == "__main__":` |
| py4-10 | **debugging** | floating point: `repr`/many digits, `math.isclose` (`abs_tol`), `Decimal` from strings, `Fraction`, splitting cents with `divmod` |
| py4-11 | **problem** | edit distance DP bottom-up keeping one row |
| py4-12 | **problem** | Dijkstra with a heap, stale entries, path via `previous` |
| py4-13 | problem/build | a **tokenizer** (index loop, maximal munch, positioned errors) |
| py4-14 | problem/build | a **recursive-descent** parser from a grammar (precedence, associativity, errors, no `eval`) |

### Python · Projects — `python-projects`, prefix `pyp-`, 16 lessons

| Lessons | Project | Uses |
| --- | --- | --- |
| pyp-01…04 | **Expense tracker**: parse commands (cents, `partition`, `ValueError` policy) → `Ledger` dataclass model, `format_cents` → sorted fixed-width report → `run(lines)` error boundary + `sys.stdin` entry point | py2-03/05/08, py3-06, py4-09 |
| pyp-05…08 | **Markdown converter**: **regular expressions** (`re.sub`, `re.split`, `re.compile`, lazy vs greedy — taught in pyp-05) and HTML escaping → headings and paragraphs with a flush buffer (closure) → lists as a state machine (`nonlocal`) → fenced code blocks with an index loop, CLI | py4-01, py4-13 |
| pyp-09…12 | **Library**: domain model with dataclasses, `LibraryError`, `dataclasses.replace` → loans, rules, `datetime.date`/`timedelta`, today injected → JSON persistence (`json`, `asdict`, `@classmethod` from_json, `raise … from`) → overdue and fines | py2-08, py3-06/09, py4-09 |
| pyp-13 | **Capstone**: to-do list with undo (snapshots or commands) | spec + behaviour checks only |
| pyp-14 | **Capstone**: calculator language with variables and functions | py4-13/14, pyp-05 |
| pyp-15 | **Capstone**: bank ledger with strict validation, atomic transfers, statements | py4-10, pyp-05 |
| pyp-16 | **Capstone**: text-adventure state machine for any world | py3-09 |

Kind spread is healthy in every course: intermediate 2 debugging + 1 problem + 1 design, advanced 2 debugging + 4 problem + 1 design, expert 2 debugging + 4–6 problem + 1 design (+ testing). `input()` is described in py4-09 but no lesson reads input with it; programs use `sys.stdin.read()`. Not covered: files on disk beyond one `open` example, `pathlib`, `argparse`, logging, threads/processes, packaging, third-party libraries (the checker has only the standard library).

---

## SQL (`sql`) — course `sql`, prefix `sql-`, 12 lessons

Engine: SQLite (sql.js), fresh database per run. Course schema: `users(id,
email UNIQUE, plan 'free'|'pro', created TEXT 'YYYY-MM-DD')` (4 rows: ada,
lin, sam, kai — sam has no requests) and `requests(id, user_id → users,
model 'sonnet'|'haiku', input_tokens, output_tokens, cost_usd REAL)` (6 rows).
SQLite enforces `REFERENCES` only after `PRAGMA foreign_keys = ON;` — sql-11
says so. A later lesson that relies on enforcement must run the pragma (in
its schema or her code) and the check must prove the refusal.

| Lesson | Teaches |
| --- | --- |
| sql-01 | **tables**, rows, **columns**; `SELECT * FROM`; keywords in capitals by convention; end with `;` |
| sql-02 | choosing columns; computed column; `AS` alias; select only what you need |
| sql-03 | `WHERE`; text in single quotes; `= <> < <= > >=`; `AND`/`OR`/`NOT`, brackets; `IN (…)`; `LIKE 'x%'` |
| sql-04 | `ORDER BY` (several columns, ties), `DESC`, `LIMIT`; no order unless asked; top-n pattern |
| sql-05 | **aggregate functions** `COUNT(*)`, `SUM`, `AVG`, `MIN`, `MAX`; with `WHERE`; `ROUND(x, n)` |
| sql-06 | `GROUP BY`; every selected column grouped or aggregated; `HAVING` (filters groups) vs `WHERE` (filters rows) |
| sql-07 | **JOIN … ON**; table-qualified columns; short aliases (`requests r`, `users u`); inner join keeps matches only |
| sql-08 | **LEFT JOIN**; **NULL** ("no value", not 0 or ''); `IS NULL`, never `= NULL`; `COUNT(col)` skips NULL vs `COUNT(*)`; `COALESCE`; groups by `u.id, u.email` (keeps sql-06's rule) |
| sql-09 | `INSERT INTO t (cols) VALUES (…)`, several rows; constraints still apply (`UNIQUE` refusal protects data) |
| sql-10 | `UPDATE … SET … WHERE`, `DELETE FROM … WHERE`; forgetting `WHERE` changes every row; write the `SELECT` first |
| sql-11 | `CREATE TABLE`; `INTEGER`/`TEXT`/`REAL`; `PRIMARY KEY`, `NOT NULL`, `REFERENCES` (**foreign key**), `DEFAULT`, `UNIQUE`; constraints protect every writer; SQLite enforces foreign keys only after `PRAGMA foreign_keys = ON` (mentioned, not practised); booleans as `INTEGER` 0/1; money as integer cents (`amount_cents`) in the example |
| sql-12 | **subquery** as a value; **CTE** with `WITH name AS (…)`; each step runnable on its own |

Conventions: keywords in CAPITALS, lower snake_case tables and columns,
plural table names, `id INTEGER PRIMARY KEY`, `<table>_id` foreign keys,
one-letter aliases, clauses on their own lines for anything past one line.
Checks: `result` (unordered unless `ordered`), `query` after hers.

**Assumed at SQL · Intermediate:** everything above. **Not yet:**
`DISTINCT`, `BETWEEN`, `CASE WHEN`, string functions and `||`, date
functions, `CAST`, `EXISTS` / `NOT EXISTS`, correlated subqueries, `IN
(subquery)`, `UNION`, self-joins, many-to-many link tables, multi-table joins
beyond two tables, window functions, recursive CTEs, `ALTER TABLE`, `DROP`,
`CHECK` constraints, `ON DELETE`, using `PRAGMA foreign_keys` in practice, indexes and `EXPLAIN
QUERY PLAN`, transactions (`BEGIN`/`COMMIT`/`ROLLBACK`), UPSERT (`ON
CONFLICT`), `RETURNING`, views, triggers, JSON functions, generated columns,
normalisation as a design topic.


### SQL · Intermediate — `sql-intermediate`, prefix `sql2-`, 17 lessons

Course schema: an online shop — `customers` (with self-referencing
`referred_by`, messy emails, NULL cities), `products`, `orders` (`placed`
timestamp, `status` paid/shipped/cancelled/refunded, `coupon` NULL or `''`),
`order_items` (`unit_price` charged), `payments` (several per order, refunds
negative), `newsletter`. sql2-15 brings its own `employees`.

| Lesson | Kind | Teaches |
| --- | --- | --- |
| sql2-01 | concept | joining three+ tables as a chain along foreign keys; alias and prefix every column; start from the table you want one row per |
| sql2-02 | debug-ish | LEFT JOIN + `WHERE` on the right table undoes the LEFT JOIN; right-table conditions go in `ON` |
| sql2-03 | concept | **self-join** (two aliases of one table); LEFT self-join keeps rows with no parent |
| sql2-04 | concept | logical order FROM → WHERE → GROUP BY → aggregates → HAVING → SELECT → ORDER BY; `COUNT(DISTINCT x)`; grouping by an expression; NULLs form one group; **primary-key rule**: grouping by a table's PK lets you select its other columns; never rely on SQLite's looser rule |
| sql2-05 | concept | **scalar subquery**; list subquery with `IN`; why `IN` beats a join that multiplies |
| sql2-06 | concept | **correlated subquery**; `EXISTS (SELECT 1 …)`; EXISTS as a 1/0 column |
| sql2-07 | concept | `CASE WHEN … THEN … ELSE … END` (searched and simple forms); first true WHEN wins; always write ELSE; boundaries |
| sql2-08 | concept | text functions `lower upper trim ltrim rtrim length substr instr replace` and `\|\|`; clean before compare/group; LIKE ignores case, `=` does not |
| sql2-09 | concept | ISO text dates; `date`, modifiers (`'+10 days'`, `'start of month'`), `strftime` (`%Y %m %d %H %W %w`), `julianday` differences, `date('now')`; monthly grouping; half-open ranges on the bare column |
| sql2-10 | **debugging** (method taught) | reproduce and count, look at what went missing, check assumptions; **three-valued logic**; `IS NULL OR <>`, `IS NOT`, `COALESCE(a, b, …)`, `NULLIF`; empty string vs NULL |
| sql2-11 | concept | `SELECT DISTINCT` (all columns), `UNION` vs `UNION ALL`, one ORDER BY at the end; normalise before deduplicating |
| sql2-12 | concept | `LIMIT … OFFSET`; tie-breakers for stable pages; **keyset pagination** |
| sql2-13 | concept | UPDATE/DELETE with subqueries; `SET x = expr`; `INSERT … SELECT`; the safe-change routine |
| sql2-14 | **debugging** | **fan-out** (two one-to-many joins multiply); shrink, look at raw rows, count per key; pre-aggregate each child in its own CTE step (several `WITH` steps separated by commas) |
| sql2-15 | **problem** (approach taught) | second-highest distinct value per group via "max below the max"; subquery in `FROM` as a table (needs an alias); driving the query from the group list |
| sql2-16 | **problem** | **anti-join**: `NOT EXISTS` (preferred), LEFT JOIN … IS NULL, and the `NOT IN` + NULL trap |
| sql2-17 | **design** | choosing join types from requirements (inner, LEFT, FULL OUTER and CROSS mentioned); where filters go; what "nothing" looks like (`COUNT` 0, `MAX`/`SUM` NULL) |

Conventions added: scalar text/date functions in lower case (`lower`,
`substr`, `strftime`, `date`), aggregates and `ROUND`/`COALESCE`/`CASE` in
capitals; columns always prefixed with an alias once there is a join;
explicit `AS` names for every computed column.

### SQL · Advanced — `sql-advanced`, prefix `sql3-`, 19 lessons

Course schema: `employees` (a manager tree), `daily_sales` (gaps on some
days, PK `(day, region)`), `categories` (a tree). Lessons from sql3-09 on
bring their own tables.

| Lesson | Kind | Teaches |
| --- | --- | --- |
| sql3-01 | concept | several CTE steps, each using earlier ones; `CROSS JOIN` to a one-row result; **integer division** (`100.0 *`) |
| sql3-02 | concept | `WITH RECURSIVE`: anchor, `UNION ALL`, step, stopping condition; a calendar series + LEFT JOIN + COALESCE |
| sql3-03 | concept | walking a tree down (and up) with a depth counter; cycle guard |
| sql3-04 | concept | carrying a path string and level through recursion; ordering by path |
| sql3-18 | **problem** | one recursive walk for all roots at once by carrying the root (`(boss_id, emp_id)` pairs), then grouping |
| sql3-05 | concept | **window functions** `OVER (PARTITION BY … ORDER BY …)`; `ROW_NUMBER`, `RANK`, `DENSE_RANK` and ties; cannot filter on a window in the same WHERE |
| sql3-06 | concept | aggregates as windows: running totals, share of partition total; peers under the default frame |
| sql3-07 | concept | `LAG`/`LEAD` (offset, default), previous *row* vs previous *day*; named `WINDOW w AS (…)` |
| sql3-08 | concept | **frames**: `ROWS BETWEEN n PRECEDING AND CURRENT ROW` (moving average), `UNBOUNDED`, `FOLLOWING`; `ROWS` vs `RANGE`; the default `RANGE … CURRENT ROW` |
| sql3-19 | **debugging** | running balance repeats on tied days: default RANGE frame takes peers; fix with a unique order (`day, id`) and `ROWS` |
| sql3-09 | concept | constraints `CHECK`, table-level `UNIQUE (a, b)`; `INSERT OR IGNORE` / `OR REPLACE`; `INTEGER PRIMARY KEY` auto id; type affinity |
| sql3-10 | concept | foreign keys in practice: `PRAGMA foreign_keys = ON`, orphans, `ON DELETE CASCADE / RESTRICT / SET NULL` |
| sql3-11 | **design** | normalisation (update/insert/delete anomalies), "what is this a fact about?", composite PK, filling tables with `INSERT … SELECT DISTINCT`, joining back on the natural key |
| sql3-12 | concept | **index**, `CREATE INDEX`, `EXPLAIN QUERY PLAN` (`SCAN`, `SEARCH … USING INDEX`, `USE TEMP B-TREE`), composite index column order, index cost |
| sql3-13 | concept | **transactions** `BEGIN` / `COMMIT` / `ROLLBACK`, atomic + isolated (ACID), `changes()`, batching speed |
| sql3-14 | concept | **UPSERT** `ON CONFLICT (…) DO UPDATE SET … excluded.x` / `DO NOTHING`; the `WHERE true` parsing quirk; vs `INSERT OR REPLACE` |
| sql3-15 | concept | **views**: one definition of a number, re-run each time, `DROP VIEW` |
| sql3-16 | concept | **triggers** `BEFORE/AFTER INSERT/UPDATE [OF col]/DELETE`, `NEW`/`OLD`, `WHEN`, `RAISE(ABORT, …)`; use sparingly |
| sql3-17 | concept | `RETURNING` on INSERT/UPDATE/DELETE |

### SQL · Expert — `sql-expert`, prefix `sql4-`, 14 lessons

Every lesson brings its own tables (several with thousands of generated rows
for plan checks).

| Lesson | Kind | Teaches |
| --- | --- | --- |
| sql4-01 | concept | **sargable** predicates (bare indexed column, half-open ranges); expression indexes; a view's plan |
| sql4-02 | concept | **covering index**; column order: equality → group/sort → read-only |
| sql4-03 | problem | **top N per group**: rank in a CTE, filter outside; choosing the ranking function; NULLs sort low in DESC |
| sql4-04 | problem | **gaps and islands**: day minus `ROW_NUMBER` as an island key; deduplicate first |
| sql4-05 | problem | **sessionising**: LAG gap → start flag → running SUM of flags; `unixepoch` for exact seconds |
| sql4-06 | concept | dedup keeping the latest (`ROW_NUMBER` + deterministic tie-breaker), then a **unique expression index** |
| sql4-07 | concept | **pivot** with `SUM(CASE …)`; `ELSE 0`; `FILTER (WHERE …)` mentioned |
| sql4-08 | concept | JSON: `json_extract`, `->>` / `->`, paths, `json_array_length`, `json_each` (comma = CROSS JOIN with a table-valued function); generated columns mentioned |
| sql4-09 | **design** | many-to-many with a join table; migrating a CSV column with a recursive split; `CREATE TEMP TABLE … AS`; `ALTER TABLE … DROP COLUMN` |
| sql4-10 | design | audit trail triggers with `json_object`; `IS NOT` for NULL-safe change detection; append-only log |
| sql4-11 | **debugging** | data bugs: find duplicates (`group_concat`) and orphans, re-point children before deleting, `PRAGMA foreign_key_check`, fix in a transaction, prevent with a unique index |
| sql4-12 | problem | **cohort retention**: month numbers via `CAST(strftime(…) AS INTEGER)`; users drive the query; `SUM(EXISTS …)` |
| sql4-13 | problem | ordered **funnel**: one CTE per step (first event after the previous step), `UNION ALL` of counts, `LAG` for step conversion |
| sql4-14 | debugging/problem | find and fix a slow query: read the plan (`SCAN`, `AUTOMATIC INDEX`), question every function, index the join + range columns, prove rows unchanged; index naming `idx_<table>_<cols>` |

### SQL · Projects — `sql-projects`, prefix `sqlp-`, 15 lessons

| Lessons | Project | Uses |
| --- | --- | --- |
| sqlp-01…04 | **Store**: schema (cents, CHECK lists, composite PK, cascade vs restrict) → load a messy export (`lower(trim())`, `CAST(ROUND(CAST(price AS REAL) * 100) AS INTEGER)`, `MIN()` to pick a grouped name, parents before children, reconcile) → revenue by month and category with window share → customer report (LEFT JOIN, pre-aggregation, COALESCE, CASE segment) | sql2-02/04/07/08/14, sql3-06/09/10/11 |
| sqlp-05…08 | **Analytics**: ingest raw JSON events (`json_valid`, `INSERT OR IGNORE` on an event id, `typeof`, `datetime()`) → DAU with a calendar → funnel with a 72-hour deadline (`unixepoch`, `FIRST_VALUE`) → day-N retention with eligibility | sql3-02/05, sql4-05/08/12/13 |
| sqlp-09…12 | **Library**: book vs copy schema, CHECKs, **partial unique index** → availability view → overdue fines (scalar `MIN(a, b)`, fixed "as of" date) → trigger that records fines on return | sql3-09/10/15/16, sql2-09 |
| sqlp-13 | **Capstone**: ticketing (composite UNIQUE, cascade, sales view) | spec + behaviour checks only |
| sqlp-14 | **Capstone**: expense splitting (two one-to-many totals without fan-out, HAVING view) | |
| sqlp-15 | **Capstone**: clinic bookings (case-insensitive unique email, overlap self-join, minutes from `unixepoch`, index for time order) | |

**Where the SQL ladder leaves a learner:** writes multi-table reports that
survive NULLs, duplicates and fan-out; uses CTEs, recursion and window
functions; designs normalised schemas with constraints, foreign keys,
indexes, transactions, upserts, views and triggers; reads query plans and
makes queries sargable; cleans and migrates data; and turns a written spec
into a working schema plus views. Not covered: `EXCEPT`/`INTERSECT` as
lessons (EXCEPT appears in a sql3-11 check only), `COLLATE` (offered as an
alternative in a sqlp-15 hint), isolation levels, locking, `VACUUM`/`ANALYZE`,
any database other than SQLite. Build lessons live in the projects course;
the three earlier courses have none.

---

## C++ (`cpp`) — course `cpp`, prefix `cpp-`, 13 lessons

Runtime: clang C++20, `-Wall -Wextra`, **exceptions OFF**. From `cpp-03` on,
function lessons have **no `main`** — the checker supplies it (tasks end with
"No `main`."); whole-program lessons (`cpp-01`, `02`, `04`, `06`) use
`output` with `stdin`.

| Lesson | Teaches |
| --- | --- |
| cpp-01 | `main`, `#include <iostream>`, `std::cout <<` chaining, `"\n"`, `;`, `{ }`, `return 0`; compile first — read the first error |
| cpp-02 | **statically typed**: `int`, `double`, `bool`, `char` (single quotes), `std::string` (`<string>`), `auto`, `const` (assigning is a compile error) |
| cpp-03 | writing functions (return type, name, typed **parameters**; **arguments** are the values passed); the checker supplies `main`; integer division, `%`, `static_cast<double>` |
| cpp-04 | `std::cin >>`, `while (std::cin >> n)` until input runs out; `std::getline` (mentioned); the Input box |
| cpp-05 | `if`/`else if`/`else`; comparisons, `&&` `\|\|` `!`; `=` vs `==` and reading clang warnings |
| cpp-06 | counting `for`, `while`, `break`, `continue` |
| cpp-07 | functions declared before use; `void`; `int` vs `long long` range; recursion (mentioned only, not practised) |
| cpp-08 | `std::vector`: `push_back`, `size`, `[]`, range-for; pass as `const std::vector<int>&` (no copy, read-only) |
| cpp-09 | `std::string`: `size`, `[]` → `char`, `+`, `find` / `std::string::npos`, `substr`; `<cctype>` `toupper`/`isspace`/`isdigit` take and return `int`; cast in via `unsigned char` (why) and out via `char` |
| cpp-10 | pass **by value** (a copy) vs **reference** `&`; in-place changes; `for (int& x : v)`; the three ways to take an argument; how to *read* a check written as a **lambda** `[] { …; return …; }()` |
| cpp-11 | `struct`, brace init `Point{3, 4}`; `class` with `public`/`private`; `explicit` constructor; **member initialiser list**; `const` member functions; private members end in `_` |
| cpp-12 | `std::map`: `m[k]` (inserts a default if missing), `count`, `find`, sorted by key, structured bindings `const auto& [k, v]`; `std::istringstream` to split words |
| cpp-13 | **pointer**: `&x`, `*p`, `nullptr` (never follow it); **smart pointer** `std::unique_ptr`, `std::make_unique`; raw pointers to look, `unique_ptr` to own; no raw `new`/`delete` |

Conventions: **`std::` always** (no `using namespace std`), `"\n"` not
`std::endl`, 4-space indent, braces on the same line, **snake_case**
functions and variables (`max_value`, `count_char`), **PascalCase** types
(`Point`, `Counter`), private members with a trailing `_`, `i++`, `const &`
for anything bigger than a number. Checks use `case` (compared with `==`) and
`test`, often an immediately-called lambda `[] { …; return …; }()` — cpp-10
explains how to read one; writing lambdas (captures, parameters, passing
them to algorithms) has not been taught.

**Error signalling:** exceptions do not compile. The basics never signal an
error at all (`max_value` "assume v is not empty"; `set_to_zero` does nothing
on `nullptr`). The first lesson that needs to report failure must teach the
chosen mechanism (`std::optional` / `std::nullopt`, return codes,
`std::variant`, or an error struct) — none has been taught.

**Assumed at C++ · Intermediate:** everything above. **Not yet:**
`std::optional` / `std::variant` / any error-reporting pattern, writing
lambdas,
`<algorithm>` (`std::sort`, `std::find`, `std::count_if`…), iterators and
`begin()/end()`, `std::set`, `std::unordered_map`, `std::array`, `std::pair`
/ `std::tuple`, `size_t` and signed/unsigned comparison warnings, templates,
operator overloading, destructors and RAII as a topic, copy vs move,
`std::move`, `std::shared_ptr`, inheritance and `virtual`, `enum class`,
namespaces, header files, `<iomanip>` formatting (`std::setprecision`,
`std::fixed`), `std::string_view`, `std::span`, `<ranges>`, recursion in
practice.

### C++ · Intermediate — `cpp-intermediate`, prefix `cpp2-`, 15 lessons

Leans only on cpp.txt; the gaps in it are bridged where first used: `size_t`
and `std::min_element` (cpp2-01), the conditional operator `?:` and
`std::greater` (cpp2-03), `->` and range constructors (cpp2-05),
`std::to_string` and `static` / `static constexpr` members (cpp2-06),
`switch` (cpp2-08), `std::ostringstream` + `<iomanip>` (cpp2-11),
`std::pair` and `emplace` (cpp2-14). Lambdas are *read* from cpp2-03 and
*written* from cpp2-10. Error signalling starts with **`std::optional`**
(cpp2-09).

| Lesson | Kind | Teaches |
| --- | --- | --- |
| cpp2-01 | concept | `const` references and `const` member functions; opening |
| cpp2-02 | **debugging** (method taught) | working on a copy: by-value parameter and loop variable |
| cpp2-03 | concept | `<algorithm>`/`<numeric>`: `sort`, `find_if`, `count_if`, `transform`, `accumulate` (start type); reading lambdas |
| cpp2-04 | concept | iterators, `[begin, end)`, range-for forms, `std::distance`, `rbegin` |
| cpp2-05 | concept | `map` vs `unordered_map` vs `set`, `contains`, `find`; `m[k]` inserts |
| cpp2-06 | concept/build | invariants, member initialiser list, `explicit`, wrapping with `%` (Clock) |
| cpp2-07 | concept | overload resolution, the `const char*` → `bool` trap, default arguments |
| cpp2-08 | concept | `enum class`, `switch`, `static_cast` to/from the underlying int |
| cpp2-09 | concept | `std::optional`, `std::nullopt`, `value_or`, decide edge cases first |
| cpp2-10 | concept | writing lambdas: captures, init capture, `mutable`, comparators, `copy_if` + `back_inserter` |
| cpp2-11 | concept | `istringstream`, `getline` (with delimiter), `find`/`substr`, trimming, `ostringstream` |
| cpp2-12 | **debugging** | off by one, `at()`, unsigned wrap-around of `size() - k` |
| cpp2-13 | **debugging** | signed overflow (`accumulate` start value), uninitialised variables |
| cpp2-14 | **problem** (approach taught) | two-sum in one pass with `unordered_map`; 200,002 numbers |
| cpp2-15 | **design** | refactor duplication: name the idea, return a struct, compute vs present |

### C++ · Advanced — `cpp-advanced`, prefix `cpp3-`, 16 lessons

Bridged: destructor syntax (cpp3-01); raw `new[]`/`delete[]` shown on purpose
and static data members (cpp3-02); recursion in practice and `->` on
pointers (cpp3-04); `std::deque` (cpp3-06); inheritance syntax (cpp3-08);
`using` aliases, the `overloaded` recipe (explained in cpp4-03), generic
lambdas, `decltype`/`decay_t`/`is_same_v`, `if constexpr` (cpp3-11);
`std::array` (cpp3-12); `protected` and inherited constructors (cpp3-16).

| Lesson | Kind | Teaches |
| --- | --- | --- |
| cpp3-01 | concept | RAII, destructors, reverse order, `= delete` copying; opening |
| cpp3-02 | concept | rule of three: deep copy constructor and copy assignment, self-assignment |
| cpp3-03 | concept | move constructor/assignment, `&&`, `std::move`, `noexcept`, rule of five, **rule of zero** |
| cpp3-04 | concept | `unique_ptr` trees, `shared_ptr`, `use_count`, `weak_ptr` (mentioned) |
| cpp3-05 | concept | function templates, deduction, `std::type_identity_t` |
| cpp3-06 | concept | class templates, value parameters, `static_assert`, optional/pointer returns |
| cpp3-07 | concept | operator overloading: non-member binary operators, `<<`, invariant makes `==` simple |
| cpp3-08 | concept | interfaces, pure virtual, `override`, virtual destructor |
| cpp3-09 | **debugging** | object slicing (by-value parameters, `vector<Base>`) |
| cpp3-10 | concept | `std::function`, callbacks, event bus, returning callables |
| cpp3-11 | concept | `std::variant`, `get_if`, `std::visit`, closed vs open sets |
| cpp3-12 | concept | `constexpr`, `static_assert`, `consteval` (mentioned) |
| cpp3-13 | concept/build | errors without exceptions: `bool`, `optional`, `variant<T, Error>`, `[[nodiscard]]` |
| cpp3-14 | concept | comparators, `std::tie`, strict weak ordering, `stable_sort`, `partial_sort` |
| cpp3-15 | **problem** | binary search on the answer, `lower_bound`/`upper_bound`; big inputs |
| cpp3-16 | **design** | composition over inheritance |

### C++ · Expert — `cpp-expert`, prefix `cpp4-`, 16 lessons

Bridged: bit operators `>> & | ^ <<` (cpp4-05), `std::swap`/`std::exchange`
(cpp4-06), `const_cast` for the const overload (cpp4-08), `INT_MAX`/`INT_MIN`
(cpp4-11), `std::list` (cpp4-14). `std::string_view` first appears in
cpp4-05.

| Lesson | Kind | Teaches |
| --- | --- | --- |
| cpp4-01 | concept | value categories, sink parameters, NRVO, `const` blocks moves, ref-qualifiers; opening |
| cpp4-02 | concept | forwarding references, reference collapsing, `std::forward`, `decltype(auto)` |
| cpp4-03 | concept | variadic templates, packs, fold expressions |
| cpp4-04 | concept | concepts, `requires`, standard concepts |
| cpp4-05 | concept | compile-time tables: `std::array`, `string_view`, templates with sizes |
| cpp4-06 | **build** | growable array: allocator, `construct_at`/`destroy_at`, doubling, aliasing, copy-and-swap |
| cpp4-07 | **build** | ring buffer with a forward iterator (`std::forward_iterator`) |
| cpp4-08 | **build** | chained hash map, load factor, rehash (starter times out on purpose) |
| cpp4-09 | concept | ranges, views, `iota`, projections, `views::split` |
| cpp4-10 | **debugging** | iterator invalidation, `erase_if`, hold an index |
| cpp4-11 | **debugging** | signed overflow is UB; the optimiser deletes the check at `-O1` (mechanics depend on it) |
| cpp4-12 | performance | cache lines, row-major, 2-D prefix sums (starter times out on purpose) |
| cpp4-13 | **design** | type erasure (Concept/Model, `clone`), CRTP mentioned |
| cpp4-14 | **problem** | LRU cache: `list` + `unordered_map`, `splice` |
| cpp4-15 | **problem** | tokenizer: positions, errors as data |
| cpp4-16 | **problem** | recursive-descent calculator, left associativity, leftover tokens |

### C++ · Projects — `cpp-projects`, prefix `cppp-`, 15 lessons

| Lessons | Project | Uses |
| --- | --- | --- |
| cppp-01…04 | **Matrix**: row-major storage, `operator()`, `initializer_list` → `optional` for operations that can fail → `<<` without leaking stream settings, determinant by Gaussian elimination → exponentiation by squaring | cpp3-07, cpp2-09, cpp4-05 (bits) |
| cppp-05…08 | **Bank**: cents in `long long`, protected balance, virtual hooks → checking/savings overrides → `Bank` owning `unique_ptr`s, all-or-nothing transfers → transaction log and statements | cpp3-04/08, cpp2-08 |
| cppp-09…12 | **Text stats** (whole programs with `main`, `output` checks): `wc` counts → normalised word frequencies → sentences, average, longest → `setw` histogram | cpp2-05/11, cpp3-14 |
| cppp-13 | **Capstone**: priority task scheduler (`priority_queue`, dependency counts; 100,000 tasks) | cpp3-07, cpp2-05 |
| cppp-14 | **Capstone**: JSON value type (recursive `variant`, rule of zero, `const char*` constructor) | cpp3-03/11, cpp2-07 |
| cppp-15 | **Capstone**: expression evaluator with variables (`^` right-associative, `std::pow`, `std::isfinite`) | cpp4-15/16 |

Conventions added on the ladder: constants are `kName` (`kDay`, `kPi`);
`static` helpers inside classes; function lessons still end "No `main`."
(only cppp-09…12 are whole programs). Mechanics not to change: the
deliberately slow starters of cpp2-12, cpp3-15, cpp4-08 and cpp4-12, and
cpp4-11's reliance on `-O1` deleting the overflow check. Not covered:
namespaces, header files and separate compilation, `std::span`, threads
and atomics, `std::any` beyond a mention, allocators beyond `std::allocator`,
modules, coroutines.
