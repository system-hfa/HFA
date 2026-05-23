// tests/sera/fixtures/schema.ts
export interface SeraFixture {
  id: string
  title: string
  domain: string
  description: string
  expected: {
    perception_code: string
    objective_code: string
    action_code: string
    erc_level: number
    top_preconditions?: string[]
  }
  rationale: string
  discriminators: string[]
}

export type LegacyScore = 'PASS' | 'PARTIAL' | 'FAIL'
export type RiskLayerRunStatus = 'MATCH' | 'MISMATCH' | 'HOLD'
export type RiskLayerFixtureStatus = 'RISK_PASS' | 'RISK_HOLD'

export interface TestResult {
  fixture_id: string
  title: string
  run_index: number
  timestamp: string
  actual: {
    perception_code: string
    objective_code: string
    action_code: string
    erc_level: number
    preconditions: string[]
  }
  expected: SeraFixture['expected']
  scores: {
    perception: 'PASS' | 'FAIL'
    objective: 'PASS' | 'FAIL'
    action: 'PASS' | 'FAIL'
    erc_level: 'PASS' | 'FAIL'
    preconditions: 'PASS' | 'PARTIAL' | 'FAIL'
    overall: LegacyScore
    legacy_overall: LegacyScore
    causal_overall: LegacyScore
    risk_layer_status: RiskLayerRunStatus
  }
  duration_ms: number
  error?: string
}

export interface FixtureReport {
  fixture_id: string
  title: string
  expected_codes: string
  runs: TestResult[]
  consistency: {
    perception_consistent: boolean
    objective_consistent: boolean
    action_consistent: boolean
    erc_consistent: boolean
    fully_deterministic: boolean
  }
  accuracy: {
    perception_accuracy: number
    objective_accuracy: number
    action_accuracy: number
    erc_accuracy: number
    precondition_recall: number
    overall_accuracy: number
    legacy_overall_accuracy: number
    causal_overall_accuracy: number
    risk_layer_match_rate: number
  }
  views: {
    legacy_overall: LegacyScore
    causal_overall: LegacyScore
    risk_layer_status: RiskLayerFixtureStatus
  }
}

export interface RunReport {
  run_id: string
  timestamp: string
  n_runs_per_fixture: number
  fixtures_tested: number
  aborted?: boolean
  summary: {
    total_runs: number
    pass: number
    partial: number
    fail: number
    error: number
    pass_rate: number
    determinism_rate: number
  }
  causal_summary?: {
    total_runs: number
    pass: number
    partial: number
    fail: number
    error: number
    pass_rate: number
    determinism_rate: number
  }
  risk_layer_summary?: {
    total_runs: number
    match: number
    mismatch: number
    hold: number
    match_rate: number
    determinism_rate: number
    mismatch_fixture_count: number
  }
  by_fixture: FixtureReport[]
  confusion_matrix: Record<string, Record<string, number>>
  weakest_fixtures: string[]
}
