# SERA vNext — Legacy Read Adapter

**Data**: 2026-06-08

---

## Módulo

`frontend/src/lib/sera-analysis-unified/index.ts`

---

## Propósito

Normalizar leituras de análises SERA de múltiplas origens (legacy e vNext) em um contrato único sem:
- Falsificar proveniência de registros legacy.
- Dupla contagem de fontes.
- Misturar metodologias sem label.
- Perder limitações de cada fonte.

---

## Tipo Canônico

```typescript
type UnifiedSeraAnalysis = {
  id: string
  tenantId: string
  title: string
  createdAt: string
  occurredAt: string | null

  sourceFlow: UnifiedSeraSourceFlow  // 'LEGACY_SERA' | 'VNEXT_PRODUCT_BETA' | ...
  engineContractVersion: string | null
  engineRuntimeVersion: string | null
  methodologyVersion: string | null
  canonicalTreeVersion: string | null

  status: UnifiedSeraAnalysisStatus
  nonFinal: boolean  // true para todo vNext

  isExcludedFromRiskProfile: boolean
  exclusionId: string | null
  exclusionReason: string | null
  exclusionAt: string | null

  perceptionCode: string | null
  objectiveCode: string | null
  actionCode: string | null
  preconditions: string[]

  limitations: string[]
  warnings: string[]
}
```

---

## Funções de Adaptação

### `fromLegacyRiskProfileSource(source)`
- `sourceFlow = 'LEGACY_SERA'`
- `engineContractVersion = null`
- `engineRuntimeVersion = null`
- `methodologyVersion = null`
- `nonFinal = false`
- `limitations` inclui: "Análise produzida pelo pipeline SERA legado. Proveniência de motor não rastreada."

### `fromVNextRiskProfileSource(source)`
- `sourceFlow` extraído de `source.source_flow` ou default `'VNEXT_BETA'`
- `engineRuntimeVersion` do campo `engine_runtime_version`
- `nonFinal = true` sempre
- Se `engine_runtime_version = null`: adiciona limitação de proveniência não rastreada

---

## Deduplicação

```typescript
deduplicateUnifiedAnalyses(items: UnifiedSeraAnalysis[]): UnifiedSeraAnalysis[]
```

Chave de deduplicação: `${sourceFlow}:${id}`

Garante que o mesmo ID não apareça duplicado entre fontes distintas. O esquema atual não vincula eventos legacy a análises vNext, então a deduplicação é por ID único dentro de cada flow.

---

## Limitações do Adapter

1. Não implementa paginação própria — consume listas completas da fonte.
2. Não realiza enriquecimento de dados — apenas normalização.
3. Não calcula ERC — usa os códigos P/O/A já computados pelas fontes.
4. Registros históricos sem `engine_runtime_version` não recebem backfill automático.
