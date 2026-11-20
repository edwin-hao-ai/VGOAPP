#!/usr/bin/env node
// 构建期结构检查：把「只在线上才会暴露」的路由/SEO 问题提前到构建阶段变红。
//
// 为什么需要它（2026-11-16）：一次改名 + 一次部署，四处同时坏了，而
// `npm run build` 全程只打印「预渲染自检 56/56，0 失败」和「复核通过」：
//   - 手写的 Windows 页没有 canonical（孤儿页）
//   - i18n-routes.py 把英文页整份覆盖成中文（构建日志只有一行警告）
//   - 改动后的路由 404、服务器上还残留旧页
// 判据必须是产物本身，而且**必须是能失败的东西**：每条规则都注明它拦的是
// 哪一个真实失败，没有对应真实失败的规则不写（空过的检查比没有更糟）。
//
// 用法：node scripts/check-site.mjs [dist]
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve(process.argv[2] || 'dist')
const ORIGIN = 'https://vgoapp.com'

// 发布产物（DMG / MSI / zip）只存在于服务器，不在仓库里 —— 离线没法验证。
// 它们的 200 由 scripts/check-urls.mjs 在线上验。
//
// `/remotecab/r/` 是同一个道理的另一半：**观看页不属于这个站点的构建**。它是
// RemoteCrab 自己产出的单文件（`web/index.html`，由宿主编进 `rc-link-host`，
// 再把同一份拷到服务器），Vite 的 dist 里本来就不该有它。这里放行，不会掩盖死链 ——
// 它的 200 由部署后的 `check-urls.mjs` 在线上验，和下载包一样。
const LIVE_ONLY = ['/downloads/', '/remotecrab/r/']

// 被覆盖成中文时，英文页正文会出现成百上千个汉字；真正的英文页只有语言
// 切换器上的两三个字。判据用「与它自己的中文孪生页比」，不用绝对阈值 ——
// 绝对值会随页面内容变化，比值不会（实测：正常页 ≤0.005，覆盖后 ≈1.0）。
const CJK_MIN = 100 // 少于这个数不判，避免把语言切换器的「中文」当成故障
const CJK_RATIO = 0.5

const failures = []
const fail = (rule, where, detail) => failures.push(`FAIL ${rule} ${where} — ${detail}`)

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const routeOf = (file) => '/' + path.relative(DIST, file).replace(/index\.html$/, '')

function cjkCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
  return (text.match(/[\u4e00-\u9fff]/g) || []).length
}

if (!fs.existsSync(DIST)) {
  console.error(`check-site: 找不到 ${DIST}，先跑 vite build`)
  process.exit(1)
}

const pages = walk(DIST).map((file) => ({
  file,
  route: routeOf(file),
  html: fs.readFileSync(file, 'utf8'),
}))
const byRoute = new Map(pages.map((p) => [p.route, p]))

if (pages.length === 0) {
  // 一个什么都没扫到的检查，和一张干净的健康报告长得一模一样。
  console.error('check-site: dist 里一个 index.html 都没有 —— 这不是「通过」')
  process.exit(1)
}

// --- 规则 1：canonical 必须存在，且等于自身路由 ---------------------------
// 拦的是：手写页面漏 canonical（2026-11-16 的 /remotecrab/windows/），
// 以及路由改了 canonical 没跟着改（Google 会把两台 URL 当成两份内容）。
for (const { route, html } of pages) {
  const m = html.match(/<link rel="canonical" href="([^"]*)"/)
  if (!m) {
    fail('canonical', route, '缺少 <link rel="canonical">')
  } else if (m[1] !== ORIGIN + route) {
    fail('canonical', route, `期望 ${ORIGIN + route}，实际 ${m[1]}`)
  }
}

// --- 规则 2：中英必须成对 -------------------------------------------------
// 拦的是：只写了一边的页面（英文镜像没生成、或删了中文页留了英文页）。
for (const { route } of pages) {
  const zh = route.startsWith('/en/') ? route.slice(3) : route
  const en = '/en' + zh
  if (!byRoute.has(zh)) fail('pair', route, `缺少中文对应页 ${zh}`)
  if (!byRoute.has(en)) fail('pair', route, `缺少英文对应页 ${en}`)
}

// --- 规则 3：hreflang 三个值必须互相指对这一对 ----------------------------
// 拦的是：改名后 hreflang 还指向旧路径（2026-11-16 的 /en/macslim/ 指向 404）。
for (const { route, html } of pages) {
  const zh = route.startsWith('/en/') ? route.slice(3) : route
  const en = '/en' + zh
  const expect = {
    'zh-Hans': ORIGIN + zh,
    en: ORIGIN + en,
    'x-default': ORIGIN + zh,
  }
  const got = {}
  for (const m of html.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    got[m[1]] = m[2]
  }
  for (const [key, want] of Object.entries(expect)) {
    if (!(key in got)) fail('hreflang', route, `缺少 hreflang="${key}"`)
    else if (got[key] !== want) fail('hreflang', route, `hreflang="${key}" 期望 ${want}，实际 ${got[key]}`)
  }
  for (const key of Object.keys(got)) {
    if (!(key in expect)) fail('hreflang', route, `多余的 hreflang="${key}"（${got[key]}）`)
  }
}

// --- 规则 4：英文页不能是中文页的副本 -------------------------------------
// 拦的是：i18n-routes.py 用中文页覆盖手写英文页（2026-11-16 实测发生，
// 当时构建只打了一行警告，产物里英文标题变回「安装 Windows 版」）。
for (const { route, html } of pages) {
  if (!route.startsWith('/en/')) continue
  const zh = byRoute.get(route.slice(3))
  if (!zh) continue // 规则 2 已经报过了
  const enCjk = cjkCount(html)
  const zhCjk = cjkCount(zh.html)
  if (enCjk >= CJK_MIN && enCjk >= zhCjk * CJK_RATIO) {
    fail('lang', route, `英文页正文有 ${enCjk} 个汉字（中文对应页 ${zhCjk}）——像是被中文页覆盖了`)
  }
}

// --- 规则 5：noindex 的页面不能出现在 sitemap 里 --------------------------
// 拦的是：把某页标成 noindex 却仍提交给 Google（报告里只会变成
// 「已提交但未编入索引」的噪声，而且真假难分）。
const sitemapFile = path.join(DIST, 'sitemap.xml')
if (!fs.existsSync(sitemapFile)) {
  fail('sitemap', '/sitemap.xml', '缺少 sitemap.xml')
} else {
  const sitemapUrls = new Set(
    [...fs.readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
  )
  for (const { route, html } of pages) {
    if (!/<meta name="robots"[^>]*noindex/.test(html)) continue
    if (sitemapUrls.has(ORIGIN + route)) {
      fail('noindex', route, '页面是 noindex，却出现在 sitemap 里')
    }
  }
}

// --- 规则 6：站内链接必须落到真实文件 -------------------------------------
// 拦的是：改路由后页面里残留的死链（站内 404 不会被任何日志记录）。
let linkCount = 0
for (const { route, html } of pages) {
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1]
    if (!raw.startsWith('/') || raw.startsWith('//')) continue
    const clean = raw.split('#')[0].split('?')[0]
    if (LIVE_ONLY.some((p) => clean.startsWith(p))) continue
    linkCount++
    const target = path.join(DIST, clean.replace(/^\//, ''))
    const ok = clean.endsWith('/')
      ? fs.existsSync(path.join(target, 'index.html'))
      : fs.existsSync(target)
    if (!ok) fail('link', route, `${raw} 在 dist 里不存在`)
  }
}

// --- 汇总 -----------------------------------------------------------------
if (failures.length) {
  for (const f of failures) console.error(f)
  console.error(`check-site: ${pages.length} 个页面，${linkCount} 个站内链接，${failures.length} 处失败`)
  process.exit(1)
}
console.log(`check-site: ${pages.length} 个页面，${linkCount} 个站内链接，全部通过`)
