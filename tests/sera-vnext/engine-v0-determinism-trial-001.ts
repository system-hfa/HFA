import assert from 'node:assert/strict'
import { runEngineValidationV0 } from './engine-validation-v0/run-all'

async function main() {
  const report = await runEngineValidationV0()
  assert.ok(report.determinism.every((item) => item.structuralDeterminism === 1))
  assert.ok(report.determinism.every((item) => item.semanticEquivalence >= 0.95))
  console.log('ENGINE_V0_DETERMINISM_OK')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
