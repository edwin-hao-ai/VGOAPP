# SEO URL 契约 — 防复发约束设计

日期：2026-11-16
状态：待批准
相关：`deploy/vgoapp.caddy`、`scripts/deploy.sh`、`scripts/i18n-routes.py`、`scripts/sitemap.mjs`

## 1. 意图与为什么

2026-11-16 处理 Search Console 的告警时，站上有四处同时损坏，而**没有任何一步报错**：

| 现象 | 真实状态 |
|---|---|
| `./scripts/deploy.sh` | 打印 `done` |
| `npm run build` | 打印「预渲染自检 56/56，0 失败」「复核通过」 |
| `/macslim/` | 200 + `content-length: 0`（`handle_path` 空 200） |
| `/en/macslim/` | 200（改名后的残留页，hreflang 指向已 404 的 `/macslim/`） |
| `http://vgoapp.com/*` | 200（共享 Caddyfile 的 `auto_https disable_redirects`） |
| 6 条旧 URL | 404，只有 Search Console 会在几天后告诉你 |

结论：这些错误不是「跑错了」，是**静默**。约束的价值不在于让流程更正确，而在于让静默的错误自己变成红灯。

## 2. 目标

**构建期（离线，无网络）拦住：**

- 任何页面缺 canonical，或 canonical 不等于自身路由（尾斜杠一致）
- 中英镜像不成对（只有一边）
- `/en/` 页面出现中文 title / description（这是「镜像脚本把英文页覆盖成中文」的直接指纹）
- 站内 `href` / `src` 指向 dist 里不存在的文件

**部署后（线上，只读 GET）拦住：**

- 退役路由不 301，或 301 的目标不是 200
- `http://` 不跳 `https://`
- 无尾斜杠不变 308
- sitemap 里任何一个 URL 非 200

**部署时报告漂移（只报告，不删）：**

- 服务器上存在、而仓库产物里没有的文件

## 3. 非目标

- 不接 Search Console API，不做排名 / 收录监控
- 不做自动回滚（回滚一个已经 reload 的 Caddy 比修它更危险）
- 不改共享的 `/etc/caddy/Caddyfile`（MDDock 拥有，我们只读它的后果）
- 不改任何页面的视觉与文案

## 4. 反目标

- **会误报的检查**。误报会训练人忽略红灯（本仓库 lesson 146 的形态），比没有检查更糟。
- **空过的检查**。一个「自己扫不到东西」却打印通过的检查（lesson 145 的形态）。所以下面每条规则都注明「它拦的是哪一个真实失败」，没有对应真实失败的规则不写。

## 5. 三个部件

### 5.1 `scripts/check-site.mjs`（构建期，离线）

输入 `dist/`。逐条断言，任一失败 → 打印 `FAIL <规则> <文件> — <实际值>`，非零退出。

| # | 规则 | 拦的真实失败 |
|---|---|---|
| 1 | 每个 `index.html` 有 `<link rel="canonical">`，且值 == `https://vgoapp.com` + 自身路由 | Windows 页原本没有 canonical（孤儿页） |
| 2 | 每个 `index.html` 有 `<meta name="robots">` | 同上，手工页面容易漏 |
| 3 | 每个 zh 路由 `/x/` 有 `/en/x/`，反之亦然；两边的 `hreflang` zh-Hans / en / x-default 三个值都指向这一对 | 只有一边的页面（如只写了英文页） |
| 4 | `/en/` 下的 `<title>` 与 description 不含中日韩字符，例外见 `ALLOW_CJK` | 英文页被 `i18n-routes.py` 覆盖回中文（今天实测发生） |
| 5 | `/en/<route>/` 与 `<route>/` 的 `<title>` 不相同，例外见 `SHARED_TITLES` | 同上，但覆盖的是英文标题（规则 4 看不见的情况） |
| 6 | 站内 `href` / `src`（去掉 query / hash）必须命中 dist 里的文件；以 `/` 结尾的必须存在对应目录 | 改路由后残留的死链 |

例外表（都注释原因，且必须为空才允许删掉注释）：

- `ALLOW_CJK = ["/en/"]` — 首页 title 是刻意中英双语的品牌行，`sync-en-head.mjs` 里已有同一条例外
- `SHARED_TITLES = ["/"]` — 同上

**刻意不写的规则**：sitemap 集合 == 路由集合。`sitemap.mjs` 就是遍历 dist 生成的，这条断言永远为真 —— 属于空过检查。真正的 sitemap 断言放在部署后（线上 sitemap 的每个 URL 必须 200）。

### 5.2 `scripts/url-contract.json` + `scripts/check-urls.mjs`（部署后，线上）

`url-contract.json`：

```json
{
  "origin": "https://vgoapp.com",
  "retired": [
    { "from": "/zh/", "to": "/", "code": 301 },
    { "from": "/zh", "to": "/", "code": 301 },
    { "from": "/download.html", "to": "/remotecrab/", "code": 301 },
    { "from": "/join.html", "to": "/", "code": 301 },
    { "from": "/macslim", "to": "/slimdisk/", "code": 301 },
    { "from": "/macslim/", "to": "/slimdisk/", "code": 301 },
    { "from": "/macslim/privacy/", "to": "/slimdisk/privacy/", "code": 301 },
    { "from": "/en/macslim/", "to": "/en/slimdisk/", "code": 301 },
    { "from": "/en/macslim/privacy/", "to": "/en/slimdisk/privacy/", "code": 301 }
  ],
  "httpsOnly": ["/", "/remotecrab/", "/remotecrab/windows/"],
  "slashless": ["/remotecrab/", "/slimdisk/", "/remotecrab/windows/"]
}
```

`check-urls.mjs`：

- `retired` 每条：`from` 返回 `code`，且 `Location` 解析后等于 `origin + to`；再取一次 `to`，必须 200。（目标必须活着 —— 今天 `/macslim/` 的「目标」就是自己 404）
- `httpsOnly` 每条：`http://origin + path` 返回 301，Location 以 `https://` 开头。
- `slashless` 每条：去掉尾斜杠 → 308，Location 是带斜杠版本。
- 线上 `sitemap.xml` 里每个 `<loc>`：200。
- 并发 8；**每条 3 次重试**，重试用尽才算红（今天遇到过 `SSL_ERROR_SYSCALL`，网络抖动不该变成假红）。
- `--origin` 可覆盖，便于对预发 / 本机验证。
- 失败同样打印 `FAIL …` 并非零退出。

### 5.3 `scripts/deploy.sh` 改动

顺序：`build`（含 `check-site`）→ **漂移报告** → `rsync` → Caddy 安装/reload → `check-urls` → 打印 `done`。

漂移报告：`rsync -n --itemize-changes`（dry-run），把「服务器有、产物没有」的文件逐条打印成 `DRIFT …`，**不删除**。排除 `downloads/`（发布产物不在仓库里，正常）。

`VGOAPP_PRUNE=1` 时改用 `--delete`（仍排除 `downloads/`），并在删除前把将被删除的清单写进日志。

`check-urls` 失败 → 非零退出，`done` 不打印。

### 5.4 `i18n-routes.py` 去名单化

把现在的 `HANDWRITTEN_EN = {"/remotecrab/windows/"}` 换成结构性判定：

> 若 `public/en/<route>/index.html` 存在，则该路由的中文页仍会被补 meta，但**不生成英文镜像**（只对已存在的英文页补 `og:locale` / `keywords`）。

这样以后新增手写英文页不需要改脚本 —— 名单会漂移，文件不会。

### 5.5 文档

`docs/TODO-remotecrab-site.md` 加一节「URL 契约（改路由前必读）」：

- 改名 / 下线路由的四步：改 `vite.config.ts` → 在 `url-contract.json` 的 `retired` 加一条 → 在 `deploy/vgoapp.caddy` 加 301 → 部署时 `check-urls` 自动验收
- 手写页面必须放 `public/`：否则 `--delete` 会删掉它，且构建期 canonical 检查会红
- 两个 Caddy 语法坑（`redir` 两参数语义、`handle_path` 空 200）指向 `deploy/vgoapp.caddy` 的注释

## 6. 我替你做的决定（可推翻）

1. **检查器用 Node**，不用 shell。今天用 shell 验证时就踩了两次：`$R` 不分词、`comm` 被 locale 排序坑掉（第一次差异清单里一半是假差异）。
2. **`check-site.mjs` 进 `npm run build`**，失败即中断。和现有 `check-prerender.mjs` 同语义 —— 构建期的问题不要留到部署后。
3. **退役表用 JSON**，不塞进 Caddy 注释：Caddy 只要 URL，检查器还需要「目标必须 200」和「原始状态码」。
4. **不做 lastmod 断言**：`sitemap.mjs` 的哈希机制已经在管这件事，再加一层是重复。
5. **漂移只报告不自动删**：删服务器文件应该由人决定，脚本只负责让人看见。

## 7. 验收

设计批准后的实现验收标准（不是本文档的验收）：

- 故意把 `/en/` 某个页面的 title 改成中文 → `npm run build` 非零退出，报 `FAIL CJK /en/...`
- 故意把 `url-contract.json` 里某条的 `to` 改成一个不存在的路径 → `check-urls` 非零退出
- 故意在 `public/` 放一个 dist 里没有的页面后部署 → 漂移报告列出它、且不删
- 正常部署：`check-site` 0 失败，`check-urls` 全绿，`done` 打印
