import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'

export type AIProvider = 'deepseek' | 'openai' | 'anthropic' | 'google' | 'groq'

export function getActiveProvider(): AIProvider {
  const p = (process.env.AI_PROVIDER ?? 'deepseek').toLowerCase()
  // Only accept known providers; fall back to deepseek for safety.
  if (p === 'deepseek' || p === 'openai' || p === 'anthropic' || p === 'google' || p === 'groq')
    return p
  return 'deepseek'
}

export function getModelName(provider?: AIProvider): string {
  const p = provider ?? getActiveProvider()
  const models: Record<AIProvider, string> = {
    deepseek: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    openai: process.env.OPENAI_MODEL || 'gpt-4o',
    anthropic: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
    google: process.env.GOOGLE_MODEL || 'gemini-2.0-flash',
    groq: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
  }
  return models[p]
}

function requireApiKey(envName: string, hint?: string): string {
  const v = process.env[envName]?.trim()
  if (v) return v
  const extra = hint ? ` ${hint}` : ''
  throw new Error(
    `${envName} não está definida.${extra} Configure em frontend/.env.local (ou no hospedeiro da API).`
  )
}

function extractJson(text: string): string {
  let t = text.trim()
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fence) t = fence[1]!.trim()
  const obj = t.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  if (obj) t = obj[1]!
  return t
}

async function callGoogle(system: string, user: string): Promise<string> {
  const key =
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()
  if (!key) {
    throw new Error(
      'Chave Google ausente: defina GOOGLE_API_KEY ou GOOGLE_GENERATIVE_AI_API_KEY.'
    )
  }

  const genAI = new GoogleGenerativeAI(key)
  const model = genAI.getGenerativeModel({
    model: getModelName('google'),
    systemInstruction: system,
  })
  const r = await model.generateContent(user)
  return r.response.text()
}

export async function callAi(system: string, userMsg: string, maxTokens = 8192): Promise<string> {
  const provider = getActiveProvider()
  let raw: string

  if (provider === 'anthropic') {
    const client = new Anthropic({ apiKey: requireApiKey('ANTHROPIC_API_KEY') })
    const msg = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
      max_tokens: maxTokens,
      system: system,
      messages: [{ role: 'user', content: userMsg }],
    })
    raw = (msg.content[0] as { text: string }).text
  } else if (provider === 'openai') {
    const client = new OpenAI({ apiKey: requireApiKey('OPENAI_API_KEY') })
    const r = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
      max_tokens: maxTokens,
    })
    raw = r.choices[0]?.message?.content || ''
  } else if (provider === 'google') {
    raw = await callGoogle(system, userMsg)
  } else if (provider === 'groq') {
    const client = new OpenAI({
      apiKey: requireApiKey('GROQ_API_KEY'),
      baseURL: 'https://api.groq.com/openai/v1',
    })
    const r = await client.chat.completions.create({
      model: getModelName('groq'),
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
      max_tokens: maxTokens,
    })
    raw = r.choices[0]?.message?.content || ''
  } else {
    /* deepseek — mesmo cliente OpenAI */
    const client = new OpenAI({
      apiKey: requireApiKey(
        'DEEPSEEK_API_KEY',
        'O padrão é DeepSeek (AI_PROVIDER não definido ou = deepseek). Para usar OpenAI, defina AI_PROVIDER=openai e OPENAI_API_KEY.'
      ),
      baseURL: 'https://api.deepseek.com/v1',
    })
    const r = await client.chat.completions.create({
      model: getModelName('deepseek'),
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
      max_tokens: maxTokens,
    })
    raw = r.choices[0]?.message?.content || ''
  }

  return extractJson(raw)
}

export function safeParse(raw: string, step: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch (e) {
    throw new Error(`Falha ao parsear JSON na ${step}: ${String(e)} — ${raw.slice(0, 400)}`)
  }
}

export async function ask(
  system: string,
  user: string,
  opts?: { maxTokens?: number }
): Promise<string> {
  return callAi(system, user, opts?.maxTokens ?? 8192)
}

/**
 * Falha cedo com mensagem clara se o provedor atual não tem chave configurada.
 * Chamar nas rotas **antes** de criar evento / debitar crédito.
 */
export function assertLlmEnvConfigured(provider?: AIProvider): void {
  const p = provider ?? getActiveProvider()
  const set = (k: string) => Boolean(process.env[k]?.trim())

  if (p === 'anthropic') {
    if (!set('ANTHROPIC_API_KEY')) throw new Error('ANTHROPIC_API_KEY não definida (AI_PROVIDER=anthropic).')
    return
  }
  if (p === 'openai') {
    if (!set('OPENAI_API_KEY')) throw new Error('OPENAI_API_KEY não definida (AI_PROVIDER=openai).')
    return
  }
  if (p === 'google') {
    if (!process.env.GOOGLE_API_KEY?.trim() && !process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()) {
      throw new Error('GOOGLE_API_KEY não definida (AI_PROVIDER=google).')
    }
    return
  }
  if (p === 'groq') {
    if (!set('GROQ_API_KEY')) throw new Error('GROQ_API_KEY não definida (AI_PROVIDER=groq).')
    return
  }
  /* deepseek */
  if (!set('DEEPSEEK_API_KEY')) throw new Error('DEEPSEEK_API_KEY não definida (AI_PROVIDER=deepseek).')
}
