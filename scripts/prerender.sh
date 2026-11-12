#!/usr/bin/env bash
#
# 预渲染（SSG）：把 CSR 的 React 页面渲染成「HTML 里就带内容」的静态页。
#
# 为什么要它：Google 能执行 JS，但渲染预算有限、且明显更慢 —— 实测 Search
# Console 只编入了 2 个页面，其余长期停在「已发现/未编入」。这一步在
# `vite build` 之后跑，把每个路由渲染后的 DOM 覆盖写回该路由的 index.html。
#
# 2026-11-10：渲染循环从「chrome --dump-dom + 虚拟时间预算」换成了
# `scripts/prerender.mjs`（CDP + 轮询到真的有正文）。旧写法不可复现，
# 一次构建里会随机有 6–17 个路由被写成空壳，而脚本仍然打印「成功 40，跳过 0」。
# 现在的判据是产物本身，`scripts/check-prerender.mjs` 会独立复核。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
PORT="${PRERENDER_PORT:-8099}"

if [ ! -d "$DIST" ]; then
  echo "错误：找不到 $DIST，请先运行 vite build" >&2
  exit 1
fi

# 先为每个中文路由生成 /en/ 英文镜像 + hreflang + sitemap（必须在预渲染之前）
echo "==> 生成 /en/ 英文镜像 + hreflang"
python3 "$ROOT/scripts/i18n-routes.py" "$DIST"

# 再渲染每个路由
echo "==> 预渲染"
PRERENDER_PORT="$PORT" node "$ROOT/scripts/prerender.mjs" "$DIST"

# /en/ 的 og / twitter 文案跟着 <title> 与 description 走（预渲染后才拿得到英文）
echo "==> 同步英文 head"
node "$ROOT/scripts/sync-en-head.mjs" "$DIST"

# sitemap：lastmod 只在内容真的变了时才更新（按 HTML 哈希比对上一次构建）
echo "==> 生成 sitemap"
node "$ROOT/scripts/sitemap.mjs" "$DIST"

# 独立复核：只要还有空壳就以非零码退出，别让「看起来成功」进发布
echo "==> 复核产物"
node "$ROOT/scripts/check-prerender.mjs" "$DIST"
