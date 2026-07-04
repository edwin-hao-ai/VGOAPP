import { useEffect, useRef, useState } from 'react'
import { Github, Menu, X } from 'lucide-react'
import VGOLogo from './VGOLogo'

const navLinks = [
  { label: '产品', href: '#products' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
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
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/edwin-hao-ai"
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
          aria-label="切换菜单"
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
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/edwin-hao-ai"
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
