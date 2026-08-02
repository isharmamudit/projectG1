import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Droplets,
  GlassWater,
  HandMetal,
  HeartPulse,
  Shield,
  Thermometer,
  Users,
  UtensilsCrossed,
  Wind,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSeasonalCards, getCurrentSeasonLabel } from '@/lib/sehat/seasonal'
import type { PreventionCard } from '@/lib/sehat/seasonal'

// Map icon name strings from the data layer to actual Lucide components.
// This avoids a dynamic import or eval — all icons are in the bundle already.
const ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  GlassWater,
  Shield,
  UtensilsCrossed,
  Thermometer,
  HeartPulse,
  HandMetal,
  Users,
  Wind,
  ClipboardCheck,
}

// Tint token → Tailwind utility mappings that match the existing design tokens.
const ACCENT_STYLES: Record<
  string,
  { wash: string; border: string; icon: string; label: string; cta: string; dot: string }
> = {
  'tint-amber': {
    wash: 'bg-tint-amber/12',
    border: 'border-tint-amber/25',
    icon: 'text-tint-amber',
    label: 'text-tint-amber',
    cta: 'bg-tint-amber/15 text-tint-amber hover:bg-tint-amber/25',
    dot: 'bg-tint-amber',
  },
  'tint-blue': {
    wash: 'bg-tint-blue/12',
    border: 'border-tint-blue/25',
    icon: 'text-tint-blue',
    label: 'text-tint-blue',
    cta: 'bg-tint-blue/15 text-tint-blue hover:bg-tint-blue/25',
    dot: 'bg-tint-blue',
  },
  'tint-sage': {
    wash: 'bg-tint-sage/12',
    border: 'border-tint-sage/25',
    icon: 'text-tint-sage',
    label: 'text-tint-sage',
    cta: 'bg-tint-sage/15 text-tint-sage hover:bg-tint-sage/25',
    dot: 'bg-tint-sage',
  },
  'tint-rose': {
    wash: 'bg-tint-rose/12',
    border: 'border-tint-rose/25',
    icon: 'text-tint-rose',
    label: 'text-tint-rose',
    cta: 'bg-tint-rose/15 text-tint-rose hover:bg-tint-rose/25',
    dot: 'bg-tint-rose',
  },
  'tint-teal': {
    wash: 'bg-tint-teal/12',
    border: 'border-tint-teal/25',
    icon: 'text-tint-teal',
    label: 'text-tint-teal',
    cta: 'bg-tint-teal/15 text-tint-teal hover:bg-tint-teal/25',
    dot: 'bg-tint-teal',
  },
  'tint-violet': {
    wash: 'bg-tint-violet/12',
    border: 'border-tint-violet/25',
    icon: 'text-tint-violet',
    label: 'text-tint-violet',
    cta: 'bg-tint-violet/15 text-tint-violet hover:bg-tint-violet/25',
    dot: 'bg-tint-violet',
  },
}

function getAccent(accentKey: string) {
  return ACCENT_STYLES[accentKey] ?? ACCENT_STYLES['tint-teal']
}

interface SingleCardProps {
  card: PreventionCard
  direction: number
}

function SingleCard({ card, direction }: SingleCardProps) {
  const accent = getAccent(card.accent)
  const IconComp = ICON_MAP[card.icon] ?? Shield

  return (
    <motion.div
      key={card.id}
      custom={direction}
      initial={{ opacity: 0, x: direction * 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -40 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'spotlight relative overflow-hidden rounded-2xl border p-5',
        accent.wash,
        accent.border,
      )}
    >
      {/* Background icon watermark */}
      <IconComp
        className={cn('absolute right-4 bottom-4 size-20 opacity-[0.07]', accent.icon)}
        strokeWidth={1.5}
        aria-hidden
      />

      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-xl border',
            accent.wash,
            accent.border,
          )}
        >
          <IconComp className={cn('size-4.5', accent.icon)} strokeWidth={2.25} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={cn('text-[10px] font-black tracking-[0.18em] uppercase', accent.label)}
          >
            Prevention · {getCurrentSeasonLabel()}
          </p>
          <h3 className="mt-0.5 font-display text-[17px] font-black leading-tight text-fg">
            {card.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">{card.body}</p>

      <a
        href={card.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'mt-4 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12.5px] font-bold transition-colors',
          accent.cta,
        )}
      >
        {card.cta}
        <ChevronRight className="size-3.5" strokeWidth={2.5} />
      </a>
    </motion.div>
  )
}

/**
 * Seasonal prevention card carousel.
 *
 * Automatically surfaces 2–3 cards relevant to the current Indian
 * meteorological season. Cards rotate by day at the data layer, and the user
 * can also manually step through them with the chevron buttons.
 */
export function SeasonalCards() {
  const cards = getSeasonalCards(3)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  if (cards.length === 0) return null

  const card = cards[index]

  function prev() {
    setDirection(-1)
    setIndex((i) => (i - 1 + cards.length) % cards.length)
  }

  function next() {
    setDirection(1)
    setIndex((i) => (i + 1) % cards.length)
  }

  return (
    <div>
      {/* Section header */}
      <div className="mb-3 flex items-center gap-2">
        <p className="text-[11px] font-black tracking-[0.2em] text-fg-muted uppercase">
          Seasonal health
        </p>
        <span className="flex-1 border-t border-border" />
        {cards.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous prevention tip"
              className="flex size-7 items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <ChevronLeft className="size-4" strokeWidth={2.5} />
            </button>
            {/* Dot indicators */}
            <div className="flex items-center gap-1" aria-hidden>
              {cards.map((c, i) => {
                const a = getAccent(c.accent)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1)
                      setIndex(i)
                    }}
                    aria-label={`Go to card ${i + 1}`}
                    className={cn(
                      'size-1.5 rounded-full transition-all duration-200',
                      i === index ? cn('w-4', a.dot) : 'bg-fg-subtle/40',
                    )}
                  />
                )
              })}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next prevention tip"
              className="flex size-7 items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <ChevronRight className="size-4" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      {/* Card */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <SingleCard key={card.id} card={card} direction={direction} />
        </AnimatePresence>
      </div>
    </div>
  )
}
