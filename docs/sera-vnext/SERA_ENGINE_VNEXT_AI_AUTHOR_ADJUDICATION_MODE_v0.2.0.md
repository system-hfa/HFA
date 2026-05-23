# SERA Engine vNext AI/Author Adjudication Mode v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-57 — AI/Author Adjudication Operating Mode

## Objetivo
Formalizar o modo operacional vNext em que o agente aplica a metodologia SERA-PT/HFA e o usuário atua como adjudicador metodológico final.

## Decisão de governança
- Revisão humana externa/inter-rater não é bloqueio operacional obrigatório para evolução do produto vNext.
- Inter-rater/kappa passam a backlog acadêmico e validação futura opcional.
- O agente (ChatGPT/agente) aplica a metodologia SERA-PT/HFA durante as fases operacionais.
- O usuário é o adjudicador final de decisões metodológicas relevantes.

## Operação padrão
1. O agente executa análise metodológica seguindo taxonomia canônica e decisões autorais vigentes.
2. Quando houver ambiguidade relevante, o agente deve perguntar ao usuário durante a fase.
3. O usuário decide pontos metodológicos críticos e resolve conflitos de interpretação.
4. Decisões relevantes são registradas em documentação de fase.
5. Erros apontados pelo usuário entram como correções controladas em fase posterior.

## Regras de adjudicação
- Perguntas pontuais ao usuário são obrigatórias quando a evidência não sustenta decisão robusta.
- O agente não deve mascarar incerteza como certeza metodológica.
- Decisões do usuário devem ser rastreáveis (documentadas com contexto e impacto).
- Correções pós-adjudicação devem preservar locks causais e escopo vNext.

## O que permanece opcional/futuro
- Inter-rater formal e kappa.
- Estudos de confiabilidade externa com avaliadores independentes.
- Claims fortes de validação científica/externa (dependem de validação adicional).

## Limites mantidos
- Sem abertura downstream.
- Sem promoção automática para `CLASSIFIED`.
- Sem `finalConclusion`, HFACS, Risk/ERC, recommendations.
- Sem alteração da decisão canônica A-A/A-C e do status reservado de O-E.

## Relação com freeze
- Evolução operacional do produto pode continuar sob modo AI/Author adjudication.
- Qualquer freeze científico/externo continua exigindo validação adicional futura.
- Nenhuma linguagem de metodologia cientificamente validada é autorizada nesta fase.
