import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { CountUp } from '@/components/ui/CountUp'
import { Parallax } from '@/components/ui/Parallax'

const STATS = [
  { to: 800, suffix: 'M+', label: 'Underserved Indians', color: 'text-b-red' },
  { to: 92, suffix: '%', label: 'Excluded Dialects', color: 'text-b-orange' },
  { to: 12, suffix: 'M+', label: 'Lost Records', color: 'text-ink' }, // changed color to ink for dark visibility
]

const PROBLEMS = [
  { n: '01', title: 'Reports become dead PDFs', detail: 'Stored but never connected or compared over time.', bg: 'bg-b-red' },
  { n: '02', title: 'No longitudinal timeline', detail: "Can't see how your health changed over months or years.", bg: 'bg-b-orange' },
  { n: '03', title: 'No relationship between data', detail: 'Medicines, reports, symptoms, doctors — all isolated silos.', bg: 'bg-b-red' },
  { n: '04', title: 'Weak emergency readiness', detail: 'Emergency info not instantly accessible offline.', bg: 'bg-b-orange' },
  { n: '05', title: 'Doctor visit prep is missing', detail: 'Patients forget questions and history during consultations.', bg: 'bg-b-red' },
  { n: '06', title: 'No caregiver workflow', detail: 'Children managing parents still rely on WhatsApp calls.', bg: 'bg-b-orange' },
  { n: '07', title: 'No multimodal understanding', detail: "Can't handle reports, prescriptions, voice, and images together.", bg: 'bg-b-red' },
  { n: '08', title: 'AI is mostly a chatbot', detail: 'It answers questions but never completes actions for you.', bg: 'bg-b-orange' },
]

const SOLUTIONS = [
  { n: '01', headline: 'Built for rural India', sub: 'Low bandwidth, any phone, any dialect — G1 works where others don\'t.', color: 'bg-b-blue' },
  { n: '02', headline: 'Every report stays alive', sub: 'Upload once, query forever. Your records grow smarter over time.', color: 'bg-b-orange' },
  { n: '03', headline: 'A health timeline that thinks', sub: 'Symptoms, medicines and visits — connected across months and years.', color: 'bg-b-green' },
  { n: '04', headline: 'Your whole family, one place', sub: 'Manage health for parents, children and yourself without switching apps.', color: 'bg-b-purple' },
  { n: '05', headline: 'One record, all providers', sub: 'From Practo to Apollo to the local clinic — G1 unifies everything.', color: 'bg-b-red' },
  { n: '06', headline: 'Works without internet', sub: 'Blood group, allergies, medications — always available, even offline.', color: 'bg-b-yellow' },
]

export function Problems() {
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions'>('problems')

  return (
    <section id="problems" className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        
        {/* Centered Segmented Control Toggle above columns */}
        <div className="mb-8 flex flex-col items-center justify-center gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-fg-muted">
            Explore what's
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
              Competitor Gaps
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'solutions'
                  ? 'bg-ink text-paper shadow-md scale-105'
                  : 'text-fg-muted hover:text-fg'
              }`}
            >
              G1 Solutions
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
                className="w-full rounded-3xl bg-b-yellow p-8 sm:p-10 text-ink flex flex-col justify-between min-h-[500px] lg:min-h-[580px] shadow-sm relative overflow-hidden"
              >
                {/* Top content */}
                <div>
                  <span className="inline-block border border-ink rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
                    {activeTab === 'problems' ? 'Competitor Gaps' : 'G1 Answers'}
                  </span>
                  
                  <h2 className="font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-black uppercase leading-[0.9] tracking-tight">
                    What every <br />
                    health app <br />
                    gets{' '}
                    <ScrambleText
                      text="wrong."
                      trigger="mount"
                      duration={1000}
                      className="text-b-red"
                    />
                  </h2>

                  <p className="mt-6 text-xs sm:text-sm font-semibold opacity-85 leading-relaxed max-w-md">
                    Existing apps were built for English-speaking, urban, tech-fluent users. 
                    ProjectG1 was built for everyone else. Compare competitor failures to G1 answers.
                  </p>
                </div>

                {/* Stats Counters Grid inside Left Card */}
                <div className="grid grid-cols-3 gap-2 mt-auto pt-6 border-t border-ink/10">
                  {STATS.map(({ to, suffix, label, color }) => (
                    <div key={label} className="text-left">
                      <p className={`font-display text-xl sm:text-2xl font-black leading-none ${color}`}>
                        <CountUp to={to} suffix={suffix} duration={1200} />
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-tight opacity-75 mt-2 leading-none">
                        {label}
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
                className="w-full rounded-3xl border border-border-strong p-6 bg-surface-2 flex flex-col justify-center min-h-[500px] lg:min-h-[580px] overflow-hidden relative"
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
                    className="grid gap-2 sm:grid-cols-2 h-full items-stretch"
                  >
                    {PROBLEMS.map((prob) => (
                      <SpotlightTilt
                        key={prob.title}
                        className={`group relative rounded-2xl ${prob.bg} p-4 text-ink flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300`}
                        spotlightColor="rgba(0,0,0,0.1)"
                      >

                        <div className="flex items-start justify-between">
                          <span className="font-display text-[10px] font-black opacity-40">{prob.n}</span>
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-ink/15 font-black text-ink text-[10px] leading-none">
                            ✕
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="font-display text-[13px] font-black uppercase leading-snug">
                            <ScrambleText text={prob.title} trigger="hover" duration={600} />
                          </p>
                          <p className="mt-1 text-[10px] font-semibold opacity-75 leading-relaxed">
                            {prob.detail}
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
                    className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 h-full items-stretch"
                  >
                    {SOLUTIONS.map((sol, i) => (
                      <motion.div
                        key={sol.n}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ y: -3 }}
                        className={`rounded-2xl ${sol.color} p-4 text-ink flex flex-col justify-between cursor-default`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-display text-[10px] font-black opacity-45">{sol.n}</span>
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-ink/15 font-black text-ink text-[10px] leading-none">
                            ✓
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="font-display text-[13px] font-black uppercase leading-snug">
                            <ScrambleText text={sol.headline} trigger="hover" duration={500} />
                          </p>
                          <p className="mt-1 text-[10px] font-semibold opacity-70 leading-relaxed">
                            {sol.sub}
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



