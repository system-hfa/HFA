# SERA vNext Deep Extraction - Comair 5191 - A4R202-A v0.2.0

## 1. Identification

- Candidate ID: C-020
- Event name: Comair Flight 5191
- Aircraft / operation: Bombardier CL-600-2B19 / Part 121 regional passenger
- Authority: NTSB
- Official report identifier: NTSB/AAR-07/05
- Extraction analyst: Codex GPT-5
- Extraction date: 2026-06-01
- Source-readiness status: source-ready inherited from A4R201-C
- Locator matrix row: C-020
- Readiness matrix row: C-020

## 2. Source locator

- Official page URL: none identified beyond direct report locator
- Official PDF URL: https://www.ntsb.gov/investigations/accidentreports/reports/aar0705.pdf
- Existing local source path: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/6__2007__NTSB-USA__CRJ-100__Attempted-Takeoff-From-Wrong-Runway-Comair-F.txt`
- Mirror URL, if any: none used
- Mirror role: not applicable
- Source confidence: HIGH
- Source limitations: first officer memory recall was unavailable postaccident; crew cognition must be inferred from CVR/FDR, airport layout, and demonstration evidence
- Weak or wrong sources rejected: generic docket summaries and non-official retellings
- Report sections/pages used: Executive Summary and `1.1 History of Flight` (local txt pp. 12-17); airport/signage factual sections (pp. 29-39); taxi/tower observations and sterile cockpit sections (pp. 70-80)

## 3. Factual sequence timeline

| sequence_id | time_marker or phase_marker | actor | role | observed action/omission | communication/callout | warning/alert | aircraft state | procedural context | source page/section | confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| COM-01 | 0602:01 to 0602:17 | flight crew / tower | captain taxiing, first officer radios, tower | controller instructed the crew to taxi to runway 22; this clearance also authorized crossing runway 26 | first officer read back "taxi two two" | none | airplane began taxi on simple taxiway-A route | taxi to assigned departure runway | `1.1`, local txt p. 15 | HIGH |
| COM-02 | 0603:16 to 0603:56 | crew | captain, first officer | crew engaged in nonpertinent conversation while taxiing | nonessential discussion unrelated to taxi | none | taxi continued during critical ground phase | sterile cockpit should have applied during taxi | `1.1`; taxi analysis factual summary | HIGH |
| COM-03 | about 0604:01 | first officer | first officer | first officer began before takeoff checklist and again indicated the flight would depart runway 22 | checklist items referenced runway 22 | none | taxi ongoing toward intersection area | pre-takeoff cross-check opportunity existed | `1.1`, local txt p. 15 | HIGH |
| COM-04 | 0604:33 | crew | captain, first officer | airplane stopped at the runway 26 hold short line, about 560 ft short of runway 22 hold short line | public-address welcome and before takeoff checklist completion followed | none | airplane stationary on taxiway A at runway 26 hold short | crew had paused at wrong stopping point | `1.1`; airport layout sections | HIGH |
| COM-05 | 0605:15 to 0605:18 | first officer and tower | first officer, tower | while still at runway 26 hold short, first officer advised tower the flight was ready to depart and received takeoff clearance; runway number was not stated in that exchange | tower issued heading and takeoff clearance | none | airplane still not on runway 22 | takeoff clearance accepted under incorrect location assumption | `1.1`, local txt pp. 15-16 | HIGH |
| COM-06 | 0605:24 to 0605:46 | crew | captain taxiing, first officer monitoring | captain crossed the runway 26 hold short line and the airplane began turning onto runway 26; lineup checklist was completed | captain called lineup checklist; first officer called it complete | none | airplane aligned on runway 26, not runway 22 | positive position verification opportunity missed | `1.1`, local txt pp. 16-17 | HIGH |
| COM-07 | 0605:58 onward | crew | captain then first officer | captain transferred control to the first officer for takeoff after lineup on runway 26 | captain: "all yours" | none | takeoff roll started on shorter, unlit runway 26 | runway-heading/position cross-check absent | `1.1`, local txt p. 16 | HIGH |
| COM-08 | 0606:35 | crew | captain, first officer | airplane overran runway 26 and impacted fence, trees, and terrain | no corrective recognition in time | none | insufficient runway remaining for safe departure | downstream consequence after wrong-runway alignment | Executive Summary; `1.1` | HIGH |

## 4. Candidate escape point, not final

- Candidate escape-point statement using "quando...": quando a tripulação cruzou a hold short line da pista 26 e alinhou a aeronave na pista 26 sem uma verificação positiva de posição e heading em relação à pista 22 autorizada.
- Immediate factual condition at that candidate point: a aeronave estava parada no ponto de espera errado, a tripulação acreditava estar pronta para a pista 22, e a autorização de decolagem foi recebida sem que houvesse confirmação ativa da posição real.
- Evidence supporting the candidate point: FDR shows stop at runway 26 hold short, crossing of that hold short line at 0605:24, turn onto runway 26 at about 0605:41, and lineup checklist completion there.
- Evidence against the candidate point: an earlier candidate exists during the stop at the runway 26 hold short line when the mismatch could still have been detected; a context candidate exists in the takeoff-clearance exchange without runway number.
- Uncertainty: low to moderate; the alignment on runway 26 is strongly documented, but the exact last missed cue before crossing the hold line remains uncertain.
- Alternative candidate points: failure to detect that the stop point was runway 26 hold short; acceptance of takeoff clearance while still short of runway 22.
- Post-escape consequence quarantine: takeoff roll, runway overrun, impact, fatalities, and airport-construction debate remain downstream.

## 5. Actor mapping

| actor_role | candidate_actor | evidence | source page/section | confidence | agent_migration_risk |
| --- | --- | --- | --- | --- | --- |
| direct actor candidate | crew-integrated flight crew | captain physically taxied and aligned the aircraft; first officer handled checklists/radio and did not stop the lineup error | Executive Summary; `1.1` | HIGH | MEDIUM |
| pilot flying / taxiing actor | captain | captain taxied, crossed runway 26 hold short, and lined up on runway 26 | `1.1` | HIGH | LOW |
| monitoring/radio actor | first officer | performed checklist items referencing runway 22, made ready-for-departure call, and completed lineup checklist without position correction | `1.1` | HIGH | LOW |
| supporting/context actor | tower controller | issued taxi and takeoff clearances and did not detect wrong-runway lineup before departure roll | ATC sections | MEDIUM | HIGH |
| downstream actor | airport signage / construction context | interim charting, runway-lighting differences, and construction were context cues but not substitute actors | airport factual sections | MEDIUM | HIGH |

## 6. Human-analysis evidence collection

| evidence_lane | factual evidence | source page/section | uncertainty | notes |
| --- | --- | --- | --- | --- |
| perception-relevant facts | crew stopped at runway 26 hold short line yet continued as if at runway 22; runway 26 was unlit while runway 22 was lit | `1.1`; airport layout and demonstrations | MEDIUM | cue use and cue weighting are central for later human analysis |
| objective/goal-relevant facts | intended task was taxi to runway 22 and depart there; checklist and heading bug planning referenced runway 22 | `1.1` | LOW | objective is unusually clear |
| action-relevant facts | captain crossed wrong hold line and turned onto runway 26; first officer requested departure and completed lineup checklist there | `1.1` | LOW | direct action sequence is strong |
| precondition-relevant facts | taxi route was simple but the airport was in an interim construction/layout state; nonpertinent cockpit conversation occurred during taxi | `1.1`; airport context; sterile cockpit section | LOW-MEDIUM | context rich but still factual |
| source limitations | first officer postaccident interview was unavailable; subjective cue interpretation depends on reconstruction | source note | LOW | non-blocking |

## 7. Quarantine of original report analysis

| report analysis/conclusion | source page/section | why quarantined | may inform factual context? |
| --- | --- | --- | --- |
| probable cause language on failure to use cues and aids, and failure to cross-check runway position | report conclusion section | NTSB conclusion cannot become SERA expected value | yes |
| discussion of construction, ATC procedure, and runway lighting as contributing context | analysis sections | contextual interpretation must not replace factual extraction | yes |

## 8. Bias and sufficiency filters

| filter | check | result | notes |
| --- | --- | --- | --- |
| outcome bias | Is the candidate point selected because the outcome was severe? | PASS | candidate anchored at runway-entry point, before acceleration and overrun |
| agent migration | Is the analysis drifting from the direct actor to a context actor? | WATCH | ATC and airport construction are meaningful but secondary |
| technical dominance | Is a technical condition displacing the human action/condition being evaluated? | PASS | this event is primarily surface-navigation and verification work |
| source sufficiency | Are factual anchors adequate for detailed extraction? | HIGH | taxi, checklist, and runway-entry timing are well documented |
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
