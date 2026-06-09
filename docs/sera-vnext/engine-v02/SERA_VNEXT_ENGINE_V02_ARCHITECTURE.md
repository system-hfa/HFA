# SERA vNext Engine V02 Architecture

The runtime remains one active product implementation: `runSeraVNextEngineV0`. Its executable version is now `0.2.0`; the name is retained for import compatibility.

Key modules:
- `frontend/src/lib/sera-vnext/engine-v02/language/concepts.ts`: centralized bilingual pt-BR/en evidence concepts.
- `frontend/src/lib/sera-vnext/canonical-tree/evaluate-node.ts`: canonical node answers from evidence concepts.
- `frontend/src/lib/sera-vnext/evidence/extract-evidence.ts`: bilingual evidence-use tagging.
- `frontend/src/lib/sera-vnext/engine-v02/guardrails/compute-guardrails.ts`: real guardrail detection.
- `tests/sera-vnext/engine-validation-v02/`: frozen independent validation.
- `tests/sera-vnext/engine-v02/reachability/`: independent leaf reachability harness.

The canonical tree questions were not invented or reordered. The v02 correction changes how evidence answers canonical nodes, not the canonical tree source.

The legacy `analyzeSeraVNext` pipeline in `frontend/src/lib/sera-vnext/engine.ts` remains present for older imports but is not the Product Beta/admin runtime.
