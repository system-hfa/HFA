import re
import uuid

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from app.api.deps import get_current_user
from app.database import get_supabase_client, get_supabase_admin

router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterInput(BaseModel):
    email: EmailStr
    password: str
    company_name: str
    slug: str


class LoginInput(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
async def register(data: RegisterInput):
    admin = get_supabase_admin()
    # Cria tenant
    tenant = admin.table("tenants").insert({
        "name": data.company_name,
        "slug": data.slug,
        "plan": "trial",
        "credits_balance": 3
    }).execute()

    if not tenant.data:
        raise HTTPException(400, "Erro ao criar empresa")

    tenant_id = tenant.data[0]["id"]

    # Cria usuário no Supabase Auth
    client = get_supabase_client()
    client.auth.sign_up({
        "email": data.email,
        "password": data.password,
        "options": {
            "data": {
                "tenant_id": tenant_id,
                "role": "admin"
            }
        }
    })

    # Cria registro na tabela users
    admin.table("users").insert({
        "tenant_id": tenant_id,
        "email": data.email,
        "full_name": data.email.split("@")[0],
        "role": "admin"
    }).execute()

    return {"message": "Conta criada com sucesso", "tenant_id": tenant_id}


@router.post("/login")
async def login(data: LoginInput):
    client = get_supabase_client()
    result = client.auth.sign_in_with_password({
        "email": data.email,
        "password": data.password
    })
    return {
        "access_token": result.session.access_token,
        "user": result.user.email
    }


@router.post("/oauth/bootstrap")
async def oauth_bootstrap(user=Depends(get_current_user)):
    """Cria tenant + users + user_metadata para quem entrou com Google (sem registro por email)."""
    admin = get_supabase_admin()
    uid = str(user.user.id)
    meta = dict(user.user.user_metadata or {})
    if meta.get("tenant_id"):
        return {"ok": True, "tenant_id": str(meta["tenant_id"]), "created": False}

    email = (user.user.email or f"{uid}@oauth.placeholder").strip()
    local = email.split("@")[0] or "user"
    base_slug = re.sub(r"[^a-z0-9-]", "-", local.lower()).strip("-") or "org"
    slug = f"{base_slug}-{uuid.uuid4().hex[:8]}"

    existing = admin.table("users").select("tenant_id").eq("email", email).limit(1).execute()
    if existing.data:
        tenant_id = existing.data[0]["tenant_id"]
        new_meta = {**meta, "tenant_id": str(tenant_id), "role": meta.get("role") or "admin"}
        admin.auth.admin.update_user_by_id(uid, {"user_metadata": new_meta})
        return {"ok": True, "tenant_id": str(tenant_id), "created": False, "linked": True}

    tenant = admin.table("tenants").insert({
        "name": local[:255],
        "slug": slug,
        "plan": "trial",
        "credits_balance": 3,
    }).execute()

    if not tenant.data:
        raise HTTPException(status_code=500, detail="Falha ao criar empresa")

    tenant_id = tenant.data[0]["id"]
    admin.table("users").insert({
        "tenant_id": tenant_id,
        "email": email,
        "full_name": local[:255],
        "role": "admin",
    }).execute()

    new_meta = {**meta, "tenant_id": str(tenant_id), "role": "admin"}
    admin.auth.admin.update_user_by_id(uid, {"user_metadata": new_meta})

    return {"ok": True, "tenant_id": str(tenant_id), "created": True}
