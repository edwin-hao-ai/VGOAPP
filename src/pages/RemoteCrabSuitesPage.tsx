import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Download, Search, Smartphone, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { contextSuites } from '../i18n/remotecrabSuites'
import GlowBackground from '../components/GlowBackground'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DOWNLOAD_MAC_URL = '/downloads/RemoteCrab.dmg'
const APP_STORE_URL = 'https://apps.apple.com/app/id6811599153'

type Copy = {
  nav: { back: string }
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; subtitle: string; bullets: string[] }
  proof: { title: string; body: string }
  how: { title: string; steps: { title: string; body: string }[] }
  grid: { title: string; body: string; search: string; empty: string }
  fallback: { title: string; body: string }
  honesty: { title: string; items: string[] }
  cta: { title: string; body: string; download: string; ios: string }
  next: { title: string; body: string; cta: string; href: string }
}

const zh: Copy = {
  nav: { back: '← 所有功能' },
  meta: {
    title: '情景模式 — RemoteCrab 认识你电脑上的 49 个应用',
    description:
      'RemoteCrab 内置 18 套情景模式,自动识别前台应用并换成对应的按键:演示、终端、AI 助手、浏览器、邮件、会议、Xcode…… 共覆盖 49 个应用。',
  },
  hero: {
    eyebrow: '情景模式',
    title: '一个遥控器,不该只有一套按键',
    subtitle:
      '「下一页」在 Keynote 里是翻页,在 PDF 里是翻页,在浏览器里是滚屏。RemoteCrab 会看你在用哪个软件,然后把手机上的按键换成那一套 —— 你不需要记,它在切换。',
    bullets: [
      '18 套按键方案,跟着电脑前台应用自动切换',
      '覆盖 49 个真实应用,从 Keynote 到 Cursor 到飞书',
      '任何一个没收录的应用,都有兜底的一套通用按键',
    ],
  },
  proof: {
    title: '这不是一张我们自己写的清单',
    body: '下面每一个应用名都对应一个真实的 macOS bundle identifier,和 App 里的匹配规则是同一份数据 —— App 里加一个应用,这里就会同步多一个。',
  },
  how: {
    title: '它怎么知道你在用什么',
    steps: [
      { title: '电脑把前台应用告诉你', body: '连接时,电脑会持续播报当前在用的应用和它的窗口数。' },
      { title: '手机对照清单匹配', body: '按 bundle id 匹配到对应的一套按键,匹配不上的走兜底那一套。' },
      { title: '按键当场换掉', body: '你什么都不用点。切到终端是终端的键,切回浏览器是浏览器的键。' },
    ],
  },
  grid: {
    title: '18 套方案,覆盖 49 个应用',
    body: '搜一个应用名,或者看看每一套具体能做什么。',
    search: '搜索应用或场景,比如 Chrome、终端、演示',
    empty: '没找到。换个关键词试试 —— 没收录的应用也照样有兜底按键。',
  },
  fallback: {
    title: '没收录的应用也有按键',
    body: '上面 49 个是显式匹配的,其余任何应用都会落到兜底的那一套:音量增减、静音、屏幕亮度、锁屏、显示桌面。最常用的那几件事,永远按得到。',
  },
  honesty: {
    title: '关于这些快捷键',
    items: [
      '标注过「菜单核对」的组合键,是从对应 App 的真实菜单栏里读出来的,不是猜的。',
      'VSCode、Discord、飞书这类 Electron 应用不向辅助功能接口暴露菜单,所以用的是它们官方文档里的组合键。',
      '同一个按键在不同 App 里含义本来就不同 —— ⌘B 在 Xcode 是构建,在文本编辑器是加粗,在 VSCode 是切换侧边栏。这就是它们分属三套方案的原因。',
      '系统控制(音量、亮度、锁屏)通过系统定义的事件发出,不读取也不修改你的系统设置。',
    ],
  },
  cta: {
    title: '把它接到你的电脑上看',
    body: '下载电脑版,连上手机,打开情景模式 —— 按键会自己变。',
    download: '下载电脑版',
    ios: 'App Store 下载 iPhone 版',
  },
  next: {
    title: '不认识的应用,交给兜底',
    body: '就算你用一个 RemoteCrab 从没听过的软件,那套通用按键也一直在 —— 音量、亮度、锁屏、显示桌面。',
    cta: '看触控板 →',
    href: '/remotecrab/features/trackpad/',
  },
}

const en: Copy = {
  nav: { back: '← All features' },
  meta: {
    title: 'Context modes — RemoteCrab knows 49 apps on your computer',
    description:
      'RemoteCrab ships 18 context modes that switch to match whatever app is frontmost: presentations, terminals, AI assistants, browsers, mail, meetings, Xcode — covering 49 real apps.',
  },
  hero: {
    eyebrow: 'Context modes',
    title: 'One remote should not have one set of buttons',
    subtitle:
      '"Next" advances a slide in Keynote, advances a page in a PDF, and scrolls in a browser. RemoteCrab watches which app you are in and swaps the buttons on your phone to match. You do not have to remember anything — it switches on its own.',
    bullets: [
      '18 button sets, switched automatically by the frontmost app',
      '49 real apps covered, from Keynote to Cursor to Lark',
      'Any app not on the list still gets a sensible fallback set',
    ],
  },
  proof: {
    title: 'This is not a list we wrote by hand',
    body: 'Every app below maps to a real macOS bundle identifier, from the same data the app matches on. Add an app on the Swift side and it shows up here.',
  },
  how: {
    title: 'How it knows what you are using',
    steps: [
      { title: 'The computer tells the phone', body: 'While connected, the computer reports which app is frontmost and how many windows it has.' },
      { title: 'The phone matches the list', body: 'It looks up the bundle ID and picks that set; anything unmatched falls through to the fallback set.' },
      { title: 'The buttons change on the spot', body: 'You do not tap anything. Terminal in, terminal keys. Browser back, browser keys.' },
    ],
  },
  grid: {
    title: '18 sets, 49 apps',
    body: 'Search for an app, or browse what each set actually does.',
    search: 'Search an app or a situation — Chrome, terminal, presentation',
    empty: 'Nothing found. Try another word — apps that are not listed still get the fallback set.',
  },
  fallback: {
    title: 'Unlisted apps still get buttons',
    body: 'Those 49 are matched explicitly; everything else lands on the fallback set: volume up and down, mute, brightness, lock screen, show desktop. The things you press most are always one tap away.',
  },
  honesty: {
    title: 'About these shortcuts',
    items: [
      'Shortcuts marked menu-verified were read out of each app\'s real menu bar, not guessed.',
      'Electron apps (VSCode, Discord, Lark) do not expose their menus to the accessibility API, so those use the vendor\'s documented shortcuts.',
      'The same chord means different things in different apps — ⌘B builds in Xcode, bolds in a text editor, toggles the sidebar in VSCode. That is exactly why those live in three separate sets.',
      'System controls (volume, brightness, lock) are sent as system-defined events. Nothing reads or changes your system settings.',
    ],
  },
  cta: {
    title: 'Connect it and watch it switch',
    body: 'Download the desktop app, connect the phone, open the modes — the buttons change on their own.',
    download: 'Download for computer',
    ios: 'Get the iPhone app',
  },
  next: {
    title: 'Unknown apps go to the fallback',
    body: 'Even software RemoteCrab has never heard of gets the general set: volume, brightness, lock, show desktop.',
    cta: 'See trackpad →',
    href: '/remotecrab/features/trackpad/',
  },
}

export default function RemoteCrabSuitesPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const c = language === 'zh' ? zh : en
  const suites = contextSuites[language]
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = c.meta.title
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    let el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'description')
      document.head.appendChild(el)
    }
    el.setAttribute('content', c.meta.description)
  }, [c, language])

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return suites
    return suites.filter(
      (s) =>
        s.title.toLowerCase().includes(needle) ||
        s.blurb.toLowerCase().includes(needle) ||
        s.appText.toLowerCase().includes(needle),
    )
  }, [q, suites])

  const appCount = suites.reduce((n, s) => n + s.apps.length, 0)
  const fade = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.5, delay },
        }

  return (
    <>
      <GlowBackground />
      <Navbar homeHref="/remotecrab/" backLabel={c.nav.back} />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative px-6 pt-16 pb-10 flex flex-col items-center text-center">
          <motion.span
            {...fade(0.05)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-wide text-vgo-muted"
          >
            {c.hero.eyebrow}
          </motion.span>
          <motion.h1 {...fade(0.1)} className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl">
            {c.hero.title}
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-5 text-lg text-vgo-muted max-w-2xl leading-relaxed">
            {c.hero.subtitle}
          </motion.p>
          <motion.ul {...fade(0.3)} className="mt-9 space-y-3 text-left">
            {c.hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-vgo-text/90">
                <Check size={17} className="text-vgo-secondary mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.4)} className="mt-9 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={DOWNLOAD_MAC_URL}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
            >
              <Download size={17} /> {c.cta.download}
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass glass-hover font-semibold"
            >
              <Smartphone size={17} /> {c.cta.ios}
            </a>
          </motion.div>
        </section>

        {/* Real capture of the sheet itself */}
        <section className="px-6 pb-12">
          <motion.div {...fade()} className="max-w-5xl mx-auto flex justify-center">
            <div className="relative rounded-[2.75rem] p-2.5 bg-gradient-to-b from-white/25 to-white/5 border border-white/15 shadow-2xl shadow-black/60">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black/80 z-10" />
              <img
                src="/remotecrab/features/automation.jpg"
                alt={c.hero.title}
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
                className="w-[260px] sm:w-[300px] rounded-[2.25rem] block"
              />
            </div>
          </motion.div>
        </section>

        {/* Proof + how */}
        <section className="px-6 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold">
              {c.proof.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-5 text-vgo-muted leading-relaxed text-lg">
              {c.proof.body}
            </motion.p>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.how.title}
            </motion.h2>
            <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.how.steps.map((s, i) => (
                <motion.li key={s.title} {...fade(i * 0.06)} className="glass p-6">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-vgo-primary to-vgo-secondary text-white font-bold">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-vgo-muted leading-relaxed">{s.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Suite grid */}
        <section className="px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.grid.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted">
              {c.grid.body}
            </motion.p>

            <motion.div {...fade(0.1)} className="mt-8 max-w-md mx-auto relative">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-vgo-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={c.grid.search}
                aria-label={c.grid.search}
                className="w-full pl-11 pr-4 py-3 rounded-full glass text-sm placeholder:text-vgo-muted/70 focus:outline-none focus:ring-1 focus:ring-vgo-primary/50"
              />
            </motion.div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shown.map((s, i) => (
                <motion.div key={s.id} {...fade(Math.min(i, 6) * 0.03)} className="glass glass-hover p-6 flex flex-col">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <span className="text-[11px] uppercase tracking-wider text-vgo-muted">
                      {s.apps.length > 0 ? s.apps.length : '·'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-vgo-muted leading-relaxed flex-1">{s.blurb}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-vgo-muted">
                      {s.appLabel}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.apps.length > 0 ? (
                        s.apps.map((a) => (
                          <span
                            key={a}
                            className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] border border-white/10 text-vgo-text/80"
                          >
                            {a}
                          </span>
                        ))
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-vgo-primary/10 border border-vgo-primary/25 text-vgo-secondary">
                          {s.appText}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {shown.length === 0 && (
              <p className="mt-10 text-center text-vgo-muted">{c.grid.empty}</p>
            )}

            <motion.p {...fade()} className="mt-10 text-center text-sm text-vgo-muted">
              {appCount} {language === 'zh' ? '个应用 ·' : 'apps ·'} {suites.length}{' '}
              {language === 'zh' ? '套方案' : 'sets'}
            </motion.p>
          </div>
        </section>

        {/* Fallback */}
        <section className="px-6 py-10">
          <motion.div {...fade()} className="max-w-3xl mx-auto glass p-8 text-center">
            <Sparkles size={22} className="mx-auto text-vgo-secondary" />
            <h2 className="mt-4 text-2xl font-bold">{c.fallback.title}</h2>
            <p className="mt-3 text-vgo-muted leading-relaxed">{c.fallback.body}</p>
          </motion.div>
        </section>

        {/* Honesty */}
        <section className="px-6 py-10">
          <motion.div {...fade()} className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center">{c.honesty.title}</h2>
            <ul className="mt-8 space-y-3">
              {c.honesty.items.map((t) => (
                <li key={t} className="glass p-5 text-sm text-vgo-text/90 leading-relaxed">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Next */}
        <section className="px-6 py-10">
          <motion.a
            href={c.next.href}
            {...fade()}
            className="max-w-4xl mx-auto block glass glass-hover p-8 md:p-10"
          >
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold">{c.next.title}</h2>
                <p className="mt-3 text-vgo-muted leading-relaxed max-w-xl">{c.next.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-vgo-secondary font-medium">
                  {c.next.cta} <ArrowRight size={16} />
                </span>
              </div>
              <ArrowRight size={28} className="text-vgo-muted shrink-0 hidden md:block" />
            </div>
          </motion.a>
        </section>

        {/* CTA */}
        <section className="px-6 py-16">
          <motion.div {...fade()} className="max-w-3xl mx-auto glass p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{c.cta.title}</h2>
            <p className="mt-4 text-vgo-muted">{c.cta.body}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={DOWNLOAD_MAC_URL}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
              >
                <Download size={18} /> {c.cta.download}
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass glass-hover font-semibold"
              >
                <Smartphone size={18} /> {c.cta.ios}
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
