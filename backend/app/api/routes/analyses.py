import json
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from app.api.deps import get_current_user
from app.database import get_supabase_admin

router = APIRouter(prefix="/analyses", tags=["analyses"])


@router.get("/")
async def list_analyses(user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    result = admin.table("analyses")\
        .select("*, events(title, occurred_at, operation_type, aircraft_type)")\
        .eq("tenant_id", tenant_id)\
        .order("created_at", desc=True)\
        .execute()
    return result.data


@router.get("/risk-profile")
async def risk_profile(user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    result = admin.table("analyses")\
        .select("perception_code, objective_code, action_code, preconditions")\
        .eq("tenant_id", tenant_id)\
        .execute()

    # Agrega frequências
    from collections import Counter
    perception = Counter()
    objective = Counter()
    action = Counter()
    preconditions = Counter()

    for r in result.data:
        if r["perception_code"]:
            perception[r["perception_code"]] += 1
        if r["objective_code"]:
            objective[r["objective_code"]] += 1
        if r["action_code"]:
            action[r["action_code"]] += 1
        if r["preconditions"]:
            for p in r["preconditions"]:
                preconditions[p.get("code")] += 1

    return {
        "total_analyses": len(result.data),
        "perception_failures": dict(perception.most_common()),
        "objective_failures": dict(objective.most_common()),
        "action_failures": dict(action.most_common()),
        "top_preconditions": dict(preconditions.most_common(10))
    }


@router.get("/{analysis_id}")
async def get_analysis(analysis_id: str, user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    result = admin.table("analyses")\
        .select("*, events(title, raw_input, occurred_at)")\
        .eq("id", analysis_id)\
        .eq("tenant_id", tenant_id)\
        .single()\
        .execute()
    if not result.data:
        raise HTTPException(404, "Análise não encontrada")
    return result.data


@router.get("/{analysis_id}/pdf")
async def download_pdf(analysis_id: str, user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    result = admin.table("analyses")\
        .select("*, events(title, operation_type, aircraft_type)")\
        .eq("id", analysis_id)\
        .eq("tenant_id", tenant_id)\
        .single()\
        .execute()
    if not result.data:
        raise HTTPException(404, "Análise não encontrada")

    analysis = result.data
    event = analysis.pop("events", {})

    from app.sera.pdf_generator import generate_pdf
    pdf_bytes = generate_pdf(analysis, event)

    # Build filename: SERA_[EventoSlug]_[YYYY-MM-DD].pdf
    import re
    import datetime
    raw_title = event.get("title", "evento")
    slug = re.sub(r"[^\w\-]", "-", raw_title)[:40].strip("-")
    date_str = datetime.date.today().isoformat()
    filename = f"SERA_{slug}_{date_str}.pdf"

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )


@router.get("/{analysis_id}/flows")
async def get_analysis_flows(analysis_id: str, current_user=Depends(get_current_user)):
    from app.sera.flow_renderer import (
        build_perception_mermaid,
        build_objective_mermaid,
        build_action_mermaid,
    )
    admin = get_supabase_admin()
    r = admin.table("analyses").select("*").eq("id", analysis_id).single().execute()
    a = r.data
    if not a:
        raise HTTPException(404, "Análise não encontrada")

    # *_discarded is a JSONB column — already parsed by the Supabase client
    def _disc(raw) -> dict:
        if not raw:
            return {}
        if isinstance(raw, str):
            return json.loads(raw)
        return raw  # already a dict (JSONB)

    perception_disc = _disc(a.get("perception_discarded"))
    objective_disc  = _disc(a.get("objective_discarded"))
    action_disc     = _disc(a.get("action_discarded"))

    perception_flow = {"codigo": a.get("perception_code"), **perception_disc}
    objective_flow  = {"codigo": a.get("objective_code"),  **objective_disc}
    action_flow     = {"codigo": a.get("action_code"),     **action_disc}

    return {
        "perception": {
            "mermaid":            build_perception_mermaid(perception_flow),
            "codigo":             a.get("perception_code"),
            "nos_percorridos":    perception_disc.get("nos_percorridos", []),
            "falhas_descartadas": perception_disc.get("falhas_descartadas", ""),
        },
        "objective": {
            "mermaid":            build_objective_mermaid(objective_flow),
            "codigo":             a.get("objective_code"),
            "nos_percorridos":    objective_disc.get("nos_percorridos", []),
            "falhas_descartadas": objective_disc.get("falhas_descartadas", ""),
        },
        "action": {
            "mermaid":            build_action_mermaid(action_flow),
            "codigo":             a.get("action_code"),
            "nos_percorridos":    action_disc.get("nos_percorridos", []),
            "falhas_descartadas": action_disc.get("falhas_descartadas", ""),
        },
    }
