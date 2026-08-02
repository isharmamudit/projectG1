import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, List, Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BounceIn } from '@/components/ui/BounceIn'
import { CampCard } from '@/components/community/CampCard'
import { getCamps, getDistricts, CATEGORY_META, type CampCategory } from '@/lib/community/camps'

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as CampCategory[]

export function Camps() {
  const [query, setQuery] = useState('')
  const [district, setDistrict] = useState('all')
  const [category, setCategory] = useState<CampCategory | 'all'>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const districts = useMemo(() => getDistricts(), [])

  const camps = useMemo(
    () =>
      getCamps({
        district: district !== 'all' ? district : undefined,
        category: category !== 'all' ? category : undefined,
        query: query.trim() || undefined,
      }),
    [district, category, query],
  )

  return (
    <div className="space-y-5">
      {/* Search + toggles */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle"
            strokeWidth={2.5}
          />
          <input
            type="search"
            placeholder="Search camps, districts, type…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface py-2.5 pl-9 pr-4 text-[13px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-label="Toggle filters"
          className={cn(
            'flex size-10 items-center justify-center rounded-2xl border transition-colors',
            showFilters
              ? 'border-accent bg-accent-soft text-accent'
              : 'border-border bg-surface text-fg-muted hover:text-fg',
          )}
        >
          <SlidersHorizontal className="size-4" strokeWidth={2.5} />
        </button>
        {/* View toggle */}
        <div className="flex overflow-hidden rounded-2xl border border-border bg-surface">
          <button
            type="button"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className={cn(
              'flex size-10 items-center justify-center transition-colors',
              view === 'grid' ? 'bg-accent-soft text-accent' : 'text-fg-muted hover:text-fg',
            )}
          >
            <LayoutGrid className="size-4" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            aria-label="List view"
            className={cn(
              'flex size-10 items-center justify-center transition-colors',
              view === 'list' ? 'bg-accent-soft text-accent' : 'text-fg-muted hover:text-fg',
            )}
          >
            <List className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="space-y-3 rounded-2xl border border-border bg-surface p-4"
        >
          {/* District */}
          <div>
            <p className="mb-2 text-[10px] font-black tracking-[0.18em] text-fg-muted uppercase">
              District
            </p>
            <div className="flex flex-wrap gap-1.5">
              {districts.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDistrict(d)}
                  className={cn(
                    'rounded-xl px-3 py-1.5 text-[12px] font-bold transition-colors',
                    district === d
                      ? 'bg-accent text-accent-fg'
                      : 'bg-surface-2 text-fg-muted hover:text-fg',
                  )}
                >
                  {d === 'all' ? 'All Districts' : d}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="mb-2 text-[10px] font-black tracking-[0.18em] text-fg-muted uppercase">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setCategory('all')}
                className={cn(
                  'rounded-xl px-3 py-1.5 text-[12px] font-bold transition-colors',
                  category === 'all' ? 'bg-accent text-accent-fg' : 'bg-surface-2 text-fg-muted hover:text-fg',
                )}
              >
                All
              </button>
              {ALL_CATEGORIES.map((cat) => {
                const meta = CATEGORY_META[cat]
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'rounded-xl px-3 py-1.5 text-[12px] font-bold transition-colors',
                      category === cat
                        ? 'bg-accent text-accent-fg'
                        : 'bg-surface-2 text-fg-muted hover:text-fg',
                    )}
                  >
                    {meta.label}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Result count */}
      <p className="text-[11.5px] text-fg-muted">
        {camps.length} camp{camps.length !== 1 ? 's' : ''} found
      </p>

      {/* Camps grid / list */}
      {camps.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-surface-2">
            <Search className="size-6 text-fg-subtle" strokeWidth={1.5} />
          </div>
          <p className="mt-4 font-bold text-fg">No camps found</p>
          <p className="mt-1 text-[13px] text-fg-muted">Try different filters or a broader search.</p>
        </div>
      ) : (
        <div
          className={cn(
            'gap-3',
            view === 'grid' ? 'grid sm:grid-cols-2' : 'flex flex-col',
          )}
        >
          {camps.map((camp, i) => (
            <BounceIn key={camp.id} index={i % 6}>
              <CampCard camp={camp} />
            </BounceIn>
          ))}
        </div>
      )}
    </div>
  )
}
