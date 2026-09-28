import { useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'
import type { Language } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import GlowBackground from '../components/GlowBackground'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * ⚠️ PLACEHOLDER — confirm this address before shipping. Change it here only.
 */
const CONTACT_EMAIL = 'you@vgoapp.com'

const UPDATED = '2026-09-27'

interface Section {
  heading: string
  body: string
  bullets?: string[]
}

interface PrivacyContent {
  title: string
  updated: string
  intro: string
  sections: Section[]
  contactHeading: string
  contactBody: string
  backLabel: string
}

const content: Record<Language, PrivacyContent> = {
  zh: {
    title: '隐私政策',
    updated: `最后更新：${UPDATED}`,
    intro:
      'MacSlim 是一个 macOS 系统运维工具，负责扫描系统状态、清理缓存和管理进程。本页说明它会**读取**什么、会**修改**什么 —— 以及它**完全不做**的事。',
    sections: [
      {
        heading: '概要',
        body: 'MacSlim 完全在你的 Mac 本地运行。我们没有服务器，没有遥测，没有账号，也不做任何远程数据收集。',
        bullets: [
          '所有扫描、统计与清理动作都在本机完成，不会把数据发往任何地方',
          '没有分析 SDK、没有崩溃上报、没有使用统计',
          '没有账号、没有注册、没有用户标识、没有云端同步',
          '唯一的例外是：你在浏览器里点下载链接本身，那是普通的网页访问',
        ],
      },
      {
        heading: 'MacSlim 会读取哪些信息',
        body: '这些信息只在本机读取，用于在界面上展示计算结果，不会被保存为可识别的用户画像，也不会离开你的 Mac。',
        bullets: [
          '进程列表 — 进程名、CPU 与内存占用、端口占用情况。用于进程管理页的排序、搜索和端口过滤',
          '已安装应用 — /Applications 等位置的 .app 条目。用于「应用程序」与「应用卸载」两个页面',
          '目录大小 — 各类缓存与日志目录占用的磁盘体积。用于智能扫描和缓存清理页的体积估算',
          '系统资源 — CPU、内存与磁盘用量。用于智能扫描页的环形图',
        ],
      },
      {
        heading: 'MacSlim 会修改什么',
        body: '以下操作**全部由你在界面上主动触发**，且每次执行前都有确认弹窗列出具体对象。它们不会在后台自动发生。',
        bullets: [
          '删除缓存与构建产物 — NPM / pnpm / Yarn / Cargo / Go / pip / Homebrew 缓存、Xcode DerivedData、Docker 数据',
          '清空废纸篓、删除崩溃报告、清理应用缓存与日志',
          '终止进程 — 优先发送 SIGTERM 终止信号，无响应时再强制结束；白名单与受保护项默认不允许终止',
          '退出应用 — 优雅退出（Apple Events）或强制退出',
          '卸载应用 — 并按你的逐项选择删除该应用留下的偏好设置、缓存与容器',
          '写本地记录 — 操作历史与白名单，保存在本机，用于回溯你做过什么',
        ],
      },
      {
        heading: '这些操作不可撤销',
        body: '这一点我们说在前面，而不是藏在协议里：',
        bullets: [
          '删除的缓存、包、镜像和构建产物无法恢复，只能重新下载或重新编译',
          '被终止的进程不会自动重启；如果是正在写文件的应用，未保存的工作可能丢失',
          '因此 MacSlim 不提供「一键回滚」。真正可回滚的只有白名单变更、设置项变更，以及被移入废纸篓的元数据',
        ],
      },
      {
        heading: 'Apple Events',
        body: '「应用程序」页里的优雅退出功能通过 Apple Events 向目标应用发送退出指令。macOS 会为此请求授权，你可以只允许特定应用，也可以随时在「系统设置 → 隐私与安全性 → 自动化」中撤销。拒绝授权不影响其他功能。',
        bullets: ['授权后仅用于发送退出指令', '不用于读取其他应用的内容', '可随时在系统设置中撤销'],
      },
      {
        heading: '完全磁盘访问权限（Full Disk Access）',
        body: 'Developer ID 版需要完全磁盘访问权限，才能遍历你的用户目录来统计缓存体积并执行清理。macOS 会在你首次触发扫描或清理时请求授权。',
        bullets: [
          '用途：统计缓存目录体积、删除缓存文件',
          '不授予也可以使用：仅系统级扫描（CPU / 内存 / 磁盘）、进程管理与历史记录仍可正常工作',
          '可随时在「系统设置 → 隐私与安全性 → 完全磁盘访问权限」中撤销',
          '未授权的目录无法统计，界面会显示为不可访问，而不是估算一个假数字',
        ],
      },
      {
        heading: '网站本身',
        body: '本页面所在的 vgoapp.com 是一个静态站点：',
        bullets: [
          '不使用 Cookie，不设置任何追踪 Cookie',
          '不使用第三方分析、广告或社交像素',
          '不收集表单数据（本页没有表单）',
          '下载链接指向静态托管的 .dmg 文件，不经过应用服务器',
        ],
      },
      {
        heading: '儿童',
        body: 'MacSlim 并非面向 13 岁以下儿童，也不会有意收集儿童数据 —— 事实上它不收集任何数据。',
      },
      {
        heading: '政策变更',
        body: '我们可能随产品演进而更新本政策，重大变更会体现在顶部的「最后更新」日期。如果将来 MacSlim 引入了任何联网功能，本政策会先更新，再上线该功能。',
      },
    ],
    contactHeading: '联系我们',
    contactBody: '如果你对本政策或 MacSlim 的数据处理方式有疑问，请发邮件给我们：',
    backLabel: '← 返回 MacSlim',
  },
  en: {
    title: 'Privacy Policy',
    updated: `Last updated: ${UPDATED}`,
    intro:
      'MacSlim is a macOS system maintenance tool that scans system state, clears caches and manages processes. This page describes what it **reads**, what it **modifies**, and what it **does not do at all**.',
    sections: [
      {
        heading: 'Summary',
        body: 'MacSlim runs entirely on your Mac. We have no server, no telemetry and no account, and we do no remote data collection of any kind.',
        bullets: [
          'Every scan, measurement and cleanup happens locally — no data is sent anywhere',
          'No analytics SDK, no crash reporting, no usage statistics',
          'No account, no sign-up, no user identifier, no cloud sync',
          'The one exception: clicking the download link in your browser, which is ordinary web access',
        ],
      },
      {
        heading: 'What MacSlim reads',
        body: 'This information is read on your machine to display results in the interface. It is not turned into a profile of you, and it never leaves your Mac.',
        bullets: [
          'Process list — process name, CPU and memory usage, port bindings. Used for sorting, search and port filtering in the process manager',
          'Installed applications — .app bundles found in /Applications and similar locations. Used by the Applications and App uninstaller screens',
          'Directory sizes — how much disk space each cache and log directory occupies. Used for the size estimates in smart scan and the cache cleaner',
          'System resources — CPU, memory and disk usage. Used for the ring charts in smart scan',
        ],
      },
      {
        heading: 'What MacSlim modifies',
        body: 'Everything below happens **only when you trigger it from the interface**, and every execution is preceded by a confirmation dialog listing the exact targets. Nothing runs in the background on its own.',
        bullets: [
          'Deleting caches and build artifacts — NPM / pnpm / Yarn / Cargo / Go / pip / Homebrew caches, Xcode DerivedData, Docker data',
          'Emptying the Trash, deleting crash reports, clearing app caches and logs',
          'Terminating processes — SIGTERM first, forced kill only if there is no response; allowlisted and protected processes are blocked by default',
          'Quitting applications — gracefully (Apple Events) or forcefully',
          'Uninstalling apps — plus deleting that app’s preferences, caches and containers, only for the items you tick',
          'Writing local records — action history and allowlist entries, kept on this machine so you can review what you did',
        ],
      },
      {
        heading: 'These actions are irreversible',
        body: 'We are telling you this up front rather than burying it in a policy:',
        bullets: [
          'Deleted caches, packages, images and build artifacts cannot be restored — they must be re-downloaded or rebuilt',
          'A terminated process does not restart itself, and if it was an app writing a file, unsaved work may be lost',
          'That is why MacSlim offers no "one-click undo". Genuinely reversible items are only allowlist changes, setting changes, and metadata moved to the Trash',
        ],
      },
      {
        heading: 'Apple Events',
        body: 'The graceful-quit action in the Applications screen sends an Apple Event asking the target app to exit. macOS asks for your permission the first time. You can allow specific apps, and revoke it at any time in System Settings → Privacy & Security → Automation. Declining does not affect other features.',
        bullets: [
          'Once granted, it is used only to send the quit instruction',
          'It is not used to read anything from other apps',
          'It can be revoked at any time in System Settings',
        ],
      },
      {
        heading: 'Full Disk Access',
        body: 'The Developer ID build needs Full Disk Access so it can walk your home folder, measure cache sizes and clear them. macOS requests this the first time you trigger a scan or a cleanup.',
        bullets: [
          'Purpose: measuring cache directory sizes and deleting cache files',
          'You can use MacSlim without it: system-level scanning (CPU / memory / disk), the process manager and history all keep working',
          'Revoke it any time in System Settings → Privacy & Security → Full Disk Access',
          'Directories it cannot read are reported as inaccessible rather than estimated with an invented number',
        ],
      },
      {
        heading: 'This website',
        body: 'The vgoapp.com page hosting this policy is a static site:',
        bullets: [
          'No cookies, and no tracking cookies are set',
          'No third-party analytics, advertising or social pixels',
          'No form data is collected (this page has no form)',
          'The download link points at a statically hosted .dmg file and does not go through an application server',
        ],
      },
      {
        heading: 'Children',
        body: 'MacSlim is not directed at children under 13, and we do not knowingly collect data from children — because we collect no data at all.',
      },
      {
        heading: 'Changes to this policy',
        body: 'We may update this policy as the product evolves, and material changes appear as a new "Last updated" date at the top. If MacSlim ever gains a networked feature, this policy will be updated first and shipped afterwards.',
      },
    ],
    contactHeading: 'Contact',
    contactBody: 'If you have questions about this policy or about how MacSlim handles data, email us:',
    backLabel: '← Back to MacSlim',
  },
}

function renderWithBold(text: string) {
  // Minimal **bold** support for the intro copy.
  const parts = text.split('**')
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>))
}

export default function MacSlimPrivacyPage() {
  const { language } = useLanguage()
  const c = content[language]

  useEffect(() => {
    document.title = `${c.title} — MacSlim`
    // LanguageProvider also writes document.title, and React runs child effects
    // before parent ones, so re-assert on the next frame to keep ours.
    const raf = requestAnimationFrame(() => {
      document.title = `${c.title} — MacSlim`
    })
    return () => cancelAnimationFrame(raf)
  }, [c])

  return (
    <>
      <GlowBackground />
      <Navbar homeHref="/macslim/" backLabel={c.backLabel} />
      <main className="pt-16 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={28} className="text-vgo-secondary" />
            <h1 className="text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-sm text-vgo-muted mb-8">{c.updated}</p>
          <p className="text-vgo-muted leading-relaxed mb-10">{renderWithBold(c.intro)}</p>

          <div className="space-y-8">
            {c.sections.map((s) => (
              <section key={s.heading} className="glass p-6">
                <h2 className="text-xl font-semibold mb-3">{s.heading}</h2>
                <p className="text-vgo-muted leading-relaxed">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-4 space-y-2 text-sm text-vgo-muted">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="text-vgo-primary mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="glass p-6 mt-8">
            <h2 className="text-xl font-semibold mb-3">{c.contactHeading}</h2>
            <p className="text-vgo-muted leading-relaxed">
              {c.contactBody}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-vgo-primary hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
