#!/usr/bin/env node
// 把 scripts/mock/feature-screens.html 里的每一屏渲染成 1206×2622 的配图。
//
// 为什么用 HTML 画：这 5 个页面（camera / ai / microphone / speaker / trackpad）
// 的真机截图要么是「演示模式」占位图、要么是一块空白屏，拍不出「它在做什么」。
// 产品本身还在变，配图的目的不是像素级还原，而是让人一眼看懂它长什么样、怎么用。
//
// 用法：node scripts/render-feature-screens.mjs
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const DEBUG_PORT = Number(process.env.CHROME_DEBUG_PORT || 9341)
const OUT = path.resolve('public/remotecrab/features')
const HTML = path.resolve('scripts/mock/feature-screens.html')
const SLUGS = ['camera', 'ai', 'microphone', 'speaker', 'trackpad']

if (!fs.existsSync(CHROME)) { console.error('need Chrome'); process.exit(1) }

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'rc-shot-'))
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' })

const json = async (url) => (await fetch(url)).json()
async function ws() {
  for (let i = 0; i < 60; i++) {
    try { const j = await json(`http://127.0.0.1:${DEBUG_PORT}/json`); const p = j.find((t) => t.type === 'page'); if (p) return p.webSocketDebuggerUrl } catch {}
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error('no page target')
}

const url = await ws()
const socket = new WebSocket(url)
let id = 0
const pending = new Map()
socket.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
})
await new Promise((r) => (socket.onopen = r))
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); socket.send(JSON.stringify({ id: i, method, params })) })

await send('Emulation.setDeviceMetricsOverride', { width: 402, height: 874, deviceScaleFactor: 1, mobile: true })

for (const slug of SLUGS) {
  await send('Page.navigate', { url: `file://${HTML}?s=${slug}` })
  await new Promise((r) => setTimeout(r, 700))
  const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 402, height: 874, scale: 3 } })
  const png = Buffer.from(shot.data, 'base64')
  // PNG → JPEG（PIL 更省事，这里直接写 PNG 再由 sips 转，避免额外依赖）
  const tmp = path.join(os.tmpdir(), `${slug}.png`)
  fs.writeFileSync(tmp, png)
  await new Promise((resolve) => spawn('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '88', tmp, '--out', path.join(OUT, `${slug}.jpg`)], { stdio: 'ignore' }).on('exit', resolve))
  fs.rmSync(tmp)
  console.log('rendered', slug)
}

socket.close()
chrome.kill('SIGKILL')
await new Promise((r) => setTimeout(r, 300))
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 200 }) } catch {}
