# SERA Engine vNext Expanded Full-Axis Trace Gaps A4R115 v0.2.0

Status: EXPANDED_FULL_AXIS_TRACE_GAPS  
Phase: A4+R-115  
DOCS_ONLY  
TRACE_CANDIDATE_BUILD_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Gap taxonomy
- source gap
- timing gap
- PF/PM role gap
- objective/intent gap
- action execution gap
- nominal path uncertainty
- overclassification risk

## Gaps by event and axis
| eventId | axis | gapType | gapDescription | requiredFollowUp |
|---|---|---|---|---|
| UPS-1354 | P | nominal path uncertainty | P-F versus P-G boundary around ambiguous FMC/VDI information versus available altitude cues | targeted source-slice timing around cue visibility and crew interpretation |
| UPS-1354 | A | action execution gap | A-F versus A-G boundary around warning feedback timing and response opportunity | isolate warning-to-response sequence with tighter timestamp chain |
| AMERICAN-1420 | P | source gap | weather/cue interpretation chain needs tighter factual separation from outcome-focused language | focused extraction on pre-landing perception cues and cockpit recognition points |
| AMERICAN-1420 | O | objective/intent gap | continuation objective under adverse weather needs stronger SOP/risk-management anchoring | explicit briefing/decision checkpoints source slice |
| ASIANA-214 | P | PF/PM role gap | PM callouts and PF interpretation boundary remains broad | finer-grain role-specific sequence for final approach |
| ASIANA-214 | O | objective/intent gap | continuation versus go-around objective needs clearer decision windows | source slice around stabilized criteria gates and go-around triggers |
| ASIANA-214 | A | action execution gap | A-F versus A-E branch needs tighter evidence about selected mode/response chain | focused mode-change and thrust-management sequence extraction |
| COLGAN-3407 | A | action execution gap | A-F versus A-E boundary remains sensitive to stimulus-response timing | targeted callout/control-input timeline extraction |
| AMERICAN-965 | P | source gap | P-F versus P-G boundary remains high-uncertainty with complex navigation context | deeper factual extraction of navigation display interpretation cues |
| AMERICAN-965 | A | action execution gap | A-I versus A-C boundary lacks clean implementation/verification split | source slice of action-verification loop and timing checkpoints |
| HELIOS-522 | O/A | source gap | high complexity and partial source slicing for objective and action branches | dedicated O/A source-slice round before full trace attempt |
| USAIR-427 | P/O/A | overclassification risk | system-dominant control failure context can distort human-axis closure | maintain hold until technical-versus-human boundary package is explicit |
| TUROY EC225 | P/O/A | overclassification risk | accident context is rich but high boundary ambiguity for immediate full-axis closure | keep boundary-only in this batch |
| KOREAN-801 | P/O/A | boundary gap | retained as boundary reference; full-axis promotion not in this phase | keep as boundary package pending dedicated review |

## Cross-event gap concentration
- Most frequent unresolved type: `action execution gap`.
- Second most frequent: `objective/intent gap` in continuation decisions.
- Highest overclassification risk cluster: USAIR-427, TUROY EC225, and boundary reuse of KOREAN-801.

## Batch-level recommendation
Proceed to one author review bundle only for events with usable full-axis drafts and manageable uncertainty (UPS-1354, AMERICAN-1420, COLGAN-3407, US AIRWAYS 1549). Keep ASIANA-214 and AMERICAN-965 as review-required outside closure decisions until focused source slicing is done.
