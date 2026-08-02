/**
 * Mood history — persists daily mood check-in entries to local storage.
 *
 * One entry per calendar day (keyed by YYYY-MM-DD). A second check-in on
 * the same day overwrites the first — the widget is daily, not per-session.
 *
 * Deliberately simple: three ordinal responses, no computed score, no label.
 * The purpose is history-at-a-glance (seven dots), not clinical tracking.
 */

export type SleepRating = 'well' | 'okay' | 'poorly'
export type EnergyRating = 'high' | 'average' | 'low'
export type InterestRating = 'normal' | 'less' | 'not_at_all'

export interface MoodEntry {
  /** YYYY-MM-DD */
  date: string
  sleep: SleepRating
  energy: EnergyRating
  interest: InterestRating
  /** Unix ms of submission */
  timestamp: number
}

const STORAGE_KEY = 'sehat-mood-history-v1'
const MAX_DAYS = 30

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function loadMoodHistory(): MoodEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as MoodEntry[]
  } catch {
    return []
  }
}

export function saveMoodEntry(entry: Omit<MoodEntry, 'date' | 'timestamp'>): MoodEntry {
  const full: MoodEntry = { ...entry, date: todayKey(), timestamp: Date.now() }
  if (typeof window === 'undefined') return full
  try {
    const existing = loadMoodHistory().filter((e) => e.date !== full.date)
    const updated = [full, ...existing].slice(0, MAX_DAYS)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Storage unavailable — still return the entry so the UI can show it.
  }
  return full
}

export function todaysMoodEntry(): MoodEntry | null {
  const today = todayKey()
  return loadMoodHistory().find((e) => e.date === today) ?? null
}

/** Last N days in descending order (today first). */
export function recentMoodHistory(days = 7): MoodEntry[] {
  const all = loadMoodHistory()
  const cutoff = Date.now() - days * 86_400_000
  return all.filter((e) => e.timestamp >= cutoff)
}

/**
 * Convert a mood entry to a single hue category for the history dot.
 * Not a score — purely a colour signal to aid pattern recognition at a glance.
 */
export function moodToTone(entry: MoodEntry): 'good' | 'neutral' | 'low' {
  const goods = [entry.sleep === 'well', entry.energy === 'high', entry.interest === 'normal']
  const lows = [
    entry.sleep === 'poorly',
    entry.energy === 'low',
    entry.interest === 'not_at_all',
  ]
  const goodCount = goods.filter(Boolean).length
  const lowCount = lows.filter(Boolean).length
  if (goodCount >= 2) return 'good'
  if (lowCount >= 2) return 'low'
  return 'neutral'
}
