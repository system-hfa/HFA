import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { buildAnalysisUpsertPayload, runSeraPipeline, type SourceMeta } from '@/lib/sera/pipeline'

export const maxDuration = 300

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

/**
 * POST /api/analyze — executa apenas o pipeline e persiste uma análise
 * quando `eventId` e `tenantId` estão disponíveis no corpo (uso avançado).
 * O fluxo principal do produto é POST /api/events (cria evento + pipeline).
 */
export async function POST(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const body = (await req.json()) as {
      eventoNarrativa: string
      userId?: string
      analysisId?: string
      eventId?: string
      sourceType?: 'text' | 'pdf' | 'docx'
      sourceFileName?: string
      sourceWordCount?: number
      sourceFileUrl?: string | null
    }

    if (!body.eventoNarrativa?.trim()) {
      return jsonError('eventoNarrativa é obrigatório', 400)
    }

    if (body.userId && body.userId !== user.userId) {
      return jsonError('userId não corresponde ao token', 403)
    }

    const eventId = body.eventId
    if (!eventId) {
      return jsonError('eventId é obrigatório para gravar a análise', 400)
    }

    const admin = getSupabaseAdmin()
    const { data: ev, error: evErr } = await admin
      .from('events')
      .select('id, tenant_id, raw_input')
      .eq('id', eventId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (evErr || !ev) return jsonError('Evento não encontrado', 404)

    const rawInput = body.eventoNarrativa.trim()
    const sourceMeta: SourceMeta = {
      sourceType: body.sourceType ?? 'text',
      sourceFileName: body.sourceFileName,
      sourceWordCount: body.sourceWordCount,
      sourceFileUrl: body.sourceFileUrl ?? null,
    }

    const steps = await runSeraPipeline(rawInput)
    const payload = buildAnalysisUpsertPayload(
      eventId,
      user.tenantId,
      rawInput,
      steps,
      sourceMeta
    )

    const { data: upserted, error: aerr } = await admin
      .from('analyses')
      .upsert(payload, { onConflict: 'event_id' })
      .select('*')
      .single()

    if (aerr || !upserted) {
      return jsonError(aerr?.message || 'Falha ao gravar análise', 400)
    }

    return NextResponse.json({ analysis: upserted })
  } catch (e) {
    if (e instanceof Response) return e
    console.error(e)
    return jsonError(String(e), 500)
  }
}
