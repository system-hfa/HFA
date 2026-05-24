# Real Event Adjudication 002

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

- adjudicationId: REAL-EVENT-ADJUDICATION-002
- sourceExtractionId: REAL-EVENT-EXTRACTION-002
- originalCandidateId: REAL-EVENT-0002
- shortLabel: Peasmarsh discontinued night approach near trees
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM

## factualBasis
- Aproximação noturna em local privado com baixa visibilidade/teto baixo.
- Aproximação descontinuada.
- Ausência reportada de go-around route/procedure disponível ou briefado.
- Descida da trajetória em direção a árvores.
- Alerta EGPWS registrado sem percepção pela tripulação.

## safeOperationEscapePointCandidate
Ponto candidato preferencial: transição para trajetória de descontinuação/arremetida sem rota protegida e com degradação de separação de obstáculos.

## unsafeState
Trajetória com redução de separação de obstáculo (árvores) em ambiente noturno degradado durante transição de escape.

## unsafeActOrCondition
Combinação fortemente ambígua:
- condição: ausência de go-around briefado + ambiente degradado + barreira de alerta não efetiva na prática;
- conduta: possível execução de trajetória de escape inadequada, ainda não decomposta com robustez.

## directActor
Tripulação de voo (PF/PM não decompostos no nível necessário para fechamento de mecanismo).

## P_axis_reasoning
O dado "warning emitted but not perceived" pode apontar para falha perceptiva/monitoramento, mas não diferencia com robustez comunicação de alerta, atenção, carga de trabalho ou entendimento situacional.

## O_axis_reasoning
Há evidência de objetivo imediato de descontinuar a aproximação (objetivo operacional protetivo), porém sem rota protegida; não há evidência de intenção desviante.

## A_axis_reasoning
Há indício de trajetória de escape com separação insuficiente, mas o pacote não separa adequadamente contribuição de execução ativa vs condicionantes de planejamento/briefing.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: não converter automaticamente "warning not perceived" em P-code específico sem mecanismo.
- O: objetivo primário parece de recuperação/descontinuação, sem evidência de desvio intencional.
- A: indício de trajetória insegura existe, mas mecanismo ativo dominante permanece ambíguo.

## evidenceRefsByAxis
- P:
  - "EGPWS issued warnings ... flight crew were not aware."
- O:
  - "The approach was discontinued."
- A:
  - "the helicopter descended toward the tops of trees"
  - "No go-around procedure or routing was available or briefed."

## uncertaintyByAxis
- P: HIGH.
- O: MEDIUM.
- A: HIGH.

## rejectedAlternatives
- P-A rejeitado: há evidência de risco não detectado/controlado a tempo.
- O-C/O-D rejeitados: ausência de evidência de objetivo desviante ou eficiência.
- A-A rejeitado: não há base suficiente para afirmar ausência de falha de ação específica.

## evidenceCategoryHints
- COMMUNICATION_INFORMATION
- INTENT_AWARENESS
- PROCEDURAL_MONITORING
- FEEDBACK_VERIFICATION
- PERCEPTUAL_AMBIGUITY

## adjudicationQuestionsForAuthor
- Confirmar manutenção de `P=UNRESOLVED` nesta rodada, em vez de P-G ou P-H.
- Confirmar se `O-A` é aceitável com confiança média dado o contexto de descontinuação sem rota briefada.

## downstreamLocks
- proposedCode é rascunho, não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem `finalConclusion`.
- sem HFACS.
- sem Risk/ERC.
- sem recommendations.
- sem downstream.

## nextStepRecommendation
Priorizar em A4+R-64 coleta de evidência sobre desenho/briefing de go-around e cadeia de percepção de alertas para reduzir UNRESOLVED em P/A.

## A4+R-64 refinement status
- refinementStatus: HOLD_UNRESOLVED
- rationale: Caso mantém ambiguidade estruturante entre barreira/planejamento e mecanismo perceptivo/ação; não há base para fechar P ou A sem inferência forte.
- unresolvedAxes:
  - P
  - A
- enrichmentNeeded:
  - Evidência adicional sobre cadeia de percepção de warning e perfil de trajetória na transição de arremetida.
- authorQuestionsRemaining:
  - Confirmar manutenção de `P=UNRESOLVED`.
  - Confirmar robustez de `O-A` draft no contexto sem rota briefada.
- noReleasedCode: true
