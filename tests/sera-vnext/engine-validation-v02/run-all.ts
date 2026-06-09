import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { runSeraVNextEngineV0 } from '../../../frontend/src/lib/sera-vnext/engine-v0/run-engine'
import type { SeraVNextEngineOutput } from '../../../frontend/src/lib/sera-vnext/engine-contract'
import {
  engineV02ValidationCases,
  existingRegressionCases,
  type EngineV02ValidationCase,
  type EngineV02Expected,
} from './cases'

type CaseResult = {
  caseId: string
  group: EngineV02ValidationCase['group'] | 'existing_regression'
  expected: EngineV02Expected | 'REGRESSION_GUARDRAIL_ONLY'
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
  existingRegressionCases: number
  v02Cases: number
  caseResults: CaseResult[]
  metrics: {
    classification_accuracy: number
    abstention_precision: number
    abstention_recall: number
    guardrail_detection_rate: number
    leaf_coverage: number
    language_parity: Record<'pt-BR' | 'en', number>
    determinism: number
    critical_boundary_pass_rate: number
    product_parity: number
  }
  finalDecision:
    | 'SERA_VNEXT_ENGINE_V02_VALIDATED_FOR_CONTROLLED_PILOT'
    | 'SERA_VNEXT_ENGINE_V02_PASS_WITH_LIMITATIONS'
    | 'SERA_VNEXT_ENGINE_V02_NOT_READY'
  limitations: string[]
}

const rootDir = path.resolve(__dirname, '..', '..', '..')
const reportsDir = path.join(rootDir, 'tests/sera-vnext/engine-validation-v02/reports')
const manifestPath = path.join(rootDir, 'tests/sera-vnext/engine-validation-v02/SERA_VNEXT_ENGINE_V02_EXPECTED_MANIFEST.json')

function expectedPayloadHash(): string {
  const payload = {
    existingRegressionCaseIds: existingRegressionCases.map((item) => item.caseId),
    v02: engineV02ValidationCases.map((item) => ({
      caseId: item.caseId,
      narrative: item.narrative,
      expected: item.expected,
      tags: item.tags,
    })),
  }
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex')
}

function loadManifestHash(): string {
  const parsed = JSON.parse(readFileSync(manifestPath, 'utf8')) as { casePayloadSha256: string }
  return parsed.casePayloadSha256
}

function axisCode(output: SeraVNextEngineOutput, axis: 'perception' | 'objective' | 'action'): string | null {
  return output.axes[axis].proposedCode
}

function finalOutputsBlocked(output: SeraVNextEngineOutput): boolean {
  return output.humanReviewRequired === true &&
    output.selectedCode === null &&
    output.releasedCode === null &&
    output.finalConclusion === null &&
    output.classifiedOutput === false &&
    output.readyPromotion === false &&
    output.downstreamAllowed === false
}

function runEngine(input: {
  inputId: string
  narrative: string
  locale: 'pt-BR' | 'en'
  sourceType: EngineV02ValidationCase['sourceType']
}): SeraVNextEngineOutput {
  return runSeraVNextEngineV0({
    inputId: input.inputId,
    narrative: input.narrative,
    locale: input.locale,
    sourceType: input.sourceType,
    requestId: input.inputId,
    mode: 'VALIDATION',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: false,
    },
  })
}

function evaluateExpected(expected: EngineV02Expected, output: SeraVNextEngineOutput): Pick<CaseResult, 'outcome' | 'passed' | 'findings'> {
  const findings: string[] = []
  const codes = {
    perception: output.axes.perception.proposedCode,
    objective: output.axes.objective.proposedCode,
    action: output.axes.action.proposedCode,
  }

  if (!finalOutputsBlocked(output)) findings.push('final output gate was not blocked')

  if (expected.kind === 'code') {
    const actual = axisCode(output, expected.axis)
    if (actual === expected.code) {
      return { outcome: 'CORRECT_CODE', passed: findings.length === 0, findings }
    }
    findings.push(`expected ${expected.axis}=${expected.code}, actual=${actual ?? 'null'}`)
    return { outcome: actual == null ? 'INCORRECT_ABSTENTION' : 'INCORRECT_CODE', passed: false, findings }
  }

  if (expected.kind === 'abstention') {
    const actualCodes = Object.values(codes).filter(Boolean)
    if (actualCodes.length === 0) {
      return { outcome: 'CORRECT_ABSTENTION', passed: findings.length === 0, findings }
    }
    findings.push(`expected abstention, actual codes=${actualCodes.join('/')}`)
    return { outcome: 'INCORRECT_CODE', passed: false, findings }
  }

  const actual = axisCode(output, expected.axis)
  if (actual !== expected.code) {
    return { outcome: actual == null ? 'CORRECT_ABSTENTION' : 'CORRECT_CODE', passed: findings.length === 0, findings }
  }
  findings.push(`negative case emitted forbidden ${expected.axis}=${expected.code}`)
  return { outcome: 'INCORRECT_CODE', passed: false, findings }
}

function runV02Case(testCase: EngineV02ValidationCase): CaseResult {
  try {
    const output = runEngine({
      inputId: testCase.caseId,
      narrative: testCase.narrative,
      locale: testCase.locale,
      sourceType: testCase.sourceType,
    })
    const evaluated = evaluateExpected(testCase.expected, output)
    return {
      caseId: testCase.caseId,
      group: testCase.group,
      expected: testCase.expected,
      actual: {
        perception: output.axes.perception.proposedCode,
        objective: output.axes.objective.proposedCode,
        action: output.axes.action.proposedCode,
        finalOutputsBlocked: finalOutputsBlocked(output),
        guardrails: output.guardrails,
      },
      outcome: evaluated.outcome,
      passed: evaluated.passed,
      findings: evaluated.findings,
      tags: testCase.tags,
    }
  } catch (error) {
    return {
      caseId: testCase.caseId,
      group: testCase.group,
      expected: testCase.expected,
      actual: {
        perception: null,
        objective: null,
        action: null,
        finalOutputsBlocked: false,
        guardrails: {
          consequenceUsedAsCause: false,
          postEscapeHuntingDetected: false,
          postEscapeEvidenceUsed: false,
          oeUsed: false,
          inventedQuestionDetected: false,
          actorMigrationDetected: false,
          preconditionUsedAsEscapePoint: false,
          codeFirstPathDetected: false,
          awarenessMissingForViolation: false,
        },
      },
      outcome: 'ENGINE_ERROR',
      passed: false,
      findings: [error instanceof Error ? error.message : String(error)],
      tags: testCase.tags,
    }
  }
}

function runRegressionCase(regressionCase: (typeof existingRegressionCases)[number]): CaseResult {
  const output = runEngine({
    inputId: regressionCase.caseId,
    narrative: regressionCase.narrative,
    locale: 'en',
    sourceType: regressionCase.sourceType,
  })
  const blocked = finalOutputsBlocked(output)
  return {
    caseId: regressionCase.caseId,
    group: 'existing_regression',
    expected: 'REGRESSION_GUARDRAIL_ONLY',
    actual: {
      perception: output.axes.perception.proposedCode,
      objective: output.axes.objective.proposedCode,
      action: output.axes.action.proposedCode,
      finalOutputsBlocked: blocked,
      guardrails: output.guardrails,
    },
    outcome: blocked ? 'CORRECT_ABSTENTION' : 'ENGINE_ERROR',
    passed: blocked,
    findings: blocked ? [] : ['existing regression emitted or enabled final output'],
    tags: ['existing-regression'],
  }
}

function ratio(numerator: number, denominator: number): number {
  if (denominator === 0) return 1
  return Number((numerator / denominator).toFixed(4))
}

function computeDeterminism(): number {
  const deterministic = engineV02ValidationCases.filter((testCase) => {
    const first = runEngine({
      inputId: `${testCase.caseId}-det-a`,
      narrative: testCase.narrative,
      locale: testCase.locale,
      sourceType: testCase.sourceType,
    })
    const second = runEngine({
      inputId: `${testCase.caseId}-det-b`,
      narrative: testCase.narrative,
      locale: testCase.locale,
      sourceType: testCase.sourceType,
    })
    return JSON.stringify({
      p: first.axes.perception.proposedCode,
      o: first.axes.objective.proposedCode,
      a: first.axes.action.proposedCode,
      guardrails: first.guardrails,
    }) === JSON.stringify({
      p: second.axes.perception.proposedCode,
      o: second.axes.objective.proposedCode,
      a: second.axes.action.proposedCode,
      guardrails: second.guardrails,
    })
  }).length
  return ratio(deterministic, engineV02ValidationCases.length)
}

function computeReport(caseResults: CaseResult[], manifestHash: string): RunReport {
  const v02Results = caseResults.filter((item) => item.group !== 'existing_regression')
  const codeExpected = v02Results.filter((item) => typeof item.expected !== 'string' && item.expected.kind === 'code')
  const abstentionExpected = v02Results.filter((item) => typeof item.expected !== 'string' && item.expected.kind === 'abstention')
  const correctCode = v02Results.filter((item) => item.outcome === 'CORRECT_CODE').length
  const correctRequiredCode = codeExpected.filter((item) => item.outcome === 'CORRECT_CODE').length
  const correctAbstention = abstentionExpected.filter((item) => item.outcome === 'CORRECT_ABSTENTION').length
  const abstentions = v02Results.filter((item) => item.outcome === 'CORRECT_ABSTENTION' || item.outcome === 'INCORRECT_ABSTENTION').length
  const guardrailBoundaryCases = v02Results.filter((item) =>
    item.tags.some((tag) => ['violation-awareness-boundary', 'post-escape-trap'].includes(tag)),
  )
  const guardrailBoundaryPassed = guardrailBoundaryCases.filter((item) => item.passed).length
  const leafCodes = new Set(
    v02Results
      .filter((item) => item.group === 'leaf_reachability_positive' && item.outcome === 'CORRECT_CODE')
      .map((item) => typeof item.expected !== 'string' && item.expected.kind === 'code' ? item.expected.code : null)
      .filter(Boolean),
  )
  const languageParity = {
    'pt-BR': ratio(
      v02Results.filter((item) => item.tags.includes('pt-BR') && item.passed).length,
      v02Results.filter((item) => item.tags.includes('pt-BR')).length,
    ),
    en: ratio(
      v02Results.filter((item) => item.tags.includes('en') && item.passed).length,
      v02Results.filter((item) => item.tags.includes('en')).length,
    ),
  }
  const criticalBoundaryCases = v02Results.filter((item) =>
    item.tags.some((tag) => ['violation-awareness', 'violation-awareness-boundary', 'A-A/A-C-boundary', 'post-escape-trap'].includes(tag)),
  )
  const productParity = ratio(caseResults.filter((item) => item.actual.finalOutputsBlocked).length, caseResults.length)

  const metrics = {
    classification_accuracy: ratio(correctRequiredCode, codeExpected.length),
    abstention_precision: ratio(correctAbstention, abstentions),
    abstention_recall: ratio(correctAbstention, abstentionExpected.length),
    guardrail_detection_rate: ratio(guardrailBoundaryPassed, guardrailBoundaryCases.length),
    leaf_coverage: ratio(leafCodes.size, 22),
    language_parity: languageParity,
    determinism: computeDeterminism(),
    critical_boundary_pass_rate: ratio(criticalBoundaryCases.filter((item) => item.passed).length, criticalBoundaryCases.length),
    product_parity: productParity,
  }

  const failures = caseResults.filter((item) => !item.passed)
  const limitations = [
    'v02 validation is deterministic technical validation, not scientific or human inter-rater validation.',
    'existing 39-case regression is retained as boundary/final-output guardrail coverage, not accuracy proof.',
  ]
  const finalDecision = failures.length > 0
    ? 'SERA_VNEXT_ENGINE_V02_NOT_READY'
    : limitations.length > 0
      ? 'SERA_VNEXT_ENGINE_V02_PASS_WITH_LIMITATIONS'
      : 'SERA_VNEXT_ENGINE_V02_VALIDATED_FOR_CONTROLLED_PILOT'

  return {
    generatedAt: new Date().toISOString(),
    manifestHash,
    existingRegressionCases: existingRegressionCases.length,
    v02Cases: engineV02ValidationCases.length,
    caseResults,
    metrics,
    finalDecision,
    limitations,
  }
}

function toCsv(rows: Array<Array<string | number | boolean | null | undefined>>): string {
  return rows.map((row) => row.map((cell) => JSON.stringify(cell ?? '')).join(',')).join('\n') + '\n'
}

export async function runEngineValidationV02(): Promise<RunReport> {
  const manifestHash = loadManifestHash()
  const actualHash = expectedPayloadHash()
  assert.equal(actualHash, manifestHash, 'engine v02 expected manifest hash mismatch')

  const caseResults = [
    ...existingRegressionCases.map(runRegressionCase),
    ...engineV02ValidationCases.map(runV02Case),
  ]
  const report = computeReport(caseResults, manifestHash)

  mkdirSync(reportsDir, { recursive: true })
  writeFileSync(path.join(reportsDir, 'engine-v02-report.json'), JSON.stringify(report, null, 2))
  writeFileSync(
    path.join(reportsDir, 'engine-v02-results.csv'),
    toCsv([
      ['caseId', 'group', 'passed', 'outcome', 'perception', 'objective', 'action', 'findings'],
      ...report.caseResults.map((item) => [
        item.caseId,
        item.group,
        item.passed,
        item.outcome,
        item.actual.perception,
        item.actual.objective,
        item.actual.action,
        item.findings.join(' | '),
      ]),
    ]),
  )
  writeFileSync(
    path.join(reportsDir, 'engine-v02-report.md'),
    [
      '# SERA vNext Engine Validation v02',
      '',
      `Generated at: ${report.generatedAt}`,
      `Final decision: ${report.finalDecision}`,
      `Manifest hash: ${report.manifestHash}`,
      '',
      '## Metrics',
      ...Object.entries(report.metrics).map(([key, value]) => `- ${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`),
      '',
      '## Limitations',
      ...report.limitations.map((item) => `- ${item}`),
      '',
      '## Failures',
      ...(
        report.caseResults.filter((item) => !item.passed).length
          ? report.caseResults.filter((item) => !item.passed).map((item) => `- ${item.caseId}: ${item.findings.join(' | ')}`)
          : ['- none']
      ),
      '',
    ].join('\n'),
  )

  if (report.finalDecision === 'SERA_VNEXT_ENGINE_V02_NOT_READY') {
    throw new Error(`engine v02 validation failed: ${report.caseResults.filter((item) => !item.passed).length} failing cases`)
  }

  return report
}

if (require.main === module) {
  runEngineValidationV02()
    .then((report) => {
      console.log(JSON.stringify({
        finalDecision: report.finalDecision,
        metrics: report.metrics,
        cases: report.caseResults.length,
      }, null, 2))
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
