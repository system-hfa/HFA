# SERA v0.1.4-A3-erc-candidate-align-v2

## 1. Propósito
Executar, em fase fechada, o alinhamento condicionado de `expected.erc_level` dos candidates metodológicos que demonstraram estabilidade P/O/A e divergência ERC-only, após estabilização do anchor A0-DAUMAS-E02-A via patch mínimo em `all-steps.ts` na fase anterior.

## 2. Contexto
A fase `SERA_ANCHOR_STABILITY_DIAGNOSIS_v0.1.4` resolveu a instabilidade de Action em `A0-DAUMAS-E02-A` via patch local (gate A-A/O-D endurecido). O anchor A0-DAUMAS-E02-A ficou estável em `P-A/O-C/A-F/2` em 3/3 runs pós-patch. Esta fase foi planejada para executar o alinhamento ERC nos 6 candidates triados como elegíveis nas fases anteriores.

Estado inicial do repositório:
- Repo: `/Users/filipedaumas/SAAS/HFA`
- Branch: `main`
- HEAD: `1371c6a2507bb2ee9517fd209ca3ec3df80785b8`
- origin/main: `1371c6a2507bb2ee9517fd209ca3ec3df80785b8`

## 3. Verificação inicial
Executada com sucesso antes de qualquer ação:
- pwd/top-level: `/Users/filipedaumas/SAAS/HFA` ✓
- branch: `main` ✓
- HEAD == origin/main: `SYNCED` ✓
- tracked modified: nenhum ✓
- untracked permitidos: `AGENTS.md`, `tests/reports/candidates/`

## 4. Auditoria N_RUNS=3 pré-ajuste

Comando executado:
```bash
SERA_ALLOW_MULTI_RUN=1 SERA_N_RUNS=3 scripts/run-sera-methodology-candidates.sh --run
```

Report consolidado gerado:
- path: `tests/reports/candidates/methodology-gate-run-1779472121.json`
- run_id: `run-1779469230638`
- timestamp: `2026-05-22T17:48:41.684Z`
- 13 fixtures × 3 runs = 39 chamadas

Resumo:
- PASS 14 | PARTIAL 25 | FAIL 0 | ERROR 0
- pass_rate: 35.9%
- determinism_rate: 84.6%
- exit status: 1 (pass_rate abaixo de 70% — esperado, não bloqueante para auditoria)

## 5. Tabela de estabilidade e elegibilidade por fixture

| Fixture | Expected P/O/A/ERC | Runs actual P/O/A/ERC | P/O/A estável? | ERC estável? | Classificação | Elegível para update? | Decisão |
|---|---|---|---|---|---|---|---|
| A0-DAUMAS-E02-A | P-A/O-C/A-F/2 | r1: P-A/O-C/A-F/2; r2: P-A/O-C/A-F/2; r3: P-A/O-C/A-F/2 | **SIM** | SIM (2/2/2) | STABLE_PASS | — | ÂNCORA CRÍTICA ESTÁVEL ✓ |
| A0-AUTO-001 | P-C/O-A/A-E/2 | 3/3 P-C/O-A/A-E/2 | SIM | SIM | STABLE_PASS | — | Anchor forte preservado |
| A0-DAUMAS-E01-B | P-C/O-A/A-E/2 | 3/3 P-C/O-A/A-E/2 | SIM | SIM | STABLE_PASS | — | Anchor forte preservado |
| **A0-AUTO-003** | P-D/O-A/A-H/2 | r1: P-D/O-A/A-H/2; r2: P-D/O-A/A-H/2; r3: P-D/**O-D**/A-H/2 | **NÃO** (O divergiu O-A→O-D em r3) | SIM | **UNSTABLE_POA** | — | **BLOQUEANTE** — nova instabilidade em anchor forte |
| A0-DAUMAS-E02-B | P-D/O-A/A-H/2 | r1: P-D/O-A/A-H/2; r2: P-D/O-A/A-H/**3**; r3: P-D/O-A/A-H/2 | SIM (`objective_consistent: true`) | NÃO (ERC oscilou 2/3/2) | STABLE_POA_UNSTABLE_ERC | — | POA estável, ERC instável; não é candidate |
| A0-AUTO-004-ADJ | P-A/O-A/A-G/2 | 3/3 P-A/O-A/A-G/**3** | SIM | SIM (3/3/3) | STABLE_PARTIAL_ERC_ONLY | **SIM** | Individualmente elegível; **BLOQUEADO** por critério global #2 |
| A0-CHK-001 | P-G/O-A/A-A/2 | 3/3 P-G/O-A/A-A/**3** | SIM | SIM (3/3/3) | STABLE_PARTIAL_ERC_ONLY | **SIM** | Individualmente elegível; **BLOQUEADO** por critério global #2 |
| A0-CHK-003 | P-G/O-A/A-G/2 | 3/3 P-G/O-A/A-G/**3** | SIM | SIM (3/3/3) | STABLE_PARTIAL_ERC_ONLY | **SIM** | Individualmente elegível; **BLOQUEADO** por critério global #2 |
| A0-FUEL-002 | P-G/O-A/A-A/2 | 3/3 P-G/O-A/A-A/**3** | SIM | SIM (3/3/3) | STABLE_PARTIAL_ERC_ONLY | **SIM** | Individualmente elegível; **BLOQUEADO** por critério global #2 |
| A0-VIS-003 | P-G/O-A/A-A/2 | r1: P-G/O-A/A-A/**3**; r2: P-G/O-A/A-A/2; r3: P-G/O-A/A-A/**3** | SIM | **NÃO** (ERC oscilou 3/2/3) | UNSTABLE_ERC | NÃO (por default e ERC instável) | DOCUMENTED_ERC_UNSTABLE |
| A0-VIS-004-ADJ | P-H/O-A/A-A/2 | 3/3 P-H/O-A/A-A/**3** | SIM | SIM (3/3/3) | STABLE_PARTIAL_ERC_ONLY | **SIM** | Individualmente elegível; **BLOQUEADO** por critério global #2 |
| A0-VIS-005 | P-H/O-A/A-A/2 | 3/3 P-H/O-A/A-A/**3** | SIM | SIM (3/3/3) | STABLE_PARTIAL_ERC_ONLY | **SIM** | Individualmente elegível; **BLOQUEADO** por critério global #2 |
| A0-CHK-002-ADJ | P-D/O-A/A-H/2 | r1: P-A/O-A/A-A/2; r2: P-A/O-A/A-B/3; r3: P-A/O-A/A-B/3 | **NÃO** (P e A divergem) | **NÃO** | EXPLORATORY_KNOWN | NÃO (excluído) | Exploratório, mantido sem alteração |

## 6. Critérios globais avaliados

| Critério | Status | Observação |
|---|---|---|
| 1. A0-DAUMAS-E02-A = P-A/O-C/A-F em 3/3 | ✓ **ATENDIDO** | 3/3 PASS com P-A/O-C/A-F/2; `fully_deterministic: true` |
| 2. Nenhum anchor forte P/O/A com nova instabilidade | ✗ **FALHOU** | A0-AUTO-003: `objective_consistent: false`; O oscilou O-A (2/3) → O-D (1/3). Inexistente em fase anterior (3/3 PASS). |
| 3. A0-CHK-002-ADJ permanece exploratório | ✓ **ATENDIDO** | JSON não alterado |
| 4. Nenhuma alteração de código necessária | ✓ **ATENDIDO** | Nenhum código, motor, runner ou schema alterado |

**Critério global #2 FALHOU.** Por regra metodológica obrigatória, nenhum JSON candidate foi alterado.

### Detalhe da falha: A0-AUTO-003 run 3
O gate `classifyObjectiveByRules O-D` disparou em run 3 com `objetivo_identificado: "eficiência/economia operacional"`, produzindo `O-D` em vez de `O-A`. Runs 1 e 2 foram determinísticos com `O-A` via gate `Gate O-A anti O-C`. Trata-se de fronteira LLM entre objetivo operacional nominal (O-A) e objetivo de eficiência operacional (O-D) no cenário de velocidade abaixo da faixa segura com atenção capturada. Não estava presente nas fases anteriores com N_RUNS=3.

## 7. JSONs alterados
**Nenhum.** Fase bloqueada por critério global #2 antes de qualquer modificação.

Lista de arquivos candidatos que *teriam* sido alterados se os critérios globais passassem:
- `tests/sera/fixtures-candidates/methodology-gate/A0-AUTO-004-ADJ.json`
- `tests/sera/fixtures-candidates/methodology-gate/A0-CHK-001.json`
- `tests/sera/fixtures-candidates/methodology-gate/A0-CHK-003.json`
- `tests/sera/fixtures-candidates/methodology-gate/A0-FUEL-002.json`
- `tests/sera/fixtures-candidates/methodology-gate/A0-VIS-004-ADJ.json`
- `tests/sera/fixtures-candidates/methodology-gate/A0-VIS-005.json`

## 8. Validação JSON
Não aplicável — nenhum JSON alterado.

## 9. Validação N_RUNS=1 pós-ajuste
Não aplicável — nenhum ajuste promovido.

## 10. Validação N_RUNS=3 pós-ajuste
Não aplicável — nenhum ajuste promovido.

## 11. Casos não ajustados e motivo

### 6 candidates elegíveis (BLOQUEADOS por critério global #2)
Todos os 6 candidates abaixo atenderam individualmente **todos** os critérios de elegibilidade da TAREFA 4 (itens 1-10), mas foram bloqueados pelo critério global #2:

| Fixture | POA runs | ERC runs | `fully_deterministic` | Elegibilidade individual |
|---|---|---|---|---|
| A0-AUTO-004-ADJ | 3/3 P-A/O-A/A-G | 3/3 ERC=3 | true | ELEGÍVEL |
| A0-CHK-001 | 3/3 P-G/O-A/A-A | 3/3 ERC=3 | true | ELEGÍVEL |
| A0-CHK-003 | 3/3 P-G/O-A/A-G | 3/3 ERC=3 | true | ELEGÍVEL |
| A0-FUEL-002 | 3/3 P-G/O-A/A-A | 3/3 ERC=3 | true | ELEGÍVEL |
| A0-VIS-004-ADJ | 3/3 P-H/O-A/A-A | 3/3 ERC=3 | true | ELEGÍVEL |
| A0-VIS-005 | 3/3 P-H/O-A/A-A | 3/3 ERC=3 | true | ELEGÍVEL |

### A0-VIS-003 (ERC instável)
POA estável (P-G/O-A/A-A em 3/3). ERC oscilou (3/2/3): `erc_consistent: false`. Padrão consistente com fases anteriores. Não elegível por ERC instável e por default da fase.

### A0-DAUMAS-E02-B (ERC instável em anchor)
POA estável (P-D/O-A/A-H em 3/3; `objective_consistent: true`, `action_consistent: true`). ERC oscilou em 1 run (ERC=3 em run 1, ERC=2 em runs 0 e 2). Não é candidate para update de ERC nesta fase. Se o padrão persistir, requer diagnóstico específico para A0-DAUMAS-E02-B.

### A0-AUTO-003 (anchor bloqueante — nova O-instabilidade)
Causa identificada: gate LLM `classifyObjectiveByRules O-D` disparou em run 3 com texto de fronteira, classificando o objetivo como O-D (eficiência/economia) em vez de O-A (objetivo operacional nominal). P e A permaneceram estáveis. Requer diagnóstico e eventual patch determinístico antes da próxima fase.

### A0-CHK-002-ADJ (exploratório)
Divergência estrutural em P, A e ERC persiste. Mantido como exploratório sem alteração.

## 12. Resultado operacional

**DOCUMENTED_BLOCKED_BY_ANCHOR_INSTABILITY**

Motivo objetivo: critério global #2 falhou. `A0-AUTO-003` apresentou nova instabilidade no eixo Objetivo (`objective_consistent: false`), com O-D em 1/3 runs versus O-A esperado. Esta instabilidade não estava presente na fase anterior (3/3 PASS em `SERA_ANCHOR_STABILITY_AND_ERC_ALIGN`).

**Nota importante sobre A0-DAUMAS-E02-A:** o anchor crítico que bloqueou as duas fases anteriores está **ESTÁVEL** nesta fase — 3/3 PASS com `P-A/O-C/A-F/2`, `fully_deterministic: true`. O bloqueio desta fase é causado por instabilidade secundária em A0-AUTO-003, não em A0-DAUMAS-E02-A.

## 13. Próxima fase recomendada

Executar diagnóstico específico de A0-AUTO-003:
1. Analisar o gate `classifyObjectiveByRules O-D` para este cenário (velocidade abaixo da faixa segura com atenção capturada)
2. Verificar se O-D está sendo ativado indevidamente quando o contexto é temporal (P-D) e não de eficiência/economia
3. Se o gate O-D é determinístico neste path, avaliar se o discriminador de O-A vs O-D precisa de critério adicional
4. Se necessário, aplicar patch mínimo ou discriminador explícito para este caso (análogo ao patch de A0-DAUMAS-E02-A)
5. Após estabilização de A0-AUTO-003, retornar ao alinhamento ERC dos 6 candidates confirmados como elegíveis

**Candidates confirmados elegíveis para próxima fase** (aguardando resolução de A0-AUTO-003):
- A0-AUTO-004-ADJ, A0-CHK-001, A0-CHK-003, A0-FUEL-002, A0-VIS-004-ADJ, A0-VIS-005

## 14. Limitações
- Auditoria executada com N_RUNS=3; instabilidade de A0-AUTO-003 observada em 1/3 runs (fronteira LLM O-A/O-D)
- FAIL=0, ERROR=0 em todos os 39 runs — sem falhas técnicas no runner
- A0-VIS-003 continua com ERC instável (padrão 3/2/3) — consistente com documentação anterior
- A0-DAUMAS-E02-B mostra nova ERC instabilidade (ERC=3 em 1 run); POA permanece estável — não bloqueante para P/O/A global
- Nenhum código, motor, pipeline, runner, schema ou fixture oficial foi alterado nesta fase
