var e=`@track javascript
@title JavaScript
@name JavaScript, the language of the web
@blurb The language of the web, from console.log to async/await — the ground M1 to M3 build on.

=== js-01 | Printing
--- teach
In the HTML course you wrote a little JavaScript inside a \`<script>\` tag, and it changed the page when someone clicked a button. In the Terminal course you typed \`echo "hello"\` and the computer answered at once. This course is about JavaScript itself, away from any page. Your first job is to make a program show some text.

Think of a recipe card. The steps are written down in order, and the cook follows them from the top of the card to the bottom. Nobody invents the steps halfway through.

### A program is a list of statements

A **program** is a list of instructions for the computer, written down in order. In JavaScript each instruction is called a **[[statement|statement]]** — one complete step, usually one line. JavaScript runs the statements from the top line to the bottom line, one after another. When you press **Run Code**, the editor's program runs, and the text it shows appears below it. That text is called the **output**.

### console.log writes a line

The instruction for showing text is \`console.log\`. Read it aloud as "console dot log". It writes one line to the output, the way \`echo\` did in the terminal. The **[[console|console]]** is the place where a program's output goes, and \`log\` means "write this down". The dot \`.\` between them means "the \`log\` that belongs to \`console\`".

You tell \`console.log\` what to write by putting it inside the round brackets \`(\` and \`)\` right after the name.

In the examples, the part after \`//\` (two slashes) is a note for you, not for JavaScript. It shows what the line prints. There is more about \`//\` at the end of this lesson.

\`\`\`js
console.log('Engines armed')   // Engines armed
\`\`\`

Two \`console.log\` lines give two lines of output, in the same order as the code, top to bottom:

\`\`\`js
console.log('Engines armed')          // Engines armed
console.log('Launch in T-minus 10')   // Launch in T-minus 10
\`\`\`

\`\`\`
Engines armed
Launch in T-minus 10
\`\`\`

### Text goes in quotes

Text in quote marks is called a **string** — a piece of text, with a quote mark at each end. The quotes tell JavaScript where the text starts and where it stops. They are not printed: only the characters between them are. Every letter, space and punctuation mark inside the quotes comes out exactly as you typed it.

JavaScript accepts [[two kinds of quote mark|two-quotes]]: single quotes \`'…'\` and double quotes \`"…"\`. Both make the same string, as long as the two ends match:

\`\`\`js
console.log("Hatch closed")   // Hatch closed
console.log('Hatch closed')   // Hatch closed
\`\`\`

The two kinds help when the text holds a quote mark of its own. An apostrophe is a single quote, so text with an apostrophe goes inside double quotes: \`"We're go"\`. Text with double quotes in it goes inside single quotes: \`'Say "go"'\`.

**Watch out:** every opening quote needs a closing quote of the same kind. \`console.log('Hatch closed)\` has no closing \`'\`, so JavaScript cannot tell where the text ends, and it stops with a \`SyntaxError\` before running a single line. If you leave the quotes off altogether, as in \`console.log(Hatch)\`, JavaScript thinks \`Hatch\` is the name of something else, cannot find it, and stops with \`ReferenceError: Hatch is not defined\`.

### Several values in one line

You can hand \`console.log\` more than one value. Put them all inside the brackets with a comma \`,\` between each pair. Each value you hand over is called an **argument**. \`console.log\` writes them all on one line and puts one space between each pair:

\`\`\`js
console.log('Fuel:', 98, 'percent')   // Fuel: 98 percent
\`\`\`

You typed no spaces between the values, yet the output has a space after \`Fuel:\` and after \`98\`. \`console.log\` added them. Notice too that \`98\` has no quotes. It is a number, not text. You will meet numbers properly in the third lesson.

### Comments: notes for people

Anything after \`//\` on a line is a **comment** — a note for people that JavaScript skips completely. It is never run and never printed. A comment can have a whole line to itself, or sit at the end of a line of code:

\`\`\`js
// Countdown message for the crew
console.log('Launch in T-minus 10')   // this prints; the note does not
\`\`\`

Comments are for the next person who reads your code, and that person is often you, a week later. Engineers [[write them on purpose|comments-why]], to say *why* the code does what it does.

::: context statement A statement is one step
A **statement** is one complete instruction, like one sentence in a recipe. Many JavaScript programmers end each statement with a semicolon \`;\`, as in \`console.log('Go');\`. JavaScript does not require it: when a line ends and the statement is complete, it puts the semicolon in for you. This course leaves the semicolons out, which is a common style. You will see both styles in real code, and both run the same way.
:::

::: context console Why it is called the console
Long ago a **console** was the desk of switches, lights and a typewriter-like terminal where an operator sat and talked to a big computer. The word stuck for "the place where a program reports what it is doing". Every web browser has one: press F12 (or Cmd+Option+J on a Mac) on any web page, open the Console tab, and you will see what that page's JavaScript logged. On a server, \`console.log\` writes to the terminal instead. Here, the output appears under the editor.
:::

::: context two-quotes Two kinds of quotes, one string
JavaScript treats \`'go'\` and \`"go"\` as exactly the same string. Having both is a convenience, so you can put one kind of quote mark inside text wrapped in the other. Teams pick one style for everyday use and stick to it, so their code looks the same everywhere. This course uses single quotes, except when the text holds an apostrophe. A third kind, the backtick, makes a special string that can hold values; you will meet it in the lesson on strings.
:::

::: context comments-why What a good comment says
The code already says *what* it does. A good comment says *why*: "retry three times because the radio drops packets", not "add one to x". The software that flew the Apollo spacecraft to the Moon is public today, and it is full of comments explaining each part to the next engineer. Comments are also handy while you learn: put \`//\` in front of a line to switch it off without deleting it.
:::
--- task
Make the program print exactly these two lines:

\`\`\`
Hello, world!
JavaScript is running in your browser.
\`\`\`

Use one \`console.log\` for each line, with the text in quotes. Then press Run Code.
--- starter
// Write your two console.log() calls below.

--- solution
console.log('Hello, world!')
console.log('JavaScript is running in your browser.')
--- hint
Each line of output needs its own \`console.log(...)\`. Put the text for each line inside quotes, inside the brackets.
--- hint
Copy the text exactly. Capitals and punctuation count: \`Hello, world!\` has a capital H, a comma, a space and an exclamation mark, and the second line ends with a full stop.
--- hint
The first line of your program is \`console.log('Hello, world!')\`. The second line has the same shape, with the second sentence inside the quotes.
--- check output | Prints both lines, exactly
Hello, world!
JavaScript is running in your browser.
?? Punctuation and capitals count.

+++ practice | The launch board
--- task
Make the program print exactly these three lines:

\`\`\`
Mission: Kestrel
Crew: 4
Launch window opens at dawn.
\`\`\`

Use one \`console.log\` for each line. On the second line, hand \`console.log\` two values with a comma between them: the text \`'Crew:'\` and the number \`4\`, with no quotes around the 4.
--- starter
// Print the three lines for the launch board.

--- solution
console.log('Mission: Kestrel')
console.log('Crew:', 4)
console.log('Launch window opens at dawn.')
--- hint
One \`console.log\` per line of output, in the same order as the lines, top to bottom.
--- hint
\`console.log\` puts a space between two values for you, so the text \`'Crew:'\` needs no space at its end.
--- hint
The second line of your program hands \`console.log\` the text \`'Crew:'\`, a comma, and then the number 4 with no quotes.
--- check output | Prints the three lines exactly
Mission: Kestrel
Crew: 4
Launch window opens at dawn.
--- check source | Hands console.log the 4 as a number, after the text
console\\.log\\(\\s*['"]Crew:['"]\\s*,\\s*4\\s*\\)
?? Write the 4 with no quotes, as its own value after a comma.
--- check source | Uses three console.log lines
(console\\.log\\([\\s\\S]*){3}

+++ practice | Five values, one line
--- task
Print exactly this line:

\`\`\`
Orbit 3 of 16 complete
\`\`\`

Use a single \`console.log\` with five values in its brackets, in this order: the text \`Orbit\`, the number \`3\`, the text \`of\`, the number \`16\`, and the text \`complete\`. Put a comma between each pair. The numbers have no quotes. No piece of text starts or ends with a space: \`console.log\` adds the spaces.
--- starter
// One console.log, five values.

--- solution
console.log('Orbit', 3, 'of', 16, 'complete')
--- hint
Values inside the brackets are separated by commas, and \`console.log\` writes one space between each pair.
--- hint
The pieces of text go in quotes. The numbers \`3\` and \`16\` do not.
--- check output | Prints the line exactly
Orbit 3 of 16 complete
--- check source | The 3 is a number of its own
['"]Orbit['"]\\s*,\\s*3\\s*,
?? Hand the 3 to console.log as a number, straight after the text Orbit.
--- check source | The 16 is a number of its own
,\\s*16\\s*,

+++ practice | A checklist with notes
--- task
Write a program that prints exactly this:

\`\`\`
Checklist
1 Fuel loaded
2 Hatch closed
\`\`\`

Three rules:

- The first line of your program is the comment \`// Pre-launch checklist\`.
- In the two numbered lines, hand \`console.log\` the number as a number (no quotes), then the text as a second value, with a comma between them.
- The last \`console.log\` line ends with the comment \`// last item\`, written after the closing bracket.
--- starter
// Replace this line with the comment the task asks for.

--- solution
// Pre-launch checklist
console.log('Checklist')
console.log(1, 'Fuel loaded')
console.log(2, 'Hatch closed')   // last item
--- hint
A comment starts with \`//\`. JavaScript skips it, so it never shows up in the output.
--- hint
A numbered line hands \`console.log\` two values: a number with no quotes, then the text in quotes. \`console.log\` puts the space between them.
--- hint
A comment can sit at the end of a line of code: write the \`console.log(...)\`, then a space, then \`// last item\`.
--- check output | Prints the checklist
Checklist
1 Fuel loaded
2 Hatch closed
--- check source | Starts with the comment
^// Pre-launch checklist
?? The very first line of your program must be exactly // Pre-launch checklist.
--- check source | The numbers are numbers
console\\.log\\(\\s*1\\s*,[\\s\\S]*console\\.log\\(\\s*2\\s*,
--- check source | The last line ends with a comment
\\)\\s*// last item

+++ practice | Quotes inside the text
--- task
Print exactly these two lines:

\`\`\`
It's go time.
She said "launch" twice.
\`\`\`

- The first line holds an apostrophe, so wrap that text in double quotes.
- The second line holds double quote marks, so wrap that text in single quotes.
--- starter
// Two lines, each with a quote mark inside the text.

--- solution
console.log("It's go time.")
console.log('She said "launch" twice.')
--- hint
A string ends at the next quote mark of the same kind that started it. So a string that starts with \`"\` can hold a \`'\` safely, and the other way round.
--- hint
The first string starts and ends with \`"\`. The second starts and ends with \`'\`, and the two \`"\` marks sit inside it.
--- check output | Prints both lines with their quote marks
It's go time.
She said "launch" twice.
?? Check the apostrophe in the first line and the two double quote marks in the second.
--- check source | The apostrophe sits inside double quotes
"It's go time\\."
--- check source | The double quotes sit inside single quotes
'She said "launch" twice\\.'

+++ practice | Fix the status lines
--- task
This program should print these two lines:

\`\`\`
Tank pressure normal
Valves open
\`\`\`

Instead, JavaScript stops with an error before it prints anything. There is one mistake on each \`console.log\` line. Fix both. Keep two values in the second \`console.log\`: the text \`Valves\` and the text \`open\`.
--- starter
// Should print two status lines.
console.log('Tank pressure normal)
console.log(Valves, 'open')
--- solution
// Should print two status lines.
console.log('Tank pressure normal')
console.log('Valves', 'open')
--- hint
Every piece of text needs a quote mark at the start and a matching one at the end.
--- hint
On the first line, the closing quote is missing. On the second, \`Valves\` has no quotes at all, so JavaScript looks for something named \`Valves\` and cannot find it.
--- check output | Prints both lines
Tank pressure normal
Valves open
--- check source | Valves is text now
console\\.log\\(\\s*['"]Valves['"]\\s*,
?? Put Valves in quotes, so JavaScript treats it as text.
--- check source | The first text is closed
['"]Tank pressure normal['"]

+++ practice | A ground station report
--- task
Print this report exactly:

\`\`\`
GROUND STATION REPORT
Station: Svalbard  Passes today: 14
Signal strength: 87 percent
Downlink rate: 2.5 Mbit/s
All links nominal.
\`\`\`

Rules:

- The first line of your program is a comment saying what it prints (any comment will do).
- The numbers \`14\`, \`87\` and \`2.5\` are handed to \`console.log\` as numbers, with no quotes, each as a value of its own.
- Look at line 2: there are **two** spaces between \`Svalbard\` and \`Passes\`. Get them without putting the 14 inside quotes.
--- starter
console.log('GROUND STATION REPORT')

--- solution
// Daily report for the ground station
console.log('GROUND STATION REPORT')
console.log('Station: Svalbard ', 'Passes today:', 14)
console.log('Signal strength:', 87, 'percent')
console.log('Downlink rate:', 2.5, 'Mbit/s')
console.log('All links nominal.')
--- hint
Start with a \`//\` comment line. Then give each line of the report its own \`console.log\`.
--- hint
When a number sits in the middle of a line, split the line into values: the text before it, the number, and the text after it.
--- hint
\`console.log\` adds one space between values. For two spaces, end the text before \`Passes\` with one space of its own: \`'Station: Svalbard '\`.
--- check output | Prints the report exactly
GROUND STATION REPORT
Station: Svalbard  Passes today: 14
Signal strength: 87 percent
Downlink rate: 2.5 Mbit/s
All links nominal.
--- check source | Starts with a comment
^//
--- check source | 14 is a number
,\\s*14\\s*\\)
--- check source | 87 and 2.5 are numbers
,\\s*87\\s*,[\\s\\S]*,\\s*2\\.5\\s*,
?? Hand 87 and 2.5 to console.log as values of their own, with no quotes.

=== js-02 | Variables: let and const
--- teach
Last lesson, every value you printed was typed right inside \`console.log\`. Real programs need to remember values and use them again: how much fuel is left, the name of the mission, whether the engines are on. You met \`const\` and \`let\` for a moment in the HTML course. This lesson explains them properly.

Picture a jar in the kitchen with a label stuck on it that says "sugar". The label is how you find the jar again. You can empty the jar and fill it with something new, and the label still works.

### A name for a value

A **variable** is a name for a value. You make one with the word \`let\`, a name, the equals sign \`=\`, and a value:

\`\`\`js
let fuel = 98
console.log(fuel)            // 98
console.log('Fuel:', fuel)   // Fuel: 98
\`\`\`

Read the first line aloud as "let fuel be 98", or "fuel **gets** 98". \`let\` means "make a new name". The \`=\` is not asking a question as it does in maths. It is an order: *take the value on the right and stick the name on the left onto it*. Giving a name its value is called **[[assignment|assignment]]**.

Once a variable exists, you can use its name anywhere you would use the value.

**Watch out:** \`console.log(fuel)\` and \`console.log('fuel')\` do different things. With no quotes, \`fuel\` is a variable, so JavaScript prints the value it holds: \`98\`. In quotes, \`'fuel'\` is a string, so JavaScript prints the word itself: \`fuel\`.

### Changing the value

A \`let\` variable can be given a new value later. This is called **reassigning** it. You write the name, \`=\`, and the new value, with no \`let\` this time, because the name already exists:

\`\`\`js
let fuel = 98
fuel = 75
console.log(fuel)   // 75
\`\`\`

The right-hand side can use the variable itself. JavaScript works out the right side first, using the old value, and only then moves the label:

\`\`\`js
let score = 10
score = score + 5    // 10 + 5, so score is now 15
console.log(score)   // 15
\`\`\`

Adding to a variable is so common that it has a short form. \`score += 5\` means "add 5 to score", exactly like \`score = score + 5\`. In the same way \`-=\` takes away, \`*=\` multiplies and \`/=\` divides:

\`\`\`js
let altitude = 100
altitude += 20    // now 120
altitude -= 50    // now 70
console.log(altitude)   // 70
\`\`\`

**Watch out:** write \`let\` only once per name, the first time. Writing \`let score = 20\` a second time stops the program with \`SyntaxError: Identifier 'score' has already been declared\`. To change it, leave the \`let\` off.

### const: a name that never changes

Make a variable with \`const\` instead of \`let\`, and it can never be reassigned. \`const\` is short for "constant", something that stays the same. Trying to change one stops the program with an error:

\`\`\`js error
const crew = 4
crew = 5   // TypeError: Assignment to constant variable.
\`\`\`

So which one should you use? [[Prefer const|prefer-const]]. Use \`let\` only for a name that really will change, like a running total. A \`const\` tells the person reading your code, "this name means the same thing all the way down", and that is one less thing to keep track of.

### Values come in kinds

Values do not all look alike. The kind of a value is called its **type**. JavaScript's basic types are:

- **string** — text, in quotes: \`'Ada'\`.
- **number** — any number, whole or with a decimal point: \`36\` and \`1.65\` are both numbers. JavaScript has [[only one number type|one-number]]. Write big numbers with no commas: two million is \`2000000\`.
- **boolean** — a yes-or-no value. There are only two: \`true\` and \`false\`, in small letters and with no quotes.
- \`undefined\` — "no value yet". A variable made with \`let\` and no \`=\` holds \`undefined\` until you give it something.
- \`null\` — "empty on purpose". You put \`null\` in a variable to say "there is deliberately nothing here".

The last two sound alike, so here is the [[difference between them|null-undefined]] in one line: \`undefined\` is what JavaScript gives you when nothing was set, and \`null\` is what *you* write when you mean "nothing".

\`\`\`js
const mission = 'Artemis'   // a string
const crewSize = 4          // a number
const heightM = 98.3        // a number too
const isCrewed = true       // a boolean
let nextStop                // undefined: no value yet
const backupPilot = null    // empty on purpose
\`\`\`

### typeof: asking what kind

\`typeof\` (read "type of") goes in front of a value and gives back the name of its type, as a string:

\`\`\`js
console.log(typeof 'Artemis')   // string
console.log(typeof 98.3)        // number
console.log(typeof false)       // boolean
\`\`\`

It works on variables too: with \`heightM\` from above, \`typeof heightM\` is \`'number'\`.

**Watch out:** \`typeof null\` gives \`'object'\`, not \`'null'\`. That is a [[famous mistake in JavaScript itself|typeof-null]], kept for decades so that old websites keep working. Remember it as the one odd case.

### Choosing good names

A variable name can use letters, digits, the underscore \`_\` and the dollar sign \`$\`. It cannot contain spaces, and it cannot start with a digit. Capitals matter: \`fuel\` and \`Fuel\` are two different names.

JavaScript programmers write names in **[[camelCase|camel-case]]**: the first word in small letters, then a capital at the start of each word after it, as in \`maxSpeed\` or \`fuelLeftKg\`. Pick names that say what the value is. \`heightM\` says it is a height in meters; \`h\` says almost nothing.

::: context assignment The equals sign points left
In maths, "x = 5" and "5 = x" say the same thing. In JavaScript they do not. JavaScript always works out the right-hand side first and then gives that value the name on the left. So \`fuel = 98\` works, and \`98 = fuel\` is an error: you cannot stick a label called \`98\` on anything. That is also why \`score = score + 5\` makes sense, even though it looks impossible as a maths equation.
:::

::: context prefer-const Why engineers reach for const first
In a long program, a value that can change anywhere is a value you have to watch everywhere. If \`total\` is a \`let\`, any line below might have changed it, so to know what it holds you must read them all. If it is a \`const\`, you know at a glance: it is what it was given. Most modern JavaScript style guides say "use const by default, let when you must", and there is an older word, \`var\`, that you will see in old code. \`var\` behaves in surprising ways, so new code avoids it.
:::

::: context one-number One type for every number
Many languages keep whole numbers and decimals as two separate types. JavaScript stores every number the same way, as a decimal number in a standard format called "double-precision floating point". That is why \`typeof 4\` and \`typeof 4.5\` both say \`'number'\`. It also means whole numbers are only exact up to about nine thousand million million, which is far more than everyday programs need.
:::

::: context null-undefined Empty jar or no jar yet
Picture a shelf. \`undefined\` is a label on a jar nobody has filled yet. \`null\` is a jar someone has deliberately emptied and put back, to say "nothing in here, on purpose". In real code you meet \`undefined\` when you read something that was never set, like a setting the user never chose. You write \`null\` yourself, for example \`let winner = null\` before a race has a result.
:::

::: context typeof-null A bug that became a rule
In the very first version of JavaScript, written in 1995 in about ten days, values were stored with a small tag saying their type, and the tag for "object" was zero. \`null\` was stored as all zeros too, so \`typeof null\` came out as \`'object'\`. A fix was proposed years later, but it would have broken a great many existing websites, so the mistake was kept on purpose. Every JavaScript engine still gives \`'object'\` today.
:::

::: context camel-case Humps in the middle
A name like \`fuelLeftKg\` has capital letters sticking up in the middle, like the humps of a camel, and that is where the name comes from. Most JavaScript code uses camelCase for variables and functions, so following it makes your code look like everyone else's. Putting the unit at the end, as in \`heightM\` or \`thrustKn\`, is a cheap habit that prevents expensive mix-ups between meters and feet.
:::
--- task
Make two variables:

- a \`const\` named \`city\` holding the string \`'Houston'\`
- a \`let\` named \`visitors\` starting at the number \`100\`

Then add \`25\` to \`visitors\` by reassigning it, and print \`city\` and \`visitors\` on one line with a single \`console.log\`, so the output is \`Houston 125\`.
--- starter
// Declare city and visitors, update visitors, print both.

--- solution
const city = 'Houston'
let visitors = 100
visitors = visitors + 25
console.log(city, visitors)
--- hint
Each variable is one line: \`const\` or \`let\`, the name, \`=\`, then the value. Text goes in quotes; the number does not.
--- hint
To add 25, reassign \`visitors\` with no \`let\` in front: the right-hand side is the old value plus 25. The short form \`+=\` works too.
--- hint
The last line is one \`console.log\` with two arguments, the two names, with no quotes around them, because you want their values, not the words.
--- check case | city is 'Houston'
city
=> 'Houston'
--- check case | visitors ended at 125
visitors
=> 125
--- check source | city is declared with const
\\bconst\\s+city\\b
--- check source | visitors is declared with let
\\blet\\s+visitors\\b
--- check output | Prints: Houston 125
Houston 125

+++ practice | A rover's record
--- task
Make four variables about a Mars rover:

- a \`const\` named \`rover\` holding the string \`'Perseverance'\`
- a \`const\` named \`landedYear\` holding the number \`2021\`
- a \`let\` named \`driveKm\` holding the number \`28.9\`
- a \`const\` named \`isDriving\` holding \`true\`

Then print two lines. The first uses one \`console.log\` with \`rover\` and \`landedYear\`. The second uses one \`console.log\` with the text \`'Driving:'\` and \`isDriving\`. The output should be:

\`\`\`
Perseverance 2021
Driving: true
\`\`\`
--- starter
// Make the four variables, then print the two lines.

--- solution
const rover = 'Perseverance'
const landedYear = 2021
let driveKm = 28.9
const isDriving = true
console.log(rover, landedYear)
console.log('Driving:', isDriving)
--- hint
Each variable is one line: \`const\` or \`let\`, the name, \`=\`, the value. Text goes in quotes; numbers and \`true\` do not.
--- hint
\`true\` is written in small letters. To print a variable's value, write its name with no quotes around it.
--- check case | rover is 'Perseverance'
rover
=> 'Perseverance'
--- check test | landedYear is 2021 and driveKm is 28.9, both numbers
landedYear === 2021 && driveKm === 28.9
?? Write both numbers with no quotes.
--- check case | isDriving is true
isDriving
=> true
--- check source | rover is a const and driveKm is a let
\\bconst\\s+rover\\b[\\s\\S]*\\blet\\s+driveKm\\b
--- check output | Prints the two lines
Perseverance 2021
Driving: true

+++ practice | Keep the old value
--- task
The starter makes \`let fuel = 100\`.

1. Make a \`const\` named \`startFuel\` that holds the same value as \`fuel\`. Write the name \`fuel\` on the right of the \`=\`, not the number \`100\`.
2. Then reassign \`fuel\` to \`64\`.
3. Print one line with one \`console.log\` and four values: the text \`'Start:'\`, \`startFuel\`, the text \`'Now:'\` and \`fuel\`.

The output should be:

\`\`\`
Start: 100 Now: 64
\`\`\`
--- starter
let fuel = 100

--- solution
let fuel = 100
const startFuel = fuel
fuel = 64
console.log('Start:', startFuel, 'Now:', fuel)
--- hint
A variable's name can go anywhere its value could, including on the right of \`=\`.
--- hint
\`startFuel\` gets the value \`fuel\` holds at that moment, which is 100. Changing \`fuel\` afterwards moves only the \`fuel\` label.
--- check test | startFuel kept 100 and fuel is 64
startFuel === 100 && fuel === 64
?? Make startFuel before you change fuel.
--- check source | startFuel is copied from fuel, not typed
\\bconst\\s+startFuel\\s*=\\s*fuel\\b
--- check output | Prints both values
Start: 100 Now: 64

+++ practice | A running altitude
--- task
A balloon's altitude changes during a flight. Write a program that:

1. makes a \`let\` named \`altitudeKm\` starting at \`0\`;
2. adds \`12\` to it with \`+=\`;
3. adds \`9\` to it with \`+=\`;
4. takes \`4\` away from it with \`-=\`;
5. prints \`Altitude:\`, the value, and \`km\` with one \`console.log\`.

The output should be:

\`\`\`
Altitude: 17 km
\`\`\`
--- starter
let altitudeKm = 0
console.log('Altitude:', altitudeKm, 'km')
--- solution
let altitudeKm = 0
altitudeKm += 12
altitudeKm += 9
altitudeKm -= 4
console.log('Altitude:', altitudeKm, 'km')
--- hint
\`altitudeKm += 12\` means "add 12 to altitudeKm". \`-=\` takes away in the same way.
--- hint
The order matters: every change must come before the \`console.log\`, because the program runs top to bottom.
--- check case | altitudeKm ends at 17
altitudeKm
=> 17
--- check source | Uses += to climb
altitudeKm\\s*\\+=\\s*12[\\s\\S]*altitudeKm\\s*\\+=\\s*9
--- check source | Uses -= to drop
altitudeKm\\s*-=\\s*4
--- check output | Prints the altitude
Altitude: 17 km

+++ practice | Values that look alike
--- task
Some values look alike but are different types. Make these four variables:

- a \`const\` named \`countNumber\` holding the number \`7\`
- a \`const\` named \`countText\` holding the string \`'7'\`
- a \`const\` named \`nothing\` holding \`null\`
- a \`let\` named \`notYet\` with no value at all (no \`=\`)

Then print the type of each, in that order, with one \`console.log\` and four \`typeof\` values. The output should be:

\`\`\`
number string object undefined
\`\`\`
--- starter
// Four variables, then one console.log with four typeof values.

--- solution
const countNumber = 7
const countText = '7'
const nothing = null
let notYet
console.log(typeof countNumber, typeof countText, typeof nothing, typeof notYet)
--- hint
Quotes make a string. \`7\` is a number, and \`'7'\` is text made of the character 7.
--- hint
\`let notYet\` with nothing after it makes the name and leaves it \`undefined\`.
--- hint
Put \`typeof\` in front of each name, and separate the four with commas. \`typeof null\` is the odd one: it says \`object\`.
--- check case | countText is the string '7'
countText
=> '7'
--- check test | countNumber is the number 7
typeof countNumber === 'number' && countNumber === 7
--- check case | nothing is null
nothing
=> null
--- check test | notYet exists and holds undefined
notYet === undefined
?? Write let notYet on a line of its own, with no = after it.
--- check output | Prints the four types
number string object undefined

+++ practice | Fix the lives counter
--- task
This program should print:

\`\`\`
Lives: 3
Lives: 2
\`\`\`

It prints the first line, then stops with \`TypeError: Assignment to constant variable.\` Fix it by changing one word, so that \`lives\` really can change. Keep the name \`lives\`.
--- starter
const lives = 3
console.log('Lives:', lives)
lives = lives - 1
console.log('Lives:', lives)
--- solution
let lives = 3
console.log('Lives:', lives)
lives = lives - 1
console.log('Lives:', lives)
--- hint
The error says the program tried to reassign a name that is not allowed to change.
--- hint
A name made with \`const\` can never be reassigned. Which word makes a name that can?
--- check output | Prints both lines
Lives: 3
Lives: 2
--- check source | lives is a let now
\\blet\\s+lives\\b
--- check case | lives ends at 2
lives
=> 2

+++ practice | A balloon flight card
--- task
A weather balloon has landed. Make these variables, with exactly these names:

- \`balloonId\`: a \`const\` holding the text \`WB-7\`
- \`launchSite\`: a \`const\` holding the text \`Kiruna\`
- \`burstKm\`: a \`let\` holding the number \`33.1\`
- \`recovered\`: a \`const\` holding the boolean for no

Then a correction comes in. On its own line, after the variables and before any \`console.log\`, reassign \`burstKm\` to \`32.8\`.

Finally print this card, one \`console.log\` per line, with every value coming from a variable. The last line uses \`typeof\`:

\`\`\`
Balloon: WB-7
Site: Kiruna
Burst at: 32.8 km  Recovered: false
Type of altitude: number
\`\`\`
--- starter
// Make the variables, correct burstKm, then print the card.

--- solution
const balloonId = 'WB-7'
const launchSite = 'Kiruna'
let burstKm = 33.1
const recovered = false
burstKm = 32.8
console.log('Balloon:', balloonId)
console.log('Site:', launchSite)
console.log('Burst at:', burstKm, 'km ', 'Recovered:', recovered)
console.log('Type of altitude:', typeof burstKm)
--- hint
Text values go in quotes. Numbers and \`false\` do not. Only \`burstKm\` changes, so only it is a \`let\`.
--- hint
Reassigning is one more line with the name, \`=\` and the new value, and no \`let\`.
--- hint
Line 3 has two spaces before \`Recovered:\`. \`console.log\` adds one; end the text \`'km '\` with the other.
--- check test | The text values are right
balloonId === 'WB-7' && launchSite === 'Kiruna'
--- check test | burstKm was corrected to 32.8 and recovered is false
burstKm === 32.8 && recovered === false
--- check source | burstKm is a let, corrected on its own line
\\blet\\s+burstKm\\s*=\\s*33\\.1[\\s\\S]*\\n\\s*burstKm\\s*=\\s*32\\.8
--- check source | The names that never change are const
\\bconst\\s+balloonId\\b[\\s\\S]*\\bconst\\s+recovered\\b
--- check output | Prints the card
Balloon: WB-7
Site: Kiruna
Burst at: 32.8 km  Recovered: false
Type of altitude: number

=== js-03 | Numbers and math
--- teach
Last lesson you stored numbers in variables. Now you will calculate with them: add up a bill, split a crew into teams, round a measurement. JavaScript works like a calculator that you control with code.

### The four everyday operators

An **operator** is a symbol that does something to the values on either side of it. JavaScript uses these four for everyday sums:

- \`+\` (plus) adds
- \`-\` (minus) takes away
- \`*\` (star) multiplies. There is no × key, so the star stands in for it.
- \`/\` (slash) divides

\`\`\`js
console.log(8 + 2)   // 10
console.log(8 - 2)   // 6
console.log(8 * 2)   // 16
console.log(8 / 2)   // 4
\`\`\`

Division gives a decimal whenever it needs one. \`7 / 2\` is \`3.5\`, not 3. JavaScript never throws away the part after the point unless you ask it to.

They work on variables the same way:

\`\`\`js
const widthM = 4
const lengthM = 6
console.log(widthM * lengthM)   // 24
\`\`\`

### Which part goes first

\`*\` and \`/\` are done before \`+\` and \`-\`, exactly as in school maths. Brackets go first of all. These rules are called **[[the order of operations|precedence]]**:

\`\`\`js
console.log(2 + 3 * 4)     // 14: 3 * 4 first, then 2 + 12
console.log((2 + 3) * 4)   // 20: the brackets first, then 5 * 4
\`\`\`

When in doubt, add brackets. They cost nothing and make your meaning plain.

### The remainder: %

Share 17 sweets between 5 friends. Each friend gets 3, and 2 are left over. The \`%\` operator gives you that leftover. It is called the **[[remainder|remainder]]** operator, and you read \`17 % 5\` as "17 remainder 5" or "17 mod 5":

\`\`\`js
console.log(17 % 5)   // 2: 5 goes into 17 three times, with 2 left over
console.log(20 % 5)   // 0: nothing left over
console.log(9 % 2)    // 1
\`\`\`

A remainder of 0 means the first number divides exactly by the second. So \`n % 2\` is \`0\` when \`n\` is even and \`1\` when it is odd.

### Powers: **

Two stars, \`**\`, raise a number to a power. \`2 ** 3\` means 2 times 2 times 2:

\`\`\`js
console.log(2 ** 3)    // 8
console.log(10 ** 6)   // 1000000, a million
\`\`\`

### Rounding and choosing: Math

JavaScript comes with a toolbox called **[[Math|math-object]]** (capital M). Each tool is written \`Math.\`, a dot, then the tool's name, with the number in brackets:

- \`Math.round(x)\` rounds to the nearest whole number: \`Math.round(2.6)\` is \`3\`, and \`Math.round(2.4)\` is \`2\`.
- \`Math.floor(x)\` always rounds **down**: \`Math.floor(2.6)\` is \`2\`. Think of the floor, below you.
- \`Math.ceil(x)\` always rounds **up**: \`Math.ceil(2.1)\` is \`3\`. "Ceil" is short for ceiling, above you.
- \`Math.max(a, b, …)\` gives the biggest of the numbers you hand it: \`Math.max(3, 9, 4)\` is \`9\`.
- \`Math.min(a, b, …)\` gives the smallest: \`Math.min(3, 9, 4)\` is \`3\`.

### Decimals are approximate

Try adding 0.1 and 0.2:

\`\`\`js
console.log(0.1 + 0.2)   // 0.30000000000000004
\`\`\`

That is not a bug in your program. Computers store numbers in binary, and most decimals, like 0.1, cannot be stored exactly in binary, the same way 1/3 cannot be written exactly in decimal (0.3333…). The tiny error shows up in the last digit. This is called **[[floating-point|floating-point]]** error, and every programming language has it.

### toFixed: a set number of decimals

To tidy a decimal, use \`toFixed\`. Put it after the number with a dot, and say in the brackets how many digits you want after the point:

\`\`\`js
const sum = 0.1 + 0.2
console.log(sum.toFixed(2))   // 0.30
console.log(sum.toFixed(5))   // 0.30000
\`\`\`

Here is the catch: \`toFixed\` hands back a **string**, text that looks like a number. To turn text back into a real number, wrap it in \`Number(…)\`:

\`\`\`js
const tidy = Number('0.30')
console.log(tidy)          // 0.3
console.log(typeof tidy)   // number
\`\`\`

\`Number\` turns any text that looks like a number into that number: \`Number('42')\` is \`42\`. Text that is not a number at all, like \`Number('abc')\`, gives the special value **[[NaN|nan]]**, short for "Not a Number".

**Watch out:** if you forget \`Number\`, the "number" is still text, and \`+\` between text and a number *joins* them instead of adding, as it did in the HTML course. \`'0.30' + 1\` is \`'0.301'\`, not \`1.3\`. If your total ever looks like digits glued together, a string has sneaked in.

You will use all of this on prices for an AI model, which are charged per **[[token|tokens]]**.

::: context precedence Why there is an order at all
Without an agreed order, \`2 + 3 * 4\` could mean 20 or 14, and two people would get different answers from the same line. Maths settled long ago that multiplying and dividing come before adding and taking away, and programming languages copied the rule so that code reads like the maths it came from. Programmers call it operator precedence. Nobody remembers every rule for every operator, so experienced engineers add brackets whenever a reader might hesitate.
:::

::: context remainder Where remainders turn up
Remainders are everywhere once you look. A clock is remainder arithmetic: 10 hours after 9 o'clock is \`(9 + 10) % 12\`, which is 7. Programs use \`% 2\` to tell even from odd, \`% 7\` to find the day of the week, and \`% 60\` to split seconds into minutes and seconds. One trap: in JavaScript the remainder keeps the sign of the first number, so \`-7 % 3\` is \`-1\`, not 2.
:::

::: context math-object A toolbox called Math
\`Math\` is a ready-made object that holds number tools and a few constants. Besides \`round\`, \`floor\`, \`ceil\`, \`max\` and \`min\`, it has \`Math.abs(x)\`, the size of a number without its sign, so \`Math.abs(-5)\` is \`5\`. It has \`Math.sqrt(x)\` for square roots and \`Math.random()\` for a random decimal between 0 and 1. It also holds \`Math.PI\`, about 3.14159. You will meet the dot again and again: it means "the thing named after the dot, which belongs to the thing before it".
:::

::: context floating-point Why 0.1 + 0.2 is not 0.3
A computer stores a decimal number as a binary fraction with a fixed number of digits. One tenth in binary is 0.000110011001100… repeating forever, so it gets cut off, and the stored value is a hair away from 0.1. Add two slightly-off numbers and the error can show. Banks and shops avoid it by counting money in whole cents, so 19.99 dollars is stored as the whole number 1999. For measurements, rounding the answer with \`toFixed\` before you show it is usually enough.
:::

::: context nan Not a Number, but a number
\`NaN\` is a strange value: its type is \`'number'\`, yet it means "this is not a real number". You get it from \`Number('abc')\`, or from sums that make no sense, like \`0 / 0\`. Any sum involving \`NaN\` gives \`NaN\` again, so one bad value spreads through a whole calculation. When a total comes out as \`NaN\`, look for text that could not be turned into a number, or a value that was missing.
:::

::: context tokens What a token is, and why it costs money
Large language models do not read text letter by letter. They cut it into **tokens**: whole short words, or pieces of longer ones. In English, one token is about three quarters of a word on average. Companies that sell model access charge by the token, often a different price for the tokens you send in (input) and the tokens the model writes back (output). The prices are tiny per token, so an AI engineer's cost estimates are full of very small decimals, which is exactly where \`toFixed\` earns its keep.
:::
--- task
A request to an AI model used \`1250\` input tokens and \`380\` output tokens. Input costs \`0.000003\` dollars a token, and output costs \`0.000015\` dollars a token.

Change the line \`const cost = 0\` so that \`cost\` holds the total price: each token count times its price, added together, then rounded to 6 decimals and turned back into a number with \`Number(…toFixed(6))\`. Leave the \`console.log\` as it is. It should print \`0.00945\`.
--- starter
const inputTokens = 1250
const outputTokens = 380
const cost = 0
console.log(cost)
--- solution
const inputTokens = 1250
const outputTokens = 380
const cost = Number((inputTokens * 0.000003 + outputTokens * 0.000015).toFixed(6))
console.log(cost)
--- hint
Multiply each count by its own price, using the variables \`inputTokens\` and \`outputTokens\`, and add the two results.
--- hint
\`*\` is done before \`+\`, so the sum needs no extra brackets. But to call \`toFixed\` on the whole sum, wrap the sum in brackets first: \`( … ).toFixed(6)\`.
--- hint
\`toFixed\` gives text. Wrap the whole thing in \`Number( … )\` to turn it back into a number.
--- check test | cost is the total in dollars
Math.abs(cost - 0.00945) < 1e-12
--- check source | Computes it with *
\\*
--- check output | Prints the cost
0.00945

+++ practice | Minutes and seconds
--- task
A burn lasted \`754\` seconds. The starter stores that in \`totalSeconds\`. Make two more variables:

- \`minutes\`: how many whole minutes fit into \`totalSeconds\`. Divide by 60 and round **down** with \`Math.floor\`.
- \`seconds\`: the seconds left over after those minutes. Use \`%\`.

Then print them with one \`console.log\`, so the output is exactly:

\`\`\`
12 min 34 s
\`\`\`
--- starter
const totalSeconds = 754

--- solution
const totalSeconds = 754
const minutes = Math.floor(totalSeconds / 60)
const seconds = totalSeconds % 60
console.log(minutes, 'min', seconds, 's')
--- hint
754 divided by 60 is 12.566…, and you want only the whole 12. Which \`Math\` tool always rounds down?
--- hint
\`%\` gives what is left after taking out as many 60s as fit.
--- hint
The \`console.log\` takes four values: \`minutes\`, the text \`'min'\`, \`seconds\`, and the text \`'s'\`.
--- check case | minutes is 12
minutes
=> 12
--- check case | seconds is 34
seconds
=> 34
--- check source | Uses the remainder operator
%\\s*60
--- check output | Prints the time
12 min 34 s

+++ practice | Celsius to Fahrenheit
--- task
The starter stores a body temperature, \`36.6\` degrees Celsius, in \`celsius\`.

Make a \`const\` named \`fahrenheit\`: the Celsius value times 9, divided by 5, plus 32, rounded to **1** decimal and turned back into a number. Then print one line, exactly:

\`\`\`
36.6 C is 97.9 F
\`\`\`
--- starter
const celsius = 36.6

--- solution
const celsius = 36.6
const fahrenheit = Number((celsius * 9 / 5 + 32).toFixed(1))
console.log(celsius, 'C is', fahrenheit, 'F')
--- hint
Write the formula with \`*\`, \`/\` and \`+\`. Multiplying and dividing happen before adding, so it needs no extra brackets inside.
--- hint
The raw answer has a long tail of digits. Wrap the whole formula in brackets, call \`toFixed(1)\`, then wrap that in \`Number( … )\`.
--- check test | fahrenheit is 97.9
fahrenheit === 97.9
?? Round to one decimal with toFixed(1), then turn it back into a number.
--- check test | fahrenheit is a number, not text
typeof fahrenheit === 'number'
--- check output | Prints the conversion
36.6 C is 97.9 F

+++ practice | A battery that drains
--- task
A probe starts with its battery at 100 percent. Each orbit uses 7 percent of whatever charge is left, so after each orbit the charge is 0.93 times what it was.

1. The starter has \`let charge = 100\`. Below it, multiply \`charge\` by \`0.93\` three times, using \`*=\` each time.
2. Make a \`const\` named \`afterThree\` holding \`charge\` rounded to 2 decimals, as a number.
3. Make a \`const\` named \`withPower\` that gets the same answer in one go: 100 times 0.93 to the power 3, using \`**\`, rounded to 2 decimals, as a number.
4. Print \`After 3 orbits:\`, \`afterThree\` and \`percent\` with one \`console.log\`.

The output should be:

\`\`\`
After 3 orbits: 80.44 percent
\`\`\`
--- starter
let charge = 100

--- solution
let charge = 100
charge *= 0.93
charge *= 0.93
charge *= 0.93
const afterThree = Number(charge.toFixed(2))
const withPower = Number((100 * 0.93 ** 3).toFixed(2))
console.log('After 3 orbits:', afterThree, 'percent')
--- hint
\`charge *= 0.93\` means "set charge to charge times 0.93". Write that line three times.
--- hint
\`0.93 ** 3\` is 0.93 times itself three times. \`**\` is done before \`*\`, so \`100 * 0.93 ** 3\` needs no extra brackets inside.
--- hint
Both answers are rounded the same way: \`Number(( … ).toFixed(2))\`.
--- check test | afterThree is 80.44
afterThree === 80.44
--- check test | withPower gets the same answer
withPower === 80.44
?? Use 100 * 0.93 ** 3, then round to 2 decimals.
--- check source | Uses *= on charge
charge\\s*\\*=\\s*0\\.93
--- check source | Uses ** for the power
\\*\\*\\s*3
--- check output | Prints the charge
After 3 orbits: 80.44 percent

+++ practice | Enough vans for everyone
--- task
Each van holds \`5\` people (the starter stores that in \`seatsPerVan\`). Nobody can be left behind, so a group of 12 needs 3 vans, even though the third is not full.

Make these four variables, all with \`Math.ceil\`:

- \`vansFor12\`: vans needed for 12 people
- \`vansFor10\`: vans needed for 10 people
- \`vansFor0\`: vans needed for 0 people
- \`emptySeatsFor12\`: how many seats are empty when 12 people ride in \`vansFor12\` vans (all the seats, minus 12)

Then print the four values with one \`console.log\`, in that order. The output should be \`3 2 0 3\`.
--- starter
const seatsPerVan = 5

--- solution
const seatsPerVan = 5
const vansFor12 = Math.ceil(12 / seatsPerVan)
const vansFor10 = Math.ceil(10 / seatsPerVan)
const vansFor0 = Math.ceil(0 / seatsPerVan)
const emptySeatsFor12 = vansFor12 * seatsPerVan - 12
console.log(vansFor12, vansFor10, vansFor0, emptySeatsFor12)
--- hint
12 divided by 5 is 2.4. Rounding to the nearest gives 2, which leaves two people behind. You must always round up.
--- hint
Ten people fill exactly two vans: rounding up 2 leaves it at 2. Zero people need zero vans.
--- hint
All the seats are \`vansFor12 * seatsPerVan\`. Take 12 away from that for the empty ones.
--- check case | 12 people need 3 vans
vansFor12
=> 3
--- check case | 10 people fill exactly 2 vans
vansFor10
=> 2
--- check case | 0 people need 0 vans
vansFor0
=> 0
--- check case | 3 seats are empty for 12 people
emptySeatsFor12
=> 3
--- check output | Prints all four
3 2 0 3

+++ practice | Fix the glued total
--- task
This program should print \`Total: 25\`: the price rounded to 2 decimals (20), plus a 5 dollar fee. Instead it prints \`Total: 20.005\`.

Find the line where the number turns into text, and fix it so \`rounded\` is a real number. Keep the variable names.
--- starter
const price = 19.999
const rounded = price.toFixed(2)
const total = rounded + 5
console.log('Total:', total)
--- solution
const price = 19.999
const rounded = Number(price.toFixed(2))
const total = rounded + 5
console.log('Total:', total)
--- hint
\`20.005\` is the text \`'20.00'\` with \`5\` stuck on the end. Something here is a string, not a number.
--- hint
\`toFixed\` always hands back text. Which tool turns text back into a number?
--- check case | total is 25
total
=> 25
--- check test | rounded is a number
typeof rounded === 'number' && rounded === 20
--- check output | Prints the total
Total: 25

+++ practice | An API bill
--- task
The starter stores the tokens used by three requests to an AI model, and a price of \`2.5\` dollars per million tokens. Make these four variables:

- \`totalTokens\`: the three requests added up
- \`cost\`: \`totalTokens\` divided by a million, times the price, rounded to 6 decimals, as a number
- \`averageTokens\`: \`totalTokens\` divided by 3, rounded to the nearest whole number with \`Math.round\`
- \`biggest\`: the largest of the three requests, using \`Math.max\`

Then print exactly:

\`\`\`
Tokens: 4750
Cost: 0.011875 dollars
Average: 1583 tokens
Biggest: 3100 tokens
\`\`\`
--- starter
const request1 = 1200
const request2 = 450
const request3 = 3100
const pricePerMillion = 2.5

--- solution
const request1 = 1200
const request2 = 450
const request3 = 3100
const pricePerMillion = 2.5
const totalTokens = request1 + request2 + request3
const cost = Number((totalTokens / 1000000 * pricePerMillion).toFixed(6))
const averageTokens = Math.round(totalTokens / 3)
const biggest = Math.max(request1, request2, request3)
console.log('Tokens:', totalTokens)
console.log('Cost:', cost, 'dollars')
console.log('Average:', averageTokens, 'tokens')
console.log('Biggest:', biggest, 'tokens')
--- hint
Build each variable from the ones before it: first the total, then the others from the total.
--- hint
A million is \`1000000\`, or \`10 ** 6\`. Divide first, then multiply by \`pricePerMillion\`, then round with \`toFixed(6)\` and \`Number\`.
--- hint
\`Math.max\` takes all three requests, separated by commas, and gives back the biggest.
--- check case | totalTokens is 4750
totalTokens
=> 4750
--- check test | cost is 0.011875
cost === 0.011875
--- check case | averageTokens is 1583
averageTokens
=> 1583
--- check case | biggest is 3100
biggest
=> 3100
--- check source | Uses Math.max
Math\\.max\\(
--- check output | Prints the bill
Tokens: 4750
Cost: 0.011875 dollars
Average: 1583 tokens
Biggest: 3100 tokens

=== js-04 | Strings and template literals
--- teach
So far you have printed strings and stored them in variables. Real text is messier than that. People type extra spaces, mix capitals, and you need to build sentences out of values. This lesson gives you the tools to tidy text, measure it, search it and build it.

Picture a string as a row of letter tiles on a table, one tile per character, spaces included. You can count the tiles, look at one of them, or make a tidier copy of the row. The tiles themselves are glued down: you never change the row you started with.

### Methods: tools that belong to a value

A **[[method|method]]** is a function that belongs to a value. You call it with a dot after the value, then its name, then round brackets:

\`\`\`js
console.log('orbit'.toUpperCase())   // ORBIT
\`\`\`

Read that as "take \`'orbit'\` and run its \`toUpperCase\` tool". It works on a variable holding a string in exactly the same way.

### Tidying text

Three methods do most of the tidying:

- \`trim()\` takes the spaces off both ends. Spaces in the middle stay.
- \`toLowerCase()\` gives the text in small letters.
- \`toUpperCase()\` gives the text in capital letters.

\`\`\`js
const s = '  Hello World  '
console.log(s.trim())          // Hello World
console.log(s.toLowerCase())   // '  hello world  ' (the spaces stay)
console.log(s.toUpperCase())   // '  HELLO WORLD  '
\`\`\`

### A string never changes

A method never changes the string it is called on. It hands back a **new** string, and the old one stays as it was. Strings are **[[immutable|immutable]]**, which means "can never be changed". To keep the new string, store it:

\`\`\`js
const messy = '  Cape Canaveral '
const tidy = messy.trim()
console.log(tidy)     // Cape Canaveral
console.log(messy)    // '  Cape Canaveral ' (unchanged)
\`\`\`

**Watch out:** a line like \`messy.trim()\` on its own does the work and then throws the answer away. Nothing is stored, and \`messy\` still has its spaces. Always catch the result with \`=\`, or use it straight away.

### Chaining methods

Because a method hands back a string, you can call another method on the result straight away. This is called **chaining**. It runs left to right:

\`\`\`js
const s = '  Hello World  '
console.log(s.trim().toUpperCase())   // HELLO WORLD
\`\`\`

First \`trim()\` makes \`'Hello World'\`, then \`toUpperCase()\` runs on that.

### How long is it: length

\`length\` tells you how many characters a string has. Every character counts, spaces included:

\`\`\`js
const s = '  Hello World  '
console.log(s.length)          // 15
console.log(s.trim().length)   // 11
\`\`\`

**Watch out:** \`length\` is a **property**, a value that belongs to the string, not a tool you run. So it has no brackets. Writing \`s.length()\` stops the program with \`TypeError: s.length is not a function\`.

### One character: square brackets

Each character has a position number, called its **index**. JavaScript counts positions [[from zero|zero-index]], so the first character is at index 0. Put the index in square brackets after the string:

\`\`\`js
const word = 'rocket'
console.log(word[0])                 // r
console.log(word[2])                 // c
console.log(word[word.length - 1])   // t, the last one
\`\`\`

\`'rocket'\` has 6 characters, at indexes 0 to 5. So the last one is at \`length - 1\`, not at \`length\`.

### Searching: includes

\`includes\` answers a yes-or-no question: is this piece of text somewhere inside? It gives back \`true\` or \`false\`:

\`\`\`js
const s = '  Hello World  '
console.log(s.includes('World'))   // true
console.log(s.includes('world'))   // false: capitals count
\`\`\`

To search without caring about capitals, make everything small first: \`s.toLowerCase().includes('world')\` is \`true\`. Engineers do this all the time to [[compare text fairly|case-insensitive]].

### Building strings: template literals

You already know one way to build text: \`+\` joins strings, as in \`'Hello, ' + name\`. With several values, all those \`+\` signs and quote marks get hard to read, and it is easy to forget a space.

A **template literal** is a better way. It is a string written between **[[backticks|backtick]]** \`\` \` \`\` instead of quotes. Inside it, \`\${…}\` (a dollar sign and curly braces) marks a gap, and JavaScript fills the gap with the value of whatever is inside:

\`\`\`js
const name = 'Ada'
const count = 3
console.log(\`\${name} has \${count} new messages\`)   // Ada has 3 new messages
\`\`\`

Any expression works inside \`\${}\` — a sum, a method call, anything that gives a value:

\`\`\`js
const name = 'Ada'
const count = 3
console.log(\`\${count * 2} messages for \${name.toUpperCase()}\`)   // 6 messages for ADA
\`\`\`

::: context method Functions that come with the value
Every string in JavaScript carries a set of tools you can use on it, and those tools are its methods. \`console.log\` is the same idea: \`log\` is a method that belongs to \`console\`. There are dozens of string methods. Besides the ones in this lesson, \`startsWith('x')\` checks the beginning, \`replace('a', 'b')\` swaps the first \`a\` for a \`b\`, and \`split\` cuts text into pieces, which you will meet in the lesson on functions.
:::

::: context immutable Why strings cannot change
If strings could change, a value you had stored might be altered behind your back by some other line of code. Making strings immutable rules that out: once you have a string, it stays exactly as it is. The cost is small, because making a new tidy copy is fast. Python, Java and many other languages make the same choice. Later you will meet arrays and objects, which *can* change, and you will see why that needs more care.
:::

::: context zero-index Why counting starts at 0
Think of the index as "how many steps from the start". The first character is zero steps from the start, the second is one step, and so on. Almost every programming language counts this way, so you will get used to it quickly. The classic slip that follows is called an off-by-one error: reaching for position \`length\` when the last real position is \`length - 1\`. Reading past the end gives \`undefined\` rather than an error, which makes the slip easy to miss.
:::

::: context backtick Where the backtick lives
The backtick \`\` \` \`\` is a different key from the single quote \`'\`. On most English keyboards it sits at the top left, under Esc, next to the 1. On some European keyboards it needs Shift or a second key press. Template literals were added to JavaScript in 2015. Older code builds strings with \`+\` instead, so you will meet both styles.
:::

::: context case-insensitive Comparing text fairly
People type \`Mars\`, \`mars\` and \`MARS\` and mean the same planet. Computers see three different strings. So before comparing or searching text that people typed, engineers usually make it all lowercase and trim the spaces off. Sign-in forms do this with email addresses, search boxes do it with queries, and you will do it whenever text comes from a person rather than from your own code.
:::
--- task
\`raw\` holds a messy user name, with spaces at both ends and capital letters.

1. Change the line \`const clean = raw\` so that \`clean\` holds the name trimmed **and** in small letters.
2. Change the \`console.log\` so it prints exactly this line, using a template literal that takes both the name and its length from \`clean\`:

\`\`\`
user: ada lovelace (12 characters)
\`\`\`
--- starter
const raw = '   Ada Lovelace  '
const clean = raw
console.log(clean)
--- solution
const raw = '   Ada Lovelace  '
const clean = raw.trim().toLowerCase()
console.log(\`user: \${clean} (\${clean.length} characters)\`)
--- hint
Chain two methods on \`raw\`: one to take the spaces off the ends, then one to make the letters small.
--- hint
\`length\` is a property, not a method, so it has no brackets.
--- hint
Write the sentence between backticks, and put \`\${clean}\` where the name goes and \`\${clean.length}\` where the number goes.
--- check case | clean is trimmed and lowercased
clean
=> 'ada lovelace'
--- check source | Uses a template literal
\`[^\`]*\\$\\{
--- check output | Prints the sentence
user: ada lovelace (12 characters)

+++ practice | A loud callsign
--- task
The starter stores a pilot's callsign, \`'falcon'\`, in \`callsign\`.

Print exactly this line, with one \`console.log\` and a template literal:

\`\`\`
Callsign: FALCON (6 letters)
\`\`\`

Take the capital letters and the count from \`callsign\` with a method and a property. Do not type \`FALCON\` or \`6\` yourself.
--- starter
const callsign = 'falcon'

--- solution
const callsign = 'falcon'
console.log(\`Callsign: \${callsign.toUpperCase()} (\${callsign.length} letters)\`)
--- hint
Inside \`\${ }\` you can call a method, like \`\${callsign.toUpperCase()}\`.
--- hint
The count is the string's \`length\`, which has no brackets.
--- check output | Prints the callsign line
Callsign: FALCON (6 letters)
--- check source | Uses a template literal
\`[^\`]*\\$\\{
--- check source | Uses toUpperCase
toUpperCase\\(\\)
--- check source absent | Does not type FALCON by hand
FALCON

+++ practice | An email address
--- task
The starter stores a first name and a last name. Make a \`const\` named \`email\` that holds the address made from them: first name, a dot, last name, then \`@orbit.dev\`, all in small letters. Build it with a template literal, then make it lowercase. Then print it.

The output should be:

\`\`\`
ada.lovelace@orbit.dev
\`\`\`
--- starter
const first = 'Ada'
const last = 'Lovelace'

--- solution
const first = 'Ada'
const last = 'Lovelace'
const email = \`\${first}.\${last}@orbit.dev\`.toLowerCase()
console.log(email)
--- hint
A template literal can hold several gaps and plain text between them: \`\${first}.\${last}\` puts a dot between the names.
--- hint
A template literal is a string, so you can call \`toLowerCase()\` straight after its closing backtick.
--- check case | email is ada.lovelace@orbit.dev
email
=> 'ada.lovelace@orbit.dev'
--- check source | Built with a template literal
\`[^\`]*\\$\\{
--- check output | Prints the address
ada.lovelace@orbit.dev

+++ practice | A progress line
--- task
A mission has \`done\` tasks finished out of \`total\`. Make a \`const\` named \`line\` holding exactly:

\`\`\`
Progress: 7/12 (58%)
\`\`\`

Build it with a template literal from \`done\` and \`total\`. The percent is \`done\` divided by \`total\`, times 100, rounded to the nearest whole number with \`Math.round\`. Then print \`line\`.
--- starter
const done = 7
const total = 12

--- solution
const done = 7
const total = 12
const line = \`Progress: \${done}/\${total} (\${Math.round(done / total * 100)}%)\`
console.log(line)
--- hint
7 divided by 12, times 100, is 58.33…. \`Math.round\` makes it 58.
--- hint
The sum can go straight inside \`\${ }\`. The \`%\` sign after it is plain text, outside the gap.
--- check case | line is the progress text
line
=> 'Progress: 7/12 (58%)'
--- check source | Built with a template literal
\`[^\`]*\\$\\{
--- check output | Prints the progress line
Progress: 7/12 (58%)

+++ practice | Searching a log line
--- task
The starter stores a log line and a string of three spaces. Make four variables:

- \`hasWarning\`: whether \`log\` contains the word \`warning\`, **ignoring capitals**. Here that is \`true\`.
- \`hasError\`: whether \`log\` contains \`error\`, ignoring capitals. Here that is \`false\`.
- \`blankLength\`: how many characters are left in \`blank\` after trimming it. Here that is \`0\`.
- \`lastChar\`: the last character of \`log\`, found with square brackets and \`length\`. Do not type the letter yourself.

Then print the four values with one \`console.log\`. The output should be \`true false 0 w\`.
--- starter
const log = 'Engine WARNING: pressure low'
const blank = '   '

--- solution
const log = 'Engine WARNING: pressure low'
const blank = '   '
const hasWarning = log.toLowerCase().includes('warning')
const hasError = log.toLowerCase().includes('error')
const blankLength = blank.trim().length
const lastChar = log[log.length - 1]
console.log(hasWarning, hasError, blankLength, lastChar)
--- hint
\`includes\` cares about capitals, and the log says \`WARNING\` in capitals. Make the log small first, then search.
--- hint
Trimming a string of only spaces leaves an empty string, whose length is 0.
--- hint
The last index is one less than the length, because counting starts at 0.
--- check case | hasWarning ignores capitals
hasWarning
=> true
--- check case | hasError is false
hasError
=> false
--- check case | blankLength is 0
blankLength
=> 0
--- check case | lastChar is w
lastChar
=> 'w'
--- check source | lastChar is found with length, not typed
log\\[\\s*log\\.length\\s*-\\s*1\\s*\\]
--- check output | Prints all four
true false 0 w

+++ practice | Fix the untrimmed planet
--- task
This program should print the planet's name in square brackets with no spaces:

\`\`\`
[Mars]
\`\`\`

Instead it prints \`[  Mars  ]\`. The \`trim()\` runs, but its result is thrown away. Fix it: store the trimmed text in a new \`const\` named \`planet\`, and use \`planet\` in the template literal.
--- starter
const raw = '  Mars  '
raw.trim()
console.log(\`[\${raw}]\`)
--- solution
const raw = '  Mars  '
const planet = raw.trim()
console.log(\`[\${planet}]\`)
--- hint
A string method never changes the string it runs on. It hands back a new one.
--- hint
Catch the new string with \`const planet = …\`, then put \`planet\` inside the \`\${ }\`.
--- check case | planet is Mars
planet
=> 'Mars'
--- check source | planet comes from raw.trim()
const\\s+planet\\s*=\\s*raw\\.trim\\(\\)
--- check output | Prints [Mars]
[Mars]

+++ practice | A mission tag
--- task
The starter stores a mission name typed carelessly, a flight number and a crew size. Make these variables:

- \`name\`: \`mission\` trimmed and in capital letters, so \`'ARTEMIS'\`
- \`tag\`: \`name\`, a dash, then the flight number, so \`'ARTEMIS-2'\`
- \`initial\`: the first character of \`name\`, so \`'A'\`
- \`isLunar\`: whether \`mission\` contains \`artemis\`, so \`true\`

Then print exactly this line, built with a template literal from your variables:

\`\`\`
ARTEMIS-2 | crew of 4 | 7 letters | starts with A
\`\`\`

The number of letters is the length of \`name\`.
--- starter
const mission = '  artemis '
const flightNumber = 2
const crew = 4

--- solution
const mission = '  artemis '
const flightNumber = 2
const crew = 4
const name = mission.trim().toUpperCase()
const tag = \`\${name}-\${flightNumber}\`
const initial = name[0]
const isLunar = mission.includes('artemis')
console.log(\`\${tag} | crew of \${crew} | \${name.length} letters | starts with \${initial}\`)
--- hint
Build each variable from the ones before it. \`name\` comes from chaining two methods on \`mission\`.
--- hint
The first character is at index 0. The length of \`name\` is 7 only after trimming, so measure \`name\`, not \`mission\`.
--- hint
The last line is one template literal with four gaps: \`tag\`, \`crew\`, the length of \`name\` and \`initial\`.
--- check case | name is ARTEMIS
name
=> 'ARTEMIS'
--- check case | tag is ARTEMIS-2
tag
=> 'ARTEMIS-2'
--- check case | initial is A
initial
=> 'A'
--- check case | isLunar is true
isLunar
=> true
--- check output | Prints the summary line
ARTEMIS-2 | crew of 4 | 7 letters | starts with A

=== js-05 | Making decisions
--- teach
Until now, every program you wrote ran every line, top to bottom, every time. Real programs choose: refuel *if* the tank is low, print a warning *only when* the wind is too strong. This lesson shows you how a program makes a choice.

Picture a guard at a gate with a rule card: "If the visitor has a pass, open the gate. Otherwise, send them to the desk." The guard asks one yes-or-no question and does one of two things depending on the answer.

### Comparisons give true or false

The question a program asks is a **comparison**, and its answer is always a boolean: \`true\` or \`false\`. These are the comparison operators:

- \`>\` greater than, and \`<\` less than
- \`>=\` greater than or equal to, and \`<=\` less than or equal to
- \`===\` (three equals signs) is equal to
- \`!==\` (an exclamation mark and two equals signs) is not equal to

\`\`\`js
console.log(5 > 3)          // true
console.log(5 >= 5)         // true
console.log(4 === 4)        // true
console.log('go' !== 'go')  // false
console.log(1 === '1')      // false: a number is never equal to a string
\`\`\`

\`===\` is called **strict** equality: two values are equal only if they are the same type *and* the same value. The number \`1\` and the string \`'1'\` are different types, so they are not equal. JavaScript also has a [[loose version, two equals signs|loose-equality]], which tries to convert the types first and often surprises people. Avoid \`==\` and always use \`===\` and \`!==\`.

**Watch out:** one equals sign \`=\` is assignment, which gives a name a value. Three equals signs \`===\` is the question "are these equal?". Mixing them up is one of the most common slips in all of programming.

### if: do this only when

\`if\` runs a group of lines only when its condition is \`true\`. The condition goes in round brackets. The lines to run go between curly braces \`{\` and \`}\`, which make a **[[block|block]]**:

\`\`\`js
const fuel = 12
if (fuel < 20) {
  console.log('Refuel soon')
}
console.log('Check done')
\`\`\`

This prints \`Refuel soon\` and then \`Check done\`. If \`fuel\` were 50, the condition would be \`false\`, JavaScript would skip the block, and only \`Check done\` would print.

### else: otherwise

\`else\` adds a second block that runs when the condition is \`false\`. Exactly one of the two blocks runs, never both:

\`\`\`js
const doorOpen = false
if (doorOpen) {
  console.log('Close the hatch')
} else {
  console.log('Hatch sealed')
}
\`\`\`

### else if: more than two roads

For several bands, chain conditions with \`else if\`. JavaScript checks them from the top, runs the **first** block whose condition is \`true\`, and skips all the rest:

\`\`\`js
const temperature = 31
if (temperature > 30) {
  console.log('hot')
} else if (temperature > 15) {
  console.log('mild')
} else {
  console.log('cold')
}
\`\`\`

This prints \`hot\`. The second test, \`temperature > 15\`, is also true, but it is never asked, because the first one already won. The \`else\` at the end catches everything that no test matched.

**Watch out:** because the first true test wins, order the tests from the highest band down. If the test \`temperature > 15\` came first, 31 would be called \`mild\`, and the \`hot\` block could never run.

### and, or, not

You can join conditions together:

- \`&&\` (read "and") is \`true\` only when **both** sides are true.
- \`||\` (read "or") is \`true\` when **at least one** side is true.
- \`!\` (read "not") flips \`true\` to \`false\` and \`false\` to \`true\`.

\`\`\`js
const wind = 25
const raining = false
console.log(wind < 40 && !raining)   // true: calm and dry
console.log(wind > 60 || raining)    // false: neither is true
\`\`\`

JavaScript [[stops checking as soon as it knows the answer|short-circuit]], which matters later.

### The ternary: choosing between two values

When you only need to pick one of two **values**, there is a one-line form called the **[[ternary|ternary]]** operator: \`condition ? valueIfTrue : valueIfFalse\`. Read the \`?\` as "if so" and the \`:\` as "if not":

\`\`\`js
const temperature = 31
const label = temperature > 30 ? 'hot' : 'not hot'
console.log(label)   // hot
\`\`\`

Use it for a simple either-or. For three or more outcomes, \`if\` and \`else if\` read better.

### A function you fill in

Your task asks you to fill in a **function**: a named piece of code that takes an input and hands back an answer. You will learn functions properly in [[a later lesson|functions-preview]]. For now, this is all you need:

\`\`\`js
function describe(speed) {
  if (speed > 100) {
    return 'fast'
  }
  return 'slow'
}
console.log(describe(150))   // fast
console.log(describe(40))    // slow
\`\`\`

- \`function describe(speed)\` names the function \`describe\`, and says it takes one input, which it calls \`speed\`.
- The lines between \`{\` and \`}\` are what the function does.
- \`return\` hands a value back to whoever called the function, and stops the function there.
- \`describe(150)\` **calls** the function: it runs those lines with \`speed\` set to 150.

When you press Run, the checker calls your function itself, with many different inputs, and compares what it hands back with the right answers.

::: context loose-equality Why == is avoided
Two equals signs, \`==\`, is "loose" equality. Before comparing, it converts the two values to the same type, following rules that few people remember. So \`'1' == 1\` is \`true\`, \`'' == 0\` is \`true\`, and \`0 == false\` is \`true\` as well. Those conversions hide bugs: a form field holding the text \`'0'\` might count as equal to a number you did not expect. That is why nearly every JavaScript style guide says to use \`===\` and \`!==\`, which never convert anything.
:::

::: context block Blocks and indentation
A block is a group of statements between curly braces, treated as one unit: "run all of these, or none". JavaScript does not care how far the lines inside are indented, but people do. The convention is to indent the inside of a block by two spaces, so you can see at a glance which lines belong to the \`if\`. Most editors do it for you, and tools called formatters fix it automatically.
:::

::: context short-circuit Stopping early
With \`a && b\`, if \`a\` is false, the whole answer must be false, so JavaScript never even looks at \`b\`. With \`a || b\`, if \`a\` is true, the answer must be true, so \`b\` is skipped. This is called short-circuiting. It means you can write a safety check on the left and a risky step on the right: the right side only runs when the left side allows it.
:::

::: context ternary Why it is called the ternary
"Ternary" means "made of three parts". Most operators work on two values: \`a + b\`, \`a > b\`. This one works on three: the condition, the value if true, and the value if false. It is the only operator in JavaScript with three parts, so people call it *the* ternary. It shines in short choices, like picking \`'item'\` or \`'items'\` depending on a count.
:::

::: context functions-preview Functions come back soon
Functions get a whole lesson later in this course: how to write your own, how to give them several inputs, and why a function that hands back its answer is more useful than one that prints it. Until then, the shape above is enough to answer the tasks: the word \`function\`, a name, the input in round brackets, and a block that ends in \`return\`.
:::
--- task
Write a function \`grade(score)\` that hands back a word for a test score:

- \`'pass'\` for 70 or more
- \`'close'\` for 60 to 69
- \`'fail'\` for anything lower

The checker will call \`grade\` with several scores, including exactly 70.
--- starter
function grade(score) {
  return ''
}
--- solution
function grade(score) {
  if (score >= 70) {
    return 'pass'
  } else if (score >= 60) {
    return 'close'
  } else {
    return 'fail'
  }
}
--- hint
Use \`if\`, \`else if\` and \`else\`, and \`return\` a word from each block.
--- hint
Test the highest band first. "70 or more" is \`score >= 70\`, so that 70 itself counts as a pass.
--- hint
After the first test fails, you already know the score is below 70, so the second test only needs to ask whether it is 60 or more.
--- check case | 85 is a pass
grade(85)
=> 'pass'
--- check case | 70 is a pass (the boundary)
grade(70)
=> 'pass'
--- check case | 64 is close
grade(64)
=> 'close'
--- check case | 12 is a fail
grade(12)
=> 'fail'

+++ practice | Which stage of flight
--- task
Write a function \`stageName(seconds)\` that says which part of a launch a rocket is in, from the seconds since lift-off:

- below 150 seconds: \`'stage 1'\`
- from 150 up to, but not including, 500 seconds: \`'stage 2'\`
- 500 seconds or more: \`'orbit'\`
--- starter
function stageName(seconds) {
  return 'stage 1'
}
--- solution
function stageName(seconds) {
  if (seconds >= 500) {
    return 'orbit'
  }
  if (seconds >= 150) {
    return 'stage 2'
  }
  return 'stage 1'
}
--- hint
Three bands means three possible answers. Test the highest band first, so the first true test is the right one.
--- hint
\`return\` stops the function. So once the test for orbit has failed, the next test already knows the time is below 500.
--- hint
Starting from the smallest band works too: test \`seconds < 150\` first, then \`seconds < 500\`.
--- check case | 0 seconds is stage 1
stageName(0)
=> 'stage 1'
--- check case | 149 seconds is still stage 1
stageName(149)
=> 'stage 1'
--- check case | 150 seconds is stage 2
stageName(150)
=> 'stage 2'
--- check case | 499 seconds is stage 2
stageName(499)
=> 'stage 2'
--- check case | 500 seconds is orbit
stageName(500)
=> 'orbit'

+++ practice | Even or odd
--- task
Write a function \`parity(n)\` that hands back \`'even'\` when the whole number \`n\` is even and \`'odd'\` when it is odd. Use a ternary, not \`if\`. It must work for negative numbers and for zero (zero is even).
--- starter
function parity(n) {
  return 'even'
}
--- solution
function parity(n) {
  return n % 2 === 0 ? 'even' : 'odd'
}
--- hint
\`n % 2\` is the remainder after dividing by 2. A number is even when that remainder is 0.
--- hint
For a negative odd number the remainder is \`-1\`, not \`1\`. So test for 0, which works for both signs.
--- hint
The shape is \`return condition ? 'even' : 'odd'\`.
--- check case | 4 is even
parity(4)
=> 'even'
--- check case | 7 is odd
parity(7)
=> 'odd'
--- check case | 0 is even
parity(0)
=> 'even'
--- check case | -3 is odd
parity(-3)
=> 'odd'
--- check source | Uses a ternary
\\?[\\s\\S]*:

+++ practice | Go or hold
--- task
Write a function \`launchCall(windKmh, sky)\` that hands back \`'go'\` or \`'hold'\`.

It is \`'go'\` only when **both** of these are true:

- \`windKmh\` is below 40;
- the sky is \`'clear'\` or \`'cloudy'\`. People type the sky by hand, so trim it and make it lowercase before comparing: \`' Cloudy '\` counts as cloudy.

Otherwise it is \`'hold'\`.
--- starter
function launchCall(windKmh, sky) {
  return 'hold'
}
--- solution
function launchCall(windKmh, sky) {
  const tidySky = sky.trim().toLowerCase()
  const goodSky = tidySky === 'clear' || tidySky === 'cloudy'
  return windKmh < 40 && goodSky ? 'go' : 'hold'
}
--- hint
Tidy the sky first and store it in a variable, so you do not have to tidy it twice.
--- hint
"The sky is clear or cloudy" is two \`===\` tests joined with \`||\`. Join that with the wind test using \`&&\`.
--- check case | Calm and clear is go
launchCall(10, 'clear')
=> 'go'
--- check case | Untidy text still counts
launchCall(10, ' Cloudy ')
=> 'go'
--- check case | Wind of exactly 40 is hold
launchCall(40, 'clear')
=> 'hold'
--- check case | A storm is hold, however calm
launchCall(5, 'storm')
=> 'hold'

+++ practice | The largest of three
--- task
Write a function \`largest(a, b, c)\` that hands back the largest of three numbers. Do **not** use \`Math.max\`: work it out with \`if\` and comparisons.

It must work when two or three of the numbers are equal, and when they are all negative.
--- starter
function largest(a, b, c) {
  return a
}
--- solution
function largest(a, b, c) {
  let best = a
  if (b > best) {
    best = b
  }
  if (c > best) {
    best = c
  }
  return best
}
--- hint
Keep a \`let\` holding the best number so far. Start it at \`a\`.
--- hint
Compare \`b\` with the best so far, and replace the best if \`b\` is bigger. Then do the same with \`c\`.
--- hint
If you compare the numbers in pairs with \`>\` instead, check what happens when two are equal: \`>\` is false for a tie.
--- check case | The middle one is largest
largest(3, 9, 4)
=> 9
--- check case | The last one is largest
largest(1, 2, 3)
=> 3
--- check case | A tie at the top
largest(9, 9, 1)
=> 9
--- check case | All negative
largest(-5, -2, -8)
=> -2
--- check case | All the same
largest(7, 7, 7)
=> 7
--- check source absent | Does not use Math.max
Math\\.max

+++ practice | Fix the speed labels
--- task
\`speedLabel(kmh)\` should hand back:

- \`'very fast'\` for 200 or more
- \`'fast'\` for 100 up to 199
- \`'slow'\` for anything below 100

But \`speedLabel(250)\` hands back \`'fast'\`, and \`'very fast'\` never comes out at all. Find the mistake and fix it.
--- starter
function speedLabel(kmh) {
  if (kmh >= 100) {
    return 'fast'
  } else if (kmh >= 200) {
    return 'very fast'
  } else {
    return 'slow'
  }
}
--- solution
function speedLabel(kmh) {
  if (kmh >= 200) {
    return 'very fast'
  } else if (kmh >= 100) {
    return 'fast'
  } else {
    return 'slow'
  }
}
--- hint
JavaScript runs the first block whose test is true and skips the rest. Which test does 250 pass first?
--- hint
Any speed of 200 or more is also 100 or more. Put the highest band first.
--- check case | 250 is very fast
speedLabel(250)
=> 'very fast'
--- check case | 200 is very fast
speedLabel(200)
=> 'very fast'
--- check case | 150 is fast
speedLabel(150)
=> 'fast'
--- check case | 100 is fast
speedLabel(100)
=> 'fast'
--- check case | 99 is slow
speedLabel(99)
=> 'slow'

+++ practice | Leap years
--- task
Write a function \`isLeapYear(year)\` that hands back \`true\` or \`false\`. The calendar's rule is:

- a year that divides exactly by 4 is a leap year,
- **except** a year that divides exactly by 100, which is not,
- **except** a year that divides exactly by 400, which is a leap year after all.

So 2024 is a leap year, 2023 is not, 1900 is not, and 2000 is.
--- starter
function isLeapYear(year) {
  return year % 4 === 0
}
--- solution
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
--- hint
"Divides exactly by 4" is \`year % 4 === 0\`. "Does not divide by 100" uses \`!==\`.
--- hint
Put it in words first: divisible by 4 and not by 100, **or** divisible by 400.
--- hint
Brackets make the grouping clear: \`(… && …) || …\`.
--- check case | 2024 is a leap year
isLeapYear(2024)
=> true
--- check case | 2023 is not
isLeapYear(2023)
=> false
--- check case | 1900 is not: it divides by 100
isLeapYear(1900)
=> false
--- check case | 2000 is: it divides by 400
isLeapYear(2000)
=> true
--- check case | 2100 is not
isLeapYear(2100)
=> false

=== js-06 | Loops
--- teach
Last lesson your program learned to choose. This lesson it learns to repeat. Printing 1 to 1000 with a thousand \`console.log\` lines would be silly; a loop does it in three lines. You already met one loop in the HTML course, when you made a list item for each planet.

Picture a runner on a track. Each lap is the same, and before every lap the coach asks one question: "Another lap?" While the answer is yes, the runner goes round again. When it is no, the run is over.

### for…of: once for each item

An **array** is a list of values in square brackets, like \`['ada', 'lin', 'sam']\`. You met arrays in the HTML course and will study them properly in lesson 8. A **\`for…of\` loop** runs its block once for each item, in order:

\`\`\`js
for (const name of ['ada', 'lin', 'sam']) {
  console.log('hello', name)
}
\`\`\`

\`\`\`
hello ada
hello lin
hello sam
\`\`\`

On each pass, \`name\` holds the next item: \`'ada'\`, then \`'lin'\`, then \`'sam'\`. One pass through the block is called an **[[iteration|iteration]]**.

\`for…of\` also walks through a string, one character at a time:

\`\`\`js
for (const letter of 'Go!') {
  console.log(letter)
}
\`\`\`

That prints \`G\`, then \`o\`, then \`!\`, each on its own line.

### The counting loop

When you want to count, use the classic \`for\` loop. Its round brackets hold three parts, separated by semicolons \`;\`:

1. **start**: \`let i = 1\` makes a counter.
2. **keep going while**: \`i <= 5\` is checked before every pass. The loop stops as soon as it is \`false\`.
3. **step**: \`i++\` runs after every pass. \`i++\` means "add one to i", the same as \`i += 1\`. It is read "i plus plus", and called an **[[increment|increment]]**.

\`\`\`js
let total = 0
for (let i = 1; i <= 5; i++) {
  total += i
}
console.log(total)   // 15
\`\`\`

Follow it pass by pass: \`total\` becomes 1, then 3, 6, 10 and 15. Then \`i\` becomes 6, the test \`6 <= 5\` is \`false\`, and the loop ends.

The step can be anything: \`i += 2\` counts in twos, and \`i--\` ("i minus minus") takes one away, so a loop can count down:

\`\`\`js
for (let i = 10; i > 0; i -= 3) {
  console.log(i)
}
\`\`\`

That prints 10, 7, 4 and 1. After 1 comes -2, which fails the test \`i > 0\`.

**Watch out:** check the edges of your counting. \`i < 5\` stops *before* 5, and \`i <= 5\` includes it. Getting this wrong by one is so common that it has a name: an **[[off-by-one error|off-by-one]]**. Run your loop and look at its first and last values.

### while: repeat until something changes

A \`while\` loop has only the "keep going while" part. Use it when you do not know in advance how many passes you need:

\`\`\`js
let cells = 1
let hours = 0
while (cells < 100) {
  cells *= 2
  hours += 1
}
console.log(hours, cells)   // 7 128
\`\`\`

The cells double every hour. After 7 doublings there are 128, the test \`128 < 100\` is \`false\`, and the loop stops.

**Watch out:** something inside a \`while\` loop must change the condition. If nothing does, the condition stays \`true\` forever, and you have an **[[infinite loop|infinite-loop]]**. Here the page stops a program that runs too long, so you will see a message rather than a frozen screen.

### break and continue

Two words change a loop's course from inside:

- \`break\` leaves the loop at once. Nothing more of it runs.
- \`continue\` skips the rest of this pass and goes straight on to the next one.

\`\`\`js
for (const reading of [4, -1, 7, 12, 3]) {
  if (reading < 0) {
    continue
  }
  if (reading > 10) {
    console.log('too high:', reading)
    break
  }
  console.log('ok:', reading)
}
\`\`\`

\`\`\`
ok: 4
ok: 7
too high: 12
\`\`\`

\`-1\` is skipped by \`continue\`. At \`12\`, \`break\` ends the whole loop, so \`3\` is never reached.

### Loops inside functions

A loop can sit inside a function. Build the answer up in a \`let\` before the loop, change it inside the loop, and \`return\` it *after* the loop has finished:

\`\`\`js
function sumOfSquares(n) {
  let total = 0
  for (let i = 1; i <= n; i++) {
    total += i * i
  }
  return total
}
console.log(sumOfSquares(3))   // 14: 1 + 4 + 9
\`\`\`

Your task is a famous [[counting game|fizzbuzz]]. It needs a counting loop with an \`if\` chain inside it.

::: context iteration Passes, laps and iterations
"Iterate" comes from the Latin word for "again". Programmers say a loop iterates over an array, meaning it visits each item in turn, and each pass is one iteration. You will hear the word everywhere: "this loop does a million iterations", or "the bug only shows up on the last iteration". The loop's variable, like \`name\` or \`reading\`, is a fresh name on every pass, which is why \`for…of\` can use \`const\`.
:::

::: context increment Why the counter is called i
\`i++\` is shorthand that JavaScript borrowed from the C language of the 1970s, along with \`i--\`. Counters are traditionally named \`i\`, then \`j\` and \`k\` for loops inside loops. The habit goes back to early mathematics and to FORTRAN, an early programming language where names starting with I to N held whole numbers. A short name is fine for a counter that lives for three lines. For anything that lives longer, use a name that says what it counts.
:::

::: context off-by-one The fencepost problem
How many fence posts hold up a 10 meter fence with a post every meter? Not 10, but 11: one at each end. Counting the gaps instead of the posts, or the posts instead of the gaps, is the oldest off-by-one error. In loops it shows up as \`<\` where \`<=\` was meant, starting at 1 where 0 was meant, or stopping one item early. Test the edges: the first pass, the last pass, and a loop that should run zero times.
:::

::: context infinite-loop When a loop never ends
An infinite loop keeps the computer busy forever. In a web page it freezes the tab, because the page cannot react to anything while the loop runs. Browsers eventually offer to stop such a page. A real server stuck in one stops answering its users. The usual causes are a counter that is never updated, a step going the wrong way (\`i--\` with \`i <= 10\`), or a condition that can never become false.
:::

::: context fizzbuzz A game turned interview question
FizzBuzz began as a counting game for children learning division: take turns counting, say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. In 2007 a programmer wrote that many people applying for programming jobs could not write it, and it became a famous first screening question. It tests three ideas at once: a loop, the remainder operator, and putting the tests of an \`if\` chain in the right order.
:::
--- task
Print the numbers from 1 to 15, one per line, but:

- print \`Fizz\` instead of the number for multiples of 3,
- print \`Buzz\` instead of the number for multiples of 5,
- print \`FizzBuzz\` instead of the number for multiples of both 3 and 5.

Use a loop.
--- starter
// FizzBuzz, 1 to 15.

--- solution
for (let n = 1; n <= 15; n++) {
  if (n % 15 === 0) console.log('FizzBuzz')
  else if (n % 3 === 0) console.log('Fizz')
  else if (n % 5 === 0) console.log('Buzz')
  else console.log(n)
}
--- hint
Count from 1 to 15 with a counting loop. Inside it, decide what to print for each number.
--- hint
\`n % 3 === 0\` means "n is a multiple of 3". A multiple of both 3 and 5 is a multiple of 15.
--- hint
Check the "both" case first. 15 is also a multiple of 3, so if the test for 3 came first, 15 would print \`Fizz\`.
--- check output | Prints FizzBuzz from 1 to 15
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
--- check source | Uses a loop
\\b(for|while)\\b

+++ practice | Countdown
--- task
Print a countdown from 10 down to 1, one number per line, and then the line \`Liftoff!\`. Use a counting loop that counts **down**. The output starts and ends like this:

\`\`\`
10
9
8
…
1
Liftoff!
\`\`\`
--- starter
// Count down from 10, then print Liftoff!

--- solution
for (let i = 10; i >= 1; i--) {
  console.log(i)
}
console.log('Liftoff!')
--- hint
Start the counter at 10, and step with \`i--\`, which takes one away each pass.
--- hint
The loop must still run when \`i\` is 1, so keep going while \`i >= 1\` (or \`i > 0\`).
--- hint
\`Liftoff!\` prints once, so its \`console.log\` goes after the loop's closing brace.
--- check output | Counts down, then lifts off
10
9
8
7
6
5
4
3
2
1
Liftoff!
--- check source | Uses a loop
\\b(for|while)\\b
--- check source absent | Does not print the numbers one by one
console\\.log\\(\\s*9\\s*\\)

+++ practice | Multiples of 3 or 5
--- task
Write a function \`sumOfMultiples(limit)\` that adds up every whole number from 1 up to, but **not including**, \`limit\` that is a multiple of 3 or a multiple of 5, and hands back the sum.

For example, below 10 the multiples are 3, 5, 6 and 9, so \`sumOfMultiples(10)\` is \`23\`. A number that is a multiple of both, like 15, counts once. When \`limit\` is 1 or less, there are none, so the answer is \`0\`.
--- starter
function sumOfMultiples(limit) {
  return 0
}
--- solution
function sumOfMultiples(limit) {
  let total = 0
  for (let n = 1; n < limit; n++) {
    if (n % 3 === 0 || n % 5 === 0) {
      total += n
    }
  }
  return total
}
--- hint
Keep a running total in a \`let\` that starts at 0, and return it after the loop.
--- hint
"Up to but not including" means the loop keeps going while \`n < limit\`.
--- hint
One \`if\` with \`||\` handles both kinds of multiple, and counts 15 only once.
--- check case | Below 10 the sum is 23
sumOfMultiples(10)
=> 23
--- check case | Below 16 the sum is 60, with 15 counted once
sumOfMultiples(16)
=> 60
--- check case | Below 1 there are none
sumOfMultiples(1)
=> 0
--- check case | Below 0 there are none
sumOfMultiples(0)
=> 0

+++ practice | Digits before the stop sign
--- task
A code is a string of digits, dashes and letters, such as \`'12-3x45'\`. Write a function \`sumUntilX(code)\` that goes through the characters in order and adds up the digits, with two rules:

- a dash \`-\` is skipped: use \`continue\`;
- the letter \`x\` means stop: use \`break\`, and ignore everything after it.

Turn each digit into a number with \`Number(ch)\`. So \`sumUntilX('12-3x45')\` is \`1 + 2 + 3\`, which is \`6\`. An empty code gives \`0\`.
--- starter
function sumUntilX(code) {
  let total = 0
  for (const ch of code) {
    total += Number(ch)
  }
  return total
}
--- solution
function sumUntilX(code) {
  let total = 0
  for (const ch of code) {
    if (ch === '-') {
      continue
    }
    if (ch === 'x') {
      break
    }
    total += Number(ch)
  }
  return total
}
--- hint
\`Number('-')\` is \`NaN\`, and one \`NaN\` turns the whole total into \`NaN\`. Skip the dash before you add.
--- hint
Put both tests at the top of the loop's block, before the line that adds.
--- check case | Stops at x
sumUntilX('12-3x45')
=> 6
--- check case | Dashes are skipped
sumUntilX('9-9-9')
=> 27
--- check case | x first means nothing is added
sumUntilX('x9')
=> 0
--- check case | An empty code gives 0
sumUntilX('')
=> 0
--- check source | Uses break and continue
\\bcontinue\\b[\\s\\S]*\\bbreak\\b|\\bbreak\\b[\\s\\S]*\\bcontinue\\b

+++ practice | How many digits
--- task
Write a function \`digitCount(n)\` that hands back how many digits the whole number \`n\` has, for \`n\` of 0 or more. Use a \`while\` loop that chops the last digit off with \`Math.floor(n / 10)\` until nothing is left.

So \`digitCount(12345)\` is \`5\`. Careful: \`0\` is written with one digit, so \`digitCount(0)\` is \`1\`.
--- starter
function digitCount(n) {
  let count = 0
  while (n > 0) {
    n = Math.floor(n / 10)
  }
  return count
}
--- solution
function digitCount(n) {
  if (n === 0) {
    return 1
  }
  let count = 0
  while (n > 0) {
    n = Math.floor(n / 10)
    count++
  }
  return count
}
--- hint
Each pass through the loop removes one digit, so count the passes.
--- hint
For \`0\`, the test \`n > 0\` is false at once, and the loop runs zero times. Handle 0 on its own before the loop.
--- check case | 12345 has 5 digits
digitCount(12345)
=> 5
--- check case | 7 has 1 digit
digitCount(7)
=> 1
--- check case | 10 has 2 digits
digitCount(10)
=> 2
--- check case | 0 has 1 digit
digitCount(0)
=> 1
--- check case | A million has 7 digits
digitCount(1000000)
=> 7

+++ practice | Fix the squares
--- task
This program should print the squares of 1 to 5, one per line:

\`\`\`
1
4
9
16
25
\`\`\`

But the last line, \`25\`, is missing. Fix the loop so it prints all five. Keep the loop: do not add a separate \`console.log\` for 25.
--- starter
for (let i = 1; i < 5; i++) {
  console.log(i * i)
}
--- solution
for (let i = 1; i <= 5; i++) {
  console.log(i * i)
}
--- hint
Look at the loop's middle part, the "keep going while" test. What happens when \`i\` is 5?
--- hint
\`i < 5\` stops before 5. You want the loop to run when \`i\` is 5 as well.
--- check output | Prints all five squares
1
4
9
16
25
--- check source | Still uses a loop
\\bfor\\b
--- check source absent | No separate line for 25
console\\.log\\(\\s*25\\s*\\)

+++ practice | The Collatz steps
--- task
Start from a whole number \`n\` of 1 or more, and repeat this step until you reach 1:

- if the number is even, halve it;
- if it is odd, multiply it by 3 and add 1.

Write a function \`collatzSteps(n)\` that hands back how many steps it takes to reach 1. For example, 6 goes 6, 3, 10, 5, 16, 8, 4, 2, 1, which is \`8\` steps. Starting at 1 takes \`0\` steps.
--- starter
function collatzSteps(n) {
  return 0
}
--- solution
function collatzSteps(n) {
  let steps = 0
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2
    } else {
      n = 3 * n + 1
    }
    steps++
  }
  return steps
}
--- hint
You do not know in advance how many steps there will be, so use a \`while\` loop that keeps going while \`n\` is not 1.
--- hint
Inside the loop, an \`if\` and \`else\` choose the step, and a counter goes up by one every pass.
--- check case | 1 takes 0 steps
collatzSteps(1)
=> 0
--- check case | 2 takes 1 step
collatzSteps(2)
=> 1
--- check case | 6 takes 8 steps
collatzSteps(6)
=> 8
--- check case | 27 takes 111 steps
collatzSteps(27)
=> 111

=== js-07 | Functions
--- teach
Since lesson 5 you have been filling in functions that the starter set up for you. Now you will write your own from nothing, and learn what every part does. Functions are how programs are built: big jobs split into small named pieces, each one tested on its own.

Picture a recipe card titled "Pancakes". The card lists what goes in (eggs, flour, milk) and the steps. Anyone can follow it, as often as they like, with whatever eggs they have today, and out come pancakes. A function is a recipe card for the computer.

### Writing a function

A **function** packages some code under a name, so you can run it whenever you need it:

\`\`\`js
function add(a, b) {
  return a + b
}
console.log(add(2, 3))   // 5
\`\`\`

Part by part:

- \`function\` says "here comes a function".
- \`add\` is its name. Function names are camelCase, like variables.
- \`(a, b)\` lists the names it gives its inputs.
- The block between \`{\` and \`}\` is the **body**: the steps.
- \`return a + b\` works out \`a + b\` and hands it back.

### Parameters and arguments

\`a\` and \`b\` are the function's **parameters**: the names it gives its inputs, written when you *define* it. The values you pass in when you *call* it, like \`2\` and \`3\` in \`add(2, 3)\`, are the **arguments**. When \`add(2, 3)\` runs, \`a\` is 2 and \`b\` is 3. Call \`add(10, 4)\` and this time \`a\` is 10 and \`b\` is 4. The [[two words|params-args]] are easy to mix up, and people often do.

### return hands back a value

\`return\` sends a value back to whoever called the function. The call then stands for that value, so you can store it or use it in a sum:

\`\`\`js
function add(a, b) {
  return a + b
}
const sum = add(2, 3)
console.log(sum * 10)   // 50
\`\`\`

\`return\` also stops the function at once: any lines after it in the body never run. A function with no \`return\` at all hands back \`undefined\`.

**Watch out:** \`console.log\` inside a function only *shows* a value on the screen. It does not hand it back. A function that logs its answer instead of returning it gives \`undefined\` to its caller, and any sum made from it goes wrong. Return the answer, and let the caller decide whether to print it. This is the difference between [[printing and returning|print-vs-return]].

### Arrow functions

There is a shorter way to write a function, called an **[[arrow function|arrow]]**. You saw one in the HTML course, inside \`addEventListener\`. Here it is stored in a variable:

\`\`\`js
const multiply = (a, b) => a * b
console.log(multiply(4, 5))   // 20
\`\`\`

Read \`=>\` as "goes to": "a and b go to a times b". When the body is a single expression after the arrow, that expression is returned automatically, with no \`return\` word. With only one parameter, the round brackets are optional, but this course always writes them.

For more than one line, give the arrow function a body in braces. Then you need \`return\` again:

\`\`\`js
const describeTemp = (c) => {
  const f = c * 9 / 5 + 32
  return \`\${c} C is \${f} F\`
}
console.log(describeTemp(20))   // 20 C is 68 F
\`\`\`

**Watch out:** \`(a, b) => { a * b }\` returns \`undefined\`. The braces make a body, and a body needs \`return\`. Either drop the braces or add the \`return\`.

### Default values for parameters

A parameter can have a **default**: a value it takes when the caller leaves that argument out. Write \`=\` and the value in the parameter list:

\`\`\`js
function greet(name, mark = '!') {
  return 'Hello, ' + name + mark
}
console.log(greet('Ada'))        // Hello, Ada!
console.log(greet('Ada', '?'))   // Hello, Ada?
\`\`\`

### What happens inside stays inside

A variable made inside a function exists only inside it. It is made fresh on each call and is gone when the function returns. Code outside cannot see it. This is called **[[scope|scope]]**, and it is what lets you use the name \`total\` in ten different functions without them interfering with each other.

### Functions are values

A function is a value, like a number or a string. You can store it in a variable, and you can hand it to another function as an argument:

\`\`\`js
function twice(action, value) {
  return action(action(value))
}
const addTen = (n) => n + 10
console.log(twice(addTen, 1))   // 21
\`\`\`

\`twice\` does not know or care what \`action\` does. It calls it twice. A function handed to another function like this is called a **[[callback|callback]]**, and most of JavaScript works this way. The function you gave \`addEventListener\` in the HTML course was a callback.

### Cutting text into words: split

The string method \`split\` cuts a string into pieces and hands back an array of them. You tell it what to cut on:

\`\`\`js
console.log('red,green,blue'.split(','))   // [ "red", "green", "blue" ]
\`\`\`

Words can be separated by one space or several, so cutting on \`' '\` is not enough. Instead you can hand \`split\` a **pattern**. \`/\\s+/\` is a pattern, written between two slashes, that means "one or more whitespace characters" (spaces, tabs and new lines). Patterns like this are called **[[regular expressions|regex]]**:

\`\`\`js
const pieces = 'a  b   c'.split(/\\s+/)
console.log(pieces)          // [ "a", "b", "c" ]
console.log(pieces.length)   // 3
\`\`\`

An array has a \`length\` too: how many items it holds.

**Watch out:** spaces at the ends make empty pieces. \`' a b'.split(/\\s+/)\` gives \`['', 'a', 'b']\`, so \`trim()\` the text first. And the empty string \`''\` split this way gives \`['']\`: one empty piece, not none.

::: context params-args Two words, two moments
A parameter is the name on the recipe card ("eggs"); an argument is the actual thing you put in today (these three eggs). The parameter belongs to the definition and the argument belongs to the call. One function, defined once with parameter \`a\`, may be called a thousand times with a thousand different arguments. People mix up the two words all the time, even experienced engineers, and everyone still understands. What matters is knowing which moment you mean.
:::

::: context print-vs-return Why returning beats printing
A function that returns its answer can be used anywhere: in a sum, in an \`if\`, in another function, or in a test that checks it. A function that only prints its answer is a dead end. The text appears on the screen, and the rest of the program cannot touch it. That is why the checks in this course call your functions and look at what they return. Printing is for the very edge of a program, where results finally meet a person.
:::

::: context arrow Where the arrow came from
Arrow functions were added to JavaScript in 2015, borrowed from languages like CoffeeScript and C#. They are popular for short functions, especially callbacks, because \`(n) => n * 2\` says in one line what the older \`function (n) { return n * 2 }\` says in many characters. They also differ in one subtle way, about a word called \`this\`, that matters later in the intermediate course. For now, choose whichever reads better.
:::

::: context scope Each call gets its own variables
Picture each function call as a fresh sheet of scrap paper. Its variables are written on that sheet, and when the call returns, the sheet goes in the bin. Two calls running one after another never see each other's sheets. Code outside the function cannot read the sheet either: using a name that only exists inside a function stops the program with a \`ReferenceError\`. A function can, however, read variables made outside it, like a cook reading the kitchen clock.
:::

::: context callback Functions as arguments
"Callback" means "call me back later". You hand over a function and let someone else decide when to run it: a button runs your callback on each click, and a timer runs one after a delay. Array tools you will meet soon, \`map\` and \`filter\`, run a callback once for every item. Being able to pass a function around as a value is one of the most important ideas in JavaScript.
:::

::: context regex A tiny language for patterns
A regular expression describes a pattern of text in a compact code. In \`/\\s+/\`, the slashes mark the start and end, \`\\s\` means "one whitespace character", and \`+\` means "one or more of the thing before". Patterns can find email addresses, dates or phone numbers in text. They are powerful and famously hard to read, so engineers keep them short and add a comment saying what each one matches.
:::
--- task
Write two functions:

- \`wordCount(text)\` hands back how many words are in \`text\`. Words are separated by any amount of whitespace, and extra spaces, including at the ends, do not count as words. \`text.trim().split(/\\s+/)\` gives the words, but be careful with the empty string: it has 0 words.
- \`isEven(n)\` hands back \`true\` when \`n\` is even and \`false\` when it is odd.
--- starter
function wordCount(text) {
}

function isEven(n) {
}
--- solution
function wordCount(text) {
  const trimmed = text.trim()
  return trimmed === '' ? 0 : trimmed.split(/\\s+/).length
}

const isEven = (n) => n % 2 === 0
--- hint
Trim the text first and store it. If the trimmed text is empty, the answer is 0.
--- hint
Otherwise, split the trimmed text on \`/\\s+/\` and count the pieces with \`length\`.
--- hint
\`isEven\` is one comparison: the remainder after dividing by 2 is 0. An arrow function can return that comparison directly.
--- check case | wordCount('the quick brown fox') is 4
wordCount('the quick brown fox')
=> 4
--- check case | Extra spaces do not count as words
wordCount('  spaced   out  ')
=> 2
--- check case | The empty string has 0 words
wordCount('')
=> 0
--- check test | isEven works both ways
isEven(10) === true && isEven(7) === false

+++ practice | An arrow to Fahrenheit
--- task
Write an arrow function, stored in a \`const\` named \`toFahrenheit\`, that takes a temperature in Celsius and returns it in Fahrenheit: times 9, divided by 5, plus 32. Use the short form, with no braces and no \`return\`.

So \`toFahrenheit(100)\` is \`212\`.
--- starter
// Write the arrow function toFahrenheit here.

--- solution
const toFahrenheit = (celsius) => celsius * 9 / 5 + 32
--- hint
The shape is \`const name = (parameter) => expression\`.
--- hint
The expression after the arrow is the formula itself. With no braces, it is returned automatically.
--- check case | Water freezes at 32
toFahrenheit(0)
=> 32
--- check case | Water boils at 212
toFahrenheit(100)
=> 212
--- check case | -40 is the same on both scales
toFahrenheit(-40)
=> -40
--- check source | Is an arrow function
const\\s+toFahrenheit\\s*=\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>

+++ practice | A price with a default currency
--- task
Write a function \`price(amount, currency)\` that returns the amount with exactly 2 decimals, a space, and the currency: \`price(3, 'EUR')\` is \`'3.00 EUR'\`.

When the caller leaves out the currency, it is \`'USD'\`: give the parameter a default. So \`price(12.5)\` is \`'12.50 USD'\`.
--- starter
function price(amount, currency) {
  return amount + ' ' + currency
}
--- solution
function price(amount, currency = 'USD') {
  return \`\${amount.toFixed(2)} \${currency}\`
}
--- hint
A default goes in the parameter list: the name, \`=\`, then the value.
--- hint
\`toFixed(2)\` gives the number as text with exactly two decimals, which is what you want here.
--- check case | No currency means USD
price(12.5)
=> '12.50 USD'
--- check case | A currency given is used
price(3, 'EUR')
=> '3.00 EUR'
--- check case | Zero still has two decimals
price(0)
=> '0.00 USD'
--- check source | currency has a default
currency\\s*=\\s*['"]USD['"]

+++ practice | Initials
--- task
Write a function \`initials(fullName)\` that returns the first letter of each word in \`fullName\`, in capital letters, with nothing between them. Words are separated by any amount of whitespace, and there may be spaces at the ends.

So \`initials('grace brewster hopper')\` is \`'GBH'\`, and \`initials('  ada   lovelace ')\` is \`'AL'\`. An empty or blank name has no initials: return \`''\`.
--- starter
function initials(fullName) {
  return ''
}
--- solution
function initials(fullName) {
  const trimmed = fullName.trim()
  if (trimmed === '') {
    return ''
  }
  let result = ''
  for (const word of trimmed.split(/\\s+/)) {
    result += word[0].toUpperCase()
  }
  return result
}
--- hint
Trim, then split on \`/\\s+/\` to get the words. A \`for…of\` loop visits each one.
--- hint
Build the answer in a \`let\` that starts as \`''\`, adding each word's first character, \`word[0]\`, in capitals.
--- hint
An empty name splits into one empty word, and \`''[0]\` is \`undefined\`. Return \`''\` early when the trimmed name is empty.
--- check case | Three words
initials('grace brewster hopper')
=> 'GBH'
--- check case | Extra spaces everywhere
initials('  ada   lovelace ')
=> 'AL'
--- check case | One word
initials('x')
=> 'X'
--- check case | An empty name
initials('')
=> ''
--- check case | A blank name
initials('   ')
=> ''

+++ practice | The longest word
--- task
Write a function \`longestWord(text)\` that returns the longest word in \`text\`. Words are separated by any amount of whitespace.

- If two words tie for longest, return the one that comes **first**.
- If the text has no words (it is empty or only spaces), return \`''\`.

So \`longestWord('the quick brown fox')\` is \`'quick'\`: \`quick\` and \`brown\` both have 5 letters, and \`quick\` comes first.
--- starter
function longestWord(text) {
  let best = ''
  for (const word of text.split(' ')) {
    if (word.length >= best.length) {
      best = word
    }
  }
  return best
}
--- solution
function longestWord(text) {
  let best = ''
  for (const word of text.trim().split(/\\s+/)) {
    if (word.length > best.length) {
      best = word
    }
  }
  return best
}
--- hint
Keep the best word so far in a \`let\`, and replace it only when a word is strictly longer.
--- hint
With \`>=\`, a later word of the same length takes over, so the last of the tied words wins. Which comparison keeps the first?
--- hint
Splitting on \`' '\` breaks when words are separated by more than one space. Trim and split on the whitespace pattern instead.
--- check case | A tie keeps the first word
longestWord('the quick brown fox')
=> 'quick'
--- check case | Extra spaces do not matter
longestWord('  a   bb cc  ')
=> 'bb'
--- check case | One word
longestWord('orbit')
=> 'orbit'
--- check case | Only spaces gives an empty string
longestWord('   ')
=> ''

+++ practice | Fix the area total
--- task
\`area(widthM, heightM)\` should return the area of a rectangle, so that the program prints only this line:

\`\`\`
Total area: 26
\`\`\`

Instead it prints \`6\`, then \`20\`, then \`Total area: NaN\`. Fix the function. Leave the last two lines as they are.
--- starter
function area(widthM, heightM) {
  console.log(widthM * heightM)
}

const total = area(2, 3) + area(4, 5)
console.log('Total area:', total)
--- solution
function area(widthM, heightM) {
  return widthM * heightM
}

const total = area(2, 3) + area(4, 5)
console.log('Total area:', total)
--- hint
The function shows each area on the screen, but what does it hand back to the line that adds them?
--- hint
A function with no \`return\` hands back \`undefined\`, and \`undefined + undefined\` is \`NaN\`.
--- check output | Prints only the total
Total area: 26
--- check case | area(2, 3) returns 6
area(2, 3)
=> 6
--- check case | total is 26
total
=> 26

+++ practice | Count the words that pass a test
--- task
Write a function \`countMatching(text, test)\`. \`text\` is a string of words separated by whitespace, and \`test\` is a function that takes one word and returns \`true\` or \`false\`. Return how many words in \`text\` the test says \`true\` for.

For example, \`countMatching('a bb ccc dddd', (w) => w.length > 2)\` is \`2\`, because only \`ccc\` and \`dddd\` are longer than 2 letters. Text with no words gives \`0\`, whatever the test.
--- starter
function countMatching(text, test) {
  return 0
}
--- solution
function countMatching(text, test) {
  const trimmed = text.trim()
  if (trimmed === '') {
    return 0
  }
  let count = 0
  for (const word of trimmed.split(/\\s+/)) {
    if (test(word)) {
      count++
    }
  }
  return count
}
--- hint
\`test\` is a function, so you call it like any other: \`test(word)\` gives \`true\` or \`false\` for that word.
--- hint
Loop over the words and add one to a counter each time the test is \`true\`.
--- hint
Text with no words splits into one empty word, and a test like \`(w) => true\` would count it. Return 0 early for empty text.
--- check case | Words longer than 2 letters
countMatching('a bb ccc dddd', (w) => w.length > 2)
=> 2
--- check case | Words that contain a small o
countMatching('Orbit apogee burn', (w) => w.includes('o'))
=> 1
--- check case | A word that appears twice counts twice
countMatching('go go stop', (w) => w === 'go')
=> 2
--- check case | No words gives 0
countMatching('', (w) => true)
=> 0

=== js-08 | Arrays
--- teach
You have looped over arrays since lesson 6, and split text into them in lesson 7. This lesson is about arrays themselves: how to read one item, add an item, take a slice, and hand several results back from a function at once.

Picture a train. Each carriage holds one thing, the carriages stay in order, and each has a number painted on it. You can ask "what is in carriage 2?", add a carriage at the back, or count the carriages.

### Making an array and reading an item

An **array** is a list of values in order, written in square brackets with commas between them. Each value is an **item**, and each item has an **index**, its position number. As with the characters of a string, counting starts at 0:

\`\`\`js
const planets = ['Mercury', 'Venus', 'Earth']
console.log(planets[0])   // Mercury
console.log(planets[2])   // Earth
console.log(planets[5])   // undefined: there is no item 5
\`\`\`

An array can hold any values: numbers, strings, booleans, even other arrays.

### How many, and the last one

\`length\` tells you how many items an array holds. The last item's index is always one less than the length:

\`\`\`js
const planets = ['Mercury', 'Venus', 'Earth']
console.log(planets.length)                   // 3
console.log(planets[planets.length - 1])      // Earth
console.log(planets.at(-1))                   // Earth
\`\`\`

\`at\` is a [[newer way to read an item|at-method]] that also counts from the end: \`at(-1)\` is the last item, \`at(-2)\` the one before it.

### Changing an array

Unlike a string, an array can change. You can put a new value at an index, and \`push\` adds an item to the end:

\`\`\`js
const crew = ['Ada', 'Lin']
crew[1] = 'Sam'      // replace item 1
crew.push('Kim')     // add to the end
console.log(crew)    // [ "Ada", "Sam", "Kim" ]
\`\`\`

Notice that \`crew\` is a \`const\`, and yet its items changed. \`const\` only stops you pointing the **name** at a different array, as in \`crew = ['Max']\`. It does not freeze the array itself. Picture the name as a label tied to one train: the label stays on that train for good, but carriages can still be swapped. This is [[how const works with arrays|const-array]].

### Slices: a copy of part of an array

\`slice(start, end)\` hands back a **new** array holding the items from index \`start\` up to, but **not including**, index \`end\`. The original array is left alone:

\`\`\`js
const planets = ['Mercury', 'Venus', 'Earth', 'Mars']
console.log(planets.slice(1, 3))   // [ "Venus", "Earth" ]
console.log(planets.length)        // 4: still all four
\`\`\`

Index 3 (\`'Mars'\`) is where the slice stops, so it is left out. This [["up to but not including"|half-open]] rule is everywhere in programming. A handy fact follows from it: \`slice(a, b)\` holds \`b - a\` items.

### Is it in there?

\`includes\` answers yes or no. \`indexOf\` tells you *where*, and gives \`-1\` when the item is not there at all:

\`\`\`js
const planets = ['Mercury', 'Venus', 'Earth']
console.log(planets.includes('Venus'))   // true
console.log(planets.indexOf('Earth'))    // 2
console.log(planets.indexOf('Pluto'))    // -1
\`\`\`

### Looping over an array

\`for…of\` gives you each item. When you also need the index, use a counting loop from 0 while the index is less than the length:

\`\`\`js
const temps = [21, 25, 19]
for (let i = 0; i < temps.length; i++) {
  console.log('day', i + 1, 'was', temps[i])
}
\`\`\`

That prints \`day 1 was 21\`, \`day 2 was 25\` and \`day 3 was 19\`.

**Watch out:** the test is \`i < temps.length\`, not \`<=\`. The last index is \`length - 1\`. With \`<=\`, the loop takes one extra pass and reads \`temps[3]\`, which is \`undefined\`, and a sum that adds \`undefined\` becomes \`NaN\`.

### Handing back several results

A function returns one value. To give back several named results at once, return an **object**: named values in curly braces. The next lesson covers objects properly; for now, this is enough:

\`\`\`js
function range(values) {
  return { low: Math.min(...values), high: Math.max(...values) }
}
console.log(range([4, 9, 2]).high)   // 9
\`\`\`

\`{ low: …, high: … }\` is an object with two **properties**, \`low\` and \`high\`. You read one with a dot: \`.high\`. Picture an [[object as a labelled box|object-preview]] with a compartment for each result.

### Spreading an array: ...

\`Math.min\` and \`Math.max\` want separate numbers, like \`Math.min(4, 9, 2)\`, not one array. Three dots in front of an array, \`...values\`, **spread** it out into separate arguments. So \`Math.min(...[4, 9, 2])\` is the same as \`Math.min(4, 9, 2)\`, which is \`2\`.

**Watch out:** spreading an empty array gives \`Math.min()\` with nothing in it, and that is [[Infinity|infinity]], not 0. If an array might be empty, check its length first.

::: context at-method Reading from the end
For years, the only way to get the last item was \`arr[arr.length - 1]\`, which is long and easy to get wrong. \`at\` was added to JavaScript in 2022 to make it simpler: \`arr.at(-1)\` is the last item, and \`arr.at(0)\` is the same as \`arr[0]\`. Square brackets with a negative number do *not* count from the end: \`arr[-1]\` is \`undefined\`. Strings have \`at\` as well, so \`'rocket'.at(-1)\` is \`'t'\`.
:::

::: context const-array The label, not the contents
A variable does not hold an array inside it. It points at the array, which lives somewhere in memory. \`const\` fixes what the name points at; it says nothing about what is inside. So \`push\` works on a \`const\` array, but \`crew = []\` fails with a \`TypeError\`. The same goes for objects. Engineers still prefer \`const\` for arrays, because "this name always means this same list" is useful to know, even when the list grows.
:::

::: context half-open Why the end is left out
Leaving out the end makes the sums tidy. \`slice(0, 3)\` and \`slice(3, 6)\` fit together with no gap and no overlap, and \`slice(0, arr.length)\` is the whole array. The count of items is \`end - start\`, with no plus-one to remember. Counting loops use the same idea: \`for (let i = 0; i < n; i++)\` runs exactly \`n\` times. You will meet the rule again in strings, in Python's \`range\`, and in SQL.
:::

::: context object-preview An object is a labelled box
An array is a row of numbered compartments; an object is a box whose compartments have names. \`range([4, 9, 2])\` hands back one box with a compartment called \`low\` holding 2 and one called \`high\` holding 9. Naming the results means the caller writes \`.high\` instead of remembering that "the high one was second". Objects are next lesson's whole topic, and nearly all real data is made of them.
:::

::: context infinity Why the smallest of nothing is Infinity
\`Math.min\` starts its search from the biggest possible number, \`Infinity\`, and lowers it each time it meets something smaller. Handed nothing, it never lowers it, so you get \`Infinity\`. \`Math.max\` starts from \`-Infinity\` for the same reason. Both are real JavaScript number values, and they spread through sums: \`Infinity - 5\` is still \`Infinity\`. An empty list of readings is a real case, a sensor that sent nothing, so good code decides what to do about it.
:::
--- task
Write a function \`stats(latencies)\` that takes an array of response times in milliseconds and returns an object with three properties:

- \`fastest\`: the smallest time
- \`slowest\`: the largest time
- \`average\`: the sum of the times divided by how many there are

The checker always passes at least one time. \`Math.min(...latencies)\` spreads the array into arguments.
--- starter
function stats(latencies) {
  return { fastest: 0, slowest: 0, average: 0 }
}
--- solution
function stats(latencies) {
  let sum = 0
  for (const ms of latencies) sum += ms
  return {
    fastest: Math.min(...latencies),
    slowest: Math.max(...latencies),
    average: sum / latencies.length,
  }
}
--- hint
Add the times up with a loop into a \`let\` that starts at 0. The average is that sum divided by \`latencies.length\`.
--- hint
\`Math.min\` and \`Math.max\` need the array spread out with \`...\`.
--- hint
Return one object holding all three: \`{ fastest: …, slowest: …, average: … }\`.
--- check test | fastest and slowest
stats([120, 95, 210, 143, 180]).fastest === 95 && stats([120, 95, 210, 143, 180]).slowest === 210
--- check case | average
stats([120, 95, 210, 143, 180]).average
=> 149.6
--- check case | Works for a single value
stats([7])
=> {"fastest": 7, "slowest": 7, "average": 7}

+++ practice | First, last and how many
--- task
Write a function \`ends(readings)\` that returns an object with three properties:

- \`first\`: the first item of the array
- \`last\`: the last item
- \`count\`: how many items there are

So \`ends([12, 18, 25, 30])\` is \`{ first: 12, last: 30, count: 4 }\`. For an empty array, \`first\` and \`last\` are both \`undefined\` and \`count\` is \`0\`.
--- starter
function ends(readings) {
  return { first: readings[1], last: readings[readings.length], count: readings.length }
}
--- solution
function ends(readings) {
  return { first: readings[0], last: readings.at(-1), count: readings.length }
}
--- hint
Indexes start at 0, so the first item is not at index 1.
--- hint
The last item is at \`length - 1\`, or use \`at(-1)\`. Index \`length\` is one past the end.
--- check case | Four readings
ends([12, 18, 25, 30])
=> { first: 12, last: 30, count: 4 }
--- check case | One reading is both first and last
ends([5])
=> { first: 5, last: 5, count: 1 }
--- check case | An empty array
ends([])
=> { first: undefined, last: undefined, count: 0 }

+++ practice | Everything but the ends
--- task
Write a function \`middle(items)\` that returns a **new** array holding every item except the first and the last, using \`slice\`. Do not change \`items\` itself.

So \`middle(['a', 'b', 'c', 'd'])\` is \`['b', 'c']\`. An array of two items or fewer has no middle, so the answer is \`[]\`.
--- starter
function middle(items) {
  return items
}
--- solution
function middle(items) {
  return items.slice(1, items.length - 1)
}
--- hint
The middle starts at index 1 and stops before the last index.
--- hint
\`slice\` leaves out the item at its end index, so the end index is the last index itself: \`items.length - 1\`.
--- check case | Four items
middle(['a', 'b', 'c', 'd'])
=> ['b', 'c']
--- check case | Two items have no middle
middle(['a', 'b'])
=> []
--- check case | One item has no middle
middle(['a'])
=> []
--- check test | The original array is not changed
(() => { const xs = [1, 2, 3]; middle(xs); return xs.length === 3 && xs[0] === 1 })()

+++ practice | Above average
--- task
Write a function \`aboveAverage(values)\` that returns a new array of the numbers in \`values\` that are strictly greater than the average of \`values\`, in their original order.

So \`aboveAverage([2, 4, 6, 8])\` is \`[6, 8]\`, because the average is 5. An empty array gives \`[]\`.
--- starter
function aboveAverage(values) {
  return []
}
--- solution
function aboveAverage(values) {
  if (values.length === 0) {
    return []
  }
  let sum = 0
  for (const v of values) {
    sum += v
  }
  const average = sum / values.length
  const result = []
  for (const v of values) {
    if (v > average) {
      result.push(v)
    }
  }
  return result
}
--- hint
Two passes: one loop to add up the values for the average, then a second loop to pick the big ones.
--- hint
Start the answer as an empty array, \`[]\`, and \`push\` each number that is greater than the average.
--- hint
"Strictly greater" means \`>\`: a value equal to the average is left out.
--- check case | Average 5 keeps 6 and 8
aboveAverage([2, 4, 6, 8])
=> [6, 8]
--- check case | A value equal to the average is left out
aboveAverage([1, 2, 3])
=> [3]
--- check case | All the same: none above
aboveAverage([4, 4, 4])
=> []
--- check case | An empty array
aboveAverage([])
=> []

+++ practice | The spread of readings
--- task
Write a function \`spread(values)\` that returns the largest number minus the smallest. It must handle every case:

- \`spread([-3, 4])\` is \`7\`
- one number, or all numbers the same, gives \`0\`
- an **empty** array also gives \`0\`
--- starter
function spread(values) {
  return Math.max(...values) - Math.min(...values)
}
--- solution
function spread(values) {
  if (values.length === 0) {
    return 0
  }
  return Math.max(...values) - Math.min(...values)
}
--- hint
Try the starter on an empty array. \`Math.max()\` with nothing is \`-Infinity\`, and \`Math.min()\` is \`Infinity\`.
--- hint
Check the length first, and return 0 before spreading an empty array.
--- check case | Negative and positive
spread([-3, 4])
=> 7
--- check case | One number
spread([7])
=> 0
--- check case | All the same
spread([5, 5, 5])
=> 0
--- check case | An empty array gives 0
spread([])
=> 0

+++ practice | Fix the total
--- task
\`total(values)\` should return the sum of the numbers in the array. Instead it returns \`NaN\` for every array, even the empty one. Find the mistake and fix it, keeping the counting loop.

\`total([1, 2, 3])\` should be \`6\`, and \`total([])\` should be \`0\`.
--- starter
function total(values) {
  let sum = 0
  for (let i = 0; i <= values.length; i++) {
    sum += values[i]
  }
  return sum
}
--- solution
function total(values) {
  let sum = 0
  for (let i = 0; i < values.length; i++) {
    sum += values[i]
  }
  return sum
}
--- hint
On the last pass, which index does the loop read? Is there an item there?
--- hint
\`values[values.length]\` is \`undefined\`, and adding \`undefined\` turns the sum into \`NaN\`. The loop must stop one sooner.
--- check case | 1 + 2 + 3 is 6
total([1, 2, 3])
=> 6
--- check case | One number
total([10])
=> 10
--- check case | An empty array gives 0
total([])
=> 0
--- check source | Still a counting loop
for\\s*\\(\\s*let

+++ practice | The longest climb
--- task
A probe sends altitude readings in order. Write a function \`longestRise(readings)\` that returns the length of the longest run of readings in a row where each one is **strictly greater** than the one before it.

- \`longestRise([1, 2, 3, 1, 2])\` is \`3\` (the run 1, 2, 3).
- A single reading is a run of length \`1\`, and so is every reading when none of them rises.
- Equal readings break a run: \`longestRise([3, 3, 3])\` is \`1\`.
- An empty array gives \`0\`.
--- starter
function longestRise(readings) {
  return readings.length
}
--- solution
function longestRise(readings) {
  if (readings.length === 0) {
    return 0
  }
  let best = 1
  let current = 1
  for (let i = 1; i < readings.length; i++) {
    if (readings[i] > readings[i - 1]) {
      current++
    } else {
      current = 1
    }
    if (current > best) {
      best = current
    }
  }
  return best
}
--- hint
You need each reading and the one before it, so use a counting loop that starts at index 1 and compares \`readings[i]\` with \`readings[i - 1]\`.
--- hint
Keep two numbers: the length of the run you are in now, and the best run so far. A rise adds one to the current run; anything else starts it again at 1.
--- hint
Handle the empty array before the loop: it has no runs at all.
--- check case | A run of three
longestRise([1, 2, 3, 1, 2])
=> 3
--- check case | The best run comes last
longestRise([1, 2, 1, 2, 3, 4])
=> 4
--- check case | Equal readings break a run
longestRise([3, 3, 3])
=> 1
--- check case | Falling all the way
longestRise([5, 4, 3])
=> 1
--- check case | One reading
longestRise([5])
=> 1
--- check case | No readings
longestRise([])
=> 0

=== js-09 | Objects
--- teach
Last lesson a function handed back two results in curly braces, \`{ low: …, high: … }\`. That was an object. This lesson is about objects properly: how to read them, change them, copy them and count with them.

Picture an ID card. It has labelled fields: Name, Plan, Credits. You find a piece of information by its label, not by its position. An array is a numbered row; an object is a set of labelled fields.

### Making an object

An **object** groups named values together, inside curly braces \`{\` and \`}\`. Each entry is a name, a colon \`:\`, and a value, with commas between entries. Each entry is called a **property**, and its name is often called its **[[key|key-value]]**:

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
console.log(user)   // { name: "Ada", plan: "pro", credits: 120 }
\`\`\`

The values can be anything: strings, numbers, booleans, arrays, even other objects.

### Reading a property: the dot

Write the object, a dot, and the key:

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
console.log(user.name)       // Ada
console.log(user.nickname)   // undefined: there is no such property
\`\`\`

Reading a property that is not there is not an error. It gives \`undefined\`.

### Reading with brackets

You can also put the key in square brackets, as a string. Brackets take **any** string, including one held in a variable:

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
console.log(user['plan'])   // pro
const field = 'credits'
console.log(user[field])    // 120: the value of field is 'credits'
\`\`\`

**Watch out:** \`user.field\` does not use the variable \`field\`. It looks for a property literally called "field", finds none, and gives \`undefined\`. When the key is in a variable, you must use brackets. This is the [[one real difference between the dot and brackets|dot-vs-brackets]].

### Changing and adding properties

Assign to a property to change it. Assign to a key that does not exist yet and it is added:

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
user.credits -= 20     // now 100
user.team = 'blue'     // a new property
console.log(user)      // { name: "Ada", plan: "pro", credits: 100, team: "blue" }
\`\`\`

As with arrays, \`const\` stops you pointing \`user\` at a different object, but the object's properties can still change.

### Listing the keys

\`Object.keys(obj)\` hands back an array of an object's keys, in the order they were added. \`Object.values(obj)\` hands back the values. With a loop you can visit every property:

\`\`\`js
const stock = { bolts: 40, nuts: 25 }
console.log(Object.keys(stock))   // [ "bolts", "nuts" ]
for (const key of Object.keys(stock)) {
  console.log(key, stock[key])
}
\`\`\`

That loop prints \`bolts 40\`, then \`nuts 25\`. Inside it, \`key\` is a variable, so it needs brackets: \`stock[key]\`.

### Pulling properties out: destructuring

To make variables from several properties at once, write the keys in curly braces on the left of \`=\`:

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
const { name, plan } = user
console.log(name, plan)   // Ada pro
\`\`\`

That is called **[[destructuring|destructuring]]**. It is the same as writing \`const name = user.name\` and \`const plan = user.plan\`, in one line. Each new variable takes the name of its key.

### A copy with a change: spread

Three dots \`...\` inside an object's braces **spread** another object's properties into it. Add a property after the spread, and it replaces the copied one:

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
const trial = { ...user, plan: 'free' }
console.log(trial.plan)   // free
console.log(user.plan)    // pro: the original is unchanged
\`\`\`

This makes a new object and leaves the old one alone, which is often safer than changing an object that other code is also using. It is a [[shallow copy|shallow-copy]].

### A fallback for missing values: ??

The \`??\` operator (two question marks) supplies a fallback. \`a ?? b\` is \`a\`, unless \`a\` is \`null\` or \`undefined\`, in which case it is \`b\`:

\`\`\`js
const user = { name: 'Ada', plan: 'pro', credits: 120 }
console.log(user.nickname ?? user.name)   // Ada: there is no nickname
console.log(user.credits ?? 0)            // 120: credits is there
\`\`\`

This gives the classic way to count things with an object. Take an empty object, \`counts = {}\`. The first time a word turns up, \`counts[word]\` is \`undefined\`, so \`(counts[word] ?? 0) + 1\` is \`0 + 1\`. The next time, it is the stored count plus one. Storing that back in \`counts[word]\` counts every word.

**Watch out:** \`??\` falls back only on \`null\` and \`undefined\`. A value of \`0\`, \`false\` or \`''\` is kept. That is usually what you want, and it is [[what makes ?? better than an older way of writing fallbacks|nullish]], which throws away \`0\` as well.

### Lists of objects

Objects and arrays combine. A list of records is an array of objects:

\`\`\`js
const crew = [
  { name: 'Ada', role: 'pilot' },
  { name: 'Lin', role: 'engineer' },
]
console.log(crew[1].role)   // engineer
for (const member of crew) {
  console.log(\`\${member.name} flies as \${member.role}\`)
}
\`\`\`

Objects are how JavaScript represents almost everything: a request to a server, a row from a database, a setting in a config file. Most of it travels between programs as [[JSON|json]].

::: context key-value Keys and values
A key is the label and a value is what the label points to, like a word and its definition in a dictionary. Python calls this kind of structure a dictionary; other languages call it a map or a hash. In JavaScript, keys are strings: in \`{ credits: 120 }\` the key is the string \`'credits'\`, written without quotes because it is a plain word. A key with a space or a dash in it needs quotes: \`{ 'launch-site': 'Kourou' }\`.
:::

::: context dot-vs-brackets When you need brackets
Use the dot when you know the key while writing the code: \`user.name\`. Use brackets when the key is only known while the program runs, because it sits in a variable, comes from a loop, or was typed by a person: \`user[field]\`. You also need brackets for keys that are not plain words, like \`user['launch-site']\`. Behind the scenes both forms do the same lookup; the dot is a shorthand for brackets with a fixed word.
:::

::: context destructuring Unpacking a box
"Destructuring" sounds like breaking something, but nothing is broken: the object is unchanged. It is more like unpacking a box onto a table, each item with its own label. It works in a function's parameters too, so \`function show({ name, plan }) { … }\` takes an object and unpacks it on the way in. It also works on arrays by position: \`const [first, second] = list\`.
:::

::: context shallow-copy Shallow means one level deep
\`{ ...user }\` copies the top-level properties into a new object. If one of those properties holds an array or another object, the copy points at the *same* inner array, not a copy of it. Change the inner array through the copy and the original sees the change as well. That is what "shallow" means. For flat objects of strings and numbers, as in this lesson, a shallow copy is a full copy.
:::

::: context nullish ?? versus ||
Before \`??\` arrived in 2020, people wrote fallbacks with \`||\` (or): \`settings.volume || 50\`. But \`||\` falls back on any "falsy" value: \`0\`, \`''\`, \`false\`, \`null\`, \`undefined\` and \`NaN\`. So a volume deliberately set to 0 came back as 50, a real and common bug. \`??\` falls back only when the value is missing (\`null\` or \`undefined\`), so \`0 ?? 50\` is \`0\`. The name "nullish" means "null or undefined".
:::

::: context json How objects travel
JSON, short for JavaScript Object Notation, is a text format that looks almost exactly like a JavaScript object: \`{"name": "Ada", "credits": 120}\`. The differences are small. Keys must be in double quotes, strings use double quotes, and there are no functions or \`undefined\`. Nearly every web API, including the APIs of AI models, sends and receives JSON. When your program gets JSON text, it turns it into a real object, and you read it with dots and brackets as in this lesson.
:::
--- task
Write a function \`countWords(text)\` that returns an object mapping each word, in small letters, to how many times it appears in \`text\`. Words are separated by whitespace, and capitals do not matter: \`The\` and \`the\` are the same word.

For example, \`countWords('the The cat')\` is \`{ the: 2, cat: 1 }\`. The empty string has no words, so it gives \`{}\`.
--- starter
function countWords(text) {
  const counts = {}
  return counts
}
--- solution
function countWords(text) {
  const counts = {}
  for (const word of text.toLowerCase().split(/\\s+/)) {
    if (word === '') continue
    counts[word] = (counts[word] ?? 0) + 1
  }
  return counts
}
--- hint
Make the text small, split it on \`/\\s+/\`, and loop over the words.
--- hint
The word is in a variable, so use brackets: \`counts[word]\`. The first time, it is \`undefined\`, and \`??\` turns that into 0.
--- hint
Splitting the empty string gives one empty word. Skip a word that is \`''\` with \`continue\`.
--- check case | Counts repeated words
countWords('to be or not to be')
=> {"to": 2, "be": 2, "or": 1, "not": 1}
--- check case | Ignores case
countWords('The the THE').the
=> 3
--- check case | The empty string gives {}
countWords('')
=> {}

+++ practice | Describe a planet
--- task
Write a function \`describe(planet)\`. It takes an object with a \`name\` and a number of \`moons\`, like \`{ name: 'Mars', moons: 2 }\`, and returns a sentence:

- \`describe({ name: 'Mars', moons: 2 })\` is \`'Mars has 2 moons'\`
- with exactly one moon, the word is \`moon\`: \`describe({ name: 'Earth', moons: 1 })\` is \`'Earth has 1 moon'\`
- \`describe({ name: 'Venus', moons: 0 })\` is \`'Venus has 0 moons'\`

Pull \`name\` and \`moons\` out of the object with destructuring.
--- starter
function describe(planet) {
  return planet.name
}
--- solution
function describe(planet) {
  const { name, moons } = planet
  const word = moons === 1 ? 'moon' : 'moons'
  return \`\${name} has \${moons} \${word}\`
}
--- hint
\`const { name, moons } = planet\` makes two variables in one line.
--- hint
Choosing between \`'moon'\` and \`'moons'\` is a job for a ternary.
--- check case | Two moons
describe({ name: 'Mars', moons: 2 })
=> 'Mars has 2 moons'
--- check case | One moon is singular
describe({ name: 'Earth', moons: 1 })
=> 'Earth has 1 moon'
--- check case | Zero moons is plural
describe({ name: 'Venus', moons: 0 })
=> 'Venus has 0 moons'
--- check source | Uses destructuring
const\\s*\\{\\s*\\w+\\s*,\\s*\\w+\\s*\\}\\s*=

+++ practice | Settings with defaults
--- task
Write a function \`withDefaults(settings)\` that returns a new object with two properties:

- \`theme\`: the \`theme\` from \`settings\`, or \`'light'\` when it is missing (\`null\` or \`undefined\`)
- \`fontSize\`: the \`fontSize\` from \`settings\`, or \`14\` when it is missing

A \`fontSize\` of \`0\` is a real choice and must be kept. So \`withDefaults({ fontSize: 0 })\` is \`{ theme: 'light', fontSize: 0 }\`.
--- starter
function withDefaults(settings) {
  return { theme: settings.theme || 'light', fontSize: settings.fontSize || 14 }
}
--- solution
function withDefaults(settings) {
  return { theme: settings.theme ?? 'light', fontSize: settings.fontSize ?? 14 }
}
--- hint
Which operator falls back only on \`null\` and \`undefined\`, and keeps \`0\`?
--- hint
\`||\` throws away \`0\` as well, so \`0 || 14\` is \`14\`.
--- check case | Everything missing
withDefaults({})
=> { theme: 'light', fontSize: 14 }
--- check case | A theme given is kept
withDefaults({ theme: 'dark' })
=> { theme: 'dark', fontSize: 14 }
--- check case | A font size of 0 is kept
withDefaults({ fontSize: 0 })
=> { theme: 'light', fontSize: 0 }
--- check case | null counts as missing
withDefaults({ theme: null, fontSize: 20 })
=> { theme: 'light', fontSize: 20 }

+++ practice | Restock without changing the original
--- task
Write a function \`restock(inventory, item, amount)\`. \`inventory\` is an object mapping item names to counts, like \`{ bolts: 4 }\`. Return a **new** object that is a copy of \`inventory\` with \`amount\` added to \`item\`'s count. If the item is not in the inventory yet, its count starts at 0.

Do not change \`inventory\` itself: copy it with spread, then change the copy.
--- starter
function restock(inventory, item, amount) {
  inventory[item] = inventory[item] + amount
  return inventory
}
--- solution
function restock(inventory, item, amount) {
  const copy = { ...inventory }
  copy[item] = (copy[item] ?? 0) + amount
  return copy
}
--- hint
\`{ ...inventory }\` is a new object with the same properties. Change that one.
--- hint
The item's name is in a variable, so use brackets. A missing count is \`undefined\`: give it a fallback of 0 with \`??\`.
--- check case | Adds to an item that is there
restock({ bolts: 4 }, 'bolts', 6)
=> { bolts: 10 }
--- check case | A new item starts at 0
restock({ bolts: 4 }, 'nuts', 3)
=> { bolts: 4, nuts: 3 }
--- check case | Works on an empty inventory
restock({}, 'tape', 1)
=> { tape: 1 }
--- check test | The original is not changed
(() => { const inv = { bolts: 4 }; restock(inv, 'bolts', 6); return inv.bolts === 4 && Object.keys(inv).length === 1 })()

+++ practice | Swap keys and values
--- task
Write a function \`invert(obj)\` that returns a new object where every value of \`obj\` becomes a key, and its key becomes the value. All the values are strings.

- \`invert({ a: 'x', b: 'y' })\` is \`{ x: 'a', y: 'b' }\`.
- If two keys share a value, the **later** key wins: \`invert({ a: 'x', b: 'x' })\` is \`{ x: 'b' }\`.
- \`invert({})\` is \`{}\`.
--- starter
function invert(obj) {
  return obj
}
--- solution
function invert(obj) {
  const result = {}
  for (const key of Object.keys(obj)) {
    result[obj[key]] = key
  }
  return result
}
--- hint
Loop over \`Object.keys(obj)\`. For each key, its value is \`obj[key]\`.
--- hint
In the new object, the value is the key: \`result[obj[key]] = key\`. A later key with the same value writes over the earlier one, which is what the task wants.
--- check case | Two different values
invert({ a: 'x', b: 'y' })
=> { x: 'a', y: 'b' }
--- check case | A shared value keeps the later key
invert({ a: 'x', b: 'x' })
=> { x: 'b' }
--- check case | An empty object
invert({})
=> {}

+++ practice | Fix the order total
--- task
\`orderTotal(prices, items)\` should add up the price of every item in the \`items\` array, looking each one up in the \`prices\` object. An item may appear more than once.

So \`orderTotal({ tea: 3, cake: 4 }, ['tea', 'cake', 'tea'])\` should be \`10\`. Instead it is \`NaN\`. Find the mistake and fix it.
--- starter
function orderTotal(prices, items) {
  let total = 0
  for (const item of items) {
    total += prices.item
  }
  return total
}
--- solution
function orderTotal(prices, items) {
  let total = 0
  for (const item of items) {
    total += prices[item]
  }
  return total
}
--- hint
\`prices.item\` looks for a property called "item". Is there one?
--- hint
The name of the item is held in the variable \`item\`. Reading a property by a variable's value needs square brackets.
--- check case | Tea twice and a cake
orderTotal({ tea: 3, cake: 4 }, ['tea', 'cake', 'tea'])
=> 10
--- check case | One item
orderTotal({ tea: 3, cake: 4 }, ['cake'])
=> 4
--- check case | No items costs nothing
orderTotal({ tea: 3 }, [])
=> 0

+++ practice | Done and to do
--- task
Write a function \`groupByStatus(tasks)\`. \`tasks\` is an array of objects like \`{ name: 'fuel', done: true }\`. Return an object with two properties, **always both**:

- \`done\`: an array of the names of the tasks whose \`done\` is \`true\`, in order
- \`todo\`: an array of the names of the rest, in order

So \`groupByStatus([{ name: 'fuel', done: true }, { name: 'check', done: false }])\` is \`{ done: ['fuel'], todo: ['check'] }\`, and \`groupByStatus([])\` is \`{ done: [], todo: [] }\`.
--- starter
function groupByStatus(tasks) {
  return {}
}
--- solution
function groupByStatus(tasks) {
  const groups = { done: [], todo: [] }
  for (const task of tasks) {
    if (task.done) {
      groups.done.push(task.name)
    } else {
      groups.todo.push(task.name)
    }
  }
  return groups
}
--- hint
Start with the answer's shape: an object whose two properties are empty arrays.
--- hint
Loop over the tasks and \`push\` each name onto one array or the other.
--- check case | One of each
groupByStatus([{ name: 'fuel', done: true }, { name: 'check', done: false }])
=> { done: ['fuel'], todo: ['check'] }
--- check case | Order is kept
groupByStatus([{ name: 'a', done: false }, { name: 'b', done: true }, { name: 'c', done: false }, { name: 'd', done: true }])
=> { done: ['b', 'd'], todo: ['a', 'c'] }
--- check case | All done still has an empty todo
groupByStatus([{ name: 'x', done: true }])
=> { done: ['x'], todo: [] }
--- check case | No tasks
groupByStatus([])
=> { done: [], todo: [] }

=== js-10 | map, filter and reduce
--- teach
In lesson 8 you built new arrays by hand: make an empty array, loop, \`push\` the items you want, return it. In lesson 7 you learned that a function can be handed to another function as a callback. This lesson joins the two ideas. Arrays have three methods that run the loop for you, and you only write the part that changes: what to do with each item.

Picture a factory line. At one station, a machine paints every box that passes. At the next, an inspector lifts off the faulty boxes and lets the good ones through. At the end, a packer puts everything that is left into a single crate. Those three stations are \`map\`, \`filter\` and \`reduce\`.

### map: change every item

\`map\` takes a function, calls it once for each item, and hands back a **new** array of the results, one result per item:

\`\`\`js
const nums = [1, 2, 3, 4, 5, 6]
console.log(nums.map((n) => n * n))   // [ 1, 4, 9, 16, 25, 36 ]
\`\`\`

The callback \`(n) => n * n\` gets one item and returns what that item becomes. The new array always has the same length as the old one.

It works on arrays of objects, which is where it is used most:

\`\`\`js
const crew = [{ name: 'Ada', age: 36 }, { name: 'Lin', age: 29 }]
console.log(crew.map((m) => m.name))   // [ "Ada", "Lin" ]
\`\`\`

### filter: keep some items

\`filter\` takes a function that returns \`true\` or \`false\`. It hands back a new array holding only the items for which the function said \`true\`, in their original order:

\`\`\`js
const nums = [1, 2, 3, 4, 5, 6]
console.log(nums.filter((n) => n % 2 === 0))   // [ 2, 4, 6 ]
\`\`\`

A function that answers yes or no like this is often called a **test**, or a predicate.

### reduce: fold everything into one value

\`reduce\` boils a whole array down to one value, like a total. It takes two arguments: a function, and a **starting value**:

\`\`\`js
const nums = [1, 2, 3, 4, 5, 6]
console.log(nums.reduce((sum, n) => sum + n, 0))   // 21
\`\`\`

The function gets two things: the result so far, here called \`sum\`, and the next item, \`n\`. Whatever it returns becomes the new result so far. The result so far is called the **[[accumulator|accumulator]]**. Step by step:

- \`sum\` starts at the starting value, \`0\`.
- With item 1: \`0 + 1\` is 1. With item 2: \`1 + 2\` is 3. Then 6, 10, 15, and finally 21.

**Watch out:** always give \`reduce\` its starting value. If you leave it out, \`reduce\` uses the first item as the start. With numbers that sometimes works by luck. With objects it goes badly wrong, and on an empty array it [[stops the program with an error|reduce-empty]].

### They never change the original

All three hand back something new. The original array is untouched:

\`\`\`js
const nums = [1, 2, 3]
const doubled = nums.map((n) => n * 2)
console.log(doubled)   // [ 2, 4, 6 ]
console.log(nums)      // [ 1, 2, 3 ]
\`\`\`

Code that makes new values instead of changing old ones is easier to trust, because nothing else can be changed behind your back. Engineers call such functions **[[pure|pure]]**.

### Chaining

Because \`filter\` and \`map\` hand back arrays, you can call the next method straight away. Read a chain left to right, like a sentence: "take the numbers, keep the ones above 2, then multiply each by 10":

\`\`\`js
const nums = [1, 2, 3, 4, 5, 6]
console.log(nums.filter((n) => n > 2).map((n) => n * 10))   // [ 30, 40, 50, 60 ]
\`\`\`

### The position, if you need it

\`map\` and \`filter\` also pass the item's index to your function, as a second argument. Most of the time you ignore it, but it is there when you want it:

\`\`\`js
const letters = ['x', 'y', 'z']
console.log(letters.map((ch, i) => i + ch))   // [ "0x", "1y", "2z" ]
\`\`\`

These three methods, chained together, are the everyday way to [[shape data|pipelines]] in JavaScript.

::: context accumulator The running total
An accumulator is anything that collects as it goes, like a tally counter or a jar you drop coins into. In \`reduce\`, it can be any kind of value, not only a number. It can be a string you add to, an array you grow, or an object you count into. A good habit is to name it after what it holds, such as \`sum\`, \`total\`, \`longest\` or \`counts\`, rather than \`acc\` or \`a\`, so the line still makes sense when you come back to it.
:::

::: context reduce-empty When reduce has nothing to start from
Without a starting value, \`reduce\` takes the first item as the accumulator and begins from the second item. An empty array has no first item, so \`[].reduce((a, b) => a + b)\` throws \`TypeError: Reduce of empty array with no initial value\`. With objects, the first item is an object, so \`sum + r.ms\` adds a number to an object, and the result is nonsense text like \`'[object Object]80'\`. Giving the starting value fixes both.
:::

::: context pure Why new beats changed
A pure function's answer depends only on its inputs, and it changes nothing outside itself. Call it twice with the same inputs and you get the same answer, which makes it easy to test. If \`map\` changed your array in place, any other part of the program holding that array would see it change without warning. Popular tools for building web pages, like React, rely on data being replaced with new copies rather than changed.
:::

::: context pipelines Data pipelines everywhere
Filter, then transform, then summarise: that pattern is how engineers process data in every language. SQL does it with \`WHERE\`, \`SELECT\` and \`SUM\`. Python's data tools, which you will meet in the AI courses, do it on tables of millions of rows. When you prepare examples for an AI model, you will filter out bad records, map each record into the right shape, and reduce them to counts and averages to check your work.
:::
--- task
\`requests\` is an array of objects like \`{ user: 'ada', tokens: 1200 }\`. Write two functions:

- \`heavyUsers(requests)\` returns an array of the \`user\` names of the requests that used more than 1000 tokens, in order. Use \`filter\`, then \`map\`.
- \`totalTokens(requests)\` returns the sum of all the requests' tokens. Use \`reduce\`. An empty array totals 0.
--- starter
function heavyUsers(requests) {
  return []
}

function totalTokens(requests) {
  return 0
}
--- solution
function heavyUsers(requests) {
  return requests.filter((r) => r.tokens > 1000).map((r) => r.user)
}

function totalTokens(requests) {
  return requests.reduce((sum, r) => sum + r.tokens, 0)
}
--- hint
For \`heavyUsers\`, first keep the requests whose \`tokens\` are over 1000, then turn each request that is left into its \`user\`.
--- hint
Chain them: \`filter\` hands back an array, so \`map\` can run on it straight away. Each callback gets one request object.
--- hint
For \`totalTokens\`, the accumulator is the running sum, the item is a request, and you add its \`tokens\`. Do not forget the starting value, 0, so the empty array works.
--- check case | heavyUsers keeps the big requests' users
heavyUsers([{ user: 'ada', tokens: 1200 }, { user: 'lin', tokens: 300 }, { user: 'sam', tokens: 15000 }])
=> ["ada", "sam"]
--- check case | totalTokens adds them up
totalTokens([{ user: 'ada', tokens: 1200 }, { user: 'lin', tokens: 300 }])
=> 1500
--- check case | totalTokens of nothing is 0
totalTokens([])
=> 0
--- check source | Uses reduce
\\.reduce\\(

+++ practice | A numbered list
--- task
Write a function \`numbered(items)\` that returns a new array where each string has its position in front, counting from 1, then a full stop and a space. Use \`map\` with its second argument, the index.

So \`numbered(['fuel', 'check', 'go'])\` is \`['1. fuel', '2. check', '3. go']\`, and \`numbered([])\` is \`[]\`.
--- starter
function numbered(items) {
  return items.map((item) => item)
}
--- solution
function numbered(items) {
  return items.map((item, i) => \`\${i + 1}. \${item}\`)
}
--- hint
\`map\` passes the index as the callback's second argument: \`(item, i) => …\`.
--- hint
The index starts at 0, but the list starts at 1, so show \`i + 1\`.
--- check case | Three items
numbered(['fuel', 'check', 'go'])
=> ['1. fuel', '2. check', '3. go']
--- check case | One item
numbered(['solo'])
=> ['1. solo']
--- check case | No items
numbered([])
=> []

+++ practice | Passing scores
--- task
Write a function \`passing(scores, mark)\` that returns a new array of the scores that are \`mark\` or more, in their original order. Use \`filter\`, and leave \`scores\` itself unchanged.

So \`passing([55, 70, 82, 69], 70)\` is \`[70, 82]\`.
--- starter
function passing(scores, mark) {
  return scores
}
--- solution
function passing(scores, mark) {
  return scores.filter((s) => s >= mark)
}
--- hint
The callback for \`filter\` returns \`true\` for a score to keep.
--- hint
"\`mark\` or more" includes the mark itself, so use \`>=\`.
--- check case | Keeps 70 and 82
passing([55, 70, 82, 69], 70)
=> [70, 82]
--- check case | Nobody passes
passing([10, 20], 90)
=> []
--- check case | An empty array
passing([], 50)
=> []
--- check test | The original array is not changed
(() => { const xs = [40, 90]; passing(xs, 50); return xs.length === 2 && xs[0] === 40 })()
--- check source | Uses filter
\\.filter\\(

+++ practice | The average score
--- task
\`results\` is an array of objects like \`{ name: 'ada', score: 90 }\`. Write a function \`averageScore(results)\` that returns the average of the scores, rounded to 1 decimal, as a number. Add the scores up with \`reduce\`.

An empty array has no average: return \`0\`.
--- starter
function averageScore(results) {
  return 0
}
--- solution
function averageScore(results) {
  if (results.length === 0) {
    return 0
  }
  const total = results.reduce((sum, r) => sum + r.score, 0)
  return Number((total / results.length).toFixed(1))
}
--- hint
\`reduce\` with a starting value of 0 adds up \`r.score\` for every result.
--- hint
Divide by the number of results, then round with \`toFixed(1)\` and turn it back into a number with \`Number\`.
--- hint
Dividing by zero results gives \`NaN\`. Return 0 first when the array is empty.
--- check case | Three scores
averageScore([{ name: 'a', score: 90 }, { name: 'b', score: 85 }, { name: 'c', score: 72 }])
=> 82.3
--- check case | One score
averageScore([{ name: 'a', score: 64 }])
=> 64
--- check case | No scores gives 0
averageScore([])
=> 0
--- check source | Uses reduce
\\.reduce\\(

+++ practice | The longest word, by reduce
--- task
Write a function \`longest(words)\` that returns the longest string in the array \`words\`, using \`reduce\`.

- If several words tie for longest, return the **first** of them.
- An empty array returns \`''\`.

So \`longest(['go', 'orbit', 'comet'])\` is \`'orbit'\`.
--- starter
function longest(words) {
  return words.reduce((best, w) => (w.length >= best.length ? w : best))
}
--- solution
function longest(words) {
  return words.reduce((best, w) => (w.length > best.length ? w : best), '')
}
--- hint
The accumulator is the longest word so far. Each step keeps it, or replaces it with a longer word.
--- hint
Starting from \`''\` means the empty array gives \`''\` and the first word always beats the start.
--- hint
With \`>=\`, a later word of the same length takes over. Which comparison keeps the first?
--- check case | A tie keeps the first
longest(['go', 'orbit', 'comet'])
=> 'orbit'
--- check case | One word
longest(['a'])
=> 'a'
--- check case | An empty array gives ''
longest([])
=> ''
--- check source | Uses reduce
\\.reduce\\(

+++ practice | Fix the total time
--- task
\`totalMs(requests)\` should add up the \`ms\` of every request object, so \`totalMs([{ ms: 120 }, { ms: 80 }])\` is \`200\`. Instead it returns the strange text \`'[object Object]80'\`, and on an empty array it stops the program with a \`TypeError\`. Fix it, still using \`reduce\`. An empty array should total \`0\`.
--- starter
function totalMs(requests) {
  return requests.reduce((sum, r) => sum + r.ms)
}
--- solution
function totalMs(requests) {
  return requests.reduce((sum, r) => sum + r.ms, 0)
}
--- hint
With no starting value, what does \`sum\` hold on the first step?
--- hint
The first request object becomes the starting sum, and an object plus a number turns into text. Give \`reduce\` a starting value.
--- check case | Two requests
totalMs([{ ms: 120 }, { ms: 80 }])
=> 200
--- check case | One request gives its number
totalMs([{ ms: 5 }])
=> 5
--- check case | No requests gives 0
totalMs([])
=> 0
--- check source | Still uses reduce
\\.reduce\\(

+++ practice | The big spenders
--- task
\`requests\` is an array of objects like \`{ user: 'ada', tokens: 600 }\`, and the same user can appear many times. Write a function \`bigSpenders(requests, limit)\` that returns an array of the users whose tokens, added up over all their requests, are **more than** \`limit\`. List each user once, in the order they first appear.

1. Use \`reduce\` with a starting value of \`{}\` to build an object mapping each user to their total.
2. Then use \`filter\` on that object's keys.

So with Ada at 600 + 700, Lin at 300 and Sam at 1500, \`bigSpenders(requests, 1000)\` is \`['ada', 'sam']\`. A total exactly equal to \`limit\` is not more than it.
--- starter
function bigSpenders(requests, limit) {
  return requests.filter((r) => r.tokens > limit).map((r) => r.user)
}
--- solution
function bigSpenders(requests, limit) {
  const totals = requests.reduce((acc, r) => {
    acc[r.user] = (acc[r.user] ?? 0) + r.tokens
    return acc
  }, {})
  return Object.keys(totals).filter((user) => totals[user] > limit)
}
--- hint
The accumulator is an object. In each step, add the request's tokens to its user's total, using brackets and \`??\`, then return the object.
--- hint
A callback with braces needs \`return\`. Here it must return the accumulator, or the next step gets \`undefined\`.
--- hint
\`Object.keys(totals)\` lists the users in the order they were first added. Keep those whose total is more than the limit.
--- check case | Totals per user decide, not single requests
bigSpenders([{ user: 'ada', tokens: 600 }, { user: 'lin', tokens: 300 }, { user: 'ada', tokens: 700 }, { user: 'sam', tokens: 1500 }], 1000)
=> ['ada', 'sam']
--- check case | Exactly the limit is not more
bigSpenders([{ user: 'kim', tokens: 1000 }], 1000)
=> []
--- check case | Each user listed once
bigSpenders([{ user: 'max', tokens: 2000 }, { user: 'max', tokens: 2000 }], 100)
=> ['max']
--- check case | No requests
bigSpenders([], 10)
=> []

=== js-11 | Errors
--- teach
You have already met errors: \`ReferenceError\` when a name was missing, \`TypeError\` when you reassigned a \`const\`. Each time, the program stopped dead. Real programs cannot stop every time a user types nonsense or a file is broken. This lesson shows you how to catch an error and carry on, and how to raise one yourself.

Picture a fire alarm in a building. When someone spots smoke, they pull the alarm. Everyone stops what they were doing, and the trained fire warden takes over. And whatever happened, someone checks the doors are shut at the end of the day.

### What an error is

When something goes wrong, JavaScript **throws** an error. An error is an object with a \`name\`, like \`'TypeError'\`, and a \`message\` saying what went wrong. If nothing catches it, the program stops at that line, and nothing after it runs:

\`\`\`js error
const data = JSON.parse('{ not json')
console.log('this line never runs')
\`\`\`

\`JSON.parse\` turns text written in [[JSON|json-parse]] into a real JavaScript value. \`'{ not json'\` is not valid JSON, so it throws \`SyntaxError\`, and the program stops before the \`console.log\`.

### try and catch

Put risky code inside a \`try\` block. If anything in it throws, JavaScript jumps straight to the \`catch\` block, and the program carries on after it instead of stopping:

\`\`\`js
try {
  JSON.parse('{ not json')
  console.log('parsed')          // skipped: the line above threw
} catch (err) {
  console.log('bad input:', err.name)
}
console.log('still running')
\`\`\`

\`\`\`
bad input: SyntaxError
still running
\`\`\`

\`err\` is the error object that was thrown. You can name it anything; \`err\` and \`e\` are the usual choices. \`err.name\` is its type, and \`err.message\` is the sentence explaining it. If nothing in the \`try\` block throws, the \`catch\` block is skipped entirely.

### Throwing your own

Your own functions can throw, when they are given something they cannot work with. Write \`throw\`, then make an error with \`new\`:

\`\`\`js
function percent(part, whole) {
  if (whole === 0) throw new RangeError('whole must not be zero')
  return (part / whole) * 100
}
console.log(percent(1, 4))   // 25
\`\`\`

(An \`if\` whose block is a single statement may leave out the braces and put it on the same line, as here.)

\`new RangeError('…')\` makes a **[[new|new-keyword]]** error object with your message. JavaScript has [[several kinds of error|error-types]]. The three you will throw most are:

- \`Error\`: something went wrong, in general.
- \`TypeError\`: a value is the wrong type, like text where a number was needed.
- \`RangeError\`: a value is the right type but outside the allowed range, like a percentage of 150.

\`throw\` stops the function at once, like \`return\`, but nothing is handed back. Instead the error [[travels up to whoever called the function|bubbling]], and on up, until a \`catch\` takes it, or the program stops.

### Checking for whole numbers

\`Number.isInteger(x)\` answers \`true\` when \`x\` is a whole number, and \`false\` for anything else, including decimals and \`NaN\`:

\`\`\`js
console.log(Number.isInteger(42))              // true
console.log(Number.isInteger(Number('8.5')))   // false: 8.5 is not whole
console.log(Number.isInteger(Number('abc')))   // false: NaN
\`\`\`

**Watch out:** \`Number('')\` and \`Number('   ')\` are both \`0\`, not \`NaN\`. Empty or blank text quietly becomes the whole number zero. When text comes from a person, check for blank text on its own.

### finally: runs no matter what

A \`finally\` block after \`catch\` runs whether or not anything was thrown. It is for clean-up that must always happen, like closing a file or hiding a "loading" spinner:

\`\`\`js
try {
  console.log('opening the valve')
  JSON.parse('oops')
} catch (err) {
  console.log('caught:', err.name)
} finally {
  console.log('valve closed')
}
\`\`\`

That prints \`opening the valve\`, \`caught: SyntaxError\`, then \`valve closed\`. Without the bad \`JSON.parse\`, it would print the first line and \`valve closed\`.

**Watch out:** do not wrap everything in \`try\` and ignore the error. A \`catch\` that does nothing [[hides your bugs|swallow]] as well as bad input. Catch an error only where you can do something sensible about it, like asking again or using a default.

Your task checks network **[[port numbers|ports]]**, which must fit in a fixed range.

::: context json-parse Text in, value out
\`JSON.parse\` reads JSON text and builds the matching JavaScript value: \`JSON.parse('{"a": 1}')\` gives the object \`{ a: 1 }\`, and \`JSON.parse('[1, 2]')\` gives an array. Its partner, \`JSON.stringify\`, goes the other way, turning a value into JSON text for sending or saving. Data from outside your program, like an API's reply or a saved file, arrives as text, so parsing it, and catching the error when it is broken, is an everyday job.
:::

::: context new-keyword What new does
\`new\` makes a fresh object from a blueprint. \`new RangeError('too big')\` builds a new error object whose \`name\` is \`'RangeError'\` and whose \`message\` is \`'too big'\`. It also records where in the code the error was made, which is how error messages can point at the right line. You will use \`new\` with other blueprints later in the course, starting with \`new Promise\` in the next lesson.
:::

::: context error-types Picking the right kind
The kind of error is a message to whoever catches it. A \`TypeError\` says "you handed me the wrong kind of thing"; a \`RangeError\` says "right kind, wrong size". A catcher can read \`err.name\` and react differently to each. Besides the three in the lesson, JavaScript throws \`SyntaxError\` for code or JSON it cannot read, and \`ReferenceError\` for a name that does not exist. You throw those two less often yourself.
:::

::: context bubbling Errors travel up
Suppose \`main\` calls \`loadSettings\`, which calls \`parsePort\`, which throws. \`parsePort\` stops. If \`loadSettings\` has no \`try\` around the call, it stops too, and so on up the chain of calls, which programmers call the **call stack**, until some function catches the error. If none does, the program stops and prints the error with a list of the functions it passed through. That list, the stack trace, is the first thing to read when you debug.
:::

::: context swallow Swallowed errors
A \`catch\` block that does nothing is called "swallowing" the error. It feels safe, because the program no longer stops, but a mistake in your own code, like a misspelled name, is swallowed too. The program then carries on with wrong data, and fails somewhere far away, much harder to trace. At the least, log what was caught. Better still, only catch around the one risky line, and handle only the case you expected.
:::

::: context ports Why ports stop at 65535
A computer runs many network programs at once, and each one listens on a numbered **port**, like flats in one building sharing a street address. Web servers usually use port 80 or 443, and a development server might use 8080. The port number is stored in 16 bits, so it ranges from 0 to 65535, which is 2 to the power 16, minus one. Port 0 is reserved, so a usable port is 1 to 65535.
:::
--- task
Write a function \`parsePort(text)\` that turns text into a port number:

- If \`text\` is a whole number from 1 to 65535, return that number.
- If it is not a whole number at all, return \`null\`. That is when \`Number.isInteger(Number(text))\` is \`false\`, and also when \`text\` is empty or only spaces.
- If it **is** a whole number but outside 1 to 65535, **throw** a \`RangeError\`.
--- starter
function parsePort(text) {
  return Number(text)
}
--- solution
function parsePort(text) {
  const port = Number(text)
  if (text.trim() === '' || !Number.isInteger(port)) return null
  if (port < 1 || port > 65535) throw new RangeError(\`port out of range: \${port}\`)
  return port
}
--- hint
Turn the text into a number with \`Number(text)\` and store it. Then check, in order: not a whole number, then out of range.
--- hint
Blank text becomes 0, which is a whole number, so test for blank text (after \`trim\`) together with the \`Number.isInteger\` test, and return \`null\` for either.
--- hint
For a number below 1 or above 65535, \`throw new RangeError('…')\` with a message of your choice.
--- check case | '8080' gives 8080
parsePort('8080')
=> 8080
--- check case | 'http' gives null
parsePort('http')
=> null
--- check test | '70000' throws
throws(() => parsePort('70000'))
--- check test | '0' throws
throws(() => parsePort('0'))

+++ practice | Parse it or give up
--- task
Write a function \`safeParse(text)\` that returns the value made by \`JSON.parse(text)\`, or \`null\` if the text is not valid JSON.

So \`safeParse('[1, 2]')\` is the array \`[1, 2]\`, and \`safeParse('nope')\` is \`null\`.
--- starter
function safeParse(text) {
  return JSON.parse(text)
}
--- solution
function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch (err) {
    return null
  }
}
--- hint
Put the risky call inside \`try\`, and return \`null\` from the \`catch\` block.
--- hint
A \`return\` inside \`try\` works: if \`JSON.parse\` succeeds, its value is returned straight away.
--- check case | An object
safeParse('{"a": 1}')
=> { a: 1 }
--- check case | An array
safeParse('[1, 2]')
=> [1, 2]
--- check case | Not JSON gives null
safeParse('nope')
=> null
--- check case | Empty text gives null
safeParse('')
=> null

+++ practice | Refuse to divide by zero
--- task
Write a function \`divide(a, b)\` that returns \`a\` divided by \`b\`. When \`b\` is \`0\`, it must not return anything: it throws a \`RangeError\` with the message \`cannot divide by zero\`.
--- starter
function divide(a, b) {
  return a / b
}
--- solution
function divide(a, b) {
  if (b === 0) {
    throw new RangeError('cannot divide by zero')
  }
  return a / b
}
--- hint
Check \`b\` first, before dividing.
--- hint
\`throw new RangeError('…')\` makes the error and throws it in one line.
--- check case | 10 / 4 is 2.5
divide(10, 4)
=> 2.5
--- check case | Zero divided by something is fine
divide(0, 5)
=> 0
--- check test | Dividing by zero throws
throws(() => divide(1, 0))
--- check test | It is a RangeError with the right message
(() => { try { divide(1, 0) } catch (e) { return e.name === 'RangeError' && e.message === 'cannot divide by zero' } return false })()

+++ practice | Sort good readings from bad
--- task
A sensor sends each reading as a line of JSON text. Write a function \`parseReadings(lines)\` that takes an array of those strings and returns an object with two properties:

- \`values\`: an array of the values that parsed, in order
- \`bad\`: how many lines could not be parsed

So \`parseReadings(['1', '2.5', 'oops', '4'])\` is \`{ values: [1, 2.5, 4], bad: 1 }\`, and \`parseReadings([])\` is \`{ values: [], bad: 0 }\`.
--- starter
function parseReadings(lines) {
  return { values: lines.map((line) => JSON.parse(line)), bad: 0 }
}
--- solution
function parseReadings(lines) {
  const values = []
  let bad = 0
  for (const line of lines) {
    try {
      values.push(JSON.parse(line))
    } catch (err) {
      bad++
    }
  }
  return { values, bad }
}
--- hint
Loop over the lines, with a \`try\` and \`catch\` around each parse, so one bad line does not stop the rest.
--- hint
In \`try\`, push the parsed value. In \`catch\`, add one to the bad count.
--- hint
\`{ values, bad }\` is a short way to write \`{ values: values, bad: bad }\`.
--- check case | One bad line
parseReadings(['1', '2.5', 'oops', '4'])
=> { values: [1, 2.5, 4], bad: 1 }
--- check case | Every line bad
parseReadings(['{', ']'])
=> { values: [], bad: 2 }
--- check case | No lines
parseReadings([])
=> { values: [], bad: 0 }

+++ practice | Meters to kilometers, carefully
--- task
Write a function \`toKm(meters)\` that returns \`meters\` divided by 1000, after two checks:

- if \`meters\` is not a number (its \`typeof\` is not \`'number'\`), throw a \`TypeError\`;
- if it is a number below 0, throw a \`RangeError\`.

So \`toKm(1500)\` is \`1.5\` and \`toKm(0)\` is \`0\`, but \`toKm('5')\` throws a \`TypeError\` and \`toKm(-1)\` throws a \`RangeError\`.
--- starter
function toKm(meters) {
  return meters / 1000
}
--- solution
function toKm(meters) {
  if (typeof meters !== 'number') {
    throw new TypeError('meters must be a number')
  }
  if (meters < 0) {
    throw new RangeError('meters must not be negative')
  }
  return meters / 1000
}
--- hint
Check the type first. Comparing text with \`<\` would give a confusing answer.
--- hint
Each check is an \`if\` that throws the right kind of error with a message of your choice.
--- check case | 1500 m is 1.5 km
toKm(1500)
=> 1.5
--- check case | 0 m is 0 km
toKm(0)
=> 0
--- check test | Text throws a TypeError
(() => { try { toKm('5') } catch (e) { return e.name === 'TypeError' } return false })()
--- check test | A negative number throws a RangeError
(() => { try { toKm(-1) } catch (e) { return e.name === 'RangeError' } return false })()

+++ practice | Fix the missing fallback
--- task
\`readCount(text)\` takes JSON text like \`'{"count": 7}'\` and should return its \`count\`. When the text is not valid JSON, it should log \`bad input:\` with the error's message, and then return \`0\`.

It logs correctly, but for bad text it returns \`undefined\` instead of \`0\`. Fix it.
--- starter
function readCount(text) {
  try {
    return JSON.parse(text).count
  } catch (err) {
    console.log('bad input:', err.message)
  }
}
--- solution
function readCount(text) {
  try {
    return JSON.parse(text).count
  } catch (err) {
    console.log('bad input:', err.message)
    return 0
  }
}
--- hint
Follow a bad input through the code: \`JSON.parse\` throws, the \`catch\` block runs, and then the function reaches its end. What does a function hand back when it ends with no \`return\`?
--- hint
The \`catch\` block needs a \`return\` of its own.
--- check case | Good JSON gives its count
readCount('{"count": 7}')
=> 7
--- check case | A count of 0 is kept
readCount('{"count": 0}')
=> 0
--- check case | Bad JSON gives 0
readCount('nope')
=> 0
--- check source | Still logs the message
console\\.log\\(\\s*['"]bad input:['"]\\s*,\\s*err\\.message\\s*\\)

+++ practice | Run every task, count every try
--- task
Write a function \`runAll(tasks)\`. \`tasks\` is an array of functions that take no arguments. Call each one in turn. Some of them throw. Return an object with three properties:

- \`ok\`: how many tasks finished without throwing
- \`failed\`: an array of the messages of the errors thrown, in order
- \`attempts\`: how many tasks were called. Count this in a \`finally\` block, so every task counts whether it threw or not.

So \`runAll([() => 1, () => { throw new Error('boom') }, () => 2])\` is \`{ ok: 2, failed: ['boom'], attempts: 3 }\`.
--- starter
function runAll(tasks) {
  let ok = 0
  for (const task of tasks) {
    task()
    ok++
  }
  return { ok, failed: [], attempts: ok }
}
--- solution
function runAll(tasks) {
  let ok = 0
  let attempts = 0
  const failed = []
  for (const task of tasks) {
    try {
      task()
      ok++
    } catch (err) {
      failed.push(err.message)
    } finally {
      attempts++
    }
  }
  return { ok, failed, attempts }
}
--- hint
Wrap each call in \`try\`. The line after the call, which counts a success, only runs if the call did not throw.
--- hint
In \`catch\`, push \`err.message\` onto the \`failed\` array. In \`finally\`, add one to \`attempts\`.
--- check case | One task throws
runAll([() => 1, () => { throw new Error('boom') }, () => 2])
=> { ok: 2, failed: ['boom'], attempts: 3 }
--- check case | Every task throws
runAll([() => { throw new RangeError('a') }, () => { throw new TypeError('b') }])
=> { ok: 0, failed: ['a', 'b'], attempts: 2 }
--- check case | No tasks
runAll([])
=> { ok: 0, failed: [], attempts: 0 }
--- check source | Counts attempts in finally
finally\\s*\\{[^}]*attempts

=== js-12 | Promises and async/await
--- teach
Some work finishes later — a network request, a timer. JavaScript does not wait for it; it gets a **Promise**, a placeholder for the value that arrives later. \`await\` pauses an \`async\` function until the promise settles:

\`\`\`js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  console.log('start')
  await wait(100)
  console.log('100ms later')
}
main()
\`\`\`

Run things at the same time with \`Promise.all\`: it starts them all and waits for every one. \`await\`ing them one by one runs them in sequence — slower, and the most common async mistake (M3 calls it "sequential when you meant parallel").
--- task
\`fetchScore(id)\` below pretends to be a network call. Write \`async function totalScore(ids)\` that fetches every id **in parallel** with \`Promise.all\` and returns the sum of the scores. Then print \`await totalScore([1, 2, 3])\` (top-level await works here).
--- starter
const fetchScore = (id) => new Promise((resolve) => setTimeout(() => resolve(id * 10), 50))

async function totalScore(ids) {
  let total = 0
  for (const id of ids) {
    total += await fetchScore(id)
  }
  return total
}

console.log(await totalScore([1, 2, 3]))
--- solution
const fetchScore = (id) => new Promise((resolve) => setTimeout(() => resolve(id * 10), 50))

async function totalScore(ids) {
  const scores = await Promise.all(ids.map((id) => fetchScore(id)))
  return scores.reduce((sum, s) => sum + s, 0)
}

console.log(await totalScore([1, 2, 3]))
--- hint
\`ids.map((id) => fetchScore(id))\` starts every call and gives an array of promises.
--- hint
\`await Promise.all(promises)\` waits for all of them and gives an array of results.
--- check output | Prints the total
60
--- check source | Uses Promise.all
Promise\\.all\\(
?? Awaiting inside the loop runs the calls one after another. Promise.all runs them together.

+++ practice | A delay that hands back a value
--- task
Fill in \`delay(ms, value)\` so that it returns a promise that settles after \`ms\` milliseconds with \`value\` as its result. The last two lines of the starter then wait 20 milliseconds and print \`pong\`.

Make the promise with \`new Promise\`, and inside it call \`resolve(value)\` from a \`setTimeout\`. Leave the last two lines as they are.
--- starter
function delay(ms, value) {
  // Return a promise here.
}

const reply = await delay(20, 'pong')
console.log(reply)
--- solution
function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

const reply = await delay(20, 'pong')
console.log(reply)
--- hint
\`new Promise((resolve) => …)\` gives you a \`resolve\` function. Whatever you pass to \`resolve\` becomes the promise's result.
--- hint
\`setTimeout\` takes a function to run later and a time. The function to run later calls \`resolve(value)\`.
--- check case | reply is pong
reply
=> 'pong'
--- check output | Prints pong
pong
--- check test | delay gives back a promise, not the value itself
delay(1, 'x') !== 'x' && typeof delay(1, 'x').then === 'function'

+++ practice | Greet a user from the server
--- task
\`fetchUser(id)\` pretends to ask a server for a user: it returns a promise that settles, after a short wait, with an object like \`{ id: 2, name: 'sam' }\`.

Write \`async function greeting(id)\` that awaits \`fetchUser(id)\` and returns the text \`Hello, \` followed by the user's name and \`!\`. The starter's last two lines then print \`Hello, sam!\`.
--- starter
const fetchUser = (id) => new Promise((resolve) => setTimeout(() => resolve({ id, name: ['ada', 'lin', 'sam'][id] }), 20))

async function greeting(id) {
  return 'Hello!'
}

const message = await greeting(2)
console.log(message)
--- solution
const fetchUser = (id) => new Promise((resolve) => setTimeout(() => resolve({ id, name: ['ada', 'lin', 'sam'][id] }), 20))

async function greeting(id) {
  const user = await fetchUser(id)
  return \`Hello, \${user.name}!\`
}

const message = await greeting(2)
console.log(message)
--- hint
\`await fetchUser(id)\` pauses \`greeting\` until the user arrives and gives you the user object.
--- hint
Store the user in a variable, then build the text from its \`name\`.
--- check case | message greets sam
message
=> 'Hello, sam!'
--- check output | Prints the greeting
Hello, sam!
--- check source | Awaits fetchUser
await\\s+fetchUser\\(

+++ practice | Active users, fetched together
--- task
\`getUser(id)\` pretends to call a user service. It settles with an object like \`{ id: 1, name: 'ada', active: true }\`. It also keeps count of how many calls are waiting at once, in \`maxInFlight\`.

Write \`async function activeNames(ids)\` that fetches **every** id at the same time with \`Promise.all\`, then returns the names of the users whose \`active\` is \`true\`, in the order of \`ids\`. The starter fetches them one after another, which is slow, so \`maxInFlight\` stays at 1.
--- starter
const users = { 1: { id: 1, name: 'ada', active: true }, 2: { id: 2, name: 'lin', active: false }, 3: { id: 3, name: 'sam', active: true } }
let inFlight = 0
let maxInFlight = 0
function getUser(id) {
  inFlight++
  maxInFlight = Math.max(maxInFlight, inFlight)
  return new Promise((resolve) => setTimeout(() => { inFlight--; resolve(users[id]) }, 30))
}

async function activeNames(ids) {
  const names = []
  for (const id of ids) {
    const user = await getUser(id)
    if (user.active) names.push(user.name)
  }
  return names
}

const names = await activeNames([3, 2, 1])
console.log(names)
--- solution
const users = { 1: { id: 1, name: 'ada', active: true }, 2: { id: 2, name: 'lin', active: false }, 3: { id: 3, name: 'sam', active: true } }
let inFlight = 0
let maxInFlight = 0
function getUser(id) {
  inFlight++
  maxInFlight = Math.max(maxInFlight, inFlight)
  return new Promise((resolve) => setTimeout(() => { inFlight--; resolve(users[id]) }, 30))
}

async function activeNames(ids) {
  const all = await Promise.all(ids.map((id) => getUser(id)))
  return all.filter((u) => u.active).map((u) => u.name)
}

const names = await activeNames([3, 2, 1])
console.log(names)
--- hint
\`ids.map((id) => getUser(id))\` starts every call at once and gives an array of promises. \`await Promise.all(…)\` turns it into an array of users, in the same order as \`ids\`.
--- hint
Once you have the users, \`filter\` keeps the active ones and \`map\` turns each into its name.
--- check case | Active names, in the order asked
names
=> ['sam', 'ada']
--- check test | All three calls were waiting at once
maxInFlight === 3
?? Awaiting inside the loop makes each call wait for the one before. Start them all, then wait for all of them.
--- check source | Uses Promise.all
Promise\\.all\\(

+++ practice | Average latency, even for nothing
--- task
\`ping(host)\` pretends to measure how many milliseconds a server takes to answer. Write \`async function averageLatency(hosts)\` that pings **every** host at the same time with \`Promise.all\`, and returns the average of the times, rounded to the nearest whole number with \`Math.round\`.

An empty list of hosts has no average: return \`0\`. The starter returns \`NaN\` for it.
--- starter
const times = { alpha: 40, beta: 75, gamma: 52 }
const ping = (host) => new Promise((resolve) => setTimeout(() => resolve(times[host]), 10))

async function averageLatency(hosts) {
  const results = await Promise.all(hosts.map((h) => ping(h)))
  const total = results.reduce((sum, ms) => sum + ms, 0)
  return Math.round(total / results.length)
}

const three = await averageLatency(['alpha', 'beta', 'gamma'])
const one = await averageLatency(['beta'])
const none = await averageLatency([])
console.log(three, one, none)
--- solution
const times = { alpha: 40, beta: 75, gamma: 52 }
const ping = (host) => new Promise((resolve) => setTimeout(() => resolve(times[host]), 10))

async function averageLatency(hosts) {
  if (hosts.length === 0) {
    return 0
  }
  const results = await Promise.all(hosts.map((h) => ping(h)))
  const total = results.reduce((sum, ms) => sum + ms, 0)
  return Math.round(total / results.length)
}

const three = await averageLatency(['alpha', 'beta', 'gamma'])
const one = await averageLatency(['beta'])
const none = await averageLatency([])
console.log(three, one, none)
--- hint
\`Promise.all([])\` settles at once with an empty array. So the total is 0, and 0 divided by 0 is \`NaN\`.
--- hint
Check for an empty list at the start and return 0 before doing any work.
--- check case | Three hosts average 56
three
=> 56
--- check case | One host is its own average
one
=> 75
--- check case | No hosts gives 0
none
=> 0
--- check output | Prints all three
56 75 0

+++ practice | Fix the missing await
--- task
\`planetName(id)\` should fetch a planet with \`fetchPlanet(id)\` and return its name, so the program prints \`Mars\`. Instead it prints \`undefined\`. Find the missing word and fix it.
--- starter
const fetchPlanet = (id) => new Promise((resolve) => setTimeout(() => resolve({ id, name: 'Mars' }), 20))

async function planetName(id) {
  const planet = fetchPlanet(id)
  return planet.name
}

const name = await planetName(4)
console.log(name)
--- solution
const fetchPlanet = (id) => new Promise((resolve) => setTimeout(() => resolve({ id, name: 'Mars' }), 20))

async function planetName(id) {
  const planet = await fetchPlanet(id)
  return planet.name
}

const name = await planetName(4)
console.log(name)
--- hint
What does \`fetchPlanet(id)\` hand back straight away: the planet, or a placeholder for it?
--- hint
A promise has no \`name\` property, so \`planet.name\` is \`undefined\`. Wait for the promise to settle first.
--- check output | Prints Mars
Mars
--- check case | name is Mars
name
=> 'Mars'
--- check source | Awaits fetchPlanet
await\\s+fetchPlanet\\(

+++ practice | Respect the rate limit
--- task
A scoring service allows at most \`size\` requests at a time. Write \`async function inBatches(ids, size)\` that fetches the scores for all \`ids\`, \`size\` at a time:

- take the ids in batches of \`size\` (the last batch may be smaller), using \`slice\`;
- fetch each batch at the same time with \`Promise.all\`;
- wait for a batch to finish before starting the next one.

Return all the scores in the same order as \`ids\`. An empty list returns \`[]\`. The starter fetches everything at once, which breaks the limit: \`maxInFlight\` must never go above \`size\`, and should reach it.
--- starter
let inFlight = 0
let maxInFlight = 0
function fetchScore(id) {
  inFlight++
  maxInFlight = Math.max(maxInFlight, inFlight)
  return new Promise((resolve) => setTimeout(() => { inFlight--; resolve(id * 10) }, 20))
}

async function inBatches(ids, size) {
  return Promise.all(ids.map((id) => fetchScore(id)))
}

const scores = await inBatches([1, 2, 3, 4, 5], 2)
const none = await inBatches([], 3)
console.log(scores, none)
--- solution
let inFlight = 0
let maxInFlight = 0
function fetchScore(id) {
  inFlight++
  maxInFlight = Math.max(maxInFlight, inFlight)
  return new Promise((resolve) => setTimeout(() => { inFlight--; resolve(id * 10) }, 20))
}

async function inBatches(ids, size) {
  const results = []
  for (let i = 0; i < ids.length; i += size) {
    const batch = ids.slice(i, i + size)
    const scores = await Promise.all(batch.map((id) => fetchScore(id)))
    results.push(...scores)
  }
  return results
}

const scores = await inBatches([1, 2, 3, 4, 5], 2)
const none = await inBatches([], 3)
console.log(scores, none)
--- hint
A counting loop that steps by \`size\` gives the start of each batch: 0, 2, 4. \`ids.slice(i, i + size)\` is that batch, and slicing past the end is safe.
--- hint
Inside the loop, \`await Promise.all(…)\` on one batch makes the loop wait before the next batch starts.
--- hint
\`results.push(...scores)\` spreads a batch's scores onto the end of the results array.
--- check case | All five scores, in order
scores
=> [10, 20, 30, 40, 50]
--- check test | Never more than 2 at once, and 2 did run together
maxInFlight === 2
?? Fetch one batch at a time, and the ids in a batch together.
--- check case | No ids gives []
none
=> []
--- check source | Uses Promise.all
Promise\\.all\\(

=== js-gate | JavaScript, the language of the web: mastery gate
--- teach
The gate covers the whole course: values and types, numbers, strings and template literals, decisions, loops, functions, arrays, objects, map, filter and reduce, errors, and promises with async/await. Its ten problems are new, most of them mix several lessons, and they look like the small jobs a backend does every day: parsing a request, validating input, summarising logs, paging results and calling services. There are no hints. Twelve short questions after the problems check that you understand why the code does what it does. To get ready, redo the practice problems of the lessons that felt hardest, without looking at the hints.
--- gate
pass 7
questions 10
minutes 112

+++ problem | Parse a query string
--- task
The part of a URL after the \`?\` holds settings like \`page=2&sort=name&debug\`. Write a function \`parseQuery(qs)\` that turns that text into an object:

- pieces are separated by \`&\`;
- a piece \`key=value\` sets that key to the value, as a **string**: \`page=2\` gives \`page: '2'\`;
- a piece with no \`=\` sets that key to \`true\`: \`debug\` gives \`debug: true\`;
- \`key=\` (nothing after the \`=\`) sets the key to \`''\`;
- empty pieces, as in \`a=1&&b=2\`, are skipped;
- if a key appears twice, the **last** value wins.

No value contains a second \`=\`. So \`parseQuery('page=2&sort=name&debug')\` is \`{ page: '2', sort: 'name', debug: true }\`, and \`parseQuery('')\` is \`{}\`.
--- starter
function parseQuery(qs) {
  return {}
}
--- solution
function parseQuery(qs) {
  const result = {}
  for (const piece of qs.split('&')) {
    if (piece === '') continue
    const parts = piece.split('=')
    result[parts[0]] = parts.length === 1 ? true : parts[1]
  }
  return result
}
--- check case | Values are strings, a bare key is true
parseQuery('page=2&sort=name&debug')
=> { page: '2', sort: 'name', debug: true }
--- check case | The last value wins
parseQuery('a=1&a=2')
=> { a: '2' }
--- check case | Empty value and empty pieces
parseQuery('x=&&y')
=> { x: '', y: true }
--- check case | Empty text gives an empty object
parseQuery('')
=> {}

+++ problem | Validate a sign-up
--- task
A server receives a sign-up as an object. Write a function \`signupErrors(body)\` that returns an array of what is wrong with it, in this order:

1. \`'name is required'\` if \`body.name\` is not a string, or is empty or only spaces;
2. \`'age must be a whole number from 13 to 120'\` if \`body.age\` is not a whole number (a number, not text), or is below 13 or above 120;
3. \`'email is invalid'\` if \`body.email\` is not a string, or, when split on \`'@'\`, does not give exactly two parts, or the first part is empty, or the second part has no \`'.'\` in it.

A good sign-up gives \`[]\`. So \`signupErrors({ name: 'Ada', age: 36, email: 'ada@orbit.dev' })\` is \`[]\`, and \`signupErrors({})\` lists all three problems.
--- starter
function signupErrors(body) {
  return []
}
--- solution
function signupErrors(body) {
  const errors = []
  if (typeof body.name !== 'string' || body.name.trim() === '') {
    errors.push('name is required')
  }
  if (!Number.isInteger(body.age) || body.age < 13 || body.age > 120) {
    errors.push('age must be a whole number from 13 to 120')
  }
  const parts = typeof body.email === 'string' ? body.email.split('@') : []
  if (parts.length !== 2 || parts[0] === '' || !parts[1].includes('.')) {
    errors.push('email is invalid')
  }
  return errors
}
--- check case | A good sign-up
signupErrors({ name: 'Ada', age: 36, email: 'ada@orbit.dev' })
=> []
--- check case | Everything missing
signupErrors({})
=> ['name is required', 'age must be a whole number from 13 to 120', 'email is invalid']
--- check case | Blank name, decimal age, two @ signs
signupErrors({ name: '   ', age: 12.5, email: 'a@b@c.io' })
=> ['name is required', 'age must be a whole number from 13 to 120', 'email is invalid']
--- check case | Age as text is not a number
signupErrors({ name: 'Lin', age: '30', email: 'lin@x.io' })
=> ['age must be a whole number from 13 to 120']
--- check case | The edges of the age range are fine; an address with no dot is not
signupErrors({ name: 'Sam', age: 120, email: 'sam@localhost' })
=> ['email is invalid']
--- check case | 13 is old enough
signupErrors({ name: 'Kim', age: 13, email: 'kim@orbit.dev' })
=> []

+++ problem | Summarise an access log
--- task
Each line of a web server's access log looks like \`GET /api/users 200 12\`: the method, the path, the status code and the time in milliseconds, separated by whitespace.

Write a function \`statusSummary(lines)\` that takes an array of lines and returns an object counting the lines by status class: \`'2xx'\` for 200 to 299, \`'4xx'\` for 400 to 499, and so on. Only classes that appear get a key.

The object also always has a key \`bad\`: the number of lines that are not exactly four parts after trimming, or whose status is not a whole number from 100 to 599.

So \`statusSummary(['GET / 200 5', 'oops'])\` is \`{ bad: 1, '2xx': 1 }\`, and \`statusSummary([])\` is \`{ bad: 0 }\`.
--- starter
function statusSummary(lines) {
  const summary = { bad: 0 }
  for (const line of lines) {
    const status = line.split(' ')[2]
    summary[status] = (summary[status] ?? 0) + 1
  }
  return summary
}
--- solution
function statusSummary(lines) {
  const summary = { bad: 0 }
  for (const line of lines) {
    const parts = line.trim().split(/\\s+/)
    const status = Number(parts[2])
    if (parts.length !== 4 || !Number.isInteger(status) || status < 100 || status > 599) {
      summary.bad++
      continue
    }
    const key = \`\${Math.floor(status / 100)}xx\`
    summary[key] = (summary[key] ?? 0) + 1
  }
  return summary
}
--- check case | A mixed log
statusSummary(['GET /api/users 200 12', 'POST /api/login 401 30', 'GET /health   204 1', 'GET /api/crash 503 900', 'garbage'])
=> { bad: 1, '2xx': 2, '4xx': 1, '5xx': 1 }
--- check case | One good line
statusSummary(['GET / 200 5'])
=> { bad: 0, '2xx': 1 }
--- check case | Not a number, out of range, blank
statusSummary(['GET / abc 5', 'GET / 700 1', ''])
=> { bad: 3 }
--- check case | No lines
statusSummary([])
=> { bad: 0 }

+++ problem | One page of results
--- task
An API returns long lists one page at a time. Write a function \`paginate(items, page, perPage)\` that returns an object with:

- \`items\`: the items on that page. Page 1 holds the first \`perPage\` items, page 2 the next \`perPage\`, and so on. A page past the end holds \`[]\`.
- \`page\`: the page asked for
- \`totalPages\`: how many pages the whole list needs (0 for an empty list)
- \`hasNext\`: whether there is a page after this one

If \`page\` or \`perPage\` is not a whole number of 1 or more, throw a \`RangeError\`.

So \`paginate(['a', 'b', 'c', 'd', 'e'], 2, 2)\` is \`{ items: ['c', 'd'], page: 2, totalPages: 3, hasNext: true }\`.
--- starter
function paginate(items, page, perPage) {
  return { items: items.slice(page, page + perPage), page, totalPages: items.length / perPage, hasNext: true }
}
--- solution
function paginate(items, page, perPage) {
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(perPage) || perPage < 1) {
    throw new RangeError('page and perPage must be whole numbers of 1 or more')
  }
  const totalPages = Math.ceil(items.length / perPage)
  const start = (page - 1) * perPage
  return { items: items.slice(start, start + perPage), page, totalPages, hasNext: page < totalPages }
}
--- check case | A middle page
paginate(['a', 'b', 'c', 'd', 'e'], 2, 2)
=> { items: ['c', 'd'], page: 2, totalPages: 3, hasNext: true }
--- check case | The last page is short
paginate(['a', 'b', 'c', 'd', 'e'], 3, 2)
=> { items: ['e'], page: 3, totalPages: 3, hasNext: false }
--- check case | Past the end
paginate(['a', 'b'], 9, 2)
=> { items: [], page: 9, totalPages: 1, hasNext: false }
--- check case | An empty list
paginate([], 1, 10)
=> { items: [], page: 1, totalPages: 0, hasNext: false }
--- check test | Page 0 throws
throws(() => paginate(['a'], 0, 5))
--- check test | perPage 0 throws a RangeError
(() => { try { paginate(['a'], 1, 0) } catch (e) { return e.name === 'RangeError' } return false })()

+++ problem | Routes over the latency budget
--- task
\`requests\` is an array of objects like \`{ route: '/a', ms: 100 }\`, and the same route appears many times. Write a function \`overBudget(requests, budgetMs)\` that returns an array of text lines, one for each route whose **average** time is greater than \`budgetMs\`, in the order the routes first appear.

Each line looks like \`'/a (avg 175 ms)'\`: the route, then the average rounded to the nearest whole number with \`Math.round\`. A route whose average equals the budget is not over it. No requests gives \`[]\`.
--- starter
function overBudget(requests, budgetMs) {
  return requests.filter((r) => r.ms > budgetMs).map((r) => \`\${r.route} (avg \${r.ms} ms)\`)
}
--- solution
function overBudget(requests, budgetMs) {
  const stats = {}
  for (const r of requests) {
    const s = stats[r.route] ?? { total: 0, count: 0 }
    s.total += r.ms
    s.count++
    stats[r.route] = s
  }
  return Object.keys(stats)
    .filter((route) => stats[route].total / stats[route].count > budgetMs)
    .map((route) => \`\${route} (avg \${Math.round(stats[route].total / stats[route].count)} ms)\`)
}
--- check case | Averages decide, rounded, in first-seen order
overBudget([{ route: '/a', ms: 100 }, { route: '/b', ms: 300 }, { route: '/a', ms: 250 }, { route: '/c', ms: 150 }, { route: '/d', ms: 151 }, { route: '/d', ms: 152 }], 150)
=> ['/a (avg 175 ms)', '/b (avg 300 ms)', '/d (avg 152 ms)']
--- check case | One slow request does not make a slow route
overBudget([{ route: '/x', ms: 400 }, { route: '/x', ms: 100 }], 300)
=> []
--- check case | No requests
overBudget([], 100)
=> []

+++ problem | Load a dashboard in parallel
--- task
Three services each answer after a short wait: \`getProfile(id)\` settles with \`{ name }\`, \`getOrders(id)\` with an array of orders, and \`getAlerts(id)\` with an array of objects like \`{ text, open }\`. They count how many calls are waiting at once in \`maxInFlight\`.

Write \`async function loadDashboard(userId)\` that calls all three services **at the same time** and returns \`{ name, orderCount, openAlerts }\`: the user's name, how many orders there are, and how many alerts have \`open\` set to \`true\`. The starter calls them one after another.
--- starter
const db = {
  1: { profile: { name: 'ada' }, orders: [{ id: 'o1' }, { id: 'o2' }], alerts: [{ text: 'disk', open: true }, { text: 'cpu', open: false }, { text: 'mem', open: true }] },
  2: { profile: { name: 'lin' }, orders: [], alerts: [] },
}
let inFlight = 0
let maxInFlight = 0
function slowly(value) {
  inFlight++
  maxInFlight = Math.max(maxInFlight, inFlight)
  return new Promise((resolve) => setTimeout(() => { inFlight--; resolve(value) }, 30))
}
const getProfile = (id) => slowly(db[id].profile)
const getOrders = (id) => slowly(db[id].orders)
const getAlerts = (id) => slowly(db[id].alerts)

async function loadDashboard(userId) {
  const profile = await getProfile(userId)
  const orders = await getOrders(userId)
  const alerts = await getAlerts(userId)
  return { name: profile.name, orderCount: orders.length, openAlerts: alerts.length }
}

const ada = await loadDashboard(1)
const lin = await loadDashboard(2)
console.log(ada, lin)
--- solution
const db = {
  1: { profile: { name: 'ada' }, orders: [{ id: 'o1' }, { id: 'o2' }], alerts: [{ text: 'disk', open: true }, { text: 'cpu', open: false }, { text: 'mem', open: true }] },
  2: { profile: { name: 'lin' }, orders: [], alerts: [] },
}
let inFlight = 0
let maxInFlight = 0
function slowly(value) {
  inFlight++
  maxInFlight = Math.max(maxInFlight, inFlight)
  return new Promise((resolve) => setTimeout(() => { inFlight--; resolve(value) }, 30))
}
const getProfile = (id) => slowly(db[id].profile)
const getOrders = (id) => slowly(db[id].orders)
const getAlerts = (id) => slowly(db[id].alerts)

async function loadDashboard(userId) {
  const [profile, orders, alerts] = await Promise.all([getProfile(userId), getOrders(userId), getAlerts(userId)])
  return {
    name: profile.name,
    orderCount: orders.length,
    openAlerts: alerts.filter((a) => a.open).length,
  }
}

const ada = await loadDashboard(1)
const lin = await loadDashboard(2)
console.log(ada, lin)
--- check case | Ada's dashboard counts only open alerts
ada
=> { name: 'ada', orderCount: 2, openAlerts: 2 }
--- check case | An empty dashboard
lin
=> { name: 'lin', orderCount: 0, openAlerts: 0 }
--- check test | The three services ran at the same time
maxInFlight === 3

+++ problem | The first healthy server
--- task
\`check(host)\` asks one server whether it is healthy, and settles with \`true\` or \`false\`. Every host it is asked about is recorded in the array \`checked\`.

Write \`async function firstHealthy(hosts)\` that checks the hosts **one at a time, in order**, and returns the first healthy one. As soon as one is healthy, stop: the hosts after it must not be checked at all. If none is healthy, or the list is empty, return \`null\`.

The starter checks every host at once, which wastes calls.
--- starter
const healthy = { a: false, b: true, c: true, d: false }
const checked = []
const check = (host) => {
  checked.push(host)
  return new Promise((resolve) => setTimeout(() => resolve(healthy[host]), 10))
}

async function firstHealthy(hosts) {
  const results = await Promise.all(hosts.map((h) => check(h)))
  for (let i = 0; i < hosts.length; i++) {
    if (results[i]) return hosts[i]
  }
  return null
}

const first = await firstHealthy(['a', 'b', 'c'])
const checkedFirst = checked.slice()
const noneUp = await firstHealthy(['a', 'd'])
const empty = await firstHealthy([])
console.log(first, checkedFirst, noneUp, empty)
--- solution
const healthy = { a: false, b: true, c: true, d: false }
const checked = []
const check = (host) => {
  checked.push(host)
  return new Promise((resolve) => setTimeout(() => resolve(healthy[host]), 10))
}

async function firstHealthy(hosts) {
  for (const host of hosts) {
    if (await check(host)) {
      return host
    }
  }
  return null
}

const first = await firstHealthy(['a', 'b', 'c'])
const checkedFirst = checked.slice()
const noneUp = await firstHealthy(['a', 'd'])
const empty = await firstHealthy([])
console.log(first, checkedFirst, noneUp, empty)
--- check case | b is the first healthy host
first
=> 'b'
--- check case | c was never checked
checkedFirst
=> ['a', 'b']
--- check case | None healthy gives null
noneUp
=> null
--- check case | No hosts gives null
empty
=> null

+++ problem | Format a duration
--- task
Write a function \`formatDuration(seconds)\` that turns a number of seconds into short text with hours, minutes and seconds, like \`'1h 2m 5s'\` for 3725.

- Leave out any part that is zero: 60 is \`'1m'\`, and 7201 is \`'2h 1s'\`.
- 0 is \`'0s'\`.
- If \`seconds\` is not a whole number, or is below 0, throw a \`RangeError\`.
--- starter
function formatDuration(seconds) {
  const h = Math.round(seconds / 3600)
  const m = Math.round(seconds / 60)
  const s = seconds % 60
  return \`\${h}h \${m}m \${s}s\`
}
--- solution
function formatDuration(seconds) {
  if (!Number.isInteger(seconds) || seconds < 0) {
    throw new RangeError('seconds must be a whole number of 0 or more')
  }
  if (seconds === 0) {
    return '0s'
  }
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  let out = ''
  if (h > 0) out += \`\${h}h \`
  if (m > 0) out += \`\${m}m \`
  if (s > 0) out += \`\${s}s\`
  return out.trim()
}
--- check case | All three parts
formatDuration(3725)
=> '1h 2m 5s'
--- check case | Minutes only
formatDuration(60)
=> '1m'
--- check case | Zero minutes are left out
formatDuration(7201)
=> '2h 1s'
--- check case | Under a minute
formatDuration(59)
=> '59s'
--- check case | Zero
formatDuration(0)
=> '0s'
--- check test | A negative number throws
throws(() => formatDuration(-5))
--- check test | A decimal throws
throws(() => formatDuration(1.5))

+++ problem | Merge settings safely
--- task
Write a function \`mergeConfig(defaults, overrides)\` that returns a **new** settings object:

- it starts with every key and value of \`defaults\`;
- each key in \`overrides\` replaces the default, **unless** its value is \`null\` or \`undefined\`, in which case the default stays. A value of \`0\` or \`false\` is a real setting and replaces the default.
- a key in \`overrides\` that is not a key of \`defaults\` is a mistake: throw an \`Error\` with the message \`unknown setting: \` followed by the key, for example \`unknown setting: prot\`.

Neither \`defaults\` nor \`overrides\` may be changed.
--- starter
function mergeConfig(defaults, overrides) {
  for (const key of Object.keys(overrides)) {
    defaults[key] = overrides[key] || defaults[key]
  }
  return defaults
}
--- solution
function mergeConfig(defaults, overrides) {
  const known = Object.keys(defaults)
  const result = { ...defaults }
  for (const key of Object.keys(overrides)) {
    if (!known.includes(key)) {
      throw new Error(\`unknown setting: \${key}\`)
    }
    result[key] = overrides[key] ?? defaults[key]
  }
  return result
}
--- check case | Overrides replace defaults, null keeps the default
mergeConfig({ port: 8080, host: 'localhost', debug: false }, { port: 3000, debug: null })
=> { port: 3000, host: 'localhost', debug: false }
--- check case | 0 is a real setting
mergeConfig({ retries: 3 }, { retries: 0 })
=> { retries: 0 }
--- check case | No overrides gives a copy of the defaults
mergeConfig({ a: 1 }, {})
=> { a: 1 }
--- check test | An unknown key throws with its name in the message
(() => { try { mergeConfig({ port: 1 }, { prot: 2 }) } catch (e) { return e.message === 'unknown setting: prot' } return false })()
--- check test | The defaults are not changed
(() => { const d = { port: 8080 }; mergeConfig(d, { port: 1 }); return d.port === 8080 })()

+++ problem | Drop duplicate events
--- task
A queue can deliver the same event twice. Each event is an object like \`{ id: 7, type: 'signup' }\`. Write a function \`dedupeEvents(events)\` that returns \`{ events, dropped }\`:

- \`events\`: the events to keep, in their original order. Keep only the **first** event for each \`id\`. An event whose \`id\` is \`null\` or missing cannot be tracked, so it is not kept.
- \`dropped\`: how many events were not kept, for any reason.

An \`id\` of \`0\` is a real id. So for the events with ids 1, 2, 1, (none) and 0, the answer keeps the first 1, the 2 and the 0, and \`dropped\` is 2.
--- starter
function dedupeEvents(events) {
  const kept = events.filter((e) => e.id)
  return { events: kept, dropped: events.length - kept.length }
}
--- solution
function dedupeEvents(events) {
  const seen = {}
  const kept = []
  for (const e of events) {
    if (e.id === null || e.id === undefined || seen[e.id]) {
      continue
    }
    seen[e.id] = true
    kept.push(e)
  }
  return { events: kept, dropped: events.length - kept.length }
}
--- check case | Duplicates, a missing id and id 0
dedupeEvents([{ id: 1, type: 'a' }, { id: 2, type: 'b' }, { id: 1, type: 'c' }, { type: 'd' }, { id: 0, type: 'e' }])
=> { events: [{ id: 1, type: 'a' }, { id: 2, type: 'b' }, { id: 0, type: 'e' }], dropped: 2 }
--- check case | A null id is dropped
dedupeEvents([{ id: null, type: 'x' }, { id: 5, type: 'y' }])
=> { events: [{ id: 5, type: 'y' }], dropped: 1 }
--- check case | No events
dedupeEvents([])
=> { events: [], dropped: 0 }

+++ question | Two names, one value
--- ask
What does this print?

\`\`\`js
let a = 5
const b = a
a += 2
console.log(a, b)
\`\`\`
--- answer
7 5
--- why
\`const b = a\` gives \`b\` the value \`a\` held at that moment, 5. \`a += 2\` then gives \`a\` a new value, 7, and does nothing to \`b\`.

+++ question | Four operators
--- ask
What does this print?

\`\`\`js
console.log(7 % 3, 2 ** 3, Math.floor(7 / 2), Math.ceil(7 / 2))
\`\`\`
--- answer
1 8 3 4
--- why
\`7 % 3\` is the 1 left over after taking out two 3s. \`2 ** 3\` is 2 times 2 times 2. \`7 / 2\` is 3.5, which \`Math.floor\` rounds down to 3 and \`Math.ceil\` rounds up to 4.

+++ question | The glued price
--- ask
What does this print?

\`\`\`js
const price = (9.5).toFixed(2)
console.log(price + 1)
\`\`\`
--- answer
9.501
--- why
\`toFixed\` hands back text, \`'9.50'\`. \`+\` between text and a number joins them, so the result is \`'9.501'\`. Wrap it in \`Number(…)\` to do arithmetic.

+++ question | Why three equals signs
--- ask
Why do JavaScript style guides tell you to compare with \`===\` rather than \`==\`?
--- choice
\`===\` is faster because it compares three times.
--- choice correct
\`==\` converts the two values to the same type before comparing, so \`'1' == 1\` and \`'' == 0\` are both \`true\`. \`===\` never converts, so different types are never equal.
--- choice
\`==\` only works on numbers, and \`===\` works on every type.
--- choice
\`==\` is assignment and \`===\` is comparison.
--- why
Loose equality's conversions hide bugs, like text from a form that compares equal to a number. Strict equality says \`false\` whenever the types differ, which is what you almost always mean. Assignment is a single \`=\`.

+++ question | Which block runs
--- ask
What does this print?

\`\`\`js
const score = 95
if (score >= 50) {
  console.log('pass')
} else if (score >= 90) {
  console.log('excellent')
} else {
  console.log('fail')
}
\`\`\`
--- answer
pass
--- why
JavaScript runs the first block whose test is \`true\`, and skips the rest. 95 is at least 50, so the second test is never asked. The highest band must be tested first.

+++ question | Skip and stop
--- ask
What does this print?

\`\`\`js
let total = 0
for (const n of [3, -1, 4, 0, 5]) {
  if (n < 0) continue
  if (n === 0) break
  total += n
}
console.log(total)
\`\`\`
--- answer
7
--- why
3 is added. -1 is skipped by \`continue\`, which ends only that pass. 4 is added. At 0, \`break\` ends the whole loop, so 5 is never reached: 3 + 4 is 7.

+++ question | Print or return
--- ask
What does this program print?

\`\`\`js
function double(n) {
  console.log(n * 2)
}
const result = double(4)
console.log(result)
\`\`\`
--- choice correct
\`8\`, then \`undefined\`.
--- choice
\`8\`, then \`8\`.
--- choice
Only \`8\`: the second \`console.log\` has nothing to show.
--- choice
It stops with an error, because \`double\` has no \`return\`.
--- why
The call logs 8 while it runs. A function with no \`return\` hands back \`undefined\`, so \`result\` is \`undefined\`, and the last line prints it. That is why functions should return their answer.

+++ question | A const array
--- ask
Which line of this program stops it with an error?

\`\`\`js
const crew = ['Ada']      // line 1
crew.push('Lin')          // line 2
crew[0] = 'Sam'           // line 3
crew = ['Kim']            // line 4
\`\`\`
--- choice
Line 2: you cannot add to a \`const\` array.
--- choice
Line 3: you cannot replace an item of a \`const\` array.
--- choice correct
Line 4: a \`const\` name can never be pointed at a different value.
--- choice
None of them: \`const\` has no effect on arrays.
--- why
\`const\` fixes what the name points at, not what is inside it. Lines 2 and 3 change the same array, which is allowed. Line 4 tries to point \`crew\` at a new array, which throws \`TypeError: Assignment to constant variable.\`

+++ question | Two kinds of fallback
--- ask
What does this print?

\`\`\`js
const settings = { volume: 0 }
console.log(settings.volume ?? 50, settings.volume || 50)
\`\`\`
--- answer
0 50
--- why
\`??\` falls back only when the value is \`null\` or \`undefined\`, so it keeps the 0. \`||\` falls back on any falsy value, and 0 is falsy, so it gives 50. That is why \`??\` is the safer choice for settings.

+++ question | A chain of array methods
--- ask
What does this print?

\`\`\`js
console.log([1, 2, 3, 4].filter((n) => n % 2 === 0).map((n) => n * 10))
\`\`\`
--- answer
[ 20, 40 ]
[20, 40]
[20,40]
20, 40
20,40
--- why
\`filter\` runs first and keeps the even numbers, 2 and 4. \`map\` then multiplies each by 10. Neither changes the original array; each hands back a new one.

+++ question | One after another, or together
--- ask
About how long does each function take to finish?

\`\`\`js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function oneByOne() {
  await wait(100)
  await wait(100)
  await wait(100)
}

async function together() {
  await Promise.all([wait(100), wait(100), wait(100)])
}
\`\`\`
--- choice correct
\`oneByOne\` about 300 ms, \`together\` about 100 ms.
--- choice
Both about 100 ms: JavaScript runs all timers at the same time anyway.
--- choice
Both about 300 ms: three waits of 100 ms always add up to 300.
--- choice
\`oneByOne\` about 100 ms, \`together\` about 300 ms.
--- why
Each \`await\` in \`oneByOne\` waits for its timer before the next one is even started, so the waits add up. In \`together\`, all three timers start at once and \`Promise.all\` waits for the slowest, so the waits overlap.

+++ question | Spot the bug
--- ask
\`sum([1, 2])\` should be 3, but this returns \`NaN\`. Which line is wrong?

\`\`\`js
function sum(values) {
  let total = 0                                  // line 2
  for (let i = 0; i <= values.length; i++) {     // line 3
    total += values[i]                           // line 4
  }
  return total                                   // line 6
}
\`\`\`
--- choice
Line 2: the total should start at 1.
--- choice correct
Line 3: \`<=\` makes one extra pass, which reads \`values[2]\`, that is \`undefined\`.
--- choice
Line 4: it should read \`values[i - 1]\`.
--- choice
Line 6: it should return \`total - 1\`.
--- why
The last index is \`length - 1\`. With \`<=\`, the loop also runs with \`i\` equal to the length, adds \`undefined\`, and the sum becomes \`NaN\`. The test should be \`i < values.length\`.
`;export{e as default};