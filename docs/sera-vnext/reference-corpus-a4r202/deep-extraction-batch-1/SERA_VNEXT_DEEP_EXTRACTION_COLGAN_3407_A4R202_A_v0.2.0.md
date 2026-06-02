# SERA vNext Deep Extraction - Colgan 3407 - A4R202-A v0.2.0

## 1. Identification

- Candidate ID: C-001
- Event name: Colgan Air Flight 3407
- Aircraft / operation: Bombardier DHC-8-402 Q400 / Part 121 regional passenger
- Authority: NTSB
- Official report identifier: NTSB/AAR-10/01
- Extraction analyst: Codex GPT-5
- Extraction date: 2026-06-01
- Source-readiness status: source-ready inherited from A4R201-C
- Locator matrix row: C-001
- Readiness matrix row: C-001

## 2. Source locator

- Official page URL: none identified beyond direct report locator
- Official PDF URL: https://www.ntsb.gov/investigations/accidentreports/reports/aar1001.pdf
- Existing local source path: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/1__2010__NTSB-USA__DHC-8-402-Q400__Loss-of-Control-on-Approach-Colgan-Air-Conti.txt`
- Mirror URL, if any: none used
- Mirror role: not applicable
- Source confidence: HIGH
- Source limitations: key airspeed-versus-ref-speed relationships were reconstructed from FDR calculations rather than live crew callouts; first officer recollection is unavailable
- Weak or wrong sources rejected: secondary summaries and analogy-based retellings
- Report sections/pages used: Executive Summary and `1.1 History of Flight` (local txt pp. 14-19); systems and ref-speeds sections (pp. 30-32, 44); CVR transcript excerpt (p. 148)

## 3. Factual sequence timeline

| sequence_id | time_marker or phase_marker | actor | role | observed action/omission | communication/callout | warning/alert | aircraft state | procedural context | source page/section | confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| COL-01 | 2153:40 | first officer and captain | first officer monitoring, captain PF | first officer briefed flaps-15 landing speeds of 118 kt Vref and 114 kt Vga; captain acknowledged | landing-speed brief for flaps 15 | none | approach planning in progress | landing speed planning before sterile cockpit phase | `1.1`, local txt p. 14 | HIGH |
| COL-02 | 2206:37 and after | crew | captain, first officer | airplane descended through 10,000 ft and sterile cockpit discipline should have applied | none essential beyond approach brief continuation | none | arrival and approach phase | critical phase of flight started | `1.1`, local txt p. 14 | HIGH |
| COL-03 | about 2216:06 to 2216:21 | crew | captain PF, first officer PM | landing gear was selected down; propeller condition levers moved to maximum RPM; autopilot applied nose-up trim; first officer reported gear down | gear-down call | none | about 145 kt when gear down confirmed | airplane configuring on final while autopilot remained engaged | `1.1`, local txt pp. 17-18 | HIGH |
| COL-04 | about 2216:21 to 2216:26 | crew | captain, first officer | `ice detected` message appeared; captain called for flaps 15 and before landing checklist; flap handle moved first to 10 degree detent at about 135 kt | "flaps fifteen before landing checklist" | `ice detected` message visible | airspeed about 135 kt | landing configuration change with icing-related cue present | `1.1`; transcript | HIGH |
| COL-05 | 2216:27.4 | crew | captain PF, first officer PM | stick shaker activated and autopilot disconnected automatically | stick shaker audible on CVR | stick shaker | airspeed about 131 kt at autopilot disconnect | stall warning onset during autopilot-coupled approach | `1.1`, local txt pp. 18-19 | HIGH |
| COL-06 | 2216:27.8 to seconds after | captain | PF | captain pulled aft on the control column and advanced power after stick shaker onset | none immediately diagnostic | stick shaker continued | AOA and pitch increased instead of unloading wing | immediate post-warning control input sequence | `1.1`; FDR-derived sections | HIGH |
| COL-07 | seconds before warning, derived evidence | airplane / crew state | crew-integrated | FDR comparison showed airspeed had been below minimum icing approach speed for about 8 seconds before stick shaker activation | no explicit crew callout captured for the low-speed trend | low-speed cue available before warning | actual airspeed below flaps-15 icing schedule before shaker onset | pre-warning energy state evidence | ref-speeds comparison section, local txt p. 44 | MEDIUM-HIGH |
| COL-08 | 2216:42 to impact | crew | captain, first officer | airplane rolled and pitched into upset; first officer asked about gear; captain ordered gear up during loss of control | first officer asked whether to put gear up; captain said "gear up" | continued stall sequence | severe roll/pitch excursion developed and impact followed | downstream upset after earlier escape candidates | `1.1`, local txt p. 19 | HIGH |

## 4. Candidate escape point, not final

- Candidate escape-point statement using "quando...": quando a aeronave entrou abaixo da speed schedule aplicavel em icing, sem correção integrada antes do stick shaker, durante a configuração final com autopilot ainda engajado.
- Immediate factual condition at that candidate point: a aeronave já estava em tendência de baixa energia, havia `ice detected`, o ref-speeds context importava, e a tripulação não interrompeu a aproximação nem recuperou a margem antes do warning.
- Evidence supporting the candidate point: calculated comparison showed airspeed below the icing minimum approach speed for about 8 seconds before stick shaker; gear/configuration changes and autopilot nose-up trim were already present.
- Evidence against the candidate point: a strong alternative candidate exists at the captain's immediate aft control-column response to stick shaker activation, which is the first unambiguous control upset input in the documented sequence.
- Uncertainty: high relative to other batch-1 events because the earliest safe-operation escape may sit either in the pre-warning speed decay or in the immediate warning response.
- Alternative candidate points: captain's pull input immediately after stick shaker onset; mismatch awareness around ref-speeds/icing handling before final configuration.
- Post-escape consequence quarantine: full stall sequence, gear-up exchange, roll-off, and crash remain downstream.

## 5. Actor mapping

| actor_role | candidate_actor | evidence | source page/section | confidence | agent_migration_risk |
| --- | --- | --- | --- | --- | --- |
| direct actor candidate | captain-centered crew integrated actor | captain handled PF inputs and immediate stall response; first officer monitored speeds/checklists and shared earlier cue-detection burden | Executive Summary; `1.1`; ref-speeds sections | HIGH | MEDIUM |
| pilot flying | captain | managed autopilot-coupled approach, called flaps 15, and made immediate aft column input after warning | `1.1` | HIGH | LOW |
| pilot monitoring | first officer | briefed speeds, called gear down, participated in checklist flow, and did not arrest low-speed trend | `1.1`; transcript | HIGH | LOW |
| supporting/context actor | aircraft / ref-speeds logic | ref-speeds switch and icing status changed warning margins but did not remove crew monitoring responsibility | systems sections | MEDIUM | HIGH |
| downstream actor | operator training/procedures | approach-speed bug and ref-speeds relationship formed context but remains secondary actor lane | factual training/procedure sections | MEDIUM | HIGH |

## 6. Human-analysis evidence collection

| evidence_lane | factual evidence | source page/section | uncertainty | notes |
| --- | --- | --- | --- | --- |
| perception-relevant facts | low-speed cue margin degraded before warning; `ice detected` message appeared; no timely verbal recognition of the low-speed trend is recorded | `1.1`; ref-speeds comparison sections | MEDIUM | perception lane likely crucial but partly reconstructed |
| objective/goal-relevant facts | crew briefed flaps-15 landing speeds and proceeded with final configuration under icing-related context | `1.1` | LOW | goal structure is present but not fully verbalized at the end |
| action-relevant facts | gear/flap configuration proceeded, autopilot stayed engaged until shaker, captain then pulled aft and added power | `1.1`; transcript | LOW | control-action chain is strong |
| precondition-relevant facts | icing cues and ref-speeds logic materially changed warning margins; sterile cockpit should have applied earlier in descent | `1.1`; systems sections | MEDIUM | keep as factual context only |
| source limitations | the 8-second pre-warning speed deficit is a postaccident calculation, not a live cockpit callout | source note | LOW | important but non-blocking |

## 7. Quarantine of original report analysis

| report analysis/conclusion | source page/section | why quarantined | may inform factual context? |
| --- | --- | --- | --- |
| probable cause language centering on inappropriate response to stick shaker | report conclusion section | NTSB causal answer cannot become SERA expected value | yes |
| sterile-cockpit and ref-speeds training conclusions | findings and recommendations sections | operator-level analysis is not direct event fact | yes |

## 8. Bias and sufficiency filters

| filter | check | result | notes |
| --- | --- | --- | --- |
| outcome bias | Is the candidate point selected because the outcome was severe? | PASS | candidate anchored before the upset becomes unrecoverable |
| agent migration | Is the analysis drifting from the direct actor to a context actor? | WATCH | training/procedure issues are strong, but direct actor must stay cockpit-centered |
| technical dominance | Is a technical condition displacing the human action/condition being evaluated? | WATCH | ref-speeds logic is important but cannot eclipse crew monitoring and response |
| source sufficiency | Are factual anchors adequate for detailed extraction? | MEDIUM-HIGH | sufficient for candidate human analysis, but escape-point ambiguity remains |
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
