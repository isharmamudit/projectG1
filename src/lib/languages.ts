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
  },
}
