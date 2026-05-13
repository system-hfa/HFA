# SERA Baseline v0.1

## 1. Finalidade

Este documento registra o primeiro baseline funcional da metodologia SERA (Situação — Percepção — Objetivo — Ação — ERC) no sistema HFA. O baseline serve como referência oficial de estabilidade, regressão, determinismo e rastreabilidade metodológica para todas as versões subsequentes do classificador.

## 2. Escopo do baseline

O baseline cobre as fixtures de validação da classificação SERA executadas pelo runner de smoke global. Cada fixture verifica a conformidade da saída do classificador em cinco eixos:

- **Percepção (P)**
- **Objetivo (O)**
- **Ação (A)**
- **ERC**
- **Preconditions**

O runner avalia correspondência exata entre a saída do classificador e os rótulos esperados definidos nas fixtures.

## 3. Artefato de referência

O baseline está materializado no arquivo:

```
tests/reports/baseline/sera-baseline-v0.1-smoke.json
```

Este arquivo contém o registro completo da execução, incluindo entradas, saídas esperadas, saídas obtidas e vereditos por fixture. Qualquer comparação de regressão futura deve usar este arquivo como referência.

## 4. Resultado consolidado

| Métrica | Valor |
|---|---|
| Total de fixtures | 54 |
| PASS | 53 |
| PARTIAL | 1 |
| FAIL | 0 |
| ERROR | 0 |
| **pass_rate** | **98,15%** |
| **determinism_rate** | **100%** |

## 5. Interpretação do resultado

O baseline é considerado **aprovado** para a versão v0.1 pelos seguintes motivos:

- **Zero FAIL**: nenhuma fixture produziu resultado incorreto completo.
- **Zero ERROR**: nenhuma fixture encontrou falha de execução ou exceção.
- **Determinismo 100%**: todas as fixtures produzem o mesmo resultado em execuções repetidas.
- **Divergência parcial e localizada**: a única fixture PARTIAL (TEST-O-D-001) apresenta divergência exclusivamente no eixo de percepção, com objetivo, ação e ERC corretos.
- **Baixo impacto funcional**: a divergência não compromete a validade metodológica do classificador para os casos cobertos pelo baseline.

## 6. Known issue v0.1

### TEST-O-D-001

| Campo | Valor |
|---|---|
| Resultado atual | P-G / O-D / A-A / ERC 2 |
| Resultado esperado | P-A / O-D / A-A / ERC 2 |
| Divergência | Percepção classificada como P-G em vez de P-A |
| Eixos corretos | O-D, A-A, ERC 2 |
| Impacto | Baixo para o baseline v0.1 |
| Decisão | Não bloquear v0.1; tratar como candidato para v0.1.1 |

O caso O-D (ameaça externa direta) recebe uma classificação de percepção excessiva (P-G — percepção geral de ameaça) quando o esperado é P-A (percepção de ameaça específica). A raiz provável está na heurística de discriminação de percepção para cenários O-D puro, que será investigada na próxima iteração.

## 7. Correções estabilizadas antes do baseline

As seguintes correções foram aplicadas e validadas antes da geração deste baseline:

- Step4/objective estabilizado para O-B, O-C, O-D e O-A.
- Discriminação A-C vs A-B corrigida.
- Discriminação P-G, P-F e A-F corrigida.
- Discriminação P-E, P-H e A-G corrigida.
- Classificação ERC-4 e ERC-5 corrigida.
- Matriz de preconditions reforçada para garantir determinismo.
- Classificação legada P-B, P-C e P-D corrigida.
- Classificação legada O-C e P-G (combustível/complacência) corrigidas.
- Timeout em A-D confirmado como instabilidade isolada de ambiente, sem relação com bug metodológico.

## 8. Critérios de preservação do baseline

Qualquer alteração futura em regras, heurísticas, prompts, preconditions ou fixtures deve obrigatoriamente:

1. Rodar novamente o smoke global completo.
2. Comparar os resultados contra o baseline salvo (`sera-baseline-v0.1-smoke.json`).
3. Registrar qualquer regressão detectada (PASS → PARTIAL, PASS → FAIL, PARTIAL → FAIL).
4. Justificar mudanças metodológicas que alterem o comportamento esperado.
5. Preservar determinismo sempre que possível — novas regras não determinísticas exigem documentação explícita.

O baseline **não deve ser sobrescrito** sem que uma nova versão documentada (ex.: v0.2) seja formalizada.

## 9. Próximas frentes recomendadas

### Correção cirúrgica
- Avaliar e corrigir o known issue TEST-O-D-001 para a versão v0.1.1, com foco exclusivo na heurística de percepção para casos O-D puro.

### Modos econômicos do runner
- `deterministic-only`: executar apenas fixtures com preconditions determinísticas.
- `fail-fast`: interromper a execução na primeira divergência.
- `fixture groups`: permitir execução por grupos temáticos de fixtures.
- Cache de respostas LLM: evitar re-chamadas ao modelo para entradas idênticas.
- Report compacto: saída resumida para integração contínua.

### Módulo de entrevista (SERA Evidence Intake)
- Persistência de entrevistas no Supabase.
- Vínculo entre entrevista e evento/análise.
- Geração de perguntas complementares baseadas em gaps de evidência.
- Upload de transcrição manual.
- Upload de áudio + transcrição automática (futuro).

## 10. Status

O SERA v0.1 está documentado como **baseline funcional, determinístico e aprovado**, apto para servir como referência oficial de regressão para todas as iterações futuras do classificador.

---

_Data de homologação: 13/05/2026_
