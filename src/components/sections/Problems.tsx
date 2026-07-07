import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightTilt } from '@/components/ui/SpotlightTilt'
import { ClipReveal } from '@/components/ui/ClipReveal'

const PROBLEMS = [
  {
    icon: '✕',
    title: 'Reports become dead PDFs',
    detail: 'Stored but never connected or compared over time.',
    bg: 'bg-b-red',
  },
  {
    icon: '✕',
    title: 'No longitudinal timeline',
    detail: "Can't see how your health changed over months or years.",
    bg: 'bg-b-orange',
  },
  {
    icon: '✕',
    title: 'No relationship between data',
    detail: 'Medicines, reports, symptoms, doctors — all isolated silos.',
    bg: 'bg-b-red',
  },
  {
    icon: '✕',
    title: 'Weak emergency readiness',
    detail: 'Emergency info not instantly accessible offline.',
    bg: 'bg-b-orange',
  },
  {
    icon: '✕',
    title: 'Doctor visit prep is missing',
    detail: 'Patients forget questions and history during consultations.',
    bg: 'bg-b-red',
  },
  {
    icon: '✕',
    title: 'No caregiver workflow',
    detail: 'Children managing parents still rely on WhatsApp calls.',
    bg: 'bg-b-orange',
  },
  {
    icon: '✕',
    title: 'No multimodal understanding',
    detail: "Can't handle reports, prescriptions, voice, and images together.",
    bg: 'bg-b-red',
  },
  {
    icon: '✕',
    title: 'AI is mostly a chatbot',
    detail: 'It answers questions but never completes actions for you.',
    bg: 'bg-b-orange',
  },
]

const OUR_LIMITS = [
  { label: 'Not for semi-urban & rural areas', n: '01' },
  { label: 'No family management', n: '02' },
  { label: 'No cross-platform unification', n: '03' },
  { label: 'Report flagging still manual', n: '04' },
  { label: 'No voice / offline (yet)', n: '05' },
  { label: 'No longitudinal health memory', n: '06' },
]

export function Problems() {
  return (
    <section className="overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <ClipReveal>
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase sm:text-sm">
            The gap we're filling
          </p>
        </ClipReveal>
        <ClipReveal>
          <h2 className="mt-4 text-center font-display text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tight text-fg uppercase">
            What every health app
            <br />
            gets wrong.
          </h2>
        </ClipReveal>

        <FadeIn delay={0.2} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-base text-fg-muted sm:text-lg">
            Existing apps were built for English-speaking, urban, tech-fluent users. ProjectG1 was built for everyone else.
          </p>
        </FadeIn>

        {/* Problems grid */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map(({ icon, title, detail, bg }, i) => (
            <FadeIn key={title} delay={0.05 * i} y={24}>
              <SpotlightTilt
                className={`h-full rounded-2xl ${bg} p-5 text-ink`}
                spotlightColor="rgba(0,0,0,0.15)"
              >
                <div className="flex h-full flex-col gap-4">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-ink/20 font-bold text-ink text-lg leading-none">
                    {icon}
                  </span>
                  <div>
                    <p className="font-display text-sm font-black uppercase leading-tight sm:text-base">{title}</p>
                    <p className="mt-2 text-xs font-medium opacity-75 leading-relaxed">{detail}</p>
                  </div>
                </div>
              </SpotlightTilt>
            </FadeIn>
          ))}
        </div>

        {/* Our own limits — transparent about ours */}
        <FadeIn delay={0.3} className="mt-16">
          <div className="rounded-3xl border border-border-strong p-6 sm:p-10">
            <p className="font-display text-sm font-black uppercase tracking-widest text-fg-muted">
              Our current limitations — we're honest about them
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {OUR_LIMITS.map(({ label, n }) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.4, delay: parseInt(n) * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-border p-4"
                >
                  <span className="font-display text-xs text-fg-subtle">{n}</span>
                  <p className="text-sm font-medium text-fg-muted">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
