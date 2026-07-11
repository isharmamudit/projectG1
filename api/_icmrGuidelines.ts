// Shared by api/chat.ts and api/voice-chat.ts via a plain relative import —
// unlike src/* files, this works because it's a same-directory sibling, not
// a "@/*" path-aliased import (Vercel's function bundler doesn't share
// tsconfig.app.json's path aliases, but plain relative imports within api/
// bundle together fine).
//
// Each entry is a hand-distilled summary (not a verbatim reproduction) of a
// real, official ICMR Standard Treatment Workflow PDF, cited by source. This
// is deliberately simple keyword-matched retrieval, not vector search — fine
// for a handful of documents, but will need a real embedding index if this
// library grows much larger.
export interface IcmrGuideline {
  id: string
  title: string
  keywords: string[]
  summary: string
  source: string
}

export const ICMR_GUIDELINES: IcmrGuideline[] = [
  {
    id: 'acs',
    title: 'ICMR STW — Unstable Angina/NSTEMI',
    keywords: [
      'chest pain', 'chest pressure', 'chest heaviness', 'chest tightness', 'angina',
      'seene mein dard', 'seene mein bojh', 'seene par bojh', 'heart attack', 'dil ka dora',
    ],
    summary:
      'Consider angina if: diffuse retrosternal pain, heaviness, or constriction, radiating to arms/neck/back, associated with sweating, easily reproduced by post-meal exertion; atypical presentation may be exertional fatigue, breathlessness, or epigastric discomfort — more likely in a known CAD patient or with multiple risk factors. Suspect acute coronary syndrome if: pain at rest or lasting >20 minutes, recent worsening of known stable angina, new-onset angina within the last month, or post-infarction angina. RED FLAGS — refer as emergency to the nearest PCI/thrombolysis-capable centre: pain lasting >20 minutes, recurrent or ongoing rest pain, associated breathlessness/profuse sweating/syncope, hemodynamic instability. Angina is LESS likely if: pain location is variable or vague, lasts hours-to-days or under a minute, is confined to above the jaw or below the epigastrium, is sharply localized to one point, has a pricking/stabbing quality, or is brought on by neck/arm movement or breathing.',
    source: 'ICMR Standard Treatment Workflow — Unstable Angina/NSTEMI (Jan 2026), icmr.gov.in',
  },
  {
    id: 'headache',
    title: 'ICMR STW — Headache',
    keywords: ['headache', 'sir dard', 'sar dard', 'migraine', 'sir bhaari'],
    summary:
      'RED FLAGS requiring urgent referral: first or worst headache of the patient\'s life; focal neurologic signs (not typical migraine aura); severe headache that wakes the patient from sleep; headache with fever plus a change in personality, mental status, or level of consciousness; fever with neck stiffness or meningism; a new severe headache during pregnancy, postpartum, or while on hormone treatment; rapid onset with strenuous exercise; sudden/thunderclap onset reaching maximal intensity within seconds to minutes; a new headache type in a patient with malignancy or immunosuppression. A continuous, progressive headache lasting more than one week also needs referral (possible cerebral venous thrombosis, an intracranial space-occupying lesion, meningitis, or abscess).',
    source: 'ICMR Standard Treatment Workflow — Headache (Oct 2019), icmr.gov.in',
  },
  {
    id: 'dengue',
    title: 'ICMR STW — Dengue Fever',
    keywords: ['dengue', 'fever and body pain', 'fever aur badan dard', 'fever and joint pain'],
    summary:
      'Suspect dengue if fever plus at least two of: nausea, vomiting, rash, myalgia, headache, retro-orbital pain, arthralgia, or hemorrhagic manifestations — especially with residence in or recent travel to a dengue-endemic area. WARNING SIGNS (dengue with warning signs, needs referral): abdominal pain or tenderness, persistent vomiting, clinical fluid accumulation (pleural effusion/ascites), mucosal bleeding (malena, epistaxis, gum bleeding), liver enlargement greater than 2cm. SEVERE DENGUE — emergency: shock (weak rapid pulse, pulse pressure under 20mmHg, cold clammy skin, restlessness), severe bleeding, fluid accumulation with respiratory distress, or impaired consciousness. Uncomplicated dengue without warning signs: symptomatic ambulatory treatment, paracetamol for fever (avoid NSAIDs), daily monitoring of platelets and PCV.',
    source: 'ICMR Standard Treatment Workflow — Dengue Fever (Oct 2019), icmr.gov.in',
  },
]

/** Simple substring/keyword match against the latest user message. Returns
 * at most 2 guidelines to avoid bloating the prompt with tangential matches. */
export function retrieveIcmrGuidance(message: string): IcmrGuideline[] {
  const text = message.toLowerCase()
  return ICMR_GUIDELINES.filter((g) => g.keywords.some((k) => text.includes(k.toLowerCase()))).slice(0, 2)
}
