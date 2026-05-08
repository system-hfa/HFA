import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

const SERVICE_ROLE_MSG =
  'Supabase (servidor): defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no frontend/.env.local. ' +
  'Em produção, configure na Vercel.'

/** Falha cedo; nas rotas POST tratar com HTTP 503 para não parecer bug genérico (500). */
export function assertServiceRoleEnv(): void {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) {
    throw new Error(SERVICE_ROLE_MSG)
  }
}

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached
  assertServiceRoleEnv()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
  cached = createClient(url, key)
  return cached
}
