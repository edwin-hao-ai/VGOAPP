import { useLanguage } from '../../i18n/LanguageContext'

/** 产品页脚：仍然不提 VGO，只留产品自己的标识和必要的入口。 */
export function ProductFooter() {
  const { language } = useLanguage()
  const year = new Date().getFullYear()
  const isEn =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/en' || window.location.pathname.startsWith('/en/'))

  return (
    <footer className="border-t border-white/[0.08] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-2.5">
          <img src="/remotecrab-icon.png" alt="" width={26} height={26} className="h-[26px] w-[26px] rounded-[7px]" />
          <span className="font-semibold tracking-tight">RemoteCrab</span>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-vgo-muted">
          <li>
            <a href={isEn ? '/en/remotecrab/' : '/remotecrab/'} className="hover:text-white">
              {language === 'zh' ? '产品首页' : 'Product home'}
            </a>
          </li>
          <li>
            <a href={isEn ? '/en/remotecrab/privacy/' : '/remotecrab/privacy/'} className="hover:text-white">
              {language === 'zh' ? '隐私政策' : 'Privacy'}
            </a>
          </li>
          <li>
            <a href={isEn ? '/en/remotecrab/alternatives/' : '/remotecrab/alternatives/'} className="hover:text-white">
              {language === 'zh' ? '对比' : 'Compare'}
            </a>
          </li>
        </ul>

        <p className="text-sm text-vgo-muted">© {year} RemoteCrab</p>
      </div>
    </footer>
  )
}
