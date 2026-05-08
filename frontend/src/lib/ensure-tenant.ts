import { supabase } from '@/lib/supabase'
import { apiCall, resolveApiUrl } from '@/lib/api'

/** Garante tenant_id no JWT após login Google (ou corrige metadata desatualizado). */
export async function ensureOAuthTenant(): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return
  const meta = session.user.user_metadata as Record<string, unknown> | undefined
  if (meta?.tenant_id) return

  try {
    // Primeiro tenta a rota local em Next.js; fallback para backend legado quando existir.
    const localRes = await fetch(resolveApiUrl('/auth/oauth/bootstrap'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: '{}',
    })
    if (!localRes.ok) {
      await apiCall('/auth/oauth/bootstrap', { method: 'POST', body: '{}' }, session.access_token)
    }
    await supabase.auth.refreshSession()
  } catch {
    /* backend indisponível ou offline — evita bloquear a UI */
  }
}
