import type { VercelRequest, VercelResponse } from '@vercel/node'

interface VoiceTtsRequestBody {
  text: string
}

const GROQ_TTS_ENDPOINT = 'https://api.groq.com/openai/v1/audio/speech'
// PlayAI TTS was decommissioned by Groq — Orpheus is the current TTS model.
// Requires one-time terms acceptance by the Groq org admin at
// https://console.groq.com/playground?model=canopylabs%2Forpheus-v1-english
const MODEL = 'canopylabs/orpheus-v1-english'
// Valid voices for this model: autumn, diana, hannah, austin, daniel, troy.
const VOICE = 'daniel'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    console.error('GROQ_API_KEY is not set')
    res.status(500).json({ error: 'Server is not configured' })
    return
  }

  const body = req.body as VoiceTtsRequestBody
  const text = typeof body?.text === 'string' ? body.text.trim() : ''

  if (!text) {
    res.status(400).json({ error: 'Text is required' })
    return
  }

  try {
    const upstream = await fetch(GROQ_TTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input: text,
        voice: VOICE,
        response_format: 'wav',
      }),
    })

    if (!upstream.ok) {
      const errBody = await upstream.text()
      console.error('Groq TTS request failed:', upstream.status, errBody)
      res.status(502).json({ error: 'Failed to generate speech' })
      return
    }

    const audioBuffer = Buffer.from(await upstream.arrayBuffer())
    res.setHeader('Content-Type', 'audio/wav')
    res.status(200).send(audioBuffer)
  } catch (err) {
    console.error('Groq TTS request failed:', err)
    res.status(502).json({ error: 'Failed to generate speech' })
  }
}
