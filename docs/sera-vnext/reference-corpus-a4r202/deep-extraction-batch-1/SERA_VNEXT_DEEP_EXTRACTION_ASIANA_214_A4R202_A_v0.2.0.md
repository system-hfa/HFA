# SERA vNext Deep Extraction - Asiana 214 - A4R202-A v0.2.0

## 1. Identification

- Candidate ID: C-002
- Event name: Asiana Airlines Flight 214
- Aircraft / operation: Boeing 777-200ER / Part 121 international passenger
- Authority: NTSB
- Official report identifier: NTSB/AAR-14/01
- Extraction analyst: Codex GPT-5
- Extraction date: 2026-06-01
- Source-readiness status: source-ready inherited from A4R201-C
- Locator matrix row: C-002
- Readiness matrix row: C-002

## 2. Source locator

- Official page URL: none identified beyond direct report locator
- Official PDF URL: https://www.ntsb.gov/investigations/accidentreports/reports/aar1401.pdf
- Existing local source path: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/2__2014__NTSB-USA__Boeing-777-200ER__Descent-Below-Visual-Glidepath-and-Impact-Wit.txt`
- Mirror URL, if any: none used
- Mirror role: not applicable
- Source confidence: HIGH
- Source limitations: mode annunciation and throttle logic must be reconstructed from narrative, FDR summaries, and transcript excerpts rather than direct cockpit video
- Weak or wrong sources rejected: Motley Rice and media/legal summaries
- Report sections/pages used: Executive Summary (local txt pp. 14-16); `1.1 History of Flight` (local txt pp. 23-29); CVR excerpt appendix (local txt p. 194)

## 3. Factual sequence timeline

| sequence_id | time_marker or phase_marker | actor | role | observed action/omission | communication/callout | warning/alert | aircraft state | procedural context | source page/section | confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ASI-01 | visual approach setup, about 14 nm final | flight crew / ATC | PF, PM, observer, ATC | crew accepted instruction to maintain 180 kt to 5 nm while intercepting runway 28L final | visual approach clearance and 180 kt restriction accepted | none | airplane slightly above desired 3 degree glidepath | straight-in visual approach setup | Executive Summary; `1.1` | HIGH |
| ASI-02 | 1124:51, about 8.5 nm | PF and PM | PF, PM | gear extended; PM noted the airplane was high; PF responded and selected more descent | PM: "this seems a little high" / PF: "I will descend more" | none | about 3,500 ft msl, about 188 kt, about 1,000 fpm | descent management while still above path | `1.1`, local txt p. 24 | HIGH |
| ASI-03 | 1125:46 to 1125:55, DUYET to 5 nm | flight crew | crew integrated | airplane crossed DUYET about 450 ft above minimum altitude and reached 5 nm still about 400 ft above desired glidepath | tower contact attempted | none | about 2,250 ft to 2,085 ft msl, about 176-174 kt | capture of desired path not achieved by 5 nm gate | `1.1`, local txt p. 25 | HIGH |
| ASI-04 | 1126:25.7 to 1126:28.8, about 3.5 nm | PF | PF | PF selected FLCH SPD, autoflight initiated climb tendency toward selected altitude, then autopilot was disconnected | flap-30 related callouts occurred, but no FLCH callout was recorded | none | about 1,500 ft msl, about 169 kt, descent interrupted by climb command | autoflight mode change during late visual approach | `1.1`, local txt p. 25 | HIGH |
| ASI-05 | 1126:33 to 1126:44 | PF and crew | PF, PM, observer | thrust levers reached idle, autothrottle changed to HOLD, left F/D was turned off, and the crew did not report recognizing loss of automatic speed control | PM: "flight director" / PF: "check" / later PM: "it's high" | no low-energy alert relevant to approach | airspeed decreasing from about 165 kt while descent rate increased | manual recovery from being high while automation state changed | `1.1`, local txt pp. 25-26 | HIGH |
| ASI-06 | 1126:54.9, 1,000 ft RA | crew | PF, PM | aircraft descended through 1,000 ft RA while still high and fast relative to stable-path needs | PM: "one thousand" / PF: "check" | none | about 151 kt, about 1,500 fpm, 243 ft above 3 degree glidepath, PAPI four white | stable approach gate tightening | `1.1`, local txt p. 26 | HIGH |
| ASI-07 | 500 ft AFE gate | crew | PF, PM, observer | approach remained unstabilized; thrust levers still idle and descent rate remained high even though target speed had just been reached | no go-around call at gate | none | about 137 kt, about 1,200 fpm, slightly above desired glidepath | Asiana stabilized approach gate in VMC | Executive Summary, local txt p. 14 | HIGH |
| ASI-08 | about 200 ft RA to below 100 ft | crew | PF, PM, observer | crew became aware of low airspeed and low path only very late; go-around was not initiated until below 100 ft | PM recalled low airspeed around 200 ft; go-around came too late | low airspeed condition became apparent; PAPI moved to four red | airspeed about 120 kt by about 200 ft RA; airplane lacked performance for successful go-around below 100 ft | end-stage path/energy breakdown after earlier escape | Executive Summary; `1.1`; interview summary | MEDIUM-HIGH |

## 4. Candidate escape point, not final

- Candidate escape-point statement using "quando...": quando o PF desconectou o autopilot, levou as thrust levers para idle e o A/T entrou em `HOLD` sem percepção integrada da tripulação, enquanto a aproximação continuava alta e exigia correções finas de energia e trajetória.
- Immediate factual condition at that candidate point: a aeronave ainda estava acima da trajetória desejada, o autoflight havia mudado de lógica, e a tripulação passou a depender de monitoramento manual de energia sem reconhecer a perda de controle automático de velocidade.
- Evidence supporting the candidate point: sequência `FLCH SPD -> A/P disconnect -> thrust idle -> A/T HOLD`; nenhum tripulante recordou perceber a mudança de modo; a velocidade passou a decair até o gate de 500 ft e além.
- Evidence against the candidate point: a operação ainda mantinha margem de recuperação depois da entrada em `HOLD`; um gate alternativo plausível é o de 500 ft AFE, quando havia critério operacional explícito para arremeter.
- Uncertainty: moderada entre um candidato "automation-state loss not perceived" e um candidato "unstable approach not rejected at 500 ft".
- Alternative candidate points: reaching 5 nm still about 400 ft high; passing 500 ft AFE with idle thrust and excessive descent rate.
- Post-escape consequence quarantine: awareness of low airspeed near 200 ft, late go-around attempt, seawall impact, breakup, fire, and evacuation consequences remain downstream.

## 5. Actor mapping

| actor_role | candidate_actor | evidence | source page/section | confidence | agent_migration_risk |
| --- | --- | --- | --- | --- | --- |
| direct actor candidate | crew-integrated flight crew with PF immediate control input | PF manipulated modes, thrust, pitch, and descent; PM and observer also failed to detect automation state change and unstable continuation | Executive Summary; `1.1` | HIGH | MEDIUM |
| pilot flying | trainee captain | selected FLCH, disconnected A/P, moved thrust to idle, continued approach | `1.1` | HIGH | LOW |
| pilot monitoring | instructor captain | identified "high" state, made altitude callouts, did not convert monitoring into stable-approach rejection | `1.1` | HIGH | LOW |
| supporting/context actor | observer relief first officer | reminded crew of 180 kt to 5 nm and occupied monitoring space during approach | `1.1` | MEDIUM | LOW |
| downstream actor | ATC / autoflight system | ATC speed restriction and Boeing autoflight logic shaped context but did not physically fly the late approach | Executive Summary; `1.1` | MEDIUM | HIGH |

## 6. Human-analysis evidence collection

| evidence_lane | factual evidence | source page/section | uncertainty | notes |
| --- | --- | --- | --- | --- |
| perception-relevant facts | no crewmember recalled noticing the A/T transition to HOLD; PM first recognized low airspeed only around 200 ft RA | `1.1`; interview summary | MEDIUM | strong cue-detection issue without yet assigning P/O/A |
| objective/goal-relevant facts | crew accepted 180 kt to 5 nm, attempted to recapture a high approach, and later targeted 137 kt | Executive Summary; `1.1` | LOW | shows competing goals of path capture and speed/configuration |
| action-relevant facts | PF selected FLCH SPD, disconnected A/P, retarded thrust to idle, and continued below stable gates without go-around | Executive Summary; `1.1` | LOW | immediate control actions are well anchored |
| precondition-relevant facts | PM was on first trip as instructor; visual approach used with glidepath cues available; automation mode behavior mattered materially | Executive Summary; personnel and system sections | MEDIUM | keep factual and non-diagnostic |
| source limitations | no direct cockpit video; automation understanding depends on report reconstruction and interviews | source note | LOW | non-blocking |

## 7. Quarantine of original report analysis

| report analysis/conclusion | source page/section | why quarantined | may inform factual context? |
| --- | --- | --- | --- |
| probable cause language on descent mismanagement, unintended deactivation of automatic airspeed control, and delayed go-around | report conclusion section | causal conclusion cannot become SERA expected value | yes |
| safety issue language on SOP adherence, automation training, manual flight, and alerting | Executive Summary | improvement framing is not direct event fact | yes |

## 8. Bias and sufficiency filters

| filter | check | result | notes |
| --- | --- | --- | --- |
| outcome bias | Is the candidate point selected because the outcome was severe? | PASS | point anchored before seawall impact and breakup |
| agent migration | Is the analysis drifting from the direct actor to a context actor? | WATCH | ATC and Boeing autoflight are contextual, not direct actor substitutes |
| technical dominance | Is a technical condition displacing the human action/condition being evaluated? | WATCH | automation logic matters, but crew monitoring and control remain central factual lane |
| source sufficiency | Are factual anchors adequate for detailed extraction? | HIGH | timeline, callouts, and mode changes are well documented |
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
