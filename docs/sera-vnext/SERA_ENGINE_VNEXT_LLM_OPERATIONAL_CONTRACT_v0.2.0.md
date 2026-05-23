# SERA Engine vNext LLM Operational Contract v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-49 — LLM Operational Contract

## Objetivo
Estabelecer os limites operacionais do uso de LLM no pipeline SERA vNext, definindo com precisão o que o LLM pode e não pode fazer, e sob quais condições seu output pode ser aceito.

## Escopo
- Definição de permissões e proibições do LLM no fluxo de classificação causal.
- Contrato de subordinação do LLM à revisão humana.
- Política de introdução incremental de capacidades LLM.
- Relação com evidence categories e inter-rater.

## Fora de escopo
- Implementação de qualquer feature de LLM.
- Integração com API de LLM externa.
- Prompt engineering específico.
- Substituição de revisão humana por LLM.

## Princípio central
**LLM é auxiliar, não autoridade classificatória.**

O LLM atua como ferramenta de apoio à decisão humana. Nenhum output de LLM tem autoridade para alterar o estado do núcleo causal sem passar pelos gates de release e revisão humana já estabelecidos.

## LLM pode
- Extrair fatos de narrativas e evidências textuais.
- Sugerir hypotheses com baixa autoridade (status `ADVISORY`, nunca `CLASSIFIED`).
- Estruturar evidências em formato rastreável.
- Resumir evidências para revisão humana.
- Redigir narrativa somente após release/guards futuros definidos e revisão humana obrigatória.
- Apoiar revisão humana com sugestões rastreáveis e bloqueáveis.

## LLM não pode
- Liberar `releasedCode` (code release gate é exclusivamente humano).
- Alterar `selectedCode` (não há `CLASSIFIED` automático).
- Classificar P/O/A autonomamente (sem revisão humana).
- Inferir intenção ou consciência sem evidência referenciada.
- Emitir HFACS.
- Emitir Risk/ERC.
- Emitir ARMS/ERC.
- Emitir recomendações finais.
- Emitir `finalConclusion`.
- Contornar o code release gate.
- Contornar o semantic guard.
- Contornar a revisão humana.

## Todo output LLM deve ser
- **Advisory**: rotulado como sugestão, nunca como decisão final.
- **Traceável**: vinculado a evidências e rationale referenciados.
- **Revisável**: todo output deve ser submetido a revisão humana antes de qualquer aceitação.
- **Bloqueável**: decisão humana pode rejeitar output de LLM sem justificativa adicional.
- **Subordinado a evidências e revisão humana**: output de LLM não constitui evidência por si só.

## Política de uso futuro
A introdução de capacidades LLM seguirá três estágios incrementais:

1. **Modo draft**: LLM opera em modo puramente consultivo, sem efeito no runtime. Output visível apenas para revisão humana, sem integração com pipeline.
2. **Modo warning**: LLM pode emitir sugestões com warnings visíveis, ainda sem efeito automático no pipeline. Revisão humana obrigatória para aceitação.
3. **Modo integração controlada**: output de LLM pode ser aceito no pipeline somente após:
   - consenso de casos de referência disponível;
   - protocolo inter-rater executado com thresholds aceitáveis;
   - evidence categories ativas (runtime ou decisão de manter design-only documentada);
   - gates de release e semantic guard preservados.

Em nenhum estágio o LLM substitui a decisão humana final sobre classificação.

## Relação com evidence categories
- LLM pode sugerir categorias de evidência (`PHYSICAL_CAPABILITY`, `INTENT_AWARENESS`, etc.) como metadado consultivo.
- A decisão de categorização permanece humana.
- Evidence categories permanecem design-only nesta fase, sem obrigatoriedade de runtime.

## Relação com inter-rater
- LLM não participa como avaliador no protocolo inter-rater.
- LLM pode apoiar a preparação de material para revisores (resumos, estruturação), mas não substitui nenhum revisor humano.
- Output de LLM não conta como "avaliador" para cálculo de kappa ou concordância.

## Locks atuais preservados
Este contrato não altera nenhum lock existente:
- `downstreamLocked = true`
- `finalConclusionLocked = true`
- `hfacsLocked = true`
- `riskLocked = true`
- `recommendationsLocked = true`
- `selectedCodesRemainUnresolved`
- `causalCoreOnly = true`

## Linguagem metodológica
Este documento estabelece governança de uso de LLM como ferramenta auxiliar. Não constitui claim de que o sistema é "validado por IA" ou "automatizado por IA". O núcleo causal permanece sob decisão humana.

Linguagem recomendada: `LLM-assisted advisory pipeline under human supervision`
Linguagem a evitar: `AI-validated`, `AI-classified`, `LLM-automated classification`
