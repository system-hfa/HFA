# SOURCE SLICE - US-AIRWAYS-1549 - A4R115

Status: SOURCE_SLICE_FACTUAL  
Phase: A4+R-115  
sourceSliceStatus: ADEQUATE_FOR_TRACE_DRAFT

## 1. Event identity
- eventId: US-AIRWAYS-1549
- unifiedCandidateId: UC-039
- aircraft/event: Airbus A320-214 loss of thrust in both engines and Hudson River ditching
- local TXT: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt`
- duplicate TXT also exists in new50 pool as UC-063; this source slice uses UC-039 from A4R112 plan.

## 2. Factual scope
Local official TXT sections used: bird strike, engine thrust loss, takeover of controls, emergency communications, QRH dual-engine failure checklist, runway feasibility decisions, ditching preparation, final configuration, and GPWS callouts.

## 3. Timeline summary
- The flight took off from LaGuardia and was climbing normally.
- Bird impact was recorded by CVR and FDR; both engines' fan/core speeds began to decay.
- The captain took control and directed the first officer to run the dual-engine failure checklist.
- ATC offered LaGuardia and Teterboro options; the captain assessed runway return as not feasible.
- The crew prepared for ditching, selected flaps, and completed the forced water landing with evacuation.

## 4. Escape point candidate
This is primarily a nominal/no-failure reference candidate. The trace should document whether P, O, and A follow canonical no-failure paths, not search for a failure code.

## 5. Evidence table
| evidenceId | factual evidence/paraphrase | source area | relevant axis | canSupportCanonicalQuestion? | quarantine note |
|---|---|---|---|---|---|
| US1549-E1 | CVR/FDR show bird strike at 2,818 ft AGL and both engines decelerating immediately afterward. | lines 706-716 | P | yes | Engine failure is factual condition, not SERA code. |
| US1549-E2 | Captain identified rollback/loss of thrust and started ignition/APU sequence. | lines 716-723 | P/A | yes | Use as factual awareness/action evidence. |
| US1549-E3 | Captain took control and directed QRH dual-engine failure checklist. | lines 722-730 | O/A | yes | Action appears structured; not final classification. |
| US1549-E4 | Captain reported loss of thrust and initial intent to turn back toward LaGuardia. | lines 723-730 | O | yes | Objective evolved as feasibility changed. |
| US1549-E5 | Captain rejected runway options after assessing feasibility and stated the aircraft would ditch in the Hudson. | lines 760-788 | O/P | yes | Supports nominal objective path if evidence holds. |
| US1549-E6 | First officer continued checklist items, flaps were set, and final altitude/speed callouts occurred. | lines 788-860 | A/P | yes | Useful for A-axis nominal/limited path. |

## 6. Quarantine
- Probable cause, contributing factors, findings, and safety recommendations remain excluded.
- Heroic or reputational narrative is not evidence for SERA coding.

## 7. Source limitations
- Strong for nominal O/A calibration, but the trace must still document each canonical axis and avoid treating successful outcome as proof of no failure.

## 8. Preliminary trace viability
FULL_TRACE_POSSIBLE
