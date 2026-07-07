import { ArrowLeft, ArrowUpRight, HeartPulse, MessageCircle, Mic, PersonStanding, WifiOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useLanguage } from '@/lib/language'
import { useTheme } from '@/lib/theme'

const NAV_ITEMS = [
  { label: 'Why G1', href: '#problems' },
  { label: 'Features', href: '#voice' },
  { label: 'India', href: '#india' },
  { label: 'Trust', href: '#trust' },
]

// The four bento cards below the hero banner — solid theme-invariant pastels, like MediCare's colored tile row.
const TILES = [
  { n: '01', title: 'Instant Chat Consults', brief: 'Reply within 60 secs', href: '#problems', bg: 'bg-pastel-amber', icon: MessageCircle },
  { n: '02', title: 'Voice & Reports', brief: 'Speak, we transcribe', href: '#voice', bg: 'bg-pastel-sage', icon: Mic },
  { n: '03', title: 'Yoga & Posture', brief: 'Guided daily coaching', href: '#problems', bg: 'bg-pastel-rose', icon: PersonStanding },
  { n: '04', title: 'Works Offline', brief: 'No signal, no problem', href: '#problems', bg: 'bg-pastel-blue', icon: WifiOff },
]

// The two floating pill badges flanking the central figure.
const BADGES = [
  { label: 'Ask in your dialect', side: 'left' as const },
  { label: 'No clinic visit needed', side: 'right' as const },
]

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

  return (
    <section id="top" className="relative w-full px-4 pt-24 pb-16 sm:px-6 md:pt-6">

      {/* In-page navbar: desktop only — the global Navbar already stays permanently visible on mobile,
          but auto-hides until scroll on desktop, so the hero needs its own static one there. */}
      <FadeIn className="mx-auto mb-6 hidden max-w-6xl items-center justify-between rounded-2xl border border-border bg-surface/70 px-5 py-3 backdrop-blur-xl md:flex">
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

      {/* Hero banner: giant headline behind a central figure, floating badges, bottom caption + CTA */}
      <div className="relative mx-auto min-h-[560px] max-w-6xl overflow-hidden rounded-[32px] bg-ink px-6 pt-10 pb-8 sm:min-h-[620px] sm:px-10 sm:pt-14">

        {/* Giant headline, sitting behind the figure */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="pointer-events-none relative z-0 max-w-full [overflow-wrap:anywhere] select-none text-center font-display text-[clamp(2rem,9vw,8rem)] leading-[0.85] font-black tracking-tight text-paper/90 uppercase"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {t.heroWords.map((w, index) => (
            <motion.span
              key={index}
              className="inline-block mr-[0.15em] last:mr-0"
              style={index === 1 ? { color: 'var(--color-tint-amber)' } : {}}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Floating badges flanking the figure */}
        {BADGES.map((b, i) => (
          <FadeIn
            key={b.label}
            delay={0.25 + i * 0.1}
            className={`absolute top-[42%] z-20 hidden md:block ${b.side === 'left' ? 'left-6' : 'right-6'}`}
          >
            <div className="glass-card flex items-center gap-2 rounded-full bg-surface/90 px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <span className={`flex size-6 items-center justify-center rounded-full ${b.side === 'left' ? 'bg-tint-rose/25' : 'bg-tint-sage/25'}`}>
                <ArrowUpRight className="size-3.5 text-fg" strokeWidth={2.5} />
              </span>
              <span className="text-xs font-bold whitespace-nowrap text-fg">{b.label}</span>
            </div>
          </FadeIn>
        ))}

        {/* Central figure, in front of the headline text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 mx-auto -mt-8 h-[300px] w-[220px] overflow-hidden rounded-t-[110px] sm:h-[380px] sm:w-[280px]"
        >
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
            alt="Doctor holding a phone during a consultation"
            className="h-full w-full select-none object-cover"
          />
        </motion.div>

        {/* Bottom caption + CTA */}
        <div className="relative z-20 mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeIn delay={0.35} className="max-w-xs">
            <p className="text-[11px] font-bold tracking-wide text-paper/70 uppercase">{t.heroSubtitle}</p>
          </FadeIn>

          <FadeIn delay={0.42} className="flex shrink-0 items-center gap-3">
            <a
              href="#problems"
              onClick={(e) => handleScrollTo(e, '#problems')}
              aria-label={t.exploreFeatures}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-tint-rose/25 text-paper transition-colors hover:bg-tint-rose/35"
            >
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </a>
            <Button href="#problems" variant="primary" className="rounded-full px-6 py-3 text-xs font-bold">
              {t.startConsultation}
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Four-color bento row, MediCare-style */}
      <div className="mx-auto mt-4 grid max-w-6xl grid-cols-2 gap-4 sm:mt-6 lg:grid-cols-4">
        {TILES.map((tile, i) => {
          const Icon = tile.icon
          return (
            <motion.a
              key={tile.n}
              href={tile.href}
              onClick={(e) => handleScrollTo(e, tile.href)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl p-6 text-ink ${tile.bg} transition-transform hover:-translate-y-1`}
            >
              <div>
                <p className="font-display text-lg leading-tight font-black">{tile.title}</p>
                <p className="mt-2 text-xs font-semibold opacity-70">{tile.brief}</p>
              </div>

              <Icon className="absolute right-4 bottom-4 size-16 opacity-20" strokeWidth={1.5} />

              <span className="relative z-10 flex size-9 items-center justify-center rounded-full bg-ink/85 text-paper transition-transform group-hover:-translate-x-0.5">
                <ArrowLeft className="size-4" strokeWidth={2.5} />
              </span>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
