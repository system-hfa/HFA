"""
Partial pipeline recalculation for manual edits.

Dependency map (fixed, do not alter):
  Step 2 changed → recalculate: 3, 4, 5, preconditions, 6, 7
  Step 3 changed → recalculate: preconditions(perception), 6, 7  | preserve: 4, 5
  Step 4 changed → recalculate: preconditions(objective),  6, 7  | preserve: 3, 5
  Step 5 changed → recalculate: preconditions(action),     6, 7  | preserve: 3, 4
"""
import json
from app.sera.pipeline import (
    run_step2, run_step3, run_step4, run_step5, run_step6_7,
    FAILURE_NAMES,
)


DEPENDENCY_MAP = {
    "2": {"recalculate": [3, 4, 5, 6, 7], "preserve": []},
    "3": {"recalculate": [6, 7],           "preserve": [4, 5]},
    "4": {"recalculate": [6, 7],           "preserve": [3, 5]},
    "5": {"recalculate": [6, 7],           "preserve": [3, 4]},
}


def _make_fixed_step(code: str, justification: str = "") -> dict:
    """Build a synthetic step result for a manually-set classification."""
    return {
        "codigo": code,
        "nos_percorridos": [],
        "falhas_descartadas": "Preservado — não recalculado nesta edição",
        "_manual_justification": justification,
    }


def _join_justification(step: dict, override: str = "") -> str:
    if override:
        return override
    nos = step.get("nos_percorridos", [])
    return "; ".join(n.get("justificativa", "") for n in nos if n.get("justificativa"))


def norm_precondition(p: dict) -> dict:
    return {
        "code":          p.get("codigo") or p.get("code", ""),
        "name":          p.get("descricao") or p.get("name", ""),
        "justification": p.get("evidencia_no_relato") or p.get("justification", ""),
        "etapa":         p.get("etapa", ""),
    }


def norm_recommendation(r: dict) -> dict:
    return {
        "title":        r.get("acao") or r.get("title", ""),
        "related_code": r.get("falha_relacionada") or r.get("related_code", ""),
        "description":  r.get("justificativa") or r.get("description", ""),
    }


def recalculate(
    analysis: dict,
    raw_input: str,
    step_altered: str,       # "2", "3", "4", "5"
    field: str,
    new_value: str,
    new_justification: str = "",
) -> dict:
    """
    Run a selective recalculation and return a dict of fields to update
    in the analysis row, plus metadata about what was recalculated.
    """
    dep = DEPENDENCY_MAP.get(step_altered)
    if not dep:
        raise ValueError(f"step_altered must be one of {list(DEPENDENCY_MAP.keys())}")

    # Recover stored pipeline outputs from raw_llm_output
    raw_llm = analysis.get("raw_llm_output") or {}
    if isinstance(raw_llm, str):
        raw_llm = json.loads(raw_llm)

    stored_step2 = raw_llm.get("step2") or {}
    stored_step3 = raw_llm.get("step3") or {}
    stored_step4 = raw_llm.get("step4") or {}
    stored_step5 = raw_llm.get("step5") or {}

    updates = {}
    new_step3 = new_step4 = new_step5 = None

    if step_altered == "2":
        # Re-run steps 2, 3, 4, 5, 6, 7 from scratch
        step2  = run_step2(raw_input)
        step3  = run_step3(raw_input, step2)
        step4  = run_step4(raw_input, step2, step3)
        step5  = run_step5(raw_input, step2, step3, step4)
        step6_7 = run_step6_7(raw_input, step2, step3, step4, step5)

        p3 = step3.get("codigo", "")
        p4 = step4.get("codigo", "")
        p5 = step5.get("codigo", "")

        updates.update({
            "escape_point": step2.get("justificativa", ""),
            "unsafe_agent": step2.get("agente", ""),
            "unsafe_act":   step2.get("ato_inseguro_factual", ""),
            "perception_code":          p3,
            "perception_name":          FAILURE_NAMES.get(p3, p3),
            "perception_justification": _join_justification(step3),
            "perception_discarded":     {"falhas_descartadas": step3.get("falhas_descartadas"), "nos_percorridos": step3.get("nos_percorridos", [])},
            "objective_code":          p4,
            "objective_name":          FAILURE_NAMES.get(p4, p4),
            "objective_justification": _join_justification(step4),
            "objective_discarded":     {"falhas_descartadas": step4.get("falhas_descartadas"), "nos_percorridos": step4.get("nos_percorridos", [])},
            "action_code":          p5,
            "action_name":          FAILURE_NAMES.get(p5, p5),
            "action_justification": _join_justification(step5),
            "action_discarded":     {"falhas_descartadas": step5.get("falhas_descartadas"), "nos_percorridos": step5.get("nos_percorridos", [])},
        })
        new_step3, new_step4, new_step5 = step3, step4, step5
        step6_7_result = step6_7

    else:
        # For steps 3/4/5: fix the changed step, keep others from storage
        step2 = stored_step2  # always from storage

        if step_altered == "3":
            new_step3 = _make_fixed_step(new_value, new_justification)
            new_step4 = stored_step4 or _make_fixed_step(analysis.get("objective_code", ""))
            new_step5 = stored_step5 or _make_fixed_step(analysis.get("action_code", ""))
            updates.update({
                "perception_code":          new_value,
                "perception_name":          FAILURE_NAMES.get(new_value, new_value),
                "perception_justification": new_justification or analysis.get("perception_justification", ""),
                "perception_discarded":     {"nos_percorridos": [], "falhas_descartadas": "Editado manualmente pelo usuário"},
            })

        elif step_altered == "4":
            new_step3 = stored_step3 or _make_fixed_step(analysis.get("perception_code", ""))
            new_step4 = _make_fixed_step(new_value, new_justification)
            new_step5 = stored_step5 or _make_fixed_step(analysis.get("action_code", ""))
            updates.update({
                "objective_code":          new_value,
                "objective_name":          FAILURE_NAMES.get(new_value, new_value),
                "objective_justification": new_justification or analysis.get("objective_justification", ""),
                "objective_discarded":     {"nos_percorridos": [], "falhas_descartadas": "Editado manualmente pelo usuário"},
            })

        elif step_altered == "5":
            new_step3 = stored_step3 or _make_fixed_step(analysis.get("perception_code", ""))
            new_step4 = stored_step4 or _make_fixed_step(analysis.get("objective_code", ""))
            new_step5 = _make_fixed_step(new_value, new_justification)
            updates.update({
                "action_code":          new_value,
                "action_name":          FAILURE_NAMES.get(new_value, new_value),
                "action_justification": new_justification or analysis.get("action_justification", ""),
                "action_discarded":     {"nos_percorridos": [], "falhas_descartadas": "Editado manualmente pelo usuário"},
            })

        # Re-run steps 6 and 7 with the updated classification
        step6_7_result = run_step6_7(raw_input, step2, new_step3, new_step4, new_step5)

    # Apply step 6/7 results
    updates.update({
        "preconditions":   [norm_precondition(p) for p in step6_7_result.get("precondicoes", [])],
        "conclusions":     step6_7_result.get("conclusoes", ""),
        "recommendations": [norm_recommendation(r) for r in step6_7_result.get("recomendacoes", [])],
    })

    # Update raw_llm_output with new step data
    new_llm = dict(raw_llm)
    if new_step3:
        new_llm["step3"] = new_step3
    if new_step4:
        new_llm["step4"] = new_step4
    if new_step5:
        new_llm["step5"] = new_step5
    new_llm["step6_7"] = step6_7_result
    updates["raw_llm_output"] = new_llm

    from app.sera.arms_erc import calculate_erc
    erc = calculate_erc(
        perception_code=updates.get("perception_code") or analysis.get("perception_code", ""),
        objective_code=updates.get("objective_code") or analysis.get("objective_code", ""),
        action_code=updates.get("action_code") or analysis.get("action_code", ""),
    )
    updates.update(erc.to_dict())

    return {
        "updates": updates,
        "steps_recalculated": dep["recalculate"],
        "steps_preserved": dep["preserve"],
    }
