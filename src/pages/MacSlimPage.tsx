import { useEffect, type ComponentType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  AppWindow,
  ArrowRight,
  Check,
  Cpu,
  Download,
  ExternalLink,
  Gauge,
  History,
  Laptop,
  ListChecks,
  Lock,
  PackageX,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trash2,
  TriangleAlert,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { macSlimContent, type MacSlimFeatureItem } from '../i18n/macslimContent'
import GlowBackground from '../components/GlowBackground'
import MacSlimIcon from '../components/icons/MacSlimIcon'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * The release file name. Keep in sync with the JSON-LD `downloadUrl` in
 * `macslim/index.html` and the DMG published under /downloads/ on the VPS.
 */
export const DOWNLOAD_URL = 'https://vgoapp.com/downloads/MacSlim-1.0.1-aarch64.dmg'

export const PRIVACY_URL = '/macslim/privacy/'

/**
 * Screenshots live in `public/downloads/macslim/` and are served from
 * `/downloads/macslim/`. Eight files are expected — one per language per screen:
 *
 *   macslim-zh-scan.png        macslim-en-scan.png
 *   macslim-zh-process.png     macslim-en-process.png
 *   macslim-zh-cache.png       macslim-en-cache.png
 *   macslim-zh-uninstall.png   macslim-en-uninstall.png
 *
 * They are referenced directly as <img> with no placeholder block, so a missing
 * file shows a broken image rather than a fake UI. The slugs below are the
 * `macslim-<lang>-<slug>.png` infix and must stay in sync with that list.
 */
const SCREENSHOT_DIR = '/downloads/macslim'

const FEATURE_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  gauge: Gauge,
  cpu: Cpu,
  appWindow: AppWindow,
  trash: Trash2,
  uninstall: PackageX,
  history: History,
  settings: Settings,
  terminal: Terminal,
  listChecks: ListChecks,
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function MacSlimPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const c = macSlimContent[language]
  const screenshotLang = language === 'zh' ? 'zh' : 'en'

  useEffect(() => {
    document.title = c.meta.title
    setMeta('description', c.meta.description)
    // LanguageProvider sets document.title in its own effect, and React flushes
    // child effects before parent ones — so the provider's write lands last.
    // Re-assert on the next frame so the product title survives a language switch.
    const raf = requestAnimationFrame(() => {
      document.title = c.meta.title
    })
    return () => cancelAnimationFrame(raf)
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
      <Navbar homeHref="/" backLabel={c.nav.back} />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative px-6 pt-20 pb-16 flex flex-col items-center text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
            className="w-28 h-28 rounded-[28px] shadow-2xl shadow-vgo-primary/30 animate-float"
          >
            <MacSlimIcon size={112} className="w-full h-full" />
          </motion.div>
          <motion.span
            {...fade(0.1)}
            className="mt-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-vgo-muted"
          >
            <Sparkles size={14} className="text-vgo-secondary" />
            {c.hero.badge}
          </motion.span>
          <motion.h1 {...fade(0.15)} className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight">
            Mac<span className="gradient-text">Slim</span>
          </motion.h1>
          <motion.p {...fade(0.25)} className="mt-5 text-2xl md:text-3xl font-medium gradient-text max-w-3xl">
            {c.hero.tagline}
          </motion.p>
          <motion.p {...fade(0.35)} className="mt-5 text-lg text-vgo-muted max-w-2xl leading-relaxed">
            {c.hero.description}
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
            >
              <Download size={18} /> {c.hero.download}
            </a>
            <a
              href="#app-store"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass glass-hover font-semibold"
            >
              <Rocket size={18} /> {c.hero.appStoreSoon}
            </a>
          </motion.div>

          <motion.p {...fade(0.55)} className="mt-6 text-sm text-vgo-muted">
            {c.hero.trust}
          </motion.p>
          <motion.p {...fade(0.6)} className="mt-2 text-xs text-vgo-muted/80">
            {c.hero.requirementsNote}
          </motion.p>

          {/* Product shot — a real screenshot, framed, right under the hero copy */}
          <motion.div {...fade(0.7)} className="mt-14 w-full max-w-4xl">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-vgo-primary/20 bg-vgo-card">
              <img
                src={`${SCREENSHOT_DIR}/macslim-${screenshotLang}-scan.png`}
                alt={c.screenshots.items[0]?.caption ?? 'MacSlim'}
                width={1800}
                height={1200}
                className="w-full block"
              />
            </div>
          </motion.div>
        </section>

        {/* Features — the seven screens */}
        <section id="features" className="px-6 py-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.features.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted max-w-2xl mx-auto">
              {c.features.description}
            </motion.p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.features.items.map((item: MacSlimFeatureItem, i: number) => {
                const Icon = FEATURE_ICONS[item.icon] ?? Sparkles
                return (
                  <motion.div key={item.title} {...fade(i * 0.04)} className="glass glass-hover p-6">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-vgo-primary/20 to-vgo-secondary/20 flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-vgo-muted leading-relaxed">{item.body}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Screenshots — real UI, no concept art, per language */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.screenshots.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted max-w-2xl mx-auto">
              {c.screenshots.description}
            </motion.p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.screenshots.items.map((item, i) => (
                <motion.figure key={item.slug} {...fade(i * 0.05)} className="glass glass-hover overflow-hidden">
                  <img
                    src={`${SCREENSHOT_DIR}/macslim-${screenshotLang}-${item.slug}.png`}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full border-b border-white/[0.08]"
                  />
                  <figcaption className="px-5 py-3 text-xs text-vgo-muted">{item.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* The three differentiators */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.why.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted max-w-2xl mx-auto">
              {c.why.description}
            </motion.p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.why.items.map((item, i) => {
                const Icon = FEATURE_ICONS[item.icon] ?? Sparkles
                return (
                  <motion.div key={item.title} {...fade(i * 0.06)} className="glass p-7">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vgo-primary/20 to-vgo-secondary/20 flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-vgo-muted leading-relaxed">{item.body}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.steps.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted max-w-2xl mx-auto">
              {c.steps.description}
            </motion.p>

            <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.steps.items.map((step, i) => (
                <motion.li key={step.title} {...fade(i * 0.06)} className="glass p-6">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-vgo-primary to-vgo-secondary text-white font-bold">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-vgo-muted leading-relaxed">{step.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Requirements + confirmation-before-acting */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
            <motion.div {...fade()} className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">{c.requirements.title}</h2>
              <ul className="space-y-2 text-sm text-vgo-muted">
                {c.requirements.items.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Check size={15} className="text-vgo-secondary mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-start gap-2 text-sm text-vgo-muted">
                <Laptop size={16} className="text-vgo-primary mt-0.5 shrink-0" />
                <span>{c.requirements.note}</span>
              </p>
            </motion.div>

            <motion.div {...fade(0.08)} className="glass p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={24} className="text-vgo-secondary" />
                <h2 className="text-2xl font-bold">{c.safety.title}</h2>
              </div>
              <p className="text-vgo-muted leading-relaxed">{c.safety.body}</p>
              <ul className="mt-6 space-y-3">
                {c.safety.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-vgo-text/90">
                    <Check size={16} className="text-vgo-secondary mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* The risk notice. Deliberately loud: this is the part users must not skim. */}
        <section className="px-6 pb-16">
          <motion.div
            {...fade()}
            className="max-w-5xl mx-auto rounded-3xl backdrop-blur-xl bg-amber-400/[0.04] border border-amber-400/25 p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <TriangleAlert size={24} className="text-amber-300 shrink-0" />
              <h2 className="text-2xl font-bold text-amber-200">{c.risk.title}</h2>
            </div>
            <p className="text-vgo-muted leading-relaxed">{c.risk.body}</p>
            <ul className="mt-6 space-y-3">
              {c.risk.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-vgo-text/90">
                  <span className="text-amber-300 mt-0.5 shrink-0">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* App Store preview + privacy, side by side */}
        <section id="app-store" className="px-6 py-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
            <motion.div {...fade()} className="glass p-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vgo-primary/15 text-vgo-primary text-xs font-medium">
                <Rocket size={13} /> {c.appStore.badge}
              </span>
              <h2 className="mt-5 text-2xl font-bold">{c.appStore.title}</h2>
              <p className="mt-4 text-vgo-muted leading-relaxed">{c.appStore.body}</p>
              <ul className="mt-6 space-y-3">
                {c.appStore.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-vgo-text/90">
                    <Check size={16} className="text-vgo-secondary mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade(0.08)} className="glass p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={24} className="text-vgo-secondary" />
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
              <a
                href={PRIVACY_URL}
                className="mt-7 inline-flex items-center gap-2 text-vgo-secondary font-medium motion-safe:transition-colors hover:text-white"
              >
                {c.privacy.linkLabel}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
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
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20">
          <motion.div {...fade()} className="max-w-3xl mx-auto glass p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{c.cta.title}</h2>
            <p className="mt-4 text-vgo-muted">{c.cta.body}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={DOWNLOAD_URL}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
              >
                <Download size={18} /> {c.cta.download}
              </a>
              <a
                href={PRIVACY_URL}
                className="inline-flex items-center gap-2 text-vgo-muted hover:text-white motion-safe:transition-colors"
              >
                <ExternalLink size={16} /> {c.privacy.linkLabel}
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
