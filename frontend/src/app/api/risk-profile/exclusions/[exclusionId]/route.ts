import { NextResponse } from 'next/server'
import { writeAuditLog } from '@/lib/observability/audit'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number, requestId?: string) {
  return NextResponse.json(
    { detail: message, ...(requestId ? { request_id: requestId } : {}) },
    { status }
  )
}

export async function DELETE(req: Request, ctx: { params: Promise<{ exclusionId: string }> }) {
  const requestId = getOrCreateRequestId(req)
  try {
    const user = await requireAdmin(req)
    const { exclusionId } = await ctx.params
    const admin = getSupabaseAdmin()

    const current = await admin
      .from('risk_profile_exclusions')
      .select('id, tenant_id, source_type, source_id, restored_at')
      .eq('id', exclusionId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (current.error) {
      console.error('[risk-profile/exclusions/restore] lookup failed', { requestId, error: current.error.message })
      return jsonError('Erro interno ao verificar exclusão.', 500, requestId)
    }
    if (!current.data) {
      return jsonError('Exclusão não encontrada', 404)
    }
    if (current.data.restored_at) {
      return NextResponse.json({
        restored: false,
        idempotent: true,
      }, { headers: { 'x-request-id': requestId } })
    }

    const restored = await admin
      .from('risk_profile_exclusions')
      .update({
        restored_at: new Date().toISOString(),
        restored_by: user.userId,
      })
      .eq('id', exclusionId)
      .eq('tenant_id', user.tenantId)
      .is('restored_at', null)
      .select('id, restored_at, source_type, source_id')
      .single()

    if (restored.error || !restored.data) {
      console.error('[risk-profile/exclusions/restore] update failed', { requestId, error: restored.error?.message })
      return jsonError('Falha ao restaurar exclusão.', 500, requestId)
    }

    await writeAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'risk_profile.exclusion_restored',
      entityType: 'risk_profile_exclusion',
      entityId: restored.data.id,
      route: `/api/risk-profile/exclusions/${exclusionId}`,
      method: 'DELETE',
      metadata: {
        source_type: restored.data.source_type,
        source_id: restored.data.source_id,
      },
    })

    return NextResponse.json({
      restored: true,
      exclusion: restored.data,
      idempotent: false,
    }, { headers: { 'x-request-id': requestId } })
  } catch (error) {
    if (error instanceof Response) return error
    console.error('[risk-profile/exclusions/restore] unhandled error', { requestId, error: error instanceof Error ? error.message : String(error) })
    return jsonError('Erro interno ao processar restauração.', 500, requestId)
  }
}
