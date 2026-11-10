#!/usr/bin/env node
// 预渲染：把每个路由的 React 渲染结果写回 index.html。
//
// 2026-11-10 之前这一步是「一条 chrome --dump-dom + 6 秒虚拟时间预算」，
// 结果不可复现：同样的构建会随机有 6–17 个路由被写成空壳，而脚本仍然打印
// 「成功 40，跳过 0」——因为判据是字符串 `id="root"><`，一个只挂载了空壳的
// 页面也能让它通过。线上因此丢过 6 个功能页（3 KB 空壳）。
//
// 现在改成「起一个 Chrome，逐个导航，轮询到 #root 真的有子节点且正文超过
// 200 字，再取 documentElement.outerHTML」。慢一点，但产物是真的。
//
// 用法：node scripts/prerender.mjs [dist] [--port 8099]
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import http from 'node:http'
import { spawn } from 'node:child_process'

const DIST = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'dist')
const PORT = Number(process.env.PRERENDER_PORT || 8099)
const DEBUG_PORT = Number(process.env.CHROME_DEBUG_PORT || 9333)
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const NAV_TIMEOUT = Number(process.env.PRERENDER_TIMEOUT || 15000)
const MIN_TEXT = 200

if (!fs.existsSync(DIST)) {
  console.error(`错误：找不到 ${DIST}，请先运行 vite build`)
  process.exit(1)
}
if (!fs.existsSync(CHROME)) {
  console.error(`跳过预渲染：找不到 Chrome（${CHROME}）。可用 CHROME_BIN 指定。`)
  process.exit(0)
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
}

// Node 的 http 服务器天然并发，比 `python3 -m http.server`（单线程）稳；
// 后者在 Chrome 并发请求多个 chunk 时会互相饿死，是先前偶发空壳的原因之一。
const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0])
  let file = path.join(DIST, url)
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    else if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html'
    const body = fs.readFileSync(file)
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    res.end(body)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('not found')
  }
})

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const emit = (s) => process.stdout.write(s + '\n')

async function json(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${url} ${r.status}`)
  return r.json()
}

async function waitForChrome() {
  for (let i = 0; i < 100; i++) {
    try {
      const v = await json(`http://127.0.0.1:${DEBUG_PORT}/json/version`)
      if (v.webSocketDebuggerUrl) return v
    } catch {}
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error('Chrome 调试端口没有起来')
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let id = 0
    const pending = new Map()
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data)
      if (msg.id && pending.has(msg.id)) {
        const { resolve: res, reject: rej } = pending.get(msg.id)
        pending.delete(msg.id)
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result)
      }
    })
    ws.addEventListener('error', reject)
    ws.addEventListener('open', () => {
      resolve({
        send(method, params = {}) {
          return new Promise((res, rej) => {
            const i = ++id
            pending.set(i, { resolve: res, reject: rej })
            ws.send(JSON.stringify({ id: i, method, params }))
          })
        },
        close: () => ws.close(),
      })
    })
  })
}

const routes = walk(DIST).sort()
emit(`==> 预渲染 ${routes.length} 个路由（${DIST}）`)

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'rc-prerender-'))
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))
const base = `http://127.0.0.1:${PORT}`

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--disable-extensions', '--mute-audio',
  `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`,
  'about:blank',
], { stdio: 'ignore' })

let ok = 0
const skipped = []

try {
  await waitForChrome()
  const targets = await json(`http://127.0.0.1:${DEBUG_PORT}/json`)
  const page = targets.find((t) => t.type === 'page')
  if (!page) throw new Error('没有可用的页面 target')
  const cdp = await connect(page.webSocketDebuggerUrl)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  const evaluate = async (expression) => {
    const r = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    return r.result?.value
  }

  for (const file of routes) {
    const route = '/' + path.relative(DIST, file).replace(/index\.html$/, '')
    try {
      await cdp.send('Page.navigate', { url: base + route })
      // 轮询到「真的渲染了」：常见失败是 dump 早于 React 挂载，或 chunk 还在路上
      const deadline = Date.now() + NAV_TIMEOUT
      let rendered = false
      while (Date.now() < deadline) {
        const state = await evaluate(
          '(() => { const r = document.getElementById("root");' +
          ' const t = (document.body && document.body.innerText || "").trim();' +
          ' return { children: r ? r.childElementCount : 0, text: t.length } })()',
        )
        if (state && state.children > 0 && state.text >= 200) {
          // 连续两次一致才算稳定，避免抓到首屏骨架
          await new Promise((r) => setTimeout(r, 250))
          const again = await evaluate(
            '(() => { const r = document.getElementById("root");' +
            ' const t = (document.body && document.body.innerText || "").trim();' +
            ' return { children: r ? r.childElementCount : 0, text: t.length } })()',
          )
          if (again && again.children > 0 && again.text >= 200) { rendered = true; break }
        }
        await new Promise((r) => setTimeout(r, 150))
      }
      if (!rendered) throw new Error('超时：页面没有渲染出正文')
      const html = await evaluate('document.documentElement.outerHTML')
      if (typeof html !== 'string' || html.length < 1000) throw new Error('取到的 DOM 太短')
      fs.writeFileSync(file, `<!DOCTYPE html>\n${html}\n`, 'utf8')
      ok++
      emit(`  prerendered: ${route}`)
    } catch (err) {
      skipped.push({ route, reason: err.message })
      emit(`  SKIP ${route} —— ${err.message}`)
    }
  }
  cdp.close()
} finally {
  chrome.kill('SIGKILL')
  server.close()
  // Chrome 被杀后还会往 profile 里写几毫秒，删目录要重试；删不掉也不算失败
  await new Promise((r) => setTimeout(r, 400))
  try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 200 }) } catch {}
}

emit(`预渲染完成：成功 ${ok}，跳过 ${skipped.length}，共 ${routes.length} 个路由`)
if (skipped.length) {
  emit('跳过的路由（保留原 CSR 页，自检会失败）：' + skipped.map((s) => s.route).join(' '))
  process.exitCode = 1
}
