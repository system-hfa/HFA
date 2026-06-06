import { HTML_TAG_PATTERN, SECRET_FRAGMENT_PATTERN } from "./schema";
import type {
  SeraVNextCandidateAssessment,
  SeraVNextCandidateEscapeWindow,
  SeraVNextCandidateFact,
  SeraVNextCandidateOnlyResponse,
  SeraVNextCandidateTimelineItem,
} from "./types";

function compactWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function redactSensitiveFragments(value: string): string {
  return compactWhitespace(value.replace(SECRET_FRAGMENT_PATTERN, "[REDACTED_SECRET]"));
}

export function stripHtmlTags(value: string): string {
  return compactWhitespace(value.replace(HTML_TAG_PATTERN, " "));
}

function sanitizeFact(fact: SeraVNextCandidateFact): SeraVNextCandidateFact {
  return {
    ...fact,
    statement: redactSensitiveFragments(fact.statement),
  };
}

function sanitizeTimelineItem(item: SeraVNextCandidateTimelineItem): SeraVNextCandidateTimelineItem {
  return {
    ...item,
    statement: redactSensitiveFragments(item.statement),
    temporalCue: item.temporalCue ? redactSensitiveFragments(item.temporalCue) : null,
  };
}

function sanitizeAssessment(item: SeraVNextCandidateAssessment): SeraVNextCandidateAssessment {
  return {
    ...item,
    statement: redactSensitiveFragments(item.statement),
    supportingEvidence: item.supportingEvidence.map(redactSensitiveFragments),
    counterEvidence: item.counterEvidence.map(redactSensitiveFragments),
    limitations: item.limitations.map(redactSensitiveFragments),
  };
}

function sanitizeEscapeWindow(window: SeraVNextCandidateEscapeWindow): SeraVNextCandidateEscapeWindow {
  return {
    ...window,
    statement: window.statement ? redactSensitiveFragments(window.statement) : null,
    earliestCandidate: window.earliestCandidate ? redactSensitiveFragments(window.earliestCandidate) : null,
    latestCandidate: window.latestCandidate ? redactSensitiveFragments(window.latestCandidate) : null,
    supportingEvidence: window.supportingEvidence.map(redactSensitiveFragments),
    counterEvidence: window.counterEvidence.map(redactSensitiveFragments),
    limitations: window.limitations.map(redactSensitiveFragments),
  };
}

export function sanitizeCandidateResponse(
  response: SeraVNextCandidateOnlyResponse
): SeraVNextCandidateOnlyResponse {
  return {
    ...response,
    facts: response.facts.map(sanitizeFact),
    timeline: response.timeline.map(sanitizeTimelineItem),
    escapePointCandidate: sanitizeEscapeWindow(response.escapePointCandidate),
    reasoningLanes: {
      perception: response.reasoningLanes.perception.map(sanitizeAssessment),
      objective: response.reasoningLanes.objective.map(sanitizeAssessment),
      action: response.reasoningLanes.action.map(sanitizeAssessment),
    },
    uncertainties: response.uncertainties.map(redactSensitiveFragments),
    warnings: response.warnings.map(redactSensitiveFragments),
  };
}
