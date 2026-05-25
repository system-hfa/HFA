# SOURCE SLICE - TUROY-EC225 - A4R115

Status: SOURCE_SLICE_FACTUAL  
Phase: A4+R-115  
sourceSliceStatus: ADEQUATE_FOR_BOUNDARY_ONLY

## 1. Event identity
- eventId: TUROY-EC225
- unifiedCandidateId: UC-018 (duplicate group also UC-071)
- aircraft/event: Airbus Helicopters EC225 LP LN-OJF main rotor separation near Turoy
- local TXT: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/18__2018__AIBN-Norway__Airbus-EC225-LP__Airbus-Helicopters-EC225-LP-LN-OJF-Turøy-Norw.txt`

## 2. Factual scope
Local official TXT sections used: accident overview, normal flight before rotor separation, FDR sequence, warning absence, main gearbox fatigue fracture, and statement on crew handling.

## 3. Timeline summary
- The helicopter was transporting offshore workers from Gullfaks B to Bergen.
- The flight had descended and was established in cruise at 140 kt and 2,000 ft.
- The crew received no warnings before the main rotor separated.
- FDR showed sudden torque drop, erratic main rotor tilt, brief climb, rotor detachment, and ballistic descent.
- The investigation found no connection between crew handling and the accident.

## 4. Escape point candidate
No operator safe-operation escape point is identified in the factual sequence. The useful role is boundary/nominal-human calibration: no crew warning and no evidence of crew handling contribution.

## 5. Evidence table
| evidenceId | factual evidence/paraphrase | source area | relevant axis | canSupportCanonicalQuestion? | quarantine note |
|---|---|---|---|---|---|
| TUR225-E1 | Flight was normal at 140 kt/2,000 ft and crew received no warning before rotor separation. | lines 137-145 | P/A | yes for no-fault boundary | Do not use technical failure as human failure. |
| TUR225-E2 | Main rotor separated and aircraft impacted terrain; all aboard died. | lines 147-148 | A | partial | No operator action path evident. |
| TUR225-E3 | FDR showed sudden torque drop, rotor tilt, brief climb, rotor detachment, and ballistic descent. | lines 228-240 | P/A | yes for boundary | Supports no practical action window. |
| TUR225-E4 | Report states no connection between crew handling and the accident and no evidence that operator maintenance actions contributed. | lines 165-168 | P/O/A | partial | This is an investigation statement; use only as boundary context, not SERA answer key. |

## 6. Quarantine
- Gearbox design, maintenance, and technical-cause findings are quarantined from SERA P/O/A coding.
- External statement of no crew handling contribution is not treated as automatic SERA no-failure code without canonical path.

## 7. Source limitations
- Strong boundary case, weak human P/O/A trace candidate.
- Useful for nominal/no-action-window discipline, not for positive human reference.

## 8. Preliminary trace viability
BOUNDARY_ONLY
