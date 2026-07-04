export type Language = 'zh' | 'en'

export const translations = {
  zh: {
    nav: {
      products: '产品',
      about: '关于',
      contact: '联系',
      toggleMenu: '切换菜单',
    },
    hero: {
      subtitle: '做你真正会用的工具',
      description: '本地优先、AI 原生，为开发者和效率爱好者打造。',
      cta: '探索产品',
    },
    products: {
      title: '我们的产品',
      description: '每一款都从真实的工作流痛点出发，追求本地、快速、可信赖。',
    },
    why: {
      title: '为什么选 VGO',
      description: '我们相信好的工具应该安静、可靠、为你工作，而不是反过来。',
      localFirst: {
        title: '本地优先',
        description: '你的数据默认留在设备上，不上传、不锁定，随时带走。',
      },
      aiNative: {
        title: 'AI 原生',
        description: '不是后期加功能，而是从设计之初就为 AI 工作流打造。',
      },
      developerTaste: {
        title: '开发者品味',
        description: '追求性能、隐私和细节，拒绝臃肿，做真正好用的工具。',
      },
    },
    cta: {
      title: '关注 VGO 的下一款工具',
      description: '在 GitHub 上关注我们，第一时间获取新产品、更新和源码。',
      button: '在 GitHub 上关注',
    },
    footer: {
      copyright: '© {year} VGO. All rights reserved.',
    },
    language: {
      zh: '中',
      en: 'En',
      label: '切换语言',
    },
    productsList: {
      mddock: {
        name: 'MDDock',
        tagline: '本地优先的 Markdown 办公套件',
        description: '把 Word、Excel、PPT 和 Markdown 连成一条工作流，AI 能真正读懂你的笔记。',
        features: [
          'Word / Excel / PPT ↔ Markdown 双向转换',
          'AI 知识库，文件永远在本机',
          '免费浏览器工具 + 桌面端深度体验',
        ],
        linkLabel: '访问官网',
      },
      macslim: {
        name: 'MacSlim',
        tagline: '开发者信任的 Mac 清理工具',
        description: 'Rust + Tauri 打造的 Mac 清理工具，轻巧、快速、透明，不会碰不该碰的文件。',
        features: [
          'Rust + Tauri，安装包仅 ~12 MB',
          '支持 npm、Docker、Xcode、Homebrew 等开发者缓存',
          '三层安全保护，零上传隐私',
        ],
        linkLabel: '查看 GitHub',
      },
      mouseclaw: {
        name: 'MouseClaw',
        tagline: '像素风桌面 AI 宠物',
        description: '一只睡在屏幕角落的像素老鼠，按住说话就能让 AI 帮你干活。',
        features: [
          '按住说话即可调用 Claude / Codex / 通义千问等 14+ AI',
          '100% 本地语音识别，零数据上传',
          '9 款皮肤、长期记忆、定时任务',
        ],
        linkLabel: '查看 GitHub',
      },
    },
  },
  en: {
    nav: {
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      toggleMenu: 'Toggle menu',
    },
    hero: {
      subtitle: 'Tools you actually use.',
      description: 'Local-first, AI-native tools built for developers and efficiency lovers.',
      cta: 'Explore Products',
    },
    products: {
      title: 'Our Products',
      description: 'Each one is built from real workflow pain points — local, fast, and trustworthy.',
    },
    why: {
      title: 'Why VGO',
      description: 'We believe great tools should be quiet, reliable, and work for you.',
      localFirst: {
        title: 'Local-first',
        description: 'Your data stays on your device by default. No uploads, no lock-in, take it anywhere.',
      },
      aiNative: {
        title: 'AI-native',
        description: 'Not AI bolted on later — designed for AI workflows from day one.',
      },
      developerTaste: {
        title: 'Developer taste',
        description: 'Obsessed with performance, privacy, and details. No bloat, just great tools.',
      },
    },
    cta: {
      title: 'Follow VGO for what\'s next',
      description: 'Follow us on GitHub for new products, updates, and source code.',
      button: 'Follow on GitHub',
    },
    footer: {
      copyright: '© {year} VGO. All rights reserved.',
    },
    language: {
      zh: '中',
      en: 'En',
      label: 'Switch language',
    },
    productsList: {
      mddock: {
        name: 'MDDock',
        tagline: 'Local-first Markdown office suite',
        description: 'Connect Word, Excel, PowerPoint, and Markdown into one workflow that AI can actually understand.',
        features: [
          'Word / Excel / PPT ↔ Markdown two-way conversion',
          'AI knowledge base, files stay on your machine',
          'Free browser tools + deep desktop experience',
        ],
        linkLabel: 'Visit website',
      },
      macslim: {
        name: 'MacSlim',
        tagline: 'The Mac cleaner developers trust',
        description: 'A lightweight, fast, and transparent Mac cleaner built with Rust + Tauri — it never touches what it should not.',
        features: [
          'Rust + Tauri, installer only ~12 MB',
          'Cleans npm, Docker, Xcode, Homebrew, and other dev caches',
          'Triple safety protection, zero-upload privacy',
        ],
        linkLabel: 'View on GitHub',
      },
      mouseclaw: {
        name: 'MouseClaw',
        tagline: 'Pixel-art desktop AI pet',
        description: 'A pixel mouse that sleeps in the corner of your screen. Hold to talk and let AI do the work.',
        features: [
          'Hold to talk with Claude / Codex / Qwen and 14+ AIs',
          '100% local voice recognition, no data uploads',
          '9 skins, long-term memory, scheduled tasks',
        ],
        linkLabel: 'View on GitHub',
      },
    },
  },
} as const

export type Translations = typeof translations
