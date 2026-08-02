import { Building2, Calendar, ChevronRight, Droplet, Eye, HeartPulse, MapPin, Microscope, Stethoscope, Syringe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type HealthCamp, CATEGORY_META, formatCampDate, isCampUpcoming } from '@/lib/community/camps'

const ICON_MAP: Record<string, React.ElementType> = {
  Droplet,
  Syringe,
  Eye,
  HeartPulse,
  Microscope,
  Stethoscope,
  Building2,
}

interface CampCardProps {
  camp: HealthCamp
}

export function CampCard({ camp }: CampCardProps) {
  const meta = CATEGORY_META[camp.category]
  const IconComp = ICON_MAP[meta.icon] ?? Stethoscope
  const upcoming = isCampUpcoming(camp)

  const accentText = `text-${meta.accent}`
  const accentWash = `bg-${meta.accent}/12`
  const accentBorder = `border-${meta.accent}/25`

  return (
    <article
      className={cn(
        'spotlight group relative flex flex-col rounded-2xl border bg-surface p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
        !upcoming && 'opacity-60',
      )}
      aria-label={camp.name}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl border',
            accentWash,
            accentBorder,
          )}
        >
          <IconComp className={cn('size-5', accentText)} strokeWidth={2} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={cn('text-[9.5px] font-black tracking-[0.18em] uppercase', accentText)}>
                {meta.label}
              </p>
              <h3 className="mt-0.5 font-display text-[15px] font-black leading-snug text-fg">
                {camp.name}
              </h3>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              {camp.free && (
                <span className="rounded-full bg-tint-sage/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-tint-sage">
                  Free
                </span>
              )}
              {!upcoming && (
                <span className="rounded-full bg-fg/8 px-2 py-0.5 text-[9px] font-bold text-fg-subtle">
                  Past
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-fg-muted line-clamp-2">
        {camp.description}
      </p>

      {/* Meta chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="flex items-center gap-1 rounded-xl bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-fg-muted">
          <Calendar className="size-3" strokeWidth={2.5} />
          {formatCampDate(camp.date, camp.endDate)}
        </span>
        <span className="flex items-center gap-1 rounded-xl bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-fg-muted">
          <MapPin className="size-3" strokeWidth={2.5} />
          {camp.district}
          {camp.distance && ` · ${camp.distance}`}
        </span>
        {camp.slots !== undefined && (
          <span className="flex items-center gap-1 rounded-xl bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-fg-muted">
            {camp.slots} slots
          </span>
        )}
      </div>

      {/* Organiser + CTA */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
        <p className="text-[11px] text-fg-subtle">{camp.organiser}</p>
        {camp.contact && (
          <a
            href={`tel:${camp.contact}`}
            className={cn(
              'flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11.5px] font-bold transition-colors',
              `${accentWash} ${accentText} hover:opacity-80`,
            )}
            aria-label={`Call ${camp.name}`}
          >
            Call
            <ChevronRight className="size-3" strokeWidth={2.5} />
          </a>
        )}
      </div>
    </article>
  )
}
