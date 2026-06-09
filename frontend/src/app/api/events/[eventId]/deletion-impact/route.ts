import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeCriticalAuditLog } from '@/lib/observability/audit'
import { getEventDeletionImpact } from '@/lib/server/event-deletion'

function jsonError(requestId: string, message: string, status: number, code?: string) {
  return NextResponse.json(
    { detail: message, ...(code ? { error: code } : {}), request_id: requestId },
    { status, headers: { 'x-request-id': requestId } },
  )
}

export async function GET(req: Request, ctx: { params: Promise<{ eventId: string }> }) {
  const requestId = getOrCreateRequestId(req)
  try {
    const user = await requireAdmin(req)
    const { eventId } = await ctx.params
    const admin = getSupabaseAdmin()
    const impact = await getEventDeletionImpact(admin, user.tenantId, eventId)

    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'event.deletion_impact_viewed',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}/deletion-impact`,
      method: 'GET',
      metadata: impact,
    })

    return NextResponse.json(impact, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    if (e instanceof Error && e.message === 'EVENT_NOT_FOUND') {
      return jsonError(requestId, 'Evento não encontrado', 404, 'EVENT_NOT_FOUND')
    }
    return jsonError(requestId, String(e), 500)
  }
}
