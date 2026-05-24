# Real Event Re-adjudication 004 A4+R-68

Status:
- AI_AUTHOR_READJUDICATION_DRAFT
- SOURCE_ENRICHED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS
- NO_RELEASED_CODE

- readjudicationId: REAL-EVENT-READJUDICATION-004-A4R68
- sourceAdjudicationId: REAL-EVENT-ADJUDICATION-004
- sourceExtractionId: REAL-EVENT-EXTRACTION-004
- originalCandidateId: REAL-EVENT-0006
- shortLabel: 5N-BQJ DAFCS/TRIM FAIL offshore ditching
- sourceQualityBefore: PRE_ENRICHMENT_ANCHOR_INTERNAL_CURATED
- sourceQualityAfter: IMPROVED_MEDIUM

## enrichedSourceAnchors
- AIB/NSIB reportaccident page (final report metadata): `BHNL/2016/02/03/F`, reg `5N-BQJ`, release `April 25, 2019`.
- NSIB interim statement for Bristow 5N-BQJ (crew composition, IFR/IMC context).
- NSIB final report page (event/report identifier confirmation).
- BEA notified-event record for 5N-BQJ (cross-authority metadata consistency).
- Local curated anchors:
  - `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md`
  - `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md`

## enrichedFactsUsed
- Tripulação: FO como PF e comandante como PM.
- Composição a bordo no setor crítico: 2 tripulantes e 9 passageiros.
- Contexto operacional: retorno offshore ERHA FPSO -> Lagos.
- Recorrência de indicações DAFCS/TRIM FAIL e consulta de material de emergência/anormal.
- Ditching controlado offshore (~77-78 NM de Lagos), sem fatalidades.
- Registro oficial de relatório final (`BHNL/2016/02/03/F`) e data de publicação.

## enrichedFactsExcluded
- Qualquer conclusão causal final dos relatórios externos como valor esperado SERA.
- Qualquer atribuição automática de erro humano devido ao desfecho (ditching).
- Qualquer inferência de violação intencional de objetivo sem evidência explícita.

## safeOperationEscapePointCandidate
A operação saiu do estado seguro quando a condição anormal recorrente de automação/trim deixou de ser gerenciável como anomalia estável e passou a exigir decisão de emergência (ditching) por degradação de controlabilidade e margem operacional.

## unsafeState
Condição técnica recorrente de automação/trim (DAFCS/TRIM FAIL), com degradação potencial de controlabilidade em voo offshore e progressão para cenário de emergência sobre água.

## unsafeActOrCondition
Leitura dominante mantida: `unsafe-condition-dominant`.
Há possíveis elementos de resposta humana (monitoramento, checklist, decisão de continuidade/ditching), porém ainda sem mecanismo humano específico e robusto para fechamento causal por eixo A.

## directActor
Tripulação de voo (FO/PF e comandante/PM), com predominância factual de condição técnica sistêmica na gênese do evento.

## P_axis_reasoning
A evidência enriquecida confirma contexto técnico recorrente e gestão de anomalia, mas não demonstra mecanismo perceptivo humano específico (ex.: interpretação equivocada inequívoca do estado, percepção omitida discriminável de alternativa técnica). Não há base para fechar P ativo com robustez.

## O_axis_reasoning
Os fatos fortalecem leitura de objetivo de contenção/segurança (gestão de anomalia e sobrevivência), sem evidência positiva de objetivo desviante ou de eficiência sobre segurança. `O-A` permanece o draft mais parcimonioso.

## A_axis_reasoning
Apesar de haver ações humanas durante a emergência, ainda falta decomposição mecanística suficiente (timeline operacional fino de checklists/resets/comandos e limiar de inevitabilidade do ditching) para fechar código A específico sem sobre-inferência.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: enriquecimento elevou ancoragem de fonte, mas não transformou ambiguidade técnica em mecanismo perceptivo humano explicitamente demonstrado.
- O: objetivo observável segue orientado à preservação da segurança sob anomalia.
- A: ação humana está presente, porém sem evidência suficiente para distinguir erro ativo específico de resposta sob condição técnica dominante.

## evidenceRefsByAxis
- P:
  - recorrência de DAFCS/TRIM FAIL em perna crítica;
  - ausência de evidência clara de mecanismo perceptivo humano singular.
- O:
  - consulta de material de emergência/anormal;
  - trajetória decisória de gestão da emergência culminando em ditching controlado.
- A:
  - instrução para PF manter mãos/pés nos controles;
  - ausência de timeline de execução detalhada suficiente para classificação A ativa específica.

## uncertaintyByAxis
- P: HIGH
- O: MEDIUM
- A: HIGH

## rejectedAlternatives
- Rejeitado fechar P ativo apenas por ocorrência de anomalia técnica recorrente.
- Rejeitado fechar A ativo apenas pelo desfecho de ditching.
- Rejeitado O-C/O-D por ausência de evidência de intenção de desvio/eficiência.
- Rejeitado A-A definitivo por insuficiência para afirmar ausência de mecanismo de falha de ação específica com segurança alta.

## evidenceCategoryHints
- PHYSICAL_CAPABILITY
- PROCEDURAL_MONITORING
- FEEDBACK_VERIFICATION
- TIME_PRESSURE
- RULE_NORM_CONTEXT
- UNKNOWN_OR_UNCATEGORIZED

## residualQuestionsForAuthor
- Confirmar manutenção de `P=UNRESOLVED` e `A=UNRESOLVED` após enrichment como posição oficial desta rodada.
- Validar se o caso deve permanecer `HOLD_UNRESOLVED` até obtenção de granularidade temporal adicional (checklist/resets/decision points).

## downstreamLocks
- `proposedCode` permanece draft documental.
- nenhum `releasedCode` criado.
- nenhum `selectedCode=CLASSIFIED`.
- sem `finalConclusion`.
- sem HFACS.
- sem Risk/ERC.
- sem recommendations.
- sem abertura downstream.

## nextStepRecommendation
Manter o caso em trilha de adjudicação controlada com `HOLD_UNRESOLVED` para P/A, usar o reforço de fonte para narrativa guardada factual (sem release) e priorizar aquisição de timeline técnica mais granular antes de qualquer tentativa de fechamento de eixo A.
