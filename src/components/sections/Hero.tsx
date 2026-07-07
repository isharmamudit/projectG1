import { useState } from 'react'
import { ArrowUpRight, Plus, MessageCircle, Share2, Globe2, ArrowRight, HeartPulse } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { CountUp } from '@/components/ui/CountUp'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useLanguage } from '@/lib/language'
import { useTheme } from '@/lib/theme'

const NAV_ITEMS = [
  { label: 'Why G1', href: '#problems' },
  { label: 'Features', href: '#voice' },
  { label: 'India', href: '#india' },
  { label: 'Trust', href: '#trust' },
]

const TILES = [
  { n: '01', label: 'Chat', href: '#problems', bg: 'bg-tint-blue/12 border border-tint-blue/25', brief: 'Consult in 12+ dialects' },
  { n: '02', label: 'Voice', href: '#voice', bg: 'bg-tint-amber/12 border border-tint-amber/25', brief: 'Get clinical reports' },
  { n: '03', label: 'Yoga', href: '#problems', bg: 'bg-tint-sage/12 border border-tint-sage/25', brief: 'Posture coaching' },
  { n: '04', label: 'Offline', href: '#problems', bg: 'bg-tint-violet/12 border border-tint-violet/25', brief: 'Works without signal' },
  { n: '05', label: 'Memory', href: '#problems', bg: 'bg-tint-teal/12 border border-tint-teal/25', brief: 'Your full history' },
  { n: '06', label: 'Scan', href: '#problems', bg: 'bg-tint-rose/12 border border-tint-rose/25', brief: 'Photo your symptoms' },
]

// The four floating callouts that ring the central visual on desktop.
const CALLOUTS = [
  { label: 'Chat Consults', side: 'left' as const, top: '14%' },
  { label: 'Voice Reports', side: 'left' as const, top: '58%' },
  { label: 'Symptom Scan', side: 'right' as const, top: '14%' },
  { label: 'Offline Records', side: 'right' as const, top: '58%' },
]

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
]

const SPARK_POINTS = '0,32 14,26 28,29 42,18 56,21 70,10 84,13 100,2'

function handleScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    const y = target.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export function Hero() {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [email, setEmail] = useState('')

  return (
    <section id="top" className="relative w-full overflow-hidden px-4 pt-24 pb-20 sm:px-6 md:pt-6">

      {/* In-page navbar: desktop only — the global Navbar already stays permanently visible on mobile,
          but auto-hides until scroll on desktop, so the hero needs its own static one there. */}
      <FadeIn className="mx-auto mb-14 hidden max-w-6xl items-center justify-between rounded-2xl border border-border bg-surface/70 px-5 py-3 backdrop-blur-xl md:flex">
        <a
          href="#top"
          onClick={(e) => handleScrollTo(e, '#top')}
          className="flex items-center gap-2 text-fg"
        >
          <HeartPulse className="size-5 text-accent" strokeWidth={2.5} />
          <span className="font-display text-[17px] font-black leading-none tracking-tight">
            projectG1<span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {t.navItems[item.label] ?? item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher variant="icon" drop="down" />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <span className="text-base leading-none">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>
        </div>
      </FadeIn>

      {/* Headline block */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-2 text-center">
        <FadeIn className="relative">
          <div className="absolute -top-8 right-0 hidden items-center sm:flex">
            <div className="flex -space-x-2.5">
              {AVATARS.map((src) => (
                <img key={src} src={src} alt="" className="size-9 rounded-full border-2 border-surface object-cover" />
              ))}
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-surface bg-tint-sage/25 text-xs font-black text-fg">
                +
              </span>
            </div>
          </div>
        </FadeIn>

        <motion.h1
          initial="hidden"
          animate="visible"
          className="font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] tracking-tighter uppercase font-black text-fg"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {t.heroWords.map((w, index) => (
            <motion.span
              key={index}
              className="inline-block mr-[0.18em] last:mr-0 will-change-transform"
              style={index === 1 ? { color: 'var(--color-tint-amber)' } : {}}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <FadeIn delay={0.3} className="mx-auto mt-4 max-w-xl">
          <p className="text-sm font-medium text-fg-muted sm:text-base">{t.heroSubtitle}</p>
        </FadeIn>
      </div>

      {/* Central visual: glow + image + floating feature callouts */}
      <div className="relative mx-auto mt-14 flex h-[380px] max-w-3xl items-center justify-center sm:h-[440px]">
        {/* Radial glow */}
        <div
          className="absolute size-[320px] rounded-full opacity-60 blur-3xl sm:size-[420px]"
          style={{ background: 'radial-gradient(circle, var(--color-tint-sage) 0%, transparent 70%)' }}
        />

        {/* Feature callouts (desktop only) */}
        {CALLOUTS.map((c) => (
          <FadeIn
            key={c.label}
            delay={0.2}
            className="absolute hidden md:block"
            style={{ top: c.top, [c.side]: '0%' }}
          >
            <div className={`glass-card flex items-center gap-2 rounded-full px-3 py-2 ${c.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-tint-amber/25 text-fg">
                <Plus className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-xs font-bold text-fg">{c.label}</span>
            </div>
          </FadeIn>
        ))}

        {/* Central image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 size-[240px] overflow-hidden rounded-full border-4 border-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] sm:size-[300px]"
        >
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
            alt="Person practicing yoga at sunrise"
            className="h-full w-full select-none object-cover"
          />
        </motion.div>

        {/* Email capture bar, bleeding over the visual's bottom edge */}
        <FadeIn delay={0.35} className="absolute -bottom-4 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4 sm:-bottom-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass-card flex items-center gap-2 rounded-full border border-border-strong bg-surface p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.15)]"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm font-medium text-fg placeholder:text-fg-muted focus:outline-none"
            />
            <Button type="submit" variant="primary" className="shrink-0 rounded-full px-5 py-2.5 text-xs font-bold">
              {t.startConsultation}
            </Button>
          </form>
        </FadeIn>
      </div>

      {/* Join community + social row */}
      <FadeIn delay={0.4} className="mx-auto mt-14 max-w-md text-center sm:mt-10">
        <p className="text-xs font-semibold text-fg-muted">
          Join our community and stay updated with everyday health tips.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          {[MessageCircle, Share2, Globe2].map((Icon, i) => (
            <a
              key={i}
              href="#top"
              aria-label="Social link"
              className="glass-card flex size-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg"
            >
              <Icon className="size-4" strokeWidth={2} />
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Floating stat cards (large screens only) */}
      <FadeIn delay={0.5} className="absolute bottom-6 left-4 hidden w-[220px] lg:block">
        <div className="glass-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wide text-fg">Growing With You</p>
            <ArrowUpRight className="size-3.5 text-fg-muted" />
          </div>
          <p className="mt-3 font-display text-2xl font-black text-tint-sage">
            <CountUp to={92} suffix="%" duration={1200} />
          </p>
          <p className="mt-1 text-[10px] font-semibold text-fg-muted">Consult satisfaction, 2026</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-fg/10">
            <div className="h-full w-[92%] rounded-full bg-tint-sage" />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.55} className="absolute right-4 bottom-6 hidden w-[220px] lg:block">
        <div className="glass-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wide text-fg">Care That Understands</p>
            <ArrowUpRight className="size-3.5 text-fg-muted" />
          </div>
          <svg viewBox="0 0 100 36" className="mt-3 h-10 w-full overflow-visible">
            <polyline points={SPARK_POINTS} fill="none" stroke="var(--color-tint-amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-1 text-[10px] font-semibold text-fg-muted">12M+ Indians, 12+ dialects</p>
        </div>
      </FadeIn>

      {/* Navigation Tiles Grid: mobile fallback for the desktop callouts */}
      <div className="mx-auto mt-14 max-w-5xl px-2 text-center md:hidden">
        <p className="text-[10px] font-black uppercase tracking-widest text-fg-muted mb-3.5">
          {t.tapToExplore}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TILES.map((tile) => (
            <a
              key={tile.n}
              href={tile.href}
              onClick={(e) => handleScrollTo(e, tile.href)}
              className={`glass-card group flex flex-col justify-between p-4 rounded-2xl backdrop-blur-xl text-fg min-h-[96px] transition-transform hover:-translate-y-1 active:scale-[0.98] ${tile.bg}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-display text-sm font-black opacity-55">{tile.n}</span>
                <ArrowRight className="size-4 opacity-75" />
              </div>
              <span className="text-xs font-black tracking-tight leading-none mt-4 text-left">{tile.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
