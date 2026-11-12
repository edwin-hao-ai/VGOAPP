import type { HomeContent } from '../../i18n/remotecrabHome'

/**
 * 四张小截图。
 *
 * 视频回答「在桌子上怎么用」，截图回答「我手机上会看到什么」—— 两个问题不一样，
 * 所以首页两者都要有。尺寸刻意做小（四列），这一节是"看一眼长什么样"，
 * 不是主角；点进去才是功能页。
 */
export function ShotStrip({ c, language }: { c: HomeContent['shots']; language: 'zh' | 'en' }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
      {c.items.map((item) => (
        <a key={item.name} href={item.href} className="group block">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b12] shadow-[0_18px_44px_-26px_rgba(0,0,0,.95)]">
            <img
              src={`/remotecrab/features/${item.shot}${language === 'en' ? '-en' : ''}.jpg`}
              alt={item.name}
              loading="lazy"
              className="block w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
              onError={(e) => {
                // 英文版配图还没有时退回中文版，避免出现破图
                const img = e.currentTarget
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1'
                  img.src = `/remotecrab/features/${item.shot}.jpg`
                }
              }}
            />
          </div>
          <h3 className="mt-3 text-[14px] font-semibold">{item.name}</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-vgo-muted">{item.body}</p>
        </a>
      ))}
    </div>
  )
}
