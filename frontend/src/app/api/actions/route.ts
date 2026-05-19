import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin, assertServiceRoleEnv } from '@/lib/server/supabase-admin'
import { getOrCreateRequestId, buildErrorResponse } from '@/lib/observability/request-id'

export async function GET(req: Request) {
  const requestId = getOrCreateRequestId(req)
  const jsonError = (message: string, status: number) => buildErrorResponse(message, status, requestId)
  try {
    const user = await requireBearerUser(req)
    assertServiceRoleEnv()
    const admin = getSupabaseAdmin()

    const { data, error } = await admin
      .from('corrective_actions')
      .select('id, title, description, related_failure, status, responsible, due_date, completed_at, created_at, analysis_id, analyses(event_id)')
      .eq('tenant_id', user.tenantId)
      .order('created_at', { ascending: false })

    if (error) return jsonError(error.message, 500)

    const rows = (data ?? []).map((row) => {
      const analysis = row.analyses as { event_id?: string | null } | null
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        related_failure: row.related_failure,
        status: row.status,
        responsible: row.responsible,
        due_date: row.due_date,
        completed_at: row.completed_at,
        created_at: row.created_at,
        analysis_id: row.analysis_id,
        event_id: analysis?.event_id ?? null,
      }
    })
    return NextResponse.json(rows, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    console.error('[/api/actions GET]', { requestId, error: String(e) })
    return jsonError(String(e), 500)
  }
}

export async function POST(req: Request) {
  const requestId = getOrCreateRequestId(req)
  const jsonError = (message: string, status: number) => buildErrorResponse(message, status, requestId)
  try {
    const user = await requireBearerUser(req)
    assertServiceRoleEnv()
    const admin = getSupabaseAdmin()

    const body = await req.json().catch(() => ({})) as Record<string, unknown>
    const { analysis_id, title, description, related_failure } = body as {
      analysis_id?: string; title?: string; description?: string; related_failure?: string
    }

    if (!analysis_id || !title?.trim()) {
      return jsonError('analysis_id e title são obrigatórios', 400)
    }

    const { data: analysisRow } = await admin
      .from('analyses')
      .select('id')
      .eq('id', analysis_id)
      .eq('tenant_id', user.tenantId)
      .single()

    if (!analysisRow) return jsonError('Análise não encontrada ou acesso negado', 404)

    const { data, error } = await admin
      .from('corrective_actions')
      .insert({
        analysis_id,
        tenant_id: user.tenantId,
        title: title.trim(),
        description: description?.trim() || null,
        related_failure: related_failure || null,
        status: 'pending',
      })
      .select('id, title, status, related_failure')
      .single()

    if (error) return jsonError(error.message, 500)
    return NextResponse.json(data, { status: 201, headers: { 'x-request-id': requestId } })
  } catch (e) {
    if (e instanceof Response) return e
    console.error('[/api/actions POST]', { requestId, error: String(e) })
    return jsonError(String(e), 500)
  }
}
