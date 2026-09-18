import { useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'
import type { Language } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import GlowBackground from '../components/GlowBackground'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
    updated: '最后更新：2026-09-18',
    intro:
      'RemoteCrab 是一个局域网工具，把你的 iPhone / iPad 变成 Mac 的摄像头、麦克风和输入设备。本页说明它处理哪些数据，以及它**不做**什么。',
    sections: [
      {
        heading: '概要',
        body: 'RemoteCrab 是本地优先的：不运行任何服务器、不收集分析数据、不需要账号。',
        bullets: [
          '唯一处理的数据是 iPhone 与 Mac 之间的实时媒体与输入流',
          '通过 Bonjour 发现 + 局域网直连 TCP 传输',
          '不会有一个字节离开你的局域网',
        ],
      },
      {
        heading: '在 iPhone 与 Mac 之间传输的数据',
        body: '只有在你主动开启对应功能时，以下数据才会经本地 WiFi 发往 Mac：',
        bullets: [
          '摄像头 — H.264 视频（1080p / 30fps），用于 Mac 预览与虚拟摄像头',
          '麦克风 — 音频（48kHz），用于 Mac 播放与虚拟麦克风',
          '触控 — 坐标与修饰键，经 CGEventPost 驱动 Mac 光标',
          '键盘 — 按键与 UTF-8 文本，经 CGEventPost 驱动 Mac 输入',
        ],
      },
      {
        heading: '我们不会收集',
        body: 'RemoteCrab 没有后端服务器，也没有任何埋点。',
        bullets: [
          '无分析、无遥测（没有 Firebase、没有 Mixpanel）',
          '无崩溃上报，App 不主动联网回传',
          '无账号、无注册、无用户标识',
          '无云端录制：除非你通过接收端 App（如 Zoom 的录制）自行保存',
        ],
      },
      {
        heading: 'iOS 端申请的权限',
        body: '每一项都可以随时在「iOS 设置 → 隐私」中撤销，撤销后其余功能仍可使用。',
        bullets: ['相机 — 把 iPhone 画面实时传给 Mac', '麦克风 — 把 iPhone 声音实时传给 Mac', '本地网络 — 在同一个 WiFi 上发现你的 Mac'],
      },
      {
        heading: 'Mac 端申请的权限',
        body: 'macOS 会在首次使用时给出说明并请求授权，可随时在「系统设置 → 隐私与安全性」中更改。',
        bullets: [
          '辅助功能 — 用 iPhone 驱动 Mac 的光标与键盘',
          '相机扩展（可选）— 让其他 App 把 iPhone 当作摄像头',
          '麦克风驱动（可选）— 让其他 App 把 iPhone 当作麦克风',
        ],
      },
      {
        heading: '儿童',
        body: 'RemoteCrab 并非面向 13 岁以下儿童，也不会有意收集儿童数据 —— 事实上它不收集任何数据。',
      },
      {
        heading: '政策变更',
        body: '我们可能随产品演进而更新本政策，重大变更会体现在顶部的「最后更新」日期。',
      },
    ],
    contactHeading: '联系我们',
    contactBody: '如对本政策有疑问，请在 GitHub 上联系我们。',
    backLabel: '← 返回 RemoteCrab',
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: 2026-09-18',
    intro:
      'RemoteCrab is a local-network utility that turns your iPhone or iPad into a camera, microphone and input device for your Mac. This page describes what data it handles — and what it does **not** do.',
    sections: [
      {
        heading: 'Summary',
        body: 'RemoteCrab is local-first: we run no servers, collect no analytics and require no account.',
        bullets: [
          'The only data handled is the live media and input stream between your iPhone and your Mac',
          'Sent over Bonjour discovery and a direct TCP connection on your local network',
          'No bytes ever leave your network',
        ],
      },
      {
        heading: 'Data that flows between the iPhone and Mac',
        body: 'Only when you turn a feature on, the following is sent to the Mac over local WiFi:',
        bullets: [
          'Camera — H.264 video (1080p / 30fps) for the Mac preview and virtual camera',
          'Microphone — audio (48kHz) for Mac playback and the virtual microphone',
          'Touch — coordinates and modifier flags, driving the Mac cursor via CGEventPost',
          'Keyboard — key codes and UTF-8 text, driving Mac input via CGEventPost',
        ],
      },
      {
        heading: 'What we do not collect',
        body: 'RemoteCrab has no backend and no telemetry.',
        bullets: [
          'No analytics, no telemetry (no Firebase, no Mixpanel)',
          'No crash reporting — the app does not phone home',
          'No account, no sign-up, no user identifier',
          'No cloud recording: nothing is saved unless you do so yourself in the receiving app (e.g. Zoom)',
        ],
      },
      {
        heading: 'Permissions requested by the iOS app',
        body: 'Each can be revoked any time in iOS Settings → Privacy; the remaining features keep working.',
        bullets: ['Camera — send the live iPhone feed to your Mac', 'Microphone — send live iPhone audio to your Mac', 'Local Network — discover your Mac on the same WiFi'],
      },
      {
        heading: 'Permissions requested by the Mac app',
        body: 'macOS explains and asks on first use; you can change this any time in System Settings → Privacy & Security.',
        bullets: [
          'Accessibility — drive the Mac cursor and keyboard from your iPhone',
          'Camera extension (optional) — let other apps use your iPhone as a camera',
          'Microphone driver (optional) — let other apps use your iPhone as a microphone',
        ],
      },
      {
        heading: 'Children',
        body: 'RemoteCrab is not directed to children under 13, and we do not knowingly collect data from children — because we collect no data at all.',
      },
      {
        heading: 'Changes to this policy',
        body: 'We may update this policy as the product evolves. Material changes appear as a new "Last updated" date at the top.',
      },
    ],
    contactHeading: 'Contact',
    contactBody: 'If you have questions about this policy, reach us on GitHub.',
    backLabel: '← Back to RemoteCrab',
  },
}

const GITHUB_URL = 'https://github.com/edwin-hao-ai/RemoteCrab'

function renderWithBold(text: string) {
  // Minimal **bold** support for the intro copy.
  const parts = text.split('**')
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>))
}

export default function RemoteCrabPrivacyPage() {
  const { language } = useLanguage()
  const c = content[language]

  useEffect(() => {
    document.title = `${c.title} — RemoteCrab`
  }, [c])

  return (
    <>
      <GlowBackground />
      <Navbar homeHref="/remotecrab/" backLabel={c.backLabel} />
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
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-vgo-primary hover:text-white">
                {GITHUB_URL.replace('https://', '')}
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
