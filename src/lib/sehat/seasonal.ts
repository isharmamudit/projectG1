/**
 * Seasonal prevention system — data and logic.
 *
 * Cards are driven by the current calendar month and an optional district
 * string. No API required: all content is static and bundled.
 *
 * Season mapping is based on India's meteorological seasons:
 *   Summer   : March – May   (months 3–5)
 *   Monsoon  : June – Sept   (months 6–9)
 *   Post-M   : October – Nov (months 10–11)
 *   Winter   : Dec – Feb     (months 12, 1, 2)
 */

export type Season = 'summer' | 'monsoon' | 'post_monsoon' | 'winter'

export interface PreventionCard {
  id: string
  season: Season
  title: string
  body: string
  /** Lucide icon name */
  icon: string
  /** Tailwind tint token, e.g. 'tint-amber' */
  accent: string
  cta: string
  ctaHref: string
}

export function getSeason(month: number): Season {
  if (month >= 3 && month <= 5) return 'summer'
  if (month >= 6 && month <= 9) return 'monsoon'
  if (month >= 10 && month <= 11) return 'post_monsoon'
  return 'winter'
}

export const PREVENTION_CARDS: PreventionCard[] = [
  // ── Monsoon ──────────────────────────────────────────────────────────────
  {
    id: 'monsoon-dengue',
    season: 'monsoon',
    title: 'Prevent Dengue',
    body: 'Dengue mosquitoes breed in still water. Empty coolers, pots, and containers around your home every three days.',
    icon: 'Droplets',
    accent: 'tint-teal',
    cta: 'Dengue symptoms',
    ctaHref: 'https://www.nhp.gov.in/disease/communicable-disease/dengue',
  },
  {
    id: 'monsoon-water',
    season: 'monsoon',
    title: 'Safe Drinking Water',
    body: 'Monsoon increases waterborne illness. Boil or filter water before drinking. Use ORS if you have loose stools.',
    icon: 'GlassWater',
    accent: 'tint-blue',
    cta: 'ORS guide',
    ctaHref: 'https://www.nhp.gov.in/disease/paediatrics/diarrhoea',
  },
  {
    id: 'monsoon-mosquito',
    season: 'monsoon',
    title: 'Use Mosquito Nets',
    body: 'Sleep under treated mosquito nets. Wear full-sleeve clothing at dawn and dusk when mosquitoes are most active.',
    icon: 'Shield',
    accent: 'tint-sage',
    cta: 'Learn more',
    ctaHref: 'https://www.nhp.gov.in/disease/communicable-disease/malaria',
  },
  {
    id: 'monsoon-food',
    season: 'monsoon',
    title: 'Eat Fresh Food',
    body: 'Avoid street food and pre-cut produce during monsoon. Food spoils faster in humidity. Cook fresh where possible.',
    icon: 'UtensilsCrossed',
    accent: 'tint-amber',
    cta: 'Food safety tips',
    ctaHref: 'https://www.fssai.gov.in',
  },

  // ── Summer ───────────────────────────────────────────────────────────────
  {
    id: 'summer-hydration',
    season: 'summer',
    title: 'Stay Hydrated',
    body: 'Drink 8–10 glasses of water daily. Add a pinch of salt and sugar to water if you\'re sweating heavily — it\'s free ORS.',
    icon: 'Droplets',
    accent: 'tint-amber',
    cta: 'ORS at home',
    ctaHref: 'https://www.nhp.gov.in',
  },
  {
    id: 'summer-heatstroke',
    season: 'summer',
    title: 'Avoid Heat Stroke',
    body: 'Stay indoors between 12–4 PM. Confusion, dry skin, or stopping sweating in extreme heat are emergency signs — call 108.',
    icon: 'Thermometer',
    accent: 'tint-rose',
    cta: 'Heat stroke signs',
    ctaHref: 'https://www.nhp.gov.in',
  },
  {
    id: 'summer-ors',
    season: 'summer',
    title: 'Know ORS',
    body: 'ORS (Oral Rehydration Salts) treats dehydration and diarrhoea. Free at every ASHA worker and PHC — no prescription needed.',
    icon: 'HeartPulse',
    accent: 'tint-sage',
    cta: 'Find your PHC',
    ctaHref: 'https://hfrd.mohfw.gov.in/',
  },

  // ── Winter ───────────────────────────────────────────────────────────────
  {
    id: 'winter-hands',
    season: 'winter',
    title: 'Wash Your Hands',
    body: 'Cold and flu viruses spread through touch. Wash hands for 20 seconds before eating and after coughing or sneezing.',
    icon: 'HandMetal',
    accent: 'tint-blue',
    cta: 'WHO handwashing',
    ctaHref: 'https://www.who.int/campaigns/world-hand-hygiene-day',
  },
  {
    id: 'winter-elderly',
    season: 'winter',
    title: 'Keep Elderly Warm',
    body: 'Hypothermia can set in indoors if temperatures drop below 16°C. Extra blankets and warm liquids protect older family members.',
    icon: 'Users',
    accent: 'tint-violet',
    cta: 'Winter health tips',
    ctaHref: 'https://www.nhp.gov.in',
  },
  {
    id: 'winter-cough-cover',
    season: 'winter',
    title: 'Cover Your Cough',
    body: 'Respiratory infections peak in winter. Cover your mouth with your elbow — not your hand. Wear a mask in crowded spaces.',
    icon: 'Wind',
    accent: 'tint-teal',
    cta: 'Respiratory health',
    ctaHref: 'https://www.nhp.gov.in',
  },

  // ── Post-monsoon ─────────────────────────────────────────────────────────
  {
    id: 'postmonsoon-check',
    season: 'post_monsoon',
    title: 'Post-Monsoon Check-Up',
    body: 'October–November sees the tail of vector-borne disease. If you had a fever during monsoon, a free malaria test is available at your PHC.',
    icon: 'ClipboardCheck',
    accent: 'tint-sage',
    cta: 'Find your PHC',
    ctaHref: 'https://hfrd.mohfw.gov.in/',
  },
  {
    id: 'postmonsoon-air',
    season: 'post_monsoon',
    title: 'Air Quality Alert',
    body: 'Crop burning season raises AQI sharply. Children and the elderly with asthma should limit outdoor activity on high-AQI days.',
    icon: 'Wind',
    accent: 'tint-amber',
    cta: 'Check AQI',
    ctaHref: 'https://app.cpcbccr.com/AQI_India/',
  },
]

/**
 * Returns cards for the current season, rotated by day so the card order
 * changes daily rather than showing the same card first every time.
 */
export function getSeasonalCards(maxCards = 3): PreventionCard[] {
  const month = new Date().getMonth() + 1 // 1-based
  const season = getSeason(month)
  const cards = PREVENTION_CARDS.filter((c) => c.season === season)
  if (cards.length === 0) return []

  // Day-based rotation: shift by day-of-month so the order changes daily.
  const dayOffset = new Date().getDate() % cards.length
  const rotated = [...cards.slice(dayOffset), ...cards.slice(0, dayOffset)]
  return rotated.slice(0, maxCards)
}

export function getSeasonLabel(season: Season): string {
  const labels: Record<Season, string> = {
    summer: 'Summer',
    monsoon: 'Monsoon',
    post_monsoon: 'Post-Monsoon',
    winter: 'Winter',
  }
  return labels[season]
}

export function getCurrentSeasonLabel(): string {
  const month = new Date().getMonth() + 1
  return getSeasonLabel(getSeason(month))
}
