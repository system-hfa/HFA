export type SeraVNextEngineVersion = 'sera-vnext-v0.2.0'

export type SeraVNextSourceType = 'neutral_trial' | 'user_event' | 'report_extract'

export type SeraVNextLocale = 'pt-BR' | 'en'

export interface SeraVNextInput {
  inputId: string
  narrative: string
  sourceType: SeraVNextSourceType
  locale?: SeraVNextLocale
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
  | 'REVIEW_REQUIRED'
  | 'INSUFFICIENT_EVIDENCE'
  | 'NOT_IMPLEMENTED'

export type PoaEvidenceSufficiency = 'sufficient' | 'partial' | 'insufficient'

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

export interface HumanReviewStatus {
  required: boolean
  rationale: string
  checklist: string[]
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
  trace: SeraVNextTrace
}
