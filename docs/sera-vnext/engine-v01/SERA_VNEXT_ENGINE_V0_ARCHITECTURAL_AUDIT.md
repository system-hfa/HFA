# SERA vNext Engine V0 Architectural Audit

Date: 2026-06-07
Scope: `frontend/src/lib/sera-vnext/engine-v0`, canonical tree support files, and validation harnesses.

## Finding

V0 used a code-first architecture for P/O/A classification:

1. `step08-canonical-traversal.ts` normalized the complete narrative text.
2. Axis helpers selected a leaf code directly from keywords.
3. The engine reconstructed a canonical path for the selected leaf.

This made the canonical tree a post-hoc explanation layer rather than the decision procedure.

## Evidence

The removed V0 helpers were:

- `inferPerceptionCode`
- `inferObjectiveCode`
- `inferActionCode`
- `buildCanonicalPathForLeaf` use in engine traversal

The V0 failure mode was `CODE_FIRST_THEN_PATH_RECONSTRUCTION`.

## Methodological Risk

Code-first selection can emit a plausible P/O/A code without proving that each canonical node was answered from admissible evidence. It also makes post-escape filtering weaker because the selected code can be influenced by facts outside the escape-point window.

## Required Correction

Replace code-first selection with `EVIDENCE_FIRST_CANONICAL_TRAVERSAL`:

- extract evidence before axis traversal;
- classify temporal relation before causal use;
- evaluate canonical nodes one by one;
- stop when evidence is insufficient;
- emit a code only when a canonical leaf is reached by evidence-backed answers;
- preserve candidate-only output locks.

## Scan Result

The v0.1 scan found no remaining use of:

- `inferPerceptionCode`
- `inferObjectiveCode`
- `inferActionCode`
- `buildCanonicalPathForLeaf`
- `proposedCode: infer...`

`assertCanonicalSeraLeafCode` remains only as a terminal-code guard after evidence traversal reaches a leaf.
