import type { SeraVNextAuditEventType } from '../statuses'
import type { SeraVNextAuditEventRecord, SeraVNextProductContext } from '../types'
import type { SeraVNextAnalysisStatus } from '../statuses'
import type { SeraVNextProductRepository } from './repositories'

const forbiddenKeys = new Set(['narrative', 'raw_input', 'eventText', 'token', 'cookie', 'stack', 'password', 'secret'])

function sanitizeObject(input: Record<string, unknown> = {}): Record<string, unknown> {
  const output: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(input)) {
    if (forbiddenKeys.has(key)) continue
    if (typeof value === 'string') {
      output[key] = value.length > 300 ? `${value.slice(0, 300)}...` : value
    } else if (Array.isArray(value)) {
      output[key] = value.slice(0, 20).map((item) => (typeof item === 'string' ? item.slice(0, 160) : item))
    } else if (value && typeof value === 'object') {
      output[key] = sanitizeObject(value as Record<string, unknown>)
    } else if (value !== undefined) {
      output[key] = value
    }
  }
  return output
}

export async function createAuditEvent(args: {
  repository: SeraVNextProductRepository
  context: SeraVNextProductContext
  analysisId: string | null
  eventType: SeraVNextAuditEventType
  fromStatus?: SeraVNextAnalysisStatus | null
  toStatus?: SeraVNextAnalysisStatus | null
  payload?: Record<string, unknown>
  metadata?: Record<string, unknown>
}): Promise<SeraVNextAuditEventRecord> {
  return args.repository.insertAuditEvent({
    analysis_id: args.analysisId,
    tenant_id: args.context.tenantId,
    actor_id: args.context.userId,
    event_type: args.eventType,
    request_id: args.context.requestId,
    from_status: args.fromStatus ?? null,
    to_status: args.toStatus ?? null,
    payload: sanitizeObject(args.payload),
    metadata: sanitizeObject(args.metadata),
  })
}
