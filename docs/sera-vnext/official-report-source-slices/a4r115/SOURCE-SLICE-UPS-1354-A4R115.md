# SOURCE SLICE - UPS-1354 - A4R115

Status: SOURCE_SLICE_FACTUAL  
Phase: A4+R-115  
sourceSliceStatus: ADEQUATE_FOR_TRACE_DRAFT

## 1. Event identity
- eventId: UPS-1354
- unifiedCandidateId: UC-003
- aircraft/event: Airbus A300-600F, nighttime nonprecision approach to Birmingham runway 18
- local TXT: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/3__2014__NTSB-USA__Airbus-A300-600F__Crash-During-Nighttime-Nonprecision-Approach.txt`
- official report file listed in index: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool/3__2014__NTSB-USA__Airbus-A300-600F__Crash-During-Nighttime-Nonprecision-Approach.pdf`

## 2. Factual scope
Local official TXT sections used: history of flight, approach setup, FMC/profile approach sequence, vertical mode transition, required callouts, minimum altitude, and EGPWS alert sequence.

## 3. Timeline summary
- The flight was scheduled to arrive while Birmingham runway 06/24 was closed, leaving runway 18 with a nonprecision approach as the available runway.
- The crew briefed a localizer runway 18 profile approach using FMC-generated vertical guidance.
- A direct-to leg and FMC discontinuity remained, making the generated glidepath unusable for the approach.
- The autopilot did not engage profile mode; the captain selected vertical speed mode and did not brief the mode change to the first officer.
- The aircraft continued down at 1,500 fpm through stabilized-approach and minimum-altitude gates without required altitude callouts or arresting descent.
- EGPWS generated a "sink rate" caution shortly before impact.

## 4. Escape point candidate
Primary escape point candidate: when the aircraft was below 1,000 ft AFE at a descent rate greater than 1,000 fpm and the approach no longer met stabilized approach criteria. The report text states this condition would have required a go-around.

Secondary escape point candidate: minimum descent altitude, where required callouts and level-off did not occur.

## 5. Evidence table
| evidenceId | factual evidence/paraphrase | source area | relevant axis | canSupportCanonicalQuestion? | quarantine note |
|---|---|---|---|---|---|
| UPS-E1 | Runway 18 nonprecision approach was the available option at scheduled arrival; low ceiling and runway/approach constraints were not discussed with the crew. | lines 492-498 | O | partial | Do not use report conclusions as SERA answer key. |
| UPS-E2 | Crew briefed a profile approach using FMC vertical guidance to decision altitude. | lines 503-511 | O/A | yes | Factual setup only. |
| UPS-E3 | FMC discontinuity made the generated glidepath meaningless; neither pilot recognized the invalid path information. | lines 515-541 | P/A | yes | Treat as factual system/crew interaction, not final classification. |
| UPS-E4 | Captain changed to vertical speed mode without briefing the first officer; vertical monitoring became critical. | lines 542-554 | A/P | yes | No inference from probable cause. |
| UPS-E5 | Required 1,000 ft callout occurred, descent rate remained 1,500 fpm, stabilized criteria required go-around, MDA callouts did not occur, and descent was not arrested. | lines 557-565 | O/A/P | yes | Factual sequence supports multiple axes but must not be double-counted without trace reasoning. |
| UPS-E6 | EGPWS "sink rate" caution occurred near 1,000 ft msl/about 250 ft AGL. | lines 568-574 | P/A | yes | Warning response requires separate action analysis. |

## 6. Quarantine
- Probable cause and contributing factors are excluded from SERA answer selection.
- Findings and safety recommendations are excluded from SERA answer selection.
- External labels such as fatigue, monitoring failure, or procedural noncompliance are not imported as SERA codes.

## 7. Source limitations
- The source slice supports an attempted full-axis draft, but O and A must separate continuation objective, mode selection, monitoring, and callout omissions.
- Some evidence can support more than one axis; the trace must avoid counting the same fact as P, O, and A without a distinct axis rationale.

## 8. Preliminary trace viability
FULL_TRACE_POSSIBLE
