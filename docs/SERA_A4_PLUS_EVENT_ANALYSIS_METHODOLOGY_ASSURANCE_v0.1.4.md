# SERA v0.1.4-A4+ — Event Analysis Methodology Assurance

Status: auditoria metodológica end-to-end (documental)  
Scope: verificação de integridade do fluxo de análise causal de evento (relato → ponto de fuga → P/O/A → preconditions → traces → recomendações → revisão humana)  
Non-scope: redesign de Risk Layer, alteração de motor, alteração de baseline/candidates/fixtures/expected

## A. Executive Conclusion

A baseline causal v0.1.4 está forte para o conjunto controlado validado (9 candidates, 27/27 PASS, determinism 1), mas **não comprova sozinha** robustez metodológica para eventos reais heterogêneos.

Conclusões executivas:

- A baseline causal atual valida **classificação causal controlada** (P/O/A + preconditions), não todo o ciclo investigativo de campo.
- Não há evidência suficiente nesta fase para reabrir motor P/O/A; o motor atual está estável no escopo congelado.
- Antes da A5 Risk Layer, é recomendado ampliar assurance de:
  - suficiência de evidência;
  - cenários multi-ator/multi-ato;
  - rastreabilidade observável no produto para auditoria humana.

Resposta à pergunta central:

- O sistema **já faz mais do que classificar P/O/A** (produz traces, statements derivados e caveats), mas parte relevante dessa camada ainda é **experimental/heurística** e **não baselineada**.

## B. Baseline Causal Status

Referências oficiais:

- Tag: `sera-causal-v0.1.4`
- Artifact: `tests/reports/baseline/sera-causal-baseline-v0.1.4.json`
- Tipo: `causal_classification`
- Versão: `v0.1.4`
- Escopo: `P/O/A + preconditions`
- Execução estável: 9 fixtures/candidates, 27 runs
- `causal_summary`: PASS=27, PARTIAL=0, FAIL=0, ERROR=0, `determinism_rate=1`
- `non_scope`: traditional risk matrix, ARMS/ERC, Hendy risk management, product risk profile

Limites formais:

- Baseline causal **não é baseline de risco**.
- `erc_level` permanece metadata legacy de Risk Layer (não eixo causal original comprovado).

## C. End-to-End Event Analysis Map

| Fluxo / artefato | Status | Source file/doc | Current risk | Required action |
|---|---|---|---|---|
| Raw event narrative (relato bruto) | IMPLEMENTED_NOT_BASELINED | `frontend/src/app/api/events/route.ts`, `frontend/src/app/api/analyze/route.ts`, `events.raw_input` | Análise depende fortemente da qualidade do texto inicial | Definir política explícita de qualidade mínima de relato para uso operacional |
| Evidence sufficiency (sinalização) | IMPLEMENTED_NOT_BASELINED | `frontend/src/lib/sera/pipeline.ts` (`evidence_quality`, `question_trace`), `frontend/src/components/sera/interview/EvidenceIntakePage.tsx` | Sinaliza lacuna, mas não governa gate final de aceitação | Definir policy formal: quando bloquear, quando permitir com caveat |
| Safe operation escape point | IMPLEMENTED_NOT_BASELINED | `runStep2` em `all-steps.ts`, `step1_step2_explicit_trace` em `pipeline.ts` | Dependência de extração LLM single-point | Regras de revisão humana obrigatória no ponto de fuga |
| Unsafe act statement | IMPLEMENTED_NOT_BASELINED | `runStep2` e `step1_step2_explicit_trace` | Single unsafe act pode simplificar demais eventos complexos | Policy de segmentação de evento com múltiplos atos |
| Unsafe condition statement | PARTIAL | `detectUnsafeConditionStatement` em `pipeline.ts` | Extração heurística limitada; frequentemente não separado | Cobrir explicitamente no validation set ampliado |
| Direct actor | PARTIAL | `step2.agente` + `deriveActorTrace` em `pipeline.ts` | Pode confundir ator direto com contexto organizacional/precondition | Definir regra operacional de resolução de ambiguidade de ator |
| Actor level | PARTIAL | `deriveActorTrace` em `pipeline.ts` | Heurístico e conservador; pode ficar `unknown` | Tornar policy explícita de fallback e revisão |
| Goal statement | PARTIAL | `buildStep1Step2ExplicitTrace` em `pipeline.ts` | Extração por cues/sobreposição textual; não é step explícito nativo | Validar estabilidade em casos incompletos/ambíguos |
| Perception statement | PARTIAL | `buildStep1Step2ExplicitTrace` em `pipeline.ts` | Idem acima | Idem acima |
| Action statement | PARTIAL | `buildStep1Step2ExplicitTrace` em `pipeline.ts` | Idem acima | Idem acima |
| Final P/O/A | IMPLEMENTED_AND_BASELINED | `pipeline.ts`, `all-steps.ts`, baseline v0.1.4 | Bom no set controlado; cobertura externa ainda limitada | Manter freeze e ampliar validação sem mudar motor |
| Preconditions | IMPLEMENTED_AND_BASELINED | `selectDeterministicPreconditions`, `runStep6_7`, baseline v0.1.4 | Vínculo causal pode ser implícito/matriz | Ampliar casos de evidência contraditória e incompleta |
| decision_trace (deterministic vs llm vs infer) | IMPLEMENTED_NOT_BASELINED | `buildAxisDecisionTrace` em `pipeline.ts` | Não exibido integralmente ao usuário final | Expor visão auditável no produto/report |
| preconditions_trace | IMPLEMENTED_NOT_BASELINED | `buildPreconditionsTrace` em `pipeline.ts` | Sem cadeia causal formal completa | Definir formato de cadeia active_failure → precondition |
| question_trace (step1/2 + experimental por eixo) | PARTIAL | `pipeline.ts` (`question_trace`, `trace_experimental`) | Marcado como observacional/experimental, não autoridade classificatória | Consolidar governança: o que é normativo vs observacional |
| limitations | IMPLEMENTED_NOT_BASELINED | `step1_step2_explicit_trace.limitations`, páginas de evento/relatório | Caveat existe, mas não com granularidade por caso no UI principal | Exibir limitações específicas do caso no produto |
| unanswered_questions | IMPLEMENTED_NOT_BASELINED | `step1_step2_explicit_trace.unanswered_questions`, `question_trace.unanswered_reason` | Campo não está no fluxo visual principal para o usuário | Tornar visível no relatório operacional do evento |
| recommendations | IMPLEMENTED_NOT_BASELINED | `runStep6_7` + UI de evento/relatório | Risco de recomendação genérica se evidência fraca | Adicionar regra de ancoragem mínima por evidência/precondition |
| Human review/editability | IMPLEMENTED_NOT_BASELINED | `EditableClassification`, `EditHistoryPanel`, caveats em páginas | Revisão existe, mas sem checklist formal de aprovação | Definir checklist obrigatório de revisão humana |
| Report/export (evento/PDF/print) | IMPLEMENTED_NOT_BASELINED | `events/[id]/page.tsx`, `reports/event/[id]/page.tsx` | Report não expõe trace completo nem incerteza detalhada | Incluir seção de rastreabilidade e incerteza por caso |

## D. Evidence Sufficiency Audit

Achados:

- Há estrutura de suficiência em múltiplas camadas:
  - entrevista estruturada (`assessInterviewSufficiency` + gates);
  - `evidence_quality` e `question_trace` no pipeline.
- `runStep1` pode retornar erro por relato muito curto.
- `runStep2` instrui a evitar retorno de insuficiência quando houver qualquer ato observável (tendência a continuar classificação).
- Steps 3/4/5 tratam insuficiência local como "Não" + "DADO INSUFICIENTE".

Lacunas:

- Não há policy formal única de "insuficiente" no nível de aceite final da análise.
- `analysis_completeness` mede validade de campos/códigos, não suficiência metodológica da evidência.
- Produto permite continuar mesmo com gates críticos faltantes (com aviso, sem bloqueio).

Recomendação:

- Definir policy explícita de suficiência antes de A5:
  - `BLOCKED_FOR_CLASSIFICATION` (faltam mínimos críticos),
  - `CLASSIFIED_WITH_LIMITATIONS` (classificável com caveat),
  - `SUFFICIENT_FOR_CAUSAL_INFERENCE`.

## E. Multi-Act / Multi-Actor Audit

Achados:

- `runStep2` impõe ponto de fuga único e ato inseguro único.
- O pipeline gera uma única tripla final P/O/A por análise.
- Existe tentativa de separar ator direto vs contexto organizacional (`deriveActorTrace`), com flags de incerteza.

Lacunas:

- Sem suporte estrutural para múltiplos atos inseguros ativos no mesmo evento.
- Sem modelagem nativa de cadeia multi-atores (direto + supervisão + organização) na classificação principal.
- `unsafe_condition_statement` é parcial e heurístico.

Recomendação:

- Política de produto para eventos complexos:
  - segmentar em múltiplas análises por ponto de fuga, ou
  - manter análise primária + apêndice de falhas concorrentes não classificadas.
- Incluir classes multi-ator/multi-ato no set A4++ antes de qualquer claim ampliado.

## F. Traceability Audit

Achados:

- `decision_trace` distingue `deterministic_gate`, `llm_node`, `infer_function`.
- `preconditions_trace` distingue `deterministic_matrix`, `llm`, `mixed`, `none`.
- Há `question_trace` e traces experimentais por eixo com `limitations` explícitas.

Lacunas:

- Grande parte da rastreabilidade está em `raw_llm_output`, não na camada principal de visualização para usuário final.
- `question_trace` por eixo é explicitamente experimental/observacional.
- Relatório de evento não apresenta o racional completo de decisão e incerteza por pergunta.

Recomendação:

- Antes da A5, definir contrato mínimo de "trace auditável em produto":
  - fonte da decisão por eixo,
  - evidência usada,
  - itens sem resposta,
  - limitações por caso.

## G. Recommendation / Action Audit

Achados:

- Prompt de Step 6/7 exige vínculo de recomendação com falhas/preconditions e ações modificáveis.
- Produto permite converter recomendação em ação corretiva rastreável.
- Há caveats de revisão humana em páginas de evento e relatório.

Lacunas:

- Anchoring de recomendação é majoritariamente por instrução de prompt, sem validação forte pós-geração.
- Risco residual de recomendação genérica quando evidência textual é fraca.

Recomendação:

- Definir regra de qualidade mínima da recomendação:
  - referência explícita a falha/precondition,
  - evidência associada,
  - agente responsável e horizonte temporal proposto.

## H. Expanded Validation Plan

### Nível 1 — CORE_CAUSAL_BASELINE (congelado)

- Manter baseline atual v0.1.4 intacta.
- Escopo: 9 candidates oficiais, P/O/A + preconditions.
- Uso: regressão e estabilidade de motor causal.

### Nível 2 — EXTENDED_EVENT_ANALYSIS_VALIDATION (25–40 casos)

Objetivo: ampliar confiança metodológica de análise de evento real sem alterar motor nesta fase.

Classes mínimas a cobrir:

1. relatos incompletos;
2. relatos contraditórios;
3. múltiplos atores;
4. múltiplos unsafe acts;
5. unsafe condition sem ato direto claro;
6. erro de comunicação;
7. supervisão/delegação;
8. pressão operacional;
9. ambiguidade P-G/P-H;
10. ambiguidade O-A/O-D;
11. ambiguidade A-A/A-G/A-H;
12. ausência de fator humano claro;
13. evento normal / sem unsafe act;
14. relato puramente organizacional.

### Nível 3 — ADVERSARIAL_AND_INSUFFICIENT_EVIDENCE

Objetivo: forçar fronteiras metodológicas e policy de insuficiência.

Tipos de caso:

- texto curto e vago;
- narrativa com termos conflitantes;
- narrativa com carga emocional e pouca evidência factual;
- inputs com ruído documental (OCR ruim/parcial);
- casos com "falso indício" lexical para gates determinísticos.

## I. Acceptance Criteria Before A5

Antes de entrar em A5, exigir:

1. baseline causal v0.1.4 continua passando sem regressão;
2. limitações de evento real formalmente documentadas e aprovadas;
3. policy de evidência insuficiente definida (bloqueio vs caveat);
4. policy para múltiplos atos/atores definida;
5. report/insight não comunica certeza indevida quando houver incerteza/insuficiência.

## J. Recommended Next Phase

**SERA v0.1.4-A4++ — Extended Event Analysis Validation Design**

Objetivo macro:

- desenhar 25–40 casos de validação ampliada;
- sem alterar motor causal;
- sem tocar Risk Layer;
- preparar listas/candidates para execução de validação posterior.

Entregáveis A4++:

- matriz de casos por classe (mínimo 14 classes acima);
- critérios de julgamento por caso (incluindo suficiência e auditabilidade);
- política de decisão para casos insuficientes/ambíguos;
- estratégia de publicação de caveats no produto.

---

## Coverage Snapshot (auditoria desta fase)

- baseline causal atual: coberto e validado documentalmente;
- candidates exploratórios: referência identificada no contrato/docs, sem promoção nesta fase;
- adversarial tests: lacuna relevante para A4++;
- official fixtures: baseline oficial de 9 candidates confirmada;
- lacunas principais: suficiência de evidência, multi-ator/multi-ato, rastreabilidade no produto final.
