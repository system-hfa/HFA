import { notFound } from '../errors'
import { assertValidAnalysisTransition, reviewDecisionToStatuses, statusBeforeReview } from '../transitions'
import type { SeraVNextProductContext, SeraVNextReviewInput, SeraVNextReviewRecord } from '../types'
import { createAuditEvent } from './create-audit-event'
import { createSeraVNextProductRepository, type SeraVNextProductRepository } from './repositories'

export async function createSeraVNextReview(args: {
  analysisId: string
  input: SeraVNextReviewInput
  context: SeraVNextProductContext
  repository?: SeraVNextProductRepository
}): Promise<{ review: SeraVNextReviewRecord; status: string; reviewStatus: string }> {
  const repository = args.repository ?? createSeraVNextProductRepository()
  let analysis = await repository.getAnalysis(args.context.tenantId, args.analysisId)
  if (!analysis) throw notFound()
  if (analysis.status === 'ARCHIVED') throw notFound('Análise arquivada não pode ser revisada.')

  const reviewStartStatus = statusBeforeReview(analysis.status)
  if (reviewStartStatus !== analysis.status) {
    assertValidAnalysisTransition(analysis.status, reviewStartStatus)
    analysis = await repository.updateAnalysis(args.context.tenantId, analysis.id, {
      status: reviewStartStatus,
      review_status: 'IN_REVIEW',
    })
    await createAuditEvent({
      repository,
      context: args.context,
      analysisId: analysis.id,
      eventType: 'analysis.review_started',
      fromStatus: 'CANDIDATE_ANALYSIS_CREATED',
      toStatus: reviewStartStatus,
      payload: { reviewStatus: 'IN_REVIEW' },
    })
  }

  const target = reviewDecisionToStatuses(args.input.decision)
  assertValidAnalysisTransition(analysis.status, target.analysisStatus)
  const review = await repository.insertReview({
    analysis_id: analysis.id,
    tenant_id: args.context.tenantId,
    reviewer_id: args.context.userId,
    decision: args.input.decision,
    review_notes: args.input.reviewNotes ?? null,
    escape_point_assessment: args.input.escapePointAssessment ?? null,
    perception_assessment: args.input.perceptionAssessment ?? null,
    objective_assessment: args.input.objectiveAssessment ?? null,
    action_assessment: args.input.actionAssessment ?? null,
    preconditions_assessment: args.input.preconditionsAssessment ?? null,
    evidence_sufficiency: args.input.evidenceSufficiency,
    requires_more_evidence: args.input.requiresMoreEvidence,
    review_version: 1,
    request_id: args.context.requestId,
    metadata: args.input.metadata ?? {},
  })

  await repository.updateAnalysis(args.context.tenantId, analysis.id, {
    status: target.analysisStatus,
    review_status: target.reviewStatus,
  })
  await createAuditEvent({
    repository,
    context: args.context,
    analysisId: analysis.id,
    eventType: target.analysisStatus === 'RETURNED_FOR_REANALYSIS' ? 'analysis.returned' : 'analysis.review_submitted',
    fromStatus: analysis.status,
    toStatus: target.analysisStatus,
    payload: {
      decision: args.input.decision,
      evidenceSufficiency: args.input.evidenceSufficiency,
      requiresMoreEvidence: args.input.requiresMoreEvidence,
    },
  })

  return { review, status: target.analysisStatus, reviewStatus: target.reviewStatus }
}
