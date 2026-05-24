# SERA Engine vNext Official Report Source Slice Search Index A4R105B v0.2.0

Status: OFFICIAL_REPORT_SOURCE_SLICE_SEARCH_INDEX
Phase: A4+R-105b
DOCS_ONLY
SOURCE_ARCHIVE_ONLY
EXTRACTION_PREP_ONLY
NO_RELEASE
NO_DOWNSTREAM

Command used:
```bash
rg -n -i "CVR|FDR|DFDR|QAR|cockpit voice|flight data|ATC|transcript|callout|warning|EGPWS|TAWS|autothrottle|autopilot|flight director|mode|airspeed|altitude|glideslope|runway|taxiway|wrong runway|stabilized|go-around|minimum descent|decision altitude|nonprecision|crew resource|pilot monitoring|pilot flying" docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt || true
```

## Hit counts by report
| reportId | textFile | hitCount | strongestEvidenceFamilies |
|---|---|---:|---|
| ASIANA-214 | `ASIANA-214-NTSB-AAR1401.txt` | 1202 | CVR/transcript, FDR/DFDR/QAR, ATC/procedure, warning/mode, energy/path, crew coordination |
| COMAIR-5191 | `COMAIR-5191-NTSB-AAR0705.txt` | 1029 | CVR/transcript, FDR/DFDR/QAR, ATC/procedure, warning/mode, energy/path, crew coordination |
| KOREAN-801 | `KOREAN-801-NTSB-AAR0001.txt` | 1098 | CVR/transcript, FDR/DFDR/QAR, ATC/procedure, warning/mode, energy/path, crew coordination |
| UPS-1354 | `UPS-1354-NTSB-AAR1402.txt` | 1061 | CVR/transcript, FDR/DFDR/QAR, ATC/procedure, warning/mode, energy/path, crew coordination |
| FIRST-AIR-6560 | `FIRST-AIR-6560-TSB-A11H0002.txt` | 13 | FDR/DFDR/QAR, ATC/procedure, energy/path, crew coordination |
| AMERICAN-1420 | `AMERICAN-1420-NTSB-AAR0102.txt` | 1066 | CVR/transcript, FDR/DFDR/QAR, ATC/procedure, warning/mode, energy/path, crew coordination |
| AMERICAN-965 | `AMERICAN-965-CALI-ACCIDENT-REPORT.txt` | 154 | CVR/transcript, FDR/DFDR/QAR, ATC/procedure, warning/mode, energy/path, crew coordination |
| AIR-CANADA-624 | `AIR-CANADA-624-TSB-A15H0002.txt` | 240 | CVR/transcript, FDR/DFDR/QAR, ATC/procedure, warning/mode, energy/path, crew coordination |
| KEGWORTH-GOBME | `KEGWORTH-GOBME-AAIB-4-1990.txt` | 0 | none |
| G-BLUN-OFFSHORE | `G-BLUN-OFFSHORE-AAIB-AAR-7-2008.txt` | 2 | FDR/DFDR/QAR |

## Top-3 readiness for A4R106 (extraction-prep signal only)
| rank | reportId | prepScore | hitCount | rationale |
|---:|---|---:|---:|---|
| 1 | ASIANA-214 | 3 | 1202 | high keyword density plus CVR/FDR/warning/path evidence families |
| 2 | KOREAN-801 | 3 | 1098 | high keyword density plus CVR/FDR/warning/path evidence families |
| 3 | COMAIR-5191 | 3 | 1029 | high keyword density plus CVR/FDR/warning/path evidence families |

## Reserve readiness
| reportId | prepScore | hitCount | readinessNote |
|---|---:|---:|---|
| AMERICAN-1420 | 3 | 1066 | READY_FOR_A4R106 |
| UPS-1354 | 3 | 1061 | READY_FOR_A4R106 |
| AIR-CANADA-624 | 3 | 240 | READY_FOR_A4R106 |
| AMERICAN-965 | 3 | 154 | READY_FOR_A4R106 |
| FIRST-AIR-6560 | 3 | 13 | READY_FOR_A4R106 |
| G-BLUN-OFFSHORE | 1 | 2 | NOT_READY_FOR_A4R106 |
| KEGWORTH-GOBME | 1 | 0 | NOT_READY_FOR_A4R106 |
