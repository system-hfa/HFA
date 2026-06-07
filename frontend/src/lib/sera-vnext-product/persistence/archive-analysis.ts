import { notFound } from '../errors'
import { assertValidAnalysisTransition } from '../transitions'
import type { SeraVNextProductContext } from '../types'
import { createAuditEvent } from './create-audit-event'
import { createSeraVNextProductRepository, type SeraVNextProductRepository } from './repositories'

export async function archiveSeraVNextAnalysis(args: {
  analysisId: string
  context: SeraVNextProductContext
  repository?: SeraVNextProductRepository
}) {
  const repository = args.repository ?? createSeraVNextProductRepository()
  const analysis = await repository.getAnalysis(args.context.tenantId, args.analysisId)
  if (!analysis) throw notFound()
  assertValidAnalysisTransition(analysis.status, 'ARCHIVED')
  const updated = await repository.updateAnalysis(args.context.tenantId, analysis.id, {
    status: 'ARCHIVED',
    deleted_at: new Date().toISOString(),
    metadata: {
      ...(analysis.metadata ?? {}),
      archivedFromStatus: analysis.status,
      archivedFromReviewStatus: analysis.review_status,
    },
  })
  await createAuditEvent({
    repository,
    context: args.context,
    analysisId: analysis.id,
    eventType: 'analysis.archived',
    fromStatus: analysis.status,
    toStatus: 'ARCHIVED',
    payload: { archivedFromStatus: analysis.status },
  })
  return updated
}
