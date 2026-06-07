export const ANALYSIS_STATUSES = [
  'CANDIDATE_ANALYSIS_CREATED',
  'UNDER_HUMAN_REVIEW',
  'REQUIRES_MORE_EVIDENCE',
  'RETURNED_FOR_REANALYSIS',
  'HUMAN_REVIEW_COMPLETED_NON_FINAL',
  'ARCHIVED',
] as const

export const REVIEW_STATUSES = [
  'NOT_REVIEWED',
  'IN_REVIEW',
  'WORKING_HYPOTHESIS_ACCEPTED',
  'WORKING_HYPOTHESIS_REJECTED',
  'MORE_EVIDENCE_REQUIRED',
  'REANALYSIS_REQUIRED',
  'REVIEW_COMPLETED_NON_FINAL',
] as const

export const REVIEW_DECISIONS = [
  'ACCEPT_AS_WORKING_HYPOTHESIS',
  'REJECT_WORKING_HYPOTHESIS',
  'REQUIRES_MORE_EVIDENCE',
  'RETURN_FOR_REANALYSIS',
] as const

export const AUDIT_EVENT_TYPES = [
  'analysis.created',
  'analysis.viewed',
  'analysis.reanalysis_requested',
  'analysis.reanalyzed',
  'analysis.review_started',
  'analysis.review_submitted',
  'analysis.returned',
  'analysis.archived',
  'analysis.restored',
  'analysis.access_denied',
  'analysis.exported',
] as const

export type SeraVNextAnalysisStatus = (typeof ANALYSIS_STATUSES)[number]
export type SeraVNextReviewStatus = (typeof REVIEW_STATUSES)[number]
export type SeraVNextReviewDecision = (typeof REVIEW_DECISIONS)[number]
export type SeraVNextAuditEventType = (typeof AUDIT_EVENT_TYPES)[number]

export const FORBIDDEN_FINAL_STATUS_PATTERN = /\b(?:FINAL|CLASSIFIED|READY|RELEASED)\b/i

export function isAnalysisStatus(value: string): value is SeraVNextAnalysisStatus {
  return (ANALYSIS_STATUSES as readonly string[]).includes(value)
}

export function isReviewStatus(value: string): value is SeraVNextReviewStatus {
  return (REVIEW_STATUSES as readonly string[]).includes(value)
}

export function isReviewDecision(value: string): value is SeraVNextReviewDecision {
  return (REVIEW_DECISIONS as readonly string[]).includes(value)
}
