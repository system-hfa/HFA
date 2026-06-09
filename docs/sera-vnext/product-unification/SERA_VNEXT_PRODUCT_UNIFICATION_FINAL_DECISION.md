# SERA vNext — Decisão Final da Unificação

**Data**: 2026-06-08

---

## Status Final

```
SERA_VNEXT_PRODUCT_UNIFICATION_PASS_WITH_LIMITATIONS
```

---

## Critérios Avaliados

| Critério | Status | Observação |
|---|---|---|
| vNext v02 canônico para novas análises controladas | PASS | Engine runtime 0.2.0 sendo usado; proveniência separada do contrato DB |
| Rollback legacy disponível | PASS | Feature flags com default false; pipeline legacy preservado |
| Proveniência correta | PASS | engine_runtime_version, source_flow, canonical_tree_version em migration e código |
| Versões coerentes | PASS | engine_output.engineVersion = 0.2.0; engine_runtime_version = 0.2.0; engine_version (contract) = 0.1.0 |
| Unified reads | PASS | `/lib/sera-analysis-unified` implementado |
| Perfil de Risco sem dupla contagem | PASS | isCompatibleVNextRow + source diferenciado |
| Endpoints consolidados | PARTIAL | /api/org/intelligence deprecated com header; dashboard ainda usa endpoint antigo |
| Dashboard coerente | PARTIAL | Dados corretos; endpoint a migrar em próxima fase |
| Erros sanitizados | PASS | F-14 corrigido: org/intelligence + /api/analyze |
| Security tests | PARTIAL | Testes documentados e criados como suite estática; execução real requer DB ativo |
| Product Beta regressions | PASS (type-safe) | Campos novos são nullable; migration não aplicada = null silencioso |
| Engine v02 preservado | PASS | run-engine.ts inalterado; versão 0.2.0 preservada |
| Full sweep | PASS | tsc + lint sem erros |
| Final outputs bloqueados | PASS | Constraints DB + assertNonFinalOutput no código |

---

## Declarações Proibidas

- **NÃO** é production ready.
- **NÃO** é scientifically validated.
- **NÃO** é human validated.
- Score de risco é índice heurístico descritivo, não probabilidade de acidente.

---

## Limitações Desta Fase

1. Migration `20260608210000` criada mas não aplicada (aguarda ambiente autorizado).
2. `/api/org/intelligence` deprecated mas não removido (consumidores ativos podem existir).
3. Dashboard ainda chama `/api/org/intelligence` — migrar para `/api/risk-profile` em próxima fase.
4. Rota `/api/analyze` ainda usa pipeline legacy (flag `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=false`).
5. Guardrails v02 (`compute-guardrails.ts`) não integrados ao `create-analysis.ts` — avaliação de compatibilidade de output pendente.
6. Testes E2E requerem servidor ativo — criados como suites com verificações estáticas.
