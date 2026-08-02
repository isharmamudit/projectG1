import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, CameraOff, CheckCircle2, ChevronLeft, Loader2, ShieldCheck, Sparkles } from 'lucide-react'
import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision'
import { ASANAS, ASANA_BY_ID, HOLD_SECONDS, HOLD_THRESHOLD, VIEW_HINT } from '@/lib/sehat/asanas'
import { meanVisibility, POSE_EDGES, type Point } from '@/lib/sehat/poseMath'
import { assessPose, cueFor, JOINT_LABELS, type PoseAssessment } from '@/lib/sehat/poseClassifier'
import { JOINT_LANDMARKS, MODEL_ACCURACY } from '@/lib/sehat/poseTemplates'
import { cn } from '@/lib/utils'

const WASM_ROOT = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm'
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task'

/** Text updates 6x a second; the canvas still draws every frame. Re-rendering
 * React at camera framerate burns battery to animate digits nobody can read. */
const UI_INTERVAL_MS = 160

type Phase = 'consent' | 'starting' | 'live' | 'denied' | 'error'

interface Ui {
  assessment: PoseAssessment | null
  framing: string | null
}

/**
 * Live posture coach with pose classification.
 *
 * Fully client-side: MediaPipe runs in WASM in the tab and the classifier is
 * 12 KB of centroids. No frame is uploaded, recorded, or sent anywhere.
 *
 * Two things stay true from the first version:
 *  - Only the single worst cue is shown. A list of corrections is unusable
 *    while you are balancing on one leg.
 *  - Nothing here is emergency-red. Being out of tolerance in a yoga pose is
 *    not an emergency, and that colour is reserved so it keeps its meaning.
 */
export function Abhyaas() {
  const [phase, setPhase] = useState<Phase>('consent')
  const [errorMsg, setErrorMsg] = useState('')
  const [autoDetect, setAutoDetect] = useState(true)
  const [asanaId, setAsanaId] = useState(ASANAS[0].id)
  const [ui, setUi] = useState<Ui>({ assessment: null, framing: null })
  const [holdSec, setHoldSec] = useState(0)
  const [completed, setCompleted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const landmarkerRef = useRef<PoseLandmarker | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastVideoTimeRef = useRef(-1)
  const lastFrameAtRef = useRef(0)
  const lastUiAtRef = useRef(0)
  const holdMsRef = useRef(0)
  const targetRef = useRef<string | undefined>(undefined)
  // The hot loop reads mode from a ref so toggling it doesn't rebuild the
  // animation frame callback mid-session.
  const autoDetectRef = useRef(autoDetect)
  const colorsRef = useRef({ ok: '#4c8c68', bad: '#b9812f', dim: '#8a969d' })

  const activeAsana = ASANA_BY_ID[asanaId]

  useEffect(() => {
    targetRef.current = autoDetect ? undefined : asanaId
    autoDetectRef.current = autoDetect
    holdMsRef.current = 0
    setHoldSec(0)
    setCompleted(false)
  }, [autoDetect, asanaId])

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    landmarkerRef.current?.close()
    landmarkerRef.current = null
  }, [])

  useEffect(() => stop, [stop])

  const loop = useCallback(() => {
    rafRef.current = requestAnimationFrame(loop)

    const video = videoRef.current
    const canvas = canvasRef.current
    const landmarker = landmarkerRef.current
    if (!video || !canvas || !landmarker || video.readyState < 2) return

    const now = performance.now()
    const dt = lastFrameAtRef.current ? now - lastFrameAtRef.current : 0
    lastFrameAtRef.current = now

    if (video.currentTime === lastVideoTimeRef.current) return
    lastVideoTimeRef.current = video.currentTime

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const result = landmarker.detectForVideo(video, now)
    const points = (result.landmarks?.[0] ?? []) as Point[]
    const pushUi = (next: Ui) => {
      if (now - lastUiAtRef.current < UI_INTERVAL_MS) return
      lastUiAtRef.current = now
      setUi(next)
    }

    if (points.length < 33) {
      holdMsRef.current = 0
      setHoldSec(0)
      pushUi({ assessment: null, framing: 'Step back so your whole body is in the frame' })
      return
    }

    // Telling someone to straighten a leg the camera cannot see is worse
    // than saying nothing.
    if (meanVisibility(points, [11, 12, 23, 24, 25, 26, 27, 28]) < 0.5) {
      drawSkeleton(ctx, canvas, points, new Set(), colorsRef.current, true)
      holdMsRef.current = 0
      setHoldSec(0)
      pushUi({ assessment: null, framing: 'Move so your whole body is visible' })
      return
    }

    const assessment = assessPose(points, canvas.width, canvas.height, targetRef.current)
    if (!assessment) return

    const badJoints = new Set(
      assessment.joints.filter((j) => !j.ok).flatMap((j) => JOINT_LANDMARKS[j.key]),
    )
    drawSkeleton(ctx, canvas, points, badJoints, colorsRef.current, false)

    // In auto mode the hold timer follows the detected pose; in coached mode
    // it only runs when you are actually in the pose you asked for.
    const onTarget = autoDetectRef.current || assessment.detected === targetRef.current
    if (assessment.recognised && assessment.accuracy >= HOLD_THRESHOLD && onTarget) {
      holdMsRef.current += dt
      const secs = Math.min(HOLD_SECONDS, holdMsRef.current / 1000)
      setHoldSec(secs)
      if (holdMsRef.current >= HOLD_SECONDS * 1000) setCompleted(true)
    } else if (holdMsRef.current !== 0) {
      holdMsRef.current = 0
      setHoldSec(0)
    }

    pushUi({ assessment, framing: null })
  }, [])

  async function start() {
    setPhase('starting')
    setErrorMsg('')

    const styles = getComputedStyle(document.documentElement)
    colorsRef.current = {
      ok: styles.getPropertyValue('--tint-sage').trim() || '#4c8c68',
      bad: styles.getPropertyValue('--tint-amber').trim() || '#b9812f',
      dim: styles.getPropertyValue('--fg-subtle').trim() || '#8a969d',
    }

    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 960 }, height: { ideal: 720 } },
        audio: false,
      })
    } catch (err) {
      const name = err instanceof DOMException ? err.name : ''
      if (name === 'NotAllowedError' || name === 'SecurityError') setPhase('denied')
      else {
        setErrorMsg(
          name === 'NotFoundError'
            ? 'No camera was found on this device.'
            : 'The camera could not be started. Another app may be using it.',
        )
        setPhase('error')
      }
      return
    }
    streamRef.current = stream

    try {
      const fileset = await FilesetResolver.forVisionTasks(WASM_ROOT)
      // GPU is a large speedup where it works but fails outright on some
      // drivers — fall back rather than showing a dead screen.
      landmarkerRef.current = await PoseLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        numPoses: 1,
      }).catch(() =>
        PoseLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: 'CPU' },
          runningMode: 'VIDEO',
          numPoses: 1,
        }),
      )
    } catch {
      stream.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      setErrorMsg('The pose model could not be downloaded. Check your connection and try again.')
      setPhase('error')
      return
    }

    // Attaching the stream happens in the effect below, NOT here. During the
    // consent phase this component returns early, so <video> is not mounted
    // yet and videoRef.current is still null — setting srcObject at this
    // point silently does nothing and you get a black rectangle with the
    // camera light on.
    setPhase('live')
  }

  // Runs once the live JSX has actually mounted, which is the first moment
  // videoRef and canvasRef exist.
  useEffect(() => {
    if (phase !== 'live') return
    const video = videoRef.current
    const stream = streamRef.current
    if (!video || !stream) return

    video.srcObject = stream
    void video.play().catch(() => undefined)

    lastFrameAtRef.current = 0
    lastVideoTimeRef.current = -1
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [phase, loop])

  // ── Consent ──────────────────────────────────────────────────────────
  if (phase === 'consent' || phase === 'starting') {
    return (
      <Shell>
        <h1 className="font-display text-[26px] leading-tight font-black text-fg">Abhyaas</h1>
        <p className="mt-1 text-[13px] font-bold text-tint-violet">अभ्यास · Posture coach</p>

        <div className="mt-6 space-y-3 rounded-2xl border border-border bg-surface p-4">
          <Line icon={ShieldCheck}>
            This is <strong className="font-black">posture guidance, not physiotherapy</strong>. It
            cannot see injuries, and it is not a substitute for a teacher or a clinician.
          </Line>
          <Line icon={ShieldCheck}>
            <strong className="font-black">Stop immediately if anything hurts.</strong> Discomfort is
            not something to hold through.
          </Line>
          <Line icon={Camera}>
            Your camera runs <strong className="font-black">entirely on this device</strong>. No video
            is uploaded, recorded, or sent anywhere.
          </Line>
          <Line icon={Sparkles}>
            Pose recognition is measured at <strong className="font-black">{MODEL_ACCURACY}% accuracy</strong>{' '}
            on people it has never seen. It will still be wrong sometimes — trust your body over the
            number.
          </Line>
        </div>

        <button
          type="button"
          onClick={() => void start()}
          disabled={phase === 'starting'}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-4 text-[15px] font-black text-accent-fg transition-opacity disabled:opacity-60"
        >
          {phase === 'starting' ? (
            <>
              <Loader2 className="size-4 animate-spin" strokeWidth={2.5} />
              Starting camera and loading model…
            </>
          ) : (
            <>
              <Camera className="size-4" strokeWidth={2.5} />
              I understand — start the camera
            </>
          )}
        </button>
        {phase === 'starting' && (
          <p className="mt-3 text-center text-[11.5px] text-fg-muted">
            The pose model is about 3 MB and downloads once. This can take a few seconds.
          </p>
        )}
      </Shell>
    )
  }

  // ── Permission denied ────────────────────────────────────────────────
  if (phase === 'denied') {
    return (
      <Shell>
        <CameraOff className="size-8 text-fg-subtle" strokeWidth={2} />
        <h1 className="mt-4 font-display text-[22px] leading-tight font-black text-fg">
          Camera permission was blocked
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-fg-muted">
          Abhyaas needs the camera to see your posture. Nothing is uploaded — but without permission
          there is nothing to work with.
        </p>
        <div className="mt-5 space-y-2.5 rounded-2xl border border-border bg-surface p-4 text-[12.5px] leading-relaxed text-fg-muted">
          <p>
            <strong className="font-black text-fg">Chrome / Edge:</strong> click the icon at the left
            of the address bar → Site settings → allow Camera, then reload.
          </p>
          <p>
            <strong className="font-black text-fg">Safari:</strong> Safari menu → Settings for This
            Website → set Camera to Allow.
          </p>
          <p>
            <strong className="font-black text-fg">Android Chrome:</strong> tap the lock icon →
            Permissions → Camera → Allow.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPhase('consent')}
          className="mt-5 w-full rounded-2xl bg-accent px-5 py-3.5 text-[14px] font-black text-accent-fg"
        >
          Try again
        </button>
      </Shell>
    )
  }

  if (phase === 'error') {
    return (
      <Shell>
        <CameraOff className="size-8 text-fg-subtle" strokeWidth={2} />
        <h1 className="mt-4 font-display text-[22px] leading-tight font-black text-fg">
          Could not start
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-fg-muted">{errorMsg}</p>
        <button
          type="button"
          onClick={() => setPhase('consent')}
          className="mt-5 w-full rounded-2xl bg-accent px-5 py-3.5 text-[14px] font-black text-accent-fg"
        >
          Try again
        </button>
      </Shell>
    )
  }

  // ── Live ─────────────────────────────────────────────────────────────
  const a = ui.assessment
  const progress = Math.round((holdSec / HOLD_SECONDS) * 100)
  const detectedAsana = a ? ASANA_BY_ID[a.detected] : null
  const lowConfidence = a !== null && a.confidence < 0.12

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-paper">
      <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5">
        <Link
          to="/sehat"
          aria-label="Back"
          onClick={stop}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-fg-muted hover:text-fg"
        >
          <ChevronLeft className="size-5" strokeWidth={2.5} />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-[15px] leading-tight font-black text-fg">Abhyaas</h1>
          <p className="truncate text-[10.5px] text-fg-muted">
            {autoDetect ? 'Detecting your asana' : `Coaching ${activeAsana.name}`}
          </p>
        </div>
      </header>

      <div className="relative flex-1 overflow-hidden bg-ink">
        {/* Mirrored so it reads like a mirror, not a recording. The canvas is
            mirrored with it, so drawing stays in raw video coordinates. */}
        {/* autoPlay + muted + playsInline is the combination Safari requires
            to start a stream without a user gesture on the element itself. */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 size-full -scale-x-100 object-contain"
        />
        <canvas ref={canvasRef} className="absolute inset-0 size-full -scale-x-100 object-contain" />

        <div className="absolute inset-x-0 bottom-0 space-y-2 p-3">
          {ui.framing ? (
            <div className="rounded-2xl bg-ink/80 px-4 py-3.5 backdrop-blur">
              <p className="text-[15px] leading-tight font-black text-paper">{ui.framing}</p>
            </div>
          ) : !a ? null : !a.recognised ? (
            // Nearest-centroid always returns something. When nothing is close
            // enough, say so instead of naming a pose the user isn't doing.
            <div className="rounded-2xl bg-ink/80 px-4 py-3.5 backdrop-blur">
              <p className="text-[10px] font-black tracking-[0.18em] text-paper/60 uppercase">
                No asana recognised
              </p>
              <p className="mt-0.5 text-[15px] leading-tight font-black text-paper">
                Move into one of the six poses below
              </p>
            </div>
          ) : (
            <>
              {/* The hero readout: which asana, and how close you are. */}
              <div className="rounded-2xl bg-ink/80 px-4 py-3 backdrop-blur">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9.5px] font-black tracking-[0.18em] text-paper/60 uppercase">
                      Detected
                    </p>
                    <p className="truncate font-display text-[24px] leading-tight font-black text-paper">
                      {detectedAsana?.name}
                    </p>
                    <p className="truncate text-[11.5px] text-paper/70">
                      {detectedAsana?.hindi} · {detectedAsana?.english}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[9.5px] font-black tracking-[0.18em] text-paper/60 uppercase">
                      Accuracy
                    </p>
                    <p
                      className={cn(
                        'font-display text-[34px] leading-none font-black tabular-nums',
                        a.accuracy >= HOLD_THRESHOLD ? 'text-tint-sage' : 'text-tint-amber',
                      )}
                    >
                      {a.accuracy}
                      <span className="text-[18px]">%</span>
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[9px] font-black tracking-wide text-paper/50 uppercase">Match</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-paper/25">
                    <div
                      className={cn('h-full rounded-full', lowConfidence ? 'bg-tint-amber' : 'bg-tint-sage')}
                      style={{ width: `${Math.max(4, Math.round(a.confidence * 100))}%` }}
                    />
                  </div>
                  <span className="text-[9.5px] font-bold text-paper/70 tabular-nums">
                    {Math.round(a.confidence * 100)}%
                  </span>
                </div>

                {holdSec > 0 && !completed && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] font-black tracking-wide text-paper/50 uppercase">Hold</span>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-paper/25">
                      <div
                        className="h-full rounded-full bg-paper transition-[width] duration-150"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[9.5px] font-bold text-paper/70 tabular-nums">
                      {holdSec.toFixed(1)}s
                    </span>
                  </div>
                )}
              </div>

              {completed ? (
                <div className="flex items-center gap-2.5 rounded-2xl bg-tint-sage px-4 py-3 text-paper">
                  <CheckCircle2 className="size-5 shrink-0" strokeWidth={2.5} />
                  <p className="text-[15px] font-black">Held for {HOLD_SECONDS} seconds. Well done.</p>
                </div>
              ) : a.worst ? (
                // ONE cue. The worst one. Never a list.
                <div className="rounded-2xl bg-tint-amber px-4 py-3">
                  <p className="text-[10px] font-black tracking-[0.18em] text-ink/70 uppercase">One thing</p>
                  <p className="mt-0.5 text-[16px] leading-tight font-black text-ink">{cueFor(a.worst)}</p>
                </div>
              ) : (
                <div className="rounded-2xl bg-tint-sage px-4 py-3">
                  <p className="text-[15px] leading-tight font-black text-paper">
                    Good form — hold it.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Per-joint breakdown — the reason a geometric classifier is worth
          having: it can say which joint, not just which pose. */}
      {a && a.recognised && (
        <div className="flex shrink-0 gap-1 overflow-x-auto border-t border-border bg-surface px-3 py-2">
          {a.joints.map((j) => (
            <div
              key={j.key}
              title={`${JOINT_LABELS[j.key]}: ${Math.round(j.angle)}° vs ${Math.round(j.target)}° target`}
              className="flex min-w-[54px] shrink-0 flex-col items-center gap-1 rounded-lg bg-surface-2 px-1.5 py-1.5"
            >
              <span className="text-[8.5px] font-black tracking-wide text-fg-subtle uppercase">
                {JOINT_LABELS[j.key].replace('Right', 'R').replace('Left', 'L')}
              </span>
              <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={cn('h-full rounded-full', j.ok ? 'bg-tint-sage' : 'bg-tint-amber')}
                  style={{ width: `${Math.round(j.score * 100)}%` }}
                />
              </div>
              <span className="text-[9px] font-bold text-fg-muted tabular-nums">{Math.round(j.angle)}°</span>
            </div>
          ))}
        </div>
      )}

      <p className="shrink-0 border-t border-border bg-surface-2 px-4 py-2 text-[11px] leading-relaxed text-fg-muted">
        {autoDetect
          ? `Move into any of the ${ASANAS.length} poses and it will name it. `
          : `${activeAsana.setup} ${VIEW_HINT[activeAsana.view]} `}
        Stop if anything hurts — this is guidance, not physiotherapy.
      </p>

      <div className="flex shrink-0 gap-1.5 overflow-x-auto border-t border-border bg-surface px-3 py-2.5">
        <button
          type="button"
          onClick={() => setAutoDetect(true)}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12.5px] font-bold transition-colors',
            autoDetect ? 'bg-accent text-accent-fg' : 'bg-surface-2 text-fg-muted hover:text-fg',
          )}
        >
          <Sparkles className="size-3.5" strokeWidth={2.5} />
          Auto-detect
        </button>
        {ASANAS.map((asana) => (
          <button
            key={asana.id}
            type="button"
            onClick={() => {
              setAutoDetect(false)
              setAsanaId(asana.id)
            }}
            className={cn(
              'shrink-0 rounded-xl px-3.5 py-2 text-[12.5px] font-bold transition-colors',
              !autoDetect && asanaId === asana.id
                ? 'bg-accent text-accent-fg'
                : 'bg-surface-2 text-fg-muted hover:text-fg',
            )}
          >
            {asana.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-paper">
      <div className="mx-auto w-full max-w-lg px-5 pt-6 pb-16">
        <Link
          to="/sehat"
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} />
          SEHAT
        </Link>
        {children}
      </div>
    </main>
  )
}

function Line({ icon: Icon, children }: { icon: typeof ShieldCheck; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} />
      <p className="text-[13px] leading-relaxed text-fg-muted">{children}</p>
    </div>
  )
}

function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  points: Point[],
  badJoints: Set<number>,
  colors: { ok: string; bad: string; dim: string },
  dimmed: boolean,
) {
  const px = (p: Point) => [p.x * canvas.width, p.y * canvas.height] as const

  ctx.lineWidth = Math.max(3, canvas.width / 180)
  ctx.lineCap = 'round'

  for (const [from, to] of POSE_EDGES) {
    const a = points[from]
    const b = points[to]
    if (!a || !b) continue
    // An edge is flagged only when both ends belong to a failing joint, so a
    // single shared landmark doesn't paint half the body amber.
    const bad = badJoints.has(from) && badJoints.has(to)
    ctx.strokeStyle = dimmed ? colors.dim : bad ? colors.bad : colors.ok
    ctx.globalAlpha = dimmed ? 0.35 : 0.9
    ctx.beginPath()
    ctx.moveTo(...px(a))
    ctx.lineTo(...px(b))
    ctx.stroke()
  }

  ctx.globalAlpha = dimmed ? 0.4 : 1
  for (let i = 11; i < points.length; i++) {
    const p = points[i]
    if (!p) continue
    const [x, y] = px(p)
    ctx.fillStyle = dimmed ? colors.dim : badJoints.has(i) ? colors.bad : colors.ok
    ctx.beginPath()
    ctx.arc(x, y, Math.max(3, canvas.width / 260), 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}
