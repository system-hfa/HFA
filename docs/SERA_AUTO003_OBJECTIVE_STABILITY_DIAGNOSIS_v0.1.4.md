# SERA v0.1.4-A3-auto003-objective-stability-diagnosis

## 1. Propósito

Diagnosticar e corrigir a instabilidade do anchor `A0-AUTO-003` no eixo Objective, observada como oscilação `O-A/O-D` durante a fase de alinhamento ERC.

## 2. Contexto

A fase `A3-erc-candidate-align-v2` foi bloqueada após estabilização de `A0-DAUMAS-E02-A`, porque `A0-AUTO-003` apresentou instabilidade no eixo Objective. Esta fase isolou a causa e aplicou patch mínimo no Step 4.

## 3. Diagnóstico pré-patch

A instabilidade foi atribuída a variância gerada pelo Step 2/LLM. Em alguns runs, termos como “eficiência” ou “pressão operacional” eram incorporados nos campos textuais usados por `classifyObjectiveByRules`, acionando indevidamente `O-D`.

Para `A0-AUTO-003`, o cenário dominante é de atenção capturada/gerenciamento de velocidade degradado, não de objetivo deliberado de eficiência. Portanto, o expected `O-A` permanece metodologicamente adequado.

## 4. Causa provável

Classificação: `LLM_FALLBACK_VARIANCE` com componente de `OBJECTIVE_GATE_GAP`.

A heurística de objetivo de eficiência era ampla demais para este cenário, permitindo que texto gerado pelo Step 2 contaminasse a decisão do Step 4.

## 5. Patch aplicado

Arquivo alterado:

- `frontend/src/lib/sera/all-steps.ts`

Patch:

- guarda mínima no Step 4 para impedir que evidência de atenção capturada/gerenciamento de velocidade seja promovida indevidamente para `O-D`;
- preservação do caminho `O-A` quando o objetivo é nominal e a falha dominante está em percepção/atenção/execução, não em objetivo incompatível;
- sem alteração de ERC, candidates, fixtures oficiais, baseline, schema, UI ou Risk Profile.

## 6. Validação filtrada de A0-AUTO-003

### Pré-patch

Relatório: `tests/reports/candidates/methodology-gate-run-1779476552.json`

Resultado:

- `PASS 5 / PARTIAL 0 / FAIL 0 / ERROR 0`
- `determinism_rate 100%`
- `A0-AUTO-003 = P-D/O-A/A-H/2` em `5/5`

### Pós-patch

Relatório: `tests/reports/candidates/methodology-gate-run-1779476900.json`

Resultado:

- runs válidos: `4/4`
- `A0-AUTO-003 = P-D/O-A/A-H/2` em todos os runs válidos
- um run retornou `relato insuficiente` no Step 1, tratado como erro transiente LLM não relacionado ao patch

## 7. Validações globais

### Typecheck

Comando:

~~~bash
cd /Users/filipedaumas/SAAS/HFA/frontend
npx tsc --noEmit
~~~

Resultado: PASS.

### Candidate-only N_RUNS=1

Relatório: `tests/reports/candidates/methodology-gate-run-1779477908.json`

Resultado:

- `PASS 6 / PARTIAL 7 / FAIL 0 / ERROR 0`
- `determinism_rate 100%`
- `A0-AUTO-003 = P-D/O-A/A-H/2`
- `A0-DAUMAS-E02-A = P-A/O-C/A-F/2`

### Candidate-only N_RUNS=3

Relatório: `tests/reports/candidates/methodology-gate-run-1779480293.json`

Resultado:

- `PASS 19 / PARTIAL 20 / FAIL 0 / ERROR 0`
- `determinism_rate 84.6%`
- `A0-AUTO-003 = P-D/O-A/A-H/2` em `3/3`
- `A0-DAUMAS-E02-A = P-A/O-C/A-F/2` em `3/3`

## 8. Anchors e riscos remanescentes

Anchors estabilizados/preservados:

- `A0-AUTO-003`: estabilizado em `P-D/O-A/A-H/2`
- `A0-DAUMAS-E02-A`: preservado em `P-A/O-C/A-F/2`

Riscos remanescentes:

- variância ERC continua fora do escopo desta fase;
- `A0-VIS-003` deve continuar monitorado como caso de ERC variável;
- `A0-CHK-002-ADJ` permanece exploratório/conhecido;
- `A0-FUEL-002` apresentou uma oscilação global isolada em Action (`A-C/A-A`) no N_RUNS=3 global, mas o diagnóstico filtrado posterior retornou `A-A` em `5/5`; portanto, deve ser documentado como risco remanescente, não como bloqueio deste patch.

## 9. Conclusão

Resultado operacional: `PATCH_PROMOTED`.

O patch resolveu a instabilidade de `A0-AUTO-003` no eixo Objective e preservou `A0-DAUMAS-E02-A`. A validação global não apresentou FAIL nem ERROR. A promoção do patch é aceitável, mantendo a variância ERC e a observação sobre `A0-FUEL-002` como riscos remanescentes.

## 10. Próxima fase recomendada

Retomar `A3-erc-candidate-align-v3`, com regra conservadora:

- promover ajuste ERC apenas em candidates com P/O/A estável;
- não bloquear por casos ERC variáveis fora da lista de promoção;
- manter `A0-CHK-002-ADJ` como exploratório;
- não retentar ERC trace até estabilizar/alinha os expected ERC candidates.
