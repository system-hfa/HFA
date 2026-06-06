import assert from 'node:assert/strict'
import { runEngineValidationV0 } from './engine-validation-v0/run-all'

async function main() {
  const report = await runEngineValidationV0()
  assert.equal(report.productAlphaParity.passed, true)
  console.log('ENGINE_V0_PRODUCT_ALPHA_PARITY_OK')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
