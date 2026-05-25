# Opus Audit Reconciliation Checklist A4R148

Status: RECONCILIATION_CHECKLIST_RECORDED
Phase: A4R148
methodology: SERA

Use this checklist after receiving Opus output and before any lane/status update.

## comparison blocks

### 1) category agreement
- Same category across Opus, ChatGPT, and Codex?
- If yes, mark as `AGREED`.

### 2) category disagreement
- Different category across models?
- Record exact pair/triple mismatch.
- Mark severity: `LOW`, `MEDIUM`, `HIGH`.

### 3) source quality disagreement
- Confidence/source quality mismatch?
- Is disagreement caused by OCR/coverage gap?

### 4) negative control disagreement
- Any model marks negative control while another marks HF positive?
- Require explicit review note.

### 5) source recovery disagreement
- Any model requests recovery while another marks ready?
- Flag for recovery-first decision.

### 6) candidate priority disagreement
- Priority rank differs materially?
- Capture top-10 delta and rationale.

### 7) excluded vs included mismatch
- Event/file excluded by one model but included by another?
- Record whether exclusion is scope-based or quality-based.

### 8) human author decision required
- Mark files requiring explicit author arbitration.
- Include recommended decision path.

## acceptance criteria per item

Mark each item with one result:
- `ACCEPT_AS_IS`
- `REVIEW_REQUIRED`
- `BLOCK_UNTIL_RECOVERY`

## reconciliation outcome gate

A file can move into operational lane planning only if:
1. category disagreement is resolved or accepted with rationale;
2. source-quality risk is documented;
3. negative-control conflicts are explicitly addressed;
4. no prohibited inference is being introduced.

## prohibited outcomes during reconciliation

- No P/O/A classification.
- No final causal conclusion.
- No release/downstream decision.
- No overwrite of real-event control-board authority.

## final decision register fields

For each disputed file, record:
- `eventOrFile`
- `opusCategory`
- `chatgptCategory`
- `codexCategory`
- `finalReconciledCategory`
- `reason`
- `needsAuthorDecision` (YES/NO)
- `nextAction`
