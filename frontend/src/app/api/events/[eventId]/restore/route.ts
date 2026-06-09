import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeCriticalAuditLog } from '@/lib/observability/audit'
import { getEventDeletionImpact, restoreSoftDeletedEvent } from '@/lib/server/event-deletion'

function jsonError(requestId: string, message: string, status: number, code?: string) {
  return NextResponse.json(
    { detail: message, ...(code ? { error: code } : {}), request_id: requestId },
    { status, headers: { 'x-request-id': requestId } },
  )
}

export async function POST(req: Request, ctx: { params: Promise<{ eventId: string }> }) {
  const requestId = getOrCreateRequestId(req)
  try {
    const user = await requireAdmin(req)
    const { eventId } = await ctx.params
    const admin = getSupabaseAdmin()

    const result = await restoreSoftDeletedEvent({
      admin,
      tenantId: user.tenantId,
      eventId,
    })

    const impact = await getEventDeletionImpact(admin, user.tenantId, eventId)
    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'event.restored',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}/restore`,
      method: 'POST',
      metadata: {
        restoredAt: result.restoredAt,
        impact,
      },
    })

    return NextResponse.json({
      status: 'RESTORED',
      restoredAt: result.restoredAt,
      impact,
      requestId,
    }, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    if (e instanceof Error && e.message === 'EVENT_RESTORE_WINDOW_EXPIRED') {
      return jsonError(requestId, 'A janela de recuperação expirou.', 409, 'EVENT_RESTORE_WINDOW_EXPIRED')
    }
    if (e instanceof Error && e.message === 'EVENT_NOT_SOFT_DELETED') {
      return jsonError(requestId, 'Evento não está em estado recuperável.', 409, 'EVENT_NOT_SOFT_DELETED')
    }
    return jsonError(requestId, String(e), 500)
  }
}
