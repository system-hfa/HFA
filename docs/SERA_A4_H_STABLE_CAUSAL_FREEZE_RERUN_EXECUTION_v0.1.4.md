# SERA v0.1.4-A4-h - Stable Causal Freeze Rerun Execution

Status: executed and documented  
Scope: registrar execução estável do rerun causal freeze candidate  
Non-scope: promoção de baseline final, mudança de motor, mudança de expected/candidates

## 1. Objetivo da fase

Documentar a execução estável do freeze candidate causal v0.1.4 (A4-h), com evidência limpa para a camada causal SERA.

## 2. Comando executado

Execução do rerun conforme plano A4-g:

```bash
SERA_FIXTURE_LIST=tests/sera/methodology-admission-fixtures.txt \
SERA_N_RUNS=3 \
SERA_ALLOW_MULTI_RUN=1 \
scripts/run-sera-methodology-candidates.sh --run
```

Validação pós-run:

```bash
node tests/sera/assert-sera-causal-report-clean.js tests/reports/candidates/methodology-gate-run-1779544197.json
node tests/sera/analyze-sera-causal-report.js tests/reports/candidates/methodology-gate-run-1779544197.json
```

## 3. Report usado

- `tests/reports/candidates/methodology-gate-run-1779544197.json`
- `run_id=run-1779542293462`
- `RUN_EXIT=0`
- `INFRA_EXIT=0`
- `GUARD_EXIT=0`
- `fixtures_tested=9`
- `n_runs_per_fixture=3`
- `total_runs=27`

## 4. Validação de provider-stable

Critérios operacionais de estabilidade atendidos:

- sem `terminated`;
- sem `Request timed out`;
- sem `actual` vazio (`///0`);
- guardrail causal oficial com resultado OK.

## 5. Resultado legacy (`summary`)

- `pass=27`
- `partial=0`
- `fail=0`
- `error=0`
- `pass_rate=1`
- `determinism_rate=1`

## 6. Resultado causal (`causal_summary`)

- `pass=27`
- `partial=0`
- `fail=0`
- `error=0`
- `pass_rate=1`
- `determinism_rate=1`

## 7. Resultado risk layer (`risk_layer_summary`)

- `match=27`
- `mismatch=0`
- `hold=0`
- `match_rate=1`
- `determinism_rate=1`
- `mismatch_fixture_count=0`

## 8. Tabela por candidate

| Candidate | Resultado | Status |
|---|---|---|
| A0-AUTO-001 | P-C/O-A/A-E/2 (3/3 PASS) | PASS |
| A0-AUTO-003 | P-D/O-A/A-H/2 (3/3 PASS) | PASS |
| A0-AUTO-004-ADJ | P-A/O-A/A-G/3 (3/3 PASS) | PASS |
| A0-CHK-003 | P-G/O-A/A-G/3 (3/3 PASS) | PASS |
| A0-DAUMAS-E01-B | P-C/O-A/A-E/2 (3/3 PASS) | PASS |
| A0-DAUMAS-E02-A | P-A/O-C/A-F/2 (3/3 PASS) | PASS |
| A0-VIS-003 | P-G/O-A/A-A/2 (3/3 PASS) | PASS |
| A0-VIS-004-ADJ | P-H/O-A/A-A/3 (3/3 PASS) | PASS |
| A0-VIS-005 | P-H/O-A/A-A/3 (3/3 PASS) | PASS |

## 9. Conclusão da fase

Decisão consolidada:

- **CAUSAL_FREEZE_CANDIDATE_PASS**

Todos os 9 candidates passaram 3/3 no recorte causal com determinismo causal 1.0 em execução operacionalmente estável.

## 10. Declaração de limite

Apesar do `CAUSAL_FREEZE_CANDIDATE_PASS`, a baseline final **ainda não foi promovida** nesta fase.

## 11. Próximos passos

Próxima fase recomendada:

- **A4-i — Causal Baseline Artifact and Freeze Governance**

Foco esperado:

- consolidar artefato formal de baseline causal;
- registrar governança de freeze e critérios de promoção final;
- manter trilha de risk layer separada da promoção causal.
