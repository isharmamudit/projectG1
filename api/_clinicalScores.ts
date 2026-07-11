// Shared by api/chat.ts (and future endpoints) via same-directory relative
// import — see api/_icmrGuidelines.ts for why that works with Vercel's
// bundler. Deterministic score calculators: the spec's rule is that an LLM
// must never "mentally approximate" a validated clinical score — it should
// gather the exact required inputs and call a real calculator instead. These
// are pure functions with no LLM involvement, so a score is either
// computed correctly from real inputs or not computed at all.

export interface TimiInputs {
  ageOver65: boolean
  moreThanThreeRiskFactors: boolean
  knownCadOver50PercentStenosis: boolean
  aspirinUseLast7Days: boolean
  recurrentAnginaLast24h: boolean
  stDeviationOver0_5mV: boolean
  elevatedCardiacMarkers: boolean
}

/** TIMI risk score for UA/NSTEMI — one point per criterion present, per the
 * ICMR Standard Treatment Workflow for Unstable Angina/NSTEMI (Jan 2026).
 * 0-1: low risk, 2-3: intermediate risk, ≥4: high risk. */
export function calculateTimiScore(inputs: TimiInputs) {
  const score = Object.values(inputs).filter(Boolean).length
  const riskBand = score <= 1 ? 'low' : score <= 3 ? 'intermediate' : 'high'
  return { score, maxScore: 7, riskBand, source: 'ICMR STW — Unstable Angina/NSTEMI' }
}

export interface GraceInputs {
  killipClass: 'I' | 'II' | 'III' | 'IV'
  systolicBpMmHg: number
  heartRateBpm: number
  ageYears: number
  creatinineMgDl: number
  cardiacArrestAtAdmission: boolean
  stSegmentDeviation: boolean
  elevatedCardiacEnzymes: boolean
}

function bandPoints(value: number, bands: { max: number; points: number }[]): number {
  for (const b of bands) if (value <= b.max) return b.points
  return bands[bands.length - 1].points
}

/** GRACE risk score for UA/NSTEMI, per the same ICMR workflow's point table.
 * <109: low risk, 109-140: intermediate, >140: high risk. */
export function calculateGraceScore(i: GraceInputs) {
  const killipPoints = { I: 0, II: 20, III: 39, IV: 59 }[i.killipClass]
  const sbpPoints = bandPoints(i.systolicBpMmHg, [
    { max: 79, points: 58 }, { max: 99, points: 53 }, { max: 119, points: 43 },
    { max: 139, points: 34 }, { max: 159, points: 24 }, { max: 199, points: 10 }, { max: Infinity, points: 0 },
  ])
  const hrPoints = bandPoints(i.heartRateBpm, [
    { max: 49, points: 0 }, { max: 69, points: 3 }, { max: 89, points: 9 }, { max: 109, points: 15 },
    { max: 149, points: 24 }, { max: 199, points: 38 }, { max: Infinity, points: 46 },
  ])
  const agePoints = bandPoints(i.ageYears, [
    { max: 29, points: 0 }, { max: 39, points: 8 }, { max: 49, points: 25 }, { max: 59, points: 41 },
    { max: 69, points: 58 }, { max: 79, points: 75 }, { max: 89, points: 91 }, { max: Infinity, points: 100 },
  ])
  const creatininePoints = bandPoints(i.creatinineMgDl, [
    { max: 0.39, points: 1 }, { max: 0.79, points: 4 }, { max: 1.19, points: 7 }, { max: 1.59, points: 10 },
    { max: 1.99, points: 13 }, { max: 2.99, points: 21 }, { max: Infinity, points: 28 },
  ])
  const otherPoints = (i.cardiacArrestAtAdmission ? 39 : 0) + (i.stSegmentDeviation ? 28 : 0) + (i.elevatedCardiacEnzymes ? 14 : 0)

  const score = killipPoints + sbpPoints + hrPoints + agePoints + creatininePoints + otherPoints
  const riskBand = score < 109 ? 'low' : score <= 140 ? 'intermediate' : 'high'
  return { score, riskBand, source: 'ICMR STW — Unstable Angina/NSTEMI' }
}

export interface Curb65Inputs {
  confusion: boolean
  ureaOver7mmolL: boolean
  respRateOver30: boolean
  bpLowSbp90OrDbp60: boolean
  ageOver65: boolean
}

/** CURB-65 pneumonia severity score — standard public 5-point clinical
 * scale. 0-1: low risk (outpatient), 2: consider admission, ≥3: high risk. */
export function calculateCurb65(inputs: Curb65Inputs) {
  const score = Object.values(inputs).filter(Boolean).length
  const riskBand = score <= 1 ? 'low' : score === 2 ? 'moderate' : 'high'
  return { score, maxScore: 5, riskBand, source: 'CURB-65 (standard public clinical scale)' }
}

export interface QsofaInputs {
  respRateOver22: boolean
  alteredMentation: boolean
  systolicBpUnder100: boolean
}

/** qSOFA — bedside sepsis risk screen. ≥2 of 3 criteria = high risk, needs
 * urgent evaluation for sepsis. */
export function calculateQsofa(inputs: QsofaInputs) {
  const score = Object.values(inputs).filter(Boolean).length
  return { score, maxScore: 3, highRisk: score >= 2, source: 'qSOFA (standard public clinical scale)' }
}
