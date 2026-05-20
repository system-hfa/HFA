# SERA v0.1.4-A2-a — Technical Inventory for Methodological Fixtures

## 1. Estado inicial

- Branch: `main`
- HEAD: `d636446d612de60da1368ab47923a29ecd2965e8`
- `origin/main`: `d636446d612de60da1368ab47923a29ecd2965e8`
- Status inicial: sem alterações tracked; apenas untracked locais esperados (pastas handoff/projeto e `tests/reports/run-*.json`).
- Confirmação de proteção: antes do inventário, `git diff --name-only` não mostrou mudanças em áreas protegidas (`frontend/src/lib/sera`, `tests/sera/fixtures`, `tests/reports/baseline`, `risk-profile`, `billing/stripe`, `supabase/migrations`).

## 2. Fonte normativa

Fonte normativa da fase:

- `docs/SERA_METHOD_FIXTURES_A1_DECISIONS_v0.1.4.md`
- Commit: `d636446d612de60da1368ab47923a29ecd2965e8`

Resumo normativo congelado em A1-GOV+:

- precedência: Hendy > HFA/SERA adaptado > Daumas;
- O-C estrito como adaptação conservadora;
- critério A-A vs A-G;
- níveis de evidência E0-E4;
- política PASS/PARTIAL/FAIL;
- ERC fora de PASS/FAIL nesta fase;
- `ADAPTATION_NOTE` para divergências;
- separação metodológica por trilhas: gate automático, exploratório, negativos e multi-act estrutural.

## 3. Schema real das fixtures atuais

### Schema real

O contrato tipado do runner está em `tests/sera/fixtures/schema.ts`.

- Estrutura mínima tipada: `id`, `title`, `domain`, `description`, `expected`, `rationale`, `discriminators`.
- `expected` é aninhado e flat internamente (`perception_code`, `objective_code`, `action_code`, `erc_level`, `top_preconditions?`).
- O relato usado no motor é `description` (string), passado como `rawText` para o pipeline (`tests/sera/runner.ts:26`).
- `erc_level` no schema tipado é numérico e obrigatório (`tests/sera/fixtures/schema.ts:11`).

Observação importante de runtime:

- Não há validação JSON estrita (sem zod/ajv) no carregamento: `JSON.parse(...)` direto em `tests/sera/runner.ts:20`.
- Campos extras não quebram parsing; são ignorados pelo scorer principal.
- Evidência prática: fixtures `TEST-RISK-*` contêm campos adicionais (`methodology_notes`, `sera_context`, `risk_expected`, `future_expected`) além do schema base (`tests/sera/fixtures/TEST-RISK-ERC-001.json:19`, `:20`, `:34`, `:49`).

Tabela de campos observados:

| Campo | Obrigatório? | Tipo observado | Exemplo | Observação |
|---|---|---|---|---|
| `id` | sim | string | `"TEST-A-B-001"` | usado para filtro e identificação |
| `title` | sim | string | `"Técnico omite pino..."` | exibido em relatório |
| `domain` | sim | string | `"manutenção aeronáutica"` | contextual |
| `description` | sim | string | narrativa textual longa | vira `rawText` no pipeline |
| `expected` | sim | objeto | `{ perception_code, objective_code, action_code, erc_level, top_preconditions? }` | núcleo de comparação |
| `expected.perception_code` | sim | string | `"P-G"` | comparação estrita |
| `expected.objective_code` | sim | string | `"O-A"` | comparação estrita |
| `expected.action_code` | sim | string | `"A-C"` | comparação estrita |
| `expected.erc_level` | sim (contrato) | number | `2` | comparação estrita por igualdade numérica |
| `expected.top_preconditions` | opcional | string[] | `["W1","S3"]` | vira `PASS/PARTIAL/FAIL` de precondições |
| `rationale` | sim | string | texto livre | não entra no score |
| `discriminators` | sim | string[] | lista textual | não entra no score |
| `methodology_notes` | não (schema base) | string | texto multiline | campo extra tolerado |
| `sera_context` | não (schema base) | objeto | bloco de contexto | campo extra tolerado |
| `risk_expected` | não (schema base) | objeto | bloco de contrato de risco | campo extra tolerado |
| `future_expected` | não (schema base) | objeto | bloco futuro | campo extra tolerado |

Conclusões de schema:

- Campos obrigatórios de classificação: `expected.perception_code`, `expected.objective_code`, `expected.action_code`, `expected.erc_level`.
- `erc_level` deve ser numérico para semântica atual do runner.
- Campos desconhecidos são tolerados em runtime, mas não têm efeito na avaliação P/O/A/ERC do runner.

## 4. Comportamento do runner

### Comportamento do runner

Fonte principal: `tests/sera/run.ts`, `tests/sera/runner.ts`, `tests/sera/compare.ts`, `tests/sera/report.ts`.

Carga de fixtures:

- Diretório fixo: `tests/sera/fixtures` (`tests/sera/runner.ts:9`).
- Loader lê todos os `.json` desse diretório (`tests/sera/runner.ts:17-20`).
- Não existe flag para diretório alternativo de fixtures no runner (`run.ts` só tem `--n-runs`, `--filter`, `--group`, `--fail-fast`, `--compact`, `--deterministic-only`, `--baseline`).

Filtros e grupos:

- Suporta `--filter` (substring em `id`) e env `SERA_FIXTURE` (`tests/sera/run.ts:17`, `:90`, `:100-101`).
- Suporta `--group` por prefixo fixo (`tests/sera/run.ts:18`, `:52-61`).
- Não há suporte nativo a lista de IDs no runner.

Listas externas:

- Há suporte indireto via scripts shell que leem TXT e chamam o runner por fixture com `--filter`:
  - `scripts/run-sera-causal-anchoring.sh` (`SERA_FIXTURE_LIST`, linhas `38`, `74-79`, `87-90`, `142`);
  - `scripts/run-sera-smoke-fast.sh` (`FIXTURES_FILE`, linhas `20`, `53-58`, `60-64`, `78`).

PASS/PARTIAL/FAIL:

- Regras em `tests/sera/compare.ts:12-29`.
- `PASS`: P/O/A corretos e `erc_level` correto.
- `PARTIAL`: P/O/A corretos mas ERC diverge, ou acerto parcial de P/O/A.
- `FAIL`: nenhum eixo P/O/A bate.
- `top_preconditions` gera score separado de precondições (`PASS/PARTIAL/FAIL`) mas não altera a regra crítica de `overall` além do que já está codificado.

Determinismo:

- Calculado por fixture com consistência entre runs (`tests/sera/compare.ts:57-64`).
- `run.ts` suporta `--deterministic-only` com baseline (`tests/sera/run.ts:21`, `:70-84`, `:108-114`).

Baseline e execução:

- Baseline é usado para filtro determinístico, não para mutação automática.
- Smoke global script exige working tree limpa e roda tudo (`scripts/run-sera-v0.1.1-smoke.sh:14-24`, `:38`).

Relatórios:

- Nome: `tests/reports/run-<timestamp>.json` (`tests/sera/runner.ts:52`, `tests/sera/report.ts:6-11`).
- Runner sai com erro se `pass_rate < 0.7` (`tests/sera/run.ts:133-136`).

Variáveis de ambiente:

- `SERA_N_RUNS`: suportado (`tests/sera/run.ts:16`, `:26`, `:89`).
- `SERA_FIXTURE`: suportado (`tests/sera/run.ts:17`, `:27`, `:90`).

## 5. Compatibilidade com A1-GOV+

### Compatibilidade com A1-GOV+

| Recurso A1-GOV+ | Suportado hoje? | Evidência no código | Estratégia A2-b |
|---|---|---|---|
| `ERC_REVIEW` ou `erc_level=null` | não | `expected.erc_level` tipado como number (`tests/sera/fixtures/schema.ts:11`) e comparado por igualdade estrita (`tests/sera/compare.ts:15`) | não usar em gate técnico atual; manter ERC numérico no JSON e registrar revisão em doc paralelo |
| `accepted_alternative` | não | ausência de leitura do campo no scorer; regra usa apenas igualdade direta P/O/A/ERC (`tests/sera/compare.ts:12-29`) | não usar no runner atual |
| `ADAPTATION_NOTE` | incerto (como metadata inerte) | loader sem validação estrita (`tests/sera/runner.ts:20`) e scorer ignora campos extras (`tests/sera/compare.ts`) | manter em documentação/notes; evitar depender disso para score automático |
| `evidence_level` | incerto (como metadata inerte) | mesmo comportamento de campo extra tolerado | manter em documentação/notes |
| negativos (insufficient_evidence etc.) | não | scorer exige P/O/A/ERC convencionais; sem status alternativo (`tests/sera/compare.ts:12-29`) | separar como trilha manual/exploratória até adaptação de contrato |
| multi-act estrutural | não | `SeraFixture` modela um único `expected` por fixture (`tests/sera/fixtures/schema.ts:7-13`) | separar como especificação/manual; não gate automático atual |
| `CODE_REVIEW` | não (como status técnico de runner) | não há campo/status reconhecido em schema/score | manter fora de gate automático |
| grupos/listas | sim (parcial) | `--group` nativo (`tests/sera/run.ts:18`, `:52-67`); listas via scripts (`scripts/run-sera-causal-anchoring.sh`, `scripts/run-sera-smoke-fast.sh`) | usar padrão existente de lista TXT + loop por `--filter` |

## 6. Risco de quebrar schema

- Podemos adicionar campos extras no JSON sem quebrar o parser? **Em geral, sim** (parser atual é permissivo, sem validação estrita).
- Esses campos extras influenciam o runner? **Não**, a menos que o código passe a consumi-los.
- `erc_level` pode ser `null` ou string sem quebrar parse? **Parse não quebra**, mas a comparação de score quebra semanticamente (vira mismatch sistemático em ERC).

Resposta objetiva:

- Estrutura segura hoje para execução automática: manter JSON mínimo compatível com o scorer atual (`id`, `title`, `domain`, `description`, `expected` com `perception_code/objective_code/action_code/erc_level` numérico, `rationale`, `discriminators`; `top_preconditions` opcional).
- Conteúdo metodológico avançado (A1-GOV+) deve ficar em Markdown/notes paralelos até o runner ter contrato explícito para esses campos.

## 7. Estratégia recomendada para A2-b

### A2-b

Opção recomendada: **Opção C**.

**Justificativa técnica:**

- O runner atual só lê `tests/sera/fixtures` (`tests/sera/runner.ts:9`), então qualquer JSON novo nesse diretório entra no universo padrão e pode contaminar smoke/baseline.
- Não existe flag nativa para diretório alternativo de candidates.
- Manter candidates junto das fixtures oficiais aumenta risco de execução acidental em smoke global (`scripts/run-sera-v0.1.1-smoke.sh:38`).

Plano seguro para A2-b (sem quebrar gate atual):

1. criar primeiro mecanismo de isolamento de candidates (runner/list loader dedicado);
2. só depois materializar JSON metodológico;
3. garantir execução seletiva com `N_RUNS=1` e relatório segregado.

## 8. Estrutura de arquivos proposta para A2-b (proposta, não criada)

Proposta alinhada com isolamento:

```text
tests/sera/fixtures-candidates/methodology-gate/
  A0-VIS-003.json
  ...
tests/sera/fixtures-candidates/methodology-exploratory/
  ...
tests/sera/fixtures-candidates/methodology-negative/
  ...
tests/sera/fixtures-candidates/methodology-multiact/
  ...
tests/sera/fixtures-candidates/METHODOLOGY_NOTES_v0.1.4.md
tests/sera/methodology-gate-fixtures.txt
tests/sera/methodology-exploratory-fixtures.txt
tests/sera/methodology-negative-fixtures.txt
tests/sera/methodology-multiact-fixtures.txt
scripts/run-sera-methodology-candidates.sh
```

Observação:

- Esta estrutura **não é executável pelo runner atual sem adaptação**, pois o loader atual não lê fora de `tests/sera/fixtures`.
- Ela é proposta para implementação segura em A2-b/C (isolamento primeiro).

## 9. Lista dos 17 candidatos de gate automático (A1-GOV+)

- `A0-VIS-003` — P-G / O-A / A-A
- `A0-VIS-005` — P-H / O-A / A-A
- `A0-AUTO-001` — P-C / O-A / A-E
- `A0-AUTO-003` — P-D / O-A / A-H
- `A0-FUEL-002` — P-G / O-A / A-A
- `A0-CONFIG-001` — P-G / O-A / A-A
- `A0-CONFIG-002` — P-G / O-A / A-A
- `A0-SEP-002` — P-G / O-A / A-A
- `A0-SEP-005` — P-G / O-A / A-A
- `A0-CHK-001` — P-G / O-A / A-A
- `A0-CHK-003` — P-G / O-A / A-G
- `A0-VIS-004-ADJ` — P-H / O-A / A-A
- `A0-AUTO-004-ADJ` — P-A / O-A / A-G
- `A0-CHK-002-ADJ` — P-D / O-A / A-H
- `A0-DAUMAS-E01-B` — P-C / O-A / A-E
- `A0-DAUMAS-E02-A` — P-A / O-C / A-F
- `A0-DAUMAS-E02-B` — P-D / O-A / A-H

## 10. Comandos de validação recomendados para A2-b (não executados nesta fase)

Validação estrutural JSON (candidates):

```bash
cd ~/Documents/HFA
find tests/sera/fixtures-candidates -type f -name "*.json" -print0 | xargs -0 -I{} node -e "JSON.parse(require('fs').readFileSync('{}','utf8')); console.log('OK {}')"
```

Execução seletiva candidate-only (após existir script/lista dedicada):

```bash
cd ~/Documents/HFA
SERA_N_RUNS=1 SERA_FIXTURE_LIST=tests/sera/methodology-gate-fixtures.txt bash scripts/run-sera-methodology-candidates.sh
SERA_N_RUNS=1 SERA_FIXTURE_LIST=tests/sera/methodology-exploratory-fixtures.txt bash scripts/run-sera-methodology-candidates.sh
```

Execução via runner atual (fallback, não ideal, só se candidates ainda estiverem em `tests/sera/fixtures`):

```bash
cd ~/Documents/HFA
SERA_N_RUNS=1 npx tsx tests/sera/run.ts --filter A0- --compact
```

Separação de report em pasta candidates (se script dedicado suportar):

```bash
cd ~/Documents/HFA
mkdir -p tests/reports/candidates
# script dedicado deve copiar/mover o run-*.json selecionado para tests/reports/candidates/
```

## 11. Decisão final

- A2-b pode criar JSON com segurança? **parcial**.
- Pré-requisitos antes de A2-b:
  1. isolamento de diretório/lista para candidates sem contaminar `tests/sera/fixtures` oficiais;
  2. caminho de execução candidate-only com `N_RUNS=1`;
  3. política explícita para ERC em candidates (enquanto `ERC_REVIEW/null` não é suportado pelo scorer);
  4. contrato para negativos/multi-act (ou formalizar que ficam fora do gate automático).
- Modelo recomendado para A2-b: **GPT-5.3-Codex (inteligência alta)**.
- Arquivos que A2-b deve criar (após isolamento):
  - fixtures candidates separadas por trilha (gate, exploratório, negativos, multi-act);
  - listas TXT por trilha;
  - notes metodológicas candidates;
  - script runner candidate-only.
- Arquivos que A2-b não deve tocar:
  - `tests/sera/fixtures/*.json` oficiais;
  - `tests/reports/baseline/*`;
  - motor SERA/runtime em produção sem necessidade explícita de isolamento;
  - Risk Profile, billing/Stripe, migrations.

