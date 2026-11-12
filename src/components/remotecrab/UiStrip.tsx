import { ArrowRight } from 'lucide-react'
import type { HomeContent } from '../../i18n/remotecrabHome'

/**
 * 三张真机截图。
 *
 * 视频拍的是「在桌子上怎么用」，截图回答的是另一件事：**我手机上会看到什么**。
 * 老站的截图墙之所以该删，不是因为「截图」没用，而是那批图是打码的、卡通的、
 * 而且重复出现两次。这里用的是 features/ 下真实的设备截图，一张一个界面。
 */
export function UiStrip({
  c,
  language,
}: {
  c: HomeContent['ui']
  language: 'zh' | 'en'
}) {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-3">
      {c.items.map((item) => (
        <a key={item.name} href={item.href} className="group block">
          <div className="relative mx-auto w-full max-w-[260px]">
            <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[#0b0b11] shadow-[0_24px_60px_-28px_rgba(0,0,0,.9)]">
              <img
                src={`/remotecrab/features/${item.shot}${language === 'en' ? '-en' : ''}.jpg`}
                alt={item.name}
                loading="lazy"
                className="block w-full"
              />
            </div>
          </div>
          <h3 className="mt-4 flex items-center gap-1.5 text-[15px] font-semibold">
            {item.name}
            <ArrowRight
              size={14}
              className="shrink-0 -translate-x-1 text-vgo-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
            />
          </h3>
          <p className="mt-1 text-[13.5px] leading-relaxed text-vgo-muted">{item.body}</p>
        </a>
      ))}
    </div>
  )
}
