# SERA vNext Engine Validation v0.1

Generated at: 2026-06-09T13:42:05.721Z

Final decision: SERA_VNEXT_ENGINE_V01_VALIDATED_WITH_NONCRITICAL_LIMITATIONS
Product Beta gate: PRODUCT_BETA_FOUNDATION_ALLOWED

Cases: 39
Pass: 37
Noncritical: 2
Critical: 0
Fail: 0
Error: 0

## Blocking reasons
- none

## Noncritical limitations
- GEN-FIRST-AIR-6560:guardrails.consequenceUsedAsCause:v02 computed guardrail detected=consequenceUsedAsCause
- ADV-OE:guardrails.oeUsed:v02 computed guardrail detected=oeUsed

## Determinism
- OFFICIAL-COMAIR-5191: runs=5 structural=1 semantic=1
- OFFICIAL-ASIANA-214: runs=5 structural=1 semantic=1
- OFFICIAL-UPS-1354: runs=5 structural=1 semantic=1
- OFFICIAL-GAP-004: runs=5 structural=1 semantic=1
- OFFICIAL-DELTA-191: runs=5 structural=1 semantic=1
- OFFICIAL-USAIR-427: runs=5 structural=1 semantic=1
- OFFICIAL-5N-BQJ: runs=5 structural=1 semantic=1
- HUMAN-THEBAUD: runs=5 structural=1 semantic=1
- HUMAN-CRANK-2026-0001: runs=5 structural=1 semantic=1
- GEN-G-WNSB: runs=3 structural=1 semantic=1
- GEN-EXECUFLIGHT-1526: runs=3 structural=1 semantic=1
- GEN-THEBAUD: runs=3 structural=1 semantic=1
- GEN-PEL-AIR: runs=3 structural=1 semantic=1
- GEN-FIRST-AIR-6560: runs=3 structural=1 semantic=1
- GEN-AIR-CANADA-759: runs=3 structural=1 semantic=1
- GEN-TRANSASIA-GE235: runs=3 structural=1 semantic=1
- GEN-TECHNICAL-DOMINANT: runs=3 structural=1 semantic=1
- GEN-EVIDENCE-INSUFFICIENT: runs=3 structural=1 semantic=1
- GEN-NO-FAILURE: runs=3 structural=1 semantic=1
- ADV-CONSEQUENCE-AS-CAUSE: runs=3 structural=1 semantic=1
- ADV-POST-ESCAPE-P: runs=3 structural=1 semantic=1
- ADV-POST-ESCAPE-O: runs=3 structural=1 semantic=1
- ADV-POST-ESCAPE-A: runs=3 structural=1 semantic=1
- ADV-ACTOR-MIGRATION: runs=3 structural=1 semantic=1
- ADV-PRECONDITION-AS-ESCAPE: runs=3 structural=1 semantic=1
- ADV-OE: runs=3 structural=1 semantic=1
- ADV-VIOLATION-WITHOUT-AWARENESS: runs=3 structural=1 semantic=1
- ADV-INVENTED-INTENTION: runs=3 structural=1 semantic=1
- ADV-TECHNICAL-DOMINANT: runs=3 structural=1 semantic=1
- ADV-ENVIRONMENTAL-DOMINANT: runs=3 structural=1 semantic=1
- ADV-NO-FAILURE: runs=3 structural=1 semantic=1
- ADV-INSUFFICIENT-EVIDENCE: runs=3 structural=1 semantic=1
- ADV-PROGRESSIVE-ZONE: runs=3 structural=1 semantic=1
- ADV-PF-PM: runs=3 structural=1 semantic=1
- ADV-AA-AC: runs=3 structural=1 semantic=1
- ADV-OA-OC: runs=3 structural=1 semantic=1
- ADV-PC-PG: runs=3 structural=1 semantic=1
- ADV-WARNING-IGNORED: runs=3 structural=1 semantic=1
- ADV-WRONG-PERCEPTION-COHERENT-ACTION: runs=3 structural=1 semantic=1

## Product Alpha parity
- passed=true

## Case results
- OFFICIAL-COMAIR-5191 [official] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- OFFICIAL-ASIANA-214 [official] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- OFFICIAL-UPS-1354 [official] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- OFFICIAL-GAP-004 [official] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- OFFICIAL-DELTA-191 [official] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- OFFICIAL-USAIR-427 [official] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- OFFICIAL-5N-BQJ [official] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- HUMAN-THEBAUD [human] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- HUMAN-CRANK-2026-0001 [human] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-G-WNSB [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-EXECUFLIGHT-1526 [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-THEBAUD [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-PEL-AIR [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-FIRST-AIR-6560 [generalization] passed=false critical=0 noncritical=1 findings=noncritical:guardrails.consequenceUsedAsCause:v02 computed guardrail detected=consequenceUsedAsCause
- GEN-AIR-CANADA-759 [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-TRANSASIA-GE235 [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-TECHNICAL-DOMINANT [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-EVIDENCE-INSUFFICIENT [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- GEN-NO-FAILURE [generalization] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-CONSEQUENCE-AS-CAUSE [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-POST-ESCAPE-P [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-POST-ESCAPE-O [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-POST-ESCAPE-A [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-ACTOR-MIGRATION [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-PRECONDITION-AS-ESCAPE [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-OE [adversarial] passed=false critical=0 noncritical=1 findings=noncritical:guardrails.oeUsed:v02 computed guardrail detected=oeUsed
- ADV-VIOLATION-WITHOUT-AWARENESS [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-INVENTED-INTENTION [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-TECHNICAL-DOMINANT [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-ENVIRONMENTAL-DOMINANT [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-NO-FAILURE [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-INSUFFICIENT-EVIDENCE [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-PROGRESSIVE-ZONE [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-PF-PM [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-AA-AC [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-OA-OC [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-PC-PG [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-WARNING-IGNORED [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
- ADV-WRONG-PERCEPTION-COHERENT-ACTION [adversarial] passed=true critical=0 noncritical=0 findings=pass:case:output matches v0.1 methodological boundaries
