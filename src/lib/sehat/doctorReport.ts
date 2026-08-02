/**
 * Doctor Visit Companion — report generation and PDF export.
 *
 * Extends the existing jspdf-based report.ts pattern for the symptom
 * history context. Generates a pre-consultation summary from stored
 * triage sessions, not from AI — the questions are static and curated,
 * the summary is constructed from structured data, not model-generated.
 *
 * Safety constraint: no diagnostic language. Only observations and
 * "a clinical evaluation is recommended."
 */

import { jsPDF } from 'jspdf'
import type { SymptomSession, WatchlistSymptom } from '@/lib/sehat/symptomHistory'

export interface DoctorVisitReport {
  generatedAt: number
  sessionCount: number
  spanDays: number
  primarySymptoms: WatchlistSymptom[]
  timeline: Array<{ date: string; symptoms: WatchlistSymptom[]; level: string }>
  aiSummary: string
  recommendation: string
  questionsForDoctor: string[]
}

const SYMPTOM_LABELS: Record<WatchlistSymptom, string> = {
  cough: 'Persistent cough',
  fever: 'Recurring fever',
  weight_loss: 'Unexplained weight loss',
}

const QUESTIONS_BY_SYMPTOM: Record<WatchlistSymptom, string[]> = {
  cough: [
    'What conditions could be causing this recurring cough?',
    'Should I undergo any diagnostic tests — such as a chest X-ray or sputum test?',
    'Is the cough duration clinically significant for TB screening?',
    'What warning signs should I monitor at home?',
    'When should I return if the cough continues or worsens?',
  ],
  fever: [
    'What conditions could be causing this recurring fever?',
    'Are any blood tests — such as malaria, typhoid, or CBC — recommended?',
    'Are the fever patterns concerning enough for immediate treatment?',
    'Should I stop any current medications before the tests?',
    'When should I return if the fever does not resolve?',
  ],
  weight_loss: [
    'What conditions could explain this unintended weight loss?',
    'What diagnostic tests would help narrow down the cause?',
    'Are these symptoms concerning enough for immediate referral?',
    'What dietary changes should I make while we investigate?',
    'When should I return if the weight loss continues?',
  ],
}

export function buildDoctorVisitReport(
  sessions: SymptomSession[],
  primarySymptoms: WatchlistSymptom[],
): DoctorVisitReport {
  if (sessions.length === 0 || primarySymptoms.length === 0) {
    throw new Error('No data to generate report')
  }

  const sorted = [...sessions].sort((a, b) => a.timestamp - b.timestamp)
  const first = sorted[0].timestamp
  const last = sorted[sorted.length - 1].timestamp
  const spanDays = Math.round((last - first) / 86_400_000) + 1

  const timeline = sorted.map((s) => ({
    date: new Date(s.timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    symptoms: s.detectedSymptoms,
    level: s.level,
  }))

  // Build AI-style summary (deterministic, not model-generated)
  const symptomPhrases = primarySymptoms.map((s) => SYMPTOM_LABELS[s].toLowerCase())
  let summary = ''
  if (symptomPhrases.length === 1) {
    summary = `${SYMPTOM_LABELS[primarySymptoms[0]]} has been reported across ${sessions.length} assessment${sessions.length > 1 ? 's' : ''} over ${spanDays} day${spanDays > 1 ? 's' : ''}.`
  } else {
    summary = `${symptomPhrases.slice(0, -1).join(', ')} and ${symptomPhrases[symptomPhrases.length - 1]} have been reported across ${sessions.length} assessments over ${spanDays} days.`
  }
  summary += ' Based on the duration and recurrence of these symptoms, a clinical evaluation is recommended.'

  const recommendation =
    primarySymptoms.includes('cough') && spanDays >= 14
      ? 'Medical evaluation recommended. Free TB screening is available at your nearest Primary Health Centre — no prescription required.'
      : 'Medical evaluation recommended. Consult a doctor at your nearest PHC or district hospital.'

  // Pick questions for the most prominent symptom
  const questions = QUESTIONS_BY_SYMPTOM[primarySymptoms[0]].slice(0, 5)

  return {
    generatedAt: Date.now(),
    sessionCount: sessions.length,
    spanDays,
    primarySymptoms,
    timeline,
    aiSummary: summary,
    recommendation,
    questionsForDoctor: questions,
  }
}

export function downloadDoctorVisitPdf(report: DoctorVisitReport, patientName?: string): void {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const marginX = 48
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - marginX * 2
  let y = 56

  const ensureSpace = (needed: number) => {
    const pageHeight = doc.internal.pageSize.getHeight()
    if (y + needed > pageHeight - 48) {
      doc.addPage()
      y = 56
    }
  }

  const heading = (text: string, size = 12.5) => {
    ensureSpace(30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(size)
    doc.setTextColor(18, 24, 26)
    doc.text(text, marginX, y)
    y += 20
  }

  const para = (text: string, color = 0) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10.5)
    doc.setTextColor(color)
    const lines = doc.splitTextToSize(text, contentWidth)
    ensureSpace(lines.length * 14 + 8)
    doc.text(lines, marginX, y)
    y += lines.length * 14 + 10
  }

  const line = () => {
    ensureSpace(12)
    doc.setDrawColor(220)
    doc.line(marginX, y, pageWidth - marginX, y)
    y += 16
  }

  // Header
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(13, 115, 119)
  doc.text('CareBuddy — Doctor Visit Companion', marginX, y)
  y += 22
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(100)
  const generated = new Date(report.generatedAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  doc.text(`Pre-consultation summary · Generated ${generated}`, marginX, y)
  y += 14
  if (patientName) {
    doc.text(`Patient: ${patientName}`, marginX, y)
    y += 14
  }
  doc.setTextColor(0)
  line()

  heading('AI Health Summary')
  para(report.aiSummary)

  heading('Symptom Timeline')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  for (const entry of report.timeline) {
    ensureSpace(20)
    const symptoms = entry.symptoms.map((s) => SYMPTOM_LABELS[s]).join(', ') || 'General symptoms'
    const lines = doc.splitTextToSize(`${entry.date}   ${symptoms}`, contentWidth - 20)
    doc.text(lines, marginX + 12, y)
    y += lines.length * 14 + 4
  }
  y += 8

  heading('Current Symptoms')
  const chips = report.primarySymptoms.map((s) => SYMPTOM_LABELS[s]).join('   ·   ')
  para(chips)

  heading('Recommendation')
  para(report.recommendation)

  heading('Questions to Ask Your Doctor')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10.5)
  for (const q of report.questionsForDoctor) {
    const lines = doc.splitTextToSize(`•  ${q}`, contentWidth - 8)
    ensureSpace(lines.length * 14 + 4)
    doc.text(lines, marginX, y)
    y += lines.length * 14 + 6
  }
  y += 6

  line()
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(120)
  const disclaimer = doc.splitTextToSize(
    'This report summarises information entered by the user across multiple symptom assessments in the CareBuddy health app. It is not a diagnosis and is intended solely to help a licensed doctor understand the context before an in-person consultation.',
    contentWidth,
  )
  doc.text(disclaimer, marginX, y)

  doc.save(`carebuddy-doctor-visit-companion-${Date.now()}.pdf`)
}
