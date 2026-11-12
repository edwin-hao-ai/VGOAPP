#!/usr/bin/env node
// 每个重要页面一张 1200×630 的分享卡片。
//
// 为什么：现在全站共用一张 og-image，HN / Reddit / X / 微信里分享出来，
// 一张通用图无法说明「这一页讲什么」。点击率差一截。
//
// 用法：node scripts/render-og.mjs
// 产物：public/og/<slug>.png（路由 → slug 的映射在 scripts/i18n-routes.py）
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const DEBUG_PORT = Number(process.env.CHROME_DEBUG_PORT || 9342)
const OUT = path.resolve('public/og')
const HTML = path.resolve('scripts/mock/og-card.html')

// 只给「会被分享出去」的页面做；其余继续用全站那张
const CARDS = [
  { slug: 'remotecrab', kicker: 'One phone, one computer', title: 'Your iPhone is the peripherals your computer is missing', chip: 'Free on your Wi-Fi' },
  { slug: 'webcam', kicker: 'iPhone as a webcam', title: 'Stop buying webcams. The iPhone in your drawer already is one.', chip: '1080p30 · Mac + Windows' },
  { slug: 'alternatives', kicker: 'Choosing', title: 'iPhone as a webcam or second display: the options, compared', chip: '' },
  { slug: 'camera', kicker: 'Wireless camera', title: 'Your iPhone shows up in every camera menu', chip: 'Zoom · Teams · OBS' },
  { slug: 'trackpad', kicker: 'Trackpad', title: 'A wireless trackpad that actually feels like one', chip: '' },
  { slug: 'ai', kicker: 'Ask AI', title: 'It sees your screen. The answer lands at your cursor.', chip: '' },
  { slug: 'remote-access', kicker: 'Remote access', title: 'Your computer, from anywhere', chip: '$3.99 / month' },
  { slug: 'notifications', kicker: 'Notifications', title: 'Mac notifications on your phone. Tap one, jump back.', chip: '' },
  { slug: 'webcam-zh', kicker: 'iPhone 当摄像头', title: '用 iPhone 当摄像头，不用再买一个', chip: '1080p 30 帧 · Mac 和 Windows' },
  { slug: 'remotecrab-zh', kicker: '一部手机，补全你的电脑', title: '把 iPhone 变成摄像头、麦克风、第二块屏和触控板', chip: '局域网免费' },
  { slug: 'alternatives-zh', kicker: '选型', title: 'iPhone 当摄像头、当副屏：几种做法，和各自适合谁', chip: '' },
]

if (!fs.existsSync(CHROME)) { console.error('need Chrome'); process.exit(1) }
fs.mkdirSync(OUT, { recursive: true })

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'rc-og-'))
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' })

const json = async (u) => (await fetch(u)).json()
let wsUrl = null
for (let i = 0; i < 60 && !wsUrl; i++) {
  try {
    const list = await json(`http://127.0.0.1:${DEBUG_PORT}/json`)
    wsUrl = list.find((t) => t.type === 'page')?.webSocketDebuggerUrl
  } catch {}
  if (!wsUrl) await new Promise((r) => setTimeout(r, 200))
}
if (!wsUrl) { chrome.kill('SIGKILL'); throw new Error('no page target') }

const socket = new WebSocket(wsUrl)
let id = 0
const pending = new Map()
socket.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
})
await new Promise((r) => (socket.onopen = r))
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); socket.send(JSON.stringify({ id: i, method, params })) })

await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })

for (const card of CARDS) {
  const q = new URLSearchParams({ t: card.title, k: card.kicker, c: card.chip || '' })
  await send('Page.navigate', { url: `file://${HTML}?${q}` })
  await new Promise((r) => setTimeout(r, 500))
  const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } })
  fs.writeFileSync(path.join(OUT, `${card.slug}.png`), Buffer.from(shot.data, 'base64'))
  console.log('og', card.slug)
}

socket.close()
chrome.kill('SIGKILL')
await new Promise((r) => setTimeout(r, 300))
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 200 }) } catch {}
