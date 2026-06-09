import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { getRiskProfileSummaryForTenant } from '@/lib/risk-profile/server'

// Deprecated: use /api/risk-profile which includes full audit logging and provenance.
// This endpoint is kept for backward compatibility and delegates to the same service.

function jsonError(code: string, message: string, status: number, requestId: string) {
  return NextResponse.json(
    { error: { code, message, requestId } },
    { status, headers: { 'x-request-id': requestId } },
  )
}

function logError(error: unknown, stage: string, requestId: string, userId?: string, tenantId?: string) {
  const e = error instanceof Error ? error : new Error(String(error))
  console.error('[org/intelligence]', { stage, requestId, userId, tenantId, message: e.message })
}

export async function GET(req: Request) {
  const requestId = getOrCreateRequestId(req)
  let userId: string | undefined
  let tenantId: string | undefined

  try {
    const user = await requireBearerUser(req)
    userId = user.userId
    tenantId = user.tenantId
    const admin = getSupabaseAdmin()
    const profile = await getRiskProfileSummaryForTenant(user.tenantId, admin)
    return NextResponse.json(profile, {
      headers: { 'x-request-id': requestId, 'x-deprecated-use': '/api/risk-profile' },
    })
  } catch (e) {
    if (e instanceof Response) return e
    logError(e, 'top-level', requestId, userId, tenantId)
    return jsonError('INTELLIGENCE_ERROR', 'Falha ao gerar perfil de risco.', 500, requestId)
  }
}
