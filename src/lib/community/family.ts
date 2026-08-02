/**
 * Family Health Circle — local storage model.
 *
 * Deliberately lightweight: no messaging, no social features.
 * Pure health coordination — medicine reminders, daily check-ins,
 * appointments, and emergency contacts.
 *
 * Storage key: sehat-family-v1
 */

export type Relationship =
  | 'self'
  | 'spouse'
  | 'parent'
  | 'child'
  | 'sibling'
  | 'grandparent'
  | 'other'

export type CheckinStatus = 'great' | 'good' | 'okay' | 'sick' | null

export interface FamilyMember {
  id: string
  name: string
  relationship: Relationship
  age: number
  avatarColor: string   // CSS color token, e.g. 'tint-sage'
  isEmergencyContact: boolean
  phone?: string
}

export interface MedicineReminder {
  id: string
  memberId: string
  medicineName: string
  dosage: string
  /** HH:MM */
  time: string
  takenDates: string[]  // YYYY-MM-DD strings
}

export interface Appointment {
  id: string
  memberId: string
  title: string
  date: string     // ISO date
  time?: string    // HH:MM
  location?: string
  notes?: string
}

export interface FamilyCheckin {
  memberId: string
  /** YYYY-MM-DD */
  date: string
  status: CheckinStatus
  timestamp: number
}

export interface SharedGoal {
  id: string
  title: string
  emoji: string
  targetValue: number
  unit: string
  currentValue: number
  deadline?: string  // ISO date
}

export interface FamilyData {
  familyName: string
  members: FamilyMember[]
  reminders: MedicineReminder[]
  appointments: Appointment[]
  checkins: FamilyCheckin[]
  sharedGoals: SharedGoal[]
}

const STORAGE_KEY = 'sehat-family-v1'

const AVATAR_COLORS = [
  'tint-sage', 'tint-amber', 'tint-blue', 'tint-rose',
  'tint-violet', 'tint-teal',
]

function nextAvatarColor(existing: FamilyMember[]): string {
  return AVATAR_COLORS[existing.length % AVATAR_COLORS.length]
}

const DEFAULT_DATA: FamilyData = {
  familyName: 'My Family',
  members: [],
  reminders: [],
  appointments: [],
  checkins: [],
  sharedGoals: [
    {
      id: 'goal-steps',
      title: 'Family Step Challenge',
      emoji: '🚶',
      targetValue: 200000,
      unit: 'steps',
      currentValue: 0,
      deadline: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    },
    {
      id: 'goal-water',
      title: 'Drink Water Together',
      emoji: '💧',
      targetValue: 240,
      unit: 'glasses',
      currentValue: 0,
      deadline: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    },
  ],
}

export function loadFamilyData(): FamilyData {
  if (typeof window === 'undefined') return { ...DEFAULT_DATA }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_DATA }
    const parsed = JSON.parse(raw) as Partial<FamilyData>
    return {
      familyName: parsed.familyName ?? DEFAULT_DATA.familyName,
      members: parsed.members ?? [],
      reminders: parsed.reminders ?? [],
      appointments: parsed.appointments ?? [],
      checkins: parsed.checkins ?? [],
      sharedGoals: parsed.sharedGoals ?? DEFAULT_DATA.sharedGoals,
    }
  } catch {
    return { ...DEFAULT_DATA }
  }
}

export function saveFamilyData(data: FamilyData): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function addMember(data: FamilyData, member: Omit<FamilyMember, 'id' | 'avatarColor'>): FamilyData {
  const newMember: FamilyMember = {
    ...member,
    id: `member-${Date.now()}`,
    avatarColor: nextAvatarColor(data.members),
  }
  return { ...data, members: [...data.members, newMember] }
}

export function removeMember(data: FamilyData, memberId: string): FamilyData {
  return {
    ...data,
    members: data.members.filter((m) => m.id !== memberId),
    reminders: data.reminders.filter((r) => r.memberId !== memberId),
    appointments: data.appointments.filter((a) => a.memberId !== memberId),
    checkins: data.checkins.filter((c) => c.memberId !== memberId),
  }
}

export function addReminder(data: FamilyData, reminder: Omit<MedicineReminder, 'id' | 'takenDates'>): FamilyData {
  const newReminder: MedicineReminder = {
    ...reminder,
    id: `reminder-${Date.now()}`,
    takenDates: [],
  }
  return { ...data, reminders: [...data.reminders, newReminder] }
}

export function markReminderTaken(data: FamilyData, reminderId: string): FamilyData {
  const today = new Date().toISOString().slice(0, 10)
  return {
    ...data,
    reminders: data.reminders.map((r) =>
      r.id === reminderId
        ? { ...r, takenDates: r.takenDates.includes(today) ? r.takenDates : [...r.takenDates, today] }
        : r,
    ),
  }
}

export function isReminderTakenToday(reminder: MedicineReminder): boolean {
  const today = new Date().toISOString().slice(0, 10)
  return reminder.takenDates.includes(today)
}

export function recordCheckin(data: FamilyData, memberId: string, status: CheckinStatus): FamilyData {
  const today = new Date().toISOString().slice(0, 10)
  const checkin: FamilyCheckin = { memberId, date: today, status, timestamp: Date.now() }
  // One per member per day — replace if exists
  const existing = data.checkins.filter((c) => !(c.memberId === memberId && c.date === today))
  return { ...data, checkins: [...existing, checkin] }
}

export function getTodayCheckin(data: FamilyData, memberId: string): FamilyCheckin | null {
  const today = new Date().toISOString().slice(0, 10)
  return data.checkins.find((c) => c.memberId === memberId && c.date === today) ?? null
}

export function updateSharedGoal(data: FamilyData, goalId: string, delta: number): FamilyData {
  return {
    ...data,
    sharedGoals: data.sharedGoals.map((g) =>
      g.id === goalId
        ? { ...g, currentValue: Math.min(g.currentValue + delta, g.targetValue) }
        : g,
    ),
  }
}

export const CHECKIN_EMOJI: Record<NonNullable<CheckinStatus>, string> = {
  great: '😊',
  good:  '🙂',
  okay:  '😐',
  sick:  '😷',
}

export const CHECKIN_LABEL: Record<NonNullable<CheckinStatus>, string> = {
  great: 'Great',
  good:  'Good',
  okay:  'Okay',
  sick:  'Sick',
}

export const RELATIONSHIP_LABEL: Record<Relationship, string> = {
  self:        'Self',
  spouse:      'Spouse',
  parent:      'Parent',
  child:       'Child',
  sibling:     'Sibling',
  grandparent: 'Grandparent',
  other:       'Other',
}
