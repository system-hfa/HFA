# SERA Engine vNext Objective Action Source Gaps A4R110 v0.2.0

Status: OBJECTIVE_ACTION_SOURCE_GAPS  
Phase: A4+R-110  
DOCS_ONLY  
O_A_FEASIBILITY_ONLY

## COMAIR-5191
### Objective axis
- factual evidence available:
  - repeated runway-22 references in taxi/takeoff briefing;
  - runway-22 taxi clearance and heading-bug alignment;
  - stated departure workflow aligned with assigned runway.
- evidence missing:
  - stronger discrimination between intent-consistent objective and possible rule-inconsistent objective transition at lineup moment;
  - explicit crew-level objective update when crossing runway-26 hold-short.
- additional source-slice needed: yes
- canonical objective path attempt later: possible after focused slice

### Action axis
- factual evidence available:
  - taxi route, hold-short crossing, lineup checklist timing, takeoff-roll initiation, callout timing.
- evidence missing:
  - finer chain showing whether action was implemented as intended versus selection error subtype;
  - explicit cross-check opportunities and response sequencing at runway-entry gate.
- additional source-slice needed: yes
- canonical action path attempt later: possible after focused slice

## KOREAN-801
### Objective axis
- factual evidence available:
  - nonprecision-approach briefing context, glideslope unusable advisory, continued approach sequence.
- evidence missing:
  - cleaner separation between objective continuity and perception ambiguity under critical timing;
  - explicit objective re-evaluation points at MDA/minimums and missed-approach threshold.
- additional source-slice needed: yes
- canonical objective path attempt later: uncertain

### Action axis
- factual evidence available:
  - descent execution, checklist flow, callouts, warning sequence, late missed-approach cue.
- evidence missing:
  - robust decomposition of execution branch needed for canonical A-node progression;
  - response-timing granularity sufficient to distinguish action-selection vs execution-feedback pathways.
- additional source-slice needed: yes
- canonical action path attempt later: uncertain

## Gap summary
- COMAIR-5191: O/A plausible for future attempt but still source-slice dependent.
- KOREAN-801: O/A remains unresolved with high overclassification risk in current packet.
