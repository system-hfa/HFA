# SERA vNext Daumas Calibration Reference Plan A4R200-A

Date: 2026-06-01
Phase: A4R200-A
Status: calibration reference plan only

Trilha definida:
- `DAUMAS_HUMAN_METHOD_REFERENCE`

## 1. Como Daumas sera usado

Usos permitidos:
- observar como um humano experiente estrutura analise no ponto de fuga;
- extrair padroes de formulacao de actor/perception/objective/action statements;
- calibrar fronteiras P/O/A onde eventos reais ficam ambiguos;
- identificar sinais de outcome trap e agent migration;
- apoiar criterios de selecao de eventos de referencia;
- apoiar desenho de sinteticos com guardrails claros.

## 2. Como Daumas NAO sera usado

Usos proibidos:
- reentry automatico de eventos;
- substituto de fonte factual primaria para evento real;
- baseline/fixture automatico;
- justificativa de selectedCode/releasedCode/finalConclusion;
- classificacao final ativa nesta fase.

## 3. Relacao com Hendy

Regra de precedencia:
- Hendy permanece fonte primaria da logica causal.
- Daumas e fonte aplicada de operacionalizacao/metodologia humana.
- Em conflito conceitual direto, Hendy prevalece.

Uso conjunto:
- Hendy define estrutura causal;
- Daumas informa aplicabilidade e linguagem operacional de campo.

## 4. Relacao com SERA vNext

Daumas nesta fase:
- referencia humana/metodologica para calibracao;
- nao altera baseline causal atual;
- nao muda engine/runtime;
- nao abre lock de produto.

## 5. Tipos de insight metodologico permitidos

- padroes de ancoragem em escape point;
- padroes de preservacao de ator direto;
- padroes de separacao fato vs conclusao externa;
- padroes de delimitacao de preconditions sem classificacao ativa;
- padroes para evitar consequence-as-cause.

## 6. Limites contra reentry automatico

Bloqueios explicitos:
- `NO_DAUMAS_AUTO_REENTRY`
- `NO_DAUMAS_AS_REAL_EVENT_SOURCE_SUBSTITUTION`
- `NO_DAUMAS_AUTO_READY`

Qualquer uso de Daumas para decisao operacional futura exige:
- gate humano explicito;
- rastreabilidade de fonte real quando houver evento real.

## 7. Proximos passos (sem classificar eventos)

1. mapear trechos Daumas uteis por tema (escape point, actor boundary, outcome trap);
2. registrar apenas criterio/insight, sem P/O/A final;
3. ligar insights aos gaps metodologicos ativos;
4. alimentar campanha de busca de eventos reais fortes;
5. manter separacao real-event vs synthetic intacta.
