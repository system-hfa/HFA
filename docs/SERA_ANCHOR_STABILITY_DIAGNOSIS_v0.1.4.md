# SERA v0.1.4-A3-anchor-stability-diagnosis-and-fix

## 1. Propósito
Diagnosticar e corrigir, com patch mínimo e metodologicamente justificado, a instabilidade de anchor em `A0-DAUMAS-E02-A` e diagnosticar a oscilação de ERC em `A0-VIS-003`.

## 2. Contexto
A fase anterior bloqueou o alinhamento ERC por instabilidade de anchors:
- `A0-DAUMAS-E02-A`: oscilação de Action (`A-F` vs `A-A`)
- `A0-VIS-003`: oscilação de ERC (`2` vs `3`)

Estado inicial desta fase:
- repo: `/Users/filipedaumas/SAAS/HFA`
- branch: `main`
- `HEAD == origin/main`
- sem tracked modified.

## 3. Estado inicial
Verificação inicial executada e aprovada:
- caminho e top-level corretos
- branch `main`
- `SYNCED`
- sem tracked modified
- untracked permitidos: `AGENTS.md`, `tests/reports/candidates/`

## 4. Diagnóstico de A0-DAUMAS-E02-A

### 4.1 Evidência observada
No relatório multi-run anterior (`methodology-gate-run-1779461829.json`) houve:
- `P-A/O-C/A-F/2`
- `P-A/O-C/A-F/2`
- `P-A/O-C/A-A/2`

Em execução filtrada pré-patch (`N_RUNS=5`, lista reduzida por `SERA_FIXTURE_LIST`):
- report: `tests/reports/candidates/methodology-gate-run-1779463243.json`
- Action por run: `A-A, A-F, A-F, A-A, A-F`
- distribuição Action: `A-F=3`, `A-A=2`
- determinism_rate: `0.0%`

Nos runs com `A-A`, o caminho mostrou `Gate A-A (O-D)` no Step 5, apesar de Step 4 estar em `O-C`.

### 4.2 Causa provável
Classificação: `ACTION_GATE_GAP` com componente `LLM_FALLBACK_VARIANCE`.

Causa-raiz local identificada:
- o Step 5 aceitava `forcedObjective=O-D` por heurística textual ampla em `objectiveDecisionText`;
- isso permitia `Gate A-A (O-D)` em caso com evidência de violação consciente de limites mínimos (perfil O-C), competindo indevidamente com o caminho para `A-F`.

### 4.3 Resposta às perguntas obrigatórias
- A ação `A-F` está explicitamente sustentada pelo relato? Sim: continuidade da aproximação abaixo de mínimos com decisão consciente.
- `A-A` estava sendo escolhido por fallback/LLM? Parcialmente: em parte por gate determinístico `A-A (O-D)` indevido; em parte via ramo LLM em outros contextos.
- `A-A perception-anchored` capturava indevidamente este caso? Não foi o mecanismo observado neste anchor.
- Há evidência textual de wrong selection/action para gate determinístico? Sim.
- Candidate ambíguo? Não, o anchor é forte e bem discriminado.

## 5. Diagnóstico de A0-VIS-003

### 5.1 Evidência observada
No multi-run global anterior e nesta fase:
- POA manteve `P-G/O-A/A-A`
- a oscilação ocorreu no ERC (`2` e `3`) em execuções globais

Execução filtrada dedicada (`N_RUNS=5`):
- report: `tests/reports/candidates/methodology-gate-run-1779463601.json`
- resultado: `PASS 5/5`
- POA: estável `P-G/O-A/A-A`
- ERC: estável em `2` nos 5 runs

Execução global pós-patch (`N_RUNS=3`):
- report: `tests/reports/candidates/methodology-gate-run-1779468641.json`
- `A0-VIS-003`: `2, 2, 3` (POA estável, ERC variável)

### 5.2 Causa provável
Classificação: `ERC_LLM_VARIANCE`.

Justificativa:
- não houve oscilação em P/O/A;
- a variação apareceu apenas no ERC em corrida global;
- em corrida filtrada, ERC ficou estável.

Conclusão operacional: variação de ERC parece sensível ao contexto de execução e não a instabilidade de classificação POA.

## 6. Runs filtrados executados
O script não suporta `--filter`. Foi usado método seguro com `SERA_FIXTURE_LIST` apontando para lista temporária de 1 fixture.

### 6.1 A0-DAUMAS-E02-A (pré-patch)
- comando: `SERA_ALLOW_MULTI_RUN=1 SERA_N_RUNS=5 SERA_FIXTURE_LIST=/tmp/sera-filter-A0-DAUMAS-E02-A.txt ...`
- report: `methodology-gate-run-1779463243.json`
- distribuição Action: `A-F=3`, `A-A=2`

### 6.2 A0-VIS-003
- comando: `SERA_ALLOW_MULTI_RUN=1 SERA_N_RUNS=5 SERA_FIXTURE_LIST=/tmp/sera-filter-A0-VIS-003.txt ...`
- report: `methodology-gate-run-1779463601.json`
- distribuição POA/ERC: `P-G/O-A/A-A/2` em `5/5`

### 6.3 A0-DAUMAS-E02-A (pós-patch)
- comando: igual ao 6.1
- report: `methodology-gate-run-1779464336.json`
- distribuição Action: `A-F=5`, `A-A=0`

## 7. Causa provável por fixture
- `A0-DAUMAS-E02-A`: `ACTION_GATE_GAP`
- `A0-VIS-003`: `ERC_LLM_VARIANCE`

## 8. Decisão: patch, candidate adjust ou documentação
Decisão: `PATCH_PROMOTED` (código), sem ajuste de candidate JSON.

Critérios atendidos:
- causa local clara em Step 5
- patch mínimo
- alinhado à regra metodológica (O-D não deve prevalecer em cenário de desvio consciente de limite)
- sem alteração de arquitetura, schema, UI, runner ou baseline

## 9. Alterações aplicadas
Arquivo alterado:
- `frontend/src/lib/sera/all-steps.ts`

Patch aplicado:
1. inclusão de `objectiveDecisionNorm` no Step 5;
2. inclusão de helper `evidenceOfKnownLimitDeviationContinuation(text)`;
3. endurecimento do gate `A-A (O-D)` com bloqueio adicional:
   - não disparar O-D quando houver padrão de violação de limite operacional com continuidade consciente.

## 10. Validações executadas

### 10.1 Typecheck
- comando: `cd frontend && npx tsc --noEmit`
- resultado: OK

### 10.2 Candidate-only N_RUNS=1 (global)
- report: `tests/reports/candidates/methodology-gate-run-1779465490.json`
- resumo: `PASS 6 | PARTIAL 7 | FAIL 0 | ERROR 0 | det 100%`
- `A0-DAUMAS-E02-A`: `P-A/O-C/A-F/2` (PASS)

### 10.3 Candidate-only N_RUNS=3 (global)
- report: `tests/reports/candidates/methodology-gate-run-1779468641.json`
- resumo: `PASS 17 | PARTIAL 22 | FAIL 0 | ERROR 0 | det 92.3%`
- `A0-DAUMAS-E02-A`: `P-A/O-C/A-F/2` em `3/3`

## 11. Resultado de estabilidade pós-validação

### 11.1 Anchor crítico A0-DAUMAS-E02-A
Estável em `3/3` no padrão esperado forte:
- `P-A/O-C/A-F/2`

### 11.2 Anchor A0-VIS-003
POA estável (`P-G/O-A/A-A`) e ERC variável em corrida global (`2,2,3`).

### 11.3 Anchors fortes
Não houve novo `UNSTABLE_POA` nos anchors fortes avaliados; variações observadas foram de ERC em casos já conhecidos.

## 12. Riscos remanescentes
1. Variância de ERC persiste em alguns casos (`A0-VIS-003`, `A0-DAUMAS-E02-B`, `A0-FUEL-002`) em corrida global.
2. O pacote de candidates continua com divergências ERC esperadas (`2`) vs atuais (`3`) em casos triados.
3. `A0-CHK-002-ADJ` segue exploratório por divergência estrutural de POA/ERC.

## 13. Próxima fase recomendada
Executar fase dedicada de estabilização/normalização de ERC (sem tocar P/O/A), com foco em:
- política de expected ERC em candidates triados;
- eventual redução de variância ERC por regra determinística local quando metodologicamente inequívoca;
- separação explícita entre gate de anchor POA e gate de ERC para promoção de candidates.

## 14. Conclusão
A causa-raiz da instabilidade de `A0-DAUMAS-E02-A` foi identificada e corrigida com patch mínimo, preservando governança metodológica. O anchor crítico foi estabilizado em `3/3` sem regressão de POA em anchors fortes. A oscilação de `A0-VIS-003` permaneceu restrita ao eixo ERC e foi documentada para fase específica.
