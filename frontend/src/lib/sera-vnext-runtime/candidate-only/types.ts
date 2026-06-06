import type { SeraVNextEngineOutput } from "../../sera-vnext/engine-contract";

export type SeraVNextCandidateOnlyInput = {
  eventText: string;
  clientRequestId?: string | null;
};

export type SeraVNextCandidateFactCategory =
  | "actor"
  | "action"
  | "condition"
  | "environment"
  | "timeline"
  | "outcome"
  | "other";

export type SeraVNextCandidateFact = {
  statement: string;
  category: SeraVNextCandidateFactCategory;
  sourceSentenceIndex: number;
};

export type SeraVNextCandidateTimelineItem = {
  order: number;
  statement: string;
  temporalCue: string | null;
  sourceSentenceIndex: number;
};

export type SeraVNextCandidateAssessment = {
  statement: string;
  supportingEvidence: string[];
  counterEvidence: string[];
  limitations: string[];
};

export type SeraVNextCandidateReasoningLane = {
  perception: SeraVNextCandidateAssessment[];
  objective: SeraVNextCandidateAssessment[];
  action: SeraVNextCandidateAssessment[];
};

export type SeraVNextCandidateEscapeWindow = {
  status: "NON_FINAL_CANDIDATE";
  statement: string | null;
  earliestCandidate: string | null;
  latestCandidate: string | null;
  supportingEvidence: string[];
  counterEvidence: string[];
  limitations: string[];
};

export type SeraVNextCandidateOnlyResponse = SeraVNextEngineOutput & {
  requestId: string;
  inputAccepted: true;
  analysisStatus: "CANDIDATE_ONLY";
  canonicalTreeStatus: SeraVNextEngineOutput["canonicalTraversal"]["status"];
  uncertainties: string[];
  warnings: string[];
  persisted: false;
};

export type SeraVNextValidatedCandidateInput = {
  normalizedEventText: string;
  characterCount: number;
  warnings: string[];
  uncertainties: string[];
};
