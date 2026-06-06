import { HTML_TAG_PATTERN, SECRET_FRAGMENT_PATTERN } from "./schema";
import type {
  SeraVNextCandidateOnlyResponse,
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

function sanitizeUnknown<T>(value: T): T {
  if (typeof value === "string") return redactSensitiveFragments(value) as T;
  if (Array.isArray(value)) return value.map((item) => sanitizeUnknown(item)) as T;
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, sanitizeUnknown(entry)]),
  ) as T;
}

export function sanitizeCandidateResponse(
  response: SeraVNextCandidateOnlyResponse
): SeraVNextCandidateOnlyResponse {
  return sanitizeUnknown(response);
}
