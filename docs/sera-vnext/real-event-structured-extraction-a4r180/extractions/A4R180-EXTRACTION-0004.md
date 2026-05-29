# A4R180 Structured Extraction — A4R179-SEL-0004 — SOURCE-SLICE-COLGAN-3407-A4R115

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0004
- inventoryId: A4R178-INV-0073
- probableEventKey: SOURCE-SLICE-COLGAN-3407-A4R115
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-COLGAN-3407-A4R115.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH
- selectionLane: Positive source candidates
- selectionStatus: SELECT_FOR_A4R180_BATCH_1
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
NTSB documenta perda de controle em aproximação de Colgan 3407 (DHC-8-402 Q400) em Buffalo. Tripulação planejou ILS para pista 23. Velocidades de pouso briefadas para flaps 15; tripulação discutiu gelo e executou checklists de descida/aproximação. Trem foi baixado e flaps selecionados; velocidade decaiu para ~135 kt antes do stick shaker. Stick shaker ativado em 2216:27.4 com autopilot desconectando. FDR mostra movimento aft do control column após shaker e avanço de manete. Aeronave pitched/rolled, stick pusher ativou, flaps foram retraídos para 0, e aeronave entrou em descida íngreme. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Briefing | Crew briefou flaps 15 landing speeds e planejou ILS RWY 23 | COL3407-E1 (linhas 606-645) | HIGH |
| Descida/configuração | Discussão de gelo; trem e flaps selecionados; velocidade ~135 kt antes do shaker | COL3407-E2 (linhas 680-719) | HIGH |
| Stick shaker (2216:27.4) | Stick shaker ativou em baixa velocidade; autopilot desconectou | COL3407-E3 (linhas 719-750) | HIGH |
| Resposta pós-shaker | Control columns moveram aft; potência aumentou; aeronave pitched/rolled | COL3407-E4 (linhas 748-756) | HIGH |
| Stick pusher | Stick pusher ativou; flaps 0 selecionado; FO declarou ter colocado flaps up | COL3407-E5 (linhas 757-763) | HIGH |
| Cues disponíveis | Low-speed cue e indicações de velocidade disponíveis no PFD do Q400 | COL3407-E6 (linhas 1353-1373) | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Decaimento de velocidade abaixo de margem de stall durante aproximação configurada, com cue de low-speed disponível mas não reconhecido para correção prévia
- evidence: Velocidade decaiu para ~135 kt em configuração de aproximação; stick shaker ativou em low airspeed
- confidence: HIGH (factualmente confirmado pelo FDR)
- uncertainty: Boundary entre fato técnico (envelope de stall) e cue percebido pelo crew

## 5. Possible escape point candidate
- possibleEscapePoint: Stick shaker/autopilot disconnect como momento de resposta requerida ou cue de low-speed/decaimento de velocidade prévio durante configuração
- whyPotential: Slice identifica EP primário no shaker/disconnect onset e EP secundário no cue prévio de low-speed durante configuração
- sourceAnchor: SOURCE-SLICE-COLGAN-3407-A4R115 seção "4. Escape point candidate"
- confidence: PARTIAL
- limitations: Boundary entre cue antecedente (low-speed) e momento do shaker (resposta de recuperação) requer adjudicação

## 6. Direct actor candidate
- directActorCandidate: Captain como PF que respondeu ao shaker
- role: PF executando ação de recuperação após shaker
- evidence: Slice indica que control columns moveram aft (resposta oposta a recuperação de stall), captain era PF
- confidence: PARTIAL
- uncertainty: A-axis deve separar incorrect response vs branch de treinamento/capacidade; FO contribuiu com retração de flaps

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (PF=Captain ação primária; FO retração de flaps)
- Slice não explicita estrutura multi-ator formal; tratamento como single escape point com possível desdobramento para A4R181

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| COLGAN-3407-A4R180-ACTOR-CAPTAIN-PF | Captain/PF | Movimento aft do control column após shaker; potência aumentada | COL3407-E4 | MEDIUM | Não substitui adjudicação |
| COLGAN-3407-A4R180-ACTOR-FO-PM | First Officer/PM | Retração de flaps para 0 declarada | COL3407-E5 | MEDIUM | Boundary entre ação independente e coordenação |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| COLGAN-3407-A4R180-F1 | COL3407-E2 | Discussão de gelo; configuração de pouso com velocidade decaindo | Contexto pré-shaker e cue prévio | Não substitui análise causal |
| COLGAN-3407-A4R180-F2 | COL3407-E3 | Stick shaker em baixa velocidade; autopilot disconnect | Suporta momento de resposta requerida | Boundary entre P e A |
| COLGAN-3407-A4R180-F3 | COL3407-E4 | Movimento aft do control column após shaker | Suporta A-axis (resposta oposta) | Não conclui código A final |
| COLGAN-3407-A4R180-F4 | COL3407-E6 | Cue de low-speed visível no PFD | Suporta P (info disponível) | Timing exato de monitoramento requer detalhamento |

## 9. Information explicitly excluded
- outcome (perda de controle/fatalidades) não usado como prova SERA
- probable cause/contributing factors quarentenados
- findings/recommendations excluídas
- inferências sobre fadiga/treinamento como código SERA
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- A-axis é forte mas pode requerer revisão autoral para separar incorrect response vs treinamento/capacidade
- O-axis pode ser nominal ou fraca; draft não deve transformar objetivo de aproximação em falha de objetivo por outcome
- Múltiplos atores envolvidos requer decisão sobre estrutura single vs multi-actor

## 11. A4R181 readiness
READY_AS_MULTI_ACTOR_CANDIDATE

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

Colgan Air 3407 (operando como Continental Connection 3407) era um vôo regional Newark (EWR) → Buffalo (BUF), operado em DHC-8-402 Q400 em 12 fev 2009. A tripulação compunha-se de captain (PM em parte do vôo) e first officer (PF na aproximação). A operação era noturna; condições meteorológicas em Buffalo incluíam tempo gelado/sleet com nuvens baixas. A discussão pré-aproximação na cabine, segundo CVR/relatório NTSB, incluiu acumulação de gelo em route e em descida, embora o sistema de degelo estivesse operando.

Durante a aproximação à pista 23 via ILS, a tripulação configurou flaps progressivamente e baixou trem em sequência. As velocidades de pouso briefadas eram para flaps 15. A velocidade decaiu de patamares de cruise para ~135 kt durante a configuração final, com o autopilot mantendo altitude/perfil. A baixa velocidade, em combinação com a configuração e possível efeito residual de gelo, levou o sistema low-speed cue (envelope protection) a alertar e o stick shaker a ativar em 2216:27.4 UTC.

A resposta da PF (first officer) ao stick shaker incluiu, segundo FDR, movimento aft significativo do control column — direção oposta à resposta de stall recovery padrão Q400. O autopilot desconectou automaticamente como esperado quando o shaker ativou. A potência foi avançada manualmente. A aeronave entrou em pitch-up acentuado e rolamento, com a velocidade caindo ainda mais. O stick pusher (envelope protection ativa) acionou para reduzir o pitch.

Logo após o pusher, a first officer declarou ter colocado os flaps para 0 (retração). A retração de flaps em estado de baixa velocidade próximo ao stall, embora reduzisse drag, também aumentou a stall speed efetiva. A aeronave entrou em descida íngreme com rolamento e impactou uma residência próxima à aproximação. Outcome registrado factualmente, NÃO usado como prova SERA.

A operação caracterizou-se por: cue de low-speed disponível no PFD (Q400 instrument) antes do shaker; resposta de control column oposta à esperada para stall recovery; ações coordenadas mas não-canônicas entre PF (column input + power) e PM (interação na cabine) + FO (retração de flaps).

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Briefing | Crew briefou flaps 15 landing speeds; planejou ILS RWY 23 | Crew | COL3407-E1 (606-645) | HIGH |
| 2 | Descida/configuração | Discussão de gelo; trem baixo; flaps selecionados; velocidade ~135 kt | Crew + sistemas | COL3407-E2 (680-719) | HIGH |
| 3 | Cue pré-shaker | Low-speed cue disponível no PFD do Q400 | PFD/sistema de envelope | COL3407-E6 (1353-1373) | HIGH |
| 4 | Stick shaker (2216:27.4) | Stick shaker ativou; autopilot desconectou | Sistema + automação | COL3407-E3 (719-750) | HIGH |
| 5 | Resposta PF | Control column moveu aft (oposto a recovery); potência avançada | PF (Captain) | COL3407-E4 (748-756) | HIGH |
| 6 | Stick pusher | Stick pusher ativou para reduzir pitch | Sistema envelope protection | COL3407-E5 (757-763) | HIGH |
| 7 | Retração de flaps | FO declarou flaps 0; aumento de stall speed efetiva | FO (PM) | COL3407-E5 | HIGH |
| 8 | Loss of control / impacto | Descida íngreme com rolamento; impacto contra residência | Aeronave + ambiente | COL3407-E1 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: condições de gelo/sleet em BUF; sistema low-speed cue funcional; stick shaker + stick pusher em envelope protection; autopilot integrado; Q400 envelope com características próprias para stall recovery.
- **Human-observable actions**: configuração de aproximação nominal; ausência de aviso/correção quando velocidade decaiu para ~135 kt antes do shaker; movimento aft do control column em resposta ao shaker (oposto a recovery); avanço de potência; retração manual de flaps para 0 após pusher.
- **Human-inference cautions**: NÃO inferir treinamento específico ou fadiga como código SERA; NÃO inferir contribuição de gelo como causa primária (sistema de degelo estava operando, contexto técnico secundário); slice marca PF response como tema central com boundary entre incorrect response (A-axis) e treinamento/capacidade (capability). Slice nota que O-axis pode ser nominal ou fraca — draft não deve transformar objetivo de aproximação em falha de objetivo por outcome.
- **What must not be inferred yet**: código P, O ou A; categorização do response como erro de implementação vs erro de seleção; código diferencial para captain (PF action) vs FO (flap retraction).

## 16. Escape point context

O escape point candidato primário é o stick shaker/autopilot disconnect em 2216:27.4 UTC, momento em que resposta de recovery padrão (push nose down + add power + maintain coordinated) era requerida. Um EP secundário/antecedente é o cue de low-speed durante configuração, quando velocidade decaiu para ~135 kt sem awareness/correção do crew. Permanece candidato porque (a) o slice trata escape point com clareza PARTIAL, (b) escolha entre EP primário (shaker response) e EP antecedente (low-speed cue) muda framing P vs A, e (c) há contribuição multi-actor (CPT/PF aft column + FO flap retraction) que requer separação autoral. Falta confirmar: callouts esperados vs realizados durante decaimento de velocidade pré-shaker, e diferenciação de actorContributionId entre CPT e FO. Risco de confundir outcome com ponto de fuga: o loss of control / impacto é consequência; o escape point é o cue de low-speed ou o disparo do shaker.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_SUFFICIENT
- sourceCompleteness: HIGH (slice A4R115 ADEQUATE_FOR_TRACE_DRAFT, FULL_TRACE_POSSIBLE)
- extractionConfidence: MEDIUM-HIGH
- missingForA4R181: callouts pré-shaker; diferenciação multi-actor CPT (column input) vs FO (flap retraction) — confirmar actorContributionId
- recommendedA4R181Handling: BATCH_B_MULTI_ACTOR — adjudicação autoral com single escape point + dois actorContributionId distintos.
