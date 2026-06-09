# SERA vNext — Product Executable Flow Inventory

**Data**: 2026-06-08  
**Status metodológico**: SERA_VNEXT_ENGINE_V02_PASS_WITH_LIMITATIONS  
**Gerado em**: macrofase product-data-frontend-unification

---

## 1. Fluxo Legacy — Usuário Comum

| Campo | Valor |
|---|---|
| Rota UI | `/events/new`, `/events/[id]` |
| Endpoint | `POST /api/analyze` |
| Motor | `completeSeraAnalysisAfterEventCreated` → pipeline SERA legacy |
| Versão executável | N/A (pipeline HFACS legacy) |
| Versão persistida | `motor_version` no `analyses` (campo legado) |
| Tabela | `events`, `analyses` |
| Status | LEGACY_READ_COMPATIBILITY |
| Tenant guard | `eq('tenant_id', user.tenantId)` |
| Feature flag | Nenhuma (default ativo) |
| Consumidores downstream | Dashboard, Risk Profile, Eventos |

**Observação**: `/api/analyze` usa `completeSeraAnalysisAfterEventCreated`. O motor vNext **não** é chamado nesta rota. A flag `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` está definida mas com valor `false` por padrão. Enquanto desativada, comportamento legacy é preservado integralmente.

---

## 2. Fluxo Product Beta — Admin

| Campo | Valor |
|---|---|
| Rota UI | `/admin/sera-vnext/analyses/new`, `/admin/sera-vnext/analyses/[id]` |
| Endpoint | `POST /api/admin/sera-vnext/analyses` |
| Motor | `runSeraVNextEngineV0` (engine-v0/run-engine.ts) |
| Versão executável | `0.2.0` (do ENGINE_VERSION.ts, embutida em engine_output.engineVersion) |
| Versão persistida (row) | `engine_version = 0.1.0` (contrato DB, locked por constraint) |
| Versão runtime (nova coluna) | `engine_runtime_version = 0.2.0` (após migration proveniência) |
| Source flow (nova coluna) | `source_flow = VNEXT_PRODUCT_BETA` |
| Canonical tree (nova coluna) | `canonical_tree_version = SERA_PT_V1` |
| Tabela | `sera_vnext_analyses` |
| Status | CANDIDATE_ANALYSIS_CREATED (não-final) |
| Tenant guard | RLS: `sera_vnext_beta_can_use(tenant_id)` exige role=admin |
| Feature flag | `SERA_VNEXT_PRODUCT_BETA_ENABLED=true` |
| Consumidores downstream | Risk Profile (via `sera_vnext_analyses` query), Admin UI |

---

## 3. Product Beta — Listagem e Detalhe

| Endpoint | Método | Handler |
|---|---|---|
| `/api/admin/sera-vnext/analyses` | GET | `handleListSeraVNextAnalysesRequest` |
| `/api/admin/sera-vnext/analyses/[id]` | GET | `handleGetSeraVNextAnalysisRequest` |
| `/api/admin/sera-vnext/analyses/[id]/reviews` | POST | `handleCreateSeraVNextReviewRequest` |
| `/api/admin/sera-vnext/analyses/[id]/reanalyze` | POST | `handleReanalyzeSeraVNextAnalysisRequest` |
| `/api/admin/sera-vnext/analyses/[id]/archive` | POST | `handleArchiveSeraVNextAnalysisRequest` |
| `/api/admin/sera-vnext/analyses/[id]/restore` | POST | `handleRestoreSeraVNextAnalysisRequest` |
| `/api/admin/sera-vnext/analyses/[id]/export` | GET | `handleExportSeraVNextAnalysisRequest` |

---

## 4. Perfil de Risco

| Endpoint | Motor | Fonte |
|---|---|---|
| `GET /api/risk-profile` | `getRiskProfileSummaryForTenant` | Legacy events + vNext analyses |
| `GET /api/org/intelligence` | Mesmo handler (deprecated) | Delega ao mesmo serviço |
| `POST /api/risk-profile/exclusions` | Insert + audit | `risk_profile_exclusions` |
| `DELETE /api/risk-profile/exclusions/[id]` | Restore lógico | `risk_profile_exclusions.restored_at` |

O `/api/org/intelligence` é **deprecated** — mantido por compatibilidade. Retorna `x-deprecated-use: /api/risk-profile` no header. Consumidores devem migrar para `/api/risk-profile`.

---

## 5. Dashboard

| Rota UI | Fonte de dados |
|---|---|
| `/dashboard` | `GET /api/org/intelligence` (dashboard atual chama este endpoint) |
| `/risk-profile` | `GET /api/risk-profile` |

**Finding**: Dashboard usa `/api/org/intelligence`. Ideal migrar para `/api/risk-profile` para alinhar auditoria.

---

## 6. Eventos

| Rota UI | Endpoint | Tabela |
|---|---|---|
| `/events` | Supabase client direto | `events` |
| `/events/[id]` | Supabase client direto | `events`, `analyses` |
| `/events/new` | `POST /api/analyze` | `events`, `analyses` |

---

## 7. Feature Flags — Estado Atual

| Flag | Default | Efeito |
|---|---|---|
| `SERA_VNEXT_PRODUCT_BETA_ENABLED` | false | Habilita rotas admin |
| `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED` | false | Mostra UI admin |
| `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` | false | **Novo**: roteia /api/analyze para vNext (não implementado nesta fase) |
| `NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED` | false | **Novo**: UI indicator |
| `SERA_VNEXT_READONLY_ENABLED` | false | Modo somente leitura |
| `SERA_VNEXT_INTERNAL_PILOT_ENABLED` | false | Pilot interno |
| `SERA_VNEXT_CANDIDATE_ONLY_ENABLED` | false | Candidate-only mode |
| `NEXT_PUBLIC_SERA_VNEXT_CANDIDATE_UI_ENABLED` | false | UI candidate |

---

## 8. Rollback

Com `SERA_VNEXT_PRODUCT_BETA_ENABLED=false`:
- Rotas `/api/admin/sera-vnext/*` retornam 404.
- Motor vNext não é chamado.
- Risk Profile continua servindo somente fontes legacy.
- Comportamento do produto idêntico ao pré-Product-Beta.

Com `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=false` (default):
- `/api/analyze` mantém pipeline legacy.
- Nenhum registro vNext é criado pelo fluxo comum.
