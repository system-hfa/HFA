# SERA vNext Engine v0.1 Temporal Scope

Date: 2026-06-07

## Purpose

Temporal scope prevents post-escape facts from being used as causal evidence for the escape point or P/O/A traversal.

## Relations

- `PRE_ESCAPE`: evidence before the candidate escape boundary.
- `AT_ESCAPE`: evidence at the latest candidate escape boundary.
- `POST_ESCAPE`: recovery, outcome, impact, damage, late recognition, or later correction evidence.
- `UNKNOWN`: temporal relation not established.

## Quarantine Rules

`POST_ESCAPE` evidence is prohibited for:

- `ESCAPE_POINT`
- `PERCEPTION`
- `OBJECTIVE`
- `ACTION`

It remains available for limitations and review transparency.

## Examples Corrected

- Thebaud recovery and very low height are quarantined.
- Execuflight later impact is quarantined.
- Post-escape warning recognition is quarantined.
- Consequence-as-cause narratives keep the active failure separate from later impact/damage.
