# SERA vNext — Naturalistic Corpus Design

## Purpose
Independent frozen PT/EN validation corpus designed to measure real-narrative engine accuracy, not lexical matching with the engine's internal concept regexes.

## Corpus Identity
- **Name**: SERA_VNEXT_V03_NATURALISTIC
- **Total cases**: 36 (18 PT-BR, 18 EN)
- **Groups**: 12 calibration, 12 validation, 12 holdout
- **Created**: 2026-06-09 (pre-execution)
- **Author**: DeepSeek V4 Pro (same as engine author)

## Design Rules
1. No phrases copied from engine regexes/concepts
2. No accident names or case IDs in narratives
3. No existing fixture-dominant accident patterns
4. Real natural language, varied syntax and vocabulary
5. Expected outputs defined BEFORE engine execution
6. Holdout not altered after seeing results
7. Hash registered before first run

## Coverage Breakdown
| Category | Count | Case IDs |
|---|---|---|
| Offshore / helicopter | 6 | CAL-01, CAL-02, VAL-01, VAL-02, HLD-01, HLD-02 |
| Technical-dominant | 4 | CAL-03, CAL-04, VAL-03, VAL-04 |
| Evidence-insufficient | 4 | CAL-05, CAL-06, HLD-12 (+ VAL-11/VAL-12 consequence-as-cause) |
| PF/PM / multi-actor | 4 | CAL-07, CAL-08, VAL-05, VAL-06 |
| Post-escape traps | 4 | CAL-09, CAL-10 (+ consequence-as-cause cases) |
| Violation-awareness boundaries | 4 | CAL-11, CAL-12, VAL-07, VAL-08 |
| A-A / A-C boundaries | 4 | HLD-03, HLD-04, HLD-09, HLD-10 |
| No-failure | 3 | VAL-09, VAL-10 (+ HLD-10) |
| Consequence-as-cause | 3 | VAL-11, VAL-12, HLD-11 |
| Precondition-as-escape | 3 | CAL-10, HLD-05, HLD-06 |

## Expected Output Distribution
| Kind | Count |
|---|---|
| Code expected | 15 |
| Abstention expected | 21 |

## Pre-Execution Hashes
| File | SHA-256 |
|---|---|
| cases.ts | `63c2e447636585d1da0423f59e5482413de9024b96592b215c7d9e555ac2f7df` |
| Expected outputs | `b6e80c1c986ddde00987fcf3006072cf4400473ebaf1a6fb5c451d815738e555` |

## Limitation
This corpus was authored by the same entity that wrote the engine. It is NOT an expert-labelled gold set. Expert labelling is recommended before any accuracy claim.
