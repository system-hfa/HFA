# SERA Engine vNext Real Event Uncertainty Reduction Plan A4R70 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-70 — Controlled Uncertainty Reduction Pack  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Consolidar um plano de redução de incerteza factual/metodológica para os 5 casos reais, preservando locks causais e evitando qualquer promoção automática de draft para release.

## Prioridade por caso
- P1: `001` A-axis decomposition.
- P1: `004` technical timeline.
- P2: `002` warning/go-around chain.
- P2: `003` PF/PM/mission crew separation.
- P3: `005` source primary acquisition.

## O que pode ser feito localmente no repo
- Consolidar rastreabilidade de lacunas por eixo usando adjudications/readjudication e narrativas guardadas.
- Padronizar checklist documental de evidência faltante por caso (sem alterar proposta de código).
- Reaplicar matriz de incerteza como baseline documental de decisão AI/Author sem gerar `finalConclusion`.
- Preparar pacote de perguntas autorais pontuais para fronteiras P/O/A ainda ambíguas.

## O que exige fonte externa
- `001`: evidência adicional de callouts/inputs PF/PM com granularidade temporal.
- `002`: documentação mais detalhada de cadeia warning EGPWS, go-around route/procedure e trajetória de arremetida.
- `003`: evidência mais granular de papéis PF/PM/mission crew e cadeia de monitoramento vertical.
- `004`: timeline técnica detalhada de checklist/resets/decision points para separar inevitabilidade vs escolha de ditching.
- `005`: relatório oficial primário completo com locator verificável e cronologia solo-ar.

## O que exige decisão autoral
- `001`: eventual reavaliação de fronteira fina P-G/P-H somente se nova evidência comunicacional surgir.
- `002`: confirmação de robustez de `O-A` enquanto P/A seguem unresolved.
- `003`: confirmação de manutenção de P/A unresolved até decomposição multi-ator suficiente.
- `004`: validação de permanência de P/A unresolved após eventual enrichment mecanístico.
- `005`: critério de suficiência para saída de `TRIAGE_ONLY` quando houver fonte primária.

## O que deve permanecer unresolved nesta fase
- `001`: eixo A.
- `002`: eixos P e A.
- `003`: eixos P e A.
- `004`: eixos P e A.
- `005`: eixos P/O/A.

## Decisão de próxima trilha (A4+R-71)
Opção principal recomendada: **Opção D — Evidence Coverage Metrics on Real Events**.

Justificativa:
- objetivo da trilha atual é metodológico e de controle de incerteza;
- permite usar os 5 casos atuais para calibrar cobertura factual/evidence categories sem pressionar fechamento de `UNRESOLVED`;
- reduz risco de overclassification antes de novo enrichment externo;
- mantém consistência com locks (`NO_RELEASED_CODE`, `NO_DOWNSTREAM`) e com o estado de freeze ainda não autorizado.

Opção contingente subsequente:
- após o ciclo D, executar sprint focal B para 001/004 se lacunas mecanísticas permanecerem críticas.

## Confirmações de lock da fase
- nenhuma redução automática de `UNRESOLVED`.
- nenhum `proposedCode` promovido para `releasedCode`.
- nenhum `selectedCode=CLASSIFIED`.
- nenhum `finalConclusion`, HFACS, Risk/ERC ou recommendations.
- nenhum downstream/fixture/baseline.
