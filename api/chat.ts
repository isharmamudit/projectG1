import type { VercelRequest, VercelResponse } from '@vercel/node'

// Kept self-contained (not imported from src/lib/languages.ts) so this
// function has no cross-project TS path-alias dependency on the Vite app —
// Vercel's function bundler doesn't share tsconfig.app.json's "@/*" paths.
const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  mr: 'Marathi',
  gu: 'Gujarati',
  kn: 'Kannada',
  pa: 'Punjabi',
  or: 'Odia',
  as: 'Assamese',
  ur: 'Urdu',
}

interface ChatTurn {
  role: 'user' | 'ai'
  text: string
}

interface ChatRequestBody {
  message: string
  history?: ChatTurn[]
  languageCode?: string
  image?: { dataUrl: string; mimeType: string }
}

const MAX_HISTORY_TURNS = 15
const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'

function systemInstructionFor(languageCode: string) {
  const languageName = LANGUAGE_NAMES[languageCode] ?? 'English'
  return `You are G1, a multilingual health information assistant for an Indian audience. Always reply in ${languageName}, regardless of what language the user's message is written in, unless they clearly ask to switch languages. You provide general health, wellness, and preventive-care information only — you are not a doctor. Never diagnose a condition, never prescribe medication or dosages, and never claim certainty about what's wrong. If a message describes anything serious, urgent, or emergency-like, clearly and calmly recommend seeking in-person medical care right away. Keep your tone warm, simple, and reassuring — avoid alarming language. When giving any health-specific guidance, close with a brief reminder that this isn't a substitute for professional medical advice. Keep replies concise — a few short sentences, not an essay.`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    console.error('DEEPSEEK_API_KEY is not set')
    res.status(500).json({ error: 'Server is not configured' })
    return
  }

  const body = req.body as ChatRequestBody
  const message = typeof body?.message === 'string' ? body.message.trim() : ''
  const languageCode = typeof body?.languageCode === 'string' ? body.languageCode : 'en'
  const history = Array.isArray(body?.history) ? body.history.slice(-MAX_HISTORY_TURNS) : []
  const hasImage = typeof body?.image?.dataUrl === 'string'

  if (!message && !hasImage) {
    res.status(400).json({ error: 'Message is required' })
    return
  }

  try {
    // deepseek-chat is text-only — it can't actually see the attached image.
    // Rather than pretend otherwise, tell the model an image came in (so it
    // can ask the user to describe it) instead of silently ignoring it.
    const userContent = hasImage
      ? `${message || '(no caption)'}\n\n[The user also attached a photo. This model cannot view images directly — acknowledge the attachment and ask the user to briefly describe what it shows so you can help.]`
      : message

    const messages = [
      { role: 'system', content: systemInstructionFor(languageCode) },
      ...history.map((turn) => ({
        role: turn.role === 'ai' ? 'assistant' : 'user',
        content: turn.text,
      })),
      { role: 'user', content: userContent },
    ]

    const upstream = await fetch(DEEPSEEK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    })

    if (!upstream.ok) {
      const errBody = await upstream.text()
      console.error('DeepSeek request failed:', upstream.status, errBody)
      res.status(502).json({ error: 'Failed to get a response' })
      return
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      res.status(502).json({ error: 'No response from model' })
      return
    }

    res.status(200).json({ reply })
  } catch (err) {
    console.error('DeepSeek request failed:', err)
    res.status(502).json({ error: 'Failed to get a response' })
  }
}
