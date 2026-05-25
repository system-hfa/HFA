# SERA Engine vNext Real Event Reaudit Pilot Plan A4R138 v0.2.0

Status: PILOT_PLAN_RECORDED
Phase: A4+R-138
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Define the order, rationale, and success criteria for the first real-event reaudits under the A4R137 "P/O/A at escape point" rule and the A4R138 protocol.

No reaudit is executed in this phase. This is the plan only.

## A4R140 Progressive Escape Amendment

From A4R140 onward, every pilot must explicitly declare whether the escape point is:

- `DISCRETE_ESCAPE_POINT`, or
- `PROGRESSIVE_ESCAPE_ZONE`.

This declaration must be completed before any P/O/A axis analysis.

Pilot-specific application:

- REAL-EVENT-0016 and ASIANA-214 must apply the discrete-vs-progressive distinction before P/O/A.
- BS211-Q400 and A4R87-EXT-002 must avoid using critical-point markers or warnings as escape-point anchors.
- When only first observable unsafe markers exist, pilots must record the limitation and apply SOURCE_PARTIAL logic per A4R140.

## Pilot Order

### 1. REAL-EVENT-0003 (Tofino night approach near-CFIT)

**Why first:**
- Has autopilot manual disconnect enrichment (A4R132) — the only event with specific at-escape-point evidence already enriched.
- Escape point defined (A4R133): manual autopilot disconnect by PF.
- "Quando..." statement validated with autopilot context.
- P-G/O-A approved (now suspended by A4R137); reaudit tests whether the approval holds at the escape point.

**What must be answered:**
- At the moment of manual autopilot disconnect, what did PF perceive?
- Was PF's perception a human interpretation problem or a response to real technical/automation behavior?
- Was the objective at that moment compatible with safe operation?
- Does P-G hold at the escape-point moment, or does it shift?

**Prior state:** AUTHOR_APPROVED_DRAFT_PARTIAL → A4R137: POA_APPROVAL_SUSPENDED

### 2. REAL-EVENT-0016 (N8DX automation confusion LOC)

**Why second:**
- Tests the most critical A4R137 distinction: technical failure vs. pilot interpretation at the escape point.
- P-C vs P-G boundary decision depends on whether GPS/autopilot was a real technical failure or a pilot interpretation problem.
- Cannot proceed to P/O/A without this distinction.

**What must be answered:**
- Was GPS/autopilot a real technical failure or a pilot interpretation problem at the escape-point moment?
- If technical failure: does that change P from perception to technical-external?
- If interpretation: was the information correct and available (P-G) or ambiguous/degraded (P-C)?

**Prior state:** ACTIVE_REVIEW → A4R137: NEEDS_SOURCE_ENRICHMENT_FOR_ESCAPE_POINT_POA

### 3. ASIANA-214 (Asiana 214 visual approach energy deviation)

**Why third:**
- Tests the O-axis rule: objective must be evaluated at the escape-point moment, not by post-escape continuation.
- If the objective at the escape-point moment was to land safely, O tends to O-A, not O-D.
- O-D was based on continuation past the stabilization gate (post-escape outcome), which the A4R137 rule prohibits.

**What must be answered:**
- At the escape-point moment, what was the crew's objective?
- Was the objective to land safely (O-A) or was there an explicit unsafe objective (O-D)?
- Was O-D inferred from continuing the unstable approach, which is a post-escape decision, not the objective at the escape-point moment?

**Prior state:** ACTIVE_REVIEW → A4R137: POA_REAUDIT_REQUIRED_AT_ESCAPE_POINT

### 4. BS211-Q400 (Unstable approach sequence)

**Why fourth (after gate review):**
- Gate patch (A4R134) removed violation language but is not yet approved.
- P/O/A was built from post-escape trajectory, not at-escape-point state.
- O-C/A-F risk overclassification from post-escape trajectory needs reaudit.

**What must be answered:**
- Is the A4R134 gate patch valid?
- At the escape-point moment (revised "Quando..."), what was the crew state for P, O, and A?
- Do O-C and A-F hold at the escape-point moment, or were they overclassified from post-escape trajectory?

**Prior state:** NEEDS_REBUILD → A4R137: FULL_REBUILD_REQUIRED_AT_ESCAPE_POINT

### 5. A4R87-EXT-002 (AW139 night over-water warning sequence)

**Why fifth (after pre-EGPWS isolation):**
- Gate patch (A4R134) removed EGPWS as temporal marker but confidence is MEDIUM.
- P/O/A still built from alert chronology, not pre-alert escape-point state.
- Must isolate the moment before EGPWS alerts to find the true escape point.

**What must be answered:**
- Is the A4R134 gate patch valid with MEDIUM confidence?
- What was the state at the true pre-EGPWS escape-point moment?
- Can P/O/A be determined at that moment, or is source evidence insufficient?

**Prior state:** NEEDS_REBUILD → A4R137: ESCAPE_POINT_AND_POA_REAUDIT_REQUIRED

## Pilot Success Criteria

A pilot reaudit is successful when:

1. The escape-point "Quando..." statement passes the Hendy gate and the A4R138 Step 3 validation.
2. Escape point temporal type is explicitly declared (`DISCRETE_ESCAPE_POINT` vs `PROGRESSIVE_ESCAPE_ZONE`) before P/O/A.
3. P/O/A analysis is demonstrably limited to the escape-point moment or earliest documented progressive-zone start, with no axis inferred from post-escape consequence.
4. Blocks are explicitly checked and none remain unresolved.
5. The reaudit decision is explicit (REAUDITED_AT_ESCAPE_POINT_DRAFT, PARTIAL, UNRESOLVED, etc.).
6. The filled template is complete and internally consistent.

## Pilot Stop Criteria

Stop the pilot and revise the protocol if:

1. More than 2 of the 5 pilot events cannot define an escape point with at least MEDIUM source confidence.
2. The same block (e.g., BLOCK_POA_TECHNICAL_FAILURE_NOT_EXCLUDED) fires on 3+ events, indicating a systemic source gap.
3. P/O/A classification consistently drifts toward post-escape inference despite the protocol.
4. Author review identifies a structural flaw in the protocol that requires revision before continuing.

## Prohibitions

- No releasedCode from any pilot reaudit.
- No downstream from any pilot reaudit.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No P/O/A is final until author review.
- No reaudit without explicit author authorization.

## Locks

- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No reaudit executed in this phase.
- No documents deleted or moved.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Next Steps

1. Author review and approval of this pilot plan.
2. Execute REAL-EVENT-0003 reaudit (first pilot).
3. Source enrichment for REAL-EVENT-0016 GPS/autopilot failure vs. interpretation.
4. Execute REAL-EVENT-0016 and ASIANA-214 reaudits.
5. Gate patch review for BS211-Q400 and A4R87-EXT-002 before their reaudits.
6. After pilot validation, expand to remaining events.
