import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { generateSeraPdfBuffer } from '@/lib/sera/pdf-report'
import { getOrCreateRequestId, buildErrorResponse } from '@/lib/observability/request-id'
import { writeAuditLog } from '@/lib/observability/audit'

export async function GET(req: Request, ctx: { params: Promise<{ analysisId: string }> }) {
  const requestId = getOrCreateRequestId(req)
  const jsonError = (message: string, status: number) => buildErrorResponse(message, status, requestId)
  try {
    const user = await requireBearerUser(req)
    const { analysisId } = await ctx.params
    const admin = getSupabaseAdmin()

    const { data: analysis, error } = await admin
      .from('analyses')
      .select('*, events(title, operation_type, aircraft_type, occurred_at, raw_input)')
      .eq('id', analysisId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (error) return jsonError(error.message, 400)
    if (!analysis) return jsonError('Análise não encontrada', 404)

    // Bloquear relatório formal se análise incompleta (P0-002 / D-006).
    // partial   → bloquear com HTTP 422.
    // null      → análise histórica pré-v0.3-I; permitir com header de aviso.
    // complete  → normal.
    const completeness = (analysis as Record<string, unknown>).analysis_completeness as string | null | undefined
    if (completeness === 'partial') {
      return jsonError(
        'Análise incompleta — relatório formal indisponível. Um ou mais campos de classificação (P/O/A/ERC) estão ausentes ou inválidos. Reprocesse o evento ou edite manualmente antes de exportar.',
        422
      )
    }
    const isLegacyAnalysis = completeness == null

    const ev = analysis.events as Record<string, unknown> | null
    const event = ev || {}
    const { events: _, ...analysisFlat } = analysis as Record<string, unknown>

    try {
      const pdfBytes = await generateSeraPdfBuffer(analysisFlat, event as Record<string, unknown>)
      const rawTitle = String(event.title ?? 'evento')
      const slug = rawTitle.replace(/[^\w\-]/g, '-').slice(0, 40).replace(/-+$/g, '')
      const dateStr = new Date().toISOString().slice(0, 10)
      const filename = `SERA_${slug || 'evento'}_${dateStr}.pdf`

      const motorVersion = (analysis as Record<string, unknown>).motor_version as string | null
      await writeAuditLog({
        tenantId: user.tenantId, userId: user.userId, requestId,
        eventType: 'report_generated', entityType: 'analysis', entityId: analysisId,
        route: '/api/analyses/pdf', method: 'GET',
        metadata: {
          report_type: 'analysis_pdf',
          analysis_completeness: completeness ?? 'legacy',
          motor_version: motorVersion,
        },
      })

      const headers: Record<string, string> = {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'x-request-id': requestId,
      }
      if (isLegacyAnalysis) {
        headers['X-Analysis-Completeness-Warning'] =
          'legacy-analysis; completeness unverified (pre-v0.3-I)'
      }

      return new NextResponse(new Uint8Array(pdfBytes), { status: 200, headers })
    } catch (exc) {
      console.error('[/api/analyses/pdf]', { requestId, error: exc instanceof Error ? exc.message : String(exc) })
      return jsonError(
        `Falha ao gerar PDF: ${exc instanceof Error ? exc.message : String(exc)}`,
        500
      )
    }
  } catch (e) {
    if (e instanceof Response) return e
    console.error('[/api/analyses/pdf]', { requestId, error: String(e) })
    return jsonError(String(e), 500)
  }
}
