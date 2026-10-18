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
    updated: '最后更新：2026-10-18',
    intro:
      'RemoteCrab 是一个局域网工具，把你的 iPhone / iPad 变成 Mac 的摄像头、麦克风和输入设备。本页说明它处理哪些数据，以及它**不做**什么。',
    sections: [
      {
        heading: '概要',
        body: 'RemoteCrab 是本地优先的：不运行任何服务器、不收集分析数据、不需要账号。',
        bullets: [
          'iPhone 与 Mac 之间的媒体与输入流（画面、声音、触控、键盘、剪贴板、文件、通知）只走你的局域网',
          '通过 Bonjour 发现 + 局域网直连 TCP 传输，不经过我们的服务器（我们也没有服务器）',
          '唯一的例外是「问 AI」：只有你按下「问」的那一刻，才把你发出的那一问送到你自己配置的模型服务商（见下）',
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
          '剪贴板与文件 — 只有你主动「发送」时才传，用于两端互通与存盘',
          '投屏 / 扬声器 / 通知 — 由 Mac 发往 iPhone 的画面、系统声音与通知横幅（反向，同样只走局域网）',
        ],
      },
      {
        heading: '问 AI（可选，唯一会出局域网的路径）',
        body: '「问 AI」默认不启用；没有配置模型源时，它不会发送任何内容。你按下「问」的那一刻，以下内容由你的手机直接发送给你自己配置的模型服务商（例如 OpenAI、Anthropic、OpenRouter，或你自建的网关）：',
        bullets: [
          '你的问题 —— 打字的文本，或按住说话在手机端识别出的文本',
          '随行的屏幕画面（你正在看的那一帧）与剪贴板内容，用来让 AI 看懂上下文',
          '你的 API key 只保存在手机的钥匙串里，由手机直接发给该服务商',
        ],
      },
      {
        heading: '问 AI 的内容去了哪里',
        body: '我们不经手、不保存、也无法读取这些内容：请求从你的手机直达你选择的服务商，适用的是该服务商自己的隐私政策。不想用就关掉「问 AI」，其余功能完全不受影响。',
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
        bullets: [
          '相机 — 把 iPhone 画面实时传给 Mac',
          '麦克风 — 把 iPhone 声音实时传给 Mac',
          '语音识别 — 「按住说话」在手机端把语音转成文字，音频不上传',
          '照片 — 只在你选择「发送最新截图 / 照片」时读取，用于发到 Mac',
          '通知 — 只在 Mac 端开启「转发通知」时，用于在手机上显示 Mac 的通知横幅',
          '本地网络 — 在同一个 WiFi 上发现你的 Mac',
        ],
      },
      {
        heading: 'Mac 端申请的权限',
        body: 'macOS 会在首次使用时给出说明并请求授权，可随时在「系统设置 → 隐私与安全性」中更改。',
        bullets: [
          '辅助功能 — 用 iPhone 驱动 Mac 的光标与键盘',
          '相机扩展（可选）— 让其他 App 把 iPhone 当作摄像头',
          '麦克风驱动（可选）— 让其他 App 把 iPhone 当作麦克风',
          '屏幕录制（可选）— 用于把某个窗口投到手机上，以及「扬声器模式」采集系统声音',
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
    updated: 'Last updated: 2026-10-18',
    intro:
      'RemoteCrab is a local-network utility that turns your iPhone or iPad into a camera, microphone and input device for your Mac. This page describes what data it handles — and what it does **not** do.',
    sections: [
      {
        heading: 'Summary',
        body: 'RemoteCrab is local-first: we run no servers, collect no analytics and require no account.',
        bullets: [
          'The media and input stream between the iPhone and the Mac (video, audio, touch, keyboard, clipboard, files, notifications) stays on your local network',
          'Sent over Bonjour discovery and a direct TCP connection — it never passes through our servers (we have none)',
          'The one exception is Ask AI: only when you tap ask does the question you sent travel to the model provider you configured yourself (below)',
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
          'Clipboard and files — only when you actively send them, for two-way transfer and saving',
          'Mirroring / speaker mode / notifications — the screen, system audio and banners the Mac sends to the iPhone (the other direction, also LAN-only)',
        ],
      },
      {
        heading: 'Ask AI (optional, the only path that leaves your network)',
        body: 'Ask AI is off by default and sends nothing at all until you configure a model source. The moment you tap ask, the following goes directly from your phone to the model provider you configured (for example OpenAI, Anthropic, OpenRouter, or your own gateway):',
        bullets: [
          'Your question — the text you typed, or the text recognised on-device by hold-to-talk',
          'The attached screen image (the frame you were looking at) and the clipboard, so the AI can see the context',
          'Your API key lives only in the phone\'s Keychain and is sent to that provider by the phone itself',
        ],
      },
      {
        heading: 'Where Ask AI content goes',
        body: 'We never handle, store or read any of it: the request goes from your phone straight to the provider you chose, under that provider\'s privacy policy. Turn Ask AI off and everything else is unaffected.',
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
        bullets: [
          'Camera — send the live iPhone feed to your Mac',
          'Microphone — send live iPhone audio to your Mac',
          'Speech Recognition — hold-to-talk turns speech into text on the phone; the audio is not uploaded',
          'Photos — read only when you choose to send the latest screenshot or a photo to the Mac',
          'Notifications — only when notification forwarding is on, to show your Mac\'s banners on the phone',
          'Local Network — discover your Mac on the same WiFi',
        ],
      },
      {
        heading: 'Permissions requested by the Mac app',
        body: 'macOS explains and asks on first use; you can change this any time in System Settings → Privacy & Security.',
        bullets: [
          'Accessibility — drive the Mac cursor and keyboard from your iPhone',
          'Camera extension (optional) — let other apps use your iPhone as a camera',
          'Microphone driver (optional) — let other apps use your iPhone as a microphone',
          'Screen Recording (optional) — used to mirror a window to the phone and to capture system audio for speaker mode',
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
