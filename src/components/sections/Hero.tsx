import { ArrowUpRight, HeartPulse } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { Parallax } from '@/components/ui/Parallax'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useLanguage } from '@/lib/language'

const TILES = [
  { n: '01', label: 'Chat', href: '#problems', bg: 'bg-b-blue', brief: 'Consult in 12+ dialects' },
  { n: '02', label: 'Voice', href: '#voice', bg: 'bg-b-orange', brief: 'Get clinical reports' },
  { n: '03', label: 'Scan', href: '#problems', bg: 'bg-b-red', brief: 'Photo your symptoms' },
  { n: '04', label: 'Yoga', href: '#problems', bg: 'bg-b-green', brief: 'Posture coaching' },
  { n: '05', label: 'Offline', href: '#problems', bg: 'bg-b-purple', brief: 'Works without signal' },
  { n: '06', label: 'Memory', href: '#problems', bg: 'bg-b-yellow', brief: 'Your full history' },
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

  return (
    <section id="top" className="relative w-full pt-8 pb-4">
      {/* Outer Flex Container for Split Screen Layout */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:h-[90vh] px-4 md:px-5">

        {/* Left Sidebar (Desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden md:flex flex-col justify-between w-[280px] py-1 shrink-0"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 text-fg">
            <HeartPulse className="size-6 text-accent" strokeWidth={2.5} />
            <span className="font-display text-2xl font-black leading-none tracking-tight">
              projectG1<span className="text-accent">.</span>
            </span>
          </div>

          {/* Navigation Tiles List (Single-column vertical stack matching units.) */}
          <div className="flex flex-col gap-2.5 my-3">
            {TILES.map((tile) => (
              <a
                key={tile.n}
                href={tile.href}
                onClick={(e) => handleScrollTo(e, tile.href)}
                className={`group flex flex-col justify-between p-4 h-[105px] rounded-[22px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-ink ${tile.bg} hover:text-white`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="font-display text-xs font-black opacity-55 transition-colors group-hover:text-white group-hover:opacity-85">{tile.n}</span>
                  <ArrowUpRight className="size-4 opacity-75 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black tracking-tight leading-none transition-colors group-hover:text-white">{tile.label}</span>
                  <span className="text-[10px] font-bold text-ink/65 leading-snug mt-1 transition-colors group-hover:text-white/80">{tile.brief}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Footer controls */}
          <div className="flex flex-col gap-2.5">
            <a
              href="#problems"
              onClick={(e) => handleScrollTo(e, '#problems')}
              className="flex items-center justify-center w-full rounded-xl bg-accent text-paper text-xs font-bold py-2.5 px-3 transition-transform hover:scale-[1.02] shadow-[0_4px_12px_rgba(var(--color-accent-rgb),0.2)]"
            >
              {t.consultG1} ↗
            </a>
            <LanguageSwitcher />
          </div>
        </motion.div>

        {/* Right Main Hero Panel */}
        <div className="flex-1 relative rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-border-strong spotlight min-h-[500px] md:h-full">
          {/* Parallax Background Image */}
          <Parallax offset={-25} className="absolute inset-0 w-full h-[120%]">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
              alt="Vernacular G1 AI Health consultation"
              className="w-full h-full object-cover select-none brightness-[0.88]"
            />
          </Parallax>

          {/* Premium overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/5 pointer-events-none" />

          {/* Hero text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-12 text-paper bg-black/10">

            <Parallax offset={-15}>
              <motion.h1
                key={t.heroWords.join('-')}
                className="font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.9] tracking-tighter uppercase font-black max-w-4xl drop-shadow-[0_6px_20px_rgba(0,0,0,0.65)]"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {t.heroWords.map((w, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-[0.18em] last:mr-0 will-change-transform"
                    style={index === 1 ? { color: 'var(--color-b-yellow)' } : {}}
                    variants={{
                      hidden: { opacity: 0, y: 35 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </motion.h1>
            </Parallax>

            <FadeIn delay={0.35} className="mt-5 max-w-2xl mx-auto">
              <p className="text-sm font-bold text-paper leading-relaxed sm:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {t.heroSubtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.5} className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button href="#problems" variant="primary" className="rounded-full px-8 py-3.5 text-sm font-bold bg-black text-white hover:bg-neutral-900 hover:scale-105 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.35)] border border-neutral-800 shrink-0">
                {t.startConsultation} ↗
              </Button>
              <a
                href="#problems"
                onClick={(e) => handleScrollTo(e, '#problems')}
                className="text-xs font-bold text-paper/85 uppercase tracking-widest hover:text-paper transition-colors py-2"
              >
                {t.exploreFeatures} ↓
              </a>
            </FadeIn>
          </div>
        </div>

      </div>

      {/* Mobile-only Navigation Tiles Grid (renders below the main panel on small screens) */}
      <div className="mx-auto max-w-6xl mt-6 md:hidden">
        <p className="text-[10px] font-black uppercase tracking-widest text-fg-muted mb-3.5">
          {t.tapToExplore}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {TILES.map((tile) => (
            <a
              key={tile.n}
              href={tile.href}
              onClick={(e) => handleScrollTo(e, tile.href)}
              className={`group flex flex-col justify-between p-4 rounded-2xl border border-ink/5 text-ink min-h-[96px] transition-transform active:scale-[0.98] ${tile.bg}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-display text-sm font-black opacity-55">{tile.n}</span>
                <ArrowUpRight className="size-4 opacity-75" />
              </div>
              <span className="text-xs font-black tracking-tight leading-none mt-4">{tile.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
