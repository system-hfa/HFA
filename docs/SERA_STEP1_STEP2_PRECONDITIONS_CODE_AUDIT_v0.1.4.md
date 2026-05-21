# SERA Step 1 / Step 2 / Preconditions — Code Audit
## v0.1.4-A3-a-mini | Auditoria Empírica

**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-a-mini
**Tipo:** Auditoria documental de código — sem alteração de código, fixtures, candidates, baseline ou reports
**Auditor:** Claude Sonnet 4.6 (instrução humana Daumas)

---

**Nota pós-A3-b:** este documento descreve o estado observado antes da implementação de A3-b. As lacunas `decision_trace`, `preconditions_trace` e preservação de `sourceRuleId` foram parcialmente endereçadas em `docs/SERA_DECISION_TRACE_MINIMUM_v0.1.4.md`. Permanecem abertas as lacunas de Step 1/2 explícitos, `unsafe_condition`, `direct_actor`, goal/perception/action statements pré-ladder, question_trace completo e unanswered_questions.

## 1. Resumo Executivo

Esta auditoria confirma empiricamente, lendo o código atual do pipeline HFA/SERA, se os elementos centrais do SERA de Hendy estão explicitamente implementados: departure from safe operation, unsafe act/condition, ator direto, goal/perception/action statements, ladders interrogativas e preconditions por active failure.

**Conclusão sintética:**

| Elemento Hendy | Status |
|---|---|
| Departure from safe operation como Step 1 | AUSENTE no Step 1 do HFA — está no Step 2 |
| Distinção unsafe act vs unsafe condition | AUSENTE |
| Ator direto vs supervisão/organização | HFA_ADAPTATION (interno, não exposto no output) |
| Goal statement pré-ladder | AUSENTE |
| Perception statement pré-ladder | AUSENTE |
| Action statement pré-ladder | AUSENTE |
| Ladder interrogativa com question IDs | AUSENTE — gates determinísticos + LLM fallback |
| Unanswered questions / insufficient evidence | AUSENTE — sistema sempre produz código |
| Preconditions por active failure | HFA_ADAPTATION — derivadas por lookup de código P/O/A |
| Preconditions_trace (active_failure → precondition → evidence) | AUSENTE |
| question_trace / decision_trace nomeados | AUSENTE (parcial: nos_percorridos) |

O pipeline atual é funcional e empiricamente calibrado, mas **não implementa Hendy de forma explícita em Step 1, Step 2 ou na arquitetura de preconditions**. As adaptações HFA são técnicas e operacionalmente justificadas, mas representam desvios metodológicos de alto impacto que precisam ser documentados formalmente.

---

## 2. Arquivos Lidos

| Arquivo | Conteúdo auditado |
|---|---|
| `frontend/src/lib/sera/pipeline.ts` | Orquestrador, `runSeraPipeline`, `buildAnalysisUpsertPayload`, infer* functions |
| `frontend/src/lib/sera/all-steps.ts` | `runStep1` (L1799), `runStep2` (L1841), `runStep3` (L1890), `runStep4` (L2551), `runStep6_7` (L3705), todas as funções de evidência |
| `frontend/src/lib/sera/types.ts` | Step1Result, Step2Result, Step67Result, StepFlowResult, interfaces públicas |
| `frontend/src/lib/sera/rules/objective/select.ts` | `classifyObjectiveByRules` |
| `frontend/src/lib/sera/rules/preconditions/select.ts` | `selectDeterministicPreconditions` |
| `frontend/src/lib/sera/rules/preconditions/index.ts` | Exports + matrix |
| `frontend/src/lib/sera/rules/preconditions/matrix.json` | Regras determinísticas de preconditions (primeiras 60 linhas) |
| `frontend/src/data/sera/Point.json` | Definição operacional de "Ponto de Desvio da Operação Segura" |
| `frontend/src/data/sera/Pre-Conditions.json` | Índice de preconditions (P1-P7, T1-T2, W1-W3, S1-S3, O1-O6) |
| `frontend/src/lib/sera/step1.ts` | Re-export de all-steps |
| `frontend/src/lib/sera/step2.ts` | Re-export de all-steps |

---

## 3. Step 1 Fidelity Audit

### O que Hendy define como Step 1
Identificação do **departure from safe operation**: o momento exato em que a operação se desviou de procedimentos seguros, identificando o **unsafe act** (ação) ou **unsafe condition** (condição), o **ator/crew diretamente envolvido**, e o **primeiro ponto de fuga** — antes de qualquer análise causal ou ladder.

### O que o HFA Step 1 faz

`runStep1` (L1799–1839, `all-steps.ts`) é uma **extração de metadados via LLM**. Produz:

```typescript
interface Step1Result {
  summary?: string
  event_date?: string | null
  event_location?: string | null
  operation_type?: string | null
  occupants_count?: string | null
  flight_phase?: string | null
  weather_conditions?: string | null
  systems_involved?: string | null
  error?: string
}
```

O prompt do Step 1 pede: "Analise o relato e extraia informações estritamente factuais" — tipo de aeronave, fase do voo, meteorologia, local, envolvidos e o que aconteceu.

### Achados

**1. O pipeline identifica explicitamente "departure from safe operation"?**
NÃO no Step 1. O campo `summary` é uma síntese narrativa de 60–80 palavras; não é um departure point estruturado. O departure point está no Step 2, campo `ato_inseguro_factual`.

**2. Existe campo, objeto ou variável para "safe operation escape point"?**
NÃO no Step 1. No Step 2: `ato_inseguro_factual` + `justificativa`. No payload final do banco: `unsafe_act` e `escape_point`. Mas não há campo explicitamente nomeado `safe_operation_escape_point` em nenhuma interface.

**3. Existe distinção entre unsafe act e unsafe condition?**
NÃO. O campo `ato_inseguro_factual` captura ambos sob o mesmo nome. O prompt proíbe inferir causas e pede "verbo de ação observável", o que favorece acts, mas não existe um campo `unsafe_condition` separado em nenhum nível da stack.

**4. Existe campo para unsafe act?**
SIM, parcialmente: `ato_inseguro_factual` no Step 2. Refletido no payload como `unsafe_act`. Mas o conceito é operacionalizado em Step 2, não Step 1.

**5. Existe campo para unsafe condition?**
NÃO. Não existe `unsafe_condition` em nenhuma interface ou campo do output.

**6. O sistema identifica o primeiro ponto de fuga?**
SIM, mas via Step 2, não Step 1. O prompt de Step 2 instrui: "NEVER identify more than ONE departure point. Pick the most critical moment after which there was no return to safety." Point.json confirma: "único ato/decisão que diverge dos procedimentos seguros estabelecidos."

**7. O sistema identifica o ator/crew diretamente envolvido?**
SIM, parcialmente: `step2.agente` → payload `unsafe_agent`. Mas não há separação explícita de "direct actor vs. supervisory actor" no output. Internamente, `isMaintainenceOrOrganizationalAgent()` e `isEscapePointOrganizationalAgent()` distinguem agentes organizacionais dos operacionais — mas essa distinção afeta apenas o comportamento dos gates internos de Step 3, não produz um campo `direct_actor` ou `supervisory_actor` no resultado.

**8. O sistema separa ator direto de supervisão/manutenção/organização?**
INTERNAMENTE SIM (função `isMaintainenceOrOrganizationalAgent()` em L100–123, `all-steps.ts`). NO OUTPUT, NÃO — o payload contém apenas `unsafe_agent` sem discriminar nível hierárquico.

**Classificação:** `HFA_ADAPTATION_REQUIRES_NOTE` + `GAP`
- Step 1 do HFA não é Step 1 de Hendy — é extração de metadados.
- Step 1 de Hendy (identificação do departure) está no HFA Step 2.
- A distinção unsafe act / unsafe condition não existe na stack.
- A separação ator direto / supervisão é interna mas não preservada no schema de output.

---

## 4. Step 2 Fidelity Audit

### O que Hendy define como Step 2
Formulação das **três perguntas fundamentais** sobre o operador no ponto de departure:
1. **Goal statement**: O que o operador estava tentando alcançar (intenção/objetivo)?
2. **Perception statement**: O que o operador percebeu/viu/ouviu no momento do ato?
3. **Action statement**: Qual ação o operador tomou?

Esses statements devem ser respondidos como afirmações explícitas **antes** do início das ladders de classificação. São a entrada das ladders, não um resultado delas.

### O que o HFA Step 2 faz

`runStep2` (L1841–1888, `all-steps.ts`) é uma **identificação do ponto de fuga via LLM**. Produz:

```typescript
interface Step2Result {
  agente?: string
  ato_inseguro_factual?: string
  momento?: string
  justificativa?: string
  error?: string
}
```

O prompt instrui: identificar agente, ato observável, momento e justificativa do ponto de fuga.

### Achados

**1. O pipeline extrai goal statement antes da ladder de objetivo?**
NÃO. Não existe uma etapa explícita que formule "O objetivo do operador era X" antes de entrar em `runStep4`. O Step 4 recebe `relato + ato_inseguro_factual + justificativa + momento + agente` e classifica diretamente em O-A/O-B/O-C/O-D.

**2. O pipeline extrai perception statement antes da ladder de percepção?**
NÃO. Não existe uma etapa que formule "O operador percebeu Y" antes de entrar em `runStep3`. O Step 3 recebe `relato + ato_inseguro_factual` e classifica diretamente em P-A…P-H.

**3. O pipeline extrai action statement antes da ladder de ação?**
NÃO. `ato_inseguro_factual` do Step 2 é o mais próximo de um "action statement", mas é o ato inseguro observável, não um "action statement" no sentido Hendy de "o que o operador tentou fazer". O Step 5 (`runStep5`) usa `relato + pontoFuga` e classifica em A-A…A-J sem uma ação-statement intermediária.

**4. As três perguntas goal/perception/action são respondidas separadamente?**
NÃO antes das ladders. Elas são respondidas **durante** a classificação nas ladders (Steps 3, 4, 5). O resultado final contém `perception_code`, `objective_code`, `action_code` com suas justificativas — o que são respostas implícitas às três perguntas, mas derivadas como output das ladders, não como input.

**5. Step 2 está implícito dentro da LLM / prompt / all-steps?**
SIM. O conteúdo de Hendy Step 2 está colapsado: a parte de "escape point" está em HFA Step 2 (um LLM call), e as três perguntas estão implicitamente dentro dos LLM calls de Steps 3–5. Não existe um step explicitamente chamado "Step 2 Hendy" que formule os três statements.

**6. O resultado final preserva essas respostas?**
PARCIALMENTE. `perception_justification`, `objective_justification`, `action_justification` no payload contêm as justificativas dos nós percorridos — o que é uma resposta implícita às perguntas, mas sem o formato de "statement afirmativo" e sem identificação de que foram respondidas como parte do Step 2 de Hendy.

**7. Existe evidência de unanswered questions / insufficient evidence?**
NÃO como estado final estruturado. O LLM prompt instrui: "If evidence is insufficient for the local question, answer 'Não' and explain 'DADO INSUFICIENTE'." O sistema trata "DADO INSUFICIENTE" como uma justificativa de Não, e o fluxo continua — sempre produzindo um código final. Não existe output `{unanswered_questions: [...]}`.

**Classificação:** `HFA_ADAPTATION_REQUIRES_NOTE` (alto impacto)
- Hendy Step 2 (goal/perception/action statements) não existe como etapa explícita.
- Os statements estão colapsados dentro dos LLM calls de Steps 3–5.
- "Insufficient evidence" não produz estado estruturado — o sistema sempre classifica.

---

## 5. Step 3/4/5 Ladder Audit

### O que Hendy define como ladders
Árvores interrogativas com perguntas sequenciais numeradas, cada pergunta com resposta sim/não/insuficiente, produzindo um código terminal. O percurso pela ladder é registrado como question_trace ou decision_trace.

### O que o HFA Step 3/4/5 fazem

A arquitetura real é: **gates determinísticos em cascata → LLM fallback com nós sim/não**.

**Estrutura de Step 3 (Percepção):**
1. Uma série de funções `evidenceOf*()` são avaliadas em ordem (L1913–2093)
2. Se algum gate dispara → retorna código imediatamente via `flowResult()` sem consulta LLM
3. Se nenhum gate dispara → `askYesNo()` chama LLM para Nós 0, 1, 2... com perguntas sim/não

**Estrutura de Step 4 (Objetivo):**
1. `classifyObjectiveByRules()` avalia regras determinísticas
2. Se regra dispara → retorna código sem LLM
3. Senão → múltiplos `r1 = await ask(...)` calls com perguntas LLM (Nó 1, Nó 2...)

**Estrutura de Step 5 (Ação):** Análoga a Step 3 e Step 4.

### Achados

**1. Step 3 (Percepção) é uma árvore de perguntas ou gates + LLM fallback?**
Gates + LLM fallback. Há ~12 gates determinísticos antes de qualquer consulta LLM. Muitos casos terminam em gate sem passar por nenhum nó LLM.

**2. Step 4 (Objetivo/Goal) é árvore de perguntas ou gates + LLM fallback?**
Gates + LLM fallback. `classifyObjectiveByRules()` tem 4 funções determinísticas heurísticas. Gates adicionais para knowledge deficit e objective-C-forbidden context.

**3. Step 5 (Ação) é árvore de perguntas ou gates + LLM fallback?**
Gates + LLM fallback. Estrutura análoga, com ~15 funções `evidenceOf*()` determinísticas antes do LLM.

**4. Existem question IDs ou apenas nomes de gates?**
Apenas labels descritivos como `'Nó 0'`, `'Nó 1'`, `'Gate P-C 0'`, `'Gate determinístico: ...'`. NÃO existem IDs numéricos como `Q1`, `Q2`, `Q3` que mapeiem para as perguntas da ladder de Hendy.

**5. Existem respostas yes/no/insufficient_evidence por pergunta?**
SIM para os nós LLM: `normalizeYesNo()` enforça `'Sim'` ou `'Não'`. O caso `'DADO INSUFICIENTE'` é tratado como justificativa de `'Não'`, não como terceiro estado. Para gates determinísticos: a resposta está embutida no objeto nó (ex: `{ resposta: 'Sim' }`) — não é uma pergunta respondida, é uma afirmação do gate.

**6. Existe question_trace ou decision_trace?**
NÃO como campo nomeado. `nos_percorridos` (array de `RawFlowNode`) registra os nós atravessados com justificativa — é um trace parcial. `falhas_descartadas` é uma string com os códigos eliminados. Nenhum dos dois é um `question_trace` estruturado com IDs de pergunta e respostas formais por questão.

**7. Se não há ladder explícita:**
Classificar como: `TECHNICAL_HEURISTIC` — o pipeline é um sistema de gates determinísticos com fallback LLM, não uma ladder interrogativa no sentido Hendy.

**Classificação:** `TECHNICAL_HEURISTIC`
- A arquitetura de gates + LLM fallback produz resultados empiricamente calibrados, mas não é uma ladder interrogativa estruturada.
- Os nós LLM do fallback têm caráter interrogativo, mas são bypassed pelos gates para a maioria dos casos nos fixtures.
- O trace produzido (`nos_percorridos` + `falhas_descartadas`) é funcional mas não mapeado às perguntas da ladder de Hendy.

---

## 6. Preconditions Audit

### O que Hendy define como preconditions
Condições latentes (preconditions) derivadas por análise da **active failure** identificada. A derivação é causal: a active failure habilita ou é habilitada por condições latentes de pessoal, tarefa, ambiente, supervisão ou organização. O vínculo é `active_failure → precondition → evidence`.

### O que o HFA implementa

**Mecanismo 1: Determinístico — `selectDeterministicPreconditions()`**
(`rules/preconditions/select.ts`)

A função recebe `{perception_code, objective_code, action_code, erc_level}` e `eventText`, e consulta `matrix.json`. O matrix.json tem regras do tipo:
```json
{
  "id": "A-D",
  "match": { "action_code": "A-D" },
  "ranked_preconditions": [
    { "code": "W1", "priority": 1, "required": true, "evidence": [...] },
    { "code": "W2", "priority": 2, "required": true, "evidence": [...] }
  ]
}
```

A fonte do matrix está declarada como: `"HFA fixture-derived operationalization of SERA/Hendy/Daumas preconditions"` — isso é uma operacionalização, não derivação direta de Hendy.

**Mecanismo 2: LLM — `runStep6_7()`**
(`all-steps.ts` L3705–3781)

O LLM recebe os três códigos + relato e é instruído a gerar preconditions. Cada precondition tem `codigo`, `descricao`, `etapa` (3/4/5), `evidencia_no_relato`. O prompt instrui: "Cada pré-condição MUST have direct evidence from the report — no inferences."

**Prioridade:** O mecanismo determinístico substitui o LLM quando gera resultados (L298–318 em `pipeline.ts`).

### Achados

**1. O motor retorna preconditions?**
SIM. `step6_7.precondicoes` — array de `{codigo, descricao, etapa, evidencia_no_relato}`.

**2. Onde elas são geradas?**
Dois locais: `selectDeterministicPreconditions()` (determinístico, baseado em matrix.json) e `runStep6_7()` (LLM). O determinístico tem prioridade quando dispara.

**3. São derivadas por active failure?**
NÃO no sentido Hendy. A derivação é por **lookup de código de active failure** — se o action_code é A-D, então as preconditions são W1, W2, P1, O2, O4 (com verificação de evidência textual). Isso é uma operacionalização/heurística, não uma análise causal de active failure que percorre a cadeia de eventos.

**4. São derivadas por P/O/A?**
SIM — o matrix.json usa combinações de `perception_code`, `objective_code`, `action_code`, `erc_level` como chave de lookup.

**5. São inferidas por LLM?**
SIM, pelo mecanismo LLM (Step 6/7), quando o determinístico não dispara ou como base a ser substituída.

**6. São inferidas por regras/heurística?**
SIM, pelo mecanismo determinístico — heurística de lookup de código.

**7. Há categorias de preconditions compatíveis com Hendy?**
SIM. Os códigos P1–P7, T1–T2, W1–W3, S1–S3, O1–O6 do `Pre-Conditions.json` mapeiam para as categorias de Hendy: Personnel (P), Task (T), Workplace (W), Supervision/Command/Control (S), Organisation (O). A taxonomia de categorias é compatível.

**8. O resultado final preserva vínculo active_failure → precondition → evidence?**
PARCIALMENTE. O campo `evidencia_no_relato` vincula a precondition ao texto do relato. O campo `etapa` vincula à ladder (3/4/5). MAS não há um campo explícito `active_failure_code` na estrutura de cada precondition que feche o vínculo formal. A cadeia é implícita: "este precondition veio da regra que disparou para action_code A-X", mas não está exposta no schema.

**9. Há preconditions_trace?**
NÃO. O campo `sourceRuleId` existe internamente em `SelectedPrecondition` (resultado de `selectDeterministicPreconditions()`), mas é descartado antes de chegar ao payload final (`.map(({ ruleSpecificity: _s, ruleOrder: _o, ...rest }) => rest)` em `select.ts` L166, e o `sourceRuleId` não está em `normPrecondition()`). Não existe `preconditions_trace` no output.

**10. Classificação de preconditions:**
`HFA_ADAPTATION_REQUIRES_NOTE` (alto impacto):
- A taxonomia de categorias é compatível com Hendy.
- O mecanismo de derivação não é análise causal de active failure — é lookup de código.
- O vínculo `active_failure → precondition → evidence` é implícito, não estruturado.
- `preconditions_trace` não existe.
- `sourceRuleId` não é preservado no output.

---

## 7. Output/Schema Audit

### Campos presentes no payload final (`buildAnalysisUpsertPayload`)

| Campo | Fonte | Status |
|---|---|---|
| `event_id`, `tenant_id` | Parâmetros | presente |
| `summary` | step1.summary | presente |
| `event_date`, `event_location`, `occupants_count`, `flight_phase`, `weather_conditions`, `systems_involved` | step1 | presente |
| `event_summary` | rawInput (truncado) | presente |
| `escape_point` | step2.justificativa | presente (≈ departure justification) |
| `unsafe_agent` | step2.agente | presente |
| `unsafe_act` | step2.ato_inseguro_factual | presente |
| `perception_code` | step3.codigo | presente |
| `perception_name` | FAILURE_NAMES lookup | presente |
| `perception_justification` | joinNodes(step3) | presente |
| `perception_discarded` | step3.falhas_descartadas + nos_percorridos | presente (trace parcial) |
| `objective_code` | step4.codigo | presente |
| `objective_name` | FAILURE_NAMES lookup | presente |
| `objective_justification` | joinNodes(step4) | presente |
| `objective_discarded` | step4 | presente (trace parcial) |
| `action_code` | step5.codigo | presente |
| `action_name` | FAILURE_NAMES lookup | presente |
| `action_justification` | joinNodes(step5) | presente |
| `action_discarded` | step5 | presente (trace parcial) |
| `preconditions` | step6_7.precondicoes (normalizados) | presente |
| `conclusions` | step6_7.conclusoes | presente |
| `recommendations` | step6_7.recomendacoes (normalizados) | presente |
| `erc_level` | step6_7.erc_level | presente |
| `raw_llm_output` | todos os steps | presente (dump completo) |
| `motor_version` | SERA_MOTOR_VERSION | presente |
| `analysis_completeness` | computeCompleteness() | presente |
| `completeness_reason` | computeCompleteness() | presente |

### Campos ausentes (lacunas de rastreabilidade)

| Campo esperado (Hendy) | Status | Nota |
|---|---|---|
| `safe_operation_escape_point` | AUSENTE como nome explícito | Aproximado por `escape_point` (justificativa do step2) |
| `unsafe_condition` | AUSENTE | Sem distinção de `unsafe_act` |
| `direct_actor` | AUSENTE no output | Lógica interna existe (`isMaintainenceOrOrganizationalAgent`) mas não exposta |
| `goal_statement` | AUSENTE | Não extraído antes da ladder |
| `perception_statement` | AUSENTE | Não extraído antes da ladder |
| `action_statement` | AUSENTE | Apenas `unsafe_act` como proxy |
| `question_trace` | AUSENTE como field | Parcialmente em `raw_llm_output.step*.nos_percorridos` |
| `decision_trace` | AUSENTE como field | Parcialmente em `raw_llm_output.step*.falhas_descartadas` |
| `preconditions_trace` | AUSENTE | `sourceRuleId` existe internamente mas é descartado |
| `unanswered_questions` | AUSENTE | Sistema sempre produz código; "DADO INSUFICIENTE" é tratado como Não |

---

## 8. Classificação dos Achados

### SOURCE_ALIGNED
- Taxonomia de preconditions P/T/W/S/O — compatível com Hendy.
- ERC (Error Recovery Characteristics) — referência explícita a "Hendy 2003" no prompt de Step 6/7.
- Conceito de "Ponto de Desvio da Operação Segura" no Point.json — captura a essência do departure point.
- Step 2 identifica ator, ato observável, momento e justificativa — elementos presentes em Hendy Step 1.
- Os nós LLM em Steps 3–5 fazem perguntas compatíveis com as perguntas das ladders de Hendy.

### HFA_ADAPTATION_REQUIRES_NOTE

1. **Step 1 HFA ≠ Step 1 Hendy**: HFA Step 1 é extração de metadados; o conteúdo de Hendy Step 1 (departure point) está no HFA Step 2. Impacto: terminologia dos "steps" é internamente inconsistente com Hendy.

2. **Ausência de goal/perception/action statements**: Hendy exige statements explícitos antes das ladders. No HFA, esses statements são implícitos dentro dos gates/LLM de Steps 3–5. Impacto: rastreabilidade do raciocínio pré-ladder é ausente.

3. **Unsafe act ≠ unsafe condition**: Hendy distingue explicitamente. HFA usa um campo único `ato_inseguro_factual`. Impacto: análises de condição latente vs. ato ativo não podem ser diferenciadas no schema.

4. **Derivação de preconditions por lookup de código, não por causal chain**: Hendy derivaria preconditions rastreando a active failure. HFA usa matrix.json baseado em fixtures. Impacto: alto — a validade científica da derivação depende da qualidade dos fixtures, não de uma análise causal formal.

5. **Separação ator direto / supervisão apenas interna**: A função `isMaintainenceOrOrganizationalAgent()` existe mas não produz campos no output. Impacto: análises de distribuição de atores por nível hierárquico não são possíveis sem reprocessar os dados brutos.

### TECHNICAL_HEURISTIC

1. **Gates determinísticos + LLM fallback em vez de ladder interrogativa**: A arquitetura é um sistema de regras heurísticas com LLM como fallback, não uma ladder com perguntas sequenciais aplicadas uniformemente. Impacto: casos onde gates disparam não têm o mesmo grau de interrogação que casos onde o LLM é consultado.

2. **infer* functions em pipeline.ts**: `inferObjectiveCode()`, `inferActionCode()`, `inferPerceptionCode()`, `inferErcLevel()` são fallbacks de keyword-matching aplicados quando o output do LLM não é válido. Impacto: dupla heurística — gates determinísticos + infer functions — sem rastreabilidade explícita de qual caminho foi tomado.

3. **"DADO INSUFICIENTE" como Não, não como estado separado**: Qualquer caso de evidência insuficiente é forçado para o branch Não do gate, produzindo um código. Impacto: não é possível distinguir "classificado como P-A por evidência positiva de P-A" de "classificado como P-A por ausência de evidência de qualquer outra coisa".

### UNCONFIRMED
- Não foi possível confirmar a existência de arquivos de Step 3/4/5 separados (`step3.ts`, `step4.ts`, `step5.ts`); eles existem mas são re-exports de `all-steps.ts` — arquitetura real está toda em `all-steps.ts`.

### GAP

1. **unsafe_condition**: Campo ausente em toda a stack. Nenhum nível do código distingue unsafe act de unsafe condition.
2. **goal_statement / perception_statement / action_statement**: Ausentes como campos intermediários antes das ladders.
3. **question_trace estruturado**: `nos_percorridos` contém justificativas mas não IDs de perguntas mapeados às ladders de Hendy.
4. **preconditions_trace**: `active_failure → precondition → evidence` não é uma estrutura explícita; `sourceRuleId` é descartado antes do output.
5. **unanswered_questions**: Não existe estado de classificação inconclusiva — o sistema sempre produz um código válido.

---

## 9. Riscos Metodológicos

### Risco 1 — Colapsamento do Step 2 de Hendy (ALTO)
O ponto mais crítico: Hendy Step 2 exige que goal/perception/action sejam formulados como statements **antes** de entrar nas ladders. No HFA, esses statements não existem explicitamente — as ladders recebem o texto bruto e produzem o código diretamente. Isso significa que se o texto bruto for ambíguo, não há um estágio de interpretação intermediário registrável.

### Risco 2 — Ausência de unsafe act / unsafe condition (ALTO)
A ausência da distinção unsafe act vs. unsafe condition impede análises epidemiológicas que dependam dessa categorização. Se uma base de dados HFA/SERA for usada para pesquisa sobre patterns de condições latentes vs. atos, a ausência desse campo é uma limitação estrutural.

### Risco 3 — Preconditions como lookup, não causal chain (MÉDIO-ALTO)
O matrix.json é descrito como "HFA fixture-derived". Se os fixtures que geraram o matrix forem limitados ou tendenciosos, as preconditions produzidas refletem esse viés. Não há mecanismo interno para detectar quando uma precondition derivada por lookup não se sustenta na narrativa específica.

### Risco 4 — Gates determinísticos sem rastreabilidade diferenciada (MÉDIO)
Quando um gate determinístico dispara, o `nos_percorridos` registra uma afirmação, não uma pergunta respondida. A qualidade do raciocínio nesses casos é da função `evidenceOf*()`, não do LLM. Se uma função `evidenceOf*()` tiver falsos positivos, o trace não registra nenhuma justificativa alternativa considerada.

### Risco 5 — Classificação forçada vs. evidência insuficiente (MÉDIO)
O sistema não tem estado de "não classificável" ou "evidência insuficiente para classificação final". Todo relato, por mais vago que seja, produz um código P/O/A completo. Isso pode inflar artificialmente a confiança nos dados.

---

## 10. Recomendação para A3-b

A3-b deve focar em **decision_trace como estrutura rastreável**, abordando especificamente:

1. **decision_trace no schema de output**: Adicionar um campo `decision_trace` ao payload final que registre, para cada Step 3/4/5, se o código foi produzido por gate determinístico, infer function, ou nó LLM — com o nome do gate ou nó responsável. Isso resolve o Risco 4 sem alterar a lógica de classificação.

2. **Formalizar o vínculo active_failure → precondition**: Preservar `sourceRuleId` no output de preconditions. Isso resolve o Gap de `preconditions_trace` sem alterar o mecanismo de derivação.

3. **Documentar a adaptação de Step 1/Step 2**: O mapeamento HFA Step 1 = metadata extraction, HFA Step 2 = Hendy Step 1 departure point, HFA Steps 3-5 = Hendy Step 2+ladder implícito — deve ser formalmente documentado na metodologia. Isso não requer alteração de código, mas reduz o risco metodológico de interpretação.

4. **NÃO recomendado para A3-b**: Reimplementar ladders interrogativas com question IDs, extrair goal/perception/action statements como etapa separada, ou introduzir unsafe_condition como campo — essas mudanças têm alto impacto no pipeline e nos fixtures, e requerem validação empírica separada antes de qualquer promoção para baseline.

---

*Documento criado em 2026-05-21 como parte da fase SERA v0.1.4-A3-a-mini. Nenhum código, fixture, candidate, baseline ou report foi alterado. Este documento é auditoria read-only.*
