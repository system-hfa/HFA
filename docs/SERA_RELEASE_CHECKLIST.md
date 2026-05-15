# SERA Release Checklist — v0.1.1

**Status:** ✅ Concluído — baseline oficial promovido em 2026-05-15.
**Commit de referência:** `0775dc2`

---

## 1. Checklist v0.1.1 Candidate

- [x] Smoke global executado com `SERA_N_RUNS=3 npx tsx tests/sera/run.ts --compact`
- [x] Resultado: 54 fixtures × 3 runs = 162 runs, 162 PASS, 0 PARTIAL, 0 FAIL, 0 ERROR
- [x] `determinism_rate` = 100%
- [x] Comparador contra v0.1 executado
- [x] `regressions` = 0
- [x] `improvements` = 1 (TEST-O-D-001: PARTIAL → PASS)
- [x] Nenhuma fixture com status `changed` não justificado
- [x] Nenhuma fixture `missing_from_current` ou `new_in_current`
- [x] Revisão humana do diff das fixtures afetadas

## 2. Checklist para salvar baseline

- [x] Commit de referência anotado: `0775dc2`
- [x] Baseline promovido: `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`
- [x] Relatório fonte: `tests/reports/run-1778861714570.json`
- [x] Arquivo de baseline v0.1 não sobrescrito
- [x] Script de promoção corrigido e executado (`scripts/promote-sera-v0.1.1-baseline.sh`)

## 3. Checklist para documentação

- [x] `docs/SERA_RELEASE_v0.1.1.md` criado — release notes finais
- [x] `docs/SERA_VALIDATION_v0.1.1.md` criado — resultado e comparação de smoke
- [x] `docs/SERA_KNOWN_RISKS_v0.1.1.md` criado — riscos e backlog v0.1.2
- [x] `docs/SERA_V0_1_1_FROZEN_SCOPE.md` atualizado — status aprovado
- [x] `docs/SERA_BASELINE_V0_1.md` permanece inalterado (referência histórica)

## 4. Checklist para commit/push

- [x] Branch: `main`
- [x] Commits atômicos realizados
- [x] Push para origin confirmado (HEAD = origin/main = `0775dc2`)

## 5. Checklist pós-release

- [ ] Tag criada: `sera-v0.1.1`
- [x] Baseline v0.1.1 registrado como referência oficial de regressão
- [x] Known issue TEST-O-D-001 marcado como resolvido
- [x] Riscos e próximas frentes documentados em `docs/SERA_KNOWN_RISKS_v0.1.1.md`

---

_Data: 13/05/2026 · Atualizado: 2026-05-15_
