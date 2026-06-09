// final-output-lock-trial-001.ts
// Verifica que final outputs estão bloqueados em todos os pontos de entrada
// e que nenhum código proibido está ativo (selectedCode, releasedCode, etc.)

import * as fs from 'fs'
import * as path from 'path'

let passed = 0
let failed = 0

function assert(condition: boolean, label: string) {
  if (condition) {
    console.log(`  PASS: ${label}`)
    passed++
  } else {
    console.error(`  FAIL: ${label}`)
    failed++
  }
}

function readFile(relPath: string): string {
  return fs.readFileSync(path.resolve(__dirname, '../../../', relPath), 'utf-8')
}

console.log('\n=== final-output-lock-trial-001 ===\n')

// --- create-analysis.ts: assertNonFinalOutput presente ---
console.log('1. assertNonFinalOutput em create-analysis')
const createAnalysis = readFile('frontend/src/lib/sera-vnext-product/persistence/create-analysis.ts')
assert(createAnalysis.includes('assertNonFinalOutput(engineOutput)'), 'assertNonFinalOutput é chamado')
assert(createAnalysis.includes('SERA_VNEXT_PRODUCT_BETA_FINAL_OUTPUT_LOCK_VIOLATED'), 'Erro de lock está definido')

// --- run-engine.ts: final fields são null/false ---
console.log('\n2. engine-v0 final output lock')
const runEngine = readFile('frontend/src/lib/sera-vnext/engine-v0/run-engine.ts')
assert(runEngine.includes('selectedCode: null'), 'selectedCode = null')
assert(runEngine.includes('releasedCode: null'), 'releasedCode = null')
assert(runEngine.includes('finalConclusion: null'), 'finalConclusion = null')
assert(runEngine.includes('classifiedOutput: false'), 'classifiedOutput = false')
assert(runEngine.includes('readyPromotion: false'), 'readyPromotion = false')
assert(runEngine.includes('downstreamAllowed: false'), 'downstreamAllowed = false')
assert(runEngine.includes('humanReviewRequired: true'), 'humanReviewRequired = true')

// --- Migration: constraint não-final ---
console.log('\n3. Migration DB constraint final output lock')
const migration = readFile('supabase/migrations/20260607135727_sera_vnext_product_beta.sql')
assert(migration.includes('sera_vnext_analyses_non_final_output_lock'), 'Constraint non_final_output_lock presente')
assert(migration.includes("selectedCode"), 'Bloca selectedCode')
assert(migration.includes("releasedCode"), 'Bloca releasedCode')
assert(migration.includes("finalConclusion"), 'Bloca finalConclusion')
assert(migration.includes("classifiedOutput"), 'Bloca classifiedOutput')
assert(migration.includes("readyPromotion"), 'Bloca readyPromotion')
assert(migration.includes("downstreamAllowed"), 'Bloca downstreamAllowed')

// --- Constraint status lock ---
console.log('\n4. Constraint status não-final')
assert(migration.includes('sera_vnext_analyses_no_final_status'), 'Constraint no_final_status presente')
assert(migration.includes("FINAL"), 'Bloca status com FINAL')
assert(migration.includes("CLASSIFIED"), 'Bloca status com CLASSIFIED')
assert(migration.includes("READY"), 'Bloca status com READY')
assert(migration.includes("RELEASED"), 'Bloca status com RELEASED')

// --- Scanner: nenhum selectedCode ativo no código de produto ---
console.log('\n5. Scan: selectedCode não ativo em código de produto')
const versioningFile = readFile('frontend/src/lib/sera-vnext-product/versioning.ts')
assert(!versioningFile.includes('selectedCode: '), 'versioning.ts: sem selectedCode ativo')

const apiHandlers = readFile('frontend/src/lib/sera-vnext-product/api-handlers.ts')
assert(!apiHandlers.includes('selectedCode'), 'api-handlers.ts: sem selectedCode referenciado')

console.log(`\n=== Resultado: ${passed} PASS, ${failed} FAIL ===\n`)
if (failed > 0) process.exit(1)
