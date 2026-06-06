import {
  CANDIDATE_EVENT_TEXT_MAX_LENGTH,
  CANDIDATE_EVENT_TEXT_MIN_LENGTH,
  PROMPT_INJECTION_PATTERN,
  SCRIPT_TAG_PATTERN,
  URL_PATTERN,
} from "./schema";
import { redactSensitiveFragments, stripHtmlTags } from "./sanitize-output";
import type { SeraVNextCandidateOnlyInput, SeraVNextValidatedCandidateInput } from "./types";

export class SeraVNextCandidateValidationError extends Error {
  errorCode: string;
  status: number;

  constructor(errorCode: string, safeMessage: string, status = 400) {
    super(safeMessage);
    this.name = "SeraVNextCandidateValidationError";
    this.errorCode = errorCode;
    this.status = status;
  }
}

export function validateSeraVNextCandidateInput(
  input: SeraVNextCandidateOnlyInput
): SeraVNextValidatedCandidateInput {
  if (typeof input.eventText !== "string") {
    throw new SeraVNextCandidateValidationError(
      "SERA_VNEXT_CANDIDATE_INPUT_REQUIRED",
      "Campo eventText é obrigatório."
    );
  }

  const rawText = input.eventText.trim();
  if (!rawText) {
    throw new SeraVNextCandidateValidationError(
      "SERA_VNEXT_CANDIDATE_INPUT_EMPTY",
      "Campo eventText é obrigatório."
    );
  }

  if (rawText.length < CANDIDATE_EVENT_TEXT_MIN_LENGTH) {
    throw new SeraVNextCandidateValidationError(
      "SERA_VNEXT_CANDIDATE_INPUT_TOO_SHORT",
      `O relato deve ter pelo menos ${CANDIDATE_EVENT_TEXT_MIN_LENGTH} caracteres.`
    );
  }

  if (rawText.length > CANDIDATE_EVENT_TEXT_MAX_LENGTH) {
    throw new SeraVNextCandidateValidationError(
      "SERA_VNEXT_CANDIDATE_INPUT_TOO_LONG",
      `O relato deve ter no máximo ${CANDIDATE_EVENT_TEXT_MAX_LENGTH} caracteres.`
    );
  }

  if (URL_PATTERN.test(rawText)) {
    throw new SeraVNextCandidateValidationError(
      "SERA_VNEXT_CANDIDATE_URL_NOT_ALLOWED",
      "URLs não são aceitas neste endpoint interno."
    );
  }

  if (SCRIPT_TAG_PATTERN.test(rawText)) {
    throw new SeraVNextCandidateValidationError(
      "SERA_VNEXT_CANDIDATE_SCRIPT_NOT_ALLOWED",
      "Scripts ou HTML executável não são aceitos."
    );
  }

  const warnings: string[] = [
    "NON_FINAL_OUTPUT_ONLY",
    "NO_PERSISTENCE",
    "NO_EXTERNAL_CALLS",
    "REAL_TREE_MISSING",
  ];
  const uncertainties: string[] = [
    "Canonical SERA tree traversal is not available in this runtime path.",
  ];

  const htmlStripped = stripHtmlTags(rawText);
  if (htmlStripped !== rawText) {
    warnings.push("HTML_TAGS_STRIPPED");
  }

  if (PROMPT_INJECTION_PATTERN.test(rawText)) {
    warnings.push("PROMPT_INJECTION_TEXT_TREATED_AS_DATA");
    uncertainties.push("Prompt-injection-like phrasing was present and was treated only as event text.");
  }

  const normalizedEventText = redactSensitiveFragments(htmlStripped);
  if (normalizedEventText !== htmlStripped) {
    warnings.push("SENSITIVE_TEXT_REDACTED");
    uncertainties.push("Secret-like fragments were redacted before analysis output.");
  }

  return {
    normalizedEventText,
    characterCount: normalizedEventText.length,
    warnings,
    uncertainties,
  };
}
