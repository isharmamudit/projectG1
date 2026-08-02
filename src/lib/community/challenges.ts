/**
 * Wellness Challenges — data definitions and local storage.
 *
 * Challenges rotate daily: the active set is determined by the day-of-year
 * modulo the pool size, so a user sees a different challenge each day without
 * any backend. Progress and streaks persist across sessions.
 *
 * Storage key: sehat-challenges-v1
 */

export interface Challenge {
  id: string
  emoji: string
  title: string
  description: string
  /** Target value (steps, glasses, hours, etc.) */
  target: number
  unit: string
  /** Lucide icon name */
  icon: string
  accent: string
}

export interface ChallengeProgress {
  challengeId: string
  /** YYYY-MM-DD the challenge started */
  startDate: string
  /** Units completed today */
  today: number
  /** Days in a row completed (finished target) */
  streak: number
  /** Total completions ever */
  totalCompletions: number
  /** Whether today's target was met */
  completedToday: boolean
  /** Timestamp of last update */
  lastUpdated: number
}

const STORAGE_KEY = 'sehat-challenges-v1'

export const CHALLENGE_POOL: Challenge[] = [
  {
    id: 'steps',
    emoji: '🚶',
    title: 'Walk 10,000 Steps',
    description: 'Walking 10,000 steps daily improves cardiovascular health, mood, and energy.',
    target: 10000,
    unit: 'steps',
    icon: 'Footprints',
    accent: 'tint-sage',
  },
  {
    id: 'water',
    emoji: '💧',
    title: 'Drink 8 Glasses of Water',
    description: 'Staying hydrated supports kidney function, skin health, and mental clarity.',
    target: 8,
    unit: 'glasses',
    icon: 'Droplets',
    accent: 'tint-blue',
  },
  {
    id: 'sleep',
    emoji: '😴',
    title: 'Sleep 8 Hours',
    description: '8 hours of quality sleep supports immune function and cognitive health.',
    target: 8,
    unit: 'hours',
    icon: 'Moon',
    accent: 'tint-violet',
  },
  {
    id: 'meditation',
    emoji: '🧘',
    title: 'Practice Meditation',
    description: '10 minutes of mindful breathing reduces cortisol and improves focus.',
    target: 10,
    unit: 'minutes',
    icon: 'Sparkles',
    accent: 'tint-amber',
  },
  {
    id: 'healthy_meals',
    emoji: '🥗',
    title: 'Eat Healthy Meals',
    description: 'Three balanced meals with vegetables, protein, and whole grains.',
    target: 3,
    unit: 'meals',
    icon: 'UtensilsCrossed',
    accent: 'tint-teal',
  },
  {
    id: 'cycle',
    emoji: '🚴',
    title: 'Cycle Today',
    description: 'Even 20 minutes of cycling strengthens your heart and burns calories.',
    target: 20,
    unit: 'minutes',
    icon: 'Bike',
    accent: 'tint-rose',
  },
  {
    id: 'no_screens',
    emoji: '📵',
    title: 'Screen-Free Hour',
    description: 'One screen-free hour before bed improves sleep quality significantly.',
    target: 60,
    unit: 'minutes',
    icon: 'MonitorOff',
    accent: 'tint-amber',
  },
  {
    id: 'stretch',
    emoji: '🤸',
    title: 'Stretch for 15 Minutes',
    description: 'Daily stretching reduces muscle tension and improves joint mobility.',
    target: 15,
    unit: 'minutes',
    icon: 'Activity',
    accent: 'tint-sage',
  },
]

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function getDailyChallenge(): Challenge {
  // Rotate by day-of-year so it changes daily, deterministically.
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / 86_400_000)
  return CHALLENGE_POOL[dayOfYear % CHALLENGE_POOL.length]
}

export function getTodayChallenge(): Challenge {
  return getDailyChallenge()
}

export function getWeeklyChallenges(): Challenge[] {
  const today = new Date()
  const start = new Date(today.getFullYear(), 0, 0)
  const diff = today.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / 86_400_000)
  // Return 4 challenges starting from today's slot
  return Array.from({ length: 4 }, (_, i) =>
    CHALLENGE_POOL[(dayOfYear + i) % CHALLENGE_POOL.length],
  )
}

export function loadAllProgress(): Record<string, ChallengeProgress> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, ChallengeProgress>
  } catch {
    return {}
  }
}

export function loadProgress(challengeId: string): ChallengeProgress {
  const all = loadAllProgress()
  return (
    all[challengeId] ?? {
      challengeId,
      startDate: todayKey(),
      today: 0,
      streak: 0,
      totalCompletions: 0,
      completedToday: false,
      lastUpdated: Date.now(),
    }
  )
}

export function saveProgress(progress: ChallengeProgress): void {
  if (typeof window === 'undefined') return
  try {
    const all = loadAllProgress()
    // Reset today's count if it's a new day
    const currentDate = todayKey()
    const lastDate = progress.startDate
    if (lastDate !== currentDate) {
      progress.today = 0
      progress.completedToday = false
      progress.startDate = currentDate
    }
    all[progress.challengeId] = progress
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    // ignore
  }
}

export function incrementProgress(challengeId: string, amount: number, target: number): ChallengeProgress {
  const prev = loadProgress(challengeId)
  const today = todayKey()

  // Reset if new day
  const todayAmt = prev.startDate === today ? prev.today + amount : amount
  const completed = todayAmt >= target
  const wasCompleted = prev.startDate === today ? prev.completedToday : false

  const next: ChallengeProgress = {
    ...prev,
    startDate: today,
    today: Math.min(todayAmt, target),
    completedToday: completed,
    streak:
      completed && !wasCompleted
        ? prev.streak + 1
        : prev.streak,
    totalCompletions:
      completed && !wasCompleted
        ? prev.totalCompletions + 1
        : prev.totalCompletions,
    lastUpdated: Date.now(),
  }
  saveProgress(next)
  return next
}
