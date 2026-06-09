import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { getEventDeletionImpact, resolvePublicUserId, restoreSoftDeletedEvent } from '@/lib/server/event-deletion'

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
    const publicUserId = await resolvePublicUserId({
      admin,
      tenantId: user.tenantId,
      authUserId: user.userId,
      email: user.email,
    })

    const result = await restoreSoftDeletedEvent({
      admin,
      tenantId: user.tenantId,
      eventId,
      actorUserId: publicUserId,
      requestId,
    })

    const impact = await getEventDeletionImpact(admin, user.tenantId, eventId)

    return NextResponse.json({
      status: 'RESTORED',
      restoredAt: result.restoredAt,
      impact,
      requestId,
      idempotent: result.idempotent,
    }, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    const msg = e instanceof Error ? e.message : ''
    if (msg === 'EVENT_RESTORE_WINDOW_EXPIRED') {
      return jsonError(requestId, msg, 'A janela de recuperação expirou.', 409)
    }
    if (msg === 'EVENT_RESTORE_NOT_ALLOWED') return jsonError(requestId, msg, 'Evento não está em estado recuperável.', 409)
    if (msg === 'EVENT_DELETE_FORBIDDEN') return jsonError(requestId, msg, 'Operação não autorizada.', 403)
    if (msg === 'EVENT_DELETE_CONFLICT') return jsonError(requestId, msg, 'Operação concorrente detectada. Recarregue e tente novamente.', 409)
    console.error('[restore] unexpected error', { requestId, code: msg.slice(0, 64) })
    return jsonError(requestId, 'EVENT_DELETE_INTERNAL_ERROR', 'Não foi possível concluir a operação.', 500)
  }
}
