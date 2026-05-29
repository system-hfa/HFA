# A4R180 Structured Extraction — A4R179-SEL-0015 — SOURCE-SLICE-USAIR-427-A4R115

Status:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Source linkage
- selectionId: A4R179-SEL-0015
- inventoryId: A4R178-INV-0079
- probableEventKey: SOURCE-SLICE-USAIR-427-A4R115 (USAir 427 Boeing 737-300 uncontrolled descent Pittsburgh)
- sourcePath: docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-USAIR-427-A4R115.md
- sourceBucket: OFFICIAL_REPORT_SOURCE_SLICE
- sourceQuality: HIGH (slice marca PARTIAL_FOR_TRACE_DRAFT)
- selectionLane: Multi-actor candidates
- selectionStatus: SELECT_AS_MULTI_ACTOR
- sourceAccessStatus: ACCESSED
- sourceDirectness: SOURCE_DIRECT_OR_PRIMARY_LIKE (slice marca HELD_OVERCLASSIFICATION_RISK)

## 2. Factual event summary
NTSB documenta descida descontrolada de USAir 427 (Boeing 737-300) próximo a Pittsburgh enquanto manobrava para pouso. Aeronave entrou em descida descontrolada e impactou terreno. Estrutura factual do relatório fortemente centrada em comportamento do sistema de rudder, rudder reversals, testes de sistema de controle e análises de simulação/performance humana. Slice marca alto risco de overclassification se forçado em uso de referência humana P/O/A. Slice cobre fatos sem importar conclusões causais.

## 3. Minimal timeline
| timeOrPhase | eventFact | sourceAnchor | confidence |
|---|---|---|---|
| Aproximação | Vôo manobrando para pousar em Pittsburgh | US427-E1 (linhas 353-365) | HIGH |
| Descida descontrolada | Aeronave entrou em descida descontrolada; impactou terreno; todos ocupantes mortos | US427-E1 | HIGH |
| Foco do relatório | Rudder malfunctions/reversals, design do rudder, training de unusual attitude, FDR parameters | US427-E2 (linhas 372-374) | HIGH |
| Análise humana | TOC identifica análise de performance humana e scenario de input do piloto, mas slice inicial dominado por inquérito de sistema de controle | US427-E3 (linhas 310-316) | MEDIUM |

## 4. Unsafe state / unsafe condition candidate
- candidate: HELD_OVERCLASSIFICATION_RISK — não há estado inseguro humano isolado identificável; evento dominado por análise de sistema de controle/aeronave
- evidence: Slice marca alto risco de overclassification para uso humano P/O/A
- confidence: LOW (HOLD)
- uncertainty: Boundary entre falha do sistema de controle e ação humana é alta; pode não ser apropriado para reference SERA humana

## 5. Possible escape point candidate
- possibleEscapePoint: HOLD — slice indica que nenhum escape point humano limpo foi identificado da fonte slice inicial
- whyPotential: Evento dominado por análise de sistema de controle/aeronave; risco de overclassification se forçado em human P/O/A reference
- sourceAnchor: SOURCE-SLICE-USAIR-427-A4R115 seção "4. Escape point candidate"
- confidence: LOW (HOLD)
- limitations: Slice requer review dedicada de boundary technical-versus-operator antes de qualquer trace draft

## 6. Direct actor candidate
- directActorCandidate: HOLD — slice não identifica direct actor humano limpo dado dominância de sistema de controle
- role: HOLD
- evidence: Slice marca dominância de sistema sobre operador no foco do relatório
- confidence: LOW
- uncertainty: Boundary entre PF e malfunção de rudder muito alta

## 7. Actor contribution candidates
- notApplicableReason: HELD_OVERCLASSIFICATION_RISK. Tema é primariamente sistema técnico/rudder reversal; tratamento como multi-actor humano não é apropriado sem expansão de fonte e review dedicada. Lane A4R179 selecionou como multi-actor mas slice marca HOLD.

## 8. Evidence fragments
| fragmentId | sourceAnchor | excerptOrParaphrase | evidenceUse | limitations |
|---|---|---|---|---|
| USAIR-427-A4R180-F1 | US427-E1 | Descida descontrolada manobrando para pouso; ocorrência factual | Contexto | Não SERA humana |
| USAIR-427-A4R180-F2 | US427-E2 | Foco do relatório em rudder/sistema/training de unusual attitude | Sinaliza tema técnico | Não importar como código humano A |
| USAIR-427-A4R180-F3 | US427-E3 | TOC identifica human performance analysis mas slice inicial dominado por sistema | Suporta HOLD | Requer expansão fonte para review |

## 9. Information explicitly excluded
- Probable cause, conclusões de sistema de rudder, design findings quarentenados
- Não inferir falha de ação SERA a partir de falha do sistema de controle da aeronave
- HFACS/Risk/ERC/ARMS/ERC não aplicados
- Análises de unusual attitude training não importadas como código SERA

## 10. Uncertainty notes
- Alto risco de overclassification para referência humana SERA
- Necessária boundary review técnico-vs-operador dedicada antes de qualquer trace draft
- Lane A4R179 selecionou como multi-actor candidate, mas slice marca HOLD; mismatch entre seleção e source slice deve ser resolvido em A4R181

## 11. A4R181 readiness
HOLD_TRACKER_ONLY (overclassification risk + slice marca HELD_OVERCLASSIFICATION_RISK; resolução requer boundary review)

## 12. Locks
- NOT_FOR_FIXTURE
- NOT_FOR_BASELINE
- NOT_FINAL_P_O_A
- NOT_RELEASED_CODE
- NOT_DOWNSTREAM

## 13. Operational narrative

USAir 427 era um vôo doméstico Chicago-O'Hare (ORD) → Pittsburgh (PIT), operado em Boeing 737-300 em 8 set 1994. Operação noturna em condições visuais. Esta extração é tratada como **TECHNICAL_DOMINANCE_BOUNDARY / NEEDS_AUTHOR_BOUNDARY_REVIEW** — o evento tem forte dominância técnica (sistema de rudder do 737 com defeito conhecido) que cria alto risco de overclassification se forçado em uso de referência humana P/O/A.

A aeronave estava em aproximação para Pittsburgh, em virada manobrando para o segmento final. Sem aviso, a aeronave entrou em desvio de rudder súbito e uncommanded — o slat reversal phenomenon que foi posteriormente identificado como característica do PCU (Power Control Unit) do rudder do 737 Classic. O desvio levou a perda de controle súbita: rolagem extrema seguida de descida quase vertical e impacto contra terreno. Todos os 132 ocupantes morreram.

A investigação NTSB foi uma das mais longas da história moderna (AAR-99-01, publicada 1999, 5 anos após o acidente). O foco do relatório estava centralizado em:
- Sistema de rudder do 737 (PCU servo valve jam reversal);
- Testes de control system e simulação;
- FDR/CVR analysis (FDR parameters limitados — sem rudder position recording);
- Análise de unusual-attitude training;
- Performance humana sob input de rudder uncommanded.

O slice A4R115 marca este evento como **HELD_OVERCLASSIFICATION_RISK** porque a estrutura factual do relatório está dominada por análise de aircraft control system, e o human performance analysis identificado no Table of Contents é secundário à inquérito técnico. Tratar como referência SERA humana sem boundary review técnico-vs-operador dedicada arriscaria atribuir P/O/A a um evento cujo driver primário foi mecânico/sistema.

**Tratamento metodológico**: este NÃO é tracker (tem evento real); NÃO é negative control (não há resposta canônica documentada como referência); É boundary case com dominância técnica que requer review autoral dedicada antes de qualquer attempt de trace draft. Marcado `TECHNICAL_DOMINANCE_BOUNDARY` e `NEEDS_AUTHOR_BOUNDARY_REVIEW`.

## 14. Source-grounded event sequence

| sequenceStep | phase | eventFact | actorOrSystem | sourceAnchor | confidence |
|---|---|---|---|---|---|
| 1 | Aproximação manobrando | Aeronave em virada para final em PIT | Crew + ATC | US427-E1 (353-365) | HIGH |
| 2 | Rudder uncommanded | Desvio de rudder súbito uncommanded (PCU servo issue) | Sistema PCU rudder | US427-E2 (372-374) | HIGH |
| 3 | Loss of control | Rolagem extrema seguida de descida quase vertical | Aeronave | US427-E1 | HIGH |
| 4 | Impacto | Impacto contra terreno; todos 132 ocupantes mortos | Aeronave + ambiente | US427-E1 | HIGH |

## 15. Human/technical boundary notes

- **Technical/environmental facts**: Boeing 737 Classic com PCU (Power Control Unit) do rudder de design susceptível a servo valve reversal jam em condições específicas; FDR limitado sem rudder position recording direto (limitação técnica de instrumentação); condições visuais nominais.
- **Human-observable actions**: response do crew a desvio uncommanded em janela de fração de segundo; ações específicas não totalmente reconstrutíveis sem rudder position data.
- **Human-inference cautions**: NÃO inferir falha de ação humana SERA a partir de falha do sistema de controle da aeronave; NÃO usar análise de unusual-attitude training como código SERA; o slice marca alto risco de overclassification — qualquer trace draft requer boundary review técnico-vs-operador formal e dedicado.
- **What must not be inferred yet**: TODO código SERA P/O/A; tratamento como referência SERA humana; qualquer adjudicação sem boundary review prévio.

## 16. Escape point context

A identificação de escape point humano para este evento é problemática: o "primeiro estado inseguro" foi a falha mecânica do PCU/rudder (capability), não uma ação humana. A janela entre rudder uncommanded e perda de controle terminal foi extremamente curta (fração de segundo a poucos segundos), e a response do crew foi response a evento técnico — não há "first departure" humana antecedente claramente identificável a partir do slice. Permanece em HOLD porque (a) tratamento como escape point humano riscaria overclassification, e (b) qualquer reframe como negative control de response humana requer fonte adicional (CVR/cockpit comm específico durante a janela) e análise dedicada técnica-vs-humana. Falta confirmar: decisão autoral sobre HOLD continuado vs reframe como negative control de response técnico. Risco principal: forçar código humano em evento dominantemente técnico.

## 17. Evidence sufficiency assessment

- narrativeSufficiency: SOURCE_PARTIAL_NEEDS_CAUTION (slice marca HELD_OVERCLASSIFICATION_RISK)
- sourceCompleteness: HIGH para tema técnico; LOW para análise SERA humana
- extractionConfidence: LOW (boundary técnico)
- missingForA4R181: boundary review formal técnico-vs-operador; decisão autoral sobre tratamento como HOLD continuado vs reframe limitado
- recommendedA4R181Handling: BATCH_D_TECHNICAL_DOMINANCE_BOUNDARY_REVIEW — NÃO adjudicar como referência SERA humana sem boundary review explícita.
