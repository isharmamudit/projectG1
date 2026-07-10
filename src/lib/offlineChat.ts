import { CreateMLCEngine, type MLCEngineInterface, type InitProgressReport } from '@mlc-ai/web-llm'

// Smallest instruct model WebLLM ships prebuilt compiled libs for — picked
// deliberately over the 3B/8B variants so the one-time download (~900MB)
// and runtime memory footprint stay within reach of budget Android phones,
// which is the whole audience this feature is for. Quality is meaningfully
// weaker than the Groq-hosted llama-3.3-70b behind the online chat/voice
// features — this is a fallback for zero connectivity, not a replacement.
export const OFFLINE_MODEL_ID = 'Llama-3.2-1B-Instruct-q4f16_1-MLC'

export function offlineWebGpuSupported(): boolean {
  return typeof navigator !== 'undefined' && Boolean((navigator as unknown as { gpu?: unknown }).gpu)
}

// Deliberately short and simple — small on-device models follow long,
// densely-layered instructions (like the full DoctorLLM India prompt used
// online) far less reliably. This trades sophistication for a much higher
// chance the model actually obeys the one rule that matters most: escalate
// real emergencies to a human/108-112, don't try to be clever about them.
export const OFFLINE_SYSTEM_PROMPT = [
  `You are G1 Offline, a basic health assistant running fully on this device with no internet connection. You are simpler and less reliable than the full G1 assistant, so always be cautious.`,
  `Never claim to be a real doctor. Never say you examined the patient. Never give an exact medicine dose.`,
  `If the person describes anything that could be a real emergency — chest pain, severe bleeding, trouble breathing, sudden weakness or numbness on one side, seizure, unconsciousness, severe allergic reaction, poisoning, snake bite, suicidal thoughts, or similar — tell them plainly this may be an emergency, tell them to call 108 or 112 right now, and tell them to open this app's offline Emergency Guide for step-by-step first aid. Do not try to handle it yourself.`,
  `For everything else: ask one or two simple questions (what the problem is, how long, how bad) before giving general, low-risk suggestions. Keep every answer short — 2 to 4 plain sentences, no lists, no markdown.`,
  `If you are unsure, or the question is not about health, say you can only help with basic health questions here, and suggest they try the full G1 assistant when they have internet, or check the Emergency Guide.`,
].join(' ')

export interface OfflineChatTurn {
  role: 'user' | 'assistant'
  content: string
}

let enginePromise: Promise<MLCEngineInterface> | null = null

export function loadOfflineEngine(onProgress: (report: InitProgressReport) => void): Promise<MLCEngineInterface> {
  if (!enginePromise) {
    enginePromise = CreateMLCEngine(OFFLINE_MODEL_ID, { initProgressCallback: onProgress })
  }
  return enginePromise
}

export async function* streamOfflineReply(engine: MLCEngineInterface, history: OfflineChatTurn[]) {
  const stream = await engine.chat.completions.create({
    messages: [{ role: 'system', content: OFFLINE_SYSTEM_PROMPT }, ...history],
    stream: true,
    temperature: 0.5,
    max_tokens: 200,
  })
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
  }
}
