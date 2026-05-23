# SERA v0.1.4-A4-Z - Causal Baseline Closure and A5 Readiness

Status: A4 closure (governanca)  
Scope: encerramento formal da baseline causal v0.1.4 e prontidao para A5  
Non-scope: patch de motor, calibracao de expected/candidates, baseline de risco completa

## A. Executive Conclusion

O bloco A4 fecha com baseline causal v0.1.4 formalizada e validada para classificacao SERA causal.

- Baseline causal valida: `P/O/A + preconditions`.
- Risk Layer permanece fora do freeze causal e segue para redesign dedicado em A5.

## B. Artefatos Oficiais

- Baseline artifact causal:
  - `tests/reports/baseline/sera-causal-baseline-v0.1.4.json`
- Methodology contract:
  - `docs/SERA_METHOD_CONTRACT_v0.1.4.md`
- Scorer/report causal contract:
  - `docs/SERA_A4_E_OFFICIAL_CAUSAL_SCORER_CONTRACT_v0.1.4.md`
- Stable rerun execution doc:
  - `docs/SERA_A4_H_STABLE_CAUSAL_FREEZE_RERUN_EXECUTION_v0.1.4.md`
- Baseline artifact and freeze governance doc:
  - `docs/SERA_A4_I_CAUSAL_BASELINE_ARTIFACT_AND_FREEZE_GOVERNANCE_v0.1.4.md`
- Documentation consistency doc:
  - `docs/SERA_A4_J_DOCUMENTATION_CONSISTENCY_UPDATE_v0.1.4.md`
- Guardrails/scripts:
  - `tests/sera/assert-sera-causal-report-clean.js`
  - `tests/sera/analyze-sera-causal-report.js`

## C. Evidencia de Validacao

Fonte estavel aprovada (embutida no artifact):

- `source_report`: `tests/reports/candidates/methodology-gate-run-1779544197.json`
- `run_id`: `run-1779542293462`
- `fixtures_tested`: 9
- `n_runs_per_fixture`: 3
- `total_runs`: 27

Resultados consolidados:

- Legacy summary: `27 PASS`, `0 PARTIAL`, `0 FAIL`, `0 ERROR`, `determinism_rate=1`.
- Causal summary: `27 PASS`, `0 PARTIAL`, `0 FAIL`, `0 ERROR`, `determinism_rate=1`.
- Risk layer summary: `27 MATCH`, `0 MISMATCH`, `0 HOLD`, `determinism_rate=1`.
- Provider-stable: sem `terminated`, sem `Request timed out`, sem `actual` vazio (`///0`).
- Guardrail causal: OK.

## D. Limites da Baseline

Esta baseline **nao** valida nem congela:

- traditional risk matrix;
- ARMS/ERC como baseline de risco completa;
- Hendy tactical/strategic risk management como claim de validacao completa;
- product risk profile como claim de risco final;
- smoke global completo de produto/plataforma;
- claims comerciais/metodologicos acima do escopo causal validado.

## E. Politica de Governanca

- Nao alterar motor causal sem regression gate dedicado.
- Qualquer mudanca futura em classificacao causal deve rerodar baseline causal.
- Reports com `timeout`/`terminated` ou `actual` vazio devem ser classificados como `NOISY_PROVIDER_RUN`.
- `PARTIAL` nao e `PASS` para gate de freeze causal.
- `risk_layer` mismatch nao invalida baseline causal por si so, salvo contaminacao direta dos campos causais (`perception/objective/action/preconditions`).
- `erc_level` permanece metadata legacy da HFA Risk Layer, nao eixo causal original comprovado de Hendy/SERA.

## F. Decisao sobre Tag/Pre-release

### Opcao recomendada

Criar tag leve/manual **apos** commit/push e com working tree limpa:

- tag sugerida: `sera-causal-v0.1.4`

Pros:

- fixa marco oficial de baseline causal;
- facilita auditoria/reproducao por referencia imutavel;
- separa claramente fechamento A4 da trilha A5.

Contras:

- pode gerar leitura equivocada de “release final de risco” se caveats nao forem reforcados;
- exige disciplina de comunicacao para nao extrapolar claims da Risk Layer.

### Alternativa

Adiar tag ate apos A5.

Pros:

- reduz risco de interpretacao prematura de completude metodologica;
- simplifica narrativa de release unico no fim do redesign de risco.

Contras:

- perde checkpoint formal da baseline causal que ja esta validada.

## G. Roadmap Macro Pos-A4

### A5 - Risk Layer Redesign

- matriz tradicional;
- ARMS/ERC;
- Hendy risk management;
- risk profile;
- risk confidence;
- product caveats de risco.

### A6 - Product Readiness

- relatorios;
- UI/API e copy alinhados ao escopo metodologico;
- disclaimers/caveats de uso;
- onboarding com limites de interpretacao.

### A7 - Final Release Candidate

- smoke global;
- typecheck completo;
- docs finais;
- decisao final de tag/release.

## H. Open Risks

- Risk Layer ainda nao redesenhada nem validada separadamente.
- Product claims ainda exigem caveats rigorosos para nao extrapolar baseline causal.
- Preconditions devem permanecer como suporte causal, nao prova absoluta isolada.
- Candidate set atual e metodologico/controlado; nao representa universo completo de validacao.
- Residual documental critico fora do pacote A4 central: ha arquivo legado com claim forte de ERC como referencia Hendy (`docs/SERA_ADAPTATION_NOTES_v0.1.4.md`, linha com "ERC e referencia Hendy 2003"). Deve ser harmonizado em fase documental dedicada para evitar ambiguidade normativa.

## I. Final Recommendation

1. Commitar o fechamento A4-Z (fase documental).
2. Criar tag `sera-causal-v0.1.4` somente com:
   - working tree limpa;
   - branch alinhada com `origin/main`;
   - caveats de escopo causal explicitados.
3. Iniciar A5 em fase separada, mantendo separacao formal entre baseline causal e redesign da Risk Layer.
