import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  calculateCurb65,
  calculateGraceScore,
  calculateQsofa,
  calculateTimiScore,
  type Curb65Inputs,
  type GraceInputs,
  type QsofaInputs,
  type TimiInputs,
} from './_clinicalScores'

type ScoreName = 'timi' | 'grace' | 'curb65' | 'qsofa'

interface ScoreRequestBody {
  score: ScoreName
  inputs: unknown
}

/** Pure deterministic calculation — no LLM involved. Exists so a validated
 * clinical score is either computed correctly from real structured inputs
 * or not returned at all, never "mentally approximated" by the chat model. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body as ScoreRequestBody
  const { score, inputs } = body ?? {}

  try {
    switch (score) {
      case 'timi':
        res.status(200).json(calculateTimiScore(inputs as TimiInputs))
        return
      case 'grace':
        res.status(200).json(calculateGraceScore(inputs as GraceInputs))
        return
      case 'curb65':
        res.status(200).json(calculateCurb65(inputs as Curb65Inputs))
        return
      case 'qsofa':
        res.status(200).json(calculateQsofa(inputs as QsofaInputs))
        return
      default:
        res.status(400).json({ error: 'Unknown score. Use one of: timi, grace, curb65, qsofa' })
    }
  } catch (err) {
    console.error('Clinical score calculation failed:', err)
    res.status(400).json({ error: 'Invalid inputs for this score' })
  }
}
