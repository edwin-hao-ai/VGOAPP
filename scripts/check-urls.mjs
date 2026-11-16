#!/usr/bin/env node
// 部署后验收：对着线上逐条实测，而不是相信「部署脚本打印了 done」。
//
// 为什么需要它（2026-11-16）：那次部署脚本打印了 done，而同时
//   - /macslim/ 返回 200 + 空正文（handle_path 内层没命中，Caddy 不回落到兄弟 handle）
//   - /en/macslim/ 返回 200（改名后的残留页）
//   - http://vgoapp.com/* 返回 200（共享 Caddyfile 关了自动跳转）
//   - 6 条旧 URL 404
// 以上没有任何一条会让部署脚本失败。所以这里的每一条断言都对应一次真实事故。
//
// 用法：node scripts/check-urls.mjs [--origin https://vgoapp.com]
//
// 读 scripts/url-contract.json。失败打印 FAIL 并非零退出。
import fs from 'node:fs'

const argv = process.argv.slice(2)
const originIdx = argv.indexOf('--origin')
const CONTRACT_FILE = 'scripts/url-contract.json'

const contract = JSON.parse(fs.readFileSync(CONTRACT_FILE, 'utf8'))
const ORIGIN = (originIdx >= 0 ? argv[originIdx + 1] : contract.origin).replace(/\/+$/, '')
const HTTP_ORIGIN = ORIGIN.replace(/^https:/, 'http:')

const CONCURRENCY = 8
const RETRIES = 3
const TIMEOUT_MS = 15000

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// 一次真实的失败：今天验证时就撞到过 SSL_ERROR_SYSCALL。
// 网络抖动不该变成假红（误报会训练人忽略红灯），所以要重试；
// 但重试用尽必须算红，不能吞掉。
async function request(url, { method = 'GET', manual = false } = {}) {
  let last = ''
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
    try {
      const res = await fetch(url, {
        method,
        redirect: manual ? 'manual' : 'follow',
        signal: ctrl.signal,
        headers: { 'user-agent': 'vgoapp-check-urls/1' },
      })
      if (res.status >= 500 || res.status === 429) {
        last = `HTTP ${res.status}`
      } else {
        return res
      }
    } catch (e) {
      last = e?.message || String(e)
    } finally {
      clearTimeout(timer)
    }
    if (attempt < RETRIES) await sleep(400 * attempt)
  }
  throw new Error(`${url} 重试 ${RETRIES} 次仍失败：${last}`)
}

const failures = []
const fail = (what, detail) => failures.push(`FAIL ${what} — ${detail}`)

const resolve = (location, base) => {
  try {
    return new URL(location, base).href
  } catch {
    return location
  }
}

const tasks = []

// --- 退役路由：必须是 301，落点必须是它声明的目标，且目标活着 --------------
// 只检查「跳了」不够：跳到一个 404 比不跳更糟（2026-11-16 的 /macslim/
// 当时就是拿自己当目标）。
for (const item of contract.retired ?? []) {
  tasks.push(async () => {
    const from = ORIGIN + item.from
    const res = await request(from, { manual: true })
    if (res.status !== item.code) {
      fail(`retired ${item.from}`, `期望 ${item.code}，实际 ${res.status}`)
      return
    }
    const want = ORIGIN + item.to
    const got = resolve(res.headers.get('location') ?? '', from)
    if (got !== want) {
      fail(`retired ${item.from}`, `Location 期望 ${want}，实际 ${got}`)
      return
    }
    const target = await request(want)
    if (target.status !== 200) {
      fail(`retired ${item.from}`, `落点 ${item.to} 返回 ${target.status}（跳到一个坏页面比不跳更糟）`)
    }
  })
}

// --- http 必须跳 https ----------------------------------------------------
// 共享 Caddyfile 的 auto_https disable_redirects 会让明文端口直出 200；
// 这件事不在本仓库里，只能实测。
for (const path of contract.httpsOnly ?? []) {
  tasks.push(async () => {
    const from = HTTP_ORIGIN + path
    const res = await request(from, { manual: true })
    if (res.status !== 301) {
      fail(`https ${path}`, `http 版本期望 301，实际 ${res.status}`)
      return
    }
    const got = resolve(res.headers.get('location') ?? '', from)
    if (!got.startsWith('https://')) {
      fail(`https ${path}`, `Location 不是 https：${got}`)
    }
  })
}

// --- 裸路径必须 308 回带斜杠版本 ------------------------------------------
// 这是 Search Console「网页会自动重定向」那条的唯一来源；它是正常的，
// 但一旦某天变成 200 或 404，说明 file_server 的行为变了。
for (const path of contract.slashless ?? []) {
  tasks.push(async () => {
    const bare = ORIGIN + path.replace(/\/$/, '')
    const res = await request(bare, { manual: true })
    if (res.status !== 308) {
      fail(`slashless ${bare}`, `期望 308，实际 ${res.status}`)
      return
    }
    const got = resolve(res.headers.get('location') ?? '', bare)
    if (got !== ORIGIN + path) {
      fail(`slashless ${bare}`, `Location 期望 ${ORIGIN + path}，实际 ${got}`)
    }
  })
}

// --- sitemap 里每个 URL 必须 200 ------------------------------------------
// 构建期的 check-site 只保证 sitemap 与产物一致；线上的 200 只能在这里验。
tasks.push(async () => {
  const res = await request(ORIGIN + '/sitemap.xml')
  if (res.status !== 200) {
    fail('sitemap', `sitemap.xml 返回 ${res.status}`)
    return
  }
  const xml = await res.text()
  const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))]
  if (urls.length === 0) {
    fail('sitemap', 'sitemap.xml 里一个 <loc> 都没有 —— 这不是「通过」')
    return
  }
  console.log(`check-urls: sitemap 有 ${urls.length} 个 URL，逐个核对…`)
  for (const url of urls) {
    tasks.push(async () => {
      const r = await request(url)
      if (r.status !== 200) fail('sitemap url', `${url} 返回 ${r.status}`)
    })
  }
})

// --- 发布产物必须真的能下载（只发 HEAD）-----------------------------------
for (const path of contract.artifacts ?? []) {
  tasks.push(async () => {
    const url = ORIGIN + path
    const res = await request(url, { method: 'HEAD' })
    if (res.status !== 200) fail('artifact', `${url} 返回 ${res.status}`)
  })
}

// --- 并发执行 -------------------------------------------------------------
async function runPool(items, limit) {
  let i = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++
      try {
        await items[idx]()
      } catch (e) {
        failures.push(`FAIL request — ${e.message}`)
      }
    }
  })
  await Promise.all(workers)
}

// sitemap 的任务是动态加入的，所以要跑两轮：先跑固定项（其中一项会把 sitemap
// 的逐条任务填进 tasks），再把新填进来的跑掉。
const seeded = [...tasks]
tasks.length = 0
await runPool(seeded, CONCURRENCY)
const added = tasks.length
await runPool(tasks, CONCURRENCY)

const total = seeded.length + added
if (failures.length) {
  for (const f of failures) console.error(f)
  console.error(`check-urls: ${total} 项检查，${failures.length} 处失败（${ORIGIN}）`)
  process.exit(1)
}
console.log(`check-urls: ${total} 项检查全部通过（${ORIGIN}）`)
