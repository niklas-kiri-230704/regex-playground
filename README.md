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

Runs as the `regex` PM2 app on port 2090 and appears as a tile on the landing
hub. Reachable behind the gateway at `/regex/`. `server.js` simply serves
`index.html` — there is nothing to configure.

## Run locally

```sh
node server.js
```

Then visit http://localhost:2090

## Deploy to GitHub Pages

Pure static, no build step. Put `index.html` at a repo root, push, then
Settings → Pages → Deploy from a branch → `main` / root. Live at
`https://<user>.github.io/<repo>/`.
