import { useEffect, type ComponentType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  AudioLines,
  Camera,
  Check,
  ClipboardList,
  Download,
  FolderUp,
  Keyboard,
  Laptop,
  LayoutGrid,
  Mic,
  MousePointer2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
} from 'lucide-react'
import { GITHUB_URL } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { remoteCrabContent, type FeatureItem } from '../i18n/remotecrabContent'
import GlowBackground from '../components/GlowBackground'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const DOWNLOAD_MAC_URL = '/downloads/RemoteCrab.dmg'
export const APP_STORE_URL = 'https://apps.apple.com/app/id6811599153'

const FEATURE_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  camera: Camera,
  mic: Mic,
  trackpad: MousePointer2,
  keyboard: Keyboard,
  voice: AudioLines,
  files: FolderUp,
  clipboard: ClipboardList,
  appSwitcher: LayoutGrid,
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

export default function RemoteCrabPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const c = remoteCrabContent[language]

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
      <Navbar homeHref="/" backLabel={c.nav.back} />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative px-6 pt-20 pb-16 flex flex-col items-center text-center">
          <motion.img
            src="/remotecrab-icon.png"
            alt="RemoteCrab"
            width={112}
            height={112}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
            className="w-28 h-28 rounded-[28px] shadow-2xl shadow-vgo-primary/30 animate-float"
          />
          <motion.span
            {...fade(0.1)}
            className="mt-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-vgo-muted"
          >
            <Sparkles size={14} className="text-vgo-secondary" />
            {c.hero.badge}
          </motion.span>
          <motion.h1 {...fade(0.15)} className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight">
            Remote<span className="gradient-text">Crab</span>
          </motion.h1>
          <motion.p {...fade(0.25)} className="mt-5 text-2xl md:text-3xl font-medium gradient-text max-w-3xl">
            {c.hero.tagline}
          </motion.p>
          <motion.p {...fade(0.35)} className="mt-5 text-lg text-vgo-muted max-w-2xl leading-relaxed">
            {c.hero.description}
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={DOWNLOAD_MAC_URL}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
            >
              <Download size={18} /> {c.hero.downloadMac}
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass glass-hover font-semibold"
            >
              <Smartphone size={18} /> {c.hero.downloadIOS}
            </a>
          </motion.div>

          <motion.p {...fade(0.55)} className="mt-6 text-sm text-vgo-muted">
            {c.hero.free}
          </motion.p>
          <motion.p {...fade(0.6)} className="mt-2 text-xs text-vgo-muted/80">
            {c.hero.requirementsNote}
          </motion.p>
        </section>

        {/* Features */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.features.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted max-w-2xl mx-auto">
              {c.features.description}
            </motion.p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.features.items.map((item: FeatureItem, i: number) => {
                const Icon = FEATURE_ICONS[item.icon] ?? Sparkles
                return (
                  <motion.article key={item.title} {...fade(i * 0.04)} className="glass glass-hover p-6">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-vgo-primary/20 to-vgo-secondary/20 flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-vgo-muted leading-relaxed">{item.body}</p>
                  </motion.article>
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
                href={DOWNLOAD_MAC_URL}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary text-white font-semibold shadow-lg shadow-vgo-primary/25 hover:shadow-vgo-primary/40 transition-shadow"
              >
                <Download size={18} /> {c.cta.download}
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

      <Footer />
    </>
  )
}
