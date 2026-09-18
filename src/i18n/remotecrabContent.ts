import type { Language } from './translations'

export interface FeatureItem {
  icon: string
  title: string
  body: string
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
      title: 'RemoteCrab — 把 iPhone 变成 Mac 的摄像头、麦克风、触控板和键盘',
      description:
        'RemoteCrab 把你的 iPhone / iPad 变成 Mac 的摄像头、麦克风、触控板和键盘，通过本地 WiFi 直连，无云端、无账号、无订阅。',
    },
    nav: { back: '← 返回 VGO' },
    hero: {
      badge: 'macOS 桌面端 · 免费',
      tagline: '你的 iPhone，就是 Mac 缺失的外设',
      description:
        '把 iPhone / iPad 变成 Mac 的摄像头、麦克风、触控板和键盘 —— 通过本地 WiFi 直连。没有云端、没有账号、没有订阅，数据永远不出局域网。',
      downloadMac: '下载 Mac 版',
      downloadIOS: 'App Store 下载 iPhone 版',
      free: '免费 · 无账号 · 无订阅 · 数据不出局域网',
      requirementsNote: '需要 macOS 26+（Apple 芯片）与 iOS 26+',
    },
    features: {
      title: '一个 App，四件外设',
      description: '不用买摄像头、麦克风或触控板，你口袋里的 iPhone 就够了。',
      items: [
        {
          icon: 'camera',
          title: '1080p 无线摄像头',
          body: 'iPhone 的镜头在 Zoom、Teams、FaceTime、OBS 里作为标准摄像头出现，1080p 30fps，硬件 H.264 编码。',
        },
        {
          icon: 'mic',
          title: '虚拟麦克风',
          body: '一键安装签名并经 Apple 公证的虚拟麦克风驱动，iPhone 立刻变成全系统可用的无线麦克风。',
        },
        {
          icon: 'trackpad',
          title: '全功能触控板',
          body: '拖动、双指滚动、右键、缩放、三指手势、⌃⌥⌘⇧ 修饰键，带顺滑的加速曲线与触觉反馈。',
        },
        {
          icon: 'keyboard',
          title: '系统输入法键盘',
          body: '中文输入法与听写都能用；文字直接出现在 Mac 光标处，⌘C / ⌘V / ⌘Z 照常工作。',
        },
        {
          icon: 'voice',
          title: '按住说话',
          body: '端侧语音识别，把你说的话直接变成 Mac 上的文字，无需上传云端。',
        },
        {
          icon: 'files',
          title: 'AirDrop 式传文件',
          body: '照片和文件直发 Mac，自动存入下载文件夹并在 Finder 中高亮显示。',
        },
        {
          icon: 'clipboard',
          title: '剪贴板互通',
          body: '两端剪贴板一键互发，复制粘贴跨设备无缝衔接。',
        },
        {
          icon: 'appSwitcher',
          title: '应用切换器',
          body: '在 iPhone 上点一下，Mac 上对应的 App 立即置前。',
        },
      ],
    },
    steps: {
      title: '四步就能用上',
      description: '从下载到连上，通常不到两分钟。',
      items: [
        { title: '下载 Mac 端', body: '下载 RemoteCrab.dmg，拖进「应用程序」并打开。' },
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
      mac: { title: 'Mac', items: ['macOS 26 或更高', 'Apple 芯片（M 系列）'] },
      ios: { title: 'iPhone / iPad', items: ['iOS / iPadOS 26 或更高', 'iPhone 或 iPad 均可'] },
      note: '两台设备需要在同一个局域网里 —— 家里的 WiFi 就够了。',
    },
    privacy: {
      title: '纯本地，是真的',
      body: 'RemoteCrab 不跑服务器、不收集分析数据、不需要账号。视频、音频和按键只在你的 iPhone 与 Mac 之间传输，永远不离开局域网。',
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
          question: '我的 Mac 能装吗？',
          answer: '需要 macOS 26 或更高的 Apple 芯片 Mac。目前暂不支持 Intel Mac。',
        },
      ],
    },
    cta: {
      title: '今天就试试',
      body: '下载 Mac 端，再用 iPhone 装上 App，两台设备几秒就能连上。',
      download: '下载 Mac 版',
    },
  },
  en: {
    meta: {
      title: 'RemoteCrab — Turn your iPhone into a camera, mic, trackpad and keyboard for your Mac',
      description:
        'RemoteCrab turns your iPhone or iPad into a camera, microphone, trackpad and keyboard for your Mac over local WiFi — no cloud, no account, no subscription.',
    },
    nav: { back: '← Back to VGO' },
    hero: {
      badge: 'macOS desktop app · Free',
      tagline: 'Your iPhone is the peripheral your Mac is missing',
      description:
        'Turn your iPhone or iPad into a camera, microphone, trackpad and keyboard for your Mac — over local WiFi. No cloud, no account, no subscription. Your data never leaves your network.',
      downloadMac: 'Download for Mac',
      downloadIOS: 'Get the iPhone app',
      free: 'Free · No account · No subscription · Stays on your LAN',
      requirementsNote: 'Requires macOS 26+ (Apple silicon) and iOS 26+',
    },
    features: {
      title: 'One app, four peripherals',
      description: "You don't need a webcam, a microphone or a trackpad. The iPhone in your pocket is enough.",
      items: [
        {
          icon: 'camera',
          title: '1080p wireless camera',
          body: 'Your iPhone appears as a standard camera in Zoom, Teams, FaceTime and OBS — 1080p at 30fps, hardware H.264 encoding.',
        },
        {
          icon: 'mic',
          title: 'Virtual microphone',
          body: 'A one-click, signed and notarized virtual mic driver makes your iPhone a system-wide wireless microphone.',
        },
        {
          icon: 'trackpad',
          title: 'Full trackpad',
          body: 'Drag, two-finger scroll, right-click, pinch, three-finger gestures and ⌃⌥⌘⇧ modifiers, with smooth acceleration and haptics.',
        },
        {
          icon: 'keyboard',
          title: 'System keyboard',
          body: 'Full IME and dictation work. Text lands at the Mac cursor, and ⌘C / ⌘V / ⌘Z behave exactly as you expect.',
        },
        {
          icon: 'voice',
          title: 'Hold to talk',
          body: 'On-device speech recognition turns your voice straight into text on the Mac — nothing is uploaded.',
        },
        {
          icon: 'files',
          title: 'AirDrop-style file transfer',
          body: 'Send photos and files straight to your Mac. They land in Downloads and reveal in Finder.',
        },
        {
          icon: 'clipboard',
          title: 'Shared clipboard',
          body: 'Send the clipboard either way with one tap — copy on one device, paste on the other.',
        },
        {
          icon: 'appSwitcher',
          title: 'App switcher',
          body: 'Tap an app on your iPhone and bring it to the front on your Mac.',
        },
      ],
    },
    steps: {
      title: 'Up and running in four steps',
      description: 'From download to connected usually takes under two minutes.',
      items: [
        { title: 'Get the Mac app', body: 'Download RemoteCrab.dmg, drag it into Applications and open it.' },
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
      mac: { title: 'Mac', items: ['macOS 26 or later', 'Apple silicon (M-series)'] },
      ios: { title: 'iPhone / iPad', items: ['iOS / iPadOS 26 or later', 'iPhone or iPad'] },
      note: 'Both devices must be on the same local network — a home WiFi router is enough.',
    },
    privacy: {
      title: 'Local-first, for real',
      body: 'RemoteCrab runs no servers, collects no analytics and needs no account. Video, audio and keystrokes travel only between your iPhone and your Mac — never off your local network.',
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
          question: 'Will it run on my Mac?',
          answer: 'It needs an Apple-silicon Mac on macOS 26 or later. Intel Macs are not supported yet.',
        },
      ],
    },
    cta: {
      title: 'Try it today',
      body: 'Download the Mac app, install the iPhone app, and the two connect in seconds.',
      download: 'Download for Mac',
    },
  },
}
