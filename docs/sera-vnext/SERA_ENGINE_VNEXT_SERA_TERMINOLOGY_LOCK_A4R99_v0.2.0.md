# SERA Engine vNext SERA Terminology Lock A4R99 v0.2.0

Status: SERA_TERMINOLOGY_LOCK  
Phase: A4+R-99  
DOCS_ONLY  
CANONICAL_ASSET_ONLY  
TERMINOLOGY_LOCK

## Terminology Rule
- Use `SERA`.
- Do not use hybrid slash naming forms (for example, mixed dual labels) as active methodology naming in vNext governance and canonical-trace assets.

## Canonical Tree Rule
- The canonical decision tree for this project is the canonical SERA tree.
- Reference cases, calibration traces, questionPath, adjudicações, dossiês, and front-end calibration artifacts must use exact canonical SERA tree questions.
- If canonical tree text is missing: `REAL_TREE_MISSING` and stop.
- If a required canonical node is missing: `CANONICAL_NODE_MISSING` and stop.
- Never replace missing canonical questions with generic equivalents.

## Objective Guardrail
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- Active objective codes remain `O-A`, `O-B`, `O-C`, `O-D`.
- `O-E` is allowed only as negative/guardrail wording.

## Prompt Governance
Every future prompt for reference/canonical-trace work must explicitly require:
- exact canonical SERA questions;
- `canonicalTreeSource`;
- `nodeId`;
- `exactQuestionTextPT`;
- `exactQuestionTextENAnchor`;
- answer option and next node/leaf;
- evidence per answer.
