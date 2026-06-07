import { SERA_VNEXT_PRODUCT_BETA_INTERNAL_MARKERS } from '../constants'
import type { SeraVNextExportPayload, SeraVNextProductContext } from '../types'
import { getSeraVNextProductVersionSet } from '../versioning'
import { createAuditEvent } from './create-audit-event'
import { productBetaLocks } from './get-analysis'
import { createSeraVNextProductRepository, type SeraVNextProductRepository } from './repositories'
import { notFound } from '../errors'

export async function exportSeraVNextAnalysis(args: {
  analysisId: string
  context: SeraVNextProductContext
  repository?: SeraVNextProductRepository
}): Promise<SeraVNextExportPayload & { locks: ReturnType<typeof productBetaLocks> }> {
  const repository = args.repository ?? createSeraVNextProductRepository()
  const analysis = await repository.getAnalysis(args.context.tenantId, args.analysisId, { includeArchived: true })
  if (!analysis) throw notFound()
  const [reviews, events] = await Promise.all([
    repository.listReviews(args.context.tenantId, analysis.id),
    repository.listAuditEvents(args.context.tenantId, analysis.id),
  ])
  await createAuditEvent({
    repository,
    context: args.context,
    analysisId: analysis.id,
    eventType: 'analysis.exported',
    fromStatus: analysis.status,
    toStatus: analysis.status,
    payload: { reviewCount: reviews.length, eventCount: events.length },
  })
  const { narrative: _narrative, engine_input: _engineInput, engine_output: _engineOutput, ...analysisWithoutNarrative } = analysis
  return {
    markers: [...SERA_VNEXT_PRODUCT_BETA_INTERNAL_MARKERS],
    analysis: {
      ...analysisWithoutNarrative,
      narrative: '[REDACTED_IN_EXPORT_SUMMARY]',
    },
    candidateOutput: analysis.engine_output,
    versions: getSeraVNextProductVersionSet(),
    reviews,
    auditSummary: events.map((event) => ({
      event_type: event.event_type,
      created_at: event.created_at,
      request_id: event.request_id,
      from_status: event.from_status,
      to_status: event.to_status,
    })),
    locks: productBetaLocks(),
  }
}
