export interface Language {
  code: string
  englishName: string
  nativeName: string
  rtl?: boolean
}

export const LANGUAGES: Language[] = [
  { code: 'en', englishName: 'English', nativeName: 'English' },
  { code: 'hi', englishName: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', englishName: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', englishName: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', englishName: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', englishName: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', englishName: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', englishName: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'pa', englishName: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', englishName: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', englishName: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', englishName: 'Urdu', nativeName: 'اردو', rtl: true },
]

interface Card {
  title: string
  detail: string
}

interface Solution {
  headline: string
  sub: string
}

interface ScrollCard {
  tag: string
  title: string
  sub: string
  body: string
}

interface TrustFolderCopy {
  title: string
  sub: string
  rows: [string, string, string, string]
}

export interface Copy {
  heroWords: [string, string, string]
  heroSubtitle: string
  startConsultation: string
  exploreFeatures: string
  consultG1: string
  tapToExplore: string
  chooseLanguage: string
  /** Keyed by the English label used in Navbar.tsx's NAV_ITEMS. */
  navItems: Record<string, string>
  /** The four bento cards below the hero banner. */
  heroTiles: [
    { title: string; brief: string },
    { title: string; brief: string },
    { title: string; brief: string },
    { title: string; brief: string },
  ]
  /** The two static floating badges flanking the hero figure (the rest come from problems.solutions). */
  heroBadges: [string, string]
  voiceGrid: {
    eyebrow: string
    heading: string
    headingAccent: string
  }
  testimonials: {
    eyebrow: string
    heading: string
    headingAccent: string
    subhead: string
  }
  problems: {
    eyebrow: string
    tabProblems: string
    tabSolutions: string
    badgeSolutions: string
    heading: string
    subhead: string
    statsLabels: [string, string, string]
    cards: [Card, Card, Card, Card, Card, Card]
    solutions: [Solution, Solution, Solution, Solution, Solution, Solution]
  }
  india: {
    eyebrow: string
    heading: string
    cardLine1: string
    cardLine2: string
    cardBody: string
    askIn: string
    statsLabels: [string, string, string]
  }
  /** The 8-city grid inside India — city names/language pairs stay as-is (proper nouns), only the one-line feature per city translates. */
  cityGrid: {
    hubLabel: string
    features: [string, string, string, string, string, string, string, string]
  }
  horizontalScroll: {
    eyebrow: string
    scrollHint: string
    featureWord: string
    closingTitle: string
    closingCta: string
    cards: [ScrollCard, ScrollCard, ScrollCard, ScrollCard, ScrollCard, ScrollCard]
  }
  trust: {
    line1: string
    line2: string
    caption: string
    folders: [TrustFolderCopy, TrustFolderCopy, TrustFolderCopy]
  }
  chatbot: {
    title: string
    subtitle: string
    placeholder: string
    greeting: string
    pickLanguage: string
    continueIn: string
    changeLanguage: string
    helpfulQuestion: string
    quickReplies: [string, string]
    errorFallback: string
    listening: string
    endChat?: string
    getReport?: string
    generatingReport?: string
    reportReady?: string
  }
  ctaText: string
  footer: {
    tagline: string
    disclaimer: string
  }
}

export const COPY: Record<string, Copy> = {
  en: {
    heroWords: ['Your', 'health,', 'understood.'],
    heroSubtitle:
      'Ask in your dialect. Speak your symptoms. Photo a prescription. G1 translates clinical complexity into native Indian tongues instantly.',
    startConsultation: 'Start Consultation',
    exploreFeatures: 'Explore features',
    consultG1: 'Consult G1',
    tapToExplore: 'Tap to explore features',
    chooseLanguage: 'Choose your language',
    navItems: { 'Why G1': 'Why G1', Features: 'Features', India: 'India', Trust: 'Trust' },
    heroTiles: [
      { title: 'Instant Chat Consults', brief: 'Reply within 60 secs' },
      { title: 'Voice & Reports', brief: 'Speak, we transcribe' },
      { title: 'Yoga & Posture', brief: 'Guided daily coaching' },
      { title: 'Works Offline', brief: 'No signal, no problem' },
    ],
    heroBadges: ['Ask in your dialect', 'No clinic visit needed'],
    voiceGrid: { eyebrow: 'Interactive Capabilities', heading: 'Deep dive into', headingAccent: 'G1.' },
    testimonials: {
      eyebrow: 'Real Stories',
      heading: 'Heard across',
      headingAccent: 'every state.',
      subhead: 'From grandmothers in Varanasi to doctors in Mumbai — G1 speaks your language.',
    },
    problems: {
      eyebrow: "Explore what's",
      tabProblems: 'Competitor Gaps',
      tabSolutions: 'G1 Solutions',
      badgeSolutions: 'G1 Answers',
      heading: 'What every health app gets wrong.',
      subhead:
        'Existing apps were built for English-speaking, urban, tech-fluent users. ProjectG1 was built for everyone else.',
      statsLabels: ['Underserved Indians', 'Excluded Dialects', 'Lost Records'],
      cards: [
        { title: 'Reports become dead PDFs', detail: 'Stored but never connected or compared over time.' },
        { title: 'No longitudinal timeline', detail: "Can't see how your health changed over months or years." },
        { title: 'No relationship between data', detail: 'Medicines, reports, symptoms, doctors — all isolated silos.' },
        { title: 'Weak emergency readiness', detail: 'Emergency info not instantly accessible offline.' },
        { title: 'Doctor visit prep is missing', detail: 'Patients forget questions and history during consultations.' },
        { title: 'No caregiver workflow', detail: 'Children managing parents still rely on WhatsApp calls.' },
      ],
      solutions: [
        { headline: 'Built for rural India', sub: "Low bandwidth, any phone, any dialect — G1 works where others don't." },
        { headline: 'Every report stays alive', sub: 'Upload once, query forever. Your records grow smarter over time.' },
        { headline: 'A health timeline that thinks', sub: 'Symptoms, medicines and visits — connected across months and years.' },
        { headline: 'Your whole family, one place', sub: 'Manage health for parents, children and yourself without switching apps.' },
        { headline: 'One record, all providers', sub: 'From Practo to Apollo to the local clinic — G1 unifies everything.' },
        { headline: 'Works without internet', sub: 'Blood group, allergies, medications — always available, even offline.' },
      ],
    },
    india: {
      eyebrow: 'Regional Access',
      heading: 'No household left behind.',
      cardLine1: 'Every corner',
      cardLine2: 'of India.',
      cardBody:
        "Built for the semi-urban and rural households most health apps design around, not for. Low bandwidth, modest phones, and a dialect that isn't English — all assumed from day one.",
      askIn: 'Ask G1 in',
      statsLabels: ['Languages & dialects', 'Runs on slower networks', 'States, one companion'],
    },
    cityGrid: {
      hubLabel: 'Project',
      features: [
        'Chat in 20+ dialects',
        'Doctor reports daily',
        'Image scan active',
        'Yoga coaching live',
        'Voice consults growing',
        'Offline records used',
        'Reports sent to doctors',
        'Works on 2G',
      ],
    },
    horizontalScroll: {
      eyebrow: 'What G1 does',
      scrollHint: 'Scroll to explore features',
      featureWord: 'Feature',
      closingTitle: 'More coming soon.',
      closingCta: 'See Voice AI ↓',
      cards: [
        { tag: 'Language', title: 'Chat', sub: 'In your language, your dialect', body: 'Hindi, Bhojpuri, Tamil, Hinglish — ask G1 anything in the language you think in. Expands from the bottom right corner.' },
        { tag: 'Consultation', title: 'Voice', sub: 'Talk — get a doctor report', body: 'Speak your symptoms out loud. G1 asks 10 clinical questions, generates a structured report, and sends it to your doctor.' },
        { tag: 'Visual AI', title: 'Scan', sub: 'Photo your symptoms', body: 'Photograph a rash, burn, hair issue or upload an X-ray. G1 reads it and flags what needs attention.' },
        { tag: 'Movement', title: 'Yoga', sub: 'Real-time posture coaching', body: 'Hold a pose in front of your camera. G1 watches your form in real time and tells you when to move to the next.' },
        { tag: 'Access', title: 'Offline', sub: 'Works without internet', body: 'Blood group, allergies, current medications — all instantly accessible even without a signal, on any phone.' },
        { tag: 'Record', title: 'Memory', sub: 'Your health, remembered', body: 'Every report, symptom, medicine and doctor visit — linked across time so your full story is ready at every appointment.' },
      ],
    },
    trust: {
      line1: 'Trust, built in —',
      line2: 'not bolted on.',
      caption: 'Drag the folders around, or click one open.',
      folders: [
        { title: 'Privacy', sub: 'Your data stays yours', rows: ['Encrypted health records', 'Never sold, ever', 'You control every share', 'Delete anytime'] },
        { title: 'Honesty', sub: 'Every answer, explained', rows: ['Reasoning shown, not hidden', 'Sources you can check', 'Clear "see a doctor" flags', 'Reviewed against clinical guidance'] },
        { title: 'Readiness', sub: 'There in an emergency', rows: ['Allergies & blood group offline', 'Medicines list offline', 'Works without a signal', 'One-tap emergency card'] },
      ],
    },
    chatbot: {
      title: 'G1 Assistant',
      subtitle: 'Ask about symptoms, in your language',
      placeholder: 'Type your message…',
      greeting: "Hi, I'm G1. Tell me what's bothering you, in any language.",
      pickLanguage: 'Pick a language to get started',
      continueIn: 'Continue in',
      changeLanguage: 'change',
      helpfulQuestion: 'Was this helpful?',
      quickReplies: ['I have a headache', 'Skin rash'],
      errorFallback: 'Something went wrong. Please try again in a moment.',
      listening: 'Listening…',
      endChat: 'End chat',
      getReport: 'Get doctor report',
      generatingReport: 'Preparing your report…',
      reportReady: 'Your report is ready — check your downloads.',
    },
    ctaText: 'Start your health story',
    footer: { tagline: 'Made for India.', disclaimer: 'Not a substitute for professional medical advice.' },
  },
  hi: {
    heroWords: ['आपकी', 'सेहत,', 'समझी गई।'],
    heroSubtitle:
      'अपनी भाषा में पूछें। अपने लक्षण बोलें। पर्ची की फोटो खींचें। G1 तुरंत जटिल चिकित्सा जानकारी को आपकी भाषा में समझाता है।',
    startConsultation: 'परामर्श शुरू करें',
    exploreFeatures: 'सुविधाएं देखें',
    consultG1: 'G1 से बात करें',
    tapToExplore: 'सुविधाएं देखने के लिए टैप करें',
    chooseLanguage: 'अपनी भाषा चुनें',
    navItems: { 'Why G1': 'क्यों G1', Features: 'सुविधाएं', India: 'भारत', Trust: 'भरोसा' },
    heroTiles: [
      { title: 'तुरंत चैट परामर्श', brief: '60 सेकंड में जवाब' },
      { title: 'आवाज़ और रिपोर्ट', brief: 'बोलें, हम लिखेंगे' },
      { title: 'योग और मुद्रा', brief: 'रोज़ाना मार्गदर्शन' },
      { title: 'ऑफलाइन काम करता है', brief: 'सिग्नल न हो तो भी कोई समस्या नहीं' },
    ],
    heroBadges: ['अपनी भाषा में पूछें', 'क्लिनिक जाने की ज़रूरत नहीं'],
    voiceGrid: { eyebrow: 'इंटरएक्टिव सुविधाएं', heading: 'गहराई से जानें', headingAccent: 'G1 को.' },
    testimonials: {
      eyebrow: 'सच्ची कहानियां',
      heading: 'हर राज्य में',
      headingAccent: 'सुनी गई।',
      subhead: 'वाराणसी की दादी-नानी से लेकर मुंबई के डॉक्टरों तक — G1 आपकी भाषा बोलता है।',
    },
    problems: {
      eyebrow: 'देखें',
      tabProblems: 'दूसरों की कमियां',
      tabSolutions: 'G1 के समाधान',
      badgeSolutions: 'G1 के जवाब',
      heading: 'हर हेल्थ ऐप कहां चूक जाता है।',
      subhead: 'मौजूदा ऐप्स अंग्रेज़ी बोलने वाले, शहरी, तकनीक-जानकार लोगों के लिए बने थे। ProjectG1 बाकी सबके लिए बनाया गया है।',
      statsLabels: ['वंचित भारतीय', 'छूटी हुई बोलियां', 'खोए हुए रिकॉर्ड'],
      cards: [
        { title: 'रिपोर्ट्स मृत PDF बन जाती हैं', detail: 'संग्रहित तो होती हैं पर कभी जुड़ती या समय के साथ तुलना नहीं होतीं।' },
        { title: 'कोई दीर्घकालिक समयरेखा नहीं', detail: 'महीनों या सालों में आपकी सेहत कैसे बदली, यह दिख नहीं पाता।' },
        { title: 'डेटा के बीच कोई संबंध नहीं', detail: 'दवाइयां, रिपोर्ट्स, लक्षण, डॉक्टर — सब अलग-अलग टुकड़ों में।' },
        { title: 'कमजोर आपातकालीन तैयारी', detail: 'आपातकालीन जानकारी ऑफलाइन तुरंत उपलब्ध नहीं होती।' },
        { title: 'डॉक्टर विज़िट की तैयारी नहीं', detail: 'मरीज़ सलाह के दौरान सवाल और इतिहास भूल जाते हैं।' },
        { title: 'देखभाल करने वालों के लिए कोई तरीका नहीं', detail: 'माता-पिता की देखभाल करने वाले बच्चे अब भी WhatsApp कॉल पर निर्भर हैं।' },
      ],
      solutions: [
        { headline: 'ग्रामीण भारत के लिए बनाया गया', sub: 'धीमा इंटरनेट, कोई भी फ़ोन, कोई भी भाषा — G1 वहां काम करता है जहां बाकी नहीं करते।' },
        { headline: 'हर रिपोर्ट जीवंत रहती है', sub: 'एक बार अपलोड करें, हमेशा के लिए पूछें। आपका रिकॉर्ड समय के साथ समझदार होता जाता है।' },
        { headline: 'एक सोचने वाली स्वास्थ्य समयरेखा', sub: 'लक्षण, दवाइयां और विज़िट — महीनों और सालों में जुड़े हुए।' },
        { headline: 'आपका पूरा परिवार, एक ही जगह', sub: 'माता-पिता, बच्चों और खुद के लिए बिना ऐप बदले सेहत संभालें।' },
        { headline: 'एक रिकॉर्ड, सभी डॉक्टर', sub: 'Practo से Apollo और स्थानीय क्लिनिक तक — G1 सबको जोड़ता है।' },
        { headline: 'इंटरनेट के बिना भी काम करता है', sub: 'ब्लड ग्रुप, एलर्जी, दवाइयां — हमेशा उपलब्ध, ऑफलाइन भी।' },
      ],
    },
    india: {
      eyebrow: 'क्षेत्रीय पहुंच',
      heading: 'कोई भी घर पीछे नहीं छूटेगा।',
      cardLine1: 'भारत का',
      cardLine2: 'हर कोना।',
      cardBody:
        'ज़्यादातर हेल्थ ऐप्स जिन अर्ध-शहरी और ग्रामीण परिवारों को नज़रअंदाज़ करते हैं, यह उन्हीं के लिए बनाया गया है। धीमा इंटरनेट, सामान्य फ़ोन, और अंग्रेज़ी न होना — यह सब पहले दिन से मान लिया गया है।',
      askIn: 'G1 से पूछें',
      statsLabels: ['भाषाएं और बोलियां', 'धीमे नेटवर्क पर भी चलता है', 'राज्य, एक साथी'],
    },
    cityGrid: {
      hubLabel: 'प्रोजेक्ट',
      features: [
        '20+ बोलियों में चैट',
        'रोज़ाना डॉक्टर रिपोर्ट',
        'इमेज स्कैन सक्रिय',
        'योग कोचिंग लाइव',
        'वॉइस परामर्श बढ़ रहे हैं',
        'ऑफलाइन रिकॉर्ड उपयोग में',
        'रिपोर्ट डॉक्टरों को भेजी गईं',
        '2G पर काम करता है',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 क्या करता है',
      scrollHint: 'सुविधाएं देखने के लिए स्क्रॉल करें',
      featureWord: 'फीचर',
      closingTitle: 'जल्द और आ रहा है।',
      closingCta: 'Voice AI देखें ↓',
      cards: [
        { tag: 'भाषा', title: 'चैट', sub: 'आपकी भाषा, आपकी बोली में', body: 'हिंदी, भोजपुरी, तमिल, हिंग्लिश — G1 से अपनी सोच की भाषा में कुछ भी पूछें। नीचे दाईं ओर से खुलता है।' },
        { tag: 'परामर्श', title: 'वॉइस', sub: 'बोलें — डॉक्टर रिपोर्ट पाएं', body: 'अपने लक्षण ज़ोर से बोलें। G1 10 चिकित्सा सवाल पूछता है, एक संरचित रिपोर्ट बनाता है, और उसे आपके डॉक्टर को भेजता है।' },
        { tag: 'विज़ुअल AI', title: 'स्कैन', sub: 'अपने लक्षणों की फोटो लें', body: 'चकत्ते, जलन, बालों की समस्या की फोटो लें या एक्स-रे अपलोड करें। G1 इसे पढ़ता है और जो ध्यान देने योग्य है उसे बताता है।' },
        { tag: 'मूवमेंट', title: 'योग', sub: 'रीयल-टाइम मुद्रा मार्गदर्शन', body: 'अपने कैमरे के सामने एक मुद्रा बनाए रखें। G1 रीयल-टाइम में आपकी मुद्रा देखता है और बताता है कि अगली मुद्रा कब करनी है।' },
        { tag: 'पहुंच', title: 'ऑफलाइन', sub: 'इंटरनेट के बिना काम करता है', body: 'ब्लड ग्रुप, एलर्जी, चालू दवाइयां — बिना सिग्नल के भी, किसी भी फोन पर तुरंत उपलब्ध।' },
        { tag: 'रिकॉर्ड', title: 'मेमोरी', sub: 'आपकी सेहत, याद रखी गई', body: 'हर रिपोर्ट, लक्षण, दवा और डॉक्टर विज़िट — समय के साथ जुड़े हुए ताकि हर अपॉइंटमेंट पर आपकी पूरी कहानी तैयार हो।' },
      ],
    },
    trust: {
      line1: 'भरोसा, शुरू से जुड़ा —',
      line2: 'बाद में नहीं जोड़ा।',
      caption: 'फ़ोल्डर्स को घुमाएं, या किसी एक पर क्लिक करें।',
      folders: [
        { title: 'प्राइवेसी', sub: 'आपका डेटा आपका ही रहता है', rows: ['एन्क्रिप्टेड हेल्थ रिकॉर्ड', 'कभी नहीं बेचा जाता', 'हर शेयर पर आपका नियंत्रण', 'कभी भी डिलीट करें'] },
        { title: 'ईमानदारी', sub: 'हर जवाब, समझाया गया', rows: ['तर्क छुपाया नहीं, दिखाया जाता है', 'जांचे जा सकने वाले स्रोत', 'स्पष्ट "डॉक्टर से मिलें" संकेत', 'चिकित्सा मार्गदर्शन के अनुसार समीक्षित'] },
        { title: 'तैयारी', sub: 'आपातकाल में साथ', rows: ['ब्लड ग्रुप और एलर्जी ऑफलाइन', 'दवाइयों की सूची ऑफलाइन', 'बिना सिग्नल के भी काम करता है', 'एक-टैप इमरजेंसी कार्ड'] },
      ],
    },
    chatbot: {
      title: 'G1 सहायक',
      subtitle: 'अपनी भाषा में लक्षणों के बारे में पूछें',
      placeholder: 'अपना संदेश लिखें…',
      greeting: 'नमस्ते, मैं G1 हूं। किसी भी भाषा में बताएं कि आपको क्या परेशानी है।',
      pickLanguage: 'शुरू करने के लिए एक भाषा चुनें',
      continueIn: 'जारी रखें',
      changeLanguage: 'बदलें',
      helpfulQuestion: 'क्या इससे मदद मिली?',
      quickReplies: ['सिर दर्द है', 'त्वचा पर दाने'],
      errorFallback: 'कुछ गड़बड़ हो गई। कृपया थोड़ी देर बाद फिर से कोशिश करें।',
      listening: 'सुन रहा हूं…',
    },
    ctaText: 'अपनी सेहत की कहानी शुरू करें',
    footer: { tagline: 'भारत के लिए बनाया गया।', disclaimer: 'यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है।' },
  },
  bn: {
    heroWords: ['আপনার', 'স্বাস্থ্য,', 'বোঝা গেল।'],
    heroSubtitle:
      'নিজের ভাষায় জিজ্ঞাসা করুন। আপনার উপসর্গ বলুন। প্রেসক্রিপশনের ছবি তুলুন। G1 তাৎক্ষণিকভাবে জটিল চিকিৎসা তথ্য আপনার ভাষায় বুঝিয়ে দেয়।',
    startConsultation: 'পরামর্শ শুরু করুন',
    exploreFeatures: 'বৈশিষ্ট্য দেখুন',
    consultG1: 'G1-এর সাথে কথা বলুন',
    tapToExplore: 'বৈশিষ্ট্য দেখতে ট্যাপ করুন',
    chooseLanguage: 'আপনার ভাষা বেছে নিন',
    navItems: { 'Why G1': 'কেন G1', Features: 'বৈশিষ্ট্য', India: 'ভারত', Trust: 'বিশ্বাস' },
    heroTiles: [
      { title: 'তাৎক্ষণিক চ্যাট পরামর্শ', brief: '৬০ সেকেন্ডে উত্তর' },
      { title: 'ভয়েস ও রিপোর্ট', brief: 'বলুন, আমরা লিখব' },
      { title: 'যোগ ও ভঙ্গিমা', brief: 'দৈনিক নির্দেশনা' },
      { title: 'অফলাইনে কাজ করে', brief: 'সিগন্যাল না থাকলেও সমস্যা নেই' },
    ],
    heroBadges: ['নিজের ভাষায় জিজ্ঞাসা করুন', 'ক্লিনিকে যাওয়ার প্রয়োজন নেই'],
    voiceGrid: { eyebrow: 'ইন্টারঅ্যাক্টিভ বৈশিষ্ট্য', heading: 'গভীরে জানুন', headingAccent: 'G1-কে.' },
    testimonials: {
      eyebrow: 'সত্যি গল্প',
      heading: 'প্রতিটি রাজ্যে',
      headingAccent: 'শোনা গেছে।',
      subhead: 'বারাণসীর ঠাকুমা থেকে মুম্বাইয়ের ডাক্তার — G1 আপনার ভাষায় কথা বলে।',
    },
    problems: {
      eyebrow: 'দেখুন',
      tabProblems: 'প্রতিযোগীদের ঘাটতি',
      tabSolutions: 'G1-এর সমাধান',
      badgeSolutions: 'G1-এর উত্তর',
      heading: 'প্রতিটি হেলথ অ্যাপ যেখানে ভুল করে।',
      subhead: 'বর্তমান অ্যাপগুলো ইংরেজি-ভাষী, শহুরে, প্রযুক্তি-দক্ষ ব্যবহারকারীদের জন্য তৈরি। ProjectG1 বাকি সবার জন্য তৈরি।',
      statsLabels: ['বঞ্চিত ভারতীয়', 'বাদ পড়া উপভাষা', 'হারানো রেকর্ড'],
      cards: [
        { title: 'রিপোর্ট মৃত PDF হয়ে যায়', detail: 'সংরক্ষিত হয় কিন্তু কখনো সংযুক্ত বা সময়ের সাথে তুলনা হয় না।' },
        { title: 'কোনো দীর্ঘমেয়াদী সময়রেখা নেই', detail: 'মাস বা বছরে আপনার স্বাস্থ্য কীভাবে বদলেছে তা দেখা যায় না।' },
        { title: 'তথ্যের মধ্যে কোনো সম্পর্ক নেই', detail: 'ওষুধ, রিপোর্ট, উপসর্গ, ডাক্তার — সবকিছু আলাদা আলাদা।' },
        { title: 'দুর্বল জরুরি প্রস্তুতি', detail: 'জরুরি তথ্য অফলাইনে তাৎক্ষণিকভাবে পাওয়া যায় না।' },
        { title: 'ডাক্তার দেখানোর প্রস্তুতি নেই', detail: 'রোগীরা পরামর্শের সময় প্রশ্ন ও ইতিহাস ভুলে যান।' },
        { title: 'কোনো যত্নশীল কর্মপ্রবাহ নেই', detail: 'বাবা-মায়ের যত্ন নেওয়া সন্তানরা এখনও WhatsApp কলের উপর নির্ভরশীল।' },
      ],
      solutions: [
        { headline: 'গ্রামীণ ভারতের জন্য তৈরি', sub: 'কম গতির ইন্টারনেট, যেকোনো ফোন, যেকোনো ভাষা — G1 সেখানে কাজ করে যেখানে অন্যরা করে না।' },
        { headline: 'প্রতিটি রিপোর্ট জীবন্ত থাকে', sub: 'একবার আপলোড করুন, চিরকাল জিজ্ঞাসা করুন। আপনার রেকর্ড সময়ের সাথে বুদ্ধিমান হয়।' },
        { headline: 'একটি চিন্তাশীল স্বাস্থ্য সময়রেখা', sub: 'উপসর্গ, ওষুধ ও ভিজিট — মাস ও বছর জুড়ে সংযুক্ত।' },
        { headline: 'আপনার পুরো পরিবার, একই জায়গায়', sub: 'বাবা-মা, সন্তান ও নিজের স্বাস্থ্য অ্যাপ না পাল্টেই সামলান।' },
        { headline: 'একটি রেকর্ড, সব চিকিৎসক', sub: 'Practo থেকে Apollo এবং স্থানীয় ক্লিনিক পর্যন্ত — G1 সবকিছু একত্র করে।' },
        { headline: 'ইন্টারনেট ছাড়াও কাজ করে', sub: 'রক্তের গ্রুপ, অ্যালার্জি, ওষুধ — সবসময় পাওয়া যায়, অফলাইনেও।' },
      ],
    },
    india: {
      eyebrow: 'আঞ্চলিক প্রবেশাধিকার',
      heading: 'কোনো পরিবার বাদ যাবে না।',
      cardLine1: 'ভারতের',
      cardLine2: 'প্রতিটি কোণ।',
      cardBody:
        'বেশিরভাগ হেলথ অ্যাপ যে আধা-শহুরে ও গ্রামীণ পরিবারগুলোকে উপেক্ষা করে, এটি তাদের জন্যই তৈরি। কম গতির ইন্টারনেট, সাধারণ ফোন, এবং ইংরেজি না জানা — সবকিছু প্রথম দিন থেকেই ধরে নেওয়া হয়েছে।',
      askIn: 'G1-কে জিজ্ঞাসা করুন',
      statsLabels: ['ভাষা ও উপভাষা', 'ধীর নেটওয়ার্কেও চলে', 'রাজ্য, একটি সঙ্গী'],
    },
    cityGrid: {
      hubLabel: 'প্রজেক্ট',
      features: [
        '২০+ উপভাষায় চ্যাট',
        'প্রতিদিন ডাক্তার রিপোর্ট',
        'ইমেজ স্ক্যান সক্রিয়',
        'যোগ কোচিং লাইভ',
        'ভয়েস পরামর্শ বাড়ছে',
        'অফলাইন রেকর্ড ব্যবহৃত',
        'ডাক্তারদের রিপোর্ট পাঠানো হয়েছে',
        '2G-তে কাজ করে',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 কী করে',
      scrollHint: 'বৈশিষ্ট্য দেখতে স্ক্রল করুন',
      featureWord: 'বৈশিষ্ট্য',
      closingTitle: 'শীঘ্রই আরও আসছে।',
      closingCta: 'Voice AI দেখুন ↓',
      cards: [
        { tag: 'ভাষা', title: 'চ্যাট', sub: 'আপনার ভাষায়, আপনার উপভাষায়', body: 'হিন্দি, ভোজপুরি, তামিল, হিংলিশ — আপনি যে ভাষায় ভাবেন সেই ভাষায় G1-কে যা খুশি জিজ্ঞাসা করুন। নিচের ডান কোণ থেকে খোলে।' },
        { tag: 'পরামর্শ', title: 'ভয়েস', sub: 'কথা বলুন — ডাক্তার রিপোর্ট পান', body: 'আপনার উপসর্গ জোরে বলুন। G1 ১০টি ক্লিনিক্যাল প্রশ্ন জিজ্ঞাসা করে, একটি কাঠামোবদ্ধ রিপোর্ট তৈরি করে, এবং তা আপনার ডাক্তারের কাছে পাঠায়।' },
        { tag: 'ভিজ্যুয়াল AI', title: 'স্ক্যান', sub: 'আপনার উপসর্গের ছবি তুলুন', body: 'র‍্যাশ, পোড়া, চুলের সমস্যার ছবি তুলুন বা এক্স-রে আপলোড করুন। G1 এটি পড়ে এবং যা মনোযোগ প্রয়োজন তা চিহ্নিত করে।' },
        { tag: 'মুভমেন্ট', title: 'যোগ', sub: 'রিয়েল-টাইম ভঙ্গি প্রশিক্ষণ', body: 'আপনার ক্যামেরার সামনে একটি ভঙ্গি ধরে রাখুন। G1 রিয়েল-টাইমে আপনার ফর্ম দেখে এবং পরবর্তীতে কখন যেতে হবে তা বলে।' },
        { tag: 'অ্যাক্সেস', title: 'অফলাইন', sub: 'ইন্টারনেট ছাড়াই কাজ করে', body: 'রক্তের গ্রুপ, অ্যালার্জি, চলমান ওষুধ — সিগন্যাল ছাড়াও যেকোনো ফোনে সাথে সাথে উপলব্ধ।' },
        { tag: 'রেকর্ড', title: 'মেমরি', sub: 'আপনার স্বাস্থ্য, মনে রাখা', body: 'প্রতিটি রিপোর্ট, উপসর্গ, ওষুধ এবং ডাক্তার ভিজিট — সময়ের সাথে যুক্ত যাতে প্রতিটি অ্যাপয়েন্টমেন্টে আপনার সম্পূর্ণ গল্প প্রস্তুত থাকে।' },
      ],
    },
    trust: {
      line1: 'বিশ্বাস, শুরু থেকেই যুক্ত —',
      line2: 'পরে জোড়া লাগানো নয়।',
      caption: 'ফোল্ডারগুলো টেনে সরান, বা একটিতে ক্লিক করুন।',
      folders: [
        { title: 'প্রাইভেসি', sub: 'আপনার তথ্য আপনারই থাকে', rows: ['এনক্রিপ্টেড স্বাস্থ্য রেকর্ড', 'কখনো বিক্রি হয় না', 'প্রতিটি শেয়ার আপনার নিয়ন্ত্রণে', 'যেকোনো সময় মুছে ফেলুন'] },
        { title: 'সততা', sub: 'প্রতিটি উত্তর, ব্যাখ্যা করা', rows: ['যুক্তি লুকানো নয়, দেখানো হয়', 'পরীক্ষা করার মতো উৎস', 'স্পষ্ট "ডাক্তার দেখান" সংকেত', 'ক্লিনিক্যাল নির্দেশিকা অনুযায়ী পর্যালোচিত'] },
        { title: 'প্রস্তুতি', sub: 'জরুরি অবস্থায় পাশে', rows: ['রক্তের গ্রুপ ও অ্যালার্জি অফলাইনে', 'ওষুধের তালিকা অফলাইনে', 'সিগন্যাল ছাড়াও কাজ করে', 'এক-ট্যাপ জরুরি কার্ড'] },
      ],
    },
    chatbot: {
      title: 'G1 সহায়ক',
      subtitle: 'আপনার ভাষায় উপসর্গ সম্পর্কে জিজ্ঞাসা করুন',
      placeholder: 'আপনার বার্তা লিখুন…',
      greeting: 'হ্যালো, আমি G1। যেকোনো ভাষায় বলুন আপনার কী সমস্যা হচ্ছে।',
      pickLanguage: 'শুরু করতে একটি ভাষা বেছে নিন',
      continueIn: 'চালিয়ে যান',
      changeLanguage: 'পরিবর্তন',
      helpfulQuestion: 'এটি কি সহায়ক ছিল?',
      quickReplies: ['মাথাব্যথা আছে', 'ত্বকে ফুসকুড়ি'],
      errorFallback: 'কিছু ভুল হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।',
      listening: 'শুনছি…',
    },
    ctaText: 'আপনার স্বাস্থ্যের গল্প শুরু করুন',
    footer: { tagline: 'ভারতের জন্য তৈরি।', disclaimer: 'এটি পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।' },
  },
  ta: {
    heroWords: ['உங்கள்', 'உடல்நலம்,', 'புரிந்துகொள்ளப்பட்டது.'],
    heroSubtitle:
      'உங்கள் மொழியில் கேளுங்கள். உங்கள் அறிகுறிகளைப் பேசுங்கள். மருந்துச் சீட்டின் புகைப்படம் எடுங்கள். G1 உடனடியாக மருத்துவ தகவலை உங்கள் மொழியில் விளக்குகிறது.',
    startConsultation: 'ஆலோசனையைத் தொடங்கு',
    exploreFeatures: 'அம்சங்களைப் பார்க்க',
    consultG1: 'G1 உடன் பேசுங்கள்',
    tapToExplore: 'அம்சங்களைப் பார்க்க தட்டவும்',
    chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    navItems: { 'Why G1': 'ஏன் G1', Features: 'அம்சங்கள்', India: 'இந்தியா', Trust: 'நம்பிக்கை' },
    heroTiles: [
      { title: 'உடனடி அரட்டை ஆலோசனை', brief: '60 வினாடிகளில் பதில்' },
      { title: 'குரல் & அறிக்கைகள்', brief: 'பேசுங்கள், நாங்கள் எழுதுவோம்' },
      { title: 'யோகா & தோரணை', brief: 'தினசரி வழிகாட்டுதல்' },
      { title: 'இணையமில்லாமல் வேலை செய்யும்', brief: 'சிக்னல் இல்லாவிட்டாலும் பிரச்சனை இல்லை' },
    ],
    heroBadges: ['உங்கள் மொழியில் கேளுங்கள்', 'கிளினிக் செல்ல தேவையில்லை'],
    voiceGrid: { eyebrow: 'ஊடாடும் திறன்கள்', heading: 'ஆழமாக அறிய', headingAccent: 'G1.' },
    testimonials: {
      eyebrow: 'உண்மைக் கதைகள்',
      heading: 'ஒவ்வொரு மாநிலத்திலும்',
      headingAccent: 'கேட்கப்பட்டது.',
      subhead: 'வாரணாசியின் பாட்டிகள் முதல் மும்பையின் மருத்துவர்கள் வரை — G1 உங்கள் மொழியில் பேசுகிறது.',
    },
    problems: {
      eyebrow: 'பாருங்கள்',
      tabProblems: 'போட்டியாளர் குறைபாடுகள்',
      tabSolutions: 'G1 தீர்வுகள்',
      badgeSolutions: 'G1 பதில்கள்',
      heading: 'ஒவ்வொரு சுகாதார ஆப்பும் தவறு செய்யும் இடம்.',
      subhead: 'தற்போதைய ஆப்கள் ஆங்கிலம் பேசும், நகர்ப்புற, தொழில்நுட்ப அறிவுள்ள பயனர்களுக்காக உருவாக்கப்பட்டவை. ProjectG1 மற்ற அனைவருக்காகவும் உருவாக்கப்பட்டது.',
      statsLabels: ['புறக்கணிக்கப்பட்ட இந்தியர்கள்', 'விலக்கப்பட்ட மொழிகள்', 'இழந்த பதிவுகள்'],
      cards: [
        { title: 'அறிக்கைகள் இறந்த PDF ஆகின்றன', detail: 'சேமிக்கப்படும் ஆனால் காலப்போக்கில் ஒருபோதும் இணைக்கப்படுவதோ ஒப்பிடப்படுவதோ இல்லை.' },
        { title: 'நீண்டகால காலவரிசை இல்லை', detail: 'மாதங்கள் அல்லது ஆண்டுகளில் உங்கள் ஆரோக்கியம் எப்படி மாறியது எனத் தெரியாது.' },
        { title: 'தரவுகளுக்கு இடையே தொடர்பு இல்லை', detail: 'மருந்துகள், அறிக்கைகள், அறிகுறிகள், மருத்துவர்கள் — அனைத்தும் தனித்தனி.' },
        { title: 'பலவீனமான அவசர தயார்நிலை', detail: 'அவசர தகவல் ஆஃப்லைனில் உடனடியாகக் கிடைக்காது.' },
        { title: 'மருத்துவர் வருகைக்கான தயாரிப்பு இல்லை', detail: 'ஆலோசனையின்போது நோயாளிகள் கேள்விகளையும் வரலாற்றையும் மறந்துவிடுகின்றனர்.' },
        { title: 'பராமரிப்பாளர் பணிமுறை இல்லை', detail: 'பெற்றோரைக் கவனிக்கும் குழந்தைகள் இன்னும் WhatsApp அழைப்புகளை நம்பியுள்ளனர்.' },
      ],
      solutions: [
        { headline: 'கிராமப்புற இந்தியாவுக்காக உருவாக்கப்பட்டது', sub: 'குறைந்த வேக இணையம், எந்த மொபைலும், எந்த மொழியும் — மற்றவை வேலை செய்யாத இடத்தில் G1 வேலை செய்கிறது.' },
        { headline: 'ஒவ்வொரு அறிக்கையும் உயிருடன் இருக்கும்', sub: 'ஒருமுறை பதிவேற்றுங்கள், எப்போதும் கேளுங்கள். உங்கள் பதிவுகள் காலப்போக்கில் புத்திசாலியாகும்.' },
        { headline: 'சிந்திக்கும் ஆரோக்கிய காலவரிசை', sub: 'அறிகுறிகள், மருந்துகள் மற்றும் வருகைகள் — மாதங்கள் ஆண்டுகளாக இணைக்கப்பட்டவை.' },
        { headline: 'உங்கள் முழு குடும்பமும், ஒரே இடத்தில்', sub: 'ஆப்களை மாற்றாமல் பெற்றோர், குழந்தைகள் மற்றும் உங்கள் ஆரோக்கியத்தை நிர்வகிக்கவும்.' },
        { headline: 'ஒரு பதிவு, அனைத்து மருத்துவர்களும்', sub: 'Practo முதல் Apollo மற்றும் உள்ளூர் மருத்துவமனை வரை — G1 அனைத்தையும் இணைக்கிறது.' },
        { headline: 'இணையம் இல்லாமலும் வேலை செய்கிறது', sub: 'இரத்த வகை, ஒவ்வாமை, மருந்துகள் — எப்போதும் கிடைக்கும், ஆஃப்லைனிலும் கூட.' },
      ],
    },
    india: {
      eyebrow: 'பிராந்திய அணுகல்',
      heading: 'எந்த வீடும் விடுபடாது.',
      cardLine1: 'இந்தியாவின்',
      cardLine2: 'ஒவ்வொரு மூலையும்.',
      cardBody:
        'பெரும்பாலான சுகாதார ஆப்கள் புறக்கணிக்கும் அரை-நகர்ப்புற மற்றும் கிராமப்புற குடும்பங்களுக்காக இது உருவாக்கப்பட்டது. குறைந்த வேக இணையம், சாதாரண மொபைல்கள், ஆங்கிலம் தெரியாதது — இவை அனைத்தும் முதல் நாளிலிருந்தே கருதப்பட்டவை.',
      askIn: 'G1-இடம் கேளுங்கள்',
      statsLabels: ['மொழிகள் & பேச்சுவழக்குகள்', 'மெதுவான நெட்வொர்க்குகளிலும் இயங்கும்', 'மாநிலங்கள், ஒரே துணை'],
    },
    cityGrid: {
      hubLabel: 'ப்ராஜெக்ட்',
      features: [
        '20+ பேச்சுவழக்குகளில் அரட்டை',
        'தினசரி மருத்துவர் அறிக்கைகள்',
        'இமேஜ் ஸ்கேன் செயலில்',
        'யோகா பயிற்சி நேரலை',
        'குரல் ஆலோசனைகள் அதிகரிக்கின்றன',
        'ஆஃப்லைன் பதிவுகள் பயன்பாட்டில்',
        'மருத்துவர்களுக்கு அறிக்கைகள் அனுப்பப்பட்டன',
        '2G-இல் வேலை செய்கிறது',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 என்ன செய்கிறது',
      scrollHint: 'அம்சங்களைப் பார்க்க ஸ்க்ரோல் செய்யவும்',
      featureWord: 'அம்சம்',
      closingTitle: 'மேலும் விரைவில் வருகிறது.',
      closingCta: 'Voice AI-ஐப் பார்க்க ↓',
      cards: [
        { tag: 'மொழி', title: 'சாட்', sub: 'உங்கள் மொழியில், உங்கள் பேச்சுவழக்கில்', body: 'இந்தி, போஜ்புரி, தமிழ், ஹிங்லிஷ் — நீங்கள் நினைக்கும் மொழியில் G1-இடம் எதுவும் கேளுங்கள். கீழ் வலது மூலையிலிருந்து விரிவடையும்.' },
        { tag: 'ஆலோசனை', title: 'குரல்', sub: 'பேசுங்கள் — மருத்துவர் அறிக்கை பெறுங்கள்', body: 'உங்கள் அறிகுறிகளை சத்தமாகப் பேசுங்கள். G1 10 மருத்துவ கேள்விகளைக் கேட்டு, ஒரு கட்டமைக்கப்பட்ட அறிக்கையை உருவாக்கி, அதை உங்கள் மருத்துவருக்கு அனுப்புகிறது.' },
        { tag: 'விஷுவல் AI', title: 'ஸ்கேன்', sub: 'உங்கள் அறிகுறிகளை புகைப்படம் எடுக்கவும்', body: 'சொறி, தீக்காயம், முடி பிரச்சனையை புகைப்படம் எடுக்கவும் அல்லது எக்ஸ்-ரே பதிவேற்றவும். G1 அதைப் படித்து கவனம் தேவைப்படுவதைக் குறிக்கிறது.' },
        { tag: 'இயக்கம்', title: 'யோகா', sub: 'நேரடி தோரணை பயிற்சி', body: 'உங்கள் கேமராவின் முன் ஒரு தோரணையை வைத்திருங்கள். G1 நேரடியாக உங்கள் தோரணையைப் பார்த்து அடுத்ததற்கு எப்போது செல்ல வேண்டும் எனக் கூறுகிறது.' },
        { tag: 'அணுகல்', title: 'ஆஃப்லைன்', sub: 'இணையம் இல்லாமல் வேலை செய்கிறது', body: 'இரத்த வகை, ஒவ்வாமை, தற்போதைய மருந்துகள் — சிக்னல் இல்லாமலும் எந்த மொபைலிலும் உடனடியாகக் கிடைக்கும்.' },
        { tag: 'பதிவு', title: 'நினைவகம்', sub: 'உங்கள் ஆரோக்கியம், நினைவில் வைக்கப்பட்டது', body: 'ஒவ்வொரு அறிக்கை, அறிகுறி, மருந்து மற்றும் மருத்துவர் வருகை — காலப்போக்கில் இணைக்கப்பட்டு ஒவ்வொரு சந்திப்பிலும் உங்கள் முழு கதை தயாராக இருக்கும்.' },
      ],
    },
    trust: {
      line1: 'நம்பிக்கை, ஆரம்பத்திலிருந்தே —',
      line2: 'பின்னர் சேர்க்கப்பட்டதல்ல.',
      caption: 'கோப்புகளை இழுத்துச் செல்லுங்கள், அல்லது ஒன்றைக் கிளிக் செய்யுங்கள்.',
      folders: [
        { title: 'தனியுரிமை', sub: 'உங்கள் தரவு உங்களுடையதே', rows: ['என்க்ரிப்ட் செய்யப்பட்ட சுகாதார பதிவுகள்', 'ஒருபோதும் விற்கப்படாது', 'ஒவ்வொரு பகிர்விலும் உங்கள் கட்டுப்பாடு', 'எப்போது வேண்டுமானாலும் நீக்கலாம்'] },
        { title: 'நேர்மை', sub: 'ஒவ்வொரு பதிலும், விளக்கப்பட்டது', rows: ['காரணம் மறைக்கப்படாமல் காட்டப்படுகிறது', 'நீங்கள் சரிபார்க்கக்கூடிய ஆதாரங்கள்', 'தெளிவான "மருத்துவரை பாருங்கள்" குறியீடுகள்', 'மருத்துவ வழிகாட்டுதலுக்கு எதிராக சரிபார்க்கப்பட்டது'] },
        { title: 'தயார்நிலை', sub: 'அவசரகாலத்தில் உடன் இருக்கும்', rows: ['இரத்த வகை & ஒவ்வாமை ஆஃப்லைனில்', 'மருந்துகள் பட்டியல் ஆஃப்லைனில்', 'சிக்னல் இல்லாமலும் வேலை செய்கிறது', 'ஒரு-தட்டு அவசர அட்டை'] },
      ],
    },
    chatbot: {
      title: 'G1 உதவியாளர்',
      subtitle: 'உங்கள் மொழியில் அறிகுறிகளைப் பற்றி கேளுங்கள்',
      placeholder: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்…',
      greeting: 'வணக்கம், நான் G1. உங்களுக்கு என்ன பிரச்சனை என்று எந்த மொழியிலும் சொல்லுங்கள்.',
      pickLanguage: 'தொடங்க ஒரு மொழியைத் தேர்ந்தெடுக்கவும்',
      continueIn: 'தொடரவும்',
      changeLanguage: 'மாற்று',
      helpfulQuestion: 'இது உதவியாக இருந்ததா?',
      quickReplies: ['தலைவலி உள்ளது', 'தோல் அரிப்பு'],
      errorFallback: 'ஏதோ தவறு நடந்தது. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.',
      listening: 'கேட்கிறேன்…',
    },
    ctaText: 'உங்கள் உடல்நல கதையைத் தொடங்குங்கள்',
    footer: { tagline: 'இந்தியாவுக்காக உருவாக்கப்பட்டது.', disclaimer: 'இது தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை.' },
  },
  te: {
    heroWords: ['మీ', 'ఆరోగ్యం,', 'అర్థమైంది.'],
    heroSubtitle:
      'మీ భాషలో అడగండి. మీ లక్షణాలను మాట్లాడండి. ప్రిస్క్రిప్షన్ ఫోటో తీయండి. G1 తక్షణమే వైద్య సమాచారాన్ని మీ భాషలో వివరిస్తుంది.',
    startConsultation: 'సంప్రదింపు ప్రారంభించండి',
    exploreFeatures: 'ఫీచర్లను చూడండి',
    consultG1: 'G1తో మాట్లాడండి',
    tapToExplore: 'ఫీచర్లను చూడటానికి నొక్కండి',
    chooseLanguage: 'మీ భాషను ఎంచుకోండి',
    navItems: { 'Why G1': 'ఎందుకు G1', Features: 'ఫీచర్లు', India: 'భారత్', Trust: 'నమ్మకం' },
    heroTiles: [
      { title: 'తక్షణ చాట్ సంప్రదింపులు', brief: '60 సెకన్లలో సమాధానం' },
      { title: 'వాయిస్ & నివేదికలు', brief: 'మాట్లాడండి, మేము రాస్తాం' },
      { title: 'యోగా & భంగిమ', brief: 'రోజువారీ మార్గదర్శకత్వం' },
      { title: 'ఆఫ్‌లైన్‌లో పనిచేస్తుంది', brief: 'సిగ్నల్ లేకపోయినా సమస్య లేదు' },
    ],
    heroBadges: ['మీ భాషలో అడగండి', 'క్లినిక్‌కి వెళ్లాల్సిన అవసరం లేదు'],
    voiceGrid: { eyebrow: 'ఇంటరాక్టివ్ సామర్థ్యాలు', heading: 'లోతుగా తెలుసుకోండి', headingAccent: 'G1ని.' },
    testimonials: {
      eyebrow: 'నిజమైన కథలు',
      heading: 'ప్రతి రాష్ట్రంలో',
      headingAccent: 'వినిపించింది.',
      subhead: 'వారణాసిలోని అమ్మమ్మల నుండి ముంబైలోని వైద్యుల వరకు — G1 మీ భాషలో మాట్లాడుతుంది.',
    },
    problems: {
      eyebrow: 'చూడండి',
      tabProblems: 'పోటీదారుల లోపాలు',
      tabSolutions: 'G1 పరిష్కారాలు',
      badgeSolutions: 'G1 సమాధానాలు',
      heading: 'ప్రతి హెల్త్ యాప్ ఎక్కడ తప్పు చేస్తుంది.',
      subhead: 'ఇప్పటి యాప్‌లు ఇంగ్లీష్ మాట్లాడే, పట్టణ, టెక్ నేర్పరులైన వినియోగదారుల కోసం తయారయ్యాయి. ProjectG1 మిగతా వారందరి కోసం తయారైంది.',
      statsLabels: ['నిర్లక్ష్యానికి గురైన భారతీయులు', 'మినహాయించిన మాండలికాలు', 'కోల్పోయిన రికార్డులు'],
      cards: [
        { title: 'నివేదికలు నిర్జీవ PDFలుగా మారతాయి', detail: 'నిల్వ చేయబడతాయి కానీ కాలంతో పాటు ఎప్పుడూ అనుసంధానం లేదా పోల్చడం జరగదు.' },
        { title: 'దీర్ఘకాలిక కాలక్రమం లేదు', detail: 'నెలలు లేదా సంవత్సరాలలో మీ ఆరోగ్యం ఎలా మారిందో చూడలేరు.' },
        { title: 'డేటా మధ్య సంబంధం లేదు', detail: 'మందులు, నివేదికలు, లక్షణాలు, వైద్యులు — అన్నీ వేర్వేరుగా ఉంటాయి.' },
        { title: 'బలహీన అత్యవసర సంసిద్ధత', detail: 'అత్యవసర సమాచారం ఆఫ్‌లైన్‌లో తక్షణమే అందుబాటులో ఉండదు.' },
        { title: 'వైద్యుడి సందర్శన సన్నద్ధత లేదు', detail: 'సంప్రదింపుల సమయంలో రోగులు ప్రశ్నలు, చరిత్రను మర్చిపోతారు.' },
        { title: 'సంరక్షకుల కోసం వర్క్‌ఫ్లో లేదు', detail: 'తల్లిదండ్రులను చూసుకునే పిల్లలు ఇప్పటికీ WhatsApp కాల్స్ మీద ఆధారపడతారు.' },
      ],
      solutions: [
        { headline: 'గ్రామీణ భారతదేశం కోసం రూపొందించబడింది', sub: 'తక్కువ వేగం ఇంటర్నెట్, ఏ ఫోన్ అయినా, ఏ భాష అయినా — మిగతావి పనిచేయని చోట G1 పనిచేస్తుంది.' },
        { headline: 'ప్రతి నివేదిక సజీవంగా ఉంటుంది', sub: 'ఒకసారి అప్‌లోడ్ చేయండి, ఎప్పటికీ అడగండి. మీ రికార్డులు కాలంతో పాటు తెలివిగా మారతాయి.' },
        { headline: 'ఆలోచించే ఆరోగ్య కాలక్రమం', sub: 'లక్షణాలు, మందులు మరియు సందర్శనలు — నెలలు, సంవత్సరాలుగా అనుసంధానించబడతాయి.' },
        { headline: 'మీ మొత్తం కుటుంబం, ఒకే చోట', sub: 'యాప్‌లు మార్చకుండా తల్లిదండ్రులు, పిల్లలు మరియు మీ ఆరోగ్యాన్ని నిర్వహించండి.' },
        { headline: 'ఒక రికార్డు, అందరు వైద్యులు', sub: 'Practo నుండి Apollo మరియు స్థానిక క్లినిక్ వరకు — G1 అన్నింటినీ ఏకం చేస్తుంది.' },
        { headline: 'ఇంటర్నెట్ లేకుండా కూడా పనిచేస్తుంది', sub: 'రక్త వర్గం, అలర్జీలు, మందులు — ఎల్లప్పుడూ అందుబాటులో, ఆఫ్‌లైన్‌లో కూడా.' },
      ],
    },
    india: {
      eyebrow: 'ప్రాంతీయ అందుబాటు',
      heading: 'ఏ ఇల్లు వెనుకబడదు.',
      cardLine1: 'భారతదేశంలోని',
      cardLine2: 'ప్రతి మూల.',
      cardBody:
        'చాలా హెల్త్ యాప్‌లు పట్టించుకోని అర్ధ-పట్టణ, గ్రామీణ కుటుంబాల కోసం ఇది తయారు చేయబడింది. తక్కువ వేగం ఇంటర్నెట్, సాధారణ ఫోన్లు, ఇంగ్లీష్ రాకపోవడం — ఇవన్నీ మొదటి రోజు నుండే భావించబడ్డాయి.',
      askIn: 'G1ని అడగండి',
      statsLabels: ['భాషలు & మాండలికాలు', 'నెమ్మదైన నెట్‌వర్క్‌లలో కూడా పనిచేస్తుంది', 'రాష్ట్రాలు, ఒకే తోడు'],
    },
    cityGrid: {
      hubLabel: 'ప్రాజెక్ట్',
      features: [
        '20+ మాండలికాల్లో చాట్',
        'ప్రతిరోజూ డాక్టర్ నివేదికలు',
        'ఇమేజ్ స్కాన్ యాక్టివ్',
        'యోగా కోచింగ్ లైవ్',
        'వాయిస్ సంప్రదింపులు పెరుగుతున్నాయి',
        'ఆఫ్‌లైన్ రికార్డులు వాడుకలో',
        'వైద్యులకు నివేదికలు పంపబడ్డాయి',
        '2Gలో పనిచేస్తుంది',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 ఏమి చేస్తుంది',
      scrollHint: 'ఫీచర్లను చూడటానికి స్క్రోల్ చేయండి',
      featureWord: 'ఫీచర్',
      closingTitle: 'మరిన్ని త్వరలో వస్తాయి.',
      closingCta: 'Voice AI చూడండి ↓',
      cards: [
        { tag: 'భాష', title: 'చాట్', sub: 'మీ భాషలో, మీ మాండలికంలో', body: 'హిందీ, భోజ్‌పురి, తమిళం, హింగ్లిష్ — మీరు ఆలోచించే భాషలో G1ని ఏదైనా అడగండి. దిగువ కుడి మూల నుండి విస్తరిస్తుంది.' },
        { tag: 'సంప్రదింపు', title: 'వాయిస్', sub: 'మాట్లాడండి — డాక్టర్ నివేదిక పొందండి', body: 'మీ లక్షణాలను బిగ్గరగా చెప్పండి. G1 10 క్లినికల్ ప్రశ్నలు అడిగి, నిర్మాణాత్మక నివేదికను రూపొందించి, మీ వైద్యుడికి పంపుతుంది.' },
        { tag: 'విజువల్ AI', title: 'స్కాన్', sub: 'మీ లక్షణాల ఫోటో తీయండి', body: 'దద్దుర్లు, కాలిన గాయం, జుట్టు సమస్యను ఫోటో తీయండి లేదా X-రే అప్‌లోడ్ చేయండి. G1 దానిని చదివి శ్రద్ధ అవసరమైన వాటిని గుర్తిస్తుంది.' },
        { tag: 'కదలిక', title: 'యోగా', sub: 'రియల్-టైమ్ భంగిమ శిక్షణ', body: 'మీ కెమెరా ముందు ఒక భంగిమను పట్టుకోండి. G1 రియల్ టైమ్‌లో మీ భంగిమను చూసి తదుపరిదానికి ఎప్పుడు వెళ్లాలో చెబుతుంది.' },
        { tag: 'యాక్సెస్', title: 'ఆఫ్‌లైన్', sub: 'ఇంటర్నెట్ లేకుండా పనిచేస్తుంది', body: 'రక్త వర్గం, అలర్జీలు, ప్రస్తుత మందులు — సిగ్నల్ లేకపోయినా ఏ ఫోన్‌లోనైనా తక్షణమే అందుబాటులో.' },
        { tag: 'రికార్డు', title: 'మెమరీ', sub: 'మీ ఆరోగ్యం, గుర్తుంచుకోబడింది', body: 'ప్రతి నివేదిక, లక్షణం, మందు మరియు వైద్యుడి సందర్శన — కాలంతో పాటు అనుసంధానించబడి ప్రతి అపాయింట్‌మెంట్‌లో మీ పూర్తి కథ సిద్ధంగా ఉంటుంది.' },
      ],
    },
    trust: {
      line1: 'నమ్మకం, మొదటి నుండే —',
      line2: 'తర్వాత జోడించింది కాదు.',
      caption: 'ఫోల్డర్లను లాగండి, లేదా ఒకదాన్ని క్లిక్ చేయండి.',
      folders: [
        { title: 'గోప్యత', sub: 'మీ డేటా మీదే ఉంటుంది', rows: ['ఎన్‌క్రిప్టెడ్ ఆరోగ్య రికార్డులు', 'ఎప్పుడూ అమ్మబడదు', 'ప్రతి షేర్‌పై మీ నియంత్రణ', 'ఎప్పుడైనా తొలగించండి'] },
        { title: 'నిజాయితీ', sub: 'ప్రతి సమాధానం, వివరించబడింది', rows: ['కారణం దాచకుండా చూపబడుతుంది', 'మీరు తనిఖీ చేయగల మూలాలు', 'స్పష్టమైన "వైద్యుడిని చూడండి" సంకేతాలు', 'వైద్య మార్గదర్శకాలకు అనుగుణంగా సమీక్షించబడింది'] },
        { title: 'సంసిద్ధత', sub: 'అత్యవసర సమయంలో తోడుగా', rows: ['రక్త వర్గం & అలర్జీలు ఆఫ్‌లైన్‌లో', 'మందుల జాబితా ఆఫ్‌లైన్‌లో', 'సిగ్నల్ లేకపోయినా పనిచేస్తుంది', 'వన్-టాప్ ఎమర్జెన్సీ కార్డు'] },
      ],
    },
    chatbot: {
      title: 'G1 సహాయకుడు',
      subtitle: 'మీ భాషలో లక్షణాల గురించి అడగండి',
      placeholder: 'మీ సందేశాన్ని టైప్ చేయండి…',
      greeting: 'హాయ్, నేను G1. మీకు ఏమి ఇబ్బందిగా ఉందో ఏ భాషలోనైనా చెప్పండి.',
      pickLanguage: 'ప్రారంభించడానికి ఒక భాషను ఎంచుకోండి',
      continueIn: 'కొనసాగించు',
      changeLanguage: 'మార్చు',
      helpfulQuestion: 'ఇది సహాయకరంగా ఉందా?',
      quickReplies: ['తలనొప్పి ఉంది', 'చర్మంపై దద్దుర్లు'],
      errorFallback: 'ఏదో తప్పు జరిగింది. దయచేసి కొద్దిసేపటి తర్వాత మళ్ళీ ప్రయత్నించండి.',
      listening: 'వింటున్నాను…',
    },
    ctaText: 'మీ ఆరోగ్య కథను ప్రారంభించండి',
    footer: { tagline: 'భారతదేశం కోసం రూపొందించబడింది.', disclaimer: 'ఇది వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు.' },
  },
  mr: {
    heroWords: ['तुमचं', 'आरोग्य,', 'समजलं.'],
    heroSubtitle:
      'तुमच्या भाषेत विचारा. लक्षणं बोला. प्रिस्क्रिप्शनचा फोटो काढा. G1 त्वरित वैद्यकीय माहिती तुमच्या भाषेत सांगतो.',
    startConsultation: 'सल्ला सुरू करा',
    exploreFeatures: 'वैशिष्ट्ये पहा',
    consultG1: 'G1 शी बोला',
    tapToExplore: 'वैशिष्ट्ये पाहण्यासाठी टॅप करा',
    chooseLanguage: 'तुमची भाषा निवडा',
    navItems: { 'Why G1': 'का G1', Features: 'वैशिष्ट्ये', India: 'भारत', Trust: 'विश्वास' },
    heroTiles: [
      { title: 'त्वरित चॅट सल्ला', brief: '60 सेकंदात उत्तर' },
      { title: 'व्हॉइस आणि अहवाल', brief: 'बोला, आम्ही लिहू' },
      { title: 'योग आणि पवित्रा', brief: 'दररोज मार्गदर्शन' },
      { title: 'ऑफलाइन काम करते', brief: 'सिग्नल नसला तरी अडचण नाही' },
    ],
    heroBadges: ['तुमच्या भाषेत विचारा', 'दवाखान्यात जाण्याची गरज नाही'],
    voiceGrid: { eyebrow: 'इंटरॲक्टिव्ह वैशिष्ट्ये', heading: 'सखोल जाणून घ्या', headingAccent: 'G1 बद्दल.' },
    testimonials: {
      eyebrow: 'खऱ्या कहाण्या',
      heading: 'प्रत्येक राज्यात',
      headingAccent: 'ऐकलं गेलं.',
      subhead: 'वाराणसीतील आजींपासून मुंबईतील डॉक्टरांपर्यंत — G1 तुमच्या भाषेत बोलतो.',
    },
    problems: {
      eyebrow: 'पहा',
      tabProblems: 'स्पर्धकांच्या त्रुटी',
      tabSolutions: 'G1 उपाय',
      badgeSolutions: 'G1 उत्तरे',
      heading: 'प्रत्येक हेल्थ अ‍ॅप कुठे चुकतो.',
      subhead: 'सध्याचे अ‍ॅप्स इंग्रजी बोलणाऱ्या, शहरी, तंत्रज्ञान-जाणकार वापरकर्त्यांसाठी बनले होते. ProjectG1 इतर सर्वांसाठी बनवले आहे.',
      statsLabels: ['दुर्लक्षित भारतीय', 'वगळलेल्या बोली', 'गमावलेले रेकॉर्ड'],
      cards: [
        { title: 'रिपोर्ट्स निर्जीव PDF बनतात', detail: 'साठवल्या जातात पण काळाच्या ओघात कधीच जोडल्या किंवा तुलना केल्या जात नाहीत.' },
        { title: 'दीर्घकालीन टाइमलाइन नाही', detail: 'महिने किंवा वर्षांत तुमचे आरोग्य कसे बदलले हे दिसत नाही.' },
        { title: 'डेटामध्ये संबंध नाही', detail: 'औषधे, रिपोर्ट्स, लक्षणे, डॉक्टर — सर्व वेगवेगळे.' },
        { title: 'कमकुवत आणीबाणी तयारी', detail: 'आणीबाणीची माहिती ऑफलाइन त्वरित उपलब्ध नसते.' },
        { title: 'डॉक्टर भेटीची तयारी नाही', detail: 'रुग्ण सल्ल्यादरम्यान प्रश्न आणि इतिहास विसरतात.' },
        { title: 'काळजीवाहकांसाठी कार्यपद्धत नाही', detail: 'पालकांची काळजी घेणारी मुले अजूनही WhatsApp कॉलवर अवलंबून आहेत.' },
      ],
      solutions: [
        { headline: 'ग्रामीण भारतासाठी बनवले', sub: 'कमी वेगाचा इंटरनेट, कोणताही फोन, कोणतीही भाषा — G1 तिथे काम करतो जिथे इतर करत नाहीत.' },
        { headline: 'प्रत्येक रिपोर्ट जिवंत राहतो', sub: 'एकदा अपलोड करा, कायम विचारा. तुमचे रेकॉर्ड काळानुसार अधिक हुशार होतात.' },
        { headline: 'विचार करणारी आरोग्य टाइमलाइन', sub: 'लक्षणे, औषधे आणि भेटी — महिने आणि वर्षांमध्ये जोडलेल्या.' },
        { headline: 'तुमचे संपूर्ण कुटुंब, एकाच ठिकाणी', sub: 'अ‍ॅप न बदलता पालक, मुले आणि स्वतःचे आरोग्य सांभाळा.' },
        { headline: 'एक रेकॉर्ड, सर्व डॉक्टर', sub: 'Practo पासून Apollo आणि स्थानिक दवाखान्यापर्यंत — G1 सर्व एकत्र आणतो.' },
        { headline: 'इंटरनेटशिवायही काम करतो', sub: 'रक्तगट, ॲलर्जी, औषधे — नेहमी उपलब्ध, ऑफलाइनही.' },
      ],
    },
    india: {
      eyebrow: 'प्रादेशिक प्रवेश',
      heading: 'कोणतेही घर मागे राहणार नाही.',
      cardLine1: 'भारताचा',
      cardLine2: 'प्रत्येक कोपरा.',
      cardBody:
        'बहुतांश हेल्थ अ‍ॅप्स दुर्लक्ष करणाऱ्या निमशहरी आणि ग्रामीण कुटुंबांसाठी हे बनवले आहे. कमी वेगाचा इंटरनेट, साधे फोन आणि इंग्रजी न येणे — हे सर्व पहिल्या दिवसापासून गृहीत धरले आहे.',
      askIn: 'G1 ला विचारा',
      statsLabels: ['भाषा आणि बोली', 'संथ नेटवर्कवरही चालते', 'राज्ये, एकच सोबती'],
    },
    cityGrid: {
      hubLabel: 'प्रोजेक्ट',
      features: [
        '20+ बोलींमध्ये चॅट',
        'दररोज डॉक्टर रिपोर्ट्स',
        'इमेज स्कॅन सक्रिय',
        'योग कोचिंग थेट',
        'व्हॉइस सल्ला वाढत आहे',
        'ऑफलाइन रेकॉर्ड वापरात',
        'डॉक्टरांना अहवाल पाठवले',
        '2G वर काम करते',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 काय करतो',
      scrollHint: 'वैशिष्ट्ये पाहण्यासाठी स्क्रोल करा',
      featureWord: 'फीचर',
      closingTitle: 'लवकरच आणखी येत आहे.',
      closingCta: 'Voice AI पहा ↓',
      cards: [
        { tag: 'भाषा', title: 'चॅट', sub: 'तुमच्या भाषेत, तुमच्या बोलीत', body: 'हिंदी, भोजपुरी, तमिळ, हिंग्लिश — तुम्ही जे विचार करता त्या भाषेत G1 ला काहीही विचारा. खालच्या उजव्या कोपऱ्यातून विस्तारते.' },
        { tag: 'सल्ला', title: 'व्हॉइस', sub: 'बोला — डॉक्टर रिपोर्ट मिळवा', body: 'तुमची लक्षणे मोठ्याने सांगा. G1 10 क्लिनिकल प्रश्न विचारतो, एक संरचित अहवाल तयार करतो, आणि तो तुमच्या डॉक्टरांना पाठवतो.' },
        { tag: 'व्हिज्युअल AI', title: 'स्कॅन', sub: 'तुमच्या लक्षणांचा फोटो घ्या', body: 'पुरळ, भाजणे, केसांची समस्या यांचा फोटो घ्या किंवा एक्स-रे अपलोड करा. G1 ते वाचतो आणि लक्ष देण्याची गरज असलेल्या गोष्टी सांगतो.' },
        { tag: 'हालचाल', title: 'योग', sub: 'रिअल-टाइम पवित्रा मार्गदर्शन', body: 'तुमच्या कॅमेऱ्यासमोर एक पवित्रा धरा. G1 रिअल टाइममध्ये तुमचा फॉर्म पाहतो आणि पुढच्याकडे कधी जायचे ते सांगतो.' },
        { tag: 'उपलब्धता', title: 'ऑफलाइन', sub: 'इंटरनेटशिवाय काम करते', body: 'रक्तगट, ॲलर्जी, सध्याची औषधे — सिग्नल नसतानाही, कोणत्याही फोनवर लगेच उपलब्ध.' },
        { tag: 'रेकॉर्ड', title: 'मेमरी', sub: 'तुमचे आरोग्य, लक्षात ठेवलेले', body: 'प्रत्येक अहवाल, लक्षण, औषध आणि डॉक्टर भेट — काळानुसार जोडलेले जेणेकरून प्रत्येक भेटीत तुमची संपूर्ण कहाणी तयार असेल.' },
      ],
    },
    trust: {
      line1: 'विश्वास, सुरुवातीपासूनच —',
      line2: 'नंतर जोडलेला नाही.',
      caption: 'फोल्डर्स फिरवा, किंवा एकावर क्लिक करा.',
      folders: [
        { title: 'गोपनीयता', sub: 'तुमचा डेटा तुमचाच राहतो', rows: ['एन्क्रिप्टेड आरोग्य नोंदी', 'कधीही विकला जात नाही', 'प्रत्येक शेअरवर तुमचे नियंत्रण', 'केव्हाही डिलीट करा'] },
        { title: 'प्रामाणिकपणा', sub: 'प्रत्येक उत्तर, स्पष्ट केलेले', rows: ['तर्क लपवलेला नाही, दाखवलेला', 'तपासता येण्याजोगे स्रोत', 'स्पष्ट "डॉक्टरांना भेटा" चिन्हे', 'वैद्यकीय मार्गदर्शनानुसार पुनरावलोकन केलेले'] },
        { title: 'सज्जता', sub: 'आणीबाणीत सोबत', rows: ['रक्तगट आणि ॲलर्जी ऑफलाइन', 'औषधांची यादी ऑफलाइन', 'सिग्नलशिवायही काम करते', 'वन-टॅप इमर्जन्सी कार्ड'] },
      ],
    },
    chatbot: {
      title: 'G1 सहाय्यक',
      subtitle: 'तुमच्या भाषेत लक्षणांबद्दल विचारा',
      placeholder: 'तुमचा संदेश टाइप करा…',
      greeting: 'नमस्कार, मी G1 आहे. तुम्हाला काय त्रास होतोय ते कोणत्याही भाषेत सांगा.',
      pickLanguage: 'सुरू करण्यासाठी भाषा निवडा',
      continueIn: 'सुरू ठेवा',
      changeLanguage: 'बदला',
      helpfulQuestion: 'हे उपयुक्त होते का?',
      quickReplies: ['डोकेदुखी आहे', 'त्वचेवर पुरळ'],
      errorFallback: 'काहीतरी चूक झाली. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.',
      listening: 'ऐकत आहे…',
    },
    ctaText: 'तुमची आरोग्य कथा सुरू करा',
    footer: { tagline: 'भारतासाठी बनवले.', disclaimer: 'हे व्यावसायिक वैद्यकीय सल्ल्याला पर्याय नाही.' },
  },
  gu: {
    heroWords: ['તમારું', 'સ્વાસ્થ્ય,', 'સમજાયું.'],
    heroSubtitle:
      'તમારી ભાષામાં પૂછો. તમારા લક્ષણો બોલો. પ્રિસ્ક્રિપ્શનનો ફોટો પાડો. G1 તરત જ તબીબી માહિતી તમારી ભાષામાં સમજાવે છે.',
    startConsultation: 'પરામર્શ શરૂ કરો',
    exploreFeatures: 'સુવિધાઓ જુઓ',
    consultG1: 'G1 સાથે વાત કરો',
    tapToExplore: 'સુવિધાઓ જોવા ટૅપ કરો',
    chooseLanguage: 'તમારી ભાષા પસંદ કરો',
    navItems: { 'Why G1': 'શા માટે G1', Features: 'સુવિધાઓ', India: 'ભારત', Trust: 'ભરોસો' },
    heroTiles: [
      { title: 'ત્વરિત ચેટ પરામર્શ', brief: '60 સેકન્ડમાં જવાબ' },
      { title: 'વૉઇસ અને રિપોર્ટ', brief: 'બોલો, અમે લખીશું' },
      { title: 'યોગ અને મુદ્રા', brief: 'રોજિંદુ માર્ગદર્શન' },
      { title: 'ઓફલાઇન કામ કરે છે', brief: 'સિગ્નલ ન હોય તો પણ વાંધો નહીં' },
    ],
    heroBadges: ['તમારી ભાષામાં પૂછો', 'ક્લિનિક જવાની જરૂર નથી'],
    voiceGrid: { eyebrow: 'ઇન્ટરેક્ટિવ ક્ષમતાઓ', heading: 'ઊંડાણમાં જાણો', headingAccent: 'G1 ને.' },
    testimonials: {
      eyebrow: 'સાચી વાર્તાઓ',
      heading: 'દરેક રાજ્યમાં',
      headingAccent: 'સંભળાયું.',
      subhead: 'વારાણસીની દાદીઓથી લઈને મુંબઈના ડોક્ટરો સુધી — G1 તમારી ભાષામાં વાત કરે છે.',
    },
    problems: {
      eyebrow: 'જુઓ',
      tabProblems: 'હરીફોની ખામીઓ',
      tabSolutions: 'G1 ઉકેલો',
      badgeSolutions: 'G1 જવાબો',
      heading: 'દરેક હેલ્થ એપ ક્યાં ભૂલ કરે છે.',
      subhead: 'હાલની એપ્સ અંગ્રેજી બોલતા, શહેરી, ટેક-જાણકાર વપરાશકર્તાઓ માટે બનેલી હતી. ProjectG1 બાકીના બધા માટે બનાવવામાં આવ્યું છે.',
      statsLabels: ['ઉપેક્ષિત ભારતીયો', 'બાકાત બોલીઓ', 'ગુમાવેલા રેકોર્ડ'],
      cards: [
        { title: 'રિપોર્ટ્સ નિર્જીવ PDF બની જાય છે', detail: 'સંગ્રહાય છે પણ સમય સાથે ક્યારેય જોડાતા કે સરખાવાતા નથી.' },
        { title: 'કોઈ લાંબા ગાળાની ટાઇમલાઇન નથી', detail: 'મહિનાઓ કે વર્ષોમાં તમારું સ્વાસ્થ્ય કેવી રીતે બદલાયું તે દેખાતું નથી.' },
        { title: 'ડેટા વચ્ચે કોઈ સંબંધ નથી', detail: 'દવાઓ, રિપોર્ટ્સ, લક્ષણો, ડોક્ટરો — બધું અલગ અલગ.' },
        { title: 'નબળી કટોકટી તૈયારી', detail: 'કટોકટીની માહિતી ઓફલાઇન તરત ઉપલબ્ધ નથી.' },
        { title: 'ડોક્ટર મુલાકાતની તૈયારી નથી', detail: 'દર્દીઓ પરામર્શ દરમિયાન પ્રશ્નો અને ઇતિહાસ ભૂલી જાય છે.' },
        { title: 'સંભાળ રાખનારાઓ માટે કોઈ વ્યવસ્થા નથી', detail: 'માતાપિતાની સંભાળ રાખતા બાળકો હજુ પણ WhatsApp કૉલ પર નિર્ભર છે.' },
      ],
      solutions: [
        { headline: 'ગ્રામીણ ભારત માટે બનાવેલ', sub: 'ધીમો ઇન્ટરનેટ, કોઈપણ ફોન, કોઈપણ ભાષા — G1 ત્યાં કામ કરે છે જ્યાં બીજા નથી કરતા.' },
        { headline: 'દરેક રિપોર્ટ જીવંત રહે છે', sub: 'એકવાર અપલોડ કરો, હંમેશા પૂછો. તમારો રેકોર્ડ સમય સાથે વધુ સ્માર્ટ બને છે.' },
        { headline: 'વિચારતી સ્વાસ્થ્ય ટાઇમલાઇન', sub: 'લક્ષણો, દવાઓ અને મુલાકાતો — મહિનાઓ અને વર્ષોમાં જોડાયેલા.' },
        { headline: 'તમારું આખું કુટુંબ, એક જ જગ્યાએ', sub: 'એપ બદલ્યા વગર માતાપિતા, બાળકો અને પોતાનું સ્વાસ્થ્ય સંભાળો.' },
        { headline: 'એક રેકોર્ડ, બધા ડોક્ટરો', sub: 'Practo થી Apollo અને સ્થાનિક ક્લિનિક સુધી — G1 બધું એકસાથે લાવે છે.' },
        { headline: 'ઇન્ટરનેટ વગર પણ કામ કરે છે', sub: 'બ્લડ ગ્રુપ, એલર્જી, દવાઓ — હંમેશા ઉપલબ્ધ, ઓફલાઇન પણ.' },
      ],
    },
    india: {
      eyebrow: 'પ્રાદેશિક પહોંચ',
      heading: 'કોઈ ઘર પાછળ નહીં રહે.',
      cardLine1: 'ભારતનો',
      cardLine2: 'દરેક ખૂણો.',
      cardBody:
        'મોટાભાગની હેલ્થ એપ્સ જે અર્ધ-શહેરી અને ગ્રામીણ પરિવારોને અવગણે છે, તેમના માટે જ આ બનાવવામાં આવ્યું છે. ધીમો ઇન્ટરનેટ, સાદા ફોન, અંગ્રેજી ન આવડવું — આ બધું પહેલા દિવસથી ધારી લેવાયું છે.',
      askIn: 'G1 ને પૂછો',
      statsLabels: ['ભાષાઓ અને બોલીઓ', 'ધીમા નેટવર્ક પર પણ ચાલે છે', 'રાજ્યો, એક સાથી'],
    },
    cityGrid: {
      hubLabel: 'પ્રોજેક્ટ',
      features: [
        '20+ બોલીઓમાં ચેટ',
        'દરરોજ ડોક્ટર રિપોર્ટ્સ',
        'ઇમેજ સ્કેન સક્રિય',
        'યોગ કોચિંગ લાઇવ',
        'વૉઇસ પરામર્શ વધી રહ્યા છે',
        'ઓફલાઇન રેકોર્ડ ઉપયોગમાં',
        'ડોક્ટરોને રિપોર્ટ મોકલાયા',
        '2G પર કામ કરે છે',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 શું કરે છે',
      scrollHint: 'સુવિધાઓ જોવા સ્ક્રોલ કરો',
      featureWord: 'ફીચર',
      closingTitle: 'વધુ ટૂંક સમયમાં આવી રહ્યું છે.',
      closingCta: 'Voice AI જુઓ ↓',
      cards: [
        { tag: 'ભાષા', title: 'ચેટ', sub: 'તમારી ભાષામાં, તમારી બોલીમાં', body: 'હિન્દી, ભોજપુરી, તમિલ, હિંગ્લિશ — તમે જે ભાષામાં વિચારો છો તેમાં G1ને કંઈ પણ પૂછો. નીચે જમણા ખૂણેથી વિસ્તરે છે.' },
        { tag: 'પરામર્શ', title: 'વૉઇસ', sub: 'બોલો — ડોક્ટર રિપોર્ટ મેળવો', body: 'તમારા લક્ષણો મોટેથી બોલો. G1 10 તબીબી પ્રશ્નો પૂછે છે, એક સંરચિત રિપોર્ટ બનાવે છે, અને તેને તમારા ડોક્ટરને મોકલે છે.' },
        { tag: 'વિઝ્યુઅલ AI', title: 'સ્કેન', sub: 'તમારા લક્ષણોનો ફોટો લો', body: 'ફોલ્લી, દાઝવું, વાળની સમસ્યાનો ફોટો લો અથવા X-રે અપલોડ કરો. G1 તેને વાંચે છે અને ધ્યાન આપવા જેવું શું છે તે જણાવે છે.' },
        { tag: 'હલનચલન', title: 'યોગ', sub: 'રીયલ-ટાઇમ મુદ્રા માર્ગદર્શન', body: 'તમારા કેમેરા સામે એક મુદ્રા પકડી રાખો. G1 રીયલ ટાઇમમાં તમારું સ્વરૂપ જુએ છે અને આગળ ક્યારે જવું તે કહે છે.' },
        { tag: 'ઍક્સેસ', title: 'ઓફલાઇન', sub: 'ઇન્ટરનેટ વગર કામ કરે છે', body: 'બ્લડ ગ્રુપ, એલર્જી, ચાલુ દવાઓ — સિગ્નલ ન હોય તો પણ, કોઈપણ ફોન પર તરત ઉપલબ્ધ.' },
        { tag: 'રેકોર્ડ', title: 'મેમરી', sub: 'તમારું સ્વાસ્થ્ય, યાદ રખાયેલું', body: 'દરેક રિપોર્ટ, લક્ષણ, દવા અને ડોક્ટર મુલાકાત — સમય સાથે જોડાયેલા જેથી દરેક મુલાકાતે તમારી સંપૂર્ણ કથા તૈયાર હોય.' },
      ],
    },
    trust: {
      line1: 'ભરોસો, શરૂઆતથી જ —',
      line2: 'પછીથી જોડેલો નહીં.',
      caption: 'ફોલ્ડર્સને ખેંચો, અથવા એક પર ક્લિક કરો.',
      folders: [
        { title: 'ગોપનીયતા', sub: 'તમારો ડેટા તમારો જ રહે છે', rows: ['એન્ક્રિપ્ટેડ આરોગ્ય રેકોર્ડ', 'ક્યારેય વેચાતું નથી', 'દરેક શેર પર તમારું નિયંત્રણ', 'ગમે ત્યારે ડિલીટ કરો'] },
        { title: 'પ્રામાણિકતા', sub: 'દરેક જવાબ, સમજાવેલો', rows: ['તર્ક છુપાવ્યા વગર બતાવાય છે', 'ચકાસી શકાય તેવા સ્ત્રોત', 'સ્પષ્ટ "ડોક્ટરને મળો" સંકેતો', 'તબીબી માર્ગદર્શન મુજબ સમીક્ષિત'] },
        { title: 'તૈયારી', sub: 'કટોકટીમાં સાથે', rows: ['બ્લડ ગ્રુપ અને એલર્જી ઓફલાઇન', 'દવાઓની યાદી ઓફલાઇન', 'સિગ્નલ વગર પણ કામ કરે છે', 'વન-ટેપ ઇમરજન્સી કાર્ડ'] },
      ],
    },
    chatbot: {
      title: 'G1 સહાયક',
      subtitle: 'તમારી ભાષામાં લક્ષણો વિશે પૂછો',
      placeholder: 'તમારો સંદેશ ટાઇપ કરો…',
      greeting: 'નમસ્તે, હું G1 છું. તમને શું તકલીફ છે તે કોઈપણ ભાષામાં કહો.',
      pickLanguage: 'શરૂ કરવા માટે ભાષા પસંદ કરો',
      continueIn: 'ચાલુ રાખો',
      changeLanguage: 'બદલો',
      helpfulQuestion: 'શું આ મદદરૂપ હતું?',
      quickReplies: ['માથાનો દુખાવો છે', 'ત્વચા પર ફોલ્લીઓ'],
      errorFallback: 'કંઈક ખોટું થયું. કૃપા કરીને થોડી વાર પછી ફરી પ્રયાસ કરો.',
      listening: 'સાંભળી રહ્યા છીએ…',
    },
    ctaText: 'તમારી સ્વાસ્થ્ય કથા શરૂ કરો',
    footer: { tagline: 'ભારત માટે બનાવેલ.', disclaimer: 'આ વ્યાવસાયિક તબીબી સલાહનો વિકલ્પ નથી.' },
  },
  kn: {
    heroWords: ['ನಿಮ್ಮ', 'ಆರೋಗ್ಯ,', 'ಅರ್ಥವಾಯಿತು.'],
    heroSubtitle:
      'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ. ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಮಾತನಾಡಿ. ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಫೋಟೋ ತೆಗೆಯಿರಿ. G1 ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸುತ್ತದೆ.',
    startConsultation: 'ಸಮಾಲೋಚನೆ ಪ್ರಾರಂಭಿಸಿ',
    exploreFeatures: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಿ',
    consultG1: 'G1 ಜೊತೆ ಮಾತನಾಡಿ',
    tapToExplore: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
    navItems: { 'Why G1': 'ಏಕೆ G1', Features: 'ವೈಶಿಷ್ಟ್ಯಗಳು', India: 'ಭಾರತ', Trust: 'ನಂಬಿಕೆ' },
    heroTiles: [
      { title: 'ತಕ್ಷಣ ಚಾಟ್ ಸಮಾಲೋಚನೆ', brief: '60 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಉತ್ತರ' },
      { title: 'ಧ್ವನಿ ಮತ್ತು ವರದಿಗಳು', brief: 'ಮಾತನಾಡಿ, ನಾವು ಬರೆಯುತ್ತೇವೆ' },
      { title: 'ಯೋಗ ಮತ್ತು ಭಂಗಿ', brief: 'ದೈನಂದಿನ ಮಾರ್ಗದರ್ಶನ' },
      { title: 'ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ', brief: 'ಸಿಗ್ನಲ್ ಇಲ್ಲದಿದ್ದರೂ ಸಮಸ್ಯೆ ಇಲ್ಲ' },
    ],
    heroBadges: ['ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ', 'ಕ್ಲಿನಿಕ್‌ಗೆ ಹೋಗುವ ಅಗತ್ಯವಿಲ್ಲ'],
    voiceGrid: { eyebrow: 'ಸಂವಾದಾತ್ಮಕ ಸಾಮರ್ಥ್ಯಗಳು', heading: 'ಆಳವಾಗಿ ತಿಳಿಯಿರಿ', headingAccent: 'G1 ಅನ್ನು.' },
    testimonials: {
      eyebrow: 'ನಿಜ ಕಥೆಗಳು',
      heading: 'ಪ್ರತಿ ರಾಜ್ಯದಲ್ಲಿ',
      headingAccent: 'ಕೇಳಿಬಂದಿದೆ.',
      subhead: 'ವಾರಣಾಸಿಯ ಅಜ್ಜಿಯಂದಿರಿಂದ ಮುಂಬೈನ ವೈದ್ಯರವರೆಗೆ — G1 ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡುತ್ತದೆ.',
    },
    problems: {
      eyebrow: 'ನೋಡಿ',
      tabProblems: 'ಪ್ರತಿಸ್ಪರ್ಧಿಗಳ ಕೊರತೆಗಳು',
      tabSolutions: 'G1 ಪರಿಹಾರಗಳು',
      badgeSolutions: 'G1 ಉತ್ತರಗಳು',
      heading: 'ಪ್ರತಿ ಆರೋಗ್ಯ ಆ್ಯಪ್ ಎಲ್ಲಿ ತಪ್ಪುತ್ತದೆ.',
      subhead: 'ಇರುವ ಆ್ಯಪ್‌ಗಳು ಇಂಗ್ಲಿಷ್ ಮಾತನಾಡುವ, ನಗರ, ತಂತ್ರಜ್ಞಾನ-ಪರಿಣತ ಬಳಕೆದಾರರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿತ್ತು. ProjectG1 ಉಳಿದೆಲ್ಲರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
      statsLabels: ['ನಿರ್ಲಕ್ಷಿತ ಭಾರತೀಯರು', 'ಹೊರಗಿಡಲಾದ ಉಪಭಾಷೆಗಳು', 'ಕಳೆದುಹೋದ ದಾಖಲೆಗಳು'],
      cards: [
        { title: 'ವರದಿಗಳು ನಿರ್ಜೀವ PDF ಆಗುತ್ತವೆ', detail: 'ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ ಆದರೆ ಕಾಲಾನಂತರ ಎಂದಿಗೂ ಸಂಪರ್ಕಿಸಲಾಗುವುದಿಲ್ಲ ಅಥವಾ ಹೋಲಿಸಲಾಗುವುದಿಲ್ಲ.' },
        { title: 'ದೀರ್ಘಕಾಲೀನ ಕಾಲಾನುಕ್ರಮ ಇಲ್ಲ', detail: 'ತಿಂಗಳುಗಳು ಅಥವಾ ವರ್ಷಗಳಲ್ಲಿ ನಿಮ್ಮ ಆರೋಗ್ಯ ಹೇಗೆ ಬದಲಾಯಿತು ಎಂದು ಕಾಣುವುದಿಲ್ಲ.' },
        { title: 'ದತ್ತಾಂಶಗಳ ನಡುವೆ ಸಂಬಂಧ ಇಲ್ಲ', detail: 'ಔಷಧಗಳು, ವರದಿಗಳು, ಲಕ್ಷಣಗಳು, ವೈದ್ಯರು — ಎಲ್ಲವೂ ಪ್ರತ್ಯೇಕ.' },
        { title: 'ದುರ್ಬಲ ತುರ್ತು ಸನ್ನದ್ಧತೆ', detail: 'ತುರ್ತು ಮಾಹಿತಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ತಕ್ಷಣ ಲಭ್ಯವಿಲ್ಲ.' },
        { title: 'ವೈದ್ಯರ ಭೇಟಿಗೆ ಸಿದ್ಧತೆ ಇಲ್ಲ', detail: 'ಸಮಾಲೋಚನೆಯ ಸಮಯದಲ್ಲಿ ರೋಗಿಗಳು ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಇತಿಹಾಸವನ್ನು ಮರೆಯುತ್ತಾರೆ.' },
        { title: 'ಆರೈಕೆದಾರರಿಗೆ ಯಾವುದೇ ವರ್ಕ್‌ಫ್ಲೋ ಇಲ್ಲ', detail: 'ಪೋಷಕರನ್ನು ನೋಡಿಕೊಳ್ಳುವ ಮಕ್ಕಳು ಇನ್ನೂ WhatsApp ಕರೆಗಳನ್ನು ಅವಲಂಬಿಸಿದ್ದಾರೆ.' },
      ],
      solutions: [
        { headline: 'ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ', sub: 'ಕಡಿಮೆ ವೇಗದ ಇಂಟರ್ನೆಟ್, ಯಾವುದೇ ಫೋನ್, ಯಾವುದೇ ಭಾಷೆ — ಇತರರು ಕೆಲಸ ಮಾಡದ ಕಡೆ G1 ಕೆಲಸ ಮಾಡುತ್ತದೆ.' },
        { headline: 'ಪ್ರತಿ ವರದಿ ಜೀವಂತವಾಗಿರುತ್ತದೆ', sub: 'ಒಮ್ಮೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ಶಾಶ್ವತವಾಗಿ ಕೇಳಿ. ನಿಮ್ಮ ದಾಖಲೆಗಳು ಕಾಲಾನಂತರ ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಬೆಳೆಯುತ್ತವೆ.' },
        { headline: 'ಯೋಚಿಸುವ ಆರೋಗ್ಯ ಕಾಲಾನುಕ್ರಮ', sub: 'ಲಕ್ಷಣಗಳು, ಔಷಧಗಳು ಮತ್ತು ಭೇಟಿಗಳು — ತಿಂಗಳುಗಳು ಮತ್ತು ವರ್ಷಗಳಾದ್ಯಂತ ಸಂಪರ್ಕಿಸಲಾಗಿದೆ.' },
        { headline: 'ನಿಮ್ಮ ಇಡೀ ಕುಟುಂಬ, ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ', sub: 'ಆ್ಯಪ್‌ಗಳನ್ನು ಬದಲಾಯಿಸದೆ ಪೋಷಕರು, ಮಕ್ಕಳು ಮತ್ತು ನಿಮ್ಮ ಆರೋಗ್ಯವನ್ನು ನಿರ್ವಹಿಸಿ.' },
        { headline: 'ಒಂದು ದಾಖಲೆ, ಎಲ್ಲಾ ವೈದ್ಯರು', sub: 'Practo ನಿಂದ Apollo ಮತ್ತು ಸ್ಥಳೀಯ ಚಿಕಿತ್ಸಾಲಯದವರೆಗೆ — G1 ಎಲ್ಲವನ್ನೂ ಒಗ್ಗೂಡಿಸುತ್ತದೆ.' },
        { headline: 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆಯೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ', sub: 'ರಕ್ತದ ಗುಂಪು, ಅಲರ್ಜಿಗಳು, ಔಷಧಗಳು — ಯಾವಾಗಲೂ ಲಭ್ಯ, ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿಯೂ.' },
      ],
    },
    india: {
      eyebrow: 'ಪ್ರಾದೇಶಿಕ ಪ್ರವೇಶ',
      heading: 'ಯಾವುದೇ ಮನೆ ಹಿಂದೆ ಉಳಿಯುವುದಿಲ್ಲ.',
      cardLine1: 'ಭಾರತದ',
      cardLine2: 'ಪ್ರತಿ ಮೂಲೆ.',
      cardBody:
        'ಹೆಚ್ಚಿನ ಆರೋಗ್ಯ ಆ್ಯಪ್‌ಗಳು ನಿರ್ಲಕ್ಷಿಸುವ ಅರೆ-ನಗರ ಮತ್ತು ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳಿಗಾಗಿ ಇದನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ. ಕಡಿಮೆ ವೇಗದ ಇಂಟರ್ನೆಟ್, ಸಾಮಾನ್ಯ ಫೋನ್‌ಗಳು, ಇಂಗ್ಲಿಷ್ ಗೊತ್ತಿಲ್ಲದಿರುವುದು — ಇವೆಲ್ಲವನ್ನೂ ಮೊದಲ ದಿನದಿಂದಲೇ ಪರಿಗಣಿಸಲಾಗಿದೆ.',
      askIn: 'G1 ಅನ್ನು ಕೇಳಿ',
      statsLabels: ['ಭಾಷೆಗಳು ಮತ್ತು ಉಪಭಾಷೆಗಳು', 'ನಿಧಾನ ನೆಟ್‌ವರ್ಕ್‌ಗಳಲ್ಲಿಯೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ', 'ರಾಜ್ಯಗಳು, ಒಂದೇ ಸಂಗಾತಿ'],
    },
    cityGrid: {
      hubLabel: 'ಪ್ರಾಜೆಕ್ಟ್',
      features: [
        '20+ ಉಪಭಾಷೆಗಳಲ್ಲಿ ಚಾಟ್',
        'ಪ್ರತಿದಿನ ವೈದ್ಯರ ವರದಿಗಳು',
        'ಇಮೇಜ್ ಸ್ಕ್ಯಾನ್ ಸಕ್ರಿಯ',
        'ಯೋಗ ಕೋಚಿಂಗ್ ಲೈವ್',
        'ಧ್ವನಿ ಸಮಾಲೋಚನೆಗಳು ಹೆಚ್ಚುತ್ತಿವೆ',
        'ಆಫ್‌ಲೈನ್ ದಾಖಲೆಗಳು ಬಳಕೆಯಲ್ಲಿ',
        'ವೈದ್ಯರಿಗೆ ವರದಿಗಳು ಕಳುಹಿಸಲಾಗಿದೆ',
        '2G ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 ಏನು ಮಾಡುತ್ತದೆ',
      scrollHint: 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನೋಡಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
      featureWord: 'ವೈಶಿಷ್ಟ್ಯ',
      closingTitle: 'ಇನ್ನಷ್ಟು ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ.',
      closingCta: 'Voice AI ನೋಡಿ ↓',
      cards: [
        { tag: 'ಭಾಷೆ', title: 'ಚಾಟ್', sub: 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ, ನಿಮ್ಮ ಉಪಭಾಷೆಯಲ್ಲಿ', body: 'ಹಿಂದಿ, ಭೋಜ್‌ಪುರಿ, ತಮಿಳು, ಹಿಂಗ್ಲಿಷ್ — ನೀವು ಯೋಚಿಸುವ ಭಾಷೆಯಲ್ಲಿ G1 ಅನ್ನು ಏನಾದರೂ ಕೇಳಿ. ಕೆಳ ಬಲ ಮೂಲೆಯಿಂದ ವಿಸ್ತರಿಸುತ್ತದೆ.' },
        { tag: 'ಸಮಾಲೋಚನೆ', title: 'ಧ್ವನಿ', sub: 'ಮಾತನಾಡಿ — ವೈದ್ಯರ ವರದಿ ಪಡೆಯಿರಿ', body: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಗಟ್ಟಿಯಾಗಿ ಹೇಳಿ. G1 10 ಕ್ಲಿನಿಕಲ್ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ, ರಚನಾತ್ಮಕ ವರದಿಯನ್ನು ರಚಿಸಿ, ಅದನ್ನು ನಿಮ್ಮ ವೈದ್ಯರಿಗೆ ಕಳುಹಿಸುತ್ತದೆ.' },
        { tag: 'ವಿಷುಯಲ್ AI', title: 'ಸ್ಕ್ಯಾನ್', sub: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಫೋಟೋ ತೆಗೆಯಿರಿ', body: 'ದದ್ದು, ಸುಟ್ಟಗಾಯ, ಕೂದಲಿನ ಸಮಸ್ಯೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ X-ರೇ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. G1 ಅದನ್ನು ಓದಿ ಗಮನ ಬೇಕಾದುದನ್ನು ಸೂಚಿಸುತ್ತದೆ.' },
        { tag: 'ಚಲನೆ', title: 'ಯೋಗ', sub: 'ರಿಯಲ್-ಟೈಮ್ ಭಂಗಿ ಮಾರ್ಗದರ್ಶನ', body: 'ನಿಮ್ಮ ಕ್ಯಾಮೆರಾ ಮುಂದೆ ಒಂದು ಭಂಗಿಯನ್ನು ಹಿಡಿದುಕೊಳ್ಳಿ. G1 ರಿಯಲ್ ಟೈಮ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಭಂಗಿಯನ್ನು ನೋಡಿ ಮುಂದಿನದಕ್ಕೆ ಯಾವಾಗ ಹೋಗಬೇಕೆಂದು ಹೇಳುತ್ತದೆ.' },
        { tag: 'ಪ್ರವೇಶ', title: 'ಆಫ್‌ಲೈನ್', sub: 'ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ', body: 'ರಕ್ತದ ಗುಂಪು, ಅಲರ್ಜಿಗಳು, ಪ್ರಸ್ತುತ ಔಷಧಗಳು — ಸಿಗ್ನಲ್ ಇಲ್ಲದಿದ್ದರೂ, ಯಾವುದೇ ಫೋನ್‌ನಲ್ಲಿ ತಕ್ಷಣ ಲಭ್ಯ.' },
        { tag: 'ದಾಖಲೆ', title: 'ಸ್ಮರಣೆ', sub: 'ನಿಮ್ಮ ಆರೋಗ್ಯ, ನೆನಪಿಡಲ್ಪಟ್ಟಿದೆ', body: 'ಪ್ರತಿ ವರದಿ, ಲಕ್ಷಣ, ಔಷಧ ಮತ್ತು ವೈದ್ಯರ ಭೇಟಿ — ಕಾಲಾನಂತರ ಸಂಪರ್ಕಿಸಲಾಗಿದ್ದು ಪ್ರತಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಪೂರ್ಣ ಕಥೆ ಸಿದ್ಧವಾಗಿರುತ್ತದೆ.' },
      ],
    },
    trust: {
      line1: 'ನಂಬಿಕೆ, ಮೊದಲಿನಿಂದಲೇ —',
      line2: 'ನಂತರ ಸೇರಿಸಿದ್ದಲ್ಲ.',
      caption: 'ಫೋಲ್ಡರ್‌ಗಳನ್ನು ಎಳೆಯಿರಿ, ಅಥವಾ ಒಂದನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.',
      folders: [
        { title: 'ಗೌಪ್ಯತೆ', sub: 'ನಿಮ್ಮ ಡೇಟಾ ನಿಮ್ಮದೇ ಆಗಿ ಉಳಿಯುತ್ತದೆ', rows: ['ಎನ್‌ಕ್ರಿಪ್ಟೆಡ್ ಆರೋಗ್ಯ ದಾಖಲೆಗಳು', 'ಎಂದಿಗೂ ಮಾರಾಟವಾಗುವುದಿಲ್ಲ', 'ಪ್ರತಿ ಶೇರ್‌ನಲ್ಲಿ ನಿಮ್ಮ ನಿಯಂತ್ರಣ', 'ಯಾವಾಗ ಬೇಕಾದರೂ ಅಳಿಸಿ'] },
        { title: 'ಪ್ರಾಮಾಣಿಕತೆ', sub: 'ಪ್ರತಿ ಉತ್ತರ, ವಿವರಿಸಲಾಗಿದೆ', rows: ['ತರ್ಕ ಮರೆಮಾಡದೆ ತೋರಿಸಲಾಗಿದೆ', 'ನೀವು ಪರಿಶೀಲಿಸಬಹುದಾದ ಮೂಲಗಳು', 'ಸ್ಪಷ್ಟ "ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ" ಸೂಚನೆಗಳು', 'ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನದ ಪ್ರಕಾರ ಪರಿಶೀಲಿಸಲಾಗಿದೆ'] },
        { title: 'ಸನ್ನದ್ಧತೆ', sub: 'ತುರ್ತು ಸಮಯದಲ್ಲಿ ಜೊತೆಗೆ', rows: ['ರಕ್ತದ ಗುಂಪು ಮತ್ತು ಅಲರ್ಜಿಗಳು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ', 'ಔಷಧಗಳ ಪಟ್ಟಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ', 'ಸಿಗ್ನಲ್ ಇಲ್ಲದಿದ್ದರೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ', 'ಒಂದು-ಟ್ಯಾಪ್ ತುರ್ತು ಕಾರ್ಡ್'] },
      ],
    },
    chatbot: {
      title: 'G1 ಸಹಾಯಕ',
      subtitle: 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಲಕ್ಷಣಗಳ ಬಗ್ಗೆ ಕೇಳಿ',
      placeholder: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ…',
      greeting: 'ನಮಸ್ಕಾರ, ನಾನು G1. ನಿಮಗೆ ಏನು ತೊಂದರೆ ಎಂದು ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಹೇಳಿ.',
      pickLanguage: 'ಪ್ರಾರಂಭಿಸಲು ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      continueIn: 'ಮುಂದುವರಿಸಿ',
      changeLanguage: 'ಬದಲಾಯಿಸಿ',
      helpfulQuestion: 'ಇದು ಸಹಾಯಕವಾಗಿತ್ತೇ?',
      quickReplies: ['ತಲೆನೋವು ಇದೆ', 'ಚರ್ಮದ ಮೇಲೆ ದದ್ದು'],
      errorFallback: 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      listening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ…',
    },
    ctaText: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಕಥೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    footer: { tagline: 'ಭಾರತಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.', disclaimer: 'ಇದು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.' },
  },
  pa: {
    heroWords: ['ਤੁਹਾਡੀ', 'ਸਿਹਤ,', 'ਸਮਝ ਗਈ।'],
    heroSubtitle:
      'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ। ਆਪਣੇ ਲੱਛਣ ਬੋਲੋ। ਨੁਸਖੇ ਦੀ ਫੋਟੋ ਖਿੱਚੋ। G1 ਤੁਰੰਤ ਡਾਕਟਰੀ ਜਾਣਕਾਰੀ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਉਂਦਾ ਹੈ।',
    startConsultation: 'ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ',
    exploreFeatures: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵੇਖੋ',
    consultG1: 'G1 ਨਾਲ ਗੱਲ ਕਰੋ',
    tapToExplore: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵੇਖਣ ਲਈ ਟੈਪ ਕਰੋ',
    chooseLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
    navItems: { 'Why G1': 'ਕਿਉਂ G1', Features: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ', India: 'ਭਾਰਤ', Trust: 'ਭਰੋਸਾ' },
    heroTiles: [
      { title: 'ਤੁਰੰਤ ਚੈਟ ਸਲਾਹ', brief: '60 ਸਕਿੰਟਾਂ ਵਿੱਚ ਜਵਾਬ' },
      { title: 'ਆਵਾਜ਼ ਅਤੇ ਰਿਪੋਰਟਾਂ', brief: 'ਬੋਲੋ, ਅਸੀਂ ਲਿਖਾਂਗੇ' },
      { title: 'ਯੋਗ ਅਤੇ ਮੁਦਰਾ', brief: 'ਰੋਜ਼ਾਨਾ ਮਾਰਗਦਰਸ਼ਨ' },
      { title: 'ਆਫਲਾਈਨ ਕੰਮ ਕਰਦਾ ਹੈ', brief: 'ਸਿਗਨਲ ਨਾ ਹੋਵੇ ਤਾਂ ਵੀ ਕੋਈ ਸਮੱਸਿਆ ਨਹੀਂ' },
    ],
    heroBadges: ['ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ', 'ਕਲੀਨਿਕ ਜਾਣ ਦੀ ਲੋੜ ਨਹੀਂ'],
    voiceGrid: { eyebrow: 'ਇੰਟਰਐਕਟਿਵ ਸਮਰੱਥਾਵਾਂ', heading: 'ਡੂੰਘਾਈ ਨਾਲ ਜਾਣੋ', headingAccent: 'G1 ਨੂੰ.' },
    testimonials: {
      eyebrow: 'ਸੱਚੀਆਂ ਕਹਾਣੀਆਂ',
      heading: 'ਹਰ ਰਾਜ ਵਿੱਚ',
      headingAccent: 'ਸੁਣੀਆਂ ਗਈਆਂ।',
      subhead: 'ਵਾਰਾਣਸੀ ਦੀਆਂ ਦਾਦੀਆਂ ਤੋਂ ਲੈ ਕੇ ਮੁੰਬਈ ਦੇ ਡਾਕਟਰਾਂ ਤੱਕ — G1 ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਬੋਲਦਾ ਹੈ।',
    },
    problems: {
      eyebrow: 'ਵੇਖੋ',
      tabProblems: 'ਮੁਕਾਬਲੇਬਾਜ਼ਾਂ ਦੀਆਂ ਕਮੀਆਂ',
      tabSolutions: 'G1 ਦੇ ਹੱਲ',
      badgeSolutions: 'G1 ਦੇ ਜਵਾਬ',
      heading: 'ਹਰ ਹੈਲਥ ਐਪ ਕਿੱਥੇ ਗ਼ਲਤ ਹੁੰਦਾ ਹੈ।',
      subhead: 'ਮੌਜੂਦਾ ਐਪਸ ਅੰਗਰੇਜ਼ੀ ਬੋਲਣ ਵਾਲੇ, ਸ਼ਹਿਰੀ, ਤਕਨੀਕ-ਜਾਣੂ ਵਰਤੋਂਕਾਰਾਂ ਲਈ ਬਣੇ ਸਨ। ProjectG1 ਬਾਕੀ ਸਾਰਿਆਂ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ।',
      statsLabels: ['ਅਣਗੌਲੇ ਭਾਰਤੀ', 'ਛੱਡੀਆਂ ਗਈਆਂ ਬੋਲੀਆਂ', 'ਗੁਆਚੇ ਰਿਕਾਰਡ'],
      cards: [
        { title: 'ਰਿਪੋਰਟਾਂ ਮਰੀਆਂ ਹੋਈਆਂ PDF ਬਣ ਜਾਂਦੀਆਂ ਹਨ', detail: 'ਸਟੋਰ ਹੁੰਦੀਆਂ ਹਨ ਪਰ ਸਮੇਂ ਨਾਲ ਕਦੇ ਜੁੜਦੀਆਂ ਜਾਂ ਤੁਲਨਾ ਨਹੀਂ ਹੁੰਦੀਆਂ।' },
        { title: 'ਕੋਈ ਲੰਬੇ ਸਮੇਂ ਦੀ ਟਾਈਮਲਾਈਨ ਨਹੀਂ', detail: 'ਮਹੀਨਿਆਂ ਜਾਂ ਸਾਲਾਂ ਵਿੱਚ ਤੁਹਾਡੀ ਸਿਹਤ ਕਿਵੇਂ ਬਦਲੀ ਇਹ ਨਹੀਂ ਦਿਸਦਾ।' },
        { title: 'ਡੇਟਾ ਵਿਚਕਾਰ ਕੋਈ ਸੰਬੰਧ ਨਹੀਂ', detail: 'ਦਵਾਈਆਂ, ਰਿਪੋਰਟਾਂ, ਲੱਛਣ, ਡਾਕਟਰ — ਸਭ ਵੱਖ-ਵੱਖ।' },
        { title: 'ਕਮਜ਼ੋਰ ਐਮਰਜੈਂਸੀ ਤਿਆਰੀ', detail: 'ਐਮਰਜੈਂਸੀ ਜਾਣਕਾਰੀ ਆਫਲਾਈਨ ਤੁਰੰਤ ਉਪਲਬਧ ਨਹੀਂ ਹੁੰਦੀ।' },
        { title: 'ਡਾਕਟਰ ਮੁਲਾਕਾਤ ਦੀ ਤਿਆਰੀ ਨਹੀਂ', detail: 'ਮਰੀਜ਼ ਸਲਾਹ ਦੌਰਾਨ ਸਵਾਲ ਅਤੇ ਇਤਿਹਾਸ ਭੁੱਲ ਜਾਂਦੇ ਹਨ।' },
        { title: 'ਦੇਖਭਾਲ ਕਰਨ ਵਾਲਿਆਂ ਲਈ ਕੋਈ ਤਰੀਕਾ ਨਹੀਂ', detail: 'ਮਾਪਿਆਂ ਦੀ ਦੇਖਭਾਲ ਕਰਨ ਵਾਲੇ ਬੱਚੇ ਅਜੇ ਵੀ WhatsApp ਕਾਲਾਂ ਤੇ ਨਿਰਭਰ ਹਨ।' },
      ],
      solutions: [
        { headline: 'ਪੇਂਡੂ ਭਾਰਤ ਲਈ ਬਣਾਇਆ ਗਿਆ', sub: 'ਹੌਲੀ ਇੰਟਰਨੈੱਟ, ਕੋਈ ਵੀ ਫੋਨ, ਕੋਈ ਵੀ ਭਾਸ਼ਾ — G1 ਉੱਥੇ ਕੰਮ ਕਰਦਾ ਹੈ ਜਿੱਥੇ ਹੋਰ ਨਹੀਂ ਕਰਦੇ।' },
        { headline: 'ਹਰ ਰਿਪੋਰਟ ਜਿਉਂਦੀ ਰਹਿੰਦੀ ਹੈ', sub: 'ਇੱਕ ਵਾਰ ਅੱਪਲੋਡ ਕਰੋ, ਹਮੇਸ਼ਾ ਪੁੱਛੋ। ਤੁਹਾਡਾ ਰਿਕਾਰਡ ਸਮੇਂ ਨਾਲ ਹੋਰ ਸਮਝਦਾਰ ਬਣਦਾ ਹੈ।' },
        { headline: 'ਸੋਚਣ ਵਾਲੀ ਸਿਹਤ ਟਾਈਮਲਾਈਨ', sub: 'ਲੱਛਣ, ਦਵਾਈਆਂ ਅਤੇ ਮੁਲਾਕਾਤਾਂ — ਮਹੀਨਿਆਂ ਅਤੇ ਸਾਲਾਂ ਵਿੱਚ ਜੁੜੀਆਂ।' },
        { headline: 'ਤੁਹਾਡਾ ਪੂਰਾ ਪਰਿਵਾਰ, ਇੱਕੋ ਥਾਂ', sub: 'ਐਪ ਬਦਲੇ ਬਿਨਾਂ ਮਾਪਿਆਂ, ਬੱਚਿਆਂ ਅਤੇ ਆਪਣੀ ਸਿਹਤ ਦਾ ਧਿਆਨ ਰੱਖੋ।' },
        { headline: 'ਇੱਕ ਰਿਕਾਰਡ, ਸਾਰੇ ਡਾਕਟਰ', sub: 'Practo ਤੋਂ Apollo ਅਤੇ ਸਥਾਨਕ ਕਲੀਨਿਕ ਤੱਕ — G1 ਸਭ ਨੂੰ ਜੋੜਦਾ ਹੈ।' },
        { headline: 'ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਵੀ ਕੰਮ ਕਰਦਾ ਹੈ', sub: 'ਬਲੱਡ ਗਰੁੱਪ, ਐਲਰਜੀ, ਦਵਾਈਆਂ — ਹਮੇਸ਼ਾ ਉਪਲਬਧ, ਆਫਲਾਈਨ ਵੀ।' },
      ],
    },
    india: {
      eyebrow: 'ਖੇਤਰੀ ਪਹੁੰਚ',
      heading: 'ਕੋਈ ਵੀ ਘਰ ਪਿੱਛੇ ਨਹੀਂ ਰਹੇਗਾ।',
      cardLine1: 'ਭਾਰਤ ਦਾ',
      cardLine2: 'ਹਰ ਕੋਨਾ।',
      cardBody:
        'ਬਹੁਤੇ ਹੈਲਥ ਐਪਸ ਜਿਨ੍ਹਾਂ ਅਰਧ-ਸ਼ਹਿਰੀ ਅਤੇ ਪੇਂਡੂ ਪਰਿਵਾਰਾਂ ਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕਰਦੇ ਹਨ, ਇਹ ਉਹਨਾਂ ਲਈ ਹੀ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਹੌਲੀ ਇੰਟਰਨੈੱਟ, ਸਧਾਰਨ ਫੋਨ, ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਨਾ ਆਉਣੀ — ਇਹ ਸਭ ਪਹਿਲੇ ਦਿਨ ਤੋਂ ਮੰਨ ਲਿਆ ਗਿਆ ਹੈ।',
      askIn: 'G1 ਨੂੰ ਪੁੱਛੋ',
      statsLabels: ['ਭਾਸ਼ਾਵਾਂ ਅਤੇ ਬੋਲੀਆਂ', 'ਹੌਲੀ ਨੈੱਟਵਰਕਾਂ ਤੇ ਵੀ ਚੱਲਦਾ ਹੈ', 'ਰਾਜ, ਇੱਕ ਸਾਥੀ'],
    },
    cityGrid: {
      hubLabel: 'ਪ੍ਰੋਜੈਕਟ',
      features: [
        '20+ ਬੋਲੀਆਂ ਵਿੱਚ ਚੈਟ',
        'ਰੋਜ਼ਾਨਾ ਡਾਕਟਰ ਰਿਪੋਰਟਾਂ',
        'ਇਮੇਜ ਸਕੈਨ ਸਰਗਰਮ',
        'ਯੋਗ ਕੋਚਿੰਗ ਲਾਈਵ',
        'ਵੌਇਸ ਸਲਾਹ ਵਧ ਰਹੀ ਹੈ',
        'ਆਫਲਾਈਨ ਰਿਕਾਰਡ ਵਰਤੋਂ ਵਿੱਚ',
        'ਡਾਕਟਰਾਂ ਨੂੰ ਰਿਪੋਰਟਾਂ ਭੇਜੀਆਂ ਗਈਆਂ',
        '2G ਤੇ ਕੰਮ ਕਰਦਾ ਹੈ',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 ਕੀ ਕਰਦਾ ਹੈ',
      scrollHint: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵੇਖਣ ਲਈ ਸਕ੍ਰੌਲ ਕਰੋ',
      featureWord: 'ਫੀਚਰ',
      closingTitle: 'ਹੋਰ ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ।',
      closingCta: 'Voice AI ਵੇਖੋ ↓',
      cards: [
        { tag: 'ਭਾਸ਼ਾ', title: 'ਚੈਟ', sub: 'ਤੁਹਾਡੀ ਭਾਸ਼ਾ, ਤੁਹਾਡੀ ਬੋਲੀ ਵਿੱਚ', body: 'ਹਿੰਦੀ, ਭੋਜਪੁਰੀ, ਤਮਿਲ, ਹਿੰਗਲਿਸ਼ — G1 ਨੂੰ ਉਸ ਭਾਸ਼ਾ ਵਿੱਚ ਕੁਝ ਵੀ ਪੁੱਛੋ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਸੋਚਦੇ ਹੋ। ਹੇਠਾਂ ਸੱਜੇ ਕੋਨੇ ਤੋਂ ਖੁੱਲ੍ਹਦਾ ਹੈ।' },
        { tag: 'ਸਲਾਹ', title: 'ਵੌਇਸ', sub: 'ਬੋਲੋ — ਡਾਕਟਰ ਰਿਪੋਰਟ ਲਵੋ', body: 'ਆਪਣੇ ਲੱਛਣ ਉੱਚੀ ਬੋਲੋ। G1 10 ਕਲੀਨਿਕਲ ਸਵਾਲ ਪੁੱਛਦਾ ਹੈ, ਇੱਕ ਢਾਂਚਾਗਤ ਰਿਪੋਰਟ ਬਣਾਉਂਦਾ ਹੈ, ਅਤੇ ਇਸਨੂੰ ਤੁਹਾਡੇ ਡਾਕਟਰ ਨੂੰ ਭੇਜਦਾ ਹੈ।' },
        { tag: 'ਵਿਜ਼ੁਅਲ AI', title: 'ਸਕੈਨ', sub: 'ਆਪਣੇ ਲੱਛਣਾਂ ਦੀ ਫੋਟੋ ਖਿੱਚੋ', body: 'ਧੱਫੜ, ਸੜਨ, ਵਾਲਾਂ ਦੀ ਸਮੱਸਿਆ ਦੀ ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ ਐਕਸ-ਰੇ ਅੱਪਲੋਡ ਕਰੋ। G1 ਇਸਨੂੰ ਪੜ੍ਹਦਾ ਹੈ ਅਤੇ ਦੱਸਦਾ ਹੈ ਕਿ ਧਿਆਨ ਦੀ ਲੋੜ ਕਿੱਥੇ ਹੈ।' },
        { tag: 'ਹਰਕਤ', title: 'ਯੋਗ', sub: 'ਰੀਅਲ-ਟਾਈਮ ਮੁਦਰਾ ਮਾਰਗਦਰਸ਼ਨ', body: 'ਆਪਣੇ ਕੈਮਰੇ ਸਾਹਮਣੇ ਇੱਕ ਮੁਦਰਾ ਰੱਖੋ। G1 ਰੀਅਲ ਟਾਈਮ ਵਿੱਚ ਤੁਹਾਡਾ ਰੂਪ ਵੇਖਦਾ ਹੈ ਅਤੇ ਦੱਸਦਾ ਹੈ ਕਿ ਅਗਲੇ ਵੱਲ ਕਦੋਂ ਜਾਣਾ ਹੈ।' },
        { tag: 'ਪਹੁੰਚ', title: 'ਆਫਲਾਈਨ', sub: 'ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਕੰਮ ਕਰਦਾ ਹੈ', body: 'ਬਲੱਡ ਗਰੁੱਪ, ਐਲਰਜੀ, ਚੱਲ ਰਹੀਆਂ ਦਵਾਈਆਂ — ਸਿਗਨਲ ਨਾ ਹੋਣ ਤੇ ਵੀ, ਕਿਸੇ ਵੀ ਫੋਨ ਤੇ ਤੁਰੰਤ ਉਪਲਬਧ।' },
        { tag: 'ਰਿਕਾਰਡ', title: 'ਯਾਦਦਾਸ਼ਤ', sub: 'ਤੁਹਾਡੀ ਸਿਹਤ, ਯਾਦ ਰੱਖੀ ਗਈ', body: 'ਹਰ ਰਿਪੋਰਟ, ਲੱਛਣ, ਦਵਾਈ ਅਤੇ ਡਾਕਟਰ ਮੁਲਾਕਾਤ — ਸਮੇਂ ਦੇ ਨਾਲ ਜੁੜੇ ਤਾਂ ਜੋ ਹਰ ਮੁਲਾਕਾਤ ਤੇ ਤੁਹਾਡੀ ਪੂਰੀ ਕਹਾਣੀ ਤਿਆਰ ਹੋਵੇ।' },
      ],
    },
    trust: {
      line1: 'ਭਰੋਸਾ, ਸ਼ੁਰੂ ਤੋਂ ਹੀ —',
      line2: 'ਬਾਅਦ ਵਿੱਚ ਨਹੀਂ ਜੋੜਿਆ।',
      caption: 'ਫੋਲਡਰਾਂ ਨੂੰ ਖਿੱਚੋ, ਜਾਂ ਇੱਕ ਤੇ ਕਲਿੱਕ ਕਰੋ।',
      folders: [
        { title: 'ਪਰਾਈਵੇਸੀ', sub: 'ਤੁਹਾਡਾ ਡਾਟਾ ਤੁਹਾਡਾ ਹੀ ਰਹਿੰਦਾ ਹੈ', rows: ['ਇਨਕ੍ਰਿਪਟਡ ਸਿਹਤ ਰਿਕਾਰਡ', 'ਕਦੇ ਨਹੀਂ ਵੇਚਿਆ ਜਾਂਦਾ', 'ਹਰ ਸ਼ੇਅਰ ਤੇ ਤੁਹਾਡਾ ਕੰਟਰੋਲ', 'ਕਦੇ ਵੀ ਮਿਟਾਓ'] },
        { title: 'ਇਮਾਨਦਾਰੀ', sub: 'ਹਰ ਜਵਾਬ, ਸਮਝਾਇਆ ਗਿਆ', rows: ['ਤਰਕ ਛੁਪਾਇਆ ਨਹੀਂ, ਵਿਖਾਇਆ ਜਾਂਦਾ', 'ਜਾਂਚਣ ਯੋਗ ਸਰੋਤ', 'ਸਪਸ਼ਟ "ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ" ਸੰਕੇਤ', 'ਕਲੀਨਿਕਲ ਮਾਰਗਦਰਸ਼ਨ ਅਨੁਸਾਰ ਸਮੀਖਿਅਤ'] },
        { title: 'ਤਿਆਰੀ', sub: 'ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਨਾਲ', rows: ['ਬਲੱਡ ਗਰੁੱਪ ਅਤੇ ਐਲਰਜੀ ਆਫਲਾਈਨ', 'ਦਵਾਈਆਂ ਦੀ ਸੂਚੀ ਆਫਲਾਈਨ', 'ਸਿਗਨਲ ਤੋਂ ਬਿਨਾਂ ਵੀ ਕੰਮ ਕਰਦਾ ਹੈ', 'ਵਨ-ਟੈਪ ਐਮਰਜੈਂਸੀ ਕਾਰਡ'] },
      ],
    },
    chatbot: {
      title: 'G1 ਸਹਾਇਕ',
      subtitle: 'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲੱਛਣਾਂ ਬਾਰੇ ਪੁੱਛੋ',
      placeholder: 'ਆਪਣਾ ਸੁਨੇਹਾ ਲਿਖੋ…',
      greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ G1 ਹਾਂ। ਤੁਹਾਨੂੰ ਕੀ ਤਕਲੀਫ਼ ਹੈ ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਦੱਸੋ।',
      pickLanguage: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਇੱਕ ਭਾਸ਼ਾ ਚੁਣੋ',
      continueIn: 'ਜਾਰੀ ਰੱਖੋ',
      changeLanguage: 'ਬਦਲੋ',
      helpfulQuestion: 'ਕੀ ਇਹ ਮਦਦਗਾਰ ਸੀ?',
      quickReplies: ['ਸਿਰ ਦਰਦ ਹੈ', 'ਚਮੜੀ ਤੇ ਧੱਫੜ'],
      errorFallback: 'ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਥੋੜ੍ਹੀ ਦੇਰ ਬਾਅਦ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      listening: 'ਸੁਣ ਰਿਹਾ ਹਾਂ…',
    },
    ctaText: 'ਆਪਣੀ ਸਿਹਤ ਦੀ ਕਹਾਣੀ ਸ਼ੁਰੂ ਕਰੋ',
    footer: { tagline: 'ਭਾਰਤ ਲਈ ਬਣਾਇਆ ਗਿਆ।', disclaimer: 'ਇਹ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ।' },
  },
  or: {
    heroWords: ['ଆପଣଙ୍କ', 'ସ୍ୱାସ୍ଥ୍ୟ,', 'ବୁଝାଗଲା।'],
    heroSubtitle:
      'ନିଜ ଭାଷାରେ ପଚାରନ୍ତୁ। ଆପଣଙ୍କ ଲକ୍ଷଣ କୁହନ୍ତୁ। ପ୍ରେସକ୍ରିପସନ ର ଫଟୋ ଉଠାନ୍ତୁ। G1 ତୁରନ୍ତ ଚିକିତ୍ସା ସୂଚନାକୁ ଆପଣଙ୍କ ଭାଷାରେ ବୁଝାଏ।',
    startConsultation: 'ପରାମର୍ଶ ଆରମ୍ଭ କରନ୍ତୁ',
    exploreFeatures: 'ବିଶେଷତା ଦେଖନ୍ତୁ',
    consultG1: 'G1 ସହିତ କଥା ହୁଅନ୍ତୁ',
    tapToExplore: 'ବିଶେଷତା ଦେଖିବାକୁ ଟ୍ୟାପ କରନ୍ତୁ',
    chooseLanguage: 'ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ',
    navItems: { 'Why G1': 'କାହିଁକି G1', Features: 'ବିଶେଷତା', India: 'ଭାରତ', Trust: 'ବିଶ୍ୱାସ' },
    heroTiles: [
      { title: 'ତୁରନ୍ତ ଚାଟ୍ ପରାମର୍ଶ', brief: '60 ସେକେଣ୍ଡରେ ଉତ୍ତର' },
      { title: 'ଭଏସ୍ ଓ ରିପୋର୍ଟ', brief: 'କୁହନ୍ତୁ, ଆମେ ଲେଖିବୁ' },
      { title: 'ଯୋଗ ଓ ମୁଦ୍ରା', brief: 'ପ୍ରତିଦିନର ମାର୍ଗଦର୍ଶନ' },
      { title: 'ଅଫଲାଇନ୍‌ରେ କାମ କରେ', brief: 'ସିଗନାଲ୍ ନ ଥିଲେ ମଧ୍ୟ ଅସୁବିଧା ନାହିଁ' },
    ],
    heroBadges: ['ନିଜ ଭାଷାରେ ପଚାରନ୍ତୁ', 'କ୍ଲିନିକ୍ ଯିବାର ଆବଶ୍ୟକତା ନାହିଁ'],
    voiceGrid: { eyebrow: 'ଇଣ୍ଟରାକ୍ଟିଭ୍ ସକ୍ଷମତା', heading: 'ଗଭୀରରୁ ଜାଣନ୍ତୁ', headingAccent: 'G1 କୁ.' },
    testimonials: {
      eyebrow: 'ପ୍ରକୃତ କାହାଣୀ',
      heading: 'ପ୍ରତ୍ୟେକ ରାଜ୍ୟରେ',
      headingAccent: 'ଶୁଣାଗଲା।',
      subhead: 'ବାରାଣାସୀର ଆଈମାନଙ୍କଠାରୁ ମୁମ୍ବାଇର ଡାକ୍ତରଙ୍କ ପର୍ଯ୍ୟନ୍ତ — G1 ଆପଣଙ୍କ ଭାଷାରେ କଥା ହୁଏ।',
    },
    problems: {
      eyebrow: 'ଦେଖନ୍ତୁ',
      tabProblems: 'ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀଙ୍କ ତ୍ରୁଟି',
      tabSolutions: 'G1 ସମାଧାନ',
      badgeSolutions: 'G1 ଉତ୍ତର',
      heading: 'ପ୍ରତ୍ୟେକ ହେଲ୍ଥ ଆପ୍ କେଉଁଠି ଭୁଲ୍ କରେ।',
      subhead: 'ପ୍ରଚଳିତ ଆପ୍‌ଗୁଡ଼ିକ ଇଂରାଜୀ କହୁଥିବା, ସହରୀ, ଟେକ୍-ଜାଣିଥିବା ଉପଯୋଗକାରୀଙ୍କ ପାଇଁ ତିଆରି ହୋଇଥିଲା। ProjectG1 ବାକି ସମସ୍ତଙ୍କ ପାଇଁ ତିଆରି।',
      statsLabels: ['ଅବହେଳିତ ଭାରତୀୟ', 'ବାଦ ଦିଆଯାଇଥିବା ଭାଷା', 'ହଜିଯାଇଥିବା ରେକର୍ଡ'],
      cards: [
        { title: 'ରିପୋର୍ଟ ମୃତ PDF ହୋଇଯାଏ', detail: 'ସାଇତି ରଖାଯାଏ କିନ୍ତୁ ସମୟ ସହିତ କେବେ ଯୋଡି ହୁଏ ନାହିଁ କି ତୁଳନା ହୁଏ ନାହିଁ।' },
        { title: 'କୌଣସି ଦୀର୍ଘକାଳୀନ ସମୟସୀମା ନାହିଁ', detail: 'ମାସ କିମ୍ବା ବର୍ଷରେ ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ କିପରି ବଦଳିଲା ଦେଖାଯାଏ ନାହିଁ।' },
        { title: 'ତଥ୍ୟ ମଧ୍ୟରେ କୌଣସି ସମ୍ପର୍କ ନାହିଁ', detail: 'ଔଷଧ, ରିପୋର୍ଟ, ଲକ୍ଷଣ, ଡାକ୍ତର — ସବୁ ଅଲଗା।' },
        { title: 'ଦୁର୍ବଳ ଜରୁରୀକାଳୀନ ପ୍ରସ୍ତୁତି', detail: 'ଜରୁରୀକାଳୀନ ସୂଚନା ଅଫଲାଇନ୍‌ରେ ତୁରନ୍ତ ଉପଲବ୍ଧ ନୁହେଁ।' },
        { title: 'ଡାକ୍ତର ପରିଦର୍ଶନ ପ୍ରସ୍ତୁତି ନାହିଁ', detail: 'ପରାମର୍ଶ ସମୟରେ ରୋଗୀମାନେ ପ୍ରଶ୍ନ ଓ ଇତିହାସ ভୁଲିଯାଆନ୍ତି।' },
        { title: 'ଯତ୍ନ ନେବା ଲୋକଙ୍କ ପାଇଁ କୌଣସି ପ୍ରକ୍ରିୟା ନାହିଁ', detail: 'ପିତାମାତାଙ୍କ ଯତ୍ନ ନେଉଥିବା ପିଲାମାନେ ଏବେ ବି WhatsApp କଲ୍ ଉପରେ ନିର୍ଭରଶୀଳ।' },
      ],
      solutions: [
        { headline: 'ଗ୍ରାମୀଣ ଭାରତ ପାଇଁ ତିଆରି', sub: 'ମନ୍ଥର ଇଣ୍ଟରନେଟ୍, ଯେକୌଣସି ଫୋନ୍, ଯେକୌଣସି ଭାଷା — ଅନ୍ୟମାନେ କାମ ନକରୁଥିବା ସ୍ଥାନରେ G1 କାମ କରେ।' },
        { headline: 'ପ୍ରତ୍ୟେକ ରିପୋର୍ଟ ଜୀବନ୍ତ ରହେ', sub: 'ଥରେ ଅପଲୋଡ୍ କରନ୍ତୁ, ସବୁବେଳେ ପଚାରନ୍ତୁ। ଆପଣଙ୍କ ରେକର୍ଡ ସମୟ ସହିତ ଅଧିକ ବୁଦ୍ଧିମାନ ହୁଏ।' },
        { headline: 'ଚିନ୍ତା କରୁଥିବା ସ୍ୱାସ୍ଥ୍ୟ ସମୟସୀମା', sub: 'ଲକ୍ଷଣ, ଔଷଧ ଓ ପରିଦର୍ଶନ — ମାସ ଓ ବର୍ଷ ଧରି ଯୋଡ଼ି ହୋଇଥାଏ।' },
        { headline: 'ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ପରିବାର, ଏକ ସ୍ଥାନରେ', sub: 'ଆପ ବଦଳାଇ ନ ଦେଇ ପିତାମାତା, ପିଲା ଓ ନିଜ ସ୍ୱାସ୍ଥ୍ୟ ପରିଚାଳନା କରନ୍ତୁ।' },
        { headline: 'ଏକ ରେକର୍ଡ, ସମସ୍ତ ଡାକ୍ତର', sub: 'Practo ଠାରୁ Apollo ଏବଂ ସ୍ଥାନୀୟ କ୍ଲିନିକ୍ ପର୍ଯ୍ୟନ୍ତ — G1 ସବୁକିଛି ଏକତ୍ର କରେ।' },
        { headline: 'ଇଣ୍ଟରନେଟ୍ ବିନା ମଧ୍ୟ କାମ କରେ', sub: 'ରକ୍ତ ଗୋଷ୍ଠୀ, ଆଲର୍ଜି, ଔଷଧ — ସବୁବେଳେ ଉପଲବ୍ଧ, ଅଫଲାଇନ୍‌ରେ ମଧ୍ୟ।' },
      ],
    },
    india: {
      eyebrow: 'ଆଞ୍ଚଳିକ ପ୍ରବେଶ',
      heading: 'କୌଣସି ଘର ପଛରେ ରହିବ ନାହିଁ।',
      cardLine1: 'ଭାରତର',
      cardLine2: 'ପ୍ରତ୍ୟେକ କୋଣ।',
      cardBody:
        'ଅଧିକାଂଶ ହେଲ୍ଥ ଆପ୍ ଅଣଦେଖା କରୁଥିବା ଅର୍ଦ୍ଧ-ସହରୀ ଓ ଗ୍ରାମୀଣ ପରିବାର ପାଇଁ ଏହା ତିଆରି। କମ୍ ଗତିର ଇଣ୍ଟରନେଟ୍, ସାଧାରଣ ଫୋନ୍, ଓ ଇଂରାଜୀ ନ ଜାଣିବା — ସବୁ ପ୍ରଥମ ଦିନଠାରୁ ଧରି ନିଆଯାଇଛି।',
      askIn: 'G1 କୁ ପଚାରନ୍ତୁ',
      statsLabels: ['ଭାଷା ଓ ଉପଭାଷା', 'ମନ୍ଥର ନେଟୱାର୍କରେ ମଧ୍ୟ ଚାଲେ', 'ରାଜ୍ୟ, ଏକ ସାଥୀ'],
    },
    cityGrid: {
      hubLabel: 'ପ୍ରୋଜେକ୍ଟ',
      features: [
        '20+ ଉପଭାଷାରେ ଚାଟ୍',
        'ପ୍ରତିଦିନ ଡାକ୍ତର ରିପୋର୍ଟ',
        'ଇମେଜ୍ ସ୍କାନ୍ ସକ୍ରିୟ',
        'ଯୋଗ କୋଚିଂ ଲାଇଭ୍',
        'ଭଏସ୍ ପରାମର୍ଶ ବଢୁଛି',
        'ଅଫଲାଇନ୍ ରେକର୍ଡ ବ୍ୟବହୃତ',
        'ଡାକ୍ତରଙ୍କୁ ରିପୋର୍ଟ ପଠାଗଲା',
        '2Gରେ କାମ କରେ',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 କଣ କରେ',
      scrollHint: 'ବିଶେଷତା ଦେଖିବାକୁ ସ୍କ୍ରୋଲ କରନ୍ତୁ',
      featureWord: 'ବିଶେଷତା',
      closingTitle: 'ଆହୁରି ଶୀଘ୍ର ଆସୁଛି।',
      closingCta: 'Voice AI ଦେଖନ୍ତୁ ↓',
      cards: [
        { tag: 'ଭାଷା', title: 'ଚାଟ୍', sub: 'ଆପଣଙ୍କ ଭାଷାରେ, ଆପଣଙ୍କ ଉପଭାଷାରେ', body: 'ହିନ୍ଦୀ, ଭୋଜପୁରୀ, ତାମିଲ, ହିଙ୍ଗଲିଶ୍ — ଆପଣ ଭାବୁଥିବା ଭାଷାରେ G1କୁ କିଛି ବି ପଚାରନ୍ତୁ। ତଳ ଡାହାଣ କୋଣରୁ ବିସ୍ତାର ହୁଏ।' },
        { tag: 'ପରାମର୍ଶ', title: 'ଭଏସ୍', sub: 'କୁହନ୍ତୁ — ଡାକ୍ତର ରିପୋର୍ଟ ପାଆନ୍ତୁ', body: 'ଆପଣଙ୍କ ଲକ୍ଷଣ ଉଚ୍ଚ ସ୍ୱରରେ କୁହନ୍ତୁ। G1 10ଟି କ୍ଲିନିକାଲ୍ ପ୍ରଶ୍ନ ପଚାରି, ଏକ ସଂରଚିତ ରିପୋର୍ଟ ତିଆରି କରି, ତାହା ଆପଣଙ୍କ ଡାକ୍ତରଙ୍କୁ ପଠାଏ।' },
        { tag: 'ଭିଜୁଆଲ୍ AI', title: 'ସ୍କାନ୍', sub: 'ଆପଣଙ୍କ ଲକ୍ଷଣର ଫଟୋ ନିଅନ୍ତୁ', body: 'ଚର୍ମ ଫୁଟୁକୁଡ଼ି, ପୋଡ଼ା, ବାଳ ସମସ୍ୟାର ଫଟୋ ନିଅନ୍ତୁ କିମ୍ବା X-ରେ ଅପଲୋଡ୍ କରନ୍ତୁ। G1 ଏହାକୁ ପଢ଼ି ଧ୍ୟାନ ଆବଶ୍ୟକ ଥିବା ବିଷୟ ଚିହ୍ନଟ କରେ।' },
        { tag: 'ଗତି', title: 'ଯୋଗ', sub: 'ରିଅଲ୍-ଟାଇମ୍ ମୁଦ୍ରା ମାର୍ଗଦର୍ଶନ', body: 'ଆପଣଙ୍କ କ୍ୟାମେରା ସାମ୍ନାରେ ଏକ ମୁଦ୍ରା ଧରି ରଖନ୍ତୁ। G1 ରିଅଲ୍ ଟାଇମ୍‌ରେ ଆପଣଙ୍କ ଫର୍ମ ଦେଖି ପରବର୍ତ୍ତୀକୁ କେବେ ଯିବେ ତାହା କୁହେ।' },
        { tag: 'ପ୍ରବେଶ', title: 'ଅଫଲାଇନ୍', sub: 'ଇଣ୍ଟରନେଟ୍ ବିନା କାମ କରେ', body: 'ରକ୍ତ ଗୋଷ୍ଠୀ, ଆଲର୍ଜି, ଚାଲୁଥିବା ଔଷଧ — ସିଗନାଲ୍ ନ ଥିଲେ ମଧ୍ୟ, ଯେକୌଣସି ଫୋନ୍‌ରେ ତୁରନ୍ତ ଉପଲବ୍ଧ।' },
        { tag: 'ରେକର୍ଡ', title: 'ସ୍ମୃତି', sub: 'ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ, ମନେ ରଖାଯାଇଛି', body: 'ପ୍ରତ୍ୟେକ ରିପୋର୍ଟ, ଲକ୍ଷଣ, ଔଷଧ ଓ ଡାକ୍ତର ପରିଦର୍ଶନ — ସମୟ ସହିତ ଯୋଡ଼ି ହୋଇ ପ୍ରତ୍ୟେକ ସାକ୍ଷାତରେ ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ କାହାଣୀ ପ୍ରସ୍ତୁତ ରହେ।' },
      ],
    },
    trust: {
      line1: 'ବିଶ୍ୱାସ, ପ୍ରାରମ୍ଭରୁ ହିଁ —',
      line2: 'ପରେ ଯୋଡ଼ା ହୋଇନାହିଁ।',
      caption: 'ଫୋଲ୍ଡରଗୁଡ଼ିକୁ ଟାଣନ୍ତୁ, କିମ୍ବା ଗୋଟିଏରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
      folders: [
        { title: 'ଗୋପନୀୟତା', sub: 'ଆପଣଙ୍କ ତଥ୍ୟ ଆପଣଙ୍କରି ରହେ', rows: ['ଏନକ୍ରିପ୍ଟେଡ୍ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ', 'କେବେ ବିକ୍ରି ହୁଏ ନାହିଁ', 'ପ୍ରତ୍ୟେକ ସେୟାରରେ ଆପଣଙ୍କ ନିୟନ୍ତ୍ରଣ', 'ଯେକୌଣସି ସମୟରେ ଡିଲିଟ୍ କରନ୍ତୁ'] },
        { title: 'ସଚ୍ଚୋଟତା', sub: 'ପ୍ରତ୍ୟେକ ଉତ୍ତର, ବ୍ୟାଖ୍ୟା ହୋଇଛି', rows: ['ତର୍କ ଲୁଚାଯାଏ ନାହିଁ, ଦେଖାଯାଏ', 'ଯାଞ୍ଚ କରିହେବା ଉତ୍ସ', 'ସ୍ପଷ୍ଟ "ଡାକ୍ତର ଦେଖନ୍ତୁ" ସଙ୍କେତ', 'କ୍ଲିନିକାଲ୍ ମାର୍ଗଦର୍ଶନ ଅନୁଯାୟୀ ସମୀକ୍ଷିତ'] },
        { title: 'ପ୍ରସ୍ତୁତି', sub: 'ଜରୁରୀକାଳୀନ ସମୟରେ ସାଥୀ', rows: ['ରକ୍ତ ଗୋଷ୍ଠୀ ଓ ଆଲର୍ଜି ଅଫଲାଇନ୍‌ରେ', 'ଔଷଧ ତାଲିକା ଅଫଲାଇନ୍‌ରେ', 'ସିଗନାଲ୍ ବିନା ମଧ୍ୟ କାମ କରେ', 'ଏକ-ଟାପ୍ ଜରୁରୀକାଳୀନ କାର୍ଡ'] },
      ],
    },
    chatbot: {
      title: 'G1 ସହାୟକ',
      subtitle: 'ଆପଣଙ୍କ ଭାଷାରେ ଲକ୍ଷଣ ବିଷୟରେ ପଚାରନ୍ତୁ',
      placeholder: 'ଆପଣଙ୍କ ସନ୍ଦେଶ ଟାଇପ୍ କରନ୍ତୁ…',
      greeting: 'ନମସ୍କାର, ମୁଁ G1। ଆପଣଙ୍କୁ କଣ ଅସୁବିଧା ହେଉଛି ଯେକୌଣସି ଭାଷାରେ କୁହନ୍ତୁ।',
      pickLanguage: 'ଆରମ୍ଭ କରିବାକୁ ଏକ ଭାଷା ବାଛନ୍ତୁ',
      continueIn: 'ଜାରି ରଖନ୍ତୁ',
      changeLanguage: 'ପରିବର୍ତ୍ତନ',
      helpfulQuestion: 'ଏହା ସାହାଯ୍ୟକାରୀ ଥିଲା କି?',
      quickReplies: ['ମୁଣ୍ଡବିନ୍ଧା ହେଉଛି', 'ଚର୍ମରେ ଚକଟା'],
      errorFallback: 'କିଛି ଭୁଲ ହୋଇଗଲା। ଦୟାକରି କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।',
      listening: 'ଶୁଣୁଛି…',
    },
    ctaText: 'ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ କାହାଣୀ ଆରମ୍ଭ କରନ୍ତୁ',
    footer: { tagline: 'ଭାରତ ପାଇଁ ତିଆରି।', disclaimer: 'ଏହା ବୃତ୍ତିଗତ ଚିକିତ୍ସା ପରାମର୍ଶର ବିକଳ୍ପ ନୁହେଁ।' },
  },
  as: {
    heroWords: ['আপোনাৰ', 'স্বাস্থ্য,', "বুজা গ'ল।"],
    heroSubtitle:
      'নিজৰ ভাষাত সোধক। আপোনাৰ লক্ষণ কওক। প্ৰেস্ক্ৰিপশ্যনৰ ফটো তুলক। G1 তৎক্ষণাৎ চিকিৎসা তথ্য আপোনাৰ ভাষাত বুজাই দিয়ে।',
    startConsultation: 'পৰামৰ্শ আৰম্ভ কৰক',
    exploreFeatures: 'বৈশিষ্ট্য চাওক',
    consultG1: "G1ৰ সৈতে কথা পাতক",
    tapToExplore: 'বৈশিষ্ট্য চাবলৈ টেপ কৰক',
    chooseLanguage: 'আপোনাৰ ভাষা বাছক',
    navItems: { 'Why G1': 'কিয় G1', Features: 'বৈশিষ্ট্য', India: 'ভাৰত', Trust: 'বিশ্বাস' },
    heroTiles: [
      { title: 'তাৎক্ষণিক চেট পৰামৰ্শ', brief: '৬০ ছেকেণ্ডত উত্তৰ' },
      { title: "ভইচ আৰু ৰিপ'ৰ্ট", brief: 'কওক, আমি লিখিম' },
      { title: 'যোগ আৰু আসন', brief: 'দৈনিক পথনিৰ্দেশ' },
      { title: 'অফলাইনত কাম কৰে', brief: 'ছিগনেল নাথাকিলেও সমস্যা নাই' },
    ],
    heroBadges: ['নিজৰ ভাষাত সোধক', 'ক্লিনিকলৈ যোৱাৰ প্ৰয়োজন নাই'],
    voiceGrid: { eyebrow: 'ইণ্টাৰেক্টিভ্ ক্ষমতা', heading: 'গভীৰভাৱে জানক', headingAccent: 'G1ক.' },
    testimonials: {
      eyebrow: 'সঁচা কাহিনী',
      heading: 'প্ৰতিটো ৰাজ্যত',
      headingAccent: 'শুনা গৈছে।',
      subhead: 'বাৰাণাসীৰ আইতাৰ পৰা মুম্বাইৰ ডাক্তৰলৈ — G1এ আপোনাৰ ভাষাত কথা কয়।',
    },
    problems: {
      eyebrow: 'চাওক',
      tabProblems: 'প্ৰতিদ্বন্দ্বীৰ কমী',
      tabSolutions: 'G1ৰ সমাধান',
      badgeSolutions: 'G1ৰ উত্তৰ',
      heading: 'প্ৰতিটো হেল্থ এপে ক\'ত ভুল কৰে।',
      subhead: 'বৰ্তমানৰ এপবোৰ ইংৰাজী কোৱা, চহৰীয়া, প্ৰযুক্তি-দক্ষ ব্যৱহাৰকাৰীৰ বাবে বনোৱা হৈছিল। ProjectG1 বাকী সকলোৰে বাবে বনোৱা হৈছে।',
      statsLabels: ['অৱহেলিত ভাৰতীয়', 'বাদ পৰা উপভাষা', 'হেৰুৱা ৰেকৰ্ড'],
      cards: [
        { title: 'ৰিপ\'ৰ্ট মৃত PDF হৈ যায়', detail: 'সাঁচি থোৱা হয় কিন্তু সময়ৰ লগত কেতিয়াও সংযুক্ত বা তুলনা কৰা নহয়।' },
        { title: 'কোনো দীৰ্ঘমেয়াদী সময়ৰেখা নাই', detail: 'মাহ বা বছৰত আপোনাৰ স্বাস্থ্য কেনেকৈ সলনি হ\'ল দেখা নাযায়।' },
        { title: 'তথ্যৰ মাজত কোনো সম্পৰ্ক নাই', detail: 'ঔষধ, ৰিপ\'ৰ্ট, লক্ষণ, ডাক্তৰ — সকলো পৃথক পৃথক।' },
        { title: 'দুৰ্বল জৰুৰীকালীন প্ৰস্তুতি', detail: 'জৰুৰীকালীন তথ্য অফলাইনত তৎক্ষণাৎ উপলব্ধ নহয়।' },
        { title: 'ডাক্তৰ সাক্ষাতৰ প্ৰস্তুতি নাই', detail: 'পৰামৰ্শৰ সময়ত ৰোগীয়ে প্ৰশ্ন আৰু ইতিহাস পাহৰি যায়।' },
        { title: 'যত্নকাৰীৰ বাবে কোনো ব্যৱস্থা নাই', detail: 'অভিভাৱকৰ যত্ন লোৱা ল\'ৰা-ছোৱালী এতিয়াও WhatsApp কলৰ ওপৰত নিৰ্ভৰশীল।' },
      ],
      solutions: [
        { headline: 'গ্ৰামীণ ভাৰতৰ বাবে বনোৱা', sub: 'লাহী ইণ্টাৰনেট, যিকোনো ফোন, যিকোনো ভাষা — আনে কাম নকৰা ঠাইত G1এ কাম কৰে।' },
        { headline: 'প্ৰতিটো ৰিপ\'ৰ্ট জীৱন্ত থাকে', sub: 'এবাৰ আপল\'ড কৰক, সদায় সোধক। আপোনাৰ ৰেকৰ্ড সময়ৰ লগত অধিক বুদ্ধিমান হয়।' },
        { headline: 'চিন্তা কৰা স্বাস্থ্য সময়ৰেখা', sub: 'লক্ষণ, ঔষধ আৰু সাক্ষাৎ — মাহ আৰু বছৰ জুৰি সংযুক্ত।' },
        { headline: 'আপোনাৰ সম্পূৰ্ণ পৰিয়াল, এখন ঠাইতে', sub: 'এপ সলনি নকৰাকৈ অভিভাৱক, সন্তান আৰু নিজৰ স্বাস্থ্য চম্ভালক।' },
        { headline: 'এটা ৰেকৰ্ড, সকলো ডাক্তৰ', sub: 'Practo ৰ পৰা Apollo আৰু স্থানীয় ক্লিনিকলৈ — G1এ সকলো একত্ৰিত কৰে।' },
        { headline: 'ইণ্টাৰনেট নোহোৱাকৈও কাম কৰে', sub: 'ৰক্তৰ গোট, এলাৰ্জী, ঔষধ — সদায় উপলব্ধ, অফলাইনতো।' },
      ],
    },
    india: {
      eyebrow: 'আঞ্চলিক প্ৰৱেশ',
      heading: 'কোনো ঘৰ পাছ পৰি নাথাকিব।',
      cardLine1: 'ভাৰতৰ',
      cardLine2: 'প্ৰতিটো চুক।',
      cardBody:
        'বেছিভাগ হেল্থ এপে আওকাণ কৰা আধা-চহৰীয়া আৰু গ্ৰাম্য পৰিয়ালৰ বাবেই ইয়াক বনোৱা হৈছে। লাহী ইণ্টাৰনেট, সাধাৰণ ফোন, ইংৰাজী নজনা — এই সকলো প্ৰথম দিনৰে পৰা ধৰি লোৱা হৈছে।',
      askIn: 'G1ক সোধক',
      statsLabels: ['ভাষা আৰু উপভাষা', 'লাহী নেটৱৰ্কতো চলে', 'ৰাজ্য, এটা সঙ্গী'],
    },
    cityGrid: {
      hubLabel: 'প্ৰজেক্ট',
      features: [
        '20+ উপভাষাত চেট',
        "প্ৰতিদিনে ডাক্তৰ ৰিপ'ৰ্ট",
        'ইমেজ স্কেন সক্ৰিয়',
        'যোগ প্ৰশিক্ষণ লাইভ',
        'ভইচ পৰামৰ্শ বৃদ্ধি পাইছে',
        'অফলাইন ৰেকৰ্ড ব্যৱহৃত',
        "ডাক্তৰলৈ ৰিপ'ৰ্ট পঠোৱা হৈছে",
        '2Gত কাম কৰে',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1এ কি কৰে',
      scrollHint: 'বৈশিষ্ট্য চাবলৈ স্ক্ৰল কৰক',
      featureWord: 'বৈশিষ্ট্য',
      closingTitle: 'অধিক শীঘ্ৰে আহিছে।',
      closingCta: 'Voice AI চাওক ↓',
      cards: [
        { tag: 'ভাষা', title: 'চেট', sub: 'আপোনাৰ ভাষাত, আপোনাৰ উপভাষাত', body: 'হিন্দী, ভোজপুৰী, তামিল, হিংলিছ — আপুনি ভবা ভাষাত G1ক যিকোনো প্ৰশ্ন কৰক। তলৰ সোঁফালৰ চুকৰ পৰা বিস্তাৰিত হয়।' },
        { tag: 'পৰামৰ্শ', title: 'ভইচ', sub: 'কওক — ডাক্তৰ ৰিপ\'ৰ্ট পাওক', body: 'আপোনাৰ লক্ষণ চিঞৰি কওক। G1এ 10টা ক্লিনিকেল প্ৰশ্ন সোধে, এটা গঠনমূলক ৰিপ\'ৰ্ট তৈয়াৰ কৰে, আৰু ইয়াক আপোনাৰ ডাক্তৰলৈ পঠায়।' },
        { tag: 'ভিজুৱেল AI', title: 'স্কেন', sub: 'আপোনাৰ লক্ষণৰ ফটো তুলক', body: 'ফুঁহুৰি, পোৰা, চুলিৰ সমস্যাৰ ফটো তুলক বা এক্স-ৰে আপল\'ড কৰক। G1এ ইয়াক পঢ়ি মনোযোগ দিব লগীয়া বস্তু চিহ্নিত কৰে।' },
        { tag: 'গতি', title: 'যোগ', sub: 'ৰিয়েল-টাইম আসন নিৰ্দেশনা', body: 'আপোনাৰ কেমেৰাৰ সন্মুখত এটা আসন ধৰি ৰাখক। G1এ ৰিয়েল টাইমত আপোনাৰ ফৰ্ম চাই পৰৱৰ্তীলৈ কেতিয়া যাব লাগে কয়।' },
        { tag: 'প্ৰৱেশ', title: 'অফলাইন', sub: 'ইণ্টাৰনেট নোহোৱাকৈ কাম কৰে', body: 'ৰক্তৰ গোট, এলাৰ্জী, চলি থকা ঔষধ — ছিগনেল নাথাকিলেও, যিকোনো ফোনত তৎক্ষণাৎ উপলব্ধ।' },
        { tag: 'ৰেকৰ্ড', title: 'স্মৃতি', sub: 'আপোনাৰ স্বাস্থ্য, মনত ৰখা', body: "প্ৰতিটো ৰিপ'ৰ্ট, লক্ষণ, ঔষধ আৰু ডাক্তৰ সাক্ষাৎ — সময়ৰ সৈতে সংযুক্ত যাতে প্ৰতিটো সাক্ষাতত আপোনাৰ সম্পূৰ্ণ কাহিনী প্ৰস্তুত থাকে।" },
      ],
    },
    trust: {
      line1: 'বিশ্বাস, আৰম্ভণিৰ পৰাই —',
      line2: 'পিছত যোগ কৰা নহয়।',
      caption: 'ফোল্ডাৰবোৰ টানি নিয়ক, বা এটাত ক্লিক কৰক।',
      folders: [
        { title: 'গোপনীয়তা', sub: 'আপোনাৰ ডেটা আপোনাৰেই থাকে', rows: ['ইনক্ৰিপ্টেড স্বাস্থ্য ৰেকৰ্ড', 'কেতিয়াও বিক্ৰী কৰা নহয়', 'প্ৰতিটো শ্বেয়াৰত আপোনাৰ নিয়ন্ত্ৰণ', 'যিকোনো সময়তে ডিলিট কৰক'] },
        { title: 'সততা', sub: 'প্ৰতিটো উত্তৰ, ব্যাখ্যা কৰা', rows: ['যুক্তি লুকুৱা নহয়, দেখুওৱা হয়', 'পৰীক্ষা কৰিব পৰা উৎস', 'স্পষ্ট "ডাক্তৰক দেখা কৰক" সংকেত', 'ক্লিনিকেল নিৰ্দেশনা অনুসৰি পৰ্যালোচিত'] },
        { title: 'সাজু অৱস্থা', sub: 'জৰুৰীকালীন সময়ত সংগী', rows: ['ৰক্তৰ গোট আৰু এলাৰ্জী অফলাইনত', 'ঔষধৰ তালিকা অফলাইনত', 'ছিগনেল নোহোৱাকৈও কাম কৰে', 'এক-টেপ জৰুৰীকালীন কাৰ্ড'] },
      ],
    },
    chatbot: {
      title: 'G1 সহায়ক',
      subtitle: 'আপোনাৰ ভাষাত লক্ষণৰ বিষয়ে সোধক',
      placeholder: 'আপোনাৰ বাৰ্তা টাইপ কৰক…',
      greeting: 'নমস্কাৰ, মই G1। আপোনাক কি অসুবিধা হৈছে যিকোনো ভাষাত কওক।',
      pickLanguage: 'আৰম্ভ কৰিবলৈ এটা ভাষা বাছক',
      continueIn: 'অব্যাহত ৰাখক',
      changeLanguage: 'সলনি কৰক',
      helpfulQuestion: 'এইটোৱে সহায় কৰিলে নে?',
      quickReplies: ['মূৰৰ বিষ হৈছে', 'ছালত ফুস্কুৰি'],
      errorFallback: "কিবা ভুল হ'ল। অনুগ্ৰহ কৰি অলপ সময়ৰ পিছত পুনৰ চেষ্টা কৰক।",
      listening: 'শুনি আছোঁ…',
    },
    ctaText: 'আপোনাৰ স্বাস্থ্যৰ কাহিনী আৰম্ভ কৰক',
    footer: { tagline: 'ভাৰতৰ বাবে বনোৱা।', disclaimer: 'ই পেছাদাৰী চিকিৎসা পৰামৰ্শৰ বিকল্প নহয়।' },
  },
  ur: {
    heroWords: ['آپ کی', 'صحت،', 'سمجھ گئی۔'],
    heroSubtitle:
      'اپنی زبان میں پوچھیں۔ اپنی علامات بولیں۔ نسخے کی تصویر کھینچیں۔ G1 فوری طور پر طبی معلومات آپ کی زبان میں سمجھاتا ہے۔',
    startConsultation: 'مشاورت شروع کریں',
    exploreFeatures: 'خصوصیات دیکھیں',
    consultG1: 'G1 سے بات کریں',
    tapToExplore: 'خصوصیات دیکھنے کے لیے ٹیپ کریں',
    chooseLanguage: 'اپنی زبان منتخب کریں',
    navItems: { 'Why G1': 'کیوں G1', Features: 'خصوصیات', India: 'بھارت', Trust: 'اعتماد' },
    heroTiles: [
      { title: 'فوری چیٹ مشاورت', brief: '60 سیکنڈ میں جواب' },
      { title: 'آواز اور رپورٹس', brief: 'بولیں، ہم لکھیں گے' },
      { title: 'یوگا اور کرنسی', brief: 'روزانہ رہنمائی' },
      { title: 'آف لائن کام کرتا ہے', brief: 'سگنل نہ ہو تب بھی کوئی مسئلہ نہیں' },
    ],
    heroBadges: ['اپنی زبان میں پوچھیں', 'کلینک جانے کی ضرورت نہیں'],
    voiceGrid: { eyebrow: 'انٹرایکٹو صلاحیتیں', heading: 'گہرائی سے جانیں', headingAccent: 'G1 کو.' },
    testimonials: {
      eyebrow: 'حقیقی کہانیاں',
      heading: 'ہر ریاست میں',
      headingAccent: 'سنی گئیں۔',
      subhead: 'وارانسی کی دادیوں سے لے کر ممبئی کے ڈاکٹروں تک — G1 آپ کی زبان بولتا ہے۔',
    },
    problems: {
      eyebrow: 'دیکھیں',
      tabProblems: 'حریفوں کی خامیاں',
      tabSolutions: 'G1 کے حل',
      badgeSolutions: 'G1 کے جوابات',
      heading: 'ہر ہیلتھ ایپ کہاں غلطی کرتا ہے۔',
      subhead: 'موجودہ ایپس انگریزی بولنے والے، شہری، تکنیکی طور پر ماہر صارفین کے لیے بنائے گئے تھے۔ ProjectG1 باقی سب کے لیے بنایا گیا ہے۔',
      statsLabels: ['نظرانداز شدہ بھارتی', 'خارج شدہ زبانیں', 'گمشدہ ریکارڈز'],
      cards: [
        { title: 'رپورٹیں مردہ PDF بن جاتی ہیں', detail: 'محفوظ ہوتی ہیں مگر وقت کے ساتھ کبھی جوڑی یا موازنہ نہیں کی جاتیں۔' },
        { title: 'کوئی طویل مدتی ٹائم لائن نہیں', detail: 'مہینوں یا سالوں میں آپ کی صحت کیسے بدلی، یہ نظر نہیں آتا۔' },
        { title: 'ڈیٹا کے درمیان کوئی تعلق نہیں', detail: 'دوائیں، رپورٹیں، علامات، ڈاکٹر — سب الگ الگ۔' },
        { title: 'کمزور ہنگامی تیاری', detail: 'ہنگامی معلومات آف لائن فوری طور پر دستیاب نہیں ہوتیں۔' },
        { title: 'ڈاکٹر کی ملاقات کی تیاری موجود نہیں', detail: 'مریض مشاورت کے دوران سوالات اور تاریخ بھول جاتے ہیں۔' },
        { title: 'دیکھ بھال کرنے والوں کے لیے کوئی طریقہ کار نہیں', detail: 'والدین کی دیکھ بھال کرنے والے بچے اب بھی WhatsApp کالز پر انحصار کرتے ہیں۔' },
      ],
      solutions: [
        { headline: 'دیہی بھارت کے لیے بنایا گیا', sub: 'سست انٹرنیٹ، کوئی بھی فون، کوئی بھی زبان — G1 وہاں کام کرتا ہے جہاں دوسرے نہیں کرتے۔' },
        { headline: 'ہر رپورٹ زندہ رہتی ہے', sub: 'ایک بار اپ لوڈ کریں، ہمیشہ پوچھیں۔ آپ کا ریکارڈ وقت کے ساتھ زیادہ ہوشیار ہوتا ہے۔' },
        { headline: 'سوچنے والی صحت کی ٹائم لائن', sub: 'علامات، دوائیں اور ملاقاتیں — مہینوں اور سالوں میں جڑی ہوئیں۔' },
        { headline: 'آپ کا پورا خاندان، ایک ہی جگہ', sub: 'ایپ بدلے بغیر والدین، بچوں اور اپنی صحت کا خیال رکھیں۔' },
        { headline: 'ایک ریکارڈ، تمام ڈاکٹرز', sub: 'Practo سے Apollo اور مقامی کلینک تک — G1 سب کچھ یکجا کرتا ہے۔' },
        { headline: 'انٹرنیٹ کے بغیر بھی کام کرتا ہے', sub: 'بلڈ گروپ، الرجی، دوائیں — ہمیشہ دستیاب، آف لائن بھی۔' },
      ],
    },
    india: {
      eyebrow: 'علاقائی رسائی',
      heading: 'کوئی گھر پیچھے نہیں رہے گا۔',
      cardLine1: 'بھارت کا',
      cardLine2: 'ہر کونہ۔',
      cardBody:
        'زیادہ تر ہیلتھ ایپس جن نیم شہری اور دیہی گھرانوں کو نظرانداز کرتی ہیں، یہ انہی کے لیے بنایا گیا ہے۔ سست انٹرنیٹ، عام فون، اور انگریزی نہ آنا — یہ سب پہلے دن سے مان لیا گیا ہے۔',
      askIn: 'G1 سے پوچھیں',
      statsLabels: ['زبانیں اور بولیاں', 'سست نیٹ ورکس پر بھی چلتا ہے', 'ریاستیں، ایک ساتھی'],
    },
    cityGrid: {
      hubLabel: 'پروجیکٹ',
      features: [
        '20+ بولیوں میں چیٹ',
        'روزانہ ڈاکٹر رپورٹس',
        'امیج اسکین فعال',
        'یوگا کوچنگ لائیو',
        'آواز مشاورت بڑھ رہی ہے',
        'آف لائن ریکارڈز استعمال میں',
        'ڈاکٹروں کو رپورٹس بھیجی گئیں',
        '2G پر کام کرتا ہے',
      ],
    },
    horizontalScroll: {
      eyebrow: 'G1 کیا کرتا ہے',
      scrollHint: 'خصوصیات دیکھنے کے لیے سکرول کریں',
      featureWord: 'فیچر',
      closingTitle: 'مزید جلد آ رہا ہے۔',
      closingCta: 'Voice AI دیکھیں ↓',
      cards: [
        { tag: 'زبان', title: 'چیٹ', sub: 'آپ کی زبان میں، آپ کی بولی میں', body: 'ہندی، بھوجپوری، تمل، ہنگلش — G1 سے اس زبان میں کچھ بھی پوچھیں جس میں آپ سوچتے ہیں۔ نیچے دائیں کونے سے پھیلتا ہے۔' },
        { tag: 'مشاورت', title: 'آواز', sub: 'بولیں — ڈاکٹر رپورٹ حاصل کریں', body: 'اپنی علامات بلند آواز میں بولیں۔ G1 10 طبی سوالات پوچھتا ہے، ایک منظم رپورٹ بناتا ہے، اور اسے آپ کے ڈاکٹر کو بھیجتا ہے۔' },
        { tag: 'بصری AI', title: 'اسکین', sub: 'اپنی علامات کی تصویر لیں', body: 'خارش، جلن، بالوں کے مسئلے کی تصویر لیں یا ایکس رے اپ لوڈ کریں۔ G1 اسے پڑھتا ہے اور بتاتا ہے کہ کس چیز پر توجہ درکار ہے۔' },
        { tag: 'حرکت', title: 'یوگا', sub: 'ریئل ٹائم کرنسی رہنمائی', body: 'اپنے کیمرے کے سامنے ایک کرنسی رکھیں۔ G1 ریئل ٹائم میں آپ کی حالت دیکھتا ہے اور بتاتا ہے کہ اگلی طرف کب جانا ہے۔' },
        { tag: 'رسائی', title: 'آف لائن', sub: 'انٹرنیٹ کے بغیر کام کرتا ہے', body: 'بلڈ گروپ، الرجی، جاری دوائیں — سگنل نہ ہونے پر بھی، کسی بھی فون پر فوراً دستیاب۔' },
        { tag: 'ریکارڈ', title: 'یادداشت', sub: 'آپ کی صحت، یاد رکھی گئی', body: 'ہر رپورٹ، علامت، دوا اور ڈاکٹر کی ملاقات — وقت کے ساتھ جڑی ہوئی تاکہ ہر ملاقات پر آپ کی مکمل کہانی تیار ہو۔' },
      ],
    },
    trust: {
      line1: 'اعتماد، شروع سے ہی —',
      line2: 'بعد میں نہیں جوڑا گیا۔',
      caption: 'فولڈرز کو گھسیٹیں، یا کسی ایک پر کلک کریں۔',
      folders: [
        { title: 'رازداری', sub: 'آپ کا ڈیٹا آپ کا ہی رہتا ہے', rows: ['خفیہ کردہ صحت کے ریکارڈز', 'کبھی نہیں بیچا جاتا', 'ہر شیئر پر آپ کا کنٹرول', 'کبھی بھی حذف کریں'] },
        { title: 'ایمانداری', sub: 'ہر جواب، وضاحت کے ساتھ', rows: ['استدلال چھپایا نہیں، دکھایا جاتا ہے', 'قابل تصدیق ذرائع', 'واضح "ڈاکٹر سے ملیں" اشارے', 'طبی رہنمائی کے مطابق جانچا گیا'] },
        { title: 'تیاری', sub: 'ہنگامی صورتحال میں ساتھ', rows: ['بلڈ گروپ اور الرجی آف لائن', 'دواؤں کی فہرست آف لائن', 'سگنل کے بغیر بھی کام کرتا ہے', 'ون ٹیپ ایمرجنسی کارڈ'] },
      ],
    },
    chatbot: {
      title: 'G1 اسسٹنٹ',
      subtitle: 'اپنی زبان میں علامات کے بارے میں پوچھیں',
      placeholder: 'اپنا پیغام ٹائپ کریں…',
      greeting: 'سلام، میں G1 ہوں۔ کسی بھی زبان میں بتائیں کہ آپ کو کیا تکلیف ہے۔',
      pickLanguage: 'شروع کرنے کے لیے ایک زبان منتخب کریں',
      continueIn: 'جاری رکھیں',
      changeLanguage: 'تبدیل کریں',
      helpfulQuestion: 'کیا یہ مددگار تھا؟',
      quickReplies: ['سر درد ہے', 'جلد پر خارش'],
      errorFallback: 'کچھ غلط ہو گیا۔ براہ کرم تھوڑی دیر بعد دوبارہ کوشش کریں۔',
      listening: 'سن رہا ہوں…',
    },
    ctaText: 'اپنی صحت کی کہانی شروع کریں',
    footer: { tagline: 'بھارت کے لیے بنایا گیا۔', disclaimer: 'یہ پیشہ ورانہ طبی مشورے کا متبادل نہیں ہے۔' },
  },
}
