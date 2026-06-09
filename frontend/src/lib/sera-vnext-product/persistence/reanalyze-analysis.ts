import { runSeraVNextEngineV0 } from '@/lib/sera-vnext/engine-v0/run-engine'
import { notFound } from '../errors'
import { hashJson } from '../hashing'
import { assertValidAnalysisTransition } from '../transitions'
import type { SeraVNextProductContext } from '../types'
import { getSeraVNextProductVersionSet } from '../versioning'
import { createAuditEvent } from './create-audit-event'
import { createSeraVNextProductRepository, type SeraVNextProductRepository } from './repositories'

export async function reanalyzeSeraVNextAnalysis(args: {
  analysisId: string
  reason?: string
  context: SeraVNextProductContext
  repository?: SeraVNextProductRepository
}) {
  const repository = args.repository ?? createSeraVNextProductRepository()
  const analysis = await repository.getAnalysis(args.context.tenantId, args.analysisId)
  if (!analysis) throw notFound()
  if (analysis.status !== 'RETURNED_FOR_REANALYSIS' && analysis.status !== 'REQUIRES_MORE_EVIDENCE') {
    throw new Error('SERA_VNEXT_PRODUCT_BETA_REANALYSIS_REQUIRES_RETURNED_OR_MORE_EVIDENCE')
  }

  assertValidAnalysisTransition(analysis.status, 'CANDIDATE_ANALYSIS_CREATED')
  await createAuditEvent({
    repository,
    context: args.context,
    analysisId: analysis.id,
    eventType: 'analysis.reanalysis_requested',
    fromStatus: analysis.status,
    toStatus: analysis.status,
    payload: { currentRevision: analysis.current_revision },
  })

  const versions = getSeraVNextProductVersionSet()
  const engineInput = {
    ...analysis.engine_input,
    requestId: args.context.requestId,
    inputId: `${analysis.client_request_id}:rev:${analysis.current_revision + 1}`,
  }
  const engineOutput = runSeraVNextEngineV0(engineInput)
  const outputHash = hashJson(engineOutput)
  const nextRevision = analysis.current_revision + 1
  const revision = await repository.insertRevision({
    analysis_id: analysis.id,
    tenant_id: args.context.tenantId,
    revision_number: nextRevision,
    created_by: args.context.userId,
    request_id: args.context.requestId,
    engine_version: versions.engineVersion,
    engine_runtime_version: versions.engineRuntimeVersion,
    source_flow: versions.sourceFlow,
    engine_input: engineInput,
    engine_output: engineOutput,
    engine_output_hash: outputHash,
    reason: args.reason?.trim() || 'reanalyze_analysis',
    metadata: { source: 'product_beta_reanalyze' },
  })

  const updated = await repository.updateAnalysis(args.context.tenantId, analysis.id, {
    status: 'CANDIDATE_ANALYSIS_CREATED',
    review_status: 'NOT_REVIEWED',
    request_id: args.context.requestId,
    engine_input: engineInput,
    engine_output: engineOutput,
    engine_output_hash: outputHash,
    escape_point_status: engineOutput.escapePoint.status,
    escape_point_statement: engineOutput.escapePoint.statement,
    direct_actor: engineOutput.directActor.actor,
    perception_candidate_code: engineOutput.axes.perception.proposedCode,
    objective_candidate_code: engineOutput.axes.objective.proposedCode,
    action_candidate_code: engineOutput.axes.action.proposedCode,
    uncertainties: engineOutput.uncertainties,
    limitations: engineOutput.limitations,
    current_revision: nextRevision,
  })

  await createAuditEvent({
    repository,
    context: args.context,
    analysisId: analysis.id,
    eventType: 'analysis.reanalyzed',
    fromStatus: analysis.status,
    toStatus: 'CANDIDATE_ANALYSIS_CREATED',
    payload: { revisionNumber: nextRevision },
  })
  return { analysis: updated, revision }
}
