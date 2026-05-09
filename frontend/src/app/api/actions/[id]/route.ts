import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin, assertServiceRoleEnv } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

const VALID_STATUSES = ['pending', 'in_progress', 'completed', 'cancelled']

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireBearerUser(req)
    assertServiceRoleEnv()
    const admin = getSupabaseAdmin()

    const body = await req.json().catch(() => ({}))
    const { status } = body as { status?: string }

    if (!status || !VALID_STATUSES.includes(status)) {
      return jsonError('status inválido', 400)
    }

    const updates: Record<string, unknown> = { status }
    if (status === 'completed') updates.completed_at = new Date().toISOString()

    const { data, error } = await admin
      .from('corrective_actions')
      .update(updates)
      .eq('id', params.id)
      .eq('tenant_id', user.tenantId)
      .select('id, status, completed_at')
      .single()

    if (error) return jsonError(error.message, 500)
    if (!data) return jsonError('Ação não encontrada', 404)

    return NextResponse.json(data)
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
