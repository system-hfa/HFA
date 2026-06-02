# SERA vNext Deep Extraction - G-WNSB Sumburgh - A4R202-A v0.2.0

## 1. Identification

- Candidate ID: C-007
- Event name: G-WNSB Sumburgh helicopter accident
- Aircraft / operation: Eurocopter AS332 L2 Super Puma / offshore passenger transport
- Authority: AAIB UK
- Official report identifier: Air Accident Report 1/2016
- Extraction analyst: Codex GPT-5
- Extraction date: 2026-06-01
- Source-readiness status: source-ready inherited from A4R201-C
- Locator matrix row: C-007
- Readiness matrix row: C-007

## 2. Source locator

- Official page URL: https://www.gov.uk/aaib-reports/aircraft-accident-report-aar-1-2016-g-wnsb-23-august-2013
- Official PDF URL: https://assets.publishing.service.gov.uk/media/56e7eaeaed915d0379000023/AAR_1-2016_G-WNSB.pdf
- Existing local source path: `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-21__2016__AAIB-UK__Eurocopter-AS332-L2-Super-Puma__Eurocopter-AS332-L2-Super-Puma-G-WNSB-Sumbu.txt`
- Mirror URL, if any: none used
- Mirror role: not applicable
- Source confidence: HIGH
- Source limitations: the repo contained only the official GOV.UK page capture locally; full AAIB PDF had to be consulted through direct official locator and temporary off-corpus staging for this extraction
- Weak or wrong sources rejected: polluted legacy publishing-service suffixes and non-official retellings
- Report sections/pages used: local GOV.UK summary page; AAIB PDF Synopsis (pp. 1-3), `1.1.4 Accident sector` (pp. 15-20), and independent HF appendices H/I (pp. 235-244)

## 3. Factual sequence timeline

| sequence_id | time_marker or phase_marker | actor | role | observed action/omission | communication/callout | warning/alert | aircraft state | procedural context | source page/section | confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GWN-01 | pre-accident sector planning | crew | commander PF, co-pilot PNF | after an extra passenger request, crew accepted a refuel-via-Sumburgh plan instead of direct return to Aberdeen | crew discussed route and weather implications | none | fuel plan changed and weather was already deteriorating | operational replanning before accident sector | AAIB PDF `1.1.4` | HIGH |
| GWN-02 | 1625 ATIS W and later weather updates | crew / ATC | crew, ATC | crew received Sumburgh weather near minima, then worsening to visibility 2,800 m with cloud down to 200/300 ft | crew commented conditions were close to or on minima | none | approach expected to be LOC DME RWY09 with MDA 300 ft | deteriorating destination weather before localizer capture | AAIB PDF `1.1.4` | HIGH |
| GWN-03 | approach briefing before final segment | crew | commander PF, co-pilot PNF | commander briefed a constant-angle nonprecision approach, 500 fpm descent, 80 kt in latter stages, AVAD bugs at 300 ft, and handover to co-pilot only after visual references | approach brief and possible two attempts before diversion | none | approach intended in 3-axes / V/S with manual airspeed control | instrument approach brief in IMC | AAIB PDF `1.1.4` | HIGH |
| GWN-04 | just before localizer capture | commander | PF | IAS mode was disengaged, returning autopilot to 3-axes with V/S; commander manually controlled airspeed via collective | none material | none | helicopter level near 2,100 ft on heading to localizer | automation configuration simplified vertical path but left airspeed manual | AAIB PDF `1.1.4` | HIGH |
| GWN-05 | 1715 cleared to land | crew | PF, PNF | shortly after landing clearance, commander reduced collective; torque stabilized near 18 percent and airspeed began decreasing about 1 kt per second | co-pilot gave range/height cross-checks | none | final approach inside 3 nm with speed beginning to decay | late final on nonprecision approach | AAIB PDF `1.1.4` | HIGH |
| GWN-06 | 3 nm to 2.4 nm DME | crew | PF, PNF | co-pilot called profile about 30 ft low at 3 nm and later "good at 2 nm"; commander noted airspeed at briefed 80 kt and increased torque to about 24 percent | range/height callouts continued | none | airspeed reached 80 kt, then decayed below target without observed correction | profile monitoring and energy management diverged | AAIB PDF `1.1.4`; Appendix I | HIGH |
| GWN-07 | about 1 nm and 100 ft above minima | crew | PF, PNF | co-pilot called one hundred feet above minima; commander acknowledged but collective input did not materially change as airspeed kept decaying | "100 to go" and further cross-checks | none | helicopter approached 300 ft with low and worsening energy state | final monitoring split between instruments and visual search | AAIB PDF `1.1.4`; Appendix I | HIGH |
| GWN-08 | 300 ft MDA to impact | crew | PF, PNF | AVAD `check height` sounded at 300 ft; airspeed was about 40 kt and ROD about 600 fpm, with no effective level-off; late warning to watch airspeed and late collective increase followed | commander acknowledged AVAD; later exclamation and recovery attempt | AVAD `check height` | low-energy state deepened, then descent rate rose to about 1,800 fpm before sea impact | MDA reached without visual handover or stable energy recovery | AAIB PDF `1.1.4`; Appendices H/I | HIGH |

## 4. Candidate escape point, not final

- Candidate escape-point statement using "quando...": quando a aproximação em `3-axes` com `V/S` prosseguiu abaixo do alvo de 80 kt sem correção efetiva de collective, enquanto a tripulação seguia para a MDA com atenção dividida entre perfil instrumental e busca de referências visuais.
- Immediate factual condition at that candidate point: o perfil vertical ainda parecia aceitável pelos cross-checks de altura, mas a energia estava se degradando silenciosamente e o controle de velocidade já dependia de inputs manuais finos que não bastaram.
- Evidence supporting the candidate point: airspeed reached 80 kt near 2.4 nm, torque increase was insufficient, airspeed then reduced steadily to below 30-40 kt, and no effective level-off occurred at 300 ft.
- Evidence against the candidate point: an earlier candidate exists in the decision to continue the nonprecision approach in worsening weather with 3-axes/V/S mode; a later candidate exists at the failure to level at MDA without visual references.
- Uncertainty: moderate because the official report also documents an expectation of becoming visual and split monitoring tasks, which may shift the candidate point earlier or later.
- Alternative candidate points: continuation of the approach after deteriorating weather reports; no level-off action when 100 ft above minima and again at the 300 ft AVAD call.
- Post-escape consequence quarantine: the late airspeed warning, recovery attempt, sea impact, inversion, and survivability issues remain downstream.

## 5. Actor mapping

| actor_role | candidate_actor | evidence | source page/section | confidence | agent_migration_risk |
| --- | --- | --- | --- | --- | --- |
| direct actor candidate | crew-integrated helicopter crew with commander immediate control input | commander controlled collective and approach energy; co-pilot monitored profile and searched outside, limiting cross-check capacity | AAIB PDF `1.1.4`; Appendices H/I | HIGH | MEDIUM |
| pilot flying | commander | selected approach style, manually controlled airspeed in V/S mode, and made late recovery input | AAIB PDF `1.1.4` | HIGH | LOW |
| pilot monitoring | co-pilot / PNF | provided range-height calls and sought visual references but did not arrest energy decay through challenge or takeover | AAIB PDF `1.1.4`; Appendix I | HIGH | LOW |
| supporting/context actor | operator SOP / approach design | SOP required PNF instrument monitoring plus visual search and used a 300 ft handover concept | AAIB PDF summary and appendices | MEDIUM | HIGH |
| downstream actor | ATC / weather | weather updates and landing clearance shaped conditions but did not directly control the low-energy descent | `1.1.4` | MEDIUM | HIGH |

## 6. Human-analysis evidence collection

| evidence_lane | factual evidence | source page/section | uncertainty | notes |
| --- | --- | --- | --- | --- |
| perception-relevant facts | airspeed decay went unnoticed until very late; co-pilot attention was divided between instrument cross-checks and outside visual search | Summary; `1.1.4`; Appendix I | MEDIUM | strong monitoring-attention material without classification |
| objective/goal-relevant facts | crew planned to fly constant-angle LOC DME approach to 300 ft and hand over for landing once visual | `1.1.4` | LOW | clear stated operational objective |
| action-relevant facts | IAS mode dropped out, V/S remained, collective changes were insufficient, no effective MDA level-off occurred, late recovery input followed | Summary; `1.1.4` | LOW | strong late-action trace |
| precondition-relevant facts | weather near minima, manual speed control required in 3-axes V/S mode, SOP burdened the co-pilot with dual monitoring/visual tasks | Summary; `1.1.4`; appendices | LOW-MEDIUM | rich precondition lane |
| source limitations | full PDF was not versioned in repo and had to be consulted from official locator; page-capture text in repo was only a summary page | source note | LOW | documented and non-blocking |

## 7. Quarantine of original report analysis

| report analysis/conclusion | source page/section | why quarantined | may inform factual context? |
| --- | --- | --- | --- |
| AAIB causal and contributory factor bullets | summary and conclusions | official causal framing cannot become SERA expected value | yes |
| independent HF specialist interpretations about expectation, vigilance, and SOP design | appendices H/I | specialist interpretation informs context but is not raw event fact | yes |

## 8. Bias and sufficiency filters

| filter | check | result | notes |
| --- | --- | --- | --- |
| outcome bias | Is the candidate point selected because the outcome was severe? | PASS | candidate anchored before the sea strike and survivability chain |
| agent migration | Is the analysis drifting from the direct actor to a context actor? | WATCH | SOP, weather, and operator design are strong context actors |
| technical dominance | Is a technical condition displacing the human action/condition being evaluated? | WATCH | automation mode matters, but human energy monitoring remains central |
| source sufficiency | Are factual anchors adequate for detailed extraction? | HIGH | official PDF plus summary and appendices provide adequate anchors |
| source contamination | Is any weak, mirror-only, or wrong-event source influencing the evidence? | NO | only official GOV.UK/AAIB material used |
| Daumas note | Is Daumas used only as human-methodology depth context and never as event fact? | YES | no Daumas factual use |

## 9. Blocked outputs

- POA final classification created: NO
- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
- fixture/baseline/product promotion: BLOCKED
- synthetic-real blending: NO
- Daumas used as factual source: NO
