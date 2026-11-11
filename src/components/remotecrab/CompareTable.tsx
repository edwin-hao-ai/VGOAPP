import { Check, Minus } from 'lucide-react'
import type { HomeContent } from '../../i18n/remotecrabHome'

/**
 * 「为什么不用系统自带」——最大化的一条反驳。
 *
 * macOS 26 的用户 100% 已经有接力摄像头，所以不答这一题，页面等于默认
 * 「你和它一样，只是多收钱」。表格按能力逐条对照，不是营销话术。
 */
export function CompareTable({ c }: { c: HomeContent['compare'] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full border-collapse text-[14.5px]">
        <thead>
          <tr className="bg-white/[0.03] text-[13px] text-vgo-muted">
            <th className="w-[30%] px-5 py-3.5 text-left font-medium" />
            <th className="px-5 py-3.5 text-left font-medium">{c.colBuiltin}</th>
            <th className="px-5 py-3.5 text-left font-semibold text-vgo-text">{c.colOurs}</th>
          </tr>
        </thead>
        <tbody>
          {c.rows.map((r) => (
            <tr key={r.label} className="border-t border-white/10 align-top">
              <td className="px-5 py-3.5 text-vgo-muted">{r.label}</td>
              <td className="px-5 py-3.5 text-vgo-muted/70">
                <span className="flex gap-2">
                  {r.builtinHas ? (
                    <Check size={15} className="mt-[3px] shrink-0 text-emerald-400/80" />
                  ) : (
                    <Minus size={15} className="mt-[3px] shrink-0 text-white/20" />
                  )}
                  <span>{r.builtin}</span>
                </span>
              </td>
              <td className="px-5 py-3.5">
                <span className="flex gap-2">
                  <Check size={15} className="mt-[3px] shrink-0 text-emerald-400" />
                  <span>{r.ours}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
