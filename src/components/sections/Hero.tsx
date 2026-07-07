import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, HeartPulse } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { Parallax } from '@/components/ui/Parallax'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { CoverflowStack } from '@/components/ui/CoverflowStack'
import { useLanguage } from '@/lib/language'
import { cn } from '@/lib/utils'

const TILES = [
  { n: '01', label: 'Chat', href: '#problems', bg: 'bg-tint-blue/12 border border-tint-blue/25', brief: 'Consult in 12+ dialects' },
  { n: '02', label: 'Voice', href: '#voice', bg: 'bg-tint-amber/12 border border-tint-amber/25', brief: 'Get clinical reports' },
  { n: '03', label: 'Yoga', href: '#problems', bg: 'bg-tint-sage/12 border border-tint-sage/25', brief: 'Posture coaching' },
  { n: '04', label: 'Offline', href: '#problems', bg: 'bg-tint-violet/12 border border-tint-violet/25', brief: 'Works without signal' },
  { n: '05', label: 'Memory', href: '#problems', bg: 'bg-tint-teal/12 border border-tint-teal/25', brief: 'Your full history' },
  { n: '06', label: 'Scan', href: '#problems', bg: 'bg-tint-rose/12 border border-tint-rose/25', brief: 'Photo your symptoms' },
]

// One slide per sidebar tile — image + a short caption that surfaces only
// while that slide is centered in the carousel.
const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
    alt: 'Doctor holding a phone during a consultation',
    title: 'Chat',
    caption: 'Ask in your dialect, get clinical answers back.',
  },
  {
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1400&q=80',
    alt: 'Person on a video consultation call',
    title: 'Voice',
    caption: 'Speak your symptoms — G1 turns it into a doctor report.',
  },
  {
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80',
    alt: 'Person practicing yoga at sunrise',
    title: 'Yoga',
    caption: 'Real-time posture coaching, right from your camera.',
  },
  {
    img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=80',
    alt: 'Person using a phone in a rural setting',
    title: 'Offline',
    caption: 'Blood group, allergies and medicines, even with no signal.',
  },
  {
    img: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1400&q=80',
    alt: 'Notebook and records laid out on a desk',
    title: 'Memory',
    caption: 'Every report and visit connected across years.',
  },
  {
    img: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1400&q=80',
    alt: 'Person taking a photo with a smartphone',
    title: 'Scan',
    caption: 'Photograph a rash or prescription — instant answers.',
  },
]

const SLIDE_MS = 4000

function handleScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    const y = target.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export function Hero() {
  const { t, code } = useLanguage()
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative w-full pt-8 pb-4">
      {/* Outer Flex Container for Split Screen Layout */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:h-[90vh] px-4 md:px-5">

        {/* Left Sidebar (Desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden md:flex flex-col justify-between w-[280px] py-1 shrink-0 overflow-y-auto"
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
            {TILES.map((tile, i) => (
              <a
                key={tile.n}
                href={tile.href}
                onClick={(e) => handleScrollTo(e, tile.href)}
                onMouseEnter={() => setActive(i)}
                className={`glass-card group flex flex-col justify-between p-4 h-[105px] rounded-[22px] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-fg ${tile.bg}`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="font-display text-xs font-black opacity-50">{tile.n}</span>
                  <ArrowUpRight className="size-4 opacity-70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black tracking-tight leading-none">{tile.label}</span>
                  <span className="text-[10px] font-bold text-fg-muted leading-snug mt-1">{tile.brief}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Footer controls */}
          <div className="flex flex-col gap-2.5">
            <LanguageSwitcher />
          </div>
        </motion.div>

        {/* Right column: text first, carousel below */}
        <div className="flex flex-1 flex-col gap-6 md:h-full">

          {/* Text block */}
          <div className="px-2 pt-2 text-center sm:px-6">
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

            <FadeIn delay={0.42} className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#problems" variant="primary" className="rounded-full px-8 py-3.5 text-sm font-bold shrink-0">
                {t.startConsultation} ↗
              </Button>
              <a
                href="#problems"
                onClick={(e) => handleScrollTo(e, '#problems')}
                className="text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg py-2"
              >
                {t.exploreFeatures} ↓
              </a>
            </FadeIn>
          </div>

          {/* Carousel */}
          <div
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="relative min-h-[360px] flex-1 overflow-hidden rounded-3xl border border-border-strong shadow-[0_16px_40px_rgba(0,0,0,0.12)] spotlight"
          >
            <Parallax offset={-25} className="absolute inset-0 h-[120%] w-full">
              <CoverflowStack slides={SLIDES} active={active} />
            </Parallax>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Slide nav: prev/next arrows + progress dots */}
            <div className="absolute top-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length)}
                className="glass-card flex size-7 items-center justify-center rounded-full text-paper/80 backdrop-blur-md transition-colors hover:text-paper"
              >
                <ChevronLeft className="size-4" strokeWidth={2.5} />
              </button>

              <div className="flex gap-1.5">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.img}
                    type="button"
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="group/dot flex h-3 items-center px-0.5"
                  >
                    <span
                      className={cn(
                        'h-1 rounded-full transition-all duration-300',
                        i === active ? 'w-6 bg-tint-teal' : 'w-2.5 bg-white/50 group-hover/dot:bg-white/80',
                      )}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Next slide"
                onClick={() => setActive((a) => (a + 1) % SLIDES.length)}
                className="glass-card flex size-7 items-center justify-center rounded-full text-paper/80 backdrop-blur-md transition-colors hover:text-paper"
              >
                <ChevronRight className="size-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Per-slide caption: only the active feature's copy is shown */}
            {code === 'en' && (
              <div className="absolute inset-x-4 bottom-4 z-10 flex justify-center sm:inset-x-8 sm:bottom-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card max-w-md rounded-2xl px-5 py-3 text-center backdrop-blur-xl"
                  >
                    <p className="font-display text-xs font-black uppercase tracking-widest text-tint-amber">{SLIDES[active].title}</p>
                    <p className="mt-1 text-xs font-semibold text-paper sm:text-sm">{SLIDES[active].caption}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
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
              className={`glass-card group flex flex-col justify-between p-4 rounded-2xl backdrop-blur-xl text-fg min-h-[96px] transition-transform active:scale-[0.98] ${tile.bg}`}
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
