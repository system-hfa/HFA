import assert from 'node:assert/strict'
import { runEngineValidationV0 } from './engine-validation-v0/run-all'

async function main() {
  const report = await runEngineValidationV0({ groups: ['official', 'human'] })
  assert.equal(report.failCount, 0)
  assert.equal(report.errorCount, 0)
  console.log('ENGINE_V0_REGRESSION_OK')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
