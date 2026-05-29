# A4R180 Structured Extraction — A4R179-SEL-0014 — NTSB-USA-SIKORSKY-S-76A

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0014
- inventoryId: A4R178-INV-0294
- probableEventKey: NTSB-USA-SIKORSKY-S-76A (Gulf of Mexico offshore CFIT)
- sourcePath: docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool/NEW50-29__2006__NTSB-USA__Sikorsky-S-76A__Sikorsky-S-76A-offshore-CFIT-Gulf-of-Mexic.pdf
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT
- sourceQuality: HIGH (PDF original); TXT companion: LOW (conteúdo incorreto)
- selectionLane: Multi-actor candidates
- selectionStatus: SELECT_AS_MULTI_ACTOR
- sourceAccessStatus: SOURCE_PARTIAL — TXT companheiro (a4r111-new50-pool-txt/NEW50-29__...txt) contém conteúdo inconsistente (texto de FTW02LA122 / Cessna 172R McKinney, Texas; NÃO Sikorsky S-76A). PDF não lido diretamente nesta fase. Necessária leitura direta do PDF ou re-extração do TXT
- sourceDirectness: SOURCE_PARTIAL_TXT_MISMATCH

## 2. Factual event summary
Selecionado como SELECT_AS_MULTI_ACTOR pelo lane A4R179. Tópico previsto: CFIT offshore Sikorsky S-76A no Golfo do México (2006). Conteúdo factual completo NÃO foi acessado nesta fase porque o TXT companheiro `a4r111-new50-pool-txt/NEW50-29__2006__NTSB-USA__Sikorsky-S-76A__Sikorsky-S-76A-offshore-CFIT-Gulf-of-Mexic.txt` apresenta conteúdo de outro evento (Cessna 172R, McKinney, Texas, FTW02LA122). PDF primário existe mas não foi acessado diretamente.

Esta extração é HOLD por SOURCE_PARTIAL/TXT_MISMATCH. Conteúdo factual deve ser obtido via leitura direta do PDF ou re-extração do TXT em A4R181.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| (Hold — TXT mismatch) | Conteúdo factual não acessado nesta fase | PDF NEW50-29 existe; TXT incorreto | LOW |

## 4. Unsafe state / unsafe condition candidate
- candidate: HOLD — não extraído por SOURCE_PARTIAL
- evidence: TXT mismatch impede extração factual; PDF não lido diretamente nesta fase
- confidence: LOW
- uncertainty: Conteúdo factual a determinar em A4R181 com leitura direta do PDF

## 5. Possible escape point candidate
- possibleEscapePoint: HOLD pendente fonte
- whyPotential: Lane A4R179 indica multi-actor potential (CFIT offshore, ambiente IFR/night, dois pilotos típico em S-76A)
- sourceAnchor: TXT mismatch; PDF não lido
- confidence: LOW (HOLD)
- limitations: Necessária ação corretiva: re-extrair TXT do PDF NEW50-29 ou ler PDF direto antes de A4R181

## 6. Direct actor candidate
- directActorCandidate: HOLD — typically PF/PM em operação S-76A offshore
- role: A determinar
- evidence: Não acessado
- confidence: LOW
- uncertainty: HOLD

## 7. Actor contribution candidates
- notApplicableReason: HOLD por SOURCE_PARTIAL. Multi-actor handling postponed para A4R181 após resolução de fonte.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| SIKORSKY-S76A-A4R180-F1 | PDF NEW50-29 (inventoryId A4R178-INV-0294) | PDF existe mas não foi lido nesta fase; TXT companheiro contém conteúdo de outro evento (Cessna 172R FTW02LA122) | Marca HOLD por SOURCE_PARTIAL/TXT_MISMATCH | Requer correção de fonte antes de A4R181 |

## 9. Information explicitly excluded
- TODA conclusão factual nesta fase (HOLD)
- Probable cause/findings/recommendations não acessadas
- HFACS/Risk/ERC/ARMS/ERC não aplicados

## 10. Uncertainty notes
- TXT mismatch é a principal limitação
- Ação corretiva recomendada em A4R181: ler PDF diretamente OU re-executar pipeline TXT extraction (a4r111 inventory)
- Possibilidade de que o TXT mismatch também afete outros itens — verificar amostragem
- Risco de operar com fonte errada se a correção não for feita antes de A4R181

## 11. A4R181 readiness
NEEDS_SOURCE_ENRICHMENT (TXT mismatch — re-extrair ou ler PDF antes de adjudicação)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

**SOURCE_MISMATCH_REQUIRES_REPAIR — NO NARRATIVE INVENTED**

Esta extração NÃO contém narrativa operacional do evento porque a fonte primária acessível via TXT companion (`docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-29__2006__NTSB-USA__Sikorsky-S-76A__Sikorsky-S-76A-offshore-CFIT-Gulf-of-Mexic.txt`) contém conteúdo de UM EVENTO COMPLETAMENTE DIFERENTE: relatório NTSB FTW02LA122, sobre acidente de Cessna 172R durante taxi em McKinney, Texas (13 abr 2002), envolvendo um student pilot de 18 horas.

O PDF primário `NEW50-29__2006__NTSB-USA__Sikorsky-S-76A__Sikorsky-S-76A-offshore-CFIT-Gulf-of-Mexic.pdf` (inventoryId A4R178-INV-0294) existe no source corpus mas não foi lido diretamente nesta fase (sem PDF reader nesta extração; sem chamada LLM/API). O título do PDF sugere CFIT offshore Sikorsky S-76A no Golfo do México (2006), provavelmente um vôo de offshore oil & gas helicopter operations.

**Regra metodológica aplicada**: NÃO inventar narrativa quando a fonte está mismatched. Qualquer narrativa fabricada aqui criaria risco de adjudicação SERA baseada em fonte errada. A reparação requer leitura direta do PDF NEW50-29 ou re-extração do TXT via pipeline de OCR/conversão.

## 14. Source-grounded event sequence

**SOURCE_MISMATCH_REQUIRES_REPAIR — TABELA VAZIA**

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| HOLD | HOLD | Fonte TXT contém evento errado (Cessna 172R FTW02LA122); PDF não lido nesta fase | N/A | TXT mismatch | LOW (HOLD) |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: HOLD — fonte mismatched; necessário PDF reading ou TXT re-extraction.
- **Human-observable actions**: HOLD.
- **Human-inference cautions**: NÃO inferir nada do TXT mismatch; NÃO importar dados do Cessna 172R FTW02LA122 (evento distinto sem relação com Sikorsky S-76A); risco de propagação de fonte errada a outros TXT companions deve ser amostrado em A4R181.
- **What must not be inferred yet**: TUDO. Adjudicação A4R181 não deve prosseguir antes de reparar a fonte.

## 16. Escape point context

HOLD — sem fonte válida lida nesta fase, não é possível identificar escape point. Adjudicação suspensa até que (a) PDF NEW50-29 seja lido diretamente, ou (b) TXT companion seja re-extraído do PDF e validado.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: SOURCE_MISMATCH_REQUIRES_REPAIR
- sourceCompleteness: NONE (TXT companion mismatched; PDF não lido nesta fase)
- extractionConfidence: LOW (HOLD)
- missingForA4R181: leitura direta do PDF OU re-extração e validação do TXT; amostragem para verificar se outros TXTs no `a4r111-new50-pool-txt/` têm mismatches similares
- recommendedA4R181Handling: BATCH_D_REPAIR_BEFORE_ADJUDICATION — adjudicação SUSPENSA; ação corretiva de fonte é pré-requisito.
