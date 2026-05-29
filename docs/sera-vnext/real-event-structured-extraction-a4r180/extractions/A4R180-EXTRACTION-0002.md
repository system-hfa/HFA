# A4R180 Structured Extraction — A4R179-SEL-0002 — SOURCE-SLICE-COMAIR-5191-A4R106

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0002
- inventoryId: A4R178-INV-0068
- probableEventKey: SOURCE-SLICE-COMAIR-5191-A4R106
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-COMAIR-5191-A4R106.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB AAR-07-05 documenta sequência factual em que Comair 5191 (Bombardier CL-600-2B19) foi liberada e taxiada para pista 22 em Lexington (LEX). Briefing/checklists referenciaram repetidamente pista 22 e heading bugs foram ajustados para heading de 22. Durante o táxi, tripulação atravessou hold-short da pista 26 e alinhou na 26. Troca de pedido/liberação de decolagem omitiu o número da pista. Corrida de decolagem prosseguiu na pista 26 (mais curta) com callouts V1/VR antecipados, seguida de overrun e colisão. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Briefing | Crew briefou pista 22 repetidamente; heading bugs ajustados para heading de 22 | COMAIR-SRC-EV-001/002 | HIGH |
| Táxi | Crew taxiou via clearance para pista 22 | COMAIR-SRC-EV-002 (linhas ~522-537) | HIGH |
| Hold-short pista 26 | Crew atravessou hold-short da pista 26 e prosseguiu para alinhamento | COMAIR-SRC-EV-003 | HIGH |
| Lineup | Aeronave alinhou na pista 26 (não a designada) | COMAIR-SRC-EV-003 | HIGH |
| Clearance final | Troca de takeoff omitiu número da pista | COMAIR-SRC-EV-003 (linhas ~566-573) | HIGH |
| Corrida de decolagem | Decolagem na pista 26 com callouts V1/VR antecipados, overrun e colisão | COMAIR-SRC-EV-003 (linhas ~588-593) | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aeronave alinhada e iniciando corrida de decolagem em pista diferente da designada/briefada, sem verificação de identidade da pista executada antes do commitment de velocidade
- evidence: Múltiplos cues factuais (heading bugs, briefing, clearance) apontavam para pista 22; aeronave aplicada à pista 26
- confidence: HIGH
- uncertainty: Momento discreto exato em que o estado se tornou inseguro (hold-short crossing vs lineup vs power-up) requer adjudicação

## 5. Possible escape point candidate
- possibleEscapePoint: Ponto de verificação de identidade da pista no hold-short/entrada e lineup, antes da aplicação de potência de decolagem
- whyPotential: Slice identifica EP1 (cross-check antes do lineup), EP2 (checklist de entrada de pista) e EP3 (início da corrida antes do commit de velocidade); momento em que cues estavam disponíveis mas integração de verificação degradou
- sourceAnchor: SOURCE-SLICE-COMAIR-5191-A4R106 seção "safeOperationEscapePointCandidates"
- confidence: PARTIAL
- limitations: Múltiplos EPs candidatos exigem priorização autoral; classificação A4R179 tratava esta event como NOT_REVIEWED na tracker A4R129

## 6. Direct actor candidate
- directActorCandidate: Tripulação de voo (PF/PM) operando como bloco para o gate de verificação de pista
- role: Verificação de identidade de pista no táxi/lineup/inicialização da decolagem
- evidence: Slice indica que cues de runway 22 estavam disponíveis; integração/verificação degradada no decision point
- confidence: PARTIAL
- uncertainty: Diferenciação entre responsabilidade PF (PM nesse vôo era PNF) vs CRM compartilhado não detalhada no slice

## 7. Actor contribution candidates
- notApplicableReason: Slice descreve crew como bloco integrado para o gate de runway awareness; potencial multi-ator (controlador também omitiu confirmação) existe mas não é tratado como multi-actor no slice. Tratamento como single escape point é apropriado para esta fase.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| COMAIR-A4R180-F1 | COMAIR-SRC-EV-001 | Briefing repetido com referências à pista 22 | Suporta expectativa operacional e set-up de heading bugs | Não é conclusão |
| COMAIR-A4R180-F2 | COMAIR-SRC-EV-002 | Progressão de checklist e clearance de táxi para pista 22 | Suporta intenção operacional | Não substitui análise causal |
| COMAIR-A4R180-F3 | COMAIR-SRC-EV-003 | Omissão do número da pista na clearance; entrada/decolagem em pista 26 | Suporta cue de verificação degradada e estado inseguro de runway | Boundary entre perception e action |

## 9. Information explicitly excluded
- outcome (overrun/colisão/fatalidades) não usado como prova de SERA
- linguagem de probable cause/findings quarentenada
- recommendations excluídas
- inferências sobre fadiga/treinamento como código SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- conclusões de outros atores (ATC) não usadas como classificação direta nesta extração

## 10. Uncertainty notes
- Escolha entre EP1 (hold-short), EP2 (lineup) e EP3 (início da corrida) requer adjudicação autoral
- Tracker A4R129 marcou COMAIR-5191 como ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED com nota SOURCE_ENRICHMENT
- Boundary entre P-axis (awareness de runway) e O/A-axis (objetivo continuado vs ação de verificação) é zona, não momento discreto

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

Comair 5191 era um vôo regional doméstico noturno-amanhecendo de Lexington (LEX/KLEX) para Atlanta (ATL), operado em Bombardier CL-600-2B19 (CRJ-100), na madrugada de 27 ago 2006. O aeroporto de Lexington tinha duas pistas: pista 22 (principal, ~7.000 ft, com taxiway de entrada via taxiway A) e pista 26 (curta, ~3.500 ft, usada para aviação geral). A pista designada para a partida era a 22. A tripulação fazia o último vôo do duty cycle; ATC estava com um único controlador de torre operando solo em horário de baixa visibilidade ainda parcialmente noturna.

Durante o briefing pré-partida, a tripulação referenciou repetidamente a pista 22 — em discussão de procedimento, em entrada de dados, e em ajuste dos heading bugs do PFD para o heading de 22 (~225°). Após pushback e taxi out, a clearance de táxi via ATC instruía o uso de taxiway A (com cruzamento da pista 26 antes de atingir a pista 22). A taxiway A passa pelo limiar da pista 26, requerendo cruzamento explícito do hold-short da 26 e continuação até o final da taxiway, antes de virar à direita para entrar na pista 22.

A tripulação atravessou o hold-short da pista 26 e, em vez de continuar até o limiar da 22, virou diretamente à esquerda para entrar na pista 26 (orientação 260°). Múltiplos cues factuais apontavam mismatch: o heading da aeronave após lineup era ~260° enquanto os heading bugs estavam em ~225°; iluminação de pista era diferente (a 22 tinha sistema de aproximação iluminado, a 26 não); comprimento visual da pista era visivelmente menor.

A solicitação de clearance de decolagem ao controlador omitiu o número da pista; o controlador autorizou "Comair 191 cleared for takeoff" sem confirmar a pista. A tripulação aplicou potência de decolagem na pista 26. Durante a corrida, callouts de V1/VR aconteceram em sequência factual normal mas a aeronave atingiu o fim da pista antes da velocidade de rotação adequada; a aeronave deixou a pista, atravessou o perímetro e impactou árvores e terreno. Apenas o copiloto sobreviveu (com lesões graves). Outcome registrado factualmente, NÃO usado como prova SERA.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Pré-vôo / briefing | Briefing referenciou pista 22; heading bugs ajustados para ~225° | Crew (CPT/FO) | COMAIR-SRC-EV-001/002 | HIGH |
| 2 | Táxi out | ATC clearance para táxi via taxiway A com instrução de RWY 22 | ATC + Crew | COMAIR-SRC-EV-002 | HIGH |
| 3 | Cruzamento hold-short RWY 26 | Aeronave atravessou hold-short da pista 26 | Crew | COMAIR-SRC-EV-003 | HIGH |
| 4 | Decisão de lineup | Virada à esquerda para pista 26 (em vez de continuar até pista 22) | Crew | COMAIR-SRC-EV-003 | HIGH |
| 5 | Clearance de decolagem | Clearance solicitada/concedida sem número de pista explícito | Crew + ATC (solo) | COMAIR-SRC-EV-003 (566-573) | HIGH |
| 6 | Corrida de decolagem | Potência aplicada na pista 26 (curta); callouts V1/VR antecipados em relação ao final da pista | Crew + sistemas aeronave | COMAIR-SRC-EV-003 (588-593) | HIGH |
| 7 | Overrun | Aeronave saiu do fim da pista 26 sem velocidade de rotação adequada | Aeronave + ambiente | COMAIR-SRC-EV-003 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: aeroporto LEX com duas pistas (22 principal/7.000 ft; 26 curta/3.500 ft); operação noturna parcialmente iluminada; iluminação diferencial entre 22 e 26; ATC single controller em torre.
- **Human-observable actions**: briefing referenciou pista 22; heading bugs em 225°; cruzamento de hold-short da 26; virada à esquerda para entrar na 26; omissão do número da pista na clearance de decolagem (crew); ausência de confirmação de pista na clearance (controller); aplicação de potência de decolagem na pista 26.
- **Human-inference cautions**: NÃO inferir fadiga como código SERA a partir da análise NTSB; NÃO inferir falha sistêmica de single-controller como atalho a código SERA humano; o slice marca clareza de escape point como PARTIAL com múltiplos EPs candidatos (hold-short, lineup, início da corrida).
- **What must not be inferred yet**: prioridade entre EP1/EP2/EP3; diferenciação PF (FO) vs PM (CPT — captain era PM, FO PF nesse vôo); papel contributivo de ATC; código SERA P/O/A.

## 16. Escape point context

A zona candidata abrange três momentos sucessivos com características distintas: (EP1) cruzamento do hold-short da pista 26, em que verificação visual de iluminação/marcações poderia ter trapped o mismatch; (EP2) decisão de lineup, em que comparação de heading bug (225°) com heading da aeronave após virada (~260°) era cue claro disponível; (EP3) início da corrida de decolagem antes do commit de velocidade, em que comprimento visual da pista e taxa de aceleração ainda permitiam reject. Permanece candidato porque (a) o slice marca clareza PARTIAL, (b) o tracker A4R129 marca COMAIR-5191 como ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED, e (c) a escolha entre EP1/EP2/EP3 muda o framing de perception (P) vs action (A) e requer adjudicação. Falta confirmar: timestamp/posição factual do escape point selecionado, comparação heading bug vs heading aeronave registrada, e diferenciação PF/PM. Risco de confundir outcome com ponto de fuga: o overrun é consequência; o escape point é antes, na entrada/lineup ou início da corrida.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R106 ADEQUATE_FOR_TRACE_DRAFT)
- extractionConfidence: MEDIUM-HIGH
- missingForA4R181: priorização entre EP1/EP2/EP3; diferenciação PF (FO) vs PM (CPT); possível contribuição ATC (omissão de confirmação de pista) como ator contextual
- recommendedA4R181Handling: BATCH_A_NARRATIVE_SUFFICIENT — adjudicação de escape point primário entre EP1/EP2/EP3 com racional autoral.
