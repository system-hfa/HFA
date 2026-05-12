import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import Groq from 'groq-sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { requireAdmin, jsonError, isMasked } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

type Provider = 'anthropic' | 'openai' | 'google' | 'groq' | 'deepseek'

type TestPayload = Partial<Record<`${Provider}_api_key` | `${Provider}_model`, string>> & {
  ai_provider?: Provider
}

function pickProvider(settingsMap: Record<string, string>): Provider {
  const raw = (settingsMap.ai_provider || process.env.AI_PROVIDER || 'deepseek').toLowerCase()
  if (raw === 'anthropic' || raw === 'openai' || raw === 'google' || raw === 'groq' || raw === 'deepseek') return raw
  return 'deepseek'
}

function providerConfig(provider: Provider, settingsMap: Record<string, string>) {
  if (provider === 'anthropic') {
    return {
      key: settingsMap.anthropic_api_key || process.env.ANTHROPIC_API_KEY || '',
      model: settingsMap.anthropic_model || process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
    }
  }
  if (provider === 'openai') {
    return {
      key: settingsMap.openai_api_key || process.env.OPENAI_API_KEY || '',
      model: settingsMap.openai_model || process.env.OPENAI_MODEL || 'gpt-4o',
    }
  }
  if (provider === 'google') {
    return {
      key: settingsMap.google_api_key || process.env.GOOGLE_API_KEY || '',
      model: settingsMap.google_model || process.env.GOOGLE_MODEL || 'gemini-2.0-flash',
    }
  }
  if (provider === 'groq') {
    return {
      key: settingsMap.groq_api_key || process.env.GROQ_API_KEY || '',
      model: settingsMap.groq_model || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    }
  }
  return {
    key: settingsMap.deepseek_api_key || process.env.DEEPSEEK_API_KEY || '',
    model: settingsMap.deepseek_model || process.env.DEEPSEEK_MODEL || 'deepseek-reasoner',
  }
}

async function runTest(provider: Provider, key: string, model: string): Promise<string> {
  if (provider === 'anthropic') {
    const client = new Anthropic({ apiKey: key })
    const response = await client.messages.create({
      model,
      max_tokens: 30,
      system: 'You are a connectivity test assistant.',
      messages: [{ role: 'user', content: 'Reply with exactly: OK' }],
    })
    const first = response.content[0]
    return first && 'text' in first ? first.text : ''
  }

  if (provider === 'openai') {
    const client = new OpenAI({ apiKey: key })
    const response = await client.chat.completions.create({
      model,
      max_tokens: 30,
      messages: [
        { role: 'system', content: 'You are a connectivity test assistant.' },
        { role: 'user', content: 'Reply with exactly: OK' },
      ],
    })
    return response.choices[0]?.message?.content || ''
  }

  if (provider === 'google') {
    const genAI = new GoogleGenerativeAI(key)
    const gm = genAI.getGenerativeModel({ model, systemInstruction: 'You are a connectivity test assistant.' })
    const response = await gm.generateContent('Reply with exactly: OK')
    return response.response.text()
  }

  if (provider === 'groq') {
    const client = new Groq({ apiKey: key })
    const response = await client.chat.completions.create({
      model,
      max_tokens: 30,
      messages: [
        { role: 'system', content: 'You are a connectivity test assistant.' },
        { role: 'user', content: 'Reply with exactly: OK' },
      ],
    })
    return response.choices[0]?.message?.content || ''
  }

  const client = new OpenAI({ apiKey: key, baseURL: 'https://api.deepseek.com' })
  const response = await client.chat.completions.create({
    model,
    max_tokens: 30,
    messages: [
      { role: 'system', content: 'You are a connectivity test assistant.' },
      { role: 'user', content: 'Reply with exactly: OK' },
    ],
  })
  return response.choices[0]?.message?.content || ''
}

export async function POST(req: Request) {
  try {
    await requireAdmin(req)
    const admin = getSupabaseAdmin()
    const body = (await req.json().catch(() => ({}))) as TestPayload

    const { data } = await admin.from('system_settings').select('key, value')
    const settingsMap: Record<string, string> = {}
    for (const row of data ?? []) settingsMap[String(row.key)] = String(row.value ?? '')

    if (body.ai_provider) settingsMap.ai_provider = body.ai_provider
    for (const provider of ['anthropic', 'openai', 'google', 'groq', 'deepseek'] as const) {
      const apiKey = body[`${provider}_api_key`]
      const model = body[`${provider}_model`]
      if (apiKey && !isMasked(apiKey)) settingsMap[`${provider}_api_key`] = apiKey
      if (model) settingsMap[`${provider}_model`] = model
    }

    const provider = pickProvider(settingsMap)
    const { key, model } = providerConfig(provider, settingsMap)

    if (!key) {
      return NextResponse.json({ ok: false, provider, error: `Chave de API não configurada para ${provider}` }, { status: 400 })
    }

    const started = performance.now()
    const message = await runTest(provider, key, model)
    const latency = Math.round(performance.now() - started)

    return NextResponse.json({
      ok: true,
      provider,
      model,
      latency_ms: latency,
      message: message.slice(0, 120),
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(e instanceof Error ? e.message : String(e), 500)
  }
}
