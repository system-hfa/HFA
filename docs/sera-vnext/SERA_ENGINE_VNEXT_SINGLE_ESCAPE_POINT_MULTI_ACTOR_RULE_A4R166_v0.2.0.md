# SERA Engine vNext Single Escape Point Multi Actor Rule A4R166 v0.2.0

**Document Status**: ACTIVE / DESIGN_RULE / DRAFT_ONLY
**Authority Tier**: Tier 1 / active work package rule
**Can override canonical method lock?**: NO
**Can be used for P/O/A classification?**: YES, only to prevent erroneous multiple-escape-point analysis
**Downstream allowed?**: NO

## 1. Motivo da correcao

A formulacao anterior de "multi-escape-point" pode induzir busca de varios pontos de fuga sequenciais no mesmo evento.
Isso conflita com a logica canonica do ponto de fuga principal e aumenta risco de hindsight em cascata.

## 2. Base canonica

Esta regra nao cria metodologia nova.
Ela apenas operacionaliza a base canonica SERA/Hendy: quando houver varios atos inseguros ou condicoes inseguras relevantes para analise, o processo deve ser seguido separadamente para cada ato/condicao insegura.

## 3. Regra correta

- Existe um ponto de fuga principal por escopo de analise.
- O ponto de fuga principal e o primeiro momento em que a operacao deixou de estar defensavelmente segura.
- Depois de definido esse ponto, podem existir multiplos atores diretos contribuindo para o mesmo ponto.
- As contribuicoes dos atores podem ser analisadas separadamente.
- Todas as contribuicoes devem apontar para o mesmo `escapePointId`.
- Eventos posteriores ao ponto de fuga sao consequencia, agravamento, recuperacao ou contexto; nao criam novos pontos de fuga na analise principal.

## 4. Estrutura correta

Use:

```text
event
  -> escapePoint
       -> unsafeActOrCondition
       -> actorContribution[]
            -> actor
            -> role
            -> controlledVariable
            -> P/O/A trace
```

Nao use:

```text
event
  -> escapePoint[1]
  -> escapePoint[2]
```

## 5. Aplicacao ao EXECUFLIGHT-1526

`escapePointId`:
- `EXECUFLIGHT-1526-ESCAPE-001`

`escapePointStatement`:
- Apos cruzar o FAF alto, a aeronave entra/continua em descida agressiva e a continuidade da aproximacao deixa de estar defensavelmente segura.

`actorContributionId` 1:
- `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF`
- actor: First Officer
- role: PF
- contribution: controle/continuidade do perfil vertical, razao de descida, velocidade e aproximacao
- P/O/A draft: `P-D / O-D / A-H`
- status: `AUTHOR_APPROVED_DRAFT`

`actorContributionId` 2:
- `EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM`
- actor: Captain
- role: PM
- contribution: monitoramento, verbalizacao de preocupacao, ausencia de intervencao positiva/takeover/missed approach no intervalo critico
- P/O/A draft: `P-A / O-D / A-G`
- status: `AUTHOR_APPROVED_DRAFT`

Status operacional para este pacote:
- `EXECUFLIGHT_READY_FOR_CANONICAL_POA_WITH_SINGLE_ESCAPE_POINT_MULTI_ACTOR_CONTRIBUTIONS`

## 6. Proibicoes

- Nao usar percepcao de um ator para classificar acao de outro.
- Nao usar objetivo de um ator para classificar omissao de outro.
- Nao fundir FO/PF e Captain/PM em analise generica da tripulacao.
- Nao transformar cada consequencia posterior em novo ponto de fuga.
- Nao usar termos `EP1/EP2` para EXECUFLIGHT neste pacote.
- Nao usar "multi-escape-point" como regra ativa.
- Usar somente SERA ou SERA vNext.

## 7. Limites

- docs-only
- sem runtime
- sem migration
- sem fixture
- sem baseline
- sem releasedCode
- sem downstream
- sem finalConclusion
- sem HFACS
- sem Risk/ERC
- sem ARMS/ERC
- sem recommendations
- sem fixture/baseline/release nesta fase
