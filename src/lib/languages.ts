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
  }
  trust: {
    line1: string
    line2: string
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
    },
    trust: { line1: 'Trust, built in —', line2: 'not bolted on.' },
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
    },
    trust: { line1: 'भरोसा, शुरू से जुड़ा —', line2: 'बाद में नहीं जोड़ा।' },
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
    },
    trust: { line1: 'বিশ্বাস, শুরু থেকেই যুক্ত —', line2: 'পরে জোড়া লাগানো নয়।' },
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
    },
    trust: { line1: 'நம்பிக்கை, ஆரம்பத்திலிருந்தே —', line2: 'பின்னர் சேர்க்கப்பட்டதல்ல.' },
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
    },
    trust: { line1: 'నమ్మకం, మొదటి నుండే —', line2: 'తర్వాత జోడించింది కాదు.' },
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
    },
    trust: { line1: 'विश्वास, सुरुवातीपासूनच —', line2: 'नंतर जोडलेला नाही.' },
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
    },
    trust: { line1: 'ભરોસો, શરૂઆતથી જ —', line2: 'પછીથી જોડેલો નહીં.' },
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
    },
    trust: { line1: 'ನಂಬಿಕೆ, ಮೊದಲಿನಿಂದಲೇ —', line2: 'ನಂತರ ಸೇರಿಸಿದ್ದಲ್ಲ.' },
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
    },
    trust: { line1: 'ਭਰੋਸਾ, ਸ਼ੁਰੂ ਤੋਂ ਹੀ —', line2: 'ਬਾਅਦ ਵਿੱਚ ਨਹੀਂ ਜੋੜਿਆ।' },
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
    },
    trust: { line1: 'ବିଶ୍ୱାସ, ପ୍ରାରମ୍ଭରୁ ହିଁ —', line2: 'ପରେ ଯୋଡ଼ା ହୋଇନାହିଁ।' },
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
    },
    trust: { line1: 'বিশ্বাস, আৰম্ভণিৰ পৰাই —', line2: 'পিছত যোগ কৰা নহয়।' },
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
    },
    trust: { line1: 'اعتماد، شروع سے ہی —', line2: 'بعد میں نہیں جوڑا گیا۔' },
    ctaText: 'اپنی صحت کی کہانی شروع کریں',
    footer: { tagline: 'بھارت کے لیے بنایا گیا۔', disclaimer: 'یہ پیشہ ورانہ طبی مشورے کا متبادل نہیں ہے۔' },
  },
}
