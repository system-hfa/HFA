# SERA vNext — Resultados de Validação da Unificação

**Data**: 2026-06-08  
**Macrofase**: product-data-frontend-unification

---

## Validação TypeScript

```
npm --prefix frontend exec -- tsc --noEmit
```

**Resultado**: PASS — zero erros de tipo.

---

## Lint

```
npm --prefix frontend run lint
```

**Resultado**: PASS — 0 erros, 19 warnings pré-existentes (não introduzidos por esta macrofase).

---

## Build

Não executado nesta sessão (requer ambiente de build completo). Typecheck+lint passam; build deve seguir.

---

## Engine v01

Testes engine v01 não foram re-executados nesta macrofase (sem alterações no motor v01). Status preservado da fase anterior.

---

## Engine v02

`runSeraVNextEngineV0` não foi alterado. A integração de `compute-guardrails.ts` (engine-v02) permanece como próximo passo — não foi incorporada ao `create-analysis.ts` nesta fase porque requer avaliação de compatibilidade de output.

---

## Product Beta Regressions

As alterações nesta macrofase em `create-analysis.ts` e `reanalyze-analysis.ts`:
- Adicionam campos novos no INSERT (`engine_runtime_version`, `source_flow`, `canonical_tree_version`).
- Estes campos **só existem após aplicação da migration**.

**CORREÇÃO CRÍTICA (anterior afirmação era incorreta):**
A afirmação anterior dizia que "o Postgres ignora colunas inexistentes em INSERTs nullable". Isso é FALSO.

PostgreSQL lança `ERROR: column "xyz" of relation "table" does not exist` em qualquer INSERT que referencie coluna inexistente, independentemente do nullable. O comportamento nullable só se aplica a colunas que JÁ EXISTEM na tabela mas não foram incluídas no INSERT (nesses casos, recebem NULL ou DEFAULT).

**Impacto real sem migration aplicada:**
- INSERTs em `create-analysis.ts` e `reanalyze-analysis.ts` que referenciam `engine_runtime_version`, `source_flow`, `canonical_tree_version` **irão falhar com erro de coluna inexistente** se a migration não for aplicada.
- A migration `20260608210000_sera_vnext_provenance_columns.sql` é **prerequisite funcional** para ativar o novo modelo de proveniência.

**Status:** MIGRATION_CREATED_NOT_APPLIED — código referencia colunas ainda inexistentes em staging/produção.

---

## Risk Profile Regressions

Alterações em `risk-profile/server.ts`:
- Adicionam `sourceFlow`, `engineRuntimeVersion`, `methodologyVersion`, `canonicalTreeVersion` a cada fonte.
- Para fontes legacy: esses campos ficam `null` — sem efeito no cálculo de ERC, P/O/A, ou score.
- Para fontes vNext: `sourceFlow` é `null ?? 'VNEXT_PRODUCT_BETA'` (default seguro).
- Adição de `MIXED_VERSION_LIMITATION` nas limitações — não quebra nenhum cálculo.
- A query vNext seleciona `engine_runtime_version`, `source_flow`, `canonical_tree_version`: **essas colunas não existem sem migration aplicada** — a query Supabase retornará erro ou resultado vazio por essas colunas, não null silencioso.

**Validação real (macrofase 2):** Risk Profile query com as colunas novas foi executada contra DB de staging — 16 PASS, 0 FAIL. Colunas existem, valores null em rows pré-migration, valores '0.2.0'/'VNEXT_PRODUCT_BETA' em rows pós-migration.

---

## Runtime Correction (Macrofase 2 — 2026-06-08)

Esta seção registra as correções e validações reais executadas na macrofase de runtime correction.

### Migration: APPLIED
- `migration list` confirmado: `20260608210000` presente em Local e Remote.
- Query REST API verificou que as colunas `engine_runtime_version`, `source_flow`, `canonical_tree_version` existem e são queryáveis.

### Build Real: PASS
- `npm --prefix frontend run build`: ✓ Compiled successfully — 61 páginas, 0 erros.

### Testes Reais Executados
- `provenance-db-real-trial-001.ts`: 20 PASS, 0 FAIL
- `risk-profile-real-trial-001.ts`: 16 PASS, 0 FAIL

### Guardrails v02 Integrados
- `create-analysis.ts`: `collectWarnings` agora inclui `GUARDRAIL_VIOLATED_<NAME>` para cada guardrail violado.
- Audit event payload inclui `guardrailViolations: string[]`.

### Dashboard Migrado
- `/dashboard/page.tsx`: chamada alterada de `/api/org/intelligence` para `/api/risk-profile`.

### Error Sanitização Expandida
- `/api/risk-profile/route.ts` outer catch: de `jsonError(String(e), 500)` para `jsonError('RISK_PROFILE_ERROR', 'Falha ao gerar perfil de risco.', 500, requestId)`.

---

## E2E Closure (Macrofase 3 — 2026-06-09)

Esta seção registra os testes E2E com servidor real executados na macrofase de closure.

### Suites E2E Executadas (8 arquivos, product-unification/)

| Suite | Resultado | Detalhe |
|---|---|---|
| `provenance-rls-real-trial-001.ts` | 17 PASS, 0 FAIL | Schema, anon block, RLS, tenant isolation |
| `provenance-api-real-trial-001.ts` | 21 PASS, 0 FAIL | Create API: proveniência completa, idempotência, conflito |
| `provenance-reanalysis-api-real-trial-001.ts` | 21 PASS, 0 FAIL | Reanalysis: revisão 2 com proveniência, histórico preservado |
| `canonical-routing-real-trial-001.ts` | 9 PASS, 1 SKIPPED, 0 FAIL | Feature flags default=false; flag-on requer restart |
| `v02-guardrail-api-ui-trial-001.ts` | 27 PASS, 0 FAIL | 9 guardrail keys como boolean em API real |
| `risk-profile-endpoint-parity-real-trial-001.ts` | 12 PASS, 3 SKIPPED, 0 FAIL | Canonical/deprecated/legacy; headers skipped (apiJson limitation) |
| `dashboard-risk-profile-e2e-trial-001.ts` | 11 PASS, 1 SKIPPED, 0 FAIL | Dashboard usa /api/risk-profile com Bearer token |
| `error-observability-e2e-trial-001.ts` | 22 PASS, 0 FAIL | Sem stack/SQL/Supabase raw em nenhuma resposta de erro |

### Full Sweep (176 testes)

- Total arquivos: 176
- Falhas: 0
- Comando: `for f in tests/sera-vnext/*.ts; do npx tsx "$f"; done`
- Log: `tmp/sera-vnext-product-unification-final-e2e/full-sweep.log`

### Scans de Segurança (Macrofase 3)

| Scan | Resultado |
|---|---|
| Template literals Tailwind em className | CLEAR |
| selectedCode ativo em produto | CLEAR |
| anon GRANTS em migrations | CLEAR |
| RLS DISABLE em migrations | CLEAR |
| String(e) em rotas SERA | CLEAR (risk-profile, analyze, intelligence OK) |
| Stack trace em respostas | CLEAR |
| Claims proibidos em UI | CLEAR |
| Cross-tenant (tenant_id filter) | CLEAR — todas as 5 queries em repositories.ts filtram por tenant_id |
| Fetch cliente sem Authorization (dashboard) | CLEAR — Authorization: Bearer token presente |

**Nota sobre String(e) em rotas não-SERA:** `settings/ai`, `auth/me`, `payments` usam `String(e)` — pré-existente, fora do escopo desta macrofase.

---

## Alterações Implementadas

| Parte | Status |
|---|---|
| Migration proveniência | APPLIED_E_VALIDADA |
| Versioning model | IMPLEMENTADO |
| Types: SeraVNextAnalysisRecord | IMPLEMENTADO |
| Types: SeraVNextRevisionRecord | IMPLEMENTADO |
| create-analysis.ts | IMPLEMENTADO |
| reanalyze-analysis.ts | IMPLEMENTADO |
| feature-flags.ts | IMPLEMENTADO |
| Unified adapter | IMPLEMENTADO |
| Risk Profile sourceFlow | IMPLEMENTADO |
| Risk Profile types | IMPLEMENTADO |
| Error sanitização org/intelligence | IMPLEMENTADO |
| Error sanitização /api/analyze | IMPLEMENTADO |
| Error sanitização risk-profile | IMPLEMENTADO_MACROFASE_2 |
| Guardrails v02 integrados | IMPLEMENTADO_MACROFASE_2 |
| Dashboard migrado para /api/risk-profile | IMPLEMENTADO_MACROFASE_2 |
| 14 docs product-unification | IMPLEMENTADO |
| Testes product-unification (8 suites E2E) | IMPLEMENTADO_MACROFASE_3 |
| Full sweep 176 testes | PASS_MACROFASE_3 |
| TypeScript typecheck | PASS |
| Lint | PASS (0 erros) |
