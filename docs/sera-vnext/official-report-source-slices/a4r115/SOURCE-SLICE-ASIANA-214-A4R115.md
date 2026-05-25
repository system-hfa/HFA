# SOURCE SLICE - ASIANA-214 - A4R115

Status: SOURCE_SLICE_FACTUAL  
Phase: A4+R-115  
sourceSliceStatus: ADEQUATE_WITH_METHOD_REVIEW_REQUIRED

## 1. Event identity
- eventId: ASIANA-214
- unifiedCandidateId: UC-002
- aircraft/event: Boeing 777-200ER descent below visual glidepath and seawall impact at SFO
- local TXT: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/2__2014__NTSB-USA__Boeing-777-200ER__Descent-Below-Visual-Glidepath-and-Impact-Wit.txt`
- official report file listed in index: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/2__2014__NTSB-USA__Boeing-777-200ER__Descent-Below-Visual-Glidepath-and-Impact-Wit.pdf`

## 2. Factual scope
Local official TXT sections used: visual approach setup, automation mode sequence, autothrottle HOLD mode, PAPI/airspeed/descent-rate cues, awareness of low path/low speed, and go-around timing.

## 3. Timeline summary
- The flight was vectored for a visual approach and intercepted final approach slightly above the desired glidepath.
- The crew accepted a speed restriction to 5 nm and then had difficulty managing descent.
- The PF selected FLCH SPD; the autoflight system initiated behavior inconsistent with the crew's intended descent capture.
- The PF disconnected the autopilot and moved thrust levers to idle, causing autothrottle HOLD mode; no flight crewmember noted HOLD mode.
- At 500 ft, PAPI/airspeed/descent-rate cues indicated the approach was not stabilized.
- About 200 ft, the crew became aware of low airspeed and low path, but go-around was not initiated until below 100 ft.

## 4. Escape point candidate
Primary escape point candidate: 500 ft above airport elevation, when stabilization criteria applied and airspeed/descent-rate/path cues showed an unstable approach. Secondary escape point: about 200 ft when the crew became aware of low speed and low path.

## 5. Evidence table
| evidenceId | factual evidence/paraphrase | source area | relevant axis | canSupportCanonicalQuestion? | quarantine note |
|---|---|---|---|---|---|
| AS214-E1 | Visual approach to runway 28L was set up after vectors; speed restriction to 5 nm contributed to high/above-path energy state. | lines 554-560 | O/P | yes | Do not use contributing-factor text as answer key. |
| AS214-E2 | PF selected FLCH SPD; autoflight behavior did not support the intended descent capture. | lines 561-564 | A/P | yes | Automation behavior is factual but method boundary remains. |
| AS214-E3 | Autothrottle changed to HOLD after thrust levers went idle, and no flight crewmember noted the HOLD mode. | lines 564-567 | P/A | yes | P/A boundary needs review. |
| AS214-E4 | At 500 ft, PAPI, airspeed, idle thrust, and descent rate indicated unstable approach. | lines 570-577 | P/O/A | yes | Separate cue perception from objective continuation. |
| AS214-E5 | PAPI later showed three then four red lights; airspeed continued decreasing. | lines 577-580 | P | yes | Cues available; interpretation/monitoring branch remains contested. |
| AS214-E6 | Crew became aware of low speed/low path about 200 ft but delayed go-around until below 100 ft. | lines 580-583 | O/A | yes | Do not treat as final causation. |

## 6. Quarantine
- Probable cause, contributing factors, and safety recommendations remain excluded from SERA answers.
- Automation-complexity discussion is used only to locate factual cues and not to decide code.

## 7. Source limitations
- Prior A4R107/A4R108 governance kept ASIANA-214 outside author approval due P/A and source-slice/method boundary concerns.
- This A4R115 slice is adequate for a draft with `REVIEW_REQUIRED`, not for a clean reference.

## 8. Preliminary trace viability
FULL_TRACE_POSSIBLE_WITH_REVIEW_REQUIRED
