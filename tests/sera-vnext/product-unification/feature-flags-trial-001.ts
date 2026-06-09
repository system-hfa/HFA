// feature-flags-trial-001.ts
// Verifica que as novas feature flags existem e têm comportamento correto.

import {
  isSeraVNextCanonicalAnalyzeEnabled,
  isSeraVNextCanonicalAnalyzeUiEnabled,
  isSeraVNextReadOnlyEnabled,
  isSeraVNextCandidateOnlyEnabled,
  isSeraVNextCandidateUiEnabled,
} from '../../../frontend/src/lib/sera-vnext-runtime/feature-flags'

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

console.log('\n=== feature-flags-trial-001 ===\n')

// Salvar e limpar env
const orig = {
  SERA_VNEXT_CANONICAL_ANALYZE_ENABLED: process.env.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED,
  NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED: process.env.NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED,
}

console.log('1. Default (sem env var) → false')
delete process.env.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED
delete process.env.NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED

assert(!isSeraVNextCanonicalAnalyzeEnabled(), 'CANONICAL_ANALYZE_ENABLED default = false')
assert(!isSeraVNextCanonicalAnalyzeUiEnabled(), 'CANONICAL_ANALYZE_UI_ENABLED default = false')

console.log('\n2. Valor "false" explícito → false')
process.env.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED = 'false'
assert(!isSeraVNextCanonicalAnalyzeEnabled(), 'CANONICAL_ANALYZE_ENABLED="false" = false')

console.log('\n3. Valor "true" → true')
process.env.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED = 'true'
assert(isSeraVNextCanonicalAnalyzeEnabled(), 'CANONICAL_ANALYZE_ENABLED="true" = true')

process.env.NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED = 'true'
assert(isSeraVNextCanonicalAnalyzeUiEnabled(), 'CANONICAL_ANALYZE_UI_ENABLED="true" = true')

console.log('\n4. Flags legadas intactas')
delete process.env.SERA_VNEXT_READONLY_ENABLED
delete process.env.SERA_VNEXT_CANDIDATE_ONLY_ENABLED
delete process.env.NEXT_PUBLIC_SERA_VNEXT_CANDIDATE_UI_ENABLED

assert(!isSeraVNextReadOnlyEnabled(), 'READONLY_ENABLED default = false')
assert(!isSeraVNextCandidateOnlyEnabled(), 'CANDIDATE_ONLY default = false')
assert(!isSeraVNextCandidateUiEnabled(), 'CANDIDATE_UI default = false')

console.log('\n5. Rollback semântico: flag off = legacy preservado')
process.env.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED = 'false'
assert(!isSeraVNextCanonicalAnalyzeEnabled(), 'CANONICAL_ANALYZE_ENABLED=false garante legacy')

// Restaurar
if (orig.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED !== undefined) {
  process.env.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED = orig.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED
} else {
  delete process.env.SERA_VNEXT_CANONICAL_ANALYZE_ENABLED
}
if (orig.NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED !== undefined) {
  process.env.NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED = orig.NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED
} else {
  delete process.env.NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED
}

console.log(`\n=== Resultado: ${passed} PASS, ${failed} FAIL ===\n`)
if (failed > 0) process.exit(1)
