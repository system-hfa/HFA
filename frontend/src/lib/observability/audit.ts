import { getSupabaseAdmin } from '@/lib/server/supabase-admin'

/**
 * Eventos auditáveis do sistema HFA.
 * Adicionar novos tipos aqui conforme novas fases forem implementadas.
 */
export type AuditEventType =
  | 'event_created'
  | 'analysis_started'
  | 'analysis_completed'
  | 'analysis_partial'
  | 'analysis_failed'
  | 'corrective_action_created'
  | 'report_generated'
  | 'tenant.bootstrap_failed'
  | 'classification_overridden' // reservado — implementar quando rota de override for instrumentada

export type AuditStatus = 'success' | 'partial' | 'failed' | 'blocked'

export interface WriteAuditLogParams {
  tenantId: string | null
  userId: string | null
  requestId: string | null
  eventType: AuditEventType
  entityType?: string | null
  entityId?: string | null
  route?: string | null
  method?: string | null
  status?: AuditStatus
  metadata?: Record<string, unknown>
}

/**
 * Grava um evento no audit_log de forma best-effort.
 *
 * Regras:
 * - Nunca lança exceção — falha é logada com requestId, nunca propaga.
 * - Usa service role (getSupabaseAdmin) — não é afetado por RLS.
 * - metadata é limpo: remove undefined e null; nunca incluir relato/transcrição/tokens.
 */
export async function writeAuditLog(params: WriteAuditLogParams): Promise<void> {
  try {
    const admin = getSupabaseAdmin()

    const {
      tenantId,
      userId,
      requestId,
      eventType,
      entityType = null,
      entityId = null,
      route = null,
      method = null,
      status = 'success',
      metadata = {},
    } = params

    // Limpar metadata: remover undefined e null explícitos para manter JSONB limpo
    const cleanMetadata: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(metadata)) {
      if (v !== undefined && v !== null) {
        cleanMetadata[k] = v
      }
    }

    const { error } = await admin.from('audit_log').insert({
      tenant_id: tenantId ?? null,
      user_id: userId ?? null,
      request_id: requestId ?? null,
      event_type: eventType,
      entity_type: entityType ?? null,
      entity_id: entityId ?? null,
      route: route ?? null,
      method: method ?? null,
      status,
      metadata: cleanMetadata,
    })

    if (error) {
      console.error('[audit] insert failed', {
        requestId,
        eventType,
        error: error.message,
      })
    }
  } catch (e) {
    console.error('[audit] unexpected error', {
      requestId: params.requestId,
      eventType: params.eventType,
      error: e instanceof Error ? e.message : String(e),
    })
  }
}
