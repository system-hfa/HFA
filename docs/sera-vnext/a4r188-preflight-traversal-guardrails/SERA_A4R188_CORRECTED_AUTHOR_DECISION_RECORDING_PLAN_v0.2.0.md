# SERA A4R188 Corrected Author Decision Recording Plan v0.2.0

status: PREFLIGHT_CORRECTED_PLAN_ACTIVE
phase: A4R188
sourceAuditFinding: B-02 (plano original nao previa continuacao de traversal alem dos 7 nodes)
supersedes: SERA_A4R188_AUTHOR_NODE_DECISION_RECORDING_PLAN_v0.2.0.md (plano original — estruturalmente insuficiente)
locks: NOT_FINAL_CLASSIFICATION | NOT_POA_CLOSURE | NOT_SELECTED_CODE | NOT_FIXTURE | NOT_BASELINE | NOT_DOWNSTREAM
DOCS_ONLY
NO_RUNTIME_CHANGE
NO_AXIS_DECISION

---

## 1. Objetivo e escopo

Este documento é o guia operacional completo para a fase A4R188. Substitui o plano original (SERA_A4R188_AUTHOR_NODE_DECISION_RECORDING_PLAN_v0.2.0.md) que carecia de regras de traversal extension e critérios de bloqueio/escalação.

A4R188 consiste em preencher authorDecision e authorDecisionRationale para cada node existente na A4R187, e criar registros de extensão (TRAVERSAL_EXTENSION) quando necessário, até que cada eixo de cada evento atinja um leaf code ou um bloqueio justificado.

**A4R188 NÃO:**
- Não fecha P/O/A
- Não cria código selecionado com status ativo
- Não cria código liberado com status ativo
- Não cria fixture, baseline, downstream
- Não abre HFACS, Risk/ERC, ARMS/ERC, recommendations
- Não inventa nodeId além de A4R99
- Não usa A4R184-Q como fonte de perguntas
- Não usa consequência posterior ao ponto de fuga como causa P/O/A

---

## 2. Pré-condições obrigatórias antes de iniciar qualquer node

### 2.1 Para todos os eventos

Antes de registrar authorDecision em qualquer node:

1. Ler as guardrails completas: `SERA_A4R188_PREFLIGHT_TRAVERSAL_GUARDRAILS_v0.2.0.md`
2. Verificar o escopo do escape point aprovado em A4R182 para o evento
3. Confirmar que todos os nodeIds usados existem em A4R185

### 2.2 Exclusivo para United 173

Antes de registrar authorDecision em qualquer node de United 173:

1. Declarar explicitamente `ESCAPE_POINT_TEMPORAL_BOUNDARY_REQUIRED: true`
2. Registrar `escapePointTemporalBoundary` com momento exato (ou janela mínima) ancorado em A4R180-EXTRACTION-0017
3. Se não puder delimitar com evidência suficiente: registrar `AXIS_TRAVERSAL_BLOCKED` para todos os eixos com rationale `ESCAPE_POINT_TEMPORAL_BOUNDARY_NOT_ESTABLISHED`

---

## 3. Protocolo de decisão para cada node

### Passo 1 — Ler evidência

Para o evento correspondente ao node, ler a extração A4R180 completa. Identificar os fragmentos factuais relevantes para a pergunta canônica do node (exactQuestionTextPt conforme A4R99).

### Passo 2 — Verificar o node na A4R99

Confirmar:
- `nodeId` está presente em A4R185 (usableForAxisDecision=true)
- `exactQuestionTextPt` na A4R187 corresponde literalmente ao A4R99

### Passo 3 — Registrar authorDecision

Valores permitidos:

| Valor | Quando usar |
|---|---|
| SIM | A evidência factual do evento aponta que a resposta à pergunta canônica é afirmativa |
| NÃO | A evidência factual do evento aponta que a resposta à pergunta canônica é negativa |
| SIM_ATENCAO | Aplicável apenas em nodes que especificam esta variante (P_TIME_PRESSURE, A_TIME_PRESSURE) |
| SIM_GERENCIAMENTO | Aplicável apenas em nodes que especificam esta variante |
| NÃO_SENSORIAL | Aplicável apenas em P_CAPABILITY |
| NÃO_CONHECIMENTO | Aplicável apenas em P_CAPABILITY e A_CAPABILITY |
| NÃO_INABILIDADE | Aplicável apenas em A_CAPABILITY |
| NÃO_DESLIZE_LAPSO_ERRO | Aplicável apenas em A_IMPLEMENTED |
| NÃO_FEEDBACK | Aplicável apenas em A_IMPLEMENTED e A_TIME_PRESSURE |
| NÃO_SELECAO | Aplicável apenas em A_TIME_PRESSURE |
| SIM_SELECAO | Aplicável apenas em A_TIME_PRESSURE |
| SIM_FEEDBACK | Aplicável apenas em A_TIME_PRESSURE |
| NEEDS_MORE_EVIDENCE | A evidência disponível é insuficiente para decisão |
| AXIS_TRAVERSAL_BLOCKED | Impossível prosseguir neste eixo — registrar rationale |
| BRANCH_BLOCKED | Impossível prosseguir neste branch específico — registrar rationale |

### Passo 4 — Escrever authorDecisionRationale

O rationale DEVE:
- Conectar explicitamente: fragmento factual específico do evento → resposta à pergunta canônica
- Ser específico o suficiente para ser verificável por terceiro que leia A4R180 do mesmo evento
- Referenciar fragmentos de evidência por ID (ex.: ASIANA-A4R180-F1, UNITED-173-A4R180-F3)
- Pertencer temporalmente ao momento do escape point aprovado em A4R182

O rationale NÃO PODE:
- Ser idêntico ao rationale da A4R187 (genérico por posição de node)
- Descrever estrutura do node sem conexão factual com o evento
- Referenciar apenas rótulo de fragmento sem usar conteúdo
- Reescrever conclusão do NTSB/TSIB/AAIB como rationale SERA
- Usar evento posterior ao ponto de fuga como causa P/O/A

### Passo 5 — Verificar se a traversal exige extensão

Após registrar authorDecision, verificar se o branch resultante aponta para outro node (não é leaf):

- Consultar `SERA_A4R188_TRAVERSAL_EXTENSION_POLICY_MATRIX_v0.2.0.csv` para o nodeId e decision atual
- Se a coluna `extensionRequiredWhen` se aplica: registrar `TRAVERSAL_EXTENSION_REQUIRED` no campo de notas
- Criar nova linha de extensão conforme seção 4 deste documento

---

## 4. Protocolo de traversal extension

### 4.1 Quando criar extensão

Criar um registro de extensão quando authorDecision em um node existente resultar em branch que aponta para outro node (não leaf). Exemplos:

- P_ASSESSMENT: NÃO → continuar para P_CAPABILITY
- P_CAPABILITY: SIM → continuar para P_TIME_PRESSURE
- P_TIME_PRESSURE: NÃO → continuar para P_INFORMATION_AMBIGUOUS
- P_INFORMATION_AMBIGUOUS: NÃO → continuar para P_INFORMATION_AVAILABLE
- O_RULES: SIM → continuar para O_MANAGED_RISK
- O_RULES: NÃO → continuar para O_ROUTINE
- A_IMPLEMENTED: SIM → continuar para A_CORRECT
- A_CORRECT: NÃO → continuar para A_CAPABILITY
- A_CAPABILITY: SIM → continuar para A_TIME_PRESSURE

### 4.2 Formato obrigatório do registro de extensão

```
intakeId: A4R188-EXT-{NNNN}
sourceTraversalId: {intakeId da linha A4R187 que originou a extensão}
eventKey: {ASIANA_214 | COMAIR_5191 | AMERICAN_1420 | UPS_1354 | UNITED_173}
axis: {P | O | A}
nodeId: {nodeId canônico de A4R99 — verificar em A4R185}
exactQuestionTextPt: {copiado LITERALMENTE de A4R99, sem alteração}
authorDecision: PENDING_AUTHOR_DECISION
authorDecisionRationale: [a preencher — exigido factual e evento-específico]
notFinalClassification: true
poaClosureAllowed: false
selectedCodeAllowed: false
fixturePromotionAllowed: false
baselinePromotionAllowed: false
downstreamAllowed: false
extensionSource: TRAVERSAL_EXTENSION
```

### 4.3 Sequência numérica de extensões

Usar sequência global A4R188-EXT-0001, A4R188-EXT-0002, etc.
Não reutilizar intakeIds da A4R187 (A4R187-XXXX) em registros de extensão.

### 4.4 Proibições absolutas de extensão

Nunca criar extensão com:
- nodeId não presente em A4R185
- nodeId inventado, aproximado ou derivado de fonte não canônica
- nodeId baseado em questão A4R184-Q quarentenada
- nodeId correspondente a consequência posterior ao ponto de fuga aprovado

### 4.5 Limite de extensão e critério de escalação

Se um único eixo de um único evento acumular 3 ou mais nodes de extensão sem atingir leaf code ou bloqueio: **declarar ESCALATION_REQUIRED e não prosseguir** — escalar para revisão Opus conforme seção 8.

---

## 5. Critérios de conclusão de A4R188

### 5.1 Critério de progresso mínimo para declarar A4R188 concluída

A4R188 está concluída quando:
- Pelo menos 25 dos 35 nodes originais da A4R187 têm authorDecision ≠ PENDING_AUTHOR_DECISION, E
- Cada eixo de cada evento tem pelo menos 1 node com decisão ≠ PENDING (traversal iniciada em todos os eixos)

**Encerrar A4R188 com todos os 35 nodes ainda em PENDING_AUTHOR_DECISION é PROIBIDO.**

### 5.2 Critério de bloqueio da fase

Encerrar com status PHASE_BLOCKED se:
- 15 ou mais nodes ficarem em NEEDS_MORE_EVIDENCE após revisão de evidência, OU
- Qualquer evento tiver todos os 3 eixos (P, O, A) bloqueados por insuficiência de evidência

Ao bloquear: registrar BLOCKED_REASON com referência ao evento e eixo específicos.

### 5.3 Critério de conclusão por eixo

Um eixo de um evento está concluído quando:
- A traversal atingiu um leaf code (P-A a P-H, O-A a O-D, A-A a A-J), OU
- A traversal registrou AXIS_TRAVERSAL_BLOCKED com rationale, OU
- Todos os branches foram respondidos e todos resultam em BRANCH_BLOCKED com rationale

Um eixo de um evento NÃO está concluído quando:
- Qualquer node intermediário permanece PENDING_AUTHOR_DECISION sem registrar TRAVERSAL_EXTENSION

---

## 6. Formato de resultado esperado de A4R188

Ao final de A4R188, para cada evento/eixo, deve existir uma das seguintes situações:

### Situação A — Leaf code atingido
```
lastNodeId: {nodeId}
authorDecision: {SIM|NÃO|variante}
resultCode: {P-A...P-H | O-A...O-D | A-A...A-J}
rationale: [factual, evento-específico]
```

### Situação B — Eixo bloqueado por evidência insuficiente
```
lastNodeId: {nodeId}
authorDecision: AXIS_TRAVERSAL_BLOCKED
blockedReason: NEEDS_MORE_EVIDENCE
evidenceGap: [descrição da lacuna de evidência]
```

### Situação C — Eixo bloqueado por boundary de ponto de fuga (United 173)
```
lastNodeId: N/A
authorDecision: AXIS_TRAVERSAL_BLOCKED
blockedReason: ESCAPE_POINT_TEMPORAL_BOUNDARY_NOT_ESTABLISHED
```

---

## 7. Checklist pré-commit de A4R188 (usar antes de qualquer commit)

- [ ] Todos os nodes de A4R187 têm authorDecision ≠ PENDING (ou NEEDS_MORE_EVIDENCE com justificativa)
- [ ] Para cada SIM/NÃO intermediário, existe registro de extensão ou BRANCH_BLOCKED
- [ ] Nenhum nodeId de extensão foi inventado (todos presentes em A4R185)
- [ ] Nenhum exactQuestionTextPt foi alterado em relação à A4R99
- [ ] Nenhum rationale usa evento posterior ao ponto de fuga
- [ ] United 173: escapePointTemporalBoundary declarado antes de qualquer node
- [ ] A4R184-Q não foi consultada para nenhuma pergunta
- [ ] Critério de progresso mínimo (seção 5.1) atingido ou PHASE_BLOCKED registrado

---

## 8. Critérios de escalação para revisão Opus

Escalar quando:
1. Boundary P/A for insolúvel com evidência disponível (ex.: American 1420 — boundary percepção/decisão incerto)
2. United 173 não puder ter temporal boundary definido com evidência de A4R180-0017
3. Qualquer traversal extension acumular 3+ nodes adicionais para o mesmo eixo sem leaf code ou bloqueio
4. O rationale do autor contradizer o escape point aprovado em A4R182
5. Qualquer node resultar em authorDecision que não corresponde a nenhum dos valores permitidos (seção 3, Passo 3)

Ao escalar: registrar ESCALATION_REQUIRED com referência ao evento, eixo e nodeId específicos.

---

## 9. Arquivos de entrada obrigatórios para A4R188

| Arquivo | Obrigatoriedade |
|---|---|
| A4R99 canonical tree | OBRIGATÓRIO — fonte única de nodeId e exactQuestionTextPt |
| A4R185 node inventory | OBRIGATÓRIO — validar que nodeId existe antes de usar |
| A4R182 decision matrix | OBRIGATÓRIO — escopos de escape point por evento |
| A4R180 extractions (0001, 0002, 0003, 0006, 0017) | OBRIGATÓRIO — evidência factual por evento |
| A4R180B enrichment matrix | RECOMENDADO — evidência complementar |
| A4R187 intake matrix | OBRIGATÓRIO — lista de 35 nodes base |
| SERA_A4R188_PREFLIGHT_TRAVERSAL_GUARDRAILS_v0.2.0.md | OBRIGATÓRIO — ler antes de iniciar |
| SERA_A4R188_TRAVERSAL_EXTENSION_POLICY_MATRIX_v0.2.0.csv | OBRIGATÓRIO — consultar por node |
| SERA_A4R188_EVENT_SPECIFIC_RATIONALE_CHECKLIST_v0.2.0.md | OBRIGATÓRIO — usar por node |
| A4R184-Q quarantine | INFORMATIVO — confirmar que nenhuma pergunta dali é usada |

---

## 10. Locks preservados

```
notFinalClassification=true
poaClosureAllowed=false
selectedCodeAllowed=false
fixturePromotionAllowed=false
baselinePromotionAllowed=false
downstreamAllowed=false
axisClosureAllowed=false
A4R184_QUARANTINE_PRESERVED=true
REAL_TREE_GATE=PASS_WITH_LIMITATIONS (A4R185)
inventorySource=SERA_REAL_TREE_NODE_INVENTORY_A4R185_v0.2.0.csv
canonicalTreeSource=SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
```
