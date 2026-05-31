# SERA A4R191-G — Escape-Point Enforcement Hardening v0.2.0

## Context
Opus independent audit over A4R191-A..F returned `PASS_WITH_WARNINGS` and flagged:

- F-A HIGH: agent anchoring under ENFORCE was optional.
- F-B HIGH: A-D exception evidence for maintenance/design agents was too lexical.
- F-C MEDIUM: ENFORCE could run without deterministic temporal anchor.

## Scope
A4R191-G hardens only the candidate-only enforcement runtime in:

- `frontend/src/lib/sera-vnext/escape-point-enforcement.ts`

No UI/API/product integration was introduced.

## F-A hardening (mandatory axis agent anchoring)
Under `enforcementMode='ENFORCE'` and valid active scope:

- `axisAgentRef` is now mandatory.
- Missing `axisAgentRef` blocks with:
  - status: `ESCAPE_POINT_BLOCKED_AXIS_AGENT_REF_REQUIRED`
  - blocking issue: `EP-B09_AXIS_AGENT_REF_REQUIRED`

`PASSIVE_COMPAT` behavior remains backward-compatible and non-blocking.

## F-B hardening (own-agent physical limitation evidence for A-D)
For `maintenance_or_org` / `design_mgmt` when `proposedCode='A-D'`:

- Evidence must include physical/motor/ergonomic marker;
- Evidence must include explicit own-agent reference (`agentId` / provided axis agent ref);
- Evidence must include minimum ownership/link wording that binds limitation to that same agent.

If not clearly bound to the same agent, `EP-B04_FORBIDDEN_CODE_FOR_AGENT` remains blocked.

## F-C hardening (temporal anchor required in ENFORCE)
Under `ENFORCE`, deterministic anti-post-event now requires escape-point temporal reference:

- If missing, block with:
  - status: `ESCAPE_POINT_BLOCKED_SEQUENCE_REF_REQUIRED`
  - blocking issue: `EP-B10_SEQUENCE_REF_REQUIRED_FOR_ENFORCE`

Accepted anchor is `operationalMoment.sequenceRef` (or equivalent temporal reference field consumed by runtime).
`PASSIVE_COMPAT` remains non-blocking.

## Additive codes introduced

- `EP-B09_AXIS_AGENT_REF_REQUIRED`
- `EP-B10_SEQUENCE_REF_REQUIRED_FOR_ENFORCE`

Legacy blocking codes `EP-B01..EP-B08` remain intact.

## Candidate-only boundary preserved

- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `poaClosureAllowed=false`
- `classificationAllowed=false`
- `downstreamAllowed=false`
- `finalConclusionAllowed=false`
- `notFinalClassification=true`

No `selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, recommendations outputs.

## O-E
`O-E` remains `NON_EXISTENT_IN_SERA_PT_V1` and stays blocked as non-active code path.

