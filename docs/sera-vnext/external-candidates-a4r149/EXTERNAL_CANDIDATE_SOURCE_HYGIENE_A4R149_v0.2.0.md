# External Candidate Source Hygiene A4R149 v0.2.0

Status: EXTERNAL_DISCOVERY_SOURCE_HYGIENE_RECORDED
Phase: A4R149
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Source validation rules

1. Investigation-authority official links are preferred (`ntsb.gov`, `data.ntsb.gov`, `tsb.gc.ca`, `gov.uk/aaib`, `atsb.gov.au`, `bea.aero`, and equivalent authority hosts).
2. Secondary/media links are not accepted as final ingestion links and must be replaced.
3. High-value events with weak links remain in shortlist with mandatory source-recovery before ingestion.
4. This phase is discovery-only and does not validate corpus authority or P/O/A authority.
5. No report download is allowed in this phase.

## Events requiring link repair

| id | eventName | sourceValidationStatus | sourceHygieneNotes | nextSourceAction |
|---|---|---|---|---|
| EXT-A4R149-001 | Colgan Air 3407 – Loss of control on approach | OFFICIAL_LINK_NEEDS_CONFIRMATION | Official NTSB domain appears present, but URL string includes trailing annotation token; verify canonical page/PDF. | Normalize URL to canonical NTSB page and lock evidence anchor references for future extraction batch. |
| EXT-A4R149-002 | Asiana 214 – Descent below visual glidepath | SECONDARY_LINK_NEEDS_REPLACEMENT | Current link is media-hosted PDF; replace with NTSB official CAROL/AAR-14/01 URL before any ingestion. | Replace media PDF with NTSB CAROL/AAR official link; then keep candidate for high-priority future ingestion. |
| EXT-A4R149-003 | UPS 1354 – Nighttime nonprecision approach CFIT | OFFICIAL_LINK_NEEDS_CONFIRMATION | Official NTSB PDF path likely valid but contaminated by trailing token; normalize canonical NTSB URL. | Confirm canonical NTSB AAR-14/02 link and retain as high-value future escape-point reaudit candidate. |
| EXT-A4R149-010 | Air France A319 F‑GRHT – Fuel indication / low fuel event | SOURCE_RECOVERY_REQUIRED | Current link is Skybrary mirror; recover official BEA file and confirm event metadata (date/registration/report match). | Perform BEA source recovery and metadata confirmation before considering extraction eligibility. |
| EXT-A4R149-011 | Qantas QF32 – A380 uncontained engine failure | OFFICIAL_LINK_NEEDS_CONFIRMATION | ATSB source is referenced indirectly; confirm final report AO-2010-089 canonical page/PDF link. | Confirm AO-2010-089 final ATSB link and keep as strong technical negative control. |
| EXT-A4R149-014 | Qantas QF72 – A330 in‑flight upset (AO‑2008‑070) | OFFICIAL_LINK_NEEDS_CONFIRMATION | ATSB final identifier is cited but URL string requires canonicalization; verify AO-2008-070 final link. | Confirm AO-2008-070 final ATSB link and keep as technical-onset negative control. |
| EXT-A4R149-015 | Air France AF66 – A380 uncontained engine failure over Greenland | SOURCE_RECOVERY_REQUIRED | Only secondary summary link is present; recover primary BEA final report before any ingestion decision. | Recover official BEA final report and supporting annexes before any ingestion decision. |
| EXT-A4R149-017 | Corporate 5966 – Kirksville J32 CFIT (AAR‑06/01) | OFFICIAL_LINK_NEEDS_CONFIRMATION | NTSB PDF path is official but link string includes annotation token; confirm canonical NTSB AAR-06/01 URL. | Normalize canonical NTSB AAR-06/01 link and retain as organizational boundary candidate. |
| EXT-A4R149-018 | Comair 5191 – Wrong runway takeoff | OFFICIAL_LINK_NEEDS_CONFIRMATION | NTSB investigation page is likely correct but string is annotated; confirm canonical DCA06MA064 URL. | Confirm canonical NTSB DCA06MA064 page and retain as systemic boundary candidate. |
| EXT-A4R149-019 | Alaska Airlines 261 – MD‑83 jackscrew failure (AAR‑02/01) | OFFICIAL_LINK_NEEDS_CONFIRMATION | Official NTSB report expected; remove secondary suffix and confirm canonical AAR-02/01 URL. | Confirm canonical NTSB AAR-02/01 link and retain as organizational/maintenance boundary candidate. |
| EXT-A4R149-020 | Carson S‑61N – 2008 firefighting crash | OFFICIAL_LINK_NEEDS_CONFIRMATION | NTSB docket-style pointer is partial; confirm correct NTSB event package (AAR-10/06 and LAX08PA259 traceability). | Resolve NTSB report/docket mapping and keep as high-value systemic boundary candidate. |
| EXT-A4R149-021 | Eastern Air Lines 401 – Everglades L‑1011 | SOURCE_RECOVERY_REQUIRED | FAA-hosted copy exists but legibility/traceability remain partial; recover cleaner official/archival source set. | Run source recovery for legible official copy and CVR/FDR-aligned references before extraction. |
| EXT-A4R149-022 | Helios 522 – Pressurization / hypoxia | OFFICIAL_LINK_NEEDS_CONFIRMATION | Current pointer is FAA-hosted copy; confirm official AAIASB primary report linkage before ingestion. | Confirm primary AAIASB official report path; keep as high-value source recovery candidate. |
| EXT-A4R149-024 | Air France A330 F‑GZCJ – Near stall / automation event | OFFICIAL_LINK_NEEDS_CONFIRMATION | BEA file appears primary but requires confirmation of date/registration/report identity before ingestion. | Confirm BEA event identity fields and retain as high-value non-fatal automation candidate. |

## Events with primary official source already adequate

| id | eventName | authority | sourceValidationStatus |
|---|---|---|---|
| EXT-A4R149-004 | G‑WNSB – Super Puma Sumburgh | AAIB (UK) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-005 | Cougar S‑92A – Inadvertent descent near water (A11H0001) | TSB (Canadá) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-006 | Jazz JZA7795 – Sault Ste. Marie unstable approach | TSB (Canadá) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-007 | Air Canada AC624 – Halifax short landing | TSB (Canadá) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-008 | CHO S‑92A – near CFIT próximo a Sable Island (A19A0055) | TSB (Canadá) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-009 | Ornge S‑76A – Moosonee CFIT após decolagem (A13H0001) | TSB (Canadá) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-012 | Cougar 91 – S‑92A main gearbox oil loss (A09A0016) | TSB (Canadá) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-013 | EC225 G‑REDW / G‑CHCN – North Sea ditchings | AAIB (UK) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-016 | Execuflight 1526 – Akron BAe‑125 (AAR‑16/03) | NTSB | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-023 | Air France 447 – A330 Atlantic (AF447) | BEA (França) | PRIMARY_OFFICIAL_LINK_PRESENT |
| EXT-A4R149-025 | TSB Air‑Taxi SII – A15H0001 | TSB (Canadá) | PRIMARY_OFFICIAL_LINK_PRESENT |

## Events needing source recovery before ingestion

| id | eventName | sourceValidationStatus | nextSourceAction |
|---|---|---|---|
| EXT-A4R149-010 | Air France A319 F‑GRHT – Fuel indication / low fuel event | SOURCE_RECOVERY_REQUIRED | Perform BEA source recovery and metadata confirmation before considering extraction eligibility. |
| EXT-A4R149-015 | Air France AF66 – A380 uncontained engine failure over Greenland | SOURCE_RECOVERY_REQUIRED | Recover official BEA final report and supporting annexes before any ingestion decision. |
| EXT-A4R149-021 | Eastern Air Lines 401 – Everglades L‑1011 | SOURCE_RECOVERY_REQUIRED | Run source recovery for legible official copy and CVR/FDR-aligned references before extraction. |

Explicit statement: no reports downloaded in this phase.
