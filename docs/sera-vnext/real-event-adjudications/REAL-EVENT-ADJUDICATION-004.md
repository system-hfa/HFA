# Real Event Adjudication 004

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

- adjudicationId: REAL-EVENT-ADJUDICATION-004
- sourceExtractionId: REAL-EVENT-EXTRACTION-004
- originalCandidateId: REAL-EVENT-0006
- shortLabel: 5N-BQJ DAFCS/TRIM FAIL offshore ditching
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: LOW/MEDIUM

## factualBasis
- Recorrência de indicações DAFCS/TRIM FAIL em voo offshore de retorno.
- FO como PF e comandante como PM.
- Consulta de procedimento de emergência e orientação de controle manual contínuo.
- Evolução para ditching a ~77 NM offshore com sobrevivência dos ocupantes.

## safeOperationEscapePointCandidate
Ponto candidato: transição de estado anormal ainda gerenciável para condição degradada de controlabilidade/automação que levou a ditching.

## unsafeState
Condição técnica recorrente de automação/trim e possível degradação de controlabilidade em contexto offshore.

## unsafeActOrCondition
Leitura dominante nesta fase: unsafe-condition-dominant.
Conduta humana específica permanece não isolável com robustez factual.

## directActor
Tripulação de voo (PF/PM identificados), com ressalva de predominância técnica/sistêmica potencial.

## P_axis_reasoning
Evidência insuficiente para concluir se houve falha perceptiva específica do estado da aeronave ou apenas degradação técnica progressiva.

## O_axis_reasoning
Objetivo observável é gestão de anomalia e busca de desfecho seguro; sem evidência positiva de desvio intencional.

## A_axis_reasoning
Há insuficiência para selecionar mecanismo ativo de ação dominante (procedimento, controle manual, decisão de continuidade/ditch).

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: dados atuais não separam compreensão inadequada do estado vs falha técnica não transparentemente diagnosticável.
- O: sem evidência de objetivo inseguro; tendência factual é objetivo de contenção/segurança.
- A: não forçar código ativo em cenário técnico dominante com cadeia humana incompleta.

## evidenceRefsByAxis
- P:
  - "repeated DAFCS/TRIM FAIL indications"
- O:
  - "Emergency/operating procedure material was consulted"
- A:
  - "PF was instructed to keep hands and feet on the controls"
  - "aircraft ditched ... approximately 77 NM offshore"

## uncertaintyByAxis
- P: HIGH.
- O: MEDIUM.
- A: HIGH.

## rejectedAlternatives
- A-A rejeitado: insuficiência de evidência para afirmar ausência de mecanismo específico de falha de ação.
- A-D rejeitado: ausência de evidência de incapacidade física/motora humana explícita.
- O-C/O-D rejeitados: ausência de evidência de objetivo desviante/eficiência.

## evidenceCategoryHints
- PHYSICAL_CAPABILITY
- PROCEDURAL_MONITORING
- FEEDBACK_VERIFICATION
- TIME_PRESSURE
- UNKNOWN_OR_UNCATEGORIZED

## adjudicationQuestionsForAuthor
- Confirmar manutenção de `P=UNRESOLVED` e `A=UNRESOLVED` nesta fase piloto.
- Definir critério mínimo para mover este caso de `unsafe-condition-dominant` para adjudicação ativa por eixo.

## downstreamLocks
- proposedCode é rascunho, não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem `finalConclusion`.
- sem HFACS.
- sem Risk/ERC.
- sem recommendations.
- sem downstream.

## nextStepRecommendation
Manter caso como referência adversarial de disciplina metodológica (não forçar eixo ativo) e priorizar enriquecimento factual técnico antes de nova rodada de adjudicação.

## A4+R-64 refinement status
- refinementStatus: EVIDENCE_ENRICHMENT_REQUIRED
- rationale: Dominância de anomalia técnica e cadeia humana incompleta; fechamento de eixo ativo exigiria inferência não suportada.
- unresolvedAxes:
  - P
  - A
- enrichmentNeeded:
  - Fonte técnica adicional para discriminar estado de sistema, compreensão da tripulação e sequência de resposta.
  - Maior rastreio temporal de procedimentos e decisão de ditching.
- authorQuestionsRemaining:
  - Definir limiar mínimo para sair de `unsafe-condition-dominant`.
- noReleasedCode: true

## A4+R-65 author decision intake
- authorDecisionIntakeStatus: ENRICHMENT_REQUIRED
- decisionNotes: Mantido `unsafe-condition-dominant` com `P/A=UNRESOLVED`; aplicado limiar mínimo operacional para saída de hold: sequência temporal de ações humanas + evidência por eixo + rejeição explícita de alternativa técnica isolada.
- remainingOpenQuestions:
  - Nenhuma decisão autoral imediata; prioridade é enriquecimento de fonte/evidência.
- sourceEnrichmentNeeded:
  - true (alto)
- noReleasedCode: true
