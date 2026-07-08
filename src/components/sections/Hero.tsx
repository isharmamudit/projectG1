import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, HeartPulse, MessageCircle, Mic, PersonStanding, WifiOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useLanguage } from '@/lib/language'
import { ScrambleText } from '@/components/ui/ScrambleText'

const NAV_ITEMS = [
  { label: 'Why G1', href: '#problems' },
  { label: 'Features', href: '#voice' },
  { label: 'India', href: '#india' },
  { label: 'Trust', href: '#trust' },
]

// The four bento cards below the hero banner — solid theme-invariant pastels, like MediCare's colored tile row.
// Titles/briefs come from t.heroTiles; only the layout/styling/icon/href are fixed here.
const TILE_META = [
  { href: '#problems', bg: 'bg-pastel-amber/45 border border-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)]', icon: MessageCircle },
  { href: '#voice', bg: 'bg-pastel-sage/45 border border-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)]', icon: Mic },
  { href: '#problems', bg: 'bg-pastel-rose/45 border border-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)]', icon: PersonStanding },
  { href: '#problems', bg: 'bg-pastel-blue/45 border border-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)]', icon: WifiOff },
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
  const [mainIndex, setMainIndex] = useState(0)

  const images = [
    { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', alt: 'Doctor holding phone during consultation' },
    { src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80', alt: 'AI medical scan analysis' },
    { src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', alt: 'Digital health report screens' },
  ]

  const TILES = TILE_META.map((meta, i) => ({ ...meta, n: String(i + 1).padStart(2, '0'), title: t.heroTiles[i].title, brief: t.heroTiles[i].brief }))

  const badges = [
    { label: t.heroBadges[0], side: 'left' as const, top: 'top-[20%]', offsetClass: 'left-16', color: 'bg-tint-rose/25' },
    { label: t.heroBadges[1], side: 'right' as const, top: 'top-[20%]', offsetClass: 'right-16', color: 'bg-tint-sage/25' },
    { label: t.problems.solutions[0].headline, side: 'left' as const, top: 'top-[36%]', offsetClass: 'left-6', color: 'bg-tint-blue/25' },
    { label: t.problems.solutions[1].headline, side: 'right' as const, top: 'top-[36%]', offsetClass: 'right-6', color: 'bg-tint-amber/25' },
    { label: t.problems.solutions[2].headline, side: 'left' as const, top: 'top-[52%]', offsetClass: 'left-8', color: 'bg-tint-violet/25' },
    { label: t.problems.solutions[3].headline, side: 'right' as const, top: 'top-[52%]', offsetClass: 'right-8', color: 'bg-tint-teal/25' },
    { label: t.problems.solutions[4].headline, side: 'left' as const, top: 'top-[68%]', offsetClass: 'left-20', color: 'bg-tint-sage/25' },
    { label: t.problems.solutions[5].headline, side: 'right' as const, top: 'top-[68%]', offsetClass: 'right-20', color: 'bg-tint-rose/25' },
  ]

  return (
    <section id="top" className="relative w-full px-4 pt-24 pb-16 sm:px-6 md:pt-6">

      {/* In-page navbar: desktop only — the global Navbar already stays permanently visible on mobile,
          but auto-hides until scroll on desktop, so the hero needs its own static one there. */}
      <FadeIn className="relative z-30 mb-6 hidden w-full items-center justify-between rounded-2xl border border-border bg-surface/70 px-5 py-3 backdrop-blur-xl md:flex">
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
        </div>
      </FadeIn>

      {/* Hero banner: frosted glassmorphic panel — giant headline behind a central figure, floating badges, bottom caption + CTA */}
      <div className="glass-card relative min-h-[560px] w-full overflow-hidden rounded-[32px] px-6 pt-10 pb-8 sm:min-h-[620px] sm:px-10 sm:pt-14">

        {/* Giant headline, sitting behind the figure */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="pointer-events-none relative z-0 max-w-full [overflow-wrap:anywhere] select-none text-center font-display text-[clamp(2rem,9vw,8rem)] leading-[0.85] font-black tracking-tight text-ink/90 uppercase"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {t.heroWords.map((w, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-[0.15em] last:mr-0 ${index === 1 ? 'pointer-events-auto cursor-default' : ''}`}
              style={index === 1 ? { color: 'var(--color-tint-amber)' } : {}}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
              }}
            >
              {index === 1 ? (
                <ScrambleText text={w} trigger="mount" duration={1000} />
              ) : (
                w
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Floating badges flanking the figure */}
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 10,
              delay: 0.15 + i * 0.22,
            }}
            className={`absolute ${b.top} ${b.offsetClass} z-20 hidden xl:block`}
          >
            <div className="glass-card flex items-center gap-3.5 rounded-full border border-white/25 bg-surface/60 px-6 py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-105">
              <span className={`flex size-9 items-center justify-center rounded-full ${b.color}`}>
                <ArrowUpRight className="size-5 text-fg" strokeWidth={3} />
              </span>
              <span className="text-xs font-black tracking-wider uppercase whitespace-nowrap text-fg">{b.label}</span>
            </div>
          </motion.div>
        ))}

        {/* Central visual assets area: stateful dynamic triptych carousel */}
        <div className="relative z-10 mx-auto mt-4 flex items-end justify-center sm:-mt-6 h-[300px] sm:h-[380px] w-full max-w-[680px]">
          {images.map((img, i) => {
            const isCenter = i === mainIndex
            const isLeft = i === (mainIndex + 1) % 3
            const isRight = i === (mainIndex + 2) % 3

            let positionClass = ''
            let animationProps = {}
            let sizeClass = ''
            let roundedClass = ''

            if (isCenter) {
              positionClass = 'relative z-10 mx-auto'
              sizeClass = 'h-[300px] w-[220px] sm:h-[380px] sm:w-[280px]'
              roundedClass = 'rounded-t-[110px] sm:rounded-t-[140px]'
              animationProps = { scale: 1, x: 0, opacity: 1 }
            } else if (isLeft) {
              positionClass = 'absolute left-4 z-0'
              sizeClass = 'hidden md:block h-[200px] w-[140px] sm:h-[260px] sm:w-[180px]'
              roundedClass = 'rounded-t-[70px] sm:rounded-t-[90px]'
              animationProps = { scale: 0.9, x: 0, opacity: 0.85 }
            } else if (isRight) {
              positionClass = 'absolute right-4 z-0'
              sizeClass = 'hidden md:block h-[200px] w-[140px] sm:h-[260px] sm:w-[180px]'
              roundedClass = 'rounded-t-[70px] sm:rounded-t-[90px]'
              animationProps = { scale: 0.9, x: 0, opacity: 0.85 }
            }

            return (
              <motion.div
                key={img.src}
                layout
                animate={animationProps}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                onClick={() => {
                  if (!isCenter) {
                    setMainIndex(i)
                  }
                }}
                className={`overflow-hidden cursor-pointer border border-white/15 shadow-xl transition-all duration-300 hover:border-white/35 ${positionClass} ${sizeClass} ${roundedClass} bg-surface/10`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full select-none object-cover"
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom caption + CTA */}
        <div className="relative z-20 mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeIn delay={0.35} className="max-w-xs">
            <p className="text-[11px] font-bold tracking-wide text-ink/70 uppercase">{t.heroSubtitle}</p>
          </FadeIn>

          <FadeIn delay={0.42} className="flex shrink-0 items-center gap-3">
            <a
              href="#problems"
              onClick={(e) => handleScrollTo(e, '#problems')}
              aria-label={t.exploreFeatures}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-tint-rose/25 text-ink transition-colors hover:bg-tint-rose/35"
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
      <div className="mt-4 grid w-full grid-cols-2 gap-4 sm:mt-6 lg:grid-cols-4">
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
