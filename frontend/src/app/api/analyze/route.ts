import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin, assertServiceRoleEnv } from '@/lib/server/supabase-admin'
import { completeSeraAnalysisAfterEventCreated } from '@/lib/server/complete-sera-analysis'
import { type SourceMeta } from '@/lib/sera/pipeline'
import {
  debitCreditForEvent,
  ensurePublicUserRow,
  refundCreditForFailedAnalysis,
} from '@/lib/server/tenant-user'
import {
  buildSeraAnalysisFromDbRow,
  fetchEditHistoryForAnalysis,
  seraAnalysisToJson,
} from '@/lib/sera/sera-analysis-mapper'
import { applyUserAiSettingsToEnv } from '@/lib/server/apply-user-ai-settings-to-env'
import { getOrCreateRequestId } from '@/lib/observability/request-id'
import { writeAuditLog } from '@/lib/observability/audit'
import { isSeraVNextCanonicalAnalyzeEnabled } from '@/lib/sera-vnext-runtime/feature-flags'
import { createSeraVNextAnalysis } from '@/lib/sera-vnext-product/persistence/create-analysis'

export const maxDuration = 300

function sanitizedError(code: string, message: string, requestId: string, status: number) {
  return NextResponse.json(
    { error: { code, message, requestId } },
    { status, headers: { 'x-request-id': requestId } }
  )
}

/**
 * POST /api/analyze
 *
 * - Com `eventId`: reexecuta o pipeline para esse evento (atualiza `raw_input` do evento),
 *   **sem** novo débito de crédito.
 * - Sem `eventId`: cria evento mínimo (consome 1 crédito), executa pipeline e devolve `seraAnalysis`.
 */
export async function POST(req: Request) {
  const requestId = getOrCreateRequestId(req)
  try {
    const user = await requireBearerUser(req)
    try {
      assertServiceRoleEnv()
    } catch (cfg) {
      console.error('[/api/analyze] SERVICE_ROLE_KEY not configured', { requestId })
      return sanitizedError('SERVICE_UNAVAILABLE', 'Serviço temporariamente indisponível.', requestId, 503)
    }
    const admin = getSupabaseAdmin()
    const body = (await req.json()) as {
      eventoNarrativa: string
      userId?: string
      title?: string
      eventId?: string
      operation_type?: string | null
      aircraft_type?: string | null
      occurred_at?: string | null
      sourceType?: 'text' | 'pdf' | 'docx'
      sourceFileName?: string
      sourceWordCount?: number
      sourceFileUrl?: string | null
    }

    const rawInput = body.eventoNarrativa?.trim()
    if (!rawInput) return sanitizedError('MISSING_INPUT', 'eventoNarrativa é obrigatório.', requestId, 400)

    if (body.userId && body.userId !== user.userId) {
      return sanitizedError('USER_MISMATCH', 'Identidade não corresponde ao token.', requestId, 403)
    }

    const sourceMeta: SourceMeta = {
      sourceType: body.sourceType ?? 'text',
      sourceFileName: body.sourceFileName,
      sourceWordCount: body.sourceWordCount,
      sourceFileUrl: body.sourceFileUrl ?? null,
    }

    const submittedById = await ensurePublicUserRow(
      admin,
      user.tenantId,
      user.userId,
      user.email,
      user.role
    )

    if (body.eventId) {
      const { data: ev, error: evErr } = await admin
        .from('events')
        .select('id, tenant_id')
        .eq('id', body.eventId)
        .eq('tenant_id', user.tenantId)
        .is('deleted_at', null)
        .maybeSingle()

      if (evErr || !ev) return sanitizedError('EVENT_NOT_FOUND', 'Evento não encontrado.', requestId, 404)

      try {
        await applyUserAiSettingsToEnv(admin, user.userId)
      } catch (cfgErr) {
        console.error('[/api/analyze] AI settings config error', { requestId })
        return sanitizedError('CONFIGURATION_ERROR', 'Erro de configuração do motor.', requestId, 503)
      }

      await admin.from('events').update({ raw_input: rawInput }).eq('id', body.eventId).is('deleted_at', null)

      await writeAuditLog({
        tenantId: user.tenantId, userId: user.userId, requestId,
        eventType: 'analysis_started', entityType: 'event', entityId: body.eventId,
        route: '/api/analyze', method: 'POST',
        metadata: { source: 'reanalysis' },
      })

      try {
        const { analysisId } = await completeSeraAnalysisAfterEventCreated(
          admin,
          { userId: user.userId, tenantId: user.tenantId },
          body.eventId,
          rawInput,
          sourceMeta,
          null
        )

        const { data: row } = await admin
          .from('analyses')
          .select('*')
          .eq('id', analysisId)
          .single()

        const edits = await fetchEditHistoryForAnalysis(admin, analysisId, user.tenantId)
        const seraAnalysis = row
          ? seraAnalysisToJson(
              buildSeraAnalysisFromDbRow(
                row as Record<string, unknown>,
                user.userId,
                rawInput,
                edits
              )
            )
          : null

        const rowData = row as Record<string, unknown> | null
        const completeness = rowData?.analysis_completeness as string | null
        await writeAuditLog({
          tenantId: user.tenantId, userId: user.userId, requestId,
          eventType: completeness === 'complete' ? 'analysis_completed' : 'analysis_partial',
          entityType: 'analysis', entityId: analysisId,
          route: '/api/analyze', method: 'POST',
          status: completeness === 'complete' ? 'success' : 'partial',
          metadata: {
            motor_version: rowData?.motor_version,
            analysis_completeness: completeness,
            completeness_reason: rowData?.completeness_reason,
            event_id: body.eventId,
          },
        })

        return NextResponse.json(
          { event_id: body.eventId, analysis_id: analysisId, seraAnalysis },
          { headers: { 'x-request-id': requestId } }
        )
      } catch (err) {
        await admin.from('events').update({ status: 'failed' }).eq('id', body.eventId).is('deleted_at', null)
        console.error('[/api/analyze] reanalysis error', { requestId, error: err instanceof Error ? err.message : String(err) })
        await writeAuditLog({
          tenantId: user.tenantId, userId: user.userId, requestId,
          eventType: 'analysis_failed', entityType: 'event', entityId: body.eventId,
          route: '/api/analyze', method: 'POST', status: 'failed',
          metadata: { source: 'reanalysis' },
        })
        return sanitizedError('ANALYSIS_FAILED', 'Falha ao executar a análise. Tente novamente.', requestId, 500)
      }
    }

    const title =
      body.title?.trim() ||
      `SERA ${new Date().toISOString().slice(0, 10)} ${String(rawInput).slice(0, 48)}`

    const { data: tenant, error: terr } = await admin
      .from('tenants')
      .select('plan, credits_balance')
      .eq('id', user.tenantId)
      .single()
    if (terr || !tenant) return sanitizedError('TENANT_NOT_FOUND', 'Tenant não encontrado.', requestId, 400)

    const isEnterprise = tenant.plan === 'enterprise'
    if (!isEnterprise && (tenant.credits_balance ?? 0) < 1) {
      return sanitizedError('INSUFFICIENT_CREDITS', 'Créditos insuficientes para análise.', requestId, 402)
    }

    try {
      await applyUserAiSettingsToEnv(admin, user.userId)
    } catch (cfgErr) {
      console.error('[/api/analyze] AI settings config error', { requestId })
      return sanitizedError('CONFIGURATION_ERROR', 'Erro de configuração do motor.', requestId, 503)
    }

    const inputType = sourceMeta.sourceType === 'docx' || sourceMeta.sourceType === 'pdf'
      ? sourceMeta.sourceType
      : 'text'

    const { data: eventRow, error: eerr } = await admin
      .from('events')
      .insert({
        tenant_id: user.tenantId,
        submitted_by: submittedById,
        title,
        raw_input: rawInput,
        input_type: inputType,
        operation_type: body.operation_type ?? null,
        aircraft_type: body.aircraft_type ?? null,
        occurred_at: body.occurred_at ?? null,
        status: 'received',
      })
      .select('id')
      .single()

    if (eerr || !eventRow) {
      console.error('[/api/analyze] event creation failed', { requestId, error: eerr?.message })
      return sanitizedError('EVENT_CREATION_FAILED', 'Falha ao criar evento.', requestId, 400)
    }

    const eventId = eventRow.id as string

    await writeAuditLog({
      tenantId: user.tenantId, userId: user.userId, requestId,
      eventType: 'event_created', entityType: 'event', entityId: eventId,
      route: '/api/analyze', method: 'POST',
      metadata: { source_type: sourceMeta.sourceType },
    })

    let creditoDebitado = false
    let respostaSucesso = false
    let analysisId: string | null = null

    try {
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
        route: '/api/analyze', method: 'POST',
        metadata: { source: 'new_analysis' },
      })

      if (isSeraVNextCanonicalAnalyzeEnabled()) {
        const vnextResult = await createSeraVNextAnalysis({
          input: {
            title,
            narrative: rawInput,
            sourceType: 'INTERNAL_PILOT',
            clientRequestId: `CANONICAL_ROUTE_${eventId}`,
            sourceFlowOverride: 'VNEXT_CANONICAL',
            metadata: { eventId, source: 'canonical_route' },
          },
          context: { tenantId: user.tenantId, userId: submittedById, role: user.role, email: user.email ?? '', requestId },
        })
        analysisId = vnextResult.analysis.id
        respostaSucesso = true
        const engineOutput = vnextResult.analysis.engine_output as Record<string, unknown>
        await writeAuditLog({
          tenantId: user.tenantId, userId: user.userId, requestId,
          eventType: 'canonical_engine.used', entityType: 'analysis', entityId: vnextResult.analysis.id,
          route: '/api/analyze', method: 'POST', status: 'success',
          metadata: {
            source_flow: vnextResult.analysis.source_flow,
            engine_runtime_version: vnextResult.analysis.engine_runtime_version,
            canonical_tree_version: vnextResult.analysis.canonical_tree_version,
            event_id: eventId,
          },
        })
        return NextResponse.json(
          {
            event_id: eventId,
            analysis_id: vnextResult.analysis.id,
            sourceFlow: vnextResult.analysis.source_flow,
            engineRuntimeVersion: vnextResult.analysis.engine_runtime_version,
            canonicalTreeVersion: vnextResult.analysis.canonical_tree_version,
            warnings: vnextResult.analysis.warnings,
            guardrails: engineOutput?.guardrails ?? null,
            guardrailEvidence: engineOutput?.guardrailEvidence ?? {},
            reviewerOutput: engineOutput?.reviewerOutput ?? null,
            escapePoint: engineOutput?.escapePoint ?? null,
            axes: engineOutput?.axes ?? null,
            preconditions: engineOutput?.preconditions ?? null,
            humanReviewRequired: true,
            candidateOnly: true,
            limitations: vnextResult.analysis.limitations ?? [],
            seraAnalysis: null,
            vnextNotice: 'Esta análise usa o motor vNext (candidate-only). O resultado completo está disponível apenas na interface administrativa em /admin/sera-vnext/analyses. O fluxo comum ainda não renderiza a saída completa do vNext.',
          },
          { headers: { 'x-request-id': requestId } }
        )
      }

      const r = await completeSeraAnalysisAfterEventCreated(
        admin,
        { userId: user.userId, tenantId: user.tenantId },
        eventId,
        rawInput,
        sourceMeta,
        null
      )

      analysisId = r.analysisId
      respostaSucesso = true
    } catch (err) {
      await admin.from('events').update({ status: 'failed' }).eq('id', eventId).is('deleted_at', null)
      console.error('[/api/analyze] analysis error', { requestId, error: err instanceof Error ? err.message : String(err) })
      await writeAuditLog({
        tenantId: user.tenantId, userId: user.userId, requestId,
        eventType: 'analysis_failed', entityType: 'event', entityId: eventId,
        route: '/api/analyze', method: 'POST', status: 'failed',
        metadata: { source: 'new_analysis' },
      })
      return sanitizedError('ANALYSIS_FAILED', 'Falha ao executar a análise. Tente novamente.', requestId, 500)
    } finally {
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
          console.error('[/api/analyze] refund', { requestId, error: refundErr instanceof Error ? refundErr.message : String(refundErr) })
        }
      }
    }

    if (!analysisId) return sanitizedError('INTERNAL_ERROR', 'Falha interna. Tente novamente.', requestId, 500)

    const { data: row } = await admin
      .from('analyses')
      .select('*')
      .eq('id', analysisId)
      .single()

    const edits = await fetchEditHistoryForAnalysis(admin, analysisId, user.tenantId)
    const seraAnalysis = row
      ? seraAnalysisToJson(
          buildSeraAnalysisFromDbRow(
            row as Record<string, unknown>,
            user.userId,
            rawInput,
            edits
          )
        )
      : null

    const rowData2 = row as Record<string, unknown> | null
    const completeness2 = rowData2?.analysis_completeness as string | null
    await writeAuditLog({
      tenantId: user.tenantId, userId: user.userId, requestId,
      eventType: completeness2 === 'complete' ? 'analysis_completed' : 'analysis_partial',
      entityType: 'analysis', entityId: analysisId,
      route: '/api/analyze', method: 'POST',
      status: completeness2 === 'complete' ? 'success' : 'partial',
      metadata: {
        motor_version: rowData2?.motor_version,
        analysis_completeness: completeness2,
        completeness_reason: rowData2?.completeness_reason,
        event_id: eventId,
      },
    })

    return NextResponse.json(
      { event_id: eventId, analysis_id: analysisId, seraAnalysis },
      { headers: { 'x-request-id': requestId } }
    )
  } catch (e) {
    if (e instanceof Response) return e
    console.error('[/api/analyze] unhandled error', { requestId, error: e instanceof Error ? e.message : String(e) })
    return sanitizedError('INTERNAL_ERROR', 'Erro interno. Tente novamente.', requestId, 500)
  }
}
