# SERA vNext Candidate Review Batch 1 - A4R202-B v0.2.0

Date: 2026-06-02
Phase: A4R202-B
Status: candidate-only methodological review

## 1. Objective

Convert the six A4R202-A deep-extraction packets into controlled candidate-only methodological review packets for author-facing use, without creating any final P/O/A output, final escape-point approval, READY promotion, or downstream release artifact.

## 2. Method

Inputs reviewed:

- A4R202-A deep-extraction batch
- A4R201-C source-depth and detailed extraction template
- A4R201-B reconciliation package
- A4R200-A reference-corpus acceleration package
- A4R197-E source-recovery review
- A4R199-A source-recovery authorization bridge
- A4R198-A combined blueprint guardrails

Review rules applied:

- keep the escape point candidate-only;
- review direct actor and PF/PM stability without selecting any final actor closure;
- review evidence lanes for perception, objective/goal, action, and preconditions without creating P/O/A;
- separate factual strength from methodological usability;
- prefer conservative routing whenever escape-point timing remains ambiguous.

## 3. Event-by-event candidate-only review

### 3.1 Asiana 214

- Candidate ID: `C-002`
- Candidate-only status: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- Candidate escape point under review:
  quando o PF desconectou o autopilot, levou as thrust levers para idle e o A/T entrou em `HOLD` sem percepção integrada da tripulação, enquanto a aproximação continuava alta e exigia correções finas de energia e trajetória.
- Alternative candidate points:
  reaching 5 nm still high; passing 500 ft AFE unstabilized.
- Supporting evidence:
  `FLCH SPD -> A/P disconnect -> thrust idle -> A/T HOLD`; no crew recollection of the mode transition; later low-energy awareness came only near the runway.
- Evidence against:
  the 500 ft gate remains a plausible later candidate because it carries an explicit operational discontinuation criterion.
- Direct actor candidate:
  crew-integrated flight crew, with PF immediate control input and PM/instructor monitoring responsibility still inside the same cockpit actor lane.
- PF/PM stability:
  `MEDIUM-HIGH`; PF actions are clear, but PM/instructor nonintervention remains materially relevant.
- Outcome bias risk:
  `MEDIUM`
- Agent migration risk:
  `MEDIUM`
- Technical dominance risk:
  `MEDIUM-HIGH`
- Source sufficiency:
  `HIGH`
- Evidence-lane view:
  perception and action lanes are strong; objective and precondition lanes are sufficient for author review but still coupled to automation-state interpretation.
- Suitability for author review:
  yes, with an explicit note that the candidate boundary sits between automation-state loss and stable-approach rejection.

### 3.2 UPS 1354

- Candidate ID: `C-003`
- Candidate-only status: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- Candidate escape point under review:
  quando a aproximação continuou com o FMC não resequenciado e o capitão migrou para `vertical speed` sem briefing compartilhado, mantendo descida de 1,500 fpm até e através da MDA sem level-off eficaz.
- Alternative candidate points:
  failure to descend once localizer-established; descent continuation through MDA.
- Supporting evidence:
  FMC remained direct-to-KBHM, profile guidance was no longer valid, V/S was selected without shared method closure, and the descent continued through MDA.
- Evidence against:
  an earlier automation/setup candidate may be too remote from the final operational window if author review prefers the first clearly unsafe continuation inside the nonprecision segment.
- Direct actor candidate:
  crew-integrated flight crew with captain immediate flight-path control.
- PF/PM stability:
  `HIGH`
- Outcome bias risk:
  `LOW-MEDIUM`
- Agent migration risk:
  `MEDIUM`
- Technical dominance risk:
  `MEDIUM`
- Source sufficiency:
  `HIGH`
- Evidence-lane view:
  action lane is strongest; perception lane is sufficient but partly inferred from automation-state use rather than explicit cockpit recognition language.
- Suitability for author review:
  yes, with a limitation that the earliest defensible escape point may still sit either at the failed resequence stage or at the MDA continuation stage.

### 3.3 G-WNSB Sumburgh

- Candidate ID: `C-007`
- Candidate-only status: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- Candidate escape point under review:
  quando a aproximação em `3-axes` com `V/S` prosseguiu abaixo do alvo de 80 kt sem correção efetiva de collective, enquanto a tripulação seguia para a MDA com atenção dividida entre perfil instrumental e busca de referências visuais.
- Alternative candidate points:
  continuation after worsening weather updates; failure to level at the 100 ft-above-minima and 300 ft AVAD moments.
- Supporting evidence:
  speed decayed steadily after torque stabilization, monitoring remained split, and no effective level-off occurred at the AVAD/MDA boundary.
- Evidence against:
  weather-continuation and SOP burden may tempt the review to migrate too early into context instead of holding the cockpit control moment.
- Direct actor candidate:
  crew-integrated helicopter crew with commander immediate control input.
- PF/PM stability:
  `MEDIUM-HIGH`
- Outcome bias risk:
  `LOW-MEDIUM`
- Agent migration risk:
  `HIGH`
- Technical dominance risk:
  `MEDIUM`
- Source sufficiency:
  `HIGH`
- Evidence-lane view:
  objective and action lanes are strong; perception and precondition lanes are rich but closely intertwined with divided-attention context.
- Suitability for author review:
  yes, with explicit warning that operator SOP and weather must not displace the direct cockpit actor in the candidate review.

### 3.4 Comair 5191

- Candidate ID: `C-020`
- Candidate-only status: `AUTHOR_REVIEW_READY_CANDIDATE_ONLY`
- Candidate escape point under review:
  quando a tripulação cruzou a hold short line da pista 26 e alinhou a aeronave na pista 26 sem uma verificação positiva de posição e heading em relação à pista 22 autorizada.
- Alternative candidate points:
  stop at the wrong hold line; acceptance of takeoff clearance while still short of runway 22.
- Supporting evidence:
  stop occurred at runway 26 hold short, takeoff clearance was accepted from there, the aircraft then crossed the runway 26 hold line and lined up on runway 26.
- Evidence against:
  the exact final missed cue before crossing the hold line is not fully reconstructable because first officer recall is unavailable.
- Direct actor candidate:
  crew-integrated flight crew with captain taxi control and first officer monitoring/radio support.
- PF/PM stability:
  `HIGH`
- Outcome bias risk:
  `LOW`
- Agent migration risk:
  `MEDIUM`
- Technical dominance risk:
  `LOW`
- Source sufficiency:
  `HIGH`
- Evidence-lane view:
  objective and action lanes are especially strong; perception lane is also strong because the cue chain is unusually concrete.
- Suitability for author review:
  yes, and this is the cleanest batch-1 candidate for author review under candidate-only locks.

### 3.5 Colgan 3407

- Candidate ID: `C-001`
- Candidate-only status: `ESCAPE_POINT_REAUDIT_REQUIRED`
- Candidate escape point under review:
  quando a aeronave entrou abaixo da speed schedule aplicavel em icing, sem correção integrada antes do stick shaker, durante a configuração final com autopilot ainda engajado.
- Alternative candidate points:
  captain pull input immediately after stick shaker onset; mismatch awareness around icing/ref-speed handling before final configuration.
- Supporting evidence:
  calculated low-speed deficit existed for about 8 seconds before stick shaker and configuration/autopilot changes were already present.
- Evidence against:
  the first unambiguous control upset input is the captain's immediate aft-column response after shaker onset, which remains a very strong rival candidate.
- Direct actor candidate:
  captain-centered crew-integrated actor.
- PF/PM stability:
  `MEDIUM`
- Outcome bias risk:
  `MEDIUM`
- Agent migration risk:
  `MEDIUM-HIGH`
- Technical dominance risk:
  `HIGH`
- Source sufficiency:
  `MEDIUM-HIGH`
- Evidence-lane view:
  action lane is strong, but the perception and objective/goal interpretation around the pre-warning window remains comparatively less settled than in the other five cases.
- Suitability for author review:
  not yet for comparative reference use; requires focused escape-point re-audit before author intake.

### 3.6 Execuflight 1526

- Candidate ID: `C-016`
- Candidate-only status: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- Candidate escape point under review:
  quando a aeronave permaneceu alta a 3,000 ft já estabelecida no localizer e depois prosseguiu para o FAF alta, lenta e com flaps 45, sem takeover do capitão nem arremetida, transformando a aproximação em uma descida de salvação.
- Alternative candidate points:
  failure to descend once localizer-established; MDA continuation with 113 kt and flaps 45.
- Supporting evidence:
  incomplete briefing, missed descent opportunity, high/slow state before the FAF, flaps 45 before the FAF, and no takeover or missed approach from the captain.
- Evidence against:
  a later MDA-based candidate remains plausible because that is the clearest explicit procedural gate.
- Direct actor candidate:
  crew-integrated flight crew with first officer flying and captain retaining command authority.
- PF/PM stability:
  `MEDIUM-HIGH`
- Outcome bias risk:
  `LOW-MEDIUM`
- Agent migration risk:
  `MEDIUM`
- Technical dominance risk:
  `LOW-MEDIUM`
- Source sufficiency:
  `HIGH`
- Evidence-lane view:
  objective and action lanes are strong; perception and precondition lanes are sufficient but tied to shared-model weakness and command nonintervention.
- Suitability for author review:
  yes, with an explicit limitation that the author may still want to decide between the pre-FAF unstable setup and the MDA continuation boundary.

## 4. Special Colgan 3407 section

Colgan 3407 remains the least stable case in Batch 1 for escape-point timing.

Why it stays open:

- the pre-warning low-speed deficit is factually supported but partly reconstructed postaccident;
- the immediate post-shaker pull input is the first fully explicit documented upset control act;
- training/procedure context is strong enough to attract agent migration if the cockpit moment is not tightly controlled;
- the case is still usable, but only after a deliberate candidate-only re-audit.

Author-review implication:

- keep Colgan outside the first conservative top-tier author intake;
- route it through the dedicated re-audit memo first;
- reopen author intake only after the candidate boundary is restated and stabilized.

## 5. Risk synthesis

- Highest escape-point ambiguity: `Colgan 3407`
- Highest agent-migration pressure: `G-WNSB`, then `Colgan 3407`
- Highest technical-dominance pressure: `Colgan 3407`, then `Asiana 214`
- Cleanest direct-actor and runway/position spine: `Comair 5191`
- Strongest action-lane anchors under candidate-only review: `UPS 1354`, `Comair 5191`, `Execuflight 1526`
- Strongest perception-lane caution around automation/state recognition: `Asiana 214`, `UPS 1354`

## 6. Conclusion

Batch 1 is viable for controlled author-facing candidate-only work, but not as a single uniform lane.

Conservative split:

1. First author-review lane:
   `Comair 5191`, `Asiana 214`, `UPS 1354`
2. Second lane after the first intake:
   `G-WNSB`, `Execuflight 1526`
3. Re-audit lane before intake:
   `Colgan 3407`

## 7. Locks preserved

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- fixture/baseline/product promotion: BLOCKED
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
- synthetic-real blending: NO
- Daumas used as factual source: NO
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work
