/**
 * Joint-angle math for the Abhyaas posture coach. Pure functions, no
 * MediaPipe types imported — a landmark is just a normalised point, which
 * keeps this testable and keeps the vision library out of the main bundle.
 */

export interface Point {
  x: number
  y: number
  visibility?: number
}

/**
 * Interior angle at `b`, in degrees, formed by the vectors b→a and b→c.
 *
 * Computed in 2D on purpose. MediaPipe's z is estimated from a single camera
 * and is noisy enough that including it makes the angles jitter more than it
 * makes them accurate — for "is this knee straight", the image plane is both
 * steadier and closer to what the user sees in the mirror.
 */
export function angleAt(a: Point, b: Point, c: Point): number {
  const abx = a.x - b.x
  const aby = a.y - b.y
  const cbx = c.x - b.x
  const cby = c.y - b.y

  const magAb = Math.hypot(abx, aby)
  const magCb = Math.hypot(cbx, cby)
  if (magAb === 0 || magCb === 0) return 0

  const cos = Math.min(1, Math.max(-1, (abx * cbx + aby * cby) / (magAb * magCb)))
  return (Math.acos(cos) * 180) / Math.PI
}

/** Mean visibility across the given landmark indices, 0–1. Used to tell
 * "your leg is bent" apart from "your leg is out of frame". */
export function meanVisibility(points: Point[], indices: number[]): number {
  const vals = indices.map((i) => points[i]?.visibility ?? 0)
  if (vals.length === 0) return 0
  return vals.reduce((sum, v) => sum + v, 0) / vals.length
}

/** Skeleton edges to draw. Torso, arms and legs only — the 10 face landmarks
 * add clutter without telling you anything about a standing posture. */
export const POSE_EDGES: [number, number][] = [
  [11, 12], [11, 23], [12, 24], [23, 24],
  [11, 13], [13, 15],
  [12, 14], [14, 16],
  [23, 25], [25, 27],
  [24, 26], [26, 28],
  [27, 31], [28, 32],
]
