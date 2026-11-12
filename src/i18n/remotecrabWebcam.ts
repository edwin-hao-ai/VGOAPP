import type { Language } from './translations'

/**
 * /remotecrab/webcam/ —— 专门吃「用 iPhone 当摄像头」这个搜索意图的一页。
 *
 * 首页讲的是「一部手机补全电脑」，是品类宣言；这一页讲的是**一个具体需求**：
 * 我需要一个摄像头，手上有一台 iPhone。所以这里的标题、步骤、FAQ 全部围着
 * 「摄像头」写，不铺开副屏/通知/AI。
 */

export interface WebcamContent {
  meta: { title: string; description: string }
  hero: {
    kicker: string
    title: string
    lead: string
    bullets: string[]
    ctaPrimary: string
    ctaSecondary: string
  }
  steps: { title: string; items: { num: string; title: string; body: string }[] }
  why: { title: string; lead: string; items: { title: string; body: string }[] }
  apps: { title: string; lead: string; list: string[] }
  faq: { title: string; items: { q: string; a: string }[] }
  cta: { title: string; body: string; download: string; ios: string }
}

const zh: WebcamContent = {
  meta: {
    title: '用 iPhone 当摄像头：Mac 和 Windows 都行 — RemoteCrab',
    description:
      '不用再买摄像头。让 iPhone 出现在 Zoom、Teams、Meet、OBS 的摄像头列表里，1080p 30 帧；Mac 和 Windows 都能用，旧 iPhone 也行。',
  },
  hero: {
    kicker: 'iPhone 当摄像头',
    title: '用 iPhone 当摄像头，不用再买一个',
    lead: '你手上或者抽屉里那台 iPhone，画质比大多数笔记本自带的摄像头好。装一次，它就会出现在所有会议软件的摄像头列表里。',
    bullets: [
      'Zoom、Teams、Meet、FaceTime、OBS 里直接选得到',
      '输出 1080p 30 帧，采集最高 4K',
      'Mac 和 Windows 都能用，旧 iPhone 也行',
    ],
    ctaPrimary: '下载电脑端',
    ctaSecondary: 'App Store（iPhone / iPad）',
  },
  steps: {
    title: '三步，两分钟',
    items: [
      { num: '1', title: '电脑上装一次', body: '下载 dmg 或 msi，打开。第一次会问一次权限，点允许就行 —— 系统级摄像头只能这样装。' },
      { num: '2', title: '手机上装 App', body: 'App Store 装 RemoteCrab，和电脑连同一个 WiFi，点一下配对。' },
      { num: '3', title: '在会议软件里选它', body: '打开 Zoom / Teams / Meet / OBS，摄像头列表里选「RemoteCrab Camera」。就这么简单。' },
    ],
  },
  why: {
    title: '为什么比再买一个强',
    lead: '不是因为便宜，是因为你已经在用的那台设备，传感器比大多数外接摄像头好。',
    items: [
      { title: '画质', body: '手机的主摄本来就比百元级摄像头强。输出固定 1080p 30 帧 —— 会议软件不会因为编码参数挑食。' },
      { title: '摆位', body: '手机架在哪儿，画面就从哪儿拍。拍白板、拍桌面、当第二机位，比夹在屏幕上的摄像头自由得多。' },
      { title: '不用多带一件东西', body: '出差、换工位、临时开会，你本来就会带手机。' },
    ],
  },
  apps: {
    title: '哪些软件能用',
    lead: '只要那个软件能选摄像头，就能选到它。常用的这些：',
    list: ['Zoom', 'Microsoft Teams', 'Google Meet', 'FaceTime', 'OBS', '腾讯会议', '飞书', '微信'],
  },
  faq: {
    title: '常见问题',
    items: [
      {
        q: '需要装驱动吗？',
        a: 'Mac 上要装一个小部件：macOS 只让系统级的摄像头出现在所有 App 的列表里，这是唯一的方式。装一次，以后所有软件都能选到。Windows 不需要驱动。',
      },
      {
        q: 'Windows 电脑能用吗？',
        a: '能。Windows 端支持摄像头、副屏、触控板和键盘；虚拟麦克风目前在 Windows 上还没有。',
      },
      {
        q: '旧 iPhone 行不行？',
        a: '需要 iOS / iPadOS 17 或更新，也就是 iPhone XS（2018）及以后。更老的机型跑不了这个系统版本，装不上 App —— 这一点我们没法绕过。',
      },
      {
        q: '麦克风也能一起用吗？',
        a: '能。虚拟麦克风装好之后，Zoom、Teams、录音软件里都能选到「RemoteCrab Microphone」。麦克风和摄像头是两个独立开关。',
      },
      {
        q: '电脑需要什么系统？',
        a: 'Mac 端需要 macOS 26 或更新、M1 及以后的芯片；Windows 端支持 Windows 10 / 11。',
      },
    ],
  },
  cta: { title: '今晚就能用上', body: '下载电脑端，手机上装 App，同一个 WiFi。', download: '下载 Mac 版', ios: 'App Store（iPhone / iPad）' },
}

const en: WebcamContent = {
  meta: {
    title: 'Use your iPhone as a webcam, on Mac and Windows — RemoteCrab',
    description:
      'Stop buying webcams. Put the iPhone you already own in Zoom, Teams, Meet and OBS at 1080p30. Works on Mac and Windows, old phones included.',
  },
  hero: {
    kicker: 'iPhone as a webcam',
    title: 'Use your iPhone as a webcam. Don’t buy another one.',
    lead: 'The phone in your pocket or your drawer has a better sensor than most laptop cameras. Install once and it shows up in every meeting app’s camera menu.',
    bullets: [
      'Pick it directly in Zoom, Teams, Meet, FaceTime and OBS',
      '1080p30 out, up to 4K capture',
      'Mac and Windows, older iPhones included',
    ],
    ctaPrimary: 'Download the desktop app',
    ctaSecondary: 'App Store (iPhone / iPad)',
  },
  steps: {
    title: 'Three steps, two minutes',
    items: [
      { num: '1', title: 'Install on the computer', body: 'Download the dmg or msi and open it. macOS asks once for permission — that is the only way a system-level camera can exist.' },
      { num: '2', title: 'Install the phone app', body: 'Get RemoteCrab on the App Store, put both on the same Wi-Fi, tap once to pair.' },
      { num: '3', title: 'Pick it in your meeting app', body: 'Open Zoom, Teams, Meet or OBS and choose “RemoteCrab Camera” from the camera menu.' },
    ],
  },
  why: {
    title: 'Why this beats another camera',
    lead: 'Not because it is cheaper, but because the device you already carry has a better sensor than most add-on webcams.',
    items: [
      { title: 'Image quality', body: 'A phone’s main camera beats a cheap webcam. Output is a fixed 1080p30, so meeting apps never choke on the encoding.' },
      { title: 'Placement', body: 'Wherever you put the phone is where the picture comes from. A whiteboard, a desk, a second angle — freer than a clip on the lid.' },
      { title: 'One less thing to carry', body: 'Travel, a hot desk, a last-minute call: you were bringing the phone anyway.' },
    ],
  },
  apps: {
    title: 'What works with it',
    lead: 'Anything that lets you pick a camera can pick this one. The usual suspects:',
    list: ['Zoom', 'Microsoft Teams', 'Google Meet', 'FaceTime', 'OBS', 'Whereby', 'Slack huddles', 'Discord'],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'Does it need a driver?',
        a: 'On a Mac, yes: a small component, because macOS only lets system-level cameras appear in every app. Install once and every app can pick it. On Windows there is no driver.',
      },
      {
        q: 'Does it work on Windows?',
        a: 'Yes. The Windows app supports camera, second display, trackpad and keyboard; the virtual microphone is not on Windows yet.',
      },
      {
        q: 'Will an old iPhone work?',
        a: 'It needs iOS or iPadOS 17 or later, which means iPhone XS (2018) and newer. Older phones cannot run that version and cannot install the app. We cannot work around that.',
      },
      {
        q: 'Can I use the mic as well?',
        a: 'Yes. After the virtual microphone is installed, Zoom, Teams and recorders can pick “RemoteCrab Microphone”. Camera and mic are separate switches.',
      },
      {
        q: 'What does the computer need?',
        a: 'The Mac app needs macOS 26 or later on M1 or newer; the Windows app runs on Windows 10 / 11.',
      },
    ],
  },
  cta: { title: 'Working tonight', body: 'Download the desktop app, install the phone app, same Wi-Fi.', download: 'Download for Mac', ios: 'App Store (iPhone / iPad)' },
}

export const remotecrabWebcam: Record<Language, WebcamContent> = { zh, en }
