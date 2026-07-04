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
  },
} as const

export type Translations = typeof translations
