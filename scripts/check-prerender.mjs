#!/usr/bin/env node
// 预渲染自检：每个路由的 index.html 里必须真的有正文。
//
// 为什么需要它：`scripts/prerender.sh` 过去的成功判据是 `grep -q 'id="root"><'`，
// 一个只挂载了空壳的页面也能让这个 grep 通过 —— 2026-11-10 线上因此丢了 6 个
// 功能页（3 KB 空壳），而构建日志写着「成功 40，跳过 0」。判据必须是产物里
// 看得见的东西：#root 有元素子节点，且页面里有 <h1>。
import fs from 'node:fs'
import path from 'node:path'

const DIST = process.argv[2] || 'dist'
const MIN_TEXT = 200 // 正文字符数下限，防止「有 h1 但内容没渲染完」

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const routes = walk(DIST).sort()
const failures = []

for (const file of routes) {
  const html = fs.readFileSync(file, 'utf8')
  const route = '/' + path.relative(DIST, file).replace(/index\.html$/, '')
  const root = html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|<\/body>)/)
  const body = root ? root[1] : ''
  const hasChild = /<\w/.test(body)
  const hasH1 = /<h1[\s>]/i.test(html)
  const text = textOf(html)
  const ok = hasChild && hasH1 && text.length >= MIN_TEXT
  if (!ok) {
    failures.push({ route, bytes: html.length, hasChild, hasH1, text: text.length })
  }
}

console.log(`预渲染自检：${routes.length} 个路由，${failures.length} 个失败`)
for (const f of failures) {
  console.log(`  FAIL ${f.route}  ${f.bytes} B  child=${f.hasChild} h1=${f.hasH1} text=${f.text}`)
}
process.exit(failures.length ? 1 : 0)
