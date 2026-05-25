# SOURCE SLICE - HELIOS-522 - A4R115

Status: SOURCE_SLICE_FACTUAL  
Phase: A4+R-115  
sourceSliceStatus: PARTIAL_FOR_TRACE_DRAFT

## 1. Event identity
- eventId: HELIOS-522
- unifiedCandidateId: UC-051
- aircraft/event: Boeing 737-31S pressurization/hypoxia accident, Helios Airways Flight 522
- local TXT: `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-3__2006__AAIASB-Greece__Boeing-737-31S__Accident-Report-11-2006-Helios-Airways-Flig.txt`

## 2. Factual scope
Local official TXT sections used: climb sequence, cabin altitude warning, communication with operations/ground engineer, oxygen mask deployment, loss of communication, holding pattern, F-16 observations, engine flameout, and distress calls.

## 3. Timeline summary
- During climb, the cabin altitude warning horn sounded around 12,040 ft.
- The captain contacted the company and described a warning/cooling-equipment issue.
- Ground engineer attempted to confirm pressurization panel selection.
- Passenger oxygen masks deployed around 18,000 ft.
- Communication ended as the aircraft passed through 28,900 ft; subsequent calls received no response.
- The aircraft continued at FL340 and entered holding; intercepting F-16 pilots observed an incapacitated/abnormal cockpit/cabin state.

## 4. Escape point candidate
Candidate escape point: cabin altitude warning and subsequent company communication window, before crew incapacitation made normal P/O/A evaluation difficult. After incapacitation, SERA actor/axis analysis becomes boundary-heavy.

## 5. Evidence table
| evidenceId | factual evidence/paraphrase | source area | relevant axis | canSupportCanonicalQuestion? | quarantine note |
|---|---|---|---|---|---|
| HEL522-E1 | FDR recorded cabin altitude warning at 12,040 ft during climb. | lines 609-612 | P | yes | Warning recognition must be evaluated before incapacitation. |
| HEL522-E2 | Captain reported warning/cooling-equipment issues to company operations. | lines 612-634 | P/A | partial | Message ambiguity and hypoxia progression complicate actor state. |
| HEL522-E3 | Ground engineer asked captain to confirm pressurization panel AUTO; captain continued asking about cooling circuit breakers. | lines 634-642 | P | yes | Supports perception/interpretation ambiguity. |
| HEL522-E4 | Passenger oxygen masks deployed around 18,000 ft. | lines 638-642 | P/O | yes | Cue is strong but cockpit recognition remains uncertain. |
| HEL522-E5 | Microphone keying ended passing 28,900 ft and subsequent calls had no response. | lines 642-650 | A/P | partial | Later action branch may be blocked by incapacitation. |
| HEL522-E6 | F-16 pilots observed cockpit/cabin abnormal state and later a person entering cockpit; distress calls occurred after engine flameout. | lines 696-750 | P/O/A | partial | Actor identity/capability boundary is high. |

## 6. Quarantine
- The accident report's chain-of-events and pressurization conclusions are quarantined from SERA answer selection.
- Hypoxia is factual/capability context, not a shortcut to a SERA code.

## 7. Source limitations
- Strong factual sequence, but canonical O/A for the flight crew after incapacitation is not clean.
- Could become a boundary trace after a dedicated actor/capability scope decision.

## 8. Preliminary trace viability
PARTIAL_TRACE_ONLY
