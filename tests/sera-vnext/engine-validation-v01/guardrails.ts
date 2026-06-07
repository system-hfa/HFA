import assert from 'node:assert/strict'
import type { SeraVNextEngineOutput } from '../../../frontend/src/lib/sera-vnext/engine-contract'

export function assertBlockedFinalOutputs(output: SeraVNextEngineOutput): void {
  assert.equal(output.selectedCode, null)
  assert.equal(output.releasedCode, null)
  assert.equal(output.finalConclusion, null)
  assert.equal(output.classifiedOutput, false)
  assert.equal(output.readyPromotion, false)
  assert.equal(output.downstreamAllowed, false)
}
