import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { COPY, LANGUAGES, type Copy } from './languages'

interface LanguageContextValue {
  code: string
  setCode: (code: string) => void
  t: Copy
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'projectg1-lang'

function getInitialCode(): string {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored && COPY[stored] ? stored : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<string>(getInitialCode)

  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.code === code)
    document.documentElement.lang = code
    document.documentElement.dir = lang?.rtl ? 'rtl' : 'ltr'
    window.localStorage.setItem(STORAGE_KEY, code)
  }, [code])

  return <LanguageContext.Provider value={{ code, setCode, t: COPY[code] ?? COPY.en }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
