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
  problems: {
    eyebrow: string
    tabProblems: string
    tabSolutions: string
    heading: string
    subhead: string
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
    problems: {
      eyebrow: "Explore what's",
      tabProblems: 'Competitor Gaps',
      tabSolutions: 'G1 Solutions',
      heading: 'What every health app gets wrong.',
      subhead:
        'Existing apps were built for English-speaking, urban, tech-fluent users. ProjectG1 was built for everyone else.',
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
    problems: {
      eyebrow: 'देखें',
      tabProblems: 'दूसरों की कमियां',
      tabSolutions: 'G1 के समाधान',
      heading: 'हर हेल्थ ऐप कहां चूक जाता है।',
      subhead: 'मौजूदा ऐप्स अंग्रेज़ी बोलने वाले, शहरी, तकनीक-जानकार लोगों के लिए बने थे। ProjectG1 बाकी सबके लिए बनाया गया है।',
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
    problems: {
      eyebrow: 'দেখুন',
      tabProblems: 'প্রতিযোগীদের ঘাটতি',
      tabSolutions: 'G1-এর সমাধান',
      heading: 'প্রতিটি হেলথ অ্যাপ যেখানে ভুল করে।',
      subhead: 'বর্তমান অ্যাপগুলো ইংরেজি-ভাষী, শহুরে, প্রযুক্তি-দক্ষ ব্যবহারকারীদের জন্য তৈরি। ProjectG1 বাকি সবার জন্য তৈরি।',
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
    problems: {
      eyebrow: 'பாருங்கள்',
      tabProblems: 'போட்டியாளர் குறைபாடுகள்',
      tabSolutions: 'G1 தீர்வுகள்',
      heading: 'ஒவ்வொரு சுகாதார ஆப்பும் தவறு செய்யும் இடம்.',
      subhead: 'தற்போதைய ஆப்கள் ஆங்கிலம் பேசும், நகர்ப்புற, தொழில்நுட்ப அறிவுள்ள பயனர்களுக்காக உருவாக்கப்பட்டவை. ProjectG1 மற்ற அனைவருக்காகவும் உருவாக்கப்பட்டது.',
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
    problems: {
      eyebrow: 'చూడండి',
      tabProblems: 'పోటీదారుల లోపాలు',
      tabSolutions: 'G1 పరిష్కారాలు',
      heading: 'ప్రతి హెల్త్ యాప్ ఎక్కడ తప్పు చేస్తుంది.',
      subhead: 'ఇప్పటి యాప్‌లు ఇంగ్లీష్ మాట్లాడే, పట్టణ, టెక్ నేర్పరులైన వినియోగదారుల కోసం తయారయ్యాయి. ProjectG1 మిగతా వారందరి కోసం తయారైంది.',
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
    problems: {
      eyebrow: 'पहा',
      tabProblems: 'स्पर्धकांच्या त्रुटी',
      tabSolutions: 'G1 उपाय',
      heading: 'प्रत्येक हेल्थ अ‍ॅप कुठे चुकतो.',
      subhead: 'सध्याचे अ‍ॅप्स इंग्रजी बोलणाऱ्या, शहरी, तंत्रज्ञान-जाणकार वापरकर्त्यांसाठी बनले होते. ProjectG1 इतर सर्वांसाठी बनवले आहे.',
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
    problems: {
      eyebrow: 'જુઓ',
      tabProblems: 'હરીફોની ખામીઓ',
      tabSolutions: 'G1 ઉકેલો',
      heading: 'દરેક હેલ્થ એપ ક્યાં ભૂલ કરે છે.',
      subhead: 'હાલની એપ્સ અંગ્રેજી બોલતા, શહેરી, ટેક-જાણકાર વપરાશકર્તાઓ માટે બનેલી હતી. ProjectG1 બાકીના બધા માટે બનાવવામાં આવ્યું છે.',
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
    problems: {
      eyebrow: 'ನೋಡಿ',
      tabProblems: 'ಪ್ರತಿಸ್ಪರ್ಧಿಗಳ ಕೊರತೆಗಳು',
      tabSolutions: 'G1 ಪರಿಹಾರಗಳು',
      heading: 'ಪ್ರತಿ ಆರೋಗ್ಯ ಆ್ಯಪ್ ಎಲ್ಲಿ ತಪ್ಪುತ್ತದೆ.',
      subhead: 'ಇರುವ ಆ್ಯಪ್‌ಗಳು ಇಂಗ್ಲಿಷ್ ಮಾತನಾಡುವ, ನಗರ, ತಂತ್ರಜ್ಞಾನ-ಪರಿಣತ ಬಳಕೆದಾರರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿತ್ತು. ProjectG1 ಉಳಿದೆಲ್ಲರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
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
    problems: {
      eyebrow: 'ਵੇਖੋ',
      tabProblems: 'ਮੁਕਾਬਲੇਬਾਜ਼ਾਂ ਦੀਆਂ ਕਮੀਆਂ',
      tabSolutions: 'G1 ਦੇ ਹੱਲ',
      heading: 'ਹਰ ਹੈਲਥ ਐਪ ਕਿੱਥੇ ਗ਼ਲਤ ਹੁੰਦਾ ਹੈ।',
      subhead: 'ਮੌਜੂਦਾ ਐਪਸ ਅੰਗਰੇਜ਼ੀ ਬੋਲਣ ਵਾਲੇ, ਸ਼ਹਿਰੀ, ਤਕਨੀਕ-ਜਾਣੂ ਵਰਤੋਂਕਾਰਾਂ ਲਈ ਬਣੇ ਸਨ। ProjectG1 ਬਾਕੀ ਸਾਰਿਆਂ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ।',
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
    problems: {
      eyebrow: 'ଦେଖନ୍ତୁ',
      tabProblems: 'ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀଙ୍କ ତ୍ରୁଟି',
      tabSolutions: 'G1 ସମାଧାନ',
      heading: 'ପ୍ରତ୍ୟେକ ହେଲ୍ଥ ଆପ୍ କେଉଁଠି ଭୁଲ୍ କରେ।',
      subhead: 'ପ୍ରଚଳିତ ଆପ୍‌ଗୁଡ଼ିକ ଇଂରାଜୀ କହୁଥିବା, ସହରୀ, ଟେକ୍-ଜାଣିଥିବା ଉପଯୋଗକାରୀଙ୍କ ପାଇଁ ତିଆରି ହୋଇଥିଲା। ProjectG1 ବାକି ସମସ୍ତଙ୍କ ପାଇଁ ତିଆରି।',
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
    problems: {
      eyebrow: 'চাওক',
      tabProblems: 'প্ৰতিদ্বন্দ্বীৰ কমী',
      tabSolutions: 'G1ৰ সমাধান',
      heading: 'প্ৰতিটো হেল্থ এপে ক\'ত ভুল কৰে।',
      subhead: 'বৰ্তমানৰ এপবোৰ ইংৰাজী কোৱা, চহৰীয়া, প্ৰযুক্তি-দক্ষ ব্যৱহাৰকাৰীৰ বাবে বনোৱা হৈছিল। ProjectG1 বাকী সকলোৰে বাবে বনোৱা হৈছে।',
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
    problems: {
      eyebrow: 'دیکھیں',
      tabProblems: 'حریفوں کی خامیاں',
      tabSolutions: 'G1 کے حل',
      heading: 'ہر ہیلتھ ایپ کہاں غلطی کرتا ہے۔',
      subhead: 'موجودہ ایپس انگریزی بولنے والے، شہری، تکنیکی طور پر ماہر صارفین کے لیے بنائے گئے تھے۔ ProjectG1 باقی سب کے لیے بنایا گیا ہے۔',
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
