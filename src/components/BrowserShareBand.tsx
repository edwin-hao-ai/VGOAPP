import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

/// **The big card on the homepage.**
///
/// It is deliberately **not** a product card: browser viewing is a capability of
/// RemoteCrab, and the grid above is "what VGO ships". What it is instead is a
/// full-width band — the same weight as a primary card, without claiming to be a
/// second product — because it is the one line in the whole product list that is
/// about *somebody else's* machine: a browser, no install, nothing to sign up for.
///
/// The media is the 19-second recording of the real page (CDP screencast of the
/// shipping viewer, not a mock), silent and looping, with a poster frame so the
/// band has something to show before it loads.
export default function BrowserShareBand({
  /** The section's anchor. Two pages render this band, so the ids must differ. */
  id = 'browser',
  /** The product page already has its own hero type scale; the band steps down. */
  compact = false,
}: { id?: string; compact?: boolean } = {}) {
  const { t, language } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  // `t()` returns strings only, so the bullet list is read from the table it
  // comes from — the same table the rest of the page reads.
  const points = translations[language].browserBand.points

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.5, delay },
        }

  return (
    <section id={id} className={compact ? 'py-6' : 'px-6 py-20'}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          {...reveal()}
          className={'glass overflow-hidden rounded-3xl border-vgo-primary/25' + (compact ? '' : '')}
        >
          <div className={
            'grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] ' +
            (compact ? 'p-7 md:p-9' : 'p-8 md:p-12')
          }>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-vgo-primary/30 bg-vgo-primary/10 px-3 py-1 text-xs tracking-[0.12em] text-vgo-primary">
                <Globe size={13} />
                {t('browserBand.eyebrow')}
              </span>

              <h2 className={
                'mt-5 font-bold leading-tight ' +
                (compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-[40px] md:leading-[1.12]')
              }>
                {t('browserBand.title')}
              </h2>

              <p className="mt-4 max-w-xl leading-relaxed text-vgo-muted">
                {t('browserBand.body')}
              </p>

              <ul className="mt-6 space-y-2.5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-vgo-text/90">
                    <Check size={16} className="mt-0.5 shrink-0 text-vgo-secondary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="/remotecrab/features/browser/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-vgo-primary to-vgo-secondary px-5 py-2.5 font-semibold text-[#0a0a0f]"
                >
                  {t('browserBand.cta')} <ArrowRight size={17} />
                </a>
                <a
                  href="/remotecrab/r/"
                  className="text-sm text-vgo-primary underline-offset-4 hover:underline"
                >
                  {t('browserBand.codeCta')}
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[240px] md:max-w-[260px]">
              <div className="rounded-[30px] border border-white/12 bg-[#1a1a22] p-2 shadow-[0_24px_60px_rgba(0,0,0,.55)]">
                <video
                  className="w-full rounded-[22px]"
                  src="/remotecrab/browser-demo.mp4"
                  poster="/remotecrab/browser-band.jpg"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
