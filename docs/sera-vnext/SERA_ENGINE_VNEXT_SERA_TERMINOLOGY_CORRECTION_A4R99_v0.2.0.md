# SERA Engine vNext SERA Terminology Correction A4R99 v0.2.0

Status: SERA_TERMINOLOGY_CORRECTED  
Phase: A4+R-99  
DOCS_ONLY  
CANONICAL_ASSET_ONLY  
TERMINOLOGY_CORRECTION

## Terminology Rule
- Use `SERA` as the methodology name for this project.
- Do not use hybrid slash naming labels (for example, mixed dual labels) in governance or canonical-trace assets.
- Do not use `CERA` as the methodology name in this project.

## Canonical Tree Rule
- The canonical decision tree for this project is the canonical SERA tree.
- Reference cases, calibration traces, questionPath, adjudicações, dossiês, and front-end calibration artifacts must use exact canonical SERA tree questions.
- If canonical tree text is missing: `BLOQUEADO` and `REAL_TREE_MISSING`.
- If a required canonical node is missing: `CANONICAL_NODE_MISSING`.
- Never replace missing canonical questions with generic equivalents.

## Objective Guardrail
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- Active objective codes remain `O-A`, `O-B`, `O-C`, `O-D`.
- `O-E` is allowed only as negative/adversarial guardrail wording.

## Prompt Governance
Every future prompt for reference/canonical-trace work must explicitly require:
- exact canonical SERA questions;
- `canonicalTreeSource`;
- `nodeId`;
- `exactQuestionTextPT`;
- `exactQuestionTextENAnchor`;
- answer option and next node/leaf;
- evidence per answer.
