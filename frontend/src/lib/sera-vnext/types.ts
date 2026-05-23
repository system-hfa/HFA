export type SeraVNextEngineVersion = 'sera-vnext-v0.2.0'

export type SeraVNextSourceType = 'neutral_trial' | 'user_event' | 'report_extract'

export type SeraVNextLocale = 'pt-BR' | 'en'

export interface SeraVNextInput {
  inputId: string
  narrative: string
  sourceType: SeraVNextSourceType
  locale?: SeraVNextLocale
  humanDecisionInput?: HumanDecisionInputSet
  options?: {
    allowLlm?: boolean
    requireHumanReview?: boolean
    includeDebugTrace?: boolean
  }
}

export interface FactualSummary {
  actors: string[]
  aircraftOrSystem: string[]
  operationType: string | null
  phase: string | null
  location: string | null
  sequence: string[]
  environment: string[]
  availableCues: string[]
  availableBarriers: string[]
  missingData: string[]
}

export interface OperationalUnsafeState {
  operationalUnsafeState: string | null
  decisionAntecedents: string[]
  finalOutcome: string | null
}

export type UnsafeActConditionDominance =
  | 'unsafe_act_dominant'
  | 'unsafe_condition_dominant'
  | 'mixed'
  | 'insufficient_evidence'

export interface UnsafeElementAssessment {
  statement: string | null
  evidence: string[]
  confidence: 'low' | 'medium' | 'high'
  uncertainty: string[]
  humanReviewRequired: boolean
}

export interface UnsafeActConditionAnalysis {
  unsafeAct: UnsafeElementAssessment
  unsafeCondition: UnsafeElementAssessment
  dominance: UnsafeActConditionDominance
}

export type DirectActorKind =
  | 'specific_actor'
  | 'crew_collective'
  | 'unknown'
  | 'multi_actor'
  | 'system_or_condition_dominant'

export interface DirectActorAnalysis {
  actor: string | null
  actorKind: DirectActorKind
  confidence: 'low' | 'medium' | 'high'
  evidence: string[]
  uncertainty: string[]
  humanReviewRequired: boolean
}

export interface PoaAxisStatementMeta {
  confidence: 'low' | 'medium' | 'high'
  humanReviewRequired: boolean
}

export interface PoaStatements {
  perceptionStatement: string | null
  objectiveStatement: string | null
  actionStatement: string | null
  evidenceForEach: {
    perception: string[]
    objective: string[]
    action: string[]
  }
  uncertaintyForEach: {
    perception: string[]
    objective: string[]
    action: string[]
  }
  statementMeta: {
    perception: PoaAxisStatementMeta
    objective: PoaAxisStatementMeta
    action: PoaAxisStatementMeta
  }
}

export type PoaAxis = 'perception' | 'objective' | 'action'

export type PoaAxisStatus =
  | 'CLASSIFIED'
  | 'READY_FOR_HUMAN_CLASSIFICATION'
  | 'BLOCKED_BY_GUARDRAIL'
  | 'REVIEW_REQUIRED'
  | 'INSUFFICIENT_EVIDENCE'
  | 'NOT_IMPLEMENTED'

export type PoaEvidenceSufficiency = 'sufficient' | 'partial' | 'insufficient'

export type PoaEligibilityStatus =
  | 'NOT_ELIGIBLE'
  | 'ELIGIBLE_FOR_HUMAN_REVIEW'
  | 'BLOCKED_BY_GUARDRAIL'

export interface PoaEligibilityCheck {
  checkId: string
  passed: boolean
  details: string
  isAbsoluteBlocker?: boolean
}

export interface PoaClassificationEligibility {
  eligibilityStatus: PoaEligibilityStatus
  eligibleForHumanClassification: boolean
  eligibilityChecks: PoaEligibilityCheck[]
  unmetCriteria: string[]
  waiverRequired: boolean
  waiverAllowed: boolean
  waiverProhibitedReason: string | null
  absoluteBlockers: string[]
  whyBlocked: string | null
  whyNotEligible: string | null
  readyForHumanClassificationReason: string | null
}

export interface PoaAxisReviewTrace {
  reviewReason: string
  reviewReasonCode: string
  linkedUncertainties: string[]
  linkedEvidence: string[]
  blockingForClassification: string[]
  requiredHumanDecision: string
  transitionCriteria: string[]
}

export interface PoaAxisClassification {
  axis: PoaAxis
  selectedCode: string
  status: PoaAxisStatus
  confidence: 'low' | 'medium' | 'high'
  evidence: string[]
  alternativesConsidered: string[]
  rejectionReason: string | null
  reviewReason: string | null
  reviewReasonCode: string
  linkedUncertainties: string[]
  linkedEvidence: string[]
  blockingForClassification: string[]
  requiredHumanDecision: string
  transitionCriteria: string[]
  reviewTrace: PoaAxisReviewTrace
  humanReviewRequired: boolean
  evidenceSufficiency: PoaEvidenceSufficiency
  semanticGuardrails: string[]
  codeMeaning: string
  disallowedInterpretations: string[]
  classificationEligibility: PoaClassificationEligibility
}

export interface PoaClassification {
  perception: PoaAxisClassification
  objective: PoaAxisClassification
  action: PoaAxisClassification
}

export interface PreconditionsAnalysis {
  items: Array<{
    code: string
    statement: string
    evidence: string[]
    confidence: 'low' | 'medium' | 'high'
  }>
}

export interface Limitation {
  id: string
  statement: string
  impact: 'low' | 'medium' | 'high'
}

export interface Recommendation {
  id: string
  statement: string
  linkedFinding: string
  confidence: 'low' | 'medium' | 'high'
  scopeLimit: string | null
}

export type CausalAssuranceStatus =
  | 'SKELETON_NOT_VALIDATED'
  | 'PARTIAL_STEPS_1_3_NOT_CLASSIFIED'
  | 'PARTIAL_STEPS_1_5_NOT_CLASSIFIED'
  | 'PARTIAL_POA_REVIEW_REQUIRED'
  | 'PARTIAL_POA_REVIEW_TRACEABLE'
  | 'PARTIAL_ELIGIBILITY_CHECKED_NOT_CLASSIFIED'
  | 'PARTIAL_ELIGIBILITY_CALIBRATED_NOT_CLASSIFIED'
  | 'PARTIAL_READINESS_REFINED_NOT_CLASSIFIED'
  | 'PARTIAL_HUMAN_REVIEW_GATE_READY_NOT_CLASSIFIED'
  | 'PARTIAL_HUMAN_DECISION_INPUT_VALIDATED_NOT_CLASSIFIED'
  | 'PARTIAL_MANUAL_CLASSIFICATION_DRY_RUN_NOT_RELEASED'
  | 'PASSED'
  | 'FAILED'
  | 'REVIEW_REQUIRED'

export interface CausalAssurance {
  status: CausalAssuranceStatus
  blockingIssues: string[]
  warnings: string[]
  checks: Array<{
    checkId: string
    passed: boolean
    details: string
  }>
}

export type HumanReviewAxisDecisionStatus =
  | 'HUMAN_DECISION_REQUIRED'
  | 'READY_FOR_HUMAN_DECISION'
  | 'NOT_READY_FOR_HUMAN_DECISION'
  | 'BLOCKED_BY_GUARDRAIL'

export interface HumanReviewAxisOutputLock {
  autoClassificationForbidden: boolean
  prohibitedOutputs: string[]
  prohibitedStatuses: string[]
}

export interface HumanReviewAxisDecisionContract {
  axis: PoaAxis
  decisionStatus: HumanReviewAxisDecisionStatus
  eligibleForDecision: boolean
  requiredInputs: string[]
  requiredEvidenceReferences: string[]
  waiverDecisionRequired: boolean
  waiverDecisionAllowed: boolean
  waiverDecisionProhibitedReason: string | null
  allowedReviewerActions: string[]
  prohibitedReviewerActions: string[]
  decisionChecklist: string[]
  residualUncertainty: string[]
  traceLinks: string[]
  outputLock: HumanReviewAxisOutputLock
}

export type HumanReviewDecisionGateStatus =
  | 'HUMAN_DECISION_GATE_READY'
  | 'HUMAN_DECISION_GATE_PARTIAL'
  | 'HUMAN_DECISION_GATE_BLOCKED'

export interface HumanReviewDecisionGate {
  required: boolean
  status: HumanReviewDecisionGateStatus
  axisContracts: HumanReviewAxisDecisionContract[]
  globalProhibitedOutputs: string[]
  globalDecisionRules: string[]
}

export type HumanDecisionIntent =
  | 'PROPOSE_CODE'
  | 'DEFER_AXIS'
  | 'REQUEST_MORE_EVIDENCE'
  | 'REJECT_AXIS_CLASSIFICATION'

export interface HumanWaiverDecision {
  requested: boolean
  approved: boolean
  rationale: string | null
  acceptedResidualUncertainty: string[]
  prohibitedIfAbsoluteBlocker: boolean
}

export interface HumanAxisDecisionInput {
  axis: PoaAxis
  decisionIntent: HumanDecisionIntent
  proposedCode: string | null
  evidenceReferences: string[]
  reviewerRationale: string
  acceptedUncertainties: string[]
  rejectedUncertainties: string[]
  waiverDecision: HumanWaiverDecision
  guardrailAcknowledgements: string[]
  limitations: string[]
  confidenceByReviewer: 'low' | 'medium' | 'high'
  requestedDownstreamOutputs?: string[]
}

export interface HumanDecisionInputSet {
  inputId: string
  reviewerId?: string
  reviewTimestamp?: string
  axisDecisions: HumanAxisDecisionInput[]
}

export type HumanDecisionValidationStatus =
  | 'VALID_FOR_RELEASE_GATE'
  | 'INVALID_NOT_READY'
  | 'INVALID_MISSING_EVIDENCE_REFERENCES'
  | 'INVALID_MISSING_RATIONALE'
  | 'INVALID_WAIVER_CONFLICT'
  | 'INVALID_GUARDRAIL_CONFLICT'

export interface HumanDecisionValidationResult {
  axis: PoaAxis
  valid: boolean
  status: HumanDecisionValidationStatus
  blockingIssues: string[]
  warnings: string[]
  acceptedForNextGate: boolean
}

export interface HumanDecisionInputValidation {
  inputProvided: boolean
  inputId: string | null
  results: HumanDecisionValidationResult[]
  allValid: boolean
  acceptedAxesForNextGate: PoaAxis[]
  rejectedAxesForNextGate: PoaAxis[]
  blockingIssues: string[]
  warnings: string[]
}

export type ManualClassificationDryRunReleaseStatus =
  | 'MANUAL_INPUT_VALIDATED_NOT_RELEASED'
  | 'MANUAL_INPUT_REJECTED'

export interface ManualClassificationDryRunResult {
  inputId: string
  axisDecisionInputs: HumanAxisDecisionInput[]
  validationResults: HumanDecisionValidationResult[]
  acceptedForNextGate: boolean
  releaseStatus: ManualClassificationDryRunReleaseStatus
  releaseBlockedReason: string
  selectedCodesRemainUnresolved: boolean
  proposedCodes: Partial<Record<PoaAxis, string>>
  outputLocks: string[]
}

export interface HumanValidatedAxisClassification {
  axis: PoaAxis
  releasedCode: string | null
  source: 'HUMAN_REVIEW'
  reviewerRationale: string
  evidenceReferences: string[]
  acceptedUncertainties: string[]
  waiverApplied: boolean
  guardrailAcknowledgements: string[]
  releaseStatus: 'RELEASED_BY_HUMAN_REVIEW' | 'RELEASE_BLOCKED'
  releaseBlockingIssues: string[]
  auditTrace: string[]
}

export interface CodeReleaseGateResult {
  inputId: string
  gateStatus: 'RELEASE_READY_FOR_CAUSAL_CORE' | 'PARTIAL_RELEASE' | 'RELEASE_BLOCKED'
  axisReleases: HumanValidatedAxisClassification[]
  globalBlockingIssues: string[]
  outputLocks: string[]
  downstreamStillLocked: boolean
  finalConclusionStillLocked: boolean
  causalCoreOnly: boolean
}

export type HumanReviewStatusCode = 'HUMAN_DECISION_REQUIRED' | 'HUMAN_DECISION_CONTRACT_READY'

export interface HumanReviewStatus {
  required: boolean
  status: HumanReviewStatusCode
  rationale: string
  checklist: string[]
  prohibitedOutputs: string[]
}

export interface SeraVNextTrace {
  stepOrder: string[]
  stepStatus: Record<string, 'stub' | 'done' | 'skipped'>
  notes: string[]
}

export interface SeraVNextResult {
  engineVersion: SeraVNextEngineVersion
  inputId: string
  factualSummary: FactualSummary
  unsafeState: OperationalUnsafeState
  unsafeActCondition: UnsafeActConditionAnalysis
  directActor: DirectActorAnalysis
  poaStatements: PoaStatements
  poaClassification: PoaClassification
  preconditions: PreconditionsAnalysis
  limitations: Limitation[]
  recommendations: Recommendation[]
  causalAssurance: CausalAssurance
  humanReviewRequired: boolean
  humanReview: HumanReviewStatus
  humanReviewDecisionGate: HumanReviewDecisionGate
  humanDecisionValidation: HumanDecisionInputValidation
  trace: SeraVNextTrace
}
