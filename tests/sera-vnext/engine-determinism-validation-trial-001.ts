import assert from 'node:assert/strict'
import { runEngineValidationV0 } from './engine-validation-v0/run-all'

async function main() {
  const report = await runEngineValidationV0()
  assert.ok(report.determinism.every((item) => item.structuralDeterminism === 1))
  console.log('SERA_VNEXT_ENGINE_DETERMINISM_VALIDATION_OK')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
