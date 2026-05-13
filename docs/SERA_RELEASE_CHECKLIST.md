# SERA Release Checklist — v0.1.1

## 1. Checklist v0.1.1 Candidate

- [ ] Smoke global executado com `SERA_N_RUNS=3 npx tsx tests/sera/run.ts --compact`
- [ ] Resultado: 54 fixtures, 54 PASS, 0 PARTIAL, 0 FAIL, 0 ERROR
- [ ] `determinism_rate` = 100%
- [ ] Comparador contra v0.1 executado:
  ```bash
  npx tsx tests/sera/compare-baseline.ts \
    --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
    --current <run-file>
  ```
- [ ] `regressions` = 0
- [ ] `improvements` = 1 (TEST-O-D-001: PARTIAL → PASS)
- [ ] Nenhuma fixture com status `changed` não justificado
- [ ] Nenhuma fixture `missing_from_current` ou `new_in_current`
- [ ] Revisão humana do diff de todas as fixtures com status ≠ `unchanged`

## 2. Checklist para salvar baseline

- [ ] Commit atual anotado (será o commit de referência do baseline)
- [ ] Arquivo de run copiado para o local de baseline:
  ```bash
  cp tests/reports/run-<timestamp>.json \
     tests/reports/baseline/sera-baseline-v0.1.1-smoke.json
  ```
- [ ] Arquivo de baseline v0.1 **não foi sobrescrito**
- [ ] Baseline v0.1.1 aberto e revisado manualmente (spot-check em 5-10 fixtures)

## 3. Checklist para documentação

- [ ] `docs/SERA_BASELINE_V0_1_1_PLAN.md` criado e revisado
- [ ] `docs/SERA_NIGHTLY_SMOKE.md` criado e revisado
- [ ] `docs/SERA_BASELINE_V0_1.md` permanece inalterado (referência histórica)
- [ ] Documentação de baseline v0.1.1 final criada (após smoke passar):
  - Resultado consolidado (métricas)
  - Lista de fixtures
  - Comparativo com v0.1
  - Commit de referência

## 4. Checklist para commit/push

- [ ] `git status` limpo (apenas os novos arquivos de doc + baseline)
- [ ] Branch: `main`
- [ ] Commits atômicos:
  - `docs(sera): add v0.1.1 validation plan, nightly smoke and release checklist`
  - `docs(sera): add v0.1.1 baseline report`
- [ ] Push para origin

## 5. Checklist pós-release

- [ ] Tag criada: `sera-v0.1.1`
- [ ] Baseline v0.1.1 registrado como referência oficial de regressão
- [ ] Known issue TEST-O-D-001 marcado como resolvido
- [ ] Próximas frentes priorizadas (a partir das recomendações do baseline v0.1)

---

_Data: 13/05/2026_
