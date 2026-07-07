import { useEffect, useRef, useState } from 'react'
import { Check, Globe } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { LANGUAGES } from '@/lib/languages'
import { useLanguage } from '@/lib/language'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  /** 'full' = text pill (hero sidebar). 'icon' = compact circular trigger (navbar). */
  variant?: 'full' | 'icon'
  /** Which way the panel opens relative to its trigger. */
  drop?: 'up' | 'down'
}

/**
 * Opens a panel of all 12 supported languages (native script + English
 * name). Picking one updates the LanguageContext, which re-renders every
 * string wired to useLanguage().
 */
export function LanguageSwitcher({ className, variant = 'full', drop = 'up' }: LanguageSwitcherProps) {
  const { code, setCode, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={t.chooseLanguage}
          title={t.chooseLanguage}
          className="flex size-9 shrink-0 items-center justify-center gap-1 rounded-xl border border-border text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <Globe className="size-4" strokeWidth={2.25} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-black py-2.5 px-3 text-[11px] font-black text-white transition-colors hover:bg-neutral-900"
        >
          <span>{current.nativeName}</span>
          <Globe className="size-3.5 opacity-70" strokeWidth={2.5} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label={t.chooseLanguage}
            initial={{ opacity: 0, y: drop === 'up' ? 8 : -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: drop === 'up' ? 8 : -8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              'glass absolute z-30 w-[min(280px,85vw)] rounded-2xl p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)]',
              drop === 'up' ? 'bottom-full left-0 mb-2' : 'top-full right-0 mt-2',
            )}
          >
            <p className="px-2.5 pt-1 pb-2 text-[10px] font-black tracking-widest text-fg-muted uppercase">{t.chooseLanguage}</p>
            <ul
              data-lenis-prevent
              className="grid max-h-72 grid-cols-1 gap-1 overflow-y-auto overscroll-contain [touch-action:pan-y]"
            >
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={lang.code === code}
                    onClick={() => {
                      setCode(lang.code)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2',
                      lang.code === code ? 'bg-accent-soft text-accent font-bold' : 'text-fg',
                    )}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="font-semibold">{lang.nativeName}</span>
                      <span className="text-xs text-fg-muted">{lang.englishName}</span>
                    </span>
                    {lang.code === code && <Check className="size-4 shrink-0" strokeWidth={2.5} />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
