import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import {
  buildActionMermaid,
  buildObjectiveMermaid,
  buildPerceptionMermaid,
} from '@/lib/sera/flow-renderer'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

function disc(raw: unknown): Record<string, unknown> {
  if (!raw) return {}
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Record<string, unknown>
    } catch {
      return {}
    }
  }
  return raw as Record<string, unknown>
}

export async function GET(req: Request, ctx: { params: Promise<{ analysisId: string }> }) {
  try {
    const user = await requireBearerUser(req)
    const { analysisId } = await ctx.params
    const admin = getSupabaseAdmin()

    const { data: a, error } = await admin
      .from('analyses')
      .select('*')
      .eq('id', analysisId)
      .eq('tenant_id', user.tenantId)
      .maybeSingle()

    if (error) return jsonError(error.message, 400)
    if (!a) return jsonError('Análise não encontrada', 404)

    const perceptionDisc = disc(a.perception_discarded)
    const objectiveDisc = disc(a.objective_discarded)
    const actionDisc = disc(a.action_discarded)

    const perceptionFlow = { codigo: a.perception_code, ...perceptionDisc }
    const objectiveFlow = { codigo: a.objective_code, ...objectiveDisc }
    const actionFlow = { codigo: a.action_code, ...actionDisc }

    return NextResponse.json({
      perception: {
        mermaid: buildPerceptionMermaid(perceptionFlow),
        codigo: a.perception_code,
        nos_percorridos: perceptionDisc.nos_percorridos ?? [],
        falhas_descartadas: perceptionDisc.falhas_descartadas ?? '',
      },
      objective: {
        mermaid: buildObjectiveMermaid(objectiveFlow),
        codigo: a.objective_code,
        nos_percorridos: objectiveDisc.nos_percorridos ?? [],
        falhas_descartadas: objectiveDisc.falhas_descartadas ?? '',
      },
      action: {
        mermaid: buildActionMermaid(actionFlow),
        codigo: a.action_code,
        nos_percorridos: actionDisc.nos_percorridos ?? [],
        falhas_descartadas: actionDisc.falhas_descartadas ?? '',
      },
    })
  } catch (e) {
    if (e instanceof Response) return e
    return jsonError(String(e), 500)
  }
}
