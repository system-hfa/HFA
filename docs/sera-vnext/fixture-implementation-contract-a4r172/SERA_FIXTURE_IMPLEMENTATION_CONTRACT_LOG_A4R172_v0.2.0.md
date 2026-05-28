# SERA Fixture Implementation Contract Log — A4R172 v0.2.0

Status:
- DRAFT_ONLY
- IMPLEMENTATION_CONTRACT_ONLY
- NO_EXECUTABLE_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Arquivos lidos

- `docs/sera-vnext/reference-fixture-design-a4r171/SERA_REFERENCE_FIXTURE_DESIGN_P1A_A4R171_v0.2.0.md`
- `docs/sera-vnext/reference-fixture-design-a4r171/SERA_REFERENCE_FIXTURE_DESIGN_MATRIX_A4R171_v0.2.0.csv`
- `docs/sera-vnext/reference-fixture-design-a4r171/SERA_REFERENCE_FIXTURE_DESIGN_LOG_A4R171_v0.2.0.md`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_PACKET_P1_A4R170_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`

## 2. Decisoes tomadas

- Escopo fechado em DAUMAS-CASE-4 (positive) e US-AIRWAYS-1549 (negative control).
- fixtureId definidos como `REF-P1A-DAUMAS-CASE-4-POSITIVE-001` e `REF-P1A-US-AIRWAYS-1549-NEGATIVE-001`.
- Contrato tecnico completo com expected canonical traces, pass/fail criteria, fields preserved/absent.
- Proposta de arquivos futuros (FUTURE_PHASE_ONLY): diretorio, JSONs, script de validacao, documentacao de runner.
- Criterios de bloqueio definidos para impedir violacao de escopo na fase de implementacao.
- Validacoes esperadas listadas para a fase Codex futura.
- Nenhuma implementacao executavel nesta fase.

## 3. Por que EXECUFLIGHT-1526 foi excluido do primeiro lote

EXECUFLIGHT-1526 e um caso multi-actor (FO/PF + Captain/PM) com single escape point e actor contributions. Sua complexidade metodologica e maior do que os casos single-actor/no-actor do primeiro lote. O par DAUMAS-CASE-4 + US-AIRWAYS-1549 cobre os dois extremos do motor SERA vNext (positivo humano limpo e controle negativo tecnico/ambiental) com menor risco de ambiguidade. EXECUFLIGHT-1526 exigira contrato separado em fase futura.

## 4. Locks

- `NO_EXECUTABLE_FIXTURE` — nenhum fixture executavel criado nesta fase;
- `NO_BASELINE` — baseline nao alterado;
- `NO_RELEASED_CODE` — nenhum codigo liberado;
- `NO_DOWNSTREAM` — nenhum downstream criado;
- `NO_FINAL_CONCLUSION` — nenhuma conclusao final emitida;
- `NO_HFACS` — nenhum artefato HFACS criado;
- `NO_RISK_ERC` — nenhum artefato Risk/ERC criado;
- `NO_ARMS_ERC` — nenhum artefato ARMS/ERC criado;
- `NO_RECOMMENDATIONS` — nenhuma recomendacao criada;
- `SINGLE_ESCAPE_POINT` — um unico ponto de fuga por caso;
- `NO_WRONG_PROJECT_TERMINOLOGY` — terminologia incorreta do projeto nao utilizada.

## 5. Riscos

- DAUMAS-CASE-4 ainda e source reproduction, nao relatorio oficial externo — a fixture dependera da qualidade da reproducao textual;
- US-AIRWAYS-1549 pode tentar puxar analise para decisoes posteriores da tripulacao — o contrato bloqueia isso explicitamente;
- A fase Codex futura pode tentar expandir escopo — os criterios de bloqueio (secao 8 do contrato) devem impedir;
- EXECUFLIGHT-1526 pode ser incluido por engano no lote — o contrato exclui explicitamente.

## 6. Recomendacao Codex futura

A proxima fase, A4R172-impl, deve:

- usar Codex como ferramenta de implementacao;
- seguir exclusivamente o contrato definido em `SERA_FIXTURE_IMPLEMENTATION_CONTRACT_P1A_A4R172_v0.2.0.md`;
- criar apenas os dois arquivos JSON de fixture draft;
- validar contra os criterios de passagem e falha;
- parar imediatamente se qualquer criterio de bloqueio for violado;
- nao commitar nem fazer push sem autorizacao separada.
