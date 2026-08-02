/**
 * Deterministic red-flag matcher. No AI, no network, no async.
 *
 * This is rail #2 of the SEHAT safety model: emergency symptoms are detected
 * by fixed rules and bypass the language model entirely. The LLM is never
 * trusted with a life-threatening case, because a model that is right 99% of
 * the time is still wrong once in a hundred chest pains.
 *
 * It runs twice — here on the client before any fetch is made, and again
 * inside api/sehat/triage.ts before the Groq call. The server copy is
 * duplicated rather than imported: see the comment at the top of that file
 * for why (Vercel function bundles do not include sibling modules, which
 * crashed in production once already). If you change a keyword here, change
 * it there too.
 *
 * Design notes that matter for safety:
 * - Every language set is checked on every call, regardless of the `lang`
 *   argument. Someone with the UI in English will still type "seene mein
 *   dard". `lang` only picks which localised instruction to render.
 * - self_harm is the first rule in the list and returns immediately, so a
 *   message mentioning both self-harm and a physical symptom always routes
 *   to Tele-MANAS rather than to an ambulance.
 * - Short Latin keywords are matched as whole words ("fit" must not fire
 *   inside "benefit"). Longer phrases and Indic text use substring matching,
 *   since Indic scripts do not word-break the same way.
 * - Some rules need two things present ("abdominal pain" AND vomiting), so a
 *   rule can carry a second required set. This trades a little sensitivity
 *   for far fewer false alarms on ordinary stomach aches.
 */

export type RedFlagCategory =
  | 'chest_pain'
  | 'breathing'
  | 'one_sided_weakness'
  | 'facial_droop'
  | 'slurred_speech'
  | 'bleeding'
  | 'unconscious'
  | 'seizure'
  | 'abdominal_vomiting'
  | 'pregnancy_bleeding'
  | 'infant_fever'
  | 'poisoning'
  | 'burns'
  | 'self_harm'

export interface RedFlagResult {
  category: RedFlagCategory
  /** Drives which EmergencyScreen is shown. Self-harm never gets an ambulance. */
  variant: 'ambulance' | 'mental_health'
  facility: 'emergency' | 'tele_manas'
  /** The keyword that fired. Shown in the UI so the rule is auditable, not a black box. */
  matched: string
}

interface RedFlagRule {
  category: RedFlagCategory
  variant: 'ambulance' | 'mental_health'
  facility: 'emergency' | 'tele_manas'
  /** Substring matches. Multi-word English and all Indic text lives here. */
  phrases: string[]
  /** Whole-word matches. Short Latin tokens that would false-positive as substrings. */
  words?: string[]
  /** When present, one of these must ALSO appear for the rule to fire. */
  alsoPhrases?: string[]
}

/**
 * Lowercase, strip punctuation, collapse whitespace, pad with spaces.
 *
 * \p{M} must be kept: Devanagari, Bengali and Telugu vowel signs and nuktas
 * are combining marks, and stripping them would shred every Indic keyword in
 * this file. The leading/trailing pad lets whole-word matching be a plain
 * `includes(' word ')` with no regex per keyword.
 */
function normalise(text: string): string {
  return ` ${text.toLowerCase().replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ').trim()} `
}

const RULES: RedFlagRule[] = [
  // ── Checked first, always. A message that mentions both self-harm and a
  // physical symptom must reach a human on a helpline, not an ambulance. ──
  {
    category: 'self_harm',
    variant: 'mental_health',
    facility: 'tele_manas',
    phrases: [
      'kill myself', 'killing myself', 'kill my self', 'end my life', 'ending my life',
      'end it all', 'want to die', 'wanna die', 'i want to die', 'take my own life',
      'suicide', 'suicidal', 'self harm', 'selfharm', 'cut myself', 'cutting myself',
      'hurt myself', 'hurting myself', 'harm myself', 'no reason to live',
      'better off dead', 'don t want to live', 'do not want to live', 'not want to live',
      'nothing to live for', 'hang myself', 'jump off', 'tired of living',
      // Hindi — Devanagari
      'आत्महत्या', 'खुदकुशी', 'ख़ुदकुशी', 'मरना चाहता', 'मरना चाहती', 'मर जाना चाहता',
      'जान दे', 'जान देना', 'जीना नहीं चाहता', 'जीना नहीं चाहती', 'जीने का मन नहीं',
      'खुद को मार', 'ख़ुद को मार', 'खुद को नुकसान', 'फांसी लगा', 'फाँसी लगा',
      // Hindi — Latin transliteration
      'aatmahatya', 'atmahatya', 'khudkushi', 'khudkhushi', 'marna chahta', 'marna chahti',
      'mar jana chahta', 'jaan dena', 'jaan de dun', 'jeena nahi chahta', 'jeena nahi chahti',
      'jeene ka mann nahi', 'khud ko marna', 'fansi laga', 'phansi laga',
      // Bengali
      'আত্মহত্যা', 'মরে যেতে চাই', 'বাঁচতে চাই না', 'নিজেকে শেষ',
      // Telugu
      'ఆత్మహత్య', 'చనిపోవాలని', 'బతకాలని లేదు', 'నన్ను నేను',
    ],
  },

  {
    category: 'chest_pain',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'chest pain', 'pain in chest', 'pain in my chest', 'pain in the chest',
      'chest pressure', 'pressure in chest', 'pressure in my chest', 'chest tightness',
      'tightness in chest', 'tight chest', 'chest heaviness', 'heaviness in chest',
      'heavy chest', 'crushing chest', 'chest hurts', 'chest is hurting',
      'squeezing chest', 'weight on my chest', 'elephant on my chest', 'heart attack',
      'chest discomfort', 'burning in my chest',
      // Hindi — Devanagari
      'सीने में दर्द', 'सीने मे दर्द', 'छाती में दर्द', 'छाती मे दर्द',
      'सीने में भारीपन', 'छाती में भारीपन', 'सीने पर बोझ', 'सीने में बोझ',
      'छाती में जकड़न', 'सीने में दबाव', 'छाती पर दबाव', 'दिल का दौरा', 'दिल का दोरा',
      // Hindi — Latin transliteration
      'seene mein dard', 'seene me dard', 'sine mein dard', 'chhati mein dard',
      'chati me dard', 'chhati me dard', 'seene mein bojh', 'seene par bojh',
      'seene mein bhaaripan', 'seene mein bharipan', 'chhati mein jakdan',
      'dil ka dora', 'dil ka daura',
      // Bengali / Telugu
      'বুকে ব্যথা', 'বুকে চাপ', 'বুক ভারী',
      'ఛాతీ నొప్పి', 'ఛాతీలో నొప్పి', 'గుండె నొప్పి',
    ],
  },

  {
    category: 'breathing',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'can t breathe', 'cant breathe', 'can not breathe', 'cannot breathe',
      'not able to breathe', 'unable to breathe', 'struggling to breathe',
      'difficulty breathing', 'difficulty in breathing', 'trouble breathing',
      'hard to breathe', 'short of breath', 'shortness of breath', 'breathless',
      'gasping', 'choking', 'suffocating', 'blue lips', 'lips turning blue',
      'lips are blue', 'breathing fast', 'wheezing badly',
      // Hindi — Devanagari
      'साँस नहीं आ रही', 'सांस नहीं आ रही', 'साँस नही आ रही', 'सांस नही आ रही',
      'साँस फूल रही', 'सांस फूल रही', 'साँस लेने में तकलीफ', 'सांस लेने में तकलीफ',
      'साँस लेने में दिक्कत', 'दम घुट', 'साँस उखड़', 'सांस उखड़', 'होंठ नीले',
      // Hindi — Latin transliteration
      'saans nahi aa rahi', 'sans nahi aa rahi', 'saans phool rahi', 'saans fool rahi',
      'saans lene mein takleef', 'saans lene me dikkat', 'dum ghut', 'dam ghut',
      'saans ukhad',
      // Bengali / Telugu
      'শ্বাস নিতে পারছি না', 'শ্বাসকষ্ট', 'দম বন্ধ',
      'ఊపిరి ఆడట', 'శ్వాస తీసుకోలేక', 'ఊపిరి రావట',
    ],
  },

  {
    category: 'one_sided_weakness',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'one side weakness', 'weakness on one side', 'one sided weakness',
      'one side of my body', 'one side of the body', 'half my body', 'half of my body',
      'left side weak', 'right side weak', 'left arm weak', 'right arm weak',
      'left side numb', 'right side numb', 'can t move my arm', 'cant move my arm',
      'can t move my leg', 'cant move my leg', 'can t move my hand', 'cant move my hand',
      'sudden numbness', 'sudden weakness', 'paralysis', 'paralysed', 'paralyzed',
      'having a stroke', 'think it s a stroke',
      // Hindi — Devanagari
      'लकवा', 'लक़वा', 'आधा शरीर', 'एक तरफ कमजोरी', 'एक तरफ़ कमज़ोरी',
      'हाथ पैर सुन्न', 'शरीर का एक हिस्सा', 'हाथ नहीं उठ', 'पैर नहीं उठ',
      // Hindi — Latin transliteration
      'lakwa', 'lakva', 'aadha shareer', 'adha sharir', 'ek taraf kamzori',
      'haath pair sunn', 'haath nahi uth',
      // Bengali / Telugu
      'শরীরের এক দিক', 'পক্ষাঘাত', 'হাত নাড়াতে পারছি না',
      'ఒక వైపు బలహీన', 'పక్షవాతం', 'చెయ్యి కదపలేక',
    ],
  },

  {
    category: 'facial_droop',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'face drooping', 'face is drooping', 'facial droop', 'mouth drooping',
      'mouth is drooping', 'one side of face', 'one side of my face', 'face twisted',
      'crooked smile', 'smile is crooked', 'face went numb', 'face has gone numb',
      // Hindi
      'मुँह टेढ़ा', 'मुंह टेढ़ा', 'चेहरा टेढ़ा', 'चेहरे का एक तरफ', 'मुँह लटक',
      'muh tedha', 'munh tedha', 'chehra tedha', 'muh latak',
      // Bengali / Telugu
      'মুখ বেঁকে', 'মুখের একদিক',
      'ముఖం వంకర', 'ముఖం ఒక వైపు',
    ],
  },

  {
    category: 'slurred_speech',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'slurred speech', 'speech is slurred', 'slurring', 'can t speak', 'cant speak',
      'cannot speak', 'not able to speak', 'trouble speaking', 'difficulty speaking',
      'speech difficulty', 'words are jumbled', 'can t talk properly',
      'tongue is twisted', 'speech went strange',
      // Hindi
      'बोलने में तकलीफ', 'बोलने में दिक्कत', 'जबान लड़खड़ा', 'ज़बान लड़खड़ा',
      'बोल नहीं पा रहा', 'बोल नहीं पा रही', 'आवाज़ लड़खड़ा', 'बोली बंद',
      'bolne mein takleef', 'bolne me dikkat', 'zabaan ladkhada', 'jabaan ladkhada',
      'bol nahi pa raha', 'bol nahi pa rahi',
      // Bengali / Telugu
      'কথা জড়িয়ে', 'কথা বলতে পারছি না',
      'మాట తడబడ', 'మాట్లాడలేక',
    ],
  },

  {
    category: 'bleeding',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'heavy bleeding', 'bleeding heavily', 'bleeding a lot', 'lot of blood',
      'severe bleeding', 'uncontrolled bleeding', 'won t stop bleeding',
      'wont stop bleeding', 'will not stop bleeding', 'bleeding non stop',
      'blood is not stopping', 'blood not stopping', 'gushing blood', 'spurting blood',
      'vomiting blood', 'throwing up blood', 'blood in vomit', 'coughing up blood',
      'coughing blood', 'black stool', 'blood in stool', 'bleeding badly',
      // Hindi
      'खून बंद नहीं', 'ख़ून बंद नहीं', 'खून नहीं रुक', 'ख़ून नहीं रुक',
      'बहुत खून', 'बहुत ख़ून', 'खून बह रहा', 'ख़ून बह रहा', 'खून की उल्टी',
      'काला मल', 'खून की उलटी',
      'khoon band nahi', 'khun band nahi', 'khoon nahi ruk', 'bahut khoon',
      'khoon bah raha', 'khoon ki ulti',
      // Bengali / Telugu
      'রক্ত বন্ধ হচ্ছে না', 'অনেক রক্ত', 'রক্তবমি',
      'రక్తం ఆగట', 'చాలా రక్తం', 'రక్తం వాంతి',
    ],
  },

  {
    category: 'unconscious',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'unconscious', 'unresponsive', 'not responding', 'no response at all',
      'not waking up', 'won t wake up', 'wont wake up', 'will not wake up',
      'passed out', 'fainted', 'has collapsed', 'collapsed suddenly',
      'lost consciousness', 'loss of consciousness', 'not breathing', 'no pulse',
      // Hindi
      'बेहोश', 'बेहोशी', 'होश नहीं', 'होश खो', 'जाग नहीं रहा', 'जाग नहीं रही',
      'गिर पड़ा', 'गिर पड़ी', 'चक्कर खाकर गिर',
      'behosh', 'behoshi', 'hosh nahi', 'jaag nahi raha', 'gir pada',
      // Bengali / Telugu
      'অজ্ঞান', 'জ্ঞান হারিয়ে', 'সাড়া দিচ্ছে না',
      'స్పృహ లేదు', 'స్పృహ తప్పి', 'స్పందించట',
    ],
  },

  {
    category: 'seizure',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'seizure', 'convulsion', 'convulsions', 'convulsing',
      // "fit" only ever appears here with context. The bare word is a normal
      // English adjective — "I feel fit" must not summon an ambulance — so it
      // is deliberately absent from the whole-word list below.
      'having a fit', 'had a fit', 'has a fit', 'got a fit', 'having fits',
      'fits are coming', 'fits keep coming', 'fit aaya', 'fit aa raha',
      'fits aa rahe', 'fit pad', 'fits ho rahe',
      'shaking uncontrollably', 'jerking movements',
      'body is jerking', 'epileptic', 'epilepsy', 'frothing at the mouth',
      'foaming at the mouth', 'froth from mouth',
      // Hindi
      'मिर्गी', 'मिरगी', 'दौरा पड़', 'झटके आ रहे', 'अकड़ गया', 'अकड़ गयी',
      'मुँह से झाग', 'मुंह से झाग', 'शरीर अकड़',
      'mirgi', 'mirghi', 'daura pad', 'jhatke aa rahe', 'muh se jhaag',
      // Bengali / Telugu
      'খিঁচুনি', 'মৃগী',
      'మూర్ఛ', 'ఫిట్స్ వస్తు', 'వణుకుతూ',
    ],
  },

  // Stomach pain alone is one of the most common complaints there is, so this
  // rule needs a second signal before it escalates. Pain plus vomiting, or
  // pain the person calls unbearable, is the combination the brief names.
  {
    category: 'abdominal_vomiting',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'stomach pain', 'pain in stomach', 'pain in my stomach', 'abdominal pain',
      'pain in abdomen', 'belly pain', 'stomach ache', 'stomach cramps',
      'पेट में दर्द', 'पेट मे दर्द', 'पेट दर्द', 'पेट में मरोड़',
      'pet mein dard', 'pet me dard', 'pet dard',
      'পেটে ব্যথা', 'পেট ব্যথা',
      'కడుపు నొప్పి', 'పొట్ట నొప్పి',
    ],
    alsoPhrases: [
      'vomiting', 'vomited', 'vomit', 'throwing up', 'threw up', 'keeps coming out',
      'severe', 'unbearable', 'worst', 'can t stand it', 'cant stand it',
      'can t bear', 'cant bear', 'doubled over', 'rigid', 'very bad',
      'उल्टी', 'उलटी', 'लगातार उल्टी', 'तेज़ दर्द', 'तेज दर्द', 'असहनीय',
      'बर्दाश्त नहीं', 'बहुत तेज़', 'बहुत तेज',
      'ulti', 'ulty', 'tez dard', 'bardasht nahi', 'bahut tez',
      'বমি', 'তীব্র', 'সহ্য করতে পারছি না',
      'వాంతి', 'తీవ్రమైన', 'భరించలేక',
    ],
  },

  {
    category: 'pregnancy_bleeding',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'pregnant', 'pregnancy', 'pregnency', 'expecting a baby', 'months pregnant',
      'weeks pregnant', 'गर्भवती', 'गर्भावस्था', 'प्रेग्नेंट', 'पेट से हूँ',
      'garbhvati', 'garbhavati', 'pregnent',
      'গর্ভবতী', 'অন্তঃসত্ত্বা',
      'గర్భవతి', 'గర్భిణి',
    ],
    alsoPhrases: [
      'bleeding', 'blood', 'spotting', 'bleed',
      'खून', 'ख़ून', 'रक्त', 'रक्तस्राव', 'खून आ रहा',
      'khoon', 'khun', 'blood aa raha',
      'রক্ত', 'রক্তপাত',
      'రక్తం', 'రక్తస్రావం',
    ],
  },

  // Deliberately errs upward: "baby" plus fever fires even if the child is
  // older than three months. An unnecessary ambulance call is a far cheaper
  // mistake than a missed neonatal sepsis, and the brief's whole posture is
  // to fail toward more urgency, not less.
  {
    category: 'infant_fever',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'newborn', 'new born', 'infant', 'my baby', 'the baby', 'baby is',
      'baby has', 'month old', 'months old', 'weeks old',
      'नवजात', 'शिशु', 'दूध पीता बच्चा', 'महीने का बच्चा', 'महीने की बच्ची',
      'navjaat', 'navjat', 'shishu', 'mahine ka baccha',
      'নবজাতক', 'শিশু', 'মাসের বাচ্চা',
      'నవజాత', 'పసిబిడ్డ', 'నెలల బిడ్డ',
    ],
    alsoPhrases: [
      'fever', 'temperature', 'high temp', 'burning up', 'very hot',
      'बुखार', 'बुख़ार', 'तेज़ बुखार', 'ताप', 'गरम है',
      'bukhar', 'bukhaar', 'taap', 'garam hai',
      'জ্বর', 'তাপ',
      'జ్వరం', 'వేడి',
    ],
  },

  {
    category: 'poisoning',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'poison', 'poisoned', 'poisoning', 'swallowed pills', 'ate pills',
      'took too many pills', 'too many tablets', 'overdose', 'overdosed',
      'drank kerosene', 'drank phenyl', 'drank acid', 'drank bleach',
      'swallowed chemical', 'drank cleaning', 'pesticide', 'insecticide',
      'rat poison', 'snake bite', 'snakebite', 'bitten by a snake', 'scorpion sting',
      // Hindi
      'ज़हर', 'जहर', 'कीटनाशक', 'चूहे मार', 'सांप ने काटा', 'साँप ने काटा',
      'ज़्यादा गोलियां', 'ज्यादा गोलियां', 'फिनाइल पी', 'तेजाब पी', 'दवा ज्यादा खा',
      'zahar', 'jahar', 'zeher', 'keetnashak', 'saanp ne kata', 'sanp ne kata',
      'zyada goliyan', 'phenyl pee',
      // Bengali / Telugu
      'বিষ', 'সাপে কেটেছে', 'বেশি ওষুধ',
      'విషం', 'పాము కరిచ', 'ఎక్కువ మాత్రలు',
    ],
  },

  // Unambiguous burn injuries — these fire on their own.
  {
    category: 'burns',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: [
      'caught fire', 'on fire', 'clothes caught', 'acid burn', 'acid attack',
      'scalded', 'boiling water fell', 'hot oil fell', 'electric shock',
      'electrocuted', 'third degree burn', 'second degree burn',
      'आग लग', 'जल गया', 'जल गयी', 'जल गई', 'बुरी तरह जल', 'खौलता पानी',
      'तेजाब', 'करंट लग', 'गरम तेल गिर',
      'aag lag', 'jal gaya', 'jal gayi', 'khaulta pani', 'current lag',
      'আগুনে পুড়ে', 'গরম জল পড়ে',
      'మంటల్లో కాలి', 'వేడి నీళ్ళు పడి', 'కరెంట్ షాక్',
    ],
  },
  // "burn" on its own is far too common (burning stomach, burning urine), so
  // the bare word needs a severity or extent signal alongside it. Note that
  // Hindi "जलन"/"jalan" — a burning *sensation* — is deliberately absent from
  // both lists; it is not a burn injury.
  {
    category: 'burns',
    variant: 'ambulance',
    facility: 'emergency',
    phrases: ['burn', 'burnt', 'burned', 'burns'],
    alsoPhrases: [
      'severe', 'major', 'badly', 'large', 'big area', 'whole', 'blister',
      'blisters', 'skin peeling', 'skin came off', 'charred', 'white patch',
      'can t feel', 'cant feel', 'deep',
      'छाले', 'फफोले', 'बुरी तरह', 'बहुत बड़ा', 'चमड़ी उतर',
      'chhale', 'phaphole', 'buri tarah', 'chamdi utar',
    ],
  },
]

/**
 * Short Latin tokens are matched whole-word so they cannot fire inside a
 * longer, innocent word. Kept separate from the rules above because every
 * one of these is a judgement call about a specific false positive.
 */
const WHOLE_WORD_RULES: { category: RedFlagCategory; words: string[] }[] = [
  // "od" as in overdose — must not match "food", "good", "period". Whole-word
  // matching is enough here because a bare "od" has no innocent English use.
  //
  // "fit" was tried here and removed: whole-word matching still fired on
  // "I feel fit and healthy", which is exactly the kind of false alarm that
  // teaches people to ignore the tool. Seizures are caught by the contextual
  // phrases in the seizure rule instead.
  { category: 'poisoning', words: ['od'] },
]

const RULE_BY_CATEGORY = new Map(RULES.map((r) => [r.category, r]))

/**
 * Returns the first matching red flag, or null when nothing fires.
 *
 * `lang` is accepted for call-site symmetry and to document intent, but is
 * deliberately NOT used to filter which keyword sets are checked — every
 * language is always searched. Filtering by the selected language would mean
 * a user browsing in English who types Hindi gets no protection at all.
 */
export function checkRedFlags(text: string, _lang: string): RedFlagResult | null {
  if (!text || !text.trim()) return null
  const haystack = normalise(text)

  for (const rule of RULES) {
    const hit = rule.phrases.find((p) => haystack.includes(p))
    if (!hit) continue
    if (rule.alsoPhrases && !rule.alsoPhrases.some((p) => haystack.includes(p))) continue
    return {
      category: rule.category,
      variant: rule.variant,
      facility: rule.facility,
      matched: hit,
    }
  }

  for (const { category, words } of WHOLE_WORD_RULES) {
    const hit = words.find((w) => haystack.includes(` ${w} `))
    if (!hit) continue
    const rule = RULE_BY_CATEGORY.get(category)
    if (!rule) continue
    return { category, variant: rule.variant, facility: rule.facility, matched: hit }
  }

  return null
}
