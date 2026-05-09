import type { SupabaseClient } from '@supabase/supabase-js'
import { decryptString } from '@/lib/server/ai-settings-crypto'
import { assertLlmEnvConfigured, type AIProvider } from '@/lib/sera/llm'

// Chaves de API só contêm chars ASCII imprimíveis sem espaço. Decriptação
// corrompida produz bytes arbitrários — esse regex rejeita qualquer coisa fora desse conjunto.
function isPlausibleKey(s: string, minLen = 32): boolean {
  return s.length >= minLen && /^[\x21-\x7E]+$/.test(s)
}

function parseProvider(p: unknown): AIProvider {
  const s = String(p ?? '').toLowerCase()
  if (s === 'deepseek' || s === 'openai' || s === 'anthropic' || s === 'google' || s === 'groq') return s
  return 'deepseek'
}

export async function applyUserAiSettingsToEnv(admin: SupabaseClient, userId: string): Promise<AIProvider> {
  // Default: usa variáveis do ambiente (.env.local / Vercel env).
  const { data: row, error } = await admin
    .from('ai_settings')
    .select(
      'active_provider, deepseek_api_key, openai_api_key, anthropic_api_key, google_api_key, groq_api_key'
    )
    .eq('user_id', userId)
    .maybeSingle()

  const active = row ? parseProvider(row.active_provider) : parseProvider(process.env.AI_PROVIDER)

  // Se a tabela não existir ainda (ou houver qualquer falha de query), não bloqueamos análises.
  if (error || !row) {
    assertLlmEnvConfigured(active as AIProvider)
    return active as AIProvider
  }

  process.env.AI_PROVIDER = active

  if (active === 'deepseek') {
    const enc = row.deepseek_api_key as string | null
    if (enc) {
      try {
        const decrypted = decryptString(enc)
        if (decrypted.startsWith('sk-') && isPlausibleKey(decrypted)) process.env.DEEPSEEK_API_KEY = decrypted
      } catch { /* usa env var existente */ }
    }
  } else if (active === 'openai') {
    const enc = row.openai_api_key as string | null
    if (enc) {
      try {
        const decrypted = decryptString(enc)
        if (decrypted.startsWith('sk-') && isPlausibleKey(decrypted)) process.env.OPENAI_API_KEY = decrypted
      } catch { /* usa env var existente */ }
    }
  } else if (active === 'anthropic') {
    const enc = row.anthropic_api_key as string | null
    if (enc) {
      try {
        const decrypted = decryptString(enc)
        if (decrypted.startsWith('sk-ant-') && isPlausibleKey(decrypted)) process.env.ANTHROPIC_API_KEY = decrypted
      } catch { /* usa env var existente */ }
    }
  } else if (active === 'google') {
    const enc = row.google_api_key as string | null
    if (enc) {
      try {
        const decrypted = decryptString(enc)
        if (isPlausibleKey(decrypted, 20)) process.env.GOOGLE_API_KEY = decrypted
      } catch { /* usa env var existente */ }
    }
  } else if (active === 'groq') {
    const enc = row.groq_api_key as string | null
    if (enc) {
      try {
        const decrypted = decryptString(enc)
        if ((decrypted.startsWith('gsk_') || decrypted.startsWith('sk-')) && isPlausibleKey(decrypted)) process.env.GROQ_API_KEY = decrypted
      } catch { /* usa env var existente */ }
    }
  }

  assertLlmEnvConfigured(active)
  return active
}

