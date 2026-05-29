# A4R180 Structured Extraction — A4R179-SEL-0007 — SOURCE-SLICE-ATLAS-3591-A4R119

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0007
- inventoryId: A4R178-INV-0080
- probableEventKey: SOURCE-SLICE-ATLAS-3591-A4R119
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-ATLAS-3591-A4R119.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB documenta descida rápida de Atlas Air 3591 (Boeing 767-375BCF) após ativação inesperada de modo go-around. Durante descida/setup de aproximação, modo go-around ativou inesperadamente. Nenhum piloto fez callout de go-around ou explicitamente reconheceu ativação intencional. Trajetória e empuxo mudaram conforme comandos de go-around, seguidos de inputs manuais agressivos nose-down. Tentativa de intervenção/recuperação do crew não parou a descida antes do impacto. Slice marca ADEQUATE_FOR_TRACE_DRAFT com TRACE_DRAFT_ALLOWED. Slice cobre fatos sem importar conclusões causais.

NOTA DE OVERLAP: SEL-0008 (NTSB-USA-BOEING-767-375BCF) refere-se ao mesmo evento via PDF completo. Esta extração trata o slice A4R119; SEL-0008 será tratado como fonte primária complementar.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Descida/setup | Modo go-around ativou inesperadamente | AT3591-E1/E2 | HIGH |
| Pós-ativação | Nenhum piloto fez callout ou reconheceu ativação intencional | AT3591-E2 | HIGH |
| Resposta automação | Trajetória e empuxo mudaram conforme comandos de go-around | AT3591-E3 | HIGH |
| Resposta manual | Inputs manuais agressivos nose-down após ativação de modo | AT3591-E6 | HIGH |
| Intervenção | Captain intervention não estabeleceu transferência positiva/estabilização em tempo | AT3591-E7 | HIGH |
| Impacto | Descida não foi interrompida antes do impacto | AT3591-E1 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aeronave seguindo comandos de modo go-around sem reconhecimento do crew, com subsequente input manual nose-down agressivo opondo-se à trajetória comandada
- evidence: Ativação inesperada de modo + ausência de callout + inputs manuais nose-down agressivos
- confidence: MEDIUM-HIGH
- uncertainty: Boundary entre estado inseguro (modo não reconhecido) e ação inadequada (nose-down) é zona

## 5. Possible escape point candidate
- possibleEscapePoint: Reconhecimento imediato e confirmação de mudança de modo inesperada, seguidos de desconexão de automação/transferência positiva de controle antes de inputs nose-down sustentados
- whyPotential: Slice identifica este como EP primário; janela de reconhecimento de modo é o ponto onde recuperação ainda era viável
- sourceAnchor: SOURCE-SLICE-ATLAS-3591-A4R119 seção "4. Safe-operation escape point"
- confidence: PARTIAL
- limitations: Boundary entre erro de implementação (input nose-down) e seleção degradada sob upset dynamics; potencial spatial-orientation/perception ambiguity

## 6. Direct actor candidate
- directActorCandidate: First Officer/PF (origem dos inputs manuais nose-down) com captain (PM/intervention)
- role: PF respondeu com nose-down após ativação de modo; captain interveio
- evidence: Slice indica "manual control inputs after mode activation drove nose-down trajectory" e "captain intervention did not establish timely positive transfer/control stabilization"
- confidence: PARTIAL
- uncertainty: Multi-actor interaction boundary entre erro de implementação e seleção degradada

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (FO/PF inputs + Captain intervention)

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| ATLAS-3591-A4R180-ACTOR-FO-PF | First Officer/PF | Inputs manuais nose-down agressivos após ativação de modo go-around | AT3591-E6 | MEDIUM | Slice é factual-first; análise causal não conclusiva |
| ATLAS-3591-A4R180-ACTOR-CAPTAIN-PM | Captain/PM/Intervening | Intervenção tardia que não estabeleceu transferência positiva de controle | AT3591-E7 | MEDIUM | Boundary entre coordenação e capacidade |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| ATLAS-3591-A4R180-F1 | AT3591-E1/E2 | Ativação inesperada de modo e mudança rápida de estado criaram condição de alta demanda perceptual | Suporta P-axis | Não substitui análise causal |
| ATLAS-3591-A4R180-F2 | AT3591-E3 | Sequência factual suporta potencial branch de spatial-orientation/perception | Suporta P-axis ambíguo | Boundary |
| ATLAS-3591-A4R180-F3 | AT3591-E6/E7 | Inputs manuais nose-down e intervenção tardia | Suporta A-axis multi-actor | Não substitui adjudicação |
| ATLAS-3591-A4R180-F4 | AT3591-E8 | A-axis inclui boundary multi-actor entre implementation error e degraded selection sob upset | Suporta multi-actor handling | Requer adjudicação |

## 9. Information explicitly excluded
- probable cause quarentenada
- findings quarentenados
- contributing factors quarentenados
- safety recommendation material quarentenado
- performance-history e contexto organizacional não tratados como SERA key
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- Relatório inclui contexto organizacional e histórico que pode enviesar O/A se tratado como direct axis key
- Fatos compartilhados em torno de mode change e control response devem ser separados por racional explícita de axis
- Multi-actor boundary é alta

## 11. A4R181 readiness
READY_AS_MULTI_ACTOR_CANDIDATE

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

Atlas Air 3591 era um vôo cargueiro Miami (MIA) → Houston (IAH) operado em Boeing 767-375BCF (cargueiro converted) em 23 fev 2019. A tripulação composta de captain e first officer; a operação era diurna. Atlas Air operava esse vôo para Amazon Air no contrato de carga. A operação estava no segmento de descida e setup de aproximação para Houston/Bush Intercontinental quando ocorreu uma série de eventos rápidos que culminaram em rapid descent e impacto.

Durante o gerenciamento de descida, segundo análise NTSB referenciada pelo slice A4R119, o modo go-around do autopilot ativou inesperadamente. A ativação ocorreu por toggle (possivelmente acidental) que disparou o pitch mode go-around, ativando comandos de subida e empuxo. Crucialmente, nenhum piloto fez callout de go-around ou verbalmente reconheceu uma ativação intencional do modo — o que sugere que a mudança de estado de automação foi não-percebida ou interpretada erroneamente por ambos os pilotos.

A trajetória e o empuxo da aeronave seguiram os comandos de go-around mode: pitch-up e thrust-up. O first officer, atuando como PF, respondeu com inputs manuais de control column nose-down agressivos — uma resposta consistente com interpretação errônea da situação (possivelmente percepção de stall iminente, somatogravic illusion durante pitch-up + acelaração, ou simplesmente confusion de estado). Os inputs nose-down levaram a aeronave de pitch-up para pitch-down rápido, em um perfil que excedeu envelope normal.

O captain (PM) interveio mas a transferência positiva de controle não foi estabelecida a tempo de arrestar a descida acelerada. A aeronave entrou em descida íngreme e impactou Trinity Bay (Texas) em alta velocidade. Outcome registrado factualmente, NÃO usado como prova SERA.

A operação caracterizou-se por: ativação não-intencional de modo automação sem reconhecimento; resposta manual nose-down agressiva possivelmente sob ilusão somatogravica; tentativa de intervenção do captain insuficientemente coordenada/temporal. Análise NTSB inclui contexto de performance/histórico do FO e treinamento — esses tópicos são fonte de quarantine para SERA mas contexto importante para boundary capability.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Descida/setup | Operação em descida nominal para aproximação IAH | Crew + sistemas | (contexto NTSB) | HIGH |
| 2 | Mode toggle inadvertido | Modo go-around do autopilot ativou inesperadamente | Automação + possível toggle | AT3591-E1/E2 | HIGH |
| 3 | Ausência de callout | Nenhum piloto fez callout de go-around ou reconheceu ativação | Crew (CPT + FO) | AT3591-E2 | HIGH |
| 4 | Resposta da automação | Trajetória/empuxo mudaram conforme commands de go-around (pitch-up + thrust-up) | Automação | AT3591-E3 | HIGH |
| 5 | Inputs manuais PF | FO aplicou inputs manuais nose-down agressivos | FO (PF) | AT3591-E6 | HIGH |
| 6 | Intervenção captain | Captain interveio sem estabilização positiva de controle no tempo necessário | Captain (PM) | AT3591-E7 | HIGH |
| 7 | Rapid descent | Aeronave entrou em descida acelerada e perfil fora de envelope | Aeronave + atuadores | AT3591-E1 | HIGH |
| 8 | Impacto | Impacto em Trinity Bay em alta velocidade | Aeronave + ambiente | (contexto NTSB) | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: 767-375BCF cargueiro; autopilot com pitch modes incluindo go-around acessível por toggle; possível somatogravic illusion durante pitch-up + thrust-up; análise NTSB documentou contexto de checkride/performance prévia do FO.
- **Human-observable actions**: ausência de callout de mode change por ambos pilotos; inputs manuais nose-down agressivos pelo FO; intervenção tardia do captain.
- **Human-inference cautions**: NÃO inferir falha de treinamento como código SERA; NÃO inferir hiring/performance history como atalho a código; o slice marca alto risco de bias O/A se contexto organizacional for tratado como direct axis key. Fatos compartilhados (mode change, input response) devem ser separados por racional explícita de axis para evitar double-count.
- **What must not be inferred yet**: causa do toggle inicial (acidental vs intencional); papel diferencial captain vs FO no escape point; código P, O ou A; categorização da resposta nose-down como falha de implementation vs degraded selection sob upset.

## 16. Escape point context

O escape point candidato primário é a janela curta imediatamente após a ativação inesperada do modo go-around: o momento em que reconhecimento e confirmação verbal de mudança de modo, seguidos de desconexão de automação e transferência positiva de controle, eram requeridos antes que inputs manuais sustentados começassem a degradar trajetória além de envelope recuperável. Há boundary forte entre P (perception ambiguity — somatogravic illusion possível) e A (response inadequacy — nose-down inputs vs callout/verify). Permanece candidato porque (a) há boundary multi-actor (FO inputs primários + captain intervention tardia), (b) o slice marca contexto organizacional como fonte de bias se importado, e (c) instante discreto do "primeiro input nose-down que excedeu margem" não é isolado. Falta confirmar: timeline de inputs vs callouts; presença/ausência de somatogravic illusion como explicação P-axis; differential responsibility. Risco de confundir outcome com ponto de fuga: o impacto em Trinity Bay é consequência; o escape point é a janela de reconhecimento de modo antes de inputs sustentados.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R119 ADEQUATE_FOR_TRACE_DRAFT, TRACE_DRAFT_ALLOWED)
- extractionConfidence: MEDIUM
- missingForA4R181: timeline detalhado inputs vs callouts; decisão sobre framing somatogravic illusion (P-axis perception); diferenciação actorContributionId FO vs CPT
- recommendedA4R181Handling: BATCH_B_MULTI_ACTOR + CONSOLIDATE_WITH_0008 — single escape point + dois actorContributionId; consolidar com SEL-0008 (PDF do mesmo evento).
