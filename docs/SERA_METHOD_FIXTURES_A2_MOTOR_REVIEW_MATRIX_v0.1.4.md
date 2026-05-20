# SERA v0.1.4-A2-h — Methodology Gate Motor Review Matrix

## Contexto

- A2-g eliminou ruído técnico (`FAIL/ERROR`) no conjunto executado.
- Gate candidate atual executado: 13 casos.
- Resultado do report atual: `PASS=0`, `PARTIAL=13`, `FAIL=0`, `ERROR=0`.
- Divergência residual é metodológica em eixos P/O/A, não mais erro de parsing/run.

## Escopo

- Diagnóstico técnico de divergência report→motor.
- Sem patch em motor/pipeline/selectors/prompts.
- Sem alteração de fixtures candidates/oficiais ou baseline.
- Sem `N_RUNS=3`.

## Report analisado

- Principal: `tests/reports/candidates/methodology-gate-run-1779284578.json`
- Comparativo: `tests/reports/candidates/methodology-gate-run-1779245818.json`
- Summary principal:
  - `total_runs=13`
  - `PASS=0`
  - `PARTIAL=13`
  - `FAIL=0`
  - `ERROR=0`

## Agrupamento por padrão de divergência

| Padrão | IDs | Regra A1-GOV+ esperada | Heurística provável do motor | Arquivo/função provável | Risco | Tipo de ação futura |
|---|---|---|---|---|---|---|
| `P-D -> P-A` + `A-H -> A-C` | `A0-AUTO-003`, `A0-DAUMAS-E02-B` | Pressão temporal explícita e gerenciamento temporal de execução (`P-D/A-H`) | Step 3 exige evidência perceptiva explícita e pode cair em `P-A`; Step 5 cai em branch de execução (`A-B/A-C`) quando o nó 1 responde “Sim” | `frontend/src/lib/sera/all-steps.ts:1887-1891`, `2915-2945` | HIGH | `MOTOR_SELECTOR_RULE` |
| `P-D -> P-A` + `A-H -> A-B` | `A0-CHK-002-ADJ` | `P-D/A-H` sob emergência e priorização temporal | Mesmo padrão acima com tendência a classificar omissão (`A-B`) | `all-steps.ts:2785-2792`, `2895-2902`, `2915-2945` | HIGH | `MOVE_TO_EXPLORATORY` |
| `P-C -> P-A` + `A-E -> A-C` | `A0-AUTO-001` | Gap de conhecimento de automação (`P-C/A-E`) | Sem gatilho lexical técnico suficiente para `A-E`; Step 5 classifica como monitoramento da própria ação (`A-C`) | `all-steps.ts:2719-2726`, `2875-2882`, `pipeline.ts:133-141` | HIGH | `MOTOR_GUARD` |
| `A-E -> A-C` (P preservado) | `A0-DAUMAS-E01-B` | `A-E` em anchor Daumas de knowledge gap | Gate de execução prevalece sobre decisão/conhecimento quando texto contém “não verificou/monitorou” | `all-steps.ts:2915-2945`, `pipeline.ts:143-150` | MEDIUM | `PATCH_ONLY_WITH_SELECTIVE_REGRESSION` |
| `P-G -> P-A` + `A-A -> A-B` | `A0-CHK-001`, `A0-FUEL-002` | Falha de monitoramento (`P-G`) e ação coerente com percepção errada (`A-A`) | Filtro “evidência perceptiva explícita” puxa para `P-A`; Step 5 identifica omissão procedural (`A-B`) | `all-steps.ts:1901-1919`, `1929-1931`, `2895-2902`, `2993-3005` | MEDIUM | `DESCRIPTION_REVIEW` |
| `P-G -> P-A` + `A-G -> A-B` | `A0-CHK-003` | Feedback/check esperado omitido (`A-G`) | `A-G` no motor é restrito a supervisão/delegação; sem isso, cai para omissão (`A-B`) | `all-steps.ts:2741-2750`, `2936-2942` | HIGH | `MOTOR_SELECTOR_RULE` |
| `A-G -> A-B` (P preservado) | `A0-AUTO-004-ADJ` | Falha de verificação FMA pós-ação (`A-G`) | Mesmo viés: `A-G` restrito a supervisão/terceiro, não feedback da própria decisão | `all-steps.ts:500`, `2741-2750`, `2875-2882` | HIGH | `MOTOR_GUARD` |
| `P-H -> P-A` + `A-A -> A-B` | `A0-VIS-004-ADJ` | Conflito de fontes/informação não integrado (`P-H`) | Step 3 não reconhece como falha de canal recebido e classifica como decisão sem evidência perceptiva explícita | `all-steps.ts:1832-1838`, `1929-1931` | MEDIUM | `DESCRIPTION_REVIEW` |
| `P-H -> P-A` | `A0-VIS-005` | Conflito radar x visual (`P-H`) | Modelo interpreta como “decisão inadequada” em vez de conflito de informação recebida | `all-steps.ts:1832-1838`, `pipeline.ts:214-224` | MEDIUM | `DESCRIPTION_REVIEW` |
| `A-A -> A-B` (P/O preservados) | `A0-VIS-003` | A1-GOV+ manteve `A-A` (fronteira com `A-B`) | Step 5 tende a mapear “não manteve limite” como omissão procedural | `all-steps.ts:2895-2902`, `2993-3005` | MEDIUM | `EXPECTED_REVIEW` |
| `O-C -> O-D` + `A-F -> A-A` | `A0-DAUMAS-E02-A` | O-C estrito por awareness explícita de mínimo/regra | Classificador objetivo por regra identifica termos de eficiência e força `O-D`; branch de ação com objetivo O-D favorece `A-A` | `frontend/src/lib/sera/rules/objective/select.ts:195-199`, `all-steps.ts:2439-2455`, `2805-2812` | HIGH | `SAFE_SMALL_GUARD_CANDIDATE` |

## Tabela completa dos 13 casos

| ID | Expected | Actual | Divergência | Regra A1-GOV+ | Evidência textual | Padrão | Provável causa no motor | Arquivo/função provável | Risco de patch | Recomendação |
|---|---|---|---|---|---|---|---|---|---|---|
| A0-AUTO-001 | P-C/O-A/A-E | P-A/O-A/A-C | P+A | Anchor de knowledge gap em automação | E2, descrição explícita de FD/acoplamento | `P-C->P-A`, `A-E->A-C` | Falta gatilho robusto para `A-E`; fallback execução | `all-steps.ts` Step5 gates | HIGH | `KEEP_EXPECTED_MOTOR_REVIEW` |
| A0-AUTO-003 | P-D/O-A/A-H | P-A/O-A/A-C | P+A | Anchor de demanda temporal e gestão de tempo | E2, sobrecarga operacional explícita | `P-D->P-A`, `A-H->A-C` | Step3/Step5 favorecem decisão/execução genérica | `runStep3`, `runStep5` | HIGH | `KEEP_EXPECTED_MOTOR_REVIEW` |
| A0-AUTO-004-ADJ | P-A/O-A/A-G | P-A/O-A/A-B | A | A-G por falta de verificação FMA pós-ação | E2, callout/confirm explícitos | `A-G->A-B` | `A-G` muito restrito a supervisão/delegação | `all-steps.ts:2741-2750` | HIGH | `PATCH_ONLY_WITH_SELECTIVE_REGRESSION` |
| A0-CHK-001 | P-G/O-A/A-A | P-A/O-A/A-B | P+A | Monitoramento + ação coerente | E2, item crítico pendente | `P-G->P-A`, `A-A->A-B` | Critério perceptivo muito estrito + omissão procedural | `runStep3`, `runStep5` | MEDIUM | `DESCRIPTION_REVIEW` |
| A0-CHK-002-ADJ | P-D/O-A/A-H | P-A/O-A/A-B | P+A | Caso temporal com gatilho paramétrico | E2, já marcado para revisão | `P-D->P-A`, `A-H->A-B` | Mesmo viés temporal; caso já sinalizado fora de gate | JSON context + `runStep3/5` | MEDIUM | `MOVE_TO_EXPLORATORY` |
| A0-CHK-003 | P-G/O-A/A-G | P-A/O-A/A-B | P+A | A-G com feedback/check explícito omitido | E2, checklist declarado vs estado real | `P-G->P-A`, `A-G->A-B` | Mapeamento de A-G dependente de supervisor/terceiro | `all-steps.ts` gates A-G | HIGH | `PATCH_ONLY_WITH_SELECTIVE_REGRESSION` |
| A0-DAUMAS-E01-B | P-C/O-A/A-E | P-C/O-A/A-C | A | Anchor Daumas forte para A-E | E3, evidência cognitiva robusta | `A-E->A-C` | Branch execução domina classificação de ação | `runStep5` | MEDIUM | `KEEP_EXPECTED_MOTOR_REVIEW` |
| A0-DAUMAS-E02-A | P-A/O-C/A-F | P-A/O-D/A-A | O+A | Anchor O-C estrito | E3, awareness explícita de mínimos | `O-C->O-D`, `A-F->A-A` | Regra objetiva lexical de eficiência supera O-C | `objective/select.ts`, `runStep4` | HIGH | `SAFE_SMALL_GUARD_CANDIDATE` |
| A0-DAUMAS-E02-B | P-D/O-A/A-H | P-A/O-A/A-C | P+A | Anchor temporal Daumas | E3, atenção capturada por contexto operacional | `P-D->P-A`, `A-H->A-C` | Mesmo viés dos casos temporais | `runStep3`, `runStep5` | HIGH | `KEEP_EXPECTED_MOTOR_REVIEW` |
| A0-FUEL-002 | P-G/O-A/A-A | P-A/O-A/A-B | P+A | Monitoramento combustível | E2, crossing do mínimo explícito | `P-G->P-A`, `A-A->A-B` | Predomínio de omissão procedural | `runStep3`, `runStep5` | MEDIUM | `DESCRIPTION_REVIEW` |
| A0-VIS-003 | P-G/O-A/A-A | P-G/O-A/A-B | A | Fronteira A-A vs A-B mantida em A2-g | E2, MDA crossing explícito | `A-A->A-B` | Critério de ação trata crossing como omissão | `runStep5` | MEDIUM | `EXPECTED_REVIEW_BEFORE_PATCH` |
| A0-VIS-004-ADJ | P-H/O-A/A-A | P-A/O-A/A-B | P+A | P-H por integração incompleta de fontes | E2, múltiplas fontes independentes | `P-H->P-A`, `A-A->A-B` | Canal de informação não reconhecido como P-H | `runStep3 Gate P-H` | MEDIUM | `DESCRIPTION_REVIEW` |
| A0-VIS-005 | P-H/O-A/A-A | P-A/O-A/A-A | P | P-H por conflito radar/visual | E2, conflito de fontes explícito | `P-H->P-A` | Interpretação de “decisão” domina sobre “comunicação/informação” | `runStep3`, `pipeline inferPerception` | MEDIUM | `DESCRIPTION_REVIEW` |

## Análise dos anchors fortes

### A0-AUTO-001
- Anchor forte: knowledge gap de automação (Hendy/Daumas alinhado).
- Eixo divergente: `P-C -> P-A`, `A-E -> A-C`.
- Expected deve ser preservado: sim.
- Mudança provável: guard explícito para `A-E` quando há acoplamento FD/AP + interpretação equivocada sem treinamento/familiaridade.
- Risco regressão: médio-alto em fixtures oficiais `A-E`/`A-C` (ex.: `TEST-A-E-001`, `TEST-A-C-001`).

### A0-AUTO-003
- Anchor forte: pressão temporal operacional.
- Eixo divergente: `P-D -> P-A`, `A-H -> A-C`.
- Expected deve ser preservado: sim.
- Mudança provável: priorizar `P-D` quando há carga temporal explícita + tarefa concorrente; reduzir colapso para execução genérica.
- Risco regressão: alto em casos `P-D` oficiais (`TEST-A-I-*`, `TEST-A-J-*`, `TEST-GEN-AI-*`).

### A0-AUTO-004-ADJ
- Anchor forte: A-G por verificação FMA esperada pós-ação.
- Eixo divergente: `A-G -> A-B`.
- Expected deve ser preservado: sim.
- Mudança provável: ampliar `A-G` para “feedback/check esperado da própria decisão crítica” (não só supervisão/terceiro).
- Risco regressão: alto com possíveis colisões em `A-B/A-C` (ex.: `TEST-A-B-001`, `TEST-A-C-001`, `TEST-A-G-001`).

### A0-DAUMAS-E01-B
- Anchor forte: E3 com evidência cognitiva direta.
- Eixo divergente: `A-E -> A-C`.
- Expected deve ser preservado: sim.
- Mudança provável: regra de precedência para knowledge-gap de automação antes da branch de omissão/feedback.
- Risco regressão: médio em casos de execução que usam linguagem de “não verificou”.

### A0-DAUMAS-E02-A
- Anchor forte: caso mais limpo de O-C estrito por awareness explícita.
- Eixo divergente: `O-C -> O-D` e `A-F -> A-A`.
- Expected deve ser preservado: sim.
- Mudança provável: guard objetivo que bloqueie `O-D` quando há evidência explícita de cruzamento consciente de mínimo/regra.
- Risco regressão: médio; alvo mais isolável se guard for específico de awareness.

### A0-DAUMAS-E02-B
- Anchor forte: temporal/atenção em aproximação offshore (E3).
- Eixo divergente: `P-D -> P-A`, `A-H -> A-C`.
- Expected deve ser preservado: sim.
- Mudança provável: mesmo conjunto de ajustes de `A0-AUTO-003`.
- Risco regressão: alto no cluster temporal.

## Mapeamento de arquivos/funções prováveis

### Percepção
- `frontend/src/lib/sera/all-steps.ts:1832-1838` (`Gate P-H`) e `1901-1919` (`Gate P-G`) são críticos para `P-H/P-G`.
- `frontend/src/lib/sera/all-steps.ts:1929-1931` fallback explícito para `P-A` quando “sem percepção”.
- `frontend/src/lib/sera/pipeline.ts:236-237` força `P-A` em alguns cenários por objetivo/ação.

### Objetivo
- `frontend/src/lib/sera/rules/objective/select.ts:195-199` classifica `O-D` por termos de eficiência.
- `frontend/src/lib/sera/all-steps.ts:2439-2455` aplica regra determinística imediatamente quando `classifyObjectiveByRules` retorna código.
- Guard de O-C consciente está em `all-steps.ts:1533-1574` e em `2528-2534`, mas atua no ramo em que O-C é selecionado pelo fluxo, não necessariamente contra override `O-D`.

### Ação
- `frontend/src/lib/sera/all-steps.ts:2915-2945` branch de execução tende a resolver para `A-B/A-C`.
- `frontend/src/lib/sera/all-steps.ts:2741-2750` define `A-G` com foco em supervisão/delegação.
- `frontend/src/lib/sera/all-steps.ts:2785-2792` gate temporal para `A-H`.
- `frontend/src/lib/sera/all-steps.ts:2895-2902` `A-B` por omissão procedural específica.

## Matriz de risco de patch

| Patch candidato | Objetivo | Casos que resolveria | Arquivos prováveis | Risco regressão | Testes seletivos necessários | Recomendação |
|---|---|---|---|---|---|---|
| Guard `O-C` com awareness explícita de mínimo/regra antes de aceitar `O-D` lexical | Evitar `O-C -> O-D` em caso com consciência explícita | `A0-DAUMAS-E02-A` | `rules/objective/select.ts`, `all-steps.ts runStep4` | MEDIUM | Regressão seletiva em oficiais `O-C/O-D` (`TEST-GEN-OC-*`, `TEST-ESCAPE-DISPATCH-001`, `TEST-ESCAPE-DESIGN-001`) | `MOTOR_GUARD` (primeiro candidato) |
| Regra `P-D` para demanda temporal explícita com competição atencional | Reduzir `P-D -> P-A` | `A0-AUTO-003`, `A0-DAUMAS-E02-B`, `A0-CHK-002-ADJ` | `all-steps.ts runStep3` | HIGH | Regressão em `P-D` oficiais (`TEST-A-I-*`, `TEST-A-J-*`, `TEST-GEN-AI-*`) | `DEFER` até guard de O-C |
| Regra `A-H` para priorização temporal explícita | Reduzir `A-H -> A-B/A-C` | `A0-AUTO-003`, `A0-DAUMAS-E02-B`, `A0-CHK-002-ADJ` | `all-steps.ts runStep5` | HIGH | Regressão em `A-H` oficiais (`TEST-A-H-002`, `TEST-GEN-AH-001`) | `PATCH_ONLY_WITH_SELECTIVE_REGRESSION` |
| Regra `P-C/A-E` para gap de automação/FD | Reduzir `P-C/A-E -> P-A/A-C` | `A0-AUTO-001`, `A0-DAUMAS-E01-B` | `all-steps.ts runStep3/5`, `pipeline.ts` | HIGH | Regressão em `A-E` e `A-C` oficiais (`TEST-A-E-001`, `TEST-A-C-*`) | `DEFER` |
| Regra `A-G` para feedback/check explícito pós-decisão (não só supervisão de terceiro) | Reduzir `A-G -> A-B` | `A0-AUTO-004-ADJ`, parcialmente `A0-CHK-003` | `all-steps.ts` gates A-G/A-C/A-B | HIGH | Regressão cruzada com `TEST-A-G-*`, `TEST-A-B-*`, `TEST-A-C-*` | `DEFER` |
| Ajuste de fronteira `A-A` vs `A-B` | Avaliar `A0-VIS-003` | `A0-VIS-003` | `all-steps.ts` branch execução/coerência | MEDIUM | Regressão em `A-A` oficiais (`TEST-GEN-OB-*`, `TEST-GEN-OC-*`) | `EXPECTED_REVIEW` antes de patch |

## Regressões seletivas recomendadas antes de qualquer patch

1. Regressão por eixo objetivo (`O-C/O-D`):
   - fixtures oficiais com `O-C` e `O-D` (`TEST-GEN-OC-*`, `TEST-ESCAPE-DISPATCH-001`, `TEST-ESCAPE-DESIGN-001`).
2. Regressão por cluster de ação (`A-B/A-C/A-G/A-H/A-E`):
   - `TEST-A-B-001`, `TEST-A-C-001`, `TEST-A-G-001`, `TEST-A-H-002`, `TEST-A-E-001`.
3. Regressão por percepção (`P-C/P-D/P-G/P-H`):
   - `TEST-A-E-001`, `TEST-A-I-*`, `TEST-GEN-OB-*`, `TEST-GEN-OC-*`.
4. Reexecução candidate-only do gate (13) após qualquer patch único.

## Decisão sobre N_RUNS=3

- `N_RUNS=3` permanece bloqueado nesta fase.

## Próxima fase recomendada

- **Opção A + E combinadas**:
  - **A2-i**: aplicar **um patch pequeno e isolado** de guard `O-C` com awareness explícita (sem mexer ainda em P/A).
  - Rodar regressão seletiva oficial (`O-C/O-D` + amostra de `A-A/A-B/A-C`) antes de qualquer patch adicional.
  - Só depois decidir segunda passada para clusters `P-D/A-H` e `P-C/A-E`.
