import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { recalculate, DEPENDENCY_MAP } from '@/lib/sera/recalculate'

export const maxDuration = 300

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

/**
 * POST /api/recalculate
 * Corpo: { analysisId, stepAlterado, novaClassificacao, field?, motivo?, new_justification? }
 * `field` opcional: inferido de stepAlterado quando omitido (perception_code, objective_code, action_code).
 */
export async function POST(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const body = (await req.json()) as {
      analysisId: string
      stepAlterado: string
      novaClassificacao: string
      field?: string
      motivo?: string
      new_justification?: string
    }

    const analysisId = body.analysisId
    if (!analysisId) return jsonError('analysisId é obrigatório', 400)

    let field = body.field
    if (!field) {
      const m: Record<string, string> = {
        '3': 'perception_code',
        '4': 'objective_code',
        '5': 'action_code',
        '2': 'escape_point',
      }
      field = m[body.stepAlterado] || 'perception_code'
    }

    const admin = getSupabaseAdmin()
    const { data: row, error } = await admin
      .from('analyses')
      .select('*, events(raw_input)')
      .eq('id', analysisId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (error) return jsonError(error.message, 400)
    if (!row) return jsonError('Análise não encontrada', 404)

    const analysis = { ...row } as Record<string, unknown>
    const ev = analysis.events as { raw_input?: string } | null
    delete analysis.events
    const rawInput = ev?.raw_input ?? ''

    const fieldMap: Record<string, unknown> = {
      perception_code: analysis.perception_code,
      objective_code: analysis.objective_code,
      action_code: analysis.action_code,
      escape_point: analysis.escape_point,
      unsafe_act: analysis.unsafe_act,
    }
    const valueBefore = fieldMap[field] ?? (analysis as Record<string, unknown>)[field]

    const resultData = await recalculate({
      analysis,
      raw_input: rawInput,
      step_altered: body.stepAlterado,
      field,
      new_value: body.novaClassificacao,
      new_justification: body.new_justification || '',
    })

    const updates = resultData.updates
    updates.edited_at = new Date().toISOString()
    updates.edit_count = ((row.edit_count as number) || 0) + 1

    await admin.from('analyses').update(updates).eq('id', analysisId)

    const dep = DEPENDENCY_MAP[body.stepAlterado] ?? { recalculate: [], preserve: [] }
    await admin.from('analysis_edits').insert({
      analysis_id: analysisId,
      tenant_id: user.tenantId,
      step_altered: body.stepAlterado,
      field_changed: field,
      value_before: valueBefore != null ? JSON.stringify(valueBefore) : null,
      value_after: JSON.stringify(body.novaClassificacao),
      steps_recalculated: dep.recalculate,
      steps_preserved: dep.preserve,
      reason: body.motivo || null,
    })

    const { data: fresh } = await admin.from('analyses').select('*').eq('id', analysisId).single()

    return NextResponse.json({
      analysis: fresh,
      stepsRecalculados: resultData.steps_recalculated,
      stepsPreservados: resultData.steps_preserved,
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
