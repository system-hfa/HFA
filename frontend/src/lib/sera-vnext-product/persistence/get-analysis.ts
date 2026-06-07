import { notFound } from '../errors'
import { buildReviewerOutput } from '../reviewer-output'
import type { SeraVNextAnalysisDetail, SeraVNextProductContext } from '../types'
import { getSeraVNextProductVersionSet } from '../versioning'
import { createAuditEvent } from './create-audit-event'
import { createSeraVNextProductRepository, type SeraVNextProductRepository } from './repositories'

export function productBetaLocks() {
  return {
    humanReviewRequired: true,
    selectedCode: null,
    releasedCode: null,
    finalConclusion: null,
    classifiedOutput: false,
    readyPromotion: false,
    downstreamAllowed: false,
  } as const
}

export async function getSeraVNextAnalysisDetail(args: {
  id: string
  context: SeraVNextProductContext
  repository?: SeraVNextProductRepository
  auditView?: boolean
}): Promise<SeraVNextAnalysisDetail> {
  const repository = args.repository ?? createSeraVNextProductRepository()
  const analysis = await repository.getAnalysis(args.context.tenantId, args.id, { includeArchived: true })
  if (!analysis) throw notFound()
  const [revisions, reviews, events] = await Promise.all([
    repository.listRevisions(args.context.tenantId, analysis.id),
    repository.listReviews(args.context.tenantId, analysis.id),
    repository.listAuditEvents(args.context.tenantId, analysis.id),
  ])
  if (args.auditView !== false) {
    await createAuditEvent({
      repository,
      context: args.context,
      analysisId: analysis.id,
      eventType: 'analysis.viewed',
      fromStatus: analysis.status,
      toStatus: analysis.status,
      payload: { currentRevision: analysis.current_revision },
    })
  }
  return {
    analysis,
    revisions,
    reviews,
    events,
    versions: getSeraVNextProductVersionSet(),
    locks: productBetaLocks(),
    reviewerOutput: buildReviewerOutput(analysis.engine_output),
  }
}
