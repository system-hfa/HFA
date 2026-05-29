# A4R180 Structured Extraction — A4R179-SEL-0020 — REAL-EVENT-0003

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0020
- inventoryId: A4R178-INV-0177
- probableEventKey: REAL-EVENT-0003 (S-76C+ Tofino night approach near-CFIT, TSB A15P0217)
- sourcePath: docs/sera-vnext/real-event-reaudits-a4r139/REAL-EVENT-0003_REAUDIT_AT_ESCAPE_POINT_A4R139_v0.2.0.md
- sourceBucket: REAL_EVENT_EXTRACTION
- sourceQuality: MEDIUM
- selectionLane: Insufficient evidence / UNRESOLVED candidates
- selectionStatus: SELECT_AS_UNRESOLVED_CANDIDATE
- sourceAccessStatus: ACCESSED (reaudit A4R139 lido)
- sourceDirectness: SOURCE_PARTIAL (reaudit é extração prévia; fonte primária TSB A15P0217 referenciada)

## 2. Factual event summary
REAL-EVENT-0003: Sikorsky S-76C+ em medevac flight noturno VFR aproximando-se de área de pouso temporariamente iluminada em Tofino/Long Beach. PF desengajou autopilot a 0239:01 conforme SOP (no coupled flight em visual circuit; decouple antes de final approach checks). SOP não definia minimum airspeed para NVFR. ~10 s após disconnect, velocidade decresceu abaixo de 60 KIAS e atitude de pitch ultrapassou 14° nose-up. PF comentou que landing zone estava mais próxima do que esperado e fez large control inputs para ajustar descent angle e velocidade, resultando em perfil de aproximação perigoso. Crew recuperou em altitude extremamente baixa; near-CFIT sem injúrias. Reaudit A4R139 marcou escape point como SOURCE_PARTIAL — degradação descrita como processo, não evento discreto. Reaudit também marcou P-axis como UNRESOLVED por evidência insuficiente para anchor de perception no primeiro momento de deviação.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Aproximação visual NVFR | Visual approach noturna para RWY 29 / área temporariamente iluminada Tofino | Reaudit A4R139, seção Pre-Escape Context | HIGH |
| 0239:01 | PF desengajou autopilot manualmente (SOP-compliant) | Reaudit A4R139, seção Escape Point Moment | HIGH |
| 0239:01 - 0239:11+ | Manual/visual approach iniciou desaceleração mantendo altitude constante | Reaudit A4R139 | HIGH |
| ~0239:11 | Velocidade abaixo de 60 KIAS, pitch > 14° nose-up | Reaudit A4R139 | HIGH |
| PF comentário | PF comentou landing zone closer than expected; large control inputs para ajustar | Reaudit A4R139 | HIGH |
| Recovery | Recovery em altitude extremamente baixa; near-CFIT | Reaudit A4R139, seção Post-Escape Consequences | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Progressive deviation of airspeed (decreasing below safe approach speed) and pitch attitude (increasing beyond safe approach attitude) during manual/visual approach segment, without timely correction
- evidence: TSB A15P0217: speed < 60 KIAS, pitch > 14° nose-up ~10s após disconnect
- confidence: MEDIUM (SOURCE_PARTIAL — reaudit marca degradação como processo, não evento discreto)
- uncertainty: Momento discreto exato de primeira partida do safe envelope é zona, não momento; SOP não definia minimum airspeed para NVFR

## 5. Possible escape point candidate
- possibleEscapePoint: "Quando, após a desconexão manual do autopilot pelo PF, a velocidade indicada e a atitude de cabrar se desviaram progressivamente do perfil de aproximação visual estabilizada, o perfil de energia da aproximação saiu do envelope de operação segura."
- whyPotential: Reaudit A4R139 produziu esta statement de escape point; manual disconnect a 0239:01 é pre-escape context (SOP-compliant); primeira deviação ocorreu APÓS disconnect
- sourceAnchor: Reaudit A4R139, seção Escape Point Moment
- confidence: PARTIAL (escapePointStatus = SOURCE_PARTIAL no reaudit)
- limitations: Exato discrete observable moment não isolado; SOP não definia minimum safe speed NVFR; reaudit A4R137 suspendeu approval prior de POA pendente reauditoria

## 6. Direct actor candidate
- directActorCandidate: PF (Pilot Flying) — manual control após autopilot disconnect
- role: PF executando manual/visual approach NVFR após decoupling SOP-compliant
- evidence: Reaudit A4R139, "directActor: PF"
- confidence: PARTIAL
- uncertainty: A-axis adjudication suspensa em A4R137; technical failure ruled out (TSB: no system malfunction)

## 7. Actor contribution candidates
- notApplicableReason: Reaudit trata PF como direct actor único; multi-actor handling não escopado em A4R139. UNRESOLVED candidate selecionado para reduzir ambiguidade em A4R180/A4R181.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| REAL-EVENT-0003-A4R180-F1 | Reaudit A4R139, Pre-Escape Context | NVFR medevac, S-76C+, RWY 29 Tofino, SOP exigia decouple <1000 ft, no minimum airspeed defined NVFR | Contexto pré-escape | SOP gap é tema de análise TSB |
| REAL-EVENT-0003-A4R180-F2 | Reaudit A4R139, Escape Point Moment | Manual disconnect 0239:01 + desaceleração + speed<60 KIAS/pitch>14° ~10s depois | Suporta escape point zone | SOURCE_PARTIAL; not discrete |
| REAL-EVENT-0003-A4R180-F3 | Reaudit A4R139, P Axis | PF comentou landing zone closer than expected APÓS deviation progress; large control inputs como corrective | Suporta P partial; evidência insuficiente para code | UNRESOLVED P |
| REAL-EVENT-0003-A4R180-F4 | Reaudit A4R139, technicalFailureAlternative | TSB: no system malfunction; disconnect manual/voluntary | Confirma factor humano | Não substitui análise causal |

## 9. Information explicitly excluded
- Prior P-G, O-A, UNRESOLVED A do A4R133 (approval suspensa em A4R137)
- Reviewed draft P/O/A em A4R129 = NOT_REVIEWED_ESCAPE_POINT_NOT_READY
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- TSB probable cause/contributing factors quarentenados
- Recommendations excluídas
- Outcome (near-CFIT no injuries) não usado como prova SERA

## 10. Uncertainty notes
- escapePointStatus = SOURCE_PARTIAL: degradação é processo, não momento discreto
- P-axis UNRESOLVED: evidência insuficiente para perception no first moment of deviation
- SOP gap (no minimum airspeed defined NVFR) é tema de análise TSB
- A4R137 suspendeu approval POA prior pendente reauditoria — este candidato é selecionado como UNRESOLVED para reduzir ambiguidade em A4R180
- Tratar com cuidado para não fechar P/O/A nesta fase

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION (unresolved candidate — adjudicação autoral pode confirmar UNRESOLVED ou propor draft com source enrichment adicional)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

REAL-EVENT-0003 documenta um near-CFIT noturno envolvendo Sikorsky S-76C+ em vôo medevac (HEMS — helicopter emergency medical service) com aproximação a área de pouso temporariamente iluminada em Tofino/Long Beach Airport (CYAZ), British Columbia, em 4 abr 2015 (TSB report A15P0217). Operação noturna VFR sob condições NVFR (night VFR) com referências visuais limitadas.

A tripulação compunha-se de PF e PM em aeronave dual-pilot certificada. SOP da operadora exigia: (a) no coupled flight (autopilot coupled to ILS/approach) em circuito visual; (b) decoupling antes de final approach checks ou sooner. SOP NÃO definia minimum airspeed para aproximação NVFR — uma lacuna de procedimento que é tema de análise TSB. VMINI conhecido para IMC era 60 KIAS (referência aerodinâmica, não SOP).

Em 0239:01 (timestamp do disconnect), o PF desengajou o autopilot manualmente — operação SOP-compliant. A partir desse momento, a aeronave executou manual/visual approach. Aproximadamente 10 segundos depois (~0239:11), velocidade indicada decresceu abaixo de 60 KIAS e pitch attitude excedeu 14° nose-up — combinação que sai do envelope de aproximação visual estabilizada para S-76C+ em condições NVFR. O TSB descreve a degradação como **processo** (deceleração → low speed → high pitch → large control inputs → hazardous profile) e não como momento discreto único.

O PF comentou que landing zone estava "closer than expected" — indicando que percepção visual da distância pode ter sido alterada pela iluminação temporária + escuridão. Esta percepção tardia disparou large control inputs para ajustar descent angle e velocidade. As corrections, embora reativas, criaram hazardous profile: rotor speed decay, descent rate alto, low altitude.

Crew recuperou em altitude extremamente baixa; near-CFIT exposure ocorreu mas não houve impacto. Não houve injúrias; aeronave recuperada. Análise TSB foca em: SOP gap (no minimum airspeed NVFR), monitoramento de envelope durante manual/visual transition, e perception de distância sob iluminação NVFR.

Reaudit A4R139 (após decisão A4R137 de suspender approval prévia A4R133) marcou: escapePointStatus = SOURCE_PARTIAL (degradação é zona, não momento), pAxisDecision = UNRESOLVED (evidência insuficiente para perception no primeiro momento de deviation), oAxisDecision = UNRESOLVED, aAxisDecision = UNRESOLVED. A4R180 preserva framing UNRESOLVED.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Pré-aproximação NVFR | Aproximação visual RWY 29 Tofino / área temporariamente iluminada; SOP exige decouple <1000 ft | Crew + SOP | Reaudit A4R139, Pre-Escape Context | HIGH |
| 2 | 0239:01 | PF desengajou autopilot manualmente (SOP-compliant) | PF | Reaudit A4R139, Escape Point Moment | HIGH |
| 3 | 0239:01 - ~0239:11 | Aproximação manual/visual iniciou desaceleração mantendo altitude constante | Aeronave + PF | Reaudit A4R139 | HIGH |
| 4 | ~0239:11 | Velocidade <60 KIAS, pitch >14° nose-up | Aeronave + sistema | Reaudit A4R139 | HIGH |
| 5 | PF comentário | PF comentou landing zone closer than expected | PF | Reaudit A4R139 | HIGH |
| 6 | Large control inputs | Large control inputs para ajustar descent angle/velocidade (reativos) | PF | Reaudit A4R139 | HIGH |
| 7 | Hazardous profile | Rotor speed decay, descent rate alto, low altitude | Aeronave | Reaudit A4R139, Post-Escape | HIGH |
| 8 | Recovery em low altitude | Crew recuperou em altitude extremamente baixa; near-CFIT sem injúrias | Crew + aeronave | Reaudit A4R139 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: S-76C+ certificado para NVFR dual-pilot operations; SOP gap (no minimum airspeed NVFR defined); VMINI IMC = 60 KIAS; área de pouso temporariamente iluminada (não permanent lighting); condições NVFR (referências visuais limitadas); autopilot disconnect manual (não automático).
- **Human-observable actions**: disconnect manual a 0239:01 (SOP-compliant); decaimento de airspeed/pitch sem correção imediata; reconhecimento tardio via comentário "closer than expected"; large control inputs reativas.
- **Human-inference cautions**: NÃO inferir SOP gap como código SERA (é contexto procedural/organizacional); reaudit A4R139 marca P-axis UNRESOLVED por evidência insuficiente para perception no momento exato da first departure — preservar UNRESOLVED; outcome não-impacto não é prova de "sem falha"; NÃO importar análises TSB sobre SOP/training como código SERA.
- **What must not be inferred yet**: código P/O/A; transformar UNRESOLVED em fechamento; categorizar "closer than expected" como código P.

## 16. Escape point context

O escape point candidato segue o statement do reaudit A4R139: "Quando, após a desconexão manual do autopilot pelo PF, a velocidade indicada e a atitude de cabrar se desviaram progressivamente do perfil de aproximação visual estabilizada, o perfil de energia da aproximação saiu do envelope de operação segura." escapePointStatus = SOURCE_PARTIAL. Permanece candidato porque (a) degradação é descrita como processo (zona) e não momento discreto, (b) SOP não definia minimum airspeed NVFR (lacuna procedural impede limite preciso), (c) o exato cue que deveria ter disparado correção no first moment não foi isolado, e (d) reaudit suspendeu approval POA prior. Falta confirmar: a manutenção do framing UNRESOLVED em A4R181 ou proposta de source enrichment dedicada; tratamento de SOP gap como contexto sistêmico. Risco de confundir outcome com ponto de fuga: não houve impacto, então não há "outcome catastrófico"; o escape point é a janela ~10s pós-disconnect em que correção era requerida e foi tardia.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_THIN_NEEDS_ENRICHMENT (reaudit é summary; TSB A15P0217 source primária não lida diretamente nesta fase)
- sourceCompleteness: MEDIUM (reaudit processou source primária; conteúdo factual condensed)
- extractionConfidence: MEDIUM (UNRESOLVED framing preservado)
- missingForA4R181: leitura direta de TSB A15P0217 para timeline detalhado; decisão sobre manter UNRESOLVED ou propor source enrichment
- recommendedA4R181Handling: BATCH_D_UNRESOLVED_CANDIDATE — manter UNRESOLVED como decisão autoral defensável OR source enrichment.
