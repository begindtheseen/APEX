<!-- Context notes for M14/01-the-module.md. scripts/launchpad-curriculum.ts marks each phrase (the nth time it appears) and appends the notes. -->
[[Greenfield|greenfield]] 1
[[LSP|lsp]] 2
[[blame, pickaxe|pickaxe]] 2
[[Chesterton’s fence|chestertons-fence]] 2
[[Characterization tests|characterization-tests]] 2
[[Strangler fig|strangler-fig]] 2
[[dual-run cutover|dual-run]] 2
[[behind a flag|feature-flag]] 1

::: context greenfield Greenfield and brownfield
A **greenfield** project starts from nothing — an empty field to build on, with no existing code to respect. **Brownfield** means working inside a system that already exists, with its history, users and odd decisions. Almost every new hire works brownfield first, so learning to find your way around someone else's code is the everyday skill.
:::

::: context lsp Three ways to search code
**ripgrep** searches for exact text, very fast. **ast-grep** searches by code structure, so you can find "every call to `fetch` with two arguments" however it is spaced. **LSP** (the Language Server Protocol, created by Microsoft) is what powers "go to definition" and "find all references" in your editor: it understands the language, so it knows which `save` you mean.
:::

::: context pickaxe Digging through git history
`git blame` shows, for each line, the last commit that touched it. The **pickaxe**, `git log -S "text"`, finds the commits where that text was added or removed — usually the one that explains *why* it exists. `git log -L` follows the history of a range of lines or a single function through every change. Together they turn "who wrote this nonsense?" into "oh, that is why."
:::

::: context chestertons-fence Chesterton's fence
From the writer G. K. Chesterton: if you come across a fence in the middle of a road and see no use for it, do not tear it down — first go and find out why someone put it there. In code, a strange-looking check or delay is often a fix for a problem you have not met yet. Remove it only once you know what it was for.
:::

::: context characterization-tests What characterization tests are
A **characterization test** records what code *currently does*, not what it should do — bugs included. You feed it inputs, write down the outputs it gives today, and assert those. The term comes from Michael Feathers' book *Working Effectively with Legacy Code*. It gives you a safety net for changing code nobody fully understands: if an output moves, you know, and you decide whether that was intended.
:::

::: context strangler-fig The strangler fig pattern
Named by Martin Fowler after a tropical vine that grows down around a host tree until it stands on its own, often killing the tree inside. Instead of rewriting an old system in one risky jump, you build the new one alongside it and move features across one at a time, routing each to the new code as it is ready, until the old system has nothing left to do and can be switched off.
:::

::: context dual-run What a dual-run cutover is
Run the old code and the new code side by side on the same real inputs — users still get the old result — and compare the outputs. Every difference is either a bug in the new code or an old bug you now understand. When they have matched long enough, you **cut over**: the new code's answers become the real ones, and the old code can be retired.
:::

::: context feature-flag What a feature flag is
A **feature flag** is a switch, stored outside the code, that turns a code path on or off without deploying anything new. Teams ship new behaviour switched off, turn it on for staff or 1% of users, watch, and widen it — and if something breaks, they flip it off in seconds instead of rushing out a fix.
:::
