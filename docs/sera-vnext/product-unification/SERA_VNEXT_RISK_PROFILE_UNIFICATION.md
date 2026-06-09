# SERA vNext — Unificação do Perfil de Risco

**Data**: 2026-06-08

---

## Endpoint Canônico

```
GET /api/risk-profile
```

Com audit log completo, requestId, e retorno de proveniência nas fontes.

---

## Endpoint Deprecated

```
GET /api/org/intelligence
```

Mantido por compatibilidade retroativa. Retorna header `x-deprecated-use: /api/risk-profile`. **Não tem audit log próprio.** Consumidores devem migrar para `/api/risk-profile`.

O dashboard atual (`/dashboard`) ainda consome `/api/org/intelligence`. Migração para `/api/risk-profile` é um próximo passo recomendado.

---

## Fontes Agregadas

### Legacy Events (`events` + `analyses`)

- Fonte: tabela `events` com join em `analyses`.
- `source = 'legacy_event'`
- `sourceFlow = 'LEGACY_SERA'`
- `engineVersion = null`, `engineRuntimeVersion = null`, `methodologyVersion = null`
- Status normalizado: received → processing → completed → error → archived.
- ERC calculado a partir de P/O/A codes.

### vNext Analyses (`sera_vnext_analyses`)

- Fonte: tabela `sera_vnext_analyses`.
- `source = 'sera_vnext_analysis'`
- `sourceFlow = source_flow ?? 'VNEXT_PRODUCT_BETA'`
- `engineVersion = engine_version`, `engineRuntimeVersion = engine_runtime_version`
- Somente análises com ao menos um código P/O/A ou precondição entram no Perfil.
- Análises sem códigos: contadas como incompatíveis e listadas em `limitations`.

---

## Anti-padrões Prevenidos

| Risco | Prevenção |
|---|---|
| Dupla contagem legacy + vNext | IDs distintos por tabela; `source` diferencia |
| Mistura silenciosa de metodologias | `MIXED_VERSION_LIMITATION` adicionado às limitações quando ambas coexistem |
| Análise sem código contando como válida | `isCompatibleVNextRow` filtra incompatíveis |
| Draft/error como análise completa | `normalizeVNextStatus` — apenas `HUMAN_REVIEW_COMPLETED_NON_FINAL` = completed |
| Evento e análise correspondente em duplo | Eventos legacy e análises vNext são fontes separadas por design de esquema |

---

## Exclusões

- Exclusões são lógicas (soft delete via `restored_at is null`).
- `risk_profile_exclusions` rastreia por `(source_type, source_id)`.
- Fontes excluídas aparecem em `source_events_excluded`.
- Restore: `restored_at = now()` — a fonte volta ao cálculo no próximo request.
- Concorrência: operações são idempotentes por design (exclusão já existente → 409 ou ignorada).

---

## Proveniência nas Respostas

Cada `RiskProfileSourceEvent` agora inclui:
- `sourceFlow`: origem do registro
- `engineVersion`: versão do contrato DB
- `engineRuntimeVersion`: versão do runtime (null para legacy e registros pré-proveniência)
- `methodologyVersion`: metodologia aplicada
- `canonicalTreeVersion`: versão da árvore canônica
