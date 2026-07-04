import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations, type Language } from './translations'

function setPageTitle(language: Language) {
  if (typeof document === 'undefined') return
  document.title = translations[language].site.title
}

const STORAGE_KEY = 'vgo-language'

function getBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'zh'
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('zh')) return 'zh'
  if (lang.startsWith('en')) return 'en'
  return 'zh'
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'zh'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'zh' || stored === 'en') return stored
  return getBrowserLanguage()
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
    setLanguageState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
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
