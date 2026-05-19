# SERA — Causal Anchoring Gate v0.1.3-C
**Versão:** v0.1.3-C
**Data:** 2026-05-19
**Fase:** SERA v0.1.3-C — Gate permanente de validação causal
**Status:** Ativo — gate obrigatório antes de qualquer alteração no motor SERA, prompts ou promoção de baseline

---

## 1. Objetivo

Transformar a bateria adversarial de ponto de fuga da operação segura (`SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md`) em um gate permanente, rápido e reutilizável, executável em ciclos curtos de desenvolvimento e em CI, capaz de detectar regressões na ancoragem causal P/O/A antes que cheguem ao smoke global ou à produção.

O gate consolida:
- A bateria adversarial v0.1.3-A (8 fixtures `TEST-ESCAPE-*`).
- A correção funcional v0.1.3-B (anti-gate de engenharia/design estabilizado sobre o relato bruto).
- Um conjunto pequeno de fixtures de controle e regressão nos eixos sensíveis.

---

## 2. Por que o gate existe

A metodologia SERA exige que as Etapas 3, 4 e 5 (Percepção, Objetivo, Ação) respondam **sempre** sobre o mesmo agente, ato/omissão e momento operacional definidos no ponto de fuga (Etapa 2). Sem esse anchoring, classificações tornam-se inconsistentes:

- A resposta de um piloto após falha técnica vira "ponto de fuga" no lugar da falha de manutenção que precedeu.
- A-D é atribuído à incapacidade física de recuperar uma aeronave já comprometida, em vez de A-G à supervisão de manutenção que liberou o componente sem teste.
- O-D ("decisão por eficiência/economia") é descartado em favor de O-A genérico quando a pressão comercial está explícita.
- P-G ("falha de monitoramento") colapsa para P-A quando o sistema organizacional deixou de gerar/rastrear o requisito.

Esses erros são silenciosos: o smoke global cobre muitos fixtures, mas não exercita explicitamente cada eixo de ancoragem. Sem um gate dedicado, o motor pode regredir entre releases sem que o ciclo curto detecte.

---

## 3. Relação com o erro Copterline

O caso Copterline (Sikorsky S-76C+, OH-HCI, Mar de Tallinn, 10/08/2005) é o paradigma de erro de migração causal:

- **Ponto de fuga real**: gestão de manutenção da Copterline não verificou que o teste obrigatório de vazamento interno do atuador dianteiro foi executado às 2250 horas voadas — o HELOTRAC não gerou a tarefa, não houve registro de execução nem deferimento documentado.
- **Classificação correta**: P-G / O-A / A-G / ERC 1 (motor legacy = crítico, falha latente).
- **Erro comum**: atribuir A-D à incapacidade dos pilotos de recuperar a aeronave após a extensão não comandada — isso troca o agente do ponto de fuga (manutenção) por outro ator (tripulação) e classifica a **consequência** como causa primária.

A fixture `TEST-COPTERLINE-S76C-001` está incluída no gate para garantir que essa migração causal continue bloqueada por construção.

---

## 4. Relação com a fase v0.1.3-B

A v0.1.3-A criou as 8 fixtures adversariais e documentou 8/8 PARTIAL — todas falharam exatamente nos eixos previstos pela hipótese.

A v0.1.3-B aplicou a correção funcional do motor:
- Removeu o override que forçava `P-A` sempre que `A-G` saía.
- Reforçou `P-G` organizacional (agente + barreira/requisito + falha de verificação).
- Endureceu `O-B`/`O-D` (normalização rotineira vs. desvio por pressão/trade-off).
- Estabilizou o anti-gate `engineeringDesignDominant` sobre o relato bruto (não sobre `relato + ato_inseguro_factual`), eliminando o residual estatístico em `TEST-ESCAPE-DESIGN-001`.

Resultado consolidado N_RUNS=3 pós-correção: **TEST-ESCAPE-\* 24/24 PASS**, **Copterline 3/3 PASS**, **regressões legítimas 5/5 PASS**.

A v0.1.3-C **não altera o motor**. Apenas materializa essa bateria como gate executável e versionado.

---

## 5. Lista de fixtures incluídas

Fonte oficial: [`tests/sera/causal-anchoring-fixtures.txt`](../tests/sera/causal-anchoring-fixtures.txt).

### 5.1 Bateria adversarial — ponto de fuga da operação segura

| Fixture | Domínio | P / O / A esperados | ERC (motor legacy) |
|---|---|---|---|
| `TEST-ESCAPE-MAINT-001` | Manutenção de motor turboélice | P-G / O-A / A-G | 1 |
| `TEST-ESCAPE-DISPATCH-001` | Despacho operacional | P-A / O-D / A-A | 2 |
| `TEST-ESCAPE-PLANNING-001` | Planejamento de peso e balanceamento | P-G / O-A / A-B | 3 |
| `TEST-ESCAPE-SUPERVISION-001` | Supervisão de manutenção | P-G / O-A / A-G | 3 |
| `TEST-ESCAPE-TRAINING-001` | Supervisão de treinamento | P-G / O-A / A-G | 3 |
| `TEST-ESCAPE-DESIGN-001` | Engenharia de produto / boletim de serviço | P-A / O-D / A-A | 2 |
| `TEST-ESCAPE-PILOT-LEGIT-001` | Violação normalizada por tripulação | P-G / O-B / A-A | 1 |
| `TEST-ESCAPE-POST-FAILURE-001` | Manutenção pós-evento | P-G / O-A / A-G | 1 |

### 5.2 Controle de caso real

| Fixture | Caso | P / O / A | ERC (motor legacy) |
|---|---|---|---|
| `TEST-COPTERLINE-S76C-001` | Copterline Sikorsky S-76C+ (Tallinn, 2005) | P-G / O-A / A-G | 1 |

### 5.3 Regressões seletivas — eixos sensíveis à ancoragem

| Fixture | Eixo coberto |
|---|---|
| `TEST-A-D-001` | A-D legítimo (incapacidade física explícita) |
| `TEST-A-G-001` | A-G legítimo (supervisão + delegação + falha de verificação de terceiro) |
| `TEST-A-B-001` | A-B execução direta (omissão procedural específica) |
| `TEST-GEN-OB-001` | O-B (violação rotineira/normalizada) |
| `TEST-GEN-OC-001` | O-C (objetivo protetivo/humano) |

Total: **14 fixtures**.

---

## 6. O que o gate valida

O gate exercita simultaneamente todas as invariantes de ancoragem causal:

- **Mesmo agente** entre Etapas 2 e 5. A resposta de outro ator não vira ponto de fuga.
- **Mesma barreira** descrita no ato inseguro permanece como referência das classificações P/O/A.
- **Mesmo ato/omissão** factual e observável (verbo de ação) ao longo das etapas.
- **Mesmo momento causal** — o mais cedo em que ainda havia controle, não o momento da consequência.
- **Resposta pós-fuga não vira causa primária** — tripulação tentando recuperar aeronave após falha técnica é consequência, não ponto de fuga.
- **A-D só com incapacidade física explícita** do próprio agente do ponto de fuga (força, alcance, EPI, ergonomia, equipamento). Nunca como atalho para "agente não conseguiu reverter o que outro causou".
- **A-G não captura engenharia/design puro** — boletim de serviço, decisão de projeto ou aceite técnico do fabricante não são supervisão operacional executável.
- **O-D exige pressão/trade-off** explícito (pontualidade, impacto comercial, eficiência, ganho operacional) sem evidência de normalização rotineira.
- **O-B exige normalização/rotina** (rota habitual, prática tolerada, violação rotineira, complacência operacional).
- **P-G exige falha de monitoramento/rastreio/verificação** de informação disponível por sistema organizacional (HELOTRAC, controle de aeronavegabilidade, programa de manutenção, supervisão delegada com verificação).

---

## 7. Como rodar

Da raiz do repositório:

```bash
# Execução rápida (default — 1 run por fixture)
SERA_N_RUNS=1 bash scripts/run-sera-causal-anchoring.sh

# Execução com 3 runs por fixture (mais lenta, melhor para detectar variância LLM)
SERA_N_RUNS=3 bash scripts/run-sera-causal-anchoring.sh

# Lista customizada de fixtures
SERA_FIXTURE_LIST=tests/sera/causal-anchoring-fixtures.txt bash scripts/run-sera-causal-anchoring.sh
```

O script:

1. Itera a lista de fixtures linha a linha (linhas em branco e `#` ignoradas).
2. Para cada fixture, chama `npx tsx tests/sera/run.ts --filter <ID> --compact --n-runs <N>`.
3. Lê o JSON do relatório gerado em `tests/reports/run-*.json`.
4. Marca **PASS** apenas se `summary.partial === 0 && summary.fail === 0 && summary.error === 0 && pass_rate === 1.0`.
5. Imprime resumo final com o número de fixtures rodadas, `n-runs` usado e dois avisos: o gate não substitui smoke global, e `expected.erc_level` está na escala legacy do motor (1=crítico, 5=mínimo).

Exit code:
- `0`: todas as fixtures PASS.
- `1`: qualquer fixture com `PARTIAL`, `FAIL`, `ERROR` ou ausência de JSON de report.

---

## 8. Quando rodar

O gate é **obrigatório** antes de:

- Alterar `frontend/src/lib/sera/all-steps.ts`.
- Alterar `frontend/src/lib/sera/pipeline.ts`.
- Alterar `frontend/src/lib/sera/rules/objective/select.ts` (ou qualquer regra em `rules/`).
- Alterar prompts SERA (qualquer string de prompt em `runStep1..runStep7`).
- Promover baseline (snapshot oficial de smoke).

Recomendado também:

- Após qualquer alteração em `frontend/src/lib/sera/erc-conversion.ts` ou regras de ERC.
- Antes de adicionar fixtures novas (para confirmar que o baseline atual não regrediu).
- No CI de PR que toque qualquer arquivo do diretório `frontend/src/lib/sera/`.

---

## 9. O que fazer se falhar

Quando o gate reprova, **não alterar `expected` imediatamente**. Seguir o protocolo:

1. **Inspecionar expected vs actual** nos 4 eixos (P, O, A, ERC) da fixture que falhou. Ler o JSON do relatório em `tests/reports/run-*.json`.
2. **Identificar migração causal**: o pipeline mudou de agente, ato ou momento entre Etapas 2 e 5? Se sim, é regressão de ancoragem — não da fixture.
3. **Classificar a fonte do erro**:
   - **Fixture**: relato com vocabulário ambíguo ou marcadores ausentes. Pode justificar reforço lexical do relato — sem alterar `expected`.
   - **LLM**: variância estatística entre runs. Investigar se o gate determinístico cobre o caso ou se é necessário endurecer um anti-gate.
   - **Prompt**: o nó local instrui o LLM a responder fora do branch correto.
   - **Regra**: gate determinístico em `all-steps.ts`/`rules/` precisa ser ajustado.
4. **Documentar o diagnóstico** (qual fonte, qual eixo, qual evidência textual) **antes** de propor correção. A v0.1.3-A e v0.1.3-B seguiram exatamente esse fluxo.
5. **Corrigir no nível certo**:
   - Reforço lexical do relato → fixture.
   - Gate determinístico → motor.
   - Reformulação de prompt → motor.
   - **Nunca** ajustar `expected` para fazer o gate passar.

---

## 10. Limites

O gate é deliberadamente pequeno e focado. Ele **não** substitui:

- **Smoke global** (`scripts/run-sera-v0.1.1-smoke.sh`) — obrigatório para release.
- Cobertura por domínio operacional além dos representados pelas 14 fixtures atuais.

Limites estruturais conhecidos:

- **Step 2 ainda LLM-dependente**: a extração do ponto de fuga (`agente`, `ato_inseguro_factual`, `momento`) varia entre runs. A v0.1.3-B estabilizou o anti-gate de engenharia/design para ser robusto a essa flutuação, mas outras regras ainda dependem do texto sintetizado pelo LLM.
- **Anti-gates ainda heurísticos**: `engineeringDesignDominant`, `evidenceOfMaintenanceSystemContext`, `evidenceOfOrganizationalRoleContext` e similares são listas lexicais. Narrativas truncadas ou vocabulário não canônico podem fugir.
- **Cobertura adversarial pequena**: 14 fixtures não esgotam o espaço de combinações P × O × A × ERC × domínio. Faltam, por exemplo, fixtures explícitas para A-H, A-I, A-J em contexto de manutenção.
- **A escala ERC do motor legacy** (1=crítico, 5=mínimo) ainda coexiste com a escala visual HFA (1=aceitável, 5=crítico). O gate compara contra a escala legacy; usuários finais veem a escala HFA via `coerceMotorErcToHfaCategory`.

---

## 11. Próximas melhorias

Direções que reduziriam a fragilidade residual (fora do escopo da v0.1.3-C):

- **`causal_domain` explícito**: Step 2 retorna um campo discreto (`maintenance_operational`, `engineering_design`, `dispatch_decision`, `pilot_response`, …) em vez de depender de heurística lexical sobre o texto.
- **`analysis_role` explícito**: separar formalmente "análise primária do ponto de fuga" de "análise secundária da resposta operacional", com schema próprio. Hoje isso é implícito.
- **Análise secundária separada**: pipeline opcional que classifica a resposta da tripulação após falha técnica como bloco distinto, sem contaminar P/O/A do ponto de fuga.
- **Ampliar casos reais**: fixtures adicionais cobrindo acidentes públicos com ponto de fuga bem documentado em outros domínios (CFIT por descida abaixo de mínima rotineira, despacho com combustível insuficiente, briefing de cabin crew incompleto antes de evacuação).
- **Cobertura adversarial cruzada**: pares de fixtures com mesmo agente e mesmo ato mas momentos causais distintos, para validar que o gate distingue ponto de fuga de consequência.

---

## 12. Referências internas

| Documento | Relevância |
|---|---|
| [`SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md`](SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md) | Definição do ponto de fuga, regra anti-migração causal, regras por agente |
| [`SERA_ESCAPE_POINT_ADVERSARIAL_VALIDATION_v0.1.3-A.md`](SERA_ESCAPE_POINT_ADVERSARIAL_VALIDATION_v0.1.3-A.md) | Bateria adversarial v0.1.3-A e correção funcional v0.1.3-B |
| [`RISK_ERC_CANONICAL_DECISION_v0.7.md`](RISK_ERC_CANONICAL_DECISION_v0.7.md) | Decisão formal sobre escala ERC (motor legacy vs. HFA visual) |
| [`../tests/sera/causal-anchoring-fixtures.txt`](../tests/sera/causal-anchoring-fixtures.txt) | Lista oficial de fixtures do gate |
| [`../scripts/run-sera-causal-anchoring.sh`](../scripts/run-sera-causal-anchoring.sh) | Script executável do gate |
| [`../scripts/run-sera-smoke-fast.sh`](../scripts/run-sera-smoke-fast.sh) | Smoke fast (escopo distinto — gate de PR genérico) |
| [`../scripts/run-sera-v0.1.1-smoke.sh`](../scripts/run-sera-v0.1.1-smoke.sh) | Smoke global de release |
