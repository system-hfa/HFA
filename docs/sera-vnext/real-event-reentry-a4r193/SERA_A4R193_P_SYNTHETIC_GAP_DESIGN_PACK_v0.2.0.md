# SERA A4R193-P Synthetic Gap Design Pack v0.2.0

Status:
- DESIGN_ONLY
- CANDIDATE_ONLY
- PRODUCT_BLOCKED
- NO_REENTRY_EXECUTION

## 1. Objetivo da fase

Definir um pacote de design sintetico para cobrir lacunas metodologicas observadas em A4R193 sem criar eventos sinteticos concretos.

## 2. Pre-condicao de auditoria independente

A auditoria A4R193-R registrou `PASS_WITH_WARNINGS` e autorizou apenas `SYNTHETIC_DESIGN_PACK_ALLOWED_WITH_WARNINGS`.

Escopo autorizado nesta fase:
- somente design documental;
- nenhuma criacao de synthetic case instance;
- nenhuma fixture;
- nenhuma baseline;
- nenhum reentry novo;
- nenhuma abertura de produto/UI/API.

## 3. Confirmacoes de lock de fase

- `DESIGN_ONLY_COMPLETE`
- `NO_SYNTHETIC_CASE_CREATED`
- `NO_FIXTURE_CREATED`
- `NO_BASELINE_CHANGE`
- `NO_REENTRY_CREATED`
- `PRODUCT_BLOCKED`
- `RR-001: OPEN`
- `RR-003: PARTIALLY_MITIGATED`

## 4. Lacunas reais e base em eventos

1. PF/PM separation
- Base real: Thebaud, Vigo, Colgan 3407.
- Risco: mistura de fronteira entre atores no mesmo momento operacional.

2. Agent migration risk
- Base real: Asiana 214, Comair 5191, United 173, Colgan 3407.
- Risco: troca implicita de agente entre escape anchor e eixo P/O/A.

3. SequenceRef por ator
- Base real: Thebaud, Peasmarsh, Vigo.
- Risco: ponto inicial de degradacao sem rastreio por ator.

4. Consequence-as-cause
- Base real: American 965, Delta 191, USAir 427, 5N-BQJ.
- Risco: usar impacto/alerta/resultado como causa.

5. Technical or environment dominant negative controls
- Base real: Delta 191, USAir 427, 5N-BQJ.
- Risco: forcar rotulo humano onde onset e tecnico/ambiental.

6. Warning callout go-around mechanism
- Base real: Peasmarsh, Vigo.
- Risco: ancoragem tardia em warning/callout sem mecanismo por ator.

7. Crew collective versus individual actor
- Base real: Colgan 3407, Asiana 214, UPS 1354, American 1420.
- Risco: consolidar indevidamente dois atos distintos em um unico ator coletivo.

8. Progressive-zone anchor precision
- Base real: American 965, American 1420, UPS 1354, Comair 5191, United 173.
- Risco: zona progressiva ampla sem primeiro instante controlavel claramente marcado.

9. Automation or FMS ambiguity
- Base real: American 965.
- Risco: misturar ambiguidade de automacao com inferencia de intencao humana.

10. Boundary decision for Colgan-style dual-actor events
- Base real: Colgan 3407.
- Risco: decisao de fronteira PF/PM pendente impedir gate consistente.

## 5. Tipos sinteticos candidatos conforme A4R147

- `TYPE-01_DISCRETE_HF_POSITIVE`
- `TYPE-02_PROGRESSIVE_HF_POSITIVE`
- `TYPE-03_TECHNICAL_NEGATIVE_CONTROL`
- `TYPE-04_ENVIRONMENTAL_NEGATIVE_CONTROL`
- `TYPE-05_MIXED_TECH_HUMAN_BOUNDARY`
- `TYPE-06_SOURCE_INSUFFICIENT`
- `TYPE-07_WARNING_TRAP`
- `TYPE-08_OUTCOME_TRAP`
- `TYPE-09_VIOLATION_LANGUAGE_TRAP`
- `TYPE-10_ORGANIZATIONAL_BOUNDARY`

## 6. Restricoes de uso

- Proibido usar sintetico como referencia real.
- Proibido criar synthetic case instance nesta fase.
- Proibido criar fixture ou baseline.
- Proibido usar para liberar selectedCode/releasedCode/finalConclusion/downstream.
- Proibido emitir CLASSIFIED/HFACS/Risk/ERC/ARMS/ERC/recommendations.
- Proibido executar reentry a partir deste pack.

## 7. Criterios para autorizacao humana futura

- rastreabilidade gap -> evento real -> risco metodologico;
- objetivo de teste com limite claro e criterio de bloqueio;
- definicao explicita de anti-contaminacao;
- prova de que o design nao altera estado de evento real;
- aprovacao humana explicita antes de qualquer materializacao.

## 8. Decisao de fase

A4R193-P conclui somente design documental do synthetic gap pack.

Resultado formal:
- `DESIGN_ONLY_COMPLETE`
- `NO_SYNTHETIC_CASE_CREATED`
