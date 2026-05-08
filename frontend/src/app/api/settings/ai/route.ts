import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin, assertServiceRoleEnv } from '@/lib/server/supabase-admin'
import { type AIProvider, getModelName } from '@/lib/sera/llm'
import { decryptString, encryptString, maskKeySuffix } from '@/lib/server/ai-settings-crypto'

type StoredKeys = {
  deepseek_api_key: string | null
  openai_api_key: string | null
  anthropic_api_key: string | null
  google_api_key: string | null
  groq_api_key: string | null
}

function parseProvider(p: unknown): AIProvider {
  const s = String(p ?? '').toLowerCase()
  if (s === 'deepseek' || s === 'openai' || s === 'anthropic' || s === 'google' || s === 'groq') {
    return s
  }
  return 'deepseek'
}

export const maxDuration = 300

export async function GET(req: Request) {
  try {
    const user = await requireBearerUser(req)
    assertServiceRoleEnv()
    const admin = getSupabaseAdmin()

    const { data: row } = await admin
      .from('ai_settings')
      .select('*')
      .eq('user_id', user.userId)
      .maybeSingle()

    const stored = (row ?? {}) as Partial<StoredKeys> & { active_provider?: unknown }

    const active_provider = parseProvider(stored.active_provider)

    const responseKeys: Record<string, { configured: boolean; suffix: string }> = {}
    for (const [field, label] of [
      ['deepseek_api_key', 'deepseek'],
      ['openai_api_key', 'openai'],
      ['anthropic_api_key', 'anthropic'],
      ['google_api_key', 'google'],
      ['groq_api_key', 'groq'],
    ] as const) {
      const enc = (stored as any)[field] as string | null | undefined
      if (enc && typeof enc === 'string') {
        const suffix = maskKeySuffix(decryptString(enc))
        responseKeys[label] = { configured: true, suffix }
      } else {
        responseKeys[label] = { configured: false, suffix: '' }
      }
    }

    return NextResponse.json({
      active_provider,
      models: {
        deepseek: getModelName('deepseek'),
        openai: getModelName('openai'),
        anthropic: getModelName('anthropic'),
        google: getModelName('google'),
        groq: getModelName('groq'),
      },
      keys: responseKeys,
      updated_at: row?.updated_at ?? null,
    })
  } catch (e) {
    if (e instanceof Response) return e
    return NextResponse.json({ detail: String(e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireBearerUser(req)
    assertServiceRoleEnv()
    const admin = getSupabaseAdmin()

    const body = (await req.json()) as {
      active_provider?: AIProvider
      deepseek_api_key?: string
      openai_api_key?: string
      anthropic_api_key?: string
      google_api_key?: string
      groq_api_key?: string
    }

    const active_provider = parseProvider(body.active_provider)

    // Só persistimos chaves se o usuário enviou um valor não-vazio;
    // se enviar string vazia, interpretamos como "desativar" aquela chave.
    const next: Partial<StoredKeys> & { active_provider: AIProvider } = {
      active_provider,
    }
    if ('deepseek_api_key' in body) next.deepseek_api_key = body.deepseek_api_key?.trim()
      ? encryptString(body.deepseek_api_key)
      : null
    if ('openai_api_key' in body) next.openai_api_key = body.openai_api_key?.trim()
      ? encryptString(body.openai_api_key)
      : null
    if ('anthropic_api_key' in body) next.anthropic_api_key = body.anthropic_api_key?.trim()
      ? encryptString(body.anthropic_api_key)
      : null
    if ('google_api_key' in body) next.google_api_key = body.google_api_key?.trim()
      ? encryptString(body.google_api_key)
      : null
    if ('groq_api_key' in body) next.groq_api_key = body.groq_api_key?.trim()
      ? encryptString(body.groq_api_key)
      : null

    const payload = {
      user_id: user.userId,
      active_provider: next.active_provider,
      deepseek_api_key: next.deepseek_api_key ?? undefined,
      openai_api_key: next.openai_api_key ?? undefined,
      anthropic_api_key: next.anthropic_api_key ?? undefined,
      google_api_key: next.google_api_key ?? undefined,
      groq_api_key: next.groq_api_key ?? undefined,
    }

    const { error } = await admin
      .from('ai_settings')
      .upsert(payload, { onConflict: 'user_id' })

    if (error) {
      return NextResponse.json({ detail: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, active_provider })
  } catch (e) {
    if (e instanceof Response) return e
    return NextResponse.json({ detail: String(e) }, { status: 500 })
  }
}

