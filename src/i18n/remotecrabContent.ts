import type { Language } from './translations'

export interface FeatureItem {
  icon: string
  title: string
  body: string
  /** Detail landing page, relative to the site root. */
  href: string
}

export interface RemoteCrabContent {
  meta: { title: string; description: string }
  nav: { back: string }
  hero: {
    badge: string
    tagline: string
    description: string
    downloadMac: string
    downloadIOS: string
    free: string
    requirementsNote: string
  }
  features: { title: string; description: string; items: FeatureItem[] }
  compatibility: { title: string; body: string; cta: string }
  steps: {
    title: string
    description: string
    items: { title: string; body: string }[]
  }
  requirements: {
    title: string
    mac: { title: string; items: string[] }
    ios: { title: string; items: string[] }
    note: string
  }
  privacy: { title: string; body: string; points: string[] }
  faq: { title: string; items: { question: string; answer: string }[] }
  cta: { title: string; body: string; download: string }
}

export const remoteCrabContent: Record<Language, RemoteCrabContent> = {
  zh: {
    meta: {
      title: 'RemoteCrab — 把 iPhone 变成电脑的副屏、摄像头、麦克风、触控板和键盘',
      description:
        'RemoteCrab 把你的 iPhone / iPad 变成电脑的第二块屏幕、摄像头、麦克风、触控板和键盘，通过本地 WiFi 直连，无云端、无账号、无订阅。',
    },
    nav: { back: '← 返回 VGO' },
    hero: {
      badge: 'macOS 桌面端 · 免费',
      tagline: '你的 iPhone,就是电脑缺失的外设',
      description:
        '把它变成电脑的第二块屏幕、摄像头、麦克风、触控板和键盘 —— 再把电脑上的通知送到你手机上,点一下就跳回那个应用。通过本地 WiFi 直连,没有云端、没有账号、没有订阅。',
      downloadMac: '下载电脑版',
      downloadIOS: 'App Store 下载 iPhone 版',
      free: '免费 · 无账号 · 无订阅 · 数据不出局域网',
      requirementsNote: '需要 macOS 26+（Apple 芯片）与 iOS 26+',
    },
  compatibility: {
    title: '情景模式认识你电脑上的 49 个应用',
    body: '演示、终端、AI 助手、浏览器、邮件、会议、Xcode…… 你在哪个 App 里,手机上的按键就换成哪一套。没收录的应用也有兜底按键。',
    cta: '看看全部 18 套',
  },
    features: {
      title: '一个 App,十一种用法',
      description: '不用买副屏、摄像头、麦克风或触控板 —— 你本来就有的 iPhone 就够了。',
      items: [
        {
          icon: 'bell',
          href: '/remotecrab/features/notifications/',
          title: '电脑通知到手机',
          body: '电脑上的通知实时送到 iPhone；点一下，电脑立刻切回发通知的那个应用和窗口。',
        },
        {
          icon: 'display',
          href: '/remotecrab/features/extended-display/',
          title: '第二块屏幕',
          body: '电脑上多出一块真实的虚拟显示器,把窗口拖到 iPhone 上,再用手指直接操作它。',
        },
        {
          icon: 'mirror',
          href: '/remotecrab/features/screen-mirror/',
          title: '屏幕镜像与操控',
          body: '把电脑上任意一个 App 窗口搬到手机,点按、拖拽、滚动、捏合都能直接操作。',
        },
        {
          icon: 'camera',
          href: '/remotecrab/features/camera/',
          title: '1080p 无线摄像头',
          body: '作为标准摄像头出现在 Zoom、Teams、FaceTime、OBS 里，以 1080p 30fps 输出；采集最高支持 4K，下采样后画面更锐利。',
        },
        {
          icon: 'mic',
          href: '/remotecrab/features/microphone/',
          title: '虚拟麦克风',
          body: '一键安装签名并经 Apple 公证的虚拟麦克风驱动，iPhone 立刻变成全系统可用的无线麦克风。',
        },
        {
          icon: 'trackpad',
          href: '/remotecrab/features/trackpad/',
          title: '全功能触控板',
          body: '拖动、双指滚动、右键、缩放、三指手势、⌃⌥⌘⇧ 修饰键，带顺滑的加速曲线与触觉反馈。',
        },
        {
          icon: 'keyboard',
          href: '/remotecrab/features/keyboard/',
          title: '系统输入法键盘',
          body: '中文输入法与听写都能用；文字直接出现在电脑光标处，⌘C / ⌘V / ⌘Z 照常工作。',
        },
        {
          icon: 'voice',
          href: '/remotecrab/features/voice/',
          title: '按住说话',
          body: '端侧语音识别，把你说的话直接变成电脑上的文字，无需上传云端。',
        },
        {
          icon: 'files',
          href: '/remotecrab/features/transfer/',
          title: 'AirDrop 式传文件',
          body: '照片和文件直发电脑，自动存入下载文件夹并在 Finder 中高亮显示。',
        },
        {
          icon: 'clipboard',
          href: '/remotecrab/features/transfer/',
          title: '剪贴板互通',
          body: '两端剪贴板一键互发，复制粘贴跨设备无缝衔接。',
        },
        {
          icon: 'appSwitcher',
          href: '/remotecrab/features/app-switcher/',
          title: '应用切换器',
          body: '在 iPhone 上点一下，电脑 上对应的 App 立即置前。',
        },
      ],
    },
    steps: {
      title: '四步就能用上',
      description: '从下载到连上，通常不到两分钟。',
      items: [
        { title: '下载电脑端', body: '下载 RemoteCrab.dmg，拖进「应用程序」并打开。' },
        { title: '装上 iPhone 端', body: '从 App Store 下载 RemoteCrab，让两台设备连上同一个 WiFi。' },
        {
          title: '按引导授权',
          body: '开启辅助功能、虚拟摄像头与虚拟麦克风 —— 每一项都可在系统设置里随时关闭。',
        },
        {
          title: '点一下配对',
          body: '通过 Bonjour 自动发现，一次配对长期记住，之后打开即连。',
        },
      ],
    },
    requirements: {
      title: '系统要求',
      mac: { title: 'computer', items: ['macOS 26 或更高', 'Apple 芯片（M 系列）'] },
      ios: { title: 'iPhone / iPad', items: ['iOS / iPadOS 26 或更高', 'iPhone 或 iPad 均可'] },
      note: '两台设备需要在同一个局域网里 —— 家里的 WiFi 就够了。',
    },
    privacy: {
      title: '纯本地，是真的',
      body: 'RemoteCrab 不跑服务器、不收集分析数据、不需要账号。视频、音频和按键只在你的 iPhone 与电脑之间传输，永远不离开局域网。',
      points: ['无云端、无账号、无订阅', '源码开放，可自行审计', '所有权限都能在系统设置里随时关闭'],
    },
    faq: {
      title: '常见问题',
      items: [
        { question: 'RemoteCrab 收费吗？', answer: '免费。没有内购，也没有订阅。' },
        {
          question: '为什么要安装「虚拟摄像头」？',
          answer:
            'macOS 只认系统级摄像头。RemoteCrab 会安装一个签名并经 Apple 公证的相机扩展，装好后任何 App 都能在摄像头列表里选到「RemoteCrab Camera」。',
        },
        {
          question: '需要联网吗？',
          answer: '不需要。两台设备在同一个 WiFi 里直连即可，数据不经过任何服务器。',
        },
        {
          question: '我的电脑能装吗？',
          answer: '需要 macOS 26 或更高的 Apple 芯片电脑。目前暂不支持 Intel电脑。',
        },
      ],
    },
    cta: {
      title: '今天就试试',
      body: '下载电脑端，再用 iPhone 装上 App，两台设备几秒就能连上。',
      download: '下载电脑版',
    },
  },
  en: {
    meta: {
      title: 'RemoteCrab — A second screen, camera, mic, trackpad and keyboard from your iPhone',
      description:
        'RemoteCrab turns your iPhone or iPad into a second display, camera, microphone, trackpad and keyboard for your computer over local WiFi — no cloud, no account, no subscription.',
    },
    nav: { back: '← Back to VGO' },
    hero: {
      badge: 'macOS desktop app · Free',
      tagline: 'Your iPhone is the peripheral your computer is missing',
      description:
        'Turn it into a second display, a camera, a microphone, a trackpad and a keyboard for your computer — extended screen, control from the sofa, camera and mic, all in one app. Over local WiFi. No cloud, no account, no subscription.',
      downloadMac: 'Download for computer',
      downloadIOS: 'Get the iPhone app',
      free: 'Free · No account · No subscription · Stays on your LAN',
      requirementsNote: 'Requires macOS 26+ (Apple silicon) and iOS 26+',
    },
  compatibility: {
    title: 'Context modes know 49 apps on your computer',
    body: 'Presentations, terminals, AI assistants, browsers, mail, meetings, Xcode — the buttons on your phone become that app’s set. Anything unlisted still gets the fallback set.',
    cta: 'See all 18 sets',
  },
    features: {
      title: 'One app, ten ways in',
      description:
        'You do not need a second monitor, a webcam, a microphone or a trackpad. The iPhone you already own is enough.',
      items: [
        {
          icon: 'bell',
          href: '/remotecrab/features/notifications/',
          title: 'Computer notifications on your phone',
          body: "Your computer's banners reach your iPhone — tap one and the computer jumps back to that app and window.",
        },
        {
          icon: 'display',
          href: '/remotecrab/features/extended-display/',
          title: 'A second screen',
          body: 'A real virtual display appears on your computer. Drag a window onto the iPhone and drive it with your fingers.',
        },
        {
          icon: 'mirror',
          href: '/remotecrab/features/screen-mirror/',
          title: 'Screen mirror and control',
          body: 'Pull any app window onto the phone, then tap, drag, scroll and pinch on it directly.',
        },
        {
          icon: 'camera',
          href: '/remotecrab/features/camera/',
          title: '1080p wireless camera',
          body: 'Your iPhone appears as a standard camera in Zoom, Teams, FaceTime and OBS — 1080p at 30fps, hardware H.264 encoding.',
        },
        {
          icon: 'mic',
          href: '/remotecrab/features/microphone/',
          title: 'Virtual microphone',
          body: 'A one-click, signed and notarized virtual mic driver makes your iPhone a system-wide wireless microphone.',
        },
        {
          icon: 'trackpad',
          href: '/remotecrab/features/trackpad/',
          title: 'Full trackpad',
          body: 'Drag, two-finger scroll, right-click, pinch, three-finger gestures and ⌃⌥⌘⇧ modifiers, with smooth acceleration and haptics.',
        },
        {
          icon: 'keyboard',
          href: '/remotecrab/features/keyboard/',
          title: 'System keyboard',
          body: 'Full IME and dictation work. Text lands at the computer cursor, and ⌘C / ⌘V / ⌘Z behave exactly as you expect.',
        },
        {
          icon: 'voice',
          href: '/remotecrab/features/voice/',
          title: 'Hold to talk',
          body: 'On-device speech recognition turns your voice straight into text on the computer — nothing is uploaded.',
        },
        {
          icon: 'files',
          href: '/remotecrab/features/transfer/',
          title: 'AirDrop-style file transfer',
          body: 'Send photos and files straight to your computer. They land in Downloads and reveal in Finder.',
        },
        {
          icon: 'clipboard',
          href: '/remotecrab/features/transfer/',
          title: 'Shared clipboard',
          body: 'Send the clipboard either way with one tap — copy on one device, paste on the other.',
        },
        {
          icon: 'appSwitcher',
          href: '/remotecrab/features/app-switcher/',
          title: 'App switcher',
          body: 'Tap an app on your iPhone and bring it to the front on your computer.',
        },
      ],
    },
    steps: {
      title: 'Up and running in four steps',
      description: 'From download to connected usually takes under two minutes.',
      items: [
        { title: 'Get the desktop app', body: 'Download RemoteCrab.dmg, drag it into Applications and open it.' },
        { title: 'Get the iPhone app', body: 'Download RemoteCrab from the App Store, and put both devices on the same WiFi.' },
        {
          title: 'Grant permissions',
          body: 'Enable Accessibility, the virtual camera and the virtual microphone — each can be turned off again in System Settings.',
        },
        {
          title: 'Tap once to pair',
          body: 'They find each other over Bonjour. Pair once and it is remembered, so next time it just connects.',
        },
      ],
    },
    requirements: {
      title: 'Requirements',
      mac: { title: 'computer', items: ['macOS 26 or later', 'Apple silicon (M-series)'] },
      ios: { title: 'iPhone / iPad', items: ['iOS / iPadOS 26 or later', 'iPhone or iPad'] },
      note: 'Both devices must be on the same local network — a home WiFi router is enough.',
    },
    privacy: {
      title: 'Local-first, for real',
      body: 'RemoteCrab runs no servers, collects no analytics and needs no account. Video, audio and keystrokes travel only between your iPhone and your computer — never off your local network.',
      points: ['No cloud, no account, no subscription', 'Open source and auditable', 'Every permission can be revoked in System Settings'],
    },
    faq: {
      title: 'FAQ',
      items: [
        { question: 'Is RemoteCrab free?', answer: 'Yes. There are no in-app purchases and no subscription.' },
        {
          question: 'Why does it install a "virtual camera"?',
          answer:
            'macOS only trusts system-level cameras. RemoteCrab installs a signed and notarized camera extension, after which any app can pick "RemoteCrab Camera" from its camera list.',
        },
        {
          question: 'Does it need the internet?',
          answer: 'No. The two devices talk directly over your local WiFi; nothing goes through a server.',
        },
        {
          question: 'Will it run on my computer?',
          answer: 'It needs an Apple-silicon computer on macOS 26 or later. Intel computers are not supported yet.',
        },
      ],
    },
    cta: {
      title: 'Try it today',
      body: 'Download the desktop app, install the iPhone app, and the two connect in seconds.',
      download: 'Download for computer',
    },
  },
}
