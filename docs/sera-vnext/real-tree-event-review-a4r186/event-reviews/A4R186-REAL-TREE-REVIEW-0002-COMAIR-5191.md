# A4R186-REAL-TREE-REVIEW-0002 — Real Tree Review

    ## 1. Header
    - reviewId=A4R186-REAL-TREE-REVIEW-0002
    - eventKey=Comair 5191 LEX
    - sourceExtractionId=A4R180-EXTRACTION-0002
    - approvedEscapePointScope=Virada e alinhamento na pista 26 em vez da pista 22 - primeira acao errada da tripulacao
    - actorModel=CREW_INTEGRATED_ACTOR_MODEL
    - treeSource=A4R99
    - realTreeGate=PASS_WITH_LIMITATIONS
    - notFinalClassification=true
    - poaClosureAllowed=false

    ## 2. Factual escape point summary
    Virada e alinhamento na pista 26 em vez da pista 22 - primeira acao errada da tripulacao.

    ## 3. Evidence fragments
    - COMAIR-A4R180-F1: Briefing e setup apontavam para pista 22.
- COMAIR-A4R180-F2: Taxi e clearance apontavam para pista 22.
- COMAIR-A4R180-F3: Lineup e corrida iniciados na pista 26.

    ## 4. Perception axis traversal
    - nodeId: P_ROOT
  exactQuestionTextPt: O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?
  exactQuestionTextEn: What did the operator or crewmember believe was the state of the world with respect to the goal(s)?
  answerStatus: EVIDENCE_INSUFFICIENT
  evidenceAnchor: COMAIR-A4R180-F1/F2/F3
  reasoning: Draft de travessia ancorado apenas em evidencia factual de A4R180-EXTRACTION-0002.
  nextNodeDecision: PROCEED_TO_P_ASSESSMENT
  unresolvedIssue: Descricao de crença operacional precisa de delimitacao autoral.
- nodeId: P_ASSESSMENT
  exactQuestionTextPt: Avaliação correta ou adequada da situação?
  exactQuestionTextEn: Correct or adequate assessment of the situation?
  answerStatus: EVIDENCE_SUPPORTS_NO
  evidenceAnchor: COMAIR-A4R180-F1/F2/F3
  reasoning: Draft de travessia ancorado apenas em evidencia factual de A4R180-EXTRACTION-0002.
  nextNodeDecision: PROCEED_TO_P_CAPABILITY
  unresolvedIssue: Evidencia aponta avaliacao inadequada da situacao no ponto de fuga.
- nodeId: P_CAPABILITY
  exactQuestionTextPt: Possuía a capacidade necessária para sentir e perceber a situação?
  exactQuestionTextEn: Had the pre-requisite capability to sense and perceive the situation?
  answerStatus: EVIDENCE_INSUFFICIENT
  evidenceAnchor: COMAIR-A4R180-F1/F2/F3
  reasoning: Draft de travessia ancorado apenas em evidencia factual de A4R180-EXTRACTION-0002.
  nextNodeDecision: AXIS_TREE_TRAVERSAL_BLOCKED
  unresolvedIssue: Branch entre capacidade sensorial, conhecimento ou outra condicao nao foi fechado nesta fase.

    ## 5. Objective axis traversal
    - nodeId: O_ROOT
  exactQuestionTextPt: O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro?
  exactQuestionTextEn: What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act?
  answerStatus: EVIDENCE_INSUFFICIENT
  evidenceAnchor: COMAIR-A4R180-F1/F2/F3
  reasoning: Draft de travessia ancorado apenas em evidencia factual de A4R180-EXTRACTION-0002.
  nextNodeDecision: PROCEED_TO_O_RULES
  unresolvedIssue: Objetivo imediato foi identificado, mas sem fechamento por node nesta fase.
- nodeId: O_RULES
  exactQuestionTextPt: O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos?
  exactQuestionTextEn: Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management?
  answerStatus: EVIDENCE_INSUFFICIENT
  evidenceAnchor: COMAIR-A4R180-F1/F2/F3
  reasoning: Draft de travessia ancorado apenas em evidencia factual de A4R180-EXTRACTION-0002.
  nextNodeDecision: AXIS_TREE_TRAVERSAL_BLOCKED
  unresolvedIssue: Consistencia completa com regras/SOP/risk management depende de decisao autoral por node.

    ## 6. Action axis traversal
    - nodeId: A_ROOT
  exactQuestionTextPt: Como o operador estava tentando atingir o objetivo?
  exactQuestionTextEn: How was the operator trying to achieve the goal(s)?
  answerStatus: EVIDENCE_INSUFFICIENT
  evidenceAnchor: COMAIR-A4R180-F1/F2/F3
  reasoning: Draft de travessia ancorado apenas em evidencia factual de A4R180-EXTRACTION-0002.
  nextNodeDecision: PROCEED_TO_A_IMPLEMENTED
  unresolvedIssue: Metodo de execucao da acao foi descrito, mas sem branch fechado.
- nodeId: A_IMPLEMENTED
  exactQuestionTextPt: A ação foi implementada como pretendida?
  exactQuestionTextEn: Implemented as intended?
  answerStatus: EVIDENCE_INSUFFICIENT
  evidenceAnchor: COMAIR-A4R180-F1/F2/F3
  reasoning: Draft de travessia ancorado apenas em evidencia factual de A4R180-EXTRACTION-0002.
  nextNodeDecision: AXIS_TREE_TRAVERSAL_BLOCKED
  unresolvedIssue: Branch de implementacao e adequacao de resposta requer decisao autoral por node.

    ## 7. Axis provisional synthesis
    - perceptionTraversalStatus=TREE_TRAVERSAL_ATTEMPTED
    - objectiveTraversalStatus=AUTHOR_REVIEW_REQUIRED
    - actionTraversalStatus=AUTHOR_REVIEW_REQUIRED
    - provisionalAxisFinding=AUTHOR_REVIEW_REQUIRED
    - rationale=Travessia iniciada com nodes canonicos; fechamento de branch permanece bloqueado para intake autoral por node.

    ## 8. Author review questions
    - Administrative prompt: Author must confirm whether nodeId P_ASSESSMENT draft answer is accepted, rejected, or needs more evidence.
    - Administrative prompt: Author must confirm whether nodeId O_RULES draft answer is accepted, rejected, or needs more evidence.
    - Administrative prompt: Author must confirm whether nodeId A_IMPLEMENTED draft answer is accepted, rejected, or needs more evidence.
    - Administrative prompt: If branch closure cannot be justified with current evidence, mark BRANCH_BLOCKED or AXIS_TRAVERSAL_BLOCKED.

    ## 9. Locks
    - no final P/O/A closure
    - no selected code
    - no release action
    - no fixture
    - no baseline
    - no downstream
    - no invented nodes or invented questions
