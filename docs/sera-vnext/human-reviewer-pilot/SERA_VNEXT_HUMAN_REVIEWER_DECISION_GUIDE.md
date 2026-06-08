# SERA vNext Human Reviewer — Decision Guide

## Overview

This guide explains the three review decisions and the evidence quality rating. Use it alongside the analysis detail page during each review.

## Decision Options

### WORKING_HYPOTHESIS_ACCEPTED

Use when:
- The engine's escape point is factually grounded in the narrative
- The P-O-A decomposition is coherent and plausible
- Preconditions are relevant and not contradicted by the narrative
- Uncertainties are accurately flagged
- You agree the escape point represents a meaningful opportunity for intervention

This does NOT mean the analysis is final. It means the candidate analysis is a valid working hypothesis for further human review and documentation.

### RETURN_FOR_REANALYSIS

Use when:
- The escape point is factually wrong or misidentified
- The P-O-A decomposition is incoherent or contradicts the narrative
- Critical information is missing that would change the escape point selection
- The engine output contains a structural error (e.g., wrong temporal order)
- You want the engine to re-run with the same narrative to see if a better output is produced

Note: Returning for reanalysis creates a revision 2. The engine re-runs the full pipeline. Use this sparingly — if the narrative itself is insufficient, prefer `REQUIRES_MORE_EVIDENCE`.

### REQUIRES_MORE_EVIDENCE

Use when:
- The narrative is too sparse to identify a meaningful escape point
- There are too many competing hypotheses without data to distinguish them
- The source document would need additional information (CVR, DFDR, ATC transcripts) that is not available
- The engine flagged `INSUFFICIENT_EVIDENCE` or similar and you agree

This decision records the limitation in the audit trail without running a new engine pass.

## Evidence Quality

### SUFFICIENT

The narrative contains enough factual information to support the engine's output and your review decision. You can make a determination with confidence.

### PARTIAL

The narrative has some ambiguity or gaps, but enough information exists to form a working hypothesis. Note the gaps in your review notes.

### INSUFFICIENT

The narrative lacks the information needed to make a determination. Typically paired with `REQUIRES_MORE_EVIDENCE`.

## Review Note Requirements

Your review note must:
1. State the primary basis for your decision (1-2 sentences)
2. Identify any specific factual mismatch, gap, or confirmation that drove the decision
3. Be in Portuguese or English (both are accepted)

Example (WORKING_HYPOTHESIS_ACCEPTED):
> "O ponto de fuga candidato está bem fundamentado na narrativa. O copiloto teve oportunidade de intervir após o GPWS mas a janela de 4s é coerente com o desvio documentado."

Example (RETURN_FOR_REANALYSIS):
> "A decomposição P-O-A inverte a sequência temporal — a percepção é atribuída ao PF mas a narrativa indica que foi o PM que notou o desvio primeiro. Solicitar reanálise."

Example (REQUIRES_MORE_EVIDENCE):
> "A narrativa não especifica o momento de transferência de controles entre PF e PM. Sem essa informação, não é possível identificar o ponto de fuga com confiança."

## What the Engine Output Represents

The engine output is a **candidate-only, non-final working hypothesis**. It is:
- Not reviewed by a regulatory authority
- Not an official incident classification
- Not admissible as an operational safety finding
- Not final in any sense

Your role is to assess whether the engine's candidate is a reasonable starting point for a human-reviewed analysis, not to approve a final determination.
