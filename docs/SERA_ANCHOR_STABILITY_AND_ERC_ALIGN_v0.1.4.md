# SERA v0.1.4-A3-anchor-stability-and-erc-align

## 1. Propósito
Executar auditoria de estabilidade dos anchors metodológicos com candidate-only `N_RUNS=3` no `main` limpo e decidir, de forma condicionada, se era seguro promover o alinhamento de `expected.erc_level` (`2 -> 3`) nos 6 candidates ERC elegíveis.

## 2. Contexto
A triagem anterior indicou 6 candidates com divergência ERC estável no `main` limpo:
- A0-AUTO-004-ADJ
- A0-CHK-003
- A0-CHK-001
- A0-FUEL-002
- A0-VIS-004-ADJ
- A0-VIS-005

Entretanto, a promoção ficou condicionada à estabilidade de anchors fortes, especialmente `A0-DAUMAS-E02-A`, além de ausência de oscilação bloqueante em `A0-VIS-003`.

## 3. Verificação inicial
Repositório validado antes da auditoria:
- `pwd`/top-level: `/Users/filipedaumas/SAAS/HFA`
- branch: `main`
- `HEAD == origin/main`: `SYNCED`
- tracked modified: nenhum

## 4. Auditoria N_RUNS=3 no main limpo
Comando executado:

```bash
SERA_ALLOW_MULTI_RUN=1 SERA_N_RUNS=3 scripts/run-sera-methodology-candidates.sh --run
```

Report consolidado:
- report path: `tests/reports/candidates/methodology-gate-run-1779461829.json`
- run id: `run-1779458331699`
- resumo: `PASS 16 | PARTIAL 23 | FAIL 0 | ERROR 0`
- pass_rate: `41.0%`
- determinism_rate: `84.6%`

## 5. Tabela de estabilidade por fixture

| Fixture | Expected P/O/A/ERC | Runs actual P/O/A/ERC | Estável? | Variação observada | Classificação |
|---|---|---|---|---|---|
| A0-DAUMAS-E02-A | P-A/O-C/A-F/2 | r1 P-A/O-C/A-F/2; r2 P-A/O-C/A-F/2; r3 P-A/O-C/A-A/2 | Não | Oscilação de A (`A-F -> A-A`) | UNSTABLE_POA |
| A0-AUTO-001 | P-C/O-A/A-E/2 | r1 P-C/O-A/A-E/2; r2 P-C/O-A/A-E/2; r3 P-C/O-A/A-E/2 | Sim | Sem variação | STABLE_PASS |
| A0-DAUMAS-E01-B | P-C/O-A/A-E/2 | r1 P-C/O-A/A-E/2; r2 P-C/O-A/A-E/2; r3 P-C/O-A/A-E/2 | Sim | Sem variação | STABLE_PASS |
| A0-AUTO-003 | P-D/O-A/A-H/2 | r1 P-D/O-A/A-H/2; r2 P-D/O-A/A-H/2; r3 P-D/O-A/A-H/2 | Sim | Sem variação | STABLE_PASS |
| A0-DAUMAS-E02-B | P-D/O-A/A-H/2 | r1 P-D/O-A/A-H/2; r2 P-D/O-A/A-H/2; r3 P-D/O-A/A-H/2 | Sim | Sem variação | STABLE_PASS |
| A0-AUTO-004-ADJ | P-A/O-A/A-G/2 | r1 P-A/O-A/A-G/3; r2 P-A/O-A/A-G/3; r3 P-A/O-A/A-G/3 | Sim (POA) | Divergência ERC-only estável (`2 -> 3`) | STABLE_PARTIAL_ERC_ONLY |
| A0-CHK-003 | P-G/O-A/A-G/2 | r1 P-G/O-A/A-G/3; r2 P-G/O-A/A-G/3; r3 P-G/O-A/A-G/3 | Sim (POA) | Divergência ERC-only estável (`2 -> 3`) | STABLE_PARTIAL_ERC_ONLY |
| A0-CHK-001 | P-G/O-A/A-A/2 | r1 P-G/O-A/A-A/3; r2 P-G/O-A/A-A/3; r3 P-G/O-A/A-A/3 | Sim (POA) | Divergência ERC-only estável (`2 -> 3`) | STABLE_PARTIAL_ERC_ONLY |
| A0-FUEL-002 | P-G/O-A/A-A/2 | r1 P-G/O-A/A-A/3; r2 P-G/O-A/A-A/3; r3 P-G/O-A/A-A/3 | Sim (POA) | Divergência ERC-only estável (`2 -> 3`) | STABLE_PARTIAL_ERC_ONLY |
| A0-VIS-003 | P-G/O-A/A-A/2 | r1 P-G/O-A/A-A/3; r2 P-G/O-A/A-A/2; r3 P-G/O-A/A-A/2 | Não (ERC) | Oscilação ERC (`3 -> 2`) | UNSTABLE_ERC |
| A0-VIS-004-ADJ | P-H/O-A/A-A/2 | r1 P-H/O-A/A-A/3; r2 P-H/O-A/A-A/3; r3 P-H/O-A/A-A/3 | Sim (POA) | Divergência ERC-only estável (`2 -> 3`) | STABLE_PARTIAL_ERC_ONLY |
| A0-VIS-005 | P-H/O-A/A-A/2 | r1 P-H/O-A/A-A/3; r2 P-H/O-A/A-A/3; r3 P-H/O-A/A-A/3 | Sim (POA) | Divergência ERC-only estável (`2 -> 3`) | STABLE_PARTIAL_ERC_ONLY |
| A0-CHK-002-ADJ | P-D/O-A/A-H/2 | r1 P-A/O-A/A-A/3; r2 P-A/O-A/A-A/3; r3 P-A/O-A/A-H/3 | Não | Divergência POA + ERC; variação no eixo A | EXPLORATORY_KNOWN |

## 6. Decisão sobre A0-DAUMAS-E02-A
`A0-DAUMAS-E02-A` **não** ficou estável em `3/3` no anchor forte esperado (`P-A/O-C/A-F`).
Houve oscilação para `P-A/O-C/A-A` em um run.

Decisão: critério de promoção falhou (`TAREFA 4.1`).

## 7. Decisão sobre A0-VIS-003
`A0-VIS-003` apresentou oscilação de ERC entre runs (`3, 2, 2`), com alternância de status `PARTIAL/PASS`.

Decisão: caso considerado instável para o gate desta fase (`TAREFA 4.5`).

## 8. Decisão sobre os 6 candidates ERC elegíveis
Os 6 elegíveis mantiveram POA estável e, em 5/6, ERC=3 estável. Contudo, a promoção dependia de todos os critérios da TAREFA 4, incluindo estabilidade total dos anchors fortes.

Como `A0-DAUMAS-E02-A` falhou estabilidade de anchor, a promoção foi bloqueada.

Decisão: **não alterar JSON candidates nesta fase**.

## 9. Alterações aplicadas, se houver
Nenhuma alteração em JSON candidates.

## 10. Validação pós-ajuste N_RUNS=1, se houver
Não aplicável (nenhum ajuste promovido).

## 11. Validação pós-ajuste N_RUNS=3, se houver
Não aplicável (nenhum ajuste promovido).

## 12. Casos mantidos como exploratórios/review
- `A0-CHK-002-ADJ`: mantido como `EXPLORATORY_KNOWN`.
- `A0-VIS-003`: manter em monitoramento por oscilação de ERC.

## 13. Conclusão operacional
**DOCUMENTED_BLOCKED_BY_ANCHOR_INSTABILITY**

Motivo objetivo: critério obrigatório de estabilidade de `A0-DAUMAS-E02-A` em `3/3` não foi atendido.

## 14. Próxima fase recomendada
Executar fase dedicada de estabilização/diagnóstico de anchor para `A0-DAUMAS-E02-A` e `A0-VIS-003` (foco em reprodutibilidade no `main` limpo), antes de qualquer promoção de `expected.erc_level`.

## 15. Limitações
- Auditoria depende da variabilidade observada nesta janela temporal e configuração de execução.
- Não houve alteração de motor/pipeline; portanto, o documento não resolve causa-raiz da oscilação.
- Sem promoção de expected ERC nesta fase, por segurança metodológica.
