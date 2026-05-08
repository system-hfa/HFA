import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
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
