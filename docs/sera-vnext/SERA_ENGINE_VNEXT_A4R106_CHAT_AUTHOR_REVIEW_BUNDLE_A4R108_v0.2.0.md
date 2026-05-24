# A4R108 — Chat Author Review Bundle for Eligible A4R106 Cases

Status:
- CHAT_AUTHOR_REVIEW_BUNDLE_PREP
- DOCS_ONLY
- NO_AUTHOR_DECISION_RECORDED
- NO_RELEASE
- NO_DOWNSTREAM

## 1. Purpose
This document prepares a chat-ready author review package for eligible A4R106 cases only. It does not record author decisions and does not change official classification status.

## 2. Cases included
- COMAIR-5191
- KOREAN-801

## 3. Case excluded from approval bundle
- ASIANA-214
- reason: `DOWNGRADE_TO_REVIEW_REQUIRED` in A4R107 quality audit
- next action: source-slice/method review later (`REVIEW_REQUIRED / SOURCE_SLICE_OR_METHOD_REVIEW_REQUIRED`)

## 4. COMAIR-5191 review card
- factual summary:
  - Runway-22 assignment and cues were repeatedly present in briefing/checklist chain;
  - aircraft entered runway 26 and continued takeoff after runway-number omission in exchange.
- safe-operation escape point:
  - runway-entry verification point before takeoff commitment.
- proposed canonical path:
  - `P_ROOT -> P_ASSESSMENT(NÃO) -> P_CAPABILITY(SIM) -> P_TIME_PRESSURE(NÃO) -> P_INFORMATION_AMBIGUOUS(NÃO) -> P_INFORMATION_AVAILABLE(SIM) -> P-G`
- proposed leaf:
  - `P-G` draft/internal candidate.
- exact nodes/questions used:
  - `P_ROOT` — "O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?"
  - `P_ASSESSMENT` — "Avaliação correta ou adequada da situação?"
  - `P_CAPABILITY` — "Possuía a capacidade necessária para sentir e perceber a situação?"
  - `P_TIME_PRESSURE` — "A pressão do tempo percebida era excessiva?"
  - `P_INFORMATION_AMBIGUOUS` — "A informação era ilusória ou ambígua?"
  - `P_INFORMATION_AVAILABLE` — "A informação estava disponível e correta?"
- evidence supporting each answer:
  - `P_ASSESSMENT(NÃO)`: assigned-vs-used runway mismatch explicit in factual chronology.
  - `P_CAPABILITY(SIM)`: no dominant factual anchor of sensory/knowledge incapacity.
  - `P_TIME_PRESSURE(NÃO)`: operational pace exists but excessive-pressure dominance is not isolated.
  - `P_INFORMATION_AMBIGUOUS(NÃO)`: runway cues were explicit and repeated.
  - `P_INFORMATION_AVAILABLE(SIM)`: cue chain availability is strong; issue is integration/verification.
- main reason to keep:
  - strongest and cleanest perception-side draft in A4R106 with robust factual runway-awareness evidence.
- main reason to reject/downgrade:
  - escape point fixation (hold-short vs lineup) and time-pressure interpretation still need explicit tolerance.
- likely alternative if rejected:
  - `UNRESOLVED` or a revised P-path after focused source slice.
- overclassification risk:
  - `LOW/MEDIUM`.
- author question:
  - "COMAIR-5191: manter P-G como draft canônico interno para futura referência, ou rebaixar para UNRESOLVED/REVIEW_REQUIRED?"

## 5. KOREAN-801 review card
- factual summary:
  - nonprecision-approach constraints with glideslope unusable context;
  - cockpit inconsistency on glideslope interpretation plus warning/callout chain before impact window.
- safe-operation escape point:
  - early glideslope-usability inconsistency point requiring strict nonprecision profile protection.
- proposed canonical path:
  - `P_ROOT -> P_ASSESSMENT(NÃO) -> P_CAPABILITY(SIM) -> P_TIME_PRESSURE(NÃO) -> P_INFORMATION_AMBIGUOUS(SIM) -> P-F`
- proposed leaf:
  - `P-F` draft/internal candidate.
- exact nodes/questions used:
  - `P_ROOT` — "O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?"
  - `P_ASSESSMENT` — "Avaliação correta ou adequada da situação?"
  - `P_CAPABILITY` — "Possuía a capacidade necessária para sentir e perceber a situação?"
  - `P_TIME_PRESSURE` — "A pressão do tempo percebida era excessiva?"
  - `P_INFORMATION_AMBIGUOUS` — "A informação era ilusória ou ambígua?"
- evidence supporting each answer:
  - `P_ASSESSMENT(NÃO)`: degraded approach-state coherence in ATC/CVR chain.
  - `P_CAPABILITY(SIM)`: capability deficit not dominant in current factual framing.
  - `P_TIME_PRESSURE(NÃO)`: urgency present but not isolated as primary branch.
  - `P_INFORMATION_AMBIGUOUS(SIM)`: contradictory glideslope interpretation and warning context support ambiguity branch.
- main reason to keep P-F:
  - factual support is coherent for ambiguity framing without forcing O/A closure.
- main reason to reject/downgrade or switch to P-G:
  - monitoring-availability interpretation remains plausible and may justify `P-G` or non-closure.
- likely alternative if rejected:
  - `P-G` or `UNRESOLVED`.
- overclassification risk:
  - `MEDIUM`.
- author question:
  - "KOREAN-801: manter P-F como draft canônico interno, trocar para P-G, ou rebaixar para UNRESOLVED/REVIEW_REQUIRED?"

## 6. Decision form for future chat
Do not fill in this phase.

- COMAIR-5191:
  - APPROVE_AS_INTERNAL_DRAFT
  - APPROVE_WITH_LIMITATIONS
  - DOWNGRADE_TO_REVIEW_REQUIRED
  - PARK_UNRESOLVED

- KOREAN-801:
  - APPROVE_AS_INTERNAL_DRAFT_P_F
  - APPROVE_WITH_LIMITATIONS_P_F
  - SWITCH_TO_P_G_REVIEW_REQUIRED
  - PARK_UNRESOLVED

## 7. What approval would NOT mean
Future approval would not mean:
- final accident cause;
- HFACS;
- Risk/ERC;
- recommendation package;
- front-end-ready status;
- release creation;
- official baseline change.

## 8. Next steps after chat review
- if both approved/approved with limitations: prepare controlled internal-reference package;
- if one approved: activate next reserve candidate;
- if none approved: return to A4R105 reserves.

## A4+R-109 decision intake result
- A4R109 decision intake completed.
- COMAIR-5191 approved with limitations.
- KOREAN-801 approved with limitations as P-F boundary case.
- ASIANA-214 remains excluded/review-required.
- no release/downstream.
