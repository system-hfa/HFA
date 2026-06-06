import type {
  SeraVNextCandidateAssessment,
  SeraVNextCandidateFact,
  SeraVNextCandidateReasoningLane,
} from "./types";

type LaneKey = keyof SeraVNextCandidateReasoningLane;

const LANE_KEYWORDS: Record<LaneKey, RegExp> = {
  perception:
    /\b(saw|noticed|perceived|recognized|warning|alert|visual|instrument|cue|awareness|viu|percebeu|reconheceu|alerta|visual|instrumento|sinal)\b/i,
  objective:
    /\b(intended|intention|goal|objective|plan|planned|decided|chose|continued|wanted|pretendia|objetivo|planejou|decidiu|escolheu|continuou|quis)\b/i,
  action:
    /\b(executed|did|failed|turned|descended|climbed|applied|configured|landed|executou|fez|falhou|virou|desceu|subiu|aplicou|configurou|pousou)\b/i,
};

function toAssessment(lane: LaneKey, fact: SeraVNextCandidateFact): SeraVNextCandidateAssessment {
  return {
    statement: `Non-final ${lane} candidate derived from submitted event text.`,
    supportingEvidence: [fact.statement],
    counterEvidence: ["No canonical-tree traversal or final P/O/A determination is available in this runtime path."],
    limitations: [
      "REAL_TREE_MISSING",
      "This lane is candidate-only and cannot be promoted to selected/released/final output.",
    ],
  };
}

export function buildCandidateReasoningLanes(
  facts: SeraVNextCandidateFact[]
): SeraVNextCandidateReasoningLane {
  const lanes: SeraVNextCandidateReasoningLane = {
    perception: [],
    objective: [],
    action: [],
  };

  for (const lane of Object.keys(lanes) as LaneKey[]) {
    lanes[lane] = facts.filter((fact) => LANE_KEYWORDS[lane].test(fact.statement)).slice(0, 3).map((fact) =>
      toAssessment(lane, fact)
    );
  }

  return lanes;
}
