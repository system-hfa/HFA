# SERA Question Trace Design
## v0.1.4-A3-d5-plan

**Data:** 2026-05-21  
**Fase:** SERA v0.1.4-A3-d5-plan  
**Tipo:** Desenho técnico-metodológico documental (sem implementação)

---

## 1. Propósito

Definir o desenho técnico-metodológico para um futuro `question_trace` explícito no pipeline HFA/SERA.

Objetivos desta fase:

- definir o contrato conceitual e taxonomia inicial de perguntas;
- manter `question_trace` inicialmente como camada observacional;
- não implementar código nesta fase;
- preservar a regra central: HFA/SERA não é classificador direto de relato para P/O/A.

---

## 2. Estado Atual

- `decision_trace` já registra caminho/resultado do motor por eixo.
- `preconditions_trace` mínimo já existe.
- `step1_step2_explicit_trace` já existe no `raw_llm_output`.
- A3-d1 adicionou trace Step 1/2 observacional.
- A3-d2 adicionou `goal/perception/action` statements experimentais.
- A3-d3 foi rejeitada por alterar anchor forte em fase observacional.
- A3-d4 adicionou `direct_actor/actor_level` experimental com helper puro/read-only.

---

## 3. Por Que `question_trace` É Necessário

- Evitar leitura do motor como classificador direto de P/O/A.
- Registrar pergunta metodológica, resposta, evidência, incerteza e suficiência.
- Aproximar o motor do fluxo Hendy/Daumas/HFA explícito.
- Separar claramente decisão executada (`decision_trace`) da pergunta metodológica (`question_trace`).
- Permitir auditoria de lacunas (`insufficient_evidence`) sem forçar inferência livre.

---

## 4. Contrato Conceitual Proposto

```ts
type SeraQuestionAnswer =
  | 'yes'
  | 'no'
  | 'partial'
  | 'insufficient_evidence'
  | 'not_applicable'
  | 'unknown'

type SeraQuestionSource =
  | 'hendy_ladder'
  | 'daumas_operationalization'
  | 'hfa_adaptation'
  | 'technical_heuristic'

interface SeraQuestionTraceItem {
  question_id: string
  step:
    | 'step1'
    | 'step2'
    | 'perception'
    | 'objective'
    | 'action'
    | 'preconditions'
    | 'erc'
  question_text: string
  answer: SeraQuestionAnswer
  evidence: string | null
  confidence: 'high' | 'medium' | 'low' | 'unknown'
  source: SeraQuestionSource
  methodological_status:
    | 'SOURCE_DIRECT_HENDY'
    | 'SOURCE_INFERRED_FROM_HENDY'
    | 'DAUMAS_TRANSLATION'
    | 'DAUMAS_OPERATIONALIZATION'
    | 'DAUMAS_APPLIED_IMPROVEMENT'
    | 'HFA_ADAPTATION_REQUIRES_NOTE'
    | 'TECHNICAL_HEURISTIC'
    | 'GAP'
    | 'UNCONFIRMED'
  produced_code?: string | null
  discarded_codes?: string[]
  unanswered_reason?: string | null
  limitations?: string[]
}
```

---

## 5. Taxonomia Inicial de `question_id`

### Step 1

- `S1_ESCAPE_POINT_IDENTIFIED`
- `S1_UNSAFE_ACT_IDENTIFIED`
- `S1_UNSAFE_CONDITION_IDENTIFIED`
- `S1_DIRECT_ACTOR_IDENTIFIED`
- `S1_ACTOR_LEVEL_IDENTIFIED`

### Step 2

- `S2_GOAL_STATEMENT_EXPLICIT`
- `S2_PERCEPTION_STATEMENT_EXPLICIT`
- `S2_ACTION_STATEMENT_EXPLICIT`
- `S2_EVIDENCE_SUFFICIENT_FOR_LADDERS`

### Perception

- `P_SENSORY_INFORMATION_AVAILABLE`
- `P_INFORMATION_ATTENDED`
- `P_INFORMATION_INTERPRETED`
- `P_CONFLICTING_INFORMATION_INTEGRATED`
- `P_KNOWLEDGE_SUFFICIENT`
- `P_TIME_ATTENTION_ADEQUATE`

### Objective

- `O_GOAL_IDENTIFIABLE`
- `O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION`
- `O_RULE_LIMIT_PROCEDURE_AWARENESS`
- `O_CONSCIOUS_DEVIATION_EVIDENCE`
- `O_GOAL_CONSTRAINED_BY_OPERATIONAL_CONTEXT`

### Action

- `A_ACTION_EXECUTED_AS_INTENDED`
- `A_ACTION_MATCHED_PERCEIVED_SITUATION`
- `A_PHYSICAL_PROCEDURAL_STEP_OMITTED`
- `A_WRONG_ACTION_OR_SELECTION`
- `A_FEEDBACK_CHECK_REQUIRED`
- `A_FEEDBACK_CHECK_PERFORMED`
- `A_TIME_PRESSURE_IMPAIRED_EXECUTION`

### Preconditions

- `PRE_ACTIVE_FAILURE_LINKED_TO_PRECONDITION`
- `PRE_PRECONDITION_SUPPORTED_BY_EVIDENCE`
- `PRE_PRECONDITION_IS_INTERVENTION_POINT`

### ERC

- `ERC_DETECTABILITY_ASSESSED`
- `ERC_RECOVERABILITY_ASSESSED`
- `ERC_BARRIERS_AVAILABLE`
- `ERC_CONSEQUENCE_PROXIMITY_ASSESSED`

---

## 6. Relação Hendy/Daumas/HFA

### Step 1/2 questions

- Hendy direto: departure point, actor, goal/perception/action antes das ladders.
- Daumas operacionalização: tradução didática e codificação para uso operacional.
- HFA adaptação: extrações observacionais sem alterar classificador.
- GAP atual: ausência de `question_trace` formal por pergunta.
- ADAPTATION_NOTE: AN-002, AN-003, AN-010, AN-011.

### Perception/Objective/Action questions

- Hendy direto: ladders interrogativas por eixo.
- Daumas operacionalização: codificação P/O/A para banco e reporte.
- HFA adaptação: gates + fallback LLM com `decision_trace` mínimo.
- GAP atual: ausência de question IDs formais e `answer` estruturada por pergunta.
- ADAPTATION_NOTE: AN-003, AN-004, AN-005, AN-006, AN-007, AN-008.

### Preconditions/ERC questions

- Hendy direto: vínculo causal `active_failure -> precondition -> evidence` + ERC.
- Daumas operacionalização: categorias preconditions aplicáveis no contexto operacional.
- HFA adaptação: preconditions por matriz/heurística com trace mínimo.
- GAP atual: cadeia causal explícita ainda incompleta.
- ADAPTATION_NOTE: AN-009, AN-012.

---

## 7. Relação `decision_trace` vs `question_trace`

| Aspecto | `decision_trace` atual | `question_trace` futuro |
|---|---|---|
| Foco | Caminho executado e origem do código | Perguntas metodológicas e respostas |
| Granularidade | Por eixo (P/O/A) | Por pergunta (`question_id`) |
| Evidência | Parcial/implícita em nós e descartes | Campo explícito `evidence` por item |
| Incerteza | Parcial (`insufficient_evidence_detected`) | Explícita (`answer`, `confidence`, `unanswered_reason`) |
| Papel | Observabilidade técnica da execução | Auditabilidade metodológica do raciocínio |
| Uso inicial | Já em produção no `raw_llm_output` | Entrará observacionalmente, sem efeito classificatório |

---

## 8. Estratégia Incremental

1. **A3-d5a**: aprovar contrato e question IDs.
2. **A3-d5b**: adicionar `question_trace: []` em `raw_llm_output`.
3. **A3-d5c**: preencher Step 1/2 questions com dados existentes.
4. **A3-d5d**: preencher perception/objective/action questions a partir de `nos_percorridos`.
5. **A3-d5e**: adicionar `evidence/confidence/unanswered_reason`.
6. **A3-d5f**: criar poucos fixtures com `expected_question_trace`.
7. **A3-d5g**: só depois avaliar uso do `question_trace` na classificação.

---

## 9. Invariantes

- P/O/A/ERC não mudam.
- Gates não mudam.
- Prompts classificatórios não mudam.
- Schema não muda inicialmente.
- Fixtures e baseline não mudam.
- `question_trace` entra primeiro em `raw_llm_output`.
- Sem evidência textual: `insufficient_evidence`.
- Nenhuma pergunta pode ser preenchida por extrapolação livre.
- Implementação futura deve ser pós-processamento puro/read-only.

---

## 10. Riscos e Mitigação

- Custo LLM: iniciar com derivação de dados existentes antes de novas chamadas.
- Excesso de campos: versão inicial mínima com perguntas de maior valor auditável.
- Falsa precisão: exigir `evidence` e `confidence`, com `insufficient_evidence` explícito.
- Divergência entre `question_trace` e `decision_trace`: validação cruzada por fixture.
- Confusão entre pergunta metodológica e regra técnica: manter `source` e `methodological_status` explícitos.
- Alucinação de evidência: bloquear preenchimento sem trecho textual.
- Impacto em produto/API: manter inicialmente apenas em `raw_llm_output`.
- Regressão classificatória indireta (como A3-d3): isolamento read-only e comparação de anchors antes/depois.

---

## 11. Recomendação

- Committar este documento como base metodológica formal.
- Próxima fase segura:
  - **A3-d5b** (incluir `question_trace: []` em `raw_llm_output`), ou
  - manter em **A3-d5a** se a equipe quiser revisar question IDs antes.
- Não retentar A3-d3b sem desenho de isolamento aprovado.

---

## 12. Conclusão

`question_trace` é camada de auditabilidade, não novo classificador.  
A implementação deve ser incremental, observacional no início e estritamente orientada a invariância classificatória.

