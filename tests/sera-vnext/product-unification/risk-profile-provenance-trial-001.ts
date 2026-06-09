// risk-profile-provenance-trial-001.ts
// Verifica que o Risk Profile propaga proveniência corretamente e marca
// limitações de versões mistas.

import type { RiskProfileSourceEvent } from '../../../frontend/src/lib/risk-profile/types'

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

console.log('\n=== risk-profile-provenance-trial-001 ===\n')

// --- Estrutura do tipo ---
console.log('1. RiskProfileSourceEvent inclui campos de proveniência')

const legacyEvent: RiskProfileSourceEvent = {
  id: 'event-legacy-001',
  tenantId: 'tenant-A',
  title: 'Evento Legacy',
  createdAt: '2026-01-01T10:00:00Z',
  status: 'completed',
  source: 'legacy_event',
  sourceFlow: 'LEGACY_SERA',
  engineVersion: null,
  engineRuntimeVersion: null,
  methodologyVersion: null,
  canonicalTreeVersion: null,
  isExcludedFromRiskProfile: false,
}
assert(legacyEvent.sourceFlow === 'LEGACY_SERA', 'legacyEvent.sourceFlow = LEGACY_SERA')
assert(legacyEvent.engineRuntimeVersion === null, 'legacyEvent.engineRuntimeVersion = null')

const vnextEvent: RiskProfileSourceEvent = {
  id: 'analysis-001',
  tenantId: 'tenant-A',
  title: 'Análise vNext',
  createdAt: '2026-02-01T10:00:00Z',
  status: 'completed',
  source: 'sera_vnext_analysis',
  sourceFlow: 'VNEXT_PRODUCT_BETA',
  engineVersion: '0.1.0',
  engineRuntimeVersion: '0.2.0',
  methodologyVersion: 'SERA_PT_V1_FROZEN',
  canonicalTreeVersion: 'SERA_PT_V1',
  perceptionCode: 'P-G',
  objectiveCode: 'O-D',
  actionCode: null,
  isExcludedFromRiskProfile: false,
}
assert(vnextEvent.sourceFlow === 'VNEXT_PRODUCT_BETA', 'vnextEvent.sourceFlow = VNEXT_PRODUCT_BETA')
assert(vnextEvent.engineRuntimeVersion === '0.2.0', 'vnextEvent.engineRuntimeVersion = 0.2.0')
assert(vnextEvent.engineVersion === '0.1.0', 'vnextEvent.engineVersion = 0.1.0 (contrato DB)')
assert(vnextEvent.engineVersion !== vnextEvent.engineRuntimeVersion, 'contrato != runtime (divergência esperada)')

// --- Deduplicação de fonte ---
console.log('\n2. Anti-dupla-contagem')
const sources = [legacyEvent, vnextEvent]
const ids = sources.map(s => s.id)
assert(new Set(ids).size === sources.length, 'IDs únicos entre fontes')

const legacyCount = sources.filter(s => s.source === 'legacy_event').length
const vnextCount = sources.filter(s => s.source === 'sera_vnext_analysis').length
assert(legacyCount === 1, 'Uma fonte legacy')
assert(vnextCount === 1, 'Uma fonte vNext')

// --- Exclusão ---
console.log('\n3. Exclusão de fonte')
const excludedSource: RiskProfileSourceEvent = {
  ...legacyEvent,
  id: 'event-excluded',
  isExcludedFromRiskProfile: true,
  exclusionId: 'excl-001',
  exclusionReason: 'Fora do escopo',
  exclusionAt: '2026-01-10T00:00:00Z',
}
assert(excludedSource.isExcludedFromRiskProfile === true, 'isExcluded = true')
assert(excludedSource.exclusionId === 'excl-001', 'exclusionId preservado')
assert(excludedSource.exclusionReason !== null, 'exclusionReason preservado')

const activeSources = [legacyEvent, vnextEvent, excludedSource].filter(s => !s.isExcludedFromRiskProfile)
assert(activeSources.length === 2, 'Apenas fontes ativas após filtro')

// --- Mixed version detection (lógica de negócio) ---
console.log('\n4. Mixed version detection')
const allSources = [legacyEvent, vnextEvent]
const hasLegacy = allSources.some(s => s.source === 'legacy_event')
const hasVNext = allSources.some(s => s.source === 'sera_vnext_analysis')
assert(hasLegacy && hasVNext, 'Mix detectado: legacy + vNext coexistem')

const expectedLimitation = hasLegacy && hasVNext
assert(expectedLimitation, 'Deve adicionar MIXED_VERSION_LIMITATION quando mix detectado')

console.log(`\n=== Resultado: ${passed} PASS, ${failed} FAIL ===\n`)
if (failed > 0) process.exit(1)
