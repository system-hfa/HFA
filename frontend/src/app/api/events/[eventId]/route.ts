import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeCriticalAuditLog } from '@/lib/observability/audit'
import { resolvePublicUserId } from '@/lib/server/event-deletion'

function jsonError(requestId: string, code: string, message: string, status: number) {
  return NextResponse.json(
    { error: { code, message, requestId } },
    { status, headers: { 'x-request-id': requestId } },
  )
}

export async function GET(req: Request, ctx: { params: Promise<{ eventId: string }> }) {
  const requestId = getOrCreateRequestId(req)
  try {
    const user = await requireBearerUser(req)
    const { eventId } = await ctx.params
    const admin = getSupabaseAdmin()
    const includeDeleted = new URL(req.url).searchParams.get('scope') === 'deleted'

    let query = admin
      .from('events')
      .select('*, analyses(*)')
      .eq('id', eventId)
      .eq('tenant_id', user.tenantId)

    query = includeDeleted ? query.not('deleted_at', 'is', null) : query.is('deleted_at', null)
    query = query.neq('deletion_status', 'PURGED')

    const { data, error } = await query.maybeSingle()
    if (error) {
      console.error('[events GET] query failed', { requestId })
      return jsonError(requestId, 'EVENT_DELETE_INTERNAL_ERROR', 'Não foi possível obter o evento.', 500)
    }
    if (!data) return jsonError(requestId, 'EVENT_NOT_FOUND', 'Evento não encontrado.', 404)

    const exclusion = await admin
      .from('risk_profile_exclusions')
      .select('id, reason, excluded_at')
      .eq('tenant_id', user.tenantId)
      .eq('source_type', 'legacy_event')
      .eq('source_id', eventId)
      .is('restored_at', null)
      .maybeSingle()
    if (exclusion.error) {
      console.error('[events GET] exclusion lookup failed', { requestId })
      return jsonError(requestId, 'EVENT_DELETE_INTERNAL_ERROR', 'Não foi possível obter o evento.', 500)
    }

    return NextResponse.json({
      ...data,
      is_excluded_from_risk_profile: !!exclusion.data,
      risk_profile_exclusion_id: exclusion.data?.id ?? null,
      risk_profile_exclusion_reason: exclusion.data?.reason ?? null,
      risk_profile_exclusion_at: exclusion.data?.excluded_at ?? null,
    }, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    console.error('[events GET] unexpected error', { requestId })
    return jsonError(requestId, 'EVENT_DELETE_INTERNAL_ERROR', 'Não foi possível obter o evento.', 500)
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ eventId: string }> }) {
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

    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: publicUserId,
      requestId,
      eventType: 'event.hard_delete_denied',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}`,
      method: 'DELETE',
      status: 'blocked',
      metadata: {
        code: 'EVENT_HARD_DELETE_DISABLED',
      },
    })
    const { error: lifecycleError } = await admin.from('event_deletion_events').insert({
      tenant_id: user.tenantId,
      event_id: eventId,
      event_status: 'HARD_DELETE_DENIED',
      actor_id: publicUserId,
      request_id: requestId,
      metadata: {},
    })
    if (lifecycleError) throw new Error('EVENT_DELETE_INTERNAL_ERROR')

    return jsonError(requestId, 'EVENT_PURGE_DRY_RUN_ONLY', 'Hard delete de eventos foi desabilitado. Use o fluxo de exclusão recuperável.', 409)
  } catch (e) {
    if (e instanceof Response) return e
    console.error('[events DELETE] unexpected error', { requestId })
    return jsonError(requestId, 'EVENT_DELETE_INTERNAL_ERROR', 'Não foi possível processar a solicitação.', 500)
  }
}
