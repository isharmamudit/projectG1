import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { CountUp } from '@/components/ui/CountUp'
import { Parallax } from '@/components/ui/Parallax'
import { useLanguage } from '@/lib/language'

const STAT_META = [
  { to: 800, suffix: 'M+', color: 'text-tint-rose' },
  { to: 92, suffix: '%', color: 'text-tint-amber' },
  { to: 12, suffix: 'M+', color: 'text-fg' },
]

// One hue per row, shared by the problem and the solution it maps to --
// ties the pair together visually instead of two independently-colored grids.
const ROW_META = [
  { n: '01', problemBg: 'bg-tint-rose/12 border border-tint-rose/25', solutionBg: 'bg-tint-rose/8 border border-tint-rose/20' },
  { n: '02', problemBg: 'bg-tint-amber/12 border border-tint-amber/25', solutionBg: 'bg-tint-amber/8 border border-tint-amber/20' },
  { n: '03', problemBg: 'bg-tint-violet/12 border border-tint-violet/25', solutionBg: 'bg-tint-violet/8 border border-tint-violet/20' },
  { n: '04', problemBg: 'bg-tint-blue/12 border border-tint-blue/25', solutionBg: 'bg-tint-blue/8 border border-tint-blue/20' },
  { n: '05', problemBg: 'bg-tint-sage/12 border border-tint-sage/25', solutionBg: 'bg-tint-sage/8 border border-tint-sage/20' },
  { n: '06', problemBg: 'bg-tint-teal/12 border border-tint-teal/25', solutionBg: 'bg-tint-teal/8 border border-tint-teal/20' },
]

export function Problems() {
  const { code, t } = useLanguage()

  return (
    <section id="problems" className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-fg-muted">{t.problems.eyebrow}</p>
        </div>

        {/* Layout Grid Container */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch">

          {/* ─── LEFT COLUMN: framing card, stats ─── */}
          <div className="lg:col-span-5 flex">
            <Parallax offset={-30} className="w-full">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card w-full rounded-3xl bg-tint-teal/10 border border-tint-teal/22 backdrop-blur-xl p-8 sm:p-10 text-fg flex flex-col justify-between min-h-[500px] lg:min-h-[580px] relative overflow-hidden"
              >
                {/* Top content */}
                <div>
                  <span className="inline-block border border-fg/25 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
                    {t.problems.tabProblems} → {t.problems.badgeSolutions}
                  </span>

                  <h2 className="font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-black uppercase leading-[0.9] tracking-tight">
                    {code === 'en' ? (
                      <>
                        What every <br />
                        health app <br />
                        gets{' '}
                        <ScrambleText text="wrong." trigger="mount" duration={1000} className="text-tint-rose" />
                      </>
                    ) : (
                      t.problems.heading
                    )}
                  </h2>

                  <p className="mt-6 text-xs sm:text-sm font-semibold opacity-85 leading-relaxed max-w-md">
                    {t.problems.subhead}
                  </p>
                </div>

                {/* Stats Counters Grid inside Left Card */}
                <div className="grid grid-cols-3 gap-2 mt-auto pt-6 border-t border-fg/10">
                  {STAT_META.map(({ to, suffix, color }, i) => (
                    <div key={i} className="text-left">
                      <p className={`font-display text-xl sm:text-2xl font-black leading-none ${color}`}>
                        <CountUp to={to} suffix={suffix} duration={1200} />
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-tight opacity-75 mt-2 leading-none">
                        {t.problems.statsLabels[i]}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Parallax>
          </div>

          {/* ─── RIGHT COLUMN: paired problem → solution rows ─── */}
          <div className="lg:col-span-7 flex">
            <Parallax offset={30} className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card w-full rounded-3xl border border-border backdrop-blur-xl bg-surface/40 p-4 sm:p-6 flex flex-col gap-3 relative overflow-hidden"
              >
                {/* Subtle background blueprint grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {ROW_META.map(({ n, problemBg, solutionBg }, i) => (
                  <SpotlightTilt
                    key={n}
                    className="relative grid grid-cols-1 items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr] sm:gap-3"
                    spotlightColor="rgba(255,255,255,0.15)"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className={`glass-card rounded-2xl backdrop-blur-xl ${problemBg} p-4 text-fg`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-display text-[10px] font-black opacity-40">{n}</span>
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-fg/10 font-black text-fg text-[10px] leading-none">
                          ✕
                        </span>
                      </div>
                      <p className="mt-2 font-display text-[12px] font-black uppercase leading-snug">
                        <ScrambleText text={t.problems.cards[i].title} trigger="hover" duration={600} />
                      </p>
                      <p className="mt-1 text-[10px] font-semibold opacity-75 leading-relaxed">{t.problems.cards[i].detail}</p>
                    </motion.div>

                    <div className="hidden items-center justify-center sm:flex">
                      <ArrowRight className="size-4 text-fg-muted" strokeWidth={2.5} />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 + 0.08 }}
                      className={`glass-card rounded-2xl backdrop-blur-xl ${solutionBg} p-4 text-fg`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-display text-[10px] font-black opacity-45">{n}</span>
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-fg/10 font-black text-fg text-[10px] leading-none">
                          ✓
                        </span>
                      </div>
                      <p className="mt-2 font-display text-[12px] font-black uppercase leading-snug">
                        <ScrambleText text={t.problems.solutions[i].headline} trigger="hover" duration={500} />
                      </p>
                      <p className="mt-1 text-[10px] font-semibold opacity-70 leading-relaxed">{t.problems.solutions[i].sub}</p>
                    </motion.div>
                  </SpotlightTilt>
                ))}
              </motion.div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
