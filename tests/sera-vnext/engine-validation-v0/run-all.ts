import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { allValidationCases, adversarialCases, generalizationCases, humanCases, officialCases } from './cases'
import { runDeterminismSuite } from './determinism'
import { summarizeGeneralization } from './generalization'
import { runProductAlphaParity } from './product-alpha-parity'
import { runValidationCase } from './run-case'
import type {
  EngineValidationCase,
  EngineValidationExpectedCase,
  EngineValidationGroup,
  EngineValidationRunReport,
} from './types'

const rootDir = path.resolve(__dirname, '..', '..', '..')
const expectedPath = path.join(rootDir, 'tests/sera-vnext/engine-validation-v0/expected/engine-v0-expected.json')
const reportsDir = path.join(rootDir, 'tests/sera-vnext/engine-validation-v0/reports')

function loadExpectedCases(): Map<string, EngineValidationExpectedCase> {
  const parsed = JSON.parse(readFileSync(expectedPath, 'utf8')) as EngineValidationExpectedCase[]
  return new Map(parsed.map((item) => [item.caseId, item]))
}

function toCsv(rows: string[][]): string {
  return rows.map((row) => row.map((cell) => JSON.stringify(cell ?? '')).join(',')).join('\n') + '\n'
}

export async function runEngineValidationV0(args?: { groups?: EngineValidationGroup[] }): Promise<EngineValidationRunReport> {
  const allowedGroups = args?.groups ?? ['official', 'human', 'generalization', 'adversarial']
  const expectedByCase = loadExpectedCases()
  const selectedCases = allValidationCases.filter((item) => allowedGroups.includes(item.group))

  const caseResults = selectedCases.map((validationCase) => {
    const expected = expectedByCase.get(validationCase.caseId)
    assert.ok(expected, `missing authored expected case: ${validationCase.caseId}`)
    return runValidationCase({ validationCase, expected })
  })

  const determinismInputs: Array<{ validationCase: EngineValidationCase; runs: number }> = [
    ...officialCases.slice(0, 3).map((validationCase) => ({ validationCase, runs: 5 })),
    ...officialCases.slice(3).map((validationCase) => ({ validationCase, runs: 3 })),
    ...adversarialCases.slice(0, 10).map((validationCase) => ({ validationCase, runs: 3 })),
    ...generalizationCases.slice(0, 5).map((validationCase) => ({ validationCase, runs: 3 })),
  ]
  const determinism = runDeterminismSuite(determinismInputs)
  const productAlphaParity = await runProductAlphaParity()
  const generalizationSummary = summarizeGeneralization(caseResults.filter((item) => item.group === 'generalization'))

  const failCount = caseResults.filter((item) => item.findings.some((finding) => finding.severity === 'fail')).length
  const errorCount = 0
  const partialCount = caseResults.filter((item) => !item.passed && item.findings.every((finding) => finding.severity !== 'fail')).length
  const passCount = caseResults.filter((item) => item.passed).length

  const blockingReasons: string[] = []
  if (failCount > 0) blockingReasons.push(`validation failures=${failCount}`)
  if (partialCount > 0) blockingReasons.push(`partial validations=${partialCount}`)
  if (!productAlphaParity.passed) blockingReasons.push('product alpha parity mismatch')
  if (determinism.some((item) => item.structuralDeterminism < 1 || item.semanticEquivalence < 0.95)) {
    blockingReasons.push('determinism threshold not met')
  }
  if (generalizationSummary.failed > 0) blockingReasons.push(`generalization cases failing=${generalizationSummary.failed}`)

  const report: EngineValidationRunReport = {
    generatedAt: new Date().toISOString(),
    totalCases: caseResults.length,
    groups: {
      official: caseResults.filter((item) => item.group === 'official').length,
      human: caseResults.filter((item) => item.group === 'human').length,
      generalization: caseResults.filter((item) => item.group === 'generalization').length,
      adversarial: caseResults.filter((item) => item.group === 'adversarial').length,
    },
    passCount,
    failCount,
    errorCount,
    partialCount,
    caseResults,
    determinism,
    productAlphaParity,
    finalDecision: blockingReasons.length === 0 ? 'SERA_VNEXT_ENGINE_V0_INTERNALLY_VALIDATED' : 'SERA_VNEXT_ENGINE_V0_VALIDATION_BLOCKED',
    productBetaGate: blockingReasons.length === 0 ? 'PRODUCT_BETA_FOUNDATION_ALLOWED' : 'PRODUCT_BETA_FOUNDATION_BLOCKED',
    blockingReasons,
  }

  mkdirSync(reportsDir, { recursive: true })
  writeFileSync(path.join(reportsDir, 'engine-validation-v0-report.json'), JSON.stringify(report, null, 2))

  const markdown = [
    '# SERA vNext Engine Validation V0',
    '',
    `Generated at: ${report.generatedAt}`,
    '',
    `Final decision: ${report.finalDecision}`,
    `Product Beta gate: ${report.productBetaGate}`,
    '',
    `Cases: ${report.totalCases}`,
    `Pass: ${report.passCount}`,
    `Partial: ${report.partialCount}`,
    `Fail: ${report.failCount}`,
    `Error: ${report.errorCount}`,
    '',
    '## Blocking reasons',
    ...(report.blockingReasons.length ? report.blockingReasons.map((item) => `- ${item}`) : ['- none']),
    '',
    '## Determinism',
    ...report.determinism.map(
      (item) => `- ${item.caseId}: runs=${item.runs} structural=${item.structuralDeterminism} semantic=${item.semanticEquivalence}`,
    ),
    '',
    '## Product Alpha parity',
    `- passed=${report.productAlphaParity.passed}`,
    ...report.productAlphaParity.findings.map((item) => `- ${item}`),
    '',
    '## Case results',
    ...report.caseResults.map(
      (item) =>
        `- ${item.caseId} [${item.group}] passed=${item.passed} findings=${item.findings.map((finding) => `${finding.severity}:${finding.detail}`).join(' | ')}`,
    ),
    '',
  ].join('\n')
  writeFileSync(path.join(reportsDir, 'engine-validation-v0-report.md'), markdown)

  writeFileSync(
    path.join(reportsDir, 'engine-divergences.csv'),
    toCsv([
      ['caseId', 'group', 'severity', 'detail'],
      ...report.caseResults.flatMap((item) =>
        item.findings
          .filter((finding) => finding.severity !== 'pass')
          .map((finding) => [item.caseId, item.group, finding.severity, finding.detail]),
      ),
    ]),
  )

  writeFileSync(
    path.join(reportsDir, 'engine-determinism.csv'),
    toCsv([
      ['caseId', 'runs', 'structuralDeterminism', 'semanticEquivalence', 'identical'],
      ...report.determinism.map((item) => [
        item.caseId,
        String(item.runs),
        String(item.structuralDeterminism),
        String(item.semanticEquivalence),
        String(item.identical),
      ]),
    ]),
  )

  writeFileSync(
    path.join(reportsDir, 'engine-generalization.csv'),
    toCsv([
      ['total', 'passed', 'failed'],
      [String(generalizationSummary.total), String(generalizationSummary.passed), String(generalizationSummary.failed)],
    ]),
  )

  return report
}

if (require.main === module) {
  runEngineValidationV0()
    .then((report) => {
      console.log(JSON.stringify({ finalDecision: report.finalDecision, productBetaGate: report.productBetaGate }, null, 2))
    })
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
}
