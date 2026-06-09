import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeCriticalAuditLog } from '@/lib/observability/audit'
import { purgeSoftDeletedEvent } from '@/lib/server/event-deletion'

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
    const body = await req.json().catch(() => ({})) as { mode?: string }
    const dryRun = body.mode !== 'EXECUTE'

    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'event.purge_started',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}/purge`,
      method: 'POST',
      metadata: {
        mode: dryRun ? 'DRY_RUN' : 'EXECUTE',
      },
    })

    const result = await purgeSoftDeletedEvent({
      admin,
      tenantId: user.tenantId,
      eventId,
      actorUserId: user.userId,
      requestId,
      dryRun,
    })

    await writeCriticalAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'event.purge_scheduled',
      entityType: 'event',
      entityId: eventId,
      route: `/api/events/${eventId}/purge`,
      method: 'POST',
      metadata: {
        mode: result.mode,
        storageObjects: result.storageObjects.length,
      },
    })

    return NextResponse.json(result, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    if (e instanceof Error && e.message === 'EVENT_PURGE_NON_DRY_RUN_BLOCKED') {
      return jsonError(requestId, 'Execução de purge fora do modo DRY_RUN permanece bloqueada nesta fase.', 409, 'EVENT_PURGE_NON_DRY_RUN_BLOCKED')
    }
    if (e instanceof Error && e.message === 'EVENT_PURGE_WINDOW_NOT_REACHED') {
      return jsonError(requestId, 'O evento ainda está dentro da janela de recuperação.', 409, 'EVENT_PURGE_WINDOW_NOT_REACHED')
    }
    return jsonError(requestId, String(e), 500)
  }
}
