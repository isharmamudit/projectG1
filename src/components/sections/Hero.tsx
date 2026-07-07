import { ArrowUpRight, HeartPulse } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { Parallax } from '@/components/ui/Parallax'

const TILES = [
  { n: '01', label: 'Chat', href: '#problems', bg: 'bg-b-blue' },
  { n: '02', label: 'Voice', href: '#voice', bg: 'bg-b-orange' },
  { n: '03', label: 'Scan', href: '#problems', bg: 'bg-b-red' },
  { n: '04', label: 'Yoga', href: '#problems', bg: 'bg-b-green' },
  { n: '05', label: 'Offline', href: '#problems', bg: 'bg-b-purple' },
  { n: '06', label: 'Memory', href: '#problems', bg: 'bg-b-yellow' },
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
  return (
    <section id="top" className="relative w-full px-4 pt-24 pb-10 sm:px-6 md:px-8">
      {/* Outer Flex Container for Split Screen Layout */}
      <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:h-[82vh] md:max-h-[720px]">
        
        {/* Left Sidebar (Desktop only) */}
        <motion.div 
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden md:flex flex-col justify-between w-[220px] bg-paper border border-border-strong rounded-3xl p-5 shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 text-fg">
            <HeartPulse className="size-5 text-accent" strokeWidth={2.5} />
            <span className="font-display text-base font-black leading-none tracking-tight">
              projectG1<span className="text-accent">.</span>
            </span>
          </div>

          {/* Navigation Tiles List */}
          <div className="flex flex-col gap-2.5 my-6">
            {TILES.map((t) => (
              <a
                key={t.n}
                href={t.href}
                onClick={(e) => handleScrollTo(e, t.href)}
                className={`group flex items-center justify-between p-3.5 rounded-xl border border-ink/5 transition-all duration-300 hover:scale-[1.04] text-ink ${t.bg}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-xs font-black opacity-45">{t.n}</span>
                  <span className="text-xs font-black tracking-tight">{t.label}</span>
                </div>
                <ArrowUpRight className="size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
              </a>
            ))}
          </div>

          {/* Footer controls */}
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-1.5 w-full rounded-xl border border-border-strong bg-surface-2 text-[11px] font-bold text-fg py-2 px-3 transition-colors hover:bg-surface">
              <span>English</span>
              <span className="opacity-60">🌐</span>
            </button>
          </div>
        </motion.div>

        {/* Right Main Hero Panel */}
        <div className="flex-1 relative rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-border-strong spotlight min-h-[500px] md:h-full">
          {/* Parallax Background Image */}
          <Parallax offset={-25} className="absolute inset-0 w-full h-[120%]">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80"
              alt="Vernacular G1 AI Health consultation"
              className="w-full h-full object-cover select-none brightness-[0.74]"
            />
          </Parallax>

          {/* Premium overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 pointer-events-none" />

          {/* Hero text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-14 text-paper">
            <FadeIn delay={0.1} y={15}>
              <span className="inline-block rounded-full bg-accent/25 border border-accent/40 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent mb-4">
                VERNACULAR AI HEALTHCARE
              </span>
            </FadeIn>

            <Parallax offset={-15}>
              <motion.h1
                className="font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.92] tracking-tight uppercase"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {(['Your', 'health,', 'understood.'].map((w, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-[0.18em] last:mr-0 will-change-transform"
                    style={w === 'health,' ? { color: 'var(--color-b-yellow)' } : {}}
                    variants={{
                      hidden: { opacity: 0, y: 35 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
                    }}
                  >
                    {w}
                  </motion.span>
                )))}
              </motion.h1>
            </Parallax>

            <FadeIn delay={0.35} className="mt-5 max-w-xl">
              <p className="text-sm font-medium text-paper/85 leading-relaxed sm:text-base">
                Ask in your dialect. Speak your symptoms. Photo a prescription. G1 translates clinical complexity into native Indian tongues instantly.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} className="mt-8 flex flex-wrap gap-4 items-center">
              <Button href="#problems" variant="primary" className="rounded-full px-7 py-3 text-sm font-bold bg-accent text-paper hover:scale-105 transition-transform shrink-0">
                Start Consultation ↗
              </Button>
              <a 
                href="#problems" 
                onClick={(e) => handleScrollTo(e, '#problems')}
                className="text-xs font-bold text-paper/80 uppercase tracking-widest hover:text-paper transition-colors py-2"
              >
                Explore features ↓
              </a>
            </FadeIn>
          </div>
        </div>

      </div>

      {/* Mobile-only Navigation Tiles Grid (renders below the main panel on small screens) */}
      <div className="mx-auto max-w-6xl mt-6 md:hidden">
        <p className="text-[10px] font-black uppercase tracking-widest text-fg-muted mb-3.5">
          Tap to explore features
        </p>
        <div className="grid grid-cols-2 gap-3">
          {TILES.map((t) => (
            <a
              key={t.n}
              href={t.href}
              onClick={(e) => handleScrollTo(e, t.href)}
              className={`group flex flex-col justify-between p-4 rounded-2xl border border-ink/5 text-ink min-h-[96px] transition-transform active:scale-[0.98] ${t.bg}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-display text-sm font-black opacity-55">{t.n}</span>
                <ArrowUpRight className="size-4 opacity-75" />
              </div>
              <span className="text-xs font-black tracking-tight leading-none mt-4">{t.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
