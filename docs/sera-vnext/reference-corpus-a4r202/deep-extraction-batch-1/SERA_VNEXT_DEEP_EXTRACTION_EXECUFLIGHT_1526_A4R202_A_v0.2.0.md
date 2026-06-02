# SERA vNext Deep Extraction - Execuflight 1526 - A4R202-A v0.2.0

## 1. Identification

- Candidate ID: C-016
- Event name: Execuflight Flight 1526
- Aircraft / operation: British Aerospace HS 125-700A / Part 135 on-demand charter
- Authority: NTSB
- Official report identifier: NTSB/AAR-16/03
- Extraction analyst: Codex GPT-5
- Extraction date: 2026-06-01
- Source-readiness status: source-ready inherited from A4R201-C
- Locator matrix row: C-016
- Readiness matrix row: C-016

## 2. Source locator

- Official page URL: none identified beyond direct report locator
- Official PDF URL: https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR1603.pdf
- Existing local source path: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt`
- Mirror URL, if any: none used
- Mirror role: not applicable
- Source confidence: HIGH
- Source limitations: no flight data recorder was installed; CVR quality was poor, so several flight-path values are radar-derived rather than FDR-derived
- Weak or wrong sources rejected: unrelated AAR-19/02 and non-official summaries
- Report sections/pages used: Executive Summary (local txt pp. 10-13); `1.1 History of Flight` (pp. 15-19); approach/stall reconstruction (pp. 54-57, 120)

## 3. Factual sequence timeline

| sequence_id | time_marker or phase_marker | actor | role | observed action/omission | communication/callout | warning/alert | aircraft state | procedural context | source page/section | confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EXE-01 | about 1427 to 1437 | crew | first officer PF, captain PM | captain, not PF, briefed the localizer 25 approach after first officer request; briefing was unstructured and incomplete and the approach checklist was not completed | first officer: "I'll let you brief it to me" | none | en route to AKR in IMC | approach preparation lacked shared structure | Executive Summary; `1.1` | HIGH |
| EXE-02 | about 1447 to localizer establishment | crew / ATC | PF, PM, ATC | controller cleared localizer 25 approach and instructed 3,000 ft until established; airplane was already established and could have descended to 2,300 ft, but remained level at 3,000 ft | approach clearance acknowledged | none | airplane on localizer, high and level | key descent opportunity not used | Executive Summary; `1.1` | HIGH |
| EXE-03 | before FAF | crew | first officer PF, captain PM | first officer slowed aircraft from about 150 to 125 kt; captain commented on decaying speed but did not take control | speed-related comments from captain | none | approach speed decayed below proper flaps-25 profile | high/slow state developing before FAF | Executive Summary | HIGH |
| EXE-04 | 1451:00.9 to 1451:13.6 | crew | PF, PM | first officer requested full flaps 45; captain began but did not complete the Landing checklist; power was reduced and descent began | "full flaps" and partial landing checklist | none | airplane left 3,000 ft with drag increased | nonprecision approach profile no longer matched company profile | `1.1`; approach analysis factual reconstruction | HIGH |
| EXE-05 | 1451:33, FAF crossing | crew | PF, PM | airplane crossed the FAF at about 2,700 ft msl and about 109 kt, roughly 400 ft above published crossing altitude | first officer: "alright we go to minimums" | none | high on approach and slow | normal 1,000 fpm descent no longer sufficient | Executive Summary; `1.1` | HIGH |
| EXE-06 | after FAF to MDA | crew | PF, PM | descent rate increased to about 2,000 fpm; captain told first officer not to descend so rapidly but did not take control or call missed approach | captain caution on descent rate | none | unstable high-drag descent continued | salvage-style descent inside FAF | Executive Summary; `1.1` | HIGH |
| EXE-07 | 1452:13 at MDA | crew | PF, PM | airplane reached MDA at about 113 kt and about 830 fpm with flaps 45; captain did not make required MDA callouts and did not call missed approach | captain later said "ground" and "keep going" | none | MDA crossed with low speed and improper configuration | stabilized approach gate explicitly failed | Executive Summary; `1.1` | HIGH |
| EXE-08 | 1452:27.3 to impact | crew | PF, PM | captain told first officer "okay level off guy"; stick shaker activated immediately, then GPWS `pull up` sounded, and impact followed about 7 seconds later | level-off instruction, then `pull up` | stick shaker; GPWS `pull up` | airplane entered stalled condition while trying to arrest descent | downstream upset after continued unstable approach | `1.1`; transcript and reconstruction | HIGH |

## 4. Candidate escape point, not final

- Candidate escape-point statement using "quando...": quando a aeronave permaneceu alta a 3,000 ft já estabelecida no localizer e depois prosseguiu para o FAF alta, lenta e com flaps 45, sem takeover do capitão nem arremetida, transformando a aproximação em uma descida de salvação.
- Immediate factual condition at that candidate point: não havia entendimento compartilhado robusto da condução da aproximação, a aeronave já estava fora do perfil antes do FAF, e a configuração com flaps 45 agravou drag e margem de energia.
- Evidence supporting the candidate point: briefing incompleto, permanência indevida em 3,000 ft, redução para 125 kt, solicitação de flaps 45 antes do FAF, FAF cruzado 400 ft alto e 109 kt, capitão não assumiu controle.
- Evidence against the candidate point: a later candidate exists at the MDA where procedures explicitly required stabilization and likely missed approach; the captain's immediate "level off" instruction is also a strong late candidate.
- Uncertainty: moderate between "pre-FAF unstable setup and nonintervention" and "MDA continuation without missed approach".
- Alternative candidate points: failure to descend from 3,000 ft once established; passing the MDA with 113 kt, 45 degree flaps, and continued descent.
- Post-escape consequence quarantine: stall onset during level-off attempt, GPWS warning, building impact, fire, and fatalities remain downstream.

## 5. Actor mapping

| actor_role | candidate_actor | evidence | source page/section | confidence | agent_migration_risk |
| --- | --- | --- | --- | --- | --- |
| direct actor candidate | crew-integrated flight crew with first officer flying and captain retaining command authority | first officer manipulated profile and speed; captain briefed, monitored, and did not take control despite unstable state | Executive Summary; `1.1` | HIGH | MEDIUM |
| pilot flying | first officer | flew contrary-to-profile approach, requested flaps 45, allowed low speed/high descent | Executive Summary; `1.1` | HIGH | LOW |
| pilot monitoring / command actor | captain | briefed approach, noted speed/decent issues, but did not take control or command missed approach until too late | Executive Summary; `1.1` | HIGH | LOW |
| supporting/context actor | operator SOP/training | informal practice and weak nonprecision profile shaped context but did not directly fly the airplane | factual context sections | MEDIUM | HIGH |
| downstream actor | ATC | sequencing/speed context mattered but did not create the late unstable descent by itself | `1.1` | MEDIUM | HIGH |

## 6. Human-analysis evidence collection

| evidence_lane | factual evidence | source page/section | uncertainty | notes |
| --- | --- | --- | --- | --- |
| perception-relevant facts | captain observed decaying speed and excessive descent but did not convert this into takeover/missed approach; crew lacked shared understanding from the briefing stage | Executive Summary; `1.1` | MEDIUM | strong crew-monitoring and shared-model material |
| objective/goal-relevant facts | intended task was localizer 25 nonprecision approach to MDA 1,540 ft with proper profile and landing-assured logic; actual conduct diverged | `1.1`; chart description | LOW | objective lane is clear |
| action-relevant facts | high localizer intercept, flaps 45 before FAF, 2,000 fpm descent, no MDA callouts, late level-off command | Executive Summary; `1.1`; transcript | LOW | strong action chain |
| precondition-relevant facts | no FDR, poor CVR quality, informal captain-PF norm reversed, incomplete briefing and checklist | Executive Summary; `1.1`; source note | LOW-MEDIUM | rich context but not causal answer |
| source limitations | radar-derived rather than FDR-derived path estimates; some cockpit timing depends on poor-quality CVR | source note | LOW | documented and non-blocking |

## 7. Quarantine of original report analysis

| report analysis/conclusion | source page/section | why quarantined | may inform factual context? |
| --- | --- | --- | --- |
| probable cause and contributory factors about SOP noncompliance, oversight, and safety culture | report conclusion section | official causal answer cannot become SERA expected value | yes |
| policy discussion on SMS, FDM, and CDFA | Executive Summary / analysis | organizational recommendations are not direct event facts | yes |

## 8. Bias and sufficiency filters

| filter | check | result | notes |
| --- | --- | --- | --- |
| outcome bias | Is the candidate point selected because the outcome was severe? | PASS | candidate anchored before stall and impact sequence |
| agent migration | Is the analysis drifting from the direct actor to a context actor? | WATCH | operator culture and FAA oversight are strong context attractors |
| technical dominance | Is a technical condition displacing the human action/condition being evaluated? | PASS | event remains centered on path/energy management and intervention |
| source sufficiency | Are factual anchors adequate for detailed extraction? | HIGH | despite no FDR, the event sequence is sufficiently documented for human-analysis prep |
| source contamination | Is any weak, mirror-only, or wrong-event source influencing the evidence? | NO | only official NTSB report used |
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
