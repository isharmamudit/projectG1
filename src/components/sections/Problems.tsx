import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const PROBLEM_META = [
  { n: '01', bg: 'bg-tint-rose/12 border border-tint-rose/25' },
  { n: '02', bg: 'bg-tint-amber/12 border border-tint-amber/25' },
  { n: '03', bg: 'bg-tint-violet/12 border border-tint-violet/25' },
  { n: '04', bg: 'bg-tint-blue/12 border border-tint-blue/25' },
  { n: '05', bg: 'bg-tint-sage/12 border border-tint-sage/25' },
  { n: '06', bg: 'bg-tint-teal/12 border border-tint-teal/25' },
]

const SOLUTION_META = [
  { n: '01', color: 'bg-tint-blue/12 border border-tint-blue/25' },
  { n: '02', color: 'bg-tint-amber/12 border border-tint-amber/25' },
  { n: '03', color: 'bg-tint-sage/12 border border-tint-sage/25' },
  { n: '04', color: 'bg-tint-violet/12 border border-tint-violet/25' },
  { n: '05', color: 'bg-tint-rose/12 border border-tint-rose/25' },
  { n: '06', color: 'bg-tint-teal/12 border border-tint-teal/25' },
]

export function Problems() {
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions'>('problems')
  const { code, t } = useLanguage()

  return (
    <section id="problems" className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        
        {/* Centered Segmented Control Toggle above columns */}
        <div className="mb-8 flex flex-col items-center justify-center gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-fg-muted">
            {t.problems.eyebrow}
          </p>
          <div className="inline-flex rounded-full bg-surface border border-border-strong p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('problems')}
              className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'problems'
                  ? 'bg-ink text-paper shadow-md scale-105'
                  : 'text-fg-muted hover:text-fg'
              }`}
            >
              {t.problems.tabProblems}
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'solutions'
                  ? 'bg-ink text-paper shadow-md scale-105'
                  : 'text-fg-muted hover:text-fg'
              }`}
            >
              {t.problems.tabSolutions}
            </button>
          </div>
        </div>

        {/* Layout Grid Container */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch">

          
          {/* ─── LEFT COLUMN (Yellow Card style from Units layout) ─── */}
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
                    {activeTab === 'problems' ? t.problems.tabProblems : t.problems.badgeSolutions}
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


          {/* ─── RIGHT COLUMN (Grid switcher style) ─── */}
          <div className="lg:col-span-7 flex">
            <Parallax offset={30} className="w-full">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card w-full rounded-3xl border border-border backdrop-blur-xl bg-surface/40 p-6 flex flex-col items-stretch justify-stretch min-h-[500px] lg:min-h-[580px] overflow-hidden relative"
              >

              {/* Subtle background blueprint grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              <AnimatePresence mode="wait">
                {activeTab === 'problems' ? (
                  <motion.div
                    key="problems-grid"
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 flex-1 h-full items-stretch justify-items-stretch"
                  >
                    {PROBLEM_META.map(({ n, bg }, i) => (
                      <SpotlightTilt
                        key={n}
                        className={`glass-card group relative rounded-2xl backdrop-blur-xl ${bg} p-5 text-fg flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300`}
                        spotlightColor="rgba(255,255,255,0.25)"
                      >

                        <div className="flex items-start justify-between">
                          <span className="font-display text-[10px] font-black opacity-40">{n}</span>
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-fg/10 font-black text-fg text-[10px] leading-none">
                            ✕
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="font-display text-[13px] font-black uppercase leading-snug">
                            <ScrambleText text={t.problems.cards[i].title} trigger="hover" duration={600} />
                          </p>
                          <p className="mt-1 text-[10px] font-semibold opacity-75 leading-relaxed">
                            {t.problems.cards[i].detail}
                          </p>
                        </div>
                      </SpotlightTilt>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="solutions-grid"
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 flex-1 h-full items-stretch justify-items-stretch"
                  >
                    {SOLUTION_META.map(({ n, color }, i) => (
                      <motion.div
                        key={n}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ y: -3 }}
                        className={`glass-card rounded-2xl backdrop-blur-xl ${color} p-5 text-fg flex flex-col justify-between cursor-default`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-display text-[10px] font-black opacity-45">{n}</span>
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-fg/10 font-black text-fg text-[10px] leading-none">
                            ✓
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="font-display text-[13px] font-black uppercase leading-snug">
                            <ScrambleText text={t.problems.solutions[i].headline} trigger="hover" duration={500} />
                          </p>
                          <p className="mt-1 text-[10px] font-semibold opacity-70 leading-relaxed">
                            {t.problems.solutions[i].sub}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Parallax>
        </div> {/* closes line 127 flex wrapper div */}
      </div> {/* closes line 73 grid container div */}
    </div> {/* closes line 41 max-w-6xl div */}
  </section>
  )
}



