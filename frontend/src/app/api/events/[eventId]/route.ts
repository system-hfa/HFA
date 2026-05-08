import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { deleteAnalysisStorageObject } from '@/lib/server/complete-sera-analysis'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

function embedAnalysis(ev: { analyses?: unknown }) {
  const a = ev.analyses
  if (Array.isArray(a)) return (a[0] ?? null) as { source_file_url?: string | null } | null
  return (a ?? null) as { source_file_url?: string | null } | null
}

export async function GET(_req: Request, ctx: { params: Promise<{ eventId: string }> }) {
  try {
    const user = await requireBearerUser(_req)
    const { eventId } = await ctx.params
    const admin = getSupabaseAdmin()
    const { data, error } = await admin
      .from('events')
      .select('*, analyses(*)')
      .eq('id', eventId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()
    if (error) return jsonError(error.message, 400)
    if (!data) return jsonError('Evento não encontrado', 404)
    return NextResponse.json(data)
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ eventId: string }> }) {
  try {
    const user = await requireBearerUser(_req)
    const { eventId } = await ctx.params
    const admin = getSupabaseAdmin()

    const { data: ev, error } = await admin
      .from('events')
      .select('id, analyses(source_file_url)')
      .eq('id', eventId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (error) return jsonError(error.message, 400)
    if (!ev) return jsonError('Evento não encontrado', 404)

    const an = embedAnalysis(ev as { analyses?: unknown })
    if (an?.source_file_url) {
      await deleteAnalysisStorageObject(admin, an.source_file_url)
    }

    const { error: derr } = await admin.from('events').delete().eq('id', eventId)
    if (derr) return jsonError(derr.message, 400)

    return NextResponse.json({ ok: true, deleted_event_id: eventId })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
