# Real Event Adjudication 001

Status:
- AI_AUTHOR_ADJUDICATION_DRAFT
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- adjudicationId: REAL-EVENT-ADJUDICATION-001
- sourceExtractionId: REAL-EVENT-EXTRACTION-001
- originalCandidateId: REAL-EVENT-0001
- shortLabel: Thebaud S-92A offshore low-energy descent
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM

## factualBasis
- Voo IFR offshore com duas aproximações por instrumento sem sucesso por baixa visibilidade.
- Transição para aproximação visual após contato com plataforma.
- Desenvolvimento de baixa energia (low airspeed + high descent rate), overtorque reportado e recuperação a ~13 ft da água.
- Barreira EGPWS sem alerta no envelope reportado (condição de barreira degradada).

## safeOperationEscapePointCandidate
Ponto candidato preferencial: momento em que a aproximação visual passou de perfil monitorável para estado detectável de baixa energia/alta razão de descida sem correção tempestiva.

## unsafeState
Estado degradado de energia e trajetória em aproximação visual offshore com margem vertical muito reduzida.

## unsafeActOrCondition
Predominância de combinação:
- condição: DVE/baixa visibilidade + lacuna de barreira de alerta (EGPWS no envelope reportado);
- conduta: monitoramento/correção tardia possível, mas não isolável com robustez PF/PM nesta fase.

## directActor
Tripulação de voo (PF/PM não segregados com precisão suficiente no pacote atual).

## P_axis_reasoning
Há indício de não detecção ou detecção tardia do estado de baixa energia. A evidência sustenta melhor hipótese de monitoramento/percepção degradada do que ausência completa de falha perceptiva.

## O_axis_reasoning
Objetivo observado no factual: completar aproximação com segurança após contato visual; não há evidência positiva de intenção desviante/eficiência sobre segurança.

## A_axis_reasoning
Há possibilidade de execução/controle não suficientemente corretivos, porém o pacote factual não separa com robustez ação inadequada vs detecção tardia vs limitação de barreira.

## proposedPCode or UNRESOLVED
P-G

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: informação de estado (velocidade/razão de descida) aparentemente disponível, com indicação de reconhecimento/correção tardia.
- O: decisão observável foi seguir abordagem visual após contato; sem evidência de violação intencional ou objetivo de eficiência.
- A: insuficiência para atribuir mecanismo específico de falha de ação sem PF/PM detalhado.

## evidenceRefsByAxis
- P:
  - "Shortly after commencing the visual approach ... high rate of descent; low airspeed."
  - recuperação apenas em altura muito baixa.
- O:
  - "After acquiring visual contact, the crew elected to carry out a visual approach."
- A:
  - ausência de detalhamento fino de inputs/callouts PF/PM no material atual.

## uncertaintyByAxis
- P: MEDIUM (mecanismo exato entre percepção e monitoramento não totalmente separado).
- O: LOW/MEDIUM.
- A: HIGH (insuficiente para código ativo específico).

## rejectedAlternatives
- P-A rejeitado: há evidência de degradação não controlada em perfil crítico.
- O-C/O-D rejeitados: ausência de evidência de desvio consciente/objetivo de eficiência.
- A-A rejeitado por ora: sem base suficiente para afirmar ausência de mecanismo de falha de ação específica.

## evidenceCategoryHints
- PERCEPTUAL_AMBIGUITY
- FEEDBACK_VERIFICATION
- RULE_NORM_CONTEXT
- UNKNOWN_OR_UNCATEGORIZED

## adjudicationQuestionsForAuthor
- Confirmar se a fronteira preferida é P-G vs P-H para este caso.
- Confirmar se manter `A=UNRESOLVED` na rodada piloto é a opção metodologicamente mais conservadora.

## downstreamLocks
- proposedCode é rascunho de adjudicação, não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem `finalConclusion`.
- sem HFACS.
- sem Risk/ERC.
- sem recommendations.
- sem abertura downstream.

## nextStepRecommendation
Levar para A4+R-64 com possibilidade de refinamento PF/PM e revisão de evidência temporal para reduzir incerteza no eixo A.

## A4+R-64 refinement status
- refinementStatus: AUTHOR_REVIEW_READY
- rationale: Base factual, escape point, unsafe state e propostas por eixo estão documentados; eixo A permanece aberto por ausência de separação PF/PM suficiente.
- unresolvedAxes:
  - A
- enrichmentNeeded:
  - Refinar evidência temporal/callouts para reduzir ambiguidade no eixo A.
- authorQuestionsRemaining:
  - Confirmar fronteira final `P-G` vs `P-H`.
  - Confirmar manutenção de `A=UNRESOLVED` neste estágio.
- noReleasedCode: true
