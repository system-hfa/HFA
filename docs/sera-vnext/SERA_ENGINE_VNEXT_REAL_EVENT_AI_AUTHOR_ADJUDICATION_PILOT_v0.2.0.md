# SERA Engine vNext Real Event AI/Author Adjudication Pilot v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-63 — AI/Author SERA Adjudication Pilot

## Objetivo
Executar a primeira adjudicação AI/Author controlada sobre a amostra factual da A4+R-62, aplicando a cadeia SERA-PT/HFA com rastreabilidade explícita e preservando locks de não-downstream.

## Relação com A4+R-62
A4+R-62 entregou 5 extrações estruturadas sem classificação causal. A4+R-63 usa essas extrações para produzir propostas de adjudicação por eixo, mantendo `proposedCode` apenas em nível draft.

## Casos adjudicados
Adjudicação piloto executada em 4 casos:
- REAL-EVENT-EXTRACTION-001 (Thebaud)
- REAL-EVENT-EXTRACTION-002 (Peasmarsh)
- REAL-EVENT-EXTRACTION-003 (Vigo)
- REAL-EVENT-EXTRACTION-004 (5N-BQJ)

## Caso triage-only
- REAL-EVENT-EXTRACTION-005 (HL9661) tratado como triage-only por `SOURCE_PARTIAL`.

## Metodologia aplicada
Para cada caso adjudicado:
1. factual basis;
2. safe operation escape point candidate;
3. unsafe state;
4. unsafe act/condition;
5. direct actor;
6. reasoning P/O/A;
7. `proposedCode` ou `UNRESOLVED` por eixo;
8. rationale/evidence/uncertainty por eixo;
9. evidence category hints passivos;
10. locks downstream explícitos.

## Decisões propostas por eixo
| Case | P | O | A | Confidence |
|---|---|---|---|---|
| 001 Thebaud | P-G | O-A | UNRESOLVED | MEDIUM |
| 002 Peasmarsh | UNRESOLVED | O-A | UNRESOLVED | MEDIUM |
| 003 Vigo | UNRESOLVED | O-A | UNRESOLVED | MEDIUM |
| 004 5N-BQJ | UNRESOLVED | O-A | UNRESOLVED | LOW/MEDIUM |
| TRIAGE 005 HL9661 | UNRESOLVED | UNRESOLVED | UNRESOLVED | LOW |

## Eixos UNRESOLVED
Predomínio de `UNRESOLVED` em P/A nos casos 002, 003 e 004, e em todos os eixos do 005, por insuficiência de evidência específica de mecanismo e/ou ancoragem de fonte.

## Principais dúvidas para autor/adjudicador
- 001: confirmar fronteira preferida P-G vs P-H e manutenção de A=UNRESOLVED.
- 002: confirmar manutenção de P=UNRESOLVED e robustez de O-A sob ausência de rota briefada.
- 003: confirmar se ausência de alerta sonoro permanece como condição dominante e A permanece UNRESOLVED.
- 004: confirmar critério mínimo para sair de `unsafe-condition-dominant` sem forçar eixo ativo.
- 005: confirmar critérios mínimos de source anchor para sair de triage-only.

## Regras de quarentena
- Conclusões/prováveis causas/recomendações de relatórios-fonte não foram importadas como gabarito.
- Classificações antigas/externas não foram usadas como verdade metodológica.

## Confirmação de locks
- `proposedCode` é draft de adjudicação e **não** `releasedCode`.
- Nenhum `selectedCode=CLASSIFIED` foi criado.
- Nenhum output de release gate foi gerado.
- Nenhum downstream foi habilitado.
- Nenhum `finalConclusion`, HFACS, Risk/ERC ou recommendations foi produzido.

## Limitações
- Ausência de fontes primárias completas para parte da amostra.
- PF/PM e cadeia de monitoramento ainda incompletos em múltiplos casos.
- Um caso (`005`) permanece insuficiente para adjudicação causal detalhada.

## Próxima fase recomendada
A4+R-64 — AI/Author Adjudication Refinement + Evidence Enrichment Gate.

## A4+R-64 — Refinement executado
- refinement gate operacional criado:
  - `SERA_ENGINE_VNEXT_REAL_EVENT_ADJUDICATION_REFINEMENT_GATE_v0.2.0.md`
- maturity status adicionados por caso em todos os arquivos de adjudicação/triage.
- casos com evidência parcial foram explicitamente mantidos em trilha de enrichment.
- nenhum `proposedCode` foi promovido para `releasedCode`.
- nenhum downstream foi habilitado.
