export type SeraVNextEngineValidationStatus =
  | "SERA_VNEXT_ENGINE_VALIDATED_FOR_PRODUCT_BETA"
  | "SERA_VNEXT_ENGINE_VALIDATED_WITH_EXPLICIT_LIMITATIONS"
  | "SERA_VNEXT_ENGINE_NOT_IMPLEMENTED"
  | "SERA_VNEXT_ENGINE_VALIDATION_FAILED"
  | "SERA_VNEXT_ENGINE_BLOCKED_BY_ARCHITECTURE";

export type SeraVNextProductBetaGateStatus =
  | "PRODUCT_BETA_FOUNDATION_AUTHORIZED"
  | "PRODUCT_BETA_FOUNDATION_BLOCKED";

export type SeraVNextEngineValidationScope =
  | "regression"
  | "generalization"
  | "determinism"
  | "boundary"
  | "product_alpha_e2e";

export interface SeraVNextEngineValidationFinding {
  id: string;
  severity: "blocking" | "limitation" | "confirmation";
  component: string;
  detail: string;
}

export interface SeraVNextEngineValidationCaseResult {
  caseId: string;
  scope: SeraVNextEngineValidationScope;
  passed: boolean;
  observations: string[];
}

export interface SeraVNextEngineValidationRunResult {
  scope: SeraVNextEngineValidationScope;
  passed: boolean;
  finalDecision: SeraVNextEngineValidationStatus;
  productBetaGateStatus: SeraVNextProductBetaGateStatus;
  blockingIssues: string[];
  findings: SeraVNextEngineValidationFinding[];
  caseResults: SeraVNextEngineValidationCaseResult[];
}
