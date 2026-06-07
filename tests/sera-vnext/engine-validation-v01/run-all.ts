import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { runSeraVNextEngineV0 } from '../../../frontend/src/lib/sera-vnext/engine-v0/run-engine'
import { allValidationCases } from './cases'
import { runDeterminismSuite } from './determinism'
import { runProductAlphaParity } from './product-alpha-parity'
import { runValidationCase } from './run-case'
import type {
  EngineValidationCase,
  EngineValidationExpectedCase,
  EngineValidationGroup,
  EngineValidationRunReport,
} from './types'

const rootDir = path.resolve(__dirname, '..', '..', '..')
const expectedPath = path.join(rootDir, 'tests/sera-vnext/engine-validation-v01/expected/engine-v01-expected.json')
const reportsDir = path.join(rootDir, 'tests/sera-vnext/engine-validation-v01/reports')

function loadExpectedCases(): Map<string, EngineValidationExpectedCase> {
  const parsed = JSON.parse(readFileSync(expectedPath, 'utf8')) as EngineValidationExpectedCase[]
  return new Map(parsed.map((item) => [item.caseId, item]))
}

function toCsv(rows: Array<Array<string | number | boolean | null | undefined>>): string {
  return rows.map((row) => row.map((cell) => JSON.stringify(cell ?? '')).join(',')).join('\n') + '\n'
}

function runForSourceDepth(validationCase: EngineValidationCase) {
  return runSeraVNextEngineV0({
    inputId: validationCase.caseId,
    narrative: validationCase.narrative,
    locale: 'en',
    sourceType: validationCase.sourceType,
    requestId: validationCase.caseId,
    mode: 'VALIDATION',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: false,
    },
  })
}

export async function runEngineValidationV01(args?: { groups?: EngineValidationGroup[] }): Promise<EngineValidationRunReport> {
  const allowedGroups = args?.groups ?? ['official', 'human', 'generalization', 'adversarial']
  const expectedByCase = loadExpectedCases()
  const selectedCases = allValidationCases.filter((item) => allowedGroups.includes(item.group))

  const caseResults = selectedCases.map((validationCase) => {
    const expected = expectedByCase.get(validationCase.caseId)
    assert.ok(expected, `missing v0.1 expected case: ${validationCase.caseId}`)
    return runValidationCase({ validationCase, expected })
  })

  const determinismInputs: Array<{ validationCase: EngineValidationCase; runs: number }> = selectedCases.map((validationCase) => ({
    validationCase,
    runs: validationCase.group === 'official' || validationCase.group === 'human' ? 5 : 3,
  }))
  const determinism = runDeterminismSuite(determinismInputs)
  const productAlphaParity = await runProductAlphaParity()

  const sourceDepth = selectedCases.map((validationCase) => {
    const expected = expectedByCase.get(validationCase.caseId)
    assert.ok(expected, `missing v0.1 expected case: ${validationCase.caseId}`)
    const output = runForSourceDepth(validationCase)
    return {
      caseId: validationCase.caseId,
      evidenceItems: output.factualExtraction.evidence.length,
      postEscapeItems: output.factualExtraction.evidence.filter((item) => item.temporalRelation === 'POST_ESCAPE').length,
      canonicalAnswers: output.canonicalTraversal.paths.reduce((sum, path) => sum + path.answers.length, 0),
      sourceDepth: expected.sourceDepth,
    }
  })

  const failCount = caseResults.filter((item) => item.findings.some((finding) => finding.severity === 'fail')).length
  const errorCount = caseResults.filter((item) => item.findings.some((finding) => finding.severity === 'error')).length
  const criticalCount = caseResults.filter((item) => item.criticalFindings > 0).length
  const noncriticalCount = caseResults.filter((item) => item.criticalFindings === 0 && item.noncriticalFindings > 0).length
  const passCount = caseResults.filter((item) => item.criticalFindings === 0 && item.noncriticalFindings === 0).length

  const blockingReasons: string[] = []
  if (failCount > 0) blockingReasons.push(`validation failures=${failCount}`)
  if (errorCount > 0) blockingReasons.push(`validation errors=${errorCount}`)
  if (criticalCount > 0) blockingReasons.push(`critical methodological findings=${criticalCount}`)
  if (!productAlphaParity.passed) blockingReasons.push('product alpha parity mismatch')
  if (determinism.some((item) => item.structuralDeterminism < 1 || item.semanticEquivalence < 1)) {
    blockingReasons.push('determinism threshold not met')
  }

  const noncriticalLimitations = caseResults.flatMap((item) =>
    item.findings
      .filter((finding) => finding.severity === 'noncritical')
      .map((finding) => `${item.caseId}:${finding.field}:${finding.detail}`),
  )

  const finalDecision = blockingReasons.length > 0
    ? 'SERA_VNEXT_ENGINE_V01_VALIDATION_BLOCKED'
    : noncriticalLimitations.length > 0
      ? 'SERA_VNEXT_ENGINE_V01_VALIDATED_WITH_NONCRITICAL_LIMITATIONS'
      : 'SERA_VNEXT_ENGINE_V01_VALIDATED'

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
    noncriticalCount,
    criticalCount,
    failCount,
    errorCount,
    caseResults,
    determinism,
    productAlphaParity,
    sourceDepth,
    finalDecision,
    productBetaGate: blockingReasons.length === 0 ? 'PRODUCT_BETA_FOUNDATION_ALLOWED' : 'PRODUCT_BETA_FOUNDATION_BLOCKED',
    blockingReasons,
    noncriticalLimitations,
  }

  mkdirSync(reportsDir, { recursive: true })
  writeFileSync(path.join(reportsDir, 'engine-v01-report.json'), JSON.stringify(report, null, 2))

  const markdown = [
    '# SERA vNext Engine Validation v0.1',
    '',
    `Generated at: ${report.generatedAt}`,
    '',
    `Final decision: ${report.finalDecision}`,
    `Product Beta gate: ${report.productBetaGate}`,
    '',
    `Cases: ${report.totalCases}`,
    `Pass: ${report.passCount}`,
    `Noncritical: ${report.noncriticalCount}`,
    `Critical: ${report.criticalCount}`,
    `Fail: ${report.failCount}`,
    `Error: ${report.errorCount}`,
    '',
    '## Blocking reasons',
    ...(report.blockingReasons.length ? report.blockingReasons.map((item) => `- ${item}`) : ['- none']),
    '',
    '## Noncritical limitations',
    ...(report.noncriticalLimitations.length ? report.noncriticalLimitations.map((item) => `- ${item}`) : ['- none']),
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
        `- ${item.caseId} [${item.group}] passed=${item.passed} critical=${item.criticalFindings} noncritical=${item.noncriticalFindings} findings=${item.findings.map((finding) => `${finding.severity}:${finding.field}:${finding.detail}`).join(' | ')}`,
    ),
    '',
  ].join('\n')
  writeFileSync(path.join(reportsDir, 'engine-v01-report.md'), markdown)

  writeFileSync(
    path.join(reportsDir, 'engine-v01-divergences.csv'),
    toCsv([
      ['caseId', 'group', 'severity', 'field', 'detail'],
      ...report.caseResults.flatMap((item) =>
        item.findings
          .filter((finding) => finding.severity !== 'pass')
          .map((finding) => [item.caseId, item.group, finding.severity, finding.field, finding.detail]),
      ),
    ]),
  )

  writeFileSync(
    path.join(reportsDir, 'engine-v01-critical-findings.csv'),
    toCsv([
      ['caseId', 'group', 'severity', 'field', 'detail'],
      ...report.caseResults.flatMap((item) =>
        item.findings
          .filter((finding) => ['critical', 'fail', 'error'].includes(finding.severity))
          .map((finding) => [item.caseId, item.group, finding.severity, finding.field, finding.detail]),
      ),
    ]),
  )

  writeFileSync(
    path.join(reportsDir, 'engine-v01-determinism.csv'),
    toCsv([
      ['caseId', 'runs', 'structuralDeterminism', 'semanticEquivalence', 'identical'],
      ...report.determinism.map((item) => [
        item.caseId,
        item.runs,
        item.structuralDeterminism,
        item.semanticEquivalence,
        item.identical,
      ]),
    ]),
  )

  writeFileSync(
    path.join(reportsDir, 'engine-v01-source-depth.csv'),
    toCsv([
      ['caseId', 'evidenceItems', 'postEscapeItems', 'canonicalAnswers', 'evidenceSource', 'canonicalTreeRequired', 'reportConclusionQuarantined', 'llmAllowed'],
      ...report.sourceDepth.map((item) => [
        item.caseId,
        item.evidenceItems,
        item.postEscapeItems,
        item.canonicalAnswers,
        item.sourceDepth.evidenceSource,
        item.sourceDepth.canonicalTreeRequired,
        item.sourceDepth.reportConclusionQuarantined,
        item.sourceDepth.llmAllowed,
      ]),
    ]),
  )

  return report
}

if (require.main === module) {
  runEngineValidationV01()
    .then((report) => {
      console.log(JSON.stringify({
        finalDecision: report.finalDecision,
        productBetaGate: report.productBetaGate,
        pass: report.passCount,
        noncritical: report.noncriticalCount,
        critical: report.criticalCount,
        fail: report.failCount,
        error: report.errorCount,
      }, null, 2))
      if (report.productBetaGate !== 'PRODUCT_BETA_FOUNDATION_ALLOWED') process.exitCode = 1
    })
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
}
