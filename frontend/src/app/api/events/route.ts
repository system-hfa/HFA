import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin, assertServiceRoleEnv } from '@/lib/server/supabase-admin'
import { type SourceMeta } from '@/lib/sera/pipeline'
import { completeSeraAnalysisAfterEventCreated } from '@/lib/server/complete-sera-analysis'
import {
  buildSeraAnalysisFromDbRow,
  fetchEditHistoryForAnalysis,
  seraAnalysisToJson,
} from '@/lib/sera/sera-analysis-mapper'
import { debitCreditForEvent, ensurePublicUserRow, refundCreditForFailedAnalysis } from '@/lib/server/tenant-user'
import { applyUserAiSettingsToEnv } from '@/lib/server/apply-user-ai-settings-to-env'
import { getOrCreateRequestId, buildErrorResponse } from '@/lib/observability/request-id'
import { writeAuditLog } from '@/lib/observability/audit'

export const maxDuration = 300

function logEventsError(error: unknown, stage: string, extra: Record<string, unknown> = {}) {
  const e = error instanceof Error ? error : new Error(String(error))
  console.error('[/api/events Error]', {
    stage,
    message: e.message,
    stack: e.stack,
    cause: e.cause,
    ...extra,
  })
}

export async function GET(req: Request) {
  const requestId = getOrCreateRequestId(req)
  const jsonError = (message: string, status: number) => buildErrorResponse(message, status, requestId)
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()
    const { data, error } = await admin
      .from('events')
      .select('*, analyses(perception_code, objective_code, action_code)')
      .eq('tenant_id', user.tenantId)
      .order('created_at', { ascending: false })
    if (error) return jsonError(error.message, 400)
    const eventIds = (data ?? []).map((event) => event.id).filter((id): id is string => typeof id === 'string')
    const exclusions = eventIds.length === 0
      ? { data: [], error: null }
      : await admin
        .from('risk_profile_exclusions')
        .select('id, source_id, reason, excluded_at')
        .eq('tenant_id', user.tenantId)
        .eq('source_type', 'legacy_event')
        .in('source_id', eventIds)
        .is('restored_at', null)
    if (exclusions.error) return jsonError(exclusions.error.message, 400)
    const exclusionBySourceId = new Map(
      (exclusions.data ?? []).map((row) => [row.source_id as string, row]),
    )
    const rows = (data ?? []).map((ev) => {
      const analyses = ev.analyses
      const analysis = Array.isArray(analyses) ? (analyses[0] ?? null) : (analyses ?? null)
      const exclusion = exclusionBySourceId.get(ev.id as string)
      return {
        ...ev,
        perception_code: (analysis as { perception_code?: string | null } | null)?.perception_code ?? null,
        objective_code:  (analysis as { objective_code?:  string | null } | null)?.objective_code  ?? null,
        action_code:     (analysis as { action_code?:     string | null } | null)?.action_code     ?? null,
        is_excluded_from_risk_profile: !!exclusion,
        risk_profile_exclusion_id: exclusion?.id ?? null,
        risk_profile_exclusion_reason: (exclusion?.reason as string | null | undefined) ?? null,
        risk_profile_exclusion_at: (exclusion?.excluded_at as string | null | undefined) ?? null,
        analyses: undefined,
      }
    })
    return NextResponse.json(rows, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    logEventsError(e, 'get-events', { requestId })
    return jsonError(String(e), 500)
  }
}

export async function POST(req: Request) {
  const requestId = getOrCreateRequestId(req)
  const jsonError = (message: string, status: number) => buildErrorResponse(message, status, requestId)
  let stage = 'start'
  let context: Record<string, unknown> = { requestId }
  try {
    stage = 'auth'
    const user = await requireBearerUser(req)
    context = { requestId, userId: user.userId, tenantId: user.tenantId }
    try {
      stage = 'assert-service-role-env'
      assertServiceRoleEnv()
    } catch (cfg) {
      return jsonError(cfg instanceof Error ? cfg.message : String(cfg), 503)
    }
    stage = 'supabase-admin'
    const admin = getSupabaseAdmin()
    const ct = req.headers.get('content-type') || ''

    let title: string
    let raw_input: string
    let operation_type: string | null = null
    let aircraft_type: string | null = null
    let occurred_at: string | null = null
    let input_type: 'text' | 'pdf' | 'docx' = 'text'
    const sourceMeta: SourceMeta = { sourceType: 'text' }
    let sourceFile: File | null = null

    if (ct.includes('multipart/form-data')) {
      const form = await req.formData()
      title = String(form.get('title') || '')
      raw_input = String(form.get('raw_input') || '')
      operation_type = form.get('operation_type') ? String(form.get('operation_type')) : null
      aircraft_type = form.get('aircraft_type') ? String(form.get('aircraft_type')) : null
      occurred_at = form.get('occurred_at') ? String(form.get('occurred_at')) : null
      const it = form.get('input_type')
      if (it === 'pdf' || it === 'docx' || it === 'text') input_type = it
      const st = form.get('source_type')
      if (st === 'pdf' || st === 'docx') {
        sourceMeta.sourceType = st
        input_type = st
      }
      const fn = form.get('source_file_name')
      if (fn) sourceMeta.sourceFileName = String(fn)
      const wc = form.get('source_word_count')
      if (wc) sourceMeta.sourceWordCount = Number(wc)
      const f = form.get('file')
      if (f && f instanceof File && f.size > 0) sourceFile = f
    } else {
      const body = (await req.json()) as Record<string, unknown>
      title = String(body.title || '')
      raw_input = String(body.raw_input || '')
      operation_type = body.operation_type != null ? String(body.operation_type) : null
      aircraft_type = body.aircraft_type != null ? String(body.aircraft_type) : null
      occurred_at = body.occurred_at != null ? String(body.occurred_at) : null
      const it = body.input_type
      if (it === 'pdf' || it === 'docx' || it === 'text') input_type = it
      const st = body.source_type
      if (st === 'pdf' || st === 'docx') {
        sourceMeta.sourceType = st
        input_type = st
      }
      if (body.source_file_name) sourceMeta.sourceFileName = String(body.source_file_name)
      if (body.source_word_count != null) sourceMeta.sourceWordCount = Number(body.source_word_count)
    }

    if (!title.trim() || !raw_input.trim()) {
      return jsonError('Título e relato são obrigatórios', 400)
    }

    stage = 'ensure-public-user-row'
    const submittedById = await ensurePublicUserRow(
      admin,
      user.tenantId,
      user.userId,
      user.email,
      user.role
    )

    stage = 'fetch-tenant'
    const { data: tenant, error: terr } = await admin
      .from('tenants')
      .select('plan, credits_balance')
      .eq('id', user.tenantId)
      .single()
    if (terr || !tenant) return jsonError('Tenant não encontrado', 400)

    const isEnterprise = tenant.plan === 'enterprise'
    if (!isEnterprise && (tenant.credits_balance ?? 0) < 1) {
      return jsonError('Créditos insuficientes', 402)
    }

    try {
      stage = 'llm-config'
      await applyUserAiSettingsToEnv(admin, user.userId)
    } catch (cfgErr) {
      return jsonError(cfgErr instanceof Error ? cfgErr.message : String(cfgErr), 503)
    }

    stage = 'insert-event'
    const { data: eventRow, error: eerr } = await admin
      .from('events')
      .insert({
        tenant_id: user.tenantId,
        submitted_by: submittedById,
        title,
        raw_input,
        input_type,
        operation_type,
        aircraft_type,
        occurred_at: occurred_at || null,
        status: 'received',
      })
      .select('id')
      .single()

    if (eerr || !eventRow) {
      return jsonError(`Falha ao criar evento: ${eerr?.message || 'unknown'}`, 400)
    }

    const eventId = eventRow.id as string
    context = { ...context, eventId }

    await writeAuditLog({
      tenantId: user.tenantId, userId: user.userId, requestId,
      eventType: 'event_created', entityType: 'event', entityId: eventId,
      route: '/api/events', method: 'POST',
      metadata: { source_type: sourceMeta.sourceType ?? input_type },
    })

    sourceMeta.sourceType = sourceMeta.sourceType ?? (input_type === 'text' ? 'text' : input_type)

    let creditoDebitado = false
    let respostaSucesso = false
    let analysisId: string | null = null
    try {
      stage = 'debit-credit'
      await debitCreditForEvent({
        admin,
        tenantId: user.tenantId,
        submittedById,
        eventId,
        title,
        isEnterprise,
        currentBalance: tenant.credits_balance ?? 0,
      })
      creditoDebitado = true

      await writeAuditLog({
        tenantId: user.tenantId, userId: user.userId, requestId,
        eventType: 'analysis_started', entityType: 'event', entityId: eventId,
        route: '/api/events', method: 'POST',
        metadata: { source: 'new_event' },
      })

      stage = 'run-pipeline'
      const r = await completeSeraAnalysisAfterEventCreated(
        admin,
        { userId: user.userId, tenantId: user.tenantId },
        eventId,
        raw_input,
        sourceMeta,
        sourceFile
      )
      analysisId = r.analysisId
      respostaSucesso = true
    } catch (err) {
      await admin.from('events').update({ status: 'failed' }).eq('id', eventId)
      logEventsError(err, stage, context)
      await writeAuditLog({
        tenantId: user.tenantId, userId: user.userId, requestId,
        eventType: 'analysis_failed', entityType: 'event', entityId: eventId,
        route: '/api/events', method: 'POST', status: 'failed',
        metadata: { stage },
      })
      return jsonError(
        err instanceof Error ? `Falha no pipeline SERA: ${err.message}` : 'Falha no pipeline SERA',
        500
      )
    } finally {
      // Garante estorno quando o débito ocorreu mas a análise não terminou com sucesso.
      if (creditoDebitado && !respostaSucesso) {
        try {
          const { data: tNow } = await admin
            .from('tenants')
            .select('credits_balance')
            .eq('id', user.tenantId)
            .single()

          await refundCreditForFailedAnalysis({
            admin,
            tenantId: user.tenantId,
            submittedById,
            eventId,
            title,
            isEnterprise,
            currentBalanceAfterDebit: tNow?.credits_balance ?? 0,
          })
        } catch (refundErr) {
          logEventsError(refundErr, 'refund', context)
        }
      }
    }

    if (!analysisId) return jsonError('Falha interna: analysisId ausente', 500)

    const { data: row } = await admin
      .from('analyses')
      .select('*')
      .eq('id', analysisId)
      .single()

    const edits = await fetchEditHistoryForAnalysis(admin, analysisId, user.tenantId)
    const seraAnalysis = row
      ? seraAnalysisToJson(
          buildSeraAnalysisFromDbRow(row as Record<string, unknown>, user.userId, raw_input, edits)
        )
      : null

    const rowData = row as Record<string, unknown> | null
    const completeness = rowData?.analysis_completeness as string | null
    await writeAuditLog({
      tenantId: user.tenantId, userId: user.userId, requestId,
      eventType: completeness === 'complete' ? 'analysis_completed' : 'analysis_partial',
      entityType: 'analysis', entityId: analysisId,
      route: '/api/events', method: 'POST',
      status: completeness === 'complete' ? 'success' : 'partial',
      metadata: {
        motor_version: rowData?.motor_version,
        analysis_completeness: completeness,
        completeness_reason: rowData?.completeness_reason,
        event_id: eventId,
      },
    })

    return NextResponse.json(
      { event_id: eventId, status: 'completed', analysis_id: analysisId, seraAnalysis },
      { headers: { 'x-request-id': requestId } }
    )
  } catch (e) {
    if (e instanceof Response) return e
    logEventsError(e, stage, context)
    return jsonError(String(e), 500)
  }
}
