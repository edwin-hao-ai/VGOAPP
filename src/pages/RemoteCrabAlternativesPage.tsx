import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Download, Minus, Smartphone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { remotecrabAlternatives } from '../i18n/remotecrabAlternatives'
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

export default function RemoteCrabAlternativesPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const c = remotecrabAlternatives[language]

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
        <section className="px-6 pt-16 pb-10">
          <div className="mx-auto max-w-4xl">
            <motion.span {...fade()} className="text-xs uppercase tracking-[0.14em] text-vgo-secondary">
              {c.hero.kicker}
            </motion.span>
            <motion.h1
              {...fade(0.05)}
              className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl"
            >
              {c.hero.title}
            </motion.h1>
            <motion.p {...fade(0.1)} className="mt-5 max-w-3xl text-lg leading-relaxed text-vgo-muted">
              {c.hero.lead}
            </motion.p>
          </div>
        </section>

        <section className="px-6 pb-4">
          <div className="mx-auto grid max-w-4xl gap-4">
            {c.options.map((o, i) => (
              <motion.div
                key={o.name}
                {...fade(i * 0.05)}
                className={
                  'rounded-2xl border p-6 ' +
                  (o.tone === 'ours'
                    ? 'border-vgo-primary/30 bg-gradient-to-br from-vgo-primary/10 to-vgo-secondary/[0.04]'
                    : 'border-white/10 bg-white/[0.02]')
                }
              >
                <h2 className="flex flex-wrap items-center gap-2 text-xl font-bold">
                  {o.name}
                  {o.tone === 'ours' ? (
                    <span className="rounded-full border border-vgo-primary/30 bg-vgo-primary/10 px-2 py-[1px] text-[10px] font-medium text-vgo-secondary">
                      {language === 'zh' ? '这一个' : 'This one'}
                    </span>
                  ) : null}
                </h2>
                <p className="mt-1.5 text-[14px] text-vgo-muted">{o.who}</p>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.1em] text-vgo-muted/60">
                      {language === 'zh' ? '好处' : 'Good'}
                    </div>
                    <ul className="mt-2 grid gap-1.5">
                      {o.good.map((g) => (
                        <li key={g} className="flex gap-2 text-[14px] text-vgo-muted">
                          <Check size={14} className="mt-[5px] shrink-0 text-emerald-400" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.1em] text-vgo-muted/60">
                      {language === 'zh' ? '代价' : 'Cost'}
                    </div>
                    <ul className="mt-2 grid gap-1.5">
                      {o.cost.map((g) => (
                        <li key={g} className="flex gap-2 text-[14px] text-vgo-muted">
                          <Minus size={14} className="mt-[5px] shrink-0 text-white/30" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <motion.h2 {...fade()} className="text-2xl font-bold md:text-3xl">
              {c.table.title}
            </motion.h2>
            <motion.div {...fade(0.05)} className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[560px] border-collapse text-[14px]">
                <thead>
                  <tr className="bg-white/[0.03] text-[13px] text-vgo-muted">
                    <th className="w-[28%] px-4 py-3 text-left font-medium" />
                    {c.table.columns.map((col, i) => (
                      <th
                        key={col}
                        className={
                          'px-4 py-3 text-left font-medium ' +
                          (i === c.table.columns.length - 1 ? 'font-semibold text-vgo-text' : '')
                        }
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.table.rows.map((r) => (
                    <tr key={r.label} className="border-t border-white/10 align-top">
                      <td className="px-4 py-3 text-vgo-muted">{r.label}</td>
                      {r.values.map((v, i) => (
                        <td key={i} className={'px-4 py-3 ' + (i === 2 ? '' : 'text-vgo-muted/70')}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-14">
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
