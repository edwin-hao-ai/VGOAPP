#!/usr/bin/env node
// sitemap.xml：只在页面内容真的变了时才更新 lastmod。
//
// 为什么单独一步：以前 lastmod 写的是「今天」，而每次部署都会重写 54 条，
// 等于告诉 Google 这个字段不可信（它就会退回自己的抓取启发式）。现在按
// 每个路由的 HTML 内容哈希比对上一次构建，没变就沿用旧日期。
//
// 状态文件 .sitemap-dates.json 提交在仓库里：它就是「每页最后变化日期」的记录。
//
// 用法：node scripts/sitemap.mjs [dist]
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve(process.argv[2] || 'dist')
const ORIGIN = 'https://vgoapp.com'
const STATE_PATH = path.resolve('.sitemap-dates.json')
const today = new Date().toISOString().slice(0, 10)

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const files = walk(DIST).sort()
const prev = fs.existsSync(STATE_PATH) ? JSON.parse(fs.readFileSync(STATE_PATH, 'utf8')) : {}
const state = {}
const entries = []

let changed = 0
for (const file of files) {
  const route = '/' + path.relative(DIST, file).replace(/index\.html$/, '')
  const hash = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex')
  const before = prev[route]
  const date = before && before.hash === hash ? before.date : today
  if (!before || before.hash !== hash) changed++
  state[route] = { hash, date }
  entries.push({ route, date })
}

const zhRoutes = entries.filter((e) => !e.route.startsWith('/en/')).map((e) => e.route)

function priority(route) {
  if (route === '/') return '1.0'
  const depth = route.replace(/^\/|\/$/g, '').split('/').filter(Boolean).length
  if (depth === 0) return '0.9'
  return depth >= 2 ? '0.6' : '0.7'
}

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
]

for (const entry of entries) {
  const route = entry.route
  if (route.startsWith('/en/')) continue
  const enRoute = '/en' + route
  const enEntry = entries.find((e) => e.route === enRoute)
  for (const r of [route, enRoute]) {
    const d = r === route ? entry.date : enEntry?.date || entry.date
    lines.push('  <url>')
    lines.push(`    <loc>${ORIGIN + r}</loc>`)
    lines.push(`    <lastmod>${d}</lastmod>`)
    lines.push(`    <priority>${priority(r)}</priority>`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${ORIGIN + route}" />`)
    lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN + enRoute}" />`)
    lines.push('  </url>')
  }
}
lines.push('</urlset>')

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), lines.join('\n') + '\n', 'utf8')
fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8')

console.log(`sitemap: ${zhRoutes.length * 2} 个 URL，本次内容有变化的 ${changed} 个`)
