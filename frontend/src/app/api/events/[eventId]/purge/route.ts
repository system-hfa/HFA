import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { purgeSoftDeletedEvent, resolvePublicUserId } from '@/lib/server/event-deletion'

function jsonError(requestId: string, code: string, message: string, status: number) {
  return NextResponse.json(
    { error: { code, message, requestId } },
    { status, headers: { 'x-request-id': requestId } },
  )
}

export async function POST(req: Request, ctx: { params: Promise<{ eventId: string }> }) {
  const requestId = getOrCreateRequestId(req)
  try {
    const user = await requireAdmin(req)
    const { eventId } = await ctx.params
    const admin = getSupabaseAdmin()
    const body = await req.json().catch(() => ({})) as { mode?: string; secondaryConfirmation?: string }
    const publicUserId = await resolvePublicUserId({
      admin,
      tenantId: user.tenantId,
      authUserId: user.userId,
      email: user.email,
    })

    const result = await purgeSoftDeletedEvent({
      admin,
      tenantId: user.tenantId,
      eventId,
      actorUserId: publicUserId,
      requestId,
      executeSynthetic: body.mode === 'EXECUTE_SYNTHETIC',
      secondaryConfirmation: body.secondaryConfirmation,
    })

    return NextResponse.json(result, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    const msg = e instanceof Error ? e.message : ''
    if (msg === 'EVENT_PURGE_NOT_ELIGIBLE') return jsonError(requestId, msg, 'O evento não atende aos gates para purge.', 409)
    if (msg === 'EVENT_DELETE_FORBIDDEN') return jsonError(requestId, msg, 'Operação não autorizada.', 403)
    console.error('[purge] unexpected error', { requestId, code: msg.slice(0, 64) })
    return jsonError(requestId, 'EVENT_DELETE_INTERNAL_ERROR', 'Não foi possível executar o purge.', 500)
  }
}
