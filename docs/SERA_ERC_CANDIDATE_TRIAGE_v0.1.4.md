# SERA ERC Candidate Triage
## v0.1.4-A3-erc-candidate-triage

**Data:** 2026-05-22  
**Fase:** SERA v0.1.4-A3-erc-candidate-triage  
**Tipo:** Triagem de expectativas ERC em candidates metodológicos

## 1. Propósito

Triar os candidates com divergência `expected.erc_level` vs `actual.erc_level` no `main` limpo, decidir ação por fixture e validar se ajustes são promovíveis sem regressão de anchors P/O/A.

## 2. Contexto da auditoria ERC

Com base em `docs/SERA_ERC_INVARIANCE_AUDIT_v0.1.4.md`:
- Não há `erc_question_trace` ativo no código.
- As divergências ERC `2 -> 3` já ocorrem no `main` limpo.
- Os 7 casos foram classificados como `BASELINE_CANDIDATE_DIVERGENCE`.
- Não há evidência de `PATCH_REGRESSION`.

## 3. Escopo e candidates analisados

Candidates triados:
- `A0-AUTO-004-ADJ`
- `A0-CHK-003`
- `A0-CHK-001`
- `A0-FUEL-002`
- `A0-VIS-004-ADJ`
- `A0-VIS-005`
- `A0-CHK-002-ADJ` (exploratório/conhecido)

## 4. Tabela de triagem por fixture

| Fixture | Descrição resumida | Expected atual | Actual main limpo | Decisão | Justificativa | Ação |
|---|---|---|---|---|---|---|
| A0-AUTO-004-ADJ | Falha de cross-check/callout de FMA após ação crítica | P-A/O-A/A-G/ERC2 | P-A/O-A/A-G/ERC3 | UPDATE_EXPECTED_ERC_TO_3 | P/O/A estável no main limpo; divergência recorrente apenas em ERC | Tentativa de ajuste executada e revertida após validação global |
| A0-CHK-003 | Checklist declarado completo com configuração real incompatível | P-G/O-A/A-G/ERC2 | P-G/O-A/A-G/ERC3 | UPDATE_EXPECTED_ERC_TO_3 | P/O/A estável; ERC 3 recorrente no baseline limpo | Tentativa de ajuste executada e revertida após validação global |
| A0-CHK-001 | Prosseguimento com item crítico pendente | P-G/O-A/A-A/ERC2 | P-G/O-A/A-A/ERC3 | UPDATE_EXPECTED_ERC_TO_3 | P/O/A estável; desvio isolado de ERC no baseline | Tentativa de ajuste executada e revertida após validação global |
| A0-FUEL-002 | Cruzamento de mínimo de combustível com detecção tardia | P-G/O-A/A-A/ERC2 | P-G/O-A/A-A/ERC3 | UPDATE_EXPECTED_ERC_TO_3 | P/O/A estável; ERC 3 recorrente no baseline | Tentativa de ajuste executada e revertida após validação global |
| A0-VIS-004-ADJ | Descida sem identificação positiva por fontes independentes | P-H/O-A/A-A/ERC2 | P-H/O-A/A-A/ERC3 | UPDATE_EXPECTED_ERC_TO_3 | P/O/A estável; divergência de ERC consistente no baseline | Tentativa de ajuste executada e revertida após validação global |
| A0-VIS-005 | Conflito radar-visual não resolvido antes de prosseguir | P-H/O-A/A-A/ERC2 | P-H/O-A/A-A/ERC3 | UPDATE_EXPECTED_ERC_TO_3 | P/O/A estável; ERC 3 recorrente no baseline | Tentativa de ajuste executada e revertida após validação global |
| A0-CHK-002-ADJ | Emergência com itens imediatos não iniciados (caso já exploratório) | P-D/O-A/A-H/ERC2 | P-A/O-A/A-A/ERC3 | MOVE_TO_EXPLORATORY | Divergência estrutural de P/O/A + ERC; não é caso para ajuste pontual de ERC | Manter sem alteração JSON nesta fase |

## 5. Decisões tomadas

- `UPDATE_EXPECTED_ERC_TO_3`: recomendado tecnicamente para 6 casos com P/O/A estável no baseline limpo.
- `MOVE_TO_EXPLORATORY`: mantido para `A0-CHK-002-ADJ`.
- `KEEP_EXPECTED_ERC_2`: não selecionado para os 6 casos estáveis.
- `MARK_ERC_REVIEW`: não selecionado como decisão primária nesta rodada.

## 6. Alterações aplicadas nos JSON candidates

Foi feita uma tentativa controlada de ajuste de `expected.erc_level: 2 -> 3` nos 6 candidates estáveis:
- `A0-AUTO-004-ADJ.json`
- `A0-CHK-003.json`
- `A0-CHK-001.json`
- `A0-FUEL-002.json`
- `A0-VIS-004-ADJ.json`
- `A0-VIS-005.json`

Essas alterações **não foram promovidas** e foram revertidas após a validação por regressão de anchor forte P/O/A.

## 7. Validação executada

### Validação JSON
- `python3` (parse dos 7 arquivos) — OK.

### Candidate-only
- Comando: `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`
- Report consolidado: `tests/reports/candidates/methodology-gate-run-1779419635.json`
- Resumo: `PASS 10 | PARTIAL 3 | FAIL 0 | ERROR 0 | determinism_rate 100%`

## 8. Resultado da validação

Apesar de `FAIL=0` e `ERROR=0`, houve mudança em anchor forte (regra bloqueante desta fase):
- `A0-DAUMAS-E02-A`: esperado `P-A/O-C/A-F`, obtido `P-A/O-C/A-A`.

Também permaneceram não-PASS:
- `A0-VIS-003` (ERC voltou a divergir como `2 -> 3` nesta execução)
- `A0-CHK-002-ADJ` (exploratório com divergência de P/O/A e ERC)

Decisão obrigatória aplicada: **rollback completo dos ajustes de JSON candidates**.

## 9. Casos ainda pendentes

1. Estabilizar `A0-DAUMAS-E02-A` para evitar mudança de anchor forte durante qualquer triagem de candidates.
2. Reavaliar `A0-VIS-003`, que oscilou para divergência ERC nesta rodada (na auditoria anterior estava PASS em ERC).
3. Formalizar tratamento de `A0-CHK-002-ADJ` como exploratório fora do gate forte.
4. Só após estabilidade de anchors: retomar promoção de updates ERC nos 6 casos candidatos.

## 10. Conclusão

Resultado da fase: **sucesso documental sem ajuste promovido**.

A triagem identificou 6 candidates com forte indicação de atualização de `expected.erc_level` para 3 no baseline limpo, mas a validação pós-ajuste mostrou regressão de anchor forte P/O/A (`A0-DAUMAS-E02-A`). Por regra metodológica, os JSON candidates foram restaurados e nenhuma alteração de candidate foi promovida.

## 11. Próxima fase recomendada

Executar fase dedicada de estabilidade de gate/anchors antes de nova tentativa de alinhamento ERC em candidates:
1. Repetir candidate-only baseline para confirmar comportamento de `A0-DAUMAS-E02-A` e `A0-VIS-003`.
2. Isolar triagem ERC com bloqueio explícito de promoção se qualquer anchor forte oscilar.
3. Após estabilidade, reaplicar somente ajustes ERC nos 6 candidatos estáveis.
