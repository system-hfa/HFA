# SERA v0.1.4-A4-e - Official Causal-Only Scorer and Report Contract

Status: implemented in test scorer/report layer  
Scope: contract de report com visoes legacy, causal e risk layer  
Non-scope: patch de motor SERA, baseline promotion, risk-layer redesign

## 1. Objetivo da fase

Formalizar um contrato oficial de scoring/report com separacao explicita entre:

- `legacy_overall`: comportamento atual (com gate de `erc_level`), preservado;
- `causal_overall`: avaliacao causal SERA (P/O/A + preconditions);
- `risk_layer_status`: estado de match/mismatch/hold da camada de risco legada.

## 2. Alteracoes realizadas

Arquivos alterados:

- `tests/sera/fixtures/schema.ts`
- `tests/sera/compare.ts`
- `tests/sera/runner.ts`
- `tests/sera/report.ts`
- `tests/sera/analyze-sera-causal-report.js`
- `tests/sera/assert-sera-causal-report-clean.js` (novo)

## 3. Contrato oficial de campos

### 3.1 Run-level (`TestResult.scores`)

- `overall`: legado preservado (sem mudanca de semantica).
- `legacy_overall`: espelho explicito de `overall`.
- `causal_overall`:
  - `PASS`: P/O/A em `PASS` e `preconditions=PASS`;
  - `PARTIAL`: P/O/A parcial, ou P/O/A `PASS` com preconditions nao-`PASS`;
  - `FAIL`: falha causal total (sem erro de execucao).
- `risk_layer_status`:
  - `MATCH`: `erc_level` igual ao expected;
  - `MISMATCH`: `erc_level` divergente;
  - `HOLD`: run com erro de execucao.

### 3.2 Fixture-level (`FixtureReport`)

- `views.legacy_overall`: agregacao por fixture do legado (`PASS/PARTIAL/FAIL`).
- `views.causal_overall`: agregacao por fixture do causal (`PASS/PARTIAL/FAIL`).
- `views.risk_layer_status`: `RISK_PASS` quando todos runs sao `MATCH`, senao `RISK_HOLD`.

- Novas metricas em `accuracy`:
  - `legacy_overall_accuracy`;
  - `causal_overall_accuracy`;
  - `risk_layer_match_rate`.

### 3.3 Report-level (`RunReport`)

- `summary`: preservado como legado.
- `causal_summary` (novo):
  - `total_runs`, `pass`, `partial`, `fail`, `error`, `pass_rate`, `determinism_rate`.
- `risk_layer_summary` (novo):
  - `total_runs`, `match`, `mismatch`, `hold`, `match_rate`, `determinism_rate`, `mismatch_fixture_count`.

## 4. Decisao sobre helper A4-d

Decisao aplicada: **ambos**.

- A logica oficial foi integrada no scorer/report (`compare.ts` + `runner.ts` + schema).
- O helper `tests/sera/analyze-sera-causal-report.js` foi mantido para analise offline e compatibilidade com reports antigos.

## 5. Guardrail causal oficial

Novo guardrail:

- `tests/sera/assert-sera-causal-report-clean.js`

Regra de freeze causal:

- `causal_fail = 0`;
- `causal_error = 0`;
- `causal_partial = 0`;
- `causal_determinism_rate = 1`.

Regra explicita: **nao exige** `risk_layer` pass para validar freeze causal.

## 6. Impacto em A4-d

- A4-d calculava causal-only offline via helper.
- A4-e formaliza o mesmo criterio diretamente no contrato oficial do report.
- Resultado esperado permanece: `A0-VIS-003` pode ser `CAUSAL_PASS` com `RISK_HOLD`.

## 7. Validacao no report A4-b

Report validado:

- `tests/reports/candidates/methodology-gate-run-1779497843.json`

Resultados:

- Legacy: `pass=25`, `partial=2`, `fail=0`, `error=0`.
- Causal: `pass=27`, `partial=0`, `fail=0`, `error=0`, `determinism_rate=1`.
- Risk layer: `mismatch_fixture_count=1` (`A0-VIS-003`), `erc` mismatch em 2 runs.

Guardrail causal: **OK**.

## 8. Backward compatibility

Garantias aplicadas:

- `overall` legado foi mantido sem alterar semantica.
- `summary` legado foi mantido.
- Novos campos foram adicionados sem remover campos antigos.
- Helper/guardrail causal suportam fallback para reports sem campos novos.

## 9. O que ainda bloqueia causal baseline freeze

1. Definir artefato oficial de baseline causal-only em `tests/reports/baseline/`.
2. Rodada formal de freeze causal com gate aprovado (fase dedicada, sem incluir risk-layer gate).
3. Fechamento de governanca documental do processo de promocao (A4-e -> fase de freeze).

## 10. O que fica para Risk Layer redesign

- Validacao metodologica separada de `erc_level` legado.
- Integracao governada de matriz tradicional, ARMS/ERC e Hendy risk management.
- Contrato de apresentacao de risco (risk profile/product) apos redesign e calibracao.
