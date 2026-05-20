# SERA v0.1.4-A2-g — Controlled Candidate JSON Correction

## Contexto

- A2-f diagnosticou divergencias metodologicas e tecnicas no primeiro run candidate-only.
- A2-g aplicou correcoes controladas apenas em candidates isolados, sem alterar motor, baseline ou fixtures oficiais.
- A2-g executou novo candidate-only `N_RUNS=1` com lista gate atualizada.

## Arquivos alterados

- JSON candidates editados:
  - `tests/sera/fixtures-candidates/methodology-gate/A0-SEP-002.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-SEP-005.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-CHK-001.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-CHK-003.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-FUEL-002.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-VIS-004-ADJ.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-VIS-005.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-VIS-003.json`
  - `tests/sera/fixtures-candidates/methodology-gate/A0-CHK-002-ADJ.json`
- Listas alteradas:
  - `tests/sera/methodology-gate-fixtures.txt`
  - `tests/sera/methodology-exploratory-fixtures.txt`
- Documento criado:
  - `docs/SERA_METHOD_FIXTURES_A2_CONTROLLED_CORRECTION_v0.1.4.md`

## Correcoes aplicadas por caso

| ID | Tipo de correcao | Expected alterado? | Motivo | Status apos correcao |
|---|---|---|---|---|
| A0-SEP-002 | ENRICH_DESCRIPTION + metadata de rebaixamento | Nao | Eliminar `relato insuficiente` e explicitar limite lateral + primeiro desvio observavel | Rebaixado para exploratorio (fora do gate run) |
| A0-SEP-005 | ENRICH_DESCRIPTION + metadata de rebaixamento | Nao | Eliminar `relato insuficiente` e explicitar minimo lateral + deteccao por alerta | Rebaixado para exploratorio (fora do gate run) |
| A0-CHK-001 | ENRICH_DESCRIPTION/rationale/discriminators | Nao | Tornar explicito item critico pendente e deteccao tardia | PARTIAL no novo N_RUNS=1 |
| A0-CHK-003 | ENRICH_DESCRIPTION/rationale/discriminators | Nao | Tornar explicita etapa de feedback/cross-check omitida para A-G | PARTIAL no novo N_RUNS=1 |
| A0-FUEL-002 | ENRICH_DESCRIPTION/rationale/discriminators | Nao | Explicitar crossing de minimo e monitoramento periodico omitido | PARTIAL no novo N_RUNS=1 |
| A0-VIS-004-ADJ | ENRICH_DESCRIPTION/rationale/discriminators | Nao | Reforcar contrato de identificacao por fontes independentes | PARTIAL no novo N_RUNS=1 |
| A0-VIS-005 | ENRICH_DESCRIPTION/rationale/discriminators | Nao | Reforcar conflito radar vs visual e decisao antes da entrada na chuva | PARTIAL no novo N_RUNS=1 |
| A0-VIS-003 | ENRICH_DESCRIPTION + expected review registrado em notes | Nao | Revisao focal A-A vs A-B; expected mantido por criterio metodologico | PARTIAL no novo N_RUNS=1 |
| A0-CHK-002-ADJ | Metadata de rebaixamento recomendado | Nao | Manter expected forte sem enfraquecer; marcar revisao exploratoria | Ainda listado no gate atual, PARTIAL |

## Rebaixamentos para exploratorio

Aplicados na lista de execucao:

- `A0-CONFIG-001`
- `A0-CONFIG-002`
- `A0-SEP-002`
- `A0-SEP-005`

Obs: JSONs permanecem em `methodology-gate/` por rastreabilidade historica; a lista controla o conjunto executado no harness.

## Expected review

- `A0-VIS-003`:
  - Decisao: **nao alterar expected** (`A-A` mantido).
  - Justificativa: manter ancora metodologica A1-GOV+; registrar fronteira de eixo de acao como `motor/action-boundary review`.
  - Registro em `methodology_notes`: `EXPECTED_REVIEW_NOT_APPLIED`.

- `A0-CHK-002-ADJ`:
  - Decisao: **nao alterar expected** (`P-D/O-A/A-H` mantido).
  - Justificativa: evitar enfraquecimento para “passar”; marcar `gate_candidate=false` e `review_status=MOVE_TO_EXPLORATORY_RECOMMENDED` no JSON.

## Novo run N_RUNS=1

- Comando:
  - `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`
- Report:
  - `tests/reports/candidates/methodology-gate-run-1779284578.json`
- Summary:
  - `total_runs=13`
  - `PASS=0`
  - `PARTIAL=13`
  - `FAIL=0`
  - `ERROR=0`
- Casos ainda divergentes (todos os executados):
  - `A0-AUTO-001`
  - `A0-AUTO-003`
  - `A0-AUTO-004-ADJ`
  - `A0-CHK-001`
  - `A0-CHK-002-ADJ`
  - `A0-CHK-003`
  - `A0-DAUMAS-E01-B`
  - `A0-DAUMAS-E02-A`
  - `A0-DAUMAS-E02-B`
  - `A0-FUEL-002`
  - `A0-VIS-003`
  - `A0-VIS-004-ADJ`
  - `A0-VIS-005`

## Comparacao com run anterior

- Run anterior (17 casos):
  - `PASS=0`, `PARTIAL=15`, `FAIL=2`, `ERROR=2`, `total=17`.
- Run A2-g (13 casos):
  - `PASS=0`, `PARTIAL=13`, `FAIL=0`, `ERROR=0`, `total=13`.

Leitura tecnica: erros tecnicos desapareceram no gate executado apos rebaixamento de `SEP/CONFIG`, mas persistem divergencias metodologicas P/O/A nos casos restantes.

## Decisao sobre N_RUNS=3

- `N_RUNS=3` permanece **bloqueado** nesta fase.
- Nao houve melhora suficiente de acuracia para rodada ampliada; o ganho foi remocao de `FAIL/ERROR` via triagem de escopo.

## Proxima fase recomendada

- **A2-h — focused motor review or second correction pass**.
- Prioridade:
  - revisar comportamento do motor nos anchors `MOTOR_REVIEW` (especialmente O-C estrito em `A0-DAUMAS-E02-A` e fronteiras de acao);
  - decidir se `A0-CHK-002-ADJ` deve sair efetivamente do gate list antes do proximo run;
  - so depois considerar novo `N_RUNS=1` candidate-only.
