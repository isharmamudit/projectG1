import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HeartPulse, Mic, TriangleAlert } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

function scrollTo(selector: string, setVisible: (v: boolean) => void) {
  const el = document.querySelector(selector)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top: y, behavior: 'smooth' })
  setVisible(true)
}

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const onVoicePage = location.pathname === '/voice'
  const [visible, setVisible]   = useState(onVoicePage)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    if (onVoicePage) return
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
  }, [onVoicePage])

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
          onClick={() => (onVoicePage ? navigate('/') : scrollTo('#top', setVisible))}
          className="flex items-center gap-2 text-fg"
        >
          <HeartPulse className="size-5 text-accent" strokeWidth={2.5} />
          <span className="font-display text-[17px] font-black leading-none tracking-tight">
            projectG1<span className="text-accent">.</span>
          </span>
        </button>

        {/* Nav links — was the anchor-scroll Why G1/Features/India/Trust
            list, replaced with the two actions that actually matter most:
            the offline emergency guide and the voice assistant. */}
        {!onVoicePage && (
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              to="/emergency"
              title="Offline emergency first-aid guide"
              className="flex items-center gap-1.5 rounded-xl bg-tint-rose/15 px-4 py-2 text-sm font-bold text-tint-rose transition-transform hover:scale-[1.03] active:scale-95"
            >
              <TriangleAlert className="size-3.5" strokeWidth={2.5} />
              Emergency
            </Link>
            <Link
              to="/voice"
              className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-sm font-bold text-tint-amber transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Mic className="size-3.5" strokeWidth={2.5} />
              Talk to G1
            </Link>
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {/* Compact icon-only fallback for small screens, where the nav
              above is hidden entirely. */}
          <Link
            to="/emergency"
            title="Offline emergency first-aid guide"
            aria-label="Emergency"
            className="flex size-9 items-center justify-center rounded-xl bg-tint-rose/15 text-tint-rose md:hidden"
          >
            <TriangleAlert className="size-4" strokeWidth={2.5} />
          </Link>
          {!onVoicePage && (
            <Link
              to="/voice"
              aria-label="Talk to G1"
              className="flex size-9 items-center justify-center rounded-xl bg-ink text-tint-amber md:hidden"
            >
              <Mic className="size-4" strokeWidth={2.5} />
            </Link>
          )}
          <LanguageSwitcher variant="icon" drop="down" />
        </div>
      </div>
    </motion.header>
  )
}
