/**
 * Health Camps directory — seeded demo data.
 *
 * Organised by district. Architecture is API-ready: replace CAMPS_DATA with
 * a fetch call and the components downstream need zero changes.
 *
 * Categories mirror India's national health programme camp types.
 */

export type CampCategory =
  | 'blood_donation'
  | 'vaccination'
  | 'eye_camp'
  | 'diabetes'
  | 'tb_screening'
  | 'general'
  | 'phc'

export interface HealthCamp {
  id: string
  name: string
  category: CampCategory
  organiser: string
  date: string        // ISO date string
  endDate?: string    // ISO date string for multi-day
  district: string
  state: string
  address: string
  distance?: string   // "2.3 km" — populated from user location in real API
  description: string
  contact?: string
  free: boolean
  slots?: number      // available slots, undefined = unlimited
}

export const CATEGORY_META: Record<
  CampCategory,
  { label: string; accent: string; icon: string }
> = {
  blood_donation: { label: 'Blood Donation', accent: 'tint-rose', icon: 'Droplet' },
  vaccination:    { label: 'Vaccination',    accent: 'tint-sage', icon: 'Syringe' },
  eye_camp:       { label: 'Eye Camp',       accent: 'tint-blue', icon: 'Eye' },
  diabetes:       { label: 'Diabetes Screening', accent: 'tint-amber', icon: 'HeartPulse' },
  tb_screening:   { label: 'TB Screening',   accent: 'tint-teal', icon: 'Microscope' },
  general:        { label: 'General Health', accent: 'tint-violet', icon: 'Stethoscope' },
  phc:            { label: 'PHC Camp',       accent: 'tint-sage', icon: 'Building2' },
}

// ── Seeded demo data ────────────────────────────────────────────────────────
// Dates are relative to August 2026 to match hackathon context.
export const CAMPS_DATA: HealthCamp[] = [
  {
    id: 'camp-001',
    name: 'National Blood Donation Drive',
    category: 'blood_donation',
    organiser: 'Red Cross Society, Delhi Chapter',
    date: '2026-08-05',
    district: 'New Delhi',
    state: 'Delhi',
    address: 'AIIMS Gate 2, Ansari Nagar, New Delhi',
    distance: '1.2 km',
    description: 'Annual blood donation camp. All blood groups accepted. Certificate provided.',
    contact: '011-26588500',
    free: true,
    slots: 200,
  },
  {
    id: 'camp-002',
    name: 'Free TB Screening Camp',
    category: 'tb_screening',
    organiser: 'Central TB Division, Ministry of Health',
    date: '2026-08-07',
    endDate: '2026-08-09',
    district: 'New Delhi',
    state: 'Delhi',
    address: 'PHC Motibagh, Mandir Marg, New Delhi',
    distance: '0.8 km',
    description: 'Free sputum test and chest X-ray for anyone with cough lasting 2+ weeks. NIKSHAY-linked.',
    contact: '1800-11-6666',
    free: true,
  },
  {
    id: 'camp-003',
    name: 'Diabetes & Hypertension Screening',
    category: 'diabetes',
    organiser: 'AIIMS Endocrinology Department',
    date: '2026-08-10',
    district: 'New Delhi',
    state: 'Delhi',
    address: 'AIIMS OPD Block, New Delhi',
    distance: '1.5 km',
    description: 'Free HbA1c, fasting glucose, and BP check. High-risk individuals get free follow-up.',
    contact: '011-26593308',
    free: true,
    slots: 150,
  },
  {
    id: 'camp-004',
    name: 'School Vaccination Drive',
    category: 'vaccination',
    organiser: 'Delhi Health Department',
    date: '2026-08-12',
    district: 'New Delhi',
    state: 'Delhi',
    address: 'MCD School, Karol Bagh, New Delhi',
    distance: '3.1 km',
    description: 'Routine immunisation for children 5–12 years. Bring vaccination record card.',
    free: true,
  },
  {
    id: 'camp-005',
    name: 'Free Eye Check-Up Camp',
    category: 'eye_camp',
    organiser: 'Shroff Charity Eye Hospital',
    date: '2026-08-14',
    district: 'New Delhi',
    state: 'Delhi',
    address: 'Daryaganj Community Hall, New Delhi',
    distance: '2.7 km',
    description: 'Vision testing, glasses prescription, glaucoma screening. Free spectacles for BPL patients.',
    contact: '011-23272038',
    free: true,
    slots: 300,
  },
  {
    id: 'camp-006',
    name: 'Rural Health Camp',
    category: 'general',
    organiser: 'Doctors For You NGO',
    date: '2026-08-03',
    endDate: '2026-08-04',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    address: 'PHC Sardhana, Meerut District',
    distance: '45 km',
    description: 'General physician consultation, basic pathology, and medicine distribution.',
    free: true,
  },
  {
    id: 'camp-007',
    name: 'Monthly PHC Health Camp',
    category: 'phc',
    organiser: 'Government of Delhi',
    date: '2026-08-15',
    district: 'New Delhi',
    state: 'Delhi',
    address: 'PHC Rajouri Garden, New Delhi',
    distance: '4.2 km',
    description: 'Monthly government health camp. Consultation, AYUSH, dental, and maternity services.',
    free: true,
  },
  {
    id: 'camp-008',
    name: 'Free Blood Donation',
    category: 'blood_donation',
    organiser: 'Rotary Club Mumbai South',
    date: '2026-08-06',
    district: 'Mumbai',
    state: 'Maharashtra',
    address: 'Churchgate Station Plaza, Mumbai',
    distance: '2.1 km',
    description: 'Voluntary blood donation. All donors receive refreshments and health report.',
    free: true,
    slots: 400,
  },
  {
    id: 'camp-009',
    name: 'TB Awareness & Screening',
    category: 'tb_screening',
    organiser: 'Maharashtra TB Cell',
    date: '2026-08-08',
    district: 'Mumbai',
    state: 'Maharashtra',
    address: 'BMC Health Post, Dharavi, Mumbai',
    distance: '5.8 km',
    description: 'Free cough-reflex test, sputum microscopy, and X-ray for high-risk patients.',
    free: true,
  },
  {
    id: 'camp-010',
    name: 'Diabetic Foot Care Camp',
    category: 'diabetes',
    organiser: 'KEM Hospital',
    date: '2026-08-11',
    district: 'Mumbai',
    state: 'Maharashtra',
    address: 'KEM Hospital OPD, Parel, Mumbai',
    distance: '3.3 km',
    description: 'Foot examination, neuropathy test, and nail care for diabetic patients.',
    free: true,
    slots: 80,
  },
  {
    id: 'camp-011',
    name: 'Village Eye Screening',
    category: 'eye_camp',
    organiser: 'Aravind Eye Care',
    date: '2026-08-16',
    district: 'Madurai',
    state: 'Tamil Nadu',
    address: 'Panchayat Office, Sholavandan, Madurai',
    distance: '12 km',
    description: 'Free vision screening. Patients with cataracts referred for free surgery.',
    free: true,
  },
  {
    id: 'camp-012',
    name: 'Community Vaccination Camp',
    category: 'vaccination',
    organiser: 'Tamil Nadu Health Department',
    date: '2026-08-13',
    district: 'Chennai',
    state: 'Tamil Nadu',
    address: 'Royapuram Community Hall, Chennai',
    distance: '6.5 km',
    description: 'COVID booster, flu vaccine, and HPV vaccination for women 15–45 years.',
    free: true,
    slots: 500,
  },
]

export function getCamps(options?: {
  district?: string
  category?: CampCategory
  query?: string
}): HealthCamp[] {
  let filtered = [...CAMPS_DATA]

  if (options?.district && options.district !== 'all') {
    filtered = filtered.filter((c) =>
      c.district.toLowerCase().includes(options.district!.toLowerCase()),
    )
  }
  if (options?.category) {
    filtered = filtered.filter((c) => c.category === options.category)
  }
  if (options?.query) {
    const q = options.query.toLowerCase()
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.organiser.toLowerCase().includes(q),
    )
  }

  // Sort by date ascending
  return filtered.sort((a, b) => a.date.localeCompare(b.date))
}

export function getDistricts(): string[] {
  const set = new Set(CAMPS_DATA.map((c) => c.district))
  return ['all', ...Array.from(set).sort()]
}

export function formatCampDate(dateStr: string, endDateStr?: string): string {
  const fmt = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  if (endDateStr) return `${fmt(dateStr)} – ${fmt(endDateStr)}`
  return fmt(dateStr)
}

export function isCampUpcoming(camp: HealthCamp): boolean {
  const today = new Date().toISOString().slice(0, 10)
  return camp.date >= today
}
