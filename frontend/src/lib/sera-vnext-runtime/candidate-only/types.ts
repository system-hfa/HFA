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

export type SeraVNextCandidateOnlyResponse = {
  mode: "CANDIDATE_ONLY_NON_FINAL";
  requestId: string;
  inputAccepted: true;
  analysisStatus: "CANDIDATE_ONLY";
  canonicalTreeStatus: "REAL_TREE_MISSING";
  facts: SeraVNextCandidateFact[];
  timeline: SeraVNextCandidateTimelineItem[];
  escapePointCandidate: SeraVNextCandidateEscapeWindow;
  reasoningLanes: SeraVNextCandidateReasoningLane;
  uncertainties: string[];
  warnings: string[];
  selectedCode: null;
  releasedCode: null;
  finalConclusion: null;
  classifiedOutput: false;
  readyPromotion: false;
  downstreamAllowed: false;
  persisted: false;
};

export type SeraVNextValidatedCandidateInput = {
  normalizedEventText: string;
  characterCount: number;
  warnings: string[];
  uncertainties: string[];
};
