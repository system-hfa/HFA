# SERA Trace Experimental — ERC Design
## v0.1.4-A3-d5d2-erc-design

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d5d2-erc-design  
**Tipo:** Desenho técnico-metodológico documental (sem implementação)

## 1. Propósito

Definir o desenho técnico-metodológico para futura implementação de:

`raw_llm_output.trace_experimental.erc_question_trace`

com foco em auditabilidade de risco operacional, preservando invariância classificatória e sem alterar o cálculo atual de ERC.

## 2. Estado atual do ERC

1. **Onde o ERC atual aparece no payload**
- Campo top-level: `analysis.erc_level` (persistido no payload final).
- Campo bruto: `raw_llm_output.step6_7.erc_level`.
- Campo de invariância: `raw_llm_output.trace_isolation.invariant_fields` inclui `erc_level`.

2. **Campo que representa `erc_level`**
- O nível é representado por `step6_7.erc_level` (`number`) e propagado para `analysis.erc_level`.

3. **Conversão/apresentação HFA ERC**
- Existe decisão canônica em `docs/RISK_ERC_CANONICAL_DECISION_v0.7.md` indicando semântica HFA de apresentação e distinção entre escala legacy do motor e camada de apresentação.
- `docs/RISK_ERC_PRESENTATION_CONTRACT_v1.0.md` não foi encontrado nesta leitura.

4. **ERC no `question_trace` principal**
- Não está presente. O `raw_llm_output.question_trace` principal permanece restrito a Step 1/2.

5. **`trace_experimental.erc_question_trace` existe?**
- Não. Atualmente `trace_experimental` contém apenas Perception/Objective/Action/Preconditions.

6. **Conclusão de estado**
- ERC ainda não foi incluído em trace experimental.

## 3. Objetivo do futuro `erc_question_trace`

O futuro `erc_question_trace` deve auditar a sustentação metodológica do risco operacional **sem** recalcular risco.

Regras mandatórias:
- ERC trace é auditabilidade, não recalculadora de risco.
- Não pode alterar `erc_level`.
- Não pode alterar matriz/escala ERC.
- Não pode alterar presentation mapping/contrato de apresentação.
- Não pode alterar Risk Profile.
- Deve entrar primeiro em `raw_llm_output.trace_experimental.erc_question_trace`.

## 4. Question IDs ERC propostos

- `ERC_EVENT_OUTCOME_SEVERITY_IDENTIFIED`
  - Verifica se severidade/proximidade do desfecho operacional foi explicitamente identificada.
- `ERC_RECOVERY_POTENTIAL_ASSESSED`
  - Verifica se potencial de recuperação/controle foi avaliado.
- `ERC_BARRIER_EFFECTIVENESS_ASSESSED`
  - Verifica se disponibilidade/efetividade de barreiras foi considerada.
- `ERC_ESCALATION_PROXIMITY_ASSESSED`
  - Verifica se proximidade de escalada para consequência mais grave foi avaliada.
- `ERC_OPERATIONAL_CONTEXT_CONSIDERED`
  - Verifica se contexto operacional (incluindo preconditions) foi considerado no raciocínio de risco.
- `ERC_LEVEL_SUPPORTED_BY_EVIDENCE`
  - Verifica se o `erc_level` final está sustentado por evidência disponível no snapshot.
- `ERC_LEVEL_CONSISTENT_WITH_POA_AND_PRECONDITIONS`
  - Verifica consistência observacional entre `erc_level` e o conjunto P/O/A + preconditions.

## 5. Contrato do item ERC

O contrato deve reutilizar `SeraQuestionTraceItem` existente.

Para itens ERC:
- `step`: sempre `erc`.
- `produced_code`: `String(snapshot.erc_level)` quando disponível; `null` se ausente.
- `discarded_codes`: `[]` na versão inicial.
- `evidence`: somente dados já disponíveis no snapshot/payload final.
- `confidence`: derivada de suficiência de evidência (conservadora).
- `limitations`: explícitas por item + pacote padrão ERC.

Status metodológico esperado (base):
- predominância de `HFA_ADAPTATION_REQUIRES_NOTE`, `SOURCE_INFERRED_FROM_HENDY` ou `TECHNICAL_HEURISTIC`.
- evitar `SOURCE_DIRECT_HENDY` onde a inferência depender de heurística interna.

## 6. Fontes permitidas e proibidas

### 6.1 Permitidas
- `snapshot.erc_level`
- `snapshot.perception_code`
- `snapshot.objective_code`
- `snapshot.action_code`
- `snapshot.precondition_codes`
- `snapshot.step6_7_final` (incluindo precondições/conclusões/recomendações já normalizadas)
- `preconditions_trace`
- `trace_isolation`
- `raw_input`/`event_summary` somente se já estiverem no snapshot/payload, sem inferência livre

### 6.2 Proibidas
- Nova chamada LLM na primeira implementação.
- Uso de `rawInput` livre para recalcular risco.
- Qualquer alteração na matriz/escala ERC.
- Qualquer alteração no presentation contract.
- Qualquer uso do ERC trace para modificar `erc_level`.

## 7. Regras por question ID

### 7.1 `ERC_EVENT_OUTCOME_SEVERITY_IDENTIFIED`
- Pergunta: a severidade/proximidade do resultado operacional foi identificada?
- Answer esperado: `yes`/`partial`/`insufficient_evidence`/`unknown`.
- Evidence permitido: `step6_7_final.conclusoes`, evidências de preconditions, sinais em summary já persistido.
- Confidence: `high` apenas com evidência textual explícita; padrão conservador `medium/low`.
- Methodological status: `HFA_ADAPTATION_REQUIRES_NOTE`.
- Limitações: não inferir “pior consequência possível” sem base textual.

### 7.2 `ERC_RECOVERY_POTENTIAL_ASSESSED`
- Pergunta: havia possibilidade de recuperação/controle?
- Answer esperado: `yes`/`no`/`partial`/`insufficient_evidence`.
- Evidence permitido: conclusões/recomendações/preconditions com sinais explícitos de controle/recuperação.
- Confidence: conservadora.
- Methodological status: `SOURCE_INFERRED_FROM_HENDY` ou `HFA_ADAPTATION_REQUIRES_NOTE`.
- Limitações: ausência de recuperação não implica automaticamente severidade máxima.

### 7.3 `ERC_BARRIER_EFFECTIVENESS_ASSESSED`
- Pergunta: barreiras estavam disponíveis e/ou efetivas?
- Answer esperado: `yes`/`no`/`partial`/`insufficient_evidence`/`not_applicable`.
- Evidence permitido: preconditions + conclusões + recomendações existentes.
- Confidence: `medium/low` quando barreiras não estiverem explícitas.
- Methodological status: `HFA_ADAPTATION_REQUIRES_NOTE`.
- Limitações: não inventar barreiras ausentes no texto/trace.

### 7.4 `ERC_ESCALATION_PROXIMITY_ASSESSED`
- Pergunta: quão próximo o evento ficou de consequência mais grave?
- Answer esperado: `yes`/`partial`/`insufficient_evidence`/`unknown`.
- Evidence permitido: sinais explícitos de quase-acidente/escalada em conclusões/summary já existente.
- Confidence: baixa por padrão sem marcador textual direto.
- Methodological status: `TECHNICAL_HEURISTIC` ou `HFA_ADAPTATION_REQUIRES_NOTE`.
- Limitações: evidência de proximidade deve ser explícita; sem extrapolação livre.

### 7.5 `ERC_OPERATIONAL_CONTEXT_CONSIDERED`
- Pergunta: contexto operacional foi considerado?
- Answer esperado: `yes`/`partial`/`insufficient_evidence`.
- Evidence permitido: `precondition_codes`, `preconditions_trace`, `step6_7_final.precondicoes`, summary.
- Confidence: `medium` quando houver múltiplos sinais convergentes.
- Methodological status: `SOURCE_INFERRED_FROM_HENDY`.
- Limitações: contexto é observacional; não substitui análise causal completa.

### 7.6 `ERC_LEVEL_SUPPORTED_BY_EVIDENCE`
- Pergunta: o `erc_level` final tem evidência suficiente?
- Answer esperado: conservador (`partial` ou `insufficient_evidence` na maioria dos casos iniciais).
- Evidence permitido: `erc_level` + conjunto de evidências existentes em step6_7/preconditions/summary.
- Confidence: nunca `high` sem evidência robusta explícita.
- Methodological status: `HFA_ADAPTATION_REQUIRES_NOTE`.
- Limitações: não reavaliar escala; apenas suporte observacional.

### 7.7 `ERC_LEVEL_CONSISTENT_WITH_POA_AND_PRECONDITIONS`
- Pergunta: `erc_level` é coerente com P/O/A e preconditions?
- Answer esperado: `yes`/`partial`/`insufficient_evidence`/`unknown`.
- Evidence permitido: `snapshot.{perception_code, objective_code, action_code, precondition_codes, erc_level}`.
- Confidence: conservadora.
- Methodological status: `TECHNICAL_HEURISTIC`.
- Limitações: checagem de consistência observacional; não recalcula risco.

## 8. Limitations padrão

Todo item de `erc_question_trace` deve incluir:
- `trace_experimental_only`
- `erc_axis_only`
- `does_not_recalculate_erc_level`
- `does_not_affect_classification`
- `no_new_llm_call`
- `risk_evidence_may_be_partial`
- `erc_scale_semantics_must_follow_existing_contract`
- `not_a_full_risk_assessment_replacement`
- `requires_future_validation_before_ui_exposure`

## 9. Relação com escala ERC e Risk Profile

- O trace ERC não decide escala.
- O trace ERC deve respeitar integralmente a escala/contrato já existente.
- Ambiguidades entre ERC legacy, HFA e presentation devem ser tratadas em documento próprio de risco (fora do helper).
- Não alterar Risk Profile nesta fase.
- Não alterar dashboards nesta fase.

## 10. Plano de implementação futura

### A3-d5d2-erc-implementation
- Implementar `trace_experimental.erc_question_trace`.
- Usar snapshot final pós-classificação.
- Não alterar `erc_level`.
- Manter `question_trace` principal intacto.
- Validar com `typecheck` + candidate-only `N_RUNS=1`.
- Gate: anchors fortes preservados + estabilidade de `erc_level`.

### A3-d5d2-erc-validation
- Executar candidate-only `N_RUNS=3`.
- Comparar `erc_level` em todos os candidates (antes/depois).
- Verificar coerência `answer/evidence/confidence` nos itens ERC.

### A3-d5e-trace-contract
- Decidir se subtraces experimentais passam a contrato versionado.
- Definir política de exposição (API/UI) com caveats obrigatórios.

## 11. Riscos e mitigação

Riscos principais:
1. Falsa auditabilidade do risco sem evidência independente.
2. Contaminação metodológica entre trace ERC e cálculo de `erc_level`.
3. Confusão de semântica entre escala legacy do motor e apresentação HFA.
4. Crescimento de payload em `raw_llm_output`.
5. Leitura indevida de consistência observacional como validação causal.

Mitigações:
- isolamento em `trace_experimental`;
- snapshot/read-only + `trace_isolation`;
- limitações explícitas por item;
- proibição de nova chamada LLM na primeira versão;
- validação multi-run antes de qualquer exposição em UI.

## 12. Recomendação final

Prosseguir com **A3-d5d2-erc-implementation** somente após aprovação deste desenho, mantendo escopo mínimo observacional e validação explícita de invariância (`erc_level` e demais campos críticos imutáveis).

## 13. Conclusão

O desenho ERC foi definido para preencher a lacuna metodológica apontada na consolidação, mantendo o princípio central: trace experimental é camada de auditabilidade, não mecanismo de classificação/reclassificação. A implementação futura deve preservar integralmente escala, contrato e comportamento de risco já existentes.
