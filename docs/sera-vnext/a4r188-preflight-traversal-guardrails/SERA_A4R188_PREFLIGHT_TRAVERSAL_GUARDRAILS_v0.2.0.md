# SERA A4R188 Preflight Traversal Guardrails v0.2.0

status: PREFLIGHT_GUARDRAIL_ACTIVE
phase: A4R188-PREFLIGHT
sourceAudit: SONNET_AUDIT_POST_A4R187_2026-05-30
methodology: SERA
locks: NOT_FINAL_CLASSIFICATION | NOT_POA_CLOSURE | NOT_SELECTED_CODE | NOT_FIXTURE | NOT_BASELINE | NOT_DOWNSTREAM
DOCS_ONLY
NO_RUNTIME_CHANGE
NO_AXIS_DECISION

---

## 1. Estado real do repositório

- branch: main
- HEAD: 707049dcbea159f03489c1776022ef5ecc97bf32
- origin/main: 707049dcbea159f03489c1776022ef5ecc97bf32
- HEAD == origin/main: true
- A4R187 está commitada e pushada. Esta fase é pós-commit de A4R187.
- A questão "está pronta para commit?" é inaplicável a A4R187 — ela já está no histórico permanente.

---

## 2. Reconhecimento de A4R187

A4R187 é um artefato de intake estrutural correto:
- 35 linhas de node, 5 eventos, 7 nodes por evento.
- Todos os nodeIds são canônicos: presentes em A4R99 e inventariados em A4R185.
- Todas as exactQuestionTextPt correspondem ao A4R99.
- authorDecision=PENDING_AUTHOR_DECISION em todos os registros.
- Todos os flags de lock presentes em cada linha:
  notFinalClassification=true | poaClosureAllowed=false | selectedCodeAllowed=false |
  fixturePromotionAllowed=false | baselinePromotionAllowed=false | downstreamAllowed=false.

A4R187 NÃO constitui decisão P/O/A, não fecha eixo, não cria código selecionado, não produz código liberado,
não promove fixture, não altera baseline, não abre downstream.

---

## 3. Problema bloqueante identificado para A4R188

O plano A4R188 original (`SERA_A4R188_AUTHOR_NODE_DECISION_RECORDING_PLAN_v0.2.0.md`) não prevê o que
fazer quando a decisão autoral exige continuar a travessia além dos 7 nodes por evento listados na A4R187.

Exemplos de continuação necessária:
- P_CAPABILITY branch=SIM → necessário continuar para P_TIME_PRESSURE (node 4 do eixo P).
- P_TIME_PRESSURE branch=NÃO → necessário continuar para P_INFORMATION_AMBIGUOUS (node 5).
- P_INFORMATION_AMBIGUOUS branch=NÃO → necessário continuar para P_INFORMATION_AVAILABLE (node 6).
- O_RULES branch=SIM → necessário continuar para O_MANAGED_RISK (node 4 do eixo O).
- O_RULES branch=NÃO → necessário continuar para O_ROUTINE (node 3, eixo O).
- A_IMPLEMENTED branch=SIM → necessário continuar para A_CORRECT (node 3 do eixo A).
- A_CORRECT branch=NÃO → necessário continuar para A_CAPABILITY (node 4).
- A_CAPABILITY branch=SIM → necessário continuar para A_TIME_PRESSURE (node 5).

Sem previsão explícita deste cenário, A4R188 pode ser executada de forma mecânica,
preenchendo as 35 linhas existentes sem atingir nenhum leaf code. Isso constitui
encerramento artificial da travessia — proibido.

---

## 4. Regra de traversal extension

### 4.1 Definição

TRAVERSAL_EXTENSION é o ato de criar um ou mais registros adicionais de node para um evento
quando a decisão autoral em um node existente da A4R187 determinar que a travessia deve continuar.

### 4.2 Condições de permissão

Uma extensão de travessia é PERMITIDA quando:
- A decisão autoral em um node existente resulta em branch que aponta para outro node existente em A4R99.
- A continuação é necessária para alcançar um leaf code ou um bloqueio justificado.
- O nodeId do próximo node está presente em A4R99 e inventariado em A4R185.

### 4.3 Condições de proibição

Uma extensão de travessia é PROIBIDA quando:
- O nodeId do próximo node não está em A4R99.
- O nodeId seria inventado, aproximado ou derivado de fonte não canônica.
- O próximo node seria uma "pergunta por eixo" case-specific ou auxiliar (padrão A4R184-Q bloqueado).
- O próximo node seria baseado em consequência posterior ao ponto de fuga aprovado em A4R182.

### 4.4 Formato de registro de extensão

Cada node de extensão deve ter os mesmos campos da A4R187:
- intakeId: A4R188-EXT-{NNNN} (sequência nova, não reutilizar IDs da A4R187)
- sourceTraversalId: ID da linha A4R187 que originou a extensão
- nodeId: nodeId canônico de A4R99 (verificar presença em A4R185)
- exactQuestionTextPt: copiado LITERALMENTE de A4R99, sem alteração
- authorDecision: PENDING_AUTHOR_DECISION (até decisão autoral)
- authorDecisionRationale: exigido factual e evento-específico (ver seção 5)
- todos os locks: notFinalClassification=true | poaClosureAllowed=false | selectedCodeAllowed=false |
  fixturePromotionAllowed=false | baselinePromotionAllowed=false | downstreamAllowed=false

### 4.5 Proibição de encerramento artificial

É PROIBIDO encerrar a travessia de um eixo sem:
- alcançar um leaf code (P-A a P-H, O-A a O-D, A-A a A-J), ou
- registrar AXIS_TRAVERSAL_BLOCKED com rationale, ou
- registrar BRANCH_BLOCKED com rationale para o node específico.

Encerrar a fase A4R188 com todos os 35 nodes ainda em PENDING_AUTHOR_DECISION
NÃO constitui conclusão desta fase — é bloqueio por falta de decisão.

---

## 5. Exigência de rationale factual evento-específico

### 5.1 O que está proibido

É PROIBIDO registrar authorDecisionRationale com:
- texto genérico idêntico ao da A4R187 (ex.: "Evidencia aponta avaliacao inadequada").
- descrição estrutural do node sem conexão factual com o evento.
- referência apenas ao rótulo do fragmento sem usar seu conteúdo (ex.: "ver ASIANA-A4R180-F1").
- conclusão do NTSB/TSIB/AAIB reescrita como rationale SERA.
- consequência posterior ao ponto de fuga como causa P/O/A.

### 5.2 O que é exigido

Para cada node, antes de registrar authorDecision, o autor deve:
1. Ler a extração A4R180/A4R180B do evento correspondente.
2. Identificar os fragmentos factuais relevantes para a pergunta canônica do node.
3. Escrever rationale que CONECTA explicitamente:
   - fragmento factual específico do evento → resposta à pergunta canônica do node.
4. O rationale deve ser específico o suficiente para ser verificável por terceiro que leia
   A4R180 do mesmo evento.

### 5.3 Exemplo de rationale insuficiente vs. suficiente

Insuficiente (padrão A4R187, genérico):
  "Evidencia aponta avaliacao inadequada da situacao no ponto de fuga."

Suficiente (evento-específico, factual):
  Asiana 214 / P_ASSESSMENT:
  "F1 registra transição A/T para HOLD e deterioração simultânea de PAPI,
   airspeed e descent rate. Nenhum PF ou PM verbalizou o estado do A/T ou
   o desvio de perfil no intervalo pré-gate. A avaliação da situação era
   inadequada no ponto de fuga aprovado."

---

## 6. Regra especial para United 173

### 6.1 Risco identificado

O ponto de fuga de United 173 aprovado em A4R182 é:
"Manutencao de troubleshooting quando a necessidade operacional ja era prosseguir para pouso imediato."

Este ponto de fuga é temporalmente difuso — não descreve um momento de ação errada singular,
ao contrário dos outros 4 eventos (que têm momento observável de primeira ação errada).

### 6.2 Exigência pré-node para United 173

Antes de responder qualquer node de United 173, o autor DEVE registrar explicitamente:
- ESCAPE_POINT_TEMPORAL_BOUNDARY_REQUIRED: true
- escapePointTemporalBoundary: declaração autoral do momento exato (ou janela temporal mínima)
  dentro do qual o troubleshooting ainda poderia ter sido interrompido com pouso seguro possível.

Esta declaração deve ser ancorada em evidência de A4R180-EXTRACTION-0017 ou A4R180B.

### 6.3 Bloqueio em ausência de delimitação

Se o autor não puder delimitar temporalmente o ponto de fuga de United 173 com evidência
suficiente, deve registrar AXIS_TRAVERSAL_BLOCKED para todos os eixos do evento com
rationale: ESCAPE_POINT_TEMPORAL_BOUNDARY_NOT_ESTABLISHED.

### 6.4 Proibição específica para United 173

É PROIBIDO usar o flameout, o crash ou o retorno de combustível zero como âncora causal
para P, O ou A. Esses eventos são consequência posterior ao ponto de fuga, não causa.

---

## 7. Critérios de sucesso, bloqueio e escalação de A4R188

### 7.1 Critério de progresso mínimo

A4R188 não está concluída a menos que:
- Pelo menos 25 dos 35 nodes originais da A4R187 tenham authorDecision diferente de
  PENDING_AUTHOR_DECISION, OU
- Cada eixo de cada evento tenha pelo menos 1 node com decisão diferente de PENDING,
  indicando que a travessia foi iniciada por todos os eixos de todos os eventos.

### 7.2 Critério de bloqueio da fase

A4R188 deve ser encerrada com status PHASE_BLOCKED se:
- 15 ou mais nodes ficarem em NEEDS_MORE_EVIDENCE após revisão de evidência, OU
- Qualquer evento tiver todos os 3 eixos bloqueados por insuficiência de evidência.

Ao bloquear, registrar: BLOCKED_REASON com referência ao evento e eixo específicos.

### 7.3 Critério de escalação para revisão Opus

Escalar para revisão Opus quando:
- Boundary P/A for insolúvel com evidência disponível (ex.: American 1420 boundary percepção/decisão).
- United 173 não puder ter temporal boundary definido.
- Qualquer traversal extension produzir 3 ou mais nodes adicionais para o mesmo eixo
  sem atingir leaf code ou bloqueio.
- O rationale do autor contradizer o escape point aprovado em A4R182.

### 7.4 O que A4R188 não pode fazer

- Não fecha P/O/A.
- Não cria código selecionado com status ativo.
- Não produz código liberado com status ativo.
- Não cria fixture, baseline, downstream.
- Não abre HFACS, Risk/ERC, ARMS/ERC, recommendations.
- Não usa A4R184-Q como fonte de perguntas.
- Não inventa nodeId além de A4R99.
- Não usa consequência posterior ao ponto de fuga como causa P/O/A.

---

## 8. Locks preservados

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

---

## 9. Arquivos de referência para A4R188

| Arquivo | Uso |
|---|---|
| A4R99 canonical tree | fonte única de nodeId e exactQuestionTextPt |
| A4R185 node inventory | validação de que nodeId existe antes de usar |
| A4R182 decision matrix | escopos de escape point aprovados por evento |
| A4R180 extractions (0001, 0002, 0003, 0006, 0017) | evidência factual por evento |
| A4R180B enrichment matrix | evidência complementar por evento |
| A4R187 intake matrix | lista de 35 nodes com status PENDING |
| A4R186 event reviews | contexto de travessia preliminar |
| A4R184-Q quarantine | confirmar que nenhuma pergunta dali é usada |
