# SERA Trace Experimental — ERC Rejected Attempt
## v0.1.4-A3-d5d2-erc-implementation

**Data:** 2026-05-22  
**Fase:** SERA v0.1.4-A3-d5d2-erc-implementation  
**Tipo:** Registro documental de tentativa rejeitada por critério de invariância de ERC

## 1. Motivo da rejeição

A tentativa foi rejeitada porque, apesar de manter `FAIL=0` e `ERROR=0`, houve mudança de `erc_level` em múltiplos candidates na validação `N_RUNS=1`, violando o critério fechado da fase:

- `erc_level` deve permanecer invariável nos candidates.

## 2. Validações executadas

- Typecheck: `cd frontend && npx tsc --noEmit` — **PASSOU**.
- Candidate-only: `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`.

Resumo do run:
- `PASS 6 | PARTIAL 7 | FAIL 0 | ERROR 0`
- `determinism_rate: 100%`
- Report runner: `/private/tmp/hfa-sera-methodology-candidates-lkmORz/tests/reports/run-1779415134123.json`
- Report consolidado: `tests/reports/candidates/methodology-gate-run-1779416027.json`

## 3. Anchors fortes

Anchors fortes P/O/A permaneceram preservados (sem regressão dos códigos P/O/A esperados), incluindo:
- `A0-DAUMAS-E02-A = P-A/O-C/A-F`
- `A0-AUTO-001 = P-C/O-A/A-E`
- `A0-DAUMAS-E01-B = P-C/O-A/A-E`
- `A0-AUTO-003 = P-D/O-A/A-H`
- `A0-DAUMAS-E02-B = P-D/O-A/A-H`
- `A0-AUTO-004-ADJ = P-A/O-A/A-G`
- `A0-CHK-003 = P-G/O-A/A-G`
- `A0-CHK-001 = P-G/O-A/A-A`
- `A0-FUEL-002 = P-G/O-A/A-A`
- `A0-VIS-003 = P-G/O-A/A-A`
- `A0-VIS-004-ADJ = P-H/O-A/A-A`
- `A0-VIS-005 = P-H/O-A/A-A`

`A0-CHK-002-ADJ` permaneceu exploratório/conhecido.

## 4. Evidência de mudança de `erc_level`

No report consolidado `methodology-gate-run-1779416027.json`, houve diferenças `expected.erc_level -> actual.erc_level` em múltiplos casos, por exemplo:
- `A0-AUTO-004-ADJ: 2 -> 3`
- `A0-CHK-003: 2 -> 3`
- `A0-CHK-001: 2 -> 3`
- `A0-FUEL-002: 2 -> 3`
- `A0-VIS-004-ADJ: 2 -> 3`
- `A0-VIS-005: 2 -> 3`
- `A0-CHK-002-ADJ: 2 -> 3` (exploratório)

Como a fase exige invariância de `erc_level`, a tentativa não pode ser promovida.

## 5. Rollback aplicado

Rollback completo do patch de código:

```bash
git restore frontend/src/lib/sera/types.ts frontend/src/lib/sera/pipeline.ts
rm -f docs/SERA_TRACE_EXPERIMENTAL_ERC_IMPLEMENTATION_v0.1.4.md
```

Estado final após rollback:
- sem tracked modified;
- apenas untracked permitidos (`AGENTS.md`, `tests/reports/candidates/`).

## 6. O que não foi promovido

Não foi promovido para `main`:
- `raw_llm_output.trace_experimental.erc_question_trace`;
- qualquer alteração em `pipeline.ts`;
- qualquer alteração em tipos, classificação, gates, prompts, fixtures, baseline, schema, UI, Risk Profile ou dashboards.

## 7. Próxima recomendação

Executar uma fase de investigação específica de invariância de ERC antes de nova tentativa de implementação:

1. Rodar baseline controlado sem patch para confirmar comportamento atual de `erc_level` por fixture.
2. Isolar e comparar `erc_level` por fixture (antes/depois) com script determinístico dedicado.
3. Só retentar `erc_question_trace` quando houver evidência de invariância de `erc_level` no mesmo gate `N_RUNS=1`.

