# SERA vNext — Contrato de Migração do Motor Canônico

**Data**: 2026-06-08  
**Decisão**: DEFINITIVA para esta macrofase

---

## Decisão Central

**SERA vNext v02 é o motor causal canônico para novas análises controladas.**

O pipeline SERA legacy é tratado como `LEGACY_READ_COMPATIBILITY` — não como implementação metodológica atual. Existência continuada somente para:
1. Leitura e visualização de análises históricas.
2. Rollback de emergência via feature flag.
3. Cálculo de métricas no Risk Profile para registros pré-vNext.

---

## Invariantes do Contrato

### Motor canônico
- Novas análises Product Beta usam `runSeraVNextEngineV0` (runtime 0.2.0).
- O engine runtime 0.2.0 embute `engineVersion: '0.2.0'` no `engine_output`.
- O campo `engine_version` (DB) mantém `'0.1.0'` por contrato de esquema.
- A coluna `engine_runtime_version` registra `'0.2.0'` explicitamente.

### Análises existentes
- Análises existentes preservam sua origem (engine_version, engine_output inalterados).
- Não recalcular registros antigos automaticamente.
- Não falsificar versão de registros históricos.
- Não atualizar histórico sem evidência metodológica.

### Leitura legacy
- Leitura legacy continua funcionando via `LEGACY_READ_COMPATIBILITY` adapter.
- O unified adapter (`/lib/sera-analysis-unified`) normaliza ambas as fontes.
- Limitações são propagadas explicitamente para cada registro.

### Mistura de versões
- Não misturar versões de metodologia sem label.
- Risk Profile identifica `MIXED_VERSION_LIMITATION` quando legacy e vNext coexistem.
- Cada agregado é classificado como DIRECT_COUNT, DERIVED_HEURISTIC, ou NOT_AVAILABLE.

### Revisão humana
- Revisão humana continua obrigatória para toda análise vNext.
- Output permanece candidate-only (nonFinal: true).
- Nenhuma classificação final automática é permitida.
- Constraints DB bloqueiam selectedCode, releasedCode, finalConclusion, classifiedOutput, readyPromotion, downstreamAllowed.

### Rollback
- Feature flag `SERA_VNEXT_PRODUCT_BETA_ENABLED=false` → rollback imediato ao estado pre-Beta.
- Feature flag `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=false` (default) → /api/analyze mantém legacy.
- Nenhum estado de produção é afetado por rollback das flags.

---

## Estados Proibidos

| Estado | Motivo |
|---|---|
| `selectedCode != null` | Final output bloqueado por DB constraint |
| `releasedCode != null` | Final output bloqueado por DB constraint |
| `finalConclusion != null` | Final output bloqueado por DB constraint |
| `classifiedOutput = true` | Final output bloqueado por DB constraint |
| `readyPromotion = true` | Final output bloqueado por DB constraint |
| `downstreamAllowed = true` | Final output bloqueado por DB constraint |
| Copy "IA classifica" | Proibido em toda UI |
| Copy "metodologia validada" | Proibido em toda UI |
| "production ready" | Proibido em qualquer declaração |
| Backfill automático de histórico | Proibido sem evidência e autorização |

---

## Próximos Passos Não Executados Nesta Fase

1. Migração da rota `/api/analyze` para vNext (aguarda `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=true` com ambiente controlado).
2. Aplicação da migration em staging/produção (atualmente `MIGRATION_CREATED_NOT_APPLIED`).
3. Integração do motor `analyzeSeraVNext` (engine.ts) — avaliação separada; não é substituto drop-in do engine-v0 por ter contrato de output diferente.
