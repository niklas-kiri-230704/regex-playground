# 🔤 Regex Playground

A live regular-expression tester that runs entirely in the browser.

- Pattern + flags input (g, i, m, s, u, y) with instant invalid-pattern errors
- Multi-line test string with live match highlighting (alternating colors, zero-length-match safe)
- Match table: index, full match, numbered and named capture groups
- Live match count
- Replace section: live `String.replace` result (`$1`, `$<name>`, …)
- Collapsible cheat-sheet of common tokens (\d \w \s anchors, quantifiers, groups, lookarounds)
- Pattern library: save / load / delete pattern + flags + test text by name in localStorage
- Current session persisted to localStorage and restored on reload
- Debounced live evaluation; all user text HTML-escaped before rendering

## In the homelab

Served on port 2090 by the shared `statics` process — not as a PM2 app of its
own. Seventeen single-file apps each having their own Node process cost ~33MB apiece, which is what got Termux OOM-killed on the phone; one process now serves them all. Appears as a tile on the landing hub and is reachable behind the
gateway at `/regex/`. Nothing to configure.

`server.js` here is still what runs the app standalone (`npm start`) and on GitHub Pages; it is simply not what serves it on the phone.

## Run locally

```sh
node server.js
```

Then visit http://localhost:2090

## Deploy to GitHub Pages

Pure static, no build step. Put `index.html` at a repo root, push, then
Settings → Pages → Deploy from a branch → `main` / root. Live at
`https://<user>.github.io/<repo>/`.
