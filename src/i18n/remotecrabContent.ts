import type { Language } from './translations'

export interface FeatureItem {
  icon: string
  title: string
  body: string
  /** Detail landing page, relative to the site root. */
  href: string
}

export interface SceneItem {
  icon: string
  shot: string
  title: string
  body: string
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
    downloadWindows: string
    downloadIOS: string
    testflight: string
    free: string
    requirementsNote: string
    /** 首屏新字段（2026-11-11 改版） */
    eyebrow: string
    titleLine1: string
    titleLine2: string
    appStore: string
    versionNote: string
    switchPlatform: string
    switchAction: string
    watchFull: string
    clipCaption: string
  }
  features: { title: string; description: string; items: FeatureItem[] }
  compatibility: { title: string; body: string; cta: string }
  scenes: { title: string; description: string; items: SceneItem[] }
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
        'RemoteCrab 把你的 iPhone / iPad 变成电脑的第二块屏幕、摄像头、麦克风、触控板和键盘 —— 本地 WiFi 直连，免费且完整;不在同一网络时，远程访问是可选订阅。',
    },
    nav: { back: '← 返回 VGO' },
    hero: {
      badge: 'Mac · Windows · iPhone · iPad',
      tagline: '你的 iPhone，就是电脑缺失的外设',
      description:
        '摄像头、麦克风、第二块屏、触控板、键盘 —— 用你手上的 iPhone 或 iPad，同一个 WiFi 里就能用。不注册、不上传、不用买外设。',
      downloadMac: '下载 Mac 版',
      downloadWindows: '下载 Windows 版',
      downloadIOS: 'App Store（iPhone / iPad）',
      testflight: 'TestFlight 公测',
      free: '局域网免费完整 · 无账号 · 远程访问可选订阅',
      requirementsNote: 'macOS 26 或更新 · M1 及以后 · iOS / iPadOS 17 或更新',
      eyebrow: 'Mac · Windows · iPhone · iPad',
      titleLine1: '一部手机，',
      titleLine2: '补全你的电脑',
      appStore: 'App Store（iPhone / iPad）',
      versionNote: '版本 1.4.0 · 14 MB · 2026-11-12',
      switchPlatform: '这台电脑是 Windows？',
      switchAction: '换成 Windows 版',
      watchFull: '完整版 34 秒 · 有声',
      clipCaption: '现场实拍',
    },
  compatibility: {
    title: '情景模式认识你电脑上的 49 个应用',
    body: '演示、终端、AI 助手、浏览器、邮件、会议、Xcode…… 你在哪个 App 里，手机上的按键就换成哪一套。没收录的应用也有兜底按键。',
    cta: '看看全部 18 套',
  },
  scenes: {
    title: '人在哪，电脑的控制权就在哪',
    description: '一台手机，一个连接 —— 这几个是用户最高频的四个。',
    items: [
      {
        icon: 'mirror',
        shot: '08-mirror',
        title: '躺在沙发上照顾电脑',
        body: '电脑画面跟到手 —— 划一下就滚，按住就能拖，点一下就是点。不用挪窝。',
        href: '/remotecrab/features/screen-mirror/',
      },
      {
        icon: 'speaker',
        shot: '05-sound',
        title: '午休，把电脑声音搬过来',
        body: '电脑上播的剧和歌，从手机外放响出来;戴上耳机一整天不如让手机当音箱。',
        href: '/remotecrab/features/speaker/',
      },
      {
        icon: 'ai',
        shot: '02-agent',
        title: '等 agent 跑完',
        body: '长任务让它自己跑;它要动命令时，确认卡弹到手机 —— 你看完再批，不批不放。',
        href: '/remotecrab/features/ai/',
      },
      {
        icon: 'camera',
        shot: '04-camera',
        title: '会议室，手机一波流',
        body: '手机当高清摄像头和麦克风;静音、翻页、调音量，顺手在手机上全处理掉。',
        href: '/remotecrab/features/automation/',
      },
    ],
  },
    features: {
      title: '一个 App，十四种用法',
      description: '不用买副屏、摄像头、麦克风或触控板 —— 你本来就有的 iPhone 就够了。',
      items: [
        {
          icon: 'globe',
          href: '/remotecrab/features/remote-access/',
          title: '远程访问（订阅）',
          body: '不在同一网络也能用自己的电脑:点对点优先，中继兜底，全程端到端加密。',
        },
        {
          icon: 'ai',
          href: '/remotecrab/features/ai/',
          title: '问 AI',
          body: '手机上进 AI 对话，问电脑前的事 —— AI 看得见屏幕和剪贴板，答案可以一键落到电脑光标处。',
        },
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
          body: '电脑上多出一块真实的虚拟显示器，把窗口拖到 iPhone 上，再用手指直接操作它。',
        },
        {
          icon: 'mirror',
          href: '/remotecrab/features/screen-mirror/',
          title: '屏幕镜像与操控',
          body: '把电脑上任意一个 App 窗口搬到手机，点按、拖拽、滚动、捏合都能直接操作。',
        },
        {
          icon: 'camera',
          href: '/remotecrab/features/camera/',
          title: '无线摄像头',
          body: '作为标准摄像头出现在 Zoom、Teams、FaceTime、OBS 里；采集端最高支持 4K，对外以兼容性最好的 1080p 30fps 输出。',
        },
        {
          icon: 'mic',
          href: '/remotecrab/features/microphone/',
          title: '虚拟麦克风',
          body: '一键安装签名并经 Apple 公证的虚拟麦克风驱动，iPhone 立刻变成全系统可用的无线麦克风。',
        },
        {
          icon: 'speaker',
          href: '/remotecrab/features/speaker/',
          title: '扬声器模式',
          body: '电脑上播的剧、歌和会议声音，直接从手机的外放音响里响 —— 开关一点就切换。',
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
      ios: { title: 'iPhone / iPad', items: ['iOS / iPadOS 17 或更高', 'iPhone 或 iPad 均可'] },
      note: '两台设备在同一个局域网里直连即可;订阅远程访问后，不同网络也能连。',
    },
    privacy: {
      title: '纯本地，是真的',
      body: 'RemoteCrab 不需要账号、不收集分析数据。同一局域网内，视频、音频和按键只在你的 iPhone 与电脑之间传输，不经过任何服务器;远程访问经会合与中继连接，但只转发端到端加密后的字节 —— 服务器看不到，也存不下你的画面、声音和按键。',
      points: ['局域网免费完整，无账号', '远程访问端到端加密，服务器不可见', '源码开放，可自行审计', '所有权限都能在系统设置里随时关闭'],
    },
    faq: {
      title: '常见问题',
      items: [
        { question: 'RemoteCrab 收费吗？', answer: '同一个 WiFi 里的全部功能永久免费，没有广告、没有内购。离开局域网使用电脑是可选订阅:$3.99/月或 $29.99/年，随时可在系统设置里取消。' },
        {
          question: '为什么装的时候要授权好几次？',
          answer:
            '因为你要让它出现在「所有 App」里 —— 摄像头列表、麦克风列表、鼠标和键盘。这些位置 Apple 只留给系统自己安装的部件，所以每一样都要单独装、单独允许。每一项都能在系统设置里随手关掉。',
        },
        {
          question: '需要联网吗？',
          answer: '同一 WiFi 直连即可，数据不经过任何服务器。不在同一网络时，订阅远程访问后也能连 —— 依然是端到端加密。',
        },
        {
          question: '我的电脑能装吗？',
          answer: 'Mac 端需要 macOS 26 或更新，而且得是 M1 及以后的 Mac；Intel 的 Mac 暂时不支持。Windows 端支持 Windows 10 / 11，功能与 Mac 版基本相同，但虚拟麦克风还没做。iPhone / iPad 端需要 iOS / iPadOS 17 或更新。',
        },
        {
          question: 'iPad 也能用吗？',
          answer: '能。iPad 可以当第二块屏、摄像头、麦克风、触控板和键盘，也可以当远程访问的那一端。App Store 上是同一个 App，装一次就行。',
        },
      ],
    },
    cta: {
      title: '今天就试试',
      body: '下载电脑端，再用 iPhone 装上 App，两台设备几秒就能连上。',
      download: '下载 Mac 版',
    },
  },
  en: {
    meta: {
      title: 'RemoteCrab — A second screen, camera, mic, trackpad and keyboard from your iPhone',
      description:
        'RemoteCrab turns your iPhone or iPad into a second display, camera, microphone, trackpad and keyboard for your computer over local WiFi — free and complete on your LAN, with an optional remote-access subscription when you are away from it.',
    },
    nav: { back: '← Back to VGO' },
    hero: {
      badge: 'Mac · Windows · iPhone · iPad',
      tagline: 'Your iPhone is the peripheral your computer is missing',
      description:
        'Camera, mic, second display, trackpad, keyboard — from the iPhone or iPad you already own, on your own Wi-Fi. No account, no cloud, no extra hardware.',
      downloadMac: 'Download for Mac',
      downloadWindows: 'Download for Windows',
      downloadIOS: 'App Store (iPhone / iPad)',
      testflight: 'TestFlight beta',
      free: 'Free and complete on your Wi-Fi · No account · Remote access is optional',
      requirementsNote: 'macOS 26+ · M1 or later · iOS / iPadOS 17+',
      eyebrow: 'Mac · Windows · iPhone · iPad',
      titleLine1: 'One phone completes',
      titleLine2: 'your computer.',
      appStore: 'App Store (iPhone / iPad)',
      versionNote: 'Version 1.4.0 · 14 MB · Nov 12, 2026',
      switchPlatform: 'On Windows instead?',
      switchAction: 'Get the Windows build',
      watchFull: 'Full 34s · with sound',
      clipCaption: 'Real footage',
    },
  compatibility: {
    title: 'Context modes know 49 apps on your computer',
    body: 'Presentations, terminals, AI assistants, browsers, mail, meetings, Xcode — the buttons on your phone become that app’s set. Anything unlisted still gets the fallback set.',
    cta: 'See all 18 sets',
  },
  scenes: {
    title: 'Wherever you are, the controls follow',
    description: 'One phone, one link — these are the four scenes people reach for most.',
    items: [
      {
        icon: 'mirror',
        shot: '08-mirror',
        title: 'Mind the computer from the couch',
        body: 'The screen follows you — swipe to scroll, press and move to drag, tap to click. No getting up.',
        href: '/remotecrab/features/screen-mirror/',
      },
      {
        icon: 'speaker',
        shot: '05-sound',
        title: 'Lunch break, move the sound over',
        body: 'The show and the music playing on the computer sound from the phone — better than headphones all afternoon.',
        href: '/remotecrab/features/speaker/',
      },
      {
        icon: 'ai',
        shot: '02-agent',
        title: 'Waiting on an agent',
        body: 'Let the long task run; when it wants to act, an approval card lands on your phone — you read it, then decide.',
        href: '/remotecrab/features/ai/',
      },
      {
        icon: 'camera',
        shot: '04-camera',
        title: 'The meeting, in one flow',
        body: 'The phone is the HD camera and the mic; mute, page turns and volume all happen from the phone.',
        href: '/remotecrab/features/automation/',
      },
    ],
  },
    features: {
      title: 'One app, fourteen ways in',
      description:
        'You do not need a second monitor, a webcam, a microphone or a trackpad. The iPhone you already own is enough.',
      items: [
        {
          icon: 'globe',
          href: '/remotecrab/features/remote-access/',
          title: 'Remote access (subscription)',
          body: 'Use your computer from any network: peer-to-peer first, relay as fallback, end-to-end encrypted all the way.',
        },
        {
          icon: 'ai',
          href: '/remotecrab/features/ai/',
          title: 'Ask AI',
          body: 'An AI chat on the phone about what is on your computer — it sees the screen and clipboard, and answers can land at the cursor.',
        },
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
          title: 'Wireless camera',
          body: 'Your iPhone appears as a standard camera in Zoom, Teams, FaceTime and OBS — up to 4K capture, output at 1080p 30fps for the widest compatibility.',
        },
        {
          icon: 'mic',
          href: '/remotecrab/features/microphone/',
          title: 'Virtual microphone',
          body: 'A one-click, signed and notarized virtual mic driver makes your iPhone a system-wide wireless microphone.',
        },
        {
          icon: 'speaker',
          href: '/remotecrab/features/speaker/',
          title: 'Speaker mode',
          body: "Whatever plays on the computer — shows, music, meeting audio — sounds from the phone's own speaker. One toggle to switch.",
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
      ios: { title: 'iPhone / iPad', items: ['iOS / iPadOS 17 or later', 'iPhone or iPad'] },
      note: 'Both devices connect directly on the same local network; with the remote-access subscription they connect across networks too.',
    },
    privacy: {
      title: 'Local-first, for real',
      body: 'RemoteCrab needs no account and collects no analytics. On the same local network, video, audio and keystrokes travel only between your iPhone and your computer — no server in the path. Remote access connects through the rendezvous and relay, which forward only end-to-end encrypted bytes: they cannot see, and do not store, your screen, sound or keystrokes.',
      points: ['Free and complete on your LAN, no account', 'Remote access is end-to-end encrypted — servers cannot see it', 'Open source and auditable', 'Every permission can be revoked in System Settings'],
    },
    faq: {
      title: 'FAQ',
      items: [
        { question: 'Is RemoteCrab free?', answer: 'Everything on your local WiFi is free forever — no ads, no in-app purchases. Using your computer from another network is an optional subscription: $3.99/month or $29.99/year, cancellable anytime in Settings.' },
        {
          question: 'Why does installing ask for permission several times?',
          answer:
            'Because it has to work everywhere: every app’s camera menu, its mic menu, and the pointer and keyboard. macOS only lets system-installed pieces do that, so each one is a separate install and a separate yes. Each can be switched off in System Settings later.',
        },
        {
          question: 'Does it need the internet?',
          answer: 'No. The two devices talk directly over your local WiFi; nothing goes through a server. On a different network, the remote-access subscription connects you — still end-to-end encrypted.',
        },
        {
          question: 'Will it run on my computer?',
          answer: 'The Mac app needs macOS 26 or later on M1 or newer; Intel Macs are not supported yet. The Windows app runs on Windows 10 / 11 with nearly all the same features, except the virtual microphone. The iPhone / iPad app needs iOS / iPadOS 17 or later.',
        },
        {
          question: 'Does it work with an iPad?',
          answer: 'Yes. An iPad can be the second display, camera, mic, trackpad and keyboard, and the remote end too. It is the same App Store app — install once.',
        },
      ],
    },
    cta: {
      title: 'Try it today',
      body: 'Download the desktop app, install the iPhone app, and the two connect in seconds.',
      download: 'Download for Mac',
    },
  },
}
