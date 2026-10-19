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

echo "==> build"
( cd "$ROOT" && npm run build )

echo "==> sync dist/ -> $HOST:$REMOTE/"
if [[ "${VGOAPP_RSYNC_DELETE:-0}" == "1" ]]; then
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

echo "==> done: https://vgoapp.com/remotecrab/"
