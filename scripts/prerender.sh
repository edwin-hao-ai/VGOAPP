#!/usr/bin/env bash
#
# 预渲染（SSG）：把 CSR 的 React 页面渲染成「HTML 里就带内容」的静态页。
#
# ## 为什么需要它
#
# 本站是 Vite + React 的多页应用，每个页面的 HTML 里只有 `<div id="root">`，
# 正文全靠 JS 挂载。Google 虽然能执行 JS，但渲染预算有限、且明显更慢 —— 实测
# Search Console 只编入了 2 个页面，其余长期停在「已发现/未编入」。
#
# 这一步在 `vite build` 之后跑：起一个本地静态服务，用无头 Chrome 打开每个路由，
# 等 React 渲染完，把渲染后的 DOM 覆盖写回该路由的 index.html。产物仍是同一套
# JS（会 hydrate），只是**HTML 里现在就有内容**，爬虫不执行 JS 也读得到。
#
# ## 约定
# - 渲染语言固定 zh-CN（页面声明的 `lang="zh-CN"` 即主语言）；英文靠站内切换。
# - 任一页渲染失败**不阻断发布**：保留原 CSR 页（退化为旧行为），只打印 SKIP。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
PORT="${PRERENDER_PORT:-8099}"
CHROME="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -d "$DIST" ]; then
  echo "错误：找不到 $DIST，请先运行 vite build" >&2
  exit 1
fi
if [ ! -x "$CHROME" ]; then
  # 预渲染是「锦上添花」：没有 Chrome 时跳过，让构建继续（CI/其他机器常见）。
  echo "跳过预渲染：找不到 Chrome（$CHROME）。可用 CHROME_BIN 指定。" >&2
  exit 0
fi

# 先为每个中文路由生成 /en/ 英文镜像 + hreflang（必须在预渲染之前）
echo "==> 生成 /en/ 英文镜像 + hreflang"
python3 "$ROOT/scripts/i18n-routes.py" "$DIST"

# 路由 = dist 下所有含 index.html 的目录（相对 dist）
ROUTES=()
while IFS= read -r line; do
  ROUTES+=("$line")
done < <(cd "$DIST" && find . -name index.html | sed 's#^\./##; s#index\.html$##' | sort)

python3 -m http.server "$PORT" --directory "$DIST" >/dev/null 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true' EXIT
sleep 1

ok=0
skip=0
for route in "${ROUTES[@]}"; do
  url="http://127.0.0.1:${PORT}/${route}"
  out="${DIST}/${route}index.html"
  tmp="${out}.prerender.tmp"
  if "$CHROME" --headless=new --disable-gpu --virtual-time-budget=6000 \
      --lang=zh-CN --dump-dom "$url" > "$tmp" 2>/dev/null \
      && [ -s "$tmp" ] \
      && grep -q 'id="root"><' "$tmp"; then
    mv "$tmp" "$out"
    ok=$((ok + 1))
    echo "  prerendered: /${route}"
  else
    rm -f "$tmp"
    skip=$((skip + 1))
    echo "  SKIP（渲染失败，保留原 CSR 页）: /${route}"
  fi
done

echo "预渲染完成：成功 ${ok}，跳过 ${skip}，共 ${#ROUTES[@]} 个路由"
