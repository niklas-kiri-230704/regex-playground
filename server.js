'use strict';

// server.js — static file server for the Regex Playground app.
//
// Zero npm dependencies, zero secrets, and — by design — zero links to any other
// homelab service. The app is a single self-contained index.html with all logic
// running in the browser; this server only hands that file to the browser so the
// app can run as a PM2 process on the phone and show up on the landing hub. The
// same index.html is also deployable as-is to GitHub Pages.
//
// Works both standalone (http://<host>:2090/) and behind apps/gateway at the
// /regex/ prefix — the gateway strips the prefix, so this server always sees its
// own root and just serves index.html.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '2090', 10);

const STATIC_FILES = {
  '/':           { file: 'index.html', type: 'text/html; charset=utf-8' },
  '/index.html': { file: 'index.html', type: 'text/html; charset=utf-8' },
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405); return res.end('method not allowed');
  }

  const pathname = req.url.split('?')[0];

  if (pathname === '/api/health') {
    const body = JSON.stringify({ ok: true, app: 'regex', uptime: Math.round(process.uptime()) });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(req.method === 'HEAD' ? undefined : body);
  }

  const stat = STATIC_FILES[pathname];
  if (!stat) { res.writeHead(404); return res.end('not found'); }

  fs.readFile(path.join(__dirname, stat.file), (err, data) => {
    if (err) { res.writeHead(500); return res.end('read error'); }
    res.writeHead(200, { 'Content-Type': stat.type });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`regex listening on http://0.0.0.0:${PORT}`);
});

function shutdown() { server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 3000).unref(); }
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
