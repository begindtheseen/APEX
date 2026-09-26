<!-- Context notes for M22/02-the-gate.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[in CI|ci]] 1
[[real-screen-reader pass|screen-reader]] 1
[[lint rule|lint-rule]] 1
[[theater|theater]] 1

::: context ci Continuous integration
CI, continuous integration, means every change you push is automatically built and tested on a server, typically with GitHub Actions. A failing check shows a red cross on the pull request and usually blocks merging.

Putting an accessibility check in CI means nobody can quietly break it later: the test runs on every change, not only when someone remembers.
:::

::: context screen-reader Software that reads the screen aloud
A screen reader turns what is on screen into speech or braille for blind and low-vision users. Common ones are VoiceOver on Apple devices, NVDA (free, on Windows) and JAWS.

Streaming chat is hard for them: if the whole message area is announced every time a word is added, the user hears the same growing paragraph over and over. Only testing with a real one shows what it actually says.
:::

::: context lint-rule Automated code-style warnings
A linter (ESLint, for JavaScript) reads your code and flags likely mistakes without running it. React's hooks rules include one that warns when an effect uses a value missing from its dependency list.

The warning points at a real design question. Adding or removing entries just to silence it usually trades the warning for an infinite loop or a stale value.
:::

::: context theater Looks like safety, is not
"Security theater" is a phrase popularised by security writer Bruce Schneier for measures that look reassuring but do not actually protect anything.

An approval button that appears after the tool has already run is exactly that: the user feels in control, but the action has happened. A real gate runs **before** the side effect and blocks it until the person says yes.
:::
