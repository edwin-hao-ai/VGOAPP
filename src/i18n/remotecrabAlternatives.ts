import type { Language } from './translations'

/**
 * /remotecrab/alternatives/ —— 只服务搜索意图的一页。
 *
 * 首页不出现任何竞品名（用户明确要求：不像在替别人宣传）；这一页是反过来
 * 的：它只对「已经在搜这个」的人存在，从页脚链过去。所以这里可以、也必须
 * 把那些词写清楚，否则搜不到。
 */

export interface AltOption {
  name: string
  who: string
  good: string[]
  cost: string[]
  tone: 'neutral' | 'ours'
}

export interface AltContent {
  meta: { title: string; description: string }
  nav: { back: string }
  hero: { kicker: string; title: string; lead: string }
  options: AltOption[]
  table: {
    title: string
    columns: string[]
    rows: { label: string; values: [string, string, string] }[]
  }
  faq: { title: string; items: { q: string; a: string }[] }
  cta: { title: string; body: string; download: string; ios: string }
}

const zh: AltContent = {
  meta: {
    title: 'iPhone 当摄像头、当副屏：几种做法对比 — RemoteCrab',
    description:
      '把手上的 iPhone 变成电脑的摄像头、第二块屏幕、触控板和键盘，有几种做法：系统自带的方式、只管摄像头的 App、远程桌面，以及 RemoteCrab。按「你真正要什么」逐条对比。',
  },
  nav: { back: '← 返回 RemoteCrab' },
  hero: {
    kicker: '选型',
    title: 'iPhone 当摄像头、当副屏：几种做法，和各自适合谁',
    lead: '你要的东西很简单 —— 开会时有颗像样的摄像头，或者多一块屏。做法有几种，代价不一样。下面按「谁会用到」排，不按谁更厉害排。',
  },
  options: [
    {
      name: '系统自带的方式',
      who: 'Mac，而且 iPhone 和它用同一个 Apple ID。',
      good: ['零安装：靠近就能用', '在会议软件里直接选得到', '不花钱'],
      cost: [
        '只在 Mac 上，Windows 完全没有',
        '只覆盖摄像头和麦克风',
        '要当触控板、键盘、第二块屏得另外想办法',
        '不在同一个网络就用不了',
      ],
      tone: 'neutral',
    },
    {
      name: '只管摄像头的 App',
      who: '只需要一颗摄像头的人。',
      good: ['专门做这一件事，参数多', '部分支持 Windows'],
      cost: [
        '通常按年订阅',
        '副屏、触控板、通知、远程是另外几套（和另外几笔钱）',
        '多数不支持中文输入法直接打到电脑',
      ],
      tone: 'neutral',
    },
    {
      name: '远程桌面',
      who: '要从外面完整操作公司电脑的人。',
      good: ['能看到并操作整台远端电脑', '文件、窗口都在'],
      cost: ['画面延迟明显', '分辨率跟着对方屏幕走', '当摄像头用不合适'],
      tone: 'neutral',
    },
    {
      name: 'RemoteCrab',
      who: '一台手机要当整套外设的人，Mac 和 Windows 都要用的人。',
      good: [
        '摄像头、麦克风、第二块屏、触控板、键盘、通知、AI，一套齐',
        '局域网里免费，不注册、不上传',
        'Mac 和 Windows 都支持',
      ],
      cost: [
        'Mac 端要 macOS 26 或更新、M1 及以后',
        '要装相机扩展并授权（这是 macOS 唯一的方式）',
        '远程访问是订阅（$3.99/月）',
      ],
      tone: 'ours',
    },
  ],
  table: {
    title: '能力对照',
    columns: ['系统自带', '摄像头 App', 'RemoteCrab'],
    rows: [
      { label: '当摄像头', values: ['有，仅 Mac', '有', '有，Mac 与 Windows'] },
      { label: '当第二块屏', values: ['要 iPad', '一般没有', 'iPhone 和 iPad 都行'] },
      { label: '触控板与键盘', values: ['没有', '没有', '有，含中文输入法'] },
      { label: '电脑通知到手机', values: ['没有', '没有', '有'] },
      { label: 'Windows 电脑', values: ['不支持', '部分支持', '支持'] },
      { label: '不在同一网络', values: ['不支持', '一般不支持', '支持（订阅）'] },
      { label: '价格', values: ['免费', '多为年付订阅', '局域网免费'] },
    ],
  },
  faq: {
    title: '常见问题',
    items: [
      {
        q: 'iPhone 当摄像头，需要装驱动吗？',
        a: '在 Mac 上要给系统装一个相机部件，因为 macOS 只让系统级的摄像头出现在所有 App 的列表里。装完一次，以后在 Zoom、Teams、FaceTime、OBS 里都能选到。Windows 不需要装驱动。',
      },
      {
        q: 'Windows 能用 iPhone 当摄像头吗？',
        a: '能。RemoteCrab 的 Windows 端支持摄像头、第二块屏、触控板和键盘；虚拟麦克风目前在 Windows 上还没有。',
      },
      {
        q: 'iPad 能当第二块屏吗？',
        a: '能，而且更合适 —— 屏幕更大。RemoteCrab 把 iPad 注册成系统里一块真实的显示器，不是投屏。',
      },
      {
        q: '一定要同一个 Apple ID 吗？',
        a: 'RemoteCrab 不需要。它靠局域网里的配对码，不依赖 iCloud 或同一个账号 —— 公司的电脑、家人的电脑都能连。',
      },
    ],
  },
  cta: {
    title: '一条路能全带走',
    body: '下载电脑端，手机装上 App，同一个 WiFi 里就能用。',
    download: '下载 Mac 版',
    ios: 'App Store 下载',
  },
}

const en: AltContent = {
  meta: {
    title: 'iPhone as a webcam or second display: the options, compared — RemoteCrab',
    description:
      'Turning the iPhone you already own into a webcam, a second display, a trackpad and a keyboard: what ships with the system, camera-only apps, remote desktop, and RemoteCrab — compared by what you actually need.',
  },
  nav: { back: '← Back to RemoteCrab' },
  hero: {
    kicker: 'Choosing',
    title: 'iPhone as a webcam or second display: the options, and who each one suits',
    lead: 'What you want is simple — a decent camera for meetings, or one more screen. There are a few ways to get there, at different costs. Sorted by who needs it, not by who is best.',
  },
  options: [
    {
      name: 'What ships with the system',
      who: 'A Mac, with an iPhone on the same Apple ID.',
      good: ['Nothing to install — bring it close', 'Pick it in any meeting app', 'Free'],
      cost: [
        'Mac only; Windows gets nothing',
        'Covers the camera and microphone only',
        'No trackpad, keyboard or second display',
        'Does not work across networks',
      ],
      tone: 'neutral',
    },
    {
      name: 'Camera-only apps',
      who: 'People who only want a camera.',
      good: ['Purpose-built, lots of settings', 'Some support Windows'],
      cost: [
        'Usually a yearly subscription',
        'Second display, trackpad, notifications, remote are separate purchases',
        'Chinese input rarely reaches the computer',
      ],
      tone: 'neutral',
    },
    {
      name: 'Remote desktop',
      who: 'People who need to operate an office computer from outside.',
      good: ['See and drive the whole remote computer', 'Files and windows included'],
      cost: ['Visible latency', 'Resolution follows the other screen', 'A poor fit as a camera'],
      tone: 'neutral',
    },
    {
      name: 'RemoteCrab',
      who: 'People who want one phone as the whole peripheral set, on Mac and Windows.',
      good: [
        'Camera, mic, second display, trackpad, keyboard, notifications and AI in one app',
        'Free on your own Wi-Fi; no account, nothing uploaded',
        'Mac and Windows both',
      ],
      cost: [
        'Mac side needs macOS 26+ on M1 or newer',
        'A camera add-on and one permission (the only way macOS allows it)',
        'Remote access is a subscription ($3.99/month)',
      ],
      tone: 'ours',
    },
  ],
  table: {
    title: 'What each one does',
    columns: ['Built in', 'Camera apps', 'RemoteCrab'],
    rows: [
      { label: 'Webcam', values: ['Yes, Mac only', 'Yes', 'Yes, Mac and Windows'] },
      { label: 'Second display', values: ['Needs an iPad', 'Rarely', 'iPhone and iPad'] },
      { label: 'Trackpad and keyboard', values: ['No', 'No', 'Yes, with Chinese IME'] },
      { label: 'Mac notifications on the phone', values: ['No', 'No', 'Yes'] },
      { label: 'Windows PC', values: ['No', 'Some', 'Yes'] },
      { label: 'Different networks', values: ['No', 'Rarely', 'Yes (subscription)'] },
      { label: 'Price', values: ['Free', 'Usually yearly', 'Free on your LAN'] },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'Does an iPhone need a driver to work as a webcam?',
        a: 'On a Mac, yes — a small camera component, because macOS only lets system-level cameras appear in every app. Install once, then Zoom, Teams, FaceTime and OBS all list it. On Windows there is no driver.',
      },
      {
        q: 'Can I use an iPhone as a webcam on Windows?',
        a: 'Yes. The Windows app supports camera, second display, trackpad and keyboard; the virtual microphone is not on Windows yet.',
      },
      {
        q: 'Can an iPad be the second display?',
        a: 'Yes, and it is the better fit — bigger screen. RemoteCrab registers it as a real display in the system, not a mirror.',
      },
      {
        q: 'Do both devices need the same Apple ID?',
        a: 'No. RemoteCrab pairs over your own network and does not depend on iCloud or a shared account — an office computer and a family computer both work.',
      },
    ],
  },
  cta: {
    title: 'One route takes all of it',
    body: 'Download the desktop app and the phone app; same Wi-Fi is all it needs.',
    download: 'Download for Mac',
    ios: 'Get the iPhone app',
  },
}

export const remotecrabAlternatives: Record<Language, AltContent> = { zh, en }
