# Real Event Triage 005

Status:
- AI_AUTHOR_ADJUDICATION_DRAFT
- TRIAGE_ONLY_SOURCE_PARTIAL
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- adjudicationId: REAL-EVENT-TRIAGE-005
- sourceExtractionId: REAL-EVENT-EXTRACTION-005
- originalCandidateId: REAL-EVENT-0028
- shortLabel: HL9661 tail rotor strike (source partial)
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: LOW

## factualBasis
- Material disponível vem de index e source-quality review, sem ancoragem primária consolidada.
- Evento descrito como tail rotor strike em fuel bowser com possível componente multi-actor (voo + solo).
- Estado de qualidade de fonte explícito: `SOURCE_PARTIAL`.

## safeOperationEscapePointCandidate
UNRESOLVED (triage-only por insuficiência de ancoragem factual primária).

## unsafeState
Proximidade insegura rotor de cauda/obstáculo de solo (descrição index-level, não adjudicada em profundidade).

## unsafeActOrCondition
UNRESOLVED em nível causal; manter apenas hipótese de interação aeronave-layout/coordenação de solo.

## directActor
UNRESOLVED (potencial multi-actor sem decomposição robusta).

## P_axis_reasoning
Insuficiência de evidência para raciocínio robusto por eixo.

## O_axis_reasoning
Insuficiência de evidência para raciocínio robusto por eixo.

## A_axis_reasoning
Insuficiência de evidência para raciocínio robusto por eixo.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
UNRESOLVED

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
Todos os eixos mantidos em UNRESOLVED por status de fonte parcial e ausência de cronologia/atores/evidências primárias mínimas.

## evidenceRefsByAxis
- P: referência indireta em `REAL_EVENT_INDEX_BATCH_2_v0.1.4.md`.
- O: referência indireta em `REAL_EVENT_INDEX_BATCH_2_v0.1.4.md`.
- A: referência indireta em `REAL_EVENT_INDEX_BATCH_2_v0.1.4.md` + `REAL_EVENT_INDEX_BATCH_2_SOURCE_QUALITY_REVIEW_v0.1.4.md` (`SOURCE_PARTIAL`).

## uncertaintyByAxis
- P: HIGH.
- O: HIGH.
- A: HIGH.

## rejectedAlternatives
- Rejeitada adjudicação causal detalhada nesta fase.
- Rejeitada proposta de código ativo por eixo sem fonte primária suficiente.

## evidenceCategoryHints
- COMMUNICATION_INFORMATION
- SUPERVISION_COORDINATION
- RULE_NORM_CONTEXT
- UNKNOWN_OR_UNCATEGORIZED

## adjudicationQuestionsForAuthor
- Confirmar se este caso permanece em backlog de enrichment antes de qualquer rodada de adjudicação causal.
- Confirmar critérios mínimos de "source anchor" para liberar saída de triage-only.

## downstreamLocks
- sem proposed release.
- sem `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem `finalConclusion`.
- sem HFACS.
- sem Risk/ERC.
- sem recommendations.
- sem downstream.

## nextStepRecommendation
Classificar como `ENRICHMENT_NEEDED` e não incluir em adjudicação causal detalhada até obtenção de fonte primária verificável.
