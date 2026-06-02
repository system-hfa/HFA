# SERA vNext Colgan Escape Point Re-Audit - A4R202-B

Date: 2026-06-02
Phase: A4R202-B
Status: focused candidate-only re-audit

## 1. Objective

Re-audit Colgan 3407 escape-point timing without approving any final escape point and without creating any final P/O/A output.

## 2. Why Colgan needs a separate pass

- The pre-warning low-speed window is methodologically important but partly reconstructed from postaccident calculations.
- The immediate post-stick-shaker control input is the first fully explicit upset-control act in the source chronology.
- Training, icing, and ref-speed context are strong enough to pull the review into post-escape hunting or technical dominance if the candidate moment is not controlled tightly.

## 3. Candidate 1

- Candidate label: `LOW_SPEED_BEFORE_STICK_SHAKER`
- Candidate-only statement:
  quando a aeronave entrou abaixo da speed schedule aplicavel em icing por alguns segundos antes do stick shaker, sem correção integrada da tripulação, ainda com o autopilot engajado e a configuração final em progresso.
- Evidence in favor:
  FDR-derived comparison indicates about 8 seconds below the minimum icing approach speed before the stick shaker.
  Gear-down, flap-selection, and autopilot nose-up trim context were already active.
  The crew did not interrupt the approach before the warning despite an energy trend that was already adverse.
- Evidence against:
  The crew did not verbalize a direct low-speed recognition in that specific window.
  The low-speed interval is a reconstruction rather than a live callout sequence.
  The first explicit upset-control act still occurs later, at the captain's pull input.
- Impact on direct actor candidate:
  keeps the actor cockpit-centered, but distributes more weight across the integrated monitoring-and-energy-management lane rather than a single abrupt control act.
- Impact on PF/PM:
  highlights a shared monitoring burden before the warning rather than only PF control after the warning.
- Post-escape hunting risk:
  `MEDIUM`
- Outcome-bias risk:
  `MEDIUM`
- Candidate-only recommendation:
  retain as a valid early candidate, but not as an approved final boundary.

## 4. Candidate 2

- Candidate label: `IMMEDIATE_POST_SHAKER_PULL_INPUT`
- Candidate-only statement:
  quando o stick shaker ativou, o autopilot desconectou, e o capitão respondeu com input aft no manche em vez de descarregar a asa, iniciando a sequência de upset explicitamente documentada.
- Evidence in favor:
  Stick shaker onset and autopilot disconnect timing are explicit.
  The captain's immediate aft-column response is directly documented in the factual sequence.
  This is the first unambiguous control input in the upset sequence and reduces ambiguity about the operational moment under review.
- Evidence against:
  It may already be downstream of an earlier safe-operation escape if the real escape occurred in the pre-warning low-speed decay.
  Selecting it too quickly may under-read the earlier monitoring and speed-management failure.
- Impact on direct actor candidate:
  sharpens the PF-centered control-act boundary while still keeping PM cue burden in supporting context.
- Impact on PF/PM:
  increases captain/PF immediacy and reduces emphasis on the earlier shared monitoring window.
- Post-escape hunting risk:
  `LOW_MEDIUM`
- Outcome-bias risk:
  `MEDIUM`
- Candidate-only recommendation:
  retain as the strongest late candidate, but do not approve while the earlier low-speed window remains methodologically credible.

## 5. Candidate 3

- Candidate label: `REF_SPEED_AND_ICING_MISMATCH_AWARENESS`
- Candidate-only statement:
  quando o contexto de `ice detected`, ref-speeds, gear/flap configuration, e aproximação final passou a exigir leitura integrada de margem de energia, mas essa leitura não se converteu em correção suficiente antes do warning.
- Evidence in favor:
  `ice detected` appeared during final configuration.
  The speed brief and icing context were explicitly present before the stick shaker.
  This candidate may explain why the boundary could sit earlier than the warning itself.
- Evidence against:
  The timing is broader and less discrete than the two leading candidates.
  It risks becoming a context-heavy framing rather than a controlled operation moment.
- Impact on direct actor candidate:
  can still remain cockpit-centered, but it increases the chance of drifting toward precondition framing.
- Impact on PF/PM:
  emphasizes shared interpretation more than discrete control action.
- Post-escape hunting risk:
  `MEDIUM_HIGH`
- Outcome-bias risk:
  `MEDIUM`
- Candidate-only recommendation:
  keep as a background alternative, not as the preferred next author-review starting point.

## 6. Comparative read

| candidate_label | discrete timing clarity | actor clarity | PF/PM clarity | post_escape_hunting_risk | outcome_bias_risk | candidate_only_position |
| --- | --- | --- | --- | --- | --- | --- |
| LOW_SPEED_BEFORE_STICK_SHAKER | MEDIUM | MEDIUM_HIGH | MEDIUM | MEDIUM | MEDIUM | valid early candidate |
| IMMEDIATE_POST_SHAKER_PULL_INPUT | HIGH | HIGH | HIGH | LOW_MEDIUM | MEDIUM | valid late candidate |
| REF_SPEED_AND_ICING_MISMATCH_AWARENESS | MEDIUM_LOW | MEDIUM | MEDIUM | MEDIUM_HIGH | MEDIUM | background alternative |

## 7. Candidate-only conclusion

Colgan 3407 should remain `ESCAPE_POINT_REAUDIT_REQUIRED`.

Conservative reading:

- Candidate 1 preserves the at-escape-point rule by treating the low-speed decay as potentially the earlier operational escape.
- Candidate 2 preserves discrete timing clarity by anchoring the first explicit upset-control input.
- The record is not weak, but it is still ambiguous enough that approving either candidate as final would be premature in A4R202-B.

## 8. Final escape-point lock

- final escape point approved: NO
- P/O/A final classification created: NO
- READY automatic promotion: NO
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
