# SERA Minimal Canonical Event Test - A4R166

## 1. Escopo
- Eventos analisados: COMAIR-5191, EXECUFLIGHT-1526, US-AIRWAYS-1549.
- Eventos em HOLD: COLGAN-3407, HELIOS-522.
- Status: DRAFT_ONLY / NO_DOWNSTREAM.

## 2. Regra metodologica aplicada
- ponto de fuga primeiro;
- unsafe act/unsafe condition observavel;
- ator direto;
- perguntas canonicas SERA/Hendy;
- POA so depois;
- sem perguntas inventadas;
- UNRESOLVED/HOLD quando necessario.

A4R166 lock:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`

## 3. Selecao dos eventos
| Evento | Fonte suficiente? | Ponto de fuga observavel? | Ator direto identificavel? | Entra no teste? | Status |
|---|---|---|---|---|---|
| COMAIR-5191 | sim | sim | sim | sim | POSITIVE_CASE |
| EXECUFLIGHT-1526 | sim (com cautela) | sim | sim | sim | POSITIVE_CASE_WITH_CAUTION |
| US-AIRWAYS-1549 | sim | sim | nao aplicavel para origem humana do ponto de fuga | negative control | NEGATIVE_CONTROL |
| COLGAN-3407 | sim (fora do pacote atual) | sim | sim | nao | HOLD |
| HELIOS-522 | sim (fora do pacote atual) | sim | sim | nao | HOLD |

## 4. Teste do ponto de fuga

### COMAIR-5191
- Ponto de fuga: alinhamento + inicio de decolagem em pista incorreta.
- Decisao: `ESCAPE_POINT_ACCEPTED`.

### EXECUFLIGHT-1526
- Ponto de fuga: `EXECUFLIGHT-1526-ESCAPE-001`.
- Estrutura: single escape point + multi-actor contributions.
- Decisao: `ESCAPE_POINT_ACCEPTED`.

### US-AIRWAYS-1549
- Ponto de fuga: onset tecnico/ambiental de perda substancial de empuxo bilateral.
- Decisao: `NEGATIVE_CONTROL_ACCEPTED`.

## 5. POA - matriz canonica auditavel

### COMAIR-5191
| Evento | Ponto de fuga | Unsafe act/condition | Ator direto | Objetivo | Percepcao | Acao | Codigo P | Codigo O | Codigo A | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| COMAIR-5191 | Alinhamento e decolagem na RWY 26 em vez de RWY 22 | Unsafe act | Tripulacao (crew-level) | decolar conforme autorizado/esperado (nominal) | P_ROOT->...->P-G | O_ROOT->...->O-A / A_ROOT->...->A-G | P-G | O-A | A-G | AUTHOR_APPROVED_DRAFT |

### EXECUFLIGHT-1526 (author-approved draft)
| eventId | escapePointId | actorContributionId | actor | role | P | O | A | status |
|---|---|---|---|---|---|---|---|---|
| EXECUFLIGHT-1526 | EXECUFLIGHT-1526-ESCAPE-001 | EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF | First Officer | PF | P-D | O-D | A-H | AUTHOR_APPROVED_DRAFT |
| EXECUFLIGHT-1526 | EXECUFLIGHT-1526-ESCAPE-001 | EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM | Captain | PM | P-A | O-D | A-G | AUTHOR_APPROVED_DRAFT |

Rationale autoral registrado:
- FO/PF: objetivo nao conservador no momento critico com continuidade fora de perfil defensavel.
- Captain/PM: percepcao sem falha dominante; falha dominante em feedback/backup/intervencao.

## 6. Negative control - US-AIRWAYS-1549
- status: `NEGATIVE_CONTROL_ACCEPTED`.
- decisao: `NO_HUMAN_P_O_A_AT_ESCAPE_POINT`.

## 7. Eventos fora do teste
- COLGAN-3407: HOLD.
- HELIOS-522: HOLD.

## 8. Resultado final do teste
| Evento | Tipo | Ponto de fuga | POA aplicavel? | Resultado |
|---|---|---|---|---|
| COMAIR-5191 | Positive case | decolagem em pista incorreta | sim, crew-level | AUTHOR_APPROVED_DRAFT (P-G / O-A / A-G) |
| EXECUFLIGHT-1526 | Positive case with caution | `EXECUFLIGHT-1526-ESCAPE-001` | sim, por actorContributionId | AUTHOR_APPROVED_DRAFT (FO/PF: P-D O-D A-H; Captain/PM: P-A O-D A-G) |
| US-AIRWAYS-1549 | Negative control | bird strike + perda de empuxo bilateral | nao | NEGATIVE_CONTROL_ACCEPTED |
| COLGAN-3407 | HOLD | fora do pacote | nao | HOLD |
| HELIOS-522 | HOLD | fora do pacote | nao | HOLD |

## 9. Proxima decisao
- A4R166 pode ser considerado author-approved draft.
- Nao promover para fixture/baseline/release sem fase especifica.
