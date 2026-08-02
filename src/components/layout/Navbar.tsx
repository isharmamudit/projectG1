import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, HeartPulse, Leaf, Mic, TriangleAlert, Calendar, Watch } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'

function scrollTo(selector: string, setVisible: (v: boolean) => void) {
  const el = document.querySelector(selector)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top: y, behavior: 'smooth' })
  setVisible(true)
}

export function Navbar() {
  const { user, logout } = useAuth()
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
            CareBuddy<span className="text-accent">.</span>
          </span>
        </button>

        {/* Nav links — was the anchor-scroll Why CareBuddy/Features/India/Trust
            list, replaced with the two actions that actually matter most:
            the offline emergency guide and the voice assistant. */}
        {!onVoicePage && (
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              to="/emergency"
              title="Offline emergency first-aid guide"
              className={cn(
                "flex items-center justify-center rounded-xl bg-tint-rose/15 font-bold text-tint-rose transition-all hover:scale-[1.03] active:scale-95",
                scrolled ? "size-10" : "gap-1.5 px-4 py-2 text-sm"
              )}
            >
              <TriangleAlert className={cn("stroke-[2.5px]", scrolled ? "size-4.5" : "size-3.5")} />
              {!scrolled && <span>Emergency</span>}
            </Link>
            <Link
              to="/sehat"
              title="Symptom triage, posture coach and daily rhythm"
              className={cn(
                "flex items-center justify-center rounded-xl bg-tint-sage/15 font-bold text-tint-sage transition-all hover:scale-[1.03] active:scale-95",
                scrolled ? "size-10" : "gap-1.5 px-4 py-2 text-sm"
              )}
            >
              <Leaf className={cn("stroke-[2.5px]", scrolled ? "size-4.5" : "size-3.5")} />
              {!scrolled && <span>SEHAT</span>}
            </Link>
            <Link
              to="/community"
              title="Community Wellness — preventive care"
              className={cn(
                "flex items-center justify-center rounded-xl bg-tint-violet/15 font-bold text-tint-violet transition-all hover:scale-[1.03] active:scale-95",
                scrolled ? "size-10" : "gap-1.5 px-4 py-2 text-sm"
              )}
            >
              <Heart className={cn("stroke-[2.5px]", scrolled ? "size-4.5" : "size-3.5")} />
              {!scrolled && <span>Community</span>}
            </Link>
            <Link
              to="/timeline"
              title="Health Timeline — longitudinal record"
              className={cn(
                "flex items-center justify-center rounded-xl bg-tint-blue/15 font-bold text-tint-blue transition-all hover:scale-[1.03] active:scale-95",
                scrolled ? "size-10" : "gap-1.5 px-4 py-2 text-sm"
              )}
            >
              <Calendar className={cn("stroke-[2.5px]", scrolled ? "size-4.5" : "size-3.5")} />
              {!scrolled && <span>Timeline</span>}
            </Link>
            <Link
              to="/vitals"
              title="Smartwatch Vitals — Health Connect"
              className={cn(
                "flex items-center justify-center rounded-xl bg-tint-amber/15 font-bold text-tint-amber transition-all hover:scale-[1.03] active:scale-95",
                scrolled ? "size-10" : "gap-1.5 px-4 py-2 text-sm"
              )}
            >
              <Watch className={cn("stroke-[2.5px]", scrolled ? "size-4.5" : "size-3.5")} />
              {!scrolled && <span>Vitals</span>}
            </Link>
            <Link
              to="/voice"
              title="Talk to CareBuddy"
              className={cn(
                "flex items-center justify-center rounded-xl bg-ink font-bold text-tint-amber transition-all hover:scale-[1.03] active:scale-95",
                scrolled ? "size-10" : "gap-1.5 px-4 py-2 text-sm"
              )}
            >
              <Mic className={cn("stroke-[2.5px]", scrolled ? "size-4.5" : "size-3.5")} />
              {!scrolled && <span>Talk to CareBuddy</span>}
            </Link>
            {user && (
              <button
                onClick={logout}
                title="Logout"
                className={cn(
                  "flex items-center justify-center rounded-xl bg-black/5 font-bold text-text-secondary transition-all hover:bg-black/10 hover:scale-[1.03] active:scale-95",
                  scrolled ? "size-10" : "gap-1.5 px-4 py-2 text-sm"
                )}
              >
                <LogOut className={cn("stroke-[2.5px]", scrolled ? "size-4.5" : "size-3.5")} />
                {!scrolled && <span>Logout</span>}
              </button>
            )}
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
          <Link
            to="/sehat"
            aria-label="SEHAT"
            className="flex size-9 items-center justify-center rounded-xl bg-tint-sage/15 text-tint-sage md:hidden"
          >
            <Leaf className="size-4" strokeWidth={2.5} />
          </Link>
          <Link
            to="/community"
            aria-label="Community Wellness"
            className="flex size-9 items-center justify-center rounded-xl bg-tint-violet/15 text-tint-violet md:hidden"
          >
            <Heart className="size-4" strokeWidth={2.5} />
          </Link>
          <Link
            to="/timeline"
            aria-label="Health Timeline"
            className="flex size-9 items-center justify-center rounded-xl bg-tint-blue/15 text-tint-blue md:hidden"
          >
            <Calendar className="size-4" strokeWidth={2.5} />
          </Link>
          <Link
            to="/vitals"
            aria-label="Smartwatch Vitals"
            className="flex size-9 items-center justify-center rounded-xl bg-tint-amber/15 text-tint-amber md:hidden"
          >
            <Watch className="size-4" strokeWidth={2.5} />
          </Link>
          {!onVoicePage && (
            <Link
              to="/voice"
              aria-label="Talk to CareBuddy"
              className="flex size-9 items-center justify-center rounded-xl bg-ink text-tint-amber md:hidden"
            >
              <Mic className="size-4" strokeWidth={2.5} />
            </Link>
          )}
          {user && (
            <button
              onClick={logout}
              aria-label="Logout"
              className="flex size-9 items-center justify-center rounded-xl bg-black/5 text-text-secondary md:hidden"
            >
              <LogOut className="size-4" strokeWidth={2.5} />
            </button>
          )}
          <LanguageSwitcher variant="icon" drop="down" />
        </div>
      </div>
    </motion.header>
  )
}
