import { Clock, FolderLock, ShieldCheck, ArrowRight } from 'lucide-react'
import type { HomeContent } from '../../i18n/remotecrabHome'

const ICONS = { clock: Clock, shield: ShieldCheck, folder: FolderLock }

/**
 * 「你不在电脑前的时候」—— 三个场景，不是三个功能。
 *
 * 这一节卖的不是「AI 很聪明」，而是「你不在这台电脑前，但只有你能拍板」这个处境：
 * 等构建、批一条命令、限定一个文件夹。每条都按「痛点 → 发生什么 → 为什么是手机」写，
 * 而且只写今天真的做得到的事（不说「让它替你操作任何 App」）。
 */
export function RemoteScenarios({ c }: { c: HomeContent['remote'] }) {
  return (
    <div className="mt-10">
      <div className="grid gap-4 md:grid-cols-3">
        {c.items.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Clock
          return (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-vgo-primary/25 to-vgo-secondary/20">
                <Icon size={18} className="text-vgo-secondary" />
              </div>
              <h3 className="text-[17px] font-semibold leading-snug">{item.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-vgo-muted">{item.body}</p>
              <p className="mt-4 border-t border-white/[0.08] pt-3 text-[12.5px] text-vgo-muted/70">
                {item.foot}
              </p>
            </div>
          )
        })}
      </div>
      <a
        href={c.href}
        className="mt-6 inline-flex items-center gap-1.5 border-b border-vgo-primary/30 pb-0.5 text-[13.5px] text-vgo-secondary hover:border-vgo-primary"
      >
        {c.cta}
        <ArrowRight size={14} />
      </a>
    </div>
  )
}
