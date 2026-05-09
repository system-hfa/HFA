import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin, assertServiceRoleEnv } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function GET(req: Request) {
  try {
    const user = await requireBearerUser(req)
    assertServiceRoleEnv()
    const admin = getSupabaseAdmin()

    const { data, error } = await admin
      .from('corrective_actions')
      .select('id, title, description, related_failure, status, responsible, due_date, completed_at, created_at, analysis_id')
      .eq('tenant_id', user.tenantId)
      .order('created_at', { ascending: false })

    if (error) return jsonError(error.message, 500)
    return NextResponse.json(data ?? [])
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
