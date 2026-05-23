# SERA Engine vNext Technical Design v0.2.0
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-28 — SERA Engine vNext Technical Design  
Scope: technical design for an isolated causal SERA Engine vNext  
Non-scope: implementation, legacy patching, fixture creation, baseline promotion, HFACS integration, Risk Layer, A5 Risk Layer

---
## 1. Purpose
This document defines the technical design for SERA Engine vNext.  
The goal is to create a clean causal engine that implements the SERA methodological workflow explicitly and avoids contamination from the legacy engine.  
This document does not implement code.  
This document does not modify the legacy engine.  
This document does not create fixtures.  
This document does not start A5 Risk Layer.

---
## 2. Architectural decision inherited from ADR
The legacy engine is frozen as:

```text
LEGACY_SERA_ENGINE_v0.1.4_CONTAINMENT
```

vNext must be isolated.

The vNext causal engine must not include:
- HFACS mapping
- ARMS/ERC
- traditional risk matrix
- risk-profile aggregation
- dashboard rendering
- corrective-action workflow
- commercial report formatting

Those are downstream layers and must only consume validated causal output later.

---
## 3. Design principles

### 3.1 Methodology-first
The engine must follow the explicit causal workflow:

neutral factual input  
→ factual extraction  
→ operational unsafe state / safe operation escape point  
→ decision antecedents  
→ unsafe act / unsafe condition  
→ direct actor  
→ perception statement  
→ objective/goal statement  
→ action statement  
→ P/O/A classification  
→ preconditions  
→ limitations  
→ recommendations  
→ causal assurance  
→ human review

No final narrative may be generated before the structured causal state is complete.

### 3.2 Code-aware output
Final conclusions must be generated from normalized codes and statements.

Forbidden:
- P-A described as perception failure
- O-A described as objective failure
- A-A described as action failure
- unsupported A-D from aircraft-system/barrier wording
- preconditions in prose that do not exist in the structured preconditions list

### 3.3 Separation of concerns
The causal engine outputs causal analysis only.

HFACS, Risk/ERC and dashboard layers are separate consumers.

### 3.4 Evidence-first classification
Every classification must include:
- evidence used
- evidence quality
- uncertainty
- alternative considered
- reason for rejection
- human review flag

### 3.5 Unsafe-condition support
The engine must allow events to remain unsafe-condition dominant without forcing human active failure.

---
## 4. Repository boundary mapping (read-only)

### 4.1 Legacy engine core (observed)
- `frontend/src/lib/sera/pipeline.ts`
  - `runSeraPipeline` orchestration
  - deterministic/LLM mixed steps
  - payload persistence shaping
- `frontend/src/lib/sera/all-steps.ts`
  - step implementations and prompt-driven decision flow
- `frontend/src/lib/sera/types.ts`
  - public SERA legacy data contracts
- `frontend/src/lib/sera/hfacs-mapper.ts`
  - downstream HFACS mapping from P/O/A codes

### 4.2 API and persistence integration (observed)
- `frontend/src/app/api/analyze/route.ts`
  - request entrypoint and event lifecycle
- `frontend/src/lib/server/complete-sera-analysis.ts`
  - `runSeraPipeline(rawInput)` call
  - `buildAnalysisUpsertPayload(...)` call
  - write to `analyses` table

### 4.3 UI coupling points (observed)
- `frontend/src/app/(dashboard)/events/[id]/page.tsx`
  - consumes persisted fields (`conclusions`, `preconditions`, P/O/A)
  - renders HFACS and risk card as downstream views

### 4.4 Test harness coupling points (observed)
- `tests/sera/pipeline_adapter.ts`
  - imports legacy pipeline directly from `frontend/src/lib/sera/pipeline`
- `tests/sera/run.ts` and `tests/sera/runner.ts`
  - fixture execution, filtered runs, deterministic gate options

Boundary rule for vNext:
- no direct import from legacy execution modules in production path
- compatibility adapter allowed only in controlled comparison/testing phases

---
## 5. Proposed module structure
Proposed future directory:

```text
frontend/src/lib/sera-vnext/
  index.ts
  engine.ts
  types.ts
  constants.ts
  steps/
    01-factual-extraction.ts
    02-unsafe-state.ts
    03-unsafe-act-condition.ts
    04-direct-actor.ts
    05-poa-statements.ts
    06-poa-classification.ts
    07-preconditions.ts
    08-limitations.ts
    09-recommendations.ts
    10-causal-assurance.ts
    11-human-review.ts
  rules/
    poa/
    preconditions/
    assurance/
  prompts/
    factual-extraction.md
    unsafe-state.md
    poa-statements.md
  tests/
    trial-001.input.ts
    trial-001.expected.ts
```

This structure is a proposal only.
No code is created in this phase.

---
## 6. Public API design
Future engine entry point:

`analyzeSeraVNext(input: SeraVNextInput): Promise<SeraVNextResult>`

Input:

```ts
type SeraVNextInput = {
  inputId: string;
  narrative: string;
  sourceType: "neutral_trial" | "user_event" | "report_extract";
  locale?: "pt-BR" | "en";
  options?: {
    allowLlm?: boolean;
    requireHumanReview?: boolean;
    includeDebugTrace?: boolean;
  };
};
```

Output:

```ts
type SeraVNextResult = {
  engineVersion: "sera-vnext-v0.2.0";
  inputId: string;
  factualSummary: FactualSummary;
  unsafeState: OperationalUnsafeState;
  unsafeActCondition: UnsafeActConditionAnalysis;
  directActor: DirectActorAnalysis;
  poaStatements: PoaStatements;
  poaClassification: PoaClassification;
  preconditions: PreconditionsAnalysis;
  limitations: Limitation[];
  recommendations: Recommendation[];
  causalAssurance: CausalAssurance;
  humanReview: HumanReviewStatus;
  trace: SeraVNextTrace;
};
```

---
## 7. Step contracts

### 7.1 Step 1 — factual extraction
Purpose: Extract only factual content from input.

Output must include:
- actors
- aircraft/system
- operation type
- phase
- sequence
- environment
- available cues
- missing data

Must not include:
- probable cause
- risk level
- HFACS label
- SERA code
- blame wording

### 7.2 Step 2 — operational unsafe state
Purpose: Identify where safe operation was lost.

Must separate:
- `operational_unsafe_state`
- `decision_antecedents`
- `final_outcome`

Example:
- decision antecedent: crew proceeded visually after visual contact
- operational unsafe state: aircraft entered low-airspeed/high-rate-of-descent condition below safe profile without timely alert/correction

### 7.3 Step 3 — unsafe act / unsafe condition
Purpose: Separate observable human action/non-action from technical/environmental/system conditions.

Must allow:
- unsafe_act: insufficient_evidence
- unsafe_condition: dominant

### 7.4 Step 4 — direct actor
Purpose: Identify direct actor only when supported.

Allowed outputs:
- specific_actor
- crew_collective
- unknown
- multi_actor
- system_or_condition_dominant

### 7.5 Step 5 — P/O/A statements
Purpose: Generate statements before codes.

Required:
- perception_statement
- objective_statement
- action_statement
- evidence_for_each
- uncertainty_for_each

### 7.6 Step 6 — P/O/A classification
Purpose: Assign P/O/A codes only after statements exist.

Must include:
- selected_code
- confidence
- evidence
- alternatives_considered
- rejection_reason
- human_review_required

### 7.7 Step 7 — preconditions
Purpose: Identify context factors without replacing active failure analysis.

Preconditions must be structured and traceable.

### 7.8 Step 8 — limitations
Purpose: List missing data and uncertainty.

Limitations are mandatory.

### 7.9 Step 9 — recommendations
Purpose: Generate recommendations only from structured causal findings.

Recommendations must reference:
- causal finding
- precondition or barrier
- confidence level
- scope limit

### 7.10 Step 10 — causal assurance
Purpose: Run internal consistency checks.

Examples:
- P-A not narrated as perception failure
- O-A not narrated as objective failure
- A-A not narrated as action failure
- A-D requires explicit human physical/ergonomic evidence
- preconditions in conclusion must exist in structured list
- unsafe-condition dominant case must not force active failure

---
## 8. LLM usage policy
LLM may be used for extraction and statement drafting.

LLM must not be the final authority for:
- code semantics
- final P/O/A consistency
- precondition reconciliation
- causal assurance
- human review status

Deterministic post-processing must validate all LLM-produced text.

---
## 9. Legacy boundary
vNext must not import legacy functions directly from:
- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/pipeline.ts`
- `frontend/src/lib/sera/hfacs-mapper.ts`

Allowed:
- read-only comparison
- copying stable type ideas only after review
- test runner pattern reuse
- UI adapter later

If reuse is proposed, it must be explicitly documented.

---
## 10. Testing strategy

### 10.1 First acceptance test
Trial:
- TRIAL-SET1-001 / REAL-EVENT-0001

Must pass:
- no unsupported A-D
- no P-A described as perception failure
- no O-A described as objective failure
- no A-A described as action failure
- no HFACS output from causal engine
- no Risk/ERC output from causal engine
- operational unsafe state separated from decision antecedent
- limitations preserved
- warning/barrier issue preserved
- human review required

### 10.2 Additional test layers
Future layers:
- unit tests for each step
- contract tests for output schema
- assurance tests for impossible contradictions
- real-event trial tests
- legacy-vs-vNext comparison tests
- candidate-only tests
- human review checklist

### 10.3 No baseline promotion
vNext outputs cannot enter baseline until:
- Trial 001 passes
- trials 002–005 are run
- human review approves candidate conversion
- JSON candidate design is separately approved

---
## 11. Integration strategy
Initial implementation must be isolated.

No UI integration in first code phase.

Suggested phases:
- A4+R-29 — vNext Skeleton
- A4+R-30 — Step 1–3 implementation
- A4+R-31 — Trial 001 dry run
- A4+R-32 — P/O/A statements and classification
- A4+R-33 — Preconditions/limitations/recommendations
- A4+R-34 — Causal assurance
- A4+R-35 — Legacy vs vNext comparison
- A4+R-36 — UI adapter planning

---
## 12. Data and persistence policy
vNext initial runs should be pure functions or local scripts.

Do not write to Supabase initially.
Do not alter event/analysis schema.
Do not add migrations.
Do not create persistent analysis records until the engine passes isolated acceptance tests.

---
## 13. Risk/HFACS policy
HFACS and Risk/ERC remain excluded from vNext.

They may return later as separate modules:
- `sera-hfacs-adapter`
- `sera-risk-layer`

Only after causal assurance passes.

---
## 14. Open questions
Questions to resolve before implementation:
- Should vNext be fully deterministic first, with LLM only for factual extraction?
- Should P/O/A classification be rule-first or LLM-assisted with deterministic validation?
- Should preconditions use a controlled vocabulary from the start?
- Should output contract be JSON schema validated?
- Should vNext support bilingual output or canonical English internally with PT-BR rendering later?
- Where should human review decisions be stored?

---
## 15. Recommended next phase
Next phase:
- A4+R-29 — SERA Engine vNext Skeleton

Recommended tool:
- Codex controlled execution

Allowed scope:
- create `frontend/src/lib/sera-vnext/`
- create `types.ts`
- create `engine.ts` with stubbed steps
- create tests or local dry-run scaffold if safe
- no UI integration
- no database writes
- no legacy modification

---
## 16. Final status
This document defines the technical design only.

It does not implement vNext.
It does not alter the legacy engine.
It does not create fixtures.
It does not alter baseline.
It does not start A5 Risk Layer.
