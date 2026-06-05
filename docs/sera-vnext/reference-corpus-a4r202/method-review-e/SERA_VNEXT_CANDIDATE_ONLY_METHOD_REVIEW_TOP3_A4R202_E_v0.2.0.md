# SERA vNext Candidate-only Method Review Top-3 A4R202-E v0.2.0

Date: 2026-06-04
Phase: A4R202-E
Status: CANDIDATE_ONLY_METHOD_REVIEW_COMPLETE
Methodology: SERA
ReviewMode: NON_FINAL_CANDIDATE_ONLY
Locks: NO_SELECTED_CODE, NO_RELEASED_CODE, NO_FINAL_CONCLUSION, NO_READY_PROMOTION

## 1. Objective

Run the first candidate-only method review for the three events authorized in A4R202-D and consolidated in A4R202-D/R2:

1. `Comair 5191`
2. `Asiana 214`
3. `UPS 1354`

This phase tests whether SERA vNext can apply P/O/A reasoning in candidate-only mode without creating final P/O/A, without approving a final escape point, and without unlocking any downstream output.

## 2. Method Rules Applied

- keep all reasoning `NON_FINAL_CANDIDATE_ONLY`;
- preserve `NO_SELECTED_CODE`, `NO_RELEASED_CODE`, `NO_FINAL_CONCLUSION`, `NO_READY_PROMOTION`;
- separate `first_departure_from_safe_operation` from `critical_unsafe_act` when they may diverge;
- treat `earliest_controllable_ref` and `latest_controllable_ref` as an analyzable window, not as automatic final closure;
- quarantine post-critical consequences;
- keep actor attribution focused on the direct human actor candidate;
- keep automation, procedure, FMC, and ATC as context unless direct human actor status is supported.

## 3. Event Reviews

### 3.1 Comair 5191

Review status:

`METHOD_REVIEW_CANDIDATE_PATH_CREATED_NON_FINAL`

#### Candidate escape point reaffirmed

The current candidate remains:

quando a tripulacao cruzou a hold short line da pista 26 e alinhou na pista 26 sem verificacao positiva de posicao e heading em relacao a pista 22 autorizada.

#### Earliest and latest controllable references

- `earliest_controllable_ref`: stop/position at the runway 26 hold short point while the crew still believed they were aligned with the runway 22 departure task.
- `latest_controllable_ref`: crossing the runway 26 hold short line and completing lineup on runway 26.
- post-critical consequence quarantine: takeoff roll, late reject opportunity, and accident sequence stay outside the causal review window.

#### First departure versus critical unsafe act

- `first_departure_from_safe_operation` candidate: remaining at the wrong hold short position without positive runway identity closure.
- `critical_unsafe_act` candidate: crossing into runway 26 and aligning there without positive heading/position verification.
- relation: stable two-step structure; the first departure appears earlier than the critical act and the distinction is methodologically usable.

#### Candidate P/O/A reasoning path

- perception lane candidate non-final:
  failure to positively reconcile hold-short location, runway lighting context, and heading identity against cleared runway 22 before runway entry.
- objective/goal lane candidate non-final:
  goal persistence toward immediate departure continuity without pausing to revalidate runway identity at the wrong hold-short context.
- action lane candidate non-final:
  crossing the wrong hold short line and aligning on runway 26 without active positive verification.

Supporting evidence:

- taxi clearance and readback were for runway 22;
- the aircraft stopped at the runway 26 hold short line;
- the crew accepted departure flow while still mispositioned;
- the crew crossed the runway 26 hold short line and lined up on runway 26.

Evidence against or limiting factors:

- an earlier candidate at the wrong hold short stop remains defensible;
- first officer recall is incomplete;
- ATC phraseology not restating runway number can create contextual pressure, but does not displace the crew actor lane.

Actor attribution:

- direct actor candidate: crew-integrated flight crew;
- captain immediate control lane remains strongest;
- first officer monitoring/radio lane remains materially relevant;
- ATC remains context, not direct actor;
- agent migration risk: present but comparatively controlled.

### 3.2 Asiana 214

Review status:

`METHOD_REVIEW_CANDIDATE_PATH_CREATED_NON_FINAL_WITH_BOUNDARY_WARNING`

#### Candidate escape point reaffirmed

The current candidate remains:

quando o PF desconectou o autopilot, levou as thrust levers para idle e o A/T entrou em HOLD sem percepcao integrada da tripulacao, enquanto a aproximacao continuava alta e exigia correcoes de energia e trajetoria.

#### Required alternative candidate coevaluation

- alternative candidate: unstable 500 ft gate without go-around.

#### Earliest and latest controllable references

- `earliest_controllable_ref`: mode and energy-management transition around autopilot disconnect, idle thrust, and A/T `HOLD`.
- `latest_controllable_ref`: unstable 500 ft gate with no go-around despite continuing approach-energy mismatch.
- post-critical consequence quarantine: late low-speed alerts, final sink development, and impact sequence remain outside causal closure.

#### First departure versus critical unsafe act

- `first_departure_from_safe_operation` candidate: automation-state and energy-management transition proceeded without integrated recognition while the approach was already high.
- `critical_unsafe_act` candidate: continuation through the unstable 500 ft gate without go-around.
- relation: divergent and intentionally unresolved in this phase; the first departure and critical act may not be the same point.

#### Candidate P/O/A reasoning path

- perception lane candidate non-final:
  incomplete integrated recognition of automation state, thrust condition, and energy trajectory during a high and tightening visual approach.
- objective/goal lane candidate non-final:
  continued recovery/landing objective under high-workload visual continuation rather than shifting cleanly to discontinuation logic.
- action lane candidate non-final:
  continuation of the approach after the automation-state loss and through the unstable gate without timely go-around.

Supporting evidence:

- `FLCH SPD` was selected late;
- autopilot was disconnected;
- thrust levers moved to idle and A/T entered `HOLD`;
- no crewmember later recalled noticing the loss of automatic speed control;
- the 500 ft gate remained unstabilized and the go-around did not occur there.

Evidence against or limiting factors:

- the 500 ft gate is a strong rival candidate anchor;
- automation-state reasoning can pull the case toward technical framing;
- the PM/instructor lane remains materially involved, which complicates single-actor simplification.

Actor attribution:

- PF immediate control input remains the strongest direct actor lane;
- PM/instructor monitoring and intervention lane remains live;
- automation is context/system, not human actor;
- agent migration risk: medium because technical-state discussion can displace cockpit monitoring logic.

Boundary warning:

- automation dominance pressure;
- technical-human boundary remains active;
- perception inference is stronger than verbalized recognition evidence.

### 3.3 UPS 1354

Review status:

`METHOD_REVIEW_CANDIDATE_PATH_CREATED_NON_FINAL_WITH_BOUNDARY_WARNING`

#### Candidate escape point reaffirmed

The current candidate remains:

quando a aproximacao continuou com FMC nao resequenciado e o capitao migrou para vertical speed sem briefing compartilhado, mantendo descida de 1.500 fpm ate e atraves da MDA sem level-off eficaz.

#### Required alternative candidate coevaluation

- alternative candidate 1: FMC resequencing failure not resolved;
- alternative candidate 2: migration to `vertical speed` without shared closure;
- alternative candidate 3: passing MDA without effective level-off.

#### Earliest and latest controllable references

- `earliest_controllable_ref`: FMC/setup condition remained unresolved before the nonprecision segment stabilized.
- `latest_controllable_ref`: continuation through MDA without effective level-off.
- middle candidate retained: `vertical speed` selection and shared-plan breakdown.
- post-critical consequence quarantine: late alerts and CFIT sequence remain outside causal closure.

#### First departure versus critical unsafe act

- `first_departure_from_safe_operation` candidate: approach setup carried forward with FMC sequencing not properly resolved.
- `critical_unsafe_act` candidate: passing MDA without effective level-off after the descent plan had already degraded.
- relation: compound sequence; the current candidate remains useful, but future decomposition is likely necessary.

#### Candidate P/O/A reasoning path

- perception lane candidate non-final:
  incomplete recognition that setup and active guidance logic no longer supported the intended vertical path and minimums protection.
- objective/goal lane candidate non-final:
  continued completion goal for the runway 18 nonprecision approach despite unresolved setup and deteriorating vertical-control integrity.
- action lane candidate non-final:
  continuation with unresolved setup, migration to `vertical speed`, and no effective MDA level-off.

Supporting evidence:

- FMC remained direct-to-KBHM instead of properly sequenced;
- the aircraft remained high on the localizer segment;
- the captain changed from profile logic to `vertical speed`;
- the first officer recognized the `V/S` mode change after the fact;
- descent continued through MDA without required minimums protection.

Evidence against or limiting factors:

- the earliest defensible anchor may be setup only;
- the sharpest critical anchor may be MDA continuation only;
- setup, procedure, and execution can blur precondition versus active-failure timing.

Actor attribution:

- captain/PF remains the strongest direct actor lane;
- first officer/PM monitoring lane remains relevant;
- FMC and procedure remain context, not direct actor;
- technical/procedure boundary pressure remains high enough to justify explicit warning.

Boundary warning:

- setup versus execution boundary remains open;
- procedural/FMC/MDA boundary remains open;
- there is risk of treating setup error alone as the final human act without reviewing the later controllable descent continuation.

## 4. Cross-case Consistency

- `Comair 5191` remains the clean anchor and the most stable case for candidate-only calibration.
- `Asiana 214` is usable only with explicit automation and 500 ft gate coevaluation.
- `UPS 1354` is usable only with explicit setup-versus-execution and MDA coevaluation.
- all three cases support the DR2 warning that escape point review should not collapse into a single untested timestamp.
- all three cases remain non-final and keep downstream blocked.

## 5. Opus Warning Compliance

This phase responds directly to the DR2 warning set by:

- carrying `first_departure_from_safe_operation` and `critical_unsafe_act` as separate fields;
- using `earliest_controllable_ref` and `latest_controllable_ref`;
- preserving Asiana automation boundary warning;
- preserving UPS setup/FMC/V-S/MDA boundary warning;
- keeping `Colgan 3407` excluded from this phase;
- keeping all outputs candidate-only and non-final.

## 6. Locks Preserved

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
