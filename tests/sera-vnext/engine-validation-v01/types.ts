export type EngineValidationGroup = 'official' | 'human' | 'generalization' | 'adversarial'

export type EngineValidationCase = {
  caseId: string
  title: string
  group: EngineValidationGroup
  sourceType: 'real_event' | 'human_applied_reference' | 'synthetic' | 'control' | 'neutral_trial'
  narrative: string
}

export type ExpectedActor = Array<string | null> | 'UNRESOLVED_BY_AUTHOR'
export type ExpectedCode = string | null
export type ExpectedCodes = ExpectedCode[] | 'UNRESOLVED_BY_AUTHOR'

export type ExpectedAxisBoundary = {
  allowedStatuses: Array<'CANDIDATE' | 'NO_FAILURE' | 'INSUFFICIENT_EVIDENCE' | 'UNRESOLVED'>
  codeRequired: boolean
  nullCodeAllowed: boolean
  allowedCodes: ExpectedCodes
  forbiddenCodes: string[]
  requiredEvidenceFragments: string[]
  forbiddenInferenceFragments: string[]
}

export type SourceDepthExpectation = {
  evidenceSource: 'NARRATIVE_ONLY' | 'HUMAN_APPLIED_REFERENCE' | 'REAL_REPORT_SUMMARY' | 'CONTROL_SYNTHETIC'
  canonicalTreeRequired: true
  reportConclusionQuarantined: true
  llmAllowed: false
}

export type EngineValidationExpectedCase = {
  caseId: string
  expectedEscapePointStatus: Array<'CANDIDATE' | 'PROGRESSIVE_ZONE' | 'NO_HUMAN_ESCAPE_POINT' | 'INSUFFICIENT_EVIDENCE'>
  expectedEscapePointBoundary: string | 'UNRESOLVED_BY_AUTHOR' | null
  expectedDirectActor: ExpectedActor
  axes: {
    perception: ExpectedAxisBoundary
    objective: ExpectedAxisBoundary
    action: ExpectedAxisBoundary
  }
  expectedPreconditionCategories: string[]
  criticalPreconditionCategories: string[]
  requiredGuardrails: Array<
    | 'consequenceUsedAsCause'
    | 'postEscapeHuntingDetected'
    | 'oeUsed'
    | 'inventedQuestionDetected'
    | 'actorMigrationDetected'
    | 'preconditionUsedAsEscapePoint'
  >
  postEscapeEvidenceToExclude: string[]
  minimumUncertainties: number
  sourceDepth: SourceDepthExpectation
  authorDecisionStatus: 'NO_AUTHOR_DECISION_REQUIRED' | 'AUTHOR_UNRESOLVED_ALLOWED'
  criticality: 'CRITICAL_BOUNDARY' | 'NONCRITICAL_BOUNDARY'
}

export type EngineValidationFinding = {
  severity: 'pass' | 'noncritical' | 'critical' | 'fail' | 'error'
  field: string
  detail: string
}

export type EngineValidationCaseResult = {
  caseId: string
  title: string
  group: EngineValidationGroup
  passed: boolean
  criticalFindings: number
  noncriticalFindings: number
  findings: EngineValidationFinding[]
  outputSummary: {
    escapePointStatus: string
    directActor: string | null
    pStatus: string
    pCode: string | null
    oStatus: string
    oCode: string | null
    aStatus: string
    aCode: string | null
    unansweredQuestions: number
    uncertainties: number
    sourceEvidenceItems: number
    postEscapeExcluded: number
  }
}

export type DeterminismCaseResult = {
  caseId: string
  runs: number
  structuralDeterminism: number
  semanticEquivalence: number
  identical: boolean
}

export type ProductAlphaParityResult = {
  passed: boolean
  findings: string[]
}

export type EngineValidationRunReport = {
  generatedAt: string
  totalCases: number
  groups: Record<EngineValidationGroup, number>
  passCount: number
  noncriticalCount: number
  criticalCount: number
  failCount: number
  errorCount: number
  caseResults: EngineValidationCaseResult[]
  determinism: DeterminismCaseResult[]
  productAlphaParity: ProductAlphaParityResult
  sourceDepth: Array<{ caseId: string; evidenceItems: number; postEscapeItems: number; canonicalAnswers: number; sourceDepth: SourceDepthExpectation }>
  finalDecision:
    | 'SERA_VNEXT_ENGINE_V01_VALIDATED'
    | 'SERA_VNEXT_ENGINE_V01_VALIDATED_WITH_NONCRITICAL_LIMITATIONS'
    | 'SERA_VNEXT_ENGINE_V01_VALIDATION_BLOCKED'
  productBetaGate: 'PRODUCT_BETA_FOUNDATION_ALLOWED' | 'PRODUCT_BETA_FOUNDATION_BLOCKED'
  blockingReasons: string[]
  noncriticalLimitations: string[]
}
