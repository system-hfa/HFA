import { NextResponse } from 'next/server'
import { getRiskProfileSummaryForTenant } from '@/lib/risk-profile/server'
import { writeAuditLog } from '@/lib/observability/audit'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { requireAdmin } from '@/lib/server/admin-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

type ExclusionPayload = {
  sourceType?: 'legacy_event' | 'sera_vnext_analysis'
  sourceId?: string
  reason?: string
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin(req)
    const requestId = getOrCreateRequestId(req)
    const body = (await req.json().catch(() => ({}))) as ExclusionPayload
    const sourceType = body.sourceType
    const sourceId = typeof body.sourceId === 'string' ? body.sourceId.trim() : ''
    const reason = typeof body.reason === 'string' ? body.reason.trim().slice(0, 500) : ''

    if (sourceType !== 'legacy_event' && sourceType !== 'sera_vnext_analysis') {
      return jsonError('sourceType inválido', 400)
    }
    if (!sourceId) {
      return jsonError('sourceId é obrigatório', 400)
    }

    const admin = getSupabaseAdmin()
    const profile = await getRiskProfileSummaryForTenant(user.tenantId, admin)
    const eligibleSource = [
      ...profile.source_events_included,
      ...profile.source_events_excluded,
    ].find((source) => source.source === sourceType && source.id === sourceId)

    if (!eligibleSource) {
      return jsonError('Fonte inexistente ou fora do universo canônico do Perfil de Risco', 404)
    }

    const existing = await admin
      .from('risk_profile_exclusions')
      .select('id, reason, excluded_at')
      .eq('tenant_id', user.tenantId)
      .eq('source_type', sourceType)
      .eq('source_id', sourceId)
      .is('restored_at', null)
      .maybeSingle()

    if (existing.error) {
      return jsonError(existing.error.message, 500)
    }

    if (existing.data) {
      return NextResponse.json({
        exclusion: existing.data,
        idempotent: true,
      }, { headers: { 'x-request-id': requestId } })
    }

    const inserted = await admin
      .from('risk_profile_exclusions')
      .insert({
        tenant_id: user.tenantId,
        source_type: sourceType,
        source_id: sourceId,
        excluded_by: user.userId,
        reason: reason || null,
      })
      .select('id, source_type, source_id, excluded_at, reason')
      .single()

    if (inserted.error || !inserted.data) {
      return jsonError(inserted.error?.message ?? 'Falha ao criar exclusão', 500)
    }

    await writeAuditLog({
      tenantId: user.tenantId,
      userId: user.userId,
      requestId,
      eventType: 'risk_profile.exclusion_created',
      entityType: 'risk_profile_exclusion',
      entityId: inserted.data.id,
      route: '/api/risk-profile/exclusions',
      method: 'POST',
      metadata: {
        source_type: sourceType,
        source_id: sourceId,
        reason_length: reason.length || 0,
      },
    })

    return NextResponse.json({
      exclusion: inserted.data,
      idempotent: false,
    }, { status: 201, headers: { 'x-request-id': requestId } })
  } catch (error) {
    if (error instanceof Response) return error
    return jsonError(error instanceof Error ? error.message : String(error), 500)
  }
}
