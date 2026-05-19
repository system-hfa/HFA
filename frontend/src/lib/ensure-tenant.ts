import { supabase } from '@/lib/supabase'
import { resolveApiUrl } from '@/lib/api'

type BootstrapFailureCategory =
  | 'network_or_transient'
  | 'permission_or_rls'
  | 'missing_tenant'
  | 'inconsistent_tenant'
  | 'unexpected_response'
  | 'unknown'

function getClientRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function normalizeReason(input: unknown, fallback: string): string {
  if (typeof input !== 'string') return fallback
  const cleaned = input.toLowerCase().replace(/[^a-z0-9_.:-]/gi, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')
  return cleaned.slice(0, 120) || fallback
}

function isRecoverableCategory(category: BootstrapFailureCategory): boolean {
  return category === 'network_or_transient'
}

/** Garante tenant_id no JWT após login Google (ou corrige metadata desatualizado). */
export async function ensureOAuthTenant(): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return
  const meta = session.user.user_metadata as Record<string, unknown> | undefined
  if (meta?.tenant_id) return

  const requestId = getClientRequestId()

  try {
    const localRes = await fetch(resolveApiUrl('/auth/bootstrap'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
        'x-request-id': requestId,
      },
      body: '{}',
    })

    if (!localRes.ok) {
      const payload = await localRes
        .json()
        .catch(() => ({} as Record<string, unknown>))
      const categoryRaw = payload.category
      const category: BootstrapFailureCategory =
        typeof categoryRaw === 'string'
          ? categoryRaw as BootstrapFailureCategory
          : (localRes.status >= 500 ? 'network_or_transient' : 'unknown')
      const recoverable =
        typeof payload.recoverable === 'boolean'
          ? payload.recoverable
          : isRecoverableCategory(category)
      const stage = typeof payload.stage === 'string' ? payload.stage : 'client_request'
      const effectiveRequestId =
        localRes.headers.get('x-request-id')
        || (typeof payload.request_id === 'string' ? payload.request_id : requestId)
      const reason =
        normalizeReason(payload.reason, '')
        || normalizeReason(payload.detail, '')
        || `http_${localRes.status}`

      const payloadLog = {
        requestId: effectiveRequestId,
        category,
        recoverable,
        stage,
        reason,
        status: localRes.status,
        source: 'oauth_bootstrap',
      }

      if (recoverable) {
        console.warn('[auth/bootstrap] recoverable failure', payloadLog)
        return
      }
      console.error('[auth/bootstrap] non-recoverable failure', payloadLog)
      throw new Error('tenant_bootstrap_failed_non_recoverable')
    }

    await supabase.auth.refreshSession()
  } catch (error) {
    if (error instanceof Error && error.message === 'tenant_bootstrap_failed_non_recoverable') {
      throw error
    }
    const reason = normalizeReason(error instanceof Error ? error.message : String(error), 'network_error')
    console.warn('[auth/bootstrap] degraded mode', {
      requestId,
      category: 'network_or_transient',
      recoverable: true,
      stage: 'fetch',
      reason,
      source: 'oauth_bootstrap',
    })
  }
}
