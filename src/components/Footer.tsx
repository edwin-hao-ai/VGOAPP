import { useLanguage } from '../i18n/LanguageContext'
import VGOLogo from './VGOLogo'

const YEAR = new Date().getFullYear()

const footerLinks = [
  { label: 'MDDock', href: 'https://mddock.com/' },
  { label: 'MacSlim', href: 'https://github.com/edwin-hao-ai/MacSlim' },
  { label: 'MouseClaw', href: 'https://github.com/edwin-hao-ai/MouseClaw' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/[0.08] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <VGOLogo size={32} />
          <span className="font-bold">VGO</span>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-vgo-muted">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white motion-safe:transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-vgo-muted">{t('footer.copyright', { year: YEAR })}</p>
      </div>
    </footer>
  )
}
