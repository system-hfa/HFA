import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'node:fs'
import path from 'node:path'

export type AIProvider = 'deepseek' | 'openai' | 'anthropic' | 'google' | 'groq'

let llmConfigLogged = false
const DEFAULT_DEEPSEEK_MODEL = 'deepseek-reasoner'

function loadFrontendEnvLocal(options?: { overrideAiKeys?: boolean }): void {
  const envPath = path.resolve(process.cwd(), 'frontend/.env.local')
  if (!fs.existsSync(envPath)) return
  const overrideKeys = new Set([
    'AI_PROVIDER',
    'DEEPSEEK_API_KEY',
    'DEEPSEEK_MODEL',
    'DEEPSEEK_TEMPERATURE',
    'DEEPSEEK_TOP_P',
    'OPENAI_API_KEY',
    'OPENAI_MODEL',
    'ANTHROPIC_API_KEY',
    'ANTHROPIC_MODEL',
    'GOOGLE_API_KEY',
    'GOOGLE_GENERATIVE_AI_API_KEY',
    'GOOGLE_MODEL',
    'GROQ_API_KEY',
    'GROQ_MODEL',
  ])
  const content = fs.readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key] || (options?.overrideAiKeys && overrideKeys.has(key))) process.env[key] = value
  }
}

function isSeraTestContext(): boolean {
  return Boolean(
    process.env.SERA_N_RUNS ||
      process.env.SERA_FIXTURE ||
      process.argv.some((a) => a.includes('tests/sera/run.ts') || a.includes('tests/sera/'))
  )
}

function resolveDeepseekConfig() {
  const seraContext = isSeraTestContext()
  loadFrontendEnvLocal({ overrideAiKeys: seraContext })
  const model = process.env.DEEPSEEK_MODEL ?? DEFAULT_DEEPSEEK_MODEL
  const temperature = seraContext ? 0 : Number(process.env.DEEPSEEK_TEMPERATURE ?? '0')
  const topP = seraContext ? 1 : Number(process.env.DEEPSEEK_TOP_P ?? '1')

  if (!llmConfigLogged) {
    llmConfigLogged = true
    console.log('[SERA LLM CONFIG]', {
      provider: 'deepseek',
      model,
      temperature,
      top_p: topP
    })
  }

  return { model, temperature, topP }
}

export function getActiveProvider(): AIProvider {
  loadFrontendEnvLocal({ overrideAiKeys: isSeraTestContext() })
  const p = (process.env.AI_PROVIDER ?? 'deepseek').toLowerCase()
  // Only accept known providers; fall back to deepseek for safety.
  if (p === 'deepseek' || p === 'openai' || p === 'anthropic' || p === 'google' || p === 'groq')
    return p
  return 'deepseek'
}

export function getModelName(provider?: AIProvider): string {
  const p = provider ?? getActiveProvider()
  const deepseek = resolveDeepseekConfig()
  const models: Record<AIProvider, string> = {
    deepseek: deepseek.model,
    openai: process.env.OPENAI_MODEL || 'gpt-4o',
    anthropic: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
    google: process.env.GOOGLE_MODEL || 'gemini-2.0-flash',
    groq: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
  }
  return models[p]
}

function requireApiKey(envName: string, hint?: string): string {
  const v = process.env[envName]?.trim()
  const extra = hint ? ` ${hint}` : ''
  if (v && !v.includes('****')) return v
  if (v?.includes('****')) {
    throw new Error(
      `${envName} contém uma chave mascarada e não pode ser usada para chamada LLM.${extra} Configure a chave real em frontend/.env.local (ou no hospedeiro da API).`
    )
  }
  throw new Error(
    `${envName} não está definida.${extra} Configure em frontend/.env.local (ou no hospedeiro da API).`
  )
}

function extractJsonBlock(text: string): string {
  let t = text.trim()
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fence) t = fence[1]!.trim()
  const obj = t.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  if (obj) return obj[1]!
  return t
}

function sanitizeJsonCandidate(raw: string): string {
  const candidate = extractJsonBlock(raw).trim()
  let result = ''
  let inString = false
  let escaped = false

  for (const char of candidate) {
    const code = char.charCodeAt(0)

    if (escaped) {
      result += char
      escaped = false
      continue
    }

    if (char === '\\') {
      result += char
      escaped = true
      continue
    }

    if (char === '"') {
      result += char
      inString = !inString
      continue
    }

    if (code < 0x20) {
      if (inString) {
        result += ' '
      } else if (char === '\n' || char === '\r' || char === '\t') {
        result += char
      }
      continue
    }

    result += char
  }

  return result.trim()
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
    const deepseek = resolveDeepseekConfig()
    const client = new OpenAI({
      apiKey: requireApiKey(
        'DEEPSEEK_API_KEY',
        'O padrão é DeepSeek (AI_PROVIDER não definido ou = deepseek). Para usar OpenAI, defina AI_PROVIDER=openai e OPENAI_API_KEY.'
      ),
      baseURL: 'https://api.deepseek.com/v1',
    })
    const r = await client.chat.completions.create({
      model: deepseek.model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
      max_tokens: Math.min(maxTokens, 16000),
      temperature: deepseek.temperature,
      top_p: deepseek.topP,
    })
    raw = r.choices[0]?.message?.content || ''
  }

  return raw
}

export function safeParse(raw: string, step: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch (_) {}

  const cleaned = extractJsonBlock(raw)
  try {
    return JSON.parse(cleaned) as Record<string, unknown>
  } catch (_) {}

  const sanitized = sanitizeJsonCandidate(cleaned)
  try {
    return JSON.parse(sanitized) as Record<string, unknown>
  } catch (_) {}

  const sanitizedRaw = sanitizeJsonCandidate(raw)
  try {
    return JSON.parse(sanitizedRaw) as Record<string, unknown>
  } catch (e) {
    const preview = raw.slice(0, 600)
    throw new Error(`Falha ao parsear JSON na ${step}: ${String(e)} — ${preview}`)
  }
}

export async function ask(
  system: string,
  user: string,
  opts?: { maxTokens?: number }
): Promise<string> {
  const MAX_RETRIES = 2
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callAi(system, user, opts?.maxTokens ?? 16000)
    } catch (e: unknown) {
      lastError = e instanceof Error ? e : new Error(String(e))
      if (!lastError.message.includes('Falha ao parsear JSON')) throw lastError
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
      }
    }
  }

  throw lastError!
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
