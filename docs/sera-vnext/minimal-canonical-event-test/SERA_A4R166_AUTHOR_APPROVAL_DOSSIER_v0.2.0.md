# SERA A4R166 Author Approval Dossier v0.2.0

Status: DRAFT_ONLY / AUTHOR_REVIEW_DOSSIER / NO_DOWNSTREAM

Scope:
- Included: COMAIR-5191, EXECUFLIGHT-1526, US-AIRWAYS-1549.
- Excluded: COLGAN-3407, HELIOS-522.
- No code/runtime/fixture/baseline/migration/release/downstream in this dossier.

Canonical anchors:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_A4R165_METHOD_VIOLATION_CONTAINMENT_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_AUTHOR_APPROVED_POA_DRAFT_A4R166_v0.2.0.md`

Author decision labels:
- `APPROVED_AS_REFERENCE`
- `APPROVED_AS_DRAFT_ONLY`
- `REWORK_REQUIRED`
- `HOLD_SOURCE_REQUIRED`
- `REJECT_AS_MODEL_EVENT`

## 1. COMAIR-5191

### 1.1 Evento inteiro (factual)
- Fonte: `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/COMAIR-5191-NTSB-AAR0705.txt`.
- Sequencia minima: autorizado/esperado para RWY 22; alinhamento e inicio de decolagem em RWY 26; impacto e desfecho depois.
- Antes do ponto de fuga: verificacoes de taxi/alinhamento ainda possiveis.
- No ponto de fuga: alinhamento e inicio de decolagem na pista errada.
- Depois (contexto): corrida, overrun, impacto, danos.
- Nao usado para classificar: conclusao final/probable cause/recommendations.

### 1.2 Teste do ponto de fuga
- Ponto de fuga: alinhamento + inicio de decolagem na RWY 26 como se fosse RWY 22.
- Unsafe act/condition: unsafe act.
- Variavel fora da faixa segura: identidade/alinhamento de pista.
- Ator direto: tripulacao.
- Evidencia: fatias oficiais da sequencia RWY 22 vs RWY 26.
- Decisao: `ESCAPE_POINT_ACCEPTED`.

### 1.3 Nos canonicos — P (Percepcao)
| Node | Pergunta canonica | Resposta | Evidencia | Consequencia |
|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relacao ao objetivo que pretendia alcancar? | START | Sequencia factual da decolagem | seguir |
| P_ASSESSMENT | Avaliacao correta ou adequada da situacao? | NAO | RWY 22 esperada vs RWY 26 usada | seguir |
| P_CAPABILITY | Possuia a capacidade necessaria para sentir e perceber a situacao? | SIM | sem evidencia de incapacidade sensorial primaria | seguir |
| P_TIME_PRESSURE | A pressao do tempo percebida era excessiva? | NAO | sem ancoragem dominante de pressao temporal | seguir |
| P_INFORMATION_AMBIGUOUS | A informacao era ilusoria ou ambigua? | NAO | cadeia de identificacao disponivel | seguir |
| P_INFORMATION_AVAILABLE | A informacao estava disponivel e correta? | SIM | mismatch observavel antes do desfecho | `P-G` |

### 1.4 Nos canonicos — O (Objetivo)
| Node | Pergunta canonica | Resposta | Evidencia | Consequencia |
|---|---|---|---|---|
| O_ROOT | O que o operador pretendia alcancar com a acao? | START | Decolagem conforme autorizado/esperado | seguir |
| O_CONSERVATISM | O objetivo era conservador (manter margem de seguranca)? | SIM | objetivo nominal de decolagem; sem evidencia de objetivo nao conservador percebido | seguir |
| O_CONSTRAINTS | Havia pressao operacional ou restricao que tornava o objetivo problematico? | NAO | sem evidencia de pressao operacional dominante, violacao deliberada ou objetivo conscientemente nao conservador | `O-A` |

### 1.5 Nos canonicos — A (Acao)
| Node | Pergunta canonica | Resposta | Evidencia | Consequencia |
|---|---|---|---|---|
| A_ROOT | Que acao o operador executou? | START | Alinhamento e inicio de decolagem na RWY 26 como se fosse RWY 22 | seguir |
| A_FEEDBACK | O feedback recebido foi suficiente para corrigir? | NAO | verificacao/cross-check de pista/heading/checklist insuficiente antes da decolagem | seguir |
| A_ALTERNATIVE | Havia acao alternativa viavel? | SIM | cross-check visual e instrumental de alinhamento disponivel antes da decolagem | `A-G` |

### 1.6 Rationale autoral COMAIR-5191
- P-G: a informacao de pista/alinhamento estava disponivel e correta; a tripulacao operou como se estivesse na pista correta, mas estava na pista errada.
- O-A: o objetivo da tripulacao era nominal — decolar conforme autorizado/esperado. Nao ha evidencia de objetivo nao conservador percebido, violacao deliberada ou pressao operacional dominante.
- A-G: a falha de acao dominante e feedback/verificacao/cross-check insuficiente de pista/heading/checklist antes da decolagem. Nao usar A-H, pois nao ha pressao temporal dominante. Nao usar O-D, pois o objetivo nao era conscientemente nao conservador.

### 1.7 Resultado
- P: `P-G`
- O: `O-A`
- A: `A-G`
- status: `AUTHOR_APPROVED_DRAFT`
- confidence: `MEDIUM/HIGH`
- limites: caso tratado como crew-level actor neste pacote; eventual actor split Captain/FO pode ser analisado em fase futura, mas nao e necessario para fechar este draft.
- decisao proposta: `AUTHOR_APPROVED_DRAFT`

## 2. EXECUFLIGHT-1526

### 2.1 Evento inteiro (factual)
- Fonte: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt`.
- Sequencia minima: localizer para RWY 25; FAF alto; descida agressiva; continuidade na MDA; desfecho depois.
- Antes do ponto de fuga: perfil poderia ser interrompido com missed approach.
- No ponto de fuga: continuidade de perfil nao defensavel apos FAF alto com descida agressiva.
- Depois (contexto): continuidade abaixo/MDA, stick shaker, GPWS, impacto.
- Nao usado para classificar: desfecho final e probable cause como gabarito.

### 2.2 Teste do ponto de fuga (regra corrigida)
- Escape point unico: `EXECUFLIGHT-1526-ESCAPE-001`.
- Escape point statement: apos cruzar o FAF alto, a aeronave entra/continua em descida agressiva e a continuidade da aproximacao deixa de estar defensavelmente segura.
- Unsafe act/condition: continuidade/controle de aproximacao nao defensavel.
- Variavel fora da faixa segura: perfil vertical/razao de descida/estabilizacao.
- Ator(es) no mesmo ponto de fuga: FO/PF e Captain/PM.
- Evidencia critica:
  - PF/PM assignment: 367-369, 584-585.
  - FO control actions: 799-807.
  - Captain concern: 809-813.
  - Continuation at/below MDA: 815-818.
  - No takeover and no timely missed approach: 412-413, 419-420.
- Decisao: `ESCAPE_POINT_ACCEPTED`.

### 2.3 Actor contributions (mesmo escapePointId)
| eventId | escapePointId | actorContributionId | actor | role | controlledVariable | contribution |
|---|---|---|---|---|---|---|
| EXECUFLIGHT-1526 | EXECUFLIGHT-1526-ESCAPE-001 | EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF | First Officer | PF | vertical profile / descent rate / speed / continuation | controla e continua perfil nao defensavel |
| EXECUFLIGHT-1526 | EXECUFLIGHT-1526-ESCAPE-001 | EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM | Captain | PM | monitoring / intervention / takeover / missed approach initiation | verbaliza preocupacao sem intervencao positiva no intervalo critico |

### 2.4 Resultado autoral aprovado (draft)
| actorContributionId | P | O | A | Status | Confidence |
|---|---|---|---|---|---|
| EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF | P-D | O-D | A-H | AUTHOR_APPROVED_DRAFT | HIGH |
| EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM | P-A | O-D | A-G | AUTHOR_APPROVED_DRAFT | HIGH |

Rationale autoral FO/PF:
- No caso do copiloto/FO/PF, o objetivo e O-D porque, no momento em que ele tenta cumprir o objetivo, esse objetivo ja nao e conservador.
- A aeronave ja estava fora do perfil defensavel e, mesmo assim, ele continuou tentando recuperar/continuar a aproximacao.
- O autor concorda com P-D.
- O autor concorda com A-H.

Rationale autoral Captain/PM:
- No caso do comandante/Captain/PM, nao e falha de percepcao; P-A esta correto.
- O-D esta correto para o objetivo.
- A falha dominante pode ser insuficiencia do feedback, backup e intervencao.
- A-G esta correto como acao dominante.

### 2.5 Resultado
- status: `AUTHOR_APPROVED_DRAFT`
- decisao operacional: `EXECUFLIGHT_READY_FOR_CANONICAL_POA_WITH_SINGLE_ESCAPE_POINT_MULTI_ACTOR_CONTRIBUTIONS`
- limites: ainda sem promocao para fixture/baseline/release.

## 3. US-AIRWAYS-1549

### 3.1 Evento inteiro (factual)
- Fonte: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt`.
- Sequencia minima: bird strike na subida inicial; perda quase total de empuxo bilateral; resposta de emergencia depois.
- Antes do ponto de fuga: subida normal com empuxo.
- No ponto de fuga: onset tecnico/ambiental de perda de potencia bilateral.
- Depois (contexto): checklist, decisoes taticas, amerissagem.
- Nao usado para classificar: desfecho final/probable cause como gabarito.

### 3.2 Teste do ponto de fuga
- Ponto de fuga: bird strike/perda substancial de empuxo bilateral.
- Natureza: tecnico/ambiental.
- Ator direto humano causador no ponto de fuga: nao aplicavel.
- Decisao: `NEGATIVE_CONTROL_ACCEPTED` e `NO_HUMAN_P_O_A_AT_ESCAPE_POINT`.

### 3.3 Resultado
- P/O/A humano no ponto de fuga: `NOT_APPLICABLE`.
- status: `NEGATIVE_CONTROL_ACCEPTED`.
- decisao proposta: `APPROVED_AS_DRAFT_ONLY`.

## 4. Author Review Summary

| Event | Escape point status | POA status | Proposed author decision |
|---|---|---|---|
| COMAIR-5191 | ESCAPE_POINT_ACCEPTED | P-G / O-A / A-G author-approved draft (crew-level) | AUTHOR_APPROVED_DRAFT |
| EXECUFLIGHT-1526 | ESCAPE_POINT_ACCEPTED (single escape point + two actor contributions) | FO/PF: P-D/O-D/A-H; Captain/PM: P-A/O-D/A-G | AUTHOR_APPROVED_DRAFT |
| US-AIRWAYS-1549 | NEGATIVE_CONTROL_ACCEPTED | human P/O/A not applicable at escape point | APPROVED_AS_DRAFT_ONLY |

## 5. Explicit locks
- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`
- `NO_FINAL_CONCLUSION`
- `NO_HFACS`
- `NO_RISK_ERC`
- `NO_ARMS_ERC`
- `NO_RECOMMENDATIONS`
- `NO_COMMIT`
- `NO_PUSH`
