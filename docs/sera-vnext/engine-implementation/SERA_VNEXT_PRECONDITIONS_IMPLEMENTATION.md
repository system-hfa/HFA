# SERA vNext Preconditions Implementation

Status: `IMPLEMENTED_CANDIDATE_ONLY`

Implementation file: `frontend/src/lib/sera-vnext/engine-v0/steps/09-preconditions.ts`

Inputs:

- factual extraction
- escape point
- direct actor
- candidate P/O/A axes
- evidence category rules

Output guarantees:

- Each precondition has evidence.
- Each precondition links to actor/context when available.
- Each precondition is separate from the escape point.
- `explicitlyNotEscapePoint: true`
- `basedOnCandidateCode: true`
- `nonFinal: true`
- no dependency on `releasedCode`

Supported categories:

- `PHYSICAL_CAPABILITY`
- `SENSORY_LIMITATION`
- `KNOWLEDGE_TRAINING`
- `TIME_PRESSURE`
- `COMMUNICATION_INFORMATION`
- `PROCEDURAL_MONITORING`
- `FEEDBACK_VERIFICATION`
- `INTENT_AWARENESS`
- `TEAM_COORDINATION`
- `ENVIRONMENTAL_CONTEXT`
- `TECHNICAL_CONTEXT`
- `ORGANIZATIONAL_CONTEXT`

Validation status:

- `tests/sera-vnext/engine-v0-preconditions-trial-001.ts` passed.
- Runner v0 still reports partial coverage on some authored precondition expectations, mainly `SENSORY_LIMITATION`, `ORGANIZATIONAL_CONTEXT`, and `TECHNICAL_CONTEXT` in compressed adversarial/generalization narratives.
