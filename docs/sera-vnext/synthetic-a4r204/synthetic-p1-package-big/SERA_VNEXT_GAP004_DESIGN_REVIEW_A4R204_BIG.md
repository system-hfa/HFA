# SERA vNext GAP-004 Design Review - A4R204-BIG

Phase: A4R204-BIG
Gap: GAP-004 consequence-as-cause
Status: GAP004_DESIGN_REVIEW_COMPLETE_NON_FINAL

Required locks:
- CONTROLLED_SYNTHETIC_DRAFT_ONLY
- NOT_REAL_EVENT
- NOT_BASELINE
- NOT_FIXTURE
- NOT_PRODUCT
- NOT_READY
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_CLASSIFIED_OUTPUT
- NO_DOWNSTREAM

## 1. Design Question

Can a controlled synthetic P1 draft test the consequence-as-cause trap without becoming a real event, fixture, baseline, product artifact, or final classification?

Answer: yes, if the draft makes the pre-consequence human boundary explicit and treats all later outcome signals as quarantine material.

## 2. Prior Design Basis

- A4R197-C prioritized GAP-004 as P1.
- A4R197-D defined future-only guardrails for consequence-as-cause.
- A4R198-A consolidated the GAP-004 blueprint and required the anchor before outcome.
- A4R203-BIG selected synthetic P1 work as the next active lane.
- A4R203-A confirmed Daumas as method-depth support only, especially for consequence quarantine and decision-before-outcome discipline.

## 3. New Human-Applied Support

The A4R204-BIG human-applied case adds a strong applied example:

- visible downstream signals are brief ignition, limited blade movement, and possible exposure to people/equipment;
- the human-applied escape point remains the pilot deciding to crank;
- the sharp act boundary is the lever moving out of STOP;
- team reduction and loss of cross-supervision explain vulnerability but are preconditions.

This makes the case valuable for GAP-004 because the visible consequence is tempting but must not select the cause.

## 4. Design Controls For GAP-004

The controlled synthetic draft must:

- define a pre-outcome operational boundary;
- name a direct fictional operator at that boundary;
- include a downstream consequence distractor;
- state that the distractor cannot move the anchor;
- avoid all real identifiers from the human-applied case;
- avoid final P/O/A, final escape point approval, fixture, baseline, product, or downstream output.

## 5. Rejection Conditions

Reject any future use of the draft if it:

- uses the later consequence to choose the cause;
- shifts the direct actor to a support actor without evidence at the boundary;
- imports real identifiers from the human-applied case;
- presents the fictional scenario as real;
- emits final P/O/A or active output.

## 6. Design Review Result

GAP-004 may proceed only as:

`CONTROLLED_SYNTHETIC_DRAFT_ONLY`

It remains NOT_REAL_EVENT, NOT_FIXTURE, NOT_BASELINE, NOT_PRODUCT, NOT_READY, NO_SELECTED_CODE, NO_RELEASED_CODE, NO_FINAL_CONCLUSION, NO_CLASSIFIED_OUTPUT, and NO_DOWNSTREAM.
