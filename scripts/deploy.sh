#!/usr/bin/env bash
#
# Build the VGO site and publish it to the VPS, where the mddock-cloud
# Caddy serves vgoapp.com straight from /var/www/vgoapp.
#
# The Caddy site definition is owned by this repo (deploy/vgoapp.caddy) and
# installed to /etc/caddy/sites/vgoapp.caddy. The shared Caddyfile imports
# every file in that directory, so deploying this project never touches
# MDDock's config (and vice versa).
#
# Usage:
#   ./scripts/deploy.sh                    # build + sync the site
#   DMG=~/iBridge/dist/RemoteCrab-1.0.dmg ./scripts/deploy.sh
#   VGOAPP_RSYNC_DELETE=1 ./scripts/deploy.sh   # prune removed files too
#
# Env:
#   DEPLOY_HOST          default root@158.247.219.230
#   VGOAPP_SSH_KEY       default ~/MDDock/certs/mddock-vps-root
#   VGOAPP_REMOTE_DIR    default /var/www/vgoapp
#   VGOAPP_RSYNC_DELETE  set to 1 to --delete stale files (keeps downloads/)
#   DMG                  optional path to a Mac DMG to publish under downloads/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${DEPLOY_HOST:-root@158.247.219.230}"
KEY="${VGOAPP_SSH_KEY:-$HOME/MDDock/certs/mddock-vps-root}"
REMOTE="${VGOAPP_REMOTE_DIR:-/var/www/vgoapp}"
# 允许把 SSH 源地址绑定到物理网卡：本机常开着 TUN 代理（假 IP 段 198.18.0.0/15），
# 它会把去 VPS 的连接也劫持进 utun，导致 SSH banner 交换超时。绑到 en0 的 IP
# （如 VGOAPP_SSH_BIND=192.168.31.60）即可绕过。留空则用默认路由。
SSH_OPTS="-i $KEY -o StrictHostKeyChecking=accept-new"
if [ -n "${VGOAPP_SSH_BIND:-}" ]; then
  SSH_OPTS="$SSH_OPTS -b $VGOAPP_SSH_BIND"
fi
SSH=(ssh $SSH_OPTS)

[[ -f "$KEY" ]] || { echo "SSH key not found: $KEY (set VGOAPP_SSH_KEY)" >&2; exit 1; }

echo "==> build（含构建期结构检查 scripts/check-site.mjs）"
( cd "$ROOT" && npm run build )

# 漂移报告：列出「服务器上有、仓库产物里没有」的文件。
# 为什么需要：2026-11-16 发现 /en/macslim/（改名后的残留页）在线上活了整个月，
# 因为 rsync 默认不带 --delete。这里只报告、不删除 —— 删服务器文件应该由人决定。
echo "==> 漂移检查（dry-run，不删任何文件）"
DRIFT_FILE="$(mktemp)"
rsync -an --delete --itemize-changes --exclude 'downloads/' \
  -e "ssh $SSH_OPTS" "$ROOT/dist/" "$HOST:$REMOTE/" 2>/dev/null \
  | awk '/^\*deleting/ {print $2}' > "$DRIFT_FILE" || true
ASSET_DRIFT="$(grep -c '^assets/' "$DRIFT_FILE" 2>/dev/null || true)"
CONTENT_DRIFT="$(grep -v '^assets/' "$DRIFT_FILE" 2>/dev/null | grep -v '^$' || true)"
if [[ -n "$CONTENT_DRIFT" ]]; then
  echo "    以下文件在服务器上、仓库产物里没有（不会被自动删除）："
  printf '%s\n' "$CONTENT_DRIFT" | sed 's/^/    DRIFT /'
  echo "    如果它们确实该消失：VGOAPP_PRUNE=1 ./scripts/deploy.sh"
else
  echo "    无内容漂移"
fi
if [[ "${ASSET_DRIFT:-0}" -gt 0 ]]; then
  echo "    另有 $ASSET_DRIFT 个过期的 /assets/ 打包文件（无害，忽略）"
fi
rm -f "$DRIFT_FILE"

echo "==> sync dist/ -> $HOST:$REMOTE/"
if [[ "${VGOAPP_RSYNC_DELETE:-0}" == "1" || "${VGOAPP_PRUNE:-0}" == "1" ]]; then
  echo "    --delete 已启用（downloads/ 保留）"
  rsync -avz --delete --exclude 'downloads/' \
    -e "ssh $SSH_OPTS" \
    "$ROOT/dist/" "$HOST:$REMOTE/"
else
  rsync -avz -e "ssh $SSH_OPTS" \
    "$ROOT/dist/" "$HOST:$REMOTE/"
fi

if [[ -n "${DMG:-}" ]]; then
  [[ -f "$DMG" ]] || { echo "DMG not found: $DMG" >&2; exit 1; }
  echo "==> publish $DMG -> $REMOTE/downloads/"
  "${SSH[@]}" "$HOST" "mkdir -p '$REMOTE/downloads'"
  rsync -avzP -e "ssh $SSH_OPTS" \
    "$DMG" "$HOST:$REMOTE/downloads/"
  # Stable alias the site links to: /downloads/RemoteCrab.dmg
  "${SSH[@]}" "$HOST" \
    "cp -f '$REMOTE/downloads/$(basename "$DMG")' '$REMOTE/downloads/RemoteCrab.dmg'"
fi

CADDY_SITES_DIR="${VGOAPP_CADDY_SITES_DIR:-/etc/caddy/sites}"
echo "==> install Caddy site snippet -> $CADDY_SITES_DIR/vgoapp.caddy"
"${SSH[@]}" "$HOST" \
  "install -d -m 0755 '$CADDY_SITES_DIR' && cat > /tmp/vgoapp.caddy.new" \
  < "$ROOT/deploy/vgoapp.caddy"
"${SSH[@]}" "$HOST" \
  "if cmp -s /tmp/vgoapp.caddy.new '$CADDY_SITES_DIR/vgoapp.caddy'; then
     rm -f /tmp/vgoapp.caddy.new
   else
     install -m 0644 /tmp/vgoapp.caddy.new '$CADDY_SITES_DIR/vgoapp.caddy'
     rm -f /tmp/vgoapp.caddy.new
     docker exec mddock-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
   fi"

# 线上验收：每一条都对应一次真实事故（见 url-contract.json 的注释）。
# 失败 → 非零退出，「done」不会打印。不回滚：回滚一个已经 reload 的 Caddy
# 比修它更危险，而且站点此刻已经在线上了。
echo "==> 验收线上 URL 契约"
node "$ROOT/scripts/check-urls.mjs"

echo "==> done: https://vgoapp.com/remotecrab/"
