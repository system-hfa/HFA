import assert from 'node:assert/strict'
import { runSeraVNextEngineV0 } from '../../frontend/src/lib/sera-vnext/engine-v0/run-engine'

const result = runSeraVNextEngineV0({
  inputId: 'ENGINE-V0-PRECONDITIONS-001',
  narrative:
    'During compressor wash support, the pilot decided to start the crank from the cockpit while maintenance activity was being coordinated outside the aircraft. During execution, the pilot moved the lever out of STOP, creating brief ignition and limited rotor movement without a stabilized start and without damage.',
  locale: 'en',
  sourceType: 'human_applied_reference',
  requestId: 'ENGINE-V0-PRECONDITIONS-001',
  mode: 'VALIDATION',
  options: { allowLlm: false, requireHumanReview: true },
})

assert.ok(result.preconditions.length >= 1)
for (const item of result.preconditions) {
  assert.equal(item.explicitlyNotEscapePoint, true)
  assert.equal(item.basedOnCandidateCode, false)
  assert.equal(item.nonFinal, true)
  assert.ok(item.evidence.length >= 1)
  assert.ok(item.sourceRuleIds.length >= 1)
}
console.log('ENGINE_V0_PRECONDITIONS_OK')
