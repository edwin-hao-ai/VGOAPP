import { useEffect, useState, type ComponentType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  AudioLines,
  Camera,
  Check,
  Download,
  FolderUp,
  Keyboard,
  LayoutGrid,
  Mic,
  Monitor,
  MonitorPlay,
  MousePointer2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Wifi,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import {
  FEATURE_ORDER,
  remoteCrabFeatures,
  type FeaturePageContent,
  type FeatureSlug,
} from '../i18n/remotecrabFeatures'
import GlowBackground from '../components/GlowBackground'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DOWNLOAD_MAC_URL = '/downloads/RemoteCrab.dmg'
const APP_STORE_URL = 'https://apps.apple.com/app/id6811599153'

const FEATURE_ICONS: Record<FeatureSlug, ComponentType<{ size?: number; className?: string }>> = {
  'extended-display': Monitor,
  camera: Camera,
  microphone: Mic,
  'screen-mirror': MonitorPlay,
  trackpad: MousePointer2,
  keyboard: Keyboard,
  voice: AudioLines,
  'app-switcher': LayoutGrid,
  transfer: FolderUp,
  automation: SlidersHorizontal,
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

/** Renders `**bold**` spans without pulling in a markdown parser. */
function RichText({ text }: { text: string }) {
  const parts = text.split('**')
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-vgo-text">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

function slugFromPath(): FeatureSlug {
  const m = window.location.pathname.match(/\/features\/([a-z-]+)\/?$/)
  const slug = m?.[1] as FeatureSlug | undefined
  return slug && (FEATURE_ORDER as string[]).includes(slug) ? slug : FEATURE_ORDER[0]
}

export default function RemoteCrabFeaturePage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const slug = slugFromPath()
  const c = remoteCrabFeatures[language][slug] as FeaturePageContent
  const Icon = FEATURE_ICONS[slug] ?? Sparkles

  // Per-feature art is optional: a real capture of the app sits at
  // public/remotecrab/features/<slug>.jpg. Written by
  // `scripts/capture-feature-shots.sh` in the iBridge repo, so the page
  // always shows the shipping UI rather than a mock.
  //
  // The product UI is localised, so there is one capture per language: an
  // English page showing a Chinese screenshot reads as a different app. The
  // localised file is `<slug>-en.jpg`; the un-suffixed one is zh-Hans. Falls
  // back through the other locale, then to the typographic panel.
  const [artSrc, setArtSrc] = useState<string | null>(null)
  useEffect(() => {
    setArtSrc(
      `/remotecrab/features/${slug}${language === 'en' ? '-en' : ''}.jpg`,
    )
  }, [slug, language])

  useEffect(() => {
    document.title = `${c.hero.title} — RemoteCrab`
    setMeta('description', c.hero.subtitle)
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
      <Navbar homeHref="/remotecrab/" backLabel={c.nav.back} />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative px-6 pt-16 pb-12 flex flex-col items-center text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
            className="mt-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-vgo-primary/25 to-vgo-secondary/25 flex items-center justify-center"
          >
            <Icon size={38} className="text-vgo-secondary" />
          </motion.div>

          <motion.span
            {...fade(0.1)}
            className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-wide text-vgo-muted"
          >
            {c.hero.eyebrow}
          </motion.span>

          <motion.h1
            {...fade(0.15)}
            className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl"
          >
            {c.hero.title}
          </motion.h1>

          <motion.p {...fade(0.25)} className="mt-5 text-lg text-vgo-muted max-w-2xl leading-relaxed">
            {c.hero.subtitle}
          </motion.p>

          <motion.ul {...fade(0.35)} className="mt-9 space-y-3 text-left">
            {c.hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-vgo-text/90">
                <Check size={17} className="text-vgo-secondary mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.45)} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
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

        {/* Real capture of the shipping app. These are 1206×2622 phone
            screenshots, so they sit in a device frame rather than
            full-bleed — a full-bleed portrait shot on a 1920-wide page
            would shrink the UI to unreadable. */}
        <section className="px-6 pb-4">
          <motion.div {...fade()} className="max-w-5xl mx-auto">
            {artSrc ? (
              <div className="flex justify-center">
                <div className="relative rounded-[2.75rem] p-2.5 bg-gradient-to-b from-white/25 to-white/5 border border-white/15 shadow-2xl shadow-black/60">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black/80 z-10" />
                  <img
                    src={artSrc}
                    alt={c.hero.title}
                    onError={() => {
                      // Missing the localised capture: fall back to the other
                      // locale, then to the typographic panel.
                      const wanted = language === 'en' ? '-en' : ''
                      const other = language === 'en' ? '' : '-en'
                      setArtSrc(
                        artSrc.includes(wanted)
                          ? `/remotecrab/features/${slug}${other}.jpg`
                          : null,
                      )
                    }}
                    className="w-[260px] sm:w-[300px] rounded-[2.25rem] block"
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full border border-white/10 shadow-2xl rounded-3xl bg-gradient-to-br from-vgo-primary/12 via-transparent to-vgo-secondary/12 flex items-center justify-center">
                <div className="text-center px-8">
                  <Icon size={56} className="mx-auto text-vgo-secondary/70" />
                  <p className="mt-4 text-sm text-vgo-muted">
                    {c.hero.eyebrow} · RemoteCrab
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* Problem */}
        <section className="px-6 py-14">
          <motion.div {...fade()} className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold">{c.problem.title}</h2>
            <p className="mt-5 text-vgo-muted leading-relaxed text-lg">{c.problem.body}</p>
          </motion.div>
        </section>

        {/* How */}
        <section className="px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.how.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted max-w-2xl mx-auto">
              {c.how.description}
            </motion.p>
            <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.how.steps.map((step, i) => (
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

        {/* Details */}
        <section className="px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.details.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted max-w-2xl mx-auto">
              {c.details.description}
            </motion.p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.details.items.map((item, i) => (
                <motion.div key={item.title} {...fade(i * 0.04)} className="glass glass-hover p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-vgo-primary/20 to-vgo-secondary/20 flex items-center justify-center">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1.5 text-sm text-vgo-muted leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="px-6 py-10">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fade()} className="text-3xl md:text-4xl font-bold text-center">
              {c.tips.title}
            </motion.h2>
            {c.tips.description ? (
              <motion.p {...fade(0.05)} className="mt-4 text-center text-vgo-muted">
                {c.tips.description}
              </motion.p>
            ) : null}
            <ul className="mt-10 space-y-3">
              {c.tips.items.map((tip, i) => (
                <motion.li key={tip} {...fade(i * 0.04)} className="glass p-5 text-vgo-text/90 leading-relaxed">
                  <RichText text={tip} />
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Requires */}
        <section className="px-6 py-10">
          <motion.div {...fade()} className="max-w-3xl mx-auto glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={22} className="text-vgo-secondary" />
              <h2 className="text-2xl font-bold">{c.requires.title}</h2>
            </div>
            <ul className="space-y-3">
              {c.requires.items.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-vgo-text/90">
                  <Check size={16} className="text-vgo-secondary mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 text-sm text-vgo-muted border-t border-white/10 pt-5">
              <Wifi size={16} className="text-vgo-primary mt-0.5 shrink-0" />
              <span>{c.requires.note}</span>
            </p>
          </motion.div>
        </section>

        {/* Next feature */}
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
