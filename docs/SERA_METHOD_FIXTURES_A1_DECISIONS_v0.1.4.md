# SERA v0.1.4-A1 — Methodological Fixture Decisions

## Contexto

Este documento congela decisões metodológicas para a fase **SERA v0.1.4-A1-GOV+**, após revisão A0/A1 das novas fixtures Hendy + Daumas.

Escopo desta fase:
- Documentar decisões metodológicas para remover ambiguidade antes da materialização JSON.
- Registrar precedência normativa entre Hendy, HFA/SERA e Daumas.
- Definir critérios de evidência, promoção/rebaixamento e política de resultado.

Fora de escopo desta fase:
- Não criar fixtures JSON.
- Não alterar motor SERA.
- Não alterar fixtures existentes, baseline, pipeline, Risk Profile ou matriz ERC.
- Não rodar bateria noturna como gate de mudança.

Base conceitual:
- **Hendy**: fonte metodológica primária para arquitetura SERA, especialmente ponto de fuga.
- **Daumas**: fonte aplicada para contexto offshore, MDC e eventos reais; útil para hipóteses e casos.
- **Teste metodológico vs teste de software**: aqui o foco é governança de classificação (A0/A1), não implementação de runtime.

## Precedência Metodológica

### Decisão 0 — Precedência metodológica

Para fins de fixture, validação e classificação automática do HFA/SERA:
1. Hendy é a fonte metodológica primária da arquitetura SERA.
2. Daumas é fonte secundária/aplicada:
   - útil para contexto offshore;
   - útil para MDC;
   - útil para eventos reais;
   - útil para hipóteses de pré-condições;
   - não prevalece sobre Hendy em divergência conceitual.
3. HFA/SERA pode adotar regras mais conservadoras que Hendy por prudência metodológica, operacional ou de produto, desde que isso seja declarado como adaptação.
4. Quando Daumas e Hendy divergirem, prevalece Hendy.
5. Quando HFA/SERA divergir de Hendy, a divergência deve ser marcada como `ADAPTATION_NOTE`.
6. Adaptação conservadora HFA/SERA não pode ser apresentada como formulação original de Hendy.

### Precedência formal

1. Hendy — fonte metodológica primária.
2. HFA/SERA — adaptação conservadora congelada para automação/produto, quando explicitamente documentada.
3. Daumas — aplicação offshore e fonte de casos, sujeita a revisão quando divergir de Hendy ou da regra congelada HFA/SERA.

## Regra A0 (Ponto de Fuga)

- Ponto de fuga = ato/condição insegura observável.
- Regra de fixture mais estrita que Hendy:
  - caso simples: usar o primeiro desvio observável;
  - evento multi-act: separar subcasos;
  - não colapsar múltiplos atos em único expected P/O/A.
- Casos negativos/evidência insuficiente:
  - não forçar P/O/A humano quando não houver ato/condição operacional observável.

## Decisões A1-GOV+

### Decisão 1 — O-C estrito como adaptação HFA/SERA

Hendy pode admitir "exceptional violation" em sentido mais amplo, inclusive sem violação necessariamente consciente.

Para fixture automática/produto, HFA/SERA adota regra conservadora:
- **O-C** = violação excepcional/circunstancial/não rotineira com evidência de afastamento consciente de regra, limite, procedimento ou expectativa conhecida.

Consequências:
- Sem evidência de consciência do afastamento, usar **O-D**, não O-C.
- Divergências com Hendy/Daumas devem receber `ADAPTATION_NOTE`.
- Motivação: reduzir overclassification de "violação" sem evidência forte.
- Esta é escolha HFA/SERA, não afirmação de que Hendy exigia awareness explícita.

Aplicações provisórias:
- `A0-FUEL-001`: P-H / O-D / A-A.
  - `ADAPTATION_NOTE`: Hendy pode sustentar O-C/exceptional violation; HFA/SERA usa O-D por ausência de awareness explícita.
- `A0-DAUMAS-E03`: P-H / O-D / A-G.
  - `ADAPTATION_NOTE`: Daumas classifica O-C; HFA/SERA usa O-D se a retirada da mão não foi deliberadamente entendida como violação.
- `A0-DAUMAS-E01-A`: P-A / O-D / A-F.
  - `ADAPTATION_NOTE`: usar O-C somente se houver evidência explícita de consciência de regra/limite violado.
- `A0-DAUMAS-E02-A`: P-A / O-C / A-F.
  - Sem adaptação: há awareness explícita dos mínimos.
- `A0-VIS-001-ADJ`: P-A / O-D / A-F.
  - `ADAPTATION_NOTE`: usar O-C somente se o cenário declarar awareness explícita de limite/regra.

### Decisão 2 — Slip/Lapse/Mode-Error

Regra:
- Se existir código específico de slip/lapse/mode-error na taxonomia runtime atual, usá-lo.
- Se não existir, manter casos como `A0-AUTO-002-WRONG-VERTICAL-MODE-SELECTED` em `CODE_REVIEW`/revisão humana, fora de gate automático.
- Não criar código novo nesta fase.
- Não forçar A-F quando o caso descreve seleção inadvertida, modo errado ou ação diferente da intenção.

Impacto:
- `A0-AUTO-002` fica fora do gate automático até confirmação da taxonomia runtime.
- Casos de configuração/trem/flap só entram como P-G/O-A/A-A se a narrativa sustentar lapso de percepção/monitoramento e não erro de execução/mode error.
- Se houver código específico, revisar matriz A1 antes de JSON.

### Decisão 3 — Critério A-A vs A-G

**A-A**:
- usar quando a ação executada foi coerente com a percepção e o objetivo do operador,
- e o relato não mostra etapa explícita de verificação/feedback omitida.

**A-G**:
- usar quando havia verificação, monitoramento, cross-check ou feedback esperado,
- disponível e relevante após ação/estado,
- e essa verificação foi omitida ou falhou.

Aplicações importantes:
- `A0-AUTO-004-ADJ`: P-A / O-A / A-G
- `A0-CHK-003`: P-G / O-A / A-G
- `A0-DAUMAS-E03`: P-H / O-D / A-G

Regra prática:
- A-G exige feedback/check explícito, disponível e esperado.
- A-A quando a ação foi coerente com percepção errada sem etapa de feedback claramente omitida.
- Não usar A-G como erro genérico se o problema principal é percepção anterior.

### Decisão 4 — Gatilhos [CALIBRAR]

Gatilhos em fixtures candidatas são parâmetros explícitos de cenário de teste.

Não representam regra universal, SOP real ou norma operacional sem fonte operacional.

Aplicações:
- `VIS-001`: gatilho operacional definido no cenário.
- `CHK-002`: gatilho paramétrico definido no cenário.
- `AUTO-004`: procedimento do cenário quando FMA callout não estiver formalmente documentado.

Regra:
- A fixture deve declarar o gatilho no próprio cenário.
- Se vier de SOP/manual/regulamento, citar no campo `methodology_notes`.
- Se for sintético, declarar: `scenario parameter, not universal SOP`.
- Não misturar gatilho sintético com alegação de regra operacional real.

### Decisão 5 — Níveis de Evidência

#### Níveis de evidência da fixture

- **E0 — Evidência insuficiente**:
  - não permite ponto de fuga nem P/O/A;
  - exemplo: relato só diz "houve erro humano".
- **E1 — Evidência operacional factual**:
  - permite A0;
  - P/O/A inferencial;
  - preferencialmente exploratório, salvo padrão altamente canônico.
- **E2 — Evidência cognitiva indireta**:
  - há indícios do que o operador percebeu, pretendia ou verificou;
  - pode virar gate se não houver `CODE_REVIEW` nem `[CALIBRAR]`.
- **E3 — Evidência cognitiva direta**:
  - há relato, CVR, depoimento, timeline ou equivalente sustentando P/O/A;
  - preferível para gate automático.
- **E4 — Caso-golden**:
  - referência metodológica explícita em Hendy/Daumas ou caso canônico já analisado;
  - se HFA/SERA divergir de Hendy/Daumas, manter `ADAPTATION_NOTE`.

Regra:
- Gate automático deve preferir E2+.
- E1 só entra em gate quando canônico, simples e com baixo risco de classificação alternativa.
- E0 nunca entra como positivo; pode entrar como negativo/evidência insuficiente.
- Casos Daumas não são automaticamente E4 se sua interpretação divergir de Hendy ou da regra HFA/SERA.

### Decisão 6 — Política PASS / PARTIAL / FAIL

#### Política de resultado por tipo de fixture

Gate automático positivo:
- **PASS**: P/O/A bate integralmente com expected.
- **PARTIAL**: apenas ERC diverge ou há alternativa previamente registrada como `accepted_alternative`.
- **FAIL**: divergência P/O/A não prevista.

Exploratório:
- não bloqueia deploy;
- divergência triada como:
  - motor errado;
  - fixture ambígua;
  - expected frágil;
  - falta de evidência;
  - taxonomia incompleta;
  - `CODE_REVIEW`;
  - `ERC_REVIEW`.

Negativo/evidência insuficiente:
- **PASS**: sistema rejeita ou sinaliza evidência insuficiente/técnica.
- **FAIL**: sistema força P/O/A humano sem base.
- **PARTIAL**: sistema sinaliza baixa confiança, mas tenta classificar.

Multi-act estrutural:
- **PASS**: sistema reconhece múltiplos atos/condições ou não colapsa narrativa em análise única.
- **FAIL**: sistema escolhe único P/O/A como evento simples.
- **PARTIAL**: reconhece múltiplos elementos, mas não separa subcasos.

Exploratório noturno:
- resultado não altera baseline nem bloqueia merge;
- deve gerar relatório de triagem, sem correção automática.

### Decisão 7 — Promoção / Rebaixamento

#### Critérios de promoção para gate automático

Caso exploratório só vira gate quando:
1. ponto de fuga A0 fechado;
2. P/O/A com evidência E2+ ou E1 canônico e simples;
3. sem `CODE_REVIEW` pendente;
4. sem `[CALIBRAR]` pendente;
5. ERC não for critério de PASS/FAIL ou estiver congelado;
6. expected com revisão humana ou cruzada;
7. `N_RUNS=3` com estabilidade/determinismo aceitável;
8. sem conflito não documentado entre Hendy, Daumas e HFA/SERA.

#### Critérios de rebaixamento

Gate volta para exploratório se:
1. houver ambiguidade P/O/A defensável;
2. depender de código inexistente;
3. houver divergência Hendy/Daumas/HFA sem `ADAPTATION_NOTE`;
4. houver flutuação recorrente em `N_RUNS`;
5. depender de evidência cognitiva ausente no relato;
6. depender de gatilho operacional não declarado;
7. gerar FAIL em caso-âncora sem explicação.

### Decisão 8 — Política ERC nesta fase

#### Política ERC

Nesta fase:
- ERC não é critério de PASS/FAIL.
- Todos os casos devem ser marcados `ERC_REVIEW` ou `erc_level=null` se o schema permitir.
- Se o runner exigir ERC numérico, não promover casos a gate automático até contrato ERC próprio.
- A2 pode materializar ERC como review/null apenas se runner e schema suportarem.
- Não reabrir Risk Profile nem conversão ERC nesta fase.
- Não alterar matriz ERC.
- Não usar ERC para bloquear P/O/A enquanto contrato de risco não estiver congelado.

### Decisão 9 — ADAPTATION_NOTE

Campo obrigatório quando:
1. HFA/SERA diverge de Hendy;
2. HFA/SERA diverge de Daumas;
3. Hendy e Daumas divergem entre si;
4. caso Daumas é reinterpretado;
5. O-C vira O-D por regra conservadora HFA/SERA;
6. Daumas é mantido como contexto, mas não como expected normativo.

Formato sugerido:

```yaml
ADAPTATION_NOTE:
  source_conflict: Hendy | Daumas | Hendy_vs_Daumas | HFA_policy
  original_interpretation: "..."
  hfa_sera_interpretation: "..."
  rationale: "..."
  impact_on_expected: "..."
```

## Matriz A1-Final Provisória — Candidatos a Gate Automático (sem JSON)

| case_id | expected_poa | evidence_level | gate_candidate | erc_policy | adaptation_note_required | remarks |
|---|---|---|---|---|---|---|
| A0-VIS-003 | P-G / O-A / A-A | E2 | yes | ERC_REVIEW | no | padrão canônico de percepção operacional |
| A0-VIS-005 | P-H / O-A / A-A | E2 | yes | ERC_REVIEW | no | canônico, sem conflito metodológico explícito |
| A0-AUTO-001 | P-C / O-A / A-E | E2 | yes | ERC_REVIEW | no | caso estável, sem dependência de ERC |
| A0-AUTO-003 | P-D / O-A / A-H | E2 | yes | ERC_REVIEW | no | classificação objetiva de ação/comando |
| A0-FUEL-002 | P-G / O-A / A-A | E2 | yes | ERC_REVIEW | no | cenário de percepção operacional consistente |
| A0-CONFIG-001 | P-G / O-A / A-A | E1 | yes | ERC_REVIEW | no | canônico simples; manter revisão cruzada |
| A0-CONFIG-002 | P-G / O-A / A-A | E1 | yes | ERC_REVIEW | no | canônico simples; risco baixo de alternativa |
| A0-SEP-002 | P-G / O-A / A-A | E1 | yes | ERC_REVIEW | no | evidência factual suficiente para padrão simples |
| A0-SEP-005 | P-G / O-A / A-A | E1 | yes | ERC_REVIEW | no | mesma família canônica de separação operacional |
| A0-CHK-001 | P-G / O-A / A-A | E2 | yes | ERC_REVIEW | no | check coerente sem omissão explícita de feedback |
| A0-CHK-003 | P-G / O-A / A-G | E2 | yes | ERC_REVIEW | no | A-G por etapa de verificação esperada omitida |
| A0-VIS-004-ADJ | P-H / O-A / A-A | E2 | yes | ERC_REVIEW | no | ajuste metodológico já estabilizado |
| A0-AUTO-004-ADJ | P-A / O-A / A-G | E2 | yes | ERC_REVIEW | no | A-G por falha de monitoramento/check pós-ação |
| A0-CHK-002-ADJ | P-D / O-A / A-H | E2 | yes | ERC_REVIEW | no | gatilho deve permanecer declarado no cenário |
| A0-DAUMAS-E01-B | P-C / O-A / A-E | E3 | yes | ERC_REVIEW | yes | caso Daumas aplicado sob precedência Hendy/HFA |
| A0-DAUMAS-E02-A | P-A / O-C / A-F | E3 | yes | ERC_REVIEW | no | sem adaptação: awareness explícita dos mínimos |
| A0-DAUMAS-E02-B | P-D / O-A / A-H | E3 | yes | ERC_REVIEW | yes | origem Daumas; manter rastreio de interpretação |

## Matriz Exploratória (não gate de deploy)

| case_id | motivo principal |
|---|---|
| A0-VIS-002 | low cognitive evidence; alternate defensible classification; requires human review |
| A0-AUTO-002 | CODE_REVIEW; taxonomia slip/lapse/mode-error pendente; requires human review |
| A0-FUEL-001 | O-C/O-D adaptation; alternate defensible classification; requires human review |
| A0-PARAM-001 | [CALIBRAR]; gatilho paramétrico de cenário; requires human review |
| A0-SEP-001 | low cognitive evidence; alternate defensible classification |
| A0-SEP-003 | low cognitive evidence; alternate defensible classification |
| A0-SEP-004 | low cognitive evidence; requires human review |
| A0-CHK-004 | low cognitive evidence; alternate defensible classification |
| A0-CHK-005 | low cognitive evidence; requires human review |
| A0-VIS-001-ADJ | O-C/O-D adaptation; [CALIBRAR]; requires human review |
| A0-DAUMAS-E03 | O-C/O-D adaptation; A-A vs A-G sensitivity; requires human review |
| A0-DAUMAS-E01-A | O-C/O-D adaptation; alternate defensible classification; requires human review |

## Negativos Permanentes

- `A0-INSUF-001`:
  - rejeitar por ausência de ato/condição observável.
- `A0-INSUF-002`:
  - rejeitar julgamento moral sem fato operacional.
- `A0-INSUF-003`:
  - rejeitar contexto organizacional sem desvio operacional.
- `A0-AUTO-005`:
  - identificar primeiro desvio técnico e não forçar P/O/A humano.

Contrato esperado (negativos):
- não produzir P/O/A humano;
- retornar `insufficient_evidence`, `moral_judgment_without_observable_act`, `organizational_context_without_operational_deviation` ou `technical_first_deviation`, conforme caso;
- se o motor atual não suportar esses status, documentar como lacuna antes de JSON.

## Multi-Act Estruturais

Casos:
- `A0-MULTI-001`
- `A0-MULTI-002`
- `A0-MULTI-003`

Regra:
- esses casos não devem ter P/O/A único próprio;
- objetivo é testar se o sistema separa múltiplos pontos de fuga e evita colapso em análise única.

Se o motor atual não suportar saída multi-act:
- não materializar como gate automático;
- manter como especificação futura ou teste manual/exploratório.

## Riscos Metodológicos Remanescentes

- O-C estrito HFA/SERA diverge parcialmente de leituras possíveis em Hendy/Daumas.
- Taxonomia runtime para slip/lapse/mode-error ainda precisa confirmação final.
- ERC permanece sem contrato fechado nesta fase.
- Gatilhos de cenário exigem calibração com SOP/manual quando alegados como regra real.
- Casos abstratos tendem a menor evidência cognitiva que casos Daumas.
- Motor atual pode não suportar status negativos dedicados ou saída multi-act.
- P-G pode virar default excessivo sem gates anti-overfit.

## Critérios para Próxima Fase

- Criar JSON somente após este documento normativo.
- Não promover exploratórios para gate sem revisão humana.
- Negativos devem ter contrato separado e verificável.
- Multi-act não deve ser tratado como fixture positiva simples.
- ERC não deve bloquear P/O/A enquanto ERC estiver em review.

## Próxima Fase Recomendada

**SERA v0.1.4-A2 — Materializar fixtures candidatas em JSON separado**, segmentando em:
- gate automático;
- exploratório;
- negativos;
- multi-act estrutural.
