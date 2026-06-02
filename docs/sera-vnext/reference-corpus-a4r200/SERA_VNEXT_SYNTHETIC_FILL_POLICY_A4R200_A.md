# SERA vNext Synthetic Fill Policy A4R200-A

Date: 2026-06-01
Phase: A4R200-A
Status: policy only (no materialization)

## 1. Quando usar sintetico

Sintetico e recomendado quando TODOS os pontos abaixo forem verdadeiros:
1. lacuna metodologica e relevante para calibracao;
2. eventos reais disponiveis sao fracos/incompletos/ambiguos;
3. trilha Daumas nao cobre suficientemente a lacuna;
4. a armadilha metodologica precisa ser isolada de ruido real;
5. objetivo e testar metodo/motor, nao representar caso real.

## 2. Quando NAO usar sintetico

Nao usar sintetico quando:
- existe evento real forte disponivel para a mesma lacuna;
- lacuna ainda esta mal definida;
- guardrails de anti-contaminacao nao estao claros;
- existe risco de blending synthetic-real;
- a fase tenta pular direto para fixture/baseline.

## 3. Conexao com gaps

A ordem metodologica recomendada permanece:
- `GAP-004` (consequence-as-cause) primeiro;
- `GAP-002` (agent migration) depois.

Base de referencia:
- `SERA_A4R193_P_SYNTHETIC_GAP_DESIGN_PACK_v0.2.0.md`
- `SERA_VNEXT_COMBINED_SYNTHETIC_BLUEPRINT_A4R198_A_v0.2.0.md`

## 4. Como evitar synthetic-real blending

Controles obrigatorios:
- rotulagem explicita de synthetic lane;
- proibicao de tratar synthetic como evidencia real;
- proibicao de copiar conclusao de evento real para expected synthetic;
- separacao de artefatos por pasta/fase;
- log de non-promotion em toda iteracao.

## 5. Como evitar fixture/baseline promotion

Locks obrigatorios:
- `NO_SYNTHETIC_CASE_CREATED` nesta fase;
- `NO_FIXTURE`;
- `NO_BASELINE`;
- `NO_PRODUCT`;
- `NO_POA_CLASSIFICATION`.

Qualquer excecao exige:
- autorizacao humana explicita;
- gate metodologico adicional;
- auditoria separada.

## 6. Estado A4R200-A

- politica definida: SIM
- sintetico materializado: NAO
- JSON de caso criado: NAO
- fixture/baseline promovidos: NAO
