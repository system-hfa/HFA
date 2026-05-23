# SERA v0.1.4-A4-i - Causal Baseline Artifact and Freeze Governance

Status: causal baseline artifact created  
Scope: congelamento da baseline causal SERA v0.1.4 (P/O/A + preconditions)  
Non-scope: baseline completa de risco (traditional matrix, ARMS/ERC, Hendy risk management, product risk profile)

## 1. Objetivo da fase

Criar o artefato oficial de baseline causal v0.1.4 a partir do report estável aprovado em A4-h, mantendo separação explícita entre classificação causal e HFA Risk Layer.

## 2. Artefato criado

- `tests/reports/baseline/sera-causal-baseline-v0.1.4.json`

Formato adotado:

- envelope simples com metadata de governança;
- report bruto aprovado embutido no campo `report`.

## 3. Fonte do artefato

- source report: `tests/reports/candidates/methodology-gate-run-1779544197.json`
- run_id: `run-1779542293462`
- fixtures_tested: 9
- n_runs_per_fixture: 3
- total_runs: 27

## 4. Critérios de aceite aplicados

Critérios de baseline causal evidence atendidos:

- `causal_summary.error = 0`
- `causal_summary.fail = 0`
- `causal_summary.partial = 0`
- `causal_summary.determinism_rate = 1`
- sem `actual` vazio
- sem `error` em run
- provider-stable (sem `terminated` e sem `timeout`)

## 5. Resultado do guardrail causal

Comando executado:

```bash
node tests/sera/assert-sera-causal-report-clean.js tests/reports/candidates/methodology-gate-run-1779544197.json
```

Resultado:

- `Causal guardrail OK: freeze conditions satisfied (risk layer not required)`

## 6. Escopo da baseline causal

A baseline criada cobre:

- Perception
- Objective/Goal
- Action
- Preconditions

Em termos de contrato:

- `baseline_type: "causal_classification"`
- `version: "v0.1.4"`
- `scope: "P/O/A + preconditions"`

## 7. Exclusões explícitas da baseline de risco

Esta baseline **não** valida nem congela baseline completa de risco:

- traditional risk matrix
- ARMS/ERC como baseline de risco
- Hendy tactical/strategic risk management
- product risk profile claims

Nota de governança:

- `erc_level` permanece presente como metadata legada da risk layer;
- `erc_level` não é tratado como eixo causal original SERA/Hendy.

## 8. Candidates incluídos

- A0-AUTO-001
- A0-AUTO-003
- A0-AUTO-004-ADJ
- A0-CHK-003
- A0-DAUMAS-E01-B
- A0-DAUMAS-E02-A
- A0-VIS-003
- A0-VIS-004-ADJ
- A0-VIS-005

## 9. Tabela resumida por candidate

| Candidate | Resultado estável A4-h |
|---|---|
| A0-AUTO-001 | P-C/O-A/A-E/2 (3/3 PASS) |
| A0-AUTO-003 | P-D/O-A/A-H/2 (3/3 PASS) |
| A0-AUTO-004-ADJ | P-A/O-A/A-G/3 (3/3 PASS) |
| A0-CHK-003 | P-G/O-A/A-G/3 (3/3 PASS) |
| A0-DAUMAS-E01-B | P-C/O-A/A-E/2 (3/3 PASS) |
| A0-DAUMAS-E02-A | P-A/O-C/A-F/2 (3/3 PASS) |
| A0-VIS-003 | P-G/O-A/A-A/2 (3/3 PASS) |
| A0-VIS-004-ADJ | P-H/O-A/A-A/3 (3/3 PASS) |
| A0-VIS-005 | P-H/O-A/A-A/3 (3/3 PASS) |

## 10. Política de uso do artefato

Este artefato:

- pode ser usado para validação causal;
- não pode ser usado para claims de baseline de risk layer;
- não substitui smoke/global validation;
- não valida traditional matrix, ARMS/ERC e Hendy risk management como baseline de risco.

## 11. Próximos passos

- A4-j: docs consistency update
- A4-k: optional official tag/pre-release decision
- A5: Risk Layer Redesign
