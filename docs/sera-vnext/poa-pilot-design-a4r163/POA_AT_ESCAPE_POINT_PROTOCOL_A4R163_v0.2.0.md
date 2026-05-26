# P/O/A at Escape-Point Protocol A4R163 v0.2.0

Status: DESIGN_ONLY_PROTOCOL
Phase: A4R163

## 1) Required Input

- eventId
- finalConfirmedQuando
- sourceAuthority
- factualEvidenceAtOrBeforeEscapePoint
- excludedPostEscapeEvidence
- uncertaintyNotes

## 2) Perception Axis (Protocol Only, No Classification)

### Required fields

- perceptionEvidenceAvailableAtEscapePoint
- perceptionEvidenceType
- perceptionUnknowns
- perceptionBlockedIf

### Blocking criteria

- only post-escape evidence exists;
- only official probable-cause statement exists;
- intention is inferred without direct factual anchor;
- event is technical negative control with no human-origin perception evidence at onset.

## 3) Objective Axis (Protocol Only, No Classification)

### Required fields

- objectiveEvidenceAvailableAtEscapePoint
- operationalGoalAtEscapePoint
- objectiveUnknowns
- objectiveBlockedIf

### Blocking criteria

- objective is inferred from outcome/consequence;
- objective is inferred from post-escape violation;
- objective is inferred from moral/blame framing;
- organizational context is substituted for line-level operational objective.

## 4) Action Axis (Protocol Only, No Classification)

### Required fields

- actionEvidenceAvailableAtEscapePoint
- actionAtOrBeforeEscapePoint
- actionUnknowns
- actionBlockedIf

### Blocking criteria

- action appears only after escape point;
- action is only a response inside already-degraded state;
- action candidate is physical consequence rather than human act;
- technical negative control has no human-origin action at onset.

## 5) Negative Control Rule

For US-AIRWAYS-1549:

- allow result `NO_HUMAN_P_O_A_AT_ESCAPE_POINT` when onset is technical/environmental;
- do not force human P/O/A due to high-quality post-onset crew response;
- preserve separation between onset origin and subsequent mitigation.

## 6) Allowed Output in Future Pilot

- P/O/A candidate may remain unresolved.
- Axis may be blocked due to evidence constraints.
- Axis may be no-human-origin for negative control.
- Nothing becomes releasedCode.
- No downstream is opened.

## 7) Global Evidence Window Rule

- admissible evidence window: `<= escape point`;
- excluded inference window: `> escape point` for P/O/A inference;
- post-escape facts can annotate consequence/timeline only.

## 8) Explicit Locks

- NO_P_O_A_EXECUTION_IN_A4R163
- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS
