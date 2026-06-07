import assert from 'node:assert/strict'
import {
  ANALYSIS_STATUSES,
  FORBIDDEN_FINAL_STATUS_PATTERN,
  REVIEW_DECISIONS,
  assertValidAnalysisTransition,
  canTransitionAnalysisStatus,
  reviewDecisionToStatuses,
} from '../../frontend/src/lib/sera-vnext-product'

assert.equal(canTransitionAnalysisStatus('CANDIDATE_ANALYSIS_CREATED', 'UNDER_HUMAN_REVIEW'), true)
assert.equal(canTransitionAnalysisStatus('UNDER_HUMAN_REVIEW', 'HUMAN_REVIEW_COMPLETED_NON_FINAL'), true)
assert.equal(canTransitionAnalysisStatus('UNDER_HUMAN_REVIEW', 'RETURNED_FOR_REANALYSIS'), true)
assert.equal(canTransitionAnalysisStatus('REQUIRES_MORE_EVIDENCE', 'RETURNED_FOR_REANALYSIS'), true)
assert.equal(canTransitionAnalysisStatus('RETURNED_FOR_REANALYSIS', 'CANDIDATE_ANALYSIS_CREATED'), true)
assert.equal(canTransitionAnalysisStatus('CANDIDATE_ANALYSIS_CREATED', 'HUMAN_REVIEW_COMPLETED_NON_FINAL'), false)
assert.throws(() => assertValidAnalysisTransition('CANDIDATE_ANALYSIS_CREATED', 'HUMAN_REVIEW_COMPLETED_NON_FINAL'))

assert.deepEqual(reviewDecisionToStatuses('ACCEPT_AS_WORKING_HYPOTHESIS'), {
  analysisStatus: 'HUMAN_REVIEW_COMPLETED_NON_FINAL',
  reviewStatus: 'WORKING_HYPOTHESIS_ACCEPTED',
})
assert.deepEqual(reviewDecisionToStatuses('REQUIRES_MORE_EVIDENCE'), {
  analysisStatus: 'REQUIRES_MORE_EVIDENCE',
  reviewStatus: 'MORE_EVIDENCE_REQUIRED',
})
assert.deepEqual(reviewDecisionToStatuses('RETURN_FOR_REANALYSIS'), {
  analysisStatus: 'RETURNED_FOR_REANALYSIS',
  reviewStatus: 'REANALYSIS_REQUIRED',
})

for (const status of ANALYSIS_STATUSES) assert.equal(FORBIDDEN_FINAL_STATUS_PATTERN.test(status), false, `${status} must not be final/released/ready`)
for (const decision of REVIEW_DECISIONS) assert.equal(FORBIDDEN_FINAL_STATUS_PATTERN.test(decision), false, `${decision} must not be final/released/ready`)

console.log('WORKFLOW_OK')
