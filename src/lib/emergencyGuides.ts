/**
 * Static, hand-curated general first-aid guidance for when there is no
 * network at all — deliberately NOT AI-generated. In a genuine offline
 * emergency there is no way to double-check a hallucinated answer, so this
 * page trades conversational flexibility for guaranteed, reviewed content
 * that works with zero connectivity once cached by the service worker.
 *
 * This is general first-aid information, not a diagnosis or a substitute
 * for professional care — every entry says to call 108/112 as soon as it's
 * possible to reach a signal.
 */
export interface EmergencyGuide {
  id: string
  title: string
  /** English + Hindi/Hinglish terms so the offline search matches either. */
  keywords: string[]
  immediateSteps: string[]
  doNot: string[]
  callEmergencyWhen: string
}

export const EMERGENCY_GUIDES: EmergencyGuide[] = [
  {
    id: 'heart-attack',
    title: 'Suspected Heart Attack',
    keywords: ['chest pain', 'chest pressure', 'seene mein dard', 'seene mein bojh', 'heart attack', 'dil ka dora'],
    immediateSteps: [
      'Help the person sit down, stay calm, and rest in a comfortable half-sitting position.',
      'Loosen tight clothing around the neck and chest.',
      'If they have prescribed heart medicine (e.g. sorbitrate/nitroglycerin) with them, help them take it as prescribed.',
      'If they become unconscious and are not breathing normally, begin CPR if you know how, and continue until help arrives.',
      'Keep them warm and reassured. Do not leave them alone.',
    ],
    doNot: ['Do not let them walk around or exert themselves.', 'Do not give food or water.', 'Do not wait to see if it passes — treat it as an emergency from the start.'],
    callEmergencyWhen: 'Immediately — chest pain with sweating, breathlessness, or pain spreading to the arm/jaw is always an emergency.',
  },
  {
    id: 'stroke',
    title: 'Suspected Stroke',
    keywords: ['stroke', 'facial droop', 'one side weak', 'slurred speech', 'lakwa', 'chehra terha'],
    immediateSteps: [
      'Use FAST: Face (ask them to smile — does one side droop?), Arms (ask them to raise both arms — does one drift down?), Speech (ask them to repeat a sentence — is it slurred?), Time (note when symptoms started).',
      'Keep the person lying down with their head slightly raised.',
      'Turn them onto their side if they are vomiting or drooling, to keep the airway clear.',
      'Do not let them eat or drink anything — swallowing may be affected.',
      'Note the exact time symptoms started — this matters a lot for treatment.',
    ],
    doNot: ['Do not give food, water, or medicine by mouth.', 'Do not assume it will pass on its own.'],
    callEmergencyWhen: 'Immediately — every minute matters for stroke outcomes.',
  },
  {
    id: 'severe-allergic-reaction',
    title: 'Severe Allergic Reaction (Anaphylaxis)',
    keywords: ['allergy', 'throat swelling', 'anaphylaxis', 'saans nahi aa raha', 'allergic reaction'],
    immediateSteps: [
      'If they have an epinephrine auto-injector, help them use it immediately, in the outer thigh.',
      'Help them sit up if breathing is difficult, or lie flat with legs raised if they feel faint — whichever is easier for them.',
      'Loosen tight clothing.',
      'If breathing stops, begin CPR if trained.',
      'A second wave of symptoms can occur even after they seem better — do not assume it is over.',
    ],
    doNot: ['Do not wait to see if it gets better on its own.', 'Do not give oral medicine if swallowing or breathing is difficult.'],
    callEmergencyWhen: 'Immediately — throat/tongue swelling or breathing difficulty is life-threatening.',
  },
  {
    id: 'choking',
    title: 'Choking',
    keywords: ['choking', 'gala mein phans gaya', 'cannot breathe', 'stuck in throat'],
    immediateSteps: [
      'Ask "are you choking?" — if they can cough or speak, encourage them to keep coughing.',
      "If they cannot breathe, speak, or cough: stand behind them, lean them forward, and give 5 firm back blows between the shoulder blades with the heel of your hand.",
      'If that does not clear it, give 5 abdominal thrusts (Heimlich maneuver): stand behind them, make a fist above the navel, grasp it with your other hand, and pull sharply inward and upward.',
      'Alternate 5 back blows and 5 abdominal thrusts until the object is cleared or they become unconscious.',
      'If they become unconscious, lower them to the ground carefully and begin CPR if trained.',
    ],
    doNot: ['Do not perform abdominal thrusts on infants under 1 year — use back blows and chest thrusts instead.', 'Do not blindly sweep the mouth with your finger unless you can clearly see the object.'],
    callEmergencyWhen: 'Immediately if the person cannot breathe, speak, or cough, or becomes unconscious.',
  },
  {
    id: 'severe-bleeding',
    title: 'Severe Bleeding',
    keywords: ['bleeding', 'khoon bahut nikal raha hai', 'severe cut', 'heavy bleeding'],
    immediateSteps: [
      'Apply firm, direct pressure on the wound with a clean cloth or bandage.',
      'Keep applying pressure continuously — do not lift the cloth to check.',
      'If blood soaks through, add more cloth on top rather than removing the first layer.',
      'Raise the injured area above heart level if possible.',
      'Once bleeding is controlled, keep the person warm and lying down until help arrives.',
    ],
    doNot: ['Do not remove any object that is embedded in the wound — apply pressure around it instead.', 'Do not use a tourniquet unless bleeding cannot be controlled any other way and you know how.'],
    callEmergencyWhen: 'Immediately for heavy or spurting bleeding, or bleeding that does not slow with direct pressure.',
  },
  {
    id: 'seizure',
    title: 'Seizure',
    keywords: ['seizure', 'fits', 'convulsion', 'daura', 'jhatke aana'],
    immediateSteps: [
      'Ease the person to the floor and clear the area of anything hard or sharp nearby.',
      'Place something soft under their head.',
      'Turn them gently onto their side once the shaking has stopped, to help keep the airway clear.',
      'Time the seizure.',
      'Stay with them until they are fully alert — they may be confused afterward.',
    ],
    doNot: ['Do not hold them down or try to stop the movements.', 'Do not put anything in their mouth.', 'Do not give food or water until they are fully alert.'],
    callEmergencyWhen: 'If it lasts more than 5 minutes, they do not wake up afterward, a second seizure follows quickly, or this is their first-ever seizure.',
  },
  {
    id: 'unconscious',
    title: 'Unconscious / Not Responding',
    keywords: ['unconscious', 'not responding', 'behosh', 'passed out', 'fainted and not waking'],
    immediateSteps: [
      'Check if they respond to your voice or a gentle shake of the shoulders.',
      'Check if they are breathing normally — look, listen, and feel for breath.',
      'If breathing normally, turn them onto their side (recovery position) and keep monitoring.',
      'If NOT breathing normally, begin CPR if trained: push hard and fast in the centre of the chest.',
      'Keep the airway clear and stay with them.',
    ],
    doNot: ['Do not give food or water to an unconscious person.', 'Do not leave them lying on their back unattended.'],
    callEmergencyWhen: 'Immediately, for anyone who does not wake up or is not breathing normally.',
  },
  {
    id: 'snake-bite',
    title: 'Snake Bite',
    keywords: ['snake bite', 'saanp ne kata', 'snakebite'],
    immediateSteps: [
      'Keep the person as still and calm as possible — movement spreads venom faster.',
      'Keep the bitten limb still and positioned below heart level if possible.',
      'Remove tight clothing, rings, or watches near the bite before swelling starts.',
      'Note the time of the bite and, if safe to do so from a distance, the snake\'s appearance — do not try to catch or kill it.',
      'Get to a hospital with anti-venom as fast as possible.',
    ],
    doNot: ['Do not cut the wound or try to suck out venom.', 'Do not apply ice.', 'Do not apply a tight tourniquet — a loose, non-restrictive bandage is safer if trained to apply one.', 'Do not give alcohol or stimulants.'],
    callEmergencyWhen: 'Immediately in every case, even if symptoms seem mild at first.',
  },
  {
    id: 'heat-stroke',
    title: 'Heat Stroke',
    keywords: ['heat stroke', 'loo lagna', 'garmi lagna', 'heatstroke', 'sunstroke'],
    immediateSteps: [
      'Move the person to shade or a cool place immediately.',
      'Remove excess clothing.',
      'Cool them down: sponge with cool (not ice-cold) water, fan them, apply cool wet cloths to neck, armpits, and groin.',
      'If they are conscious and able to swallow, give small sips of cool water or ORS.',
      'Keep monitoring alertness and temperature.',
    ],
    doNot: ['Do not give water if they are confused or losing consciousness.', 'Do not use ice-cold water suddenly — cool gradually.'],
    callEmergencyWhen: 'If confusion, seizure, loss of consciousness, or very high body temperature is present.',
  },
  {
    id: 'burns',
    title: 'Burns',
    keywords: ['burn', 'jal gaya', 'burnt skin', 'jalna'],
    immediateSteps: [
      'Cool the burn under cool (not ice-cold) running water for 10-20 minutes.',
      'Remove any tight clothing or jewellery near the burn before swelling starts, unless stuck to the skin.',
      'Cover loosely with a clean, non-fluffy cloth or cling film.',
      'For a large burn, keep the person warm elsewhere on the body to prevent them getting cold.',
    ],
    doNot: ['Do not apply ice, butter, toothpaste, or oil to a burn.', 'Do not burst any blisters.', 'Do not remove clothing that is stuck to the burn.'],
    callEmergencyWhen: 'For burns larger than the person\'s palm, burns on the face/hands/genitals, or any burn that looks deep/white/charred.',
  },
  {
    id: 'poisoning',
    title: 'Poisoning / Overdose',
    keywords: ['poisoning', 'overdose', 'zeher', 'swallowed medicine', 'took too many pills'],
    immediateSteps: [
      'Try to find out what was taken, how much, and when — keep the container/packet if possible.',
      'If they are conscious and alert, keep them calm and sitting up.',
      'If they become drowsy or unconscious, turn them onto their side and check breathing.',
      'Bring the substance/container with you to the hospital.',
    ],
    doNot: ['Do not make them vomit unless a poison-control professional or doctor specifically tells you to.', 'Do not give food, water, or milk unless instructed by a medical professional.'],
    callEmergencyWhen: 'Immediately in every case of suspected poisoning or overdose.',
  },
  {
    id: 'infant-fever',
    title: 'High Fever in an Infant (under 1 year)',
    keywords: ['baby fever', 'infant fever', 'bachche ko bukhar', 'newborn fever'],
    immediateSteps: [
      'Undress the baby down to a single light layer.',
      'Sponge with lukewarm (not cold) water if they feel very hot.',
      'Keep offering breast milk/formula/fluids in small amounts frequently.',
      'Watch closely for breathing effort, responsiveness, and feeding.',
    ],
    doNot: ['Do not give adult fever medicine.', 'Do not bundle the baby in blankets.', 'Do not use ice or cold water.'],
    callEmergencyWhen: 'Any fever in an infant under 3 months, or fever with breathing difficulty, poor feeding, unusual sleepiness, or a rash.',
  },
  {
    id: 'mental-health-crisis',
    title: 'Suicide Risk / Mental Health Crisis',
    keywords: ['suicide', 'self harm', 'khudkushi', 'want to end life', 'mental health emergency'],
    immediateSteps: [
      'Stay with the person — do not leave them alone.',
      'Listen calmly without judgment. Ask directly if they are thinking of harming themselves.',
      'Remove access to any means of self-harm if it is safe for you to do so.',
      'Contact a trusted family member or friend to be with them too.',
      'iCall (Tata Institute) helpline: 9152987821. AASRA: 91-9820466726.',
    ],
    doNot: ['Do not leave them alone, even briefly, if they express active intent.', 'Do not promise to keep it a secret.'],
    callEmergencyWhen: 'Immediately if there is a plan, means, and intent — call 112 or go to the nearest emergency department together.',
  },
]

export function searchEmergencyGuides(query: string): EmergencyGuide[] {
  const q = query.trim().toLowerCase()
  if (!q) return EMERGENCY_GUIDES
  return EMERGENCY_GUIDES.filter(
    (g) => g.title.toLowerCase().includes(q) || g.keywords.some((k) => k.toLowerCase().includes(q)),
  )
}
