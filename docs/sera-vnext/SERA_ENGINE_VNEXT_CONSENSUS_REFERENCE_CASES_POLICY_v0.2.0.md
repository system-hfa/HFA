# SERA Engine vNext Consensus Reference Cases Policy v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-49 — Consensus Reference Cases Policy

## Objetivo
Definir a política de criação, governança e uso de casos de referência por consenso metodológico, que servirão como base de calibração, regressão e comparação entre avaliadores, sem jamais serem tratados como verdade causal absoluta.

## Por que não usar "golden cases" como verdade absoluta
- "Golden case" implica verdade causal estabelecida e indiscutível, o que é incompatível com a natureza inferencial da análise de fatores humanos.
- A metodologia SERA opera com inferência baseada em evidências, não com verdade absoluta.
- Casos de referência são construídos por consenso entre avaliadores qualificados, com incerteza documentada.
- A taxonomia SERA-PT, embora canônica, está sob validação (não é `scientifically validated`).

## Definição: consensus reference case
Um **consensus reference case** é um caso documentado cuja classificação P/O/A foi estabelecida por consenso entre pelo menos 2 avaliadores qualificados, com rationale registrado, incerteza explícita, e alternativas rejeitadas documentadas. Serve como referência para calibração, não como verdade absoluta.

## Uso permitido
- Regressão: verificar se alterações no pipeline não quebram classificações de referência.
- Calibração: alinhar interpretação taxonômica entre avaliadores.
- Treinamento: formar novos revisores na taxonomia SERA-PT.
- Comparação entre avaliadores: base para protocolo inter-rater.
- Estabilidade do core: monitorar consistência do núcleo causal ao longo do tempo.

## Uso proibido
- Alegar verdade causal absoluta sobre o caso.
- Substituir julgamento humano independente em novos casos.
- Declarar validação científica final da metodologia.
- Bloquear revisão ou reclassificação futura com base em caso de referência.
- Usar como evidência em contexto regulatório ou legal sem qualificação explícita de incerteza.

## Estrutura de cada caso
Cada consensus reference case deve conter:

- **caseId**: identificador único do caso.
- **sourceType**: `REAL_EVENT | SYNTHETIC | ADVERSARIAL | NEGATIVE_CONTROL | AMBIGUITY`.
- **factualSummary**: resumo factual do evento ou cenário (sem classificação).
- **unsafeState**: descrição do estado inseguro relevante.
- **unsafeActCondition**: descrição do ato ou condição insegura sob análise.
- **released P/O/A por consenso**: códigos liberados por consenso, por eixo.
- **rationale**: justificativa metodológica para cada código.
- **evidenceRefs**: referências a evidências que suportam a classificação.
- **acceptedUncertainty**: incertezas reconhecidas e documentadas no consenso.
- **rejectedAlternatives**: códigos alternativos considerados e rejeitados, com justificativa.
- **expectedLocks**: locks downstream esperados para o caso.
- **notes**: observações metodológicas, contexto adicional, limitações.

## Tipos de casos
- **Nominal**: caso típico com classificação clara, esperado como baseline de concordância.
- **Negative control**: caso construído para testar que o sistema NÃO classifica incorretamente (ex.: evento sem fator humano relevante).
- **Adversarial**: caso projetado para expor ambiguidades ou fronteiras da taxonomia.
- **Ambiguity case**: caso com evidência insuficiente ou conflitante, esperado como `INSUFFICIENT_EVIDENCE` ou com divergência documentada.
- **Multi-actor context**: caso envolvendo múltiplos agentes, sem modelar múltiplos unsafe acts ainda nesta fase. Apenas um ato/condição insegura por caso.

## Critérios mínimos para promover um caso a consensus reference
1. Revisão por pelo menos 2 avaliadores qualificados.
2. Divergências documentadas e resolvidas ou explicitamente mantidas.
3. Decisão autoral/metodológica registrada para cada código liberado.
4. Não contradizer a taxonomia canônica SERA-PT v1.0.
5. Respeitar a decisão autoral A-A/A-C (`A-A` = sem falha de ação específica; `A-C` = falha de feedback pós-ação própria).
6. Respeitar `O-E` como `NON_EXISTENT_IN_SERA_PT_V1`.

## Relação com inter-rater
- Consensus reference cases formam a base de casos para o protocolo inter-rater.
- A execução do protocolo inter-rater pode gerar novos consensus reference cases.
- Divergências sistemáticas no inter-rater podem levar à revisão de casos de referência existentes.
- A política de casos de referência e o protocolo inter-rater são complementares e interdependentes.

## Relação com candidate freeze
- Um conjunto inicial de consensus reference cases é pré-requisito para candidatura a freeze.
- O freeze final não será declarado sem:
  - conjunto mínimo de casos de referência materializados;
  - protocolo inter-rater executado sobre esses casos;
  - documentação de divergências e resoluções.

## Limitações
- Casos de referência não validam a metodologia, apenas estabelecem baseline de consenso.
- Não cobrem todos os códigos da taxonomia (cobertura parcial esperada inicialmente).
- Não substituem validação empírica com dados reais independentes.
- Não constituem norma regulatória.
