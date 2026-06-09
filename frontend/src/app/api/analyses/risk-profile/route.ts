import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { getRiskProfileSummaryForTenant } from '@/lib/risk-profile/server'

function jsonError(code: string, message: string, status: number, requestId?: string) {
  return NextResponse.json(
    { error: code, detail: message, ...(requestId ? { request_id: requestId } : {}) },
    { status }
  )
}

/**
 * GET /api/analyses/risk-profile
 *
 * DEPRECATED: This endpoint now delegates to the canonical /api/risk-profile service.
 * Consumers should migrate to GET /api/risk-profile for the authoritative response.
 *
 * Returns the full risk profile summary including source provenance,
 * methodology version, and heuristic labeling.
 */
export async function GET(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()
    const requestId = getOrCreateRequestId(req)
    const profile = await getRiskProfileSummaryForTenant(user.tenantId, admin)

    return NextResponse.json(
      {
        ...profile,
        _deprecation: {
          message: 'Este endpoint foi consolidado. Use GET /api/risk-profile para o contrato canônico.',
          canonicalEndpoint: '/api/risk-profile',
          note: 'Índice descritivo interno — não validado como probabilidade ou medida formal de risco.',
        },
      },
      { headers: { 'x-request-id': requestId } }
    )
  } catch (e) {
    if (e instanceof Response) return e
    console.error('[analyses/risk-profile]', { error: e instanceof Error ? e.message : String(e) })
    return jsonError('INTERNAL_ERROR', 'Erro ao gerar perfil de risco.', 500)
  }
}
