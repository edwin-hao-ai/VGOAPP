import { ArrowRight } from 'lucide-react'
import type { HomeScene } from '../../i18n/remotecrabHome'
import { Stage } from './Stage'

/**
 * 四个高频场景，每条配一段真机片段。
 *
 * 版式：320 的 4:5 画框 + 右侧文案，左右交替。竖片在宽版心里如果只放一个
 * 9:16 的窄条，旁边会空出一大片；画框 + 三条要点把它变成一条横向的带子。
 */
export function SceneRows({
  items,
  language,
  caption,
  onOpen,
}: {
  items: HomeScene[]
  language: 'zh' | 'en'
  caption: string
  onOpen: (name: string) => void
}) {
  return (
    <div className="mt-6">
      {items.map((s, i) => (
        <div
          key={s.title}
          className={
            'grid items-center gap-10 border-t border-white/10 py-12 first:border-t-0 md:gap-14 ' +
            (i % 2 === 1 ? 'md:grid-cols-[1fr_320px]' : 'md:grid-cols-[320px_1fr]')
          }
        >
          <div className={i % 2 === 1 ? 'md:order-2' : ''}>
            <Stage
              language={language}
              name={s.clip}
              caption={caption}
              onOpen={() => onOpen(s.clip)}
            />
          </div>
          <div className={i % 2 === 1 ? 'md:order-1' : ''}>
            <span className="font-mono text-xs tracking-[0.1em] text-vgo-muted/60">{s.num}</span>
            <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight md:text-[28px]">
              {s.title}
            </h3>
            <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-vgo-muted">{s.body}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-[14px] text-vgo-muted">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-vgo-primary/80" />
                  {b}
                </li>
              ))}
            </ul>
            <a
              href={s.href}
              className="mt-5 inline-flex items-center gap-1.5 border-b border-vgo-primary/30 pb-0.5 text-[13.5px] text-vgo-secondary hover:border-vgo-primary"
            >
              {language === 'zh' ? '看完整的说明' : 'Full notes'}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
