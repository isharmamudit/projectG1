/**
 * Symptom analysis utility — pure functions, no side effects.
 *
 * Reads a session history and determines which, if any, watchlist symptoms
 * have recurred past a clinically-recognised threshold. The thresholds are
 * based on published guidelines, not invented:
 *
 *   Cough ≥ 14 days  → India's national TB programme presumptive TB trigger.
 *   Fever ≥ 7 days   → WHO guidance on prolonged fever requiring evaluation.
 *   Weight loss ≥ 3 occurrences in 30 days → standard chronic disease flag.
 *
 * This module does not diagnose. It does not say "you have TB". It says
 * "this symptom has recurred past the threshold at which guidelines say it
 * should be evaluated." The language in the card is drafted accordingly.
 */

import type { SymptomSession, WatchlistSymptom } from './symptomHistory'

export interface SymptomFlag {
  symptom: WatchlistSymptom
  /** Days between first and last detected session */
  spanDays: number
  /** Number of sessions in which this symptom appeared */
  sessionCount: number
  /** Unix ms of first appearance */
  firstSeen: number
  /** Unix ms of most recent appearance */
  lastSeen: number
}

const MS_PER_DAY = 86_400_000

/** Clinical thresholds. Source documented above. */
const THRESHOLDS: Record<WatchlistSymptom, { minDays: number; minSessions: number }> = {
  cough: { minDays: 14, minSessions: 2 },
  fever: { minDays: 7, minSessions: 2 },
  weight_loss: { minDays: 1, minSessions: 3 },
}

/**
 * Scan session history and return flags for any watchlist symptom that has
 * crossed its threshold.
 *
 * Returns one flag per symptom, ordered by severity proxy (span length desc).
 */
export function analyseSymptomHistory(sessions: SymptomSession[]): SymptomFlag[] {
  if (sessions.length < 2) return []

  const flags: SymptomFlag[] = []

  const watchlist: WatchlistSymptom[] = ['cough', 'fever', 'weight_loss']
  for (const symptom of watchlist) {
    const matching = sessions.filter((s) => s.detectedSymptoms.includes(symptom))
    if (matching.length < 2) continue

    const timestamps = matching.map((s) => s.timestamp).sort((a, b) => a - b)
    const firstSeen = timestamps[0]
    const lastSeen = timestamps[timestamps.length - 1]
    const spanDays = (lastSeen - firstSeen) / MS_PER_DAY

    const { minDays, minSessions } = THRESHOLDS[symptom]
    if (spanDays >= minDays && matching.length >= minSessions) {
      flags.push({
        symptom,
        spanDays: Math.round(spanDays),
        sessionCount: matching.length,
        firstSeen,
        lastSeen,
      })
    }
  }

  return flags.sort((a, b) => b.spanDays - a.spanDays)
}
