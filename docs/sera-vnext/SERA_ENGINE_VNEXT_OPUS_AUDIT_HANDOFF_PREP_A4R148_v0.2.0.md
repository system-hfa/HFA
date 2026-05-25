# SERA Engine vNext Opus Audit Handoff Prep A4R148 v0.2.0

Status: OPUS_AUDIT_HANDOFF_PREP_RECORDED
Phase: A4R148
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Prepare internal handoff documentation for an independent Opus audit over the local 89-TXT corpus, without revising events, without P/O/A classification, and without methodology change.

## current methodology state

- A4R137: real-event P/O/A must be analyzed only at escape point.
- A4R138: mandatory real-event reaudit protocol and blockers.
- A4R140: progressive-escape handling and critical-point/outcome protections.
- A4R143: A4R142 corpus screening is intake-only, not final authority.
- A4R144-A4R146: source-slice and gate-draft planning layers only, still no P/O/A authority.
- A4R147: synthetic governance exists, but no final synthetic cases/fixtures.

## what Opus will receive

Opus audit input must be limited to:
- the pure ZIP containing the 89 local TXT files selected for corpus audit.

No repository methodology docs are required in the Opus input package for this run.

## what Opus must not receive

Do not send:
- Codex audit outputs;
- ChatGPT audit outputs;
- prior model rankings/lane decisions;
- repository control-board conclusions as answer keys;
- any pre-labeled expected category file.

## why Codex/ChatGPT reports should not be sent to Opus

1. To preserve independence and prevent anchoring bias.
2. To test whether category and lane outcomes reproduce from source evidence alone.
3. To identify genuine agreement/disagreement signal instead of prompt contamination.

## methodological rules Opus must follow

1. Perform intake classification only; no P/O/A.
2. Do not produce final causal conclusions.
3. Keep outcome, warning, and post-escape salience separate from first-departure reasoning.
4. Preserve technical/environmental negative controls where applicable.
5. Flag source-quality and OCR issues explicitly.

## key audit questions

1. Which files are strong human-factors candidates for future gate work?
2. Which files are mixed technical-human and require boundary handling?
3. Which files are technical/environmental negative controls?
4. Which files are high-value source-recovery targets?
5. Which files are insufficient, duplicate, or out of scope?
6. Which priority differences appear versus current internal intake layers?

## expected output categories

Opus output should use only:
- HF_POSITIVE_CANDIDATE
- HF_MIXED_TECHNICAL_HUMAN
- TECHNICAL_DOMINANT_NEGATIVE_CONTROL
- SYSTEMIC_ORGANIZATIONAL_BOUNDARY
- SOURCE_RECOVERY_HIGH_VALUE
- SOURCE_INSUFFICIENT_LOW_VALUE
- DUPLICATE_OR_ALREADY_TRACKED
- OUT_OF_SCOPE

## how Opus output will be reconciled later

Post-Opus reconciliation must:
1. compare Opus vs current Codex/ChatGPT intake categories;
2. isolate disagreements by category, source quality, negative control usage, and priority order;
3. send unresolved high-impact disagreements to human author decision;
4. update lanes only after explicit reconciliation outcome;
5. keep real-event P/O/A unchanged until a dedicated phase authorizes reaudit actions.

## locks preserved

- no real-event review executed
- no synthetic case created
- no synthetic fixture created
- no P/O/A classified
- no releasedCode
- no selectedCode CLASSIFIED
- no downstream
- no finalConclusion
- no HFACS
- no Risk/ERC
- no ARMS/ERC
- no recommendations
- no code, fixture, baseline, or corpus changes
