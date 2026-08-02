/**
 * BCP-47 locale tags for the Web Speech API's SpeechRecognition, keyed by
 * our own LANGUAGES[].code. Odia and Assamese are omitted deliberately —
 * Chrome's speech-recognition backend doesn't reliably support them, so the
 * mic button is disabled for those two rather than silently failing.
 */
export const SPEECH_LOCALES: Partial<Record<string, string>> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  pa: 'pa-IN',
  ur: 'ur-IN',
  // Web Speech has no Hinglish mode — hi-IN gets us spoken Hindi/Hinglish
  // words transcribed (in Devanagari), which is the closest available.
  'hi-en': 'hi-IN',
}

export function speechLocaleFor(languageCode: string): string | undefined {
  return SPEECH_LOCALES[languageCode]
}
