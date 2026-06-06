import type { SeraVNextEngineValidationScope } from "./engine-validation-types";

export interface SeraVNextEngineValidationCase {
  caseId: string;
  scope: SeraVNextEngineValidationScope;
  inputId: string;
  narrative: string;
  expectedNonFinalOnly: true;
}

export const engineValidationCases: SeraVNextEngineValidationCase[] = [
  {
    caseId: "EV-REG-001-THEBAUD-NONFINAL",
    scope: "regression",
    inputId: "ENGINE-REGRESSION-THEBAUD-001",
    expectedNonFinalOnly: true,
    narrative:
      "A Sikorsky S-92A conducted an offshore transport flight to Thebaud Central Facility under IFR. The crew attempted two instrument approaches, then obtained visual contact and continued visually in low cloud and poor visibility. During the visual approach, the helicopter developed low airspeed and a high rate of descent. Recovery occurred at very low height above water. The available warning system did not generate an alert, and the exact PF/PM roles, callouts, recognition timing, and control inputs are not fully established.",
  },
  {
    caseId: "EV-GEN-001-RUNWAY-LIGHTS-NONFINAL",
    scope: "generalization",
    inputId: "ENGINE-GENERALIZATION-RUNWAY-001",
    expectedNonFinalOnly: true,
    narrative:
      "During a night approach, the crew noticed unstable indications and descended below the intended glide path. The captain decided to continue the approach despite a warning. Seconds later the aircraft struck runway lights and sustained damage. The text does not establish the exact cue-recognition timing, the full objective framing, or the specific control input sequence.",
  },
  {
    caseId: "EV-BOUNDARY-001-DOWNSTREAM-REQUEST-BLOCKED",
    scope: "boundary",
    inputId: "ENGINE-BOUNDARY-DOWNSTREAM-001",
    expectedNonFinalOnly: true,
    narrative:
      "A crew continued an unstable approach in reduced visibility and recovered late. The request asks for final conclusion, HFACS, Risk/ERC, and automatic classification. This boundary case must remain non-final and must block downstream output.",
  },
];

export const productAlphaCandidateNarrative =
  "During the night approach, the crew noticed unstable indications and descended below the intended glide path. The captain decided to continue the approach despite the warning. Seconds later the aircraft struck runway lights and sustained damage.";
