import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  Check,
  Phone,
  Plus,
  ShieldAlert,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProgressRing } from '@/components/community/ProgressRing'
import {
  loadFamilyData,
  saveFamilyData,
  addMember,
  removeMember,
  addReminder,
  markReminderTaken,
  recordCheckin,
  getTodayCheckin,
  isReminderTakenToday,
  updateSharedGoal,
  CHECKIN_EMOJI,
  CHECKIN_LABEL,
  RELATIONSHIP_LABEL,
  type FamilyData,
  type FamilyMember,
  type CheckinStatus,
  type Relationship,
} from '@/lib/community/family'

// ── Avatar ───────────────────────────────────────────────────────────────
const AVATAR_BG: Record<string, string> = {
  'tint-sage':   'bg-tint-sage/20 text-tint-sage',
  'tint-amber':  'bg-tint-amber/20 text-tint-amber',
  'tint-blue':   'bg-tint-blue/20 text-tint-blue',
  'tint-rose':   'bg-tint-rose/20 text-tint-rose',
  'tint-violet': 'bg-tint-violet/20 text-tint-violet',
  'tint-teal':   'bg-tint-teal/20 text-tint-teal',
}

function Avatar({ member, size = 40 }: { member: FamilyMember; size?: number }) {
  const bg = AVATAR_BG[member.avatarColor] ?? 'bg-surface-2 text-fg-muted'
  const initial = member.name.charAt(0).toUpperCase()
  return (
    <div
      className={cn('flex shrink-0 items-center justify-center rounded-full font-black', bg)}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden
    >
      {initial}
    </div>
  )
}

// ── Add Member Modal ──────────────────────────────────────────────────────
function AddMemberModal({
  onAdd,
  onClose,
}: {
  onAdd: (m: Omit<FamilyMember, 'id' | 'avatarColor'>) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [relationship, setRelationship] = useState<Relationship>('child')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [isEmergency, setIsEmergency] = useState(false)

  const RELATIONSHIPS: Relationship[] = ['self', 'spouse', 'parent', 'child', 'sibling', 'grandparent', 'other']

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !age) return
    onAdd({
      name: name.trim(),
      relationship,
      age: Number(age),
      phone: phone.trim() || undefined,
      isEmergencyContact: isEmergency,
    })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-fg/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl border border-border bg-surface p-6 sm:rounded-3xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-black text-fg">Add Family Member</h2>
          <button type="button" onClick={onClose} className="flex size-8 items-center justify-center rounded-full text-fg-muted hover:bg-surface-2">
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fm-name" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">Name</label>
            <input
              id="fm-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-2xl border border-border bg-paper px-3.5 py-2.5 text-[13.5px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fm-rel" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">Relationship</label>
              <select
                id="fm-rel"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as Relationship)}
                className="w-full rounded-2xl border border-border bg-paper px-3 py-2.5 text-[13.5px] text-fg focus:border-accent focus:outline-none"
              >
                {RELATIONSHIPS.map((r) => (
                  <option key={r} value={r}>{RELATIONSHIP_LABEL[r]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fm-age" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">Age</label>
              <input
                id="fm-age"
                type="number"
                required
                min={0}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="w-full rounded-2xl border border-border bg-paper px-3.5 py-2.5 text-[13.5px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fm-phone" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">Phone (optional)</label>
            <input
              id="fm-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full rounded-2xl border border-border bg-paper px-3.5 py-2.5 text-[13.5px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={isEmergency}
              onChange={(e) => setIsEmergency(e.target.checked)}
              className="size-4 rounded accent-accent"
            />
            <span className="text-[13px] font-bold text-fg">Mark as emergency contact</span>
          </label>

          <button
            type="submit"
            disabled={!name.trim() || !age}
            className="w-full rounded-2xl bg-accent py-3 text-[13.5px] font-bold text-accent-fg transition-opacity disabled:opacity-40"
          >
            Add Member
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── Add Reminder Modal ────────────────────────────────────────────────────
function AddReminderModal({
  members,
  onAdd,
  onClose,
}: {
  members: FamilyMember[]
  onAdd: (memberId: string, name: string, dosage: string, time: string) => void
  onClose: () => void
}) {
  const [memberId, setMemberId] = useState(members[0]?.id ?? '')
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [time, setTime] = useState('08:00')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !memberId) return
    onAdd(memberId, name.trim(), dosage.trim(), time)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-fg/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl border border-border bg-surface p-6 sm:rounded-3xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-black text-fg">Add Medicine Reminder</h2>
          <button type="button" onClick={onClose} className="flex size-8 items-center justify-center rounded-full text-fg-muted hover:bg-surface-2">
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rem-member" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">For</label>
            <select
              id="rem-member"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="w-full rounded-2xl border border-border bg-paper px-3 py-2.5 text-[13.5px] text-fg focus:border-accent focus:outline-none"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rem-name" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">Medicine</label>
              <input
                id="rem-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Metformin"
                className="w-full rounded-2xl border border-border bg-paper px-3.5 py-2.5 text-[13.5px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="rem-time" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">Time</label>
              <input
                id="rem-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-2xl border border-border bg-paper px-3.5 py-2.5 text-[13.5px] text-fg focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="rem-dosage" className="mb-1.5 block text-[12px] font-black text-fg-muted uppercase tracking-wide">Dosage (optional)</label>
            <input
              id="rem-dosage"
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g. 500mg, 1 tablet"
              className="w-full rounded-2xl border border-border bg-paper px-3.5 py-2.5 text-[13.5px] text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !memberId}
            className="w-full rounded-2xl bg-accent py-3 text-[13.5px] font-bold text-accent-fg transition-opacity disabled:opacity-40"
          >
            Add Reminder
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

/**
 * Family Health Circle page.
 *
 * Intentionally lightweight — health coordination, not social media.
 * All data in localStorage. Route: /community/family
 */
export function Family() {
  const [data, setData] = useState<FamilyData>(() => loadFamilyData())
  const [showAddMember, setShowAddMember] = useState(false)
  const [showAddReminder, setShowAddReminder] = useState(false)
  const [showSOS, setShowSOS] = useState(false)
  const [activeTab, setActiveTab] = useState<'checkin' | 'reminders' | 'goals'>('checkin')

  const persist = useCallback((next: FamilyData) => {
    setData(next)
    saveFamilyData(next)
  }, [])

  const handleAddMember = (m: Omit<FamilyMember, 'id' | 'avatarColor'>) => {
    persist(addMember(data, m))
  }

  const handleRemoveMember = (id: string) => {
    persist(removeMember(data, id))
  }

  const handleCheckin = (memberId: string, status: CheckinStatus) => {
    persist(recordCheckin(data, memberId, status))
  }

  const handleMarkTaken = (reminderId: string) => {
    persist(markReminderTaken(data, reminderId))
  }

  const handleAddReminder = (memberId: string, medicineName: string, dosage: string, time: string) => {
    persist(addReminder(data, { memberId, medicineName, dosage, time }))
  }

  const handleGoalIncrement = (goalId: string) => {
    persist(updateSharedGoal(data, goalId, 1))
  }

  const emergencyContacts = data.members.filter((m) => m.isEmergencyContact || m.phone)
  const CHECKIN_STATUSES: NonNullable<CheckinStatus>[] = ['great', 'good', 'okay', 'sick']
  const TABS = [
    { id: 'checkin' as const, label: 'Daily Check-in' },
    { id: 'reminders' as const, label: 'Medicines' },
    { id: 'goals' as const, label: 'Goals' },
  ]

  return (
    <div className="space-y-6">
      {/* Family header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-[20px] font-black text-fg">{data.familyName}</h2>
          <p className="text-[12px] text-fg-muted">{data.members.length} member{data.members.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Emergency SOS */}
          <button
            type="button"
            onClick={() => setShowSOS(true)}
            className="flex items-center gap-1.5 rounded-2xl bg-sehat-alert/10 px-3 py-2.5 text-[12.5px] font-black text-sehat-alert transition-colors hover:bg-sehat-alert/20"
            aria-label="Emergency SOS"
          >
            <ShieldAlert className="size-4" strokeWidth={2.5} />
            SOS
          </button>
          <button
            type="button"
            onClick={() => setShowAddMember(true)}
            className="flex items-center gap-1.5 rounded-2xl bg-accent px-3 py-2.5 text-[12.5px] font-bold text-accent-fg"
          >
            <UserPlus className="size-4" strokeWidth={2.5} />
            Add
          </button>
        </div>
      </div>

      {/* Empty state */}
      {data.members.length === 0 && (
        <div className="flex flex-col items-center rounded-3xl border border-border bg-surface py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-surface-2">
            <Users className="size-7 text-fg-subtle" strokeWidth={1.5} />
          </div>
          <p className="mt-4 font-display text-[17px] font-black text-fg">No family members yet</p>
          <p className="mt-1.5 max-w-[220px] text-[12.5px] leading-relaxed text-fg-muted">
            Add your family members to coordinate health and track check-ins together.
          </p>
          <button
            type="button"
            onClick={() => setShowAddMember(true)}
            className="mt-5 flex items-center gap-2 rounded-2xl bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-fg"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            Add First Member
          </button>
        </div>
      )}

      {data.members.length > 0 && (
        <>
          {/* Tab nav */}
          <div className="flex gap-1 rounded-2xl bg-surface-2 p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 rounded-xl py-2 text-[12.5px] font-bold transition-all',
                  activeTab === tab.id
                    ? 'bg-surface text-fg shadow-sm'
                    : 'text-fg-muted hover:text-fg',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Daily Check-in */}
          {activeTab === 'checkin' && (
            <div className="space-y-3">
              {data.members.map((member, i) => {
                const checkin = getTodayCheckin(data, member.id)
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4"
                  >
                    <Avatar member={member} size={44} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-fg">{member.name}</p>
                      <p className="text-[11px] text-fg-muted">{RELATIONSHIP_LABEL[member.relationship]} · {member.age}y</p>
                    </div>
                    {/* Check-in buttons */}
                    <div className="flex gap-1.5">
                      {CHECKIN_STATUSES.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleCheckin(member.id, status)}
                          aria-label={CHECKIN_LABEL[status]}
                          title={CHECKIN_LABEL[status]}
                          className={cn(
                            'flex size-9 items-center justify-center rounded-xl text-[18px] transition-all',
                            checkin?.status === status
                              ? 'bg-accent-soft ring-2 ring-accent/30 scale-110'
                              : 'bg-surface-2 opacity-60 hover:opacity-100',
                          )}
                        >
                          {CHECKIN_EMOJI[status]}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      aria-label={`Remove ${member.name}`}
                      className="ml-1 flex size-7 shrink-0 items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
                    >
                      <Trash2 className="size-3.5" strokeWidth={2.5} />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Medicine Reminders */}
          {activeTab === 'reminders' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowAddReminder(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3 text-[13px] font-bold text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                <Plus className="size-4" strokeWidth={2.5} />
                Add Medicine Reminder
              </button>

              {data.reminders.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Bell className="size-8 text-fg-subtle" strokeWidth={1.5} />
                  <p className="mt-3 font-bold text-fg">No reminders yet</p>
                  <p className="mt-1 text-[12.5px] text-fg-muted">Add medicine reminders for any family member.</p>
                </div>
              ) : (
                data.reminders.map((reminder, i) => {
                  const member = data.members.find((m) => m.id === reminder.memberId)
                  const taken = isReminderTakenToday(reminder)
                  return (
                    <motion.div
                      key={reminder.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border p-4 transition-colors',
                        taken ? 'border-tint-sage/25 bg-tint-sage/8' : 'border-border bg-surface',
                      )}
                    >
                      {member && <Avatar member={member} size={36} />}
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-fg">{reminder.medicineName}</p>
                        <p className="text-[11px] text-fg-muted">
                          {reminder.dosage && `${reminder.dosage} · `}{reminder.time}
                          {member && ` · ${member.name}`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleMarkTaken(reminder.id)}
                        disabled={taken}
                        aria-label={taken ? 'Already taken today' : 'Mark as taken'}
                        className={cn(
                          'flex size-9 items-center justify-center rounded-xl transition-all',
                          taken
                            ? 'bg-tint-sage/20 text-tint-sage'
                            : 'border border-border bg-surface-2 text-fg-muted hover:border-accent hover:text-accent',
                        )}
                      >
                        <Check className="size-4" strokeWidth={2.5} />
                      </button>
                    </motion.div>
                  )
                })
              )}
            </div>
          )}

          {/* Shared Goals */}
          {activeTab === 'goals' && (
            <div className="space-y-3">
              {data.sharedGoals.map((goal, i) => {
                const pct = Math.min(goal.currentValue / goal.targetValue, 1)
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
                  >
                    <ProgressRing progress={pct} size={56} strokeWidth={5}>
                      <span className="text-[18px]">{goal.emoji}</span>
                    </ProgressRing>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-fg">{goal.title}</p>
                      <p className="text-[11.5px] text-fg-muted">
                        {goal.currentValue.toLocaleString('en-IN')} / {goal.targetValue.toLocaleString('en-IN')} {goal.unit}
                      </p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fg/8">
                        <motion.div
                          className="h-full rounded-full bg-accent"
                          initial={{ width: '0%' }}
                          animate={{ width: `${pct * 100}%` }}
                          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGoalIncrement(goal.id)}
                      disabled={pct >= 1}
                      aria-label={`Log progress for ${goal.title}`}
                      className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors hover:bg-accent/20 disabled:opacity-40"
                    >
                      <Plus className="size-4" strokeWidth={2.5} />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* SOS overlay */}
      <AnimatePresence>
        {showSOS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-fg/60 backdrop-blur-sm sm:items-center"
            onClick={() => setShowSOS(false)}
          >
            <motion.div
              initial={{ y: 64, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 64, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-t-3xl border border-sehat-alert/30 bg-surface p-6 sm:rounded-3xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-5 text-sehat-alert" strokeWidth={2.5} />
                  <h2 className="font-display text-[18px] font-black text-fg">Emergency Contacts</h2>
                </div>
                <button type="button" onClick={() => setShowSOS(false)} className="flex size-8 items-center justify-center rounded-full text-fg-muted hover:bg-surface-2">
                  <X className="size-4" strokeWidth={2.5} />
                </button>
              </div>

              {/* Always show 108 and 14416 */}
              <div className="space-y-2.5">
                <a
                  href="tel:108"
                  className="flex w-full items-center gap-3 rounded-2xl bg-sehat-alert/10 p-3.5 transition-colors hover:bg-sehat-alert/20"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-sehat-alert/20">
                    <Phone className="size-5 text-sehat-alert" strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="font-black text-fg">Ambulance · 108</p>
                    <p className="text-[11px] text-fg-muted">National Emergency Number</p>
                  </div>
                </a>

                <a
                  href="tel:14416"
                  className="flex w-full items-center gap-3 rounded-2xl bg-accent-soft p-3.5 transition-colors hover:bg-accent/20"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15">
                    <Phone className="size-5 text-accent" strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="font-black text-fg">Tele-MANAS · 14416</p>
                    <p className="text-[11px] text-fg-muted">Mental Health Helpline · Free · 24h</p>
                  </div>
                </a>

                {emergencyContacts.map((m) => (
                  <a
                    key={m.id}
                    href={m.phone ? `tel:${m.phone}` : undefined}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl border border-border bg-surface-2 p-3.5 transition-colors',
                      m.phone && 'hover:bg-surface cursor-pointer',
                    )}
                  >
                    <Avatar member={m} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-fg">{m.name}</p>
                      <p className="text-[11px] text-fg-muted">
                        {RELATIONSHIP_LABEL[m.relationship]}
                        {m.phone && ` · ${m.phone}`}
                      </p>
                    </div>
                    {m.phone && <Phone className="size-4 text-fg-subtle" strokeWidth={2.25} />}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showAddMember && (
          <AddMemberModal onAdd={handleAddMember} onClose={() => setShowAddMember(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddReminder && data.members.length > 0 && (
          <AddReminderModal
            members={data.members}
            onAdd={handleAddReminder}
            onClose={() => setShowAddReminder(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
