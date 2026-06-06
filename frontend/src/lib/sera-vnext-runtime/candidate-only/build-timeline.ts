import type { SeraVNextCandidateTimelineItem } from "./types";

const TEMPORAL_CUES = [
  "before",
  "after",
  "during",
  "then",
  "when",
  "while",
  "antes",
  "depois",
  "durante",
  "então",
  "entao",
  "quando",
  "enquanto",
];

function extractTemporalCue(sentence: string): string | null {
  const lower = sentence.toLowerCase();
  return TEMPORAL_CUES.find((cue) => lower.includes(cue)) ?? null;
}

export function buildCandidateTimeline(sentences: string[]): SeraVNextCandidateTimelineItem[] {
  return sentences.slice(0, 8).map((statement, index) => ({
    order: index + 1,
    statement,
    temporalCue: extractTemporalCue(statement),
    sourceSentenceIndex: index,
  }));
}
