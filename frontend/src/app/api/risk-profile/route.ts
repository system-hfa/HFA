import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeAuditLog } from '@/lib/observability/audit'
import { getRiskProfileSummaryForTenant } from '@/lib/risk-profile/server'

function jsonError(code: string, message: string, status: number, requestId?: string) {
  return NextResponse.json(
    { error: code, detail: message, ...(requestId ? { request_id: requestId } : {}) },
    { status }
  )
}

function logRiskProfileError(error: unknown, stage: string, userId?: string, tenantId?: string) {
  const e = error instanceof Error ? error : new Error(String(error))
  console.error('[risk-profile]', {
    stage,
    userId,
    tenantId,
    message: e.message,
    stack: e.stack,
  })
}

export async function GET(req: Request) {
  let userId: string | undefined
  let tenantId: string | undefined
  try {
    const user = await requireBearerUser(req)
    userId = user.userId
    tenantId = user.tenantId
    const admin = getSupabaseAdmin()
    const requestId = getOrCreateRequestId(req)
    const profile = await getRiskProfileSummaryForTenant(user.tenantId, admin)

    await writeAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'risk_profile.generated',
      entityType: 'risk_profile',
      entityId: null,
      route: '/api/risk-profile',
      method: 'GET',
      metadata: {
        included_events: profile.included_events,
        excluded_events: profile.excluded_events,
        completed_analyses: profile.completed_analyses,
      },
    })

    return NextResponse.json(profile, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    const requestId = getOrCreateRequestId(req)
    logRiskProfileError(e, 'top-level', userId, tenantId)
    return jsonError('RISK_PROFILE_ERROR', 'Falha ao gerar perfil de risco.', 500, requestId)
  }
}
