# HFA Product Alpha Closure

Product Alpha remains candidate-only. The real bug was in O_RULES Tier 3: awareness plus continuation could open the violation path without known-rule evidence. The fix requires hasKnownRule && hasAwareness for that partial triad branch.

Changed file: frontend/src/lib/sera-vnext/canonical-tree/evaluate-node.ts.

Verification:
- PRODUCT_ALPHA_CANDIDATE_ONLY_OK in tmp/hfa-global-regression-closure/targeted-after-cleanup.log.
- Final-output locks remain covered by product-unification/final-output-lock-trial-001 in the canonical run.
- No canonical tree, taxonomy, fixture, or expected-output rewrite was made.
