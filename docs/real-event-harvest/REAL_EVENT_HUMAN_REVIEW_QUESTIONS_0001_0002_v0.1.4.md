# Real Event Human Review Questions — REAL-EVENT-0001 and REAL-EVENT-0002 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-8 — Human Review Questions  
Scope: human review checklist for deciding whether two real events can become candidate-quality examples  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document converts the deep factual extraction for REAL-EVENT-0001 and REAL-EVENT-0002 into structured human review questions.
The goal is to decide whether these events are ready to become candidate-quality examples in a later phase.
This document does not create fixtures.
This document does not assign expected P/O/A.
This document does not approve JSON candidates.
This document does not modify the SERA engine.
All outputs remain:
```text
DRAFT
NOT_EXPECTED_VALUE
HUMAN_REVIEW_REQUIRED
NO_FIXTURE_JSON
```

---

## 2. Review principles

The reviewer must decide from factual evidence, not from report conclusions.

Allowed reasoning direction:

facts
→ safe operation escape point
→ unsafe act / unsafe condition
→ direct actor
→ perception / objective / action statements
→ P/O/A hypothesis
→ limitations
→ review decision

Forbidden reasoning direction:

report conclusion
→ expected SERA value

Also forbidden:

HFACS label
→ P/O/A code

The reviewer must explicitly mark uncertainty.

---

PART A — REAL-EVENT-0001: S-92A CHO Thebaud

## 3. Review target

Event: REAL-EVENT-0001 — S-92A CHO Thebaud
Current status: DRAFT_FOR_REVIEW
Current hypothesis: P-likely, not expected value
Candidate use: GOOD_BASELINE_CANDIDATE_AFTER_REVIEW / ADVERSARIAL_DVE_CASE
Decision needed: whether this event has enough evidence to become a candidate-quality example later.

---

## 4. Source sufficiency questions

Answer each question:

Question    Answer    Evidence / notes
Is the source official or primary?    TBD    TSB official report expected.
Is the chronology sufficiently detailed?    TBD    
Are PF and PM roles identified?    TBD    
Are flight parameters available around the unsafe state?    TBD    
Are callouts or crew statements available?    TBD    
Is the timing from visual contact to low-energy state clear?    TBD    
Is the second inadvertent descent relevant to the same pattern?    TBD    
Are report conclusions separable from factual evidence?    TBD    

Reviewer decision:

SOURCE_SUFFICIENT
SOURCE_PARTIAL
SOURCE_INSUFFICIENT

---

## 5. Safe operation escape point review

Candidate escape point:

The operation escaped safe functioning when the visual approach entered a low-energy state that was not detected or corrected before the helicopter descended to approximately 13 feet above the water.

Review questions:

Question    Answer    Evidence / notes
Is the escape point stated as an operational deviation rather than outcome?    TBD    
Is the transition from instrument attempts to visual approach factual?    TBD    
Is the low-energy state clearly established before recovery?    TBD    
Is the escape point too early, too late, or appropriate?    TBD    
Should the second inadvertent descent be separate or corroborative?    TBD    

Reviewer decision:

ESCAPE_POINT_ACCEPT
ESCAPE_POINT_REVISE
ESCAPE_POINT_REJECT

Required revised wording if needed:

TBD

---

## 6. Unsafe act / unsafe condition review

Candidate unsafe act:

The flight crew continued or managed the visual offshore approach while the helicopter entered a low-airspeed, high-rate-of-descent state that was not corrected until very low height.

Candidate unsafe condition:

Low-visibility offshore visual approach environment with fog/degraded visual cues, no discernible horizon, and an EGPWS coverage gap for gear-down, below-50-KIAS inadvertent descent.

Review questions:

Question    Answer    Evidence / notes
Is there an observable unsafe act, or is this mainly non-detection?    TBD    
Does the unsafe act wording overstate crew action?    TBD    
Is the unsafe condition strong enough to preserve independently?    TBD    
Is the EGPWS gap a condition/barrier issue rather than active failure?    TBD    
Should visual approach continuation be treated as act, objective, or context?    TBD    

Reviewer decision:

UNSAFE_ACT_ACCEPT
UNSAFE_ACT_REVISE
UNSAFE_ACT_INSUFFICIENT
UNSAFE_CONDITION_ACCEPT
UNSAFE_CONDITION_REVISE
UNSAFE_CONDITION_INSUFFICIENT

Required revised wording if needed:

TBD

---

## 7. Direct actor review

Current direct actor candidate:

Flight crew, with PF/PM separation pending.

Review questions:

Question    Answer    Evidence / notes
Can the direct actor be assigned to PF?    TBD    
Can the direct actor be assigned to PM?    TBD    
Should the direct actor remain "flight crew"?    TBD    
Are there separate active failures for PF and PM?    TBD    
Is this better treated as crew-level monitoring failure?    TBD    

Reviewer decision:

DIRECT_ACTOR_PF
DIRECT_ACTOR_PM
DIRECT_ACTOR_FLIGHT_CREW
DIRECT_ACTOR_MULTI_ACTOR
DIRECT_ACTOR_INSUFFICIENT

Reviewer notes:

TBD

---

## 8. Perception review

Candidate perception statement:

The crew may not have perceived the low-energy/high-descent-rate state early enough, possibly due to focus on the helideck and degraded visual cues.

Review questions:

Question    Answer    Evidence / notes
Is non-detection of low-energy state directly supported by factual evidence?    TBD    
Is there evidence of attention focused on helideck?    TBD    
Is there evidence that instruments showed the unsafe state?    TBD    
Is there evidence that crew failed to perceive instrument cues?    TBD    
Is DVE being used too strongly as a perception shortcut?    TBD    
Does lack of EGPWS alert reduce available information?    TBD    

Reviewer decision:

P_STRONG_CANDIDATE
P_PLAUSIBLE_CANDIDATE
P_WEAK_CANDIDATE
P_INSUFFICIENT

Reviewer notes:

TBD

---

## 9. Objective review

Candidate objective statement:

The crew objective appears to have shifted from missed approach/instrument approach attempts to completing a visual approach after acquiring platform contact.

Review questions:

Question    Answer    Evidence / notes
Is the objective shift factual?    TBD    
Was the objective itself unsafe or only risky under conditions?    TBD    
Is there evidence of conscious continuation despite unstable profile?    TBD    
Is there evidence of deliberate deviation from SOP/limits?    TBD    
Should O remain secondary rather than primary?    TBD    

Reviewer decision:

O_STRONG_CANDIDATE
O_PLAUSIBLE_CANDIDATE
O_WEAK_CANDIDATE
O_INSUFFICIENT

Reviewer notes:

TBD

---

## 10. Action review

Candidate action statement:

The crew managed the aircraft flight path/power/energy state in a way that allowed low airspeed and high descent rate to develop before recovery.

Review questions:

Question    Answer    Evidence / notes
Are control inputs known?    TBD    
Is there evidence of incorrect action execution?    TBD    
Is action failure distinguishable from perception failure?    TBD    
Is overtorque part of recovery rather than unsafe act?    TBD    
Should A remain possible but not primary?    TBD    

Reviewer decision:

A_STRONG_CANDIDATE
A_PLAUSIBLE_CANDIDATE
A_WEAK_CANDIDATE
A_INSUFFICIENT

Reviewer notes:

TBD

---

## 11. Candidate-quality decision for REAL-EVENT-0001

Complete after sections 4–10.

Decision item    Result
Source sufficient?    TBD
Escape point accepted?    TBD
Unsafe act accepted?    TBD
Unsafe condition accepted?    TBD
Direct actor sufficient?    TBD
P candidate strength    TBD
O candidate strength    TBD
A candidate strength    TBD
Preconditions useful?    TBD
Ambiguity acceptable for candidate?    TBD

Final reviewer decision:

APPROVE_FOR_CANDIDATE_DRAFT
KEEP_AS_FACTUAL_HARVEST_ONLY
REQUIRES_MORE_SOURCE_EXTRACTION
REJECT_FOR_CANDIDATE_USE

Reviewer summary:

TBD

---

PART B — REAL-EVENT-0002: S-76C++ G-WIWI Peasmarsh

## 12. Review target

Event: REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh
Current status: DRAFT_FOR_REVIEW
Current hypothesis: ambiguous P/O/A; adversarial case
Candidate use: GOOD_BASELINE_CANDIDATE_AFTER_REVIEW / ADVERSARIAL_CASE
Decision needed: whether this event has enough evidence to become a candidate-quality example later.

---

## 13. Source sufficiency questions

Question    Answer    Evidence / notes
Is the source official or primary?    TBD    AAIB field investigation expected.
Is the chronology sufficiently detailed?    TBD    
Are PF and PM roles identified?    TBD    
Is the discontinued approach sequence clear?    TBD    
Are EGPWS warnings documented factually?    TBD    
Is crew non-awareness of EGPWS warnings supported?    TBD    
Is go-around planning/briefing factually documented?    TBD    
Are report conclusions separable from factual evidence?    TBD    

Reviewer decision:

SOURCE_SUFFICIENT
SOURCE_PARTIAL
SOURCE_INSUFFICIENT

---

## 14. Safe operation escape point review

Candidate escape point:

The escape point likely occurred at the transition from approach to discontinued approach/go-around, where the absence of a protected route and degraded visual conditions allowed the flight path to descend toward obstacles.

Review questions:

Question    Answer    Evidence / notes
Is the escape point tied to the discontinued approach transition?    TBD    
Is the lack of go-around routing a precondition or part of escape point?    TBD    
Is descent toward trees the unsafe state or only outcome evidence?    TBD    
Is this escape point too dependent on AAIB judgement?    TBD    
Should the escape point be earlier, during approach planning?    TBD    

Reviewer decision:

ESCAPE_POINT_ACCEPT
ESCAPE_POINT_REVISE
ESCAPE_POINT_REJECT

Required revised wording if needed:

TBD

---

## 15. Unsafe act / unsafe condition review

Candidate unsafe act:

The crew executed or transitioned into a discontinued approach/go-around flight path that descended toward the tops of trees.

Candidate unsafe condition:

Night private-site approach in reduced visibility/low cloud with obstacle environment and no available or briefed go-around procedure/routing.

Review questions:

Question    Answer    Evidence / notes
Is discontinued approach itself safe/appropriate but execution unsafe?    TBD    
Is the unsafe act really the flight path after go-around?    TBD    
Is there evidence of control/navigation error?    TBD    
Is the unsafe condition independently strong?    TBD    
Should go-around plan absence be precondition rather than unsafe condition?    TBD    

Reviewer decision:

UNSAFE_ACT_ACCEPT
UNSAFE_ACT_REVISE
UNSAFE_ACT_INSUFFICIENT
UNSAFE_CONDITION_ACCEPT
UNSAFE_CONDITION_REVISE
UNSAFE_CONDITION_INSUFFICIENT

Required revised wording if needed:

TBD

---

## 16. Direct actor review

Current direct actor candidate:

Flight crew, with PF/PM separation pending.

Review questions:

Question    Answer    Evidence / notes
Can direct actor be assigned to PF?    TBD    
Can direct actor be assigned to PM?    TBD    
Is this primarily crew-level planning/briefing?    TBD    
Is this multi-actor: planning + flight path + monitoring?    TBD    
Should this be retained as "flight crew" for candidate draft?    TBD    

Reviewer decision:

DIRECT_ACTOR_PF
DIRECT_ACTOR_PM
DIRECT_ACTOR_FLIGHT_CREW
DIRECT_ACTOR_MULTI_ACTOR
DIRECT_ACTOR_INSUFFICIENT

Reviewer notes:

TBD

---

## 17. Perception review

Candidate perception statement:

The crew may not have perceived or registered the EGPWS warnings and/or obstacle proximity in time to prevent the descent toward trees.

Review questions:

Question    Answer    Evidence / notes
Is crew non-awareness of EGPWS warnings factual?    TBD    
Is there evidence why warnings were not perceived?    TBD    
Was obstacle proximity visually available?    TBD    
Were altitude/flight path cues available?    TBD    
Is P supported independently of the warning issue?    TBD    
Is P too strong without knowing why warnings were not noticed?    TBD    

Reviewer decision:

P_STRONG_CANDIDATE
P_PLAUSIBLE_CANDIDATE
P_WEAK_CANDIDATE
P_INSUFFICIENT

Reviewer notes:

TBD

---

## 18. Objective review

Candidate objective statement:

The crew objective appears to have been to discontinue the night approach and transition to an alternative flight path; the safety issue may relate to the lack of a pre-briefed/protected go-around objective/path rather than an intentionally unsafe goal.

Review questions:

Question    Answer    Evidence / notes
Was the objective to discontinue appropriate?    TBD    
Was the objective/path insufficiently specified?    TBD    
Is absence of a briefed route objective-level or precondition-level?    TBD    
Is there evidence of conscious unsafe continuation?    TBD    
Should O remain secondary/weak?    TBD    

Reviewer decision:

O_STRONG_CANDIDATE
O_PLAUSIBLE_CANDIDATE
O_WEAK_CANDIDATE
O_INSUFFICIENT

Reviewer notes:

TBD

---

## 19. Action review

Candidate action statement:

The crew's flight path during the discontinued approach/go-around allowed descent toward obstacles.

Review questions:

Question    Answer    Evidence / notes
Is flight path execution sufficiently documented?    TBD    
Are control inputs or trajectory choices documented?    TBD    
Was the flown path inconsistent with safe go-around?    TBD    
Is A distinguishable from lack of go-around plan?    TBD    
Is A distinguishable from not perceiving warnings/obstacles?    TBD    

Reviewer decision:

A_STRONG_CANDIDATE
A_PLAUSIBLE_CANDIDATE
A_WEAK_CANDIDATE
A_INSUFFICIENT

Reviewer notes:

TBD

---

## 20. Candidate-quality decision for REAL-EVENT-0002

Complete after sections 13–19.

Decision item    Result
Source sufficient?    TBD
Escape point accepted?    TBD
Unsafe act accepted?    TBD
Unsafe condition accepted?    TBD
Direct actor sufficient?    TBD
P candidate strength    TBD
O candidate strength    TBD
A candidate strength    TBD
Preconditions useful?    TBD
Ambiguity acceptable for candidate?    TBD

Final reviewer decision:

APPROVE_FOR_CANDIDATE_DRAFT
KEEP_AS_FACTUAL_HARVEST_ONLY
REQUIRES_MORE_SOURCE_EXTRACTION
REJECT_FOR_CANDIDATE_USE

Reviewer summary:

TBD

---

PART C — Cross-event review

## 21. Comparative questions

Question    REAL-EVENT-0001 Thebaud    REAL-EVENT-0002 Peasmarsh    Notes
Is the strongest candidate axis P?    TBD    TBD    
Is O more than contextual?    TBD    TBD    
Is A distinguishable from P/O?    TBD    TBD    
Are preconditions strong enough to catalog?    TBD    TBD    
Is the direct actor clear enough?    TBD    TBD    
Is ambiguity acceptable for candidate draft?    TBD    TBD    
Should this be baseline-quality or validation-only?    TBD    TBD    

---

## 22. Anti-shortcut checklist

The reviewer must explicitly reject or justify each shortcut:

Shortcut    Reject / justify    Notes
DVE = P failure    TBD    
Night approach = P failure    TBD    
Go-around issue = A failure    TBD    
Poor planning = O failure    TBD    
Warning issue = P failure    TBD    
Report finding = expected SERA value    TBD    
Crew-level label = direct actor clarity    TBD    

---

## 23. Recommended output after human review

After this review, each event should receive one of:

APPROVE_FOR_CANDIDATE_DRAFT
KEEP_AS_FACTUAL_HARVEST_ONLY
REQUIRES_MORE_SOURCE_EXTRACTION
REJECT_FOR_CANDIDATE_USE

If approved for candidate draft, the next phase should create:

docs/real-event-harvest/REAL_EVENT_CANDIDATE_DRAFTS_0001_0002_v0.1.4.md

Still do not create JSON fixtures until a separate explicit phase.

---

## 24. Status

This file is a human review aid.

It does not create expected values.

It does not approve candidates.

It does not alter SERA.

It does not alter the baseline.
