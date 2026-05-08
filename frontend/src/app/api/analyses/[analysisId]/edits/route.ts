import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function GET(req: Request, ctx: { params: Promise<{ analysisId: string }> }) {
  try {
    const user = await requireBearerUser(req)
    const { analysisId } = await ctx.params
    const admin = getSupabaseAdmin()

    const { data, error } = await admin
      .from('analysis_edits')
      .select('*')
      .eq('analysis_id', analysisId)
      .eq('tenant_id', user.tenantId)
      .order('created_at', { ascending: false })

    if (error) return jsonError(error.message, 400)
    return NextResponse.json(data ?? [])
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
