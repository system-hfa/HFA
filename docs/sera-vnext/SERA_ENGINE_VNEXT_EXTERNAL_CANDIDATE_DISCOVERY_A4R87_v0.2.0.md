# SERA Engine vNext External Candidate Discovery A4R87 v0.2.0

Status: CHATGPT_CURATED_DISCOVERY  
Phase: A4+R-87 — External Candidate Discovery  
CuratedBy: ChatGPT web/search  
CodexRole: repository versioning only  
DOCS_ONLY  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_NEW_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Scope and Operating Rule
- External primary search was performed in ChatGPT with official sources.
- Codex role in A4+R-87 is versioning/organization of the already curated list.
- No new candidate was added by Codex.
- No SERA P/O/A classification was performed in this phase.
- No extraction run was executed in this phase.

## Prioritized External Agencies
- NTSB / CAROL
- AAIB UK
- BEA France
- ATSB Australia
- TSB Canada

## Curated Candidate Inventory (16)
| candidateId | priority | event | agency | officialUrl | SERA gap target | recommendedUse | misuseRisk | shortlistedBatch1 |
|---|---|---|---|---|---|---|---|---|
| A4R87-EXT-001 | P1 | TSB A19A0055, S-92A near Sable Island | TSB | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2019/a19a0055/a19a0055.html | A axis evidence, PF/PM, feedback/checking, offshore low-energy | Source enrichment and action/monitoring challenge case | Importing investigation conclusion as SERA code | yes |
| A4R87-EXT-002 | P1 | NTSB ERA19FA210, AW139 night water, EGPWS warnings | NTSB | https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/99766/pdf | Perception vs action, warning response, CRM, instrument monitoring | Boundary challenge for P/A without forced labeling | Treating warning non-response as automatic code | yes |
| A4R87-EXT-003 | P1 | AAIB 5/1988, S-76A G-BHYB | AAIB UK | https://www.gov.uk/aaib-reports/5-1988-sikorsky-s-76a-g-bhyb-9-december-1987 | Offshore night approach, spatial perception, helideck cues | Source enrichment/reference anchor for known corpus case | Duplicating an already known case as entirely new | yes |
| A4R87-EXT-004 | P1 | TSB A15P0217, S-76C+ Tofino night approach | TSB | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2015/a15p0217/a15p0217.html | P-G stability, monitoring, PF/PM perception/action | Reinforce or challenge REAL-EVENT-0003 P-G pilot release | Auto-promoting enrichment into release change | yes |
| A4R87-EXT-005 | P1 | ATSB AO-2024-007, E190 mode/config confusion | ATSB | https://www.atsb.gov.au/investigations/ao-2024-007 | Automation mode awareness, P-C vs P-G | Fixed-wing adversarial mode-awareness candidate | Merging config error into objective/action without path separation | yes |
| A4R87-EXT-006 | P1 | NTSB AAR-18/02, C208B TAWS inhibited CFIT | NTSB | https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR1802.pdf | Objective non-nominal behavior, procedure/action boundary | Objective/action stress case with strict conclusion quarantine | Importing probable cause as SERA answer | yes |
| A4R87-EXT-007 | P2 | NTSB CEN10FA079, S-76C++ helideck rollover | NTSB | https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/75203/pdf | Helideck action/feedback mechanism | A axis feedback candidate in offshore context | Assuming action fault without technical decomposition | yes |
| A4R87-EXT-008 | P2 | TSB A11H0001, S-92A AFCS/go-around mode | TSB | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2011/a11h0001/a11h0001.html | Automation mode awareness offshore, P-C/P-G/A boundary | Offshore automation enrichment candidate | Attributing AFCS behavior to human fault without anchor | yes |
| A4R87-EXT-009 | P2 | TSB A23P0136, S-76C++ lightning and rapid descent | TSB | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2023/a23p0136/a23p0136.html | Condition-dominant adversarial control | Prevent human overclassification under dominant external condition | Over-attributing human failure in technical/weather dominant case | yes |
| A4R87-EXT-010 | P2 | BEA notified event PK-TVY S-76 offshore platform | BEA | https://bea.aero/en/investigation-reports/notified-events/detail/accident-to-the-sikorsky-s76-registered-pk-tvy-operated-by-travira-air-on-20-07-2021-on-soehanah-offshore-platform/ | Helideck rollover, condition vs action | Preliminary locator for enrichment planning | Treating notified preliminary page as final investigation report | yes |
| A4R87-EXT-011 | P2 | BEA notified event 5N-BQJ S-76 Bristow Nigeria | BEA | https://bea.aero/en/investigation-reports/notified-events/detail/accident-to-a-sikorsky-s76-registered-5n-bqj-and-operated-by-bristow-helicopters-ltd-occured-on-02-03-16-in-nigeria-investigation-led-by-aib---nigeria/ | Existing case enrichment, technical response boundary | Enrichment of known case references | Duplicating existing case and using locator as full primary report | yes |
| A4R87-EXT-012 | P2 | NTSB CEN17FA072, Citation CJ4 mode/autopilot status | NTSB | https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/94545/pdf | Mode awareness and feedback boundary P-C/P-G | Fixed-wing automation boundary challenge | Directly labeling mode confusion without questionPath | yes |
| A4R87-EXT-013 | P3 | TSB A12P0134, S-76A engine loss and ditching | TSB | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2012/a12p0134/a12p0134.html | Condition-dominant emergency response control | Adversarial technical control case | Turning emergency response into unsupported human fault | no |
| A4R87-EXT-014 | P3 | TSB A08O0029, S-76A medevac night collision | TSB | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2008/a08o0029/a08o0029.html | Night approach perception/action chain expansion | Optional later rotorcraft expansion | CFIT-outcome labeling without perceptual chain evidence | no |
| A4R87-EXT-015 | P3 | NTSB CEN23FA084, AP unusual attitude/conflicting inputs | NTSB | https://data.ntsb.gov/carol-repgen/api/Aviation/ReportMain/GenerateNewestReport/106588/pdf | Automation vs action boundary, conflicting inputs | Optional A axis stress case in fixed-wing context | Importing report causal language as SERA answer | no |
| A4R87-EXT-016 | P3 | BEA notified event 5N-BQG S-76C approach water impact | BEA | https://bea.aero/en/investigation-reports/notified-events/detail/accident-to-the-sikorsky-s76c-registered-5n-bqg-on-24-10-2024-near-port-harcourt-nigeria/ | Offshore approach enrichment, preliminary event tracking | Later-stage enrichment once source matures | Treating preliminary notified event as closed final report | no |

## Shortlist for External Batch 1 (12)
- A4R87-EXT-001
- A4R87-EXT-002
- A4R87-EXT-003
- A4R87-EXT-004
- A4R87-EXT-005
- A4R87-EXT-006
- A4R87-EXT-007
- A4R87-EXT-008
- A4R87-EXT-009
- A4R87-EXT-010
- A4R87-EXT-011
- A4R87-EXT-012

## Method Use Criteria
1. Source enrichment for current corpus and especially the four P-axis pilot releases.
2. Adversarial controls to prevent technical/environmental overclassification as human failure.
3. New extraction candidates for factual structuring only, without SERA coding in this phase.

## Key Risks
- Importing probable cause / contributing factors as SERA labels.
- Treating notified or preliminary pages as final reports.
- Duplicating already indexed real events without mapping linkage.
- Collapsing automation/CRM language into direct causal coding without questionPath support.
