# SERA Unsafe Act/Condition Trace — Rejected Attempt
## v0.1.4-A3-d3-review

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d3-review  
**Tipo:** Registro documental de tentativa rejeitada (sem alteração de código)

---

## 1. Título e contexto

A fase A3-d3 tentou separar `unsafe_act`/`unsafe_condition` em `raw_llm_output.step1_step2_explicit_trace`.  
A fase era observacional e não deveria alterar classificação P/O/A/ERC.

## 2. Escopo tentado

Arquivos locais alterados temporariamente durante a tentativa rejeitada:

- `frontend/src/lib/sera/types.ts`
- `frontend/src/lib/sera/pipeline.ts`
- `docs/SERA_UNSAFE_ACT_CONDITION_TRACE_v0.1.4.md`

Nenhum commit/push foi realizado para essa tentativa rejeitada.

## 3. Validações

- Typecheck passou.
- Candidate-only `N_RUNS=1`:
  - `report id`: `run-1779391842166`
  - `report path`: `tests/reports/candidates/methodology-gate-run-1779392700.json`
  - `PASS 4 / PARTIAL 9 / FAIL 0 / ERROR 0`
  - `determinism_rate: 100%`

## 4. Motivo da rejeição

Houve mudança classificatória inesperada em anchor forte:

- `A0-DAUMAS-E02-A`
- esperado/action anchor: `A-F`
- atual no patch rejeitado: `A-A`

`A0-CHK-002-ADJ` continuou divergente, mas já era exploratório/conhecido.  
Como A3-d3 era observacional, qualquer mudança P/O/A em anchor forte bloqueia commit.

## 5. Decisão

Patch A3-d3 rejeitado.

Alterações locais foram descartadas com:

```bash
git restore frontend/src/lib/sera/pipeline.ts frontend/src/lib/sera/types.ts
rm -f docs/SERA_UNSAFE_ACT_CONDITION_TRACE_v0.1.4.md
```

Estado final voltou a `HEAD == origin/main`.

## 6. Aprendizagem metodológica

- Separar `unsafe_act`/`unsafe_condition` por heurística no mesmo helper do trace pode interferir indiretamente na classificação ou alterar objetos compartilhados.
- Próxima tentativa deve ser pós-processamento isolado, read-only, calculado depois da finalização de P/O/A/ERC.
- Não deve modificar nem reaproveitar objetos mutáveis de `step3`/`step4`/`step5`/`step6_7`.
- Deve usar cópias imutáveis dos dados já finalizados.

## 7. Regra para futura A3-d3b

- `unsafe_act`/`unsafe_condition` trace só pode ser calculado após P/O/A/ERC finalizados.
- Helper deve ser puro, read-only e sem efeitos colaterais.
- Candidate-only precisa comparar P/O/A/ERC antes/depois, se possível.
- Não commitar se qualquer anchor forte mudar.

## 8. Próxima fase recomendada

- Não retentar A3-d3 imediatamente.
- Seguir para A3-d4 `direct_actor`/`actor_level` experimental (menor risco), ou fazer A3-d3b somente com desenho de isolamento antes de código.
