import { notFound } from '../errors'
import { isAnalysisStatus, isReviewStatus, type SeraVNextAnalysisStatus, type SeraVNextReviewStatus } from '../statuses'
import { assertValidAnalysisTransition } from '../transitions'
import type { SeraVNextProductContext } from '../types'
import { createAuditEvent } from './create-audit-event'
import { createSeraVNextProductRepository, type SeraVNextProductRepository } from './repositories'

export async function restoreSeraVNextAnalysis(args: {
  analysisId: string
  context: SeraVNextProductContext
  repository?: SeraVNextProductRepository
}) {
  const repository = args.repository ?? createSeraVNextProductRepository()
  const analysis = await repository.getAnalysis(args.context.tenantId, args.analysisId, { includeArchived: true })
  if (!analysis || analysis.status !== 'ARCHIVED') throw notFound('Análise arquivada não encontrada.')
  const archivedFromStatus = analysis.metadata?.archivedFromStatus
  const archivedFromReviewStatus = analysis.metadata?.archivedFromReviewStatus
  const targetStatus: SeraVNextAnalysisStatus = typeof archivedFromStatus === 'string' && isAnalysisStatus(archivedFromStatus)
    ? archivedFromStatus
    : 'CANDIDATE_ANALYSIS_CREATED'
  const targetReviewStatus: SeraVNextReviewStatus = typeof archivedFromReviewStatus === 'string' && isReviewStatus(archivedFromReviewStatus)
    ? archivedFromReviewStatus
    : 'NOT_REVIEWED'
  assertValidAnalysisTransition('ARCHIVED', targetStatus)
  const updated = await repository.updateAnalysis(args.context.tenantId, analysis.id, {
    status: targetStatus,
    review_status: targetReviewStatus,
    deleted_at: null,
    metadata: {
      ...(analysis.metadata ?? {}),
      restoredAt: new Date().toISOString(),
    },
  })
  await createAuditEvent({
    repository,
    context: args.context,
    analysisId: analysis.id,
    eventType: 'analysis.restored',
    fromStatus: 'ARCHIVED',
    toStatus: targetStatus,
    payload: { restoredToStatus: targetStatus },
  })
  return updated
}
