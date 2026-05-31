# SERA A4R193-B Real Event Batch Selection v0.2.0

## Phase and boundary

- phase: `A4R193-B`
- mode: `CANDIDATE_ONLY`
- objective: re-enter additional real events under the passive escape-point contract only
- no event in this batch is promoted to fixture, baseline, or automatic reference truth

## Candidate discovery summary

Internal search was executed over `docs`, `tests`, `frontend`, and `tmp` using the requested candidate terms.

Primary candidate pool identified for immediate re-entry work:

1. Asiana 214 SFO
2. Comair 5191 LEX
3. United 173 PDX
4. USAir 427 PIT
5. American 965 Cali
6. Delta 191 DFW
7. Thebaud / Peasmarsh / Vigo / 5N-BQJ / N109W / N11NM

## Internal sources found (high-signal set)

1. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0001.md` (Asiana 214)
2. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0002.md` (Comair 5191)
3. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0017.md` (United 173)
4. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0015.md` (USAir 427)
5. `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv`
6. `docs/sera-vnext/real-event-author-decision-intake-a4r182/SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv`
7. `A4R187-NODE-DECISION-PACKET-0001` (Asiana packet in A4R187 node-decision intake set)
8. `docs/sera-vnext/author-node-decision-intake-a4r187/node-decision-packets/A4R187-NODE-DECISION-PACKET-0002-COMAIR-5191.md`
9. `docs/sera-vnext/author-node-decision-intake-a4r187/node-decision-packets/A4R187-NODE-DECISION-PACKET-0017-UNITED-173.md`

## Inclusion and exclusion criteria

Inclusion criteria applied:

1. event has direct internal extraction with explicit escape-point boundary narrative
2. event has adjudication trace in A4R181/A4R182 or equivalent governance notes
3. event can be represented as `agentId + unsafeActOrOmission + operationalMoment + boundaryEvidenceRefs` without external inference

Exclusion or hold criteria applied:

1. internal source marks technical-dominance boundary with overclassification risk
2. direct actor is unresolved under current evidence
3. escape point cannot be stated without forcing human causality not grounded in internal evidence

## Selected events for A4R193-B

1. Asiana 214 SFO
- selection outcome: `READY_FOR_CANDIDATE_ONLY_TRIAL`
- diversity role: consequence-versus-cause boundary and multi-crew integration risk

2. Comair 5191 LEX
- selection outcome: `READY_FOR_CANDIDATE_ONLY_TRIAL`
- diversity role: runway-identity verification zone with moment-prioritization ambiguity

3. United 173 PDX
- selection outcome: `READY_FOR_CANDIDATE_ONLY_TRIAL`
- diversity role: high risk of consequence-as-basis and agent migration (captain/FO/FE)

4. USAir 427 PIT
- selection outcome: `SOURCE_INSUFFICIENT_FOR_REENTRY`
- diversity role: condition/technical-dominant boundary case, controlled HOLD path

## Candidates not selected in this batch

1. American 965 Cali
- reason: available internal material exists, but this batch already satisfies diversity gates with three ready events plus one technical HOLD; kept for next wave to avoid overloading A4R193-B trial scope

2. Delta 191, Thebaud, Peasmarsh, Vigo, 5N-BQJ, N109W, N11NM
- reason: either lower directness for immediate escape-point contract mapping in current tracked set or outside this batch capacity; no automatic carry-over as reference truth

## Methodological risk expectations by selected event

1. Asiana 214
- risk: post-impact consequence being incorrectly treated as escape point
- risk: crew role migration without explicit secondary analysis split

2. Comair 5191
- risk: drift between hold-short, lineup, and power-application moments
- risk: contamination by ATC context when scope anchor is crew action

3. United 173
- risk: outcome (fuel exhaustion impact) being used as causal basis
- risk: migration from captain decision anchor to FO/FE evidence without explicit split

4. USAir 427
- risk: overclassification of human P/O/A in a technical-dominant event
- risk: forcing agent attribution where source marks technical boundary HOLD

## Non-automatic-reference declaration

All A4R193-B events remain candidate-only artifacts. None is promoted to fixture, baseline, final classification, or automatic methodological reference.
