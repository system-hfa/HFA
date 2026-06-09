# SERA vNext — Pilot Go / No-Go

## Decision

**GO for a controlled human pilot — with limitations — restricted to the admin vNext path.**
**NO-GO for the common user flow, internal beta, production, and any Portuguese/AI-classification value claim.**

## Can a controlled human pilot start?

Yes. Justification: every unsafe failure mode is structurally prevented.
- Final output is locked (`assertNonFinalOutput`; `finalOutputsBlocked` true on all 103 v02 + 12 independent cases).
- Human review is mandatory (`humanReviewRequired: true`).
- The engine is conservative: 0 incorrect codes across my 12 independent naturalistic cases; it abstains rather than guesses.
- Provenance and audit (domain events) are complete and versioned.

## Route / flags / environment

- **Route**: admin vNext UI `/admin/sera-vnext/analyses/new` -> detail -> review. **Not** the common `events/new` flow (NF-03).
- **Flags**:
  - `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` — leave **off** for common users; the admin product path does not require it.
  - admin/product-beta flags as currently configured for the admin UI.
- **Environment**: a deployment where the four migrations — **especially `20260608210000_sera_vnext_provenance_columns.sql`** — are confirmed applied (else canonical inserts 500). Verify out-of-band (F-26).

## Limitations reviewers MUST be told

1. The engine **abstains far more than it codes** on real narratives; **abstention is the expected, safe default**, not a failure.
2. **Portuguese recall is low** (1/3 in independent testing); real PT narratives will often produce no candidate code. Reviewers do the classification; the engine assists.
3. **Violations (O-B/O-C) are under-detected** (NF-01) — reviewers must judge awareness/intent themselves.
4. The score / ERC numbers are **unvalidated heuristics**, not measured risk.
5. Guardrail flags appear only in the **warnings list**, not a dedicated panel (NF-02) — read warnings carefully.
6. Nothing here is **scientifically validated**; this is a deterministic implementation of a documented method.

## Blocking findings (must fix before sign-off / wider rollout)

- **NF-07** — reconcile the stale closure matrix with code (sign-off integrity).
- **NF-03** — common-flow vNext renderer (before any common-user pilot).
- **NF-06** — independent real-narrative gold set (before any accuracy claim).

## Non-blocking for the admin pilot

NF-01, NF-02, NF-04, NF-05, NF-08, F-08/09/10/13/15/16/17/18/19/22 — track, but reviewer-in-the-loop mitigates.

## Metrics to collect during the pilot

- Abstention rate vs code rate, split by language (target: quantify real PT capability).
- Reviewer agreement / override rate per axis (proto inter-rater signal).
- Cases where the engine abstained but the reviewer assigned a code (recall gap), especially O-B/O-C (NF-01).
- Guardrail-violation frequency and reviewer action on each.
- Any final-output-lock violation (must be zero).
- Latency / error rate of the canonical route; audit-write failures.

## Do not confuse

| Stage | Status |
|---|---|
| Controlled pilot (admin, supervised) | GO with limitations |
| Internal beta | NOT_READY |
| Production | NOT_READY |
| Scientific validation | NOT_READY |
