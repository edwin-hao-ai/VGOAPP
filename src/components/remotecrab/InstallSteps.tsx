import type { HomeContent } from '../../i18n/remotecrabHome'

/**
 * 安装四步，写成「你会在屏幕上看到什么」。
 *
 * 这一步是整条漏斗最容易流失的地方：辅助功能、相机扩展、管理员密码。
 * 与其说「按引导授权」，不如把四个提示逐个摆出来，并给每一句一个理由。
 */
export function InstallSteps({ c }: { c: HomeContent['install'] }) {
  return (
    <div className="mt-10 grid gap-4">
      {c.items.map((step) => (
        <div
          key={step.num}
          className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-[52px_1fr]"
        >
          <div className="grid h-9 w-9 place-items-center rounded-full border border-vgo-primary/30 bg-vgo-primary/15 text-sm font-semibold text-vgo-secondary">
            {step.num}
          </div>
          <div>
            <h3 className="text-[16.5px] font-semibold">{step.title}</h3>
            <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-vgo-muted">{step.body}</p>
            {step.dialog ? (
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-[#0c0c12] px-4 py-3 text-[13px] text-white/80">
                <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/50" />
                <span className="flex-1">{step.dialog}</span>
                <span className="flex gap-2">
                  <span className="rounded-md border border-white/15 px-2.5 py-0.5 text-xs text-vgo-muted">
                    {c.dialogCancel}
                  </span>
                  <span className="rounded-md bg-[#2f6bff] px-2.5 py-0.5 text-xs text-white">
                    {c.dialogOpen}
                  </span>
                </span>
              </div>
            ) : null}
            {step.note ? <p className="mt-2.5 font-mono text-xs text-vgo-muted/60">{step.note}</p> : null}
          </div>
        </div>
      ))}
      <p className="mt-1 text-[13px] text-vgo-muted/60">{c.footnote}</p>
    </div>
  )
}
