# SERA vNext — Decisão Final da Unificação

**Data de atualização**: 2026-06-09

---

## Status Final

```
SERA_VNEXT_PRODUCT_UNIFICATION_READY_FOR_CONTROLLED_PILOT
```

**Histórico:**
- `SERA_VNEXT_PRODUCT_UNIFICATION_PASS_WITH_LIMITATIONS` (macrofase 1, incorreto): afirmava que Postgres ignora colunas inexistentes — FALSO.
- `SERA_VNEXT_PRODUCT_UNIFICATION_IMPLEMENTED_NOT_RUNTIME_VALIDATED` (correção intermediária): status correto após identificar o erro.
- `SERA_VNEXT_PRODUCT_UNIFICATION_RUNTIME_VALIDATED` (macrofase 2): migration confirmada aplicada, testes reais executados, build passa.
- `SERA_VNEXT_PRODUCT_UNIFICATION_E2E_CLOSURE_PASS` (macrofase 3): E2E completo com servidor real — 8 suites específicas criadas e executadas, full sweep 176 testes sem falhas.
- `SERA_VNEXT_PRODUCT_UNIFICATION_READY_FOR_CONTROLLED_PILOT` (canonical-routing-proof, atual): `/api/analyze` canonical routing testado com flags ON e OFF em servidor real; FK bug corrigido; schema fallback implementado.

**Data do canonical routing proof:** 2026-06-09

---

## Critérios Avaliados

| Critério | Status | Observação |
|---|---|---|
| vNext v02 canônico para novas análises controladas | PASS | Engine runtime 0.2.0; engine_runtime_version=0.2.0 confirmado em API real |
| Rollback legacy disponível | PASS | Feature flags com default false; flags testadas com servidor real |
| Proveniência correta (create) | PASS_REAL | 21 PASS — engine_version=0.1.0, engine_runtime_version=0.2.0, source_flow=VNEXT_PRODUCT_BETA via API |
| Proveniência correta (reanalysis) | PASS_REAL | 21 PASS — revisão 2 com proveniência, ambas revisões preservadas |
| Versões coerentes | PASS | engine_output.engineVersion=0.2.0; engine_runtime_version=0.2.0; engine_version contract=0.1.0 |
| Unified reads | PASS | `/lib/sera-analysis-unified` implementado |
| Perfil de Risco sem dupla contagem | PASS_REAL | 12 PASS — canonical=200, included+excluded≤total confirmado |
| Endpoints consolidados | PASS | /api/org/intelligence deprecated; /api/risk-profile canônico testado com servidor real |
| Dashboard coerente | PASS_REAL | 11 PASS — dashboard usa /api/risk-profile com Bearer token; score={value,level,label} correto |
| Erros sanitizados | PASS_REAL | 22 PASS — sem stack, sem SQL, sem Supabase raw em nenhuma resposta de erro |
| Guardrails v02 integrados | PASS_REAL | 27 PASS — 9 chaves presentes em API, tipos boolean, audit event incluído |
| Security/RLS | PASS_REAL | 17 PASS — anon bloqueado, tenant isolation, INSERT sem auth bloqueado por RLS |
| Product Beta regressions | PASS_REAL | Migration aplicada; INSERTs com proveniência validados |
| Engine v02 preservado | PASS | run-engine.ts inalterado; versão 0.2.0 preservada |
| Full sweep (176 testes) | PASS | Zero falhas — confirmado após macrofase 3 |
| TypeScript typecheck | PASS | Zero erros de tipo |
| Lint | PASS | 0 erros; 19 warnings pré-existentes em código legado |
| Final outputs bloqueados | PASS | selectedCode=null, releasedCode=null, classifiedOutput=false confirmados em API real |

---

## Declarações Proibidas

- **NÃO** é production ready.
- **NÃO** é scientifically validated.
- **NÃO** é human validated.
- Score de risco é índice heurístico descritivo, não probabilidade de acidente.

---

## Limitações Desta Fase

1. `/api/org/intelligence` deprecated mas não removido (consumidores ativos podem existir).
2. Rota `/api/analyze` com flag OFF usa pipeline legacy; com flag ON usa vNext v02 — ambos testados com servidor real.
3. Flag-on (`SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=true`) requer restart do servidor — testada com servidor real na canonical-routing-proof.
4. Exclusions sub-rotas (`/api/risk-profile/exclusions`) usam `error instanceof Error ? error.message : String(error)` — escopo de melhoria futura.
5. `audit_log` table não existe na instância Supabase remota — eventos de audit são best-effort e falham silenciosamente (pré-existente).
6. Testes E2E requerem servidor ativo — canonical-routing test criado com documentação de processos separados para ON/OFF.
