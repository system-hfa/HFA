# SERA Engine vNext Curated Source Inventory A4R105 v0.2.0

Status: CURATED_SOURCE_INVENTORY  
Phase: A4+R-105  
DOCS_ONLY  
CURATION_ONLY  
SCREENING_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Scope
Inventory of local TXT corpus and Perplexity CSV metadata used for curated official-report selection planning.

## TXT inventory (`docs/sera-vnext/source-corpus/txt-events/`)
| fileName | status | intendedUse |
|---|---|---|
| pdf24_merged.txt | FOUND | PRIORITY_EVENT_CORPUS |
| pdf24_merged-2.txt | FOUND | PRIORITY_EVENT_CORPUS |
| pdf24_merged-3.txt | FOUND | PRIORITY_EVENT_CORPUS |
| pdf24_merged-5.txt | FOUND | CONTEXT_ONLY_ICAO_SMS_RISK |
| pdf24_merged-6.txt | FOUND | CONTEXT_ONLY_METHOD_FORMATION |
| pdf24_merged-7.txt | FOUND | CONTEXT_ONLY_DOD_TAXONOMY |
| pdf24_merged-8.txt | FOUND | CONTEXT_ONLY_RELIABILITY_ENGINEERING |

## CSV inventory (`docs/sera-vnext/source-corpus/perplexity-candidates/`)
| fileName | status | rows | expectedColumnsMatch |
|---|---|---:|---|
| candidateId-officialReportTitle-agency-year-aircra.csv | FOUND | 20 | yes |
| candidateId-officialReportTitle-agency-year-aircra-2.csv | FOUND | 15 | yes |

## Perplexity candidate metrics
- totalRowsAcrossCsvs: 35
- preliminaryDeduplicatedTotalByCandidateId: 35
- preliminaryDeduplicatedTotalByOfficialUrl: 35
- note: deduplication is structural metadata dedup only, not methodological validation.

## Source-use rule
- TXT files are local support corpus and event context inputs.
- Perplexity CSVs are metadata/link registries only.
- ChatGPT curated shortlist is technical pre-screening only.
- Official report source is the final factual source for future canonical trace drafting.
- Perplexity metadata does not classify SERA and cannot be used as SERA answer key.

## Guardrails
- Do not map `likelyHumanFactorAxis` directly to any SERA code.
- Do not use CSV narrative as factual evidence.
- Use only official report factual records in future canonical trace drafts.
