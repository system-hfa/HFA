import assert from 'node:assert/strict'
import { runSeraVNextEngineV0 } from '../../../../frontend/src/lib/sera-vnext/engine-v0/run-engine'
import { leafReachabilityNegativeCases, leafReachabilityPositiveCases } from '../../engine-validation-v02/cases'

function axisCode(output: ReturnType<typeof runSeraVNextEngineV0>, axis: 'perception' | 'objective' | 'action'): string | null {
  return output.axes[axis].proposedCode
}

export function runLeafReachabilityV02(): void {
  for (const testCase of leafReachabilityPositiveCases) {
    assert.equal(testCase.expected.kind, 'code')
    const output = runSeraVNextEngineV0({
      inputId: testCase.caseId,
      narrative: testCase.narrative,
      locale: testCase.locale,
      sourceType: testCase.sourceType,
      requestId: testCase.caseId,
      mode: 'VALIDATION',
      options: {
        allowLlm: false,
        requireHumanReview: true,
      },
    })
    assert.equal(axisCode(output, testCase.expected.axis), testCase.expected.code, testCase.caseId)
  }

  for (const testCase of leafReachabilityNegativeCases) {
    assert.equal(testCase.expected.kind, 'notCode')
    const output = runSeraVNextEngineV0({
      inputId: testCase.caseId,
      narrative: testCase.narrative,
      locale: testCase.locale,
      sourceType: testCase.sourceType,
      requestId: testCase.caseId,
      mode: 'VALIDATION',
      options: {
        allowLlm: false,
        requireHumanReview: true,
      },
    })
    assert.notEqual(axisCode(output, testCase.expected.axis), testCase.expected.code, testCase.caseId)
  }
}

if (require.main === module) {
  runLeafReachabilityV02()
  console.log(`SERA vNext engine v02 leaf reachability OK: positive=${leafReachabilityPositiveCases.length}, negative=${leafReachabilityNegativeCases.length}`)
}
