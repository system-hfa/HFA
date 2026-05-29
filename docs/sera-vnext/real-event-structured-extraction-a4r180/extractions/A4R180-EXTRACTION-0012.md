# A4R180 Structured Extraction — A4R179-SEL-0012 — TSB-CANADA-LIGHT-HELICOPTER-OR-SMALL-AIRCRAFT-SEE-REPORT

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0012
- inventoryId: A4R178-INV-0246
- probableEventKey: TSB-CANADA-A20Q0015 (Bell 206L-4 C-GSQA, Service aérien gouvernemental of Quebec, Lac Saint-Jean CFIT)
- sourcePath: docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/46__2021__TSB-Canada__Light-helicopter-or-small-aircraft-see-report-for-exact-type__Air-transportation-safety-investigation-repor.pdf
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT
- sourceQuality: HIGH
- selectionLane: Multi-actor candidates
- selectionStatus: SELECT_AS_MULTI_ACTOR
- sourceAccessStatus: ACCESSED_VIA_TXT_COMPANION (a4r111-full-pool-txt/46__...txt — Summary e History of Flight lidos)
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE

## 2. Factual event summary
TSB A20Q0015 documenta CFIT de Bell 206L-4 (C-GSQA, Service aérien gouvernemental de Quebec) em Lac Saint-Jean, 22 jan 2020. Manhã: 2 helicópteros saíram de CYHU 0750 EST para apoio a busca de snowmobilers desaparecidos perto de Saint-Henri-de-Taillon. Piloto da ocorrência conduziu buscas a baixa altitude (<100 ft AGL) sobre superfície congelada do Lac Saint-Jean entre 1130-1219. Após buscas, refuel em Alma (1230) e retorno a Saint-Henri-de-Taillon (1325). Cedo da tarde, helicóptero da ocorrência liberado por porta traseira difícil de fechar; decidido enviá-lo de volta a CYHU. Piloto único a bordo decolou 1402 para CYLQ, mantendo baixa velocidade (<90 kt) por causa da porta. ~7 min após decolagem, helicóptero atingiu superfície congelada e coberta de neve do lago. No momento do impacto, piloto acreditava estar em cruise a ~500 ft AGL quando sentiu desaceleração longitudinal rápida, ouviu surge dos motores e ficou desorientado por percepção de rotação para esquerda. Análise TSB foca em flat light, training, gerenciamento de operational hazards, flight progression. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| 0750 EST | Dois helicópteros saíram de CYHU para Saint-Henri-de-Taillon | TXT linhas ~100-130 | HIGH |
| 1025 | Chegada ao destino após refuel em CYLQ | TXT linhas ~130-150 | HIGH |
| 1130-1219 | Buscas a <100 ft AGL sobre Lac Saint-Jean | TXT linhas ~150-175 | HIGH |
| 1230 | Refuel em CYTF (Alma) | TXT linhas ~175-180 | HIGH |
| 1325 | Touchdown em Saint-Henri-de-Taillon | TXT linhas ~180-195 | HIGH |
| 1402 | Decolagem para CYLQ, piloto sozinho, baixa velocidade por porta sliding | TXT linhas ~195-210 | HIGH |
| 1409 (~7 min após) | Helicóptero atingiu superfície congelada de Lac Saint-Jean | TXT linhas ~210-230 | HIGH |
| Pós-impacto | Piloto reportou que acreditava estar a ~500 ft AGL, sentiu desaceleração e desorientação | TXT linhas ~210-230 | HIGH |

## 4. Unsafe state / unsafe condition candidate
- candidate: Continuação de voo em condição de flat light sobre superfície congelada uniformemente coberta de neve, sem referência visual confiável para altitude AGL real, sem instrumental cross-check
- evidence: Piloto acreditava estar a ~500 ft AGL no momento do impacto contra a superfície; condição de flat light identificada como tema central de análise TSB; experiência prévia voando a <100 ft AGL pode ter influenciado referências visuais
- confidence: MEDIUM-HIGH
- uncertainty: Momento discreto de transição entre cruise nominal e degradação de spatial awareness é zona; tópicos de flat light e visual references são análise TSB que devem ser usados como fatos secundários

## 5. Possible escape point candidate
- possibleEscapePoint: Janela entre estabelecimento de cruise (~1402+alguns minutos) e impacto (~1409), em que cross-check instrumental de altitude vs visual reference falhou em manter consciência espacial
- whyPotential: TSB identifica flat light como hazard ativo e spatial awareness como tópico de análise; este vôo de retorno solo após operações a baixa altitude criou condições para perception failure
- sourceAnchor: TXT linhas ~210-230 (history of flight) + index seções 1.18.1 (Spatial awareness), 1.18.2 (Visibility/visual references), 2.1 (Flat light)
- confidence: PARTIAL
- limitations: Operação solo (single-pilot); não há "multi-actor" no sentido tradicional cockpit. Selecionado como multi-actor pelo lane A4R179, mas natureza single-pilot torna multi-actor menos óbvio — poderia ser despachante/operational decision-maker (decidir enviar aeronave de volta) como segundo ator contextual

## 6. Direct actor candidate
- directActorCandidate: Pilot único da ocorrência
- role: Single-pilot operação VFR de retorno
- evidence: TXT explicita "the pilot, sole occupant of the aircraft, took off at 1402"
- confidence: HIGH
- uncertainty: Operação single-pilot torna direct actor claro; multi-actor framing requer reavaliação

## 7. Actor contribution candidates
- POTENCIAL_MULTI_ATOR (Pilot + SAG dispatcher/operational decision contexto)

| actorContributionId | actorRole | candidateContribution | evidence | confidence | limitations |
|---|---|---|---|---|---|
| TSB-A20Q0015-A4R180-ACTOR-PILOT | Single-pilot | Decisão de continuar em flat light sem cross-check instrumental adequado | TXT linhas ~210-230 | MEDIUM | Boundary entre perception (P) e action (A) |
| TSB-A20Q0015-A4R180-ACTOR-OPDISPATCH | Operational dispatcher/SAG | Decisão de enviar aeronave única de volta solo dado door issue e operational hazard contexto | TXT linhas ~190-200 | LOW | Contextual; boundary entre influência organizacional e direct contribution |

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| TSB-A20Q0015-A4R180-F1 | TXT linhas ~150-175 | Buscas a <100 ft AGL sobre Lac Saint-Jean congelado | Contexto de adaptação visual a baixa altitude | Não conclusão SERA |
| TSB-A20Q0015-A4R180-F2 | TXT linhas ~195-210 | Decolagem solo com low speed por porta sliding | Contexto operacional | Boundary |
| TSB-A20Q0015-A4R180-F3 | TXT linhas ~210-230 | Piloto acreditava ~500 ft AGL no impacto; desaceleração + rotação percebida | Suporta perception failure | Não substitui análise causal |
| TSB-A20Q0015-A4R180-F4 | TXT index 1.18.1, 1.18.2, 2.1 | TSB analisou flat light, spatial awareness, visibility/visual references | Contexto de boundary entre condição ambiental e cue perceptual | Análise TSB pode importar conclusão; manter factual |

## 9. Information explicitly excluded
- Findings as to causes and contributing factors (section 3.1) excluídos
- Findings as to risk (section 3.2) excluídos
- Safety action (section 4) excluída
- Appendix A (TSB investigations with conditions known to affect pilot spatial awareness) usado apenas como contexto de tema, não como classificação
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- outcome (acidente/lesões sérias) não usado como prova SERA

## 10. Uncertainty notes
- Lane A4R179 selecionou como multi-actor, mas natureza single-pilot torna multi-actor menos óbvio; reavaliação como boundary case ou single-pilot escape pode ser apropriada em A4R181
- Boundary entre P (perception de altitude em flat light) e A (decisão de não cross-check instrumental) é zona
- TSB explora flat light como tema; cuidar para não importar conclusão causal

## 11. A4R181 readiness
READY_FOR_AUTHOR_ADJUDICATION (rever multi-actor framing — pode ser melhor tratado como boundary single-pilot)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

TSB A20Q0015 documenta um CFIT envolvendo um Bell 206L-4 (C-GSQA) do Service aérien gouvernemental (SAG) do Quebec em 22 jan 2020. A operação era apoio aéreo a busca por snowmobilers desaparecidos em Lac Saint-Jean, Quebec. Dois helicópteros SAG saíram do Montréal/St-Hubert Airport (CYHU) às 0750 EST com escala de refuel em CYLQ; chegaram a Saint-Henri-de-Taillon às 1025. Operação single-pilot por aeronave, com biólogos/observadores em alguns segmentos.

Entre 1130 e 1219, o piloto da ocorrência conduziu buscas a baixa altitude (<100 ft AGL) sobre a superfície congelada e coberta de neve do Lac Saint-Jean, próximo a ilhas perto de La Grande Décharge. Após as buscas, refuel em Alma (CYTF, 1230) e retorno a Saint-Henri-de-Taillon às 1325. No início da tarde, dado que apenas um aircraft era necessário para continuar a busca e que a porta sliding traseira da aeronave da ocorrência apresentava dificuldade de fechamento, foi decidido enviar o helicóptero de volta a CYHU.

O piloto, sozinho a bordo, decolou às 1402 com rumo a CYLQ. Mantendo intencionalmente velocidade baixa (<90 kt — limite operacional para porta sliding aberta caso esta acidentalmente abrisse em vôo). Aproximadamente 7 minutos após decolagem, o helicóptero atingiu a superfície congelada do Lac Saint-Jean. Segundo declaração do piloto pós-acidente, ele acreditava estar em cruise a ~500 ft AGL no momento do impacto; sentiu uma desaceleração longitudinal rápida, ouviu surge dos motores e ficou desorientado por uma percepção de rotação para a esquerda.

A análise TSB foca em três temas: (1) **flat light** — condição em que a superfície uniformemente branca (neve sobre gelo) combinada com céu nublado uniformemente cinza/claro elimina shadows e gradients de luminosidade, degradando severamente a percepção de altitude e de horizonte; (2) **training** — adequação de treinamento específico para reconhecimento e mitigação de flat light em operação heli rotorcraft; (3) **management of operational hazards** — políticas operacionais do SAG para identificação de condições degradadas. O accident occurrence é classificado como CFIT na summary do TSB.

A operação caracterizou-se por: single-pilot heli rotorcraft em condição VFR com superfície uniformemente coberta de neve (flat light potential); contexto operacional de retorno solo após operações de search a baixa altitude (visual references diferentes); ausência de cross-check instrumental adequado de altitude radio/baro contra referência visual incerta. A4R179 lane selecionou como multi-actor; tratamento aqui sugere reframe como boundary single-pilot com contexto operacional (dispatcher/policy) como secondary.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | 0750 EST | Dois helis SAG saíram de CYHU para Saint-Henri-de-Taillon | Crews + dispatch SAG | TXT linhas ~100-130 | HIGH |
| 2 | 1025 | Chegada destino após refuel CYLQ | Crews | TXT linhas ~130-150 | HIGH |
| 3 | 1130-1219 | Buscas a <100 ft AGL sobre Lac Saint-Jean | Pilot | TXT linhas ~150-175 | HIGH |
| 4 | 1325 | Retorno a Saint-Henri-de-Taillon após refuel Alma | Pilot | TXT linhas ~180-195 | HIGH |
| 5 | ~1400 | Decisão de enviar heli da ocorrência de volta a CYHU (porta + apenas 1 aircraft necessário) | SAG dispatcher + Pilot | TXT linhas ~195-200 | HIGH |
| 6 | 1402 | Decolagem solo para CYLQ; baixa velocidade por porta | Pilot | TXT linhas ~200-210 | HIGH |
| 7 | ~1409 (+7 min) | Impacto contra superfície congelada de Lac Saint-Jean | Pilot + ambiente | TXT linhas ~210-225 | HIGH |
| 8 | Pós-impacto | Piloto reportou crer estar a ~500 ft AGL; desaceleração + rotação percebida | Pilot statement post-accident | TXT linhas ~210-225 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: superfície congelada uniformemente coberta de neve; céu provavelmente uniformemente nublado (flat light condition); aeronave Bell 206L-4 com altímetros radio e barométrico funcionais; porta sliding traseira com dificuldade de fechamento; ELT 406 MHz funcional.
- **Human-observable actions**: decisão dispatcher/pilot de enviar aeronave de volta solo; decisão pilot de manter velocidade <90 kt; cruise em altitude que pilot acreditava ser ~500 ft mas na realidade era próxima da superfície; ausência de cross-check instrumental verificável.
- **Human-inference cautions**: NÃO inferir flat light como código SERA fechado — é condição ambiental que cria boundary entre P (perception degradada por ambiente) e A (cross-check instrumental); operação single-pilot torna multi-actor framing menos óbvio que lane A4R179 sugere; NÃO importar conclusões TSB sobre training/policy como código SERA.
- **What must not be inferred yet**: código P, O ou A; framing multi-actor (single-pilot core; SAG dispatcher como influência contextual); momento discreto de transição entre cruise nominal e degradação de spatial awareness.

## 16. Escape point context

A zona candidata é a janela curta entre estabelecimento de cruise (~1402 + alguns min) e impacto (~1409), em que cross-check instrumental de altitude (radio/baro vs visual) era requerido para manter consciência espacial em condição de flat light. Possíveis EPs: (EP1) decisão pré-decolagem de aceitar single-pilot return em condições potencialmente flat light; (EP2) momento de transição de visual environment (de busca a baixa altitude com referências de ilhas/terreno para cruise sobre superfície uniformemente branca); (EP3) momento de degradação progressiva de altitude awareness sem ação de cross-check ou climb. Permanece candidato porque (a) operação single-pilot sem CVR/cockpit recording, anchor de perception é limitado a depoimento pós-acidente, (b) lane A4R179 multi-actor framing requer reavaliação, e (c) flat light boundary entre P (ambiental) e A (não cross-check) é alta. Falta confirmar: framing multi-actor (single-pilot vs contexto operacional); priorização entre EP1/EP2/EP3. Risco de confundir outcome com ponto de fuga: o impacto contra superfície congelada é consequência; o escape point é a janela de cruise sem cross-check.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: NARRATIVE_THIN_NEEDS_ENRICHMENT (TXT primário lido superficialmente; análise TSB detalhada não lida)
- sourceCompleteness: HIGH (TSB report completo disponível)
- extractionConfidence: MEDIUM
- missingForA4R181: leitura detalhada de TSB section 2 (Analysis); decisão sobre framing single-pilot vs multi-actor; priorização EP
- recommendedA4R181Handling: BATCH_B_BOUNDARY + REFRAME_MULTI_ACTOR_TO_SINGLE_PILOT_BOUNDARY — adjudicação autoral com reframe de framing multi-actor para single-pilot com contexto operacional.
