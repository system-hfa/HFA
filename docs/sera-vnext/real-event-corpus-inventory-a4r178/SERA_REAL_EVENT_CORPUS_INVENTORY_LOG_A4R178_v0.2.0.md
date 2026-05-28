# SERA Real Event Corpus Inventory Log — A4R178

## Comandos rodados
- git status --short --untracked-files=all
- git rev-parse HEAD origin/main
- git log --oneline --decorate -12
- node docs/sera-vnext/fixture-implementation-contract-a4r172/validate-sera-reference-p1a-fixtures.mjs
- node docs/sera-vnext/candidate-runner-a4r173/validate-reference-p1a-candidate-runner.mjs
- node docs/sera-vnext/candidate-runner-a4r175/validate-reference-p1b-candidate-runner.mjs
- node docs/sera-vnext/candidate-runner-a4r175/validate-reference-p1-candidate-suite.mjs
- find/rg/python3 para inventario estrutural e deduplicacao preliminar.

## Arquivos principais lidos
- documentos A4R177 obrigatorios;
- matriz P1 A4R176;
- matriz P1-B A4R175;
- fixtures-candidates reference-p1a/reference-p1b (somente contexto).

## Criterios usados
- inventario estrutural candidate-only;
- separacao por bucket de origem;
- cobertura P/O/A como hipotese (`POTENTIAL_*`, `UNKNOWN`, `NOT_APPLICABLE_CANDIDATE`, `NEEDS_REVIEW`);
- duplicatas marcadas apenas como `POSSIBLE_DUPLICATE`.

## Limitacoes
- sem adjudicacao metodologica;
- sem consolidacao final de duplicatas;
- sem inferencia de classificacao final.

## Proximos passos
- A4R179: selecionar lote real por lacuna de cobertura com revisao humana.

## Confirmacao de escopo
- sem classificacao SERA final;
- sem alteracao de runner oficial/baseline/fixtures oficiais;
- sem chamadas LLM/API.

## Correcao documental pos-revisao ChatGPT
- placeholder literal removido do summary (`grupos de duplicata preliminar: 19`);
- contagens do summary alinhadas com validacao dos CSVs (`inventory_rows=382`, `coverage_rows=23`, `dedupe_groups=19`) e notas de escopo adicionadas;
- nenhum CSV metodologico foi alterado;
- sem classificacao SERA.
