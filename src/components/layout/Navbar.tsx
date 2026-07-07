import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, HeartPulse } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Memory', href: '#memory' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'India', href: '#india' },
  { label: 'Trust', href: '#trust' },
]

/** Floating glass pill nav: hides on scroll down, reappears on scroll up (Zentry Navbar pattern). */
export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 8)
      if (y < 80) {
        setVisible(true)
      } else if (y > lastY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-x-0 top-4 z-50 sm:top-5"
    >
      <nav
        className={cn(
          'relative mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-colors sm:px-6',
          scrolled ? 'glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]' : 'bg-transparent',
        )}
      >
        <a href="#top" className="flex items-center gap-2 text-fg">
          <HeartPulse className="size-5 text-accent" strokeWidth={2.5} />
          <span className="font-display text-lg leading-none tracking-tight">projectG1.</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-colors hover:bg-surface-2"
        >
          {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
      </nav>
    </motion.header>
  )
}
