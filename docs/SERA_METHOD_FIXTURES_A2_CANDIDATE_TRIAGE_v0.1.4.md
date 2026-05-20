# SERA v0.1.4-A2-e — Methodology Gate Candidate Triage

## Contexto

- A2-d habilitou harness candidate-only via `scripts/run-sera-methodology-candidates.sh`.
- A2-c materializou 17 candidates em `tests/sera/fixtures-candidates/methodology-gate/`.
- O primeiro run candidate-only (`N_RUNS=1`) resultou em `PASS=0`, `PARTIAL=15`, `FAIL=2`, `ERROR=2`.
- Nesta fase, ERC permanece placeholder técnico e não contrato metodológico final.

## Report analisado

- Path: `tests/reports/candidates/methodology-gate-run-1779245818.json`
- run_id: `run-1779243414695`
- timestamp: `2026-05-20T02:56:58.045Z`
- total_runs: `17`
- n_runs_per_fixture: `1`
- summary: `PASS=0`, `PARTIAL=15`, `FAIL=2`, `ERROR=2`

## Metodologia de triagem

- Separar divergência apenas de ERC placeholder vs divergência de P/O/A.
- Priorizar investigação de itens com erro (`error`) e status `FAIL`.
- Não corrigir motor, não alterar expected e não alterar JSON nesta fase.
- Classificação preliminar por caso:
  - `ERC_PLACEHOLDER_ONLY`
  - `P_AXIS_MISMATCH`
  - `O_AXIS_MISMATCH`
  - `A_AXIS_MISMATCH`
  - `MULTI_AXIS_MISMATCH`
  - `TECHNICAL_ERROR`

## Tabela caso a caso

| ID | Overall | Expected P/O/A/ERC | Actual P/O/A/ERC | Divergência | Categoria | Interpretação | Próxima ação |
|---|---|---|---|---|---|---|---|
| A0-AUTO-001 | PARTIAL | P-C/O-A/A-E/2 | P-A/O-A/A-B/3 | P+A+ERC | MULTI_AXIS_MISMATCH | Deriva para P-A/A-B sugere viés do motor vs expected metodológico. | MOTOR_REVIEW + expected clarity review (sem editar agora). |
| A0-AUTO-003 | PARTIAL | P-D/O-A/A-H/2 | P-A/O-A/A-C/2 | P+A | MULTI_AXIS_MISMATCH | Divergência metodológica em P/A, não explicada por ERC. | MOTOR_REVIEW em heurística P/A temporal. |
| A0-AUTO-004-ADJ | PARTIAL | P-A/O-A/A-G/2 | P-A/O-A/A-B/3 | A+ERC | A_AXIS_MISMATCH | Ação esperada A-G não reproduzida; ERC também diverge. | MOTOR_REVIEW no eixo de ação (feedback/cross-check). |
| A0-CHK-001 | PARTIAL | P-G/O-A/A-A/2 | P-C/O-A/A-B/3 | P+A+ERC | MULTI_AXIS_MISMATCH | Divergência real P/A; não é caso apenas ERC. | MOTOR_REVIEW + revisar discriminators em fase posterior. |
| A0-CHK-002-ADJ | PARTIAL | P-D/O-A/A-H/2 | P-A/O-A/A-B/3 | P+A+ERC | MULTI_AXIS_MISMATCH | Redução para P-A/A-B indica perda da nuance temporal A-H. | MOTOR_REVIEW com foco em emergência/tempo. |
| A0-CHK-003 | PARTIAL | P-G/O-A/A-G/2 | P-A/O-A/A-C/2 | P+A | MULTI_AXIS_MISMATCH | Falha em capturar A-G; convergência para A-C. | MOTOR_REVIEW no reconhecimento de feedback omitido. |
| A0-CONFIG-001 | PARTIAL | P-G/O-A/A-A/2 | P-A/O-A/A-C/2 | P+A | MULTI_AXIS_MISMATCH | Divergência em P/A; objetivo alinhado. | MOTOR_REVIEW no mapeamento de configuração canônica. |
| A0-CONFIG-002 | PARTIAL | P-G/O-A/A-A/2 | P-G/O-A/A-C/2 | A | A_AXIS_MISMATCH | Percepção/objetivo corretos; ação diverge. | MOTOR_REVIEW no eixo A (A-A vs A-C). |
| A0-DAUMAS-E01-B | PARTIAL | P-C/O-A/A-E/2 | P-C/O-A/A-C/2 | A | A_AXIS_MISMATCH | Caso-âncora Daumas com divergência no eixo de ação. | MOTOR_REVIEW em conhecimento automação vs execução. |
| A0-DAUMAS-E02-A | PARTIAL | P-A/O-C/A-F/2 | P-A/O-A/A-F/2 | O | O_AXIS_MISMATCH | Perdeu O-C estrito mesmo com narrativa de awareness explícita. | MOTOR_REVIEW no critério O-C estrito A1-GOV+. |
| A0-DAUMAS-E02-B | PARTIAL | P-D/O-A/A-H/2 | P-G/O-A/A-C/2 | P+A | MULTI_AXIS_MISMATCH | Divergência em P/A no caso-âncora temporal. | MOTOR_REVIEW em P-D/A-H. |
| A0-FUEL-002 | PARTIAL | P-G/O-A/A-A/2 | P-A/O-A/A-B/3 | P+A+ERC | MULTI_AXIS_MISMATCH | Divergência real P/A com adicional de ERC. | MOTOR_REVIEW + revisão posterior de redação de cenário. |
| A0-SEP-002 | FAIL | P-G/O-A/A-A/2 | -/-/-/0 | P+O+A+ERC+erro | TECHNICAL_ERROR | Report trouxe `error: relato insuficiente`; saída vazia derruba todos os eixos. | Bloqueador para rodada ampliada; investigar robustez do relato/harness sem editar agora. |
| A0-SEP-005 | FAIL | P-G/O-A/A-A/2 | -/-/-/0 | P+O+A+ERC+erro | TECHNICAL_ERROR | Mesmo padrão de `relato insuficiente`; provável limitação de parsing/inferência textual. | Bloqueador para rodada ampliada; investigar causa técnica/entrada em fase seguinte. |
| A0-VIS-003 | PARTIAL | P-G/O-A/A-A/2 | P-G/O-A/A-B/3 | A+ERC | A_AXIS_MISMATCH | Caso-âncora acerta P/O, mas falha A. | MOTOR_REVIEW no eixo A para âncora Hendy. |
| A0-VIS-004-ADJ | PARTIAL | P-H/O-A/A-A/2 | P-A/O-A/A-B/3 | P+A+ERC | MULTI_AXIS_MISMATCH | Não capturou P-H por conflito/integração de fontes. | MOTOR_REVIEW no eixo P-H. |
| A0-VIS-005 | PARTIAL | P-H/O-A/A-A/2 | P-A/O-A/A-A/2 | P | P_AXIS_MISMATCH | Ação/objetivo corretos; percepção diverge para P-A. | MOTOR_REVIEW em distinção P-H vs P-A. |

## Resumo quantitativo

- `ERC_PLACEHOLDER_ONLY`: 0
- `P_AXIS_MISMATCH`: 1
- `O_AXIS_MISMATCH`: 1
- `A_AXIS_MISMATCH`: 4
- `MULTI_AXIS_MISMATCH`: 9
- `TECHNICAL_ERROR`: 2
- `EXPECTED_REVIEW` (flag interpretativa): 2 (SEP-002, SEP-005)
- `MOTOR_REVIEW` (flag interpretativa): 15 (todos os PARTIAL)

## Análise dos 15 PARTIAL

- PARTIAL apenas por ERC placeholder: **0**.
- PARTIAL com divergência de P/O/A: **15**.
- Distribuição dos PARTIAL:
  - Multi-axis P/O/A: 9
  - A-only: 4
  - O-only: 1
  - P-only: 1

## Análise dos 2 FAIL

- `A0-SEP-002`: FAIL com `error: relato insuficiente`, atual vazio (`P/O/A` em branco, `erc_level=0`).
- `A0-SEP-005`: FAIL com `error: relato insuficiente`, atual vazio (`P/O/A` em branco, `erc_level=0`).

Causa provável: falha técnica/inferencial no processamento desses relatos (não é mero desacordo de ERC).

## Análise dos 2 ERROR

O summary aponta `ERROR=2`, porém a estrutura `by_fixture` não expõe um `overall=ERROR`; os dois casos aparecem como `overall=FAIL` com campo `error` preenchido.

- `A0-SEP-002`: erro textual `relato insuficiente`.
- `A0-SEP-005`: erro textual `relato insuficiente`.

Interpretação: no schema atual, erros de execução/inferência podem estar sendo contabilizados em `summary.error` e simultaneamente refletidos como `FAIL` por fixture.

## Decisão sobre N_RUNS=3

**Bloqueado (não executado).**

Justificativa contra os critérios condicionais da A2-e:

1. Os 2 ERRORs não foram demonstrados como não-bloqueantes; ambos mostram padrão estrutural (`relato insuficiente`) em casos distintos.
2. Há indício de problema estrutural de inferência para parte dos relatos (não apenas ruído externo temporário).
3. Critério de `>=12/17` com P/O/A corretos ou somente ERC não foi atendido (`0/17`).
4. Casos-âncora têm divergência clara de P/O/A:
   - A0-VIS-003 (A mismatch)
   - A0-AUTO-001 (P+A mismatch)
   - A0-AUTO-003 (P+A mismatch)
   - A0-DAUMAS-E01-B (A mismatch)
   - A0-DAUMAS-E02-A (O mismatch)
   - A0-DAUMAS-E02-B (P+A mismatch)

## N_RUNS=3 não executado

- Motivo: critérios de segurança não satisfeitos.
- Pré-requisitos antes de nova rodada ampliada:
  - triagem técnica dos erros `relato insuficiente`;
  - revisão controlada de qualidade narrativa dos casos com divergência multi-eixo;
  - decisão explícita sobre tratamento de divergências sistemáticas no eixo A e distinções P-H/P-D/P-G/P-A.

## Próxima fase recomendada

- **A2-f**: triagem corretiva controlada (sem baseline), focada em:
  - diagnóstico técnico dos dois casos com erro;
  - revisão metodológica de candidatos com divergência multi-eixo persistente;
  - proposta de ajustes de relato/expected em branch controlada, sem tocar fixtures oficiais.
