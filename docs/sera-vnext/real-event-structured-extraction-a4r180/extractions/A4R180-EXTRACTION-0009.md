# A4R180 Structured Extraction — A4R179-SEL-0009 — SOURCE-SLICE-US-AIRWAYS-1549-A4R115

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0009
- inventoryId: A4R178-INV-0078
- probableEventKey: SOURCE-SLICE-US-AIRWAYS-1549-A4R115
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-US-AIRWAYS-1549-A4R115.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: P1 replication negative control
- selectionStatus: P1_REPLICATION_NEGATIVE_CONTROL
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB AAR-10-03 documenta US Airways 1549 (Airbus A320-214) que após decolagem do LaGuardia sofreu impacto com aves em ~2.818 ft AGL com decaimento imediato de ambos os motores. Captain assumiu controles e direcionou FO ao QRH dual-engine failure. ATC ofereceu LaGuardia e Teterboro; captain avaliou retorno como inviável. Crew preparou ditching, configurou flaps e completou pouso forçado na água com evacuação. Slice é candidato de REPLICAÇÃO NEGATIVA do P1A — referência nominal/no-failure: trace deve documentar se P, O e A seguem trajetórias canônicas nominais, NÃO procurar código de falha. Slice cobre fatos sem importar conclusões causais. Cross-referência com REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 (fixture candidate P1A).

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Decolagem | LaGuardia, subida normal | US1549-E1 (linhas 706-716) | HIGH |
| Bird strike (2.818 ft AGL) | CVR/FDR mostram impacto com aves; ambas N1/N2 dos motores decaindo | US1549-E1 | HIGH |
| Identificação | Captain identificou rollback/perda de empuxo; iniciou ignition/APU | US1549-E2 (linhas 716-723) | HIGH |
| Transferência de controle | Captain assumiu e direcionou FO ao QRH dual-engine failure | US1549-E3 (linhas 722-730) | HIGH |
| Avaliação de runway | Captain avaliou retorno como inviável após análise | US1549-E5 (linhas 760-788) | HIGH |
| Decisão de ditching | Captain declarou intenção de ditching no Hudson | US1549-E5 | HIGH |
| Configuração final | FO continuou checklist, flaps setados, callouts finais | US1549-E6 (linhas 788-860) | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: NEGATIVE CONTROL — perda de empuxo é condição factual (technical/environmental), NÃO um estado inseguro decorrente de ato humano. Como negative control, não há candidato de "ato inseguro" no axis humano.
- evidence: US1549-E1 estabelece bird strike como evento técnico/ambiental
- confidence: HIGH (negative control intent)
- uncertainty: Trace deve documentar que P/O/A canônicos podem permanecer NOMINAIS apesar do outcome severo (ditching)

## 5. Possible escape point candidate
- possibleEscapePoint: Como P1 replication negative control, este evento NÃO requer escape point de falha humana. O análogo é o ponto de reconhecimento da emergência onde resposta canônica seguiu sem violação de regra/perception/objetivo
- whyPotential: Slice instrui a tratar como referência nominal; não procurar código de falha; documentar trajetória canônica
- sourceAnchor: SOURCE-SLICE-US-AIRWAYS-1549-A4R115 seção "4. Escape point candidate"
- confidence: NEGATIVE_CONTROL (intentional)
- limitations: Trace não deve tratar outcome bem-sucedido como prova de "sem falha"; deve documentar cada axis canônica explicitamente

## 6. Direct actor candidate
- directActorCandidate: Captain (PIC após transferência de controle)
- role: PIC executando QRH e tomada de decisão de ditching
- evidence: Captain assumiu controles, direcionou checklist, avaliou opções de pouso
- confidence: HIGH (factualmente confirmado)
- uncertainty: Não há "ato inseguro" para atribuir; tratamento como negative control replicação

## 7. Actor contribution candidates
- notApplicableReason: NEGATIVE CONTROL — não há contribuição multi-actor para escape point de falha; ação coordenada do crew é parte do trace nominal. Cross-referência com REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| US1549-A4R180-F1 | US1549-E1 | Bird strike em 2.818 ft AGL; motores decaindo | Condição técnica/ambiental | Não é código SERA |
| US1549-A4R180-F2 | US1549-E3 | Captain direcionou QRH dual-engine failure | Suporta trace de ação canônica | Estrutura factual; sem fechamento de código |
| US1549-A4R180-F3 | US1549-E5 | Captain rejeitou runway após avaliação; declarou ditching no Hudson | Suporta objetivo canônico evoluindo com viabilidade | Suporta negative control nominal |
| US1549-A4R180-F4 | US1549-E6 | FO continuou checklist; flaps setados; callouts finais | Suporta A-axis nominal/limited path | Não importa outcome como prova SERA |

## 9. Information explicitly excluded
- probable cause, contributing factors, findings, safety recommendations excluídos
- narrativa heróica/reputacional não é evidência SERA
- outcome (ditching bem-sucedido) não usado como prova de "sem falha"
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- inferências sobre treinamento/experiência como código SERA

## 10. Uncertainty notes
- Como negative control, foco não é encontrar falha mas confirmar trajetória canônica
- Trace deve evitar inferir "sem falha" apenas pelo outcome bem-sucedido; cada axis deve ser documentada explicitamente
- Cross-referência com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 já validado em A4R173

## 11. A4R181 readiness
READY_AS_NEGATIVE_CONTROL_REPLICATION

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

US Airways 1549 era um vôo doméstico LaGuardia (LGA) → Charlotte (CLT), operado em Airbus A320-214 em 15 jan 2009. A tripulação composta de captain (Sullenberger) e first officer (Skiles); operação diurna sob condições visuais frias mas claras. Esta extração é tratada como **NEGATIVE CONTROL REPLICATION** — não é candidato a escape point de falha humana; é referência de operação canônica sob falha técnica/ambiental catastrófica, em que P, O e A nominais documentam adequacy under constraint.

Pouco após decolagem da pista 04 do LGA, em subida nominal passando ~2.818 ft AGL, a aeronave encontrou uma formação de gansos canadenses. Múltiplos impactos com aves resultaram em ingestão em ambos os motores CFM56-5B4, com perda subsequente quase imediata de empuxo em ambos. CVR e FDR confirmam impacto e decay imediato de N1/N2 dos dois motores. Esta é uma falha técnica/ambiental — não há ato humano antecedente que constitua "estado inseguro" no sentido SERA.

A resposta humana, segundo registro CVR/FDR e relatório NTSB AAR-10-03, foi canônica e coordenada: o captain anunciou "my aircraft" e assumiu controles manuais (estava previamente como PM no autopilot); iniciou sequência ignition/APU start; direcionou ao FO a execução do QRH "Dual Engine Failure / Loss of Thrust" checklist. ATC LGA ofereceu retorno a LaGuardia (RWY 13) e, em seguida, Teterboro (TEB RWY 19) como alternativas.

O captain avaliou viabilidade de cada opção em tempo real considerando energia (altitude/velocidade), distância e configuração necessária. Concluiu que nenhuma das opções de runway era alcançável com margem segura. Declarou intenção de pousar no Hudson River. Continuou trabalhando com o FO no checklist; configurou flaps progressivamente; manteve angle of attack controlado para minimizar razão de descida sem stall. O ditching ocorreu com aeronave alinhada com o rio, com flare adequado e impacto em low rate. Evacuação na água foi conduzida com sucesso; todos os 155 ocupantes sobreviveram.

Esta operação é um **REPLICATION NEGATIVE CONTROL** porque P (perception nominal: identificação rápida de dual engine failure), O (objetivo evoluindo apropriadamente com viabilidade decrescente — retorno → divert → ditching), e A (ações coordenadas, checklist execution, configuração) seguem trajetórias canônicas. Outcome bem-sucedido NÃO é prova de "ausência de falha"; é resultado de aplicação adequada de procedimento sob constraint técnica.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Decolagem/subida | Subida nominal pista 04 LGA | Crew + aeronave | (contexto AAR-10-03) | HIGH |
| 2 | Bird strike (~2.818 ft AGL) | CVR/FDR registram impacto; ambas N1/N2 decaindo | Ambiente + sistema engine | US1549-E1 (706-716) | HIGH |
| 3 | Identificação | Captain identificou loss of thrust; iniciou ignition/APU | Captain | US1549-E2 (716-723) | HIGH |
| 4 | Transferência de controle | Captain assumiu PF; direcionou FO ao QRH dual-engine failure | Captain + FO | US1549-E3 (722-730) | HIGH |
| 5 | Avaliação de opções | Captain avaliou retorno LGA / TEB; concluiu inviáveis | Captain + ATC | US1549-E5 (760-788) | HIGH |
| 6 | Decisão de ditching | Captain declarou ditching no Hudson | Captain | US1549-E5 | HIGH |
| 7 | Configuração e ditching | FO continuou checklist; flaps configurados; ditching com flare | Crew + aeronave | US1549-E6 (788-860) | HIGH |
| 8 | Evacuação | Evacuação na água; 155 sobreviventes | Crew + cabine + emergency response | (contexto AAR-10-03) | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: bird strike a ~2.818 ft AGL; ingestão em ambos os motores CFM56-5B4; loss of thrust quase imediata; aeronave A320 com fly-by-wire em alpha protection; APU start funcional; flaps deployment funcional.
- **Human-observable actions**: captain assumiu controles; direcionou QRH; iniciou ignition/APU; avaliou opções; declarou intenção de ditching; configurou flaps; manteve AOA; comandou evacuação.
- **Human-inference cautions**: outcome bem-sucedido NÃO é prova de "sem falha" — referência negativa requer documentação explícita de cada axis canônica. NÃO usar narrativa heróica/reputacional como evidência SERA. NÃO inferir "código nominal" sem racional explícita.
- **What must not be inferred yet**: nenhum código SERA "de falha"; este é negative control. Cross-referência com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001 já validado em A4R173 confirma framing.

## 16. Escape point context

Como NEGATIVE CONTROL REPLICATION, o evento NÃO requer escape point de falha humana. O análogo metodológico é o ponto de reconhecimento da emergência (bird strike / loss of thrust em ~2.818 ft AGL) onde resposta canônica foi aplicada sem violação de regra, sem failure de perception, sem falha de objetivo. A operação atende cada axis em seu padrão canônico:
- P-axis: identificação de loss of thrust rápida e correta.
- O-axis: objetivo evoluiu apropriadamente com viabilidade — retorno → divert → ditching, todos consistentes com critério de safety primário.
- A-axis: ações coordenadas e canônicas (transfer control, QRH, configuração, flare, evacuation).

Risco a evitar: tratamento como "evento sem falha" sem documentação por axis; ou tratamento de outcome catastrófico (perda da aeronave) como prova de falha humana. Nenhuma das duas se aplica — é replicação de operação canônica.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT (negative control framing)
- sourceCompleteness: HIGH (slice A4R115 ADEQUATE_FOR_TRACE_DRAFT; full AAR-10-03 disponível via SEL-0019)
- extractionConfidence: HIGH
- missingForA4R181: nada estrutural; possível enrichment via leitura de TXT companion para anchor de quotes CVR
- recommendedA4R181Handling: BATCH_C_NEGATIVE_CONTROL_CONSOLIDATION — uma única adjudicação consolidando SEL-0009 + SEL-0019; cross-referência com fixture candidate REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.
