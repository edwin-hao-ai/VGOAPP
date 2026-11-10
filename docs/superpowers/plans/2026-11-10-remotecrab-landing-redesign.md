# RemoteCrab 官网改版 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修好预渲染与英文 SEO 的硬伤，然后把新版首页落到真站，再补 6 个落地页。

**Architecture:** 站点是 Vite 多页 + `scripts/prerender.sh` 用无头 Chrome 把每个路由的 DOM 覆盖写回 `index.html`，`scripts/i18n-routes.py` 在预渲染前生成 `/en/` 镜像与 sitemap。改动集中在这两个脚本、`src/pages/RemoteCrabPage.tsx` 与 `src/i18n/*`。

**Tech Stack:** Vite 6 · React 19 · TypeScript · Tailwind 4 · 无头 Chrome（CDP）· Python 3（sitemap/i18n 路由）

**Spec:** `docs/superpowers/specs/2026-11-10-remotecrab-landing-redesign-design.md`

## Global Constraints

- 14 个落地页的正文结构（hero / problem / how / details / tips / requires / next）不得改动。
- 产品文案里的价格固定：$3.99/月 · $29.99/年；局域网永久免费。
- 视频一律 9:16、按语言各一套；网页版必须 720p / 无音 / faststart。
- 中英文各一个 URL（`/…` 与 `/en/…`），不得靠 JS 切语言做 SEO。
- 提交信息用 conventional commits；不提交 `dist/`。

## Review Focus

- 预渲染"成功"但产物是空壳（本次线上就是这样丢的 6 个页面）——判据必须是**页面正文存在**，不是 `id="root">` 这个字符串。
- 页面 `<title>` 被父级 Provider 的 effect 覆盖（现在 `/remotecrab/` 的标题是 VGO 的站名）。
- `/en/` 页面带着中文 title / description 出现在英文搜索结果里。
- 视频在窄屏 / 桌面裁切掉烧字或画面里的手机。
- 用户机器不满足系统要求时，页面仍然让他下 14 MB 再失败。

---

### Task 1: 预渲染必须证明页面真的渲染了

**Files:**
- Create: `scripts/prerender.mjs`
- Modify: `scripts/prerender.sh:57-76`
- Test: `scripts/check-prerender.mjs`（新增：扫 dist，断言每个路由都有正文）

**Interfaces:**
- Consumes: `dist/` 由 `vite build` 产出；`scripts/i18n-routes.py` 已跑过
- Produces: `prerender(distDir)`；对每个路由写回渲染后的 HTML，返回 `{ok, skipped[]}`

- [ ] **Step 1: 写检查脚本**：`node scripts/check-prerender.mjs dist` 遍历所有 `index.html`，断言 `<div id="root">` 下有元素且文档里有 `<h1`；打印失败清单并以非零码退出。
- [ ] **Step 2: 跑它确认现在失败**（应报 6 个 zh 页面 + 若干 `/en/`）。
- [ ] **Step 3: 写 `prerender.mjs`**：起一个 Chrome（`--remote-debugging-port`），逐个路由 `Page.navigate` → 轮询 `#root` 子节点数 > 0 且稳定 250 ms（上限 12 s）→ `Runtime.evaluate("document.documentElement.outerHTML")` 写回。失败只跳过并记录 URL。
- [ ] **Step 4: `prerender.sh` 改为调用它**（保留 i18n 步骤与提示输出）。
- [ ] **Step 5: 重新构建并跑检查**：`npm run build && node scripts/check-prerender.mjs dist`，期望 `0 failures`。
- [ ] **Step 6: 提交**。

### Task 2: 每页的 title / description 归页面自己

**Files:**
- Modify: `src/i18n/LanguageContext.tsx`（删掉 `setPageTitle` 的全局写入）
- Modify: `src/pages/RemoteCrabPage.tsx:70`（保留自己的 title）
- Test: 预渲染产物里 `grep -o '<title>'` 逐路由比对

**Interfaces:**
- Consumes: 每个路由的 `index.html` 已有正确的中文 title
- Produces: 页面运行时不再覆盖 title

- [ ] **Step 1: 复现**：`grep -o '<title>[^<]*' dist/remotecrab/index.html` 应为 RemoteCrab 的标题，现在却是 VGO 的。
- [ ] **Step 2: 删掉 Provider 的 `document.title` 写入**（它只该管语言状态）。
- [ ] **Step 3: 重建**，逐路由确认 title 与静态 HTML 一致。
- [ ] **Step 4: 提交**。

### Task 3: `/en/` 的标题与描述要是英文

**Files:**
- Modify: `scripts/i18n-routes.py`
- Create: `scripts/seo-dump.ts`（esbuild 打包成 CJS，导出每个路由的 `{zh:{title,description}, en:{...}}`）
- Modify: `scripts/prerender.sh`（在 i18n 之前生成 dump）

**Interfaces:**
- Consumes: `remoteCrabFeatures.en/zh`、`remoteCrabContent.en/zh`、`slimDisk` 的 meta
- Produces: `/en/<route>/index.html` 的 `<title>`、`description`、`og:title`、`og:description`、`twitter:title`、`twitter:description`

- [ ] **Step 1: 生成 dump 并断言键齐全**（14 个 feature slug + 首页/suites/privacy + slimdisk）。
- [ ] **Step 2: i18n-routes 用 dump 改写英文 head**（缺失键时**保持原样并报错**，不许静默留中文）。
- [ ] **Step 3: 构建后断言**：`/en/` 下没有任何 `title` 含 CJK。
- [ ] **Step 4: 提交**。

### Task 4: og:image 与 sitemap

**Files:**
- Modify: 各路由 `index.html` 的 `og:image` / `twitter:image`
- Modify: `scripts/i18n-routes.py`（sitemap 已包含全部路由，仅需确认新页进入）

- [ ] **Step 1: 用 `dist/og-image.png`（1200×630）替换方图标**，zh/en 各自带 `og:image:width/height`。
- [ ] **Step 2: 构建后检查 40 个路由的 `og:image` 全部指向 1200×630。**
- [ ] **Step 3: 提交**。

### Task 5: 首页改版落地

**Files:**
- Modify: `src/pages/RemoteCrabPage.tsx`、`src/i18n/remotecrabContent.ts`
- Create: `src/components/remotecrab/Stage.tsx`（4:5 海报画框 + 模糊底色 + 9:16 片段）
- Create: `src/components/remotecrab/FeatureGrid.tsx`（20 组，14 组带链接）
- Assets: `public/remotecrab/video/*.mp4` + `*.jpg`

- [ ] **Step 1: 视频流水线脚本** `scripts/encode-remotecrab-video.sh`：720p / 无音 / CRF 31 / faststart + 首帧 poster，按语言输出。
- [ ] **Step 2: Stage 组件**（props：`src`、`poster`、`ratio`、`playClip`），桌面 4:5、移动端 `min(74vw,320px)`。
- [ ] **Step 3: 首屏**（单一主 CTA + 平台切换 + 版本/体积/系统要求 + 最新 34s 片 4.2s 起播）。
- [ ] **Step 4: 场景四条横带** + 灯箱。
- [ ] **Step 5: FeatureGrid 20 组**，14 组链接到既有落地页。
- [ ] **Step 6: 对比表 / 价格 / 安装四步 / FAQ（含 iPad 条）**。
- [ ] **Step 7: 中英文案与 EN 视频源；`npm run build` + 检查脚本通过。**
- [ ] **Step 8: 提交。**

### Task 6: 6 个新落地页

**Files:**
- Modify: `src/i18n/remotecrabFeatures.ts`（`ORDER` 加 6 个 slug + 两语言正文）
- Create: `{remotecrab/features/<slug>}/index.html` ×6 + 对应 `-en.jpg` 首图

- [ ] **Step 1: 数字键盘**（含数字行键码、与触控板共存、自动弹出）
- [ ] **Step 2: 多台电脑**（配对、切换、preferred 10 分钟 TTL）
- [ ] **Step 3: 多设备接管**（takeover 能力位、被顶掉方文案）
- [ ] **Step 4: 录制**（mov + wav、存影片文件夹）
- [ ] **Step 5: 合盖不睡**（边界：电量 20%、温度、8 小时、watchdog）
- [ ] **Step 6: 空闲自动更新**（30 s dwell、不在会话/录制）
- [ ] **Step 7: sitemap + 预渲染检查包含新路由；提交。**

## 待定（不阻塞 Task 1–4）

- macOS 15 / iOS 17 的最终口径（需真机验证后才改 14 页 × 3 条 `requires`）
- 中文版 12 秒片段
- 情景模式套数（18 / 17 / 19 三处不一致）
