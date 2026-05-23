# SERA v0.1.4-A4 — Methodology Consolidation and Baseline Readiness

## 1. Purpose

Consolidar o estado metodologico HFA/SERA v0.1.4 como um sistema validavel, defensavel e governavel antes de qualquer nova rodada de microcorrecao.

Esta fase e documental/metodologica. Nao altera motor, fixtures oficiais, baseline, candidates JSON, reports ou contrato `erc_question_trace`.

## 1.1 Status update (pos A4-h/A4-i)

Este documento registra o estado de consolidacao A4 no momento em que foi produzido.  
Status atual apos A4-h/A4-i:

- baseline causal v0.1.4 foi criada em `tests/reports/baseline/sera-causal-baseline-v0.1.4.json`;
- baseline causal cobre classificacao causal (P/O/A + preconditions);
- risk layer permanece separada e pendente de redesign/validacao em A5;
- `erc_level` permanece metadata legacy da HFA Risk Layer.

## 2. Decisao executiva

| Pergunta | Decisao A4 |
|---|---|
| O sistema esta operacionalmente estavel? | Parcialmente sim: ultimo candidate-only N_RUNS=1 teve `13 fixtures`, `9 PASS`, `4 PARTIAL`, `0 FAIL`, `0 ERROR`, `determinism_rate=100%`. |
| Isso equivale a validacao metodologica? | Nao. `PARTIAL` continua sendo divergencia metodologica ou de expected/escala, nao PASS. |
| Algum candidate pode ser promovido agora para baseline oficial? | Nao imediatamente. O minimo para promocao exige N_RUNS=3 limpo e gates adicionais. |
| Ha candidates elegiveis para rodada de admissao de baseline? | Sim: os 9 PASS atuais podem entrar em N_RUNS=3 de admissao, sem promocao automatica. |
| O guardrail `FAIL/ERROR=0` e suficiente para commit? | Suficiente como release/commit guard operacional minimo, com decisao humana quando houver PARTIAL. |
| O guardrail `FAIL/ERROR=0` e suficiente para baseline? | Nao. Baseline exige `PASS=100%`, `PARTIAL=0`, `FAIL=0`, `ERROR=0`, determinismo e gates de regressao. |
| `erc_question_trace` deve ser reaberto agora? | Nao. Permanece rejeitado/revertido; apenas desenho documental existe. |

## 3. Evidencia lida

| Area | Evidencia |
|---|---|
| Documentos A3 | Trace governance, release gate, traces experimentais, tentativa P/O/A rejeitada, desenho ERC. |
| Documentos A2 | Isolamento de candidates, triagem, correcao controlada, guards O-C/P-C/P-D/A-G/A-A, matriz de revisao e inventario tecnico. |
| Motor lido apenas para auditoria | `pipeline.ts`, `all-steps.ts`, `types.ts`, `rules/objective/select.ts`, `rules/BASELINE.md`. |
| Candidates | 17 JSONs em `tests/sera/fixtures-candidates/methodology-gate/`; 13 ativos na lista `tests/sera/methodology-gate-fixtures.txt`. |
| Reports | Baselines v0.1/v0.1.1 e reports historicos em `tests/reports/candidates/`, com foco no ultimo `methodology-gate-run-1779493666.json`. |
| Scripts | Candidate runner, guardrail clean report, causal anchoring, smoke-fast, promote baseline v0.1.1. |

Arquivos opcionais `docs/SERA_GOVERNANCE.md` e `docs/SERA_FROZEN_v0.1.md` nao estavam presentes na leitura.

## 4. Estado metodologico atual

### 4.1 Governado

| Elemento | Status | Justificativa |
|---|---|---|
| Separacao fixtures oficiais vs candidates | Governado operacionalmente | Candidates rodam em copia temporaria; fixtures oficiais e baseline nao sao tocados pelo harness. |
| Candidate-only N_RUNS=1 | Governado operacionalmente | Runner dedicado, lista de IDs, reports segregados em `tests/reports/candidates/`. |
| Guardrail FAIL/ERROR | Governado operacionalmente | `scripts/assert-sera-report-clean.js` bloqueia `summary.fail > 0` ou `summary.error > 0`. |
| Causal anchoring gate | Governado metodologicamente | Gate permanente, lista oficial, criterio de PASS estrito por fixture. |
| Smoke-fast | Governado como gate rapido | Cobre subconjunto sensivel; explicitamente nao substitui smoke global. |
| Baseline v0.1.1 existente | Governado historicamente | Report baseline v0.1.1 tem `162/162 PASS`, `0 PARTIAL`, `0 FAIL`, `0 ERROR`, determinismo 100%. |
| Trace experimental P/O/A/Preconditions | Governado como observacional | Derivado de snapshot, sem nova chamada LLM, com `trace_isolation` e invariancia declarada. |

### 4.2 Operacionalmente estavel, mas nao fechado metodologicamente

| Elemento | Status | Risco |
|---|---|---|
| 13 candidates ativos | Estaveis em N_RUNS=1 | Ainda ha 4 PARTIALs; N_RUNS=3 nao executado nesta fase. |
| ERC atual | Operacional, nao calibrado como baseline v0.1.4 | Divergencias recorrentes ERC 2 vs 3 em candidates com P/O/A corretos. |
| Preconditions | Operacional via matriz deterministica | Nao ha validacao causal independente completa; trace declara `partial` como teto conservador. |
| Objective O-C estrito | Operacional apos guard | Precisa contrato formal de adaptacao HFA para consciencia de regra/limite. |
| A-A vs A-B perceptual | Operacional apos guard | Regra e defensavel, mas e adaptacao HFA/SERA e precisa nota formal. |
| Candidates Daumas E01/E02 | Operacionais como anchors | Representam subcasos isolados, nao eventos completos; dependem de adaptation note. |

### 4.3 Adaptacao HFA que precisa ADAPTATION_NOTE formal

| Tema | Motivo |
|---|---|
| O-C estrito por awareness explicita de limite/regra e continuidade | A distincao O-C vs O-D/O-A exige leitura HFA/SERA conservadora; nao e derivacao mecanica direta suficiente da ladder. |
| Isolamento de subcasos Daumas multi-act | Candidates E01-B/E02-B representam subcasos automatizaveis, nao necessariamente o evento agregado. |
| A-A quando a acao e coerente com percepcao incorreta | Evita dupla contagem causal P + A-B; e uma convencao metodologica HFA/SERA. |
| A-G para feedback/check formal da propria tripulacao | Estende fronteira de A-G alem de supervisao/delegacao classica. |
| Preconditions por matriz deterministica P/O/A/ERC | Operacionalizacao tecnica interna; vinculo causal e implicito, nao demonstrado por cadeia independente. |
| ERC motor legacy vs apresentacao HFA | A coexistencia de escalas e contratos precisa ser explicitada em baseline e produto. |
| Trace experimental derivado de snapshot | Auditabilidade derivativa; nao deve ser lida como avaliacao independente. |

### 4.4 Fontes

| Tipo | Componentes |
|---|---|
| Dependencia direta de Hendy | Ladders P/O/A, nocao de recuperabilidade/detectabilidade e risk management como conceito, unsafe act vs preconditions, necessidade de cadeia causal defensavel. |
| Dependencia de Daumas | Casos E01/E02, aplicacao em aviacao offshore, operacionalizacao de automacao, velocidade/atencao e multi-act em contexto real. |
| Adaptacao HFA/SERA | Regras de precedencia, O-C estrito, split de subcasos, causal anchoring, A-A vs A-B perceptual, feedback/check A-G, politica de candidates. |
| Convencao interna do sistema | Runner PASS/PARTIAL/FAIL, listas de gate, reports segregados, guardrail FAIL/ERROR, `trace_experimental`, score ERC numerico placeholder em candidates. |

## 5. Mapa dos eixos SERA

### 5.1 Percepcao

| Item | Estado |
|---|---|
| Fontes | Hendy ladder de percepcao; Daumas para automacao/atencao; HFA/SERA para causal anchoring e preemptive guards. |
| Comportamento atual | Mistura de gates deterministicos e nos LLM. `pipeline.ts` ainda possui inferencia final de codigo quando necessario. |
| Validacao forte | Fixtures oficiais cobrem P-A..P-H; causal anchoring cobre P-G organizacional; candidates PASS cobrem P-C, P-D, P-G, P-H. |
| Candidates que validam bem | `A0-AUTO-001`, `A0-AUTO-003`, `A0-CHK-003`, `A0-DAUMAS-E01-B`, `A0-DAUMAS-E02-A`, `A0-VIS-003`, `A0-VIS-004-ADJ`, `A0-VIS-005`. |
| Problematicos | `A0-CHK-002-ADJ` diverge P-D expected vs P-A atual; CONFIG/SEP fora do gate ativo. |
| Risco conhecido | P-D/P-A e P-G/P-A dependem de densidade textual e gates lexicais; Step 2 ainda LLM-dependente. |
| Readiness | Pronto para admissao seletiva em candidates PASS; `A0-CHK-002-ADJ` deve ficar exploratorio. |

### 5.2 Objetivo

| Item | Estado |
|---|---|
| Fontes | Hendy objective ladder; HFA/SERA para O-C estrito; Daumas E02-A como anchor aplicado. |
| Comportamento atual | `classifyObjectiveByRules` prioriza O-C protetivo, O-B normalizacao, O-C awareness de limite/regra e O-D eficiencia. |
| Validacao forte | Fixtures oficiais O-A/O-B/O-C/O-D; causal anchoring O-B/O-C/O-D; `A0-DAUMAS-E02-A` como O-C estrito. |
| Candidates que validam bem | Todos os 13 ativos acertam objetivo no ultimo report. |
| Problematicos | Nenhum mismatch objetivo no ultimo N_RUNS=1; risco metodologico esta em formalizar O-C estrito como adaptacao. |
| Risco conhecido | O-C awareness pode ser confundido com O-D eficiencia/pressao se a nota metodologica nao estiver formalizada. |
| Readiness | Eixo mais pronto para baseline seletivo, condicionado a N_RUNS=3 e ADAPTATION_NOTE. |

### 5.3 Acao

| Item | Estado |
|---|---|
| Fontes | Hendy action ladder; Daumas para A-E/A-H; HFA/SERA para A-A coerente com percepcao e A-G feedback/check. |
| Comportamento atual | Gates deterministicos protegem A-E, A-H, A-G, A-A perceptual e fronteiras A-B/A-C/A-F/A-J. |
| Validacao forte | Fixtures oficiais A-A..A-J; candidates PASS cobrem A-E, A-H, A-G, A-F e A-A. |
| Candidates que validam bem | `A0-AUTO-001`, `A0-AUTO-003`, `A0-AUTO-004-ADJ`, `A0-CHK-003`, `A0-DAUMAS-E01-B`, `A0-DAUMAS-E02-A`, `A0-VIS-003`, `A0-VIS-004-ADJ`, `A0-VIS-005`. |
| Problematicos | `A0-CHK-002-ADJ` ainda diverge A-H expected vs A-A/A-B/A-H historico. |
| Risco conhecido | Muitas protecoes sao lexicais; risco de fixture-specific behavior se o contrato nao for consolidado. |
| Readiness | Pronto para admissao seletiva nos PASS atuais; fronteira A-H de `A0-CHK-002-ADJ` deve ficar exploratoria. |

### 5.4 Preconditions

| Item | Estado |
|---|---|
| Fontes | Hendy preconditions como conceito; HFA/SERA operacionaliza via matriz deterministica. |
| Comportamento atual | `selectDeterministicPreconditions` substitui/normaliza preconditions apos P/O/A/ERC final; trace experimental deriva evidencias de `step6_7_final`. |
| Validacao forte | Baseline oficial inclui `top_preconditions`; ultimo candidate report mostra preconditions PASS nos 13 ativos. |
| Candidates que validam bem | Os 13 ativos tiveram preconditions PASS no ultimo N_RUNS=1. |
| Problematicos | Nao ha problema operacional no ultimo report, mas ha lacuna metodologica: vinculo causal nao e independente. |
| Risco conhecido | Matrix/heuristic pode parecer causalmente mais forte do que e; trace corretamente limita answers a `partial`. |
| Readiness | Operacionalmente pronto; metodologicamente requer contrato de limitacao antes de baseline v0.1.4. |

### 5.5 ERC

| Item | Estado |
|---|---|
| Fontes | Hendy risk management framing (sem sigla/escala ERC original explicitada no material revisado); convencao interna de escala legacy do motor e calibracoes de projeto. |
| Comportamento atual | Step 6/7 pede ERC ao LLM e depois aplica `inferDeterministicErcLevel`; `pipeline.ts` tambem tem fallback `inferErcLevel`. |
| Validacao forte | Fixtures oficiais de risco e baseline v0.1.1; candidates ainda mostram divergencias ERC 2 vs 3. |
| Candidates que validam bem | `A0-AUTO-001`, `A0-AUTO-003`, `A0-AUTO-004-ADJ`, `A0-CHK-003`, `A0-DAUMAS-E01-B`, `A0-DAUMAS-E02-A`, `A0-VIS-003`, `A0-VIS-004-ADJ`, `A0-VIS-005` no ultimo N_RUNS=1. |
| Problematicos | `A0-CHK-001`, `A0-DAUMAS-E02-B`, `A0-FUEL-002` atuais: P/O/A corretos, ERC 3 vs expected 2; `A0-CHK-002-ADJ` tem historico estrutural P/A + ERC. |
| Risco conhecido | Escala/threshold issue, especialmente nivel 2 vs 3; `erc_question_trace` nao ativo; candidates tratam ERC como placeholder historico, mas runner ainda o pontua. |
| Readiness | Fora do escopo da baseline causal v0.1.4; segue para A5 Risk Layer Redesign e validacao dedicada. |

## 6. Candidate triage

### 6.1 Definicao de categorias

| Categoria | Significado |
|---|---|
| `READY_FOR_BASELINE_CANDIDATE` | Elegivel para rodada N_RUNS=3 de admissao; nao significa promover agora. |
| `KEEP_AS_CANDIDATE_PENDING_N_RUNS3` | Manter no gate ativo, aguardando N_RUNS=3 e gates de regressao. |
| `KEEP_EXPLORATORY` | Nao usar como gate de baseline; manter para aprendizado/metodologia. |
| `EXPECTED_REVIEW_REQUIRED` | Expected atual pode estar desalinhado com comportamento estabilizado ou com escala. |
| `ENGINE_PATCH_REQUIRED` | Ha sinal de bug/lacuna de motor; nao detectado como necessidade atual nos 9 PASS. |
| `ERC_REVIEW_REQUIRED` | Divergencia primariamente ERC ou escala/threshold. |
| `METHOD_ADAPTATION_REQUIRED` | Precisa nota formal ou contrato de adaptacao HFA/SERA. |

### 6.2 Tabela dos 17 candidates conhecidos

| Candidate | Gate ativo | Ultimo estado conhecido | Categoria primaria | Flags secundarias | Diagnostico |
|---|---:|---|---|---|---|
| `A0-AUTO-001` | Sim | PASS atual; historico majoritariamente PASS | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3` | Anchor P-C/A-E de automacao; elegivel para N_RUNS=3. |
| `A0-AUTO-003` | Sim | PASS atual | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3` | P-D/A-H temporal; verificar ERC em N_RUNS=3. |
| `A0-AUTO-004-ADJ` | Sim | PASS atual | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3`, `METHOD_ADAPTATION_REQUIRED` | A-G por feedback/check formal precisa nota de adaptacao. |
| `A0-CHK-001` | Sim | PARTIAL atual: ERC 3 vs expected 2 | `ERC_REVIEW_REQUIRED` | `EXPECTED_REVIEW_REQUIRED` | Nao parece bug P/O/A; provavel threshold ERC 2/3 ou expected errado. |
| `A0-CHK-002-ADJ` | Sim, mas JSON marca `gate_candidate=false` | PARTIAL atual: P/A divergentes | `KEEP_EXPLORATORY` | `EXPECTED_REVIEW_REQUIRED`, `METHOD_ADAPTATION_REQUIRED` | Caso ambiguo/expected estrito; nao usar para baseline. |
| `A0-CHK-003` | Sim | PASS atual | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3`, `METHOD_ADAPTATION_REQUIRED` | A-G por feedback/cross-check; requer contrato formal. |
| `A0-CONFIG-001` | Nao | Sem report ativo recente | `KEEP_EXPLORATORY` | `EXPECTED_REVIEW_REQUIRED` | E1 curto rebaixado; sem admissao ate novo desenho. |
| `A0-CONFIG-002` | Nao | Sem report ativo recente | `KEEP_EXPLORATORY` | `EXPECTED_REVIEW_REQUIRED` | E1 curto rebaixado; risco A-A/A-C. |
| `A0-DAUMAS-E01-B` | Sim | PASS atual e historico forte | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3`, `METHOD_ADAPTATION_REQUIRED` | Subcaso Daumas isolado; adaptation note ja existe no JSON. |
| `A0-DAUMAS-E02-A` | Sim | PASS atual | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3`, `METHOD_ADAPTATION_REQUIRED` | O-C estrito por awareness precisa nota formal no contrato metodologico. |
| `A0-DAUMAS-E02-B` | Sim | PARTIAL atual: ERC 3 vs expected 2 | `ERC_REVIEW_REQUIRED` | `EXPECTED_REVIEW_REQUIRED`, `METHOD_ADAPTATION_REQUIRED` | P-D/A-H estabilizado; problema atual e ERC 2/3. |
| `A0-FUEL-002` | Sim | PARTIAL atual: ERC 3 vs expected 2 | `ERC_REVIEW_REQUIRED` | `EXPECTED_REVIEW_REQUIRED` | P/O/A correto; provavel calibracao ERC. |
| `A0-SEP-002` | Nao | Rebaixado apos erro de relato insuficiente | `KEEP_EXPLORATORY` | `EXPECTED_REVIEW_REQUIRED` | Limite lateral/separacao precisa trilha propria; nao pronto. |
| `A0-SEP-005` | Nao | Rebaixado apos erro de relato insuficiente | `KEEP_EXPLORATORY` | `EXPECTED_REVIEW_REQUIRED` | Separacao lateral dinamica precisa trilha propria; nao pronto. |
| `A0-VIS-003` | Sim | PASS atual; historico ERC oscilante | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3`, `ERC_REVIEW_REQUIRED` | Pode entrar em N_RUNS=3; monitorar ERC 2/3. |
| `A0-VIS-004-ADJ` | Sim | PASS atual | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3`, `METHOD_ADAPTATION_REQUIRED` | P-H/A-A por conflito de fontes; exige nota de adaptacao. |
| `A0-VIS-005` | Sim | PASS atual | `READY_FOR_BASELINE_CANDIDATE` | `KEEP_AS_CANDIDATE_PENDING_N_RUNS3`, `METHOD_ADAPTATION_REQUIRED` | P-H/A-A por conflito radar/visual; exige nota de adaptacao. |

### 6.3 Candidates problematicos

| Candidate | Problema provavel | Classificacao |
|---|---|---|
| `A0-CHK-001` | ERC 2/3 threshold; comportamento atual majoritario aponta ERC 3. | `ERC scale/threshold issue` + `expected review`. |
| `A0-DAUMAS-E02-B` | ERC 2/3 threshold apos P/O/A estabilizado. | `ERC scale/threshold issue` + `method adaptation`. |
| `A0-FUEL-002` | ERC 2/3 threshold; risco operacional pode ser maior que expected 2. | `ERC scale/threshold issue` + `expected review`. |
| `A0-CHK-002-ADJ` | Ambiguidade metodologica P-D/A-H vs P-A/A-A; historico estrutural, nao mero ERC. | `caso ambiguo metodologicamente`; manter exploratorio. |
| `A0-CONFIG-001` | E1 curto fora do gate ativo; sem evidencias atuais. | `limitation acceptable v0.1.4`; manter exploratorio. |
| `A0-CONFIG-002` | E1 curto fora do gate ativo; risco A-A/A-C. | `limitation acceptable v0.1.4`; manter exploratorio. |
| `A0-SEP-002` | Historico de relato insuficiente; rebaixado. | `limitation acceptable v0.1.4`; precisa redesenho. |
| `A0-SEP-005` | Historico de relato insuficiente; rebaixado. | `limitation acceptable v0.1.4`; precisa redesenho. |

Nao ha evidencia atual suficiente para declarar `ENGINE_PATCH_REQUIRED` em qualquer candidate ativo. Os problemas remanescentes sao principalmente ERC/expected/adaptacao, exceto `A0-CHK-002-ADJ`, que deve sair do gate de baseline.

## 7. Baseline readiness

### 7.1 Promocao agora

Nao promover nenhum candidate agora para baseline oficial.

Motivos:

- ultimo dado e N_RUNS=1, nao N_RUNS=3;
- existem 4 PARTIALs nos 13 ativos;
- ERC ainda nao tem calibracao fechada para candidates;
- `A0-CHK-002-ADJ` permanece na lista ativa apesar de o JSON marcar `gate_candidate=false`;
- baseline exige criterio mais forte que commit/release guard.

### 7.2 Condicoes para promocao seletiva

Os 9 PASS atuais podem ser considerados `READY_FOR_BASELINE_CANDIDATE` somente sob estas condicoes:

| Condicao | Exigencia |
|---|---|
| Candidate N_RUNS=3 | `PASS=100%`, `PARTIAL=0`, `FAIL=0`, `ERROR=0`, `determinism_rate=100%` nos IDs propostos. |
| Anchors obrigatorios | `--require-anchor` para anchors Daumas/Hendy relevantes, incluindo P/O/A sem drift. |
| Causal anchoring | Gate aprovado, preferencialmente N_RUNS=3 antes de baseline. |
| Smoke-fast | Aprovado no branch atual apos qualquer mudanca documental/metodologica de baseline. |
| Smoke global | Obrigatorio antes de freeze de baseline oficial. |
| Revisao humana | Obrigatoria para adicionar baseline, alterar expected, mudar lista ativa ou aceitar exception. |

### 7.3 Gate minimo para baseline v0.1.4

| Gate | Minimo baseline |
|---|---|
| Candidate admission | N_RUNS=3 nos candidates propostos, `0 PARTIAL/FAIL/ERROR`. |
| Baseline official smoke | Smoke global N_RUNS=3 com `PASS=100%`. |
| Causal anchoring | PASS completo; nenhum PARTIAL aceito. |
| Smoke-fast | PASS completo; usado como pre-gate rapido, nao substituto. |
| Reports | Report limpo versionado; nao commitar reports intermediarios. |
| Documento | Contrato metodologico com fonte, adaptacao e expected rationale por eixo. |

## 8. Governanca de validacao

### 8.1 Tipos de gate

| Gate | Finalidade | Criterio |
|---|---|---|
| Release gate | Evitar commit/merge com erro tecnico bruto. | `FAIL=0`, `ERROR=0`; PARTIAL exige decisao humana/documental. |
| Methodology gate | Validar coerencia de eixo/candidate. | P/O/A/Preconditions/ERC conforme contrato; PARTIAL nao e sucesso. |
| Baseline gate | Congelar comportamento oficial. | `PASS=100%`, `PARTIAL=0`, `FAIL=0`, `ERROR=0`, determinismo 100%. |
| Product readiness | Expor ou depender em produto. | Baseline + contrato de apresentacao + limites na UI/API. |
| Scientific/methodological confidence | Defender a metodologia fora do software. | Fontes, adaptation notes, evidencias, revisao humana e reprodutibilidade. |

### 8.2 Quando usar cada execucao

| Execucao | Quando usar |
|---|---|
| `N_RUNS=1` candidate-only | Canario rapido apos documento, triagem ou patch pequeno; nunca promove baseline sozinho. |
| `N_RUNS=3` candidate-only | Admissao de baseline, calibracao ERC, milestone metodologico ou suspeita de instabilidade LLM. |
| `smoke-fast` | Ciclo curto/PR e apos qualquer mudanca em motor, prompts, regras ou lista sensivel. |
| `causal anchoring gate` | Antes de qualquer alteracao em motor/prompts/regras e antes de baseline. |
| Smoke global | Release, freeze de baseline e qualquer mudanca que possa afetar comportamento geral. |
| Guardrail `assert-sera-report-clean` | Todo report usado como evidencia de commit/release; nao basta para baseline. |

### 8.3 Bloqueios

| Situacao | Politica |
|---|---|
| `summary.fail > 0` ou `summary.error > 0` | Bloqueia commit automatico e baseline. Excecao so documental com decisao humana explicita. |
| `summary.partial > 0` | Pode permitir commit documental se a fase e explicitamente documental e nao altera motor/baseline/candidates. Bloqueia baseline. |
| Expected change | Requer documento de decisao, comparacao historica, N_RUNS=3 e revisao humana. |
| Engine patch | Requer causal anchoring, smoke-fast, candidate N_RUNS=1; N_RUNS=3 se tocar eixo sensivel ou baseline. |
| Baseline promotion | Requer revisao humana e todos os gates de baseline. |
| `erc_question_trace` | Bloqueado ate ERC calibration e readiness propria; nao retentar em A4-a. |

## 9. Proximas fases maiores

### 9.1 A4-a — Methodology Contract Consolidation

| Campo | Definicao |
|---|---|
| Objetivo | Escrever contrato metodologico unico: fontes, adaptacoes HFA, convencoes internas, limites de trace, criterio PASS/PARTIAL/FAIL e politica ERC. |
| Entrada | Documento A4 atual; nenhum patch pendente de motor; candidates e reports congelados. |
| Saida | Documento contrato com ADAPTATION_NOTE formal para O-C, A-A/A-B, A-G feedback, Daumas subcases, preconditions e ERC. |
| Artefatos | `docs/SERA_METHOD_CONTRACT_v0.1.4.md` ou equivalente. |
| Proibido | Alterar motor, expected ou baseline. |

### 9.2 A4-b — Candidate Triage and Baseline Admission

| Campo | Definicao |
|---|---|
| Objetivo | Separar lista de admissao baseline dos exploratorios e rodar N_RUNS=3 nos 9 PASS elegiveis. |
| Entrada | Contrato A4-a aprovado; lista proposta sem `A0-CHK-002-ADJ`, CONFIG e SEP. |
| Saida | Matriz de admissao: promover, manter candidate, ou rebaixar. |
| Artefatos | Report N_RUNS=3 candidate-only, matriz de anchors, decisao de lista. |
| Proibido | Promover baseline se houver qualquer PARTIAL/FAIL/ERROR. |

### 9.3 A4-c — ERC Calibration and Scale Governance

| Campo | Definicao |
|---|---|
| Objetivo | Fechar escala/threshold ERC 2 vs 3 e contrato legacy motor vs HFA presentation. |
| Entrada | Lista dos casos ERC divergentes: `A0-CHK-001`, `A0-DAUMAS-E02-B`, `A0-FUEL-002`, historico `A0-VIS-003`. |
| Saida | Decisao de expected ERC, criterio de calibracao, e se necessario backlog de patch. |
| Artefatos | Documento ERC calibration, tabela de exemplos, gate N_RUNS=3 dedicado. |
| Proibido | Implementar `erc_question_trace` antes da decisao de escala. |

### 9.4 A4-d — Baseline v0.1.4 Freeze and Smoke

| Campo | Definicao |
|---|---|
| Objetivo | Congelar baseline v0.1.4 com candidates admitidos e smoke global limpo. |
| Entrada | A4-a/b/c concluidos; nenhum PARTIAL em admissao; revisao humana aprovada. |
| Saida | Baseline oficial versionado, report limpo, changelog metodologico. |
| Artefatos | Report baseline, documento freeze, lista de fixtures/candidates promovidos. |
| Proibido | Commitar reports intermediarios ou promover candidates exploratorios. |

## 10. Riscos remanescentes

| Risco | Severidade | Mitigacao |
|---|---|---|
| Confundir estabilidade N_RUNS=1 com baseline | Alta | Exigir N_RUNS=3 e `PARTIAL=0`. |
| ERC 2/3 sem calibracao | Alta | Fase A4-c dedicada antes de baseline amplo. |
| Adaptacoes HFA sem nota formal | Alta | A4-a como pre-requisito para A4-b. |
| `A0-CHK-002-ADJ` ainda na lista ativa | Media | Remover/reclassificar em fase propria, nao nesta fase. |
| Traces derivados parecerem evidencia independente | Media | Limites explicitos no contrato e na UI/API. |
| Heuristicas lexicais parecerem metodologia original | Media | Separar Hendy/Daumas/HFA/internal em cada eixo. |

## 11. Conclusao

SERA v0.1.4 esta melhor governado operacionalmente do que metodologicamente fechado. O estado atual permite uma fase de consolidacao e admissao controlada, mas nao uma promocao imediata de baseline.

A decisao recomendada e:

1. Consolidar contrato metodologico antes de qualquer patch.
2. Rodar admissao N_RUNS=3 apenas nos 9 PASS elegiveis.
3. Tratar ERC como fase propria, nao como detalhe residual.
4. Manter `A0-CHK-002-ADJ`, CONFIG e SEP fora de qualquer baseline ate revisao dedicada.
5. Nao reabrir `erc_question_trace` ate calibracao ERC e baseline readiness.
