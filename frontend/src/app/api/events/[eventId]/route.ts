import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId, buildErrorResponse } from '@/lib/observability/request-id'
import { writeCriticalAuditLog } from '@/lib/observability/audit'

function jsonError(requestId: string, message: string, status: number, code?: string) {
  return NextResponse.json(
    { detail: message, ...(code ? { error: code } : {}), request_id: requestId },
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

    const { data, error } = await query.maybeSingle()
    if (error) return jsonError(requestId, error.message, 400)
    if (!data) return jsonError(requestId, 'Evento não encontrado', 404, 'EVENT_NOT_FOUND')

    const exclusion = await admin
      .from('risk_profile_exclusions')
      .select('id, reason, excluded_at')
      .eq('tenant_id', user.tenantId)
      .eq('source_type', 'legacy_event')
      .eq('source_id', eventId)
      .is('restored_at', null)
      .maybeSingle()
    if (exclusion.error) return jsonError(requestId, exclusion.error.message, 400)

    return NextResponse.json({
      ...data,
      is_excluded_from_risk_profile: !!exclusion.data,
      risk_profile_exclusion_id: exclusion.data?.id ?? null,
      risk_profile_exclusion_reason: exclusion.data?.reason ?? null,
      risk_profile_exclusion_at: exclusion.data?.excluded_at ?? null,
    }, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(requestId, String(e), 500)
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ eventId: string }> }) {
  const requestId = getOrCreateRequestId(req)
  try {
    const user = await requireAdmin(req)
    const { eventId } = await ctx.params

    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
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

    return jsonError(requestId, 'Hard delete de eventos foi desabilitado. Use o fluxo de exclusão recuperável.', 409, 'EVENT_HARD_DELETE_DISABLED')
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(requestId, String(e), 500)
  }
}
