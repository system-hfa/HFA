import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { generateSeraPdfBuffer } from '@/lib/sera/pdf-report'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function GET(req: Request, ctx: { params: Promise<{ analysisId: string }> }) {
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

    const ev = analysis.events as Record<string, unknown> | null
    const event = ev || {}
    const { events: _, ...analysisFlat } = analysis as Record<string, unknown>

    try {
      const pdfBytes = await generateSeraPdfBuffer(analysisFlat, event as Record<string, unknown>)
      const rawTitle = String(event.title ?? 'evento')
      const slug = rawTitle.replace(/[^\w\-]/g, '-').slice(0, 40).replace(/-+$/g, '')
      const dateStr = new Date().toISOString().slice(0, 10)
      const filename = `SERA_${slug || 'evento'}_${dateStr}.pdf`

      return new NextResponse(new Uint8Array(pdfBytes), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    } catch (exc) {
      return jsonError(
        `Falha ao gerar PDF: ${exc instanceof Error ? exc.message : String(exc)}`,
        500
      )
    }
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
