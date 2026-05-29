# SERA A4R182 Author Decision Intake Plan v0.2.0

Status: INTAKE_PLAN_PREPARED
Phase: A4+R-182 (planejamento; execução em fase posterior)
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo

A4R182 é a fase em que as decisões do autor sobre os dossiês preparados em A4R181 são registradas de forma estruturada e rastreável. Este plano define COMO a decisão será capturada, sem ainda executá-la. A4R182 registra decisões; não fecha P/O/A, não cria selectedCode com status fechado, não gera fixture, baseline, código liberado nem downstream.

## 2. O que A4R182 registra

Para cada dossiê BATCH_A respondido pelo autor (APROVO / NÃO APROVO / PRECISO REVISAR), registra-se:
- adjudicationId (ex.: A4R181-ADJ-0001)
- a resposta do autor
- justificativa curta do autor (texto livre, opcional)
- ajustes solicitados (se PRECISO REVISAR ou NÃO APROVO)
- timestamp da decisão
- decisionStatus resultante (ver seção 4)

O registro é um draft autoral com lock NOT_FINAL_P_O_A. A resposta não fecha eixo; apenas autoriza o caso a avançar como adjudication candidate na forma proposta (ou solicita revisão).

## 3. Mapa de intake por batch

| Batch | Itens | Forma de intake em A4R182 |
|---|---|---|
| BATCH_A | 0001, 0002, 0003, 0006, 0017 | Resposta direta por dossiê (APROVO / NÃO APROVO / PRECISO REVISAR) |
| BATCH_B | 0004, 0005, 0010, 0012, 0013, 0018 | Decisão de framing autoral (single vs multi-actor; zona vs momento) antes de qualquer dossiê |
| BATCH_C | 0007+0008, 0009+0019, 0011+0016 | Decisão por grupo após consolidação obrigatória |
| BATCH_D | 0014, 0015, 0020, 0021, 0022, 0023, 0024 | Sem intake de decisão até a ação prévia (repair/boundary/enrichment/cross-ref) |

## 4. Estados de decisão resultantes

- AUTHOR_APPROVED_DRAFT — autor aprovou o escopo de ponto de fuga e o modelo de ator propostos; caso avança como adjudication candidate (ainda NOT_FINAL_P_O_A).
- AUTHOR_REVISION_REQUESTED — autor pediu revisão; volta ao preparo com os ajustes anotados.
- AUTHOR_REJECTED — autor não aprovou; caso permanece READY sem decisão de avanço, com motivo registrado.
- AUTHOR_PENDING — ainda não respondido.

Nenhum desses estados é fechamento de classificação. O fechamento de P/O/A, quando ocorrer, será objeto de fase posterior com revisão dual-autor.

## 5. Estrutura de registro proposta

Um arquivo de registro (CSV ou MD) por fase A4R182, com colunas:
`adjudicationId, eventKey, batch, authorAnswer, decisionStatus, authorRationaleShort, requestedAdjustments, decisionTimestamp, notFinalClassification`

`notFinalClassification` permanece true em todas as linhas.

## 6. Sequência recomendada de intake

1. BATCH_A: registrar as 5 respostas diretas (0001, 0002, 0003, 0006, 0017).
2. BATCH_B: registrar as decisões de framing (6 casos) — single vs multi-actor e zona vs momento discreto.
3. BATCH_C: após consolidação, registrar 3 decisões por grupo.
4. BATCH_D: registrar apenas o estado de hold/ação prévia; sem decisão de avanço até a ação concluir.

## 7. Locks de A4R182

A4R182 NÃO:
- fecha P, O ou A;
- cria selectedCode com status fechado;
- cria código liberado, fixture ou baseline;
- altera runner, motor SERA, runtime ou arquivos .ts;
- cria recomendações, HFACS, Risk/ERC, ARMS/ERC, finalConclusion ou downstream;
- chama LLM/API externa;
- importa conclusão de relatório externo como código SERA;
- transforma a resposta do autor em classificação fechada.

## 8. Relação com A4R181

A4R181 preparou os dossiês e as perguntas; A4R182 captura as respostas. A separação garante que a preparação (objetiva, factual-first) e a decisão (autoral) fiquem em fases distintas e auditáveis.
