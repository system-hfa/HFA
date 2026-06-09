# SERA vNext — Violation Awareness Remediation

## Problem (NF-01)
The violation-awareness triad (knownRule AND explicitAwareness AND consciousDeviation) was correctly blocking false O-B/O-C attributions, but was too strict — real violations expressed in natural language were not detected.

## Changes

### Three-Tier Violation Detection in evaluate-node.ts
1. **Tier 1 — Strict triad with contextual window**: All three concepts present within 3 sentences → violation path
2. **Tier 2 — Triad without window**: All three concepts present (negation-aware) anywhere in evidence → violation path
3. **Tier 3 — Two of three with awareness**: explicitAwareness + (knownRule OR consciousDeviation) → violation path

### Expanded Concept Patterns for Violation Awareness

#### knownRule — natural expressions added:
- PT: "sabia que não devia", "o manual exigia", "estava estabelecido que"
- EN: "knew that...should not", "the SOP required", "was required to"

#### explicitAwareness — natural expressions added:
- PT: "sabia que", "tinha consciência de que", "comentou que estava abaixo", "mesmo sabendo"
- EN: "knew that", "was aware that", "realized that", "even though knowing"

#### consciousDeviation — natural expressions added:
- PT: "decidiu continuar mesmo", "optou por não interromper", "contrariando o procedimento"
- EN: "decided to continue even though", "chose not to abort", "in violation of the procedure"

### Negation-Aware Matching
All violation concept checks now use `hasConceptWithoutNegation()`, which filters out negated statements like "não sabia da regra" or "was not aware of the rule".

### Guardrail Update
The `awarenessMissingForViolation` guardrail now also uses negation-aware matching.

## Test Coverage
- CAL-11/CAL-12: Explicit violation awareness (O-B expected) — positive tests
- VAL-07/VAL-08: Pressure without awareness (abstention expected) — negative tests
- HLD-07/HLD-08: Ambiguous awareness (abstention expected) — boundary tests

## Remaining Limitation
Real-world violation awareness detection remains below the strict lexical tests. Natural language expressions of awareness and conscious deviation vary widely. Reviewers must independently assess awareness and intent for any O-B/O-C candidate code.
