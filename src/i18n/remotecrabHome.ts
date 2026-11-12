import type { Language } from './translations'

export interface HomeFeature {
  name: string
  body: string
  /** 详情落地页；没有独立页面的功能留空 */
  href?: string
  /** 有真机片段 / 订阅 */
  tag?: 'video' | 'paid'
  /** 「含 …」子能力，避免为了完整性再造一张卡 */
  sub?: string
}

export interface HomeGroup {
  title: string
  items: HomeFeature[]
}

export interface HomeScene {
  num: string
  title: string
  body: string
  bullets: string[]
  href: string
  /** public/remotecrab/video 下的文件名前缀（不含语言后缀） */
  clip: string
}

export interface HomeContent {
  trust: string[]
  /** 一句话解释「为什么还需要它」，不出现任何竞品名 */
  why: string
  scenes: { kicker: string; title: string; lead: string; items: HomeScene[] }
  ui: {
    kicker: string
    title: string
    lead: string
    items: { name: string; body: string; href: string; shot: string }[]
  }
  features: { kicker: string; title: string; lead: string; note: string; groups: HomeGroup[] }
  install: {
    kicker: string
    title: string
    lead: string
    items: { num: string; title: string; body: string; note?: string; dialog?: string }[]
    footnote: string
    dialogCancel: string
    dialogOpen: string
  }
  price: {
    kicker: string
    title: string
    lead: string
    free: { tag: string; amount: string; unit: string; items: string[] }
    paid: { tag: string; amount: string; unit: string; items: string[] }
  }
}

const F = '/remotecrab/features/'

const zh: HomeContent = {
  trust: ['不需要账号', '画面和声音不出你家局域网', '不联网也能用', '权限随时可关'],
  why: '系统自带的那套只覆盖 Mac，也覆盖不到触控板和键盘。',
  scenes: {
    kicker: '怎么用',
    title: '人在哪，电脑就在哪',
    lead: '四个最高频的场景 —— 每个都有真机片段，点播放看原片。',
    items: [
      {
        num: '01',
        title: '笔记本没有的那颗摄像头，手机补上',
        body: '它作为一台标准摄像头出现在 Zoom、Teams、FaceTime、OBS 的列表里，名字叫 RemoteCrab Camera。选它就行，别的应用不用改。',
        bullets: ['最高能拍 4K，会议里是 1080p', '前后摄像头都能切', '旧 iPhone 也能当第二台机位'],
        href: '/remotecrab/features/camera/',
        clip: 'clip-camera',
      },
      {
        num: '02',
        title: '把任意一个 App 窗口搬到手机上',
        body: '选一个窗口，它就出现在手机里 —— 点按、拖拽、滚动、捏合都是真的操作。不用挪窝就能看着它跑。',
        bullets: ['可钉住某个窗口，也可跟随前台', '缩放、拖拽、滚动都跟手', '横屏时只留画面'],
        href: '/remotecrab/features/screen-mirror/',
        clip: 'clip-mirror',
      },
      {
        num: '03',
        title: '电脑多出一块屏，把窗口拖过去',
        body: '不是投屏，是系统里真实存在的一块显示器。窗口拖上去，手指直接在手机上点、拖、缩放。',
        bullets: ['iPhone 和 iPad 都能当这块屏', '自动跟随当前 App，也能钉住', '横屏沉浸，多留一块桌面'],
        href: '/remotecrab/features/extended-display/',
        clip: 'clip-second-screen',
      },
      {
        num: '04',
        title: '躺在沙发上，也能操作电脑',
        body: '触控板有拖动、双指滚动、右键、三指手势和 ⌃⌥⌘⇧；键盘走系统输入法，中文和听写都能用，文字直接落在电脑光标处。',
        bullets: ['光标跟手，不乱飘', '滑动有轻重，带触觉反馈', '数字键盘与触控板共存'],
        href: '/remotecrab/features/trackpad/',
        clip: 'clip-trackpad',
      },
    ],
  },
  ui: {
    kicker: '手机上的样子',
    title: '不是概念图,是你在手机上会看到的界面',
    lead: '真机截图,和上面那些视频里的操作是同一套界面。',
    items: [
      { name: '键盘', body: '系统输入法、快捷键栏,还有一块迷你触控板。', href: '/remotecrab/features/keyboard/', shot: 'keyboard' },
      { name: '通知收件箱', body: '错过也没关系,点任意一条就跳回那个窗口。', href: '/remotecrab/features/notifications/', shot: 'notifications' },
      { name: '情景模式', body: '按当前 App 换一整套按键,系统控制也在这。', href: '/remotecrab/features/automation/', shot: 'automation' },
    ],
  },
  features: {
    kicker: '全部功能',
    title: '20 组功能，一次列全',
    lead: '其中 14 组有独立说明页（就是原来的 /features/…），点标题进去看做法、细节和权限要求；另外 6 组暂时只有这一行。',
    note: '带「视频」标记的有真机片段，点右下角的播放键看原片。',
    groups: [
      {
        title: '看见电脑',
        items: [
          { name: '虚拟摄像头', body: '任何 App 的摄像头列表里都有它：会议里 1080p，最高能拍 4K。', href: `${F}camera/`, tag: 'video' },
          { name: '屏幕镜像', body: '把一个窗口搬到手机，点按、拖拽、滚动、捏合都是真操作。', href: `${F}screen-mirror/`, tag: 'video' },
          { name: '第二显示器', body: '系统里真实多一块显示器，iPhone 和 iPad 都能当。', href: `${F}extended-display/`, tag: 'video' },
          { name: '电脑通知到手机', body: '实时到手机；点一下，电脑跳回发通知的那个窗口。', href: `${F}notifications/` },
          { name: '应用切换器', body: '看到电脑上开着什么，点一下就切过去，还能显示桌面。', href: `${F}app-switcher/` },
        ],
      },
      {
        title: '操作电脑',
        items: [
          { name: '触控板', body: '拖动、滚动、右键、三指手势、⌃⌥⌘⇧ 都能用；光标跟手，不乱飘。', href: `${F}trackpad/`, tag: 'video' },
          { name: '键盘', body: '系统输入法：中文、emoji、候选词，文字落在电脑光标处。', href: `${F}keyboard/` },
          { name: '按住说话', body: '识别在手机上完成，声音不上传；中英文都行，松手就上屏。', href: `${F}voice/` },
          { name: '数字键盘', body: '和触控板共存；遇到数字类 App 会自动出现。', tag: 'video' },
          { name: '情景模式', body: '18 套按键：你在用哪个 App，手机上就换成哪一套。', href: `${F}automation/`, sub: '含 系统控制：音量、亮度、媒体键、锁屏' },
        ],
      },
      {
        title: '声音',
        items: [
          { name: '虚拟麦克风', body: '装好后 Zoom、Teams、录音软件里都能选到它（Windows 暂未支持）。', href: `${F}microphone/` },
          { name: '扬声器模式', body: '整个电脑的声音从手机放出来，开关一点就切。', href: `${F}speaker/` },
        ],
      },
      {
        title: '文件和文字',
        items: [
          { name: '传文件与剪贴板', body: '像 AirDrop，选好几张也会一张张发完；剪贴板两边互相发。', href: `${F}transfer/`, sub: '含 最近截图一键发送' },
        ],
      },
      {
        title: '不在电脑前',
        items: [
          { name: '远程访问', body: '在外面也能连回家里的电脑，只有你看得见；连上后功能全一样。', href: `${F}remote-access/`, tag: 'paid' },
          { name: '问 AI', body: '它看得见屏幕和剪贴板，答案可以一键打到电脑光标处。', href: `${F}ai/`, sub: '含 AI 要执行命令时，确认卡弹到手机' },
          { name: '多台电脑', body: '一台手机记住多台电脑，在手机上点一下切换。' },
          { name: '多台手机', body: '两部手机共用一台电脑：可以点一下接管，也可以让另一部只读观看。' },
        ],
      },
      {
        title: '电脑端',
        items: [
          { name: '录制', body: '把画面和声音录下来，存成能直接播放的视频。' },
          { name: '合盖不睡', body: '一个开关，合上笔记本也不睡；电量太低或太热会自己停。' },
          { name: '空闲自动更新', body: '不在会话里、不在录制时才更新，不会打断你。' },
        ],
      },
    ],
  },
  install: {
    kicker: '安装',
    title: '装的时候会弹出这些，每个都告诉你为什么',
    lead: '它要替你点鼠标、敲键盘，还要用摄像头和麦克风，所以一定会问你要不要允许。这是正常的，不是可疑。',
    items: [
      {
        num: '1',
        title: '下载 dmg，拖进「应用程序」',
        body: '安装包 14 MB。第一次打开时系统会问你一次 —— 从网上下载的 App 都会问，点「打开」就好，不是报错。',
        dialog: '“RemoteCrab” 是从互联网下载的 App。确定要打开吗？',
      },
      {
        num: '2',
        title: '打开「辅助功能」授权',
        body: '要让手机替你点鼠标、敲键盘，得先在系统里允许它。不打开这一项，手机能连上，但点不动电脑。',
        note: '路径：系统设置 → 隐私与安全性 → 辅助功能 → 打开 RemoteCrab（macOS 27 里这一页叫「设备控制和数据访问」）',
      },
      {
        num: '3',
        title: '装摄像头（需要输入一次电脑密码）',
        body: '要让「RemoteCrab Camera」出现在所有 App 的摄像头列表里，只能装一个小部件 —— Apple 规定的唯一方式。装完在任何应用里都能选到它，不想要了在同一个页面关掉。',
        note: '路径：系统设置 → 通用 → 登录项与扩展 → 相机扩展',
      },
      {
        num: '4',
        title: '装 iPhone / iPad 端，点一下配对',
        body: '两台设备在同一个 WiFi 里，手机上会自动出现这台电脑；点一下，以后打开即连。换了电脑，在手机上重新选一台就行。',
      },
    ],
    footnote:
      '虚拟麦克风要单独装一次，只有「把手机当麦克风」才需要，可以跳过。录屏权限只在用「镜像」时才需要。',
    dialogCancel: '取消',
    dialogOpen: '打开',
  },
  price: {
    kicker: '价格',
    title: '局域网里的一切，永久免费',
    lead: '订阅只买一样东西：你不在家的时候。功能不拆开卖，也不放广告。',
    free: {
      tag: '同一局域网',
      amount: '免费',
      unit: '永久',
      items: ['全部功能，不设数量限制', '不需要账号，不需要登录', '没有广告，没有内购', 'Windows 端同样免费'],
    },
    paid: {
      tag: '不在同一网络',
      amount: '$3.99',
      unit: ' / 月 · 年付 $29.99',
      items: ['出差、旅行、回老家都能连', '能直连就直连，连不上自动换路', '只有两边看得见，服务器看不到', '随时在系统设置里取消'],
    },
  },
}

const en: HomeContent = {
  trust: ['No account', 'Stays on your own Wi-Fi', 'Works without internet', 'Permissions you can revoke'],
  why: 'What ships with the system covers Mac only — and stops at the camera.',
  scenes: {
    kicker: 'How it’s used',
    title: 'Wherever you are, the computer follows',
    lead: 'The four most-used setups — each one has real footage; press play.',
    items: [
      {
        num: '01',
        title: 'The camera your laptop doesn’t have',
        body: 'It shows up as a standard camera in Zoom, Teams, FaceTime and OBS, listed as RemoteCrab Camera. Pick it and nothing else changes.',
        bullets: ['Up to 4K capture, 1080p in meetings', 'Front or rear camera', 'An old iPhone works as a second angle'],
        href: '/remotecrab/features/camera/',
        clip: 'clip-camera',
      },
      {
        num: '02',
        title: 'Any app window, on the phone',
        body: 'Pick a window and it’s on your phone — tap, drag, scroll and pinch are real input. Watch it run without moving.',
        bullets: ['Pin a window, or follow the frontmost app', 'Zoom, drag and scroll feel native', 'Landscape hides the chrome'],
        href: '/remotecrab/features/screen-mirror/',
        clip: 'clip-mirror',
      },
      {
        num: '03',
        title: 'A second screen you can drag a window onto',
        body: 'Not a mirror — a real display the system believes in. Drag a window onto it and touch it directly.',
        bullets: ['iPhone and iPad both work', 'Follows the front app, or pinned', 'Landscape gives you a full desktop'],
        href: '/remotecrab/features/extended-display/',
        clip: 'clip-second-screen',
      },
      {
        num: '04',
        title: 'Run the computer from the couch',
        body: 'The trackpad does drag, two-finger scroll, right-click, three-finger gestures and ⌃⌥⌘⇧. Typing uses the system IME — Chinese and dictation included.',
        bullets: ['The pointer follows your finger', 'Accelerates as you flick, with haptics', 'A numeric pad that coexists'],
        href: '/remotecrab/features/trackpad/',
        clip: 'clip-trackpad',
      },
    ],
  },
  ui: {
    kicker: 'On the phone',
    title: 'Screenshots, not concept art',
    lead: 'Real device captures — the same interface you see in the footage above.',
    items: [
      { name: 'Keyboard', body: 'System IME, a shortcut row, and a mini trackpad.', href: '/remotecrab/features/keyboard/', shot: 'keyboard' },
      { name: 'Notification inbox', body: 'Missed one? Tap any of them to jump back to that window.', href: '/remotecrab/features/notifications/', shot: 'notifications' },
      { name: 'Context modes', body: 'The buttons follow the app in front; system keys live here too.', href: '/remotecrab/features/automation/', shot: 'automation' },
    ],
  },
  features: {
    kicker: 'Every feature',
    title: '20 groups of features, all of them',
    lead: '14 of them have their own page (the existing /features/…) — click a title for how it works, the details and the permissions. The other 6 live here for now.',
    note: 'Items marked “video” have real footage — tap the play button to watch.',
    groups: [
      {
        title: 'See it',
        items: [
          { name: 'Wireless camera', body: 'It’s in every app’s camera menu: 1080p in meetings, up to 4K capture.', href: `${F}camera/`, tag: 'video' },
          { name: 'Screen mirroring', body: 'A window on your phone; tap, drag, scroll and pinch are real input.', href: `${F}screen-mirror/`, tag: 'video' },
          { name: 'Second display', body: 'A real extra display the system sees; iPhone or iPad.', href: `${F}extended-display/`, tag: 'video' },
          { name: 'Mac notifications', body: 'They land on the phone; tap one and the Mac jumps back to that window.', href: `${F}notifications/` },
          { name: 'App switcher', body: 'See what’s running and switch with a tap — or show the desktop.', href: `${F}app-switcher/` },
        ],
      },
      {
        title: 'Control it',
        items: [
          { name: 'Trackpad', body: 'Drag, scroll, right-click, three-finger gestures, ⌃⌥⌘⇧ — and the pointer follows your finger.', href: `${F}trackpad/`, tag: 'video' },
          { name: 'Keyboard', body: 'System IME: Chinese, emoji, candidates; text lands at the cursor.', href: `${F}keyboard/` },
          { name: 'Hold to talk', body: 'Recognition happens on the phone, nothing uploaded; release and it’s typed.', href: `${F}voice/` },
          { name: 'Numeric pad', body: 'Coexists with the trackpad; auto-opens for number-heavy apps.', tag: 'video' },
          { name: 'Context modes', body: '18 key sets: whichever app you’re in, the phone switches to match.', href: `${F}automation/`, sub: 'incl. system keys: volume, brightness, media, lock' },
        ],
      },
      {
        title: 'Sound',
        items: [
          { name: 'Virtual microphone', body: 'After one install, Zoom, Teams and any recorder can pick it (not on Windows yet).', href: `${F}microphone/` },
          { name: 'Speaker mode', body: 'The whole computer’s audio plays on the phone; one switch.', href: `${F}speaker/` },
        ],
      },
      {
        title: 'Files and text',
        items: [
          { name: 'Files and clipboard', body: 'AirDrop-like: pick several and they all arrive; clipboard works both ways.', href: `${F}transfer/`, sub: 'incl. one-tap latest screenshot' },
        ],
      },
      {
        title: 'Away from it',
        items: [
          { name: 'Remote access', body: 'Reach your computer from anywhere, private to you; same features once connected.', href: `${F}remote-access/`, tag: 'paid' },
          { name: 'Ask AI', body: 'It sees the screen and clipboard; the answer lands at the cursor.', href: `${F}ai/`, sub: 'incl. an approval card when AI wants to run a command' },
          { name: 'Multiple computers', body: 'One phone remembers several computers; switch from the phone.' },
          { name: 'Two phones', body: 'One computer, two phones: take over with a tap, or let the other one watch read-only.' },
        ],
      },
      {
        title: 'On the computer',
        items: [
          { name: 'Recording', body: 'Records the picture and sound into a video you can play.' },
          { name: 'Keep awake', body: 'One switch keeps the laptop awake with the lid shut; low battery or heat still stops it.' },
          { name: 'Idle auto-update', body: 'Updates only when idle and not recording.' },
        ],
      },
    ],
  },
  install: {
    kicker: 'Install',
    title: 'Here’s every prompt you’ll see, and why it exists',
    lead: 'It moves your pointer, types for you, and uses the camera and mic — so macOS will ask, once per thing. That’s normal, not suspicious.',
    items: [
      {
        num: '1',
        title: 'Download the dmg, drag it to Applications',
        body: '14 MB. macOS asks once when you first open it — every app downloaded from the web gets that, and “Open” is all it needs.',
        dialog: '“RemoteCrab” is an app downloaded from the Internet. Are you sure you want to open it?',
      },
      {
        num: '2',
        title: 'Grant Accessibility',
        body: 'For the phone to move the pointer and type for you, macOS has to allow it. Without this you connect, but clicks do nothing.',
        note: 'Path: System Settings → Privacy & Security → Accessibility → turn on RemoteCrab (called “Device control and data access” on macOS 27)',
      },
      {
        num: '3',
        title: 'Add the camera (one computer password)',
        body: 'For “RemoteCrab Camera” to show up in every app’s camera menu, macOS requires a small add-on — it’s the only way. Once installed any app can pick it; turn it off on the same page.',
        note: 'Path: System Settings → General → Login Items & Extensions → Camera Extensions',
      },
      {
        num: '4',
        title: 'Install on iPhone / iPad, tap once to pair',
        body: 'On the same Wi-Fi the device lists this computer automatically; tap once and it reconnects from then on. A different computer is one more tap.',
      },
    ],
    footnote:
      'The virtual microphone is a separate one-time install, only needed if you want the phone as a mic — skip it otherwise. Screen Recording is only needed for mirroring.',
    dialogCancel: 'Cancel',
    dialogOpen: 'Open',
  },
  price: {
    kicker: 'Pricing',
    title: 'Everything on your own Wi-Fi is free, forever',
    lead: 'The subscription buys exactly one thing: being somewhere else. No features are held back, and there are no ads.',
    free: {
      tag: 'Same Wi-Fi',
      amount: 'Free',
      unit: 'forever',
      items: ['Every feature, no device limits', 'No account, no sign-in', 'No ads, no in-app purchases', 'Free on Windows too'],
    },
    paid: {
      tag: 'Different networks',
      amount: '$3.99',
      unit: ' / month · $29.99 a year',
      items: ['Works from a hotel, a trip, anywhere', 'Direct when it can, another route when it can’t', 'Only the two ends can read it', 'Cancel anytime in Settings'],
    },
  },
}

export const remotecrabHome: Record<Language, HomeContent> = { zh, en }
