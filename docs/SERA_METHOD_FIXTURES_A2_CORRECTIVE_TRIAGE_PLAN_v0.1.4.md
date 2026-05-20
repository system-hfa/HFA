# SERA v0.1.4-A2-f — Corrective Triage Plan for Methodology Gate Candidates

## Contexto

- A2-e analisou o run candidate-only `N_RUNS=1` no report `tests/reports/candidates/methodology-gate-run-1779245818.json`.
- Resultado: `0/17 PASS`, `15 PARTIAL`, `2 FAIL`, `2 ERROR`.
- `PARTIAL` apenas por ERC placeholder: `0`.
- `A0-SEP-002` e `A0-SEP-005` tiveram `error: relato insuficiente`.
- Casos-âncora divergiram em P/O/A: `A0-VIS-003`, `A0-AUTO-001`, `A0-AUTO-003`, `A0-DAUMAS-E01-B`, `A0-DAUMAS-E02-A`, `A0-DAUMAS-E02-B`.
- `N_RUNS=3` permanece bloqueado.

## Escopo

- Fase de diagnóstico e plano corretivo.
- Sem alterações em motor, pipeline/selectors, fixtures oficiais, baseline ou JSON candidates.
- Sem execução `N_RUNS=3`.

## Metodologia de análise

- Comparação programática de `expected` vs `actual` por eixo (P/O/A/ERC).
- Leitura dos 17 JSON candidates em `tests/sera/fixtures-candidates/methodology-gate/`.
- Classificação primária por categoria diagnóstica.
- Proposta de ação futura sem aplicação nesta fase.
- Referência normativa: A1-GOV+ (precedência Hendy > HFA/SERA adaptado > Daumas, O-C estrito, A-A vs A-G, E0-E4).

## Tabela completa

| ID | Overall N1 | Expected | Actual | Divergência | Diagnóstico | Categoria | Ação futura recomendada | Gate status recomendado |
|---|---|---|---|---|---|---|---|---|
| A0-AUTO-001 | PARTIAL | P-C/O-A/A-E/2 | P-A/O-A/A-B/3 | P+A+ERC | Caso-âncora de automação com relato E2 robusto; divergência não parece ruído de ERC. | MOTOR_REVIEW | MOTOR_REVIEW | KEEP_AS_GATE_AFTER_MOTOR_FIX |
| A0-AUTO-003 | PARTIAL | P-D/O-A/A-H/2 | P-A/O-A/A-C/2 | P+A | Narrativa já codifica demanda temporal; motor não preserva P-D/A-H. | MOTOR_REVIEW | MOTOR_REVIEW | KEEP_AS_GATE_AFTER_MOTOR_FIX |
| A0-AUTO-004-ADJ | PARTIAL | P-A/O-A/A-G/2 | P-A/O-A/A-B/3 | A+ERC | Texto já descreve falha de feedback/FMA; divergência concentrada no eixo A. | MOTOR_REVIEW | MOTOR_REVIEW | KEEP_AS_GATE_AFTER_MOTOR_FIX |
| A0-CHK-001 | PARTIAL | P-G/O-A/A-A/2 | P-C/O-A/A-B/3 | P+A+ERC | Relato pode precisar reforçar evidência cognitiva explícita do estado mental antes do prosseguimento. | DESCRIPTION_TOO_THIN | ENRICH_DESCRIPTION | KEEP_AS_GATE_AFTER_DESCRIPTION_FIX |
| A0-CHK-002-ADJ | PARTIAL | P-D/O-A/A-H/2 | P-A/O-A/A-B/3 | P+A+ERC | Distinção P-D/A-H pode estar rigorosa vs comportamento atual do motor; gatilho paramétrico pode não estar suficientemente operacionalizado no texto. | EXPECTED_TOO_STRICT | REVIEW_EXPECTED | MOVE_TO_EXPLORATORY |
| A0-CHK-003 | PARTIAL | P-G/O-A/A-G/2 | P-A/O-A/A-C/2 | P+A | Cenário descreve check falho, mas faltam marcas cognitivas/temporais explícitas para sustentar A-G de forma inequívoca para o motor. | DESCRIPTION_TOO_THIN | ENRICH_DESCRIPTION | KEEP_AS_GATE_AFTER_DESCRIPTION_FIX |
| A0-CONFIG-001 | PARTIAL | P-G/O-A/A-A/2 | P-A/O-A/A-C/2 | P+A | Caso canônico E1 e curto para gate automático nesta versão do motor. | MOVE_TO_EXPLORATORY | MOVE_TO_EXPLORATORY | MOVE_TO_EXPLORATORY |
| A0-CONFIG-002 | PARTIAL | P-G/O-A/A-A/2 | P-G/O-A/A-C/2 | A | Caso E1 curto com divergência recorrente em A; melhor manter fora de gate até reforço textual. | MOVE_TO_EXPLORATORY | MOVE_TO_EXPLORATORY | MOVE_TO_EXPLORATORY |
| A0-DAUMAS-E01-B | PARTIAL | P-C/O-A/A-E/2 | P-C/O-A/A-C/2 | A | Evidência E3 forte (Daumas) preserva P/O; divergência no eixo A sugere lacuna do motor. | MOTOR_REVIEW | MOTOR_REVIEW | KEEP_AS_GATE_AFTER_MOTOR_FIX |
| A0-DAUMAS-E02-A | PARTIAL | P-A/O-C/A-F/2 | P-A/O-A/A-F/2 | O | Caso-âncora de O-C estrito com awareness explícita; motor reduz para O-A. | MOTOR_REVIEW | MOTOR_REVIEW | KEEP_AS_GATE_AFTER_MOTOR_FIX |
| A0-DAUMAS-E02-B | PARTIAL | P-D/O-A/A-H/2 | P-G/O-A/A-C/2 | P+A | Evidência E3 forte e divergência em P/A alinhada ao padrão de perda de nuance temporal no motor. | MOTOR_REVIEW | MOTOR_REVIEW | KEEP_AS_GATE_AFTER_MOTOR_FIX |
| A0-FUEL-002 | PARTIAL | P-G/O-A/A-A/2 | P-A/O-A/A-B/3 | P+A+ERC | Caso E2 com narrativa razoável, mas precisa explicitar melhor percepção equivocada e momento de detecção. | DESCRIPTION_TOO_THIN | ENRICH_DESCRIPTION | KEEP_AS_GATE_AFTER_DESCRIPTION_FIX |
| A0-SEP-002 | FAIL | P-G/O-A/A-A/2 | -/-/-/0 | P+O+A+ERC + error | `error: relato insuficiente`; saída vazia indica falha técnica/inferencial antes da classificação útil. | TECHNICAL_ERROR | TECHNICAL_INVESTIGATION | MOVE_TO_EXPLORATORY |
| A0-SEP-005 | FAIL | P-G/O-A/A-A/2 | -/-/-/0 | P+O+A+ERC + error | `error: relato insuficiente`; padrão idêntico ao SEP-002. | TECHNICAL_ERROR | TECHNICAL_INVESTIGATION | MOVE_TO_EXPLORATORY |
| A0-VIS-003 | PARTIAL | P-G/O-A/A-A/2 | P-G/O-A/A-B/3 | A+ERC | Âncora forte em P/O; divergência apenas em A sugere fricção de fronteira A-A vs A-B. | EXPECTED_REVIEW | REVIEW_EXPECTED | KEEP_AS_GATE_AFTER_MOTOR_FIX |
| A0-VIS-004-ADJ | PARTIAL | P-H/O-A/A-A/2 | P-A/O-A/A-B/3 | P+A+ERC | P-H exige integração de fontes; texto pode precisar tornar o conflito de evidências mais explícito/operacional. | EXPECTED_TOO_STRICT | ENRICH_DESCRIPTION | KEEP_AS_GATE_AFTER_DESCRIPTION_FIX |
| A0-VIS-005 | PARTIAL | P-H/O-A/A-A/2 | P-A/O-A/A-A/2 | P | Divergência concentrada em P-H vs P-A; cenário pode requerer reforço da ambiguidade radar/visual para manter P-H. | EXPECTED_TOO_STRICT | ENRICH_DESCRIPTION | KEEP_AS_GATE_AFTER_DESCRIPTION_FIX |

## 2 FAIL/ERROR — relato insuficiente

### A0-SEP-002

- JSON existe e parseia corretamente: sim.
- `description` (131 chars) é curta para um caso de separação com fronteira espacial.
- Variável/limite/desvio observável: presentes, mas com baixa densidade operacional (faltam referência de limite, timeline, ação de correção).
- Evidência para P/O/A: insuficiente para o motor atual, apesar de racional metodológico existir.
- Motivo provável de `relato insuficiente`: texto pouco rico em contexto cognitivo e sinais operacionais explícitos.
- Correção provável futura (sem aplicar agora): `ENRICH_DESCRIPTION` + `MOVE_TO_EXPLORATORY` temporário + `TECHNICAL_INVESTIGATION` do comportamento de erro.

### A0-SEP-005

- JSON existe e parseia corretamente: sim.
- `description` (182 chars) é melhor que SEP-002, mas ainda enxuta para separação lateral dinâmica.
- Variável/limite/desvio observável: presentes, porém sem detalhar janela temporal, distância relativa ou decisões intermediárias.
- Evidência para P/O/A: insuficiente para inferência robusta no estado atual do motor.
- Motivo provável de `relato insuficiente`: estrutura textual ainda curta para o padrão de extração do pipeline.
- Correção provável futura (sem aplicar agora): `ENRICH_DESCRIPTION` + `MOVE_TO_EXPLORATORY` temporário + `TECHNICAL_INVESTIGATION`.

## Casos-âncora divergentes

### A0-VIS-003

- Expected metodologicamente forte: sim (âncora Hendy para P-G/O-A/A-A).
- Actual do motor: `P-G/O-A/A-B`.
- Divergência: eixo A.
- Evidência no texto: boa, mas a fronteira A-A vs A-B ainda pode estar subespecificada.
- Recomendação: `REVIEW_EXPECTED` focal (fronteira A-A/A-B) + `MOTOR_REVIEW`; manter em gate.

### A0-AUTO-001

- Expected metodologicamente forte: sim.
- Actual: `P-A/O-A/A-B`.
- Divergência: P + A.
- Evidência no texto: suficiente (E2, descrição detalhada).
- Recomendação: `MOTOR_REVIEW`; manter em gate.

### A0-AUTO-003

- Expected metodologicamente forte: sim.
- Actual: `P-A/O-A/A-C`.
- Divergência: P + A.
- Evidência no texto: suficiente para P-D/A-H.
- Recomendação: `MOTOR_REVIEW`; manter em gate.

### A0-DAUMAS-E01-B

- Expected metodologicamente forte: sim (E3 Daumas).
- Actual: `P-C/O-A/A-C`.
- Divergência: A.
- Evidência no texto: rica.
- Recomendação: `MOTOR_REVIEW`; manter em gate.

### A0-DAUMAS-E02-A

- Expected metodologicamente forte: sim (O-C estrito com awareness explícita).
- Actual: `P-A/O-A/A-F`.
- Divergência: O.
- Evidência no texto: rica e explícita para O-C.
- Recomendação: `MOTOR_REVIEW` prioritário para regra O-C estrito; manter em gate.

### A0-DAUMAS-E02-B

- Expected metodologicamente forte: sim (E3 Daumas para P-D/A-H).
- Actual: `P-G/O-A/A-C`.
- Divergência: P + A.
- Evidência no texto: rica.
- Recomendação: `MOTOR_REVIEW`; manter em gate.

## Resumo quantitativo

### Categorias principais

- `DESCRIPTION_TOO_THIN`: 3
- `EXPECTED_TOO_STRICT`: 3
- `EXPECTED_REVIEW`: 1
- `MOTOR_REVIEW`: 6
- `ERC_PLACEHOLDER_IRRELEVANT`: 0
- `TECHNICAL_ERROR`: 2
- `MOVE_TO_EXPLORATORY`: 2
- `KEEP_AS_GATE_AFTER_DESCRIPTION_FIX`: 5
- `KEEP_AS_GATE_AFTER_MOTOR_FIX`: 7

### Ações futuras recomendadas (sem aplicar)

- `NO_CHANGE`: 0
- `ENRICH_DESCRIPTION`: 5
- `REVIEW_EXPECTED`: 2
- `MOVE_TO_EXPLORATORY`: 3
- `MOTOR_REVIEW`: 6
- `TECHNICAL_INVESTIGATION`: 2
- `REMOVE_FROM_GATE`: 0
- `KEEP_GATE`: 9

## Plano recomendado para A2-g

**Opção E — Combinação controlada**

1. Enriquecer descriptions priorizando: `A0-SEP-002`, `A0-SEP-005`, `A0-CHK-001`, `A0-CHK-003`, `A0-FUEL-002`, `A0-VIS-004-ADJ`, `A0-VIS-005`.
2. Revisar expected de fronteira em `A0-VIS-003` e `A0-CHK-002-ADJ` antes de re-run.
3. Rebaixar temporariamente para exploratório: `A0-CONFIG-001`, `A0-CONFIG-002`, e manter `A0-SEP-002/A0-SEP-005` fora de gate até zerar erro técnico.
4. Abrir trilha separada de `MOTOR_REVIEW` para anchors fortes Daumas/Hendy.

## Critérios para próximo N_RUNS=1

- `0` casos com `TECHNICAL_ERROR`.
- Descriptions reforçadas nos casos com baixa densidade operacional/cognitiva.
- Casos em gate com evidência E2+ explicitada no texto (quando aplicável).
- `17/17` JSON parse válidos.
- Sem alterações de motor nesta etapa de preparação.

## Decisão sobre N_RUNS=3

`N_RUNS=3` permanece bloqueado até novo `N_RUNS=1` mostrar melhora material (principalmente eliminação de erro técnico e redução de divergências multi-eixo).

## Próxima fase recomendada

**SERA v0.1.4-A2-g — Controlled candidate JSON correction**

- corrigir somente descriptions/expected selecionados de candidates;
- manter isolamento em `fixtures-candidates`;
- sem tocar fixtures oficiais e baseline;
- rodar apenas candidate-only `N_RUNS=1` após correções controladas.
