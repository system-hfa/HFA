import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { recalculate, DEPENDENCY_MAP } from '@/lib/sera/recalculate'

export const maxDuration = 300

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function POST(req: Request, ctx: { params: Promise<{ analysisId: string }> }) {
  try {
    const user = await requireBearerUser(req)
    const { analysisId } = await ctx.params
    const body = (await req.json()) as {
      step_altered: string
      field: string
      new_value: string
      new_justification?: string
      reason?: string
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
    const valueBefore = fieldMap[body.field] ?? (analysis as Record<string, unknown>)[body.field]

    let resultData: Awaited<ReturnType<typeof recalculate>>
    try {
      resultData = await recalculate({
        analysis,
        raw_input: rawInput,
        step_altered: body.step_altered,
        field: body.field,
        new_value: body.new_value,
        new_justification: body.new_justification || '',
      })
    } catch (exc) {
      return jsonError(`Erro no recálculo: ${exc instanceof Error ? exc.message : String(exc)}`, 500)
    }

    const updates = resultData.updates
    updates.edited_at = new Date().toISOString()
    updates.edit_count = ((row.edit_count as number) || 0) + 1

    const { error: uerr } = await admin.from('analyses').update(updates).eq('id', analysisId)
    if (uerr) return jsonError(uerr.message, 400)

    const dep = DEPENDENCY_MAP[body.step_altered] ?? { recalculate: [], preserve: [] }
    const editRecord = {
      analysis_id: analysisId,
      tenant_id: user.tenantId,
      step_altered: body.step_altered,
      field_changed: body.field,
      value_before: valueBefore != null ? JSON.stringify(valueBefore) : null,
      value_after: JSON.stringify(body.new_value),
      steps_recalculated: dep.recalculate,
      steps_preserved: dep.preserve,
      reason: body.reason || null,
    }

    const { data: editIns, error: eIns } = await admin
      .from('analysis_edits')
      .insert(editRecord)
      .select('*')
      .maybeSingle()

    const { data: fresh } = await admin.from('analyses').select('*').eq('id', analysisId).single()

    return NextResponse.json({
      analysis: fresh,
      edit: editIns ?? editRecord,
      steps_recalculated: resultData.steps_recalculated,
      steps_preserved: resultData.steps_preserved,
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
