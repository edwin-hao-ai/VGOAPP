# RemoteCrab 目录提交文案（AlternativeTo / MacUpdate）

> 2026-11-12。两个站都要登录后提交，我没有账号，所以这里只准备**可以直接粘贴的文案**。
> 提交前先读 `GROWTH.md` §5 的 12 项检查（尤其是「数字要可核对」「不要形容词空转」）。

---

## 0. 进展（2026-11-12）

| 渠道 | 状态 | 细节 |
|---|---|---|
| **MacUpdate** | ✅ 已提交，等审核 | 表单全部填完并提交；页面回「10 天内邮件回复」。账号 `haogemini`（Google 登录） |
| **Homebrew cask** | ✅ PR 开着 | <https://github.com/Homebrew/homebrew-cask/pull/302115>（OPEN/MERGEABLE）。本地跑过 `audit --new`、`audit --online`、`style --fix`、`install`、`uninstall` 五项。⚠️ 维护者回复要**本人**回 |
| **AlternativeTo** | ✅ 已提交（Normal queue，2026-11-12） | 帐号 `Edwin-Hao`（Google 登录，验证已完成）。名称/网址/两句描述/Pricing=Free/Tags 3 个/Company=VGO/图标/3 张截图+描述/发布日期/cask token/审核备注全部填好。Platforms 由用户手点；⚠️ **Homebrew cask 字段必须留空** —— cask 还没合并进 homebrew-cask，填 `remotecrab` 会让保存直接 400（「no installable package called remotecrab」）。等 PR 合并后再补。
       ⚠️ 队列页提示两件可选但有用的事没填：**Alternatives**（"别人怎么找到你"）和 **Tags**（脚本填的 tags 没存住），可以在 `my-submissions` 页面点 Suggest / Add 补 |

> 经验：AlternativeTo 的提交入口是用户菜单 → **Suggest new application**（`/manage-item/`），不是 `/manage/add-app/`（404）。图标和截图可以直接用控制台的 file input（`input[name=iconImage]` / `input[name=screenshot]`）上传本地文件。

## 1. AlternativeTo

提交入口：<https://alternativeto.net/manage/add-app/> （需要账号）

| 字段 | 填什么 |
|---|---|
| Name | RemoteCrab |
| Homepage | https://vgoapp.com/remotecrab/ |
| Download / App Store | https://apps.apple.com/app/id6811599153 |
| License | Free (remote access is an optional subscription) |
| Platforms | macOS, Windows, iOS |
| Categories | Productivity, Utilities, Remote Desktop |
| Tags | iphone webcam, virtual camera, second screen, trackpad, screen mirroring, notification relay |

**Tagline（≤ 80 字符）**

```
Use the iPhone you already own as a webcam, mic, second screen and trackpad.
```

**Description（可直接粘贴）**

```
RemoteCrab turns an iPhone or iPad into the peripherals a computer is missing: a
camera that shows up in Zoom, Teams, Meet and OBS at 1080p, a system-level
microphone, a real second display, a trackpad and a keyboard.

Everything works over your own Wi-Fi, with no account and nothing uploaded. Remote
access from another network is an optional subscription ($3.99/month).

What it actually does today:
- Camera: 1080p30 output, up to 4K capture, listed in every app's camera menu.
- Second display: macOS registers it as a real display, not a mirror.
- Trackpad and keyboard: system IME, so Chinese input works.
- Mac notifications on the phone; tap one and the Mac jumps back to that window.
- Windows is supported, except the virtual microphone.

Requirements: macOS 26 or later on M1 or newer, or Windows 10/11. The iPhone/iPad
app needs iOS or iPadOS 17 or later (iPhone XS, 2018, and newer).
```

**List as an alternative to**（挑这几个，别贪多）

```
Camo, EpocCam, Duet Display, Deskreen, Apple Continuity Camera
```

---

## 2. MacUpdate

提交入口：<https://www.macupdate.com/developers> （需要账号；免费条目要过人工审核）

| 字段 | 填什么 |
|---|---|
| Title | RemoteCrab |
| Version | 1.4.0 |
| Price | Free (optional subscription for remote access) |
| Category | Utilities / Video |
| Requires | macOS 26.0 or later, Apple silicon |
| Download URL | https://vgoapp.com/downloads/RemoteCrab-1.4.0.dmg |
| Homepage | https://vgoapp.com/remotecrab/ |
| Icon | `public/remotecrab-icon.png`（1024×1024） |

**Short description（一句话，他们首页就显示这一句）**

```
Use the iPhone you already own as a webcam, a second display, a trackpad and a keyboard for your Mac.
```

**Long description**

```
RemoteCrab makes an iPhone or iPad act as the peripherals a Mac is missing.

Camera: appears as "RemoteCrab Camera" in Zoom, Teams, FaceTime, OBS and anything
else that can pick a camera. 1080p30 output, up to 4K capture.

Second display: macOS registers a real display sized to the phone, so windows can be
dragged onto it and touched directly. Not a mirror.

Trackpad and keyboard: relative cursor movement, two-finger scroll, right click,
three-finger gestures and modifiers. Typing goes through the system IME, so Chinese
input and dictation work.

Notifications: Mac banners are relayed to the phone. Tapping one activates the app
and brings back the exact window that sent it.

Everything runs over the local network. No account, no analytics, no cloud. Remote
access from a different network is an optional subscription.

Requires macOS 26 or later on Apple silicon (M1 and newer), and iOS/iPadOS 17 or
later on the phone. A Windows build exists too.
```

---

## 3. 提交前自检（照 GROWTH §5）

- [ ] 用的是 RemoteCrab 的正式链接，不是短链
- [ ] 没有一个形容词空转（seamless / powerful / effortless）
- [ ] 每个数字都能核对（1080p30 / 4K / $3.99 / iOS 17 / iPhone XS）
- [ ] 写了真实的限制（Windows 没有虚拟麦克风、要 macOS 26 + M1）
- [ ] 正文里没有破折号 `—`
