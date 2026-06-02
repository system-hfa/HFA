# SERA vNext Next Phase Decision A4R201-B

Status: NEXT_PHASE_RECOMMENDATION
Phase: A4R201-B

## Recommendation

Run A4R201-C as a source-depth and official-locator normalization phase before asking for more event scouting. The current blocker is not candidate volume; it is source quality and factual depth.

## Execute Deep Extraction

Execute deep extraction only after official locators are corrected. First lane:

1. Asiana 214.
2. UPS 1354.
3. G-WNSB Sumburgh.
4. Comair 5191.
5. Turkish 1951 after DSB source recovery.
6. Spanair JK5022 after CIAIAC source recovery.
7. Pel-Air VH-NGA after ATSB source recovery.
8. First Air 6560.
9. Air France 358 after TSB link correction.
10. TransAsia GE235 after authority locator recovery.

## Reject Or Substitute

Reject or replace C-030 unless the raw A4R201-A1 output is recovered. Reject or hold Aeroperu and Emirates unless primary official authority sources are recovered. Keep Vigo as replace unless primary CIAIAC source depth is found.

## Opus Decision

Opus is not necessary now. Use Codex/local audit for source hygiene and queue construction. Consider Opus later only for hard boundary cases after official source slices exist.

## Perplexity Decision

Do not ask Perplexity for more events now. A new search would add noise before the current candidates are reconciled, deduplicated, and source-normalized.

## Synthetic Decision

Do not introduce synthetic fill now. Synthetic fill can be considered after A4R201-C shows which real-event gap families remain uncovered by official-source detail.

## Locks Preserved

- No web search.
- No download.
- No source-corpus alteration.
- No POA final classification.
- No READY automatic promotion.
- No fixture, baseline, product, selectedCode, releasedCode, finalConclusion, or CLASSIFIED active output.
- No HFACS/Risk/ERC/ARMS/recommendations.
