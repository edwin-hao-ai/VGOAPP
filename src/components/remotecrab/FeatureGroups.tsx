import type { HomeGroup } from '../../i18n/remotecrabHome'

/**
 * 完整功能清单。
 *
 * 这一节的任务是「证明全都在这儿」，不是逐条说服 —— 所以用三列密集表，
 * 一个功能一行说明；有独立落地页的标题可点，子能力用「含 …」挂在同一格里，
 * 既不丢东西，也不为了完整性把卡片数量翻倍。
 */
export function FeatureGroups({
  groups,
  note,
  labels,
}: {
  groups: HomeGroup[]
  note: string
  labels: { video: string; paid: string }
}) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.title} className="mt-10 first:mt-0">
          <h3 className="border-b border-white/10 pb-2.5 text-xs uppercase tracking-[0.12em] text-vgo-muted/70">
            {group.title}
          </h3>
          <div className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((f) => (
              <div key={f.name}>
                <h4 className="flex flex-wrap items-center gap-2 text-[15px] font-semibold leading-snug">
                  {f.href ? (
                    <a
                      href={f.href}
                      className="border-b border-transparent transition-colors hover:border-vgo-primary/60"
                    >
                      {f.name}
                    </a>
                  ) : (
                    f.name
                  )}
                  {f.tag ? (
                    <span className="rounded-full border border-vgo-primary/30 bg-vgo-primary/10 px-2 py-[1px] text-[10px] font-medium tracking-wide text-vgo-secondary">
                      {f.tag === 'video' ? labels.video : labels.paid}
                    </span>
                  ) : null}
                </h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-vgo-muted">{f.body}</p>
                {f.sub ? <p className="mt-1 text-xs text-vgo-muted/60">{f.sub}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="mt-8 text-[13px] text-vgo-muted/60">{note}</p>
    </>
  )
}
