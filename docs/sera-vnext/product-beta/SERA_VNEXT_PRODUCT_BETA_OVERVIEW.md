# SERA vNext Product Beta Overview

Status target: `SERA_VNEXT_PRODUCT_BETA_INTERNAL_READY`.

Product Beta turns the validated SERA vNext engine v0.1 into an internal, persistent, auditable workflow. It remains candidate-only: the machine output is a working hypothesis for human review and never a final SERA classification.

Permanent locks:

- `selectedCode = null`
- `releasedCode = null`
- `finalConclusion = null`
- `classifiedOutput = false`
- `readyPromotion = false`
- `downstreamAllowed = false`

Feature flags default to disabled:

- `SERA_VNEXT_PRODUCT_BETA_ENABLED=false`
- `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=false`
