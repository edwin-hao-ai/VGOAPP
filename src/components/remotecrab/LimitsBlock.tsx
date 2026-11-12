import { Check, X } from 'lucide-react'
import type { HomeContent } from '../../i18n/remotecrabHome'

/**
 * 「它能到哪儿为止」——不出现任何竞品名，只对照能力。
 *
 * 用户大多已经有一台 Mac，系统自带的那套就在手边。不把「它到哪儿为止」
 * 说清楚，页面等于默认「我和它一样，只是多收钱」。
 */
export function LimitsBlock({ c, labels }: { c: HomeContent['limits']; labels: { can: string; cannot: string } }) {
  return (
    <div className="mt-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="text-[11px] uppercase tracking-[0.12em] text-vgo-muted/60">{labels.can}</div>
          <ul className="mt-4 grid gap-2.5">
            {c.can.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14.5px] text-vgo-muted">
                <Check size={15} className="mt-[4px] shrink-0 text-emerald-400/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="text-[11px] uppercase tracking-[0.12em] text-vgo-muted/60">{labels.cannot}</div>
          <ul className="mt-4 grid gap-2.5">
            {c.cannot.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14.5px] text-vgo-muted">
                <X size={15} className="mt-[4px] shrink-0 text-white/25" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-5 border-l-2 border-vgo-primary/40 pl-4 text-[15px] text-vgo-text/85">{c.ours}</p>
    </div>
  )
}
