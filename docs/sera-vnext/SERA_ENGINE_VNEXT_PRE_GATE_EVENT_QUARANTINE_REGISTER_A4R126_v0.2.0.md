# SERA Engine vNext Pre-Gate Event Quarantine Register A4R126 v0.2.0

Status: PRE_GATE_EVENT_QUARANTINE_REGISTER_RECORDED
Phase: A4+R-126
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Purpose
Registrar a quarentena global dos eventos reais e artefatos dependentes criados antes do gate Hendy formal de ponto de fuga da operacao segura.

Esta quarentena nao declara que os artefatos anteriores estao errados. Ela declara que eles nao podem ser usados como release, consenso, referencia, treinamento ou downstream ate que o `escapePointWhenStatement` e os demais campos Hendy sejam satisfeitos.

## Universal Quarantine Status
Aplicar a qualquer evento real e artefato dependente pre-gate:

```text
SAFE_OPERATION_ESCAPE_POINT_NOT_AUDITED
PROPOSED_CODE_PRE_ESCAPE_POINT_GATE
NOT_FOR_RELEASE
NOT_FOR_CONSENSUS
NOT_FOR_REFERENCE_CASE
NOT_FOR_TRAINING
NOT_FOR_DOWNSTREAM
REQUIRES_ESCAPE_POINT_REAUDIT
```

## Additional Gate Field
Todo evento precisa de:

```text
escapePointWhenStatementPreviouslyExplicit
escapePointWhenStatement
```

O formato valido e:

```text
Quando [ato/condicao observavel] colocou [variavel operacional controlada] fora de [limite seguro/estado esperado].
```

Quando esse campo for `ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED`, o evento permanece fora de validacao Hendy.

Eventos com `ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` recebem o bloqueio formal `BLOCKED_ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` e continuam:

```text
NOT_FOR_RELEASE
NOT_FOR_REFERENCE_CASE
NOT_FOR_CONSENSUS
NOT_FOR_TRAINING
NOT_FOR_DOWNSTREAM
```

Esse bloqueio e adicional. Quando houver fonte parcial, ator direto incerto, dominancia tecnica/condicional, arvore real ausente, necessidade de rebuild ou identidade supersedida, a decisao metodologica mais forte permanece registrada.

## Quarantined Event Groups
| group | events | affectedArtifacts | quarantineEffect |
|---|---|---|---|
| Internal 30 real events | REAL-EVENT-0001, 0002, 0003, 0004, 0005, 0006, 0007, 0008, 0009, 0010, 0011, 0013, 0014/0030, 0015, 0016, 0028, 0032, 0033, N56RD, D-HHNH, G-BHYB, HL9294, PR-CHI, N200BK, N109W, N11NM, N127LN, N120HH, N525TA, BS211-Q400 | `real-event-extractions/**`, `real-event-adjudications/**`, `real-event-extractions-batch-2/**`, `real-event-adjudications-batch-2/**`, `real-event-extractions-batch-3/**`, `real-event-adjudications-batch-3/**`, `real-event-questionpath-backfill/**`, consolidated trackers | Prior proposed P/O/A and helper question paths remain draft/pre-gate only. |
| External Batch 1 adjudicated events | A4R87-EXT-001, 002, 004, 006, 007, 008, 012 | `external-candidates/extractions-batch-1/**`, `external-candidates/adjudications-batch-1/**`, A4R90/A4R91 summaries | External draft proposals remain source-slicing or author-review candidates only. |
| Canonical/reference trace events | UPS-1354, COLGAN-3407, US-AIRWAYS-1549, UNITED-173, UNITED-232, EASTERN-401, ATLAS-3591, AMERICAN-1420, ASIANA-214, AMERICAN-965, HELIOS-522, USAIR-427, TUROY EC225, KOREAN-801, COMAIR-5191 | `reference-case-traces/**`, A4R104/A4R106/A4R115/A4R119/A4R123/A4R124/A4R125 docs | Reference-case wording remains historical/draft until escape-point gate is complete. |
| Historical P-axis release pilot events | REAL-EVENT-0003, REAL-EVENT-0015, N109W, N11NM | `release-pilot/**`, `release-pilot-author-packets/**`, A4R85/A4R86/A4R92 docs | All historical release records are affected by pre-gate caution; no downstream authority. |

## Event-Level Quarantine Outcome
| auditDecision | events | useStatus |
|---|---|---|
| PASS_REQUIRES_MINOR_WORDING_FIX | UPS-1354; COLGAN-3407; UNITED-173 | May be retained as draft audit candidates after explicit Hendy wording patch; still no release/downstream. |
| PARTIAL_REQUIRES_POA_REVIEW | REAL-EVENT-0001; REAL-EVENT-0003; REAL-EVENT-0016; D-HHNH; G-BHYB; HL9294; BS211-Q400; A4R87-EXT-001; A4R87-EXT-002; A4R87-EXT-008; A4R87-EXT-012; ASIANA-214; AMERICAN-965; COMAIR-5191 | Requires focused P/O/A review against a defined escape point. |
| FAIL_REQUIRES_REBUILD | REAL-EVENT-0015; N109W; N11NM; AMERICAN-1420 | Requires full rebuild with Hendy escape-point gate before reuse. |
| BLOCKED_SOURCE_PARTIAL | REAL-EVENT-0028; REAL-EVENT-0005; REAL-EVENT-0013; REAL-EVENT-0007; REAL-EVENT-0009; REAL-EVENT-0011; REAL-EVENT-0032; REAL-EVENT-0033; A4R87-EXT-007; EASTERN-401; HELIOS-522 | Requires source enrichment or evidence split before any escape-point validation. |
| BLOCKED_DIRECT_ACTOR_UNCLEAR | REAL-EVENT-0002; REAL-EVENT-0004; PR-CHI; N200BK; A4R87-EXT-004; A4R87-EXT-006; ATLAS-3591 | Requires actor decomposition or actor-scope decision before P/O/A reuse. |
| BLOCKED_TECHNICAL_OR_CONDITION_DOMINANT | REAL-EVENT-0006; REAL-EVENT-0010; REAL-EVENT-0008; N56RD; N120HH; US-AIRWAYS-1549; UNITED-232; USAIR-427; TUROY EC225 | Can remain as boundary/nominal/technical-dominant material only; do not force human causal P/O/A. |
| BLOCKED_REAL_TREE_MISSING | N127LN; N525TA; KOREAN-801 | Do not use helper or partial tree material as canonical path proof. |
| DUPLICATE_OR_SUPERSEDED | REAL-EVENT-0014/0030 | Treat merged identity as superseded until source identity is normalized. |

## Formal When Statement Block
| gateDecision | events | quarantineEffect |
|---|---|---|
| BLOCKED_ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | 47 events with `ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` in the tracker | Not valid for release, reference case, consensus, training, downstream, runtime selected classification, fixture, or baseline use until a factual and evidence-anchored "Quando..." statement is recorded. |

## What Can Be Used
- Historical audit context.
- Source inventory and factual evidence, if separated from conclusions and causal labels.
- Draft planning for future rebuild/review lanes.
- Negative/boundary lessons about source partiality, direct actor ambiguity, technical dominance and noncanonical question paths.

## What Cannot Be Used
- Release authority.
- Consensus case.
- Reference case for frontend calibration or training.
- Training material.
- Downstream output.
- Runtime selected classification.
- Fixture or baseline expected value.
- Human causal P/O/A where the first departure is technical/condition-dominant and no direct human actor is clear.

## Exit Criteria From Quarantine
An event exits quarantine only after a dedicated phase records:
- `escapePointWhenStatementPreviouslyExplicit` or equivalent provenance of when-statement introduction;
- `escapePointWhenStatement` in the mandatory "Quando..." format;
- factual unsafe act or unsafe condition;
- controlled operational variable;
- safe limit or expected state;
- evidence anchor;
- timeline position;
- why it is the first departure;
- preventability test;
- direct actor or explicit technical/condition-dominant status;
- criticality status;
- P/O/A alignment assessment;
- canonical-tree status;
- explicit human review decision.

Exit from quarantine does not automatically create release or downstream authority.
