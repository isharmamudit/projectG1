/**
 * Real-time yoga pose classification and accuracy scoring.
 *
 * Runs entirely in the browser on MediaPipe landmarks — no model download
 * beyond the pose landmarker itself, no server call, no video leaving the
 * device. The whole classifier is 12 KB of centroids.
 *
 * Method (ported from hannalaguilar/yoga-classifier, MIT): normalise the
 * landmarks for translation and scale, reduce them to pairwise offset
 * vectors, and take the nearest cluster centroid. See poseTemplates.ts for
 * how the centroids were derived and what accuracy they measured at.
 *
 * Why not the CNN approach from the other reference projects: those classify
 * raw 64x64 image crops through a Keras model behind a YOLO person detector.
 * That is ~9 MB of weights plus a TensorFlow runtime, needs a conversion step
 * to run in a browser at all, and throws away the landmark geometry we
 * already have. Geometry is smaller, faster, explainable, and it lets us say
 * *which joint* is wrong — which is the actual product requirement here.
 */

import {
  EMBED_PAIRS,
  JOINT_KEYS,
  JOINT_LANDMARKS,
  POSE_MODEL,
  type JointKey,
} from './poseTemplates'
import { angleAt, type Point } from './poseMath'

const L_SHOULDER = 11
const R_SHOULDER = 12
const L_HIP = 23
const R_HIP = 24

export interface JointScore {
  key: JointKey
  /** Measured angle in degrees. */
  angle: number
  target: number
  tol: number
  /** 0–1. 1 means comfortably inside tolerance. */
  score: number
  ok: boolean
  /** Positive when the joint is more open than the target, negative when more bent. */
  signedError: number
}

/**
 * Two conditions must both hold before we are willing to name a pose.
 *
 * This matters because nearest-centroid always returns *something*. Without
 * a gate, standing at a desk is confidently announced as an asana, which is
 * worse than saying nothing.
 *
 * NOVELTY_LIMIT — distance to the nearest centroid in units of that
 * cluster's own spread. Real poses sit at 0.61 median / 1.19 p95 / 1.70 p99.
 *
 * MIN_ACCURACY — the joint-angle score. Shape distance alone stopped being
 * sufficient at 12 poses: more classes pack the space more densely, so an
 * idle body lands near *some* centroid. Sitting still measured 2.32 novelty
 * (inside the old 2.5 limit) but only 50% joint accuracy, so the angles are
 * what catch it.
 *
 * Calibrated by sweeping both against the reference data and six synthetic
 * non-poses. At 2.0 / 65 we keep 98.3% of real poses and reject all six.
 * Loosening either one lets sitting or leaning through.
 */
const NOVELTY_LIMIT = 2.0
const MIN_ACCURACY = 65

export interface PoseAssessment {
  /** Model key of the closest pose, e.g. 'tree'. */
  detected: string
  /** False when the body doesn't resemble any known pose closely enough. */
  recognised: boolean
  /** Nearest-centroid distance in units of cluster spread. Lower is a better fit. */
  novelty: number
  /** 0–1 margin-based confidence in `detected`. */
  confidence: number
  /** Which sub-cluster (left/right variant) matched. */
  cluster: number
  /** The pose actually being scored — `detected`, or the caller's target. */
  scored: string
  /** 0–100 overall form accuracy against `scored`. */
  accuracy: number
  joints: JointScore[]
  /** Worst failing joint, or null when everything is in tolerance. */
  worst: JointScore | null
}

/**
 * MediaPipe gives normalised 0–1 coordinates; the reference data was captured
 * in pixel space. Scaling by the frame dimensions puts both in the same
 * geometry — without it, a 16:9 frame stretches every angle horizontally and
 * the whole model is measuring a different body.
 *
 * z uses the width, matching MediaPipe's documented "roughly the same scale
 * as x".
 */
function toPixelSpace(landmarks: Point[], width: number, height: number): number[][] {
  return landmarks.map((p) => [p.x * width, p.y * height, ((p as { z?: number }).z ?? 0) * width])
}

function embed(pts: number[][]): number[] | null {
  const hipC = [
    (pts[L_HIP][0] + pts[R_HIP][0]) / 2,
    (pts[L_HIP][1] + pts[R_HIP][1]) / 2,
    (pts[L_HIP][2] + pts[R_HIP][2]) / 2,
  ]
  const centred = pts.map((p) => [p[0] - hipC[0], p[1] - hipC[1], p[2] - hipC[2]])

  const shoulderC = [
    (centred[L_SHOULDER][0] + centred[R_SHOULDER][0]) / 2,
    (centred[L_SHOULDER][1] + centred[R_SHOULDER][1]) / 2,
    (centred[L_SHOULDER][2] + centred[R_SHOULDER][2]) / 2,
  ]

  const torso = Math.hypot(shoulderC[0], shoulderC[1])
  let maxDist = 0
  for (const p of centred) maxDist = Math.max(maxDist, Math.hypot(p[0], p[1]))
  const size = Math.max(torso * 2.5, maxDist)
  if (!Number.isFinite(size) || size === 0) return null

  const n = centred.map((p) => [(p[0] / size) * 100, (p[1] / size) * 100, (p[2] / size) * 100])
  const nShoulderC = [
    (n[L_SHOULDER][0] + n[R_SHOULDER][0]) / 2,
    (n[L_SHOULDER][1] + n[R_SHOULDER][1]) / 2,
    (n[L_SHOULDER][2] + n[R_SHOULDER][2]) / 2,
  ]
  const at = (k: number) => (k === -1 ? [0, 0, 0] : k === -2 ? nShoulderC : n[k])

  const out: number[] = []
  for (const [a, b] of EMBED_PAIRS) {
    const from = at(a)
    const to = at(b)
    out.push(to[0] - from[0], to[1] - from[1], to[2] - from[2])
  }
  return out
}

function distance(a: number[], b: number[]): number {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i]
    sum += d * d
  }
  return Math.sqrt(sum)
}

/**
 * Per-joint score: full credit inside half the tolerance, then a linear
 * decay to zero at twice it. Flat full-credit across the whole tolerance
 * band would make the number useless as feedback — everyone would sit at
 * 100% — and scoring strictly from the exact target would make 100%
 * unreachable for a real body.
 */
function jointScore(deviation: number, tol: number): number {
  const free = tol / 2
  if (deviation <= free) return 1
  return Math.max(0, 1 - (deviation - free) / (tol * 1.5))
}

/**
 * Assess a frame.
 *
 * @param landmarks 33 MediaPipe pose landmarks (normalised coordinates)
 * @param width     frame width in pixels
 * @param height    frame height in pixels
 * @param target    optional model key to score against instead of the detected pose
 */
export function assessPose(
  landmarks: Point[],
  width: number,
  height: number,
  target?: string,
): PoseAssessment | null {
  if (landmarks.length < 33) return null
  const pts = toPixelSpace(landmarks, width, height)
  const vector = embed(pts)
  if (!vector) return null

  // Nearest centroid across every cluster of every pose.
  let bestPose = ''
  let bestDist = Infinity
  let bestCluster = 0
  let bestSpread = 1
  let runnerUpDist = Infinity

  for (const [pose, clusters] of Object.entries(POSE_MODEL)) {
    let poseDist = Infinity
    let poseCluster = 0
    let poseSpread = 1
    clusters.forEach((cluster, i) => {
      const d = distance(vector, cluster.c)
      if (d < poseDist) {
        poseDist = d
        poseCluster = i
        poseSpread = cluster.spread
      }
    })
    if (poseDist < bestDist) {
      runnerUpDist = bestDist
      bestDist = poseDist
      bestPose = pose
      bestCluster = poseCluster
      bestSpread = poseSpread
    } else if (poseDist < runnerUpDist) {
      runnerUpDist = poseDist
    }
  }

  if (!bestPose) return null

  // How well the body fits the closest known pose at all, independent of how
  // it compares to the others. Combined with the joint score below to decide
  // whether to name the pose.
  const novelty = bestSpread > 0 ? bestDist / bestSpread : Infinity

  // Margin-based confidence: how much closer the winner is than the next
  // pose. Two poses that look alike from this angle produce a low number,
  // which is the honest answer.
  const confidence =
    Number.isFinite(runnerUpDist) && runnerUpDist > 0
      ? Math.max(0, Math.min(1, 1 - bestDist / runnerUpDist))
      : 0

  // Score against whichever pose the caller cares about.
  const scoredPose = target && POSE_MODEL[target] ? target : bestPose
  const clusters = POSE_MODEL[scoredPose]

  let cluster = clusters[0]
  let clusterIndex = 0
  if (scoredPose === bestPose) {
    cluster = clusters[bestCluster]
    clusterIndex = bestCluster
  } else {
    // Coaching a pose the user is not yet in: compare against the closest
    // variant of it, so a left-sided target doesn't cue a right-sided body.
    let d = Infinity
    clusters.forEach((c, i) => {
      const dd = distance(vector, c.c)
      if (dd < d) {
        d = dd
        cluster = c
        clusterIndex = i
      }
    })
  }

  const joints: JointScore[] = JOINT_KEYS.map((key, i) => {
    const [a, b, c] = JOINT_LANDMARKS[key as JointKey]
    const angle = angleAt(
      { x: pts[a][0], y: pts[a][1] },
      { x: pts[b][0], y: pts[b][1] },
      { x: pts[c][0], y: pts[c][1] },
    )
    const [tgt, tol] = cluster.joints[i]
    const signedError = angle - tgt
    const deviation = Math.abs(signedError)
    return {
      key: key as JointKey,
      angle,
      target: tgt,
      tol,
      score: jointScore(deviation, tol),
      ok: deviation <= tol,
      signedError,
    }
  })

  const accuracy = Math.round((joints.reduce((sum, j) => sum + j.score, 0) / joints.length) * 100)

  // Both gates. Shape has to be close AND the joints have to agree.
  const recognised = novelty <= NOVELTY_LIMIT && accuracy >= MIN_ACCURACY

  const failing = joints.filter((j) => !j.ok).sort((a, b) => a.score - b.score)

  return {
    detected: bestPose,
    recognised,
    novelty,
    confidence,
    cluster: clusterIndex,
    scored: scoredPose,
    accuracy,
    joints,
    worst: failing[0] ?? null,
  }
}

/**
 * Direction-aware cue text. Two phrasings per joint: one for "too bent", one
 * for "too open". Written as instructions, never as assessments — "Straighten
 * your right leg", not "your right leg is wrong".
 */
const CUES: Record<JointKey, { open: string; close: string }> = {
  rKnee: { open: 'Straighten your right leg', close: 'Bend your right knee more' },
  lKnee: { open: 'Straighten your left leg', close: 'Bend your left knee more' },
  rElbow: { open: 'Straighten your right arm', close: 'Bend your right elbow more' },
  lElbow: { open: 'Straighten your left arm', close: 'Bend your left elbow more' },
  rHip: { open: 'Open your right hip — lift your chest', close: 'Fold deeper at your right hip' },
  lHip: { open: 'Open your left hip — lift your chest', close: 'Fold deeper at your left hip' },
  rShoulder: { open: 'Raise your right arm higher', close: 'Bring your right arm down' },
  lShoulder: { open: 'Raise your left arm higher', close: 'Bring your left arm down' },
}

/** The one instruction to show. Never a list. */
export function cueFor(joint: JointScore): string {
  return joint.signedError < 0 ? CUES[joint.key].open : CUES[joint.key].close
}

/** Human-readable joint label for the per-joint breakdown. */
export const JOINT_LABELS: Record<JointKey, string> = {
  rKnee: 'Right knee',
  lKnee: 'Left knee',
  rElbow: 'Right elbow',
  lElbow: 'Left elbow',
  rHip: 'Right hip',
  lHip: 'Left hip',
  rShoulder: 'Right shoulder',
  lShoulder: 'Left shoulder',
}
