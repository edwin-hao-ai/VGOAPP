import { Download } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const DOWNLOAD_MAC_URL = '/downloads/RemoteCrab.dmg'

/**
 * 产品自己的页头：只有 RemoteCrab 的标识，没有 VGO。
 *
 * 产品的落地页应该看起来像「这个产品」的站，而不是「VGO 站里的一个目录」——
 * 别人从这个页面进来时，不需要先知道 VGO 是什么。
 */
export function ProductHeader({ homeHref = '/remotecrab/' }: { homeHref?: string }) {
  const { language, setLanguage } = useLanguage()
  const isEn =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/en' || window.location.pathname.startsWith('/en/'))
  const home = isEn ? `/en${homeHref}` : homeHref

  const links = [
    { label: language === 'zh' ? '功能' : 'Features', href: `${home}#features` },
    { label: language === 'zh' ? '价格' : 'Pricing', href: `${home}#pricing` },
    { label: language === 'zh' ? '对比' : 'Compare', href: isEn ? '/en/remotecrab/alternatives/' : '/remotecrab/alternatives/' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#08080c]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
        <a href={home} className="flex items-center gap-2.5">
          <img src="/remotecrab-icon.png" alt="RemoteCrab" width={30} height={30} className="h-[30px] w-[30px] rounded-[8px]" />
          <span className="text-[17px] font-bold tracking-tight">RemoteCrab</span>
        </a>

        <nav className="ml-2 hidden items-center gap-6 text-sm text-vgo-muted sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-vgo-muted transition-colors hover:text-white"
          >
            {language === 'zh' ? 'En' : '中文'}
          </button>
          <a
            href={DOWNLOAD_MAC_URL}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-vgo-primary to-vgo-secondary px-4 py-2 text-[13.5px] font-semibold text-white"
          >
            <Download size={15} />
            {language === 'zh' ? '下载' : 'Download'}
          </a>
        </div>
      </div>
    </header>
  )
}
