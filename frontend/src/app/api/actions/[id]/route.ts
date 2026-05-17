import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin, assertServiceRoleEnv } from '@/lib/server/supabase-admin'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

const VALID_STATUSES = ['pending', 'in_progress', 'completed', 'cancelled']

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireBearerUser(req)
    assertServiceRoleEnv()
    const admin = getSupabaseAdmin()
    const { id } = await params

    const body = await req.json().catch(() => ({}))
    const { status, responsible, due_date } = body as {
      status?: string
      responsible?: string | null
      due_date?: string | null
    }

    const updates: Record<string, unknown> = {}

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return jsonError('status inválido', 400)
      }
      updates.status = status
      if (status === 'completed') updates.completed_at = new Date().toISOString()
    }

    if (responsible !== undefined) {
      updates.responsible = responsible?.trim() || null
    }

    if (due_date !== undefined) {
      updates.due_date = due_date || null
    }

    if (Object.keys(updates).length === 0) {
      return jsonError('Nenhum campo para atualizar', 400)
    }

    const { data, error } = await admin
      .from('corrective_actions')
      .update(updates)
      .eq('id', id)
      .eq('tenant_id', user.tenantId)
      .select('id, status, responsible, due_date, completed_at')
      .single()

    if (error) return jsonError(error.message, 500)
    if (!data) return jsonError('Ação não encontrada', 404)

    return NextResponse.json(data)
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
