import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { completeSeraAnalysisAfterEventCreated } from '@/lib/server/complete-sera-analysis'
import { debitCreditForEvent, ensurePublicUserRow } from '@/lib/server/tenant-user'
import { type SourceMeta } from '@/lib/sera/pipeline'
import {
  buildSeraAnalysisFromDbRow,
  fetchEditHistoryForAnalysis,
  seraAnalysisToJson,
} from '@/lib/sera/sera-analysis-mapper'

export const maxDuration = 300

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

/**
 * POST /api/analyze
 *
 * - Com `eventId`: reexecuta o pipeline para esse evento (atualiza `raw_input` do evento),
 *   **sem** novo débito de crédito.
 * - Sem `eventId`: cria evento mínimo (consome 1 crédito), executa pipeline e devolve `seraAnalysis`.
 */
export async function POST(req: Request) {
  try {
    const user = await requireBearerUser(req)
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
    if (!rawInput) return jsonError('eventoNarrativa é obrigatório', 400)

    if (body.userId && body.userId !== user.userId) {
      return jsonError('userId não corresponde ao token', 403)
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
        .maybeSingle()

      if (evErr || !ev) return jsonError('Evento não encontrado', 404)

      await admin.from('events').update({ raw_input: rawInput }).eq('id', body.eventId)

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

        return NextResponse.json({
          event_id: body.eventId,
          analysis_id: analysisId,
          seraAnalysis,
        })
      } catch (err) {
        await admin.from('events').update({ status: 'failed' }).eq('id', body.eventId)
        console.error(err)
        return jsonError(err instanceof Error ? err.message : 'Falha na análise SERA', 500)
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
    if (terr || !tenant) return jsonError('Tenant não encontrado', 400)

    const isEnterprise = tenant.plan === 'enterprise'
    if (!isEnterprise && (tenant.credits_balance ?? 0) < 1) {
      return jsonError('Créditos insuficientes', 402)
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
      return jsonError(`Falha ao criar evento: ${eerr?.message || 'unknown'}`, 400)
    }

    const eventId = eventRow.id as string

    await debitCreditForEvent({
      admin,
      tenantId: user.tenantId,
      submittedById,
      eventId,
      title,
      isEnterprise,
      currentBalance: tenant.credits_balance ?? 0,
    })

    try {
      const { analysisId } = await completeSeraAnalysisAfterEventCreated(
        admin,
        { userId: user.userId, tenantId: user.tenantId },
        eventId,
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

      return NextResponse.json({
        event_id: eventId,
        analysis_id: analysisId,
        seraAnalysis,
      })
    } catch (err) {
      await admin.from('events').update({ status: 'failed' }).eq('id', eventId)
      console.error(err)
      return jsonError(err instanceof Error ? err.message : 'Falha na análise SERA', 500)
    }
  } catch (e) {
    if (e instanceof Response) return e
    console.error(e)
    return jsonError(String(e), 500)
  }
}
