# SERA vNext Reference Corpus Acceleration Plan A4R200-A v0.2.0

Date: 2026-06-01
Phase: A4R200-A
Status:
- PLAN_ONLY
- NO_EXTERNAL_SEARCH_EXECUTED
- NO_DOWNLOAD_EXECUTED
- NO_SOURCE_RECOVERY_EXECUTION
- NO_POA_CLASSIFICATION
- NO_READY_PROMOTION
- NO_FIXTURE
- NO_BASELINE
- NO_PRODUCT

Fonte operacional de desenho: Daumas (human methodology reference only; sem reentry automatico).

## 1. Objetivo

Acelerar a formacao de um corpus calibrador forte para SERA vNext, priorizando eventos com evidencia rastreavel e utilidade metodologica.

Objetivo central:
- montar corpus util para calibracao de escape point, actor attribution e fronteiras P/O/A;
- parar de insistir em eventos fracos que nao fecham fonte/cronologia;
- preparar campanha externa futura (Perplexity) sem executar busca nesta fase;
- usar Daumas como trilha humana/metodologica separada;
- preencher lacunas remanescentes com sinteticos somente quando necessario.

## 2. Mudanca de estrategia

Antes:
- estrategia de recuperar ao maximo eventos historicos, inclusive quando fracos.

Agora:
- triagem rapida de utilidade metodologica;
- descarte/HOLD/controle negativo para casos fracos;
- substituicao por eventos reais mais fortes em fase externa propria;
- uso de sinteticos apenas para lacunas documentadas nao cobertas por reais + Daumas.

Principio de eficiencia metodologica:
- se nao ajuda a calibrar de forma limpa, nao insistir.

## 3. Licoes do Batch 1 (A4R197-E)

Resumo de aprendizagem consolidada:
- nem todo evento real historico e candidato util para calibracao;
- `SOURCE_RECOVERY_PARTIAL` nao equivale a aptidao para adjudicacao;
- controles negativos/boundary controls sao ativos metodologicos, nao "fracassos";
- eventos superseded devem ficar HOLD e nunca ativar reentry automatico;
- forcar fechamento em fonte fraca aumenta risco de outcome trap e agent migration.

Direcao resultante:
- manter somente lanes com alta utilidade metodologica;
- substituir/descartar rapidamente eventos de baixa fechabilidade;
- preservar `SOURCE_CLOSURE_GATE` como criterio de qualidade de fonte.

## 4. Criterios de evento real forte

Minimo obrigatorio para candidato forte:
- fonte oficial rastreavel;
- locator/document reference verificavel;
- cronologia suficiente para marcar escape point;
- ator direto minimamente atribuivel no ponto de fuga;
- evidencia antes/no escape point (nao em consequencia posterior);
- separacao factual evidence vs external conclusions;
- risco controlado de outcome bias e agent migration;
- utilidade explicita para gap metodologico.

Estados de decisao permitidos:
- `STRONG_REFERENCE_CANDIDATE`
- `SOURCE_RECOVERY_CANDIDATE`
- `BOUNDARY_CASE_ONLY`
- `NEGATIVE_CONTROL`
- `HOLD`
- `DISCARD_OR_REPLACE`
- `SYNTHETIC_FILL_RECOMMENDED`
- `DAUMAS_CALIBRATION_REFERENCE`

## 5. Papel da trilha Daumas

Trilha dedicada:
- `DAUMAS_HUMAN_METHOD_REFERENCE`

Uso permitido:
- calibrar raciocinio humano de fronteira P/O/A;
- extrair padroes de decisao de escape point e actor attribution;
- comparar aplicacao humana com Hendy e SERA vNext;
- apoiar desenho de criterios e synthetic guardrails.

Uso proibido:
- reentry automatico;
- substituto de fonte factual real;
- baseline/fixture automatico;
- justificativa para selected/released/final outputs.

## 6. Papel da campanha Perplexity

Nesta fase A4R200-A:
- campanha foi planejada;
- busca externa NAO foi executada;
- download externo NAO foi executado.

Escopo da campanha futura:
- buscar 20-40 eventos reais com fonte oficial e cronologia robusta;
- priorizar familias de caso com alto valor de calibracao para gaps atuais;
- gerar top 10 priorizado para source recovery posterior.

## 7. Papel dos sinteticos

Politica:
- sintetico entra apenas quando lacuna e importante e nao coberta por reais + Daumas;
- sintetico nao substitui evento real quando ha evento forte disponivel;
- sintetico permanece separado de real (sem blending);
- sem materializacao fixture/baseline nesta fase.

Base autoritativa de guardrails:
- A4R193-P synthetic design pack;
- A4R198-A combined blueprint (GAP-004 primeiro, GAP-002 depois).

## 8. Roadmap pragmatico do corpus calibrador

Etapa A - consolidar trilha Daumas como referencia humana/metodologica.
Etapa B - executar campanha externa Perplexity para 20-40 candidatos reais.
Etapa C - selecionar top 10 com criterios fortes de fonte/escape point.
Etapa D - separar e manter negative/boundary controls.
Etapa E - mapear lacunas restantes apos top 10.
Etapa F - criar sinteticos apenas para lacunas nao cobertas.
Etapa G - discutir candidate-only adjudication somente apos gates.
Etapa H - discutir fixture/baseline somente em fase posterior autorizada.

## 9. Locks preservados

Permanecem bloqueados:
- classificacao P/O/A final;
- READY promotion;
- selectedCode/releasedCode/finalConclusion/CLASSIFIED;
- fixture/baseline/produto/UI/API;
- HFACS/Risk/ERC/ARMS/ERC/recommendations;
- source recovery execution nesta fase;
- alteracao de source-corpus.

## 10. Non-initiation statement

- web search NAO executada nesta fase.
- Perplexity NAO executado nesta fase.
- source recovery real nova NAO iniciada.
- nenhum evento promovido para READY.
- nenhum P/O/A final criado.
