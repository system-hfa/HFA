import { runSeraVNextEngineV0 } from "../../sera-vnext/engine-v0/run-engine";
import { sanitizeCandidateResponse } from "./sanitize-output";
import { validateSeraVNextCandidateInput } from "./validate-input";
import type { SeraVNextCandidateOnlyInput, SeraVNextCandidateOnlyResponse } from "./types";

export function analyzeSeraVNextCandidateOnly(args: {
  input: SeraVNextCandidateOnlyInput;
  requestId: string;
}): SeraVNextCandidateOnlyResponse {
  const validated = validateSeraVNextCandidateInput(args.input);
  const engineOutput = runSeraVNextEngineV0({
    inputId: args.input.clientRequestId?.trim() || args.requestId,
    narrative: validated.normalizedEventText,
    locale: "en",
    sourceType: "real_event",
    sourceReference: args.input.clientRequestId?.trim() || undefined,
    requestId: args.requestId,
    mode: "CANDIDATE_ONLY",
    options: {
      allowLlm: false,
      includeDebugTrace: false,
      requireHumanReview: true,
    },
  });

  const warnings = [...validated.warnings];
  const uncertainties = [...validated.uncertainties, ...engineOutput.uncertainties];

  if (engineOutput.canonicalTraversal.status !== "COMPLETED_CANDIDATE_ONLY") {
    warnings.push("CANONICAL_TRAVERSAL_PARTIAL");
  }
  if (engineOutput.directActor.status !== "IDENTIFIED") {
    warnings.push("DIRECT_ACTOR_REVIEW_REQUIRED");
  }
  if (engineOutput.preconditions.length === 0) {
    warnings.push("NO_PRECONDITION_CANDIDATE");
  }
  return sanitizeCandidateResponse({
    ...engineOutput,
    requestId: args.requestId,
    inputAccepted: true,
    analysisStatus: "CANDIDATE_ONLY",
    canonicalTreeStatus: engineOutput.canonicalTraversal.status,
    uncertainties,
    warnings,
    persisted: false,
  });
}
