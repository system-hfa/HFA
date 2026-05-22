# SERA ERC Invariance Audit
## v0.1.4-A3-erc-invariance-audit

**Data:** 2026-05-22  
**Fase:** SERA v0.1.4-A3-erc-invariance-audit  
**Tipo:** Auditoria diagnóstica/documental em `main` limpo (sem patch ERC ativo)

## 1. Propósito

Auditar se divergências de `erc_level` nos candidates metodológicos já ocorrem no `main` limpo, sem qualquer implementação ativa de `erc_question_trace`.

## 2. Estado inicial do repo

- Repo: `/Users/filipedaumas/SAAS/HFA`
- Branch: `main`
- HEAD inicial: `4b73f4d4d8eb6d75746067efb649413c16c78200`
- `origin/main`: `4b73f4d4d8eb6d75746067efb649413c16c78200`
- Estado: `SYNCED`
- Tracked modified: nenhum

## 3. Confirmação de ausência de ERC trace ativo no código

Comandos executados:

```bash
grep -R "erc_question_trace" -n frontend/src/lib/sera docs 2>/dev/null || true
grep -R "buildExperimentalErcQuestionTrace" -n frontend/src/lib/sera 2>/dev/null || true
```

Resultado:
- `erc_question_trace` apareceu apenas em documentação (`docs/`).
- Não apareceu em `frontend/src/lib/sera/pipeline.ts` nem em código ativo do módulo SERA.

Conclusão: não havia patch ERC trace ativo no código durante esta auditoria.

## 4. Comando executado

```bash
cd /Users/filipedaumas/SAAS/HFA
SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run
```

Observação: o script retornou `exit status: 1` por `pass_rate` abaixo de 70%, o que não bloqueia esta auditoria diagnóstica.

## 5. Report gerado

- Report consolidado (mais recente):
  - `tests/reports/candidates/methodology-gate-run-1779418106.json`
- Run id interno do runner:
  - `run-1779417112914`

## 6. Resumo PASS/PARTIAL/FAIL/ERROR/determinism_rate

- `PASS 6`
- `PARTIAL 7`
- `FAIL 0`
- `ERROR 0`
- `determinism_rate 100%`

## 7. Tabela fixture por fixture

| Fixture | Expected P/O/A/ERC | Actual P/O/A/ERC | Status | ERC diverge? | Observação |
|---|---|---|---|---|---|
| A0-DAUMAS-E02-A | P-A / O-C / A-F / 2 | P-A / O-C / A-F / 2 | PASS | NÃO | Anchor forte preservado |
| A0-AUTO-001 | P-C / O-A / A-E / 2 | P-C / O-A / A-E / 2 | PASS | NÃO | Anchor forte preservado |
| A0-DAUMAS-E01-B | P-C / O-A / A-E / 2 | P-C / O-A / A-E / 2 | PASS | NÃO | Anchor forte preservado |
| A0-AUTO-003 | P-D / O-A / A-H / 2 | P-D / O-A / A-H / 2 | PASS | NÃO | Anchor forte preservado |
| A0-DAUMAS-E02-B | P-D / O-A / A-H / 2 | P-D / O-A / A-H / 2 | PASS | NÃO | Anchor forte preservado |
| A0-AUTO-004-ADJ | P-A / O-A / A-G / 2 | P-A / O-A / A-G / 3 | PARTIAL | SIM | Divergência ERC 2->3 no main limpo |
| A0-CHK-003 | P-G / O-A / A-G / 2 | P-G / O-A / A-G / 3 | PARTIAL | SIM | Divergência ERC 2->3 no main limpo |
| A0-CHK-001 | P-G / O-A / A-A / 2 | P-G / O-A / A-A / 3 | PARTIAL | SIM | Divergência ERC 2->3 no main limpo |
| A0-FUEL-002 | P-G / O-A / A-A / 2 | P-G / O-A / A-A / 3 | PARTIAL | SIM | Divergência ERC 2->3 no main limpo |
| A0-VIS-003 | P-G / O-A / A-A / 2 | P-G / O-A / A-A / 2 | PASS | NÃO | Sem divergência ERC |
| A0-VIS-004-ADJ | P-H / O-A / A-A / 2 | P-H / O-A / A-A / 3 | PARTIAL | SIM | Divergência ERC 2->3 no main limpo |
| A0-VIS-005 | P-H / O-A / A-A / 2 | P-H / O-A / A-A / 3 | PARTIAL | SIM | Divergência ERC 2->3 no main limpo |
| A0-CHK-002-ADJ | P-D / O-A / A-H / 2 | P-A / O-A / A-A / 3 | PARTIAL | SIM | Exploratório/conhecido; também diverge ERC |

## 8. Comparação com tentativa ERC rejeitada

Comparação com:
- `docs/SERA_TRACE_EXPERIMENTAL_ERC_REJECTED_v0.1.4.md`
- `tests/reports/candidates/methodology-gate-run-1779416027.json`

Resultado:
- Os mesmos casos com `erc_level 2 -> 3` na tentativa rejeitada também divergem no `main` limpo.
- Não foi encontrado caso em que ERC divergisse apenas na tentativa rejeitada e não no `main` limpo.

## 9. Classificação das divergências

### BASELINE_CANDIDATE_DIVERGENCE

- A0-AUTO-004-ADJ
- A0-CHK-003
- A0-CHK-001
- A0-FUEL-002
- A0-VIS-004-ADJ
- A0-VIS-005
- A0-CHK-002-ADJ (exploratório)

### PATCH_REGRESSION

- Nenhum caso identificado nesta auditoria.

### UNKNOWN

- Não aplicável para os casos com divergência ERC; os casos divergentes observados batem com baseline limpo.

## 10. Conclusão

Hipótese confirmada: **Hipótese A — ERC já diverge no main limpo**.

A rejeição da tentativa ERC foi correta pelo critério fechado de invariância, porém os dados desta auditoria indicam que a divergência de `erc_level` já existe no baseline candidate, e não prova regressão específica do patch ERC.

## 11. Próxima recomendação

1. Triar e revisar os `expected.erc_level` dos candidates que divergem no baseline limpo.
2. Separar temporariamente o critério ERC do gate de promoção de subtrace experimental enquanto a baseline ERC não estiver alinhada.
3. Só retentar helper ERC após estabilizar/normalizar expectativa de ERC nos candidates de referência.

## 12. Limitações da auditoria

- Auditoria executada com `N_RUNS=1` (não cobre variabilidade multi-run).
- Não houve alteração de código, fixtures ou runner; análise baseada no estado atual do `main`.
- Classificação usa comparação entre report atual e report da tentativa rejeitada disponível localmente.
