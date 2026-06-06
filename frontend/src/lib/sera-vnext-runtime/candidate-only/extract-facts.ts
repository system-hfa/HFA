import type { SeraVNextCandidateFact, SeraVNextCandidateFactCategory } from "./types";

function classifyFactCategory(sentence: string): SeraVNextCandidateFactCategory {
  const text = sentence.toLowerCase();
  if (/\b(crew|pilot|captain|first officer|operator|maintenance|controller|tripula|comandante)\b/.test(text)) {
    return "actor";
  }
  if (/\b(before|after|during|then|when|while|antes|depois|durante|ent[aã]o|quando)\b/.test(text)) {
    return "timeline";
  }
  if (/\b(cloud|visibility|weather|wind|rain|fog|night|wx|nuvem|visibilidade|tempo|chuva|nevoeiro|vento)\b/.test(text)) {
    return "environment";
  }
  if (/\b(alert|warning|system|failure|fault|degraded|condition|unsafe|alerta|falha|condi[cç][aã]o|degradad)\b/.test(text)) {
    return "condition";
  }
  if (/\b(crash|impact|collision|injury|fatal|damage|acidente|impacto|colis[aã]o|ferid|fatal|dano)\b/.test(text)) {
    return "outcome";
  }
  if (/\b(did|failed|continued|descended|climbed|turned|landed|executed|applied|fez|falhou|continuou|desceu|subiu|virou|pousou|executou|aplicou)\b/.test(text)) {
    return "action";
  }
  return "other";
}

export function splitNarrativeIntoSentences(input: string): string[] {
  return input
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export function extractCandidateFacts(input: string): {
  facts: SeraVNextCandidateFact[];
  sentences: string[];
} {
  const sentences = splitNarrativeIntoSentences(input);
  const facts = sentences.slice(0, 12).map((statement, index) => ({
    statement,
    category: classifyFactCategory(statement),
    sourceSentenceIndex: index,
  }));

  return { facts, sentences };
}
