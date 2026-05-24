# SERA Engine vNext A4R106 Author Review Bundle A4R107 v0.2.0

Status: AUTHOR_REVIEW_BUNDLE_READY  
Phase: A4+R-107  
DOCS_ONLY  
QUALITY_AUDIT_ONLY  
REVIEW_BUNDLE_ONLY  
NO_RELEASE  
NO_DOWNSTREAM  
authorDecisionStatus: NOT_REQUESTED_IN_A4R107

## ASIANA-214
1. Factual summary (short)  
Visual approach with known glidepath-service constraints; autothrottle mode-state sequence and profile management degraded; low-speed/low-path recognition and go-around were late.

2. Safe-operation escape point  
Stabilized-approach gate where PAPI, descent-rate, and airspeed cues already supported immediate go-around.

3. Proposed SERA path  
`P_ROOT -> P_ASSESSMENT(NÃO) -> P_CAPABILITY(SIM) -> P_TIME_PRESSURE(NÃO) -> P_INFORMATION_AMBIGUOUS(NÃO) -> P_INFORMATION_AVAILABLE(SIM) -> P-G`

4. Main evidence by node  
- `P_ASSESSMENT(NÃO)`: unstable cues not integrated (mode + profile + speed).  
- `P_CAPABILITY(SIM)`: draft treats gap as integration/expectancy, not sensory/knowledge incapacity.  
- `P_INFORMATION_AVAILABLE(SIM)`: PAPI/airspeed/descent information present and usable.

5. Main argument in favor  
Evidence supports available-cue non-integration more strongly than direct incapacity hypothesis.

6. Main argument against  
Boundary between automation ambiguity and capability interpretation remains sensitive.

7. Probable fallback if not approved  
Keep `P_ASSESSMENT(NÃO)` and park leaf closure as `UNRESOLVED` pending tighter source slice.

8. What is not being decided here  
- not a final accident cause decision;  
- not HFACS tagging;  
- not Risk/ERC or ARMS/ERC output;  
- not operational recommendations package;  
- not front-end readiness.

9. Future simple author questions  
- Manter P-G como draft interno, ou cair para UNRESOLVED?  
- A evidência sustenta o caminho canônico, ou há overclassification?

## COMAIR-5191
1. Factual summary (short)  
Runway-22 assignment and cues were repeatedly present; aircraft entered runway 26 and continued takeoff after runway-number omission in exchange.

2. Safe-operation escape point  
Runway-entry verification point before takeoff commitment.

3. Proposed SERA path  
`P_ROOT -> P_ASSESSMENT(NÃO) -> P_CAPABILITY(SIM) -> P_TIME_PRESSURE(NÃO) -> P_INFORMATION_AMBIGUOUS(NÃO) -> P_INFORMATION_AVAILABLE(SIM) -> P-G`

4. Main evidence by node  
- `P_ASSESSMENT(NÃO)`: assigned-vs-used runway mismatch is explicit in factual sequence.  
- `P_INFORMATION_AMBIGUOUS(NÃO)`: cues were explicit and repeated.  
- `P_INFORMATION_AVAILABLE(SIM)`: runway-related information was available/correct and not integrated.

5. Main argument in favor  
This is the cleanest draft path in the batch for perception-side closure with low ambiguity.

6. Main argument against  
Escape-point fixation and time-pressure non-dominance still need explicit author tolerance.

7. Probable fallback if not approved  
Retain non-closure on leaf and park as `UNRESOLVED` until hold-short vs lineup evidence is tightened.

8. What is not being decided here  
- not a final accident cause decision;  
- not HFACS tagging;  
- not Risk/ERC or ARMS/ERC output;  
- not operational recommendations package;  
- not front-end readiness.

9. Future simple author questions  
- Manter P-G como draft interno, ou cair para UNRESOLVED?  
- A evidência sustenta o caminho canônico, ou há overclassification?

## KOREAN-801
1. Factual summary (short)  
Nonprecision-approach constraints coexisted with glideslope-usability inconsistency in cockpit dialogue; descent/checklist/warning chain continued into terrain impact window.

2. Safe-operation escape point  
First glideslope-usability inconsistency point where strict nonprecision profile protection remained feasible.

3. Proposed SERA path  
`P_ROOT -> P_ASSESSMENT(NÃO) -> P_CAPABILITY(SIM) -> P_TIME_PRESSURE(NÃO) -> P_INFORMATION_AMBIGUOUS(SIM) -> P-F`

4. Main evidence by node  
- `P_ASSESSMENT(NÃO)`: approach-state coherence degraded in ATC/CVR sequence.  
- `P_INFORMATION_AMBIGUOUS(SIM)`: contradictory glideslope interpretation plus warning chain.  
- `P_TIME_PRESSURE(NÃO)`: urgency present but not isolated as dominant branch.

5. Main argument in favor  
Ambiguity branch P-F is factually defensible without forcing O/A closure.

6. Main argument against  
`P-G` remains plausible if reviewer prioritizes available-monitoring cues over ambiguity framing.

7. Probable fallback if not approved  
Move from `P-F` leaf to `UNRESOLVED` pending targeted slice around glideslope/warning interval.

8. What is not being decided here  
- not a final accident cause decision;  
- not HFACS tagging;  
- not Risk/ERC or ARMS/ERC output;  
- not operational recommendations package;  
- not front-end readiness.

9. Future simple author questions  
- Manter P-F como draft interno, ou trocar para P-G/UNRESOLVED?  
- A evidência sustenta o caminho canônico, ou há overclassification?

## Bundle-level note
This package is prepared for later chat-based author review only. No author decision is requested inside repository artifacts in A4R107.
