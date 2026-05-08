import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

export async function GET(req: Request) {
  try {
    const user = await requireBearerUser(req)
    const admin = getSupabaseAdmin()
    const { data, error } = await admin
      .from('analyses')
      .select('perception_code, objective_code, action_code, preconditions')
      .eq('tenant_id', user.tenantId)
    if (error) return jsonError(error.message, 400)

    const perception: Record<string, number> = {}
    const objective: Record<string, number> = {}
    const action: Record<string, number> = {}
    const preconditions: Record<string, number> = {}

    for (const r of data ?? []) {
      if (r.perception_code) perception[r.perception_code as string] = (perception[r.perception_code as string] || 0) + 1
      if (r.objective_code) objective[r.objective_code as string] = (objective[r.objective_code as string] || 0) + 1
      if (r.action_code) action[r.action_code as string] = (action[r.action_code as string] || 0) + 1
      const pre = r.preconditions as Array<{ code?: string }> | null
      if (pre) {
        for (const p of pre) {
          const c = p?.code
          if (c) preconditions[c] = (preconditions[c] || 0) + 1
        }
      }
    }

    const sortEntries = (o: Record<string, number>) =>
      Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1]))

    const topPrec = Object.fromEntries(
      Object.entries(preconditions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    )

    return NextResponse.json({
      total_analyses: data?.length ?? 0,
      perception_failures: sortEntries(perception),
      objective_failures: sortEntries(objective),
      action_failures: sortEntries(action),
      top_preconditions: topPrec,
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}

