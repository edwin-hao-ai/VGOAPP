import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Download, Laptop, LayoutGrid, ShieldCheck, Smartphone, Sparkles, Wifi } from 'lucide-react'
import { GITHUB_URL } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { remoteCrabContent } from '../i18n/remotecrabContent'
import { remotecrabHome } from '../i18n/remotecrabHome'
import GlowBackground from '../components/GlowBackground'
import { ProductHeader } from '../components/remotecrab/ProductHeader'
import { ProductFooter } from '../components/remotecrab/ProductFooter'
import { Stage } from '../components/remotecrab/Stage'
import { ClipLightbox } from '../components/remotecrab/ClipLightbox'
import { FeatureGroups } from '../components/remotecrab/FeatureGroups'
import { PriceCards } from '../components/remotecrab/PriceCards'
import { SceneRows } from '../components/remotecrab/SceneRows'
import { InstallSteps } from '../components/remotecrab/InstallSteps'
import { LimitsBlock } from '../components/remotecrab/LimitsBlock'
import { ShotStrip } from '../components/remotecrab/ShotStrip'
import { RemoteScenarios } from '../components/remotecrab/RemoteScenarios'

export const DOWNLOAD_MAC_URL = '/downloads/RemoteCrab.dmg'
export const DOWNLOAD_WINDOWS_URL = '/downloads/RemoteCrab-Windows.msi'
export const APP_STORE_URL = 'https://apps.apple.com/app/id6811599153'
export const TESTFLIGHT_URL = 'https://testflight.apple.com/join/6VNNHAyx'


function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function RemoteCrabPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const c = remoteCrabContent[language]
  const h = remotecrabHome[language]
  const [platform, setPlatform] = useState<'mac' | 'windows'>(() =>
    typeof navigator !== 'undefined' && /Windows|Win64|WOW64/i.test(navigator.userAgent) ? 'windows' : 'mac',
  )
  const [clip, setClip] = useState<{ name: string; caption?: string } | null>(null)

  useEffect(() => {
    document.title = c.meta.title
    setMeta('description', c.meta.description)
  }, [c])

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
      <ProductHeader />

      <main>
        {/* Hero —— 一句承诺 + 一段真机实拍；只留一个主按钮，按平台切 */}
        <section className="relative px-6 pt-16 pb-14">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <motion.span
                {...fade(0.05)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs tracking-wide text-vgo-muted"
              >
                <Sparkles size={13} className="text-vgo-secondary" />
                {c.hero.eyebrow}
              </motion.span>

              <motion.h1
                {...fade(0.1)}
                className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight"
              >
                <span className="block">{c.hero.titleLine1}</span>
                <span className="block gradient-text">{c.hero.titleLine2}</span>
              </motion.h1>

              <motion.p {...fade(0.2)} className="mt-5 max-w-xl text-lg leading-relaxed text-vgo-muted">
                {c.hero.description}
              </motion.p>

              <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={platform === 'windows' ? DOWNLOAD_WINDOWS_URL : DOWNLOAD_MAC_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary px-7 py-3.5 font-semibold text-white shadow-lg shadow-vgo-primary/25 transition-shadow hover:shadow-vgo-primary/40"
                >
                  <Download size={18} />
                  {platform === 'windows' ? c.hero.downloadWindows : c.hero.downloadMac}
                  <span className="text-xs font-medium opacity-70">14 MB</span>
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3.5 font-semibold"
                >
                  <Smartphone size={18} />
                  {c.hero.appStore}
                  <span className="text-xs font-medium opacity-60">{language === 'zh' ? '免费' : 'Free'}</span>
                </a>
              </motion.div>

              <motion.p {...fade(0.4)} className="mt-4 font-mono text-xs text-vgo-muted/70">
                {c.hero.versionNote}
              </motion.p>
              <motion.p {...fade(0.42)} className="mt-1 text-xs text-vgo-muted/60">
                {c.hero.requirementsNote}
              </motion.p>

              {platform === 'mac' ? (
                <motion.p {...fade(0.45)} className="mt-2 text-[13px] text-vgo-muted/60">
                  {c.hero.switchPlatform}{' '}
                  <button
                    type="button"
                    onClick={() => setPlatform('windows')}
                    className="underline underline-offset-2 hover:text-vgo-text"
                  >
                    {c.hero.switchAction}
                  </button>
                </motion.p>
              ) : null}
            </div>

            <motion.div {...fade(0.15)}>
              <Stage
                language={language}
                name="hero"
                caption={c.hero.watchFull}
                onOpen={() => setClip({ name: 'hero', caption: c.hero.watchFull })}
              />
            </motion.div>
          </div>
        </section>

        {/* 四个高频场景 —— 每条一段真机片段（v2，中英各一套） */}
        <section id="scenes" className="px-6 py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl">
            <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
              {h.scenes.kicker}
            </motion.span>
            <motion.h2 {...fade(0.05)} className="mt-3 text-3xl font-bold md:text-4xl">
              {h.scenes.title}
            </motion.h2>
            <motion.p {...fade(0.1)} className="mt-4 max-w-2xl text-vgo-muted">
              {h.scenes.lead}
            </motion.p>
            <SceneRows
              items={h.scenes.items}
              language={language}
              caption={language === 'zh' ? '看这段原片' : 'Play the clip'}
              onOpen={(name) => setClip({ name, caption: language === 'zh' ? '看这段原片' : 'Play the clip' })}
            />
          </div>
        </section>

        {/* 四张截图 —— 视频之外的另一个角度：我手机上会看到什么 */}
        <section id="shots" className="px-6 py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl">
            <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
              {h.shots.kicker}
            </motion.span>
            <motion.h2 {...fade(0.05)} className="mt-3 text-3xl font-bold md:text-4xl">
              {h.shots.title}
            </motion.h2>
            <motion.p {...fade(0.1)} className="mt-4 max-w-2xl text-vgo-muted">
              {h.shots.lead}
            </motion.p>
            <motion.div {...fade(0.15)}>
              <ShotStrip c={h.shots} language={language} />
            </motion.div>
          </div>
        </section>

        {/* 你不在电脑前的时候 —— 三个场景，卖的是处境不是功能 */}
        <section id="remote" className="px-6 py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_360px]">
              <div>
                <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
                  {h.remote.kicker}
                </motion.span>
                <motion.h2 {...fade(0.05)} className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
                  {h.remote.title}
                </motion.h2>
                <motion.p {...fade(0.1)} className="mt-4 max-w-xl text-vgo-muted">
                  {h.remote.lead}
                </motion.p>
              </div>
              <motion.div {...fade(0.15)}>
                <Stage
                  language={language}
                  name="clip-computer-use"
                  caption={language === 'zh' ? '说一句，它在电脑上做完' : 'Say it; it gets done on the computer'}
                  onOpen={() =>
                    setClip({
                      name: 'clip-computer-use',
                      caption: language === 'zh' ? '说一句，它在电脑上做完' : 'Say it; it gets done on the computer',
                    })
                  }
                />
              </motion.div>
            </div>
            <motion.div {...fade(0.2)}>
              <RemoteScenarios c={h.remote} />
            </motion.div>
          </div>
        </section>

        {/* 全部功能 —— 20 组，14 组可点进各自的落地页 */}
        <section id="features" className="px-6 py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl">
            <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
              {h.features.kicker}
            </motion.span>
            <motion.h2 {...fade(0.05)} className="mt-3 text-3xl font-bold md:text-4xl">
              {h.features.title}
            </motion.h2>
            <motion.p {...fade(0.1)} className="mt-4 max-w-2xl text-vgo-muted">
              {h.features.lead}
            </motion.p>
            <motion.div {...fade(0.15)} className="mt-10">
              <FeatureGroups
                groups={h.features.groups}
                note={h.features.note}
                labels={{ video: language === 'zh' ? '视频' : 'video', paid: language === 'zh' ? '订阅' : 'paid' }}
              />
            </motion.div>
          </div>
        </section>

        {/* 它能到哪儿为止 —— 不点名任何竞品，只对照能力 */}
        <section id="limits" className="px-6 py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl">
            <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
              {h.limits.kicker}
            </motion.span>
            <motion.h2 {...fade(0.05)} className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">
              {h.limits.title}
            </motion.h2>
            <motion.p {...fade(0.1)} className="mt-4 max-w-2xl text-vgo-muted">
              {h.limits.lead}
            </motion.p>
            <motion.div {...fade(0.15)}>
              <LimitsBlock c={h.limits} labels={{ can: h.limits.canLabel, cannot: h.limits.cannotLabel }} />
            </motion.div>
          </div>
        </section>

        {/* 价格 —— 免费的边界写在首页，不藏在折叠的 FAQ 里 */}
        <section id="pricing" className="px-6 py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl">
            <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
              {h.price.kicker}
            </motion.span>
            <motion.h2 {...fade(0.05)} className="mt-3 text-3xl font-bold md:text-4xl">
              {h.price.title}
            </motion.h2>
            <motion.p {...fade(0.1)} className="mt-4 max-w-2xl text-vgo-muted">
              {h.price.lead}
            </motion.p>
            <motion.div {...fade(0.15)}>
              <PriceCards p={h.price} />
            </motion.div>
          </div>
        </section>

        {/* 旧截图墙（卡通头像 + 打码图）在首屏换成真机实拍之后就多余了，而且
            和新的画面语言冲突。场景图由真机片段承担，这里不再重复。 */}

        {/* 安装 —— 写成「你会在屏幕上看到什么」 */}
        <section id="install" className="px-6 py-16 scroll-mt-20">
          <div className="mx-auto max-w-5xl">
            <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
              {h.install.kicker}
            </motion.span>
            <motion.h2 {...fade(0.05)} className="mt-3 text-3xl font-bold md:text-4xl">
              {h.install.title}
            </motion.h2>
            <motion.p {...fade(0.1)} className="mt-4 max-w-2xl text-vgo-muted">
              {h.install.lead}
            </motion.p>
            <motion.div {...fade(0.15)}>
              <InstallSteps c={h.install} />
            </motion.div>
          </div>
        </section>

        {/* Requirements + Privacy */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
            <motion.div {...fade()} className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">{c.requirements.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-vgo-primary font-medium mb-3">
                    <Laptop size={18} /> {c.requirements.mac.title}
                  </div>
                  <ul className="space-y-2 text-sm text-vgo-muted">
                    {c.requirements.mac.items.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <Check size={15} className="text-vgo-secondary mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-vgo-primary font-medium mb-3">
                    <Smartphone size={18} /> {c.requirements.ios.title}
                  </div>
                  <ul className="space-y-2 text-sm text-vgo-muted">
                    {c.requirements.ios.items.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <Check size={15} className="text-vgo-secondary mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 flex items-start gap-2 text-sm text-vgo-muted">
                <Wifi size={16} className="text-vgo-primary mt-0.5 shrink-0" />
                <span>{c.requirements.note}</span>
              </p>
            </motion.div>

            <motion.div {...fade(0.08)} className="glass p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={24} className="text-vgo-secondary" />
                <h2 className="text-2xl font-bold">{c.privacy.title}</h2>
              </div>
              <p className="text-vgo-muted leading-relaxed">{c.privacy.body}</p>
              <ul className="mt-6 space-y-3">
                {c.privacy.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-vgo-text/90">
                    <Check size={16} className="text-vgo-secondary mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Context modes / app compatibility — the 18-suite registry gets its
            own page; this is the hook that makes people go there. */}
        <section className="px-6 pb-16">
          <motion.a
            href="/remotecrab/suites/"
            {...fade()}
            className="max-w-5xl mx-auto block glass glass-hover p-8 md:p-10 group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-vgo-primary/20 to-vgo-secondary/20 flex items-center justify-center">
                <LayoutGrid size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold">{c.compatibility.title}</h2>
                <p className="mt-2 text-vgo-muted leading-relaxed">{c.compatibility.body}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-vgo-secondary font-medium shrink-0">
                {c.compatibility.cta}
                <ArrowRight size={16} className="transition-transform motion-safe:group-hover:translate-x-1" />
              </span>
            </div>
          </motion.a>
        </section>

        {/* FAQ */}
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.faq.title}
            </motion.h2>
            <div className="mt-10 space-y-4">
              {c.faq.items.map((item, i) => (
                <motion.details key={item.question} {...fade(i * 0.04)} className="glass p-6 group">
                  <summary className="cursor-pointer list-none font-semibold flex items-center justify-between gap-4">
                    {item.question}
                    <ArrowRight
                      size={18}
                      className="text-vgo-muted motion-safe:transition-transform group-open:rotate-90 shrink-0"
                    />
                  </summary>
                  <p className="mt-4 text-sm text-vgo-muted leading-relaxed">{item.answer}</p>
                </motion.details>
              ))}
            </div>
            <p className="mt-8 text-center text-[13.5px] text-vgo-muted/70">
              {language === 'zh' ? '正在比较几种做法？' : 'Comparing the options?'}{' '}
              <a
                href="/remotecrab/alternatives/"
                className="text-vgo-secondary underline underline-offset-2 hover:text-vgo-primary"
              >
                {language === 'zh' ? '看这几种方式的对比 →' : 'See how they compare →'}
              </a>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20">
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
                <Smartphone size={18} /> {c.hero.downloadIOS}
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-vgo-muted hover:text-white motion-safe:transition-colors"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <ClipLightbox
        name={clip?.name ?? null}
        caption={clip?.caption}
        language={language}
        onClose={() => setClip(null)}
      />
      <ProductFooter />
    </>
  )
}
