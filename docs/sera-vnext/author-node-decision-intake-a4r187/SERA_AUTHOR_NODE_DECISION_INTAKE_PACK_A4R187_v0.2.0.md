# SERA Author Node Decision Intake Pack A4R187 v0.2.0

## Objetivo da fase
Organizar intake de decisao autoral node-by-node para os 35 registros de travessia da A4R186.

## Fonte canonica da arvore
- docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- REAL_TREE_GATE=PASS_WITH_LIMITATIONS (A4R185)

## Relacao com fases anteriores
- A4R184-Q: bloqueio de uso de prompts nao canonicos para decisao de eixo.
- A4R185: lock da arvore real com inventario e regras de uso.
- A4R186: travessia preliminar por node para 5 eventos do BATCH_A.

## Eventos cobertos
- Asiana 214 SFO
- Comair 5191 LEX
- American 1420 LIT
- UPS 1354 BHM
- United 173 PDX

## Contagem total de nodes
- totalNodes=35

## Decisoes autorais permitidas
- ACCEPT_NODE_ANSWER
- REJECT_NODE_ANSWER
- NEEDS_MORE_EVIDENCE
- BRANCH_BLOCKED
- AXIS_TRAVERSAL_BLOCKED

## Locks metodologicos
- notFinalClassification=true
- poaClosureAllowed=false
- selectedCodeAllowed=false
- fixturePromotionAllowed=false
- baselinePromotionAllowed=false
- downstreamAllowed=false

## Instrucoes para o autor
1. Revisar cada node com base no nodeId e na pergunta canonica.
2. Escolher uma unica decisao permitida por node.
3. Registrar rationale autoral conciso ancorado em evidencia.
4. Marcar bloqueio quando a branch nao puder ser sustentada.

## Criterios de parada
- Todas as 35 linhas com authorDecision preenchido.
- Todas as 35 linhas com authorDecisionRationale preenchido.
- Nenhuma linha sem valor permitido de decisao.

## O que A4R187 nao faz
- nao fecha eixo;
- nao produz codigo selecionado;
- nao libera classificacao operacional;
- nao promove para fixture/baseline;
- nao abre fluxo posterior.
