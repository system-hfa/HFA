# SERA Question Trace P/O/A — Rejected Attempt
## v0.1.4-A3-d5d

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d5d  
**Tipo:** Registro documental de tentativa rejeitada por segurança metodológica

## 1. Contexto

A tentativa A3-d5d buscou preencher `raw_llm_output.question_trace` para perguntas dos eixos Perception/Objective/Action com base em `nos_percorridos` e `decision_trace`, mantendo caráter observacional.

## 2. Escopo tentado

Arquivos alterados temporariamente durante a tentativa:
- `frontend/src/lib/sera/pipeline.ts`
- `docs/SERA_QUESTION_TRACE_POA_v0.1.4.md`

Nenhum commit de código foi realizado.

## 3. Validação executada

- Typecheck: `npx tsc --noEmit` (passou)
- Candidate-only `N_RUNS=1`:
  - `report id`: `run-1779398042221`
  - `report path`: `tests/reports/candidates/methodology-gate-run-1779398725.json`
  - `PASS 5 / PARTIAL 8 / FAIL 0 / ERROR 0`
  - `determinism_rate: 100%`

## 4. Motivo da rejeição

Houve mudança em anchor forte proibida para fase observacional:
- `A0-DAUMAS-E02-A`
- esperado: `P-A / O-C / A-F`
- obtido no patch: `P-A / O-C / A-A`

Como A3-d5d não pode alterar comportamento classificatório, a tentativa foi bloqueada.

## 5. Ações de rollback aplicadas

```bash
git restore frontend/src/lib/sera/types.ts frontend/src/lib/sera/pipeline.ts
rm -f docs/SERA_QUESTION_TRACE_POA_v0.1.4.md
```

Estado após rollback: sem tracked modified (apenas `tests/reports/candidates/` untracked).

## 6. Aprendizagem

- Mesmo sem intenção classificatória, lógica adicional no pós-processamento pode interferir indiretamente no caminho de classificação.
- Próxima tentativa deve minimizar acoplamento e evitar tocar helpers compartilhados por qualquer parte sensível do pipeline.
- Antes de nova tentativa, priorizar desenho mais restritivo de isolamento para garantir invariância de anchors fortes.
