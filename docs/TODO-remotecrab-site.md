# RemoteCrab 官网 — 待办与已决定

> 这份文件是给「下一个 session」看的：上下文会被压缩，结论不会。
> 每条都写了**为什么**和**怎么验收**，不要只按标题做。
> 最后更新：2026-11-12

## 现在的状态

- 站点在 `~/VGOAPP`，已合进 `main` 并**已部署线上**（54 个路由，预渲染 54/54，自检 0 失败）。
- 构建门禁：`scripts/check-prerender.mjs`（空壳会 fail）；`scripts/sitemap.mjs`（lastmod 只在文字变化时更新，状态在 `.sitemap-dates.json`）。
- 产品页有自己的页头页脚（`ProductHeader` / `ProductFooter`），**产品页里不要出现 VGO**。

---

## 待做

- [ ] **A. 14 张功能页截图重新装框（进行中）**
      现状：`RemoteCrabFeaturePage` 里是「渐变贝塞尔 + 假刘海 + 裸截图」，看起来像随手截的。
      目标：深色渐变底 + 环境光晕 + 设备框 + 统一比例，**不加任何营销文字**（文案由页面负责）。
      验收：随便挑 3 个功能页截图看，框体一致、没有假刘海、图片不模糊。

- [ ] **A2. 截图审计（2026-11-12 已做，结论如下）**
      现有 11 张真机截图里，**5 张需要重拍**：
      | slug | 问题 |
      |---|---|
      | `camera` | 是「演示模式 —— 示例画面，未连接电脑」的占位图，已从 `ART_SLUGS` 移除 |
      | `ai` | 几乎全黑，只有顶部一条输入栏 |
      | `microphone` | 空白屏 + 一个圆点，看不出是麦克风 |
      | `speaker` | 同上 |
      | `trackpad` | 同上（触控板本来就是空面，需要一张有拖动轨迹/手势状态的） |
      可用：`keyboard` / `notifications` / `transfer` / `automation`（标签是英文）/ `screen-mirror`（镜的是照片）。
      `numpad` 用的是视频帧而非 UI 截图，风格与其它不一致。
      另外 `remote-access` / `extended-display` / `app-switcher` 在 `ART_SLUGS` 里曾列过但**没有文件**，已移除。

- [ ] **B. 5 个功能页缺配图**（`recording` / `keep-awake` / `auto-update` / `multi-computer` / `two-phones`）
      现状：页面走纯文字面板（`ART_SLUGS` 里没有它们，所以不会 404）。
      需要：**真机截图**，放 `public/remotecrab/features/<slug>.jpg`（英文版加 `-en`），然后把 slug 加进 `ART_SLUGS`。
      **不能**拿别的功能截图凑；**不要**直接搬 App Store 的列表图（见「已决定」）。

- [ ] **C. macOS 15 / iOS 17 的支持范围**
      已验证：把 Mac 的 7 个 target + `Package.swift` 降到 15.0，`xcodebuild` **0 error**。
      未验证：一台 macOS 15 机器上跑四条路径（相机扩展注册 / 虚拟麦克风驱动 / 屏幕录制 / 输入注入）。
      之后要改：14 个功能页 × 3 条 `requires`（共 42 处）+ 首页版本行 + FAQ。
      现在站点写的是 `macOS 26 或更新 · M1 及以后 · iOS/iPadOS 17+`（iOS 按商店真实部署目标）。

- [ ] **D. App Store campaign 链接**
      站点上 `apps.apple.com/app/id6811599153` 换成带 `pt`（provider token）+ `ct` 的 campaign 链接，
      这样 ASC 的「来源」能单独看出「从官网来的」。零成本，改一处。

- [ ] **E. `/alternatives/` 要不要吃精确竞品词**
      现状：正文只有类别名（「系统自带」「只管摄像头的 App」），`keywords` 里有 Sidecar 等词。
      要吃到「Sidecar 替代」这类搜索，正文必须出现那些词 —— 这是取舍，需拍板。

- [ ] **F. 中文版 12 秒片段**
      `ads-zh/` 已经有了（16–21 秒 v2）；首页场景用的是它们的网页版。
      若之后加了新的中文片段，跑一遍 `scripts/encode-remotecrab-video.sh`（还没写，见 G）。

- [ ] **G. 视频编码脚本**
      现在是在 `prototypes/remotecrab-redesign/assets` 里手工 ffmpeg 出来的。
      应固化成 `scripts/encode-remotecrab-video.sh`：720p/540p、无音、CRF 31–33、faststart + 首帧 poster，按语言输出到 `public/remotecrab/video/`。

- [ ] **H. 首页功能清单要不要配图**
      已决定的建议：**不塞**。20 张卡片是密集文字表，配图会撑成两倍长、破坏统一节奏。
      截图放在「功能详情页」，首页保持「4 条视频场景 + 文字清单」。

---

## 已决定（不要再翻案，除非有新理由）

- **不在首页出现任何竞品名**（Sidecar / 接力 / Camo…）。理由：像替别人做宣传。对比放到 `/alternatives/`。
- **不复用 App Store 列表图做站内配图**：它自带标题（和页面重复）、带卡通头像、只有英文版（中国区没上架，拿不到 zh），而且覆盖不了缺图的 5 个主题。
- **「推送唤醒」不作为独立功能卡**，也不在页面上出现这个词。它只以结果出现：「在外面也能收到电脑通知」。
  讲故事的版本放在 `remote-access` 功能页（「等 agent 跑完」那条）。
- **产品页不出现 VGO**：页头页脚都是产品自己的。
- **不做网站埋点 / GA / 漏斗**（用户 2026-11-12 决定）：先看 App Store Connect 的数据。
  若以后要做：Caddy 访问日志 + 4 个点击事件（download / appstore / video / windows）+ 外链一律带 UTM，不加 cookie、不上第三方。
- **中文标点统一全角**（已扫过 347 行）；新增中文文案要跟随。

---

## 常用命令

```bash
cd ~/VGOAPP
npm run lint          # tsc
npm run build         # 构建 + 预渲染 + 英文 head 同步 + sitemap + 自检
./scripts/deploy.sh   # 部署到 vgoapp.com（VGOAPP_SSH_KEY=~/MDDock/certs/mddock-vps-root）
```

部署后抽查：

```bash
curl -s https://vgoapp.com/sitemap.xml | grep -c '<loc>'         # 应为 54
curl -s https://vgoapp.com/remotecrab/ | grep -o '<title>[^<]*'  # 标题应含 RemoteCrab
```
