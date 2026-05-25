# A4R150 QA Patch Before Opus v0.2.0

Status: QA_PATCH_RECORDED
Phase: A4R150a
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Review and patch factual/mechanical inconsistencies in A4R150 before any push or Opus handoff.

## scope

- Audit alias/path consistency across matrix, manifest, source-recovery queue, post-Opus plan, and registry.
- Validate COUGAR A11H0001 vs A09A0016 separation.
- Validate additional high-risk alias pairs.
- Recount key metrics from registry after patch.

## problems found

1. COUGAR-A11H0001 was incorrectly mapped to local TXT of TSB-A09A0016.
2. CARSON-S-61N was incorrectly mapped to AAIB S-61N local files (different events).
3. ASIANA-214 registry paths were contaminated by US-AIRWAYS-1549 files.
4. UPS-1354 registry paths were contaminated by UPS6 mirror file.
5. EC225-G-REDW-G-CHCN registry paths were contaminated by TUROY-EC225 cluster files.

## corrections applied

- COUGAR-A11H0001 set to external-only for now:
  - `localCorpusPresence=NO`
  - `localTxtPaths=<empty>`
  - moved from `OPUS_CORE_PACKET` to `OPUS_SECONDARY_PACKET`.
- COUGAR-A09A0016 preserved as separate negative control with its original local TXT mapping.
- CARSON-S-61N set to external-only source confirmation lane:
  - `localCorpusPresence=NO`
  - `localTxtPaths=<empty>`
  - moved from `OPUS_SECONDARY_PACKET` to `OPUS_SOURCE_RECOVERY_ONLY`.
- ASIANA-214 local path set reduced to ASIANA-only files.
- UPS-1354 local path set reduced to UPS-1354-only file.
- EC225-G-REDW-G-CHCN local path set reduced to the direct AAIB event file.
- Manifest packet counts and entries updated accordingly.
- Post-Opus 3-5 suggestion updated to remove COUGAR-A11H0001 from the first small batch.

## audited cases

- COUGAR-A11H0001 vs COUGAR-A09A0016: corrected mapping split.
- AIR-CANADA-624 vs TSB-A15H0002-AIR-CANADA-A320-HALIFAX: alias/duplicate relation valid.
- G-WNSB-SUPER-PUMA-SUMBURGH vs EUROCOPTER-AS332-L2-SUPER-PUMA-G-WNSB-SUMBU: alias/duplicate relation valid.
- UPS-1354 vs UPS-1354-NTSB-AAR1402 vs CRASH-DURING-NIGHTTIME-NONPRECISION-APPROACH: no direct mis-map after patch.
- CORPORATE-5966 vs AIRCRAFT-ACCIDENT-REPORT-AAR-06-01-CORPORAT vs CRASH-DURING-NONPRECISION-INSTRUMENT-APPROACH: first two are aliases; third is different event.
- DELTA-191 variants: duplicate/alias family preserved as negative-control context.
- EC225 G-REDW/G-CHCN vs TUROY-EC225: separated in external row mapping.
- HELIOS-522: local overlap remains valid.
- ASIANA-214: local overlap remains valid after path cleanup.
- COMAIR-5191: local overlap remains valid and control-board relation unchanged.
- QANTAS-QF32/QF72: remain external-only negative controls with confirmation pending.

## metrics (manual recount from registry)

Before patch:

- overlapLocalExternalCount: 15
- opusCorePacketCount: 10
- opusSecondaryPacketCount: 53
- opusNegativeControlPacketCount: 8
- opusSourceRecoveryOnlyCount: 19
- sourceRecoveryQueueCount: 81
- postOpusCandidateCount: 5

After patch:

- overlapLocalExternalCount: 13
- opusCorePacketCount: 9
- opusSecondaryPacketCount: 53
- opusNegativeControlPacketCount: 8
- opusSourceRecoveryOnlyCount: 20
- sourceRecoveryQueueCount: 81
- postOpusCandidateCount: 5

## controls confirmation

- No P/O/A classification created.
- No corpus TXT modified.
- No reports downloaded/versioned.
- No release/downstream activity.
- No code/fixtures/baseline/runtime/UI/API/DB/migration changes.

## final recommendation

A4R150 is safer after this QA patch. Recommendation: push A4R150 + A4R150a together only after one final human read of the updated manifest and registry.
