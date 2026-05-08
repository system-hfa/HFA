import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import {
  buildSeraAnalysisFromDbRow,
  fetchEditHistoryForAnalysis,
  seraAnalysisToJson,
} from '@/lib/sera/sera-analysis-mapper'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function GET(req: Request, ctx: { params: Promise<{ analysisId: string }> }) {
  try {
    const user = await requireBearerUser(req)
    const { analysisId } = await ctx.params
    const admin = getSupabaseAdmin()

    const { data: row, error } = await admin
      .from('analyses')
      .select('*, events(raw_input)')
      .eq('id', analysisId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (error) return jsonError(error.message, 400)
    if (!row) return jsonError('Análise não encontrada', 404)

    const ev = row.events as { raw_input?: string } | null
    const narrative = ev?.raw_input ?? String(row.event_summary ?? '')
    const base = { ...row } as Record<string, unknown>
    delete base.events

    const edits = await fetchEditHistoryForAnalysis(admin, analysisId, user.tenantId)
    const seraAnalysis = buildSeraAnalysisFromDbRow(base, user.userId, narrative, edits)

    return NextResponse.json({
      analysis: row,
      seraAnalysis: seraAnalysisToJson(seraAnalysis),
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
