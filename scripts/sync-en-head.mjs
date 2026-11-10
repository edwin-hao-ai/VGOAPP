#!/usr/bin/env node
// 英文页的 og / twitter 文案对齐 <title> 与 description。
//
// 为什么需要：页面自己只改 document.title 和 <meta name="description">，
// 而 og:title / og:description / twitter:* 是各路由 index.html 里写死的中文。
// 预渲染跑完以后，/en/ 页面的 title 和 description 已经是英文了，这里把它们
// 抄到 OG / Twitter 上，保证分享卡片和搜索结果一致。
//
// 用法：node scripts/sync-en-head.mjs [dist]
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve(process.argv[2] || 'dist')

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const setMeta = (html, attr, name, value) => {
  const esc = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  const re = new RegExp(`<meta ${attr}="${name}" content="[^"]*"\\s*/?>`)
  const tag = `<meta ${attr}="${name}" content="${esc}" />`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

let touched = 0
const warnings = []

for (const file of walk(DIST)) {
  const route = '/' + path.relative(DIST, file).replace(/index\.html$/, '')
  if (!route.startsWith('/en')) continue
  let html = fs.readFileSync(file, 'utf8')

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim()
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim()
  if (!title || !desc) { warnings.push(`${route}: 缺 title 或 description`); continue }
  // 首页标题是品牌行，中英双语是刻意的（"VGO — 做你真正会用的工具 | Tools you actually use."）
  // 首页的 title / description 是品牌行，中英双语是刻意的
  if (route !== '/en/') {
    if (/[\u4e00-\u9fff]/.test(title)) warnings.push(`${route}: title 还是中文 —— ${title}`)
    if (/[\u4e00-\u9fff]/.test(desc)) warnings.push(`${route}: description 还是中文`)
  }

  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', desc)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', desc)
  fs.writeFileSync(file, html, 'utf8')
  touched++
}

console.log(`英文 head 同步：${touched} 个 /en/ 页面`)
if (warnings.length) {
  console.log('警告：')
  for (const w of warnings) console.log('  ' + w)
}
