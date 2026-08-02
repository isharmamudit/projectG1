/**
 * The asana roster.
 *
 * Every pose here is one the classifier in poseTemplates.ts was actually
 * trained on, so its joint targets come from measured human data rather than
 * from someone's estimate of what the angle ought to be. The keys match the
 * model keys exactly — that is the join between this file and the templates.
 *
 * An earlier version of this file carried three hand-authored asanas with
 * guessed target angles, including Virabhadrasana II. Those are gone:
 * Tadasana and Vrikshasana are now backed by real reference data, and
 * Virabhadrasana II is not in the dataset, so keeping it would have meant
 * showing a made-up accuracy percentage next to five measured ones.
 */

export interface Asana {
  /** Must match a key in POSE_MODEL. */
  id: string
  name: string
  hindi: string
  english: string
  /** How to stand so the camera can actually see the pose. */
  setup: string
  /** Standing poses work with a laptop webcam; floor poses need the camera moved. */
  view: 'standing' | 'floor' | 'seated'
}

export const ASANAS: Asana[] = [
  {
    id: 'mountain',
    name: 'Tadasana',
    hindi: 'ताड़ासन',
    english: 'Mountain Pose',
    setup: 'Stand facing the camera, feet together, arms raised overhead.',
    view: 'standing',
  },
  {
    id: 'tree',
    name: 'Vrikshasana',
    hindi: 'वृक्षासन',
    english: 'Tree Pose',
    setup: 'Face the camera. Balance on one leg, other foot to the inner thigh, palms together above your head.',
    view: 'standing',
  },
  {
    id: 'triangle',
    name: 'Trikonasana',
    hindi: 'त्रिकोणासन',
    english: 'Triangle Pose',
    setup: 'Face the camera with feet wide. Reach one hand down to your shin, the other straight up.',
    view: 'standing',
  },
  {
    id: 'cobra',
    name: 'Bhujangasana',
    hindi: 'भुजंगासन',
    english: 'Cobra Pose',
    setup: 'Lie face down with the camera to your side, low to the floor. Press your palms down and lift your chest.',
    view: 'floor',
  },
  {
    id: 'lotus',
    name: 'Padmasana',
    hindi: 'पद्मासन',
    english: 'Lotus Pose',
    setup: 'Sit facing the camera with each foot resting on the opposite thigh, hands on your knees.',
    view: 'seated',
  },
  {
    id: 'corpse',
    name: 'Shavasana',
    hindi: 'शवासन',
    english: 'Corpse Pose',
    setup: 'Lie on your back with the camera to your side, low to the floor. Arms slightly away from your body.',
    view: 'floor',
  },
  {
    id: 'veerabhadrasana',
    name: 'Virabhadrasana',
    hindi: 'वीरभद्रासन',
    english: 'Warrior Pose',
    setup: 'Face the camera with feet wide apart, front knee bent, arms straight out at shoulder height.',
    view: 'standing',
  },
  {
    id: 'downward_dog',
    name: 'Adho Mukha Svanasana',
    hindi: 'अधोमुख श्वानासन',
    english: 'Downward Dog',
    setup: 'Camera to your side. Hands and feet on the floor, hips lifted high into an inverted V.',
    view: 'floor',
  },
  {
    id: 'natarajasana',
    name: 'Natarajasana',
    hindi: 'नटराजासन',
    english: 'Dancer Pose',
    setup: 'Face the camera. Balance on one leg, hold the other foot behind you, front arm reaching forward.',
    view: 'standing',
  },
  {
    id: 'ardha_chandrasana',
    name: 'Ardha Chandrasana',
    hindi: 'अर्धचन्द्रासन',
    english: 'Half Moon Pose',
    setup: 'Stand side-on to the camera. Balance on one leg with the other lifted level, one hand down, one arm up.',
    view: 'standing',
  },
  {
    id: 'utkata_konasana',
    name: 'Utkata Konasana',
    hindi: 'उत्कट कोणासन',
    english: 'Goddess Pose',
    setup: 'Face the camera. Feet wide and turned out, both knees bent deeply, elbows bent with palms up.',
    view: 'standing',
  },
  {
    id: 'baddha_konasana',
    name: 'Baddha Konasana',
    hindi: 'बद्धकोणासन',
    english: 'Butterfly Pose',
    setup: 'Sit facing the camera. Soles of the feet together, knees dropping out to the sides.',
    view: 'seated',
  },
]

export const ASANA_BY_ID: Record<string, Asana> = Object.fromEntries(
  ASANAS.map((a) => [a.id, a]),
)

/** Seconds the pose must be held above the accuracy threshold to complete. */
export const HOLD_SECONDS = 10

/**
 * Accuracy at or above this counts as holding the pose. Set from the
 * measured within-tolerance behaviour of the reference data: comfortably
 * reachable by a real body, not so low that a rough approximation passes.
 */
export const HOLD_THRESHOLD = 80

/** Guidance shown when the selected pose needs the camera moved. */
export const VIEW_HINT: Record<Asana['view'], string> = {
  standing: 'A laptop or phone camera at chest height works well.',
  floor: 'Put your device on the floor to one side — a webcam at desk height cannot see this pose.',
  seated: 'Lower the camera to about your seated chest height.',
}
