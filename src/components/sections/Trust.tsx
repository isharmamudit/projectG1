import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { AnimatedTitle } from '@/components/ui/AnimatedTitle'
import { FadeIn } from '@/components/ui/FadeIn'
import { PixelIcon, PIXEL } from '@/components/ui/PixelIcon'
import { TrustFolder } from '@/components/ui/TrustFolder'
import { useLanguage } from '@/lib/language'

// title/sub/rows come from t.trust.folders[i]; only color/position are fixed here.
const FOLDER_META = [
  { color: 'var(--color-tint-amber)', initial: { top: '12%', left: '10%', rotate: -4 } },
  { color: 'var(--color-tint-sage)', initial: { top: '38%', left: '42%', rotate: 3 } },
  { color: 'var(--color-tint-teal)', initial: { top: '10%', left: '72%', rotate: 5 } },
]

export function Trust() {
  const { t } = useLanguage()
  const FOLDERS = FOLDER_META.map((meta, i) => ({ ...meta, ...t.trust.folders[i] }))
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <section id="trust" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-between">
          <AnimatedTitle
            lines={[t.trust.line1, t.trust.line2]}
            className="text-center font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-fg uppercase lg:text-left lg:[&>div]:justify-start"
          />
          <FadeIn delay={0.2} className="hidden w-32 shrink-0 lg:block">
            <PixelIcon pattern={PIXEL.heart} fill="var(--color-tint-rose)" className="w-full text-fg-subtle" />
          </FadeIn>
        </div>

        <FadeIn delay={0.15} className="mt-4">
          <p className="text-center text-xs font-medium text-fg-muted lg:text-left">
            {t.trust.caption}
          </p>
        </FadeIn>

        {/* Canvas: draggable folders scattered on a blueprint grid */}
        <div
          ref={canvasRef}
          className="grid-paper relative mt-6 h-[320px] overflow-hidden rounded-3xl border border-border-strong sm:h-[380px]"
        >
          {FOLDERS.map((folder, i) => (
            <TrustFolder
              key={folder.title}
              label={folder.title}
              color={folder.color}
              isOpen={openIndex === i}
              onOpen={() => setOpenIndex((cur) => (cur === i ? null : i))}
              initial={folder.initial}
              canvasRef={canvasRef}
            />
          ))}

          {/* Content panel: animates in over the canvas when a folder opens */}
          <AnimatePresence>
            {openIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="glass-card pointer-events-auto absolute inset-x-4 bottom-4 top-4 z-10 flex flex-col rounded-2xl p-6 backdrop-blur-xl sm:inset-x-10 sm:top-10"
                style={{
                  background: `color-mix(in srgb, ${FOLDERS[openIndex].color} 14%, var(--color-surface) 86%)`,
                  border: `1px solid color-mix(in srgb, ${FOLDERS[openIndex].color} 30%, transparent)`,
                }}
              >
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpenIndex(null)}
                  className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-fg/10 text-fg transition-colors hover:bg-fg/20"
                >
                  <X className="size-4" strokeWidth={2.5} />
                </button>

                <h3 className="font-display text-2xl uppercase text-fg sm:text-3xl">{FOLDERS[openIndex].title}</h3>
                <p className="mt-1 text-sm font-bold text-fg-muted">{FOLDERS[openIndex].sub}</p>

                <motion.ul
                  className="mt-6 flex-1"
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
                >
                  {FOLDERS[openIndex].rows.map((row) => (
                    <motion.li
                      key={row}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                      }}
                      className="border-b border-fg/15 py-3 text-sm font-medium text-fg"
                    >
                      {row}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
