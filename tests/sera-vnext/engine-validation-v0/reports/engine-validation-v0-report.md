# SERA vNext Engine Validation V0

Generated at: 2026-06-06T22:28:46.751Z

Final decision: SERA_VNEXT_ENGINE_V0_VALIDATION_BLOCKED
Product Beta gate: PRODUCT_BETA_FOUNDATION_BLOCKED

Cases: 39
Pass: 27
Partial: 12
Fail: 0
Error: 0

## Blocking reasons
- partial validations=12
- generalization cases failing=4

## Determinism
- OFFICIAL-COMAIR-5191: runs=5 structural=1 semantic=1
- OFFICIAL-ASIANA-214: runs=5 structural=1 semantic=1
- OFFICIAL-UPS-1354: runs=5 structural=1 semantic=1
- OFFICIAL-GAP-004: runs=3 structural=1 semantic=1
- OFFICIAL-DELTA-191: runs=3 structural=1 semantic=1
- OFFICIAL-USAIR-427: runs=3 structural=1 semantic=1
- OFFICIAL-5N-BQJ: runs=3 structural=1 semantic=1
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
- GEN-G-WNSB: runs=3 structural=1 semantic=1
- GEN-EXECUFLIGHT-1526: runs=3 structural=1 semantic=1
- GEN-THEBAUD: runs=3 structural=1 semantic=1
- GEN-PEL-AIR: runs=3 structural=1 semantic=1
- GEN-FIRST-AIR-6560: runs=3 structural=1 semantic=1

## Product Alpha parity
- passed=true

## Case results
- OFFICIAL-COMAIR-5191 [official] passed=true findings=pass:output matches authored boundary checks
- OFFICIAL-ASIANA-214 [official] passed=true findings=pass:output matches authored boundary checks
- OFFICIAL-UPS-1354 [official] passed=true findings=pass:output matches authored boundary checks
- OFFICIAL-GAP-004 [official] passed=true findings=pass:output matches authored boundary checks
- OFFICIAL-DELTA-191 [official] passed=true findings=pass:output matches authored boundary checks
- OFFICIAL-USAIR-427 [official] passed=true findings=pass:output matches authored boundary checks
- OFFICIAL-5N-BQJ [official] passed=true findings=pass:output matches authored boundary checks
- HUMAN-THEBAUD [human] passed=false findings=partial:escape point boundary not matched: visual approach | partial:post-escape evidence not excluded: recovery | partial:post-escape evidence not excluded: very low height above the water | partial:uncertainties below floor: 0 < 1
- HUMAN-CRANK-2026-0001 [human] passed=true findings=pass:output matches authored boundary checks
- GEN-G-WNSB [generalization] passed=true findings=pass:output matches authored boundary checks
- GEN-EXECUFLIGHT-1526 [generalization] passed=false findings=partial:post-escape evidence not excluded: impact with terrain
- GEN-THEBAUD [generalization] passed=false findings=partial:missing authored precondition category=SENSORY_LIMITATION
- GEN-PEL-AIR [generalization] passed=true findings=pass:output matches authored boundary checks
- GEN-FIRST-AIR-6560 [generalization] passed=false findings=partial:P code outside authored allowed set: null
- GEN-AIR-CANADA-759 [generalization] passed=false findings=partial:A code outside authored allowed set: A-C
- GEN-TRANSASIA-GE235 [generalization] passed=true findings=pass:output matches authored boundary checks
- GEN-TECHNICAL-DOMINANT [generalization] passed=true findings=pass:output matches authored boundary checks
- GEN-EVIDENCE-INSUFFICIENT [generalization] passed=true findings=pass:output matches authored boundary checks
- GEN-NO-FAILURE [generalization] passed=true findings=pass:output matches authored boundary checks
- ADV-CONSEQUENCE-AS-CAUSE [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-POST-ESCAPE-P [adversarial] passed=false findings=partial:post-escape evidence not excluded: finally recognized the warning
- ADV-POST-ESCAPE-O [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-POST-ESCAPE-A [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-ACTOR-MIGRATION [adversarial] passed=false findings=partial:missing authored precondition category=ORGANIZATIONAL_CONTEXT
- ADV-PRECONDITION-AS-ESCAPE [adversarial] passed=false findings=partial:O code outside authored allowed set: null | partial:missing authored precondition category=ORGANIZATIONAL_CONTEXT
- ADV-OE [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-VIOLATION-WITHOUT-AWARENESS [adversarial] passed=false findings=partial:P code outside authored allowed set: null | partial:O code outside authored allowed set: null | partial:A code outside authored allowed set: null
- ADV-INVENTED-INTENTION [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-TECHNICAL-DOMINANT [adversarial] passed=false findings=partial:missing authored precondition category=TECHNICAL_CONTEXT
- ADV-ENVIRONMENTAL-DOMINANT [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-NO-FAILURE [adversarial] passed=false findings=partial:O code outside authored allowed set: null | partial:A code outside authored allowed set: null
- ADV-INSUFFICIENT-EVIDENCE [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-PROGRESSIVE-ZONE [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-PF-PM [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-AA-AC [adversarial] passed=false findings=partial:P code outside authored allowed set: null
- ADV-OA-OC [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-PC-PG [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-WARNING-IGNORED [adversarial] passed=true findings=pass:output matches authored boundary checks
- ADV-WRONG-PERCEPTION-COHERENT-ACTION [adversarial] passed=true findings=pass:output matches authored boundary checks
