# Real Event Batch 2 Adjudication 001

Status:
- AI_AUTHOR_ADJUDICATION_DRAFT
- BATCH_2
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-001
- sourceExtractionId: A4R72-B2-001
- originalRealEventId: REAL-EVENT-0003
- shortLabel: S-76C+ Tofino night approach near-CFIT trend
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- Aproximação noturna com transição para perfil de baixa energia (baixa velocidade, alta razão de descida, decaimento de rotor).
- Desconexão de autopilot no segmento de aproximação.
- Recuperação em altura muito baixa, com exposição near-CFIT.

## safeOperationEscapePointCandidate
Escape point candidato: momento em que a aproximação noturna deixou perfil monitorável e entrou em estado de baixa energia com margem de recuperação crítica.

## unsafeState
Estado degradado de energia/trajetória em baixa altura, com perda de margem vertical e de controle fino.

## unsafeActOrCondition
Combinação plausível entre limitação de cue visual noturno e monitoramento/gestão da aproximação sem separação robusta PF/PM no pacote atual.

## directActor
Tripulação de voo (PF/PM ainda não segregados com granularidade suficiente).

## P_axis_reasoning
Há base factual para hipótese de falha de monitoramento perceptivo em fase crítica com informação de estado disponível e resposta tardia.

## O_axis_reasoning
Objetivo observável permaneceu operacional (concluir aproximação/pouso com segurança), sem evidência de desvio intencional.

## A_axis_reasoning
Existe hipótese de correção tardia/ação não efetiva, mas mecanismo de ação específico não é isolável sem timeline PF/PM/callouts.

## proposedPCode or UNRESOLVED
P-G

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: evidência favorece falha de monitoramento/verificação situacional.
- O: sem evidência de objetivo desviante (violação/eficiência).
- A: insuficiente para fechamento robusto de falha de ação específica.

## evidenceRefsByAxis
- P: perfil low-speed/high-descent-rate + rotor decay antes da recuperação.
- O: continuidade de objetivo operacional de aproximação/pouso.
- A: ausência de decomposição fina PF/PM para atribuição de mecanismo de ação.

## uncertaintyByAxis
- P: MEDIUM
- O: LOW
- A: HIGH

## rejectedAlternatives
- `P-A` rejeitado por presença de degradação crítica não contida.
- `O-C`/`O-D` rejeitados por ausência de evidência de intenção desviante.
- `A-A` rejeitado nesta rodada (no-failure não é fallback para lacuna evidencial).

## evidenceCategoryHints
- FLIGHT_PATH_ENERGY
- APPROACH_VISUAL_CUES
- CREW_MONITORING
- AUTOMATION_STATE_TRANSITION

## maturityStatus
AUTHOR_REVIEW_READY

## adjudicationQuestionsForAuthor
- Confirmar manutenção de `P-G` versus alternativa `P-C` para este caso.
- Confirmar manutenção de `A=UNRESOLVED` até obter separação PF/PM/callouts.

## downstreamLocks
- proposedCode é draft e não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Levar para A4+R-74 com foco em padrão de fronteira P/A em aproximações noturnas e backlog de decomposição PF/PM.
