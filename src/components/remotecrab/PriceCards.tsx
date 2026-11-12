import { Check } from 'lucide-react'
import type { HomeContent } from '../../i18n/remotecrabHome'

/** 免费 / 远程两张卡。价格写在首页，而不是折叠的 FAQ 里。 */
export function PriceCards({ p }: { p: HomeContent['price'] }) {
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      {[p.free, p.paid].map((card, i) => (
        <div
          key={card.tag}
          className={
            'rounded-2xl border p-7 ' +
            (i === 1
              ? 'border-vgo-primary/30 bg-gradient-to-b from-vgo-primary/10 to-vgo-secondary/[0.04]'
              : 'border-white/10 bg-white/[0.02]')
          }
        >
          <div className="text-xs uppercase tracking-[0.1em] text-vgo-muted/60">{card.tag}</div>
          <div className="mt-3 text-[34px] font-bold tracking-tight">
            {card.amount}
            <span className="ml-1 text-sm font-medium text-vgo-muted">{card.unit}</span>
          </div>
          <ul className="mt-5 grid gap-2.5">
            {card.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14.5px] text-vgo-muted">
                <Check size={15} className="mt-[4px] shrink-0 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
