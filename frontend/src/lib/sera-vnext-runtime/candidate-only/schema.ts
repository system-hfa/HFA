export const CANDIDATE_EVENT_TEXT_MIN_LENGTH = 40;
export const CANDIDATE_EVENT_TEXT_MAX_LENGTH = 12000;

export const URL_PATTERN =
  /\b(?:https?:\/\/|www\.|ftp:\/\/|file:\/\/|data:text\/html|javascript:)/i;

export const SCRIPT_TAG_PATTERN = /<\s*script\b/i;
export const HTML_TAG_PATTERN = /<\/?[a-z][^>]*>/gi;

export const PROMPT_INJECTION_PATTERN =
  /\b(?:ignore (?:all |the )?(?:previous|prior) instructions|system prompt|developer message|jailbreak|bypass guardrails)\b/i;

export const SECRET_FRAGMENT_PATTERN =
  /\b(?:sk-[A-Za-z0-9_-]{20,}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9._-]{10,}|Bearer\s+[A-Za-z0-9._-]{10,}|AKIA[0-9A-Z]{16})\b/g;

export const OUTCOME_KEYWORDS = [
  "crash",
  "impact",
  "collision",
  "injury",
  "fatal",
  "damage",
  "ditch",
  "fell",
  "hit",
  "strike",
  "acidente",
  "impacto",
  "colisão",
  "colisao",
  "ferido",
  "fatal",
  "dano",
  "queda",
  "bateu",
];
