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
import { assertLlmEnvConfigured } from '@/lib/sera/llm'
import { debitCreditForEvent, ensurePublicUserRow, refundCreditForFailedAnalysis } from '@/lib/server/tenant-user'

export const maxDuration = 300

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function GET(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()
    const { data, error } = await admin
      .from('events')
      .select('*')
      .eq('tenant_id', user.tenantId)
      .order('created_at', { ascending: false })
    if (error) return jsonError(error.message, 400)
    return NextResponse.json(data ?? [])
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireBearerUser(req)
    try {
      assertServiceRoleEnv()
    } catch (cfg) {
      return jsonError(cfg instanceof Error ? cfg.message : String(cfg), 503)
    }
    const admin = getSupabaseAdmin()
    const ct = req.headers.get('content-type') || ''

    let title: string
    let raw_input: string
    let operation_type: string | null = null
    let aircraft_type: string | null = null
    let occurred_at: string | null = null
    let input_type: 'text' | 'pdf' | 'docx' = 'text'
    let sourceMeta: SourceMeta = { sourceType: 'text' }
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

    const submittedById = await ensurePublicUserRow(
      admin,
      user.tenantId,
      user.userId,
      user.email,
      user.role
    )

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
      assertLlmEnvConfigured()
    } catch (cfgErr) {
      return jsonError(cfgErr instanceof Error ? cfgErr.message : String(cfgErr), 503)
    }

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

    sourceMeta.sourceType = sourceMeta.sourceType ?? (input_type === 'text' ? 'text' : input_type)

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
    } catch (debitErr) {
      console.error(debitErr)
      await admin.from('events').delete().eq('id', eventId)
      return jsonError('Não foi possível reservar o crédito para esta análise.', 500)
    }

    let analysisId: string
    try {
      const r = await completeSeraAnalysisAfterEventCreated(
        admin,
        { userId: user.userId, tenantId: user.tenantId },
        eventId,
        raw_input,
        sourceMeta,
        sourceFile
      )
      analysisId = r.analysisId
    } catch (err) {
      await admin.from('events').update({ status: 'failed' }).eq('id', eventId)
      console.error(err)
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
        console.error('Falha ao estornar crédito após análise com erro', refundErr)
      }
      return jsonError(err instanceof Error ? err.message : 'Falha na análise SERA', 500)
    }

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

    return NextResponse.json({
      event_id: eventId,
      status: 'completed',
      analysis_id: analysisId,
      seraAnalysis,
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
