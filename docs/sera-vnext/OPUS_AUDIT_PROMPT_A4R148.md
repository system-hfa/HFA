# Opus Audit Prompt A4R148

Use this prompt in Claude Chat Opus 4.7.

---

You are performing an independent corpus intake audit for SERA methodology support.

Input:
- You will receive an integrated package with:
  - 89 local TXT files from the local corpus;
  - 25 external candidates registered in A4R149 (metadata layer);
  - integrated reconciliation/source-hygiene metadata from A4R150/A4R151/A4R151b.
- Use only the provided package.
- Do not use internet or external sources.

Scope:
- Audit the integrated universe (89 local TXT + 25 external candidates) by methodological value only.
- Do not classify P/O/A.
- Do not generate final causal conclusions.
- Do not generate HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- Do not assume any prior model output.

Lane separation is mandatory:
- FULL_UNIVERSE_SCREENING: all 89 TXT + 25 external candidates.
- DEEP_REVIEW_CORE: OPUS_READY_CORE.
- DEEP_REVIEW_NEGATIVE_CONTROLS: OPUS_READY_NEGATIVE_CONTROLS.
- SOURCE_RECOVERY_CRITIQUE: OPUS_SOURCE_RECOVERY_PENDING items.
- EXCLUDE_FOR_NOW: do not use for strong claims.

Required categories (use exactly these labels):
1. HF_POSITIVE_CANDIDATE
2. HF_MIXED_TECHNICAL_HUMAN
3. TECHNICAL_DOMINANT_NEGATIVE_CONTROL
4. SYSTEMIC_ORGANIZATIONAL_BOUNDARY
5. SOURCE_RECOVERY_HIGH_VALUE
6. SOURCE_INSUFFICIENT_LOW_VALUE
7. DUPLICATE_OR_ALREADY_TRACKED
8. OUT_OF_SCOPE

Evaluation expectations:
- Distinguish human-factor signal from technical/environmental dominance.
- Preserve negative controls when first departure appears technical/environmental/exogenous.
- Flag source-quality issues (OCR, truncation, ambiguity).
- Avoid outcome-driven overclassification.
- Identify potential false positives and false negatives from prior internal triage.
- Highlight events that Codex/ChatGPT may have underestimated.

Output format:

1) Quantitative summary
- count by category
- total files screened

2) Ranked table (highest priority first)

| rank | eventOrFile | category | suggestedLane | confidence (HIGH/MEDIUM/LOW) | why | nextAction |
|---|---|---|---|---|---|---|

2.1) Lane coverage table

| lane | evaluatedCount | topItems | notes |
|---|---:|---|---|
| FULL_UNIVERSE_SCREENING |  |  |  |
| DEEP_REVIEW_CORE |  |  |  |
| DEEP_REVIEW_NEGATIVE_CONTROLS |  |  |  |
| SOURCE_RECOVERY_CRITIQUE |  |  |  |
| EXCLUDE_FOR_NOW |  |  |  |

3) Disagreement-risk notes
- files likely to create classification disagreement across models
- files that should require human author decision

4) Audit caveats
- source limitations
- assumptions used

Do not output P/O/A labels.
Do not output finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.

---
