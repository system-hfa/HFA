# SERA v0.1.4-A4-f - Causal Baseline Freeze Candidate Run

Status: executed (candidate run)  
Scope: validacao formal do freeze candidate causal-only  
Non-scope: baseline final promotion, risk-layer validation

## 1. Objetivo da fase

Executar uma rodada formal de freeze candidate da baseline causal v0.1.4 usando o contrato oficial A4-e, separando:

- resultado legacy (`summary` / `overall`);
- resultado causal (`causal_summary` / `causal_overall`);
- estado da risk layer (`risk_layer_summary` / `risk_layer_status`).

## 2. Comando executado

```bash
SERA_FIXTURE_LIST=tests/sera/methodology-admission-fixtures.txt \
SERA_N_RUNS=3 \
SERA_ALLOW_MULTI_RUN=1 \
scripts/run-sera-methodology-candidates.sh --run
```

## 3. Report gerado

- Candidate report: `tests/reports/candidates/methodology-gate-run-1779509334.json`
- Internal run id: `run-1779507193230`

## 4. Resultado legacy

`summary`:

- total_runs: 27
- pass: 26
- partial: 1
- fail: 0
- error: 0
- pass_rate: 0.9629629629629629
- determinism_rate: 0.8888888888888888

## 5. Resultado causal

`causal_summary`:

- total_runs: 27
- pass: 26
- partial: 1
- fail: 0
- error: 0
- pass_rate: 0.9629629629629629
- determinism_rate: 0.8888888888888888

## 6. Resultado risk layer

`risk_layer_summary`:

- total_runs: 27
- match: 27
- mismatch: 0
- hold: 0
- match_rate: 1
- determinism_rate: 1
- mismatch_fixture_count: 0

Nesta rodada, a risk layer nao gerou hold.

## 7. Resultado do guardrail causal

Comando:

```bash
node tests/sera/assert-sera-causal-report-clean.js tests/reports/candidates/methodology-gate-run-1779509334.json
```

Resultado:

- **FAIL** (`causal_partial > 0`)
- `causal_determinism_rate` tambem abaixo de 1 (`0.8888888888888888`)

Conclusao: freeze candidate causal nao aprovado nesta execucao.

## 8. Tabela por candidate

| Candidate | views.legacy_overall | views.causal_overall | views.risk_layer_status | Decisao |
|---|---|---|---|---|
| A0-AUTO-001 | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-AUTO-003 | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-AUTO-004-ADJ | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-CHK-003 | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-DAUMAS-E01-B | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-DAUMAS-E02-A | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-VIS-003 | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-VIS-004-ADJ | PASS | PASS | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_PASS |
| A0-VIS-005 | PARTIAL | PARTIAL | RISK_PASS | CAUSAL_FREEZE_CANDIDATE_HOLD |

Detalhe do hold:

- `A0-VIS-005` run 3 retornou `P-H / O-D / A-A` (expected `P-H / O-A / A-A`), gerando `PARTIAL` legacy e causal.

## 9. Decisao da fase

- `CAUSAL_FREEZE_CANDIDATE_PASS`: 8 candidates
- `CAUSAL_FREEZE_CANDIDATE_HOLD`: 1 candidate (`A0-VIS-005`)
- `RISK_LAYER_HOLD`: nenhum candidate nesta rodada

Decisao consolidada da rodada:

- **CAUSAL_FREEZE_CANDIDATE_HOLD** (nao aprovado) por `causal_partial=1`.

## 10. Declaracoes obrigatorias

- Baseline final **nao** foi promovida nesta fase.
- Risk layer **nao** foi validada como baseline de risco nesta fase.
- Esta rodada validou apenas o candidate run causal sob contrato A4-e.

## 11. Proximos passos para baseline causal final

1. Repetir rodada de freeze candidate causal N_RUNS=3 para os 9 candidates.
2. Exigir gate causal completo:
   - `causal_partial=0`;
   - `causal_fail=0`;
   - `causal_error=0`;
   - `causal_determinism_rate=1`.
3. Se aprovado, preparar artefato de baseline causal final em fase dedicada, mantendo risk layer em trilha separada.
