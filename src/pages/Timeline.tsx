import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Activity,
  Calendar,
  ChevronLeft,
  FileText,
  Stethoscope,
  Thermometer,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { loadSymptomHistory } from '@/lib/sehat/symptomHistory'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  id: string
  date: Date
  title: string
  subtitle: string
  type: 'assessment' | 'recommendation' | 'report'
  icon: React.ElementType
  colorClass: string
  bgClass: string
}

export function Timeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    // 1. Load actual (or seeded) symptom history
    const sessions = loadSymptomHistory().sort((a, b) => b.timestamp - a.timestamp)
    
    const mapped: TimelineEvent[] = sessions.map((s) => {
      let icon = Activity
      let color = 'text-tint-sage'
      let bg = 'bg-tint-sage/15'
      
      if (s.detectedSymptoms.includes('fever')) {
        icon = Thermometer
        color = 'text-tint-rose'
        bg = 'bg-tint-rose/15'
      } else if (s.detectedSymptoms.includes('cough')) {
        icon = Activity
        color = 'text-tint-amber'
        bg = 'bg-tint-amber/15'
      }

      return {
        id: s.sessionId,
        date: new Date(s.timestamp),
        title: s.detectedSymptoms.join(' + ').replace('_', ' ') || 'Symptom check',
        subtitle: s.rawText,
        type: 'assessment',
        icon,
        colorClass: color,
        bgClass: bg,
      }
    })

    // 2. Inject the semantic AI recommendation & Report events based on the newest session
    // (This ensures the demo perfectly matches the requested hackathon flow)
    if (sessions.length > 0) {
      const latestTime = sessions[0].timestamp
      const MS_PER_DAY = 86_400_000

      // Add doctor recommendation event
      if (sessions.some(s => s.level === 'see_doctor_soon' || s.level === 'see_doctor_today')) {
        mapped.unshift({
          id: 'rec-1',
          date: new Date(latestTime + 1000), // slightly after the latest session
          title: 'Doctor visit recommended',
          subtitle: 'Persistent symptoms triggered a clinical review suggestion',
          type: 'recommendation',
          icon: Stethoscope,
          colorClass: 'text-tint-blue',
          bgClass: 'bg-tint-blue/15',
        })
      }

      // Add report downloaded event 2 days later
      mapped.unshift({
        id: 'rep-1',
        date: new Date(latestTime + (2 * MS_PER_DAY)),
        title: 'Downloaded Health Report',
        subtitle: 'Pre-consultation summary exported for local clinic',
        type: 'report',
        icon: FileText,
        colorClass: 'text-tint-violet',
        bgClass: 'bg-tint-violet/15',
      })
    }
    
    // Sort descending by date
    mapped.sort((a, b) => b.date.getTime() - a.date.getTime())
    setEvents(mapped)
  }, [])

  return (
    <main className="flex min-h-dvh flex-col bg-paper pb-20">
      <Navbar />

      <div className="mx-auto w-full max-w-3xl px-5 pt-28">
        <div className="mb-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl font-black tracking-tight text-ink">
            Health Timeline
          </h1>
          <p className="mt-2 text-sm text-fg-muted">
            Your longitudinal health record, automatically compiled from CareBuddy assessments.
          </p>
        </div>

        <div className="relative border-l-2 border-border/60 pl-6 ml-4 space-y-12">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Timeline Node */}
              <div
                className={cn(
                  'absolute -left-[37px] flex size-8 items-center justify-center rounded-full border-[3px] border-paper',
                  event.bgClass
                )}
              >
                <event.icon className={cn('size-4', event.colorClass)} strokeWidth={2.5} />
              </div>

              {/* Event Content */}
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-fg-muted uppercase">
                  <Calendar className="size-3" strokeWidth={2.5} />
                  {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                
                <h3 className="text-lg font-bold capitalize text-ink">
                  {event.title}
                </h3>
                
                {event.type === 'recommendation' ? (
                  <div className="mt-2 rounded-xl bg-tint-blue/10 border border-tint-blue/20 p-4">
                    <p className="text-sm font-semibold text-tint-blue mb-1">AI Triage Notice</p>
                    <p className="text-[13px] text-fg/80">{event.subtitle}</p>
                  </div>
                ) : (
                  <p className="text-[14px] leading-snug text-fg-muted">
                    {event.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
          
          {events.length === 0 && (
            <p className="text-sm text-fg-muted">No timeline events yet. Take a health assessment to start.</p>
          )}
        </div>
      </div>
    </main>
  )
}
