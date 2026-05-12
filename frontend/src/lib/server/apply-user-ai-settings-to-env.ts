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

const MODEL_ENV_KEYS: Record<AIProvider, string> = {
  deepseek: 'DEEPSEEK_MODEL',
  openai: 'OPENAI_MODEL',
  anthropic: 'ANTHROPIC_MODEL',
  google: 'GOOGLE_MODEL',
  groq: 'GROQ_MODEL',
}

const API_KEY_ENV_KEYS: Record<AIProvider, string> = {
  deepseek: 'DEEPSEEK_API_KEY',
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  google: 'GOOGLE_API_KEY',
  groq: 'GROQ_API_KEY',
}

function applyGlobalAiSettings(settingsMap: Record<string, string>): AIProvider {
  const active = parseProvider(settingsMap.ai_provider || process.env.AI_PROVIDER)
  process.env.AI_PROVIDER = active

  for (const provider of Object.keys(MODEL_ENV_KEYS) as AIProvider[]) {
    const raw = settingsMap[`${provider}_model`]?.trim()
    if (raw) process.env[MODEL_ENV_KEYS[provider]] = raw
  }

  for (const provider of Object.keys(API_KEY_ENV_KEYS) as AIProvider[]) {
    const raw = settingsMap[`${provider}_api_key`]?.trim()
    if (raw) process.env[API_KEY_ENV_KEYS[provider]] = raw
  }

  return active
}

export async function applyUserAiSettingsToEnv(admin: SupabaseClient, userId: string): Promise<AIProvider> {
  const globalSettingsMap: Record<string, string> = {}
  try {
    const { data: globalRows } = await admin.from('system_settings').select('key, value')
    for (const row of globalRows ?? []) {
      globalSettingsMap[String(row.key)] = String(row.value ?? '')
    }
  } catch (error) {
    console.warn('[applyUserAiSettingsToEnv] Falha ao ler system_settings; usando env do deploy', error)
  }

  const globalActive = applyGlobalAiSettings(globalSettingsMap)

  const { data: row, error } = await admin
    .from('ai_settings')
    .select(
      'active_provider, deepseek_api_key, openai_api_key, anthropic_api_key, google_api_key, groq_api_key'
    )
    .eq('user_id', userId)
    .maybeSingle()

  const active = row ? parseProvider(row.active_provider) : globalActive

  // Se a tabela não existir ainda (ou houver qualquer falha de query), não bloqueamos análises.
  if (error || !row) {
    assertLlmEnvConfigured(active)
    return active
  }

  process.env.AI_PROVIDER = active

  for (const provider of Object.keys(API_KEY_ENV_KEYS) as AIProvider[]) {
    const field = `${provider}_api_key` as keyof typeof row
    const enc = row[field] as string | null
    if (!enc) continue
    try {
      const decrypted = decryptString(enc)
      if (provider === 'anthropic' && decrypted.startsWith('sk-ant-') && isPlausibleKey(decrypted)) {
        process.env[API_KEY_ENV_KEYS[provider]] = decrypted
      } else if (provider === 'google' && isPlausibleKey(decrypted, 20)) {
        process.env[API_KEY_ENV_KEYS[provider]] = decrypted
      } else if (provider === 'groq' && (decrypted.startsWith('gsk_') || decrypted.startsWith('sk-')) && isPlausibleKey(decrypted)) {
        process.env[API_KEY_ENV_KEYS[provider]] = decrypted
      } else if ((provider === 'deepseek' || provider === 'openai') && decrypted.startsWith('sk-') && isPlausibleKey(decrypted)) {
        process.env[API_KEY_ENV_KEYS[provider]] = decrypted
      }
    } catch (error) {
      console.warn(`[applyUserAiSettingsToEnv] Falha ao aplicar chave de ${provider}; mantendo env existente`, error)
    }
  }

  assertLlmEnvConfigured(active)
  return active
}
