import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HeartPulse } from 'lucide-react'
import { useLanguage } from '@/lib/language'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Why G1',   href: '#problems' },
  { label: 'Features', href: '#voice' },
  { label: 'India',    href: '#india' },
  { label: 'Trust',    href: '#trust' },
]

function scrollTo(selector: string, setVisible: (v: boolean) => void) {
  const el = document.querySelector(selector)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top: y, behavior: 'smooth' })
  setVisible(true)
}

export function Navbar() {
  const { t } = useLanguage()
  const [visible, setVisible]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const initialY = window.scrollY
    const isMobile = window.innerWidth < 768
    setVisible(isMobile || initialY > 300)
    setScrolled(initialY > 20)

    function onScroll() {
      const y = window.scrollY
      const isMobile = window.innerWidth < 768
      setScrolled(y > 20)
      
      if (!isMobile && y < 350) {
        setVisible(false)
      } else if (isMobile && y < 80) {
        setVisible(true)
      } else if (y > lastY.current + 8) {
        setVisible(false)   // scrolling DOWN  → hide
      } else if (y < lastY.current - 4) {
        setVisible(true)    // scrolling UP    → show
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      animate={{ y: visible ? 0 : -110, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300',
          scrolled
            ? 'bg-paper/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)] backdrop-blur-xl border border-border'
            : 'bg-paper border border-border',
        )}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo('#top', setVisible)}
          className="flex items-center gap-2 text-fg"
        >
          <HeartPulse className="size-5 text-accent" strokeWidth={2.5} />
          <span className="font-display text-[17px] font-black leading-none tracking-tight">
            projectG1<span className="text-accent">.</span>
          </span>
        </button>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollTo(item.href, setVisible)}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {t.navItems[item.label] ?? item.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher variant="icon" drop="down" />
        </div>
      </div>
    </motion.header>
  )
}
