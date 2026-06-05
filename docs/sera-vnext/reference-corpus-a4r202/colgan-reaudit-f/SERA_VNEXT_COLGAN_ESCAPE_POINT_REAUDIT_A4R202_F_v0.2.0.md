# SERA vNext Colgan Escape Point Reaudit - A4R202-F

Date: 2026-06-04
Phase: A4R202-F
Status: CANDIDATE_ONLY_REAUDIT_COMPLETE

## 1. Objective

Execute a focused Colgan 3407 re-audit to structure the escape-point window more tightly without approving any final escape point and without creating any final P/O/A output.

## 2. Method discipline

- This phase is `NON_FINAL_CANDIDATE_ONLY`.
- Earliest/latest analysis is used to separate window structure from final causal closure.
- `first_departure_from_safe_operation` is not forced to equal `critical_unsafe_act` when the record supports a meaningful window.
- Anything after the likely `critical_unsafe_act` stays inside consequence/quarantine.
- Daumas is treated as methodological reference only and not as factual event source.

## 3. Candidate A

- Candidate label: `LOW_SPEED_DETERIORATION_BEFORE_STICK_SHAKER`
- Candidate-only statement:
  quando a aeronave permaneceu abaixo da speed schedule aplicavel em icing por alguns segundos antes do stick shaker, sem correção integrada suficiente da tripulação, ainda com o autopilot engajado e a configuração final em andamento.
- Evidence in favor:
  FDR-derived reconstruction indicates roughly 8 seconds below the minimum icing approach speed before the stick shaker.
  The approach was already inside the `ice detected` and final-configuration context.
  No effective interruption of the adverse energy trend occurred before the warning.
- Evidence against:
  There is no direct crew verbalization of low-speed recognition in that narrow interval.
  The low-speed window is analytically reconstructed rather than captured as an explicit live cue callout sequence.
  Selecting this point too quickly risks turning a deteriorating margin into a single locked active-failure point without enough discrete anchoring.
- Relation to perception:
  This candidate is strongest as a perception-and-monitoring boundary because the evidence centers on margin detection and non-correction before the warning.
- Relation to PF/PM:
  It preserves a shared cockpit monitoring burden, with PF and PM both implicated in the missed energy margin read before the warning.
- Risk of choosing too early:
  `MEDIUM_HIGH`
- Risk of transforming precondition into active failure:
  `MEDIUM`
- Impact on earliest/latest:
  This is the strongest current `earliest_controllable_ref`.
- Impact on first departure / critical unsafe act:
  It is the strongest candidate for `first_departure_from_safe_operation`, but not yet stable enough to lock as `critical_unsafe_act`.

## 4. Candidate B

- Candidate label: `IMMEDIATE_POST_STICK_SHAKER_RESPONSE`
- Candidate-only statement:
  quando o stick shaker ativou, o autopilot desconectou, e o capitão respondeu com input aft no manche em vez de descarregar a asa, iniciando a sequência de upset explicitamente documentada.
- Evidence in favor:
  Stick shaker onset, autopilot disconnect, and captain aft-column response are explicitly present in the factual sequence.
  This is the first fully discrete and unambiguous control input in the upset chronology.
  Actor attribution is clearer here than in the earlier monitoring window.
- Evidence against:
  It may already sit downstream of the true safe-operation escape if the low-speed deterioration already crossed the operational boundary.
  Selecting it as the escape point risks post-escape hunting because the upset is already manifest.
- Relation to PF immediate action:
  This candidate is action-dominant and strongly PF-centered.
- Relation to PM/crew monitoring:
  PM remains relevant as supporting context, but the boundary becomes much less shared and much more captain/PF anchored.
- Risk of choosing too late:
  `HIGH`
- Risk of post-escape hunting:
  `HIGH`
- Impact on earliest/latest:
  This is the strongest current `latest_controllable_ref`.
- Impact on first departure / critical unsafe act:
  It is the strongest candidate for `critical_unsafe_act`, but likely too late to serve confidently as `first_departure_from_safe_operation`.

## 5. Candidate C

- Candidate label: `REF_SPEED_ICE_MISMATCH_AWARENESS`
- Candidate-only statement:
  quando o contexto de `ice detected`, ref-speeds, flap/gear configuration, e aproximação final passou a exigir leitura integrada de margem de energia, mas essa leitura não se converteu em correção suficiente antes do warning.
- Evidence in favor:
  The icing and ref-speed context was explicit before the stick shaker.
  This candidate explains why the dispute is not limited to one second of warning onset.
  It captures the integrated crew cognition burden that sits behind Candidate A.
- Evidence against:
  Timing is broader and less discrete than Candidates A and B.
  It may be better understood as a perception candidate or precondition-linked boundary than as a clean active-failure point.
  Agent migration risk rises because the analysis can slide from direct actor attribution into generalized crew/context framing.
- Precondition, perception, or active-failure fit:
  Best treated as a perception candidate with strong precondition/context adjacency, not as the cleanest active-failure anchor.
- Agent migration risk:
  `MEDIUM_HIGH`
- Impact on earliest/latest:
  It broadens the early side of the window but does not improve discrete latest control.
- Impact on first departure / critical unsafe act:
  It may explain the lead-in to `first_departure_from_safe_operation`, but it is weaker than Candidate A for the departure point and weaker than Candidate B for the critical act.

## 6. Candidate D check

- No fourth candidate is sustained by the current A4R202-E/D/R2/D/C/B/A inputs.
- No new candidate was invented for this phase.

## 7. Earliest/latest window

- `earliest_controllable_ref`:
  the low-speed deterioration below the applicable icing approach margin before the stick shaker, while correction was still operationally available.
- `latest_controllable_ref`:
  the immediate stick-shaker / autopilot-disconnect transition before or at the captain's first aft-column response.
- `first_departure_from_safe_operation`:
  most likely the pre-warning low-speed deterioration window.
- `critical_unsafe_act`:
  most likely the captain's immediate aft-column response after stick shaker onset.
- `post_critical_consequence_quarantine`:
  stall progression, roll excursion, altitude loss, and downstream upset sequence after the immediate post-shaker pull response.
- `ambiguity_level`:
  `HIGH_BUT_STRUCTURED`
- `window_stability`:
  stable enough to describe the candidate-only window, not stable enough to approve a final escape point.

## 8. Actor attribution

- Candidate A:
  direct actor candidate remains cockpit-centered, with captain/PF and first officer/PM both implicated through integrated monitoring and energy-management non-correction.
- Candidate B:
  direct actor candidate is the captain as PF because the discrete control response is explicit.
- Candidate C:
  actor attribution stays cockpit-centered but carries higher crew-collective drift risk.
- PF:
  strongest direct attribution appears at Candidate B.
- PM:
  strongest supporting attribution appears at Candidate A and Candidate C.
- Crew collective:
  usable only as bounded integrated monitoring context, not as a fallback replacement for the more specific PF/PM reading.
- Sterile cockpit / training / procedure / icing context:
  remains context and precondition support; it does not displace the search for a direct actor candidate.
- Downstream actors:
  any post-upset analysis remains quarantined and should not be used to re-anchor the escape point later in the sequence.

## 9. Candidate-only P/O/A evidence lanes

- Candidate A:
  perception evidence is strongest because the record supports an uncorrected degradation in energy margin before the warning.
  objective/goal evidence remains tied to continuation of the approach in icing/final configuration.
  action evidence is weaker because no single discrete pre-warning control correction failure is explicitly verbalized.
- Candidate B:
  perception evidence is weaker than action evidence.
  objective/goal evidence remains secondary.
  action evidence is strongest because the captain's immediate aft pull is explicit.
- Candidate C:
  perception and context evidence dominate.
  action evidence is diffuse and therefore weaker as an active-failure anchor.

All three candidate paths remain `NON_FINAL_CANDIDATE_ONLY`, `NO_SELECTED_CODE`, `NO_RELEASED_CODE`, `NO_FINAL_CONCLUSION`, and `NO_READY_PROMOTION`.

## 10. Candidate-only decision

Colgan 3407 remains `COLGAN_REAUDIT_STILL_REQUIRED`.

Why:

- Candidate A is the strongest `first_departure_from_safe_operation` read.
- Candidate B is the strongest `critical_unsafe_act` read.
- The window is now better structured, but the gap between those two anchors still carries high post-escape-hunting risk if forced into one final escape-point decision too early.
- Candidate C is informative as a boundary explainer, but not strong enough to resolve the dispute.

## 11. Relation to top 3

- `Comair 5191` remains the clean anchor.
- `Asiana 214` remains an automation-boundary reference.
- `UPS 1354` remains a procedural/FMC/MDA boundary reference.
- `Colgan 3407` remains a warning-window and PF/PM boundary case rather than a clean fourth reference.

Current answer:

- Colgan should not yet enter as a fourth reference case.
- Colgan should not proceed to author dossier immediately.
- Colgan should await a Daumas calibration extraction before another escalation decision.
- Colgan should stay outside the calibrator set for now.

## 12. Lock confirmations

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- fixture/baseline/product promotion: BLOCKED
- downstream release behavior: BLOCKED
- Daumas used as factual source: NO
- synthetic-real blending: NO
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work
- no final recommendation output
