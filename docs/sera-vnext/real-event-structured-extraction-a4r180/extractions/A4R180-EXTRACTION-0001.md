# A4R180 Structured Extraction — A4R179-SEL-0001 — SOURCE-SLICE-ASIANA-214-A4R106

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0001
- inventoryId: A4R178-INV-0067
- probableEventKey: SOURCE-SLICE-ASIANA-214-A4R106
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-ASIANA-214-A4R106.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB AAR-14-01 documenta sequência factual em que Asiana 214 (Boeing 777-200ER) executou aproximação visual para a pista 28L de San Francisco com ILS glideslope inoperante. Durante o gerenciamento da aproximação, seleções de manete e modo levaram a estado A/T HOLD sem controle automático de velocidade ativo. A tripulação não detectou a transição de modo enquanto velocidade e perfil vertical divergiam. Antes dos 500 ft, indicadores PAPI e velocidade indicavam aproximação instável; abaixo de 200 ft, perfil seguiu degradando. Comando de arremetida ocorreu tarde, abaixo da margem efetiva de recuperação. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Configuração da aproximação | Tripulação aceitou aproximação visual à 28L com ILS GS inoperante; critérios de aproximação estabilizada aplicáveis | ASIANA-SRC-EV-002 (linhas ~900-908) | HIGH |
| Gerenciamento de potência/modo | Manetes e seleção de modo produziram estado A/T HOLD sem controle automático ativo de velocidade | ASIANA-SRC-EV-001 (linhas ~566-583) | HIGH |
| Descida divergente | PAPI e velocidade decaindo; perfil vertical desvia abaixo do glidepath nominal | ASIANA-SRC-EV-001 | HIGH |
| Gate 500 ft | Indicadores PAPI/velocidade/razão de descida sinalizavam aproximação instável | ASIANA-SRC-EV-001 | HIGH |
| Abaixo de 200 ft | Consciência tardia de baixa velocidade e perfil baixo; margem de recuperação encolhendo | ASIANA-SRC-EV-003 (linhas ~1055-1073) | HIGH |
| Arremetida | Comando de arremetida tardio, abaixo de margem efetiva | ASIANA-SRC-EV-003 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Aproximação prosseguindo abaixo do gate de aproximação estabilizada com perfil de energia e trajetória já divergentes dos parâmetros esperados
- evidence: PAPI, razão de descida e velocidade fora dos parâmetros antes de 500 ft sem ação de arremetida ou correção
- confidence: MEDIUM-HIGH
- uncertainty: Definição precisa do gate exato (data/parâmetro discreto) varia entre seções do relatório

## 5. Possible escape point candidate
- possibleEscapePoint: Primeiro gate de aproximação estabilizada em que PAPI/velocidade/razão de descida já sinalizavam perfil instável e arremetida permanecia disponível
- whyPotential: Slice identifica EP1 como ponto onde indicadores eram interpretáveis e arremetida era opção viável; alternativa EP2 (consciência explícita abaixo de 200 ft) é fallback com margem decrescente
- sourceAnchor: SOURCE-SLICE-ASIANA-214-A4R106 seção "safeOperationEscapePointCandidates"
- confidence: PARTIAL
- limitations: Slice marca clareza de escape point como PARTIAL; instante discreto observável não totalmente isolado; SOURCE_PARTIAL

## 6. Direct actor candidate
- directActorCandidate: Tripulação de voo (PF/PM) como bloco operacional integrado para o gate de aproximação
- role: Operação manual/automatizada da aproximação visual e gerenciamento de modo de autothrottle
- evidence: Slice referencia integração PF/PM/observador na lacuna de consciência de modo A/T HOLD
- confidence: PARTIAL
- uncertainty: Separação entre responsabilidade individual PF vs PM vs observador exige análise adicional não contida no slice

## 7. Actor contribution candidates
- notApplicableReason: Slice descreve crew como bloco integrado para o escape point primário; potencial multi-ator existe (PF/PM/observador) mas não é claramente diferenciado no slice. Tratamento como single escape point com possível desdobramento futuro é apropriado.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| ASIANA-A4R180-F1 | ASIANA-SRC-EV-001 | Transição A/T HOLD com cues PAPI/velocidade/razão de descida e critérios estabilizados não atendidos | Suporta perception/awareness gap e estado instável | Não substitui análise causal completa |
| ASIANA-A4R180-F2 | ASIANA-SRC-EV-002 | Estado de aproximação visual com A/T HOLD e contexto AFDS | Suporta contexto de modo e expectativa operacional | Não é conclusão final |
| ASIANA-A4R180-F3 | ASIANA-SRC-EV-003 | Manuseio tardio de F/D/modo no perfil final e descida continuada elevada | Suporta evento de awareness tardia e janela de arremetida em fechamento | Slice é factual-first |

## 9. Information explicitly excluded
- outcome (impacto contra seawall) não usado como prova de classificação SERA
- linguagem de probable cause/contributing factors quarentenada
- safety recommendations excluídas
- conclusões analíticas do NTSB excluídas
- inferências sobre fadiga, CRM ou treinamento como código SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- Gate exato de transição entre aproximação estabilizada e estado inseguro permanece zona, não momento discreto
- Separação entre componente perception (modo A/T HOLD) e action (não-correção) requer adjudicação autoral
- Confiança de O-axis (objetivo operacional) é menor que P-axis no slice

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

Asiana Airlines 214 era um vôo internacional de passageiros, Seul-Incheon → San Francisco, operado em Boeing 777-200ER em julho de 2013. A operação chegava a San Francisco em condições visuais durante o dia. A combinação operacional relevante: aeronave wide-body em aproximação visual à pista 28L com o glideslope do ILS inoperante por obras (NOTAM), tripulação composta por captain-instrutor com captain-em-treinamento (PF) e relief crew presente. Os critérios de aproximação estabilizada da operadora permaneciam aplicáveis e exigiam reconfiguração e parâmetros nominais antes do gate de 500/1.000 ft.

No segmento final, durante o gerenciamento de descida e desaceleração, a combinação de seleção de modo no MCP e movimentação do thrust lever produziu uma transição de estado do autothrottle para A/T HOLD — um modo em que o controle automático ativo de velocidade não estava presente, embora o display de FMA continuasse mostrando armed/active states que requeriam interpretação. O slice A4R106 ancora esta transição em ASIANA-SRC-EV-001/002. A PF, o PM e o relief pilot observador, segundo o slice, não consolidaram a percepção dessa mudança de modo enquanto a velocidade começava a decair e o perfil vertical desviava abaixo do glidepath nominal indicado pelo PAPI.

Antes do gate de aproximação estabilizada (definido pela operadora em 500 ou 1.000 ft AFE, conforme regra), múltiplos cues externos e instrumentais já apontavam para perfil instável: PAPI mostrando "três vermelhos/um branco" e depois quatro vermelhos, razão de descida elevada, velocidade decaindo abaixo da bug de aproximação. Esses cues, ainda assim, não dispararam uma decisão imediata de arremetida coordenada entre PF e PM. A descida prosseguiu com configuração de pouso completa.

Abaixo de 200 ft AFE, evidências do slice (ASIANA-SRC-EV-003) indicam que a tripulação passou a reconhecer explicitamente a condição de baixa velocidade e perfil baixo. Comandos de go-around foram emitidos, mas a margem para recuperação completa já estava reduzida pelo decaimento de energia (velocidade próxima ao stall warning) e pela proximidade do seawall. O impacto contra o seawall ocorreu a baixa velocidade, com cauda separando antes do corpo principal.

A operação como um todo foi caracterizada por: dependência de controle automático de velocidade onde este estava efetivamente inativo (A/T HOLD), CRM tripartido (instructor/trainee/observer) sem detecção tempestiva da divergência de estado, e ausência de gate de arremetida efetivo antes do declínio crítico de energia. O outcome incluiu fatalidades e múltiplas lesões; este resultado é registrado factualmente mas NÃO é usado como prova de classificação SERA.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Aproximação inicial | Aeronave aceita aproximação visual à 28L com glideslope OTS | Crew (CPT/PF/PM) + ATC SFO | ASIANA-SRC-EV-002 | HIGH |
| 2 | Descida com gerenciamento de modo | Seleção MCP/thrust produz transição para A/T HOLD; controle automático de velocidade efetivamente inativo | A/T system + PF | ASIANA-SRC-EV-001 | HIGH |
| 3 | Acima de 500 ft AFE | PAPI mostra perfil abaixo do glidepath; velocidade decaindo abaixo da bug; razão de descida elevada | PAPI + indicators + crew monitoring | ASIANA-SRC-EV-001 | HIGH |
| 4 | Gate 500 ft | Critérios de aproximação estabilizada não atendidos; arremetida não comandada | PF + PM (decisão coordenada faltante) | ASIANA-SRC-EV-001 | HIGH |
| 5 | Abaixo de 200 ft | Reconhecimento explícito tardio de baixa velocidade/baixo perfil | Crew | ASIANA-SRC-EV-003 | HIGH |
| 6 | Go-around tardio | Comando de arremetida emitido com margem de recuperação já reduzida | Crew | ASIANA-SRC-EV-003 | HIGH |
| 7 | Impacto | Impacto contra seawall a baixa velocidade | Aeronave + ambiente | ASIANA-SRC-EV-003 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: glideslope ILS RWY 28L inoperante por obras (NOTAM); A/T entrou em estado HOLD após seleções de modo/thrust; PAPI funcional e mostrando perfil baixo; FMA continuou exibindo estados que requeriam interpretação; aeronave 777-200ER em configuração nominal de pouso.
- **Human-observable actions**: aceitação de visual approach; seleção de modo/thrust que resultou em A/T HOLD; ausência de callout de "speed" durante decaimento; ausência de decisão de arremetida no gate de 500 ft; comando tardio de go-around abaixo de 200 ft.
- **Human-inference cautions**: NÃO inferir intenção de violação de regra a partir do outcome; NÃO inferir falha de treinamento, fadiga ou CRM como código SERA a partir da análise NTSB; o slice marca clareza de escape point como PARTIAL — diferenciação fina entre falha de perception (mode awareness) e falha de action (não-arremetida) requer adjudicação autoral.
- **What must not be inferred yet**: papel diferencial PF vs PM vs observer no escape point; código P, O ou A específico; HFACS/Risk/ERC; recomendações.

## 16. Escape point context

A zona candidata é o gate de aproximação estabilizada (típica em 500 ft AFE para aproximação visual da operadora, podendo recuar para 1.000 ft conforme política), no qual cues integrados (PAPI baixo + velocidade decaindo + razão de descida elevada + estado A/T HOLD) já sinalizavam que critérios de estabilidade não estavam sendo atendidos e a arremetida permanecia executável com margem nominal. Permanece candidato porque (a) o slice trata escape point com clareza PARTIAL, (b) o instante discreto observável (exato cue que deveria ter disparado a decisão) não foi isolado em uma única evidência ancorada, e (c) há boundary entre P (não-consciência do estado A/T HOLD) e A (ausência de comando de go-around) que requer separação autoral. Falta confirmar: timestamp/altitude discreta do disparo do critério de instabilidade da operadora, alinhamento de callouts esperados vs realizados, e diferenciação multi-actor PF/PM/observer. Risco de confundir outcome com ponto de fuga: o impacto contra o seawall é consequência; o escape point é antes, no gate de estabilidade.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R106 ADEQUATE_FOR_TRACE_DRAFT)
- extractionConfidence: MEDIUM-HIGH
- missingForA4R181: timestamp/altitude exato do critério de instabilidade da operadora; diferenciação multi-actor PF/PM/observer no gate de 500 ft; callouts esperados vs realizados
- recommendedA4R181Handling: BATCH_A_NARRATIVE_SUFFICIENT — adjudicação autoral de escape point como zona ou momento, com possível desdobramento multi-actor.
