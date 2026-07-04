import { useEffect, useRef, useState } from 'react'
import { Github, Menu, X } from 'lucide-react'
import { GITHUB_URL } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import VGOLogo from './VGOLogo'

const navLinks = [
  { key: 'nav.products', href: '#products' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
]

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20)
        ticking = false
      })
    }

    setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedToggle = toggleRef.current?.contains(target) ?? false
      const clickedMenu = menuRef.current?.contains(target) ?? false
      if (!clickedToggle && !clickedMenu) {
        setMobileOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 motion-safe:transition-all motion-safe:duration-300 ${
        scrolled ? 'bg-vgo-bg/80 backdrop-blur-xl border-b border-white/[0.08]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <VGOLogo size={36} className="motion-safe:transition-transform motion-safe:group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight">VGO</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-vgo-muted hover:text-white motion-safe:transition-colors"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="text-sm text-vgo-muted hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.08] motion-safe:transition-colors"
            aria-label={t('language.label')}
          >
            {t(`language.${language === 'zh' ? 'en' : 'zh'}`)}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-white/[0.08] motion-safe:transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>

        <button
          ref={toggleRef}
          className="md:hidden p-2 rounded-xl hover:bg-white/[0.08]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={t('nav.toggleMenu')}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div ref={menuRef} className="md:hidden glass mx-4 mb-4 p-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-vgo-muted hover:text-white motion-safe:transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="text-vgo-muted hover:text-white motion-safe:transition-colors"
                aria-label={t('language.label')}
              >
                {t(`language.${language === 'zh' ? 'en' : 'zh'}`)}
              </button>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-vgo-muted hover:text-white"
              >
                <Github size={18} /> GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
