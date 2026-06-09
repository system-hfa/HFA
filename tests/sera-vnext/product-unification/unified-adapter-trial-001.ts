// unified-adapter-trial-001.ts
// Verifica o unified analysis adapter: tipos corretos, sem dupla contagem,
// limitações propagadas, nonFinal correto por fonte.

import {
  fromLegacyRiskProfileSource,
  fromVNextRiskProfileSource,
  deduplicateUnifiedAnalyses,
  type UnifiedSeraAnalysis,
} from '../../../frontend/src/lib/sera-analysis-unified'

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

console.log('\n=== unified-adapter-trial-001 ===\n')

// --- Legacy source ---
const legacySource = fromLegacyRiskProfileSource({
  id: 'event-001',
  tenantId: 'tenant-A',
  title: 'Evento Legacy 1',
  createdAt: '2026-01-01T10:00:00Z',
  occurredAt: '2025-12-31T08:00:00Z',
  status: 'completed',
  perceptionCode: 'P-B',
  objectiveCode: 'O-A',
  actionCode: 'A-C',
  preconditions: ['P1', 'P3'],
  isExcludedFromRiskProfile: false,
})

console.log('1. Legacy source básico')
assert(legacySource.sourceFlow === 'LEGACY_SERA', 'sourceFlow = LEGACY_SERA')
assert(legacySource.nonFinal === false, 'nonFinal = false para legacy')
assert(legacySource.engineContractVersion === null, 'engineContractVersion = null para legacy')
assert(legacySource.engineRuntimeVersion === null, 'engineRuntimeVersion = null para legacy')
assert(legacySource.methodologyVersion === null, 'methodologyVersion = null para legacy')
assert(legacySource.perceptionCode === 'P-B', 'perceptionCode preservado')
assert(legacySource.preconditions.length === 2, 'preconditions preservadas')
assert(legacySource.limitations.length > 0, 'limitations não vazias para legacy')
assert(legacySource.limitations.some(l => l.includes('legado')), 'limitation indica origem legada')

// --- vNext source com proveniência completa ---
const vnextSource = fromVNextRiskProfileSource({
  id: 'analysis-001',
  tenantId: 'tenant-A',
  title: 'Análise vNext 1',
  createdAt: '2026-02-01T10:00:00Z',
  status: 'HUMAN_REVIEW_COMPLETED_NON_FINAL',
  engineVersion: '0.1.0',
  engineRuntimeVersion: '0.2.0',
  methodologyVersion: 'SERA_PT_V1_FROZEN',
  canonicalTreeVersion: 'SERA_PT_V1',
  sourceFlow: 'VNEXT_PRODUCT_BETA',
  perceptionCode: 'P-G',
  objectiveCode: 'O-D',
  actionCode: 'A-F',
  preconditions: ['KNOWLEDGE_TRAINING', 'TIME_PRESSURE'],
  isExcludedFromRiskProfile: false,
})

console.log('\n2. vNext source com proveniência')
assert(vnextSource.sourceFlow === 'VNEXT_PRODUCT_BETA', 'sourceFlow = VNEXT_PRODUCT_BETA')
assert(vnextSource.nonFinal === true, 'nonFinal = true para vNext')
assert(vnextSource.engineContractVersion === '0.1.0', 'engineContractVersion = 0.1.0')
assert(vnextSource.engineRuntimeVersion === '0.2.0', 'engineRuntimeVersion = 0.2.0')
assert(vnextSource.methodologyVersion === 'SERA_PT_V1_FROZEN', 'methodologyVersion preservada')
assert(vnextSource.canonicalTreeVersion === 'SERA_PT_V1', 'canonicalTreeVersion preservada')
assert(vnextSource.status === 'completed', 'status HUMAN_REVIEW_COMPLETED_NON_FINAL → completed')
assert(!vnextSource.limitations.some(l => l.includes('proveniência')), 'sem limitação de proveniência quando runtime_version presente')

// --- vNext source SEM proveniência (pre-migration row) ---
const vnextLegacyRow = fromVNextRiskProfileSource({
  id: 'analysis-002',
  tenantId: 'tenant-A',
  title: 'Análise vNext Antiga',
  createdAt: '2026-01-15T10:00:00Z',
  status: 'CANDIDATE_ANALYSIS_CREATED',
  engineVersion: '0.1.0',
  engineRuntimeVersion: null,
  sourceFlow: null,
  isExcludedFromRiskProfile: false,
})

console.log('\n3. vNext source sem proveniência (pre-migration)')
assert(vnextLegacyRow.engineRuntimeVersion === null, 'engineRuntimeVersion = null')
assert(vnextLegacyRow.sourceFlow === 'VNEXT_BETA', 'sourceFlow default = VNEXT_BETA quando null')
assert(vnextLegacyRow.limitations.some(l => l.includes('runtime')), 'limitação de runtime não rastreado')
assert(vnextLegacyRow.status === 'draft', 'CANDIDATE_ANALYSIS_CREATED → draft')

// --- Deduplicação ---
console.log('\n4. Deduplicação')
const duplicate: UnifiedSeraAnalysis = { ...legacySource }
const items = [legacySource, vnextSource, duplicate, vnextLegacyRow]
const deduped = deduplicateUnifiedAnalyses(items)
assert(deduped.length === 3, `deduplicação remove duplicata: ${items.length} → ${deduped.length}`)

// --- Excluído ---
console.log('\n5. Fonte excluída')
const excluded = fromLegacyRiskProfileSource({
  id: 'event-002',
  tenantId: 'tenant-A',
  title: 'Evento Excluído',
  createdAt: '2026-01-05T10:00:00Z',
  status: 'completed',
  isExcludedFromRiskProfile: true,
  exclusionId: 'excl-001',
  exclusionReason: 'Evento fora do escopo',
  exclusionAt: '2026-01-10T00:00:00Z',
})
assert(excluded.isExcludedFromRiskProfile === true, 'isExcluded preservado')
assert(excluded.exclusionId === 'excl-001', 'exclusionId preservado')
assert(excluded.exclusionReason === 'Evento fora do escopo', 'exclusionReason preservado')

console.log(`\n=== Resultado: ${passed} PASS, ${failed} FAIL ===\n`)
if (failed > 0) process.exit(1)
