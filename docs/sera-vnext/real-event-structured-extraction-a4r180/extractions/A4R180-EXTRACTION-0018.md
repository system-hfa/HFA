# A4R180 Structured Extraction — A4R179-SEL-0018 — SOURCE-SLICE-UNITED-232-A4R119

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0018
- inventoryId: A4R178-INV-0082
- probableEventKey: SOURCE-SLICE-UNITED-232-A4R119 (United 232 DC-10 total hydraulic loss Sioux City)
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-UNITED-232-A4R119.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH (slice marca ADEQUATE_FOR_TRACE_DRAFT)
- selectionLane: Boundary/ambiguous candidates
- selectionStatus: SELECT_AS_BOUNDARY_CASE
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB AAR-90-06 documenta United 232 (DC-10-10) que sofreu tail-engine fan-disk failure levando a cascading hydraulic-system loss e severa perda de autoridade de flight-control. Crew identificou control degradation e declarou emergência coordenando com ATC. Check airman off-duty juntou-se a tarefas de cockpit; estratégia de differential-thrust control foi usada para influenciar attitude/path da aeronave. Crew tentou pouso emergencial sob constraints extremas de controle; aeronave impactou ambiente da pista com outcomes de sobrevivência mistos. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Pré-falha | Cruise nominal | U232-E1 (contexto) | HIGH |
| Falha do motor | Tail-engine fan-disk failure | U232-E1 | HIGH |
| Cascading loss | Cascading hydraulic-system loss; perda severa de flight-control authority | U232-E1 | HIGH |
| Identificação | Crew rapidly identificou control degradation; declarou emergência | U232-E1 | HIGH |
| Coordenação | CVR/FDR mostra sustained situational tracking de heading/turn/control feasibility sob constraints extremas | U232-E2 | HIGH |
| Redistribuição cockpit | Captain redistribuiu papéis de cockpit; integrou check airman para thrust-based control support | U232-E5 | HIGH |
| Estratégia adaptativa | Crew executou adaptive action strategy (differential thrust + constrained approach handling) | U232-E6 | HIGH |
| Pouso | Aeronave impactou ambiente da pista com outcomes de sobrevivência mistos | U232-E7 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: NEGATIVE-CONTROL-LIKE — condição de severa perda de controllability decorrente de falha técnica catastrófica, não de ato humano. Trace deve documentar trajetória canônica de emergency response, não buscar código de falha humana
- evidence: Slice indica que A-axis pode permanecer nominal/near-nominal apesar de outcome catastrófico
- confidence: HIGH (boundary case com framing de adequacy-under-constraints)
- uncertainty: Boundary entre falha técnica (capability) e response humana (adequacy) é zona

## 5. Possible escape point candidate
- possibleEscapePoint: Transição precoce pós-falha para emergency control strategy e coordinated landing plan sob constraints de near-total control loss
- whyPotential: Slice identifica este como EP primário; janela em que estratégia emergencial foi estabelecida com sucesso pelo crew
- sourceAnchor: SOURCE-SLICE-UNITED-232-A4R119 seção "4. Safe-operation escape point"
- confidence: PARTIAL (slice marca ADEQUATE_FOR_TRACE_DRAFT com adversarial framing)
- limitations: A-axis pode permanecer nominal/near-nominal apesar de outcome catastrófico; trace deve separar adequacy-under-constraints de outcome severity absoluta

## 6. Direct actor candidate
- directActorCandidate: Captain como PIC redistribuindo papéis e integrando check airman
- role: PIC liderando crew adaptativo
- evidence: Slice indica captain redistributed cockpit roles e integrated check airman
- confidence: HIGH
- uncertainty: Multi-actor potential (Captain + FO + FE + check airman) é claro; estrutura adaptativa requer review autoral

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (Captain + FO + FE + check airman) — estrutura adaptativa

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| UNITED-232-A4R180-ACTOR-CAPTAIN-PIC | Captain/PIC | Redistribuição de papéis de cockpit; liderança emergencial | U232-E5 | HIGH | Slice é factual-first |
| UNITED-232-A4R180-ACTOR-CHECK-AIRMAN | Off-duty check airman | Integração para thrust-based control support | U232-E5 | HIGH | Estrutura adaptativa não-standard |
| UNITED-232-A4R180-ACTOR-FOFE | FO/FE | Coordenação de approach e support do captain | U232-E6 | MEDIUM | Detalhamento individual não no slice |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| UNITED-232-A4R180-F1 | U232-E1 | Crew rapidly identificou severe controllability degradation após engine failure | Suporta P-axis rápido | Não substitui análise causal |
| UNITED-232-A4R180-F2 | U232-E2 | Sustained situational tracking sob extreme limitations | Suporta P-axis nominal | Adversarial framing |
| UNITED-232-A4R180-F3 | U232-E5/E6 | Captain redistribuiu papéis; differential thrust strategy | Suporta A-axis multi-actor adaptativo | Boundary com capability |
| UNITED-232-A4R180-F4 | U232-E7 | Outcome catastrófico não negou coherence observable de intent emergencial e execution logic | Suporta A-axis nominal apesar de outcome severo | Não importar outcome como prova SERA |

## 9. Information explicitly excluded
- Probable cause quarentenada
- Findings quarentenados
- Contributing factors quarentenados
- Safety recommendations excluídas
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- Outcome severo (catastrófico) não usado como prova SERA
- Conclusões sobre engine/maintenance não importadas como código humano A

## 10. Uncertainty notes
- Technical-failure dominance é substancial e deve permanecer explícita para que human-axis interpretation não seja outcome-driven
- A-axis deve separar adequacy-under-constraints de outcome severity absoluta
- Boundary entre P (perception nominal) e A (action nominal sob constraint) requer review autoral

## 11. A4R181 readiness
READY_AS_BOUNDARY_CASE (full-axis adversarial draft possível com A-axis potencialmente nominal apesar de outcome catastrófico)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

United 232 era um vôo doméstico Denver (DEN) → Chicago-O'Hare (ORD) → Philadelphia (PHL), operado em McDonnell Douglas DC-10-10 em 19 jul 1989. Cruise nominal em FL370 quando, sem aviso, ocorreu fan-disk failure do engine 2 (tail engine). A explosão do fan disk gerou fragmentos que cortaram todas as três linhas hidráulicas do sistema de flight control — uma condição não-prevista pelos certification analysis (probabilidade calculada de loss of all three hydraulics era considerada extremamente baixa).

A perda total de hidráulica resultou em loss of conventional flight control authority: ailerons, elevators, rudder, flaps e slats não respondiam a inputs do cockpit. A aeronave entrou em "phugoid oscillation" — oscilação de altitude/velocidade característica de aeronaves sem flight control authority. O captain (Al Haynes) e a tripulação rapidamente identificaram a natureza catastrófica da falha, declararam emergência, e coordenaram com ATC para divert para Sioux City (SUX) — o aeroporto significativo mais próximo.

Um check airman off-duty (Dennis Fitch) presente como passageiro foi convidado ao cockpit pelo captain. A estratégia adaptativa foi desenvolvida: usar differential thrust entre os engines 1 e 3 (asas) para influenciar attitude e direção da aeronave. Fitch operou as throttles enquanto Haynes e o FO (Bill Records) gerenciavam outras tarefas; o FE (Dudley Dvorak) operou systems e checklists. A tripulação configurou flaps/gear via gravity drop e arranjou approach para SUX.

O approach a SUX foi conduzido sob severa restrição de controllability. Phugoid oscillation persistente; turn capability limitada a differential thrust slow response. A aeronave atingiu o runway com bank significativo e razão de descida elevada; impactou na pista 22, desintegrou e queimou. Outcome registrado factualmente: 184 dos 296 ocupantes sobreviveram — sobrevida significativa dada a natureza da falha — demonstrando adequacy da execução de approach sob constraints extremas.

Esta operação caracteriza-se como **BOUNDARY case com framing adversarial**: A-axis pode ser nominal/near-nominal apesar de outcome catastrófico — adequacy-under-constraints da resposta humana foi excepcional, mas constraint da capability era impossível de superar completamente. Trace deve separar adequacy-under-constraints de outcome severity.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Cruise FL370 | Operação nominal | Crew + aeronave | (contexto AAR-90-06) | HIGH |
| 2 | Engine 2 failure | Fan-disk failure; fragmentos cortaram todas linhas hidráulicas | Sistema engine + hydraulics | U232-E1 | HIGH |
| 3 | Loss of control authority | Ailerons/elevators/rudder não respondem; phugoid oscillation | Aeronave | U232-E1 | HIGH |
| 4 | Identificação | Crew rapidly identificou severe controllability degradation | Crew | U232-E1 | HIGH |
| 5 | Coordenação | Declaração de emergência; coordenação com ATC; divert para SUX | Captain + ATC | U232-E2 | HIGH |
| 6 | Redistribuição cockpit | Captain redistribuiu papéis; integrou check airman Fitch | Captain + Fitch + FO + FE | U232-E5 | HIGH |
| 7 | Estratégia adaptativa | Differential thrust strategy implementada | Fitch + Captain + FO | U232-E6 | HIGH |
| 8 | Approach SUX | Approach sob restrição extrema de controllability; phugoid persistente | Crew + aeronave | U232-E6 | HIGH |
| 9 | Impacto | Aeronave atingiu runway 22 com bank significativo; desintegrou | Aeronave + ambiente | U232-E7 | HIGH |
| 10 | Sobrevida | 184/296 sobreviveram | Crew + cabine + emergency response | (contexto AAR-90-06) | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: DC-10-10 com 3 sistemas hidráulicos certificados como redundantes; fan-disk failure não-prevista cortou todas três; phugoid oscillation phenomenology em aeronave sem control authority; differential thrust como única control input residual.
- **Human-observable actions**: identificação rápida da natureza da falha; declaração de emergência; redistribuição de papéis cockpit; integração de check airman off-duty; desenvolvimento de differential thrust strategy; configuração de approach.
- **Human-inference cautions**: outcome catastrófico NÃO é prova de falha humana — adequacy-under-constraints foi excepcional; technical-failure dominance é substancial e deve permanecer explícita para que human-axis interpretation não seja outcome-driven; A-axis deve separar adequacy-under-constraints de outcome severity absoluta.
- **What must not be inferred yet**: código P/O/A; tratamento como negative control parcial (P nominal, O nominal, A nominal sob constraint) requer adjudicação autoral; categorização individual de Captain vs Fitch vs FO vs FE.

## 16. Escape point context

Como BOUNDARY case com framing adversarial, "escape point" é metodologicamente questionável: a aeronave nunca esteve em estado controlável após o engine failure. O análogo é a transição inicial pós-falha para emergency control strategy — a janela de minutos em que crew teve que decidir entre tentativa de manter altitude (impossível) e transição para differential thrust strategy. Permanece candidato porque (a) há decisão observável (redistribuição de papéis, integração de Fitch), (b) há boundary entre falha técnica catastrófica (capability) e response humana (adequacy), e (c) A-axis pode permanecer nominal/near-nominal apesar de outcome severo. Falta confirmar: framing como negative control parcial ou positive case de adequacy; tratamento multi-actor estruturado. Risco de confundir outcome com ponto de fuga: o crash em SUX é consequência inevitável da capability loss; o "escape point" análogo é a transição inicial para emergency strategy.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R119 ADEQUATE_FOR_TRACE_DRAFT)
- extractionConfidence: HIGH (factualmente bem documentado)
- missingForA4R181: framing como boundary case adversarial; tratamento multi-actor (Captain + Fitch + FO + FE)
- recommendedA4R181Handling: BATCH_B_BOUNDARY_ADVERSARIAL — adjudicação autoral com possível framing de A-axis nominal apesar de outcome catastrófico.
