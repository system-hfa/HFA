from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.api.deps import get_current_user
from app.database import get_supabase_admin

router = APIRouter(prefix="/events", tags=["events"])


class EventInput(BaseModel):
    title: str
    raw_input: str
    input_type: str = "text"
    operation_type: Optional[str] = None
    aircraft_type: Optional[str] = None
    occurred_at: Optional[str] = None


@router.get("/")
async def list_events(user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    result = admin.table("events")\
        .select("*")\
        .eq("tenant_id", tenant_id)\
        .order("created_at", desc=True)\
        .execute()
    return result.data


@router.post("/")
async def create_event(data: EventInput, user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    user_id = user.user.id

    # Verifica créditos
    tenant = admin.table("tenants")\
        .select("credits_balance")\
        .eq("id", tenant_id)\
        .single()\
        .execute()

    if tenant.data["credits_balance"] < 1:
        raise HTTPException(402, "Créditos insuficientes")

    # Cria evento
    event = admin.table("events").insert({
        "tenant_id": tenant_id,
        "submitted_by": user_id,
        "title": data.title,
        "raw_input": data.raw_input,
        "input_type": data.input_type,
        "operation_type": data.operation_type,
        "aircraft_type": data.aircraft_type,
        "status": "received"
    }).execute()

    event_id = event.data[0]["id"]

    # Debita crédito
    admin.table("tenants")\
        .update({"credits_balance": tenant.data["credits_balance"] - 1})\
        .eq("id", tenant_id)\
        .execute()

    admin.table("credit_transactions").insert({
        "tenant_id": tenant_id,
        "user_id": user_id,
        "type": "consumption",
        "amount": -1,
        "event_id": event_id,
        "description": f"Análise SERA: {data.title}"
    }).execute()

    # Dispara análise em background
    from app.sera.pipeline import run_analysis
    import asyncio
    asyncio.create_task(run_analysis(event_id, data.raw_input, tenant_id))

    return {"event_id": event_id, "status": "received"}


@router.get("/{event_id}")
async def get_event(event_id: str, user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    result = admin.table("events")\
        .select("*, analyses(*)")\
        .eq("id", event_id)\
        .eq("tenant_id", tenant_id)\
        .single()\
        .execute()
    if not result.data:
        raise HTTPException(404, "Evento não encontrado")
    return result.data
