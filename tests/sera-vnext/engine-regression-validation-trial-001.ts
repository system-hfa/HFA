import assert from 'node:assert/strict'
import { runEngineValidationV0 } from './engine-validation-v0/run-all'

async function main() {
  const report = await runEngineValidationV0({ groups: ['official', 'human'] })
  assert.equal(report.failCount, 0)
  console.log('SERA_VNEXT_ENGINE_REGRESSION_VALIDATION_OK')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
