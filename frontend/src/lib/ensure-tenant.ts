import { supabase } from '@/lib/supabase'
import { resolveApiUrl } from '@/lib/api'

/** Garante tenant_id no JWT após login Google (ou corrige metadata desatualizado). */
export async function ensureOAuthTenant(): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return
  const meta = session.user.user_metadata as Record<string, unknown> | undefined
  if (meta?.tenant_id) return

  try {
    const localRes = await fetch(resolveApiUrl('/auth/bootstrap'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: '{}',
    })
    if (!localRes.ok) throw new Error('bootstrap failed')
    await supabase.auth.refreshSession()
  } catch {
    /* backend indisponível ou offline — evita bloquear a UI */
  }
}
