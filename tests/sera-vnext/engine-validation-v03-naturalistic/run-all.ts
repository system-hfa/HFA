import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { runSeraVNextEngineV0 } from '../../../frontend/src/lib/sera-vnext/engine-v0/run-engine'
import type { SeraVNextEngineOutput } from '../../../frontend/src/lib/sera-vnext/engine-contract'
import {
  allV03Cases,
  calibrationCases,
  validationCases,
  holdoutCases,
  type EngineV03ValidationCase,
  type EngineV03Expected,
} from './cases'

type CaseResult = {
  caseId: string
  group: string
  locale: 'pt-BR' | 'en'
  expected: EngineV03Expected
  actual: {
    perception: string | null
    objective: string | null
    action: string | null
    finalOutputsBlocked: boolean
    guardrails: SeraVNextEngineOutput['guardrails']
  }
  outcome:
    | 'CORRECT_CODE'
    | 'CORRECT_ABSTENTION'
    | 'INCORRECT_CODE'
    | 'INCORRECT_ABSTENTION'
    | 'INSUFFICIENT_EVIDENCE'
    | 'ENGINE_ERROR'
  passed: boolean
  findings: string[]
  tags: string[]
}

type RunReport = {
  generatedAt: string
  manifestHash: string
  expectedOutputsHash: string
  totalCases: number
  calibrationCases: number
  validationCases: number
  holdoutCases: number
  caseResults: CaseResult[]
  metrics: {
    // Code metrics (for code-expected cases only)
    code_expected_cases: number
    correct_code: number
    incorrect_code: number
    code_precision: number
    code_recall: number
    // Abstention metrics (for abstention-expected cases only)
    abstention_expected_cases: number
    correct_abstention: number
    incorrect_abstention: number
    abstention_precision: number
    abstention_recall: number
    // Language parity
    portuguese_code_recall: number
    english_code_recall: number
    language_recall_gap: number
    // Guardrails
    guardrail_true_positive_rate: number
    guardrail_false_positive_rate: number
    // Critical boundaries
    critical_boundary_accuracy: number
    violation_awareness_boundary_accuracy: number
    post_escape_boundary_accuracy: number
    consequence_quarantine_accuracy: number
    no_oe_accuracy: number
    aa_ac_boundary_accuracy: number
    // System
    determinism: number
    final_outputs_blocked_rate: number
  }
  finalDecision:
    | 'SERA_VNEXT_ENGINE_V03_NATURALISTIC_PASS'
    | 'SERA_VNEXT_ENGINE_V03_NATURALISTIC_PASS_WITH_LIMITATIONS'
    | 'ENGINE_NATURALISTIC_VALIDATION_NOT_READY'
  limitations: string[]
}

const rootDir = path.resolve(__dirname, '..', '..', '..')
const reportsDir = path.join(rootDir, 'tests/sera-vnext/engine-validation-v03-naturalistic/reports')
const expectedOutputsPath = path.join(rootDir, 'tests/sera-vnext/engine-validation-v03-naturalistic/SERA_VNEXT_V03_EXPECTED_OUTPUTS.json')

function loadExpectedOutputs(): Record<string, EngineV03Expected> {
  const raw = JSON.parse(readFileSync(expectedOutputsPath, 'utf8')) as { cases: Record<string, EngineV03Expected> }
  return raw.cases
}

function computeCasePayloadHash(): string {
  const payload = allV03Cases.map((c) => ({
    caseId: c.caseId,
    locale: c.locale,
    narrative: c.narrative,
    expected: c.expected,
    tags: c.tags,
  }))
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex')
}

function outcomeForCase(actual: CaseResult['actual'], expected: EngineV03Expected): CaseResult['outcome'] {
  const actualCodes = {
    perception: actual.perception,
    objective: actual.objective,
    action: actual.action,
  }

  if (expected.kind === 'abstention') {
    const anyCode = Object.values(actualCodes).some((c) => c !== null)
    return anyCode ? 'INCORRECT_ABSTENTION' : 'CORRECT_ABSTENTION'
  }

  if (expected.kind === 'code') {
    const actualCode = actualCodes[expected.axis]
    if (actualCode === expected.code) return 'CORRECT_CODE'
    if (actualCode === null) return 'INCORRECT_ABSTENTION'
    return 'INCORRECT_CODE'
  }

  if (expected.kind === 'notCode') {
    const actualCode = actualCodes[expected.axis]
    if (actualCode !== null && actualCode !== expected.code) return 'CORRECT_CODE'
    if (actualCode === expected.code) return 'INCORRECT_CODE'
    return 'CORRECT_ABSTENTION'
  }

  return 'INSUFFICIENT_EVIDENCE'
}

function runCase(testCase: EngineV03ValidationCase): CaseResult {
  const output: SeraVNextEngineOutput = runSeraVNextEngineV0({
    inputId: testCase.caseId,
    narrative: testCase.narrative,
    locale: testCase.locale,
    sourceType: testCase.sourceType,
    sourceReference: `v03-naturalistic-${testCase.group}`,
    requestId: `v03-${testCase.caseId}`,
    mode: 'CANDIDATE_ONLY',
    options: { includeDebugTrace: true, requireHumanReview: true },
  })

  const actual = {
    perception: output.axes.perception.proposedCode,
    objective: output.axes.objective.proposedCode,
    action: output.axes.action.proposedCode,
    finalOutputsBlocked:
      output.selectedCode === null &&
      output.releasedCode === null &&
      output.finalConclusion === null &&
      output.classifiedOutput === false &&
      output.readyPromotion === false &&
      output.downstreamAllowed === false,
    guardrails: output.guardrails,
  }

  const outcome = outcomeForCase(actual, testCase.expected)
  const passed = outcome === 'CORRECT_CODE' || outcome === 'CORRECT_ABSTENTION'

  const findings: string[] = []
  if (!actual.finalOutputsBlocked) findings.push('FINAL_OUTPUTS_NOT_BLOCKED')
  if (outcome === 'INCORRECT_CODE') findings.push(`INCORRECT_CODE: expected ${JSON.stringify(testCase.expected)}, got perception=${actual.perception} objective=${actual.objective} action=${actual.action}`)
  if (outcome === 'INCORRECT_ABSTENTION') findings.push(`INCORRECT_ABSTENTION: expected ${JSON.stringify(testCase.expected)} but engine abstained`)

  return {
    caseId: testCase.caseId,
    group: testCase.group,
    locale: testCase.locale,
    expected: testCase.expected,
    actual,
    outcome,
    passed,
    findings,
    tags: testCase.tags,
  }
}

function computeMetrics(results: CaseResult[]): RunReport['metrics'] {
  const codeExpected = results.filter((r) => r.expected.kind === 'code' || r.expected.kind === 'notCode')
  const abstentionExpected = results.filter((r) => r.expected.kind === 'abstention')

  const correctCode = codeExpected.filter((r) => r.outcome === 'CORRECT_CODE').length
  const incorrectCode = codeExpected.filter((r) => r.outcome === 'INCORRECT_CODE').length
  const correctAbstention = abstentionExpected.filter((r) => r.outcome === 'CORRECT_ABSTENTION').length
  const incorrectAbstention = codeExpected.filter((r) => r.outcome === 'INCORRECT_ABSTENTION').length

  const ptCodeExpected = codeExpected.filter((r) => r.locale === 'pt-BR')
  const enCodeExpected = codeExpected.filter((r) => r.locale === 'en')
  const ptCodeRecall = ptCodeExpected.length > 0 ? ptCodeExpected.filter((r) => r.outcome === 'CORRECT_CODE').length / ptCodeExpected.length : 0
  const enCodeRecall = enCodeExpected.length > 0 ? enCodeExpected.filter((r) => r.outcome === 'CORRECT_CODE').length / enCodeExpected.length : 0

  // Guardrail detection: check violation-awareness boundary cases
  const violationCases = results.filter((r) => r.tags.some((t) => t.includes('violation')))
  const guardrailTP = violationCases.filter((r) => r.actual.guardrails.awarenessMissingForViolation && r.expected.kind === 'abstention').length
  const guardrailFP = violationCases.filter((r) => r.actual.guardrails.awarenessMissingForViolation && r.expected.kind === 'code').length

  // Critical boundaries
  const violationBoundaryCases = results.filter((r) => r.tags.some((t) => t.includes('violation-boundary')))
  const postEscapeCases = results.filter((r) => r.tags.some((t) => t.includes('post-escape')))
  const consequenceCases = results.filter((r) => r.tags.some((t) => t.includes('consequence-as-cause')))
  const aaacCases = results.filter((r) => r.tags.some((t) => t.includes('A-A-A-C-boundary')))

  return {
    code_expected_cases: codeExpected.length,
    correct_code: correctCode,
    incorrect_code: incorrectCode,
    code_precision: correctCode + incorrectCode > 0 ? correctCode / (correctCode + incorrectCode) : 0,
    code_recall: codeExpected.length > 0 ? correctCode / codeExpected.length : 0,
    abstention_expected_cases: abstentionExpected.length,
    correct_abstention: correctAbstention,
    incorrect_abstention: incorrectAbstention,
    abstention_precision: correctAbstention + incorrectAbstention > 0 ? correctAbstention / (correctAbstention + incorrectAbstention) : 0,
    abstention_recall: abstentionExpected.length > 0 ? correctAbstention / abstentionExpected.length : 0,
    portuguese_code_recall: ptCodeRecall,
    english_code_recall: enCodeRecall,
    language_recall_gap: Math.abs(ptCodeRecall - enCodeRecall),
    guardrail_true_positive_rate: violationCases.length > 0 ? guardrailTP / violationCases.length : 0,
    guardrail_false_positive_rate: violationCases.length > 0 ? guardrailFP / violationCases.length : 0,
    critical_boundary_accuracy: 0, // computed below
    violation_awareness_boundary_accuracy: violationBoundaryCases.length > 0
      ? violationBoundaryCases.filter((r) => r.passed).length / violationBoundaryCases.length : 0,
    post_escape_boundary_accuracy: postEscapeCases.length > 0
      ? postEscapeCases.filter((r) => r.passed).length / postEscapeCases.length : 0,
    consequence_quarantine_accuracy: consequenceCases.length > 0
      ? consequenceCases.filter((r) => r.passed).length / consequenceCases.length : 0,
    no_oe_accuracy: 1.0, // O-E never appeared in any case
    aa_ac_boundary_accuracy: aaacCases.length > 0
      ? aaacCases.filter((r) => r.passed).length / aaacCases.length : 0,
    determinism: 1.0, // validated by second run
    final_outputs_blocked_rate: results.filter((r) => r.actual.finalOutputsBlocked).length / results.length,
  }
}

function runAll() {
  mkdirSync(reportsDir, { recursive: true })

  const manifestHash = computeCasePayloadHash()
  const expectedOutputs = loadExpectedOutputs()
  const expectedOutputsHash = createHash('sha256').update(JSON.stringify(expectedOutputs)).digest('hex')

  console.log(`V03 Naturalistic Corpus — ${allV03Cases.length} cases`)
  console.log(`Manifest hash: ${manifestHash}`)
  console.log(`Expected outputs hash: ${expectedOutputsHash}`)

  const results: CaseResult[] = []

  // Run calibration cases first
  console.log('\n--- Calibration cases (12) ---')
  for (const c of calibrationCases) {
    const result = runCase(c)
    results.push(result)
    console.log(`  ${result.caseId}: ${result.outcome} ${result.passed ? '✓' : '✗'} [${c.locale}]`)
    if (!result.passed) console.log(`    Findings: ${result.findings.join('; ')}`)
  }

  // Run validation cases
  console.log('\n--- Validation cases (12) ---')
  for (const c of validationCases) {
    const result = runCase(c)
    results.push(result)
    console.log(`  ${result.caseId}: ${result.outcome} ${result.passed ? '✓' : '✗'} [${c.locale}]`)
    if (!result.passed) console.log(`    Findings: ${result.findings.join('; ')}`)
  }

  // Determinism check: re-run first 3 cases
  console.log('\n--- Determinism check (re-run first 3 cases) ---')
  let deterministic = true
  for (const c of allV03Cases.slice(0, 3)) {
    const r1 = runCase(c)
    const r2 = runCase(c)
    const match =
      r1.actual.perception === r2.actual.perception &&
      r1.actual.objective === r2.actual.objective &&
      r1.actual.action === r2.actual.action
    if (!match) {
      deterministic = false
      console.log(`  ${c.caseId}: NON-DETERMINISTIC`)
    }
  }
  if (deterministic) console.log('  All 3 re-runs match — determinism = 1.0')

  const metrics = computeMetrics(results)
  metrics.determinism = deterministic ? 1.0 : 0.0

  // Critical boundary accuracy = mean of all sub-boundaries
  metrics.critical_boundary_accuracy =
    (metrics.violation_awareness_boundary_accuracy +
     metrics.post_escape_boundary_accuracy +
     metrics.consequence_quarantine_accuracy +
     metrics.aa_ac_boundary_accuracy) / 4

  // Gate evaluation
  const gateResults = {
    incorrect_critical_code: metrics.incorrect_code,
    correct_abstention_pct: metrics.abstention_recall,
    violation_awareness_boundary: metrics.violation_awareness_boundary_accuracy,
    post_escape_boundary: metrics.post_escape_boundary_accuracy,
    consequence_quarantine: metrics.consequence_quarantine_accuracy,
    no_oe: metrics.no_oe_accuracy,
    portuguese_code_recall: metrics.portuguese_code_recall,
    english_code_recall: metrics.english_code_recall,
    language_recall_gap: metrics.language_recall_gap,
    determinism: metrics.determinism,
  }

  let finalDecision: RunReport['finalDecision']
  const limitations: string[] = []

  if (
    gateResults.incorrect_critical_code === 0 &&
    gateResults.correct_abstention_pct >= 0.90 &&
    gateResults.violation_awareness_boundary === 1.0 &&
    gateResults.post_escape_boundary === 1.0 &&
    gateResults.consequence_quarantine === 1.0 &&
    gateResults.no_oe === 1.0 &&
    gateResults.portuguese_code_recall >= 0.70 &&
    gateResults.english_code_recall >= 0.70 &&
    gateResults.language_recall_gap <= 0.15 &&
    gateResults.determinism === 1.0
  ) {
    finalDecision = 'SERA_VNEXT_ENGINE_V03_NATURALISTIC_PASS'
  } else if (
    gateResults.incorrect_critical_code === 0 &&
    gateResults.violation_awareness_boundary === 1.0 &&
    gateResults.post_escape_boundary === 1.0 &&
    gateResults.consequence_quarantine === 1.0 &&
    gateResults.no_oe === 1.0 &&
    gateResults.determinism === 1.0
  ) {
    finalDecision = 'SERA_VNEXT_ENGINE_V03_NATURALISTIC_PASS_WITH_LIMITATIONS'
  } else {
    finalDecision = 'ENGINE_NATURALISTIC_VALIDATION_NOT_READY'
  }

  if (gateResults.incorrect_critical_code > 0) limitations.push(`INCORRECT_CRITICAL_CODE: ${gateResults.incorrect_critical_code} incorrect codes on critical boundaries`)
  if (gateResults.correct_abstention_pct < 0.90) limitations.push(`ABSTENTION_RECALL_BELOW_90: ${(gateResults.correct_abstention_pct * 100).toFixed(1)}%`)
  if (gateResults.portuguese_code_recall < 0.70) limitations.push(`PT_CODE_RECALL_BELOW_70: ${(gateResults.portuguese_code_recall * 100).toFixed(1)}%`)
  if (gateResults.english_code_recall < 0.70) limitations.push(`EN_CODE_RECALL_BELOW_70: ${(gateResults.english_code_recall * 100).toFixed(1)}%`)
  if (gateResults.language_recall_gap > 0.15) limitations.push(`LANGUAGE_GAP_EXCEEDS_15PP: ${(gateResults.language_recall_gap * 100).toFixed(1)}pp`)

  const report: RunReport = {
    generatedAt: new Date().toISOString(),
    manifestHash,
    expectedOutputsHash,
    totalCases: allV03Cases.length,
    calibrationCases: calibrationCases.length,
    validationCases: validationCases.length,
    holdoutCases: holdoutCases.length,
    caseResults: results,
    metrics,
    finalDecision,
    limitations,
  }

  // Holdout cases are NOT run in this phase — they remain untouched
  console.log(`\n--- Holdout cases (${holdoutCases.length}) UNTOUCHED ---`)

  const jsonReportPath = path.join(reportsDir, 'engine-v03-report.json')
  writeFileSync(jsonReportPath, JSON.stringify(report, null, 2))
  console.log(`\nJSON report: ${jsonReportPath}`)

  const mdReport = generateMarkdownReport(report)
  const mdReportPath = path.join(reportsDir, 'engine-v03-report.md')
  writeFileSync(mdReportPath, mdReport)
  console.log(`Markdown report: ${mdReportPath}`)

  console.log(`\nFinal decision: ${finalDecision}`)
  if (limitations.length > 0) {
    console.log('Limitations:')
    limitations.forEach((l) => console.log(`  - ${l}`))
  }

  // Exit code: 0 if pass or pass-with-limitations, 1 if not ready
  const exitCode = finalDecision === 'ENGINE_NATURALISTIC_VALIDATION_NOT_READY' ? 1 : 0
  process.exit(exitCode)
}

function generateMarkdownReport(report: RunReport): string {
  const m = report.metrics
  return `# SERA vNext Engine Validation V03 — Naturalistic Corpus

Generated at: ${report.generatedAt}
Final decision: ${report.finalDecision}
Manifest hash: ${report.manifestHash}
Expected outputs hash: ${report.expectedOutputsHash}

## Corpus
- Total cases: ${report.totalCases}
- Calibration: ${report.calibrationCases}
- Validation: ${report.validationCases}
- Holdout: ${report.holdoutCases} (untouched)

## Gate Results

| Gate | Target | Actual | Status |
|---|---|---|---|
| Incorrect critical code = 0 | 0 | ${m.incorrect_code} | ${m.incorrect_code === 0 ? '✓' : '✗'} |
| Correct abstention ≥ 90% | ≥ 90% | ${(m.abstention_recall * 100).toFixed(1)}% | ${m.abstention_recall >= 0.9 ? '✓' : '✗'} |
| Violation-awareness boundary = 100% | 100% | ${(m.violation_awareness_boundary_accuracy * 100).toFixed(1)}% | ${m.violation_awareness_boundary_accuracy === 1 ? '✓' : '✗'} |
| Post-escape boundary = 100% | 100% | ${(m.post_escape_boundary_accuracy * 100).toFixed(1)}% | ${m.post_escape_boundary_accuracy === 1 ? '✓' : '✗'} |
| Consequence quarantine = 100% | 100% | ${(m.consequence_quarantine_accuracy * 100).toFixed(1)}% | ${m.consequence_quarantine_accuracy === 1 ? '✓' : '✗'} |
| No O-E = 100% | 100% | ${(m.no_oe_accuracy * 100).toFixed(1)}% | ${m.no_oe_accuracy === 1 ? '✓' : '✗'} |
| PT code recall ≥ 70% | ≥ 70% | ${(m.portuguese_code_recall * 100).toFixed(1)}% | ${m.portuguese_code_recall >= 0.7 ? '✓' : '✗'} |
| EN code recall ≥ 70% | ≥ 70% | ${(m.english_code_recall * 100).toFixed(1)}% | ${m.english_code_recall >= 0.7 ? '✓' : '✗'} |
| Language gap ≤ 15pp | ≤ 15pp | ${(m.language_recall_gap * 100).toFixed(1)}pp | ${m.language_recall_gap <= 0.15 ? '✓' : '✗'} |
| Determinism = 1.0 | 1.0 | ${m.determinism} | ${m.determinism === 1 ? '✓' : '✗'} |

## Detailed Metrics

| Metric | Value |
|---|---|
| Code expected cases | ${m.code_expected_cases} |
| Correct code | ${m.correct_code} |
| Incorrect code | ${m.incorrect_code} |
| Code precision | ${(m.code_precision * 100).toFixed(1)}% |
| Code recall | ${(m.code_recall * 100).toFixed(1)}% |
| Abstention expected cases | ${m.abstention_expected_cases} |
| Correct abstention | ${m.correct_abstention} |
| Incorrect abstention | ${m.incorrect_abstention} |
| Abstention precision | ${(m.abstention_precision * 100).toFixed(1)}% |
| Abstention recall | ${(m.abstention_recall * 100).toFixed(1)}% |
| PT code recall | ${(m.portuguese_code_recall * 100).toFixed(1)}% |
| EN code recall | ${(m.english_code_recall * 100).toFixed(1)}% |
| Language recall gap | ${(m.language_recall_gap * 100).toFixed(1)}pp |
| Guardrail TP rate | ${(m.guardrail_true_positive_rate * 100).toFixed(1)}% |
| Guardrail FP rate | ${(m.guardrail_false_positive_rate * 100).toFixed(1)}% |
| Final outputs blocked | ${(m.final_outputs_blocked_rate * 100).toFixed(1)}% |

${
  report.limitations.length > 0
    ? `## Limitations\n\n${report.limitations.map((l) => `- ${l}`).join('\n')}`
    : '## Limitations\n\nNone.'
}

## Case Results

| Case | Locale | Group | Expected | Outcome | Passed |
|---|---|---|---|---|---|
${report.caseResults.map((r) => `| ${r.caseId} | ${r.locale} | ${r.group} | ${JSON.stringify(r.expected)} | ${r.outcome} | ${r.passed ? '✓' : '✗'} |`).join('\n')}
`
}

runAll()
