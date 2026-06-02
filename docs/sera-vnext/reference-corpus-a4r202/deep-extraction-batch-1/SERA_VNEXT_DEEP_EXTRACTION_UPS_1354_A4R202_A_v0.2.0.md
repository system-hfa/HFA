# SERA vNext Deep Extraction - UPS 1354 - A4R202-A v0.2.0

## 1. Identification

- Candidate ID: C-003
- Event name: UPS Airlines Flight 1354
- Aircraft / operation: Airbus A300-600F / Part 121 cargo
- Authority: NTSB
- Official report identifier: NTSB/AAR-14/02
- Extraction analyst: Codex GPT-5
- Extraction date: 2026-06-01
- Source-readiness status: source-ready inherited from A4R201-C
- Locator matrix row: C-003
- Readiness matrix row: C-003

## 2. Source locator

- Official page URL: none identified beyond direct report locator
- Official PDF URL: https://www.ntsb.gov/investigations/accidentreports/reports/aar1402.pdf
- Existing local source path: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/3__2014__NTSB-USA__Airbus-A300-600F__Crash-During-Nighttime-Nonprecision-Approach.txt`
- Mirror URL, if any: none used
- Mirror role: not applicable
- Source confidence: HIGH
- Source limitations: exact CDU/FMC key sequence is reconstructed from downloaded avionics data rather than direct crew video; runway-visual acquisition timing is late and terrain-obscured
- Weak or wrong sources rejected: non-official summaries and generic weather/fatigue retellings
- Report sections/pages used: Executive Summary (local txt pp. 14-15); `1.1 History of Flight` (local txt pp. 22-29); EGPWS/system context and transcript excerpts (local txt pp. 41-42, 130-133)

## 3. Factual sequence timeline

| sequence_id | time_marker or phase_marker | actor | role | observed action/omission | communication/callout | warning/alert | aircraft state | procedural context | source page/section | confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UPS-01 | 0442:05, approach vector | crew and ATC | captain PF, first officer PM, ATC | controller vectored flight to join localizer and maintain 3,000 ft; PM was expected to resequence FMC for approach waypoints | cockpit discussion focused on being kept high | none | joining localizer for runway 18 | setup for profile/VNAV style nonprecision approach | `1.1`, local txt pp. 22-23 | HIGH |
| UPS-02 | 0443:24, approach clearance | crew | PF, PM | flight was cleared for the localizer 18 approach while FMC still remained on direct course to KBHM rather than correct approach fix sequence | approach clearance acknowledged | none | airplane descending but approach sequencing remained incorrect | automation setup not aligned with intended profile path | `1.1`, local txt p. 23 | HIGH |
| UPS-03 | about 9 nm from runway | crew | PF, PM | once established on the localizer, airplane leveled at 2,500 ft msl even though it could have descended to 2,300 ft | no corrective resequence achieved | none | airplane laterally aligned with runway 18, still high for approach path | approach already deviating from planned profile capture | `1.1`, local txt pp. 23-24 | HIGH |
| UPS-04 | nearing BASKN FAF | PF and PM | captain PF, first officer PM | first officer completed Before Landing checklist; captain changed autopilot from profile to vertical speed without briefing the first officer | later captain said, "Yeah I'm gonna do vertical speed" | none | airplane about 200 ft high at FAF, did not capture profile glidepath | method changed from briefed profile approach to step-down style descent | `1.1`, local txt pp. 24-25 | HIGH |
| UPS-05 | 0446:24.7 to 0446:29.6 | crew | PF, PM | first officer noticed V/S mode; captain increased descent rate to 1,500 fpm | FO queried V/S; captain responded he would do vertical speed because ATC kept them high | none | airplane continued descending rapidly toward IMTOY | unbriefed high-rate descent inside FAF | `1.1`, local txt p. 25 | HIGH |
| UPS-06 | 0447:03 | crew | PF, PM | first officer made 1,000 ft above airport elevation callout; captain stated "DA is twelve hundred" but maintained 1,500 fpm | "there's a thousand feet" / "DA is twelve hundred" | none | still descending rapidly toward minimums | stabilized approach gate already tightening | `1.1`, local txt p. 25 | HIGH |
| UPS-07 | 0447:10.9 to 0447:19.6 | crew | PF, PM | airplane passed IMTOY and continued below desired glidepath and through the 1,200 ft minimum descent altitude without required approach-minimum callouts or level-off | captain: "two miles"; first officer made nonstandard "actual" remark | none | 1,500 fpm continued through MDA | minimum descent altitude not respected | `1.1`, local txt pp. 25-26 | HIGH |
| UPS-08 | 0447:24.5 to impact | crew | PF, PM | EGPWS "sink rate" caution sounded at about 250 ft agl; captain reduced vertical speed, reported runway in sight 3.5 seconds later, disconnected autopilot, and the airplane then struck trees short of runway | runway-in-sight calls after alert | EGPWS `sink rate`, then `too low terrain` | about 1,000 ft msl, about 250 ft agl, descending from about 1,500 fpm | late terrain/height awareness and continued descent short of runway | `1.1`; EGPWS sections; transcript | HIGH |

## 4. Candidate escape point, not final

- Candidate escape-point statement using "quando...": quando a aproximação continuou com o FMC não resequenciado e o capitão migrou para `vertical speed` sem briefing compartilhado, mantendo descida de 1,500 fpm até e através da MDA sem level-off eficaz.
- Immediate factual condition at that candidate point: a aeronave já estava alta no FAF, não havia guidance vertical válido do profile mode, e a tripulação passou a depender de um "dive and drive" tardio sem coordenação explícita de método.
- Evidence supporting the candidate point: flight plan still direct-to-KBHM, V/S substituted for profile mode, first officer had to discover the mode change, captain kept 1,500 fpm after 1,000 ft callout and through MDA.
- Evidence against the candidate point: an earlier candidate exists at the missed FMC resequence/setup stage before localizer establishment; a later candidate exists at the failure to stop descent at MDA.
- Uncertainty: moderate between "automation/setup escape" and "MDA descent continuation" as earliest operational escape.
- Alternative candidate points: remaining level at 2,500 ft when descent to 2,300 ft was available; passing MDA without required callouts or level-off.
- Post-escape consequence quarantine: sink-rate alert response, late runway acquisition, tree strikes, and wreckage path remain downstream effects.

## 5. Actor mapping

| actor_role | candidate_actor | evidence | source page/section | confidence | agent_migration_risk |
| --- | --- | --- | --- | --- | --- |
| direct actor candidate | crew-integrated flight crew with captain immediate flight-path control | captain selected and commanded V/S descent; first officer did not convert monitoring into minimums protection | Executive Summary; `1.1` | HIGH | MEDIUM |
| pilot flying | captain | profile-to-V/S change, 1,500 fpm command, no level-off at MDA, late response to sink-rate alert | `1.1` | HIGH | LOW |
| pilot monitoring | first officer | FMC sequencing expected, Before Landing checklist completion, limited challenge/callout performance near minimums | `1.1`; transcript | HIGH | LOW |
| supporting/context actor | dispatcher / ATC | weather/dispatched approach context and vectors shaped setup but did not directly control late descent | factual context sections | MEDIUM | HIGH |
| downstream actor | EGPWS | alerting occurred only very late and after descent already exceeded stable criteria | EGPWS section | MEDIUM | HIGH |

## 6. Human-analysis evidence collection

| evidence_lane | factual evidence | source page/section | uncertainty | notes |
| --- | --- | --- | --- | --- |
| perception-relevant facts | crew did not appear to recognize that the displayed glidepath information was meaningless after failed resequence; minimums awareness degraded until sink-rate alert | Executive Summary; `1.1` | MEDIUM | perception lane likely involves automation-state and altitude-state interpretation |
| objective/goal-relevant facts | initial plan was a profile approach to DA/MDA 1,200 ft; captain switched to V/S because crew perceived they had been kept high | `1.1`; approach chart description | LOW | shows goal shift from briefed method to late recovery method |
| action-relevant facts | V/S selected and increased to 1,500 fpm, no MDA level-off, moderate alert response instead of discontinuing approach | Executive Summary; `1.1`; EGPWS sections | LOW | strong action trace |
| precondition-relevant facts | nighttime nonprecision approach, only approach available to runway 18, automation setup required proper FMC resequence, alert callouts not activated | `1.1`; systems sections | LOW-MEDIUM | factual context, not causal assignment |
| source limitations | exact FMC keying sequence inferred from avionics review; no direct visual proof of outside scan timing | source note | LOW | non-blocking |

## 7. Quarantine of original report analysis

| report analysis/conclusion | source page/section | why quarantined | may inform factual context? |
| --- | --- | --- | --- |
| probable cause and contributing factors involving approach method, fatigue, communication, and oversight | report conclusion section | NTSB conclusion cannot become SERA expected value | yes |
| safety issue framing around CDFA, callouts, and EGPWS response | Executive Summary; analysis | operational improvement framing is not direct accident fact | yes |

## 8. Bias and sufficiency filters

| filter | check | result | notes |
| --- | --- | --- | --- |
| outcome bias | Is the candidate point selected because the outcome was severe? | PASS | candidate anchored before sink-rate alert and terrain strike |
| agent migration | Is the analysis drifting from the direct actor to a context actor? | WATCH | ATC vectors and dispatch context are relevant but secondary |
| technical dominance | Is a technical condition displacing the human action/condition being evaluated? | WATCH | FMC/profile logic matters, but late descent management remains human-action lane |
| source sufficiency | Are factual anchors adequate for detailed extraction? | HIGH | approach sequence, callouts, alert timing, and path data are strong |
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
