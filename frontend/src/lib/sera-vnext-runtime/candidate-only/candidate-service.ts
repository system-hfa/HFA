import { buildCandidateEscapeWindow } from "./build-escape-window";
import { extractCandidateFacts } from "./extract-facts";
import { buildCandidateReasoningLanes } from "./build-reasoning-lanes";
import { buildCandidateTimeline } from "./build-timeline";
import { sanitizeCandidateResponse } from "./sanitize-output";
import { validateSeraVNextCandidateInput } from "./validate-input";
import type { SeraVNextCandidateOnlyInput, SeraVNextCandidateOnlyResponse } from "./types";

export function analyzeSeraVNextCandidateOnly(args: {
  input: SeraVNextCandidateOnlyInput;
  requestId: string;
}): SeraVNextCandidateOnlyResponse {
  const validated = validateSeraVNextCandidateInput(args.input);
  const { facts, sentences } = extractCandidateFacts(validated.normalizedEventText);
  const timeline = buildCandidateTimeline(sentences);
  const escapePointCandidate = buildCandidateEscapeWindow(timeline);
  const reasoningLanes = buildCandidateReasoningLanes(facts);

  const uncertainties = [...validated.uncertainties];
  if (facts.length === 0) {
    uncertainties.push("No structured factual extraction could be produced from the submitted text.");
  }
  if (!reasoningLanes.perception.length) {
    uncertainties.push("No non-final perception-lane candidate was found from the submitted text alone.");
  }
  if (!reasoningLanes.objective.length) {
    uncertainties.push("No non-final objective-lane candidate was found from the submitted text alone.");
  }
  if (!reasoningLanes.action.length) {
    uncertainties.push("No non-final action-lane candidate was found from the submitted text alone.");
  }

  return sanitizeCandidateResponse({
    mode: "CANDIDATE_ONLY_NON_FINAL",
    requestId: args.requestId,
    inputAccepted: true,
    analysisStatus: "CANDIDATE_ONLY",
    canonicalTreeStatus: "REAL_TREE_MISSING",
    facts,
    timeline,
    escapePointCandidate,
    reasoningLanes,
    uncertainties,
    warnings: validated.warnings,
    selectedCode: null,
    releasedCode: null,
    finalConclusion: null,
    classifiedOutput: false,
    readyPromotion: false,
    downstreamAllowed: false,
    persisted: false,
  });
}
