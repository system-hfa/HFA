import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeAuditLog } from '@/lib/observability/audit'
import { getEventDeletionImpact, resolvePublicUserId } from '@/lib/server/event-deletion'

function jsonError(requestId: string, code: string, message: string, status: number) {
  return NextResponse.json(
    { error: { code, message, requestId } },
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
    const publicUserId = await resolvePublicUserId({
      admin,
      tenantId: user.tenantId,
      authUserId: user.userId,
      email: user.email,
    })

    await writeAuditLog({
      tenantId: user.tenantId,
      userId: publicUserId,
      requestId,
      eventType: 'event.deletion_impact_viewed',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}/deletion-impact`,
      method: 'GET',
      metadata: impact,
    })
    const lifecycle = await admin.from('event_deletion_events').insert({
      tenant_id: user.tenantId,
      event_id: eventId,
      event_status: 'DELETION_IMPACT_VIEWED',
      actor_id: publicUserId,
      request_id: requestId,
      metadata: {
        purgeEligible: impact.purgeEligible,
        purgeBlockers: impact.purgeBlockers,
      },
    })
    if (lifecycle.error) console.error('[deletion-impact] lifecycle telemetry failed', { requestId })

    return NextResponse.json(impact, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    const msg = e instanceof Error ? e.message : ''
    if (msg === 'EVENT_NOT_FOUND') {
      return jsonError(requestId, 'EVENT_NOT_FOUND', 'Evento não encontrado.', 404)
    }
    console.error('[deletion-impact] unexpected error', { requestId, code: msg.slice(0, 64) })
    return jsonError(requestId, 'EVENT_DELETE_INTERNAL_ERROR', 'Não foi possível calcular o impacto.', 500)
  }
}
