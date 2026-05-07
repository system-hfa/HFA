from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.api.deps import get_current_user
from app.database import get_supabase_admin

router = APIRouter(prefix="/credits", tags=["credits"])


class AddCreditsInput(BaseModel):
    amount: int
    description: str = "Compra de créditos"


@router.get("/packages")
async def list_packages():
    admin = get_supabase_admin()
    result = admin.table("credit_packages")\
        .select("*")\
        .eq("is_active", True)\
        .execute()
    return result.data


@router.get("/balance")
async def get_balance(user=Depends(get_current_user)):
    admin = get_supabase_admin()
    tenant_id = user.user.user_metadata.get("tenant_id")
    result = admin.table("tenants")\
        .select("credits_balance")\
        .eq("id", tenant_id)\
        .single()\
        .execute()
    return {"balance": result.data["credits_balance"]}
