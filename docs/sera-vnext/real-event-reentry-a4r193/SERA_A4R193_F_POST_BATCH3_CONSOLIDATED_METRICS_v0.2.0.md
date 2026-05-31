# SERA A4R193-F Post-Batch3 Consolidated Metrics v0.2.0

Status:
- DOCS_ONLY
- CANDIDATE_ONLY
- NO_FINAL_CLASSIFICATION
- NO_PRODUCT_OPENING

## 1. Consolidated totals

- total events in post-Batch3 tracker: `16`
- ready for candidate-only trial: `6`
- hold/source-enrichment population: `10`

## 2. Distribution by point topology

- `progressive`: `5`
- `discrete`: `1`
- `diffuse`: `2`
- `pending_topology_enrichment`: `8`

## 3. Distribution by agentKind

- `crew_collective`: `5`
- `maintenance_or_org`: `1`
- `system_or_condition_dominant`: `2`
- `pending_source_enrichment`: `5`
- `crew_collective_pending_split`: `1`
- `quarantined_legacy_unknown`: `2`

## 4. Distribution by source quality

- `HIGH`: `7`
- `MEDIUM`: `9`

## 5. Remaining gaps and risk posture

1. PF/PM/FE decomposition remains open (notably Colgan 3407 and crew-integrated lanes).
2. Technical-dominant boundary remains active (USAir 427 and 5N-BQJ).
3. Legacy unresolved packets still require source-hardening (American 965, Delta 191, Thebaud, Peasmarsh, Vigo).
4. Quarantined historical release-pilot cases remain excluded from reentry execution (N109W, N11NM).

## 6. RR status

- RR-001: `OPEN`
- RR-003: `PARTIALLY_MITIGATED`

## 7. Lane decisions preserved

- Daumas remains methodological/documental lane only.
- Prior real-event work remains enrichment/holds parallel lane.
- Synthetic scope remains planning-only (no synthetic event creation in this phase).
- Product/UI/API remains blocked.

## 8. Consolidated decision

- Continue real-event source enrichment before any synthetic execution.
- Keep all outputs candidate-only:
  - no selectedCode
  - no releasedCode
  - no finalConclusion
  - no downstream outputs
