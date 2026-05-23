# Real Event Trial 001 — Guardrail Patch v0.1.4
Status: PATCH_IMPLEMENTED_PENDING_HUMAN_REVIEW  
Phase: A4+R-24 — Trial 001 Guardrail Patch for Legacy Active-Failure Contamination

## 1. Purpose
Implementar guardrails mínimos para bloquear contaminação metodológica herdada (motor legado orientado a "falha ativa direta") e impedir outputs downstream (HFACS/risk) quando a consistência causal falhar.

## 2. Files changed
- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/pipeline.ts`
- `frontend/src/lib/sera/rules/action/A-D.json`
- `frontend/src/app/(dashboard)/events/[id]/page.tsx`
- `docs/real-event-harvest/REAL_EVENT_TRIAL_001_GUARDRAIL_PATCH_v0.1.4.md`

## 3. Failures addressed
- Herança de conclusão textual direta sem respeitar códigos finais.
- Falso positivo A-D por linguagem de sistema/equipamento/alerta/torque sem incapacidade física humana explícita.
- Contradições semânticas na conclusão (`P-A`/`O-A`/`A-A`).
- Contaminação downstream com HFACS e Risk/ERC em análise causal inconsistente.

## 4. Legacy contamination mitigation
Mitigação aplicada de forma pontual, sem refatoração ampla:
- pós-processamento de consistência causal na montagem do payload final;
- fallback de conclusão code-aware quando inconsistência é detectada;
- enriquecimento de `raw_llm_output.causal_consistency` para governar renderização downstream.

## 5. Guardrail A-D
### Mudanças
- `all-steps.ts`: adicionado anti-gate para detectar contexto dominante de degradação de sistema/barreira da aeronave sem evidência física humana explícita.
- `all-steps.ts`: bloqueio do gate determinístico `A-D` nesses casos.
- `all-steps.ts`: remapeamento defensivo de saídas `A-D` (inclusive branches LLM) quando detectado falso positivo por sistema/barreira.
- `A-D.json`: remoção do termo lexical isolado `torque` de `positive_evidence`.
- `pipeline.ts`: fallback `inferActionCode` endurecido para não inferir `A-D` por sinais de sistema/barreira sem indício físico humano explícito.

### Efeito esperado
Expressões como "warning system did not generate an alert", "EGPWS/GPWS", "aircraft system", "engine torque increased" não devem, por si só, classificar `A-D`.

## 6. Semantic guardrail for P-A/O-A/A-A
### Mudanças
- `pipeline.ts`: criação de helpers:
  - `detectCodeSemanticContradictions(...)`
  - `detectUnsupportedAd(...)`
  - `buildCodeAwareConclusion(...)`
  - `applyCausalConsistencyGuard(...)`
- `buildAnalysisUpsertPayload(...)` passa a:
  - avaliar consistência causal entre códigos finais e conclusão;
  - substituir conclusão por versão code-aware quando inconsistência for detectada;
  - persistir metadados de consistência em `raw_llm_output.causal_consistency`.

### Regra coberta
- `P-A` não pode ser narrado como falha de percepção.
- `O-A` não pode ser narrado como falha/inadequação de objetivo.
- `A-A` não pode ser narrado como falha de ação.

## 7. HFACS suppression/caveat
### Mudanças
- `page.tsx`: se `raw_llm_output.causal_consistency.passed === false`:
  - suprime renderização automática de HFACS;
  - exibe caveat explícito de inconsistência causal e necessidade de revisão humana.

## 8. Risk/ERC suppression/caveat
### Mudanças
- `page.tsx`: se `raw_llm_output.causal_consistency.passed === false`:
  - suprime card de Risk/ERC;
  - exibe mensagem: "Risk layer not validated — causal analysis requires review.".

## 9. Not addressed in this phase
- Redesign completo do escape point.
- Redesign da A5 Risk Layer.
- Criação de JSON candidates.
- Trials 002–005.
- Promoção de baseline.
- Refatoração ampla de prompts/engine.

## 10. Escape point note
O viés decision-centered do escape point foi apenas registrado; não houve redesign estrutural nesta fase.

## 11. Validations executed
- Typecheck local do frontend (`npx tsc --noEmit`).
- Inspeção de fixtures A-D oficiais e busca de runners seletivos sem smoke global.
- Verificação de diff final restrita a arquivos autorizados.

## 12. Next steps
- Revisão humana deste patch.
- Rerun controlado de `TRIAL-SET1-001` para validar os guardrails.
- Manter bloqueados os trials 002–005 até 001 passar assurance.

## 13. Assurance status after patch
- Patch implementado em escopo mínimo autorizado.
- Trials 002–005 continuam bloqueados até rerun e validação do Trial 001.
