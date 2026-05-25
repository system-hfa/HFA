# SOURCE SLICE - AMERICAN-965 - A4R115

Status: SOURCE_SLICE_FACTUAL  
Phase: A4+R-115  
sourceSliceStatus: ADEQUATE_FOR_TRACE_DRAFT

## 1. Event identity
- eventId: AMERICAN-965
- unifiedCandidateId: UC-024
- aircraft/event: Boeing 757 CFIT near Cali, Colombia
- local TXT: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/24__1996__Aeronautica-Civil-Colombia__Boeing-757-223__Controlled-Flight-Into-Terrain-American-Air.txt`

## 2. Factual scope
Local official TXT sections used: descent/approach clearance, runway 19/Rozo/Tulua sequence, FMS interaction, course deviation, GPWS alert, escape maneuver, and speedbrake state.

## 3. Timeline summary
- The crew accepted runway 19 and Rozo arrival routing during descent toward Cali.
- After passing ULQ, the aircraft turned left of cleared course and then right while still descending.
- The crew discussed difficulty locating Tulua/Rozo-related navigation entries and selected direct routing.
- GPWS "terrain" warning occurred around 2141:15.
- The crew added power and raised the nose, but speedbrakes that had been extended during descent were not retracted.

## 4. Escape point candidate
Primary escape point candidate: navigation/FMS confusion around Tulua/Rozo/direct-to entries before GPWS. Secondary escape point: GPWS escape maneuver, when speedbrake retraction and terrain escape actions were required.

## 5. Evidence table
| evidenceId | factual evidence/paraphrase | source area | relevant axis | canSupportCanonicalQuestion? | quarantine note |
|---|---|---|---|---|---|
| AA965-E1 | ATC cleared the aircraft for runway 19/Rozo arrival and the crew accepted. | lines 224-240 | O | yes | Do not convert acceptance of runway into objective failure by itself. |
| AA965-E2 | After passing ULQ, aircraft deviated from cleared course while descending. | lines 243-247 | P/A | yes | Factual path deviation. |
| AA965-E3 | CVR captured crew difficulty with Tulua and direct-to/Rozo FMS handling. | lines 269-276 | P/A | yes | Supports perception/action boundary. |
| AA965-E4 | GPWS warning occurred; crew added full power and raised nose. | lines 281-288 | P/A | yes | Warning response requires separate action path. |
| AA965-E5 | Speedbrakes extended during descent were not retracted during escape maneuver. | lines 286-288 | A | yes | Strong A-axis candidate with review. |

## 6. Quarantine
- Accident conclusions, FMS design discussions, and report analysis are excluded from SERA answer selection.
- FMS-related terminology is not converted into a SERA code without canonical path.

## 7. Source limitations
- Source is text-converted from an official/archived report representation; line artifacts exist.
- P/A boundary is strong but O-axis may need review to avoid overclassifying a rapidly changing approach clearance.

## 8. Preliminary trace viability
FULL_TRACE_POSSIBLE
