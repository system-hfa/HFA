# SERA v0.1.4-A2-i — Isolated O-C Awareness Guard

## Contexto

- A2-h identificou divergência limpa em `A0-DAUMAS-E02-A`: `O-C -> O-D`.
- A divergência era incompatível com a regra A1-GOV+ de O-C estrito quando há awareness explícita de mínimo/regra cruzado.
- Esta fase aplicou patch mínimo e isolado no eixo Objetivo.
- P/A ficaram fora do escopo de alteração de código.

## Escopo

- Eixo Objetivo apenas.
- Guard de `O-C` com awareness explícita de limite/regra + continuidade do desvio.
- Sem alteração de JSON candidates, fixtures oficiais, baseline ou smoke global.
- Sem `N_RUNS=3`.

## Causa técnica identificada

1. `runStep4` usa `classifyObjectiveByRules(objectiveDecisionText)` e, quando retorna código não nulo, fecha decisão de objetivo de forma determinística imediatamente.
   - Referência: `frontend/src/lib/sera/all-steps.ts:2430-2457`.
2. `classifyObjectiveByRules` tinha regra lexical de eficiência (`O-D`) sem um guard específico para awareness explícita de mínimos/regras cruzados em continuidade.
   - Referência: `frontend/src/lib/sera/rules/objective/select.ts:131-176`, `195-199`.
3. O guard de consciência (`hasConsciousObjectiveDeviationEvidence`) existente em `all-steps.ts` atua no caminho pós-LLM quando `O-C` já foi escolhido pelo fluxo, não interceptando o caso em que `classifyObjectiveByRules` força `O-D` antes.
   - Referência: `frontend/src/lib/sera/all-steps.ts:1533-1574`, `2528-2534`.

Conclusão: o ponto mínimo e mais isolado era no próprio `classifyObjectiveByRules`.

## Regra implementada

Foi adicionado helper em `objective/select.ts`:

- `hasExplicitConsciousMinimumOrRuleDeviation(text)`

A regra exige combinação simultânea de quatro blocos:

1. awareness explícita (`consciencia explicita`, `ciente`, `aware`, `knowingly`, etc.);
2. limite/regra/procedimento explícito (`minimos`, `limite de visibilidade`, `ceiling minimum`, `regra`, `procedimento`, etc.);
3. marca de desvio/crossing (`ultrapassad`, `violou`, `descumpr`, `crossed`, etc.);
4. continuidade/prosseguimento (`continuou`, `prosseguiu`, `manteve`, `proceeded`, etc.).

Somente quando os quatro grupos estão presentes o classificador determinístico retorna `O-C` com precedência sobre `O-D` lexical.

Exclusões implícitas: resultado ruim, pressão genérica, risco alto ou “deveria saber” sem awareness explícita não disparam o guard.

## Arquivos alterados

- `frontend/src/lib/sera/rules/objective/select.ts`
- `docs/SERA_METHOD_FIXTURES_A2_OC_AWARENESS_GUARD_v0.1.4.md`

`frontend/src/lib/sera/all-steps.ts` não foi alterado.

## Validações executadas

### 1) Typecheck

- Comando: `cd ~/Documents/HFA/frontend && npx tsc --noEmit`
- Resultado: **PASS**.

### 2) Candidate-only N_RUNS=1

- Comando: `cd ~/Documents/HFA && SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`
- Report: `tests/reports/candidates/methodology-gate-run-1779290932.json`
- Summary:
  - `total_runs=13`
  - `PASS=1`
  - `PARTIAL=12`
  - `FAIL=0`
  - `ERROR=0`
  - `determinism_rate=1`

### 3) Regressões seletivas oficiais O-C/O-D

Executadas sem smoke global:

- `SERA_N_RUNS=1 npx tsx tests/sera/run.ts --filter TEST-GEN-OC --compact` -> PASS (8/8)
- `SERA_N_RUNS=1 npx tsx tests/sera/run.ts --filter TEST-ESCAPE --compact` -> PASS (8/8)
- O-D individuais (até 5 IDs):
  - `TEST-GEN-OD-003` -> PASS
  - `TEST-O-D-001` -> PASS
  - `TEST-ESCAPE-DESIGN-001` -> PASS
  - `TEST-GEN-OD-002` -> PASS
  - `TEST-ESCAPE-DISPATCH-001` -> PASS

## Resultado em A0-DAUMAS-E02-A (antes/depois)

- Antes (report `methodology-gate-run-1779284578.json`):
  - expected: `P-A / O-C / A-F`
  - actual: `P-A / O-D / A-A`
  - overall: `PARTIAL`

- Depois (report `methodology-gate-run-1779290932.json`):
  - expected: `P-A / O-C / A-F`
  - actual: `P-A / O-C / A-F`
  - overall: `PASS`

## Riscos remanescentes

- O patch atua no eixo Objetivo e pode impactar fronteiras `O-C/O-D` em narrativas com vocabulário ambíguo.
- Não resolve explicitamente clusters de P/A (`P-D/A-H`, `P-C/A-E`, `A-G`), que permanecem para fase posterior.
- O ganho em A0-DAUMAS-E02-A incluiu melhora de A, mas sem alteração de código no Step 5 nesta fase.

## Próxima fase recomendada

- **A2-j**: triagem do próximo cluster (preferencialmente `P-D/A-H` ou `P-C/A-E`) com regressão seletiva antes de patch.
- `N_RUNS=3` permanece bloqueado até nova decisão formal.
