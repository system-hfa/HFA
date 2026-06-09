import type { SupabaseClient } from '@supabase/supabase-js'

export const EVENT_DELETION_RECOVERY_DAYS = 30

export const EVENT_DELETION_STATUSES = [
  'ACTIVE',
  'SOFT_DELETED',
  'PURGE_SCHEDULED',
  'PURGE_FAILED',
  'PURGED',
  'RESTORED',
] as const

export type EventDeletionStatus = (typeof EVENT_DELETION_STATUSES)[number]

export type EventDeletionImpact = {
  event: number
  legacyAnalyses: number
  vnextAnalyses: number
  revisions: number
  reviews: number
  auditEvents: number
  evidenceItems: number
  attachments: number
  exports: number
  correctiveActions: number
  riskProfileIncluded: boolean
  recoverableDays: number
  hardDeleteAvailable: false
}

export type EventDeletionRecord = {
  id: string
  tenant_id: string
  title: string
  status: string
  deleted_at: string | null
  deleted_by: string | null
  deletion_reason: string | null
  deletion_status: EventDeletionStatus | null
  recoverable_until: string | null
  purge_scheduled_at: string | null
  purged_at: string | null
  analyses:
    | {
        id: string
        source_file_url: string | null
      }
    | Array<{
        id: string
        source_file_url: string | null
      }>
    | null
}

function plusDays(days: number) {
  const value = new Date()
  value.setUTCDate(value.getUTCDate() + days)
  return value.toISOString()
}

export function normalizeAnalysis(
  value: EventDeletionRecord['analyses'],
): { id: string; source_file_url: string | null } | null {
  if (Array.isArray(value)) return value[0] ?? null
  return value ?? null
}

export async function getEventDeletionRecord(
  admin: SupabaseClient,
  tenantId: string,
  eventId: string,
): Promise<EventDeletionRecord | null> {
  const { data, error } = await admin
    .from('events')
    .select('id, tenant_id, title, status, deleted_at, deleted_by, deletion_reason, deletion_status, recoverable_until, purge_scheduled_at, purged_at, analyses(id, source_file_url)')
    .eq('tenant_id', tenantId)
    .eq('id', eventId)
    .maybeSingle()

  if (error) throw new Error(`EVENT_DELETE_FETCH_FAILED: ${error.message}`)
  return (data as EventDeletionRecord | null) ?? null
}

export async function getEventDeletionImpact(
  admin: SupabaseClient,
  tenantId: string,
  eventId: string,
): Promise<EventDeletionImpact> {
  const event = await getEventDeletionRecord(admin, tenantId, eventId)
  if (!event) {
    throw new Error('EVENT_NOT_FOUND')
  }

  const analysis = normalizeAnalysis(event.analyses)
  const analysisId = analysis?.id ?? null

  const [riskExclusionRes, actionsRes, auditEventRes] = await Promise.all([
    admin
      .from('risk_profile_exclusions')
      .select('id')
      .eq('tenant_id', tenantId)
      .eq('source_type', 'legacy_event')
      .eq('source_id', eventId)
      .is('restored_at', null),
    analysisId
      ? admin
          .from('corrective_actions')
          .select('id, status')
          .eq('tenant_id', tenantId)
          .eq('analysis_id', analysisId)
      : Promise.resolve({ data: [], error: null }),
    admin
      .from('audit_log')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .or(analysisId ? `entity_id.eq.${eventId},entity_id.eq.${analysisId}` : `entity_id.eq.${eventId}`),
  ])

  if (riskExclusionRes.error) throw new Error(`EVENT_DELETE_EXCLUSION_LOOKUP_FAILED: ${riskExclusionRes.error.message}`)
  if (actionsRes.error) throw new Error(`EVENT_DELETE_ACTION_LOOKUP_FAILED: ${actionsRes.error.message}`)
  if (auditEventRes.error) throw new Error(`EVENT_DELETE_AUDIT_LOOKUP_FAILED: ${auditEventRes.error.message}`)

  return {
    event: 1,
    legacyAnalyses: analysisId ? 1 : 0,
    vnextAnalyses: 0,
    revisions: 0,
    reviews: 0,
    auditEvents: auditEventRes.count ?? 0,
    evidenceItems: 0,
    attachments: analysis?.source_file_url ? 1 : 0,
    exports: 0,
    correctiveActions: (actionsRes.data ?? []).length,
    riskProfileIncluded: !event.deleted_at && (riskExclusionRes.data ?? []).length === 0,
    recoverableDays: EVENT_DELETION_RECOVERY_DAYS,
    hardDeleteAvailable: false,
  }
}

export async function getOpenCorrectiveActionCount(
  admin: SupabaseClient,
  tenantId: string,
  analysisId: string | null,
): Promise<number> {
  if (!analysisId) return 0
  const { count, error } = await admin
    .from('corrective_actions')
    .select('id', { count: 'exact', head: true })
    .eq('tenant_id', tenantId)
    .eq('analysis_id', analysisId)
    .in('status', ['pending', 'in_progress'])
  if (error) throw new Error(`EVENT_DELETE_OPEN_ACTIONS_FAILED: ${error.message}`)
  return count ?? 0
}

export async function upsertDeletionTombstone(args: {
  admin: SupabaseClient
  tenantId: string
  eventId: string
  title: string
  requestedBy: string
  requestId: string
  reasonCategory: string
  status: string
  softDeletedAt?: string | null
  purgedAt?: string | null
  dataCategories?: string[]
}) {
  const {
    admin,
    tenantId,
    eventId,
    title,
    requestedBy,
    requestId,
    reasonCategory,
    status,
    softDeletedAt = null,
    purgedAt = null,
    dataCategories = ['event', 'analysis', 'attachments', 'corrective_actions'],
  } = args

  const titleHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(title))
  const titleHashHex = Array.from(new Uint8Array(titleHash))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')

  const payload = {
    tenant_id: tenantId,
    event_id_original: eventId,
    event_title_hash: titleHashHex,
    requested_by: requestedBy,
    requested_at: new Date().toISOString(),
    soft_deleted_at: softDeletedAt,
    purged_at: purgedAt,
    reason_category: reasonCategory,
    request_id: requestId,
    data_categories: dataCategories,
    status,
  }

  const { error } = await admin
    .from('event_deletion_tombstones')
    .upsert(payload, { onConflict: 'tenant_id,event_id_original' })

  if (error) throw new Error(`EVENT_DELETE_TOMBSTONE_FAILED: ${error.message}`)
}

export async function softDeleteEvent(args: {
  admin: SupabaseClient
  tenantId: string
  eventId: string
  actorUserId: string
  reason: string
  requestId: string
}) {
  const { admin, tenantId, eventId, actorUserId, reason, requestId } = args
  const event = await getEventDeletionRecord(admin, tenantId, eventId)
  if (!event) throw new Error('EVENT_NOT_FOUND')

  const analysis = normalizeAnalysis(event.analyses)
  const openActions = await getOpenCorrectiveActionCount(admin, tenantId, analysis?.id ?? null)
  if (openActions > 0) {
    throw new Error('EVENT_DELETE_BLOCKED_BY_OPEN_CORRECTIVE_ACTIONS')
  }

  const now = new Date().toISOString()
  const recoverableUntil = plusDays(EVENT_DELETION_RECOVERY_DAYS)
  const { error } = await admin
    .from('events')
    .update({
      deleted_at: now,
      deleted_by: actorUserId,
      deletion_reason: reason.trim(),
      deletion_status: 'SOFT_DELETED',
      recoverable_until: recoverableUntil,
      purge_scheduled_at: null,
      purged_at: null,
      updated_at: now,
    })
    .eq('tenant_id', tenantId)
    .eq('id', eventId)
    .is('deleted_at', null)

  if (error) throw new Error(`EVENT_SOFT_DELETE_FAILED: ${error.message}`)

  await upsertDeletionTombstone({
    admin,
    tenantId,
    eventId,
    title: event.title,
    requestedBy: actorUserId,
    requestId,
    reasonCategory: 'USER_REQUEST',
    status: 'SOFT_DELETED',
    softDeletedAt: now,
  })

  return {
    event,
    analysis,
    deletedAt: now,
    recoverableUntil,
  }
}

export async function restoreSoftDeletedEvent(args: {
  admin: SupabaseClient
  tenantId: string
  eventId: string
}) {
  const { admin, tenantId, eventId } = args
  const event = await getEventDeletionRecord(admin, tenantId, eventId)
  if (!event) throw new Error('EVENT_NOT_FOUND')
  if (!event.deleted_at || event.deletion_status !== 'SOFT_DELETED') {
    throw new Error('EVENT_NOT_SOFT_DELETED')
  }
  if (!event.recoverable_until || new Date(event.recoverable_until).getTime() < Date.now()) {
    throw new Error('EVENT_RESTORE_WINDOW_EXPIRED')
  }

  const now = new Date().toISOString()
  const { error } = await admin
    .from('events')
    .update({
      deleted_at: null,
      deleted_by: null,
      deletion_reason: null,
      deletion_status: 'RESTORED',
      recoverable_until: null,
      purge_scheduled_at: null,
      purged_at: null,
      updated_at: now,
    })
    .eq('tenant_id', tenantId)
    .eq('id', eventId)

  if (error) throw new Error(`EVENT_RESTORE_FAILED: ${error.message}`)
  return { restoredAt: now }
}

export async function listEventStorageObjects(
  admin: SupabaseClient,
  sourceFileUrl: string | null | undefined,
): Promise<string[]> {
  if (!sourceFileUrl?.trim()) return []
  return [sourceFileUrl.trim()]
}

export async function purgeSoftDeletedEvent(args: {
  admin: SupabaseClient
  tenantId: string
  eventId: string
  actorUserId: string
  requestId: string
  dryRun?: boolean
}) {
  const { admin, tenantId, eventId, actorUserId, requestId, dryRun = true } = args
  const event = await getEventDeletionRecord(admin, tenantId, eventId)
  if (!event) throw new Error('EVENT_NOT_FOUND')
  if (event.deletion_status !== 'SOFT_DELETED' || !event.deleted_at) {
    throw new Error('EVENT_NOT_READY_FOR_PURGE')
  }
  if (!event.recoverable_until || new Date(event.recoverable_until).getTime() >= Date.now()) {
    throw new Error('EVENT_PURGE_WINDOW_NOT_REACHED')
  }

  const analysis = normalizeAnalysis(event.analyses)
  const impact = await getEventDeletionImpact(admin, tenantId, eventId)
  const storageObjects = await listEventStorageObjects(admin, analysis?.source_file_url)

  if (dryRun) {
    return {
      mode: 'DRY_RUN' as const,
      impact,
      storageObjects,
      requestId,
      actorUserId,
    }
  }

  throw new Error('EVENT_PURGE_NON_DRY_RUN_BLOCKED')
}
