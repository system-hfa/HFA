# SERA A4R193-I Post-American 965 Consolidated Metrics v0.2.0

Status:
- DOCS_ONLY
- CANDIDATE_ONLY
- NO_FINAL_CLASSIFICATION
- NO_PRODUCT_OPENING

## 1. Consolidated totals post-H

- total consolidated records post-American 965: `17`
- ready for candidate-only trial: `7`
- hold or source-enrichment population: `10`

Contagem reconciliation:
- F tracker tinha `16` registros.
- H adicionou uma linha operacional de reentry para American 965 (`REAL-EVENT-AMERICAN-965-CALI-1995-REENTRY-001`).
- O slot legado `A4R193D-CAND-002` foi mantido como trilha de auditoria e reconciliation, resultando em `17` registros no consolidado I.

## 2. Distribution by point topology

- `progressive`: `6`
- `discrete`: `1`
- `diffuse`: `2`
- `pending_topology_enrichment`: `8`

## 3. Distribution by agentKind

- `crew_collective`: `6`
- `maintenance_or_org`: `1`
- `system_or_condition_dominant`: `2`
- `pending_source_enrichment`: `5`
- `crew_collective_pending_split`: `1`
- `quarantined_legacy_unknown`: `2`

## 4. Distribution by source quality

- `HIGH`: `7`
- `MEDIUM_HIGH`: `1`
- `MEDIUM`: `7`
- `MEDIUM_WITH_CAUTION`: `1`
- `HIGH_FOR_FACTS_MEDIUM_FOR_BOUNDARY`: `1`

## 5. READY candidate-only list

- Copterline S-76C+ Estonia 2005
- Asiana 214 SFO 2013
- Comair 5191 LEX 2006
- United 173 PDX 1978
- American 1420 LIT
- UPS 1354 BHM
- American 965 Cali

## 6. HOLD or source-enrichment list

- Delta 191
- Colgan 3407 BUF
- USAir 427 PIT 1994
- 5N-BQJ legacy
- Thebaud legacy
- Peasmarsh legacy
- Vigo legacy
- N109W release pilot legacy
- N11NM release pilot legacy
- American 965 legacy enrichment slot (audit continuity row)

## 7. Remaining methodology gaps

1. PF PM FE decomposition remains unresolved in selected lanes, notably Colgan 3407.
2. Technical-dominant boundary remains active in USAir 427 and 5N-BQJ.
3. Legacy lanes (Thebaud Peasmarsh Vigo) still require source-hardening under current contract.
4. Quarantined historical release-pilot rows remain excluded from execution lanes.

## 8. American 965 impact on coverage

- American 965 moved from enrichment-only queue to active candidate-only reentry row under passive intake contract.
- Coverage improved on multi-actor framing with explicit scope, anchor, and axis metadata completeness.
- No expansion to final-classification surfaces.

## 9. RR status

- RR-001: `OPEN`
- RR-003: `PARTIALLY_MITIGATED`

## 10. Scope decisions preserved

- Product UI API remains blocked.
- Synthetic creation remains blocked in this phase.
- Only future design-only synthetic planning may be considered with explicit approval and human review.
