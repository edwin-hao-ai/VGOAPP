import type { Language } from './translations'

export interface MacSlimFeatureItem {
  /** Key into MacSlimPage's FEATURE_ICONS map. */
  icon: string
  title: string
  body: string
}

export interface MacSlimScreenshotItem {
  /** Language-independent filename infix; see SCREENSHOT_FILES in MacSlimPage. */
  slug: string
  caption: string
}

export interface MacSlimContent {
  meta: { title: string; description: string }
  nav: { back: string }
  hero: {
    badge: string
    tagline: string
    description: string
    download: string
    appStoreSoon: string
    trust: string
    requirementsNote: string
  }
  features: { title: string; description: string; items: MacSlimFeatureItem[] }
  screenshots: { title: string; description: string; items: MacSlimScreenshotItem[] }
  why: {
    title: string
    description: string
    items: { icon: string; title: string; body: string }[]
  }
  steps: { title: string; description: string; items: { title: string; body: string }[] }
  requirements: { title: string; items: string[]; note: string }
  safety: { title: string; body: string; points: string[] }
  risk: { title: string; body: string; points: string[] }
  appStore: { badge: string; title: string; body: string; points: string[] }
  privacy: { title: string; body: string; points: string[]; linkLabel: string }
  faq: { title: string; items: { question: string; answer: string }[] }
  cta: { title: string; body: string; download: string }
}

export const macSlimContent: Record<Language, MacSlimContent> = {
  zh: {
    meta: {
      title: 'MacSlim — 懂开发者的 Mac 系统运维工具',
      description:
        'MacSlim 一键扫描系统健康，清理 NPM / Docker / Xcode 等开发者缓存与系统垃圾，管理进程与应用卸载。每步都有日志，破坏性操作前先问你。无账号、无遥测、数据不出你的 Mac。',
    },
    nav: { back: '← 返回 VGO' },
    hero: {
      badge: 'macOS 桌面端 · Developer ID 签名版 · 免费',
      tagline: '扫描，优化，清理 —— 不用读懂 CPU 曲线',
      description:
        'MacSlim 用 Rust + Tauri 打造，把「你的 Mac 哪里脏了、哪些进程该关、哪些缓存能删」直接算好、标好、列成清单。比活动监视器少一步判断，比通用清理工具更懂 NPM、Docker 和 Xcode；每一步都有日志，破坏性操作之前一定先问你。',
      download: '下载 MacSlim.dmg',
      appStoreSoon: 'App Store 版即将上架',
      trust: '免费 · 无账号 · 无遥测 · 数据不出你的 Mac',
      requirementsNote: '需要 macOS 13.0 或更高 · Apple 芯片（M1 及以上）',
    },
    features: {
      title: '七个页面，把 Mac 该做的事做完',
      description:
        'MacSlim 中文优先。所有判断都由规则驱动，不联网、不猜你的意图，每一项都写清楚它打算做什么。',
      items: [
        {
          icon: 'gauge',
          title: '智能扫描',
          body: '一键扫描系统健康：CPU、内存、磁盘用环形图展示，再列出可优化项 —— 该清的缓存、该关的进程、该卸的应用，附带「一键优化」主按钮。',
        },
        {
          icon: 'cpu',
          title: '进程管理',
          body: '列出全部进程，可按 CPU 或内存排序、搜索、按端口占用过滤。受保护项和你自己加的白名单会被明确标注，并且默认不允许终止。',
        },
        {
          icon: 'appWindow',
          title: '应用程序',
          body: '列出正在运行的应用，可以优雅退出（相当于 ⌘Q），也可以强制退出。哪些应用正在使用、会丢什么，界面上会先讲。',
        },
        {
          icon: 'trash',
          title: '缓存清理',
          body: '开发者缓存深度适配：NPM、pnpm、Yarn、Cargo、Go、pip、Homebrew、Xcode DerivedData、Docker；再加上系统垃圾 —— 废纸篓、崩溃报告、应用缓存与日志。',
        },
        {
          icon: 'uninstall',
          title: '应用卸载',
          body: '卸载应用时一并扫描它留下的残留：偏好设置、缓存、容器和支持文件，列出来让你逐项决定一起删还是留下。',
        },
        {
          icon: 'history',
          title: '历史记录',
          body: '每一次清理、每一次终止进程都留痕：时间、对象、释放了多少体积。回头查得到，才叫可控。',
        },
        {
          icon: 'settings',
          title: '设置',
          body: '管理白名单、调整扫描范围、查看权限状态。所有配置都存在你自己的电脑上，不上传、不同步。',
        },
      ],
    },
    screenshots: {
      title: '看看长什么样',
      description: '真实界面截图，没有概念图。切换语言会切换成对应语言的截图。',
      items: [
        { slug: 'scan', caption: '智能扫描：环形图 + 可优化项清单' },
        { slug: 'process', caption: '进程管理：排序、搜索、端口过滤' },
        { slug: 'cache', caption: '缓存清理：开发者缓存与系统垃圾分组' },
        { slug: 'uninstall', caption: '应用卸载：残留逐项确认' },
      ],
    },
    why: {
      title: '它和别的清理工具有什么不一样',
      description: '三个理由，不多不少。',
      items: [
        {
          icon: 'gauge',
          title: '比活动监视器简单',
          body: '活动监视器给你曲线和数字，然后让你自己判断。MacSlim 直接告诉你哪些能清、能释放多少，点一下就做完 —— 不需要读懂 CPU 曲线。',
        },
        {
          icon: 'terminal',
          title: '比通用清理工具懂开发者',
          body: 'NPM、pnpm、Yarn、Cargo、Go、pip、Homebrew、Xcode DerivedData、Docker 都有专门的处理逻辑。这些是通用清理工具看不到、也不认识的东西。',
        },
        {
          icon: 'listChecks',
          title: '全透明，可追溯',
          body: '每一步都有日志，破坏性操作前有确认弹窗，弹窗里写明做什么、释放多少、能不能撤销。历史记录随时可查。',
        },
      ],
    },
    steps: {
      title: '四步就能用上',
      description: '从下载到第一次清理，通常不到三分钟。',
      items: [
        {
          title: '下载并安装',
          body: '下载 DMG，拖进「应用程序」。已用 Developer ID 签名并通过 Apple 公证，Gatekeeper 不会拦。',
        },
        {
          title: '授予必要的权限',
          body: 'Developer ID 版需要「完全磁盘访问权限」才能算清缓存体积并清理；优雅退出应用会用到 Apple Events。两项都可以在系统设置里随时撤销。',
        },
        { title: '扫描', body: '打开 MacSlim，点「智能扫描」。看环形图和可优化项清单，每项都标了体积和风险等级。' },
        {
          title: '确认并执行',
          body: '勾选你要处理的项。确认弹窗会先把摘要、预计释放体积和有效期摆给你看，点头才执行。',
        },
      ],
    },
    requirements: {
      title: '系统要求与签名',
      items: [
        'macOS 13.0 Ventura 或更高',
        'Apple 芯片（M1 及以上）',
        'Developer ID Application 签名',
        '已通过 Apple 公证（notarization）',
      ],
      note: '安装包约 8.3 MB。如果你看到 Gatekeeper 提示「未知开发者」，说明手上的不是官网版本 —— 请从本页的按钮下载。',
    },
    safety: {
      title: '破坏性操作之前，一定先问你',
      body: 'MacSlim 不做「一键回滚」这种承诺 —— 删掉的缓存和停掉的进程本身就是不可逆的。它能做的是：在你点下去之前，把该说的都说完。',
      points: [
        '每次清理或终止前都有确认弹窗，列出具体对象、预计释放体积和有效期',
        '弹窗里会明确写出「此操作不可撤销」',
        '默认只勾选「重新获取成本小于 5 分钟」的项目',
        '重建成本高的项目（例如完整 Docker 镜像、大型 node_modules）默认不勾选',
        '系统核心进程与 SIP 保护项默认隐藏，不会出现在列表里',
        '每一次操作都写进历史记录',
      ],
    },
    risk: {
      title: '请在确认弹窗里读完再点',
      body: '这一段不是免责套话，是真话：MacSlim 会真的删除文件、真的停掉进程。下面这些后果请先知道。',
      points: [
        '清理缓存不可撤销：被删掉的包、镜像和构建产物需要重新下载或重新编译',
        '终止进程不可撤销：如果你终止的是一个正在写文件的应用，它未保存的工作可能丢失',
        '强制退出应用等同于 ⌘⌥Esc：应用不会有机会自己保存',
        '一次删除超过 10 GB 会额外再确认一次',
        '建议第一次使用时只勾选体积小、且你清楚自己在删什么的那几项',
      ],
    },
    appStore: {
      badge: '即将上架',
      title: '还会有一个 App Store 版本',
      body: '我们正在准备 MacSlim 的 Mac App Store 版本，走 App Store 的沙盒权限模型，功能侧重开发者的缓存清理与磁盘分析。它和本页的 Developer ID 版是两条并行的路，不是同一个包。',
      points: [
        '本页下载的是 Developer ID 全功能版本',
        'App Store 版的权限模型和功能侧重会有所不同',
        '上架后本页会更新链接',
      ],
    },
    privacy: {
      title: '你的数据不出你的 Mac',
      body: 'MacSlim 没有服务器、没有遥测、没有账号。所有扫描都在本机完成，所有数据都存在本地。',
      points: ['无遥测、无崩溃上报、无第三方分析 SDK', '无账号、无云端同步、无远程数据收集', '隐私政策里逐条写明了它读取什么、修改什么'],
      linkLabel: '查看完整隐私政策',
    },
    faq: {
      title: '常见问题',
      items: [
        {
          question: 'MacSlim 收费吗？',
          answer: '核心功能免费。安装包约 8.3 MB，不订阅、不看广告。',
        },
        {
          question: '它会删我的个人文件吗？',
          answer:
            '它清理的是已识别的缓存、日志、构建产物和废纸篓，不会主动去删你的文档、照片或项目代码。但缓存目录里可能混有你没预期的第三方数据 —— 所以确认弹窗里的清单请看一眼再点。',
        },
        {
          question: '我需要给它什么权限？',
          answer:
            'Developer ID 版需要「完全磁盘访问权限」来遍历用户目录统计缓存体积；优雅退出应用会用到 Apple Events。两项都可以在「系统设置 → 隐私与安全性」里随时撤销，撤销后其余功能照常工作。',
        },
        {
          question: '它和活动监视器有什么区别？',
          answer:
            '活动监视器是给你观察的工具，得出结论的活儿留给你自己。MacSlim 把可清理项算好、标好风险，替你点掉，但每一步仍然让你确认。',
        },
        {
          question: '我要是清错了怎么办？',
          answer:
            '缓存和构建产物删掉是不能撤销，但绝大多数重新下载或重新编译就能拿回来。历史记录会如实写明刚才删了什么、释放了多少。',
        },
        {
          question: '支持 Intel Mac 吗？',
          answer: '目前只支持 Apple 芯片（M1 及以上），系统要求 macOS 13.0 或更高。',
        },
      ],
    },
    cta: {
      title: '给这台 Mac 减一次',
      body: '下载 Developer ID 签名版，拖进「应用程序」就能用。第一次扫描不到三秒。',
      download: '下载 MacSlim.dmg',
    },
  },
  en: {
    meta: {
      title: 'MacSlim — A Mac maintenance tool that understands developers',
      description:
        'MacSlim scans your system health in one click, cleans developer caches (NPM, Docker, Xcode) and system junk, and handles processes and app uninstalls. Every step is logged, and destructive actions always ask first. No account, no telemetry, nothing leaves your Mac.',
    },
    nav: { back: '← Back to VGO' },
    hero: {
      badge: 'macOS desktop app · Developer ID signed · Free',
      tagline: 'Scan, tidy, clean — without learning to read a CPU graph',
      description:
        'MacSlim is built with Rust + Tauri. It works out which caches are stale, which processes are idle and which apps are leftovers, then shows you the list with the numbers attached. One step less judgement than Activity Monitor, far more developer-aware than a generic cleaner. Every step is logged, and anything destructive asks first.',
      download: 'Download MacSlim.dmg',
      appStoreSoon: 'Coming soon to the Mac App Store',
      trust: 'Free · No account · No telemetry · Nothing leaves your Mac',
      requirementsNote: 'Requires macOS 13.0 or later · Apple silicon (M1 and newer)',
    },
    features: {
      title: 'Seven screens, everything a Mac needs',
      description:
        'MacSlim is Chinese-first by design. Every judgement is rule-driven — it never goes online and never guesses your intent, and it always says what it is about to do.',
      items: [
        {
          icon: 'gauge',
          title: 'Smart scan',
          body: 'One click to scan system health: CPU, memory and disk as ring charts, plus a list of what can be improved — stale caches, idle processes, leftover apps — with a prominent "Optimize now" action.',
        },
        {
          icon: 'cpu',
          title: 'Process manager',
          body: 'Every running process, sortable by CPU or memory, searchable, and filterable by port usage. Protected processes and your own allowlist are clearly labelled and cannot be terminated by default.',
        },
        {
          icon: 'appWindow',
          title: 'Applications',
          body: 'See what is running, then quit it gracefully (equivalent to ⌘Q) or force it to quit. The interface tells you which apps are in use and what unsaved work you stand to lose.',
        },
        {
          icon: 'trash',
          title: 'Cache cleaner',
          body: 'Deep support for developer caches: NPM, pnpm, Yarn, Cargo, Go, pip, Homebrew, Xcode DerivedData and Docker — plus system junk such as the Trash, crash reports, app caches and logs.',
        },
        {
          icon: 'uninstall',
          title: 'App uninstaller',
          body: 'Uninstall an app and MacSlim scans what it left behind — preferences, caches, containers and support files — then lists it so you decide item by item what goes.',
        },
        {
          icon: 'history',
          title: 'History',
          body: 'Every cleanup and every terminated process is recorded: when, what, and how much space it freed. You can look it up afterwards — that is what makes it controllable.',
        },
        {
          icon: 'settings',
          title: 'Settings',
          body: 'Manage your allowlist, adjust what gets scanned, and check permission status. Every setting lives on your own computer, never uploaded, never synced.',
        },
      ],
    },
    screenshots: {
      title: 'What it actually looks like',
      description: 'Real interface screenshots, not concept art. Switching language switches the screenshots too.',
      items: [
        { slug: 'scan', caption: 'Smart scan: ring charts plus the list of what can be improved' },
        { slug: 'process', caption: 'Process manager: sort, search and port filtering' },
        { slug: 'cache', caption: 'Cache cleaner: developer caches and system junk, grouped' },
        { slug: 'uninstall', caption: 'App uninstaller: leftover files confirmed one by one' },
      ],
    },
    why: {
      title: 'How it differs from the other cleaners',
      description: 'Three reasons. That is the whole list.',
      items: [
        {
          icon: 'gauge',
          title: 'Simpler than Activity Monitor',
          body: 'Activity Monitor gives you graphs and numbers, then leaves the judgement to you. MacSlim tells you what can be cleaned and how much you get back, and does it in one click — no reading CPU curves required.',
        },
        {
          icon: 'terminal',
          title: 'More developer-aware than generic cleaners',
          body: 'NPM, pnpm, Yarn, Cargo, Go, pip, Homebrew, Xcode DerivedData and Docker each get purpose-built handling. These are exactly the things a generic cleaner cannot see, let alone understand.',
        },
        {
          icon: 'listChecks',
          title: 'Fully transparent and auditable',
          body: 'Every step is logged. Destructive actions open a confirmation dialog stating what will happen, how much space it frees and whether it can be undone. History is always one click away.',
        },
      ],
    },
    steps: {
      title: 'Up and running in four steps',
      description: 'From download to your first cleanup usually takes under three minutes.',
      items: [
        {
          title: 'Download and install',
          body: 'Download the DMG and drag it into Applications. It is signed with a Developer ID and notarized by Apple, so Gatekeeper will not stop you.',
        },
        {
          title: 'Grant the permissions it needs',
          body: 'The Developer ID build needs Full Disk Access to measure and clear caches across your home folder, and it uses Apple Events to quit apps gracefully. Both can be revoked in System Settings at any time.',
        },
        {
          title: 'Scan',
          body: 'Open MacSlim and hit "Smart scan". Read the ring charts and the list of items, each with its size and risk level.',
        },
        {
          title: 'Confirm, then run',
          body: 'Tick what you want handled. The confirmation dialog shows the summary, the estimated space freed and how long the items stay valid — nothing runs until you agree.',
        },
      ],
    },
    requirements: {
      title: 'Requirements and signing',
      items: [
        'macOS 13.0 Ventura or later',
        'Apple silicon (M1 and newer)',
        'Signed with a Developer ID Application certificate',
        'Notarized by Apple',
      ],
      note: 'The installer is about 8.3 MB. If Gatekeeper tells you the developer is "unknown", the file did not come from the official site — download it from the button on this page.',
    },
    safety: {
      title: 'Anything destructive asks first',
      body: 'MacSlim makes no "one-click undo" promise — deleted caches and stopped processes are genuinely irreversible. What it can do is finish saying everything before you click.',
      points: [
        'Every cleanup or termination opens a confirmation dialog listing the exact targets, the estimated space freed and how long the items remain valid',
        'The dialog states plainly that the action cannot be undone',
        'By default only items costing under five minutes to re-fetch are ticked',
        'Expensive-to-rebuild items (full Docker images, large node_modules) are left unticked',
        'System-critical and SIP-protected processes are hidden by default and never listed',
        'Every action is written to the history log',
      ],
    },
    risk: {
      title: 'Please read the dialog before you click',
      body: 'This section is not legal boilerplate — it is the truth: MacSlim really does delete files and really does stop processes. Here is what that can cost you.',
      points: [
        'Clearing caches is irreversible: deleted packages, images and build artifacts must be re-downloaded or rebuilt',
        'Terminating a process is irreversible: if you kill an app that was writing a file, unsaved work may be lost',
        'Force-quitting an app is equivalent to ⌘⌥Esc — the app gets no chance to save',
        'Deleting more than 10 GB at once triggers an extra confirmation',
        'Suggested approach for a first run: tick only the small items you are certain about',
      ],
    },
    appStore: {
      badge: 'Coming soon',
      title: 'A Mac App Store version is on the way',
      body: 'We are preparing a Mac App Store edition of MacSlim. It runs under the App Store sandbox permission model and focuses on developer cache cleaning and disk analysis. It is a parallel track to the Developer ID build on this page, not the same package.',
      points: [
        'What you download here is the full-featured Developer ID build',
        'The App Store edition has a different permission model and a different feature emphasis',
        'This page will link to it once it ships',
      ],
    },
    privacy: {
      title: 'Your data never leaves your Mac',
      body: 'MacSlim has no server, no telemetry and no account. Every scan runs on your machine and every record is stored locally.',
      points: [
        'No telemetry, no crash reporting, no third-party analytics SDK',
        'No account, no cloud sync, no remote data collection',
        'The privacy policy spells out exactly what it reads and what it modifies',
      ],
      linkLabel: 'Read the full privacy policy',
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'Is MacSlim free?',
          answer: 'The core features are free. The installer is about 8.3 MB, with no subscription and no ads.',
        },
        {
          question: 'Will it delete my personal files?',
          answer:
            'It clears recognised caches, logs, build artifacts and the Trash. It does not go after your documents, photos or project code. That said, cache directories can contain third-party data you did not expect — so read the list in the confirmation dialog before you agree.',
        },
        {
          question: 'What permissions does it need?',
          answer:
            'The Developer ID build needs Full Disk Access to walk your home folder and measure cache sizes, and it uses Apple Events to quit apps gracefully. Both can be revoked any time in System Settings → Privacy & Security, and the rest of the app keeps working.',
        },
        {
          question: 'How is this different from Activity Monitor?',
          answer:
            'Activity Monitor is an observation tool — drawing the conclusion is left to you. MacSlim computes the cleanable list, labels the risk and does the clicking, while still making you confirm each step.',
        },
        {
          question: 'What if I clean the wrong thing?',
          answer:
            'Deleted caches and build artifacts cannot be brought back, but most of them return with a re-download or a rebuild. The history log records exactly what was removed and how much space it freed.',
        },
        {
          question: 'Does it support Intel Macs?',
          answer: 'Not at the moment. MacSlim currently requires Apple silicon (M1 and newer) on macOS 13.0 or later.',
        },
      ],
    },
    cta: {
      title: 'Give this Mac a clean-up',
      body: 'Download the Developer ID signed build and drag it into Applications. The first scan takes under three seconds.',
      download: 'Download MacSlim.dmg',
    },
  },
}
