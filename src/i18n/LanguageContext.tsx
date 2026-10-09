import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations, type Language } from './translations'

function setPageTitle(language: Language) {
  if (typeof document === 'undefined') return
  document.title = translations[language].site.title
}

const STORAGE_KEY = 'vgo-language'
const EN_PREFIX = '/en'

function isEnPath(pathname: string): boolean {
  return pathname === EN_PREFIX || pathname.startsWith(EN_PREFIX + '/')
}

/**
 * 语言由 URL 路径决定：`/en/*` → 英文，其余 → 中文（主语言）。
 *
 * 为什么要按路径而不是浏览器语言：SEO 要求「一个 URL 对应一种语言」。页面
 * 预渲染成静态 HTML 时是中文，若运行时又按浏览器语言渲染成英文，会和静态
 * HTML 不一致（hydration 失配），Google 看到的也是中文。所以主语言固定在根
 * 路径，英文走 `/en/` 前缀，两种语言各有独立 URL 与 hreflang。
 */
function languageFromPath(): Language {
  if (typeof window === 'undefined') return 'zh'
  return isEnPath(window.location.pathname) ? 'en' : 'zh'
}

function getInitialLanguage(): Language {
  return languageFromPath()
}

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((next: Language) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, next)
    // 语言由 URL 路径决定 —— 切换语言 = 跳到另一种语言的同一页面。
    // 每个路由是独立的 HTML（多页应用），所以这里整页导航，而不是改 state。
    const path = window.location.pathname
    const currentlyEn = isEnPath(path)
    let target = path
    if (next === 'en' && !currentlyEn) {
      target = EN_PREFIX + path
    } else if (next === 'zh' && currentlyEn) {
      target = path.slice(EN_PREFIX.length) || '/'
    }
    if (target !== path) {
      window.location.assign(target + window.location.hash)
      return
    }
    setLanguageState(next)
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
    setPageTitle(next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    setPageTitle(language)
  }, [language])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const keys = key.split('.')
      let value: unknown = translations[language]
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          value = undefined
          break
        }
      }
      if (typeof value !== 'string') {
        console.warn(`Missing translation key: ${key}`)
        return key
      }
      if (!params) return value
      return value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`))
    },
    [language]
  )

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
