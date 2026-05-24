# SERA Engine vNext Guarded Narrative Draft Contract v0.2.0

## Status
- Status: DRAFT_FOR_REVIEW
- Phase: A4+R-69 — Guarded Narrative Draft Pack
- NO_FINAL_CONCLUSION
- NO_DOWNSTREAM
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS
- NO_RELEASED_CODE

## Objetivo
Definir o que é e o que não é uma guarded narrative draft para casos reais elegíveis no modo AI/Author.
A guarded narrative é um draft metodológico controlado: organiza fatos estruturados, interpretações candidatas e incertezas explícitas sem produzir conclusão causal final e sem abrir trilhas downstream.

## Campos permitidos
- factual narrative;
- methodological interpretation;
- proposedCode draft summary;
- unresolved axes;
- evidence limitations;
- excluded conclusions;
- next methodological need.

## Campos proibidos
- finalConclusion;
- causal final statement;
- HFACS;
- Risk/ERC;
- recommendations;
- action plan;
- releasedCode;
- selectedCode CLASSIFIED.

## Linguagem obrigatória
Usar linguagem de controle metodológico, incluindo os termos:
- "draft"
- "candidate"
- "unresolved"
- "available evidence suggests"
- "not sufficient to conclude"

Evitar linguagem conclusiva ou de fechamento causal, incluindo:
- "cause"
- "root cause"
- "final conclusion"
- "classified as final"
- "therefore the accident was caused by"

## Critério de elegibilidade
Uma guarded narrative draft só pode ser criada quando todos os critérios abaixo são atendidos:
- factualBasis existe;
- unsafeState está documentado;
- locks metodológicos estão explícitos;
- unresolved axes estão explícitos;
- proposedCode está claramente marcado como draft;
- o caso não está em SOURCE_PARTIAL crítico.

## Regras de preservação de locks
- proposedCode draft não vira releasedCode;
- selectedCode não vira CLASSIFIED;
- nenhum finalConclusion é produzido;
- nenhum conteúdo HFACS/Risk/ERC/recommendations é produzido;
- nenhuma abertura de fixture/baseline/downstream é permitida.
