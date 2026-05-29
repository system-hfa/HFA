# A4R180 Structured Extraction — A4R179-SEL-0005 — SOURCE-SLICE-HELIOS-522-A4R115

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0005
- inventoryId: A4R178-INV-0074
- probableEventKey: SOURCE-SLICE-HELIOS-522-A4R115
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-HELIOS-522-A4R115.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE (slice é factual, marcado PARTIAL_FOR_TRACE_DRAFT)

## 2. Factual event summary
AAIASB Grécia documenta acidente de pressurização/hipóxia de Helios Airways 522 (Boeing 737-31S). Durante subida, warning horn de altitude de cabine soou em ~12.040 ft. Captain contactou a companhia descrevendo problema de warning/equipamento de refrigeração. Engenheiro de solo tentou confirmar seleção do painel de pressurização. Máscaras de oxigênio dos passageiros desplegaram em ~18.000 ft. Comunicação encerrou-se passando 28.900 ft; chamadas subsequentes sem resposta. Aeronave continuou em FL340 e entrou em holding; pilotos F-16 que interceptaram observaram estado incapacitado/anormal. Slice marca PARTIAL_FOR_TRACE_DRAFT por boundary de incapacitação. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Subida ~12.040 ft | FDR registrou warning de cabin altitude | HEL522-E1 (linhas 609-612) | HIGH |
| Comunicação com operações | Captain reportou warning/cooling-equipment issue à companhia | HEL522-E2 (linhas 612-634) | MEDIUM |
| Diálogo com engenheiro | Engenheiro pediu confirmação do painel de pressurização AUTO; captain perguntava sobre cooling breakers | HEL522-E3 (linhas 634-642) | HIGH |
| ~18.000 ft | Máscaras de oxigênio dos passageiros desplegaram | HEL522-E4 (linhas 638-642) | HIGH |
| Passando 28.900 ft | Microphone keying cessou; chamadas subsequentes sem resposta | HEL522-E5 (linhas 642-650) | HIGH |
| Pós-incapacitação | F-16 observou estado anormal; distress calls após flameout do motor | HEL522-E6 (linhas 696-750) | MEDIUM |

## 4. Unsafe state / unsafe condition candidate
- candidate: Continuação de subida com warning de cabin altitude ativo sem aplicação da resposta padrão (donning de máscara, descida emergencial) durante janela em que crew ainda estava capacitada
- evidence: Warning soou em ~12.040 ft; diálogo continuou com tópico de "cooling" enquanto altitude e cabin altitude continuavam subindo
- confidence: MEDIUM-HIGH (factualmente confirmado pelo FDR; interpretação de "porquê" é boundary)
- uncertainty: Ambiguidade da mensagem e progressão de hipóxia complicam timing exato do estado inseguro

## 5. Possible escape point candidate
- possibleEscapePoint: Janela entre warning de cabin altitude e comunicação com companhia, antes da incapacitação tornar avaliação P/O/A normal difícil
- whyPotential: Slice identifica este como ponto candidato; após incapacitação, análise SERA torna-se boundary-pesada
- sourceAnchor: SOURCE-SLICE-HELIOS-522-A4R115 seção "4. Escape point candidate"
- confidence: PARTIAL (slice marca como PARTIAL_TRACE_ONLY)
- limitations: Boundary entre interpretação ambígua do warning (P) e ação requerida (A) é alta; SOURCE_PARTIAL no sentido de que análise P/O/A pós-incapacitação não é limpa

## 6. Direct actor candidate
- directActorCandidate: Captain (interlocutor primário com operações/engenheiro)
- role: PIC durante janela pré-incapacitação
- evidence: Slice indica diálogo continuado do captain sobre "cooling" enquanto cue de cabin altitude ativo
- confidence: PARTIAL
- uncertainty: First Officer e capacitação fisiológica progressiva (hipóxia) confundem responsabilidade individual no momento exato do escape

## 7. Actor contribution candidates
- notApplicableReason: Slice trata crew como bloco pré-incapacitação; engenheiro de solo é influência externa e não é direct actor no escape point. Tratamento como single escape point com boundary de capacidade é apropriado.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| HELIOS-522-A4R180-F1 | HEL522-E1 | Cabin altitude warning em ~12.040 ft | Cue claro disponível pré-incapacitação | Não substitui análise causal |
| HELIOS-522-A4R180-F2 | HEL522-E2 | Captain reportou warning como "cooling" issue à companhia | Boundary de interpretação | Ambíguo |
| HELIOS-522-A4R180-F3 | HEL522-E3 | Engenheiro pediu confirmação de painel AUTO; captain continuou sobre cooling breakers | Suporta perception/interpretation gap | Não conclusão |
| HELIOS-522-A4R180-F4 | HEL522-E4 | Máscaras de pax desplegaram em ~18.000 ft | Cue secundário forte mas cockpit recognition incerto | Boundary |
| HELIOS-522-A4R180-F5 | HEL522-E5 | Microphone keying cessou em 28.900 ft | Marca limite operacional pós-escape | Pode estar bloqueado por incapacitação |

## 9. Information explicitly excluded
- conclusões de chain-of-events e pressurização quarentenadas
- probable causes/contributing factors excluídos
- recommendations excluídas
- inferência de hipóxia como atalho a código SERA (é contexto factual/capacidade)
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- Após incapacitação, O/A para o crew não são limpos
- Pode tornar-se boundary trace após decisão de escopo de actor/capacidade dedicada
- Ambiguidade da mensagem "cooling" confunde P-axis no momento exato

## 11. A4R181 readiness
READY_AS_BOUNDARY_CASE

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

Helios Airways 522 era um vôo internacional de Larnaca, Chipre, para Praga via Atenas, operado em Boeing 737-31S em 14 ago 2005. A tripulação incluía um captain alemão contratado e um first officer cipriota; havia também tripulação de cabine. O vôo anterior havia incluído manutenção em painel de pressurização da cabine; o seletor do modo de pressurização (AUTO/MAN) foi deixado em MAN (manual) e não retornou a AUTO antes da partida — fato sistêmico que se tornou foco principal de análise AAIASB.

Após decolagem, a aeronave subiu para níveis de vôo programados. Por volta de 12.040 ft, a buzina de cabin altitude warning soou no cockpit — um warning que é compartilhado em design (mesmo som usado para takeoff configuration warning em solo). O captain contactou a operations da companhia descrevendo o warning como problema de "cooling" / equipamento de refrigeração, indicando interpretação errada da natureza do warning. O engenheiro de solo da companhia perguntou repetidamente ao captain se o seletor do painel de pressurização estava em AUTO; o captain continuou a discussão sobre cooling circuit breakers.

Em ~18.000 ft, máscaras de oxigênio de passageiros desplegaram automaticamente (gatilho típico em ~14.000 ft cabin altitude). A aeronave continuou subindo. Microphone keying do crew cessou passando 28.900 ft — consistente com início de incapacitação fisiológica progressiva por hipóxia. Chamadas subsequentes da companhia e ATC ficaram sem resposta.

A aeronave continuou em FL340 com autopilot engajado, eventualmente entrando em padrão de holding programado pelo FMS. Interceptores F-16 da Força Aérea Grega observaram estado anormal de cockpit/cabine; relatos incluíram persons aparentemente incapacitados nos assentos e, posteriormente, uma pessoa entrando no cockpit (subsequentemente identificada como flight attendant com licença comercial). Após combustível exhaustion, motores apagaram e a aeronave impactou terreno montanhoso. Outcome registrado factualmente, NÃO usado como prova SERA.

A operação caracterizou-se por: warning ambíguo em design (cabin altitude vs takeoff config sound); resposta humana de interpretação errada (interpretação como "cooling"); progressão de hipóxia que tornou análise P/O/A pós-incapacitação não-aplicável; e janela pré-incapacitação curta para escape point. Slice marca esta extração como PARTIAL_FOR_TRACE_DRAFT.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Pré-vôo | Seletor de pressurização deixado em MAN; não retornado a AUTO antes da partida | Pre-flight crew + manutenção | (contexto AAIASB, não no slice) | HIGH |
| 2 | Subida ~12.040 ft | Cabin altitude warning horn soou no cockpit | Sistema warning | HEL522-E1 (609-612) | HIGH |
| 3 | Comunicação com operações | Captain reportou warning como "cooling"/refrigeração à companhia | Captain + Ops | HEL522-E2 (612-634) | MEDIUM |
| 4 | Diálogo com engenheiro | Engineer pediu confirmação de painel AUTO; captain continuou em cooling breakers | Captain + Ground Engineer | HEL522-E3 (634-642) | HIGH |
| 5 | ~18.000 ft | Passenger oxygen masks deployed | Sistema automático | HEL522-E4 (638-642) | HIGH |
| 6 | Passando 28.900 ft | Microphone keying cessou; sem resposta a chamadas | Crew (incapacitação progressiva) | HEL522-E5 (642-650) | HIGH |
| 7 | Pós-incapacitação | F-16 observaram estado anormal; pessoa eventualmente entrou no cockpit; flameout; impacto | F-16 obs + aeronave + ambiente | HEL522-E6 (696-750) | MEDIUM |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: pressurization selector em MAN; design compartilhado de warning horn (cabin altitude / takeoff config); progressão de hipóxia em cabin altitude crescente; autopilot mantendo perfil; holding programado no FMS.
- **Human-observable actions**: interpretação verbalizada do warning como "cooling" pelo captain; persistência em cooling breakers durante diálogo com engineer; falta de aplicação de checklist de emergency descent / oxygen mask donning durante janela pré-incapacitação.
- **Human-inference cautions**: NÃO inferir falha de treinamento como código SERA; NÃO inferir que o warning ambíguo (design) seja causa SERA fechada — é contexto técnico; o slice marca crew action pós-incapacitação como boundary (capability bloqueada); hypoxia é contexto factual/capacidade, não atalho a código SERA.
- **What must not be inferred yet**: código P/O/A para o crew durante janela pré-incapacitação; categorização do design warning como contribuição SERA; código diferencial captain vs FO no momento do escape point.

## 16. Escape point context

A zona candidata é estreita: a janela entre o warning de cabin altitude em ~12.040 ft e a incapacitação progressiva passando 28.900 ft. Dentro desta janela, o ponto crítico é a interpretação do warning como "cooling" e a não-aplicação de procedimento de cabin altitude/emergency descent — particularmente durante o diálogo com engineer, quando este pediu confirmação do painel AUTO. Permanece candidato porque (a) o slice marca PARTIAL_FOR_TRACE_DRAFT e PARTIAL_TRACE_ONLY, (b) instante discreto observável (segundo de interpretação errada) não isolado, e (c) boundary entre P (interpretação ambígua), A (não-aplicação de checklist) e capability (hipóxia progressiva) é alta. Após incapacitação, análise SERA normal não se aplica — actor está fora de envelope cognitivo. Falta confirmar: timeline exato de interpretação como "cooling"; relação entre cabin altitude crescente e degradação cognitiva por hipóxia. Risco de confundir outcome com ponto de fuga: o impacto após fuel exhaustion é consequência distal; o escape point é durante a janela curta pré-incapacitação.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_THIN_NEEDS_ENRICHMENT (slice marca PARTIAL; janela pré-incapacitação é curta e ambígua)
- sourceCompleteness: MEDIUM (slice PARTIAL_FOR_TRACE_DRAFT; AAIASB report completo existe mas não lido detalhadamente nesta fase)
- extractionConfidence: MEDIUM
- missingForA4R181: timeline detalhado da janela pré-incapacitação; relação cabin altitude/hipoxia/cognição; decisão de framing boundary capability vs human-action
- recommendedA4R181Handling: BATCH_B_BOUNDARY — adjudicação como boundary case com escopo explícito de actor capability decision.
