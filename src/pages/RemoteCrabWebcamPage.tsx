import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Download, Smartphone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { remotecrabWebcam } from '../i18n/remotecrabWebcam'
import GlowBackground from '../components/GlowBackground'
import { ProductHeader } from '../components/remotecrab/ProductHeader'
import { ProductFooter } from '../components/remotecrab/ProductFooter'

const DOWNLOAD_MAC_URL = '/downloads/RemoteCrab.dmg'
const APP_STORE_URL = 'https://apps.apple.com/app/id6811599153'

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function RemoteCrabWebcamPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const c = remotecrabWebcam[language]

  useEffect(() => {
    document.title = c.meta.title
    setMeta('description', c.meta.description)
  }, [c])

  const fade = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.5, delay },
        }

  return (
    <>
      <GlowBackground />
      <ProductHeader />

      <main>
        <section className="px-6 pb-8 pt-14">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
                {c.hero.kicker}
              </motion.span>
              <motion.h1
                {...fade(0.05)}
                className="mt-4 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight"
              >
                {c.hero.title}
              </motion.h1>
              <motion.p {...fade(0.1)} className="mt-5 max-w-xl text-lg leading-relaxed text-vgo-muted">
                {c.hero.lead}
              </motion.p>
              <motion.ul {...fade(0.15)} className="mt-6 grid gap-2">
                {c.hero.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[14.5px] text-vgo-text/90">
                    <Check size={16} className="mt-[3px] shrink-0 text-emerald-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div {...fade(0.2)} className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={DOWNLOAD_MAC_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary px-7 py-3.5 font-semibold text-white shadow-lg shadow-vgo-primary/25"
                >
                  <Download size={18} /> {c.hero.ctaPrimary}
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3.5 font-semibold"
                >
                  <Smartphone size={18} /> {c.hero.ctaSecondary}
                </a>
              </motion.div>
            </div>

            <motion.div {...fade(0.1)} className="relative mx-auto w-full max-w-[300px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[4rem] bg-[url('/remotecrab/features/camera.jpg')] bg-cover bg-center opacity-25 blur-3xl"
              />
              <div className="overflow-hidden rounded-[2.4rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.14] to-white/[0.02] p-2.5 shadow-[0_40px_90px_-34px_rgba(0,0,0,.95)]">
                <img
                  src={`/remotecrab/features/camera${language === 'en' ? '-en' : ''}.jpg`}
                  alt={c.hero.title}
                  onError={(e) => {
                    const img = e.currentTarget
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1'
                      img.src = '/remotecrab/features/camera.jpg'
                    }
                  }}
                  className="block w-full rounded-[1.9rem]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <motion.h2 {...fade()} className="text-2xl font-bold md:text-3xl">
              {c.steps.title}
            </motion.h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {c.steps.items.map((s, i) => (
                <motion.div key={s.num} {...fade(i * 0.05)} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-vgo-primary/30 bg-vgo-primary/15 text-sm font-semibold text-vgo-secondary">
                    {s.num}
                  </div>
                  <h3 className="mt-4 text-[16.5px] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-vgo-muted">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <motion.h2 {...fade()} className="text-2xl font-bold md:text-3xl">
              {c.why.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-3 max-w-2xl text-vgo-muted">
              {c.why.lead}
            </motion.p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {c.why.items.map((w, i) => (
                <motion.div key={w.title} {...fade(i * 0.05)} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-[16px] font-semibold">{w.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-vgo-muted">{w.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <motion.h2 {...fade()} className="text-2xl font-bold md:text-3xl">
              {c.apps.title}
            </motion.h2>
            <motion.p {...fade(0.05)} className="mt-3 text-vgo-muted">
              {c.apps.lead}
            </motion.p>
            <motion.div {...fade(0.1)} className="mt-6 flex flex-wrap gap-2.5">
              {c.apps.list.map((app) => (
                <span
                  key={app}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13.5px] text-vgo-text/85"
                >
                  {app}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-3xl">
            <motion.h2 {...fade()} className="text-2xl font-bold md:text-3xl">
              {c.faq.title}
            </motion.h2>
            <div className="mt-6 grid gap-3">
              {c.faq.items.map((item, i) => (
                <motion.details key={item.q} {...fade(i * 0.04)} className="glass p-5 group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.q}
                    <ArrowRight
                      size={18}
                      className="shrink-0 text-vgo-muted motion-safe:transition-transform group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-vgo-muted">{item.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{c.cta.title}</h2>
            <p className="mt-3 text-vgo-muted">{c.cta.body}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={DOWNLOAD_MAC_URL}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary px-7 py-3.5 font-semibold text-white shadow-lg shadow-vgo-primary/25"
              >
                <Download size={18} /> {c.cta.download}
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3.5 font-semibold"
              >
                <Smartphone size={18} /> {c.cta.ios}
              </a>
            </div>
          </div>
        </section>
      </main>

      <ProductFooter />
    </>
  )
}
