import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeCriticalAuditLog } from '@/lib/observability/audit'
import { getEventDeletionImpact, getEventDeletionRecord, softDeleteEvent } from '@/lib/server/event-deletion'

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
    const body = await req.json().catch(() => ({})) as {
      reason?: string
      confirmationTitle?: string
    }

    const reason = body.reason?.trim() ?? ''
    const confirmationTitle = body.confirmationTitle?.trim() ?? ''
    if (!reason) return jsonError(requestId, 'Motivo obrigatório.', 400, 'EVENT_DELETE_REASON_REQUIRED')

    const event = await getEventDeletionRecord(admin, user.tenantId, eventId)
    if (!event) return jsonError(requestId, 'Evento não encontrado.', 404, 'EVENT_NOT_FOUND')
    if (event.title !== confirmationTitle) {
      return jsonError(requestId, 'O título digitado não corresponde exatamente ao evento.', 400, 'EVENT_DELETE_CONFIRMATION_MISMATCH')
    }
    if (event.deleted_at) {
      const impact = await getEventDeletionImpact(admin, user.tenantId, eventId)
      return NextResponse.json({
        status: event.deletion_status ?? 'SOFT_DELETED',
        recoverableUntil: event.recoverable_until,
        impact,
        requestId,
        idempotent: true,
      }, { headers: { 'x-request-id': requestId } })
    }

    const impact = await getEventDeletionImpact(admin, user.tenantId, eventId)
    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'event.deletion_requested',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}/delete-request`,
      method: 'POST',
      metadata: {
        impact,
      },
    })

    const result = await softDeleteEvent({
      admin,
      tenantId: user.tenantId,
      eventId,
      actorUserId: user.userId,
      reason,
      requestId,
    })

    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'event.soft_deleted',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}/delete-request`,
      method: 'POST',
      metadata: {
        recoverableUntil: result.recoverableUntil,
        impact,
      },
    })

    return NextResponse.json({
      status: 'SOFT_DELETED',
      recoverableUntil: result.recoverableUntil,
      impact,
      requestId,
    }, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    if (e instanceof Error && e.message === 'EVENT_DELETE_BLOCKED_BY_OPEN_CORRECTIVE_ACTIONS') {
      return jsonError(requestId, 'Existem ações corretivas em aberto vinculadas ao evento.', 409, 'EVENT_DELETE_BLOCKED_BY_OPEN_CORRECTIVE_ACTIONS')
    }
    return jsonError(requestId, String(e), 500)
  }
}
