# SERA Decision Trace Minimum
## v0.1.4-A3-b

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-b  
**Tipo:** Observabilidade/rastreabilidade mínima sem alteração classificatória

## 1. Objetivo da A3-b

Adicionar rastreabilidade mínima ao pipeline SERA para registrar, sem alterar o resultado de classificação, como o motor chegou aos códigos dos eixos P/O/A e como as preconditions foram produzidas.

## 2. O que foi adicionado

- `raw_llm_output.decision_trace` com rastro mínimo por eixo (`perception`, `objective`, `action`), incluindo:
  - step
  - código final
  - origem da decisão (`deterministic_gate`, `llm_node`, `infer_function`, `unknown`)
  - identificador de origem (`source_name`) quando disponível
  - contagem de nós percorridos
  - falhas descartadas
  - detecção de `DADO INSUFICIENTE`

- `raw_llm_output.preconditions_trace` com:
  - mecanismo de geração (`deterministic_matrix`, `llm`, `mixed`, `none`, `unknown`)
  - total de preconditions
  - `source_rule_ids` quando disponíveis

- Preservação de `sourceRuleId` nas preconditions determinísticas quando disponível, inclusive no payload normalizado de preconditions.

## 3. O que NÃO foi alterado

- Classificação P/O/A/ERC
- Gates determinísticos
- Prompts LLM
- Fixtures oficiais
- Candidates JSON
- Baseline de testes
- Schema de banco e migrations

## 4. Limitações desta fase

- O trace não implementa ladder Hendy completa.
- Não cria statements explícitos de goal/perception/action antes da classificação.
- Não distingue `unsafe_act` vs `unsafe_condition`.
- Não adiciona `unanswered_questions` estruturado.
- É rastreabilidade mínima de execução, não reimplementação metodológica completa.

## 5. Próximo passo recomendado

- Formalizar `ADAPTATION_NOTES` por regra/gate.
- Evoluir para Step 1/Step 2 explícitos no sentido Hendy.
- Evoluir `preconditions_trace` para cadeia causal explícita (`active_failure -> precondition -> evidence`).
