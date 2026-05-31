# A4R187 Node Decision Packet 0017

## 1. Cabecalho
- packetId=A4R187-NODE-DECISION-PACKET-0017
- sourceReviewId=A4R186-REAL-TREE-REVIEW-0017
- treeSource=A4R99
- realTreeGate=PASS_WITH_LIMITATIONS
- notFinalClassification=true
- poaClosureAllowed=false

## 2. Evento
- eventId=0017
- eventKey=United 173 PDX

## 3. approvedEscapePointScope (A4R182)
- approvedEscapePointScope=Manutencao de troubleshooting quando a necessidade operacional ja era prosseguir para pouso imediato

## 4. Modelo de ator
- actorModel=CREW_INTEGRATED_ACTOR_MODEL

## 5. Lock metodologico
- Usar somente nodeId canonico e exactQuestionTextPt canonicamente registrados.
- Esta fase organiza decisao autoral por node e nao fecha eixo.

## 6. Nodes por eixo
### Eixo P
- intakeId: A4R187-NODE-0029
  nodeId: P_ROOT
  axis: P
  exactQuestionTextPt: O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?
  preliminaryAnswerStatus: EVIDENCE_INSUFFICIENT
  preliminaryAnswerRationale: Descricao de crença operacional precisa de delimitacao autoral.
  evidenceAnchor: UNITED-173-A4R180-F1/F2/F3/F4
  allowedAuthorDecisionValues:
  ACCEPT_NODE_ANSWER|REJECT_NODE_ANSWER|NEEDS_MORE_EVIDENCE|BRANCH_BLOCKED|AXIS_TRAVERSAL_BLOCKED
  authorDecision: ____________________
  authorDecisionRationale: ____________________
- intakeId: A4R187-NODE-0030
  nodeId: P_ASSESSMENT
  axis: P
  exactQuestionTextPt: Avaliação correta ou adequada da situação?
  preliminaryAnswerStatus: EVIDENCE_SUPPORTS_NO
  preliminaryAnswerRationale: Evidencia aponta avaliacao inadequada da situacao no ponto de fuga.
  evidenceAnchor: UNITED-173-A4R180-F1/F2/F3/F4
  allowedAuthorDecisionValues:
  ACCEPT_NODE_ANSWER|REJECT_NODE_ANSWER|NEEDS_MORE_EVIDENCE|BRANCH_BLOCKED|AXIS_TRAVERSAL_BLOCKED
  authorDecision: ____________________
  authorDecisionRationale: ____________________
- intakeId: A4R187-NODE-0031
  nodeId: P_CAPABILITY
  axis: P
  exactQuestionTextPt: Possuía a capacidade necessária para sentir e perceber a situação?
  preliminaryAnswerStatus: EVIDENCE_INSUFFICIENT
  preliminaryAnswerRationale: Branch entre capacidade sensorial, conhecimento ou outra condicao nao foi fechado nesta fase.
  evidenceAnchor: UNITED-173-A4R180-F1/F2/F3/F4
  allowedAuthorDecisionValues:
  ACCEPT_NODE_ANSWER|REJECT_NODE_ANSWER|NEEDS_MORE_EVIDENCE|BRANCH_BLOCKED|AXIS_TRAVERSAL_BLOCKED
  authorDecision: ____________________
  authorDecisionRationale: ____________________
### Eixo O
- intakeId: A4R187-NODE-0032
  nodeId: O_ROOT
  axis: O
  exactQuestionTextPt: O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro?
  preliminaryAnswerStatus: EVIDENCE_INSUFFICIENT
  preliminaryAnswerRationale: Objetivo imediato foi identificado, mas sem fechamento por node nesta fase.
  evidenceAnchor: UNITED-173-A4R180-F1/F2/F3/F4
  allowedAuthorDecisionValues:
  ACCEPT_NODE_ANSWER|REJECT_NODE_ANSWER|NEEDS_MORE_EVIDENCE|BRANCH_BLOCKED|AXIS_TRAVERSAL_BLOCKED
  authorDecision: ____________________
  authorDecisionRationale: ____________________
- intakeId: A4R187-NODE-0033
  nodeId: O_RULES
  axis: O
  exactQuestionTextPt: O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos?
  preliminaryAnswerStatus: EVIDENCE_INSUFFICIENT
  preliminaryAnswerRationale: Consistencia completa com regras/SOP/risk management depende de decisao autoral por node.
  evidenceAnchor: UNITED-173-A4R180-F1/F2/F3/F4
  allowedAuthorDecisionValues:
  ACCEPT_NODE_ANSWER|REJECT_NODE_ANSWER|NEEDS_MORE_EVIDENCE|BRANCH_BLOCKED|AXIS_TRAVERSAL_BLOCKED
  authorDecision: ____________________
  authorDecisionRationale: ____________________
### Eixo A
- intakeId: A4R187-NODE-0034
  nodeId: A_ROOT
  axis: A
  exactQuestionTextPt: Como o operador estava tentando atingir o objetivo?
  preliminaryAnswerStatus: EVIDENCE_INSUFFICIENT
  preliminaryAnswerRationale: Metodo de execucao da acao foi descrito, mas sem branch fechado.
  evidenceAnchor: UNITED-173-A4R180-F1/F2/F3/F4
  allowedAuthorDecisionValues:
  ACCEPT_NODE_ANSWER|REJECT_NODE_ANSWER|NEEDS_MORE_EVIDENCE|BRANCH_BLOCKED|AXIS_TRAVERSAL_BLOCKED
  authorDecision: ____________________
  authorDecisionRationale: ____________________
- intakeId: A4R187-NODE-0035
  nodeId: A_IMPLEMENTED
  axis: A
  exactQuestionTextPt: A ação foi implementada como pretendida?
  preliminaryAnswerStatus: EVIDENCE_INSUFFICIENT
  preliminaryAnswerRationale: Branch de implementacao e adequacao de resposta requer decisao autoral por node.
  evidenceAnchor: UNITED-173-A4R180-F1/F2/F3/F4
  allowedAuthorDecisionValues:
  ACCEPT_NODE_ANSWER|REJECT_NODE_ANSWER|NEEDS_MORE_EVIDENCE|BRANCH_BLOCKED|AXIS_TRAVERSAL_BLOCKED
  authorDecision: ____________________
  authorDecisionRationale: ____________________

## 8. Proibicoes
- Nao introduzir node nao canonicamente registrado na arvore real.
- Nao converter decisao de node em codigo liberado nesta fase.
- Nao promover conteudo para fixture, baseline ou fluxo posterior nesta fase.

## 9. Como responder
1. Validar o nodeId e a pergunta canonica do item.
2. Escolher somente um valor permitido de decisao autoral.
3. Registrar rationale curto e objetivo com base em evidencia ancorada.
4. Se a branch nao puder ser sustentada, escolher BRANCH_BLOCKED ou AXIS_TRAVERSAL_BLOCKED.

## 10. Sem fechamento de eixo
- axisClosureAllowed=false
- notFinalClassification=true
- poaClosureAllowed=false
