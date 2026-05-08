import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import Groq from 'groq-sdk'

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
  const { GoogleGenerativeAI } = await import('@google/generative-ai')
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
    model: process.env.GOOGLE_MODEL || 'gemini-2.0-flash',
    systemInstruction: system,
  })
  const r = await model.generateContent(user)
  return r.response.text()
}

export async function callAi(system: string, userMsg: string): Promise<string> {
  const provider = (process.env.AI_PROVIDER || 'deepseek').toLowerCase()
  let raw: string

  if (provider === 'anthropic') {
    const client = new Anthropic({ apiKey: requireApiKey('ANTHROPIC_API_KEY') })
    const msg = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
      max_tokens: 4096,
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
      max_tokens: 4096,
    })
    raw = r.choices[0]?.message?.content || ''
  } else if (provider === 'google') {
    raw = await callGoogle(system, userMsg)
  } else if (provider === 'groq') {
    const client = new Groq({ apiKey: requireApiKey('GROQ_API_KEY') })
    const r = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
      max_tokens: 4096,
    })
    raw = r.choices[0]?.message?.content || ''
  } else {
    /* deepseek — mesmo cliente OpenAI */
    const client = new OpenAI({
      apiKey: requireApiKey(
        'DEEPSEEK_API_KEY',
        'O padrão é DeepSeek (AI_PROVIDER não definido ou = deepseek). Para usar OpenAI, defina AI_PROVIDER=openai e OPENAI_API_KEY.'
      ),
      baseURL: 'https://api.deepseek.com',
    })
    const r = await client.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
      max_tokens: 4096,
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

export async function ask(system: string, question: string): Promise<string> {
  return callAi(system, question)
}

/**
 * Falha cedo com mensagem clara se o provedor atual não tem chave configurada.
 * Chamar nas rotas **antes** de criar evento / debitar crédito.
 */
export function assertLlmEnvConfigured(): void {
  const provider = (process.env.AI_PROVIDER || 'deepseek').toLowerCase()
  const set = (k: string) => Boolean(process.env[k]?.trim())

  if (provider === 'anthropic') {
    if (!set('ANTHROPIC_API_KEY')) {
      throw new Error('IA não configurada: defina ANTHROPIC_API_KEY (AI_PROVIDER=anthropic).')
    }
    return
  }
  if (provider === 'openai') {
    if (!set('OPENAI_API_KEY')) {
      throw new Error(
        'IA não configurada: defina OPENAI_API_KEY ou altere AI_PROVIDER e a chave correspondente (ex.: GOOGLE_API_KEY + google).'
      )
    }
    return
  }
  if (provider === 'google') {
    if (!process.env.GOOGLE_API_KEY?.trim() && !process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()) {
      throw new Error(
        'IA não configurada: com AI_PROVIDER=google é obrigatório GOOGLE_API_KEY (ou GOOGLE_GENERATIVE_AI_API_KEY). ' +
          'Obtenha uma chave em https://aistudio.google.com/apikey e coloque-a na raiz .env ou em frontend/.env.local; reinicie o dev server.'
      )
    }
    return
  }
  if (provider === 'groq') {
    if (!set('GROQ_API_KEY')) {
      throw new Error('IA não configurada: defina GROQ_API_KEY (AI_PROVIDER=groq).')
    }
    return
  }
  /* deepseek / default */
  if (!set('DEEPSEEK_API_KEY')) {
    throw new Error(
      'IA não configurada: defina DEEPSEEK_API_KEY ou defina AI_PROVIDER=openai|google|… com a chave desse provedor.'
    )
  }
}
