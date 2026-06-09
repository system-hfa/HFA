# SERA vNext — Post-Pilot Opus Audit Plan

## Trigger
After the controlled human pilot phase has collected sufficient data (minimum: 50 reviewed analyses with reviewer feedback).

## Model
Claude Opus 4.8 (or later) — maximum effort, independent read-only audit.

## Audit Questions

### Real-World Recall
1. What is the actual code recall on pilot narratives, split by PT/EN?
2. What is the abstention rate? Is it declining as concept patterns expand?
3. Which concepts are most frequently missed by the engine?

### Violation Awareness
4. How many O-B/O-C cases did reviewers assign that the engine missed?
5. Is the 3-tier detection catching real violations without false positives?
6. Are there false violation attributions that need the gate tightened?

### Guardrails
7. Which guardrails fired most frequently during the pilot?
8. Were any guardrail violations ignored by reviewers?
9. Did any guardrail false-positive cause unnecessary rework?

### Reviewer Experience
10. Did reviewers find the GuardrailPanel useful?
11. Was "candidate-only" clear to reviewers?
12. How often did reviewers return analyses for reanalysis?

### Portuguese
13. Did PT recall improve with pattern expansion during pilot?
14. What PT expressions were missed that should be added?

### Methodology
15. Any methodology violations (O-E, code-first, post-escape) detected during pilot?
16. Are the final output locks still holding?

## Deliverables
- Updated closure verification matrix
- Go/no-go for internal beta
- Prioritized list of remaining findings
- Recommendation on common flow vNext enablement
