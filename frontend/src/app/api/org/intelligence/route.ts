import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getRiskProfileSummaryForTenant } from '@/lib/risk-profile/server'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

function logError(error: unknown, stage: string, userId?: string, tenantId?: string) {
  const e = error instanceof Error ? error : new Error(String(error))
  console.error('[org/intelligence]', { stage, userId, tenantId, message: e.message, stack: e.stack })
}

export async function GET(req: Request) {
  let userId: string | undefined
  let tenantId: string | undefined

  try {
    const user = await requireBearerUser(req)
    userId = user.userId
    tenantId = user.tenantId
    const admin = getSupabaseAdmin()
    const profile = await getRiskProfileSummaryForTenant(user.tenantId, admin)
    return NextResponse.json(profile)
  } catch (e) {
    if (e instanceof Response) return e
    logError(e, 'top-level', userId, tenantId)
    return jsonError(String(e), 500)
  }
}
