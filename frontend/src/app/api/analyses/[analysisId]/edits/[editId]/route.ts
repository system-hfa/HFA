import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { recalculate } from '@/lib/sera/recalculate'

export const maxDuration = 300

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ analysisId: string; editId: string }> }
) {
  try {
    const user = await requireBearerUser(req)
    const { analysisId, editId } = await ctx.params
    const admin = getSupabaseAdmin()

    const { data: edit, error: e1 } = await admin
      .from('analysis_edits')
      .select('*')
      .eq('id', editId)
      .eq('analysis_id', analysisId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (e1) return jsonError(e1.message, 400)
    if (!edit) return jsonError('Edição não encontrada', 404)

    let valueBefore = edit.value_before
    if (valueBefore == null) return jsonError('Não há valor anterior para reverter', 400)

    if (typeof valueBefore === 'string') {
      try {
        valueBefore = JSON.parse(valueBefore)
      } catch {
        /* manter string */
      }
    }

    const { data: analysisRow, error: e2 } = await admin
      .from('analyses')
      .select('*, events(raw_input)')
      .eq('id', analysisId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (e2 || !analysisRow) return jsonError('Análise não encontrada', 404)

    const analysis = { ...analysisRow } as Record<string, unknown>
    const ev = analysis.events as { raw_input?: string } | null
    delete analysis.events
    const rawInput = ev?.raw_input ?? ''

    try {
      const resultData = await recalculate({
        analysis,
        raw_input: rawInput,
        step_altered: edit.step_altered,
        field: edit.field_changed,
        new_value: String(valueBefore),
      })

      const updates = resultData.updates
      updates.edited_at = new Date().toISOString()
      updates.edit_count = Math.max(0, ((analysisRow.edit_count as number) || 1) - 1)

      await admin.from('analyses').update(updates).eq('id', analysisId)
      await admin.from('analysis_edits').delete().eq('id', editId)

      const { data: fresh } = await admin.from('analyses').select('*').eq('id', analysisId).single()
      return NextResponse.json({ analysis: fresh, reverted_edit_id: editId })
    } catch (exc) {
      return jsonError(
        `Erro ao reverter: ${exc instanceof Error ? exc.message : String(exc)}`,
        500
      )
    }
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
