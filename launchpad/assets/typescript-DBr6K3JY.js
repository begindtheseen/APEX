var e=`@track typescript
@title TypeScript
@name TypeScript: types that catch bugs
@blurb JavaScript with a checker that reads your code before it runs. Strict mode, from annotations to generics.

=== ts-01 | Type annotations
--- teach
In the JavaScript course a variable could hold anything. You could write \`let score = 10\` and, a few lines later, \`score = 'ten'\`, and JavaScript said nothing until something broke while the program was running. This course adds a helper that reads your code *before* it runs and points at mistakes like that one.

Think of a paper form with a box marked "phone number". If you try to write your name in that box, a careful clerk stops you before the form is sent, not after it has gone to the wrong place. TypeScript is that clerk for your code.

### JavaScript plus types

**TypeScript** is JavaScript with one thing added: types. A **type** is the kind of value something holds. You already met the three simplest ones in the JavaScript course, when \`typeof\` told you what a value was:

- \`string\` is text, like \`'Ada'\`;
- \`number\` is any number, whole or decimal, like \`36\` or \`1.65\`;
- \`boolean\` is a yes-or-no value: \`true\` or \`false\`.

Everything you learned in JavaScript still works here. TypeScript only adds a way to say what kind of value each name should hold, and a [[checker|compiler]] that holds you to it.

### Writing the type: an annotation

A **type annotation** is the type written after a name, with a colon \`:\` in between. It says "this name holds this kind of value":

\`\`\`ts
const planet: string = 'Mars'
let moons: number = 2
const hasRings: boolean = false
\`\`\`

Read the first line aloud as "const planet, of type string, gets \`'Mars'\`". The part \`: string\` is the annotation. The rest is the JavaScript you already know.

An annotation is a promise that lasts as long as the name does. A \`let\` can still get a new value later, but only a value of the same type: \`moons = 3\` is fine, \`moons = 'three'\` is not.

### The check that runs first

On this page, every time you press Run, your code is type-checked first, in [[strict mode|strict-mode]] — the strictest setting, and the one real projects use. If every type lines up, the program runs. If one does not, you get the compiler's error and **nothing runs at all**. That is the same stop that \`tsc\`, the TypeScript compiler, puts in front of [[CI|ci]] on a real team: code with type errors never ships.

Here is a program the checker stops:

\`\`\`ts error
let moons: number = 2
moons = 'two'
\`\`\`

The compiler answers with \`Type 'string' is not assignable to type 'number'.\` and not a single line runs, not even the first one. The next lesson shows you how to read messages like that one.

Some practice problems in this course check for exactly this kind of stop. A check named, say, "the total cannot become a string" adds a line such as \`total = 'none'\` after your program, and passes only if the compiler *rejects* that line. It proves your types are strict enough to catch the mistake.

### Letting TypeScript work it out

You do not have to annotate everything. Most of the time TypeScript **infers** the type: it works the type out from the value you give.

\`\`\`ts fragment
let speed = 7.66     // TypeScript infers: speed is a number
speed = 8.1          // fine: still a number
speed = 'fast'       // error: a string is not a number
\`\`\`

\`let speed = 7.66\` already makes \`speed\` a \`number\`, with no annotation in sight. So engineers annotate where it [[helps a reader|inference]]: on function parameters (lesson 3), and on values the compiler cannot see into, such as data that arrives from outside your program (lesson 10).

**Watch out:** the type names are all lowercase: \`string\`, \`number\`, \`boolean\`. A capital letter, as in \`String\`, names something else (a JavaScript object that wraps a string), and it is almost never what you want. And the type goes *after* the colon, never in place of the value: \`const name: string = 'Ada'\`, not \`const name = string\`.

One last thing that surprises people: the types are only for the checker. When your program runs, they [[are gone|erasure]], and what runs is plain JavaScript.

::: context compiler The checker is a compiler
A **compiler** is a program that reads code written in one language and produces code in another. The TypeScript compiler is called \`tsc\`. It does two jobs: it checks every type, and it turns your TypeScript into plain JavaScript by removing the annotations. Browsers and Node only understand JavaScript, so that second step is what lets TypeScript run anywhere JavaScript runs. TypeScript was released by Microsoft in 2012, and its lead designer, Anders Hejlsberg, had earlier designed C# and Turbo Pascal.
:::

::: context strict-mode What strict mode switches on
A TypeScript project has a settings file, \`tsconfig.json\`. One line in it, \`"strict": true\`, turns on a whole family of checks at once. The two you will meet most in this course: a function parameter with no type is an error (lesson 3), and a value that might be \`undefined\` or \`null\` cannot be used as if it were there (lesson 6). Without strict mode those mistakes slip through silently. New projects almost always start with it on, because turning it on later means fixing hundreds of errors at once.
:::

::: context ci CI: the robot that runs the checks
**CI** stands for continuous integration. On a real team, every change someone wants to add to the shared code goes to a server first. The server builds the project and runs the checks: the tests, a style checker, and \`tsc --noEmit\`, which type-checks without producing any files. If any check fails, the change is blocked until it is fixed. So a type error is not a matter of taste: it stops your work from being merged, exactly as it stops your program here.
:::

::: context inference Why engineers lean on inference
Annotating every variable makes code longer without making it safer, because TypeScript already knows that \`let speed = 7.66\` is a number. Most style guides say: annotate the edges, infer the middle. The edges are the places where your code meets other code: what a function takes and gives back, and the shape of data from outside. Inside a function, let the compiler work things out. In an editor such as VS Code you can hover over any name to see the type TypeScript inferred for it.
:::

::: context erasure Types vanish when the program runs
When \`tsc\` turns your file into JavaScript, it deletes every annotation. \`const planet: string = 'Mars'\` becomes \`const planet = 'Mars'\`. This is called **type erasure**. It means types cost nothing at run time, but it also means a running program cannot ask "is this value a \`User\`?" by looking at types, because they are no longer there. Lesson 10 shows what to do instead, when data arrives from outside and the checker cannot vouch for it.
:::
--- task
Declare three variables, each with a type annotation:

- \`city\`, a \`string\`, holding \`'Houston'\`
- \`population\`, a \`number\`, holding \`2300000\` (no quotes, no commas)
- \`isCapital\`, a \`boolean\`, holding \`false\`

Then print \`city\` and \`population\` on one line with a single \`console.log\`, the two names inside the brackets with a comma between them. The output is \`Houston 2300000\`.
--- starter
// Declare city, population and isCapital with type annotations.

--- solution
const city: string = 'Houston'
const population: number = 2300000
const isCapital: boolean = false
console.log(city, population)
--- hint
Each variable is one line: \`const\`, the name, a colon, the type, \`=\`, then the value.
--- hint
The three types are \`string\`, \`number\` and \`boolean\`, all lowercase. \`2300000\` and \`false\` have no quotes around them.
--- hint
The last line hands \`console.log\` the two names, with no quotes, so it prints their values.
--- check source | city is annotated as a string
\\bcity\\s*:\\s*string\\b
--- check source | population is annotated as a number
\\bpopulation\\s*:\\s*number\\b
--- check source | isCapital is annotated as a boolean
\\bisCapital\\s*:\\s*boolean\\b
--- check test | The values are right
city === 'Houston' && population === 2300000 && isCapital === false
--- check output | Prints: Houston 2300000
Houston 2300000

+++ practice | A satellite's record
--- task
Declare three variables, each with a type annotation:

- \`satellite\`, a \`string\`, holding \`'Hubble'\`
- \`altitudeKm\`, a \`number\`, holding \`540\`
- \`isOperational\`, a \`boolean\`, holding \`true\`

Then print this one line with a template literal that takes both values from the variables:

\`\`\`
Hubble orbits at 540 km
\`\`\`
--- starter
// Declare satellite, altitudeKm and isOperational, then print the line.

--- solution
const satellite: string = 'Hubble'
const altitudeKm: number = 540
const isOperational: boolean = true
console.log(\`\${satellite} orbits at \${altitudeKm} km\`)
--- hint
The pattern for each line is \`const name: type = value\`.
--- hint
A template literal uses backticks, with each variable inside \`\${…}\`.
--- check source | satellite is a string
\\bsatellite\\s*:\\s*string\\b
--- check source | altitudeKm is a number
\\baltitudeKm\\s*:\\s*number\\b
--- check source | isOperational is a boolean
\\bisOperational\\s*:\\s*boolean\\b
--- check test | The values are right
satellite === 'Hubble' && altitudeKm === 540 && isOperational === true
--- check output | Prints the line
Hubble orbits at 540 km
--- check source absent | The 540 comes from the variable
console\\.log\\([^)]*540

+++ practice | A fuel gauge that changes
--- task
A rocket starts with 1200 kg of fuel and burns 350 kg.

1. Declare \`fuelKg\` with \`let\`, annotated as a \`number\`, holding \`1200\`.
2. Declare \`unit\` with \`const\`, annotated as a \`string\`, holding \`'kg'\`.
3. On a new line, reassign \`fuelKg\` to \`fuelKg - 350\`.
4. Print \`Fuel left: 850 kg\` with a template literal that uses \`fuelKg\` and \`unit\`.

\`fuelKg\` must stay a number the whole time: the checker should refuse \`fuelKg = 'empty'\`.
--- starter
// Declare fuelKg and unit, burn 350 kg, then print.

--- solution
let fuelKg: number = 1200
const unit: string = 'kg'
fuelKg = fuelKg - 350
console.log(\`Fuel left: \${fuelKg} \${unit}\`)
--- hint
A variable that changes is declared with \`let\`. Its annotation still goes after the name: \`let fuelKg: number = 1200\`.
--- hint
Reassigning is a line with no \`let\`: the name, \`=\`, and the new value.
--- check source | fuelKg is a let annotated as a number
\\blet\\s+fuelKg\\s*:\\s*number\\b
--- check test | fuelKg ended at 850
fuelKg === 850 && unit === 'kg'
--- check type-error | fuelKg cannot become a string
fuelKg = 'empty'
--- check output | Prints the fuel left
Fuel left: 850 kg

+++ practice | A tidy call sign
--- task
A call sign arrives with extra spaces and capitals. Declare four annotated variables:

- \`raw\`, a \`string\`, holding \`'  KESTREL-7  '\` (two spaces at each end)
- \`callSign\`, a \`string\`: \`raw\` trimmed and lowercased
- \`letters\`, a \`number\`: the length of \`callSign\`
- \`isLong\`, a \`boolean\`: whether \`letters\` is greater than 8

Then print exactly this line with a template literal:

\`\`\`
kestrel-7 (9 characters, long: true)
\`\`\`

Work every value out from \`raw\`; do not type \`'kestrel-7'\` or \`9\` yourself.
--- starter
const raw: string = '  KESTREL-7  '

--- solution
const raw: string = '  KESTREL-7  '
const callSign: string = raw.trim().toLowerCase()
const letters: number = callSign.length
const isLong: boolean = letters > 8
console.log(\`\${callSign} (\${letters} characters, long: \${isLong})\`)
--- hint
\`raw.trim().toLowerCase()\` takes the spaces off both ends, then makes every letter small.
--- hint
A comparison such as \`letters > 8\` gives \`true\` or \`false\`, so its type is \`boolean\`.
--- check source | Each new variable is annotated
callSign\\s*:\\s*string[\\s\\S]*letters\\s*:\\s*number[\\s\\S]*isLong\\s*:\\s*boolean
--- check test | The values are worked out from raw
callSign === 'kestrel-7' && letters === 9 && isLong === true
--- check source absent | Nothing is typed in by hand
['"]kestrel-7['"]
--- check output | Prints the line
kestrel-7 (9 characters, long: true)

+++ practice | Odd values, right types
--- task
Some values look like one type and are another. Declare these six variables, each annotated with the right type:

- \`balance\` holding minus 250 (a negative number)
- \`bigCount\` holding one million five hundred thousand, with no commas
- \`tiny\` holding \`0.005\`
- \`zero\` holding \`0\`
- \`blank\` holding the empty string \`''\`
- \`answer\` holding the text \`'42'\`, in quotes

Then print \`balance\`, \`bigCount\` and \`answer\` on one line with one \`console.log\`, so the output is:

\`\`\`
-250 1500000 42
\`\`\`
--- starter
// Six annotated variables, then one console.log.

--- solution
const balance: number = -250
const bigCount: number = 1500000
const tiny: number = 0.005
const zero: number = 0
const blank: string = ''
const answer: string = '42'
console.log(balance, bigCount, answer)
--- hint
A negative number, a decimal and zero are all still the type \`number\`.
--- hint
Anything in quotes is a \`string\`, even when it is empty or looks like a number.
--- check test | The numbers are numbers
balance === -250 && bigCount === 1500000 && tiny === 0.005 && zero === 0
--- check test | The empty string and '42' are strings
blank === '' && answer === '42'
--- check type-error | answer is a string, so it cannot go into a number
const n: number = answer
--- check type-error | blank is a string, not a number
const n: number = blank
--- check type-error | zero is a number, not a string
const s: string = zero
--- check output | Prints the three values
-250 1500000 42

+++ practice | The annotations lie
--- task
This program should print:

\`\`\`
Falcon 9 has 2 stages. Reusable: true
\`\`\`

Instead nothing runs: the checker reports three type errors. The values are all correct. The annotations are wrong. Fix the three annotations and leave every value exactly as it is.
--- starter
const rocket: number = 'Falcon 9'
const stages: string = 2
const reusable: string = true
console.log(\`\${rocket} has \${stages} stages. Reusable: \${reusable}\`)
--- solution
const rocket: string = 'Falcon 9'
const stages: number = 2
const reusable: boolean = true
console.log(\`\${rocket} has \${stages} stages. Reusable: \${reusable}\`)
--- hint
Look at each value and ask what kind it is: text in quotes, a number, or \`true\`/\`false\`.
--- hint
Change only the word after each colon. \`'Falcon 9'\` is a \`string\`, \`2\` is a \`number\`, and \`true\` is a \`boolean\`.
--- check output | Type-checks and prints the sentence
Falcon 9 has 2 stages. Reusable: true
--- check source | rocket is a string
\\brocket\\s*:\\s*string\\b
--- check source | stages is a number and reusable is a boolean
\\bstages\\s*:\\s*number\\b[\\s\\S]*\\breusable\\s*:\\s*boolean\\b
--- check test | The values are unchanged
rocket === 'Falcon 9' && stages === 2 && reusable === true

+++ practice | A mission clock
--- task
A mission has been running for \`7384\` seconds. Declare these annotated variables, each worked out from the one before:

- \`missionSeconds\`, a \`number\`, holding \`7384\`
- \`hours\`, a \`number\`: the whole hours in \`missionSeconds\` (use \`Math.floor\` and divide by 3600)
- \`minutes\`, a \`number\`: the whole minutes left over after the hours (use \`%\` and \`Math.floor\`)
- \`seconds\`, a \`number\`: the seconds left over after the minutes
- \`isLong\`, a \`boolean\`: whether the mission has run longer than 2 hours (more than 7200 seconds)

Then print exactly these two lines:

\`\`\`
T+ 2h 3m 4s
Long mission: true
\`\`\`

Work every number out from \`missionSeconds\`; do not type \`2\`, \`3\` or \`4\` yourself.
--- starter
const missionSeconds: number = 7384

--- solution
const missionSeconds: number = 7384
const hours: number = Math.floor(missionSeconds / 3600)
const minutes: number = Math.floor((missionSeconds % 3600) / 60)
const seconds: number = missionSeconds % 60
const isLong: boolean = missionSeconds > 7200
console.log(\`T+ \${hours}h \${minutes}m \${seconds}s\`)
console.log(\`Long mission: \${isLong}\`)
--- hint
\`missionSeconds % 3600\` is what is left after taking out every whole hour. Divide that by 60 and round down to get the minutes.
--- hint
The seconds are what is left after taking out every whole minute: \`missionSeconds % 60\`.
--- hint
\`isLong\` is a comparison, so its annotation is \`boolean\`.
--- check test | hours, minutes and seconds are right
hours === 2 && minutes === 3 && seconds === 4
--- check source | Every value is annotated
hours\\s*:\\s*number[\\s\\S]*minutes\\s*:\\s*number[\\s\\S]*seconds\\s*:\\s*number[\\s\\S]*isLong\\s*:\\s*boolean
--- check test | isLong is true
isLong === true
--- check source | Works the hours out with Math.floor
Math\\.floor\\(\\s*missionSeconds\\s*/\\s*3600\\s*\\)
--- check output | Prints the clock
T+ 2h 3m 4s
Long mission: true

=== ts-02 | Reading a type error
--- teach
Last lesson the checker stopped a program before a single line ran. This lesson teaches you to read what it says when that happens, so that a type error becomes a quick fix instead of a wall of red text.

Think of an essay handed back by a teacher. Next to one line there is a red mark: the page and line number, and a short note saying what is wrong. You do not rewrite the whole essay. You go to that line, read the note, and fix the one thing it points at. A type error is exactly that kind of note.

### What a type error looks like

A **type error** is the compiler telling you, before anything runs, that a value is being used as something it is not. Here is a program with one, and the message the compiler prints for it:

\`\`\`ts error
const missionName: string = 'Kestrel'
const crewSize: number = '4'
\`\`\`

\`\`\`
main.ts(2,7): error TS2322: Type 'string' is not assignable to type 'number'.
\`\`\`

That one line has three parts: where, which kind, and what. Take them one at a time.

### Where: the file, the line, the column

\`main.ts\` is the name of the file. On this page your code is always \`main.ts\`.

\`(2,7)\` means **line 2, [[column|line-column]] 7**. The line is counted from the top, starting at 1. The column is counted from the left edge of that line, also starting at 1. On line 2, the word \`const\` and the space after it fill columns 1 to 6, so column 7 is where the name \`crewSize\` begins. The compiler points at the thing it is complaining about.

### Which kind: the error code

\`TS2322\` is the **[[error code|error-codes]]**: TS for TypeScript, then a number. Every kind of mistake has its own number, and the same mistake always gets the same number. Search for "TS2322" and you will find explanations and examples written by other people who met it. A few you will see in this course:

- \`TS2322\`: a value does not fit the type it is being given to.
- \`TS2345\`: an argument does not fit the parameter of a function.
- \`TS2552\`: a name was not found, usually a typo. It often adds \`Did you mean …?\`.

### What: found and needed

The message is the sentence at the end: \`Type 'string' is not assignable to type 'number'.\` It always says what the compiler **found** and what it **needed**. Here it found a \`string\` and needed a \`number\`.

**[[Assignable|assignable]]** means "can be put into". A string cannot be put into a box labelled \`number\`. So the message says: on line 2, you are putting text where a number belongs.

### Fixing it: make the value true

The fix is almost never to [[silence the checker|silencing]]. The fix is to make the value really be what the code says it is. In the example, \`'4'\` is in quotes, so it is text. There are two honest fixes. Write the number itself, \`4\`, with no quotes. Or, if the text came from somewhere you do not control, turn it into a number with [[\`Number(...)\`|number-conversion]], which you met in the JavaScript course:

\`\`\`ts
const crewSize: number = Number('4')
console.log(crewSize + 1)   // 5
\`\`\`

**Watch out:** the tempting "fix" is to change the annotation instead: \`const crewSize: string = '4'\`. The error on that line goes away, but the problem moves. Now \`crewSize + 1\` joins text and gives \`'41'\`, not \`5\`, and a line that does arithmetic with it, such as \`crewSize * 2\`, becomes a new type error. When the type and the value disagree, ask which one is telling the truth about what the program needs. Usually it is the annotation.

### More than one error

Sometimes the compiler lists several errors, one per line. Read them from the top, and fix the first one first. One mistake, such as a misspelled name, can cause errors further down that disappear once it is fixed. After each fix, run again and read the new list.

::: context line-column Lines and columns in an editor
Code editors show your position at the bottom of the window, often as \`Ln 2, Col 7\`. In most editors, including VS Code, you can click the \`main.ts(2,7)\` part of an error and the cursor jumps straight there. Columns count every character, spaces included, so indentation counts too. Some tools count from 0 instead of 1, but TypeScript's messages count from 1, the way people number lines on a page.
:::

::: context error-codes What the numbers mean
TypeScript groups its codes roughly by kind. Codes in the 1000s are mostly about grammar: something the compiler could not even read, such as a missing bracket. Codes in the 2000s are about types and names: the code reads fine, but the values do not fit. Codes in the 7000s mostly come from strict-mode checks, such as a parameter with no type. You never need to memorise them. They are there so that you can search for one, and so that a team can talk about "the 2322 on line 40" without pasting the whole message.
:::

::: context assignable A plug and a socket
Picture a plug and a wall socket. A plug fits when its shape matches the holes. "Type A is assignable to type B" means a value of type A fits wherever type B is expected. A \`number\` fits a \`number\` slot; a \`string\` does not. Later the rule gets more interesting: in lesson 5 you will see that the exact text \`'pro'\` fits a slot that takes any \`string\`, but a general \`string\` does not fit a slot that only takes \`'pro'\` or \`'free'\`. A narrow plug can fit a wide socket, not the other way round.
:::

::: context silencing Ways to switch the checker off, and why not to
TypeScript has escape hatches. \`// @ts-ignore\` on the line above hides that line's error. The type \`any\` turns checking off for a value. \`as\` tells the compiler "trust me, this is a number". Each one makes the red text go away without making the program correct: the value is still text, and the program still breaks, only later and somewhere harder to find. Code reviewers on real teams ask for a good reason every time they see one. You will meet \`any\` in lesson 3, and \`as\` in lessons 6 and 10.
:::

::: context number-conversion What Number() does with odd text
\`Number('6')\` gives the number \`6\`. It ignores spaces at the ends, so \`Number(' 36 ')\` is also \`36\`. But text that is not a number at all, such as \`Number('6 apples')\`, gives \`NaN\`, short for "not a number". The odd part is that \`NaN\` still has the type \`number\`, so the checker cannot warn you about it. A type says what kind of value something is, not whether it is sensible. Checking that the data makes sense is still your job when the program runs, as the JavaScript course did with \`Number.isInteger\`.
:::
--- task
The starter does not type-check. Press Run & check and read the error: which line, which column, what it found and what it needed. Then fix the code so that it type-checks and prints \`Total: 42\`.

Keep every \`: number\` annotation exactly as it is. Change the value that is wrong.
--- starter
const unitPrice: number = '6'
const quantity: number = 7
const total: number = unitPrice * quantity
console.log(\`Total: \${total}\`)
--- solution
const unitPrice: number = Number('6')
const quantity: number = 7
const total: number = unitPrice * quantity
console.log(\`Total: \${total}\`)
--- hint
The error points at line 1. Look at the value on that line: what kind of value is it?
--- hint
\`'6'\` in quotes is a string, and the annotation says \`number\`. The annotation is right, because the program multiplies with it.
--- hint
Either write \`6\` with no quotes, or convert the text with \`Number('6')\`.
--- check output | Type-checks and prints the total
Total: 42
--- check source | Keeps the number annotation
unitPrice\\s*:\\s*number

+++ practice | Fix the altitude
--- task
This program should print:

\`\`\`
Altitude: 408 km, 15.5 orbits a day
\`\`\`

It does not type-check. Read the error, then fix the value it points at. Keep both \`: number\` annotations as they are.
--- starter
const altitudeKm: number = '408'
const orbitsPerDay: number = 15.5
console.log(\`Altitude: \${altitudeKm} km, \${orbitsPerDay} orbits a day\`)
--- solution
const altitudeKm: number = 408
const orbitsPerDay: number = 15.5
console.log(\`Altitude: \${altitudeKm} km, \${orbitsPerDay} orbits a day\`)
--- hint
The error is on line 1, column 7: the name \`altitudeKm\`. Its value is in quotes.
--- hint
Write the number with no quotes, so the value matches the annotation.
--- check output | Type-checks and prints the line
Altitude: 408 km, 15.5 orbits a day
--- check source | Keeps the number annotation
altitudeKm\\s*:\\s*number
--- check test | altitudeKm is the number 408
typeof altitudeKm === 'number' && altitudeKm === 408

+++ practice | The other direction
--- task
This program should print:

\`\`\`
Flight 1047 boards at gate B12: true
\`\`\`

It reports two type errors. This time the annotations are right and the values are the wrong kind:

- \`flightCode\` is a \`string\`, because flight codes are labels, not amounts. Make its value the text \`'1047'\`.
- \`boarding\` is a \`boolean\`. Make its value \`true\`.

Keep all three annotations as they are.
--- starter
const flightCode: string = 1047
const gate: string = 'B12'
const boarding: boolean = 'yes'
console.log(\`Flight \${flightCode} boards at gate \${gate}: \${boarding}\`)
--- solution
const flightCode: string = '1047'
const gate: string = 'B12'
const boarding: boolean = true
console.log(\`Flight \${flightCode} boards at gate \${gate}: \${boarding}\`)
--- hint
The first message says it found a \`number\` and needed a \`string\`. Quotes turn \`1047\` into text.
--- hint
\`'yes'\` is text. The only boolean values are \`true\` and \`false\`, with no quotes.
--- check output | Type-checks and prints the line
Flight 1047 boards at gate B12: true
--- check test | flightCode is the text '1047'
flightCode === '1047'
--- check test | boarding is the boolean true
boarding === true
--- check source | The annotations are unchanged
flightCode\\s*:\\s*string[\\s\\S]*boarding\\s*:\\s*boolean

+++ practice | Next year's age
--- task
A form gives you a person's age as text, with spaces around it. This program should print:

\`\`\`
Next year: 37
\`\`\`

It does not type-check, because line 2 puts a string into a \`number\`.

Fix line 2 so that \`age\` really is a number: trim the spaces off \`ageText\` and convert it with \`Number(...)\`. Keep \`age\` annotated as a \`number\`, and keep \`ageText\` exactly as it is.
--- starter
const ageText: string = ' 36 '
const age: number = ageText
const nextYear: number = age + 1
console.log(\`Next year: \${nextYear}\`)
--- solution
const ageText: string = ' 36 '
const age: number = Number(ageText.trim())
const nextYear: number = age + 1
console.log(\`Next year: \${nextYear}\`)
--- hint
The error is on line 2. It found a \`string\` and needed a \`number\`.
--- hint
\`ageText.trim()\` gives \`'36'\`, and \`Number(...)\` turns that text into the number 36.
--- hint
Do not change \`age\` to a \`string\`: then \`age + 1\` would join text and give \`'361'\`.
--- check output | Prints next year's age
Next year: 37
--- check test | age is the number 36
age === 36
--- check source | age is still annotated as a number
\\bage\\s*:\\s*number
--- check source absent | age was not changed to a string
\\bage\\s*:\\s*string

+++ practice | Flags from an old config
--- task
These settings were copied from an old JavaScript file, where \`1\` and \`0\` were often used to mean yes and no. TypeScript refuses them: a \`boolean\` holds only \`true\` or \`false\`, and a \`number\` cannot hold text.

The program should print:

\`\`\`
enabled: true, verbose: false, retries: 3
\`\`\`

Fix the three values so the program type-checks: \`1\` means \`true\`, \`0\` means \`false\`, and \`'3'\` is the number \`3\`. Keep the annotations.
--- starter
const enabled: boolean = 1
const verbose: boolean = 0
const retries: number = '3'
console.log(\`enabled: \${enabled}, verbose: \${verbose}, retries: \${retries}\`)
--- solution
const enabled: boolean = true
const verbose: boolean = false
const retries: number = 3
console.log(\`enabled: \${enabled}, verbose: \${verbose}, retries: \${retries}\`)
--- hint
JavaScript lets \`1\` and \`0\` stand in for yes and no inside an \`if\`, but they are still numbers. TypeScript keeps the types apart.
--- hint
Write \`true\` and \`false\` with no quotes, and \`3\` with no quotes.
--- check output | Prints the three settings
enabled: true, verbose: false, retries: 3
--- check test | enabled is true and verbose is false
enabled === true && verbose === false
--- check test | retries is the number 3
retries === 3
--- check source | The annotations are unchanged
enabled\\s*:\\s*boolean[\\s\\S]*verbose\\s*:\\s*boolean[\\s\\S]*retries\\s*:\\s*number

+++ practice | The fix that made it worse
--- task
This program should print:

\`\`\`
Fee: 15
\`\`\`

It prints \`Fee: 123\` instead. Someone saw the type error \`Type 'string' is not assignable to type 'number'\` on the first line and "fixed" it by changing the annotation to \`string\`. The error went away, but now \`+\` joins the text \`'12'\` and the number \`3\` into \`'123'\` instead of adding them.

Fix it properly: \`baseFee\` must be annotated as a \`number\` and hold the number \`12\`.
--- starter
const baseFee: string = '12'
const extra: number = 3
console.log(\`Fee: \${baseFee + extra}\`)
--- solution
const baseFee: number = 12
const extra: number = 3
console.log(\`Fee: \${baseFee + extra}\`)
--- hint
When one side of \`+\` is text, JavaScript joins instead of adding. TypeScript allows that, so the checker stayed quiet.
--- hint
Put the annotation back to \`number\`, and take the quotes off the value.
--- check output | Prints the fee
Fee: 15
--- check source | baseFee is annotated as a number
baseFee\\s*:\\s*number
--- check test | baseFee holds the number 12
baseFee === 12

+++ practice | Four errors on the launch board
--- task
This program should print exactly:

\`\`\`
Mission: Kestrel
Crew: 4
Fuel: 98.5%
Ready: true
\`\`\`

It reports four errors. Read them from the top and fix each one:

- three of them are values of the wrong kind (keep every annotation as it is);
- one is a misspelled name. The message \`Cannot find name … Did you mean …?\` tells you the right spelling.
--- starter
const missionName: string = 'Kestrel'
const crewSize: number = '4'
const fuelPercent: number = '98.5'
const ready: boolean = 'true'
console.log(\`Mission: \${missionName}\`)
console.log(\`Crew: \${crewSiz}\`)
console.log(\`Fuel: \${fuelPercent}%\`)
console.log(\`Ready: \${ready}\`)
--- solution
const missionName: string = 'Kestrel'
const crewSize: number = 4
const fuelPercent: number = 98.5
const ready: boolean = true
console.log(\`Mission: \${missionName}\`)
console.log(\`Crew: \${crewSize}\`)
console.log(\`Fuel: \${fuelPercent}%\`)
console.log(\`Ready: \${ready}\`)
--- hint
Three messages say a \`string\` is not assignable to a \`number\` or a \`boolean\`. Each points at a value in quotes.
--- hint
\`'true'\` in quotes is a four-letter string. The boolean is \`true\`, with no quotes.
--- hint
The fourth message is on line 6: \`crewSiz\` is missing its last letter.
--- check output | Prints the board
Mission: Kestrel
Crew: 4
Fuel: 98.5%
Ready: true
--- check test | The values are the right kind
crewSize === 4 && fuelPercent === 98.5 && ready === true
--- check source | The annotations are unchanged
crewSize\\s*:\\s*number[\\s\\S]*fuelPercent\\s*:\\s*number[\\s\\S]*ready\\s*:\\s*boolean
--- check source absent | No misspelled name is left
crewSiz\\b

=== ts-03 | Typed functions
--- teach
So far you have annotated variables. In the JavaScript course you also wrote functions, such as \`function add(a, b) { … }\`. Nothing stopped anyone from calling that with text, or with one argument instead of two. This lesson puts types on functions, which is where types pay off the most.

Think of a vending machine. The slot is shaped for coins, so a button or a key will not go in. The sign on the front says what comes out: a drink, not a sandwich. You can use the machine without opening it, because the slot and the sign tell you what goes in and what comes out.

### Types on the parameters

A function's **parameters** are the names it gives its inputs. In TypeScript each parameter gets a type annotation, written the same way as on a variable: a colon, then the type.

\`\`\`ts
function area(width: number, height: number): number {
  return width * height
}

console.log(area(3, 4))   // 12
\`\`\`

Now the checker knows that \`area\` takes two numbers. Every call to it is checked against that:

\`\`\`ts error
function area(width: number, height: number): number {
  return width * height
}

area('3', 4)   // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
area(3)        // error TS2554: Expected 2 arguments, but got 1.
\`\`\`

The first call hands over text; the second forgets an argument. Both are stopped before anything runs.

### The return type

Look again at \`area\`. After the closing bracket of the parameters comes \`: number\`. That is the **return type**: the type of the value the function gives back. It is a [[promise to the caller|contract]]. The compiler checks every \`return\` inside the function against it, and anyone who calls \`area\` knows they get a number back without reading the body.

A function that gives nothing back, because it only prints or changes something, has the return type **\`void\`** — "nothing useful comes back":

\`\`\`ts
function announce(message: string): void {
  console.log(\`>> \${message}\`)
}

announce('Engines armed')   // >> Engines armed
\`\`\`

[[\`void\`|void]] tells the reader not to expect a value from it.

### Arrow functions

An arrow function gets its types in the same places: each parameter inside the brackets, and the return type after the closing bracket, just before the \`=>\` (read "arrow"):

\`\`\`ts
const greet = (name: string, mark = '!'): string => \`Hello, \${name}\${mark}\`

console.log(greet('Ada'))        // Hello, Ada!
console.log(greet('Lin', '?'))   // Hello, Lin?
\`\`\`

\`mark = '!'\` is a **default value**, as in the JavaScript course: if the caller leaves \`mark\` out, it is \`'!'\`. A parameter with a default needs no annotation, because TypeScript infers \`string\` from the default.

### No type is an error

In strict mode, a parameter with no type is an error:

\`\`\`ts error
function double(n) {
  return n * 2
}
\`\`\`

The message is \`TS7006: Parameter 'n' implicitly has an 'any' type.\` [[\`any\`|any-type]] is TypeScript's word for "any value at all, and do not check it". An untyped parameter would quietly become \`any\`, and that would switch the checker off for everything it touches: the parameter, whatever you compute from it, and whatever you return. Strict mode refuses, so you must say what the function takes.

**Watch out:** if a function has a return type, *every* path through it must return a value of that type. A function that returns inside an \`if\` but forgets the case where the \`if\` is false gets \`TS2366: Function lacks ending return statement and return type does not include 'undefined'.\` Read it as: "there is a way through this function that reaches the end without returning". Add the missing \`return\`, usually at the bottom.

A function's name, its parameters with their types, and its return type together are called its [[signature|signature]]. Once the signature is right, the checker can check every call in your program against it.

::: context contract A promise in writing
On a team, the person who writes a function and the people who call it are often different people, and they may never talk. The signature is the written agreement between them. If the author later changes the function so it sometimes returns text, the compiler flags the \`return\` inside the function at once, instead of letting every caller find out the hard way. The return type protects the people who call your code from your future mistakes.
:::

::: context void Where void comes from
"Void" means empty, as in "the void of space". A \`void\` function still finishes and hands control back to the caller. It just does not hand back a value you are meant to use. At run time a JavaScript function with no \`return\` gives back \`undefined\`, so a \`void\` function's result is \`undefined\`. \`console.log\` itself is typed as returning \`void\`, which is why \`const x = console.log('hi')\` gives you nothing worth keeping.
:::

::: context any-type any: the off switch
\`any\` means "this could be anything, so do not check it". You can do whatever you like with an \`any\` value: call methods that do not exist, add it to a date, pass it anywhere. The checker says nothing, and the mistakes show up only when the program runs. Worse, \`any\` spreads: the result of \`anyValue * 2\` is also unchecked. Strict mode includes a setting called \`noImplicitAny\`, which is what makes an untyped parameter an error. You can still write \`any\` on purpose, but reviewers will ask why.
:::

::: context signature The signature in your editor
Type the name of a function and an opening bracket in an editor such as VS Code, and a small box pops up showing its signature: \`area(width: number, height: number): number\`. The parameter you are typing is highlighted. That box comes straight from your annotations, so typed functions document themselves. Experienced engineers often read the signatures of a new library before its documentation, because a signature cannot go out of date.
:::
--- task
Write two functions, with every parameter and both return types annotated:

- \`wordCount(text: string): number\` gives the number of words in \`text\`. Words are split on whitespace, extra spaces do not count as words, and the empty string has no words at all.
- \`isEven(n: number): boolean\` gives \`true\` when \`n\` is even and \`false\` when it is odd.

The starter has the bodies from the JavaScript course, but it does not type-check and \`wordCount('')\` gives the wrong answer.
--- starter
function wordCount(text) {
  return text.trim().split(/\\s+/).length
}

function isEven(n) {
  return n % 2 === 0
}
--- solution
function wordCount(text: string): number {
  const trimmed = text.trim()
  return trimmed === '' ? 0 : trimmed.split(/\\s+/).length
}

function isEven(n: number): boolean {
  return n % 2 === 0
}
--- hint
Run it first: the two TS7006 errors point at the parameters with no type.
--- hint
The signature reads \`function wordCount(text: string): number { … }\`. The return type goes after the closing bracket.
--- hint
\`''.trim().split(/\\s+/)\` is \`['']\`, one empty word, so check for the empty string first and return 0.
--- check source | wordCount is typed
wordCount\\s*\\(\\s*text\\s*:\\s*string\\s*\\)\\s*:\\s*number
--- check source | isEven is typed
isEven\\s*\\(\\s*n\\s*:\\s*number\\s*\\)\\s*:\\s*boolean
--- check test | wordCount counts words
wordCount('the quick brown fox') === 4 && wordCount('  spaced   out ') === 2
--- check case | wordCount('') is 0
wordCount('')
=> 0
--- check test | isEven works both ways
isEven(10) && !isEven(7)

+++ practice | Celsius to Fahrenheit
--- task
Write \`toFahrenheit(celsius: number): number\`, which turns a temperature in degrees Celsius into degrees Fahrenheit: multiply by 9, divide by 5, then add 32.

Annotate the parameter and the return type. For example, \`toFahrenheit(100)\` is \`212\`, and \`toFahrenheit(-40)\` is \`-40\`.
--- starter
function toFahrenheit(celsius) {
}
--- solution
function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}
--- hint
The parameter's type goes after its name, and the return type after the closing bracket.
--- hint
The body is one \`return\` line: \`celsius\` times 9, divided by 5, plus 32.
--- check source | toFahrenheit is typed
toFahrenheit\\s*\\(\\s*celsius\\s*:\\s*number\\s*\\)\\s*:\\s*number
--- check case | Water boils at 212
toFahrenheit(100)
=> 212
--- check case | Water freezes at 32
toFahrenheit(0)
=> 32
--- check case | -40 is the same in both scales
toFahrenheit(-40)
=> -40
--- check case | A decimal answer
toFahrenheit(37)
=> 98.6
--- check type-error | Text is refused
toFahrenheit('20')

+++ practice | A mass with a unit
--- task
Write an arrow function stored in a \`const\` named \`formatMass\`. It takes:

- \`value\`, a \`number\`;
- \`unit\`, a \`string\` that defaults to \`'kg'\` when the caller leaves it out.

It returns a \`string\`: the value with exactly one digit after the decimal point, a space, then the unit. Annotate the return type.

For example, \`formatMass(12.5)\` is \`'12.5 kg'\` and \`formatMass(3, 't')\` is \`'3.0 t'\`.
--- starter
const formatMass = (value, unit) => \`\${value} \${unit}\`
--- solution
const formatMass = (value: number, unit = 'kg'): string => \`\${value.toFixed(1)} \${unit}\`
--- hint
A default value is written \`unit = 'kg'\` inside the brackets. TypeScript infers that \`unit\` is a string from it.
--- hint
\`value.toFixed(1)\` gives the number as text with one digit after the point.
--- hint
The return type goes after the closing bracket, before the \`=>\`.
--- check case | The default unit
formatMass(12.5)
=> '12.5 kg'
--- check case | Another unit, and a whole number
formatMass(3, 't')
=> '3.0 t'
--- check case | A tiny value rounds to 0.0
formatMass(0.04)
=> '0.0 kg'
--- check type-error | The value must be a number
formatMass('12')
--- check type-error | The unit must be a string
formatMass(12, 5)
--- check source | Written as an arrow function in a const
const\\s+formatMass\\s*=[\\s\\S]*=>

+++ practice | Shipping cost
--- task
Write \`shippingCost(weightKg: number, express: boolean): number\`:

- the cost is 5 dollars, plus 2 dollars for every kilogram;
- if \`express\` is \`true\`, the whole cost is doubled;
- if \`weightKg\` is 0 or less, throw a \`RangeError\`, because there is nothing to ship.

So \`shippingCost(3, false)\` is \`11\` and \`shippingCost(3, true)\` is \`22\`.
--- starter
function shippingCost(weightKg, express) {
  return 5 + 2 * weightKg
}
--- solution
function shippingCost(weightKg: number, express: boolean): number {
  if (weightKg <= 0) {
    throw new RangeError(\`weight must be above 0, got \${weightKg}\`)
  }
  const cost = 5 + 2 * weightKg
  return express ? cost * 2 : cost
}
--- hint
Check the weight first and \`throw new RangeError('…')\` when it is 0 or less.
--- hint
Work out the normal cost, then use a ternary: \`express ? cost * 2 : cost\`.
--- check case | Normal shipping
shippingCost(3, false)
=> 11
--- check case | Express doubles it
shippingCost(3, true)
=> 22
--- check case | Half a kilogram
shippingCost(0.5, false)
=> 6
--- check test | A weight of 0 throws
throws(() => shippingCost(0, false))
--- check test | A negative weight throws
throws(() => shippingCost(-2, true))
--- check type-error | express must be a boolean
shippingCost(2, 'yes')

+++ practice | Keep it in range
--- task
Write \`clamp(value: number, low: number, high: number): number\`. It returns \`value\` if it is between \`low\` and \`high\`; \`low\` if \`value\` is below \`low\`; and \`high\` if \`value\` is above \`high\`.

The edges count as inside: \`clamp(10, 0, 10)\` is \`10\`. Negative numbers work the same way: \`clamp(-7, -5, 5)\` is \`-5\`.
--- starter
function clamp(value, low, high) {
  return value
}
--- solution
function clamp(value: number, low: number, high: number): number {
  if (value < low) return low
  if (value > high) return high
  return value
}
--- hint
Three parameters, each with \`: number\`, and \`: number\` after the closing bracket.
--- hint
Check below the range first and return \`low\`; then above the range and return \`high\`; otherwise return \`value\`.
--- check case | Inside the range
clamp(5, 0, 10)
=> 5
--- check case | Below the range
clamp(-3, 0, 10)
=> 0
--- check case | Above the range
clamp(99, 0, 10)
=> 10
--- check case | Exactly on an edge
clamp(10, 0, 10)
=> 10
--- check case | A range of negative numbers
clamp(-7, -5, 5)
=> -5
--- check type-error | Every argument is needed
clamp(5, 1)

+++ practice | The missing return
--- task
\`sign\` should return \`'positive'\` for a number above 0, \`'negative'\` for a number below 0, and \`'zero'\` for 0.

It does not type-check: the compiler reports \`TS2366: Function lacks ending return statement and return type does not include 'undefined'.\` Find the path through the function that reaches the end without returning, and fix it. Keep the signature as it is.
--- starter
function sign(n: number): string {
  if (n > 0) {
    return 'positive'
  } else if (n < 0) {
    return 'negative'
  }
}
--- solution
function sign(n: number): string {
  if (n > 0) {
    return 'positive'
  } else if (n < 0) {
    return 'negative'
  }
  return 'zero'
}
--- hint
Which number is neither above 0 nor below 0? For that number, nothing is returned.
--- hint
Add one \`return\` line at the bottom of the function, after the \`if\`.
--- check case | Zero
sign(0)
=> 'zero'
--- check case | Positive
sign(5)
=> 'positive'
--- check case | Negative
sign(-0.5)
=> 'negative'
--- check source | Keeps the string return type
sign\\s*\\(\\s*n\\s*:\\s*number\\s*\\)\\s*:\\s*string

+++ practice | Minutes between two times
--- task
A flight schedule gives times as text, like \`'14:05'\`. Write two typed functions:

1. \`toMinutes(time: string): number\` turns \`'14:05'\` into the minutes after midnight: 14 × 60 + 5, which is \`845\`. \`'14:05'.split(':')\` gives \`['14', '05']\`, and \`Number(...)\` turns each part into a number.
2. \`minutesBetween(start: string, end: string): number\` uses \`toMinutes\` to give the minutes from \`start\` to \`end\`. If \`end\` is earlier in the day than \`start\`, the trip crosses midnight: add a full day, 24 × 60 minutes. The same time twice is \`0\`.

So \`minutesBetween('09:30', '11:15')\` is \`105\`, and \`minutesBetween('23:30', '00:15')\` is \`45\`.
--- starter
function toMinutes(time) {
}

function minutesBetween(start, end) {
}
--- solution
function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':')
  return Number(hours) * 60 + Number(minutes)
}

function minutesBetween(start: string, end: string): number {
  const diff = toMinutes(end) - toMinutes(start)
  return diff < 0 ? diff + 24 * 60 : diff
}
--- hint
In \`toMinutes\`, split on \`':'\`, convert both parts with \`Number(...)\`, then hours times 60 plus minutes.
--- hint
In \`minutesBetween\`, subtract the start's minutes from the end's minutes. A negative answer means the trip crossed midnight.
--- hint
Destructuring works here: \`const [hours, minutes] = time.split(':')\`.
--- check case | toMinutes('14:05')
toMinutes('14:05')
=> 845
--- check case | Midnight is 0
toMinutes('00:00')
=> 0
--- check case | A morning flight
minutesBetween('09:30', '11:15')
=> 105
--- check case | Across midnight
minutesBetween('23:30', '00:15')
=> 45
--- check case | The same time twice
minutesBetween('08:00', '08:00')
=> 0
--- check source | Both functions are typed
toMinutes\\s*\\(\\s*time\\s*:\\s*string\\s*\\)\\s*:\\s*number[\\s\\S]*minutesBetween\\s*\\(\\s*start\\s*:\\s*string\\s*,\\s*end\\s*:\\s*string\\s*\\)\\s*:\\s*number

=== ts-04 | Arrays and tuples
--- teach
Last lesson you put types on single values going into and out of functions. Real programs handle lists: a list of readings, a list of names, a list of requests. This lesson types those lists, and a second kind of list whose length is fixed.

Think of an egg carton. Every cup holds an egg; you would not put a tennis ball in one. Now think of a lunch box with two shaped compartments: one fits a sandwich, the other fits an apple. The carton is like an array, where every item is the same kind. The lunch box is like a tuple, where each position has its own kind.

### An array type

An **array type** is the type of the items, followed by \`[]\` (read "array of"). \`number[]\` is "an array of numbers", and \`string[]\` is "an array of strings":

\`\`\`ts
const temperatures: number[] = [21.5, 19, 23.25]
const crew: string[] = ['Ada', 'Lin', 'Sam']

console.log(temperatures[0] + 1)   // 22.5
console.log(crew.length)           // 3
\`\`\`

Because the checker knows what the items are, it knows that \`temperatures[0]\` is a \`number\`, so arithmetic with it is fine. It also guards the array against the wrong kind of item:

\`\`\`ts error
const temperatures: number[] = [21.5, 19, 23.25]
temperatures.push('warm')   // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
\`\`\`

The same type works on a parameter. A function that takes \`values: number[]\` can only be called with an array of numbers, and inside it every \`values[i]\` is a number. An item's type can be [[anything|array-of-objects]], not only the three simple ones.

An empty array has no items to infer from, so give it an annotation when you create it: \`const names: string[] = []\`. Then everyone, the checker included, knows what is meant to go in it.

**Watch out:** the checker trusts that an index is inside the array. \`temperatures[10]\` has the type \`number\`, but when the program runs it is \`undefined\`, because there are only three items. Reading [[past the end|index-past-end]] is not a type error. A loop that runs one step too far gives \`undefined\`, and arithmetic with it gives \`NaN\`.

### A tuple: a fixed length, a type per position

A **[[tuple|tuple-word]]** is an array with a fixed length, where each position has its own type. You write the types in square brackets, one per position:

\`\`\`ts
const reading: [string, number] = ['T1', 21.5]
\`\`\`

\`[string, number]\` means "exactly two items: first a string, then a number". The checker holds you to both the order and the length: \`['T1', '21.5']\` is an error because the second item must be a number, and a third item is an error because there are only two places.

Tuples work well with destructuring from the JavaScript course. Each name gets the type of its position:

\`\`\`ts
const reading: [string, number] = ['T1', 21.5]
const [sensor, value] = reading   // sensor is a string, value is a number
console.log(\`\${sensor} reads \${value}\`)   // T1 reads 21.5
\`\`\`

That makes a tuple handy for a function that needs to give back [[two things at once|tuples-in-practice]].

### Returning a tuple: write the return type

A function that builds \`[a, b]\` and returns it does not give back a tuple unless you say so. Without a return type, TypeScript infers a plain array of numbers, \`number[]\`, which could have any length:

\`\`\`ts error
function firstTwo(values: number[]) {
  return [values[0], values[1]]
}

const pair: [number, number] = firstTwo([4, 8, 15])
// error TS2322: Type 'number[]' is not assignable to type '[number, number]'.
\`\`\`

Write the return type after the brackets, \`function firstTwo(values: number[]): [number, number]\`, and the error goes away: now the function promises exactly two numbers.

Remember also that \`...values\` [[spreads|spread-empty]] an array into separate arguments, so \`Math.max(...temperatures)\` is the same as \`Math.max(21.5, 19, 23.25)\`.

::: context array-of-objects Arrays of anything
The part before \`[]\` can be any type at all. \`boolean[]\` is a row of yes-or-no values. \`string[][]\` is an array of arrays of strings, like the rows of a table. And in the next lesson you will describe objects with types of your own, so \`User[]\` will mean "an array of users", which is the type of most data an app handles: a list of messages, orders or requests. Whatever the item type, the checker makes sure every item fits it.
:::

::: context index-past-end Why the checker trusts your index
The checker cannot know how long an array will be when the program runs: it might come from a file, a user or a server. If every \`values[i]\` had the type \`number | undefined\`, you would have to check every single read, even in a loop that is plainly correct. So by default TypeScript assumes the index is fine. A stricter setting, \`noUncheckedIndexedAccess\`, makes every index read possibly \`undefined\`. Some teams turn it on. Without it, staying inside the array is your job, which is why \`i < values.length\`, not \`<=\`, matters so much.
:::

::: context tuple-word Where the word tuple comes from
Mathematicians name a group of things by how many there are: a couple, a triple, a quadruple, a quintuple. Generalise that to any number n and you get an "n-tuple", shortened to **tuple**. A point on a map is a 2-tuple of numbers. In TypeScript a tuple is still an ordinary JavaScript array when the program runs. The fixed length and the type for each position exist only for the checker.
:::

::: context tuples-in-practice Where you will meet tuples
Tuples are everywhere once you look. In React, \`useState\` returns a tuple: the current value and a function that changes it, written \`const [count, setCount] = useState(0)\`. In JavaScript, \`Object.entries(obj)\` gives an array of \`[key, value]\` pairs, and \`Promise.all\` with two different promises gives a tuple of their two results. Use a tuple for two or three closely related values. For more than that, an object with named properties (next lesson) is easier to read.
:::

::: context spread-empty The spread of an empty array
\`Math.max(...[3, 9, 4])\` is 9. But \`Math.max(...[])\` hands \`Math.max\` no arguments at all, and \`Math.max()\` with nothing gives \`-Infinity\`; \`Math.min()\` gives \`Infinity\`. Both have the type \`number\`, so the checker is happy, and the program carries on with a nonsense value. Whenever a function takes an array, ask what it should do when the array is empty, and handle that case first.
:::
--- task
Write \`minMax(values: number[]): [number, number]\`. It takes an array of numbers and returns a tuple: the smallest value first, then the largest.

So \`minMax([120, 95, 210, 143])\` is \`[95, 210]\`, and an array of one value gives that value twice.
--- starter
function minMax(values) {
}
--- solution
function minMax(values: number[]): [number, number] {
  return [Math.min(...values), Math.max(...values)]
}
--- hint
The parameter's type is \`number[]\`, and the return type after the brackets is the tuple \`[number, number]\`.
--- hint
\`Math.min(...values)\` spreads the array into separate arguments, and gives the smallest.
--- hint
Return both answers inside one pair of square brackets, smallest first.
--- check source | Takes number[] and returns a [number, number] tuple
minMax\\s*\\(\\s*values\\s*:\\s*number\\[\\]\\s*\\)\\s*:\\s*\\[\\s*number\\s*,\\s*number\\s*\\]
--- check case | Finds both ends
minMax([120, 95, 210, 143])
=> [95, 210]
--- check case | Works for one value
minMax([7])
=> [7, 7]

+++ practice | Add up an array
--- task
Write \`total(values: number[]): number\`, which returns the sum of all the numbers in the array. An empty array adds up to \`0\`.

Annotate the parameter and the return type.
--- starter
function total(values) {
}
--- solution
function total(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0)
}
--- hint
\`reduce\` with a starting value of \`0\` folds the array into one number, and gives \`0\` for an empty array.
--- hint
The parameter is \`values: number[]\`; the return type is \`number\`.
--- check source | total is typed
total\\s*\\(\\s*values\\s*:\\s*number\\[\\]\\s*\\)\\s*:\\s*number
--- check case | Adds the values
total([4, 8, 15, 16])
=> 43
--- check case | Decimals and negatives
total([2.5, -1, 0.5])
=> 2
--- check case | An empty array is 0
total([])
=> 0
--- check type-error | An array of strings is refused
total(['1', '2'])

+++ practice | First and last name
--- task
Write \`splitName(full: string): [string, string]\`. It returns a tuple: the first word of \`full\`, then the last word.

- Spaces at the ends, and extra spaces between words, do not matter: split the trimmed text on \`/\\s+/\`.
- With three words or more, the middle ones are skipped: \`splitName('Grace Brewster Hopper')\` is \`['Grace', 'Hopper']\`.
- With a single word, the second item is the empty string: \`splitName('Cher')\` is \`['Cher', '']\`.
- The empty string gives \`['', '']\`.

Use \`words[words.length - 1]\` for the last word.
--- starter
function splitName(full) {
  return full.split(' ')
}
--- solution
function splitName(full: string): [string, string] {
  const words = full.trim().split(/\\s+/)
  const last = words.length > 1 ? words[words.length - 1] : ''
  return [words[0], last]
}
--- hint
\`full.trim().split(/\\s+/)\` gives the words, however many spaces sit between them.
--- hint
The first word is \`words[0]\`. The last word only counts when there are at least two words.
--- hint
The return type \`[string, string]\` promises exactly two strings, so return a pair in square brackets.
--- check case | Two words
splitName('Ada Lovelace')
=> ['Ada', 'Lovelace']
--- check case | Three words skip the middle one
splitName('  Grace   Brewster Hopper ')
=> ['Grace', 'Hopper']
--- check case | One word
splitName('Cher')
=> ['Cher', '']
--- check case | The empty string
splitName('')
=> ['', '']
--- check source | Returns a [string, string] tuple
splitName\\s*\\(\\s*full\\s*:\\s*string\\s*\\)\\s*:\\s*\\[\\s*string\\s*,\\s*string\\s*\\]

+++ practice | Long words only
--- task
Write \`longWords(words: string[], min: number): string[]\`. It returns, in order, the words that have at least \`min\` letters, each turned to lowercase.

So \`longWords(['Orbit', 'to', 'Mars', 'Apogee'], 4)\` is \`['orbit', 'mars', 'apogee']\`. Use \`filter\` and \`map\`.
--- starter
function longWords(words, min) {
  return words
}
--- solution
function longWords(words: string[], min: number): string[] {
  return words.filter((w) => w.length >= min).map((w) => w.toLowerCase())
}
--- hint
\`filter\` keeps the words whose \`length\` is at least \`min\`; then \`map\` turns each one to lowercase.
--- hint
The parameters are \`words: string[]\` and \`min: number\`, and the function returns \`string[]\`.
--- check case | Keeps the long words, lowercased
longWords(['Orbit', 'to', 'Mars', 'Apogee'], 4)
=> ['orbit', 'mars', 'apogee']
--- check case | Exactly min letters counts
longWords(['abc', 'ab'], 3)
=> ['abc']
--- check case | None long enough
longWords(['a', 'b'], 5)
=> []
--- check type-error | One string is not an array of strings
longWords('Orbit', 2)
--- check source | longWords is typed
longWords\\s*\\(\\s*words\\s*:\\s*string\\[\\]\\s*,\\s*min\\s*:\\s*number\\s*\\)\\s*:\\s*string\\[\\]

+++ practice | The spread of the readings
--- task
Write \`spread(values: number[]): number\`, which returns the largest value minus the smallest.

Be careful at the edges:

- an empty array has no spread: return \`0\` (without that rule, \`Math.max()\` minus \`Math.min()\` is \`-Infinity\` minus \`Infinity\`);
- one value, or all values the same, gives \`0\`;
- negative values work as usual: \`spread([-3, 4, -10])\` is \`14\`.
--- starter
function spread(values: number[]): number {
  return Math.max(...values) - Math.min(...values)
}
--- solution
function spread(values: number[]): number {
  if (values.length === 0) return 0
  return Math.max(...values) - Math.min(...values)
}
--- hint
Run the starter in your head on \`[]\`: what are \`Math.max()\` and \`Math.min()\` with no arguments?
--- hint
Check \`values.length === 0\` first, and return 0 for that case.
--- check case | An empty array gives 0
spread([])
=> 0
--- check case | One value gives 0
spread([5])
=> 0
--- check case | Negative values
spread([-3, 4, -10])
=> 14
--- check case | All the same
spread([2, 2, 2])
=> 0

+++ practice | An average that gives NaN
--- task
\`average\` should return the mean of an array of numbers, and \`0\` for an empty array. Instead it returns \`NaN\` for every array.

The checker cannot catch this one: every \`values[i]\` has the type \`number\`, even when \`i\` is past the end. Find the loop's mistake and fix it, then make an empty array give \`0\`. Keep the signature.
--- starter
function average(values: number[]): number {
  let sum = 0
  for (let i = 0; i <= values.length; i++) {
    sum += values[i]
  }
  return sum / values.length
}
--- solution
function average(values: number[]): number {
  if (values.length === 0) return 0
  let sum = 0
  for (let i = 0; i < values.length; i++) {
    sum += values[i]
  }
  return sum / values.length
}
--- hint
An array of 3 items has indexes 0, 1 and 2. What is \`values[3]\`, and what is a number plus that?
--- hint
The loop should stop while \`i\` is still below \`values.length\`: use \`<\`, not \`<=\`.
--- hint
For an empty array, \`0 / 0\` is also \`NaN\`, so return 0 before the loop.
--- check case | The mean of three values
average([2, 4, 9])
=> 5
--- check case | One value
average([7])
=> 7
--- check case | An empty array is 0
average([])
=> 0
--- check source | Keeps the signature
average\\s*\\(\\s*values\\s*:\\s*number\\[\\]\\s*\\)\\s*:\\s*number

+++ practice | The hottest sensor
--- task
Each sensor reading is a tuple \`[string, number]\`: the sensor's name, then its temperature, like \`['T1', 21.5]\`.

Write \`peak(readings: [string, number][]): [string, number]\`, which returns the reading with the highest temperature.

- If two readings tie for highest, return the first one.
- If there are no readings, throw a \`RangeError\`.

So \`peak([['T1', 21.5], ['T2', 24], ['T3', 19]])\` is \`['T2', 24]\`. (\`[string, number][]\` is read "an array of string-number tuples".)
--- starter
function peak(readings) {
  return readings[0]
}
--- solution
function peak(readings: [string, number][]): [string, number] {
  if (readings.length === 0) {
    throw new RangeError('no readings')
  }
  let best = readings[0]
  for (const reading of readings) {
    if (reading[1] > best[1]) best = reading
  }
  return best
}
--- hint
Throw first when the array is empty. Then start with the first reading as the best so far.
--- hint
Loop over the readings and compare temperatures with \`reading[1] > best[1]\`. Using \`>\` and not \`>=\` keeps the first of a tie.
--- check case | The hottest reading
peak([['T1', 21.5], ['T2', 24], ['T3', 19]])
=> ['T2', 24]
--- check case | A tie keeps the first
peak([['A', 5], ['B', 5]])
=> ['A', 5]
--- check case | All below zero
peak([['N1', -12], ['N2', -3.5]])
=> ['N2', -3.5]
--- check test | No readings throws
throws(() => peak([]))
--- check type-error | A temperature must be a number
peak([['T1', '21.5']])

=== ts-05 | Object types and interfaces
--- teach
Last lesson you typed lists. Most real data, though, comes as objects, which you met in the JavaScript course: a user is \`{ name: 'Ada', plan: 'pro', credits: 120 }\`, a request is an object, a row from a database is an object. This lesson shows you how to describe the shape of an object, so the checker can guard every use of it.

Think of a passport. Every passport has the same boxes: a name, a date of birth, a number. A passport with the number missing is not valid, and a box labelled "favourite food" does not belong on it. The layout of the boxes is decided once, and every passport follows it.

### Describing a shape with an interface

An **interface** is a description of an object's [[shape|interface-word]]: which properties it has, and the type of each one. You write the word \`interface\`, a name that starts with a capital letter, and then each property with its type inside braces:

\`\`\`ts
interface Satellite {
  name: string
  orbit: 'low' | 'geo'
  massKg: number
}
\`\`\`

Read it as "a \`Satellite\` is an object with a \`name\` that is a string, an \`orbit\`, and a \`massKg\` that is a number". The interface itself creates nothing. It is a description the checker uses.

### Using the interface as a type

Once it has a name, the interface is a type like \`string\` or \`number\`. You can use it on a variable or a parameter:

\`\`\`ts
interface Satellite {
  name: string
  orbit: 'low' | 'geo'
  massKg: number
}

function label(s: Satellite): string {
  return \`\${s.name} [\${s.orbit}, \${s.massKg} kg]\`
}

const hubble: Satellite = { name: 'Hubble', orbit: 'low', massKg: 11110 }
console.log(label(hubble))   // Hubble [low, 11110 kg]
\`\`\`

Inside \`label\`, the checker knows exactly what \`s\` holds. Now three kinds of mistake are caught before the code runs:

- a misspelled property: \`s.nmae\` gives \`TS2339: Property 'nmae' does not exist on type 'Satellite'\`;
- a missing property: an object without \`massKg\` gives \`TS2741: Property 'massKg' is missing\`;
- a property with the wrong type, such as \`massKg: 'heavy'\`.

An object with a property the interface does not list is caught too, when you write it out in full, as in \`{ name: 'Hubble', orbit: 'low', massKg: 11110, colour: 'silver' }\`: that is [[an extra property|excess-property]], and probably a typo.

### Only these exact strings: literal types

Look at \`orbit: 'low' | 'geo'\`. A string in quotes used as a type, such as \`'low'\`, is a **literal type**: the type whose only value is that exact text. The bar \`|\` is read "or". So \`'low' | 'geo'\` is a **union of literal types**: only those two strings are allowed.

\`\`\`ts error
interface Satellite {
  name: string
  orbit: 'low' | 'geo'
  massKg: number
}

const probe: Satellite = { name: 'Juno', orbit: 'deep', massKg: 3625 }
// error TS2322: Type '"deep"' is not assignable to type '"low" | "geo"'.
\`\`\`

That turns a typo such as \`'Low'\` or a value nobody planned for into an error, instead of a bug weeks later. [[Literal types|literal-types]] come back in lesson 8, where they do even more work.

### A type alias does the same job

There is a second way to name an object's shape: a **type alias**, written with the word \`type\` and an equals sign:

\`\`\`ts
type Point = {
  x: number
  y: number
}

const origin: Point = { x: 0, y: 0 }
\`\`\`

For describing objects, an interface and a [[type alias|type-vs-interface]] are almost interchangeable. Most teams pick one and use it everywhere. This course uses an interface for an object's shape, and \`type\` to give a name to a union, which an interface cannot do:

\`\`\`ts
type Orbit = 'low' | 'geo' | 'deep'

let next: Orbit = 'geo'
\`\`\`

### Lists of objects

Put the two lessons together and you can type a list of objects: \`Satellite[]\` is "an array of satellites". Inside a loop over it, or inside \`map\` and \`filter\`, every item is known to be a \`Satellite\`.

**Watch out:** an interface checks the code you write, not the data that arrives while the program runs. The checker compares [[shapes, not names|structural-typing]], and it does that before the program starts. If an object comes from outside, for example from \`JSON.parse\`, TypeScript has no way to see what is really inside it. Lesson 10 shows how to check that kind of data.

::: context interface-word Why "interface"
An interface, in everyday English, is the surface where two things meet: the buttons on a microwave are its interface, and so is the plug on a cable. In code, an interface is where two parts of a program meet. The part that creates a \`Satellite\` and the part that reads one agree on its shape, without either needing to know how the other works. Interfaces are named with a capital letter, like \`Satellite\`, to tell them apart from variables, which start in lowercase.
:::

::: context excess-property The extra-property check
TypeScript normally lets an object have more properties than a type asks for: a \`Satellite\` with an extra \`launchYear\` still has everything a \`Satellite\` needs. But when you write the object out in full, right where the type is expected, an unknown property is almost always a typo, such as \`masKg\` for \`massKg\`. So in that one situation the checker reports \`TS2353: Object literal may only specify known properties\`. It catches the misspelling the moment you make it.
:::

::: context literal-types A narrow type inside a wide one
Every string is a \`string\`. The literal type \`'free'\` holds just one of them. So the value \`'free'\` fits anywhere a \`string\` is expected, but a general \`string\` does not fit where \`'free' | 'pro'\` is expected, because it might be \`'gold'\`. Picture the types as boxes, one inside the other:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" font-family="Inter, Arial, sans-serif">
  <rect x="10" y="10" width="340" height="130" rx="12" fill="#ffffff" stroke="#1d6fd1" stroke-width="2"/>
  <text x="24" y="32" font-size="13" fill="#1d6fd1">string: every piece of text</text>
  <rect x="34" y="48" width="190" height="70" rx="10" fill="#8fb8f0" stroke="#1f2a44" stroke-width="2"/>
  <text x="46" y="68" font-size="12" fill="#1f2a44">'free' | 'pro'</text>
  <rect x="48" y="80" width="70" height="26" rx="13" fill="#ffffff" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="83" y="98" font-size="12" text-anchor="middle" fill="#1f2a44">'free'</text>
  <rect x="134" y="80" width="70" height="26" rx="13" fill="#ffffff" stroke="#1f2a44" stroke-width="1.5"/>
  <text x="169" y="98" font-size="12" text-anchor="middle" fill="#1f2a44">'pro'</text>
  <rect x="250" y="80" width="78" height="26" rx="13" fill="#ffffff" stroke="#b4232c" stroke-width="1.5"/>
  <text x="289" y="98" font-size="12" text-anchor="middle" fill="#b4232c">'gold'</text>
</svg>
\`\`\`

\`'gold'\` is a string, but it sits outside the inner box, so it is not a \`'free' | 'pro'\`.
:::

::: context type-vs-interface Interface or type alias?
The two differ in a few ways that matter later. An interface can be extended with \`extends\`, and two interfaces with the same name merge into one, which libraries use to let you add properties. A type alias can name things an interface cannot, such as a union: \`type Plan = 'free' | 'pro'\` is a type alias, and there is no interface version of it. For plain object shapes either works. The TypeScript handbook suggests interfaces for objects until you need something only \`type\` can do.
:::

::: context structural-typing Shapes, not names
TypeScript checks the shape of a value, not the name of its type. Any object with a \`name\` string, an \`orbit\` of \`'low'\` or \`'geo'\`, and a \`massKg\` number fits \`Satellite\`, even if it was built somewhere that never mentions \`Satellite\`. This is called **structural typing**, and it suits JavaScript, where objects are often made on the fly. Some other languages, such as Java and C#, work by name instead: there, a class only fits a type it explicitly says it belongs to.
:::
--- task
Declare \`interface Request\` with three properties: \`user\`, a \`string\`; \`model\`, a \`string\`; and \`tokens\`, a \`number\`.

Then write \`summarize(req: Request): string\`, which returns a sentence in this exact form:

\`\`\`
<user> used <tokens> tokens on <model>
\`\`\`

For example, for \`{ user: 'ada', model: 'sonnet', tokens: 1200 }\` it returns \`'ada used 1200 tokens on sonnet'\`.
--- starter
// Declare the Request interface, then summarize().

--- solution
interface Request {
  user: string
  model: string
  tokens: number
}

function summarize(req: Request): string {
  return \`\${req.user} used \${req.tokens} tokens on \${req.model}\`
}
--- hint
An interface is the word \`interface\`, the name, then each property and its type on its own line inside braces.
--- hint
The parameter \`req\` has the type \`Request\`, so inside the function \`req.user\`, \`req.tokens\` and \`req.model\` are all known.
--- hint
Build the sentence with a template literal, in the order user, tokens, model.
--- check source | Declares the Request interface
interface\\s+Request\\s*\\{
--- check source | summarize takes a Request
summarize\\s*\\(\\s*req\\s*:\\s*Request\\s*\\)\\s*:\\s*string
--- check case | Builds the sentence
summarize({ user: 'ada', model: 'sonnet', tokens: 1200 })
=> 'ada used 1200 tokens on sonnet'

+++ practice | Describe a planet
--- task
Declare \`interface Planet\` with three properties: \`name\`, a \`string\`; \`moons\`, a \`number\`; and \`hasRings\`, a \`boolean\`.

Then write \`describePlanet(p: Planet): string\`, which returns:

- \`'Saturn: 146 moons, rings'\` for a planet with rings, or \`'Mars: 2 moons, no rings'\` for one without;
- the word \`moon\`, not \`moons\`, when there is exactly one: \`'Earth: 1 moon, no rings'\`.
--- starter
// Declare Planet, then describePlanet().

--- solution
interface Planet {
  name: string
  moons: number
  hasRings: boolean
}

function describePlanet(p: Planet): string {
  const moonWord = p.moons === 1 ? 'moon' : 'moons'
  const rings = p.hasRings ? 'rings' : 'no rings'
  return \`\${p.name}: \${p.moons} \${moonWord}, \${rings}\`
}
--- hint
Each property goes on its own line inside the interface's braces, with its type after a colon.
--- hint
Use two ternaries: one picks \`'moon'\` or \`'moons'\`, the other picks \`'rings'\` or \`'no rings'\`.
--- check case | A planet with rings
describePlanet({ name: 'Saturn', moons: 146, hasRings: true })
=> 'Saturn: 146 moons, rings'
--- check case | Exactly one moon
describePlanet({ name: 'Earth', moons: 1, hasRings: false })
=> 'Earth: 1 moon, no rings'
--- check case | No moons at all
describePlanet({ name: 'Mercury', moons: 0, hasRings: false })
=> 'Mercury: 0 moons, no rings'
--- check type-error | A planet must say whether it has rings
describePlanet({ name: 'Mars', moons: 2 })
--- check type-error | moons is a number
const p: Planet = { name: 'Mars', moons: 'two', hasRings: false }

+++ practice | Ticket priorities
--- task
Write a **type alias** named \`Priority\` for the union of the three literal types \`'low'\`, \`'normal'\` and \`'urgent'\`.

Then declare \`interface Ticket\` with \`id\`, a \`number\`; \`title\`, a \`string\`; and \`priority\`, a \`Priority\`.

Finally write \`responseHours(t: Ticket): number\`, which returns how many hours the team has to reply: \`1\` for urgent, \`24\` for normal, and \`72\` for low.
--- starter
// Declare Priority and Ticket, then responseHours().

--- solution
type Priority = 'low' | 'normal' | 'urgent'

interface Ticket {
  id: number
  title: string
  priority: Priority
}

function responseHours(t: Ticket): number {
  if (t.priority === 'urgent') return 1
  if (t.priority === 'normal') return 24
  return 72
}
--- hint
A type alias is \`type Priority = …\`, with an equals sign and the three literal types joined by \`|\`.
--- hint
Once it has a name, \`Priority\` is a type like any other: use it for the \`priority\` property.
--- check case | Urgent
responseHours({ id: 1, title: 'Site down', priority: 'urgent' })
=> 1
--- check case | Normal
responseHours({ id: 2, title: 'Typo on page', priority: 'normal' })
=> 24
--- check case | Low
responseHours({ id: 3, title: 'New colour', priority: 'low' })
=> 72
--- check type-error | 'medium' is not a priority
const t: Ticket = { id: 4, title: 'x', priority: 'medium' }
--- check type-error | A Priority is only one of the three
const p: Priority = 'Urgent'
--- check source | Priority is a type alias
\\btype\\s+Priority\\s*=

+++ practice | An order's total
--- task
Declare \`interface LineItem\` with \`name\`, a \`string\`; \`price\`, a \`number\` (the price of one); and \`qty\`, a \`number\` (how many).

Then write \`orderTotal(items: LineItem[]): number\`, which returns the total cost of the order: each item's price times its quantity, all added up. An empty order costs \`0\`. Round the answer to 2 decimal places with \`Number(x.toFixed(2))\`.
--- starter
// Declare LineItem, then orderTotal().

--- solution
interface LineItem {
  name: string
  price: number
  qty: number
}

function orderTotal(items: LineItem[]): number {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  return Number(total.toFixed(2))
}
--- hint
The parameter is an array of line items: \`items: LineItem[]\`.
--- hint
\`reduce\` with a start of \`0\` adds up \`item.price * item.qty\` for every item.
--- hint
Rounding comes last: \`Number(total.toFixed(2))\`.
--- check case | Two kinds of item
orderTotal([{ name: 'bolt', price: 0.25, qty: 8 }, { name: 'nut', price: 0.1, qty: 3 }])
=> 2.3
--- check case | An empty order
orderTotal([])
=> 0
--- check case | Rounds to cents
orderTotal([{ name: 'washer', price: 0.1, qty: 7 }])
=> 0.7
--- check type-error | An item needs a quantity
orderTotal([{ name: 'bolt', price: 0.25 }])

+++ practice | A safe withdrawal
--- task
Declare \`interface Account\` with \`owner\`, a \`string\`, and \`balance\`, a \`number\`.

Write \`withdraw(acc: Account, amount: number): Account\`, which returns a **new** account with \`amount\` taken off the balance. The original account must not change.

- If \`amount\` is 0 or less, throw a \`RangeError\`.
- If \`amount\` is more than the balance, throw a \`RangeError\`.
- Taking out exactly the whole balance is allowed, and leaves \`0\`.
--- starter
interface Account {
  owner: string
  balance: number
}

function withdraw(acc: Account, amount: number): Account {
  acc.balance = acc.balance - amount
  return acc
}
--- solution
interface Account {
  owner: string
  balance: number
}

function withdraw(acc: Account, amount: number): Account {
  if (amount <= 0) throw new RangeError('amount must be above 0')
  if (amount > acc.balance) throw new RangeError('not enough money')
  return { ...acc, balance: acc.balance - amount }
}
--- hint
Spread copies an object with one change: \`{ ...acc, balance: newBalance }\`. The original stays as it was.
--- hint
Check the two bad cases first and throw, then return the new object.
--- check case | Takes the amount off
withdraw({ owner: 'ada', balance: 100 }, 30)
=> { owner: 'ada', balance: 70 }
--- check case | The whole balance is allowed
withdraw({ owner: 'lin', balance: 50 }, 50).balance
=> 0
--- check test | The original account is unchanged
(() => { const a = { owner: 'sam', balance: 80 }; const b = withdraw(a, 20); return a.balance === 80 && b.balance === 60 && a !== b })()
--- check test | Too much throws
throws(() => withdraw({ owner: 'ada', balance: 10 }, 10.01))
--- check test | Zero or less throws
throws(() => withdraw({ owner: 'ada', balance: 10 }, 0)) && throws(() => withdraw({ owner: 'ada', balance: 10 }, -5))

+++ practice | Two mistakes the checker found
--- task
\`welcome\` should return a message like this one, for a member on the pro plan:

\`\`\`
Hi Ada, we sent a receipt to ada@example.com. Thanks for supporting us!
\`\`\`

and end with \`Upgrade any time.\` instead for a free member. It does not type-check. The compiler reports two errors:

- \`TS2367: This comparison appears to be unintentional because the types '"free" | "pro"' and '"Pro"' have no overlap.\`
- \`TS2551: Property 'emial' does not exist on type 'Member'. Did you mean 'email'?\`

Fix both. Keep the interface as it is.
--- starter
interface Member {
  name: string
  email: string
  plan: 'free' | 'pro'
}

function welcome(m: Member): string {
  const tier = m.plan === 'Pro' ? 'Thanks for supporting us!' : 'Upgrade any time.'
  return \`Hi \${m.name}, we sent a receipt to \${m.emial}. \${tier}\`
}
--- solution
interface Member {
  name: string
  email: string
  plan: 'free' | 'pro'
}

function welcome(m: Member): string {
  const tier = m.plan === 'pro' ? 'Thanks for supporting us!' : 'Upgrade any time.'
  return \`Hi \${m.name}, we sent a receipt to \${m.email}. \${tier}\`
}
--- hint
The plan can only be \`'free'\` or \`'pro'\`, in lowercase. \`'Pro'\` with a capital P can never match, and the checker knows it.
--- hint
The second message even tells you the right property name.
--- check case | A pro member
welcome({ name: 'Ada', email: 'ada@example.com', plan: 'pro' })
=> 'Hi Ada, we sent a receipt to ada@example.com. Thanks for supporting us!'
--- check case | A free member
welcome({ name: 'Lin', email: 'lin@example.com', plan: 'free' })
=> 'Hi Lin, we sent a receipt to lin@example.com. Upgrade any time.'
--- check source absent | No misspelled property is left
emial
--- check source absent | No capital Pro is left
['"]Pro['"]

+++ practice | Customers by country
--- task
Declare two interfaces:

- \`Address\` with \`city\` and \`country\`, both \`string\`;
- \`Customer\` with \`name\`, a \`string\`; \`plan\`, which is \`'free'\` or \`'pro'\`; and \`address\`, an \`Address\`.

Then write two functions:

1. \`countIn(customers: Customer[], country: string): number\` returns how many customers live in that country.
2. \`proCities(customers: Customer[]): string[]\` returns the cities of the pro customers, each city once, in the order they first appear.

So for Ada (pro, Oslo, Norway), Lin (free, Lima, Peru) and Sam (pro, Oslo, Norway), \`countIn(…, 'Norway')\` is \`2\` and \`proCities(…)\` is \`['Oslo']\`.
--- starter
// Declare Address and Customer, then countIn() and proCities().

--- solution
interface Address {
  city: string
  country: string
}

interface Customer {
  name: string
  plan: 'free' | 'pro'
  address: Address
}

function countIn(customers: Customer[], country: string): number {
  return customers.filter((c) => c.address.country === country).length
}

function proCities(customers: Customer[]): string[] {
  const cities: string[] = []
  for (const c of customers) {
    if (c.plan === 'pro' && !cities.includes(c.address.city)) {
      cities.push(c.address.city)
    }
  }
  return cities
}
--- hint
A property's type can be another interface: \`address: Address\`. Then \`c.address.city\` is a string.
--- hint
For \`proCities\`, start with \`const cities: string[] = []\` and push a city only if \`includes\` says it is not there yet.
--- check case | Counts the customers in Norway
countIn([{ name: 'Ada', plan: 'pro', address: { city: 'Oslo', country: 'Norway' } }, { name: 'Lin', plan: 'free', address: { city: 'Lima', country: 'Peru' } }, { name: 'Sam', plan: 'pro', address: { city: 'Oslo', country: 'Norway' } }], 'Norway')
=> 2
--- check case | A country with nobody
countIn([{ name: 'Lin', plan: 'free', address: { city: 'Lima', country: 'Peru' } }], 'Chile')
=> 0
--- check case | Each pro city once, in order
proCities([{ name: 'Ada', plan: 'pro', address: { city: 'Oslo', country: 'Norway' } }, { name: 'Kim', plan: 'pro', address: { city: 'Seoul', country: 'Korea' } }, { name: 'Lin', plan: 'free', address: { city: 'Lima', country: 'Peru' } }, { name: 'Sam', plan: 'pro', address: { city: 'Oslo', country: 'Norway' } }])
=> ['Oslo', 'Seoul']
--- check case | No customers
proCities([])
=> []
--- check type-error | A customer needs an address
const c: Customer = { name: 'Max', plan: 'pro' }
--- check type-error | 'gold' is not a plan
const c: Customer = { name: 'Max', plan: 'gold', address: { city: 'Rome', country: 'Italy' } }

=== ts-06 | Optional values and null
--- teach
Last lesson every property in an interface was required: leave one out and the checker complained. But real data has gaps. Not everyone has a nickname, not every order has a delivery note, and a search does not always find something. This lesson shows how TypeScript describes a value that might be missing, and how it makes you deal with the gap before it can bite.

Think of a form with a box marked "(optional)", such as "middle name". The form is still complete without it. But whoever reads the form cannot assume the box is filled in: they have to look first.

### An optional property

Put a question mark \`?\` after a property's name and that property becomes **optional**: an object may leave it out.

\`\`\`ts
interface Crew {
  name: string
  callSign?: string
}

const ada: Crew = { name: 'Ada', callSign: 'Countess' }
const lin: Crew = { name: 'Lin' }   // fine: callSign is optional
\`\`\`

Read \`callSign?: string\` as "callSign, maybe, a string". When you read it, its type is \`string | undefined\`: a string, or [[\`undefined\`|undefined-vs-null]] when it is missing. You met the bar \`|\` last lesson: it means "or".

### Strict mode makes you check first

Because \`callSign\` might be \`undefined\`, strict mode will not let you use it as a string straight away:

\`\`\`ts error
interface Crew {
  name: string
  callSign?: string
}

function loud(c: Crew): string {
  return c.callSign.toUpperCase()
}
// error TS18048: 'c.callSign' is possibly 'undefined'.
\`\`\`

In plain JavaScript, that line would crash when the program runs, with \`TypeError: Cannot read properties of undefined\`, but only for crew without a call sign, so it might hide for weeks. TypeScript reports it before anything runs.

### Narrowing: check, and the checker follows

The fix is to check. Inside an \`if\` that rules out \`undefined\`, TypeScript knows the value is a string:

\`\`\`ts fragment
function loud(c: Crew): string {
  if (c.callSign !== undefined) {
    return c.callSign.toUpperCase()   // here callSign is a string
  }
  return c.name
}
\`\`\`

This is called **[[narrowing|narrowing-word]]**: a check in your code makes the type narrower, from "string or undefined" down to "string", inside the part of the code the check protects.

### Two shorter forms

Two operators do common checks in one step.

\`??\` is the one from the JavaScript course. \`a ?? b\` is \`a\`, unless \`a\` is \`null\` or \`undefined\`; then it is \`b\`. It fills a gap with a fallback:

\`\`\`ts fragment
const shown = c.callSign ?? c.name    // the call sign, or the name if there is none
\`\`\`

\`?.\` (read "optional chaining") stops early. \`a?.b\` is \`a.b\` when \`a\` is there, and \`undefined\` when \`a\` is \`null\` or \`undefined\`, instead of crashing:

\`\`\`ts fragment
const size = c.callSign?.length       // a number, or undefined when there is no call sign
\`\`\`

The result of \`?.\` can still be \`undefined\`, so its type is \`number | undefined\`. [[\`?.\` is often followed by \`??\`|optional-chaining]] to fill that gap.

### null: nothing, on purpose

\`undefined\` usually means "never set". JavaScript has a second empty value, **\`null\`**, which usually means "deliberately nothing". A function that searches and may find nothing often returns \`null\` for that case, and says so in its return type:

\`\`\`ts
function firstStartingWith(names: string[], letter: string): string | null {
  for (const name of names) {
    if (name[0] === letter) return name
  }
  return null
}

const found = firstStartingWith(['Ada', 'Lin'], 'L')
if (found !== null) {
  console.log(found.toUpperCase())   // LIN
}
\`\`\`

Strict mode treats \`null\` exactly like \`undefined\`: until you check, \`found.length\` is an error, \`TS18047: 'found' is possibly 'null'\`. That one rule removes a whole family of crashes that made \`null\` famous as the [[billion-dollar mistake|billion-dollar]].

Parameters can be optional too, with the same \`?\`: \`function greet(name?: string)\` may be called as \`greet()\`, and inside it \`name\` is \`string | undefined\`.

### The shortcuts that skip the check

You will see two ways people make these errors go away without checking. A \`!\` after a value, as in \`c.callSign!.toUpperCase()\`, is a **non-null assertion**: it tells the checker "trust me, this is not \`undefined\`". \`c.callSign as string\` is a **type assertion** that says the same thing another way. Neither one checks anything. If you are wrong, the program crashes at run time, which is exactly what strict mode was protecting you from. [[Narrowing proves it; \`!\` and \`as\` only claim it|non-null-assertion]].

**Watch out:** \`||\` is not the same as \`??\`. \`a || b\` falls back to \`b\` whenever \`a\` is "falsy": \`undefined\` and \`null\`, but also \`0\`, \`''\` and \`false\`. So \`settings.volume || 50\` turns a volume someone set to \`0\` into \`50\`. Use \`??\` when only a missing value should be replaced.

::: context undefined-vs-null Two kinds of nothing
JavaScript has two empty values, and their difference is mostly a habit. \`undefined\` is what you get when something was never given a value: a missing property, a parameter nobody passed, a function with no \`return\`. \`null\` is a value someone wrote on purpose to say "nothing here". JSON, the text format servers send, has \`null\` but no \`undefined\`, so data from an API uses \`null\` for empty fields. TypeScript keeps them apart: \`string | undefined\` and \`string | null\` are different types, and \`??\` and \`?.\` handle both.
:::

::: context narrowing-word The checker reads your if
TypeScript follows the flow of your code like a reader with a highlighter. After \`if (x !== undefined)\`, it knows that inside the braces \`x\` cannot be \`undefined\`. After \`if (x === undefined) return\`, it knows the same for every line below, because the only way to get there is past that check. This is called **control flow analysis**. You will use it constantly: in lesson 7 with \`typeof\`, in lesson 8 with a shared \`kind\` field, and in lesson 10 with checks you write yourself.
:::

::: context optional-chaining Chains of question marks
\`?.\` stops the whole chain at the first missing link. \`order.shipping?.address?.city\` gives the city when everything is there, and \`undefined\` the moment \`shipping\` or \`address\` is missing, without a crash. It also works on method calls: \`name?.trim()\` calls \`trim\` only if \`name\` is there. Optional chaining and \`??\` were both added to JavaScript itself in 2020, after years of people writing long \`a && a.b && a.b.c\` chains by hand.
:::

::: context billion-dollar The billion-dollar mistake
In 1965 the computer scientist Tony Hoare added the null reference to a language called ALGOL W, because it was easy to build. In a 2009 talk he called it his "billion-dollar mistake", because of the crashes, security holes and lost work it has caused in the decades since: any value might secretly be empty, and nothing warned you. Strict mode in TypeScript, like Kotlin and Swift, fixes this by putting the emptiness into the type, so the checker can warn you.
:::

::: context non-null-assertion Proof against a promise
A check such as \`if (x !== undefined)\` is proof: it runs every time, and the code inside only runs when the value is really there. \`x!\` and \`x as string\` are promises: they change what the checker believes and then vanish from the JavaScript that runs, so nothing is checked at all. There are rare places where you know more than the checker, but on a real team every \`!\` is a question in code review: what makes you sure? Most of the time, the honest answer is a check.
:::
--- task
The starter does not type-check, because \`p.nickname\` might be \`undefined\`.

Fix \`displayName\` so that it returns the nickname in uppercase when there is one, and the name otherwise. Do not use \`!\` or \`as\`: narrow with a check, or use \`?.\` and \`??\`.
--- starter
interface Profile {
  name: string
  nickname?: string
}

function displayName(p: Profile): string {
  return p.nickname.toUpperCase()
}
--- solution
interface Profile {
  name: string
  nickname?: string
}

function displayName(p: Profile): string {
  return p.nickname?.toUpperCase() ?? p.name
}
--- hint
Read the error: \`'p.nickname' is possibly 'undefined'\`. You need to handle the case where it is missing.
--- hint
\`p.nickname?.toUpperCase()\` gives \`undefined\` when there is no nickname, instead of crashing.
--- hint
Then \`?? p.name\` fills that \`undefined\` in with the name.
--- check case | Uses the nickname when there is one
displayName({ name: 'Ada Lovelace', nickname: 'ada' })
=> 'ADA'
--- check case | Falls back to the name
displayName({ name: 'Lin' })
=> 'Lin'
--- check source absent | No non-null assertion or cast
nickname!|\\bas\\s+string\\b
?? \`!\` and \`as\` tell the checker to trust you. Narrowing proves it.

+++ practice | An email line
--- task
Declare \`interface Contact\` with \`name\`, a \`string\`, and an **optional** \`email\`, a \`string\`.

Write \`contactLine(c: Contact): string\`, which returns \`'Ada <ada@example.com>'\` when the contact has an email, and \`'Ada (no email)'\` when it does not. Do not use \`!\` or \`as\`.
--- starter
// Declare Contact, then contactLine().

--- solution
interface Contact {
  name: string
  email?: string
}

function contactLine(c: Contact): string {
  if (c.email === undefined) {
    return \`\${c.name} (no email)\`
  }
  return \`\${c.name} <\${c.email}>\`
}
--- hint
An optional property has a \`?\` straight after its name: \`email?: string\`.
--- hint
Check \`c.email === undefined\` first and return the "no email" line. Below that check, \`c.email\` is a string.
--- check case | With an email
contactLine({ name: 'Ada', email: 'ada@example.com' })
=> 'Ada <ada@example.com>'
--- check case | Without an email
contactLine({ name: 'Lin' })
=> 'Lin (no email)'
--- check type-error | The name is not optional
const c: Contact = { email: 'x@example.com' }
--- check source absent | No ! or as
email!|\\bas\\s+string\\b

+++ practice | The first value over a limit
--- task
Write \`firstOver(values: number[], limit: number): number | null\`. It returns the first value in the array that is greater than \`limit\`, or \`null\` when there is none.

Be careful: \`0\` is a real answer, not "nothing". \`firstOver([0, 5], -1)\` is \`0\`.
--- starter
function firstOver(values: number[], limit: number): number | null {
  return values[0]
}
--- solution
function firstOver(values: number[], limit: number): number | null {
  for (const v of values) {
    if (v > limit) return v
  }
  return null
}
--- hint
Loop over the values and \`return\` the first one above the limit as soon as you find it.
--- hint
If the loop finishes without returning, nothing was found: return \`null\` after the loop.
--- check case | Finds the first one over
firstOver([3, 8, 12, 20], 10)
=> 12
--- check case | None over gives null
firstOver([1, 2], 5)
=> null
--- check case | An empty array gives null
firstOver([], 0)
=> null
--- check case | 0 is a real answer
firstOver([0, 5], -1)
=> 0
--- check type-error | The result might be null, so it is not a plain number
const n: number = firstOver([1], 0)

+++ practice | Average of the readings that arrived
--- task
Declare \`interface Reading\` with \`sensor\`, a \`string\`, and an optional \`value\`, a \`number\`. A reading with no \`value\` means the sensor did not report.

Write \`averageValue(readings: Reading[]): number | null\`. It returns the average of the values that are there, and \`null\` if no reading has a value. A value of \`0\` is a real value and counts.
--- starter
interface Reading {
  sensor: string
  value?: number
}

function averageValue(readings: Reading[]): number | null {
  let sum = 0
  for (const r of readings) {
    sum += r.value
  }
  return sum / readings.length
}
--- solution
interface Reading {
  sensor: string
  value?: number
}

function averageValue(readings: Reading[]): number | null {
  let sum = 0
  let count = 0
  for (const r of readings) {
    if (r.value !== undefined) {
      sum += r.value
      count++
    }
  }
  return count === 0 ? null : sum / count
}
--- hint
Keep two totals: the sum of the values, and how many values there were.
--- hint
Only add a reading when \`r.value !== undefined\`. Inside that check, \`r.value\` is a number.
--- hint
If the count is still 0 at the end, return \`null\`.
--- check case | Skips the missing values
averageValue([{ sensor: 'A', value: 10 }, { sensor: 'B' }, { sensor: 'C', value: 20 }])
=> 15
--- check case | A value of 0 counts
averageValue([{ sensor: 'A', value: 0 }, { sensor: 'B', value: 4 }])
=> 2
--- check case | No values at all gives null
averageValue([{ sensor: 'A' }, { sensor: 'B' }])
=> null
--- check case | No readings gives null
averageValue([])
=> null

+++ practice | A volume that can be zero
--- task
Declare \`interface AudioSettings\` with an optional \`volume\`, a \`number\`, and an optional \`muted\`, a \`boolean\`.

Write \`effectiveVolume(s: AudioSettings): number\`:

- if \`muted\` is \`true\`, the volume is \`0\`;
- otherwise it is \`volume\`, or \`50\` when \`volume\` is missing.

Watch the edge: a volume someone set to \`0\` must stay \`0\`, not turn into \`50\`.
--- starter
// Declare AudioSettings, then effectiveVolume().

--- solution
interface AudioSettings {
  volume?: number
  muted?: boolean
}

function effectiveVolume(s: AudioSettings): number {
  if (s.muted === true) return 0
  return s.volume ?? 50
}
--- hint
Both properties are optional, so each gets a \`?\` after its name.
--- hint
\`??\` falls back only for \`null\` and \`undefined\`. \`||\` would also replace \`0\`, which is the bug to avoid.
--- check case | No settings at all
effectiveVolume({})
=> 50
--- check case | A volume of 0 stays 0
effectiveVolume({ volume: 0 })
=> 0
--- check case | A set volume
effectiveVolume({ volume: 80 })
=> 80
--- check case | Muted wins
effectiveVolume({ volume: 80, muted: true })
=> 0
--- check case | Not muted
effectiveVolume({ volume: 30, muted: false })
=> 30

+++ practice | The ! that crashed
--- task
\`managerName\` should return the name of an employee's manager, or \`'none'\` for an employee with no manager, such as the head of the company.

It type-checks, because of the \`!\`, but it crashes with a \`TypeError\` for an employee with no manager. Remove the \`!\` and handle the missing manager properly. Do not use \`as\` either.
--- starter
interface Person {
  name: string
}

interface Employee {
  name: string
  manager?: Person
}

function managerName(e: Employee): string {
  return e.manager!.name
}
--- solution
interface Person {
  name: string
}

interface Employee {
  name: string
  manager?: Person
}

function managerName(e: Employee): string {
  return e.manager?.name ?? 'none'
}
--- hint
\`e.manager!\` told the checker "this is never missing", and that was not true for every employee.
--- hint
\`e.manager?.name\` gives \`undefined\` when there is no manager, and \`??\` can fill that in.
--- check case | An employee with a manager
managerName({ name: 'Lin', manager: { name: 'Ada' } })
=> 'Ada'
--- check case | The head of the company
managerName({ name: 'Ada' })
=> 'none'
--- check source absent | No ! is left
manager!
--- check source absent | No as either
\\bas\\s+Person\\b

+++ practice | Shipping labels
--- task
An order may have shipping details, and shipping may be express:

\`\`\`ts
interface Shipping {
  city: string
  express?: boolean
}

interface Order {
  id: string
  shipping?: Shipping
}
\`\`\`

Write two functions (the starter already has the interfaces):

1. \`shippingLabel(o: Order): string\` returns \`'A1 -> Oslo'\`, with \` (express)\` added on the end when \`express\` is \`true\`: \`'A1 -> Oslo (express)'\`. An order with no shipping is picked up in person: \`'A1 -> pickup'\`.
2. \`countExpress(orders: Order[]): number\` returns how many orders ship express. Orders with no shipping, or with \`express\` missing, are not express.
--- starter
interface Shipping {
  city: string
  express?: boolean
}

interface Order {
  id: string
  shipping?: Shipping
}

--- solution
interface Shipping {
  city: string
  express?: boolean
}

interface Order {
  id: string
  shipping?: Shipping
}

function shippingLabel(o: Order): string {
  if (o.shipping === undefined) return \`\${o.id} -> pickup\`
  const mark = o.shipping.express === true ? ' (express)' : ''
  return \`\${o.id} -> \${o.shipping.city}\${mark}\`
}

function countExpress(orders: Order[]): number {
  return orders.filter((o) => o.shipping?.express === true).length
}
--- hint
In \`shippingLabel\`, handle the missing shipping first. Below that check, \`o.shipping\` is a \`Shipping\`.
--- hint
\`o.shipping?.express\` is \`true\`, \`false\` or \`undefined\`. Comparing it with \`=== true\` counts only the real express orders.
--- check case | Express shipping
shippingLabel({ id: 'A1', shipping: { city: 'Oslo', express: true } })
=> 'A1 -> Oslo (express)'
--- check case | Normal shipping
shippingLabel({ id: 'B2', shipping: { city: 'Lima' } })
=> 'B2 -> Lima'
--- check case | No shipping means pickup
shippingLabel({ id: 'C3' })
=> 'C3 -> pickup'
--- check case | Counts only express orders
countExpress([{ id: 'A1', shipping: { city: 'Oslo', express: true } }, { id: 'B2', shipping: { city: 'Lima', express: false } }, { id: 'C3' }, { id: 'D4', shipping: { city: 'Rome' } }, { id: 'E5', shipping: { city: 'Kyiv', express: true } }])
=> 2
--- check case | No orders
countExpress([])
=> 0

=== ts-07 | Unions and narrowing
--- teach
Last lesson you met \`string | undefined\`: a value that is a string, or missing. That bar \`|\` works with any types, not only \`undefined\`. This lesson uses it to describe values that can honestly be one of several kinds, and shows the checks that tell them apart.

Think of a parcel locker that takes either a letter or a box. Before you can do anything with what is inside, you look at it: a letter you open with a finger, a box you cut with scissors. You check first, then use the right tool.

### A union type

A **[[union|union-word]] type** says a value is one of several types. You join the types with \`|\`, read "or":

\`\`\`ts
let id: string | number = 42
id = 'A-7'      // fine: a string is allowed too
\`\`\`

\`string | number\` means "a string or a number". Either one is allowed in, and anything else, such as \`true\`, is refused.

### Only what every member can do

Before you know which kind you have, you may only do what *every* member of the union can do. A string has \`toUpperCase\`, but a number does not, so:

\`\`\`ts error
function shout(id: string | number): string {
  return id.toUpperCase()
}
// error TS2339: Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.
\`\`\`

The second line of the message says exactly which member is the problem.

### Narrowing with typeof

So you narrow first, as you did with \`undefined\`. \`typeof x\` gives the name of a simple value's type as text: \`'string'\`, \`'number'\`, \`'boolean'\`, \`'undefined'\`, and a few more. Compare it, and TypeScript [[follows your check|control-flow]]:

\`\`\`ts
function format(id: string | number): string {
  if (typeof id === 'number') {
    return id.toFixed(0)        // here id is a number
  }
  return id.trim()              // here id must be a string
}

console.log(format(42.7))       // 43
console.log(format('  A-7 '))   // A-7
\`\`\`

Inside the \`if\`, \`id\` is a \`number\`. Below it, the number case has already returned, so the only thing \`id\` can still be is a \`string\`, and the checker knows that too.

### Narrowing arrays with Array.isArray

\`typeof\` cannot tell an array apart from other objects: \`typeof [1, 2]\` is \`'object'\`. For arrays, use \`Array.isArray(x)\`, which is \`true\` only for an array:

\`\`\`ts
function total(x: number | number[]): number {
  if (Array.isArray(x)) {
    return x.reduce((sum, n) => sum + n, 0)   // here x is number[]
  }
  return x                                    // here x is a number
}

console.log(total([2, 3]), total(4))   // 5 4
\`\`\`

### Narrowing objects with in and instanceof

When the members of a union are different object shapes, check for a property with \`in\`. \`'email' in contact\` is \`true\` when the object has an \`email\` property:

\`\`\`ts
interface ByEmail {
  email: string
}

interface ByPhone {
  phone: string
}

function reach(c: ByEmail | ByPhone): string {
  if ('email' in c) {
    return \`mail \${c.email}\`    // here c is ByEmail
  }
  return \`call \${c.phone}\`      // here c is ByPhone
}
\`\`\`

And \`x instanceof Something\` checks what made an object. You met error types in the JavaScript course, so \`err instanceof RangeError\` is \`true\` for an error made with \`new RangeError(...)\`. [[\`instanceof\`|instanceof-classes]] narrows to that type. To sum up: \`typeof\` narrows simple values, \`Array.isArray(x)\` narrows arrays, and \`'key' in obj\` and \`instanceof\` narrow objects.

### Mixed arrays, and one more string method

An array whose items can each be either type is written with brackets around the union: \`(string | number)[]\` is "an array of strings-or-numbers", such as \`['A', 3, 'B']\`. Without the brackets, \`string | number[]\` would mean "a string, or an array of numbers".

You will also want \`replace\` here. \`text.replace(a, b)\` gives a copy of \`text\` with the first \`a\` swapped for \`b\`. So \`'1,500'.replace(',', '')\` is \`'1500'\`, which \`Number(...)\` can then read.

**Watch out:** \`typeof\` has two surprises. \`typeof [1, 2]\` is \`'object'\`, so it cannot spot arrays: use \`Array.isArray\`. And \`typeof null\` is also [[\`'object'\`|typeof-null]], so a check like \`typeof x === 'object'\` lets \`null\` through. Check \`x !== null\` as well, or the checker will remind you with \`'x' is possibly 'null'\`.

When you convert money, also remember that decimals are approximate: \`0.29 * 100\` is \`28.999999999999996\`, which is why programs [[keep money in whole cents|float-cents]] and round with \`Math.round\`.

::: context union-word Where the word union comes from
In mathematics, the union of two sets is everything that is in either one. The set of strings joined with the set of numbers holds every string and every number. TypeScript borrowed the word, and the bar \`|\` is the same symbol JavaScript uses for "or" in \`||\`. A union can have many members: \`'low' | 'normal' | 'urgent'\` from lesson 5 is a union of three literal types, and \`string | null\` from lesson 6 is a union of two.
:::

::: context control-flow Narrowing by elimination
The checker narrows on both sides of a check. In the \`if (typeof id === 'number')\` branch, \`id\` is a number. Everywhere the number case cannot reach, such as an \`else\`, or the lines after an \`if\` that returns, the number has been ruled out, so \`id\` is whatever is left: here, a string. With three members, two checks leave the third. This is why returning early keeps code flat: each \`return\` removes one case from everything below it.
:::

::: context instanceof-classes What instanceof checks
\`instanceof\` asks which **class** made an object. A class is a blueprint for making objects, and \`RangeError\`, \`TypeError\` and \`Error\` are classes built into JavaScript. \`new RangeError('too big')\` makes an object from the \`RangeError\` blueprint, so \`err instanceof RangeError\` is \`true\`, and so is \`err instanceof Error\`, because every \`RangeError\` is also an \`Error\`. You will write classes of your own in a later course; \`instanceof\` works with those too.
:::

::: context typeof-null Why typeof null is 'object'
This is a bug from the very first version of JavaScript, built in ten days in 1995. Inside that first engine, values carried a small type tag, and the tag for objects happened to be zero. \`null\` was stored as an all-zero value, so its tag read as "object". By the time anyone noticed, real websites depended on the answer, and it could never be changed. A proposal to fix it was turned down for exactly that reason.
:::

::: context float-cents Why money is counted in cents
Computers store decimals in binary, and most decimal fractions, such as 0.1 or 0.29, have no exact binary form, the way one third has no exact decimal form: 0.333… goes on forever. So \`0.29 * 100\` comes out a hair under 29. For money that is unacceptable, so payment systems store whole numbers of the smallest unit: cents, pence, yen. Stripe's API, for example, takes amounts as whole numbers of cents. Converting once, with \`Math.round\`, keeps every later sum exact.
:::
--- task
Write \`toCents(amount: number | string): number\`, which turns an amount of money into a whole number of cents:

- a number is dollars, so \`1.5\` becomes \`150\`;
- a string looks like \`'$2.25'\`, with a dollar sign in front, and becomes \`225\`.

Round to a whole number of cents with \`Math.round\`, so \`0.29\` gives \`29\`, not \`28.999999999999996\`. Narrow with \`typeof\`.
--- starter
function toCents(amount: number | string): number {
  return amount * 100
}
--- solution
function toCents(amount: number | string): number {
  if (typeof amount === 'number') {
    return Math.round(amount * 100)
  }
  return Math.round(Number(amount.replace('$', '')) * 100)
}
--- hint
Run the starter: \`amount * 100\` is an error, because \`amount\` might be a string.
--- hint
\`if (typeof amount === 'number') { … }\` handles the number. Below that block, \`amount\` is a string.
--- hint
\`'$2.25'.replace('$', '')\` is \`'2.25'\`, and \`Number(...)\` turns it into 2.25. Multiply by 100 and round.
--- check case | A number of dollars
toCents(1.5)
=> 150
--- check case | A dollar string
toCents('$2.25')
=> 225
--- check case | Rounds away float error
toCents(0.29)
=> 29
--- check source | Narrows with typeof
typeof\\s+amount

+++ practice | Number or text
--- task
Write \`asNumber(x: number | string): number\`. A number comes back unchanged. A string is turned into a number with \`Number(...)\`; spaces at its ends do not matter.

So \`asNumber(5)\` is \`5\` and \`asNumber(' 7.5 ')\` is \`7.5\`. Narrow with \`typeof\`.
--- starter
function asNumber(x: number | string): number {
  return x
}
--- solution
function asNumber(x: number | string): number {
  if (typeof x === 'string') {
    return Number(x)
  }
  return x
}
--- hint
Run the starter: \`return x\` is an error, because \`x\` might be a string and the function promises a number.
--- hint
\`if (typeof x === 'string')\` gives you the string case. \`Number(...)\` already ignores spaces at the ends.
--- check case | A number stays as it is
asNumber(5)
=> 5
--- check case | Text with spaces
asNumber(' 7.5 ')
=> 7.5
--- check case | The text '0'
asNumber('0')
=> 0
--- check source | Narrows with typeof
typeof\\s+x

+++ practice | One or many
--- task
Some settings accept either one value or a list. Write \`toList(input: string | string[]): string[]\`, which always returns an array:

- a single string comes back as an array holding just that string: \`toList('red')\` is \`['red']\`;
- an array comes back as it is: \`toList(['red', 'blue'])\` is \`['red', 'blue']\`, and \`toList([])\` is \`[]\`.

Narrow with \`Array.isArray\`.
--- starter
function toList(input: string | string[]): string[] {
  return [input]
}
--- solution
function toList(input: string | string[]): string[] {
  if (Array.isArray(input)) {
    return input
  }
  return [input]
}
--- hint
\`Array.isArray(input)\` is \`true\` for the array case. Inside that \`if\`, \`input\` is a \`string[]\`.
--- hint
Below the \`if\`, \`input\` is a string: wrap it in square brackets.
--- check case | One string
toList('red')
=> ['red']
--- check case | An array stays an array
toList(['red', 'blue'])
=> ['red', 'blue']
--- check case | An empty array stays empty
toList([])
=> []
--- check case | The empty string is still one value
toList('')
=> ['']
--- check source | Uses Array.isArray
Array\\.isArray\\(

+++ practice | Add up mixed values
--- task
A spreadsheet column holds numbers and text. Write \`sumMixed(values: (number | string)[]): number\`, which adds up:

- every number;
- every string that holds a whole number, such as \`'12'\` or \`' -3 '\`, converted with \`Number(...)\`.

Skip any other string, such as \`'n/a'\` or \`'2.5'\`. Also skip a string that is empty or only spaces: \`Number('')\` is \`0\`, which would wrongly count it as a whole number. Use \`Number.isInteger(...)\` to test the converted string.

So \`sumMixed([4, '12', 'n/a', 1.5, ' -3 '])\` is \`14.5\`.
--- starter
function sumMixed(values: (number | string)[]): number {
  let total = 0
  for (const v of values) {
    total += Number(v)
  }
  return total
}
--- solution
function sumMixed(values: (number | string)[]): number {
  let total = 0
  for (const v of values) {
    if (typeof v === 'number') {
      total += v
    } else if (v.trim() !== '' && Number.isInteger(Number(v))) {
      total += Number(v)
    }
  }
  return total
}
--- hint
Inside the loop, narrow with \`typeof v === 'number'\`: numbers are always added.
--- hint
In the string case, check two things: \`v.trim() !== ''\`, and \`Number.isInteger(Number(v))\`.
--- check case | Numbers and whole-number strings
sumMixed([4, '12', 'n/a', 1.5, ' -3 '])
=> 14.5
--- check case | Blank strings are skipped
sumMixed(['', '   ', 5])
=> 5
--- check case | A decimal string is skipped
sumMixed(['2.5', 1])
=> 1
--- check case | An empty column
sumMixed([])
=> 0
--- check type-error | Only numbers and strings are allowed
sumMixed([true])

+++ practice | Format an amount
--- task
Write \`formatAmount(amount: number | string): string\`, which returns the amount with exactly two digits after the decimal point.

- A number is formatted as it is: \`formatAmount(3)\` is \`'3.00'\` and \`formatAmount(-1.5)\` is \`'-1.50'\`.
- A string is trimmed and converted with \`Number(...)\` first: \`formatAmount(' 12.5 ')\` is \`'12.50'\`.
- A string that is not a number, such as \`'abc'\`, throws a \`RangeError\`. So does an empty or blank string, even though \`Number('')\` is \`0\`. Use \`Number.isNaN(n)\`, which is \`true\` only for \`NaN\`, to spot the non-numbers.
--- starter
function formatAmount(amount: number | string): string {
  return Number(amount).toFixed(2)
}
--- solution
function formatAmount(amount: number | string): string {
  if (typeof amount === 'number') {
    return amount.toFixed(2)
  }
  const text = amount.trim()
  const n = Number(text)
  if (text === '' || Number.isNaN(n)) {
    throw new RangeError(\`not an amount: "\${amount}"\`)
  }
  return n.toFixed(2)
}
--- hint
Handle the number case first with \`typeof\`. Below it, \`amount\` is a string.
--- hint
Trim the string, then convert it. Throw when the trimmed text is empty, or when \`Number.isNaN(n)\` is true.
--- check case | A whole number
formatAmount(3)
=> '3.00'
--- check case | A negative number
formatAmount(-1.5)
=> '-1.50'
--- check case | A string with spaces
formatAmount(' 12.5 ')
=> '12.50'
--- check test | Text that is not a number throws
throws(() => formatAmount('abc'))
--- check test | A blank string throws
throws(() => formatAmount('   '))

+++ practice | Counting items, null included
--- task
\`count\` takes a list of items, a single item, or \`null\` for "nothing", and returns how many items there are:

- \`null\` counts as \`0\`;
- a single string counts as \`1\`;
- an array counts its length.

The starter does not type-check: the compiler says \`'x' is possibly 'null'\` on the line with \`x.length\`. The check \`typeof x === 'object'\` was meant to find arrays, but it lets \`null\` through too. Fix the narrowing so the program type-checks and counts correctly.
--- starter
function count(x: string[] | string | null): number {
  if (typeof x === 'object') {
    return x.length
  }
  return 1
}
--- solution
function count(x: string[] | string | null): number {
  if (x === null) {
    return 0
  }
  if (Array.isArray(x)) {
    return x.length
  }
  return 1
}
--- hint
\`typeof null\` is \`'object'\`, which is why the checker still thinks \`x\` might be \`null\` inside the \`if\`.
--- hint
Handle \`null\` first with \`x === null\`. Then use \`Array.isArray(x)\` for the array case.
--- check case | null counts as 0
count(null)
=> 0
--- check case | One string counts as 1
count('bolt')
=> 1
--- check case | An array counts its items
count(['bolt', 'nut', 'washer'])
=> 3
--- check case | An empty array counts as 0
count([])
=> 0

+++ practice | Durations in three shapes
--- task
A timer accepts a duration in three shapes. Write \`toSeconds(input: number | string | [number, number]): number\`:

- a number is already seconds: \`toSeconds(90)\` is \`90\`;
- a string is minutes and seconds with a colon: \`toSeconds('2:05')\` is \`125\` (\`'2:05'.split(':')\` gives \`['2', '05']\`);
- a tuple is \`[minutes, seconds]\`: \`toSeconds([1, 30])\` is \`90\`.

Narrow each shape with the check that fits it.
--- starter
function toSeconds(input: number | string | [number, number]): number {
  return Number(input)
}
--- solution
function toSeconds(input: number | string | [number, number]): number {
  if (typeof input === 'number') {
    return input
  }
  if (Array.isArray(input)) {
    const [minutes, seconds] = input
    return minutes * 60 + seconds
  }
  const [minutes, seconds] = input.split(':')
  return Number(minutes) * 60 + Number(seconds)
}
--- hint
\`typeof\` handles the number. A tuple is an array, so \`Array.isArray\` handles that one.
--- hint
Whatever is left after those two checks is the string: split it on \`':'\` and convert both parts.
--- check case | A number of seconds
toSeconds(90)
=> 90
--- check case | Minutes and seconds as text
toSeconds('2:05')
=> 125
--- check case | A [minutes, seconds] tuple
toSeconds([1, 30])
=> 90
--- check case | Zero in every shape
toSeconds(0) + toSeconds('0:00') + toSeconds([0, 0])
=> 0
--- check type-error | A tuple holds two numbers
toSeconds([1, '30'])

=== ts-08 | Discriminated unions
--- teach
Last lesson you told the members of a union apart with \`typeof\`, \`Array.isArray\` and \`in\`. When the members are objects of different shapes, there is a cleaner way: give every shape a field that says which shape it is. This lesson builds that pattern, which you will use for almost every message, event and reply your programs handle.

Think of a sorting office where every parcel carries a coloured sticker: red for fragile, blue for food, green for documents. The sorter does not open anything. One look at the sticker says which shelf the parcel goes on and how to handle it.

### A shared field that names the shape

Here is a union of three message shapes from a spacecraft. Each union member is written on its own line, starting with \`|\`:

\`\`\`ts
type Message =
  | { kind: 'status'; ok: boolean }
  | { kind: 'reading'; sensor: string; value: number }
  | { kind: 'alarm'; reason: string }
\`\`\`

Every shape has a \`kind\` property, and in each shape \`kind\` is a different literal type: \`'status'\`, \`'reading'\` or \`'alarm'\`. Apart from that, the shapes have different properties. A union like this, whose members share one literal field that says which member it is, is called a **[[discriminated union|discriminant-word]]**. The shared field, \`kind\`, is the **discriminant**: the sticker.

Until you check \`kind\`, you may only use what all three shapes share, which is \`kind\` itself. \`m.value\` is an error, because a status message has no \`value\`.

### Narrowing on the discriminant

Check \`kind\`, and TypeScript narrows to the one shape with that \`kind\`:

\`\`\`ts fragment
if (m.kind === 'reading') {
  console.log(m.sensor, m.value)   // here m is the reading shape
}
\`\`\`

This works because each \`kind\` value belongs to exactly one shape. The checker reads your check the same way it read \`typeof\` last lesson.

### switch: one branch per kind

With three or more kinds, a chain of \`if\` and \`else if\` gets long. JavaScript has a statement made for this, **\`switch\`**, which compares one value against a list of cases:

\`\`\`ts fragment
switch (m.kind) {
  case 'status':
    return m.ok ? 'all good' : 'check systems'   // m is the status shape
  case 'reading':
    return \`\${m.sensor} = \${m.value}\`            // m is the reading shape
  case 'alarm':
    return \`ALARM: \${m.reason}\`                  // m is the alarm shape
}
\`\`\`

\`switch (m.kind)\` works out \`m.kind\` once. Each \`case 'status':\` is compared with it using \`===\`. The first one that matches runs, and the \`return\` inside it leaves the function. If nothing matches, the \`default:\` branch runs, when there is one. Inside each case, TypeScript has narrowed \`m\` to the matching shape.

### never: making sure no kind is forgotten

What happens next month, when someone adds a fourth kind, say \`{ kind: 'heartbeat' }\`, to \`Message\`? Every \`switch\` that handles messages should handle it too. You can make the compiler find them all.

**\`never\`** is the type that has no values at all. Inside the \`default:\` branch, every kind you handled has been ruled out. If you handled them all, nothing is left, and \`m\` has the type \`never\`. So add this line to \`default:\`:

\`\`\`ts error
type Message =
  | { kind: 'status'; ok: boolean }
  | { kind: 'reading'; sensor: string; value: number }
  | { kind: 'alarm'; reason: string }

function summary(m: Message): string {
  switch (m.kind) {
    case 'status':
      return m.ok ? 'all good' : 'check systems'
    case 'reading':
      return \`\${m.sensor} = \${m.value}\`
    default: {
      const unhandled: never = m
      return unhandled
    }
  }
}
// error TS2322: Type '{ kind: "alarm"; reason: string; }' is not assignable to type 'never'.
\`\`\`

This version forgot \`'alarm'\`, so in \`default:\` the message could still be an alarm, and an alarm cannot be put into a \`never\`. The error names the shape you forgot. Add a \`case 'alarm':\` and the error goes away. That one line **[[forces|exhaustive-why]]** you to handle every case: add a new kind to the union, and every switch that forgot it stops compiling. (The braces after \`default:\` give \`unhandled\` a block of its own, and \`return unhandled\` keeps the return type happy: the line can never run.)

This pattern is the backbone of the [[trust boundary|trust-boundary]] in LAUNCHPAD's M3 module, and of every model response you will handle.

**Watch out:** in a \`switch\`, each \`case\` needs a \`return\` or a \`break\` at its end. Without one, JavaScript [[falls through|switch-fallthrough]] into the next case and runs that code as well. Also, the discriminant must be a literal type in every member: if one shape said \`kind: string\`, the checker could no longer tell the shapes apart by it.

::: context discriminant-word Tags and discriminants
"Discriminate" here means "tell apart", as in a discriminating taste. The field that tells the shapes apart is the discriminant. Other languages and books call the same idea a **tagged union**, and the field a tag. The name does not have to be \`kind\`: you will see \`type\`, \`status\` or \`method\` in real code. This course uses \`kind\` so you always know where to look.
:::

::: context exhaustive-why Why exhaustiveness matters on a team
In a big codebase, one union may be handled in thirty places, in files written by different people years apart. Without the \`never\` line, adding a kind compiles cleanly, and the thirty switches quietly do nothing for the new kind. With it, the compiler hands you a list of exactly the places that need updating, before anything ships. Engineers call this making the compiler your to-do list. It is one of the main reasons teams choose TypeScript.
:::

::: context trust-boundary Where you will meet this
In LAUNCHPAD, M3 is the module about the JavaScript runtime and TypeScript in depth. A **trust boundary** is any place data enters your program from something you do not control, such as a web request or a language model's reply. Once that data has been checked, it is usually turned into a discriminated union, and the rest of the program switches on it. Model APIs work this way too: Anthropic's Messages API, for example, returns a list of content blocks, each with a \`type\` field such as \`'text'\` or \`'tool_use'\`, and your code handles each kind differently.
:::

::: context switch-fallthrough How fall-through works
A \`switch\` jumps to the first matching \`case\` and then keeps going, line after line, until it meets a \`return\`, a \`break\` or the end of the \`switch\`. Case labels do not stop it. So if \`case 'book':\` sets a price and has no \`break\`, the code under \`case 'pen':\` runs next and overwrites it. This is occasionally useful, for two cases that share code, but mostly it is a bug. Returning from every case, as this lesson does, avoids it.
:::
--- task
\`Event\` has three kinds. Finish \`describe\` so that every kind is handled, and keep the \`never\` line in \`default:\` so that a future kind cannot be missed:

- a \`start\` event returns \`'started <model>'\`, for example \`'started sonnet'\`;
- a \`delta\` event returns \`'+<number of characters in text> chars'\`, for example \`'+5 chars'\` for the text \`'hello'\`;
- a \`stop\` event returns \`'stopped: <reason>'\`, for example \`'stopped: end_turn'\`.
--- starter
type Event =
  | { kind: 'start'; model: string }
  | { kind: 'delta'; text: string }
  | { kind: 'stop'; reason: string }

function describe(e: Event): string {
  switch (e.kind) {
    case 'start':
      return \`started \${e.model}\`
    default: {
      const unhandled: never = e
      return unhandled
    }
  }
}
--- solution
type Event =
  | { kind: 'start'; model: string }
  | { kind: 'delta'; text: string }
  | { kind: 'stop'; reason: string }

function describe(e: Event): string {
  switch (e.kind) {
    case 'start':
      return \`started \${e.model}\`
    case 'delta':
      return \`+\${e.text.length} chars\`
    case 'stop':
      return \`stopped: \${e.reason}\`
    default: {
      const unhandled: never = e
      return unhandled
    }
  }
}
--- hint
Run it first: the error on the \`never\` line tells you which kinds are still unhandled.
--- hint
Add a \`case 'delta':\` and a \`case 'stop':\` above \`default:\`, each with its own \`return\`.
--- hint
Inside \`case 'delta':\`, \`e\` is the delta shape, so \`e.text.length\` is the number of characters.
--- check case | start
describe({ kind: 'start', model: 'sonnet' })
=> 'started sonnet'
--- check case | delta
describe({ kind: 'delta', text: 'hello' })
=> '+5 chars'
--- check case | stop
describe({ kind: 'stop', reason: 'end_turn' })
=> 'stopped: end_turn'
--- check source | Keeps the exhaustiveness check
:\\s*never\\s*=

+++ practice | Area of a shape
--- task
Here is a union of two shapes:

\`\`\`ts
type Shape =
  | { kind: 'square'; side: number }
  | { kind: 'rect'; width: number; height: number }
\`\`\`

Write \`area(s: Shape): number\` with a \`switch\` on \`s.kind\`: a square's area is its side times itself, and a rectangle's is its width times its height. Add a \`default:\` branch with the \`never\` line, so a new kind of shape cannot be forgotten.
--- starter
type Shape =
  | { kind: 'square'; side: number }
  | { kind: 'rect'; width: number; height: number }

function area(s: Shape): number {
  return s.side * s.side
}
--- solution
type Shape =
  | { kind: 'square'; side: number }
  | { kind: 'rect'; width: number; height: number }

function area(s: Shape): number {
  switch (s.kind) {
    case 'square':
      return s.side * s.side
    case 'rect':
      return s.width * s.height
    default: {
      const unhandled: never = s
      return unhandled
    }
  }
}
--- hint
Run the starter: \`s.side\` is an error, because a rectangle has no \`side\`. You need to check \`s.kind\` first.
--- hint
Inside \`case 'rect':\`, \`s\` is the rectangle shape, so \`s.width\` and \`s.height\` are numbers.
--- hint
The \`default:\` branch holds \`const unhandled: never = s\` and \`return unhandled\`, inside braces.
--- check case | A square
area({ kind: 'square', side: 4 })
=> 16
--- check case | A rectangle
area({ kind: 'rect', width: 3, height: 2.5 })
=> 7.5
--- check case | A square of side 0
area({ kind: 'square', side: 0 })
=> 0
--- check source | Uses a switch
switch\\s*\\(\\s*s\\.kind\\s*\\)
--- check source | Keeps an exhaustiveness check
:\\s*never\\s*=

+++ practice | How did they pay?
--- task
The discriminant does not have to be called \`kind\`. Here it is \`method\`:

\`\`\`ts
type Payment =
  | { method: 'card'; last4: string }
  | { method: 'cash' }
  | { method: 'transfer'; bank: string }
\`\`\`

Write \`paymentLabel(p: Payment): string\` using \`if\` checks on \`p.method\`, not a \`switch\`:

- a card gives \`'card ending 4242'\` (using \`last4\`);
- cash gives \`'cash'\`;
- a transfer gives \`'transfer from Nordbank'\` (using \`bank\`).
--- starter
type Payment =
  | { method: 'card'; last4: string }
  | { method: 'cash' }
  | { method: 'transfer'; bank: string }

function paymentLabel(p: Payment): string {
  return p.method
}
--- solution
type Payment =
  | { method: 'card'; last4: string }
  | { method: 'cash' }
  | { method: 'transfer'; bank: string }

function paymentLabel(p: Payment): string {
  if (p.method === 'card') {
    return \`card ending \${p.last4}\`
  }
  if (p.method === 'transfer') {
    return \`transfer from \${p.bank}\`
  }
  return 'cash'
}
--- hint
\`if (p.method === 'card')\` narrows \`p\` to the card shape, so \`p.last4\` is allowed inside.
--- hint
After the card and transfer checks have returned, only cash is left.
--- check case | A card
paymentLabel({ method: 'card', last4: '4242' })
=> 'card ending 4242'
--- check case | Cash
paymentLabel({ method: 'cash' })
=> 'cash'
--- check case | A transfer
paymentLabel({ method: 'transfer', bank: 'Nordbank' })
=> 'transfer from Nordbank'
--- check source absent | Uses if, not switch
\\bswitch\\b

+++ practice | A running balance
--- task
An account's history is a list of transactions:

\`\`\`ts
type Tx =
  | { kind: 'deposit'; amount: number }
  | { kind: 'withdrawal'; amount: number }
  | { kind: 'fee'; amount: number; reason: string }
\`\`\`

Write \`balance(txs: Tx[]): number\`, starting from \`0\`: a deposit adds its amount, and a withdrawal or a fee takes its amount away. An empty history gives \`0\`. Use a \`switch\` inside a loop, with the \`never\` line in \`default:\`.
--- starter
type Tx =
  | { kind: 'deposit'; amount: number }
  | { kind: 'withdrawal'; amount: number }
  | { kind: 'fee'; amount: number; reason: string }

function balance(txs: Tx[]): number {
  let total = 0
  for (const tx of txs) {
    total += tx.amount
  }
  return total
}
--- solution
type Tx =
  | { kind: 'deposit'; amount: number }
  | { kind: 'withdrawal'; amount: number }
  | { kind: 'fee'; amount: number; reason: string }

function balance(txs: Tx[]): number {
  let total = 0
  for (const tx of txs) {
    switch (tx.kind) {
      case 'deposit':
        total += tx.amount
        break
      case 'withdrawal':
      case 'fee':
        total -= tx.amount
        break
      default: {
        const unhandled: never = tx
        return unhandled
      }
    }
  }
  return total
}
--- hint
Inside the loop, \`switch (tx.kind)\` and give each case its own line of arithmetic.
--- hint
These cases do not return, so each one needs a \`break\`. Two cases that share code can be stacked: \`case 'withdrawal':\` straight above \`case 'fee':\`.
--- check case | Deposits, a withdrawal and a fee
balance([{ kind: 'deposit', amount: 100 }, { kind: 'withdrawal', amount: 30 }, { kind: 'fee', amount: 2, reason: 'card' }, { kind: 'deposit', amount: 5 }])
=> 73
--- check case | An empty history
balance([])
=> 0
--- check case | It can go below zero
balance([{ kind: 'fee', amount: 3, reason: 'monthly' }])
=> -3
--- check source | Keeps an exhaustiveness check
:\\s*never\\s*=

+++ practice | A traffic light
--- task
A traffic light is in one of three states:

\`\`\`ts
type Light =
  | { kind: 'red' }
  | { kind: 'green' }
  | { kind: 'yellow'; secondsLeft: number }
\`\`\`

Write \`next(light: Light): Light\`, which returns the state one second later:

- red becomes green;
- green becomes yellow with \`secondsLeft: 3\`;
- yellow with more than 1 second left stays yellow, with one second fewer;
- yellow with 1 second left, or less, becomes red.

Return a new object; do not change the one you were given.
--- starter
type Light =
  | { kind: 'red' }
  | { kind: 'green' }
  | { kind: 'yellow'; secondsLeft: number }

function next(light: Light): Light {
  return light
}
--- solution
type Light =
  | { kind: 'red' }
  | { kind: 'green' }
  | { kind: 'yellow'; secondsLeft: number }

function next(light: Light): Light {
  switch (light.kind) {
    case 'red':
      return { kind: 'green' }
    case 'green':
      return { kind: 'yellow', secondsLeft: 3 }
    case 'yellow':
      return light.secondsLeft > 1 ? { kind: 'yellow', secondsLeft: light.secondsLeft - 1 } : { kind: 'red' }
    default: {
      const unhandled: never = light
      return unhandled
    }
  }
}
--- hint
One \`case\` per state. Each returns a brand-new object literal, such as \`{ kind: 'green' }\`.
--- hint
In the yellow case, compare \`light.secondsLeft\` with 1 to choose between "one second fewer" and red.
--- check case | Red turns green
next({ kind: 'red' })
=> { kind: 'green' }
--- check case | Green turns yellow with 3 seconds
next({ kind: 'green' })
=> { kind: 'yellow', secondsLeft: 3 }
--- check case | Yellow counts down
next({ kind: 'yellow', secondsLeft: 3 })
=> { kind: 'yellow', secondsLeft: 2 }
--- check case | Yellow at 1 second turns red
next({ kind: 'yellow', secondsLeft: 1 })
=> { kind: 'red' }
--- check test | The light you pass in is not changed
(() => { const y = { kind: 'yellow' as const, secondsLeft: 2 }; next(y); return y.secondsLeft === 2 })()

+++ practice | Books that cost two dollars
--- task
\`priceOf\` should return \`10\` for a book, \`2\` for a pen, and \`3\` per sheet for paper. Every book comes out at \`2\` instead.

The checker cannot catch this one: the code type-checks. Find the \`switch\` mistake and fix it.
--- starter
type Item =
  | { kind: 'book'; title: string }
  | { kind: 'pen'; colour: string }
  | { kind: 'paper'; sheets: number }

function priceOf(item: Item): number {
  let price = 0
  switch (item.kind) {
    case 'book':
      price = 10
    case 'pen':
      price = 2
      break
    case 'paper':
      price = 3 * item.sheets
      break
  }
  return price
}
--- solution
type Item =
  | { kind: 'book'; title: string }
  | { kind: 'pen'; colour: string }
  | { kind: 'paper'; sheets: number }

function priceOf(item: Item): number {
  let price = 0
  switch (item.kind) {
    case 'book':
      price = 10
      break
    case 'pen':
      price = 2
      break
    case 'paper':
      price = 3 * item.sheets
      break
  }
  return price
}
--- hint
After \`price = 10\`, what stops the \`switch\` from carrying on into the next case?
--- hint
Each case that does not \`return\` needs a \`break\` at its end.
--- check case | A book costs 10
priceOf({ kind: 'book', title: 'Orbits' })
=> 10
--- check case | A pen costs 2
priceOf({ kind: 'pen', colour: 'blue' })
=> 2
--- check case | Paper costs 3 per sheet
priceOf({ kind: 'paper', sheets: 4 })
=> 12

+++ practice | Rendering a model's reply
--- task
A language model's reply is a list of content blocks:

\`\`\`ts
type Block =
  | { kind: 'text'; text: string }
  | { kind: 'tool_use'; name: string; id: string }
  | { kind: 'thinking'; thinking: string }
\`\`\`

Write \`render(blocks: Block[]): string[]\`, which returns one line per block to show the user, in order:

- a text block shows its \`text\`, trimmed; a text block that is empty after trimming shows nothing at all;
- a tool use shows \`'[tool: search]'\`, using the tool's \`name\`;
- a thinking block is private, so it shows nothing.

Use a \`switch\` with the \`never\` line in \`default:\`.
--- starter
type Block =
  | { kind: 'text'; text: string }
  | { kind: 'tool_use'; name: string; id: string }
  | { kind: 'thinking'; thinking: string }

function render(blocks: Block[]): string[] {
  return blocks.map((b) => b.kind)
}
--- solution
type Block =
  | { kind: 'text'; text: string }
  | { kind: 'tool_use'; name: string; id: string }
  | { kind: 'thinking'; thinking: string }

function render(blocks: Block[]): string[] {
  const lines: string[] = []
  for (const b of blocks) {
    switch (b.kind) {
      case 'text': {
        const text = b.text.trim()
        if (text !== '') lines.push(text)
        break
      }
      case 'tool_use':
        lines.push(\`[tool: \${b.name}]\`)
        break
      case 'thinking':
        break
      default: {
        const unhandled: never = b
        return unhandled
      }
    }
  }
  return lines
}
--- hint
Start with \`const lines: string[] = []\`, loop over the blocks, and push a line only for the kinds that show something.
--- hint
The thinking case still needs its own \`case 'thinking':\` with a \`break\`, or the \`never\` line will report it as unhandled.
--- check case | Text and a tool, thinking hidden
render([{ kind: 'thinking', thinking: 'plan' }, { kind: 'text', text: ' Checking the weather. ' }, { kind: 'tool_use', name: 'search', id: 't1' }])
=> ['Checking the weather.', '[tool: search]']
--- check case | Empty text shows nothing
render([{ kind: 'text', text: '   ' }, { kind: 'text', text: 'Done.' }])
=> ['Done.']
--- check case | No blocks
render([])
=> []
--- check source | Keeps an exhaustiveness check
:\\s*never\\s*=

=== ts-09 | Generics
--- teach
So far every function you typed worked on one kind of value: an array of numbers, a \`Satellite\`, a \`Message\`. But some functions do exactly the same job whatever the items are. Taking the first item of an array works the same for numbers, strings or satellites. This lesson shows how to write such a function once, without losing its types.

Think of a photocopier. You can feed it a letter, a map or a drawing. The machine does the same job every time, and what comes out is the same kind of thing that went in: copy a map and you get a map, not "some paper".

### The problem

Without a new idea you would have to pick. You could write one function per type, \`firstNumber(items: number[])\`, \`firstString(items: string[])\`, and so on, all with the same body. Or you could use \`any\` from lesson 3, and lose the checking: the result of \`first(['a', 'b'])\` would be \`any\`, and the checker would let you do anything with it.

### A type parameter

A **[[generic|generic-word]]** function takes a type as a parameter, as well as values. The type parameter goes in angle brackets \`<\` \`>\` after the function's name:

\`\`\`ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}

const n = first([1, 2, 3])       // n is number | undefined
const s = first(['a', 'b'])      // s is string | undefined
\`\`\`

Read \`first<T>\` as "first, for some type [[T|type-parameter-names]]". Inside the signature, \`T\` stands for whatever type the items turn out to be: \`items\` is an array of \`T\`, and the result is a \`T\`, or \`undefined\` for an empty array.

You do not have to say what \`T\` is. TypeScript fills it in from the arguments: in \`first([1, 2, 3])\` the items are numbers, so \`T\` is \`number\`, and the result keeps its real type instead of collapsing to \`any\`. So this is caught:

\`\`\`ts error
function first<T>(items: T[]): T | undefined {
  return items[0]
}

const n: number = first(['a', 'b'])
// error TS2322: Type 'string | undefined' is not assignable to type 'number'.
\`\`\`

When you need to, you can fill \`T\` in yourself: \`first<string>([])\` says "the items would be strings".

### More than one type parameter

A function can take several type parameters, separated by commas. Here each one is filled in from its own argument:

\`\`\`ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b]
}

const p = pair('T1', 21.5)      // p is [string, number]
\`\`\`

### Generic types you have already used

Arrays themselves are generic. \`number[]\` is shorthand for \`Array<number>\`: "an \`Array\` of \`number\`". And in the JavaScript course you used promises: a promise of a string has the type [[\`Promise<string>\`|promise-generic]].

Another generic type you will use all the time is **\`Record\`**. \`Record<string, number>\` is an object whose keys are strings and whose values are numbers, which is the type of a counts object such as \`{ a: 2, l: 1 }\`:

\`\`\`ts
const stock: Record<string, number> = { bolt: 40, nut: 15 }
stock['washer'] = 8       // fine: any string key, number value
console.log(stock.bolt)   // 40
\`\`\`

Reading a key that is not there gives \`undefined\` when the program runs, even though the type says \`number\`. That is why a counter starts a missing count with [[\`?? 0\`|record-type]].

### A function as a parameter

A parameter can be a function, and its type says what the function takes and returns. \`key: (item: T) => string\` means "\`key\` is a function that takes one \`T\` and returns a string". Here a generic function uses one:

\`\`\`ts
function labelAll<T>(items: T[], label: (item: T) => string): string[] {
  const out: string[] = []
  for (const item of items) out.push(\`- \${label(item)}\`)
  return out
}

console.log(labelAll([3, 14], (n) => \`\${n} kg\`))   // [ '- 3 kg', '- 14 kg' ]
\`\`\`

When you call it, \`T\` becomes \`number\` from the array, so the checker knows that \`n\` in the arrow function is a number, without an annotation. That is how \`map\` and \`filter\` already [[work|callback-types]].

**Watch out:** inside a generic function, the checker knows nothing about \`T\`. It could be a number, an object, anything. So \`item.length\` on an item of type \`T\` is an error, \`TS2339: Property 'length' does not exist on type 'T'\`. A generic function can only move \`T\` values around, store them, and hand them to functions that take a \`T\`. And the \`<T>\` must be declared after the name: without it you get \`TS2304: Cannot find name 'T'\`.

::: context generic-word What "generic" means
Generic means "not specific to one kind", as in a generic brand of cereal. A generic function is written once, for any type, and becomes specific each time it is called. The idea came into mainstream languages through ML in the 1970s, then Ada and C++ templates, and arrived in Java and C# in 2004 and 2005. TypeScript has had generics since its first release in 2012.
:::

::: context type-parameter-names Why T?
\`T\` is short for "type", and it is only a convention: any name works. When there are two, people often use \`T\` and \`U\`, or \`K\` and \`V\` for keys and values, or \`A\` and \`B\`, as in the \`pair\` example. In bigger code, longer names such as \`Item\` or \`Row\` can be clearer. Whatever the name, it means the same thing: a type that will be filled in when the function is called.
:::

::: context promise-generic Promise is generic too
An \`async\` function always returns a promise. If it returns a string, its return type is \`Promise<string>\`, and \`await\` unwraps it, so \`const name = await loadName()\` gives you a plain \`string\`. \`Promise.all\` on an array of \`Promise<number>\` gives a \`Promise<number[]>\`. The generic type keeps track of what the promise will deliver, so the checker can check what you do with it once it arrives.
:::

::: context record-type A Record with any string key
\`Record<string, number>\` says "every string key holds a number". But a real object only has the keys you put in it. \`stock['screw']\` is \`undefined\` when the program runs, while the checker believes it is a \`number\`. That is the same trust as array indexes in lesson 4. Code that counts things therefore writes \`(counts[k] ?? 0) + 1\`, which works whether the key is there yet or not. In lesson 11 you will see \`Record\` with a fixed set of keys, which is checked much more tightly.
:::

::: context callback-types How map is typed
\`map\` and \`filter\` are generic functions in TypeScript's own type definitions. For an array of \`T\`, \`map\` is declared roughly as \`map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[]\`. Read it with what you know now: it takes a function from a \`T\` to some \`U\`, and returns an array of \`U\`. That is why \`[1, 2].map((n) => n * 2)\` is known to be \`number[]\`, and \`n\` needs no annotation. A function passed in like this is often called a **callback**.
:::
--- task
Write two generic functions:

- \`lastN<T>(items: T[], n: number): T[]\` returns the last \`n\` items, in order. If there are fewer than \`n\` items, it returns all of them. If \`n\` is 0 or less, it returns an empty array.
- \`groupCount<T>(items: T[], key: (item: T) => string): Record<string, number>\` calls \`key\` on every item and counts how many items get each key. For example, counting \`['ada', 'lin', 'al']\` by first letter gives \`{ a: 2, l: 1 }\`.
--- starter
function lastN(items, n) {
}

function groupCount(items, key) {
}
--- solution
function lastN<T>(items: T[], n: number): T[] {
  return n <= 0 ? [] : items.slice(-n)
}

function groupCount<T>(items: T[], key: (item: T) => string): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const item of items) {
    const k = key(item)
    counts[k] = (counts[k] ?? 0) + 1
  }
  return counts
}
--- hint
Both functions start with \`<T>\` after their name, and both take \`items: T[]\`.
--- hint
\`items.slice(-n)\` gives the last \`n\` items, but check \`n <= 0\` first, because \`slice(-0)\` is the whole array.
--- hint
For \`groupCount\`, start with \`const counts: Record<string, number> = {}\` and add 1 to \`counts[k]\`, starting from \`?? 0\`.
--- check source | lastN is generic
lastN\\s*<\\s*T\\s*>
--- check source | groupCount is generic
groupCount\\s*<\\s*T\\s*>
--- check case | lastN(…, 2)
lastN([1, 2, 3, 4], 2)
=> [3, 4]
--- check case | lastN with fewer items than n
lastN(['a'], 5)
=> ["a"]
--- check case | groupCount counts by key
groupCount(['ada', 'lin', 'al'], (s) => s[0])
=> {"a": 2, "l": 1}

+++ practice | The last item
--- task
Write a generic function \`last<T>(items: T[]): T | undefined\`, which returns the last item of the array, or \`undefined\` when the array is empty.

The result must keep its real type: \`last(['a', 'b'])\` is a \`string | undefined\`, not \`any\`.
--- starter
function last(items) {
  return items[items.length - 1]
}
--- solution
function last<T>(items: T[]): T | undefined {
  return items[items.length - 1]
}
--- hint
Put \`<T>\` after the name, then use \`T\` in both the parameter type and the return type.
--- hint
For an empty array, \`items[-1]\` is already \`undefined\`, so the body needs no special case.
--- check case | The last number
last([4, 8, 15])
=> 15
--- check case | The last string
last(['ada', 'lin'])
=> 'lin'
--- check case | An empty array gives undefined
last([])
=> undefined
--- check type-error | A string result is not a number
const n: number = last(['a', 'b'])
--- check source | last is generic
last\\s*<\\s*T\\s*>

+++ practice | Repeat a value
--- task
Write \`repeat<T>(value: T, times: number): T[]\`, which returns an array holding \`value\` exactly \`times\` times.

- \`repeat('ab', 3)\` is \`['ab', 'ab', 'ab']\`.
- \`repeat(0, 2)\` is \`[0, 0]\`.
- If \`times\` is 0 or less, the result is \`[]\`.
--- starter
function repeat(value, times) {
  return [value]
}
--- solution
function repeat<T>(value: T, times: number): T[] {
  const out: T[] = []
  for (let i = 0; i < times; i++) {
    out.push(value)
  }
  return out
}
--- hint
Start with an empty array of \`T\`: \`const out: T[] = []\`.
--- hint
A counting loop that runs while \`i < times\` pushes the value the right number of times, and does not run at all when \`times\` is 0 or less.
--- check case | Three strings
repeat('ab', 3)
=> ['ab', 'ab', 'ab']
--- check case | Zero is a value too
repeat(0, 2)
=> [0, 0]
--- check case | No times
repeat('x', 0)
=> []
--- check case | Negative times
repeat(true, -2)
=> []
--- check type-error | The items keep the value's type
const xs: number[] = repeat('a', 2)

+++ practice | Count the matches
--- task
Write \`countWhere<T>(items: T[], test: (item: T) => boolean): number\`, which returns how many items make \`test\` return \`true\`.

It must work for any kind of item. For example, with the interface below, \`countWhere(users, (u) => u.plan === 'pro')\` counts the pro users, and \`countWhere([3, 8, 12], (n) => n > 5)\` is \`2\`.

\`\`\`ts
interface User {
  name: string
  plan: 'free' | 'pro'
}
\`\`\`

Put the \`User\` interface in your program as well.
--- starter
interface User {
  name: string
  plan: 'free' | 'pro'
}

function countWhere(items, test) {
}
--- solution
interface User {
  name: string
  plan: 'free' | 'pro'
}

function countWhere<T>(items: T[], test: (item: T) => boolean): number {
  return items.filter(test).length
}
--- hint
The second parameter is a function from a \`T\` to a \`boolean\`: \`test: (item: T) => boolean\`.
--- hint
\`filter\` takes exactly that kind of function, so \`items.filter(test)\` keeps the matches.
--- check case | Numbers over 5
countWhere([3, 8, 12], (n) => n > 5)
=> 2
--- check case | Pro users
countWhere([{ name: 'ada', plan: 'pro' }, { name: 'lin', plan: 'free' }, { name: 'sam', plan: 'pro' }], (u) => u.plan === 'pro')
=> 2
--- check case | Nothing to count
countWhere([], (x) => true)
=> 0
--- check type-error | The test gets a User, which has no age
const users: User[] = []; countWhere(users, (u) => u.age > 18)
--- check source | countWhere is generic
countWhere\\s*<\\s*T\\s*>

+++ practice | Cut into chunks
--- task
Write \`chunk<T>(items: T[], size: number): T[][]\`, which cuts an array into pieces of \`size\` items each, in order. (\`T[][]\` is "an array of arrays of \`T\`".)

- \`chunk([1, 2, 3, 4, 5], 2)\` is \`[[1, 2], [3, 4], [5]]\`: the last piece may be shorter.
- An empty array gives \`[]\`.
- If \`size\` is 0 or less, throw a \`RangeError\`, because the cutting would never end.

Use \`slice\`.
--- starter
function chunk<T>(items: T[], size: number): T[][] {
  return [items]
}
--- solution
function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) throw new RangeError('size must be at least 1')
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size))
  }
  return out
}
--- hint
Throw first when \`size\` is 0 or less.
--- hint
Step a counting loop forward by \`size\` each time: \`i += size\`. Each step, \`items.slice(i, i + size)\` is one piece, shorter at the end if needed.
--- check case | The last piece is shorter
chunk([1, 2, 3, 4, 5], 2)
=> [[1, 2], [3, 4], [5]]
--- check case | An exact fit
chunk(['a', 'b', 'c', 'd'], 2)
=> [['a', 'b'], ['c', 'd']]
--- check case | An empty array
chunk([], 3)
=> []
--- check case | A size bigger than the array
chunk([7, 8], 5)
=> [[7, 8]]
--- check test | A size of 0 throws
throws(() => chunk([1], 0))

+++ practice | The fallback that ate zero
--- task
\`firstOr\` should return the first item of an array, or \`fallback\` when the array is empty. It works for most arrays, but \`firstOr([0, 5], 9)\` gives \`9\` instead of \`0\`, and \`firstOr([''], 'none')\` gives \`'none'\` instead of \`''\`.

The checker cannot catch this one. Find the mistake and fix it, keeping the signature.
--- starter
function firstOr<T>(items: T[], fallback: T): T {
  return items[0] || fallback
}
--- solution
function firstOr<T>(items: T[], fallback: T): T {
  return items.length > 0 ? items[0] : fallback
}
--- hint
\`||\` falls back whenever the left side is falsy, and \`0\` and \`''\` are falsy.
--- hint
The real question is "is the array empty?", so ask that: compare \`items.length\` with 0.
--- check case | 0 is a real first item
firstOr([0, 5], 9)
=> 0
--- check case | The empty string is a real first item
firstOr([''], 'none')
=> ''
--- check case | An empty array gives the fallback
firstOr([], 9)
=> 9
--- check case | A normal array
firstOr(['ada', 'lin'], 'nobody')
=> 'ada'

+++ practice | The best by a score
--- task
Write \`maxBy<T>(items: T[], score: (item: T) => number): T | undefined\`. It returns the item with the highest score, where \`score\` works out each item's score.

- If two items tie for the highest score, return the first of them.
- Scores can be negative.
- An empty array gives \`undefined\`.

So \`maxBy(['kestrel', 'osprey', 'ibis'], (w) => w.length)\` is \`'kestrel'\`, and \`maxBy([{ id: 1, temp: -4 }, { id: 2, temp: -1 }], (r) => r.temp)\` is \`{ id: 2, temp: -1 }\`.
--- starter
function maxBy<T>(items: T[], score: (item: T) => number): T | undefined {
  let best = items[0]
  let bestScore = 0
  for (const item of items) {
    if (score(item) > bestScore) {
      best = item
      bestScore = score(item)
    }
  }
  return best
}
--- solution
function maxBy<T>(items: T[], score: (item: T) => number): T | undefined {
  let best: T | undefined = undefined
  let bestScore = -Infinity
  for (const item of items) {
    const s = score(item)
    if (best === undefined || s > bestScore) {
      best = item
      bestScore = s
    }
  }
  return best
}
--- hint
Starting the best score at \`0\` breaks when every score is negative. Start with "nothing yet" instead.
--- hint
Keep \`best\` as \`T | undefined\`, starting at \`undefined\`, and take the first item whatever its score.
--- hint
Use \`>\` rather than \`>=\` when comparing, so that a tie keeps the item you found first.
--- check case | The longest word, first on a tie
maxBy(['kestrel', 'osprey', 'ibis', 'penguin'], (w) => w.length)
=> 'kestrel'
--- check case | Negative scores
maxBy([{ id: 1, temp: -4 }, { id: 2, temp: -1 }], (r) => r.temp)
=> { id: 2, temp: -1 }
--- check case | An empty array gives undefined
maxBy([], (x) => 1)
=> undefined
--- check case | One item
maxBy([42], (n) => n)
=> 42

=== ts-10 | unknown and type guards
--- teach
Data from outside your program — JSON from a model, a request body — has no type the compiler can trust. Give it the type **\`unknown\`**: TypeScript will not let you use an \`unknown\` value until you have checked what it is.

A **type guard** is a function that does the checking and tells the compiler about it with \`x is T\`:

\`\`\`ts
interface User { name: string; credits: number }

function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' && x !== null &&
    typeof (x as Record<string, unknown>).name === 'string' &&
    typeof (x as Record<string, unknown>).credits === 'number'
  )
}
\`\`\`

This is "parse, don't assert": \`JSON.parse(text) as User\` compiles and lies; a guard checks. The one \`as\` inside the guard is different from the ones lesson 6 ruled out: \`x as Record<string, unknown>\` claims only "an object with some properties", and every property is still \`unknown\` until its own \`typeof\` check proves what it is. (In a real project a library such as Zod writes these for you — M3.)
--- task
Write \`isPoint(x: unknown): x is Point\` for \`interface Point { x: number; y: number }\`, then \`parsePoint(text: string): Point | null\` that parses JSON and returns the point only if it really is one.
--- starter
interface Point {
  x: number
  y: number
}

function parsePoint(text: string): Point | null {
  return JSON.parse(text) as Point
}
--- solution
interface Point {
  x: number
  y: number
}

function isPoint(x: unknown): x is Point {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return typeof o.x === 'number' && typeof o.y === 'number'
}

function parsePoint(text: string): Point | null {
  const value: unknown = JSON.parse(text)
  return isPoint(value) ? value : null
}
--- hint
Check \`typeof x === 'object' && x !== null\` first, then each property's type.
--- hint
\`const value: unknown = JSON.parse(text)\` — then \`isPoint(value) ? value : null\`.
--- check case | A real point passes
parsePoint('{"x": 1, "y": 2}')
=> {"x": 1, "y": 2}
--- check case | Wrong types are rejected
parsePoint('{"x": "1", "y": 2}')
=> null
--- check case | Missing fields are rejected
parsePoint('{"x": 1}')
=> null
--- check case | null is rejected
parsePoint('null')
=> null
--- check source | Has a type guard
x\\s+is\\s+Point
--- check source absent | Does not cast the parsed JSON
JSON\\.parse\\([^)]*\\)\\s+as\\s


+++ practice | Is it an API error?
--- task
An API sends back errors as JSON objects shaped like this:

\`\`\`ts
interface ApiError {
  code: number
  message: string
}
\`\`\`

Write the type guard \`isApiError(x: unknown): x is ApiError\`. It returns \`true\` only when \`x\` is an object (not \`null\`) whose \`code\` is a number and whose \`message\` is a string. Extra properties are fine.
--- starter
interface ApiError {
  code: number
  message: string
}

function isApiError(x: unknown): boolean {
  return x !== null
}
--- solution
interface ApiError {
  code: number
  message: string
}

function isApiError(x: unknown): x is ApiError {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return typeof o.code === 'number' && typeof o.message === 'string'
}
--- hint
Rule out everything that is not an object first, and remember that \`typeof null\` is \`'object'\` too.
--- hint
Then look at each property through \`x as Record<string, unknown>\` and check its \`typeof\`.
--- check case | A real API error
isApiError({ code: 404, message: 'not found' })
=> true
--- check case | Extra properties are fine
isApiError({ code: 500, message: 'oops', retry: true })
=> true
--- check case | code must be a number
isApiError({ code: '404', message: 'not found' })
=> false
--- check case | null and plain text are not errors
isApiError(null) || isApiError('not found')
=> false
--- check source | Is a type guard
x\\s+is\\s+ApiError

+++ practice | Describe any value
--- task
A logger receives values it knows nothing about. Write \`describeValue(x: unknown): string\`, which returns:

- \`'text (5 chars)'\` for a string, with its length;
- \`'number 42'\` for a number;
- \`'boolean true'\` for a boolean;
- \`'nothing'\` for \`null\` or \`undefined\`;
- \`'list of 3'\` for an array, with its length;
- \`'object'\` for any other object.
--- starter
function describeValue(x: unknown): string {
  return \`\${typeof x}\`
}
--- solution
function describeValue(x: unknown): string {
  if (typeof x === 'string') return \`text (\${x.length} chars)\`
  if (typeof x === 'number') return \`number \${x}\`
  if (typeof x === 'boolean') return \`boolean \${x}\`
  if (x === null || x === undefined) return 'nothing'
  if (Array.isArray(x)) return \`list of \${x.length}\`
  return 'object'
}
--- hint
Each \`typeof\` check narrows the \`unknown\` to one simple type, so \`x.length\` is allowed after the string check.
--- hint
Check \`null\` and \`undefined\` before arrays and objects, and check arrays with \`Array.isArray\` before the plain-object case.
--- check case | A string
describeValue('hello')
=> 'text (5 chars)'
--- check case | A number and a boolean
describeValue(42) + ' / ' + describeValue(false)
=> 'number 42 / boolean false'
--- check case | null and undefined
describeValue(null) + ' / ' + describeValue(undefined)
=> 'nothing / nothing'
--- check case | An array
describeValue([1, 'a', null])
=> 'list of 3'
--- check case | An object, empty or not
describeValue({}) + ' / ' + describeValue({ a: 1 })
=> 'object / object'

+++ practice | Keep the valid users
--- task
A batch import sends an array of records that may be anything. Keep the ones that are real users:

\`\`\`ts
interface User {
  id: number
  email: string
  plan: 'free' | 'pro'
}
\`\`\`

1. Write \`isUser(x: unknown): x is User\`: an object (not \`null\`) with a number \`id\`, a string \`email\`, and a \`plan\` that is exactly \`'free'\` or \`'pro'\`.
2. Write \`validUsers(items: unknown[]): User[]\`, which returns the real users in their original order. \`items.filter(isUser)\` works: \`filter\` with a type guard gives back a \`User[]\`.
--- starter
interface User {
  id: number
  email: string
  plan: 'free' | 'pro'
}

function validUsers(items: unknown[]): User[] {
  return items as User[]
}
--- solution
interface User {
  id: number
  email: string
  plan: 'free' | 'pro'
}

function isUser(x: unknown): x is User {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return typeof o.id === 'number' && typeof o.email === 'string' && (o.plan === 'free' || o.plan === 'pro')
}

function validUsers(items: unknown[]): User[] {
  return items.filter(isUser)
}
--- hint
For the plan, \`typeof\` is not enough: compare it with both allowed strings.
--- hint
Pass the guard itself to \`filter\`: \`items.filter(isUser)\`. No \`as\` is needed.
--- check case | Keeps only the real users, in order
validUsers([{ id: 1, email: 'ada@example.com', plan: 'pro' }, { id: '2', email: 'lin@example.com', plan: 'free' }, null, { id: 3, email: 'sam@example.com', plan: 'gold' }, { id: 4, email: 'kai@example.com', plan: 'free' }]).map((u) => u.id)
=> [1, 4]
--- check case | Nothing valid
validUsers([42, 'ada', [], {}])
=> []
--- check case | isUser rejects a missing email
isUser({ id: 1, plan: 'pro' })
=> false
--- check source absent | No cast to User
as\\s+User
--- check source | isUser is a type guard
x\\s+is\\s+User

+++ practice | A count from JSON
--- task
A client sends a count as a JSON text, such as \`'12'\`. Write \`parseCount(text: string): number | null\`:

- if the text is a JSON whole number that is 0 or more, return it;
- otherwise return \`null\`: a negative number, a decimal, a string such as \`'"3"'\`, \`'null'\`, an array, and text that is not JSON at all, such as \`'oops'\`.

\`JSON.parse\` throws a \`SyntaxError\` on text that is not JSON, so catch it. Store what it returns as \`unknown\`.
--- starter
function parseCount(text: string): number | null {
  return JSON.parse(text)
}
--- solution
function parseCount(text: string): number | null {
  let value: unknown
  try {
    value = JSON.parse(text)
  } catch {
    return null
  }
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) return null
  return value
}
--- hint
Wrap only the \`JSON.parse\` call in \`try\` / \`catch\`, and return \`null\` from the \`catch\`.
--- hint
Then narrow the \`unknown\`: it must be a number, a whole number (\`Number.isInteger\`) and not below 0.
--- check case | A whole number
parseCount('12')
=> 12
--- check case | Zero counts
parseCount('0')
=> 0
--- check case | Negative and decimal numbers are rejected
[parseCount('-1'), parseCount('2.5')]
=> [null, null]
--- check case | A number in quotes is a string, not a number
parseCount('"3"')
=> null
--- check case | null and an array are rejected
[parseCount('null'), parseCount('[4]')]
=> [null, null]
--- check case | Text that is not JSON
parseCount('oops')
=> null

+++ practice | The port that was a string
--- task
\`portOf\` reads a service's config from JSON and should return its port as a number, or \`80\` when the config has no usable port.

It compiles, but it lies. With the text \`'{"port": "8080"}'\` it returns the string \`'8080'\`, although the signature promises a number. With \`'{}'\` it returns \`undefined\`. The \`as Config\` told the checker to trust the JSON.

Rewrite it without \`as Config\`: store the parsed JSON as \`unknown\`, then return the port only when it really is a number; return \`80\` for anything else, including a body that is not an object.
--- starter
interface Config {
  port: number
}

function portOf(text: string): number {
  const config = JSON.parse(text) as Config
  return config.port
}
--- solution
interface Config {
  port: number
}

function portOf(text: string): number {
  const config: unknown = JSON.parse(text)
  if (typeof config !== 'object' || config === null) return 80
  const port = (config as Record<string, unknown>).port
  return typeof port === 'number' ? port : 80
}
--- hint
\`as Config\` checks nothing when the program runs. Start with \`const config: unknown = JSON.parse(text)\`.
--- hint
Rule out non-objects, read \`port\` through \`as Record<string, unknown>\`, and check its \`typeof\`.
--- check case | A real port
portOf('{"port": 8080}')
=> 8080
--- check case | A port in quotes is not a number
portOf('{"port": "8080"}')
=> 80
--- check case | No port at all
portOf('{}')
=> 80
--- check case | Not an object
portOf('null')
=> 80
--- check source absent | No more as Config
as\\s+Config

+++ practice | Checking a model's tool call
--- task
A language model asks to call a weather tool by sending JSON text. Before running the tool, check the request:

\`\`\`ts
interface ToolCall {
  name: 'get_weather'
  args: { city: string; days: number }
}
\`\`\`

Write \`parseToolCall(text: string): ToolCall | null\`. Return the parsed object only if all of this holds, and \`null\` otherwise:

- the text is valid JSON (catch the \`SyntaxError\`);
- it is an object whose \`name\` is exactly \`'get_weather'\`;
- its \`args\` is an object (not \`null\`) with a \`city\` that is a string and not blank after trimming, and \`days\`, a whole number from 1 to 14.

Use \`unknown\` and narrowing; do not cast to \`ToolCall\`.
--- starter
interface ToolCall {
  name: 'get_weather'
  args: { city: string; days: number }
}

function parseToolCall(text: string): ToolCall | null {
  return JSON.parse(text)
}
--- solution
interface ToolCall {
  name: 'get_weather'
  args: { city: string; days: number }
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null
}

function isToolCall(x: unknown): x is ToolCall {
  if (!isRecord(x) || x.name !== 'get_weather' || !isRecord(x.args)) return false
  const { city, days } = x.args
  return typeof city === 'string' && city.trim() !== '' && typeof days === 'number' && Number.isInteger(days) && days >= 1 && days <= 14
}

function parseToolCall(text: string): ToolCall | null {
  let value: unknown
  try {
    value = JSON.parse(text)
  } catch {
    return null
  }
  return isToolCall(value) ? value : null
}
--- hint
Split the work: one guard for "is a non-null object", one for the whole tool call, and \`parseToolCall\` to catch bad JSON.
--- hint
Check \`args\` the same way as the outer object before reading \`city\` and \`days\` from it.
--- hint
\`days\` needs three checks: it is a number, \`Number.isInteger(days)\`, and it is between 1 and 14.
--- check case | A valid call
parseToolCall('{"name": "get_weather", "args": {"city": "Oslo", "days": 3}}')
=> { name: 'get_weather', args: { city: 'Oslo', days: 3 } }
--- check case | Another tool name
parseToolCall('{"name": "send_email", "args": {"city": "Oslo", "days": 3}}')
=> null
--- check case | days out of range or not whole
[parseToolCall('{"name": "get_weather", "args": {"city": "Oslo", "days": 15}}'), parseToolCall('{"name": "get_weather", "args": {"city": "Oslo", "days": 1.5}}')]
=> [null, null]
--- check case | A blank city
parseToolCall('{"name": "get_weather", "args": {"city": "  ", "days": 2}}')
=> null
--- check case | args is null, or missing
[parseToolCall('{"name": "get_weather", "args": null}'), parseToolCall('{"name": "get_weather"}')]
=> [null, null]
--- check case | Not JSON at all
parseToolCall('get_weather(Oslo)')
=> null
--- check source absent | No cast to ToolCall
as\\s+ToolCall

=== ts-11 | Utility types
--- teach
TypeScript can build new types from existing ones. The ones you will use every week:

\`\`\`ts
interface Settings { theme: string; fontSize: number; beta: boolean }

Partial<Settings>                // every property optional
Readonly<Settings>               // no property can be reassigned
Pick<Settings, 'theme'>          // only the listed properties
Omit<Settings, 'beta'>           // everything except those
Record<'free' | 'pro', number>   // an object with exactly these keys
\`\`\`

\`Partial\` is what an "update" takes: a patch with any subset of fields.
--- task
Write \`applyPatch(current: Settings, patch: Partial<Settings>): Settings\` that returns a **new** settings object with the patch applied (the original unchanged). Then declare \`const LIMITS: Record<'free' | 'pro', number>\` with free \`100\` and pro \`1000\`.
--- starter
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}

--- solution
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}

function applyPatch(current: Settings, patch: Partial<Settings>): Settings {
  return { ...current, ...patch }
}

const LIMITS: Record<'free' | 'pro', number> = { free: 100, pro: 1000 }
--- hint
Object spread: \`{ ...current, ...patch }\` — later properties win.
--- check source | The patch is a Partial<Settings>
patch\\s*:\\s*Partial\\s*<\\s*Settings\\s*>
--- check case | Applies the patch
applyPatch({ theme: 'dark', fontSize: 13, beta: false }, { fontSize: 15 }).fontSize
=> 15
--- check test | Keeps the rest, leaves the original alone
(() => { const s = { theme: 'dark', fontSize: 13, beta: false }; const t = applyPatch(s, { beta: true }); return t.theme === 'dark' && t.beta && s.beta === false && t !== s })()
--- check test | LIMITS has both plans
LIMITS.free === 100 && LIMITS.pro === 1000
--- check source | LIMITS is a Record over the two plans
LIMITS\\s*:\\s*Record\\s*<

+++ practice | A user summary for a list endpoint
--- task
A list endpoint returns only part of each user. Given this interface:

\`\`\`ts
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}
\`\`\`

1. Declare \`type UserSummary = Pick<User, 'id' | 'name'>\`.
2. Write \`toSummary(u: User): UserSummary\`, which returns a new object with only \`id\` and \`name\`, and nothing else.
--- starter
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

function toSummary(u: User) {
  return u
}
--- solution
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

type UserSummary = Pick<User, 'id' | 'name'>

function toSummary(u: User): UserSummary {
  return { id: u.id, name: u.name }
}
--- hint
\`Pick<User, 'id' | 'name'>\` keeps only the properties you list, joined with \`|\`.
--- hint
Returning \`u\` itself would also send \`email\` and \`createdAt\`: build a new object with just the two properties.
--- check case | Only id and name
toSummary({ id: 7, name: 'Ada', email: 'ada@example.com', createdAt: '2026-01-05' })
=> { id: 7, name: 'Ada' }
--- check type-error | A summary needs a name
const s: UserSummary = { id: 1 }
--- check type-error | A summary has no email
const s: UserSummary = toSummary({ id: 1, name: 'a', email: 'b', createdAt: 'c' }); s.email
--- check source | UserSummary is built with Pick
UserSummary\\s*=\\s*Pick\\s*<

+++ practice | Never send the password hash
--- task
\`\`\`ts
interface Account {
  id: number
  email: string
  passwordHash: string
}
\`\`\`

1. Declare \`type PublicAccount = Omit<Account, 'passwordHash'>\`.
2. Write \`toPublic(a: Account): PublicAccount\`, which returns a new object with every property except \`passwordHash\`. The original account must keep its hash.
--- starter
interface Account {
  id: number
  email: string
  passwordHash: string
}

function toPublic(a: Account) {
  return { ...a }
}
--- solution
interface Account {
  id: number
  email: string
  passwordHash: string
}

type PublicAccount = Omit<Account, 'passwordHash'>

function toPublic(a: Account): PublicAccount {
  return { id: a.id, email: a.email }
}
--- hint
\`Omit<Account, 'passwordHash'>\` is everything except the listed property.
--- hint
The type alone does not remove anything when the program runs: build the new object without the hash.
--- check case | The hash is gone
toPublic({ id: 1, email: 'ada@example.com', passwordHash: 'x9f2' })
=> { id: 1, email: 'ada@example.com' }
--- check test | The original keeps its hash
(() => { const a = { id: 2, email: 'lin@example.com', passwordHash: 'h' }; toPublic(a); return a.passwordHash === 'h' })()
--- check type-error | A PublicAccount has no passwordHash
const p: PublicAccount = toPublic({ id: 1, email: 'e', passwordHash: 'h' }); p.passwordHash
--- check source | PublicAccount is built with Omit
PublicAccount\\s*=\\s*Omit\\s*<

+++ practice | Revenue by plan
--- task
\`\`\`ts
type Plan = 'free' | 'pro' | 'team'
\`\`\`

1. Declare \`const PRICES: Record<Plan, number>\` with \`free\` at \`0\`, \`pro\` at \`20\` and \`team\` at \`45\` (dollars a month).
2. Write \`monthlyRevenue(plans: Plan[]): number\`, which adds up the monthly price of every subscription in the list. An empty list earns \`0\`.
--- starter
type Plan = 'free' | 'pro' | 'team'

function monthlyRevenue(plans: Plan[]): number {
  return 0
}
--- solution
type Plan = 'free' | 'pro' | 'team'

const PRICES: Record<Plan, number> = { free: 0, pro: 20, team: 45 }

function monthlyRevenue(plans: Plan[]): number {
  return plans.reduce((sum, plan) => sum + PRICES[plan], 0)
}
--- hint
With literal keys, \`Record<Plan, number>\` needs exactly the three keys \`free\`, \`pro\` and \`team\`.
--- hint
\`PRICES[plan]\` looks up one price; \`reduce\` adds them up from 0.
--- check case | A mix of plans
monthlyRevenue(['pro', 'free', 'team', 'pro'])
=> 85
--- check case | No subscriptions
monthlyRevenue([])
=> 0
--- check test | PRICES has every plan
PRICES.free === 0 && PRICES.pro === 20 && PRICES.team === 45
--- check type-error | 'gold' is not a plan
monthlyRevenue(['gold'])
--- check source | PRICES is a Record over Plan
PRICES\\s*:\\s*Record\\s*<\\s*Plan\\s*,\\s*number\\s*>

+++ practice | Apply every patch
--- task
\`\`\`ts
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}
\`\`\`

Write \`mergeAll(base: Settings, patches: Partial<Settings>[]): Settings\`, which applies the patches in order and returns a **new** settings object:

- a later patch wins over an earlier one;
- an empty list of patches gives a copy of \`base\`, not \`base\` itself;
- \`base\` itself never changes.
--- starter
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}

function mergeAll(base: Settings, patches: Partial<Settings>[]): Settings {
  for (const patch of patches) {
    Object.assign(base, patch)
  }
  return base
}
--- solution
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}

function mergeAll(base: Settings, patches: Partial<Settings>[]): Settings {
  let result: Settings = { ...base }
  for (const patch of patches) {
    result = { ...result, ...patch }
  }
  return result
}
--- hint
Start from a copy, \`{ ...base }\`, so \`base\` is never touched.
--- hint
For each patch, spread the result so far first and the patch second: later properties win.
--- check case | Later patches win
mergeAll({ theme: 'dark', fontSize: 13, beta: false }, [{ fontSize: 15 }, { beta: true }, { fontSize: 16 }])
=> { theme: 'dark', fontSize: 16, beta: true }
--- check test | No patches gives a copy, not the same object
(() => { const s = { theme: 'dark', fontSize: 13, beta: false }; const t = mergeAll(s, []); return t !== s && t.theme === 'dark' && t.fontSize === 13 })()
--- check test | base never changes
(() => { const s = { theme: 'dark', fontSize: 13, beta: false }; mergeAll(s, [{ theme: 'light' }]); return s.theme === 'dark' })()
--- check type-error | A patch cannot hold the wrong type
mergeAll({ theme: 'dark', fontSize: 13, beta: false }, [{ fontSize: 'big' }])

+++ practice | The patch that did nothing
--- task
\`updateProfile\` should return a new profile with the patch applied. Instead, every update is ignored: \`updateProfile({ name: 'Ada', bio: '' }, { bio: 'Engineer' })\` still has an empty bio.

The checker cannot catch this one. Find the mistake and fix it.
--- starter
interface Profile {
  name: string
  bio: string
}

function updateProfile(current: Profile, patch: Partial<Profile>): Profile {
  return { ...patch, ...current }
}
--- solution
interface Profile {
  name: string
  bio: string
}

function updateProfile(current: Profile, patch: Partial<Profile>): Profile {
  return { ...current, ...patch }
}
--- hint
When two spreads set the same property, which one wins?
--- hint
The patch must come last, so its properties replace the current ones.
--- check case | The bio is updated
updateProfile({ name: 'Ada', bio: '' }, { bio: 'Engineer' })
=> { name: 'Ada', bio: 'Engineer' }
--- check case | An empty patch changes nothing
updateProfile({ name: 'Lin', bio: 'Pilot' }, {})
=> { name: 'Lin', bio: 'Pilot' }
--- check case | Both fields at once
updateProfile({ name: 'Sam', bio: 'x' }, { name: 'Samira', bio: 'y' })
=> { name: 'Samira', bio: 'y' }

+++ practice | Restocking the warehouse
--- task
A warehouse keeps stock of three items:

\`\`\`ts
type Item = 'bolt' | 'nut' | 'washer'
type Stock = Record<Item, number>
\`\`\`

Write \`restock(stock: Readonly<Stock>, delivery: Partial<Stock>): Readonly<Stock>\`. It returns a new stock where each item's count goes **up** by the amount delivered; an item missing from the delivery stays the same. The stock passed in never changes.

Loop over a list of every item, \`const ITEMS: Item[] = ['bolt', 'nut', 'washer']\`, rather than over the delivery's keys. Because the result is \`Readonly\`, a caller cannot change it afterwards.
--- starter
type Item = 'bolt' | 'nut' | 'washer'
type Stock = Record<Item, number>

function restock(stock: Stock, delivery: Partial<Stock>): Stock {
  return { ...stock, ...delivery }
}
--- solution
type Item = 'bolt' | 'nut' | 'washer'
type Stock = Record<Item, number>

const ITEMS: Item[] = ['bolt', 'nut', 'washer']

function restock(stock: Readonly<Stock>, delivery: Partial<Stock>): Readonly<Stock> {
  const next: Stock = { ...stock }
  for (const item of ITEMS) {
    next[item] = stock[item] + (delivery[item] ?? 0)
  }
  return next
}
--- hint
A spread would replace the counts. You need to add: \`stock[item] + (delivery[item] ?? 0)\`.
--- hint
Build the result in a plain \`Stock\` copy, then return it: a \`Stock\` can be returned as a \`Readonly<Stock>\`.
--- check case | Adds the delivery
restock({ bolt: 10, nut: 4, washer: 0 }, { bolt: 5, washer: 20 })
=> { bolt: 15, nut: 4, washer: 20 }
--- check case | An empty delivery changes nothing
restock({ bolt: 1, nut: 2, washer: 3 }, {})
=> { bolt: 1, nut: 2, washer: 3 }
--- check test | The original stock is unchanged
(() => { const s = { bolt: 1, nut: 1, washer: 1 }; restock(s, { nut: 9 }); return s.nut === 1 })()
--- check type-error | The result cannot be changed
restock({ bolt: 1, nut: 1, washer: 1 }, {}).bolt = 5
--- check type-error | screw is not an item
restock({ bolt: 1, nut: 1, washer: 1 }, { screw: 3 })

=== ts-gate | TypeScript: mastery gate
--- teach
The gate covers the whole course: annotations and reading type errors, typed functions, arrays and tuples, interfaces, optional values and null, unions and narrowing, discriminated unions with exhaustiveness, generics, \`unknown\` with type guards, and utility types. Its ten problems are new, most of them combine several lessons, and they lean towards backend work: checking request bodies, state machines, and generic data helpers. There are no hints. Twelve short questions after them check that you understand why the checker accepts or refuses code. To get ready, redo the practice problems of the lessons that felt hardest, without the hints.
--- gate
pass 7
questions 10
minutes 112

+++ problem | Validate a signup request
--- task
A signup endpoint receives a request body it cannot trust. The starter declares:

\`\`\`ts
interface Signup {
  email: string
  age: number
  plan: 'free' | 'pro'
}

type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string }
\`\`\`

\`Result<T>\` is a generic type alias: \`Result<Signup>\` is either \`{ ok: true, value: <a Signup> }\` or \`{ ok: false, error: <a message> }\`.

Write \`validateSignup(body: unknown): Result<Signup>\`. Check in this order and return the first error found:

1. the body is not an object (or is \`null\`): error \`'body must be an object'\`;
2. \`email\` is not a string containing \`'@'\`: error \`'email is invalid'\`;
3. \`age\` is not a whole number of at least 13: error \`'age is invalid'\`;
4. \`plan\` is present but is not \`'free'\` or \`'pro'\`: error \`'plan is invalid'\`. A missing plan means \`'free'\`.

On success return \`{ ok: true, value: { email, age, plan } }\` with exactly those three properties. Do not cast to \`Signup\`.
--- starter
interface Signup {
  email: string
  age: number
  plan: 'free' | 'pro'
}

type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string }

function validateSignup(body: unknown): Result<Signup> {
  return { ok: true, value: body as Signup }
}
--- solution
interface Signup {
  email: string
  age: number
  plan: 'free' | 'pro'
}

type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string }

function validateSignup(body: unknown): Result<Signup> {
  if (typeof body !== 'object' || body === null) return { ok: false, error: 'body must be an object' }
  const { email, age, plan } = body as Record<string, unknown>
  if (typeof email !== 'string' || !email.includes('@')) return { ok: false, error: 'email is invalid' }
  if (typeof age !== 'number' || !Number.isInteger(age) || age < 13) return { ok: false, error: 'age is invalid' }
  if (plan !== undefined && plan !== 'free' && plan !== 'pro') return { ok: false, error: 'plan is invalid' }
  return { ok: true, value: { email, age, plan: plan ?? 'free' } }
}
--- check case | A valid body with a plan
validateSignup({ email: 'ada@example.com', age: 36, plan: 'pro' })
=> { ok: true, value: { email: 'ada@example.com', age: 36, plan: 'pro' } }
--- check case | A missing plan means free, extra fields are dropped
validateSignup({ email: 'lin@example.com', age: 13, referrer: 'x' })
=> { ok: true, value: { email: 'lin@example.com', age: 13, plan: 'free' } }
--- check case | Not an object
[validateSignup(null), validateSignup('ada@example.com')].map((r) => (r.ok ? 'ok' : r.error))
=> ['body must be an object', 'body must be an object']
--- check case | Bad email comes before bad age
validateSignup({ email: 'ada.example.com', age: 5 })
=> { ok: false, error: 'email is invalid' }
--- check case | Too young, or not a whole number
[validateSignup({ email: 'a@b.c', age: 12 }), validateSignup({ email: 'a@b.c', age: 20.5 }), validateSignup({ email: 'a@b.c', age: '30' })].map((r) => (r.ok ? 'ok' : r.error))
=> ['age is invalid', 'age is invalid', 'age is invalid']
--- check case | An unknown plan
validateSignup({ email: 'a@b.c', age: 30, plan: 'gold' })
=> { ok: false, error: 'plan is invalid' }
--- check source absent | No cast to Signup
as\\s+Signup

+++ problem | An order's life cycle
--- task
An order moves through states, and events move it on:

\`\`\`ts
type Order =
  | { kind: 'pending'; id: string }
  | { kind: 'paid'; id: string; amount: number }
  | { kind: 'shipped'; id: string; amount: number; tracking: string }
  | { kind: 'cancelled'; id: string; reason: string }

type OrderEvent =
  | { kind: 'pay'; amount: number }
  | { kind: 'ship'; tracking: string }
  | { kind: 'cancel'; reason: string }
\`\`\`

Write \`apply(order: Order, event: OrderEvent): Order\`, which returns the new state as a new object (never change \`order\`):

- \`pay\` turns a pending order into a paid one with that \`amount\`; the amount must be above 0;
- \`ship\` turns a paid order into a shipped one, keeping its \`amount\` and adding \`tracking\`;
- \`cancel\` turns a pending or paid order into a cancelled one with that \`reason\`.

Every other combination (paying twice, shipping a pending order, anything after shipped or cancelled, a pay amount of 0 or less) throws a \`RangeError\`. Switch on the event's \`kind\`, with a \`never\` check in \`default:\`.
--- starter
type Order =
  | { kind: 'pending'; id: string }
  | { kind: 'paid'; id: string; amount: number }
  | { kind: 'shipped'; id: string; amount: number; tracking: string }
  | { kind: 'cancelled'; id: string; reason: string }

type OrderEvent =
  | { kind: 'pay'; amount: number }
  | { kind: 'ship'; tracking: string }
  | { kind: 'cancel'; reason: string }

function apply(order: Order, event: OrderEvent): Order {
  return order
}
--- solution
type Order =
  | { kind: 'pending'; id: string }
  | { kind: 'paid'; id: string; amount: number }
  | { kind: 'shipped'; id: string; amount: number; tracking: string }
  | { kind: 'cancelled'; id: string; reason: string }

type OrderEvent =
  | { kind: 'pay'; amount: number }
  | { kind: 'ship'; tracking: string }
  | { kind: 'cancel'; reason: string }

function apply(order: Order, event: OrderEvent): Order {
  switch (event.kind) {
    case 'pay':
      if (order.kind !== 'pending' || event.amount <= 0) break
      return { kind: 'paid', id: order.id, amount: event.amount }
    case 'ship':
      if (order.kind !== 'paid') break
      return { kind: 'shipped', id: order.id, amount: order.amount, tracking: event.tracking }
    case 'cancel':
      if (order.kind !== 'pending' && order.kind !== 'paid') break
      return { kind: 'cancelled', id: order.id, reason: event.reason }
    default: {
      const unhandled: never = event
      return unhandled
    }
  }
  throw new RangeError(\`cannot \${event.kind} an order that is \${order.kind}\`)
}
--- check case | Pay a pending order
apply({ kind: 'pending', id: 'A1' }, { kind: 'pay', amount: 25 })
=> { kind: 'paid', id: 'A1', amount: 25 }
--- check case | Ship a paid order
apply({ kind: 'paid', id: 'A1', amount: 25 }, { kind: 'ship', tracking: 'TRK9' })
=> { kind: 'shipped', id: 'A1', amount: 25, tracking: 'TRK9' }
--- check case | Cancel a paid order
apply({ kind: 'paid', id: 'B2', amount: 10 }, { kind: 'cancel', reason: 'changed mind' })
=> { kind: 'cancelled', id: 'B2', reason: 'changed mind' }
--- check test | Shipping a pending order throws
throws(() => apply({ kind: 'pending', id: 'C3' }, { kind: 'ship', tracking: 'T' }))
--- check test | Nothing happens after shipping or cancelling
throws(() => apply({ kind: 'shipped', id: 'D4', amount: 5, tracking: 'T' }, { kind: 'cancel', reason: 'late' })) && throws(() => apply({ kind: 'cancelled', id: 'E5', reason: 'x' }, { kind: 'pay', amount: 5 }))
--- check test | Paying twice, or paying 0, throws
throws(() => apply({ kind: 'paid', id: 'F6', amount: 5 }, { kind: 'pay', amount: 5 })) && throws(() => apply({ kind: 'pending', id: 'G7' }, { kind: 'pay', amount: 0 }))
--- check test | The order passed in is not changed
(() => { const o = { kind: 'pending' as const, id: 'H8' }; apply(o, { kind: 'pay', amount: 3 }); return o.kind === 'pending' && !('amount' in o) })()
--- check source | Keeps an exhaustiveness check
:\\s*never\\s*=

+++ problem | Keep the first of each key
--- task
Write a generic helper \`uniqueBy<T>(items: T[], key: (item: T) => string): T[]\`. It returns the items in their original order, keeping only the first item for each key; later items with a key already seen are dropped.

So \`uniqueBy(['Ada', 'adam', 'Lin', 'al'], (s) => s[0].toLowerCase())\` is \`['Ada', 'Lin']\`. An empty array gives \`[]\`. The result must keep the item type: calling it on numbers gives a \`number[]\`.
--- starter
function uniqueBy(items, key) {
  return items
}
--- solution
function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen: string[] = []
  const out: T[] = []
  for (const item of items) {
    const k = key(item)
    if (!seen.includes(k)) {
      seen.push(k)
      out.push(item)
    }
  }
  return out
}
--- check case | The first item for each key
uniqueBy(['Ada', 'adam', 'Lin', 'al'], (s) => s[0].toLowerCase())
=> ['Ada', 'Lin']
--- check case | Objects by id
uniqueBy([{ id: 'a', v: 1 }, { id: 'b', v: 2 }, { id: 'a', v: 3 }], (r) => r.id)
=> [{ id: 'a', v: 1 }, { id: 'b', v: 2 }]
--- check case | An empty array
uniqueBy([], (x) => 'k')
=> []
--- check case | Every key different keeps everything
uniqueBy([3, 1, 2], (n) => \`\${n}\`)
=> [3, 1, 2]
--- check type-error | The result keeps the item type
const xs: string[] = uniqueBy([1, 2], (n) => \`\${n}\`)
--- check source | uniqueBy is generic
uniqueBy\\s*<\\s*T\\s*>

+++ problem | Split into passed and failed
--- task
Write \`partition<T>(items: T[], test: (item: T) => boolean): [T[], T[]]\`. It returns a tuple of two arrays: first the items for which \`test\` returns \`true\`, then the items for which it returns \`false\`, each in the original order.

So \`partition([5, 12, 8, 30], (n) => n > 10)\` is \`[[12, 30], [5, 8]]\`, and an empty array gives \`[[], []]\`.
--- starter
function partition<T>(items: T[], test: (item: T) => boolean) {
  return items.filter(test)
}
--- solution
function partition<T>(items: T[], test: (item: T) => boolean): [T[], T[]] {
  const yes: T[] = []
  const no: T[] = []
  for (const item of items) {
    if (test(item)) yes.push(item)
    else no.push(item)
  }
  return [yes, no]
}
--- check case | Numbers over 10
partition([5, 12, 8, 30], (n) => n > 10)
=> [[12, 30], [5, 8]]
--- check case | An empty array
partition([], (x) => true)
=> [[], []]
--- check case | Everything passes
partition(['a', 'b'], (s) => s.length === 1)
=> [['a', 'b'], []]
--- check type-error | The result is a pair of arrays, not one array
const [a, b, c] = partition([1], (n) => n > 0)
--- check source | Returns a [T[], T[]] tuple
:\\s*\\[\\s*T\\[\\]\\s*,\\s*T\\[\\]\\s*\\]

+++ problem | Tags in any shape
--- task
A request's \`tags\` field may be a single comma-separated string, an array of strings, or missing. Write \`normalizeTags(input: string | string[] | undefined): string[]\`:

- a string is split on commas (\`'a, b'.split(',')\` gives \`['a', ' b']\`);
- every tag is trimmed and lowercased, and empty tags are dropped;
- each tag appears once, at its first position;
- a missing value gives \`[]\`.

So \`normalizeTags(' API, backend,,api ')\` and \`normalizeTags(['API', ' backend', 'api', ''])\` are both \`['api', 'backend']\`.
--- starter
function normalizeTags(input: string | string[] | undefined): string[] {
  return input.split(',')
}
--- solution
function normalizeTags(input: string | string[] | undefined): string[] {
  if (input === undefined) return []
  const raw = Array.isArray(input) ? input : input.split(',')
  const tags: string[] = []
  for (const t of raw) {
    const tag = t.trim().toLowerCase()
    if (tag !== '' && !tags.includes(tag)) tags.push(tag)
  }
  return tags
}
--- check case | A comma-separated string
normalizeTags(' API, backend,,api ')
=> ['api', 'backend']
--- check case | An array of strings
normalizeTags(['API', ' backend', 'api', ''])
=> ['api', 'backend']
--- check case | Missing
normalizeTags(undefined)
=> []
--- check case | Only commas and spaces
normalizeTags(' , ,')
=> []
--- check case | One tag
normalizeTags('Billing')
=> ['billing']

+++ problem | Scores from a JSON body
--- task
Write \`parseScores(text: string): Record<string, number> | null\`. The text should be a JSON object whose every value is a number, such as \`'{"ada": 91, "lin": 78.5}'\`.

- Return the object when it is one (an empty object \`{}\` counts).
- Return \`null\` when the text is not valid JSON, when it is not an object (including \`null\` and arrays), or when any value is not a number.

Use \`unknown\`, \`Object.keys\` and narrowing; do not cast to \`Record<string, number>\`.
--- starter
function parseScores(text: string): Record<string, number> | null {
  return JSON.parse(text)
}
--- solution
function parseScores(text: string): Record<string, number> | null {
  let value: unknown
  try {
    value = JSON.parse(text)
  } catch {
    return null
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null
  const record = value as Record<string, unknown>
  const scores: Record<string, number> = {}
  for (const key of Object.keys(record)) {
    const score = record[key]
    if (typeof score !== 'number') return null
    scores[key] = score
  }
  return scores
}
--- check case | A valid object
parseScores('{"ada": 91, "lin": 78.5}')
=> { ada: 91, lin: 78.5 }
--- check case | An empty object counts
parseScores('{}')
=> {}
--- check case | One value is not a number
parseScores('{"ada": 91, "lin": "78"}')
=> null
--- check case | null and arrays are not objects of scores
[parseScores('null'), parseScores('[1, 2]')]
=> [null, null]
--- check case | Not JSON
parseScores('{ada: 91}')
=> null
--- check source absent | No cast to Record<string, number>
as\\s+Record\\s*<\\s*string\\s*,\\s*number\\s*>

+++ problem | Update a user, never their id
--- task
\`\`\`ts
interface User {
  id: number
  name: string
  email: string
  admin: boolean
}
\`\`\`

Write \`updateUser(user: Readonly<User>, patch: Partial<Omit<User, 'id'>>): User\`. It returns a new user with the patch applied; \`user\` itself never changes.

- The type of \`patch\` must make an \`id\` in a patch a type error, so an update can never change who the user is.
- If the patch has a \`name\` that is empty after trimming, throw a \`RangeError\`. A patch without \`name\` is fine.
- Names are stored trimmed: a patched name of \`'  Ada  '\` becomes \`'Ada'\`.
--- starter
interface User {
  id: number
  name: string
  email: string
  admin: boolean
}

function updateUser(user: User, patch: Partial<User>): User {
  return { ...user, ...patch }
}
--- solution
interface User {
  id: number
  name: string
  email: string
  admin: boolean
}

function updateUser(user: Readonly<User>, patch: Partial<Omit<User, 'id'>>): User {
  const next: User = { ...user, ...patch }
  if (patch.name !== undefined) {
    const name = patch.name.trim()
    if (name === '') throw new RangeError('name must not be blank')
    next.name = name
  }
  return next
}
--- check case | Applies the patch, name trimmed
updateUser({ id: 1, name: 'Ada', email: 'ada@example.com', admin: false }, { name: '  Ada L  ', admin: true })
=> { id: 1, name: 'Ada L', email: 'ada@example.com', admin: true }
--- check case | A patch without a name
updateUser({ id: 2, name: 'Lin', email: 'lin@example.com', admin: false }, { email: 'lin@example.org' })
=> { id: 2, name: 'Lin', email: 'lin@example.org', admin: false }
--- check test | A blank name throws
throws(() => updateUser({ id: 3, name: 'Sam', email: 's@example.com', admin: false }, { name: '   ' }))
--- check test | The user passed in is unchanged
(() => { const u = { id: 4, name: 'Kai', email: 'k@example.com', admin: false }; updateUser(u, { admin: true }); return u.admin === false })()
--- check type-error | A patch cannot change the id
updateUser({ id: 1, name: 'a', email: 'b', admin: false }, { id: 2 })

+++ problem | One page of results
--- task
Write \`paginate<T>(items: T[], page?: number, perPage?: number): Page<T>\`, using this interface (put it in your program):

\`\`\`ts
interface Page<T> {
  items: T[]
  page: number
  totalPages: number
}
\`\`\`

- \`page\` defaults to \`1\` and \`perPage\` to \`10\` when they are left out.
- Page 1 is the first \`perPage\` items, page 2 the next ones, and so on.
- \`totalPages\` is the number of items divided by \`perPage\`, rounded up (\`Math.ceil(x)\` rounds up); no items means \`0\` pages.
- A page past the end gives an empty \`items\` array.
- A \`page\` or \`perPage\` below 1, or not a whole number, throws a \`RangeError\`.

So \`paginate([1, 2, 3, 4, 5], 2, 2)\` is \`{ items: [3, 4], page: 2, totalPages: 3 }\`.
--- starter
interface Page<T> {
  items: T[]
  page: number
  totalPages: number
}

function paginate<T>(items: T[], page: number, perPage: number): Page<T> {
  return { items: items.slice(page * perPage, page * perPage + perPage), page, totalPages: items.length / perPage }
}
--- solution
interface Page<T> {
  items: T[]
  page: number
  totalPages: number
}

function paginate<T>(items: T[], page?: number, perPage?: number): Page<T> {
  const p = page ?? 1
  const size = perPage ?? 10
  if (!Number.isInteger(p) || p < 1 || !Number.isInteger(size) || size < 1) {
    throw new RangeError('page and perPage must be whole numbers from 1')
  }
  const start = (p - 1) * size
  return { items: items.slice(start, start + size), page: p, totalPages: Math.ceil(items.length / size) }
}
--- check case | The second page of two
paginate([1, 2, 3, 4, 5], 2, 2)
=> { items: [3, 4], page: 2, totalPages: 3 }
--- check case | The defaults
paginate(['a', 'b', 'c'])
=> { items: ['a', 'b', 'c'], page: 1, totalPages: 1 }
--- check case | A page past the end
paginate([1, 2, 3], 5, 2)
=> { items: [], page: 5, totalPages: 2 }
--- check case | No items, no pages
paginate([], 1, 10)
=> { items: [], page: 1, totalPages: 0 }
--- check test | Page 0, or a fractional size, throws
throws(() => paginate([1], 0)) && throws(() => paginate([1], 1, 2.5))
--- check type-error | The items keep their type
const p: Page<number> = paginate(['a'])

+++ problem | An error rate from access logs
--- task
Each line of a web server's access log looks like \`'2026-10-01T10:00:00Z 503 /api/users'\`: a timestamp, a status code and a path, separated by single spaces.

1. Write \`parseLogLine(line: string): [string, number, string] | null\`, which returns the tuple \`[timestamp, status, path]\`. Return \`null\` when the line does not have exactly three parts after trimming and splitting on whitespace, or when the status is not a whole number from 100 to 599.
2. Write \`errorRate(lines: string[]): number\`: the share of **valid** lines whose status is 500 or more, rounded to 2 decimal places (\`Number(x.toFixed(2))\`). Invalid lines are ignored. With no valid lines at all, return \`0\`.

So for one 200 line, one 503 line, one 404 line and one broken line, the error rate is \`0.33\`.
--- starter
function parseLogLine(line: string): [string, number, string] | null {
  const [time, status, path] = line.split(' ')
  return [time, Number(status), path]
}

function errorRate(lines: string[]): number {
  return 0
}
--- solution
function parseLogLine(line: string): [string, number, string] | null {
  const parts = line.trim().split(/\\s+/)
  if (parts.length !== 3) return null
  const [time, statusText, path] = parts
  const status = Number(statusText)
  if (!Number.isInteger(status) || status < 100 || status > 599) return null
  return [time, status, path]
}

function errorRate(lines: string[]): number {
  let valid = 0
  let errors = 0
  for (const line of lines) {
    const parsed = parseLogLine(line)
    if (parsed === null) continue
    valid++
    if (parsed[1] >= 500) errors++
  }
  return valid === 0 ? 0 : Number((errors / valid).toFixed(2))
}
--- check case | A valid line
parseLogLine('2026-10-01T10:00:00Z 503 /api/users')
=> ['2026-10-01T10:00:00Z', 503, '/api/users']
--- check case | Wrong number of parts, or a bad status
[parseLogLine('2026-10-01T10:00:00Z 503'), parseLogLine('t 99 /x'), parseLogLine('t 600 /x'), parseLogLine('t 2x0 /x')]
=> [null, null, null, null]
--- check case | One error in three valid lines
errorRate(['t1 200 /a', 't2 503 /b', 't3 404 /c', 'broken'])
=> 0.33
--- check case | No valid lines
errorRate(['', 'nope'])
=> 0
--- check case | Every line an error
errorRate(['t 500 /a', 't 599 /b'])
=> 1

+++ problem | A rate limiter's decision
--- task
An API allows each plan a number of requests per minute:

\`\`\`ts
type Plan = 'free' | 'pro' | 'team'

type Decision =
  | { kind: 'allow'; remaining: number }
  | { kind: 'deny'; retryAfter: number }
\`\`\`

1. Declare \`const LIMITS: Record<Plan, number>\` with \`free\` at \`10\`, \`pro\` at \`100\` and \`team\` at \`500\`.
2. Write \`decide(plan: Plan, usedThisMinute: number, secondsIntoMinute: number): Decision\`. A new request is allowed when \`usedThisMinute\` is below the plan's limit; \`remaining\` is how many more requests are left after this one. Otherwise it is denied, and \`retryAfter\` is the seconds until the next minute starts: \`60 - secondsIntoMinute\`.

So \`decide('free', 3, 20)\` is \`{ kind: 'allow', remaining: 6 }\` and \`decide('free', 10, 45)\` is \`{ kind: 'deny', retryAfter: 15 }\`.
--- starter
type Plan = 'free' | 'pro' | 'team'

type Decision =
  | { kind: 'allow'; remaining: number }
  | { kind: 'deny'; retryAfter: number }

function decide(plan: Plan, usedThisMinute: number, secondsIntoMinute: number): Decision {
  return { kind: 'allow', remaining: 0 }
}
--- solution
type Plan = 'free' | 'pro' | 'team'

type Decision =
  | { kind: 'allow'; remaining: number }
  | { kind: 'deny'; retryAfter: number }

const LIMITS: Record<Plan, number> = { free: 10, pro: 100, team: 500 }

function decide(plan: Plan, usedThisMinute: number, secondsIntoMinute: number): Decision {
  const limit = LIMITS[plan]
  if (usedThisMinute < limit) {
    return { kind: 'allow', remaining: limit - usedThisMinute - 1 }
  }
  return { kind: 'deny', retryAfter: 60 - secondsIntoMinute }
}
--- check case | Allowed, with requests left
decide('free', 3, 20)
=> { kind: 'allow', remaining: 6 }
--- check case | The last allowed request leaves 0
decide('pro', 99, 59)
=> { kind: 'allow', remaining: 0 }
--- check case | At the limit is denied
decide('free', 10, 45)
=> { kind: 'deny', retryAfter: 15 }
--- check case | Denied at the very start of a minute
decide('team', 500, 0)
=> { kind: 'deny', retryAfter: 60 }
--- check test | LIMITS holds every plan
LIMITS.free === 10 && LIMITS.pro === 100 && LIMITS.team === 500
--- check type-error | 'gold' is not a plan
decide('gold', 1, 1)

+++ question | A let keeps its type
--- ask
What happens when this program is run here, in strict mode?

\`\`\`ts error
let retries = 3
console.log('starting')
retries = 'three'
console.log(retries)
\`\`\`
--- choice
It prints \`starting\`, then \`three\`.
--- choice
It prints \`starting\`, then stops with an error on line 3.
--- choice correct
Nothing is printed: the type error on line 3 stops the whole program before it runs.
--- choice
It prints \`starting\`, then \`3\`, because the bad assignment is skipped.
--- why
\`let retries = 3\` infers the type \`number\`, so assigning a string is a type error. TypeScript checks the whole file before anything runs, and a type error means no line runs at all, not even the first.

+++ question | ?? or ||
--- ask
What does this print?

\`\`\`ts
interface Prefs {
  volume?: number
}

const prefs: Prefs = { volume: 0 }
console.log(prefs.volume || 50, prefs.volume ?? 50)
\`\`\`
--- answer
50 0
--- why
\`||\` falls back whenever the left side is falsy, and \`0\` is falsy, so it gives 50. \`??\` falls back only for \`null\` and \`undefined\`, so it keeps the 0 the user chose.

+++ question | typeof null
--- ask
What does this print?

\`\`\`ts
const a: unknown = null
const b: unknown = [1, 2]
const c: unknown = 'x'
console.log(typeof a, typeof b, typeof c)
\`\`\`
--- answer
object object string
--- why
\`typeof null\` is \`'object'\`, a bug from JavaScript's first version that can never be fixed, and \`typeof\` an array is also \`'object'\`. That is why a guard checks \`x !== null\` and uses \`Array.isArray\` for arrays.

+++ question | A tuple that is not one
--- ask
Why does the last line fail to type-check?

\`\`\`ts error
function bounds(values: number[]) {
  return [Math.min(...values), Math.max(...values)]
}

const [low, high]: [number, number] = bounds([4, 9, 2])
\`\`\`
--- choice
\`Math.min\` and \`Math.max\` return \`number | undefined\`.
--- choice correct
Without a return type, \`[a, b]\` is inferred as \`number[]\`, an array of any length, which is not assignable to \`[number, number]\`.
--- choice
Destructuring cannot be used with a type annotation.
--- choice
Tuples can only hold values of different types.
--- why
TypeScript infers an array literal as a plain array, not a tuple. Writing the return type \`: [number, number]\` on \`bounds\` promises exactly two numbers, and the error goes away.

+++ question | Why the never line
--- ask
A \`switch\` over a discriminated union ends with \`default: { const unhandled: never = msg; return unhandled }\`. What does that line do for you?
--- choice
It throws an error at run time whenever a message has an unknown kind.
--- choice correct
If a kind of the union has no \`case\`, the value can still reach \`default:\`, it cannot be assigned to \`never\`, and the program stops compiling, naming the forgotten shape.
--- choice
It tells the checker to stop checking the rest of the function.
--- choice
It makes the \`switch\` run faster, because the compiler can skip the \`default:\` branch.
--- why
\`never\` is the type with no values. When every kind has its own \`case\`, nothing is left in \`default:\`, so the assignment type-checks. Add a new kind to the union and forget a \`case\`, and the checker reports it in every switch that missed it.

+++ question | The cast that compiles
--- ask
\`const user = JSON.parse(text) as User\` compiles. Why is it still a bad idea for a request body?
--- choice
\`as\` makes the program slower, because it converts the object when it runs.
--- choice correct
\`as\` only changes what the checker believes. Nothing is checked when the program runs, so a body with missing or wrong fields flows on as if it were a \`User\`.
--- choice
\`JSON.parse\` returns \`unknown\`, so the cast throws an error when it runs.
--- choice
It is fine: the compiler checks that the JSON matches \`User\`.
--- why
Types are erased before the program runs. A type guard, or a library such as Zod, actually checks the fields at run time and only then gives you a \`User\`: parse, don't assert.

+++ question | What a generic keeps
--- ask
Given \`function last<T>(items: T[]): T | undefined\`, what is the type of \`x\` in \`const x = last(['a', 'b'])\`?
--- answer
string | undefined
undefined | string
--- why
\`T\` is filled in from the argument: the items are strings, so \`T\` is \`string\`. The \`| undefined\` stays because an empty array has no last item.

+++ question | Narrowing a union
--- ask
Inside the \`else\` branch, what does TypeScript know about \`input\`?

\`\`\`ts
function size(input: string | string[] | null): number {
  if (input === null) {
    return 0
  } else if (Array.isArray(input)) {
    return input.length
  } else {
    return 1
  }
}
\`\`\`
--- choice
It is still \`string | string[] | null\`: narrowing only works inside \`if\`, not \`else\`.
--- choice
It is \`string | string[]\`.
--- choice correct
It is \`string\`: \`null\` and the array have both been ruled out by the checks above.
--- choice
It is \`unknown\`, because \`Array.isArray\` erases the type.
--- why
The checker narrows by elimination. The first check removes \`null\`, the second removes \`string[]\`, so in the last branch only \`string\` is left.

+++ question | What Pick keeps
--- ask
Which of these objects, written out as shown, can be assigned to a variable of type \`Pick<Settings, 'theme'>\`?

\`\`\`ts
interface Settings {
  theme: string
  fontSize: number
  beta: boolean
}
\`\`\`
--- choice
\`{}\`
--- choice correct
\`{ theme: 'dark' }\`
--- choice
\`{ fontSize: 13 }\`
--- choice
\`{ theme: 13 }\`
--- why
\`Pick<Settings, 'theme'>\` is an object type with only the listed property, \`theme: string\`, and it is still required. \`{}\` is missing it, \`{ fontSize: 13 }\` has a property the type does not list and is missing \`theme\`, and \`13\` is not a string.

+++ question | Exact keys in a Record
--- ask
\`type Plan = 'free' | 'pro'\`. What happens if you write \`const LIMITS: Record<Plan, number> = { free: 100 }\`?
--- choice
It compiles, and \`LIMITS.pro\` is \`undefined\` when the program runs.
--- choice
It compiles, and \`LIMITS.pro\` is \`0\`.
--- choice correct
It is a type error: a \`Record\` over literal keys needs every key, so \`pro\` is missing.
--- choice
It is a type error, because a \`Record\` can only have string keys, not literal types.
--- why
With literal keys, \`Record<Plan, number>\` is an object type with exactly the properties \`free\` and \`pro\`, both required. Adding a plan to \`Plan\` later makes every such object a type error until it gets a value for the new plan.

+++ question | Where an annotation pays off
--- ask
In strict mode, what is wrong with \`function total(items) { return items.length }\`?
--- choice
Nothing: TypeScript infers that \`items\` is an array from \`items.length\`.
--- choice correct
\`items\` has no type, which is error TS7006 ("implicitly has an 'any' type"), because an untyped parameter would turn checking off for everything it touches.
--- choice
The function needs a return type, or it will not compile.
--- choice
\`length\` is only allowed on strings.
--- why
TypeScript infers a variable's type from its value, but a parameter has no value until the function is called, so strict mode makes you annotate it. The return type, on the other hand, can be inferred.

+++ question | Which spread wins
--- ask
What does this print?

\`\`\`ts
interface Settings {
  theme: string
  fontSize: number
}

const current: Settings = { theme: 'dark', fontSize: 13 }
const patch: Partial<Settings> = { fontSize: 15 }
const a = { ...current, ...patch }
const b = { ...patch, ...current }
console.log(a.fontSize, b.fontSize)
\`\`\`
--- answer
15 13
--- why
When two spreads set the same property, the later one wins. In \`a\` the patch comes last, so its 15 replaces 13; in \`b\` the current settings come last and undo the patch.
`;export{e as default};